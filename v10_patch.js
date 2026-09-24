(function(){
'use strict';
var LS='gt_v10_';
var audioCtx=null;
function getAC(){if(!audioCtx)try{audioCtx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}return audioCtx}
function playSfx(type){var ac=getAC();if(!ac)return;var o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);var t=ac.currentTime;g.gain.setValueAtTime(0.1,t);switch(type){case'range_start':o.type='sine';o.frequency.setValueAtTime(392,t);o.frequency.linearRampToValueAtTime(523,t+0.08);o.frequency.linearRampToValueAtTime(659,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'range_shot':o.type='triangle';o.frequency.setValueAtTime(220,t);o.frequency.linearRampToValueAtTime(330,t+0.05);g.gain.setValueAtTime(0.08,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.12);o.start(t);o.stop(t+0.12);break;case'stats_view':o.type='sine';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(554,t+0.08);o.frequency.linearRampToValueAtTime(659,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'handicap_calc':o.type='triangle';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(784,t+0.12);g.gain.exponentialRampToValueAtTime(0.01,t+0.25);o.start(t);o.stop(t+0.25);break;case'shot_shape':o.type='sine';o.frequency.setValueAtTime(349,t);o.frequency.linearRampToValueAtTime(440,t+0.06);o.frequency.linearRampToValueAtTime(523,t+0.12);g.gain.exponentialRampToValueAtTime(0.01,t+0.25);o.start(t);o.stop(t+0.25);break;case'warmup_step':o.type='sine';o.frequency.setValueAtTime(494,t);o.frequency.linearRampToValueAtTime(659,t+0.1);g.gain.exponentialRampToValueAtTime(0.01,t+0.22);o.start(t);o.stop(t+0.22);break;case'warmup_done':o.type='sine';o.frequency.setValueAtTime(523,t);o.frequency.setValueAtTime(659,t+0.1);o.frequency.setValueAtTime(784,t+0.2);o.frequency.setValueAtTime(1047,t+0.3);g.gain.exponentialRampToValueAtTime(0.01,t+0.5);o.start(t);o.stop(t+0.5);break;case'scramble_save':o.type='sine';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(587,t+0.1);g.gain.exponentialRampToValueAtTime(0.01,t+0.2);o.start(t);o.stop(t+0.2);break;case'nutrition_tip':o.type='triangle';o.frequency.setValueAtTime(392,t);o.frequency.linearRampToValueAtTime(494,t+0.08);g.gain.setValueAtTime(0.06,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.18);o.start(t);o.stop(t+0.18);break;case'v10_achieve':o.type='sine';o.frequency.setValueAtTime(784,t);o.frequency.setValueAtTime(988,t+0.1);o.frequency.setValueAtTime(1175,t+0.2);o.frequency.setValueAtTime(1568,t+0.3);g.gain.exponentialRampToValueAtTime(0.01,t+0.5);o.start(t);o.stop(t+0.5);break;case'v10_quiz':o.type='sine';o.frequency.setValueAtTime(523,t);o.frequency.setValueAtTime(659,t+0.1);o.frequency.setValueAtTime(784,t+0.2);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;default:o.type='sine';o.frequency.setValueAtTime(440,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.15);o.start(t);o.stop(t+0.15)}}

function lsGet(k,d){try{var v=localStorage.getItem(LS+k);return v?JSON.parse(v):d}catch(e){return d}}
function lsSet(k,v){try{localStorage.setItem(LS+k,JSON.stringify(v))}catch(e){}}
function todayStr(){return new Date().toISOString().slice(0,10)}
function showToast(msg){var t=document.createElement('div');t.className='v10-toast';t.textContent=msg;document.body.appendChild(t);setTimeout(function(){t.classList.add('show')},50);setTimeout(function(){t.classList.remove('show');setTimeout(function(){t.remove()},400)},3000)}
function createOverlay(id){var ov=document.createElement('div');ov.className='v10-overlay';ov.id='v10-'+id;ov.addEventListener('click',function(e){if(e.target===ov)closePanel(id)});var pn=document.createElement('div');pn.className='v10-panel';pn.style.position='relative';ov.appendChild(pn);return pn}
function openPanel(id){var el=document.getElementById('v10-'+id);if(el)el.classList.add('active')}
function closePanel(id){var el=document.getElementById('v10-'+id);if(el)el.classList.remove('active')}
function getPanel(id){var ov=document.getElementById('v10-'+id);if(!ov){var pn=createOverlay(id);pn.id='v10-'+id+'-panel';document.body.appendChild(pn.parentElement);return pn}return ov.querySelector('.v10-panel')||ov}

// ===== 1. DRIVING RANGE TRACKER =====
var RANGE_CLUBS=['Driver','3W','5W','4H','5I','6I','7I','8I','9I','PW','GW','SW','LW'];

function showRange(){
var pn=getPanel('range');
var sessions=lsGet('range_sessions',[]);
var active=lsGet('range_active',null);
var html='<div class="v10-title">🎯 드라이빙 레인지 트래커</div>';

if(active){
  var elapsed=Math.floor((Date.now()-active.startTime)/60000);
  var totalShots=0;for(var k in active.shots)totalShots+=active.shots[k];
  html+='<div class="v10-card" style="border-left:3px solid #00FF88">';
  html+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">';
  html+='<div><div style="font-weight:700;color:#00FF88">연습 중</div>';
  html+='<div style="font-size:.75em;color:#888">'+elapsed+'분 경과</div></div>';
  html+='<div style="text-align:right"><div style="font-size:2em;font-weight:800;color:#00B4D8">'+totalShots+'</div>';
  html+='<div style="font-size:.75em;color:#888">총 샷</div></div></div>';

  html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:12px">';
  if(active.target)html+='<div class="v10-mini-stat"><div class="v10-mini-val">'+active.target+'</div><div class="v10-mini-label">목표</div></div>';
  html+='<div class="v10-mini-stat"><div class="v10-mini-val">'+Object.keys(active.shots).filter(function(k2){return active.shots[k2]>0}).length+'</div><div class="v10-mini-label">클럽 종류</div></div>';
  html+='<div class="v10-mini-stat"><div class="v10-mini-val">'+elapsed+'m</div><div class="v10-mini-label">시간</div></div>';
  html+='</div>';

  html+='<div style="font-weight:600;margin-bottom:8px;color:#00B4D8">클럽별 샷 기록</div>';
  html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px">';
  for(var ci=0;ci<RANGE_CLUBS.length;ci++){
    var cnt=active.shots[RANGE_CLUBS[ci]]||0;
    html+='<div style="text-align:center;padding:6px;background:rgba(0,180,216,'+(cnt>0?'0.08':'0.02')+');border-radius:8px;border:1px solid rgba(0,180,216,'+(cnt>0?'0.2':'0.05')+')">';
    html+='<div style="font-size:.7em;color:#888">'+RANGE_CLUBS[ci]+'</div>';
    html+='<div style="font-weight:700;color:'+(cnt>0?'#00FF88':'#444')+'">'+cnt+'</div>';
    html+='<div style="display:flex;gap:2px;justify-content:center;margin-top:4px">';
    html+='<button class="v10-mini-btn" onclick="window._v10RangeShot(\''+RANGE_CLUBS[ci]+'\',1)">+1</button>';
    html+='<button class="v10-mini-btn" onclick="window._v10RangeShot(\''+RANGE_CLUBS[ci]+'\',5)">+5</button>';
    html+='</div></div>';
  }
  html+='</div>';
  html+='<button class="v10-btn v10-btn-primary" style="width:100%;margin-top:12px" onclick="window._v10EndRange()">🏁 연습 종료</button>';
  html+='</div>';
} else {
  html+='<div class="v10-card"><h3>➕ 새 연습 세션</h3>';
  html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">';
  html+='<div><label class="v10-label">연습장</label><input id="v10-rg-loc" class="v10-input" type="text" placeholder="연습장 이름" maxlength="25"></div>';
  html+='<div><label class="v10-label">목표</label><select id="v10-rg-target" class="v10-input"><option value="distance">비거리 향상</option><option value="accuracy">정확도 향상</option><option value="short">쇼트게임</option><option value="putting">퍼팅 연습</option><option value="full">종합 연습</option></select></div>';
  html+='</div>';
  html+='<button class="v10-btn v10-btn-primary" style="width:100%;margin-top:12px" onclick="window._v10StartRange()">연습 시작</button></div>';
}

if(sessions.length>0){
  html+='<div class="v10-card"><h3>📅 연습 이력 ('+sessions.length+'회)</h3>';
  for(var si=sessions.length-1;si>=Math.max(0,sessions.length-8);si--){
    var ss=sessions[si];var stot=0;for(var sk in ss.shots)stot+=ss.shots[sk];
    html+='<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.04)">';
    html+='<div><span style="color:#00FF88;font-weight:600">'+(ss.location||'연습장')+'</span> <span style="color:#666;font-size:.8em">'+ss.date+'</span></div>';
    html+='<div style="color:#00B4D8;font-weight:700">'+stot+'샷 / '+ss.duration+'분</div>';
    html+='</div>';
  }
  html+='</div>';
}

pn.innerHTML='<button class="v10-close" onclick="window._v10Close(\'range\')">&times;</button>'+html;
openPanel('range');playSfx('range_start');v10CheckAch();
}

window._v10StartRange=function(){
var loc=document.getElementById('v10-rg-loc').value.trim()||'';
var target=document.getElementById('v10-rg-target').value;
var shots={};for(var i=0;i<RANGE_CLUBS.length;i++)shots[RANGE_CLUBS[i]]=0;
lsSet('range_active',{date:todayStr(),location:loc,target:target,startTime:Date.now(),shots:shots});
showToast('🎯 연습 세션 시작!');showRange();
};

window._v10RangeShot=function(club,count){
var active=lsGet('range_active',null);if(!active)return;
active.shots[club]=(active.shots[club]||0)+count;
lsSet('range_active',active);playSfx('range_shot');showRange();
};

window._v10EndRange=function(){
var active=lsGet('range_active',null);if(!active)return;
var duration=Math.floor((Date.now()-active.startTime)/60000);
var sessions=lsGet('range_sessions',[]);
sessions.push({date:active.date,location:active.location,target:active.target,duration:duration,shots:active.shots});
if(sessions.length>50)sessions=sessions.slice(-50);
lsSet('range_sessions',sessions);lsSet('range_active',null);
showToast('🏁 연습 종료! ('+duration+'분)');showRange();v10CheckAch();
};

// ===== 2. ROUND STATISTICS DASHBOARD =====
function showStats(){
var pn=getPanel('stats');
var rounds=[];
try{var r9=localStorage.getItem('gt_v9_scorecard_rounds');if(r9)rounds=JSON.parse(r9)}catch(e){}
var html='<div class="v10-title">📈 라운드 통계 대시보드</div>';

if(rounds.length===0){
  html+='<div class="v10-card"><p>스코어카드에 라운드를 기록하면 통계가 표시됩니다.</p></div>';
} else {
  var scores=[],puttsArr=[],girArr=[],firArr=[];
  for(var ri=0;ri<rounds.length;ri++){
    var rd=rounds[ri];var tot=0,tputts=0,tgir=0,tfir=0,holes=0;
    for(var h=0;h<18;h++){
      var sc=rd.scores[h];
      if(sc&&sc.score>0){tot+=sc.score;tputts+=sc.putts||0;if(sc.gir)tgir++;if(sc.fir)tfir++;holes++}
    }
    if(holes>0){scores.push(tot);puttsArr.push(tputts);girArr.push(Math.round(tgir/holes*100));firArr.push(Math.round(tfir/holes*100))}
  }

  if(scores.length>0){
    var avgScore=Math.round(scores.reduce(function(a,b){return a+b},0)/scores.length*10)/10;
    var bestScore=Math.min.apply(null,scores);
    var avgPutts=Math.round(puttsArr.reduce(function(a,b){return a+b},0)/puttsArr.length*10)/10;
    var avgGIR=Math.round(girArr.reduce(function(a,b){return a+b},0)/girArr.length);
    var avgFIR=firArr.length>0?Math.round(firArr.reduce(function(a,b){return a+b},0)/firArr.length):0;

    html+='<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-bottom:12px">';
    html+='<div class="v10-stat-card"><div class="v10-stat-val" style="color:#00FF88">'+avgScore+'</div><div class="v10-stat-label">AVG</div></div>';
    html+='<div class="v10-stat-card"><div class="v10-stat-val" style="color:#FFC107">'+bestScore+'</div><div class="v10-stat-label">BEST</div></div>';
    html+='<div class="v10-stat-card"><div class="v10-stat-val" style="color:#E040FB">'+avgPutts+'</div><div class="v10-stat-label">PUTTS</div></div>';
    html+='<div class="v10-stat-card"><div class="v10-stat-val" style="color:#00B4D8">'+avgGIR+'%</div><div class="v10-stat-label">GIR</div></div>';
    html+='<div class="v10-stat-card"><div class="v10-stat-val" style="color:#FF9800">'+avgFIR+'%</div><div class="v10-stat-label">FIR</div></div>';
    html+='</div>';

    html+='<div class="v10-card"><h3>📊 스코어 트렌드</h3>';
    html+='<canvas id="v10-stats-canvas" width="520" height="260" style="width:100%;height:auto;border-radius:12px"></canvas></div>';

    var trend=scores.length>=3?(scores[scores.length-1]<scores[scores.length-3]?'improving':'declining'):'insufficient';
    html+='<div class="v10-card" style="border-left:3px solid '+(trend==='improving'?'#00FF88':'#ff6b6b')+'">';
    html+='<h3>'+(trend==='improving'?'⬆︎ 상승 추세':'⬇︎ 하락 추세')+'</h3>';
    html+='<p>최근 3라운드 평균: '+Math.round((scores.slice(-3).reduce(function(a,b){return a+b},0)/Math.min(3,scores.length))*10)/10+'타</p>';
    html+='</div>';
  }
}

html+='<div class="v10-card"><h3>💡 통계 가이드</h3>';
html+='<table class="v10-table"><tr><th>지표</th><th>아마추어</th><th>슱글</th><th>PGA</th></tr>';
html+='<tr><td>평균 스코어</td><td style="color:#888">90~100</td><td style="color:#FFC107">80~85</td><td style="color:#00FF88">68~72</td></tr>';
html+='<tr><td>평균 퍼팅</td><td style="color:#888">34~38</td><td style="color:#FFC107">30~32</td><td style="color:#00FF88">28~30</td></tr>';
html+='<tr><td>GIR</td><td style="color:#888">20~35%</td><td style="color:#FFC107">45~55%</td><td style="color:#00FF88">65%</td></tr>';
html+='<tr><td>FIR</td><td style="color:#888">40~55%</td><td style="color:#FFC107">55~65%</td><td style="color:#00FF88">62%</td></tr>';
html+='</table></div>';

pn.innerHTML='<button class="v10-close" onclick="window._v10Close(\'stats\')">&times;</button>'+html;
openPanel('stats');playSfx('stats_view');
if(scores&&scores.length>1)setTimeout(function(){renderStatsCanvas(scores,puttsArr)},120);
lsSet('ach_stats_viewed',true);v10CheckAch();
}

function renderStatsCanvas(scores,putts){
var canvas=document.getElementById('v10-stats-canvas');if(!canvas)return;
var ctx=canvas.getContext('2d');var W=520,H=260;
ctx.clearRect(0,0,W,H);
ctx.fillStyle='rgba(0,20,40,.4)';ctx.fillRect(0,0,W,H);

ctx.strokeStyle='rgba(255,255,255,.05)';
for(var gy=40;gy<H-20;gy+=30){ctx.beginPath();ctx.moveTo(50,gy);ctx.lineTo(W-10,gy);ctx.stroke()}

var minS=Math.min.apply(null,scores)-5;var maxS=Math.max.apply(null,scores)+5;
var stepX=(W-70)/Math.max(scores.length-1,1);

var grad=ctx.createLinearGradient(0,0,0,H);
grad.addColorStop(0,'rgba(0,255,136,.15)');grad.addColorStop(1,'rgba(0,255,136,0)');
ctx.beginPath();ctx.moveTo(50,H-30);
for(var si2=0;si2<scores.length;si2++){
  var x=50+si2*stepX;var y=40+(H-70)*(1-(scores[si2]-minS)/(maxS-minS));
  if(si2===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
}
ctx.lineTo(50+(scores.length-1)*stepX,H-30);ctx.lineTo(50,H-30);ctx.fillStyle=grad;ctx.fill();

ctx.beginPath();ctx.strokeStyle='#00FF88';ctx.lineWidth=2.5;
for(var si3=0;si3<scores.length;si3++){
  var x2=50+si3*stepX;var y2=40+(H-70)*(1-(scores[si3]-minS)/(maxS-minS));
  if(si3===0)ctx.moveTo(x2,y2);else ctx.lineTo(x2,y2);
}ctx.stroke();

for(var si4=0;si4<scores.length;si4++){
  var x3=50+si4*stepX;var y3=40+(H-70)*(1-(scores[si4]-minS)/(maxS-minS));
  ctx.fillStyle='#00FF88';ctx.beginPath();ctx.arc(x3,y3,4,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='rgba(255,255,255,.6)';ctx.font='bold 9px sans-serif';ctx.textAlign='center';
  ctx.fillText(scores[si4]+'',x3,y3-10);
}

if(putts&&putts.length>1){
  ctx.beginPath();ctx.strokeStyle='#E040FB';ctx.lineWidth=1.5;ctx.setLineDash([4,3]);
  for(var pi=0;pi<putts.length;pi++){
    var px=50+pi*stepX;var py=40+(H-70)*(1-(putts[pi]-20)/(maxS-minS));
    if(pi===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);
  }ctx.stroke();ctx.setLineDash([]);
}

ctx.fillStyle='rgba(255,255,255,.4)';ctx.font='9px sans-serif';ctx.textAlign='right';
ctx.fillText(maxS+'',45,45);ctx.fillText(minS+'',45,H-25);
ctx.fillStyle='rgba(0,255,136,.5)';ctx.textAlign='left';ctx.fillText('Score',55,20);
ctx.fillStyle='rgba(224,64,251,.5)';ctx.fillText('Putts',110,20);
}

// ===== 3. COURSE HANDICAP CALCULATOR =====
function showHandicapCalc(){
var pn=getPanel('hcalc');
var html='<div class="v10-title">📐 코스 핸디칡 변환기</div>';

html+='<div class="v10-card"><h3>WHS 핸디칡 인덱스 &rarr; 코스 HC</h3>';
html+='<p style="margin-bottom:12px">World Handicap System에 따라 코스별 핸디칡을 계산합니다.</p>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">';
html+='<div><label class="v10-label">HC 인덱스</label><input id="v10-hc-idx" class="v10-input" type="number" step="0.1" min="0" max="54" value="18.0"></div>';
html+='<div><label class="v10-label">슬로프 레이팅</label><input id="v10-hc-slope" class="v10-input" type="number" min="55" max="155" value="113"></div>';
html+='<div><label class="v10-label">코스 레이팅</label><input id="v10-hc-cr" class="v10-input" type="number" step="0.1" min="60" max="80" value="72.0"></div>';
html+='</div>';
html+='<div style="margin-top:8px"><label class="v10-label">Par</label><input id="v10-hc-par" class="v10-input" type="number" min="68" max="76" value="72" style="width:120px"></div>';
html+='<button class="v10-btn v10-btn-primary" style="width:100%;margin-top:12px" onclick="window._v10CalcHC()">코스 HC 계산</button></div>';

html+='<div id="v10-hc-result"></div>';

html+='<div class="v10-card"><h3>📖 슬로프 레이팅 참고</h3>';
html+='<table class="v10-table"><tr><th>난이도</th><th>슬로프</th><th>예시</th></tr>';
html+='<tr><td style="color:#00FF88">쉼움</td><td>55~90</td><td style="color:#aaa;font-size:.8em">평탄한 코스</td></tr>';
html+='<tr><td style="color:#FFC107">보통</td><td>91~120</td><td style="color:#aaa;font-size:.8em">일반적인 코스</td></tr>';
html+='<tr><td style="color:#FF9800">어려움</td><td>121~140</td><td style="color:#aaa;font-size:.8em">챌린지 코스</td></tr>';
html+='<tr><td style="color:#ff6b6b">매우 어려움</td><td>141~155</td><td style="color:#aaa;font-size:.8em">챔피언십 코스</td></tr>';
html+='</table></div>';

pn.innerHTML='<button class="v10-close" onclick="window._v10Close(\'hcalc\')">&times;</button>'+html;
openPanel('hcalc');playSfx('handicap_calc');v10CheckAch();
}

window._v10CalcHC=function(){
var idx=parseFloat(document.getElementById('v10-hc-idx').value)||18;
var slope=parseInt(document.getElementById('v10-hc-slope').value)||113;
var cr=parseFloat(document.getElementById('v10-hc-cr').value)||72;
var par=parseInt(document.getElementById('v10-hc-par').value)||72;

var courseHC=Math.round(idx*(slope/113)+(cr-par));
var netDouble=par+courseHC+36;
var targetScore=par+courseHC;

var rhtml='<div class="v10-card" style="text-align:center;background:linear-gradient(135deg,rgba(0,180,216,.08),rgba(0,255,136,.08))">';
rhtml+='<div style="font-size:.85em;color:#888;margin-bottom:4px">Course Handicap</div>';
rhtml+='<div style="font-size:3.5em;font-weight:800;color:#00FF88">'+courseHC+'</div>';
rhtml+='<div style="margin-top:12px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">';
rhtml+='<div><div style="font-size:1.3em;font-weight:700;color:#00B4D8">'+targetScore+'</div><div style="font-size:.7em;color:#888">목표 스코어</div></div>';
rhtml+='<div><div style="font-size:1.3em;font-weight:700;color:#FFC107">'+Math.round(courseHC/18*10)/10+'</div><div style="font-size:.7em;color:#888">홀당 핸디</div></div>';
rhtml+='<div><div style="font-size:1.3em;font-weight:700;color:#E040FB">'+netDouble+'</div><div style="font-size:.7em;color:#888">넷더블보기</div></div>';
rhtml+='</div></div>';

rhtml+='<div class="v10-card"><h3>홀별 핸디칡 배분</h3>';
rhtml+='<p style="margin-bottom:8px">코스 HC '+courseHC+' 기준, 난이도 순으로 홀별 1타씩 배분:</p>';
rhtml+='<div style="display:flex;flex-wrap:wrap;gap:4px">';
for(var h=1;h<=18;h++){
  var gets=h<=courseHC?1:0;
  rhtml+='<div style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:6px;font-size:.75em;font-weight:700;background:rgba('+(gets?'0,255,136':'255,255,255')+','+(gets?'.12':'.03')+');color:'+(gets?'#00FF88':'#555')+';border:1px solid rgba('+(gets?'0,255,136,.2':'255,255,255,.05')+')">'+h+'</div>';
}
rhtml+='</div></div>';

var resEl=document.getElementById('v10-hc-result');if(resEl)resEl.innerHTML=rhtml;
lsSet('ach_hc_calculated',true);playSfx('handicap_calc');v10CheckAch();
showToast('Course HC: '+courseHC);
};

// ===== 4. SHOT SHAPE ANALYZER =====
var SHOT_SHAPES=['Straight','Draw','Fade','Pull','Push','Hook','Slice','Top','Thin','Fat'];
var SHAPE_COLORS=['#00FF88','#00B4D8','#FFC107','#E040FB','#FF9800','#ff6b6b','#FF5252','#795548','#9E9E9E','#607D8B'];

function showShotShape(){
var pn=getPanel('shape');
var data=lsGet('shot_shapes',[]);
var html='<div class="v10-title">🏌️ 샷 셰이프 분석기</div>';

html+='<div class="v10-card"><h3>➕ 샷 기록</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">';
html+='<div><label class="v10-label">클럽</label><select id="v10-ss-club" class="v10-input">';
for(var ci2=0;ci2<RANGE_CLUBS.length;ci2++)html+='<option>'+RANGE_CLUBS[ci2]+'</option>';
html+='</select></div>';
html+='<div><label class="v10-label">샷 형태</label><select id="v10-ss-shape" class="v10-input">';
for(var si5=0;si5<SHOT_SHAPES.length;si5++)html+='<option value="'+si5+'">'+SHOT_SHAPES[si5]+'</option>';
html+='</select></div>';
html+='</div>';
html+='<button class="v10-btn v10-btn-primary" style="width:100%;margin-top:12px" onclick="window._v10RecordShape()">샷 기록</button></div>';

html+='<canvas id="v10-shape-canvas" width="480" height="300" style="width:100%;height:auto;border-radius:12px;margin-bottom:12px"></canvas>';

if(data.length>0){
  var counts=[];for(var i=0;i<SHOT_SHAPES.length;i++)counts.push(0);
  for(var di=0;di<data.length;di++)counts[data[di].shape]++;
  var dominant=counts.indexOf(Math.max.apply(null,counts));
  html+='<div class="v10-card" style="border-left:3px solid '+SHAPE_COLORS[dominant]+'">';
  html+='<h3>주력 샷: <span style="color:'+SHAPE_COLORS[dominant]+'">'+SHOT_SHAPES[dominant]+'</span></h3>';
  html+='<p>'+data.length+'개 샷 중 '+counts[dominant]+'회 ('+Math.round(counts[dominant]/data.length*100)+'%)</p>';

  var goodShots=counts[0]+counts[1]+counts[2];
  var pct=Math.round(goodShots/data.length*100);
  html+='<div style="margin-top:8px"><div style="display:flex;justify-content:space-between;margin-bottom:4px"><span style="font-size:.8em;color:#888">좋은 샷 비율</span><span style="color:'+(pct>=60?'#00FF88':'#ff6b6b')+'">'+pct+'%</span></div>';
  html+='<div style="height:8px;background:rgba(255,255,255,.05);border-radius:4px;overflow:hidden">';
  html+='<div style="width:'+pct+'%;height:100%;background:'+(pct>=60?'#00FF88':'#ff6b6b')+';border-radius:4px"></div>';
  html+='</div></div></div>';

  html+='<div class="v10-card"><h3>샷 분포</h3>';
  html+='<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:4px">';
  for(var si6=0;si6<SHOT_SHAPES.length;si6++){
    if(counts[si6]===0)continue;
    html+='<div style="text-align:center;padding:6px;background:rgba(255,255,255,.03);border-radius:8px">';
    html+='<div style="font-size:.65em;color:'+SHAPE_COLORS[si6]+'">'+SHOT_SHAPES[si6]+'</div>';
    html+='<div style="font-weight:700">'+counts[si6]+'</div></div>';
  }
  html+='</div></div>';
}

pn.innerHTML='<button class="v10-close" onclick="window._v10Close(\'shape\')">&times;</button>'+html;
openPanel('shape');playSfx('shot_shape');
setTimeout(function(){renderShapeCanvas(data)},120);v10CheckAch();
}

function renderShapeCanvas(data){
var canvas=document.getElementById('v10-shape-canvas');if(!canvas)return;
var ctx=canvas.getContext('2d');var W=480,H=300;
ctx.clearRect(0,0,W,H);
ctx.fillStyle='rgba(0,40,0,.2)';ctx.fillRect(0,0,W,H);

ctx.fillStyle='#4CAF50';ctx.beginPath();ctx.ellipse(W/2,60,50,35,0,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(W/2,60,3,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#2d8b2d';ctx.beginPath();ctx.ellipse(W/2,H/2,W*0.35,H*0.3,0,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(W/2,H-40,6,0,Math.PI*2);ctx.fill();
ctx.fillStyle='rgba(255,255,255,.3)';ctx.font='8px sans-serif';ctx.textAlign='center';ctx.fillText('TEE',W/2,H-28);
ctx.fillText('GREEN',W/2,48);

for(var di2=0;di2<Math.min(data.length,100);di2++){
  var d=data[di2];var shape=d.shape;
  var startX=W/2;var startY=H-40;
  var endX=W/2;var endY=80+Math.random()*40;
  var cpX=W/2;var cpY=H/2;

  switch(shape){
    case 0:endX+=((Math.random()-0.5)*30);cpX=W/2;break;
    case 1:endX-=20+Math.random()*20;cpX=W/2+15;break;
    case 2:endX+=20+Math.random()*20;cpX=W/2-15;break;
    case 3:endX-=40+Math.random()*30;cpX=W/2-20;break;
    case 4:endX+=40+Math.random()*30;cpX=W/2+20;break;
    case 5:endX-=60+Math.random()*40;cpX=W/2+30;break;
    case 6:endX+=60+Math.random()*40;cpX=W/2-30;break;
    case 7:endY=H/2+Math.random()*40;break;
    case 8:endY=100+Math.random()*60;break;
    case 9:endY=H/2+20+Math.random()*30;endX+=((Math.random()-0.5)*40);break;
  }

  ctx.beginPath();ctx.moveTo(startX,startY);ctx.quadraticCurveTo(cpX,cpY,endX,endY);
  ctx.strokeStyle=SHAPE_COLORS[shape].replace(')',',0.4)').replace('rgb','rgba');ctx.lineWidth=1.5;ctx.stroke();
  ctx.fillStyle=SHAPE_COLORS[shape].replace(')',',0.6)').replace('rgb','rgba');
  ctx.beginPath();ctx.arc(endX,endY,3,0,Math.PI*2);ctx.fill();
}

ctx.fillStyle='rgba(255,255,255,.4)';ctx.font='10px sans-serif';ctx.textAlign='left';
ctx.fillText(data.length+' shots',10,20);
}

window._v10RecordShape=function(){
var club=document.getElementById('v10-ss-club').value;
var shape=parseInt(document.getElementById('v10-ss-shape').value);
var data=lsGet('shot_shapes',[]);
data.push({date:todayStr(),club:club,shape:shape});
if(data.length>500)data=data.slice(-500);
lsSet('shot_shapes',data);
showToast(club+': '+SHOT_SHAPES[shape]);playSfx('shot_shape');showShotShape();
};

// ===== 5. WARM-UP ROUTINE BUILDER =====
var WARMUP_STEPS=[
{name:'스트레칭',duration:300,desc:'목/어깨/허리/고관절 스트레칭 5분',icon:'🧘',detail:'목 좌우 회전 10회 &rarr; 어깨 회전 10회 &rarr; 허리 회전 10회 &rarr; 고관절 열기 좌우 15초'},
{name:'퍼팅 워밍업',duration:300,desc:'3ft &rarr; 6ft &rarr; 10ft 순서로 5볼씩',icon:'🎯',detail:'3ft 5볼 (거리감 확인) &rarr; 6ft 5볼 (방향) &rarr; 10ft 5볼 (터치)'},
{name:'칩/피치 연습',duration:300,desc:'SW/GW로 20~50yd 타겏 연습',icon:'⛳',detail:'SW 20yd 5발 &rarr; GW 40yd 5발 &rarr; PW 50yd 5발. 내려치는 느낌에 집중'},
{name:'아이언 스윙',duration:300,desc:'9I &rarr; 7I &rarr; 5I 각 5발씩',icon:'🏌️',detail:'9I 5발 (3/4 스윙) &rarr; 7I 5발 (풀스윙) &rarr; 5I 5발. 타겟 설정 필수'},
{name:'우드/드라이버',duration:240,desc:'3W 3발 &rarr; Driver 5발 점진적',icon:'🚀',detail:'3W 3발 (70% 파워) &rarr; Driver 3발 (80%) &rarr; Driver 2발 (풀스윙)'},
{name:'마인드 세팅',duration:120,desc:'호흡법 + 시각화 + 프리샷 루틴 확인',icon:'🧠',detail:'4-7-8 호흡법 3회 &rarr; 첫 홀 시각화 &rarr; 프리샷 루틴 리허설'}
];

function showWarmup(){
var pn=getPanel('warmup');
var progress=lsGet('warmup_progress',{step:0,done:false,date:''});
if(progress.date!==todayStr()){progress={step:0,done:false,date:todayStr()};lsSet('warmup_progress',progress)}
var html='<div class="v10-title">🔥 프리라운드 워밍업</div>';

var totalTime=0;for(var wi=0;wi<WARMUP_STEPS.length;wi++)totalTime+=WARMUP_STEPS[wi].duration;
html+='<div style="text-align:center;margin-bottom:12px;color:#888;font-size:.85em">총 '+Math.round(totalTime/60)+'분 | 6단계 프로그램</div>';

html+='<div style="display:flex;gap:4px;margin-bottom:16px">';
for(var pi2=0;pi2<WARMUP_STEPS.length;pi2++){
  var pc=pi2<progress.step?'#00FF88':pi2===progress.step?'#00B4D8':'rgba(255,255,255,.1)';
  html+='<div style="flex:1;height:6px;background:'+pc+';border-radius:3px"></div>';
}html+='</div>';

for(var si7=0;si7<WARMUP_STEPS.length;si7++){
  var ws=WARMUP_STEPS[si7];
  var isDone=si7<progress.step;
  var isCurrent=si7===progress.step&&!progress.done;
  html+='<div class="v10-card" style="'+(isDone?'border-left:3px solid #00FF88;opacity:.7':isCurrent?'border-left:3px solid #00B4D8':'')+'">';
  html+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">';
  html+='<div style="display:flex;align-items:center;gap:10px"><span style="font-size:1.4em">'+ws.icon+'</span><div>';
  html+='<div style="font-weight:700;color:'+(isDone?'#00FF88':isCurrent?'#00B4D8':'#ccc')+'">Step '+(si7+1)+': '+ws.name+'</div>';
  html+='<div style="font-size:.72em;color:#888">'+Math.round(ws.duration/60)+'분 | '+ws.desc+'</div>';
  html+='</div></div>';
  if(isDone)html+='<span class="v10-badge v10-badge-a">✅</span>';
  else if(isCurrent)html+='<button class="v10-btn v10-btn-primary" onclick="window._v10WarmupStep()">완료</button>';
  html+='</div>';
  html+='<div style="font-size:.8em;color:#aaa;line-height:1.6;padding-left:36px">'+ws.detail+'</div>';
  html+='</div>';
}

if(progress.done){
  html+='<div class="v10-card" style="text-align:center;background:linear-gradient(135deg,rgba(0,255,136,.06),rgba(0,180,216,.06))">';
  html+='<div style="font-size:2.5em;margin-bottom:8px">🏆</div>';
  html+='<h3 style="color:#00FF88">워밍업 완료!</h3>';
  html+='<p>최상의 라운드를 준비했습니다. Good luck!</p></div>';
}

pn.innerHTML='<button class="v10-close" onclick="window._v10Close(\'warmup\')">&times;</button>'+html;
openPanel('warmup');v10CheckAch();
}

window._v10WarmupStep=function(){
var progress=lsGet('warmup_progress',{step:0,done:false,date:todayStr()});
progress.step++;
if(progress.step>=WARMUP_STEPS.length){progress.done=true;playSfx('warmup_done');showToast('🔥 워밍업 완료!')}
else{playSfx('warmup_step');showToast('Step '+progress.step+' 완료!')}
lsSet('warmup_progress',progress);showWarmup();v10CheckAch();
};

// ===== 6. SCRAMBLING TRACKER =====
function showScrambling(){
var pn=getPanel('scramble');
var data=lsGet('scramble_data',[]);
var html='<div class="v10-title">💪 스크램블링 트래커</div>';

html+='<div class="v10-card"><h3>➕ 업앤다운 기록</h3>';
html+='<p style="margin-bottom:8px">그린을 놓쳤을 때 파 이하로 저장하는 스크램블링 성공률</p>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';
html+='<div><label class="v10-label">위치</label><select id="v10-sc-pos" class="v10-input"><option value="fairway">페어웨이</option><option value="rough">러프</option><option value="bunker">벙커</option><option value="fringe">프린지</option></select></div>';
html+='<div><label class="v10-label">거리 (yd)</label><input id="v10-sc-dist" class="v10-input" type="number" min="1" max="80" value="20"></div>';
html+='<div><label class="v10-label">결과</label><select id="v10-sc-result" class="v10-input"><option value="up">✅ Up&amp;Down 성공</option><option value="miss">❌ 실패</option></select></div>';
html+='<div><label class="v10-label">샷 종류</label><select id="v10-sc-shot" class="v10-input"><option value="chip">칩</option><option value="pitch">피치</option><option value="bunker">벙커샷</option><option value="lob">롭샷</option><option value="bump">범프앤런</option></select></div>';
html+='</div>';
html+='<button class="v10-btn v10-btn-primary" style="width:100%;margin-top:12px" onclick="window._v10RecordScramble()">기록</button></div>';

if(data.length>0){
  var total=data.length;var ups=data.filter(function(d){return d.result==='up'}).length;
  var pct=Math.round(ups/total*100);

  html+='<div class="v10-card" style="text-align:center">';
  html+='<div style="font-size:2.5em;font-weight:800;color:'+(pct>=50?'#00FF88':'#ff6b6b')+'">'+pct+'%</div>';
  html+='<div style="color:#888;font-size:.85em">스크램블링 성공률 ('+ups+'/'+total+')</div>';
  html+='<div style="font-size:.75em;color:#888;margin-top:4px">PGA Tour 평균: 58%</div></div>';

  var posTypes=['fairway','rough','bunker','fringe'];
  var posLabels=['페어웨이','러프','벙커','프린지'];
  html+='<div class="v10-card"><h3>위치별 성공률</h3>';
  html+='<table class="v10-table"><tr><th>위치</th><th>시도</th><th>성공</th><th>성공률</th></tr>';
  for(var pi3=0;pi3<posTypes.length;pi3++){
    var posData=data.filter(function(d2){return d2.position===posTypes[pi3]});
    var posUps=posData.filter(function(d2){return d2.result==='up'}).length;
    var posPct=posData.length>0?Math.round(posUps/posData.length*100):'-';
    html+='<tr><td style="color:#00B4D8">'+posLabels[pi3]+'</td><td>'+posData.length+'</td><td>'+posUps+'</td>';
    html+='<td style="color:'+(posPct==='-'?'#888':posPct>=50?'#00FF88':'#ff6b6b')+';font-weight:700">'+(posPct==='-'?'-':posPct+'%')+'</td></tr>';
  }
  html+='</table></div>';

  var sandData=data.filter(function(d3){return d3.position==='bunker'});
  var sandUps=sandData.filter(function(d3){return d3.result==='up'}).length;
  var sandPct=sandData.length>0?Math.round(sandUps/sandData.length*100):0;
  html+='<div class="v10-card"><h3>🏖️ 샌드 세이브</h3>';
  html+='<div style="font-size:1.8em;font-weight:800;color:'+(sandPct>=40?'#00FF88':'#ff6b6b')+'">'+sandPct+'%</div>';
  html+='<div style="color:#888;font-size:.8em">PGA Tour 평균: 52%</div></div>';
}

pn.innerHTML='<button class="v10-close" onclick="window._v10Close(\'scramble\')">&times;</button>'+html;
openPanel('scramble');playSfx('scramble_save');v10CheckAch();
}

window._v10RecordScramble=function(){
var pos=document.getElementById('v10-sc-pos').value;
var dist=parseInt(document.getElementById('v10-sc-dist').value)||20;
var result=document.getElementById('v10-sc-result').value;
var shot=document.getElementById('v10-sc-shot').value;
var data=lsGet('scramble_data',[]);
data.push({date:todayStr(),position:pos,distance:dist,result:result,shotType:shot});
if(data.length>300)data=data.slice(-300);
lsSet('scramble_data',data);
showToast(result==='up'?'✅ Up&amp;Down 성공!':'❌ 실패');
playSfx('scramble_save');showScrambling();
};

// ===== 7. GOLF NUTRITION GUIDE =====
var NUTRITION_GUIDE=[
{phase:'라운드 전',items:[
  {name:'바나나',benefit:'즐각적인 에너지 방출, 전해질 보충',timing:'라운드 1시간 전'},
  {name:'오트밀 + 베리',benefit:'복합 탄수화물, 지속적 에너지',timing:'2시간 전'},
  {name:'고구마/고뽈 토스트',benefit:'빠른 에너지, 혈당 안정',timing:'1시간 전'}
]},
{phase:'라운드 중',items:[
  {name:'물 (150~200ml/홀)',benefit:'탈수 방지, 집중력 유지',timing:'매 홀마다'},
  {name:'스포츠 음료 (더운 날)',benefit:'전해질 + 탄수화물 보충',timing:'9홀 후'},
  {name:'견과류/에너지바',benefit:'지방 + 단백질, 포만감',timing:'6~9홀, 12~15홀'}
]},
{phase:'라운드 후',items:[
  {name:'닭가슴살 + 현미밥',benefit:'근육 회복, 글리코겐 보충',timing:'30분 이내'},
  {name:'프로틴셰이크/우유',benefit:'빠른 단백질 흡수',timing:'즉시'},
  {name:'전해질 음료',benefit:'수분 + 미네랄 복원',timing:'1시간 이내'},
  {name:'커피/녹차 (카페인)',benefit:'피로 회복, 항산화',timing:'라운드 후'}
]}
];

function showNutrition(){
var pn=getPanel('nutrition');
var html='<div class="v10-title">🍎 골프 영양 가이드</div>';

html+='<div class="v10-card"><p>최적의 라운드 퍼포먼스를 위한 영양 가이드. 체중/건강 상태에 따라 조정하세요.</p></div>';

for(var ni=0;ni<NUTRITION_GUIDE.length;ni++){
  var phase=NUTRITION_GUIDE[ni];
  var phaseColor=ni===0?'#FFC107':ni===1?'#00FF88':'#00B4D8';
  html+='<div class="v10-card" style="border-left:3px solid '+phaseColor+'">';
  html+='<h3 style="color:'+phaseColor+'">'+phase.phase+'</h3>';
  for(var ii=0;ii<phase.items.length;ii++){
    var item=phase.items[ii];
    html+='<div style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,.04)">';
    html+='<div style="display:flex;justify-content:space-between;align-items:center">';
    html+='<span style="font-weight:700">'+item.name+'</span>';
    html+='<span class="v10-badge v10-badge-b">'+item.timing+'</span></div>';
    html+='<div style="font-size:.8em;color:#aaa;margin-top:4px">'+item.benefit+'</div>';
    html+='</div>';
  }
  html+='</div>';
}

html+='<div class="v10-card"><h3>💧 수분 섭취 가이드</h3>';
html+='<table class="v10-table"><tr><th>기온</th><th>권장량</th><th>빈도</th></tr>';
html+='<tr><td>20도 이하</td><td style="color:#00B4D8">150ml/홀</td><td style="color:#aaa">목마르면</td></tr>';
html+='<tr><td>20~30도</td><td style="color:#FFC107">200ml/홀</td><td style="color:#aaa">매 홀마다</td></tr>';
html+='<tr><td>30도 이상</td><td style="color:#ff6b6b">250ml/홀</td><td style="color:#aaa">티샷 전후</td></tr>';
html+='</table></div>';

pn.innerHTML='<button class="v10-close" onclick="window._v10Close(\'nutrition\')">&times;</button>'+html;
openPanel('nutrition');playSfx('nutrition_tip');lsSet('ach_nutrition_viewed',true);v10CheckAch();
}

// ===== 8. PIN POSITION APPROACH ANALYZER =====
function showPinTracker(){
var pn=getPanel('pintrack');
var data=lsGet('pin_data',[]);
var html='<div class="v10-title">🚩 핀 포지션 분석기</div>';

html+='<div class="v10-card"><h3>➕ 어프로치 기록</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">';
html+='<div><label class="v10-label">핀 위치</label><select id="v10-pin-pos" class="v10-input"><option value="front">프론트</option><option value="center" selected>센터</option><option value="back">백</option><option value="left">좌측</option><option value="right">우측</option></select></div>';
html+='<div><label class="v10-label">거리 (yd)</label><input id="v10-pin-dist" class="v10-input" type="number" min="50" max="250" value="140"></div>';
html+='<div><label class="v10-label">클럽</label><select id="v10-pin-club" class="v10-input">';
for(var ci3=4;ci3<RANGE_CLUBS.length;ci3++)html+='<option>'+RANGE_CLUBS[ci3]+'</option>';
html+='</select></div>';
html+='<div><label class="v10-label">결과</label><select id="v10-pin-result" class="v10-input"><option value="green_close">GIR (5yd 이내)</option><option value="green_ok">GIR (10yd 이내)</option><option value="green_far">GIR (10yd+)</option><option value="miss_short">Short</option><option value="miss_long">Long</option><option value="miss_left">Left</option><option value="miss_right">Right</option></select></div>';
html+='</div>';
html+='<button class="v10-btn v10-btn-primary" style="width:100%;margin-top:12px" onclick="window._v10RecordPin()">기록</button></div>';

if(data.length>0){
  var girCount=data.filter(function(d){return d.result.indexOf('green')===0}).length;
  var girPct=Math.round(girCount/data.length*100);
  var closeCount=data.filter(function(d){return d.result==='green_close'}).length;
  var closePct=Math.round(closeCount/data.length*100);

  html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:12px">';
  html+='<div class="v10-stat-card"><div class="v10-stat-val" style="color:#00FF88">'+girPct+'%</div><div class="v10-stat-label">GIR</div></div>';
  html+='<div class="v10-stat-card"><div class="v10-stat-val" style="color:#FFC107">'+closePct+'%</div><div class="v10-stat-label">5yd 이내</div></div>';
  html+='<div class="v10-stat-card"><div class="v10-stat-val" style="color:#00B4D8">'+data.length+'</div><div class="v10-stat-label">총 샷</div></div>';
  html+='</div>';

  var missTypes={miss_short:0,miss_long:0,miss_left:0,miss_right:0};
  for(var mi=0;mi<data.length;mi++){if(missTypes[data[mi].result]!==undefined)missTypes[data[mi].result]++}
  var missTotal=missTypes.miss_short+missTypes.miss_long+missTypes.miss_left+missTypes.miss_right;
  if(missTotal>0){
    html+='<div class="v10-card"><h3>미스 패턴 분석</h3>';
    html+='<canvas id="v10-pin-canvas" width="300" height="300" style="width:100%;max-width:300px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas></div>';
  }

  var pinPositions=['front','center','back','left','right'];
  var pinLabels=['프론트','센터','백','좌측','우측'];
  html+='<div class="v10-card"><h3>핀 위치별 GIR</h3>';
  html+='<table class="v10-table"><tr><th>핀 위치</th><th>시도</th><th>GIR</th><th>비율</th></tr>';
  for(var pp=0;pp<pinPositions.length;pp++){
    var ppData=data.filter(function(d2){return d2.pinPos===pinPositions[pp]});
    var ppGir=ppData.filter(function(d2){return d2.result.indexOf('green')===0}).length;
    var ppPct=ppData.length>0?Math.round(ppGir/ppData.length*100):'-';
    html+='<tr><td style="color:#00B4D8">'+pinLabels[pp]+'</td><td>'+ppData.length+'</td><td>'+ppGir+'</td>';
    html+='<td style="color:'+(ppPct==='-'?'#888':ppPct>=50?'#00FF88':'#ff6b6b')+';font-weight:700">'+(ppPct==='-'?'-':ppPct+'%')+'</td></tr>';
  }
  html+='</table></div>';
}

pn.innerHTML='<button class="v10-close" onclick="window._v10Close(\'pintrack\')">&times;</button>'+html;
openPanel('pintrack');playSfx('shot_shape');
if(data.length>0)setTimeout(function(){renderPinCanvas(data)},120);
v10CheckAch();
}

function renderPinCanvas(data){
var canvas=document.getElementById('v10-pin-canvas');if(!canvas)return;
var ctx=canvas.getContext('2d');var W=300,H=300;
ctx.clearRect(0,0,W,H);
ctx.fillStyle='rgba(0,40,0,.3)';ctx.fillRect(0,0,W,H);

ctx.fillStyle='#4CAF50';ctx.beginPath();ctx.arc(W/2,H/2,100,0,Math.PI*2);ctx.fill();
ctx.strokeStyle='rgba(255,255,255,.1)';
for(var r=25;r<=100;r+=25){ctx.beginPath();ctx.arc(W/2,H/2,r,0,Math.PI*2);ctx.stroke()}
ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(W/2,H/2,4,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#FF4444';ctx.beginPath();ctx.moveTo(W/2,H/2-4);ctx.lineTo(W/2+1,H/2-14);ctx.lineTo(W/2+8,H/2-12);ctx.closePath();ctx.fill();

for(var di3=0;di3<data.length;di3++){
  var d=data[di3];var dx=0,dy=0;
  switch(d.result){
    case'green_close':dx=(Math.random()-0.5)*20;dy=(Math.random()-0.5)*20;break;
    case'green_ok':dx=(Math.random()-0.5)*50;dy=(Math.random()-0.5)*50;break;
    case'green_far':dx=(Math.random()-0.5)*80;dy=(Math.random()-0.5)*80;break;
    case'miss_short':dy=60+Math.random()*50;dx=(Math.random()-0.5)*40;break;
    case'miss_long':dy=-60-Math.random()*50;dx=(Math.random()-0.5)*40;break;
    case'miss_left':dx=-60-Math.random()*50;dy=(Math.random()-0.5)*40;break;
    case'miss_right':dx=60+Math.random()*50;dy=(Math.random()-0.5)*40;break;
  }
  var isGir=d.result.indexOf('green')===0;
  ctx.fillStyle=isGir?'rgba(0,255,136,.5)':'rgba(255,107,107,.5)';
  ctx.beginPath();ctx.arc(W/2+dx,H/2+dy,4,0,Math.PI*2);ctx.fill();
}

ctx.fillStyle='rgba(255,255,255,.4)';ctx.font='9px sans-serif';ctx.textAlign='center';
ctx.fillText('SHORT',W/2,H-10);ctx.fillText('LONG',W/2,15);
ctx.save();ctx.translate(10,H/2);ctx.rotate(-Math.PI/2);ctx.fillText('LEFT',0,0);ctx.restore();
ctx.save();ctx.translate(W-10,H/2);ctx.rotate(Math.PI/2);ctx.fillText('RIGHT',0,0);ctx.restore();
}

window._v10RecordPin=function(){
var pinPos=document.getElementById('v10-pin-pos').value;
var dist=parseInt(document.getElementById('v10-pin-dist').value)||140;
var club=document.getElementById('v10-pin-club').value;
var result=document.getElementById('v10-pin-result').value;
var data=lsGet('pin_data',[]);
data.push({date:todayStr(),pinPos:pinPos,distance:dist,club:club,result:result});
if(data.length>300)data=data.slice(-300);
lsSet('pin_data',data);
var msg=result.indexOf('green')===0?'✅ GIR!':'❌ Miss ('+result.split('_')[1]+')';
showToast(msg);playSfx('shot_shape');showPinTracker();
};

// ===== 9. QUIZ v3 (+15 = 45 total) =====
var V10_QUIZ=[
{q:'골프에서 &quot;에이지 샷&quot;이란?',o:['자신의 나이 이하로 치는 것','홀인원','에이스 점수','PGA 연령 점수'],a:0,explain:'에이지 샷은 자신의 나이와 같거나 낮은 타수로 라운드하는 것입니다.'},
{q:'골프에서 &quot;스크램블링&quot;의 정의는?',o:['3퍼트 무조건 성공','GIR 실패 후 파 이하 저장','버디 연속','이글 퍼트'],a:1,explain:'스크램블링은 GIR을 놓쳤을 때 파 이하로 저장하는 것입니다.'},
{q:'골프 오리지널 18홀이 된 이유는?',o:['위스키 1병 = 18홀분','치 수 때문','시간 제한','법률 규정'],a:0,explain:'전설에 의하면 세인트앤드루즈에서 위스키 1병으로 18홀을 돌았다고 합니다.'},
{q:'PGA Tour에서 &quot;먹입 플라이어&quot;의 의미는?',o:['초보 골퍼','상금 0 플레이어','예선 통과 실패 플레이어','신인 플레이어'],a:2,explain:'먹입 플라이어는 예선을 통과하지 못해 바로 상금을 받지 못하는 선수입니다.'},
{q:'바운스 각도가 낮은 웨지(4~8도)는 어떤 상황에 적합한가?',o:['벙커 샷','타이트 라이','풀 스윙','퍼팅'],a:1,explain:'낮은 바운스는 단단한 지면에서 볼을 굴리는 범프앤런에 적합합니다.'},
{q:'골프공의 압축률(Compression)이 낮은 공의 특징은?',o:['비거리 증가','스핀 증가','부드러운 타감','컨트롤 증가'],a:2,explain:'낮은 압축률(50-70)은 볼이 부드러워져 슬로우 스윙에 적합합니다.'},
{q:'골프에서 &quot;업힐&quot;(Uphill) 라이에서는 어떻게 조정해야 하나?',o:['1클럽 내려 선택','1클럽 올려 선택','볼 위치 변경','그립 변경'],a:1,explain:'오르막에서는 볼이 더 높이 떠어 거리가 줄어지므로 1클럽 올려 칩니다.'},
{q:'골프 스윙에서 &quot;레이트 히트&quot;란?',o:['볼 위치보다 클럽이 늦게 도착','빠른 스윙','볼을 맞지 못함','볼의 윗부분을 침'],a:0,explain:'레이트 히트는 임팩트 시 클럽이 및으로 쳐지는 것으로 비거리 손실을 유발합니다.'},
{q:'골프 라운드에서 평균 걸음 수는?',o:['5,000보','8,000~10,000보','15,000보','3,000보'],a:1,explain:'18홀 라운드에서 평균 8,000~10,000보를 걷습니다. 약 6~7km.'},
{q:'골프에서 &quot;플롭 샷&quot;이란?',o:['낮은 탄도의 샷','벙커에서 높게 띄우는 샷','그린 위에서 볼을 멈추는 샷','퍼팅 기술'],a:2,explain:'플롭 샷은 볼을 높이 띄워 그린 위에서 빠르게 멈추는 샷입니다.'},
{q:'PGA Tour 평균 버디 비율은?',o:['10~15%','20~25%','30~35%','40~45%'],a:1,explain:'PGA Tour 평균 버디 비율은 약 22%입니다.'},
{q:'골프에서 &quot;케이더스&quot;(Cadence)란?',o:['코스 난이도','스윙 리듬과 템포','볼 회전수','클럽 무게'],a:1,explain:'케이덴스는 스윙의 일정한 리듬과 템포를 의미합니다.'},
{q:'드라이버의 이상적인 런치 앱글은?',o:['5~8도','10~14도','18~22도','25~30도'],a:1,explain:'드라이버의 이상적 런치 앱글은 10~14도입니다.'},
{q:'골프에서 &quot;프린지&quot;란?',o:['벙커 주변','그린 주변의 짧은 잔디','페어웨이 가장자리','워터 해저드 경계'],a:1,explain:'프린지는 그린 주변의 짧게 깎은 잔디 영역입니다.'},
{q:'골프에서 &quot;그린 리딩&quot;이란?',o:['볼 마크 읽기','그린의 경사/방향 파악','클럽 선택','바람 읽기'],a:1,explain:'그린 리딩은 퍼팅 전 경사와 브레이크를 파악하는 기술입니다.'}
];

function showV10Quiz(){
var pn=getPanel('v10quiz');
var qs=lsGet('v10quiz_state',{current:0,correct:0,answered:[]});
var html='<div class="v10-title">📝 골프 심화 퀴즈 v3</div>';

if(qs.answered.length>=V10_QUIZ.length){
  var grade=qs.correct>=14?'S':qs.correct>=12?'A':qs.correct>=10?'B':qs.correct>=7?'C':'D';
  var gcolor=grade==='S'?'#00FF88':grade==='A'?'#00B4D8':grade==='B'?'#FFC107':'#ff6b6b';
  html+='<div class="v10-card" style="text-align:center"><div style="font-size:3em;margin-bottom:8px">🏆</div>';
  html+='<h3>퀴즈 완료!</h3>';
  html+='<div style="font-size:2.5em;font-weight:800;color:'+gcolor+';margin:12px 0">'+grade+'</div>';
  html+='<div style="color:#aaa">'+qs.correct+' / '+V10_QUIZ.length+' 정답</div>';
  html+='<button class="v10-btn v10-btn-primary" style="margin-top:16px" onclick="window._v10ResetQuiz()">다시 도전</button></div>';
} else {
  var qi=qs.current;var q=V10_QUIZ[qi];
  html+='<div style="text-align:center;margin-bottom:12px;color:#888;font-size:.85em">문제 '+(qi+1)+' / '+V10_QUIZ.length+' &middot; 정답 '+qs.correct+'개</div>';
  html+='<div style="display:flex;gap:3px;margin-bottom:16px">';
  for(var pi4=0;pi4<V10_QUIZ.length;pi4++){
    var pc2=pi4<qs.answered.length?(qs.answered[pi4]?'#00FF88':'#ff6b6b'):(pi4===qi?'#00B4D8':'rgba(255,255,255,.1)');
    html+='<div style="flex:1;height:4px;background:'+pc2+';border-radius:2px"></div>';
  }html+='</div>';
  html+='<div class="v10-card"><h3 style="line-height:1.5">'+q.q+'</h3></div>';
  for(var oi=0;oi<q.o.length;oi++){
    html+='<button class="v10-btn" style="width:100%;text-align:left;padding:14px 16px;margin-bottom:8px" onclick="window._v10AnswerQuiz('+oi+')">';
    html+='<span style="color:#00B4D8;font-weight:700;margin-right:8px">'+String.fromCharCode(65+oi)+'.</span> '+q.o[oi]+'</button>';
  }
}
pn.innerHTML='<button class="v10-close" onclick="window._v10Close(\'v10quiz\')">&times;</button>'+html;
openPanel('v10quiz');
}

window._v10AnswerQuiz=function(idx){
var qs=lsGet('v10quiz_state',{current:0,correct:0,answered:[]});
var q=V10_QUIZ[qs.current];var ok=idx===q.a;
qs.answered.push(ok);if(ok){qs.correct++;playSfx('v10_quiz');showToast('✅ 정답!')}
else{showToast('❌ '+q.explain)}
qs.current++;lsSet('v10quiz_state',qs);
setTimeout(function(){showV10Quiz()},800);v10CheckAch();
};
window._v10ResetQuiz=function(){lsSet('v10quiz_state',{current:0,correct:0,answered:[]});showV10Quiz()};

// ===== ACHIEVEMENTS (+12 = 36 total) =====
var V10_ACH=[
{id:'v10_range_first',name:'첫 연습',desc:'드라이빙 레인지 세션 1회',icon:'🎯',check:function(){return lsGet('range_sessions',[]).length>=1}},
{id:'v10_range_5',name:'연습벌레',desc:'5회 연습 세션 완료',icon:'💪',check:function(){return lsGet('range_sessions',[]).length>=5}},
{id:'v10_stats_viewer',name:'통계 분석가',desc:'라운드 통계 대시보드 조회',icon:'📈',check:function(){return lsGet('ach_stats_viewed',false)}},
{id:'v10_hc_calc',name:'핸디칡 계산가',desc:'코스 핸디칡 변환 완료',icon:'📐',check:function(){return lsGet('ach_hc_calculated',false)}},
{id:'v10_shape_50',name:'샷 분석가',desc:'샷 셰이프 50회 기록',icon:'🏌️',check:function(){return lsGet('shot_shapes',[]).length>=50}},
{id:'v10_warmup_done',name:'워밍업 마스터',desc:'6단계 워밍업 완료',icon:'🔥',check:function(){var p=lsGet('warmup_progress',{});return p.done===true}},
{id:'v10_scramble_50',name:'스크램블링 50%+',desc:'스크램블링 성공률 50% 이상',icon:'⭐',check:function(){var d=lsGet('scramble_data',[]);if(d.length<10)return false;return d.filter(function(x){return x.result==='up'}).length/d.length>=0.5}},
{id:'v10_nutrition',name:'영양 전문가',desc:'영양 가이드 조회',icon:'🍎',check:function(){return lsGet('ach_nutrition_viewed',false)}},
{id:'v10_pin_30',name:'핀 헌터',desc:'핀 포지션 30회 기록',icon:'🚩',check:function(){return lsGet('pin_data',[]).length>=30}},
{id:'v10_quiz_perfect',name:'퀴즈 v3 만점',desc:'v3 퀴즈 15문제 전부 정답',icon:'📝',check:function(){var qs=lsGet('v10quiz_state',{});return qs.correct>=15&&(qs.answered||[]).length>=15}},
{id:'v10_range_100',name:'백발백중',desc:'한 세션에서 100샷 이상',icon:'🚀',check:function(){var sessions=lsGet('range_sessions',[]);return sessions.some(function(s){var t=0;for(var k in s.shots)t+=s.shots[k];return t>=100})}},
{id:'v10_all_features',name:'v10 탐험가',desc:'v10 전체 기능 탐색',icon:'🌍',check:function(){return lsGet('range_sessions',[]).length>=1&&lsGet('ach_stats_viewed',false)&&lsGet('ach_hc_calculated',false)&&lsGet('shot_shapes',[]).length>=1&&lsGet('warmup_progress',{}).done===true&&lsGet('scramble_data',[]).length>=1&&lsGet('ach_nutrition_viewed',false)&&lsGet('pin_data',[]).length>=1}}
];

function v10CheckAch(){
var unlocked=lsGet('v10_achievements',[]);
for(var i=0;i<V10_ACH.length;i++){
  var ach=V10_ACH[i];
  if(unlocked.indexOf(ach.id)===-1&&ach.check()){
    unlocked.push(ach.id);lsSet('v10_achievements',unlocked);
    showV10AchPopup(ach);playSfx('v10_achieve');
  }
}
}

function showV10AchPopup(ach){
var popup=document.createElement('div');popup.className='v10-ach-popup';
popup.innerHTML='<div style="font-size:2em">'+ach.icon+'</div><div><div style="font-size:.65em;color:#00FF88;font-weight:700;letter-spacing:2px">ACHIEVEMENT</div><div style="font-weight:700">'+ach.name+'</div><div style="font-size:.8em;color:#888;margin-top:2px">'+ach.desc+'</div></div>';
document.body.appendChild(popup);
setTimeout(function(){popup.classList.add('show')},50);
setTimeout(function(){popup.classList.remove('show');setTimeout(function(){popup.remove()},500)},3500);
}

// ===== QUICK ACTIONS & KEYBOARD =====
function injectV10QuickActions(){
var existing=document.querySelector('.v10-quick-actions');if(existing)return;
var container=document.createElement('div');container.className='v10-quick-actions';
var buttons=[
  {icon:'🎯',title:'레인지 (Shift+R)',fn:'showRange'},
  {icon:'📈',title:'통계 (Shift+T)',fn:'showStats'},
  {icon:'📐',title:'핸디칡 (Shift+H)',fn:'showHandicapCalc'},
  {icon:'🏌️',title:'샷셰이프 (Shift+S)',fn:'showShotShape'},
  {icon:'🔥',title:'워밍업 (Shift+W)',fn:'showWarmup'},
  {icon:'💪',title:'스크램블링 (Shift+C)',fn:'showScrambling'},
  {icon:'🍎',title:'영양 (Shift+N)',fn:'showNutrition'},
  {icon:'🚩',title:'핀트래커 (Shift+P)',fn:'showPinTracker'}
];
for(var i=0;i<buttons.length;i++){
  var btn=document.createElement('button');btn.className='v10-quick-btn';btn.innerHTML=buttons[i].icon;btn.title=buttons[i].title;
  btn.setAttribute('data-fn',buttons[i].fn);
  btn.addEventListener('click',function(){var fn=this.getAttribute('data-fn');if(window['_v10_'+fn])window['_v10_'+fn]()});
  container.appendChild(btn);
}
document.body.appendChild(container);
}

window._v10_showRange=showRange;
window._v10_showStats=showStats;
window._v10_showHandicapCalc=showHandicapCalc;
window._v10_showShotShape=showShotShape;
window._v10_showWarmup=showWarmup;
window._v10_showScrambling=showScrambling;
window._v10_showNutrition=showNutrition;
window._v10_showPinTracker=showPinTracker;
window._v10_showV10Quiz=showV10Quiz;
window._v10Close=function(id){closePanel(id)};

function setupV10Keyboard(){
document.addEventListener('keydown',function(e){
  if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'||e.target.tagName==='SELECT')return;
  if(e.ctrlKey||e.metaKey||e.altKey)return;
  if(!e.shiftKey)return;
  switch(e.key){
    case'R':e.preventDefault();showRange();break;
    case'T':e.preventDefault();showStats();break;
    case'H':e.preventDefault();showHandicapCalc();break;
    case'S':e.preventDefault();showShotShape();break;
    case'W':e.preventDefault();showWarmup();break;
    case'C':e.preventDefault();showScrambling();break;
    case'N':e.preventDefault();showNutrition();break;
    case'P':e.preventDefault();showPinTracker();break;
  }
});
}

// ===== CSS =====
function injectV10CSS(){
var s=document.createElement('style');
s.textContent='.v10-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.88);z-index:10003;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;pointer-events:none}.v10-overlay.active{opacity:1;pointer-events:auto}.v10-panel{background:linear-gradient(145deg,rgba(10,16,26,.98),rgba(5,8,16,.98));border:1px solid rgba(0,180,216,.2);border-radius:18px;padding:24px;max-width:640px;width:94%;max-height:85vh;overflow-y:auto;box-shadow:0 24px 80px rgba(0,0,0,.7),0 0 40px rgba(0,180,216,.06);position:relative}.v10-panel::-webkit-scrollbar{width:5px}.v10-panel::-webkit-scrollbar-thumb{background:rgba(0,180,216,.2);border-radius:3px}.v10-title{font-size:1.4em;font-weight:800;color:#00B4D8;margin-bottom:18px;letter-spacing:-0.5px}.v10-close{position:absolute;top:12px;right:16px;background:none;border:none;color:#666;font-size:1.6em;cursor:pointer;padding:4px 8px;border-radius:8px;transition:all .2s;z-index:1}.v10-close:hover{color:#ff6b6b;background:rgba(255,107,107,.1)}.v10-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:16px;margin-bottom:12px;transition:all .2s}.v10-card:hover{border-color:rgba(0,180,216,.2);background:rgba(255,255,255,.05)}.v10-card h3{color:#00B4D8;font-size:.95em;margin:0 0 8px}.v10-card p{color:#aaa;font-size:.85em;margin:0;line-height:1.6}.v10-badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:.75em;font-weight:600}.v10-badge-a{background:rgba(0,255,136,.12);color:#00FF88}.v10-badge-b{background:rgba(0,180,216,.12);color:#00B4D8}.v10-badge-c{background:rgba(255,193,7,.12);color:#FFC107}.v10-badge-d{background:rgba(255,107,107,.12);color:#ff6b6b}.v10-btn{padding:8px 16px;border:1px solid rgba(0,180,216,.25);background:rgba(0,180,216,.08);color:#00B4D8;border-radius:8px;cursor:pointer;font-size:.85em;transition:all .2s}.v10-btn:hover{background:rgba(0,180,216,.18);border-color:#00B4D8}.v10-btn.active{background:rgba(0,255,136,.12);border-color:rgba(0,255,136,.3);color:#00FF88}.v10-btn-primary{background:rgba(0,255,136,.12);border-color:rgba(0,255,136,.3);color:#00FF88}.v10-btn-primary:hover{background:rgba(0,255,136,.22)}.v10-input{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:8px 12px;color:#fff;font-size:.85em;width:100%;box-sizing:border-box}.v10-input:focus{outline:none;border-color:rgba(0,180,216,.5)}.v10-label{display:block;font-size:.72em;color:#888;margin-bottom:3px}.v10-table{width:100%;border-collapse:collapse;font-size:.82em}.v10-table th{text-align:left;padding:8px;color:#00B4D8;border-bottom:1px solid rgba(255,255,255,.08);font-weight:600}.v10-table td{padding:8px;color:#ccc;border-bottom:1px solid rgba(255,255,255,.03)}.v10-stat-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:10px 6px;text-align:center}.v10-stat-val{font-size:1.3em;font-weight:800}.v10-stat-label{font-size:.65em;color:#888;margin-top:2px}.v10-mini-stat{background:rgba(0,180,216,.06);border-radius:8px;padding:8px;text-align:center}.v10-mini-val{font-size:1.1em;font-weight:700;color:#00B4D8}.v10-mini-label{font-size:.65em;color:#888}.v10-mini-btn{padding:2px 6px;border:1px solid rgba(0,180,216,.2);background:rgba(0,180,216,.06);color:#00B4D8;border-radius:4px;cursor:pointer;font-size:.7em}.v10-mini-btn:hover{background:rgba(0,180,216,.15)}.v10-quick-actions{position:fixed;bottom:80px;right:16px;display:flex;flex-direction:column;gap:7px;z-index:999}.v10-quick-btn{width:42px;height:42px;border-radius:11px;border:1px solid rgba(0,180,216,.15);background:rgba(5,8,16,.92);color:#00B4D8;font-size:1.1em;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;backdrop-filter:blur(12px)}.v10-quick-btn:hover{background:rgba(0,180,216,.1);transform:scale(1.08);box-shadow:0 4px 16px rgba(0,180,216,.12)}.v10-toast{position:fixed;top:20px;left:50%;transform:translateX(-50%) translateY(-100px);background:rgba(0,255,136,.1);border:1px solid rgba(0,255,136,.2);color:#00FF88;padding:10px 20px;border-radius:10px;z-index:99999;transition:transform .4s;font-size:.9em;backdrop-filter:blur(12px);white-space:nowrap}.v10-toast.show{transform:translateX(-50%) translateY(0)}.v10-ach-popup{position:fixed;top:60px;left:50%;transform:translateX(-50%) translateY(-150px);z-index:100000;background:linear-gradient(135deg,rgba(10,16,26,.96),rgba(20,28,38,.96));border:1px solid rgba(0,180,216,.3);border-radius:16px;padding:14px 22px;display:flex;align-items:center;gap:14px;backdrop-filter:blur(20px);transition:transform .5s cubic-bezier(.34,1.56,.64,1);box-shadow:0 8px 32px rgba(0,0,0,.5),0 0 24px rgba(0,180,216,.1)}.v10-ach-popup.show{transform:translateX(-50%) translateY(0)}@media(max-width:480px){.v10-panel{padding:16px;max-height:92vh;width:96%}.v10-quick-actions{bottom:70px;right:8px}.v10-quick-btn{width:36px;height:36px;font-size:.95em}}';
document.head.appendChild(s);
}

// ===== INIT =====
function initV10(){
injectV10CSS();
injectV10QuickActions();
setupV10Keyboard();
setTimeout(v10CheckAch,3000);
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',initV10)}
else{setTimeout(initV10,1500)}

})();
