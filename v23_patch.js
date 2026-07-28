(function(){
'use strict';
var LS='gt_v23_';
var audioCtx=null;
function getAC(){if(!audioCtx)try{audioCtx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}return audioCtx}
function playSfx(type){var ac=getAC();if(!ac)return;var o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);var t=ac.currentTime;g.gain.setValueAtTime(0.1,t);switch(type){case'tempo_open':o.type='sine';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(554,t+0.06);o.frequency.linearRampToValueAtTime(659,t+0.12);o.frequency.linearRampToValueAtTime(784,t+0.18);g.gain.exponentialRampToValueAtTime(0.01,t+0.32);o.start(t);o.stop(t+0.32);break;case'tempo_tick':o.type='triangle';o.frequency.setValueAtTime(1200,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.04);o.start(t);o.stop(t+0.04);break;case'tempo_tock':o.type='triangle';o.frequency.setValueAtTime(800,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.04);o.start(t);o.stop(t+0.04);break;case'ci_open':o.type='sine';o.frequency.setValueAtTime(392,t);o.frequency.linearRampToValueAtTime(494,t+0.07);o.frequency.linearRampToValueAtTime(622,t+0.14);g.gain.exponentialRampToValueAtTime(0.01,t+0.28);o.start(t);o.stop(t+0.28);break;case'sqi_open':o.type='sine';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(659,t+0.06);o.frequency.linearRampToValueAtTime(784,t+0.12);o.frequency.linearRampToValueAtTime(988,t+0.18);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'sqi_rate':o.type='sine';o.frequency.setValueAtTime(880,t);o.frequency.linearRampToValueAtTime(1175,t+0.06);g.gain.exponentialRampToValueAtTime(0.01,t+0.12);o.start(t);o.stop(t+0.12);break;case'slope_open':o.type='sine';o.frequency.setValueAtTime(349,t);o.frequency.linearRampToValueAtTime(440,t+0.07);o.frequency.linearRampToValueAtTime(523,t+0.14);g.gain.exponentialRampToValueAtTime(0.01,t+0.28);o.start(t);o.stop(t+0.28);break;case'slope_calc':o.type='triangle';o.frequency.setValueAtTime(659,t);o.frequency.linearRampToValueAtTime(988,t+0.08);g.gain.exponentialRampToValueAtTime(0.01,t+0.14);o.start(t);o.stop(t+0.14);break;case'tourney_open':o.type='sine';o.frequency.setValueAtTime(587,t);o.frequency.linearRampToValueAtTime(740,t+0.06);o.frequency.linearRampToValueAtTime(880,t+0.12);o.frequency.linearRampToValueAtTime(1047,t+0.18);g.gain.exponentialRampToValueAtTime(0.01,t+0.32);o.start(t);o.stop(t+0.32);break;case'tourney_hole':o.type='sine';o.frequency.setValueAtTime(784,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.06);o.start(t);o.stop(t+0.06);break;case'drivezone_open':o.type='sine';o.frequency.setValueAtTime(466,t);o.frequency.linearRampToValueAtTime(587,t+0.07);o.frequency.linearRampToValueAtTime(740,t+0.14);g.gain.exponentialRampToValueAtTime(0.01,t+0.28);o.start(t);o.stop(t+0.28);break;case'practice_open':o.type='sine';o.frequency.setValueAtTime(494,t);o.frequency.linearRampToValueAtTime(622,t+0.06);o.frequency.linearRampToValueAtTime(784,t+0.12);g.gain.exponentialRampToValueAtTime(0.01,t+0.25);o.start(t);o.stop(t+0.25);break;case'fitness_open':o.type='sine';o.frequency.setValueAtTime(370,t);o.frequency.linearRampToValueAtTime(466,t+0.07);o.frequency.linearRampToValueAtTime(587,t+0.14);o.frequency.linearRampToValueAtTime(698,t+0.21);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'quiz_correct_v23':o.type='sine';o.frequency.setValueAtTime(784,t);o.frequency.setValueAtTime(988,t+0.08);o.frequency.setValueAtTime(1175,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'quiz_wrong_v23':o.type='sawtooth';o.frequency.setValueAtTime(277,t);o.frequency.linearRampToValueAtTime(208,t+0.2);g.gain.setValueAtTime(0.06,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'achieve_v23':o.type='sine';o.frequency.setValueAtTime(988,t);o.frequency.setValueAtTime(1175,t+0.1);o.frequency.setValueAtTime(1397,t+0.2);o.frequency.setValueAtTime(1760,t+0.3);g.gain.exponentialRampToValueAtTime(0.01,t+0.5);o.start(t);o.stop(t+0.5);break;case'nav_v23':o.type='sine';o.frequency.setValueAtTime(698,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.08);o.start(t);o.stop(t+0.08);break;case'save_v23':o.type='triangle';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(784,t+0.1);g.gain.exponentialRampToValueAtTime(0.01,t+0.2);o.start(t);o.stop(t+0.2);break;default:o.type='sine';o.frequency.setValueAtTime(440,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.15);o.start(t);o.stop(t+0.15)}}

function lsGet(k,d){try{var v=localStorage.getItem(LS+k);return v?JSON.parse(v):d}catch(e){return d}}
function lsSet(k,v){try{localStorage.setItem(LS+k,JSON.stringify(v))}catch(e){}}
function todayStr(){return new Date().toISOString().slice(0,10)}
function showToast(msg){var t=document.createElement('div');t.className='v23-toast';t.textContent=msg;document.body.appendChild(t);setTimeout(function(){t.classList.add('show')},50);setTimeout(function(){t.classList.remove('show');setTimeout(function(){t.remove()},400)},3000)}
function createOverlay(id){var ov=document.createElement('div');ov.className='v23-overlay';ov.id='v23-'+id;ov.addEventListener('click',function(e){if(e.target===ov)closePanel(id)});var pn=document.createElement('div');pn.className='v23-panel';pn.style.position='relative';ov.appendChild(pn);return pn}
function openPanel(id){var el=document.getElementById('v23-'+id);if(el)el.classList.add('active')}
function closePanel(id){var el=document.getElementById('v23-'+id);if(el)el.classList.remove('active')}
function getPanel(id){var ov=document.getElementById('v23-'+id);if(!ov){var pn=createOverlay(id);pn.id='v23-'+id+'-panel';document.body.appendChild(pn.parentElement);return pn}return ov.querySelector('.v23-panel')||ov}

// ===== 1. SWING TEMPO METRONOME Canvas 620x400 =====
function showSwingTempo(){
playSfx('tempo_open');
var pn=getPanel('tempo');
var log=lsGet('tempo_log',[]);
var bpm=lsGet('tempo_bpm',72);
var ratio=lsGet('tempo_ratio','3:1');
var RATIOS=['3:1','2.5:1','2:1','4:1'];
var html='<button class="v23-close" onclick="window._v23Close(\'tempo\')">&times;</button>';
html+='<div class="v23-title">&#x1F3B5; &#xC2A4;&#xC719; &#xD15C;&#xD3EC; &#xBA54;&#xD2B8;&#xB85C;&#xB188;</div>';
html+='<canvas id="v23-tempo-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v23-card"><h3>&#xD15C;&#xD3EC; &#xC124;&#xC815;</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';
html+='<div><label class="v23-label">BPM (&#xBC15;&#xC790;/&#xBD84;)</label><input class="v23-input" type="number" id="v23-bpm" value="'+bpm+'" min="40" max="120"></div>';
html+='<div><label class="v23-label">&#xBC31;&#xC2A4;&#xC719;:&#xB2E4;&#xC6B4;&#xC2A4;&#xC719; &#xBE44;&#xC728;</label><select class="v23-input" id="v23-ratio">';
for(var i=0;i<RATIOS.length;i++)html+='<option'+(RATIOS[i]===ratio?' selected':'')+'>'+RATIOS[i]+'</option>';
html+='</select></div></div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:8px">';
html+='<button class="v23-btn v23-btn-primary" id="v23-tempo-start" onclick="window._v23ToggleTempo()">&#x25B6; &#xC2DC;&#xC791;</button>';
html+='<button class="v23-btn" onclick="window._v23RecordTempo()">&#x1F4BE; &#xAE30;&#xB85D;</button>';
html+='<button class="v23-btn" onclick="window._v23TapTempo()">&#x1F44F; &#xD0ED; &#xD15C;&#xD3EC;</button>';
html+='</div></div>';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#00FF88">'+bpm+'</div><div class="v23-stat-label">BPM</div></div>';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#FFB800">'+ratio+'</div><div class="v23-stat-label">&#xBE44;&#xC728;</div></div>';
var avgBpm=0;if(log.length>0){for(var j=0;j<log.length;j++)avgBpm+=log[j].bpm;avgBpm=Math.round(avgBpm/log.length)}
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#4ECDC4">'+avgBpm+'</div><div class="v23-stat-label">&#xD3C9;&#xADE0; BPM</div></div>';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#A855F7">'+log.length+'</div><div class="v23-stat-label">&#xC138;&#xC158;</div></div>';
html+='</div>';
if(log.length>0)html+='<button class="v23-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'&#xCD08;&#xAE30;&#xD654;?\'))window._v23ResetTempo()">&#xCD08;&#xAE30;&#xD654;</button>';
pn.innerHTML=html;openPanel('tempo');drawTempoCanvas(log,bpm,ratio);
}
var _tempoInterval=null;var _tempoCount=0;var _tapTimes=[];
window._v23ToggleTempo=function(){
var btn=document.getElementById('v23-tempo-start');
if(_tempoInterval){clearInterval(_tempoInterval);_tempoInterval=null;_tempoCount=0;if(btn)btn.innerHTML='&#x25B6; &#xC2DC;&#xC791;';return}
var bpm=parseInt(document.getElementById('v23-bpm').value)||72;
var rStr=(document.getElementById('v23-ratio').value||'3:1').split(':');
var bRatio=parseFloat(rStr[0])||3;var dRatio=parseFloat(rStr[1])||1;
var totalBeats=bRatio+dRatio;
var interval=60000/bpm;
_tempoCount=0;
if(btn)btn.innerHTML='&#x23F8; &#xC815;&#xC9C0;';
_tempoInterval=setInterval(function(){
_tempoCount++;
var beatInCycle=(_tempoCount-1)%Math.round(totalBeats);
if(beatInCycle<Math.round(bRatio))playSfx('tempo_tick');
else playSfx('tempo_tock');
},interval);
};
window._v23TapTempo=function(){
var now=performance.now();
_tapTimes.push(now);
if(_tapTimes.length>8)_tapTimes.shift();
if(_tapTimes.length>=2){
var diffs=[];for(var i=1;i<_tapTimes.length;i++)diffs.push(_tapTimes[i]-_tapTimes[i-1]);
var avg=0;for(var i=0;i<diffs.length;i++)avg+=diffs[i];avg/=diffs.length;
var detectedBpm=Math.round(60000/avg);
if(detectedBpm>=40&&detectedBpm<=180){
var el=document.getElementById('v23-bpm');if(el)el.value=detectedBpm;
showToast('Tap BPM: '+detectedBpm);
}
}
playSfx('tempo_tick');
};
window._v23RecordTempo=function(){
playSfx('save_v23');
var bpm=parseInt(document.getElementById('v23-bpm').value)||72;
var ratio=document.getElementById('v23-ratio').value||'3:1';
var log=lsGet('tempo_log',[]);
log.push({date:todayStr(),bpm:bpm,ratio:ratio});
if(log.length>50)log.shift();
lsSet('tempo_log',log);lsSet('tempo_bpm',bpm);lsSet('tempo_ratio',ratio);
showToast('&#xD15C;&#xD3EC; &#xAE30;&#xB85D; &#xC800;&#xC7A5;!');checkAchievements();showSwingTempo();
};
window._v23ResetTempo=function(){lsSet('tempo_log',[]);showSwingTempo();};
function drawTempoCanvas(log,bpm,ratio){
var c=document.getElementById('v23-tempo-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,W,H);
ctx.fillStyle='rgba(0,255,136,0.05)';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 16px sans-serif';ctx.textAlign='center';
ctx.fillText('Swing Tempo Trend ('+log.length+' sessions)',W/2,28);
if(log.length<2){ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='13px sans-serif';ctx.fillText('2+ sessions needed for trend',W/2,H/2);return}
var maxBpm=0,minBpm=999;
for(var i=0;i<log.length;i++){if(log[i].bpm>maxBpm)maxBpm=log[i].bpm;if(log[i].bpm<minBpm)minBpm=log[i].bpm}
var range=Math.max(maxBpm-minBpm,20);var padTop=55,padBot=50,padL=50,padR=30;
var chartW=W-padL-padR,chartH=H-padTop-padBot;
ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.lineWidth=1;
for(var i=0;i<=4;i++){
var y=padTop+chartH*(i/4);
ctx.beginPath();ctx.moveTo(padL,y);ctx.lineTo(padL+chartW,y);ctx.stroke();
var val=Math.round(maxBpm+5-((range+10)*(i/4)));
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='10px sans-serif';ctx.textAlign='right';
ctx.fillText(val+'',padL-6,y+4);
}
// ideal zone
var idealTop=padTop+chartH*((maxBpm+5-76)/(range+10));
var idealBot=padTop+chartH*((maxBpm+5-68)/(range+10));
if(idealBot>idealTop){ctx.fillStyle='rgba(0,255,136,0.08)';ctx.fillRect(padL,idealTop,chartW,idealBot-idealTop);
ctx.fillStyle='rgba(0,255,136,0.3)';ctx.font='9px sans-serif';ctx.textAlign='left';ctx.fillText('Ideal Zone 68-76',padL+4,idealTop+10)}
ctx.beginPath();ctx.strokeStyle='#00FF88';ctx.lineWidth=2;
var last=Math.min(log.length,30);var start=log.length-last;
for(var i=0;i<last;i++){
var x=padL+chartW*(i/(last-1));
var y=padTop+chartH*((maxBpm+5-log[start+i].bpm)/(range+10));
if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
}
ctx.stroke();
for(var i=0;i<last;i++){
var x=padL+chartW*(i/(last-1));
var y=padTop+chartH*((maxBpm+5-log[start+i].bpm)/(range+10));
ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.fillStyle='#00FF88';ctx.fill();
if(i%3===0||i===last-1){ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='8px sans-serif';ctx.textAlign='center';ctx.fillText(log[start+i].date.slice(5),x,H-padBot+14)}
}
// ratio bar at bottom
ctx.fillStyle='#fff';ctx.font='bold 11px sans-serif';ctx.textAlign='center';
var rParts=ratio.split(':');var bR=parseFloat(rParts[0])||3;var dR=parseFloat(rParts[1])||1;var total=bR+dR;
var barX=padL+chartW*0.15,barW=chartW*0.7,barY=H-28,barH=14;
var bW=barW*(bR/total),dW=barW*(dR/total);
ctx.fillStyle='rgba(78,205,196,0.4)';ctx.fillRect(barX,barY,bW,barH);
ctx.fillStyle='rgba(255,184,0,0.4)';ctx.fillRect(barX+bW,barY,dW,barH);
ctx.fillStyle='#4ECDC4';ctx.font='9px sans-serif';ctx.fillText('Backswing',barX+bW/2,barY+11);
ctx.fillStyle='#FFB800';ctx.fillText('Downswing',barX+bW+dW/2,barY+11);
}

// ===== 2. CLUB DISTANCE CONFIDENCE INTERVAL Canvas 600x380 =====
function showClubCI(){
playSfx('ci_open');
var pn=getPanel('ci');
var data=lsGet('ci_data',{});
var CLUBS=['Driver','3W','5W','4I','5I','6I','7I','8I','9I','PW','GW','SW','LW'];
var html='<button class="v23-close" onclick="window._v23Close(\'ci\')">&times;</button>';
html+='<div class="v23-title">&#x1F4CF; &#xD074;&#xB7FD; &#xBE44;&#xAC70;&#xB9AC; &#xC2E0;&#xB8B0;&#xAD6C;&#xAC04;</div>';
html+='<canvas id="v23-ci-canvas" width="600" height="380" style="width:100%;max-width:600px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v23-card"><h3>&#xC0F7; &#xAC70;&#xB9AC; &#xC785;&#xB825;</h3>';
html+='<div style="display:grid;grid-template-columns:auto 1fr auto;gap:6px;align-items:center">';
html+='<select class="v23-input" id="v23-ci-club" style="width:90px">';
for(var i=0;i<CLUBS.length;i++)html+='<option>'+CLUBS[i]+'</option>';
html+='</select>';
html+='<input class="v23-input" type="number" id="v23-ci-dist" placeholder="&#xAC70;&#xB9AC;(yd)" min="10" max="350">';
html+='<button class="v23-btn v23-btn-primary" onclick="window._v23AddCI()">&#xCD94;&#xAC00;</button>';
html+='</div></div>';
var totalShots=0;for(var k in data)if(data[k])totalShots+=data[k].length;
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#00FF88">'+totalShots+'</div><div class="v23-stat-label">&#xCD1D; &#xC0F7;&#xC218;</div></div>';
var clubCount=0;for(var k in data)if(data[k]&&data[k].length>=3)clubCount++;
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#FFB800">'+clubCount+'</div><div class="v23-stat-label">&#xBD84;&#xC11D;&#xAC00;&#xB2A5; &#xD074;&#xB7FD;</div></div>';
var grade=totalShots>=100?'S':totalShots>=60?'A':totalShots>=30?'B':totalShots>=10?'C':'D';
var gColor=grade==='S'?'#FFD700':grade==='A'?'#00FF88':grade==='B'?'#4ECDC4':grade==='C'?'#FFB800':'#FF6B6B';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:'+gColor+'">'+grade+'</div><div class="v23-stat-label">&#xB370;&#xC774;&#xD130; &#xB4F1;&#xAE09;</div></div>';
html+='</div>';
if(totalShots>0)html+='<button class="v23-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'&#xCD08;&#xAE30;&#xD654;?\'))window._v23ResetCI()">&#xCD08;&#xAE30;&#xD654;</button>';
pn.innerHTML=html;openPanel('ci');drawCICanvas(data,CLUBS);
}
window._v23AddCI=function(){
playSfx('save_v23');
var club=document.getElementById('v23-ci-club').value;
var dist=parseInt(document.getElementById('v23-ci-dist').value);
if(!dist||dist<10)return showToast('&#xAC70;&#xB9AC;&#xB97C; &#xC785;&#xB825;&#xD558;&#xC138;&#xC694;');
var data=lsGet('ci_data',{});
if(!data[club])data[club]=[];
data[club].push(dist);
if(data[club].length>100)data[club].shift();
lsSet('ci_data',data);showToast(club+': '+dist+'yd &#xCD94;&#xAC00;');checkAchievements();showClubCI();
};
window._v23ResetCI=function(){lsSet('ci_data',{});showClubCI();};
function drawCICanvas(data,CLUBS){
var c=document.getElementById('v23-ci-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=600,H=380;ctx.clearRect(0,0,W,H);
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Club Distance Box Plot (Min/Q1/Med/Q3/Max)',W/2,24);
var padTop=44,padBot=40,padL=50,padR=20;
var chartW=W-padL-padR,chartH=H-padTop-padBot;
var allDists=[];for(var k in data)if(data[k])for(var i=0;i<data[k].length;i++)allDists.push(data[k][i]);
if(allDists.length===0){ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='13px sans-serif';ctx.fillText('Add shot distances to see box plot',W/2,H/2);return}
var maxD=Math.max.apply(null,allDists)+10,minD=Math.max(0,Math.min.apply(null,allDists)-10);
var range=maxD-minD;
ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.lineWidth=1;
for(var i=0;i<=5;i++){var x=padL+chartW*(i/5);ctx.beginPath();ctx.moveTo(x,padTop);ctx.lineTo(x,padTop+chartH);ctx.stroke();
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='9px sans-serif';ctx.textAlign='center';ctx.fillText(Math.round(minD+range*(i/5))+'',x,padTop+chartH+14)}
ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='9px sans-serif';ctx.textAlign='center';ctx.fillText('Distance (yd)',W/2,H-6);
var colors=['#00FF88','#4ECDC4','#FFB800','#A855F7','#FF6B6B','#3B82F6','#EC4899','#10B981','#F59E0B','#6366F1','#EF4444','#14B8A6','#F97316'];
var validClubs=[];for(var i=0;i<CLUBS.length;i++)if(data[CLUBS[i]]&&data[CLUBS[i]].length>=3)validClubs.push(CLUBS[i]);
if(validClubs.length===0){ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='12px sans-serif';ctx.fillText('Need 3+ shots per club for box plot',W/2,H/2);return}
var rowH=chartH/validClubs.length;
for(var i=0;i<validClubs.length;i++){
var club=validClubs[i];var d=data[club].slice().sort(function(a,b){return a-b});
var n=d.length;var mn=d[0],mx=d[n-1];
var q1=d[Math.floor(n*0.25)],med=d[Math.floor(n*0.5)],q3=d[Math.floor(n*0.75)];
var y=padTop+rowH*i+rowH*0.2;var bh=rowH*0.6;
var xMn=padL+chartW*((mn-minD)/range);
var xMx=padL+chartW*((mx-minD)/range);
var xQ1=padL+chartW*((q1-minD)/range);
var xQ3=padL+chartW*((q3-minD)/range);
var xMed=padL+chartW*((med-minD)/range);
var col=colors[i%colors.length];
// whiskers
ctx.strokeStyle=col;ctx.lineWidth=1;
ctx.beginPath();ctx.moveTo(xMn,y+bh/2);ctx.lineTo(xQ1,y+bh/2);ctx.stroke();
ctx.beginPath();ctx.moveTo(xQ3,y+bh/2);ctx.lineTo(xMx,y+bh/2);ctx.stroke();
ctx.beginPath();ctx.moveTo(xMn,y+bh*0.3);ctx.lineTo(xMn,y+bh*0.7);ctx.stroke();
ctx.beginPath();ctx.moveTo(xMx,y+bh*0.3);ctx.lineTo(xMx,y+bh*0.7);ctx.stroke();
// box
ctx.fillStyle=col.replace(')',',0.2)').replace('rgb','rgba');
if(col.charAt(0)==='#'){var r=parseInt(col.slice(1,3),16),gg=parseInt(col.slice(3,5),16),b=parseInt(col.slice(5,7),16);ctx.fillStyle='rgba('+r+','+gg+','+b+',0.2)'}
ctx.fillRect(xQ1,y,xQ3-xQ1,bh);
ctx.strokeStyle=col;ctx.lineWidth=1.5;ctx.strokeRect(xQ1,y,xQ3-xQ1,bh);
// median line
ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(xMed,y);ctx.lineTo(xMed,y+bh);ctx.stroke();
// label
ctx.fillStyle='#fff';ctx.font='bold 10px sans-serif';ctx.textAlign='right';
ctx.fillText(club,padL-6,y+bh/2+4);
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='8px sans-serif';ctx.textAlign='left';
ctx.fillText(med+'yd',xMed+4,y-2);
}
}

// ===== 3. SHOT QUALITY INDEX (SQI) Canvas 620x400 =====
function showSQI(){
playSfx('sqi_open');
var pn=getPanel('sqi');
var log=lsGet('sqi_log',[]);
var AXES=['&#xBE44;&#xAC70;&#xB9AC;','&#xBC29;&#xD5A5;','&#xD0C4;&#xB3C4;','&#xC2A4;&#xD540;','&#xCC29;&#xC9C0;','&#xACB0;&#xACFC;','&#xC758;&#xB3C4;'];
var AXES_EN=['Distance','Direction','Trajectory','Spin','Landing','Result','Intent'];
var html='<button class="v23-close" onclick="window._v23Close(\'sqi\')">&times;</button>';
html+='<div class="v23-title">&#x2B50; &#xC0F7; &#xD038;&#xB9AC;&#xD2F0; &#xC778;&#xB371;&#xC2A4; (SQI)</div>';
html+='<canvas id="v23-sqi-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v23-card"><h3>&#xC0F7; &#xD3C9;&#xAC00; (1~10&#xC810;)</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px">';
for(var i=0;i<AXES.length;i++){
html+='<div><label class="v23-label">'+AXES[i]+'</label><input class="v23-input v23-sqi-in" type="number" min="1" max="10" value="7" data-axis="'+i+'"></div>';
}
html+='<div><button class="v23-btn v23-btn-primary" style="height:100%;width:100%" onclick="window._v23RateSQI()">&#x1F3AF; &#xD3C9;&#xAC00;</button></div>';
html+='</div></div>';
var avgSqi=0;if(log.length>0){for(var j=0;j<log.length;j++)avgSqi+=log[j].total;avgSqi=Math.round(avgSqi/log.length*10)/10}
var bestSqi=0;for(var j=0;j<log.length;j++)if(log[j].total>bestSqi)bestSqi=log[j].total;
var sqiGrade=avgSqi>=9?'S':avgSqi>=7.5?'A':avgSqi>=6?'B':avgSqi>=4?'C':'D';
var sqiColor=sqiGrade==='S'?'#FFD700':sqiGrade==='A'?'#00FF88':sqiGrade==='B'?'#4ECDC4':sqiGrade==='C'?'#FFB800':'#FF6B6B';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#00FF88">'+log.length+'</div><div class="v23-stat-label">&#xD3C9;&#xAC00;&#xD68C;</div></div>';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#FFB800">'+avgSqi+'</div><div class="v23-stat-label">&#xD3C9;&#xADE0; SQI</div></div>';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#4ECDC4">'+bestSqi+'</div><div class="v23-stat-label">&#xCD5C;&#xACE0; SQI</div></div>';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:'+sqiColor+'">'+sqiGrade+'</div><div class="v23-stat-label">&#xB4F1;&#xAE09;</div></div>';
html+='</div>';
if(log.length>0)html+='<button class="v23-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'&#xCD08;&#xAE30;&#xD654;?\'))window._v23ResetSQI()">&#xCD08;&#xAE30;&#xD654;</button>';
pn.innerHTML=html;openPanel('sqi');drawSQICanvas(log,AXES_EN);
}
window._v23RateSQI=function(){
playSfx('sqi_rate');
var inputs=document.querySelectorAll('.v23-sqi-in');var scores=[];var total=0;
for(var i=0;i<inputs.length;i++){var v=parseInt(inputs[i].value)||5;v=Math.max(1,Math.min(10,v));scores.push(v);total+=v}
total=Math.round(total/scores.length*10)/10;
var log=lsGet('sqi_log',[]);log.push({date:todayStr(),scores:scores,total:total});
if(log.length>50)log.shift();lsSet('sqi_log',log);
showToast('SQI: '+total+'/10');checkAchievements();showSQI();
};
window._v23ResetSQI=function(){lsSet('sqi_log',[]);showSQI();};
function drawSQICanvas(log,axes){
var c=document.getElementById('v23-sqi-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);ctx.fillStyle='#0d1117';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Shot Quality Radar (7-axis)',W/2,24);
var cx=W/2,cy=H/2+10,R=130,n=axes.length;
// grid
for(var r=2;r<=10;r+=2){
ctx.beginPath();ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.lineWidth=1;
for(var i=0;i<=n;i++){
var angle=-Math.PI/2+(2*Math.PI*i/n);
var x=cx+R*(r/10)*Math.cos(angle),y=cy+R*(r/10)*Math.sin(angle);
if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
}
ctx.closePath();ctx.stroke();
}
// axis lines + labels
for(var i=0;i<n;i++){
var angle=-Math.PI/2+(2*Math.PI*i/n);
ctx.beginPath();ctx.strokeStyle='rgba(255,255,255,0.1)';
ctx.moveTo(cx,cy);ctx.lineTo(cx+R*Math.cos(angle),cy+R*Math.sin(angle));ctx.stroke();
var lx=cx+(R+20)*Math.cos(angle),ly=cy+(R+20)*Math.sin(angle);
ctx.fillStyle='rgba(255,255,255,0.7)';ctx.font='10px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
ctx.fillText(axes[i],lx,ly);
}
if(log.length===0){ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='13px sans-serif';ctx.fillText('Rate shots to see radar',cx,cy);return}
// latest entry
var latest=log[log.length-1];
ctx.beginPath();ctx.fillStyle='rgba(0,255,136,0.15)';ctx.strokeStyle='#00FF88';ctx.lineWidth=2;
for(var i=0;i<n;i++){
var angle=-Math.PI/2+(2*Math.PI*i/n);
var val=latest.scores[i]/10;
var x=cx+R*val*Math.cos(angle),y=cy+R*val*Math.sin(angle);
if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
}
ctx.closePath();ctx.fill();ctx.stroke();
// avg if >1
if(log.length>1){
var avgScores=[];for(var a=0;a<n;a++){var s=0;for(var j=0;j<log.length;j++)s+=log[j].scores[a];avgScores.push(s/log.length)}
ctx.beginPath();ctx.strokeStyle='rgba(255,184,0,0.5)';ctx.lineWidth=1;ctx.setLineDash([4,3]);
for(var i=0;i<n;i++){
var angle=-Math.PI/2+(2*Math.PI*i/n);
var val=avgScores[i]/10;
var x=cx+R*val*Math.cos(angle),y=cy+R*val*Math.sin(angle);
if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
}
ctx.closePath();ctx.stroke();ctx.setLineDash([]);
}
ctx.fillStyle='#00FF88';ctx.font='bold 28px sans-serif';ctx.textAlign='center';
ctx.fillText(latest.total+'',cx,cy+4);
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='10px sans-serif';ctx.fillText('SQI',cx,cy+18);
}

// ===== 4. GREEN SLOPE CALCULATOR Canvas 600x380 =====
function showGreenSlope(){
playSfx('slope_open');
var pn=getPanel('slope');
var log=lsGet('slope_log',[]);
var html='<button class="v23-close" onclick="window._v23Close(\'slope\')">&times;</button>';
html+='<div class="v23-title">&#x26F3; &#xADF8;&#xB9B0; &#xACBD;&#xC0AC; &#xACC4;&#xC0B0;&#xAE30;</div>';
html+='<canvas id="v23-slope-canvas" width="600" height="380" style="width:100%;max-width:600px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v23-card"><h3>&#xACBD;&#xC0AC; &#xC785;&#xB825; (%)</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:6px">';
html+='<div><label class="v23-label">&#xC55E;-&#xB4A4; (+ = &#xC624;&#xB974;&#xB9C9;)</label><input class="v23-input" type="number" id="v23-slope-fb" value="0" min="-10" max="10" step="0.5"></div>';
html+='<div><label class="v23-label">&#xC88C;-&#xC6B0; (+ = &#xC6B0;&#xCE21;)</label><input class="v23-input" type="number" id="v23-slope-lr" value="0" min="-10" max="10" step="0.5"></div>';
html+='<div><label class="v23-label">&#xAC70;&#xB9AC; (ft)</label><input class="v23-input" type="number" id="v23-slope-dist" value="20" min="1" max="100"></div>';
html+='<div><label class="v23-label">&#xADF8;&#xB9B0;&#xC2A4;&#xD53C;&#xB4DC; (Stimp)</label><input class="v23-input" type="number" id="v23-slope-stimp" value="10" min="6" max="14" step="0.5"></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
html+='<button class="v23-btn v23-btn-primary" onclick="window._v23CalcSlope()">&#x1F4D0; &#xACC4;&#xC0B0;</button>';
html+='<button class="v23-btn" onclick="window._v23SaveSlope()">&#x1F4BE; &#xC800;&#xC7A5;</button>';
html+='</div></div>';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#00FF88">'+log.length+'</div><div class="v23-stat-label">&#xAE30;&#xB85D;</div></div>';
var avgSlope=0;if(log.length>0){for(var j=0;j<log.length;j++)avgSlope+=Math.abs(log[j].fb)+Math.abs(log[j].lr);avgSlope=Math.round(avgSlope/log.length*10)/10}
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#FFB800">'+avgSlope+'%</div><div class="v23-stat-label">&#xD3C9;&#xADE0; &#xACBD;&#xC0AC;</div></div>';
var uphill=0;for(var j=0;j<log.length;j++)if(log[j].fb>0)uphill++;
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#4ECDC4">'+(log.length>0?Math.round(uphill/log.length*100):0)+'%</div><div class="v23-stat-label">&#xC624;&#xB974;&#xB9C9;</div></div>';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#A855F7">'+(log.length>0?Math.round((log.length-uphill)/log.length*100):0)+'%</div><div class="v23-stat-label">&#xB0B4;&#xB9AC;&#xB9C9;</div></div>';
html+='</div>';
if(log.length>0)html+='<button class="v23-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'&#xCD08;&#xAE30;&#xD654;?\'))window._v23ResetSlope()">&#xCD08;&#xAE30;&#xD654;</button>';
pn.innerHTML=html;openPanel('slope');drawSlopeCanvas(log);
}
window._v23CalcSlope=function(){
playSfx('slope_calc');
var fb=parseFloat(document.getElementById('v23-slope-fb').value)||0;
var lr=parseFloat(document.getElementById('v23-slope-lr').value)||0;
var dist=parseFloat(document.getElementById('v23-slope-dist').value)||20;
var stimp=parseFloat(document.getElementById('v23-slope-stimp').value)||10;
var aimAdj=Math.round(Math.atan2(lr,1)*180/Math.PI*10)/10;
var speedAdj=fb>0?Math.round(dist*(1+fb*0.04))+'ft':Math.round(dist*(1-Math.abs(fb)*0.03))+'ft';
var breakAmt=Math.round(Math.abs(lr)*dist*0.15*10)/10;
showToast('Aim: '+aimAdj+'° | Speed: '+speedAdj+' | Break: '+breakAmt+'in');
drawSlopeCanvas(lsGet('slope_log',[]),{fb:fb,lr:lr,dist:dist,stimp:stimp,aimAdj:aimAdj,breakAmt:breakAmt});
};
window._v23SaveSlope=function(){
playSfx('save_v23');
var fb=parseFloat(document.getElementById('v23-slope-fb').value)||0;
var lr=parseFloat(document.getElementById('v23-slope-lr').value)||0;
var dist=parseFloat(document.getElementById('v23-slope-dist').value)||20;
var stimp=parseFloat(document.getElementById('v23-slope-stimp').value)||10;
var log=lsGet('slope_log',[]);log.push({date:todayStr(),fb:fb,lr:lr,dist:dist,stimp:stimp});
if(log.length>50)log.shift();lsSet('slope_log',log);
showToast('&#xACBD;&#xC0AC; &#xAE30;&#xB85D; &#xC800;&#xC7A5;!');checkAchievements();showGreenSlope();
};
window._v23ResetSlope=function(){lsSet('slope_log',[]);showGreenSlope();};
function drawSlopeCanvas(log,calc){
var c=document.getElementById('v23-slope-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=600,H=380;ctx.clearRect(0,0,W,H);ctx.fillStyle='#0d1117';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Green Slope AimPoint Visualizer',W/2,24);
// draw green
var gx=W/2,gy=H/2+10,gr=120;
var grad=ctx.createRadialGradient(gx,gy,0,gx,gy,gr);
grad.addColorStop(0,'#1a7a3a');grad.addColorStop(1,'#0d4d22');
ctx.beginPath();ctx.ellipse(gx,gy,gr,gr*0.85,0,0,Math.PI*2);ctx.fillStyle=grad;ctx.fill();
ctx.strokeStyle='rgba(255,255,255,0.15)';ctx.lineWidth=1;ctx.stroke();
// hole
ctx.beginPath();ctx.arc(gx,gy-20,5,0,Math.PI*2);ctx.fillStyle='#222';ctx.fill();
ctx.strokeStyle='#fff';ctx.lineWidth=1;ctx.stroke();
// flag
ctx.strokeStyle='#fff';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(gx,gy-20);ctx.lineTo(gx,gy-55);ctx.stroke();
ctx.fillStyle='#FF3366';ctx.beginPath();ctx.moveTo(gx,gy-55);ctx.lineTo(gx+15,gy-48);ctx.lineTo(gx,gy-41);ctx.fill();
// ball position
ctx.beginPath();ctx.arc(gx,gy+60,4,0,Math.PI*2);ctx.fillStyle='#fff';ctx.fill();
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='9px sans-serif';ctx.fillText('Ball',gx,gy+72);
if(calc){
// aim line
var aimAngle=(-90+calc.aimAdj)*Math.PI/180;
var lineLen=80;
ctx.beginPath();ctx.strokeStyle='#FFB800';ctx.lineWidth=2;ctx.setLineDash([5,3]);
ctx.moveTo(gx,gy+60);ctx.lineTo(gx+lineLen*Math.cos(aimAngle),gy+60+lineLen*Math.sin(aimAngle));
ctx.stroke();ctx.setLineDash([]);
// break arrow
if(Math.abs(calc.lr)>0.3){
var dir=calc.lr>0?1:-1;
ctx.fillStyle='rgba(78,205,196,0.6)';ctx.font='bold 20px sans-serif';
ctx.fillText(dir>0?'→':'←',gx+dir*40,gy+20);
ctx.fillStyle='#4ECDC4';ctx.font='10px sans-serif';
ctx.fillText('Break: '+calc.breakAmt+'in',gx+dir*40,gy+35);
}
// slope indicator
ctx.fillStyle='#FFB800';ctx.font='bold 11px sans-serif';
if(calc.fb>0)ctx.fillText('↑ Uphill +'+calc.fb+'%',gx,gy-70);
else if(calc.fb<0)ctx.fillText('↓ Downhill '+calc.fb+'%',gx,gy-70);
ctx.fillStyle='#00FF88';ctx.font='10px sans-serif';
ctx.fillText('Aim: '+calc.aimAdj+'°',gx-gr-30,gy);
} else {
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='11px sans-serif';
ctx.fillText('Enter slope and press Calculate',gx,H-30);
}
// slope arrows
ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='9px sans-serif';
ctx.fillText('↑ Front',gx,padT(gy,-gr-12));ctx.fillText('↓ Back',gx,gy+gr*0.85+14);
ctx.fillText('← Left',gx-gr-15,gy);ctx.fillText('Right →',gx+gr+15,gy);
function padT(a,b){return a+b}
}

// ===== 5. TOURNAMENT SCORING SIMULATOR Canvas 620x380 =====
function showTourneySim(){
playSfx('tourney_open');
var pn=getPanel('tourney');
var log=lsGet('tourney_log',[]);
var mode=lsGet('tourney_mode','stroke');
var MODES=[{id:'stroke',name:'Stroke Play'},{id:'match',name:'Match Play'},{id:'stableford',name:'Stableford'},{id:'skins',name:'Skins'}];
var PARS=[4,4,3,5,4,4,3,4,5,4,3,5,4,4,3,4,5,4];
var html='<button class="v23-close" onclick="window._v23Close(\'tourney\')">&times;</button>';
html+='<div class="v23-title">&#x1F3C6; &#xD1A0;&#xB108;&#xBA3C;&#xD2B8; &#xC2A4;&#xCF54;&#xC5B4;&#xB9C1; &#xC2DC;&#xBBAC;</div>';
html+='<canvas id="v23-tourney-canvas" width="620" height="380" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v23-card"><h3>&#xBC29;&#xC2DD; &#xC120;&#xD0DD;</h3>';
html+='<div style="display:flex;gap:4px;flex-wrap:wrap">';
for(var i=0;i<MODES.length;i++)html+='<button class="v23-btn v23-btn-sm'+(MODES[i].id===mode?' v23-btn-primary':'')+'" onclick="window._v23SetTourneyMode(\''+MODES[i].id+'\')">'+MODES[i].name+'</button>';
html+='</div></div>';
html+='<div class="v23-card"><h3>18&#xD640; &#xC2A4;&#xCF54;&#xC5B4; &#xC785;&#xB825;</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(9,1fr);gap:2px;font-size:10px;text-align:center">';
for(var h=0;h<18;h++){
var saved=lsGet('tourney_scores',[]);var val=saved[h]||PARS[h];
html+='<div><div style="color:rgba(255,255,255,0.4)">H'+(h+1)+'</div><div style="color:rgba(255,255,255,0.3);font-size:8px">P'+PARS[h]+'</div><input class="v23-input v23-tourney-in" type="number" value="'+val+'" min="1" max="12" style="width:100%;padding:3px;font-size:10px;text-align:center" data-hole="'+h+'"></div>';
}
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
html+='<button class="v23-btn v23-btn-primary" onclick="window._v23CalcTourney()">&#x1F4CA; &#xACC4;&#xC0B0;</button>';
html+='<button class="v23-btn" onclick="window._v23SaveTourney()">&#x1F4BE; &#xC800;&#xC7A5;</button>';
html+='</div></div>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#00FF88">'+log.length+'</div><div class="v23-stat-label">&#xB77C;&#xC6B4;&#xB4DC;</div></div>';
var avgScore=0;if(log.length>0){for(var j=0;j<log.length;j++)avgScore+=log[j].total;avgScore=Math.round(avgScore/log.length)}
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#FFB800">'+avgScore+'</div><div class="v23-stat-label">&#xD3C9;&#xADE0; &#xC2A4;&#xCF54;&#xC5B4;</div></div>';
var bestScore=999;for(var j=0;j<log.length;j++)if(log[j].total<bestScore)bestScore=log[j].total;if(bestScore===999)bestScore=0;
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#4ECDC4">'+bestScore+'</div><div class="v23-stat-label">&#xBCA0;&#xC2A4;&#xD2B8;</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('tourney');drawTourneyCanvas(log,mode,PARS);
}
window._v23SetTourneyMode=function(m){lsSet('tourney_mode',m);showTourneySim();};
window._v23CalcTourney=function(){
playSfx('tourney_hole');
var inputs=document.querySelectorAll('.v23-tourney-in');
var scores=[];var total=0;var PARS=[4,4,3,5,4,4,3,4,5,4,3,5,4,4,3,4,5,4];
for(var i=0;i<inputs.length;i++){var v=parseInt(inputs[i].value)||PARS[i];scores.push(v);total+=v}
lsSet('tourney_scores',scores);
var par=0;for(var i=0;i<PARS.length;i++)par+=PARS[i];
var diff=total-par;var diffStr=diff>0?'+'+diff:diff===0?'E':''+diff;
var mode=lsGet('tourney_mode','stroke');
var result='';
if(mode==='stroke')result='Total: '+total+' ('+diffStr+')';
else if(mode==='stableford'){var pts=0;for(var i=0;i<scores.length;i++){var d=PARS[i]-scores[i];if(d>=3)pts+=5;else if(d===2)pts+=4;else if(d===1)pts+=3;else if(d===0)pts+=2;else if(d===-1)pts+=1}result='Stableford: '+pts+'pts'}
else if(mode==='skins'){var skins=0;for(var i=0;i<scores.length;i++)if(scores[i]<=PARS[i]-1)skins++;result='Skins Won: '+skins}
else result='Total: '+total+' ('+diffStr+')';
showToast(result);drawTourneyCanvas(lsGet('tourney_log',[]),mode,PARS,scores);
};
window._v23SaveTourney=function(){
playSfx('save_v23');
var inputs=document.querySelectorAll('.v23-tourney-in');
var scores=[];var total=0;var PARS=[4,4,3,5,4,4,3,4,5,4,3,5,4,4,3,4,5,4];
for(var i=0;i<inputs.length;i++){var v=parseInt(inputs[i].value)||PARS[i];scores.push(v);total+=v}
var log=lsGet('tourney_log',[]);log.push({date:todayStr(),scores:scores,total:total,mode:lsGet('tourney_mode','stroke')});
if(log.length>30)log.shift();lsSet('tourney_log',log);lsSet('tourney_scores',scores);
showToast('&#xD1A0;&#xB108;&#xBA3C;&#xD2B8; &#xAE30;&#xB85D; &#xC800;&#xC7A5;!');checkAchievements();showTourneySim();
};
function drawTourneyCanvas(log,mode,PARS,current){
var c=document.getElementById('v23-tourney-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=380;ctx.clearRect(0,0,W,H);ctx.fillStyle='#0d1117';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Tournament Scorecard - '+mode.charAt(0).toUpperCase()+mode.slice(1),W/2,24);
var scores=current||lsGet('tourney_scores',[]);
if(scores.length<18){ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='13px sans-serif';ctx.fillText('Enter scores and press Calculate',W/2,H/2);return}
var padTop=44,padBot=36,padL=40,padR=20;
var chartW=W-padL-padR,chartH=H-padTop-padBot;
var barW=chartW/18;
var par=0;for(var i=0;i<PARS.length;i++)par+=PARS[i];
// par line
var maxDiff=0;for(var i=0;i<18;i++){var d=Math.abs(scores[i]-PARS[i]);if(d>maxDiff)maxDiff=d}
maxDiff=Math.max(maxDiff,3);
var zeroY=padTop+chartH/2;
for(var i=0;i<18;i++){
var diff=scores[i]-PARS[i];
var barH=(diff/maxDiff)*(chartH/2-10);
var x=padL+barW*i+barW*0.15;var w=barW*0.7;
var color=diff<=-2?'#FFD700':diff===-1?'#00FF88':diff===0?'#4ECDC4':diff===1?'#FFB800':diff===2?'#FF6B6B':'#FF3366';
if(diff>0){ctx.fillStyle=color;ctx.fillRect(x,zeroY,w,barH)}
else if(diff<0){ctx.fillStyle=color;ctx.fillRect(x,zeroY+barH,w,-barH)}
else{ctx.fillStyle=color;ctx.fillRect(x,zeroY-2,w,4)}
// labels
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='8px sans-serif';ctx.textAlign='center';
ctx.fillText('H'+(i+1),padL+barW*i+barW/2,H-padBot+12);
ctx.fillText(scores[i]+'',padL+barW*i+barW/2,diff>=0?zeroY+barH+12:zeroY+barH-4);
var lbl=diff===0?'E':diff>0?'+'+diff:''+diff;
ctx.fillStyle=color;ctx.font='bold 8px sans-serif';
ctx.fillText(lbl,padL+barW*i+barW/2,diff>=0?zeroY-6:zeroY+6);
}
// par line
ctx.strokeStyle='rgba(255,255,255,0.3)';ctx.lineWidth=1;ctx.setLineDash([4,3]);
ctx.beginPath();ctx.moveTo(padL,zeroY);ctx.lineTo(padL+chartW,zeroY);ctx.stroke();ctx.setLineDash([]);
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='9px sans-serif';ctx.textAlign='right';ctx.fillText('PAR',padL-4,zeroY+4);
// total
var total=0;for(var i=0;i<18;i++)total+=scores[i];
var diffTotal=total-par;var diffStr=diffTotal>0?'+'+diffTotal:diffTotal===0?'E':''+diffTotal;
ctx.fillStyle='#fff';ctx.font='bold 14px sans-serif';ctx.textAlign='center';
ctx.fillText('Total: '+total+' ('+diffStr+')',W/2,H-8);
}

// ===== 6. DRIVING ACCURACY ZONE MAP Canvas 620x400 =====
function showDriveZone(){
playSfx('drivezone_open');
var pn=getPanel('drivezone');
var log=lsGet('drivezone_log',[]);
var ZONES=['Far Left','Left','Slight Left','Center','Slight Right','Right','Far Right'];
var RESULTS=['Fairway','Rough','Bunker','Trees','OB','Hazard'];
var html='<button class="v23-close" onclick="window._v23Close(\'drivezone\')">&times;</button>';
html+='<div class="v23-title">&#x1F3CC; &#xB4DC;&#xB77C;&#xC774;&#xBE59; &#xC815;&#xD655;&#xB3C4; &#xC874;&#xB9F5;</div>';
html+='<canvas id="v23-drivezone-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v23-card"><h3>&#xC0F7; &#xAE30;&#xB85D;</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">';
html+='<div><label class="v23-label">&#xCC29;&#xC9C0; &#xBC29;&#xD5A5;</label><select class="v23-input" id="v23-dz-zone">';
for(var i=0;i<ZONES.length;i++)html+='<option'+(i===3?' selected':'')+'>'+ZONES[i]+'</option>';
html+='</select></div>';
html+='<div><label class="v23-label">&#xCC29;&#xC9C0; &#xACB0;&#xACFC;</label><select class="v23-input" id="v23-dz-result">';
for(var i=0;i<RESULTS.length;i++)html+='<option>'+RESULTS[i]+'</option>';
html+='</select></div>';
html+='</div>';
html+='<button class="v23-btn v23-btn-primary" style="width:100%;margin-top:8px" onclick="window._v23AddDriveZone()">&#xCD94;&#xAC00;</button>';
html+='</div>';
var fwPct=0;if(log.length>0){var fw=0;for(var j=0;j<log.length;j++)if(log[j].result==='Fairway')fw++;fwPct=Math.round(fw/log.length*100)}
var leftPct=0,rightPct=0;if(log.length>0){var l=0,r=0;for(var j=0;j<log.length;j++){var zi=ZONES.indexOf(log[j].zone);if(zi<3)l++;else if(zi>3)r++}leftPct=Math.round(l/log.length*100);rightPct=Math.round(r/log.length*100)}
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#00FF88">'+log.length+'</div><div class="v23-stat-label">&#xC0F7;&#xC218;</div></div>';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#FFB800">'+fwPct+'%</div><div class="v23-stat-label">FIR</div></div>';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#4ECDC4">'+leftPct+'%</div><div class="v23-stat-label">&#xC88C;&#xCE21;</div></div>';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#A855F7">'+rightPct+'%</div><div class="v23-stat-label">&#xC6B0;&#xCE21;</div></div>';
html+='</div>';
if(log.length>0)html+='<button class="v23-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'&#xCD08;&#xAE30;&#xD654;?\'))window._v23ResetDriveZone()">&#xCD08;&#xAE30;&#xD654;</button>';
pn.innerHTML=html;openPanel('drivezone');drawDriveZoneCanvas(log,ZONES,RESULTS);
}
window._v23AddDriveZone=function(){
playSfx('save_v23');
var zone=document.getElementById('v23-dz-zone').value;
var result=document.getElementById('v23-dz-result').value;
var log=lsGet('drivezone_log',[]);log.push({date:todayStr(),zone:zone,result:result});
if(log.length>200)log.shift();lsSet('drivezone_log',log);
showToast(zone+' - '+result);checkAchievements();showDriveZone();
};
window._v23ResetDriveZone=function(){lsSet('drivezone_log',[]);showDriveZone();};
function drawDriveZoneCanvas(log,ZONES,RESULTS){
var c=document.getElementById('v23-drivezone-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);ctx.fillStyle='#0d1117';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Driving Accuracy Heatmap ('+log.length+' shots)',W/2,24);
if(log.length===0){ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='13px sans-serif';ctx.fillText('Add drive results to see heatmap',W/2,H/2);return}
var padTop=44,padBot=36,padL=80,padR=30;
var chartW=W-padL-padR,chartH=H-padTop-padBot;
var colW=chartW/ZONES.length;var rowH=chartH/RESULTS.length;
var counts={};var maxCount=0;
for(var i=0;i<ZONES.length;i++)for(var j=0;j<RESULTS.length;j++)counts[i+'_'+j]=0;
for(var k=0;k<log.length;k++){var zi=ZONES.indexOf(log[k].zone);var ri=RESULTS.indexOf(log[k].result);if(zi>=0&&ri>=0){counts[zi+'_'+ri]++;if(counts[zi+'_'+ri]>maxCount)maxCount=counts[zi+'_'+ri]}}
for(var i=0;i<ZONES.length;i++){
for(var j=0;j<RESULTS.length;j++){
var cnt=counts[i+'_'+j];
var intensity=maxCount>0?cnt/maxCount:0;
var r=Math.round(255*intensity),g=Math.round(255*(1-intensity)*0.5),b=Math.round(136*(1-intensity));
ctx.fillStyle='rgba('+r+','+g+','+b+','+Math.max(0.08,intensity*0.8)+')';
ctx.fillRect(padL+colW*i+1,padTop+rowH*j+1,colW-2,rowH-2);
if(cnt>0){ctx.fillStyle='#fff';ctx.font='bold 11px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
ctx.fillText(cnt+'',padL+colW*i+colW/2,padTop+rowH*j+rowH/2)}
}
}
// column labels
ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='8px sans-serif';ctx.textAlign='center';ctx.textBaseline='top';
for(var i=0;i<ZONES.length;i++)ctx.fillText(ZONES[i],padL+colW*i+colW/2,H-padBot+4);
// row labels
ctx.textAlign='right';ctx.textBaseline='middle';ctx.font='9px sans-serif';
for(var j=0;j<RESULTS.length;j++){
var colors=['#00FF88','#FFB800','#F59E0B','#A855F7','#FF3366','#3B82F6'];
ctx.fillStyle=colors[j];
ctx.fillText(RESULTS[j],padL-6,padTop+rowH*j+rowH/2);
}
}

// ===== 7. PRACTICE EFFICIENCY DASHBOARD Canvas 600x380 =====
function showPracticeEff(){
playSfx('practice_open');
var pn=getPanel('practiceeff');
var data=lsGet('practice_eff',{});
var AREAS=[{id:'short',name:'&#xC21;&#xAC8C;&#xC784;',en:'Short Game'},{id:'middle',name:'&#xBBF8;&#xB4E4;&#xC544;&#xC774;&#xC5B8;',en:'Mid Iron'},{id:'long',name:'&#xB871;&#xAC8C;&#xC784;',en:'Long Game'},{id:'putting',name:'&#xD37C;&#xD305;',en:'Putting'},{id:'chipping',name:'&#xCE69;&#xD551;',en:'Chipping'},{id:'bunker',name:'&#xBC99;&#xCEE4;',en:'Bunker'}];
var html='<button class="v23-close" onclick="window._v23Close(\'practiceeff\')">&times;</button>';
html+='<div class="v23-title">&#x1F4CA; &#xC5F0;&#xC2B5; &#xD6A8;&#xC728; &#xB300;&#xC2DC;&#xBCF4;&#xB4DC;</div>';
html+='<canvas id="v23-practiceeff-canvas" width="600" height="380" style="width:100%;max-width:600px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v23-card"><h3>&#xC5F0;&#xC2B5; &#xAE30;&#xB85D; (&#xBD84;/&#xD5A5;&#xC0C1;&#xB3C4;1~10)</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px">';
for(var i=0;i<AREAS.length;i++){
var val=data[AREAS[i].id]||{time:0,improve:5};
html+='<div style="text-align:center"><label class="v23-label">'+AREAS[i].name+'</label>';
html+='<input class="v23-input" type="number" id="v23-pe-t-'+AREAS[i].id+'" placeholder="min" value="'+val.time+'" min="0" max="999" style="margin-bottom:2px">';
html+='<input class="v23-input" type="number" id="v23-pe-i-'+AREAS[i].id+'" placeholder="1-10" value="'+val.improve+'" min="1" max="10"></div>';
}
html+='</div>';
html+='<button class="v23-btn v23-btn-primary" style="width:100%;margin-top:8px" onclick="window._v23SavePracticeEff()">&#x1F4BE; &#xC800;&#xC7A5;</button>';
html+='</div>';
var totalTime=0;for(var k in data)if(data[k])totalTime+=data[k].time;
var avgImprove=0,cnt=0;for(var k in data)if(data[k]&&data[k].time>0){avgImprove+=data[k].improve;cnt++}
if(cnt>0)avgImprove=Math.round(avgImprove/cnt*10)/10;
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#00FF88">'+totalTime+'</div><div class="v23-stat-label">&#xCD1D; &#xC5F0;&#xC2B5;(&#xBD84;)</div></div>';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#FFB800">'+avgImprove+'</div><div class="v23-stat-label">&#xD3C9;&#xADE0; &#xD5A5;&#xC0C1;&#xB3C4;</div></div>';
var efficiency=totalTime>0?Math.round(avgImprove/(totalTime/60)*10)/10:0;
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#4ECDC4">'+efficiency+'</div><div class="v23-stat-label">&#xD6A8;&#xC728;&#xC810;&#xC218;</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('practiceeff');drawPracticeEffCanvas(data,AREAS);
}
window._v23SavePracticeEff=function(){
playSfx('save_v23');
var AREAS=['short','middle','long','putting','chipping','bunker'];
var data={};for(var i=0;i<AREAS.length;i++){
var t=parseInt(document.getElementById('v23-pe-t-'+AREAS[i]).value)||0;
var imp=parseInt(document.getElementById('v23-pe-i-'+AREAS[i]).value)||5;
data[AREAS[i]]={time:t,improve:Math.max(1,Math.min(10,imp))};
}
lsSet('practice_eff',data);showToast('&#xC5F0;&#xC2B5; &#xD6A8;&#xC728; &#xC800;&#xC7A5;!');checkAchievements();showPracticeEff();
};
function drawPracticeEffCanvas(data,AREAS){
var c=document.getElementById('v23-practiceeff-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=600,H=380;ctx.clearRect(0,0,W,H);ctx.fillStyle='#0d1117';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Practice Time vs Improvement (Dual Axis)',W/2,24);
var padTop=50,padBot=50,padL=50,padR=50;
var chartW=W-padL-padR,chartH=H-padTop-padBot;
var n=AREAS.length;var barW=chartW/n;
var maxTime=0;for(var i=0;i<AREAS.length;i++){var d=data[AREAS[i].id];if(d&&d.time>maxTime)maxTime=d.time}
maxTime=Math.max(maxTime,30);
for(var i=0;i<=4;i++){
var y=padTop+chartH*(1-i/4);
ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(padL,y);ctx.lineTo(padL+chartW,y);ctx.stroke();
ctx.fillStyle='rgba(78,205,196,0.5)';ctx.font='9px sans-serif';ctx.textAlign='right';
ctx.fillText(Math.round(maxTime*(i/4))+'min',padL-6,y+3);
ctx.fillStyle='rgba(255,184,0,0.5)';ctx.textAlign='left';
ctx.fillText(Math.round(10*(i/4))+'',padL+chartW+6,y+3);
}
ctx.fillStyle='rgba(78,205,196,0.5)';ctx.font='9px sans-serif';ctx.textAlign='right';ctx.fillText('Time',padL-6,padTop-8);
ctx.fillStyle='rgba(255,184,0,0.5)';ctx.textAlign='left';ctx.fillText('Improve',padL+chartW+6,padTop-8);
for(var i=0;i<AREAS.length;i++){
var d=data[AREAS[i].id]||{time:0,improve:5};
var x=padL+barW*i;
// time bar
var th=chartH*(d.time/maxTime);
ctx.fillStyle='rgba(78,205,196,0.35)';
ctx.fillRect(x+barW*0.1,padTop+chartH-th,barW*0.35,th);
ctx.strokeStyle='#4ECDC4';ctx.lineWidth=1;ctx.strokeRect(x+barW*0.1,padTop+chartH-th,barW*0.35,th);
// improve bar
var ih=chartH*(d.improve/10);
ctx.fillStyle='rgba(255,184,0,0.35)';
ctx.fillRect(x+barW*0.55,padTop+chartH-ih,barW*0.35,ih);
ctx.strokeStyle='#FFB800';ctx.lineWidth=1;ctx.strokeRect(x+barW*0.55,padTop+chartH-ih,barW*0.35,ih);
// labels
ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='9px sans-serif';ctx.textAlign='center';
ctx.fillText(AREAS[i].en,x+barW/2,H-padBot+14);
if(d.time>0){ctx.fillStyle='#4ECDC4';ctx.font='8px sans-serif';ctx.fillText(d.time+'',x+barW*0.28,padTop+chartH-th-4)}
ctx.fillStyle='#FFB800';ctx.font='8px sans-serif';ctx.fillText(d.improve+'',x+barW*0.73,padTop+chartH-ih-4);
}
// efficiency line
ctx.beginPath();ctx.strokeStyle='#A855F7';ctx.lineWidth=2;
for(var i=0;i<AREAS.length;i++){
var d=data[AREAS[i].id]||{time:0,improve:5};
var eff=d.time>0?d.improve/(d.time/30):0;
var y=padTop+chartH*(1-Math.min(eff,10)/10);
var x=padL+barW*i+barW/2;
if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fillStyle='#A855F7';ctx.fill();
if(i>0){ctx.beginPath();ctx.strokeStyle='#A855F7';ctx.lineWidth=1.5;
var prevD=data[AREAS[i-1].id]||{time:0,improve:5};var prevEff=prevD.time>0?prevD.improve/(prevD.time/30):0;
var prevY=padTop+chartH*(1-Math.min(prevEff,10)/10);var prevX=padL+barW*(i-1)+barW/2;
ctx.moveTo(prevX,prevY);ctx.lineTo(x,y);ctx.stroke();}
}
}

// ===== 8. GOLF FITNESS PERIODIZATION Canvas 620x380 =====
function showFitnessPeriod(){
playSfx('fitness_open');
var pn=getPanel('fitness');
var plan=lsGet('fitness_plan',{week:1,phase:'base'});
var log=lsGet('fitness_log',[]);
var PHASES=[{id:'base',name:'&#xAE30;&#xCD08;&#xCCB4;&#xB825;',en:'Base',weeks:3,color:'#4ECDC4'},
{id:'build',name:'&#xBC1C;&#xB2EC;',en:'Build',weeks:4,color:'#FFB800'},
{id:'compete',name:'&#xACBD;&#xC7C1;',en:'Compete',weeks:3,color:'#FF6B6B'},
{id:'recovery',name:'&#xD68C;&#xBCF5;',en:'Recovery',weeks:2,color:'#A855F7'}];
var EXERCISES=['&#xCF54;&#xC5B4;&#xC548;&#xC815;&#xC131;','&#xD558;&#xCCB4;&#xADFC;&#xB825;','&#xD68C;&#xC804;&#xC720;&#xC5F0;&#xC131;','&#xC2EC;&#xD3D0;&#xC9C0;&#xAD6C;&#xB825;','&#xBC38;&#xB7F0;&#xC2A4;','&#xC2A4;&#xD2B8;&#xB808;&#xCE6D;'];
var EXERCISES_EN=['Core','Lower Body','Rotation','Cardio','Balance','Stretch'];
var html='<button class="v23-close" onclick="window._v23Close(\'fitness\')">&times;</button>';
html+='<div class="v23-title">&#x1F4AA; &#xACE8;&#xD504; &#xCCB4;&#xB825; &#xC8FC;&#xAE30;&#xD654;</div>';
html+='<canvas id="v23-fitness-canvas" width="620" height="380" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v23-card"><h3>&#xD604;&#xC7AC; &#xC8FC;&#xCC28;: '+plan.week+' ('+PHASES.filter(function(p){return p.id===plan.phase})[0].name+')</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px">';
for(var i=0;i<EXERCISES.length;i++){
var done=lsGet('fit_w'+plan.week+'_'+i,false);
html+='<button class="v23-btn v23-btn-sm'+(done?' v23-btn-primary':'')+'" onclick="window._v23ToggleFit('+i+')">'+EXERCISES[i]+(done?' ✓':'')+'</button>';
}
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:8px">';
html+='<button class="v23-btn" onclick="window._v23PrevWeek()">&#x25C0; &#xC774;&#xC804;</button>';
html+='<button class="v23-btn v23-btn-primary" onclick="window._v23NextWeek()">&#xB2E4;&#xC74C; &#x25B6;</button>';
html+='<button class="v23-btn" onclick="window._v23ResetFitness()">&#xCD08;&#xAE30;&#xD654;</button>';
html+='</div></div>';
var totalDone=0;for(var w=1;w<=12;w++)for(var i=0;i<6;i++)if(lsGet('fit_w'+w+'_'+i,false))totalDone++;
var completion=Math.round(totalDone/(12*6)*100);
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#00FF88">'+plan.week+'/12</div><div class="v23-stat-label">&#xC8FC;&#xCC28;</div></div>';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#FFB800">'+totalDone+'</div><div class="v23-stat-label">&#xC644;&#xB8CC; &#xC6B4;&#xB3D9;</div></div>';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#4ECDC4">'+completion+'%</div><div class="v23-stat-label">&#xC644;&#xC131;&#xB960;</div></div>';
var phaseInfo=PHASES.filter(function(p){return p.id===plan.phase})[0];
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:'+phaseInfo.color+'">'+phaseInfo.en+'</div><div class="v23-stat-label">&#xD398;&#xC774;&#xC988;</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('fitness');drawFitnessCanvas(plan,PHASES,EXERCISES_EN);
}
window._v23ToggleFit=function(idx){
var plan=lsGet('fitness_plan',{week:1,phase:'base'});
var key='fit_w'+plan.week+'_'+idx;
var cur=lsGet(key,false);lsSet(key,!cur);
if(!cur)playSfx('save_v23');
checkAchievements();showFitnessPeriod();
};
window._v23NextWeek=function(){
var plan=lsGet('fitness_plan',{week:1,phase:'base'});
plan.week=Math.min(12,plan.week+1);
if(plan.week<=3)plan.phase='base';else if(plan.week<=7)plan.phase='build';else if(plan.week<=10)plan.phase='compete';else plan.phase='recovery';
lsSet('fitness_plan',plan);showFitnessPeriod();
};
window._v23PrevWeek=function(){
var plan=lsGet('fitness_plan',{week:1,phase:'base'});
plan.week=Math.max(1,plan.week-1);
if(plan.week<=3)plan.phase='base';else if(plan.week<=7)plan.phase='build';else if(plan.week<=10)plan.phase='compete';else plan.phase='recovery';
lsSet('fitness_plan',plan);showFitnessPeriod();
};
window._v23ResetFitness=function(){
lsSet('fitness_plan',{week:1,phase:'base'});
for(var w=1;w<=12;w++)for(var i=0;i<6;i++)lsSet('fit_w'+w+'_'+i,false);
showFitnessPeriod();
};
function drawFitnessCanvas(plan,PHASES,EXERCISES){
var c=document.getElementById('v23-fitness-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=380;ctx.clearRect(0,0,W,H);ctx.fillStyle='#0d1117';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('12-Week Golf Fitness Periodization',W/2,24);
var padTop=50,padBot=46,padL=80,padR=20;
var chartW=W-padL-padR,chartH=H-padTop-padBot;
var colW=chartW/12;var rowH=chartH/6;
// week columns
for(var w=0;w<12;w++){
var phase;
if(w<3)phase=PHASES[0];else if(w<7)phase=PHASES[1];else if(w<10)phase=PHASES[2];else phase=PHASES[3];
// phase background
ctx.fillStyle=phase.color.replace(')',',0.06)');
var hex=phase.color;var r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);
ctx.fillStyle='rgba('+r+','+g+','+b+',0.06)';
ctx.fillRect(padL+colW*w,padTop,colW,chartH);
// exercise completion cells
for(var ex=0;ex<6;ex++){
var done=lsGet('fit_w'+(w+1)+'_'+ex,false);
var x=padL+colW*w+1,y=padTop+rowH*ex+1;
if(done){
ctx.fillStyle='rgba('+r+','+g+','+b+',0.4)';
ctx.fillRect(x,y,colW-2,rowH-2);
ctx.fillStyle='#fff';ctx.font='bold 10px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
ctx.fillText('✓',x+colW/2-1,y+rowH/2);
}else{
ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.lineWidth=0.5;ctx.strokeRect(x,y,colW-2,rowH-2);
}
}
// week label
ctx.fillStyle=(w+1===plan.week)?'#fff':'rgba(255,255,255,0.4)';
ctx.font=(w+1===plan.week)?'bold 9px sans-serif':'8px sans-serif';
ctx.textAlign='center';ctx.textBaseline='top';
ctx.fillText('W'+(w+1),padL+colW*w+colW/2,H-padBot+4);
// current week marker
if(w+1===plan.week){
ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.strokeRect(padL+colW*w,padTop,colW,chartH);
}
}
// phase labels at bottom
var phaseX=padL;
for(var i=0;i<PHASES.length;i++){
var pw=colW*PHASES[i].weeks;
ctx.fillStyle=PHASES[i].color;ctx.font='bold 9px sans-serif';ctx.textAlign='center';
ctx.fillText(PHASES[i].en,phaseX+pw/2,H-padBot+18);
phaseX+=pw;
}
// exercise labels
ctx.textAlign='right';ctx.textBaseline='middle';ctx.font='9px sans-serif';
for(var i=0;i<EXERCISES.length;i++){
ctx.fillStyle='rgba(255,255,255,0.6)';
ctx.fillText(EXERCISES[i],padL-6,padTop+rowH*i+rowH/2);
}
}

// ===== QUIZ v23 (+15 = 225->240) =====
var QUIZ_V23=[
{q:'&#xC2A4;&#xC719; &#xD15C;&#xD3EC;&#xC5D0;&#xC11C; &#xC774;&#xC0C1;&#xC801;&#xC778; &#xBC31;&#xC2A4;&#xC719;:&#xB2E4;&#xC6B4;&#xC2A4;&#xC719; &#xBE44;&#xC728;&#xC740;?',a:['1:1','2:1','3:1','5:1'],c:2},
{q:'Strokes Gained&#xC5D0;&#xC11C; SG:Approach&#xAC00; &#xCE21;&#xC815;&#xD558;&#xB294; &#xAC83;&#xC740;?',a:['&#xD37C;&#xD305; &#xC2E4;&#xB825;','100yd &#xC774;&#xB0B4; &#xC0F7;','&#xADF8;&#xB9B0; &#xC8FC;&#xBCC0; &#xC811;&#xADFC;','&#xD2F0;&#xC0F7; &#xC815;&#xD655;&#xB3C4;'],c:2},
{q:'&#xBC15;&#xC2A4;&#xD50C;&#xB86F;&#xC5D0;&#xC11C; Q1(25%)~Q3(75%) &#xAD6C;&#xAC04;&#xC744; &#xBD80;&#xB974;&#xB294; &#xBA85;&#xCE6D;&#xC740;?',a:['&#xC218;&#xC5FC;(Whisker)','IQR','&#xC911;&#xC559;&#xAC12;','&#xBC94;&#xC704;'],c:1},
{q:'SQI(Shot Quality Index)&#xC5D0;&#xC11C; &#xAC00;&#xC7A5; &#xC911;&#xC694;&#xD55C; &#xC694;&#xC18C;&#xB294;?',a:['&#xBE44;&#xAC70;&#xB9AC;','&#xBC29;&#xD5A5; &#xC815;&#xD655;&#xB3C4;','&#xC758;&#xB3C4;&#xC640; &#xACB0;&#xACFC;&#xC758; &#xC77C;&#xCE58;','&#xC2A4;&#xD540;&#xB7C9;'],c:2},
{q:'&#xADF8;&#xB9B0; &#xACBD;&#xC0AC;&#xAC00; 2% &#xC624;&#xB974;&#xB9C9;&#xC774;&#xBA74; &#xD37C;&#xD305; &#xD798;&#xC744; &#xC5B4;&#xB5BB;&#xAC8C; &#xC870;&#xC808;?',a:['&#xB354; &#xC57D;&#xD558;&#xAC8C;','&#xAC19;&#xAC8C;','&#xB354; &#xAC15;&#xD558;&#xAC8C;','&#xBC29;&#xD5A5;&#xB9CC; &#xBCC0;&#xACBD;'],c:2},
{q:'Stimpmeter &#xC218;&#xCE58;&#xAC00; 12&#xC774;&#xBA74; &#xADF8;&#xB9B0; &#xC18D;&#xB3C4;&#xB294;?',a:['&#xB290;&#xB9BC;','&#xBCF4;&#xD1B5;','&#xBE60;&#xB984;','&#xB9E4;&#xC6B0; &#xBE60;&#xB984;'],c:2},
{q:'Stableford &#xBC29;&#xC2DD;&#xC5D0;&#xC11C; &#xBC84;&#xB514;&#xB294; &#xBA87; &#xD3EC;&#xC778;&#xD2B8;?',a:['1&#xC810;','2&#xC810;','3&#xC810;','4&#xC810;'],c:2},
{q:'Match Play&#xC5D0;&#xC11C; 3&2&#xB294; &#xBB34;&#xC2A8; &#xB73B;?',a:['3&#xD640; &#xB0A8;&#xAE30;&#xACE0; 2&#xD640; &#xC55E;&#xC11C; &#xC2B9;&#xB9AC;','3&#xBC88;&#xC9F8; &#xD640;&#xC5D0;&#xC11C; 2&#xD0C0; &#xCC28;','3&#xB77C;&#xC6B4;&#xB4DC; 2&#xBC88;&#xC9F8; &#xC2DC;&#xB3C4;','3&#xC77C; 2&#xC2DC;&#xAC04;'],c:0},
{q:'FIR(Fairway In Regulation)&#xC774; 60%&#xC774;&#xBA74; &#xC5B4;&#xB290; &#xC218;&#xC900;?',a:['&#xCD08;&#xBCF4;&#xC790;','&#xC544;&#xB9C8;&#xCD94;&#xC5B4; &#xD3C9;&#xADE0;','&#xC0C1;&#xAE09;&#xC790;','&#xD504;&#xB85C; &#xC218;&#xC900;'],c:1},
{q:'&#xACE8;&#xD504; &#xC2A4;&#xC719;&#xC5D0;&#xC11C; &#xCF54;&#xC5B4; &#xADFC;&#xC721;&#xC774; &#xC911;&#xC694;&#xD55C; &#xC774;&#xC720;&#xB294;?',a:['&#xD30C;&#xC6CC; &#xC0DD;&#xC131;','&#xD68C;&#xC804;&#xB825; &#xC548;&#xC815;&#xC131;','&#xBC38;&#xB7F0;&#xC2A4; &#xC720;&#xC9C0;','&#xBAA8;&#xB450; &#xD574;&#xB2F9;'],c:3},
{q:'&#xACE8;&#xD504; &#xD53C;&#xD2B8;&#xB2C8;&#xC2A4; &#xC8FC;&#xAE30;&#xD654;&#xC5D0;&#xC11C; Taper &#xB2E8;&#xACC4;&#xC758; &#xBAA9;&#xC801;&#xC740;?',a:['&#xADFC;&#xB825; &#xADF9;&#xB300;&#xD654;','&#xACBD;&#xAE30; &#xC804; &#xD68C;&#xBCF5;','&#xC9C0;&#xAD6C;&#xB825; &#xD5A5;&#xC0C1;','&#xC720;&#xC5F0;&#xC131; &#xD5A5;&#xC0C1;'],c:1},
{q:'&#xB4DC;&#xB77C;&#xC774;&#xBC84; &#xCC29;&#xC9C0; &#xC874;&#xC5D0;&#xC11C; &quot;Slight Left&quot;&#xAC00; &#xBC18;&#xBCF5;&#xB418;&#xBA74;?',a:['&#xD074;&#xB7FD;&#xC744; &#xBCC0;&#xACBD;','&#xC5BC;&#xB77C;&#xC778;&#xBA3C;&#xD2B8; &#xC810;&#xAC80;','&#xB354; &#xC138;&#xAC8C; &#xCE58;&#xAE30;','&#xBB34;&#xC2DC;'],c:1},
{q:'&#xC5F0;&#xC2B5; &#xD6A8;&#xC728; &#xBD84;&#xC11D;&#xC5D0;&#xC11C; &#xD22C;&#xC790;&#xC2DC;&#xAC04; &#xB300;&#xBE44; &#xD5A5;&#xC0C1;&#xB3C4;&#xAC00; &#xB0AE;&#xC73C;&#xBA74;?',a:['&#xB354; &#xB9CE;&#xC774; &#xC5F0;&#xC2B5;','&#xC5F0;&#xC2B5; &#xBC29;&#xBC95; &#xBCC0;&#xACBD;','&#xB2E4;&#xB978; &#xC601;&#xC5ED; &#xC5F0;&#xC2B5;','&#xC5F0;&#xC2B5; &#xC911;&#xB2E8;'],c:1},
{q:'&#xC2A4;&#xC719; &#xD15C;&#xD3EC; 72BPM&#xC740; &#xC5B4;&#xB5A4; &#xD2B9;&#xC131;&#xC758; &#xC2A4;&#xC719;?',a:['&#xB9E4;&#xC6B0; &#xBE60;&#xB978;','&#xBE60;&#xB978;','&#xC77C;&#xBC18;&#xC801;','&#xB290;&#xB9B0;'],c:2},
{q:'Shot Tracer &#xC571;&#xC758; &#xD575;&#xC2EC; &#xAE30;&#xB2A5;&#xC740;?',a:['GPS &#xAC70;&#xB9AC; &#xCE21;&#xC815;','&#xC2E4;&#xC2DC;&#xAC04; &#xAD6C;&#xC9C8; &#xC2DC;&#xAC01;&#xD654;','&#xC774;&#xC0C1;&#xC801; &#xCE74;&#xB4DC; &#xC0DD;&#xC131;','&#xCF54;&#xC2A4; &#xC608;&#xC57D;'],c:1}
];
function showQuizV23(){
playSfx('nav_v23');
var pn=getPanel('quizv23');
var score=lsGet('quiz_v23_score',0);var total=lsGet('quiz_v23_total',0);var qIdx=lsGet('quiz_v23_idx',0);
if(qIdx>=QUIZ_V23.length)qIdx=0;
var q=QUIZ_V23[qIdx];
var html='<button class="v23-close" onclick="window._v23Close(\'quizv23\')">&times;</button>';
html+='<div class="v23-title">&#x1F4DA; Golf Tracker Quiz v23</div>';
html+='<div class="v23-card"><h3>Q'+(qIdx+1)+'/'+QUIZ_V23.length+'</h3><p style="font-size:14px;margin:8px 0">'+q.q+'</p>';
for(var i=0;i<q.a.length;i++){
html+='<button class="v23-btn" style="width:100%;margin:3px 0;text-align:left" onclick="window._v23AnswerQuiz('+i+','+q.c+')">'+String.fromCharCode(65+i)+'. '+q.a[i]+'</button>';
}
html+='</div>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#00FF88">'+score+'</div><div class="v23-stat-label">&#xC815;&#xB2F5;</div></div>';
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#FFB800">'+total+'</div><div class="v23-stat-label">&#xCD1D;&#xBB38;&#xC81C;</div></div>';
var pct=total>0?Math.round(score/total*100):0;
html+='<div class="v23-stat-card"><div class="v23-stat-val" style="color:#4ECDC4">'+pct+'%</div><div class="v23-stat-label">&#xC815;&#xB2F5;&#xB960;</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('quizv23');
}
window._v23AnswerQuiz=function(sel,correct){
var score=lsGet('quiz_v23_score',0);var total=lsGet('quiz_v23_total',0);var qIdx=lsGet('quiz_v23_idx',0);
total++;
if(sel===correct){score++;playSfx('quiz_correct_v23');showToast('&#xC815;&#xB2F5;!');}
else{playSfx('quiz_wrong_v23');showToast('&#xC624;&#xB2F5;! &#xC815;&#xB2F5;: '+String.fromCharCode(65+correct));}
qIdx++;
lsSet('quiz_v23_score',score);lsSet('quiz_v23_total',total);lsSet('quiz_v23_idx',qIdx);
setTimeout(showQuizV23,800);checkAchievements();
};

// ===== ACHIEVEMENTS v23 (+12 = 180->192) =====
var ACHIEVEMENTS_V23=[
{id:'tempo_tracker',name:'Tempo Tracker',desc:'&#xD15C;&#xD3EC; 5&#xD68C; &#xAE30;&#xB85D;',check:function(){return lsGet('tempo_log',[]).length>=5}},
{id:'tempo_master',name:'Tempo Master',desc:'&#xD15C;&#xD3EC; 15&#xD68C; &#xAE30;&#xB85D;',check:function(){return lsGet('tempo_log',[]).length>=15}},
{id:'ci_collector',name:'CI Data Collector',desc:'&#xBE44;&#xAC70;&#xB9AC; &#xB370;&#xC774;&#xD130; 30&#xAC1C;',check:function(){var d=lsGet('ci_data',{});var s=0;for(var k in d)if(d[k])s+=d[k].length;return s>=30}},
{id:'sqi_rater',name:'SQI Rater',desc:'&#xC0F7; &#xD038;&#xB9AC;&#xD2F0; 10&#xD68C; &#xD3C9;&#xAC00;',check:function(){return lsGet('sqi_log',[]).length>=10}},
{id:'slope_reader',name:'Slope Reader',desc:'&#xACBD;&#xC0AC; 10&#xD68C; &#xAE30;&#xB85D;',check:function(){return lsGet('slope_log',[]).length>=10}},
{id:'tourney_player',name:'Tournament Player',desc:'&#xD1A0;&#xB108;&#xBA3C;&#xD2B8; 5&#xB77C;&#xC6B4;&#xB4DC;',check:function(){return lsGet('tourney_log',[]).length>=5}},
{id:'drive_analyst',name:'Drive Analyst',desc:'&#xB4DC;&#xB77C;&#xC774;&#xBE59; 30&#xC0F7; &#xAE30;&#xB85D;',check:function(){return lsGet('drivezone_log',[]).length>=30}},
{id:'practice_planner',name:'Practice Planner',desc:'&#xC5F0;&#xC2B5; &#xD6A8;&#xC728; &#xAE30;&#xB85D;',check:function(){var d=lsGet('practice_eff',{});var t=0;for(var k in d)if(d[k])t+=d[k].time;return t>=60}},
{id:'fitness_starter',name:'Fitness Starter',desc:'&#xCCB4;&#xB825; &#xD504;&#xB85C;&#xADF8;&#xB7A8; 6&#xC6B4;&#xB3D9; &#xC644;&#xB8CC;',check:function(){var c=0;for(var w=1;w<=12;w++)for(var i=0;i<6;i++)if(lsGet('fit_w'+w+'_'+i,false))c++;return c>=6}},
{id:'quiz_v23_master',name:'Quiz v23 Master',desc:'v23 &#xD038;&#xC988; &#xC804;&#xBB38; &#xC815;&#xB2F5;',check:function(){return lsGet('quiz_v23_score',0)>=15}},
{id:'quiz_v23_clear',name:'Quiz v23 Clear',desc:'v23 &#xD038;&#xC988; &#xC644;&#xC8FC;',check:function(){return lsGet('quiz_v23_total',0)>=15}},
{id:'v23_complete',name:'v23 Complete',desc:'v23 &#xC804;&#xCCB4; &#xAE30;&#xB2A5; &#xD0D0;&#xC0C9;',check:function(){return lsGet('v23_explored',0)>=8}}
];
function checkAchievements(){
var unlocked=lsGet('achievements_v23',[]);
for(var i=0;i<ACHIEVEMENTS_V23.length;i++){
var a=ACHIEVEMENTS_V23[i];
if(unlocked.indexOf(a.id)===-1&&a.check()){
unlocked.push(a.id);lsSet('achievements_v23',unlocked);
playSfx('achieve_v23');showToast('🏆 '+a.name+' unlocked!');
}
}
}
var explored=lsGet('v23_explored',0);
function markExplored(){explored++;lsSet('v23_explored',explored);}

// ===== CSS =====
var style=document.createElement('style');
style.textContent='.v23-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:10020;display:none;align-items:center;justify-content:center;padding:16px;overflow-y:auto}.v23-overlay.active{display:flex}.v23-panel{background:#14141a;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:20px;max-width:660px;width:100%;max-height:90vh;overflow-y:auto;position:relative}.v23-close{position:absolute;top:12px;right:12px;background:none;border:none;color:#fff;font-size:24px;cursor:pointer;z-index:2;opacity:0.7}.v23-close:hover{opacity:1}.v23-title{font-size:18px;font-weight:bold;color:#fff;margin-bottom:12px;text-align:center}.v23-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;margin:8px 0}.v23-card h3{font-size:13px;color:rgba(255,255,255,0.7);margin-bottom:6px}.v23-label{font-size:10px;color:rgba(255,255,255,0.5);display:block;margin-bottom:2px}.v23-input{width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:6px;color:#fff;padding:6px 8px;font-size:12px;outline:none;box-sizing:border-box}.v23-input:focus{border-color:#00FF88}.v23-btn{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);border-radius:8px;color:#fff;padding:8px 12px;font-size:12px;cursor:pointer;transition:all 0.2s}.v23-btn:hover{background:rgba(255,255,255,0.12)}.v23-btn-primary{background:rgba(0,255,136,0.15);border-color:rgba(0,255,136,0.3);color:#00FF88}.v23-btn-primary:hover{background:rgba(0,255,136,0.25)}.v23-btn-sm{padding:6px 8px;font-size:11px}.v23-stat-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:10px;text-align:center}.v23-stat-val{font-size:18px;font-weight:bold}.v23-stat-label{font-size:9px;color:rgba(255,255,255,0.5);margin-top:2px}.v23-toast{position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(20px);background:rgba(0,255,136,0.15);border:1px solid rgba(0,255,136,0.3);color:#00FF88;padding:10px 20px;border-radius:10px;font-size:13px;z-index:10030;opacity:0;transition:all 0.3s}.v23-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}';
document.head.appendChild(style);

// ===== NAVIGATION =====
window._v23Close=function(id){closePanel(id);};
function addNavButtons(){
var existing=document.querySelector('[id*="v22"]')||document.querySelector('[id*="v21"]')||document.querySelector('[id*="v20"]')||document.querySelector('.gt-bottom-nav')||document.querySelector('[style*="position:fixed"][style*="bottom"]');
var nav=existing;
if(!nav){
var allFixed=document.querySelectorAll('[style*="position: fixed"], [style*="position:fixed"]');
for(var i=0;i<allFixed.length;i++){if(allFixed[i].style.bottom==='0px'||allFixed[i].style.bottom==='0'){nav=allFixed[i];break;}}
}
if(!nav){
var navBars=document.querySelectorAll('div');
for(var i=0;i<navBars.length;i++){
var s=window.getComputedStyle(navBars[i]);
if(s.position==='fixed'&&(s.bottom==='0px'||s.bottom==='0')&&parseInt(s.zIndex)>9000){nav=navBars[i];break;}
}
}
if(!nav)return;
var btns=[
{label:'Tempo',fn:showSwingTempo,icon:'&#x1F3B5;'},
{label:'CI',fn:showClubCI,icon:'&#x1F4CF;'},
{label:'SQI',fn:showSQI,icon:'&#x2B50;'},
{label:'Slope',fn:showGreenSlope,icon:'&#x26F3;'},
{label:'Tourney',fn:showTourneySim,icon:'&#x1F3C6;'},
{label:'DriveZn',fn:showDriveZone,icon:'&#x1F3CC;'},
{label:'PractEff',fn:showPracticeEff,icon:'&#x1F4CA;'},
{label:'Fitness',fn:showFitnessPeriod,icon:'&#x1F4AA;'},
{label:'Quiz23',fn:showQuizV23,icon:'&#x1F4DA;'}
];
for(var i=0;i<btns.length;i++){
(function(b){
var btn=document.createElement('button');
btn.innerHTML=b.icon+'<br><span style="font-size:8px">'+b.label+'</span>';
btn.style.cssText='background:rgba(139,92,246,0.12);border:1px solid rgba(139,92,246,0.25);border-radius:8px;color:#8B5CF6;padding:6px 4px;font-size:12px;cursor:pointer;min-width:44px;flex:0 0 auto;margin:2px';
btn.addEventListener('click',function(){b.fn();markExplored();});
nav.appendChild(btn);
})(btns[i]);
}
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown',function(e){
if(!e.shiftKey)return;
switch(e.key){
case'Q':case'q':showSwingTempo();markExplored();break;
case'W':case'w':showClubCI();markExplored();break;
case'E':case'e':showSQI();markExplored();break;
case'R':case'r':showGreenSlope();markExplored();break;
case'T':case't':showTourneySim();markExplored();break;
case'Y':case'y':showDriveZone();markExplored();break;
case'U':case'u':showPracticeEff();markExplored();break;
case'D':case'd':showFitnessPeriod();markExplored();break;
case'0':showQuizV23();markExplored();break;
}
});

// ===== INIT =====
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',addNavButtons);}
else{setTimeout(addNavButtons,1500);}
setTimeout(checkAchievements,3000);
})();
