(function(){
'use strict';
var LS='gt_v17_';
var audioCtx=null;
function getAC(){if(!audioCtx)try{audioCtx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}return audioCtx}
function playSfx(type){var ac=getAC();if(!ac)return;var o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);var t=ac.currentTime;g.gain.setValueAtTime(0.1,t);switch(type){case'sg_club':o.type='sine';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(587,t+0.1);o.frequency.linearRampToValueAtTime(740,t+0.2);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'sg_record':o.type='triangle';o.frequency.setValueAtTime(587,t);o.frequency.linearRampToValueAtTime(880,t+0.1);g.gain.exponentialRampToValueAtTime(0.01,t+0.2);o.start(t);o.stop(t+0.2);break;case'goal_open':o.type='sine';o.frequency.setValueAtTime(392,t);o.frequency.linearRampToValueAtTime(523,t+0.1);o.frequency.linearRampToValueAtTime(659,t+0.2);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'goal_achieve':o.type='sine';o.frequency.setValueAtTime(523,t);o.frequency.setValueAtTime(659,t+0.08);o.frequency.setValueAtTime(784,t+0.16);o.frequency.setValueAtTime(1047,t+0.24);g.gain.exponentialRampToValueAtTime(0.01,t+0.5);o.start(t);o.stop(t+0.5);break;case'warmup_start':o.type='triangle';o.frequency.setValueAtTime(330,t);o.frequency.linearRampToValueAtTime(494,t+0.12);o.frequency.linearRampToValueAtTime(659,t+0.24);g.gain.exponentialRampToValueAtTime(0.01,t+0.4);o.start(t);o.stop(t+0.4);break;case'warmup_step':o.type='sine';o.frequency.setValueAtTime(659,t);o.frequency.linearRampToValueAtTime(880,t+0.08);g.gain.setValueAtTime(0.08,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.15);o.start(t);o.stop(t+0.15);break;case'trend_open':o.type='sine';o.frequency.setValueAtTime(349,t);o.frequency.linearRampToValueAtTime(440,t+0.08);o.frequency.linearRampToValueAtTime(523,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'emotion_save':o.type='triangle';o.frequency.setValueAtTime(494,t);o.frequency.linearRampToValueAtTime(659,t+0.1);o.frequency.linearRampToValueAtTime(784,t+0.2);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'dash_open':o.type='sine';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(554,t+0.08);o.frequency.linearRampToValueAtTime(659,t+0.16);o.frequency.linearRampToValueAtTime(880,t+0.24);g.gain.exponentialRampToValueAtTime(0.01,t+0.4);o.start(t);o.stop(t+0.4);break;case'failure_open':o.type='sine';o.frequency.setValueAtTime(370,t);o.frequency.linearRampToValueAtTime(494,t+0.12);g.gain.exponentialRampToValueAtTime(0.01,t+0.25);o.start(t);o.stop(t+0.25);break;case'course_note':o.type='triangle';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(698,t+0.1);g.gain.setValueAtTime(0.08,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.2);o.start(t);o.stop(t+0.2);break;case'v17_achieve':o.type='sine';o.frequency.setValueAtTime(784,t);o.frequency.setValueAtTime(988,t+0.1);o.frequency.setValueAtTime(1175,t+0.2);o.frequency.setValueAtTime(1568,t+0.3);g.gain.exponentialRampToValueAtTime(0.01,t+0.5);o.start(t);o.stop(t+0.5);break;default:o.type='sine';o.frequency.setValueAtTime(440,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.15);o.start(t);o.stop(t+0.15)}}

function lsGet(k,d){try{var v=localStorage.getItem(LS+k);return v?JSON.parse(v):d}catch(e){return d}}
function lsSet(k,v){try{localStorage.setItem(LS+k,JSON.stringify(v))}catch(e){}}
function todayStr(){return new Date().toISOString().slice(0,10)}
function showToast(msg){var t=document.createElement('div');t.className='v17-toast';t.textContent=msg;document.body.appendChild(t);setTimeout(function(){t.classList.add('show')},50);setTimeout(function(){t.classList.remove('show');setTimeout(function(){t.remove()},400)},3000)}
function createOverlay(id){var ov=document.createElement('div');ov.className='v17-overlay';ov.id='v17-'+id;ov.addEventListener('click',function(e){if(e.target===ov)closePanel(id)});var pn=document.createElement('div');pn.className='v17-panel';pn.style.position='relative';ov.appendChild(pn);return pn}
function openPanel(id){var el=document.getElementById('v17-'+id);if(el)el.classList.add('active')}
function closePanel(id){var el=document.getElementById('v17-'+id);if(el)el.classList.remove('active')}
function getPanel(id){var ov=document.getElementById('v17-'+id);if(!ov){var pn=createOverlay(id);pn.id='v17-'+id+'-panel';document.body.appendChild(pn.parentElement);return pn}return ov.querySelector('.v17-panel')||ov}

// ===== 1. CLUB STROKES GAINED HEATMAP Canvas 640x400 =====
function showClubSG(){
playSfx('sg_club');
var pn=getPanel('clubsg');
var data=lsGet('club_sg',[]);
var CLUBS=['DR','3W','5W','3H','4I','5I','6I','7I','8I','9I','PW','AW','SW','LW'];
var CATS=['Tee-to-Green','Approach','Around Green','Putting'];
var html='<button class="v17-close" onclick="window._v17Close(\'clubsg\')">&times;</button>';
html+='<div class="v17-title">📊 클럽별 스트로크 게인 히트맵</div>';
html+='<div class="v17-card"><h3>SG 데이터 입력</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v17-label">클럽</label><select id="v17-sg-club" class="v17-input">';
for(var c=0;c<CLUBS.length;c++) html+='<option>'+CLUBS[c]+'</option>';
html+='</select></div>';
html+='<div><label class="v17-label">카테고리</label><select id="v17-sg-cat" class="v17-input">';
for(var ct=0;ct<CATS.length;ct++) html+='<option>'+CATS[ct]+'</option>';
html+='</select></div>';
html+='<div><label class="v17-label">SG 값</label><input type="number" id="v17-sg-val" class="v17-input" step="0.1" value="0" min="-5" max="5"></div>';
html+='<div style="display:flex;align-items:flex-end"><button class="v17-btn v17-btn-primary" style="width:100%" onclick="window._v17RecordSG()">저장</button></div>';
html+='</div></div>';
html+='<canvas id="v17-sg-canvas" width="640" height="400" style="width:100%;max-width:640px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';
var totalEntries=data.length;
var avgSG=0;if(totalEntries>0){var sum=0;for(var i=0;i<data.length;i++)sum+=data[i].val;avgSG=Math.round(sum/totalEntries*100)/100;}
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v17-stat-card"><div class="v17-stat-val" style="color:#00FF88">'+totalEntries+'</div><div class="v17-stat-label">총 기록</div></div>';
html+='<div class="v17-stat-card"><div class="v17-stat-val" style="color:'+(avgSG>=0?'#00B4D8':'#FF3366')+'">'+avgSG+'</div><div class="v17-stat-label">평균 SG</div></div>';
var bestClub='-';var bestVal=-99;
for(var bc=0;bc<CLUBS.length;bc++){var cSum=0,cCnt=0;for(var bi=0;bi<data.length;bi++){if(data[bi].club===CLUBS[bc]){cSum+=data[bi].val;cCnt++;}}if(cCnt>0&&cSum/cCnt>bestVal){bestVal=cSum/cCnt;bestClub=CLUBS[bc];}}
html+='<div class="v17-stat-card"><div class="v17-stat-val" style="color:#FFB800">'+bestClub+'</div><div class="v17-stat-label">베스트 클럽</div></div>';
html+='</div>';
html+='<div class="v17-card"><h3>📝 Strokes Gained 가이드</h3>';
html+='<div style="font-size:.82em;color:#aaa;line-height:1.7">';
html+='<div>• SG &gt; 0: 평균 보다 좋은 성적</div>';
html+='<div>• SG &lt; 0: 평균 보다 나쁜 성적</div>';
html+='<div>• PGA 평균 SG: 0.0 (기준선)</div>';
html+='<div>• 퇱 선수: SG Total +2.0 이상</div>';
html+='<div>• 아마추어 평균: SG Total -1.5 ~ -3.0</div>';
html+='</div></div>';
if(data.length>0){html+='<button class="v17-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'SG 데이터를 초기화할까요?\'))window._v17ResetSG()">초기화</button>';}
pn.innerHTML=html;openPanel('clubsg');drawClubSGCanvas(data);
}
window._v17RecordSG=function(){var club=document.getElementById('v17-sg-club').value;var cat=document.getElementById('v17-sg-cat').value;var val=parseFloat(document.getElementById('v17-sg-val').value)||0;var data=lsGet('club_sg',[]);data.push({club:club,cat:cat,val:val,date:todayStr()});if(data.length>500)data=data.slice(-500);lsSet('club_sg',data);playSfx('sg_record');showToast('SG 기록 저장 ('+club+' '+val+')');showClubSG();};
window._v17ResetSG=function(){lsSet('club_sg',[]);showClubSG();};

function drawClubSGCanvas(data){
var c=document.getElementById('v17-sg-canvas');if(!c)return;
var ctx=c.getContext('2d');var W=640,H=400;
ctx.fillStyle='#0c1018';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00FF88';ctx.font='bold 15px sans-serif';ctx.fillText('Club Strokes Gained Heatmap',20,28);
ctx.fillStyle='#555';ctx.font='11px sans-serif';ctx.fillText('14클럽 x 4카테고리 SG 분석',20,46);
var CLUBS=['DR','3W','5W','3H','4I','5I','6I','7I','8I','9I','PW','AW','SW','LW'];
var CATS=['Tee-to-Green','Approach','Around Green','Putting'];
var cellW=42,cellH=22,startX=110,startY=72;
ctx.fillStyle='#00FF88';ctx.font='bold 10px sans-serif';
for(var ci=0;ci<CATS.length;ci++){
  ctx.save();ctx.translate(startX+ci*130+60,startY-8);
  ctx.fillText(CATS[ci],-(ctx.measureText(CATS[ci]).width/2),0);ctx.restore();
}
ctx.fillStyle='#aaa';ctx.font='11px sans-serif';
for(var ri=0;ri<CLUBS.length;ri++){
  ctx.fillText(CLUBS[ri],20,startY+ri*cellH+cellH/2+4);
}
for(var row=0;row<CLUBS.length;row++){
  for(var col=0;col<CATS.length;col++){
    var sum=0,cnt=0;
    for(var p=0;p<data.length;p++){if(data[p].club===CLUBS[row]&&data[p].cat===CATS[col]){sum+=data[p].val;cnt++;}}
    var avg=cnt>0?sum/cnt:0;
    var x=startX+col*130,y=startY+row*cellH;
    if(cnt>0){
      var norm=Math.max(-2,Math.min(2,avg));
      var r,g2,b;
      if(norm>=0){r=Math.round(0+norm*0);g2=Math.round(120+norm*67);b=Math.round(80+norm*20);}
      else{r=Math.round(200+norm*(-25));g2=Math.round(60+norm*25);b=Math.round(80+norm*15);}
      ctx.fillStyle='rgb('+r+','+g2+','+b+')';
      ctx.fillRect(x,y,120,cellH-2);
      ctx.fillStyle='#fff';ctx.font='bold 10px sans-serif';
      ctx.fillText((avg>=0?'+':'')+avg.toFixed(1)+' ('+cnt+')',x+8,y+cellH/2+3);
    } else {
      ctx.fillStyle='rgba(255,255,255,.04)';ctx.fillRect(x,y,120,cellH-2);
      ctx.fillStyle='#444';ctx.font='10px sans-serif';ctx.fillText('- -',x+50,y+cellH/2+3);
    }
  }
}
ctx.fillStyle='#555';ctx.font='10px sans-serif';
ctx.fillText('녹색: SG+ (평균 이상) / 붉은색: SG- (평균 이하)',20,H-16);
var legend=['SG -2.0','SG -1.0','SG 0','SG +1.0','SG +2.0'];
var lColors=['#c83232','#a05050','#507850','#00a064','#00d488'];
for(var li=0;li<legend.length;li++){
  ctx.fillStyle=lColors[li];ctx.fillRect(360+li*56,H-22,48,12);
  ctx.fillStyle='#888';ctx.font='8px sans-serif';ctx.fillText(legend[li],362+li*56,H-26);
}
}

// ===== 2. SCORE GOAL TRACKER Canvas 600x360 =====
function showScoreGoal(){
playSfx('goal_open');
var pn=getPanel('scoregoal');
var goals=lsGet('score_goals',{target:90,milestones:[100,95,90,85,80,75],rounds:[]});
var html='<button class="v17-close" onclick="window._v17Close(\'scoregoal\')">&times;</button>';
html+='<div class="v17-title">🎯 스코어 목표 트래커</div>';
html+='<div class="v17-card"><h3>라운드 스코어 입력</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v17-label">스코어</label><input type="number" id="v17-goal-score" class="v17-input" value="85" min="60" max="150"></div>';
html+='<div><label class="v17-label">코스</label><input type="text" id="v17-goal-course" class="v17-input" placeholder="코스명"></div>';
html+='<div><label class="v17-label">목표</label><select id="v17-goal-target" class="v17-input"><option value="100">100타</option><option value="95">95타</option><option value="90" selected>90타</option><option value="85">85타</option><option value="80">80타</option><option value="75">75타</option></select></div>';
html+='</div>';
html+='<button class="v17-btn v17-btn-primary" style="width:100%;margin-top:10px" onclick="window._v17RecordGoal()">라운드 기록</button></div>';
html+='<canvas id="v17-goal-canvas" width="600" height="360" style="width:100%;max-width:600px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';
var rounds=goals.rounds;
var best=999,worst=0,avg=0;
if(rounds.length>0){
  var sum=0;for(var i=0;i<rounds.length;i++){sum+=rounds[i].score;if(rounds[i].score<best)best=rounds[i].score;if(rounds[i].score>worst)worst=rounds[i].score;}
  avg=Math.round(sum/rounds.length*10)/10;
} else {best=0;}
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v17-stat-card"><div class="v17-stat-val" style="color:#00FF88">'+rounds.length+'</div><div class="v17-stat-label">총 라운드</div></div>';
html+='<div class="v17-stat-card"><div class="v17-stat-val" style="color:#00B4D8">'+(best<999?best:'-')+'</div><div class="v17-stat-label">베스트</div></div>';
html+='<div class="v17-stat-card"><div class="v17-stat-val" style="color:#FFB800">'+(avg||'-')+'</div><div class="v17-stat-label">평균</div></div>';
html+='<div class="v17-stat-card"><div class="v17-stat-val" style="color:#E8A87C">'+(worst||'-')+'</div><div class="v17-stat-label">워스트</div></div>';
html+='</div>';
var achieved=[];for(var mi=0;mi<goals.milestones.length;mi++){if(best<=goals.milestones[mi])achieved.push(goals.milestones[mi]);}
html+='<div class="v17-card"><h3>🏅 마일스톤 달성</h3><div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:8px">';
for(var mk=0;mk<goals.milestones.length;mk++){
  var done=best<=goals.milestones[mk];
  html+='<span class="v17-badge" style="background:'+(done?'rgba(0,255,136,.15)':'rgba(255,255,255,.05)')+';color:'+(done?'#00FF88':'#555')+';border:1px solid '+(done?'rgba(0,255,136,.2)':'rgba(255,255,255,.05)')+'">'+goals.milestones[mk]+'타 돌파 '+(done?'✅':'🔒')+'</span>';
}
html+='</div></div>';
if(rounds.length>0){html+='<button class="v17-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'목표 데이터를 초기화할까요?\'))window._v17ResetGoal()">초기화</button>';}
pn.innerHTML=html;openPanel('scoregoal');drawGoalCanvas(goals);
}
window._v17RecordGoal=function(){var score=parseInt(document.getElementById('v17-goal-score').value)||85;var course=document.getElementById('v17-goal-course').value||'Unknown';var target=parseInt(document.getElementById('v17-goal-target').value)||90;var goals=lsGet('score_goals',{target:90,milestones:[100,95,90,85,80,75],rounds:[]});goals.target=target;goals.rounds.push({score:score,course:course,date:todayStr()});if(goals.rounds.length>100)goals.rounds=goals.rounds.slice(-100);lsSet('score_goals',goals);playSfx('goal_achieve');showToast('라운드 기록: '+score+'타 ('+course+')');showScoreGoal();};
window._v17ResetGoal=function(){lsSet('score_goals',{target:90,milestones:[100,95,90,85,80,75],rounds:[]});showScoreGoal();};

function drawGoalCanvas(goals){
var c=document.getElementById('v17-goal-canvas');if(!c)return;
var ctx=c.getContext('2d');var W=600,H=360;
ctx.fillStyle='#0c1018';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00FF88';ctx.font='bold 15px sans-serif';ctx.fillText('Score Goal Progress',20,28);
var rounds=goals.rounds;
if(rounds.length<2){ctx.fillStyle='#555';ctx.font='12px sans-serif';ctx.fillText('2개 이상 라운드를 기록하면 차트가 표시됩니다.',20,H/2);return;}
var maxScore=0,minScore=999;
for(var i=0;i<rounds.length;i++){if(rounds[i].score>maxScore)maxScore=rounds[i].score;if(rounds[i].score<minScore)minScore=rounds[i].score;}
var padTop=55,padBot=40,padL=60,padR=30;
var chartW=W-padL-padR,chartH=H-padTop-padBot;
var yMax=maxScore+5,yMin=Math.max(minScore-5,60);
ctx.strokeStyle='rgba(255,255,255,.06)';ctx.lineWidth=1;
for(var yy=yMin;yy<=yMax;yy+=5){
  var py=padTop+chartH-(yy-yMin)/(yMax-yMin)*chartH;
  ctx.beginPath();ctx.moveTo(padL,py);ctx.lineTo(W-padR,py);ctx.stroke();
  ctx.fillStyle='#666';ctx.font='10px sans-serif';ctx.fillText(yy+'',padL-30,py+4);
}
// target line
var tY=padTop+chartH-(goals.target-yMin)/(yMax-yMin)*chartH;
ctx.strokeStyle='rgba(0,255,136,.4)';ctx.setLineDash([6,4]);ctx.beginPath();ctx.moveTo(padL,tY);ctx.lineTo(W-padR,tY);ctx.stroke();ctx.setLineDash([]);
ctx.fillStyle='#00FF88';ctx.font='bold 10px sans-serif';ctx.fillText('목표 '+goals.target,W-padR-50,tY-6);
// score line
var pts=[];
for(var ri=0;ri<rounds.length;ri++){
  var px=padL+(ri/(rounds.length-1))*chartW;
  var py2=padTop+chartH-(rounds[ri].score-yMin)/(yMax-yMin)*chartH;
  pts.push({x:px,y:py2,score:rounds[ri].score});
}
// fill area
ctx.beginPath();ctx.moveTo(pts[0].x,padTop+chartH);
for(var fi=0;fi<pts.length;fi++)ctx.lineTo(pts[fi].x,pts[fi].y);
ctx.lineTo(pts[pts.length-1].x,padTop+chartH);ctx.closePath();
var grd=ctx.createLinearGradient(0,padTop,0,padTop+chartH);grd.addColorStop(0,'rgba(0,180,216,.15)');grd.addColorStop(1,'rgba(0,180,216,.02)');ctx.fillStyle=grd;ctx.fill();
// line
ctx.strokeStyle='#00B4D8';ctx.lineWidth=2.5;ctx.beginPath();
for(var li=0;li<pts.length;li++){if(li===0)ctx.moveTo(pts[li].x,pts[li].y);else ctx.lineTo(pts[li].x,pts[li].y);}
ctx.stroke();
// dots
for(var di=0;di<pts.length;di++){
  ctx.fillStyle=pts[di].score<=goals.target?'#00FF88':'#FF3366';
  ctx.beginPath();ctx.arc(pts[di].x,pts[di].y,4,0,Math.PI*2);ctx.fill();
  if(di===pts.length-1||di===0||di%3===0){
    ctx.fillStyle='#ccc';ctx.font='9px sans-serif';ctx.fillText(pts[di].score+'',pts[di].x-8,pts[di].y-10);
  }
}
ctx.fillStyle='#555';ctx.font='10px sans-serif';ctx.fillText('최근 '+rounds.length+'라운드 스코어 추이',20,H-10);
}

// ===== 3. GOLF WARM-UP TIMER Canvas 560x340 =====
function showWarmUp(){
playSfx('warmup_start');
var pn=getPanel('warmup');
var STEPS=[
  {name:'스트레칭 (상체)',time:180,icon:'🧘'},
  {name:'스트레칭 (하체)',time:180,icon:'🦵'},
  {name:'퍼팅 연습 (단거리)',time:300,icon:'⛳'},
  {name:'퍼팅 연습 (중거리)',time:300,icon:'🏌️'},
  {name:'웨지/칩 연습',time:300,icon:'🏳️'},
  {name:'아이언 연습 (순차적)',time:420,icon:'🩸'},
  {name:'드라이버 워밍업',time:420,icon:'🏌️‍♂️'},
  {name:'멘틈 준비 + 호흡',time:120,icon:'🧠'}
];
var state=lsGet('warmup_state',{currentStep:0,running:false,elapsed:0});
var totalTime=0;for(var s=0;s<STEPS.length;s++)totalTime+=STEPS[s].time;
var html='<button class="v17-close" onclick="window._v17Close(\'warmup\')">&times;</button>';
html+='<div class="v17-title">🔥 골프 워밍업 타이머</div>';
html+='<canvas id="v17-warmup-canvas" width="560" height="340" style="width:100%;max-width:560px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v17-stat-card"><div class="v17-stat-val" style="color:#00FF88">'+STEPS.length+'</div><div class="v17-stat-label">단계</div></div>';
html+='<div class="v17-stat-card"><div class="v17-stat-val" style="color:#00B4D8">'+Math.round(totalTime/60)+'분</div><div class="v17-stat-label">총 시간</div></div>';
html+='<div class="v17-stat-card"><div class="v17-stat-val" style="color:#FFB800" id="v17-warmup-step">'+(state.currentStep+1)+'/'+STEPS.length+'</div><div class="v17-stat-label">현재</div></div>';
html+='<div class="v17-stat-card"><div class="v17-stat-val" style="color:#E8A87C" id="v17-warmup-time">0:00</div><div class="v17-stat-label">경과</div></div>';
html+='</div>';
html+='<div style="display:flex;gap:8px;margin:8px 0">';
html+='<button class="v17-btn v17-btn-primary" style="flex:1" id="v17-warmup-start" onclick="window._v17WarmupToggle()">▶️ 시작</button>';
html+='<button class="v17-btn" style="flex:1" onclick="window._v17WarmupReset()">🔄 리셋</button>';
html+='<button class="v17-btn" style="flex:1" onclick="window._v17WarmupNext()">⏩ 다음</button>';
html+='</div>';
html+='<div class="v17-card"><h3>📋 단계별 상세</h3><div style="font-size:.82em;color:#aaa;line-height:2">';
for(var si=0;si<STEPS.length;si++){
  html+='<div style="opacity:'+(si<=state.currentStep?'1':'.5')+'">'+STEPS[si].icon+' '+(si+1)+'. '+STEPS[si].name+' ('+Math.round(STEPS[si].time/60)+'분) '+(si<state.currentStep?'✅':'')+'</div>';
}
html+='</div></div>';
pn.innerHTML=html;openPanel('warmup');drawWarmupCanvas(state,STEPS);
if(state.running) startWarmupTimer(state,STEPS);
}
var warmupTimer=null;
function startWarmupTimer(state,STEPS){
if(warmupTimer)clearInterval(warmupTimer);
warmupTimer=setInterval(function(){
  state.elapsed++;
  if(state.elapsed>=STEPS[state.currentStep].time){
    playSfx('warmup_step');
    state.currentStep++;state.elapsed=0;
    if(state.currentStep>=STEPS.length){state.running=false;state.currentStep=STEPS.length-1;clearInterval(warmupTimer);showToast('워밍업 완료!');lsSet('warmup_state',state);showWarmUp();return;}
  }
  lsSet('warmup_state',state);
  var el=document.getElementById('v17-warmup-time');if(el)el.textContent=Math.floor(state.elapsed/60)+':'+('0'+state.elapsed%60).slice(-2);
  var sl=document.getElementById('v17-warmup-step');if(sl)sl.textContent=(state.currentStep+1)+'/'+STEPS.length;
  drawWarmupCanvas(state,STEPS);
},1000);
}
window._v17WarmupToggle=function(){
var STEPS=[{name:'Stretch Upper',time:180},{name:'Stretch Lower',time:180},{name:'Putt Short',time:300},{name:'Putt Mid',time:300},{name:'Wedge/Chip',time:300},{name:'Irons',time:420},{name:'Driver',time:420},{name:'Mental',time:120}];
var state=lsGet('warmup_state',{currentStep:0,running:false,elapsed:0});
state.running=!state.running;lsSet('warmup_state',state);
if(state.running){startWarmupTimer(state,STEPS);document.getElementById('v17-warmup-start').innerHTML='⏸️ 일시정지';}
else{if(warmupTimer)clearInterval(warmupTimer);document.getElementById('v17-warmup-start').innerHTML='▶️ 재개';}
};
window._v17WarmupReset=function(){if(warmupTimer)clearInterval(warmupTimer);lsSet('warmup_state',{currentStep:0,running:false,elapsed:0});showWarmUp();};
window._v17WarmupNext=function(){
var STEPS=[{time:180},{time:180},{time:300},{time:300},{time:300},{time:420},{time:420},{time:120}];
var state=lsGet('warmup_state',{currentStep:0,running:false,elapsed:0});
state.currentStep=Math.min(state.currentStep+1,STEPS.length-1);state.elapsed=0;lsSet('warmup_state',state);
playSfx('warmup_step');showWarmUp();if(state.running)startWarmupTimer(state,STEPS);
};

function drawWarmupCanvas(state,STEPS){
var c=document.getElementById('v17-warmup-canvas');if(!c)return;
var ctx=c.getContext('2d');var W=560,H=340;
ctx.fillStyle='#0c1018';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00FF88';ctx.font='bold 15px sans-serif';ctx.fillText('Warm-Up Progress',20,28);
var cx=W/2,cy=170,r=100;
var totalSteps=STEPS.length;
for(var i=0;i<totalSteps;i++){
  var angle=-Math.PI/2+(i/totalSteps)*Math.PI*2;
  var angle2=-Math.PI/2+((i+1)/totalSteps)*Math.PI*2;
  ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,angle,angle2);ctx.closePath();
  if(i<state.currentStep){ctx.fillStyle='rgba(0,255,136,.25)';}
  else if(i===state.currentStep){
    var prog=state.elapsed/STEPS[i].time;
    var midAngle=angle+(angle2-angle)*prog;
    ctx.fillStyle='rgba(0,180,216,.2)';ctx.fill();
    ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,angle,midAngle);ctx.closePath();
    ctx.fillStyle='rgba(0,255,136,.35)';
  }
  else{ctx.fillStyle='rgba(255,255,255,.04)';}
  ctx.fill();
  ctx.strokeStyle='rgba(0,0,0,.3)';ctx.lineWidth=2;ctx.stroke();
}
ctx.fillStyle='#0c1018';ctx.beginPath();ctx.arc(cx,cy,55,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#00FF88';ctx.font='bold 28px sans-serif';ctx.textAlign='center';
var rem=STEPS[state.currentStep].time-state.elapsed;
ctx.fillText(Math.floor(rem/60)+':'+('0'+rem%60).slice(-2),cx,cy+5);
ctx.fillStyle='#888';ctx.font='11px sans-serif';
ctx.fillText('Step '+(state.currentStep+1)+'/'+totalSteps,cx,cy+25);
ctx.textAlign='left';
var lx=W-170,ly=60;
ctx.fillStyle='#888';ctx.font='bold 10px sans-serif';ctx.fillText('STEPS',lx,ly);
var stepNames=['Stretch(U)','Stretch(L)','Putt Short','Putt Mid','Wedge','Irons','Driver','Mental'];
for(var si=0;si<stepNames.length;si++){
  ctx.fillStyle=si<state.currentStep?'#00FF88':si===state.currentStep?'#00B4D8':'#444';
  ctx.font=(si===state.currentStep?'bold ':'')+' 10px sans-serif';
  ctx.fillText((si<state.currentStep?'✓ ':si===state.currentStep?'▶ ':'  ')+stepNames[si],lx,ly+18+si*20);
}
}

// ===== 4. CLUB DISTANCE TREND Canvas 600x360 =====
function showDistTrend(){
playSfx('trend_open');
var pn=getPanel('disttrend');
var data=lsGet('dist_trend',[]);
var CLUBS=['DR','3W','5W','3H','4I','5I','6I','7I','8I','9I','PW','AW','SW','LW'];
var selClub=lsGet('dist_trend_club','DR');
var html='<button class="v17-close" onclick="window._v17Close(\'disttrend\')">&times;</button>';
html+='<div class="v17-title">📈 클럽 비거리 트렌드</div>';
html+='<div class="v17-card"><h3>비거리 기록</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v17-label">클럽</label><select id="v17-dt-club" class="v17-input">';
for(var c=0;c<CLUBS.length;c++) html+='<option'+(CLUBS[c]===selClub?' selected':'')+'>'+CLUBS[c]+'</option>';
html+='</select></div>';
html+='<div><label class="v17-label">비거리(m)</label><input type="number" id="v17-dt-dist" class="v17-input" value="200" min="10" max="350"></div>';
html+='<div style="display:flex;align-items:flex-end"><button class="v17-btn v17-btn-primary" style="width:100%" onclick="window._v17RecordDist()">저장</button></div>';
html+='</div></div>';
html+='<div style="display:flex;flex-wrap:wrap;gap:4px;margin:6px 0">';
for(var cc=0;cc<CLUBS.length;cc++){
  html+='<button class="v17-btn'+(CLUBS[cc]===selClub?' v17-btn-primary':'')+'" style="font-size:.75em;padding:4px 8px" onclick="window._v17SelectClub(\''+CLUBS[cc]+'\')">'+CLUBS[cc]+'</button>';
}
html+='</div>';
html+='<canvas id="v17-dist-canvas" width="600" height="360" style="width:100%;max-width:600px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';
var clubData=[];for(var i=0;i<data.length;i++){if(data[i].club===selClub)clubData.push(data[i]);}
var avgD=0,maxD=0,minD=999;
if(clubData.length>0){var s=0;for(var j=0;j<clubData.length;j++){s+=clubData[j].dist;if(clubData[j].dist>maxD)maxD=clubData[j].dist;if(clubData[j].dist<minD)minD=clubData[j].dist;}avgD=Math.round(s/clubData.length*10)/10;}else{minD=0;}
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v17-stat-card"><div class="v17-stat-val" style="color:#00FF88">'+clubData.length+'</div><div class="v17-stat-label">'+selClub+' 기록</div></div>';
html+='<div class="v17-stat-card"><div class="v17-stat-val" style="color:#00B4D8">'+avgD+'m</div><div class="v17-stat-label">평균</div></div>';
html+='<div class="v17-stat-card"><div class="v17-stat-val" style="color:#FFB800">'+maxD+'m</div><div class="v17-stat-label">최대</div></div>';
html+='<div class="v17-stat-card"><div class="v17-stat-val" style="color:#E8A87C">'+(minD<999?minD:0)+'m</div><div class="v17-stat-label">최소</div></div>';
html+='</div>';
if(data.length>0){html+='<button class="v17-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'비거리 데이터를 초기화할까요?\'))window._v17ResetDist()">초기화</button>';}
pn.innerHTML=html;openPanel('disttrend');drawDistCanvas(clubData,selClub);
}
window._v17RecordDist=function(){var club=document.getElementById('v17-dt-club').value;var dist=parseInt(document.getElementById('v17-dt-dist').value)||200;var data=lsGet('dist_trend',[]);data.push({club:club,dist:dist,date:todayStr()});if(data.length>1000)data=data.slice(-1000);lsSet('dist_trend',data);lsSet('dist_trend_club',club);playSfx('sg_record');showToast(club+' '+dist+'m 기록 저장');showDistTrend();};
window._v17SelectClub=function(club){lsSet('dist_trend_club',club);showDistTrend();};
window._v17ResetDist=function(){lsSet('dist_trend',[]);showDistTrend();};

function drawDistCanvas(clubData,club){
var c=document.getElementById('v17-dist-canvas');if(!c)return;
var ctx=c.getContext('2d');var W=600,H=360;
ctx.fillStyle='#0c1018';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00FF88';ctx.font='bold 15px sans-serif';ctx.fillText(club+' Distance Trend',20,28);
if(clubData.length<2){ctx.fillStyle='#555';ctx.font='12px sans-serif';ctx.fillText('2개 이상 기록하면 차트가 표시됩니다.',20,H/2);return;}
var maxD=0,minD=999;for(var i=0;i<clubData.length;i++){if(clubData[i].dist>maxD)maxD=clubData[i].dist;if(clubData[i].dist<minD)minD=clubData[i].dist;}
var padTop=50,padBot=35,padL=55,padR=25;
var chartW=W-padL-padR,chartH=H-padTop-padBot;
var yMax=maxD+10,yMin=Math.max(minD-10,0);
ctx.strokeStyle='rgba(255,255,255,.06)';ctx.lineWidth=1;
for(var yy=Math.floor(yMin/10)*10;yy<=yMax;yy+=10){
  var py=padTop+chartH-(yy-yMin)/(yMax-yMin)*chartH;
  ctx.beginPath();ctx.moveTo(padL,py);ctx.lineTo(W-padR,py);ctx.stroke();
  ctx.fillStyle='#666';ctx.font='10px sans-serif';ctx.fillText(yy+'m',padL-35,py+4);
}
var avg=0;for(var a=0;a<clubData.length;a++)avg+=clubData[a].dist;avg/=clubData.length;
var avgY=padTop+chartH-(avg-yMin)/(yMax-yMin)*chartH;
ctx.strokeStyle='rgba(255,184,0,.3)';ctx.setLineDash([6,4]);ctx.beginPath();ctx.moveTo(padL,avgY);ctx.lineTo(W-padR,avgY);ctx.stroke();ctx.setLineDash([]);
ctx.fillStyle='#FFB800';ctx.font='10px sans-serif';ctx.fillText('Avg '+Math.round(avg)+'m',W-padR-60,avgY-6);
var pts=[];
for(var ri=0;ri<clubData.length;ri++){
  var px=padL+(ri/(clubData.length-1))*chartW;
  var py2=padTop+chartH-(clubData[ri].dist-yMin)/(yMax-yMin)*chartH;
  pts.push({x:px,y:py2,dist:clubData[ri].dist});
}
ctx.beginPath();ctx.moveTo(pts[0].x,padTop+chartH);
for(var fi=0;fi<pts.length;fi++)ctx.lineTo(pts[fi].x,pts[fi].y);
ctx.lineTo(pts[pts.length-1].x,padTop+chartH);ctx.closePath();
var grd=ctx.createLinearGradient(0,padTop,0,padTop+chartH);grd.addColorStop(0,'rgba(78,205,196,.12)');grd.addColorStop(1,'rgba(78,205,196,.02)');ctx.fillStyle=grd;ctx.fill();
ctx.strokeStyle='#4ECDC4';ctx.lineWidth=2;ctx.beginPath();
for(var li=0;li<pts.length;li++){if(li===0)ctx.moveTo(pts[li].x,pts[li].y);else ctx.lineTo(pts[li].x,pts[li].y);}
ctx.stroke();
for(var di=0;di<pts.length;di++){
  ctx.fillStyle=pts[di].dist>=avg?'#00FF88':'#FF3366';
  ctx.beginPath();ctx.arc(pts[di].x,pts[di].y,3,0,Math.PI*2);ctx.fill();
}
}

// ===== 5. ROUND EMOTION DIARY Canvas 560x360 =====
function showEmotionDiary(){
playSfx('emotion_save');
var pn=getPanel('emotion');
var data=lsGet('emotion_diary',[]);
var EMOTIONS=[
  {name:'자신감',icon:'💪',color:'#00FF88'},
  {name:'집중력',icon:'🎯',color:'#00B4D8'},
  {name:'평정심',icon:'🧘',color:'#9B59B6'},
  {name:'즐거움',icon:'😊',color:'#FFB800'},
  {name:'인내심',icon:'⏳',color:'#E8A87C'},
  {name:'투지',icon:'🔥',color:'#FF3366'}
];
var html='<button class="v17-close" onclick="window._v17Close(\'emotion\')">&times;</button>';
html+='<div class="v17-title">📓 라운드 감정 다이어리</div>';
html+='<div class="v17-card"><h3>오늘의 멘틈 상태</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:8px">';
for(var e=0;e<EMOTIONS.length;e++){
  html+='<div style="text-align:center"><div style="font-size:.72em;color:#888;margin-bottom:3px">'+EMOTIONS[e].icon+' '+EMOTIONS[e].name+'</div>';
  html+='<input type="range" id="v17-em-'+e+'" min="1" max="10" value="5" class="v17-input" style="padding:2px;width:100%"></div>';
}
html+='</div>';
html+='<div style="margin-top:8px"><label class="v17-label">메모</label><textarea id="v17-em-memo" class="v17-input" rows="2" placeholder="라운드 감정 메모..."></textarea></div>';
html+='<button class="v17-btn v17-btn-primary" style="width:100%;margin-top:10px" onclick="window._v17RecordEmotion()">감정 기록 저장</button></div>';
html+='<canvas id="v17-emotion-canvas" width="560" height="360" style="width:100%;max-width:560px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';
var totalDays=data.length;
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v17-stat-card"><div class="v17-stat-val" style="color:#00FF88">'+totalDays+'</div><div class="v17-stat-label">기록일</div></div>';
var avgMood=0;if(totalDays>0){var ms=0;for(var md=0;md<data.length;md++){var ds=0;for(var k=0;k<6;k++)ds+=data[md].scores[k];ms+=ds/6;}avgMood=Math.round(ms/totalDays*10)/10;}
html+='<div class="v17-stat-card"><div class="v17-stat-val" style="color:#00B4D8">'+avgMood+'</div><div class="v17-stat-label">평균 무드</div></div>';
var bestDay='-';var bestScore=0;for(var bd=0;bd<data.length;bd++){var bds=0;for(var bk=0;bk<6;bk++)bds+=data[bd].scores[bk];if(bds>bestScore){bestScore=bds;bestDay=data[bd].date;}}
html+='<div class="v17-stat-card"><div class="v17-stat-val" style="color:#FFB800">'+bestDay.slice(5)+'</div><div class="v17-stat-label">베스트 데이</div></div>';
html+='</div>';
if(data.length>0){html+='<button class="v17-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'감정 기록을 초기화할까요?\'))window._v17ResetEmotion()">초기화</button>';}
pn.innerHTML=html;openPanel('emotion');drawEmotionCanvas(data,EMOTIONS);
}
window._v17RecordEmotion=function(){var scores=[];for(var i=0;i<6;i++)scores.push(parseInt(document.getElementById('v17-em-'+i).value)||5);var memo=document.getElementById('v17-em-memo').value||'';var data=lsGet('emotion_diary',[]);data.push({scores:scores,memo:memo,date:todayStr()});if(data.length>365)data=data.slice(-365);lsSet('emotion_diary',data);playSfx('emotion_save');showToast('감정 기록 저장');showEmotionDiary();};
window._v17ResetEmotion=function(){lsSet('emotion_diary',[]);showEmotionDiary();};

function drawEmotionCanvas(data,EMOTIONS){
var c=document.getElementById('v17-emotion-canvas');if(!c)return;
var ctx=c.getContext('2d');var W=560,H=360;
ctx.fillStyle='#0c1018';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00FF88';ctx.font='bold 15px sans-serif';ctx.fillText('Emotion Radar',20,28);
var cx=200,cy=200,r=120;
var latest=data.length>0?data[data.length-1].scores:[5,5,5,5,5,5];
var axes=6;
for(var ring=2;ring<=10;ring+=2){
  ctx.strokeStyle='rgba(255,255,255,.06)';ctx.beginPath();
  for(var a=0;a<axes;a++){
    var angle=-Math.PI/2+(a/axes)*Math.PI*2;
    var rr=r*(ring/10);
    var px=cx+Math.cos(angle)*rr,py=cy+Math.sin(angle)*rr;
    if(a===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);
  }
  ctx.closePath();ctx.stroke();
}
for(var ai=0;ai<axes;ai++){
  var angle=-Math.PI/2+(ai/axes)*Math.PI*2;
  ctx.strokeStyle='rgba(255,255,255,.04)';ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(angle)*r,cy+Math.sin(angle)*r);ctx.stroke();
  ctx.fillStyle=EMOTIONS[ai].color;ctx.font='bold 10px sans-serif';
  var lx=cx+Math.cos(angle)*(r+20)-15,ly=cy+Math.sin(angle)*(r+20)+4;
  ctx.fillText(EMOTIONS[ai].name,lx,ly);
}
ctx.beginPath();
for(var pi=0;pi<axes;pi++){
  var angle2=-Math.PI/2+(pi/axes)*Math.PI*2;
  var rr2=r*(latest[pi]/10);
  var px2=cx+Math.cos(angle2)*rr2,py2=cy+Math.sin(angle2)*rr2;
  if(pi===0)ctx.moveTo(px2,py2);else ctx.lineTo(px2,py2);
}
ctx.closePath();ctx.fillStyle='rgba(0,255,136,.12)';ctx.fill();ctx.strokeStyle='#00FF88';ctx.lineWidth=2;ctx.stroke();
for(var di=0;di<axes;di++){
  var angle3=-Math.PI/2+(di/axes)*Math.PI*2;
  var rr3=r*(latest[di]/10);
  ctx.fillStyle=EMOTIONS[di].color;ctx.beginPath();ctx.arc(cx+Math.cos(angle3)*rr3,cy+Math.sin(angle3)*rr3,4,0,Math.PI*2);ctx.fill();
}
if(data.length>=2){
  ctx.fillStyle='#888';ctx.font='bold 11px sans-serif';ctx.fillText('7-Day Mood Trend',400,60);
  var recent=data.slice(-7);
  var tX=400,tY=80,tW=140,tH=80;
  for(var ti=0;ti<recent.length;ti++){
    var total=0;for(var tk=0;tk<6;tk++)total+=recent[ti].scores[tk];
    var avg=total/6;
    var bx=tX+ti*(tW/recent.length);
    var bh=(avg/10)*tH;
    var grd=ctx.createLinearGradient(bx,tY+tH-bh,bx,tY+tH);
    grd.addColorStop(0,avg>=7?'rgba(0,255,136,.4)':avg>=4?'rgba(255,184,0,.4)':'rgba(255,51,102,.4)');
    grd.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=grd;ctx.fillRect(bx,tY+tH-bh,tW/recent.length-2,bh);
    ctx.fillStyle='#888';ctx.font='8px sans-serif';ctx.fillText(recent[ti].date.slice(5),bx,tY+tH+12);
  }
}
}

