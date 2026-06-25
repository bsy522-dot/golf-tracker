(function(){
'use strict';
var LS='gt_v13_';
var audioCtx=null;
function getAC(){if(!audioCtx)try{audioCtx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}return audioCtx}
function playSfx(type){var ac=getAC();if(!ac)return;var o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);var t=ac.currentTime;g.gain.setValueAtTime(0.1,t);switch(type){case'heatmap_open':o.type='sine';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(587,t+0.08);o.frequency.linearRampToValueAtTime(740,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'heatmap_record':o.type='triangle';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(659,t+0.06);g.gain.setValueAtTime(0.08,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.15);o.start(t);o.stop(t+0.15);break;case'handicap_calc':o.type='sine';o.frequency.setValueAtTime(349,t);o.frequency.linearRampToValueAtTime(440,t+0.08);o.frequency.linearRampToValueAtTime(523,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'fairway_view':o.type='sine';o.frequency.setValueAtTime(494,t);o.frequency.linearRampToValueAtTime(622,t+0.1);o.frequency.linearRampToValueAtTime(740,t+0.2);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'swing_note':o.type='triangle';o.frequency.setValueAtTime(587,t);o.frequency.linearRampToValueAtTime(740,t+0.08);g.gain.setValueAtTime(0.07,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.2);o.start(t);o.stop(t+0.2);break;case'equip_open':o.type='sine';o.frequency.setValueAtTime(392,t);o.frequency.linearRampToValueAtTime(494,t+0.1);g.gain.exponentialRampToValueAtTime(0.01,t+0.22);o.start(t);o.stop(t+0.22);break;case'drill_done':o.type='sine';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(659,t+0.06);o.frequency.linearRampToValueAtTime(784,t+0.12);o.frequency.linearRampToValueAtTime(1047,t+0.2);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'stamina_log':o.type='triangle';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(554,t+0.1);g.gain.exponentialRampToValueAtTime(0.01,t+0.22);o.start(t);o.stop(t+0.22);break;case'pro_compare':o.type='sine';o.frequency.setValueAtTime(659,t);o.frequency.linearRampToValueAtTime(880,t+0.1);o.frequency.linearRampToValueAtTime(1047,t+0.2);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'v13_achieve':o.type='sine';o.frequency.setValueAtTime(784,t);o.frequency.setValueAtTime(988,t+0.1);o.frequency.setValueAtTime(1175,t+0.2);o.frequency.setValueAtTime(1568,t+0.3);g.gain.exponentialRampToValueAtTime(0.01,t+0.5);o.start(t);o.stop(t+0.5);break;case'v13_quiz':o.type='sine';o.frequency.setValueAtTime(554,t);o.frequency.setValueAtTime(698,t+0.1);o.frequency.setValueAtTime(880,t+0.2);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'quiz_correct13':o.type='sine';o.frequency.setValueAtTime(698,t);o.frequency.setValueAtTime(880,t+0.08);o.frequency.setValueAtTime(1175,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;default:o.type='sine';o.frequency.setValueAtTime(440,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.15);o.start(t);o.stop(t+0.15)}}

function lsGet(k,d){try{var v=localStorage.getItem(LS+k);return v?JSON.parse(v):d}catch(e){return d}}
function lsSet(k,v){try{localStorage.setItem(LS+k,JSON.stringify(v))}catch(e){}}
function todayStr(){return new Date().toISOString().slice(0,10)}
function showToast(msg){var t=document.createElement('div');t.className='v13-toast';t.textContent=msg;document.body.appendChild(t);setTimeout(function(){t.classList.add('show')},50);setTimeout(function(){t.classList.remove('show');setTimeout(function(){t.remove()},400)},3000)}
function createOverlay(id){var ov=document.createElement('div');ov.className='v13-overlay';ov.id='v13-'+id;ov.addEventListener('click',function(e){if(e.target===ov)closePanel(id)});var pn=document.createElement('div');pn.className='v13-panel';pn.style.position='relative';ov.appendChild(pn);return pn}
function openPanel(id){var el=document.getElementById('v13-'+id);if(el)el.classList.add('active')}
function closePanel(id){var el=document.getElementById('v13-'+id);if(el)el.classList.remove('active')}
function getPanel(id){var ov=document.getElementById('v13-'+id);if(!ov){var pn=createOverlay(id);pn.id='v13-'+id+'-panel';document.body.appendChild(pn.parentElement);return pn}return ov.querySelector('.v13-panel')||ov}

// ===== 1. ROUND SCORECARD HEATMAP =====
function showScoreHeatmap(){
var pn=getPanel('heatmap');
var rounds=lsGet('heatmap_rounds',[]);
var html='<div class="v13-title">&#x1F525; 라운드 스코어카드 히트맵</div>';

html+='<div class="v13-card"><h3>18홀 스코어 입력</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(9,1fr);gap:4px;margin-top:8px">';
for(var h=1;h<=18;h++){
  html+='<div style="text-align:center"><label class="v13-label">#'+h+'</label>';
  html+='<input id="v13-hm-'+h+'" class="v13-input" type="number" min="1" max="12" value="4" style="text-align:center;padding:6px 2px;font-size:.85em"></div>';
}
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">';
html+='<div><label class="v13-label">코스명</label><input id="v13-hm-course" class="v13-input" value="" placeholder="예: 남서울CC"></div>';
html+='<div><label class="v13-label">날짜</label><input id="v13-hm-date" class="v13-input" type="date" value="'+todayStr()+'"></div>';
html+='</div>';
html+='<button class="v13-btn v13-btn-primary" style="width:100%;margin-top:10px" onclick="window._v13RecordHeatmap()">스코어카드 저장</button></div>';

html+='<canvas id="v13-heatmap-canvas" width="600" height="360" style="width:100%;max-width:600px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

if(rounds.length>0){
  var last=rounds[rounds.length-1];
  var total=0;for(var i=0;i<last.scores.length;i++)total+=last.scores[i];
  var pars=[4,4,3,5,4,3,4,5,4,4,4,3,5,4,3,4,5,4];
  var parTotal=0;for(var p=0;p<pars.length;p++)parTotal+=pars[p];
  var diff=total-parTotal;var prefix=diff>=0?'+':'';

  html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">';
  html+='<div class="v13-stat-card"><div class="v13-stat-val" style="color:#00FF88">'+total+'</div><div class="v13-stat-label">총 스코어</div></div>';
  html+='<div class="v13-stat-card"><div class="v13-stat-val" style="color:'+(diff<=0?'#00FF88':'#ff6b6b')+'">'+prefix+diff+'</div><div class="v13-stat-label">오버/언더</div></div>';

  var birdies=0,pars2=0,bogeys=0,doubles=0;
  for(var j=0;j<last.scores.length;j++){
    var d=last.scores[j]-pars[j];
    if(d<=-1)birdies++;else if(d===0)pars2++;else if(d===1)bogeys++;else doubles++;
  }
  html+='<div class="v13-stat-card"><div class="v13-stat-val" style="color:#00B4D8">'+birdies+'</div><div class="v13-stat-label">버디 이하</div></div>';
  html+='<div class="v13-stat-card"><div class="v13-stat-val" style="color:#ff6b6b">'+doubles+'</div><div class="v13-stat-label">더블보기+</div></div>';
  html+='</div>';

  html+='<div class="v13-card"><h3>&#x1F3F7;&#xFE0F; 색상 범례</h3>';
  html+='<div style="display:flex;gap:12px;flex-wrap:wrap;font-size:.8em;margin-top:6px">';
  html+='<span style="color:#FFD700">&#x25A0; 이글(-2)</span>';
  html+='<span style="color:#00FF88">&#x25A0; 버디(-1)</span>';
  html+='<span style="color:#00B4D8">&#x25A0; 파(0)</span>';
  html+='<span style="color:#FFB800">&#x25A0; 보기(+1)</span>';
  html+='<span style="color:#ff6b6b">&#x25A0; 더블(+2)</span>';
  html+='<span style="color:#cc3333">&#x25A0; 트리플+(+3)</span>';
  html+='</div></div>';
}

html+='<div class="v13-card"><h3>&#x1F4CB; 라운드 이력 ('+rounds.length+'회)</h3>';
if(rounds.length>0){
  html+='<table class="v13-table"><tr><th>날짜</th><th>코스</th><th>OUT</th><th>IN</th><th>합계</th></tr>';
  var recent=rounds.slice(-5).reverse();
  for(var r=0;r<recent.length;r++){
    var rd=recent[r];var out=0,inn=0;
    for(var s=0;s<9;s++)out+=rd.scores[s];
    for(var s2=9;s2<18;s2++)inn+=rd.scores[s2];
    var tt=out+inn;var tc=tt<=72?'#00FF88':tt<=85?'#00B4D8':tt<=95?'#FFB800':'#ff6b6b';
    html+='<tr><td>'+rd.date+'</td><td>'+(rd.course||'-')+'</td><td>'+out+'</td><td>'+inn+'</td><td style="color:'+tc+';font-weight:700">'+tt+'</td></tr>';
  }
  html+='</table>';
} else {html+='<p style="color:#888;font-size:.85em">아직 기록이 없습니다.</p>'}
html+='</div>';

pn.innerHTML='<button class="v13-close" onclick="window._v13Close(\'heatmap\')">&times;</button>'+html;
openPanel('heatmap');playSfx('heatmap_open');
setTimeout(function(){renderHeatmapCanvas(rounds)},120);
v13CheckAch();lsSet('ach_heatmap_viewed',true);
}

window._v13RecordHeatmap=function(){
var scores=[];
for(var i=1;i<=18;i++){var v=parseInt(document.getElementById('v13-hm-'+i).value)||4;scores.push(v)}
var course=document.getElementById('v13-hm-course').value||'';
var date=document.getElementById('v13-hm-date').value||todayStr();
var rounds=lsGet('heatmap_rounds',[]);
rounds.push({scores:scores,course:course,date:date});
if(rounds.length>50)rounds=rounds.slice(-50);
lsSet('heatmap_rounds',rounds);
var total=0;for(var j=0;j<scores.length;j++)total+=scores[j];
playSfx('heatmap_record');showToast('스코어카드 저장! ('+total+'타)');
closePanel('heatmap');setTimeout(showScoreHeatmap,200);
};

function renderHeatmapCanvas(rounds){
var canvas=document.getElementById('v13-heatmap-canvas');if(!canvas)return;
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a1020';ctx.fillRect(0,0,W,H);

var pars=[4,4,3,5,4,3,4,5,4,4,4,3,5,4,3,4,5,4];
var cellW=(W-80)/9,cellH=50;

ctx.fillStyle='#00B4D8';ctx.font='bold 13px sans-serif';ctx.textAlign='left';
ctx.fillText('Scorecard Heatmap',12,22);

ctx.fillStyle='#888';ctx.font='bold 10px sans-serif';ctx.textAlign='center';
for(var c=0;c<9;c++){
  ctx.fillText('#'+(c+1),50+c*cellW+cellW/2,48);
  ctx.fillText('#'+(c+10),50+c*cellW+cellW/2,48+cellH+10+cellH+20);
}
ctx.fillStyle='#555';ctx.font='bold 9px sans-serif';
ctx.textAlign='left';ctx.fillText('OUT',10,75+cellH/2);ctx.fillText('IN',10,75+cellH+10+cellH+20+cellH/2);

if(rounds.length===0){
  ctx.fillStyle='#555';ctx.font='14px sans-serif';ctx.textAlign='center';
  ctx.fillText('18홀 스코어를 입력하면 히트맵이 표시됩니다',W/2,H/2);
  return;
}

var last=rounds[rounds.length-1];
var scoreColors={'eagle':'#FFD700','birdie':'#00FF88','par':'#00B4D8','bogey':'#FFB800','double':'#ff6b6b','triple':'#cc3333'};

for(var h=0;h<18;h++){
  var row=h<9?0:1;var col=h<9?h:h-9;
  var x=50+col*cellW;var y=56+(row*(cellH+30));
  var score=last.scores[h];var par=pars[h];var diff=score-par;
  var color;
  if(diff<=-2)color=scoreColors.eagle;
  else if(diff===-1)color=scoreColors.birdie;
  else if(diff===0)color=scoreColors.par;
  else if(diff===1)color=scoreColors.bogey;
  else if(diff===2)color=scoreColors.double;
  else color=scoreColors.triple;

  ctx.fillStyle=color+'33';
  ctx.beginPath();ctx.roundRect(x+2,y,cellW-4,cellH,6);ctx.fill();
  ctx.strokeStyle=color+'66';ctx.lineWidth=1;
  ctx.beginPath();ctx.roundRect(x+2,y,cellW-4,cellH,6);ctx.stroke();

  ctx.fillStyle='#fff';ctx.font='bold 16px sans-serif';ctx.textAlign='center';
  ctx.fillText(score,x+cellW/2,y+cellH/2+2);
  ctx.fillStyle=color;ctx.font='bold 9px sans-serif';
  var diffStr=diff>0?'+'+diff:diff===0?'E':''+diff;
  ctx.fillText(diffStr,x+cellW/2,y+cellH-6);
  ctx.fillStyle='#555';ctx.font='8px sans-serif';
  ctx.fillText('P'+par,x+cellW/2,y+12);
}

var out=0,inn=0;
for(var a=0;a<9;a++)out+=last.scores[a];
for(var b=9;b<18;b++)inn+=last.scores[b];
ctx.fillStyle='#fff';ctx.font='bold 14px sans-serif';ctx.textAlign='center';
ctx.fillText('OUT: '+out,W/2-80,H-50);
ctx.fillText('IN: '+inn,W/2+20,H-50);
ctx.fillStyle='#00FF88';ctx.font='bold 18px sans-serif';
ctx.fillText('TOTAL: '+(out+inn),W/2,H-22);
if(last.course)ctx.fillText(last.course+' ('+last.date+')',W/2,H-6);
}

// ===== 2. HANDICAP TRACKER =====
function showHandicapTracker(){
var pn=getPanel('handicap');
var hcLog=lsGet('hc_log',[]);
var html='<div class="v13-title">&#x1F3C6; 핸디캡 추적기 (WHS)</div>';

html+='<div class="v13-card"><h3>스코어 디퍼런셜 입력</h3>';
html+='<p style="color:#888;font-size:.78em;margin-bottom:8px">디퍼런셜 = (조정 총타수 - 코스 레이팅) &times; 113 / 슬로프 레이팅</p>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v13-label">조정 총타수</label><input id="v13-hc-gross" class="v13-input" type="number" min="60" max="150" value="90"></div>';
html+='<div><label class="v13-label">코스 레이팅</label><input id="v13-hc-cr" class="v13-input" type="number" step="0.1" min="60" max="80" value="72.0"></div>';
html+='<div><label class="v13-label">슬로프 레이팅</label><input id="v13-hc-sr" class="v13-input" type="number" min="55" max="155" value="130"></div>';
html+='<div><label class="v13-label">날짜</label><input id="v13-hc-date" class="v13-input" type="date" value="'+todayStr()+'"></div>';
html+='</div>';
html+='<button class="v13-btn v13-btn-primary" style="width:100%;margin-top:10px" onclick="window._v13CalcHC()">디퍼런셜 계산 &amp; 저장</button></div>';

var handicap='--';var trend='';
if(hcLog.length>=3){
  var sorted=hcLog.slice().sort(function(a,b){return a.diff-b.diff});
  var useCount=Math.max(1,Math.floor(hcLog.length*0.4));
  if(useCount>8)useCount=8;
  var sum=0;for(var i=0;i<useCount;i++)sum+=sorted[i].diff;
  handicap=(sum/useCount*0.96).toFixed(1);
  if(hcLog.length>=6){
    var prev=hcLog.slice(-6,-3);var curr=hcLog.slice(-3);
    var prevAvg=0,currAvg=0;
    for(var p=0;p<prev.length;p++)prevAvg+=prev[p].diff;prevAvg/=prev.length;
    for(var c=0;c<curr.length;c++)currAvg+=curr[c].diff;currAvg/=curr.length;
    trend=currAvg<prevAvg?'improving':'declining';
  }
}

html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">';
html+='<div class="v13-stat-card"><div class="v13-stat-val" style="color:#00FF88;font-size:1.6em">'+handicap+'</div><div class="v13-stat-label">핸디캡 인덱스</div></div>';
html+='<div class="v13-stat-card"><div class="v13-stat-val" style="color:#00B4D8">'+hcLog.length+'</div><div class="v13-stat-label">기록 라운드</div></div>';
var bestDiff=hcLog.length>0?Math.min.apply(null,hcLog.map(function(x){return x.diff})).toFixed(1):'--';
html+='<div class="v13-stat-card"><div class="v13-stat-val" style="color:#FFB800">'+bestDiff+'</div><div class="v13-stat-label">최저 디퍼런셜</div></div>';
var trendIcon=trend==='improving'?'&#x2B07;&#xFE0F; 개선':trend==='declining'?'&#x2B06;&#xFE0F; 상승':'--';
var trendColor=trend==='improving'?'#00FF88':trend==='declining'?'#ff6b6b':'#888';
html+='<div class="v13-stat-card"><div class="v13-stat-val" style="color:'+trendColor+';font-size:.85em">'+trendIcon+'</div><div class="v13-stat-label">추이</div></div>';
html+='</div>';

html+='<canvas id="v13-hc-canvas" width="560" height="280" style="width:100%;max-width:560px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

html+='<div class="v13-card"><h3>&#x1F4D6; WHS 핸디캡 계산법</h3>';
html+='<table class="v13-table"><tr><th>기록 수</th><th>사용 디퍼런셜</th></tr>';
html+='<tr><td>3~4회</td><td>최저 1개</td></tr>';
html+='<tr><td>5~6회</td><td>최저 2개</td></tr>';
html+='<tr><td>7~8회</td><td>최저 2~3개</td></tr>';
html+='<tr><td>9~11회</td><td>최저 3~4개</td></tr>';
html+='<tr><td>12~20회</td><td>최저 40% (최대 8개)</td></tr>';
html+='</table>';
html+='<p style="color:#888;font-size:.78em;margin-top:8px">핸디캡 인덱스 = (선택 디퍼런셜 평균) &times; 0.96</p></div>';

html+='<div style="text-align:center;margin-top:8px"><button class="v13-btn" onclick="if(confirm(\'핸디캡 이력을 초기화하시겠습니까?\'))window._v13ResetHC()">데이터 초기화</button></div>';

pn.innerHTML='<button class="v13-close" onclick="window._v13Close(\'handicap\')">&times;</button>'+html;
openPanel('handicap');playSfx('handicap_calc');
setTimeout(function(){renderHCCanvas(hcLog)},120);
v13CheckAch();lsSet('ach_hc_viewed',true);
}

window._v13CalcHC=function(){
var gross=parseInt(document.getElementById('v13-hc-gross').value)||90;
var cr=parseFloat(document.getElementById('v13-hc-cr').value)||72;
var sr=parseInt(document.getElementById('v13-hc-sr').value)||130;
var date=document.getElementById('v13-hc-date').value||todayStr();
var diff=Math.round(((gross-cr)*113/sr)*10)/10;
var log=lsGet('hc_log',[]);
log.push({gross:gross,cr:cr,sr:sr,diff:diff,date:date});
log.sort(function(a,b){return a.date.localeCompare(b.date)});
if(log.length>40)log=log.slice(-40);
lsSet('hc_log',log);
playSfx('handicap_calc');showToast('디퍼런셜 저장! ('+diff+')');
closePanel('handicap');setTimeout(showHandicapTracker,200);
};
window._v13ResetHC=function(){lsSet('hc_log',[]);closePanel('handicap');setTimeout(showHandicapTracker,200)};

function renderHCCanvas(log){
var canvas=document.getElementById('v13-hc-canvas');if(!canvas)return;
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a1020';ctx.fillRect(0,0,W,H);

if(log.length<2){
  ctx.fillStyle='#555';ctx.font='14px sans-serif';ctx.textAlign='center';
  ctx.fillText('2개 이상의 라운드를 기록하면 추이 그래프가 표시됩니다',W/2,H/2);
  return;
}

var recent=log.slice(-20);
var minD=999,maxD=0;
for(var i=0;i<recent.length;i++){if(recent[i].diff<minD)minD=recent[i].diff;if(recent[i].diff>maxD)maxD=recent[i].diff}
minD=Math.max(0,Math.floor(minD)-3);maxD=Math.ceil(maxD)+3;

ctx.strokeStyle='rgba(255,255,255,.06)';ctx.lineWidth=1;
for(var g=0;g<5;g++){
  var y=40+g*(H-80)/4;
  ctx.beginPath();ctx.moveTo(50,y);ctx.lineTo(W-20,y);ctx.stroke();
  var lbl=(maxD-(maxD-minD)*g/4).toFixed(1);
  ctx.fillStyle='#555';ctx.font='10px sans-serif';ctx.textAlign='right';ctx.fillText(lbl,45,y+4);
}

var stepX=(W-80)/(recent.length-1||1);
var gradient=ctx.createLinearGradient(0,40,0,H-40);
gradient.addColorStop(0,'rgba(0,255,136,0.12)');gradient.addColorStop(1,'rgba(0,255,136,0)');
ctx.fillStyle=gradient;ctx.beginPath();ctx.moveTo(50,H-40);
for(var j=0;j<recent.length;j++){
  var px=50+j*stepX;
  var py=40+(maxD-recent[j].diff)/(maxD-minD)*(H-80);
  ctx.lineTo(px,py);
}
ctx.lineTo(50+(recent.length-1)*stepX,H-40);ctx.closePath();ctx.fill();

ctx.strokeStyle='#00FF88';ctx.lineWidth=2.5;ctx.beginPath();
for(var k=0;k<recent.length;k++){
  var px2=50+k*stepX;
  var py2=40+(maxD-recent[k].diff)/(maxD-minD)*(H-80);
  if(k===0)ctx.moveTo(px2,py2);else ctx.lineTo(px2,py2);
}
ctx.stroke();

for(var m=0;m<recent.length;m++){
  var dx=50+m*stepX;
  var dy=40+(maxD-recent[m].diff)/(maxD-minD)*(H-80);
  ctx.beginPath();ctx.arc(dx,dy,4,0,Math.PI*2);
  ctx.fillStyle=recent[m].diff<=10?'#00FF88':recent[m].diff<=20?'#FFB800':'#ff6b6b';
  ctx.fill();
}

ctx.fillStyle='#00FF88';ctx.font='bold 13px sans-serif';ctx.textAlign='left';
ctx.fillText('Handicap Differential Trend ('+log.length+' rounds)',12,22);
}

// ===== 3. FIR/GIR DEEP ANALYZER =====
function showFairwayAnalyzer(){
var pn=getPanel('fairway');
var fwLog=lsGet('fw_log',[]);
var html='<div class="v13-title">&#x1F3CC;&#xFE0F; FIR/GIR 심화 분석기</div>';

html+='<div class="v13-card"><h3>라운드 FIR/GIR 입력</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v13-label">FIR (14홀)</label><input id="v13-fw-fir" class="v13-input" type="number" min="0" max="14" value="7"></div>';
html+='<div><label class="v13-label">GIR (18홀)</label><input id="v13-fw-gir" class="v13-input" type="number" min="0" max="18" value="6"></div>';
html+='<div><label class="v13-label">스크램블링</label><input id="v13-fw-scr" class="v13-input" type="number" min="0" max="18" value="4"></div>';
html+='<div><label class="v13-label">샌드세이브</label><input id="v13-fw-sand" class="v13-input" type="number" min="0" max="18" value="2"></div>';
html+='<div><label class="v13-label">퍼팅 수</label><input id="v13-fw-putts" class="v13-input" type="number" min="18" max="60" value="32"></div>';
html+='</div>';
html+='<button class="v13-btn v13-btn-primary" style="width:100%;margin-top:10px" onclick="window._v13RecordFW()">기록 저장</button></div>';

html+='<canvas id="v13-fw-canvas" width="420" height="420" style="width:100%;max-width:420px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

if(fwLog.length>0){
  var avgFIR=0,avgGIR=0,avgSCR=0,avgSAND=0,avgPUTT=0;
  for(var i=0;i<fwLog.length;i++){avgFIR+=fwLog[i].fir;avgGIR+=fwLog[i].gir;avgSCR+=fwLog[i].scr;avgSAND+=fwLog[i].sand;avgPUTT+=fwLog[i].putts}
  avgFIR=(avgFIR/fwLog.length/14*100).toFixed(0);
  avgGIR=(avgGIR/fwLog.length/18*100).toFixed(0);
  avgSCR=(avgSCR/fwLog.length).toFixed(1);
  avgSAND=(avgSAND/fwLog.length).toFixed(1);
  avgPUTT=(avgPUTT/fwLog.length).toFixed(1);

  html+='<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px">';
  html+='<div class="v13-stat-card"><div class="v13-stat-val" style="color:#00FF88">'+avgFIR+'%</div><div class="v13-stat-label">FIR</div></div>';
  html+='<div class="v13-stat-card"><div class="v13-stat-val" style="color:#00B4D8">'+avgGIR+'%</div><div class="v13-stat-label">GIR</div></div>';
  html+='<div class="v13-stat-card"><div class="v13-stat-val" style="color:#FFB800">'+avgSCR+'</div><div class="v13-stat-label">스크램블</div></div>';
  html+='<div class="v13-stat-card"><div class="v13-stat-val" style="color:#A855F7">'+avgSAND+'</div><div class="v13-stat-label">샌드세이브</div></div>';
  html+='<div class="v13-stat-card"><div class="v13-stat-val" style="color:#ff6b6b">'+avgPUTT+'</div><div class="v13-stat-label">평균 퍼트</div></div>';
  html+='</div>';

  html+='<div class="v13-card"><h3>&#x1F4D6; PGA Tour 평균 대비</h3>';
  html+='<table class="v13-table"><tr><th>항목</th><th>내 평균</th><th>PGA Tour</th><th>판정</th></tr>';
  var pgaFIR=60,pgaGIR=66,pgaPUTT=29;
  var firGrade=parseInt(avgFIR)>=pgaFIR?'&#x2705;':'&#x274C;';
  var girGrade=parseInt(avgGIR)>=pgaGIR?'&#x2705;':'&#x274C;';
  var puttGrade=parseFloat(avgPUTT)<=pgaPUTT?'&#x2705;':'&#x274C;';
  html+='<tr><td>FIR</td><td style="color:#00FF88">'+avgFIR+'%</td><td>~'+pgaFIR+'%</td><td>'+firGrade+'</td></tr>';
  html+='<tr><td>GIR</td><td style="color:#00B4D8">'+avgGIR+'%</td><td>~'+pgaGIR+'%</td><td>'+girGrade+'</td></tr>';
  html+='<tr><td>평균 퍼트</td><td style="color:#ff6b6b">'+avgPUTT+'</td><td>~'+pgaPUTT+'</td><td>'+puttGrade+'</td></tr>';
  html+='</table></div>';
}

pn.innerHTML='<button class="v13-close" onclick="window._v13Close(\'fairway\')">&times;</button>'+html;
openPanel('fairway');playSfx('fairway_view');
setTimeout(function(){renderFWCanvas(fwLog)},120);
v13CheckAch();lsSet('ach_fw_viewed',true);
}

window._v13RecordFW=function(){
var fir=parseInt(document.getElementById('v13-fw-fir').value)||0;
var gir=parseInt(document.getElementById('v13-fw-gir').value)||0;
var scr=parseInt(document.getElementById('v13-fw-scr').value)||0;
var sand=parseInt(document.getElementById('v13-fw-sand').value)||0;
var putts=parseInt(document.getElementById('v13-fw-putts').value)||32;
var log=lsGet('fw_log',[]);
log.push({fir:fir,gir:gir,scr:scr,sand:sand,putts:putts,date:todayStr()});
if(log.length>50)log=log.slice(-50);
lsSet('fw_log',log);
playSfx('fairway_view');showToast('FIR/GIR 기록 저장! (FIR:'+fir+'/14, GIR:'+gir+'/18)');
closePanel('fairway');setTimeout(showFairwayAnalyzer,200);
};

function renderFWCanvas(log){
var canvas=document.getElementById('v13-fw-canvas');if(!canvas)return;
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a1020';ctx.fillRect(0,0,W,H);

var cx=W/2,cy=H/2+10,R=150;
var axes=['FIR','GIR','스크램블링','샌드세이브','퍼팅'];
var maxVals=[100,100,10,10,40];
var colors=['#00FF88','#00B4D8','#FFB800','#A855F7','#ff6b6b'];
var n=axes.length;var angleStep=Math.PI*2/n;

for(var r=1;r<=4;r++){
  ctx.strokeStyle='rgba(255,255,255,.07)';ctx.lineWidth=1;ctx.beginPath();
  for(var a=0;a<n;a++){
    var ang=-Math.PI/2+a*angleStep;
    var px=cx+Math.cos(ang)*R*r/4;var py=cy+Math.sin(ang)*R*r/4;
    if(a===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);
  }
  ctx.closePath();ctx.stroke();
}
for(var b=0;b<n;b++){
  var ang2=-Math.PI/2+b*angleStep;
  ctx.strokeStyle='rgba(255,255,255,.05)';ctx.beginPath();
  ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(ang2)*R,cy+Math.sin(ang2)*R);ctx.stroke();
  ctx.fillStyle='#aaa';ctx.font='bold 11px sans-serif';ctx.textAlign='center';
  ctx.fillText(axes[b],cx+Math.cos(ang2)*(R+20),cy+Math.sin(ang2)*(R+20)+4);
}

if(log.length>0){
  var avgVals=[0,0,0,0,0];
  for(var i=0;i<log.length;i++){
    avgVals[0]+=log[i].fir/14*100;avgVals[1]+=log[i].gir/18*100;
    avgVals[2]+=log[i].scr;avgVals[3]+=log[i].sand;avgVals[4]+=log[i].putts;
  }
  for(var j=0;j<5;j++)avgVals[j]/=log.length;
  avgVals[4]=Math.max(0,40-avgVals[4])/40*100;

  ctx.fillStyle='rgba(0,255,136,.12)';ctx.strokeStyle='#00FF88';ctx.lineWidth=2;
  ctx.beginPath();
  for(var k=0;k<n;k++){
    var pct=Math.min(1,k===4?avgVals[k]/100:avgVals[k]/maxVals[k]);
    var ang3=-Math.PI/2+k*angleStep;
    var px3=cx+Math.cos(ang3)*R*pct;var py3=cy+Math.sin(ang3)*R*pct;
    if(k===0)ctx.moveTo(px3,py3);else ctx.lineTo(px3,py3);
  }
  ctx.closePath();ctx.fill();ctx.stroke();

  for(var m=0;m<n;m++){
    var pct2=Math.min(1,m===4?avgVals[m]/100:avgVals[m]/maxVals[m]);
    var ang4=-Math.PI/2+m*angleStep;
    var px4=cx+Math.cos(ang4)*R*pct2;var py4=cy+Math.sin(ang4)*R*pct2;
    ctx.beginPath();ctx.arc(px4,py4,5,0,Math.PI*2);ctx.fillStyle=colors[m];ctx.fill();
  }
}

ctx.fillStyle='#00B4D8';ctx.font='bold 13px sans-serif';ctx.textAlign='left';
ctx.fillText('FIR/GIR Radar Analysis ('+log.length+' rounds)',12,22);
}

// ===== 4. SWING ANALYSIS NOTEBOOK =====
function showSwingNotes(){
var pn=getPanel('swingnote');
var notes=lsGet('swing_notes',[]);
var html='<div class="v13-title">&#x1F4DD; 스윙 분석 노트북</div>';

html+='<div class="v13-card"><h3>새 스윙 노트</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">';
html+='<div><label class="v13-label">카테고리</label><select id="v13-sn-cat" class="v13-input"><option>드라이버</option><option>아이언</option><option>웨지</option><option>퍼터</option><option>멘탈</option><option>기타</option></select></div>';
html+='<div><label class="v13-label">기분</label><select id="v13-sn-mood" class="v13-input"><option value="great">&#x1F60D; 최고</option><option value="good">&#x1F60A; 좋음</option><option value="ok" selected>&#x1F610; 보통</option><option value="bad">&#x1F614; 나쁨</option><option value="awful">&#x1F621; 최악</option></select></div>';
html+='</div>';
html+='<div style="margin-top:8px"><label class="v13-label">메모</label><textarea id="v13-sn-text" class="v13-input" rows="3" placeholder="스윙 피드백, 감각, 교정 포인트 등..." style="resize:vertical"></textarea></div>';
html+='<div style="margin-top:8px"><label class="v13-label">태그 (쉼표 구분)</label><input id="v13-sn-tags" class="v13-input" placeholder="예: 그립,백스윙,팔로우스루"></div>';
html+='<button class="v13-btn v13-btn-primary" style="width:100%;margin-top:10px" onclick="window._v13SaveNote()">노트 저장</button></div>';

html+='<div class="v13-card"><h3>&#x1F4DA; 노트 목록 ('+notes.length+'건)</h3>';
if(notes.length>0){
  var recent=notes.slice(-10).reverse();
  for(var i=0;i<recent.length;i++){
    var n=recent[i];
    var moodMap={great:'&#x1F60D;',good:'&#x1F60A;',ok:'&#x1F610;',bad:'&#x1F614;',awful:'&#x1F621;'};
    html+='<div style="border:1px solid rgba(255,255,255,.05);border-radius:10px;padding:10px;margin-bottom:8px;background:rgba(255,255,255,.02)">';
    html+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">';
    html+='<span style="color:#00FF88;font-size:.8em;font-weight:600">['+n.category+'] '+(moodMap[n.mood]||'')+'</span>';
    html+='<span style="color:#555;font-size:.7em">'+n.date+'</span></div>';
    html+='<p style="color:#ccc;font-size:.85em;margin:4px 0;line-height:1.5">'+n.text.replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</p>';
    if(n.tags&&n.tags.length>0){
      html+='<div style="display:flex;gap:4px;flex-wrap:wrap;margin-top:4px">';
      for(var t=0;t<n.tags.length;t++){
        html+='<span style="padding:2px 8px;background:rgba(0,180,216,.1);border:1px solid rgba(0,180,216,.15);border-radius:12px;font-size:.68em;color:#00B4D8">#'+n.tags[t]+'</span>';
      }
      html+='</div>';
    }
    html+='</div>';
  }
} else {html+='<p style="color:#888;font-size:.85em">아직 노트가 없습니다.</p>'}
html+='</div>';

pn.innerHTML='<button class="v13-close" onclick="window._v13Close(\'swingnote\')">&times;</button>'+html;
openPanel('swingnote');playSfx('swing_note');
v13CheckAch();lsSet('ach_note_used',true);
}

window._v13SaveNote=function(){
var cat=document.getElementById('v13-sn-cat').value;
var mood=document.getElementById('v13-sn-mood').value;
var text=document.getElementById('v13-sn-text').value.trim();
if(!text){showToast('메모를 입력하세요!');return}
var tagsRaw=document.getElementById('v13-sn-tags').value;
var tags=tagsRaw?tagsRaw.split(',').map(function(t){return t.trim()}).filter(function(t){return t.length>0}):[];
var notes=lsGet('swing_notes',[]);
notes.push({category:cat,mood:mood,text:text,tags:tags,date:todayStr()});
if(notes.length>100)notes=notes.slice(-100);
lsSet('swing_notes',notes);
playSfx('swing_note');showToast('스윙 노트 저장!');
closePanel('swingnote');setTimeout(showSwingNotes,200);
};

// ===== 5. EQUIPMENT MANAGER =====
function showEquipManager(){
var pn=getPanel('equip');
var equip=lsGet('equipment',{clubs:[],ball:'',glove:''});
var html='<div class="v13-title">&#x1F3CC;&#xFE0F; 장비 관리 시스템</div>';

var defaultClubs=[
  {name:'Driver',brand:'',model:'',purchaseDate:'',roundsUsed:0},
  {name:'3W',brand:'',model:'',purchaseDate:'',roundsUsed:0},
  {name:'5W',brand:'',model:'',purchaseDate:'',roundsUsed:0},
  {name:'4H',brand:'',model:'',purchaseDate:'',roundsUsed:0},
  {name:'5I',brand:'',model:'',purchaseDate:'',roundsUsed:0},
  {name:'6I',brand:'',model:'',purchaseDate:'',roundsUsed:0},
  {name:'7I',brand:'',model:'',purchaseDate:'',roundsUsed:0},
  {name:'8I',brand:'',model:'',purchaseDate:'',roundsUsed:0},
  {name:'9I',brand:'',model:'',purchaseDate:'',roundsUsed:0},
  {name:'PW',brand:'',model:'',purchaseDate:'',roundsUsed:0},
  {name:'GW',brand:'',model:'',purchaseDate:'',roundsUsed:0},
  {name:'SW',brand:'',model:'',purchaseDate:'',roundsUsed:0},
  {name:'LW',brand:'',model:'',purchaseDate:'',roundsUsed:0},
  {name:'Putter',brand:'',model:'',purchaseDate:'',roundsUsed:0}
];
if(!equip.clubs||equip.clubs.length===0)equip.clubs=defaultClubs;

html+='<div class="v13-card"><h3>&#x1F3CC;&#xFE0F; 클럽 세팅 ('+equip.clubs.length+'개)</h3>';
html+='<div style="display:grid;gap:6px;margin-top:8px">';
for(var i=0;i<equip.clubs.length;i++){
  var c=equip.clubs[i];
  var age=c.purchaseDate?Math.floor((Date.now()-new Date(c.purchaseDate).getTime())/(1000*60*60*24)):'--';
  var ageWarning=typeof age==='number'&&age>730;
  html+='<div style="display:flex;align-items:center;gap:8px;padding:6px;border:1px solid rgba(255,255,255,.05);border-radius:8px;background:rgba(255,255,255,.02)">';
  html+='<span style="width:45px;flex-shrink:0;font-weight:700;color:#00FF88;font-size:.82em">'+c.name+'</span>';
  html+='<input class="v13-input" style="flex:1;padding:4px 8px;font-size:.78em" placeholder="브랜드/모델" value="'+(c.brand?c.brand+(c.model?' '+c.model:''):'')+'" id="v13-eq-'+i+'">';
  html+='<span style="font-size:.7em;color:'+(ageWarning?'#ff6b6b':'#888')+'">'+age+'일</span>';
  html+='<span style="font-size:.7em;color:#888">'+c.roundsUsed+'R</span>';
  html+='</div>';
}
html+='</div>';
html+='<button class="v13-btn v13-btn-primary" style="width:100%;margin-top:10px" onclick="window._v13SaveEquip()">장비 저장</button></div>';

html+='<div class="v13-card"><h3>&#x26BE; 볼 &amp; &#x1F9E4; 글러브</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">';
html+='<div><label class="v13-label">사용 볼</label><input id="v13-eq-ball" class="v13-input" value="'+(equip.ball||'')+'" placeholder="예: Pro V1"></div>';
html+='<div><label class="v13-label">글러브</label><input id="v13-eq-glove" class="v13-input" value="'+(equip.glove||'')+'" placeholder="예: FJ WeatherSof"></div>';
html+='</div></div>';

html+='<div class="v13-card"><h3>&#x1F4D6; 장비 교체 가이드</h3>';
html+='<table class="v13-table"><tr><th>장비</th><th>교체 주기</th><th>교체 신호</th></tr>';
html+='<tr><td>드라이버</td><td>3~5년</td><td>비거리 감소, 페이스 마모</td></tr>';
html+='<tr><td>아이언 세트</td><td>5~7년</td><td>그루브 마모, 탄도 변화</td></tr>';
html+='<tr><td>웨지</td><td>60~80라운드</td><td>스핀 감소, 그루브 마모</td></tr>';
html+='<tr><td>퍼터</td><td>반영구</td><td>페이스 인서트 마모</td></tr>';
html+='<tr><td>글러브</td><td>10~15라운드</td><td>그립감 저하, 찢어짐</td></tr>';
html+='<tr><td>볼</td><td>매 라운드</td><td>스크래치, 탄도 변화</td></tr>';
html+='</table></div>';

pn.innerHTML='<button class="v13-close" onclick="window._v13Close(\'equip\')">&times;</button>'+html;
openPanel('equip');playSfx('equip_open');
v13CheckAch();lsSet('ach_equip_used',true);
}

window._v13SaveEquip=function(){
var equip=lsGet('equipment',{clubs:[],ball:'',glove:''});
var defaultClubs=[{name:'Driver'},{name:'3W'},{name:'5W'},{name:'4H'},{name:'5I'},{name:'6I'},{name:'7I'},{name:'8I'},{name:'9I'},{name:'PW'},{name:'GW'},{name:'SW'},{name:'LW'},{name:'Putter'}];
if(!equip.clubs||equip.clubs.length===0)equip.clubs=defaultClubs.map(function(c){return{name:c.name,brand:'',model:'',purchaseDate:'',roundsUsed:0}});
for(var i=0;i<equip.clubs.length;i++){
  var val=document.getElementById('v13-eq-'+i);
  if(val){var parts=val.value.trim().split(/\s+/);equip.clubs[i].brand=parts[0]||'';equip.clubs[i].model=parts.slice(1).join(' ')||'';if(!equip.clubs[i].purchaseDate)equip.clubs[i].purchaseDate=todayStr()}
}
equip.ball=document.getElementById('v13-eq-ball').value.trim();
equip.glove=document.getElementById('v13-eq-glove').value.trim();
lsSet('equipment',equip);
playSfx('equip_open');showToast('장비 정보 저장!');
};

// ===== 6. PRACTICE DRILL LIBRARY =====
function showDrillLibrary(){
var pn=getPanel('drills');
var drillProgress=lsGet('drill_progress',{});
var DRILLS=[
  {id:'d1',cat:'드라이버',name:'티샷 정렬 드릴',desc:'양발 사이에 클럽을 놓고 타겟과 평행하게 정렬. 10구 연습.',reps:10},
  {id:'d2',cat:'드라이버',name:'하체 고정 드릴',desc:'하프 스윙으로 하체 회전 없이 상체만 회전. 체중 이동 감각.',reps:15},
  {id:'d3',cat:'드라이버',name:'헤드 속도 드릴',desc:'알루미늄 스틱으로 3세트 x 5회 최대 속도 스윙.',reps:15},
  {id:'d4',cat:'아이언',name:'볼 포지션 드릴',desc:'7번 아이언으로 볼 위치를 앞/중/뒤로 바꿔가며 5구씩.',reps:15},
  {id:'d5',cat:'아이언',name:'다운블로 임팩트 드릴',desc:'볼 앞 10cm에 티 꽂고 티를 같이 치는 연습.',reps:20},
  {id:'d6',cat:'아이언',name:'거리 조절 드릴',desc:'8번/9번으로 50%/75%/100% 스윙 각 5구.',reps:15},
  {id:'d7',cat:'웨지',name:'56도 로브샷 드릴',desc:'20yd/30yd/40yd 타겟에 5구씩 착탄 연습.',reps:15},
  {id:'d8',cat:'웨지',name:'벙커 엑스플로젼 드릴',desc:'오픈 스탠스로 모래 먼저 치는 연습. 10구.',reps:10},
  {id:'d9',cat:'웨지',name:'칩앤런 컨트롤',desc:'그린 엣지에서 7번/PW/SW로 각 5구 칩앤런.',reps:15},
  {id:'d10',cat:'퍼터',name:'게이트 퍼팅 드릴',desc:'티 2개로 문 만들고 1m 퍼팅 20회 연속 성공.',reps:20},
  {id:'d11',cat:'퍼터',name:'거리감 래더 드릴',desc:'3ft/6ft/9ft/12ft 순서로 각 5회 퍼팅.',reps:20},
  {id:'d12',cat:'퍼터',name:'클록 퍼팅 드릴',desc:'홀컵 주위 4방향에서 3ft 퍼팅 연속 성공.',reps:12}
];

var html='<div class="v13-title">&#x1F3AF; 연습장 드릴 라이브러리</div>';
var cats=['드라이버','아이언','웨지','퍼터'];

for(var ci=0;ci<cats.length;ci++){
  var cat=cats[ci];
  html+='<div class="v13-card"><h3>&#x1F3CC;&#xFE0F; '+cat+' 드릴</h3>';
  var catDrills=DRILLS.filter(function(d){return d.cat===cat});
  for(var di=0;di<catDrills.length;di++){
    var d=catDrills[di];
    var done=drillProgress[d.id]||0;
    var completed=done>=d.reps;
    var pct=Math.min(100,Math.round(done/d.reps*100));
    html+='<div style="border:1px solid rgba(255,255,255,.05);border-radius:8px;padding:10px;margin-bottom:6px;background:rgba(255,255,255,.02)'+(completed?';border-color:rgba(0,255,136,.2)':'')+'">';
    html+='<div style="display:flex;justify-content:space-between;align-items:center">';
    html+='<span style="font-weight:600;font-size:.88em;color:'+(completed?'#00FF88':'#ccc')+'">'+d.name+(completed?' &#x2705;':'')+'</span>';
    html+='<span style="font-size:.72em;color:#888">'+done+'/'+d.reps+'</span></div>';
    html+='<p style="color:#888;font-size:.78em;margin:4px 0">'+d.desc+'</p>';
    html+='<div style="display:flex;align-items:center;gap:8px;margin-top:6px">';
    html+='<div style="flex:1;height:6px;background:rgba(255,255,255,.06);border-radius:3px"><div style="width:'+pct+'%;height:100%;background:#00FF88;border-radius:3px;transition:width .3s"></div></div>';
    if(!completed)html+='<button class="v13-btn" style="font-size:.72em;padding:4px 10px" onclick="window._v13DoDrill(\''+d.id+'\')">+1</button>';
    html+='</div></div>';
  }
  html+='</div>';
}

var totalDone=0,totalAll=0;
for(var k=0;k<DRILLS.length;k++){totalAll+=DRILLS[k].reps;totalDone+=Math.min(DRILLS[k].reps,drillProgress[DRILLS[k].id]||0)}
html+='<div style="text-align:center;color:#888;font-size:.8em;margin-top:8px">전체 진행: '+totalDone+'/'+totalAll+' ('+Math.round(totalDone/totalAll*100)+'%)</div>';

html+='<div style="text-align:center;margin-top:8px"><button class="v13-btn" onclick="if(confirm(\'드릴 진행을 초기화하시겠습니까?\'))window._v13ResetDrills()">초기화</button></div>';

pn.innerHTML='<button class="v13-close" onclick="window._v13Close(\'drills\')">&times;</button>'+html;
openPanel('drills');playSfx('drill_done');
v13CheckAch();lsSet('ach_drill_used',true);
}

window._v13DoDrill=function(id){
var prog=lsGet('drill_progress',{});
prog[id]=(prog[id]||0)+1;
lsSet('drill_progress',prog);
playSfx('drill_done');showToast('드릴 진행 +1!');
closePanel('drills');setTimeout(showDrillLibrary,150);
};
window._v13ResetDrills=function(){lsSet('drill_progress',{});closePanel('drills');setTimeout(showDrillLibrary,200)};

// ===== 7. STAMINA & FATIGUE TRACKER =====
function showStaminaTracker(){
var pn=getPanel('stamina');
var stLog=lsGet('stamina_log',[]);
var html='<div class="v13-title">&#x1F4AA; 체력/피로도 트래커</div>';

html+='<div class="v13-card"><h3>라운드 컨디션 기록</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:8px">';
html+='<div><label class="v13-label">구간</label><select id="v13-st-phase" class="v13-input"><option>전반 전 (1-3홀)</option><option>전반 중 (4-6홀)</option><option>전반 후 (7-9홀)</option><option>후반 전 (10-12홀)</option><option>후반 중 (13-15홀)</option><option>후반 후 (16-18홀)</option></select></div>';
html+='<div><label class="v13-label">체력 (1~10)</label><input id="v13-st-energy" class="v13-input" type="number" min="1" max="10" value="7"></div>';
html+='<div><label class="v13-label">집중력 (1~10)</label><input id="v13-st-focus" class="v13-input" type="number" min="1" max="10" value="7"></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">';
html+='<div><label class="v13-label">수분 (0~10잔)</label><input id="v13-st-water" class="v13-input" type="number" min="0" max="10" value="3"></div>';
html+='<div><label class="v13-label">날짜</label><input id="v13-st-date" class="v13-input" type="date" value="'+todayStr()+'"></div>';
html+='</div>';
html+='<button class="v13-btn v13-btn-primary" style="width:100%;margin-top:10px" onclick="window._v13RecordStamina()">컨디션 기록</button></div>';

html+='<canvas id="v13-stamina-canvas" width="560" height="300" style="width:100%;max-width:560px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

if(stLog.length>0){
  var avgE=0,avgF=0,avgW=0;
  for(var i=0;i<stLog.length;i++){avgE+=stLog[i].energy;avgF+=stLog[i].focus;avgW+=stLog[i].water}
  avgE=(avgE/stLog.length).toFixed(1);avgF=(avgF/stLog.length).toFixed(1);avgW=(avgW/stLog.length).toFixed(1);

  html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">';
  html+='<div class="v13-stat-card"><div class="v13-stat-val" style="color:#00FF88">'+avgE+'</div><div class="v13-stat-label">평균 체력</div></div>';
  html+='<div class="v13-stat-card"><div class="v13-stat-val" style="color:#00B4D8">'+avgF+'</div><div class="v13-stat-label">평균 집중력</div></div>';
  html+='<div class="v13-stat-card"><div class="v13-stat-val" style="color:#FFB800">'+avgW+'잔</div><div class="v13-stat-label">평균 수분</div></div>';
  html+='<div class="v13-stat-card"><div class="v13-stat-val" style="color:#A855F7">'+stLog.length+'</div><div class="v13-stat-label">기록 수</div></div>';
  html+='</div>';

  html+='<div class="v13-card"><h3>&#x1F4A1; 컨디션 관리 팁</h3>';
  html+='<div style="font-size:.85em;color:#aaa;line-height:1.7">';
  if(parseFloat(avgE)<5)html+='<p style="color:#ff6b6b">&#x26A0;&#xFE0F; 체력이 부족합니다. 라운드 전 충분한 수면과 스트레칭을 하세요.</p>';
  if(parseFloat(avgF)<5)html+='<p style="color:#FFB800">&#x26A0;&#xFE0F; 집중력 저하 경향. 프리샷 루틴을 일정하게 유지하세요.</p>';
  if(parseFloat(avgW)<4)html+='<p style="color:#00B4D8">&#x1F4A7; 수분 섭취가 부족합니다. 3홀마다 물 한 잔을 목표로 하세요.</p>';
  if(parseFloat(avgE)>=7&&parseFloat(avgF)>=7)html+='<p style="color:#00FF88">&#x2705; 전반적인 컨디션이 좋습니다. 현재 패턴을 유지하세요!</p>';
  html+='</div></div>';
}

pn.innerHTML='<button class="v13-close" onclick="window._v13Close(\'stamina\')">&times;</button>'+html;
openPanel('stamina');playSfx('stamina_log');
setTimeout(function(){renderStaminaCanvas(stLog)},120);
v13CheckAch();lsSet('ach_stamina_used',true);
}

window._v13RecordStamina=function(){
var phase=document.getElementById('v13-st-phase').value;
var energy=parseInt(document.getElementById('v13-st-energy').value)||5;
var focus=parseInt(document.getElementById('v13-st-focus').value)||5;
var water=parseInt(document.getElementById('v13-st-water').value)||0;
var date=document.getElementById('v13-st-date').value||todayStr();
var log=lsGet('stamina_log',[]);
log.push({phase:phase,energy:energy,focus:focus,water:water,date:date});
if(log.length>100)log=log.slice(-100);
lsSet('stamina_log',log);
playSfx('stamina_log');showToast('컨디션 기록 저장!');
closePanel('stamina');setTimeout(showStaminaTracker,200);
};

function renderStaminaCanvas(log){
var canvas=document.getElementById('v13-stamina-canvas');if(!canvas)return;
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a1020';ctx.fillRect(0,0,W,H);

if(log.length<2){
  ctx.fillStyle='#555';ctx.font='14px sans-serif';ctx.textAlign='center';
  ctx.fillText('2개 이상의 기록이 필요합니다',W/2,H/2);
  return;
}

var recent=log.slice(-18);
ctx.strokeStyle='rgba(255,255,255,.06)';ctx.lineWidth=1;
for(var g=0;g<=10;g+=2){
  var y=40+(10-g)/10*(H-80);
  ctx.beginPath();ctx.moveTo(50,y);ctx.lineTo(W-20,y);ctx.stroke();
  ctx.fillStyle='#555';ctx.font='10px sans-serif';ctx.textAlign='right';ctx.fillText(g,45,y+4);
}

var stepX=(W-80)/(recent.length-1||1);
var lines=[
  {key:'energy',color:'#00FF88',label:'체력'},
  {key:'focus',color:'#00B4D8',label:'집중력'},
  {key:'water',color:'#FFB800',label:'수분'}
];

for(var l=0;l<lines.length;l++){
  var line=lines[l];
  ctx.strokeStyle=line.color;ctx.lineWidth=2;ctx.beginPath();
  for(var j=0;j<recent.length;j++){
    var px=50+j*stepX;
    var py=40+(10-recent[j][line.key])/10*(H-80);
    if(j===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);
  }
  ctx.stroke();
  for(var k=0;k<recent.length;k++){
    var dx=50+k*stepX;
    var dy=40+(10-recent[k][line.key])/10*(H-80);
    ctx.beginPath();ctx.arc(dx,dy,3,0,Math.PI*2);ctx.fillStyle=line.color;ctx.fill();
  }
}

ctx.font='bold 10px sans-serif';
for(var m=0;m<lines.length;m++){
  ctx.fillStyle=lines[m].color;
  ctx.fillText('● '+lines[m].label,W-120+m*45,H-10);
}

ctx.fillStyle='#00B4D8';ctx.font='bold 13px sans-serif';ctx.textAlign='left';
ctx.fillText('Stamina & Focus Trend ('+log.length+' records)',12,22);
}

// ===== 8. PRO COMPARISON ANALYZER =====
function showProComparison(){
var pn=getPanel('procomp');
var myStats=lsGet('my_stats',{drive:220,fir:50,gir:35,putts:34,scramble:30,sg:0});
var html='<div class="v13-title">&#x1F31F; 프로선수 비교 분석기</div>';

html+='<div class="v13-card"><h3>내 스탯 입력</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:8px">';
html+='<div><label class="v13-label">드라이버 비거리 (yd)</label><input id="v13-pro-drive" class="v13-input" type="number" min="150" max="350" value="'+myStats.drive+'"></div>';
html+='<div><label class="v13-label">FIR (%)</label><input id="v13-pro-fir" class="v13-input" type="number" min="0" max="100" value="'+myStats.fir+'"></div>';
html+='<div><label class="v13-label">GIR (%)</label><input id="v13-pro-gir" class="v13-input" type="number" min="0" max="100" value="'+myStats.gir+'"></div>';
html+='<div><label class="v13-label">평균 퍼트</label><input id="v13-pro-putts" class="v13-input" type="number" step="0.1" min="24" max="45" value="'+myStats.putts+'"></div>';
html+='<div><label class="v13-label">스크램블링 (%)</label><input id="v13-pro-scr" class="v13-input" type="number" min="0" max="100" value="'+myStats.scramble+'"></div>';
html+='<div><label class="v13-label">SG: Total</label><input id="v13-pro-sg" class="v13-input" type="number" step="0.1" min="-10" max="10" value="'+myStats.sg+'"></div>';
html+='</div>';
html+='<button class="v13-btn v13-btn-primary" style="width:100%;margin-top:10px" onclick="window._v13CompareProStats()">PGA Tour 비교 분석</button></div>';

html+='<canvas id="v13-pro-canvas" width="450" height="450" style="width:100%;max-width:450px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';
html+='<div id="v13-pro-result"></div>';

html+='<div class="v13-card"><h3>&#x1F4CA; PGA Tour 2024 평균 기준</h3>';
html+='<table class="v13-table"><tr><th>항목</th><th>PGA Tour 평균</th><th>Top 10 평균</th></tr>';
html+='<tr><td>드라이버 비거리</td><td>296 yd</td><td>315 yd</td></tr>';
html+='<tr><td>FIR</td><td>60%</td><td>68%</td></tr>';
html+='<tr><td>GIR</td><td>66%</td><td>72%</td></tr>';
html+='<tr><td>평균 퍼트</td><td>29.0</td><td>27.5</td></tr>';
html+='<tr><td>스크램블링</td><td>58%</td><td>65%</td></tr>';
html+='<tr><td>SG: Total</td><td>0.0</td><td>+2.5</td></tr>';
html+='</table></div>';

pn.innerHTML='<button class="v13-close" onclick="window._v13Close(\'procomp\')">&times;</button>'+html;
openPanel('procomp');playSfx('pro_compare');
setTimeout(function(){window._v13CompareProStats()},200);
v13CheckAch();lsSet('ach_pro_viewed',true);
}

window._v13CompareProStats=function(){
var drive=parseInt(document.getElementById('v13-pro-drive').value)||220;
var fir=parseInt(document.getElementById('v13-pro-fir').value)||50;
var gir=parseInt(document.getElementById('v13-pro-gir').value)||35;
var putts=parseFloat(document.getElementById('v13-pro-putts').value)||34;
var scr=parseInt(document.getElementById('v13-pro-scr').value)||30;
var sg=parseFloat(document.getElementById('v13-pro-sg').value)||0;

var myStats={drive:drive,fir:fir,gir:gir,putts:putts,scramble:scr,sg:sg};
lsSet('my_stats',myStats);

var pgaAvg={drive:296,fir:60,gir:66,putts:29,scramble:58,sg:0};

var rhtml='<div class="v13-card"><h3>&#x1F50D; 비교 결과</h3>';
var items=[
  {name:'드라이버',my:drive,pga:pgaAvg.drive,unit:'yd',higher:true},
  {name:'FIR',my:fir,pga:pgaAvg.fir,unit:'%',higher:true},
  {name:'GIR',my:gir,pga:pgaAvg.gir,unit:'%',higher:true},
  {name:'퍼트',my:putts,pga:pgaAvg.putts,unit:'',higher:false},
  {name:'스크램블',my:scr,pga:pgaAvg.scramble,unit:'%',higher:true},
  {name:'SG Total',my:sg,pga:pgaAvg.sg,unit:'',higher:true}
];

rhtml+='<table class="v13-table"><tr><th>항목</th><th>나</th><th>PGA</th><th>차이</th><th>등급</th></tr>';
for(var i=0;i<items.length;i++){
  var it=items[i];
  var diff=it.higher?it.my-it.pga:it.pga-it.my;
  var pct=it.higher?it.my/it.pga*100:it.pga/it.my*100;
  var grade,gradeColor;
  if(pct>=95){grade='S';gradeColor='#FFD700'}
  else if(pct>=80){grade='A';gradeColor='#00FF88'}
  else if(pct>=65){grade='B';gradeColor='#00B4D8'}
  else if(pct>=50){grade='C';gradeColor='#FFB800'}
  else{grade='D';gradeColor='#ff6b6b'}
  var diffColor=diff>=0?'#00FF88':'#ff6b6b';
  var diffStr=(diff>=0?'+':'')+diff.toFixed(it.unit==='%'||it.name==='SG Total'?1:0)+it.unit;
  rhtml+='<tr><td>'+it.name+'</td><td>'+it.my+it.unit+'</td><td>'+it.pga+it.unit+'</td><td style="color:'+diffColor+'">'+diffStr+'</td>';
  rhtml+='<td><span class="v13-badge" style="background:'+gradeColor+'22;color:'+gradeColor+'">'+grade+'</span></td></tr>';
}
rhtml+='</table>';

var overallPct=0;
for(var j=0;j<items.length;j++){overallPct+=items[j].higher?items[j].my/items[j].pga*100:items[j].pga/items[j].my*100}
overallPct=Math.round(overallPct/items.length);
var overallGrade=overallPct>=95?'S':overallPct>=80?'A':overallPct>=65?'B':overallPct>=50?'C':'D';
rhtml+='<div style="text-align:center;margin-top:12px"><span style="font-size:1.5em;font-weight:900;color:'+(overallGrade==='S'?'#FFD700':overallGrade==='A'?'#00FF88':'#FFB800')+'">종합 등급: '+overallGrade+' ('+overallPct+'%)</span></div>';
rhtml+='</div>';

document.getElementById('v13-pro-result').innerHTML=rhtml;
renderProCanvas(myStats,pgaAvg);
playSfx('pro_compare');
};

function renderProCanvas(my,pga){
var canvas=document.getElementById('v13-pro-canvas');if(!canvas)return;
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a1020';ctx.fillRect(0,0,W,H);

var cx=W/2,cy=H/2+10,R=160;
var axes=['비거리','FIR','GIR','퍼팅','스크램블','SG'];
var myNorm=[my.drive/350,my.fir/100,my.gir/100,Math.max(0,(45-my.putts)/20),my.scramble/100,Math.max(0,(my.sg+5)/10)];
var pgaNorm=[pga.drive/350,pga.fir/100,pga.gir/100,Math.max(0,(45-pga.putts)/20),pga.scramble/100,Math.max(0,(pga.sg+5)/10)];
var n=axes.length;var angleStep=Math.PI*2/n;

for(var r=1;r<=4;r++){
  ctx.strokeStyle='rgba(255,255,255,.07)';ctx.lineWidth=1;ctx.beginPath();
  for(var a=0;a<n;a++){
    var ang=-Math.PI/2+a*angleStep;
    var px=cx+Math.cos(ang)*R*r/4;var py=cy+Math.sin(ang)*R*r/4;
    if(a===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);
  }
  ctx.closePath();ctx.stroke();
}
for(var b=0;b<n;b++){
  var ang2=-Math.PI/2+b*angleStep;
  ctx.strokeStyle='rgba(255,255,255,.05)';ctx.beginPath();
  ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(ang2)*R,cy+Math.sin(ang2)*R);ctx.stroke();
  ctx.fillStyle='#ccc';ctx.font='bold 11px sans-serif';ctx.textAlign='center';
  ctx.fillText(axes[b],cx+Math.cos(ang2)*(R+22),cy+Math.sin(ang2)*(R+22)+4);
}

ctx.fillStyle='rgba(255,107,107,.08)';ctx.strokeStyle='#ff6b6b';ctx.lineWidth=2;
ctx.beginPath();
for(var c=0;c<n;c++){
  var ang3=-Math.PI/2+c*angleStep;
  var pctPga=Math.min(1,pgaNorm[c]);
  var px3=cx+Math.cos(ang3)*R*pctPga;var py3=cy+Math.sin(ang3)*R*pctPga;
  if(c===0)ctx.moveTo(px3,py3);else ctx.lineTo(px3,py3);
}
ctx.closePath();ctx.fill();ctx.stroke();

ctx.fillStyle='rgba(0,255,136,.1)';ctx.strokeStyle='#00FF88';ctx.lineWidth=2;
ctx.beginPath();
for(var d=0;d<n;d++){
  var ang4=-Math.PI/2+d*angleStep;
  var pctMy=Math.min(1,myNorm[d]);
  var px4=cx+Math.cos(ang4)*R*pctMy;var py4=cy+Math.sin(ang4)*R*pctMy;
  if(d===0)ctx.moveTo(px4,py4);else ctx.lineTo(px4,py4);
}
ctx.closePath();ctx.fill();ctx.stroke();

for(var e=0;e<n;e++){
  var ang5=-Math.PI/2+e*angleStep;
  ctx.beginPath();ctx.arc(cx+Math.cos(ang5)*R*Math.min(1,myNorm[e]),cy+Math.sin(ang5)*R*Math.min(1,myNorm[e]),4,0,Math.PI*2);
  ctx.fillStyle='#00FF88';ctx.fill();
  ctx.beginPath();ctx.arc(cx+Math.cos(ang5)*R*Math.min(1,pgaNorm[e]),cy+Math.sin(ang5)*R*Math.min(1,pgaNorm[e]),4,0,Math.PI*2);
  ctx.fillStyle='#ff6b6b';ctx.fill();
}

ctx.fillStyle='#00B4D8';ctx.font='bold 13px sans-serif';ctx.textAlign='left';
ctx.fillText('My Stats vs PGA Tour Avg',12,22);
ctx.fillStyle='#00FF88';ctx.font='bold 10px sans-serif';ctx.fillText('● 나',W-120,H-10);
ctx.fillStyle='#ff6b6b';ctx.fillText('● PGA Tour',W-65,H-10);
}

// ===== QUIZ v6 (+15 = 90 total) =====
var V13_QUIZ=[
{q:'WHS 핸디캡 인덱스 계산 시 최종 곱하는 계수는?',a:['0.90','0.96','1.00','1.04'],c:1},
{q:'FIR(Fairway In Regulation)은 몇 번 홀에서 측정하나?',a:['18홀 전부','Par 4,5 홀 (14홀)','Par 3,4 홀','Par 5만'],c:1},
{q:'GIR(Green In Regulation)의 기준은?',a:['Par-1타 이내 그린 온','Par-2타 이내 그린 온','2타 이내 그린 온','3타 이내 그린 온'],c:1},
{q:'스크램블링(Scrambling)이란?',a:['GIR 미스 후 파 이상 세이브','벙커에서 탈출','더블보기 회피','파 세이브 전체'],c:0},
{q:'PGA Tour 평균 드라이버 비거리는 약?',a:['260yd','280yd','296yd','320yd'],c:2},
{q:'라운드 중 수분 섭취 권장량은 매 몇 홀마다?',a:['1홀','3홀','6홀','9홀'],c:1},
{q:'핸디캡 디퍼런셜 계산 공식에서 113은 무엇?',a:['표준 슬로프 레이팅','표준 코스 레이팅','보정 계수','최대 핸디캡'],c:0},
{q:'웨지의 그루브 교체 권장 주기는 약?',a:['10라운드','30라운드','60~80라운드','200라운드'],c:2},
{q:'게이트 퍼팅 드릴의 목적은?',a:['거리감 향상','스트로크 직진성','브레이크 읽기','속도 조절'],c:1},
{q:'PGA Tour 평균 GIR은 약?',a:['45%','55%','66%','75%'],c:2},
{q:'18홀 스코어카드에서 OUT은?',a:['1~9홀','10~18홀','Par 3 합계','전체 합계'],c:0},
{q:'체력 저하가 스코어에 가장 큰 영향을 주는 구간은?',a:['1~3홀','4~6홀','7~9홀','16~18홀'],c:3},
{q:'칩앤런에 가장 적합한 클럽은?',a:['드라이버','7~9번 아이언','로브웨지','3번 우드'],c:1},
{q:'클럽 14개 규정을 정한 기관은?',a:['PGA','R&amp;A / USGA','FIFA','IOC'],c:1},
{q:'라운드 중 멘탈 리셋에 효과적인 호흡법은?',a:['4-7-8 호흡','1-1-1 호흡','연속 과호흡','숨 참기'],c:0}
];

function showV13Quiz(){
var pn=getPanel('v13quiz');
var qs=lsGet('v13quiz_state',{answered:[],correct:0,currentIdx:0});
var idx=qs.currentIdx;
if(idx>=V13_QUIZ.length)idx=0;

var html='<div class="v13-title">&#x1F4DD; 골프 퀴즈 v6 ('+V13_QUIZ.length+'문)</div>';
html+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">';
html+='<span style="color:#888;font-size:.85em">진행: '+(qs.answered||[]).length+'/'+V13_QUIZ.length+'</span>';
html+='<span style="color:#00FF88;font-size:.85em">정답: '+qs.correct+'/'+((qs.answered||[]).length||0)+'</span>';
html+='</div>';

var q=V13_QUIZ[idx];
html+='<div class="v13-card"><h3>Q'+(idx+1)+'. '+q.q+'</h3>';
html+='<div style="display:grid;gap:8px;margin-top:12px">';
for(var i=0;i<q.a.length;i++){
  var answered=(qs.answered||[]).indexOf(idx)>-1;
  var btnClass='v13-btn';
  if(answered&&i===q.c)btnClass+=' active';
  html+='<button class="'+btnClass+'" style="text-align:left;padding:12px 16px" onclick="window._v13QuizAnswer('+idx+','+i+')"'+(answered?' disabled':'')+'>'+String.fromCharCode(65+i)+'. '+q.a[i]+'</button>';
}
html+='</div></div>';

html+='<div style="display:flex;justify-content:space-between;margin-top:8px">';
html+='<button class="v13-btn" onclick="window._v13QuizNav(-1)">&larr; 이전</button>';
html+='<button class="v13-btn" onclick="window._v13QuizReset()">리셋</button>';
html+='<button class="v13-btn" onclick="window._v13QuizNav(1)">다음 &rarr;</button>';
html+='</div>';

pn.innerHTML='<button class="v13-close" onclick="window._v13Close(\'v13quiz\')">&times;</button>'+html;
openPanel('v13quiz');playSfx('v13_quiz');
}

window._v13QuizAnswer=function(idx,ans){
var qs=lsGet('v13quiz_state',{answered:[],correct:0,currentIdx:0});
if(!qs.answered)qs.answered=[];
if(qs.answered.indexOf(idx)>-1)return;
qs.answered.push(idx);
if(ans===V13_QUIZ[idx].c){qs.correct++;playSfx('quiz_correct13');showToast('정답! &#x2705;')}
else{showToast('오답! 정답: '+String.fromCharCode(65+V13_QUIZ[idx].c)+'. '+V13_QUIZ[idx].a[V13_QUIZ[idx].c])}
lsSet('v13quiz_state',qs);
closePanel('v13quiz');setTimeout(showV13Quiz,200);
v13CheckAch();
};
window._v13QuizNav=function(dir){
var qs=lsGet('v13quiz_state',{answered:[],correct:0,currentIdx:0});
qs.currentIdx=(qs.currentIdx+dir+V13_QUIZ.length)%V13_QUIZ.length;
lsSet('v13quiz_state',qs);closePanel('v13quiz');setTimeout(showV13Quiz,150);
};
window._v13QuizReset=function(){lsSet('v13quiz_state',{answered:[],correct:0,currentIdx:0});closePanel('v13quiz');setTimeout(showV13Quiz,200)};

// ===== ACHIEVEMENTS (+12 = 72 total) =====
var V13_ACH=[
{id:'v13_heatmap',name:'히트맵 분석가',desc:'라운드 스코어카드 히트맵 사용',icon:'&#x1F525;',check:function(){return lsGet('ach_heatmap_viewed',false)}},
{id:'v13_heatmap_3',name:'라운드 기록가',desc:'스코어카드 3라운드 기록',icon:'&#x1F4CB;',check:function(){return lsGet('heatmap_rounds',[]).length>=3}},
{id:'v13_handicap',name:'핸디캡 추적자',desc:'핸디캡 추적기 사용',icon:'&#x1F3C6;',check:function(){return lsGet('ach_hc_viewed',false)}},
{id:'v13_hc_5',name:'핸디캡 전문가',desc:'핸디캡 디퍼런셜 5회 기록',icon:'&#x1F4C9;',check:function(){return lsGet('hc_log',[]).length>=5}},
{id:'v13_fairway',name:'FIR/GIR 분석가',desc:'FIR/GIR 심화 분석기 사용',icon:'&#x1F3CC;&#xFE0F;',check:function(){return lsGet('ach_fw_viewed',false)}},
{id:'v13_notes',name:'스윙 분석가',desc:'스윙 분석 노트 사용',icon:'&#x1F4DD;',check:function(){return lsGet('ach_note_used',false)}},
{id:'v13_notes_10',name:'노트 마스터',desc:'스윙 노트 10개 작성',icon:'&#x1F4D6;',check:function(){return lsGet('swing_notes',[]).length>=10}},
{id:'v13_equip',name:'장비 관리자',desc:'장비 관리 시스템 사용',icon:'&#x1F6E0;&#xFE0F;',check:function(){return lsGet('ach_equip_used',false)}},
{id:'v13_drill',name:'연습 전사',desc:'연습 드릴 라이브러리 사용',icon:'&#x1F3AF;',check:function(){return lsGet('ach_drill_used',false)}},
{id:'v13_stamina',name:'체력 관리자',desc:'체력/피로도 트래커 사용',icon:'&#x1F4AA;',check:function(){return lsGet('ach_stamina_used',false)}},
{id:'v13_pro',name:'프로 도전자',desc:'프로선수 비교 분석 사용',icon:'&#x1F31F;',check:function(){return lsGet('ach_pro_viewed',false)}},
{id:'v13_all',name:'v13 탐험가',desc:'v13 전체 기능 탐색',icon:'&#x1F30D;',check:function(){return lsGet('ach_heatmap_viewed',false)&&lsGet('ach_hc_viewed',false)&&lsGet('ach_fw_viewed',false)&&lsGet('ach_note_used',false)&&lsGet('ach_equip_used',false)&&lsGet('ach_drill_used',false)&&lsGet('ach_stamina_used',false)&&lsGet('ach_pro_viewed',false)}}
];

function v13CheckAch(){
var unlocked=lsGet('v13_achievements',[]);
for(var i=0;i<V13_ACH.length;i++){
  var ach=V13_ACH[i];
  if(unlocked.indexOf(ach.id)===-1&&ach.check()){
    unlocked.push(ach.id);lsSet('v13_achievements',unlocked);
    showV13AchPopup(ach);playSfx('v13_achieve');
  }
}
}

function showV13AchPopup(ach){
var popup=document.createElement('div');popup.className='v13-ach-popup';
popup.innerHTML='<div style="font-size:2em">'+ach.icon+'</div><div><div style="font-size:.65em;color:#00FF88;font-weight:700;letter-spacing:2px">ACHIEVEMENT</div><div style="font-weight:700">'+ach.name+'</div><div style="font-size:.8em;color:#888;margin-top:2px">'+ach.desc+'</div></div>';
document.body.appendChild(popup);
setTimeout(function(){popup.classList.add('show')},50);
setTimeout(function(){popup.classList.remove('show');setTimeout(function(){popup.remove()},500)},3500);
}

// ===== QUICK ACTIONS & KEYBOARD =====
function injectV13QuickActions(){
var existing=document.querySelector('.v13-scroll-nav');if(existing)return;
var nav=document.createElement('div');nav.className='v13-scroll-nav';
var buttons=[
  {icon:'&#x1F525;',title:'히트맵 (Shift+H)',fn:'showScoreHeatmap'},
  {icon:'&#x1F3C6;',title:'핸디캡 (Shift+I)',fn:'showHandicapTracker'},
  {icon:'&#x1F3CC;&#xFE0F;',title:'FIR/GIR (Shift+F)',fn:'showFairwayAnalyzer'},
  {icon:'&#x1F4DD;',title:'스윙노트 (Shift+O)',fn:'showSwingNotes'},
  {icon:'&#x1F6E0;&#xFE0F;',title:'장비 (Shift+E)',fn:'showEquipManager'},
  {icon:'&#x1F3AF;',title:'드릴 (Shift+D)',fn:'showDrillLibrary'},
  {icon:'&#x1F4AA;',title:'체력 (Shift+A)',fn:'showStaminaTracker'},
  {icon:'&#x1F31F;',title:'프로비교 (Shift+X)',fn:'showProComparison'}
];
for(var i=0;i<buttons.length;i++){
  var btn=document.createElement('button');btn.className='v13-nav-btn';
  btn.innerHTML='<span class="v13-nav-icon">'+buttons[i].icon+'</span><span class="v13-nav-label">'+buttons[i].title.split(' (')[0]+'</span>';
  btn.title=buttons[i].title;
  btn.setAttribute('data-fn',buttons[i].fn);
  btn.addEventListener('click',function(){var fn=this.getAttribute('data-fn');if(window['_v13_'+fn])window['_v13_'+fn]()});
  nav.appendChild(btn);
}

var oldNav=document.querySelector('.v12-scroll-nav');
if(oldNav)oldNav.style.display='none';

document.body.appendChild(nav);
}

window._v13_showScoreHeatmap=showScoreHeatmap;
window._v13_showHandicapTracker=showHandicapTracker;
window._v13_showFairwayAnalyzer=showFairwayAnalyzer;
window._v13_showSwingNotes=showSwingNotes;
window._v13_showEquipManager=showEquipManager;
window._v13_showDrillLibrary=showDrillLibrary;
window._v13_showStaminaTracker=showStaminaTracker;
window._v13_showProComparison=showProComparison;
window._v13_showV13Quiz=showV13Quiz;
window._v13Close=function(id){closePanel(id)};

function setupV13Keyboard(){
document.addEventListener('keydown',function(e){
  if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'||e.target.tagName==='SELECT')return;
  if(e.ctrlKey||e.metaKey||e.altKey)return;
  if(!e.shiftKey)return;
  switch(e.key){
    case'H':e.preventDefault();showScoreHeatmap();break;
    case'I':e.preventDefault();showHandicapTracker();break;
    case'F':e.preventDefault();showFairwayAnalyzer();break;
    case'O':e.preventDefault();showSwingNotes();break;
    case'E':e.preventDefault();showEquipManager();break;
    case'D':e.preventDefault();showDrillLibrary();break;
    case'A':e.preventDefault();showStaminaTracker();break;
    case'X':e.preventDefault();showProComparison();break;
  }
});
}

// ===== CSS =====
function injectV13CSS(){
var s=document.createElement('style');
s.textContent='.v13-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.88);z-index:10006;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;pointer-events:none}.v13-overlay.active{opacity:1;pointer-events:auto}.v13-panel{background:linear-gradient(145deg,rgba(10,16,26,.98),rgba(5,8,16,.98));border:1px solid rgba(0,255,136,.15);border-radius:18px;padding:24px;max-width:680px;width:94%;max-height:85vh;overflow-y:auto;box-shadow:0 24px 80px rgba(0,0,0,.7),0 0 40px rgba(0,255,136,.06);position:relative}.v13-panel::-webkit-scrollbar{width:5px}.v13-panel::-webkit-scrollbar-thumb{background:rgba(0,255,136,.2);border-radius:3px}.v13-title{font-size:1.4em;font-weight:800;color:#00FF88;margin-bottom:18px;letter-spacing:-0.5px}.v13-close{position:absolute;top:12px;right:16px;background:none;border:none;color:#666;font-size:1.6em;cursor:pointer;padding:4px 8px;border-radius:8px;transition:all .2s;z-index:1}.v13-close:hover{color:#ff6b6b;background:rgba(255,107,107,.1)}.v13-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:16px;margin-bottom:12px;transition:all .2s}.v13-card:hover{border-color:rgba(0,255,136,.15);background:rgba(255,255,255,.05)}.v13-card h3{color:#00FF88;font-size:.95em;margin:0 0 8px}.v13-card p{color:#aaa;font-size:.85em;margin:0;line-height:1.6}.v13-badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:.75em;font-weight:600}.v13-btn{padding:8px 16px;border:1px solid rgba(0,255,136,.2);background:rgba(0,255,136,.06);color:#00FF88;border-radius:8px;cursor:pointer;font-size:.85em;transition:all .2s}.v13-btn:hover{background:rgba(0,255,136,.15);border-color:#00FF88}.v13-btn.active{background:rgba(0,255,136,.15);border-color:rgba(0,255,136,.4);color:#00FF88}.v13-btn-primary{background:rgba(0,255,136,.12);border-color:rgba(0,255,136,.3);color:#00FF88}.v13-btn-primary:hover{background:rgba(0,255,136,.22)}.v13-btn:disabled{opacity:.5;cursor:default}.v13-input{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:8px 12px;color:#fff;font-size:.85em;width:100%;box-sizing:border-box}.v13-input:focus{outline:none;border-color:rgba(0,255,136,.4)}.v13-label{display:block;font-size:.72em;color:#888;margin-bottom:3px}.v13-table{width:100%;border-collapse:collapse;font-size:.82em}.v13-table th{text-align:left;padding:8px;color:#00FF88;border-bottom:1px solid rgba(255,255,255,.08);font-weight:600}.v13-table td{padding:8px;color:#ccc;border-bottom:1px solid rgba(255,255,255,.03)}.v13-stat-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:10px 6px;text-align:center}.v13-stat-val{font-size:1.3em;font-weight:800}.v13-stat-label{font-size:.65em;color:#888;margin-top:2px}.v13-scroll-nav{position:fixed;bottom:0;left:0;right:0;z-index:999;display:flex;overflow-x:auto;gap:2px;padding:6px 8px;background:linear-gradient(to top,rgba(5,8,16,.97),rgba(5,8,16,.82));border-top:1px solid rgba(0,255,136,.1);-webkit-overflow-scrolling:touch;scrollbar-width:none}.v13-scroll-nav::-webkit-scrollbar{display:none}.v13-nav-btn{display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px 10px;border:1px solid rgba(0,255,136,.1);background:rgba(0,255,136,.04);color:#00FF88;border-radius:10px;cursor:pointer;flex-shrink:0;transition:all .2s;font-size:1em;min-width:60px}.v13-nav-btn:hover{background:rgba(0,255,136,.12);transform:scale(1.05)}.v13-nav-icon{font-size:1.2em}.v13-nav-label{font-size:.55em;color:#888;white-space:nowrap}.v13-toast{position:fixed;top:20px;left:50%;transform:translateX(-50%) translateY(-100px);background:rgba(0,255,136,.1);border:1px solid rgba(0,255,136,.2);color:#00FF88;padding:10px 20px;border-radius:10px;z-index:99999;transition:transform .4s;font-size:.9em;backdrop-filter:blur(12px);white-space:nowrap}.v13-toast.show{transform:translateX(-50%) translateY(0)}.v13-ach-popup{position:fixed;top:60px;left:50%;transform:translateX(-50%) translateY(-150px);z-index:100000;background:linear-gradient(135deg,rgba(10,16,26,.96),rgba(20,28,38,.96));border:1px solid rgba(0,255,136,.25);border-radius:16px;padding:14px 22px;display:flex;align-items:center;gap:14px;backdrop-filter:blur(20px);transition:transform .5s cubic-bezier(.34,1.56,.64,1);box-shadow:0 8px 32px rgba(0,0,0,.5),0 0 24px rgba(0,255,136,.08)}.v13-ach-popup.show{transform:translateX(-50%) translateY(0)}@media(max-width:480px){.v13-panel{padding:16px;max-height:92vh;width:96%}.v13-scroll-nav{padding:4px 4px;gap:1px}.v13-nav-btn{min-width:52px;padding:5px 7px}.v13-nav-icon{font-size:1em}.v13-nav-label{font-size:.5em}}';
document.head.appendChild(s);
}

// ===== INIT =====
function initV13(){
injectV13CSS();
injectV13QuickActions();
setupV13Keyboard();
setTimeout(v13CheckAch,5000);
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',initV13)}
else{setTimeout(initV13,2500)}

})();
