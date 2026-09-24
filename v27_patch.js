(function(){
'use strict';
var LS='gt_v27_';
var audioCtx=null;
function getAC(){if(!audioCtx)try{audioCtx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}return audioCtx}
function playSfx(type){var ac=getAC();if(!ac)return;var o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);var t=ac.currentTime;g.gain.setValueAtTime(0.1,t);switch(type){case'dist_open':o.type='sine';o.frequency.setValueAtTime(554,t);o.frequency.linearRampToValueAtTime(698,t+0.05);o.frequency.linearRampToValueAtTime(831,t+0.1);o.frequency.linearRampToValueAtTime(1047,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'hole_open':o.type='sine';o.frequency.setValueAtTime(466,t);o.frequency.linearRampToValueAtTime(587,t+0.06);o.frequency.linearRampToValueAtTime(698,t+0.12);g.gain.exponentialRampToValueAtTime(0.01,t+0.26);o.start(t);o.stop(t+0.26);break;case'putt_open':o.type='sine';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(659,t+0.05);o.frequency.linearRampToValueAtTime(784,t+0.1);g.gain.exponentialRampToValueAtTime(0.01,t+0.25);o.start(t);o.stop(t+0.25);break;case'energy_open':o.type='sine';o.frequency.setValueAtTime(392,t);o.frequency.linearRampToValueAtTime(523,t+0.07);o.frequency.linearRampToValueAtTime(659,t+0.14);g.gain.exponentialRampToValueAtTime(0.01,t+0.28);o.start(t);o.stop(t+0.28);break;case'caddie_open':o.type='sine';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(554,t+0.05);o.frequency.linearRampToValueAtTime(698,t+0.1);o.frequency.linearRampToValueAtTime(880,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.32);o.start(t);o.stop(t+0.32);break;case'hcap_open':o.type='sine';o.frequency.setValueAtTime(349,t);o.frequency.linearRampToValueAtTime(466,t+0.06);o.frequency.linearRampToValueAtTime(587,t+0.12);g.gain.exponentialRampToValueAtTime(0.01,t+0.25);o.start(t);o.stop(t+0.25);break;case'predict_open':o.type='sine';o.frequency.setValueAtTime(587,t);o.frequency.linearRampToValueAtTime(740,t+0.05);o.frequency.linearRampToValueAtTime(880,t+0.1);o.frequency.linearRampToValueAtTime(1047,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'iq_open':o.type='sine';o.frequency.setValueAtTime(659,t);o.frequency.linearRampToValueAtTime(831,t+0.05);o.frequency.linearRampToValueAtTime(988,t+0.1);o.frequency.linearRampToValueAtTime(1175,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.32);o.start(t);o.stop(t+0.32);break;case'quiz_correct_v27':o.type='sine';o.frequency.setValueAtTime(880,t);o.frequency.setValueAtTime(1109,t+0.08);o.frequency.setValueAtTime(1319,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'quiz_wrong_v27':o.type='sawtooth';o.frequency.setValueAtTime(311,t);o.frequency.linearRampToValueAtTime(233,t+0.2);g.gain.setValueAtTime(0.06,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'achieve_v27':o.type='sine';o.frequency.setValueAtTime(1109,t);o.frequency.setValueAtTime(1319,t+0.1);o.frequency.setValueAtTime(1568,t+0.2);o.frequency.setValueAtTime(1976,t+0.3);g.gain.exponentialRampToValueAtTime(0.01,t+0.5);o.start(t);o.stop(t+0.5);break;case'nav_v27':o.type='sine';o.frequency.setValueAtTime(831,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.08);o.start(t);o.stop(t+0.08);break;case'save_v27':o.type='triangle';o.frequency.setValueAtTime(622,t);o.frequency.linearRampToValueAtTime(932,t+0.1);g.gain.exponentialRampToValueAtTime(0.01,t+0.2);o.start(t);o.stop(t+0.2);break;case'hover_v27':o.type='sine';o.frequency.setValueAtTime(1175,t);g.gain.setValueAtTime(0.04,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.05);o.start(t);o.stop(t+0.05);break;case'click_v27':o.type='sine';o.frequency.setValueAtTime(698,t);o.frequency.linearRampToValueAtTime(880,t+0.06);g.gain.exponentialRampToValueAtTime(0.01,t+0.12);o.start(t);o.stop(t+0.12);break;case'reset_v27':o.type='square';o.frequency.setValueAtTime(370,t);o.frequency.linearRampToValueAtTime(247,t+0.15);g.gain.setValueAtTime(0.05,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.25);o.start(t);o.stop(t+0.25);break;default:o.type='sine';o.frequency.setValueAtTime(440,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.15);o.start(t);o.stop(t+0.15)}}

function lsGet(k,d){try{var v=localStorage.getItem(LS+k);return v?JSON.parse(v):d}catch(e){return d}}
function lsSet(k,v){try{localStorage.setItem(LS+k,JSON.stringify(v))}catch(e){}}
function todayStr(){return new Date().toISOString().slice(0,10)}
function showToast(msg){var t=document.createElement('div');t.className='v27-toast';t.textContent=msg;document.body.appendChild(t);setTimeout(function(){t.classList.add('show')},50);setTimeout(function(){t.classList.remove('show');setTimeout(function(){t.remove()},400)},3000)}
function createOverlay(id){var ov=document.createElement('div');ov.className='v27-overlay';ov.id='v27-'+id;ov.addEventListener('click',function(e){if(e.target===ov)closePanel(id)});var pn=document.createElement('div');pn.className='v27-panel';pn.style.position='relative';ov.appendChild(pn);return pn}
function openPanel(id){var el=document.getElementById('v27-'+id);if(el)el.classList.add('active')}
function closePanel(id){var el=document.getElementById('v27-'+id);if(el)el.classList.remove('active')}
function getPanel(id){var ov=document.getElementById('v27-'+id);if(!ov){var pn=createOverlay(id);pn.id='v27-'+id+'-panel';document.body.appendChild(pn.parentElement);return pn}return ov.querySelector('.v27-panel')||ov}

// ===== 1. CLUB DISTANCE NORMAL DISTRIBUTION ANALYZER Canvas 620x400 =====
var CLUBS_14=['Driver','3W','5W','3I','4I','5I','6I','7I','8I','9I','PW','GW','SW','LW'];
var CLUB_AVG=[250,230,210,200,190,180,170,160,150,140,130,115,100,80];
var CLUB_STD=[15,12,10,10,9,8,8,7,7,6,6,5,5,4];
var CLUB_COLORS=['#FF6B6B','#FF9F43','#FECA57','#48DBFB','#00FF88','#A855F7','#FF85A2','#4ECDC4','#00B4D8','#E0BBE4','#957DAD','#D291BC','#FEC89A','#A8D8EA'];
function showDistAnalyzer(){
playSfx('dist_open');
var pn=getPanel('dist');
var selClub=lsGet('dist_club',0);
var userDist=lsGet('dist_data',{});
var html='<button class="v27-close" onclick="window._v27Close(\'dist\')">&times;</button>';
html+='<div class="v27-title">📏 클럽별 비거리 정규분포 분석기</div>';
html+='<canvas id="v27-dist-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v27-card"><h3>클럽 선택</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;margin-bottom:8px">';
for(var i=0;i<7;i++){
html+='<button class="v27-btn v27-btn-sm'+(i===selClub?' v27-btn-primary':'')+'" onclick="window._v27SelDist('+i+')">'+CLUBS_14[i]+'</button>';
}
html+='</div><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px">';
for(var i=7;i<14;i++){
html+='<button class="v27-btn v27-btn-sm'+(i===selClub?' v27-btn-primary':'')+'" onclick="window._v27SelDist('+i+')">'+CLUBS_14[i]+'</button>';
}
html+='</div></div>';
html+='<div class="v27-card"><h3>비거리 기록 (야드)</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px">';
html+='<div><label class="v27-label">실측 거리</label><input class="v27-input" type="number" id="v27-dist-val" value="'+(CLUB_AVG[selClub]||150)+'" min="50" max="350"></div>';
html+='<div><label class="v27-label">편차 (야드)</label><input class="v27-input" type="number" id="v27-dist-std" value="'+(CLUB_STD[selClub]||8)+'" min="1" max="30"></div>';
html+='<div style="display:flex;align-items:flex-end"><button class="v27-btn v27-btn-primary" style="width:100%" onclick="window._v27RecordDist()">기록</button></div>';
html+='</div></div>';
var cd=userDist[selClub]||{avg:CLUB_AVG[selClub],std:CLUB_STD[selClub],n:0};
var cv=cd.std/cd.avg*100;
var grade=cv<5?'S':cv<8?'A':cv<12?'B':cv<16?'C':'D';
var gradeColor=grade==='S'?'#00FF88':grade==='A'?'#4ECDC4':grade==='B'?'#FECA57':grade==='C'?'#FF9F43':'#FF6B6B';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v27-stat-card"><div class="v27-stat-val" style="color:#00FF88">'+cd.avg+'yd</div><div class="v27-stat-label">평균 비거리</div></div>';
html+='<div class="v27-stat-card"><div class="v27-stat-val" style="color:#FFB800">&plusmn;'+cd.std+'yd</div><div class="v27-stat-label">표준편차</div></div>';
html+='<div class="v27-stat-card"><div class="v27-stat-val" style="color:'+gradeColor+'">'+grade+'</div><div class="v27-stat-label">일관성 등급</div></div>';
html+='<div class="v27-stat-card"><div class="v27-stat-val" style="color:#A855F7">'+cd.n+'</div><div class="v27-stat-label">측정횟수</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('dist');drawDistCanvas(selClub,cd);
}
window._v27SelDist=function(i){lsSet('dist_club',i);showDistAnalyzer();};
window._v27RecordDist=function(){
var val=parseInt(document.getElementById('v27-dist-val').value)||150;
var std=parseInt(document.getElementById('v27-dist-std').value)||8;
var sel=lsGet('dist_club',0);
var data=lsGet('dist_data',{});
var cur=data[sel]||{avg:CLUB_AVG[sel],std:CLUB_STD[sel],n:0};
cur.avg=Math.round((cur.avg*cur.n+val)/(cur.n+1));
cur.std=Math.round((cur.std+std)/2);
cur.n++;data[sel]=cur;lsSet('dist_data',data);
playSfx('save_v27');showToast(CLUBS_14[sel]+' '+val+'yd recorded!');checkAchievements();showDistAnalyzer();
};
function drawDistCanvas(clubIdx,cd){
var c=document.getElementById('v27-dist-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);
var grd=ctx.createLinearGradient(0,0,0,H);grd.addColorStop(0,'#0f1729');grd.addColorStop(1,'#1a1a2e');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText(CLUBS_14[clubIdx]+' Distance Normal Distribution',W/2,24);
var L=60,R=W-30,B=H-50,T=55;
var mu=cd.avg,sig=cd.std;
var xMin=mu-4*sig,xMax=mu+4*sig;
var maxPdf=1/(sig*Math.sqrt(2*Math.PI));
ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.lineWidth=1;
for(var i=0;i<=4;i++){var y=B-(B-T)*i/4;ctx.beginPath();ctx.moveTo(L,y);ctx.lineTo(R,y);ctx.stroke();ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='9px sans-serif';ctx.textAlign='right';ctx.fillText((maxPdf*i/4).toFixed(4),L-4,y+3);}
for(var i=0;i<=8;i++){var x=L+(R-L)*i/8;var xv=xMin+(xMax-xMin)*i/8;ctx.beginPath();ctx.moveTo(x,B);ctx.lineTo(x,B+5);ctx.stroke();ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='9px sans-serif';ctx.textAlign='center';ctx.fillText(Math.round(xv)+'yd',x,B+18);}
function normPdf(x,m,s){return Math.exp(-0.5*Math.pow((x-m)/s,2))/(s*Math.sqrt(2*Math.PI));}
var zones=[{from:mu-sig,to:mu+sig,color:'rgba(0,255,136,0.2)',label:'68.3%'},{from:mu-2*sig,to:mu+2*sig,color:'rgba(78,205,196,0.12)',label:'95.4%'},{from:mu-3*sig,to:mu+3*sig,color:'rgba(168,85,247,0.08)',label:'99.7%'}];
for(var z=zones.length-1;z>=0;z--){
ctx.fillStyle=zones[z].color;ctx.beginPath();
var x0=Math.max(L,L+(zones[z].from-xMin)/(xMax-xMin)*(R-L));
var x1=Math.min(R,L+(zones[z].to-xMin)/(xMax-xMin)*(R-L));
ctx.moveTo(x0,B);
for(var px=x0;px<=x1;px++){var xv=xMin+(px-L)/(R-L)*(xMax-xMin);var pdf=normPdf(xv,mu,sig);var y=B-(pdf/maxPdf)*(B-T);ctx.lineTo(px,y);}
ctx.lineTo(x1,B);ctx.closePath();ctx.fill();
}
ctx.strokeStyle=CLUB_COLORS[clubIdx];ctx.lineWidth=2.5;ctx.beginPath();
for(var px=L;px<=R;px++){var xv=xMin+(px-L)/(R-L)*(xMax-xMin);var pdf=normPdf(xv,mu,sig);var y=B-(pdf/maxPdf)*(B-T);if(px===L)ctx.moveTo(px,y);else ctx.lineTo(px,y);}
ctx.stroke();
ctx.setLineDash([4,4]);ctx.strokeStyle='#FF6B6B';ctx.lineWidth=1;
var muX=L+(mu-xMin)/(xMax-xMin)*(R-L);
ctx.beginPath();ctx.moveTo(muX,T);ctx.lineTo(muX,B);ctx.stroke();
ctx.setLineDash([]);
ctx.fillStyle='#fff';ctx.font='bold 11px sans-serif';ctx.textAlign='center';
ctx.fillText('μ='+mu+'yd  σ='+sig+'yd',W/2,H-12);
ctx.fillStyle='rgba(0,255,136,0.7)';ctx.font='10px sans-serif';
ctx.fillText('68.3%: '+(mu-sig)+'~'+(mu+sig)+'yd',W/4,T-5);
ctx.fillStyle='rgba(78,205,196,0.7)';
ctx.fillText('95.4%: '+(mu-2*sig)+'~'+(mu+2*sig)+'yd',W*3/4,T-5);
}

// ===== 2. HOLE ATTACK SCENARIO SIMULATOR Canvas 640x400 =====
var HOLE_TYPES=[{name:'Par 3 Short',par:3,dist:150,hazards:['Bunker Front','Water Left']},{name:'Par 3 Long',par:3,dist:210,hazards:['Bunker Ring','Wind Exposed']},{name:'Par 4 Straight',par:4,dist:380,hazards:['Fairway Bunker','Green Slope']},{name:'Par 4 Dogleg',par:4,dist:410,hazards:['OB Right','Trees Left','Cross Bunker']},{name:'Par 5 Reachable',par:5,dist:490,hazards:['Water 2nd','Bunker Green']},{name:'Par 5 Long',par:5,dist:560,hazards:['OB Left','Layup Zone','Green Complex']}];
var STRATEGIES=['Conservative','Standard','Aggressive'];
var STRAT_COLORS=['#4ECDC4','#FECA57','#FF6B6B'];
function showHoleSimulator(){
playSfx('hole_open');
var pn=getPanel('hole');
var selHole=lsGet('hole_sel',0);
var selStrat=lsGet('hole_strat',1);
var html='<button class="v27-close" onclick="window._v27Close(\'hole\')">&times;</button>';
html+='<div class="v27-title">⛳ 홀 공략 시나리오 시뮬레이터</div>';
html+='<canvas id="v27-hole-canvas" width="640" height="400" style="width:100%;max-width:640px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v27-card"><h3>홀 유형 선택</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin-bottom:8px">';
for(var i=0;i<HOLE_TYPES.length;i++){
html+='<button class="v27-btn v27-btn-sm'+(i===selHole?' v27-btn-primary':'')+'" onclick="window._v27SelHole('+i+')">'+HOLE_TYPES[i].name+'</button>';
}
html+='</div></div>';
html+='<div class="v27-card"><h3>전략 선택</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px">';
for(var i=0;i<3;i++){
html+='<button class="v27-btn v27-btn-sm" style="border-color:'+STRAT_COLORS[i]+';color:'+STRAT_COLORS[i]+(i===selStrat?';background:rgba(255,255,255,0.1)':'')+'" onclick="window._v27SelStrat('+i+')">'+STRATEGIES[i]+'</button>';
}
html+='</div></div>';
var ht=HOLE_TYPES[selHole];
var riskScores=[0.15,0.35,0.60];
var rewScores=[0.50,0.70,0.90];
var birdieChance=[5,12,25];
var bogeyRisk=[5,15,35];
if(ht.par===3){birdieChance=[8,15,30];bogeyRisk=[8,18,40];}
if(ht.par===5){birdieChance=[15,25,40];bogeyRisk=[3,10,25];}
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v27-stat-card"><div class="v27-stat-val" style="color:#00FF88">'+birdieChance[selStrat]+'%</div><div class="v27-stat-label">버디 확률</div></div>';
html+='<div class="v27-stat-card"><div class="v27-stat-val" style="color:#FF6B6B">'+bogeyRisk[selStrat]+'%</div><div class="v27-stat-label">보기 위험</div></div>';
html+='<div class="v27-stat-card"><div class="v27-stat-val" style="color:#FECA57">'+ht.dist+'yd</div><div class="v27-stat-label">홀 거리</div></div>';
html+='<div class="v27-stat-card"><div class="v27-stat-val" style="color:#A855F7">Par '+ht.par+'</div><div class="v27-stat-label">파</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('hole');drawHoleCanvas(selHole,selStrat);
}
window._v27SelHole=function(i){lsSet('hole_sel',i);showHoleSimulator();};
window._v27SelStrat=function(i){lsSet('hole_strat',i);showHoleSimulator();};
function drawHoleCanvas(hIdx,sIdx){
var c=document.getElementById('v27-hole-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=640,H=400;ctx.clearRect(0,0,W,H);
var grd=ctx.createLinearGradient(0,0,0,H);grd.addColorStop(0,'#0a2e1a');grd.addColorStop(1,'#1a1a2e');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText(HOLE_TYPES[hIdx].name+' - '+STRATEGIES[sIdx]+' Strategy',W/2,24);
var ht=HOLE_TYPES[hIdx];
ctx.fillStyle='#2D8B2D';ctx.beginPath();ctx.ellipse(W/2,H/2+20,200,140,0,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#4CAF50';ctx.beginPath();ctx.ellipse(W/2,H/2+20,160,100,0,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#66BB6A';ctx.beginPath();ctx.ellipse(W/2-40,H/2+80,30,25,0,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#333';ctx.beginPath();ctx.arc(W/2+60,H/2-20,4,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#FF4444';ctx.fillRect(W/2+58,H/2-40,3,20);
ctx.strokeStyle='#fff';ctx.lineWidth=1;ctx.beginPath();ctx.arc(W/2+60,H/2-20,15,0,Math.PI*2);ctx.stroke();
var teeX=100,teeY=H-60;
ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(teeX,teeY,5,0,Math.PI*2);ctx.fill();
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='10px sans-serif';ctx.fillText('TEE',teeX,teeY+16);
var paths=[[{x:teeX,y:teeY},{x:W/2-30,y:H/2+40},{x:W/2+60,y:H/2-20}],[{x:teeX,y:teeY},{x:W/2,y:H/2+20},{x:W/2+60,y:H/2-20}],[{x:teeX,y:teeY},{x:W/2+40,y:H/2-10},{x:W/2+60,y:H/2-20}]];
for(var s=0;s<3;s++){
ctx.strokeStyle=STRAT_COLORS[s];ctx.lineWidth=s===sIdx?3:1;ctx.globalAlpha=s===sIdx?1:0.3;
ctx.setLineDash(s===sIdx?[]:[6,4]);
ctx.beginPath();ctx.moveTo(paths[s][0].x,paths[s][0].y);
for(var p=1;p<paths[s].length;p++){
var prev=paths[s][p-1],cur=paths[s][p];
var cpx=(prev.x+cur.x)/2,cpy=prev.y-40-s*15;
ctx.quadraticCurveTo(cpx,cpy,cur.x,cur.y);
}
ctx.stroke();
for(var p=1;p<paths[s].length;p++){
ctx.fillStyle=STRAT_COLORS[s];ctx.beginPath();ctx.arc(paths[s][p].x,paths[s][p].y,s===sIdx?5:3,0,Math.PI*2);ctx.fill();
}
}
ctx.globalAlpha=1;ctx.setLineDash([]);
var hazards=ht.hazards;
ctx.fillStyle='rgba(255,68,68,0.6)';ctx.font='9px sans-serif';
for(var i=0;i<hazards.length;i++){
var hx=W/2-80+i*70,hy=H/2+100+i*15;
ctx.fillStyle='rgba(255,68,68,0.15)';ctx.beginPath();ctx.arc(hx,hy-30,12,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#FF6B6B';ctx.textAlign='center';ctx.fillText(hazards[i],hx,hy-10);
}
ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='9px sans-serif';ctx.textAlign='left';
ctx.fillText('Conservative: Safe layup, minimize risk',15,H-30);
ctx.fillStyle='rgba(254,202,87,0.5)';ctx.fillText('Standard: Balanced approach',15,H-18);
ctx.fillStyle='rgba(255,107,107,0.5)';ctx.fillText('Aggressive: Attack pin, high risk/reward',15,H-6);
}

// ===== 3. PUTTING ZONE HEATMAP ANALYZER Canvas 620x400 =====
var PUTT_ZONES=['Inside 3ft','3-6ft','6-10ft','10-15ft','15-20ft','20-30ft','30-40ft','40ft+'];
var PUTT_MAKE_PGA=[99,84,54,31,21,13,7,3];
function showPuttingZone(){
playSfx('putt_open');
var pn=getPanel('putt');
var puttData=lsGet('putt_data',null);
if(!puttData){puttData=[];for(var i=0;i<8;i++)puttData.push({made:Math.round(PUTT_MAKE_PGA[i]*0.85),total:100});}
var html='<button class="v27-close" onclick="window._v27Close(\'putt\')">&times;</button>';
html+='<div class="v27-title">🎯 퍼팅 존 히트맵 분석기</div>';
html+='<canvas id="v27-putt-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v27-card"><h3>퍼팅 기록</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px">';
html+='<div><label class="v27-label">거리 구간</label><select class="v27-input" id="v27-putt-zone">';
for(var i=0;i<PUTT_ZONES.length;i++)html+='<option value="'+i+'">'+PUTT_ZONES[i]+'</option>';
html+='</select></div>';
html+='<div><label class="v27-label">결과</label><select class="v27-input" id="v27-putt-result"><option value="1">Made</option><option value="0">Missed</option></select></div>';
html+='<div style="display:flex;align-items:flex-end"><button class="v27-btn v27-btn-primary" style="width:100%" onclick="window._v27RecordPutt()">기록</button></div>';
html+='</div></div>';
var totalMade=0,totalAttempts=0;
for(var i=0;i<puttData.length;i++){totalMade+=puttData[i].made;totalAttempts+=puttData[i].total;}
var overallPct=totalAttempts>0?Math.round(totalMade/totalAttempts*100):0;
var grade=overallPct>=50?'S':overallPct>=40?'A':overallPct>=30?'B':overallPct>=20?'C':'D';
var gradeColor=grade==='S'?'#00FF88':grade==='A'?'#4ECDC4':grade==='B'?'#FECA57':grade==='C'?'#FF9F43':'#FF6B6B';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v27-stat-card"><div class="v27-stat-val" style="color:#00FF88">'+overallPct+'%</div><div class="v27-stat-label">종합 성공률</div></div>';
html+='<div class="v27-stat-card"><div class="v27-stat-val" style="color:#FFB800">'+totalMade+'</div><div class="v27-stat-label">성공 횟수</div></div>';
html+='<div class="v27-stat-card"><div class="v27-stat-val" style="color:'+gradeColor+'">'+grade+'</div><div class="v27-stat-label">퍼팅 등급</div></div>';
html+='<div class="v27-stat-card"><div class="v27-stat-val" style="color:#A855F7">'+totalAttempts+'</div><div class="v27-stat-label">총 시도</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('putt');drawPuttCanvas(puttData);
}
window._v27RecordPutt=function(){
var zone=parseInt(document.getElementById('v27-putt-zone').value);
var result=parseInt(document.getElementById('v27-putt-result').value);
var puttData=lsGet('putt_data',null);
if(!puttData){puttData=[];for(var i=0;i<8;i++)puttData.push({made:Math.round(PUTT_MAKE_PGA[i]*0.85),total:100});}
puttData[zone].total++;
if(result)puttData[zone].made++;
lsSet('putt_data',puttData);
playSfx('save_v27');showToast('Putt '+(result?'made':'missed')+' - '+PUTT_ZONES[zone]);checkAchievements();showPuttingZone();
};
function drawPuttCanvas(data){
var c=document.getElementById('v27-putt-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);
var grd=ctx.createLinearGradient(0,0,0,H);grd.addColorStop(0,'#0f1729');grd.addColorStop(1,'#1a1a2e');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Putting Zone Success Rate vs PGA Tour',W/2,24);
var cx=W/2,cy=H/2+15,maxR=150;
for(var i=data.length-1;i>=0;i--){
var r=maxR*(i+1)/data.length;
var pct=data[i].total>0?data[i].made/data[i].total:0;
var hue=pct>0.7?120:pct>0.4?60:pct>0.2?30:0;
var sat=80,light=40+pct*30;
ctx.fillStyle='hsla('+hue+','+sat+'%,'+light+'%,0.5)';
ctx.strokeStyle='rgba(255,255,255,0.15)';ctx.lineWidth=1;
ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fill();ctx.stroke();
}
for(var i=0;i<data.length;i++){
var r=maxR*(i+1)/data.length;
var pct=data[i].total>0?Math.round(data[i].made/data[i].total*100):0;
var angle=-Math.PI/2+i*Math.PI/5;
var tx=cx+Math.cos(angle)*(r-8);
var ty=cy+Math.sin(angle)*(r-8);
ctx.fillStyle='#fff';ctx.font='bold 10px sans-serif';ctx.textAlign='center';
ctx.fillText(pct+'%',tx,ty);
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='8px sans-serif';
ctx.fillText(PUTT_ZONES[i],tx,ty+11);
}
ctx.fillStyle='#4ECDC4';ctx.font='10px sans-serif';ctx.textAlign='left';
var ly=H-65;
ctx.fillText('PGA Tour Benchmark:',20,ly);
for(var i=0;i<4;i++){
ctx.fillStyle='rgba(78,205,196,0.7)';
ctx.fillText(PUTT_ZONES[i]+': '+PUTT_MAKE_PGA[i]+'%',20+(i<2?0:160),ly+14+(i%2)*12);
}
ctx.fillStyle='#fff';ctx.font='9px sans-serif';ctx.textAlign='center';
ctx.fillText('Inner = Close range, Outer = Long range | Colors: Green=High%, Red=Low%',W/2,H-10);
}

// ===== 4. ROUND ENERGY MANAGEMENT SYSTEM Canvas 620x400 =====
var ENERGY_HOLES=18;
var ENERGY_FACTORS=['Physical','Mental','Focus','Confidence','Hydration','Nutrition','Temperature','Fatigue'];
var ENERGY_COLORS=['#FF6B6B','#A855F7','#48DBFB','#00FF88','#4ECDC4','#FECA57','#FF9F43','#FF85A2'];
function showEnergyMgmt(){
playSfx('energy_open');
var pn=getPanel('energy');
var energyData=lsGet('energy_data',null);
if(!energyData){energyData=[];for(var h=0;h<18;h++){var row=[];for(var f=0;f<8;f++){var base=90-h*2.5-f*1.5+Math.random()*10;row.push(Math.max(20,Math.min(100,Math.round(base))));}energyData.push(row);}}
var html='<button class="v27-close" onclick="window._v27Close(\'energy\')">&times;</button>';
html+='<div class="v27-title">⚡ 라운드 에너지 관리 시스템</div>';
html+='<canvas id="v27-energy-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v27-card"><h3>에너지 조절 팁</h3>';
html+='<div style="font-size:11px;color:rgba(255,255,255,0.7);line-height:1.6">';
html+='• Hole 1-6: 워밍업 후 친문하게 시작, 수분보충<br>';
html+='• Hole 7-12: 집중력 저하 구간, 간식+호흡법<br>';
html+='• Hole 13-18: 피로 누적, 루틴 단순화+멘탈 리셋</div></div>';
var avgEnergy=0,minHole=0,minVal=100;
for(var h=0;h<18;h++){var sum=0;for(var f=0;f<8;f++)sum+=energyData[h][f];var avg=sum/8;avgEnergy+=avg;if(avg<minVal){minVal=avg;minHole=h;}}
avgEnergy=Math.round(avgEnergy/18);
var grade=avgEnergy>=75?'S':avgEnergy>=65?'A':avgEnergy>=55?'B':avgEnergy>=45?'C':'D';
var gradeColor=grade==='S'?'#00FF88':grade==='A'?'#4ECDC4':grade==='B'?'#FECA57':grade==='C'?'#FF9F43':'#FF6B6B';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v27-stat-card"><div class="v27-stat-val" style="color:#00FF88">'+avgEnergy+'%</div><div class="v27-stat-label">평균 에너지</div></div>';
html+='<div class="v27-stat-card"><div class="v27-stat-val" style="color:#FF6B6B">H'+(minHole+1)+'</div><div class="v27-stat-label">최저 홀</div></div>';
html+='<div class="v27-stat-card"><div class="v27-stat-val" style="color:'+gradeColor+'">'+grade+'</div><div class="v27-stat-label">에너지 등급</div></div>';
html+='<div class="v27-stat-card"><div class="v27-stat-val" style="color:#A855F7">'+Math.round(minVal)+'%</div><div class="v27-stat-label">최저값</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('energy');drawEnergyCanvas(energyData);
}
function drawEnergyCanvas(data){
var c=document.getElementById('v27-energy-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);
var grd=ctx.createLinearGradient(0,0,0,H);grd.addColorStop(0,'#0f1729');grd.addColorStop(1,'#1a1a2e');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('18-Hole Energy Level Heatmap',W/2,24);
var L=70,R=W-20,T=50,B=H-50;
var cellW=(R-L)/18,cellH=(B-T)/8;
for(var h=0;h<18;h++){
for(var f=0;f<8;f++){
var val=data[h][f];
var hue=val>70?120:val>50?60:val>30?30:0;
var light=25+val*0.4;
ctx.fillStyle='hsl('+hue+',80%,'+light+'%)';
ctx.fillRect(L+h*cellW,T+f*cellH,cellW-1,cellH-1);
ctx.fillStyle='rgba(255,255,255,'+(val>50?0.8:0.5)+')';ctx.font='8px sans-serif';ctx.textAlign='center';
ctx.fillText(val,L+h*cellW+cellW/2,T+f*cellH+cellH/2+3);
}
}
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='9px sans-serif';ctx.textAlign='center';
for(var h=0;h<18;h++){ctx.fillText('H'+(h+1),L+h*cellW+cellW/2,B+14);}
ctx.textAlign='right';
for(var f=0;f<8;f++){ctx.fillText(ENERGY_FACTORS[f],L-4,T+f*cellH+cellH/2+3);}
ctx.fillStyle='#fff';ctx.font='9px sans-serif';ctx.textAlign='center';
ctx.fillText('Green=High Energy | Yellow=Medium | Red=Low Energy',W/2,H-10);
}

// ===== 5. CADDIE ADVICE DECISION TREE Canvas 620x400 =====
var CADDIE_SITUATIONS=['Tee Shot','Approach','Around Green','Bunker','Trouble Shot','Putting'];
var CADDIE_FACTORS=['Distance','Wind','Lie','Hazard','Pin Position','Confidence'];
var CADDIE_ADVICE={0:['Driver center','3W safe','Iron layup'],1:['Attack pin','Center green','Short-side safe'],2:['Chip & run','Lob shot','Bump & run'],3:['Splash out','Fried egg dig','Fairway bunker sweep'],4:['Punch out','Recovery pitch','Hero shot'],5:['Lag putt','Attack putt','Die at hole']};
function showCaddieAdvice(){
playSfx('caddie_open');
var pn=getPanel('caddie');
var selSit=lsGet('caddie_sit',0);
var html='<button class="v27-close" onclick="window._v27Close(\'caddie\')">&times;</button>';
html+='<div class="v27-title">🧢 캐디 어드바이스 의사결정 트리</div>';
html+='<canvas id="v27-caddie-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v27-card"><h3>상황 선택</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px">';
for(var i=0;i<CADDIE_SITUATIONS.length;i++){
html+='<button class="v27-btn v27-btn-sm'+(i===selSit?' v27-btn-primary':'')+'" onclick="window._v27SelCaddie('+i+')">'+CADDIE_SITUATIONS[i]+'</button>';
}
html+='</div></div>';
html+='<div class="v27-card"><h3>추천 전략</h3>';
var advice=CADDIE_ADVICE[selSit];
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px">';
var advColors=['#00FF88','#FECA57','#FF6B6B'];
var advLabels=['Safe','Standard','Aggressive'];
for(var i=0;i<3;i++){
html+='<div class="v27-stat-card" style="border-color:'+advColors[i]+';cursor:pointer" onclick="window._v27CaddieSelect('+i+')">';
html+='<div style="color:'+advColors[i]+';font-size:9px;margin-bottom:4px">'+advLabels[i]+'</div>';
html+='<div style="font-size:12px;font-weight:bold;color:#fff">'+advice[i]+'</div></div>';
}
html+='</div></div>';
var factorScores=[85,60,75,40,70,80];
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
for(var i=0;i<6;i++){
var sc=factorScores[i];
var fc=sc>=70?'#00FF88':sc>=50?'#FECA57':'#FF6B6B';
html+='<div class="v27-stat-card"><div class="v27-stat-val" style="color:'+fc+'">'+sc+'</div><div class="v27-stat-label">'+CADDIE_FACTORS[i]+'</div></div>';
}
html+='</div>';
pn.innerHTML=html;openPanel('caddie');drawCaddieCanvas(selSit);
}
window._v27SelCaddie=function(i){lsSet('caddie_sit',i);showCaddieAdvice();};
window._v27CaddieSelect=function(i){playSfx('click_v27');showToast('Strategy selected: '+['Safe','Standard','Aggressive'][i]);};
function drawCaddieCanvas(sit){
var c=document.getElementById('v27-caddie-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);
var grd=ctx.createLinearGradient(0,0,0,H);grd.addColorStop(0,'#0f1729');grd.addColorStop(1,'#1a1a2e');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Caddie Decision Tree - '+CADDIE_SITUATIONS[sit],W/2,24);
var cx=W/2,startY=55;
ctx.fillStyle='rgba(0,255,136,0.15)';ctx.strokeStyle='#00FF88';ctx.lineWidth=2;
roundRect(ctx,cx-60,startY,120,32,8,true,true);
ctx.fillStyle='#fff';ctx.font='bold 11px sans-serif';ctx.fillText(CADDIE_SITUATIONS[sit],cx,startY+20);
var factors=CADDIE_FACTORS;
var fColors=['#FF6B6B','#48DBFB','#FECA57','#FF9F43','#A855F7','#4ECDC4'];
var fY=startY+60;
for(var i=0;i<6;i++){
var fx=55+i*(W-110)/5;
ctx.strokeStyle='rgba(255,255,255,0.2)';ctx.lineWidth=1;
ctx.beginPath();ctx.moveTo(cx,startY+32);ctx.lineTo(fx+40,fY);ctx.stroke();
ctx.fillStyle='rgba('+hexToRgb(fColors[i])+',0.15)';ctx.strokeStyle=fColors[i];ctx.lineWidth=1.5;
roundRect(ctx,fx,fY,80,26,6,true,true);
ctx.fillStyle=fColors[i];ctx.font='9px sans-serif';ctx.textAlign='center';
ctx.fillText(factors[i],fx+40,fY+16);
}
var decisions=CADDIE_ADVICE[sit];
var dColors=['#00FF88','#FECA57','#FF6B6B'];
var dY=fY+70;
for(var i=0;i<3;i++){
var dx=W/6+i*W/3-60;
for(var f=0;f<6;f++){
var fx=55+f*(W-110)/5+40;
ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.lineWidth=0.5;
ctx.beginPath();ctx.moveTo(fx,fY+26);ctx.lineTo(dx+60,dY);ctx.stroke();
}
ctx.fillStyle='rgba('+hexToRgb(dColors[i])+',0.2)';ctx.strokeStyle=dColors[i];ctx.lineWidth=2;
roundRect(ctx,dx,dY,120,36,10,true,true);
ctx.fillStyle=dColors[i];ctx.font='bold 10px sans-serif';ctx.textAlign='center';
ctx.fillText(decisions[i],dx+60,dY+15);
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='8px sans-serif';
ctx.fillText(['Low Risk','Medium Risk','High Risk'][i],dx+60,dY+28);
}
var outY=dY+65;
var outcomes=[['Par likely','Bogey rare'],['Birdie chance','Bogey possible'],['Eagle possible','Double risk']];
for(var i=0;i<3;i++){
var dx=W/6+i*W/3-60;
ctx.strokeStyle=dColors[i];ctx.lineWidth=1;ctx.setLineDash([3,3]);
ctx.beginPath();ctx.moveTo(dx+60,dY+36);ctx.lineTo(dx+60,outY);ctx.stroke();
ctx.setLineDash([]);
ctx.fillStyle='rgba(255,255,255,0.06)';ctx.strokeStyle='rgba(255,255,255,0.15)';ctx.lineWidth=1;
roundRect(ctx,dx,outY,120,40,8,true,true);
ctx.fillStyle='rgba(255,255,255,0.7)';ctx.font='9px sans-serif';
ctx.fillText(outcomes[i][0],dx+60,outY+16);
ctx.fillText(outcomes[i][1],dx+60,outY+30);
}
ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='9px sans-serif';ctx.textAlign='center';
ctx.fillText('Situation → Factor Analysis → Strategy Decision → Expected Outcome',W/2,H-10);
}
function roundRect(ctx,x,y,w,h,r,fill,stroke){ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);ctx.lineTo(x+r,y+h);ctx.quadraticCurveTo(x,y+h,x,y+h-r);ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();if(fill)ctx.fill();if(stroke)ctx.stroke();}
function hexToRgb(hex){var r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);return r+','+g+','+b;}

// ===== 6. HANDICAP TREND PREDICTION ENGINE Canvas 620x400 =====
function showHandicapTrend(){
playSfx('hcap_open');
var pn=getPanel('hcap');
var hcapLog=lsGet('hcap_log',null);
if(!hcapLog){hcapLog=[];for(var i=0;i<20;i++){hcapLog.push({date:'2026-'+(i<6?'0'+(i+1):(i<12?''+(i+1):'0'+(i-11))),hcap:Math.round((18-i*0.4+Math.random()*2)*10)/10});}}
var html='<button class="v27-close" onclick="window._v27Close(\'hcap\')">&times;</button>';
html+='<div class="v27-title">📈 핸디캡 추세 예측 엔진</div>';
html+='<canvas id="v27-hcap-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v27-card"><h3>핸디캡 기록</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">';
html+='<div><label class="v27-label">현재 핸디캡</label><input class="v27-input" type="number" id="v27-hcap-val" value="'+(hcapLog.length>0?hcapLog[hcapLog.length-1].hcap:15)+'" step="0.1" min="0" max="54"></div>';
html+='<div style="display:flex;align-items:flex-end"><button class="v27-btn v27-btn-primary" style="width:100%" onclick="window._v27RecordHcap()">기록</button></div>';
html+='</div></div>';
var curHcap=hcapLog.length>0?hcapLog[hcapLog.length-1].hcap:15;
var prevHcap=hcapLog.length>1?hcapLog[hcapLog.length-2].hcap:curHcap;
var trend=Math.round((curHcap-prevHcap)*10)/10;
var predicted=Math.round((curHcap+trend*3)*10)/10;
if(predicted<0)predicted=0;
var grade=curHcap<=5?'S':curHcap<=10?'A':curHcap<=18?'B':curHcap<=28?'C':'D';
var gradeColor=grade==='S'?'#00FF88':grade==='A'?'#4ECDC4':grade==='B'?'#FECA57':grade==='C'?'#FF9F43':'#FF6B6B';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v27-stat-card"><div class="v27-stat-val" style="color:#00FF88">'+curHcap+'</div><div class="v27-stat-label">현재 HC</div></div>';
html+='<div class="v27-stat-card"><div class="v27-stat-val" style="color:'+(trend<=0?'#00FF88':'#FF6B6B')+'">'+(trend<=0?'':'+')+(trend)+'</div><div class="v27-stat-label">변화량</div></div>';
html+='<div class="v27-stat-card"><div class="v27-stat-val" style="color:#48DBFB">'+predicted+'</div><div class="v27-stat-label">3개월 예측</div></div>';
html+='<div class="v27-stat-card"><div class="v27-stat-val" style="color:'+gradeColor+'">'+grade+'</div><div class="v27-stat-label">등급</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('hcap');drawHcapCanvas(hcapLog);
}
window._v27RecordHcap=function(){
var val=parseFloat(document.getElementById('v27-hcap-val').value)||15;
var log=lsGet('hcap_log',[]);
log.push({date:todayStr(),hcap:val});
if(log.length>30)log.shift();
lsSet('hcap_log',log);
playSfx('save_v27');showToast('Handicap '+val+' recorded!');checkAchievements();showHandicapTrend();
};
function drawHcapCanvas(log){
var c=document.getElementById('v27-hcap-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);
var grd=ctx.createLinearGradient(0,0,0,H);grd.addColorStop(0,'#0f1729');grd.addColorStop(1,'#1a1a2e');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Handicap Trend + 3-Month Prediction',W/2,24);
var L=55,R=W-30,T=50,B=H-50;
var maxH=30,minH=0;
for(var i=0;i<log.length;i++){if(log[i].hcap>maxH)maxH=Math.ceil(log[i].hcap/5)*5;}
ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.lineWidth=1;
for(var i=0;i<=5;i++){var y=B-(B-T)*i/5;ctx.beginPath();ctx.moveTo(L,y);ctx.lineTo(R,y);ctx.stroke();ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='9px sans-serif';ctx.textAlign='right';ctx.fillText((minH+(maxH-minH)*i/5).toFixed(1),L-4,y+3);}
if(log.length<2)return;
var totalPts=log.length+3;
ctx.strokeStyle='#00FF88';ctx.lineWidth=2;ctx.beginPath();
for(var i=0;i<log.length;i++){
var x=L+i/(totalPts-1)*(R-L);
var y=B-(log[i].hcap-minH)/(maxH-minH)*(B-T);
if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
}
ctx.stroke();
for(var i=0;i<log.length;i++){
var x=L+i/(totalPts-1)*(R-L);
var y=B-(log[i].hcap-minH)/(maxH-minH)*(B-T);
ctx.fillStyle='#00FF88';ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
}
var last=log[log.length-1].hcap;
var prev=log.length>1?log[log.length-2].hcap:last;
var trend=(last-prev);
ctx.strokeStyle='#48DBFB';ctx.lineWidth=2;ctx.setLineDash([6,4]);ctx.beginPath();
var lx=L+(log.length-1)/(totalPts-1)*(R-L);
var ly=B-(last-minH)/(maxH-minH)*(B-T);
ctx.moveTo(lx,ly);
for(var i=1;i<=3;i++){
var px=L+(log.length-1+i)/(totalPts-1)*(R-L);
var predVal=Math.max(0,last+trend*i);
var py=B-(predVal-minH)/(maxH-minH)*(B-T);
ctx.lineTo(px,py);
ctx.fillStyle='#48DBFB';ctx.beginPath();ctx.arc(px,py,3,0,Math.PI*2);ctx.fill();
ctx.moveTo(px,py);
}
ctx.stroke();ctx.setLineDash([]);
ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='9px sans-serif';ctx.textAlign='left';
ctx.fillText('Actual',L+5,T-5);
ctx.fillStyle='rgba(72,219,251,0.5)';ctx.fillText('Predicted',L+50,T-5);
ctx.fillStyle='rgba(255,255,255,0.3)';ctx.textAlign='center';
ctx.fillText('↓ Lower = Better | Trend line extrapolated 3 months',W/2,H-10);
}

// ===== 7. SHOT RESULT PREDICTION SIMULATOR Canvas 620x400 =====
var SHOT_FACTORS=['Club Speed','Attack Angle','Face Angle','Club Path','Spin Rate','Launch Angle','Wind Speed','Temperature'];
var SHOT_IDEAL=[100,0,0,0,2700,12,0,22];
var SHOT_UNITS=['mph','deg','deg','deg','rpm','deg','mph','C'];
function showShotPredictor(){
playSfx('predict_open');
var pn=getPanel('predict');
var params=lsGet('predict_params',SHOT_IDEAL.slice());
var html='<button class="v27-close" onclick="window._v27Close(\'predict\')">&times;</button>';
html+='<div class="v27-title">🎯 샷 결과 예측 시뮬레이터</div>';
html+='<canvas id="v27-predict-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v27-card"><h3>파라미터 조정</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">';
for(var i=0;i<8;i++){
html+='<div><label class="v27-label">'+SHOT_FACTORS[i]+' ('+SHOT_UNITS[i]+')</label>';
html+='<input class="v27-input" type="number" id="v27-pred-'+i+'" value="'+params[i]+'" step="'+(i===4?100:i===0?1:0.5)+'"></div>';
}
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
html+='<button class="v27-btn v27-btn-primary" onclick="window._v27RunPredict()">🚀 시뮬레이션</button>';
html+='<button class="v27-btn" onclick="window._v27ResetPredict()">초기화</button>';
html+='</div></div>';
var carry=Math.round(params[0]*2.5*(1+params[5]/100)*(1-Math.abs(params[2])/30));
var totalDist=carry+Math.round(carry*0.08);
var offline=Math.round(params[2]*2+params[3]*1.5);
var height=Math.round(params[5]*3+params[4]*0.005);
var grade=Math.abs(offline)<5&&carry>200?'S':Math.abs(offline)<10&&carry>180?'A':Math.abs(offline)<15?'B':Math.abs(offline)<25?'C':'D';
var gradeColor=grade==='S'?'#00FF88':grade==='A'?'#4ECDC4':grade==='B'?'#FECA57':grade==='C'?'#FF9F43':'#FF6B6B';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v27-stat-card"><div class="v27-stat-val" style="color:#00FF88">'+totalDist+'yd</div><div class="v27-stat-label">총 비거리</div></div>';
html+='<div class="v27-stat-card"><div class="v27-stat-val" style="color:#FFB800">'+carry+'yd</div><div class="v27-stat-label">캐리</div></div>';
html+='<div class="v27-stat-card"><div class="v27-stat-val" style="color:'+(Math.abs(offline)<10?'#4ECDC4':'#FF6B6B')+'">'+offline+'yd</div><div class="v27-stat-label">좌우 편차</div></div>';
html+='<div class="v27-stat-card"><div class="v27-stat-val" style="color:'+gradeColor+'">'+grade+'</div><div class="v27-stat-label">샷 등급</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('predict');drawPredictCanvas(params,carry,totalDist,offline,height);
}
window._v27RunPredict=function(){
var params=[];
for(var i=0;i<8;i++)params.push(parseFloat(document.getElementById('v27-pred-'+i).value)||SHOT_IDEAL[i]);
lsSet('predict_params',params);playSfx('click_v27');showShotPredictor();
};
window._v27ResetPredict=function(){lsSet('predict_params',SHOT_IDEAL.slice());showShotPredictor();};
function drawPredictCanvas(params,carry,totalDist,offline,height){
var c=document.getElementById('v27-predict-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);
var grd=ctx.createLinearGradient(0,0,0,H);grd.addColorStop(0,'#1a3a5c');grd.addColorStop(0.6,'#87CEEB');grd.addColorStop(1,'#2D8B2D');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
ctx.fillStyle='rgba(255,255,255,0.9)';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Shot Trajectory Prediction',W/2,24);
var startX=60,startY=H-60;
var endX=W-60,endY=H-60;
var peakH=Math.min(height*1.5,H-100);
var cpx=(startX+endX)/2+offline*2;
var cpy=startY-peakH;
ctx.strokeStyle='rgba(0,255,136,0.8)';ctx.lineWidth=3;ctx.beginPath();
ctx.moveTo(startX,startY);
ctx.quadraticCurveTo(cpx,cpy,endX+offline*2,endY);
ctx.stroke();
for(var t=0;t<=10;t++){
var tt=t/10;
var bx=(1-tt)*(1-tt)*startX+2*(1-tt)*tt*cpx+tt*tt*(endX+offline*2);
var by=(1-tt)*(1-tt)*startY+2*(1-tt)*tt*cpy+tt*tt*endY;
var alpha=0.3+tt*0.5;
ctx.fillStyle='rgba(0,255,136,'+alpha+')';ctx.beginPath();ctx.arc(bx,by,3,0,Math.PI*2);ctx.fill();
}
ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(startX,startY,5,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#FF6B6B';ctx.beginPath();ctx.arc(endX+offline*2,endY,5,0,Math.PI*2);ctx.fill();
ctx.setLineDash([4,4]);ctx.strokeStyle='rgba(255,255,255,0.2)';ctx.lineWidth=1;
ctx.beginPath();ctx.moveTo(endX,0);ctx.lineTo(endX,H);ctx.stroke();
ctx.setLineDash([]);
ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='10px sans-serif';
ctx.textAlign='center';ctx.fillText('Carry: '+carry+'yd',cpx,cpy-10);
ctx.fillText('Total: '+totalDist+'yd',(startX+endX)/2,endY+20);
ctx.fillText('Offline: '+offline+'yd',endX+offline*2,endY-15);
ctx.fillText('Peak: '+height+'ft',cpx-40,cpy+20);
var barX=W-45;
for(var i=0;i<8;i++){
var val=params[i];var ideal=SHOT_IDEAL[i];
var pct=ideal!==0?Math.min(100,Math.abs(val/ideal)*100):100;
var bh=20;
ctx.fillStyle='rgba(255,255,255,0.06)';ctx.fillRect(barX-80,40+i*22,80,bh-4);
ctx.fillStyle=pct>80?'rgba(0,255,136,0.4)':pct>50?'rgba(254,202,87,0.4)':'rgba(255,107,107,0.4)';
ctx.fillRect(barX-80,40+i*22,Math.min(80,80*pct/100),bh-4);
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='7px sans-serif';ctx.textAlign='right';
ctx.fillText(SHOT_FACTORS[i].substr(0,8),barX-82,40+i*22+10);
}
}

// ===== 8. COMPREHENSIVE COURSE IQ DASHBOARD Canvas 620x400 =====
var IQ_METRICS=['Driving','Approach','Short Game','Putting','Course Mgmt','Mental Game','Fitness','Strategy'];
var IQ_COLORS=['#FF6B6B','#FF9F43','#FECA57','#48DBFB','#00FF88','#A855F7','#FF85A2','#4ECDC4'];
function showCourseIQ(){
playSfx('iq_open');
var pn=getPanel('iq');
var iqData=lsGet('iq_data',null);
if(!iqData){iqData=[];for(var i=0;i<8;i++)iqData.push(50+Math.round(Math.random()*40));}
var html='<button class="v27-close" onclick="window._v27Close(\'iq\')">&times;</button>';
html+='<div class="v27-title">🧠 종합 코스 IQ 대시보드</div>';
html+='<canvas id="v27-iq-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v27-card"><h3>스코어 조정</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px">';
for(var i=0;i<8;i++){
html+='<div><label class="v27-label">'+IQ_METRICS[i]+'</label>';
html+='<input class="v27-input" type="number" id="v27-iq-'+i+'" value="'+iqData[i]+'" min="0" max="100"></div>';
}
html+='</div>';
html+='<button class="v27-btn v27-btn-primary" style="width:100%;margin-top:8px" onclick="window._v27SaveIQ()">저장 &amp; 분석</button>';
html+='</div>';
var total=0;for(var i=0;i<8;i++)total+=iqData[i];
var avg=Math.round(total/8);
var weights=[0.15,0.15,0.15,0.15,0.12,0.1,0.08,0.1];
var weighted=0;for(var i=0;i<8;i++)weighted+=iqData[i]*weights[i];
weighted=Math.round(weighted);
var grade=weighted>=85?'S':weighted>=70?'A':weighted>=55?'B':weighted>=40?'C':'D';
var gradeColor=grade==='S'?'#00FF88':grade==='A'?'#4ECDC4':grade==='B'?'#FECA57':grade==='C'?'#FF9F43':'#FF6B6B';
var weakest=0;for(var i=1;i<8;i++){if(iqData[i]<iqData[weakest])weakest=i;}
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v27-stat-card"><div class="v27-stat-val" style="color:#00FF88">'+avg+'</div><div class="v27-stat-label">평균 IQ</div></div>';
html+='<div class="v27-stat-card"><div class="v27-stat-val" style="color:#FFB800">'+weighted+'</div><div class="v27-stat-label">가중 종합</div></div>';
html+='<div class="v27-stat-card"><div class="v27-stat-val" style="color:'+gradeColor+'">'+grade+'</div><div class="v27-stat-label">종합 등급</div></div>';
html+='<div class="v27-stat-card"><div class="v27-stat-val" style="color:#FF6B6B">'+IQ_METRICS[weakest]+'</div><div class="v27-stat-label">약점 영역</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('iq');drawIQCanvas(iqData,weighted,grade);
}
window._v27SaveIQ=function(){
var data=[];
for(var i=0;i<8;i++)data.push(parseInt(document.getElementById('v27-iq-'+i).value)||50);
lsSet('iq_data',data);playSfx('save_v27');showToast('Course IQ updated!');checkAchievements();showCourseIQ();
};
function drawIQCanvas(data,weighted,grade){
var c=document.getElementById('v27-iq-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);
var grd=ctx.createLinearGradient(0,0,0,H);grd.addColorStop(0,'#0f1729');grd.addColorStop(1,'#1a1a2e');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Comprehensive Course IQ - 8 KPI Gauge Dashboard',W/2,24);
var cols=4,rows=2;
var gW=130,gH=140,gapX=18,gapY=15;
var startX=(W-cols*gW-(cols-1)*gapX)/2;
var startY=45;
for(var i=0;i<8;i++){
var col=i%cols,row=Math.floor(i/cols);
var cx=startX+col*(gW+gapX)+gW/2;
var cy=startY+row*(gH+gapY)+gH/2+10;
var r=48;
ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.lineWidth=12;
ctx.beginPath();ctx.arc(cx,cy,r,Math.PI,0);ctx.stroke();
var pct=data[i]/100;
var color=IQ_COLORS[i];
ctx.strokeStyle=color;ctx.lineWidth=12;ctx.lineCap='round';
ctx.beginPath();ctx.arc(cx,cy,r,Math.PI,Math.PI+Math.PI*pct);ctx.stroke();
ctx.lineCap='butt';
ctx.fillStyle=color;ctx.font='bold 20px sans-serif';ctx.textAlign='center';
ctx.fillText(data[i],cx,cy+5);
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='9px sans-serif';
ctx.fillText(IQ_METRICS[i],cx,cy+20);
var g=data[i]>=85?'S':data[i]>=70?'A':data[i]>=55?'B':data[i]>=40?'C':'D';
var gc=g==='S'?'#00FF88':g==='A'?'#4ECDC4':g==='B'?'#FECA57':g==='C'?'#FF9F43':'#FF6B6B';
ctx.fillStyle=gc;ctx.font='bold 11px sans-serif';
ctx.fillText(g,cx,cy-r-8);
}
var gradeColor=grade==='S'?'#00FF88':grade==='A'?'#4ECDC4':grade==='B'?'#FECA57':grade==='C'?'#FF9F43':'#FF6B6B';
ctx.fillStyle=gradeColor;ctx.font='bold 14px sans-serif';ctx.textAlign='center';
ctx.fillText('Overall: '+grade+' ('+weighted+'pts)',W/2,H-15);
}

// ===== QUIZ v27 - 15 NEW QUESTIONS (285->300) =====
var QUIZ_V27=[
{q:'클럽 비거리의 정규분포에서 1표준편차 범위에 샷이 들어갈 확률은?',a:['68.3%','50%','95.4%','99.7%'],c:0},
{q:'PGA 투어 평균 6피트 퍼팅 성공률은 약?',a:['54%','84%','31%','99%'],c:0},
{q:'이상적인 백스윙:다운스윙 템포 비율은?',a:['3:1','2:1','4:1','1:1'],c:0},
{q:'드라이버 샷의 이상적인 런치 앵글은?',a:['10-12도','5도','18도','25도'],c:0},
{q:'코스 매니지먼트에서 &#x27;보수적 전략&#x27;의 핵심은?',a:['위험 최소화','핀 공략','최대 비거리','퍼팅 우선'],c:0},
{q:'핸디캡 인덱스 계산에 사용되는 최근 스코어 수는?',a:['20개 중 최저 8개','10개 전체','5개 평균','30개 중간'],c:0},
{q:'스트로크 게인 분석에서 가장 개선 효과가 큰 영역은 보통?',a:['Approach','Driving','Putting','Short game'],c:0},
{q:'퍼팅에서 AimPoint 방법의 핵심 원리는?',a:['경사도에 따라 손가락으로 방향 지정','라인 읽기','속도 조절','바람 보정'],c:0},
{q:'라운드 중 에너지가 가장 많이 소모되는 구간은?',a:['Hole 10-14','Hole 1-3','Hole 15-18','Hole 4-9'],c:0},
{q:'캐디의 클럽 추천에서 가장 중요한 요소는?',a:['남은 거리와 바람','항상 드라이버','자신감','핸디캡'],c:0},
{q:'샷 예측에서 페이스 앵글이 오픈이면 공은 어디로 휘는가?',a:['오른쪽(우타)','왼쪽','직진','위로'],c:0},
{q:'Course IQ에서 가장 높은 가중치를 받는 영역은?',a:['Driving/Approach/Short/Putting 동일','Mental Game','Fitness','Strategy'],c:0},
{q:'베르누이 원리에 의한 리프트 효과는 어떤 스핀에서 발생?',a:['백스핀','사이드스핀','톱스핀','로우스핀'],c:0},
{q:'위험 관리에서 샷의 변동계수(CV)가 5% 이하면?',a:['S등급 일관성','B등급','D등급','적정 수준'],c:0},
{q:'퍼팅 그린의 스팀프 미터(stimpmeter) 값이 12 이상이면?',a:['매우 빠른 그린','보통 속도','느린 그린','불규칙'],c:0}
];
var quizState27=lsGet('quiz_state',{idx:0,score:0,total:0,done:false});
function showQuizV27(){
playSfx('quiz_correct_v27');
var pn=getPanel('quiz27');
var qs=quizState27;
if(qs.done||qs.idx>=QUIZ_V27.length){qs.idx=0;qs.score=0;qs.total=0;qs.done=false;}
var q=QUIZ_V27[qs.idx];
var html='<button class="v27-close" onclick="window._v27Close(\'quiz27\')">&times;</button>';
html+='<div class="v27-title">📚 Golf Tracker 퀀즈 v27 ('+QUIZ_V27.length+'문)</div>';
html+='<div class="v27-card"><div style="font-size:11px;color:rgba(255,255,255,0.5);margin-bottom:6px">Q'+(qs.idx+1)+'/'+QUIZ_V27.length+' | Score: '+qs.score+'/'+qs.total+'</div>';
html+='<div style="font-size:14px;font-weight:bold;margin-bottom:12px;line-height:1.5">'+q.q+'</div>';
for(var i=0;i<q.a.length;i++){
html+='<button class="v27-btn" style="width:100%;text-align:left;margin-bottom:6px;padding:10px 14px" onclick="window._v27AnswerQuiz('+i+')">'+String.fromCharCode(65+i)+'. '+q.a[i]+'</button>';
}
html+='</div>';
var pct=qs.total>0?Math.round(qs.score/qs.total*100):0;
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v27-stat-card"><div class="v27-stat-val" style="color:#00FF88">'+qs.score+'</div><div class="v27-stat-label">정답</div></div>';
html+='<div class="v27-stat-card"><div class="v27-stat-val" style="color:#FF6B6B">'+(qs.total-qs.score)+'</div><div class="v27-stat-label">오답</div></div>';
html+='<div class="v27-stat-card"><div class="v27-stat-val" style="color:#FFB800">'+pct+'%</div><div class="v27-stat-label">정답률</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('quiz27');
}
window._v27AnswerQuiz=function(i){
var qs=quizState27;
var q=QUIZ_V27[qs.idx];
qs.total++;
if(i===q.c){qs.score++;playSfx('quiz_correct_v27');showToast('정답! ✔');}
else{playSfx('quiz_wrong_v27');showToast('오답! 정답: '+q.a[q.c]);}
qs.idx++;
if(qs.idx>=QUIZ_V27.length){qs.done=true;showToast('Quiz Complete! '+qs.score+'/'+qs.total);}
lsSet('quiz_state',qs);
setTimeout(showQuizV27,800);
};

// ===== ACHIEVEMENTS v27 =====
var ACHIEVE_V27=[
{id:'dist_first',name:'Distance Analyst',desc:'First club distance recorded',check:function(){return lsGet('dist_data',null)!==null}},
{id:'dist_5clubs',name:'Full Bag Profiler',desc:'Record 5+ clubs distance',check:function(){var d=lsGet('dist_data',{});return Object.keys(d).length>=5}},
{id:'putt_50',name:'Putt Tracker 50',desc:'Record 50 putting attempts',check:function(){var d=lsGet('putt_data',null);if(!d)return false;var t=0;for(var i=0;i<d.length;i++)t+=d[i].total;return t>=150}},
{id:'energy_check',name:'Energy Monitor',desc:'Check round energy system',check:function(){return lsGet('energy_checked',false)}},
{id:'caddie_use',name:'Caddie Consultant',desc:'Use caddie advice system',check:function(){return lsGet('caddie_used',false)}},
{id:'hcap_record',name:'Handicap Historian',desc:'Record 5+ handicap entries',check:function(){var l=lsGet('hcap_log',[]);return l.length>=5}},
{id:'predict_run',name:'Shot Predictor',desc:'Run shot prediction simulator',check:function(){return lsGet('predict_used',false)}},
{id:'iq_assess',name:'Course IQ Master',desc:'Complete Course IQ assessment',check:function(){return lsGet('iq_data',null)!==null}},
{id:'quiz27_perfect',name:'Quiz v27 Ace',desc:'Get 100% on v27 quiz',check:function(){var q=lsGet('quiz_state',{});return q.done&&q.score===QUIZ_V27.length}},
{id:'quiz27_complete',name:'Quiz v27 Scholar',desc:'Complete v27 quiz',check:function(){var q=lsGet('quiz_state',{});return q.done}},
{id:'explore_all_v27',name:'v27 Explorer',desc:'Try all 8 v27 features',check:function(){return lsGet('v27_explored',0)>=8}},
{id:'v27_complete',name:'v27 Graduate',desc:'Earn 8+ v27 achievements',check:function(){var cnt=0;for(var i=0;i<ACHIEVE_V27.length-1;i++){if(ACHIEVE_V27[i].check())cnt++;}return cnt>=8}}
];
function checkAchievements(){
var unlocked=lsGet('achievements',[]);
var newOnes=false;
for(var i=0;i<ACHIEVE_V27.length;i++){
if(unlocked.indexOf(ACHIEVE_V27[i].id)===-1&&ACHIEVE_V27[i].check()){
unlocked.push(ACHIEVE_V27[i].id);newOnes=true;
playSfx('achieve_v27');showToast('🏆 '+ACHIEVE_V27[i].name+'!');
}
}
if(newOnes)lsSet('achievements',unlocked);
}
var explored=lsGet('v27_explored',0);
function markExplored(){explored++;lsSet('v27_explored',explored);
lsSet('energy_checked',true);lsSet('caddie_used',true);lsSet('predict_used',true);
}

// ===== CSS =====
var style=document.createElement('style');
style.textContent='.v27-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:10020;display:none;align-items:center;justify-content:center;padding:16px;overflow-y:auto}.v27-overlay.active{display:flex}.v27-panel{background:#14141a;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:20px;max-width:660px;width:100%;max-height:90vh;overflow-y:auto;position:relative}.v27-close{position:absolute;top:12px;right:12px;background:none;border:none;color:#fff;font-size:24px;cursor:pointer;z-index:2;opacity:0.7}.v27-close:hover{opacity:1}.v27-title{font-size:18px;font-weight:bold;color:#fff;margin-bottom:12px;text-align:center}.v27-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;margin:8px 0}.v27-card h3{font-size:13px;color:rgba(255,255,255,0.7);margin-bottom:6px}.v27-label{font-size:10px;color:rgba(255,255,255,0.5);display:block;margin-bottom:2px}.v27-input{width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:6px;color:#fff;padding:6px 8px;font-size:12px;outline:none;box-sizing:border-box}.v27-input:focus{border-color:#00D4B4}.v27-btn{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);border-radius:8px;color:#fff;padding:8px 12px;font-size:12px;cursor:pointer;transition:all 0.2s}.v27-btn:hover{background:rgba(255,255,255,0.12)}.v27-btn-primary{background:rgba(0,212,180,0.15);border-color:rgba(0,212,180,0.3);color:#00D4B4}.v27-btn-primary:hover{background:rgba(0,212,180,0.25)}.v27-btn-sm{padding:6px 8px;font-size:11px}.v27-stat-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:10px;text-align:center}.v27-stat-val{font-size:18px;font-weight:bold}.v27-stat-label{font-size:9px;color:rgba(255,255,255,0.5);margin-top:2px}.v27-toast{position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(20px);background:rgba(0,212,180,0.15);border:1px solid rgba(0,212,180,0.3);color:#00D4B4;padding:10px 20px;border-radius:10px;font-size:13px;z-index:10030;opacity:0;transition:all 0.3s}.v27-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}';
document.head.appendChild(style);

// ===== NAVIGATION =====
window._v27Close=function(id){closePanel(id);};
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
{label:'DistNorm',fn:showDistAnalyzer,icon:'📏'},
{label:'HoleSim',fn:showHoleSimulator,icon:'⛳'},
{label:'PuttZone',fn:showPuttingZone,icon:'🎯'},
{label:'Energy',fn:showEnergyMgmt,icon:'⚡'},
{label:'Caddie',fn:showCaddieAdvice,icon:'🧢'},
{label:'HCapTrend',fn:showHandicapTrend,icon:'📈'},
{label:'ShotPred',fn:showShotPredictor,icon:'🎯'},
{label:'CourseIQ',fn:showCourseIQ,icon:'🧠'},
{label:'Quiz27',fn:showQuizV27,icon:'📚'}
];
for(var i=0;i<btns.length;i++){
(function(b){
var btn=document.createElement('button');
btn.innerHTML=b.icon+'<br><span style="font-size:8px">'+b.label+'</span>';
btn.style.cssText='background:rgba(78,205,196,0.12);border:1px solid rgba(78,205,196,0.25);border-radius:8px;color:#4ECDC4;padding:6px 4px;font-size:12px;cursor:pointer;min-width:44px;flex:0 0 auto;margin:2px';
btn.addEventListener('click',function(){b.fn();markExplored();});
nav.appendChild(btn);
})(btns[i]);
}
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown',function(e){
if(!e.shiftKey)return;
switch(e.key){
case'Q':case'q':showDistAnalyzer();markExplored();break;
case'W':case'w':showHoleSimulator();markExplored();break;
case'E':case'e':showPuttingZone();markExplored();break;
case'R':case'r':showEnergyMgmt();markExplored();break;
case'T':case't':showCaddieAdvice();markExplored();break;
case'Y':case'y':showHandicapTrend();markExplored();break;
case'U':case'u':showShotPredictor();markExplored();break;
case'I':case'i':showCourseIQ();markExplored();break;
case'0':showQuizV27();markExplored();break;
}
});

// ===== INIT =====
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',addNavButtons);}
else{setTimeout(addNavButtons,2000);}
setTimeout(checkAchievements,4000);
})();
