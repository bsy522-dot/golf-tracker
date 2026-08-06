(function(){
'use strict';
var LS='gt_v26_';
var audioCtx=null;
function getAC(){if(!audioCtx)try{audioCtx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}return audioCtx}
function playSfx(type){var ac=getAC();if(!ac)return;var o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);var t=ac.currentTime;g.gain.setValueAtTime(0.1,t);switch(type){case'tempo_open':o.type='sine';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(659,t+0.05);o.frequency.linearRampToValueAtTime(784,t+0.1);o.frequency.linearRampToValueAtTime(1047,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'stroke_open':o.type='sine';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(554,t+0.06);o.frequency.linearRampToValueAtTime(698,t+0.12);g.gain.exponentialRampToValueAtTime(0.01,t+0.26);o.start(t);o.stop(t+0.26);break;case'mental_open':o.type='sine';o.frequency.setValueAtTime(392,t);o.frequency.linearRampToValueAtTime(494,t+0.07);o.frequency.linearRampToValueAtTime(587,t+0.14);g.gain.exponentialRampToValueAtTime(0.01,t+0.28);o.start(t);o.stop(t+0.28);break;case'course_open':o.type='sine';o.frequency.setValueAtTime(466,t);o.frequency.linearRampToValueAtTime(587,t+0.05);o.frequency.linearRampToValueAtTime(740,t+0.1);o.frequency.linearRampToValueAtTime(880,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.32);o.start(t);o.stop(t+0.32);break;case'equip_open':o.type='sine';o.frequency.setValueAtTime(349,t);o.frequency.linearRampToValueAtTime(440,t+0.06);o.frequency.linearRampToValueAtTime(554,t+0.12);g.gain.exponentialRampToValueAtTime(0.01,t+0.25);o.start(t);o.stop(t+0.25);break;case'score_open':o.type='sine';o.frequency.setValueAtTime(587,t);o.frequency.linearRampToValueAtTime(740,t+0.05);o.frequency.linearRampToValueAtTime(880,t+0.1);o.frequency.linearRampToValueAtTime(1047,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'weather_open':o.type='sine';o.frequency.setValueAtTime(415,t);o.frequency.linearRampToValueAtTime(523,t+0.06);o.frequency.linearRampToValueAtTime(659,t+0.12);g.gain.exponentialRampToValueAtTime(0.01,t+0.26);o.start(t);o.stop(t+0.26);break;case'dash_open':o.type='sine';o.frequency.setValueAtTime(659,t);o.frequency.linearRampToValueAtTime(831,t+0.05);o.frequency.linearRampToValueAtTime(988,t+0.1);o.frequency.linearRampToValueAtTime(1175,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.32);o.start(t);o.stop(t+0.32);break;case'quiz_correct_v26':o.type='sine';o.frequency.setValueAtTime(880,t);o.frequency.setValueAtTime(1109,t+0.08);o.frequency.setValueAtTime(1319,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'quiz_wrong_v26':o.type='sawtooth';o.frequency.setValueAtTime(311,t);o.frequency.linearRampToValueAtTime(233,t+0.2);g.gain.setValueAtTime(0.06,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'achieve_v26':o.type='sine';o.frequency.setValueAtTime(1109,t);o.frequency.setValueAtTime(1319,t+0.1);o.frequency.setValueAtTime(1568,t+0.2);o.frequency.setValueAtTime(1976,t+0.3);g.gain.exponentialRampToValueAtTime(0.01,t+0.5);o.start(t);o.stop(t+0.5);break;case'nav_v26':o.type='sine';o.frequency.setValueAtTime(831,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.08);o.start(t);o.stop(t+0.08);break;case'save_v26':o.type='triangle';o.frequency.setValueAtTime(622,t);o.frequency.linearRampToValueAtTime(932,t+0.1);g.gain.exponentialRampToValueAtTime(0.01,t+0.2);o.start(t);o.stop(t+0.2);break;case'hover_v26':o.type='sine';o.frequency.setValueAtTime(1175,t);g.gain.setValueAtTime(0.04,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.05);o.start(t);o.stop(t+0.05);break;case'reset_v26':o.type='square';o.frequency.setValueAtTime(370,t);o.frequency.linearRampToValueAtTime(247,t+0.15);g.gain.setValueAtTime(0.05,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.25);o.start(t);o.stop(t+0.25);break;default:o.type='sine';o.frequency.setValueAtTime(440,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.15);o.start(t);o.stop(t+0.15)}}

function lsGet(k,d){try{var v=localStorage.getItem(LS+k);return v?JSON.parse(v):d}catch(e){return d}}
function lsSet(k,v){try{localStorage.setItem(LS+k,JSON.stringify(v))}catch(e){}}
function todayStr(){return new Date().toISOString().slice(0,10)}
function showToast(msg){var t=document.createElement('div');t.className='v26-toast';t.textContent=msg;document.body.appendChild(t);setTimeout(function(){t.classList.add('show')},50);setTimeout(function(){t.classList.remove('show');setTimeout(function(){t.remove()},400)},3000)}
function createOverlay(id){var ov=document.createElement('div');ov.className='v26-overlay';ov.id='v26-'+id;ov.addEventListener('click',function(e){if(e.target===ov)closePanel(id)});var pn=document.createElement('div');pn.className='v26-panel';pn.style.position='relative';ov.appendChild(pn);return pn}
function openPanel(id){var el=document.getElementById('v26-'+id);if(el)el.classList.add('active')}
function closePanel(id){var el=document.getElementById('v26-'+id);if(el)el.classList.remove('active')}
function getPanel(id){var ov=document.getElementById('v26-'+id);if(!ov){var pn=createOverlay(id);pn.id='v26-'+id+'-panel';document.body.appendChild(pn.parentElement);return pn}return ov.querySelector('.v26-panel')||ov}

// ===== 1. SHOT TEMPO ANALYZER Canvas 620x400 =====
var TEMPO_PHASES=['Address','Takeaway','Backswing','Transition','Downswing','Impact','Follow-thru','Finish'];
var TEMPO_IDEAL=[1.2,0.8,0.6,0.15,0.25,0.03,0.4,0.5];
var TEMPO_COLORS=['#FF6B6B','#FF9F43','#FECA57','#48DBFB','#00FF88','#A855F7','#FF85A2','#4ECDC4'];
function showTempoAnalyzer(){
playSfx('tempo_open');
var pn=getPanel('tempo');
var log=lsGet('tempo_log',[]);
var selClub=lsGet('tempo_club',0);
var clubNames=['Driver','3W','5I','7I','PW','SW'];
var html='<button class="v26-close" onclick="window._v26Close(\'tempo\')">&times;</button>';
html+='<div class="v26-title">&#x23F1; &#xC2A4;&#xC719; &#xD15C;&#xD3EC; &#xBD84;&#xC11D;&#xAE30;</div>';
html+='<canvas id="v26-tempo-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v26-card"><h3>&#xD074;&#xB7FD; &#xC120;&#xD0DD; &amp; &#xD15C;&#xD3EC; &#xCE21;&#xC815;</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:4px;margin-bottom:8px">';
for(var i=0;i<clubNames.length;i++){
html+='<button class="v26-btn v26-btn-sm'+(i===selClub?' v26-btn-primary':'')+'" onclick="window._v26SelectTempoClub('+i+')">'+clubNames[i]+'</button>';
}
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">';
html+='<div><label class="v26-label">&#xBC31;&#xC2A4;&#xC719; &#xBE44;&#xC728; (&#xBC31;:&#xB2E4;&#xC6B4;)</label><input class="v26-input" type="text" id="v26-tempo-ratio" value="3:1" placeholder="3:1"></div>';
html+='<div><label class="v26-label">&#xCD1D; &#xC2A4;&#xC719; &#xC2DC;&#xAC04; (&#xCD08;)</label><input class="v26-input" type="number" id="v26-tempo-total" value="1.2" step="0.1" min="0.5" max="3"></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
html+='<button class="v26-btn v26-btn-primary" onclick="window._v26RecordTempo()">&#x23FA; &#xAE30;&#xB85D;</button>';
html+='<button class="v26-btn" onclick="window._v26SaveTempo()">&#x1F4BE; &#xC800;&#xC7A5;</button>';
html+='</div></div>';
var avgRatio=3.0;if(log.length>0){var sum=0;for(var i=0;i<log.length;i++)sum+=log[i].ratio;avgRatio=Math.round(sum/log.length*10)/10;}
var grade=avgRatio>=2.8&&avgRatio<=3.2?'S':avgRatio>=2.5&&avgRatio<=3.5?'A':avgRatio>=2.0&&avgRatio<=4.0?'B':'C';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v26-stat-card"><div class="v26-stat-val" style="color:#00FF88">'+avgRatio+':1</div><div class="v26-stat-label">&#xD3C9;&#xADE0; &#xBE44;&#xC728;</div></div>';
html+='<div class="v26-stat-card"><div class="v26-stat-val" style="color:#FFB800">'+grade+'</div><div class="v26-stat-label">&#xD15C;&#xD3EC; &#xB4F1;&#xAE09;</div></div>';
html+='<div class="v26-stat-card"><div class="v26-stat-val" style="color:#4ECDC4">'+log.length+'</div><div class="v26-stat-label">&#xCE21;&#xC815; &#xD69F;&#xC218;</div></div>';
html+='<div class="v26-stat-card"><div class="v26-stat-val" style="color:#A855F7">3:1</div><div class="v26-stat-label">&#xC774;&#xC0C1;&#xC801; &#xBE44;&#xC728;</div></div>';
html+='</div>';
if(log.length>0)html+='<button class="v26-btn" style="width:100%;margin-top:6px;border-color:rgba(0,212,180,.3);color:#00D4B4" onclick="if(confirm(\'&#xCD08;&#xAE30;&#xD654;?\'))window._v26ResetTempo()">&#xCD08;&#xAE30;&#xD654;</button>';
pn.innerHTML=html;openPanel('tempo');drawTempoCanvas(log);
}
window._v26SelectTempoClub=function(i){lsSet('tempo_club',i);showTempoAnalyzer();};
window._v26RecordTempo=function(){
var ratio=document.getElementById('v26-tempo-ratio').value||'3:1';
var parts=ratio.split(':');var back=parseFloat(parts[0])||3;var down=parseFloat(parts[1])||1;
var r=Math.round(back/down*10)/10;
var total=parseFloat(document.getElementById('v26-tempo-total').value)||1.2;
var club=lsGet('tempo_club',0);
var log=lsGet('tempo_log',[]);
log.push({date:todayStr(),club:club,ratio:r,total:total});
if(log.length>50)log.shift();
lsSet('tempo_log',log);
playSfx('save_v26');showToast('Tempo '+r+':1 recorded!');checkAchievements();showTempoAnalyzer();
};
window._v26SaveTempo=function(){window._v26RecordTempo();};
window._v26ResetTempo=function(){lsSet('tempo_log',[]);showTempoAnalyzer();};
function drawTempoCanvas(log){
var c=document.getElementById('v26-tempo-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);
var grd=ctx.createLinearGradient(0,0,0,H);grd.addColorStop(0,'#0f1729');grd.addColorStop(1,'#1a1a2e');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Swing Tempo Phase Breakdown',W/2,24);
var L=60,R=W-30,B=H-50,T=50;
var maxT=2.0;
ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.lineWidth=1;
for(var i=0;i<=4;i++){var y=B-(B-T)*i/4;ctx.beginPath();ctx.moveTo(L,y);ctx.lineTo(R,y);ctx.stroke();ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='9px sans-serif';ctx.textAlign='right';ctx.fillText((maxT*i/4).toFixed(1)+'s',L-6,y+3);}
var bw=(R-L)/TEMPO_PHASES.length;
for(var i=0;i<TEMPO_PHASES.length;i++){
var x=L+bw*i+bw*0.15;var w=bw*0.35;
var idealH=(TEMPO_IDEAL[i]/maxT)*(B-T);
ctx.fillStyle=TEMPO_COLORS[i]+'40';ctx.fillRect(x,B-idealH,w,idealH);
ctx.strokeStyle=TEMPO_COLORS[i];ctx.lineWidth=1;ctx.strokeRect(x,B-idealH,w,idealH);
if(log.length>0){
var last=log[log.length-1];
var totalTime=last.total;var ratioFactor=last.ratio/3.0;
var phaseTime=TEMPO_IDEAL[i]*(i<3?ratioFactor:i===3?1:i<6?1/ratioFactor:1);
var actH=(phaseTime/maxT)*(B-T);
var x2=x+w+2;
ctx.fillStyle=TEMPO_COLORS[i];ctx.fillRect(x2,B-actH,w,actH);
}
ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='8px sans-serif';ctx.textAlign='center';
ctx.save();ctx.translate(L+bw*i+bw/2,B+12);ctx.fillText(TEMPO_PHASES[i],0,0);ctx.restore();
ctx.fillStyle=TEMPO_COLORS[i];ctx.font='bold 9px sans-serif';
ctx.fillText(TEMPO_IDEAL[i].toFixed(2)+'s',L+bw*i+bw/2,B-idealH-6);
}
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='10px sans-serif';ctx.textAlign='left';
ctx.fillRect(L,H-25,10,10);ctx.fillStyle='rgba(255,255,255,0.5)';ctx.fillText('Ideal',L+14,H-16);
if(log.length>0){ctx.fillStyle=TEMPO_COLORS[0];ctx.fillRect(L+60,H-25,10,10);ctx.fillStyle='rgba(255,255,255,0.5)';ctx.fillText('Actual',L+74,H-16);}
if(log.length>3){
ctx.strokeStyle='#FFB800';ctx.lineWidth=2;ctx.setLineDash([4,3]);ctx.beginPath();
var startIdx=Math.max(0,log.length-10);
for(var i=startIdx;i<log.length;i++){
var x=R-60+(i-startIdx)*6;var y=B-(log[i].ratio/5)*(B-T);
if(i===startIdx)ctx.moveTo(x,y);else ctx.lineTo(x,y);
}
ctx.stroke();ctx.setLineDash([]);
ctx.fillStyle='#FFB800';ctx.font='9px sans-serif';ctx.textAlign='center';
ctx.fillText('Ratio Trend',R-30,T+10);
}
}

// ===== 2. STROKES GAINED DEEP DIVE Canvas 640x400 =====
var SG_CATEGORIES=['Off Tee','Approach','Around Green','Putting','Recovery','Penalty'];
var SG_COLORS=['#FF6B6B','#FF9F43','#00FF88','#48DBFB','#A855F7','#FF85A2'];
var SG_BENCH=[0.5,0.3,0.2,0.1,-0.1,-0.3];
function showStrokesGained(){
playSfx('stroke_open');
var pn=getPanel('sgdeep');
var log=lsGet('sg_deep_log',[]);
var html='<button class="v26-close" onclick="window._v26Close(\'sgdeep\')">&times;</button>';
html+='<div class="v26-title">&#x1F4C9; &#xC2A4;&#xD2B8;&#xB85C;&#xD06C; &#xAC8C;&#xC778;&#xB4DC; &#xB525; &#xB2E4;&#xC774;&#xBE0C;</div>';
html+='<canvas id="v26-sg-canvas" width="640" height="400" style="width:100%;max-width:640px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v26-card"><h3>&#xB77C;&#xC6B4;&#xB4DC; SG &#xC785;&#xB825;</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px">';
for(var i=0;i<SG_CATEGORIES.length;i++){
html+='<div><label class="v26-label" style="color:'+SG_COLORS[i]+'">'+SG_CATEGORIES[i]+'</label><input class="v26-input" type="number" id="v26-sg-'+i+'" value="0" step="0.1" min="-5" max="5"></div>';
}
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
html+='<button class="v26-btn v26-btn-primary" onclick="window._v26SaveSG()">&#x1F4BE; &#xC800;&#xC7A5;</button>';
html+='<button class="v26-btn" onclick="window._v26SimulateSG()">&#x1F3B2; &#xC2DC;&#xBBAC;&#xB808;&#xC774;&#xC158;</button>';
html+='</div></div>';
var total=0;if(log.length>0){var last=log[log.length-1];for(var i=0;i<last.values.length;i++)total+=last.values[i];}
var totalGrade=total>=2?'S':total>=1?'A':total>=0?'B':total>=-1?'C':'D';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v26-stat-card"><div class="v26-stat-val" style="color:'+(total>=0?'#00FF88':'#FF6B6B')+'">'+total.toFixed(1)+'</div><div class="v26-stat-label">Total SG</div></div>';
html+='<div class="v26-stat-card"><div class="v26-stat-val" style="color:#FFB800">'+totalGrade+'</div><div class="v26-stat-label">&#xB4F1;&#xAE09;</div></div>';
html+='<div class="v26-stat-card"><div class="v26-stat-val" style="color:#4ECDC4">'+log.length+'</div><div class="v26-stat-label">&#xB77C;&#xC6B4;&#xB4DC;</div></div>';
html+='<div class="v26-stat-card"><div class="v26-stat-val" style="color:#A855F7">6</div><div class="v26-stat-label">&#xBD84;&#xC11D; &#xCD95;</div></div>';
html+='</div>';
if(log.length>0)html+='<button class="v26-btn" style="width:100%;margin-top:6px;border-color:rgba(0,212,180,.3);color:#00D4B4" onclick="if(confirm(\'&#xCD08;&#xAE30;&#xD654;?\'))window._v26ResetSG()">&#xCD08;&#xAE30;&#xD654;</button>';
pn.innerHTML=html;openPanel('sgdeep');drawSGCanvas(log);
}
window._v26SaveSG=function(){
playSfx('save_v26');var vals=[];
for(var i=0;i<6;i++){vals.push(parseFloat(document.getElementById('v26-sg-'+i).value)||0);}
var log=lsGet('sg_deep_log',[]);log.push({date:todayStr(),values:vals});
if(log.length>30)log.shift();lsSet('sg_deep_log',log);
showToast('SG data saved!');checkAchievements();showStrokesGained();
};
window._v26SimulateSG=function(){
for(var i=0;i<6;i++){var el=document.getElementById('v26-sg-'+i);if(el)el.value=(Math.random()*4-2).toFixed(1);}
playSfx('nav_v26');showToast('Simulated SG data generated');
};
window._v26ResetSG=function(){lsSet('sg_deep_log',[]);showStrokesGained();};
function drawSGCanvas(log){
var c=document.getElementById('v26-sg-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=640,H=400;ctx.clearRect(0,0,W,H);
var grd=ctx.createLinearGradient(0,0,0,H);grd.addColorStop(0,'#0f1729');grd.addColorStop(1,'#1a1a2e');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Strokes Gained Deep Dive',W/2,24);
var L=70,R=W-30,midY=H/2+10,T=50,B=H-40;
ctx.strokeStyle='rgba(255,255,255,0.2)';ctx.lineWidth=1;
ctx.beginPath();ctx.moveTo(L,midY);ctx.lineTo(R,midY);ctx.stroke();
ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='9px sans-serif';ctx.textAlign='right';
for(var i=-3;i<=3;i++){var y=midY-i*(midY-T)/3;ctx.beginPath();ctx.moveTo(L,y);ctx.lineTo(R,y);ctx.stroke();ctx.fillText(i.toFixed(0),L-6,y+3);}
var bw=(R-L)/SG_CATEGORIES.length;
var vals=log.length>0?log[log.length-1].values:[0,0,0,0,0,0];
for(var i=0;i<SG_CATEGORIES.length;i++){
var x=L+bw*i+bw*0.1;var w=bw*0.35;
var benchH=SG_BENCH[i]/(3)*(midY-T);
ctx.fillStyle=SG_COLORS[i]+'30';
if(SG_BENCH[i]>=0)ctx.fillRect(x,midY-benchH,w,benchH);
else ctx.fillRect(x,midY,w,-benchH);
var valH=vals[i]/(3)*(midY-T);
var x2=x+w+4;
ctx.fillStyle=SG_COLORS[i];
if(vals[i]>=0)ctx.fillRect(x2,midY-valH,w,valH);
else ctx.fillRect(x2,midY,w,-valH);
ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='8px sans-serif';ctx.textAlign='center';
ctx.fillText(SG_CATEGORIES[i],L+bw*i+bw/2,B+10);
ctx.fillStyle=vals[i]>=0?'#00FF88':'#FF6B6B';ctx.font='bold 10px sans-serif';
var labelY=vals[i]>=0?midY-valH-8:midY-valH+14;
ctx.fillText((vals[i]>=0?'+':'')+vals[i].toFixed(1),L+bw*i+bw/2,labelY);
}
if(log.length>3){
ctx.strokeStyle='#FFB800';ctx.lineWidth=2;ctx.setLineDash([4,3]);
var startI=Math.max(0,log.length-8);
for(var ci=0;ci<6;ci++){
ctx.strokeStyle=SG_COLORS[ci]+'80';ctx.beginPath();
for(var j=startI;j<log.length;j++){
var px=R-100+(j-startI)*12;var py=midY-log[j].values[ci]/(3)*(midY-T);
if(j===startI)ctx.moveTo(px,py);else ctx.lineTo(px,py);
}
ctx.stroke();
}
ctx.setLineDash([]);
}
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='9px sans-serif';ctx.textAlign='left';
ctx.fillText('Benchmark',L,H-10);ctx.fillText('Actual',L+80,H-10);
ctx.fillStyle='rgba(255,255,255,0.2)';ctx.fillRect(L,H-18,8,8);
ctx.fillStyle=SG_COLORS[0];ctx.fillRect(L+80,H-18,8,8);
}

// ===== 3. MENTAL GAME PRESSURE TRACKER Canvas 620x400 =====
var MENTAL_AXES=['&#xC9D1;&#xC911;&#xB825;','&#xD68C;&#xBCF5;&#xB825;','&#xC790;&#xC2E0;&#xAC10;','&#xB8E8;&#xD2F4;&#xC77C;&#xAD00;&#xC131;','&#xC555;&#xBC15;&#xB300;&#xCC98;','&#xAC10;&#xC815;&#xC81C;&#xC5B4;','&#xBAA9;&#xD45C;&#xC124;&#xC815;','&#xC2DC;&#xAC01;&#xD654;'];
var MENTAL_COLORS_AX=['#FF6B6B','#FF9F43','#FECA57','#00FF88','#48DBFB','#A855F7','#FF85A2','#4ECDC4'];
function showMentalTracker(){
playSfx('mental_open');
var pn=getPanel('mental');
var log=lsGet('mental_log',[]);
var html='<button class="v26-close" onclick="window._v26Close(\'mental\')">&times;</button>';
html+='<div class="v26-title">&#x1F9E0; &#xBA58;&#xD0C8; &#xAC8C;&#xC784; &#xC555;&#xBC15; &#xD2B8;&#xB798;&#xCEE4;</div>';
html+='<canvas id="v26-mental-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v26-card"><h3>&#xC2EC;&#xB9AC; &#xC0C1;&#xD0DC; &#xD3C9;&#xAC00; (0-100)</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px">';
for(var i=0;i<MENTAL_AXES.length;i++){
html+='<div><label class="v26-label" style="color:'+MENTAL_COLORS_AX[i]+'">'+MENTAL_AXES[i]+'</label><input class="v26-input" type="number" id="v26-mental-'+i+'" value="70" min="0" max="100"></div>';
}
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
html+='<button class="v26-btn v26-btn-primary" onclick="window._v26SaveMental()">&#x1F4BE; &#xC800;&#xC7A5;</button>';
html+='<button class="v26-btn" onclick="window._v26SimMental()">&#x1F3B2; &#xC2DC;&#xBBAC;</button>';
html+='</div></div>';
var avg=70;if(log.length>0){var s=0;var last=log[log.length-1];for(var i=0;i<last.values.length;i++)s+=last.values[i];avg=Math.round(s/last.values.length);}
var mentalGrade=avg>=85?'S':avg>=70?'A':avg>=55?'B':avg>=40?'C':'D';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v26-stat-card"><div class="v26-stat-val" style="color:#00FF88">'+avg+'</div><div class="v26-stat-label">&#xC885;&#xD569; &#xC810;&#xC218;</div></div>';
html+='<div class="v26-stat-card"><div class="v26-stat-val" style="color:#FFB800">'+mentalGrade+'</div><div class="v26-stat-label">&#xB4F1;&#xAE09;</div></div>';
html+='<div class="v26-stat-card"><div class="v26-stat-val" style="color:#4ECDC4">'+log.length+'</div><div class="v26-stat-label">&#xD3C9;&#xAC00; &#xD69F;&#xC218;</div></div>';
html+='<div class="v26-stat-card"><div class="v26-stat-val" style="color:#A855F7">8</div><div class="v26-stat-label">&#xBD84;&#xC11D; &#xCD95;</div></div>';
html+='</div>';
if(log.length>0)html+='<button class="v26-btn" style="width:100%;margin-top:6px;border-color:rgba(0,212,180,.3);color:#00D4B4" onclick="if(confirm(\'&#xCD08;&#xAE30;&#xD654;?\'))window._v26ResetMental()">&#xCD08;&#xAE30;&#xD654;</button>';
pn.innerHTML=html;openPanel('mental');drawMentalCanvas(log);
}
window._v26SaveMental=function(){
playSfx('save_v26');var vals=[];
for(var i=0;i<8;i++){vals.push(parseInt(document.getElementById('v26-mental-'+i).value)||70);}
var log=lsGet('mental_log',[]);log.push({date:todayStr(),values:vals});
if(log.length>30)log.shift();lsSet('mental_log',log);
showToast('Mental state saved!');checkAchievements();showMentalTracker();
};
window._v26SimMental=function(){for(var i=0;i<8;i++){var el=document.getElementById('v26-mental-'+i);if(el)el.value=Math.floor(Math.random()*50+50);}playSfx('nav_v26');};
window._v26ResetMental=function(){lsSet('mental_log',[]);showMentalTracker();};
function drawMentalCanvas(log){
var c=document.getElementById('v26-mental-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);
ctx.fillStyle='#0f1729';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Mental Game Pressure Radar',W/2,24);
var cx=W/2,cy=H/2+15,rMax=140,n=8;
for(var ring=1;ring<=5;ring++){
var r2=rMax*ring/5;ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.lineWidth=1;ctx.beginPath();
for(var j=0;j<=n;j++){var a=-Math.PI/2+2*Math.PI*j/n;var px=cx+r2*Math.cos(a);var py=cy+r2*Math.sin(a);if(j===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);}
ctx.closePath();ctx.stroke();
}
for(var i=0;i<n;i++){
var a=-Math.PI/2+2*Math.PI*i/n;
ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+rMax*Math.cos(a),cy+rMax*Math.sin(a));ctx.stroke();
ctx.fillStyle=MENTAL_COLORS_AX[i];ctx.font='10px sans-serif';ctx.textAlign='center';
var lx=cx+(rMax+18)*Math.cos(a);var ly=cy+(rMax+18)*Math.sin(a);
ctx.fillText(MENTAL_AXES[i],lx,ly+4);
}
var vals=log.length>0?log[log.length-1].values:[70,70,70,70,70,70,70,70];
ctx.fillStyle='rgba(0,255,136,0.12)';ctx.strokeStyle='#00FF88';ctx.lineWidth=2;ctx.beginPath();
for(var i=0;i<n;i++){var a=-Math.PI/2+2*Math.PI*i/n;var r2=rMax*vals[i]/100;var px=cx+r2*Math.cos(a);var py=cy+r2*Math.sin(a);if(i===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);}
ctx.closePath();ctx.fill();ctx.stroke();
for(var i=0;i<n;i++){var a=-Math.PI/2+2*Math.PI*i/n;var r2=rMax*vals[i]/100;ctx.fillStyle=MENTAL_COLORS_AX[i];ctx.beginPath();ctx.arc(cx+r2*Math.cos(a),cy+r2*Math.sin(a),4,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff';ctx.font='bold 9px sans-serif';ctx.fillText(vals[i],cx+r2*Math.cos(a),cy+r2*Math.sin(a)-10);}
if(log.length>1){
ctx.fillStyle='rgba(168,85,247,0.08)';ctx.strokeStyle='#A855F7';ctx.lineWidth=1;ctx.setLineDash([3,3]);ctx.beginPath();
var prev=log[log.length-2].values;
for(var i=0;i<n;i++){var a=-Math.PI/2+2*Math.PI*i/n;var r2=rMax*prev[i]/100;if(i===0)ctx.moveTo(cx+r2*Math.cos(a),cy+r2*Math.sin(a));else ctx.lineTo(cx+r2*Math.cos(a),cy+r2*Math.sin(a));}
ctx.closePath();ctx.fill();ctx.stroke();ctx.setLineDash([]);
}
}

// ===== 4. COURSE DIFFICULTY RATING SYSTEM Canvas 640x400 =====
var COURSE_FACTORS=['&#xAC70;&#xB9AC;','&#xD574;&#xC800;&#xB4DC;','&#xADF8;&#xB9B0; &#xB09C;&#xC774;&#xB3C4;','OB &#xC704;&#xD5D8;','&#xBC14;&#xB78C; &#xB178;&#xCD9C;','&#xACE0;&#xC800;&#xCC28;','&#xD398;&#xC5B4;&#xC6E8;&#xC774; &#xD3ED;','&#xC6CC;&#xD130; &#xD574;&#xC800;&#xB4DC;'];
var COURSE_COLORS=['#FF6B6B','#FF9F43','#FECA57','#48DBFB','#00FF88','#A855F7','#FF85A2','#4ECDC4'];
var COURSE_PRESETS=[
{name:'Easy',vals:[40,20,30,15,25,20,70,10]},
{name:'Medium',vals:[60,50,55,40,45,40,50,35]},
{name:'Hard',vals:[80,75,80,65,70,60,30,60]},
{name:'Champion',vals:[95,90,90,80,85,75,20,80]}
];
function showCourseDifficulty(){
playSfx('course_open');
var pn=getPanel('coursediff');
var log=lsGet('course_diff_log',[]);
var selPreset=lsGet('course_preset',1);
var html='<button class="v26-close" onclick="window._v26Close(\'coursediff\')">&times;</button>';
html+='<div class="v26-title">&#x26F3; &#xCF54;&#xC2A4; &#xB09C;&#xC774;&#xB3C4; &#xB808;&#xC774;&#xD305; &#xC2DC;&#xC2A4;&#xD15C;</div>';
html+='<canvas id="v26-course-canvas" width="640" height="400" style="width:100%;max-width:640px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v26-card"><h3>&#xD504;&#xB9AC;&#xC14B; &amp; &#xCEE4;&#xC2A4;&#xD140; (0-100)</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px;margin-bottom:8px">';
for(var i=0;i<COURSE_PRESETS.length;i++){
html+='<button class="v26-btn v26-btn-sm'+(i===selPreset?' v26-btn-primary':'')+'" onclick="window._v26SelectCoursePreset('+i+')">'+COURSE_PRESETS[i].name+'</button>';
}
html+='</div>';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px">';
var preset=COURSE_PRESETS[selPreset];
for(var i=0;i<COURSE_FACTORS.length;i++){
html+='<div><label class="v26-label" style="color:'+COURSE_COLORS[i]+'">'+COURSE_FACTORS[i]+'</label><input class="v26-input" type="number" id="v26-course-'+i+'" value="'+preset.vals[i]+'" min="0" max="100"></div>';
}
html+='</div>';
html+='<button class="v26-btn v26-btn-primary" style="width:100%;margin-top:8px" onclick="window._v26SaveCourse()">&#x1F4BE; &#xD3C9;&#xAC00; &#xC800;&#xC7A5;</button>';
html+='</div>';
var overall=0;if(preset)for(var i=0;i<preset.vals.length;i++)overall+=preset.vals[i];overall=Math.round(overall/8);
var diffGrade=overall>=80?'Champion':overall>=60?'Hard':overall>=40?'Medium':'Easy';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v26-stat-card"><div class="v26-stat-val" style="color:#FF6B6B">'+overall+'</div><div class="v26-stat-label">&#xB09C;&#xC774;&#xB3C4;</div></div>';
html+='<div class="v26-stat-card"><div class="v26-stat-val" style="color:#FFB800">'+diffGrade+'</div><div class="v26-stat-label">&#xB4F1;&#xAE09;</div></div>';
html+='<div class="v26-stat-card"><div class="v26-stat-val" style="color:#4ECDC4">'+log.length+'</div><div class="v26-stat-label">&#xD3C9;&#xAC00; &#xD69F;&#xC218;</div></div>';
html+='<div class="v26-stat-card"><div class="v26-stat-val" style="color:#A855F7">8</div><div class="v26-stat-label">&#xBD84;&#xC11D; &#xCD95;</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('coursediff');drawCourseCanvas(preset.vals,log);
}
window._v26SelectCoursePreset=function(i){lsSet('course_preset',i);showCourseDifficulty();};
window._v26SaveCourse=function(){
playSfx('save_v26');var vals=[];
for(var i=0;i<8;i++){vals.push(parseInt(document.getElementById('v26-course-'+i).value)||50);}
var log=lsGet('course_diff_log',[]);log.push({date:todayStr(),values:vals});
if(log.length>30)log.shift();lsSet('course_diff_log',log);
showToast('Course rating saved!');checkAchievements();showCourseDifficulty();
};
function drawCourseCanvas(vals,log){
var c=document.getElementById('v26-course-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=640,H=400;ctx.clearRect(0,0,W,H);
ctx.fillStyle='#0f1729';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Course Difficulty Heatmap',W/2,24);
var L=100,R=W-30,T=50,B=H-50;
var rows=4,cols=2;var cw=(R-L)/cols,ch=(B-T)/rows;
for(var i=0;i<COURSE_FACTORS.length;i++){
var row=i%rows,col=Math.floor(i/rows);
var x=L+col*cw+4,y=T+row*ch+4,w=cw-8,h=ch-8;
var intensity=vals[i]/100;
var r2=Math.round(255*intensity);var g2=Math.round(255*(1-intensity)*0.6);var b2=Math.round(100*(1-intensity));
ctx.fillStyle='rgb('+r2+','+g2+','+b2+')';
ctx.beginPath();ctx.roundRect(x,y,w,h,8);ctx.fill();
ctx.fillStyle='#fff';ctx.font='bold 13px sans-serif';ctx.textAlign='center';
ctx.fillText(COURSE_FACTORS[i],x+w/2,y+h/2-8);
ctx.font='bold 22px sans-serif';
ctx.fillText(vals[i],x+w/2,y+h/2+18);
var grade=vals[i]>=80?'Extreme':vals[i]>=60?'Hard':vals[i]>=40?'Mid':'Easy';
ctx.font='10px sans-serif';ctx.fillStyle='rgba(255,255,255,0.7)';
ctx.fillText(grade,x+w/2,y+h/2+35);
}
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='10px sans-serif';ctx.textAlign='left';
ctx.fillText('Low',L,H-15);ctx.fillText('High',R-30,H-15);
var grdBar=ctx.createLinearGradient(L+30,0,R-50,0);grdBar.addColorStop(0,'rgb(0,153,60)');grdBar.addColorStop(0.5,'rgb(255,200,0)');grdBar.addColorStop(1,'rgb(255,50,50)');
ctx.fillStyle=grdBar;ctx.fillRect(L+30,H-22,R-L-80,8);
}

// ===== 5. EQUIPMENT WEAR DASHBOARD Canvas 620x400 =====
var EQUIP_ITEMS=['Driver','3W','3H','4I','5I','6I','7I','8I','9I','PW','GW','SW','LW','Putter'];
var EQUIP_METRICS=['&#xADF8;&#xB8E8;&#xBE0C;','&#xC0E4;&#xD504;&#xD2B8;','&#xADF8;&#xB9BD;','&#xD5E4;&#xB4DC;'];
var EQUIP_COLORS2=['#FF6B6B','#FF9F43','#00FF88','#48DBFB'];
function showEquipWear(){
playSfx('equip_open');
var pn=getPanel('equipwear');
var data=lsGet('equip_wear',{});
var html='<button class="v26-close" onclick="window._v26Close(\'equipwear\')">&times;</button>';
html+='<div class="v26-title">&#x1F3CC; &#xC7A5;&#xBE44; &#xB9C8;&#xBAA8; &#xB300;&#xC2DC;&#xBCF4;&#xB4DC;</div>';
html+='<canvas id="v26-equip-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v26-card"><h3>&#xD074;&#xB7FD;&#xBCC4; &#xB9C8;&#xBAA8;&#xB3C4; &#xC124;&#xC815; (0-100%)</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px">';
for(var i=0;i<Math.min(8,EQUIP_ITEMS.length);i++){
var wear=data[EQUIP_ITEMS[i]]||{groove:80,shaft:90,grip:70,head:95};
html+='<div style="text-align:center;padding:4px"><div style="font-size:10px;color:#FFB800;margin-bottom:2px">'+EQUIP_ITEMS[i]+'</div>';
html+='<input class="v26-input" type="number" id="v26-eq-'+i+'" value="'+Math.round((wear.groove+wear.shaft+wear.grip+wear.head)/4)+'" min="0" max="100" style="width:50px;text-align:center">';
html+='</div>';
}
html+='</div>';
html+='<button class="v26-btn v26-btn-primary" style="width:100%;margin-top:8px" onclick="window._v26SaveEquip()">&#x1F4BE; &#xC800;&#xC7A5;</button>';
html+='</div>';
var totalWear=0,count=0;
for(var k in data){var w=data[k];totalWear+=(w.groove+w.shaft+w.grip+w.head)/4;count++;}
var avgWear=count>0?Math.round(totalWear/count):85;
var wearGrade=avgWear>=85?'S':avgWear>=70?'A':avgWear>=55?'B':avgWear>=40?'C':'D';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v26-stat-card"><div class="v26-stat-val" style="color:#00FF88">'+avgWear+'%</div><div class="v26-stat-label">&#xD3C9;&#xADE0; &#xC0C1;&#xD0DC;</div></div>';
html+='<div class="v26-stat-card"><div class="v26-stat-val" style="color:#FFB800">'+wearGrade+'</div><div class="v26-stat-label">&#xB4F1;&#xAE09;</div></div>';
html+='<div class="v26-stat-card"><div class="v26-stat-val" style="color:#4ECDC4">'+count+'</div><div class="v26-stat-label">&#xB4F1;&#xB85D; &#xD074;&#xB7FD;</div></div>';
html+='<div class="v26-stat-card"><div class="v26-stat-val" style="color:#A855F7">14</div><div class="v26-stat-label">&#xCD1D; &#xD074;&#xB7FD;</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('equipwear');drawEquipCanvas(data);
}
window._v26SaveEquip=function(){
playSfx('save_v26');var data=lsGet('equip_wear',{});
for(var i=0;i<Math.min(8,EQUIP_ITEMS.length);i++){
var val=parseInt(document.getElementById('v26-eq-'+i).value)||80;
data[EQUIP_ITEMS[i]]={groove:val,shaft:Math.min(100,val+10),grip:Math.max(0,val-10),head:Math.min(100,val+5)};
}
lsSet('equip_wear',data);showToast('Equipment data saved!');checkAchievements();showEquipWear();
};
function drawEquipCanvas(data){
var c=document.getElementById('v26-equip-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);
ctx.fillStyle='#0f1729';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Equipment Wear Matrix (14 Clubs x 4 Metrics)',W/2,24);
var L=80,R=W-20,T=50,B=H-40;
var clubs=EQUIP_ITEMS;var metrics=EQUIP_METRICS;
var cw=(R-L)/clubs.length,ch=(B-T)/metrics.length;
for(var ci=0;ci<clubs.length;ci++){
var wear=data[clubs[ci]]||{groove:80,shaft:90,grip:70,head:95};
var vals=[wear.groove,wear.shaft,wear.grip,wear.head];
for(var mi=0;mi<metrics.length;mi++){
var x=L+ci*cw+1,y=T+mi*ch+1,w=cw-2,h=ch-2;
var v=vals[mi];
var r2=Math.round(255*(1-v/100));var g2=Math.round(200*v/100);var b2=50;
ctx.fillStyle='rgb('+r2+','+g2+','+b2+')';
ctx.fillRect(x,y,w,h);
ctx.fillStyle='#fff';ctx.font='bold 10px sans-serif';ctx.textAlign='center';
ctx.fillText(v+'%',x+w/2,y+h/2+4);
}
ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='8px sans-serif';ctx.textAlign='center';
ctx.save();ctx.translate(L+ci*cw+cw/2,B+14);ctx.fillText(clubs[ci],0,0);ctx.restore();
}
for(var mi=0;mi<metrics.length;mi++){
ctx.fillStyle=EQUIP_COLORS2[mi];ctx.font='10px sans-serif';ctx.textAlign='right';
ctx.fillText(metrics[mi],L-6,T+mi*ch+ch/2+4);
}
}

// ===== 6. SCORE PREDICTION ENGINE Canvas 620x400 =====
function showScorePredictor(){
playSfx('score_open');
var pn=getPanel('scorepred');
var log=lsGet('score_pred_log',[]);
var html='<button class="v26-close" onclick="window._v26Close(\'scorepred\')">&times;</button>';
html+='<div class="v26-title">&#x1F52E; &#xC2A4;&#xCF54;&#xC5B4; &#xC608;&#xCE21; &#xC5D4;&#xC9C4;</div>';
html+='<canvas id="v26-score-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v26-card"><h3>&#xB77C;&#xC6B4;&#xB4DC; &#xC2A4;&#xCF54;&#xC5B4; &#xC785;&#xB825;</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px">';
html+='<div><label class="v26-label">&#xC2A4;&#xCF54;&#xC5B4;</label><input class="v26-input" type="number" id="v26-score-val" value="90" min="60" max="150"></div>';
html+='<div><label class="v26-label">&#xD37C;&#xD305;&#xC218;</label><input class="v26-input" type="number" id="v26-score-putts" value="32" min="18" max="60"></div>';
html+='<div><label class="v26-label">GIR (%)</label><input class="v26-input" type="number" id="v26-score-gir" value="40" min="0" max="100"></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
html+='<button class="v26-btn v26-btn-primary" onclick="window._v26SaveScore()">&#x1F4BE; &#xC800;&#xC7A5;</button>';
html+='<button class="v26-btn" onclick="window._v26PredictScore()">&#x1F52E; &#xC608;&#xCE21;</button>';
html+='</div></div>';
var predicted=90;if(log.length>=3){var sum=0;for(var i=Math.max(0,log.length-5);i<log.length;i++)sum+=log[i].score;predicted=Math.round(sum/(Math.min(5,log.length))*0.95);}
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v26-stat-card"><div class="v26-stat-val" style="color:#00FF88">'+predicted+'</div><div class="v26-stat-label">&#xC608;&#xCE21; &#xC2A4;&#xCF54;&#xC5B4;</div></div>';
html+='<div class="v26-stat-card"><div class="v26-stat-val" style="color:#FFB800">'+log.length+'</div><div class="v26-stat-label">&#xB77C;&#xC6B4;&#xB4DC;</div></div>';
var best=999;for(var i=0;i<log.length;i++)if(log[i].score<best)best=log[i].score;
html+='<div class="v26-stat-card"><div class="v26-stat-val" style="color:#FF6B6B">'+(best<999?best:'-')+'</div><div class="v26-stat-label">&#xBCA0;&#xC2A4;&#xD2B8;</div></div>';
var avg=0;if(log.length>0){for(var i=0;i<log.length;i++)avg+=log[i].score;avg=Math.round(avg/log.length);}
html+='<div class="v26-stat-card"><div class="v26-stat-val" style="color:#4ECDC4">'+(avg||'-')+'</div><div class="v26-stat-label">&#xD3C9;&#xADE0;</div></div>';
html+='</div>';
if(log.length>0)html+='<button class="v26-btn" style="width:100%;margin-top:6px;border-color:rgba(0,212,180,.3);color:#00D4B4" onclick="if(confirm(\'&#xCD08;&#xAE30;&#xD654;?\'))window._v26ResetScore()">&#xCD08;&#xAE30;&#xD654;</button>';
pn.innerHTML=html;openPanel('scorepred');drawScoreCanvas(log,predicted);
}
window._v26SaveScore=function(){
playSfx('save_v26');
var score=parseInt(document.getElementById('v26-score-val').value)||90;
var putts=parseInt(document.getElementById('v26-score-putts').value)||32;
var gir=parseInt(document.getElementById('v26-score-gir').value)||40;
var log=lsGet('score_pred_log',[]);log.push({date:todayStr(),score:score,putts:putts,gir:gir});
if(log.length>50)log.shift();lsSet('score_pred_log',log);
showToast('Score '+score+' saved!');checkAchievements();showScorePredictor();
};
window._v26PredictScore=function(){
var log=lsGet('score_pred_log',[]);
if(log.length<3){showToast('Need 3+ rounds for prediction');return;}
var sum=0;for(var i=Math.max(0,log.length-5);i<log.length;i++)sum+=log[i].score;
var pred=Math.round(sum/Math.min(5,log.length)*0.97);
showToast('Predicted next score: '+pred);
};
window._v26ResetScore=function(){lsSet('score_pred_log',[]);showScorePredictor();};
function drawScoreCanvas(log,predicted){
var c=document.getElementById('v26-score-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);
ctx.fillStyle='#0f1729';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Score Prediction & Trend Analysis',W/2,24);
var L=60,R=W-30,T=50,B=H-50;
if(log.length===0){ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='14px sans-serif';ctx.fillText('Record 3+ rounds for prediction',W/2,H/2);return;}
var minS=999,maxS=0;for(var i=0;i<log.length;i++){if(log[i].score<minS)minS=log[i].score;if(log[i].score>maxS)maxS=log[i].score;}
minS=Math.max(60,minS-5);maxS=maxS+5;
ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.lineWidth=1;
for(var i=0;i<=5;i++){var y=T+(B-T)*i/5;ctx.beginPath();ctx.moveTo(L,y);ctx.lineTo(R,y);ctx.stroke();ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='9px sans-serif';ctx.textAlign='right';ctx.fillText(Math.round(maxS-(maxS-minS)*i/5),L-6,y+3);}
var n=Math.min(log.length,20);var startI=Math.max(0,log.length-20);
var dx=(R-L)/(n>1?n-1:1);
var grdArea=ctx.createLinearGradient(0,T,0,B);grdArea.addColorStop(0,'rgba(0,255,136,0.2)');grdArea.addColorStop(1,'rgba(0,255,136,0)');
ctx.fillStyle=grdArea;ctx.beginPath();ctx.moveTo(L,B);
for(var i=0;i<n;i++){var x=L+i*dx;var y=T+(maxS-log[startI+i].score)/(maxS-minS)*(B-T);if(i===0)ctx.lineTo(x,y);else ctx.lineTo(x,y);}
ctx.lineTo(L+(n-1)*dx,B);ctx.closePath();ctx.fill();
ctx.strokeStyle='#00FF88';ctx.lineWidth=2.5;ctx.beginPath();
for(var i=0;i<n;i++){var x=L+i*dx;var y=T+(maxS-log[startI+i].score)/(maxS-minS)*(B-T);if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}
ctx.stroke();
for(var i=0;i<n;i++){var x=L+i*dx;var y=T+(maxS-log[startI+i].score)/(maxS-minS)*(B-T);ctx.fillStyle='#00FF88';ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff';ctx.font='9px sans-serif';ctx.textAlign='center';ctx.fillText(log[startI+i].score,x,y-10);}
if(log.length>=3){
ctx.setLineDash([6,4]);ctx.strokeStyle='#FFB800';ctx.lineWidth=2;
var predX=L+n*dx;var predY=T+(maxS-predicted)/(maxS-minS)*(B-T);
ctx.beginPath();ctx.moveTo(L+(n-1)*dx,T+(maxS-log[log.length-1].score)/(maxS-minS)*(B-T));ctx.lineTo(predX,predY);ctx.stroke();ctx.setLineDash([]);
ctx.fillStyle='#FFB800';ctx.beginPath();ctx.arc(predX,predY,6,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#fff';ctx.font='bold 11px sans-serif';ctx.fillText('Pred: '+predicted,predX,predY-14);
}
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='9px sans-serif';ctx.textAlign='center';
for(var i=0;i<n;i++){var x=L+i*dx;ctx.fillText('R'+(startI+i+1),x,B+14);}
}

// ===== 7. WEATHER IMPACT ANALYZER Canvas 620x400 =====
var WEATHER_FACTORS=['&#xAE30;&#xC628;','&#xC2B5;&#xB3C4;','&#xACE0;&#xB3C4;','&#xAE30;&#xC555;','&#xBE44;','&#xC548;&#xAC1C;'];
var WEATHER_COLORS=['#FF6B6B','#48DBFB','#00FF88','#FF9F43','#A855F7','#FECA57'];
function showWeatherImpact(){
playSfx('weather_open');
var pn=getPanel('weather');
var log=lsGet('weather_log',[]);
var html='<button class="v26-close" onclick="window._v26Close(\'weather\')">&times;</button>';
html+='<div class="v26-title">&#x1F326; &#xB0A0;&#xC528; &#xC784;&#xD329;&#xD2B8; &#xBD84;&#xC11D;&#xAE30;</div>';
html+='<canvas id="v26-weather-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v26-card"><h3>&#xB0A0;&#xC528; &#xC870;&#xAC74; &#xC785;&#xB825;</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px">';
html+='<div><label class="v26-label" style="color:#FF6B6B">&#xAE30;&#xC628; (&deg;C)</label><input class="v26-input" type="number" id="v26-weather-temp" value="25" min="-10" max="45"></div>';
html+='<div><label class="v26-label" style="color:#48DBFB">&#xC2B5;&#xB3C4; (%)</label><input class="v26-input" type="number" id="v26-weather-humid" value="60" min="0" max="100"></div>';
html+='<div><label class="v26-label" style="color:#00FF88">&#xACE0;&#xB3C4; (m)</label><input class="v26-input" type="number" id="v26-weather-alt" value="50" min="0" max="3000"></div>';
html+='<div><label class="v26-label" style="color:#FF9F43">&#xAE30;&#xC555; (hPa)</label><input class="v26-input" type="number" id="v26-weather-press" value="1013" min="950" max="1060"></div>';
html+='<div><label class="v26-label" style="color:#A855F7">&#xBE44; (mm/h)</label><input class="v26-input" type="number" id="v26-weather-rain" value="0" min="0" max="50"></div>';
html+='<div><label class="v26-label" style="color:#FECA57">&#xC548;&#xAC1C; &#xB18D;&#xB3C4; (0-10)</label><input class="v26-input" type="number" id="v26-weather-fog" value="0" min="0" max="10"></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
html+='<button class="v26-btn v26-btn-primary" onclick="window._v26CalcWeather()">&#x1F4CA; &#xBD84;&#xC11D;</button>';
html+='<button class="v26-btn" onclick="window._v26SaveWeather()">&#x1F4BE; &#xC800;&#xC7A5;</button>';
html+='</div></div>';
var distAdj=0;
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v26-stat-card"><div class="v26-stat-val" style="color:#00FF88">'+distAdj+'%</div><div class="v26-stat-label">&#xBE44;&#xAC70;&#xB9AC; &#xBCF4;&#xC815;</div></div>';
html+='<div class="v26-stat-card"><div class="v26-stat-val" style="color:#FFB800">'+log.length+'</div><div class="v26-stat-label">&#xAE30;&#xB85D;</div></div>';
html+='<div class="v26-stat-card"><div class="v26-stat-val" style="color:#4ECDC4">6</div><div class="v26-stat-label">&#xBCC0;&#xC218;</div></div>';
html+='<div class="v26-stat-card"><div class="v26-stat-val" style="color:#A855F7">&#xC2E4;&#xC2DC;&#xAC04;</div><div class="v26-stat-label">&#xBD84;&#xC11D;</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('weather');drawWeatherCanvas(log);
}
window._v26CalcWeather=function(){
var temp=parseInt(document.getElementById('v26-weather-temp').value)||25;
var humid=parseInt(document.getElementById('v26-weather-humid').value)||60;
var alt=parseInt(document.getElementById('v26-weather-alt').value)||50;
var press=parseInt(document.getElementById('v26-weather-press').value)||1013;
var rain=parseInt(document.getElementById('v26-weather-rain').value)||0;
var fog=parseInt(document.getElementById('v26-weather-fog').value)||0;
var tempAdj=(temp-20)*0.15;var humidAdj=(humid-50)*-0.02;var altAdj=alt*0.002;
var pressAdj=(1013-press)*0.1;var rainAdj=rain*-0.5;var fogAdj=fog*-0.3;
var total=Math.round((tempAdj+humidAdj+altAdj+pressAdj+rainAdj+fogAdj)*10)/10;
showToast('Distance adjustment: '+(total>=0?'+':'')+total+'% ('+(total>=0?'farther':'shorter')+')');
};
window._v26SaveWeather=function(){
playSfx('save_v26');
var log=lsGet('weather_log',[]);
log.push({date:todayStr(),temp:parseInt(document.getElementById('v26-weather-temp').value)||25,humid:parseInt(document.getElementById('v26-weather-humid').value)||60,alt:parseInt(document.getElementById('v26-weather-alt').value)||50,press:parseInt(document.getElementById('v26-weather-press').value)||1013,rain:parseInt(document.getElementById('v26-weather-rain').value)||0,fog:parseInt(document.getElementById('v26-weather-fog').value)||0});
if(log.length>30)log.shift();lsSet('weather_log',log);
showToast('Weather data saved!');checkAchievements();showWeatherImpact();
};
function drawWeatherCanvas(log){
var c=document.getElementById('v26-weather-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);
var grd=ctx.createLinearGradient(0,0,0,H);grd.addColorStop(0,'#0a1628');grd.addColorStop(0.5,'#162844');grd.addColorStop(1,'#0f1729');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Weather Impact on Distance',W/2,24);
var L=70,R=W-30,T=50,B=H-50;
var factors=WEATHER_FACTORS;var colors=WEATHER_COLORS;
var bw=(R-L)/factors.length;
var impacts=[0,0,0,0,0,0];
if(log.length>0){
var last=log[log.length-1];
impacts[0]=(last.temp-20)*0.15;impacts[1]=(last.humid-50)*-0.02;impacts[2]=last.alt*0.002;
impacts[3]=(1013-last.press)*0.1;impacts[4]=last.rain*-0.5;impacts[5]=last.fog*-0.3;
}
var maxImp=3;
ctx.strokeStyle='rgba(255,255,255,0.15)';ctx.lineWidth=1;
var midY=(T+B)/2;
ctx.beginPath();ctx.moveTo(L,midY);ctx.lineTo(R,midY);ctx.stroke();
for(var i=-3;i<=3;i++){var y=midY-i/maxImp*(midY-T);ctx.beginPath();ctx.moveTo(L,y);ctx.lineTo(R,y);ctx.stroke();ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='9px sans-serif';ctx.textAlign='right';ctx.fillText((i>=0?'+':'')+i+'%',L-6,y+3);}
for(var i=0;i<factors.length;i++){
var x=L+bw*i+bw*0.2;var w=bw*0.6;
var valH=impacts[i]/maxImp*(midY-T);
ctx.fillStyle=colors[i];
if(impacts[i]>=0)ctx.fillRect(x,midY-valH,w,valH);
else ctx.fillRect(x,midY,w,-valH);
ctx.fillStyle='rgba(255,255,255,0.7)';ctx.font='10px sans-serif';ctx.textAlign='center';
ctx.fillText(factors[i],L+bw*i+bw/2,B+14);
ctx.fillStyle=impacts[i]>=0?'#00FF88':'#FF6B6B';ctx.font='bold 10px sans-serif';
var ly=impacts[i]>=0?midY-valH-10:midY-valH+14;
ctx.fillText((impacts[i]>=0?'+':'')+impacts[i].toFixed(1)+'%',L+bw*i+bw/2,ly);
}
var total=0;for(var i=0;i<impacts.length;i++)total+=impacts[i];
ctx.fillStyle=total>=0?'#00FF88':'#FF6B6B';ctx.font='bold 16px sans-serif';ctx.textAlign='center';
ctx.fillText('Total: '+(total>=0?'+':'')+total.toFixed(1)+'%',W/2,T-10);
}

// ===== 8. COMPREHENSIVE ROUND DASHBOARD Canvas 620x400 =====
var DASH_KPIS=['Driving','Iron Play','Short Game','Putting','Mental','Fitness','Strategy','Equipment'];
var DASH_COLORS=['#FF6B6B','#FF9F43','#00FF88','#48DBFB','#A855F7','#FECA57','#FF85A2','#4ECDC4'];
function showRoundDashboard(){
playSfx('dash_open');
var pn=getPanel('dashboard');
var log=lsGet('dash_log',[]);
var html='<button class="v26-close" onclick="window._v26Close(\'dashboard\')">&times;</button>';
html+='<div class="v26-title">&#x1F4CA; &#xC885;&#xD569; &#xB77C;&#xC6B4;&#xB4DC; &#xB300;&#xC2DC;&#xBCF4;&#xB4DC;</div>';
html+='<canvas id="v26-dash-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v26-card"><h3>8&#xCD95; KPI &#xC785;&#xB825; (0-100)</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px">';
for(var i=0;i<DASH_KPIS.length;i++){
html+='<div><label class="v26-label" style="color:'+DASH_COLORS[i]+'">'+DASH_KPIS[i]+'</label><input class="v26-input" type="number" id="v26-dash-'+i+'" value="70" min="0" max="100"></div>';
}
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
html+='<button class="v26-btn v26-btn-primary" onclick="window._v26SaveDash()">&#x1F4BE; &#xC800;&#xC7A5;</button>';
html+='<button class="v26-btn" onclick="window._v26SimDash()">&#x1F3B2; &#xC2DC;&#xBBAC;</button>';
html+='</div></div>';
var avg=70;if(log.length>0){var s=0;var last=log[log.length-1];for(var i=0;i<last.scores.length;i++)s+=last.scores[i];avg=Math.round(s/last.scores.length);}
var dashGrade=avg>=85?'S':avg>=70?'A':avg>=55?'B':avg>=40?'C':'D';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v26-stat-card"><div class="v26-stat-val" style="color:#00FF88">'+avg+'</div><div class="v26-stat-label">&#xC885;&#xD569;&#xC810;&#xC218;</div></div>';
html+='<div class="v26-stat-card"><div class="v26-stat-val" style="color:#FFB800">'+dashGrade+'</div><div class="v26-stat-label">&#xB4F1;&#xAE09;</div></div>';
html+='<div class="v26-stat-card"><div class="v26-stat-val" style="color:#4ECDC4">'+log.length+'</div><div class="v26-stat-label">&#xD3C9;&#xAC00; &#xD69F;&#xC218;</div></div>';
html+='<div class="v26-stat-card"><div class="v26-stat-val" style="color:#A855F7">8</div><div class="v26-stat-label">KPI &#xCD95;</div></div>';
html+='</div>';
if(log.length>0)html+='<button class="v26-btn" style="width:100%;margin-top:6px;border-color:rgba(0,212,180,.3);color:#00D4B4" onclick="if(confirm(\'&#xCD08;&#xAE30;&#xD654;?\'))window._v26ResetDash()">&#xCD08;&#xAE30;&#xD654;</button>';
pn.innerHTML=html;openPanel('dashboard');drawDashCanvas(log);
}
window._v26SaveDash=function(){
playSfx('save_v26');var scores=[];
for(var i=0;i<8;i++){scores.push(parseInt(document.getElementById('v26-dash-'+i).value)||70);}
var log=lsGet('dash_log',[]);log.push({date:todayStr(),scores:scores});
if(log.length>30)log.shift();lsSet('dash_log',log);
showToast('Dashboard saved!');checkAchievements();showRoundDashboard();
};
window._v26SimDash=function(){for(var i=0;i<8;i++){var el=document.getElementById('v26-dash-'+i);if(el)el.value=Math.floor(Math.random()*40+55);}playSfx('nav_v26');};
window._v26ResetDash=function(){lsSet('dash_log',[]);showRoundDashboard();};
function drawDashCanvas(log){
var c=document.getElementById('v26-dash-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);
ctx.fillStyle='#0f1729';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Comprehensive Round Dashboard (8 KPIs)',W/2,24);
var scores=log.length>0?log[log.length-1].scores:[70,70,70,70,70,70,70,70];
var cols=4,rows=2;
var gaugeW=W/cols,gaugeH=(H-70)/rows;
for(var i=0;i<8;i++){
var col=i%cols,row=Math.floor(i/cols);
var cx=gaugeW*col+gaugeW/2;var cy=55+row*gaugeH+gaugeH/2+10;var r=Math.min(gaugeW,gaugeH)*0.32;
ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.lineWidth=14;
ctx.beginPath();ctx.arc(cx,cy,r,Math.PI,2*Math.PI);ctx.stroke();
var pct=scores[i]/100;
var endAngle=Math.PI+pct*Math.PI;
var gaugeColor=scores[i]>=80?'#00FF88':scores[i]>=60?'#4ECDC4':scores[i]>=40?'#FFB800':'#FF6B6B';
ctx.strokeStyle=gaugeColor;ctx.lineWidth=14;
ctx.beginPath();ctx.arc(cx,cy,r,Math.PI,endAngle);ctx.stroke();
ctx.fillStyle=gaugeColor;ctx.font='bold 22px sans-serif';ctx.textAlign='center';
ctx.fillText(scores[i],cx,cy-6);
ctx.fillStyle='rgba(255,255,255,0.7)';ctx.font='10px sans-serif';
ctx.fillText(DASH_KPIS[i],cx,cy+14);
var grade=scores[i]>=85?'S':scores[i]>=70?'A':scores[i]>=55?'B':scores[i]>=40?'C':'D';
ctx.fillStyle=gaugeColor+'80';ctx.font='bold 10px sans-serif';
ctx.fillText(grade,cx,cy+28);
}
var avg=0;for(var i=0;i<scores.length;i++)avg+=scores[i];avg=Math.round(avg/scores.length);
var overallGrade=avg>=85?'S':avg>=70?'A':avg>=55?'B':avg>=40?'C':'D';
var overallColor=avg>=85?'#00FF88':avg>=70?'#4ECDC4':avg>=55?'#FFB800':'#FF6B6B';
ctx.fillStyle=overallColor;ctx.font='bold 28px sans-serif';ctx.textAlign='center';
ctx.fillText(overallGrade,W/2,H-35);
ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='12px sans-serif';
ctx.fillText('Overall: '+avg+'/100',W/2,H-15);
}

// ===== QUIZ V26 (15 Questions) =====
var QUIZ_V26=[
{q:'&#xC2A4;&#xC719; &#xD15C;&#xD3EC;&#xC758; &#xC774;&#xC0C1;&#xC801;&#xC778; &#xBC31;&#xC2A4;&#xC719;:&#xB2E4;&#xC6B4;&#xC2A4;&#xC719; &#xBE44;&#xC728;&#xC740;?',a:['1:1','2:1','3:1','4:1'],c:2},
{q:'Strokes Gained Approach&#xAC00; &#xCE21;&#xC815;&#xD558;&#xB294; &#xAC83;&#xC740;?',a:['&#xD2F0;&#xC0F7; &#xBE44;&#xAC70;&#xB9AC;','&#xC5B4;&#xD504;&#xB85C;&#xCE58; &#xC0F7; &#xD488;&#xC9C8;','&#xD37C;&#xD305; &#xC815;&#xD655;&#xB3C4;','&#xBC88;&#xCEE4; &#xD0C8;&#xCD9C;&#xB960;'],c:1},
{q:'&#xACE8;&#xD504;&#xC5D0;&#xC11C; &#xBA58;&#xD0C8; &#xAC8C;&#xC784;&#xC758; &#xD575;&#xC2EC; &#xC694;&#xC18C;&#xB294;?',a:['&#xBE44;&#xAC70;&#xB9AC;','&#xD504;&#xB9AC;&#xC0F7; &#xB8E8;&#xD2F4;','&#xD074;&#xB7FD; &#xC120;&#xD0DD;','&#xC2A4;&#xC719; &#xC2A4;&#xD53C;&#xB4DC;'],c:1},
{q:'&#xAE30;&#xC628;&#xC774; 10&deg;C &#xC0C1;&#xC2B9;&#xD558;&#xBA74; &#xBE44;&#xAC70;&#xB9AC;&#xB294;?',a:['&#xAC10;&#xC18C;','&#xBCC0;&#xD654; &#xC5C6;&#xC74C;','&#xC57D; 1.5% &#xC99D;&#xAC00;','&#xC57D; 5% &#xC99D;&#xAC00;'],c:2},
{q:'&#xACE0;&#xB3C4; 1000m&#xC5D0;&#xC11C; &#xBE44;&#xAC70;&#xB9AC; &#xBCC0;&#xD654;&#xB294;?',a:['&#xBCC0;&#xD654; &#xC5C6;&#xC74C;','&#xC57D; 2% &#xC99D;&#xAC00;','&#xC57D; 5% &#xC99D;&#xAC00;','&#xC57D; 10% &#xC99D;&#xAC00;'],c:1},
{q:'Scoring Zone (100yd &#xC774;&#xB0B4;)&#xC5D0;&#xC11C; &#xAC00;&#xC7A5; &#xC911;&#xC694;&#xD55C; &#xAE30;&#xC220;&#xC740;?',a:['&#xD480; &#xC2A4;&#xC719;','&#xB514;&#xC2A4;&#xD134;&#xC2A4; &#xCEE8;&#xD2B8;&#xB864;','&#xB4DC;&#xB77C;&#xC774;&#xBC84; &#xC815;&#xD655;&#xB3C4;','&#xD37C;&#xD305; &#xC2A4;&#xD53C;&#xB4DC; &#xC77D;&#xAE30;'],c:1},
{q:'&#xD074;&#xB7FD; &#xADF8;&#xB8E8;&#xBE0C; &#xC218;&#xBA85;&#xC740; &#xBCF4;&#xD1B5; &#xBA87; &#xB77C;&#xC6B4;&#xB4DC;?',a:['50-100','100-200','200-300','300-500'],c:2},
{q:'GIR(Green in Regulation) &#xD3C9;&#xADE0; &#xD504;&#xB85C; &#xC120;&#xC218;&#xC758; &#xBE44;&#xC728;&#xC740;?',a:['45-55%','55-65%','65-75%','75-85%'],c:2},
{q:'&#xC2A4;&#xCF54;&#xC5B4; &#xC608;&#xCE21;&#xC5D0;&#xC11C; &#xAC00;&#xC7A5; &#xC911;&#xC694;&#xD55C; &#xBCC0;&#xC218;&#xB294;?',a:['&#xBE44;&#xAC70;&#xB9AC;','&#xCD5C;&#xADFC; &#xB77C;&#xC6B4;&#xB4DC; &#xD2B8;&#xB80C;&#xB4DC;','&#xB0A0;&#xC528; &#xC870;&#xAC74;','&#xCF54;&#xC2A4; &#xB09C;&#xC774;&#xB3C4;'],c:1},
{q:'&#xBE44; &#xC624;&#xB294; &#xB0A0; &#xACE8;&#xD504;&#xC5D0;&#xC11C; &#xAC00;&#xC7A5; &#xD070; &#xC601;&#xD5A5;&#xC740;?',a:['&#xBE44;&#xAC70;&#xB9AC; &#xAC10;&#xC18C;','&#xADF8;&#xB9BD; &#xBBF8;&#xB044;&#xB7EC;&#xC9D0;','&#xADF8;&#xB9B0; &#xC2A4;&#xD53C;&#xB4DC; &#xAC10;&#xC18C;','&#xC2DC;&#xC57C; &#xC81C;&#xD55C;'],c:2},
{q:'&#xC555;&#xBC15; &#xC0C1;&#xD669;&#xC5D0;&#xC11C; &#xAC00;&#xC7A5; &#xD6A8;&#xACFC;&#xC801;&#xC778; &#xB300;&#xCC98;&#xBC95;&#xC740;?',a:['&#xBE60;&#xB9AC; &#xC2A4;&#xC719;&#xD558;&#xAE30;','&#xD638;&#xD761; &#xC870;&#xC808; &#xB8E8;&#xD2F4;','&#xBAA9;&#xD45C;&#xB97C; &#xB354; &#xB192;&#xAC8C; &#xC124;&#xC815;','&#xD074;&#xB7FD;&#xC744; &#xBC14;&#xAFB8;&#xAE30;'],c:1},
{q:'Course Rating 72.0, Slope 130&#xC778; &#xCF54;&#xC2A4;&#xC758; &#xB09C;&#xC774;&#xB3C4;&#xB294;?',a:['&#xC27D;&#xC74C;','&#xBCF4;&#xD1B5;','&#xC5B4;&#xB824;&#xC6C0;','&#xB9E4;&#xC6B0; &#xC5B4;&#xB824;&#xC6C0;'],c:2},
{q:'&#xC7A5;&#xBE44; &#xAD00;&#xB9AC;&#xC5D0;&#xC11C; &#xADF8;&#xB9BD; &#xAD50;&#xCCB4; &#xAD8C;&#xC7A5; &#xC8FC;&#xAE30;&#xB294;?',a:['3&#xAC1C;&#xC6D4;','6&#xAC1C;&#xC6D4;','1&#xB144;','2&#xB144;'],c:1},
{q:'PGA &#xD22C;&#xC5B4; &#xD3C9;&#xADE0; &#xD37C;&#xD305; &#xC218;&#xB294;?',a:['26-28','28-30','30-32','32-34'],c:1},
{q:'&#xC2A4;&#xC719; &#xD15C;&#xD3EC;&#xAC00; &#xB108;&#xBB34; &#xBE60;&#xB974;&#xBA74; &#xBC1C;&#xC0DD;&#xD558;&#xB294; &#xBB38;&#xC81C;&#xB294;?',a:['&#xBE44;&#xAC70;&#xB9AC; &#xAC10;&#xC18C;','&#xC2AC;&#xB77C;&#xC774;&#xC2A4; &#xBC1C;&#xC0DD;','&#xC815;&#xD655;&#xB3C4;/&#xC77C;&#xAD00;&#xC131; &#xC800;&#xD558;','&#xBC31;&#xC2A4;&#xD540; &#xC99D;&#xAC00;'],c:2}
];
var quizState26={idx:0,score:0,total:0,answered:false};
function showQuizV26(){
playSfx('nav_v26');
var pn=getPanel('quizv26');
var idx=quizState26.idx;
var q=QUIZ_V26[idx%QUIZ_V26.length];
var html='<button class="v26-close" onclick="window._v26Close(\'quizv26\')">&times;</button>';
html+='<div class="v26-title">&#x1F4DA; Golf Quiz v26 (Q'+(idx+1)+'/'+QUIZ_V26.length+')</div>';
html+='<div class="v26-card"><h3>'+q.q+'</h3>';
for(var i=0;i<q.a.length;i++){
html+='<button class="v26-btn" style="width:100%;margin:3px 0;text-align:left" onclick="window._v26AnswerQuiz('+i+','+q.c+')">'+String.fromCharCode(65+i)+'. '+q.a[i]+'</button>';
}
html+='</div>';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v26-stat-card"><div class="v26-stat-val" style="color:#00FF88">'+quizState26.score+'</div><div class="v26-stat-label">&#xC815;&#xB2F5;</div></div>';
html+='<div class="v26-stat-card"><div class="v26-stat-val" style="color:#FF6B6B">'+(quizState26.total-quizState26.score)+'</div><div class="v26-stat-label">&#xC624;&#xB2F5;</div></div>';
var pct=quizState26.total>0?Math.round(quizState26.score*100/quizState26.total):0;
html+='<div class="v26-stat-card"><div class="v26-stat-val" style="color:#FFB800">'+pct+'%</div><div class="v26-stat-label">&#xC815;&#xB2F5;&#xB960;</div></div>';
html+='<div class="v26-stat-card"><div class="v26-stat-val" style="color:#A855F7">'+(idx+1)+'/'+QUIZ_V26.length+'</div><div class="v26-stat-label">&#xC9C4;&#xD589;</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('quizv26');
}
window._v26AnswerQuiz=function(sel,correct){
if(quizState26.answered)return;quizState26.answered=true;quizState26.total++;
if(sel===correct){quizState26.score++;playSfx('quiz_correct_v26');showToast('&#xC815;&#xB2F5;!');}
else{playSfx('quiz_wrong_v26');showToast('&#xC624;&#xB2F5;! &#xC815;&#xB2F5;: '+String.fromCharCode(65+correct));}
lsSet('quiz_v26_score',quizState26.score);lsSet('quiz_v26_total',quizState26.total);
setTimeout(function(){quizState26.answered=false;quizState26.idx++;if(quizState26.idx>=QUIZ_V26.length)quizState26.idx=0;checkAchievements();showQuizV26();},1200);
};

// ===== ACHIEVEMENTS (12) =====
var ACHIEVEMENTS_V26=[
{id:'tempo_analyst',name:'Tempo Analyst',desc:'&#xD15C;&#xD3EC; 10&#xD68C; &#xCE21;&#xC815;',check:function(){return lsGet('tempo_log',[]).length>=10}},
{id:'sg_expert',name:'SG Expert',desc:'SG 5&#xB77C;&#xC6B4;&#xB4DC; &#xAE30;&#xB85D;',check:function(){return lsGet('sg_deep_log',[]).length>=5}},
{id:'mental_coach',name:'Mental Coach',desc:'&#xBA58;&#xD0C8; 5&#xD68C; &#xD3C9;&#xAC00;',check:function(){return lsGet('mental_log',[]).length>=5}},
{id:'course_rater',name:'Course Rater',desc:'&#xCF54;&#xC2A4; 3&#xAC1C; &#xD3C9;&#xAC00;',check:function(){return lsGet('course_diff_log',[]).length>=3}},
{id:'equip_manager',name:'Equipment Manager',desc:'&#xC7A5;&#xBE44; 8&#xAC1C; &#xB4F1;&#xB85D;',check:function(){return Object.keys(lsGet('equip_wear',{})).length>=8}},
{id:'score_predictor',name:'Score Predictor',desc:'&#xC2A4;&#xCF54;&#xC5B4; 10&#xB77C;&#xC6B4;&#xB4DC; &#xAE30;&#xB85D;',check:function(){return lsGet('score_pred_log',[]).length>=10}},
{id:'weather_watcher',name:'Weather Watcher',desc:'&#xB0A0;&#xC528; 5&#xD68C; &#xAE30;&#xB85D;',check:function(){return lsGet('weather_log',[]).length>=5}},
{id:'dash_master',name:'Dashboard Master',desc:'&#xB300;&#xC2DC;&#xBCF4;&#xB4DC; 5&#xD68C; &#xD3C9;&#xAC00;',check:function(){return lsGet('dash_log',[]).length>=5}},
{id:'quiz_v26_master',name:'Quiz v26 Master',desc:'v26 &#xD038;&#xC988; &#xC804;&#xBB38; &#xC815;&#xB2F5;',check:function(){return lsGet('quiz_v26_score',0)>=15}},
{id:'quiz_v26_clear',name:'Quiz v26 Clear',desc:'v26 &#xD038;&#xC988; &#xC644;&#xC8FC;',check:function(){return lsGet('quiz_v26_total',0)>=15}},
{id:'tempo_s_grade',name:'Tempo S Grade',desc:'&#xD15C;&#xD3EC; S&#xB4F1;&#xAE09; &#xD68D;&#xB4DD;',check:function(){var log=lsGet('tempo_log',[]);for(var i=0;i<log.length;i++){if(log[i].ratio>=2.8&&log[i].ratio<=3.2)return true;}return false}},
{id:'v26_complete',name:'v26 Complete',desc:'v26 &#xC804;&#xCCB4; &#xAE30;&#xB2A5; &#xD0D0;&#xC0C9;',check:function(){return lsGet('v26_explored',0)>=8}}
];
function checkAchievements(){
var unlocked=lsGet('achievements_v26',[]);
for(var i=0;i<ACHIEVEMENTS_V26.length;i++){
var a=ACHIEVEMENTS_V26[i];
if(unlocked.indexOf(a.id)===-1&&a.check()){
unlocked.push(a.id);lsSet('achievements_v26',unlocked);
playSfx('achieve_v26');showToast('\u{1F3C6} '+a.name+' unlocked!');
}
}
}
var explored=lsGet('v26_explored',0);
function markExplored(){explored++;lsSet('v26_explored',explored);}

// ===== CSS =====
var style=document.createElement('style');
style.textContent='.v26-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:10020;display:none;align-items:center;justify-content:center;padding:16px;overflow-y:auto}.v26-overlay.active{display:flex}.v26-panel{background:#14141a;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:20px;max-width:660px;width:100%;max-height:90vh;overflow-y:auto;position:relative}.v26-close{position:absolute;top:12px;right:12px;background:none;border:none;color:#fff;font-size:24px;cursor:pointer;z-index:2;opacity:0.7}.v26-close:hover{opacity:1}.v26-title{font-size:18px;font-weight:bold;color:#fff;margin-bottom:12px;text-align:center}.v26-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;margin:8px 0}.v26-card h3{font-size:13px;color:rgba(255,255,255,0.7);margin-bottom:6px}.v26-label{font-size:10px;color:rgba(255,255,255,0.5);display:block;margin-bottom:2px}.v26-input{width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:6px;color:#fff;padding:6px 8px;font-size:12px;outline:none;box-sizing:border-box}.v26-input:focus{border-color:#00D4B4}.v26-btn{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);border-radius:8px;color:#fff;padding:8px 12px;font-size:12px;cursor:pointer;transition:all 0.2s}.v26-btn:hover{background:rgba(255,255,255,0.12)}.v26-btn-primary{background:rgba(0,212,180,0.15);border-color:rgba(0,212,180,0.3);color:#00D4B4}.v26-btn-primary:hover{background:rgba(0,212,180,0.25)}.v26-btn-sm{padding:6px 8px;font-size:11px}.v26-stat-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:10px;text-align:center}.v26-stat-val{font-size:18px;font-weight:bold}.v26-stat-label{font-size:9px;color:rgba(255,255,255,0.5);margin-top:2px}.v26-toast{position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(20px);background:rgba(0,212,180,0.15);border:1px solid rgba(0,212,180,0.3);color:#00D4B4;padding:10px 20px;border-radius:10px;font-size:13px;z-index:10030;opacity:0;transition:all 0.3s}.v26-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}';
document.head.appendChild(style);

// ===== NAVIGATION =====
window._v26Close=function(id){closePanel(id);};
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
{label:'Tempo',fn:showTempoAnalyzer,icon:'&#x23F1;'},
{label:'SGDeep',fn:showStrokesGained,icon:'&#x1F4C9;'},
{label:'Mental',fn:showMentalTracker,icon:'&#x1F9E0;'},
{label:'CourseDif',fn:showCourseDifficulty,icon:'&#x26F3;'},
{label:'EquipWear',fn:showEquipWear,icon:'&#x1F3CC;'},
{label:'ScorePred',fn:showScorePredictor,icon:'&#x1F52E;'},
{label:'Weather',fn:showWeatherImpact,icon:'&#x1F326;'},
{label:'Dashboard',fn:showRoundDashboard,icon:'&#x1F4CA;'},
{label:'Quiz26',fn:showQuizV26,icon:'&#x1F4DA;'}
];
for(var i=0;i<btns.length;i++){
(function(b){
var btn=document.createElement('button');
btn.innerHTML=b.icon+'<br><span style="font-size:8px">'+b.label+'</span>';
btn.style.cssText='background:rgba(0,212,180,0.12);border:1px solid rgba(0,212,180,0.25);border-radius:8px;color:#00D4B4;padding:6px 4px;font-size:12px;cursor:pointer;min-width:44px;flex:0 0 auto;margin:2px';
btn.addEventListener('click',function(){b.fn();markExplored();});
nav.appendChild(btn);
})(btns[i]);
}
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown',function(e){
if(!e.shiftKey)return;
switch(e.key){
case'Q':case'q':showTempoAnalyzer();markExplored();break;
case'W':case'w':showStrokesGained();markExplored();break;
case'E':case'e':showMentalTracker();markExplored();break;
case'R':case'r':showCourseDifficulty();markExplored();break;
case'T':case't':showEquipWear();markExplored();break;
case'Y':case'y':showScorePredictor();markExplored();break;
case'U':case'u':showWeatherImpact();markExplored();break;
case'I':case'i':showRoundDashboard();markExplored();break;
case'0':showQuizV26();markExplored();break;
}
});

// ===== INIT =====
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',addNavButtons);}
else{setTimeout(addNavButtons,2000);}
setTimeout(checkAchievements,4000);
})();
