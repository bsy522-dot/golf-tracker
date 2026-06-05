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
var html='<div class="v9-title">&#128203; 18&#xD640; &#xC2A4;&#xCF54;&#xC5B4;&#xCE74;&#xB4DC;</div>';

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
  html+='<div><div style="font-weight:700;color:#00FF88">'+(activeRound.course||'&#xB77C;&#xC6B4;&#xB4DC; &#xC911;')+'</div>';
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
    html+='<div style="font-weight:700;color:#00FF88;margin-bottom:8px">&#127951;&#xFE0E; Hole '+(nextHole+1)+' (Par '+activeRound.pars[nextHole]+')</div>';
    html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">';
    html+='<div><label class="v9-label">Score</label><input id="v9-sc-score" class="v9-input" type="number" min="1" max="15" value="'+activeRound.pars[nextHole]+'"></div>';
    html+='<div><label class="v9-label">Putts</label><input id="v9-sc-putts" class="v9-input" type="number" min="0" max="8" value="2"></div>';
    html+='<div style="display:flex;flex-direction:column;gap:4px;padding-top:14px">';
    html+='<label style="font-size:.75em;display:flex;align-items:center;gap:4px;color:#aaa"><input type="checkbox" id="v9-sc-gir"> GIR</label>';
    if(activeRound.pars[nextHole]>=4)html+='<label style="font-size:.75em;display:flex;align-items:center;gap:4px;color:#aaa"><input type="checkbox" id="v9-sc-fir"> FIR</label>';
    html+='</div></div>';
    html+='<button class="v9-btn v9-btn-primary" style="width:100%;margin-top:8px" onclick="window._v9RecordHole('+nextHole+')">&#x2705; &#xAE30;&#xB85D;</button>';
    html+='</div>';
  } else {
    html+='<button class="v9-btn v9-btn-primary" style="width:100%;margin-top:12px" onclick="window._v9FinishRound()">&#x1F3C1; &#xB77C;&#xC6B4;&#xB4DC; &#xC644;&#xB8CC;</button>';
  }
  html+='</div>';
} else {
  html+='<div class="v9-card"><h3>&#x2795; &#xC0C8; &#xB77C;&#xC6B4;&#xB4DC; &#xC2DC;&#xC791;</h3>';
  html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">';
  html+='<div><label class="v9-label">&#xCF54;&#xC2A4;&#xBA85;</label><input id="v9-sc-course" class="v9-input" type="text" placeholder="&#xACE8;&#xD504;&#xC7A5; &#xC774;&#xB984;" maxlength="30"></div>';
  html+='<div><label class="v9-label">&#xD2F0;&#xC0C9;</label><select id="v9-sc-tee" class="v9-input"><option value="white">White</option><option value="blue">Blue</option><option value="black">Black</option><option value="red">Red</option><option value="gold">Gold</option></select></div>';
  html+='</div>';
  html+='<button class="v9-btn v9-btn-primary" style="width:100%;margin-top:12px" onclick="window._v9StartRound()">&#xB77C;&#xC6B4;&#xB4DC; &#xC2DC;&#xC791;</button></div>';
}

if(rounds.length>0){
  html+='<div class="v9-card"><h3>&#x1F4C5; &#xB77C;&#xC6B4;&#xB4DC; &#xC774;&#xB825;</h3>';
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
lsSet('scorecard_active',round);showToast('&#x26f3; '+course+' &#xB77C;&#xC6B4;&#xB4DC; &#xC2DC;&#xC791;!');showScorecard();
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
showToast('&#x1F3C1; &#xB77C;&#xC6B4;&#xB4DC; &#xC644;&#xB8CC;!');showScorecard();v9CheckAchievements();
};

// ===== 2. STROKES GAINED ANALYZER =====
function showStrokesGained(){
var pn=getPanel('sg');
var sgData=lsGet('sg_data',{offTee:[],approach:[],aroundGreen:[],putting:[]});
var html='<div class="v9-title">&#x1F4CA; Strokes Gained &#xBD84;&#xC11D;&#xAE30;</div>';

html+='<div class="v9-card"><h3>SG &#xBD84;&#xC11D; &#xAC1C;&#xC694;</h3>';
html+='<p>Strokes Gained&#xC740; PGA Tour &#xD3C9;&#xADE0; &#xB300;&#xBE44; &#xAC01; &#xC601;&#xC5ED;&#xC5D0;&#xC11C; &#xC5BC;&#xB9C8;&#xB098; &#xD0C0;&#xC218;&#xB97C; &#xC808;&#xC57D;/&#xB0AD;&#xBE44;&#xD558;&#xB294;&#xC9C0; &#xCE21;&#xC815;&#xD569;&#xB2C8;&#xB2E4;.</p></div>';

html+='<div class="v9-card"><h3>&#x1F3AF; &#xC601;&#xC5ED;&#xBCC4; &#xC785;&#xB825;</h3>';
html+='<p style="margin-bottom:12px">&#xCD5C;&#xADFC; &#xB77C;&#xC6B4;&#xB4DC;&#xC5D0;&#xC11C; &#xAC01; &#xC601;&#xC5ED;&#xC758; &#xD3C9;&#xADE0; &#xD0C0;&#xC218;&#xB97C; &#xC785;&#xB825;&#xD558;&#xC138;&#xC694;.</p>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';
html+='<div><label class="v9-label">Off the Tee (avg)</label><input id="v9-sg-tee" class="v9-input" type="number" step="0.1" min="0" max="5" value="1.2"></div>';
html+='<div><label class="v9-label">Approach (avg)</label><input id="v9-sg-app" class="v9-input" type="number" step="0.1" min="0" max="5" value="1.5"></div>';
html+='<div><label class="v9-label">Around Green (avg)</label><input id="v9-sg-ag" class="v9-input" type="number" step="0.1" min="0" max="5" value="1.0"></div>';
html+='<div><label class="v9-label">Putting (avg putts)</label><input id="v9-sg-putt" class="v9-input" type="number" step="0.1" min="1" max="4" value="1.8"></div>';
html+='</div>';
html+='<button class="v9-btn v9-btn-primary" style="width:100%;margin-top:12px" onclick="window._v9CalcSG()">SG &#xBD84;&#xC11D;</button></div>';

html+='<div id="v9-sg-result"></div>';

html+='<canvas id="v9-sg-canvas" width="500" height="300" style="width:100%;height:auto;display:none;margin-top:12px;border-radius:12px"></canvas>';

html+='<div class="v9-card"><h3>&#x1F4D6; PGA Tour &#xD3C9;&#xADE0; (&#xCC38;&#xACE0;)</h3>';
html+='<table class="v9-table"><tr><th>&#xC601;&#xC5ED;</th><th>PGA &#xD3C9;&#xADE0;</th><th>&#xC124;&#xBA85;</th></tr>';
html+='<tr><td style="color:#00FF88">Off the Tee</td><td>0.00</td><td style="color:#aaa;font-size:.8em">&#xD2F0;&#xC0F7; &#xAE30;&#xC900; (FIR + &#xAC70;&#xB9AC;)</td></tr>';
html+='<tr><td style="color:#00B4D8">Approach</td><td>0.00</td><td style="color:#aaa;font-size:.8em">100yd+ &#xC5B4;&#xD504;&#xB85C;&#xCE58; &#xC0F7;</td></tr>';
html+='<tr><td style="color:#FFC107">Around Green</td><td>0.00</td><td style="color:#aaa;font-size:.8em">&#xCE69;/&#xD53C;&#xCE58;/&#xBC99;&#xCEE4; &#xC0F7;</td></tr>';
html+='<tr><td style="color:#E040FB">Putting</td><td>0.00</td><td style="color:#aaa;font-size:.8em">&#xADF8;&#xB9B0; &#xC704; &#xD37C;&#xD305;</td></tr>';
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
  {name:'Off the Tee',val:sgOT,color:'#00FF88',desc:'&#xD2F0;&#xC0F7; &#xC815;&#xD655;&#xB3C4;+&#xAC70;&#xB9AC;'},
  {name:'Approach',val:sgApp,color:'#00B4D8',desc:'100yd+ &#xC5B4;&#xD504;&#xB85C;&#xCE58;'},
  {name:'Around Green',val:sgAG,color:'#FFC107',desc:'&#xCE69;/&#xD53C;&#xCE58;/&#xBC99;&#xCEE4;'},
  {name:'Putting',val:sgPutt,color:'#E040FB',desc:'&#xADF8;&#xB9B0; &#xC704; &#xD37C;&#xD305;'}
];

var html='<div class="v9-card" style="text-align:center;background:linear-gradient(135deg,rgba(0,180,216,.08),rgba(0,255,136,.08))">';
html+='<div style="font-size:.8em;color:#888;margin-bottom:4px">Total Strokes Gained</div>';
html+='<div style="font-size:3em;font-weight:800;color:'+(sgTotal>=0?'#00FF88':'#ff6b6b')+'">'+sgTotal.toFixed(1)+'</div>';
html+='<div style="font-size:.85em;color:#888">PGA Tour &#xD3C9;&#xADE0; &#xB300;&#xBE44;</div></div>';

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
html+='<div class="v9-card" style="border-left:3px solid #ff6b6b"><h3 style="color:#ff6b6b">&#x26A0;&#xFE0E; &#xAC1C;&#xC120; &#xD544;&#xC694;: '+weakest.name+'</h3>';
html+='<p>'+weakest.name+' &#xC601;&#xC5ED;&#xC5D0;&#xC11C; SG '+weakest.val.toFixed(2)+' &#xB85C; &#xAC00;&#xC7A5; &#xB9CE;&#xC740; &#xD0C0;&#xC218;&#xB97C; &#xC783;&#xACE0; &#xC788;&#xC2B5;&#xB2C8;&#xB2E4;. &#xC774; &#xC601;&#xC5ED;&#xC5D0; &#xC5F0;&#xC2B5;&#xC744; &#xC9D1;&#xC911;&#xD558;&#xC138;&#xC694;.</p></div>';

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
var html='<div class="v9-title">&#x1F3AF; &#xD37C;&#xD305; &#xBD84;&#xC11D;&#xAE30;</div>';

