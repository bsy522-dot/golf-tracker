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
var html='<div class="v10-title">&#x1F3AF; &#xB4DC;&#xB77C;&#xC774;&#xBE59; &#xB808;&#xC778;&#xC9C0; &#xD2B8;&#xB798;&#xCEE4;</div>';

if(active){
  var elapsed=Math.floor((Date.now()-active.startTime)/60000);
  var totalShots=0;for(var k in active.shots)totalShots+=active.shots[k];
  html+='<div class="v10-card" style="border-left:3px solid #00FF88">';
  html+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">';
  html+='<div><div style="font-weight:700;color:#00FF88">&#xC5F0;&#xC2B5; &#xC911;</div>';
  html+='<div style="font-size:.75em;color:#888">'+elapsed+'&#xBD84; &#xACBD;&#xACFC;</div></div>';
  html+='<div style="text-align:right"><div style="font-size:2em;font-weight:800;color:#00B4D8">'+totalShots+'</div>';
  html+='<div style="font-size:.75em;color:#888">&#xCD1D; &#xC0F7;</div></div></div>';

  html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:12px">';
  if(active.target)html+='<div class="v10-mini-stat"><div class="v10-mini-val">'+active.target+'</div><div class="v10-mini-label">&#xBAA9;&#xD45C;</div></div>';
  html+='<div class="v10-mini-stat"><div class="v10-mini-val">'+Object.keys(active.shots).filter(function(k2){return active.shots[k2]>0}).length+'</div><div class="v10-mini-label">&#xD074;&#xB7FD; &#xC885;&#xB958;</div></div>';
  html+='<div class="v10-mini-stat"><div class="v10-mini-val">'+elapsed+'m</div><div class="v10-mini-label">&#xC2DC;&#xAC04;</div></div>';
  html+='</div>';

  html+='<div style="font-weight:600;margin-bottom:8px;color:#00B4D8">&#xD074;&#xB7FD;&#xBCC4; &#xC0F7; &#xAE30;&#xB85D;</div>';
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
  html+='<button class="v10-btn v10-btn-primary" style="width:100%;margin-top:12px" onclick="window._v10EndRange()">&#x1F3C1; &#xC5F0;&#xC2B5; &#xC885;&#xB8CC;</button>';
  html+='</div>';
} else {
  html+='<div class="v10-card"><h3>&#x2795; &#xC0C8; &#xC5F0;&#xC2B5; &#xC138;&#xC158;</h3>';
  html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">';
  html+='<div><label class="v10-label">&#xC5F0;&#xC2B5;&#xC7A5;</label><input id="v10-rg-loc" class="v10-input" type="text" placeholder="&#xC5F0;&#xC2B5;&#xC7A5; &#xC774;&#xB984;" maxlength="25"></div>';
  html+='<div><label class="v10-label">&#xBAA9;&#xD45C;</label><select id="v10-rg-target" class="v10-input"><option value="distance">&#xBE44;&#xAC70;&#xB9AC; &#xD5A5;&#xC0C1;</option><option value="accuracy">&#xC815;&#xD655;&#xB3C4; &#xD5A5;&#xC0C1;</option><option value="short">&#xC1FC;&#xD2B8;&#xAC8C;&#xC784;</option><option value="putting">&#xD37C;&#xD305; &#xC5F0;&#xC2B5;</option><option value="full">&#xC885;&#xD569; &#xC5F0;&#xC2B5;</option></select></div>';
  html+='</div>';
  html+='<button class="v10-btn v10-btn-primary" style="width:100%;margin-top:12px" onclick="window._v10StartRange()">&#xC5F0;&#xC2B5; &#xC2DC;&#xC791;</button></div>';
}