// ===== 6. GOLF STATS DASHBOARD Canvas 620x380 =====
function showStatsDash(){
playSfx('dash_open');
var pn=getPanel('statsdash');
var stats=lsGet('stats_dash',{rounds:0,avgScore:0,bestScore:0,fir:0,gir:0,putts:0,sg:0,handicap:36});
var html='<button class="v17-close" onclick="window._v17Close(\'statsdash\')">&times;</button>';
html+='<div class="v17-title">📊 골프 통계 대시보드</div>';
html+='<div class="v17-card"><h3>통계 입력</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:8px">';
html+='<div><label class="v17-label">라운드수</label><input type="number" id="v17-sd-rounds" class="v17-input" value="'+stats.rounds+'"></div>';
html+='<div><label class="v17-label">평균타수</label><input type="number" id="v17-sd-avg" class="v17-input" value="'+stats.avgScore+'"></div>';
html+='<div><label class="v17-label">베스트</label><input type="number" id="v17-sd-best" class="v17-input" value="'+stats.bestScore+'"></div>';
html+='<div><label class="v17-label">핸디캡</label><input type="number" id="v17-sd-hc" class="v17-input" step="0.1" value="'+stats.handicap+'"></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:6px">';
html+='<div><label class="v17-label">FIR%</label><input type="number" id="v17-sd-fir" class="v17-input" value="'+stats.fir+'" min="0" max="100"></div>';
html+='<div><label class="v17-label">GIR%</label><input type="number" id="v17-sd-gir" class="v17-input" value="'+stats.gir+'" min="0" max="100"></div>';
html+='<div><label class="v17-label">평균퍼팅</label><input type="number" id="v17-sd-putts" class="v17-input" step="0.1" value="'+stats.putts+'"></div>';
html+='<div><label class="v17-label">SG Total</label><input type="number" id="v17-sd-sg" class="v17-input" step="0.1" value="'+stats.sg+'"></div>';
html+='</div>';
html+='<button class="v17-btn v17-btn-primary" style="width:100%;margin-top:10px" onclick="window._v17SaveStats()">통계 저장</button></div>';
html+='<canvas id="v17-stats-canvas" width="620" height="380" style="width:100%;max-width:620px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';
html+='<div class="v17-card"><h3>📝 PGA Tour 평균 비교</h3>';
html+='<div style="font-size:.82em;color:#aaa;line-height:1.7">';
html+='<div>• FIR: PGA 62% / 아마추어 45%</div>';
html+='<div>• GIR: PGA 66% / 아마추어 30%</div>';
html+='<div>• 퍼팅: PGA 28.5 / 아마추어 33</div>';
html+='<div>• 핸디캡: PGA +2 ~ -5 / 아마 15~25</div>';
html+='</div></div>';
pn.innerHTML=html;openPanel('statsdash');drawStatsDashCanvas(stats);
}
window._v17SaveStats=function(){
var stats={rounds:parseInt(document.getElementById('v17-sd-rounds').value)||0,avgScore:parseInt(document.getElementById('v17-sd-avg').value)||0,bestScore:parseInt(document.getElementById('v17-sd-best').value)||0,handicap:parseFloat(document.getElementById('v17-sd-hc').value)||36,fir:parseInt(document.getElementById('v17-sd-fir').value)||0,gir:parseInt(document.getElementById('v17-sd-gir').value)||0,putts:parseFloat(document.getElementById('v17-sd-putts').value)||0,sg:parseFloat(document.getElementById('v17-sd-sg').value)||0};
lsSet('stats_dash',stats);playSfx('dash_open');showToast('통계 저장 완료');showStatsDash();
};