html+='<div class="v9-card"><h3>&#xAC70;&#xB9AC;&#xBCC4; &#xD37C;&#xD305; &#xC131;&#xACF5;&#xB960;</h3>';
html+='<p style="margin-bottom:12px">&#xD37C;&#xD305; &#xACB0;&#xACFC;&#xB97C; &#xAE30;&#xB85D;&#xD558;&#xBA74; &#xAC70;&#xB9AC;&#xBCC4; &#xC131;&#xACF5;&#xB960;&#xC744; &#xBD84;&#xC11D;&#xD569;&#xB2C8;&#xB2E4;.</p>';
html+='<canvas id="v9-putt-canvas" width="500" height="280" style="width:100%;height:auto;background:rgba(0,40,0,.2);border-radius:12px;border:1px solid rgba(0,255,136,.1)"></canvas></div>';

html+='<div class="v9-card"><h3>&#x2795; &#xD37C;&#xD305; &#xAE30;&#xB85D;</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">';
html+='<div><label class="v9-label">&#xAC70;&#xB9AC; (ft)</label><input id="v9-putt-dist" class="v9-input" type="number" min="1" max="60" value="6"></div>';
html+='<div><label class="v9-label">&#xACB0;&#xACFC;</label><select id="v9-putt-result" class="v9-input"><option value="made">&#x2705; &#xC131;&#xACF5;</option><option value="missed">&#x274C; &#xC2E4;&#xD328;</option></select></div>';
html+='<div><label class="v9-label">&#xBE0C;&#xB808;&#xC774;&#xD06C;</label><select id="v9-putt-break" class="v9-input"><option value="straight">&#xC9C1;&#xC120;</option><option value="left">&#xC88C;&#xD68C;&#xC804;</option><option value="right">&#xC6B0;&#xD68C;&#xC804;</option></select></div>';
html+='<div><label class="v9-label">&#xACBD;&#xC0AC;</label><select id="v9-putt-slope" class="v9-input"><option value="flat">&#xD3C9;&#xC9C0;</option><option value="uphill">&#xC624;&#xB974;&#xB9C9;</option><option value="downhill">&#xB0B4;&#xB9AC;&#xB9C9;</option></select></div>';
html+='</div>';
html+='<button class="v9-btn v9-btn-primary" style="width:100%;margin-top:12px" onclick="window._v9RecordPutt()">&#xD37C;&#xD305; &#xAE30;&#xB85D;</button></div>';

var ranges=[{min:0,max:3,label:'0-3ft'},{min:3,max:6,label:'3-6ft'},{min:6,max:10,label:'6-10ft'},{min:10,max:15,label:'10-15ft'},{min:15,max:25,label:'15-25ft'},{min:25,max:99,label:'25ft+'}];
html+='<div class="v9-card"><h3>&#x1F4CA; &#xAC70;&#xB9AC;&#xBCC4; &#xD1B5;&#xACC4;</h3>';
html+='<table class="v9-table"><tr><th>&#xAC70;&#xB9AC;</th><th>&#xC2DC;&#xB3C4;</th><th>&#xC131;&#xACF5;</th><th>&#xC131;&#xACF5;&#xB960;</th><th>PGA &#xD3C9;&#xADE0;</th></tr>';
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

html+='<div class="v9-card"><h3>&#x1F4A1; &#xD37C;&#xD305; &#xD301;</h3>';
var puttTips=[
  {range:'3ft &#xC774;&#xB0B4;',tip:'&#xBCFC;&#xC744; &#xBCF4;&#xC9C0; &#xB9D0;&#xACE0; &#xD640;&#xC744; &#xBCF4;&#xC138;&#xC694;. &#xD5E4;&#xB4DC;&#xB97C; &#xB4E4;&#xC9C0; &#xB9D0;&#xACE0; &#xC18C;&#xB9AC;&#xB97C; &#xB4E4;&#xC73C;&#xC138;&#xC694;.'},
  {range:'3-6ft',tip:'&#xC5B4;&#xAE68; &#xD68C;&#xC804;&#xC73C;&#xB85C; &#xC2A4;&#xD2B8;&#xB85C;&#xD06C;. &#xC190;&#xBAA9; &#xACE0;&#xC815;, &#xD37C;&#xD130;&#xD5E4;&#xB4DC;&#xB97C; &#xC2A4;&#xD018;&#xC5B4;&#xB85C; &#xC720;&#xC9C0;.'},
  {range:'6ft+',tip:'&#xAC70;&#xB9AC;&#xAC10;&#xC774; &#xD575;&#xC2EC;. &#xD640; &#xADFC;&#xCC98;&#xC5D0; &#xBD99;&#xC774;&#xB294; &#xAC83;&#xC774; &#xBAA9;&#xD45C;. 3&#xD37C;&#xD2B8; &#xBC29;&#xC9C0;.'}
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
showToast(result==='made'?'&#x2705; '+dist+'ft &#xD37C;&#xD305; &#xC131;&#xACF5;!':'&#x274C; '+dist+'ft &#xC2E4;&#xD328;');
playSfx('putting');showPuttingAnalyzer();
};

// ===== 4. COURSE STRATEGY SIMULATOR =====
var COURSE_TEMPLATES=[
{name:'Par 4 &#xC9C1;&#xC120;',par:4,distance:380,features:[{type:'tee',x:50,y:430},{type:'fairway',x:50,y:200,w:80,h:250},{type:'green',x:50,y:60,r:30},{type:'bunker',x:20,y:80,r:12},{type:'bunker',x:80,y:90,r:10}],strategy:'&#xD398;&#xC5B4;&#xC6E8;&#xC774; &#xC911;&#xC559;&#xC744; &#xACF5;&#xB7B5;. &#xC6B0;&#xCE21; &#xBC99;&#xCEE4;&#xB97C; &#xD53C;&#xD574; &#xC88C;&#xCE21;&#xC73C;&#xB85C; &#xC5B4;&#xD504;&#xB85C;&#xCE58;.'},
{name:'Par 3 &#xC544;&#xC77C;&#xB7EC;&#xB4DC;',par:3,distance:165,features:[{type:'tee',x:50,y:430},{type:'water',x:50,y:220,w:90,h:40},{type:'green',x:50,y:100,r:28},{type:'bunker',x:25,y:110,r:12}],strategy:'&#xBB3C;&#xC744; &#xB118;&#xACA8;&#xC57C; &#xD569;&#xB2C8;&#xB2E4;. &#xADF8;&#xB9B0; &#xB4A4;&#xCABD;&#xC744; &#xACF5;&#xB7B5;&#xD558;&#xC5EC; &#xC548;&#xC804;&#xD558;&#xAC8C;.'},
{name:'Par 5 &#xB3C4;&#xADF8;&#xB809;',par:5,distance:520,features:[{type:'tee',x:20,y:430},{type:'fairway',x:25,y:280,w:40,h:160},{type:'fairway',x:55,y:140,w:45,h:160},{type:'green',x:70,y:60,r:28},{type:'bunker',x:90,y:70,r:10},{type:'water',x:10,y:160,w:25,h:50}],strategy:'1&#xBC88; &#xC0F7; &#xD398;&#xC5B4;&#xC6E8;&#xC774; &#xC911;&#xC559;, 2&#xBC88; &#xC0F7;&#xC73C;&#xB85C; &#xCF54;&#xB108;&#xB97C; &#xB3CC;&#xC544; &#xADF8;&#xB9B0; &#xACF5;&#xB7B5;.'},
{name:'Par 4 &#xB3C4;&#xADF8;&#xB809;L',par:4,distance:400,features:[{type:'tee',x:80,y:430},{type:'fairway',x:65,y:280,w:50,h:160},{type:'fairway',x:30,y:140,w:50,h:160},{type:'green',x:25,y:60,r:30},{type:'bunker',x:10,y:55,r:11},{type:'trees',x:95,y:200,r:15}],strategy:'&#xC88C;&#xCE21; &#xB3C4;&#xADF8;&#xB809;. &#xD398;&#xC5B4;&#xC6E8;&#xC774; &#xC88C;&#xCE21;&#xC744; &#xACF5;&#xB7B5;&#xD558;&#xC5EC; &#xCF54;&#xB108;&#xB97C; &#xB2E8;&#xCD95;.'},
{name:'Par 3 &#xBC99;&#xCEE4;&#xAC00;&#xB4DC;',par:3,distance:195,features:[{type:'tee',x:50,y:430},{type:'green',x:50,y:100,r:32},{type:'bunker',x:20,y:90,r:14},{type:'bunker',x:80,y:90,r:14},{type:'bunker',x:50,y:140,r:12}],strategy:'3&#xBC29;&#xD5A5; &#xBC99;&#xCEE4; &#xC218;&#xBE44;. &#xADF8;&#xB9B0; &#xC911;&#xC559;&#xC744; &#xC815;&#xD655;&#xD788; &#xACF5;&#xB7B5;.'},
{name:'Par 5 &#xC6CC;&#xD130;&#xD648;',par:5,distance:540,features:[{type:'tee',x:50,y:430},{type:'fairway',x:50,y:280,w:60,h:160},{type:'water',x:35,y:120,w:30,h:40},{type:'green',x:55,y:55,r:26},{type:'bunker',x:80,y:60,r:10}],strategy:'&#xADF8;&#xB9B0; &#xC55E; &#xC6CC;&#xD130;. 2&#xC628; &#xC2DC;&#xB3C4;&#xBCF4;&#xB2E4; &#xB808;&#xC774;&#xC5C5;&#xC774; &#xC548;&#xC804;.'}
];

