(function(){
'use strict';
var LS='gt_v6_';
var audioCtx=null;
function getAC(){if(!audioCtx)try{audioCtx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}return audioCtx}
function playSfx(type){var ac=getAC();if(!ac)return;var o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);var t=ac.currentTime;g.gain.setValueAtTime(0.12,t);switch(type){case'insight':o.type='sine';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(784,t+0.15);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'goal':o.type='triangle';o.frequency.setValueAtTime(659,t);o.frequency.linearRampToValueAtTime(988,t+0.12);o.frequency.linearRampToValueAtTime(1175,t+0.22);g.gain.exponentialRampToValueAtTime(0.01,t+0.4);o.start(t);o.stop(t+0.4);break;case'journal':o.type='sine';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(554,t+0.18);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'cluster':o.type='sawtooth';o.frequency.setValueAtTime(330,t);o.frequency.linearRampToValueAtTime(440,t+0.12);g.gain.setValueAtTime(0.06,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.25);o.start(t);o.stop(t+0.25);break;case'record':o.type='square';o.frequency.setValueAtTime(784,t);o.frequency.setValueAtTime(988,t+0.08);o.frequency.setValueAtTime(1175,t+0.16);g.gain.setValueAtTime(0.05,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'course':o.type='sine';o.frequency.setValueAtTime(392,t);o.frequency.linearRampToValueAtTime(523,t+0.15);o.frequency.linearRampToValueAtTime(659,t+0.3);g.gain.exponentialRampToValueAtTime(0.01,t+0.4);o.start(t);o.stop(t+0.4);break;default:o.type='sine';o.frequency.setValueAtTime(440,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.2);o.start(t);o.stop(t+0.2)}}

function lsGet(k,d){try{var v=localStorage.getItem(LS+k);return v?JSON.parse(v):d}catch(e){return d}}
function lsSet(k,v){try{localStorage.setItem(LS+k,JSON.stringify(v))}catch(e){}}
function getShotHistory(){var keys=['gt_shotHistory','shotHistory','gt_history'];for(var i=0;i<keys.length;i++){try{var d=localStorage.getItem(keys[i]);if(d){var a=JSON.parse(d);if(Array.isArray(a)&&a.length>0)return a}}catch(e){}}if(window.shotHistory&&Array.isArray(window.shotHistory))return window.shotHistory;return[]}
function todayStr(){return new Date().toISOString().slice(0,10)}
function showToast(msg){var t=document.createElement('div');t.className='v6-toast';t.textContent=msg;document.body.appendChild(t);setTimeout(function(){t.classList.add('show')},50);setTimeout(function(){t.classList.remove('show');setTimeout(function(){t.remove()},400)},3000)}

function createOverlay(id){var ov=document.createElement('div');ov.className='v6-overlay';ov.id='v6-'+id;ov.addEventListener('click',function(e){if(e.target===ov)closePanel(id)});var pn=document.createElement('div');pn.className='v6-panel';pn.style.position='relative';var cl=document.createElement('button');cl.className='v6-close';cl.innerHTML='&times;';cl.onclick=function(){closePanel(id)};pn.appendChild(cl);ov.appendChild(pn);document.body.appendChild(ov);return pn}
function openPanel(id){var el=document.getElementById('v6-'+id);if(el)el.classList.add('active')}
function closePanel(id){var el=document.getElementById('v6-'+id);if(el)el.classList.remove('active')}

// ===== 1. COURSE STRATEGY SIMULATOR =====
var HOLES=[
{num:1,par:4,dist:380,desc:'직선 미들홀, 우측 벙커',fairway:'넓음',hazard:'우측 벙커 250yd',green:'평탄',tip:'드라이버로 페어웨이 중앙 공략'},
{num:2,par:3,dist:165,desc:'연못 건너 숏홀',fairway:'없음',hazard:'연못 그린 앞 전체',green:'2단 그린',tip:'7번 아이언으로 그린 중앙'},
{num:3,par:5,dist:530,desc:'도그렉 좌측 롱홀',fairway:'좁음',hazard:'좌측 OB, 크릭 300yd',green:'경사',tip:'레이업 전략 추천'},
{num:4,par:4,dist:410,desc:'오르막 미들홀',fairway:'보통',hazard:'좌우 벙커 230yd',green:'언듈레이션',tip:'3번 우드로 안전 공략'},
{num:5,par:3,dist:195,desc:'바람이 강한 숏홀',fairway:'없음',hazard:'좌측 벙커, 뒤 OB',green:'좁고 깊음',tip:'클럽 1개 더, 그린 앞쪽'},
{num:6,par:5,dist:555,desc:'S자 롱홀',fairway:'넓음→좁음',hazard:'페어웨이 벙커 2개',green:'3단 그린',tip:'정확한 2온보다 안전한 3온'},
{num:7,par:4,dist:355,desc:'내리막 숏 미들홀',fairway:'넓음',hazard:'그린 좌측 벙커',green:'빠른 경사',tip:'3번 우드+웨지 조합'},
{num:8,par:4,dist:430,desc:'가장 어려운 미들홀',fairway:'좁음',hazard:'좌우 워터, 벙커 3개',green:'섬 그린',tip:'정확성 최우선'},
{num:9,par:3,dist:150,desc:'아일랜드 그린 숏홀',fairway:'없음',hazard:'360도 워터',green:'둥근 섬',tip:'풀샷 피하고 3/4 스윙'}
];

function showCourseSimulator(){
  var pn=document.getElementById('v6-course');
  if(!pn){pn=createOverlay('course');pn.id='v6-course-panel'}
  else{pn=document.getElementById('v6-course-panel')}
  var currentHole=lsGet('course_hole',0);
  var scores=lsGet('course_scores',[]);
  var h=HOLES[currentHole];
  var totalPar=0,totalScore=0;
  for(var i=0;i<scores.length;i++){totalPar+=HOLES[i].par;totalScore+=scores[i]}
  var html='<div class="v6-title">&#9971; &#xFE0E; &#xFE0E;코스 전략 시뮬레이터</div>';
  if(currentHole>=9){
    var diff=totalScore-totalPar;
    html+='<div class="v6-card" style="text-align:center"><h3>9홀 라운드 완료!</h3>';
    html+='<div class="v6-stat-num" style="font-size:2.5em;color:'+(diff<=0?'#00FF88':'#ff6b6b')+'">'+totalScore+'</div>';
    html+='<p>'+(diff>0?'+':'')+diff+' (Par '+totalPar+')</p>';
    html+='<div style="margin-top:12px">';
    for(var j=0;j<9;j++){var sd=scores[j]-HOLES[j].par;html+='<span class="v6-badge '+(sd<0?'v6-badge-a':sd===0?'v6-badge-b':'v6-badge-d')+'" style="margin:2px">H'+(j+1)+': '+scores[j]+'</span> '}
    html+='</div><button class="v6-btn v6-btn-primary" style="margin-top:16px" onclick="window._v6ResetCourse()">새 라운드</button></div>';
  } else {
    html+='<div style="display:flex;gap:4px;margin-bottom:12px;flex-wrap:wrap">';
    for(var k=0;k<9;k++){
      var done=k<scores.length;var cur=k===currentHole;
      html+='<div style="width:28px;height:28px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:0.75em;font-weight:600;'+(cur?'background:rgba(0,180,216,0.3);color:#00B4D8;border:1px solid #00B4D8':done?'background:rgba(0,255,136,0.15);color:#00FF88;border:1px solid rgba(0,255,136,0.3)':'background:rgba(255,255,255,0.04);color:#666;border:1px solid rgba(255,255,255,0.08)')+'">'+( k+1)+'</div>';
    }
    html+='</div>';
    html+='<div class="v6-card"><h3>Hole '+(currentHole+1)+' &mdash; Par '+h.par+' &middot; '+h.dist+'yd</h3>';
    html+='<p>'+h.desc+'</p>';
    html+='<div style="margin-top:8px;display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:0.8em">';
    html+='<div><span style="color:#888">&#xFE0E;페어웨이:</span> <span style="color:#ccc">'+h.fairway+'</span></div>';
    html+='<div><span style="color:#888">&#xFE0E;해저드:</span> <span style="color:#ff6b6b">'+h.hazard+'</span></div>';
    html+='<div><span style="color:#888">&#xFE0E;그린:</span> <span style="color:#ccc">'+h.green+'</span></div>';
    html+='<div><span style="color:#888">&#xFE0E;팁:</span> <span style="color:#00FF88">'+h.tip+'</span></div>';
    html+='</div></div>';

    var strategies=[];
    if(h.par===3){strategies=[{name:'공격',club:'아이언 풀샷',risk:'높음',expect:h.par-1},{name:'안전',club:'짧은 클럽 중앙',risk:'낮음',expect:h.par},{name:'보수',club:'그린 앞 레이업',risk:'매우 낮음',expect:h.par+1}]}
    else if(h.par===4){strategies=[{name:'공격',club:'드라이버+웨지',risk:'높음',expect:h.par-1},{name:'정석',club:'드라이버+미들아이언',risk:'보통',expect:h.par},{name:'안전',club:'우드+아이언+칩',risk:'낮음',expect:h.par+1}]}
    else{strategies=[{name:'2온 공격',club:'드라이버+우드+퍼팅',risk:'매우 높음',expect:h.par-2},{name:'3온 정석',club:'드라이버+아이언+웨지',risk:'보통',expect:h.par-1},{name:'안전 3온',club:'우드+아이언+웨지',risk:'낮음',expect:h.par}]}

    html+='<div style="margin-top:12px"><div style="color:#888;font-size:0.8em;margin-bottom:8px">전략 선택:</div>';
    for(var s=0;s<strategies.length;s++){
      var st=strategies[s];
      html+='<button class="v6-btn" style="width:100%;text-align:left;margin-bottom:6px;padding:10px 14px" onclick="window._v6PlayHole('+s+')">';
      html+='<span style="color:#00FF88;font-weight:600">'+st.name+'</span> &mdash; '+st.club;
      html+='<span style="float:right;color:'+(st.risk==='높음'||st.risk==='매우 높음'?'#ff6b6b':'#00B4D8')+'">위험: '+st.risk+'</span>';
      html+='</button>';
    }
    html+='</div>';
    if(scores.length>0){
      html+='<div style="margin-top:12px;font-size:0.85em;color:#888">현재: '+(totalScore>totalPar?'+':'')+(totalScore-totalPar)+' ('+totalScore+'/'+totalPar+')</div>';
    }
  }
  pn.innerHTML='<button class="v6-close" onclick="window._v6Close(\'course\')">&times;</button>'+html;
  openPanel('course');playSfx('course');
}

window._v6PlayHole=function(strategyIdx){
  var currentHole=lsGet('course_hole',0);
  var scores=lsGet('course_scores',[]);
  var h=HOLES[currentHole];
  var rng=Math.random();
  var result;
  if(strategyIdx===0){result=rng<0.3?h.par-1:rng<0.7?h.par:h.par+1}
  else if(strategyIdx===1){result=rng<0.15?h.par-1:rng<0.75?h.par:h.par+1}
  else{result=rng<0.05?h.par-1:rng<0.6?h.par:rng<0.9?h.par+1:h.par+2}
  var shotHist=getShotHistory();
  if(shotHist.length>10){var consistency=0;for(var i=0;i<Math.min(10,shotHist.length);i++){if(shotHist[i].curveType==='Straight'||shotHist[i].curveType==='straight')consistency++}if(consistency>6&&rng<0.2)result=Math.max(h.par-2,result-1)}
  scores.push(result);
  lsSet('course_scores',scores);
  lsSet('course_hole',currentHole+1);
  var diff=result-h.par;
  var names={'-2':'Eagle!','-1':'Birdie!','0':'Par','1':'Bogey','2':'Double Bogey'};
  showToast('Hole '+(currentHole+1)+': '+(names[diff]||result+'타')+' ('+result+')');
  showCourseSimulator();
};
window._v6ResetCourse=function(){lsSet('course_hole',0);lsSet('course_scores',[]);showCourseSimulator()};

// ===== 2. PRACTICE PLANNER =====
function showPracticePlanner(){
  var pn=document.getElementById('v6-planner');
  if(!pn){pn=createOverlay('planner');pn.id='v6-planner-panel'}
  else{pn=document.getElementById('v6-planner-panel')}
  var goals=lsGet('goals',{sessionsPerWeek:3,minutesPerSession:30,focusAreas:['driving','iron','putting']});
  var practiced=lsGet('practiced',{});
  var streak=calcStreak(practiced);
  var today=todayStr();
  var thisWeekCount=countThisWeek(practiced);

  var html='<div class="v6-title">&#128197; &#xFE0E;연습 플래너</div>';
  html+='<div class="v6-grid" style="margin-bottom:16px">';
  html+='<div class="v6-card v6-stat"><div class="v6-stat-num">'+streak+'</div><div class="v6-stat-label">연속 일수</div></div>';
  html+='<div class="v6-card v6-stat"><div class="v6-stat-num">'+thisWeekCount+'/'+goals.sessionsPerWeek+'</div><div class="v6-stat-label">이번 주</div></div>';
  html+='</div>';

  html+='<div class="v6-card"><h3>오늘의 연습</h3>';
  if(practiced[today]){
    html+='<p style="color:#00FF88">&#10003; 오늘 연습 완료! ('+practiced[today].minutes+'분)</p>';
  } else {
    html+='<p>목표: '+goals.minutesPerSession+'분</p>';
    html+='<div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap">';
    var areas=[{id:'driving',name:'드라이버'},{id:'iron',name:'아이언'},{id:'chipping',name:'숏게임'},{id:'putting',name:'퍼팅'},{id:'bunker',name:'벙커'},{id:'course',name:'코스 플레이'}];
    for(var i=0;i<areas.length;i++){
      var active=goals.focusAreas.indexOf(areas[i].id)!==-1;
      html+='<span class="v6-tag '+(active?'v6-tag-active':'v6-tag-inactive')+'" onclick="window._v6ToggleFocus(\''+areas[i].id+'\')">'+areas[i].name+'</span>';
    }
    html+='</div>';
    html+='<div style="margin-top:12px;display:flex;gap:8px">';
    html+='<input id="v6-practice-min" class="v6-input" type="number" value="'+goals.minutesPerSession+'" min="5" max="180" style="width:80px">';
    html+='<button class="v6-btn v6-btn-primary" onclick="window._v6CompletePractice()">연습 완료!</button>';
    html+='</div>';
  }
  html+='</div>';

  html+='<div class="v6-card"><h3>이번 달 캘린더</h3>';
  html+=buildCalendar(practiced);
  html+='</div>';

  html+='<div class="v6-card"><h3>주간 목표 설정</h3>';
  html+='<div style="display:flex;gap:12px;align-items:center;margin-top:8px">';
  html+='<label style="color:#888;font-size:0.85em">주 </label>';
  html+='<input id="v6-goal-sessions" class="v6-input" type="number" value="'+goals.sessionsPerWeek+'" min="1" max="7" style="width:60px">';
  html+='<label style="color:#888;font-size:0.85em">회, 회당 </label>';
  html+='<input id="v6-goal-minutes" class="v6-input" type="number" value="'+goals.minutesPerSession+'" min="5" max="180" style="width:70px">';
  html+='<label style="color:#888;font-size:0.85em">분</label>';
  html+='<button class="v6-btn" onclick="window._v6SaveGoals()">저장</button>';
  html+='</div></div>';

  pn.innerHTML='<button class="v6-close" onclick="window._v6Close(\'planner\')">&times;</button>'+html;
  openPanel('planner');playSfx('goal');
}

function calcStreak(practiced){var d=new Date(),s=0;while(true){var ds=d.toISOString().slice(0,10);if(practiced[ds]){s++;d.setDate(d.getDate()-1)}else break}return s}
function countThisWeek(practiced){var now=new Date(),day=now.getDay()||7,mon=new Date(now);mon.setDate(now.getDate()-(day-1));var c=0;for(var i=0;i<7;i++){var d=new Date(mon);d.setDate(mon.getDate()+i);var ds=d.toISOString().slice(0,10);if(practiced[ds])c++}return c}
function buildCalendar(practiced){var now=new Date(),y=now.getFullYear(),m=now.getMonth();var first=new Date(y,m,1),last=new Date(y,m+1,0);var startDay=first.getDay()||7;var html='<div class="v6-cal-grid">';var days=['월','화','수','목','금','토','일'];for(var d=0;d<7;d++)html+='<div class="v6-cal-header">'+days[d]+'</div>';for(var e=1;e<startDay;e++)html+='<div class="v6-cal-day v6-cal-empty"></div>';var today=todayStr();for(var dd=1;dd<=last.getDate();dd++){var ds=y+'-'+String(m+1).padStart(2,'0')+'-'+String(dd).padStart(2,'0');var isToday=ds===today;var done=practiced[ds];html+='<div class="v6-cal-day'+(done?' v6-cal-done':'')+(isToday?' v6-cal-today':'')+'">'+dd+'</div>'}html+='</div>';return html}

window._v6ToggleFocus=function(area){var g=lsGet('goals',{sessionsPerWeek:3,minutesPerSession:30,focusAreas:['driving','iron','putting']});var idx=g.focusAreas.indexOf(area);if(idx===-1)g.focusAreas.push(area);else g.focusAreas.splice(idx,1);lsSet('goals',g);showPracticePlanner()};
window._v6CompletePractice=function(){var min=parseInt(document.getElementById('v6-practice-min').value)||30;var practiced=lsGet('practiced',{});practiced[todayStr()]={minutes:min,timestamp:Date.now()};lsSet('practiced',practiced);playSfx('goal');showToast('오늘 연습 '+min+'분 완료! 수고했어요!');showPracticePlanner()};
window._v6SaveGoals=function(){var s=parseInt(document.getElementById('v6-goal-sessions').value)||3;var m=parseInt(document.getElementById('v6-goal-minutes').value)||30;var g=lsGet('goals',{focusAreas:['driving','iron','putting']});g.sessionsPerWeek=Math.max(1,Math.min(7,s));g.minutesPerSession=Math.max(5,Math.min(180,m));lsSet('goals',g);showToast('목표가 저장되었습니다');showPracticePlanner()};

// ===== 3. AI INSIGHT ENGINE =====
function showInsights(){
  var pn=document.getElementById('v6-insights');
  if(!pn){pn=createOverlay('insights');pn.id='v6-insights-panel'}
  else{pn=document.getElementById('v6-insights-panel')}
  var shots=getShotHistory();
  var html='<div class="v6-title">&#129504; &#xFE0E;AI &#xFE0E;인사이트</div>';

  if(shots.length<3){
    html+='<div class="v6-card"><p>최소 3개 이상의 샷 데이터가 필요합니다. 카메라 트래킹으로 샷을 기록해주세요.</p></div>';
  } else {
    var insights=generateInsights(shots);
    for(var i=0;i<insights.length;i++){
      var ins=insights[i];
      html+='<div class="v6-card"><h3>'+ins.icon+' '+ins.title+'</h3>';
      html+='<p>'+ins.text+'</p>';
      if(ins.action){html+='<div style="margin-top:8px;padding:8px 12px;background:rgba(0,255,136,0.08);border-radius:8px;font-size:0.8em;color:#00FF88">&#10148; '+ins.action+'</div>'}
      html+='</div>';
    }
  }
  pn.innerHTML='<button class="v6-close" onclick="window._v6Close(\'insights\')">&times;</button>'+html;
  openPanel('insights');playSfx('insight');
}

function generateInsights(shots){
  var insights=[];
  var clubStats={};
  var curves={Straight:0,Draw:0,Fade:0,Hook:0,Slice:0,straight:0,draw:0,fade:0,hook:0,slice:0};
  var speeds=[],angles=[];

  for(var i=0;i<shots.length;i++){
    var s=shots[i];
    var club=s.club||s.clubType||'Unknown';
    if(!clubStats[club])clubStats[club]={count:0,speeds:[],angles:[],curves:[]};
    clubStats[club].count++;
    if(s.maxSpeed||s.speed)clubStats[club].speeds.push(s.maxSpeed||s.speed);
    if(s.angle!=null)clubStats[club].angles.push(s.angle);
    if(s.curveType)clubStats[club].curves.push(s.curveType);
    if(s.curveType&&curves[s.curveType]!==undefined)curves[s.curveType]++;
    if(s.maxSpeed||s.speed)speeds.push(s.maxSpeed||s.speed);
    if(s.angle!=null)angles.push(s.angle);
  }

  var mostUsed='',mostCount=0,leastConsistent='',worstStdDev=0;
  for(var c in clubStats){
    if(clubStats[c].count>mostCount){mostCount=clubStats[c].count;mostUsed=c}
    if(clubStats[c].speeds.length>2){
      var avg=clubStats[c].speeds.reduce(function(a,b){return a+b},0)/clubStats[c].speeds.length;
      var variance=clubStats[c].speeds.reduce(function(a,b){return a+Math.pow(b-avg,2)},0)/clubStats[c].speeds.length;
      var stdDev=Math.sqrt(variance);
      if(stdDev>worstStdDev){worstStdDev=stdDev;leastConsistent=c}
    }
  }

  insights.push({icon:'&#128202;',title:'가장 많이 사용한 클럽',text:mostUsed+' ('+mostCount+'회 사용). 전체 샷의 '+Math.round(mostCount/shots.length*100)+'%를 차지합니다.',action:'다양한 클럽으로 연습해 게임 폭을 넓혀보세요'});

  if(leastConsistent){insights.push({icon:'&#9888;&#xFE0E;',title:'일관성 개선 필요',text:leastConsistent+'의 속도 편차가 가장 큽니다 (표준편차: '+worstStdDev.toFixed(1)+').',action:leastConsistent+' 연습에 집중하세요. 같은 스윙 템포로 10회 반복 드릴을 추천합니다'})}

  var sliceHook=(curves.Slice||0)+(curves.slice||0)+(curves.Hook||0)+(curves.hook||0);
  var straight=(curves.Straight||0)+(curves.straight||0);
  var drawFade=(curves.Draw||0)+(curves.draw||0)+(curves.Fade||0)+(curves.fade||0);
  var total=sliceHook+straight+drawFade;
  if(total>0){
    if(straight/total>0.5){insights.push({icon:'&#127919;',title:'직진성 우수!',text:'샷의 '+Math.round(straight/total*100)+'%가 직진(Straight)입니다. 경쟁앱 유저 평균(35%) 대비 우수합니다.'})}
    else if(sliceHook/total>0.4){
      var dominant=(curves.Slice||0)+(curves.slice||0)>(curves.Hook||0)+(curves.hook||0)?'슬라이스':'훅';
      insights.push({icon:'&#128260;',title:dominant+' 경향 감지',text:dominant+' 비율이 '+Math.round(sliceHook/total*100)+'%로 높습니다.',action:'그립과 얼라인먼트를 체크하세요. '+dominant+' 교정 드릴을 추천합니다'})
    }
  }

  if(speeds.length>5){
    var recent5=speeds.slice(-5);var older5=speeds.slice(-10,-5);
    if(older5.length===5){
      var recentAvg=recent5.reduce(function(a,b){return a+b},0)/5;
      var olderAvg=older5.reduce(function(a,b){return a+b},0)/5;
      var diff=recentAvg-olderAvg;
      if(diff>50){insights.push({icon:'&#128200;',title:'속도 향상 추세!',text:'최근 5샷 평균 속도가 이전 대비 '+Math.round(diff)+' 향상되었습니다.'})}
      else if(diff<-50){insights.push({icon:'&#128201;',title:'속도 하락 추세',text:'최근 5샷 평균 속도가 이전 대비 '+Math.round(Math.abs(diff))+' 하락했습니다.',action:'피로 관리에 신경 쓰세요. 워밍업 루틴을 추천합니다'})}
    }
  }

  if(angles.length>3){
    var avgAngle=angles.reduce(function(a,b){return a+b},0)/angles.length;
    if(avgAngle<15){insights.push({icon:'&#127744;',title:'낮은 탄도',text:'평균 발사 각도 '+avgAngle.toFixed(1)+'&deg;. 탄도가 낮아 롤이 많을 수 있습니다.',action:'볼 위치를 왼발 쪽으로 옮기거나 어드레스를 체크하세요'})}
    else if(avgAngle>35){insights.push({icon:'&#9925;&#xFE0E;',title:'높은 탄도',text:'평균 발사 각도 '+avgAngle.toFixed(1)+'&deg;. 바람에 영향을 많이 받을 수 있습니다.',action:'로프트 낮은 클럽이나 펀치샷 연습을 추천합니다'})}
  }

  insights.push({icon:'&#128203;',title:'데이터 요약',text:'총 '+shots.length+'개 샷, '+Object.keys(clubStats).length+'종 클럽 사용. '+(speeds.length>0?'평균 속도: '+Math.round(speeds.reduce(function(a,b){return a+b},0)/speeds.length):'')});

  return insights;
}

// ===== 4. CLUB FITTING REPORT =====
function showClubFitting(){
  var pn=document.getElementById('v6-fitting');
  if(!pn){pn=createOverlay('fitting');pn.id='v6-fitting-panel'}
  else{pn=document.getElementById('v6-fitting-panel')}
  var shots=getShotHistory();
  var html='<div class="v6-title">&#128295; &#xFE0E;클럽 피팅 리포트</div>';

  if(shots.length<5){
    html+='<div class="v6-card"><p>최소 5개 이상의 샷 데이터가 필요합니다.</p></div>';
  } else {
    var clubData={};
    for(var i=0;i<shots.length;i++){
      var s=shots[i];var club=s.club||s.clubType||'Unknown';
      if(!clubData[club])clubData[club]={count:0,speeds:[],angles:[],straights:0,curves:0};
      clubData[club].count++;
      if(s.maxSpeed||s.speed)clubData[club].speeds.push(s.maxSpeed||s.speed);
      if(s.angle!=null)clubData[club].angles.push(s.angle);
      if(s.curveType==='Straight'||s.curveType==='straight')clubData[club].straights++;
      else clubData[club].curves++;
    }

    html+='<table class="v6-table"><tr><th>클럽</th><th>사용</th><th>평균속도</th><th>정확도</th><th>등급</th></tr>';
    var sorted=Object.keys(clubData).sort(function(a,b){return clubData[b].count-clubData[a].count});
    for(var j=0;j<sorted.length;j++){
      var cn=sorted[j],cd=clubData[cn];
      var avgSpd=cd.speeds.length>0?Math.round(cd.speeds.reduce(function(a,b){return a+b},0)/cd.speeds.length):0;
      var accuracy=cd.count>0?Math.round(cd.straights/cd.count*100):0;
      var grade=accuracy>=60?'A':accuracy>=45?'B':accuracy>=30?'C':accuracy>=15?'D':'F';
      var gradeClass='v6-badge-'+grade.toLowerCase();
      html+='<tr><td style="color:#fff;font-weight:600">'+cn+'</td><td>'+cd.count+'</td><td>'+avgSpd+'</td><td>'+accuracy+'%</td><td><span class="v6-badge '+gradeClass+'">'+grade+'</span></td></tr>';
    }
    html+='</table>';

    var bestClub='',bestAcc=0,worstClub='',worstAcc=100;
    for(var k in clubData){if(clubData[k].count>=2){var acc=clubData[k].straights/clubData[k].count*100;if(acc>bestAcc){bestAcc=acc;bestClub=k}if(acc<worstAcc){worstAcc=acc;worstClub=k}}}

    if(bestClub){
      html+='<div class="v6-card" style="margin-top:12px"><h3>&#127942; &#xFE0E;최고 성능 클럽</h3>';
      html+='<p><strong style="color:#00FF88">'+bestClub+'</strong> &mdash; 정확도 '+Math.round(bestAcc)+'%. 자신감을 가지고 사용하세요.</p></div>';
    }
    if(worstClub&&worstClub!==bestClub){
      html+='<div class="v6-card"><h3>&#128296; &#xFE0E;개선 필요 클럽</h3>';
      html+='<p><strong style="color:#ff6b6b">'+worstClub+'</strong> &mdash; 정확도 '+Math.round(worstAcc)+'%. 레슨이나 피팅 상담을 고려하세요.</p></div>';
    }
  }
  pn.innerHTML='<button class="v6-close" onclick="window._v6Close(\'fitting\')">&times;</button>'+html;
  openPanel('fitting');playSfx('insight');
}

// ===== 5. PRACTICE JOURNAL =====
function showJournal(){
  var pn=document.getElementById('v6-journal');
  if(!pn){pn=createOverlay('journal');pn.id='v6-journal-panel'}
  else{pn=document.getElementById('v6-journal-panel')}
  var entries=lsGet('journal',[]);
  var html='<div class="v6-title">&#128221; &#xFE0E;연습 일지</div>';

  html+='<div class="v6-card"><h3>새 기록 작성</h3>';
  html+='<textarea id="v6-journal-text" class="v6-input v6-textarea" placeholder="오늘의 연습 내용, 느낀 점, 개선할 점..."></textarea>';
  html+='<div style="margin-top:8px;display:flex;gap:4px;flex-wrap:wrap">';
  var moods=[{id:'great',emoji:'&#128170;',label:'컨디션 최고'},{id:'good',emoji:'&#128077;',label:'좋음'},{id:'normal',emoji:'&#128528;',label:'보통'},{id:'tired',emoji:'&#128564;',label:'피곤'},{id:'bad',emoji:'&#128078;',label:'나쁨'}];
  for(var m=0;m<moods.length;m++){
    html+='<span class="v6-tag v6-tag-inactive" id="v6-mood-'+moods[m].id+'" onclick="window._v6SelectMood(\''+moods[m].id+'\')">'+moods[m].emoji+' '+moods[m].label+'</span>';
  }
  html+='</div>';
  html+='<div style="margin-top:8px;display:flex;gap:4px;flex-wrap:wrap">';
  var weathers=[{id:'sunny',label:'&#9728;&#xFE0E; 맑음'},{id:'cloudy',label:'&#9729;&#xFE0E; 흐림'},{id:'rainy',label:'&#127783;&#xFE0E; 비'},{id:'windy',label:'&#127788;&#xFE0E; 바람'}];
  for(var w=0;w<weathers.length;w++){
    html+='<span class="v6-tag v6-tag-inactive" id="v6-weather-'+weathers[w].id+'" onclick="window._v6SelectWeather(\''+weathers[w].id+'\')">'+weathers[w].label+'</span>';
  }
  html+='</div>';
  html+='<button class="v6-btn v6-btn-primary" style="margin-top:10px" onclick="window._v6SaveJournal()">저장</button>';
  html+='</div>';

  if(entries.length>0){
    html+='<div style="color:#888;font-size:0.85em;margin:12px 0 8px">최근 기록 ('+entries.length+'개)</div>';
    var show=Math.min(entries.length,10);
    for(var e=entries.length-1;e>=entries.length-show;e--){
      var en=entries[e];
      html+='<div class="v6-card"><div style="display:flex;justify-content:space-between;align-items:center">';
      html+='<span style="color:#00B4D8;font-size:0.8em">'+en.date+'</span>';
      html+='<div>';
      if(en.mood)html+='<span class="v6-badge v6-badge-b">'+en.mood+'</span> ';
      if(en.weather)html+='<span class="v6-badge v6-badge-c">'+en.weather+'</span>';
      html+='</div></div>';
      html+='<p style="margin-top:6px">'+en.text.replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</p>';
      html+='<button class="v6-btn" style="margin-top:6px;font-size:0.75em;padding:4px 10px" onclick="window._v6DeleteJournal('+e+')">삭제</button>';
      html+='</div>';
    }
  }
  pn.innerHTML='<button class="v6-close" onclick="window._v6Close(\'journal\')">&times;</button>'+html;
  openPanel('journal');playSfx('journal');
}

var selectedMood='',selectedWeather='';
window._v6SelectMood=function(id){selectedMood=id;var el=document.querySelectorAll('[id^="v6-mood-"]');for(var i=0;i<el.length;i++){el[i].className='v6-tag v6-tag-inactive'}var s=document.getElementById('v6-mood-'+id);if(s)s.className='v6-tag v6-tag-active'};
window._v6SelectWeather=function(id){selectedWeather=id;var el=document.querySelectorAll('[id^="v6-weather-"]');for(var i=0;i<el.length;i++){el[i].className='v6-tag v6-tag-inactive'}var s=document.getElementById('v6-weather-'+id);if(s)s.className='v6-tag v6-tag-active'};
window._v6SaveJournal=function(){var text=document.getElementById('v6-journal-text').value.trim();if(!text){showToast('내용을 입력해주세요');return}var entries=lsGet('journal',[]);entries.push({date:todayStr(),text:text,mood:selectedMood,weather:selectedWeather,timestamp:Date.now()});if(entries.length>100)entries=entries.slice(-100);lsSet('journal',entries);selectedMood='';selectedWeather='';playSfx('journal');showToast('일지가 저장되었습니다');showJournal()};
window._v6DeleteJournal=function(idx){var entries=lsGet('journal',[]);entries.splice(idx,1);lsSet('journal',entries);showJournal()};

// ===== 6. SHOT CLUSTERING =====
function showClusters(){
  var pn=document.getElementById('v6-clusters');
  if(!pn){pn=createOverlay('clusters');pn.id='v6-clusters-panel'}
  else{pn=document.getElementById('v6-clusters-panel')}
  var shots=getShotHistory();
  var html='<div class="v6-title">&#128208; &#xFE0E;샷 클러스터 분석</div>';

  if(shots.length<6){
    html+='<div class="v6-card"><p>최소 6개 이상의 샷 데이터가 필요합니다.</p></div>';
  } else {
    var features=[];
    for(var i=0;i<shots.length;i++){
      var s=shots[i];
      features.push({speed:s.maxSpeed||s.speed||0,angle:s.angle||0,idx:i,curve:s.curveType||'Unknown',club:s.club||s.clubType||'Unknown'});
    }
    var clusters=kMeansClusters(features,3);

    var clusterNames=['&#127941; &#xFE0E;프리미엄 샷','&#127775; &#xFE0E;평균 샷','&#128296; &#xFE0E;개선 필요'];
    clusters.sort(function(a,b){return b.avgSpeed-a.avgSpeed});

    for(var c=0;c<clusters.length;c++){
      var cl=clusters[c];
      if(cl.members.length===0)continue;
      html+='<div class="v6-card"><h3>'+clusterNames[c]+' ('+cl.members.length+'개)</h3>';
      html+='<div class="v6-grid">';
      html+='<div class="v6-stat"><div class="v6-stat-num" style="font-size:1.3em;color:'+(c===0?'#00FF88':c===1?'#00B4D8':'#ff6b6b')+'">'+Math.round(cl.avgSpeed)+'</div><div class="v6-stat-label">평균 속도</div></div>';
      html+='<div class="v6-stat"><div class="v6-stat-num" style="font-size:1.3em;color:'+(c===0?'#00FF88':c===1?'#00B4D8':'#ff6b6b')+'">'+cl.avgAngle.toFixed(1)+'&deg;</div><div class="v6-stat-label">평균 각도</div></div>';
      html+='</div>';
      var topClubs={};
      for(var m=0;m<cl.members.length;m++){var clu=cl.members[m].club;topClubs[clu]=(topClubs[clu]||0)+1}
      var clubList=Object.keys(topClubs).sort(function(a,b){return topClubs[b]-topClubs[a]}).slice(0,3);
      html+='<p style="margin-top:6px">주 사용 클럽: '+clubList.join(', ')+'</p>';
      html+='</div>';
    }

    html+='<div class="v6-card"><h3>&#128161; &#xFE0E;클러스터 인사이트</h3>';
    if(clusters[0]&&clusters[2]&&clusters[0].members.length>0&&clusters[2].members.length>0){
      var speedGap=clusters[0].avgSpeed-clusters[2].avgSpeed;
      html+='<p>프리미엄 샷과 개선 필요 샷의 속도 차이: <strong style="color:#00B4D8">'+Math.round(speedGap)+'</strong></p>';
      html+='<p style="margin-top:4px">프리미엄 샷 비율: <strong style="color:#00FF88">'+Math.round(clusters[0].members.length/shots.length*100)+'%</strong></p>';
    }
    html+='</div>';
  }
  pn.innerHTML='<button class="v6-close" onclick="window._v6Close(\'clusters\')">&times;</button>'+html;
  openPanel('clusters');playSfx('cluster');
}

function kMeansClusters(data,k){
  if(data.length<k)return[];
  var maxSpd=0,maxAng=0;
  for(var i=0;i<data.length;i++){if(data[i].speed>maxSpd)maxSpd=data[i].speed;if(data[i].angle>maxAng)maxAng=data[i].angle}
  if(maxSpd===0)maxSpd=1;if(maxAng===0)maxAng=1;
  var centroids=[];
  var step=Math.floor(data.length/k);
  for(var c=0;c<k;c++){var d=data[c*step];centroids.push({speed:d.speed/maxSpd,angle:d.angle/maxAng})}
  for(var iter=0;iter<20;iter++){
    var groups=[];for(var g=0;g<k;g++)groups.push([]);
    for(var j=0;j<data.length;j++){
      var ns=data[j].speed/maxSpd,na=data[j].angle/maxAng;
      var minDist=Infinity,minIdx=0;
      for(var cc=0;cc<k;cc++){var dist=Math.pow(ns-centroids[cc].speed,2)+Math.pow(na-centroids[cc].angle,2);if(dist<minDist){minDist=dist;minIdx=cc}}
      groups[minIdx].push(data[j]);
    }
    for(var gg=0;gg<k;gg++){
      if(groups[gg].length===0)continue;
      var sumS=0,sumA=0;
      for(var mm=0;mm<groups[gg].length;mm++){sumS+=groups[gg][mm].speed/maxSpd;sumA+=groups[gg][mm].angle/maxAng}
      centroids[gg]={speed:sumS/groups[gg].length,angle:sumA/groups[gg].length};
    }
  }
  var result=[];
  var finalGroups=[];for(var fg=0;fg<k;fg++)finalGroups.push([]);
  for(var jj=0;jj<data.length;jj++){
    var ns2=data[jj].speed/maxSpd,na2=data[jj].angle/maxAng;
    var md=Infinity,mi=0;
    for(var cc2=0;cc2<k;cc2++){var d2=Math.pow(ns2-centroids[cc2].speed,2)+Math.pow(na2-centroids[cc2].angle,2);if(d2<md){md=d2;mi=cc2}}
    finalGroups[mi].push(data[jj]);
  }
  for(var r=0;r<k;r++){
    var avgS=0,avgA=0;
    for(var rm=0;rm<finalGroups[r].length;rm++){avgS+=finalGroups[r][rm].speed;avgA+=finalGroups[r][rm].angle}
    if(finalGroups[r].length>0){avgS/=finalGroups[r].length;avgA/=finalGroups[r].length}
    result.push({members:finalGroups[r],avgSpeed:avgS,avgAngle:avgA});
  }
  return result;
}

// ===== 7. PERSONAL LEADERBOARD =====
function showLeaderboard(){
  var pn=document.getElementById('v6-leaderboard');
  if(!pn){pn=createOverlay('leaderboard');pn.id='v6-leaderboard-panel'}
  else{pn=document.getElementById('v6-leaderboard-panel')}
  var shots=getShotHistory();
  var records=lsGet('records',{});
  var html='<div class="v6-title">&#127942; &#xFE0E;개인 리더보드</div>';

  var currentBest={maxSpeed:0,bestAngle:0,longestDistance:0,straightCount:0};
  for(var i=0;i<shots.length;i++){
    var s=shots[i];
    var spd=s.maxSpeed||s.speed||0;
    if(spd>currentBest.maxSpeed)currentBest.maxSpeed=spd;
    if((s.angle||0)>currentBest.bestAngle)currentBest.bestAngle=s.angle||0;
    if((s.distance||0)>currentBest.longestDistance)currentBest.longestDistance=s.distance||0;
    if(s.curveType==='Straight'||s.curveType==='straight')currentBest.straightCount++;
  }

  var categories=[
    {key:'maxSpeed',name:'최고 속도',value:Math.round(currentBest.maxSpeed),unit:'px/s',icon:'&#9889;&#xFE0E;'},
    {key:'bestAngle',name:'최고 발사각',value:currentBest.bestAngle.toFixed(1),unit:'&deg;',icon:'&#128640;'},
    {key:'longestDistance',name:'최장 거리',value:Math.round(currentBest.longestDistance),unit:'px',icon:'&#127948;&#xFE0E;'},
    {key:'straightCount',name:'직진 샷 수',value:currentBest.straightCount,unit:'회',icon:'&#127919;'},
    {key:'totalShots',name:'총 샷 수',value:shots.length,unit:'개',icon:'&#9971;&#xFE0E;'}
  ];

  html+='<div class="v6-grid">';
  for(var c=0;c<categories.length;c++){
    var cat=categories[c];
    var prev=records[cat.key]||0;
    var isRecord=parseFloat(cat.value)>parseFloat(prev);
    if(isRecord&&cat.value>0){records[cat.key]=cat.value}
    html+='<div class="v6-card v6-stat">';
    html+='<div style="font-size:1.5em;margin-bottom:4px">'+cat.icon+'</div>';
    html+='<div class="v6-stat-num" style="font-size:1.5em;color:'+(isRecord?'#FFD700':'#00FF88')+'">'+cat.value+'</div>';
    html+='<div class="v6-stat-label">'+cat.name+'</div>';
    if(isRecord&&prev>0)html+='<div style="font-size:0.7em;color:#FFD700;margin-top:4px">NEW RECORD! (이전: '+prev+')</div>';
    html+='</div>';
  }
  html+='</div>';
  lsSet('records',records);

  var practiced=lsGet('practiced',{});
  var totalDays=Object.keys(practiced).length;
  var totalMinutes=0;
  for(var pd in practiced){if(practiced[pd].minutes)totalMinutes+=practiced[pd].minutes}
  html+='<div class="v6-card" style="margin-top:12px"><h3>&#128200; &#xFE0E;누적 통계</h3>';
  html+='<div class="v6-grid">';
  html+='<div class="v6-stat"><div class="v6-stat-num" style="font-size:1.3em">'+totalDays+'</div><div class="v6-stat-label">연습 일수</div></div>';
  html+='<div class="v6-stat"><div class="v6-stat-num" style="font-size:1.3em">'+Math.round(totalMinutes/60*10)/10+'</div><div class="v6-stat-label">총 연습 시간(h)</div></div>';
  html+='</div></div>';

  var courseScores=lsGet('course_scores',[]);
  if(courseScores.length>0){
    html+='<div class="v6-card"><h3>&#9971;&#xFE0E; 코스 시뮬 기록</h3>';
    html+='<p>최근 라운드: '+courseScores.length+'홀, 총 '+courseScores.reduce(function(a,b){return a+b},0)+'타</p></div>';
  }

  pn.innerHTML='<button class="v6-close" onclick="window._v6Close(\'leaderboard\')">&times;</button>'+html;
  openPanel('leaderboard');playSfx('record');
}

// ===== 8. SHOT SHAPE GUIDE =====
function showShotShapeGuide(){
  var pn=document.getElementById('v6-shapes');
  if(!pn){pn=createOverlay('shapes');pn.id='v6-shapes-panel'}
  else{pn=document.getElementById('v6-shapes-panel')}

  var shapes=[
    {name:'Straight',ko:'직진',desc:'목표 방향으로 일직선 비행',color:'#00FF88',fix:'완벽한 스윙!'},
    {name:'Draw',ko:'드로우',desc:'약간 우→좌 곡선 (오른손잡이)',color:'#00B4D8',fix:'이상적인 샷. 비거리 증가'},
    {name:'Fade',ko:'페이드',desc:'약간 좌→우 곡선 (오른손잡이)',color:'#FFC107',fix:'컨트롤 우수. 핀을 향해 부드럽게'},
    {name:'Hook',ko:'훅',desc:'급격한 우→좌 곡선',color:'#ff6b6b',fix:'그립 압력 줄이기. 테이크백 느리게'},
    {name:'Slice',ko:'슬라이스',desc:'급격한 좌→우 곡선',color:'#E040FB',fix:'다운스윙 인투아웃 경로 연습'},
    {name:'Push',ko:'푸시',desc:'목표 우측으로 직선 비행',color:'#FF9800',fix:'볼 위치를 앞으로. 어드레스 체크'},
    {name:'Pull',ko:'풀',desc:'목표 좌측으로 직선 비행',color:'#42A5F5',fix:'아웃투인 경로 교정. 하체 리드'}
  ];

  var shots=getShotHistory();
  var shapeCounts={};
  for(var i=0;i<shots.length;i++){var ct=shots[i].curveType||'Unknown';shapeCounts[ct]=(shapeCounts[ct]||0)+1}

  var html='<div class="v6-title">&#127919; &#xFE0E;샷 형태 가이드</div>';
  html+='<div style="text-align:center;margin-bottom:16px">';
  html+='<svg width="260" height="200" viewBox="0 0 260 200">';
  html+='<rect x="0" y="0" width="260" height="200" fill="rgba(0,50,0,0.3)" rx="8"/>';
  html+='<line x1="130" y1="180" x2="130" y2="20" stroke="#444" stroke-width="1" stroke-dasharray="4"/>';
  html+='<circle cx="130" cy="185" r="4" fill="#fff"/>';
  // Straight
  html+='<line x1="130" y1="180" x2="130" y2="30" stroke="#00FF88" stroke-width="2"/>';
  // Draw
  html+='<path d="M130 180 Q 140 100 120 30" stroke="#00B4D8" stroke-width="1.5" fill="none"/>';
  // Fade
  html+='<path d="M130 180 Q 120 100 140 30" stroke="#FFC107" stroke-width="1.5" fill="none"/>';
  // Hook
  html+='<path d="M130 180 Q 155 90 80 30" stroke="#ff6b6b" stroke-width="1.5" fill="none"/>';
  // Slice
  html+='<path d="M130 180 Q 105 90 190 30" stroke="#E040FB" stroke-width="1.5" fill="none"/>';
  // Push
  html+='<line x1="130" y1="180" x2="170" y2="30" stroke="#FF9800" stroke-width="1.5"/>';
  // Pull
  html+='<line x1="130" y1="180" x2="90" y2="30" stroke="#42A5F5" stroke-width="1.5"/>';
  html+='<text x="130" y="196" fill="#888" font-size="9" text-anchor="middle">TEE</text>';
  html+='</svg></div>';

  for(var s=0;s<shapes.length;s++){
    var sh=shapes[s];
    var count=shapeCounts[sh.name]||shapeCounts[sh.name.toLowerCase()]||0;
    html+='<div class="v6-card" style="border-left:3px solid '+sh.color+'">';
    html+='<div style="display:flex;justify-content:space-between;align-items:center">';
    html+='<h3 style="color:'+sh.color+'">'+sh.name+' ('+sh.ko+')</h3>';
    if(count>0)html+='<span class="v6-badge v6-badge-b">'+count+'회</span>';
    html+='</div>';
    html+='<p>'+sh.desc+'</p>';
    html+='<div style="margin-top:4px;font-size:0.8em;color:#00FF88">&#128161; '+sh.fix+'</div>';
    html+='</div>';
  }

  pn.innerHTML='<button class="v6-close" onclick="window._v6Close(\'shapes\')">&times;</button>'+html;
  openPanel('shapes');playSfx('insight');
}

// ===== 9. QUICK ACTIONS & KEYBOARD =====
function injectQuickActions(){
  var existing=document.querySelector('.v6-quick-actions');
  if(existing)return;
  var container=document.createElement('div');
  container.className='v6-quick-actions';
  var buttons=[
    {icon:'&#9971;&#xFE0E;',title:'코스 시뮬 (N)',fn:'showCourseSimulator'},
    {icon:'&#128197;',title:'연습 플래너 (P)',fn:'showPracticePlanner'},
    {icon:'&#129504;',title:'AI 인사이트 (I)',fn:'showInsights'},
    {icon:'&#128295;',title:'클럽 피팅 (F)',fn:'showClubFitting'},
    {icon:'&#128221;',title:'연습 일지 (J)',fn:'showJournal'},
    {icon:'&#128208;',title:'샷 클러스터 (K)',fn:'showClusters'},
    {icon:'&#127942;',title:'리더보드 (L)',fn:'showLeaderboard'},
    {icon:'&#127919;',title:'샷 형태 가이드 (G)',fn:'showShotShapeGuide'}
  ];
  for(var i=0;i<buttons.length;i++){
    var btn=document.createElement('button');
    btn.className='v6-quick-btn';
    btn.innerHTML=buttons[i].icon;
    btn.title=buttons[i].title;
    btn.setAttribute('data-fn',buttons[i].fn);
    btn.addEventListener('click',function(){
      var fn=this.getAttribute('data-fn');
      if(window['_v6_'+fn])window['_v6_'+fn]();
    });
    container.appendChild(btn);
  }
  document.body.appendChild(container);
}

window._v6_showCourseSimulator=showCourseSimulator;
window._v6_showPracticePlanner=showPracticePlanner;
window._v6_showInsights=showInsights;
window._v6_showClubFitting=showClubFitting;
window._v6_showJournal=showJournal;
window._v6_showClusters=showClusters;
window._v6_showLeaderboard=showLeaderboard;
window._v6_showShotShapeGuide=showShotShapeGuide;
window._v6Close=function(id){closePanel(id)};

function setupKeyboard(){
  document.addEventListener('keydown',function(e){
    if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'||e.target.tagName==='SELECT')return;
    if(e.ctrlKey||e.metaKey||e.altKey)return;
    switch(e.key.toUpperCase()){
      case'N':e.preventDefault();showCourseSimulator();break;
      case'P':if(!e.shiftKey){e.preventDefault();showPracticePlanner()}break;
      case'I':e.preventDefault();showInsights();break;
      case'F':e.preventDefault();showClubFitting();break;
      case'J':e.preventDefault();showJournal();break;
      case'K':e.preventDefault();showClusters();break;
      case'L':e.preventDefault();showLeaderboard();break;
      case'G':e.preventDefault();showShotShapeGuide();break;
      case'ESCAPE':var overlays=document.querySelectorAll('.v6-overlay.active');for(var i=0;i<overlays.length;i++)overlays[i].classList.remove('active');break;
    }
  });
}

// ===== CSS =====
function injectCSS(){
  var s=document.createElement('style');
  s.textContent='.v6-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:9999;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;pointer-events:none}.v6-overlay.active{opacity:1;pointer-events:auto}.v6-panel{background:linear-gradient(145deg,rgba(20,25,35,.98),rgba(10,15,25,.98));border:1px solid rgba(0,180,216,.3);border-radius:16px;padding:24px;max-width:600px;width:92%;max-height:85vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.6),0 0 30px rgba(0,180,216,.1);position:relative}.v6-panel::-webkit-scrollbar{width:6px}.v6-panel::-webkit-scrollbar-thumb{background:rgba(0,180,216,.3);border-radius:3px}.v6-title{font-size:1.3em;font-weight:700;color:#00B4D8;margin-bottom:16px}.v6-close{position:absolute;top:12px;right:16px;background:none;border:none;color:#888;font-size:1.5em;cursor:pointer;padding:4px 8px;border-radius:8px;transition:all .2s;z-index:1}.v6-close:hover{color:#ff6b6b;background:rgba(255,107,107,.1)}.v6-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:16px;margin-bottom:12px;transition:all .2s}.v6-card:hover{border-color:rgba(0,180,216,.3);background:rgba(255,255,255,.06)}.v6-card h3{color:#00FF88;font-size:.95em;margin:0 0 8px}.v6-card p{color:#aaa;font-size:.85em;margin:0;line-height:1.5}.v6-badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:.75em;font-weight:600}.v6-badge-a{background:rgba(0,255,136,.15);color:#00FF88}.v6-badge-b{background:rgba(0,180,216,.15);color:#00B4D8}.v6-badge-c{background:rgba(255,193,7,.15);color:#FFC107}.v6-badge-d{background:rgba(255,107,107,.15);color:#ff6b6b}.v6-badge-f{background:rgba(136,136,136,.15);color:#888}.v6-btn{padding:8px 16px;border:1px solid rgba(0,180,216,.3);background:rgba(0,180,216,.1);color:#00B4D8;border-radius:8px;cursor:pointer;font-size:.85em;transition:all .2s}.v6-btn:hover{background:rgba(0,180,216,.2);border-color:#00B4D8}.v6-btn-primary{background:rgba(0,255,136,.15);border-color:rgba(0,255,136,.3);color:#00FF88}.v6-btn-primary:hover{background:rgba(0,255,136,.25)}.v6-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.v6-stat{text-align:center;padding:12px}.v6-stat-num{font-size:1.8em;font-weight:700;color:#00FF88}.v6-stat-label{font-size:.75em;color:#888;margin-top:4px}.v6-input{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:8px 12px;color:#fff;font-size:.9em;width:100%;box-sizing:border-box}.v6-input:focus{outline:none;border-color:rgba(0,180,216,.5)}.v6-textarea{min-height:80px;resize:vertical;font-family:inherit}.v6-tag{display:inline-block;padding:3px 10px;border-radius:12px;font-size:.75em;margin:2px;cursor:pointer;transition:all .2s}.v6-tag-active{background:rgba(0,180,216,.2);color:#00B4D8;border:1px solid rgba(0,180,216,.3)}.v6-tag-inactive{background:rgba(255,255,255,.04);color:#666;border:1px solid rgba(255,255,255,.08)}.v6-progress{height:6px;background:rgba(255,255,255,.06);border-radius:3px;overflow:hidden;margin-top:6px}.v6-progress-bar{height:100%;border-radius:3px;transition:width .5s}.v6-table{width:100%;border-collapse:collapse;font-size:.85em}.v6-table th{text-align:left;padding:8px;color:#00B4D8;border-bottom:1px solid rgba(255,255,255,.1);font-weight:600}.v6-table td{padding:8px;color:#ccc;border-bottom:1px solid rgba(255,255,255,.04)}.v6-quick-actions{position:fixed;bottom:80px;right:16px;display:flex;flex-direction:column;gap:8px;z-index:999}.v6-quick-btn{width:44px;height:44px;border-radius:12px;border:1px solid rgba(0,180,216,.3);background:rgba(10,15,25,.9);color:#00B4D8;font-size:1.2em;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;backdrop-filter:blur(10px);position:relative}.v6-quick-btn:hover{background:rgba(0,180,216,.15);transform:scale(1.1)}.v6-cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-top:8px}.v6-cal-day{aspect-ratio:1;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:.75em;border:1px solid rgba(255,255,255,.06)}.v6-cal-done{background:rgba(0,255,136,.15);color:#00FF88;border-color:rgba(0,255,136,.3)}.v6-cal-today{border-color:rgba(0,180,216,.5)}.v6-cal-empty{border:none}.v6-cal-header{color:#888;font-size:.7em;text-align:center;padding:4px}.v6-toast{position:fixed;top:20px;left:50%;transform:translateX(-50%) translateY(-100px);background:rgba(0,255,136,.15);border:1px solid rgba(0,255,136,.3);color:#00FF88;padding:10px 20px;border-radius:10px;z-index:99999;transition:transform .4s;font-size:.9em;backdrop-filter:blur(10px)}.v6-toast.show{transform:translateX(-50%) translateY(0)}@media(max-width:480px){.v6-panel{padding:16px;max-height:90vh}.v6-grid{grid-template-columns:1fr}.v6-quick-actions{bottom:70px;right:8px}.v6-quick-btn{width:38px;height:38px;font-size:1em}}';
  document.head.appendChild(s);
}

// ===== INIT =====
function init(){
  injectCSS();
  injectQuickActions();
  setupKeyboard();
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init)}
else{setTimeout(init,500)}

})();