function drawStatsDashCanvas(stats){
var c=document.getElementById('v17-stats-canvas');if(!c)return;
var ctx=c.getContext('2d');var W=620,H=380;
ctx.fillStyle='#0c1018';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00FF88';ctx.font='bold 15px sans-serif';ctx.fillText('Golf Stats Dashboard',20,28);
var cx=190,cy=210,r=130;
var labels=['FIR%','GIR%','Putting','Handicap','SG','Score'];
var maxVals=[100,100,40,54,5,150];
var vals=[stats.fir,stats.gir,stats.putts>0?(40-stats.putts)/40*100:0,(54-stats.handicap)/54*100,((stats.sg+5)/10)*100,stats.avgScore>0?(150-stats.avgScore)/150*100:0];
var axes=labels.length;
for(var ring=20;ring<=100;ring+=20){
  ctx.strokeStyle='rgba(255,255,255,.05)';ctx.beginPath();
  for(var a=0;a<axes;a++){
    var angle=-Math.PI/2+(a/axes)*Math.PI*2;
    var rr=r*(ring/100);
    var px=cx+Math.cos(angle)*rr,py=cy+Math.sin(angle)*rr;
    if(a===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);
  }
  ctx.closePath();ctx.stroke();
}
for(var ai=0;ai<axes;ai++){
  var angle=-Math.PI/2+(ai/axes)*Math.PI*2;
  ctx.strokeStyle='rgba(255,255,255,.04)';ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(angle)*r,cy+Math.sin(angle)*r);ctx.stroke();
  var colors=['#00FF88','#00B4D8','#FFB800','#E8A87C','#9B59B6','#FF3366'];
  ctx.fillStyle=colors[ai];ctx.font='bold 10px sans-serif';
  var lx=cx+Math.cos(angle)*(r+22)-15,ly=cy+Math.sin(angle)*(r+22)+4;
  ctx.fillText(labels[ai],lx,ly);
}
ctx.beginPath();
for(var pi=0;pi<axes;pi++){
  var angle2=-Math.PI/2+(pi/axes)*Math.PI*2;
  var v=Math.max(0,Math.min(100,vals[pi]));
  var rr2=r*(v/100);
  if(pi===0)ctx.moveTo(cx+Math.cos(angle2)*rr2,cy+Math.sin(angle2)*rr2);
  else ctx.lineTo(cx+Math.cos(angle2)*rr2,cy+Math.sin(angle2)*rr2);
}
ctx.closePath();ctx.fillStyle='rgba(0,255,136,.1)';ctx.fill();ctx.strokeStyle='#00FF88';ctx.lineWidth=2;ctx.stroke();
for(var di=0;di<axes;di++){
  var angle3=-Math.PI/2+(di/axes)*Math.PI*2;
  var v2=Math.max(0,Math.min(100,vals[di]));
  ctx.fillStyle='#00FF88';ctx.beginPath();ctx.arc(cx+Math.cos(angle3)*r*(v2/100),cy+Math.sin(angle3)*r*(v2/100),4,0,Math.PI*2);ctx.fill();
}
var rx=400,ry=60;
ctx.fillStyle='#888';ctx.font='bold 11px sans-serif';ctx.fillText('SUMMARY',rx,ry);
var items=[
  {label:'Rounds',val:stats.rounds+'',color:'#00FF88'},
  {label:'Avg Score',val:stats.avgScore+'',color:'#00B4D8'},
  {label:'Best',val:stats.bestScore+'',color:'#FFB800'},
  {label:'Handicap',val:stats.handicap.toFixed(1),color:'#E8A87C'},
  {label:'FIR',val:stats.fir+'%',color:'#00FF88'},
  {label:'GIR',val:stats.gir+'%',color:'#00B4D8'},
  {label:'Putts/R',val:stats.putts.toFixed(1),color:'#FFB800'},
  {label:'SG',val:(stats.sg>=0?'+':'')+stats.sg.toFixed(1),color:'#9B59B6'}
];
for(var ii=0;ii<items.length;ii++){
  ctx.fillStyle='rgba(255,255,255,.04)';ctx.fillRect(rx,ry+18+ii*34,200,28);
  ctx.fillStyle=items[ii].color;ctx.font='bold 13px sans-serif';ctx.fillText(items[ii].val,rx+8,ry+36+ii*34);
  ctx.fillStyle='#666';ctx.font='10px sans-serif';ctx.fillText(items[ii].label,rx+100,ry+36+ii*34);
}
}