function showCourseSim(){
var pn=getPanel('course');
var html='<div class="v9-title">&#x1F3CC;&#xFE0F; &#xCF54;&#xC2A4; &#xC804;&#xB7B5; &#xC2DC;&#xBBAC;&#xB808;&#xC774;&#xD130;</div>';

html+='<div class="v9-card"><h3>&#xD640; &#xC120;&#xD0DD;</h3>';
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
  if(hasWater)ih+='<span class="v9-badge v9-badge-d">&#x1F4A7; &#xC6CC;&#xD130; &#xD574;&#xC800;&#xB4DC;</span>';
  if(hasBunker)ih+='<span class="v9-badge v9-badge-c">&#x1F3D6;&#xFE0F; &#xBC99;&#xCEE4;</span>';
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
var html='<div class="v9-title">&#x1F4CF; &#xD074;&#xB7FD; &#xAC70;&#xB9AC; &#xCE98;&#xB9AC;&#xBE0C;&#xB808;&#xC774;&#xC158;</div>';

html+='<div class="v9-card"><h3>&#xB098;&#xC758; &#xD074;&#xB7FD; &#xAC70;&#xB9AC; &#xC785;&#xB825;</h3>';
html+='<p style="margin-bottom:12px">&#xAC01; &#xD074;&#xB7FD;&#xC758; &#xD3C9;&#xADE0; &#xCE90;&#xB9AC; &#xAC70;&#xB9AC;&#xB97C; &#xC785;&#xB825;&#xD558;&#xBA74; &#xAC24; &#xBD84;&#xC11D; &#xCC28;&#xD2B8;&#xB97C; &#xC0DD;&#xC131;&#xD569;&#xB2C8;&#xB2E4;.</p>';
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
html+='<button class="v9-btn v9-btn-primary" style="width:100%;margin-top:12px" onclick="window._v9SaveCalibration()">&#xC800;&#xC7A5; &amp; &#xBD84;&#xC11D;</button></div>';

html+='<canvas id="v9-cal-canvas" width="500" height="300" style="width:100%;height:auto;display:none;border-radius:12px;margin-top:12px"></canvas>';
html+='<div id="v9-cal-result"></div>';

html+='<div class="v9-card"><h3>&#x1F4A1; &#xAC24; &#xBD84;&#xC11D; &#xAC00;&#xC774;&#xB4DC;</h3>';
html+='<table class="v9-table"><tr><th>&#xAC24; &#xAC04;&#xACA9;</th><th>&#xD3C9;&#xAC00;</th><th>&#xC124;&#xBA85;</th></tr>';
html+='<tr><td style="color:#00FF88">10-15yd</td><td>&#x2B50; &#xC774;&#xC0C1;&#xC801;</td><td style="color:#aaa;font-size:.8em">&#xC815;&#xD655;&#xD55C; &#xAC70;&#xB9AC; &#xCEE8;&#xD2B8;&#xB864;</td></tr>';
html+='<tr><td style="color:#FFC107">15-20yd</td><td>&#x2705; &#xBCF4;&#xD1B5;</td><td style="color:#aaa;font-size:.8em">&#xB300;&#xBD80;&#xBD84;&#xC758; &#xC544;&#xB9C8;&#xCD94;&#xC5B4;</td></tr>';
html+='<tr><td style="color:#ff6b6b">20yd+</td><td>&#x26A0;&#xFE0E; &#xB113;&#xC74C;</td><td style="color:#aaa;font-size:.8em">&#xD074;&#xB7FD; &#xCD94;&#xAC00; &#xAC80;&#xD1A0;</td></tr>';
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

var rhtml='<div class="v9-card"><h3>&#x1F4CA; &#xAC24; &#xBD84;&#xC11D; &#xACB0;&#xACFC;</h3>';
rhtml+='<div style="text-align:center;margin:12px 0"><div style="font-size:2em;font-weight:800;color:#00B4D8">'+avgGap+'yd</div><div style="color:#888;font-size:.85em">&#xD3C9;&#xADE0; &#xAC24; &#xAC04;&#xACA9;</div></div>';

if(gapIssues.length>0){
  rhtml+='<div style="margin-top:12px">';
  for(var gi=0;gi<gapIssues.length;gi++){
    var issue=gapIssues[gi];
    if(issue.tooClose){
      rhtml+='<div style="padding:6px 0;color:#FFC107;font-size:.85em">&#x26A0;&#xFE0E; '+issue.from+' &harr; '+issue.to+': '+issue.gap+'yd &#xAC04;&#xACA9; &#xB108;&#xBB34; &#xC881;&#xC74C;</div>';
    }else{
      rhtml+='<div style="padding:6px 0;color:#ff6b6b;font-size:.85em">&#x26A0;&#xFE0E; '+issue.from+' &harr; '+issue.to+': '+issue.gap+'yd &#xAC24; &#xBC1C;&#xACAC;</div>';
    }
  }
  rhtml+='</div>';
}
rhtml+='</div>';
var resEl=document.getElementById('v9-cal-result');if(resEl)resEl.innerHTML=rhtml;

showToast('&#xD074;&#xB7FD; &#xAC70;&#xB9AC; &#xC800;&#xC7A5; &#xC644;&#xB8CC;!');playSfx('calibration');v9CheckAchievements();
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
{name:'&#xD798; &#xD68C;&#xC804;',icon:'&#x1F504;',duration:'30&#xCD08;',muscles:'&#xCF54;&#xC5B4;,&#xD5C8;&#xB9AC;',steps:['&#xBC1C; &#xC5B4;&#xAE68; &#xB108;&#xBE44;&#xB85C; &#xBC8C;&#xB9AC;&#xACE0; &#xC11C;&#xAE30;','&#xD074;&#xB7FD; &#xC7A1;&#xC740; &#xC790;&#xC138;&#xB85C; &#xC6C5;&#xCCB4; &#xD68C;&#xC804;','&#xC88C;&#xC6B0; &#xAC01; 15&#xD68C; &#xBC18;&#xBCF5;','&#xBC1C;&#xC774; &#xC6C0;&#xC9C1;&#xC774;&#xC9C0; &#xC54A;&#xB3C4;&#xB85D; &#xC8FC;&#xC758;']},
{name:'&#xACE8;&#xBC18; &#xC2A4;&#xCFFC;&#xD2B8;',icon:'&#x1F3CB;&#xFE0F;',duration:'45&#xCD08;',muscles:'&#xD558;&#xCCB4;,&#xCF54;&#xC5B4;',steps:['&#xBC1C; &#xC5B4;&#xAE68; &#xB108;&#xBE44;, &#xBC1C;&#xB04B; &#xC0B4;&#xC9DD; &#xBC14;&#xAE65;','&#xC571;&#xAE00;&#xACFC; &#xBB34;&#xB98E;&#xC744; &#xB3D9;&#xC2DC;&#xC5D0; &#xAD7D;&#xD788;&#xAE30;','&#xBB34;&#xB98E;&#xC774; &#xBC1C;&#xB04B;&#xC744; &#xB118;&#xC9C0; &#xC54A;&#xAC8C;','15&#xD68C; x 3&#xC138;&#xD2B8;']},
{name:'&#xD50C;&#xB7AD;&#xD06C;',icon:'&#x1F4AA;',duration:'30&#xCD08;',muscles:'&#xCF54;&#xC5B4;,&#xC5B4;&#xAE68;',steps:['&#xD314;&#xAFC8;&#xCE58; &#xC790;&#xC138;&#xC5D0;&#xC11C; &#xBAB8;&#xC744; &#xC77C;&#xC9C1;&#xC120;&#xC73C;&#xB85C;','&#xBCF5;&#xBD80;&#xC5D0; &#xD798;&#xC744; &#xC8FC;&#xACE0; 30&#xCD08; &#xBC84;&#xD2F0;&#xAE30;','&#xC5C9;&#xB369;&#xC774;&#xAC00; &#xBE60;&#xC9C0;&#xC9C0; &#xC54A;&#xAC8C;','3&#xC138;&#xD2B8; &#xBC18;&#xBCF5;']},
{name:'&#xC5B4;&#xAE68; &#xC2A4;&#xD2B8;&#xB808;&#xCE6D;',icon:'&#x1F9D8;',duration:'40&#xCD08;',muscles:'&#xC5B4;&#xAE68;,&#xD314;',steps:['&#xC624;&#xB978;&#xD314;&#xC744; &#xBA38;&#xB9AC; &#xC704;&#xB85C; &#xC62C;&#xB9AC;&#xACE0; &#xB4F1; &#xB4A4;&#xB85C;','&#xC67C;&#xC190;&#xC73C;&#xB85C; &#xC624;&#xB978; &#xD314;&#xAFC8;&#xCE58;&#xB97C; &#xC7A1;&#xC544; &#xB2F9;&#xAE30;&#xAE30;','20&#xCD08; &#xC720;&#xC9C0; &#xD6C4; &#xBC18;&#xB300;&#xCABD;','&#xAC01; 3&#xD68C; &#xBC18;&#xBCF5;']},
{name:'&#xACE0;&#xAD00;&#xC808; &#xC5F4;&#xAE30;',icon:'&#x1F9BE;',duration:'45&#xCD08;',muscles:'&#xACE0;&#xAD00;&#xC808;,&#xD5C8;&#xB9AC;',steps:['&#xBC14;&#xB2E5;&#xC5D0; &#xC549;&#xC544; &#xBC1C;&#xBC14;&#xB2E5;&#xC744; &#xBD99;&#xC774;&#xAE30;','&#xBB34;&#xB98E;&#xC744; &#xC591;&#xCABD;&#xC73C;&#xB85C; &#xBC8C;&#xB9AC;&#xACE0; &#xC555;&#xB825;','&#xC7D0;&#xBC1C;&#xC744; &#xBC18;&#xB300;&#xCABD; &#xBB34;&#xB98E; &#xC704;&#xC5D0; &#xC62C;&#xB824; &#xD68C;&#xC804;','&#xAC01; 20&#xCD08; x &#xC88C;&#xC6B0; 3&#xD68C;']},
{name:'&#xC190;&#xBAA9; &#xAC15;&#xD654;',icon:'&#x270B;',duration:'30&#xCD08;',muscles:'&#xC804;&#xC644;,&#xC190;&#xBAA9;',steps:['&#xC190;&#xC744; &#xCE60; &#xD3B4;&#xACE0; 5&#xCD08; &#xC720;&#xC9C0;','&#xC190;&#xC744; &#xD65C;&#xC9DD; &#xD3B4;&#xACE0; 5&#xCD08; &#xC720;&#xC9C0;','&#xC190;&#xBAA9; &#xC88C;&#xC6B0;&#xB85C; &#xD68C;&#xC804; &#xAC01; 10&#xD68C;','&#xADF8;&#xB9BD; &#xAC15;&#xD654;&#xC6A9; &#xACE0;&#xBB34;&#xACF5; &#xC950;&#xAE30; 20&#xD68C;']},
{name:'&#xD587;&#xC2A4;&#xD2B8;&#xB9C1; &#xC2A4;&#xD2B8;&#xB808;&#xCE6D;',icon:'&#x1F9B5;',duration:'40&#xCD08;',muscles:'&#xD587;&#xC2A4;&#xD2B8;&#xB9C1;,&#xD5C8;&#xB9AC;',steps:['&#xD55C; &#xBC1C;&#xC744; &#xC55E;&#xC73C;&#xB85C; &#xD06C;&#xAC8C; &#xB0B4;&#xB529;&#xACE0;','&#xB4A4;&#xCABD; &#xB2E4;&#xB9AC;&#xC758; &#xD587;&#xC2A4;&#xD2B8;&#xB9C1;&#xC774; &#xB2F9;&#xAE30;&#xB3C4;&#xB85D;','&#xC5C9;&#xB369;&#xC774;&#xB97C; &#xC55E;&#xC73C;&#xB85C; &#xBC00;&#xAE30;','&#xAC01; 20&#xCD08; x &#xC88C;&#xC6B0; 3&#xD68C;']},
{name:'&#xCF54;&#xC5B4; &#xB370;&#xB4DC;&#xBC84;&#xADF8;',icon:'&#x1F41B;',duration:'45&#xCD08;',muscles:'&#xCF54;&#xC5B4;,&#xB4F1;',steps:['&#xBC14;&#xB2E5;&#xC5D0; &#xB4F1;&#xC744; &#xB300;&#xACE0; &#xBB34;&#xB98E;&#xC744; &#xC138;&#xC6B0;&#xACE0; &#xB204;&#xC6CC;','&#xBC1C;&#xBCF4;&#xB2E4; &#xBB34;&#xB98E;&#xC744; &#xB192;&#xAC8C; &#xC62C;&#xB9AC;&#xACE0;','&#xD314;&#xB2E4;&#xB9AC;&#xB97C; &#xB118;&#xACA8; &#xBC18;&#xB300;&#xCABD;&#xC73C;&#xB85C; &#xBE60;&#xAE30;','10&#xD68C; x 3&#xC138;&#xD2B8;']}
];

