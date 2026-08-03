(function(){
'use strict';
var LS='gt_v25_';
var audioCtx=null;
function getAC(){if(!audioCtx)try{audioCtx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}return audioCtx}
function playSfx(type){var ac=getAC();if(!ac)return;var o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);var t=ac.currentTime;g.gain.setValueAtTime(0.1,t);switch(type){case'traj_open':o.type='sine';o.frequency.setValueAtTime(554,t);o.frequency.linearRampToValueAtTime(698,t+0.06);o.frequency.linearRampToValueAtTime(831,t+0.12);o.frequency.linearRampToValueAtTime(988,t+0.18);g.gain.exponentialRampToValueAtTime(0.01,t+0.32);o.start(t);o.stop(t+0.32);break;case'traj_fire':o.type='triangle';o.frequency.setValueAtTime(932,t);o.frequency.linearRampToValueAtTime(1245,t+0.08);g.gain.exponentialRampToValueAtTime(0.01,t+0.14);o.start(t);o.stop(t+0.14);break;case'wind_open':o.type='sine';o.frequency.setValueAtTime(415,t);o.frequency.linearRampToValueAtTime(523,t+0.07);o.frequency.linearRampToValueAtTime(659,t+0.14);g.gain.exponentialRampToValueAtTime(0.01,t+0.28);o.start(t);o.stop(t+0.28);break;case'club_open':o.type='sine';o.frequency.setValueAtTime(494,t);o.frequency.linearRampToValueAtTime(622,t+0.06);o.frequency.linearRampToValueAtTime(784,t+0.12);o.frequency.linearRampToValueAtTime(880,t+0.18);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'strat_open':o.type='sine';o.frequency.setValueAtTime(370,t);o.frequency.linearRampToValueAtTime(466,t+0.07);o.frequency.linearRampToValueAtTime(554,t+0.14);g.gain.exponentialRampToValueAtTime(0.01,t+0.28);o.start(t);o.stop(t+0.28);break;case'nutr_open':o.type='sine';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(554,t+0.06);o.frequency.linearRampToValueAtTime(698,t+0.12);g.gain.exponentialRampToValueAtTime(0.01,t+0.25);o.start(t);o.stop(t+0.25);break;case'plane_open':o.type='sine';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(659,t+0.06);o.frequency.linearRampToValueAtTime(831,t+0.12);o.frequency.linearRampToValueAtTime(988,t+0.18);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'peer_open':o.type='sine';o.frequency.setValueAtTime(466,t);o.frequency.linearRampToValueAtTime(587,t+0.07);o.frequency.linearRampToValueAtTime(740,t+0.14);g.gain.exponentialRampToValueAtTime(0.01,t+0.28);o.start(t);o.stop(t+0.28);break;case'intel_open':o.type='sine';o.frequency.setValueAtTime(622,t);o.frequency.linearRampToValueAtTime(784,t+0.06);o.frequency.linearRampToValueAtTime(932,t+0.12);o.frequency.linearRampToValueAtTime(1109,t+0.18);g.gain.exponentialRampToValueAtTime(0.01,t+0.32);o.start(t);o.stop(t+0.32);break;case'quiz_correct_v25':o.type='sine';o.frequency.setValueAtTime(831,t);o.frequency.setValueAtTime(1047,t+0.08);o.frequency.setValueAtTime(1245,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'quiz_wrong_v25':o.type='sawtooth';o.frequency.setValueAtTime(294,t);o.frequency.linearRampToValueAtTime(220,t+0.2);g.gain.setValueAtTime(0.06,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'achieve_v25':o.type='sine';o.frequency.setValueAtTime(1047,t);o.frequency.setValueAtTime(1245,t+0.1);o.frequency.setValueAtTime(1480,t+0.2);o.frequency.setValueAtTime(1865,t+0.3);g.gain.exponentialRampToValueAtTime(0.01,t+0.5);o.start(t);o.stop(t+0.5);break;case'nav_v25':o.type='sine';o.frequency.setValueAtTime(784,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.08);o.start(t);o.stop(t+0.08);break;case'save_v25':o.type='triangle';o.frequency.setValueAtTime(587,t);o.frequency.linearRampToValueAtTime(880,t+0.1);g.gain.exponentialRampToValueAtTime(0.01,t+0.2);o.start(t);o.stop(t+0.2);break;case'hover_v25':o.type='sine';o.frequency.setValueAtTime(1109,t);g.gain.setValueAtTime(0.04,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.05);o.start(t);o.stop(t+0.05);break;case'reset_v25':o.type='square';o.frequency.setValueAtTime(349,t);o.frequency.linearRampToValueAtTime(233,t+0.15);g.gain.setValueAtTime(0.05,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.25);o.start(t);o.stop(t+0.25);break;default:o.type='sine';o.frequency.setValueAtTime(440,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.15);o.start(t);o.stop(t+0.15)}}

function lsGet(k,d){try{var v=localStorage.getItem(LS+k);return v?JSON.parse(v):d}catch(e){return d}}
function lsSet(k,v){try{localStorage.setItem(LS+k,JSON.stringify(v))}catch(e){}}
function todayStr(){return new Date().toISOString().slice(0,10)}
function showToast(msg){var t=document.createElement('div');t.className='v25-toast';t.textContent=msg;document.body.appendChild(t);setTimeout(function(){t.classList.add('show')},50);setTimeout(function(){t.classList.remove('show');setTimeout(function(){t.remove()},400)},3000)}
function createOverlay(id){var ov=document.createElement('div');ov.className='v25-overlay';ov.id='v25-'+id;ov.addEventListener('click',function(e){if(e.target===ov)closePanel(id)});var pn=document.createElement('div');pn.className='v25-panel';pn.style.position='relative';ov.appendChild(pn);return pn}
function openPanel(id){var el=document.getElementById('v25-'+id);if(el)el.classList.add('active')}
function closePanel(id){var el=document.getElementById('v25-'+id);if(el)el.classList.remove('active')}
function getPanel(id){var ov=document.getElementById('v25-'+id);if(!ov){var pn=createOverlay(id);pn.id='v25-'+id+'-panel';document.body.appendChild(pn.parentElement);return pn}return ov.querySelector('.v25-panel')||ov}

// ===== 1. SHOT TRAJECTORY SIMULATOR Canvas 620x400 =====
var TRAJ_CLUBS=[
{name:'Driver',loft:10.5,speed:100,spin:2700,apex:32,carry:230,roll:25,color:'#FF6B6B'},
{name:'3W',loft:15,speed:90,spin:3800,apex:28,carry:210,roll:15,color:'#FF9F43'},
{name:'5I',loft:27,speed:78,spin:5600,apex:25,carry:180,roll:8,color:'#FECA57'},
{name:'7I',loft:34,speed:70,spin:7200,apex:28,carry:155,roll:5,color:'#48DBFB'},
{name:'PW',loft:46,speed:58,spin:9500,apex:30,carry:120,roll:3,color:'#00FF88'},
{name:'SW',loft:56,speed:48,spin:11000,apex:28,carry:85,roll:2,color:'#A855F7'}
];
function showTrajectory(){
playSfx('traj_open');
var pn=getPanel('traj');
var selClub=lsGet('traj_club',0);
var log=lsGet('traj_log',[]);
var windSpd=lsGet('traj_wind',0);
var html='<button class="v25-close" onclick="window._v25Close(\'traj\')">&times;</button>';
html+='<div class="v25-title">&#x1F3CC; &#xC0F7;&#xADA4;&#xC801; &#xC2DC;&#xBBAC;&#xB808;&#xC774;&#xD130;</div>';
html+='<canvas id="v25-traj-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v25-card"><h3>&#xD074;&#xB7FD; &amp; &#xC870;&#xAC74;</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:4px;margin-bottom:8px">';
for(var i=0;i<TRAJ_CLUBS.length;i++){
html+='<button class="v25-btn v25-btn-sm'+(i===selClub?' v25-btn-primary':'')+'" onclick="window._v25SelectTrajClub('+i+')" style="border-color:'+TRAJ_CLUBS[i].color+'40;color:'+TRAJ_CLUBS[i].color+'">'+TRAJ_CLUBS[i].name+'</button>';
}
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px">';
html+='<div><label class="v25-label">&#xD5E4;&#xB4DC;&#xC2A4;&#xD53C;&#xB4DC; (mph)</label><input class="v25-input" type="number" id="v25-traj-speed" value="'+TRAJ_CLUBS[selClub].speed+'" min="40" max="130"></div>';
html+='<div><label class="v25-label">&#xBC14;&#xB78C; (mph, &#xB9DE;&#xBC14;&#xB78C;-)</label><input class="v25-input" type="number" id="v25-traj-wind" value="'+windSpd+'" min="-30" max="30"></div>';
html+='<div><label class="v25-label">&#xBC1C;&#xC0AC;&#xAC01; (&deg;)</label><input class="v25-input" type="number" id="v25-traj-launch" value="'+Math.round(TRAJ_CLUBS[selClub].loft*0.75)+'" min="0" max="45" step="0.5"></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
html+='<button class="v25-btn v25-btn-primary" onclick="window._v25FireTraj()">&#x1F680; &#xBC1C;&#xC0AC;</button>';
html+='<button class="v25-btn" onclick="window._v25SaveTraj()">&#x1F4BE; &#xC800;&#xC7A5;</button>';
html+='</div></div>';
var cl=TRAJ_CLUBS[selClub];
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v25-stat-card"><div class="v25-stat-val" style="color:'+cl.color+'">'+cl.carry+'yd</div><div class="v25-stat-label">&#xCE90;&#xB9AC; &#xAE30;&#xC900;</div></div>';
html+='<div class="v25-stat-card"><div class="v25-stat-val" style="color:#FFB800">'+cl.apex+'yd</div><div class="v25-stat-label">&#xCD5C;&#xACE0;&#xC810;</div></div>';
html+='<div class="v25-stat-card"><div class="v25-stat-val" style="color:#4ECDC4">'+(cl.carry+cl.roll)+'yd</div><div class="v25-stat-label">&#xCD1D;&#xAC70;&#xB9AC;</div></div>';
html+='<div class="v25-stat-card"><div class="v25-stat-val" style="color:#A855F7">'+log.length+'</div><div class="v25-stat-label">&#xBC1C;&#xC0AC; &#xAE30;&#xB85D;</div></div>';
html+='</div>';
if(log.length>0)html+='<button class="v25-btn" style="width:100%;margin-top:6px;border-color:rgba(255,123,84,.3);color:#FF7B54" onclick="if(confirm(\'&#xCD08;&#xAE30;&#xD654;?\'))window._v25ResetTraj()">&#xCD08;&#xAE30;&#xD654;</button>';
pn.innerHTML=html;openPanel('traj');drawTrajCanvas(selClub,windSpd,log);
}
window._v25SelectTrajClub=function(i){lsSet('traj_club',i);showTrajectory();};
window._v25FireTraj=function(){playSfx('traj_fire');var c=lsGet('traj_club',0);var spd=parseInt(document.getElementById('v25-traj-speed').value)||TRAJ_CLUBS[c].speed;var wind=parseInt(document.getElementById('v25-traj-wind').value)||0;var launch=parseFloat(document.getElementById('v25-traj-launch').value)||12;lsSet('traj_wind',wind);var cl=TRAJ_CLUBS[c];var spdRatio=spd/cl.speed;var carry=Math.round(cl.carry*spdRatio*spdRatio*(1-wind*0.004));var apex=Math.round(cl.apex*spdRatio*Math.sin(launch*Math.PI/180)/Math.sin(cl.loft*0.75*Math.PI/180));var roll=Math.round(cl.roll*(1+wind*0.01));if(roll<0)roll=0;var grade='D';if(carry>=cl.carry*0.95&&carry<=cl.carry*1.1)grade='S';else if(carry>=cl.carry*0.85)grade='A';else if(carry>=cl.carry*0.7)grade='B';else grade='C';showToast(cl.name+': '+carry+'yd carry + '+roll+'yd roll = '+(carry+roll)+'yd ('+grade+')');};
window._v25SaveTraj=function(){playSfx('save_v25');var c=lsGet('traj_club',0);var spd=parseInt(document.getElementById('v25-traj-speed').value)||TRAJ_CLUBS[c].speed;var wind=parseInt(document.getElementById('v25-traj-wind').value)||0;var launch=parseFloat(document.getElementById('v25-traj-launch').value)||12;var cl=TRAJ_CLUBS[c];var spdRatio=spd/cl.speed;var carry=Math.round(cl.carry*spdRatio*spdRatio*(1-wind*0.004));var log=lsGet('traj_log',[]);log.push({date:todayStr(),club:c,carry:carry,speed:spd,wind:wind});if(log.length>100)log.shift();lsSet('traj_log',log);showToast('&#xADA4;&#xC801; &#xB370;&#xC774;&#xD130; &#xC800;&#xC7A5;!');checkAchievements();showTrajectory();};
window._v25ResetTraj=function(){lsSet('traj_log',[]);showTrajectory();};
function drawTrajCanvas(selClub,windSpd,log){
var c=document.getElementById('v25-traj-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);
var grd=ctx.createLinearGradient(0,0,0,H);grd.addColorStop(0,'#1a2a4a');grd.addColorStop(0.7,'#87CEEB');grd.addColorStop(0.75,'#228B22');grd.addColorStop(1,'#1a5c1a');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Shot Trajectory - '+TRAJ_CLUBS[selClub].name,W/2,24);
var L=50,R=W-30,groundY=H*0.75,T=40;
ctx.strokeStyle='rgba(255,255,255,0.15)';ctx.lineWidth=1;
for(var i=0;i<=5;i++){var y=groundY-(groundY-T)*i/5;ctx.beginPath();ctx.moveTo(L,y);ctx.lineTo(R,y);ctx.stroke();}
ctx.font='9px sans-serif';ctx.textAlign='right';ctx.fillStyle='rgba(255,255,255,0.5)';
var cl=TRAJ_CLUBS[selClub];var maxH=cl.apex*1.4;
for(var i=0;i<=5;i++){var y=groundY-(groundY-T)*i/5;ctx.fillText(Math.round(maxH*i/5)+'yd',L-4,y+3);}
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='9px sans-serif';ctx.textAlign='center';
var maxD=(cl.carry+cl.roll)*1.2;
for(var i=0;i<=6;i++){var x=L+(R-L)*i/6;ctx.fillText(Math.round(maxD*i/6)+'yd',x,groundY+16);}
ctx.strokeStyle='rgba(255,255,255,0.3)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(L,groundY);ctx.lineTo(R,groundY);ctx.stroke();
for(var ci=0;ci<TRAJ_CLUBS.length;ci++){
var tc=TRAJ_CLUBS[ci];var pts=[];
for(var t2=0;t2<=1;t2+=0.02){
var x=L+(tc.carry/maxD)*(R-L)*t2;
var y2=groundY-4*tc.apex/maxH*(groundY-T)*t2*(1-t2);
pts.push({x:x,y:y2});
}
ctx.strokeStyle=ci===selClub?tc.color:tc.color+'40';ctx.lineWidth=ci===selClub?3:1;
ctx.beginPath();
for(var p=0;p<pts.length;p++){if(p===0)ctx.moveTo(pts[p].x,pts[p].y);else ctx.lineTo(pts[p].x,pts[p].y);}
ctx.stroke();
if(ci===selClub){
var apexX=L+(tc.carry/maxD)*(R-L)*0.5;var apexY=groundY-tc.apex/maxH*(groundY-T);
ctx.fillStyle=tc.color;ctx.beginPath();ctx.arc(apexX,apexY,5,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#fff';ctx.font='10px sans-serif';ctx.textAlign='center';
ctx.fillText('Apex: '+tc.apex+'yd',apexX,apexY-12);
var landX=L+(tc.carry/maxD)*(R-L);
ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(landX,groundY,4,0,Math.PI*2);ctx.fill();
ctx.fillText(tc.carry+'yd',landX,groundY-10);
var rollEndX=L+((tc.carry+tc.roll)/maxD)*(R-L);
ctx.strokeStyle='#FFB800';ctx.lineWidth=2;ctx.setLineDash([4,3]);
ctx.beginPath();ctx.moveTo(landX,groundY);ctx.lineTo(rollEndX,groundY);ctx.stroke();ctx.setLineDash([]);
ctx.fillStyle='#FFB800';ctx.beginPath();ctx.arc(rollEndX,groundY,4,0,Math.PI*2);ctx.fill();
ctx.fillText('+'+(tc.roll)+'yd roll',rollEndX,groundY-10);
}
ctx.fillStyle=tc.color;ctx.font='9px sans-serif';ctx.textAlign='left';
var lx=L+(tc.carry/maxD)*(R-L);
ctx.fillText(tc.name,lx+6,groundY+(ci===selClub?30:28+ci*2));
}
if(windSpd!==0){
ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='11px sans-serif';ctx.textAlign='left';
ctx.fillText(windSpd>0?'➡ Tailwind '+windSpd+'mph':'⬅ Headwind '+Math.abs(windSpd)+'mph',L,H-12);
}
if(log.length>1){
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='10px sans-serif';ctx.textAlign='right';
var recent=log.slice(-5);var avgCarry=0;
for(var i=0;i<recent.length;i++)avgCarry+=recent[i].carry;
avgCarry=Math.round(avgCarry/recent.length);
ctx.fillText('Recent avg: '+avgCarry+'yd ('+recent.length+' shots)',R,H-12);
}
}

// ===== 2. WIND EFFECT MATRIX Canvas 640x400 =====
var WIND_DIRS=['N','NE','E','SE','S','SW','W','NW'];
var WIND_CLUBS=['DR','3W','5I','7I','PW','SW'];
var WIND_BASE=[230,210,180,155,120,85];
function showWindMatrix(){
playSfx('wind_open');
var pn=getPanel('wind');
var windSpd=lsGet('wind_speed',10);
var log=lsGet('wind_log',[]);
var html='<button class="v25-close" onclick="window._v25Close(\'wind\')">&times;</button>';
html+='<div class="v25-title">&#x1F32C; &#xBC14;&#xB78C; &#xC601;&#xD5A5; &#xB9E4;&#xD2B8;&#xB9AD;&#xC2A4;</div>';
html+='<canvas id="v25-wind-canvas" width="640" height="400" style="width:100%;max-width:640px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v25-card"><h3>&#xBC14;&#xB78C; &#xC124;&#xC815;</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">';
html+='<div><label class="v25-label">&#xBC14;&#xB78C; &#xC18D;&#xB3C4; (mph)</label><input class="v25-input" type="range" min="0" max="30" value="'+windSpd+'" id="v25-wind-spd" oninput="window._v25UpdateWind(this.value)"><span id="v25-wind-val" style="font-size:12px;color:#FF7B54;margin-left:6px">'+windSpd+' mph</span></div>';
html+='<div><label class="v25-label">&#xC0F7; &#xBC29;&#xD5A5;</label><select class="v25-input" id="v25-shot-dir"><option value="N">&#xBD81;&#xCABD; (N)</option><option value="NE">&#xBD81;&#xB3D9; (NE)</option><option value="E">&#xB3D9;&#xCABD; (E)</option><option value="SE">&#xB0A8;&#xB3D9; (SE)</option><option value="S" selected>&#xB0A8;&#xCABD; (S)</option><option value="SW">&#xB0A8;&#xC11C; (SW)</option><option value="W">&#xC11C;&#xCABD; (W)</option><option value="NW">&#xBD81;&#xC11C; (NW)</option></select></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
html+='<button class="v25-btn v25-btn-primary" onclick="window._v25CalcWind()">&#x1F4CA; &#xBD84;&#xC11D;</button>';
html+='<button class="v25-btn" onclick="window._v25SaveWind()">&#x1F4BE; &#xC800;&#xC7A5;</button>';
html+='</div></div>';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v25-stat-card"><div class="v25-stat-val" style="color:#FF7B54">'+windSpd+'</div><div class="v25-stat-label">mph &#xBC14;&#xB78C;</div></div>';
var maxEffect=Math.round(windSpd*1.8);
html+='<div class="v25-stat-card"><div class="v25-stat-val" style="color:#FF6B6B">&pm;'+maxEffect+'yd</div><div class="v25-stat-label">&#xCD5C;&#xB300; &#xC601;&#xD5A5;</div></div>';
html+='<div class="v25-stat-card"><div class="v25-stat-val" style="color:#4ECDC4">'+Math.round(windSpd*0.3)+'yd</div><div class="v25-stat-label">&#xD6A1;&#xBC14;&#xB78C; &#xD3B8;&#xCC28;</div></div>';
html+='<div class="v25-stat-card"><div class="v25-stat-val" style="color:#A855F7">'+log.length+'</div><div class="v25-stat-label">&#xAE30;&#xB85D;</div></div>';
html+='</div>';
if(log.length>0)html+='<button class="v25-btn" style="width:100%;margin-top:6px;border-color:rgba(255,123,84,.3);color:#FF7B54" onclick="if(confirm(\'&#xCD08;&#xAE30;&#xD654;?\'))window._v25ResetWind()">&#xCD08;&#xAE30;&#xD654;</button>';
pn.innerHTML=html;openPanel('wind');drawWindCanvas(windSpd);
}
window._v25UpdateWind=function(v){var el=document.getElementById('v25-wind-val');if(el)el.textContent=v+' mph';lsSet('wind_speed',parseInt(v));drawWindCanvas(parseInt(v));};
window._v25CalcWind=function(){playSfx('traj_fire');var spd=parseInt(document.getElementById('v25-wind-spd').value)||10;showToast('&#xBC14;&#xB78C; '+spd+'mph: DR ±'+Math.round(spd*1.8)+'yd, PW ±'+Math.round(spd*0.8)+'yd');};
window._v25SaveWind=function(){playSfx('save_v25');var spd=parseInt(document.getElementById('v25-wind-spd').value)||10;var dir=document.getElementById('v25-shot-dir').value;var log=lsGet('wind_log',[]);log.push({date:todayStr(),speed:spd,dir:dir});if(log.length>50)log.shift();lsSet('wind_log',log);showToast('&#xBC14;&#xB78C; &#xB370;&#xC774;&#xD130; &#xC800;&#xC7A5;!');checkAchievements();};
window._v25ResetWind=function(){lsSet('wind_log',[]);showWindMatrix();};
function drawWindCanvas(windSpd){
var c=document.getElementById('v25-wind-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=640,H=400;ctx.clearRect(0,0,W,H);
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,W,H);
ctx.fillStyle='rgba(255,123,84,0.03)';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Wind Effect Matrix ('+windSpd+' mph)',W/2,24);
var L=70,R=W-20,T=50,B=H-40;
var cellW=(R-L)/WIND_DIRS.length;var cellH=(B-T)/WIND_CLUBS.length;
ctx.font='10px sans-serif';ctx.textAlign='center';ctx.fillStyle='rgba(255,255,255,0.7)';
for(var i=0;i<WIND_DIRS.length;i++)ctx.fillText(WIND_DIRS[i],L+i*cellW+cellW/2,T-6);
ctx.textAlign='right';
for(var j=0;j<WIND_CLUBS.length;j++)ctx.fillText(WIND_CLUBS[j],L-8,T+j*cellH+cellH/2+4);
var headFactors=[1.0,0.7,0.0,-0.7,-1.0,-0.7,0.0,0.7];
var sideFactors=[0.0,0.5,1.0,0.5,0.0,-0.5,-1.0,-0.5];
var clubLoftFactors=[1.0,0.9,0.75,0.65,0.5,0.4];
for(var j=0;j<WIND_CLUBS.length;j++){
for(var i=0;i<WIND_DIRS.length;i++){
var headEffect=Math.round(windSpd*headFactors[i]*1.5*clubLoftFactors[j]);
var sideEffect=Math.round(windSpd*Math.abs(sideFactors[i])*0.8*clubLoftFactors[j]);
var totalEffect=Math.abs(headEffect)+sideEffect*0.3;
var intensity=Math.min(totalEffect/30,1);
var r,g2,b2;
if(headEffect>0){r=50;g2=Math.round(180+75*intensity);b2=50;}
else if(headEffect<0){r=Math.round(200+55*intensity);g2=50;b2=50;}
else{r=Math.round(255*intensity);g2=Math.round(180*(1-intensity));b2=50;}
ctx.fillStyle='rgba('+r+','+g2+','+b2+',0.6)';
ctx.fillRect(L+i*cellW+1,T+j*cellH+1,cellW-2,cellH-2);
ctx.fillStyle='#fff';ctx.font='bold 11px sans-serif';ctx.textAlign='center';
var sign=headEffect>=0?'+':'';
ctx.fillText(sign+headEffect+'yd',L+i*cellW+cellW/2,T+j*cellH+cellH/2-2);
if(sideEffect>0){
ctx.font='9px sans-serif';ctx.fillStyle='rgba(255,255,255,0.5)';
ctx.fillText('↔'+sideEffect+'yd',L+i*cellW+cellW/2,T+j*cellH+cellH/2+12);
}
}
}
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='10px sans-serif';ctx.textAlign='left';
ctx.fillText('■ &#xB9DE;&#xBC14;&#xB78C;(-yd)',L,H-8);
ctx.fillStyle='rgba(50,180,50,0.8)';ctx.fillText('■ &#xB4B7;&#xBC14;&#xB78C;(+yd)',L+110,H-8);
ctx.fillStyle='rgba(255,180,50,0.8)';ctx.fillText('■ &#xD6A1;&#xBC14;&#xB78C;(↔yd)',L+230,H-8);
}

// ===== 3. CLUB LIFECYCLE TRACKER Canvas 620x400 =====
var LIFECYCLE_CLUBS=['Driver','3W','3H','4I','5I','6I','7I','8I','9I','PW','GW','SW','LW','Putter'];
function showClubLifecycle(){
playSfx('club_open');
var pn=getPanel('lifecycle');
var data=lsGet('lifecycle_data',{});
var html='<button class="v25-close" onclick="window._v25Close(\'lifecycle\')">&times;</button>';
html+='<div class="v25-title">&#x1F527; &#xD074;&#xB7FD; &#xC218;&#xBA85; &#xC0AC;&#xC774;&#xD074;</div>';
html+='<canvas id="v25-life-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v25-card"><h3>&#xD074;&#xB7FD; &#xC815;&#xBCF4; &#xC785;&#xB825;</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">';
html+='<div><label class="v25-label">&#xD074;&#xB7FD; &#xC120;&#xD0DD;</label><select class="v25-input" id="v25-life-club">';
for(var i=0;i<LIFECYCLE_CLUBS.length;i++)html+='<option value="'+i+'">'+LIFECYCLE_CLUBS[i]+'</option>';
html+='</select></div>';
html+='<div><label class="v25-label">&#xAD6C;&#xB9E4;&#xC77C; (&#xAC1C;&#xC6D4;&#xC804;)</label><input class="v25-input" type="number" id="v25-life-months" value="12" min="0" max="120"></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:6px">';
html+='<div><label class="v25-label">&#xCD1D; &#xB77C;&#xC6B4;&#xB4DC;</label><input class="v25-input" type="number" id="v25-life-rounds" value="'+(data[0]?data[0].rounds:50)+'" min="0" max="9999"></div>';
html+='<div><label class="v25-label">&#xADF8;&#xB8E8;&#xBE0C; &#xC0C1;&#xD0DC; (1~10)</label><input class="v25-input" type="range" min="1" max="10" value="'+(data[0]?data[0].groove:7)+'" id="v25-life-groove"></div>';
html+='<div><label class="v25-label">&#xC0E4;&#xD504;&#xD2B8; &#xC0C1;&#xD0DC; (1~10)</label><input class="v25-input" type="range" min="1" max="10" value="'+(data[0]?data[0].shaft:8)+'" id="v25-life-shaft"></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
html+='<button class="v25-btn v25-btn-primary" onclick="window._v25SaveLifecycle()">&#x1F4BE; &#xC800;&#xC7A5;</button>';
html+='<button class="v25-btn" onclick="window._v25AnalyzeLife()">&#x1F50D; &#xBD84;&#xC11D;</button>';
html+='</div></div>';
var totalClubs=Object.keys(data).length;var avgHealth=0;
for(var k in data){var d=data[k];avgHealth+=(d.groove+d.shaft)/2;}
if(totalClubs>0)avgHealth=Math.round(avgHealth*10/totalClubs)/10;
var needReplace=0;for(var k in data){if((data[k].groove+data[k].shaft)/2<4)needReplace++;}
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v25-stat-card"><div class="v25-stat-val" style="color:#FF7B54">'+totalClubs+'</div><div class="v25-stat-label">&#xB4F1;&#xB85D; &#xD074;&#xB7FD;</div></div>';
html+='<div class="v25-stat-card"><div class="v25-stat-val" style="color:#4ECDC4">'+avgHealth+'</div><div class="v25-stat-label">&#xD3C9;&#xADE0; &#xC0C1;&#xD0DC;</div></div>';
html+='<div class="v25-stat-card"><div class="v25-stat-val" style="color:'+(needReplace>0?'#FF6B6B':'#00FF88')+'">'+needReplace+'</div><div class="v25-stat-label">&#xAD50;&#xCCB4; &#xD544;&#xC694;</div></div>';
html+='<div class="v25-stat-card"><div class="v25-stat-val" style="color:#A855F7">14</div><div class="v25-stat-label">&#xCD1D; &#xD074;&#xB7FD;</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('lifecycle');drawLifecycleCanvas(data);
}
window._v25SaveLifecycle=function(){playSfx('save_v25');var idx=parseInt(document.getElementById('v25-life-club').value);var months=parseInt(document.getElementById('v25-life-months').value)||12;var rounds=parseInt(document.getElementById('v25-life-rounds').value)||0;var groove=parseInt(document.getElementById('v25-life-groove').value)||5;var shaft=parseInt(document.getElementById('v25-life-shaft').value)||5;var data=lsGet('lifecycle_data',{});data[idx]={months:months,rounds:rounds,groove:groove,shaft:shaft,date:todayStr()};lsSet('lifecycle_data',data);showToast(LIFECYCLE_CLUBS[idx]+' &#xC800;&#xC7A5;!');checkAchievements();showClubLifecycle();};
window._v25AnalyzeLife=function(){playSfx('traj_fire');var data=lsGet('lifecycle_data',{});var tips=[];for(var k in data){var d=data[k];if(d.groove<4)tips.push(LIFECYCLE_CLUBS[k]+' &#xADF8;&#xB8E8;&#xBE0C; &#xB9C8;&#xBAA8; - &#xAD50;&#xCCB4; &#xAD8C;&#xC7A5;');if(d.shaft<4)tips.push(LIFECYCLE_CLUBS[k]+' &#xC0E4;&#xD504;&#xD2B8; &#xB178;&#xD6C4; - &#xC810;&#xAC80; &#xD544;&#xC694;');if(d.rounds>200)tips.push(LIFECYCLE_CLUBS[k]+' '+d.rounds+'R &#xC0AC;&#xC6A9; - &#xC131;&#xB2A5; &#xC810;&#xAC80;');}if(tips.length===0)tips.push('&#xBAA8;&#xB4E0; &#xD074;&#xB7FD; &#xC0C1;&#xD0DC; &#xC591;&#xD638;!');showToast(tips[0]);};
function drawLifecycleCanvas(data){
var c=document.getElementById('v25-life-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,W,H);
ctx.fillStyle='rgba(255,123,84,0.03)';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Club Lifecycle Status',W/2,24);
var L=60,R=W-20,T=45,B=H-35;
var barH=(B-T)/LIFECYCLE_CLUBS.length;
for(var i=0;i<LIFECYCLE_CLUBS.length;i++){
var y=T+i*barH;var d=data[i];
var groove=d?d.groove:0;var shaft=d?d.shaft:0;
var health=(groove+shaft)/2;
ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='10px sans-serif';ctx.textAlign='right';
ctx.fillText(LIFECYCLE_CLUBS[i],L-6,y+barH/2+3);
if(!d){
ctx.fillStyle='rgba(255,255,255,0.05)';ctx.fillRect(L,y+2,R-L,barH-4);
ctx.fillStyle='rgba(255,255,255,0.2)';ctx.font='9px sans-serif';ctx.textAlign='center';
ctx.fillText('&#xBBF8;&#xB4F1;&#xB85D;',L+(R-L)/2,y+barH/2+3);
continue;
}
ctx.fillStyle='rgba(255,255,255,0.05)';ctx.fillRect(L,y+2,R-L,barH-4);
var gW=(groove/10)*(R-L)*0.48;
var gColor=groove>=7?'#00FF88':groove>=4?'#FFB800':'#FF3366';
ctx.fillStyle=gColor+'80';ctx.fillRect(L,y+2,gW,(barH-4)/2);
var sW=(shaft/10)*(R-L)*0.48;
var sColor=shaft>=7?'#4ECDC4':shaft>=4?'#FF9F43':'#FF3366';
ctx.fillStyle=sColor+'80';ctx.fillRect(L,y+2+(barH-4)/2,sW,(barH-4)/2);
var grade=health>=8?'S':health>=6?'A':health>=4?'B':'C';
var gradeColor=grade==='S'?'#00FF88':grade==='A'?'#4ECDC4':grade==='B'?'#FFB800':'#FF3366';
ctx.fillStyle=gradeColor;ctx.font='bold 11px sans-serif';ctx.textAlign='left';
ctx.fillText(grade,R-L+L+Math.max(gW,sW)+8,y+barH/2+4);
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='8px sans-serif';
ctx.fillText(d.rounds+'R / '+d.months+'mo',L+Math.max(gW,sW)+4,y+barH/2+3);
}
ctx.fillStyle='rgba(0,255,136,0.7)';ctx.font='9px sans-serif';ctx.textAlign='left';
ctx.fillText('■ Groove',L,H-8);
ctx.fillStyle='rgba(78,205,196,0.7)';ctx.fillText('■ Shaft',L+70,H-8);
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.fillText('S=8+ A=6+ B=4+ C=<4',L+140,H-8);
}

// ===== 4. COURSE STRATEGY MINI-MAP Canvas 620x380 =====
var HOLE_TYPES=['Par 3 Short','Par 3 Long','Par 4 Short','Par 4 Mid','Par 4 Long','Par 5 Short','Par 5 Mid','Par 5 Long'];
var HOLE_STRATS=[
{safe:'7I center',danger:'Water/Bunker',tip:'&#xD074;&#xB7FD; &#xD558;&#xB098; &#xC62C;&#xB9AC;&#xAE30;'},
{safe:'5I/Hybrid',danger:'Deep bunker',tip:'&#xADF8;&#xB9B0; &#xC55E;&#xCABD; &#xB178;&#xB9AC;&#xAE30;'},
{safe:'3W fairway',danger:'OB left',tip:'&#xD398;&#xC5B4;&#xC6E8;&#xC774; &#xC6B0;&#xCE21; &#xACF5;&#xB7B5;'},
{safe:'DR center',danger:'Cross bunker',tip:'&#xC548;&#xC804;&#xD558;&#xAC8C; &#xD398;&#xC5B4;&#xC6E8;&#xC774;'},
{safe:'DR left-center',danger:'Water right',tip:'&#xB808;&#xC774;&#xC5C5; &#xAD8C;&#xC7A5;'},
{safe:'DR+3W',danger:'Bunker complex',tip:'&#xB450; &#xBC88;&#xC5D0; &#xADF8;&#xB9B0; &#xC55E;'},
{safe:'DR+5I+PW',danger:'Dogleg',tip:'&#xC138; &#xBC88;&#xC5D0; &#xADF8;&#xB9B0; &#xACF5;&#xB7B5;'},
{safe:'DR+3W+8I',danger:'Creek crossing',tip:'&#xBB3C; &#xAC74;&#xB108;&#xAE30; &#xACC4;&#xC0B0;'}
];
function showCourseStrategy(){
playSfx('strat_open');
var pn=getPanel('strat');
var selHole=lsGet('strat_hole',0);
var log=lsGet('strat_log',[]);
var html='<button class="v25-close" onclick="window._v25Close(\'strat\')">&times;</button>';
html+='<div class="v25-title">&#x1F5FA; &#xCF54;&#xC2A4; &#xC804;&#xB7B5; &#xBBF8;&#xB2C8;&#xB9F5;</div>';
html+='<canvas id="v25-strat-canvas" width="620" height="380" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v25-card"><h3>&#xD640; &#xD0C0;&#xC785; &#xC120;&#xD0DD;</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px">';
for(var i=0;i<HOLE_TYPES.length;i++){
html+='<button class="v25-btn v25-btn-sm'+(i===selHole?' v25-btn-primary':'')+'" onclick="window._v25SelectHole('+i+')">'+HOLE_TYPES[i]+'</button>';
}
html+='</div>';
var st=HOLE_STRATS[selHole];
html+='<div style="margin-top:8px;display:grid;grid-template-columns:1fr 1fr;gap:6px">';
html+='<div class="v25-stat-card" style="border-color:rgba(0,255,136,.2)"><div class="v25-stat-val" style="color:#00FF88;font-size:12px">'+st.safe+'</div><div class="v25-stat-label">&#xC548;&#xC804; &#xC804;&#xB7B5;</div></div>';
html+='<div class="v25-stat-card" style="border-color:rgba(255,51,102,.2)"><div class="v25-stat-val" style="color:#FF3366;font-size:12px">'+st.danger+'</div><div class="v25-stat-label">&#xC704;&#xD5D8; &#xC694;&#xC18C;</div></div>';
html+='</div>';
html+='<div style="text-align:center;margin-top:6px;color:rgba(255,255,255,0.7);font-size:12px">&#x1F4A1; '+st.tip+'</div>';
html+='<button class="v25-btn v25-btn-primary" style="width:100%;margin-top:8px" onclick="window._v25SaveStrat()">&#x1F4BE; &#xC804;&#xB7B5; &#xBA54;&#xBAA8;</button>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v25-stat-card"><div class="v25-stat-val" style="color:#FF7B54">'+HOLE_TYPES.length+'</div><div class="v25-stat-label">&#xD640; &#xD0C0;&#xC785;</div></div>';
html+='<div class="v25-stat-card"><div class="v25-stat-val" style="color:#00FF88">'+st.safe.split(' ')[0]+'</div><div class="v25-stat-label">&#xCD94;&#xCC9C; &#xD074;&#xB7FD;</div></div>';
html+='<div class="v25-stat-card"><div class="v25-stat-val" style="color:#FF3366">&#x26A0;</div><div class="v25-stat-label">'+st.danger.split(' ')[0]+'</div></div>';
html+='<div class="v25-stat-card"><div class="v25-stat-val" style="color:#A855F7">'+log.length+'</div><div class="v25-stat-label">&#xBA54;&#xBAA8; &#xC218;</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('strat');drawStratCanvas(selHole);
}
window._v25SelectHole=function(i){lsSet('strat_hole',i);showCourseStrategy();};
window._v25SaveStrat=function(){playSfx('save_v25');var h=lsGet('strat_hole',0);var log=lsGet('strat_log',[]);log.push({date:todayStr(),hole:h,type:HOLE_TYPES[h]});if(log.length>50)log.shift();lsSet('strat_log',log);showToast(HOLE_TYPES[h]+' &#xC804;&#xB7B5; &#xC800;&#xC7A5;!');checkAchievements();};
function drawStratCanvas(selHole){
var c=document.getElementById('v25-strat-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=380;ctx.clearRect(0,0,W,H);
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Course Strategy - '+HOLE_TYPES[selHole],W/2,24);
var isPar3=selHole<2,isPar4=selHole>=2&&selHole<5,isPar5=selHole>=5;
var fairwayL=W*0.2,fairwayR=W*0.8,teeY=H-50,greenY=60;
var fairwayGrd=ctx.createLinearGradient(0,greenY,0,teeY);
fairwayGrd.addColorStop(0,'#1a6b1a');fairwayGrd.addColorStop(1,'#2d8b2d');
ctx.fillStyle=fairwayGrd;
ctx.beginPath();ctx.moveTo(fairwayL+30,teeY);ctx.lineTo(fairwayR-30,teeY);
ctx.lineTo(fairwayR,greenY+40);ctx.lineTo(fairwayL,greenY+40);ctx.closePath();ctx.fill();
ctx.fillStyle='rgba(0,100,0,0.3)';
ctx.beginPath();ctx.moveTo(fairwayL-20,teeY);ctx.lineTo(fairwayL+30,teeY);
ctx.lineTo(fairwayL,greenY+40);ctx.lineTo(fairwayL-30,greenY+40);ctx.closePath();ctx.fill();
ctx.beginPath();ctx.moveTo(fairwayR-30,teeY);ctx.lineTo(fairwayR+20,teeY);
ctx.lineTo(fairwayR+30,greenY+40);ctx.lineTo(fairwayR,greenY+40);ctx.closePath();ctx.fill();
ctx.fillStyle='#3CB371';ctx.beginPath();ctx.ellipse(W/2,greenY+20,50,25,0,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(W/2,greenY+18,3,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#333';ctx.beginPath();ctx.arc(W/2,teeY-5,4,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#D2B48C';ctx.beginPath();ctx.ellipse(fairwayL+10,H*0.45,20,12,0,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#D2B48C';ctx.beginPath();ctx.ellipse(fairwayR+5,greenY+60,18,10,0,0,Math.PI*2);ctx.fill();
if(selHole>=2){
ctx.fillStyle='rgba(65,105,225,0.5)';ctx.beginPath();ctx.ellipse(fairwayR+15,H*0.6,25,15,-0.3,0,Math.PI*2);ctx.fill();
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='9px sans-serif';ctx.fillText('Water',fairwayR+15,H*0.6+3);
}
ctx.fillStyle='rgba(0,255,136,0.15)';
if(isPar3){
ctx.beginPath();ctx.ellipse(W/2,greenY+20,55,30,0,0,Math.PI*2);ctx.fill();
ctx.strokeStyle='rgba(0,255,136,0.5)';ctx.setLineDash([4,4]);ctx.beginPath();ctx.ellipse(W/2,greenY+20,55,30,0,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);
}else{
var safeX=W*0.45,safeY=isPar4?H*0.5:H*0.6;
ctx.beginPath();ctx.ellipse(safeX,safeY,35,20,0,0,Math.PI*2);ctx.fill();
ctx.strokeStyle='rgba(0,255,136,0.5)';ctx.setLineDash([4,4]);ctx.beginPath();ctx.ellipse(safeX,safeY,35,20,0,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);
ctx.fillStyle='rgba(0,255,136,0.7)';ctx.font='9px sans-serif';ctx.textAlign='center';
ctx.fillText('Safe Zone',safeX,safeY+4);
}
ctx.fillStyle='rgba(255,51,102,0.15)';ctx.beginPath();ctx.ellipse(fairwayR+5,greenY+60,25,15,0,0,Math.PI*2);ctx.fill();
ctx.strokeStyle='rgba(255,51,102,0.5)';ctx.setLineDash([4,4]);ctx.beginPath();ctx.ellipse(fairwayR+5,greenY+60,25,15,0,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);
ctx.fillStyle='rgba(255,51,102,0.7)';ctx.font='9px sans-serif';ctx.textAlign='center';
ctx.fillText('Danger',fairwayR+5,greenY+63);
ctx.setLineDash([]);
ctx.strokeStyle='#FFB800';ctx.lineWidth=2;ctx.setLineDash([6,4]);
ctx.beginPath();ctx.moveTo(W/2,teeY-5);
if(isPar3){ctx.lineTo(W/2,greenY+20);}
else if(isPar4){ctx.lineTo(W*0.45,H*0.5);ctx.lineTo(W/2,greenY+20);}
else{ctx.lineTo(W*0.45,H*0.65);ctx.lineTo(W*0.45,H*0.4);ctx.lineTo(W/2,greenY+20);}
ctx.stroke();ctx.setLineDash([]);
ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='10px sans-serif';ctx.textAlign='left';
ctx.fillText('Tee',W/2+8,teeY-2);ctx.fillText('Green',W/2+55,greenY+22);
ctx.fillText('Bunker',fairwayL-8,H*0.45+3);
var st=HOLE_STRATS[selHole];
ctx.fillStyle='rgba(255,184,0,0.8)';ctx.font='bold 11px sans-serif';ctx.textAlign='left';
ctx.fillText('→ '+st.safe,10,H-12);
ctx.fillStyle='rgba(255,51,102,0.8)';ctx.textAlign='right';
ctx.fillText('⚠ '+st.danger,W-10,H-12);
}

// ===== 5. ROUND NUTRITION MANAGER Canvas 600x380 =====
var NUTR_ITEMS=['Water','Sports Drink','Banana','Energy Bar','Nuts','Gel','Sandwich','Coffee'];
var NUTR_CALS=[0,120,105,250,170,100,350,5];
var NUTR_COLORS=['#48DBFB','#00FF88','#FECA57','#FF9F43','#A855F7','#FF6B6B','#FF7B54','#8B4513'];
function showNutrition(){
playSfx('nutr_open');
var pn=getPanel('nutr');
var intake=lsGet('nutr_intake',[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
var log=lsGet('nutr_log',[]);
var html='<button class="v25-close" onclick="window._v25Close(\'nutr\')">&times;</button>';
html+='<div class="v25-title">&#x1F34F; &#xB77C;&#xC6B4;&#xB4DC; &#xC601;&#xC591; &#xAD00;&#xB9AC;</div>';
html+='<canvas id="v25-nutr-canvas" width="600" height="380" style="width:100%;max-width:600px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v25-card"><h3>&#xD640;&#xBCC4; &#xC12D;&#xCDE8; &#xAE30;&#xB85D;</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px;margin-bottom:6px">';
for(var i=0;i<NUTR_ITEMS.length;i++){
html+='<button class="v25-btn v25-btn-sm" style="border-color:'+NUTR_COLORS[i]+'40;color:'+NUTR_COLORS[i]+'" onclick="window._v25AddNutr('+i+')">+'+NUTR_ITEMS[i]+'</button>';
}
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">';
html+='<div><label class="v25-label">&#xD604;&#xC7AC; &#xD640; (1~18)</label><input class="v25-input" type="number" id="v25-nutr-hole" value="1" min="1" max="18"></div>';
html+='<button class="v25-btn v25-btn-primary" style="align-self:end" onclick="window._v25SaveNutr()">&#x1F4BE; &#xB77C;&#xC6B4;&#xB4DC; &#xC800;&#xC7A5;</button>';
html+='</div></div>';
var totalCal=0;for(var i=0;i<18;i++)totalCal+=intake[i];
var waterCount=0;for(var i=0;i<18;i++)if(intake[i]===0||NUTR_ITEMS[intake[i]]==='Water')waterCount++;
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v25-stat-card"><div class="v25-stat-val" style="color:#FF7B54">'+totalCal+'</div><div class="v25-stat-label">kcal &#xCD1D;&#xC12D;&#xCDE8;</div></div>';
html+='<div class="v25-stat-card"><div class="v25-stat-val" style="color:#48DBFB">'+(totalCal>0?Math.round(totalCal/18):0)+'</div><div class="v25-stat-label">kcal/&#xD640;</div></div>';
var energyGrade=totalCal>=400&&totalCal<=800?'S':totalCal>=300?'A':totalCal>=200?'B':'C';
html+='<div class="v25-stat-card"><div class="v25-stat-val" style="color:'+(energyGrade==='S'?'#00FF88':'#FFB800')+'">'+energyGrade+'</div><div class="v25-stat-label">&#xC601;&#xC591; &#xB4F1;&#xAE09;</div></div>';
html+='<div class="v25-stat-card"><div class="v25-stat-val" style="color:#A855F7">'+log.length+'</div><div class="v25-stat-label">&#xB77C;&#xC6B4;&#xB4DC;</div></div>';
html+='</div>';
html+='<button class="v25-btn" style="width:100%;border-color:rgba(255,123,84,.3);color:#FF7B54" onclick="window._v25ResetNutr()">&#xCD08;&#xAE30;&#xD654;</button>';
pn.innerHTML=html;openPanel('nutr');drawNutrCanvas(intake);
}
window._v25AddNutr=function(itemIdx){playSfx('hover_v25');var hole=parseInt(document.getElementById('v25-nutr-hole').value)||1;var intake=lsGet('nutr_intake',[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);intake[hole-1]=NUTR_CALS[itemIdx];lsSet('nutr_intake',intake);showToast('Hole '+hole+': +'+NUTR_ITEMS[itemIdx]+' ('+NUTR_CALS[itemIdx]+'kcal)');drawNutrCanvas(intake);};
window._v25SaveNutr=function(){playSfx('save_v25');var intake=lsGet('nutr_intake',[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);var log=lsGet('nutr_log',[]);var total=0;for(var i=0;i<18;i++)total+=intake[i];log.push({date:todayStr(),total:total,intake:intake.slice()});if(log.length>30)log.shift();lsSet('nutr_log',log);lsSet('nutr_intake',[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);showToast('&#xB77C;&#xC6B4;&#xB4DC; &#xC601;&#xC591; &#xC800;&#xC7A5;!');checkAchievements();showNutrition();};
window._v25ResetNutr=function(){lsSet('nutr_intake',[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);showNutrition();};
function drawNutrCanvas(intake){
var c=document.getElementById('v25-nutr-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=600,H=380;ctx.clearRect(0,0,W,H);
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,W,H);
ctx.fillStyle='rgba(255,123,84,0.03)';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Round Nutrition Tracker',W/2,24);
var L=45,R=W-20,T=45,B=H-35;
var barW=(R-L)/18;
var maxCal=400;
ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.lineWidth=1;
for(var i=0;i<=4;i++){var y=T+(B-T)*(1-i/4);ctx.beginPath();ctx.moveTo(L,y);ctx.lineTo(R,y);ctx.stroke();ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='9px sans-serif';ctx.textAlign='right';ctx.fillText(Math.round(maxCal*i/4)+'kcal',L-4,y+3);}
var cumulative=0;
ctx.strokeStyle='rgba(255,184,0,0.3)';ctx.setLineDash([4,4]);
var idealPerHole=30;
ctx.beginPath();ctx.moveTo(L,B);
for(var i=0;i<18;i++){var x=L+i*barW+barW/2;var idealY=B-(idealPerHole*(i+1))/maxCal*(B-T);ctx.lineTo(x,Math.max(idealY,T));}
ctx.stroke();ctx.setLineDash([]);
for(var i=0;i<18;i++){
var x=L+i*barW;var cal=intake[i];cumulative+=cal;
var bH=cal/maxCal*(B-T);if(bH<0)bH=0;
var color=cal===0?'rgba(255,255,255,0.05)':cal<=120?'#48DBFB80':cal<=200?'#00FF8880':'#FF9F4380';
ctx.fillStyle=color;ctx.fillRect(x+2,B-bH,barW-4,bH);
ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='8px sans-serif';ctx.textAlign='center';
ctx.fillText(''+(i+1),x+barW/2,B+12);
if(cal>0){ctx.fillStyle='#fff';ctx.font='8px sans-serif';ctx.fillText(cal+'',x+barW/2,B-bH-4);}
}
ctx.strokeStyle='#FF7B54';ctx.lineWidth=2;ctx.beginPath();
cumulative=0;
for(var i=0;i<18;i++){
cumulative+=intake[i];var x=L+i*barW+barW/2;var y=B-cumulative/maxCal*(B-T);
if(y<T)y=T;
if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
}
ctx.stroke();
ctx.fillStyle='rgba(255,123,84,0.7)';ctx.font='10px sans-serif';ctx.textAlign='left';
ctx.fillText('● Cumulative kcal',L,H-8);
ctx.fillStyle='rgba(255,184,0,0.5)';ctx.fillText('--- Ideal pace',L+140,H-8);
}

// ===== 6. SWING PLANE ANALYZER Canvas 620x400 =====
var PLANE_PARAMS=['Attack Angle','Swing Path','Face Angle','Lie Angle','Shaft Lean','Hip Rotation','Shoulder Turn','Wrist Hinge'];
function showSwingPlane(){
playSfx('plane_open');
var pn=getPanel('plane');
var vals=lsGet('plane_vals',[0,-1,0,0,4,45,90,90]);
var log=lsGet('plane_log',[]);
var html='<button class="v25-close" onclick="window._v25Close(\'plane\')">&times;</button>';
html+='<div class="v25-title">&#x1F3CC; &#xC2A4;&#xC719; &#xD3C9;&#xBA74; &#xBD84;&#xC11D;&#xAE30;</div>';
html+='<canvas id="v25-plane-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v25-card"><h3>&#xC2A4;&#xC719; &#xD30C;&#xB77C;&#xBBF8;&#xD130; (&deg;)</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">';
var ranges=[[-8,4],[-6,6],[-5,5],[-3,3],[0,10],[30,60],[70,110],[60,120]];
for(var i=0;i<PLANE_PARAMS.length;i++){
html+='<div><label class="v25-label">'+PLANE_PARAMS[i]+' ('+ranges[i][0]+'~'+ranges[i][1]+'&deg;)</label><input class="v25-input" type="number" id="v25-plane-'+i+'" value="'+vals[i]+'" min="'+ranges[i][0]+'" max="'+ranges[i][1]+'" step="0.5"></div>';
}
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
html+='<button class="v25-btn v25-btn-primary" onclick="window._v25AnalyzePlane()">&#x1F4CA; &#xBD84;&#xC11D;</button>';
html+='<button class="v25-btn" onclick="window._v25SavePlane()">&#x1F4BE; &#xC800;&#xC7A5;</button>';
html+='</div></div>';
var grade=calcPlaneGrade(vals);
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v25-stat-card"><div class="v25-stat-val" style="color:'+(grade==='S'?'#00FF88':grade==='A'?'#4ECDC4':grade==='B'?'#FFB800':'#FF6B6B')+'">'+grade+'</div><div class="v25-stat-label">&#xC2A4;&#xC719; &#xB4F1;&#xAE09;</div></div>';
var shotShape=vals[2]>1?'Fade':vals[2]<-1?'Draw':'Straight';
html+='<div class="v25-stat-card"><div class="v25-stat-val" style="color:#FFB800;font-size:13px">'+shotShape+'</div><div class="v25-stat-label">&#xC0F7; &#xC170;&#xC774;&#xD504;</div></div>';
var attackType=vals[0]>0?'Up':vals[0]<-3?'Steep':'Shallow';
html+='<div class="v25-stat-card"><div class="v25-stat-val" style="color:#48DBFB;font-size:13px">'+attackType+'</div><div class="v25-stat-label">&#xC5B4;&#xD0DD;&#xAC01; &#xD0C0;&#xC785;</div></div>';
html+='<div class="v25-stat-card"><div class="v25-stat-val" style="color:#A855F7">'+log.length+'</div><div class="v25-stat-label">&#xBD84;&#xC11D; &#xAE30;&#xB85D;</div></div>';
html+='</div>';
if(log.length>0)html+='<button class="v25-btn" style="width:100%;margin-top:6px;border-color:rgba(255,123,84,.3);color:#FF7B54" onclick="if(confirm(\'&#xCD08;&#xAE30;&#xD654;?\'))window._v25ResetPlane()">&#xCD08;&#xAE30;&#xD654;</button>';
pn.innerHTML=html;openPanel('plane');drawPlaneCanvas(vals,log);
}
function calcPlaneGrade(v){var score=0;if(Math.abs(v[0])<=3)score+=2;if(Math.abs(v[1])<=2)score+=2;if(Math.abs(v[2])<=2)score+=2;if(v[6]>=80&&v[6]<=100)score++;if(v[7]>=80&&v[7]<=100)score++;return score>=7?'S':score>=5?'A':score>=3?'B':'C';}
window._v25AnalyzePlane=function(){playSfx('traj_fire');var vals=[];for(var i=0;i<8;i++){vals.push(parseFloat(document.getElementById('v25-plane-'+i).value)||0);}lsSet('plane_vals',vals);var tips=[];if(vals[0]<-5)tips.push('&#xC5B4;&#xD0DD;&#xAC01; &#xB108;&#xBB34; &#xAC00;&#xD30C;&#xB984; - &#xACF5;&#xC774; &#xB192;&#xC774; &#xB730;');if(vals[1]>3)tips.push('&#xC2A4;&#xC719;&#xD328;&#xC2A4; &#xC678;&#xBD80; - &#xD400; &#xBC1C;&#xC0DD;');if(Math.abs(vals[2])>3)tips.push('&#xD398;&#xC774;&#xC2A4;&#xAC01; &#xC870;&#xC815; &#xD544;&#xC694;');if(tips.length===0)tips.push('&#xC2A4;&#xC719; &#xD3C9;&#xBA74; &#xC591;&#xD638;!');showToast(tips[0]);drawPlaneCanvas(vals,lsGet('plane_log',[]));};
window._v25SavePlane=function(){playSfx('save_v25');var vals=[];for(var i=0;i<8;i++){vals.push(parseFloat(document.getElementById('v25-plane-'+i).value)||0);}lsSet('plane_vals',vals);var log=lsGet('plane_log',[]);log.push({date:todayStr(),vals:vals.slice()});if(log.length>30)log.shift();lsSet('plane_log',log);showToast('&#xC2A4;&#xC719; &#xB370;&#xC774;&#xD130; &#xC800;&#xC7A5;!');checkAchievements();showSwingPlane();};
window._v25ResetPlane=function(){lsSet('plane_log',[]);lsSet('plane_vals',[0,-1,0,0,4,45,90,90]);showSwingPlane();};
function drawPlaneCanvas(vals,log){
var c=document.getElementById('v25-plane-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,W,H);
ctx.fillStyle='rgba(255,123,84,0.03)';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Swing Plane Analysis',W/2,24);
var cx=W/2,cy=H/2+10,radius=130;
for(var ring=1;ring<=5;ring++){
ctx.strokeStyle='rgba(255,255,255,'+(0.05+ring*0.02)+')';ctx.lineWidth=1;
ctx.beginPath();ctx.arc(cx,cy,radius*ring/5,0,Math.PI*2);ctx.stroke();
}
var labels=['Attack','Path','Face','Lie','Lean','Hip','Shoulder','Wrist'];
var normVals=[];
var normRanges=[[0,12],[0,12],[0,10],[0,6],[0,10],[30,60],[70,110],[60,120]];
for(var i=0;i<8;i++){
var range=normRanges[i][1]-normRanges[i][0];
var normalized;
if(i<4){normalized=1-Math.abs(vals[i])/(normRanges[i][1]);}
else{normalized=(vals[i]-normRanges[i][0])/range;}
normVals.push(Math.max(0,Math.min(1,normalized)));
}
ctx.strokeStyle='rgba(0,255,136,0.3)';ctx.lineWidth=1;
ctx.setLineDash([3,3]);
ctx.beginPath();
for(var i=0;i<8;i++){
var angle=Math.PI*2*i/8-Math.PI/2;
var idealR=radius*0.7;
var x=cx+Math.cos(angle)*idealR;var y=cy+Math.sin(angle)*idealR;
if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
}
ctx.closePath();ctx.stroke();ctx.setLineDash([]);
ctx.fillStyle='rgba(0,255,136,0.05)';ctx.fill();
ctx.strokeStyle='#FF7B54';ctx.lineWidth=2.5;ctx.beginPath();
for(var i=0;i<8;i++){
var angle=Math.PI*2*i/8-Math.PI/2;
var r=radius*normVals[i];
var x=cx+Math.cos(angle)*r;var y=cy+Math.sin(angle)*r;
if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
}
ctx.closePath();ctx.stroke();
ctx.fillStyle='rgba(255,123,84,0.15)';ctx.fill();
for(var i=0;i<8;i++){
var angle=Math.PI*2*i/8-Math.PI/2;
var r=radius*normVals[i];
var x=cx+Math.cos(angle)*r;var y=cy+Math.sin(angle)*r;
ctx.fillStyle='#FF7B54';ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.fill();
var lx=cx+Math.cos(angle)*(radius+20);var ly=cy+Math.sin(angle)*(radius+20);
ctx.fillStyle='rgba(255,255,255,0.7)';ctx.font='10px sans-serif';ctx.textAlign='center';
ctx.fillText(labels[i],lx,ly);
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='9px sans-serif';
ctx.fillText(vals[i]+'°',lx,ly+12);
}
ctx.fillStyle='rgba(255,123,84,0.7)';ctx.font='10px sans-serif';ctx.textAlign='left';
ctx.fillText('● Current',10,H-8);
ctx.fillStyle='rgba(0,255,136,0.5)';ctx.fillText('--- Ideal zone',100,H-8);
}

// ===== 7. PEER GROUP COMPARISON Canvas 620x380 =====
var PEER_GROUPS=['Scratch (0)','Single (1-9)','Mid (10-18)','High (19-28)','Beginner (29-36)','Pro Tour'];
var PEER_AXES=['Driving Dist','Driving Acc','GIR%','Putts/Round','Sand Save%','Scramble%'];
var PEER_DATA=[
[280,72,72,29,55,65],
[245,62,55,31,40,50],
[220,52,40,33,30,35],
[195,45,28,35,20,25],
[170,38,18,37,12,15],
[295,68,68,28,58,62]
];
function showPeerComparison(){
playSfx('peer_open');
var pn=getPanel('peer');
var myStats=lsGet('peer_stats',[230,55,45,32,35,40]);
var selPeer=lsGet('peer_sel',1);
var html='<button class="v25-close" onclick="window._v25Close(\'peer\')">&times;</button>';
html+='<div class="v25-title">&#x1F465; &#xD53C;&#xC5B4; &#xADF8;&#xB8F9; &#xBE44;&#xAD50;</div>';
html+='<canvas id="v25-peer-canvas" width="620" height="380" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v25-card"><h3>&#xB0B4; &#xC2A4;&#xD0EF; &#xC785;&#xB825;</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px">';
for(var i=0;i<PEER_AXES.length;i++){
var units=['yd','%','%','putts','%','%'];
html+='<div><label class="v25-label">'+PEER_AXES[i]+'</label><input class="v25-input" type="number" id="v25-peer-'+i+'" value="'+myStats[i]+'" step="1"></div>';
}
html+='</div>';
html+='<div style="margin-top:8px"><label class="v25-label">&#xBE44;&#xAD50; &#xADF8;&#xB8F9;</label>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px">';
for(var i=0;i<PEER_GROUPS.length;i++){
html+='<button class="v25-btn v25-btn-sm'+(i===selPeer?' v25-btn-primary':'')+'" onclick="window._v25SelectPeer('+i+')">'+PEER_GROUPS[i]+'</button>';
}
html+='</div></div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
html+='<button class="v25-btn v25-btn-primary" onclick="window._v25CalcPeer()">&#x1F4CA; &#xBD84;&#xC11D;</button>';
html+='<button class="v25-btn" onclick="window._v25SavePeer()">&#x1F4BE; &#xC800;&#xC7A5;</button>';
html+='</div></div>';
var gaps=[];for(var i=0;i<6;i++){var diff=myStats[i]-PEER_DATA[selPeer][i];if(i===3)diff=-diff;gaps.push(diff);}
var bestIdx=0,worstIdx=0;
for(var i=1;i<6;i++){if(gaps[i]>gaps[bestIdx])bestIdx=i;if(gaps[i]<gaps[worstIdx])worstIdx=i;}
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v25-stat-card"><div class="v25-stat-val" style="color:#00FF88;font-size:12px">'+PEER_AXES[bestIdx]+'</div><div class="v25-stat-label">&#xC6B0;&#xC704; &#xD56D;&#xBAA9;</div></div>';
html+='<div class="v25-stat-card"><div class="v25-stat-val" style="color:#FF6B6B;font-size:12px">'+PEER_AXES[worstIdx]+'</div><div class="v25-stat-label">&#xC5F4;&#xC704; &#xD56D;&#xBAA9;</div></div>';
var peerGrade='C';var posCount=0;for(var i=0;i<6;i++)if(gaps[i]>=0)posCount++;
peerGrade=posCount>=5?'S':posCount>=4?'A':posCount>=2?'B':'C';
html+='<div class="v25-stat-card"><div class="v25-stat-val" style="color:'+(peerGrade==='S'?'#00FF88':'#FFB800')+'">'+peerGrade+'</div><div class="v25-stat-label">vs '+PEER_GROUPS[selPeer]+'</div></div>';
html+='<div class="v25-stat-card"><div class="v25-stat-val" style="color:#A855F7">'+PEER_GROUPS.length+'</div><div class="v25-stat-label">&#xBE44;&#xAD50; &#xADF8;&#xB8F9;</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('peer');drawPeerCanvas(myStats,selPeer);
}
window._v25SelectPeer=function(i){lsSet('peer_sel',i);showPeerComparison();};
window._v25CalcPeer=function(){playSfx('traj_fire');var stats=[];for(var i=0;i<6;i++)stats.push(parseFloat(document.getElementById('v25-peer-'+i).value)||0);lsSet('peer_stats',stats);showPeerComparison();};
window._v25SavePeer=function(){playSfx('save_v25');var stats=[];for(var i=0;i<6;i++)stats.push(parseFloat(document.getElementById('v25-peer-'+i).value)||0);lsSet('peer_stats',stats);var log=lsGet('peer_log',[]);log.push({date:todayStr(),stats:stats.slice()});if(log.length>30)log.shift();lsSet('peer_log',log);showToast('&#xD53C;&#xC5B4; &#xBE44;&#xAD50; &#xC800;&#xC7A5;!');checkAchievements();showPeerComparison();};
function drawPeerCanvas(myStats,selPeer){
var c=document.getElementById('v25-peer-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=380;ctx.clearRect(0,0,W,H);
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,W,H);
ctx.fillStyle='rgba(255,123,84,0.03)';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Peer Comparison: You vs '+PEER_GROUPS[selPeer],W/2,24);
var cx=W/2,cy=H/2+10,radius=120;
for(var ring=1;ring<=5;ring++){ctx.strokeStyle='rgba(255,255,255,'+(0.05+ring*0.02)+')';ctx.lineWidth=1;ctx.beginPath();ctx.arc(cx,cy,radius*ring/5,0,Math.PI*2);ctx.stroke();}
var maxVals=[300,80,80,40,60,70];
var peerNorm=[];var myNorm=[];
for(var i=0;i<6;i++){
if(i===3){peerNorm.push(1-PEER_DATA[selPeer][i]/maxVals[i]);myNorm.push(1-myStats[i]/maxVals[i]);}
else{peerNorm.push(PEER_DATA[selPeer][i]/maxVals[i]);myNorm.push(myStats[i]/maxVals[i]);}
}
ctx.strokeStyle='rgba(78,205,196,0.6)';ctx.lineWidth=2;ctx.setLineDash([4,3]);ctx.beginPath();
for(var i=0;i<6;i++){var angle=Math.PI*2*i/6-Math.PI/2;var r=radius*Math.min(peerNorm[i],1);var x=cx+Math.cos(angle)*r;var y=cy+Math.sin(angle)*r;if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}
ctx.closePath();ctx.stroke();ctx.fillStyle='rgba(78,205,196,0.08)';ctx.fill();ctx.setLineDash([]);
ctx.strokeStyle='#FF7B54';ctx.lineWidth=2.5;ctx.beginPath();
for(var i=0;i<6;i++){var angle=Math.PI*2*i/6-Math.PI/2;var r=radius*Math.min(myNorm[i],1);var x=cx+Math.cos(angle)*r;var y=cy+Math.sin(angle)*r;if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}
ctx.closePath();ctx.stroke();ctx.fillStyle='rgba(255,123,84,0.12)';ctx.fill();
for(var i=0;i<6;i++){
var angle=Math.PI*2*i/6-Math.PI/2;
var r=radius*Math.min(myNorm[i],1);
ctx.fillStyle='#FF7B54';ctx.beginPath();ctx.arc(cx+Math.cos(angle)*r,cy+Math.sin(angle)*r,4,0,Math.PI*2);ctx.fill();
var r2=radius*Math.min(peerNorm[i],1);
ctx.fillStyle='#4ECDC4';ctx.beginPath();ctx.arc(cx+Math.cos(angle)*r2,cy+Math.sin(angle)*r2,3,0,Math.PI*2);ctx.fill();
var lx=cx+Math.cos(angle)*(radius+22);var ly=cy+Math.sin(angle)*(radius+22);
ctx.fillStyle='rgba(255,255,255,0.7)';ctx.font='10px sans-serif';ctx.textAlign='center';
ctx.fillText(PEER_AXES[i],lx,ly);
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='9px sans-serif';
ctx.fillText('You:'+myStats[i]+' / Peer:'+PEER_DATA[selPeer][i],lx,ly+12);
}
ctx.fillStyle='#FF7B54';ctx.font='10px sans-serif';ctx.textAlign='left';ctx.fillText('● You',10,H-8);
ctx.fillStyle='#4ECDC4';ctx.fillText('● '+PEER_GROUPS[selPeer],80,H-8);
}

// ===== 8. ROUND INTELLIGENCE DASHBOARD Canvas 620x400 =====
var INTEL_KPIS=['Driving','Iron Play','Short Game','Putting','Course Mgmt','Mental'];
function showRoundIntel(){
playSfx('intel_open');
var pn=getPanel('intel');
var scores=lsGet('intel_scores',[65,60,55,70,50,60]);
var log=lsGet('intel_log',[]);
var html='<button class="v25-close" onclick="window._v25Close(\'intel\')">&times;</button>';
html+='<div class="v25-title">&#x1F4CA; &#xC885;&#xD569; &#xB77C;&#xC6B4;&#xB4DC; &#xC778;&#xD154;&#xB9AC;&#xC804;&#xC2A4;</div>';
html+='<canvas id="v25-intel-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v25-card"><h3>KPI &#xC810;&#xC218; &#xC785;&#xB825; (0~100)</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px">';
for(var i=0;i<INTEL_KPIS.length;i++){
html+='<div><label class="v25-label">'+INTEL_KPIS[i]+'</label><input class="v25-input" type="range" min="0" max="100" value="'+scores[i]+'" id="v25-intel-'+i+'" oninput="window._v25UpdateIntel('+i+',this.value)"><span id="v25-intv-'+i+'" style="font-size:11px;color:#FF7B54;margin-left:4px">'+scores[i]+'</span></div>';
}
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
html+='<button class="v25-btn v25-btn-primary" onclick="window._v25SaveIntel()">&#x1F4BE; &#xC800;&#xC7A5;</button>';
html+='<button class="v25-btn" onclick="window._v25AnalyzeIntel()">&#x1F50D; &#xBD84;&#xC11D;</button>';
html+='</div></div>';
var avg=0;for(var i=0;i<scores.length;i++)avg+=scores[i];avg=Math.round(avg/scores.length);
var grade=avg>=85?'S':avg>=70?'A':avg>=55?'B':avg>=40?'C':'D';
var minIdx=0;for(var i=1;i<scores.length;i++)if(scores[i]<scores[minIdx])minIdx=i;
var maxIdx=0;for(var i=1;i<scores.length;i++)if(scores[i]>scores[maxIdx])maxIdx=i;
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v25-stat-card"><div class="v25-stat-val" style="color:'+(grade==='S'?'#00FF88':grade==='A'?'#4ECDC4':grade==='B'?'#FFB800':'#FF6B6B')+'">'+grade+'</div><div class="v25-stat-label">&#xC885;&#xD569; &#xB4F1;&#xAE09;</div></div>';
html+='<div class="v25-stat-card"><div class="v25-stat-val" style="color:#FF7B54">'+avg+'</div><div class="v25-stat-label">&#xD3C9;&#xADE0; &#xC810;&#xC218;</div></div>';
html+='<div class="v25-stat-card"><div class="v25-stat-val" style="color:#00FF88;font-size:12px">'+INTEL_KPIS[maxIdx]+'</div><div class="v25-stat-label">&#xAC15;&#xC810;</div></div>';
html+='<div class="v25-stat-card"><div class="v25-stat-val" style="color:#FF6B6B;font-size:12px">'+INTEL_KPIS[minIdx]+'</div><div class="v25-stat-label">&#xAC1C;&#xC120;&#xC810;</div></div>';
html+='</div>';
if(log.length>0)html+='<button class="v25-btn" style="width:100%;margin-top:6px;border-color:rgba(255,123,84,.3);color:#FF7B54" onclick="if(confirm(\'&#xCD08;&#xAE30;&#xD654;?\'))window._v25ResetIntel()">&#xCD08;&#xAE30;&#xD654;</button>';
pn.innerHTML=html;openPanel('intel');drawIntelCanvas(scores,log);
}
window._v25UpdateIntel=function(i,v){var s=lsGet('intel_scores',[65,60,55,70,50,60]);s[i]=parseInt(v);lsSet('intel_scores',s);var el=document.getElementById('v25-intv-'+i);if(el)el.textContent=v;drawIntelCanvas(s,lsGet('intel_log',[]));};
window._v25SaveIntel=function(){playSfx('save_v25');var s=lsGet('intel_scores',[65,60,55,70,50,60]);var log=lsGet('intel_log',[]);log.push({date:todayStr(),scores:s.slice()});if(log.length>30)log.shift();lsSet('intel_log',log);showToast('&#xC778;&#xD154;&#xB9AC;&#xC804;&#xC2A4; &#xC800;&#xC7A5;!');checkAchievements();showRoundIntel();};
window._v25AnalyzeIntel=function(){playSfx('traj_fire');var s=lsGet('intel_scores',[65,60,55,70,50,60]);var minIdx=0;for(var i=1;i<s.length;i++)if(s[i]<s[minIdx])minIdx=i;var tips=[INTEL_KPIS[minIdx]+' &#xAC1C;&#xC120; &#xD544;&#xC694; ('+s[minIdx]+'/100)'];showToast(tips[0]);};
window._v25ResetIntel=function(){lsSet('intel_log',[]);lsSet('intel_scores',[65,60,55,70,50,60]);showRoundIntel();};
function drawIntelCanvas(scores,log){
var c=document.getElementById('v25-intel-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,W,H);
ctx.fillStyle='rgba(255,123,84,0.03)';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Round Intelligence Dashboard',W/2,24);
var cols=3,rows=2;var gaugeW=180,gaugeH=130;
var startX=(W-cols*gaugeW)/2,startY=45;
var GAUGE_COLORS=['#FF6B6B','#FF9F43','#FECA57','#48DBFB','#00FF88','#A855F7'];
for(var i=0;i<6;i++){
var col=i%cols,row=Math.floor(i/cols);
var cx2=startX+col*gaugeW+gaugeW/2;
var cy2=startY+row*(gaugeH+30)+gaugeH-10;
var r=55;
ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.lineWidth=12;
ctx.beginPath();ctx.arc(cx2,cy2,r,Math.PI,0);ctx.stroke();
var pct=scores[i]/100;
var endAngle=Math.PI+pct*Math.PI;
var gaugeColor=scores[i]>=80?'#00FF88':scores[i]>=60?'#4ECDC4':scores[i]>=40?'#FFB800':'#FF6B6B';
ctx.strokeStyle=gaugeColor;ctx.lineWidth=12;
ctx.beginPath();ctx.arc(cx2,cy2,r,Math.PI,endAngle);ctx.stroke();
ctx.fillStyle=gaugeColor;ctx.font='bold 22px sans-serif';ctx.textAlign='center';
ctx.fillText(scores[i],cx2,cy2-8);
ctx.fillStyle='rgba(255,255,255,0.7)';ctx.font='11px sans-serif';
ctx.fillText(INTEL_KPIS[i],cx2,cy2+14);
var grade2=scores[i]>=85?'S':scores[i]>=70?'A':scores[i]>=55?'B':scores[i]>=40?'C':'D';
ctx.fillStyle=gaugeColor+'80';ctx.font='bold 10px sans-serif';
ctx.fillText(grade2,cx2,cy2+28);
}
var avg=0;for(var i=0;i<scores.length;i++)avg+=scores[i];avg=Math.round(avg/scores.length);
var overallGrade=avg>=85?'S':avg>=70?'A':avg>=55?'B':avg>=40?'C':'D';
var overallColor=avg>=85?'#00FF88':avg>=70?'#4ECDC4':avg>=55?'#FFB800':'#FF6B6B';
ctx.fillStyle=overallColor;ctx.font='bold 28px sans-serif';ctx.textAlign='center';
ctx.fillText(overallGrade,W/2,H-45);
ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='12px sans-serif';
ctx.fillText('Overall: '+avg+'/100',W/2,H-25);
if(log.length>1){
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='9px sans-serif';ctx.textAlign='right';
var prev=log[log.length-1].scores;var prevAvg=0;for(var i=0;i<prev.length;i++)prevAvg+=prev[i];prevAvg=Math.round(prevAvg/prev.length);
var diff=avg-prevAvg;
ctx.fillText('vs Last: '+(diff>=0?'+':'')+diff,W-20,H-10);
}
}

// ===== QUIZ V25 =====
var QUIZ_V25=[
{q:'&#xBC14;&#xB78C;&#xC774; &#xB4DC;&#xB77C;&#xC774;&#xBC84; &#xC0F7;&#xC5D0; &#xBBF8;&#xCE58;&#xB294; &#xC601;&#xD5A5;&#xC73C;&#xB85C; &#xAC00;&#xC7A5; &#xD070; &#xAC83;&#xC740;?',a:['&#xCE90;&#xB9AC; &#xAC70;&#xB9AC; &#xBCC0;&#xD654;','&#xBC31;&#xC2A4;&#xD540; &#xBCC0;&#xD654;','&#xADF8;&#xB9BD; &#xC555;&#xB825; &#xBCC0;&#xD654;','&#xB85C;&#xD504;&#xD2B8; &#xAC01;&#xB3C4; &#xBCC0;&#xD654;'],c:0},
{q:'&#xC0F7; &#xADA4;&#xC801;&#xC5D0;&#xC11C; Apex&#xB780;?',a:['&#xACF5;&#xC758; &#xCD5C;&#xACE0;&#xC810;','&#xACF5;&#xC758; &#xCC29;&#xC9C0;&#xC810;','&#xACF5;&#xC758; &#xBC1C;&#xC0AC;&#xC810;','&#xACF5;&#xC758; &#xB864; &#xAC70;&#xB9AC;'],c:0},
{q:'&#xD5E4;&#xB4DC;&#xC2A4;&#xD53C;&#xB4DC; 100mph &#xB4DC;&#xB77C;&#xC774;&#xBC84;&#xC758; &#xC608;&#xC0C1; &#xCE90;&#xB9AC; &#xAC70;&#xB9AC;&#xB294;?',a:['180-200yd','210-230yd','230-250yd','260-280yd'],c:2},
{q:'&#xD074;&#xB7FD; &#xADF8;&#xB8E8;&#xBE0C;&#xAC00; &#xB9C8;&#xBAA8;&#xB418;&#xBA74; &#xC5B4;&#xB5A4; &#xC601;&#xD5A5;&#xC774; &#xC788;&#xB098;?',a:['&#xBE44;&#xAC70;&#xB9AC; &#xC99D;&#xAC00;','&#xC2A4;&#xD540;&#xB7C9; &#xAC10;&#xC18C;','&#xC0F7; &#xC815;&#xD655;&#xB3C4; &#xC99D;&#xAC00;','&#xBCFC; &#xC2A4;&#xD53C;&#xB4DC; &#xC99D;&#xAC00;'],c:1},
{q:'&#xB9DE;&#xBC14;&#xB78C; 10mph&#xC77C; &#xB54C; &#xB4DC;&#xB77C;&#xC774;&#xBC84; &#xBE44;&#xAC70;&#xB9AC; &#xAC10;&#xC18C;&#xB294; &#xC57D;?',a:['5-8yd','10-15yd','15-20yd','20-30yd'],c:1},
{q:'Attack Angle&#xC774; &#xB108;&#xBB34; &#xAC00;&#xD30C;&#xB974;&#xBA74; (steep) &#xBC1C;&#xC0DD;&#xD558;&#xB294; &#xBB38;&#xC81C;&#xB294;?',a:['&#xACF5;&#xC774; &#xB108;&#xBB34; &#xB0AE;&#xAC8C; &#xB0A0;&#xC544;&#xAC10;','&#xACF5;&#xC774; &#xB108;&#xBB34; &#xB192;&#xAC8C; &#xB730;','&#xACF5;&#xC774; &#xC624;&#xB978;&#xCABD;&#xC73C;&#xB85C; &#xD718;&#xC5B4;&#xC9D0;','&#xACF5;&#xC774; &#xB9CE;&#xC774; &#xAD6C;&#xB984;'],c:1},
{q:'Scramble%&#xB780; &#xBB34;&#xC5C7;&#xC744; &#xCE21;&#xC815;&#xD558;&#xB294; &#xC9C0;&#xD45C;&#xC778;&#xAC00;?',a:['GIR &#xC131;&#xACF5;&#xB960;','&#xD398;&#xC5B4;&#xC6E8;&#xC774; &#xC548;&#xCC29;&#xB960;','GIR &#xC2E4;&#xD328; &#xD6C4; &#xD30C; &#xC138;&#xC774;&#xBE0C; &#xBE44;&#xC728;','&#xD37C;&#xD305; &#xC131;&#xACF5;&#xB960;'],c:2},
{q:'&#xB77C;&#xC6B4;&#xB4DC; &#xC911; &#xC601;&#xC591; &#xC12D;&#xCDE8; &#xAD8C;&#xC7A5; &#xCE7C;&#xB85C;&#xB9AC;&#xB294;?',a:['200-300kcal','400-600kcal','800-1000kcal','1200-1500kcal'],c:1},
{q:'Swing Path&#xAC00; Inside-Out&#xC774;&#xBA74; &#xC5B4;&#xB5A4; &#xC0F7;&#xC774; &#xB098;&#xC624;&#xB098;?',a:['&#xD398;&#xC774;&#xB4DC;','&#xB4DC;&#xB85C;&#xC6B0;','&#xC2A4;&#xD2B8;&#xB808;&#xC774;&#xD2B8;','&#xD480;'],c:1},
{q:'Par 5&#xC5D0;&#xC11C; &#xB808;&#xC774;&#xC5C5; &#xC804;&#xB7B5;&#xC774;&#xB780;?',a:['&#xD55C; &#xBC88;&#xC5D0; &#xADF8;&#xB9B0;&#xC744; &#xACF5;&#xB7B5;&#xD558;&#xB294; &#xAC83;','&#xADF8;&#xB9B0; &#xC55E;&#xC5D0; &#xB193;&#xACE0; &#xC5B4;&#xD504;&#xB85C;&#xCE58;&#xD558;&#xB294; &#xAC83;','&#xC548;&#xC804;&#xD55C; &#xD074;&#xB7FD;&#xB9CC; &#xC0AC;&#xC6A9;&#xD558;&#xB294; &#xAC83;','&#xB4DC;&#xB77C;&#xC774;&#xBC84;&#xB85C;&#xB9CC; &#xCE58;&#xB294; &#xAC83;'],c:1},
{q:'Single &#xD578;&#xB514;&#xCE95;(1-9) &#xACE8;&#xD37C;&#xC758; &#xD3C9;&#xADE0; &#xB4DC;&#xB77C;&#xC774;&#xBE59; &#xAC70;&#xB9AC;&#xB294;?',a:['200-220yd','225-245yd','245-265yd','265-285yd'],c:1},
{q:'Face Angle&#xC774; &#xC5F4;&#xB9B0; (open) &#xC0C1;&#xD0DC;&#xC5D0;&#xC11C; &#xC784;&#xD329;&#xD2B8;&#xD558;&#xBA74;?',a:['&#xD6C5;&#xC774; &#xBC1C;&#xC0DD;','&#xC2AC;&#xB77C;&#xC774;&#xC2A4;&#xAC00; &#xBC1C;&#xC0DD;','&#xD1B1;&#xC0F7;&#xC774; &#xBC1C;&#xC0DD;','&#xC2A4;&#xCFFC;&#xC5B4; &#xC0F7;&#xC774; &#xBC1C;&#xC0DD;'],c:1},
{q:'&#xD6A1;&#xBC14;&#xB78C;(crosswind) 10mph&#xC77C; &#xB54C; &#xBCFC;&#xC774; &#xD718;&#xC5B4;&#xC9C0;&#xB294; &#xAC70;&#xB9AC;&#xB294; &#xC57D;?',a:['2-3yd','5-8yd','10-15yd','20-25yd'],c:1},
{q:'&#xD074;&#xB7FD; &#xC0E4;&#xD504;&#xD2B8;&#xC758; &#xAD8C;&#xC7A5; &#xAD50;&#xCCB4; &#xC8FC;&#xAE30;&#xB294;?',a:['6&#xAC1C;&#xC6D4;','1-2&#xB144;','3-5&#xB144;','10&#xB144; &#xC774;&#xC0C1;'],c:2},
{q:'&#xB77C;&#xC6B4;&#xB4DC; &#xC778;&#xD154;&#xB9AC;&#xC804;&#xC2A4;&#xC5D0;&#xC11C; &#xAC00;&#xC7A5; &#xC911;&#xC694;&#xD55C; &#xC694;&#xC18C;&#xB294;?',a:['&#xBE44;&#xAC70;&#xB9AC;','&#xCF54;&#xC2A4; &#xB9E4;&#xB2C8;&#xC9C0;&#xBA3C;&#xD2B8;','&#xD37C;&#xD305; &#xC2A4;&#xD53C;&#xB4DC;','&#xC7A5;&#xBE44; &#xBE0C;&#xB79C;&#xB4DC;'],c:1}
];
var quizState={idx:0,score:0,total:0,answered:false};
function showQuizV25(){
playSfx('nav_v25');
var pn=getPanel('quizv25');
var idx=quizState.idx;
var q=QUIZ_V25[idx%QUIZ_V25.length];
var html='<button class="v25-close" onclick="window._v25Close(\'quizv25\')">&times;</button>';
html+='<div class="v25-title">&#x1F4DA; Golf Quiz v25 (Q'+(idx+1)+'/'+QUIZ_V25.length+')</div>';
html+='<div class="v25-card"><h3>'+q.q+'</h3>';
for(var i=0;i<q.a.length;i++){
html+='<button class="v25-btn" style="width:100%;margin:3px 0;text-align:left" onclick="window._v25AnswerQuiz('+i+','+q.c+')">'+String.fromCharCode(65+i)+'. '+q.a[i]+'</button>';
}
html+='</div>';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v25-stat-card"><div class="v25-stat-val" style="color:#00FF88">'+quizState.score+'</div><div class="v25-stat-label">&#xC815;&#xB2F5;</div></div>';
html+='<div class="v25-stat-card"><div class="v25-stat-val" style="color:#FF6B6B">'+(quizState.total-quizState.score)+'</div><div class="v25-stat-label">&#xC624;&#xB2F5;</div></div>';
var pct=quizState.total>0?Math.round(quizState.score*100/quizState.total):0;
html+='<div class="v25-stat-card"><div class="v25-stat-val" style="color:#FFB800">'+pct+'%</div><div class="v25-stat-label">&#xC815;&#xB2F5;&#xB960;</div></div>';
html+='<div class="v25-stat-card"><div class="v25-stat-val" style="color:#A855F7">'+(idx+1)+'/'+QUIZ_V25.length+'</div><div class="v25-stat-label">&#xC9C4;&#xD589;</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('quizv25');
}
window._v25AnswerQuiz=function(sel,correct){
if(quizState.answered)return;quizState.answered=true;quizState.total++;
if(sel===correct){quizState.score++;playSfx('quiz_correct_v25');showToast('&#xC815;&#xB2F5;!');}
else{playSfx('quiz_wrong_v25');showToast('&#xC624;&#xB2F5;! &#xC815;&#xB2F5;: '+String.fromCharCode(65+correct));}
lsSet('quiz_v25_score',quizState.score);lsSet('quiz_v25_total',quizState.total);
setTimeout(function(){quizState.answered=false;quizState.idx++;if(quizState.idx>=QUIZ_V25.length)quizState.idx=0;checkAchievements();showQuizV25();},1200);
};

// ===== ACHIEVEMENTS =====
var ACHIEVEMENTS_V25=[
{id:'traj_explorer',name:'Trajectory Explorer',desc:'&#xADA4;&#xC801; 10&#xD68C; &#xBC1C;&#xC0AC;',check:function(){return lsGet('traj_log',[]).length>=10}},
{id:'wind_master',name:'Wind Master',desc:'&#xBC14;&#xB78C; 10&#xD68C; &#xAE30;&#xB85D;',check:function(){return lsGet('wind_log',[]).length>=10}},
{id:'lifecycle_mgr',name:'Lifecycle Manager',desc:'&#xD074;&#xB7FD; 5&#xAC1C; &#xB4F1;&#xB85D;',check:function(){return Object.keys(lsGet('lifecycle_data',{})).length>=5}},
{id:'strategist',name:'Course Strategist',desc:'&#xC804;&#xB7B5; 8&#xD640; &#xBA54;&#xBAA8;',check:function(){return lsGet('strat_log',[]).length>=8}},
{id:'nutrition_pro',name:'Nutrition Pro',desc:'&#xC601;&#xC591; 5&#xB77C;&#xC6B4;&#xB4DC; &#xAE30;&#xB85D;',check:function(){return lsGet('nutr_log',[]).length>=5}},
{id:'plane_analyst',name:'Swing Plane Analyst',desc:'&#xC2A4;&#xC719; 5&#xD68C; &#xBD84;&#xC11D;',check:function(){return lsGet('plane_log',[]).length>=5}},
{id:'peer_tracker',name:'Peer Tracker',desc:'&#xD53C;&#xC5B4; &#xBE44;&#xAD50; 3&#xD68C;',check:function(){return lsGet('peer_log',[]).length>=3}},
{id:'intel_evaluator',name:'Intel Evaluator',desc:'&#xC778;&#xD154;&#xB9AC;&#xC804;&#xC2A4; 5&#xD68C;',check:function(){return lsGet('intel_log',[]).length>=5}},
{id:'quiz_v25_master',name:'Quiz v25 Master',desc:'v25 &#xD038;&#xC988; &#xC804;&#xBB38; &#xC815;&#xB2F5;',check:function(){return lsGet('quiz_v25_score',0)>=15}},
{id:'quiz_v25_clear',name:'Quiz v25 Clear',desc:'v25 &#xD038;&#xC988; &#xC644;&#xC8FC;',check:function(){return lsGet('quiz_v25_total',0)>=15}},
{id:'traj_s_grade',name:'Trajectory S Grade',desc:'&#xADA4;&#xC801; S&#xB4F1;&#xAE09; &#xD68D;&#xB4DD;',check:function(){var log=lsGet('traj_log',[]);for(var i=0;i<log.length;i++){var cl=TRAJ_CLUBS[log[i].club];if(log[i].carry>=cl.carry*0.95&&log[i].carry<=cl.carry*1.1)return true;}return false}},
{id:'v25_complete',name:'v25 Complete',desc:'v25 &#xC804;&#xCCB4; &#xAE30;&#xB2A5; &#xD0D0;&#xC0C9;',check:function(){return lsGet('v25_explored',0)>=8}}
];
function checkAchievements(){
var unlocked=lsGet('achievements_v25',[]);
for(var i=0;i<ACHIEVEMENTS_V25.length;i++){
var a=ACHIEVEMENTS_V25[i];
if(unlocked.indexOf(a.id)===-1&&a.check()){
unlocked.push(a.id);lsSet('achievements_v25',unlocked);
playSfx('achieve_v25');showToast('🏆 '+a.name+' unlocked!');
}
}
}
var explored=lsGet('v25_explored',0);
function markExplored(){explored++;lsSet('v25_explored',explored);}

// ===== CSS =====
var style=document.createElement('style');
style.textContent='.v25-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:10020;display:none;align-items:center;justify-content:center;padding:16px;overflow-y:auto}.v25-overlay.active{display:flex}.v25-panel{background:#14141a;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:20px;max-width:660px;width:100%;max-height:90vh;overflow-y:auto;position:relative}.v25-close{position:absolute;top:12px;right:12px;background:none;border:none;color:#fff;font-size:24px;cursor:pointer;z-index:2;opacity:0.7}.v25-close:hover{opacity:1}.v25-title{font-size:18px;font-weight:bold;color:#fff;margin-bottom:12px;text-align:center}.v25-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;margin:8px 0}.v25-card h3{font-size:13px;color:rgba(255,255,255,0.7);margin-bottom:6px}.v25-label{font-size:10px;color:rgba(255,255,255,0.5);display:block;margin-bottom:2px}.v25-input{width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:6px;color:#fff;padding:6px 8px;font-size:12px;outline:none;box-sizing:border-box}.v25-input:focus{border-color:#FF7B54}.v25-btn{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);border-radius:8px;color:#fff;padding:8px 12px;font-size:12px;cursor:pointer;transition:all 0.2s}.v25-btn:hover{background:rgba(255,255,255,0.12)}.v25-btn-primary{background:rgba(255,123,84,0.15);border-color:rgba(255,123,84,0.3);color:#FF7B54}.v25-btn-primary:hover{background:rgba(255,123,84,0.25)}.v25-btn-sm{padding:6px 8px;font-size:11px}.v25-stat-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:10px;text-align:center}.v25-stat-val{font-size:18px;font-weight:bold}.v25-stat-label{font-size:9px;color:rgba(255,255,255,0.5);margin-top:2px}.v25-toast{position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(20px);background:rgba(255,123,84,0.15);border:1px solid rgba(255,123,84,0.3);color:#FF7B54;padding:10px 20px;border-radius:10px;font-size:13px;z-index:10030;opacity:0;transition:all 0.3s}.v25-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}';
document.head.appendChild(style);

// ===== NAVIGATION =====
window._v25Close=function(id){closePanel(id);};
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
{label:'Trajectory',fn:showTrajectory,icon:'&#x1F3CC;'},
{label:'WindMtx',fn:showWindMatrix,icon:'&#x1F32C;'},
{label:'ClubLife',fn:showClubLifecycle,icon:'&#x1F527;'},
{label:'Strategy',fn:showCourseStrategy,icon:'&#x1F5FA;'},
{label:'Nutrition',fn:showNutrition,icon:'&#x1F34F;'},
{label:'SwingPlane',fn:showSwingPlane,icon:'&#x1F3AF;'},
{label:'PeerComp',fn:showPeerComparison,icon:'&#x1F465;'},
{label:'RoundIQ',fn:showRoundIntel,icon:'&#x1F4CA;'},
{label:'Quiz25',fn:showQuizV25,icon:'&#x1F4DA;'}
];
for(var i=0;i<btns.length;i++){
(function(b){
var btn=document.createElement('button');
btn.innerHTML=b.icon+'<br><span style="font-size:8px">'+b.label+'</span>';
btn.style.cssText='background:rgba(255,123,84,0.12);border:1px solid rgba(255,123,84,0.25);border-radius:8px;color:#FF7B54;padding:6px 4px;font-size:12px;cursor:pointer;min-width:44px;flex:0 0 auto;margin:2px';
btn.addEventListener('click',function(){b.fn();markExplored();});
nav.appendChild(btn);
})(btns[i]);
}
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown',function(e){
if(!e.shiftKey)return;
switch(e.key){
case'Q':case'q':showTrajectory();markExplored();break;
case'W':case'w':showWindMatrix();markExplored();break;
case'E':case'e':showClubLifecycle();markExplored();break;
case'R':case'r':showCourseStrategy();markExplored();break;
case'T':case't':showNutrition();markExplored();break;
case'Y':case'y':showSwingPlane();markExplored();break;
case'U':case'u':showPeerComparison();markExplored();break;
case'I':case'i':showRoundIntel();markExplored();break;
case'0':showQuizV25();markExplored();break;
}
});

// ===== INIT =====
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',addNavButtons);}
else{setTimeout(addNavButtons,1800);}
setTimeout(checkAchievements,3500);
})();
