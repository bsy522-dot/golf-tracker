(function(){
'use strict';
var LS='gt_v8_';
var audioCtx=null;
function getAC(){if(!audioCtx)try{audioCtx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}return audioCtx}
function playSfx(type){var ac=getAC();if(!ac)return;var o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);var t=ac.currentTime;g.gain.setValueAtTime(0.1,t);switch(type){case'handicap':o.type='sine';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(784,t+0.1);o.frequency.linearRampToValueAtTime(1047,t+0.2);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'dispersion':o.type='triangle';o.frequency.setValueAtTime(392,t);o.frequency.linearRampToValueAtTime(587,t+0.15);o.frequency.linearRampToValueAtTime(784,t+0.25);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'caddie':o.type='sine';o.frequency.setValueAtTime(659,t);o.frequency.linearRampToValueAtTime(880,t+0.08);o.frequency.linearRampToValueAtTime(1175,t+0.18);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'tempo':o.type='triangle';o.frequency.setValueAtTime(440,t);g.gain.setValueAtTime(0.15,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.1);o.start(t);o.stop(t+0.12);break;case'mental':o.type='sine';o.frequency.setValueAtTime(396,t);o.frequency.linearRampToValueAtTime(528,t+0.3);g.gain.setValueAtTime(0.08,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.5);o.start(t);o.stop(t+0.5);break;case'equip':o.type='sawtooth';o.frequency.setValueAtTime(330,t);o.frequency.linearRampToValueAtTime(494,t+0.12);g.gain.setValueAtTime(0.06,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.25);o.start(t);o.stop(t+0.25);break;case'predict':o.type='sine';o.frequency.setValueAtTime(587,t);o.frequency.linearRampToValueAtTime(784,t+0.1);o.frequency.linearRampToValueAtTime(988,t+0.18);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'quiz_correct':o.type='sine';o.frequency.setValueAtTime(523,t);o.frequency.setValueAtTime(659,t+0.1);o.frequency.setValueAtTime(784,t+0.2);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'quiz_wrong':o.type='sawtooth';o.frequency.setValueAtTime(220,t);o.frequency.linearRampToValueAtTime(165,t+0.3);g.gain.setValueAtTime(0.06,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'achievement':o.type='sine';o.frequency.setValueAtTime(784,t);o.frequency.setValueAtTime(988,t+0.1);o.frequency.setValueAtTime(1175,t+0.2);o.frequency.setValueAtTime(1568,t+0.3);g.gain.exponentialRampToValueAtTime(0.01,t+0.5);o.start(t);o.stop(t+0.5);break;default:o.type='sine';o.frequency.setValueAtTime(440,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.2);o.start(t);o.stop(t+0.2)}}

function lsGet(k,d){try{var v=localStorage.getItem(LS+k);return v?JSON.parse(v):d}catch(e){return d}}
function lsSet(k,v){try{localStorage.setItem(LS+k,JSON.stringify(v))}catch(e){}}
function getShotHistory(){var keys=['gt_shotHistory','shotHistory','gt_history'];for(var i=0;i<keys.length;i++){try{var d=localStorage.getItem(keys[i]);if(d){var a=JSON.parse(d);if(Array.isArray(a)&&a.length>0)return a}}catch(e){}}if(window.shotHistory&&Array.isArray(window.shotHistory))return window.shotHistory;return[]}
function todayStr(){return new Date().toISOString().slice(0,10)}
function showToast(msg){var t=document.createElement('div');t.className='v8-toast';t.textContent=msg;document.body.appendChild(t);setTimeout(function(){t.classList.add('show')},50);setTimeout(function(){t.classList.remove('show');setTimeout(function(){t.remove()},400)},3000)}
function createOverlay(id){var ov=document.createElement('div');ov.className='v8-overlay';ov.id='v8-'+id;ov.addEventListener('click',function(e){if(e.target===ov)closePanel(id)});var pn=document.createElement('div');pn.className='v8-panel';pn.style.position='relative';ov.appendChild(pn);return pn}
function openPanel(id){var el=document.getElementById('v8-'+id);if(el)el.classList.add('active')}
function closePanel(id){var el=document.getElementById('v8-'+id);if(el)el.classList.remove('active')}
function getPanel(id){var ov=document.getElementById('v8-'+id);if(!ov){var pn=createOverlay(id);pn.id='v8-'+id+'-panel';document.body.appendChild(pn.parentElement);return pn}return ov.querySelector('.v8-panel')||ov}

// ===== 1. HANDICAP INDEX CALCULATOR (WHS) =====
function showHandicap(){
var pn=getPanel('handicap');
var rounds=lsGet('hcp_rounds',[]);
var html='<div class="v8-title">&#128203; 핸디캡 인덱스 계산기</div>';

html+='<div class="v8-card"><h3>WHS 핸디캡 시스템</h3>';
html+='<p style="margin-bottom:12px">World Handicap System 기반 핸디캡 인덱스를 계산합니다. 최근 20라운드 중 최상의 8개 디퍼런셜로 산출합니다.</p>';

if(rounds.length>0){
  var diffs=[];
  for(var i=0;i<rounds.length;i++){
    var r=rounds[i];
    var diff=(113/r.slope)*(r.score-r.rating);
    diff=Math.round(diff*10)/10;
    diffs.push({date:r.date,course:r.course,score:r.score,diff:diff});
  }
  diffs.sort(function(a,b){return a.diff-b.diff});

  var useDiffs=[];
  var numToUse=rounds.length<=5?1:rounds.length<=8?2:rounds.length<=11?3:rounds.length<=14?4:rounds.length<=16?5:rounds.length<=18?6:rounds.length<=19?7:8;
  for(var d=0;d<Math.min(numToUse,diffs.length);d++){useDiffs.push(diffs[d].diff)}

  var hcpIndex=0;
  for(var h=0;h<useDiffs.length;h++){hcpIndex+=useDiffs[h]}
  hcpIndex=Math.round(hcpIndex/useDiffs.length*10)/10;

  html+='<div style="text-align:center;margin:16px 0;padding:20px;background:linear-gradient(135deg,rgba(0,180,216,0.1),rgba(0,255,136,0.1));border-radius:14px">';
  html+='<div style="font-size:0.8em;color:#888;margin-bottom:4px">Handicap Index</div>';
  html+='<div style="font-size:3em;font-weight:800;color:#00FF88">'+hcpIndex.toFixed(1)+'</div>';
  html+='<div style="font-size:0.8em;color:#888;margin-top:4px">'+(hcpIndex<=5?'&#127942; 싱글 핸디캡퍼!':hcpIndex<=15?'&#11088; 중급 골퍼':'&#127793; 발전 가능성 충분!')+'</div>';
  html+='</div>';

  html+='<div style="margin:12px 0"><div style="font-size:0.8em;color:#888;margin-bottom:8px">디퍼런셜 분포 (사용: '+numToUse+'개 / 전체: '+rounds.length+'개)</div>';
  html+='<svg width="100%" height="120" viewBox="0 0 400 120">';
  html+='<rect x="0" y="0" width="400" height="120" fill="rgba(0,0,0,0.2)" rx="8"/>';
  var maxDiff=Math.max.apply(null,diffs.map(function(dd){return Math.abs(dd.diff)}))||30;
  for(var di=0;di<Math.min(diffs.length,20);di++){
    var bx=15+di*19;
    var bh=Math.max(diffs[di].diff/maxDiff*80,5);
    var isUsed=di<numToUse;
    html+='<rect x="'+bx+'" y="'+(100-bh)+'" width="14" height="'+bh+'" rx="3" fill="'+(isUsed?'rgba(0,255,136,0.6)':'rgba(255,255,255,0.1)')+'" />';
    html+='<text x="'+(bx+7)+'" y="115" fill="#666" font-size="7" text-anchor="middle">'+(di+1)+'</text>';
  }
  html+='</svg></div>';

  html+='<table class="v8-table"><tr><th>#</th><th>날짜</th><th>코스</th><th>스코어</th><th>디퍼런셜</th></tr>';
  for(var ri=0;ri<Math.min(rounds.length,20);ri++){
    var rd=diffs[ri];
    var used=ri<numToUse;
    html+='<tr style="'+(used?'color:#00FF88':'color:#666')+'">';
    html+='<td>'+(ri+1)+'</td><td>'+rd.date+'</td><td>'+(rd.course||'-')+'</td><td>'+rd.score+'</td><td>'+rd.diff.toFixed(1)+'</td></tr>';
  }
  html+='</table>';
}

html+='</div>';

html+='<div class="v8-card"><h3>&#10133; 라운드 추가</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">';
html+='<div><label class="v8-label">코스명</label><input id="v8-hcp-course" class="v8-input" type="text" placeholder="골프장 이름" maxlength="30"></div>';
html+='<div><label class="v8-label">스코어</label><input id="v8-hcp-score" class="v8-input" type="number" min="60" max="150" value="90"></div>';
html+='<div><label class="v8-label">코스 레이팅</label><input id="v8-hcp-rating" class="v8-input" type="number" step="0.1" min="60" max="80" value="72.0"></div>';
html+='<div><label class="v8-label">슬로프 레이팅</label><input id="v8-hcp-slope" class="v8-input" type="number" min="55" max="155" value="113"></div>';
html+='</div>';
html+='<button class="v8-btn v8-btn-primary" style="margin-top:12px;width:100%" onclick="window._v8AddHcpRound()">라운드 기록 추가</button></div>';

html+='<div class="v8-card"><h3>&#128161; 핸디캡 가이드</h3>';
html+='<table class="v8-table"><tr><th>핸디캡</th><th>수준</th><th>인구 비율</th></tr>';
html+='<tr><td>+2~5</td><td>&#127942; 스크래치~싱글</td><td>~5%</td></tr>';
html+='<tr><td>6~12</td><td>&#11088; 중상급</td><td>~15%</td></tr>';
html+='<tr><td>13~20</td><td>&#128170; 중급</td><td>~30%</td></tr>';
html+='<tr><td>21~28</td><td>&#127793; 초중급</td><td>~30%</td></tr>';
html+='<tr><td>29~36</td><td>&#9971;&#xFE0E; 입문</td><td>~20%</td></tr>';
html+='</table></div>';

pn.innerHTML='<button class="v8-close" onclick="window._v8Close(\'handicap\')">&times;</button>'+html;
openPanel('handicap');playSfx('handicap');checkAchievements();
}

window._v8AddHcpRound=function(){
var course=document.getElementById('v8-hcp-course').value.trim()||'미입력';
var score=parseInt(document.getElementById('v8-hcp-score').value)||90;
var rating=parseFloat(document.getElementById('v8-hcp-rating').value)||72.0;
var slope=parseInt(document.getElementById('v8-hcp-slope').value)||113;
var rounds=lsGet('hcp_rounds',[]);
rounds.push({date:todayStr(),course:course,score:score,rating:rating,slope:slope});
if(rounds.length>20)rounds=rounds.slice(-20);
lsSet('hcp_rounds',rounds);
playSfx('handicap');showToast('라운드 기록 추가!');showHandicap();
};

// ===== 2. SHOT DISPERSION MAP =====
function showDispersion(){
var pn=getPanel('dispersion');
var shots=getShotHistory();
var html='<div class="v8-title">&#128205; 샷 분산 맵</div>';

html+='<div class="v8-card"><h3>Shot Dispersion Pattern</h3>';
html+='<p style="margin-bottom:12px">샷 정확도와 일관성을 시각적으로 분석합니다. 원이 작을수록 정확한 골퍼입니다.</p>';

html+='<div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">';
html+='<button class="v8-btn v8-disp-filter active" data-filter="all" onclick="window._v8DispFilter(\'all\')">전체</button>';
html+='<button class="v8-btn v8-disp-filter" data-filter="driver" onclick="window._v8DispFilter(\'driver\')">드라이버</button>';
html+='<button class="v8-btn v8-disp-filter" data-filter="iron" onclick="window._v8DispFilter(\'iron\')">아이언</button>';
html+='<button class="v8-btn v8-disp-filter" data-filter="wedge" onclick="window._v8DispFilter(\'wedge\')">웨지</button>';
html+='</div>';

html+='<canvas id="v8-disp-canvas" width="500" height="400" style="width:100%;height:auto;background:rgba(0,40,0,0.3);border-radius:12px;border:1px solid rgba(0,255,136,0.1)"></canvas>';

var curveTypes={};var totalShots=shots.length||1;
for(var i=0;i<shots.length;i++){
  var ct=shots[i].curveType||'Unknown';
  curveTypes[ct]=(curveTypes[ct]||0)+1;
}

html+='<div style="margin-top:16px">';
html+='<div style="font-size:0.8em;color:#888;margin-bottom:8px">샷 형태 분포</div>';
var typeColors={Straight:'#00FF88',Draw:'#00B4D8',Fade:'#FFC107',Hook:'#ff6b6b',Slice:'#E040FB',Push:'#FF6B35',Pull:'#A855F7'};
var typeKeys=Object.keys(curveTypes).sort(function(a,b){return curveTypes[b]-curveTypes[a]});
for(var ci=0;ci<typeKeys.length;ci++){
  var ck=typeKeys[ci];
  var pct=Math.round(curveTypes[ck]/totalShots*100);
  var color=typeColors[ck]||'#888';
  html+='<div style="margin-bottom:6px;display:flex;align-items:center;gap:8px">';
  html+='<div style="width:60px;font-size:0.8em;color:'+color+';text-align:right;font-weight:600">'+ck+'</div>';
  html+='<div style="flex:1;height:12px;background:rgba(255,255,255,0.04);border-radius:4px;overflow:hidden">';
  html+='<div style="height:100%;width:'+pct+'%;background:'+color+';border-radius:4px;transition:width 0.5s"></div>';
  html+='</div>';
  html+='<div style="width:40px;font-size:0.75em;color:#888">'+pct+'%</div>';
  html+='</div>';
}
html+='</div></div>';

var straightPct=Math.round((curveTypes['Straight']||0)/totalShots*100);
var consistency=straightPct>=70?'A+':straightPct>=55?'A':straightPct>=40?'B':straightPct>=25?'C':'D';

html+='<div class="v8-grid">';
html+='<div class="v8-card v8-stat"><div class="v8-stat-num" style="color:#00FF88">'+straightPct+'%</div><div class="v8-stat-label">직선 비율</div></div>';
html+='<div class="v8-card v8-stat"><div class="v8-stat-num" style="color:#00B4D8">'+consistency+'</div><div class="v8-stat-label">일관성 등급</div></div>';
html+='<div class="v8-card v8-stat"><div class="v8-stat-num" style="color:#FFC107">'+typeKeys.length+'</div><div class="v8-stat-label">샷 유형 수</div></div>';
html+='<div class="v8-card v8-stat"><div class="v8-stat-num" style="color:#E040FB">'+shots.length+'</div><div class="v8-stat-label">분석 샷 수</div></div>';
html+='</div>';

pn.innerHTML='<button class="v8-close" onclick="window._v8Close(\'dispersion\')">&times;</button>'+html;
openPanel('dispersion');playSfx('dispersion');
setTimeout(function(){renderDispersionCanvas(shots,'all')},100);
checkAchievements();
}

function renderDispersionCanvas(shots,filter){
var canvas=document.getElementById('v8-disp-canvas');
if(!canvas)return;
var ctx=canvas.getContext('2d');
var W=500,H=400;
ctx.clearRect(0,0,W,H);

ctx.fillStyle='rgba(0,60,0,0.3)';
ctx.fillRect(0,0,W,H);

ctx.strokeStyle='rgba(255,255,255,0.05)';
ctx.lineWidth=1;
for(var g=0;g<W;g+=25){ctx.beginPath();ctx.moveTo(g,0);ctx.lineTo(g,H);ctx.stroke()}
for(var gh=0;gh<H;gh+=25){ctx.beginPath();ctx.moveTo(0,gh);ctx.lineTo(W,gh);ctx.stroke()}

var cx=W/2,cy=H*0.85;
ctx.strokeStyle='rgba(0,255,136,0.15)';
for(var r=1;r<=4;r++){
  ctx.beginPath();ctx.arc(cx,cy,r*70,Math.PI,0);ctx.stroke();
  ctx.fillStyle='rgba(0,255,136,0.3)';ctx.font='9px sans-serif';
  ctx.fillText((r*50)+'yd',cx+r*70+4,cy-4);
}

ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx,20);ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.stroke();

ctx.fillStyle='rgba(0,255,136,0.4)';
ctx.beginPath();ctx.arc(cx,cy,6,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#00FF88';ctx.font='bold 8px sans-serif';ctx.textAlign='center';
ctx.fillText('TEE',cx,cy+16);ctx.textAlign='left';

var filtered=shots;
if(filter==='driver')filtered=shots.filter(function(s){return(s.club||'').toLowerCase().indexOf('driver')!==-1||(s.club||'').indexOf('1W')!==-1||(!s.club)});
else if(filter==='iron')filtered=shots.filter(function(s){return(s.club||'').indexOf('I')!==-1||(s.club||'').indexOf('iron')!==-1});
else if(filter==='wedge')filtered=shots.filter(function(s){return(s.club||'').indexOf('W')!==-1&&(s.club||'').indexOf('1W')===-1||(s.club||'').indexOf('wedge')!==-1});

var typeColors2={Straight:'rgba(0,255,136,0.5)',Draw:'rgba(0,180,216,0.5)',Fade:'rgba(255,193,7,0.5)',Hook:'rgba(255,107,107,0.5)',Slice:'rgba(224,64,251,0.5)',Push:'rgba(255,107,53,0.5)',Pull:'rgba(168,85,247,0.5)'};

for(var si=0;si<Math.min(filtered.length,100);si++){
  var s=filtered[si];
  var dist=((s.speed||s.maxSpeed||50)*1.2)||100;
  var angle=0;
  var ct2=s.curveType||'Straight';
  if(ct2==='Draw'||ct2==='draw')angle=-0.15-Math.random()*0.1;
  else if(ct2==='Fade'||ct2==='fade')angle=0.15+Math.random()*0.1;
  else if(ct2==='Hook'||ct2==='hook')angle=-0.35-Math.random()*0.15;
  else if(ct2==='Slice'||ct2==='slice')angle=0.35+Math.random()*0.15;
  else if(ct2==='Push'||ct2==='push')angle=0.2+Math.random()*0.1;
  else if(ct2==='Pull'||ct2==='pull')angle=-0.2-Math.random()*0.1;
  else angle=(Math.random()-0.5)*0.08;
  angle+=(Math.random()-0.5)*0.05;

  var normDist=Math.min(dist/300,1);
  var px=cx+Math.sin(angle)*normDist*250;
  var py=cy-Math.cos(angle)*normDist*280;

  ctx.fillStyle=typeColors2[ct2]||'rgba(255,255,255,0.3)';
  ctx.beginPath();ctx.arc(px,py,4,0,Math.PI*2);ctx.fill();
}

if(filtered.length>0){
  ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='10px sans-serif';
  ctx.fillText(filtered.length+' shots ('+filter+')',10,20);
}
}

window._v8DispFilter=function(filter){
var btns=document.querySelectorAll('.v8-disp-filter');
for(var i=0;i<btns.length;i++){btns[i].classList.toggle('active',btns[i].getAttribute('data-filter')===filter)}
renderDispersionCanvas(getShotHistory(),filter);
};

// ===== 3. VIRTUAL CADDIE AI =====
var CADDIE_CLUBS=[
{name:'Driver',dist:230,loft:10.5,use:'티샷 (Par 4/5)'},
{name:'3W',dist:210,loft:15,use:'롱 세컨드샷'},
{name:'5W',dist:195,loft:18,use:'파 5 세컨드'},
{name:'4H',dist:185,loft:22,use:'롱 어프로치'},
{name:'5I',dist:170,loft:25,use:'미들 어프로치'},
{name:'6I',dist:160,loft:28,use:'미들 어프로치'},
{name:'7I',dist:150,loft:32,use:'숏~미들 어프로치'},
{name:'8I',dist:140,loft:36,use:'숏 어프로치'},
{name:'9I',dist:130,loft:40,use:'숏 어프로치'},
{name:'PW',dist:120,loft:44,use:'숏 어프로치/칩'},
{name:'GW',dist:100,loft:50,use:'피치/칩'},
{name:'SW',dist:80,loft:56,use:'벙커/칩'},
{name:'LW',dist:60,loft:60,use:'롭샷/벙커'}
];

function showVirtualCaddie(){
var pn=getPanel('caddie');
var html='<div class="v8-title">&#129302; 버추얼 캐디 AI</div>';

html+='<div class="v8-card"><h3>스마트 클럽 추천</h3>';
html+='<p style="margin-bottom:12px">거리, 날씨, 지형 조건을 입력하면 최적의 클럽과 전략을 추천합니다.</p>';

html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';
html+='<div><label class="v8-label">남은 거리 (yd)</label><input id="v8-cad-dist" class="v8-input" type="number" min="30" max="300" value="150"></div>';
html+='<div><label class="v8-label">라이</label><select id="v8-cad-lie" class="v8-input"><option value="fairway">페어웨이</option><option value="rough">러프</option><option value="bunker">벙커</option><option value="deeprough">딥러프</option><option value="uphill">오르막</option><option value="downhill">내리막</option></select></div>';
html+='<div><label class="v8-label">풍속 (km/h)</label><input id="v8-cad-wind" class="v8-input" type="number" min="0" max="60" value="10"></div>';
html+='<div><label class="v8-label">풍향</label><select id="v8-cad-winddir" class="v8-input"><option value="head">맞바람</option><option value="tail">뒷바람</option><option value="left">좌풍</option><option value="right">우풍</option></select></div>';
html+='<div><label class="v8-label">핀 위치</label><select id="v8-cad-pin" class="v8-input"><option value="center">중앙</option><option value="front">앞</option><option value="back">뒤</option><option value="left">좌측</option><option value="right">우측</option></select></div>';
html+='<div><label class="v8-label">해저드</label><select id="v8-cad-hazard" class="v8-input"><option value="none">없음</option><option value="water_front">앞 워터</option><option value="water_back">뒤 워터</option><option value="bunker_front">앞 벙커</option><option value="bunker_back">뒤 벙커</option></select></div>';
html+='</div>';
html+='<button class="v8-btn v8-btn-primary" style="margin-top:12px;width:100%" onclick="window._v8AskCaddie()">캐디에게 물어보기</button></div>';

html+='<div id="v8-caddie-result"></div>';

html+='<div class="v8-card"><h3>&#128218; 클럽별 특성 가이드</h3>';
html+='<table class="v8-table"><tr><th>클럽</th><th>거리</th><th>로프트</th><th>용도</th></tr>';
for(var i=0;i<CADDIE_CLUBS.length;i++){
  var c=CADDIE_CLUBS[i];
  html+='<tr><td style="font-weight:600;color:#00FF88">'+c.name+'</td><td>'+c.dist+'yd</td><td>'+c.loft+'&deg;</td><td style="font-size:0.8em;color:#aaa">'+c.use+'</td></tr>';
}
html+='</table></div>';

pn.innerHTML='<button class="v8-close" onclick="window._v8Close(\'caddie\')">&times;</button>'+html;
openPanel('caddie');playSfx('caddie');checkAchievements();
}

window._v8AskCaddie=function(){
var dist=parseInt(document.getElementById('v8-cad-dist').value)||150;
var lie=document.getElementById('v8-cad-lie').value;
var wind=parseInt(document.getElementById('v8-cad-wind').value)||0;
var windDir=document.getElementById('v8-cad-winddir').value;
var pin=document.getElementById('v8-cad-pin').value;
var hazard=document.getElementById('v8-cad-hazard').value;

var adjustedDist=dist;
var adjustments=[];

if(windDir==='head'&&wind>5){adjustedDist+=wind*0.5;adjustments.push('맞바람 +'+Math.round(wind*0.5)+'yd')}
if(windDir==='tail'&&wind>5){adjustedDist-=wind*0.3;adjustments.push('뒷바람 -'+Math.round(wind*0.3)+'yd')}
if(lie==='rough'){adjustedDist+=10;adjustments.push('러프 +10yd')}
if(lie==='deeprough'){adjustedDist+=20;adjustments.push('딥러프 +20yd')}
if(lie==='bunker'){adjustedDist+=15;adjustments.push('벙커 +15yd')}
if(lie==='uphill'){adjustedDist+=10;adjustments.push('오르막 +10yd')}
if(lie==='downhill'){adjustedDist-=10;adjustments.push('내리막 -10yd')}
if(pin==='back'){adjustedDist+=5;adjustments.push('뒤핀 +5yd')}
if(pin==='front'){adjustedDist-=5;adjustments.push('앞핀 -5yd')}

var userDists=null;
try{var ud=localStorage.getItem('gt_v7_club_distances');if(ud)userDists=JSON.parse(ud)}catch(e){}

var clubs=CADDIE_CLUBS.map(function(c){
  var d=userDists&&userDists[c.name]?userDists[c.name]:c.dist;
  return{name:c.name,dist:d,diff:Math.abs(d-adjustedDist)};
});
clubs.sort(function(a,b){return a.diff-b.diff});

var primary=clubs[0];
var alt1=clubs[1];
var alt2=clubs[2];

var strategy='';var confidence=90;
if(hazard==='water_front'||hazard==='bunker_front'){
  strategy='&#9888;&#xFE0E; 앞에 해저드가 있으므로 클럽 1개 더 잡고 그린 뒤쪽을 공략하세요.';
  confidence=75;
  if(primary.dist<adjustedDist&&alt1)primary=clubs.find(function(c){return c.dist>=adjustedDist})||alt1;
}else if(hazard==='water_back'||hazard==='bunker_back'){
  strategy='&#9888;&#xFE0E; 뒤에 해저드가 있으므로 클럽 1개 짧게 잡고 그린 앞쪽을 공략하세요.';
  confidence=75;
}else{
  strategy='&#9989; 표준 공략입니다. '+primary.name+'으로 타겟 정면을 노리세요.';
  confidence=Math.max(60,90-primary.diff*2);
}

if(wind>25){strategy+=' <span style="color:#ff6b6b">강풍 주의 &mdash; 3/4 스윙 추천.</span>';confidence-=10}
if(lie==='deeprough'){strategy+=' <span style="color:#FFC107">딥러프에서는 로프트가 높은 클럽이 안전합니다.</span>'}

var html='<div class="v8-card" style="border-left:3px solid #00FF88">';
html+='<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">';
html+='<div style="width:56px;height:56px;border-radius:14px;background:linear-gradient(135deg,rgba(0,255,136,0.15),rgba(0,180,216,0.15));display:flex;align-items:center;justify-content:center;font-size:1.6em">&#129302;</div>';
html+='<div><div style="font-size:1.3em;font-weight:800;color:#00FF88">'+primary.name+'</div>';
html+='<div style="font-size:0.8em;color:#888">추천 신뢰도: '+Math.round(confidence)+'%</div></div>';
html+='</div>';

if(adjustments.length>0){
  html+='<div style="margin-bottom:10px">';
  for(var ai=0;ai<adjustments.length;ai++){html+='<span class="v8-badge v8-badge-b" style="margin:2px">'+adjustments[ai]+'</span> '}
  html+='</div>';
}

html+='<div style="padding:10px;background:rgba(0,180,216,0.06);border-radius:8px;margin-bottom:12px">';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;text-align:center">';
html+='<div><div style="font-size:0.7em;color:#888">원래 거리</div><div style="font-size:1.1em;font-weight:700">'+dist+'yd</div></div>';
html+='<div><div style="font-size:0.7em;color:#888">보정 거리</div><div style="font-size:1.1em;font-weight:700;color:#00B4D8">'+Math.round(adjustedDist)+'yd</div></div>';
html+='<div><div style="font-size:0.7em;color:#888">클럽 거리</div><div style="font-size:1.1em;font-weight:700;color:#00FF88">'+primary.dist+'yd</div></div>';
html+='</div></div>';

html+='<p style="line-height:1.6">'+strategy+'</p>';

html+='<div style="margin-top:12px;padding:10px;background:rgba(255,255,255,0.02);border-radius:8px">';
html+='<div style="font-size:0.8em;color:#888;margin-bottom:6px">대안 클럽</div>';
html+='<div style="display:flex;gap:8px">';
html+='<span class="v8-badge v8-badge-c">'+alt1.name+' ('+alt1.dist+'yd)</span>';
html+='<span class="v8-badge v8-badge-c">'+alt2.name+' ('+alt2.dist+'yd)</span>';
html+='</div></div>';
html+='</div>';

document.getElementById('v8-caddie-result').innerHTML=html;
playSfx('caddie');
};

// ===== 4. SWING TEMPO TRAINER =====
var tempoInterval=null;var tempoBeats=0;var tempoBPM=72;var tempoPhase='idle';
function showTempoTrainer(){
var pn=getPanel('tempo');
var bestTempos=lsGet('tempo_records',[]);
var html='<div class="v8-title">&#127926; 스윙 템포 트레이너</div>';

html+='<div class="v8-card"><h3>이상적인 스윙 템포</h3>';
html+='<p>PGA Tour 프로들의 평균 백스윙:다운스윙 비율은 <strong style="color:#00FF88">3:1</strong>입니다. 72 BPM에서 백스윙 3박, 다운스윙 1박이 이상적입니다.</p></div>';

html+='<div class="v8-card" style="text-align:center">';
html+='<div style="margin-bottom:16px">';
html+='<label class="v8-label">BPM: <span id="v8-tempo-bpm-label">'+tempoBPM+'</span></label>';
html+='<input type="range" id="v8-tempo-bpm" min="50" max="100" value="'+tempoBPM+'" oninput="window._v8TempoBPM(this.value)" style="width:100%">';
html+='<div style="display:flex;justify-content:space-between;font-size:0.7em;color:#666"><span>느림 50</span><span>보통 72</span><span>빠름 100</span></div>';
html+='</div>';

html+='<div style="display:flex;gap:12px;justify-content:center;margin-bottom:16px">';
html+='<button class="v8-btn" onclick="window._v8SetPreset(60)">Slow (60)</button>';
html+='<button class="v8-btn v8-btn-primary" onclick="window._v8SetPreset(72)">Normal (72)</button>';
html+='<button class="v8-btn" onclick="window._v8SetPreset(84)">Fast (84)</button>';
html+='</div>';

html+='<div id="v8-tempo-visual" style="margin:20px auto;width:200px;height:200px;border-radius:50%;border:3px solid rgba(0,255,136,0.2);display:flex;align-items:center;justify-content:center;position:relative">';
html+='<div id="v8-tempo-circle" style="width:40px;height:40px;border-radius:50%;background:#00FF88;transition:transform 0.15s,background 0.15s"></div>';
html+='<div id="v8-tempo-label" style="position:absolute;bottom:-30px;width:100%;text-align:center;font-size:0.9em;color:#888">대기 중</div>';
html+='</div>';

html+='<div style="display:flex;gap:8px;justify-content:center;margin-top:24px">';
html+='<button id="v8-tempo-start" class="v8-btn v8-btn-primary" onclick="window._v8TempoStart()" style="padding:12px 32px;font-size:1em">&#9654; 시작</button>';
html+='<button id="v8-tempo-stop" class="v8-btn" onclick="window._v8TempoStop()" style="padding:12px 32px;font-size:1em;display:none">&#9724; 정지</button>';
html+='</div>';

html+='<div style="margin-top:16px">';
html+='<div style="display:flex;gap:4px;justify-content:center" id="v8-tempo-beats">';
for(var b=0;b<4;b++){
  html+='<div class="v8-tempo-dot" id="v8-beat-'+b+'" style="width:20px;height:20px;border-radius:50%;border:2px solid rgba(255,255,255,0.1);transition:all 0.15s"></div>';
}
html+='</div>';
html+='<div style="margin-top:8px;font-size:0.75em;color:#666">백스윙(1-2-3) &rarr; 다운스윙(4)</div>';
html+='</div></div>';

html+='<div class="v8-card"><h3>&#128218; 템포 가이드</h3>';
html+='<table class="v8-table"><tr><th>BPM</th><th>스타일</th><th>적합한 골퍼</th></tr>';
html+='<tr><td>55~65</td><td>Ernie Els 스타일</td><td>유연한 스윙, 시니어</td></tr>';
html+='<tr><td>66~76</td><td>&#11088; 표준 (추천)</td><td>대부분의 아마추어</td></tr>';
html+='<tr><td>77~85</td><td>Tiger Woods 스타일</td><td>빠른 스윙, 파워형</td></tr>';
html+='<tr><td>86~100</td><td>Nick Price 스타일</td><td>고급자, 속도형</td></tr>';
html+='</table></div>';

if(bestTempos.length>0){
  html+='<div class="v8-card"><h3>연습 기록</h3>';
  html+='<div style="font-size:0.85em;color:#aaa">';
  for(var ti=Math.max(0,bestTempos.length-5);ti<bestTempos.length;ti++){
    var tr=bestTempos[ti];
    html+='<div style="margin-bottom:4px">'+tr.date+' &mdash; '+tr.bpm+' BPM, '+tr.swings+'회 연습</div>';
  }
  html+='</div></div>';
}

pn.innerHTML='<button class="v8-close" onclick="window._v8Close(\'tempo\')">&times;</button>'+html;
openPanel('tempo');playSfx('tempo');checkAchievements();
}

window._v8TempoBPM=function(v){tempoBPM=parseInt(v);var l=document.getElementById('v8-tempo-bpm-label');if(l)l.textContent=tempoBPM};
window._v8SetPreset=function(bpm){tempoBPM=bpm;var sl=document.getElementById('v8-tempo-bpm');if(sl)sl.value=bpm;var l=document.getElementById('v8-tempo-bpm-label');if(l)l.textContent=bpm};

window._v8TempoStart=function(){
if(tempoInterval)return;
tempoBeats=0;tempoPhase='running';
var startBtn=document.getElementById('v8-tempo-start');
var stopBtn=document.getElementById('v8-tempo-stop');
if(startBtn)startBtn.style.display='none';
if(stopBtn)stopBtn.style.display='inline-block';
var ms=60000/tempoBPM;
tempoInterval=setInterval(function(){
  var beatIdx=tempoBeats%4;
  var circle=document.getElementById('v8-tempo-circle');
  var label=document.getElementById('v8-tempo-label');
  for(var b=0;b<4;b++){
    var dot=document.getElementById('v8-beat-'+b);
    if(dot){dot.style.background=b===beatIdx?(b<3?'#00FF88':'#ff6b6b'):'transparent';dot.style.borderColor=b===beatIdx?(b<3?'#00FF88':'#ff6b6b'):'rgba(255,255,255,0.1)'}
  }
  if(beatIdx<3){
    if(circle){circle.style.transform='scale('+(1+beatIdx*0.3)+')';circle.style.background='#00FF88'}
    if(label)label.textContent='백스윙 '+(beatIdx+1);
    playSfx('tempo');
  }else{
    if(circle){circle.style.transform='scale(0.8)';circle.style.background='#ff6b6b'}
    if(label)label.textContent='다운스윙!';
    playSfx('tempo');
  }
  tempoBeats++;
},ms);
};

window._v8TempoStop=function(){
if(tempoInterval){clearInterval(tempoInterval);tempoInterval=null}
tempoPhase='idle';
var startBtn=document.getElementById('v8-tempo-start');
var stopBtn=document.getElementById('v8-tempo-stop');
if(startBtn)startBtn.style.display='inline-block';
if(stopBtn)stopBtn.style.display='none';
var circle=document.getElementById('v8-tempo-circle');
var label=document.getElementById('v8-tempo-label');
if(circle){circle.style.transform='scale(1)';circle.style.background='#00FF88'}
if(label)label.textContent='대기 중';
for(var b=0;b<4;b++){var dot=document.getElementById('v8-beat-'+b);if(dot){dot.style.background='transparent';dot.style.borderColor='rgba(255,255,255,0.1)'}}
var swings=Math.floor(tempoBeats/4);
if(swings>0){
  var records=lsGet('tempo_records',[]);
  records.push({date:todayStr(),bpm:tempoBPM,swings:swings});
  if(records.length>20)records=records.slice(-20);
  lsSet('tempo_records',records);
  showToast(swings+'회 스윙 템포 연습 완료!');
}
tempoBeats=0;
};

// ===== 5. MENTAL GAME TOOLKIT =====
var MENTAL_ROUTINES=[
{name:'프리샷 루틴',icon:'&#127919;',duration:'30초',steps:['타겟 확인 (뒤에서 라인 확인)','중간 목표 설정 (볼 앞 1m 지점)','어드레스 &amp; 왜글 1~2회','마지막 타겟 확인 후 즉시 스윙','결과에 무관하게 2초간 자세 유지']},
{name:'호흡 리셋',icon:'&#127756;',duration:'60초',steps:['4초간 코로 깊게 들이마시기','4초간 숨 참기','6초간 입으로 천천히 내쉬기','3회 반복','마지막에 &quot;다음 샷에 집중&quot; 자기 암시']},
{name:'시각화 훈련',icon:'&#128065;&#xFE0E;',duration:'20초',steps:['눈을 감고 완벽한 샷 상상','볼이 높이 날아가는 궤적 시각화','그린에 정확히 안착하는 장면','볼이 구르며 홀에 빨려들어가는 장면','눈을 뜨고 실제로 그대로 실행']},
{name:'분노 관리',icon:'&#128545;',duration:'15초',steps:['10yd 앞으로 걸어가기','심호흡 3회','&quot;다음 샷이 중요하다&quot; 반복','클럽을 내려놓고 5초 대기','미소 짓고 새로운 마음으로 시작']},
{name:'자신감 빌더',icon:'&#128170;',duration:'10초',steps:['최근 최고의 샷 떠올리기','&quot;나는 이 샷을 칠 수 있다&quot;','어깨를 펴고 당당하게 서기','클럽을 자신있게 잡기','집중!']}
];

var SCORING_ZONES=[
{zone:'Green Zone (1~5)',range:'1~5번 홀',desc:'워밍업 존. 안전한 플레이, 페어웨이 중앙 공략.',mindset:'보기는 OK, 파는 보너스. 신체 풀기에 집중.'},
{zone:'Momentum Zone (6~9)',range:'6~9번 홀',desc:'몸이 풀린 상태. 공격적 플레이 가능.',mindset:'버디 기회를 잡되, 무리하지 않기.'},
{zone:'Turn Zone (10~12)',range:'10~12번 홀',desc:'후반 시작. 집중력 재충전 필요.',mindset:'전반 스코어를 잊고, 새로운 라운드로 시작.'},
{zone:'Scoring Zone (13~15)',range:'13~15번 홀',desc:'스코어 결정 구간. 최고 집중.',mindset:'매 샷을 루틴대로. 결과보다 과정에 집중.'},
{zone:'Finish Zone (16~18)',range:'16~18번 홀',desc:'마무리 구간. 긴장 관리가 핵심.',mindset:'&quot;한 번에 한 샷&quot; &mdash; 남은 홀이 아닌 이 샷에만 집중.'}
];

function showMentalGame(){
var pn=getPanel('mental');
var html='<div class="v8-title">&#129504; 멘탈 게임 코칭</div>';

html+='<div class="v8-card"><h3>라운드 심리 관리</h3>';
html+='<p>골프의 90%는 멘탈입니다. 프로 수준의 심리 기법으로 스코어를 낮추세요.</p></div>';

for(var i=0;i<MENTAL_ROUTINES.length;i++){
  var mr=MENTAL_ROUTINES[i];
  html+='<div class="v8-card">';
  html+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">';
  html+='<h3>'+mr.icon+' '+mr.name+'</h3>';
  html+='<span class="v8-badge v8-badge-b">'+mr.duration+'</span>';
  html+='</div>';
  html+='<ol style="margin:0 0 0 18px;color:#aaa;font-size:0.85em;line-height:1.9">';
  for(var s=0;s<mr.steps.length;s++){html+='<li>'+mr.steps[s]+'</li>'}
  html+='</ol></div>';
}

html+='<div class="v8-card"><h3>&#127959;&#xFE0E; 스코어링 존 전략</h3>';
html+='<p style="margin-bottom:12px">18홀을 5개 존으로 나누어 각 구간에 맞는 마인드셋을 유지하세요.</p>';
for(var z=0;z<SCORING_ZONES.length;z++){
  var sz=SCORING_ZONES[z];
  html+='<div style="padding:10px;margin-bottom:8px;background:rgba(0,180,216,0.04);border-radius:8px;border-left:3px solid rgba(0,180,216,0.3)">';
  html+='<div style="font-weight:700;color:#00B4D8;font-size:0.9em">'+sz.zone+'</div>';
  html+='<div style="font-size:0.82em;color:#aaa;margin-top:4px">'+sz.desc+'</div>';
  html+='<div style="font-size:0.82em;color:#00FF88;margin-top:4px;font-style:italic">'+sz.mindset+'</div>';
  html+='</div>';
}
html+='</div>';

html+='<div class="v8-card"><h3>&#128172; 라운드 중 자기 대화</h3>';
var selfTalks=[
  {bad:'&quot;또 슬라이스...&quot;',good:'&quot;다음 샷에서 그립을 확인하자&quot;'},
  {bad:'&quot;이 홀은 항상 안 돼&quot;',good:'&quot;오늘은 새로운 기회다&quot;'},
  {bad:'&quot;3퍼트를 했어...&quot;',good:'&quot;다음 홀에서 만회하자&quot;'},
  {bad:'&quot;오늘 컨디션이 최악&quot;',good:'&quot;적응하면서 플레이하자&quot;'},
  {bad:'&quot;동반자가 잘 치니까 긴장돼&quot;',good:'&quot;내 게임에만 집중하자&quot;'}
];
html+='<table class="v8-table"><tr><th style="color:#ff6b6b">&#10060; 나쁜 자기 대화</th><th style="color:#00FF88">&#9989; 좋은 자기 대화</th></tr>';
for(var st=0;st<selfTalks.length;st++){
  html+='<tr><td style="color:#ff6b6b;font-size:0.85em">'+selfTalks[st].bad+'</td><td style="color:#00FF88;font-size:0.85em">'+selfTalks[st].good+'</td></tr>';
}
html+='</table></div>';

pn.innerHTML='<button class="v8-close" onclick="window._v8Close(\'mental\')">&times;</button>'+html;
openPanel('mental');playSfx('mental');checkAchievements();
}

// ===== 6. EQUIPMENT MANAGER =====
function showEquipment(){
var pn=getPanel('equip');
var bag=lsGet('equipment_bag',[
  {name:'Driver',brand:'',shaft:'Graphite',flex:'Regular',loft:'10.5',gripsAge:0,rounds:0},
  {name:'3 Wood',brand:'',shaft:'Graphite',flex:'Regular',loft:'15',gripsAge:0,rounds:0},
  {name:'5 Iron',brand:'',shaft:'Steel',flex:'Regular',loft:'25',gripsAge:0,rounds:0},
  {name:'7 Iron',brand:'',shaft:'Steel',flex:'Regular',loft:'32',gripsAge:0,rounds:0},
  {name:'PW',brand:'',shaft:'Steel',flex:'Regular',loft:'44',gripsAge:0,rounds:0},
  {name:'SW',brand:'',shaft:'Steel',flex:'Regular',loft:'56',gripsAge:0,rounds:0},
  {name:'Putter',brand:'',shaft:'Steel',flex:'-',loft:'3',gripsAge:0,rounds:0}
]);

var html='<div class="v8-title">&#127991;&#xFE0E; 장비 관리</div>';

html+='<div class="v8-card"><h3>내 골프백</h3>';
html+='<p style="margin-bottom:12px">클럽 '+(bag.length)+'/14개 &mdash; 클릭하여 상세 정보를 수정하세요.</p>';

var gripWarning=false;
for(var i=0;i<bag.length;i++){
  var club=bag[i];
  var gripPct=Math.min(100,Math.round(club.rounds/40*100));
  var gripColor=gripPct>=80?'#ff6b6b':gripPct>=50?'#FFC107':'#00FF88';
  if(gripPct>=80)gripWarning=true;

  html+='<div class="v8-card" style="padding:12px;margin-bottom:8px">';
  html+='<div style="display:flex;justify-content:space-between;align-items:center">';
  html+='<div>';
  html+='<div style="font-weight:700;color:#00FF88;font-size:0.95em">'+club.name+'</div>';
  html+='<div style="font-size:0.75em;color:#888;margin-top:2px">'+(club.brand||'브랜드 미입력')+' | '+club.shaft+' | '+club.flex+' | '+club.loft+'&deg;</div>';
  html+='</div>';
  html+='<div style="text-align:right">';
  html+='<div style="font-size:0.7em;color:#888">그립 상태</div>';
  html+='<div style="width:60px;height:6px;background:rgba(255,255,255,0.06);border-radius:3px;overflow:hidden;margin-top:4px">';
  html+='<div style="height:100%;width:'+gripPct+'%;background:'+gripColor+';border-radius:3px"></div>';
  html+='</div>';
  html+='<div style="font-size:0.65em;color:'+gripColor+';margin-top:2px">'+club.rounds+'/40 라운드</div>';
  html+='</div>';
  html+='</div></div>';
}

if(gripWarning){
  html+='<div class="v8-card" style="border-left:3px solid #ff6b6b"><h3 style="color:#ff6b6b">&#9888;&#xFE0E; 그립 교체 권장</h3>';
  html+='<p>40라운드 이상 사용된 그립은 성능이 저하됩니다. 그립 교체를 권장합니다.</p></div>';
}
html+='</div>';

html+='<div class="v8-card"><h3>&#10133; 클럽 추가/수정</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">';
html+='<div><label class="v8-label">클럽 이름</label><input id="v8-eq-name" class="v8-input" type="text" placeholder="예: 7 Iron" maxlength="20"></div>';
html+='<div><label class="v8-label">브랜드</label><input id="v8-eq-brand" class="v8-input" type="text" placeholder="예: Titleist" maxlength="20"></div>';
html+='<div><label class="v8-label">샤프트</label><select id="v8-eq-shaft" class="v8-input"><option value="Steel">Steel</option><option value="Graphite">Graphite</option></select></div>';
html+='<div><label class="v8-label">플렉스</label><select id="v8-eq-flex" class="v8-input"><option value="Ladies">Ladies</option><option value="Senior">Senior</option><option value="Regular">Regular</option><option value="Stiff">Stiff</option><option value="X-Stiff">X-Stiff</option></select></div>';
html+='<div><label class="v8-label">로프트 (&deg;)</label><input id="v8-eq-loft" class="v8-input" type="number" min="1" max="64" value="30"></div>';
html+='<div><label class="v8-label">사용 라운드</label><input id="v8-eq-rounds" class="v8-input" type="number" min="0" max="500" value="0"></div>';
html+='</div>';
html+='<button class="v8-btn v8-btn-primary" style="margin-top:12px;width:100%" onclick="window._v8AddClub()">클럽 추가</button></div>';

html+='<div class="v8-card"><h3>&#128197; 라운드 후 업데이트</h3>';
html+='<button class="v8-btn" style="width:100%" onclick="window._v8RoundPlayed()">라운드 1회 사용 기록</button>';
html+='<p style="font-size:0.75em;color:#666;margin-top:6px">모든 클럽의 그립 사용 횟수가 +1 됩니다.</p></div>';

pn.innerHTML='<button class="v8-close" onclick="window._v8Close(\'equip\')">&times;</button>'+html;
openPanel('equip');playSfx('equip');checkAchievements();
}

window._v8AddClub=function(){
var name=document.getElementById('v8-eq-name').value.trim();
if(!name){showToast('클럽 이름을 입력하세요');return}
var bag=lsGet('equipment_bag',[]);
if(bag.length>=14){showToast('최대 14개 클럽까지 가능합니다');return}
bag.push({
  name:name,
  brand:document.getElementById('v8-eq-brand').value.trim(),
  shaft:document.getElementById('v8-eq-shaft').value,
  flex:document.getElementById('v8-eq-flex').value,
  loft:document.getElementById('v8-eq-loft').value,
  gripsAge:0,
  rounds:parseInt(document.getElementById('v8-eq-rounds').value)||0
});
lsSet('equipment_bag',bag);
playSfx('equip');showToast(name+' 추가 완료!');showEquipment();
};

window._v8RoundPlayed=function(){
var bag=lsGet('equipment_bag',[]);
for(var i=0;i<bag.length;i++){bag[i].rounds=(bag[i].rounds||0)+1}
lsSet('equipment_bag',bag);
playSfx('equip');showToast('라운드 기록 업데이트!');showEquipment();
};

// ===== 7. SCORE PREDICTOR =====
function showScorePredictor(){
var pn=getPanel('predict');
var html='<div class="v8-title">&#128302; 스코어 예측기</div>';

html+='<div class="v8-card"><h3>AI 스코어 예측</h3>';
html+='<p style="margin-bottom:12px">오늘의 컨디션과 코스 난이도를 기반으로 예상 스코어를 예측합니다.</p>';

html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">';
html+='<div><label class="v8-label">최근 평균 스코어</label><input id="v8-pred-avg" class="v8-input" type="number" min="60" max="150" value="90"></div>';
html+='<div><label class="v8-label">코스 난이도</label><select id="v8-pred-diff" class="v8-input"><option value="easy">쉬움 (슬로프 &lt;110)</option><option value="medium" selected>보통 (슬로프 110~125)</option><option value="hard">어려움 (슬로프 126~140)</option><option value="extreme">매우 어려움 (슬로프 &gt;140)</option></select></div>';
html+='<div><label class="v8-label">오늘 컨디션</label><select id="v8-pred-cond" class="v8-input"><option value="great">최상</option><option value="good" selected>좋음</option><option value="normal">보통</option><option value="bad">나쁨</option></select></div>';
html+='<div><label class="v8-label">날씨</label><select id="v8-pred-weather" class="v8-input"><option value="perfect">쾌청</option><option value="good" selected>맑음</option><option value="windy">바람</option><option value="rain">비</option></select></div>';
html+='<div><label class="v8-label">연습량 (이번 주)</label><select id="v8-pred-practice" class="v8-input"><option value="heavy">충분 (4일+)</option><option value="moderate" selected>보통 (2~3일)</option><option value="light">부족 (1일 이하)</option></select></div>';
html+='<div><label class="v8-label">라운드 경험</label><select id="v8-pred-exp" class="v8-input"><option value="familiar">익숙한 코스</option><option value="visited" selected>방문 경험 있음</option><option value="first">첫 라운드</option></select></div>';
html+='</div>';
html+='<button class="v8-btn v8-btn-primary" style="margin-top:12px;width:100%" onclick="window._v8PredictScore()">스코어 예측</button></div>';

html+='<div id="v8-predict-result"></div>';

pn.innerHTML='<button class="v8-close" onclick="window._v8Close(\'predict\')">&times;</button>'+html;
openPanel('predict');playSfx('predict');checkAchievements();
}

window._v8PredictScore=function(){
var avg=parseInt(document.getElementById('v8-pred-avg').value)||90;
var diff=document.getElementById('v8-pred-diff').value;
var cond=document.getElementById('v8-pred-cond').value;
var weather=document.getElementById('v8-pred-weather').value;
var practice=document.getElementById('v8-pred-practice').value;
var exp=document.getElementById('v8-pred-exp').value;

var adjustment=0;var factors=[];

var diffAdj={easy:-2,medium:0,hard:3,extreme:6};
adjustment+=diffAdj[diff]||0;
if(diffAdj[diff]!==0)factors.push({name:'코스 난이도',val:(diffAdj[diff]>0?'+':'')+diffAdj[diff]});

var condAdj={great:-3,good:-1,normal:0,bad:3};
adjustment+=condAdj[cond]||0;
if(condAdj[cond]!==0)factors.push({name:'컨디션',val:(condAdj[cond]>0?'+':'')+condAdj[cond]});

var weatherAdj={perfect:-1,good:0,windy:2,rain:4};
adjustment+=weatherAdj[weather]||0;
if(weatherAdj[weather]!==0)factors.push({name:'날씨',val:(weatherAdj[weather]>0?'+':'')+weatherAdj[weather]});

var practiceAdj={heavy:-2,moderate:0,light:2};
adjustment+=practiceAdj[practice]||0;
if(practiceAdj[practice]!==0)factors.push({name:'연습량',val:(practiceAdj[practice]>0?'+':'')+practiceAdj[practice]});

var expAdj={familiar:-2,visited:0,first:3};
adjustment+=expAdj[exp]||0;
if(expAdj[exp]!==0)factors.push({name:'코스 경험',val:(expAdj[exp]>0?'+':'')+expAdj[exp]});

var predicted=avg+adjustment;
var bestCase=predicted-3;
var worstCase=predicted+5;
var scoreToPar=predicted-72;

var html='<div class="v8-card" style="text-align:center;background:linear-gradient(135deg,rgba(0,180,216,0.08),rgba(0,255,136,0.08))">';
html+='<div style="font-size:0.8em;color:#888;margin-bottom:4px">예상 스코어</div>';
html+='<div style="font-size:3.5em;font-weight:800;color:'+(predicted<=80?'#00FF88':predicted<=90?'#00B4D8':predicted<=100?'#FFC107':'#ff6b6b')+'">'+predicted+'</div>';
html+='<div style="font-size:0.9em;color:#888;margin-top:4px">'+(scoreToPar>0?'+':'')+scoreToPar+' (Par 72 기준)</div>';

html+='<div style="display:flex;justify-content:center;gap:24px;margin-top:16px">';
html+='<div><div style="font-size:0.7em;color:#888">Best Case</div><div style="font-size:1.5em;font-weight:700;color:#00FF88">'+bestCase+'</div></div>';
html+='<div><div style="font-size:0.7em;color:#888">Expected</div><div style="font-size:1.5em;font-weight:700;color:#00B4D8">'+predicted+'</div></div>';
html+='<div><div style="font-size:0.7em;color:#888">Worst Case</div><div style="font-size:1.5em;font-weight:700;color:#ff6b6b">'+worstCase+'</div></div>';
html+='</div></div>';

if(factors.length>0){
  html+='<div class="v8-card"><h3>&#128200; 보정 요인</h3>';
  html+='<div style="margin-top:8px">';
  for(var f=0;f<factors.length;f++){
    var fc=factors[f];
    var isNeg=fc.val.indexOf('-')!==-1;
    html+='<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.04)">';
    html+='<span style="color:#aaa;font-size:0.85em">'+fc.name+'</span>';
    html+='<span style="color:'+(isNeg?'#00FF88':'#ff6b6b')+';font-weight:600">'+fc.val+'타</span>';
    html+='</div>';
  }
  html+='<div style="display:flex;justify-content:space-between;padding:8px 0;margin-top:4px">';
  html+='<span style="color:#fff;font-weight:700">총 보정</span>';
  html+='<span style="color:'+(adjustment<=0?'#00FF88':'#ff6b6b')+';font-weight:700;font-size:1.1em">'+(adjustment>0?'+':'')+adjustment+'타</span>';
  html+='</div></div>';
}

html+='<div class="v8-card"><h3>&#128161; 오늘의 전략 조언</h3>';
if(predicted<=80)html+='<p style="color:#00FF88">최상의 라운드가 예상됩니다! 공격적으로 플레이하세요.</p>';
else if(predicted<=90)html+='<p style="color:#00B4D8">좋은 라운드입니다. 페어웨이 중앙 + GIR에 집중하세요.</p>';
else if(predicted<=100)html+='<p style="color:#FFC107">안정적인 플레이가 핵심입니다. 트리플 보기 이상을 방지하세요.</p>';
else html+='<p style="color:#ff6b6b">어려운 조건이지만 포기하지 마세요. 한 샷 한 샷에 집중!</p>';
html+='</div>';

document.getElementById('v8-predict-result').innerHTML=html;
playSfx('predict');
};

// ===== 8. GOLF QUIZ =====
var QUIZ_QUESTIONS=[
{q:'골프에서 &quot;앨버트로스&quot;는 파 대비 몇 타 적은 것인가?',o:['1타','2타','3타','4타'],a:2,explain:'앨버트로스(또는 더블이글)는 파보다 3타 적은 것입니다.'},
{q:'PGA Tour에서 1라운드 최저 타수 기록은?',o:['58타','59타','60타','62타'],a:0,explain:'Jim Furyk이 2016년에 58타를 기록했습니다.'},
{q:'골프공의 딤플 개수는 보통 얼마인가?',o:['200~250개','250~300개','300~500개','500~700개'],a:2,explain:'대부분의 골프공은 300~500개의 딤플을 가지고 있습니다.'},
{q:'&quot;스팀프미터&quot;는 무엇을 측정하는 기구인가?',o:['풍속','그린 속도','클럽헤드 속도','볼 스핀'],a:1,explain:'스팀프미터는 그린의 빠르기를 측정하는 기구입니다.'},
{q:'정규 골프 코스에서 한 백에 넣을 수 있는 최대 클럽 수는?',o:['10개','12개','14개','제한 없음'],a:2,explain:'골프 규칙상 최대 14개의 클럽을 가지고 라운드할 수 있습니다.'},
{q:'&quot;도그렉&quot; 홀이란?',o:['직선 홀','좌우로 휘는 홀','오르막 홀','아일랜드 그린 홀'],a:1,explain:'도그렉은 개의 다리처럼 좌 또는 우로 휘는 형태의 홀입니다.'},
{q:'슬로프 레이팅 113은 무엇을 의미하는가?',o:['쉬운 코스','평균 난이도','어려운 코스','프로 수준'],a:1,explain:'슬로프 레이팅 113은 표준 난이도로, 핸디캡 계산의 기준점입니다.'},
{q:'WHS 핸디캡에서 최근 몇 라운드를 사용하는가?',o:['10라운드','15라운드','20라운드','모든 라운드'],a:2,explain:'WHS는 최근 20라운드 중 최상위 8개 디퍼런셜로 핸디캡을 산출합니다.'},
{q:'&quot;GIR&quot;은 무엇의 약자인가?',o:['Golf In Range','Green In Regulation','Ground Impact Rating','Great Iron Result'],a:1,explain:'GIR = Green In Regulation, 파3은 1온, 파4는 2온, 파5는 3온을 의미합니다.'},
{q:'이상적인 백스윙:다운스윙 템포 비율은?',o:['1:1','2:1','3:1','4:1'],a:2,explain:'PGA Tour 프로 평균 템포는 백스윙 3 : 다운스윙 1 비율입니다.'},
{q:'Strokes Gained 분석을 처음 도입한 사람은?',o:['Tiger Woods','Mark Broadie','Jack Nicklaus','Ben Hogan'],a:1,explain:'Columbia 대학의 Mark Broadie 교수가 Strokes Gained 분석법을 개발했습니다.'},
{q:'드라이버의 최적 발사각은 대략 몇 도인가?',o:['8~10도','12~14도','16~18도','20~22도'],a:1,explain:'대부분의 골퍼에게 12~14도의 발사각이 최대 캐리를 제공합니다.'},
{q:'&quot;Up &amp; Down&quot;의 의미는?',o:['퍼팅 2번','그린 밖에서 한 샷 + 한 퍼트로 파 세이브','연속 버디','홀인원 가능 거리'],a:1,explain:'그린을 놓친 후 칩/피치 1회 + 퍼팅 1회로 파를 세이브하는 것입니다.'},
{q:'골프공이 최대 비거리를 내기 위한 최적 백스핀은?',o:['1,000rpm 이하','2,000~2,800rpm','4,000~5,000rpm','6,000rpm 이상'],a:1,explain:'드라이버 기준 2,000~2,800rpm이 최적 백스핀입니다.'},
{q:'규정 라운드에서 OB(Out of Bounds)는 어떤 벌칙인가?',o:['1벌타 + 그 자리에서','1벌타 + 드롭','2벌타','거리와 벌타 (1벌타 + 원래 위치에서)'],a:3,explain:'OB는 &quot;Stroke and Distance&quot; 페널티로, 1벌타를 받고 원래 위치에서 다시 칩니다.'}
];

function showQuiz(){
var pn=getPanel('quiz');
var quizState=lsGet('quiz_state',{current:0,correct:0,answered:[]});
var html='<div class="v8-title">&#128218; 골프 지식 퀴즈</div>';

if(quizState.answered.length>=QUIZ_QUESTIONS.length){
  var grade=quizState.correct>=14?'S':quizState.correct>=12?'A':quizState.correct>=10?'B':quizState.correct>=7?'C':'D';
  var gradeColor=grade==='S'?'#00FF88':grade==='A'?'#00B4D8':grade==='B'?'#FFC107':'#ff6b6b';
  html+='<div class="v8-card" style="text-align:center">';
  html+='<div style="font-size:3em;margin-bottom:8px">&#127942;</div>';
  html+='<h3>퀴즈 완료!</h3>';
  html+='<div style="font-size:2.5em;font-weight:800;color:'+gradeColor+';margin:12px 0">'+grade+'</div>';
  html+='<div style="font-size:1.2em;color:#aaa">'+quizState.correct+' / '+QUIZ_QUESTIONS.length+' 정답</div>';
  html+='<button class="v8-btn v8-btn-primary" style="margin-top:16px" onclick="window._v8ResetQuiz()">다시 도전</button>';
  html+='</div>';
} else {
  var qi=quizState.current;
  var q=QUIZ_QUESTIONS[qi];
  html+='<div style="text-align:center;margin-bottom:12px;color:#888;font-size:0.85em">';
  html+='문제 '+(qi+1)+' / '+QUIZ_QUESTIONS.length+' &middot; 정답 '+quizState.correct+'개';
  html+='</div>';

  html+='<div style="display:flex;gap:4px;margin-bottom:16px">';
  for(var pi=0;pi<QUIZ_QUESTIONS.length;pi++){
    var pcolor=pi<quizState.answered.length?(quizState.answered[pi]?'#00FF88':'#ff6b6b'):(pi===qi?'#00B4D8':'rgba(255,255,255,0.1)');
    html+='<div style="flex:1;height:4px;background:'+pcolor+';border-radius:2px"></div>';
  }
  html+='</div>';

  html+='<div class="v8-card"><h3 style="line-height:1.5">'+q.q+'</h3></div>';

  for(var oi=0;oi<q.o.length;oi++){
    html+='<button class="v8-btn" style="width:100%;text-align:left;padding:14px 16px;margin-bottom:8px;font-size:0.95em" onclick="window._v8AnswerQuiz('+oi+')">';
    html+='<span style="color:#00B4D8;font-weight:700;margin-right:8px">'+String.fromCharCode(65+oi)+'.</span> '+q.o[oi];
    html+='</button>';
  }
}

pn.innerHTML='<button class="v8-close" onclick="window._v8Close(\'quiz\')">&times;</button>'+html;
openPanel('quiz');
}

window._v8AnswerQuiz=function(idx){
var quizState=lsGet('quiz_state',{current:0,correct:0,answered:[]});
var q=QUIZ_QUESTIONS[quizState.current];
var isCorrect=idx===q.a;
quizState.answered.push(isCorrect);
if(isCorrect){quizState.correct++;playSfx('quiz_correct');showToast('&#9989; 정답!')}
else{playSfx('quiz_wrong');showToast('&#10060; 오답! '+q.explain)}
quizState.current++;
lsSet('quiz_state',quizState);
setTimeout(function(){showQuiz()},800);
checkAchievements();
};

window._v8ResetQuiz=function(){
lsSet('quiz_state',{current:0,correct:0,answered:[]});
showQuiz();
};

// ===== ACHIEVEMENTS =====
var ACHIEVEMENTS=[
{id:'v8_first_handicap',name:'핸디캡 시작',desc:'첫 핸디캡 라운드 기록',icon:'&#128203;',check:function(){return lsGet('hcp_rounds',[]).length>=1}},
{id:'v8_5_handicap_rounds',name:'핸디캡 추적자',desc:'핸디캡 라운드 5회 기록',icon:'&#128200;',check:function(){return lsGet('hcp_rounds',[]).length>=5}},
{id:'v8_single_handicap',name:'싱글 핸디캡퍼',desc:'핸디캡 인덱스 9.9 이하 달성',icon:'&#127942;',check:function(){var r=lsGet('hcp_rounds',[]);if(r.length<3)return false;var diffs=[];for(var i=0;i<r.length;i++){diffs.push((113/r[i].slope)*(r[i].score-r[i].rating))}diffs.sort(function(a,b){return a-b});var n=Math.min(r.length<=5?1:r.length<=8?2:8,diffs.length);var sum=0;for(var j=0;j<n;j++)sum+=diffs[j];return sum/n<=9.9}},
{id:'v8_dispersion_check',name:'샷 분석가',desc:'샷 분산 맵 첫 조회',icon:'&#128205;',check:function(){return lsGet('ach_dispersion_viewed',false)}},
{id:'v8_caddie_used',name:'캐디 활용',desc:'버추얼 캐디에게 첫 질문',icon:'&#129302;',check:function(){return lsGet('ach_caddie_used',false)}},
{id:'v8_tempo_50',name:'템포 마스터',desc:'스윙 템포 50회 연습',icon:'&#127926;',check:function(){var recs=lsGet('tempo_records',[]);var total=0;for(var i=0;i<recs.length;i++)total+=recs[i].swings;return total>=50}},
{id:'v8_mental_reader',name:'멘탈 코치',desc:'멘탈 게임 코칭 조회',icon:'&#129504;',check:function(){return lsGet('ach_mental_viewed',false)}},
{id:'v8_14_clubs',name:'풀백 골퍼',desc:'골프백에 14개 클럽 등록',icon:'&#127991;&#xFE0E;',check:function(){return lsGet('equipment_bag',[]).length>=14}},
{id:'v8_grip_check',name:'장비 관리사',desc:'그립 교체 시기 확인',icon:'&#128295;',check:function(){var bag=lsGet('equipment_bag',[]);return bag.some(function(c){return c.rounds>=40})}},
{id:'v8_predict_80',name:'80타 예측',desc:'스코어 예측 결과 80타 이하',icon:'&#128302;',check:function(){return lsGet('ach_predict_80',false)}},
{id:'v8_quiz_perfect',name:'골프 박사',desc:'퀴즈 15문제 전부 정답',icon:'&#128218;',check:function(){var qs=lsGet('quiz_state',{});return qs.correct>=15&&(qs.answered||[]).length>=15}},
{id:'v8_quiz_complete',name:'퀴즈 도전자',desc:'골프 퀴즈 전문항 완료',icon:'&#127919;',check:function(){var qs=lsGet('quiz_state',{});return(qs.answered||[]).length>=15}}
];

function checkAchievements(){
var unlocked=lsGet('v8_achievements',[]);
for(var i=0;i<ACHIEVEMENTS.length;i++){
  var ach=ACHIEVEMENTS[i];
  if(unlocked.indexOf(ach.id)===-1&&ach.check()){
    unlocked.push(ach.id);
    lsSet('v8_achievements',unlocked);
    showAchievementPopup(ach);
    playSfx('achievement');
  }
}
}

function showAchievementPopup(ach){
var popup=document.createElement('div');
popup.className='v8-ach-popup';
popup.innerHTML='<div style="font-size:2em">'+ach.icon+'</div><div><div style="font-size:0.65em;color:#00FF88;font-weight:700;letter-spacing:2px">ACHIEVEMENT</div><div style="font-weight:700">'+ach.name+'</div><div style="font-size:0.8em;color:#888;margin-top:2px">'+ach.desc+'</div></div>';
document.body.appendChild(popup);
setTimeout(function(){popup.classList.add('show')},50);
setTimeout(function(){popup.classList.remove('show');setTimeout(function(){popup.remove()},500)},3500);
}

// ===== QUICK ACTIONS & KEYBOARD =====
function injectQuickActions(){
var existing=document.querySelector('.v8-quick-actions');
if(existing)return;
var container=document.createElement('div');
container.className='v8-quick-actions';
var buttons=[
  {icon:'&#128203;',title:'핸디캡 (Shift+H)',fn:'showHandicap'},
  {icon:'&#128205;',title:'분산 맵 (Shift+D)',fn:'showDispersion'},
  {icon:'&#129302;',title:'캐디 AI (Shift+C)',fn:'showVirtualCaddie'},
  {icon:'&#127926;',title:'템포 (Shift+T)',fn:'showTempoTrainer'},
  {icon:'&#129504;',title:'멘탈 (Shift+M)',fn:'showMentalGame'},
  {icon:'&#127991;&#xFE0E;',title:'장비 (Shift+E)',fn:'showEquipment'},
  {icon:'&#128302;',title:'예측 (Shift+P)',fn:'showScorePredictor'},
  {icon:'&#128218;',title:'퀴즈 (Shift+Q)',fn:'showQuiz'}
];
for(var i=0;i<buttons.length;i++){
  var btn=document.createElement('button');
  btn.className='v8-quick-btn';
  btn.innerHTML=buttons[i].icon;
  btn.title=buttons[i].title;
  btn.setAttribute('data-fn',buttons[i].fn);
  btn.addEventListener('click',function(){
    var fn=this.getAttribute('data-fn');
    if(window['_v8_'+fn])window['_v8_'+fn]();
  });
  container.appendChild(btn);
}
document.body.appendChild(container);
}

window._v8_showHandicap=showHandicap;
window._v8_showDispersion=function(){lsSet('ach_dispersion_viewed',true);showDispersion()};
window._v8_showVirtualCaddie=function(){lsSet('ach_caddie_used',true);showVirtualCaddie()};
window._v8_showTempoTrainer=showTempoTrainer;
window._v8_showMentalGame=function(){lsSet('ach_mental_viewed',true);showMentalGame()};
window._v8_showEquipment=showEquipment;
window._v8_showScorePredictor=showScorePredictor;
window._v8_showQuiz=showQuiz;
window._v8Close=function(id){closePanel(id);if(tempoInterval&&id==='tempo'){window._v8TempoStop()}};

function setupKeyboard(){
document.addEventListener('keydown',function(e){
  if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'||e.target.tagName==='SELECT')return;
  if(e.ctrlKey||e.metaKey||e.altKey)return;
  if(!e.shiftKey)return;
  switch(e.key){
    case'H':e.preventDefault();showHandicap();break;
    case'D':e.preventDefault();lsSet('ach_dispersion_viewed',true);showDispersion();break;
    case'C':e.preventDefault();lsSet('ach_caddie_used',true);showVirtualCaddie();break;
    case'T':e.preventDefault();showTempoTrainer();break;
    case'M':e.preventDefault();lsSet('ach_mental_viewed',true);showMentalGame();break;
    case'E':e.preventDefault();showEquipment();break;
    case'P':e.preventDefault();showScorePredictor();break;
    case'Q':e.preventDefault();showQuiz();break;
  }
});
}

// ===== CSS =====
function injectCSS(){
var s=document.createElement('style');
s.textContent='.v8-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.88);z-index:10001;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;pointer-events:none}.v8-overlay.active{opacity:1;pointer-events:auto}.v8-panel{background:linear-gradient(145deg,rgba(12,18,28,.98),rgba(6,10,18,.98));border:1px solid rgba(0,255,136,.2);border-radius:18px;padding:24px;max-width:640px;width:94%;max-height:85vh;overflow-y:auto;box-shadow:0 24px 80px rgba(0,0,0,.7),0 0 40px rgba(0,255,136,.06);position:relative}.v8-panel::-webkit-scrollbar{width:5px}.v8-panel::-webkit-scrollbar-thumb{background:rgba(0,255,136,.2);border-radius:3px}.v8-title{font-size:1.4em;font-weight:800;color:#00FF88;margin-bottom:18px;letter-spacing:-0.5px}.v8-close{position:absolute;top:12px;right:16px;background:none;border:none;color:#666;font-size:1.6em;cursor:pointer;padding:4px 8px;border-radius:8px;transition:all .2s;z-index:1}.v8-close:hover{color:#ff6b6b;background:rgba(255,107,107,.1)}.v8-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:16px;margin-bottom:12px;transition:all .2s}.v8-card:hover{border-color:rgba(0,255,136,.2);background:rgba(255,255,255,.05)}.v8-card h3{color:#00FF88;font-size:.95em;margin:0 0 8px}.v8-card p{color:#aaa;font-size:.85em;margin:0;line-height:1.6}.v8-badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:.75em;font-weight:600}.v8-badge-a{background:rgba(0,255,136,.12);color:#00FF88}.v8-badge-b{background:rgba(0,180,216,.12);color:#00B4D8}.v8-badge-c{background:rgba(255,193,7,.12);color:#FFC107}.v8-badge-d{background:rgba(255,107,107,.12);color:#ff6b6b}.v8-btn{padding:8px 16px;border:1px solid rgba(0,180,216,.25);background:rgba(0,180,216,.08);color:#00B4D8;border-radius:8px;cursor:pointer;font-size:.85em;transition:all .2s}.v8-btn:hover{background:rgba(0,180,216,.18);border-color:#00B4D8}.v8-btn:disabled{opacity:0.4;cursor:not-allowed}.v8-btn.active{background:rgba(0,255,136,.12);border-color:rgba(0,255,136,.3);color:#00FF88}.v8-btn-primary{background:rgba(0,255,136,.12);border-color:rgba(0,255,136,.3);color:#00FF88}.v8-btn-primary:hover{background:rgba(0,255,136,.22)}.v8-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.v8-stat{text-align:center;padding:12px}.v8-stat-num{font-size:1.8em;font-weight:800;color:#00FF88}.v8-stat-label{font-size:.72em;color:#888;margin-top:4px}.v8-input{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:8px 12px;color:#fff;font-size:.85em;width:100%;box-sizing:border-box}.v8-input:focus{outline:none;border-color:rgba(0,255,136,.5)}.v8-label{display:block;font-size:.72em;color:#888;margin-bottom:3px}.v8-table{width:100%;border-collapse:collapse;font-size:.82em}.v8-table th{text-align:left;padding:8px;color:#00B4D8;border-bottom:1px solid rgba(255,255,255,.08);font-weight:600}.v8-table td{padding:8px;color:#ccc;border-bottom:1px solid rgba(255,255,255,.03)}.v8-quick-actions{position:fixed;bottom:80px;right:16px;display:flex;flex-direction:column;gap:7px;z-index:999}.v8-quick-btn{width:42px;height:42px;border-radius:11px;border:1px solid rgba(0,255,136,.15);background:rgba(6,10,18,.92);color:#00FF88;font-size:1.1em;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;backdrop-filter:blur(12px)}.v8-quick-btn:hover{background:rgba(0,255,136,.1);transform:scale(1.08);box-shadow:0 4px 16px rgba(0,255,136,.12)}.v8-toast{position:fixed;top:20px;left:50%;transform:translateX(-50%) translateY(-100px);background:rgba(0,255,136,.1);border:1px solid rgba(0,255,136,.2);color:#00FF88;padding:10px 20px;border-radius:10px;z-index:99999;transition:transform .4s;font-size:.9em;backdrop-filter:blur(12px);white-space:nowrap}.v8-toast.show{transform:translateX(-50%) translateY(0)}.v8-ach-popup{position:fixed;top:60px;left:50%;transform:translateX(-50%) translateY(-150px);z-index:100000;background:linear-gradient(135deg,rgba(15,20,28,.96),rgba(25,30,40,.96));border:1px solid rgba(0,255,136,.3);border-radius:16px;padding:14px 22px;display:flex;align-items:center;gap:14px;backdrop-filter:blur(20px);transition:transform .5s cubic-bezier(.34,1.56,.64,1);box-shadow:0 8px 32px rgba(0,0,0,.5),0 0 24px rgba(0,255,136,.1)}.v8-ach-popup.show{transform:translateX(-50%) translateY(0)}.v8-tempo-dot{display:inline-block}@media(max-width:480px){.v8-panel{padding:16px;max-height:92vh;width:96%}.v8-grid{grid-template-columns:1fr}.v8-quick-actions{bottom:70px;right:8px}.v8-quick-btn{width:36px;height:36px;font-size:0.95em}}';
document.head.appendChild(s);
}

// ===== INIT =====
function init(){
injectCSS();
injectQuickActions();
setupKeyboard();
setTimeout(checkAchievements,2000);
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init)}
else{setTimeout(init,800)}

})();