function showFitness(){
var pn=getPanel('fitness');
var fitLog=lsGet('fitness_log',[]);
var html='<div class="v9-title">&#x1F3CB;&#xFE0F; &#xACE8;&#xD504; &#xD53C;&#xD2B8;&#xB2C8;&#xC2A4;</div>';

html+='<div class="v9-card"><h3>&#xACE8;&#xD504; &#xC804;&#xC6A9; &#xC6B4;&#xB3D9;</h3>';
html+='<p>&#xC2A4;&#xC717; &#xD30C;&#xC6CC;&#xC640; &#xC720;&#xC5F0;&#xC131;&#xC744; &#xB192;&#xC774;&#xB294; 8&#xC885; &#xACE8;&#xD504; &#xD53C;&#xD2B8;&#xB2C8;&#xC2A4; &#xD504;&#xB85C;&#xADF8;&#xB7A8;.</p></div>';

for(var ei=0;ei<FITNESS_EXERCISES.length;ei++){
  var ex=FITNESS_EXERCISES[ei];
  var done=fitLog.some(function(l){return l.exercise===ei&&l.date===todayStr()});
  html+='<div class="v9-card" style="'+(done?'border-left:3px solid #00FF88;opacity:.7':'')+'">';
  html+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">';
  html+='<div style="display:flex;align-items:center;gap:10px"><span style="font-size:1.5em">'+ex.icon+'</span><div><div style="font-weight:700">'+ex.name+'</div><div style="font-size:.7em;color:#888">'+ex.muscles+' | '+ex.duration+'</div></div></div>';
  if(done)html+='<span class="v9-badge v9-badge-a">&#x2705; &#xC644;&#xB8CC;</span>';
  else html+='<button class="v9-btn v9-btn-primary" onclick="window._v9CompleteFitness('+ei+')">&#xC644;&#xB8CC;</button>';
  html+='</div>';
  html+='<ol style="margin:0 0 0 16px;color:#aaa;font-size:.82em;line-height:1.7">';
  for(var si4=0;si4<ex.steps.length;si4++){html+='<li>'+ex.steps[si4]+'</li>'}
  html+='</ol></div>';
}

var todayCount=fitLog.filter(function(l){return l.date===todayStr()}).length;
html+='<div class="v9-card" style="text-align:center"><div style="font-size:2em;font-weight:800;color:#00FF88">'+todayCount+'/'+FITNESS_EXERCISES.length+'</div><div style="color:#888;font-size:.85em">&#xC624;&#xB298; &#xC644;&#xB8CC;&#xD55C; &#xC6B4;&#xB3D9;</div></div>';

pn.innerHTML='<button class="v9-close" onclick="window._v9Close(\'fitness\')">&times;</button>'+html;
openPanel('fitness');playSfx('fitness');v9CheckAchievements();
}

window._v9CompleteFitness=function(idx){
var log=lsGet('fitness_log',[]);
log.push({date:todayStr(),exercise:idx});
if(log.length>200)log=log.slice(-200);
lsSet('fitness_log',log);
showToast('&#x1F3CB;&#xFE0F; '+FITNESS_EXERCISES[idx].name+' &#xC644;&#xB8CC;!');playSfx('fitness');showFitness();
};

// ===== 7. ROUND JOURNAL =====
var MOOD_ICONS=['&#x1F60A;','&#x1F60E;','&#x1F914;','&#x1F612;','&#x1F620;'];
var MOOD_LABELS=['&#xC88B;&#xC74C;','&#xCD5C;&#xACE0;','&#xBCF4;&#xD1B5;','&#xBD88;&#xB9CC;','&#xC2DC;&#xB828;'];

