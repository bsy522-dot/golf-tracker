(function(){
'use strict';
var LS='gt_v19_';
var audioCtx=null;
function getAC(){if(!audioCtx)try{audioCtx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}return audioCtx}
function playSfx(type){var ac=getAC();if(!ac)return;var o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);var t=ac.currentTime;g.gain.setValueAtTime(0.1,t);switch(type){case'approach_open':o.type='sine';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(587,t+0.07);o.frequency.linearRampToValueAtTime(784,t+0.14);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'approach_calc':o.type='triangle';o.frequency.setValueAtTime(587,t);o.frequency.linearRampToValueAtTime(784,t+0.08);o.frequency.linearRampToValueAtTime(988,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'dispersion_open':o.type='sine';o.frequency.setValueAtTime(392,t);o.frequency.linearRampToValueAtTime(494,t+0.06);o.frequency.linearRampToValueAtTime(659,t+0.12);g.gain.exponentialRampToValueAtTime(0.01,t+0.25);o.start(t);o.stop(t+0.25);break;case'fatigue_open':o.type='triangle';o.frequency.setValueAtTime(330,t);o.frequency.linearRampToValueAtTime(440,t+0.1);g.gain.exponentialRampToValueAtTime(0.01,t+0.2);o.start(t);o.stop(t+0.2);break;case'fatigue_warn':o.type='sawtooth';o.frequency.setValueAtTime(220,t);o.frequency.linearRampToValueAtTime(185,t+0.15);g.gain.setValueAtTime(0.06,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'sg_open':o.type='sine';o.frequency.setValueAtTime(494,t);o.frequency.linearRampToValueAtTime(659,t+0.08);o.frequency.linearRampToValueAtTime(784,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'penalty_open':o.type='triangle';o.frequency.setValueAtTime(370,t);o.frequency.linearRampToValueAtTime(494,t+0.06);o.frequency.linearRampToValueAtTime(622,t+0.12);g.gain.exponentialRampToValueAtTime(0.01,t+0.25);o.start(t);o.stop(t+0.25);break;case'lie_open':o.type='sine';o.frequency.setValueAtTime(349,t);o.frequency.linearRampToValueAtTime(523,t+0.1);g.gain.exponentialRampToValueAtTime(0.01,t+0.2);o.start(t);o.stop(t+0.2);break;case'course_open':o.type='sine';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(659,t+0.06);o.frequency.linearRampToValueAtTime(784,t+0.12);o.frequency.linearRampToValueAtTime(988,t+0.18);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'muscle_open':o.type='triangle';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(587,t+0.08);o.frequency.linearRampToValueAtTime(698,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'quiz_correct':o.type='sine';o.frequency.setValueAtTime(659,t);o.frequency.setValueAtTime(784,t+0.08);o.frequency.setValueAtTime(988,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'quiz_wrong':o.type='sawtooth';o.frequency.setValueAtTime(220,t);o.frequency.linearRampToValueAtTime(165,t+0.2);g.gain.setValueAtTime(0.06,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'v19_achieve':o.type='sine';o.frequency.setValueAtTime(784,t);o.frequency.setValueAtTime(988,t+0.1);o.frequency.setValueAtTime(1175,t+0.2);o.frequency.setValueAtTime(1568,t+0.3);g.gain.exponentialRampToValueAtTime(0.01,t+0.5);o.start(t);o.stop(t+0.5);break;default:o.type='sine';o.frequency.setValueAtTime(440,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.15);o.start(t);o.stop(t+0.15)}}

function lsGet(k,d){try{var v=localStorage.getItem(LS+k);return v?JSON.parse(v):d}catch(e){return d}}
function lsSet(k,v){try{localStorage.setItem(LS+k,JSON.stringify(v))}catch(e){}}
function todayStr(){return new Date().toISOString().slice(0,10)}
function showToast(msg){var t=document.createElement('div');t.className='v19-toast';t.textContent=msg;document.body.appendChild(t);setTimeout(function(){t.classList.add('show')},50);setTimeout(function(){t.classList.remove('show');setTimeout(function(){t.remove()},400)},3000)}
function createOverlay(id){var ov=document.createElement('div');ov.className='v19-overlay';ov.id='v19-'+id;ov.addEventListener('click',function(e){if(e.target===ov)closePanel(id)});var pn=document.createElement('div');pn.className='v19-panel';pn.style.position='relative';ov.appendChild(pn);return pn}
function openPanel(id){var el=document.getElementById('v19-'+id);if(el)el.classList.add('active')}
function closePanel(id){var el=document.getElementById('v19-'+id);if(el)el.classList.remove('active')}
function getPanel(id){var ov=document.getElementById('v19-'+id);if(!ov){var pn=createOverlay(id);pn.id='v19-'+id+'-panel';document.body.appendChild(pn.parentElement);return pn}return ov.querySelector('.v19-panel')||ov}

// ===== 1. APPROACH SHOT SELECTOR Canvas 600x380 =====
function showApproachSelector(){
playSfx('approach_open');
var pn=getPanel('approach');
var data=lsGet('approach_log',[]);
var CLUBS=['3I','4I','5I','6I','7I','8I','9I','PW','AW','SW','LW'];
var LIES=['페어웨이','러프','벙커','프린지','디볃','베어'];
var html='<button class="v19-close" onclick="window._v19Close(\'approach\')">&times;</button>';
html+='<div class="v19-title">🎯 어프로치 샷 셀렉터</div>';
html+='<div class="v19-card"><h3>샷 조건 입력</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v19-label">거리 (yd)</label><input type="number" id="v19-ap-dist" class="v19-input" value="150" min="30" max="280"></div>';
html+='<div><label class="v19-label">바람 (km/h)</label><input type="number" id="v19-ap-wind" class="v19-input" value="10" min="0" max="50"></div>';
html+='<div><label class="v19-label">풍향 (&deg;)</label><input type="number" id="v19-ap-wdir" class="v19-input" value="0" min="0" max="359"></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:6px">';
html+='<div><label class="v19-label">경사 (%)</label><input type="number" id="v19-ap-slope" class="v19-input" step="0.5" value="0" min="-10" max="10"></div>';
html+='<div><label class="v19-label">라이</label><select id="v19-ap-lie" class="v19-input">';
for(var li=0;li<LIES.length;li++) html+='<option>'+LIES[li]+'</option>';
html+='</select></div>';
html+='<div><label class="v19-label">핀위치</label><select id="v19-ap-pin" class="v19-input"><option>앞</option><option>중앙</option><option>뒤</option><option>왼</option><option>오른</option></select></div>';
html+='</div>';
html+='<button class="v19-btn v19-btn-primary" style="width:100%;margin-top:8px" onclick="window._v19CalcApproach()">클럽 추천</button>';
html+='</div>';
html+='<canvas id="v19-ap-canvas" width="600" height="380" style="width:100%;max-width:600px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';
html+='<div id="v19-ap-result"></div>';
var totalShots=data.length;var gir=0;for(var si=0;si<data.length;si++)if(data[si].gir)gir++;
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v19-stat-card"><div class="v19-stat-val" style="color:#00FF88">'+totalShots+'</div><div class="v19-stat-label">총 어프로치</div></div>';
html+='<div class="v19-stat-card"><div class="v19-stat-val" style="color:#FFB800">'+(totalShots>0?Math.round(gir/totalShots*100):0)+'%</div><div class="v19-stat-label">GIR 성공률</div></div>';
html+='<div class="v19-stat-card"><div class="v19-stat-val" style="color:#00B4D8">'+gir+'</div><div class="v19-stat-label">GIR 성공</div></div>';
html+='</div>';
if(data.length>0){html+='<button class="v19-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'어프로치 데이터 초기화?\'))window._v19ResetApproach()">초기화</button>';}
pn.innerHTML=html;openPanel('approach');drawApproachCanvas([]);
}
window._v19CalcApproach=function(){
var dist=parseInt(document.getElementById('v19-ap-dist').value)||150;
var wind=parseInt(document.getElementById('v19-ap-wind').value)||0;
var wdir=parseInt(document.getElementById('v19-ap-wdir').value)||0;
var slope=parseFloat(document.getElementById('v19-ap-slope').value)||0;
var lie=document.getElementById('v19-ap-lie').value;
var pin=document.getElementById('v19-ap-pin').value;
var windRad=wdir*Math.PI/180;var headwind=Math.cos(windRad)*wind;var crosswind=Math.sin(windRad)*wind;
var adjDist=dist+slope*1.5+headwind*0.8;
var lieMod={'페어웨이':0,'러프':8,'벙커':15,'프린지':5,'디볃':-5,'베어':3};
adjDist+=(lieMod[lie]||0);
var clubDists=[{c:'3I',d:205},{c:'4I',d:190},{c:'5I',d:178},{c:'6I',d:165},{c:'7I',d:153},{c:'8I',d:140},{c:'9I',d:128},{c:'PW',d:115},{c:'AW',d:100},{c:'SW',d:85},{c:'LW',d:65}];
var recs=[];for(var i=0;i<clubDists.length;i++){var diff=Math.abs(clubDists[i].d-adjDist);recs.push({club:clubDists[i].c,nom:clubDists[i].d,diff:diff,pct:Math.max(0,100-diff*1.2)})}
recs.sort(function(a,b){return a.diff-b.diff});
var top3=recs.slice(0,3);
playSfx('approach_calc');
drawApproachCanvas(top3);
var rd=document.getElementById('v19-ap-result');
if(rd){var rh='<div class="v19-card"><h3>🎯 추천 클럽 (보정거리: '+Math.round(adjDist)+'yd)</h3>';
rh+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:8px">';
for(var ri=0;ri<top3.length;ri++){var col=ri===0?'#00FF88':ri===1?'#FFB800':'#00B4D8';
rh+='<div class="v19-stat-card" style="border-color:'+col+'"><div class="v19-stat-val" style="color:'+col+'">'+top3[ri].club+'</div><div class="v19-stat-label">'+top3[ri].nom+'yd ('+Math.round(top3[ri].pct)+'%)</div></div>'}
rh+='</div>';
rh+='<div style="font-size:.8em;color:#aaa;margin-top:8px">풍향보정: '+(headwind>0?'+':'')+Math.round(headwind*0.8)+'yd | 경사: '+(slope>0?'+':'')+Math.round(slope*1.5)+'yd | 라이: '+(lieMod[lie]>0?'+':'')+lieMod[lie]+'yd | 크로스윈드: '+Math.round(Math.abs(crosswind))+'km/h</div>';
rh+='<button class="v19-btn" style="width:100%;margin-top:8px" onclick="window._v19LogApproach(\''+top3[0].club+'\','+Math.round(adjDist)+')">이 샷 GIR 성공으로 기록</button>';
rh+='<button class="v19-btn" style="width:100%;margin-top:4px;border-color:rgba(255,107,107,.2);color:#ff6b6b" onclick="window._v19LogApproach(\''+top3[0].club+'\','+Math.round(adjDist)+',true)">GIR 실패로 기록</button>';
rh+='</div>';
rd.innerHTML=rh}
};
window._v19LogApproach=function(club,dist,miss){var data=lsGet('approach_log',[]);data.push({club:club,dist:dist,gir:!miss,date:todayStr()});if(data.length>500)data=data.slice(-500);lsSet('approach_log',data);showToast(club+' '+dist+'yd '+(miss?'GIR 실패':'GIR 성공'));showApproachSelector()};
window._v19ResetApproach=function(){lsSet('approach_log',[]);showApproachSelector()};
function drawApproachCanvas(recs){
var c=document.getElementById('v19-ap-canvas');if(!c)return;
var ctx=c.getContext('2d');var W=600,H=380;
ctx.fillStyle='#0c1018';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00FF88';ctx.font='bold 15px sans-serif';ctx.fillText('Approach Shot Selector',20,28);
ctx.fillStyle='#555';ctx.font='11px sans-serif';ctx.fillText('Club Recommendation by Adjusted Distance',20,46);
var gx=W/2,gy=H/2+30,gr=100;
ctx.strokeStyle='rgba(0,180,0,0.3)';ctx.lineWidth=2;ctx.beginPath();ctx.arc(gx,gy,gr,0,Math.PI*2);ctx.stroke();
ctx.fillStyle='rgba(0,180,0,0.06)';ctx.beginPath();ctx.arc(gx,gy,gr,0,Math.PI*2);ctx.fill();
ctx.strokeStyle='rgba(0,255,136,0.2)';for(var ring=20;ring<gr;ring+=20){ctx.beginPath();ctx.arc(gx,gy,ring,0,Math.PI*2);ctx.stroke()}
ctx.fillStyle='#FF3366';ctx.beginPath();ctx.arc(gx,gy-gr*0.15,4,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#FFB800';ctx.font='10px sans-serif';ctx.fillText('PIN',gx+6,gy-gr*0.15+4);
if(recs.length>0){
var colors=['#00FF88','#FFB800','#00B4D8'];
for(var i=0;i<recs.length;i++){var angle=-Math.PI/2+i*0.7-0.7;var spread=(100-recs[i].pct)*0.8+10;var dx=gx+Math.cos(angle)*spread;var dy=gy+Math.sin(angle)*spread;ctx.globalAlpha=0.6;ctx.fillStyle=colors[i];ctx.beginPath();ctx.arc(dx,dy,14-i*3,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;ctx.fillStyle='#fff';ctx.font='bold 11px sans-serif';ctx.fillText(recs[i].club,dx-8,dy+4)}
}else{ctx.fillStyle='#444';ctx.font='13px sans-serif';ctx.fillText('Enter conditions and press calculate',gx-120,gy+gr+30)}
ctx.fillStyle='#333';ctx.font='9px sans-serif';ctx.fillText('20yd',gx+22,gy-2);ctx.fillText('40yd',gx+42,gy-2);ctx.fillText('60yd',gx+62,gy-2);ctx.fillText('80yd',gx+82,gy-2);ctx.fillText('100yd',gx+gr+4,gy-2);
}

// ===== 2. SHOT DISPERSION PATTERN Canvas 600x380 =====
function showDispersionPattern(){
playSfx('dispersion_open');
var pn=getPanel('dispersion');
var data=lsGet('dispersion_data',[]);
var CLUBS=['DR','3W','5W','3H','4I','5I','6I','7I','8I','9I','PW','AW','SW','LW'];
var html='<button class="v19-close" onclick="window._v19Close(\'dispersion\')">&times;</button>';
html+='<div class="v19-title">📍 샷 분산 패턴 분석기</div>';
html+='<div class="v19-card"><h3>샷 랝딩 기록</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v19-label">클럽</label><select id="v19-dp-club" class="v19-input">';
for(var ci=0;ci<CLUBS.length;ci++) html+='<option>'+CLUBS[ci]+'</option>';
html+='</select></div>';
html+='<div><label class="v19-label">좌우 (yd)</label><input type="number" id="v19-dp-lr" class="v19-input" value="0" min="-40" max="40"></div>';
html+='<div><label class="v19-label">장단 (yd)</label><input type="number" id="v19-dp-fb" class="v19-input" value="0" min="-30" max="30"></div>';
html+='<div style="display:flex;align-items:flex-end"><button class="v19-btn v19-btn-primary" style="width:100%" onclick="window._v19RecordDP()">기록</button></div>';
html+='</div></div>';
html+='<div style="margin-bottom:8px"><label class="v19-label">클럽 필터</label><select id="v19-dp-filter" class="v19-input" onchange="window._v19RedrawDP()">';
html+='<option value="ALL">전체</option>';
for(var fi=0;fi<CLUBS.length;fi++) html+='<option>'+CLUBS[fi]+'</option>';
html+='</select></div>';
html+='<canvas id="v19-dp-canvas" width="600" height="380" style="width:100%;max-width:600px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';
var totalShots=data.length;var avgLR=0,avgFB=0,spreadLR=0;
if(totalShots>0){var sLR=0,sFB=0;for(var di=0;di<data.length;di++){sLR+=data[di].lr;sFB+=data[di].fb}avgLR=Math.round(sLR/totalShots*10)/10;avgFB=Math.round(sFB/totalShots*10)/10;var vLR=0;for(var dj=0;dj<data.length;dj++){vLR+=Math.pow(data[dj].lr-avgLR,2)}spreadLR=Math.round(Math.sqrt(vLR/totalShots)*10)/10}
var tendLabel=avgLR<-3?'Left Tendency':avgLR>3?'Right Tendency':'Centered';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v19-stat-card"><div class="v19-stat-val" style="color:#00FF88">'+totalShots+'</div><div class="v19-stat-label">총 샷</div></div>';
html+='<div class="v19-stat-card"><div class="v19-stat-val" style="color:#FFB800">'+avgLR+'</div><div class="v19-stat-label">평균 좌우</div></div>';
html+='<div class="v19-stat-card"><div class="v19-stat-val" style="color:#00B4D8">&plusmn;'+spreadLR+'</div><div class="v19-stat-label">분산도</div></div>';
html+='<div class="v19-stat-card"><div class="v19-stat-val" style="color:#A855F7;font-size:.9em">'+tendLabel+'</div><div class="v19-stat-label">경향</div></div>';
html+='</div>';
if(data.length>0){html+='<button class="v19-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'분산 데이터 초기화?\'))window._v19ResetDP()">초기화</button>';}
pn.innerHTML=html;openPanel('dispersion');drawDPCanvas(data,'ALL');
}
window._v19RecordDP=function(){var club=document.getElementById('v19-dp-club').value;var lr=parseInt(document.getElementById('v19-dp-lr').value)||0;var fb=parseInt(document.getElementById('v19-dp-fb').value)||0;var data=lsGet('dispersion_data',[]);data.push({club:club,lr:lr,fb:fb,date:todayStr()});if(data.length>500)data=data.slice(-500);lsSet('dispersion_data',data);playSfx('approach_calc');showToast(club+' 샷 기록 ('+lr+','+fb+')');showDispersionPattern()};
window._v19ResetDP=function(){lsSet('dispersion_data',[]);showDispersionPattern()};
window._v19RedrawDP=function(){var filter=document.getElementById('v19-dp-filter').value;var data=lsGet('dispersion_data',[]);drawDPCanvas(data,filter)};
function drawDPCanvas(data,filter){
var c=document.getElementById('v19-dp-canvas');if(!c)return;
var ctx=c.getContext('2d');var W=600,H=380;
ctx.fillStyle='#0c1018';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00FF88';ctx.font='bold 15px sans-serif';ctx.fillText('Shot Dispersion Pattern',20,28);
ctx.fillStyle='#555';ctx.font='11px sans-serif';ctx.fillText('Landing Pattern: '+(filter==='ALL'?'All Clubs':filter),20,46);
var cx=W/2,cy=H/2+15;var scale=3.5;
ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.lineWidth=1;
for(var r=10;r<=40;r+=10){ctx.beginPath();ctx.arc(cx,cy,r*scale,0,Math.PI*2);ctx.stroke();ctx.fillStyle='#444';ctx.font='9px sans-serif';ctx.fillText(r+'yd',cx+r*scale+2,cy-4)}
ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.beginPath();ctx.moveTo(cx-160,cy);ctx.lineTo(cx+160,cy);ctx.stroke();ctx.beginPath();ctx.moveTo(cx,cy-140);ctx.lineTo(cx,cy+140);ctx.stroke();
ctx.fillStyle='#FF3366';ctx.beginPath();ctx.arc(cx,cy,5,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#888';ctx.font='9px sans-serif';ctx.fillText('TARGET',cx+8,cy-8);ctx.fillText('← LEFT',cx-155,cy-6);ctx.fillText('RIGHT →',cx+115,cy-6);ctx.fillText('LONG ↑',cx+4,cy-132);ctx.fillText('SHORT ↓',cx+4,cy+140);
var filtered=filter==='ALL'?data:data.filter(function(d){return d.club===filter});
var colors={'DR':'#FF6B6B','3W':'#FF9F43','5W':'#FECA57','3H':'#48DBFB','4I':'#00D2D3','5I':'#54A0FF','6I':'#5F27CD','7I':'#A855F7','8I':'#00FF88','9I':'#10AC84','PW':'#F368E0','AW':'#C44569','SW':'#FFB800','LW':'#778CA3'};
for(var i=0;i<filtered.length;i++){var d=filtered[i];var px=cx+d.lr*scale;var py=cy-d.fb*scale;ctx.globalAlpha=0.65;ctx.fillStyle=colors[d.club]||'#00FF88';ctx.beginPath();ctx.arc(px,py,4,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1}
if(filtered.length>=3){var sLR=0,sFB=0;for(var mi=0;mi<filtered.length;mi++){sLR+=filtered[mi].lr;sFB+=filtered[mi].fb}var mLR=sLR/filtered.length;var mFB=sFB/filtered.length;ctx.fillStyle='rgba(255,184,0,0.8)';ctx.beginPath();ctx.arc(cx+mLR*scale,cy-mFB*scale,6,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#FFB800';ctx.lineWidth=1;ctx.stroke();ctx.fillStyle='#FFB800';ctx.font='bold 9px sans-serif';ctx.fillText('AVG',cx+mLR*scale+8,cy-mFB*scale+4)}
}

// ===== 3. ROUND FATIGUE MONITOR Canvas 580x360 =====
function showFatigueMonitor(){
playSfx('fatigue_open');
var pn=getPanel('fatigue');
var data=lsGet('fatigue_data',{});
var METRICS=['체력','집중력','자신감','멘탈 안정','스윙 템포','판단력'];
var html='<button class="v19-close" onclick="window._v19Close(\'fatigue\')">&times;</button>';
html+='<div class="v19-title">🚨 라운드 피로도 모니터</div>';
html+='<div class="v19-card"><h3>홈별 피로도 측정 (현재)</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v19-label">현재 홈</label><select id="v19-fg-hole" class="v19-input">';
for(var h=1;h<=18;h++) html+='<option value="'+h+'">'+h+'번 홈</option>';
html+='</select></div>';
html+='<div style="display:flex;align-items:flex-end"><button class="v19-btn v19-btn-primary" style="width:100%" onclick="window._v19SaveFatigue()">측정 저장</button></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:8px">';
for(var mi=0;mi<METRICS.length;mi++){var curHole=data.currentHole||1;var curVal=data['h'+curHole]?data['h'+curHole][mi]||5:5;html+='<div><label class="v19-label">'+METRICS[mi]+' (1~10)</label><input type="range" id="v19-fg-m'+mi+'" class="v19-input" min="1" max="10" value="'+curVal+'" style="padding:4px 0" oninput="document.getElementById(\'v19-fg-v'+mi+'\').textContent=this.value"><span id="v19-fg-v'+mi+'" style="color:#00FF88;font-size:.85em;font-weight:800">'+curVal+'</span></div>'}
html+='</div></div>';
html+='<canvas id="v19-fg-canvas" width="580" height="360" style="width:100%;max-width:580px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';
var filledHoles=0;var totalFatigue=0;var dangerHoles=0;
for(var fh=1;fh<=18;fh++){if(data['h'+fh]){filledHoles++;var hAvg=0;for(var fm=0;fm<6;fm++)hAvg+=data['h'+fh][fm]||5;hAvg/=6;totalFatigue+=hAvg;if(hAvg<4)dangerHoles++}}
var avgLevel=filledHoles>0?Math.round(totalFatigue/filledHoles*10)/10:0;
var alertLevel=avgLevel>=7?'양호':avgLevel>=5?'보통':avgLevel>=3?'주의':'위험';
var alertColor=avgLevel>=7?'#00FF88':avgLevel>=5?'#FFB800':avgLevel>=3?'#FF9F43':'#FF3366';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v19-stat-card"><div class="v19-stat-val" style="color:#00FF88">'+filledHoles+'/18</div><div class="v19-stat-label">측정완료</div></div>';
html+='<div class="v19-stat-card"><div class="v19-stat-val" style="color:#FFB800">'+avgLevel+'</div><div class="v19-stat-label">평균 상태</div></div>';
html+='<div class="v19-stat-card"><div class="v19-stat-val" style="color:'+alertColor+'">'+alertLevel+'</div><div class="v19-stat-label">종합 판정</div></div>';
html+='<div class="v19-stat-card"><div class="v19-stat-val" style="color:#FF3366">'+dangerHoles+'</div><div class="v19-stat-label">위험 홈</div></div>';
html+='</div>';
html+='<div class="v19-card"><h3>💡 피로도 관리 팁</h3><div style="font-size:.82em;color:#aaa;line-height:1.7">';
html+='<div>• 10~14홈에서 집중력이 급감하면 휴식 필요</div>';
html+='<div>• 수분 보충: 3홈마다 물 섭취</div>';
html+='<div>• 멘탈 불안정시 프리샷 루틴 강화</div>';
html+='</div></div>';
if(filledHoles>0){html+='<button class="v19-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'피로도 초기화?\'))window._v19ResetFatigue()">초기화</button>';}
pn.innerHTML=html;openPanel('fatigue');drawFatigueCanvas(data,METRICS);
}
window._v19SaveFatigue=function(){var hole=parseInt(document.getElementById('v19-fg-hole').value)||1;var data=lsGet('fatigue_data',{});var vals=[];for(var i=0;i<6;i++){vals.push(parseInt(document.getElementById('v19-fg-m'+i).value)||5)}data['h'+hole]=vals;data.currentHole=hole;lsSet('fatigue_data',data);var avg=0;for(var j=0;j<6;j++)avg+=vals[j];avg/=6;if(avg<4)playSfx('fatigue_warn');else playSfx('approach_calc');showToast(hole+'번 홈 피로도 저장 (평균:'+Math.round(avg*10)/10+')');showFatigueMonitor()};
window._v19ResetFatigue=function(){lsSet('fatigue_data',{});showFatigueMonitor()};
function drawFatigueCanvas(data,METRICS){
var c=document.getElementById('v19-fg-canvas');if(!c)return;
var ctx=c.getContext('2d');var W=580,H=360;
ctx.fillStyle='#0c1018';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00FF88';ctx.font='bold 15px sans-serif';ctx.fillText('Round Fatigue Monitor',20,28);
ctx.fillStyle='#555';ctx.font='11px sans-serif';ctx.fillText('6-Metric Energy Level by Hole',20,46);
var padL=50,padR=20,padT=65,padB=50;var chartW=W-padL-padR,chartH=H-padT-padB;
var colors=['#00FF88','#00B4D8','#FFB800','#A855F7','#FF9F43','#FF6B6B'];
for(var gy=0;gy<=10;gy+=2){var yy=padT+chartH-(gy/10)*chartH;ctx.strokeStyle='rgba(255,255,255,0.05)';ctx.beginPath();ctx.moveTo(padL,yy);ctx.lineTo(padL+chartW,yy);ctx.stroke();ctx.fillStyle='#666';ctx.font='10px sans-serif';ctx.fillText(gy+'',padL-18,yy+4)}
ctx.fillStyle='rgba(255,51,102,0.06)';ctx.fillRect(padL,padT+chartH-(4/10)*chartH,chartW,(4/10)*chartH);
for(var mi=0;mi<6;mi++){ctx.strokeStyle=colors[mi];ctx.lineWidth=1.5;ctx.globalAlpha=0.7;ctx.beginPath();var hasPoints=false;
for(var h=1;h<=18;h++){if(data['h'+h]){var val=data['h'+h][mi]||5;var px=padL+((h-1)/17)*chartW;var py=padT+chartH-(val/10)*chartH;if(!hasPoints){ctx.moveTo(px,py);hasPoints=true}else{ctx.lineTo(px,py)}}}if(hasPoints)ctx.stroke();ctx.globalAlpha=1}
for(var h2=1;h2<=18;h2++){var xx=padL+((h2-1)/17)*chartW;ctx.fillStyle=data['h'+h2]?'#ccc':'#444';ctx.font='9px sans-serif';ctx.fillText(h2+'',xx-3,H-padB+16)}
var legX=padL,legY=H-14;for(var li=0;li<METRICS.length;li++){ctx.fillStyle=colors[li];ctx.fillRect(legX,legY,8,8);ctx.fillStyle='#888';ctx.font='9px sans-serif';ctx.fillText(METRICS[li],legX+11,legY+8);legX+=65+(li<2?10:0)}
}

// ===== 4. STROKES GAINED BREAKDOWN Canvas 600x380 =====
function showSGBreakdown(){
playSfx('sg_open');
var pn=getPanel('sgbreak');
var data=lsGet('sg_breakdown',{});
var CATS=['Tee-to-Green','Approach','Around Green','Putting','Driving Distance','Driving Accuracy'];
var html='<button class="v19-close" onclick="window._v19Close(\'sgbreak\')">&times;</button>';
html+='<div class="v19-title">📈 Strokes Gained 상세 분석</div>';
html+='<div class="v19-card"><h3>SG 값 입력 (라운드 평균)</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:8px">';
for(var ci=0;ci<CATS.length;ci++){html+='<div><label class="v19-label">'+CATS[ci]+'</label><input type="number" id="v19-sg-'+ci+'" class="v19-input" step="0.1" value="'+(data['c'+ci]||0)+'" min="-5" max="5"></div>'}
html+='</div>';
html+='<button class="v19-btn v19-btn-primary" style="width:100%;margin-top:8px" onclick="window._v19SaveSG()">저장</button>';
html+='</div>';
html+='<canvas id="v19-sg-canvas" width="600" height="380" style="width:100%;max-width:600px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';
var totalSG=0;var bestCat='',worstCat='';var bestVal=-999,worstVal=999;
for(var si=0;si<CATS.length;si++){var v=data['c'+si]||0;totalSG+=v;if(v>bestVal){bestVal=v;bestCat=CATS[si]}if(v<worstVal){worstVal=v;worstCat=CATS[si]}}
totalSG=Math.round(totalSG*10)/10;
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v19-stat-card"><div class="v19-stat-val" style="color:'+(totalSG>=0?'#00FF88':'#FF3366')+'">'+((totalSG>=0?'+':'')+totalSG)+'</div><div class="v19-stat-label">총 SG</div></div>';
html+='<div class="v19-stat-card"><div class="v19-stat-val" style="color:#00FF88;font-size:.75em">'+bestCat+'</div><div class="v19-stat-label">강점 (+'+bestVal+')</div></div>';
html+='<div class="v19-stat-card"><div class="v19-stat-val" style="color:#FF3366;font-size:.75em">'+worstCat+'</div><div class="v19-stat-label">약점 ('+worstVal+')</div></div>';
html+='</div>';
html+='<div class="v19-card"><h3>💡 SG 해석 가이드</h3><div style="font-size:.82em;color:#aaa;line-height:1.7">';
html+='<div>• +값: PGA Tour 평균 대비 해당 타수만큼 절약</div>';
html+='<div>• -값: 해당 타수만큼 손해</div>';
html+='<div>• 총 SG = 모든 카테고리 합계</div>';
html+='<div>• 약점 카테고리에 연습 집중 추천</div>';
html+='</div></div>';
pn.innerHTML=html;openPanel('sgbreak');drawSGCanvas(data,CATS);
}
window._v19SaveSG=function(){var data={};for(var i=0;i<6;i++){data['c'+i]=parseFloat(document.getElementById('v19-sg-'+i).value)||0}data.date=todayStr();lsSet('sg_breakdown',data);playSfx('sg_open');showToast('SG 데이터 저장');showSGBreakdown()};
function drawSGCanvas(data,CATS){
var c=document.getElementById('v19-sg-canvas');if(!c)return;
var ctx=c.getContext('2d');var W=600,H=380;
ctx.fillStyle='#0c1018';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00FF88';ctx.font='bold 15px sans-serif';ctx.fillText('Strokes Gained Breakdown',20,28);
ctx.fillStyle='#555';ctx.font='11px sans-serif';ctx.fillText('Performance vs PGA Tour Average',20,46);
var padL=140,padR=40,padT=70,padB=30;var chartW=W-padL-padR,chartH=H-padT-padB;
var barH=chartH/CATS.length-6;var zeroX=padL+chartW/2;
ctx.strokeStyle='rgba(255,255,255,0.15)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(zeroX,padT);ctx.lineTo(zeroX,padT+chartH);ctx.stroke();
ctx.fillStyle='#888';ctx.font='10px sans-serif';ctx.fillText('0',zeroX-3,padT-6);ctx.fillText('-2.0',padL-5,padT-6);ctx.fillText('+2.0',padL+chartW-10,padT-6);
for(var i=0;i<CATS.length;i++){var v=data['c'+i]||0;var y=padT+i*(chartH/CATS.length)+3;var maxSG=2.5;var barPixels=(v/maxSG)*(chartW/2);barPixels=Math.max(Math.min(barPixels,chartW/2),-chartW/2);
var barColor=v>=0.5?'#00FF88':v>=0?'#00B4D8':v>=-0.5?'#FFB800':'#FF3366';
ctx.fillStyle=barColor;ctx.globalAlpha=0.6;
if(barPixels>=0){ctx.fillRect(zeroX,y,barPixels,barH)}
else{ctx.fillRect(zeroX+barPixels,y,-barPixels,barH)}
ctx.globalAlpha=1;
ctx.fillStyle='#ccc';ctx.font='11px sans-serif';ctx.fillText(CATS[i],8,y+barH/2+4);
ctx.fillStyle=barColor;ctx.font='bold 10px sans-serif';
var valText=(v>=0?'+':'')+v.toFixed(1);
if(barPixels>=0){ctx.fillText(valText,zeroX+barPixels+6,y+barH/2+4)}
else{ctx.fillText(valText,zeroX+barPixels-30,y+barH/2+4)}
}
ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.setLineDash([4,4]);
for(var gx=-2;gx<=2;gx++){if(gx===0)continue;var lx=zeroX+(gx/maxSG)*(chartW/2);ctx.beginPath();ctx.moveTo(lx,padT);ctx.lineTo(lx,padT+chartH);ctx.stroke()}
ctx.setLineDash([]);
}

// ===== 5. PENALTY TRACKER Canvas 580x360 =====
function showPenaltyTracker(){
playSfx('penalty_open');
var pn=getPanel('penalty');
var data=lsGet('penalty_data',[]);
var TYPES=['OB','워터해저드','벙커(언플)','불플레이','분실볼','언플레이어블','벼칙 위반','프로비저널'];
var html='<button class="v19-close" onclick="window._v19Close(\'penalty\')">&times;</button>';
html+='<div class="v19-title">⚠️ 페널티 샷 트래커</div>';
html+='<div class="v19-card"><h3>페널티 기록</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v19-label">홈 번호</label><select id="v19-pn-hole" class="v19-input">';
for(var h=1;h<=18;h++) html+='<option>'+h+'</option>';
html+='</select></div>';
html+='<div><label class="v19-label">페널티 유형</label><select id="v19-pn-type" class="v19-input">';
for(var ti=0;ti<TYPES.length;ti++) html+='<option>'+TYPES[ti]+'</option>';
html+='</select></div>';
html+='<div style="display:flex;align-items:flex-end"><button class="v19-btn v19-btn-primary" style="width:100%" onclick="window._v19AddPenalty()">기록</button></div>';
html+='</div></div>';
html+='<canvas id="v19-pn-canvas" width="580" height="360" style="width:100%;max-width:580px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';
var totalPen=data.length;var penByType={};for(var pi=0;pi<data.length;pi++){penByType[data[pi].type]=(penByType[data[pi].type]||0)+1}
var worstType='';var worstCount=0;for(var wk in penByType){if(penByType[wk]>worstCount){worstCount=penByType[wk];worstType=wk}}
var totalStrokes=0;for(var ps=0;ps<data.length;ps++){totalStrokes+=data[ps].type==='OB'?2:1}
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v19-stat-card"><div class="v19-stat-val" style="color:#FF3366">'+totalPen+'</div><div class="v19-stat-label">총 페널티</div></div>';
html+='<div class="v19-stat-card"><div class="v19-stat-val" style="color:#FFB800">'+totalStrokes+'타</div><div class="v19-stat-label">손실 타수</div></div>';
html+='<div class="v19-stat-card"><div class="v19-stat-val" style="color:#00B4D8;font-size:.75em">'+(worstType||'-')+'</div><div class="v19-stat-label">최다 유형</div></div>';
html+='</div>';
if(data.length>0){html+='<button class="v19-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'페널티 초기화?\'))window._v19ResetPenalty()">초기화</button>';}
pn.innerHTML=html;openPanel('penalty');drawPenaltyCanvas(data,TYPES);
}
window._v19AddPenalty=function(){var hole=parseInt(document.getElementById('v19-pn-hole').value)||1;var type=document.getElementById('v19-pn-type').value;var data=lsGet('penalty_data',[]);data.push({hole:hole,type:type,date:todayStr()});if(data.length>500)data=data.slice(-500);lsSet('penalty_data',data);playSfx('penalty_open');showToast(hole+'번 홈 '+type+' 기록');showPenaltyTracker()};
window._v19ResetPenalty=function(){lsSet('penalty_data',[]);showPenaltyTracker()};
function drawPenaltyCanvas(data,TYPES){
var c=document.getElementById('v19-pn-canvas');if(!c)return;
var ctx=c.getContext('2d');var W=580,H=360;
ctx.fillStyle='#0c1018';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#FF3366';ctx.font='bold 15px sans-serif';ctx.fillText('Penalty Shot Tracker',20,28);
ctx.fillStyle='#555';ctx.font='11px sans-serif';ctx.fillText('Penalty Distribution by Type & Hole',20,46);
if(data.length===0){ctx.fillStyle='#444';ctx.font='14px sans-serif';ctx.fillText('No penalties recorded - great!',W/2-100,H/2);return}
var padL=50,padR=20,padT=65,padB=45;var chartW=W-padL-padR,chartH=H-padT-padB;
var holeCount={};for(var i=0;i<data.length;i++){holeCount[data[i].hole]=(holeCount[data[i].hole]||0)+1}
var maxCount=0;for(var hk in holeCount){if(holeCount[hk]>maxCount)maxCount=holeCount[hk]}maxCount=Math.max(maxCount,1);
var barW=chartW/18-3;
for(var h=1;h<=18;h++){var cnt=holeCount[h]||0;var barH=(cnt/maxCount)*chartH;var x=padL+(h-1)*(chartW/18)+1.5;
var barColor=cnt>=3?'#FF3366':cnt>=2?'#FF9F43':cnt>=1?'#FFB800':'transparent';
if(cnt>0){ctx.fillStyle=barColor;ctx.globalAlpha=0.7;ctx.fillRect(x,padT+chartH-barH,barW,barH);ctx.globalAlpha=1;ctx.fillStyle='#fff';ctx.font='bold 10px sans-serif';ctx.fillText(cnt+'',x+barW/2-3,padT+chartH-barH-5)}
ctx.fillStyle=cnt>0?'#ccc':'#444';ctx.font='9px sans-serif';ctx.fillText(h+'',x+barW/2-4,H-padB+14)}
var typeCount={};for(var ti=0;ti<data.length;ti++){typeCount[data[ti].type]=(typeCount[data[ti].type]||0)+1}
var pieCx=W-110,pieCy=padT+80,pieR=55;var startAngle=-Math.PI/2;
var pieColors=['#FF3366','#48DBFB','#FFB800','#A855F7','#FF9F43','#00FF88','#FF6B6B','#00B4D8'];
var idx=0;for(var tk in typeCount){if(!typeCount.hasOwnProperty(tk))continue;var angle=(typeCount[tk]/data.length)*Math.PI*2;ctx.fillStyle=pieColors[idx%8];ctx.globalAlpha=0.7;ctx.beginPath();ctx.moveTo(pieCx,pieCy);ctx.arc(pieCx,pieCy,pieR,startAngle,startAngle+angle);ctx.closePath();ctx.fill();ctx.globalAlpha=1;startAngle+=angle;idx++}
ctx.fillStyle='#0c1018';ctx.beginPath();ctx.arc(pieCx,pieCy,25,0,Math.PI*2);ctx.fill();
var legY=padT+150;idx=0;for(var lk in typeCount){if(!typeCount.hasOwnProperty(lk))continue;ctx.fillStyle=pieColors[idx%8];ctx.fillRect(W-170,legY,8,8);ctx.fillStyle='#aaa';ctx.font='9px sans-serif';ctx.fillText(lk+' ('+typeCount[lk]+')',W-158,legY+8);legY+=14;idx++}
}

// ===== 6. LIE ASSESSMENT TOOL Canvas 580x360 =====
function showLieAssessment(){
playSfx('lie_open');
var pn=getPanel('lieassess');
var LIES=[{name:'페어웨이',diff:0,tip:'자유롭게 클럽 선택. 정상 스윙.'},{name:'러프 (엇은)',diff:1,tip:'한 클럽 위 선택. 볼을 깨끗히 콘택트.'},{name:'러프 (깊은)',diff:2,tip:'두 클럽 위. 웨지/9I 권장. 빠져나오기.'},{name:'벙커 평탄한',diff:1,tip:'볼을 깨끗하게 치기. SW/LW 권장.'},{name:'벙커 털어오른',diff:3,tip:'어려운 샷. 폭발샷으로 바로 탈출.'},{name:'프린지',diff:1,tip:'볼이 경사면. 한 발 낮게 서고 스윙.'},{name:'베어그라운드',diff:1,tip:'볼이 튰기 쉽다. 한 클럽 위.'},{name:'파물혀 바위',diff:2,tip:'차는 샷으로 안전하게 탈출.'},{name:'오르막이',diff:2,tip:'팔로스루 짧게. 오픈 페이스 클럽.'},{name:'디볃',diff:0,tip:'볼이 움푸미. 낮은 탄도 유리.'}];
var html='<button class="v19-close" onclick="window._v19Close(\'lieassess\')">&times;</button>';
html+='<div class="v19-title">🌿 라이 판단 가이드</div>';
html+='<canvas id="v19-la-canvas" width="580" height="360" style="width:100%;max-width:580px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';
for(var i=0;i<LIES.length;i++){var l=LIES[i];var diffColor=l.diff===0?'#00FF88':l.diff===1?'#FFB800':l.diff===2?'#FF9F43':'#FF3366';var stars='';for(var s=0;s<l.diff;s++)stars+='⭐';if(!stars)stars='✅';
html+='<div class="v19-card" style="margin-bottom:8px"><div style="display:flex;justify-content:space-between;align-items:center"><h3 style="margin:0">'+l.name+'</h3><span style="color:'+diffColor+';font-size:.85em">난이도 '+stars+'</span></div><p style="margin:4px 0 0;font-size:.82em;color:#aaa">'+l.tip+'</p></div>'}
pn.innerHTML=html;openPanel('lieassess');drawLieCanvas(LIES);
}
function drawLieCanvas(LIES){
var c=document.getElementById('v19-la-canvas');if(!c)return;
var ctx=c.getContext('2d');var W=580,H=360;
ctx.fillStyle='#0c1018';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00FF88';ctx.font='bold 15px sans-serif';ctx.fillText('Lie Assessment Guide',20,28);
ctx.fillStyle='#555';ctx.font='11px sans-serif';ctx.fillText('Difficulty & Strategy by Lie Type',20,46);
var padL=130,padR=30,padT=65,padB=20;var chartW=W-padL-padR,chartH=H-padT-padB;
var barH=chartH/LIES.length-4;
for(var i=0;i<LIES.length;i++){var l=LIES[i];var y=padT+i*(chartH/LIES.length)+2;
var colors=['#00FF88','#FFB800','#FF9F43','#FF3366'];var barColor=colors[Math.min(l.diff,3)];
var pct=(l.diff+0.3)/3.3;
ctx.fillStyle=barColor;ctx.globalAlpha=0.5;ctx.fillRect(padL,y,pct*chartW,barH);ctx.globalAlpha=1;
ctx.fillStyle='#ccc';ctx.font='11px sans-serif';ctx.fillText(l.name,6,y+barH/2+4);
ctx.fillStyle=barColor;ctx.font='bold 10px sans-serif';ctx.fillText('Lv.'+l.diff,padL+pct*chartW+6,y+barH/2+4)}
}

// ===== 7. COURSE CONDITION LOG Canvas 600x380 =====
function showCourseCondition(){
playSfx('course_open');
var pn=getPanel('coursecond');
var data=lsGet('course_cond',[]);
var ASPECTS=['페어웨이 상태','그린 스피드','벙커 상태','러프 깊이','카트 경로','전반적 관리'];
var html='<button class="v19-close" onclick="window._v19Close(\'coursecond\')">&times;</button>';
html+='<div class="v19-title">🏟️ 코스 컨디션 로그</div>';
html+='<div class="v19-card"><h3>컨디션 기록</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v19-label">코스명</label><input type="text" id="v19-cc-name" class="v19-input" placeholder="코스명 입력" maxlength="30"></div>';
html+='<div><label class="v19-label">날씨</label><select id="v19-cc-weather" class="v19-input"><option>맑음</option><option>흐림</option><option>비</option><option>바람</option><option>안개</option></select></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:6px">';
for(var ai=0;ai<ASPECTS.length;ai++){html+='<div><label class="v19-label">'+ASPECTS[ai]+' (1~10)</label><input type="number" id="v19-cc-a'+ai+'" class="v19-input" min="1" max="10" value="7"></div>'}
html+='</div>';
html+='<button class="v19-btn v19-btn-primary" style="width:100%;margin-top:8px" onclick="window._v19SaveCourse()">저장</button>';
html+='</div>';
html+='<canvas id="v19-cc-canvas" width="600" height="380" style="width:100%;max-width:600px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';
var totalLogs=data.length;var avgRating=0;
if(totalLogs>0){var rSum=0;for(var ri=0;ri<data.length;ri++){var rAvg=0;for(var ra=0;ra<6;ra++)rAvg+=data[ri].aspects[ra]||7;rSum+=rAvg/6}avgRating=Math.round(rSum/totalLogs*10)/10}
var rateGrade=avgRating>=9?'S':avgRating>=7?'A':avgRating>=5?'B':avgRating>=3?'C':'D';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v19-stat-card"><div class="v19-stat-val" style="color:#00FF88">'+totalLogs+'</div><div class="v19-stat-label">총 기록</div></div>';
html+='<div class="v19-stat-card"><div class="v19-stat-val" style="color:#FFB800">'+avgRating+'</div><div class="v19-stat-label">평균 상태</div></div>';
html+='<div class="v19-stat-card"><div class="v19-stat-val" style="color:'+(rateGrade==='S'||rateGrade==='A'?'#00FF88':'#FFB800')+'">'+rateGrade+'</div><div class="v19-stat-label">등급</div></div>';
html+='</div>';
if(data.length>0){html+='<button class="v19-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'컨디션 로그 초기화?\'))window._v19ResetCourse()">초기화</button>';}
pn.innerHTML=html;openPanel('coursecond');drawCourseCanvas(data,ASPECTS);
}
window._v19SaveCourse=function(){var name=document.getElementById('v19-cc-name').value.slice(0,30)||'Unknown';var weather=document.getElementById('v19-cc-weather').value;var aspects=[];for(var i=0;i<6;i++){aspects.push(parseInt(document.getElementById('v19-cc-a'+i).value)||7)}var data=lsGet('course_cond',[]);data.push({name:name,weather:weather,aspects:aspects,date:todayStr()});if(data.length>100)data=data.slice(-100);lsSet('course_cond',data);playSfx('course_open');showToast(name+' 컨디션 저장');showCourseCondition()};
window._v19ResetCourse=function(){lsSet('course_cond',[]);showCourseCondition()};
function drawCourseCanvas(data,ASPECTS){
var c=document.getElementById('v19-cc-canvas');if(!c)return;
var ctx=c.getContext('2d');var W=600,H=380;
ctx.fillStyle='#0c1018';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00FF88';ctx.font='bold 15px sans-serif';ctx.fillText('Course Condition Radar',20,28);
ctx.fillStyle='#555';ctx.font='11px sans-serif';ctx.fillText(data.length>0?'Latest: '+data[data.length-1].name+' ('+data[data.length-1].date+')':'No data yet',20,46);
var cx=W/2,cy=H/2+15,r=110;var n=6;var angles=[];
for(var ai=0;ai<n;ai++){angles.push(-Math.PI/2+(ai/n)*Math.PI*2)}
for(var ring=2;ring<=10;ring+=2){ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.beginPath();for(var ri=0;ri<n;ri++){var rr=r*(ring/10);var ax=cx+Math.cos(angles[ri])*rr;var ay=cy+Math.sin(angles[ri])*rr;if(ri===0)ctx.moveTo(ax,ay);else ctx.lineTo(ax,ay)}ctx.closePath();ctx.stroke()}
for(var li=0;li<n;li++){var lx=cx+Math.cos(angles[li])*r;var ly=cy+Math.sin(angles[li])*r;ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(lx,ly);ctx.stroke();var tlx=cx+Math.cos(angles[li])*(r+22);var tly=cy+Math.sin(angles[li])*(r+22);ctx.fillStyle='#aaa';ctx.font='10px sans-serif';ctx.fillText(ASPECTS[li],tlx-25,tly+4)}
if(data.length>0){var latest=data[data.length-1];ctx.fillStyle='rgba(0,255,136,0.15)';ctx.strokeStyle='#00FF88';ctx.lineWidth=2;ctx.beginPath();for(var pi=0;pi<n;pi++){var pr=r*(latest.aspects[pi]/10);var px=cx+Math.cos(angles[pi])*pr;var py=cy+Math.sin(angles[pi])*pr;if(pi===0)ctx.moveTo(px,py);else ctx.lineTo(px,py)}ctx.closePath();ctx.fill();ctx.stroke();
for(var di=0;di<n;di++){var dr=r*(latest.aspects[di]/10);var dx=cx+Math.cos(angles[di])*dr;var dy=cy+Math.sin(angles[di])*dr;ctx.fillStyle=latest.aspects[di]>=7?'#00FF88':latest.aspects[di]>=4?'#FFB800':'#FF3366';ctx.beginPath();ctx.arc(dx,dy,4,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff';ctx.font='bold 10px sans-serif';ctx.fillText(latest.aspects[di]+'',dx+7,dy+4)}}
if(data.length>=2){var prev=data[data.length-2];ctx.fillStyle='rgba(168,85,247,0.08)';ctx.strokeStyle='rgba(168,85,247,0.4)';ctx.lineWidth=1;ctx.setLineDash([4,4]);ctx.beginPath();for(var qi=0;qi<n;qi++){var qr=r*(prev.aspects[qi]/10);var qx=cx+Math.cos(angles[qi])*qr;var qy=cy+Math.sin(angles[qi])*qr;if(qi===0)ctx.moveTo(qx,qy);else ctx.lineTo(qx,qy)}ctx.closePath();ctx.fill();ctx.stroke();ctx.setLineDash([])}
}

// ===== 8. GOLF MUSCLE ACTIVATION MAP Canvas 580x380 =====
function showMuscleMap(){
playSfx('muscle_open');
var pn=getPanel('musclemap');
var data=lsGet('muscle_data',{});
var MUSCLES=['어깨(삼각근)','팔(이두/삼두)','코어(복근/측근)','등(광배근)','하체(대퇴/했스트링)','엉덩이(둔근)','전완(손/손목)','종아리(비복근)'];
var PHASES=['백스윗','다운스윗','임팩트','팔로스루'];
var html='<button class="v19-close" onclick="window._v19Close(\'musclemap\')">&times;</button>';
html+='<div class="v19-title">💪 골프 근육 활성화 맵</div>';
html+='<div class="v19-card"><h3>근육별 활성도 (1~10)</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
for(var mi=0;mi<MUSCLES.length;mi++){html+='<div><label class="v19-label">'+MUSCLES[mi]+'</label><input type="number" id="v19-mm-'+mi+'" class="v19-input" min="1" max="10" value="'+(data['m'+mi]||5)+'"></div>'}
html+='</div>';
html+='<button class="v19-btn v19-btn-primary" style="width:100%;margin-top:8px" onclick="window._v19SaveMuscle()">저장</button>';
html+='</div>';
html+='<canvas id="v19-mm-canvas" width="580" height="380" style="width:100%;max-width:580px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';
var total=0,count=0;for(var si=0;si<MUSCLES.length;si++){var v=data['m'+si]||0;if(v>0){total+=v;count++}}
var avg=count>0?Math.round(total/count*10)/10:0;
var grade=avg>=9?'S':avg>=7?'A':avg>=5?'B':avg>=3?'C':'D';
var weakest='';var weakVal=11;for(var wi=0;wi<MUSCLES.length;wi++){var wv=data['m'+wi]||0;if(wv>0&&wv<weakVal){weakVal=wv;weakest=MUSCLES[wi]}}
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v19-stat-card"><div class="v19-stat-val" style="color:#00FF88">'+avg+'</div><div class="v19-stat-label">평균 활성도</div></div>';
html+='<div class="v19-stat-card"><div class="v19-stat-val" style="color:'+(grade==='S'||grade==='A'?'#00FF88':grade==='B'?'#FFB800':'#FF3366')+'">'+grade+'</div><div class="v19-stat-label">근육 등급</div></div>';
html+='<div class="v19-stat-card"><div class="v19-stat-val" style="color:#FF9F43;font-size:.7em">'+(weakest||'-')+'</div><div class="v19-stat-label">약점 근육</div></div>';
html+='</div>';
html+='<div class="v19-card"><h3>💡 스윙 근육 활용 팁</h3><div style="font-size:.82em;color:#aaa;line-height:1.7">';
html+='<div>• 백스윗: 어깨+등 회전 (삼각근+광배근)</div>';
html+='<div>• 다운스윗: 하체주도 (대퇴+둔근+코어)</div>';
html+='<div>• 임팩트: 모든 근육 동시 활성화</div>';
html+='<div>• 팔로스루: 팔+어깨 감속 컨트롤</div>';
html+='</div></div>';
pn.innerHTML=html;openPanel('musclemap');drawMuscleCanvas(data,MUSCLES);
}
window._v19SaveMuscle=function(){var data={};for(var i=0;i<8;i++){data['m'+i]=parseInt(document.getElementById('v19-mm-'+i).value)||5}data.date=todayStr();lsSet('muscle_data',data);playSfx('muscle_open');showToast('근육 활성도 저장');showMuscleMap()};
function drawMuscleCanvas(data,MUSCLES){
var c=document.getElementById('v19-mm-canvas');if(!c)return;
var ctx=c.getContext('2d');var W=580,H=380;
ctx.fillStyle='#0c1018';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00FF88';ctx.font='bold 15px sans-serif';ctx.fillText('Golf Muscle Activation Map',20,28);
ctx.fillStyle='#555';ctx.font='11px sans-serif';ctx.fillText('8-Muscle Group Activation Radar',20,46);
var cx=W/2,cy=H/2+15,r=115;var n=8;var angles=[];
for(var ai=0;ai<n;ai++){angles.push(-Math.PI/2+(ai/n)*Math.PI*2)}
for(var ring=2;ring<=10;ring+=2){ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.beginPath();for(var ri=0;ri<n;ri++){var rr=r*(ring/10);var ax=cx+Math.cos(angles[ri])*rr;var ay=cy+Math.sin(angles[ri])*rr;if(ri===0)ctx.moveTo(ax,ay);else ctx.lineTo(ax,ay)}ctx.closePath();ctx.stroke()}
for(var li=0;li<n;li++){var lx=cx+Math.cos(angles[li])*r;var ly=cy+Math.sin(angles[li])*r;ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(lx,ly);ctx.stroke();var tlx=cx+Math.cos(angles[li])*(r+22);var tly=cy+Math.sin(angles[li])*(r+22);ctx.fillStyle='#aaa';ctx.font='9px sans-serif';ctx.fillText(MUSCLES[li].split('(')[0],tlx-20,tly+4)}
var vals=[];for(var vi=0;vi<n;vi++){vals.push(data['m'+vi]||0)}
if(vals.some(function(v){return v>0})){
ctx.fillStyle='rgba(0,180,216,0.15)';ctx.strokeStyle='#00B4D8';ctx.lineWidth=2;ctx.beginPath();
for(var pi=0;pi<n;pi++){var pr=r*(vals[pi]/10);var px=cx+Math.cos(angles[pi])*pr;var py=cy+Math.sin(angles[pi])*pr;if(pi===0)ctx.moveTo(px,py);else ctx.lineTo(px,py)}
ctx.closePath();ctx.fill();ctx.stroke();
for(var di=0;di<n;di++){var dr=r*(vals[di]/10);var dx=cx+Math.cos(angles[di])*dr;var dy=cy+Math.sin(angles[di])*dr;ctx.fillStyle=vals[di]>=7?'#00FF88':vals[di]>=4?'#FFB800':'#FF3366';ctx.beginPath();ctx.arc(dx,dy,4,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff';ctx.font='bold 10px sans-serif';ctx.fillText(vals[di]+'',dx+7,dy+4)}
}
}

// ===== QUIZ v19 (+15 questions: 165 -> 180) =====
var V19_QUIZ=[
{q:'어프로치 샷에서 바람이 앞바람(headwind)일 때 비거리는?',a:['증가','감소','변화없음','방향만 변함'],c:1},
{q:'분산도(Dispersion)가 큰 골퍼가 개선해야 할 것은?',a:['비거리','일관성','코스 관리','퍼팅'],c:1},
{q:'18홈 라운드에서 피로도가 가장 급증하는 구간은?',a:['1~3홈','7~9홈','10~14홈','16~18홈'],c:2},
{q:'Strokes Gained: Putting 값이 -1.5이면 무엇을 의미하는가?',a:['퍼팅이 뛰어남','퍼팅으로 1.5타 손해','평균 수준','1.5타 절약'],c:1},
{q:'OB(Out of Bounds) 페널티는 몇 타인가?',a:['1타','2타(1타+거리손실)','3타','반타'],c:1},
{q:'벙커에서 탈출할 때 가장 중요한 것은?',a:['비거리 최대화','그린 방향으로 탈출','리프 생성','고탄도'],c:1},
{q:'골프 스윙에서 가장 많이 사용되는 근육군은?',a:['이두근','코어(복근/측근)','삼각근','대퇴근'],c:1},
{q:'코스 컨디션에서 그린 스피드가 빠를 때 퍼팅 전략은?',a:['강하게 치기','부드럽게 터치','압력 증가','바로 홀에 겨냥'],c:1},
{q:'페어웨이 컨디션이 좋을 때(단단한 페어웨이) 런은?',a:['줄어든다','늘어난다','변화없다','방향이 변한다'],c:1},
{q:'라이가 오르막이(uphill)일 때 클럽 선택은?',a:['평소와 같은 클럽','한 클럽 위','한 클럽 아래','웨지로 통일'],c:1},
{q:'물(워터해저드) 페널티는 몇 타인가?',a:['무페널티','1타','2타','3타'],c:1},
{q:'골프에서 하체 회전이 상체보다 먼저 시작되는 이유는?',a:['파워 전달 근간 운동연쇄','밸런스','정확성','테이크백'],c:0},
{q:'코스 러프가 깊을 때 추천되는 전략은?',a:['3우드 사용','웨지로 페어웨이로 복귀','드라이버로 치기','로브 샷'],c:1},
{q:'퍼팅 브레이크 리딩에서 잔디의 결(Grain)이란?',a:['그린 잔디의 자라는 방향','그린 경사','그린 스피드','그린 수분량'],c:0},
{q:'근육 활성화에서 백스윗 단계에서 가장 중요한 근육은?',a:['이두근','등(광배근)+어깨(삼각근)','복근','비복근'],c:1}
];
function showV19Quiz(){
playSfx('quiz_correct');
var pn=getPanel('v19quiz');
var qState=lsGet('quiz_state',{idx:0,correct:0,total:0});
var qi=qState.idx%V19_QUIZ.length;var q=V19_QUIZ[qi];
var html='<button class="v19-close" onclick="window._v19Close(\'v19quiz\')">&times;</button>';
html+='<div class="v19-title">❓ 골프 퀴즈 v19 ('+qState.total+' 응답, '+qState.correct+' 정답)</div>';
html+='<div class="v19-card"><h3>Q'+(qi+1)+'/'+V19_QUIZ.length+'</h3>';
html+='<p style="font-size:1em;color:#fff;margin:12px 0;line-height:1.6">'+q.q+'</p>';
for(var ai=0;ai<q.a.length;ai++){html+='<button class="v19-btn" style="width:100%;margin:4px 0;text-align:left;padding:10px 16px" onclick="window._v19Answer('+qi+','+ai+')">'+String.fromCharCode(9312+ai)+' '+q.a[ai]+'</button>'}
html+='</div>';
var rate=qState.total>0?Math.round(qState.correct/qState.total*100):0;
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v19-stat-card"><div class="v19-stat-val" style="color:#00FF88">'+qState.correct+'</div><div class="v19-stat-label">정답</div></div>';
html+='<div class="v19-stat-card"><div class="v19-stat-val" style="color:#FFB800">'+rate+'%</div><div class="v19-stat-label">정답률</div></div>';
html+='<div class="v19-stat-card"><div class="v19-stat-val" style="color:#00B4D8">'+qState.total+'</div><div class="v19-stat-label">총 응답</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('v19quiz');
}
window._v19Answer=function(qi,ai){var q=V19_QUIZ[qi];var qState=lsGet('quiz_state',{idx:0,correct:0,total:0});qState.total++;if(ai===q.c){qState.correct++;playSfx('quiz_correct');showToast('정답! 🎉')}else{playSfx('quiz_wrong');showToast('오답! 정답: '+q.a[q.c])}qState.idx=qi+1;lsSet('quiz_state',qState);setTimeout(showV19Quiz,1200)};

// ===== ACHIEVEMENTS v19 (+12: 132 -> 144) =====
var V19_ACHS=[
{id:'v19_approach_pro',name:'어프로치 프로',desc:'어프로치 10회 기록',check:function(){return(lsGet('approach_log',[])).length>=10}},
{id:'v19_dispersion_analyst',name:'분산 분석가',desc:'분산도 15회 이상 기록',check:function(){return(lsGet('dispersion_data',[])).length>=15}},
{id:'v19_fatigue_manager',name:'피로 관리자',desc:'피로도 9홈 이상 측정',check:function(){var d=lsGet('fatigue_data',{});var c=0;for(var h=1;h<=18;h++)if(d['h'+h])c++;return c>=9}},
{id:'v19_sg_analyst',name:'SG 분석가',desc:'SG 데이터 저장 완료',check:function(){return!!lsGet('sg_breakdown',{}).date}},
{id:'v19_penalty_free',name:'페널티 프리',desc:'압력: 페널티 0회 라운드',check:function(){return(lsGet('penalty_data',[])).length===0}},
{id:'v19_lie_explorer',name:'라이 탐험가',desc:'라이 가이드 확인',check:function(){var o=lsGet('opens',{});return(o.lieassess||0)>=1}},
{id:'v19_course_logger',name:'코스 기록가',desc:'코스 컨디션 3회 기록',check:function(){return(lsGet('course_cond',[])).length>=3}},
{id:'v19_muscle_master',name:'근육 마스터',desc:'근육 활성도 A등급',check:function(){var d=lsGet('muscle_data',{});var t=0,c=0;for(var i=0;i<8;i++){var v=d['m'+i]||0;if(v>0){t+=v;c++}}return c>0&&t/c>=7}},
{id:'v19_quiz_ace',name:'퀴즈 v19 에이스',desc:'v19 퀴즈 전문 정답',check:function(){var s=lsGet('quiz_state',{});return s.total>=15&&s.correct>=15}},
{id:'v19_gir_expert',name:'GIR 전문가',desc:'GIR 성공률 60% 이상',check:function(){var d=lsGet('approach_log',[]);if(d.length<5)return false;var g=0;for(var i=0;i<d.length;i++)if(d[i].gir)g++;return g/d.length>=0.6}},
{id:'v19_centered',name:'센터드 샷',desc:'분산도 평균 좌우 &plusmn;3yd 이내',check:function(){var d=lsGet('dispersion_data',[]);if(d.length<5)return false;var s=0;for(var i=0;i<d.length;i++)s+=d[i].lr;return Math.abs(s/d.length)<=3}},
{id:'v19_complete',name:'v19 컴플리트',desc:'v19 모든 기능 사용',check:function(){var o=lsGet('opens',{});return(o.approach||0)>0&&(o.dispersion||0)>0&&(o.fatigue||0)>0&&(o.sgbreak||0)>0&&(o.penalty||0)>0&&(o.lieassess||0)>0&&(o.coursecond||0)>0&&(o.musclemap||0)>0&&lsGet('quiz_state',{}).total>0}}
];

function v19CheckAch(){
var unlocked=lsGet('achievements',[]);
for(var i=0;i<V19_ACHS.length;i++){
  var a=V19_ACHS[i];
  if(unlocked.indexOf(a.id)===-1&&a.check()){
    unlocked.push(a.id);lsSet('achievements',unlocked);
    playSfx('v19_achieve');
    var popup=document.createElement('div');popup.className='v19-ach-popup';
    popup.innerHTML='<div style="font-size:2em">🏆</div><div><div style="font-weight:800;color:#FFB800;font-size:.9em">업적 해금!</div><div style="font-size:.8em;color:#ccc">'+a.name+' - '+a.desc+'</div></div>';
    document.body.appendChild(popup);
    setTimeout(function(){popup.classList.add('show')},100);
    setTimeout(function(){popup.classList.remove('show');setTimeout(function(){popup.remove()},500)},4000);
  }
}
}

function trackOpen(section){
var opens=lsGet('opens',{});opens[section]=(opens[section]||0)+1;lsSet('opens',opens);setTimeout(v19CheckAch,500);
}

window._v19_showApproach=function(){trackOpen('approach');showApproachSelector()};
window._v19_showDispersion=function(){trackOpen('dispersion');showDispersionPattern()};
window._v19_showFatigue=function(){trackOpen('fatigue');showFatigueMonitor()};
window._v19_showSGBreak=function(){trackOpen('sgbreak');showSGBreakdown()};
window._v19_showPenalty=function(){trackOpen('penalty');showPenaltyTracker()};
window._v19_showLieAssess=function(){trackOpen('lieassess');showLieAssessment()};
window._v19_showCourseCond=function(){trackOpen('coursecond');showCourseCondition()};
window._v19_showMuscleMap=function(){trackOpen('musclemap');showMuscleMap()};
window._v19_showV19Quiz=function(){trackOpen('v19quiz');showV19Quiz()};
window._v19Close=function(id){closePanel(id)};

function setupV19Keyboard(){
document.addEventListener('keydown',function(e){
  if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'||e.target.tagName==='SELECT')return;
  if(e.ctrlKey||e.metaKey||e.altKey)return;
  if(!e.shiftKey)return;
  switch(e.key){
    case'A':e.preventDefault();window._v19_showApproach();break;
    case'B':e.preventDefault();window._v19_showDispersion();break;
    case'C':e.preventDefault();window._v19_showFatigue();break;
    case'D':e.preventDefault();window._v19_showSGBreak();break;
    case'E':e.preventDefault();window._v19_showPenalty();break;
    case'F':e.preventDefault();window._v19_showLieAssess();break;
    case'G':e.preventDefault();window._v19_showCourseCond();break;
    case'H':e.preventDefault();window._v19_showMuscleMap();break;
  }
});
}

// ===== ADD BUTTONS TO EXISTING NAV =====
function injectV19QuickActions(){
var nav=document.querySelector('.v16-scroll-nav');
if(!nav){setTimeout(injectV19QuickActions,2000);return}
var buttons=[
  {icon:'🎯',title:'어프로치 (Shift+A)',fn:'showApproach'},
  {icon:'📍',title:'분산패턴 (Shift+B)',fn:'showDispersion'},
  {icon:'🚨',title:'피로도 (Shift+C)',fn:'showFatigue'},
  {icon:'📈',title:'SG분석 (Shift+D)',fn:'showSGBreak'},
  {icon:'⚠️',title:'페널티 (Shift+E)',fn:'showPenalty'},
  {icon:'🌿',title:'라이판단 (Shift+F)',fn:'showLieAssess'},
  {icon:'🏟️',title:'코스컨디션 (Shift+G)',fn:'showCourseCond'},
  {icon:'💪',title:'근육맵 (Shift+H)',fn:'showMuscleMap'},
  {icon:'❓',title:'퀴즈v19',fn:'showV19Quiz'}
];
for(var i=0;i<buttons.length;i++){
  var btn=document.createElement('button');btn.className='v16-nav-btn';
  btn.innerHTML='<span class="v16-nav-icon">'+buttons[i].icon+'</span><span class="v16-nav-label">'+buttons[i].title.split(' (')[0]+'</span>';
  btn.title=buttons[i].title;
  btn.setAttribute('data-fn',buttons[i].fn);
  btn.addEventListener('click',function(){var fn=this.getAttribute('data-fn');if(window['_v19_'+fn])window['_v19_'+fn]()});
  nav.appendChild(btn);
}
}

// ===== CSS =====
function injectV19CSS(){
var s=document.createElement('style');
s.textContent='.v19-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.88);z-index:10010;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;pointer-events:none}.v19-overlay.active{opacity:1;pointer-events:auto}.v19-panel{background:linear-gradient(145deg,rgba(8,14,24,.98),rgba(4,6,14,.98));border:1px solid rgba(0,255,136,.15);border-radius:18px;padding:24px;max-width:720px;width:94%;max-height:85vh;overflow-y:auto;box-shadow:0 24px 80px rgba(0,0,0,.7),0 0 40px rgba(0,255,136,.06);position:relative}.v19-panel::-webkit-scrollbar{width:5px}.v19-panel::-webkit-scrollbar-thumb{background:rgba(0,255,136,.2);border-radius:3px}.v19-title{font-size:1.4em;font-weight:800;color:#00FF88;margin-bottom:18px;letter-spacing:-0.5px}.v19-close{position:absolute;top:12px;right:16px;background:none;border:none;color:#666;font-size:1.6em;cursor:pointer;padding:4px 8px;border-radius:8px;transition:all .2s;z-index:1}.v19-close:hover{color:#ff6b6b;background:rgba(255,107,107,.1)}.v19-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:16px;margin-bottom:12px;transition:all .2s}.v19-card:hover{border-color:rgba(0,255,136,.15);background:rgba(255,255,255,.05)}.v19-card h3{color:#00FF88;font-size:.95em;margin:0 0 8px}.v19-card p{color:#aaa;font-size:.85em;margin:0;line-height:1.6}.v19-btn{padding:8px 16px;border:1px solid rgba(0,255,136,.2);background:rgba(0,255,136,.06);color:#00FF88;border-radius:8px;cursor:pointer;font-size:.85em;transition:all .2s}.v19-btn:hover{background:rgba(0,255,136,.15);border-color:#00FF88}.v19-btn-primary{background:rgba(0,255,136,.12);border-color:rgba(0,255,136,.3)}.v19-btn-primary:hover{background:rgba(0,255,136,.22)}.v19-input{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:8px 12px;color:#fff;font-size:.85em;width:100%;box-sizing:border-box}.v19-input:focus{outline:none;border-color:rgba(0,255,136,.4)}.v19-label{display:block;font-size:.72em;color:#888;margin-bottom:3px}.v19-stat-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:10px 6px;text-align:center}.v19-stat-val{font-size:1.3em;font-weight:800}.v19-stat-label{font-size:.65em;color:#888;margin-top:2px}.v19-toast{position:fixed;top:20px;left:50%;transform:translateX(-50%) translateY(-100px);background:rgba(0,255,136,.1);border:1px solid rgba(0,255,136,.2);color:#00FF88;padding:10px 20px;border-radius:10px;z-index:99999;transition:transform .4s;font-size:.9em;backdrop-filter:blur(12px);white-space:nowrap}.v19-toast.show{transform:translateX(-50%) translateY(0)}.v19-ach-popup{position:fixed;top:60px;left:50%;transform:translateX(-50%) translateY(-150px);z-index:100004;background:linear-gradient(135deg,rgba(8,14,24,.96),rgba(16,24,36,.96));border:1px solid rgba(0,255,136,.25);border-radius:16px;padding:14px 22px;display:flex;align-items:center;gap:14px;backdrop-filter:blur(20px);transition:transform .5s cubic-bezier(.34,1.56,.64,1);box-shadow:0 8px 32px rgba(0,0,0,.5),0 0 24px rgba(0,255,136,.08)}.v19-ach-popup.show{transform:translateX(-50%) translateY(0)}@media(max-width:480px){.v19-panel{padding:16px;max-height:92vh;width:96%}}';
document.head.appendChild(s);
}

// ===== INIT =====
function initV19(){
injectV19CSS();
injectV19QuickActions();
setupV19Keyboard();
setTimeout(v19CheckAch,10000);
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',initV19)}
else{setTimeout(initV19,7000)}

})();
