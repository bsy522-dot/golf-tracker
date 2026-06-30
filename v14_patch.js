(function(){
'use strict';
var LS='gt_v14_';
var audioCtx=null;
function getAC(){if(!audioCtx)try{audioCtx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}return audioCtx}
function playSfx(type){var ac=getAC();if(!ac)return;var o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);var t=ac.currentTime;g.gain.setValueAtTime(0.1,t);switch(type){case'pace_start':o.type='sine';o.frequency.setValueAtTime(392,t);o.frequency.linearRampToValueAtTime(523,t+0.08);o.frequency.linearRampToValueAtTime(659,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'pace_hole':o.type='triangle';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(784,t+0.1);g.gain.setValueAtTime(0.08,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.2);o.start(t);o.stop(t+0.2);break;case'course_rate':o.type='sine';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(554,t+0.08);o.frequency.linearRampToValueAtTime(659,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'speed_calc':o.type='sine';o.frequency.setValueAtTime(494,t);o.frequency.linearRampToValueAtTime(659,t+0.08);o.frequency.linearRampToValueAtTime(784,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'putt_path':o.type='triangle';o.frequency.setValueAtTime(349,t);o.frequency.linearRampToValueAtTime(440,t+0.1);o.frequency.linearRampToValueAtTime(523,t+0.2);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'weather_view':o.type='sine';o.frequency.setValueAtTime(587,t);o.frequency.linearRampToValueAtTime(740,t+0.1);g.gain.exponentialRampToValueAtTime(0.01,t+0.25);o.start(t);o.stop(t+0.25);break;case'club_rec':o.type='sine';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(659,t+0.06);o.frequency.linearRampToValueAtTime(784,t+0.12);o.frequency.linearRampToValueAtTime(988,t+0.2);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'fitness_done':o.type='sine';o.frequency.setValueAtTime(659,t);o.frequency.linearRampToValueAtTime(784,t+0.08);o.frequency.linearRampToValueAtTime(988,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'checklist_check':o.type='triangle';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(659,t+0.08);g.gain.setValueAtTime(0.07,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.18);o.start(t);o.stop(t+0.18);break;case'v14_achieve':o.type='sine';o.frequency.setValueAtTime(784,t);o.frequency.setValueAtTime(988,t+0.1);o.frequency.setValueAtTime(1175,t+0.2);o.frequency.setValueAtTime(1568,t+0.3);g.gain.exponentialRampToValueAtTime(0.01,t+0.5);o.start(t);o.stop(t+0.5);break;case'v14_quiz':o.type='sine';o.frequency.setValueAtTime(554,t);o.frequency.setValueAtTime(698,t+0.1);o.frequency.setValueAtTime(880,t+0.2);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'quiz_correct14':o.type='sine';o.frequency.setValueAtTime(698,t);o.frequency.setValueAtTime(880,t+0.08);o.frequency.setValueAtTime(1175,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;default:o.type='sine';o.frequency.setValueAtTime(440,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.15);o.start(t);o.stop(t+0.15)}}

function lsGet(k,d){try{var v=localStorage.getItem(LS+k);return v?JSON.parse(v):d}catch(e){return d}}
function lsSet(k,v){try{localStorage.setItem(LS+k,JSON.stringify(v))}catch(e){}}
function todayStr(){return new Date().toISOString().slice(0,10)}
function showToast(msg){var t=document.createElement('div');t.className='v14-toast';t.textContent=msg;document.body.appendChild(t);setTimeout(function(){t.classList.add('show')},50);setTimeout(function(){t.classList.remove('show');setTimeout(function(){t.remove()},400)},3000)}
function createOverlay(id){var ov=document.createElement('div');ov.className='v14-overlay';ov.id='v14-'+id;ov.addEventListener('click',function(e){if(e.target===ov)closePanel(id)});var pn=document.createElement('div');pn.className='v14-panel';pn.style.position='relative';ov.appendChild(pn);return pn}
function openPanel(id){var el=document.getElementById('v14-'+id);if(el)el.classList.add('active')}
function closePanel(id){var el=document.getElementById('v14-'+id);if(el)el.classList.remove('active')}
function getPanel(id){var ov=document.getElementById('v14-'+id);if(!ov){var pn=createOverlay(id);pn.id='v14-'+id+'-panel';document.body.appendChild(pn.parentElement);return pn}return ov.querySelector('.v14-panel')||ov}

// ===== 1. ROUND PACE TIMER =====
function showPaceTimer(){
var pn=getPanel('pace');
var sessions=lsGet('pace_sessions',[]);
var active=lsGet('pace_active',null);
var html='<div class="v14-title">&#x23F1;&#xFE0F; 라운드 페이스 타이머</div>';

if(!active){
  html+='<div class="v14-card"><h3>새 라운드 시작</h3>';
  html+='<p style="color:#aaa;font-size:.82em;margin-bottom:10px">18홀 홀별 소요시간을 추적합니다. 이상적 페이스: Par3 10분, Par4 13분, Par5 15분</p>';
  html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';
  html+='<div><label class="v14-label">코스명</label><input id="v14-pace-course" class="v14-input" placeholder="예: 남서울CC"></div>';
  html+='<div><label class="v14-label">날짜</label><input id="v14-pace-date" class="v14-input" type="date" value="'+todayStr()+'"></div>';
  html+='</div>';
  html+='<button class="v14-btn v14-btn-primary" style="width:100%;margin-top:10px" onclick="window._v14StartPace()">&#x1F3CC;&#xFE0F; 라운드 시작</button></div>';
} else {
  var currentHole=active.holeTimes.length+1;
  var elapsed=0;
  if(active.holeStart){elapsed=Math.floor((Date.now()-active.holeStart)/1000)}
  var totalElapsed=0;
  for(var i=0;i<active.holeTimes.length;i++)totalElapsed+=active.holeTimes[i];
  totalElapsed+=elapsed;
  var pars=[4,4,3,5,4,3,4,5,4,4,4,3,5,4,3,4,5,4];

  html+='<div class="v14-card" style="text-align:center">';
  html+='<div style="font-size:.8em;color:#888">'+active.course+' &bull; '+active.date+'</div>';
  html+='<div style="font-size:2.4em;font-weight:800;color:#00FF88;margin:8px 0" id="v14-pace-timer">'+formatTime(elapsed)+'</div>';
  html+='<div style="font-size:1.1em;font-weight:700;color:#fff">홀 #'+currentHole+' <span style="color:#888;font-size:.8em">(Par '+pars[Math.min(currentHole-1,17)]+')</span></div>';
  html+='<div style="font-size:.8em;color:#888;margin-top:6px">총 경과: '+formatTime(totalElapsed)+'</div>';
  html+='<div style="display:flex;gap:8px;margin-top:12px;justify-content:center">';
  if(currentHole<=18){
    html+='<button class="v14-btn v14-btn-primary" onclick="window._v14NextHole()">홀 완료 &rarr;</button>';
  }
  html+='<button class="v14-btn" style="color:#ff6b6b;border-color:rgba(255,107,107,.3)" onclick="window._v14EndPace()">라운드 종료</button>';
  html+='</div></div>';

  if(active.holeTimes.length>0){
    html+='<canvas id="v14-pace-canvas" width="600" height="300" style="width:100%;max-width:600px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';
  }

  html+='<div class="v14-card"><h3>홀별 소요시간</h3>';
  html+='<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:4px;font-size:.78em">';
  for(var h=0;h<active.holeTimes.length;h++){
    var idealMin=pars[h]===3?10:pars[h]===5?15:13;
    var mins=active.holeTimes[h]/60;
    var color=mins<=idealMin?'#00FF88':mins<=idealMin+3?'#FFB800':'#ff6b6b';
    html+='<div class="v14-stat-card"><div class="v14-stat-val" style="color:'+color+';font-size:1em">'+formatTime(active.holeTimes[h])+'</div><div class="v14-stat-label">#'+(h+1)+'</div></div>';
  }
  html+='</div></div>';
}

html+='<div class="v14-card"><h3>&#x1F4CA; 페이스 이력 ('+sessions.length+'회)</h3>';
if(sessions.length>0){
  html+='<table class="v14-table"><tr><th>날짜</th><th>코스</th><th>홀</th><th>총시간</th><th>평균/홀</th></tr>';
  var recent=sessions.slice(-5).reverse();
  for(var s=0;s<recent.length;s++){
    var ss=recent[s];var total=0;
    for(var j=0;j<ss.holeTimes.length;j++)total+=ss.holeTimes[j];
    var avg=ss.holeTimes.length>0?Math.round(total/ss.holeTimes.length):0;
    var avgColor=avg<=780?'#00FF88':avg<=900?'#FFB800':'#ff6b6b';
    html+='<tr><td>'+ss.date+'</td><td>'+(ss.course||'-')+'</td><td>'+ss.holeTimes.length+'</td><td>'+formatTime(total)+'</td><td style="color:'+avgColor+'">'+formatTime(avg)+'</td></tr>';
  }
  html+='</table>';
} else{html+='<p style="color:#888;font-size:.85em">아직 기록이 없습니다.</p>'}
html+='</div>';

pn.innerHTML='<button class="v14-close" onclick="window._v14Close(\'pace\')">&times;</button>'+html;
openPanel('pace');playSfx('pace_start');
if(active&&active.holeTimes.length>0)setTimeout(function(){renderPaceCanvas(active)},120);
if(active&&active.holeStart){startPaceInterval()}
v14CheckAch();lsSet('ach_pace_viewed',true);
}

function formatTime(sec){var m=Math.floor(sec/60);var s=sec%60;return m+':'+(s<10?'0':'')+s}

var paceInterval=null;
function startPaceInterval(){
if(paceInterval)clearInterval(paceInterval);
paceInterval=setInterval(function(){
  var active=lsGet('pace_active',null);
  if(!active||!active.holeStart)return;
  var el=document.getElementById('v14-pace-timer');
  if(el){var elapsed=Math.floor((Date.now()-active.holeStart)/1000);el.textContent=formatTime(elapsed)}
},1000);
}

window._v14StartPace=function(){
var course=document.getElementById('v14-pace-course').value||'';
var date=document.getElementById('v14-pace-date').value||todayStr();
lsSet('pace_active',{course:course,date:date,holeTimes:[],holeStart:Date.now()});
playSfx('pace_start');showPaceTimer();
};

window._v14NextHole=function(){
var active=lsGet('pace_active',null);
if(!active||!active.holeStart)return;
var elapsed=Math.floor((Date.now()-active.holeStart)/1000);
active.holeTimes.push(elapsed);
active.holeStart=active.holeTimes.length<18?Date.now():null;
lsSet('pace_active',active);
playSfx('pace_hole');
if(active.holeTimes.length>=18){window._v14EndPace();return}
showPaceTimer();
};

window._v14EndPace=function(){
var active=lsGet('pace_active',null);
if(!active)return;
if(active.holeStart){
  var elapsed=Math.floor((Date.now()-active.holeStart)/1000);
  active.holeTimes.push(elapsed);
}
if(paceInterval){clearInterval(paceInterval);paceInterval=null}
var sessions=lsGet('pace_sessions',[]);
sessions.push({course:active.course,date:active.date,holeTimes:active.holeTimes});
if(sessions.length>30)sessions=sessions.slice(-30);
lsSet('pace_sessions',sessions);
lsSet('pace_active',null);
playSfx('pace_hole');showToast('라운드 종료! '+active.holeTimes.length+'홀 완료');
showPaceTimer();
};

function renderPaceCanvas(data){
var cv=document.getElementById('v14-pace-canvas');if(!cv)return;
var ctx=cv.getContext('2d');var W=cv.width,H=cv.height;
ctx.clearRect(0,0,W,H);
ctx.fillStyle='rgba(10,16,26,0.95)';ctx.beginPath();ctx.roundRect(0,0,W,H,12);ctx.fill();
var pars=[4,4,3,5,4,3,4,5,4,4,4,3,5,4,3,4,5,4];
var times=data.holeTimes;
var maxTime=0;
for(var i=0;i<times.length;i++){if(times[i]>maxTime)maxTime=times[i]}
maxTime=Math.max(maxTime,900);
var padL=50,padR=20,padT=40,padB=40;
var chartW=W-padL-padR,chartH=H-padT-padB;

ctx.fillStyle='#00FF88';ctx.font='bold 14px sans-serif';ctx.textAlign='center';
ctx.fillText('홀별 소요시간 분석',W/2,24);

for(var y=0;y<=4;y++){
  var val=Math.round(maxTime*y/4);
  var yy=padT+chartH-chartH*y/4;
  ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.beginPath();ctx.moveTo(padL,yy);ctx.lineTo(W-padR,yy);ctx.stroke();
  ctx.fillStyle='#666';ctx.font='10px sans-serif';ctx.textAlign='right';
  ctx.fillText(formatTime(val),padL-6,yy+3);
}

var barW=Math.min(28,chartW/times.length-4);
for(var b=0;b<times.length;b++){
  var x=padL+(b+0.5)*chartW/times.length-barW/2;
  var h=times[b]/maxTime*chartH;
  var idealMin=pars[b]===3?10:pars[b]===5?15:13;
  var idealSec=idealMin*60;
  var color=times[b]<=idealSec?'rgba(0,255,136,0.7)':times[b]<=idealSec+180?'rgba(255,184,0,0.7)':'rgba(255,107,107,0.7)';
  ctx.fillStyle=color;ctx.beginPath();ctx.roundRect(x,padT+chartH-h,barW,h,[4,4,0,0]);ctx.fill();

  var idealH=idealSec/maxTime*chartH;
  ctx.strokeStyle='rgba(0,180,216,0.4)';ctx.setLineDash([3,3]);ctx.beginPath();
  ctx.moveTo(x,padT+chartH-idealH);ctx.lineTo(x+barW,padT+chartH-idealH);ctx.stroke();ctx.setLineDash([]);

  ctx.fillStyle='#888';ctx.font='9px sans-serif';ctx.textAlign='center';
  ctx.fillText('#'+(b+1),x+barW/2,padT+chartH+14);
}

ctx.fillStyle='rgba(0,180,216,0.6)';ctx.font='10px sans-serif';ctx.textAlign='left';
ctx.fillText('--- 이상적 페이스',padL+4,padT+chartH+32);
}

// ===== 2. COURSE RATING REVIEWER =====
function showCourseRating(){
var pn=getPanel('courserate');
var reviews=lsGet('course_reviews',[]);
var html='<div class="v14-title">&#x2B50; 코스 레이팅 리뷰어</div>';

var categories=[
  {key:'difficulty',name:'난이도',icon:'&#x26F3;'},
  {key:'condition',name:'코스 컨디션',icon:'&#x1F33F;'},
  {key:'green_speed',name:'그린 스피드',icon:'&#x1F7E2;'},
  {key:'fairway',name:'페어웨이 상태',icon:'&#x1F3DE;&#xFE0F;'},
  {key:'bunker',name:'벙커 관리',icon:'&#x1F3D6;&#xFE0F;'},
  {key:'facilities',name:'부대시설',icon:'&#x1F3E0;'},
  {key:'food',name:'음식/식음료',icon:'&#x1F37D;&#xFE0F;'},
  {key:'staff',name:'스태프 서비스',icon:'&#x1F464;'},
  {key:'value',name:'가성비',icon:'&#x1F4B0;'},
  {key:'scenery',name:'경관/조경',icon:'&#x1F338;'},
  {key:'pace',name:'플레이 속도',icon:'&#x23F1;&#xFE0F;'},
  {key:'access',name:'접근성',icon:'&#x1F697;'}
];

html+='<div class="v14-card"><h3>코스 평가하기</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';
html+='<div><label class="v14-label">코스명</label><input id="v14-cr-name" class="v14-input" placeholder="예: 남서울CC"></div>';
html+='<div><label class="v14-label">방문일</label><input id="v14-cr-date" class="v14-input" type="date" value="'+todayStr()+'"></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:10px">';
for(var c=0;c<categories.length;c++){
  var cat=categories[c];
  html+='<div style="text-align:center"><label class="v14-label">'+cat.icon+' '+cat.name+'</label>';
  html+='<select id="v14-cr-'+cat.key+'" class="v14-input" style="text-align:center"><option value="5">&#x2605;5</option><option value="4">&#x2605;4</option><option value="3" selected>&#x2605;3</option><option value="2">&#x2605;2</option><option value="1">&#x2605;1</option></select></div>';
}
html+='</div>';
html+='<div style="margin-top:8px"><label class="v14-label">코멘트</label><textarea id="v14-cr-comment" class="v14-input" rows="2" placeholder="한줄평..." style="resize:none"></textarea></div>';
html+='<button class="v14-btn v14-btn-primary" style="width:100%;margin-top:10px" onclick="window._v14SaveCourseReview()">리뷰 저장</button></div>';

html+='<canvas id="v14-courserate-canvas" width="520" height="440" style="width:100%;max-width:520px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

html+='<div class="v14-card"><h3>&#x1F4DD; 리뷰 이력 ('+reviews.length+'회)</h3>';
if(reviews.length>0){
  var recent=reviews.slice(-5).reverse();
  for(var r=0;r<recent.length;r++){
    var rv=recent[r];var avg=0;var cnt=0;
    for(var kk in rv.scores){avg+=rv.scores[kk];cnt++}
    avg=cnt>0?(avg/cnt).toFixed(1):'0';
    var starColor=avg>=4?'#FFD700':avg>=3?'#00FF88':avg>=2?'#FFB800':'#ff6b6b';
    html+='<div class="v14-card" style="margin-bottom:8px"><div style="display:flex;justify-content:space-between;align-items:center"><strong style="color:#fff">'+rv.name+'</strong><span style="color:'+starColor+';font-weight:800">'+avg+' &#x2605;</span></div>';
    html+='<div style="font-size:.75em;color:#888">'+rv.date+(rv.comment?' &bull; '+rv.comment:'')+'</div></div>';
  }
} else{html+='<p style="color:#888;font-size:.85em">아직 리뷰가 없습니다.</p>'}
html+='</div>';

pn.innerHTML='<button class="v14-close" onclick="window._v14Close(\'courserate\')">&times;</button>'+html;
openPanel('courserate');playSfx('course_rate');
setTimeout(function(){renderCourseRateCanvas(reviews,categories)},120);
v14CheckAch();lsSet('ach_courserate_viewed',true);
}

window._v14SaveCourseReview=function(){
var name=document.getElementById('v14-cr-name').value;
if(!name){showToast('코스명을 입력하세요');return}
var categories=['difficulty','condition','green_speed','fairway','bunker','facilities','food','staff','value','scenery','pace','access'];
var scores={};
for(var i=0;i<categories.length;i++){
  scores[categories[i]]=parseInt(document.getElementById('v14-cr-'+categories[i]).value)||3;
}
var date=document.getElementById('v14-cr-date').value||todayStr();
var comment=document.getElementById('v14-cr-comment').value||'';
var reviews=lsGet('course_reviews',[]);
reviews.push({name:name,date:date,scores:scores,comment:comment});
if(reviews.length>50)reviews=reviews.slice(-50);
lsSet('course_reviews',reviews);
var avg=0;var cnt=0;for(var k in scores){avg+=scores[k];cnt++}
avg=(avg/cnt).toFixed(1);
playSfx('course_rate');showToast(name+' 리뷰 저장! ('+avg+'&#x2605;)');
showCourseRating();
};

function renderCourseRateCanvas(reviews,categories){
var cv=document.getElementById('v14-courserate-canvas');if(!cv)return;
var ctx=cv.getContext('2d');var W=cv.width,H=cv.height;
ctx.clearRect(0,0,W,H);
ctx.fillStyle='rgba(10,16,26,0.95)';ctx.beginPath();ctx.roundRect(0,0,W,H,12);ctx.fill();

ctx.fillStyle='#00FF88';ctx.font='bold 14px sans-serif';ctx.textAlign='center';
ctx.fillText('12항목 코스 레이더 차트',W/2,24);

if(reviews.length===0){
  ctx.fillStyle='#666';ctx.font='13px sans-serif';ctx.fillText('리뷰를 등록하면 레이더가 표시됩니다',W/2,H/2);return;
}

var last=reviews[reviews.length-1];
var cx=W/2,cy=H/2+10,radius=Math.min(W,H)/2-60;
var n=categories.length;

for(var ring=1;ring<=5;ring++){
  ctx.strokeStyle='rgba(255,255,255,'+(ring===5?0.12:0.06)+')';ctx.beginPath();
  for(var a=0;a<=n;a++){
    var angle=Math.PI*2*a/n-Math.PI/2;
    var r=radius*ring/5;
    if(a===0)ctx.moveTo(cx+r*Math.cos(angle),cy+r*Math.sin(angle));
    else ctx.lineTo(cx+r*Math.cos(angle),cy+r*Math.sin(angle));
  }
  ctx.closePath();ctx.stroke();
}

for(var l=0;l<n;l++){
  var angle=Math.PI*2*l/n-Math.PI/2;
  ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.beginPath();
  ctx.moveTo(cx,cy);ctx.lineTo(cx+radius*Math.cos(angle),cy+radius*Math.sin(angle));ctx.stroke();
  var labelR=radius+20;
  ctx.fillStyle='#aaa';ctx.font='10px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText(categories[l].name,cx+labelR*Math.cos(angle),cy+labelR*Math.sin(angle));
}

ctx.beginPath();
for(var d=0;d<n;d++){
  var val=last.scores[categories[d].key]||3;
  var angle2=Math.PI*2*d/n-Math.PI/2;
  var r2=radius*val/5;
  if(d===0)ctx.moveTo(cx+r2*Math.cos(angle2),cy+r2*Math.sin(angle2));
  else ctx.lineTo(cx+r2*Math.cos(angle2),cy+r2*Math.sin(angle2));
}
ctx.closePath();
ctx.fillStyle='rgba(0,255,136,0.15)';ctx.fill();
ctx.strokeStyle='rgba(0,255,136,0.7)';ctx.lineWidth=2;ctx.stroke();

for(var p=0;p<n;p++){
  var val2=last.scores[categories[p].key]||3;
  var angle3=Math.PI*2*p/n-Math.PI/2;
  var r3=radius*val2/5;
  ctx.beginPath();ctx.arc(cx+r3*Math.cos(angle3),cy+r3*Math.sin(angle3),4,0,Math.PI*2);
  ctx.fillStyle='#00FF88';ctx.fill();
}

ctx.fillStyle='#888';ctx.font='11px sans-serif';ctx.textAlign='center';
ctx.fillText(last.name+' ('+last.date+')',W/2,H-16);
}

// ===== 3. SWING SPEED ESTIMATOR =====
function showSwingSpeed(){
var pn=getPanel('speed');
var records=lsGet('speed_records',[]);
var html='<div class="v14-title">&#x1F4A8; 스윙 스피드 추정기</div>';

var clubs=[
  {name:'드라이버',factor:2.55,avgPro:113},
  {name:'3우드',factor:2.45,avgPro:107},
  {name:'5우드',factor:2.4,avgPro:103},
  {name:'하이브리드',factor:2.35,avgPro:100},
  {name:'4아이언',factor:2.3,avgPro:97},
  {name:'5아이언',factor:2.25,avgPro:94},
  {name:'6아이언',factor:2.2,avgPro:92},
  {name:'7아이언',factor:2.1,avgPro:90},
  {name:'8아이언',factor:2.0,avgPro:87},
  {name:'9아이언',factor:1.9,avgPro:85},
  {name:'PW',factor:1.8,avgPro:83},
  {name:'SW',factor:1.7,avgPro:80}
];

html+='<div class="v14-card"><h3>비거리로 스윙스피드 추정</h3>';
html+='<p style="color:#aaa;font-size:.82em;margin-bottom:10px">캐리 비거리를 입력하면 스매시 팩터 기반으로 클럽 헤드 스피드를 추정합니다.</p>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';
html+='<div><label class="v14-label">클럽 선택</label><select id="v14-sp-club" class="v14-input">';
for(var c=0;c<clubs.length;c++){html+='<option value="'+c+'">'+clubs[c].name+'</option>'}
html+='</select></div>';
html+='<div><label class="v14-label">캐리 비거리 (yard)</label><input id="v14-sp-carry" class="v14-input" type="number" min="50" max="350" value="220"></div>';
html+='</div>';
html+='<button class="v14-btn v14-btn-primary" style="width:100%;margin-top:10px" onclick="window._v14CalcSpeed()">스윙 스피드 계산</button>';
html+='<div id="v14-sp-result" style="margin-top:12px"></div></div>';

html+='<canvas id="v14-speed-canvas" width="600" height="320" style="width:100%;max-width:600px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

html+='<div class="v14-card"><h3>&#x1F4CA; 측정 이력 ('+records.length+'회)</h3>';
if(records.length>0){
  html+='<table class="v14-table"><tr><th>날짜</th><th>클럽</th><th>비거리</th><th>스윙스피드</th><th>볼스피드</th></tr>';
  var recent=records.slice(-8).reverse();
  for(var r=0;r<recent.length;r++){
    var rc=recent[r];
    html+='<tr><td>'+rc.date+'</td><td>'+rc.club+'</td><td>'+rc.carry+'yd</td><td style="color:#00FF88;font-weight:700">'+rc.speed+'mph</td><td>'+rc.ballSpeed+'mph</td></tr>';
  }
  html+='</table>';
} else{html+='<p style="color:#888;font-size:.85em">아직 기록이 없습니다.</p>'}
html+='</div>';

html+='<div class="v14-card"><h3>&#x1F3AF; PGA 투어 평균 참고</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px;font-size:.78em">';
var refs=[{n:'드라이버',s:'113mph'},{n:'7아이언',s:'90mph'},{n:'PW',s:'83mph'},{n:'볼스피드',s:'170mph'}];
for(var rf=0;rf<refs.length;rf++){
  html+='<div class="v14-stat-card"><div class="v14-stat-val" style="color:#00B4D8;font-size:.95em">'+refs[rf].s+'</div><div class="v14-stat-label">'+refs[rf].n+'</div></div>';
}
html+='</div></div>';

pn.innerHTML='<button class="v14-close" onclick="window._v14Close(\'speed\')">&times;</button>'+html;
openPanel('speed');playSfx('speed_calc');
setTimeout(function(){renderSpeedCanvas(records,clubs)},120);
v14CheckAch();lsSet('ach_speed_viewed',true);
}

window._v14CalcSpeed=function(){
var clubs=[
  {name:'드라이버',factor:2.55,avgPro:113},{name:'3우드',factor:2.45,avgPro:107},
  {name:'5우드',factor:2.4,avgPro:103},{name:'하이브리드',factor:2.35,avgPro:100},
  {name:'4아이언',factor:2.3,avgPro:97},{name:'5아이언',factor:2.25,avgPro:94},
  {name:'6아이언',factor:2.2,avgPro:92},{name:'7아이언',factor:2.1,avgPro:90},
  {name:'8아이언',factor:2.0,avgPro:87},{name:'9아이언',factor:1.9,avgPro:85},
  {name:'PW',factor:1.8,avgPro:83},{name:'SW',factor:1.7,avgPro:80}
];
var idx=parseInt(document.getElementById('v14-sp-club').value)||0;
var carry=parseInt(document.getElementById('v14-sp-carry').value)||200;
var club=clubs[idx];
var smashFactor=club.name==='드라이버'?1.48:club.name==='3우드'?1.44:club.name==='7아이언'?1.33:club.name==='PW'?1.25:1.35;
var ballSpeed=carry/club.factor*smashFactor*1.5;
var clubSpeed=ballSpeed/smashFactor;
clubSpeed=Math.round(clubSpeed*10)/10;
ballSpeed=Math.round(clubSpeed*smashFactor*10)/10;
var diff=clubSpeed-club.avgPro;var prefix=diff>=0?'+':'';
var grade=diff>=5?'S':diff>=0?'A':diff>=-5?'B':diff>=-10?'C':'D';
var gradeColor=grade==='S'?'#FFD700':grade==='A'?'#00FF88':grade==='B'?'#00B4D8':grade==='C'?'#FFB800':'#ff6b6b';

var result='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">';
result+='<div class="v14-stat-card"><div class="v14-stat-val" style="color:#00FF88">'+clubSpeed+'</div><div class="v14-stat-label">클럽스피드 (mph)</div></div>';
result+='<div class="v14-stat-card"><div class="v14-stat-val" style="color:#00B4D8">'+ballSpeed+'</div><div class="v14-stat-label">볼스피드 (mph)</div></div>';
result+='<div class="v14-stat-card"><div class="v14-stat-val" style="color:'+(diff>=0?'#00FF88':'#ff6b6b')+'">'+prefix+diff.toFixed(1)+'</div><div class="v14-stat-label">프로 대비</div></div>';
result+='<div class="v14-stat-card"><div class="v14-stat-val" style="color:'+gradeColor+'">'+grade+'</div><div class="v14-stat-label">등급</div></div>';
result+='</div>';
document.getElementById('v14-sp-result').innerHTML=result;

var records=lsGet('speed_records',[]);
records.push({date:todayStr(),club:club.name,carry:carry,speed:clubSpeed,ballSpeed:ballSpeed,grade:grade});
if(records.length>50)records=records.slice(-50);
lsSet('speed_records',records);
playSfx('speed_calc');showToast(club.name+' 스윙스피드: '+clubSpeed+'mph ('+grade+'등급)');
setTimeout(function(){renderSpeedCanvas(records,clubs)},120);
};

function renderSpeedCanvas(records,clubs){
var cv=document.getElementById('v14-speed-canvas');if(!cv)return;
var ctx=cv.getContext('2d');var W=cv.width,H=cv.height;
ctx.clearRect(0,0,W,H);
ctx.fillStyle='rgba(10,16,26,0.95)';ctx.beginPath();ctx.roundRect(0,0,W,H,12);ctx.fill();
ctx.fillStyle='#00FF88';ctx.font='bold 14px sans-serif';ctx.textAlign='center';
ctx.fillText('클럽별 스윙 스피드 추이',W/2,24);

if(records.length===0){
  ctx.fillStyle='#666';ctx.font='13px sans-serif';ctx.fillText('스윙 스피드를 측정하면 차트가 표시됩니다',W/2,H/2);return;
}

var padL=50,padR=20,padT=40,padB=50;
var chartW=W-padL-padR,chartH=H-padT-padB;
var recent=records.slice(-10);
var maxSpeed=0;
for(var i=0;i<recent.length;i++){if(recent[i].speed>maxSpeed)maxSpeed=recent[i].speed}
maxSpeed=Math.max(maxSpeed,120);

for(var y=0;y<=4;y++){
  var val=Math.round(maxSpeed*y/4);
  var yy=padT+chartH-chartH*y/4;
  ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.beginPath();ctx.moveTo(padL,yy);ctx.lineTo(W-padR,yy);ctx.stroke();
  ctx.fillStyle='#666';ctx.font='10px sans-serif';ctx.textAlign='right';
  ctx.fillText(val+'mph',padL-6,yy+3);
}

var barW=Math.min(36,chartW/recent.length-6);
for(var b=0;b<recent.length;b++){
  var x=padL+(b+0.5)*chartW/recent.length-barW/2;
  var h=recent[b].speed/maxSpeed*chartH;
  var grColor=recent[b].grade==='S'?'rgba(255,215,0,0.7)':recent[b].grade==='A'?'rgba(0,255,136,0.7)':recent[b].grade==='B'?'rgba(0,180,216,0.7)':recent[b].grade==='C'?'rgba(255,184,0,0.7)':'rgba(255,107,107,0.7)';
  ctx.fillStyle=grColor;ctx.beginPath();ctx.roundRect(x,padT+chartH-h,barW,h,[4,4,0,0]);ctx.fill();

  ctx.fillStyle='#fff';ctx.font='bold 9px sans-serif';ctx.textAlign='center';
  ctx.fillText(recent[b].speed+'',x+barW/2,padT+chartH-h-6);
  ctx.fillStyle='#888';ctx.font='8px sans-serif';
  ctx.fillText(recent[b].club,x+barW/2,padT+chartH+12);
  ctx.fillText(recent[b].date.slice(5),x+barW/2,padT+chartH+24);
}
}

// ===== 4. PUTTING STROKE PATH ANALYZER =====
function showPuttPath(){
var pn=getPanel('puttpath');
var sessions=lsGet('putt_path_sessions',[]);
var html='<div class="v14-title">&#x1F3AF; 퍼팅 스트로크 패스 분석기</div>';

html+='<div class="v14-card"><h3>스트로크 패스 기록</h3>';
html+='<p style="color:#aaa;font-size:.82em;margin-bottom:10px">퍼팅 스트로크의 경로(인-투-인, 스퀘어, 아웃-투-인)와 임팩트 방향을 분석합니다.</p>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';
html+='<div><label class="v14-label">스트로크 패스</label><select id="v14-pp-path" class="v14-input">';
html+='<option value="iti">인-투-인 (In-to-In)</option>';
html+='<option value="square">스퀘어 (Square)</option>';
html+='<option value="oti">아웃-투-인 (Out-to-In)</option>';
html+='<option value="ito">인-투-아웃 (In-to-Out)</option>';
html+='</select></div>';
html+='<div><label class="v14-label">페이스 앵글</label><select id="v14-pp-face" class="v14-input">';
html+='<option value="square">스퀘어</option><option value="open">오픈</option><option value="closed">클로즈드</option></select></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:8px">';
html+='<div><label class="v14-label">거리 (ft)</label><input id="v14-pp-dist" class="v14-input" type="number" min="1" max="100" value="10" style="text-align:center"></div>';
html+='<div><label class="v14-label">결과</label><select id="v14-pp-result" class="v14-input">';
html+='<option value="make">성공</option><option value="short">짧음</option><option value="long">길음</option><option value="left">왼쪽</option><option value="right">오른쪽</option></select></div>';
html+='<div><label class="v14-label">경사</label><select id="v14-pp-slope" class="v14-input">';
html+='<option value="flat">평지</option><option value="uphill">오르막</option><option value="downhill">내리막</option><option value="sidehill_l">왼쪽경사</option><option value="sidehill_r">오른쪽경사</option></select></div>';
html+='</div>';
html+='<button class="v14-btn v14-btn-primary" style="width:100%;margin-top:10px" onclick="window._v14RecordPuttPath()">기록 저장</button></div>';

html+='<canvas id="v14-puttpath-canvas" width="560" height="380" style="width:100%;max-width:560px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

if(sessions.length>0){
  var pathCounts={iti:0,square:0,oti:0,ito:0};
  var faceCounts={square:0,open:0,closed:0};
  var makeRate=0;
  for(var i=0;i<sessions.length;i++){
    pathCounts[sessions[i].path]=(pathCounts[sessions[i].path]||0)+1;
    faceCounts[sessions[i].face]=(faceCounts[sessions[i].face]||0)+1;
    if(sessions[i].result==='make')makeRate++;
  }
  makeRate=sessions.length>0?Math.round(makeRate/sessions.length*100):0;

  html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">';
  html+='<div class="v14-stat-card"><div class="v14-stat-val" style="color:#00FF88">'+makeRate+'%</div><div class="v14-stat-label">성공률</div></div>';
  var dominantPath='square';var maxP=0;
  for(var pk in pathCounts){if(pathCounts[pk]>maxP){maxP=pathCounts[pk];dominantPath=pk}}
  var pathNames={iti:'인-투-인',square:'스퀘어',oti:'아웃-투-인',ito:'인-투-아웃'};
  html+='<div class="v14-stat-card"><div class="v14-stat-val" style="color:#00B4D8;font-size:.85em">'+pathNames[dominantPath]+'</div><div class="v14-stat-label">주요 패스</div></div>';
  html+='<div class="v14-stat-card"><div class="v14-stat-val" style="color:#FFB800">'+sessions.length+'</div><div class="v14-stat-label">총 기록</div></div>';
  var avgDist=0;for(var d=0;d<sessions.length;d++)avgDist+=sessions[d].dist;avgDist=sessions.length>0?Math.round(avgDist/sessions.length):0;
  html+='<div class="v14-stat-card"><div class="v14-stat-val" style="color:#fff">'+avgDist+'ft</div><div class="v14-stat-label">평균 거리</div></div>';
  html+='</div>';
}

pn.innerHTML='<button class="v14-close" onclick="window._v14Close(\'puttpath\')">&times;</button>'+html;
openPanel('puttpath');playSfx('putt_path');
setTimeout(function(){renderPuttPathCanvas(sessions)},120);
v14CheckAch();lsSet('ach_puttpath_viewed',true);
}

window._v14RecordPuttPath=function(){
var path=document.getElementById('v14-pp-path').value;
var face=document.getElementById('v14-pp-face').value;
var dist=parseInt(document.getElementById('v14-pp-dist').value)||10;
var result=document.getElementById('v14-pp-result').value;
var slope=document.getElementById('v14-pp-slope').value;
var sessions=lsGet('putt_path_sessions',[]);
sessions.push({path:path,face:face,dist:dist,result:result,slope:slope,date:todayStr()});
if(sessions.length>100)sessions=sessions.slice(-100);
lsSet('putt_path_sessions',sessions);
playSfx('putt_path');showToast('퍼팅 기록 저장!');
showPuttPath();
};

function renderPuttPathCanvas(sessions){
var cv=document.getElementById('v14-puttpath-canvas');if(!cv)return;
var ctx=cv.getContext('2d');var W=cv.width,H=cv.height;
ctx.clearRect(0,0,W,H);
ctx.fillStyle='rgba(10,16,26,0.95)';ctx.beginPath();ctx.roundRect(0,0,W,H,12);ctx.fill();
ctx.fillStyle='#00FF88';ctx.font='bold 14px sans-serif';ctx.textAlign='center';
ctx.fillText('퍼팅 스트로크 패스 분석',W/2,24);

if(sessions.length===0){
  ctx.fillStyle='#666';ctx.font='13px sans-serif';ctx.fillText('퍼팅을 기록하면 분석이 표시됩니다',W/2,H/2);return;
}

var cx=W/2,cy=H/2+10;
ctx.strokeStyle='rgba(0,255,136,0.15)';ctx.lineWidth=1;
ctx.beginPath();ctx.arc(cx,cy,100,0,Math.PI*2);ctx.stroke();
ctx.beginPath();ctx.arc(cx,cy,60,0,Math.PI*2);ctx.stroke();
ctx.beginPath();ctx.arc(cx,cy,30,0,Math.PI*2);ctx.stroke();

ctx.strokeStyle='rgba(255,255,255,0.1)';
ctx.beginPath();ctx.moveTo(cx,cy-120);ctx.lineTo(cx,cy+120);ctx.stroke();
ctx.beginPath();ctx.moveTo(cx-120,cy);ctx.lineTo(cx+120,cy);ctx.stroke();

var resultColors={make:'#00FF88',short:'#FFB800',long:'#ff6b6b',left:'#00B4D8',right:'#E879F9'};
var recent=sessions.slice(-30);
for(var i=0;i<recent.length;i++){
  var s=recent[i];
  var dx=0,dy=0;
  if(s.result==='make'){dx=(Math.random()-0.5)*12;dy=(Math.random()-0.5)*12}
  else if(s.result==='short'){dy=20+Math.random()*40;dx=(Math.random()-0.5)*30}
  else if(s.result==='long'){dy=-(20+Math.random()*40);dx=(Math.random()-0.5)*30}
  else if(s.result==='left'){dx=-(20+Math.random()*50);dy=(Math.random()-0.5)*30}
  else if(s.result==='right'){dx=20+Math.random()*50;dy=(Math.random()-0.5)*30}
  ctx.beginPath();ctx.arc(cx+dx,cy+dy,4,0,Math.PI*2);
  ctx.fillStyle=resultColors[s.result]||'#888';ctx.globalAlpha=0.7;ctx.fill();ctx.globalAlpha=1;
}

ctx.beginPath();ctx.arc(cx,cy,5,0,Math.PI*2);ctx.fillStyle='#FFD700';ctx.fill();
ctx.strokeStyle='#FFD700';ctx.lineWidth=1;ctx.stroke();
ctx.fillStyle='#FFD700';ctx.font='bold 10px sans-serif';ctx.textAlign='center';
ctx.fillText('CUP',cx,cy-10);

var legend=[{label:'성공',color:'#00FF88'},{label:'짧음',color:'#FFB800'},{label:'길음',color:'#ff6b6b'},{label:'왼쪽',color:'#00B4D8'},{label:'오른쪽',color:'#E879F9'}];
var lx=20,ly=H-40;
ctx.font='10px sans-serif';
for(var le=0;le<legend.length;le++){
  ctx.beginPath();ctx.arc(lx+le*90+8,ly,5,0,Math.PI*2);ctx.fillStyle=legend[le].color;ctx.fill();
  ctx.fillStyle='#aaa';ctx.textAlign='left';ctx.fillText(legend[le].label,lx+le*90+18,ly+3);
}
}

// ===== 5. WEATHER PERFORMANCE ANALYZER =====
function showWeatherPerf(){
var pn=getPanel('weather');
var records=lsGet('weather_records',[]);
var html='<div class="v14-title">&#x26C5; 날씨별 퍼포먼스 분석기</div>';

html+='<div class="v14-card"><h3>라운드 날씨 기록</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">';
html+='<div><label class="v14-label">날씨</label><select id="v14-wt-weather" class="v14-input">';
var weathers=['맑음','흐림','비','바람','안개','한파','폭염','가을바람'];
for(var w=0;w<weathers.length;w++){html+='<option value="'+weathers[w]+'">'+weathers[w]+'</option>'}
html+='</select></div>';
html+='<div><label class="v14-label">기온 (&deg;C)</label><input id="v14-wt-temp" class="v14-input" type="number" min="-10" max="45" value="25" style="text-align:center"></div>';
html+='<div><label class="v14-label">풍속 (m/s)</label><input id="v14-wt-wind" class="v14-input" type="number" min="0" max="20" value="3" style="text-align:center"></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:8px">';
html+='<div><label class="v14-label">스코어</label><input id="v14-wt-score" class="v14-input" type="number" min="60" max="130" value="85" style="text-align:center"></div>';
html+='<div><label class="v14-label">퍼팅 수</label><input id="v14-wt-putts" class="v14-input" type="number" min="18" max="60" value="32" style="text-align:center"></div>';
html+='<div><label class="v14-label">GIR</label><input id="v14-wt-gir" class="v14-input" type="number" min="0" max="18" value="8" style="text-align:center"></div>';
html+='</div>';
html+='<button class="v14-btn v14-btn-primary" style="width:100%;margin-top:10px" onclick="window._v14RecordWeather()">날씨 라운드 기록</button></div>';

html+='<canvas id="v14-weather-canvas" width="600" height="360" style="width:100%;max-width:600px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

if(records.length>0){
  var weatherGroups={};
  for(var i=0;i<records.length;i++){
    var wg=records[i].weather;
    if(!weatherGroups[wg])weatherGroups[wg]={count:0,totalScore:0,totalPutts:0,totalGir:0};
    weatherGroups[wg].count++;
    weatherGroups[wg].totalScore+=records[i].score;
    weatherGroups[wg].totalPutts+=records[i].putts;
    weatherGroups[wg].totalGir+=records[i].gir;
  }
  html+='<div class="v14-card"><h3>날씨별 평균 성적</h3>';
  html+='<table class="v14-table"><tr><th>날씨</th><th>라운드</th><th>평균스코어</th><th>평균퍼팅</th><th>평균GIR</th></tr>';
  for(var wk in weatherGroups){
    var wgg=weatherGroups[wk];
    var avgS=(wgg.totalScore/wgg.count).toFixed(1);
    var avgP=(wgg.totalPutts/wgg.count).toFixed(1);
    var avgG=(wgg.totalGir/wgg.count).toFixed(1);
    var sc=avgS<=80?'#00FF88':avgS<=90?'#00B4D8':avgS<=100?'#FFB800':'#ff6b6b';
    html+='<tr><td>'+wk+'</td><td>'+wgg.count+'회</td><td style="color:'+sc+';font-weight:700">'+avgS+'</td><td>'+avgP+'</td><td>'+avgG+'</td></tr>';
  }
  html+='</table></div>';
}

html+='<div class="v14-card"><h3>&#x1F4CB; 전체 이력 ('+records.length+'회)</h3>';
if(records.length>0){
  var recent=records.slice(-5).reverse();
  html+='<table class="v14-table"><tr><th>날짜</th><th>날씨</th><th>기온</th><th>풍속</th><th>스코어</th></tr>';
  for(var rr=0;rr<recent.length;rr++){
    var rec=recent[rr];var scColor=rec.score<=80?'#00FF88':rec.score<=90?'#00B4D8':'#FFB800';
    html+='<tr><td>'+rec.date+'</td><td>'+rec.weather+'</td><td>'+rec.temp+'&deg;C</td><td>'+rec.wind+'m/s</td><td style="color:'+scColor+';font-weight:700">'+rec.score+'</td></tr>';
  }
  html+='</table>';
} else{html+='<p style="color:#888;font-size:.85em">아직 기록이 없습니다.</p>'}
html+='</div>';

pn.innerHTML='<button class="v14-close" onclick="window._v14Close(\'weather\')">&times;</button>'+html;
openPanel('weather');playSfx('weather_view');
setTimeout(function(){renderWeatherCanvas(records)},120);
v14CheckAch();lsSet('ach_weather_viewed',true);
}

window._v14RecordWeather=function(){
var weather=document.getElementById('v14-wt-weather').value;
var temp=parseInt(document.getElementById('v14-wt-temp').value)||25;
var wind=parseInt(document.getElementById('v14-wt-wind').value)||3;
var score=parseInt(document.getElementById('v14-wt-score').value)||85;
var putts=parseInt(document.getElementById('v14-wt-putts').value)||32;
var gir=parseInt(document.getElementById('v14-wt-gir').value)||8;
var records=lsGet('weather_records',[]);
records.push({weather:weather,temp:temp,wind:wind,score:score,putts:putts,gir:gir,date:todayStr()});
if(records.length>50)records=records.slice(-50);
lsSet('weather_records',records);
playSfx('weather_view');showToast(weather+' 라운드 기록! ('+score+'타)');
showWeatherPerf();
};

function renderWeatherCanvas(records){
var cv=document.getElementById('v14-weather-canvas');if(!cv)return;
var ctx=cv.getContext('2d');var W=cv.width,H=cv.height;
ctx.clearRect(0,0,W,H);
ctx.fillStyle='rgba(10,16,26,0.95)';ctx.beginPath();ctx.roundRect(0,0,W,H,12);ctx.fill();
ctx.fillStyle='#00FF88';ctx.font='bold 14px sans-serif';ctx.textAlign='center';
ctx.fillText('날씨별 스코어 분포',W/2,24);

if(records.length===0){
  ctx.fillStyle='#666';ctx.font='13px sans-serif';ctx.fillText('날씨별 라운드를 기록하면 분석이 표시됩니다',W/2,H/2);return;
}

var weatherGroups={};var allWeathers=[];
for(var i=0;i<records.length;i++){
  var wg=records[i].weather;
  if(!weatherGroups[wg]){weatherGroups[wg]={scores:[],count:0};allWeathers.push(wg)}
  weatherGroups[wg].scores.push(records[i].score);
  weatherGroups[wg].count++;
}

var padL=50,padR=20,padT=50,padB=50;
var chartW=W-padL-padR,chartH=H-padT-padB;
var nWeathers=allWeathers.length;
var maxScore=120,minScore=65;

for(var y=0;y<=4;y++){
  var val=minScore+Math.round((maxScore-minScore)*y/4);
  var yy=padT+chartH-chartH*y/4;
  ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.beginPath();ctx.moveTo(padL,yy);ctx.lineTo(W-padR,yy);ctx.stroke();
  ctx.fillStyle='#666';ctx.font='10px sans-serif';ctx.textAlign='right';
  ctx.fillText(val+'',padL-6,yy+3);
}

var boxW=Math.min(60,chartW/nWeathers-10);
var weatherIcons={'맑음':'#FFD700','흐림':'#888','비':'#00B4D8','바람':'#4ECDC4','안개':'#9CA3AF','한파':'#60A5FA','폭염':'#EF4444','가을바람':'#F59E0B'};

for(var w=0;w<nWeathers.length||w<allWeathers.length;w++){
  var wName=allWeathers[w];
  var group=weatherGroups[wName];
  var avg=0;for(var s=0;s<group.scores.length;s++)avg+=group.scores[s];
  avg=avg/group.scores.length;
  var min=Math.min.apply(null,group.scores);
  var max=Math.max.apply(null,group.scores);
  var x=padL+(w+0.5)*chartW/nWeathers;

  var avgY=padT+chartH-(avg-minScore)/(maxScore-minScore)*chartH;
  var minY=padT+chartH-(min-minScore)/(maxScore-minScore)*chartH;
  var maxY=padT+chartH-(max-minScore)/(maxScore-minScore)*chartH;

  ctx.strokeStyle=weatherIcons[wName]||'#888';ctx.lineWidth=2;
  ctx.beginPath();ctx.moveTo(x,minY);ctx.lineTo(x,maxY);ctx.stroke();

  ctx.beginPath();ctx.moveTo(x-10,minY);ctx.lineTo(x+10,minY);ctx.stroke();
  ctx.beginPath();ctx.moveTo(x-10,maxY);ctx.lineTo(x+10,maxY);ctx.stroke();

  ctx.beginPath();ctx.arc(x,avgY,6,0,Math.PI*2);
  ctx.fillStyle=weatherIcons[wName]||'#888';ctx.fill();

  ctx.fillStyle='#fff';ctx.font='bold 10px sans-serif';ctx.textAlign='center';
  ctx.fillText(avg.toFixed(1),x,avgY-12);

  ctx.fillStyle='#aaa';ctx.font='10px sans-serif';
  ctx.fillText(wName,x,padT+chartH+16);
  ctx.fillStyle='#666';ctx.font='9px sans-serif';
  ctx.fillText('('+group.count+'회)',x,padT+chartH+30);
}
}

// ===== 6. AI CLUB RECOMMENDATION ENGINE =====
function showClubRecommend(){
var pn=getPanel('clubrec');
var history=lsGet('clubrec_history',[]);
var html='<div class="v14-title">&#x1F916; AI 클럽 추천 엔진</div>';

html+='<div class="v14-card"><h3>상황 입력</h3>';
html+='<p style="color:#aaa;font-size:.82em;margin-bottom:10px">현재 상황을 입력하면 최적의 클럽과 샷 전략을 추천합니다.</p>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">';
html+='<div><label class="v14-label">남은 거리 (yard)</label><input id="v14-rec-dist" class="v14-input" type="number" min="10" max="300" value="150" style="text-align:center"></div>';
html+='<div><label class="v14-label">라이</label><select id="v14-rec-lie" class="v14-input">';
html+='<option value="fairway">페어웨이</option><option value="rough">러프</option><option value="deep_rough">딥러프</option><option value="bunker">벙커</option><option value="tee">티샷</option><option value="uphill">오르막</option><option value="downhill">내리막</option></select></div>';
html+='<div><label class="v14-label">바람</label><select id="v14-rec-wind" class="v14-input">';
html+='<option value="none">없음</option><option value="head_light">맞바람(약)</option><option value="head_strong">맞바람(강)</option><option value="tail_light">뒷바람(약)</option><option value="tail_strong">뒷바람(강)</option><option value="cross">측풍</option></select></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:8px">';
html+='<div><label class="v14-label">핀 위치</label><select id="v14-rec-pin" class="v14-input">';
html+='<option value="center">중앙</option><option value="front">앞</option><option value="back">뒤</option><option value="left">왼쪽</option><option value="right">오른쪽</option></select></div>';
html+='<div><label class="v14-label">위험요소</label><select id="v14-rec-hazard" class="v14-input">';
html+='<option value="none">없음</option><option value="water_front">앞 해저드</option><option value="water_right">오른쪽 해저드</option><option value="bunker_green">그린 벙커</option><option value="ob_left">왼쪽 OB</option></select></div>';
html+='<div><label class="v14-label">고도차</label><select id="v14-rec-elev" class="v14-input">';
html+='<option value="flat">평지</option><option value="up_5">+5m</option><option value="up_10">+10m</option><option value="down_5">-5m</option><option value="down_10">-10m</option></select></div>';
html+='</div>';
html+='<button class="v14-btn v14-btn-primary" style="width:100%;margin-top:10px" onclick="window._v14GetClubRec()">&#x1F3CC;&#xFE0F; 클럽 추천 받기</button>';
html+='<div id="v14-rec-result" style="margin-top:12px"></div></div>';

html+='<div class="v14-card"><h3>&#x1F4CB; 추천 이력 ('+history.length+'회)</h3>';
if(history.length>0){
  var recent=history.slice(-6).reverse();
  for(var r=0;r<recent.length;r++){
    var h=recent[r];
    html+='<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05)">';
    html+='<span style="color:#aaa;font-size:.82em">'+h.dist+'yd / '+h.lie+'</span>';
    html+='<span style="color:#00FF88;font-weight:700;font-size:.85em">'+h.club+'</span>';
    html+='</div>';
  }
} else{html+='<p style="color:#888;font-size:.85em">아직 추천 이력이 없습니다.</p>'}
html+='</div>';

pn.innerHTML='<button class="v14-close" onclick="window._v14Close(\'clubrec\')">&times;</button>'+html;
openPanel('clubrec');playSfx('club_rec');
v14CheckAch();lsSet('ach_clubrec_viewed',true);
}

window._v14GetClubRec=function(){
var dist=parseInt(document.getElementById('v14-rec-dist').value)||150;
var lie=document.getElementById('v14-rec-lie').value;
var wind=document.getElementById('v14-rec-wind').value;
var pin=document.getElementById('v14-rec-pin').value;
var hazard=document.getElementById('v14-rec-hazard').value;
var elev=document.getElementById('v14-rec-elev').value;

var adjustedDist=dist;
if(wind==='head_light')adjustedDist+=5;
if(wind==='head_strong')adjustedDist+=15;
if(wind==='tail_light')adjustedDist-=5;
if(wind==='tail_strong')adjustedDist-=10;
if(lie==='rough')adjustedDist+=5;
if(lie==='deep_rough')adjustedDist+=15;
if(lie==='bunker')adjustedDist+=10;
if(lie==='uphill')adjustedDist+=10;
if(lie==='downhill')adjustedDist-=10;
if(elev==='up_5')adjustedDist+=5;if(elev==='up_10')adjustedDist+=10;
if(elev==='down_5')adjustedDist-=5;if(elev==='down_10')adjustedDist-=10;

var clubChart=[
  {name:'드라이버',min:200,max:280},{name:'3우드',min:180,max:240},
  {name:'5우드',min:170,max:220},{name:'하이브리드',min:160,max:210},
  {name:'4아이언',min:150,max:200},{name:'5아이언',min:140,max:190},
  {name:'6아이언',min:130,max:175},{name:'7아이언',min:120,max:160},
  {name:'8아이언',min:110,max:150},{name:'9아이언',min:100,max:135},
  {name:'PW',min:85,max:125},{name:'GW',min:70,max:110},
  {name:'SW',min:50,max:90},{name:'LW',min:30,max:70}
];

var bestClub=clubChart[clubChart.length-1];
for(var c=0;c<clubChart.length;c++){
  if(adjustedDist>=clubChart[c].min&&adjustedDist<=clubChart[c].max){bestClub=clubChart[c];break}
  if(adjustedDist>clubChart[c].max&&c===0){bestClub=clubChart[0];break}
}

var altClub=null;
for(var a=0;a<clubChart.length;a++){
  if(clubChart[a].name!==bestClub.name&&adjustedDist>=clubChart[a].min-10&&adjustedDist<=clubChart[a].max+10){
    altClub=clubChart[a];break;
  }
}

var shotType='풀샷';
if(lie==='bunker')shotType='벙커샷';
else if(adjustedDist<50)shotType='칩샷';
else if(adjustedDist<80)shotType='피치샷';
else if(hazard!=='none')shotType='안전샷 (위험회피)';

var strategy='그린 중앙을 겨냥하세요';
if(hazard==='water_front')strategy='클럽을 하나 올려서 충분히 넘기세요';
else if(hazard==='water_right')strategy='왼쪽을 겨냥하고 드로우를 치세요';
else if(hazard==='ob_left')strategy='오른쪽을 겨냥하고 페이드를 치세요';
else if(hazard==='bunker_green')strategy='벙커 반대편을 겨냥하세요';
if(pin==='front')strategy+=' (앞핀: 짧게 세팅)';
if(pin==='back')strategy+=' (뒷핀: 길게 세팅)';

var lieNames={fairway:'페어웨이',rough:'러프',deep_rough:'딥러프',bunker:'벙커',tee:'티샷',uphill:'오르막',downhill:'내리막'};
var result='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">';
result+='<div class="v14-stat-card"><div class="v14-stat-val" style="color:#00FF88;font-size:1.1em">'+bestClub.name+'</div><div class="v14-stat-label">추천 클럽</div></div>';
result+='<div class="v14-stat-card"><div class="v14-stat-val" style="color:#00B4D8;font-size:.9em">'+shotType+'</div><div class="v14-stat-label">샷 타입</div></div>';
result+='<div class="v14-stat-card"><div class="v14-stat-val" style="color:#FFB800;font-size:.9em">'+adjustedDist+'yd</div><div class="v14-stat-label">보정 거리</div></div>';
result+='</div>';
if(altClub){result+='<div style="color:#888;font-size:.82em;margin-top:6px">대안: <span style="color:#00B4D8">'+altClub.name+'</span></div>'}
result+='<div style="color:#aaa;font-size:.82em;margin-top:6px;padding:8px;background:rgba(0,255,136,.05);border-radius:8px;border:1px solid rgba(0,255,136,.1)">&#x1F4A1; '+strategy+'</div>';
document.getElementById('v14-rec-result').innerHTML=result;

var history=lsGet('clubrec_history',[]);
history.push({dist:dist,lie:lieNames[lie]||lie,club:bestClub.name,adjusted:adjustedDist,date:todayStr()});
if(history.length>50)history=history.slice(-50);
lsSet('clubrec_history',history);
playSfx('club_rec');showToast('추천: '+bestClub.name+' ('+shotType+')');
};

// ===== 7. GOLF FITNESS PLANNER =====
function showFitnessPlanner(){
var pn=getPanel('fitness');
var progress=lsGet('fitness_progress',{});
var html='<div class="v14-title">&#x1F4AA; 골프 피트니스 플래너</div>';

var weeks=[
  {week:1,name:'기초 유연성',exercises:[
    {name:'어깨 스트레칭',duration:'3x30초',muscle:'회전근개'},
    {name:'고관절 오프너',duration:'3x30초',muscle:'고관절'},
    {name:'척추 회전',duration:'3x15회',muscle:'코어'},
    {name:'햄스트링 스트레칭',duration:'3x30초',muscle:'후면'},
    {name:'손목/팔뚝 스트레칭',duration:'2x20초',muscle:'그립'}
  ]},
  {week:2,name:'코어 안정성',exercises:[
    {name:'플랭크',duration:'3x45초',muscle:'코어 전면'},
    {name:'사이드 플랭크',duration:'3x30초',muscle:'외복사근'},
    {name:'데드버그',duration:'3x12회',muscle:'코어 안정'},
    {name:'버드독',duration:'3x10회',muscle:'밸런스'},
    {name:'글루트 브릿지',duration:'3x15회',muscle:'둔근'}
  ]},
  {week:3,name:'회전력 강화',exercises:[
    {name:'메디신볼 회전던지기',duration:'3x10회',muscle:'회전력'},
    {name:'케이블 우드찹',duration:'3x12회',muscle:'사선코어'},
    {name:'런지+회전',duration:'3x10회',muscle:'하체+코어'},
    {name:'팔라프 프레스',duration:'3x10회',muscle:'안티회전'},
    {name:'밴드 회전',duration:'3x12회',muscle:'회전근'}
  ]},
  {week:4,name:'하체 파워',exercises:[
    {name:'스쿼트',duration:'4x12회',muscle:'대퇴사두'},
    {name:'불가리안 스플릿',duration:'3x10회',muscle:'단측 하체'},
    {name:'힙 힌지',duration:'3x12회',muscle:'후면 체인'},
    {name:'카프 레이즈',duration:'3x20회',muscle:'종아리'},
    {name:'박스 점프',duration:'3x8회',muscle:'폭발력'}
  ]},
  {week:5,name:'밸런스+안정',exercises:[
    {name:'싱글레그 밸런스',duration:'3x30초',muscle:'고유감각'},
    {name:'보수볼 스쿼트',duration:'3x12회',muscle:'안정성'},
    {name:'클로즈아이 밸런스',duration:'3x20초',muscle:'균형감'},
    {name:'스윙 밸런스 드릴',duration:'3x10회',muscle:'피니시'},
    {name:'TRX 로우',duration:'3x12회',muscle:'후면체인'}
  ]},
  {week:6,name:'파워+스피드',exercises:[
    {name:'점프 스쿼트',duration:'4x8회',muscle:'파워'},
    {name:'메디신볼 슬램',duration:'3x10회',muscle:'폭발력'},
    {name:'밴드 스윙 드릴',duration:'3x12회',muscle:'스윙스피드'},
    {name:'플라이오 런지',duration:'3x8회',muscle:'반응속도'},
    {name:'배틀로프',duration:'3x20초',muscle:'전신파워'}
  ]},
  {week:7,name:'지구력+회복',exercises:[
    {name:'인터벌 워킹',duration:'20분',muscle:'심폐지구력'},
    {name:'요가 플로우',duration:'15분',muscle:'유연성회복'},
    {name:'폼롤러 전신',duration:'10분',muscle:'근막이완'},
    {name:'호흡 훈련',duration:'5x4-7-8',muscle:'교감신경'},
    {name:'가벼운 스윙',duration:'50구',muscle:'근감각'}
  ]},
  {week:8,name:'통합+퍼포먼스',exercises:[
    {name:'풀 스윙 서킷',duration:'3라운드',muscle:'전신통합'},
    {name:'에어로빅+스윙',duration:'15분',muscle:'경기체력'},
    {name:'멘탈 비주얼',duration:'10분',muscle:'집중력'},
    {name:'라운드 시뮬',duration:'9홀 워킹',muscle:'실전체력'},
    {name:'회복 루틴',duration:'15분',muscle:'마무리'}
  ]}
];

html+='<canvas id="v14-fitness-canvas" width="600" height="280" style="width:100%;max-width:600px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

for(var w=0;w<weeks.length;w++){
  var wk=weeks[w];
  var completed=0;
  for(var e=0;e<wk.exercises.length;e++){
    if(progress['w'+wk.week+'_e'+e])completed++;
  }
  var pct=Math.round(completed/wk.exercises.length*100);
  var isOpen=w<3;

  html+='<div class="v14-card">';
  html+='<div style="display:flex;justify-content:space-between;align-items:center;cursor:pointer" onclick="this.parentElement.querySelector(\'.v14-fit-detail\').style.display=this.parentElement.querySelector(\'.v14-fit-detail\').style.display===\'none\'?\'block\':\'none\'">';
  html+='<h3 style="margin:0">Week '+wk.week+': '+wk.name+'</h3>';
  html+='<span style="color:'+(pct===100?'#00FF88':pct>0?'#FFB800':'#888')+';font-weight:700;font-size:.85em">'+pct+'%</span>';
  html+='</div>';
  html+='<div style="height:4px;background:rgba(255,255,255,0.06);border-radius:2px;margin-top:6px;overflow:hidden"><div style="height:100%;width:'+pct+'%;background:linear-gradient(90deg,#00FF88,#4ECDC4);border-radius:2px;transition:width .3s"></div></div>';
  html+='<div class="v14-fit-detail" style="display:'+(isOpen?'block':'none')+';margin-top:10px">';
  for(var ex=0;ex<wk.exercises.length;ex++){
    var done=progress['w'+wk.week+'_e'+ex];
    html+='<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.04);font-size:.83em">';
    html+='<div><span style="color:'+(done?'#00FF88':'#fff')+'">'+wk.exercises[ex].name+'</span> <span style="color:#888;font-size:.85em">('+wk.exercises[ex].duration+')</span></div>';
    html+='<div style="display:flex;align-items:center;gap:8px"><span style="color:#555;font-size:.75em">'+wk.exercises[ex].muscle+'</span>';
    html+='<button class="v14-btn" style="padding:4px 10px;font-size:.78em;'+(done?'color:#00FF88;border-color:rgba(0,255,136,.3)':'')+'" onclick="window._v14ToggleFitness('+wk.week+','+ex+')">'+(done?'&#x2713;':'&#x25CB;')+'</button></div>';
    html+='</div>';
  }
  html+='</div></div>';
}

pn.innerHTML='<button class="v14-close" onclick="window._v14Close(\'fitness\')">&times;</button>'+html;
openPanel('fitness');playSfx('fitness_done');
setTimeout(function(){renderFitnessCanvas(weeks,progress)},120);
v14CheckAch();lsSet('ach_fitness_viewed',true);
}

window._v14ToggleFitness=function(week,ex){
var progress=lsGet('fitness_progress',{});
var key='w'+week+'_e'+ex;
progress[key]=!progress[key];
lsSet('fitness_progress',progress);
playSfx(progress[key]?'fitness_done':'checklist_check');
showToast(progress[key]?'운동 완료!':'운동 취소');
showFitnessPlanner();
};

function renderFitnessCanvas(weeks,progress){
var cv=document.getElementById('v14-fitness-canvas');if(!cv)return;
var ctx=cv.getContext('2d');var W=cv.width,H=cv.height;
ctx.clearRect(0,0,W,H);
ctx.fillStyle='rgba(10,16,26,0.95)';ctx.beginPath();ctx.roundRect(0,0,W,H,12);ctx.fill();
ctx.fillStyle='#00FF88';ctx.font='bold 14px sans-serif';ctx.textAlign='center';
ctx.fillText('8주 골프 피트니스 진행률',W/2,24);

var padL=50,padR=20,padT=50,padB=40;
var chartW=W-padL-padR,chartH=H-padT-padB;
var barW=Math.min(50,chartW/8-8);

for(var y=0;y<=4;y++){
  var val=y*25;
  var yy=padT+chartH-chartH*y/4;
  ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.beginPath();ctx.moveTo(padL,yy);ctx.lineTo(W-padR,yy);ctx.stroke();
  ctx.fillStyle='#666';ctx.font='10px sans-serif';ctx.textAlign='right';
  ctx.fillText(val+'%',padL-6,yy+3);
}

for(var w=0;w<weeks.length;w++){
  var wk=weeks[w];var completed=0;
  for(var e=0;e<wk.exercises.length;e++){if(progress['w'+wk.week+'_e'+e])completed++}
  var pct=completed/wk.exercises.length*100;
  var x=padL+(w+0.5)*chartW/8-barW/2;
  var h=pct/100*chartH;
  var color=pct===100?'rgba(0,255,136,0.8)':pct>=60?'rgba(78,205,196,0.7)':pct>0?'rgba(255,184,0,0.7)':'rgba(255,255,255,0.08)';
  ctx.fillStyle=color;ctx.beginPath();ctx.roundRect(x,padT+chartH-h,barW,h||2,[4,4,0,0]);ctx.fill();

  ctx.fillStyle='#fff';ctx.font='bold 10px sans-serif';ctx.textAlign='center';
  if(pct>0)ctx.fillText(Math.round(pct)+'%',x+barW/2,padT+chartH-h-8);
  ctx.fillStyle='#888';ctx.font='9px sans-serif';
  ctx.fillText('W'+wk.week,x+barW/2,padT+chartH+14);
}
}

// ===== 8. ROUND CHECKLIST =====
function showRoundChecklist(){
var pn=getPanel('checklist');
var checks=lsGet('round_checklist',{});
var html='<div class="v14-title">&#x2705; 라운드 체크리스트</div>';

var phases=[
  {phase:'pre',name:'라운드 전',icon:'&#x1F305;',items:[
    '장비 점검 (14클럽 + 볼 + 티 + 마커)',
    '스코어카드 & 코스 가이드 확인',
    '레인지/퍼팅 그린 워밍업 30분',
    '스트레칭 & 유연성 운동 10분',
    '수분 & 에너지바 준비',
    '날씨/바람 체크 & 전략 세팅',
    '멘탈 루틴 (시각화/호흡)',
    'GPS/거리측정기 충전 확인'
  ]},
  {phase:'during',name:'라운드 중',icon:'&#x26F3;',items:[
    '매 홀 프리샷 루틴 수행',
    '클럽 선택 전 거리/바람 확인',
    '3퍼팅 방지 — 장거리 퍼팅 거리감 우선',
    '번호별 체크 (슬로우 플레이 방지)',
    '매 3홀 수분 보충',
    '보기 이상 후 멘탈 리셋',
    '스코어 + 퍼팅수 + GIR 기록',
    '바디 체크 (피로/통증 모니터)'
  ]},
  {phase:'post',name:'라운드 후',icon:'&#x1F4DD;',items:[
    '스코어카드 최종 확인 & 입력',
    '좋았던 샷 3개 기록',
    '개선할 점 3개 기록',
    '장비 청소 & 정리',
    '스트레칭 & 쿨다운',
    '다음 라운드 연습 계획 수립',
    '날씨/컨디션별 성적 기록',
    '피트니스/영양 복기'
  ]}
];

for(var p=0;p<phases.length;p++){
  var ph=phases[p];
  var completed=0;
  for(var i=0;i<ph.items.length;i++){if(checks[ph.phase+'_'+i])completed++}
  var pct=Math.round(completed/ph.items.length*100);

  html+='<div class="v14-card">';
  html+='<div style="display:flex;justify-content:space-between;align-items:center">';
  html+='<h3 style="margin:0">'+ph.icon+' '+ph.name+' ('+completed+'/'+ph.items.length+')</h3>';
  html+='<span style="color:'+(pct===100?'#00FF88':pct>0?'#FFB800':'#888')+';font-weight:700;font-size:.85em">'+pct+'%</span>';
  html+='</div>';
  html+='<div style="height:4px;background:rgba(255,255,255,0.06);border-radius:2px;margin:6px 0;overflow:hidden"><div style="height:100%;width:'+pct+'%;background:linear-gradient(90deg,'+(p===0?'#00FF88,#4ECDC4':p===1?'#00B4D8,#0088CC':'#FFB800,#FF8800')+');border-radius:2px;transition:width .3s"></div></div>';

  for(var it=0;it<ph.items.length;it++){
    var done=checks[ph.phase+'_'+it];
    html+='<div style="display:flex;align-items:center;gap:10px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.04);font-size:.83em;cursor:pointer" onclick="window._v14ToggleCheck(\''+ph.phase+'\','+it+')">';
    html+='<span style="color:'+(done?'#00FF88':'#444')+';font-size:1.1em">'+(done?'&#x2611;':'&#x2610;')+'</span>';
    html+='<span style="color:'+(done?'#888':'#ccc')+';text-decoration:'+(done?'line-through':'none')+'">'+ph.items[it]+'</span>';
    html+='</div>';
  }
  html+='</div>';
}

html+='<button class="v14-btn" style="width:100%;margin-top:8px;color:#FFB800;border-color:rgba(255,184,0,.2)" onclick="window._v14ResetChecklist()">&#x1F504; 체크리스트 초기화</button>';

pn.innerHTML='<button class="v14-close" onclick="window._v14Close(\'checklist\')">&times;</button>'+html;
openPanel('checklist');playSfx('checklist_check');
v14CheckAch();lsSet('ach_checklist_viewed',true);
}

window._v14ToggleCheck=function(phase,idx){
var checks=lsGet('round_checklist',{});
var key=phase+'_'+idx;
checks[key]=!checks[key];
lsSet('round_checklist',checks);
playSfx('checklist_check');
showRoundChecklist();
};

window._v14ResetChecklist=function(){
lsSet('round_checklist',{});
showToast('체크리스트 초기화 완료');
showRoundChecklist();
};

// ===== QUIZ v7 (+15 = 105 total) =====
function showV14Quiz(){
var pn=getPanel('quiz14');
var quizData=[
  {q:'라운드 페이스 관리에서 Par4 홀의 이상적 소요시간은?',a:['13분','10분','15분','20분'],c:0},
  {q:'퍼팅 스트로크에서 &quot;인-투-인&quot; 패스란?',a:['백스윙 안쪽→임팩트 스퀘어→팔로스루 안쪽','직선 백스윙→직선 팔로스루','바깥→안쪽 경로','원형 스트로크'],c:0},
  {q:'스매시 팩터(Smash Factor)란?',a:['볼스피드 / 클럽스피드','클럽스피드 / 볼스피드','비거리 / 스윙스피드','런 / 캐리'],c:0},
  {q:'PGA 투어 평균 드라이버 클럽헤드 스피드는 약?',a:['113mph','95mph','125mph','140mph'],c:0},
  {q:'코스 레이팅에서 &quot;슬로프 레이팅&quot;이 나타내는 것은?',a:['보기 골퍼 vs 스크래치 골퍼 난이도 차이','그린의 경사도','코스 고도차','페어웨이 폭'],c:0},
  {q:'날씨 보정에서 기온이 10도 내려가면 비거리는 약?',a:['2~3% 감소','10% 감소','변화없음','5% 증가'],c:0},
  {q:'골프 피트니스에서 &quot;팔라프 프레스&quot;의 주요 목적은?',a:['안티-회전(코어 안정성)','상체 파워','유연성','심폐 지구력'],c:0},
  {q:'라운드 체크리스트에서 워밍업 권장 시간은?',a:['30분','5분','1시간','15분'],c:0},
  {q:'퍼팅에서 페이스 앵글이 전체 방향의 약 몇%를 결정하는가?',a:['80%','50%','30%','95%'],c:0},
  {q:'AI 클럽 추천에서 &quot;맞바람(강)&quot;일 때 보정 거리는?',a:['+15야드','+5야드','-10야드','변화없음'],c:0},
  {q:'골프 스윙의 X-팩터란?',a:['어깨-골반 회전각 차이','클럽 페이스 각도','스윙 플레인 각도','볼 런치 앵글'],c:0},
  {q:'WHS 핸디캡 계산 시 사용하는 최근 라운드 수는?',a:['최근 20라운드 중 상위 8개','최근 10라운드 전부','최근 5라운드 중 최저','전체 라운드 평균'],c:0},
  {q:'코스 매니지먼트에서 &quot;레이업&quot; 전략이 효과적인 상황은?',a:['해저드가 앞에 있을 때','항상','뒷바람이 불 때','Par3 홀에서'],c:0},
  {q:'골프에서 &quot;GIR (Green In Regulation)&quot;의 정의는?',a:['Par-2타 이내에 그린 온','첫 번째 샷으로 그린 온','퍼팅 없이 홀아웃','보기 이내 마무리'],c:0},
  {q:'스태미나 관리에서 후반 9홀 스코어 상승의 주요 원인은?',a:['피로+탈수+집중력 저하','풍향 변화','코스 난이도','장비 문제'],c:0}
];
var state=lsGet('quiz14_state',{current:0,score:0,answered:[]});

html='<div class="v14-title">&#x1F4DD; 골프 퀴즈 v7 (105문)</div>';

if(state.current<quizData.length){
  var q=quizData[state.current];
  html+='<div class="v14-card"><div style="display:flex;justify-content:space-between;align-items:center"><h3>Q'+(state.current+1)+'/'+quizData.length+'</h3><span style="color:#00FF88;font-weight:700">'+state.score+'점</span></div>';
  html+='<p style="color:#fff;font-size:.92em;margin:10px 0;line-height:1.6">'+q.q+'</p>';
  for(var a=0;a<q.a.length;a++){
    html+='<button class="v14-btn" style="width:100%;margin-bottom:6px;text-align:left;padding:10px 14px" onclick="window._v14AnswerQuiz('+state.current+','+a+')">'+String.fromCharCode(9312+a)+' '+q.a[a]+'</button>';
  }
  html+='</div>';
  html+='<div style="height:6px;background:rgba(255,255,255,0.06);border-radius:3px;margin-top:8px;overflow:hidden"><div style="height:100%;width:'+Math.round(state.current/quizData.length*100)+'%;background:linear-gradient(90deg,#00FF88,#00B4D8);border-radius:3px;transition:width .3s"></div></div>';
} else {
  var pct=Math.round(state.score/quizData.length*100);
  var grade=pct>=90?'S':pct>=80?'A':pct>=70?'B':pct>=60?'C':'D';
  var gradeColor=grade==='S'?'#FFD700':grade==='A'?'#00FF88':grade==='B'?'#00B4D8':grade==='C'?'#FFB800':'#ff6b6b';
  html+='<div class="v14-card" style="text-align:center">';
  html+='<div style="font-size:3em;font-weight:900;color:'+gradeColor+'">'+grade+'</div>';
  html+='<div style="font-size:1.2em;color:#fff;margin:8px 0">'+state.score+' / '+quizData.length+' ('+pct+'%)</div>';
  html+='<button class="v14-btn v14-btn-primary" style="margin-top:12px" onclick="window._v14ResetQuiz()">다시 도전</button>';
  html+='</div>';
}

pn.innerHTML='<button class="v14-close" onclick="window._v14Close(\'quiz14\')">&times;</button>'+html;
openPanel('quiz14');playSfx('v14_quiz');
v14CheckAch();
}

window._v14AnswerQuiz=function(qIdx,aIdx){
var quizData=[
  {c:0},{c:0},{c:0},{c:0},{c:0},{c:0},{c:0},{c:0},{c:0},{c:0},{c:0},{c:0},{c:0},{c:0},{c:0}
];
var state=lsGet('quiz14_state',{current:0,score:0,answered:[]});
if(state.current!==qIdx)return;
var correct=aIdx===quizData[qIdx].c;
if(correct){state.score++;playSfx('quiz_correct14');showToast('&#x2705; 정답!')}
else{playSfx('v14_quiz');showToast('&#x274C; 오답!')}
state.answered.push({q:qIdx,a:aIdx,correct:correct});
state.current++;
lsSet('quiz14_state',state);
if(state.current>=15){lsSet('ach_quiz_v14_done',true)}
setTimeout(showV14Quiz,500);
};

window._v14ResetQuiz=function(){
lsSet('quiz14_state',{current:0,score:0,answered:[]});
showV14Quiz();
};

// ===== ACHIEVEMENTS (+12 = 84 total) =====
var ACHIEVEMENTS_V14=[
  {id:'pace_first',name:'페이스 메이커',desc:'페이스 타이머 첫 사용',icon:'&#x23F1;&#xFE0F;'},
  {id:'pace_18',name:'풀라운드 트래커',desc:'18홀 페이스 완료',icon:'&#x1F3CC;&#xFE0F;'},
  {id:'courserate_first',name:'코스 비평가',desc:'첫 코스 리뷰 작성',icon:'&#x2B50;'},
  {id:'courserate_5',name:'코스 탐험가',desc:'5개 코스 리뷰',icon:'&#x1F30D;'},
  {id:'speed_first',name:'스피드건',desc:'스윙 스피드 첫 측정',icon:'&#x1F4A8;'},
  {id:'speed_s',name:'스피드 몬스터',desc:'S등급 스윙 스피드',icon:'&#x1F525;'},
  {id:'puttpath_first',name:'퍼팅 분석가',desc:'퍼팅 패스 첫 기록',icon:'&#x1F3AF;'},
  {id:'puttpath_20',name:'퍼팅 마스터',desc:'퍼팅 20회 기록',icon:'&#x1F3C6;'},
  {id:'weather_first',name:'날씨 관측자',desc:'첫 날씨별 라운드',icon:'&#x26C5;'},
  {id:'clubrec_first',name:'AI 캐디 사용자',desc:'AI 클럽 추천 첫 사용',icon:'&#x1F916;'},
  {id:'fitness_5',name:'피트니스 입문',desc:'운동 5회 완료',icon:'&#x1F4AA;'},
  {id:'checklist_full',name:'완벽한 준비',desc:'체크리스트 전체 완료',icon:'&#x2705;'}
];

function v14CheckAch(){
var newAch=[];

if(lsGet('ach_pace_viewed',false)&&!lsGet('ach_unlocked_pace_first',false)){lsSet('ach_unlocked_pace_first',true);newAch.push(ACHIEVEMENTS_V14[0])}
var paceSessions=lsGet('pace_sessions',[]);
for(var ps=0;ps<paceSessions.length;ps++){if(paceSessions[ps].holeTimes.length>=18&&!lsGet('ach_unlocked_pace_18',false)){lsSet('ach_unlocked_pace_18',true);newAch.push(ACHIEVEMENTS_V14[1]);break}}

var reviews=lsGet('course_reviews',[]);
if(reviews.length>=1&&!lsGet('ach_unlocked_courserate_first',false)){lsSet('ach_unlocked_courserate_first',true);newAch.push(ACHIEVEMENTS_V14[2])}
if(reviews.length>=5&&!lsGet('ach_unlocked_courserate_5',false)){lsSet('ach_unlocked_courserate_5',true);newAch.push(ACHIEVEMENTS_V14[3])}

var speeds=lsGet('speed_records',[]);
if(speeds.length>=1&&!lsGet('ach_unlocked_speed_first',false)){lsSet('ach_unlocked_speed_first',true);newAch.push(ACHIEVEMENTS_V14[4])}
for(var sp=0;sp<speeds.length;sp++){if(speeds[sp].grade==='S'&&!lsGet('ach_unlocked_speed_s',false)){lsSet('ach_unlocked_speed_s',true);newAch.push(ACHIEVEMENTS_V14[5]);break}}

var putts=lsGet('putt_path_sessions',[]);
if(putts.length>=1&&!lsGet('ach_unlocked_puttpath_first',false)){lsSet('ach_unlocked_puttpath_first',true);newAch.push(ACHIEVEMENTS_V14[6])}
if(putts.length>=20&&!lsGet('ach_unlocked_puttpath_20',false)){lsSet('ach_unlocked_puttpath_20',true);newAch.push(ACHIEVEMENTS_V14[7])}

var weatherRecs=lsGet('weather_records',[]);
if(weatherRecs.length>=1&&!lsGet('ach_unlocked_weather_first',false)){lsSet('ach_unlocked_weather_first',true);newAch.push(ACHIEVEMENTS_V14[8])}

var clubHistory=lsGet('clubrec_history',[]);
if(clubHistory.length>=1&&!lsGet('ach_unlocked_clubrec_first',false)){lsSet('ach_unlocked_clubrec_first',true);newAch.push(ACHIEVEMENTS_V14[9])}

var fitProgress=lsGet('fitness_progress',{});
var fitCount=0;for(var fk in fitProgress){if(fitProgress[fk])fitCount++}
if(fitCount>=5&&!lsGet('ach_unlocked_fitness_5',false)){lsSet('ach_unlocked_fitness_5',true);newAch.push(ACHIEVEMENTS_V14[10])}

var checks=lsGet('round_checklist',{});
var checkCount=0;for(var ck in checks){if(checks[ck])checkCount++}
if(checkCount>=24&&!lsGet('ach_unlocked_checklist_full',false)){lsSet('ach_unlocked_checklist_full',true);newAch.push(ACHIEVEMENTS_V14[11])}

for(var na=0;na<newAch.length;na++){
  showAchPopup(newAch[na]);
}
}

function showAchPopup(ach){
var el=document.createElement('div');
el.className='v14-ach-popup';
el.innerHTML='<div style="font-size:2em">'+ach.icon+'</div><div><div style="color:#FFD700;font-weight:800;font-size:.9em">&#x1F3C6; '+ach.name+'</div><div style="color:#aaa;font-size:.75em">'+ach.desc+'</div></div>';
document.body.appendChild(el);
playSfx('v14_achieve');
setTimeout(function(){el.classList.add('show')},100);
setTimeout(function(){el.classList.remove('show');setTimeout(function(){el.remove()},500)},4000);
}

// ===== QUICK ACTIONS & KEYBOARD =====
function injectV14QuickActions(){
var nav=document.querySelector('.v13-scroll-nav');
if(!nav){
  nav=document.createElement('div');
  nav.className='v14-scroll-nav';
  document.body.appendChild(nav);
}

var actions=[
  {icon:'&#x23F1;&#xFE0F;',label:'페이스',fn:'showPaceTimer'},
  {icon:'&#x2B50;',label:'코스평가',fn:'showCourseRating'},
  {icon:'&#x1F4A8;',label:'스윙스피드',fn:'showSwingSpeed'},
  {icon:'&#x1F3AF;',label:'퍼팅패스',fn:'showPuttPath'},
  {icon:'&#x26C5;',label:'날씨분석',fn:'showWeatherPerf'},
  {icon:'&#x1F916;',label:'AI클럽',fn:'showClubRecommend'},
  {icon:'&#x1F4AA;',label:'피트니스',fn:'showFitnessPlanner'},
  {icon:'&#x2705;',label:'체크리스트',fn:'showRoundChecklist'}
];

for(var i=0;i<actions.length;i++){
  var btn=document.createElement('button');
  btn.className='v14-nav-btn';
  btn.innerHTML='<span class="v14-nav-icon">'+actions[i].icon+'</span><span class="v14-nav-label">'+actions[i].label+'</span>';
  (function(fn){btn.addEventListener('click',function(){window['_v14_'+fn]()})})(actions[i].fn);
  nav.appendChild(btn);
}
}

window._v14_showPaceTimer=showPaceTimer;
window._v14_showCourseRating=showCourseRating;
window._v14_showSwingSpeed=showSwingSpeed;
window._v14_showPuttPath=showPuttPath;
window._v14_showWeatherPerf=showWeatherPerf;
window._v14_showClubRecommend=showClubRecommend;
window._v14_showFitnessPlanner=showFitnessPlanner;
window._v14_showRoundChecklist=showRoundChecklist;
window._v14_showV14Quiz=showV14Quiz;
window._v14Close=function(id){closePanel(id)};

function setupV14Keyboard(){
document.addEventListener('keydown',function(e){
  if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'||e.target.tagName==='SELECT')return;
  if(e.ctrlKey||e.metaKey||e.altKey)return;
  if(!e.shiftKey)return;
  switch(e.key){
    case'P':e.preventDefault();showPaceTimer();break;
    case'R':e.preventDefault();showCourseRating();break;
    case'S':e.preventDefault();showSwingSpeed();break;
    case'T':e.preventDefault();showPuttPath();break;
    case'W':e.preventDefault();showWeatherPerf();break;
    case'C':e.preventDefault();showClubRecommend();break;
    case'G':e.preventDefault();showFitnessPlanner();break;
    case'L':e.preventDefault();showRoundChecklist();break;
  }
});
}

// ===== CSS =====
function injectV14CSS(){
var s=document.createElement('style');
s.textContent='.v14-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.88);z-index:10007;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;pointer-events:none}.v14-overlay.active{opacity:1;pointer-events:auto}.v14-panel{background:linear-gradient(145deg,rgba(10,16,26,.98),rgba(5,8,16,.98));border:1px solid rgba(0,255,136,.15);border-radius:18px;padding:24px;max-width:680px;width:94%;max-height:85vh;overflow-y:auto;box-shadow:0 24px 80px rgba(0,0,0,.7),0 0 40px rgba(0,255,136,.06);position:relative}.v14-panel::-webkit-scrollbar{width:5px}.v14-panel::-webkit-scrollbar-thumb{background:rgba(0,255,136,.2);border-radius:3px}.v14-title{font-size:1.4em;font-weight:800;color:#00FF88;margin-bottom:18px;letter-spacing:-0.5px}.v14-close{position:absolute;top:12px;right:16px;background:none;border:none;color:#666;font-size:1.6em;cursor:pointer;padding:4px 8px;border-radius:8px;transition:all .2s;z-index:1}.v14-close:hover{color:#ff6b6b;background:rgba(255,107,107,.1)}.v14-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:16px;margin-bottom:12px;transition:all .2s}.v14-card:hover{border-color:rgba(0,255,136,.15);background:rgba(255,255,255,.05)}.v14-card h3{color:#00FF88;font-size:.95em;margin:0 0 8px}.v14-card p{color:#aaa;font-size:.85em;margin:0;line-height:1.6}.v14-btn{padding:8px 16px;border:1px solid rgba(0,255,136,.2);background:rgba(0,255,136,.06);color:#00FF88;border-radius:8px;cursor:pointer;font-size:.85em;transition:all .2s}.v14-btn:hover{background:rgba(0,255,136,.15);border-color:#00FF88}.v14-btn.active{background:rgba(0,255,136,.15);border-color:rgba(0,255,136,.4);color:#00FF88}.v14-btn-primary{background:rgba(0,255,136,.12);border-color:rgba(0,255,136,.3);color:#00FF88}.v14-btn-primary:hover{background:rgba(0,255,136,.22)}.v14-btn:disabled{opacity:.5;cursor:default}.v14-input{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:8px 12px;color:#fff;font-size:.85em;width:100%;box-sizing:border-box}.v14-input:focus{outline:none;border-color:rgba(0,255,136,.4)}.v14-label{display:block;font-size:.72em;color:#888;margin-bottom:3px}.v14-table{width:100%;border-collapse:collapse;font-size:.82em}.v14-table th{text-align:left;padding:8px;color:#00FF88;border-bottom:1px solid rgba(255,255,255,.08);font-weight:600}.v14-table td{padding:8px;color:#ccc;border-bottom:1px solid rgba(255,255,255,.03)}.v14-stat-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:10px 6px;text-align:center}.v14-stat-val{font-size:1.3em;font-weight:800}.v14-stat-label{font-size:.65em;color:#888;margin-top:2px}.v14-scroll-nav{position:fixed;bottom:0;left:0;right:0;z-index:999;display:flex;overflow-x:auto;gap:2px;padding:6px 8px;background:linear-gradient(to top,rgba(5,8,16,.97),rgba(5,8,16,.82));border-top:1px solid rgba(0,255,136,.1);-webkit-overflow-scrolling:touch;scrollbar-width:none}.v14-scroll-nav::-webkit-scrollbar{display:none}.v14-nav-btn{display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px 10px;border:1px solid rgba(0,255,136,.1);background:rgba(0,255,136,.04);color:#00FF88;border-radius:10px;cursor:pointer;flex-shrink:0;transition:all .2s;font-size:1em;min-width:60px}.v14-nav-btn:hover{background:rgba(0,255,136,.12);transform:scale(1.05)}.v14-nav-icon{font-size:1.2em}.v14-nav-label{font-size:.55em;color:#888;white-space:nowrap}.v14-toast{position:fixed;top:20px;left:50%;transform:translateX(-50%) translateY(-100px);background:rgba(0,255,136,.1);border:1px solid rgba(0,255,136,.2);color:#00FF88;padding:10px 20px;border-radius:10px;z-index:99999;transition:transform .4s;font-size:.9em;backdrop-filter:blur(12px);white-space:nowrap}.v14-toast.show{transform:translateX(-50%) translateY(0)}.v14-ach-popup{position:fixed;top:60px;left:50%;transform:translateX(-50%) translateY(-150px);z-index:100000;background:linear-gradient(135deg,rgba(10,16,26,.96),rgba(20,28,38,.96));border:1px solid rgba(0,255,136,.25);border-radius:16px;padding:14px 22px;display:flex;align-items:center;gap:14px;backdrop-filter:blur(20px);transition:transform .5s cubic-bezier(.34,1.56,.64,1);box-shadow:0 8px 32px rgba(0,0,0,.5),0 0 24px rgba(0,255,136,.08)}.v14-ach-popup.show{transform:translateX(-50%) translateY(0)}@media(max-width:480px){.v14-panel{padding:16px;max-height:92vh;width:96%}.v14-scroll-nav{padding:4px 4px;gap:1px}.v14-nav-btn{min-width:52px;padding:5px 7px}.v14-nav-icon{font-size:1em}.v14-nav-label{font-size:.5em}}';
document.head.appendChild(s);
}

// ===== INIT =====
function initV14(){
injectV14CSS();
injectV14QuickActions();
setupV14Keyboard();
setTimeout(v14CheckAch,5000);
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',initV14)}
else{setTimeout(initV14,2500)}

})();