function showJournal(){
var pn=getPanel('journal');
var entries=lsGet('journal_entries',[]);
var html='<div class="v9-title">&#x1F4D3; &#xB77C;&#xC6B4;&#xB4DC; &#xC77C;&#xC9C0;</div>';

html+='<div class="v9-card"><h3>&#x2795; &#xC0C8; &#xC77C;&#xC9C0; &#xC791;&#xC131;</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">';
html+='<div><label class="v9-label">&#xB0A0;&#xC9DC;</label><input id="v9-jn-date" class="v9-input" type="date" value="'+todayStr()+'"></div>';
html+='<div><label class="v9-label">&#xCF54;&#xC2A4;</label><input id="v9-jn-course" class="v9-input" type="text" placeholder="&#xACE8;&#xD504;&#xC7A5;" maxlength="30"></div>';
html+='<div><label class="v9-label">&#xC2A4;&#xCF54;&#xC5B4;</label><input id="v9-jn-score" class="v9-input" type="number" min="60" max="150" value="90"></div>';
html+='<div><label class="v9-label">&#xCEE8;&#xB514;&#xC158;</label><select id="v9-jn-cond" class="v9-input"><option value="great">&#xCD5C;&#xC0C1;</option><option value="good" selected>&#xC88B;&#xC74C;</option><option value="normal">&#xBCF4;&#xD1B5;</option><option value="bad">&#xB098;&#xC068;</option></select></div>';
html+='</div>';
html+='<div style="margin-top:8px"><label class="v9-label">&#xAE30;&#xBD84;</label>';
html+='<div style="display:flex;gap:8px" id="v9-jn-mood">';
for(var mi=0;mi<MOOD_ICONS.length;mi++){
  html+='<button class="v9-btn '+(mi===0?'active':'')+'" data-mood="'+mi+'" onclick="window._v9SelectMood('+mi+')" style="font-size:1.3em;padding:8px 12px">'+MOOD_ICONS[mi]+'</button>';
}
html+='</div></div>';
html+='<div style="margin-top:8px"><label class="v9-label">&#xBA54;&#xBAA8;</label>';
html+='<textarea id="v9-jn-memo" class="v9-input" rows="3" placeholder="&#xC624;&#xB298; &#xB77C;&#xC6B4;&#xB4DC;&#xC5D0;&#xC11C; &#xBC30;&#xC6B4; &#xC810;, &#xAC1C;&#xC120;&#xD560; &#xC810;..." style="resize:none"></textarea></div>';
html+='<button class="v9-btn v9-btn-primary" style="width:100%;margin-top:12px" onclick="window._v9SaveJournal()">&#xC77C;&#xC9C0; &#xC800;&#xC7A5;</button></div>';

if(entries.length>0){
  html+='<div class="v9-card"><h3>&#x1F4C5; &#xC77C;&#xC9C0; &#xBAA9;&#xB85D; ('+entries.length+'&#xAC74;)</h3>';
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
showToast('&#x1F4D3; &#xC77C;&#xC9C0; &#xC800;&#xC7A5; &#xC644;&#xB8CC;!');playSfx('journal');showJournal();
};

// ===== 8. GOLF RULEBOOK =====
var RULEBOOK=[
{rule:'Rule 1',title:'&#xACE0;&#xC758; &#xADC0;&#xCE59;',content:'&#xACE8;&#xD504;&#xB294; &#xC815;&#xC9C1;&#xC758; &#xC2A4;&#xD3EC;&#xCE20;&#xC785;&#xB2C8;&#xB2E4;. &#xBAA8;&#xB4E0; &#xD50C;&#xB808;&#xC774;&#xC5B4;&#xB294; &#xACBD;&#xAE30;&#xC758; &#xC815;&#xC2E0;&#xC5D0; &#xB530;&#xB77C; &#xD589;&#xB3D9;&#xD574;&#xC57C; &#xD569;&#xB2C8;&#xB2E4;.',penalty:'&#xC2E4;&#xACA9;&#xC5D0; &#xB530;&#xB77C; &#xACBD;&#xACE0; ~ &#xC2E4;&#xACA9;'},
{rule:'Rule 4',title:'&#xC7A5;&#xBE44; &#xADDC;&#xC815;',content:'&#xCD5C;&#xB300; 14&#xAC1C; &#xD074;&#xB7FD;. &#xB77C;&#xC6B4;&#xB4DC; &#xC911; &#xD30C;&#xC190;&#xB41C; &#xD074;&#xB7FD;&#xC740; &#xAD50;&#xCCB4;&#xD560; &#xC218; &#xC788;&#xC73C;&#xB098; &#xB2E4;&#xB978; &#xD50C;&#xB808;&#xC774;&#xC5B4;&#xC5D0;&#xAC8C;&#xC11C; &#xD074;&#xB7FD;&#xC744; &#xBE4C;&#xB9B4; &#xC218; &#xC5C6;&#xC2B5;&#xB2C8;&#xB2E4;.',penalty:'&#xD640;&#xB2F9; 2&#xBC8C;&#xD0C0; (&#xCD5C;&#xB300; 4&#xBC8C;&#xD0C0;)'},
{rule:'Rule 6',title:'&#xBCFC; &#xD50C;&#xB808;&#xC774;',content:'&#xD540;&#xB2C8;&#xC2DC;&#xB41C; &#xBCFC;&#xC744; &#xADF8;&#xB300;&#xB85C; &#xD50C;&#xB808;&#xC774;&#xD569;&#xB2C8;&#xB2E4;. &#xBC14;&#xB2E5;&#xC5D0; &#xBC15;&#xD78C; &#xBCFC;, &#xC6C0;&#xC9C1;&#xC774;&#xB294; &#xBCFC;&#xC744; &#xBCFC; &#xADF8;&#xB300;&#xB85C; &#xD50C;&#xB808;&#xC774;&#xD569;&#xB2C8;&#xB2E4;.',penalty:'&#xC704;&#xBC18; &#xC2DC; 1&#xBC8C;&#xD0C0;'},
{rule:'Rule 10',title:'&#xC2A4;&#xD2B8;&#xB85C;&#xD06C; &#xC900;&#xBE44;&#xC640; &#xC2E4;&#xD589;',content:'&#xBCFC;&#xC744; &#xCE58;&#xAE30; &#xC804;&#xC5D0; &#xC870;&#xC5B8;&#xC740; &#xCE90;&#xB514;&#xC5D0;&#xAC8C;&#xB9CC; &#xBC1B;&#xC744; &#xC218; &#xC788;&#xC2B5;&#xB2C8;&#xB2E4;. &#xBC14;&#xB78C;, &#xBE44;, &#xD14C;&#xC2A4;&#xD2B8; &#xC2A4;&#xC789;&#xC740; &#xAE08;&#xC9C0;.',penalty:'2&#xBC8C;&#xD0C0; / &#xC2E4;&#xACA9;'},
{rule:'Rule 11',title:'&#xC6C0;&#xC9C1;&#xC774;&#xB294; &#xBCFC;',content:'&#xC6C0;&#xC9C1;&#xC774;&#xB294; &#xBCFC;&#xC744; &#xBC29;&#xD574;&#xD558;&#xBA74; &#xBC8C;&#xD0C0;. &#xBC14;&#xB78C;/&#xBB3C;&#xC5D0; &#xC758;&#xD574; &#xC6C0;&#xC9C1;&#xC778; &#xACBD;&#xC6B0;&#xB294; &#xBB34;&#xBC8C;.',penalty:'&#xC758;&#xB3C4;&#xC801; &#xBC29;&#xD574;: 2&#xBC8C;&#xD0C0;'},
{rule:'Rule 13',title:'&#xD37C;&#xD305; &#xADF8;&#xB9B0;',content:'&#xADF8;&#xB9B0;&#xC5D0;&#xC11C;&#xB294; &#xD53C;&#xAC70;&#xB098; &#xBC29;&#xD5A5;&#xC744; &#xAC00;&#xB974;&#xD0A4;&#xB294; &#xD589;&#xC704;&#xB294; &#xC81C;&#xD55C;&#xB429;&#xB2C8;&#xB2E4;. &#xD53C;&#xC2A0;&#xC740; &#xBC18;&#xB4DC;&#xC2DC; &#xBE7C;&#xC57C; &#xD569;&#xB2C8;&#xB2E4; (&#xC120;&#xD0DD;&#xC801; &#xD53C;&#xC2A0; &#xC0BD;&#xC785;).',penalty:'2&#xBC8C;&#xD0C0;'},
{rule:'Rule 14',title:'&#xBCFC; &#xD50C;&#xB808;&#xC774; &#xBC29;&#xBC95;',content:'&#xD074;&#xB7FD;&#xC744; &#xC9C0;&#xBA74;&#xC5D0; &#xBD99;&#xC778; &#xCC44; &#xBBF8;&#xB294; &#xAC83;, &#xBCFC;&#xC744; &#xBC00;&#xAC70;&#xB098; &#xCC0D;&#xAC70;&#xB098; &#xD140;&#xC5B4;&#xC62C;&#xB9AC;&#xB294; &#xAC83;&#xC740; &#xAE08;&#xC9C0;.',penalty:'2&#xBC8C;&#xD0C0;'},
{rule:'Rule 16',title:'&#xBE44;&#xC815;&#xC0C1; &#xCF54;&#xC2A4; &#xC0C1;&#xD0DC; &#xAD6C;&#xC81C;',content:'&#xCE74;&#xD2B8; &#xAD38;, &#xB3D9;&#xBB3C; &#xAD6C;&#xBA8D;, &#xC218;&#xB9AC; &#xC790;&#xAD6D; &#xB4F1;&#xC5D0;&#xC11C; &#xBB34;&#xBC8C; &#xAD6C;&#xC81C; &#xAC00;&#xB2A5;.',penalty:'&#xBB34;&#xBC8C;'},
{rule:'Rule 17',title:'&#xD398;&#xB110;&#xD2F0; &#xAD6C;&#xC5ED;',content:'&#xBCFC;&#xC774; &#xBE68;&#xAC04; &#xD398;&#xB110;&#xD2F0; &#xAD6C;&#xC5ED;&#xC5D0; &#xC788;&#xC73C;&#xBA74; 1&#xBC8C;&#xD0C0; &#xAD6C;&#xC81C;. &#xBE68;&#xAC04; &#xD398;&#xB110;&#xD2F0; &#xC5D0;&#xC5B4;&#xB9AC;&#xC544;&#xC5D0;&#xC11C; &#xB4DC;&#xB86D;.',penalty:'1&#xBC8C;&#xD0C0; + &#xB4DC;&#xB86D;'},
{rule:'Rule 18',title:'OB / &#xBD84;&#xC2E4;&#xAD6C;',content:'OB: &#xD558;&#xC580; &#xB9D0;&#xB69D;&#xC744; &#xB118;&#xC73C;&#xBA74; 1&#xBC8C;&#xD0C0;+&#xC6D0;&#xB798;&#xC704;&#xCE58; &#xC7AC;&#xD0C0;. &#xBD84;&#xC2E4;&#xAD6C;: 3&#xBD84; &#xB0B4; &#xBABB; &#xCC3E;&#xC73C;&#xBA74; &#xBD84;&#xC2E4;.',penalty:'1&#xBC8C;&#xD0C0; + &#xAC70;&#xB9AC;&#xC640; &#xBC8C;&#xD0C0;'},
{rule:'Rule 19',title:'&#xC5B8;&#xD50C;&#xB808;&#xC774;&#xC5B4;&#xBE14; &#xBCFC;',content:'&#xBCFC;&#xC774; &#xD398;&#xB110;&#xD2F0; &#xAD6C;&#xC5ED;, OB, &#xBB3C;&#xC5D0; &#xC788;&#xC744; &#xB54C;&#xB294; &#xC544;&#xB2CC; &#xBCFC;&#xC744; &#xADF8;&#xB300;&#xB85C; &#xCE58;&#xB294; &#xAC83;&#xC740; &#xB2F9;&#xC5F0; &#xBB34;&#xBC8C;.',penalty:'&#xBB34;&#xBC8C; &#xAD6C;&#xC81C; &#xAC00;&#xB2A5;'},
{rule:'Rule 25',title:'&#xBE44;&#xC815;&#xC0C1;&#xC801; &#xCF54;&#xC2A4; &#xC0C1;&#xD0DC;',content:'&#xC218;&#xB9AC; &#xC911;&#xC778; &#xADF8;&#xB77C;&#xC6B4;&#xB4DC;(GUR), &#xC784;&#xC2DC; &#xBB3C;&#xC6C5;&#xB369;&#xC774;, &#xBC1C;&#xC790;&#xAD6D; &#xCCB4;&#xC784; &#xB4F1;&#xC5D0;&#xC11C;&#xB294; &#xBB34;&#xBC8C; &#xAD6C;&#xC81C; &#xAC00;&#xB2A5;.',penalty:'&#xBB34;&#xBC8C; &#xB4DC;&#xB86D;'}
];

function showRulebook(){
var pn=getPanel('rulebook');
var html='<div class="v9-title">&#x1F4D6; &#xACE8;&#xD504; &#xB8F0;&#xBD81;</div>';

html+='<div class="v9-card"><h3>&#xC8FC;&#xC694; &#xACE8;&#xD504; &#xADDC;&#xCE59; 12&#xC870;&#xD56D;</h3>';
html+='<p>R&amp;A / USGA &#xACE8;&#xD504; &#xADDC;&#xCE59; &#xD575;&#xC2EC; &#xC694;&#xC57D;. &#xB77C;&#xC6B4;&#xB4DC; &#xC911; &#xBE60;&#xB978; &#xCC38;&#xACE0;&#xC6A9;.</p></div>';

for(var rbi=0;rbi<RULEBOOK.length;rbi++){
  var rb=RULEBOOK[rbi];
  html+='<div class="v9-card">';
  html+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">';
  html+='<h3 style="color:#00B4D8">'+rb.rule+': '+rb.title+'</h3>';
  html+='<span class="v9-badge '+(rb.penalty.indexOf('&#xBB34;&#xBC8C;')!==-1?'v9-badge-a':'v9-badge-d')+'">'+rb.penalty+'</span>';
  html+='</div>';
  html+='<p style="line-height:1.7">'+rb.content+'</p>';
  html+='</div>';
}

html+='<div class="v9-card"><h3>&#x1F4A1; &#xBC8C;&#xD0C0; &#xBE60;&#xB978; &#xCC38;&#xACE0;</h3>';
html+='<table class="v9-table"><tr><th>&#xC0C1;&#xD669;</th><th>&#xBC8C;&#xD0C0;</th><th>&#xCC98;&#xB9AC;</th></tr>';
html+='<tr><td>OB</td><td style="color:#ff6b6b">1&#xBC8C;&#xD0C0;</td><td style="color:#aaa;font-size:.8em">&#xC6D0;&#xB798;&#xC704;&#xCE58;&#xC5D0;&#xC11C; &#xC7AC;&#xD0C0;</td></tr>';
html+='<tr><td>&#xC6CC;&#xD130; &#xD574;&#xC800;&#xB4DC;</td><td style="color:#ff6b6b">1&#xBC8C;&#xD0C0;</td><td style="color:#aaa;font-size:.8em">&#xB4DC;&#xB86D; &#xC9C0;&#xC810;&#xC5D0;&#xC11C;</td></tr>';
html+='<tr><td>&#xBC99;&#xCEE4; &#xC5B8;&#xD50C;&#xB808;&#xC774;&#xC5B4;&#xBE14;</td><td style="color:#ff6b6b">1&#xBC8C;&#xD0C0;</td><td style="color:#aaa;font-size:.8em">&#xB4DC;&#xB86D; &#xC9C0;&#xC810;&#xC5D0;&#xC11C;</td></tr>';
html+='<tr><td>&#xBD84;&#xC2E4;&#xAD6C;</td><td style="color:#ff6b6b">1&#xBC8C;&#xD0C0;</td><td style="color:#aaa;font-size:.8em">&#xC6D0;&#xB798;&#xC704;&#xCE58;&#xC5D0;&#xC11C; &#xC7AC;&#xD0C0;</td></tr>';
html+='<tr><td>GUR</td><td style="color:#00FF88">&#xBB34;&#xBC8C;</td><td style="color:#aaa;font-size:.8em">&#xAC00;&#xC7A5; &#xAC00;&#xAE4C;&#xC6B4; &#xAD6C;&#xC81C; &#xC9C0;&#xC810;</td></tr>';
html+='<tr><td>&#xCE74;&#xD2B8; &#xAD38;</td><td style="color:#00FF88">&#xBB34;&#xBC8C;</td><td style="color:#aaa;font-size:.8em">1&#xD074;&#xB7FD; &#xC774;&#xB0B4; &#xAD6C;&#xC81C;</td></tr>';
html+='</table></div>';

pn.innerHTML='<button class="v9-close" onclick="window._v9Close(\'rulebook\')">&times;</button>'+html;
openPanel('rulebook');playSfx('rulebook');lsSet('ach_rulebook_viewed',true);v9CheckAchievements();
}

// ===== 9. EXTRA QUIZ (+15 = 30 total) =====
var V9_QUIZ=[
{q:'&#xACE8;&#xD504;&#xC5D0;&#xC11C; &quot;&#xCF58;&#xB3C4;&#xB974;&quot;&#xB780; &#xBB34;&#xC5C7;&#xC778;&#xAC00;?',o:['Par &#xB300;&#xBE44; 4&#xD0C0; &#xC801;&#xC74C;','&#xD640;&#xC778;&#xC6D0;','&#xC5F0;&#xC18D; &#xBC84;&#xB514;','&#xC54C;&#xBC14;&#xD2B8;&#xB85C;&#xC2A4; &#xB2E4;&#xC74C; &#xB4F1;&#xAE09;'],a:0,explain:'&#xCF58;&#xB3C4;&#xB974;&#xB294; &#xD30C; &#xB300;&#xBE44; 4&#xD0C0; &#xC801;&#xC740; &#xAC83;&#xC73C;&#xB85C; &#xACF5;&#xC2DD; &#xAE30;&#xB85D;&#xC740; &#xC5C6;&#xC2B5;&#xB2C8;&#xB2E4;.'},
{q:'&#xADF8;&#xB9B0;&#xC758; &#xBE60;&#xB974;&#xAE30;&#xB97C; &#xB098;&#xD0C0;&#xB0B4;&#xB294; &#xB2E8;&#xC704;&#xB294;?',o:['MPH','Stimpmeter','FIR','GIR'],a:1,explain:'&#xC2A4;&#xD300;&#xD504;&#xBBF8;&#xD130; &#xAC12;&#xC73C;&#xB85C; &#xADF8;&#xB9B0; &#xC2A4;&#xD53C;&#xB4DC;&#xB97C; &#xCE21;&#xC815;&#xD569;&#xB2C8;&#xB2E4;. PGA Tour &#xD3C9;&#xADE0; 11~12&#xD53C;&#xD2B8;.'},
{q:'&#xB4DC;&#xB85C;&#xC640; &#xD398;&#xC774;&#xB4DC;&#xC758; &#xCC28;&#xC774;&#xB294;?',o:['&#xBCFC; &#xB192;&#xC774;','&#xBCFC;&#xC758; &#xD68C;&#xC804; &#xBC29;&#xD5A5;','&#xD074;&#xB7FD; &#xC885;&#xB958;','&#xC2A4;&#xC724; &#xC18D;&#xB3C4;'],a:1,explain:'&#xB4DC;&#xB85C;&#xB294; &#xC6B0;&#xC5D0;&#xC11C; &#xC88C;&#xB85C;, &#xD398;&#xC774;&#xB4DC;&#xB294; &#xC88C;&#xC5D0;&#xC11C; &#xC6B0;&#xB85C; &#xD68C;&#xC804;&#xD558;&#xB294; &#xAD6C;&#xC9C8;&#xC785;&#xB2C8;&#xB2E4;.'},
{q:'PGA Tour&#xC5D0;&#xC11C; &#xD3C9;&#xADE0; &#xB4DC;&#xB77C;&#xC774;&#xBC84; &#xBE44;&#xAC70;&#xB9AC;&#xB294;?',o:['250yd','270yd','295yd','320yd'],a:2,explain:'2024&#xB144; &#xAE30;&#xC900; PGA Tour &#xD3C9;&#xADE0; &#xB4DC;&#xB77C;&#xC774;&#xBC84; &#xAC70;&#xB9AC;&#xB294; &#xC57D; 295&#xC57C;&#xB4DC;&#xC785;&#xB2C8;&#xB2E4;.'},
{q:'&#xBC14;&#xC6B4;&#xC2A4; &#xAC01;&#xB3C4;&#xAC00; &#xB192;&#xC740; &#xC6E8;&#xC9C0;&#xB294; &#xC5B4;&#xB5A4; &#xC0F7;&#xC5D0; &#xC720;&#xB9AC;&#xD55C;&#xAC00;?',o:['&#xBC99;&#xCEE4; &#xC0F7;','&#xD37C;&#xD305;','&#xD2F0;&#xC0F7;','&#xCE69;&#xC0F7;'],a:0,explain:'&#xB192;&#xC740; &#xBC14;&#xC6B4;&#xC2A4;(12~16&#xB3C4;)&#xB294; &#xBAA8;&#xB798;&#xB97C; &#xD30C;&#xACE0; &#xC62C;&#xB77C;&#xAC00;&#xB294; &#xBC99;&#xCEE4; &#xC0F7;&#xC5D0; &#xD6A8;&#xACFC;&#xC801;&#xC785;&#xB2C8;&#xB2E4;.'},
{q:'MOI(Moment of Inertia)&#xAC00; &#xB192;&#xC740; &#xD074;&#xB7FD;&#xC758; &#xD2B9;&#xC9D5;&#xC740;?',o:['&#xBE44;&#xAC70;&#xB9AC; &#xC99D;&#xAC00;','&#xC2A4;&#xD540; &#xC99D;&#xAC00;','&#xAD00;&#xC6A9;&#xC131; &#xC99D;&#xAC00;','&#xACBD;&#xB7C9;&#xD654;'],a:2,explain:'MOI&#xAC00; &#xB192;&#xC73C;&#xBA74; &#xBE57;&#xB9DE;&#xC544;&#xB3C4; &#xD5E4;&#xB4DC;&#xAC00; &#xB36E; &#xD2C0;&#xC5B4;&#xC838; &#xBC29;&#xD5A5;&#xC774; &#xB36E; &#xBCC0;&#xD569;&#xB2C8;&#xB2E4;.'},
{q:'&#xACE8;&#xD504;&#xC5D0;&#xC11C; &quot;&#xB808;&#xC774;&#xC5C5;&quot;&#xC774;&#xB780;?',o:['&#xACF5;&#xC774; &#xB0A0;&#xC544;&#xAC04; &#xAC70;&#xB9AC;','&#xADF8;&#xB9B0; &#xC55E;&#xC5D0; &#xACF5;&#xC744; &#xB193;&#xB294; &#xAC83;','&#xC11C;&#xBE0C; &#xD50C;&#xB808;&#xC774;&#xC5B4;','&#xD3C9;&#xD589; &#xBCF4;&#xD589;'],a:1,explain:'&#xB808;&#xC774;&#xC5C5;&#xC740; &#xADF8;&#xB9B0;&#xC744; &#xC9C1;&#xC811; &#xB178;&#xB9AC;&#xC9C0; &#xC54A;&#xACE0; &#xC55E;&#xC5D0; &#xACF5;&#xC744; &#xB193;&#xB294; &#xC804;&#xB7B5;&#xC785;&#xB2C8;&#xB2E4;.'},
{q:'PGA Tour &#xD3C9;&#xADE0; GIR(Green in Regulation) &#xBE44;&#xC728;&#xC740;?',o:['50%','55%','65%','75%'],a:2,explain:'PGA Tour &#xD3C9;&#xADE0; GIR &#xBE44;&#xC728;&#xC740; &#xC57D; 65%&#xC785;&#xB2C8;&#xB2E4;.'},
{q:'&#xB4DC;&#xB77C;&#xC774;&#xBC84;&#xC758; &#xC774;&#xC0C1;&#xC801;&#xC778; &#xC2A4;&#xD540;&#xB960;(RPM)&#xC740;?',o:['1,000 &#xC774;&#xD558;','2,000~2,800','3,500~4,500','5,000+'],a:1,explain:'&#xB4DC;&#xB77C;&#xC774;&#xBC84; &#xAE30;&#xC900; 2,000~2,800 RPM&#xC774; &#xCD5C;&#xC801; &#xBC31;&#xC2A4;&#xD540;&#xC785;&#xB2C8;&#xB2E4;.'},
{q:'&#xACE8;&#xD504;&#xC5D0;&#xC11C; &quot;&#xD504;&#xB9AC;&#xC0F7; &#xB8E8;&#xD2F4;&quot;&#xC774; &#xC911;&#xC694;&#xD55C; &#xC774;&#xC720;&#xB294;?',o:['&#xBE44;&#xAC70;&#xB9AC; &#xC99D;&#xAC00;','&#xC77C;&#xAD00;&#xC131;&#xACFC; &#xC9D1;&#xC911;&#xB825;','&#xC2A4;&#xC724; &#xC18D;&#xB3C4; &#xC99D;&#xAC00;','&#xCCB4;&#xB825; &#xC808;&#xC57D;'],a:1,explain:'&#xD504;&#xB9AC;&#xC0F7; &#xB8E8;&#xD2F4;&#xC740; &#xC2AC;&#xD6C8;&#xC758; &#xC77C;&#xAD00;&#xC131;&#xACFC; &#xC2EC;&#xB9AC;&#xC801; &#xC548;&#xC815;&#xC744; &#xC81C;&#xACF5;&#xD569;&#xB2C8;&#xB2E4;.'},
{q:'&#xACE8;&#xD504;&#xACF5;&#xC758; &#xB518;&#xD50C; &#xC218;&#xAC00; &#xBE44;&#xAC70;&#xB9AC;&#xC5D0; &#xBBF8;&#xCE58;&#xB294; &#xC601;&#xD5A5;&#xC740;?',o:['&#xC601;&#xD5A5; &#xC5C6;&#xC74C;','&#xACF5;&#xAE30;&#xC800;&#xD56D; &#xAC10;&#xC18C;','&#xC2A4;&#xD540; &#xC99D;&#xAC00;','&#xB519;&#xBE60; &#xD68C;&#xC804;'],a:1,explain:'&#xB518;&#xD50C;&#xC740; &#xACF5;&#xAE30; &#xC800;&#xD56D;&#xC744; &#xC904;&#xC5EC; &#xBCFC;&#xC774; &#xB354; &#xBA40;&#xB9AC; &#xB0A0;&#xC544;&#xAC00;&#xAC8C; &#xD569;&#xB2C8;&#xB2E4;.'},
{q:'&#xACE8;&#xD504; &#xD074;&#xB7FD; &#xD53C;&#xD305;&#xC5D0;&#xC11C; &quot;&#xD50C;&#xB809;&#xC2A4;&quot;&#xB780;?',o:['&#xD074;&#xB7FD; &#xBB34;&#xAC8C;','&#xC0E4;&#xD504;&#xD2B8; &#xD720;&#xC5B4;&#xC9C0;&#xB294; &#xC815;&#xB3C4;','&#xADF8;&#xB9BD; &#xD06C;&#xAE30;','&#xD5E4;&#xB4DC; &#xC7AC;&#xC9C8;'],a:1,explain:'&#xD50C;&#xB809;&#xC2A4;&#xB294; &#xC0E4;&#xD504;&#xD2B8;&#xC758; &#xD720;&#xC5B4;&#xC9C0;&#xB294; &#xC815;&#xB3C4;&#xB85C; &#xC2A4;&#xC724; &#xC18D;&#xB3C4;&#xC5D0; &#xB9DE;&#xCDB0; &#xC120;&#xD0DD;&#xD569;&#xB2C8;&#xB2E4;.'},
{q:'18&#xD640; &#xB77C;&#xC6B4;&#xB4DC;&#xC5D0;&#xC11C; &#xBCF4;&#xAE30;&#xD504;&#xB9AC; &#xACE8;&#xD504;&#xB780;?',o:['&#xBAA8;&#xB4E0; &#xD640; &#xBC84;&#xB514;','&#xBAA8;&#xB4E0; &#xD640; &#xD30C;','&#xBAA8;&#xB4E0; &#xD640; &#xBCF4;&#xAE30; &#xC774;&#xD558;','&#xD640;&#xC778;&#xC6D0; &#xD3EC;&#xD568;'],a:2,explain:'&#xBCF4;&#xAE30;&#xD504;&#xB9AC; &#xACE8;&#xD504;&#xB294; 18&#xD640; &#xC804;&#xBD80; &#xBCF4;&#xAE30; &#xC774;&#xD558;&#xB85C; &#xD50C;&#xB808;&#xC774;&#xD558;&#xB294; &#xAC83;&#xC785;&#xB2C8;&#xB2E4;.'},
{q:'Strokes Gained &#xBD84;&#xC11D;&#xC5D0;&#xC11C; &#xAC00;&#xC7A5; &#xC911;&#xC694;&#xD55C; &#xC601;&#xC5ED;&#xC740;?',o:['&#xD2F0;&#xC0F7;','&#xC5B4;&#xD504;&#xB85C;&#xCE58;','&#xC1FC;&#xD2B8;&#xAC8C;&#xC784;','&#xD37C;&#xD305;'],a:1,explain:'&#xD1B5;&#xACC4;&#xC801;&#xC73C;&#xB85C; &#xC5B4;&#xD504;&#xB85C;&#xCE58; &#xC601;&#xC5ED;&#xC774; &#xC2A4;&#xCF54;&#xC5B4;&#xC5D0; &#xAC00;&#xC7A5; &#xD070; &#xC601;&#xD5A5;&#xC744; &#xBBF8;&#xCE69;&#xB2C8;&#xB2E4;.'},
{q:'&#xACE8;&#xD504; &#xCF54;&#xC2A4; &#xB808;&#xC774;&#xD305;&#xC774;&#xB780;?',o:['&#xCF54;&#xC2A4; &#xAC00;&#xACA9;','&#xC2A4;&#xD06C;&#xB798;&#xCE58; &#xACE8;&#xD37C; &#xC608;&#xC0C1; &#xD0C0;&#xC218;','&#xACBD;&#xC0AC;&#xB3C4;','&#xCF54;&#xC2A4; &#xB09C;&#xC774;&#xB3C4; &#xB4F1;&#xAE09;'],a:1,explain:'&#xCF54;&#xC2A4; &#xB808;&#xC774;&#xD305;&#xC740; &#xC2A4;&#xD06C;&#xB798;&#xCE58; &#xACE8;&#xD37C;&#xC758; &#xC608;&#xC0C1; &#xD0C0;&#xC218;&#xC785;&#xB2C8;&#xB2E4;(&#xBCF4;&#xD1B5; 68~76).'}
];

function showV9Quiz(){
var pn=getPanel('v9quiz');
var qs=lsGet('v9quiz_state',{current:0,correct:0,answered:[]});
var html='<div class="v9-title">&#x1F4DD; &#xACE8;&#xD504; &#xC2EC;&#xD654; &#xD034;&#xC988; v2</div>';

if(qs.answered.length>=V9_QUIZ.length){
  var grade=qs.correct>=14?'S':qs.correct>=12?'A':qs.correct>=10?'B':qs.correct>=7?'C':'D';
  var gcolor=grade==='S'?'#00FF88':grade==='A'?'#00B4D8':grade==='B'?'#FFC107':'#ff6b6b';
  html+='<div class="v9-card" style="text-align:center"><div style="font-size:3em;margin-bottom:8px">&#x1F3C6;</div>';
  html+='<h3>&#xD034;&#xC988; &#xC644;&#xB8CC;!</h3>';
  html+='<div style="font-size:2.5em;font-weight:800;color:'+gcolor+';margin:12px 0">'+grade+'</div>';
  html+='<div style="color:#aaa">'+qs.correct+' / '+V9_QUIZ.length+' &#xC815;&#xB2F5;</div>';
  html+='<button class="v9-btn v9-btn-primary" style="margin-top:16px" onclick="window._v9ResetV9Quiz()">&#xB2E4;&#xC2DC; &#xB3C4;&#xC804;</button></div>';
} else {
  var qi=qs.current;var q=V9_QUIZ[qi];
  html+='<div style="text-align:center;margin-bottom:12px;color:#888;font-size:.85em">&#xBB38;&#xC81C; '+(qi+1)+' / '+V9_QUIZ.length+' &middot; &#xC815;&#xB2F5; '+qs.correct+'&#xAC1C;</div>';
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
qs.answered.push(ok);if(ok){qs.correct++;playSfx('v9_quiz_correct');showToast('&#x2705; &#xC815;&#xB2F5;!')}
else{playSfx('rulebook');showToast('&#x274C; '+q.explain)}
qs.current++;lsSet('v9quiz_state',qs);
setTimeout(function(){showV9Quiz()},800);v9CheckAchievements();
};
window._v9ResetV9Quiz=function(){lsSet('v9quiz_state',{current:0,correct:0,answered:[]});showV9Quiz()};

// ===== ACHIEVEMENTS (+12) =====
var V9_ACHIEVEMENTS=[
{id:'v9_first_scorecard',name:'&#xCCAB; &#xC2A4;&#xCF54;&#xC5B4;&#xCE74;&#xB4DC;',desc:'18&#xD640; &#xB77C;&#xC6B4;&#xB4DC; 1&#xD68C; &#xC644;&#xB8CC;',icon:'&#x1F3C1;',check:function(){return lsGet('scorecard_rounds',[]).length>=1}},
{id:'v9_5_rounds',name:'&#xB77C;&#xC6B4;&#xB4DC; &#xCF5C;&#xB809;&#xD130;',desc:'5&#xD68C; &#xB77C;&#xC6B4;&#xB4DC; &#xC644;&#xB8CC;',icon:'&#x1F3CC;&#xFE0F;',check:function(){return lsGet('scorecard_rounds',[]).length>=5}},
{id:'v9_sg_analyzer',name:'SG &#xBD84;&#xC11D;&#xAC00;',desc:'Strokes Gained &#xCCAB; &#xBD84;&#xC11D;',icon:'&#x1F4CA;',check:function(){return lsGet('sg_data',{records:[]}).records.length>=1}},
{id:'v9_putt_50',name:'&#xD37C;&#xD305; &#xB9C8;&#xC2A4;&#xD130;',desc:'&#xD37C;&#xD305; 50&#xD68C; &#xAE30;&#xB85D;',icon:'&#x1F3AF;',check:function(){return lsGet('putt_data',[]).length>=50}},
{id:'v9_course_viewer',name:'&#xC804;&#xB7B5;&#xAC00;',desc:'&#xCF54;&#xC2A4; &#xC804;&#xB7B5; &#xC2DC;&#xBBAC;&#xB808;&#xC774;&#xD130; &#xC870;&#xD68C;',icon:'&#x1F3CC;&#xFE0F;',check:function(){return lsGet('ach_course_viewed',false)}},
{id:'v9_calibrated',name:'&#xCE98;&#xB9AC;&#xBE0C;&#xB808;&#xC774;&#xC158; &#xC644;&#xB8CC;',desc:'&#xD074;&#xB7FD; &#xAC70;&#xB9AC; &#xCE98;&#xB9AC;&#xBE0C;&#xB808;&#xC774;&#xC158;',icon:'&#x1F4CF;',check:function(){return lsGet('club_calibration',null)!==null}},
{id:'v9_fitness_4',name:'&#xD53C;&#xD2B8;&#xB2C8;&#xC2A4; &#xD314;&#xBC18;',desc:'&#xD558;&#xB8E8; 4&#xAC1C; &#xC6B4;&#xB3D9; &#xC644;&#xB8CC;',icon:'&#x1F3CB;&#xFE0F;',check:function(){var log=lsGet('fitness_log',[]);var today=todayStr();return log.filter(function(l){return l.date===today}).length>=4}},
{id:'v9_journal_writer',name:'&#xC77C;&#xC9C0; &#xC791;&#xC131;&#xC790;',desc:'&#xB77C;&#xC6B4;&#xB4DC; &#xC77C;&#xC9C0; 5&#xAC74; &#xC791;&#xC131;',icon:'&#x1F4D3;',check:function(){return lsGet('journal_entries',[]).length>=5}},
{id:'v9_rulebook_reader',name:'&#xB8F0; &#xB9C8;&#xC2A4;&#xD130;',desc:'&#xACE8;&#xD504; &#xB8F0;&#xBD81; &#xC870;&#xD68C;',icon:'&#x1F4D6;',check:function(){return lsGet('ach_rulebook_viewed',false)}},
{id:'v9_quiz_v2_perfect',name:'&#xD034;&#xC988; v2 &#xB9CC;&#xC810;',desc:'&#xC2EC;&#xD654; &#xD034;&#xC988; 15&#xBB38;&#xC81C; &#xC804;&#xBD80; &#xC815;&#xB2F5;',icon:'&#x1F4DD;',check:function(){var qs=lsGet('v9quiz_state',{});return qs.correct>=15&&(qs.answered||[]).length>=15}},
{id:'v9_putt_3ft_90',name:'3&#xD53C;&#xD2B8; &#xB2EC;&#xC778;',desc:'3ft &#xC774;&#xD558; &#xD37C;&#xD305; &#xC131;&#xACF5;&#xB960; 90%+',icon:'&#x2B50;',check:function(){var data=lsGet('putt_data',[]).filter(function(p){return p.dist<=3});if(data.length<10)return false;return data.filter(function(p){return p.result==='made'}).length/data.length>=0.9}},
{id:'v9_all_features',name:'v9 &#xD0D0;&#xD5D8;&#xAC00;',desc:'v9 &#xC804;&#xCCB4; &#xAE30;&#xB2A5; &#xD0D0;&#xC0C9;',icon:'&#x1F30D;',check:function(){return lsGet('scorecard_rounds',[]).length>=1&&lsGet('sg_data',{records:[]}).records.length>=1&&lsGet('putt_data',[]).length>=1&&lsGet('club_calibration',null)!==null&&lsGet('journal_entries',[]).length>=1&&lsGet('ach_rulebook_viewed',false)&&lsGet('ach_course_viewed',false)}}
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
  {icon:'&#x1F4CB;',title:'&#xC2A4;&#xCF54;&#xC5B4;&#xCE74;&#xB4DC; (Shift+1)',fn:'showScorecard'},
  {icon:'&#x1F4CA;',title:'SG &#xBD84;&#xC11D; (Shift+2)',fn:'showStrokesGained'},
  {icon:'&#x1F3AF;',title:'&#xD37C;&#xD305; (Shift+3)',fn:'showPuttingAnalyzer'},
  {icon:'&#x1F3CC;&#xFE0F;',title:'&#xCF54;&#xC2A4;&#xC804;&#xB7B5; (Shift+4)',fn:'showCourseSim'},
  {icon:'&#x1F4CF;',title:'&#xCE98;&#xB9AC;&#xBE0C;&#xB808;&#xC774;&#xC158; (Shift+5)',fn:'showCalibration'},
  {icon:'&#x1F3CB;&#xFE0F;',title:'&#xD53C;&#xD2B8;&#xB2C8;&#xC2A4; (Shift+6)',fn:'showFitness'},
  {icon:'&#x1F4D3;',title:'&#xC77C;&#xC9C0; (Shift+7)',fn:'showJournal'},
  {icon:'&#x1F4D6;',title:'&#xB8F0;&#xBD81; (Shift+8)',fn:'showRulebook'}
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