// ===== 7. SHOT FAILURE ANALYZER Canvas 580x360 =====
function showFailureAnalyzer(){
playSfx('failure_open');
var pn=getPanel('failure');
var data=lsGet('failure_data',[]);
var CAUSES=['얼라인먼트','그립','스탠스','스윈 템포','체중이동','멘틈/집중','클럽 선택','바람 판단'];
var SHOTS=['티샷','페어웨이','아이언','어프로치','칩/피치','퍼팅','벙커'];
var html='<button class="v17-close" onclick="window._v17Close(\'failure\')">&times;</button>';
html+='<div class="v17-title">🔍 샷 실패 원인 분석기</div>';
html+='<div class="v17-card"><h3>실패 기록</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v17-label">샷 유형</label><select id="v17-fa-shot" class="v17-input">';
for(var s=0;s<SHOTS.length;s++) html+='<option>'+SHOTS[s]+'</option>';
html+='</select></div>';
html+='<div><label class="v17-label">실패 원인</label><select id="v17-fa-cause" class="v17-input">';
for(var cc=0;cc<CAUSES.length;cc++) html+='<option>'+CAUSES[cc]+'</option>';
html+='</select></div>';
html+='<div><label class="v17-label">심각도</label><select id="v17-fa-sev" class="v17-input"><option value="1">경미</option><option value="2">보통</option><option value="3" selected>심각</option></select></div>';
html+='</div>';
html+='<button class="v17-btn v17-btn-primary" style="width:100%;margin-top:10px" onclick="window._v17RecordFailure()">실패 기록</button></div>';
html+='<canvas id="v17-failure-canvas" width="580" height="360" style="width:100%;max-width:580px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';
var totalFails=data.length;
var topCause='-';var causeCounts={};
for(var i=0;i<data.length;i++){causeCounts[data[i].cause]=(causeCounts[data[i].cause]||0)+1;}
var maxCnt=0;for(var ck in causeCounts){if(causeCounts[ck]>maxCnt){maxCnt=causeCounts[ck];topCause=ck;}}
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v17-stat-card"><div class="v17-stat-val" style="color:#FF3366">'+totalFails+'</div><div class="v17-stat-label">총 실패</div></div>';
html+='<div class="v17-stat-card"><div class="v17-stat-val" style="color:#FFB800;font-size:1em">'+topCause+'</div><div class="v17-stat-label">주원인</div></div>';
var avgSev=0;if(totalFails>0){var ss=0;for(var sv=0;sv<data.length;sv++)ss+=data[sv].severity;avgSev=Math.round(ss/totalFails*10)/10;}
html+='<div class="v17-stat-card"><div class="v17-stat-val" style="color:#E8A87C">'+avgSev+'/3</div><div class="v17-stat-label">평균 심각도</div></div>';
html+='</div>';
html+='<div class="v17-card"><h3>💡 개선 팁</h3><div style="font-size:.82em;color:#aaa;line-height:1.7">';
html+='<div>• 얼라인먼트: 어드레스 때 클럽페이스 정렬 체크</div>';
html+='<div>• 그립: 온도/습도에 따른 그립 압력 조절</div>';
html+='<div>• 스탠스: 볼 위치 대비 발 배치 확인</div>';
html+='<div>• 스윈 템포: 메트로놈 리듬으로 연습</div>';
html+='</div></div>';
if(data.length>0){html+='<button class="v17-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'실패 데이터를 초기화할까요?\'))window._v17ResetFailure()">초기화</button>';}
pn.innerHTML=html;openPanel('failure');drawFailureCanvas(data,CAUSES,SHOTS);
}
window._v17RecordFailure=function(){var shot=document.getElementById('v17-fa-shot').value;var cause=document.getElementById('v17-fa-cause').value;var severity=parseInt(document.getElementById('v17-fa-sev').value)||2;var data=lsGet('failure_data',[]);data.push({shot:shot,cause:cause,severity:severity,date:todayStr()});if(data.length>500)data=data.slice(-500);lsSet('failure_data',data);playSfx('failure_open');showToast('실패 기록: '+shot+' - '+cause);showFailureAnalyzer();};
window._v17ResetFailure=function(){lsSet('failure_data',[]);showFailureAnalyzer();};

