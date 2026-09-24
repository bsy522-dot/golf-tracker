(function(){
'use strict';
var LS='gt_v23_';
var audioCtx=null;
function getAC(){if(!audioCtx)try{audioCtx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}return audioCtx}
function playSfx(type){var ac=getAC();if(!ac)return;var o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);var t=ac.currentTime;g.gain.setValueAtTime(0.1,t);switch(type){case'tempo_open':o.type='sine';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(554,t+0.06);o.frequency.linearRampToValueAtTime(659,t+0.12);o.frequency.linearRampToValueAtTime(784,t+0.18);g.gain.exponentialRampToValueAtTime(0.01,t+0.32);o.start(t);o.stop(t+0.32);break;case'tempo_tick':o.type='triangle';o.frequency.setValueAtTime(1200,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.04);o.start(t);o.stop(t+0.04);break;case'tempo_tock':o.type='triangle';o.frequency.setValueAtTime(800,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.04);o.start(t);o.stop(t+0.04);break;case'ci_open':o.type='sine';o.frequency.setValueAtTime(392,t);o.frequency.linearRampToValueAtTime(494,t+0.07);o.frequency.linearRampToValueAtTime(622,t+0.14);g.gain.exponentialRampToValueAtTime(0.01,t+0.28);o.start(t);o.stop(t+0.28);break;case'sqi_open':o.type='sine';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(659,t+0.06);o.frequency.linearRampToValueAtTime(784,t+0.12);o.frequency.linearRampToValueAtTime(988,t+0.18);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'sqi_rate':o.type='sine';o.frequency.setValueAtTime(880,t);o.frequency.linearRampToValueAtTime(1175,t+0.06);g.gain.exponentialRampToValueAtTime(0.01,t+0.12);o.start(t);o.stop(t+0.12);break;case'slope_open':o.type='sine';o.frequency.setValueAtTime(349,t);o.frequency.linearRampToValueAtTime(440,t+0.07);o.frequency.linearRampToValueAtTime(523,t+0.14);g.gain.exponentialRampToValueAtTime(0.01,t+0.28);o.start(t);o.stop(t+0.28);break;case'slope_calc':o.type='triangle';o.frequency.setValueAtTime(659,t);o.frequency.linearRampToValueAtTime(988,t+0.08);g.gain.exponentialRampToValueAtTime(0.01,t+0.14);o.start(t);o.stop(t+0.14);break;case'tourney_open':o.type='sine';o.frequency.setValueAtTime(587,t);o.frequency.linearRampToValueAtTime(740,t+0.06);o.frequency.linearRampToValueAtTime(880,t+0.12);o.frequency.linearRampToValueAtTime(1047,t+0.18);g.gain.exponentialRampToValueAtTime(0.01,t+0.32);o.start(t);o.stop(t+0.32);break;case'tourney_hole':o.type='sine';o.frequency.setValueAtTime(784,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.06);o.start(t);o.stop(t+0.06);break;case'drivezone_open':o.type='sine';o.frequency.setValueAtTime(466,t);o.frequency.linearRampToValueAtTime(587,t+0.07);o.frequency.linearRampToValueAtTime(740,t+0.14);g.gain.exponentialRampToValueAtTime(0.01,t+0.28);o.start(t);o.stop(t+0.28);break;case'practice_open':o.type='sine';o.frequency.setValueAtTime(494,t);o.frequency.linearRampToValueAtTime(622,t+0.06);o.frequency.linearRampToValueAtTime(784,t+0.12);g.gain.exponentialRampToValueAtTime(0.01,t+0.25);o.start(t);o.stop(t+0.25);break;case'fitness_open':o.type='sine';o.frequency.setValueAtTime(370,t);o.frequency.linearRampToValueAtTime(466,t+0.07);o.frequency.linearRampToValueAtTime(587,t+0.14);o.frequency.linearRampToValueAtTime(698,t+0.21);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'quiz_correct_v23':o.type='sine';o.frequency.setValueAtTime(784,t);o.frequency.setValueAtTime(988,t+0.08);o.frequency.setValueAtTime(1175,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'quiz_wrong_v23':o.type='sawtooth';o.frequency.setValueAtTime(277,t);o.frequency.linearRampToValueAtTime(208,t+0.2);g.gain.setValueAtTime(0.06,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'achieve_v23':o.type='sine';o.frequency.setValueAtTime(988,t);o.frequency.setValueAtTime(1175,t+0.1);o.frequency.setValueAtTime(1397,t+0.2);o.frequency.setValueAtTime(1760,t+0.3);g.gain.exponentialRampToValueAtTime(0.01,t+0.5);o.start(t);o.stop(t+0.5);break;case'nav_v23':o.type='sine';o.frequency.setValueAtTime(698,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.08);o.start(t);o.stop(t+0.08);break;case'save_v23':o.type='triangle';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(784,t+0.1);g.gain.exponentialRampToValueAtTime(0.01,t+0.2);o.start(t);o.stop(t+0.2);break;default:o.type='sine';o.frequency.setValueAtTime(440,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.15);o.start(t);o.stop(t+0.15)}}

function lsGet(k,d){try{var v=localStorage.getItem(LS+k);return v?JSON.parse(v):d}catch(e){return d}}
function lsSet(k,v){try{localStorage.setItem(LS+k,JSON.stringify(v))}catch(e){}}
function todayStr(){return new Date().toISOString().slice(0,10)}
function showToast(msg){var t=document.createElement('div');t.className='v23-toast';t.textContent=msg;document.body.appendChild(t);setTimeout(function(){t.classList.add('show')},50);setTimeout(function(){t.classList.remove('show');setTimeout(function(){t.remove()},400)},3000)}
function createOverlay(id){var ov=document.createElement('div');ov.className='v23-overlay';ov.id='v23-'+id;ov.addEventListener('click',function(e){if(e.target===ov)closePanel(id)});var pn=document.createElement('div');pn.className='v23-panel';pn.style.position='relative';ov.appendChild(pn);return pn}
function openPanel(id){var el=document.getElementById('v23-'+id);if(el)el.classList.add('active')}
function closePanel(id){var el=document.getElementById('v23-'+id);if(el)el.classList.remove('active')}
function getPanel(id){var ov=document.getElementById('v23-'+id);if(!ov){var pn=createOverlay(id);pn.id='v23-'+id+'-panel';document.body.appendChild(pn.parentElement);return pn}return ov.querySelector('.v23-panel')||ov}

// ===== 1. SWING TEMPO METRONOME Canvas 620x400 =====
function showSwingTempo(){
playSfx('tempo_open');
var pn=getPanel('tempo');
var log=lsGet('tempo_log',[]);
var bpm=lsGet('tempo_bpm',72);
var ratio=lsGet('tempo_ratio','3:1');
var RATIOS=['3:1','2.5:1','2:1','4:1'];
var html='<button class="v23-close" onclick="window._v23Close(\'tempo\')">&times;</button>';
html+='<div class="v23-title">🎵 스윙 템포 메트로놈</div>';
html+='<canvas id="v23-tempo-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v23-card"><h3>템포 설정</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';
html+='<div><label class="v23-label">BPM (박자/분)</label><input class="v23-input" type="number" id="v23-bpm" value="'+bpm+'" min="40" max="120"></div>';
html+='<div><label class="v23-label">백스윙:다운스윙 비율</label><select class="v23-input" id="v23-ratio">';
for(var i=0;i<RATIOS.length;i++)html+='<option'+(RATIOS[i]===ratio?' selected':'')+'>'+RATIOS[i]+'</option>';
html+='</select></div></div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:8px">';
html+='<button class="v23-btn v23-btn-primary" id="v23-tempo-start" onclick="window._v23ToggleTempo()">▶ 시작</button>';
html+='<button class="v23-btn" onclick="window._v23RecordTempo()">💾 기록</button>';
html+='<button class="v23-btn" onclick="window._v23TapTempo()">👏 탭 템포</button>';
html+='</div></div>';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#00FF88">'+bpm+'</div><div class="v23-stat-label">BPM</div></div>';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#FFB800">'+ratio+'</div><div class="v23-stat-label">비율</div></div>';
var avgBpm=0;if(log.length>0){for(var j=0;j<log.length;j++)avgBpm+=log[j].bpm;avgBpm=Math.round(avgBpm/log.length)}
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#4ECDC4">'+avgBpm+'</div><div class="v23-stat-label">평균 BPM</div></div>';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#A855F7">'+log.length+'</div><div class="v23-stat-label">세션</div></div>';
html+='</div>';
if(log.length>0)html+='<button class="v23-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'초기화?\'))window._v23ResetTempo()">초기화</button>';
pn.innerHTML=html;openPanel('tempo');drawTempoCanvas(log,bpm,ratio);
}
var _tempoInterval=null;var _tempoCount=0;var _tapTimes=[];
window._v23ToggleTempo=function(){
var btn=document.getElementById('v23-tempo-start');
if(_tempoInterval){clearInterval(_tempoInterval);_tempoInterval=null;_tempoCount=0;if(btn)btn.innerHTML='▶ 시작';return}
var bpm=parseInt(document.getElementById('v23-bpm').value)||72;
var rStr=(document.getElementById('v23-ratio').value||'3:1').split(':');
var bRatio=parseFloat(rStr[0])||3;var dRatio=parseFloat(rStr[1])||1;
var totalBeats=bRatio+dRatio;
var interval=60000/bpm;
_tempoCount=0;
if(btn)btn.innerHTML='⏸ 정지';
_tempoInterval=setInterval(function(){
_tempoCount++;
var beatInCycle=(_tempoCount-1)%Math.round(totalBeats);
if(beatInCycle<Math.round(bRatio))playSfx('tempo_tick');
else playSfx('tempo_tock');
},interval);
};
window._v23TapTempo=function(){
var now=performance.now();
_tapTimes.push(now);
if(_tapTimes.length>8)_tapTimes.shift();
if(_tapTimes.length>=2){
var diffs=[];for(var i=1;i<_tapTimes.length;i++)diffs.push(_tapTimes[i]-_tapTimes[i-1]);
var avg=0;for(var i=0;i<diffs.length;i++)avg+=diffs[i];avg/=diffs.length;
var detectedBpm=Math.round(60000/avg);
if(detectedBpm>=40&&detectedBpm<=180){
var el=document.getElementById('v23-bpm');if(el)el.value=detectedBpm;
showToast('Tap BPM: '+detectedBpm);
}
}
playSfx('tempo_tick');
};
window._v23RecordTempo=function(){
playSfx('save_v23');
var bpm=parseInt(document.getElementById('v23-bpm').value)||72;
var ratio=document.getElementById('v23-ratio').value||'3:1';
var log=lsGet('tempo_log',[]);
log.push({date:todayStr(),bpm:bpm,ratio:ratio});
if(log.length>50)log.shift();
lsSet('tempo_log',log);lsSet('tempo_bpm',bpm);lsSet('tempo_ratio',ratio);
showToast('템포 기록 저장!');checkAchievements();showSwingTempo();
};
window._v23ResetTempo=function(){lsSet('tempo_log',[]);showSwingTempo();};
function drawTempoCanvas(log,bpm,ratio){
var c=document.getElementById('v23-tempo-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,W,H);
ctx.fillStyle='rgba(0,255,136,0.05)';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 16px sans-serif';ctx.textAlign='center';
ctx.fillText('Swing Tempo Trend ('+log.length+' sessions)',W/2,28);
if(log.length<2){ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='13px sans-serif';ctx.fillText('2+ sessions needed for trend',W/2,H/2);return}
var maxBpm=0,minBpm=999;
for(var i=0;i<log.length;i++){if(log[i].bpm>maxBpm)maxBpm=log[i].bpm;if(log[i].bpm<minBpm)minBpm=log[i].bpm}
var range=Math.max(maxBpm-minBpm,20);var padTop=55,padBot=50,padL=50,padR=30;
var chartW=W-padL-padR,chartH=H-padTop-padBot;
ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.lineWidth=1;
for(var i=0;i<=4;i++){
var y=padTop+chartH*(i/4);
ctx.beginPath();ctx.moveTo(padL,y);ctx.lineTo(padL+chartW,y);ctx.stroke();
var val=Math.round(maxBpm+5-((range+10)*(i/4)));
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='10px sans-serif';ctx.textAlign='right';
ctx.fillText(val+'',padL-6,y+4);
}
// ideal zone
var idealTop=padTop+chartH*((maxBpm+5-76)/(range+10));
var idealBot=padTop+chartH*((maxBpm+5-68)/(range+10));
if(idealBot>idealTop){ctx.fillStyle='rgba(0,255,136,0.08)';ctx.fillRect(padL,idealTop,chartW,idealBot-idealTop);
ctx.fillStyle='rgba(0,255,136,0.3)';ctx.font='9px sans-serif';ctx.textAlign='left';ctx.fillText('Ideal Zone 68-76',padL+4,idealTop+10)}
ctx.beginPath();ctx.strokeStyle='#00FF88';ctx.lineWidth=2;
var last=Math.min(log.length,30);var start=log.length-last;
for(var i=0;i<last;i++){
var x=padL+chartW*(i/(last-1));
var y=padTop+chartH*((maxBpm+5-log[start+i].bpm)/(range+10));
if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
}
ctx.stroke();
for(var i=0;i<last;i++){
var x=padL+chartW*(i/(last-1));
var y=padTop+chartH*((maxBpm+5-log[start+i].bpm)/(range+10));
ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.fillStyle='#00FF88';ctx.fill();
if(i%3===0||i===last-1){ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='8px sans-serif';ctx.textAlign='center';ctx.fillText(log[start+i].date.slice(5),x,H-padBot+14)}
}
// ratio bar at bottom
ctx.fillStyle='#fff';ctx.font='bold 11px sans-serif';ctx.textAlign='center';
var rParts=ratio.split(':');var bR=parseFloat(rParts[0])||3;var dR=parseFloat(rParts[1])||1;var total=bR+dR;
var barX=padL+chartW*0.15,barW=chartW*0.7,barY=H-28,barH=14;
var bW=barW*(bR/total),dW=barW*(dR/total);
ctx.fillStyle='rgba(78,205,196,0.4)';ctx.fillRect(barX,barY,bW,barH);
ctx.fillStyle='rgba(255,184,0,0.4)';ctx.fillRect(barX+bW,barY,dW,barH);
ctx.fillStyle='#4ECDC4';ctx.font='9px sans-serif';ctx.fillText('Backswing',barX+bW/2,barY+11);
ctx.fillStyle='#FFB800';ctx.fillText('Downswing',barX+bW+dW/2,barY+11);
}

// ===== 2. CLUB DISTANCE CONFIDENCE INTERVAL Canvas 600x380 =====
function showClubCI(){
playSfx('ci_open');
var pn=getPanel('ci');
var data=lsGet('ci_data',{});
var CLUBS=['Driver','3W','5W','4I','5I','6I','7I','8I','9I','PW','GW','SW','LW'];
var html='<button class="v23-close" onclick="window._v23Close(\'ci\')">&times;</button>';
html+='<div class="v23-title">📏 클럽 비거리 신뢰구간</div>';
html+='<canvas id="v23-ci-canvas" width="600" height="380" style="width:100%;max-width:600px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v23-card"><h3>샷 거리 입력</h3>';
html+='<div style="display:grid;grid-template-columns:auto 1fr auto;gap:6px;align-items:center">';
html+='<select class="v23-input" id="v23-ci-club" style="width:90px">';
for(var i=0;i<CLUBS.length;i++)html+='<option>'+CLUBS[i]+'</option>';
html+='</select>';
html+='<input class="v23-input" type="number" id="v23-ci-dist" placeholder="거리(yd)" min="10" max="350">';
html+='<button class="v23-btn v23-btn-primary" onclick="window._v23AddCI()">추가</button>';
html+='</div></div>';
var totalShots=0;for(var k in data)if(data[k])totalShots+=data[k].length;
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#00FF88">'+totalShots+'</div><div class="v23-stat-label">총 샷수</div></div>';
var clubCount=0;for(var k in data)if(data[k]&&data[k].length>=3)clubCount++;
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#FFB800">'+clubCount+'</div><div class="v23-stat-label">분석가능 클럽</div></div>';
var grade=totalShots>=100?'S':totalShots>=60?'A':totalShots>=30?'B':totalShots>=10?'C':'D';
var gColor=grade==='S'?'#FFD700':grade==='A'?'#00FF88':grade==='B'?'#4ECDC4':grade==='C'?'#FFB800':'#FF6B6B';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:'+gColor+'">'+grade+'</div><div class="v23-stat-label">데이터 등급</div></div>';
html+='</div>';
if(totalShots>0)html+='<button class="v23-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'초기화?\'))window._v23ResetCI()">초기화</button>';
pn.innerHTML=html;openPanel('ci');drawCICanvas(data,CLUBS);
}
window._v23AddCI=function(){
playSfx('save_v23');
var club=document.getElementById('v23-ci-club').value;
var dist=parseInt(document.getElementById('v23-ci-dist').value);
if(!dist||dist<10)return showToast('거리를 입력하세요');
var data=lsGet('ci_data',{});
if(!data[club])data[club]=[];
data[club].push(dist);
if(data[club].length>100)data[club].shift();
lsSet('ci_data',data);showToast(club+': '+dist+'yd 추가');checkAchievements();showClubCI();
};
window._v23ResetCI=function(){lsSet('ci_data',{});showClubCI();};
function drawCICanvas(data,CLUBS){
var c=document.getElementById('v23-ci-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=600,H=380;ctx.clearRect(0,0,W,H);
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Club Distance Box Plot (Min/Q1/Med/Q3/Max)',W/2,24);
var padTop=44,padBot=40,padL=50,padR=20;
var chartW=W-padL-padR,chartH=H-padTop-padBot;
var allDists=[];for(var k in data)if(data[k])for(var i=0;i<data[k].length;i++)allDists.push(data[k][i]);
if(allDists.length===0){ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='13px sans-serif';ctx.fillText('Add shot distances to see box plot',W/2,H/2);return}
var maxD=Math.max.apply(null,allDists)+10,minD=Math.max(0,Math.min.apply(null,allDists)-10);
var range=maxD-minD;
ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.lineWidth=1;
for(var i=0;i<=5;i++){var x=padL+chartW*(i/5);ctx.beginPath();ctx.moveTo(x,padTop);ctx.lineTo(x,padTop+chartH);ctx.stroke();
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='9px sans-serif';ctx.textAlign='center';ctx.fillText(Math.round(minD+range*(i/5))+'',x,padTop+chartH+14)}
ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='9px sans-serif';ctx.textAlign='center';ctx.fillText('Distance (yd)',W/2,H-6);
var colors=['#00FF88','#4ECDC4','#FFB800','#A855F7','#FF6B6B','#3B82F6','#EC4899','#10B981','#F59E0B','#6366F1','#EF4444','#14B8A6','#F97316'];
var validClubs=[];for(var i=0;i<CLUBS.length;i++)if(data[CLUBS[i]]&&data[CLUBS[i]].length>=3)validClubs.push(CLUBS[i]);
if(validClubs.length===0){ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='12px sans-serif';ctx.fillText('Need 3+ shots per club for box plot',W/2,H/2);return}
var rowH=chartH/validClubs.length;
for(var i=0;i<validClubs.length;i++){
var club=validClubs[i];var d=data[club].slice().sort(function(a,b){return a-b});
var n=d.length;var mn=d[0],mx=d[n-1];
var q1=d[Math.floor(n*0.25)],med=d[Math.floor(n*0.5)],q3=d[Math.floor(n*0.75)];
var y=padTop+rowH*i+rowH*0.2;var bh=rowH*0.6;
var xMn=padL+chartW*((mn-minD)/range);
var xMx=padL+chartW*((mx-minD)/range);
var xQ1=padL+chartW*((q1-minD)/range);
var xQ3=padL+chartW*((q3-minD)/range);
var xMed=padL+chartW*((med-minD)/range);
var col=colors[i%colors.length];
// whiskers
ctx.strokeStyle=col;ctx.lineWidth=1;
ctx.beginPath();ctx.moveTo(xMn,y+bh/2);ctx.lineTo(xQ1,y+bh/2);ctx.stroke();
ctx.beginPath();ctx.moveTo(xQ3,y+bh/2);ctx.lineTo(xMx,y+bh/2);ctx.stroke();
ctx.beginPath();ctx.moveTo(xMn,y+bh*0.3);ctx.lineTo(xMn,y+bh*0.7);ctx.stroke();
ctx.beginPath();ctx.moveTo(xMx,y+bh*0.3);ctx.lineTo(xMx,y+bh*0.7);ctx.stroke();
// box
ctx.fillStyle=col.replace(')',',0.2)').replace('rgb','rgba');
if(col.charAt(0)==='#'){var r=parseInt(col.slice(1,3),16),gg=parseInt(col.slice(3,5),16),b=parseInt(col.slice(5,7),16);ctx.fillStyle='rgba('+r+','+gg+','+b+',0.2)'}
ctx.fillRect(xQ1,y,xQ3-xQ1,bh);
ctx.strokeStyle=col;ctx.lineWidth=1.5;ctx.strokeRect(xQ1,y,xQ3-xQ1,bh);
// median line
ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(xMed,y);ctx.lineTo(xMed,y+bh);ctx.stroke();
// label
ctx.fillStyle='#fff';ctx.font='bold 10px sans-serif';ctx.textAlign='right';
ctx.fillText(club,padL-6,y+bh/2+4);
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='8px sans-serif';ctx.textAlign='left';
ctx.fillText(med+'yd',xMed+4,y-2);
}
}

// ===== 3. SHOT QUALITY INDEX (SQI) Canvas 620x400 =====
function showSQI(){
playSfx('sqi_open');
var pn=getPanel('sqi');
var log=lsGet('sqi_log',[]);
var AXES=['비거리','방향','탄도','스핀','착지','결과','의도'];
var AXES_EN=['Distance','Direction','Trajectory','Spin','Landing','Result','Intent'];
var html='<button class="v23-close" onclick="window._v23Close(\'sqi\')">&times;</button>';
html+='<div class="v23-title">⭐ 샷 퀸리티 인덱스 (SQI)</div>';
html+='<canvas id="v23-sqi-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v23-card"><h3>샷 평가 (1~10점)</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px">';
for(var i=0;i<AXES.length;i++){
html+='<div><label class="v23-label">'+AXES[i]+'</label><input class="v23-input v23-sqi-in" type="number" min="1" max="10" value="7" data-axis="'+i+'"></div>';
}
html+='<div><button class="v23-btn v23-btn-primary" style="height:100%;width:100%" onclick="window._v23RateSQI()">🎯 평가</button></div>';
html+='</div></div>';
var avgSqi=0;if(log.length>0){for(var j=0;j<log.length;j++)avgSqi+=log[j].total;avgSqi=Math.round(avgSqi/log.length*10)/10}
var bestSqi=0;for(var j=0;j<log.length;j++)if(log[j].total>bestSqi)bestSqi=log[j].total;
var sqiGrade=avgSqi>=9?'S':avgSqi>=7.5?'A':avgSqi>=6?'B':avgSqi>=4?'C':'D';
var sqiColor=sqiGrade==='S'?'#FFD700':sqiGrade==='A'?'#00FF88':sqiGrade==='B'?'#4ECDC4':sqiGrade==='C'?'#FFB800':'#FF6B6B';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#00FF88">'+log.length+'</div><div class="v23-stat-label">평가회</div></div>';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#FFB800">'+avgSqi+'</div><div class="v23-stat-label">평균 SQI</div></div>';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#4ECDC4">'+bestSqi+'</div><div class="v23-stat-label">최고 SQI</div></div>';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:'+sqiColor+'">'+sqiGrade+'</div><div class="v23-stat-label">등급</div></div>';
html+='</div>';
if(log.length>0)html+='<button class="v23-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'초기화?\'))window._v23ResetSQI()">초기화</button>';
pn.innerHTML=html;openPanel('sqi');drawSQICanvas(log,AXES_EN);
}
window._v23RateSQI=function(){
playSfx('sqi_rate');
var inputs=document.querySelectorAll('.v23-sqi-in');var scores=[];var total=0;
for(var i=0;i<inputs.length;i++){var v=parseInt(inputs[i].value)||5;v=Math.max(1,Math.min(10,v));scores.push(v);total+=v}
total=Math.round(total/scores.length*10)/10;
var log=lsGet('sqi_log',[]);log.push({date:todayStr(),scores:scores,total:total});
if(log.length>50)log.shift();lsSet('sqi_log',log);
showToast('SQI: '+total+'/10');checkAchievements();showSQI();
};
window._v23ResetSQI=function(){lsSet('sqi_log',[]);showSQI();};
function drawSQICanvas(log,axes){
var c=document.getElementById('v23-sqi-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);ctx.fillStyle='#0d1117';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Shot Quality Radar (7-axis)',W/2,24);
var cx=W/2,cy=H/2+10,R=130,n=axes.length;
// grid
for(var r=2;r<=10;r+=2){
ctx.beginPath();ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.lineWidth=1;
for(var i=0;i<=n;i++){
var angle=-Math.PI/2+(2*Math.PI*i/n);
var x=cx+R*(r/10)*Math.cos(angle),y=cy+R*(r/10)*Math.sin(angle);
if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
}
ctx.closePath();ctx.stroke();
}
// axis lines + labels
for(var i=0;i<n;i++){
var angle=-Math.PI/2+(2*Math.PI*i/n);
ctx.beginPath();ctx.strokeStyle='rgba(255,255,255,0.1)';
ctx.moveTo(cx,cy);ctx.lineTo(cx+R*Math.cos(angle),cy+R*Math.sin(angle));ctx.stroke();
var lx=cx+(R+20)*Math.cos(angle),ly=cy+(R+20)*Math.sin(angle);
ctx.fillStyle='rgba(255,255,255,0.7)';ctx.font='10px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
ctx.fillText(axes[i],lx,ly);
}
if(log.length===0){ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='13px sans-serif';ctx.fillText('Rate shots to see radar',cx,cy);return}
// latest entry
var latest=log[log.length-1];
ctx.beginPath();ctx.fillStyle='rgba(0,255,136,0.15)';ctx.strokeStyle='#00FF88';ctx.lineWidth=2;
for(var i=0;i<n;i++){
var angle=-Math.PI/2+(2*Math.PI*i/n);
var val=latest.scores[i]/10;
var x=cx+R*val*Math.cos(angle),y=cy+R*val*Math.sin(angle);
if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
}
ctx.closePath();ctx.fill();ctx.stroke();
// avg if >1
if(log.length>1){
var avgScores=[];for(var a=0;a<n;a++){var s=0;for(var j=0;j<log.length;j++)s+=log[j].scores[a];avgScores.push(s/log.length)}
ctx.beginPath();ctx.strokeStyle='rgba(255,184,0,0.5)';ctx.lineWidth=1;ctx.setLineDash([4,3]);
for(var i=0;i<n;i++){
var angle=-Math.PI/2+(2*Math.PI*i/n);
var val=avgScores[i]/10;
var x=cx+R*val*Math.cos(angle),y=cy+R*val*Math.sin(angle);
if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
}
ctx.closePath();ctx.stroke();ctx.setLineDash([]);
}
ctx.fillStyle='#00FF88';ctx.font='bold 28px sans-serif';ctx.textAlign='center';
ctx.fillText(latest.total+'',cx,cy+4);
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='10px sans-serif';ctx.fillText('SQI',cx,cy+18);
}

// ===== 4. GREEN SLOPE CALCULATOR Canvas 600x380 =====
function showGreenSlope(){
playSfx('slope_open');
var pn=getPanel('slope');
var log=lsGet('slope_log',[]);
var html='<button class="v23-close" onclick="window._v23Close(\'slope\')">&times;</button>';
html+='<div class="v23-title">⛳ 그린 경사 계산기</div>';
html+='<canvas id="v23-slope-canvas" width="600" height="380" style="width:100%;max-width:600px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v23-card"><h3>경사 입력 (%)</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:6px">';
html+='<div><label class="v23-label">앞-뒤 (+ = 오르막)</label><input class="v23-input" type="number" id="v23-slope-fb" value="0" min="-10" max="10" step="0.5"></div>';
html+='<div><label class="v23-label">좌-우 (+ = 우측)</label><input class="v23-input" type="number" id="v23-slope-lr" value="0" min="-10" max="10" step="0.5"></div>';
html+='<div><label class="v23-label">거리 (ft)</label><input class="v23-input" type="number" id="v23-slope-dist" value="20" min="1" max="100"></div>';
html+='<div><label class="v23-label">그린스피드 (Stimp)</label><input class="v23-input" type="number" id="v23-slope-stimp" value="10" min="6" max="14" step="0.5"></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
html+='<button class="v23-btn v23-btn-primary" onclick="window._v23CalcSlope()">📐 계산</button>';
html+='<button class="v23-btn" onclick="window._v23SaveSlope()">💾 저장</button>';
html+='</div></div>';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#00FF88">'+log.length+'</div><div class="v23-stat-label">기록</div></div>';
var avgSlope=0;if(log.length>0){for(var j=0;j<log.length;j++)avgSlope+=Math.abs(log[j].fb)+Math.abs(log[j].lr);avgSlope=Math.round(avgSlope/log.length*10)/10}
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#FFB800">'+avgSlope+'%</div><div class="v23-stat-label">평균 경사</div></div>';
var uphill=0;for(var j=0;j<log.length;j++)if(log[j].fb>0)uphill++;
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#4ECDC4">'+(log.length>0?Math.round(uphill/log.length*100):0)+'%</div><div class="v23-stat-label">오르막</div></div>';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#A855F7">'+(log.length>0?Math.round((log.length-uphill)/log.length*100):0)+'%</div><div class="v23-stat-label">내리막</div></div>';
html+='</div>';
if(log.length>0)html+='<button class="v23-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'초기화?\'))window._v23ResetSlope()">초기화</button>';
pn.innerHTML=html;openPanel('slope');drawSlopeCanvas(log);
}
window._v23CalcSlope=function(){
playSfx('slope_calc');
var fb=parseFloat(document.getElementById('v23-slope-fb').value)||0;
var lr=parseFloat(document.getElementById('v23-slope-lr').value)||0;
var dist=parseFloat(document.getElementById('v23-slope-dist').value)||20;
var stimp=parseFloat(document.getElementById('v23-slope-stimp').value)||10;
var aimAdj=Math.round(Math.atan2(lr,1)*180/Math.PI*10)/10;
var speedAdj=fb>0?Math.round(dist*(1+fb*0.04))+'ft':Math.round(dist*(1-Math.abs(fb)*0.03))+'ft';
var breakAmt=Math.round(Math.abs(lr)*dist*0.15*10)/10;
showToast('Aim: '+aimAdj+'° | Speed: '+speedAdj+' | Break: '+breakAmt+'in');
drawSlopeCanvas(lsGet('slope_log',[]),{fb:fb,lr:lr,dist:dist,stimp:stimp,aimAdj:aimAdj,breakAmt:breakAmt});
};
window._v23SaveSlope=function(){
playSfx('save_v23');
var fb=parseFloat(document.getElementById('v23-slope-fb').value)||0;
var lr=parseFloat(document.getElementById('v23-slope-lr').value)||0;
var dist=parseFloat(document.getElementById('v23-slope-dist').value)||20;
var stimp=parseFloat(document.getElementById('v23-slope-stimp').value)||10;
var log=lsGet('slope_log',[]);log.push({date:todayStr(),fb:fb,lr:lr,dist:dist,stimp:stimp});
if(log.length>50)log.shift();lsSet('slope_log',log);
showToast('경사 기록 저장!');checkAchievements();showGreenSlope();
};
window._v23ResetSlope=function(){lsSet('slope_log',[]);showGreenSlope();};
function drawSlopeCanvas(log,calc){
var c=document.getElementById('v23-slope-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=600,H=380;ctx.clearRect(0,0,W,H);ctx.fillStyle='#0d1117';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Green Slope AimPoint Visualizer',W/2,24);
// draw green
var gx=W/2,gy=H/2+10,gr=120;
var grad=ctx.createRadialGradient(gx,gy,0,gx,gy,gr);
grad.addColorStop(0,'#1a7a3a');grad.addColorStop(1,'#0d4d22');
ctx.beginPath();ctx.ellipse(gx,gy,gr,gr*0.85,0,0,Math.PI*2);ctx.fillStyle=grad;ctx.fill();
ctx.strokeStyle='rgba(255,255,255,0.15)';ctx.lineWidth=1;ctx.stroke();
// hole
ctx.beginPath();ctx.arc(gx,gy-20,5,0,Math.PI*2);ctx.fillStyle='#222';ctx.fill();
ctx.strokeStyle='#fff';ctx.lineWidth=1;ctx.stroke();
// flag
ctx.strokeStyle='#fff';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(gx,gy-20);ctx.lineTo(gx,gy-55);ctx.stroke();
ctx.fillStyle='#FF3366';ctx.beginPath();ctx.moveTo(gx,gy-55);ctx.lineTo(gx+15,gy-48);ctx.lineTo(gx,gy-41);ctx.fill();
// ball position
ctx.beginPath();ctx.arc(gx,gy+60,4,0,Math.PI*2);ctx.fillStyle='#fff';ctx.fill();
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='9px sans-serif';ctx.fillText('Ball',gx,gy+72);
if(calc){
// aim line
var aimAngle=(-90+calc.aimAdj)*Math.PI/180;
var lineLen=80;
ctx.beginPath();ctx.strokeStyle='#FFB800';ctx.lineWidth=2;ctx.setLineDash([5,3]);
ctx.moveTo(gx,gy+60);ctx.lineTo(gx+lineLen*Math.cos(aimAngle),gy+60+lineLen*Math.sin(aimAngle));
ctx.stroke();ctx.setLineDash([]);
// break arrow
if(Math.abs(calc.lr)>0.3){
var dir=calc.lr>0?1:-1;
ctx.fillStyle='rgba(78,205,196,0.6)';ctx.font='bold 20px sans-serif';
ctx.fillText(dir>0?'→':'←',gx+dir*40,gy+20);
ctx.fillStyle='#4ECDC4';ctx.font='10px sans-serif';
ctx.fillText('Break: '+calc.breakAmt+'in',gx+dir*40,gy+35);
}
// slope indicator
ctx.fillStyle='#FFB800';ctx.font='bold 11px sans-serif';
if(calc.fb>0)ctx.fillText('↑ Uphill +'+calc.fb+'%',gx,gy-70);
else if(calc.fb<0)ctx.fillText('↓ Downhill '+calc.fb+'%',gx,gy-70);
ctx.fillStyle='#00FF88';ctx.font='10px sans-serif';
ctx.fillText('Aim: '+calc.aimAdj+'°',gx-gr-30,gy);
} else {
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='11px sans-serif';
ctx.fillText('Enter slope and press Calculate',gx,H-30);
}
// slope arrows
ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='9px sans-serif';
ctx.fillText('↑ Front',gx,padT(gy,-gr-12));ctx.fillText('↓ Back',gx,gy+gr*0.85+14);
ctx.fillText('← Left',gx-gr-15,gy);ctx.fillText('Right →',gx+gr+15,gy);
function padT(a,b){return a+b}
}

// ===== 5. TOURNAMENT SCORING SIMULATOR Canvas 620x380 =====
function showTourneySim(){
playSfx('tourney_open');
var pn=getPanel('tourney');
var log=lsGet('tourney_log',[]);
var mode=lsGet('tourney_mode','stroke');
var MODES=[{id:'stroke',name:'Stroke Play'},{id:'match',name:'Match Play'},{id:'stableford',name:'Stableford'},{id:'skins',name:'Skins'}];
var PARS=[4,4,3,5,4,4,3,4,5,4,3,5,4,4,3,4,5,4];
var html='<button class="v23-close" onclick="window._v23Close(\'tourney\')">&times;</button>';
html+='<div class="v23-title">🏆 토너먼트 스코어링 시뮬</div>';
html+='<canvas id="v23-tourney-canvas" width="620" height="380" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v23-card"><h3>방식 선택</h3>';
html+='<div style="display:flex;gap:4px;flex-wrap:wrap">';
for(var i=0;i<MODES.length;i++)html+='<button class="v23-btn v23-btn-sm'+(MODES[i].id===mode?' v23-btn-primary':'')+'" onclick="window._v23SetTourneyMode(\''+MODES[i].id+'\')">'+MODES[i].name+'</button>';
html+='</div></div>';
html+='<div class="v23-card"><h3>18홀 스코어 입력</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(9,1fr);gap:2px;font-size:10px;text-align:center">';
for(var h=0;h<18;h++){
var saved=lsGet('tourney_scores',[]);var val=saved[h]||PARS[h];
html+='<div><div style="color:rgba(255,255,255,0.4)">H'+(h+1)+'</div><div style="color:rgba(255,255,255,0.3);font-size:8px">P'+PARS[h]+'</div><input class="v23-input v23-tourney-in" type="number" value="'+val+'" min="1" max="12" style="width:100%;padding:3px;font-size:10px;text-align:center" data-hole="'+h+'"></div>';
}
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
html+='<button class="v23-btn v23-btn-primary" onclick="window._v23CalcTourney()">📊 계산</button>';
html+='<button class="v23-btn" onclick="window._v23SaveTourney()">💾 저장</button>';
html+='</div></div>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#00FF88">'+log.length+'</div><div class="v23-stat-label">라운드</div></div>';
var avgScore=0;if(log.length>0){for(var j=0;j<log.length;j++)avgScore+=log[j].total;avgScore=Math.round(avgScore/log.length)}
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#FFB800">'+avgScore+'</div><div class="v23-stat-label">평균 스코어</div></div>';
var bestScore=999;for(var j=0;j<log.length;j++)if(log[j].total<bestScore)bestScore=log[j].total;if(bestScore===999)bestScore=0;
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#4ECDC4">'+bestScore+'</div><div class="v23-stat-label">베스트</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('tourney');drawTourneyCanvas(log,mode,PARS);
}
window._v23SetTourneyMode=function(m){lsSet('tourney_mode',m);showTourneySim();};
window._v23CalcTourney=function(){
playSfx('tourney_hole');
var inputs=document.querySelectorAll('.v23-tourney-in');
var scores=[];var total=0;var PARS=[4,4,3,5,4,4,3,4,5,4,3,5,4,4,3,4,5,4];
for(var i=0;i<inputs.length;i++){var v=parseInt(inputs[i].value)||PARS[i];scores.push(v);total+=v}
lsSet('tourney_scores',scores);
var par=0;for(var i=0;i<PARS.length;i++)par+=PARS[i];
var diff=total-par;var diffStr=diff>0?'+'+diff:diff===0?'E':''+diff;
var mode=lsGet('tourney_mode','stroke');
var result='';
if(mode==='stroke')result='Total: '+total+' ('+diffStr+')';
else if(mode==='stableford'){var pts=0;for(var i=0;i<scores.length;i++){var d=PARS[i]-scores[i];if(d>=3)pts+=5;else if(d===2)pts+=4;else if(d===1)pts+=3;else if(d===0)pts+=2;else if(d===-1)pts+=1}result='Stableford: '+pts+'pts'}
else if(mode==='skins'){var skins=0;for(var i=0;i<scores.length;i++)if(scores[i]<=PARS[i]-1)skins++;result='Skins Won: '+skins}
else result='Total: '+total+' ('+diffStr+')';
showToast(result);drawTourneyCanvas(lsGet('tourney_log',[]),mode,PARS,scores);
};
window._v23SaveTourney=function(){
playSfx('save_v23');
var inputs=document.querySelectorAll('.v23-tourney-in');
var scores=[];var total=0;var PARS=[4,4,3,5,4,4,3,4,5,4,3,5,4,4,3,4,5,4];
for(var i=0;i<inputs.length;i++){var v=parseInt(inputs[i].value)||PARS[i];scores.push(v);total+=v}
var log=lsGet('tourney_log',[]);log.push({date:todayStr(),scores:scores,total:total,mode:lsGet('tourney_mode','stroke')});
if(log.length>30)log.shift();lsSet('tourney_log',log);lsSet('tourney_scores',scores);
showToast('토너먼트 기록 저장!');checkAchievements();showTourneySim();
};
function drawTourneyCanvas(log,mode,PARS,current){
var c=document.getElementById('v23-tourney-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=380;ctx.clearRect(0,0,W,H);ctx.fillStyle='#0d1117';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Tournament Scorecard - '+mode.charAt(0).toUpperCase()+mode.slice(1),W/2,24);
var scores=current||lsGet('tourney_scores',[]);
if(scores.length<18){ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='13px sans-serif';ctx.fillText('Enter scores and press Calculate',W/2,H/2);return}
var padTop=44,padBot=36,padL=40,padR=20;
var chartW=W-padL-padR,chartH=H-padTop-padBot;
var barW=chartW/18;
var par=0;for(var i=0;i<PARS.length;i++)par+=PARS[i];
// par line
var maxDiff=0;for(var i=0;i<18;i++){var d=Math.abs(scores[i]-PARS[i]);if(d>maxDiff)maxDiff=d}
maxDiff=Math.max(maxDiff,3);
var zeroY=padTop+chartH/2;
for(var i=0;i<18;i++){
var diff=scores[i]-PARS[i];
var barH=(diff/maxDiff)*(chartH/2-10);
var x=padL+barW*i+barW*0.15;var w=barW*0.7;
var color=diff<=-2?'#FFD700':diff===-1?'#00FF88':diff===0?'#4ECDC4':diff===1?'#FFB800':diff===2?'#FF6B6B':'#FF3366';
if(diff>0){ctx.fillStyle=color;ctx.fillRect(x,zeroY,w,barH)}
else if(diff<0){ctx.fillStyle=color;ctx.fillRect(x,zeroY+barH,w,-barH)}
else{ctx.fillStyle=color;ctx.fillRect(x,zeroY-2,w,4)}
// labels
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='8px sans-serif';ctx.textAlign='center';
ctx.fillText('H'+(i+1),padL+barW*i+barW/2,H-padBot+12);
ctx.fillText(scores[i]+'',padL+barW*i+barW/2,diff>=0?zeroY+barH+12:zeroY+barH-4);
var lbl=diff===0?'E':diff>0?'+'+diff:''+diff;
ctx.fillStyle=color;ctx.font='bold 8px sans-serif';
ctx.fillText(lbl,padL+barW*i+barW/2,diff>=0?zeroY-6:zeroY+6);
}
// par line
ctx.strokeStyle='rgba(255,255,255,0.3)';ctx.lineWidth=1;ctx.setLineDash([4,3]);
ctx.beginPath();ctx.moveTo(padL,zeroY);ctx.lineTo(padL+chartW,zeroY);ctx.stroke();ctx.setLineDash([]);
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='9px sans-serif';ctx.textAlign='right';ctx.fillText('PAR',padL-4,zeroY+4);
// total
var total=0;for(var i=0;i<18;i++)total+=scores[i];
var diffTotal=total-par;var diffStr=diffTotal>0?'+'+diffTotal:diffTotal===0?'E':''+diffTotal;
ctx.fillStyle='#fff';ctx.font='bold 14px sans-serif';ctx.textAlign='center';
ctx.fillText('Total: '+total+' ('+diffStr+')',W/2,H-8);
}

// ===== 6. DRIVING ACCURACY ZONE MAP Canvas 620x400 =====
function showDriveZone(){
playSfx('drivezone_open');
var pn=getPanel('drivezone');
var log=lsGet('drivezone_log',[]);
var ZONES=['Far Left','Left','Slight Left','Center','Slight Right','Right','Far Right'];
var RESULTS=['Fairway','Rough','Bunker','Trees','OB','Hazard'];
var html='<button class="v23-close" onclick="window._v23Close(\'drivezone\')">&times;</button>';
html+='<div class="v23-title">🏌 드라이빙 정확도 존맵</div>';
html+='<canvas id="v23-drivezone-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v23-card"><h3>샷 기록</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">';
html+='<div><label class="v23-label">착지 방향</label><select class="v23-input" id="v23-dz-zone">';
for(var i=0;i<ZONES.length;i++)html+='<option'+(i===3?' selected':'')+'>'+ZONES[i]+'</option>';
html+='</select></div>';
html+='<div><label class="v23-label">착지 결과</label><select class="v23-input" id="v23-dz-result">';
for(var i=0;i<RESULTS.length;i++)html+='<option>'+RESULTS[i]+'</option>';
html+='</select></div>';
html+='</div>';
html+='<button class="v23-btn v23-btn-primary" style="width:100%;margin-top:8px" onclick="window._v23AddDriveZone()">추가</button>';
html+='</div>';
var fwPct=0;if(log.length>0){var fw=0;for(var j=0;j<log.length;j++)if(log[j].result==='Fairway')fw++;fwPct=Math.round(fw/log.length*100)}
var leftPct=0,rightPct=0;if(log.length>0){var l=0,r=0;for(var j=0;j<log.length;j++){var zi=ZONES.indexOf(log[j].zone);if(zi<3)l++;else if(zi>3)r++}leftPct=Math.round(l/log.length*100);rightPct=Math.round(r/log.length*100)}
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#00FF88">'+log.length+'</div><div class="v23-stat-label">샷수</div></div>';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#FFB800">'+fwPct+'%</div><div class="v23-stat-label">FIR</div></div>';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#4ECDC4">'+leftPct+'%</div><div class="v23-stat-label">좌측</div></div>';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#A855F7">'+rightPct+'%</div><div class="v23-stat-label">우측</div></div>';
html+='</div>';
if(log.length>0)html+='<button class="v23-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'초기화?\'))window._v23ResetDriveZone()">초기화</button>';
pn.innerHTML=html;openPanel('drivezone');drawDriveZoneCanvas(log,ZONES,RESULTS);
}
window._v23AddDriveZone=function(){
playSfx('save_v23');
var zone=document.getElementById('v23-dz-zone').value;
var result=document.getElementById('v23-dz-result').value;
var log=lsGet('drivezone_log',[]);log.push({date:todayStr(),zone:zone,result:result});
if(log.length>200)log.shift();lsSet('drivezone_log',log);
showToast(zone+' - '+result);checkAchievements();showDriveZone();
};
window._v23ResetDriveZone=function(){lsSet('drivezone_log',[]);showDriveZone();};
function drawDriveZoneCanvas(log,ZONES,RESULTS){
var c=document.getElementById('v23-drivezone-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);ctx.fillStyle='#0d1117';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Driving Accuracy Heatmap ('+log.length+' shots)',W/2,24);
if(log.length===0){ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='13px sans-serif';ctx.fillText('Add drive results to see heatmap',W/2,H/2);return}
var padTop=44,padBot=36,padL=80,padR=30;
var chartW=W-padL-padR,chartH=H-padTop-padBot;
var colW=chartW/ZONES.length;var rowH=chartH/RESULTS.length;
var counts={};var maxCount=0;
for(var i=0;i<ZONES.length;i++)for(var j=0;j<RESULTS.length;j++)counts[i+'_'+j]=0;
for(var k=0;k<log.length;k++){var zi=ZONES.indexOf(log[k].zone);var ri=RESULTS.indexOf(log[k].result);if(zi>=0&&ri>=0){counts[zi+'_'+ri]++;if(counts[zi+'_'+ri]>maxCount)maxCount=counts[zi+'_'+ri]}}
for(var i=0;i<ZONES.length;i++){
for(var j=0;j<RESULTS.length;j++){
var cnt=counts[i+'_'+j];
var intensity=maxCount>0?cnt/maxCount:0;
var r=Math.round(255*intensity),g=Math.round(255*(1-intensity)*0.5),b=Math.round(136*(1-intensity));
ctx.fillStyle='rgba('+r+','+g+','+b+','+Math.max(0.08,intensity*0.8)+')';
ctx.fillRect(padL+colW*i+1,padTop+rowH*j+1,colW-2,rowH-2);
if(cnt>0){ctx.fillStyle='#fff';ctx.font='bold 11px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
ctx.fillText(cnt+'',padL+colW*i+colW/2,padTop+rowH*j+rowH/2)}
}
}
// column labels
ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='8px sans-serif';ctx.textAlign='center';ctx.textBaseline='top';
for(var i=0;i<ZONES.length;i++)ctx.fillText(ZONES[i],padL+colW*i+colW/2,H-padBot+4);
// row labels
ctx.textAlign='right';ctx.textBaseline='middle';ctx.font='9px sans-serif';
for(var j=0;j<RESULTS.length;j++){
var colors=['#00FF88','#FFB800','#F59E0B','#A855F7','#FF3366','#3B82F6'];
ctx.fillStyle=colors[j];
ctx.fillText(RESULTS[j],padL-6,padTop+rowH*j+rowH/2);
}
}

// ===== 7. PRACTICE EFFICIENCY DASHBOARD Canvas 600x380 =====
function showPracticeEff(){
playSfx('practice_open');
var pn=getPanel('practiceeff');
var data=lsGet('practice_eff',{});
var AREAS=[{id:'short',name:'డ게임',en:'Short Game'},{id:'middle',name:'미들아이언',en:'Mid Iron'},{id:'long',name:'롱게임',en:'Long Game'},{id:'putting',name:'퍼팅',en:'Putting'},{id:'chipping',name:'칩핑',en:'Chipping'},{id:'bunker',name:'벙커',en:'Bunker'}];
var html='<button class="v23-close" onclick="window._v23Close(\'practiceeff\')">&times;</button>';
html+='<div class="v23-title">📊 연습 효율 대시보드</div>';
html+='<canvas id="v23-practiceeff-canvas" width="600" height="380" style="width:100%;max-width:600px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v23-card"><h3>연습 기록 (분/향상도1~10)</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px">';
for(var i=0;i<AREAS.length;i++){
var val=data[AREAS[i].id]||{time:0,improve:5};
html+='<div style="text-align:center"><label class="v23-label">'+AREAS[i].name+'</label>';
html+='<input class="v23-input" type="number" id="v23-pe-t-'+AREAS[i].id+'" placeholder="min" value="'+val.time+'" min="0" max="999" style="margin-bottom:2px">';
html+='<input class="v23-input" type="number" id="v23-pe-i-'+AREAS[i].id+'" placeholder="1-10" value="'+val.improve+'" min="1" max="10"></div>';
}
html+='</div>';
html+='<button class="v23-btn v23-btn-primary" style="width:100%;margin-top:8px" onclick="window._v23SavePracticeEff()">💾 저장</button>';
html+='</div>';
var totalTime=0;for(var k in data)if(data[k])totalTime+=data[k].time;
var avgImprove=0,cnt=0;for(var k in data)if(data[k]&&data[k].time>0){avgImprove+=data[k].improve;cnt++}
if(cnt>0)avgImprove=Math.round(avgImprove/cnt*10)/10;
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#00FF88">'+totalTime+'</div><div class="v23-stat-label">총 연습(분)</div></div>';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#FFB800">'+avgImprove+'</div><div class="v23-stat-label">평균 향상도</div></div>';
var efficiency=totalTime>0?Math.round(avgImprove/(totalTime/60)*10)/10:0;
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#4ECDC4">'+efficiency+'</div><div class="v23-stat-label">효율점수</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('practiceeff');drawPracticeEffCanvas(data,AREAS);
}
window._v23SavePracticeEff=function(){
playSfx('save_v23');
var AREAS=['short','middle','long','putting','chipping','bunker'];
var data={};for(var i=0;i<AREAS.length;i++){
var t=parseInt(document.getElementById('v23-pe-t-'+AREAS[i]).value)||0;
var imp=parseInt(document.getElementById('v23-pe-i-'+AREAS[i]).value)||5;
data[AREAS[i]]={time:t,improve:Math.max(1,Math.min(10,imp))};
}
lsSet('practice_eff',data);showToast('연습 효율 저장!');checkAchievements();showPracticeEff();
};
function drawPracticeEffCanvas(data,AREAS){
var c=document.getElementById('v23-practiceeff-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=600,H=380;ctx.clearRect(0,0,W,H);ctx.fillStyle='#0d1117';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Practice Time vs Improvement (Dual Axis)',W/2,24);
var padTop=50,padBot=50,padL=50,padR=50;
var chartW=W-padL-padR,chartH=H-padTop-padBot;
var n=AREAS.length;var barW=chartW/n;
var maxTime=0;for(var i=0;i<AREAS.length;i++){var d=data[AREAS[i].id];if(d&&d.time>maxTime)maxTime=d.time}
maxTime=Math.max(maxTime,30);
for(var i=0;i<=4;i++){
var y=padTop+chartH*(1-i/4);
ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(padL,y);ctx.lineTo(padL+chartW,y);ctx.stroke();
ctx.fillStyle='rgba(78,205,196,0.5)';ctx.font='9px sans-serif';ctx.textAlign='right';
ctx.fillText(Math.round(maxTime*(i/4))+'min',padL-6,y+3);
ctx.fillStyle='rgba(255,184,0,0.5)';ctx.textAlign='left';
ctx.fillText(Math.round(10*(i/4))+'',padL+chartW+6,y+3);
}
ctx.fillStyle='rgba(78,205,196,0.5)';ctx.font='9px sans-serif';ctx.textAlign='right';ctx.fillText('Time',padL-6,padTop-8);
ctx.fillStyle='rgba(255,184,0,0.5)';ctx.textAlign='left';ctx.fillText('Improve',padL+chartW+6,padTop-8);
for(var i=0;i<AREAS.length;i++){
var d=data[AREAS[i].id]||{time:0,improve:5};
var x=padL+barW*i;
// time bar
var th=chartH*(d.time/maxTime);
ctx.fillStyle='rgba(78,205,196,0.35)';
ctx.fillRect(x+barW*0.1,padTop+chartH-th,barW*0.35,th);
ctx.strokeStyle='#4ECDC4';ctx.lineWidth=1;ctx.strokeRect(x+barW*0.1,padTop+chartH-th,barW*0.35,th);
// improve bar
var ih=chartH*(d.improve/10);
ctx.fillStyle='rgba(255,184,0,0.35)';
ctx.fillRect(x+barW*0.55,padTop+chartH-ih,barW*0.35,ih);
ctx.strokeStyle='#FFB800';ctx.lineWidth=1;ctx.strokeRect(x+barW*0.55,padTop+chartH-ih,barW*0.35,ih);
// labels
ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='9px sans-serif';ctx.textAlign='center';
ctx.fillText(AREAS[i].en,x+barW/2,H-padBot+14);
if(d.time>0){ctx.fillStyle='#4ECDC4';ctx.font='8px sans-serif';ctx.fillText(d.time+'',x+barW*0.28,padTop+chartH-th-4)}
ctx.fillStyle='#FFB800';ctx.font='8px sans-serif';ctx.fillText(d.improve+'',x+barW*0.73,padTop+chartH-ih-4);
}
// efficiency line
ctx.beginPath();ctx.strokeStyle='#A855F7';ctx.lineWidth=2;
for(var i=0;i<AREAS.length;i++){
var d=data[AREAS[i].id]||{time:0,improve:5};
var eff=d.time>0?d.improve/(d.time/30):0;
var y=padTop+chartH*(1-Math.min(eff,10)/10);
var x=padL+barW*i+barW/2;
if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fillStyle='#A855F7';ctx.fill();
if(i>0){ctx.beginPath();ctx.strokeStyle='#A855F7';ctx.lineWidth=1.5;
var prevD=data[AREAS[i-1].id]||{time:0,improve:5};var prevEff=prevD.time>0?prevD.improve/(prevD.time/30):0;
var prevY=padTop+chartH*(1-Math.min(prevEff,10)/10);var prevX=padL+barW*(i-1)+barW/2;
ctx.moveTo(prevX,prevY);ctx.lineTo(x,y);ctx.stroke();}
}
}

// ===== 8. GOLF FITNESS PERIODIZATION Canvas 620x380 =====
function showFitnessPeriod(){
playSfx('fitness_open');
var pn=getPanel('fitness');
var plan=lsGet('fitness_plan',{week:1,phase:'base'});
var log=lsGet('fitness_log',[]);
var PHASES=[{id:'base',name:'기초체력',en:'Base',weeks:3,color:'#4ECDC4'},
{id:'build',name:'발달',en:'Build',weeks:4,color:'#FFB800'},
{id:'compete',name:'경쟁',en:'Compete',weeks:3,color:'#FF6B6B'},
{id:'recovery',name:'회복',en:'Recovery',weeks:2,color:'#A855F7'}];
var EXERCISES=['코어안정성','하체근력','회전유연성','심폐지구력','밸런스','스트레칭'];
var EXERCISES_EN=['Core','Lower Body','Rotation','Cardio','Balance','Stretch'];
var html='<button class="v23-close" onclick="window._v23Close(\'fitness\')">&times;</button>';
html+='<div class="v23-title">💪 골프 체력 주기화</div>';
html+='<canvas id="v23-fitness-canvas" width="620" height="380" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v23-card"><h3>현재 주차: '+plan.week+' ('+PHASES.filter(function(p){return p.id===plan.phase})[0].name+')</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px">';
for(var i=0;i<EXERCISES.length;i++){
var done=lsGet('fit_w'+plan.week+'_'+i,false);
html+='<button class="v23-btn v23-btn-sm'+(done?' v23-btn-primary':'')+'" onclick="window._v23ToggleFit('+i+')">'+EXERCISES[i]+(done?' ✓':'')+'</button>';
}
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:8px">';
html+='<button class="v23-btn" onclick="window._v23PrevWeek()">◀ 이전</button>';
html+='<button class="v23-btn v23-btn-primary" onclick="window._v23NextWeek()">다음 ▶</button>';
html+='<button class="v23-btn" onclick="window._v23ResetFitness()">초기화</button>';
html+='</div></div>';
var totalDone=0;for(var w=1;w<=12;w++)for(var i=0;i<6;i++)if(lsGet('fit_w'+w+'_'+i,false))totalDone++;
var completion=Math.round(totalDone/(12*6)*100);
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#00FF88">'+plan.week+'/12</div><div class="v23-stat-label">주차</div></div>';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#FFB800">'+totalDone+'</div><div class="v23-stat-label">완료 운동</div></div>';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#4ECDC4">'+completion+'%</div><div class="v23-stat-label">완성률</div></div>';
var phaseInfo=PHASES.filter(function(p){return p.id===plan.phase})[0];
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:'+phaseInfo.color+'">'+phaseInfo.en+'</div><div class="v23-stat-label">페이즈</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('fitness');drawFitnessCanvas(plan,PHASES,EXERCISES_EN);
}
window._v23ToggleFit=function(idx){
var plan=lsGet('fitness_plan',{week:1,phase:'base'});
var key='fit_w'+plan.week+'_'+idx;
var cur=lsGet(key,false);lsSet(key,!cur);
if(!cur)playSfx('save_v23');
checkAchievements();showFitnessPeriod();
};
window._v23NextWeek=function(){
var plan=lsGet('fitness_plan',{week:1,phase:'base'});
plan.week=Math.min(12,plan.week+1);
if(plan.week<=3)plan.phase='base';else if(plan.week<=7)plan.phase='build';else if(plan.week<=10)plan.phase='compete';else plan.phase='recovery';
lsSet('fitness_plan',plan);showFitnessPeriod();
};
window._v23PrevWeek=function(){
var plan=lsGet('fitness_plan',{week:1,phase:'base'});
plan.week=Math.max(1,plan.week-1);
if(plan.week<=3)plan.phase='base';else if(plan.week<=7)plan.phase='build';else if(plan.week<=10)plan.phase='compete';else plan.phase='recovery';
lsSet('fitness_plan',plan);showFitnessPeriod();
};
window._v23ResetFitness=function(){
lsSet('fitness_plan',{week:1,phase:'base'});
for(var w=1;w<=12;w++)for(var i=0;i<6;i++)lsSet('fit_w'+w+'_'+i,false);
showFitnessPeriod();
};
function drawFitnessCanvas(plan,PHASES,EXERCISES){
var c=document.getElementById('v23-fitness-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=380;ctx.clearRect(0,0,W,H);ctx.fillStyle='#0d1117';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('12-Week Golf Fitness Periodization',W/2,24);
var padTop=50,padBot=46,padL=80,padR=20;
var chartW=W-padL-padR,chartH=H-padTop-padBot;
var colW=chartW/12;var rowH=chartH/6;
// week columns
for(var w=0;w<12;w++){
var phase;
if(w<3)phase=PHASES[0];else if(w<7)phase=PHASES[1];else if(w<10)phase=PHASES[2];else phase=PHASES[3];
// phase background
ctx.fillStyle=phase.color.replace(')',',0.06)');
var hex=phase.color;var r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);
ctx.fillStyle='rgba('+r+','+g+','+b+',0.06)';
ctx.fillRect(padL+colW*w,padTop,colW,chartH);
// exercise completion cells
for(var ex=0;ex<6;ex++){
var done=lsGet('fit_w'+(w+1)+'_'+ex,false);
var x=padL+colW*w+1,y=padTop+rowH*ex+1;
if(done){
ctx.fillStyle='rgba('+r+','+g+','+b+',0.4)';
ctx.fillRect(x,y,colW-2,rowH-2);
ctx.fillStyle='#fff';ctx.font='bold 10px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
ctx.fillText('✓',x+colW/2-1,y+rowH/2);
}else{
ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.lineWidth=0.5;ctx.strokeRect(x,y,colW-2,rowH-2);
}
}
// week label
ctx.fillStyle=(w+1===plan.week)?'#fff':'rgba(255,255,255,0.4)';
ctx.font=(w+1===plan.week)?'bold 9px sans-serif':'8px sans-serif';
ctx.textAlign='center';ctx.textBaseline='top';
ctx.fillText('W'+(w+1),padL+colW*w+colW/2,H-padBot+4);
// current week marker
if(w+1===plan.week){
ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.strokeRect(padL+colW*w,padTop,colW,chartH);
}
}
// phase labels at bottom
var phaseX=padL;
for(var i=0;i<PHASES.length;i++){
var pw=colW*PHASES[i].weeks;
ctx.fillStyle=PHASES[i].color;ctx.font='bold 9px sans-serif';ctx.textAlign='center';
ctx.fillText(PHASES[i].en,phaseX+pw/2,H-padBot+18);
phaseX+=pw;
}
// exercise labels
ctx.textAlign='right';ctx.textBaseline='middle';ctx.font='9px sans-serif';
for(var i=0;i<EXERCISES.length;i++){
ctx.fillStyle='rgba(255,255,255,0.6)';
ctx.fillText(EXERCISES[i],padL-6,padTop+rowH*i+rowH/2);
}
}

// ===== QUIZ v23 (+15 = 225->240) =====
var QUIZ_V23=[
{q:'스윙 템포에서 이상적인 백스윙:다운스윙 비율은?',a:['1:1','2:1','3:1','5:1'],c:2},
{q:'Strokes Gained에서 SG:Approach가 측정하는 것은?',a:['퍼팅 실력','100yd 이내 샷','그린 주변 접근','티샷 정확도'],c:2},
{q:'박스플롯에서 Q1(25%)~Q3(75%) 구간을 부르는 명칭은?',a:['수염(Whisker)','IQR','중앙값','범위'],c:1},
{q:'SQI(Shot Quality Index)에서 가장 중요한 요소는?',a:['비거리','방향 정확도','의도와 결과의 일치','스핀량'],c:2},
{q:'그린 경사가 2% 오르막이면 퍼팅 힘을 어떻게 조절?',a:['더 약하게','같게','더 강하게','방향만 변경'],c:2},
{q:'Stimpmeter 수치가 12이면 그린 속도는?',a:['느림','보통','빠름','매우 빠름'],c:2},
{q:'Stableford 방식에서 버디는 몇 포인트?',a:['1점','2점','3점','4점'],c:2},
{q:'Match Play에서 3&2는 무슨 뜻?',a:['3홀 남기고 2홀 앞서 승리','3번째 홀에서 2타 차','3라운드 2번째 시도','3일 2시간'],c:0},
{q:'FIR(Fairway In Regulation)이 60%이면 어느 수준?',a:['초보자','아마추어 평균','상급자','프로 수준'],c:1},
{q:'골프 스윙에서 코어 근육이 중요한 이유는?',a:['파워 생성','회전력 안정성','밸런스 유지','모두 해당'],c:3},
{q:'골프 피트니스 주기화에서 Taper 단계의 목적은?',a:['근력 극대화','경기 전 회복','지구력 향상','유연성 향상'],c:1},
{q:'드라이버 착지 존에서 &quot;Slight Left&quot;가 반복되면?',a:['클럽을 변경','얼라인먼트 점검','더 세게 치기','무시'],c:1},
{q:'연습 효율 분석에서 투자시간 대비 향상도가 낮으면?',a:['더 많이 연습','연습 방법 변경','다른 영역 연습','연습 중단'],c:1},
{q:'스윙 템포 72BPM은 어떤 특성의 스윙?',a:['매우 빠른','빠른','일반적','느린'],c:2},
{q:'Shot Tracer 앱의 핵심 기능은?',a:['GPS 거리 측정','실시간 구질 시각화','이상적 카드 생성','코스 예약'],c:1}
];
function showQuizV23(){
playSfx('nav_v23');
var pn=getPanel('quizv23');
var score=lsGet('quiz_v23_score',0);var total=lsGet('quiz_v23_total',0);var qIdx=lsGet('quiz_v23_idx',0);
if(qIdx>=QUIZ_V23.length)qIdx=0;
var q=QUIZ_V23[qIdx];
var html='<button class="v23-close" onclick="window._v23Close(\'quizv23\')">&times;</button>';
html+='<div class="v23-title">📚 Golf Tracker Quiz v23</div>';
html+='<div class="v23-card"><h3>Q'+(qIdx+1)+'/'+QUIZ_V23.length+'</h3><p style="font-size:14px;margin:8px 0">'+q.q+'</p>';
for(var i=0;i<q.a.length;i++){
html+='<button class="v23-btn" style="width:100%;margin:3px 0;text-align:left" onclick="window._v23AnswerQuiz('+i+','+q.c+')">'+String.fromCharCode(65+i)+'. '+q.a[i]+'</button>';
}
html+='</div>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#00FF88">'+score+'</div><div class="v23-stat-label">정답</div></div>';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#FFB800">'+total+'</div><div class="v23-stat-label">총문제</div></div>';
var pct=total>0?Math.round(score/total*100):0;
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#4ECDC4">'+pct+'%</div><div class="v23-stat-label">정답률</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('quizv23');
}
window._v23AnswerQuiz=function(sel,correct){
var score=lsGet('quiz_v23_score',0);var total=lsGet('quiz_v23_total',0);var qIdx=lsGet('quiz_v23_idx',0);
total++;
if(sel===correct){score++;playSfx('quiz_correct_v23');showToast('정답!');}
else{playSfx('quiz_wrong_v23');showToast('오답! 정답: '+String.fromCharCode(65+correct));}
qIdx++;
lsSet('quiz_v23_score',score);lsSet('quiz_v23_total',total);lsSet('quiz_v23_idx',qIdx);
setTimeout(showQuizV23,800);checkAchievements();
};

// ===== ACHIEVEMENTS v23 (+12 = 180->192) =====
var ACHIEVEMENTS_V23=[
{id:'tempo_tracker',name:'Tempo Tracker',desc:'템포 5회 기록',check:function(){return lsGet('tempo_log',[]).length>=5}},
{id:'tempo_master',name:'Tempo Master',desc:'템포 15회 기록',check:function(){return lsGet('tempo_log',[]).length>=15}},
{id:'ci_collector',name:'CI Data Collector',desc:'비거리 데이터 30개',check:function(){var d=lsGet('ci_data',{});var s=0;for(var k in d)if(d[k])s+=d[k].length;return s>=30}},
{id:'sqi_rater',name:'SQI Rater',desc:'샷 퀸리티 10회 평가',check:function(){return lsGet('sqi_log',[]).length>=10}},
{id:'slope_reader',name:'Slope Reader',desc:'경사 10회 기록',check:function(){return lsGet('slope_log',[]).length>=10}},
{id:'tourney_player',name:'Tournament Player',desc:'토너먼트 5라운드',check:function(){return lsGet('tourney_log',[]).length>=5}},
{id:'drive_analyst',name:'Drive Analyst',desc:'드라이빙 30샷 기록',check:function(){return lsGet('drivezone_log',[]).length>=30}},
{id:'practice_planner',name:'Practice Planner',desc:'연습 효율 기록',check:function(){var d=lsGet('practice_eff',{});var t=0;for(var k in d)if(d[k])t+=d[k].time;return t>=60}},
{id:'fitness_starter',name:'Fitness Starter',desc:'체력 프로그램 6운동 완료',check:function(){var c=0;for(var w=1;w<=12;w++)for(var i=0;i<6;i++)if(lsGet('fit_w'+w+'_'+i,false))c++;return c>=6}},
{id:'quiz_v23_master',name:'Quiz v23 Master',desc:'v23 퀸즈 전문 정답',check:function(){return lsGet('quiz_v23_score',0)>=15}},
{id:'quiz_v23_clear',name:'Quiz v23 Clear',desc:'v23 퀸즈 완주',check:function(){return lsGet('quiz_v23_total',0)>=15}},
{id:'v23_complete',name:'v23 Complete',desc:'v23 전체 기능 탐색',check:function(){return lsGet('v23_explored',0)>=8}}
];
function checkAchievements(){
var unlocked=lsGet('achievements_v23',[]);
for(var i=0;i<ACHIEVEMENTS_V23.length;i++){
var a=ACHIEVEMENTS_V23[i];
if(unlocked.indexOf(a.id)===-1&&a.check()){
unlocked.push(a.id);lsSet('achievements_v23',unlocked);
playSfx('achieve_v23');showToast('🏆 '+a.name+' unlocked!');
}
}
}
var explored=lsGet('v23_explored',0);
function markExplored(){explored++;lsSet('v23_explored',explored);}

// ===== CSS =====
var style=document.createElement('style');
style.textContent='.v23-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:10020;display:none;align-items:center;justify-content:center;padding:16px;overflow-y:auto}.v23-overlay.active{display:flex}.v23-panel{background:#14141a;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:20px;max-width:660px;width:100%;max-height:90vh;overflow-y:auto;position:relative}.v23-close{position:absolute;top:12px;right:12px;background:none;border:none;color:#fff;font-size:24px;cursor:pointer;z-index:2;opacity:0.7}.v23-close:hover{opacity:1}.v23-title{font-size:18px;font-weight:bold;color:#fff;margin-bottom:12px;text-align:center}.v23-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;margin:8px 0}.v23-card h3{font-size:13px;color:rgba(255,255,255,0.7);margin-bottom:6px}.v23-label{font-size:10px;color:rgba(255,255,255,0.5);display:block;margin-bottom:2px}.v23-input{width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:6px;color:#fff;padding:6px 8px;font-size:12px;outline:none;box-sizing:border-box}.v23-input:focus{border-color:#00FF88}.v23-btn{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);border-radius:8px;color:#fff;padding:8px 12px;font-size:12px;cursor:pointer;transition:all 0.2s}.v23-btn:hover{background:rgba(255,255,255,0.12)}.v23-btn-primary{background:rgba(0,255,136,0.15);border-color:rgba(0,255,136,0.3);color:#00FF88}.v23-btn-primary:hover{background:rgba(0,255,136,0.25)}.v23-btn-sm{padding:6px 8px;font-size:11px}.v23-stat-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:10px;text-align:center}.v23-stat-val{font-size:18px;font-weight:bold}.v23-stat-label{font-size:9px;color:rgba(255,255,255,0.5);margin-top:2px}.v23-toast{position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(20px);background:rgba(0,255,136,0.15);border:1px solid rgba(0,255,136,0.3);color:#00FF88;padding:10px 20px;border-radius:10px;font-size:13px;z-index:10030;opacity:0;transition:all 0.3s}.v23-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}';
document.head.appendChild(style);

// ===== NAVIGATION =====
window._v23Close=function(id){closePanel(id);};
function addNavButtons(){
var existing=document.querySelector('.v16-scroll-nav')||document.querySelector('.gt-bottom-nav')||document.querySelector('[style*="position:fixed"][style*="bottom"]');
var nav=existing;
if(!nav){
var allFixed=document.querySelectorAll('[style*="position: fixed"], [style*="position:fixed"]');
for(var i=0;i<allFixed.length;i++){if(allFixed[i].style.bottom==='0px'||allFixed[i].style.bottom==='0'){nav=allFixed[i];break;}}
}
if(!nav){
var navBars=document.querySelectorAll('div');
for(var i=0;i<navBars.length;i++){
var s=window.getComputedStyle(navBars[i]);
if(s.position==='fixed'&&(s.bottom==='0px'||s.bottom==='0')&&parseInt(s.zIndex)>9000){nav=navBars[i];break;}
}
}
if(!nav)return;
var btns=[
{label:'Tempo',fn:showSwingTempo,icon:'🎵'},
{label:'CI',fn:showClubCI,icon:'📏'},
{label:'SQI',fn:showSQI,icon:'⭐'},
{label:'Slope',fn:showGreenSlope,icon:'⛳'},
{label:'Tourney',fn:showTourneySim,icon:'🏆'},
{label:'DriveZn',fn:showDriveZone,icon:'🏌'},
{label:'PractEff',fn:showPracticeEff,icon:'📊'},
{label:'Fitness',fn:showFitnessPeriod,icon:'💪'},
{label:'Quiz23',fn:showQuizV23,icon:'📚'}
];
for(var i=0;i<btns.length;i++){
(function(b){
var btn=document.createElement('button');
btn.innerHTML=b.icon+'<br><span style="font-size:8px">'+b.label+'</span>';
btn.style.cssText='background:rgba(139,92,246,0.12);border:1px solid rgba(139,92,246,0.25);border-radius:8px;color:#8B5CF6;padding:6px 4px;font-size:12px;cursor:pointer;min-width:44px;flex:0 0 auto;margin:2px';
btn.addEventListener('click',function(){b.fn();markExplored();});
nav.appendChild(btn);
})(btns[i]);
}
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown',function(e){
if(!e.shiftKey)return;
switch(e.key){
case'Q':case'q':showSwingTempo();markExplored();break;
case'W':case'w':showClubCI();markExplored();break;
case'E':case'e':showSQI();markExplored();break;
case'R':case'r':showGreenSlope();markExplored();break;
case'T':case't':showTourneySim();markExplored();break;
case'Y':case'y':showDriveZone();markExplored();break;
case'U':case'u':showPracticeEff();markExplored();break;
case'D':case'd':showFitnessPeriod();markExplored();break;
case'0':showQuizV23();markExplored();break;
}
});

// ===== INIT =====
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',addNavButtons);}
else{setTimeout(addNavButtons,1500);}
setTimeout(checkAchievements,3000);
})();
