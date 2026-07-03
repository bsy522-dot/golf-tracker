(function(){
'use strict';
var LS='gt_v15_';
var audioCtx=null;
function getAC(){if(!audioCtx)try{audioCtx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}return audioCtx}
function playSfx(type){var ac=getAC();if(!ac)return;var o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);var t=ac.currentTime;g.gain.setValueAtTime(0.1,t);switch(type){case'rhythm_open':o.type='sine';o.frequency.setValueAtTime(330,t);o.frequency.linearRampToValueAtTime(440,t+0.08);o.frequency.linearRampToValueAtTime(554,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'rhythm_record':o.type='triangle';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(587,t+0.08);g.gain.setValueAtTime(0.08,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.18);o.start(t);o.stop(t+0.18);break;case'clubrec_open':o.type='sine';o.frequency.setValueAtTime(494,t);o.frequency.linearRampToValueAtTime(659,t+0.1);o.frequency.linearRampToValueAtTime(784,t+0.2);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'clubrec_pick':o.type='sine';o.frequency.setValueAtTime(659,t);o.frequency.linearRampToValueAtTime(880,t+0.1);g.gain.exponentialRampToValueAtTime(0.01,t+0.25);o.start(t);o.stop(t+0.25);break;case'predict_open':o.type='sine';o.frequency.setValueAtTime(392,t);o.frequency.setValueAtTime(494,t+0.08);o.frequency.setValueAtTime(587,t+0.16);o.frequency.setValueAtTime(784,t+0.24);g.gain.exponentialRampToValueAtTime(0.01,t+0.4);o.start(t);o.stop(t+0.4);break;case'predict_calc':o.type='triangle';o.frequency.setValueAtTime(587,t);o.frequency.linearRampToValueAtTime(784,t+0.12);o.frequency.linearRampToValueAtTime(1047,t+0.24);g.gain.exponentialRampToValueAtTime(0.01,t+0.4);o.start(t);o.stop(t+0.4);break;case'holeinone_open':o.type='sine';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(784,t+0.1);o.frequency.linearRampToValueAtTime(1047,t+0.2);o.frequency.linearRampToValueAtTime(1319,t+0.3);g.gain.exponentialRampToValueAtTime(0.01,t+0.5);o.start(t);o.stop(t+0.5);break;case'holeinone_hit':o.type='sine';o.frequency.setValueAtTime(880,t);o.frequency.linearRampToValueAtTime(1175,t+0.08);o.frequency.linearRampToValueAtTime(1568,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'swing_compare':o.type='sine';o.frequency.setValueAtTime(349,t);o.frequency.linearRampToValueAtTime(440,t+0.1);o.frequency.linearRampToValueAtTime(523,t+0.2);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'course_diff':o.type='sine';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(554,t+0.12);o.frequency.linearRampToValueAtTime(698,t+0.24);g.gain.exponentialRampToValueAtTime(0.01,t+0.4);o.start(t);o.stop(t+0.4);break;case'nutrition_open':o.type='triangle';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(659,t+0.1);g.gain.setValueAtTime(0.08,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.25);o.start(t);o.stop(t+0.25);break;case'v15_achieve':o.type='sine';o.frequency.setValueAtTime(784,t);o.frequency.setValueAtTime(988,t+0.1);o.frequency.setValueAtTime(1175,t+0.2);o.frequency.setValueAtTime(1568,t+0.3);g.gain.exponentialRampToValueAtTime(0.01,t+0.5);o.start(t);o.stop(t+0.5);break;default:o.type='sine';o.frequency.setValueAtTime(440,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.15);o.start(t);o.stop(t+0.15)}}

function lsGet(k,d){try{var v=localStorage.getItem(LS+k);return v?JSON.parse(v):d}catch(e){return d}}
function lsSet(k,v){try{localStorage.setItem(LS+k,JSON.stringify(v))}catch(e){}}
function todayStr(){return new Date().toISOString().slice(0,10)}
function showToast(msg){var t=document.createElement('div');t.className='v15-toast';t.textContent=msg;document.body.appendChild(t);setTimeout(function(){t.classList.add('show')},50);setTimeout(function(){t.classList.remove('show');setTimeout(function(){t.remove()},400)},3000)}
function createOverlay(id){var ov=document.createElement('div');ov.className='v15-overlay';ov.id='v15-'+id;ov.addEventListener('click',function(e){if(e.target===ov)closePanel(id)});var pn=document.createElement('div');pn.className='v15-panel';pn.style.position='relative';ov.appendChild(pn);return pn}
function openPanel(id){var el=document.getElementById('v15-'+id);if(el)el.classList.add('active')}
function closePanel(id){var el=document.getElementById('v15-'+id);if(el)el.classList.remove('active')}
function getPanel(id){var ov=document.getElementById('v15-'+id);if(!ov){var pn=createOverlay(id);pn.id='v15-'+id+'-panel';document.body.appendChild(pn.parentElement);return pn}return ov.querySelector('.v15-panel')||ov}

// ===== 1. ROUND RHYTHM ANALYZER Canvas =====
function showRoundRhythm(){
var pn=getPanel('rhythm');
var rounds=lsGet('rhythm_rounds',[]);
var html='<div class="v15-title">&#x23F1;&#xFE0F; 라운드 리듬 분석기</div>';

html+='<div class="v15-card"><h3>홀별 시간/스코어 기록</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v15-label">코스명</label><input id="v15-rh-course" class="v15-input" placeholder="코스명" value="'+lsGet('last_course','')+'"></div>';
html+='<div><label class="v15-label">현재 홀</label><select id="v15-rh-hole" class="v15-input">';
for(var h=1;h<=18;h++) html+='<option>'+h+'</option>';
html+='</select></div>';
html+='<div><label class="v15-label">Par</label><select id="v15-rh-par" class="v15-input"><option>3</option><option selected>4</option><option>5</option></select></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:6px">';
html+='<div><label class="v15-label">스코어</label><input id="v15-rh-score" class="v15-input" type="number" min="1" max="12" value="4"></div>';
html+='<div><label class="v15-label">소요시간(분)</label><input id="v15-rh-time" class="v15-input" type="number" min="5" max="30" value="12"></div>';
html+='<div><label class="v15-label">컨디션</label><select id="v15-rh-cond" class="v15-input"><option>최상</option><option selected>좋음</option><option>보통</option><option>피로</option><option>지침</option></select></div>';
html+='</div>';
html+='<button class="v15-btn v15-btn-primary" style="width:100%;margin-top:10px" onclick="window._v15RecordRhythm()">홀 기록 저장</button></div>';

html+='<canvas id="v15-rhythm-canvas" width="640" height="380" style="width:100%;max-width:640px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

var currentRound=lsGet('current_rhythm_holes',[]);
if(currentRound.length>0){
  html+='<div class="v15-card"><h3>현재 라운드 진행 ('+currentRound.length+'/18홀)</h3>';
  var totalTime=0,totalScore=0,totalPar=0;
  for(var i=0;i<currentRound.length;i++){totalTime+=currentRound[i].time;totalScore+=currentRound[i].score;totalPar+=currentRound[i].par;}
  var avg=currentRound.length>0?Math.round(totalTime/currentRound.length*10)/10:0;
  html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:8px">';
  html+='<div class="v15-stat-card"><div class="v15-stat-val" style="color:#00FF88">'+totalScore+'</div><div class="v15-stat-label">총 스코어</div></div>';
  html+='<div class="v15-stat-card"><div class="v15-stat-val" style="color:#00B4D8">'+(totalScore-totalPar>0?'+':'')+(totalScore-totalPar)+'</div><div class="v15-stat-label">vs Par</div></div>';
  html+='<div class="v15-stat-card"><div class="v15-stat-val" style="color:#FFB800">'+totalTime+'분</div><div class="v15-stat-label">총 시간</div></div>';
  html+='<div class="v15-stat-card"><div class="v15-stat-val" style="color:#E8A87C">'+avg+'분</div><div class="v15-stat-label">홀 평균</div></div>';
  html+='</div>';

  var fastHole=currentRound[0],slowHole=currentRound[0];
  for(var j=1;j<currentRound.length;j++){
    if(currentRound[j].time<fastHole.time) fastHole=currentRound[j];
    if(currentRound[j].time>slowHole.time) slowHole=currentRound[j];
  }
  html+='<div style="margin-top:8px;font-size:.82em;color:#aaa">';
  html+='<div>&#x26A1; 가장 빠른 홀: '+fastHole.hole+'번 ('+fastHole.time+'분)</div>';
  html+='<div>&#x1F422; 가장 느린 홀: '+slowHole.hole+'번 ('+slowHole.time+'분)</div>';
  var condCounts={};
  for(var c=0;c<currentRound.length;c++){condCounts[currentRound[c].cond]=(condCounts[currentRound[c].cond]||0)+1;}
  var topCond='',topCnt=0;for(var cn in condCounts){if(condCounts[cn]>topCnt){topCnt=condCounts[cn];topCond=cn;}}
  html+='<div>&#x1F3AF; 주요 컨디션: '+topCond+' ('+topCnt+'홀)</div>';
  html+='</div>';
  if(currentRound.length>=18){
    html+='<button class="v15-btn" style="width:100%;margin-top:8px" onclick="window._v15SaveRound()">라운드 완료 &amp; 저장</button>';
  }
  html+='<button class="v15-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="window._v15ResetRound()">현재 라운드 초기화</button>';
  html+='</div>';
}

html+='<div class="v15-card"><h3>&#x1F4D6; 리듬 관리 팁</h3>';
html+='<div style="font-size:.82em;color:#aaa;line-height:1.7">';
html+='<div>&#x2022; Par3는 10-12분, Par4는 13-15분, Par5는 15-18분이 이상적</div>';
html+='<div>&#x2022; 전반 9홀과 후반 9홀의 시간 균형을 유지하세요</div>';
html+='<div>&#x2022; 보기 이후 홀에서 서두르지 말고 루틴을 유지하세요</div>';
html+='<div>&#x2022; 피로를 느끼면 프리샷 루틴에 더 집중하세요</div>';
html+='</div></div>';

pn.innerHTML='<button class="v15-close" onclick="window._v15Close(\'rhythm\')">&times;</button>'+html;
openPanel('rhythm');playSfx('rhythm_open');
setTimeout(function(){renderRhythmCanvas(currentRound)},120);
v15CheckAch();lsSet('ach_rhythm_viewed',true);
}

window._v15RecordRhythm=function(){
var course=document.getElementById('v15-rh-course').value||'기본코스';
var hole=parseInt(document.getElementById('v15-rh-hole').value);
var par=parseInt(document.getElementById('v15-rh-par').value);
var score=parseInt(document.getElementById('v15-rh-score').value)||4;
var time=parseInt(document.getElementById('v15-rh-time').value)||12;
var cond=document.getElementById('v15-rh-cond').value;
var holes=lsGet('current_rhythm_holes',[]);
var exists=false;for(var i=0;i<holes.length;i++){if(holes[i].hole===hole){holes[i]={hole:hole,par:par,score:score,time:time,cond:cond};exists=true;break;}}
if(!exists) holes.push({hole:hole,par:par,score:score,time:time,cond:cond});
holes.sort(function(a,b){return a.hole-b.hole});
lsSet('current_rhythm_holes',holes);lsSet('last_course',course);
playSfx('rhythm_record');showToast(hole+'번홀 기록! ('+score+'타 / '+time+'분)');
closePanel('rhythm');setTimeout(showRoundRhythm,200);
};

window._v15SaveRound=function(){
var holes=lsGet('current_rhythm_holes',[]);
if(holes.length<1) return;
var rounds=lsGet('rhythm_rounds',[]);
rounds.push({date:todayStr(),course:lsGet('last_course',''),holes:holes});
if(rounds.length>50) rounds=rounds.slice(-50);
lsSet('rhythm_rounds',rounds);lsSet('current_rhythm_holes',[]);
playSfx('rhythm_record');showToast('라운드 저장 완료!');
closePanel('rhythm');setTimeout(showRoundRhythm,200);
};

window._v15ResetRound=function(){
lsSet('current_rhythm_holes',[]);showToast('라운드 초기화');
closePanel('rhythm');setTimeout(showRoundRhythm,200);
};

function renderRhythmCanvas(holes){
var canvas=document.getElementById('v15-rhythm-canvas');if(!canvas)return;
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a1020';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00B4D8';ctx.font='bold 13px sans-serif';ctx.textAlign='left';
ctx.fillText('Round Rhythm Analysis',20,28);
if(holes.length===0){ctx.fillStyle='#555';ctx.textAlign='center';ctx.font='14px sans-serif';ctx.fillText('홀 데이터를 기록하면 리듬 차트가 표시됩니다',W/2,H/2);return;}
var maxTime=0,maxScore=0;
for(var i=0;i<holes.length;i++){if(holes[i].time>maxTime)maxTime=holes[i].time;if(holes[i].score>maxScore)maxScore=holes[i].score;}
maxTime=Math.max(maxTime,20);maxScore=Math.max(maxScore,7);
var left=50,right=W-30,top=50,bot=H-50;
var barW=Math.min(28,((right-left)/holes.length)-4);
ctx.strokeStyle='rgba(255,255,255,.08)';ctx.lineWidth=1;
for(var g=0;g<=4;g++){var gy=top+(bot-top)*g/4;ctx.beginPath();ctx.moveTo(left,gy);ctx.lineTo(right,gy);ctx.stroke();ctx.fillStyle='#555';ctx.font='10px sans-serif';ctx.textAlign='right';ctx.fillText(Math.round(maxTime*(1-g/4))+'분',left-6,gy+4);}
var condColors={'최상':'#00FF88','좋음':'#00B4D8','보통':'#FFB800','피로':'#E8A87C','지침':'#ff6b6b'};
for(var j=0;j<holes.length;j++){
  var x=left+(right-left)*(j+0.5)/holes.length;
  var h1=(holes[j].time/maxTime)*(bot-top);
  var cc=condColors[holes[j].cond]||'#00B4D8';
  var grad=ctx.createLinearGradient(0,bot-h1,0,bot);
  grad.addColorStop(0,cc);grad.addColorStop(1,'rgba(0,0,0,0.3)');
  ctx.fillStyle=grad;
  ctx.beginPath();ctx.roundRect(x-barW/2,bot-h1,barW,h1,3);ctx.fill();
  ctx.fillStyle='#fff';ctx.font='bold 10px sans-serif';ctx.textAlign='center';
  ctx.fillText(holes[j].time+'분',x,bot-h1-6);
  var diff=holes[j].score-holes[j].par;
  var diffStr=diff===0?'E':(diff>0?'+'+diff:''+diff);
  var diffCol=diff<0?'#00FF88':diff===0?'#FFB800':'#ff6b6b';
  ctx.fillStyle=diffCol;ctx.font='bold 9px sans-serif';
  ctx.fillText(diffStr,x,bot-h1-18);
  ctx.fillStyle='#888';ctx.font='10px sans-serif';
  ctx.fillText(holes[j].hole+'H',x,bot+14);
}
if(holes.length>1){
  ctx.strokeStyle='rgba(0,255,136,.5)';ctx.lineWidth=2;ctx.setLineDash([4,4]);ctx.beginPath();
  var totalTime=0;for(var s=0;s<holes.length;s++) totalTime+=holes[s].time;
  var avgTime=totalTime/holes.length;
  var avgY=bot-(avgTime/maxTime)*(bot-top);
  ctx.moveTo(left,avgY);ctx.lineTo(right,avgY);ctx.stroke();ctx.setLineDash([]);
  ctx.fillStyle='#00FF88';ctx.font='10px sans-serif';ctx.textAlign='left';
  ctx.fillText('AVG '+Math.round(avgTime*10)/10+'분',right-70,avgY-6);
}
ctx.fillStyle='#444';ctx.font='9px sans-serif';ctx.textAlign='center';
ctx.fillText('Golf Tracker Pro v15 - Round Rhythm',W/2,H-8);
}

// ===== 2. CLUB RECOMMENDATION AI =====
var CLUB_DATA=[
{name:'드라이버',dist:230,loft:10.5,use:'티샷, Par4/5 롱홀'},
{name:'3우드',dist:210,loft:15,use:'페어웨이, 긴 Par5 세컨드'},
{name:'5우드',dist:195,loft:18,use:'페어웨이/러프, 200yd 전후'},
{name:'4유틸',dist:185,loft:22,use:'긴 어프로치, 러프 탈출'},
{name:'5아이언',dist:170,loft:27,use:'미들 어프로치'},
{name:'6아이언',dist:160,loft:30,use:'미들 어프로치'},
{name:'7아이언',dist:150,loft:34,use:'미들~숏 어프로치'},
{name:'8아이언',dist:140,loft:38,use:'숏 어프로치'},
{name:'9아이언',dist:130,loft:42,use:'숏 어프로치, 정확도 우선'},
{name:'PW',dist:115,loft:46,use:'그린 공략, 100~120yd'},
{name:'AW(50)',dist:100,loft:50,use:'그린 주변, 하프스윙'},
{name:'SW(56)',dist:80,loft:56,use:'벙커, 높은 어프로치'},
{name:'LW(60)',dist:60,loft:60,use:'로브샷, 장애물 넘기기'}
];

function showClubRecommendation(){
var pn=getPanel('clubrec');
var html='<div class="v15-title">&#x1F916; 클럽 추천 AI</div>';

html+='<div class="v15-card"><h3>상황 입력</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v15-label">남은 거리(yd)</label><input id="v15-cr-dist" class="v15-input" type="number" min="30" max="300" value="150"></div>';
html+='<div><label class="v15-label">라이</label><select id="v15-cr-lie" class="v15-input"><option>페어웨이</option><option>러프</option><option>벙커</option><option>디봇</option><option>내리막</option><option>오르막</option><option>좌경사</option><option>우경사</option></select></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:6px">';
html+='<div><label class="v15-label">바람(m/s)</label><input id="v15-cr-wind" class="v15-input" type="number" min="0" max="15" value="2"></div>';
html+='<div><label class="v15-label">바람방향</label><select id="v15-cr-winddir" class="v15-input"><option>맞바람</option><option>뒷바람</option><option>좌측풍</option><option>우측풍</option></select></div>';
html+='<div><label class="v15-label">핀위치</label><select id="v15-cr-pin" class="v15-input"><option>가운데</option><option>앞</option><option>뒤</option><option>좌</option><option>우</option></select></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:6px">';
html+='<div><label class="v15-label">고도(m)</label><input id="v15-cr-alt" class="v15-input" type="number" min="0" max="2000" value="50"></div>';
html+='<div><label class="v15-label">기온(C)</label><input id="v15-cr-temp" class="v15-input" type="number" min="-5" max="42" value="25"></div>';
html+='</div>';
html+='<button class="v15-btn v15-btn-primary" style="width:100%;margin-top:10px" onclick="window._v15CalcClub()">클럽 추천받기</button></div>';

html+='<canvas id="v15-clubrec-canvas" width="600" height="360" style="width:100%;max-width:600px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

html+='<div id="v15-clubrec-result"></div>';

html+='<div class="v15-card"><h3>&#x1F4CB; 클럽별 기본 비거리 참고</h3>';
html+='<table class="v15-table"><tr><th>클럽</th><th>비거리</th><th>로프트</th><th>용도</th></tr>';
for(var i=0;i<CLUB_DATA.length;i++){
  html+='<tr><td style="color:#00FF88;font-weight:600">'+CLUB_DATA[i].name+'</td><td>'+CLUB_DATA[i].dist+'yd</td><td>'+CLUB_DATA[i].loft+'&deg;</td><td style="font-size:.78em;color:#888">'+CLUB_DATA[i].use+'</td></tr>';
}
html+='</table></div>';

pn.innerHTML='<button class="v15-close" onclick="window._v15Close(\'clubrec\')">&times;</button>'+html;
openPanel('clubrec');playSfx('clubrec_open');
v15CheckAch();lsSet('ach_clubrec_viewed',true);
}

window._v15CalcClub=function(){
var dist=parseInt(document.getElementById('v15-cr-dist').value)||150;
var lie=document.getElementById('v15-cr-lie').value;
var wind=parseInt(document.getElementById('v15-cr-wind').value)||0;
var windDir=document.getElementById('v15-cr-winddir').value;
var pin=document.getElementById('v15-cr-pin').value;
var alt=parseInt(document.getElementById('v15-cr-alt').value)||50;
var temp=parseInt(document.getElementById('v15-cr-temp').value)||25;

var adjDist=dist;
if(windDir==='맞바람') adjDist+=wind*2.5;
else if(windDir==='뒷바람') adjDist-=wind*1.8;
adjDist*=(1-((alt-50)*0.0002));
adjDist*=(1-((temp-25)*0.001));
if(lie==='러프') adjDist*=1.05;
else if(lie==='벙커') adjDist*=1.1;
else if(lie==='오르막') adjDist*=1.08;
else if(lie==='내리막') adjDist*=0.93;
else if(lie==='디봇') adjDist*=1.04;
if(pin==='뒤') adjDist+=5;
else if(pin==='앞') adjDist-=5;

var bestIdx=0,bestDiff=999;
for(var i=0;i<CLUB_DATA.length;i++){
  var d=Math.abs(CLUB_DATA[i].dist-adjDist);
  if(d<bestDiff){bestDiff=d;bestIdx=i;}
}
var primary=CLUB_DATA[bestIdx];
var altIdx=adjDist>primary.dist?(bestIdx>0?bestIdx-1:bestIdx):(bestIdx<CLUB_DATA.length-1?bestIdx+1:bestIdx);
var altClub=CLUB_DATA[altIdx];

var confidence=Math.max(50,Math.round(100-bestDiff*2));
var strategy='';
if(lie==='벙커') strategy='벙커에서는 SW/LW 로프트를 열고 모래를 먼저 치세요.';
else if(windDir==='맞바람'&&wind>=5) strategy='강한 맞바람: 1~2클럽 크게 잡고 낮은 탄도로 치세요.';
else if(dist<=100) strategy='숏게임 구간: 정확도 우선. 핀을 직접 공략하기보다 그린 가운데를 노리세요.';
else if(dist>=200) strategy='롱샷 구간: 무리하지 말고 레이업도 고려하세요.';
else strategy='적절한 클럽 선택 후 프리샷 루틴을 반드시 수행하세요.';

var resultDiv=document.getElementById('v15-clubrec-result');
if(resultDiv){
  var rhtml='<div class="v15-card" style="border-color:rgba(0,255,136,.3)">';
  rhtml+='<h3>&#x2705; AI 추천 결과</h3>';
  rhtml+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">';
  rhtml+='<div class="v15-stat-card" style="border-color:rgba(0,255,136,.2)"><div style="font-size:.7em;color:#888">1순위 추천</div><div class="v15-stat-val" style="color:#00FF88;font-size:1.4em">'+primary.name+'</div><div style="font-size:.78em;color:#aaa">기본 '+primary.dist+'yd</div></div>';
  rhtml+='<div class="v15-stat-card"><div style="font-size:.7em;color:#888">대안 클럽</div><div class="v15-stat-val" style="color:#00B4D8;font-size:1.4em">'+altClub.name+'</div><div style="font-size:.78em;color:#aaa">기본 '+altClub.dist+'yd</div></div>';
  rhtml+='</div>';
  rhtml+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:8px">';
  rhtml+='<div class="v15-stat-card"><div class="v15-stat-val" style="color:#FFB800">'+Math.round(adjDist)+'yd</div><div class="v15-stat-label">보정 거리</div></div>';
  rhtml+='<div class="v15-stat-card"><div class="v15-stat-val" style="color:'+(confidence>=80?'#00FF88':confidence>=60?'#FFB800':'#ff6b6b')+'">'+confidence+'%</div><div class="v15-stat-label">신뢰도</div></div>';
  rhtml+='<div class="v15-stat-card"><div class="v15-stat-val" style="color:#E8A87C">'+(adjDist-dist>0?'+':'')+Math.round(adjDist-dist)+'yd</div><div class="v15-stat-label">보정량</div></div>';
  rhtml+='</div>';
  rhtml+='<div style="margin-top:10px;padding:10px;background:rgba(0,255,136,.05);border-radius:8px;border-left:3px solid #00FF88"><div style="font-size:.72em;color:#00FF88;font-weight:700">AI 전략 조언</div><div style="font-size:.82em;color:#aaa;margin-top:4px">'+strategy+'</div></div>';
  rhtml+='</div>';
  resultDiv.innerHTML=rhtml;
}
playSfx('clubrec_pick');
renderClubRecCanvas(adjDist,bestIdx);

var logs=lsGet('clubrec_logs',[]);
logs.push({date:todayStr(),dist:dist,adj:Math.round(adjDist),club:primary.name,lie:lie,wind:wind,windDir:windDir});
if(logs.length>100) logs=logs.slice(-100);
lsSet('clubrec_logs',logs);
};

function renderClubRecCanvas(adjDist,bestIdx){
var canvas=document.getElementById('v15-clubrec-canvas');if(!canvas)return;
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a1020';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00B4D8';ctx.font='bold 13px sans-serif';ctx.textAlign='left';
ctx.fillText('Club Distance vs Target',20,28);

var left=60,right=W-30,top=50,bot=H-50;
var maxDist=260;
ctx.strokeStyle='rgba(255,255,255,.06)';ctx.lineWidth=1;
for(var g=0;g<=5;g++){var gy=top+(bot-top)*g/5;ctx.beginPath();ctx.moveTo(left,gy);ctx.lineTo(right,gy);ctx.stroke();ctx.fillStyle='#555';ctx.font='10px sans-serif';ctx.textAlign='right';ctx.fillText(Math.round(maxDist*(1-g/5))+'yd',left-6,gy+4);}

var barW=Math.min(30,((right-left)/CLUB_DATA.length)-4);
for(var i=0;i<CLUB_DATA.length;i++){
  var x=left+(right-left)*(i+0.5)/CLUB_DATA.length;
  var h1=(CLUB_DATA[i].dist/maxDist)*(bot-top);
  var col=i===bestIdx?'#00FF88':'rgba(0,180,216,.6)';
  var grad=ctx.createLinearGradient(0,bot-h1,0,bot);
  grad.addColorStop(0,col);grad.addColorStop(1,'rgba(0,0,0,0.3)');
  ctx.fillStyle=grad;
  ctx.beginPath();ctx.roundRect(x-barW/2,bot-h1,barW,h1,3);ctx.fill();
  if(i===bestIdx){ctx.strokeStyle='#00FF88';ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(x-barW/2,bot-h1,barW,h1,3);ctx.stroke();}
  ctx.fillStyle=i===bestIdx?'#fff':'#aaa';ctx.font=(i===bestIdx?'bold ':'')+' 9px sans-serif';ctx.textAlign='center';
  ctx.fillText(CLUB_DATA[i].dist+'',x,bot-h1-6);
  ctx.save();ctx.translate(x,bot+8);ctx.rotate(Math.PI*0.35);ctx.fillStyle='#888';ctx.font='8px sans-serif';ctx.textAlign='left';
  ctx.fillText(CLUB_DATA[i].name,0,0);ctx.restore();
}

ctx.strokeStyle='rgba(255,180,0,.6)';ctx.lineWidth=2;ctx.setLineDash([6,4]);
var targetY=bot-(adjDist/maxDist)*(bot-top);
ctx.beginPath();ctx.moveTo(left,targetY);ctx.lineTo(right,targetY);ctx.stroke();ctx.setLineDash([]);
ctx.fillStyle='#FFB800';ctx.font='bold 11px sans-serif';ctx.textAlign='right';
ctx.fillText('Target: '+Math.round(adjDist)+'yd',right,targetY-6);
ctx.fillStyle='#444';ctx.font='9px sans-serif';ctx.textAlign='center';
ctx.fillText('Golf Tracker Pro v15 - Club AI',W/2,H-8);
}

// ===== 3. SCORE PREDICTION ENGINE Canvas =====
function showScorePrediction(){
var pn=getPanel('predict');
var html='<div class="v15-title">&#x1F52E; 스코어 예측 엔진</div>';

html+='<div class="v15-card"><h3>현재 라운드 데이터 입력</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v15-label">진행된 홀 수</label><input id="v15-pr-holes" class="v15-input" type="number" min="1" max="17" value="9"></div>';
html+='<div><label class="v15-label">현재 총타수</label><input id="v15-pr-score" class="v15-input" type="number" min="1" max="120" value="42"></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:6px">';
html+='<div><label class="v15-label">코스 Par</label><input id="v15-pr-par" class="v15-input" type="number" min="60" max="80" value="72"></div>';
html+='<div><label class="v15-label">코스레이팅</label><input id="v15-pr-cr" class="v15-input" type="number" min="60" max="80" step="0.1" value="72.5"></div>';
html+='<div><label class="v15-label">슬로프</label><input id="v15-pr-slope" class="v15-input" type="number" min="55" max="155" value="128"></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:6px">';
html+='<div><label class="v15-label">컨디션</label><select id="v15-pr-cond" class="v15-input"><option>최상</option><option>좋음</option><option selected>보통</option><option>피로</option></select></div>';
html+='<div><label class="v15-label">핸디캡(있다면)</label><input id="v15-pr-hcp" class="v15-input" type="number" min="0" max="54" value="18"></div>';
html+='</div>';
html+='<button class="v15-btn v15-btn-primary" style="width:100%;margin-top:10px" onclick="window._v15Predict()">스코어 예측</button></div>';

html+='<canvas id="v15-predict-canvas" width="600" height="360" style="width:100%;max-width:600px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

html+='<div id="v15-predict-result"></div>';

html+='<div class="v15-card"><h3>&#x1F4CA; 예측 알고리즘 설명</h3>';
html+='<div style="font-size:.82em;color:#aaa;line-height:1.7">';
html+='<div>&#x2022; 현재까지의 홀당 평균 스코어를 기반으로 18홀 추정</div>';
html+='<div>&#x2022; 코스레이팅/슬로프로 코스 난이도 가중치 반영</div>';
html+='<div>&#x2022; 컨디션 변수로 후반 9홀 피로도 보정</div>';
html+='<div>&#x2022; &#x00B1;3타 범위의 신뢰구간 함께 제공</div>';
html+='</div></div>';

pn.innerHTML='<button class="v15-close" onclick="window._v15Close(\'predict\')">&times;</button>'+html;
openPanel('predict');playSfx('predict_open');
v15CheckAch();lsSet('ach_predict_viewed',true);
}

window._v15Predict=function(){
var holesPlayed=parseInt(document.getElementById('v15-pr-holes').value)||9;
var currentScore=parseInt(document.getElementById('v15-pr-score').value)||42;
var par=parseInt(document.getElementById('v15-pr-par').value)||72;
var cr=parseFloat(document.getElementById('v15-pr-cr').value)||72.5;
var slope=parseInt(document.getElementById('v15-pr-slope').value)||128;
var cond=document.getElementById('v15-pr-cond').value;
var hcp=parseInt(document.getElementById('v15-pr-hcp').value)||18;

var avgPerHole=currentScore/holesPlayed;
var remaining=18-holesPlayed;
var condMult=cond==='최상'?0.97:cond==='좋음'?0.99:cond==='보통'?1.01:1.04;
var slopeFactor=slope/113;
var projectedRemaining=avgPerHole*remaining*condMult;
var predicted=Math.round(currentScore+projectedRemaining);
var lowBound=predicted-3;
var highBound=predicted+3;
var vsPar=predicted-par;
var vsParStr=vsPar>0?'+'+vsPar:''+vsPar;
var targetScore=par+Math.round((hcp*slope/113)/2);
var paceVsTarget=predicted<=targetScore?'목표 달성 가능!':'목표보다 '+(predicted-targetScore)+'타 초과 예상';

var grade=vsPar<=0?'S':vsPar<=4?'A':vsPar<=8?'B':vsPar<=14?'C':'D';
var gradeColor=grade==='S'?'#00FF88':grade==='A'?'#00B4D8':grade==='B'?'#FFB800':grade==='C'?'#E8A87C':'#ff6b6b';

var resultDiv=document.getElementById('v15-predict-result');
if(resultDiv){
  var rhtml='<div class="v15-card" style="border-color:'+gradeColor+'">';
  rhtml+='<h3>&#x1F3AF; 예측 결과</h3>';
  rhtml+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:8px">';
  rhtml+='<div class="v15-stat-card"><div class="v15-stat-val" style="color:'+gradeColor+';font-size:1.5em">'+predicted+'</div><div class="v15-stat-label">예상 스코어</div></div>';
  rhtml+='<div class="v15-stat-card"><div class="v15-stat-val" style="color:'+(vsPar<=0?'#00FF88':'#ff6b6b')+'">'+vsParStr+'</div><div class="v15-stat-label">vs Par '+par+'</div></div>';
  rhtml+='<div class="v15-stat-card"><div class="v15-stat-val" style="color:'+gradeColor+';font-size:1.5em">'+grade+'</div><div class="v15-stat-label">예상 등급</div></div>';
  rhtml+='<div class="v15-stat-card"><div class="v15-stat-val" style="color:#E8A87C;font-size:1em">'+lowBound+'~'+highBound+'</div><div class="v15-stat-label">신뢰구간</div></div>';
  rhtml+='</div>';
  rhtml+='<div style="margin-top:8px;padding:10px;background:rgba(0,255,136,.05);border-radius:8px;border-left:3px solid '+gradeColor+'"><div style="font-size:.72em;color:'+gradeColor+';font-weight:700">AI 분석</div><div style="font-size:.82em;color:#aaa;margin-top:4px">'+paceVsTarget+'. 현재 페이스: 홀당 '+Math.round(avgPerHole*100)/100+'타 (Par '+Math.round(par/18*100)/100+'). 남은 '+remaining+'홀에서 '+Math.round(projectedRemaining)+'타 예상.</div></div>';
  rhtml+='</div>';
  resultDiv.innerHTML=rhtml;
}
playSfx('predict_calc');
renderPredictCanvas(holesPlayed,currentScore,predicted,par,lowBound,highBound);

lsSet('predict_count',(lsGet('predict_count',0))+1);
v15CheckAch();
};

function renderPredictCanvas(holesPlayed,currentScore,predicted,par,lo,hi){
var canvas=document.getElementById('v15-predict-canvas');if(!canvas)return;
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a1020';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00B4D8';ctx.font='bold 13px sans-serif';ctx.textAlign='left';
ctx.fillText('Score Prediction Model',20,28);

var left=60,right=W-40,top=50,bot=H-50;
var maxScore=Math.max(predicted+10,par+15);
var perHole=currentScore/holesPlayed;

ctx.strokeStyle='rgba(255,255,255,.06)';ctx.lineWidth=1;
for(var g=0;g<=4;g++){var gy=top+(bot-top)*g/4;ctx.beginPath();ctx.moveTo(left,gy);ctx.lineTo(right,gy);ctx.stroke();ctx.fillStyle='#555';ctx.font='10px sans-serif';ctx.textAlign='right';ctx.fillText(Math.round(maxScore*(1-g/4)),left-6,gy+4);}

ctx.strokeStyle='rgba(0,255,136,.3)';ctx.lineWidth=2;ctx.setLineDash([8,4]);
var parY=bot-((par)/maxScore)*(bot-top);
ctx.beginPath();ctx.moveTo(left,parY);ctx.lineTo(right,parY);ctx.stroke();ctx.setLineDash([]);
ctx.fillStyle='#00FF88';ctx.font='10px sans-serif';ctx.textAlign='right';
ctx.fillText('Par '+par,right,parY-6);

ctx.fillStyle='rgba(255,180,0,.08)';
for(var h=0;h<=18;h++){
  var x=left+(right-left)*h/18;
  var loVal=lo*h/18;
  var hiVal=hi*h/18;
  var loY=bot-(loVal/maxScore)*(bot-top);
  var hiY=bot-(hiVal/maxScore)*(bot-top);
  if(h===0) ctx.beginPath();
}
ctx.beginPath();
for(var h2=0;h2<=18;h2++){
  var x2=left+(right-left)*h2/18;
  var loVal2=lo*h2/18;
  var loY2=bot-(loVal2/maxScore)*(bot-top);
  if(h2===0) ctx.moveTo(x2,loY2);else ctx.lineTo(x2,loY2);
}
for(var h3=18;h3>=0;h3--){
  var x3=left+(right-left)*h3/18;
  var hiVal3=hi*h3/18;
  var hiY3=bot-(hiVal3/maxScore)*(bot-top);
  ctx.lineTo(x3,hiY3);
}
ctx.closePath();ctx.fill();

ctx.strokeStyle='#00B4D8';ctx.lineWidth=2.5;ctx.beginPath();
for(var h4=0;h4<=holesPlayed;h4++){
  var x4=left+(right-left)*h4/18;
  var val4=perHole*h4;
  var y4=bot-(val4/maxScore)*(bot-top);
  if(h4===0) ctx.moveTo(x4,y4);else ctx.lineTo(x4,y4);
}
ctx.stroke();

ctx.strokeStyle='#FFB800';ctx.lineWidth=2;ctx.setLineDash([4,4]);ctx.beginPath();
for(var h5=holesPlayed;h5<=18;h5++){
  var x5=left+(right-left)*h5/18;
  var val5=currentScore+perHole*(h5-holesPlayed);
  var y5=bot-(val5/maxScore)*(bot-top);
  if(h5===holesPlayed) ctx.moveTo(x5,y5);else ctx.lineTo(x5,y5);
}
ctx.stroke();ctx.setLineDash([]);

ctx.fillStyle='#00B4D8';ctx.beginPath();
var curX=left+(right-left)*holesPlayed/18;
var curY=bot-(currentScore/maxScore)*(bot-top);
ctx.arc(curX,curY,5,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#fff';ctx.font='bold 11px sans-serif';ctx.textAlign='left';
ctx.fillText(currentScore+'타 ('+holesPlayed+'H)',curX+10,curY-4);

var predX=right;
var predY=bot-(predicted/maxScore)*(bot-top);
ctx.fillStyle='#FFB800';ctx.beginPath();ctx.arc(predX,predY,6,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#FFB800';ctx.font='bold 12px sans-serif';ctx.textAlign='right';
ctx.fillText(predicted+'타 예측',predX-10,predY-8);

ctx.fillStyle='#888';ctx.font='10px sans-serif';ctx.textAlign='center';
for(var l=0;l<=18;l+=3){
  var lx=left+(right-left)*l/18;
  ctx.fillText(l+'H',lx,bot+16);
}
ctx.fillStyle='#444';ctx.font='9px sans-serif';
ctx.fillText('Golf Tracker Pro v15 - Score Prediction',W/2,H-8);
}

// ===== 4. HOLE-IN-ONE SIMULATOR Canvas =====
function showHoleInOneSimulator(){
var pn=getPanel('holeinone');
var sims=lsGet('hio_sims',[]);
var html='<div class="v15-title">&#x26F3; 홀인원 시뮬레이터</div>';

html+='<div class="v15-card"><h3>파라미터 설정</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v15-label">홀 거리(yd)</label><input id="v15-hio-dist" class="v15-input" type="number" min="80" max="250" value="150"></div>';
html+='<div><label class="v15-label">핀 위치</label><select id="v15-hio-pin" class="v15-input"><option>가운데</option><option>앞</option><option>뒤</option><option>좌</option><option>우</option></select></div>';
html+='<div><label class="v15-label">바람(m/s)</label><input id="v15-hio-wind" class="v15-input" type="number" min="0" max="10" value="2"></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:6px">';
html+='<div><label class="v15-label">실력 레벨</label><select id="v15-hio-level" class="v15-input"><option value="1">초보 (핸디 30+)</option><option value="2">중급 (핸디 15~30)</option><option value="3" selected>상급 (핸디 5~15)</option><option value="4">프로 (핸디 0~5)</option><option value="5">투어프로</option></select></div>';
html+='<div><label class="v15-label">시뮬레이션 횟수</label><select id="v15-hio-trials" class="v15-input"><option>100</option><option>500</option><option selected>1000</option><option>5000</option><option>10000</option></select></div>';
html+='</div>';
html+='<button class="v15-btn v15-btn-primary" style="width:100%;margin-top:10px" onclick="window._v15SimHIO()">시뮬레이션 실행</button></div>';

html+='<canvas id="v15-hio-canvas" width="600" height="400" style="width:100%;max-width:600px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

html+='<div id="v15-hio-result"></div>';

html+='<div class="v15-card"><h3>&#x1F4D6; 홀인원 통계</h3>';
html+='<div style="font-size:.82em;color:#aaa;line-height:1.7">';
html+='<div>&#x2022; 프로 골퍼 홀인원 확률: 약 1/2,500 (0.04%)</div>';
html+='<div>&#x2022; 아마추어 홀인원 확률: 약 1/12,500 (0.008%)</div>';
html+='<div>&#x2022; 평균 골퍼의 일생 홀인원 기대값: 약 0.3~0.5회</div>';
html+='<div>&#x2022; 홀인원 최적 거리: 130~160yd (Par 3)</div>';
html+='<div>&#x2022; 연속 홀인원 확률: 약 1/67,000,000</div>';
html+='</div></div>';

pn.innerHTML='<button class="v15-close" onclick="window._v15Close(\'holeinone\')">&times;</button>'+html;
openPanel('holeinone');playSfx('holeinone_open');
renderHIOCanvas([],150,0);
v15CheckAch();lsSet('ach_hio_viewed',true);
}

window._v15SimHIO=function(){
var dist=parseInt(document.getElementById('v15-hio-dist').value)||150;
var level=parseInt(document.getElementById('v15-hio-level').value)||3;
var wind=parseInt(document.getElementById('v15-hio-wind').value)||2;
var trials=parseInt(document.getElementById('v15-hio-trials').value)||1000;

var spread=level===1?35:level===2?22:level===3?14:level===4?8:5;
spread+=(dist-130)*0.08+wind*1.5;
var cupRadius=2.13;
var hits=0;var lands=[];
for(var i=0;i<trials;i++){
  var dx=(Math.random()-0.5)*2*spread+(Math.random()-0.5)*2*spread;
  var dy=(Math.random()-0.5)*2*spread*0.7+(Math.random()-0.5)*2*spread*0.7;
  dx/=2;dy/=2;
  var distFromPin=Math.sqrt(dx*dx+dy*dy);
  if(distFromPin<=cupRadius) hits++;
  if(i<200) lands.push({x:dx,y:dy,hit:distFromPin<=cupRadius});
}
var prob=hits/trials*100;
var odds=hits>0?Math.round(trials/hits):99999;

var resultDiv=document.getElementById('v15-hio-result');
if(resultDiv){
  var rhtml='<div class="v15-card" style="border-color:rgba(0,255,136,.3)">';
  rhtml+='<h3>&#x1F3AF; 시뮬레이션 결과</h3>';
  rhtml+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:8px">';
  rhtml+='<div class="v15-stat-card"><div class="v15-stat-val" style="color:#00FF88;font-size:1.2em">'+hits+'</div><div class="v15-stat-label">홀인원 횟수</div></div>';
  rhtml+='<div class="v15-stat-card"><div class="v15-stat-val" style="color:#FFB800;font-size:1.1em">'+prob.toFixed(3)+'%</div><div class="v15-stat-label">확률</div></div>';
  rhtml+='<div class="v15-stat-card"><div class="v15-stat-val" style="color:#00B4D8;font-size:1em">1/'+odds+'</div><div class="v15-stat-label">확률 (분수)</div></div>';
  rhtml+='<div class="v15-stat-card"><div class="v15-stat-val" style="color:#E8A87C">'+trials+'</div><div class="v15-stat-label">시행 횟수</div></div>';
  rhtml+='</div>';
  rhtml+='</div>';
  resultDiv.innerHTML=rhtml;
}
playSfx(hits>0?'holeinone_hit':'holeinone_open');
renderHIOCanvas(lands,dist,hits);
lsSet('hio_sim_count',(lsGet('hio_sim_count',0))+1);
v15CheckAch();
};

function renderHIOCanvas(lands,dist,hits){
var canvas=document.getElementById('v15-hio-canvas');if(!canvas)return;
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a1020';ctx.fillRect(0,0,W,H);

var cx=W/2,cy=H/2;var scale=3.5;

ctx.fillStyle='#1a3a1a';ctx.beginPath();ctx.ellipse(cx,cy,140,120,0,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#2a5a2a';ctx.beginPath();ctx.ellipse(cx,cy,100,85,0,0,Math.PI*2);ctx.fill();

var rings=[40,30,20,10,5];var ringColors=['rgba(255,255,255,.03)','rgba(255,255,255,.04)','rgba(255,255,255,.06)','rgba(255,255,255,.08)','rgba(0,255,136,.1)'];
for(var r=0;r<rings.length;r++){
  ctx.strokeStyle=ringColors[r];ctx.lineWidth=1;ctx.beginPath();ctx.arc(cx,cy,rings[r]*scale,0,Math.PI*2);ctx.stroke();
  ctx.fillStyle='#444';ctx.font='8px sans-serif';ctx.textAlign='left';ctx.fillText(rings[r]+'yd',cx+rings[r]*scale+3,cy);
}

ctx.fillStyle='#333';ctx.beginPath();ctx.arc(cx,cy,2.13*scale,0,Math.PI*2);ctx.fill();
ctx.strokeStyle='#fff';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(cx,cy,2.13*scale,0,Math.PI*2);ctx.stroke();

ctx.fillStyle='#888';ctx.beginPath();ctx.arc(cx,cy,1,0,Math.PI*2);ctx.fill();
ctx.strokeStyle='#FFB800';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(cx,cy-8);ctx.lineTo(cx,cy-25);ctx.stroke();
ctx.fillStyle='#ff4444';ctx.beginPath();ctx.moveTo(cx,cy-25);ctx.lineTo(cx+12,cy-21);ctx.lineTo(cx,cy-17);ctx.fill();

for(var i=0;i<lands.length;i++){
  var px=cx+lands[i].x*scale;
  var py=cy+lands[i].y*scale;
  ctx.fillStyle=lands[i].hit?'rgba(0,255,136,.9)':'rgba(0,180,216,.4)';
  ctx.beginPath();ctx.arc(px,py,lands[i].hit?4:2,0,Math.PI*2);ctx.fill();
  if(lands[i].hit){ctx.strokeStyle='#00FF88';ctx.lineWidth=1;ctx.beginPath();ctx.arc(px,py,6,0,Math.PI*2);ctx.stroke();}
}

ctx.fillStyle='#00B4D8';ctx.font='bold 13px sans-serif';ctx.textAlign='left';
ctx.fillText('Hole-in-One Simulator ('+dist+'yd)',20,28);
ctx.fillStyle='#00FF88';ctx.font='bold 12px sans-serif';ctx.textAlign='right';
ctx.fillText('HIO: '+hits,W-20,28);
ctx.fillStyle='#444';ctx.font='9px sans-serif';ctx.textAlign='center';
ctx.fillText('Golf Tracker Pro v15 - HIO Simulator',W/2,H-8);
}

// ===== 5. SWING COMPARISON ANALYZER Canvas =====
function showSwingComparison(){
var pn=getPanel('swingcomp');
var sessions=lsGet('swing_sessions',[]);
var html='<div class="v15-title">&#x1F504; 스윙 비교 분석기</div>';

html+='<div class="v15-card"><h3>스윙 세션 기록</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v15-label">세션명</label><input id="v15-sw-name" class="v15-input" placeholder="예: 드라이버 교정 후"></div>';
html+='<div><label class="v15-label">클럽</label><select id="v15-sw-club" class="v15-input"><option>드라이버</option><option>3W</option><option>5I</option><option>7I</option><option>PW</option><option>SW</option></select></div>';
html+='</div>';
var metrics=['백스윙 크기(%)','다운스윙 속도(1~10)','임팩트 정확도(1~10)','팔로쓰루(1~10)','체중이동(1~10)','그립압력(1~10)'];
var metricIds=['backswing','downswing','impact','followthru','weight','grip'];
var defaults=[85,7,6,7,6,5];
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:6px">';
for(var m=0;m<metrics.length;m++){
  html+='<div><label class="v15-label">'+metrics[m]+'</label><input id="v15-sw-'+metricIds[m]+'" class="v15-input" type="number" min="1" max="'+(m===0?100:10)+'" value="'+defaults[m]+'"></div>';
}
html+='</div>';
html+='<button class="v15-btn v15-btn-primary" style="width:100%;margin-top:10px" onclick="window._v15RecordSwing()">세션 저장</button></div>';

html+='<canvas id="v15-swingcomp-canvas" width="600" height="400" style="width:100%;max-width:600px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

if(sessions.length>0){
  html+='<div class="v15-card"><h3>세션 히스토리 ('+sessions.length+'건)</h3>';
  html+='<table class="v15-table"><tr><th>날짜</th><th>세션</th><th>클럽</th><th>백스윙</th><th>임팩트</th><th>체중이동</th></tr>';
  for(var s=Math.max(0,sessions.length-8);s<sessions.length;s++){
    html+='<tr><td style="font-size:.78em">'+sessions[s].date+'</td><td style="color:#00FF88;font-size:.82em">'+sessions[s].name+'</td><td>'+sessions[s].club+'</td><td>'+sessions[s].backswing+'%</td><td>'+sessions[s].impact+'/10</td><td>'+sessions[s].weight+'/10</td></tr>';
  }
  html+='</table></div>';
}

pn.innerHTML='<button class="v15-close" onclick="window._v15Close(\'swingcomp\')">&times;</button>'+html;
openPanel('swingcomp');playSfx('swing_compare');
setTimeout(function(){renderSwingCompCanvas(sessions)},120);
v15CheckAch();lsSet('ach_swing_viewed',true);
}

window._v15RecordSwing=function(){
var name=document.getElementById('v15-sw-name').value||'세션';
var club=document.getElementById('v15-sw-club').value;
var data={date:todayStr(),name:name,club:club,
  backswing:parseInt(document.getElementById('v15-sw-backswing').value)||85,
  downswing:parseInt(document.getElementById('v15-sw-downswing').value)||7,
  impact:parseInt(document.getElementById('v15-sw-impact').value)||6,
  followthru:parseInt(document.getElementById('v15-sw-followthru').value)||7,
  weight:parseInt(document.getElementById('v15-sw-weight').value)||6,
  grip:parseInt(document.getElementById('v15-sw-grip').value)||5};
var sessions=lsGet('swing_sessions',[]);
sessions.push(data);if(sessions.length>50) sessions=sessions.slice(-50);
lsSet('swing_sessions',sessions);
playSfx('swing_compare');showToast('스윙 세션 &quot;'+name+'&quot; 저장!');
closePanel('swingcomp');setTimeout(showSwingComparison,200);
};

function renderSwingCompCanvas(sessions){
var canvas=document.getElementById('v15-swingcomp-canvas');if(!canvas)return;
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a1020';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00B4D8';ctx.font='bold 13px sans-serif';ctx.textAlign='left';
ctx.fillText('Swing Comparison Radar',20,28);

if(sessions.length===0){ctx.fillStyle='#555';ctx.textAlign='center';ctx.font='14px sans-serif';ctx.fillText('스윙 세션을 기록하면 레이더 차트가 표시됩니다',W/2,H/2);return;}

var cx=W/2,cy=H/2+15,radius=130;
var axes=['백스윙','다운스윙','임팩트','팔로쓰루','체중이동','그립'];
var axisKeys=['backswing','downswing','impact','followthru','weight','grip'];

for(var ring=1;ring<=5;ring++){
  ctx.strokeStyle='rgba(255,255,255,.06)';ctx.lineWidth=1;ctx.beginPath();
  for(var a=0;a<6;a++){
    var angle=Math.PI*2*a/6-Math.PI/2;
    var rx=cx+Math.cos(angle)*radius*ring/5;
    var ry=cy+Math.sin(angle)*radius*ring/5;
    if(a===0) ctx.moveTo(rx,ry);else ctx.lineTo(rx,ry);
  }
  ctx.closePath();ctx.stroke();
}

for(var ax=0;ax<6;ax++){
  var angle2=Math.PI*2*ax/6-Math.PI/2;
  ctx.strokeStyle='rgba(255,255,255,.08)';ctx.beginPath();
  ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(angle2)*radius,cy+Math.sin(angle2)*radius);ctx.stroke();
  ctx.fillStyle='#aaa';ctx.font='11px sans-serif';ctx.textAlign='center';
  var lx=cx+Math.cos(angle2)*(radius+20);
  var ly=cy+Math.sin(angle2)*(radius+20);
  ctx.fillText(axes[ax],lx,ly+4);
}

var latest=sessions[sessions.length-1];
var prev=sessions.length>1?sessions[sessions.length-2]:null;

if(prev){
  ctx.strokeStyle='rgba(255,180,0,.4)';ctx.fillStyle='rgba(255,180,0,.06)';ctx.lineWidth=1.5;ctx.beginPath();
  for(var p=0;p<6;p++){
    var angle3=Math.PI*2*p/6-Math.PI/2;
    var val3=axisKeys[p]==='backswing'?prev[axisKeys[p]]/10:prev[axisKeys[p]];
    var r3=val3/10*radius;
    var px2=cx+Math.cos(angle3)*r3;
    var py2=cy+Math.sin(angle3)*r3;
    if(p===0) ctx.moveTo(px2,py2);else ctx.lineTo(px2,py2);
  }
  ctx.closePath();ctx.fill();ctx.stroke();
}

ctx.strokeStyle='#00FF88';ctx.fillStyle='rgba(0,255,136,.1)';ctx.lineWidth=2.5;ctx.beginPath();
for(var q=0;q<6;q++){
  var angle4=Math.PI*2*q/6-Math.PI/2;
  var val4=axisKeys[q]==='backswing'?latest[axisKeys[q]]/10:latest[axisKeys[q]];
  var r4=val4/10*radius;
  var qx=cx+Math.cos(angle4)*r4;
  var qy=cy+Math.sin(angle4)*r4;
  if(q===0) ctx.moveTo(qx,qy);else ctx.lineTo(qx,qy);
}
ctx.closePath();ctx.fill();ctx.stroke();

for(var d=0;d<6;d++){
  var angle5=Math.PI*2*d/6-Math.PI/2;
  var val5=axisKeys[d]==='backswing'?latest[axisKeys[d]]/10:latest[axisKeys[d]];
  var r5=val5/10*radius;
  ctx.fillStyle='#00FF88';ctx.beginPath();ctx.arc(cx+Math.cos(angle5)*r5,cy+Math.sin(angle5)*r5,4,0,Math.PI*2);ctx.fill();
}

ctx.fillStyle='#00FF88';ctx.font='11px sans-serif';ctx.textAlign='left';
ctx.fillRect(W-160,H-50,10,10);ctx.fillText('현재: '+latest.name,W-145,H-41);
if(prev){ctx.fillStyle='#FFB800';ctx.fillRect(W-160,H-34,10,10);ctx.fillText('이전: '+prev.name,W-145,H-25);}

ctx.fillStyle='#444';ctx.font='9px sans-serif';ctx.textAlign='center';
ctx.fillText('Golf Tracker Pro v15 - Swing Radar',W/2,H-8);
}

// ===== 6. COURSE DIFFICULTY EVALUATOR Canvas =====
var SAMPLE_COURSES=[
{name:'파인크리크CC',cr:73.2,slope:135,par:72,length:6800,water:4,bunker:62,elev:180},
{name:'남서울CC',cr:71.8,slope:128,par:72,length:6500,water:3,bunker:48,elev:120},
{name:'블루헤런GC',cr:70.5,slope:121,par:72,length:6200,water:2,bunker:35,elev:80},
{name:'제주핀크스',cr:74.1,slope:142,par:72,length:7100,water:6,bunker:78,elev:250},
{name:'서울CC',cr:72.0,slope:130,par:72,length:6600,water:3,bunker:55,elev:150},
{name:'안양CC',cr:71.2,slope:125,par:72,length:6400,water:2,bunker:42,elev:100},
{name:'가평베네스트',cr:73.8,slope:138,par:72,length:6900,water:5,bunker:70,elev:220},
{name:'해슬리9브릿지',cr:74.5,slope:145,par:72,length:7200,water:7,bunker:85,elev:280}
];

function showCourseDifficulty(){
var pn=getPanel('coursediff');
var html='<div class="v15-title">&#x1F3D4;&#xFE0F; 코스 난이도 평가</div>';

html+='<div class="v15-card"><h3>코스 선택 또는 직접 입력</h3>';
html+='<div style="margin-bottom:8px"><label class="v15-label">샘플 코스</label><select id="v15-cd-preset" class="v15-input" onchange="window._v15LoadCourse()">';
html+='<option value="-1">직접 입력</option>';
for(var i=0;i<SAMPLE_COURSES.length;i++) html+='<option value="'+i+'">'+SAMPLE_COURSES[i].name+'</option>';
html+='</select></div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:6px">';
html+='<div><label class="v15-label">코스레이팅</label><input id="v15-cd-cr" class="v15-input" type="number" step="0.1" min="60" max="80" value="72.0"></div>';
html+='<div><label class="v15-label">슬로프</label><input id="v15-cd-slope" class="v15-input" type="number" min="55" max="155" value="128"></div>';
html+='<div><label class="v15-label">Par</label><input id="v15-cd-par" class="v15-input" type="number" min="60" max="80" value="72"></div>';
html+='<div><label class="v15-label">전장(yd)</label><input id="v15-cd-length" class="v15-input" type="number" min="5000" max="8000" value="6500"></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:6px">';
html+='<div><label class="v15-label">워터해저드</label><input id="v15-cd-water" class="v15-input" type="number" min="0" max="18" value="3"></div>';
html+='<div><label class="v15-label">벙커 수</label><input id="v15-cd-bunker" class="v15-input" type="number" min="0" max="150" value="48"></div>';
html+='<div><label class="v15-label">고저차(m)</label><input id="v15-cd-elev" class="v15-input" type="number" min="0" max="500" value="120"></div>';
html+='</div>';
html+='<button class="v15-btn v15-btn-primary" style="width:100%;margin-top:10px" onclick="window._v15EvalCourse()">난이도 평가</button></div>';

html+='<canvas id="v15-coursediff-canvas" width="600" height="380" style="width:100%;max-width:600px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

html+='<div id="v15-coursediff-result"></div>';

pn.innerHTML='<button class="v15-close" onclick="window._v15Close(\'coursediff\')">&times;</button>'+html;
openPanel('coursediff');playSfx('course_diff');
renderCourseDiffCanvas(null);
v15CheckAch();lsSet('ach_coursediff_viewed',true);
}

window._v15LoadCourse=function(){
var idx=parseInt(document.getElementById('v15-cd-preset').value);
if(idx<0) return;
var c=SAMPLE_COURSES[idx];
document.getElementById('v15-cd-cr').value=c.cr;
document.getElementById('v15-cd-slope').value=c.slope;
document.getElementById('v15-cd-par').value=c.par;
document.getElementById('v15-cd-length').value=c.length;
document.getElementById('v15-cd-water').value=c.water;
document.getElementById('v15-cd-bunker').value=c.bunker;
document.getElementById('v15-cd-elev').value=c.elev;
};

window._v15EvalCourse=function(){
var cr=parseFloat(document.getElementById('v15-cd-cr').value)||72;
var slope=parseInt(document.getElementById('v15-cd-slope').value)||128;
var par=parseInt(document.getElementById('v15-cd-par').value)||72;
var length=parseInt(document.getElementById('v15-cd-length').value)||6500;
var water=parseInt(document.getElementById('v15-cd-water').value)||3;
var bunker=parseInt(document.getElementById('v15-cd-bunker').value)||48;
var elev=parseInt(document.getElementById('v15-cd-elev').value)||120;

var scores={
  rating:Math.min(10,Math.max(1,Math.round((cr-65)/1.5))),
  slopeScore:Math.min(10,Math.max(1,Math.round((slope-55)/10))),
  lengthScore:Math.min(10,Math.max(1,Math.round((length-5000)/300))),
  waterScore:Math.min(10,Math.max(1,Math.round(water*1.5))),
  bunkerScore:Math.min(10,Math.max(1,Math.round(bunker/10))),
  elevScore:Math.min(10,Math.max(1,Math.round(elev/35)))
};
var overall=Math.round((scores.rating*2+scores.slopeScore*2+scores.lengthScore+scores.waterScore+scores.bunkerScore+scores.elevScore)/8*10)/10;
var grade=overall>=8.5?'S':overall>=7?'A':overall>=5.5?'B':overall>=4?'C':'D';
var gradeColor=grade==='S'?'#ff6b6b':grade==='A'?'#E8A87C':grade==='B'?'#FFB800':grade==='C'?'#00B4D8':'#00FF88';
var diffLabel=grade==='S'?'극상급 (챔피언십)':grade==='A'?'상급 (도전적)':grade==='B'?'중상급 (표준)':grade==='C'?'중급 (친화적)':'입문 (쉬움)';

var resultDiv=document.getElementById('v15-coursediff-result');
if(resultDiv){
  var rhtml='<div class="v15-card" style="border-color:'+gradeColor+'">';
  rhtml+='<h3>&#x1F3F7;&#xFE0F; 평가 결과</h3>';
  rhtml+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:8px">';
  rhtml+='<div class="v15-stat-card"><div class="v15-stat-val" style="color:'+gradeColor+';font-size:2em">'+grade+'</div><div class="v15-stat-label">난이도 등급</div></div>';
  rhtml+='<div class="v15-stat-card"><div class="v15-stat-val" style="color:#FFB800">'+overall+'/10</div><div class="v15-stat-label">종합 점수</div></div>';
  rhtml+='<div class="v15-stat-card"><div class="v15-stat-val" style="color:#aaa;font-size:.9em">'+diffLabel+'</div><div class="v15-stat-label">분류</div></div>';
  rhtml+='</div>';
  rhtml+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:8px">';
  rhtml+='<div class="v15-stat-card"><div class="v15-stat-val" style="font-size:.9em">'+scores.rating+'/10</div><div class="v15-stat-label">레이팅</div></div>';
  rhtml+='<div class="v15-stat-card"><div class="v15-stat-val" style="font-size:.9em">'+scores.slopeScore+'/10</div><div class="v15-stat-label">슬로프</div></div>';
  rhtml+='<div class="v15-stat-card"><div class="v15-stat-val" style="font-size:.9em">'+scores.lengthScore+'/10</div><div class="v15-stat-label">전장</div></div>';
  rhtml+='<div class="v15-stat-card"><div class="v15-stat-val" style="font-size:.9em">'+scores.waterScore+'/10</div><div class="v15-stat-label">워터</div></div>';
  rhtml+='<div class="v15-stat-card"><div class="v15-stat-val" style="font-size:.9em">'+scores.bunkerScore+'/10</div><div class="v15-stat-label">벙커</div></div>';
  rhtml+='<div class="v15-stat-card"><div class="v15-stat-val" style="font-size:.9em">'+scores.elevScore+'/10</div><div class="v15-stat-label">고저차</div></div>';
  rhtml+='</div></div>';
  resultDiv.innerHTML=rhtml;
}
playSfx('course_diff');
renderCourseDiffCanvas(scores);
};

function renderCourseDiffCanvas(scores){
var canvas=document.getElementById('v15-coursediff-canvas');if(!canvas)return;
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a1020';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00B4D8';ctx.font='bold 13px sans-serif';ctx.textAlign='left';
ctx.fillText('Course Difficulty Rating',20,28);

if(!scores){ctx.fillStyle='#555';ctx.textAlign='center';ctx.font='14px sans-serif';ctx.fillText('코스 데이터를 입력하고 평가 버튼을 누르세요',W/2,H/2);return;}

var cx=W/2,cy=H/2+15,radius=130;
var axes=['레이팅','슬로프','전장','워터','벙커','고저차'];
var keys=['rating','slopeScore','lengthScore','waterScore','bunkerScore','elevScore'];
var colors=['#00FF88','#00B4D8','#FFB800','#ff6b6b','#E8A87C','#9B59B6'];

for(var ring=1;ring<=5;ring++){
  ctx.strokeStyle='rgba(255,255,255,.06)';ctx.lineWidth=1;ctx.beginPath();
  for(var a=0;a<6;a++){
    var angle=Math.PI*2*a/6-Math.PI/2;
    var rx=cx+Math.cos(angle)*radius*ring/5;
    var ry=cy+Math.sin(angle)*radius*ring/5;
    if(a===0) ctx.moveTo(rx,ry);else ctx.lineTo(rx,ry);
  }
  ctx.closePath();ctx.stroke();
  ctx.fillStyle='#333';ctx.font='8px sans-serif';ctx.textAlign='left';
  ctx.fillText(ring*2+'',cx+2,cy-radius*ring/5+4);
}

for(var ax=0;ax<6;ax++){
  var angle2=Math.PI*2*ax/6-Math.PI/2;
  ctx.strokeStyle='rgba(255,255,255,.08)';ctx.beginPath();
  ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(angle2)*radius,cy+Math.sin(angle2)*radius);ctx.stroke();
  ctx.fillStyle=colors[ax];ctx.font='bold 11px sans-serif';ctx.textAlign='center';
  var lx=cx+Math.cos(angle2)*(radius+22);
  var ly=cy+Math.sin(angle2)*(radius+22);
  ctx.fillText(axes[ax],lx,ly+4);
}

ctx.strokeStyle='#ff6b6b';ctx.fillStyle='rgba(255,107,107,.12)';ctx.lineWidth=2.5;ctx.beginPath();
for(var q=0;q<6;q++){
  var angle4=Math.PI*2*q/6-Math.PI/2;
  var val4=scores[keys[q]]/10;
  var r4=val4*radius;
  var qx=cx+Math.cos(angle4)*r4;
  var qy=cy+Math.sin(angle4)*r4;
  if(q===0) ctx.moveTo(qx,qy);else ctx.lineTo(qx,qy);
}
ctx.closePath();ctx.fill();ctx.stroke();

for(var d=0;d<6;d++){
  var angle5=Math.PI*2*d/6-Math.PI/2;
  var val5=scores[keys[d]]/10;
  var r5=val5*radius;
  ctx.fillStyle=colors[d];ctx.beginPath();ctx.arc(cx+Math.cos(angle5)*r5,cy+Math.sin(angle5)*r5,5,0,Math.PI*2);ctx.fill();
}

ctx.fillStyle='#444';ctx.font='9px sans-serif';ctx.textAlign='center';
ctx.fillText('Golf Tracker Pro v15 - Course Rating',W/2,H-8);
}

// ===== 7. GOLF NUTRITION TIMER =====
var NUTRITION_PLAN=[
{hole:1,time:0,item:'물 200ml',icon:'&#x1F4A7;',desc:'출발 전 수분 섭취'},
{hole:3,time:40,item:'에너지바 반쪽',icon:'&#x1F36B;',desc:'초반 에너지 보충'},
{hole:5,time:65,item:'물 200ml + 전해질',icon:'&#x1F4A7;',desc:'전해질 보충'},
{hole:7,time:90,item:'바나나 1개',icon:'&#x1F34C;',desc:'칼륨/탄수화물 보충'},
{hole:9,time:120,item:'물 300ml + 간식',icon:'&#x1F375;',desc:'전반 종료 충전'},
{hole:10,time:135,item:'에너지젤/음료',icon:'&#x26A1;',desc:'후반 시작 부스팅'},
{hole:12,time:160,item:'물 200ml',icon:'&#x1F4A7;',desc:'후반 수분 유지'},
{hole:14,time:185,item:'견과류 한줌',icon:'&#x1F95C;',desc:'집중력 유지'},
{hole:16,time:210,item:'물 200ml + 전해질',icon:'&#x1F4A7;',desc:'마무리 수분'},
{hole:18,time:240,item:'단백질바/회복음료',icon:'&#x1F4AA;',desc:'라운드 후 회복'}
];

function showNutritionTimer(){
var pn=getPanel('nutrition');
var consumed=lsGet('nutrition_consumed',{});
var html='<div class="v15-title">&#x1F34E; 골프 영양 타이머</div>';

html+='<div class="v15-card"><h3>라운드 영양 플랜 (18홀)</h3>';
html+='<div style="margin-top:8px">';
for(var i=0;i<NUTRITION_PLAN.length;i++){
  var np=NUTRITION_PLAN[i];
  var done=consumed[np.hole]||false;
  html+='<div style="display:flex;align-items:center;gap:10px;padding:8px;margin-bottom:4px;border-radius:10px;background:'+(done?'rgba(0,255,136,.08)':'rgba(255,255,255,.03)')+';border:1px solid '+(done?'rgba(0,255,136,.2)':'rgba(255,255,255,.05)')+';cursor:pointer" onclick="window._v15ToggleNutrition('+np.hole+')">';
  html+='<div style="font-size:1.5em;width:36px;text-align:center">'+np.icon+'</div>';
  html+='<div style="flex:1"><div style="font-weight:600;font-size:.88em;color:'+(done?'#00FF88':'#fff')+'">'+np.hole+'번홀 ('+np.time+'분) - '+np.item+'</div>';
  html+='<div style="font-size:.75em;color:#888">'+np.desc+'</div></div>';
  html+='<div style="font-size:1.2em;color:'+(done?'#00FF88':'#333')+'">'+(done?'&#x2705;':'&#x2B1C;')+'</div>';
  html+='</div>';
}
html+='</div>';

var doneCount=0;for(var k in consumed)if(consumed[k])doneCount++;
html+='<div style="margin-top:8px;display:flex;justify-content:space-between;align-items:center">';
html+='<div style="font-size:.85em;color:#aaa">달성: <span style="color:#00FF88;font-weight:700">'+doneCount+'/'+NUTRITION_PLAN.length+'</span></div>';
html+='<button class="v15-btn" style="font-size:.78em" onclick="window._v15ResetNutrition()">초기화</button>';
html+='</div></div>';

html+='<canvas id="v15-nutrition-canvas" width="600" height="300" style="width:100%;max-width:600px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

html+='<div class="v15-card"><h3>&#x1F4D6; 라운드 영양 가이드</h3>';
html+='<div style="font-size:.82em;color:#aaa;line-height:1.7">';
html+='<div>&#x2022; 18홀 동안 최소 1.5~2L 수분 섭취 필요</div>';
html+='<div>&#x2022; 탄수화물 위주의 간식이 지구력 유지에 효과적</div>';
html+='<div>&#x2022; 카페인은 초반에만 (후반 수면 영향 주의)</div>';
html+='<div>&#x2022; 과식 금지 - 소량 자주 섭취가 핵심</div>';
html+='<div>&#x2022; 알코올은 집중력과 판단력 저하 원인</div>';
html+='</div></div>';

pn.innerHTML='<button class="v15-close" onclick="window._v15Close(\'nutrition\')">&times;</button>'+html;
openPanel('nutrition');playSfx('nutrition_open');
setTimeout(function(){renderNutritionCanvas(consumed)},120);
v15CheckAch();lsSet('ach_nutrition_viewed',true);
}

window._v15ToggleNutrition=function(hole){
var consumed=lsGet('nutrition_consumed',{});
consumed[hole]=!consumed[hole];
lsSet('nutrition_consumed',consumed);
playSfx('nutrition_open');
closePanel('nutrition');setTimeout(showNutritionTimer,150);
};

window._v15ResetNutrition=function(){
lsSet('nutrition_consumed',{});showToast('영양 플랜 초기화');
closePanel('nutrition');setTimeout(showNutritionTimer,200);
};

function renderNutritionCanvas(consumed){
var canvas=document.getElementById('v15-nutrition-canvas');if(!canvas)return;
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a1020';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00B4D8';ctx.font='bold 13px sans-serif';ctx.textAlign='left';
ctx.fillText('Nutrition Timeline (18 Holes)',20,28);

var left=40,right=W-40,top2=60,bot=H-50;
var lineY=(top2+bot)/2;

ctx.strokeStyle='rgba(255,255,255,.1)';ctx.lineWidth=3;
ctx.beginPath();ctx.moveTo(left,lineY);ctx.lineTo(right,lineY);ctx.stroke();

for(var i=0;i<NUTRITION_PLAN.length;i++){
  var np=NUTRITION_PLAN[i];
  var x=left+(right-left)*(np.hole-1)/17;
  var done=consumed[np.hole]||false;
  var col=done?'#00FF88':'rgba(255,255,255,.2)';

  ctx.fillStyle=col;ctx.beginPath();ctx.arc(x,lineY,8,0,Math.PI*2);ctx.fill();
  if(done){ctx.strokeStyle='rgba(0,255,136,.4)';ctx.lineWidth=2;ctx.beginPath();ctx.arc(x,lineY,12,0,Math.PI*2);ctx.stroke();}

  ctx.fillStyle=done?'#00FF88':'#888';ctx.font='bold 9px sans-serif';ctx.textAlign='center';
  ctx.fillText(np.hole+'H',x,lineY+(i%2===0?-18:28));

  ctx.fillStyle=done?'#aaa':'#555';ctx.font='8px sans-serif';
  var label=np.item.length>8?np.item.substring(0,8)+'..':np.item;
  ctx.fillText(label,x,lineY+(i%2===0?-28:38));
}

var doneCount=0;for(var k in consumed)if(consumed[k])doneCount++;
var pct=Math.round(doneCount/NUTRITION_PLAN.length*100);
ctx.fillStyle='#00FF88';ctx.font='bold 14px sans-serif';ctx.textAlign='right';
ctx.fillText(pct+'% 달성 ('+doneCount+'/'+NUTRITION_PLAN.length+')',right,28);

ctx.fillStyle='rgba(0,255,136,.1)';ctx.fillRect(left,bot+10,((right-left)*pct/100),8);
ctx.strokeStyle='rgba(255,255,255,.1)';ctx.strokeRect(left,bot+10,right-left,8);

ctx.fillStyle='#444';ctx.font='9px sans-serif';ctx.textAlign='center';
ctx.fillText('Golf Tracker Pro v15 - Nutrition Plan',W/2,H-8);
}

// ===== 8. GOLF RULES QUICK REFERENCE =====
var GOLF_RULES=[
{cat:'티잉 구역',rules:[
  {title:'티 마커 밖 타구',rule:'티잉 구역 밖에서 친 샷은 무효. 2벌타 + 티잉 구역에서 다시 치기.',penalty:'2벌타'},
  {title:'티 높이',rule:'티는 지면 위 최대 4인치(101.6mm)까지 사용 가능.',penalty:'없음'},
  {title:'순서',rule:'오너(전 홀 최저타)가 먼저 치지만, 레디 골프 권장.',penalty:'없음'}
]},
{cat:'일반 구역',rules:[
  {title:'언플레이어블',rule:'1벌타 후 3가지 옵션: 이전 위치, 핀 방향 2클럽, 후방 드롭.',penalty:'1벌타'},
  {title:'움직인 공',rule:'자연현상 외 공이 움직이면 원래 위치로 리플레이스 + 1벌타.',penalty:'1벌타'},
  {title:'오구 플레이',rule:'다른 사람의 공을 치면 2벌타 (스트로크 플레이).',penalty:'2벌타'}
]},
{cat:'페널티 구역',rules:[
  {title:'워터 해저드',rule:'1벌타 후 이전 위치 또는 마지막 교차점 후방 라인 드롭.',penalty:'1벌타'},
  {title:'레터럴 해저드',rule:'1벌타 후 교차점 2클럽 이내 드롭 (홀에 가까이 안됨).',penalty:'1벌타'}
]},
{cat:'벙커',rules:[
  {title:'모래 터치',rule:'2019 이후: 백스윙 전 모래 터치 가능. 단 테스트 목적 불가.',penalty:'2벌타(위반시)'},
  {title:'돌/낙엽 제거',rule:'벙커 내 루스 임페디먼트 제거 가능 (2019 개정).',penalty:'없음'}
]},
{cat:'퍼팅 그린',rules:[
  {title:'깃대 꽂은 채 퍼팅',rule:'2019 이후: 깃대를 꽂은 채로 퍼팅 가능. 벌타 없음.',penalty:'없음'},
  {title:'볼마크 수리',rule:'그린 위 스파이크 자국, 볼마크 모두 수리 가능.',penalty:'없음'},
  {title:'라인 터치',rule:'그린 위 퍼팅 라인 터치 가능 (2019 개정). 단 상태 개선 금지.',penalty:'2벌타(위반시)'}
]}
];

function showGolfRules(){
var pn=getPanel('rules');
var html='<div class="v15-title">&#x1F4DC; 골프 룰 퀵 레퍼런스</div>';

for(var c=0;c<GOLF_RULES.length;c++){
  var cat=GOLF_RULES[c];
  html+='<div class="v15-card"><h3>'+cat.cat+'</h3>';
  for(var r=0;r<cat.rules.length;r++){
    var rule=cat.rules[r];
    var penColor=rule.penalty==='없음'?'#00FF88':rule.penalty.indexOf('2')>=0?'#ff6b6b':'#FFB800';
    html+='<div style="padding:8px;margin-bottom:4px;border-left:3px solid '+penColor+';background:rgba(255,255,255,.02);border-radius:0 8px 8px 0">';
    html+='<div style="display:flex;justify-content:space-between;align-items:center"><div style="font-weight:700;font-size:.88em;color:#fff">'+rule.title+'</div>';
    html+='<span class="v15-badge" style="background:rgba('+
      (rule.penalty==='없음'?'0,255,136':rule.penalty.indexOf('2')>=0?'255,107,107':'255,184,0')+',.15);color:'+penColor+'">'+rule.penalty+'</span></div>';
    html+='<div style="font-size:.78em;color:#aaa;margin-top:4px">'+rule.rule+'</div>';
    html+='</div>';
  }
  html+='</div>';
}

html+='<div class="v15-card"><h3>&#x1F4A1; 알아두면 좋은 최신 룰 (2019 개정)</h3>';
html+='<div style="font-size:.82em;color:#aaa;line-height:1.7">';
html+='<div>&#x2022; 드롭: 어깨높이 &rarr; <b>무릎높이</b>로 변경</div>';
html+='<div>&#x2022; 탐색 시간: 5분 &rarr; <b>3분</b>으로 단축</div>';
html+='<div>&#x2022; 깃대 꽂은 채 퍼팅 허용 (선택)</div>';
html+='<div>&#x2022; 벙커 내 루스 임페디먼트 제거 가능</div>';
html+='<div>&#x2022; 더블히트(한 스트로크 중 2번 맞음) 벌타 없음</div>';
html+='<div>&#x2022; 캐디가 그린 위 퍼팅라인 뒤에 서는 것 금지</div>';
html+='</div></div>';

pn.innerHTML='<button class="v15-close" onclick="window._v15Close(\'rules\')">&times;</button>'+html;
openPanel('rules');playSfx('rhythm_open');
v15CheckAch();lsSet('ach_rules_viewed',true);
}

// ===== QUIZ v15 (15문항) =====
var V15_QUIZ=[
{q:'라운드 중 18홀 권장 플레이 시간은?',a:['3시간 30분','4시간 10분','4시간 30분','5시간'],c:1},
{q:'클럽 추천 시 맞바람 1m/s당 약 몇 야드를 추가해야 하는가?',a:['0.5yd','1yd','2~3yd','5yd'],c:2},
{q:'코스 슬로프 레이팅의 표준(평균) 값은?',a:['100','113','120','128'],c:1},
{q:'스코어 예측에서 후반 9홀 피로 보정은 보통 몇 % 증가?',a:['1%','3%','5%','10%'],c:0},
{q:'프로 골퍼의 홀인원 확률은 약?',a:['1/500','1/2,500','1/12,500','1/50,000'],c:1},
{q:'2019 개정 룰에서 공 탐색 시간은 최대 몇 분?',a:['2분','3분','5분','10분'],c:1},
{q:'드롭 높이가 2019년부터 어떻게 변경되었는가?',a:['허리높이','무릎높이','어깨높이','지면'],c:1},
{q:'스윙 분석에서 백스윙 크기의 풀스윙 기준은?',a:['70%','80%','90~100%','110%'],c:2},
{q:'라운드 중 수분 섭취 권장량은?',a:['500ml','1L','1.5~2L','3L'],c:2},
{q:'코스레이팅은 어떤 골퍼 기준으로 측정되는가?',a:['초보자','평균 골퍼','스크래치 골퍼','프로'],c:2},
{q:'벙커 내 루스 임페디먼트(돌/낙엽) 제거는?',a:['불가','2019 이후 가능','프로만 가능','캐디만 가능'],c:1},
{q:'언플레이어블 선언 시 벌타는?',a:['없음','1벌타','2벌타','실격'],c:1},
{q:'깃대를 꽂은 채로 퍼팅하면?',a:['2벌타','1벌타','벌타 없음','실격'],c:2},
{q:'골프 영양에서 라운드 중반 권장 간식은?',a:['스테이크','에너지바/바나나','아이스크림','탄산음료'],c:1},
{q:'코스 난이도 평가에서 슬로프 최대값은?',a:['113','128','140','155'],c:3}
];

function showV15Quiz(){
var pn=getPanel('v15quiz');
var qIdx=lsGet('v15_quiz_idx',0);
if(qIdx>=V15_QUIZ.length) qIdx=0;
var q=V15_QUIZ[qIdx];
var total=lsGet('v15_quiz_correct',0);
var attempted=lsGet('v15_quiz_attempted',0);

var html='<div class="v15-title">&#x1F4DD; 골프 퀴즈 v15 ('+V15_QUIZ.length+'문)</div>';
html+='<div class="v15-card"><div style="display:flex;justify-content:space-between;margin-bottom:8px"><span style="color:#00B4D8;font-size:.85em">Q'+(qIdx+1)+'/'+V15_QUIZ.length+'</span><span style="color:#00FF88;font-size:.85em">정답: '+total+'/'+attempted+'</span></div>';
html+='<div style="font-weight:700;font-size:1em;margin-bottom:12px;line-height:1.5">'+q.q+'</div>';
for(var i=0;i<q.a.length;i++){
  html+='<button class="v15-btn" style="width:100%;margin-bottom:6px;text-align:left;padding:10px 14px" onclick="window._v15Answer('+qIdx+','+i+')">'+(i+1)+'. '+q.a[i]+'</button>';
}
html+='</div>';

html+='<div class="v15-card"><h3>진행률</h3>';
var pct=V15_QUIZ.length>0?Math.round(qIdx/V15_QUIZ.length*100):0;
html+='<div style="background:rgba(255,255,255,.05);border-radius:8px;height:8px;margin-top:8px;overflow:hidden"><div style="width:'+pct+'%;height:100%;background:linear-gradient(90deg,#00FF88,#00B4D8);border-radius:8px"></div></div>';
html+='<div style="font-size:.78em;color:#888;margin-top:4px">'+pct+'% 완료</div></div>';

pn.innerHTML='<button class="v15-close" onclick="window._v15Close(\'v15quiz\')">&times;</button>'+html;
openPanel('v15quiz');
}

window._v15Answer=function(qIdx,ans){
var q=V15_QUIZ[qIdx];
var attempted=lsGet('v15_quiz_attempted',0)+1;
lsSet('v15_quiz_attempted',attempted);
if(ans===q.c){
  var correct=lsGet('v15_quiz_correct',0)+1;
  lsSet('v15_quiz_correct',correct);
  showToast('&#x2705; 정답! '+q.a[q.c]);
  playSfx('clubrec_pick');
} else {
  showToast('&#x274C; 오답! 정답: '+q.a[q.c]);
  playSfx('nutrition_open');
}
lsSet('v15_quiz_idx',qIdx+1);
closePanel('v15quiz');setTimeout(showV15Quiz,300);
v15CheckAch();
};

// ===== ACHIEVEMENTS (12개, 84→96) =====
var V15_ACH=[
{id:'v15_rhythm',name:'리듬 마스터',desc:'라운드 리듬 분석기 사용',icon:'&#x23F1;&#xFE0F;',check:function(){return lsGet('ach_rhythm_viewed',false)}},
{id:'v15_rhythm_9',name:'하프 라운드',desc:'9홀 이상 리듬 기록',icon:'&#x1F3CC;&#xFE0F;',check:function(){return lsGet('current_rhythm_holes',[]).length>=9}},
{id:'v15_clubrec',name:'AI 캐디 사용자',desc:'클럽 추천 AI 사용',icon:'&#x1F916;',check:function(){return lsGet('ach_clubrec_viewed',false)}},
{id:'v15_clubrec_5',name:'클럽 전문가',desc:'클럽 추천 5회 이상',icon:'&#x1F3AF;',check:function(){return lsGet('clubrec_logs',[]).length>=5}},
{id:'v15_predict',name:'점쟁이',desc:'스코어 예측 엔진 사용',icon:'&#x1F52E;',check:function(){return lsGet('ach_predict_viewed',false)}},
{id:'v15_predict_3',name:'예측 달인',desc:'스코어 예측 3회 이상',icon:'&#x1F4CA;',check:function(){return lsGet('predict_count',0)>=3}},
{id:'v15_hio',name:'에이스 꿈나무',desc:'홀인원 시뮬레이터 사용',icon:'&#x26F3;',check:function(){return lsGet('ach_hio_viewed',false)}},
{id:'v15_hio_sim',name:'시뮬레이션 중독',desc:'HIO 시뮬 3회 이상',icon:'&#x1F3B0;',check:function(){return lsGet('hio_sim_count',0)>=3}},
{id:'v15_swing',name:'스윙 분석가',desc:'스윙 비교 분석기 사용',icon:'&#x1F504;',check:function(){return lsGet('ach_swing_viewed',false)}},
{id:'v15_coursediff',name:'코스 평론가',desc:'코스 난이도 평가 사용',icon:'&#x1F3D4;&#xFE0F;',check:function(){return lsGet('ach_coursediff_viewed',false)}},
{id:'v15_nutrition',name:'영양 관리자',desc:'영양 타이머 사용',icon:'&#x1F34E;',check:function(){return lsGet('ach_nutrition_viewed',false)}},
{id:'v15_all',name:'v15 탐험가',desc:'v15 전체 기능 탐색',icon:'&#x1F30D;',check:function(){return lsGet('ach_rhythm_viewed',false)&&lsGet('ach_clubrec_viewed',false)&&lsGet('ach_predict_viewed',false)&&lsGet('ach_hio_viewed',false)&&lsGet('ach_swing_viewed',false)&&lsGet('ach_coursediff_viewed',false)&&lsGet('ach_nutrition_viewed',false)&&lsGet('ach_rules_viewed',false)}}
];

function v15CheckAch(){
var unlocked=lsGet('v15_achievements',[]);
for(var i=0;i<V15_ACH.length;i++){
  var ach=V15_ACH[i];
  if(unlocked.indexOf(ach.id)===-1&&ach.check()){
    unlocked.push(ach.id);lsSet('v15_achievements',unlocked);
    showV15AchPopup(ach);playSfx('v15_achieve');
  }
}
}

function showV15AchPopup(ach){
var popup=document.createElement('div');popup.className='v15-ach-popup';
popup.innerHTML='<div style="font-size:2em">'+ach.icon+'</div><div><div style="font-size:.65em;color:#00FF88;font-weight:700;letter-spacing:2px">ACHIEVEMENT</div><div style="font-weight:700">'+ach.name+'</div><div style="font-size:.8em;color:#888;margin-top:2px">'+ach.desc+'</div></div>';
document.body.appendChild(popup);
setTimeout(function(){popup.classList.add('show')},50);
setTimeout(function(){popup.classList.remove('show');setTimeout(function(){popup.remove()},500)},3500);
}

// ===== QUICK ACTIONS & KEYBOARD =====
function injectV15QuickActions(){
var existing=document.querySelector('.v15-scroll-nav');if(existing)return;
var nav=document.createElement('div');nav.className='v15-scroll-nav';
var buttons=[
  {icon:'&#x23F1;&#xFE0F;',title:'리듬 (Shift+A)',fn:'showRoundRhythm'},
  {icon:'&#x1F916;',title:'클럽AI (Shift+C)',fn:'showClubRecommendation'},
  {icon:'&#x1F52E;',title:'예측 (Shift+F)',fn:'showScorePrediction'},
  {icon:'&#x26F3;',title:'HIO (Shift+H)',fn:'showHoleInOneSimulator'},
  {icon:'&#x1F504;',title:'스윙비교 (Shift+W)',fn:'showSwingComparison'},
  {icon:'&#x1F3D4;&#xFE0F;',title:'코스평가 (Shift+D)',fn:'showCourseDifficulty'},
  {icon:'&#x1F34E;',title:'영양 (Shift+I)',fn:'showNutritionTimer'},
  {icon:'&#x1F4DC;',title:'룰북 (Shift+L)',fn:'showGolfRules'}
];
for(var i=0;i<buttons.length;i++){
  var btn=document.createElement('button');btn.className='v15-nav-btn';
  btn.innerHTML='<span class="v15-nav-icon">'+buttons[i].icon+'</span><span class="v15-nav-label">'+buttons[i].title.split(' (')[0]+'</span>';
  btn.title=buttons[i].title;
  btn.setAttribute('data-fn',buttons[i].fn);
  btn.addEventListener('click',function(){var fn=this.getAttribute('data-fn');if(window['_v15_'+fn])window['_v15_'+fn]()});
  nav.appendChild(btn);
}

var oldNav=document.querySelector('.v14-scroll-nav');
if(oldNav)oldNav.style.display='none';

document.body.appendChild(nav);
}

window._v15_showRoundRhythm=showRoundRhythm;
window._v15_showClubRecommendation=showClubRecommendation;
window._v15_showScorePrediction=showScorePrediction;
window._v15_showHoleInOneSimulator=showHoleInOneSimulator;
window._v15_showSwingComparison=showSwingComparison;
window._v15_showCourseDifficulty=showCourseDifficulty;
window._v15_showNutritionTimer=showNutritionTimer;
window._v15_showGolfRules=showGolfRules;
window._v15_showV15Quiz=showV15Quiz;
window._v15Close=function(id){closePanel(id)};

function setupV15Keyboard(){
document.addEventListener('keydown',function(e){
  if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'||e.target.tagName==='SELECT')return;
  if(e.ctrlKey||e.metaKey||e.altKey)return;
  if(!e.shiftKey)return;
  switch(e.key){
    case'A':e.preventDefault();showRoundRhythm();break;
    case'C':e.preventDefault();showClubRecommendation();break;
    case'F':e.preventDefault();showScorePrediction();break;
    case'H':e.preventDefault();showHoleInOneSimulator();break;
    case'W':e.preventDefault();showSwingComparison();break;
    case'D':e.preventDefault();showCourseDifficulty();break;
    case'I':e.preventDefault();showNutritionTimer();break;
    case'L':e.preventDefault();showGolfRules();break;
  }
});
}

// ===== CSS =====
function injectV15CSS(){
var s=document.createElement('style');
s.textContent='.v15-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.88);z-index:10008;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;pointer-events:none}.v15-overlay.active{opacity:1;pointer-events:auto}.v15-panel{background:linear-gradient(145deg,rgba(10,16,26,.98),rgba(5,8,16,.98));border:1px solid rgba(0,255,136,.15);border-radius:18px;padding:24px;max-width:720px;width:94%;max-height:85vh;overflow-y:auto;box-shadow:0 24px 80px rgba(0,0,0,.7),0 0 40px rgba(0,255,136,.06);position:relative}.v15-panel::-webkit-scrollbar{width:5px}.v15-panel::-webkit-scrollbar-thumb{background:rgba(0,255,136,.2);border-radius:3px}.v15-title{font-size:1.4em;font-weight:800;color:#00FF88;margin-bottom:18px;letter-spacing:-0.5px}.v15-close{position:absolute;top:12px;right:16px;background:none;border:none;color:#666;font-size:1.6em;cursor:pointer;padding:4px 8px;border-radius:8px;transition:all .2s;z-index:1}.v15-close:hover{color:#ff6b6b;background:rgba(255,107,107,.1)}.v15-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:16px;margin-bottom:12px;transition:all .2s}.v15-card:hover{border-color:rgba(0,255,136,.15);background:rgba(255,255,255,.05)}.v15-card h3{color:#00FF88;font-size:.95em;margin:0 0 8px}.v15-card p{color:#aaa;font-size:.85em;margin:0;line-height:1.6}.v15-badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:.75em;font-weight:600}.v15-btn{padding:8px 16px;border:1px solid rgba(0,255,136,.2);background:rgba(0,255,136,.06);color:#00FF88;border-radius:8px;cursor:pointer;font-size:.85em;transition:all .2s}.v15-btn:hover{background:rgba(0,255,136,.15);border-color:#00FF88}.v15-btn-primary{background:rgba(0,255,136,.12);border-color:rgba(0,255,136,.3)}.v15-btn-primary:hover{background:rgba(0,255,136,.22)}.v15-input{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:8px 12px;color:#fff;font-size:.85em;width:100%;box-sizing:border-box}.v15-input:focus{outline:none;border-color:rgba(0,255,136,.4)}.v15-label{display:block;font-size:.72em;color:#888;margin-bottom:3px}.v15-table{width:100%;border-collapse:collapse;font-size:.82em}.v15-table th{text-align:left;padding:8px;color:#00FF88;border-bottom:1px solid rgba(255,255,255,.08);font-weight:600}.v15-table td{padding:8px;color:#ccc;border-bottom:1px solid rgba(255,255,255,.03)}.v15-stat-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:10px 6px;text-align:center}.v15-stat-val{font-size:1.3em;font-weight:800}.v15-stat-label{font-size:.65em;color:#888;margin-top:2px}.v15-scroll-nav{position:fixed;bottom:0;left:0;right:0;z-index:1001;display:flex;overflow-x:auto;gap:2px;padding:6px 8px;background:linear-gradient(to top,rgba(5,8,16,.97),rgba(5,8,16,.82));border-top:1px solid rgba(0,255,136,.1);-webkit-overflow-scrolling:touch;scrollbar-width:none}.v15-scroll-nav::-webkit-scrollbar{display:none}.v15-nav-btn{display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px 10px;border:1px solid rgba(0,255,136,.1);background:rgba(0,255,136,.04);color:#00FF88;border-radius:10px;cursor:pointer;flex-shrink:0;transition:all .2s;font-size:1em;min-width:60px}.v15-nav-btn:hover{background:rgba(0,255,136,.12);transform:scale(1.05)}.v15-nav-icon{font-size:1.2em}.v15-nav-label{font-size:.55em;color:#888;white-space:nowrap}.v15-toast{position:fixed;top:20px;left:50%;transform:translateX(-50%) translateY(-100px);background:rgba(0,255,136,.1);border:1px solid rgba(0,255,136,.2);color:#00FF88;padding:10px 20px;border-radius:10px;z-index:99999;transition:transform .4s;font-size:.9em;backdrop-filter:blur(12px);white-space:nowrap}.v15-toast.show{transform:translateX(-50%) translateY(0)}.v15-ach-popup{position:fixed;top:60px;left:50%;transform:translateX(-50%) translateY(-150px);z-index:100002;background:linear-gradient(135deg,rgba(10,16,26,.96),rgba(20,28,38,.96));border:1px solid rgba(0,255,136,.25);border-radius:16px;padding:14px 22px;display:flex;align-items:center;gap:14px;backdrop-filter:blur(20px);transition:transform .5s cubic-bezier(.34,1.56,.64,1);box-shadow:0 8px 32px rgba(0,0,0,.5),0 0 24px rgba(0,255,136,.08)}.v15-ach-popup.show{transform:translateX(-50%) translateY(0)}@media(max-width:480px){.v15-panel{padding:16px;max-height:92vh;width:96%}.v15-scroll-nav{padding:4px 4px;gap:1px}.v15-nav-btn{min-width:52px;padding:5px 7px}.v15-nav-icon{font-size:1em}.v15-nav-label{font-size:.5em}}';
document.head.appendChild(s);
}

// ===== INIT =====
function initV15(){
injectV15CSS();
injectV15QuickActions();
setupV15Keyboard();
setTimeout(v15CheckAch,6000);
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',initV15)}
else{setTimeout(initV15,3500)}

})();