function drawFailureCanvas(data,CAUSES,SHOTS){
var c=document.getElementById('v17-failure-canvas');if(!c)return;
var ctx=c.getContext('2d');var W=580,H=360;
ctx.fillStyle='#0c1018';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00FF88';ctx.font='bold 15px sans-serif';ctx.fillText('Shot Failure Analysis',20,28);
if(data.length===0){ctx.fillStyle='#555';ctx.font='12px sans-serif';ctx.fillText('실패 기록을 추가하면 차트가 표시됩니다.',20,H/2);return;}
var causeCounts={};for(var i=0;i<data.length;i++){causeCounts[data[i].cause]=(causeCounts[data[i].cause]||0)+1;}
var sorted=[];for(var ck in causeCounts)sorted.push({cause:ck,cnt:causeCounts[ck]});
sorted.sort(function(a,b){return b.cnt-a.cnt;});
var maxCnt=sorted.length>0?sorted[0].cnt:1;
var barH=28,startY=55,startX=160;
var colors=['#FF3366','#FF6B6B','#FFB800','#E8A87C','#00B4D8','#4ECDC4','#9B59B6','#00FF88'];
for(var bi=0;bi<Math.min(sorted.length,8);bi++){
  var bw=(sorted[bi].cnt/maxCnt)*(W-startX-40);
  var y=startY+bi*(barH+6);
  var grd=ctx.createLinearGradient(startX,y,startX+bw,y);
  grd.addColorStop(0,colors[bi]);grd.addColorStop(1,colors[bi]+'66');
  ctx.fillStyle=grd;
  ctx.beginPath();
  var rr=6;ctx.moveTo(startX+rr,y);ctx.lineTo(startX+bw-rr,y);ctx.quadraticCurveTo(startX+bw,y,startX+bw,y+rr);
  ctx.lineTo(startX+bw,y+barH-rr);ctx.quadraticCurveTo(startX+bw,y+barH,startX+bw-rr,y+barH);
  ctx.lineTo(startX+rr,y+barH);ctx.quadraticCurveTo(startX,y+barH,startX,y+barH-rr);
  ctx.lineTo(startX,y+rr);ctx.quadraticCurveTo(startX,y,startX+rr,y);ctx.fill();
  ctx.fillStyle='#ddd';ctx.font='11px sans-serif';ctx.fillText(sorted[bi].cause,20,y+barH/2+4);
  ctx.fillStyle='#fff';ctx.font='bold 11px sans-serif';ctx.fillText(sorted[bi].cnt+'회',startX+bw+8,y+barH/2+4);
}
// shot type breakdown on right
ctx.fillStyle='#888';ctx.font='bold 10px sans-serif';ctx.fillText('Shot Type Breakdown',W-180,startY);
var shotCounts={};for(var si=0;si<data.length;si++){shotCounts[data[si].shot]=(shotCounts[data[si].shot]||0)+1;}
var sy=startY+18;
for(var sk in shotCounts){
  var pct=Math.round(shotCounts[sk]/data.length*100);
  ctx.fillStyle='#aaa';ctx.font='10px sans-serif';ctx.fillText(sk+': '+shotCounts[sk]+' ('+pct+'%)',W-170,sy);
  sy+=16;
}
}

