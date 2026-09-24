(function(){
'use strict';
var LS='gt_v9_';
var audioCtx=null;
function getAC(){if(!audioCtx)try{audioCtx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}return audioCtx}
function playSfx(type){var ac=getAC();if(!ac)return;var o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);var t=ac.currentTime;g.gain.setValueAtTime(0.1,t);switch(type){case'scorecard':o.type='sine';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(659,t+0.08);o.frequency.linearRampToValueAtTime(784,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'strokes_gained':o.type='triangle';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(660,t+0.12);o.frequency.linearRampToValueAtTime(880,t+0.22);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'putting':o.type='sine';o.frequency.setValueAtTime(330,t);o.frequency.linearRampToValueAtTime(440,t+0.15);o.frequency.setValueAtTime(523,t+0.2);g.gain.exponentialRampToValueAtTime(0.01,t+0.4);o.start(t);o.stop(t+0.4);break;case'course_sim':o.type='sine';o.frequency.setValueAtTime(392,t);o.frequency.linearRampToValueAtTime(523,t+0.1);o.frequency.linearRampToValueAtTime(659,t+0.2);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'calibration':o.type='triangle';o.frequency.setValueAtTime(494,t);o.frequency.linearRampToValueAtTime(659,t+0.1);g.gain.exponentialRampToValueAtTime(0.01,t+0.2);o.start(t);o.stop(t+0.2);break;case'fitness':o.type='sine';o.frequency.setValueAtTime(349,t);o.frequency.linearRampToValueAtTime(440,t+0.1);o.frequency.linearRampToValueAtTime(523,t+0.2);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'journal':o.type='sine';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(554,t+0.12);g.gain.setValueAtTime(0.08,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'rulebook':o.type='triangle';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(659,t+0.08);g.gain.exponentialRampToValueAtTime(0.01,t+0.2);o.start(t);o.stop(t+0.2);break;case'v9_achieve':o.type='sine';o.frequency.setValueAtTime(784,t);o.frequency.setValueAtTime(988,t+0.1);o.frequency.setValueAtTime(1175,t+0.2);o.frequency.setValueAtTime(1568,t+0.3);g.gain.exponentialRampToValueAtTime(0.01,t+0.5);o.start(t);o.stop(t+0.5);break;case'v9_quiz_correct':o.type='sine';o.frequency.setValueAtTime(523,t);o.frequency.setValueAtTime(659,t+0.1);o.frequency.setValueAtTime(784,t+0.2);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;default:o.type='sine';o.frequency.setValueAtTime(440,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.15);o.start(t);o.stop(t+0.15)}}

function lsGet(k,d){try{var v=localStorage.getItem(LS+k);return v?JSON.parse(v):d}catch(e){return d}}
function lsSet(k,v){try{localStorage.setItem(LS+k,JSON.stringify(v))}catch(e){}}
function todayStr(){return new Date().toISOString().slice(0,10)}
function showToast(msg){var t=document.createElement('div');t.className='v9-toast';t.textContent=msg;document.body.appendChild(t);setTimeout(function(){t.classList.add('show')},50);setTimeout(function(){t.classList.remove('show');setTimeout(function(){t.remove()},400)},3000)}
function createOverlay(id){var ov=document.createElement('div');ov.className='v9-overlay';ov.id='v9-'+id;ov.addEventListener('click',function(e){if(e.target===ov)closePanel(id)});var pn=document.createElement('div');pn.className='v9-panel';pn.style.position='relative';ov.appendChild(pn);return pn}
function openPanel(id){var el=document.getElementById('v9-'+id);if(el)el.classList.add('active')}
function closePanel(id){var el=document.getElementById('v9-'+id);if(el)el.classList.remove('active')}
function getPanel(id){var ov=document.getElementById('v9-'+id);if(!ov){var pn=createOverlay(id);pn.id='v9-'+id+'-panel';document.body.appendChild(pn.parentElement);return pn}return ov.querySelector('.v9-panel')||ov}

// ===== 1. ROUND SCORECARD MANAGER =====
var DEFAULT_PARS=[4,4,3,5,4,4,3,4,5,4,3,5,4,4,4,3,4,5];

function showScorecard(){
var pn=getPanel('scorecard');
var rounds=lsGet('scorecard_rounds',[]);
var activeRound=lsGet('scorecard_active',null);
var html='<div class="v9-title">📋 18홀 스코어카드</div>';

if(activeRound){
  var totalScore=0,totalPutts=0,girCount=0,firCount=0,completedHoles=0;
  for(var h=0;h<18;h++){
    var sc=activeRound.scores[h];
    if(sc&&sc.score>0){
      totalScore+=sc.score;totalPutts+=sc.putts||0;completedHoles++;
      if(sc.gir)girCount++;if(sc.fir)firCount++;
    }
  }
  var parTotal=0;for(var pt=0;pt<18;pt++)parTotal+=activeRound.pars[pt];
  var diff=totalScore-parTotal;

  html+='<div class="v9-card" style="border-left:3px solid #00FF88">';
  html+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">';
  html+='<div><div style="font-weight:700;color:#00FF88">'+(activeRound.course||'라운드 중')+'</div>';
  html+='<div style="font-size:.75em;color:#888">'+activeRound.date+'</div></div>';
  html+='<div style="text-align:right">';
  html+='<div style="font-size:2em;font-weight:800;color:'+(diff<0?'#00FF88':diff===0?'#FFC107':'#ff6b6b')+'">'+totalScore+'</div>';
  html+='<div style="font-size:.75em;color:#888">'+(diff>0?'+':'')+diff+' (Par '+parTotal+')</div>';
  html+='</div></div>';

  html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;text-align:center;margin-bottom:12px">';
  html+='<div><div style="font-size:1.2em;font-weight:700;color:#00B4D8">'+completedHoles+'</div><div style="font-size:.65em;color:#888">Holes</div></div>';
  html+='<div><div style="font-size:1.2em;font-weight:700;color:#FFC107">'+totalPutts+'</div><div style="font-size:.65em;color:#888">Putts</div></div>';
  html+='<div><div style="font-size:1.2em;font-weight:700;color:#00FF88">'+girCount+'</div><div style="font-size:.65em;color:#888">GIR</div></div>';
  html+='<div><div style="font-size:1.2em;font-weight:700;color:#E040FB">'+firCount+'</div><div style="font-size:.65em;color:#888">FIR</div></div>';
  html+='</div>';

  html+='<div style="overflow-x:auto"><table class="v9-table" style="min-width:560px;font-size:.75em">';
  html+='<tr><th>Hole</th>';for(var hi=0;hi<9;hi++)html+='<th>'+(hi+1)+'</th>';html+='<th>OUT</th></tr>';
  html+='<tr><td>Par</td>';var outPar=0;for(var pi2=0;pi2<9;pi2++){outPar+=activeRound.pars[pi2];html+='<td>'+activeRound.pars[pi2]+'</td>'}html+='<td style="font-weight:700">'+outPar+'</td></tr>';
  html+='<tr><td>Score</td>';var outScore=0;for(var si2=0;si2<9;si2++){var s=activeRound.scores[si2];var sv=s&&s.score>0?s.score:'-';if(s&&s.score>0)outScore+=s.score;var scolor=s&&s.score>0?(s.score<activeRound.pars[si2]?'color:#00FF88':s.score>activeRound.pars[si2]?'color:#ff6b6b':''):'';html+='<td style="font-weight:700;'+scolor+'">'+sv+'</td>'}html+='<td style="font-weight:700">'+outScore+'</td></tr>';
  html+='</table>';
  html+='<table class="v9-table" style="min-width:560px;font-size:.75em;margin-top:4px">';
  html+='<tr><th>Hole</th>';for(var hi2=9;hi2<18;hi2++)html+='<th>'+(hi2+1)+'</th>';html+='<th>IN</th></tr>';
  html+='<tr><td>Par</td>';var inPar=0;for(var pi3=9;pi3<18;pi3++){inPar+=activeRound.pars[pi3];html+='<td>'+activeRound.pars[pi3]+'</td>'}html+='<td style="font-weight:700">'+inPar+'</td></tr>';
  html+='<tr><td>Score</td>';var inScore=0;for(var si3=9;si3<18;si3++){var s2=activeRound.scores[si3];var sv2=s2&&s2.score>0?s2.score:'-';if(s2&&s2.score>0)inScore+=s2.score;var scolor2=s2&&s2.score>0?(s2.score<activeRound.pars[si3]?'color:#00FF88':s2.score>activeRound.pars[si3]?'color:#ff6b6b':''):'';html+='<td style="font-weight:700;'+scolor2+'">'+sv2+'</td>'}html+='<td style="font-weight:700">'+inScore+'</td></tr>';
  html+='</table></div>';

  var nextHole=-1;for(var nh=0;nh<18;nh++){if(!activeRound.scores[nh]||activeRound.scores[nh].score<=0){nextHole=nh;break}}
  if(nextHole>=0){
    html+='<div style="margin-top:12px;padding:12px;background:rgba(0,255,136,.06);border-radius:10px">';
    html+='<div style="font-weight:700;color:#00FF88;margin-bottom:8px">🏏︎ Hole '+(nextHole+1)+' (Par '+activeRound.pars[nextHole]+')</div>';
    html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">';
    html+='<div><label class="v9-label">Score</label><input id="v9-sc-score" class="v9-input" type="number" min="1" max="15" value="'+activeRound.pars[nextHole]+'"></div>';
    html+='<div><label class="v9-label">Putts</label><input id="v9-sc-putts" class="v9-input" type="number" min="0" max="8" value="2"></div>';
    html+='<div style="display:flex;flex-direction:column;gap:4px;padding-top:14px">';
    html+='<label style="font-size:.75em;display:flex;align-items:center;gap:4px;color:#aaa"><input type="checkbox" id="v9-sc-gir"> GIR</label>';
    if(activeRound.pars[nextHole]>=4)html+='<label style="font-size:.75em;display:flex;align-items:center;gap:4px;color:#aaa"><input type="checkbox" id="v9-sc-fir"> FIR</label>';
    html+='</div></div>';
    html+='<button class="v9-btn v9-btn-primary" style="width:100%;margin-top:8px" onclick="window._v9RecordHole('+nextHole+')">✅ 기록</button>';
    html+='</div>';
  } else {
    html+='<button class="v9-btn v9-btn-primary" style="width:100%;margin-top:12px" onclick="window._v9FinishRound()">🏁 라운드 완료</button>';
  }
  html+='</div>';
} else {
  html+='<div class="v9-card"><h3>➕ 새 라운드 시작</h3>';
  html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">';
  html+='<div><label class="v9-label">코스명</label><input id="v9-sc-course" class="v9-input" type="text" placeholder="골프장 이름" maxlength="30"></div>';
  html+='<div><label class="v9-label">티색</label><select id="v9-sc-tee" class="v9-input"><option value="white">White</option><option value="blue">Blue</option><option value="black">Black</option><option value="red">Red</option><option value="gold">Gold</option></select></div>';
  html+='</div>';
  html+='<button class="v9-btn v9-btn-primary" style="width:100%;margin-top:12px" onclick="window._v9StartRound()">라운드 시작</button></div>';
}

if(rounds.length>0){
  html+='<div class="v9-card"><h3>📅 라운드 이력</h3>';
  for(var ri=rounds.length-1;ri>=Math.max(0,rounds.length-8);ri--){
    var rd=rounds[ri];var rdTotal=0;var rdPar=0;
    for(var rh=0;rh<18;rh++){if(rd.scores[rh]&&rd.scores[rh].score>0)rdTotal+=rd.scores[rh].score;rdPar+=rd.pars[rh]}
    var rdDiff=rdTotal-rdPar;
    html+='<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.04)">';
    html+='<div><span style="color:#00FF88;font-weight:600">'+(rd.course||'Unknown')+'</span> <span style="color:#666;font-size:.8em">'+rd.date+'</span></div>';
    html+='<div style="font-weight:700;color:'+(rdDiff<0?'#00FF88':rdDiff===0?'#FFC107':'#ff6b6b')+'">'+rdTotal+' ('+(rdDiff>0?'+':'')+rdDiff+')</div>';
    html+='</div>';
  }
  html+='</div>';
}

pn.innerHTML='<button class="v9-close" onclick="window._v9Close(\'scorecard\')">&times;</button>'+html;
openPanel('scorecard');playSfx('scorecard');v9CheckAchievements();
}

window._v9StartRound=function(){
var course=document.getElementById('v9-sc-course').value.trim()||'Unknown';
var tee=document.getElementById('v9-sc-tee').value;
var scores=[];for(var i=0;i<18;i++)scores.push({score:0,putts:0,gir:false,fir:false});
var round={date:todayStr(),course:course,tee:tee,pars:DEFAULT_PARS.slice(),scores:scores};
lsSet('scorecard_active',round);showToast('⛳ '+course+' 라운드 시작!');showScorecard();
};

window._v9RecordHole=function(holeIdx){
var round=lsGet('scorecard_active',null);if(!round)return;
var score=parseInt(document.getElementById('v9-sc-score').value)||round.pars[holeIdx];
var putts=parseInt(document.getElementById('v9-sc-putts').value)||2;
var girEl=document.getElementById('v9-sc-gir');
var firEl=document.getElementById('v9-sc-fir');
round.scores[holeIdx]={score:score,putts:putts,gir:girEl?girEl.checked:false,fir:firEl?firEl.checked:false};
lsSet('scorecard_active',round);
var diff=score-round.pars[holeIdx];
var msg=diff<=-2?'Eagle!':diff===-1?'Birdie!':diff===0?'Par':diff===1?'Bogey':'Double+';
showToast('Hole '+(holeIdx+1)+': '+score+' ('+msg+')');playSfx('scorecard');showScorecard();
};

window._v9FinishRound=function(){
var round=lsGet('scorecard_active',null);if(!round)return;
var rounds=lsGet('scorecard_rounds',[]);
rounds.push(round);if(rounds.length>50)rounds=rounds.slice(-50);
lsSet('scorecard_rounds',rounds);lsSet('scorecard_active',null);
showToast('🏁 라운드 완료!');showScorecard();v9CheckAchievements();
};

// ===== 2. STROKES GAINED ANALYZER =====
function showStrokesGained(){
var pn=getPanel('sg');
var sgData=lsGet('sg_data',{offTee:[],approach:[],aroundGreen:[],putting:[]});
var html='<div class="v9-title">📊 Strokes Gained 분석기</div>';

html+='<div class="v9-card"><h3>SG 분석 개요</h3>';
html+='<p>Strokes Gained은 PGA Tour 평균 대비 각 영역에서 얼마나 타수를 절약/낭비하는지 측정합니다.</p></div>';

html+='<div class="v9-card"><h3>🎯 영역별 입력</h3>';
html+='<p style="margin-bottom:12px">최근 라운드에서 각 영역의 평균 타수를 입력하세요.</p>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';
html+='<div><label class="v9-label">Off the Tee (avg)</label><input id="v9-sg-tee" class="v9-input" type="number" step="0.1" min="0" max="5" value="1.2"></div>';
html+='<div><label class="v9-label">Approach (avg)</label><input id="v9-sg-app" class="v9-input" type="number" step="0.1" min="0" max="5" value="1.5"></div>';
html+='<div><label class="v9-label">Around Green (avg)</label><input id="v9-sg-ag" class="v9-input" type="number" step="0.1" min="0" max="5" value="1.0"></div>';
html+='<div><label class="v9-label">Putting (avg putts)</label><input id="v9-sg-putt" class="v9-input" type="number" step="0.1" min="1" max="4" value="1.8"></div>';
html+='</div>';
html+='<button class="v9-btn v9-btn-primary" style="width:100%;margin-top:12px" onclick="window._v9CalcSG()">SG 분석</button></div>';

html+='<div id="v9-sg-result"></div>';

html+='<canvas id="v9-sg-canvas" width="500" height="300" style="width:100%;height:auto;display:none;margin-top:12px;border-radius:12px"></canvas>';

html+='<div class="v9-card"><h3>📖 PGA Tour 평균 (참고)</h3>';
html+='<table class="v9-table"><tr><th>영역</th><th>PGA 평균</th><th>설명</th></tr>';
html+='<tr><td style="color:#00FF88">Off the Tee</td><td>0.00</td><td style="color:#aaa;font-size:.8em">티샷 기준 (FIR + 거리)</td></tr>';
html+='<tr><td style="color:#00B4D8">Approach</td><td>0.00</td><td style="color:#aaa;font-size:.8em">100yd+ 어프로치 샷</td></tr>';
html+='<tr><td style="color:#FFC107">Around Green</td><td>0.00</td><td style="color:#aaa;font-size:.8em">칩/피치/벙커 샷</td></tr>';
html+='<tr><td style="color:#E040FB">Putting</td><td>0.00</td><td style="color:#aaa;font-size:.8em">그린 위 퍼팅</td></tr>';
html+='</table></div>';

pn.innerHTML='<button class="v9-close" onclick="window._v9Close(\'sg\')">&times;</button>'+html;
openPanel('sg');playSfx('strokes_gained');v9CheckAchievements();
}

window._v9CalcSG=function(){
var pgaOT=1.0,pgaApp=1.3,pgaAG=0.8,pgaPutt=1.7;
var myOT=parseFloat(document.getElementById('v9-sg-tee').value)||1.2;
var myApp=parseFloat(document.getElementById('v9-sg-app').value)||1.5;
var myAG=parseFloat(document.getElementById('v9-sg-ag').value)||1.0;
var myPutt=parseFloat(document.getElementById('v9-sg-putt').value)||1.8;

var sgOT=pgaOT-myOT;var sgApp=pgaApp-myApp;var sgAG=pgaAG-myAG;var sgPutt=pgaPutt-myPutt;
var sgTotal=sgOT+sgApp+sgAG+sgPutt;

var sgData=lsGet('sg_data',{records:[]});
sgData.records.push({date:todayStr(),ot:sgOT,app:sgApp,ag:sgAG,putt:sgPutt,total:sgTotal});
if(sgData.records.length>30)sgData.records=sgData.records.slice(-30);
lsSet('sg_data',sgData);

var areas=[
  {name:'Off the Tee',val:sgOT,color:'#00FF88',desc:'티샷 정확도+거리'},
  {name:'Approach',val:sgApp,color:'#00B4D8',desc:'100yd+ 어프로치'},
  {name:'Around Green',val:sgAG,color:'#FFC107',desc:'칩/피치/벙커'},
  {name:'Putting',val:sgPutt,color:'#E040FB',desc:'그린 위 퍼팅'}
];

var html='<div class="v9-card" style="text-align:center;background:linear-gradient(135deg,rgba(0,180,216,.08),rgba(0,255,136,.08))">';
html+='<div style="font-size:.8em;color:#888;margin-bottom:4px">Total Strokes Gained</div>';
html+='<div style="font-size:3em;font-weight:800;color:'+(sgTotal>=0?'#00FF88':'#ff6b6b')+'">'+sgTotal.toFixed(1)+'</div>';
html+='<div style="font-size:.85em;color:#888">PGA Tour 평균 대비</div></div>';

for(var i=0;i<areas.length;i++){
  var a=areas[i];
  var barWidth=Math.min(Math.abs(a.val)*40,100);
  html+='<div class="v9-card" style="padding:12px">';
  html+='<div style="display:flex;justify-content:space-between;align-items:center">';
  html+='<div><span style="color:'+a.color+';font-weight:700">'+a.name+'</span> <span style="font-size:.75em;color:#888">'+a.desc+'</span></div>';
  html+='<div style="font-weight:800;color:'+(a.val>=0?'#00FF88':'#ff6b6b')+'">'+(a.val>0?'+':'')+a.val.toFixed(2)+'</div>';
  html+='</div>';
  html+='<div style="height:8px;background:rgba(255,255,255,.04);border-radius:4px;margin-top:8px;overflow:hidden;position:relative">';
  if(a.val>=0)html+='<div style="position:absolute;left:50%;height:100%;width:'+barWidth/2+'%;background:'+a.color+';border-radius:0 4px 4px 0"></div>';
  else html+='<div style="position:absolute;right:50%;height:100%;width:'+barWidth/2+'%;background:#ff6b6b;border-radius:4px 0 0 4px"></div>';
  html+='<div style="position:absolute;left:50%;top:0;width:1px;height:100%;background:rgba(255,255,255,.2)"></div>';
  html+='</div></div>';
}

var weakest=areas.reduce(function(a,b){return a.val<b.val?a:b});
html+='<div class="v9-card" style="border-left:3px solid #ff6b6b"><h3 style="color:#ff6b6b">⚠︎ 개선 필요: '+weakest.name+'</h3>';
html+='<p>'+weakest.name+' 영역에서 SG '+weakest.val.toFixed(2)+' 로 가장 많은 타수를 잃고 있습니다. 이 영역에 연습을 집중하세요.</p></div>';

document.getElementById('v9-sg-result').innerHTML=html;

var canvas=document.getElementById('v9-sg-canvas');
if(canvas&&sgData.records.length>1){
  canvas.style.display='block';
  var ctx=canvas.getContext('2d');var W=500,H=300;
  ctx.clearRect(0,0,W,H);ctx.fillStyle='rgba(0,30,0,.3)';ctx.fillRect(0,0,W,H);
  ctx.strokeStyle='rgba(255,255,255,.05)';
  for(var gy=0;gy<H;gy+=30){ctx.beginPath();ctx.moveTo(0,gy);ctx.lineTo(W,gy);ctx.stroke()}
  ctx.beginPath();ctx.moveTo(0,H/2);ctx.lineTo(W,H/2);ctx.strokeStyle='rgba(255,255,255,.15)';ctx.stroke();
  ctx.fillStyle='rgba(0,255,136,.3)';ctx.font='9px sans-serif';ctx.fillText('+Good',5,H/2-8);ctx.fillText('-Bad',5,H/2+16);
  var recs=sgData.records;var step=Math.max(1,(W-60)/Math.max(recs.length-1,1));
  var colors2=['#00FF88','#00B4D8','#FFC107','#E040FB'];var keys=['ot','app','ag','putt'];
  for(var ci=0;ci<4;ci++){
    ctx.beginPath();ctx.strokeStyle=colors2[ci];ctx.lineWidth=2;
    for(var ri2=0;ri2<recs.length;ri2++){
      var x=30+ri2*step;var y=H/2-recs[ri2][keys[ci]]*60;
      if(ri2===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
    }ctx.stroke();
  }
}
playSfx('strokes_gained');v9CheckAchievements();
};

// ===== 3. PUTTING ANALYZER =====
function showPuttingAnalyzer(){
var pn=getPanel('putting');
var puttData=lsGet('putt_data',[]);
var html='<div class="v9-title">🎯 퍼팅 분석기</div>';

html+='<div class="v9-card"><h3>거리별 퍼팅 성공률</h3>';
html+='<p style="margin-bottom:12px">퍼팅 결과를 기록하면 거리별 성공률을 분석합니다.</p>';
html+='<canvas id="v9-putt-canvas" width="500" height="280" style="width:100%;height:auto;background:rgba(0,40,0,.2);border-radius:12px;border:1px solid rgba(0,255,136,.1)"></canvas></div>';

html+='<div class="v9-card"><h3>➕ 퍼팅 기록</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">';
html+='<div><label class="v9-label">거리 (ft)</label><input id="v9-putt-dist" class="v9-input" type="number" min="1" max="60" value="6"></div>';
html+='<div><label class="v9-label">결과</label><select id="v9-putt-result" class="v9-input"><option value="made">✅ 성공</option><option value="missed">❌ 실패</option></select></div>';
html+='<div><label class="v9-label">브레이크</label><select id="v9-putt-break" class="v9-input"><option value="straight">직선</option><option value="left">좌회전</option><option value="right">우회전</option></select></div>';
html+='<div><label class="v9-label">경사</label><select id="v9-putt-slope" class="v9-input"><option value="flat">평지</option><option value="uphill">오르막</option><option value="downhill">내리막</option></select></div>';
html+='</div>';
html+='<button class="v9-btn v9-btn-primary" style="width:100%;margin-top:12px" onclick="window._v9RecordPutt()">퍼팅 기록</button></div>';

var ranges=[{min:0,max:3,label:'0-3ft'},{min:3,max:6,label:'3-6ft'},{min:6,max:10,label:'6-10ft'},{min:10,max:15,label:'10-15ft'},{min:15,max:25,label:'15-25ft'},{min:25,max:99,label:'25ft+'}];
html+='<div class="v9-card"><h3>📊 거리별 통계</h3>';
html+='<table class="v9-table"><tr><th>거리</th><th>시도</th><th>성공</th><th>성공률</th><th>PGA 평균</th></tr>';
var pgaAvgs=[99,84,54,33,17,7];
for(var ri3=0;ri3<ranges.length;ri3++){
  var rng=ranges[ri3];
  var rangeData=puttData.filter(function(p){return p.dist>=rng.min&&p.dist<rng.max});
  var made=rangeData.filter(function(p){return p.result==='made'}).length;
  var pct=rangeData.length>0?Math.round(made/rangeData.length*100):'-';
  var pctColor=pct==='-'?'#888':pct>=pgaAvgs[ri3]?'#00FF88':'#ff6b6b';
  html+='<tr><td style="color:#00B4D8">'+rng.label+'</td><td>'+rangeData.length+'</td><td>'+made+'</td>';
  html+='<td style="color:'+pctColor+';font-weight:700">'+(pct==='-'?'-':pct+'%')+'</td>';
  html+='<td style="color:#888">'+pgaAvgs[ri3]+'%</td></tr>';
}
html+='</table></div>';

html+='<div class="v9-card"><h3>💡 퍼팅 팁</h3>';
var puttTips=[
  {range:'3ft 이내',tip:'볼을 보지 말고 홀을 보세요. 헤드를 들지 말고 소리를 들으세요.'},
  {range:'3-6ft',tip:'어깨 회전으로 스트로크. 손목 고정, 퍼터헤드를 스퀘어로 유지.'},
  {range:'6ft+',tip:'거리감이 핵심. 홀 근처에 붙이는 것이 목표. 3퍼트 방지.'}
];
for(var ti=0;ti<puttTips.length;ti++){
  html+='<div style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,.04)">';
  html+='<span style="color:#00FF88;font-weight:600">'+puttTips[ti].range+'</span> ';
  html+='<span style="color:#aaa;font-size:.85em">'+puttTips[ti].tip+'</span></div>';
}
html+='</div>';

pn.innerHTML='<button class="v9-close" onclick="window._v9Close(\'putting\')">&times;</button>'+html;
openPanel('putting');playSfx('putting');
setTimeout(function(){renderPuttCanvas(puttData)},100);
v9CheckAchievements();
}

function renderPuttCanvas(data){
var canvas=document.getElementById('v9-putt-canvas');if(!canvas)return;
var ctx=canvas.getContext('2d');var W=500,H=280;
ctx.clearRect(0,0,W,H);
ctx.fillStyle='rgba(0,80,0,.15)';ctx.fillRect(0,0,W,H);

ctx.strokeStyle='rgba(255,255,255,.08)';
for(var gx=0;gx<W;gx+=50){ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,H);ctx.stroke()}
for(var gy2=0;gy2<H;gy2+=28){ctx.beginPath();ctx.moveTo(0,gy2);ctx.lineTo(W,gy2);ctx.stroke()}

ctx.fillStyle='#00FF88';ctx.beginPath();ctx.arc(W-40,H/2,12,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#000';ctx.font='bold 8px sans-serif';ctx.textAlign='center';
ctx.fillText('CUP',W-40,H/2+3);

for(var di=0;di<Math.min(data.length,80);di++){
  var p=data[di];
  var angle=(Math.random()-0.5)*0.5;
  var distNorm=Math.min(p.dist/30,1);
  var startX=40;var startY=H/2;
  var endX=startX+(W-100)*distNorm;
  var endY=startY;
  if(p.break2==='left')endY-=distNorm*30+Math.random()*15;
  else if(p.break2==='right')endY+=distNorm*30+Math.random()*15;
  endY+=(Math.random()-0.5)*20;

  var cpX=(startX+endX)/2;var cpY=startY+(p.break2==='left'?-20:p.break2==='right'?20:0);
  ctx.beginPath();ctx.moveTo(startX,startY);
  ctx.quadraticCurveTo(cpX,cpY,endX,endY);
  ctx.strokeStyle=p.result==='made'?'rgba(0,255,136,.4)':'rgba(255,107,107,.3)';
  ctx.lineWidth=1.5;ctx.stroke();

  ctx.fillStyle=p.result==='made'?'rgba(0,255,136,.6)':'rgba(255,107,107,.5)';
  ctx.beginPath();ctx.arc(endX,endY,3,0,Math.PI*2);ctx.fill();
}

ctx.fillStyle='rgba(255,255,255,.5)';ctx.font='10px sans-serif';ctx.textAlign='left';
ctx.fillText(data.length+' putts recorded',10,20);
ctx.fillStyle='rgba(0,255,136,.5)';ctx.fillText('Made',10,H-20);
ctx.fillStyle='rgba(255,107,107,.5)';ctx.fillText('Missed',60,H-20);
}

window._v9RecordPutt=function(){
var dist=parseInt(document.getElementById('v9-putt-dist').value)||6;
var result=document.getElementById('v9-putt-result').value;
var brk=document.getElementById('v9-putt-break').value;
var slope=document.getElementById('v9-putt-slope').value;
var data=lsGet('putt_data',[]);
data.push({date:todayStr(),dist:dist,result:result,break2:brk,slope:slope});
if(data.length>500)data=data.slice(-500);
lsSet('putt_data',data);
showToast(result==='made'?'✅ '+dist+'ft 퍼팅 성공!':'❌ '+dist+'ft 실패');
playSfx('putting');showPuttingAnalyzer();
};

// ===== 4. COURSE STRATEGY SIMULATOR =====
var COURSE_TEMPLATES=[
{name:'Par 4 직선',par:4,distance:380,features:[{type:'tee',x:50,y:430},{type:'fairway',x:50,y:200,w:80,h:250},{type:'green',x:50,y:60,r:30},{type:'bunker',x:20,y:80,r:12},{type:'bunker',x:80,y:90,r:10}],strategy:'페어웨이 중앙을 공략. 우측 벙커를 피해 좌측으로 어프로치.'},
{name:'Par 3 아일러드',par:3,distance:165,features:[{type:'tee',x:50,y:430},{type:'water',x:50,y:220,w:90,h:40},{type:'green',x:50,y:100,r:28},{type:'bunker',x:25,y:110,r:12}],strategy:'물을 넘겨야 합니다. 그린 뒤쪽을 공략하여 안전하게.'},
{name:'Par 5 도그렉',par:5,distance:520,features:[{type:'tee',x:20,y:430},{type:'fairway',x:25,y:280,w:40,h:160},{type:'fairway',x:55,y:140,w:45,h:160},{type:'green',x:70,y:60,r:28},{type:'bunker',x:90,y:70,r:10},{type:'water',x:10,y:160,w:25,h:50}],strategy:'1번 샷 페어웨이 중앙, 2번 샷으로 코너를 돌아 그린 공략.'},
{name:'Par 4 도그렉L',par:4,distance:400,features:[{type:'tee',x:80,y:430},{type:'fairway',x:65,y:280,w:50,h:160},{type:'fairway',x:30,y:140,w:50,h:160},{type:'green',x:25,y:60,r:30},{type:'bunker',x:10,y:55,r:11},{type:'trees',x:95,y:200,r:15}],strategy:'좌측 도그렉. 페어웨이 좌측을 공략하여 코너를 단축.'},
{name:'Par 3 벙커가드',par:3,distance:195,features:[{type:'tee',x:50,y:430},{type:'green',x:50,y:100,r:32},{type:'bunker',x:20,y:90,r:14},{type:'bunker',x:80,y:90,r:14},{type:'bunker',x:50,y:140,r:12}],strategy:'3방향 벙커 수비. 그린 중앙을 정확히 공략.'},
{name:'Par 5 워터홈',par:5,distance:540,features:[{type:'tee',x:50,y:430},{type:'fairway',x:50,y:280,w:60,h:160},{type:'water',x:35,y:120,w:30,h:40},{type:'green',x:55,y:55,r:26},{type:'bunker',x:80,y:60,r:10}],strategy:'그린 앞 워터. 2온 시도보다 레이업이 안전.'}
];

function showCourseSim(){
var pn=getPanel('course');
var html='<div class="v9-title">🏌️ 코스 전략 시뮬레이터</div>';

html+='<div class="v9-card"><h3>홀 선택</h3>';
html+='<div style="display:flex;gap:8px;flex-wrap:wrap">';
for(var ci2=0;ci2<COURSE_TEMPLATES.length;ci2++){
  html+='<button class="v9-btn '+(ci2===0?'active':'')+'" data-cidx="'+ci2+'" onclick="window._v9SelectCourse('+ci2+')">'+COURSE_TEMPLATES[ci2].name+'</button>';
}
html+='</div></div>';

html+='<div class="v9-card"><canvas id="v9-course-canvas" width="400" height="480" style="width:100%;max-width:400px;height:auto;background:rgba(0,60,0,.2);border-radius:12px;display:block;margin:0 auto"></canvas></div>';

html+='<div id="v9-course-info" class="v9-card" style="border-left:3px solid #00FF88"></div>';

pn.innerHTML='<button class="v9-close" onclick="window._v9Close(\'course\')">&times;</button>'+html;
openPanel('course');playSfx('course_sim');
setTimeout(function(){window._v9SelectCourse(0)},100);
v9CheckAchievements();
}

window._v9SelectCourse=function(idx){
var tmpl=COURSE_TEMPLATES[idx];
var btns=document.querySelectorAll('[data-cidx]');
for(var b=0;b<btns.length;b++)btns[b].classList.toggle('active',parseInt(btns[b].getAttribute('data-cidx'))===idx);

var canvas=document.getElementById('v9-course-canvas');if(!canvas)return;
var ctx=canvas.getContext('2d');var W=400,H=480;
ctx.clearRect(0,0,W,H);

ctx.fillStyle='#1a5c1a';ctx.fillRect(0,0,W,H);
ctx.strokeStyle='rgba(255,255,255,.05)';
for(var gx2=0;gx2<W;gx2+=20){ctx.beginPath();ctx.moveTo(gx2,0);ctx.lineTo(gx2,H);ctx.stroke()}
for(var gy3=0;gy3<H;gy3+=20){ctx.beginPath();ctx.moveTo(0,gy3);ctx.lineTo(W,gy3);ctx.stroke()}

for(var fi=0;fi<tmpl.features.length;fi++){
  var f=tmpl.features[fi];
  var fx=f.x/100*W;var fy=f.y/480*H;
  switch(f.type){
    case'tee':
      ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(fx,fy,8,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#000';ctx.font='bold 8px sans-serif';ctx.textAlign='center';ctx.fillText('TEE',fx,fy+3);
      break;
    case'fairway':
      var fw2=f.w/100*W;var fh2=f.h/480*H;
      ctx.fillStyle='#2d8b2d';ctx.beginPath();
      ctx.ellipse(fx,fy,fw2/2,fh2/2,0,0,Math.PI*2);ctx.fill();
      break;
    case'green':
      ctx.fillStyle='#4CAF50';ctx.beginPath();ctx.arc(fx,fy,f.r/100*W,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle='#fff';ctx.lineWidth=1;ctx.beginPath();ctx.arc(fx,fy,f.r/100*W,0,Math.PI*2);ctx.stroke();
      ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(fx,fy,3,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#FF4444';ctx.beginPath();ctx.moveTo(fx,fy-3);ctx.lineTo(fx+1,fy-12);ctx.lineTo(fx+8,fy-10);ctx.lineTo(fx+1,fy-8);ctx.lineTo(fx,fy-3);ctx.fill();
      break;
    case'bunker':
      ctx.fillStyle='#E8D68D';ctx.beginPath();ctx.arc(fx,fy,f.r/100*W,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle='rgba(139,119,42,.5)';ctx.lineWidth=1;ctx.beginPath();ctx.arc(fx,fy,f.r/100*W,0,Math.PI*2);ctx.stroke();
      break;
    case'water':
      var ww=f.w/100*W;var wh=f.h/480*H;
      ctx.fillStyle='rgba(33,150,243,.6)';ctx.beginPath();
      ctx.ellipse(fx,fy,ww/2,wh/2,0,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle='rgba(33,150,243,.8)';ctx.lineWidth=1;ctx.beginPath();
      ctx.ellipse(fx,fy,ww/2,wh/2,0,0,Math.PI*2);ctx.stroke();
      break;
    case'trees':
      ctx.fillStyle='#0d4d0d';for(var tr=0;tr<5;tr++){
        var tx=fx+(Math.random()-0.5)*f.r/100*W*2;var ty=fy+(Math.random()-0.5)*f.r/100*W*2;
        ctx.beginPath();ctx.arc(tx,ty,6+Math.random()*4,0,Math.PI*2);ctx.fill();
      }
      break;
  }
}

ctx.fillStyle='rgba(255,255,255,.4)';ctx.font='10px sans-serif';ctx.textAlign='left';
ctx.fillText(tmpl.name+' | Par '+tmpl.par+' | '+tmpl.distance+'yd',10,20);

var infoEl=document.getElementById('v9-course-info');
if(infoEl){
  var ih='<h3 style="color:#00FF88">'+tmpl.name+' (Par '+tmpl.par+', '+tmpl.distance+'yd)</h3>';
  ih+='<p style="margin-top:8px;line-height:1.7">'+tmpl.strategy+'</p>';
  ih+='<div style="margin-top:12px;display:flex;gap:12px;flex-wrap:wrap">';
  var hasWater=tmpl.features.some(function(f2){return f2.type==='water'});
  var hasBunker=tmpl.features.some(function(f2){return f2.type==='bunker'});
  if(hasWater)ih+='<span class="v9-badge v9-badge-d">💧 워터 해저드</span>';
  if(hasBunker)ih+='<span class="v9-badge v9-badge-c">🏖️ 벙커</span>';
  ih+='<span class="v9-badge v9-badge-b">'+tmpl.distance+'yd</span>';
  ih+='</div>';
  infoEl.innerHTML=ih;
}
};

// ===== 5. CLUB DISTANCE CALIBRATION WIZARD =====
var CALIB_CLUBS=['Driver','3W','5W','4H','5I','6I','7I','8I','9I','PW','GW','SW','LW'];
var CALIB_DEFAULTS=[230,210,195,185,170,160,150,140,130,120,100,80,60];

function showCalibration(){
var pn=getPanel('calibration');
var calibData=lsGet('club_calibration',null);
var html='<div class="v9-title">📏 클럽 거리 캘리브레이션</div>';

html+='<div class="v9-card"><h3>나의 클럽 거리 입력</h3>';
html+='<p style="margin-bottom:12px">각 클럽의 평균 캐리 거리를 입력하면 갤 분석 차트를 생성합니다.</p>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">';
for(var ci3=0;ci3<CALIB_CLUBS.length;ci3++){
  var defVal=calibData?calibData[ci3]:CALIB_DEFAULTS[ci3];
  html+='<div style="display:flex;align-items:center;gap:6px">';
  html+='<span style="width:50px;font-size:.8em;color:#00FF88;font-weight:600">'+CALIB_CLUBS[ci3]+'</span>';
  html+='<input id="v9-cal-'+ci3+'" class="v9-input" type="number" min="20" max="350" value="'+defVal+'" style="flex:1">';
  html+='<span style="font-size:.7em;color:#888">yd</span>';
  html+='</div>';
}
html+='</div>';
html+='<button class="v9-btn v9-btn-primary" style="width:100%;margin-top:12px" onclick="window._v9SaveCalibration()">저장 &amp; 분석</button></div>';

html+='<canvas id="v9-cal-canvas" width="500" height="300" style="width:100%;height:auto;display:none;border-radius:12px;margin-top:12px"></canvas>';
html+='<div id="v9-cal-result"></div>';

html+='<div class="v9-card"><h3>💡 갤 분석 가이드</h3>';
html+='<table class="v9-table"><tr><th>갤 간격</th><th>평가</th><th>설명</th></tr>';
html+='<tr><td style="color:#00FF88">10-15yd</td><td>⭐ 이상적</td><td style="color:#aaa;font-size:.8em">정확한 거리 컨트롤</td></tr>';
html+='<tr><td style="color:#FFC107">15-20yd</td><td>✅ 보통</td><td style="color:#aaa;font-size:.8em">대부분의 아마추어</td></tr>';
html+='<tr><td style="color:#ff6b6b">20yd+</td><td>⚠︎ 넓음</td><td style="color:#aaa;font-size:.8em">클럽 추가 검토</td></tr>';
html+='</table></div>';

pn.innerHTML='<button class="v9-close" onclick="window._v9Close(\'calibration\')">&times;</button>'+html;
openPanel('calibration');playSfx('calibration');
if(calibData){setTimeout(function(){renderCalibCanvas(calibData)},100)}
v9CheckAchievements();
}

window._v9SaveCalibration=function(){
var dists=[];
for(var i=0;i<CALIB_CLUBS.length;i++){
  dists.push(parseInt(document.getElementById('v9-cal-'+i).value)||CALIB_DEFAULTS[i]);
}
lsSet('club_calibration',dists);

try{var v7Dists={};for(var j=0;j<CALIB_CLUBS.length;j++)v7Dists[CALIB_CLUBS[j]]=dists[j];localStorage.setItem('gt_v7_club_distances',JSON.stringify(v7Dists))}catch(e){}

renderCalibCanvas(dists);

var gaps=[];var gapIssues=[];
for(var g=0;g<dists.length-1;g++){
  var gap=dists[g]-dists[g+1];gaps.push(gap);
  if(gap>20)gapIssues.push({from:CALIB_CLUBS[g+1],to:CALIB_CLUBS[g],gap:gap});
  if(gap<5)gapIssues.push({from:CALIB_CLUBS[g+1],to:CALIB_CLUBS[g],gap:gap,tooClose:true});
}
var avgGap=gaps.length>0?Math.round(gaps.reduce(function(a,b){return a+b},0)/gaps.length):0;

var rhtml='<div class="v9-card"><h3>📊 갤 분석 결과</h3>';
rhtml+='<div style="text-align:center;margin:12px 0"><div style="font-size:2em;font-weight:800;color:#00B4D8">'+avgGap+'yd</div><div style="color:#888;font-size:.85em">평균 갤 간격</div></div>';

if(gapIssues.length>0){
  rhtml+='<div style="margin-top:12px">';
  for(var gi=0;gi<gapIssues.length;gi++){
    var issue=gapIssues[gi];
    if(issue.tooClose){
      rhtml+='<div style="padding:6px 0;color:#FFC107;font-size:.85em">⚠︎ '+issue.from+' &harr; '+issue.to+': '+issue.gap+'yd 간격 너무 좁음</div>';
    }else{
      rhtml+='<div style="padding:6px 0;color:#ff6b6b;font-size:.85em">⚠︎ '+issue.from+' &harr; '+issue.to+': '+issue.gap+'yd 갤 발견</div>';
    }
  }
  rhtml+='</div>';
}
rhtml+='</div>';
var resEl=document.getElementById('v9-cal-result');if(resEl)resEl.innerHTML=rhtml;

showToast('클럽 거리 저장 완료!');playSfx('calibration');v9CheckAchievements();
};

function renderCalibCanvas(dists){
var canvas=document.getElementById('v9-cal-canvas');if(!canvas)return;
canvas.style.display='block';
var ctx=canvas.getContext('2d');var W=500,H=300;
ctx.clearRect(0,0,W,H);ctx.fillStyle='rgba(0,20,40,.4)';ctx.fillRect(0,0,W,H);

var maxDist=Math.max.apply(null,dists)+20;
ctx.strokeStyle='rgba(255,255,255,.06)';
for(var gy4=0;gy4<H;gy4+=30){ctx.beginPath();ctx.moveTo(50,gy4);ctx.lineTo(W-10,gy4);ctx.stroke()}

var barW=Math.max(16,(W-80)/dists.length-4);
for(var bi=0;bi<dists.length;bi++){
  var bx=60+bi*(barW+4);
  var bh=dists[bi]/maxDist*(H-60);
  var hue=120-bi*9;
  ctx.fillStyle='hsl('+hue+',70%,50%)';
  ctx.beginPath();
  var r2=Math.min(4,barW/2);
  ctx.moveTo(bx,H-30);ctx.lineTo(bx,H-30-bh+r2);ctx.quadraticCurveTo(bx,H-30-bh,bx+r2,H-30-bh);
  ctx.lineTo(bx+barW-r2,H-30-bh);ctx.quadraticCurveTo(bx+barW,H-30-bh,bx+barW,H-30-bh+r2);
  ctx.lineTo(bx+barW,H-30);ctx.fill();

  ctx.fillStyle='#fff';ctx.font='bold 9px sans-serif';ctx.textAlign='center';
  ctx.fillText(dists[bi]+'',bx+barW/2,H-30-bh-6);
  ctx.fillStyle='rgba(255,255,255,.5)';ctx.font='7px sans-serif';
  ctx.save();ctx.translate(bx+barW/2,H-18);ctx.rotate(-0.5);ctx.fillText(CALIB_CLUBS[bi],0,0);ctx.restore();

  if(bi>0){
    var gap2=dists[bi-1]-dists[bi];
    var gapColor=gap2>20?'rgba(255,107,107,.7)':gap2<5?'rgba(255,193,7,.7)':'rgba(0,255,136,.5)';
    ctx.fillStyle=gapColor;ctx.font='7px sans-serif';ctx.textAlign='center';
    ctx.fillText(gap2+'yd',bx-2,H-30-Math.max(bh,dists[bi-1]/maxDist*(H-60))-18);
  }
}
}

// ===== 6. GOLF FITNESS TRAINER =====
var FITNESS_EXERCISES=[
{name:'힘 회전',icon:'🔄',duration:'30초',muscles:'코어,허리',steps:['발 어깨 너비로 벌리고 서기','클럽 잡은 자세로 웅체 회전','좌우 각 15회 반복','발이 움직이지 않도록 주의']},
{name:'골반 스쿼트',icon:'🏋️',duration:'45초',muscles:'하체,코어',steps:['발 어깨 너비, 발끋 살짝 바깥','앱글과 무릎을 동시에 굽히기','무릎이 발끋을 넘지 않게','15회 x 3세트']},
{name:'플랭크',icon:'💪',duration:'30초',muscles:'코어,어깨',steps:['팔꿈치 자세에서 몸을 일직선으로','복부에 힘을 주고 30초 버티기','엉덩이가 빠지지 않게','3세트 반복']},
{name:'어깨 스트레칭',icon:'🧘',duration:'40초',muscles:'어깨,팔',steps:['오른팔을 머리 위로 올리고 등 뒤로','왼손으로 오른 팔꿈치를 잡아 당기기','20초 유지 후 반대쪽','각 3회 반복']},
{name:'고관절 열기',icon:'🦾',duration:'45초',muscles:'고관절,허리',steps:['바닥에 앉아 발바닥을 붙이기','무릎을 양쪽으로 벌리고 압력','쟐발을 반대쪽 무릎 위에 올려 회전','각 20초 x 좌우 3회']},
{name:'손목 강화',icon:'✋',duration:'30초',muscles:'전완,손목',steps:['손을 칠 펴고 5초 유지','손을 활짝 펴고 5초 유지','손목 좌우로 회전 각 10회','그립 강화용 고무공 쥐기 20회']},
{name:'햇스트링 스트레칭',icon:'🦵',duration:'40초',muscles:'햇스트링,허리',steps:['한 발을 앞으로 크게 내딩고','뒤쪽 다리의 햇스트링이 당기도록','엉덩이를 앞으로 밀기','각 20초 x 좌우 3회']},
{name:'코어 데드버그',icon:'🐛',duration:'45초',muscles:'코어,등',steps:['바닥에 등을 대고 무릎을 세우고 누워','발보다 무릎을 높게 올리고','팔다리를 넘겨 반대쪽으로 빠기','10회 x 3세트']}
];

function showFitness(){
var pn=getPanel('fitness');
var fitLog=lsGet('fitness_log',[]);
var html='<div class="v9-title">🏋️ 골프 피트니스</div>';

html+='<div class="v9-card"><h3>골프 전용 운동</h3>';
html+='<p>스윗 파워와 유연성을 높이는 8종 골프 피트니스 프로그램.</p></div>';

for(var ei=0;ei<FITNESS_EXERCISES.length;ei++){
  var ex=FITNESS_EXERCISES[ei];
  var done=fitLog.some(function(l){return l.exercise===ei&&l.date===todayStr()});
  html+='<div class="v9-card" style="'+(done?'border-left:3px solid #00FF88;opacity:.7':'')+'">';
  html+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">';
  html+='<div style="display:flex;align-items:center;gap:10px"><span style="font-size:1.5em">'+ex.icon+'</span><div><div style="font-weight:700">'+ex.name+'</div><div style="font-size:.7em;color:#888">'+ex.muscles+' | '+ex.duration+'</div></div></div>';
  if(done)html+='<span class="v9-badge v9-badge-a">✅ 완료</span>';
  else html+='<button class="v9-btn v9-btn-primary" onclick="window._v9CompleteFitness('+ei+')">완료</button>';
  html+='</div>';
  html+='<ol style="margin:0 0 0 16px;color:#aaa;font-size:.82em;line-height:1.7">';
  for(var si4=0;si4<ex.steps.length;si4++){html+='<li>'+ex.steps[si4]+'</li>'}
  html+='</ol></div>';
}

var todayCount=fitLog.filter(function(l){return l.date===todayStr()}).length;
html+='<div class="v9-card" style="text-align:center"><div style="font-size:2em;font-weight:800;color:#00FF88">'+todayCount+'/'+FITNESS_EXERCISES.length+'</div><div style="color:#888;font-size:.85em">오늘 완료한 운동</div></div>';

pn.innerHTML='<button class="v9-close" onclick="window._v9Close(\'fitness\')">&times;</button>'+html;
openPanel('fitness');playSfx('fitness');v9CheckAchievements();
}

window._v9CompleteFitness=function(idx){
var log=lsGet('fitness_log',[]);
log.push({date:todayStr(),exercise:idx});
if(log.length>200)log=log.slice(-200);
lsSet('fitness_log',log);
showToast('🏋️ '+FITNESS_EXERCISES[idx].name+' 완료!');playSfx('fitness');showFitness();
};

// ===== 7. ROUND JOURNAL =====
var MOOD_ICONS=['😊','😎','🤔','😒','😠'];
var MOOD_LABELS=['좋음','최고','보통','불만','시련'];

function showJournal(){
var pn=getPanel('journal');
var entries=lsGet('journal_entries',[]);
var html='<div class="v9-title">📓 라운드 일지</div>';

html+='<div class="v9-card"><h3>➕ 새 일지 작성</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">';
html+='<div><label class="v9-label">날짜</label><input id="v9-jn-date" class="v9-input" type="date" value="'+todayStr()+'"></div>';
html+='<div><label class="v9-label">코스</label><input id="v9-jn-course" class="v9-input" type="text" placeholder="골프장" maxlength="30"></div>';
html+='<div><label class="v9-label">스코어</label><input id="v9-jn-score" class="v9-input" type="number" min="60" max="150" value="90"></div>';
html+='<div><label class="v9-label">컨디션</label><select id="v9-jn-cond" class="v9-input"><option value="great">최상</option><option value="good" selected>좋음</option><option value="normal">보통</option><option value="bad">나쁨</option></select></div>';
html+='</div>';
html+='<div style="margin-top:8px"><label class="v9-label">기분</label>';
html+='<div style="display:flex;gap:8px" id="v9-jn-mood">';
for(var mi=0;mi<MOOD_ICONS.length;mi++){
  html+='<button class="v9-btn '+(mi===0?'active':'')+'" data-mood="'+mi+'" onclick="window._v9SelectMood('+mi+')" style="font-size:1.3em;padding:8px 12px">'+MOOD_ICONS[mi]+'</button>';
}
html+='</div></div>';
html+='<div style="margin-top:8px"><label class="v9-label">메모</label>';
html+='<textarea id="v9-jn-memo" class="v9-input" rows="3" placeholder="오늘 라운드에서 배운 점, 개선할 점..." style="resize:none"></textarea></div>';
html+='<button class="v9-btn v9-btn-primary" style="width:100%;margin-top:12px" onclick="window._v9SaveJournal()">일지 저장</button></div>';

if(entries.length>0){
  html+='<div class="v9-card"><h3>📅 일지 목록 ('+entries.length+'건)</h3>';
  for(var ji=entries.length-1;ji>=Math.max(0,entries.length-10);ji--){
    var en=entries[ji];
    html+='<div style="padding:10px;margin-bottom:8px;background:rgba(0,180,216,.04);border-radius:8px;border-left:3px solid rgba(0,180,216,.3)">';
    html+='<div style="display:flex;justify-content:space-between;align-items:center">';
    html+='<div><span style="font-size:1.2em">'+MOOD_ICONS[en.mood||0]+'</span> <span style="font-weight:700;color:#00FF88">'+(en.course||'')+'</span> <span style="color:#888;font-size:.8em">'+en.date+'</span></div>';
    html+='<div style="font-weight:700;font-size:1.1em">'+en.score+'</div>';
    html+='</div>';
    if(en.memo)html+='<div style="margin-top:6px;color:#aaa;font-size:.82em;line-height:1.5">'+en.memo.replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</div>';
    html+='</div>';
  }
  html+='</div>';
}

pn.innerHTML='<button class="v9-close" onclick="window._v9Close(\'journal\')">&times;</button>'+html;
openPanel('journal');playSfx('journal');v9CheckAchievements();
}

var _v9SelectedMood=0;
window._v9SelectMood=function(idx){
_v9SelectedMood=idx;
var btns=document.querySelectorAll('#v9-jn-mood .v9-btn');
for(var b2=0;b2<btns.length;b2++)btns[b2].classList.toggle('active',parseInt(btns[b2].getAttribute('data-mood'))===idx);
};

window._v9SaveJournal=function(){
var entries=lsGet('journal_entries',[]);
entries.push({
  date:document.getElementById('v9-jn-date').value||todayStr(),
  course:document.getElementById('v9-jn-course').value.trim()||'',
  score:parseInt(document.getElementById('v9-jn-score').value)||90,
  condition:document.getElementById('v9-jn-cond').value,
  mood:_v9SelectedMood,
  memo:document.getElementById('v9-jn-memo').value.trim().substring(0,500)
});
if(entries.length>100)entries=entries.slice(-100);
lsSet('journal_entries',entries);
showToast('📓 일지 저장 완료!');playSfx('journal');showJournal();
};

// ===== 8. GOLF RULEBOOK =====
var RULEBOOK=[
{rule:'Rule 1',title:'고의 귀칙',content:'골프는 정직의 스포츠입니다. 모든 플레이어는 경기의 정신에 따라 행동해야 합니다.',penalty:'실격에 따라 경고 ~ 실격'},
{rule:'Rule 4',title:'장비 규정',content:'최대 14개 클럽. 라운드 중 파손된 클럽은 교체할 수 있으나 다른 플레이어에게서 클럽을 빌릴 수 없습니다.',penalty:'홀당 2벌타 (최대 4벌타)'},
{rule:'Rule 6',title:'볼 플레이',content:'핀니시된 볼을 그대로 플레이합니다. 바닥에 박힌 볼, 움직이는 볼을 볼 그대로 플레이합니다.',penalty:'위반 시 1벌타'},
{rule:'Rule 10',title:'스트로크 준비와 실행',content:'볼을 치기 전에 조언은 캐디에게만 받을 수 있습니다. 바람, 비, 테스트 스잉은 금지.',penalty:'2벌타 / 실격'},
{rule:'Rule 11',title:'움직이는 볼',content:'움직이는 볼을 방해하면 벌타. 바람/물에 의해 움직인 경우는 무벌.',penalty:'의도적 방해: 2벌타'},
{rule:'Rule 13',title:'퍼팅 그린',content:'그린에서는 피거나 방향을 가르키는 행위는 제한됩니다. 피슠은 반드시 빼야 합니다 (선택적 피슠 삽입).',penalty:'2벌타'},
{rule:'Rule 14',title:'볼 플레이 방법',content:'클럽을 지면에 붙인 채 미는 것, 볼을 밀거나 찍거나 텀어올리는 것은 금지.',penalty:'2벌타'},
{rule:'Rule 16',title:'비정상 코스 상태 구제',content:'카트 괸, 동물 구몍, 수리 자국 등에서 무벌 구제 가능.',penalty:'무벌'},
{rule:'Rule 17',title:'페널티 구역',content:'볼이 빨간 페널티 구역에 있으면 1벌타 구제. 빨간 페널티 에어리아에서 드롭.',penalty:'1벌타 + 드롭'},
{rule:'Rule 18',title:'OB / 분실구',content:'OB: 하얀 말뚝을 넘으면 1벌타+원래위치 재타. 분실구: 3분 내 못 찾으면 분실.',penalty:'1벌타 + 거리와 벌타'},
{rule:'Rule 19',title:'언플레이어블 볼',content:'볼이 페널티 구역, OB, 물에 있을 때는 아닌 볼을 그대로 치는 것은 당연 무벌.',penalty:'무벌 구제 가능'},
{rule:'Rule 25',title:'비정상적 코스 상태',content:'수리 중인 그라운드(GUR), 임시 물웅덩이, 발자국 체임 등에서는 무벌 구제 가능.',penalty:'무벌 드롭'}
];

function showRulebook(){
var pn=getPanel('rulebook');
var html='<div class="v9-title">📖 골프 룰북</div>';

html+='<div class="v9-card"><h3>주요 골프 규칙 12조항</h3>';
html+='<p>R&amp;A / USGA 골프 규칙 핵심 요약. 라운드 중 빠른 참고용.</p></div>';

for(var rbi=0;rbi<RULEBOOK.length;rbi++){
  var rb=RULEBOOK[rbi];
  html+='<div class="v9-card">';
  html+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">';
  html+='<h3 style="color:#00B4D8">'+rb.rule+': '+rb.title+'</h3>';
  html+='<span class="v9-badge '+(rb.penalty.indexOf('무벌')!==-1?'v9-badge-a':'v9-badge-d')+'">'+rb.penalty+'</span>';
  html+='</div>';
  html+='<p style="line-height:1.7">'+rb.content+'</p>';
  html+='</div>';
}

html+='<div class="v9-card"><h3>💡 벌타 빠른 참고</h3>';
html+='<table class="v9-table"><tr><th>상황</th><th>벌타</th><th>처리</th></tr>';
html+='<tr><td>OB</td><td style="color:#ff6b6b">1벌타</td><td style="color:#aaa;font-size:.8em">원래위치에서 재타</td></tr>';
html+='<tr><td>워터 해저드</td><td style="color:#ff6b6b">1벌타</td><td style="color:#aaa;font-size:.8em">드롭 지점에서</td></tr>';
html+='<tr><td>벙커 언플레이어블</td><td style="color:#ff6b6b">1벌타</td><td style="color:#aaa;font-size:.8em">드롭 지점에서</td></tr>';
html+='<tr><td>분실구</td><td style="color:#ff6b6b">1벌타</td><td style="color:#aaa;font-size:.8em">원래위치에서 재타</td></tr>';
html+='<tr><td>GUR</td><td style="color:#00FF88">무벌</td><td style="color:#aaa;font-size:.8em">가장 가까운 구제 지점</td></tr>';
html+='<tr><td>카트 괸</td><td style="color:#00FF88">무벌</td><td style="color:#aaa;font-size:.8em">1클럽 이내 구제</td></tr>';
html+='</table></div>';

pn.innerHTML='<button class="v9-close" onclick="window._v9Close(\'rulebook\')">&times;</button>'+html;
openPanel('rulebook');playSfx('rulebook');lsSet('ach_rulebook_viewed',true);v9CheckAchievements();
}

// ===== 9. EXTRA QUIZ (+15 = 30 total) =====
var V9_QUIZ=[
{q:'골프에서 &quot;콘도르&quot;란 무엇인가?',o:['Par 대비 4타 적음','홀인원','연속 버디','알바트로스 다음 등급'],a:0,explain:'콘도르는 파 대비 4타 적은 것으로 공식 기록은 없습니다.'},
{q:'그린의 빠르기를 나타내는 단위는?',o:['MPH','Stimpmeter','FIR','GIR'],a:1,explain:'스팀프미터 값으로 그린 스피드를 측정합니다. PGA Tour 평균 11~12피트.'},
{q:'드로와 페이드의 차이는?',o:['볼 높이','볼의 회전 방향','클럽 종류','스윤 속도'],a:1,explain:'드로는 우에서 좌로, 페이드는 좌에서 우로 회전하는 구질입니다.'},
{q:'PGA Tour에서 평균 드라이버 비거리는?',o:['250yd','270yd','295yd','320yd'],a:2,explain:'2024년 기준 PGA Tour 평균 드라이버 거리는 약 295야드입니다.'},
{q:'바운스 각도가 높은 웨지는 어떤 샷에 유리한가?',o:['벙커 샷','퍼팅','티샷','칩샷'],a:0,explain:'높은 바운스(12~16도)는 모래를 파고 올라가는 벙커 샷에 효과적입니다.'},
{q:'MOI(Moment of Inertia)가 높은 클럽의 특징은?',o:['비거리 증가','스핀 증가','관용성 증가','경량화'],a:2,explain:'MOI가 높으면 빗맞아도 헤드가 덮 틀어져 방향이 덮 변합니다.'},
{q:'골프에서 &quot;레이업&quot;이란?',o:['공이 날아간 거리','그린 앞에 공을 놓는 것','서브 플레이어','평행 보행'],a:1,explain:'레이업은 그린을 직접 노리지 않고 앞에 공을 놓는 전략입니다.'},
{q:'PGA Tour 평균 GIR(Green in Regulation) 비율은?',o:['50%','55%','65%','75%'],a:2,explain:'PGA Tour 평균 GIR 비율은 약 65%입니다.'},
{q:'드라이버의 이상적인 스핀률(RPM)은?',o:['1,000 이하','2,000~2,800','3,500~4,500','5,000+'],a:1,explain:'드라이버 기준 2,000~2,800 RPM이 최적 백스핀입니다.'},
{q:'골프에서 &quot;프리샷 루틴&quot;이 중요한 이유는?',o:['비거리 증가','일관성과 집중력','스윤 속도 증가','체력 절약'],a:1,explain:'프리샷 루틴은 슬훈의 일관성과 심리적 안정을 제공합니다.'},
{q:'골프공의 딘플 수가 비거리에 미치는 영향은?',o:['영향 없음','공기저항 감소','스핀 증가','딙빠 회전'],a:1,explain:'딘플은 공기 저항을 줄여 볼이 더 멀리 날아가게 합니다.'},
{q:'골프 클럽 피팅에서 &quot;플렉스&quot;란?',o:['클럽 무게','샤프트 휠어지는 정도','그립 크기','헤드 재질'],a:1,explain:'플렉스는 샤프트의 휠어지는 정도로 스윤 속도에 맞춰 선택합니다.'},
{q:'18홀 라운드에서 보기프리 골프란?',o:['모든 홀 버디','모든 홀 파','모든 홀 보기 이하','홀인원 포함'],a:2,explain:'보기프리 골프는 18홀 전부 보기 이하로 플레이하는 것입니다.'},
{q:'Strokes Gained 분석에서 가장 중요한 영역은?',o:['티샷','어프로치','쇼트게임','퍼팅'],a:1,explain:'통계적으로 어프로치 영역이 스코어에 가장 큰 영향을 미칩니다.'},
{q:'골프 코스 레이팅이란?',o:['코스 가격','스크래치 골퍼 예상 타수','경사도','코스 난이도 등급'],a:1,explain:'코스 레이팅은 스크래치 골퍼의 예상 타수입니다(보통 68~76).'}
];

function showV9Quiz(){
var pn=getPanel('v9quiz');
var qs=lsGet('v9quiz_state',{current:0,correct:0,answered:[]});
var html='<div class="v9-title">📝 골프 심화 퀴즈 v2</div>';

if(qs.answered.length>=V9_QUIZ.length){
  var grade=qs.correct>=14?'S':qs.correct>=12?'A':qs.correct>=10?'B':qs.correct>=7?'C':'D';
  var gcolor=grade==='S'?'#00FF88':grade==='A'?'#00B4D8':grade==='B'?'#FFC107':'#ff6b6b';
  html+='<div class="v9-card" style="text-align:center"><div style="font-size:3em;margin-bottom:8px">🏆</div>';
  html+='<h3>퀴즈 완료!</h3>';
  html+='<div style="font-size:2.5em;font-weight:800;color:'+gcolor+';margin:12px 0">'+grade+'</div>';
  html+='<div style="color:#aaa">'+qs.correct+' / '+V9_QUIZ.length+' 정답</div>';
  html+='<button class="v9-btn v9-btn-primary" style="margin-top:16px" onclick="window._v9ResetV9Quiz()">다시 도전</button></div>';
} else {
  var qi=qs.current;var q=V9_QUIZ[qi];
  html+='<div style="text-align:center;margin-bottom:12px;color:#888;font-size:.85em">문제 '+(qi+1)+' / '+V9_QUIZ.length+' &middot; 정답 '+qs.correct+'개</div>';
  html+='<div style="display:flex;gap:4px;margin-bottom:16px">';
  for(var pi4=0;pi4<V9_QUIZ.length;pi4++){
    var pc=pi4<qs.answered.length?(qs.answered[pi4]?'#00FF88':'#ff6b6b'):(pi4===qi?'#00B4D8':'rgba(255,255,255,.1)');
    html+='<div style="flex:1;height:4px;background:'+pc+';border-radius:2px"></div>';
  }html+='</div>';
  html+='<div class="v9-card"><h3 style="line-height:1.5">'+q.q+'</h3></div>';
  for(var oi2=0;oi2<q.o.length;oi2++){
    html+='<button class="v9-btn" style="width:100%;text-align:left;padding:14px 16px;margin-bottom:8px" onclick="window._v9AnswerV9Quiz('+oi2+')">';
    html+='<span style="color:#00B4D8;font-weight:700;margin-right:8px">'+String.fromCharCode(65+oi2)+'.</span> '+q.o[oi2]+'</button>';
  }
}
pn.innerHTML='<button class="v9-close" onclick="window._v9Close(\'v9quiz\')">&times;</button>'+html;
openPanel('v9quiz');
}

window._v9AnswerV9Quiz=function(idx){
var qs=lsGet('v9quiz_state',{current:0,correct:0,answered:[]});
var q=V9_QUIZ[qs.current];var ok=idx===q.a;
qs.answered.push(ok);if(ok){qs.correct++;playSfx('v9_quiz_correct');showToast('✅ 정답!')}
else{playSfx('rulebook');showToast('❌ '+q.explain)}
qs.current++;lsSet('v9quiz_state',qs);
setTimeout(function(){showV9Quiz()},800);v9CheckAchievements();
};
window._v9ResetV9Quiz=function(){lsSet('v9quiz_state',{current:0,correct:0,answered:[]});showV9Quiz()};

// ===== ACHIEVEMENTS (+12) =====
var V9_ACHIEVEMENTS=[
{id:'v9_first_scorecard',name:'첫 스코어카드',desc:'18홀 라운드 1회 완료',icon:'🏁',check:function(){return lsGet('scorecard_rounds',[]).length>=1}},
{id:'v9_5_rounds',name:'라운드 콜렉터',desc:'5회 라운드 완료',icon:'🏌️',check:function(){return lsGet('scorecard_rounds',[]).length>=5}},
{id:'v9_sg_analyzer',name:'SG 분석가',desc:'Strokes Gained 첫 분석',icon:'📊',check:function(){return lsGet('sg_data',{records:[]}).records.length>=1}},
{id:'v9_putt_50',name:'퍼팅 마스터',desc:'퍼팅 50회 기록',icon:'🎯',check:function(){return lsGet('putt_data',[]).length>=50}},
{id:'v9_course_viewer',name:'전략가',desc:'코스 전략 시뮬레이터 조회',icon:'🏌️',check:function(){return lsGet('ach_course_viewed',false)}},
{id:'v9_calibrated',name:'캘리브레이션 완료',desc:'클럽 거리 캘리브레이션',icon:'📏',check:function(){return lsGet('club_calibration',null)!==null}},
{id:'v9_fitness_4',name:'피트니스 팔반',desc:'하루 4개 운동 완료',icon:'🏋️',check:function(){var log=lsGet('fitness_log',[]);var today=todayStr();return log.filter(function(l){return l.date===today}).length>=4}},
{id:'v9_journal_writer',name:'일지 작성자',desc:'라운드 일지 5건 작성',icon:'📓',check:function(){return lsGet('journal_entries',[]).length>=5}},
{id:'v9_rulebook_reader',name:'룰 마스터',desc:'골프 룰북 조회',icon:'📖',check:function(){return lsGet('ach_rulebook_viewed',false)}},
{id:'v9_quiz_v2_perfect',name:'퀴즈 v2 만점',desc:'심화 퀴즈 15문제 전부 정답',icon:'📝',check:function(){var qs=lsGet('v9quiz_state',{});return qs.correct>=15&&(qs.answered||[]).length>=15}},
{id:'v9_putt_3ft_90',name:'3피트 달인',desc:'3ft 이하 퍼팅 성공률 90%+',icon:'⭐',check:function(){var data=lsGet('putt_data',[]).filter(function(p){return p.dist<=3});if(data.length<10)return false;return data.filter(function(p){return p.result==='made'}).length/data.length>=0.9}},
{id:'v9_all_features',name:'v9 탐험가',desc:'v9 전체 기능 탐색',icon:'🌍',check:function(){return lsGet('scorecard_rounds',[]).length>=1&&lsGet('sg_data',{records:[]}).records.length>=1&&lsGet('putt_data',[]).length>=1&&lsGet('club_calibration',null)!==null&&lsGet('journal_entries',[]).length>=1&&lsGet('ach_rulebook_viewed',false)&&lsGet('ach_course_viewed',false)}}
];

function v9CheckAchievements(){
var unlocked=lsGet('v9_achievements',[]);
for(var i=0;i<V9_ACHIEVEMENTS.length;i++){
  var ach=V9_ACHIEVEMENTS[i];
  if(unlocked.indexOf(ach.id)===-1&&ach.check()){
    unlocked.push(ach.id);lsSet('v9_achievements',unlocked);
    showV9AchPopup(ach);playSfx('v9_achieve');
  }
}
}

function showV9AchPopup(ach){
var popup=document.createElement('div');popup.className='v9-ach-popup';
popup.innerHTML='<div style="font-size:2em">'+ach.icon+'</div><div><div style="font-size:.65em;color:#00FF88;font-weight:700;letter-spacing:2px">ACHIEVEMENT</div><div style="font-weight:700">'+ach.name+'</div><div style="font-size:.8em;color:#888;margin-top:2px">'+ach.desc+'</div></div>';
document.body.appendChild(popup);
setTimeout(function(){popup.classList.add('show')},50);
setTimeout(function(){popup.classList.remove('show');setTimeout(function(){popup.remove()},500)},3500);
}

// ===== QUICK ACTIONS & KEYBOARD =====
function injectV9QuickActions(){
var existing=document.querySelector('.v9-quick-actions');if(existing)return;
var container=document.createElement('div');container.className='v9-quick-actions';
var buttons=[
  {icon:'📋',title:'스코어카드 (Shift+1)',fn:'showScorecard'},
  {icon:'📊',title:'SG 분석 (Shift+2)',fn:'showStrokesGained'},
  {icon:'🎯',title:'퍼팅 (Shift+3)',fn:'showPuttingAnalyzer'},
  {icon:'🏌️',title:'코스전략 (Shift+4)',fn:'showCourseSim'},
  {icon:'📏',title:'캘리브레이션 (Shift+5)',fn:'showCalibration'},
  {icon:'🏋️',title:'피트니스 (Shift+6)',fn:'showFitness'},
  {icon:'📓',title:'일지 (Shift+7)',fn:'showJournal'},
  {icon:'📖',title:'룰북 (Shift+8)',fn:'showRulebook'}
];
for(var i=0;i<buttons.length;i++){
  var btn=document.createElement('button');btn.className='v9-quick-btn';btn.innerHTML=buttons[i].icon;btn.title=buttons[i].title;
  btn.setAttribute('data-fn',buttons[i].fn);
  btn.addEventListener('click',function(){var fn=this.getAttribute('data-fn');if(window['_v9_'+fn])window['_v9_'+fn]()});
  container.appendChild(btn);
}
document.body.appendChild(container);
}

window._v9_showScorecard=showScorecard;
window._v9_showStrokesGained=showStrokesGained;
window._v9_showPuttingAnalyzer=showPuttingAnalyzer;
window._v9_showCourseSim=function(){lsSet('ach_course_viewed',true);showCourseSim()};
window._v9_showCalibration=showCalibration;
window._v9_showFitness=showFitness;
window._v9_showJournal=showJournal;
window._v9_showRulebook=showRulebook;
window._v9_showV9Quiz=showV9Quiz;
window._v9Close=function(id){closePanel(id)};

function setupV9Keyboard(){
document.addEventListener('keydown',function(e){
  if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'||e.target.tagName==='SELECT')return;
  if(e.ctrlKey||e.metaKey||e.altKey)return;
  if(!e.shiftKey)return;
  switch(e.key){
    case'!':e.preventDefault();showScorecard();break;
    case'@':e.preventDefault();showStrokesGained();break;
    case'#':e.preventDefault();showPuttingAnalyzer();break;
    case'$':e.preventDefault();lsSet('ach_course_viewed',true);showCourseSim();break;
    case'%':e.preventDefault();showCalibration();break;
    case'^':e.preventDefault();showFitness();break;
    case'&':e.preventDefault();showJournal();break;
    case'*':e.preventDefault();showRulebook();break;
  }
});
}

// ===== CSS =====
function injectV9CSS(){
var s=document.createElement('style');
s.textContent='.v9-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.88);z-index:10002;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;pointer-events:none}.v9-overlay.active{opacity:1;pointer-events:auto}.v9-panel{background:linear-gradient(145deg,rgba(10,16,26,.98),rgba(5,8,16,.98));border:1px solid rgba(0,180,216,.2);border-radius:18px;padding:24px;max-width:640px;width:94%;max-height:85vh;overflow-y:auto;box-shadow:0 24px 80px rgba(0,0,0,.7),0 0 40px rgba(0,180,216,.06);position:relative}.v9-panel::-webkit-scrollbar{width:5px}.v9-panel::-webkit-scrollbar-thumb{background:rgba(0,180,216,.2);border-radius:3px}.v9-title{font-size:1.4em;font-weight:800;color:#00B4D8;margin-bottom:18px;letter-spacing:-0.5px}.v9-close{position:absolute;top:12px;right:16px;background:none;border:none;color:#666;font-size:1.6em;cursor:pointer;padding:4px 8px;border-radius:8px;transition:all .2s;z-index:1}.v9-close:hover{color:#ff6b6b;background:rgba(255,107,107,.1)}.v9-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:16px;margin-bottom:12px;transition:all .2s}.v9-card:hover{border-color:rgba(0,180,216,.2);background:rgba(255,255,255,.05)}.v9-card h3{color:#00B4D8;font-size:.95em;margin:0 0 8px}.v9-card p{color:#aaa;font-size:.85em;margin:0;line-height:1.6}.v9-badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:.75em;font-weight:600}.v9-badge-a{background:rgba(0,255,136,.12);color:#00FF88}.v9-badge-b{background:rgba(0,180,216,.12);color:#00B4D8}.v9-badge-c{background:rgba(255,193,7,.12);color:#FFC107}.v9-badge-d{background:rgba(255,107,107,.12);color:#ff6b6b}.v9-btn{padding:8px 16px;border:1px solid rgba(0,180,216,.25);background:rgba(0,180,216,.08);color:#00B4D8;border-radius:8px;cursor:pointer;font-size:.85em;transition:all .2s}.v9-btn:hover{background:rgba(0,180,216,.18);border-color:#00B4D8}.v9-btn.active{background:rgba(0,255,136,.12);border-color:rgba(0,255,136,.3);color:#00FF88}.v9-btn-primary{background:rgba(0,255,136,.12);border-color:rgba(0,255,136,.3);color:#00FF88}.v9-btn-primary:hover{background:rgba(0,255,136,.22)}.v9-input{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:8px 12px;color:#fff;font-size:.85em;width:100%;box-sizing:border-box}.v9-input:focus{outline:none;border-color:rgba(0,180,216,.5)}.v9-label{display:block;font-size:.72em;color:#888;margin-bottom:3px}.v9-table{width:100%;border-collapse:collapse;font-size:.82em}.v9-table th{text-align:left;padding:8px;color:#00B4D8;border-bottom:1px solid rgba(255,255,255,.08);font-weight:600}.v9-table td{padding:8px;color:#ccc;border-bottom:1px solid rgba(255,255,255,.03)}.v9-quick-actions{position:fixed;bottom:80px;left:16px;display:flex;flex-direction:column;gap:7px;z-index:999}.v9-quick-btn{width:42px;height:42px;border-radius:11px;border:1px solid rgba(0,180,216,.15);background:rgba(5,8,16,.92);color:#00B4D8;font-size:1.1em;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;backdrop-filter:blur(12px)}.v9-quick-btn:hover{background:rgba(0,180,216,.1);transform:scale(1.08);box-shadow:0 4px 16px rgba(0,180,216,.12)}.v9-toast{position:fixed;top:20px;left:50%;transform:translateX(-50%) translateY(-100px);background:rgba(0,180,216,.1);border:1px solid rgba(0,180,216,.2);color:#00B4D8;padding:10px 20px;border-radius:10px;z-index:99999;transition:transform .4s;font-size:.9em;backdrop-filter:blur(12px);white-space:nowrap}.v9-toast.show{transform:translateX(-50%) translateY(0)}.v9-ach-popup{position:fixed;top:60px;left:50%;transform:translateX(-50%) translateY(-150px);z-index:100000;background:linear-gradient(135deg,rgba(10,16,26,.96),rgba(20,28,38,.96));border:1px solid rgba(0,180,216,.3);border-radius:16px;padding:14px 22px;display:flex;align-items:center;gap:14px;backdrop-filter:blur(20px);transition:transform .5s cubic-bezier(.34,1.56,.64,1);box-shadow:0 8px 32px rgba(0,0,0,.5),0 0 24px rgba(0,180,216,.1)}.v9-ach-popup.show{transform:translateX(-50%) translateY(0)}@media(max-width:480px){.v9-panel{padding:16px;max-height:92vh;width:96%}.v9-quick-actions{bottom:70px;left:8px}.v9-quick-btn{width:36px;height:36px;font-size:.95em}}';
document.head.appendChild(s);
}

// ===== INIT =====
function initV9(){
injectV9CSS();
injectV9QuickActions();
setupV9Keyboard();
setTimeout(v9CheckAchievements,2500);
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',initV9)}
else{setTimeout(initV9,1200)}

})();