if(sessions.length>0){
  html+='<div class="v10-card"><h3>&#x1F4C5; &#xC5F0;&#xC2B5; &#xC774;&#xB825; ('+sessions.length+'&#xD68C;)</h3>';
  for(var si=sessions.length-1;si>=Math.max(0,sessions.length-8);si--){
    var ss=sessions[si];var stot=0;for(var sk in ss.shots)stot+=ss.shots[sk];
    html+='<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.04)">';
    html+='<div><span style="color:#00FF88;font-weight:600">'+(ss.location||'&#xC5F0;&#xC2B5;&#xC7A5;')+'</span> <span style="color:#666;font-size:.8em">'+ss.date+'</span></div>';
    html+='<div style="color:#00B4D8;font-weight:700">'+stot+'&#xC0F7; / '+ss.duration+'&#xBD84;</div>';
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
showToast('&#x1F3AF; &#xC5F0;&#xC2B5; &#xC138;&#xC158; &#xC2DC;&#xC791;!');showRange();
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
showToast('&#x1F3C1; &#xC5F0;&#xC2B5; &#xC885;&#xB8CC;! ('+duration+'&#xBD84;)');showRange();v10CheckAch();
};

// ===== 2. ROUND STATISTICS DASHBOARD =====
function showStats(){
var pn=getPanel('stats');
var rounds=[];
try{var r9=localStorage.getItem('gt_v9_scorecard_rounds');if(r9)rounds=JSON.parse(r9)}catch(e){}
var html='<div class="v10-title">&#x1F4C8; &#xB77C;&#xC6B4;&#xB4DC; &#xD1B5;&#xACC4; &#xB300;&#xC2DC;&#xBCF4;&#xB4DC;</div>';

if(rounds.length===0){
  html+='<div class="v10-card"><p>&#xC2A4;&#xCF54;&#xC5B4;&#xCE74;&#xB4DC;&#xC5D0; &#xB77C;&#xC6B4;&#xB4DC;&#xB97C; &#xAE30;&#xB85D;&#xD558;&#xBA74; &#xD1B5;&#xACC4;&#xAC00; &#xD45C;&#xC2DC;&#xB429;&#xB2C8;&#xB2E4;.</p></div>';
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

    html+='<div class="v10-card"><h3>&#x1F4CA; &#xC2A4;&#xCF54;&#xC5B4; &#xD2B8;&#xB80C;&#xB4DC;</h3>';
    html+='<canvas id="v10-stats-canvas" width="520" height="260" style="width:100%;height:auto;border-radius:12px"></canvas></div>';

    var trend=scores.length>=3?(scores[scores.length-1]<scores[scores.length-3]?'improving':'declining'):'insufficient';
    html+='<div class="v10-card" style="border-left:3px solid '+(trend==='improving'?'#00FF88':'#ff6b6b')+'">';
    html+='<h3>'+(trend==='improving'?'&#x2B06;&#xFE0E; &#xC0C1;&#xC2B9; &#xCD94;&#xC138;':'&#x2B07;&#xFE0E; &#xD558;&#xB77D; &#xCD94;&#xC138;')+'</h3>';
    html+='<p>&#xCD5C;&#xADFC; 3&#xB77C;&#xC6B4;&#xB4DC; &#xD3C9;&#xADE0;: '+Math.round((scores.slice(-3).reduce(function(a,b){return a+b},0)/Math.min(3,scores.length))*10)/10+'&#xD0C0;</p>';
    html+='</div>';
  }
}

html+='<div class="v10-card"><h3>&#x1F4A1; &#xD1B5;&#xACC4; &#xAC00;&#xC774;&#xB4DC;</h3>';
html+='<table class="v10-table"><tr><th>&#xC9C0;&#xD45C;</th><th>&#xC544;&#xB9C8;&#xCD94;&#xC5B4;</th><th>&#xC2B1;&#xAE00;</th><th>PGA</th></tr>';
html+='<tr><td>&#xD3C9;&#xADE0; &#xC2A4;&#xCF54;&#xC5B4;</td><td style="color:#888">90~100</td><td style="color:#FFC107">80~85</td><td style="color:#00FF88">68~72</td></tr>';
html+='<tr><td>&#xD3C9;&#xADE0; &#xD37C;&#xD305;</td><td style="color:#888">34~38</td><td style="color:#FFC107">30~32</td><td style="color:#00FF88">28~30</td></tr>';
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
var html='<div class="v10-title">&#x1F4D0; &#xCF54;&#xC2A4; &#xD578;&#xB514;&#xCE61; &#xBCC0;&#xD658;&#xAE30;</div>';

html+='<div class="v10-card"><h3>WHS &#xD578;&#xB514;&#xCE61; &#xC778;&#xB371;&#xC2A4; &rarr; &#xCF54;&#xC2A4; HC</h3>';
html+='<p style="margin-bottom:12px">World Handicap System&#xC5D0; &#xB530;&#xB77C; &#xCF54;&#xC2A4;&#xBCC4; &#xD578;&#xB514;&#xCE61;&#xC744; &#xACC4;&#xC0B0;&#xD569;&#xB2C8;&#xB2E4;.</p>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">';
html+='<div><label class="v10-label">HC &#xC778;&#xB371;&#xC2A4;</label><input id="v10-hc-idx" class="v10-input" type="number" step="0.1" min="0" max="54" value="18.0"></div>';
html+='<div><label class="v10-label">&#xC2AC;&#xB85C;&#xD504; &#xB808;&#xC774;&#xD305;</label><input id="v10-hc-slope" class="v10-input" type="number" min="55" max="155" value="113"></div>';
html+='<div><label class="v10-label">&#xCF54;&#xC2A4; &#xB808;&#xC774;&#xD305;</label><input id="v10-hc-cr" class="v10-input" type="number" step="0.1" min="60" max="80" value="72.0"></div>';
html+='</div>';
html+='<div style="margin-top:8px"><label class="v10-label">Par</label><input id="v10-hc-par" class="v10-input" type="number" min="68" max="76" value="72" style="width:120px"></div>';
html+='<button class="v10-btn v10-btn-primary" style="width:100%;margin-top:12px" onclick="window._v10CalcHC()">&#xCF54;&#xC2A4; HC &#xACC4;&#xC0B0;</button></div>';

html+='<div id="v10-hc-result"></div>';

html+='<div class="v10-card"><h3>&#x1F4D6; &#xC2AC;&#xB85C;&#xD504; &#xB808;&#xC774;&#xD305; &#xCC38;&#xACE0;</h3>';
html+='<table class="v10-table"><tr><th>&#xB09C;&#xC774;&#xB3C4;</th><th>&#xC2AC;&#xB85C;&#xD504;</th><th>&#xC608;&#xC2DC;</th></tr>';
html+='<tr><td style="color:#00FF88">&#xC27C;&#xC6C0;</td><td>55~90</td><td style="color:#aaa;font-size:.8em">&#xD3C9;&#xD0C4;&#xD55C; &#xCF54;&#xC2A4;</td></tr>';
html+='<tr><td style="color:#FFC107">&#xBCF4;&#xD1B5;</td><td>91~120</td><td style="color:#aaa;font-size:.8em">&#xC77C;&#xBC18;&#xC801;&#xC778; &#xCF54;&#xC2A4;</td></tr>';
html+='<tr><td style="color:#FF9800">&#xC5B4;&#xB824;&#xC6C0;</td><td>121~140</td><td style="color:#aaa;font-size:.8em">&#xCC4C;&#xB9B0;&#xC9C0; &#xCF54;&#xC2A4;</td></tr>';
html+='<tr><td style="color:#ff6b6b">&#xB9E4;&#xC6B0; &#xC5B4;&#xB824;&#xC6C0;</td><td>141~155</td><td style="color:#aaa;font-size:.8em">&#xCC54;&#xD53C;&#xC5B8;&#xC2ED; &#xCF54;&#xC2A4;</td></tr>';
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
rhtml+='<div><div style="font-size:1.3em;font-weight:700;color:#00B4D8">'+targetScore+'</div><div style="font-size:.7em;color:#888">&#xBAA9;&#xD45C; &#xC2A4;&#xCF54;&#xC5B4;</div></div>';
rhtml+='<div><div style="font-size:1.3em;font-weight:700;color:#FFC107">'+Math.round(courseHC/18*10)/10+'</div><div style="font-size:.7em;color:#888">&#xD640;&#xB2F9; &#xD578;&#xB514;</div></div>';
rhtml+='<div><div style="font-size:1.3em;font-weight:700;color:#E040FB">'+netDouble+'</div><div style="font-size:.7em;color:#888">&#xB137;&#xB354;&#xBE14;&#xBCF4;&#xAE30;</div></div>';
rhtml+='</div></div>';

rhtml+='<div class="v10-card"><h3>&#xD640;&#xBCC4; &#xD578;&#xB514;&#xCE61; &#xBC30;&#xBD84;</h3>';
rhtml+='<p style="margin-bottom:8px">&#xCF54;&#xC2A4; HC '+courseHC+' &#xAE30;&#xC900;, &#xB09C;&#xC774;&#xB3C4; &#xC21C;&#xC73C;&#xB85C; &#xD640;&#xBCC4; 1&#xD0C0;&#xC529; &#xBC30;&#xBD84;:</p>';
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
var html='<div class="v10-title">&#x1F3CC;&#xFE0F; &#xC0F7; &#xC170;&#xC774;&#xD504; &#xBD84;&#xC11D;&#xAE30;</div>';

html+='<div class="v10-card"><h3>&#x2795; &#xC0F7; &#xAE30;&#xB85D;</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">';
html+='<div><label class="v10-label">&#xD074;&#xB7FD;</label><select id="v10-ss-club" class="v10-input">';
for(var ci2=0;ci2<RANGE_CLUBS.length;ci2++)html+='<option>'+RANGE_CLUBS[ci2]+'</option>';
html+='</select></div>';
html+='<div><label class="v10-label">&#xC0F7; &#xD615;&#xD0DC;</label><select id="v10-ss-shape" class="v10-input">';
for(var si5=0;si5<SHOT_SHAPES.length;si5++)html+='<option value="'+si5+'">'+SHOT_SHAPES[si5]+'</option>';
html+='</select></div>';
html+='</div>';
html+='<button class="v10-btn v10-btn-primary" style="width:100%;margin-top:12px" onclick="window._v10RecordShape()">&#xC0F7; &#xAE30;&#xB85D;</button></div>';

html+='<canvas id="v10-shape-canvas" width="480" height="300" style="width:100%;height:auto;border-radius:12px;margin-bottom:12px"></canvas>';

if(data.length>0){
  var counts=[];for(var i=0;i<SHOT_SHAPES.length;i++)counts.push(0);
  for(var di=0;di<data.length;di++)counts[data[di].shape]++;
  var dominant=counts.indexOf(Math.max.apply(null,counts));
  html+='<div class="v10-card" style="border-left:3px solid '+SHAPE_COLORS[dominant]+'">';
  html+='<h3>&#xC8FC;&#xB825; &#xC0F7;: <span style="color:'+SHAPE_COLORS[dominant]+'">'+SHOT_SHAPES[dominant]+'</span></h3>';
  html+='<p>'+data.length+'&#xAC1C; &#xC0F7; &#xC911; '+counts[dominant]+'&#xD68C; ('+Math.round(counts[dominant]/data.length*100)+'%)</p>';

  var goodShots=counts[0]+counts[1]+counts[2];
  var pct=Math.round(goodShots/data.length*100);
  html+='<div style="margin-top:8px"><div style="display:flex;justify-content:space-between;margin-bottom:4px"><span style="font-size:.8em;color:#888">&#xC88B;&#xC740; &#xC0F7; &#xBE44;&#xC728;</span><span style="color:'+(pct>=60?'#00FF88':'#ff6b6b')+'">'+pct+'%</span></div>';
  html+='<div style="height:8px;background:rgba(255,255,255,.05);border-radius:4px;overflow:hidden">';
  html+='<div style="width:'+pct+'%;height:100%;background:'+(pct>=60?'#00FF88':'#ff6b6b')+';border-radius:4px"></div>';
  html+='</div></div></div>';

  html+='<div class="v10-card"><h3>&#xC0F7; &#xBD84;&#xD3EC;</h3>';
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
{name:'&#xC2A4;&#xD2B8;&#xB808;&#xCE6D;',duration:300,desc:'&#xBAA9;/&#xC5B4;&#xAE68;/&#xD5C8;&#xB9AC;/&#xACE0;&#xAD00;&#xC808; &#xC2A4;&#xD2B8;&#xB808;&#xCE6D; 5&#xBD84;',icon:'&#x1F9D8;',detail:'&#xBAA9; &#xC88C;&#xC6B0; &#xD68C;&#xC804; 10&#xD68C; &rarr; &#xC5B4;&#xAE68; &#xD68C;&#xC804; 10&#xD68C; &rarr; &#xD5C8;&#xB9AC; &#xD68C;&#xC804; 10&#xD68C; &rarr; &#xACE0;&#xAD00;&#xC808; &#xC5F4;&#xAE30; &#xC88C;&#xC6B0; 15&#xCD08;'},
{name:'&#xD37C;&#xD305; &#xC6CC;&#xBC0D;&#xC5C5;',duration:300,desc:'3ft &rarr; 6ft &rarr; 10ft &#xC21C;&#xC11C;&#xB85C; 5&#xBCFC;&#xC529;',icon:'&#x1F3AF;',detail:'3ft 5&#xBCFC; (&#xAC70;&#xB9AC;&#xAC10; &#xD655;&#xC778;) &rarr; 6ft 5&#xBCFC; (&#xBC29;&#xD5A5;) &rarr; 10ft 5&#xBCFC; (&#xD130;&#xCE58;)'},
{name:'&#xCE69;/&#xD53C;&#xCE58; &#xC5F0;&#xC2B5;',duration:300,desc:'SW/GW&#xB85C; 20~50yd &#xD0C0;&#xAC8F; &#xC5F0;&#xC2B5;',icon:'&#x26F3;',detail:'SW 20yd 5&#xBC1C; &rarr; GW 40yd 5&#xBC1C; &rarr; PW 50yd 5&#xBC1C;. &#xB0B4;&#xB824;&#xCE58;&#xB294; &#xB290;&#xB08C;&#xC5D0; &#xC9D1;&#xC911;'},
{name:'&#xC544;&#xC774;&#xC5B8; &#xC2A4;&#xC719;',duration:300,desc:'9I &rarr; 7I &rarr; 5I &#xAC01; 5&#xBC1C;&#xC529;',icon:'&#x1F3CC;&#xFE0F;',detail:'9I 5&#xBC1C; (3/4 &#xC2A4;&#xC719;) &rarr; 7I 5&#xBC1C; (&#xD480;&#xC2A4;&#xC719;) &rarr; 5I 5&#xBC1C;. &#xD0C0;&#xAC9F; &#xC124;&#xC815; &#xD544;&#xC218;'},
{name:'&#xC6B0;&#xB4DC;/&#xB4DC;&#xB77C;&#xC774;&#xBC84;',duration:240,desc:'3W 3&#xBC1C; &rarr; Driver 5&#xBC1C; &#xC810;&#xC9C4;&#xC801;',icon:'&#x1F680;',detail:'3W 3&#xBC1C; (70% &#xD30C;&#xC6CC;) &rarr; Driver 3&#xBC1C; (80%) &rarr; Driver 2&#xBC1C; (&#xD480;&#xC2A4;&#xC719;)'},
{name:'&#xB9C8;&#xC778;&#xB4DC; &#xC138;&#xD305;',duration:120,desc:'&#xD638;&#xD761;&#xBC95; + &#xC2DC;&#xAC01;&#xD654; + &#xD504;&#xB9AC;&#xC0F7; &#xB8E8;&#xD2F4; &#xD655;&#xC778;',icon:'&#x1F9E0;',detail:'4-7-8 &#xD638;&#xD761;&#xBC95; 3&#xD68C; &rarr; &#xCCAB; &#xD640; &#xC2DC;&#xAC01;&#xD654; &rarr; &#xD504;&#xB9AC;&#xC0F7; &#xB8E8;&#xD2F4; &#xB9AC;&#xD5C8;&#xC124;'}
];

function showWarmup(){
var pn=getPanel('warmup');
var progress=lsGet('warmup_progress',{step:0,done:false,date:''});
if(progress.date!==todayStr()){progress={step:0,done:false,date:todayStr()};lsSet('warmup_progress',progress)}
var html='<div class="v10-title">&#x1F525; &#xD504;&#xB9AC;&#xB77C;&#xC6B4;&#xB4DC; &#xC6CC;&#xBC0D;&#xC5C5;</div>';

var totalTime=0;for(var wi=0;wi<WARMUP_STEPS.length;wi++)totalTime+=WARMUP_STEPS[wi].duration;
html+='<div style="text-align:center;margin-bottom:12px;color:#888;font-size:.85em">&#xCD1D; '+Math.round(totalTime/60)+'&#xBD84; | 6&#xB2E8;&#xACC4; &#xD504;&#xB85C;&#xADF8;&#xB7A8;</div>';

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
  html+='<div style="font-size:.72em;color:#888">'+Math.round(ws.duration/60)+'&#xBD84; | '+ws.desc+'</div>';
  html+='</div></div>';
  if(isDone)html+='<span class="v10-badge v10-badge-a">&#x2705;</span>';
  else if(isCurrent)html+='<button class="v10-btn v10-btn-primary" onclick="window._v10WarmupStep()">&#xC644;&#xB8CC;</button>';
  html+='</div>';
  html+='<div style="font-size:.8em;color:#aaa;line-height:1.6;padding-left:36px">'+ws.detail+'</div>';
  html+='</div>';
}

if(progress.done){
  html+='<div class="v10-card" style="text-align:center;background:linear-gradient(135deg,rgba(0,255,136,.06),rgba(0,180,216,.06))">';
  html+='<div style="font-size:2.5em;margin-bottom:8px">&#x1F3C6;</div>';
  html+='<h3 style="color:#00FF88">&#xC6CC;&#xBC0D;&#xC5C5; &#xC644;&#xB8CC;!</h3>';
  html+='<p>&#xCD5C;&#xC0C1;&#xC758; &#xB77C;&#xC6B4;&#xB4DC;&#xB97C; &#xC900;&#xBE44;&#xD588;&#xC2B5;&#xB2C8;&#xB2E4;. Good luck!</p></div>';
}

pn.innerHTML='<button class="v10-close" onclick="window._v10Close(\'warmup\')">&times;</button>'+html;
openPanel('warmup');v10CheckAch();
}