// ===== 8. COURSE STRATEGY NOTEBOOK Canvas 580x340 =====
function showCourseNote(){
playSfx('course_note');
var pn=getPanel('coursenote');
var notes=lsGet('course_notes',[]);
var html='<button class="v17-close" onclick="window._v17Close(\'coursenote\')">&times;</button>';
html+='<div class="v17-title">📖 코스 공략 노트북</div>';
html+='<div class="v17-card"><h3>홀별 전략 메모</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v17-label">코스명</label><input type="text" id="v17-cn-course" class="v17-input" placeholder="코스명"></div>';
html+='<div><label class="v17-label">홀 번호</label><select id="v17-cn-hole" class="v17-input">';
for(var h=1;h<=18;h++) html+='<option>'+h+'</option>';
html+='</select></div>';
html+='<div><label class="v17-label">Par</label><select id="v17-cn-par" class="v17-input"><option>3</option><option>4</option><option selected>4</option><option>5</option></select></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:6px">';
html+='<div><label class="v17-label">티샷 클럽</label><select id="v17-cn-teeclub" class="v17-input"><option>DR</option><option>3W</option><option>5W</option><option>3H</option><option>4I</option><option>5I</option></select></div>';
html+='<div><label class="v17-label">난이도</label><select id="v17-cn-diff" class="v17-input"><option value="1">쉬움</option><option value="2">보통</option><option value="3" selected>어려움</option><option value="4">매우 어려움</option></select></div>';
html+='</div>';
html+='<div style="margin-top:6px"><label class="v17-label">전략 메모</label><textarea id="v17-cn-memo" class="v17-input" rows="3" placeholder="홀 공략 전략, 주의사항..."></textarea></div>';
html+='<button class="v17-btn v17-btn-primary" style="width:100%;margin-top:10px" onclick="window._v17SaveNote()">메모 저장</button></div>';
html+='<canvas id="v17-note-canvas" width="580" height="340" style="width:100%;max-width:580px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v17-stat-card"><div class="v17-stat-val" style="color:#00FF88">'+notes.length+'</div><div class="v17-stat-label">총 메모</div></div>';
var courses={};for(var ni=0;ni<notes.length;ni++){courses[notes[ni].course]=1;}
html+='<div class="v17-stat-card"><div class="v17-stat-val" style="color:#00B4D8">'+Object.keys(courses).length+'</div><div class="v17-stat-label">코스 수</div></div>';
var hardHoles=0;for(var hi=0;hi<notes.length;hi++){if(notes[hi].diff>=3)hardHoles++;}
html+='<div class="v17-stat-card"><div class="v17-stat-val" style="color:#FF3366">'+hardHoles+'</div><div class="v17-stat-label">난홀</div></div>';
html+='</div>';
if(notes.length>0){
  html+='<div class="v17-card"><h3>📋 최근 메모</h3><div style="font-size:.82em;color:#aaa;line-height:1.8">';
  var recent=notes.slice(-5).reverse();
  for(var ri=0;ri<recent.length;ri++){
    var diffLabel=['','쉬움','보통','어려움','매우어려움'][recent[ri].diff];
    html+='<div style="padding:6px;border-bottom:1px solid rgba(255,255,255,.04)">⛳ '+recent[ri].course+' #'+recent[ri].hole+' (Par'+recent[ri].par+') ['+diffLabel+'] - '+recent[ri].memo.substring(0,60)+'</div>';
  }
  html+='</div></div>';
  html+='<button class="v17-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'메모를 초기화할까요?\'))window._v17ResetNotes()">초기화</button>';
}
pn.innerHTML=html;openPanel('coursenote');drawCourseNoteCanvas(notes);
}
window._v17SaveNote=function(){var course=document.getElementById('v17-cn-course').value||'Unknown';var hole=parseInt(document.getElementById('v17-cn-hole').value)||1;var par=parseInt(document.getElementById('v17-cn-par').value)||4;var teeclub=document.getElementById('v17-cn-teeclub').value;var diff=parseInt(document.getElementById('v17-cn-diff').value)||2;var memo=document.getElementById('v17-cn-memo').value||'';var notes=lsGet('course_notes',[]);notes.push({course:course,hole:hole,par:par,teeclub:teeclub,diff:diff,memo:memo,date:todayStr()});if(notes.length>500)notes=notes.slice(-500);lsSet('course_notes',notes);playSfx('course_note');showToast(course+' #'+hole+' 메모 저장');showCourseNote();};
window._v17ResetNotes=function(){lsSet('course_notes',[]);showCourseNote();};

