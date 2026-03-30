import { useState, useRef, useEffect, useCallback } from "react";

const SHOT_TYPES = {
  straight: { name: "스트레이트", curve: 0, color: "#00FF88" },
  draw: { name: "드로우", curve: -0.6, color: "#FF6B35" },
  fade: { name: "페이드", curve: 0.6, color: "#4ECDC4" },
  hook: { name: "훅", curve: -1.4, color: "#FF3366" },
  slice: { name: "슬라이스", curve: 1.4, color: "#FFE66D" },
};

const CLUBS = [
  { name: "DR", full: "드라이버", dist: 250, height: 0.7, launch: 12 },
  { name: "3W", full: "3번 우드", dist: 220, height: 0.65, launch: 14 },
  { name: "5I", full: "5번 아이언", dist: 180, height: 0.75, launch: 20 },
  { name: "7I", full: "7번 아이언", dist: 150, height: 0.85, launch: 26 },
  { name: "PW", full: "피칭웨지", dist: 120, height: 1.0, launch: 38 },
];

export default function GolfBallTracker() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animRef = useRef(null);
  const stateRef = useRef({ ball: null, trail: [], phase: "ready", t: 0 });

  const [shotType, setShotType] = useState("straight");
  const [clubIdx, setClubIdx] = useState(0);
  const [phase, setPhase] = useState("ready");
  const [distance, setDistance] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const [wind, setWind] = useState({ speed: 0, dir: 0 });
  const [dims, setDims] = useState({ w: 400, h: 600 });

  const genWind = useCallback(() => {
    setWind({ speed: Math.round(Math.random() * 15), dir: Math.random() * Math.PI * 2 });
  }, []);

  useEffect(() => { genWind(); }, []);

  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      const ctx = canvas.getContext("2d");
      ctx.scale(dpr, dpr);
      setDims({ w, h });
    };
    resize();
    window.addEventListener("resize", resize);
    const ro = new ResizeObserver(resize);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => { window.removeEventListener("resize", resize); ro.disconnect(); };
  }, []);

  const project = useCallback((x3, y3, z3, w, h) => {
    const camZ = -30, fov = Math.min(w, h) * 1.2;
    const dz = z3 - camZ;
    if (dz <= 1) return null;
    const scale = fov / dz;
    return {
      x: w / 2 + x3 * scale,
      y: h * 0.88 - y3 * scale * 0.8,
      scale: Math.max(0.3, Math.min(3, scale * 0.15)),
    };
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = dims.w, H = dims.h;
    const st = stateRef.current;

    const skyGrad = ctx.createLinearGradient(0, 0, 0, H * 0.55);
    skyGrad.addColorStop(0, "#070d18");
    skyGrad.addColorStop(0.5, "#121f3a");
    skyGrad.addColorStop(1, "#1e3a2d");
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = "rgba(255,255,255,0.2)";
    for (let i = 0; i < 25; i++) {
      const sx = ((i * 137.5) % W);
      const sy = ((i * 73.1) % (H * 0.35));
      ctx.beginPath();
      ctx.arc(sx, sy, 0.5 + (i % 3) * 0.3, 0, Math.PI * 2);
      ctx.fill();
    }

    const groundGrad = ctx.createLinearGradient(0, H * 0.48, 0, H);
    groundGrad.addColorStop(0, "#163025");
    groundGrad.addColorStop(0.5, "#0c2016");
    groundGrad.addColorStop(1, "#07140c");
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, H * 0.44, W, H * 0.56);

    const hg = ctx.createRadialGradient(W / 2, H * 0.46, 0, W / 2, H * 0.46, W * 0.55);
    hg.addColorStop(0, "rgba(60,160,100,0.1)");
    hg.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = hg;
    ctx.fillRect(0, H * 0.25, W, H * 0.4);

    ctx.strokeStyle = "rgba(80,180,120,0.06)";
    ctx.lineWidth = 1;
    for (let z = 50; z <= 300; z += 50) {
      const left = project(-80, 0, z, W, H);
      const right = project(80, 0, z, W, H);
      if (left && right) {
        ctx.beginPath(); ctx.moveTo(left.x, left.y); ctx.lineTo(right.x, right.y); ctx.stroke();
        const mid = project(0, 0, z, W, H);
        if (mid) {
          ctx.fillStyle = "rgba(80,180,120,0.2)";
          ctx.font = `${Math.max(8, 11 * mid.scale)}px -apple-system, sans-serif`;
          ctx.textAlign = "center";
          ctx.fillText(`${z}y`, mid.x, mid.y + 3);
        }
      }
    }
    for (let x = -60; x <= 60; x += 30) {
      const near = project(x, 0, 10, W, H);
      const far = project(x, 0, 300, W, H);
      if (near && far) { ctx.beginPath(); ctx.moveTo(near.x, near.y); ctx.lineTo(far.x, far.y); ctx.stroke(); }
    }

    const cN = project(0, 0, 5, W, H), cF = project(0, 0, 300, W, H);
    if (cN && cF) {
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.setLineDash([6, 10]); ctx.beginPath(); ctx.moveTo(cN.x, cN.y); ctx.lineTo(cF.x, cF.y); ctx.stroke();
      ctx.setLineDash([]);
    }

    const shotColor = SHOT_TYPES[shotType].color;
    if (st.trail.length > 1) {
      for (let w = 3; w >= 1; w--) {
        ctx.beginPath();
        let started = false;
        for (const p of st.trail) {
          const pp = project(p.x, p.y, p.z, W, H);
          if (!pp) continue;
          if (!started) { ctx.moveTo(pp.x, pp.y); started = true; }
          else ctx.lineTo(pp.x, pp.y);
        }
        ctx.strokeStyle = w === 3 ? `${shotColor}12` : w === 2 ? `${shotColor}35` : `${shotColor}cc`;
        ctx.lineWidth = w === 3 ? 14 : w === 2 ? 6 : 2.5;
        ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.stroke();
      }

      ctx.beginPath();
      let shadowStarted = false;
      for (const p of st.trail) {
        const sp = project(p.x, 0, p.z, W, H);
        if (!sp) continue;
        if (!shadowStarted) { ctx.moveTo(sp.x, sp.y); shadowStarted = true; }
        else ctx.lineTo(sp.x, sp.y);
      }
      ctx.strokeStyle = `${shotColor}15`; ctx.lineWidth = 2; ctx.stroke();
    }

    if (st.ball) {
      const bp = project(st.ball.x, st.ball.y, st.ball.z, W, H);
      if (bp) {
        const r = Math.max(3.5, 8 * bp.scale);
        const glow = ctx.createRadialGradient(bp.x, bp.y, 0, bp.x, bp.y, r * 6);
        glow.addColorStop(0, `${shotColor}50`); glow.addColorStop(1, `${shotColor}00`);
        ctx.fillStyle = glow;
        ctx.fillRect(bp.x - r * 6, bp.y - r * 6, r * 12, r * 12);

        const bg = ctx.createRadialGradient(bp.x - r * 0.3, bp.y - r * 0.3, 0, bp.x, bp.y, r);
        bg.addColorStop(0, "#ffffff"); bg.addColorStop(0.6, "#eaeaea"); bg.addColorStop(1, "#aaa");
        ctx.beginPath(); ctx.arc(bp.x, bp.y, r, 0, Math.PI * 2);
        ctx.fillStyle = bg; ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.3)"; ctx.lineWidth = 0.8; ctx.stroke();

        if (st.ball.y > 2) {
          const groundP = project(st.ball.x, 0, st.ball.z, W, H);
          if (groundP) {
            ctx.setLineDash([3, 4]);
            ctx.strokeStyle = `${shotColor}25`; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(bp.x, bp.y); ctx.lineTo(groundP.x, groundP.y); ctx.stroke();
            ctx.setLineDash([]);
          }
        }
      }
    }

    if (st.phase === "landed" && st.trail.length > 0) {
      const last = st.trail[st.trail.length - 1];
      const lp = project(last.x, 0, last.z, W, H);
      if (lp) {
        const pulse = 0.5 + 0.5 * Math.sin(Date.now() * 0.004);
        ctx.beginPath(); ctx.arc(lp.x, lp.y, 10 + pulse * 8, 0, Math.PI * 2);
        ctx.strokeStyle = `${shotColor}66`; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.beginPath(); ctx.arc(lp.x, lp.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = shotColor; ctx.fill();
      }
    }

    if (st.phase === "ready") {
      const tp = project(0, 0, 0, W, H);
      if (tp) {
        const pulse = 0.5 + 0.5 * Math.sin(Date.now() * 0.003);
        ctx.beginPath(); ctx.arc(tp.x, tp.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.fill();
        ctx.beginPath(); ctx.arc(tp.x, tp.y, 12 + pulse * 10, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${0.1 + pulse * 0.12})`; ctx.lineWidth = 1; ctx.stroke();
      }
    }
  }, [shotType, dims, project]);

  const animate = useCallback(() => {
    const st = stateRef.current;
    const club = CLUBS[clubIdx];
    const shot = SHOT_TYPES[shotType];

    if (st.phase === "flying") {
      st.t += 0.008;
      const t = st.t;
      if (t >= 1) {
        st.phase = "landed"; setPhase("landed");
        const last = st.trail[st.trail.length - 1];
        if (last) setDistance(Math.round(Math.sqrt(last.x * last.x + last.z * last.z)));
      } else {
        const maxDist = club.dist * (0.9 + Math.random() * 0.001);
        const windEffect = wind.speed * 0.3;
        const z = maxDist * t * 0.35;
        const y = Math.sin(t * Math.PI) * club.height * 40 * (1 + club.launch * 0.01);
        const x = shot.curve * t * t * 25 + Math.sin(wind.dir) * windEffect * t * t * 3;
        st.ball = { x, y, z };
        st.trail.push({ x, y, z });
        if (y > maxHeight) setMaxHeight(Math.round(y));
      }
    }
    draw();
    animRef.current = requestAnimationFrame(animate);
  }, [clubIdx, shotType, draw, wind, maxHeight]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [animate]);

  const hitBall = () => {
    stateRef.current = { ball: { x: 0, y: 0, z: 0 }, trail: [{ x: 0, y: 0, z: 0 }], phase: "flying", t: 0 };
    setPhase("flying"); setDistance(0); setMaxHeight(0);
  };

  const reset = () => {
    stateRef.current = { ball: null, trail: [], phase: "ready", t: 0 };
    setPhase("ready"); setDistance(0); setMaxHeight(0); genWind();
  };

  const shotColor = SHOT_TYPES[shotType].color;
  const windArrows = ["→","↗","↑","↖","←","↙","↓","↘"];

  return (
    <div style={{
      width: "100%", height: "100dvh",
      background: "#060b12", display: "flex", flexDirection: "column",
      fontFamily: "-apple-system, 'SF Pro Display', 'Pretendard', sans-serif",
      color: "#fff", overflow: "hidden", position: "relative",
      touchAction: "manipulation", userSelect: "none", WebkitUserSelect: "none",
    }}>
      <style>{`
        @keyframes pulse { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
        * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
        button:active { transform: scale(0.97); }
      `}</style>

      {/* Top Bar */}
      <div style={{
        padding: "max(env(safe-area-inset-top, 8px), 8px) 14px 8px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(0,0,0,0.5)", borderBottom: "1px solid rgba(255,255,255,0.05)",
        flexShrink: 0, zIndex: 10, minHeight: 42,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 7, height: 7, borderRadius: "50%", background: shotColor,
            boxShadow: `0 0 8px ${shotColor}80`,
          }} />
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.5, opacity: 0.85 }}>
            BALL TRACKER
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            fontSize: 11, opacity: 0.45, display: "flex", alignItems: "center", gap: 4,
          }}>
            <span style={{ fontSize: 14 }}>
              {windArrows[Math.round(wind.dir / (Math.PI / 4)) % 8]}
            </span>
            {wind.speed}mph
          </div>
          <div style={{
            padding: "3px 8px", borderRadius: 4, fontSize: 10, fontWeight: 600,
            letterSpacing: 0.5,
            background: phase === "flying" ? `${shotColor}25` : "rgba(255,255,255,0.05)",
            border: `1px solid ${phase === "flying" ? `${shotColor}40` : "rgba(255,255,255,0.07)"}`,
            color: phase === "flying" ? shotColor : "rgba(255,255,255,0.45)",
          }}>
            {phase === "ready" ? "READY" : phase === "flying" ? "TRACKING" : "LANDED"}
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div ref={containerRef} style={{ flex: 1, position: "relative", minHeight: 0 }}>
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />

        {phase === "landed" && distance > 0 && (
          <div style={{
            position: "absolute", top: "38%", left: "50%",
            transform: "translate(-50%, -50%)", textAlign: "center", pointerEvents: "none",
          }}>
            <div style={{
              fontSize: "clamp(48px, 15vw, 80px)", fontWeight: 800, color: shotColor,
              textShadow: `0 0 40px ${shotColor}50, 0 2px 20px rgba(0,0,0,0.9)`,
              lineHeight: 1,
            }}>
              {distance}
            </div>
            <div style={{
              fontSize: "clamp(11px, 3vw, 14px)", fontWeight: 500,
              opacity: 0.55, letterSpacing: 3, marginTop: 2,
            }}>YARDS</div>
            <div style={{
              marginTop: 10, display: "flex", gap: 12, justifyContent: "center",
              fontSize: "clamp(10px, 2.5vw, 12px)", opacity: 0.35, flexWrap: "wrap",
            }}>
              <span>{CLUBS[clubIdx].full}</span>
              <span>·</span>
              <span>{SHOT_TYPES[shotType].name}</span>
              <span>·</span>
              <span>최고점 {maxHeight}ft</span>
            </div>
          </div>
        )}

        {phase === "ready" && (
          <div style={{
            position: "absolute", bottom: 12, left: "50%",
            transform: "translateX(-50%)", textAlign: "center",
            pointerEvents: "none", opacity: 0.3, fontSize: 11, letterSpacing: 1,
            whiteSpace: "nowrap",
          }}>
            클럽과 샷을 선택하고 스윙하세요
          </div>
        )}
      </div>

      {/* Controls */}
      <div style={{
        padding: "10px 8px max(env(safe-area-inset-bottom, 12px), 12px)",
        background: "rgba(0,0,0,0.65)", borderTop: "1px solid rgba(255,255,255,0.05)",
        backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
        flexShrink: 0,
      }}>
        {/* Clubs */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(5, 1fr)",
          gap: 4, marginBottom: 8,
        }}>
          {CLUBS.map((c, i) => (
            <button key={i} onClick={() => { setClubIdx(i); if (phase !== "flying") reset(); }}
              style={{
                padding: "8px 2px", borderRadius: 8, border: "none",
                background: clubIdx === i ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.03)",
                color: clubIdx === i ? "#fff" : "rgba(255,255,255,0.35)",
                fontSize: 13, fontWeight: clubIdx === i ? 700 : 400,
                cursor: "pointer", transition: "all 0.15s",
              }}>
              <div>{c.name}</div>
              <div style={{ fontSize: 9, opacity: 0.4, marginTop: 1 }}>{c.dist}y</div>
            </button>
          ))}
        </div>

        {/* Shot Types */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(5, 1fr)",
          gap: 4, marginBottom: 10,
        }}>
          {Object.entries(SHOT_TYPES).map(([key, s]) => (
            <button key={key} onClick={() => { setShotType(key); if (phase !== "flying") reset(); }}
              style={{
                padding: "7px 2px", borderRadius: 8,
                border: `1.5px solid ${shotType === key ? `${s.color}55` : "rgba(255,255,255,0.05)"}`,
                background: shotType === key ? `${s.color}15` : "transparent",
                color: shotType === key ? s.color : "rgba(255,255,255,0.3)",
                fontSize: 11, fontWeight: 500, cursor: "pointer",
                transition: "all 0.15s",
              }}>
              {s.name}
            </button>
          ))}
        </div>

        {/* Swing Button */}
        {phase !== "flying" ? (
          <button onClick={phase === "landed" ? reset : hitBall}
            style={{
              width: "100%", padding: "15px 0", borderRadius: 12, border: "none",
              background: phase === "landed"
                ? "rgba(255,255,255,0.08)"
                : `linear-gradient(135deg, ${shotColor}, ${shotColor}bb)`,
              color: phase === "landed" ? "rgba(255,255,255,0.7)" : "#000",
              fontSize: 17, fontWeight: 800, letterSpacing: 2,
              cursor: "pointer",
              boxShadow: phase === "landed" ? "none" : `0 0 30px ${shotColor}35`,
              transition: "all 0.15s",
            }}>
            {phase === "landed" ? "다시 치기" : "⛳ SWING"}
          </button>
        ) : (
          <div style={{
            width: "100%", padding: "15px 0", textAlign: "center",
            fontSize: 14, fontWeight: 600, color: shotColor,
            letterSpacing: 1, animation: "pulse 1s ease-in-out infinite",
          }}>
            트래킹 중...
          </div>
        )}
      </div>
    </div>
  );
}
