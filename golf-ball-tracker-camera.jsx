import { useState, useRef, useEffect, useCallback } from "react";

export default function GolfBallTracker() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const containerRef = useRef(null);
  const animRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraReady, setCameraReady] = useState(false);
  const [tracking, setTracking] = useState(false);
  const [trail, setTrail] = useState([]);
  const [ballPos, setBallPos] = useState(null);
  const [facingMode, setFacingMode] = useState("environment");
  const [sensitivity, setSensitivity] = useState(85);
  const [minSize, setMinSize] = useState(4);
  const [maxSize, setMaxSize] = useState(40);
  const [showSettings, setShowSettings] = useState(false);
  const [stats, setStats] = useState({ points: 0, speed: 0 });
  const [dims, setDims] = useState({ w: 0, h: 0 });

  const trackingRef = useRef(false);
  const trailRef = useRef([]);
  const prevPosRef = useRef(null);
  const lostFramesRef = useRef(0);

  // Start camera
  const startCamera = useCallback(async (facing) => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facing,
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 60, min: 30 },
        },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraReady(true);
      }
    } catch (err) {
      console.error("Camera error:", err);
      alert("카메라 접근이 필요합니다. 브라우저 설정에서 카메라 권한을 허용해주세요.");
    }
  }, []);

  useEffect(() => {
    startCamera(facingMode);
    return () => {
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const switchCamera = useCallback(() => {
    const newMode = facingMode === "environment" ? "user" : "environment";
    setFacingMode(newMode);
    startCamera(newMode);
  }, [facingMode, startCamera]);

  // Resize
  useEffect(() => {
    const resize = () => {
      const c = containerRef.current;
      if (!c) return;
      setDims({ w: c.clientWidth, h: c.clientHeight });
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Golf ball detection using color thresholding
  const detectBall = useCallback((ctx, w, h) => {
    const imageData = ctx.getImageData(0, 0, w, h);
    const data = imageData.data;
    const thresh = sensitivity * 2.55; // 0-255

    // Find bright, low-saturation pixels (white golf ball)
    const candidates = [];
    const step = 2; // skip pixels for performance
    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        const i = (y * w + x) * 4;
        const r = data[i], g = data[i + 1], b = data[i + 2];
        const brightness = (r + g + b) / 3;
        const maxC = Math.max(r, g, b);
        const minC = Math.min(r, g, b);
        const saturation = maxC > 0 ? (maxC - minC) / maxC : 0;

        if (brightness > thresh && saturation < 0.25) {
          candidates.push({ x, y, brightness });
        }
      }
    }

    if (candidates.length === 0) return null;

    // Cluster nearby bright pixels using simple grid-based clustering
    const gridSize = 12;
    const grid = {};
    for (const p of candidates) {
      const gx = Math.floor(p.x / gridSize);
      const gy = Math.floor(p.y / gridSize);
      const key = `${gx},${gy}`;
      if (!grid[key]) grid[key] = { sx: 0, sy: 0, count: 0, brightness: 0 };
      grid[key].sx += p.x;
      grid[key].sy += p.y;
      grid[key].count++;
      grid[key].brightness += p.brightness;
    }

    // Find clusters and merge nearby ones
    const clusters = [];
    for (const key in grid) {
      const g = grid[key];
      clusters.push({
        x: g.sx / g.count,
        y: g.sy / g.count,
        size: g.count,
        brightness: g.brightness / g.count,
      });
    }

    // Merge nearby clusters
    const merged = [];
    const used = new Set();
    for (let i = 0; i < clusters.length; i++) {
      if (used.has(i)) continue;
      let cx = clusters[i].x * clusters[i].size;
      let cy = clusters[i].y * clusters[i].size;
      let totalSize = clusters[i].size;
      let totalBright = clusters[i].brightness * clusters[i].size;
      used.add(i);

      for (let j = i + 1; j < clusters.length; j++) {
        if (used.has(j)) continue;
        const dx = clusters[i].x - clusters[j].x;
        const dy = clusters[i].y - clusters[j].y;
        if (Math.sqrt(dx * dx + dy * dy) < gridSize * 3) {
          cx += clusters[j].x * clusters[j].size;
          cy += clusters[j].y * clusters[j].size;
          totalSize += clusters[j].size;
          totalBright += clusters[j].brightness * clusters[j].size;
          used.add(j);
        }
      }

      merged.push({
        x: cx / totalSize,
        y: cy / totalSize,
        size: totalSize,
        brightness: totalBright / totalSize,
        radius: Math.sqrt(totalSize * step * step / Math.PI),
      });
    }

    // Filter by size
    const minR = minSize;
    const maxR = maxSize;
    const valid = merged.filter(c => c.radius >= minR && c.radius <= maxR);

    if (valid.length === 0) return null;

    // If we have a previous position, prefer the closest detection
    if (prevPosRef.current) {
      const prev = prevPosRef.current;
      let bestDist = Infinity;
      let best = null;
      for (const c of valid) {
        const dx = c.x - prev.x;
        const dy = c.y - prev.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        // Weight by distance and roundness (smaller = more round = more likely ball)
        const score = dist;
        if (score < bestDist) {
          bestDist = score;
          best = c;
        }
      }
      // Accept if within reasonable range (ball can't teleport too far between frames)
      if (best && bestDist < Math.max(w, h) * 0.3) return best;
    }

    // Otherwise pick the brightest, most compact cluster
    valid.sort((a, b) => b.brightness - a.brightness);
    return valid[0];
  }, [sensitivity, minSize, maxSize]);

  // Main detection loop
  const processFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const overlay = overlayRef.current;
    if (!video || !canvas || !overlay || video.readyState < 2) {
      animRef.current = requestAnimationFrame(processFrame);
      return;
    }

    const w = video.videoWidth;
    const h = video.videoHeight;
    if (w === 0 || h === 0) {
      animRef.current = requestAnimationFrame(processFrame);
      return;
    }

    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(video, 0, 0, w, h);

    // Set overlay to match container
    const container = containerRef.current;
    if (container) {
      overlay.width = container.clientWidth * (window.devicePixelRatio || 1);
      overlay.height = container.clientHeight * (window.devicePixelRatio || 1);
      overlay.style.width = container.clientWidth + "px";
      overlay.style.height = container.clientHeight + "px";
    }

    const octx = overlay.getContext("2d");
    const ow = overlay.width;
    const oh = overlay.height;
    const dpr = window.devicePixelRatio || 1;
    octx.scale(dpr, dpr);
    const displayW = container?.clientWidth || ow;
    const displayH = container?.clientHeight || oh;
    octx.clearRect(0, 0, displayW, displayH);

    const scaleX = displayW / w;
    const scaleY = displayH / h;

    if (trackingRef.current) {
      const ball = detectBall(ctx, w, h);

      if (ball) {
        lostFramesRef.current = 0;
        const screenX = ball.x * scaleX;
        const screenY = ball.y * scaleY;

        const now = Date.now();
        const newPoint = { x: screenX, y: screenY, t: now, rawX: ball.x, rawY: ball.y };

        // Calculate speed
        let speed = 0;
        if (prevPosRef.current) {
          const dx = ball.x - prevPosRef.current.rawX;
          const dy = ball.y - prevPosRef.current.rawY;
          const dt = (now - prevPosRef.current.t) / 1000;
          if (dt > 0) speed = Math.round(Math.sqrt(dx * dx + dy * dy) / dt);
        }

        prevPosRef.current = newPoint;
        trailRef.current = [...trailRef.current, newPoint];
        setBallPos({ x: screenX, y: screenY, r: ball.radius * Math.min(scaleX, scaleY) });
        setTrail([...trailRef.current]);
        setStats({ points: trailRef.current.length, speed });
      } else {
        lostFramesRef.current++;
        if (lostFramesRef.current > 90) {
          // Ball lost for ~3 seconds, keep trail but stop updating
          setBallPos(null);
        }
      }

      // Draw trail
      const points = trailRef.current;
      if (points.length > 1) {
        // Glow trail
        for (let w = 3; w >= 1; w--) {
          octx.beginPath();
          octx.moveTo(points[0].x, points[0].y);
          for (let i = 1; i < points.length; i++) {
            octx.lineTo(points[i].x, points[i].y);
          }
          const alpha = w === 3 ? "15" : w === 2 ? "40" : "dd";
          octx.strokeStyle = `#00FF88${alpha}`;
          octx.lineWidth = w === 3 ? 16 : w === 2 ? 7 : 2.5;
          octx.lineCap = "round";
          octx.lineJoin = "round";
          octx.stroke();
        }

        // Trail dots at intervals
        for (let i = 0; i < points.length; i += Math.max(1, Math.floor(points.length / 30))) {
          const p = points[i];
          const progress = i / points.length;
          octx.beginPath();
          octx.arc(p.x, p.y, 2 + progress * 2, 0, Math.PI * 2);
          octx.fillStyle = `rgba(0, 255, 136, ${0.3 + progress * 0.5})`;
          octx.fill();
        }
      }

      // Draw ball indicator
      if (ball) {
        const sx = ball.x * scaleX;
        const sy = ball.y * scaleY;
        const sr = Math.max(8, ball.radius * Math.min(scaleX, scaleY));

        // Outer glow
        const glow = octx.createRadialGradient(sx, sy, 0, sx, sy, sr * 4);
        glow.addColorStop(0, "rgba(0, 255, 136, 0.35)");
        glow.addColorStop(1, "rgba(0, 255, 136, 0)");
        octx.fillStyle = glow;
        octx.fillRect(sx - sr * 4, sy - sr * 4, sr * 8, sr * 8);

        // Circle around ball
        octx.beginPath();
        octx.arc(sx, sy, sr + 4, 0, Math.PI * 2);
        octx.strokeStyle = "#00FF88cc";
        octx.lineWidth = 2;
        octx.stroke();

        // Crosshair
        const ch = sr + 10;
        octx.strokeStyle = "#00FF8866";
        octx.lineWidth = 1;
        octx.beginPath();
        octx.moveTo(sx - ch, sy); octx.lineTo(sx - sr - 6, sy);
        octx.moveTo(sx + sr + 6, sy); octx.lineTo(sx + ch, sy);
        octx.moveTo(sx, sy - ch); octx.lineTo(sx, sy - sr - 6);
        octx.moveTo(sx, sy + sr + 6); octx.lineTo(sx, sy + ch);
        octx.stroke();
      }
    }

    // Reset scale for next frame
    octx.setTransform(1, 0, 0, 1, 0, 0);
    animRef.current = requestAnimationFrame(processFrame);
  }, [detectBall]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(processFrame);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [processFrame]);

  const toggleTracking = () => {
    if (tracking) {
      trackingRef.current = false;
      setTracking(false);
    } else {
      trailRef.current = [];
      prevPosRef.current = null;
      lostFramesRef.current = 0;
      setTrail([]);
      setBallPos(null);
      setStats({ points: 0, speed: 0 });
      trackingRef.current = true;
      setTracking(true);
    }
  };

  const clearTrail = () => {
    trailRef.current = [];
    prevPosRef.current = null;
    lostFramesRef.current = 0;
    setTrail([]);
    setBallPos(null);
    setStats({ points: 0, speed: 0 });
  };

  return (
    <div style={{
      width: "100%", height: "100dvh", background: "#000",
      display: "flex", flexDirection: "column", overflow: "hidden",
      fontFamily: "-apple-system, 'SF Pro Display', 'Pretendard', sans-serif",
      color: "#fff", touchAction: "manipulation", userSelect: "none",
      WebkitUserSelect: "none",
    }}>
      <style>{`
        * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
        button:active { transform: scale(0.96); }
        @keyframes pulse { 0%,100% { opacity:0.6; } 50% { opacity:1; } }
        @keyframes scan { 0% { top: 0%; } 100% { top: 100%; } }
      `}</style>

      {/* Top HUD */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        padding: "max(env(safe-area-inset-top, 8px), 8px) 12px 8px",
        background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)",
        zIndex: 20, display: "flex", justifyContent: "space-between", alignItems: "flex-start",
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: tracking ? "#00FF88" : "#666",
              boxShadow: tracking ? "0 0 10px #00FF8880" : "none",
              animation: tracking ? "pulse 1.5s ease-in-out infinite" : "none",
            }} />
            <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: 1.5 }}>
              BALL TRACKER
            </span>
          </div>
          {tracking && (
            <div style={{ fontSize: 11, opacity: 0.5, marginTop: 4, marginLeft: 16 }}>
              {ballPos ? "공 감지됨 ✓" : "공을 찾는 중..."}
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={switchCamera} style={{
            width: 36, height: 36, borderRadius: 18, border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(0,0,0,0.4)", color: "#fff", fontSize: 16,
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            backdropFilter: "blur(10px)",
          }}>
            🔄
          </button>
          <button onClick={() => setShowSettings(!showSettings)} style={{
            width: 36, height: 36, borderRadius: 18, border: "1px solid rgba(255,255,255,0.2)",
            background: showSettings ? "rgba(0,255,136,0.2)" : "rgba(0,0,0,0.4)",
            color: "#fff", fontSize: 16,
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            backdropFilter: "blur(10px)",
          }}>
            ⚙️
          </button>
        </div>
      </div>

      {/* Stats overlay */}
      {tracking && trail.length > 0 && (
        <div style={{
          position: "absolute", top: "max(calc(env(safe-area-inset-top, 8px) + 56px), 64px)",
          left: 12, zIndex: 20,
          background: "rgba(0,0,0,0.5)", borderRadius: 10,
          padding: "8px 12px", backdropFilter: "blur(10px)",
          border: "1px solid rgba(0,255,136,0.15)",
        }}>
          <div style={{ fontSize: 10, opacity: 0.5, letterSpacing: 1 }}>TRACKING</div>
          <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#00FF88" }}>{stats.points}</div>
              <div style={{ fontSize: 9, opacity: 0.4 }}>포인트</div>
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#4ECDC4" }}>{stats.speed}</div>
              <div style={{ fontSize: 9, opacity: 0.4 }}>px/s</div>
            </div>
          </div>
        </div>
      )}

      {/* Settings panel */}
      {showSettings && (
        <div style={{
          position: "absolute", top: "max(calc(env(safe-area-inset-top, 8px) + 56px), 64px)",
          right: 12, zIndex: 25,
          background: "rgba(0,0,0,0.75)", borderRadius: 12,
          padding: 16, backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)", width: 220,
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>감지 설정</div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, opacity: 0.5, marginBottom: 4, display: "flex", justifyContent: "space-between" }}>
              <span>밝기 민감도</span><span>{sensitivity}%</span>
            </div>
            <input type="range" min="50" max="98" value={sensitivity}
              onChange={e => setSensitivity(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#00FF88" }} />
            <div style={{ fontSize: 9, opacity: 0.3, marginTop: 2 }}>
              낮을수록 더 많은 물체 감지 (어두운 환경에서 낮추세요)
            </div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, opacity: 0.5, marginBottom: 4, display: "flex", justifyContent: "space-between" }}>
              <span>최소 크기</span><span>{minSize}px</span>
            </div>
            <input type="range" min="2" max="20" value={minSize}
              onChange={e => setMinSize(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#00FF88" }} />
          </div>

          <div style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 11, opacity: 0.5, marginBottom: 4, display: "flex", justifyContent: "space-between" }}>
              <span>최대 크기</span><span>{maxSize}px</span>
            </div>
            <input type="range" min="20" max="80" value={maxSize}
              onChange={e => setMaxSize(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#00FF88" }} />
          </div>

          <div style={{ fontSize: 9, opacity: 0.3, marginTop: 8, lineHeight: 1.4 }}>
            💡 밝은 환경에서 가장 잘 작동합니다. 공을 화면 안에 두고 스윙하세요.
          </div>
        </div>
      )}

      {/* Camera + Overlay */}
      <div ref={containerRef} style={{
        flex: 1, position: "relative", overflow: "hidden", background: "#000",
      }}>
        <video ref={videoRef} playsInline muted
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: facingMode === "user" ? "scaleX(-1)" : "none",
          }}
        />
        <canvas ref={canvasRef} style={{ display: "none" }} />
        <canvas ref={overlayRef} style={{
          position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
          pointerEvents: "none",
          transform: facingMode === "user" ? "scaleX(-1)" : "none",
        }} />

        {/* Scanning effect when tracking but no ball */}
        {tracking && !ballPos && (
          <div style={{
            position: "absolute", left: 0, right: 0, height: 2,
            background: "linear-gradient(to right, transparent, #00FF8844, transparent)",
            animation: "scan 2s linear infinite", pointerEvents: "none",
          }} />
        )}

        {/* Center guide when not tracking */}
        {!tracking && (
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)", textAlign: "center",
            pointerEvents: "none",
          }}>
            <div style={{
              width: 80, height: 80, border: "2px solid rgba(255,255,255,0.2)",
              borderRadius: "50%", display: "flex", alignItems: "center",
              justifyContent: "center", margin: "0 auto 12px",
            }}>
              <div style={{ fontSize: 30 }}>⛳</div>
            </div>
            <div style={{ fontSize: 14, opacity: 0.6, fontWeight: 500 }}>
              골프공이 보이게 카메라를 배치하고
            </div>
            <div style={{ fontSize: 14, opacity: 0.6, fontWeight: 500, marginTop: 4 }}>
              트래킹을 시작하세요
            </div>
            <div style={{ fontSize: 11, opacity: 0.3, marginTop: 12, lineHeight: 1.5 }}>
              후방 카메라로 공 뒤에서 촬영하면<br />궤적이 실시간으로 그려집니다
            </div>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div style={{
        padding: "12px 16px max(env(safe-area-inset-bottom, 14px), 14px)",
        background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 100%)",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 20,
        flexShrink: 0, backdropFilter: "blur(20px)",
      }}>
        {/* Clear button */}
        <button onClick={clearTrail} style={{
          width: 48, height: 48, borderRadius: 24,
          border: "1px solid rgba(255,255,255,0.15)",
          background: "rgba(255,255,255,0.06)", color: "#fff",
          fontSize: 12, fontWeight: 600, cursor: "pointer",
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", gap: 2,
        }}>
          <span style={{ fontSize: 16 }}>🗑</span>
        </button>

        {/* Big tracking button */}
        <button onClick={toggleTracking} style={{
          width: 72, height: 72, borderRadius: 36, border: "none",
          background: tracking
            ? "linear-gradient(135deg, #FF3366, #FF6B35)"
            : "linear-gradient(135deg, #00FF88, #4ECDC4)",
          color: tracking ? "#fff" : "#000",
          fontSize: 13, fontWeight: 800, cursor: "pointer",
          boxShadow: tracking
            ? "0 0 30px rgba(255,51,102,0.4), inset 0 0 20px rgba(255,255,255,0.1)"
            : "0 0 30px rgba(0,255,136,0.3), inset 0 0 20px rgba(255,255,255,0.15)",
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", letterSpacing: 1, lineHeight: 1.2,
          transition: "all 0.2s",
        }}>
          {tracking ? (
            <>
              <span style={{ fontSize: 18 }}>■</span>
              <span style={{ fontSize: 9, marginTop: 2 }}>STOP</span>
            </>
          ) : (
            <>
              <span style={{ fontSize: 10, letterSpacing: 1.5 }}>START</span>
              <span style={{ fontSize: 9, opacity: 0.7, marginTop: 1 }}>TRACKING</span>
            </>
          )}
        </button>

        {/* Placeholder for symmetry */}
        <div style={{ width: 48, height: 48, borderRadius: 24, opacity: 0 }} />
      </div>
    </div>
  );
}