function drawCourseNoteCanvas(notes){
var c=document.getElementById('v17-note-canvas');if(!c)return;
var ctx=c.getContext('2d');var W=580,H=340;
ctx.fillStyle='#0c1018';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00FF88';ctx.font='bold 15px sans-serif';ctx.fillText('Course Strategy Map',20,28);
if(notes.length===0){ctx.fillStyle='#555';ctx.font='12px sans-serif';ctx.fillText('홀별 메모를 추가하면 차트가 표시됩니다.',20,H/2);return;}
// 18-hole grid
var gridX=30,gridY=55,cellW=58,cellH=65;
for(var hole=1;hole<=18;hole++){
  var col=(hole-1)%9;var row=Math.floor((hole-1)/9);
  var x=gridX+col*cellW,y=gridY+row*(cellH+20);
  var holeNotes=[];for(var ni=0;ni<notes.length;ni++){if(notes[ni].hole===hole)holeNotes.push(notes[ni]);}
  var hasMemo=holeNotes.length>0;
  ctx.fillStyle=hasMemo?'rgba(0,255,136,.08)':'rgba(255,255,255,.03)';
  ctx.strokeStyle=hasMemo?'rgba(0,255,136,.2)':'rgba(255,255,255,.05)';ctx.lineWidth=1;
  ctx.beginPath();var rr=8;ctx.moveTo(x+rr,y);ctx.lineTo(x+cellW-4-rr,y);ctx.quadraticCurveTo(x+cellW-4,y,x+cellW-4,y+rr);
  ctx.lineTo(x+cellW-4,y+cellH-rr);ctx.quadraticCurveTo(x+cellW-4,y+cellH,x+cellW-4-rr,y+cellH);
  ctx.lineTo(x+rr,y+cellH);ctx.quadraticCurveTo(x,y+cellH,x,y+cellH-rr);
  ctx.lineTo(x,y+rr);ctx.quadraticCurveTo(x,y,x+rr,y);ctx.fill();ctx.stroke();
  ctx.fillStyle=hasMemo?'#00FF88':'#555';ctx.font='bold 12px sans-serif';ctx.fillText('#'+hole,x+8,y+18);
  if(hasMemo){
    var latest=holeNotes[holeNotes.length-1];
    var diffColors=['','#00FF88','#FFB800','#FF6B6B','#FF3366'];
    ctx.fillStyle=diffColors[latest.diff]||'#888';ctx.font='8px sans-serif';
    var diffLabels=['','Easy','Normal','Hard','V.Hard'];
    ctx.fillText(diffLabels[latest.diff],x+8,y+32);
    ctx.fillStyle='#aaa';ctx.font='8px sans-serif';
    ctx.fillText('P'+latest.par+' '+latest.teeclub,x+8,y+44);
    ctx.fillStyle='#666';ctx.font='7px sans-serif';
    var shortMemo=latest.memo.substring(0,8);
    ctx.fillText(shortMemo,x+4,y+56);
  }
}
ctx.fillStyle='#555';ctx.font='10px sans-serif';
ctx.fillText('홀별 전략 메모 (총 '+notes.length+'건)',20,H-12);
}

// ===== QUIZ v17: 15 NEW QUESTIONS (135->150) =====
function showV17Quiz(){
playSfx('dash_open');
var pn=getPanel('v17quiz');
var QUESTIONS=[
  {q:'Launch Monitor에서 측정하는 Smash Factor의 이상적인 값은?',a:['1.2','1.5','1.8','2.0'],c:1},
  {q:'Strokes Gained 분석에서 SG: Putting이 +1.0이면?',a:['평균보다 1타 잘침','평균보다 1타 못침','퍼팅을 1번 함','1번 원퍼팅'],c:0},
  {q:'PGA Tour 평균 GIR(Green in Regulation)은 약 몇 %?',a:['45%','55%','66%','75%'],c:2},
  {q:'골프에서 샷 디스퍼전(Shot Dispersion)이란?',a:['공의 낙하지점 분포','퍼팅 방향','스윈 속도','클럽 무게'],c:0},
  {q:'Handicap Index 계산 시 최근 20라운드 중 몇 개의 베스트 스코어를 사용?',a:['5개','8개','10개','15개'],c:1},
  {q:'Course Rating 72.0, Slope 130인 코스에서 HC 15의 Course Handicap은?',a:['15','17','19','21'],c:2},
  {q:'프리샷 루틴의 권장 시간은?',a:['5초 이내','10-15초','30초','1분'],c:1},
  {q:'바람이 앞에서 불 때 비거리 변화는?',a:['비거리 증가','비거리 감소','변화 없음','좌우로 휘어짐'],c:1},
  {q:'PGA Tour 평균 드라이비거리는 약?',a:['250m','270m','280m','300m'],c:2},
  {q:'골프공의 딜플(dimple)의 역할은?',a:['미관','공기저항 감소+양력 생성','바람 저항 증가','소리 감소'],c:1},
  {q:'Club Fitting에서 Lie Angle이 너무 upright하면?',a:['공이 오른쪽으로','공이 왼쪽으로','토핑','슬라이스'],c:1},
  {q:'라운드 중 수분 보충의 권장 주기는?',a:['9홀마다','3홀마다','6홀마다','갈증 날 때만'],c:1},
  {q:'Shot Tracer 앱의 주요 기술은?',a:['GPS 추적','컴퓨터 비전 (CV)','레이더','블루투스'],c:1},
  {q:'Arccos의 핵심 기능인 Smart Club Sensor는 무엇을 측정?',a:['심박수','클럽 사용 및 위치','바람 속도','체온'],c:1},
  {q:'골프 워밍업에서 가장 먼저 해야 할 것은?',a:['드라이버 연습','퍼팅 연습','스트레칭','칩 연습'],c:2}
];
var state=lsGet('quiz_v17',{idx:0,correct:0,done:false,answers:[]});
var html='<button class="v17-close" onclick="window._v17Close(\'v17quiz\')">&times;</button>';
html+='<div class="v17-title">🧠 골프 퀴즈 v17 (15문항)</div>';
if(state.done){
  var pct=Math.round(state.correct/QUESTIONS.length*100);
  var grade=pct>=90?'S':pct>=80?'A':pct>=70?'B':pct>=60?'C':'D';
  html+='<div class="v17-card" style="text-align:center"><h3>결과: '+state.correct+'/'+QUESTIONS.length+' ('+pct+'%)</h3>';
  html+='<div style="font-size:3em;margin:10px 0">'+grade+'</div>';
  html+='<button class="v17-btn v17-btn-primary" style="margin-top:10px" onclick="window._v17ResetQuiz()">다시 풀기</button></div>';
} else {
  var q=QUESTIONS[state.idx];
  html+='<div class="v17-card"><div style="color:#888;font-size:.82em;margin-bottom:8px">Q'+(state.idx+1)+'/'+QUESTIONS.length+' (맞춘 '+state.correct+')</div>';
  html+='<h3>'+q.q+'</h3>';
  html+='<div style="display:grid;gap:6px;margin-top:12px">';
  for(var ai=0;ai<q.a.length;ai++){
    html+='<button class="v17-btn" style="text-align:left;padding:10px 14px" onclick="window._v17AnswerQuiz('+ai+')">'+String.fromCharCode(65+ai)+'. '+q.a[ai]+'</button>';
  }
  html+='</div></div>';
}
pn.innerHTML=html;openPanel('v17quiz');
}
window._v17AnswerQuiz=function(idx){
var QUESTIONS_LEN=15;var CORRECT_ANS=[1,0,2,0,1,2,1,1,2,1,1,1,1,1,2];
var state=lsGet('quiz_v17',{idx:0,correct:0,done:false,answers:[]});
if(idx===CORRECT_ANS[state.idx]){state.correct++;playSfx('goal_achieve');showToast('정답!');}
else{playSfx('failure_open');showToast('오답...');}
state.answers.push(idx);state.idx++;
if(state.idx>=QUESTIONS_LEN)state.done=true;
lsSet('quiz_v17',state);showV17Quiz();
};
window._v17ResetQuiz=function(){lsSet('quiz_v17',{idx:0,correct:0,done:false,answers:[]});showV17Quiz();};