window._v10WarmupStep=function(){
var progress=lsGet('warmup_progress',{step:0,done:false,date:todayStr()});
progress.step++;
if(progress.step>=WARMUP_STEPS.length){progress.done=true;playSfx('warmup_done');showToast('&#x1F525; &#xC6CC;&#xBC0D;&#xC5C5; &#xC644;&#xB8CC;!')}
else{playSfx('warmup_step');showToast('Step '+progress.step+' &#xC644;&#xB8CC;!')}
lsSet('warmup_progress',progress);showWarmup();v10CheckAch();
};

// ===== 6. SCRAMBLING TRACKER =====
function showScrambling(){
var pn=getPanel('scramble');
var data=lsGet('scramble_data',[]);
var html='<div class="v10-title">&#x1F4AA; &#xC2A4;&#xD06C;&#xB7A8;&#xBE14;&#xB9C1; &#xD2B8;&#xB798;&#xCEE4;</div>';

html+='<div class="v10-card"><h3>&#x2795; &#xC5C5;&#xC564;&#xB2E4;&#xC6B4; &#xAE30;&#xB85D;</h3>';
html+='<p style="margin-bottom:8px">&#xADF8;&#xB9B0;&#xC744; &#xB193;&#xCCE4;&#xC744; &#xB54C; &#xD30C; &#xC774;&#xD558;&#xB85C; &#xC800;&#xC7A5;&#xD558;&#xB294; &#xC2A4;&#xD06C;&#xB7A8;&#xBE14;&#xB9C1; &#xC131;&#xACF5;&#xB960;</p>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';
html+='<div><label class="v10-label">&#xC704;&#xCE58;</label><select id="v10-sc-pos" class="v10-input"><option value="fairway">&#xD398;&#xC5B4;&#xC6E8;&#xC774;</option><option value="rough">&#xB7EC;&#xD504;</option><option value="bunker">&#xBC99;&#xCEE4;</option><option value="fringe">&#xD504;&#xB9B0;&#xC9C0;</option></select></div>';
html+='<div><label class="v10-label">&#xAC70;&#xB9AC; (yd)</label><input id="v10-sc-dist" class="v10-input" type="number" min="1" max="80" value="20"></div>';
html+='<div><label class="v10-label">&#xACB0;&#xACFC;</label><select id="v10-sc-result" class="v10-input"><option value="up">&#x2705; Up&amp;Down &#xC131;&#xACF5;</option><option value="miss">&#x274C; &#xC2E4;&#xD328;</option></select></div>';
html+='<div><label class="v10-label">&#xC0F7; &#xC885;&#xB958;</label><select id="v10-sc-shot" class="v10-input"><option value="chip">&#xCE69;</option><option value="pitch">&#xD53C;&#xCE58;</option><option value="bunker">&#xBC99;&#xCEE4;&#xC0F7;</option><option value="lob">&#xB86D;&#xC0F7;</option><option value="bump">&#xBC94;&#xD504;&#xC564;&#xB7F0;</option></select></div>';
html+='</div>';
html+='<button class="v10-btn v10-btn-primary" style="width:100%;margin-top:12px" onclick="window._v10RecordScramble()">&#xAE30;&#xB85D;</button></div>';

if(data.length>0){
  var total=data.length;var ups=data.filter(function(d){return d.result==='up'}).length;
  var pct=Math.round(ups/total*100);

  html+='<div class="v10-card" style="text-align:center">';
  html+='<div style="font-size:2.5em;font-weight:800;color:'+(pct>=50?'#00FF88':'#ff6b6b')+'">'+pct+'%</div>';
  html+='<div style="color:#888;font-size:.85em">&#xC2A4;&#xD06C;&#xB7A8;&#xBE14;&#xB9C1; &#xC131;&#xACF5;&#xB960; ('+ups+'/'+total+')</div>';
  html+='<div style="font-size:.75em;color:#888;margin-top:4px">PGA Tour &#xD3C9;&#xADE0;: 58%</div></div>';

  var posTypes=['fairway','rough','bunker','fringe'];
  var posLabels=['&#xD398;&#xC5B4;&#xC6E8;&#xC774;','&#xB7EC;&#xD504;','&#xBC99;&#xCEE4;','&#xD504;&#xB9B0;&#xC9C0;'];
  html+='<div class="v10-card"><h3>&#xC704;&#xCE58;&#xBCC4; &#xC131;&#xACF5;&#xB960;</h3>';
  html+='<table class="v10-table"><tr><th>&#xC704;&#xCE58;</th><th>&#xC2DC;&#xB3C4;</th><th>&#xC131;&#xACF5;</th><th>&#xC131;&#xACF5;&#xB960;</th></tr>';
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
  html+='<div class="v10-card"><h3>&#x1F3D6;&#xFE0F; &#xC0CC;&#xB4DC; &#xC138;&#xC774;&#xBE0C;</h3>';
  html+='<div style="font-size:1.8em;font-weight:800;color:'+(sandPct>=40?'#00FF88':'#ff6b6b')+'">'+sandPct+'%</div>';
  html+='<div style="color:#888;font-size:.8em">PGA Tour &#xD3C9;&#xADE0;: 52%</div></div>';
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
showToast(result==='up'?'&#x2705; Up&amp;Down &#xC131;&#xACF5;!':'&#x274C; &#xC2E4;&#xD328;');
playSfx('scramble_save');showScrambling();
};

// ===== 7. GOLF NUTRITION GUIDE =====
var NUTRITION_GUIDE=[
{phase:'&#xB77C;&#xC6B4;&#xB4DC; &#xC804;',items:[
  {name:'&#xBC14;&#xB098;&#xB098;',benefit:'&#xC990;&#xAC01;&#xC801;&#xC778; &#xC5D0;&#xB108;&#xC9C0; &#xBC29;&#xCD9C;, &#xC804;&#xD574;&#xC9C8; &#xBCF4;&#xCDA9;',timing:'&#xB77C;&#xC6B4;&#xB4DC; 1&#xC2DC;&#xAC04; &#xC804;'},
  {name:'&#xC624;&#xD2B8;&#xBC00; + &#xBCA0;&#xB9AC;',benefit:'&#xBCF5;&#xD569; &#xD0C4;&#xC218;&#xD654;&#xBB3C;, &#xC9C0;&#xC18D;&#xC801; &#xC5D0;&#xB108;&#xC9C0;',timing:'2&#xC2DC;&#xAC04; &#xC804;'},
  {name:'&#xACE0;&#xAD6C;&#xB9C8;/&#xACE0;&#xBF48; &#xD1A0;&#xC2A4;&#xD2B8;',benefit:'&#xBE60;&#xB978; &#xC5D0;&#xB108;&#xC9C0;, &#xD608;&#xB2F9; &#xC548;&#xC815;',timing:'1&#xC2DC;&#xAC04; &#xC804;'}
]},
{phase:'&#xB77C;&#xC6B4;&#xB4DC; &#xC911;',items:[
  {name:'&#xBB3C; (150~200ml/&#xD640;)',benefit:'&#xD0C8;&#xC218; &#xBC29;&#xC9C0;, &#xC9D1;&#xC911;&#xB825; &#xC720;&#xC9C0;',timing:'&#xB9E4; &#xD640;&#xB9C8;&#xB2E4;'},
  {name:'&#xC2A4;&#xD3EC;&#xCE20; &#xC74C;&#xB8CC; (&#xB354;&#xC6B4; &#xB0A0;)',benefit:'&#xC804;&#xD574;&#xC9C8; + &#xD0C4;&#xC218;&#xD654;&#xBB3C; &#xBCF4;&#xCDA9;',timing:'9&#xD640; &#xD6C4;'},
  {name:'&#xACAC;&#xACFC;&#xB958;/&#xC5D0;&#xB108;&#xC9C0;&#xBC14;',benefit:'&#xC9C0;&#xBC29; + &#xB2E8;&#xBC31;&#xC9C8;, &#xD3EC;&#xB9CC;&#xAC10;',timing:'6~9&#xD640;, 12~15&#xD640;'}
]},
{phase:'&#xB77C;&#xC6B4;&#xB4DC; &#xD6C4;',items:[
  {name:'&#xB2ED;&#xAC00;&#xC2B4;&#xC0B4; + &#xD604;&#xBBF8;&#xBC25;',benefit:'&#xADFC;&#xC721; &#xD68C;&#xBCF5;, &#xAE00;&#xB9AC;&#xCF54;&#xAC90; &#xBCF4;&#xCDA9;',timing:'30&#xBD84; &#xC774;&#xB0B4;'},
  {name:'&#xD504;&#xB85C;&#xD2F4;&#xC170;&#xC774;&#xD06C;/&#xC6B0;&#xC720;',benefit:'&#xBE60;&#xB978; &#xB2E8;&#xBC31;&#xC9C8; &#xD761;&#xC218;',timing:'&#xC989;&#xC2DC;'},
  {name:'&#xC804;&#xD574;&#xC9C8; &#xC74C;&#xB8CC;',benefit:'&#xC218;&#xBD84; + &#xBBF8;&#xB124;&#xB784; &#xBCF5;&#xC6D0;',timing:'1&#xC2DC;&#xAC04; &#xC774;&#xB0B4;'},
  {name:'&#xCEE4;&#xD53C;/&#xB179;&#xCC28; (&#xCE74;&#xD398;&#xC778;)',benefit:'&#xD53C;&#xB85C; &#xD68C;&#xBCF5;, &#xD56D;&#xC0B0;&#xD654;',timing:'&#xB77C;&#xC6B4;&#xB4DC; &#xD6C4;'}
]}
];

function showNutrition(){
var pn=getPanel('nutrition');
var html='<div class="v10-title">&#x1F34E; &#xACE8;&#xD504; &#xC601;&#xC591; &#xAC00;&#xC774;&#xB4DC;</div>';

html+='<div class="v10-card"><p>&#xCD5C;&#xC801;&#xC758; &#xB77C;&#xC6B4;&#xB4DC; &#xD37C;&#xD3EC;&#xBA3C;&#xC2A4;&#xB97C; &#xC704;&#xD55C; &#xC601;&#xC591; &#xAC00;&#xC774;&#xB4DC;. &#xCCB4;&#xC911;/&#xAC74;&#xAC15; &#xC0C1;&#xD0DC;&#xC5D0; &#xB530;&#xB77C; &#xC870;&#xC815;&#xD558;&#xC138;&#xC694;.</p></div>';

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

html+='<div class="v10-card"><h3>&#x1F4A7; &#xC218;&#xBD84; &#xC12D;&#xCDE8; &#xAC00;&#xC774;&#xB4DC;</h3>';
html+='<table class="v10-table"><tr><th>&#xAE30;&#xC628;</th><th>&#xAD8C;&#xC7A5;&#xB7C9;</th><th>&#xBE48;&#xB3C4;</th></tr>';
html+='<tr><td>20&#xB3C4; &#xC774;&#xD558;</td><td style="color:#00B4D8">150ml/&#xD640;</td><td style="color:#aaa">&#xBAA9;&#xB9C8;&#xB974;&#xBA74;</td></tr>';
html+='<tr><td>20~30&#xB3C4;</td><td style="color:#FFC107">200ml/&#xD640;</td><td style="color:#aaa">&#xB9E4; &#xD640;&#xB9C8;&#xB2E4;</td></tr>';
html+='<tr><td>30&#xB3C4; &#xC774;&#xC0C1;</td><td style="color:#ff6b6b">250ml/&#xD640;</td><td style="color:#aaa">&#xD2F0;&#xC0F7; &#xC804;&#xD6C4;</td></tr>';
html+='</table></div>';

pn.innerHTML='<button class="v10-close" onclick="window._v10Close(\'nutrition\')">&times;</button>'+html;
openPanel('nutrition');playSfx('nutrition_tip');lsSet('ach_nutrition_viewed',true);v10CheckAch();
}

// ===== 8. PIN POSITION APPROACH ANALYZER =====
function showPinTracker(){
var pn=getPanel('pintrack');
var data=lsGet('pin_data',[]);
var html='<div class="v10-title">&#x1F6A9; &#xD540; &#xD3EC;&#xC9C0;&#xC158; &#xBD84;&#xC11D;&#xAE30;</div>';

html+='<div class="v10-card"><h3>&#x2795; &#xC5B4;&#xD504;&#xB85C;&#xCE58; &#xAE30;&#xB85D;</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">';
html+='<div><label class="v10-label">&#xD540; &#xC704;&#xCE58;</label><select id="v10-pin-pos" class="v10-input"><option value="front">&#xD504;&#xB860;&#xD2B8;</option><option value="center" selected>&#xC13C;&#xD130;</option><option value="back">&#xBC31;</option><option value="left">&#xC88C;&#xCE21;</option><option value="right">&#xC6B0;&#xCE21;</option></select></div>';
html+='<div><label class="v10-label">&#xAC70;&#xB9AC; (yd)</label><input id="v10-pin-dist" class="v10-input" type="number" min="50" max="250" value="140"></div>';
html+='<div><label class="v10-label">&#xD074;&#xB7FD;</label><select id="v10-pin-club" class="v10-input">';
for(var ci3=4;ci3<RANGE_CLUBS.length;ci3++)html+='<option>'+RANGE_CLUBS[ci3]+'</option>';
html+='</select></div>';
html+='<div><label class="v10-label">&#xACB0;&#xACFC;</label><select id="v10-pin-result" class="v10-input"><option value="green_close">GIR (5yd &#xC774;&#xB0B4;)</option><option value="green_ok">GIR (10yd &#xC774;&#xB0B4;)</option><option value="green_far">GIR (10yd+)</option><option value="miss_short">Short</option><option value="miss_long">Long</option><option value="miss_left">Left</option><option value="miss_right">Right</option></select></div>';
html+='</div>';
html+='<button class="v10-btn v10-btn-primary" style="width:100%;margin-top:12px" onclick="window._v10RecordPin()">&#xAE30;&#xB85D;</button></div>';

if(data.length>0){
  var girCount=data.filter(function(d){return d.result.indexOf('green')===0}).length;
  var girPct=Math.round(girCount/data.length*100);
  var closeCount=data.filter(function(d){return d.result==='green_close'}).length;
  var closePct=Math.round(closeCount/data.length*100);

  html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:12px">';
  html+='<div class="v10-stat-card"><div class="v10-stat-val" style="color:#00FF88">'+girPct+'%</div><div class="v10-stat-label">GIR</div></div>';
  html+='<div class="v10-stat-card"><div class="v10-stat-val" style="color:#FFC107">'+closePct+'%</div><div class="v10-stat-label">5yd &#xC774;&#xB0B4;</div></div>';
  html+='<div class="v10-stat-card"><div class="v10-stat-val" style="color:#00B4D8">'+data.length+'</div><div class="v10-stat-label">&#xCD1D; &#xC0F7;</div></div>';
  html+='</div>';

  var missTypes={miss_short:0,miss_long:0,miss_left:0,miss_right:0};
  for(var mi=0;mi<data.length;mi++){if(missTypes[data[mi].result]!==undefined)missTypes[data[mi].result]++}
  var missTotal=missTypes.miss_short+missTypes.miss_long+missTypes.miss_left+missTypes.miss_right;
  if(missTotal>0){
    html+='<div class="v10-card"><h3>&#xBBF8;&#xC2A4; &#xD328;&#xD134; &#xBD84;&#xC11D;</h3>';
    html+='<canvas id="v10-pin-canvas" width="300" height="300" style="width:100%;max-width:300px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas></div>';
  }

  var pinPositions=['front','center','back','left','right'];
  var pinLabels=['&#xD504;&#xB860;&#xD2B8;','&#xC13C;&#xD130;','&#xBC31;','&#xC88C;&#xCE21;','&#xC6B0;&#xCE21;'];
  html+='<div class="v10-card"><h3>&#xD540; &#xC704;&#xCE58;&#xBCC4; GIR</h3>';
  html+='<table class="v10-table"><tr><th>&#xD540; &#xC704;&#xCE58;</th><th>&#xC2DC;&#xB3C4;</th><th>GIR</th><th>&#xBE44;&#xC728;</th></tr>';
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
var msg=result.indexOf('green')===0?'&#x2705; GIR!':'&#x274C; Miss ('+result.split('_')[1]+')';
showToast(msg);playSfx('shot_shape');showPinTracker();
};

// ===== 9. QUIZ v3 (+15 = 45 total) =====
var V10_QUIZ=[
{q:'&#xACE8;&#xD504;&#xC5D0;&#xC11C; &quot;&#xC5D0;&#xC774;&#xC9C0; &#xC0F7;&quot;&#xC774;&#xB780;?',o:['&#xC790;&#xC2E0;&#xC758; &#xB098;&#xC774; &#xC774;&#xD558;&#xB85C; &#xCE58;&#xB294; &#xAC83;','&#xD640;&#xC778;&#xC6D0;','&#xC5D0;&#xC774;&#xC2A4; &#xC810;&#xC218;','PGA &#xC5F0;&#xB839; &#xC810;&#xC218;'],a:0,explain:'&#xC5D0;&#xC774;&#xC9C0; &#xC0F7;&#xC740; &#xC790;&#xC2E0;&#xC758; &#xB098;&#xC774;&#xC640; &#xAC19;&#xAC70;&#xB098; &#xB0AE;&#xC740; &#xD0C0;&#xC218;&#xB85C; &#xB77C;&#xC6B4;&#xB4DC;&#xD558;&#xB294; &#xAC83;&#xC785;&#xB2C8;&#xB2E4;.'},
{q:'&#xACE8;&#xD504;&#xC5D0;&#xC11C; &quot;&#xC2A4;&#xD06C;&#xB7A8;&#xBE14;&#xB9C1;&quot;&#xC758; &#xC815;&#xC758;&#xB294;?',o:['3&#xD37C;&#xD2B8; &#xBB34;&#xC870;&#xAC74; &#xC131;&#xACF5;','GIR &#xC2E4;&#xD328; &#xD6C4; &#xD30C; &#xC774;&#xD558; &#xC800;&#xC7A5;','&#xBC84;&#xB514; &#xC5F0;&#xC18D;','&#xC774;&#xAE00; &#xD37C;&#xD2B8;'],a:1,explain:'&#xC2A4;&#xD06C;&#xB7A8;&#xBE14;&#xB9C1;&#xC740; GIR&#xC744; &#xB193;&#xCCE4;&#xC744; &#xB54C; &#xD30C; &#xC774;&#xD558;&#xB85C; &#xC800;&#xC7A5;&#xD558;&#xB294; &#xAC83;&#xC785;&#xB2C8;&#xB2E4;.'},
{q:'&#xACE8;&#xD504; &#xC624;&#xB9AC;&#xC9C0;&#xB110; 18&#xD640;&#xC774; &#xB41C; &#xC774;&#xC720;&#xB294;?',o:['&#xC704;&#xC2A4;&#xD0A4; 1&#xBCD1; = 18&#xD640;&#xBD84;','&#xCE58; &#xC218; &#xB54C;&#xBB38;','&#xC2DC;&#xAC04; &#xC81C;&#xD55C;','&#xBC95;&#xB960; &#xADDC;&#xC815;'],a:0,explain:'&#xC804;&#xC124;&#xC5D0; &#xC758;&#xD558;&#xBA74; &#xC138;&#xC778;&#xD2B8;&#xC564;&#xB4DC;&#xB8E8;&#xC988;&#xC5D0;&#xC11C; &#xC704;&#xC2A4;&#xD0A4; 1&#xBCD1;&#xC73C;&#xB85C; 18&#xD640;&#xC744; &#xB3CC;&#xC558;&#xB2E4;&#xACE0; &#xD569;&#xB2C8;&#xB2E4;.'},
{q:'PGA Tour&#xC5D0;&#xC11C; &quot;&#xBA39;&#xC785; &#xD50C;&#xB77C;&#xC774;&#xC5B4;&quot;&#xC758; &#xC758;&#xBBF8;&#xB294;?',o:['&#xCD08;&#xBCF4; &#xACE8;&#xD37C;','&#xC0C1;&#xAE08; 0 &#xD50C;&#xB808;&#xC774;&#xC5B4;','&#xC608;&#xC120; &#xD1B5;&#xACFC; &#xC2E4;&#xD328; &#xD50C;&#xB808;&#xC774;&#xC5B4;','&#xC2E0;&#xC778; &#xD50C;&#xB808;&#xC774;&#xC5B4;'],a:2,explain:'&#xBA39;&#xC785; &#xD50C;&#xB77C;&#xC774;&#xC5B4;&#xB294; &#xC608;&#xC120;&#xC744; &#xD1B5;&#xACFC;&#xD558;&#xC9C0; &#xBABB;&#xD574; &#xBC14;&#xB85C; &#xC0C1;&#xAE08;&#xC744; &#xBC1B;&#xC9C0; &#xBABB;&#xD558;&#xB294; &#xC120;&#xC218;&#xC785;&#xB2C8;&#xB2E4;.'},
{q:'&#xBC14;&#xC6B4;&#xC2A4; &#xAC01;&#xB3C4;&#xAC00; &#xB0AE;&#xC740; &#xC6E8;&#xC9C0;(4~8&#xB3C4;)&#xB294; &#xC5B4;&#xB5A4; &#xC0C1;&#xD669;&#xC5D0; &#xC801;&#xD569;&#xD55C;&#xAC00;?',o:['&#xBC99;&#xCEE4; &#xC0F7;','&#xD0C0;&#xC774;&#xD2B8; &#xB77C;&#xC774;','&#xD480; &#xC2A4;&#xC719;','&#xD37C;&#xD305;'],a:1,explain:'&#xB0AE;&#xC740; &#xBC14;&#xC6B4;&#xC2A4;&#xB294; &#xB2E8;&#xB2E8;&#xD55C; &#xC9C0;&#xBA74;&#xC5D0;&#xC11C; &#xBCFC;&#xC744; &#xAD74;&#xB9AC;&#xB294; &#xBC94;&#xD504;&#xC564;&#xB7F0;&#xC5D0; &#xC801;&#xD569;&#xD569;&#xB2C8;&#xB2E4;.'},
{q:'&#xACE8;&#xD504;&#xACF5;&#xC758; &#xC555;&#xCD95;&#xB960;(Compression)&#xC774; &#xB0AE;&#xC740; &#xACF5;&#xC758; &#xD2B9;&#xC9D5;&#xC740;?',o:['&#xBE44;&#xAC70;&#xB9AC; &#xC99D;&#xAC00;','&#xC2A4;&#xD540; &#xC99D;&#xAC00;','&#xBD80;&#xB4DC;&#xB7EC;&#xC6B4; &#xD0C0;&#xAC10;','&#xCEE8;&#xD2B8;&#xB864; &#xC99D;&#xAC00;'],a:2,explain:'&#xB0AE;&#xC740; &#xC555;&#xCD95;&#xB960;(50-70)&#xC740; &#xBCFC;&#xC774; &#xBD80;&#xB4DC;&#xB7EC;&#xC6CC;&#xC838; &#xC2AC;&#xB85C;&#xC6B0; &#xC2A4;&#xC719;&#xC5D0; &#xC801;&#xD569;&#xD569;&#xB2C8;&#xB2E4;.'},
{q:'&#xACE8;&#xD504;&#xC5D0;&#xC11C; &quot;&#xC5C5;&#xD790;&quot;(Uphill) &#xB77C;&#xC774;&#xC5D0;&#xC11C;&#xB294; &#xC5B4;&#xB5BB;&#xAC8C; &#xC870;&#xC815;&#xD574;&#xC57C; &#xD558;&#xB098;?',o:['1&#xD074;&#xB7FD; &#xB0B4;&#xB824; &#xC120;&#xD0DD;','1&#xD074;&#xB7FD; &#xC62C;&#xB824; &#xC120;&#xD0DD;','&#xBCFC; &#xC704;&#xCE58; &#xBCC0;&#xACBD;','&#xADF8;&#xB9BD; &#xBCC0;&#xACBD;'],a:1,explain:'&#xC624;&#xB974;&#xB9C9;&#xC5D0;&#xC11C;&#xB294; &#xBCFC;&#xC774; &#xB354; &#xB192;&#xC774; &#xB5A0;&#xC5B4; &#xAC70;&#xB9AC;&#xAC00; &#xC904;&#xC5B4;&#xC9C0;&#xBBC0;&#xB85C; 1&#xD074;&#xB7FD; &#xC62C;&#xB824; &#xCE69;&#xB2C8;&#xB2E4;.'},
{q:'&#xACE8;&#xD504; &#xC2A4;&#xC719;&#xC5D0;&#xC11C; &quot;&#xB808;&#xC774;&#xD2B8; &#xD788;&#xD2B8;&quot;&#xB780;?',o:['&#xBCFC; &#xC704;&#xCE58;&#xBCF4;&#xB2E4; &#xD074;&#xB7FD;&#xC774; &#xB2A6;&#xAC8C; &#xB3C4;&#xCC29;','&#xBE60;&#xB978; &#xC2A4;&#xC719;','&#xBCFC;&#xC744; &#xB9DE;&#xC9C0; &#xBABB;&#xD568;','&#xBCFC;&#xC758; &#xC717;&#xBD80;&#xBD84;&#xC744; &#xCE68;'],a:0,explain:'&#xB808;&#xC774;&#xD2B8; &#xD788;&#xD2B8;&#xB294; &#xC784;&#xD329;&#xD2B8; &#xC2DC; &#xD074;&#xB7FD;&#xC774; &#xBC0F;&#xC73C;&#xB85C; &#xCCD0;&#xC9C0;&#xB294; &#xAC83;&#xC73C;&#xB85C; &#xBE44;&#xAC70;&#xB9AC; &#xC190;&#xC2E4;&#xC744; &#xC720;&#xBC1C;&#xD569;&#xB2C8;&#xB2E4;.'},
{q:'&#xACE8;&#xD504; &#xB77C;&#xC6B4;&#xB4DC;&#xC5D0;&#xC11C; &#xD3C9;&#xADE0; &#xAC78;&#xC74C; &#xC218;&#xB294;?',o:['5,000&#xBCF4;','8,000~10,000&#xBCF4;','15,000&#xBCF4;','3,000&#xBCF4;'],a:1,explain:'18&#xD640; &#xB77C;&#xC6B4;&#xB4DC;&#xC5D0;&#xC11C; &#xD3C9;&#xADE0; 8,000~10,000&#xBCF4;&#xB97C; &#xAC77;&#xC2B5;&#xB2C8;&#xB2E4;. &#xC57D; 6~7km.'},
{q:'&#xACE8;&#xD504;&#xC5D0;&#xC11C; &quot;&#xD50C;&#xB86D; &#xC0F7;&quot;&#xC774;&#xB780;?',o:['&#xB0AE;&#xC740; &#xD0C4;&#xB3C4;&#xC758; &#xC0F7;','&#xBC99;&#xCEE4;&#xC5D0;&#xC11C; &#xB192;&#xAC8C; &#xB744;&#xC6B0;&#xB294; &#xC0F7;','&#xADF8;&#xB9B0; &#xC704;&#xC5D0;&#xC11C; &#xBCFC;&#xC744; &#xBA48;&#xCD94;&#xB294; &#xC0F7;','&#xD37C;&#xD305; &#xAE30;&#xC220;'],a:2,explain:'&#xD50C;&#xB86D; &#xC0F7;&#xC740; &#xBCFC;&#xC744; &#xB192;&#xC774; &#xB744;&#xC6CC; &#xADF8;&#xB9B0; &#xC704;&#xC5D0;&#xC11C; &#xBE60;&#xB974;&#xAC8C; &#xBA48;&#xCD94;&#xB294; &#xC0F7;&#xC785;&#xB2C8;&#xB2E4;.'},
{q:'PGA Tour &#xD3C9;&#xADE0; &#xBC84;&#xB514; &#xBE44;&#xC728;&#xC740;?',o:['10~15%','20~25%','30~35%','40~45%'],a:1,explain:'PGA Tour &#xD3C9;&#xADE0; &#xBC84;&#xB514; &#xBE44;&#xC728;&#xC740; &#xC57D; 22%&#xC785;&#xB2C8;&#xB2E4;.'},
{q:'&#xACE8;&#xD504;&#xC5D0;&#xC11C; &quot;&#xCF00;&#xC774;&#xB354;&#xC2A4;&quot;(Cadence)&#xB780;?',o:['&#xCF54;&#xC2A4; &#xB09C;&#xC774;&#xB3C4;','&#xC2A4;&#xC719; &#xB9AC;&#xB4EC;&#xACFC; &#xD15C;&#xD3EC;','&#xBCFC; &#xD68C;&#xC804;&#xC218;','&#xD074;&#xB7FD; &#xBB34;&#xAC8C;'],a:1,explain:'&#xCF00;&#xC774;&#xB374;&#xC2A4;&#xB294; &#xC2A4;&#xC719;&#xC758; &#xC77C;&#xC815;&#xD55C; &#xB9AC;&#xB4EC;&#xACFC; &#xD15C;&#xD3EC;&#xB97C; &#xC758;&#xBBF8;&#xD569;&#xB2C8;&#xB2E4;.'},
{q:'&#xB4DC;&#xB77C;&#xC774;&#xBC84;&#xC758; &#xC774;&#xC0C1;&#xC801;&#xC778; &#xB7F0;&#xCE58; &#xC571;&#xAE00;&#xC740;?',o:['5~8&#xB3C4;','10~14&#xB3C4;','18~22&#xB3C4;','25~30&#xB3C4;'],a:1,explain:'&#xB4DC;&#xB77C;&#xC774;&#xBC84;&#xC758; &#xC774;&#xC0C1;&#xC801; &#xB7F0;&#xCE58; &#xC571;&#xAE00;&#xC740; 10~14&#xB3C4;&#xC785;&#xB2C8;&#xB2E4;.'},
{q:'&#xACE8;&#xD504;&#xC5D0;&#xC11C; &quot;&#xD504;&#xB9B0;&#xC9C0;&quot;&#xB780;?',o:['&#xBC99;&#xCEE4; &#xC8FC;&#xBCC0;','&#xADF8;&#xB9B0; &#xC8FC;&#xBCC0;&#xC758; &#xC9E7;&#xC740; &#xC794;&#xB514;','&#xD398;&#xC5B4;&#xC6E8;&#xC774; &#xAC00;&#xC7A5;&#xC790;&#xB9AC;','&#xC6CC;&#xD130; &#xD574;&#xC800;&#xB4DC; &#xACBD;&#xACC4;'],a:1,explain:'&#xD504;&#xB9B0;&#xC9C0;&#xB294; &#xADF8;&#xB9B0; &#xC8FC;&#xBCC0;&#xC758; &#xC9E7;&#xAC8C; &#xAE4E;&#xC740; &#xC794;&#xB514; &#xC601;&#xC5ED;&#xC785;&#xB2C8;&#xB2E4;.'},
{q:'&#xACE8;&#xD504;&#xC5D0;&#xC11C; &quot;&#xADF8;&#xB9B0; &#xB9AC;&#xB529;&quot;&#xC774;&#xB780;?',o:['&#xBCFC; &#xB9C8;&#xD06C; &#xC77D;&#xAE30;','&#xADF8;&#xB9B0;&#xC758; &#xACBD;&#xC0AC;/&#xBC29;&#xD5A5; &#xD30C;&#xC545;','&#xD074;&#xB7FD; &#xC120;&#xD0DD;','&#xBC14;&#xB78C; &#xC77D;&#xAE30;'],a:1,explain:'&#xADF8;&#xB9B0; &#xB9AC;&#xB529;&#xC740; &#xD37C;&#xD305; &#xC804; &#xACBD;&#xC0AC;&#xC640; &#xBE0C;&#xB808;&#xC774;&#xD06C;&#xB97C; &#xD30C;&#xC545;&#xD558;&#xB294; &#xAE30;&#xC220;&#xC785;&#xB2C8;&#xB2E4;.'}
];

function showV10Quiz(){
var pn=getPanel('v10quiz');
var qs=lsGet('v10quiz_state',{current:0,correct:0,answered:[]});
var html='<div class="v10-title">&#x1F4DD; &#xACE8;&#xD504; &#xC2EC;&#xD654; &#xD034;&#xC988; v3</div>';

if(qs.answered.length>=V10_QUIZ.length){
  var grade=qs.correct>=14?'S':qs.correct>=12?'A':qs.correct>=10?'B':qs.correct>=7?'C':'D';
  var gcolor=grade==='S'?'#00FF88':grade==='A'?'#00B4D8':grade==='B'?'#FFC107':'#ff6b6b';
  html+='<div class="v10-card" style="text-align:center"><div style="font-size:3em;margin-bottom:8px">&#x1F3C6;</div>';
  html+='<h3>&#xD034;&#xC988; &#xC644;&#xB8CC;!</h3>';
  html+='<div style="font-size:2.5em;font-weight:800;color:'+gcolor+';margin:12px 0">'+grade+'</div>';
  html+='<div style="color:#aaa">'+qs.correct+' / '+V10_QUIZ.length+' &#xC815;&#xB2F5;</div>';
  html+='<button class="v10-btn v10-btn-primary" style="margin-top:16px" onclick="window._v10ResetQuiz()">&#xB2E4;&#xC2DC; &#xB3C4;&#xC804;</button></div>';
} else {
  var qi=qs.current;var q=V10_QUIZ[qi];
  html+='<div style="text-align:center;margin-bottom:12px;color:#888;font-size:.85em">&#xBB38;&#xC81C; '+(qi+1)+' / '+V10_QUIZ.length+' &middot; &#xC815;&#xB2F5; '+qs.correct+'&#xAC1C;</div>';
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
qs.answered.push(ok);if(ok){qs.correct++;playSfx('v10_quiz');showToast('&#x2705; &#xC815;&#xB2F5;!')}
else{showToast('&#x274C; '+q.explain)}
qs.current++;lsSet('v10quiz_state',qs);
setTimeout(function(){showV10Quiz()},800);v10CheckAch();
};
window._v10ResetQuiz=function(){lsSet('v10quiz_state',{current:0,correct:0,answered:[]});showV10Quiz()};

// ===== ACHIEVEMENTS (+12 = 36 total) =====
var V10_ACH=[
{id:'v10_range_first',name:'&#xCCAB; &#xC5F0;&#xC2B5;',desc:'&#xB4DC;&#xB77C;&#xC774;&#xBE59; &#xB808;&#xC778;&#xC9C0; &#xC138;&#xC158; 1&#xD68C;',icon:'&#x1F3AF;',check:function(){return lsGet('range_sessions',[]).length>=1}},
{id:'v10_range_5',name:'&#xC5F0;&#xC2B5;&#xBC8C;&#xB808;',desc:'5&#xD68C; &#xC5F0;&#xC2B5; &#xC138;&#xC158; &#xC644;&#xB8CC;',icon:'&#x1F4AA;',check:function(){return lsGet('range_sessions',[]).length>=5}},
{id:'v10_stats_viewer',name:'&#xD1B5;&#xACC4; &#xBD84;&#xC11D;&#xAC00;',desc:'&#xB77C;&#xC6B4;&#xB4DC; &#xD1B5;&#xACC4; &#xB300;&#xC2DC;&#xBCF4;&#xB4DC; &#xC870;&#xD68C;',icon:'&#x1F4C8;',check:function(){return lsGet('ach_stats_viewed',false)}},
{id:'v10_hc_calc',name:'&#xD578;&#xB514;&#xCE61; &#xACC4;&#xC0B0;&#xAC00;',desc:'&#xCF54;&#xC2A4; &#xD578;&#xB514;&#xCE61; &#xBCC0;&#xD658; &#xC644;&#xB8CC;',icon:'&#x1F4D0;',check:function(){return lsGet('ach_hc_calculated',false)}},
{id:'v10_shape_50',name:'&#xC0F7; &#xBD84;&#xC11D;&#xAC00;',desc:'&#xC0F7; &#xC170;&#xC774;&#xD504; 50&#xD68C; &#xAE30;&#xB85D;',icon:'&#x1F3CC;&#xFE0F;',check:function(){return lsGet('shot_shapes',[]).length>=50}},
{id:'v10_warmup_done',name:'&#xC6CC;&#xBC0D;&#xC5C5; &#xB9C8;&#xC2A4;&#xD130;',desc:'6&#xB2E8;&#xACC4; &#xC6CC;&#xBC0D;&#xC5C5; &#xC644;&#xB8CC;',icon:'&#x1F525;',check:function(){var p=lsGet('warmup_progress',{});return p.done===true}},
{id:'v10_scramble_50',name:'&#xC2A4;&#xD06C;&#xB7A8;&#xBE14;&#xB9C1; 50%+',desc:'&#xC2A4;&#xD06C;&#xB7A8;&#xBE14;&#xB9C1; &#xC131;&#xACF5;&#xB960; 50% &#xC774;&#xC0C1;',icon:'&#x2B50;',check:function(){var d=lsGet('scramble_data',[]);if(d.length<10)return false;return d.filter(function(x){return x.result==='up'}).length/d.length>=0.5}},
{id:'v10_nutrition',name:'&#xC601;&#xC591; &#xC804;&#xBB38;&#xAC00;',desc:'&#xC601;&#xC591; &#xAC00;&#xC774;&#xB4DC; &#xC870;&#xD68C;',icon:'&#x1F34E;',check:function(){return lsGet('ach_nutrition_viewed',false)}},
{id:'v10_pin_30',name:'&#xD540; &#xD5CC;&#xD130;',desc:'&#xD540; &#xD3EC;&#xC9C0;&#xC158; 30&#xD68C; &#xAE30;&#xB85D;',icon:'&#x1F6A9;',check:function(){return lsGet('pin_data',[]).length>=30}},
{id:'v10_quiz_perfect',name:'&#xD034;&#xC988; v3 &#xB9CC;&#xC810;',desc:'v3 &#xD034;&#xC988; 15&#xBB38;&#xC81C; &#xC804;&#xBD80; &#xC815;&#xB2F5;',icon:'&#x1F4DD;',check:function(){var qs=lsGet('v10quiz_state',{});return qs.correct>=15&&(qs.answered||[]).length>=15}},
{id:'v10_range_100',name:'&#xBC31;&#xBC1C;&#xBC31;&#xC911;',desc:'&#xD55C; &#xC138;&#xC158;&#xC5D0;&#xC11C; 100&#xC0F7; &#xC774;&#xC0C1;',icon:'&#x1F680;',check:function(){var sessions=lsGet('range_sessions',[]);return sessions.some(function(s){var t=0;for(var k in s.shots)t+=s.shots[k];return t>=100})}},
{id:'v10_all_features',name:'v10 &#xD0D0;&#xD5D8;&#xAC00;',desc:'v10 &#xC804;&#xCCB4; &#xAE30;&#xB2A5; &#xD0D0;&#xC0C9;',icon:'&#x1F30D;',check:function(){return lsGet('range_sessions',[]).length>=1&&lsGet('ach_stats_viewed',false)&&lsGet('ach_hc_calculated',false)&&lsGet('shot_shapes',[]).length>=1&&lsGet('warmup_progress',{}).done===true&&lsGet('scramble_data',[]).length>=1&&lsGet('ach_nutrition_viewed',false)&&lsGet('pin_data',[]).length>=1}}
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
  {icon:'&#x1F3AF;',title:'&#xB808;&#xC778;&#xC9C0; (Shift+R)',fn:'showRange'},
  {icon:'&#x1F4C8;',title:'&#xD1B5;&#xACC4; (Shift+T)',fn:'showStats'},
  {icon:'&#x1F4D0;',title:'&#xD578;&#xB514;&#xCE61; (Shift+H)',fn:'showHandicapCalc'},
  {icon:'&#x1F3CC;&#xFE0F;',title:'&#xC0F7;&#xC170;&#xC774;&#xD504; (Shift+S)',fn:'showShotShape'},
  {icon:'&#x1F525;',title:'&#xC6CC;&#xBC0D;&#xC5C5; (Shift+W)',fn:'showWarmup'},
  {icon:'&#x1F4AA;',title:'&#xC2A4;&#xD06C;&#xB7A8;&#xBE14;&#xB9C1; (Shift+C)',fn:'showScrambling'},
  {icon:'&#x1F34E;',title:'&#xC601;&#xC591; (Shift+N)',fn:'showNutrition'},
  {icon:'&#x1F6A9;',title:'&#xD540;&#xD2B8;&#xB798;&#xCEE4; (Shift+P)',fn:'showPinTracker'}
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
