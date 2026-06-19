(function(){
'use strict';
var LS='gt_v12_';
var audioCtx=null;
function getAC(){if(!audioCtx)try{audioCtx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}return audioCtx}
function playSfx(type){var ac=getAC();if(!ac)return;var o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);var t=ac.currentTime;g.gain.setValueAtTime(0.1,t);switch(type){case'putting_view':o.type='sine';o.frequency.setValueAtTime(392,t);o.frequency.linearRampToValueAtTime(523,t+0.08);o.frequency.linearRampToValueAtTime(659,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'putting_record':o.type='triangle';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(554,t+0.06);g.gain.setValueAtTime(0.08,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.15);o.start(t);o.stop(t+0.15);break;case'dispersion_plot':o.type='sine';o.frequency.setValueAtTime(330,t);o.frequency.linearRampToValueAtTime(440,t+0.1);o.frequency.linearRampToValueAtTime(554,t+0.2);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'sg_analyze':o.type='sine';o.frequency.setValueAtTime(494,t);o.frequency.linearRampToValueAtTime(659,t+0.1);o.frequency.linearRampToValueAtTime(784,t+0.2);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'caddie_advice':o.type='triangle';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(698,t+0.08);g.gain.setValueAtTime(0.07,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.2);o.start(t);o.stop(t+0.2);break;case'condition_calc':o.type='sine';o.frequency.setValueAtTime(349,t);o.frequency.linearRampToValueAtTime(466,t+0.1);g.gain.exponentialRampToValueAtTime(0.01,t+0.22);o.start(t);o.stop(t+0.22);break;case'green_read':o.type='sine';o.frequency.setValueAtTime(587,t);o.frequency.linearRampToValueAtTime(784,t+0.08);o.frequency.linearRampToValueAtTime(988,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'gap_view':o.type='triangle';o.frequency.setValueAtTime(262,t);o.frequency.linearRampToValueAtTime(392,t+0.1);o.frequency.linearRampToValueAtTime(523,t+0.2);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'season_view':o.type='sine';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(554,t+0.06);o.frequency.linearRampToValueAtTime(659,t+0.12);o.frequency.linearRampToValueAtTime(880,t+0.2);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'v12_achieve':o.type='sine';o.frequency.setValueAtTime(784,t);o.frequency.setValueAtTime(988,t+0.1);o.frequency.setValueAtTime(1175,t+0.2);o.frequency.setValueAtTime(1568,t+0.3);g.gain.exponentialRampToValueAtTime(0.01,t+0.5);o.start(t);o.stop(t+0.5);break;case'v12_quiz':o.type='sine';o.frequency.setValueAtTime(523,t);o.frequency.setValueAtTime(659,t+0.1);o.frequency.setValueAtTime(784,t+0.2);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'quiz_correct12':o.type='sine';o.frequency.setValueAtTime(659,t);o.frequency.setValueAtTime(784,t+0.08);o.frequency.setValueAtTime(1047,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;default:o.type='sine';o.frequency.setValueAtTime(440,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.15);o.start(t);o.stop(t+0.15)}}

function lsGet(k,d){try{var v=localStorage.getItem(LS+k);return v?JSON.parse(v):d}catch(e){return d}}
function lsSet(k,v){try{localStorage.setItem(LS+k,JSON.stringify(v))}catch(e){}}
function todayStr(){return new Date().toISOString().slice(0,10)}
function showToast(msg){var t=document.createElement('div');t.className='v12-toast';t.textContent=msg;document.body.appendChild(t);setTimeout(function(){t.classList.add('show')},50);setTimeout(function(){t.classList.remove('show');setTimeout(function(){t.remove()},400)},3000)}
function createOverlay(id){var ov=document.createElement('div');ov.className='v12-overlay';ov.id='v12-'+id;ov.addEventListener('click',function(e){if(e.target===ov)closePanel(id)});var pn=document.createElement('div');pn.className='v12-panel';pn.style.position='relative';ov.appendChild(pn);return pn}
function openPanel(id){var el=document.getElementById('v12-'+id);if(el)el.classList.add('active')}
function closePanel(id){var el=document.getElementById('v12-'+id);if(el)el.classList.remove('active')}
function getPanel(id){var ov=document.getElementById('v12-'+id);if(!ov){var pn=createOverlay(id);pn.id='v12-'+id+'-panel';document.body.appendChild(pn.parentElement);return pn}return ov.querySelector('.v12-panel')||ov}

var CLUBS=['Driver','3W','5W','4H','5I','6I','7I','8I','9I','PW','GW','SW','LW','Putter'];
var CLUB_AVG_DIST=[230,210,195,185,170,160,150,140,130,120,105,90,70,0];

// ===== 1. PUTTING ANALYSIS DASHBOARD =====
function showPuttingDash(){
var pn=getPanel('putting');
var puttLog=lsGet('putting_log',[]);
var html='<div class="v12-title">&#x26F3; 퍼팅 분석 대시보드</div>';

html+='<div class="v12-card"><h3>퍼팅 기록 입력</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:8px">';
html+='<div><label class="v12-label">거리 (ft)</label><input id="v12-putt-dist" class="v12-input" type="number" min="1" max="100" value="10"></div>';
html+='<div><label class="v12-label">퍼트 수</label><select id="v12-putt-count" class="v12-input"><option value="1">1퍼트</option><option value="2" selected>2퍼트</option><option value="3">3퍼트</option><option value="4">4퍼트+</option></select></div>';
html+='<div><label class="v12-label">경사</label><select id="v12-putt-slope" class="v12-input"><option value="flat">평지</option><option value="uphill">오르막</option><option value="downhill">내리막</option><option value="sidehill">사이드힐</option></select></div>';
html+='</div>';
html+='<button class="v12-btn v12-btn-primary" style="width:100%;margin-top:12px" onclick="window._v12RecordPutt()">기록 저장</button></div>';

var totalPutts=0,total1=0,total2=0,total3=0,totalHoles=puttLog.length;
var distBuckets={'short':[],'mid':[],'long':[]};
for(var i=0;i<puttLog.length;i++){
  var p=puttLog[i];totalPutts+=p.putts;
  if(p.putts===1)total1++;else if(p.putts===2)total2++;else total3++;
  if(p.distance<=10)distBuckets.short.push(p.putts);
  else if(p.distance<=30)distBuckets.mid.push(p.putts);
  else distBuckets.long.push(p.putts);
}
var avgPutts=totalHoles>0?(totalPutts/totalHoles).toFixed(2):'--';
var pct1=totalHoles>0?Math.round(total1/totalHoles*100):0;
var pct3=totalHoles>0?Math.round(total3/totalHoles*100):0;

html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">';
html+='<div class="v12-stat-card"><div class="v12-stat-val" style="color:#00FF88">'+avgPutts+'</div><div class="v12-stat-label">평균 퍼트</div></div>';
html+='<div class="v12-stat-card"><div class="v12-stat-val" style="color:#00B4D8">'+pct1+'%</div><div class="v12-stat-label">1퍼트 성공률</div></div>';
html+='<div class="v12-stat-card"><div class="v12-stat-val" style="color:#ff6b6b">'+pct3+'%</div><div class="v12-stat-label">3퍼트 비율</div></div>';
html+='<div class="v12-stat-card"><div class="v12-stat-val" style="color:#FFB800">'+totalHoles+'</div><div class="v12-stat-label">기록 홀 수</div></div>';
html+='</div>';

html+='<canvas id="v12-putt-canvas" width="560" height="300" style="width:100%;max-width:560px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

html+='<div class="v12-card"><h3>&#x1F4CA; 거리별 퍼팅 성공률</h3>';
html+='<table class="v12-table"><tr><th>거리</th><th>시도</th><th>평균 퍼트</th><th>1퍼트율</th></tr>';
var buckets=[{name:'숏 (1~10ft)',data:distBuckets.short},{name:'미들 (11~30ft)',data:distBuckets.mid},{name:'롱 (31ft+)',data:distBuckets.long}];
for(var b=0;b<buckets.length;b++){
  var bd=buckets[b].data;var bAvg=0,b1=0;
  for(var j=0;j<bd.length;j++){bAvg+=bd[j];if(bd[j]===1)b1++}
  bAvg=bd.length>0?(bAvg/bd.length).toFixed(1):'--';
  var b1pct=bd.length>0?Math.round(b1/bd.length*100)+'%':'--';
  html+='<tr><td>'+buckets[b].name+'</td><td>'+bd.length+'</td><td>'+bAvg+'</td><td style="color:#00FF88">'+b1pct+'</td></tr>';
}
html+='</table></div>';

if(puttLog.length>5){
  html+='<div class="v12-card"><h3>&#x1F4C8; 최근 20홀 퍼팅 추이</h3>';
  html+='<canvas id="v12-putt-trend" width="560" height="220" style="width:100%;max-width:560px;height:auto;display:block;margin:8px auto;border-radius:10px"></canvas></div>';
}

pn.innerHTML='<button class="v12-close" onclick="window._v12Close(\'putting\')">&times;</button>'+html;
openPanel('putting');playSfx('putting_view');
setTimeout(function(){renderPuttingCanvas(puttLog);if(puttLog.length>5)renderPuttingTrend(puttLog)},120);
v12CheckAch();lsSet('ach_putting_viewed',true);
}

window._v12RecordPutt=function(){
var dist=parseInt(document.getElementById('v12-putt-dist').value)||10;
var putts=parseInt(document.getElementById('v12-putt-count').value)||2;
var slope=document.getElementById('v12-putt-slope').value;
var log=lsGet('putting_log',[]);
log.push({distance:dist,putts:putts,slope:slope,date:todayStr()});
if(log.length>200)log=log.slice(-200);
lsSet('putting_log',log);
playSfx('putting_record');showToast('퍼팅 기록 저장! ('+dist+'ft / '+putts+'퍼트)');
closePanel('putting');setTimeout(showPuttingDash,200);
};

function renderPuttingCanvas(log){
var canvas=document.getElementById('v12-putt-canvas');if(!canvas)return;
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a1020';ctx.fillRect(0,0,W,H);
ctx.strokeStyle='rgba(0,180,216,.15)';ctx.lineWidth=1;
for(var i=0;i<5;i++){var y=40+i*(H-80)/4;ctx.beginPath();ctx.moveTo(60,y);ctx.lineTo(W-20,y);ctx.stroke()}

var categories=['1퍼트','2퍼트','3퍼트+'];
var counts=[0,0,0];
for(var j=0;j<log.length;j++){
  if(log[j].putts===1)counts[0]++;
  else if(log[j].putts===2)counts[1]++;
  else counts[2]++;
}
var maxC=Math.max.apply(null,counts)||1;
var colors=['#00FF88','#00B4D8','#ff6b6b'];
var barW=(W-120)/categories.length;

for(var k=0;k<categories.length;k++){
  var bh=counts[k]/maxC*(H-100);
  var bx=80+k*barW;
  var by=H-50-bh;
  var grad=ctx.createLinearGradient(bx,by,bx,H-50);
  grad.addColorStop(0,colors[k]);grad.addColorStop(1,colors[k].replace(')',',0.3)').replace('rgb','rgba'));
  ctx.fillStyle=grad;
  ctx.beginPath();ctx.moveTo(bx+4,H-50);ctx.lineTo(bx+4,by+4);ctx.quadraticCurveTo(bx+4,by,bx+8,by);
  ctx.lineTo(bx+barW-30+4,by);ctx.quadraticCurveTo(bx+barW-30+8,by,bx+barW-30+8,by+4);
  ctx.lineTo(bx+barW-30+8,H-50);ctx.fill();
  ctx.fillStyle='#fff';ctx.font='bold 16px sans-serif';ctx.textAlign='center';
  ctx.fillText(counts[k]+'회',bx+(barW-22)/2,by-8);
  ctx.fillStyle='#aaa';ctx.font='12px sans-serif';
  ctx.fillText(categories[k],bx+(barW-22)/2,H-30);
  if(log.length>0){
    var pct=Math.round(counts[k]/log.length*100);
    ctx.fillStyle=colors[k];ctx.font='bold 11px sans-serif';
    ctx.fillText(pct+'%',bx+(barW-22)/2,by-24);
  }
}
ctx.fillStyle='#00B4D8';ctx.font='bold 14px sans-serif';ctx.textAlign='left';
ctx.fillText('Putting Distribution ('+log.length+' holes)',60,25);
}

function renderPuttingTrend(log){
var canvas=document.getElementById('v12-putt-trend');if(!canvas)return;
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a1020';ctx.fillRect(0,0,W,H);
var recent=log.slice(-20);
ctx.strokeStyle='rgba(255,255,255,.06)';ctx.lineWidth=1;
for(var i=0;i<5;i++){var y=30+i*(H-60)/4;ctx.beginPath();ctx.moveTo(50,y);ctx.lineTo(W-20,y);ctx.stroke();ctx.fillStyle='#555';ctx.font='10px sans-serif';ctx.textAlign='right';ctx.fillText((4-i+1),45,y+4)}
ctx.strokeStyle='#00B4D8';ctx.lineWidth=2;ctx.beginPath();
var stepX=(W-80)/(recent.length-1||1);
for(var j=0;j<recent.length;j++){
  var px=50+j*stepX;
  var py=H-30-(recent[j].putts-1)/(3)*(H-70);
  if(j===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);
}
ctx.stroke();
for(var k=0;k<recent.length;k++){
  var dx=50+k*stepX;
  var dy=H-30-(recent[k].putts-1)/(3)*(H-70);
  ctx.beginPath();ctx.arc(dx,dy,4,0,Math.PI*2);
  ctx.fillStyle=recent[k].putts===1?'#00FF88':recent[k].putts===2?'#00B4D8':'#ff6b6b';
  ctx.fill();
}
ctx.fillStyle='#00B4D8';ctx.font='bold 12px sans-serif';ctx.textAlign='left';
ctx.fillText('Recent Putting Trend',50,18);
}

// ===== 2. SHOT DISPERSION PATTERN =====
function showShotDispersion(){
var pn=getPanel('dispersion');
var shots=lsGet('dispersion_shots',[]);
var html='<div class="v12-title">&#x1F3AF; 샷 분산도 분석</div>';

html+='<div class="v12-card"><h3>샷 착탄 기록</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:8px">';
html+='<div><label class="v12-label">클럽</label><select id="v12-disp-club" class="v12-input">';
for(var ci=0;ci<CLUBS.length-1;ci++)html+='<option>'+CLUBS[ci]+'</option>';
html+='</select></div>';
html+='<div><label class="v12-label">좌우 편차 (yd)</label><input id="v12-disp-lr" class="v12-input" type="number" min="-50" max="50" value="0" placeholder="좌(-) 우(+)"></div>';
html+='<div><label class="v12-label">장단 편차 (yd)</label><input id="v12-disp-fb" class="v12-input" type="number" min="-40" max="40" value="0" placeholder="숏(-) 롱(+)"></div>';
html+='</div>';
html+='<button class="v12-btn v12-btn-primary" style="width:100%;margin-top:12px" onclick="window._v12RecordDisp()">착탄 기록</button></div>';

html+='<canvas id="v12-disp-canvas" width="400" height="400" style="width:100%;max-width:400px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

var totalShots=shots.length;
if(totalShots>0){
  var avgLR=0,avgFB=0,maxDev=0;
  for(var i=0;i<shots.length;i++){avgLR+=shots[i].lr;avgFB+=shots[i].fb;var dev=Math.sqrt(shots[i].lr*shots[i].lr+shots[i].fb*shots[i].fb);if(dev>maxDev)maxDev=dev}
  avgLR=(avgLR/totalShots).toFixed(1);avgFB=(avgFB/totalShots).toFixed(1);
  var tendency=parseFloat(avgLR)>3?'우측 편향':parseFloat(avgLR)<-3?'좌측 편향':'센터';
  var distTend=parseFloat(avgFB)>3?'롱 편향':parseFloat(avgFB)<-3?'숏 편향':'적정';

  html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">';
  html+='<div class="v12-stat-card"><div class="v12-stat-val" style="color:#00FF88">'+totalShots+'</div><div class="v12-stat-label">총 샷 수</div></div>';
  html+='<div class="v12-stat-card"><div class="v12-stat-val" style="color:#00B4D8">'+avgLR+'yd</div><div class="v12-stat-label">평균 좌우</div></div>';
  html+='<div class="v12-stat-card"><div class="v12-stat-val" style="color:#FFB800">'+avgFB+'yd</div><div class="v12-stat-label">평균 장단</div></div>';
  html+='<div class="v12-stat-card"><div class="v12-stat-val" style="color:#ff6b6b">'+maxDev.toFixed(0)+'yd</div><div class="v12-stat-label">최대 편차</div></div>';
  html+='</div>';

  html+='<div class="v12-card"><h3>&#x1F4CB; 분석 결과</h3>';
  html+='<p>&#x25C6; 좌우 경향: <strong style="color:#00B4D8">'+tendency+'</strong> (평균 '+avgLR+'yd)</p>';
  html+='<p>&#x25C6; 장단 경향: <strong style="color:#FFB800">'+distTend+'</strong> (평균 '+avgFB+'yd)</p>';
  html+='<p>&#x25C6; 분산 반경: <strong style="color:#ff6b6b">'+maxDev.toFixed(0)+'yd</strong></p>';
  html+='<p style="margin-top:8px;color:#888;font-size:.8em">&#x1F4A1; ';
  if(parseFloat(avgLR)>5)html+='우측으로 밀리는 경향. 그립과 정렬을 점검하세요.';
  else if(parseFloat(avgLR)<-5)html+='좌측으로 당기는 경향. 다운스윙 궤도를 확인하세요.';
  else if(maxDev>25)html+='분산이 큽니다. 일관된 스윙 템포와 정렬에 집중하세요.';
  else html+='분산도가 양호합니다. 현재 스윙을 유지하세요!';
  html+='</p></div>';
}

html+='<div style="text-align:center;margin-top:8px"><button class="v12-btn" onclick="if(confirm(\'분산도 데이터를 초기화하시겠습니까?\'))window._v12ResetDisp()">데이터 초기화</button></div>';

pn.innerHTML='<button class="v12-close" onclick="window._v12Close(\'dispersion\')">&times;</button>'+html;
openPanel('dispersion');playSfx('dispersion_plot');
setTimeout(function(){renderDispersionCanvas(shots)},120);
v12CheckAch();lsSet('ach_disp_viewed',true);
}

window._v12RecordDisp=function(){
var club=document.getElementById('v12-disp-club').value;
var lr=parseInt(document.getElementById('v12-disp-lr').value)||0;
var fb=parseInt(document.getElementById('v12-disp-fb').value)||0;
var shots=lsGet('dispersion_shots',[]);
shots.push({club:club,lr:lr,fb:fb,date:todayStr()});
if(shots.length>300)shots=shots.slice(-300);
lsSet('dispersion_shots',shots);
playSfx('dispersion_plot');showToast(club+' 착탄 기록! (좌우:'+lr+'yd, 장단:'+fb+'yd)');
closePanel('dispersion');setTimeout(showShotDispersion,200);
};
window._v12ResetDisp=function(){lsSet('dispersion_shots',[]);closePanel('dispersion');setTimeout(showShotDispersion,200)};

function renderDispersionCanvas(shots){
var canvas=document.getElementById('v12-disp-canvas');if(!canvas)return;
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a1020';ctx.fillRect(0,0,W,H);
var cx=W/2,cy=H/2;

ctx.strokeStyle='rgba(0,255,136,.1)';ctx.lineWidth=1;
for(var r=1;r<=4;r++){ctx.beginPath();ctx.arc(cx,cy,r*40,0,Math.PI*2);ctx.stroke();ctx.fillStyle='rgba(0,255,136,.3)';ctx.font='9px sans-serif';ctx.textAlign='center';ctx.fillText(r*10+'yd',cx+r*40+2,cy-4)}
ctx.strokeStyle='rgba(255,255,255,.08)';
ctx.beginPath();ctx.moveTo(cx,20);ctx.lineTo(cx,H-20);ctx.stroke();
ctx.beginPath();ctx.moveTo(20,cy);ctx.lineTo(W-20,cy);ctx.stroke();

ctx.fillStyle='rgba(0,255,136,.15)';ctx.beginPath();ctx.arc(cx,cy,6,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#00FF88';ctx.font='bold 10px sans-serif';ctx.textAlign='center';ctx.fillText('TARGET',cx,cy+20);

ctx.fillStyle='#555';ctx.font='10px sans-serif';
ctx.fillText('LEFT',30,cy-5);ctx.fillText('RIGHT',W-30,cy-5);
ctx.fillText('LONG',cx,30);ctx.fillText('SHORT',cx,H-20);

var scale=4;
for(var i=0;i<shots.length;i++){
  var sx=cx+shots[i].lr*scale;
  var sy=cy-shots[i].fb*scale;
  ctx.beginPath();ctx.arc(sx,sy,5,0,Math.PI*2);
  var age=shots.length-i;var alpha=Math.max(0.3,1-age/shots.length*0.7);
  ctx.fillStyle='rgba(0,180,216,'+alpha+')';ctx.fill();
  ctx.strokeStyle='rgba(0,180,216,'+(alpha*0.5)+')';ctx.lineWidth=1;ctx.stroke();
}

if(shots.length>2){
  var sumLR=0,sumFB=0;
  for(var j=0;j<shots.length;j++){sumLR+=shots[j].lr;sumFB+=shots[j].fb}
  var meanLR=sumLR/shots.length,meanFB=sumFB/shots.length;
  var varLR=0,varFB=0;
  for(var k=0;k<shots.length;k++){varLR+=(shots[k].lr-meanLR)*(shots[k].lr-meanLR);varFB+=(shots[k].fb-meanFB)*(shots[k].fb-meanFB)}
  varLR=Math.sqrt(varLR/shots.length);varFB=Math.sqrt(varFB/shots.length);
  ctx.strokeStyle='rgba(255,184,0,.3)';ctx.lineWidth=2;ctx.setLineDash([4,4]);
  ctx.beginPath();ctx.ellipse(cx+meanLR*scale,cy-meanFB*scale,varLR*scale*1.5,varFB*scale*1.5,0,0,Math.PI*2);ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle='#FFB800';ctx.beginPath();ctx.arc(cx+meanLR*scale,cy-meanFB*scale,4,0,Math.PI*2);ctx.fill();
}
ctx.fillStyle='#00B4D8';ctx.font='bold 13px sans-serif';ctx.textAlign='left';
ctx.fillText('Shot Dispersion ('+shots.length+' shots)',12,18);
}

// ===== 3. STROKES GAINED ANALYZER =====
function showSGAnalyzer(){
var pn=getPanel('sg');
var sgData=lsGet('sg_data',{tee:0,approach:0,around:0,putting:0,rounds:0});
var html='<div class="v12-title">&#x1F4CA; 스트로크 게인 분석기</div>';

html+='<div class="v12-card"><h3>라운드 SG 입력</h3>';
html+='<p style="color:#888;font-size:.8em;margin-bottom:8px">각 카테고리에서 스크래치 골퍼 대비 얻은/잃은 타수를 입력하세요.</p>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';
html+='<div><label class="v12-label">SG: Tee (티샷)</label><input id="v12-sg-tee" class="v12-input" type="number" step="0.1" min="-5" max="5" value="0" placeholder="예: 1.2"></div>';
html+='<div><label class="v12-label">SG: Approach (어프로치)</label><input id="v12-sg-app" class="v12-input" type="number" step="0.1" min="-5" max="5" value="0"></div>';
html+='<div><label class="v12-label">SG: Around Green</label><input id="v12-sg-around" class="v12-input" type="number" step="0.1" min="-5" max="5" value="0"></div>';
html+='<div><label class="v12-label">SG: Putting</label><input id="v12-sg-putt" class="v12-input" type="number" step="0.1" min="-5" max="5" value="0"></div>';
html+='</div>';
html+='<button class="v12-btn v12-btn-primary" style="width:100%;margin-top:12px" onclick="window._v12RecordSG()">라운드 SG 저장</button></div>';

var r=sgData.rounds;
var avgTee=r>0?(sgData.tee/r).toFixed(2):'+0.00';
var avgApp=r>0?(sgData.approach/r).toFixed(2):'+0.00';
var avgAround=r>0?(sgData.around/r).toFixed(2):'+0.00';
var avgPutt=r>0?(sgData.putting/r).toFixed(2):'+0.00';
var totalSG=r>0?((sgData.tee+sgData.approach+sgData.around+sgData.putting)/r).toFixed(2):'+0.00';

html+='<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px">';
var sgItems=[{name:'Tee',val:avgTee},{name:'Approach',val:avgApp},{name:'Around',val:avgAround},{name:'Putting',val:avgPutt},{name:'Total',val:totalSG}];
for(var i=0;i<sgItems.length;i++){
  var v=parseFloat(sgItems[i].val);
  var c=v>0?'#00FF88':v<0?'#ff6b6b':'#888';
  var prefix=v>0?'+':'';
  html+='<div class="v12-stat-card"><div class="v12-stat-val" style="color:'+c+';font-size:1em">'+prefix+sgItems[i].val+'</div><div class="v12-stat-label">'+sgItems[i].name+'</div></div>';
}
html+='</div>';

html+='<canvas id="v12-sg-canvas" width="560" height="320" style="width:100%;max-width:560px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

html+='<div class="v12-card"><h3>&#x1F4D6; SG 해석 가이드</h3>';
html+='<table class="v12-table"><tr><th>SG 값</th><th>의미</th><th>등급</th></tr>';
html+='<tr><td style="color:#00FF88">+2.0 이상</td><td>투어 프로 수준</td><td><span class="v12-badge v12-badge-a">S</span></td></tr>';
html+='<tr><td style="color:#00FF88">+0.5 ~ +2.0</td><td>상급 아마추어</td><td><span class="v12-badge v12-badge-a">A</span></td></tr>';
html+='<tr><td style="color:#888">-0.5 ~ +0.5</td><td>스크래치 수준</td><td><span class="v12-badge v12-badge-b">B</span></td></tr>';
html+='<tr><td style="color:#ff6b6b">-2.0 ~ -0.5</td><td>개선 필요</td><td><span class="v12-badge" style="background:rgba(255,107,107,.12);color:#ff6b6b">C</span></td></tr>';
html+='<tr><td style="color:#ff6b6b">-2.0 이하</td><td>집중 훈련 필요</td><td><span class="v12-badge" style="background:rgba(255,107,107,.12);color:#ff6b6b">D</span></td></tr>';
html+='</table></div>';

html+='<p style="text-align:center;font-size:.75em;color:#555">기록 라운드: '+r+'회</p>';

pn.innerHTML='<button class="v12-close" onclick="window._v12Close(\'sg\')">&times;</button>'+html;
openPanel('sg');playSfx('sg_analyze');
setTimeout(function(){renderSGCanvas(sgData)},120);
v12CheckAch();lsSet('ach_sg_viewed',true);
}

window._v12RecordSG=function(){
var tee=parseFloat(document.getElementById('v12-sg-tee').value)||0;
var app=parseFloat(document.getElementById('v12-sg-app').value)||0;
var around=parseFloat(document.getElementById('v12-sg-around').value)||0;
var putt=parseFloat(document.getElementById('v12-sg-putt').value)||0;
var d=lsGet('sg_data',{tee:0,approach:0,around:0,putting:0,rounds:0});
d.tee+=tee;d.approach+=app;d.around+=around;d.putting+=putt;d.rounds++;
lsSet('sg_data',d);
var sgLog=lsGet('sg_log',[]);sgLog.push({tee:tee,approach:app,around:around,putting:putt,date:todayStr()});
if(sgLog.length>50)sgLog=sgLog.slice(-50);lsSet('sg_log',sgLog);
playSfx('sg_analyze');showToast('SG 데이터 저장! (Total: '+(tee+app+around+putt).toFixed(1)+')');
closePanel('sg');setTimeout(showSGAnalyzer,200);
};

function renderSGCanvas(data){
var canvas=document.getElementById('v12-sg-canvas');if(!canvas)return;
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a1020';ctx.fillRect(0,0,W,H);

var categories=['SG: Tee','SG: Approach','SG: Around','SG: Putting'];
var r=data.rounds||1;
var vals=[data.tee/r,data.approach/r,data.around/r,data.putting/r];
var colors=['#00FF88','#00B4D8','#FFB800','#A855F7'];
var barW=80;var gap=30;var startX=(W-(categories.length*barW+(categories.length-1)*gap))/2;
var zeroY=H/2+20;

ctx.strokeStyle='rgba(255,255,255,.1)';ctx.lineWidth=1;
for(var g=-3;g<=3;g++){
  var gy=zeroY-g*(H-120)/6;
  ctx.beginPath();ctx.moveTo(40,gy);ctx.lineTo(W-20,gy);ctx.stroke();
  ctx.fillStyle='#555';ctx.font='10px sans-serif';ctx.textAlign='right';
  var lbl=g>0?'+'+g:''+g;ctx.fillText(lbl,36,gy+4);
}
ctx.strokeStyle='rgba(255,255,255,.2)';ctx.beginPath();ctx.moveTo(40,zeroY);ctx.lineTo(W-20,zeroY);ctx.stroke();

for(var i=0;i<categories.length;i++){
  var bx=startX+i*(barW+gap);
  var bh=vals[i]*(H-120)/6;
  var by=bh>=0?zeroY-bh:zeroY;
  var absBh=Math.abs(bh);
  var grad=ctx.createLinearGradient(bx,by,bx,by+absBh);
  grad.addColorStop(0,colors[i]);grad.addColorStop(1,colors[i].replace(')',',0.2)').replace('rgb','rgba').replace('#','rgba('));
  grad.addColorStop(1,'rgba(10,16,32,0.8)');
  ctx.fillStyle=colors[i];ctx.globalAlpha=0.8;
  ctx.beginPath();
  if(bh>=0){ctx.moveTo(bx+4,zeroY);ctx.lineTo(bx+4,by+4);ctx.quadraticCurveTo(bx+4,by,bx+8,by);ctx.lineTo(bx+barW-8,by);ctx.quadraticCurveTo(bx+barW-4,by,bx+barW-4,by+4);ctx.lineTo(bx+barW-4,zeroY)}
  else{ctx.moveTo(bx+4,zeroY);ctx.lineTo(bx+4,zeroY+absBh-4);ctx.quadraticCurveTo(bx+4,zeroY+absBh,bx+8,zeroY+absBh);ctx.lineTo(bx+barW-8,zeroY+absBh);ctx.quadraticCurveTo(bx+barW-4,zeroY+absBh,bx+barW-4,zeroY+absBh-4);ctx.lineTo(bx+barW-4,zeroY)}
  ctx.fill();ctx.globalAlpha=1;

  var prefix=vals[i]>=0?'+':'';
  ctx.fillStyle='#fff';ctx.font='bold 14px sans-serif';ctx.textAlign='center';
  var labelY=bh>=0?by-10:zeroY+absBh+18;
  ctx.fillText(prefix+vals[i].toFixed(2),bx+barW/2,labelY);
  ctx.fillStyle='#aaa';ctx.font='11px sans-serif';
  ctx.fillText(categories[i],bx+barW/2,H-15);
}
ctx.fillStyle='#00B4D8';ctx.font='bold 14px sans-serif';ctx.textAlign='left';
ctx.fillText('Strokes Gained Analysis ('+data.rounds+' rounds)',40,22);
}

// ===== 4. COURSE MANAGEMENT AI =====
function showCourseAI(){
var pn=getPanel('caddie');
var html='<div class="v12-title">&#x1F916; 코스 매니지먼트 AI</div>';

html+='<div class="v12-card"><h3>홀 정보 입력</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:8px">';
html+='<div><label class="v12-label">홀 번호</label><input id="v12-ai-hole" class="v12-input" type="number" min="1" max="18" value="1"></div>';
html+='<div><label class="v12-label">Par</label><select id="v12-ai-par" class="v12-input"><option value="3">Par 3</option><option value="4" selected>Par 4</option><option value="5">Par 5</option></select></div>';
html+='<div><label class="v12-label">거리 (yd)</label><input id="v12-ai-dist" class="v12-input" type="number" min="100" max="600" value="380"></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:8px">';
html+='<div><label class="v12-label">해저드</label><select id="v12-ai-hazard" class="v12-input"><option value="none">없음</option><option value="water_left">워터 (좌)</option><option value="water_right">워터 (우)</option><option value="bunker_left">벙커 (좌)</option><option value="bunker_right">벙커 (우)</option><option value="ob_left">OB (좌)</option><option value="ob_right">OB (우)</option></select></div>';
html+='<div><label class="v12-label">바람</label><select id="v12-ai-wind" class="v12-input"><option value="calm">무풍</option><option value="head_light">약한 맞바람</option><option value="head_strong">강한 맞바람</option><option value="tail_light">약한 뒷바람</option><option value="tail_strong">강한 뒷바람</option></select></div>';
html+='<div><label class="v12-label">핀 위치</label><select id="v12-ai-pin" class="v12-input"><option value="center">중앙</option><option value="front">프론트</option><option value="back">백</option><option value="left">좌측</option><option value="right">우측</option></select></div>';
html+='</div>';
html+='<button class="v12-btn v12-btn-primary" style="width:100%;margin-top:12px" onclick="window._v12AIAdvice()">AI 공략 분석</button></div>';

html+='<div id="v12-ai-result"></div>';

html+='<div class="v12-card"><h3>&#x1F4D6; 코스 매니지먼트 원칙</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">';
var principles=[
  {icon:'&#x1F3AF;',title:'미스의 방향 관리',desc:'해저드 반대편을 겨냥하라'},
  {icon:'&#x1F4CA;',title:'확률적 판단',desc:'영웅 샷보다 안전한 플레이'},
  {icon:'&#x26F3;',title:'그린 센터 공략',desc:'핀을 직접 공략하지 마라'},
  {icon:'&#x1F9E0;',title:'감정 통제',desc:'실수 후 과도한 만회 금지'},
  {icon:'&#x1F4A8;',title:'바람 고려',desc:'클럽 1~2개 여유있게'},
  {icon:'&#x1F3CC;&#xFE0F;',title:'레이업 전략',desc:'Par 5에서 무리한 2온 금지'}
];
for(var pi=0;pi<principles.length;pi++){
  html+='<div class="v12-mini-stat"><div style="font-size:1.3em">'+principles[pi].icon+'</div><div class="v12-mini-val" style="font-size:.85em">'+principles[pi].title+'</div><div class="v12-mini-label">'+principles[pi].desc+'</div></div>';
}
html+='</div></div>';

pn.innerHTML='<button class="v12-close" onclick="window._v12Close(\'caddie\')">&times;</button>'+html;
openPanel('caddie');playSfx('caddie_advice');
v12CheckAch();lsSet('ach_caddie_used',true);
}

window._v12AIAdvice=function(){
var hole=parseInt(document.getElementById('v12-ai-hole').value)||1;
var par=parseInt(document.getElementById('v12-ai-par').value);
var dist=parseInt(document.getElementById('v12-ai-dist').value)||380;
var hazard=document.getElementById('v12-ai-hazard').value;
var wind=document.getElementById('v12-ai-wind').value;
var pin=document.getElementById('v12-ai-pin').value;

var advice=[];var riskLevel='LOW';var strategy='공격';

if(par===3){
  var clubIdx=0;
  for(var i=0;i<CLUB_AVG_DIST.length;i++){if(CLUB_AVG_DIST[i]<=dist+10&&CLUB_AVG_DIST[i]>=dist-20){clubIdx=i;break}}
  if(wind==='head_light'){clubIdx=Math.max(0,clubIdx-1)}
  else if(wind==='head_strong'){clubIdx=Math.max(0,clubIdx-2)}
  else if(wind==='tail_light'){clubIdx=Math.min(CLUBS.length-2,clubIdx+1)}
  advice.push('&#x1F3CC;&#xFE0F; <strong>추천 클럽:</strong> '+CLUBS[clubIdx]+' ('+CLUB_AVG_DIST[clubIdx]+'yd)');
  if(hazard!=='none'){
    riskLevel='MED';strategy='안전';
    var safeDir=hazard.indexOf('left')>-1?'우측':'좌측';
    advice.push('&#x26A0;&#xFE0F; <strong>해저드 경고:</strong> '+safeDir+' 방향으로 에임');
  }
  if(pin==='front')advice.push('&#x26F3; <strong>핀 프론트:</strong> 그린 센터 공략 → 내리막 퍼팅 회피');
  else if(pin==='back')advice.push('&#x26F3; <strong>핀 백:</strong> 1클럽 업 고려');
  advice.push('&#x1F4A1; <strong>전략:</strong> 그린 센터 착탄 후 2퍼트 파 세이브 목표');
} else if(par===4){
  advice.push('&#x1F3CC;&#xFE0F; <strong>티샷:</strong> Driver ('+CLUB_AVG_DIST[0]+'yd)');
  var remain=dist-CLUB_AVG_DIST[0];
  if(wind==='head_light')remain+=10;else if(wind==='head_strong')remain+=20;
  else if(wind==='tail_light')remain-=8;else if(wind==='tail_strong')remain-=15;
  var appClub=0;
  for(var j=0;j<CLUB_AVG_DIST.length;j++){if(CLUB_AVG_DIST[j]<=remain+10&&CLUB_AVG_DIST[j]>=remain-15){appClub=j;break}}
  advice.push('&#x26F3; <strong>세컨샷:</strong> ~'+Math.max(0,remain)+'yd 남음 → '+CLUBS[appClub]);
  if(hazard!=='none'){
    riskLevel='MED';
    var safeDir2=hazard.indexOf('left')>-1?'우측':'좌측';
    advice.push('&#x26A0;&#xFE0F; <strong>해저드:</strong> 티샷 '+safeDir2+' 페어웨이 타겟');
    if(hazard.indexOf('water')>-1){riskLevel='HIGH';strategy='보수';advice.push('&#x1F4A7; <strong>워터:</strong> 레이업 고려 (리스크 &gt; 리워드)')}
  }
  if(dist>430){riskLevel='HIGH';strategy='보수';advice.push('&#x1F4AA; <strong>장홀:</strong> 보기 회피 전략. 2온 무리 X')}
  advice.push('&#x1F4A1; <strong>목표:</strong> 페어웨이 안착 → 그린 온 → 2퍼트 파');
} else {
  advice.push('&#x1F3CC;&#xFE0F; <strong>티샷:</strong> Driver → 페어웨이 안착 우선');
  var rem2=dist-CLUB_AVG_DIST[0];
  if(rem2>CLUB_AVG_DIST[0]){
    advice.push('&#x26F3; <strong>세컨샷:</strong> 3W/5W 레이업 → ~'+Math.max(0,rem2-CLUB_AVG_DIST[1])+'yd 남기기');
    strategy='보수';
  } else {
    advice.push('&#x26F3; <strong>2온 시도:</strong> '+rem2+'yd → 3W/5W (리스크 주의)');
    riskLevel='HIGH';strategy='공격';
  }
  if(hazard.indexOf('water')>-1){strategy='보수';advice.push('&#x1F4A7; <strong>워터:</strong> 레이업 강력 추천')}
  advice.push('&#x1F4A1; <strong>전략:</strong> 3온 2퍼트 버디/파 목표');
}

var riskColor=riskLevel==='LOW'?'#00FF88':riskLevel==='MED'?'#FFB800':'#ff6b6b';
var stratColor=strategy==='공격'?'#00FF88':strategy==='안전'?'#FFB800':'#ff6b6b';

var rhtml='<div class="v12-card" style="border-color:'+riskColor+'">';
rhtml+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">';
rhtml+='<h3 style="margin:0">&#x1F916; AI 공략: #'+hole+' Par '+par+' ('+dist+'yd)</h3>';
rhtml+='<div><span class="v12-badge" style="background:'+riskColor+'22;color:'+riskColor+'">리스크: '+riskLevel+'</span> ';
rhtml+='<span class="v12-badge" style="background:'+stratColor+'22;color:'+stratColor+'">전략: '+strategy+'</span></div></div>';
for(var a=0;a<advice.length;a++){rhtml+='<p style="margin:6px 0;font-size:.88em;line-height:1.6">'+advice[a]+'</p>'}
rhtml+='</div>';

document.getElementById('v12-ai-result').innerHTML=rhtml;
playSfx('caddie_advice');
};

// ===== 5. PLAYING CONDITIONS CALCULATOR =====
function showConditionCalc(){
var pn=getPanel('conditions');
var html='<div class="v12-title">&#x1F321;&#xFE0F; 컨디션 보정 계산기</div>';

html+='<div class="v12-card"><h3>플레이 환경 입력</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">';
html+='<div><label class="v12-label">기온 (&deg;C)</label><input id="v12-cond-temp" class="v12-input" type="number" min="-10" max="45" value="25"></div>';
html+='<div><label class="v12-label">고도 (m)</label><input id="v12-cond-alt" class="v12-input" type="number" min="0" max="3000" value="50"></div>';
html+='<div><label class="v12-label">습도 (%)</label><input id="v12-cond-humid" class="v12-input" type="number" min="0" max="100" value="60"></div>';
html+='<div><label class="v12-label">기본 비거리 (yd)</label><input id="v12-cond-dist" class="v12-input" type="number" min="50" max="350" value="200"></div>';
html+='</div>';
html+='<button class="v12-btn v12-btn-primary" style="width:100%;margin-top:12px" onclick="window._v12CalcCondition()">보정 계산</button></div>';

html+='<div id="v12-cond-result"></div>';

html+='<canvas id="v12-cond-canvas" width="560" height="280" style="width:100%;max-width:560px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

html+='<div class="v12-card"><h3>&#x1F4D6; 환경 보정 기본 원칙</h3>';
html+='<table class="v12-table"><tr><th>요인</th><th>효과</th><th>보정량</th></tr>';
html+='<tr><td>&#x1F321;&#xFE0F; 기온 +10&deg;C</td><td style="color:#00FF88">비거리 증가</td><td>+2~3 yd</td></tr>';
html+='<tr><td>&#x1F321;&#xFE0F; 기온 -10&deg;C</td><td style="color:#ff6b6b">비거리 감소</td><td>-3~5 yd</td></tr>';
html+='<tr><td>&#x26F0;&#xFE0F; 고도 +300m</td><td style="color:#00FF88">비거리 증가</td><td>+2% (~4yd)</td></tr>';
html+='<tr><td>&#x1F4A7; 습도 높음</td><td style="color:#00FF88">약간 증가</td><td>+1~2 yd</td></tr>';
html+='<tr><td>&#x1F327;&#xFE0F; 비/젖은 페웨</td><td style="color:#ff6b6b">런 감소</td><td>-5~15 yd</td></tr>';
html+='</table></div>';

pn.innerHTML='<button class="v12-close" onclick="window._v12Close(\'conditions\')">&times;</button>'+html;
openPanel('conditions');playSfx('condition_calc');
setTimeout(function(){renderCondCanvas(25,50,60,200)},120);
v12CheckAch();lsSet('ach_cond_used',true);
}

window._v12CalcCondition=function(){
var temp=parseFloat(document.getElementById('v12-cond-temp').value)||25;
var alt=parseFloat(document.getElementById('v12-cond-alt').value)||50;
var humid=parseFloat(document.getElementById('v12-cond-humid').value)||60;
var dist=parseFloat(document.getElementById('v12-cond-dist').value)||200;

var tempAdj=(temp-20)*0.25;
var altAdj=alt/300*2;
var humidAdj=(humid-50)*0.02;
var totalPct=tempAdj+altAdj+humidAdj;
var adjDist=Math.round(dist*(1+totalPct/100));
var diff=adjDist-dist;
var prefix=diff>=0?'+':'';

var rhtml='<div class="v12-card" style="text-align:center;background:linear-gradient(135deg,rgba(0,180,216,.06),rgba(0,255,136,.06))">';
rhtml+='<div style="font-size:2.2em;font-weight:900;color:#00FF88">'+adjDist+' yd</div>';
rhtml+='<div style="color:#888;font-size:.85em;margin:4px 0">기본 '+dist+'yd → <span style="color:'+(diff>=0?'#00FF88':'#ff6b6b')+'">'+prefix+diff+' yd ('+prefix+totalPct.toFixed(1)+'%)</span></div>';

rhtml+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px;text-align:center">';
var tColor=tempAdj>=0?'#00FF88':'#ff6b6b';
rhtml+='<div class="v12-mini-stat"><div class="v12-mini-val" style="color:'+tColor+'">'+(tempAdj>=0?'+':'')+tempAdj.toFixed(1)+'%</div><div class="v12-mini-label">기온 ('+temp+'&deg;C)</div></div>';
rhtml+='<div class="v12-mini-stat"><div class="v12-mini-val" style="color:#00FF88">+'+altAdj.toFixed(1)+'%</div><div class="v12-mini-label">고도 ('+alt+'m)</div></div>';
var hColor=humidAdj>=0?'#00FF88':'#ff6b6b';
rhtml+='<div class="v12-mini-stat"><div class="v12-mini-val" style="color:'+hColor+'">'+(humidAdj>=0?'+':'')+humidAdj.toFixed(1)+'%</div><div class="v12-mini-label">습도 ('+humid+'%)</div></div>';
rhtml+='</div>';

rhtml+='<p style="margin-top:12px;font-size:.82em;color:#888">&#x1F4A1; ';
if(temp<10)rhtml+='추운 날씨입니다. 공의 탄성이 줄어 비거리가 감소합니다. 1~2클럽 업하세요.';
else if(temp>35)rhtml+='더운 날씨입니다. 체력 관리에 유의하고 수분을 충분히 섭취하세요.';
else if(alt>500)rhtml+='고도가 높습니다. 공기 밀도가 낮아 비거리가 증가합니다.';
else rhtml+='보정 범위가 적은 환경입니다. 평소 비거리에 가깝게 플레이하세요.';
rhtml+='</p></div>';

document.getElementById('v12-cond-result').innerHTML=rhtml;
renderCondCanvas(temp,alt,humid,dist);
playSfx('condition_calc');
};

function renderCondCanvas(temp,alt,humid,dist){
var canvas=document.getElementById('v12-cond-canvas');if(!canvas)return;
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a1020';ctx.fillRect(0,0,W,H);

var factors=[
  {name:'기온',value:temp,unit:'°C',min:-10,max:45,color:'#ff6b6b',icon:'\u{1F321}'},
  {name:'고도',value:alt,unit:'m',min:0,max:2000,color:'#00B4D8',icon:'⛰'},
  {name:'습도',value:humid,unit:'%',min:0,max:100,color:'#00FF88',icon:'\u{1F4A7}'}
];
var barH=40;var gap=20;var startY=50;
for(var i=0;i<factors.length;i++){
  var f=factors[i];var y=startY+i*(barH+gap);
  var pct=(f.value-f.min)/(f.max-f.min);
  var barMaxW=W-160;
  ctx.fillStyle='rgba(255,255,255,.04)';
  ctx.beginPath();ctx.roundRect(120,y,barMaxW,barH,8);ctx.fill();
  var grad=ctx.createLinearGradient(120,y,120+barMaxW*pct,y);
  grad.addColorStop(0,f.color);grad.addColorStop(1,f.color+'88');
  ctx.fillStyle=grad;
  ctx.beginPath();ctx.roundRect(120,y,barMaxW*pct,barH,8);ctx.fill();
  ctx.fillStyle='#fff';ctx.font='bold 14px sans-serif';ctx.textAlign='right';
  ctx.fillText(f.name,105,y+barH/2+5);
  ctx.fillStyle='#fff';ctx.font='bold 13px sans-serif';ctx.textAlign='left';
  ctx.fillText(f.value+f.unit,125+barMaxW*pct+8,y+barH/2+5);
}

var tempAdj=(temp-20)*0.25;var altAdj=alt/300*2;var humidAdj=(humid-50)*0.02;
var totalPct=tempAdj+altAdj+humidAdj;
var adjDist=Math.round(dist*(1+totalPct/100));
ctx.fillStyle='#00B4D8';ctx.font='bold 14px sans-serif';ctx.textAlign='left';
ctx.fillText('Playing Conditions Impact',20,25);
ctx.fillStyle='#FFB800';ctx.font='bold 18px sans-serif';ctx.textAlign='center';
ctx.fillText(dist+'yd → '+adjDist+'yd ('+(totalPct>=0?'+':'')+totalPct.toFixed(1)+'%)',W/2,H-25);
}

// ===== 6. GREEN READING GUIDE =====
function showGreenReading(){
var pn=getPanel('green');
var html='<div class="v12-title">&#x26F3; 퍼팅 그린 리딩 가이드</div>';

html+='<div class="v12-card"><h3>그린 정보 입력</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:8px">';
html+='<div><label class="v12-label">퍼팅 거리 (ft)</label><input id="v12-gr-dist" class="v12-input" type="number" min="1" max="60" value="15"></div>';
html+='<div><label class="v12-label">경사 방향</label><select id="v12-gr-slope" class="v12-input"><option value="flat">평지</option><option value="left">좌→우 경사</option><option value="right">우→좌 경사</option><option value="uphill">오르막</option><option value="downhill">내리막</option><option value="up_left">오르막+좌경사</option><option value="up_right">오르막+우경사</option><option value="down_left">내리막+좌경사</option><option value="down_right">내리막+우경사</option></select></div>';
html+='<div><label class="v12-label">경사도 (%)</label><input id="v12-gr-grade" class="v12-input" type="number" min="0" max="8" step="0.5" value="2"></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">';
html+='<div><label class="v12-label">그린 스피드 (ft)</label><select id="v12-gr-speed" class="v12-input"><option value="8">느림 (8ft)</option><option value="9">보통 (9ft)</option><option value="10" selected>빠름 (10ft)</option><option value="11">매우빠름 (11ft)</option><option value="12">투어급 (12ft)</option></select></div>';
html+='<div><label class="v12-label">잔디 결</label><select id="v12-gr-grain" class="v12-input"><option value="with">순결 (같은 방향)</option><option value="against">역결 (반대 방향)</option><option value="cross">횡결</option><option value="none" selected>무시</option></select></div>';
html+='</div>';
html+='<button class="v12-btn v12-btn-primary" style="width:100%;margin-top:12px" onclick="window._v12ReadGreen()">그린 리딩 분석</button></div>';

html+='<canvas id="v12-green-canvas" width="400" height="400" style="width:100%;max-width:400px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';
html+='<div id="v12-green-result"></div>';

html+='<div class="v12-card"><h3>&#x1F4D6; 그린 리딩 팁</h3>';
html+='<div style="font-size:.85em;color:#aaa;line-height:1.7">';
html+='<p>&#x25C6; <strong>에임포인트:</strong> 경사 반대편으로 홀컵 1~3개 너비만큼 에임</p>';
html+='<p>&#x25C6; <strong>내리막:</strong> 거리 감각 -20~30%. 부드럽게 굴리기</p>';
html+='<p>&#x25C6; <strong>오르막:</strong> 거리 감각 +15~25%. 확실하게 지나가도록</p>';
html+='<p>&#x25C6; <strong>빠른 그린:</strong> 경사 영향 2배. 보수적 에임</p>';
html+='<p>&#x25C6; <strong>브레이크 포인트:</strong> 전체 거리의 1/3~1/2 지점에서 최대 꺾임</p>';
html+='</div></div>';

pn.innerHTML='<button class="v12-close" onclick="window._v12Close(\'green\')">&times;</button>'+html;
openPanel('green');playSfx('green_read');
setTimeout(function(){renderGreenCanvas(15,'flat',2,10,'none')},120);
v12CheckAch();lsSet('ach_green_used',true);
}

window._v12ReadGreen=function(){
var dist=parseInt(document.getElementById('v12-gr-dist').value)||15;
var slope=document.getElementById('v12-gr-slope').value;
var grade=parseFloat(document.getElementById('v12-gr-grade').value)||2;
var speed=parseInt(document.getElementById('v12-gr-speed').value)||10;
var grain=document.getElementById('v12-gr-grain').value;

var breakAmount=0;var aimDir='직진';var speedFactor=1;var grainAdj=0;

if(slope.indexOf('left')>-1){breakAmount=grade*dist*0.04*(speed/10);aimDir='좌측'}
if(slope.indexOf('right')>-1){breakAmount=grade*dist*0.04*(speed/10);aimDir='우측'}
if(slope.indexOf('up')>-1){speedFactor=1+grade*0.12}
if(slope.indexOf('down')>-1){speedFactor=1-grade*0.08}
if(slope==='flat'){speedFactor=1;breakAmount=0;aimDir='직진'}
if(slope==='uphill'){speedFactor=1+grade*0.12;aimDir='직진'}
if(slope==='downhill'){speedFactor=Math.max(0.5,1-grade*0.08);aimDir='직진'}

if(grain==='with')grainAdj=-0.08;
else if(grain==='against')grainAdj=0.12;
else if(grain==='cross')breakAmount*=1.15;
speedFactor+=grainAdj;

var effectiveDist=Math.round(dist*speedFactor);
var breakInches=Math.round(breakAmount*2.54);
var aimCups=Math.round(breakAmount/4.25*10)/10;

var rhtml='<div class="v12-card" style="text-align:center;background:linear-gradient(135deg,rgba(0,255,136,.06),rgba(0,180,216,.06))">';
rhtml+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">';
rhtml+='<div class="v12-mini-stat"><div class="v12-mini-val" style="color:#00FF88">'+effectiveDist+'ft</div><div class="v12-mini-label">체감 거리</div></div>';
rhtml+='<div class="v12-mini-stat"><div class="v12-mini-val" style="color:#FFB800">'+breakAmount.toFixed(1)+'ft</div><div class="v12-mini-label">브레이크</div></div>';
rhtml+='<div class="v12-mini-stat"><div class="v12-mini-val" style="color:#00B4D8">'+aimDir+'</div><div class="v12-mini-label">에임 방향</div></div>';
rhtml+='</div>';
if(aimCups>0){rhtml+='<p style="margin-top:10px;font-size:.88em;color:#aaa">에임포인트: 홀컵 <strong style="color:#FFB800">'+aimCups+'</strong>개 '+aimDir+'으로 에임</p>'}
rhtml+='<p style="margin-top:6px;font-size:.82em;color:#888">&#x1F4A1; ';
if(slope.indexOf('down')>-1)rhtml+='내리막 퍼팅. 터치만으로 굴리세요. 롱 퍼팅 주의!';
else if(slope.indexOf('up')>-1)rhtml+='오르막 퍼팅. 홀컵 30cm 뒤까지 보내는 느낌으로!';
else if(breakAmount>2)rhtml+='브레이크가 큽니다. 에임포인트를 충분히 잡으세요.';
else rhtml+='비교적 직선 퍼팅. 거리감에 집중하세요.';
rhtml+='</p></div>';

document.getElementById('v12-green-result').innerHTML=rhtml;
renderGreenCanvas(dist,slope,grade,speed,grain);
playSfx('green_read');
};

function renderGreenCanvas(dist,slope,grade,speed,grain){
var canvas=document.getElementById('v12-green-canvas');if(!canvas)return;
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;
var cx=W/2,cy=H/2;

ctx.fillStyle='#1a4d1a';ctx.fillRect(0,0,W,H);
for(var i=0;i<80;i++){ctx.fillStyle='rgba(255,255,255,0.02)';ctx.beginPath();ctx.arc(Math.random()*W,Math.random()*H,1,0,Math.PI*2);ctx.fill()}

ctx.fillStyle='#000';ctx.beginPath();ctx.arc(cx,80,6,0,Math.PI*2);ctx.fill();
ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.beginPath();ctx.arc(cx,80,6,0,Math.PI*2);ctx.stroke();
ctx.fillStyle='#fff';ctx.font='bold 10px sans-serif';ctx.textAlign='center';ctx.fillText('HOLE',cx,60);

ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(cx,H-60,4,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#aaa';ctx.font='10px sans-serif';ctx.fillText('BALL ('+dist+'ft)',cx,H-40);

var breakPx=0;
if(slope.indexOf('left')>-1)breakPx=grade*15;
if(slope.indexOf('right')>-1)breakPx=-grade*15;

ctx.strokeStyle='#FFB800';ctx.lineWidth=2;ctx.setLineDash([6,4]);ctx.beginPath();
ctx.moveTo(cx,H-60);
if(breakPx!==0){
  var cpx=cx+breakPx*1.5;var cpy=cy;
  ctx.quadraticCurveTo(cpx,cpy,cx,80);
} else {
  ctx.lineTo(cx,80);
}
ctx.stroke();ctx.setLineDash([]);

if(breakPx!==0){
  ctx.strokeStyle='rgba(0,255,136,.4)';ctx.lineWidth=1.5;ctx.setLineDash([3,3]);
  ctx.beginPath();ctx.moveTo(cx,H-60);ctx.lineTo(cx,80);ctx.stroke();ctx.setLineDash([]);
  var aimX=cx-breakPx*0.8;var aimY=80;
  ctx.fillStyle='rgba(0,180,216,.6)';ctx.beginPath();ctx.arc(aimX,aimY,5,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#00B4D8';ctx.font='bold 9px sans-serif';ctx.fillText('AIM',aimX,aimY-10);
}

if(slope.indexOf('up')>-1||slope.indexOf('down')>-1){
  ctx.fillStyle='rgba(255,255,255,.15)';ctx.font='24px sans-serif';ctx.textAlign='right';
  if(slope.indexOf('up')>-1)ctx.fillText('↑',W-15,cy);
  else ctx.fillText('↓',W-15,cy);
}

ctx.strokeStyle='rgba(255,255,255,.15)';ctx.lineWidth=1;
for(var j=0;j<5;j++){var gy=60+j*(H-120)/4;ctx.beginPath();ctx.moveTo(20,gy);ctx.lineTo(W-20,gy);ctx.stroke()}

ctx.fillStyle='#fff';ctx.font='bold 12px sans-serif';ctx.textAlign='left';
ctx.fillText('Green Reading (Speed: '+speed+'ft)',12,20);
var slopeLabel=slope==='flat'?'평지':slope;
ctx.fillStyle='#888';ctx.font='11px sans-serif';ctx.fillText('경사: '+slopeLabel+' ('+grade+'%)',12,36);
}

// ===== 7. CLUB GAPPING ANALYSIS =====
function showClubGap(){
var pn=getPanel('gap');
var gapData=lsGet('club_gap_data',{});
var html='<div class="v12-title">&#x1F4CF; 클럽 갭 분석</div>';

html+='<div class="v12-card"><h3>클럽별 비거리 설정</h3>';
html+='<p style="color:#888;font-size:.8em;margin-bottom:8px">각 클럽의 평균 비거리를 입력하세요. 적정 갭: 10~15yd</p>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
for(var i=0;i<CLUBS.length-1;i++){
  var saved=gapData[CLUBS[i]]||CLUB_AVG_DIST[i];
  html+='<div style="display:flex;align-items:center;gap:6px"><label class="v12-label" style="width:50px;margin:0;flex-shrink:0">'+CLUBS[i]+'</label><input id="v12-gap-'+i+'" class="v12-input" type="number" min="30" max="350" value="'+saved+'" style="flex:1"></div>';
}
html+='</div>';
html+='<button class="v12-btn v12-btn-primary" style="width:100%;margin-top:12px" onclick="window._v12AnalyzeGap()">갭 분석</button></div>';

html+='<canvas id="v12-gap-canvas" width="560" height="340" style="width:100%;max-width:560px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';
html+='<div id="v12-gap-result"></div>';

pn.innerHTML='<button class="v12-close" onclick="window._v12Close(\'gap\')">&times;</button>'+html;
openPanel('gap');playSfx('gap_view');
setTimeout(function(){window._v12AnalyzeGap()},200);
v12CheckAch();lsSet('ach_gap_viewed',true);
}

window._v12AnalyzeGap=function(){
var distances=[];var gapData={};
for(var i=0;i<CLUBS.length-1;i++){
  var v=parseInt(document.getElementById('v12-gap-'+i).value)||CLUB_AVG_DIST[i];
  distances.push({club:CLUBS[i],dist:v});
  gapData[CLUBS[i]]=v;
}
lsSet('club_gap_data',gapData);
distances.sort(function(a,b){return b.dist-a.dist});

var gaps=[];var issues=[];
for(var j=0;j<distances.length-1;j++){
  var gap=distances[j].dist-distances[j+1].dist;
  gaps.push({from:distances[j].club,to:distances[j+1].club,gap:gap});
  if(gap>20)issues.push({type:'big',msg:distances[j].club+'과 '+distances[j+1].club+' 사이 갭이 '+gap+'yd로 너무 큽니다. 사이 클럽 추가를 고려하세요.'});
  else if(gap<5)issues.push({type:'small',msg:distances[j].club+'과 '+distances[j+1].club+' 사이 갭이 '+gap+'yd로 너무 좁습니다. 하나를 제거하고 다른 클럽을 넣으세요.'});
}

var rhtml='';
if(issues.length>0){
  rhtml+='<div class="v12-card"><h3>&#x26A0;&#xFE0F; 갭 이슈 ('+issues.length+'건)</h3>';
  for(var k=0;k<issues.length;k++){
    var color=issues[k].type==='big'?'#ff6b6b':'#FFB800';
    rhtml+='<p style="margin:6px 0;font-size:.85em;color:'+color+'">&#x25C6; '+issues[k].msg+'</p>';
  }
  rhtml+='</div>';
} else {
  rhtml+='<div class="v12-card" style="text-align:center"><p style="color:#00FF88;font-size:1em">&#x2705; 모든 클럽 갭이 적정 범위 (5~20yd)입니다!</p></div>';
}

var el=document.getElementById('v12-gap-result');if(el)el.innerHTML=rhtml;

var canvas=document.getElementById('v12-gap-canvas');if(!canvas)return;
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a1020';ctx.fillRect(0,0,W,H);

var maxDist=distances[0].dist+20;
var barH=20;var startY=40;var barGap=3;

for(var m=0;m<distances.length;m++){
  var d=distances[m];var y=startY+m*(barH+barGap);
  var bw=(d.dist/maxDist)*(W-130);
  var gapSize=m<distances.length-1?distances[m].dist-distances[m+1].dist:0;
  var gapColor=gapSize>20?'#ff6b6b':gapSize<5?'#FFB800':'#00FF88';

  var grad=ctx.createLinearGradient(100,y,100+bw,y);
  grad.addColorStop(0,'#00B4D8');grad.addColorStop(1,'rgba(0,180,216,.3)');
  ctx.fillStyle=grad;
  ctx.beginPath();ctx.roundRect(100,y,bw,barH,4);ctx.fill();

  ctx.fillStyle='#fff';ctx.font='bold 11px sans-serif';ctx.textAlign='right';
  ctx.fillText(d.club,92,y+barH/2+4);
  ctx.fillStyle='#fff';ctx.font='bold 11px sans-serif';ctx.textAlign='left';
  ctx.fillText(d.dist+'yd',105+bw+4,y+barH/2+4);

  if(m<distances.length-1){
    var ny=y+barH;
    ctx.fillStyle=gapColor+'33';ctx.fillRect(100,ny,bw,barGap);
    if(gapSize>0){ctx.fillStyle=gapColor;ctx.font='9px sans-serif';ctx.textAlign='right';ctx.fillText(gapSize+'yd gap',W-10,ny+barGap)}
  }
}
ctx.fillStyle='#00B4D8';ctx.font='bold 13px sans-serif';ctx.textAlign='left';
ctx.fillText('Club Gapping Analysis ('+distances.length+' clubs)',12,22);
};

// ===== 8. SEASON SUMMARY =====
function showSeasonSummary(){
var pn=getPanel('season');
var now=new Date();var month=now.getMonth();var year=now.getFullYear();
var monthNames=['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
var seasonLog=lsGet('season_log',[]);
var html='<div class="v12-title">&#x1F4C5; '+year+'년 시즌 통계</div>';

html+='<div class="v12-card"><h3>라운드 기록 추가</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v12-label">날짜</label><input id="v12-ssn-date" class="v12-input" type="date" value="'+todayStr()+'"></div>';
html+='<div><label class="v12-label">스코어</label><input id="v12-ssn-score" class="v12-input" type="number" min="50" max="150" value="90"></div>';
html+='<div><label class="v12-label">퍼트 수</label><input id="v12-ssn-putts" class="v12-input" type="number" min="18" max="60" value="34"></div>';
html+='<div><label class="v12-label">GIR</label><input id="v12-ssn-gir" class="v12-input" type="number" min="0" max="18" value="6"></div>';
html+='</div>';
html+='<button class="v12-btn v12-btn-primary" style="width:100%;margin-top:10px" onclick="window._v12RecordSeason()">기록 저장</button></div>';

var totalRounds=seasonLog.length;
var avgScore='--',bestScore='--',avgPutts='--',avgGIR='--';
if(totalRounds>0){
  var ts=0,bp=999,tp=0,tg=0;
  for(var i=0;i<seasonLog.length;i++){ts+=seasonLog[i].score;if(seasonLog[i].score<bp)bp=seasonLog[i].score;tp+=seasonLog[i].putts;tg+=seasonLog[i].gir}
  avgScore=(ts/totalRounds).toFixed(1);bestScore=bp;avgPutts=(tp/totalRounds).toFixed(1);avgGIR=(tg/totalRounds).toFixed(1);
}

html+='<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px">';
html+='<div class="v12-stat-card"><div class="v12-stat-val" style="color:#00FF88">'+totalRounds+'</div><div class="v12-stat-label">총 라운드</div></div>';
html+='<div class="v12-stat-card"><div class="v12-stat-val" style="color:#00B4D8">'+avgScore+'</div><div class="v12-stat-label">평균 스코어</div></div>';
html+='<div class="v12-stat-card"><div class="v12-stat-val" style="color:#FFB800">'+bestScore+'</div><div class="v12-stat-label">베스트</div></div>';
html+='<div class="v12-stat-card"><div class="v12-stat-val" style="color:#A855F7">'+avgPutts+'</div><div class="v12-stat-label">평균 퍼트</div></div>';
html+='<div class="v12-stat-card"><div class="v12-stat-val" style="color:#00FF88">'+avgGIR+'</div><div class="v12-stat-label">평균 GIR</div></div>';
html+='</div>';

html+='<canvas id="v12-season-canvas" width="560" height="300" style="width:100%;max-width:560px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

if(totalRounds>=3){
  var recent5=seasonLog.slice(-5);
  html+='<div class="v12-card"><h3>&#x1F4CB; 최근 라운드</h3>';
  html+='<table class="v12-table"><tr><th>날짜</th><th>스코어</th><th>퍼트</th><th>GIR</th></tr>';
  for(var j=recent5.length-1;j>=0;j--){
    var r=recent5[j];var sc=r.score<=72?'#00FF88':r.score<=85?'#00B4D8':r.score<=95?'#FFB800':'#ff6b6b';
    html+='<tr><td>'+r.date+'</td><td style="color:'+sc+'">'+r.score+'</td><td>'+r.putts+'</td><td>'+r.gir+'/18</td></tr>';
  }
  html+='</table></div>';
}

html+='<div style="text-align:center;margin-top:8px"><button class="v12-btn" onclick="if(confirm(\'시즌 기록을 초기화하시겠습니까?\'))window._v12ResetSeason()">시즌 리셋</button></div>';

pn.innerHTML='<button class="v12-close" onclick="window._v12Close(\'season\')">&times;</button>'+html;
openPanel('season');playSfx('season_view');
setTimeout(function(){renderSeasonCanvas(seasonLog)},120);
v12CheckAch();lsSet('ach_season_viewed',true);
}

window._v12RecordSeason=function(){
var date=document.getElementById('v12-ssn-date').value||todayStr();
var score=parseInt(document.getElementById('v12-ssn-score').value)||90;
var putts=parseInt(document.getElementById('v12-ssn-putts').value)||34;
var gir=parseInt(document.getElementById('v12-ssn-gir').value)||6;
var log=lsGet('season_log',[]);
log.push({date:date,score:score,putts:putts,gir:gir});
log.sort(function(a,b){return a.date.localeCompare(b.date)});
if(log.length>100)log=log.slice(-100);
lsSet('season_log',log);
playSfx('season_view');showToast('라운드 기록 저장! ('+score+'타)');
closePanel('season');setTimeout(showSeasonSummary,200);
};
window._v12ResetSeason=function(){lsSet('season_log',[]);closePanel('season');setTimeout(showSeasonSummary,200)};

function renderSeasonCanvas(log){
var canvas=document.getElementById('v12-season-canvas');if(!canvas)return;
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a1020';ctx.fillRect(0,0,W,H);

if(log.length<2){
  ctx.fillStyle='#555';ctx.font='14px sans-serif';ctx.textAlign='center';
  ctx.fillText('2개 이상의 라운드를 기록하면 추이 그래프가 표시됩니다',W/2,H/2);
  return;
}

var recent=log.slice(-20);
var minS=999,maxS=0;
for(var i=0;i<recent.length;i++){if(recent[i].score<minS)minS=recent[i].score;if(recent[i].score>maxS)maxS=recent[i].score}
minS=Math.max(60,minS-5);maxS=maxS+5;

ctx.strokeStyle='rgba(255,255,255,.06)';ctx.lineWidth=1;
for(var g=0;g<5;g++){
  var y=40+g*(H-80)/4;
  ctx.beginPath();ctx.moveTo(50,y);ctx.lineTo(W-20,y);ctx.stroke();
  var lbl=Math.round(maxS-(maxS-minS)*g/4);
  ctx.fillStyle='#555';ctx.font='10px sans-serif';ctx.textAlign='right';ctx.fillText(lbl,45,y+4);
}

ctx.strokeStyle='rgba(0,180,216,.15)';ctx.lineWidth=1;ctx.setLineDash([4,4]);
var parY=40+(maxS-72)/(maxS-minS)*(H-80);
ctx.beginPath();ctx.moveTo(50,parY);ctx.lineTo(W-20,parY);ctx.stroke();ctx.setLineDash([]);
ctx.fillStyle='#00FF88';ctx.font='9px sans-serif';ctx.textAlign='left';ctx.fillText('Par 72',W-18,parY-4);

var stepX=(W-80)/(recent.length-1||1);

var gradient=ctx.createLinearGradient(0,40,0,H-40);
gradient.addColorStop(0,'rgba(0,180,216,0.15)');gradient.addColorStop(1,'rgba(0,180,216,0)');
ctx.fillStyle=gradient;ctx.beginPath();ctx.moveTo(50,H-40);
for(var j=0;j<recent.length;j++){
  var px=50+j*stepX;
  var py=40+(maxS-recent[j].score)/(maxS-minS)*(H-80);
  if(j===0)ctx.lineTo(px,py);else ctx.lineTo(px,py);
}
ctx.lineTo(50+(recent.length-1)*stepX,H-40);ctx.closePath();ctx.fill();

ctx.strokeStyle='#00B4D8';ctx.lineWidth=2.5;ctx.beginPath();
for(var k=0;k<recent.length;k++){
  var px2=50+k*stepX;
  var py2=40+(maxS-recent[k].score)/(maxS-minS)*(H-80);
  if(k===0)ctx.moveTo(px2,py2);else ctx.lineTo(px2,py2);
}
ctx.stroke();

for(var m=0;m<recent.length;m++){
  var dx=50+m*stepX;
  var dy=40+(maxS-recent[m].score)/(maxS-minS)*(H-80);
  ctx.beginPath();ctx.arc(dx,dy,4,0,Math.PI*2);
  ctx.fillStyle=recent[m].score<=72?'#00FF88':recent[m].score<=85?'#00B4D8':recent[m].score<=95?'#FFB800':'#ff6b6b';
  ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=1;ctx.stroke();
  if(recent.length<=10){ctx.fillStyle='#aaa';ctx.font='9px sans-serif';ctx.textAlign='center';ctx.fillText(recent[m].score,dx,dy-10)}
}

ctx.fillStyle='#00B4D8';ctx.font='bold 13px sans-serif';ctx.textAlign='left';
ctx.fillText('Season Score Trend ('+log.length+' rounds)',12,22);
}

// ===== QUIZ v5 (+15 = 75 total) =====
var V12_QUIZ=[
{q:'퍼팅에서 &quot;lag putt&quot;의 목표는?',a:['홀컵 1m 이내 접근','원퍼트 성공','1.5m 이상 지나감','커브 최소화'],c:0},
{q:'스트로크 게인(SG)에서 양수(+)는 무엇을 의미하나?',a:['스크래치 대비 잃은 타','스크래치 대비 얻은 타','핸디캡 변화','라운드 수'],c:1},
{q:'그린 스피드 측정 단위 &quot;스팀프미터&quot;의 단위는?',a:['m/s','ft','mph','km/h'],c:1},
{q:'에임포인트 익스프레스에서 사용하는 손가락 수는 경사의 무엇에 비례하나?',a:['각도','백분율(%)','속도','길이'],c:1},
{q:'샷 분산도(Dispersion)의 핵심 지표는?',a:['최대 비거리','표준편차(SD)','평균 속도','바운스 각도'],c:1},
{q:'클럽 갭(Gapping)의 이상적인 거리 차이는?',a:['5~8yd','10~15yd','20~25yd','30yd 이상'],c:1},
{q:'기온이 10도 올라가면 비거리 변화는?',a:['변화 없음','+2~3yd','+10~15yd','-5yd'],c:1},
{q:'고도 300m 상승 시 비거리 증가율은 약?',a:['0.5%','2%','5%','10%'],c:1},
{q:'Arccos 캐디 AI의 핵심 기능은?',a:['스윙 교정','클럽 추천+거리 보정','퍼팅 라인 표시','비디오 분석'],c:1},
{q:'Par 5홀에서 레이업(Lay-up) 전략의 목적은?',a:['최대 비거리','안전한 세컨 위치 확보','그린 직공','벙커 타격'],c:1},
{q:'3퍼트를 줄이려면 가장 중요한 것은?',a:['스트로크 교정','퍼스트 퍼트 거리감','그린 경사 읽기','공 바꾸기'],c:1},
{q:'내리막 퍼팅에서 체감 거리는 실제보다?',a:['같다','짧다','길다','매홀 다르다'],c:2},
{q:'코스 매니지먼트에서 &quot;miss side&quot;란?',a:['OB 방향','안전한 미스 방향','바람 방향','경사 방향'],c:1},
{q:'Shot Tracer 앱의 핵심 기술은?',a:['GPS 추적','영상 궤적 합성','레이더 스캔','초음파 감지'],c:1},
{q:'SG: Putting이 -1.0이면 의미는?',a:['프로보다 1타 절약','프로보다 1타 손해','1m 퍼팅 실패','1라운드 기록'],c:1}
];

function showV12Quiz(){
var pn=getPanel('v12quiz');
var qs=lsGet('v12quiz_state',{answered:[],correct:0,currentIdx:0});
var idx=qs.currentIdx;
if(idx>=V12_QUIZ.length)idx=0;

var html='<div class="v12-title">&#x1F4DD; 골프 퀴즈 v5 ('+V12_QUIZ.length+'문)</div>';
html+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">';
html+='<span style="color:#888;font-size:.85em">진행: '+(qs.answered||[]).length+'/'+V12_QUIZ.length+'</span>';
html+='<span style="color:#00FF88;font-size:.85em">정답: '+qs.correct+'/'+((qs.answered||[]).length||0)+'</span>';
html+='</div>';

var q=V12_QUIZ[idx];
html+='<div class="v12-card"><h3>Q'+(idx+1)+'. '+q.q+'</h3>';
html+='<div style="display:grid;gap:8px;margin-top:12px">';
for(var i=0;i<q.a.length;i++){
  var answered=(qs.answered||[]).indexOf(idx)>-1;
  var btnClass='v12-btn';
  if(answered&&i===q.c)btnClass+=' active';
  html+='<button class="'+btnClass+'" style="text-align:left;padding:12px 16px" onclick="window._v12QuizAnswer('+idx+','+i+')"'+(answered?' disabled':'')+'>'+String.fromCharCode(65+i)+'. '+q.a[i]+'</button>';
}
html+='</div></div>';

html+='<div style="display:flex;justify-content:space-between;margin-top:8px">';
html+='<button class="v12-btn" onclick="window._v12QuizNav(-1)">&larr; 이전</button>';
html+='<button class="v12-btn" onclick="window._v12QuizReset()">리셋</button>';
html+='<button class="v12-btn" onclick="window._v12QuizNav(1)">다음 &rarr;</button>';
html+='</div>';

pn.innerHTML='<button class="v12-close" onclick="window._v12Close(\'v12quiz\')">&times;</button>'+html;
openPanel('v12quiz');playSfx('v12_quiz');
}

window._v12QuizAnswer=function(idx,ans){
var qs=lsGet('v12quiz_state',{answered:[],correct:0,currentIdx:0});
if(!qs.answered)qs.answered=[];
if(qs.answered.indexOf(idx)>-1)return;
qs.answered.push(idx);
if(ans===V12_QUIZ[idx].c){qs.correct++;playSfx('quiz_correct12');showToast('정답! &#x2705;')}
else{showToast('오답! 정답: '+String.fromCharCode(65+V12_QUIZ[idx].c)+'. '+V12_QUIZ[idx].a[V12_QUIZ[idx].c])}
lsSet('v12quiz_state',qs);
closePanel('v12quiz');setTimeout(showV12Quiz,200);
v12CheckAch();
};
window._v12QuizNav=function(dir){
var qs=lsGet('v12quiz_state',{answered:[],correct:0,currentIdx:0});
qs.currentIdx=(qs.currentIdx+dir+V12_QUIZ.length)%V12_QUIZ.length;
lsSet('v12quiz_state',qs);closePanel('v12quiz');setTimeout(showV12Quiz,150);
};
window._v12QuizReset=function(){lsSet('v12quiz_state',{answered:[],correct:0,currentIdx:0});closePanel('v12quiz');setTimeout(showV12Quiz,200)};

// ===== ACHIEVEMENTS (+12 = 60 total) =====
var V12_ACH=[
{id:'v12_putting_view',name:'퍼팅 분석가',desc:'퍼팅 분석 대시보드 사용',icon:'&#x26F3;',check:function(){return lsGet('ach_putting_viewed',false)}},
{id:'v12_putting_10',name:'퍼팅 기록가',desc:'퍼팅 10회 기록',icon:'&#x1F3CC;&#xFE0F;',check:function(){return lsGet('putting_log',[]).length>=10}},
{id:'v12_dispersion',name:'분산도 마스터',desc:'샷 분산도 분석 사용',icon:'&#x1F3AF;',check:function(){return lsGet('ach_disp_viewed',false)}},
{id:'v12_disp_20',name:'착탄 수집가',desc:'착탄 20회 기록',icon:'&#x1F4CD;',check:function(){return lsGet('dispersion_shots',[]).length>=20}},
{id:'v12_sg_view',name:'SG 분석가',desc:'스트로크 게인 분석 사용',icon:'&#x1F4CA;',check:function(){return lsGet('ach_sg_viewed',false)}},
{id:'v12_sg_5rounds',name:'SG 전문가',desc:'SG 데이터 5라운드 기록',icon:'&#x1F4C8;',check:function(){var d=lsGet('sg_data',{rounds:0});return d.rounds>=5}},
{id:'v12_caddie',name:'AI 캐디 사용자',desc:'코스 매니지먼트 AI 사용',icon:'&#x1F916;',check:function(){return lsGet('ach_caddie_used',false)}},
{id:'v12_condition',name:'컨디션 전문가',desc:'컨디션 보정 계산기 사용',icon:'&#x1F321;&#xFE0F;',check:function(){return lsGet('ach_cond_used',false)}},
{id:'v12_green',name:'그린 리더',desc:'퍼팅 그린 리딩 가이드 사용',icon:'&#x1F7E2;',check:function(){return lsGet('ach_green_used',false)}},
{id:'v12_gap',name:'갭 분석가',desc:'클럽 갭 분석 사용',icon:'&#x1F4CF;',check:function(){return lsGet('ach_gap_viewed',false)}},
{id:'v12_season',name:'시즌 관리자',desc:'시즌 요약 대시보드 사용',icon:'&#x1F4C5;',check:function(){return lsGet('ach_season_viewed',false)}},
{id:'v12_all_features',name:'v12 탐험가',desc:'v12 전체 기능 탐색',icon:'&#x1F30D;',check:function(){return lsGet('ach_putting_viewed',false)&&lsGet('ach_disp_viewed',false)&&lsGet('ach_sg_viewed',false)&&lsGet('ach_caddie_used',false)&&lsGet('ach_cond_used',false)&&lsGet('ach_green_used',false)&&lsGet('ach_gap_viewed',false)&&lsGet('ach_season_viewed',false)}}
];

function v12CheckAch(){
var unlocked=lsGet('v12_achievements',[]);
for(var i=0;i<V12_ACH.length;i++){
  var ach=V12_ACH[i];
  if(unlocked.indexOf(ach.id)===-1&&ach.check()){
    unlocked.push(ach.id);lsSet('v12_achievements',unlocked);
    showV12AchPopup(ach);playSfx('v12_achieve');
  }
}
}

function showV12AchPopup(ach){
var popup=document.createElement('div');popup.className='v12-ach-popup';
popup.innerHTML='<div style="font-size:2em">'+ach.icon+'</div><div><div style="font-size:.65em;color:#00FF88;font-weight:700;letter-spacing:2px">ACHIEVEMENT</div><div style="font-weight:700">'+ach.name+'</div><div style="font-size:.8em;color:#888;margin-top:2px">'+ach.desc+'</div></div>';
document.body.appendChild(popup);
setTimeout(function(){popup.classList.add('show')},50);
setTimeout(function(){popup.classList.remove('show');setTimeout(function(){popup.remove()},500)},3500);
}

// ===== QUICK ACTIONS & KEYBOARD =====
function injectV12QuickActions(){
var existing=document.querySelector('.v12-quick-actions');if(existing)return;
var nav=document.createElement('div');nav.className='v12-scroll-nav';
var buttons=[
  {icon:'&#x26F3;',title:'퍼팅분석 (Shift+P)',fn:'showPuttingDash'},
  {icon:'&#x1F3AF;',title:'분산도 (Shift+T)',fn:'showShotDispersion'},
  {icon:'&#x1F4CA;',title:'스트로크게인 (Shift+S)',fn:'showSGAnalyzer'},
  {icon:'&#x1F916;',title:'AI캐디 (Shift+C)',fn:'showCourseAI'},
  {icon:'&#x1F321;&#xFE0F;',title:'컨디션 (Shift+W)',fn:'showConditionCalc'},
  {icon:'&#x1F7E2;',title:'그린리딩 (Shift+R)',fn:'showGreenReading'},
  {icon:'&#x1F4CF;',title:'클럽갭 (Shift+K)',fn:'showClubGap'},
  {icon:'&#x1F4C5;',title:'시즌통계 (Shift+N)',fn:'showSeasonSummary'}
];
for(var i=0;i<buttons.length;i++){
  var btn=document.createElement('button');btn.className='v12-nav-btn';
  btn.innerHTML='<span class="v12-nav-icon">'+buttons[i].icon+'</span><span class="v12-nav-label">'+buttons[i].title.split(' (')[0]+'</span>';
  btn.title=buttons[i].title;
  btn.setAttribute('data-fn',buttons[i].fn);
  btn.addEventListener('click',function(){var fn=this.getAttribute('data-fn');if(window['_v12_'+fn])window['_v12_'+fn]()});
  nav.appendChild(btn);
}
document.body.appendChild(nav);
}

window._v12_showPuttingDash=showPuttingDash;
window._v12_showShotDispersion=showShotDispersion;
window._v12_showSGAnalyzer=showSGAnalyzer;
window._v12_showCourseAI=showCourseAI;
window._v12_showConditionCalc=showConditionCalc;
window._v12_showGreenReading=showGreenReading;
window._v12_showClubGap=showClubGap;
window._v12_showSeasonSummary=showSeasonSummary;
window._v12_showV12Quiz=showV12Quiz;
window._v12Close=function(id){closePanel(id)};

function setupV12Keyboard(){
document.addEventListener('keydown',function(e){
  if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'||e.target.tagName==='SELECT')return;
  if(e.ctrlKey||e.metaKey||e.altKey)return;
  if(!e.shiftKey)return;
  switch(e.key){
    case'P':e.preventDefault();showPuttingDash();break;
    case'T':e.preventDefault();showShotDispersion();break;
    case'S':e.preventDefault();showSGAnalyzer();break;
    case'C':e.preventDefault();showCourseAI();break;
    case'W':e.preventDefault();showConditionCalc();break;
    case'R':e.preventDefault();showGreenReading();break;
    case'K':e.preventDefault();showClubGap();break;
    case'N':e.preventDefault();showSeasonSummary();break;
  }
});
}

// ===== CSS =====
function injectV12CSS(){
var s=document.createElement('style');
s.textContent='.v12-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.88);z-index:10005;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;pointer-events:none}.v12-overlay.active{opacity:1;pointer-events:auto}.v12-panel{background:linear-gradient(145deg,rgba(10,16,26,.98),rgba(5,8,16,.98));border:1px solid rgba(0,255,136,.15);border-radius:18px;padding:24px;max-width:660px;width:94%;max-height:85vh;overflow-y:auto;box-shadow:0 24px 80px rgba(0,0,0,.7),0 0 40px rgba(0,255,136,.06);position:relative}.v12-panel::-webkit-scrollbar{width:5px}.v12-panel::-webkit-scrollbar-thumb{background:rgba(0,255,136,.2);border-radius:3px}.v12-title{font-size:1.4em;font-weight:800;color:#00FF88;margin-bottom:18px;letter-spacing:-0.5px}.v12-close{position:absolute;top:12px;right:16px;background:none;border:none;color:#666;font-size:1.6em;cursor:pointer;padding:4px 8px;border-radius:8px;transition:all .2s;z-index:1}.v12-close:hover{color:#ff6b6b;background:rgba(255,107,107,.1)}.v12-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:16px;margin-bottom:12px;transition:all .2s}.v12-card:hover{border-color:rgba(0,255,136,.15);background:rgba(255,255,255,.05)}.v12-card h3{color:#00FF88;font-size:.95em;margin:0 0 8px}.v12-card p{color:#aaa;font-size:.85em;margin:0;line-height:1.6}.v12-badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:.75em;font-weight:600}.v12-badge-a{background:rgba(0,255,136,.12);color:#00FF88}.v12-badge-b{background:rgba(0,180,216,.12);color:#00B4D8}.v12-btn{padding:8px 16px;border:1px solid rgba(0,255,136,.2);background:rgba(0,255,136,.06);color:#00FF88;border-radius:8px;cursor:pointer;font-size:.85em;transition:all .2s}.v12-btn:hover{background:rgba(0,255,136,.15);border-color:#00FF88}.v12-btn.active{background:rgba(0,255,136,.15);border-color:rgba(0,255,136,.4);color:#00FF88}.v12-btn-primary{background:rgba(0,255,136,.12);border-color:rgba(0,255,136,.3);color:#00FF88}.v12-btn-primary:hover{background:rgba(0,255,136,.22)}.v12-btn:disabled{opacity:.5;cursor:default}.v12-input{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:8px 12px;color:#fff;font-size:.85em;width:100%;box-sizing:border-box}.v12-input:focus{outline:none;border-color:rgba(0,255,136,.4)}.v12-label{display:block;font-size:.72em;color:#888;margin-bottom:3px}.v12-table{width:100%;border-collapse:collapse;font-size:.82em}.v12-table th{text-align:left;padding:8px;color:#00FF88;border-bottom:1px solid rgba(255,255,255,.08);font-weight:600}.v12-table td{padding:8px;color:#ccc;border-bottom:1px solid rgba(255,255,255,.03)}.v12-stat-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:10px 6px;text-align:center}.v12-stat-val{font-size:1.3em;font-weight:800}.v12-stat-label{font-size:.65em;color:#888;margin-top:2px}.v12-mini-stat{background:rgba(0,255,136,.04);border:1px solid rgba(0,255,136,.08);border-radius:8px;padding:8px;text-align:center}.v12-mini-val{font-size:1.1em;font-weight:700;color:#00FF88}.v12-mini-label{font-size:.65em;color:#888}.v12-scroll-nav{position:fixed;bottom:0;left:0;right:0;z-index:998;display:flex;overflow-x:auto;gap:2px;padding:6px 8px;background:linear-gradient(to top,rgba(5,8,16,.96),rgba(5,8,16,.8));border-top:1px solid rgba(0,255,136,.08);-webkit-overflow-scrolling:touch;scrollbar-width:none}.v12-scroll-nav::-webkit-scrollbar{display:none}.v12-nav-btn{display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px 10px;border:1px solid rgba(0,255,136,.1);background:rgba(0,255,136,.04);color:#00FF88;border-radius:10px;cursor:pointer;flex-shrink:0;transition:all .2s;font-size:1em;min-width:60px}.v12-nav-btn:hover{background:rgba(0,255,136,.12);transform:scale(1.05)}.v12-nav-icon{font-size:1.2em}.v12-nav-label{font-size:.55em;color:#888;white-space:nowrap}.v12-toast{position:fixed;top:20px;left:50%;transform:translateX(-50%) translateY(-100px);background:rgba(0,255,136,.1);border:1px solid rgba(0,255,136,.2);color:#00FF88;padding:10px 20px;border-radius:10px;z-index:99999;transition:transform .4s;font-size:.9em;backdrop-filter:blur(12px);white-space:nowrap}.v12-toast.show{transform:translateX(-50%) translateY(0)}.v12-ach-popup{position:fixed;top:60px;left:50%;transform:translateX(-50%) translateY(-150px);z-index:100000;background:linear-gradient(135deg,rgba(10,16,26,.96),rgba(20,28,38,.96));border:1px solid rgba(0,255,136,.25);border-radius:16px;padding:14px 22px;display:flex;align-items:center;gap:14px;backdrop-filter:blur(20px);transition:transform .5s cubic-bezier(.34,1.56,.64,1);box-shadow:0 8px 32px rgba(0,0,0,.5),0 0 24px rgba(0,255,136,.08)}.v12-ach-popup.show{transform:translateX(-50%) translateY(0)}@media(max-width:480px){.v12-panel{padding:16px;max-height:92vh;width:96%}.v12-scroll-nav{padding:4px 4px;gap:1px}.v12-nav-btn{min-width:52px;padding:5px 7px}.v12-nav-icon{font-size:1em}.v12-nav-label{font-size:.5em}}';
document.head.appendChild(s);
}

// ===== INIT =====
function initV12(){
injectV12CSS();
injectV12QuickActions();
setupV12Keyboard();
setTimeout(v12CheckAch,4000);
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',initV12)}
else{setTimeout(initV12,2200)}

})();