// ===== ACHIEVEMENTS v17: +12 (108->120) =====
var V17_ACHIEVEMENTS=[
  {id:'v17_sg_first',title:'SG 첫 기록',desc:'클럽별 SG 첫 기록',check:function(){return lsGet('club_sg',[]).length>=1}},
  {id:'v17_sg_10',title:'SG 분석가',desc:'SG 10회 기록',check:function(){return lsGet('club_sg',[]).length>=10}},
  {id:'v17_goal_set',title:'목표 설정',desc:'스코어 목표 첫 라운드',check:function(){return lsGet('score_goals',{rounds:[]}).rounds.length>=1}},
  {id:'v17_goal_5',title:'목표 추적자',desc:'5라운드 목표 추적',check:function(){return lsGet('score_goals',{rounds:[]}).rounds.length>=5}},
  {id:'v17_warmup',title:'워밍업 완료',desc:'워밍업 타이머 사용',check:function(){var s=lsGet('warmup_state',{currentStep:0});return s.currentStep>=7}},
  {id:'v17_dist_10',title:'비거리 추적자',desc:'비거리 10회 기록',check:function(){return lsGet('dist_trend',[]).length>=10}},
  {id:'v17_emotion_3',title:'멘틈 기록가',desc:'감정 다이어리 3회',check:function(){return lsGet('emotion_diary',[]).length>=3}},
  {id:'v17_stats',title:'통계 마스터',desc:'통계 대시보드 저장',check:function(){return lsGet('stats_dash',{rounds:0}).rounds>0}},
  {id:'v17_failure_5',title:'실패 분석가',desc:'실패 5회 분석',check:function(){return lsGet('failure_data',[]).length>=5}},
  {id:'v17_note_3',title:'코스 전략가',desc:'코스 메모 3건',check:function(){return lsGet('course_notes',[]).length>=3}},
  {id:'v17_quiz_pass',title:'v17 퀴즈 통과',desc:'퀴즈 v17 60% 이상',check:function(){var s=lsGet('quiz_v17',{done:false,correct:0});return s.done&&s.correct>=9}},
  {id:'v17_all_open',title:'v17 탐험가',desc:'v17 8기능 모두 열기',check:function(){return lsGet('v17_opened',[]).length>=8}}
];

function v17CheckAch(){
var unlocked=lsGet('achievements',[]);
for(var i=0;i<V17_ACHIEVEMENTS.length;i++){
  var a=V17_ACHIEVEMENTS[i];
  if(unlocked.indexOf(a.id)===-1 && a.check()){
    unlocked.push(a.id);lsSet('achievements',unlocked);
    playSfx('v17_achieve');
    var popup=document.createElement('div');popup.className='v17-ach-popup';
    popup.innerHTML='<div style="font-size:2em">🏆</div><div><div style="color:#00FF88;font-weight:800;font-size:1.1em">'+a.title+'</div><div style="color:#888;font-size:.82em">'+a.desc+'</div></div>';
    document.body.appendChild(popup);
    setTimeout(function(){popup.classList.add('show')},100);
    setTimeout(function(){popup.classList.remove('show');setTimeout(function(){popup.remove()},500)},4000);
  }
}
}

function trackOpen(name){
var opened=lsGet('v17_opened',[]);
if(opened.indexOf(name)===-1){opened.push(name);lsSet('v17_opened',opened);}
}

// ===== ADD BUTTONS TO EXISTING v16 NAV =====
function injectV17QuickActions(){
var nav=document.querySelector('.v16-scroll-nav');
if(!nav){
  setTimeout(injectV17QuickActions,2000);
  return;
}
var buttons=[
  {icon:'📊',title:'Club SG (Shift+S)',fn:'showClubSG'},
  {icon:'🎯',title:'목표 (Shift+D)',fn:'showScoreGoal'},
  {icon:'🔥',title:'워밍업 (Shift+W)',fn:'showWarmUp'},
  {icon:'📈',title:'비거리 (Shift+A)',fn:'showDistTrend'},
  {icon:'📓',title:'감정 (Shift+F)',fn:'showEmotionDiary'},
  {icon:'📊',title:'통계 (Shift+X)',fn:'showStatsDash'},
  {icon:'🔍',title:'실패 (Shift+C)',fn:'showFailureAnalyzer'},
  {icon:'📖',title:'코스노트 (Shift+N)',fn:'showCourseNote'},
  {icon:'❓',title:'퀴즈v17 (Shift+V)',fn:'showV17Quiz'}
];
for(var i=0;i<buttons.length;i++){
  var btn=document.createElement('button');btn.className='v16-nav-btn';
  btn.innerHTML='<span class="v16-nav-icon">'+buttons[i].icon+'</span><span class="v16-nav-label">'+buttons[i].title.split(' (')[0]+'</span>';
  btn.title=buttons[i].title;
  btn.setAttribute('data-fn',buttons[i].fn);
  btn.addEventListener('click',function(){var fn=this.getAttribute('data-fn');if(window['_v17_'+fn])window['_v17_'+fn]()});
  nav.appendChild(btn);
}
}

window._v17_showClubSG=function(){trackOpen('clubsg');showClubSG()};
window._v17_showScoreGoal=function(){trackOpen('scoregoal');showScoreGoal()};
window._v17_showWarmUp=function(){trackOpen('warmup');showWarmUp()};
window._v17_showDistTrend=function(){trackOpen('disttrend');showDistTrend()};
window._v17_showEmotionDiary=function(){trackOpen('emotion');showEmotionDiary()};
window._v17_showStatsDash=function(){trackOpen('statsdash');showStatsDash()};
window._v17_showFailureAnalyzer=function(){trackOpen('failure');showFailureAnalyzer()};
window._v17_showCourseNote=function(){trackOpen('coursenote');showCourseNote()};
window._v17_showV17Quiz=function(){trackOpen('v17quiz');showV17Quiz()};
window._v17Close=function(id){closePanel(id)};

function setupV17Keyboard(){
document.addEventListener('keydown',function(e){
  if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'||e.target.tagName==='SELECT')return;
  if(e.ctrlKey||e.metaKey||e.altKey)return;
  if(!e.shiftKey)return;
  switch(e.key){
    case'S':e.preventDefault();window._v17_showClubSG();break;
    case'D':e.preventDefault();window._v17_showScoreGoal();break;
    case'W':e.preventDefault();window._v17_showWarmUp();break;
    case'A':e.preventDefault();window._v17_showDistTrend();break;
    case'F':e.preventDefault();window._v17_showEmotionDiary();break;
    case'X':e.preventDefault();window._v17_showStatsDash();break;
    case'C':e.preventDefault();window._v17_showFailureAnalyzer();break;
    case'N':e.preventDefault();window._v17_showCourseNote();break;
  }
});
}

// ===== CSS =====
function injectV17CSS(){
var s=document.createElement('style');
s.textContent='.v17-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.88);z-index:10010;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;pointer-events:none}.v17-overlay.active{opacity:1;pointer-events:auto}.v17-panel{background:linear-gradient(145deg,rgba(8,14,24,.98),rgba(4,6,14,.98));border:1px solid rgba(0,255,136,.15);border-radius:18px;padding:24px;max-width:720px;width:94%;max-height:85vh;overflow-y:auto;box-shadow:0 24px 80px rgba(0,0,0,.7),0 0 40px rgba(0,255,136,.06);position:relative}.v17-panel::-webkit-scrollbar{width:5px}.v17-panel::-webkit-scrollbar-thumb{background:rgba(0,255,136,.2);border-radius:3px}.v17-title{font-size:1.4em;font-weight:800;color:#00FF88;margin-bottom:18px;letter-spacing:-0.5px}.v17-close{position:absolute;top:12px;right:16px;background:none;border:none;color:#666;font-size:1.6em;cursor:pointer;padding:4px 8px;border-radius:8px;transition:all .2s;z-index:1}.v17-close:hover{color:#ff6b6b;background:rgba(255,107,107,.1)}.v17-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:16px;margin-bottom:12px;transition:all .2s}.v17-card:hover{border-color:rgba(0,255,136,.15);background:rgba(255,255,255,.05)}.v17-card h3{color:#00FF88;font-size:.95em;margin:0 0 8px}.v17-card p{color:#aaa;font-size:.85em;margin:0;line-height:1.6}.v17-badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:.75em;font-weight:600}.v17-btn{padding:8px 16px;border:1px solid rgba(0,255,136,.2);background:rgba(0,255,136,.06);color:#00FF88;border-radius:8px;cursor:pointer;font-size:.85em;transition:all .2s}.v17-btn:hover{background:rgba(0,255,136,.15);border-color:#00FF88}.v17-btn-primary{background:rgba(0,255,136,.12);border-color:rgba(0,255,136,.3)}.v17-btn-primary:hover{background:rgba(0,255,136,.22)}.v17-input{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:8px 12px;color:#fff;font-size:.85em;width:100%;box-sizing:border-box}.v17-input:focus{outline:none;border-color:rgba(0,255,136,.4)}.v17-label{display:block;font-size:.72em;color:#888;margin-bottom:3px}.v17-stat-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:10px 6px;text-align:center}.v17-stat-val{font-size:1.3em;font-weight:800}.v17-stat-label{font-size:.65em;color:#888;margin-top:2px}.v17-toast{position:fixed;top:20px;left:50%;transform:translateX(-50%) translateY(-100px);background:rgba(0,255,136,.1);border:1px solid rgba(0,255,136,.2);color:#00FF88;padding:10px 20px;border-radius:10px;z-index:99999;transition:transform .4s;font-size:.9em;backdrop-filter:blur(12px);white-space:nowrap}.v17-toast.show{transform:translateX(-50%) translateY(0)}.v17-ach-popup{position:fixed;top:60px;left:50%;transform:translateX(-50%) translateY(-150px);z-index:100004;background:linear-gradient(135deg,rgba(8,14,24,.96),rgba(16,24,36,.96));border:1px solid rgba(0,255,136,.25);border-radius:16px;padding:14px 22px;display:flex;align-items:center;gap:14px;backdrop-filter:blur(20px);transition:transform .5s cubic-bezier(.34,1.56,.64,1);box-shadow:0 8px 32px rgba(0,0,0,.5),0 0 24px rgba(0,255,136,.08)}.v17-ach-popup.show{transform:translateX(-50%) translateY(0)}@media(max-width:480px){.v17-panel{padding:16px;max-height:92vh;width:96%}}';
document.head.appendChild(s);
}

// ===== INIT =====
function initV17(){
injectV17CSS();
injectV17QuickActions();
setupV17Keyboard();
setTimeout(v17CheckAch,8000);
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',initV17)}
else{setTimeout(initV17,5000)}

})();
