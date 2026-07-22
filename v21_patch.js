(function(){
'use strict';
var LS='gt_v21_';
var audioCtx=null;
function getAC(){if(!audioCtx)try{audioCtx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}return audioCtx}
function playSfx(type){var ac=getAC();if(!ac)return;var o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);var t=ac.currentTime;g.gain.setValueAtTime(0.1,t);switch(type){case'rhythm_open':o.type='sine';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(554,t+0.06);o.frequency.linearRampToValueAtTime(659,t+0.12);o.frequency.linearRampToValueAtTime(784,t+0.18);g.gain.exponentialRampToValueAtTime(0.01,t+0.32);o.start(t);o.stop(t+0.32);break;case'rhythm_tap':o.type='triangle';o.frequency.setValueAtTime(880,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.08);o.start(t);o.stop(t+0.08);break;case'decision_open':o.type='sine';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(659,t+0.07);o.frequency.linearRampToValueAtTime(784,t+0.14);g.gain.exponentialRampToValueAtTime(0.01,t+0.28);o.start(t);o.stop(t+0.28);break;case'decision_result':o.type='triangle';o.frequency.setValueAtTime(659,t);o.frequency.linearRampToValueAtTime(880,t+0.06);o.frequency.linearRampToValueAtTime(1047,t+0.12);g.gain.exponentialRampToValueAtTime(0.01,t+0.25);o.start(t);o.stop(t+0.25);break;case'heatmap_open':o.type='sine';o.frequency.setValueAtTime(392,t);o.frequency.linearRampToValueAtTime(494,t+0.08);o.frequency.linearRampToValueAtTime(587,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'putt_break':o.type='sine';o.frequency.setValueAtTime(349,t);o.frequency.linearRampToValueAtTime(440,t+0.08);o.frequency.linearRampToValueAtTime(523,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'scenario_open':o.type='sine';o.frequency.setValueAtTime(494,t);o.frequency.linearRampToValueAtTime(622,t+0.06);o.frequency.linearRampToValueAtTime(740,t+0.12);o.frequency.linearRampToValueAtTime(880,t+0.18);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'scenario_solve':o.type='triangle';o.frequency.setValueAtTime(784,t);o.frequency.linearRampToValueAtTime(988,t+0.05);o.frequency.linearRampToValueAtTime(1175,t+0.1);g.gain.exponentialRampToValueAtTime(0.01,t+0.2);o.start(t);o.stop(t+0.2);break;case'pace_open':o.type='sine';o.frequency.setValueAtTime(587,t);o.frequency.linearRampToValueAtTime(698,t+0.07);o.frequency.linearRampToValueAtTime(880,t+0.14);g.gain.exponentialRampToValueAtTime(0.01,t+0.28);o.start(t);o.stop(t+0.28);break;case'pace_alert':o.type='sawtooth';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(330,t+0.15);g.gain.setValueAtTime(0.06,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.25);o.start(t);o.stop(t+0.25);break;case'roadmap_open':o.type='sine';o.frequency.setValueAtTime(370,t);o.frequency.linearRampToValueAtTime(494,t+0.08);o.frequency.linearRampToValueAtTime(622,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'grip_open':o.type='sine';o.frequency.setValueAtTime(466,t);o.frequency.linearRampToValueAtTime(587,t+0.07);o.frequency.linearRampToValueAtTime(698,t+0.14);g.gain.exponentialRampToValueAtTime(0.01,t+0.28);o.start(t);o.stop(t+0.28);break;case'quiz_correct_v21':o.type='sine';o.frequency.setValueAtTime(740,t);o.frequency.setValueAtTime(932,t+0.08);o.frequency.setValueAtTime(1109,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'quiz_wrong_v21':o.type='sawtooth';o.frequency.setValueAtTime(262,t);o.frequency.linearRampToValueAtTime(196,t+0.2);g.gain.setValueAtTime(0.06,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'achieve_v21':o.type='sine';o.frequency.setValueAtTime(932,t);o.frequency.setValueAtTime(1109,t+0.1);o.frequency.setValueAtTime(1397,t+0.2);o.frequency.setValueAtTime(1661,t+0.3);g.gain.exponentialRampToValueAtTime(0.01,t+0.5);o.start(t);o.stop(t+0.5);break;default:o.type='sine';o.frequency.setValueAtTime(440,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.15);o.start(t);o.stop(t+0.15)}}

function lsGet(k,d){try{var v=localStorage.getItem(LS+k);return v?JSON.parse(v):d}catch(e){return d}}
function lsSet(k,v){try{localStorage.setItem(LS+k,JSON.stringify(v))}catch(e){}}
function todayStr(){return new Date().toISOString().slice(0,10)}
function showToast(msg){var t=document.createElement('div');t.className='v21-toast';t.textContent=msg;document.body.appendChild(t);setTimeout(function(){t.classList.add('show')},50);setTimeout(function(){t.classList.remove('show');setTimeout(function(){t.remove()},400)},3000)}
function createOverlay(id){var ov=document.createElement('div');ov.className='v21-overlay';ov.id='v21-'+id;ov.addEventListener('click',function(e){if(e.target===ov)closePanel(id)});var pn=document.createElement('div');pn.className='v21-panel';pn.style.position='relative';ov.appendChild(pn);return pn}
function openPanel(id){var el=document.getElementById('v21-'+id);if(el)el.classList.add('active')}
function closePanel(id){var el=document.getElementById('v21-'+id);if(el)el.classList.remove('active')}
function getPanel(id){var ov=document.getElementById('v21-'+id);if(!ov){var pn=createOverlay(id);pn.id='v21-'+id+'-panel';document.body.appendChild(pn.parentElement);return pn}return ov.querySelector('.v21-panel')||ov}

// ===== 1. SWING RHYTHM ANALYZER Canvas 600x380 =====
function showSwingRhythm(){
playSfx('rhythm_open');
var pn=getPanel('rhythm');
var data=lsGet('rhythm_log',[]);
var ZONES=['Very Slow','Slow','Moderate','Tour Avg','Fast','Very Fast','Pro Tour','Elite'];
var ZONE_RANGES=[[0,55],[56,65],[66,75],[76,85],[86,95],[96,105],[106,115],[116,999]];
var ZONE_COLORS=['#FF3366','#FF6B6B','#FFB800','#00FF88','#4ECDC4','#00B4D8','#A855F7','#FF00FF'];
var html='<button class="v21-close" onclick="window._v21Close(\'rhythm\')">&times;</button>';
html+='<div class="v21-title">&#x1F3B5; &#xC2A4;&#xC719; &#xB9AC;&#xB4EC; &#xBD84;&#xC11D;&#xAE30;</div>';
html+='<canvas id="v21-rhythm-canvas" width="600" height="380" style="width:100%;max-width:600px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v21-card"><h3>&#xD15C;&#xD3EC; &#xCE21;&#xC815; (BPM &#xD0ED;)</h3>';
html+='<p style="font-size:11px;color:rgba(255,255,255,0.5);margin-bottom:8px">&#xBC31;&#xC2A4;&#xC719;~&#xB2E4;&#xC6B4;&#xC2A4;&#xC719; &#xB9AC;&#xB4EC;&#xC5D0; &#xB9DE;&#xCDB0; &#xD0ED;&#xD558;&#xC138;&#xC694;</p>';
html+='<div style="text-align:center;margin:8px 0"><div id="v21-bpm-display" style="font-size:48px;font-weight:bold;color:#00FF88">--</div><div style="font-size:11px;color:rgba(255,255,255,0.5)">BPM</div></div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">';
html+='<button class="v21-btn v21-btn-primary" id="v21-tap-btn" style="padding:16px;font-size:16px" onclick="window._v21TapTempo()">&#x1F44F; TAP</button>';
html+='<button class="v21-btn" onclick="window._v21SaveRhythm()">&#xC800;&#xC7A5;</button>';
html+='</div></div>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
var avgBpm=0;if(data.length>0){var sum=0;for(var i=0;i<data.length;i++)sum+=data[i].bpm;avgBpm=Math.round(sum/data.length);}
var ratio=data.length>0?data[data.length-1].ratio||'3:1':'3:1';
html+='<div class="v21-stat-card"><div class="v21-stat-val" style="color:#00FF88">'+data.length+'</div><div class="v21-stat-label">&#xCE21;&#xC815; &#xD68C;&#xC218;</div></div>';
html+='<div class="v21-stat-card"><div class="v21-stat-val" style="color:#FFB800">'+avgBpm+'</div><div class="v21-stat-label">&#xD3C9;&#xADE0; BPM</div></div>';
html+='<div class="v21-stat-card"><div class="v21-stat-val" style="color:#00B4D8">'+ratio+'</div><div class="v21-stat-label">BS/DS &#xBE44;&#xC728;</div></div>';
html+='</div>';
if(data.length>0){html+='<button class="v21-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'&#xCD08;&#xAE30;&#xD654;?\'))window._v21ResetRhythm()">&#xCD08;&#xAE30;&#xD654;</button>';}
pn.innerHTML=html;openPanel('rhythm');drawRhythmCanvas(data,ZONES,ZONE_RANGES,ZONE_COLORS);
}
var tapTimes=[];
window._v21TapTempo=function(){
playSfx('rhythm_tap');
var now=Date.now();
tapTimes.push(now);
if(tapTimes.length>8)tapTimes=tapTimes.slice(-8);
if(tapTimes.length>=2){
var intervals=[];for(var i=1;i<tapTimes.length;i++)intervals.push(tapTimes[i]-tapTimes[i-1]);
var avg=0;for(var j=0;j<intervals.length;j++)avg+=intervals[j];avg/=intervals.length;
var bpm=Math.round(60000/avg);
var el=document.getElementById('v21-bpm-display');
if(el)el.textContent=bpm;
window._v21CurrentBpm=bpm;
}
};
window._v21SaveRhythm=function(){
var bpm=window._v21CurrentBpm||0;
if(bpm<30||bpm>200){showToast('BPM&#xC744; &#xBA3C;&#xC800; &#xCE21;&#xC815;&#xD558;&#xC138;&#xC694;');return;}
var ratios=['3:1','2.5:1','2:1','3.5:1'];
var ratio=ratios[Math.min(Math.floor(bpm/30),3)];
var data=lsGet('rhythm_log',[]);
data.push({bpm:bpm,ratio:ratio,date:todayStr()});
if(data.length>50)data=data.slice(-50);
lsSet('rhythm_log',data);
tapTimes=[];window._v21CurrentBpm=0;
showToast('BPM '+bpm+' saved');showSwingRhythm();checkAchievements();
};
window._v21ResetRhythm=function(){lsSet('rhythm_log',[]);showSwingRhythm();};
function drawRhythmCanvas(data,zones,ranges,colors){
var c=document.getElementById('v21-rhythm-canvas');if(!c)return;var ctx=c.getContext('2d');
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,600,380);
ctx.fillStyle='#fff';ctx.font='bold 14px sans-serif';ctx.textAlign='center';ctx.fillText('Swing Tempo Trend & Zone Distribution',300,22);
if(data.length===0){ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='14px sans-serif';ctx.fillText('TAP으로 BPM을 측정하고 저장하면 차트가 표시됩니다',300,190);return;}
var maxBpm=0,minBpm=999;for(var i=0;i<data.length;i++){if(data[i].bpm>maxBpm)maxBpm=data[i].bpm;if(data[i].bpm<minBpm)minBpm=data[i].bpm;}
var chartL=60,chartR=360,chartT=45,chartB=320;
var range=Math.max(maxBpm-minBpm,20);var yMin=Math.max(0,minBpm-10);var yMax=maxBpm+10;
ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.lineWidth=1;
for(var g=0;g<5;g++){var gy=chartT+(chartB-chartT)*g/4;ctx.beginPath();ctx.moveTo(chartL,gy);ctx.lineTo(chartR,gy);ctx.stroke();
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='10px sans-serif';ctx.textAlign='right';ctx.fillText(Math.round(yMax-(yMax-yMin)*g/4),chartL-6,gy+4);}
ctx.beginPath();ctx.strokeStyle='#00FF88';ctx.lineWidth=2;
for(var i=0;i<data.length;i++){var x=chartL+(chartR-chartL)*i/Math.max(data.length-1,1);var y=chartT+(chartB-chartT)*(1-(data[i].bpm-yMin)/(yMax-yMin));
if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}
ctx.stroke();
for(var i=0;i<data.length;i++){var x=chartL+(chartR-chartL)*i/Math.max(data.length-1,1);var y=chartT+(chartB-chartT)*(1-(data[i].bpm-yMin)/(yMax-yMin));
var zIdx=0;for(var z=0;z<ranges.length;z++){if(data[i].bpm>=ranges[z][0]&&data[i].bpm<=ranges[z][1])zIdx=z;}
ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.fillStyle=colors[zIdx];ctx.fill();}
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='9px sans-serif';ctx.textAlign='center';
var step=Math.max(1,Math.floor(data.length/8));
for(var i=0;i<data.length;i+=step){var x=chartL+(chartR-chartL)*i/Math.max(data.length-1,1);ctx.fillText(data[i].date.slice(5),x,chartB+14);}
var zoneCounts=new Array(zones.length);for(var i=0;i<zoneCounts.length;i++)zoneCounts[i]=0;
for(var i=0;i<data.length;i++){for(var z=0;z<ranges.length;z++){if(data[i].bpm>=ranges[z][0]&&data[i].bpm<=ranges[z][1]){zoneCounts[z]++;break;}}}
var barL=400,barR=580,barH=28;var ly=45;
ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='bold 11px sans-serif';ctx.textAlign='left';ctx.fillText('Zone Distribution',barL,ly);ly+=8;
for(var z=0;z<zones.length;z++){var pct=data.length>0?zoneCounts[z]/data.length:0;
ctx.fillStyle='rgba(255,255,255,0.08)';ctx.fillRect(barL,ly,barR-barL,barH);
ctx.fillStyle=colors[z];ctx.globalAlpha=0.7;ctx.fillRect(barL,ly,(barR-barL)*pct,barH);ctx.globalAlpha=1;
ctx.fillStyle='#fff';ctx.font='9px sans-serif';ctx.textAlign='left';ctx.fillText(zones[z],barL+4,ly+12);
ctx.textAlign='right';ctx.fillText(zoneCounts[z]+' ('+Math.round(pct*100)+'%)',barR-4,ly+12);
ctx.fillStyle='rgba(255,255,255,0.15)';ctx.fillRect(barL+2,ly+16,barR-barL-4,10);
ctx.fillStyle=colors[z];ctx.fillRect(barL+2,ly+16,(barR-barL-4)*pct,10);
ly+=barH+4;}
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='10px sans-serif';ctx.textAlign='center';ctx.fillText('Tour Avg: 76-85 BPM | Ideal Ratio: 3:1 (BS/DS)',300,370);
}

// ===== 2. CLUB DECISION TREE Canvas 620x400 =====
function showClubDecision(){
playSfx('decision_open');
var pn=getPanel('decision');
var html='<button class="v21-close" onclick="window._v21Close(\'decision\')">&times;</button>';
html+='<div class="v21-title">&#x1F333; &#xD074;&#xB7FD; &#xCD94;&#xCC9C; &#xC758;&#xC0AC;&#xACB0;&#xC815; &#xD2B8;&#xB9AC;</div>';
html+='<canvas id="v21-decision-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v21-card"><h3>&#xC0F7; &#xC870;&#xAC74; &#xC785;&#xB825;</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">';
html+='<div><label class="v21-label">&#xBAA9;&#xD45C; &#xAC70;&#xB9AC; (yd)</label><input type="number" class="v21-input" id="v21-dec-dist" value="150" min="30" max="300"></div>';
html+='<div><label class="v21-label">&#xBC14;&#xB78C; (km/h)</label><input type="number" class="v21-input" id="v21-dec-wind" value="0" min="-40" max="40"><span style="font-size:9px;color:rgba(255,255,255,0.4)">&#xC5ED;&#xD48D;(+) &#xC21C;&#xD48D;(-)</span></div>';
html+='<div><label class="v21-label">&#xACBD;&#xC0AC;&#xB3C4;</label><select class="v21-input" id="v21-dec-slope"><option value="flat">&#xD3C9;&#xC9C0;</option><option value="uphill">&#xC624;&#xB974;&#xB9C9;</option><option value="downhill">&#xB0B4;&#xB9AC;&#xB9C9;</option></select></div>';
html+='<div><label class="v21-label">&#xB77C;&#xC774;</label><select class="v21-input" id="v21-dec-lie"><option value="fairway">&#xD398;&#xC5B4;&#xC6E8;&#xC774;</option><option value="rough">&#xB7EC;&#xD504;</option><option value="deep_rough">&#xB525; &#xB7EC;&#xD504;</option><option value="bunker">&#xBC99;&#xCEE4;</option><option value="uphill_lie">&#xC624;&#xB974;&#xB9C9; &#xB77C;&#xC774;</option></select></div>';
html+='<div><label class="v21-label">&#xD540; &#xC704;&#xCE58;</label><select class="v21-input" id="v21-dec-pin"><option value="center">&#xC911;&#xC559;</option><option value="front">&#xC55E;&#xCABD;</option><option value="back">&#xB4A4;&#xCABD;</option><option value="tucked">&#xD138;&#xB4DC;(&#xC5B4;&#xB824;&#xC6B4;)</option></select></div>';
html+='<div><label class="v21-label">&#xC704;&#xD5D8;&#xB3C4;</label><select class="v21-input" id="v21-dec-risk"><option value="safe">&#xC548;&#xC804;&#xD558;&#xAC8C;</option><option value="moderate">&#xBCF4;&#xD1B5;</option><option value="aggressive">&#xACF5;&#xACA9;&#xC801;</option></select></div>';
html+='</div>';
html+='<button class="v21-btn v21-btn-primary" style="width:100%;margin-top:10px" onclick="window._v21CalcDecision()">&#x1F3CC; &#xD074;&#xB7FD; &#xCD94;&#xCC9C;</button>';
html+='</div>';
html+='<div id="v21-decision-result" style="margin-top:8px"></div>';
pn.innerHTML=html;openPanel('decision');drawDecisionCanvas(null);
}
window._v21CalcDecision=function(){
playSfx('decision_result');
var dist=parseInt(document.getElementById('v21-dec-dist').value)||150;
var wind=parseInt(document.getElementById('v21-dec-wind').value)||0;
var slope=document.getElementById('v21-dec-slope').value;
var lie=document.getElementById('v21-dec-lie').value;
var pin=document.getElementById('v21-dec-pin').value;
var risk=document.getElementById('v21-dec-risk').value;
var adj=dist;
adj+=wind*0.5;
if(slope==='uphill')adj+=dist*0.1;
else if(slope==='downhill')adj-=dist*0.08;
if(lie==='rough')adj+=5;
else if(lie==='deep_rough')adj+=15;
else if(lie==='bunker')adj+=10;
else if(lie==='uphill_lie')adj+=8;
if(pin==='tucked'&&risk==='safe')adj+=10;
else if(pin==='front')adj-=5;
else if(pin==='back')adj+=5;
var CLUBS=[{name:'LW',dist:80},{name:'SW',dist:95},{name:'AW',dist:110},{name:'PW',dist:125},{name:'9I',dist:136},{name:'8I',dist:148},{name:'7I',dist:160},{name:'6I',dist:170},{name:'5I',dist:185},{name:'4I',dist:200},{name:'5W',dist:215},{name:'3W',dist:230},{name:'DR',dist:250}];
var best=null,bestDiff=999;
for(var i=0;i<CLUBS.length;i++){var diff=Math.abs(CLUBS[i].dist-adj);if(diff<bestDiff){bestDiff=diff;best=CLUBS[i];}}
var alt=null,altDiff=999;
for(var i=0;i<CLUBS.length;i++){if(CLUBS[i].name===best.name)continue;var diff=Math.abs(CLUBS[i].dist-adj);if(diff<altDiff){altDiff=diff;alt=CLUBS[i];}}
var confidence=Math.max(0,100-Math.round(bestDiff*2));
var result={best:best,alt:alt,adjDist:Math.round(adj),confidence:confidence,dist:dist,wind:wind,slope:slope,lie:lie,pin:pin,risk:risk};
drawDecisionCanvas(result);
var resEl=document.getElementById('v21-decision-result');
if(resEl){
var rh='<div class="v21-card" style="border-color:rgba(0,255,136,0.3)">';
rh+='<div style="text-align:center;margin-bottom:8px"><span style="font-size:32px;font-weight:bold;color:#00FF88">'+best.name+'</span></div>';
rh+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px">';
rh+='<div class="v21-stat-card"><div class="v21-stat-val" style="color:#FFB800">'+Math.round(adj)+'</div><div class="v21-stat-label">&#xBCF4;&#xC815; &#xAC70;&#xB9AC;</div></div>';
rh+='<div class="v21-stat-card"><div class="v21-stat-val" style="color:#00B4D8">'+best.dist+'</div><div class="v21-stat-label">&#xD074;&#xB7FD; &#xBE44;&#xAC70;&#xB9AC;</div></div>';
rh+='<div class="v21-stat-card"><div class="v21-stat-val" style="color:#4ECDC4">'+confidence+'%</div><div class="v21-stat-label">&#xC2E0;&#xB8B0;&#xB3C4;</div></div>';
rh+='<div class="v21-stat-card"><div class="v21-stat-val" style="color:#A855F7">'+alt.name+'</div><div class="v21-stat-label">&#xB300;&#xC548; &#xD074;&#xB7FD;</div></div>';
rh+='</div></div>';
resEl.innerHTML=rh;
}
var uses=lsGet('decision_uses',0);lsSet('decision_uses',uses+1);checkAchievements();
};
function drawDecisionCanvas(result){
var c=document.getElementById('v21-decision-canvas');if(!c)return;var ctx=c.getContext('2d');
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,620,400);
ctx.fillStyle='#fff';ctx.font='bold 14px sans-serif';ctx.textAlign='center';ctx.fillText('Club Decision Tree',310,22);
if(!result){
var nodes=[{x:310,y:60,label:'Target Distance',color:'#FFB800'},
{x:155,y:140,label:'Wind Adjustment',color:'#00B4D8'},{x:465,y:140,label:'Slope Adjustment',color:'#4ECDC4'},
{x:80,y:220,label:'Lie Factor',color:'#A855F7'},{x:230,y:220,label:'Pin Position',color:'#FF6B6B'},
{x:390,y:220,label:'Risk Level',color:'#00FF88'},{x:540,y:220,label:'Shot Shape',color:'#FFB800'},
{x:310,y:320,label:'RECOMMENDED CLUB',color:'#00FF88'}];
var edges=[[0,1],[0,2],[1,3],[1,4],[2,5],[2,6],[3,7],[4,7],[5,7],[6,7]];
ctx.lineWidth=2;
for(var i=0;i<edges.length;i++){var from=nodes[edges[i][0]],to=nodes[edges[i][1]];ctx.strokeStyle='rgba(255,255,255,0.15)';ctx.beginPath();ctx.moveTo(from.x,from.y+15);ctx.lineTo(to.x,to.y-15);ctx.stroke();}
for(var i=0;i<nodes.length;i++){var n=nodes[i];
ctx.fillStyle=n.color;ctx.globalAlpha=0.15;ctx.beginPath();ctx.roundRect(n.x-65,n.y-15,130,30,8);ctx.fill();ctx.globalAlpha=1;
ctx.strokeStyle=n.color;ctx.lineWidth=1;ctx.beginPath();ctx.roundRect(n.x-65,n.y-15,130,30,8);ctx.stroke();
ctx.fillStyle='#fff';ctx.font='11px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(n.label,n.x,n.y);}
ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='12px sans-serif';ctx.fillText('조건을 입력하고 클럽 추천을 누르세요',310,370);
return;
}
var factors=[{label:'목표: '+result.dist+'yd',val:result.dist,color:'#FFB800'},
{label:'바람: '+(result.wind>0?'+':'')+result.wind+'km/h',val:Math.abs(result.wind*0.5),color:'#00B4D8'},
{label:'경사: '+result.slope,val:result.slope==='flat'?0:result.slope==='uphill'?result.dist*0.1:-result.dist*0.08,color:'#4ECDC4'},
{label:'라이: '+result.lie,val:result.lie==='fairway'?0:result.lie==='rough'?5:result.lie==='deep_rough'?15:10,color:'#A855F7'},
{label:'핀: '+result.pin,val:result.pin==='front'?-5:result.pin==='back'?5:result.pin==='tucked'?10:0,color:'#FF6B6B'},
{label:'위험: '+result.risk,val:0,color:'#00FF88'}];
var funnelW=520,startX=50;
for(var i=0;i<factors.length;i++){
var y=50+i*48;var w=funnelW-i*40;var x=startX+i*20;
ctx.fillStyle=factors[i].color;ctx.globalAlpha=0.12;ctx.fillRect(x,y,w,36);ctx.globalAlpha=1;
ctx.strokeStyle=factors[i].color;ctx.lineWidth=1;ctx.strokeRect(x,y,w,36);
ctx.fillStyle='#fff';ctx.font='11px sans-serif';ctx.textAlign='left';ctx.fillText(factors[i].label,x+10,y+15);
var adjText=factors[i].val>0?'+'+Math.round(factors[i].val)+'yd':factors[i].val<0?Math.round(factors[i].val)+'yd':'0yd';
ctx.textAlign='right';ctx.fillStyle=factors[i].color;ctx.fillText(adjText,x+w-10,y+15);
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='9px sans-serif';ctx.textAlign='right';
ctx.fillText('→ '+Math.round(result.dist+(factors[i].val||0))+'yd',x+w-10,y+30);
}
ctx.fillStyle='#00FF88';ctx.globalAlpha=0.2;ctx.beginPath();ctx.roundRect(200,345,220,45,12);ctx.fill();ctx.globalAlpha=1;
ctx.strokeStyle='#00FF88';ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(200,345,220,45,12);ctx.stroke();
ctx.fillStyle='#00FF88';ctx.font='bold 22px sans-serif';ctx.textAlign='center';ctx.fillText(result.best.name+' ('+result.best.dist+'yd)',310,374);
}

// ===== 3. SCORECARD HEATMAP GENERATOR Canvas 620x380 =====
function showScorecardHeatmap(){
playSfx('heatmap_open');
var pn=getPanel('heatmap');
var data=lsGet('sc_rounds',[]);
var html='<button class="v21-close" onclick="window._v21Close(\'heatmap\')">&times;</button>';
html+='<div class="v21-title">&#x1F525; &#xC2A4;&#xCF54;&#xC5B4;&#xCE74;&#xB4DC; &#xD788;&#xD2B8;&#xB9F5;</div>';
html+='<canvas id="v21-heatmap-canvas" width="620" height="380" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v21-card"><h3>&#xB77C;&#xC6B4;&#xB4DC; &#xC2A4;&#xCF54;&#xC5B4; &#xC785;&#xB825;</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(9,1fr);gap:2px;margin-bottom:4px">';
for(var h=1;h<=18;h++){
html+='<div><label class="v21-label" style="text-align:center">H'+h+'</label><input type="number" class="v21-input" style="text-align:center;padding:4px 2px;font-size:11px" id="v21-sc-h'+h+'" min="1" max="12" placeholder="-">';
html+='</div>';
if(h===9)html+='</div><div style="display:grid;grid-template-columns:repeat(9,1fr);gap:2px;margin-top:4px">';
}
html+='</div>';
html+='<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:6px;margin-top:8px">';
html+='<button class="v21-btn v21-btn-primary" onclick="window._v21SaveScorecard()">&#xC800;&#xC7A5;</button>';
html+='<button class="v21-btn" onclick="window._v21ClearScorecard()">&#xC0C8; &#xB77C;&#xC6B4;&#xB4DC;</button>';
html+='</div></div>';
var total=0,cnt=0;
for(var r=0;r<data.length;r++){for(var h=0;h<18;h++){if(data[r][h]){total+=data[r][h];cnt++;}}}
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v21-stat-card"><div class="v21-stat-val" style="color:#00FF88">'+data.length+'</div><div class="v21-stat-label">&#xB77C;&#xC6B4;&#xB4DC;</div></div>';
html+='<div class="v21-stat-card"><div class="v21-stat-val" style="color:#FFB800">'+(cnt>0?(total/cnt).toFixed(1):'-')+'</div><div class="v21-stat-label">&#xD3C9;&#xADE0; &#xD0C0;&#xC218;/&#xD640;</div></div>';
html+='<div class="v21-stat-card"><div class="v21-stat-val" style="color:#FF6B6B">'+(data.length>0?data[data.length-1].reduce(function(a,b){return a+b},0):'-')+'</div><div class="v21-stat-label">&#xCD5C;&#xADFC; &#xCD1D;&#xD0C0;</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('heatmap');drawScorecardHeatmap(data);
}
window._v21SaveScorecard=function(){
var scores=[];var valid=true;
for(var h=1;h<=18;h++){var v=parseInt(document.getElementById('v21-sc-h'+h).value);if(!v||v<1||v>12){valid=false;scores.push(0);}else{scores.push(v);}}
if(scores.filter(function(s){return s>0}).length<9){showToast('최소 9홀 입력 필요');return;}
var data=lsGet('sc_rounds',[]);
data.push(scores);if(data.length>20)data=data.slice(-20);
lsSet('sc_rounds',data);showToast('라운드 저장');showScorecardHeatmap();checkAchievements();
};
window._v21ClearScorecard=function(){for(var h=1;h<=18;h++){var el=document.getElementById('v21-sc-h'+h);if(el)el.value='';}};
function drawScorecardHeatmap(data){
var c=document.getElementById('v21-heatmap-canvas');if(!c)return;var ctx=c.getContext('2d');
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,620,380);
ctx.fillStyle='#fff';ctx.font='bold 14px sans-serif';ctx.textAlign='center';ctx.fillText('Scorecard Heatmap - Par Performance',310,22);
var PAR=[4,4,3,5,4,3,4,5,4,4,3,5,4,4,3,5,4,4];
if(data.length===0){ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='14px sans-serif';ctx.fillText('라운드 스코어를 입력하면 히트맵이 표시됩니다',310,190);return;}
var cellW=30,cellH=22,startX=55,startY=45;
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='9px sans-serif';ctx.textAlign='center';
for(var h=0;h<18;h++){ctx.fillText('H'+(h+1),startX+h*cellW+cellW/2,startY-4);}
ctx.textAlign='right';
for(var r=0;r<data.length;r++){ctx.fillText('R'+(r+1),startX-6,startY+r*cellH+cellH/2+3);}
for(var r=0;r<Math.min(data.length,12);r++){
for(var h=0;h<18;h++){
var score=data[r][h];var par=PAR[h];
var diff=score-par;
var color;
if(score===0||!score)color='rgba(255,255,255,0.05)';
else if(score===1)color='#FF00FF';
else if(diff<=-2)color='#00FF88';
else if(diff===-1)color='#4ECDC4';
else if(diff===0)color='rgba(255,255,255,0.2)';
else if(diff===1)color='#FFB800';
else if(diff===2)color='#FF6B6B';
else color='#FF3366';
ctx.fillStyle=color;ctx.globalAlpha=0.7;ctx.fillRect(startX+h*cellW+1,startY+r*cellH+1,cellW-2,cellH-2);ctx.globalAlpha=1;
if(score>0){ctx.fillStyle=diff<=0?'#fff':'#fff';ctx.font='bold 10px sans-serif';ctx.textAlign='center';ctx.fillText(score,startX+h*cellW+cellW/2,startY+r*cellH+cellH/2+3);}
}}
var legendY=startY+Math.min(data.length,12)*cellH+20;
var legends=[{label:'HIO',color:'#FF00FF'},{label:'Eagle-',color:'#00FF88'},{label:'Birdie',color:'#4ECDC4'},{label:'Par',color:'rgba(255,255,255,0.3)'},{label:'Bogey',color:'#FFB800'},{label:'Double',color:'#FF6B6B'},{label:'Triple+',color:'#FF3366'}];
var lx=40;
ctx.font='9px sans-serif';
for(var i=0;i<legends.length;i++){ctx.fillStyle=legends[i].color;ctx.fillRect(lx,legendY,12,12);ctx.fillStyle='#fff';ctx.textAlign='left';ctx.fillText(legends[i].label,lx+16,legendY+10);lx+=75;}
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='10px sans-serif';ctx.textAlign='center';ctx.fillText('Par: 4-4-3-5-4-3-4-5-4 | 4-3-5-4-4-3-5-4-4 = 72',310,370);
}

// ===== 4. PUTTING BREAK VISUALIZER Canvas 600x360 =====
function showPuttingBreak(){
playSfx('putt_break');
var pn=getPanel('puttbreak');
var data=lsGet('putt_break_log',[]);
var html='<button class="v21-close" onclick="window._v21Close(\'puttbreak\')">&times;</button>';
html+='<div class="v21-title">&#x26F3; &#xD37C;&#xD305; &#xBE0C;&#xB808;&#xC774;&#xD06C; &#xC2DC;&#xAC01;&#xD654;</div>';
html+='<canvas id="v21-putt-canvas" width="600" height="360" style="width:100%;max-width:600px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v21-card"><h3>&#xBE0C;&#xB808;&#xC774;&#xD06C; &#xC870;&#xAC74;</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">';
html+='<div><label class="v21-label">&#xAC70;&#xB9AC; (ft)</label><input type="number" class="v21-input" id="v21-putt-dist" value="15" min="1" max="100"></div>';
html+='<div><label class="v21-label">&#xACBD;&#xC0AC; &#xBC29;&#xD5A5;</label><select class="v21-input" id="v21-putt-slope"><option value="L2R">&#xC67C;&#xCABD;&#x2192;&#xC624;&#xB978;&#xCABD;</option><option value="R2L">&#xC624;&#xB978;&#xCABD;&#x2192;&#xC67C;&#xCABD;</option><option value="uphill">&#xC624;&#xB974;&#xB9C9;</option><option value="downhill">&#xB0B4;&#xB9AC;&#xB9C9;</option><option value="flat">&#xD3C9;&#xC9C0;</option></select></div>';
html+='<div><label class="v21-label">&#xACBD;&#xC0AC;&#xB3C4; (%)</label><input type="range" class="v21-input" id="v21-putt-grade" value="3" min="0" max="8" step="0.5"><span id="v21-putt-grade-val" style="font-size:11px;color:#FFB800">3%</span></div>';
html+='<div><label class="v21-label">&#xADF8;&#xB9B0;&#xC2A4;&#xD53C;&#xB4DC; (Stimp)</label><input type="number" class="v21-input" id="v21-putt-stimp" value="10" min="6" max="14" step="0.5"></div>';
html+='</div>';
html+='<button class="v21-btn v21-btn-primary" style="width:100%;margin-top:8px" onclick="window._v21CalcBreak()">&#xBE0C;&#xB808;&#xC774;&#xD06C; &#xBD84;&#xC11D;</button>';
html+='</div>';
html+='<div id="v21-putt-result" style="margin-top:6px"></div>';
pn.innerHTML=html;openPanel('puttbreak');
var gradeInput=document.getElementById('v21-putt-grade');
var gradeVal=document.getElementById('v21-putt-grade-val');
if(gradeInput)gradeInput.addEventListener('input',function(){if(gradeVal)gradeVal.textContent=this.value+'%';});
drawPuttingBreak(null);
}
window._v21CalcBreak=function(){
playSfx('putt_break');
var dist=parseFloat(document.getElementById('v21-putt-dist').value)||15;
var slope=document.getElementById('v21-putt-slope').value;
var grade=parseFloat(document.getElementById('v21-putt-grade').value)||3;
var stimp=parseFloat(document.getElementById('v21-putt-stimp').value)||10;
var breakInches=0;
if(slope==='L2R'||slope==='R2L')breakInches=dist*grade*0.3*(stimp/10);
else if(slope==='uphill')breakInches=dist*grade*0.15;
else if(slope==='downhill')breakInches=dist*grade*0.45*(stimp/10);
var aimOffset=Math.round(breakInches);
var speedAdj=slope==='uphill'?'+15%':slope==='downhill'?'-20%':'0%';
var result={dist:dist,slope:slope,grade:grade,stimp:stimp,breakInches:breakInches,aimOffset:aimOffset,speedAdj:speedAdj};
drawPuttingBreak(result);
var resEl=document.getElementById('v21-putt-result');
if(resEl){
var slopeNames={L2R:'왼→오른',R2L:'오른→왼',uphill:'오르막',downhill:'내리막',flat:'평지'};
var rh='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px">';
rh+='<div class="v21-stat-card"><div class="v21-stat-val" style="color:#00FF88">'+aimOffset+'"</div><div class="v21-stat-label">&#xBE0C;&#xB808;&#xC774;&#xD06C;</div></div>';
rh+='<div class="v21-stat-card"><div class="v21-stat-val" style="color:#FFB800">'+speedAdj+'</div><div class="v21-stat-label">&#xC2A4;&#xD53C;&#xB4DC; &#xBCF4;&#xC815;</div></div>';
rh+='<div class="v21-stat-card"><div class="v21-stat-val" style="color:#00B4D8">'+slopeNames[slope]+'</div><div class="v21-stat-label">&#xACBD;&#xC0AC;</div></div>';
rh+='<div class="v21-stat-card"><div class="v21-stat-val" style="color:#4ECDC4">'+stimp+'</div><div class="v21-stat-label">Stimp</div></div>';
rh+='</div>';
resEl.innerHTML=rh;
}
var data=lsGet('putt_break_log',[]);data.push({dist:dist,slope:slope,grade:grade,break_in:aimOffset,date:todayStr()});
if(data.length>50)data=data.slice(-50);lsSet('putt_break_log',data);checkAchievements();
};
function drawPuttingBreak(result){
var c=document.getElementById('v21-putt-canvas');if(!c)return;var ctx=c.getContext('2d');
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,600,360);
ctx.fillStyle='#fff';ctx.font='bold 14px sans-serif';ctx.textAlign='center';ctx.fillText('Putting Break Visualization',300,22);
var greenCx=300,greenCy=190,greenRx=220,greenRy=140;
var grd=ctx.createRadialGradient(greenCx,greenCy-20,10,greenCx,greenCy,greenRy+10);
grd.addColorStop(0,'#1a6b1a');grd.addColorStop(0.5,'#157015');grd.addColorStop(1,'#0d4d0d');
ctx.fillStyle=grd;ctx.beginPath();ctx.ellipse(greenCx,greenCy,greenRx,greenRy,0,0,Math.PI*2);ctx.fill();
ctx.strokeStyle='rgba(255,255,255,0.15)';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(greenCx,greenCy,greenRx,greenRy,0,0,Math.PI*2);ctx.stroke();
ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(greenCx,greenCy-60,4,0,Math.PI*2);ctx.fill();
ctx.strokeStyle='#FF3366';ctx.lineWidth=1;ctx.beginPath();ctx.arc(greenCx,greenCy-60,12,0,Math.PI*2);ctx.stroke();
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='9px sans-serif';ctx.fillText('HOLE',greenCx,greenCy-38);
if(!result){
ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(greenCx,greenCy+80,5,0,Math.PI*2);ctx.fill();
ctx.strokeStyle='rgba(255,255,255,0.3)';ctx.setLineDash([4,4]);ctx.beginPath();ctx.moveTo(greenCx,greenCy+80);ctx.lineTo(greenCx,greenCy-60);ctx.stroke();ctx.setLineDash([]);
ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='12px sans-serif';ctx.fillText('조건을 입력하고 브레이크 분석을 누르세요',300,345);
return;
}
var ballY=greenCy+80;
ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(greenCx,ballY,5,0,Math.PI*2);ctx.fill();
var breakPx=result.breakInches*1.5;
var aimX=greenCx;
if(result.slope==='L2R')aimX=greenCx-breakPx;
else if(result.slope==='R2L')aimX=greenCx+breakPx;
ctx.strokeStyle='#FFB800';ctx.lineWidth=2;ctx.setLineDash([6,4]);ctx.beginPath();ctx.moveTo(greenCx,ballY);ctx.lineTo(aimX,greenCy-60);ctx.stroke();ctx.setLineDash([]);
ctx.fillStyle='#FFB800';ctx.font='10px sans-serif';ctx.textAlign='center';ctx.fillText('Aim Line',aimX,greenCy-75);
ctx.strokeStyle='#00FF88';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(greenCx,ballY);
if(result.slope==='L2R'){ctx.quadraticCurveTo(greenCx-breakPx*0.3,greenCy+10,greenCx,greenCy-60);}
else if(result.slope==='R2L'){ctx.quadraticCurveTo(greenCx+breakPx*0.3,greenCy+10,greenCx,greenCy-60);}
else{ctx.lineTo(greenCx,greenCy-60);}
ctx.stroke();
ctx.fillStyle='#00FF88';ctx.font='10px sans-serif';ctx.fillText('Ball Path',greenCx+(result.slope==='L2R'?-20:result.slope==='R2L'?20:15),greenCy+20);
if(result.slope==='uphill'||result.slope==='downhill'){
var arrows=result.slope==='uphill'?'↑↑↑':'↓↓↓';
ctx.fillStyle=result.slope==='uphill'?'#FF6B6B':'#4ECDC4';ctx.font='16px sans-serif';
ctx.fillText(arrows,greenCx+greenRx-30,greenCy);
ctx.font='9px sans-serif';ctx.fillText(result.slope==='uphill'?'UPHILL':'DOWNHILL',greenCx+greenRx-30,greenCy+18);
}
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='10px sans-serif';ctx.textAlign='center';
ctx.fillText('Distance: '+result.dist+'ft | Break: '+result.aimOffset+'" | Grade: '+result.grade+'% | Stimp: '+result.stimp,300,350);
}

// ===== 5. COURSE MANAGEMENT SCENARIOS Canvas 620x400 =====
function showCourseScenarios(){
playSfx('scenario_open');
var pn=getPanel('scenarios');
var SCENARIOS=[
{title:'티샷: 페어웨이 좋은 파4',situation:'페어웨이 넓지만 좌측 OB, 바람 왼쪽에서',safe:'페어웨이 우측 조준, 3W 사용',aggressive:'DR 페이드로 코너 컷',risk:35,reward:'세컨샷 거리 20yd 단축'},
{title:'파3 아일랜드 그린',situation:'165yd, 그린 앞 벙커, 뒤 낭뗠리',safe:'그린 중앙 조준, 7I',aggressive:'핀 직공, 6I 공격',risk:50,reward:'버디 기회'},
{title:'파5 세컨드 샷',situation:'레이업 250yd, 그린까지 220yd, 워터 해저드',safe:'레이업 앞 50yd, AW 어프로치',aggressive:'3W 또는 5W 투온',risk:60,reward:'이글 기회'},
{title:'러프 150yd',situation:'러프에 있음, 핀 앞쪽, 그린 오르막',safe:'8I 안전하게 그린 중앙',aggressive:'9I 핀 직공',risk:40,reward:'버디 퍼트 5ft 이내'},
{title:'벙커 샷 60yd',situation:'페어웨이 벙커, 그린까지 60yd, 높은 립',safe:'SW 안전하게 그린 앞쪽',aggressive:'LW 롭 샷으로 핀 공략',risk:55,reward:'업앤다운 기회'},
{title:'퍼팅: 티어 브레이크',situation:'25ft 퍼팅, 2티어 브레이크, 내리막',safe:'사이드 한 컷 위로 맞춰 두 퍼트',aggressive:'라인 정확히 읽고 원퍼트 시도',risk:30,reward:'버디 퍼트 성;공'},
{title:'도그레그 홀',situation:'410yd 파4, 좌측 OB, 우측 러프, 역풍',safe:'3W 페어웨이 중앙',aggressive:'DR 드로우로 OB 코너 컷',risk:65,reward:'세컨샷 9I 이하'},
{title:'어프로치 30yd',situation:'30yd 남음, 낮은 런아웃, 핀 뒤쪽',safe:'PW 범프앤런',aggressive:'SW 롭샷 핀 근처',risk:45,reward:'탭인 버디'},
{title:'크로스바람',situation:'180yd, 좌측에서 우측 15km/h 크로스',safe:'바람 감안 왼쪽 에임, 5I',aggressive:'드로우로 바람에 태워, 6I',risk:40,reward:'정확한 그린 적중'},
{title:'레이업 후 3퍼트',situation:'3ft 보기 퍼트, 약간 오르막',safe:'홀;을 지나쳐 치게 가볍게',aggressive:'볼드하게 직선 퍼트',risk:15,reward:'확;실한 버디/파'},
{title:'칩샷 100yd',situation:'100yd, 핀 털드(GIR 어려운 위치)',safe:'AW 그린 중앙, 퍼트로 승부',aggressive:'SW 핀 직공, 버디 기회',risk:50,reward:'근접 버디 기회'},
{title:'팀 매치 전략',situation:'팅 배러 베스트볼, 파4 415yd',safe:'안전하게 Par 목표',aggressive:'공격적 버디 시도',risk:35,reward:'팅 상대에게 압박'}
];
var solvedList=lsGet('scenarios_solved',[]);
var html='<button class="v21-close" onclick="window._v21Close(\'scenarios\')">&times;</button>';
html+='<div class="v21-title">&#x1F3AF; &#xCF54;&#xC2A4; &#xB9E4;&#xB2C8;&#xC9C0;&#xBA3C;&#xD2B8; &#xC2DC;&#xB098;&#xB9AC;&#xC624;</div>';
html+='<canvas id="v21-scenario-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div style="display:grid;gap:6px;margin:8px 0">';
for(var i=0;i<SCENARIOS.length;i++){
var sc=SCENARIOS[i];var solved=solvedList.indexOf(i)>=0;
html+='<div class="v21-card" style="'+(solved?'border-color:rgba(0,255,136,0.3)':'')+'"><div style="display:flex;justify-content:space-between;align-items:center"><h3>'+(i+1)+'. '+sc.title+(solved?' &#x2705;':'')+'</h3><span style="font-size:10px;color:#FF6B6B">Risk: '+sc.risk+'%</span></div>';
html+='<p style="font-size:11px;color:rgba(255,255,255,0.6);margin:4px 0">'+sc.situation+'</p>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-top:4px">';
html+='<button class="v21-btn" style="font-size:10px" onclick="window._v21SolveScenario('+i+',\'safe\')">&#x1F6E1; '+sc.safe+'</button>';
html+='<button class="v21-btn" style="font-size:10px;border-color:rgba(255,107,107,.3);color:#FF6B6B" onclick="window._v21SolveScenario('+i+',\'aggressive\')">&#x1F525; '+sc.aggressive+'</button>';
html+='</div></div>';
}
html+='</div>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v21-stat-card"><div class="v21-stat-val" style="color:#00FF88">'+solvedList.length+'/12</div><div class="v21-stat-label">&#xD574;&#xACB0;</div></div>';
html+='<div class="v21-stat-card"><div class="v21-stat-val" style="color:#FFB800">'+Math.round(solvedList.length/12*100)+'%</div><div class="v21-stat-label">&#xC644;&#xB8CC;&#xB960;</div></div>';
var avgRisk=0;for(var i=0;i<SCENARIOS.length;i++)avgRisk+=SCENARIOS[i].risk;avgRisk=Math.round(avgRisk/SCENARIOS.length);
html+='<div class="v21-stat-card"><div class="v21-stat-val" style="color:#FF6B6B">'+avgRisk+'%</div><div class="v21-stat-label">&#xD3C9;&#xADE0; &#xC704;&#xD5D8;&#xB3C4;</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('scenarios');drawScenarioCanvas(SCENARIOS,solvedList);
}
window._v21SolveScenario=function(idx,choice){
playSfx('scenario_solve');
var list=lsGet('scenarios_solved',[]);
if(list.indexOf(idx)===-1){list.push(idx);lsSet('scenarios_solved',list);}
showToast((choice==='safe'?'안전 ':'공격적 ')+'전략 선택!');
showCourseScenarios();checkAchievements();
};
function drawScenarioCanvas(scenarios,solved){
var c=document.getElementById('v21-scenario-canvas');if(!c)return;var ctx=c.getContext('2d');
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,620,400);
ctx.fillStyle='#fff';ctx.font='bold 14px sans-serif';ctx.textAlign='center';ctx.fillText('Course Management Scenarios - Risk/Reward Matrix',310,22);
var chartL=60,chartR=580,chartT=50,chartB=360;
ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.lineWidth=1;
for(var g=0;g<=4;g++){
var gy=chartT+(chartB-chartT)*g/4;ctx.beginPath();ctx.moveTo(chartL,gy);ctx.lineTo(chartR,gy);ctx.stroke();
var gx=chartL+(chartR-chartL)*g/4;ctx.beginPath();ctx.moveTo(gx,chartT);ctx.lineTo(gx,chartB);ctx.stroke();
}
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='10px sans-serif';ctx.textAlign='right';
ctx.fillText('High',chartL-8,chartT+10);ctx.fillText('Low',chartL-8,chartB);
ctx.textAlign='center';ctx.fillText('Low Risk',chartL+40,chartB+16);ctx.fillText('High Risk',chartR-40,chartB+16);
ctx.fillStyle='rgba(0,255,136,0.05)';ctx.fillRect(chartL,chartT,(chartR-chartL)/2,(chartB-chartT)/2);
ctx.fillStyle='rgba(255,183,0,0.05)';ctx.fillRect(chartL+(chartR-chartL)/2,chartT,(chartR-chartL)/2,(chartB-chartT)/2);
ctx.fillStyle='rgba(255,107,107,0.05)';ctx.fillRect(chartL+(chartR-chartL)/2,chartT+(chartB-chartT)/2,(chartR-chartL)/2,(chartB-chartT)/2);
var colors=['#00FF88','#4ECDC4','#00B4D8','#FFB800','#FF6B6B','#A855F7','#FF3366','#FF00FF','#88CCFF','#FFDD57','#C084FC','#34D399'];
for(var i=0;i<scenarios.length;i++){
var sc=scenarios[i];
var x=chartL+(chartR-chartL)*(sc.risk/100);
var rewardVal=0.3+i*0.058;
var y=chartB-(chartB-chartT)*rewardVal;
var isSolved=solved.indexOf(i)>=0;
ctx.beginPath();ctx.arc(x,y,isSolved?10:8,0,Math.PI*2);
ctx.fillStyle=colors[i];ctx.globalAlpha=isSolved?0.9:0.5;ctx.fill();ctx.globalAlpha=1;
if(isSolved){ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.stroke();}
ctx.fillStyle='#fff';ctx.font='bold 9px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(i+1,x,y);
}
ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='9px sans-serif';ctx.textAlign='center';ctx.textBaseline='alphabetic';
ctx.fillText('12 Course Management Scenarios | Solved: '+solved.length+'/12',310,395);
}

// ===== 6. ROUND PACE TIMER Canvas 580x360 =====
function showPaceTimer(){
playSfx('pace_open');
var pn=getPanel('pace');
var data=lsGet('pace_log',[]);
var current=lsGet('pace_current',{hole:1,times:[],startTime:0,running:false});
var html='<button class="v21-close" onclick="window._v21Close(\'pace\')">&times;</button>';
html+='<div class="v21-title">&#x23F1; &#xB77C;&#xC6B4;&#xB4DC; &#xD398;&#xC774;&#xC2A4; &#xD0C0;&#xC774;&#xBA38;</div>';
html+='<canvas id="v21-pace-canvas" width="580" height="360" style="width:100%;max-width:580px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v21-card"><h3>&#xD604;&#xC7AC; &#xD640;: '+current.hole+' / 18</h3>';
html+='<div style="text-align:center;margin:10px 0"><div id="v21-pace-display" style="font-size:42px;font-weight:bold;color:#00FF88">00:00</div></div>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px">';
html+='<button class="v21-btn v21-btn-primary" onclick="window._v21PaceStart()">&#x25B6; &#xC2DC;&#xC791;</button>';
html+='<button class="v21-btn" onclick="window._v21PaceNextHole()">&#x23ED; &#xB2E4;&#xC74C; &#xD640;</button>';
html+='<button class="v21-btn" style="border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="window._v21PaceReset()">&#x23F9; &#xB9AC;&#xC14B;</button>';
html+='</div></div>';
var TARGET_MINS=[13,13,12,14,13,12,13,14,13,13,12,14,13,13,12,14,13,13];
var totalTime=0;for(var i=0;i<current.times.length;i++)totalTime+=current.times[i];
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v21-stat-card"><div class="v21-stat-val" style="color:#00FF88">'+(current.times.length)+'</div><div class="v21-stat-label">&#xC644;&#xB8CC; &#xD640;</div></div>';
html+='<div class="v21-stat-card"><div class="v21-stat-val" style="color:#FFB800">'+Math.floor(totalTime/60)+':'+('0'+Math.floor(totalTime%60)).slice(-2)+'</div><div class="v21-stat-label">&#xCD1D; &#xC2DC;&#xAC04;</div></div>';
var avgPerHole=current.times.length>0?Math.round(totalTime/current.times.length/60*10)/10:0;
html+='<div class="v21-stat-card"><div class="v21-stat-val" style="color:'+(avgPerHole>14?'#FF6B6B':avgPerHole>12?'#FFB800':'#00FF88')+'">'+avgPerHole+'m</div><div class="v21-stat-label">&#xD3C9;&#xADE0;/&#xD640;</div></div>';
html+='</div>';
if(current.times.length>0){
html+='<div class="v21-card"><h3>&#xD640;&#xBCC4; &#xC2DC;&#xAC04;</h3><div style="display:grid;grid-template-columns:repeat(6,1fr);gap:3px">';
for(var i=0;i<current.times.length;i++){
var mins=Math.floor(current.times[i]/60);var secs=Math.floor(current.times[i]%60);
var slow=current.times[i]/60>TARGET_MINS[i];
html+='<div style="text-align:center;padding:4px;border-radius:6px;background:rgba('+(slow?'255,107,107':'0,255,136')+',0.1);border:1px solid rgba('+(slow?'255,107,107':'0,255,136')+',0.2)"><div style="font-size:9px;color:rgba(255,255,255,0.5)">H'+(i+1)+'</div><div style="font-size:12px;font-weight:bold;color:'+(slow?'#FF6B6B':'#00FF88')+'">'+mins+':'+('0'+secs).slice(-2)+'</div></div>';
}
html+='</div></div>';
}
pn.innerHTML=html;openPanel('pace');drawPaceCanvas(current,TARGET_MINS);
if(current.running&&current.startTime){window._v21PaceInterval=setInterval(function(){
var el=document.getElementById('v21-pace-display');
if(el){var elapsed=Math.floor((Date.now()-current.startTime)/1000);var m=Math.floor(elapsed/60);var s=elapsed%60;el.textContent=('0'+m).slice(-2)+':'+('0'+s).slice(-2);}
},1000);}
}
window._v21PaceStart=function(){
var current=lsGet('pace_current',{hole:1,times:[],startTime:0,running:false});
if(!current.running){current.startTime=Date.now();current.running=true;lsSet('pace_current',current);showPaceTimer();}
};
window._v21PaceNextHole=function(){
var current=lsGet('pace_current',{hole:1,times:[],startTime:0,running:false});
if(current.running&&current.startTime){
var elapsed=(Date.now()-current.startTime)/1000;
current.times.push(Math.round(elapsed));
if(elapsed/60>14)playSfx('pace_alert');
current.hole=Math.min(current.hole+1,19);
current.startTime=Date.now();
lsSet('pace_current',current);
if(current.hole>18){current.running=false;lsSet('pace_current',current);showToast('라운드 완료!');
var paceLog=lsGet('pace_log',[]);paceLog.push({times:current.times,date:todayStr()});lsSet('pace_log',paceLog);}
if(window._v21PaceInterval)clearInterval(window._v21PaceInterval);
showPaceTimer();checkAchievements();
}
};
window._v21PaceReset=function(){
lsSet('pace_current',{hole:1,times:[],startTime:0,running:false});
if(window._v21PaceInterval)clearInterval(window._v21PaceInterval);
showPaceTimer();
};
function drawPaceCanvas(current,targets){
var c=document.getElementById('v21-pace-canvas');if(!c)return;var ctx=c.getContext('2d');
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,580,360);
ctx.fillStyle='#fff';ctx.font='bold 14px sans-serif';ctx.textAlign='center';ctx.fillText('Round Pace - Hole Time Tracker',290,22);
if(current.times.length===0){ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='14px sans-serif';ctx.fillText('시작을 누르고 홀별 시간을 기록하세요',290,180);return;}
var chartL=50,chartR=540,chartT=45,chartB=300;
var maxTime=0;for(var i=0;i<current.times.length;i++){if(current.times[i]>maxTime)maxTime=current.times[i];}
for(var i=0;i<targets.length;i++){if(targets[i]*60>maxTime)maxTime=targets[i]*60;}
maxTime=Math.ceil(maxTime/60)*60+60;
ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.lineWidth=1;
for(var g=0;g<=4;g++){var gy=chartT+(chartB-chartT)*g/4;ctx.beginPath();ctx.moveTo(chartL,gy);ctx.lineTo(chartR,gy);ctx.stroke();
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='9px sans-serif';ctx.textAlign='right';
ctx.fillText(Math.round(maxTime*(1-g/4)/60)+'m',chartL-6,gy+4);}
var barW=(chartR-chartL)/18-2;
for(var i=0;i<current.times.length;i++){
var x=chartL+i*((chartR-chartL)/18)+1;
var barH=(chartB-chartT)*(current.times[i]/maxTime);
var slow=current.times[i]/60>targets[i];
ctx.fillStyle=slow?'rgba(255,107,107,0.7)':'rgba(0,255,136,0.7)';
ctx.fillRect(x,chartB-barH,barW,barH);
var targetH=(chartB-chartT)*(targets[i]*60/maxTime);
ctx.strokeStyle='#FFB800';ctx.lineWidth=1;ctx.setLineDash([3,3]);ctx.beginPath();ctx.moveTo(x,chartB-targetH);ctx.lineTo(x+barW,chartB-targetH);ctx.stroke();ctx.setLineDash([]);
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='8px sans-serif';ctx.textAlign='center';ctx.fillText('H'+(i+1),x+barW/2,chartB+12);
}
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='10px sans-serif';ctx.textAlign='center';
var totalSecs=0;for(var i=0;i<current.times.length;i++)totalSecs+=current.times[i];
ctx.fillText('Total: '+Math.floor(totalSecs/3600)+'h '+Math.floor(totalSecs%3600/60)+'m | Target: 4h 00m | Avg: '+Math.round(totalSecs/current.times.length/60*10)/10+'m/hole',290,340);
ctx.fillStyle='#FFB800';ctx.fillRect(380,chartB+6,12,3);ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='9px sans-serif';ctx.textAlign='left';ctx.fillText('Target',396,chartB+12);
}

// ===== 7. HANDICAP GOAL ROADMAP Canvas 620x380 =====
function showHandicapRoadmap(){
playSfx('roadmap_open');
var pn=getPanel('roadmap');
var data=lsGet('hcap_roadmap',{current:18,goal:10,history:[]});
var html='<button class="v21-close" onclick="window._v21Close(\'roadmap\')">&times;</button>';
html+='<div class="v21-title">&#x1F3C6; &#xD578;&#xB514;&#xCE61; &#xBAA9;&#xD45C; &#xB85C;&#xB4DC;&#xB9F5;</div>';
html+='<canvas id="v21-roadmap-canvas" width="620" height="380" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v21-card"><h3>&#xBAA9;&#xD45C; &#xC124;&#xC815;</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">';
html+='<div><label class="v21-label">&#xD604;&#xC7AC; &#xD578;&#xB514;&#xCE61;</label><input type="number" class="v21-input" id="v21-hcap-current" value="'+data.current+'" min="0" max="54" step="0.1"></div>';
html+='<div><label class="v21-label">&#xBAA9;&#xD45C; &#xD578;&#xB514;&#xCE61;</label><input type="number" class="v21-input" id="v21-hcap-goal" value="'+data.goal+'" min="0" max="54" step="0.1"></div>';
html+='</div>';
html+='<button class="v21-btn v21-btn-primary" style="width:100%;margin-top:8px" onclick="window._v21SaveRoadmap()">&#xC800;&#xC7A5; &amp; &#xB85C;&#xB4DC;&#xB9F5; &#xC0DD;&#xC131;</button>';
html+='</div>';
var milestones=[];
var diff=data.current-data.goal;
if(diff>0){
var steps=Math.min(Math.ceil(diff/2),8);
for(var i=0;i<=steps;i++){
var hcap=Math.round((data.current-diff*i/steps)*10)/10;
milestones.push({hcap:hcap,label:hcap<=5?'Single':hcap<=10?'Low':hcap<=18?'Mid':'High'});
}
}
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v21-stat-card"><div class="v21-stat-val" style="color:#FF6B6B">'+data.current+'</div><div class="v21-stat-label">&#xD604;&#xC7AC;</div></div>';
html+='<div class="v21-stat-card"><div class="v21-stat-val" style="color:#00FF88">'+data.goal+'</div><div class="v21-stat-label">&#xBAA9;&#xD45C;</div></div>';
html+='<div class="v21-stat-card"><div class="v21-stat-val" style="color:#FFB800">'+diff.toFixed(1)+'</div><div class="v21-stat-label">&#xAC1C;&#xC120; &#xD544;&#xC694;</div></div>';
html+='</div>';
if(data.history.length>0){
html+='<div class="v21-card"><h3>&#xD578;&#xB514;&#xCE61; &#xAE30;&#xB85D;</h3><div style="display:grid;grid-template-columns:repeat(5,1fr);gap:3px">';
for(var i=Math.max(0,data.history.length-10);i<data.history.length;i++){
var h=data.history[i];
html+='<div style="text-align:center;padding:4px;border-radius:6px;background:rgba(0,255,136,0.06);border:1px solid rgba(0,255,136,0.15)"><div style="font-size:8px;color:rgba(255,255,255,0.4)">'+h.date.slice(5)+'</div><div style="font-size:13px;font-weight:bold;color:#00FF88">'+h.hcap+'</div></div>';
}
html+='</div></div>';
}
pn.innerHTML=html;openPanel('roadmap');drawRoadmapCanvas(data,milestones);
}
window._v21SaveRoadmap=function(){
var current=parseFloat(document.getElementById('v21-hcap-current').value)||18;
var goal=parseFloat(document.getElementById('v21-hcap-goal').value)||10;
var data=lsGet('hcap_roadmap',{current:18,goal:10,history:[]});
data.current=current;data.goal=goal;
data.history.push({hcap:current,date:todayStr()});
if(data.history.length>50)data.history=data.history.slice(-50);
lsSet('hcap_roadmap',data);showToast('로드맵 저장');showHandicapRoadmap();checkAchievements();
};
function drawRoadmapCanvas(data,milestones){
var c=document.getElementById('v21-roadmap-canvas');if(!c)return;var ctx=c.getContext('2d');
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,620,380);
ctx.fillStyle='#fff';ctx.font='bold 14px sans-serif';ctx.textAlign='center';ctx.fillText('Handicap Goal Roadmap',310,22);
var roadY=200;
ctx.strokeStyle='rgba(255,255,255,0.15)';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(40,roadY);ctx.lineTo(580,roadY);ctx.stroke();
if(milestones.length<2){ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='14px sans-serif';ctx.fillText('목표를 설정하면 로드맵이 생성됩니다',310,roadY);return;}
var progress=0;
if(data.history.length>0){
var latest=data.history[data.history.length-1].hcap;
progress=Math.max(0,Math.min(1,(data.current-latest)/(data.current-data.goal)));
}
ctx.strokeStyle='#00FF88';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(40,roadY);ctx.lineTo(40+540*progress,roadY);ctx.stroke();
var msColors=['#FF6B6B','#FF9F43','#FFB800','#FECA57','#48DBFB','#00FF88','#00B4D8','#A855F7','#00FF88'];
for(var i=0;i<milestones.length;i++){
var x=40+540*i/(milestones.length-1);
ctx.beginPath();ctx.arc(x,roadY,12,0,Math.PI*2);
ctx.fillStyle=i<=Math.floor(progress*milestones.length)?'#00FF88':'rgba(255,255,255,0.15)';ctx.fill();
ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.stroke();
ctx.fillStyle='#fff';ctx.font='bold 10px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(milestones[i].hcap,x,roadY);
ctx.textBaseline='alphabetic';ctx.fillStyle=msColors[i]||'#fff';ctx.font='9px sans-serif';ctx.fillText(milestones[i].label,x,roadY-(i%2===0?28:36));
}
ctx.fillStyle='#FF6B6B';ctx.font='bold 13px sans-serif';ctx.textAlign='left';ctx.fillText('START: '+data.current,40,roadY-50);
ctx.fillStyle='#00FF88';ctx.textAlign='right';ctx.fillText('GOAL: '+data.goal,580,roadY-50);
if(data.history.length>=2){
var histY=270;ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='bold 11px sans-serif';ctx.textAlign='left';ctx.fillText('History Trend',50,histY);
ctx.beginPath();ctx.strokeStyle='#4ECDC4';ctx.lineWidth=2;
var hMax=0,hMin=99;for(var i=0;i<data.history.length;i++){if(data.history[i].hcap>hMax)hMax=data.history[i].hcap;if(data.history[i].hcap<hMin)hMin=data.history[i].hcap;}
var hRange=Math.max(hMax-hMin,2);
for(var i=0;i<data.history.length;i++){
var hx=50+500*i/Math.max(data.history.length-1,1);
var hy=histY+20+(80)*(data.history[i].hcap-hMin)/hRange;
if(i===0)ctx.moveTo(hx,hy);else ctx.lineTo(hx,hy);
}
ctx.stroke();
for(var i=0;i<data.history.length;i++){
var hx=50+500*i/Math.max(data.history.length-1,1);
var hy=histY+20+(80)*(data.history[i].hcap-hMin)/hRange;
ctx.beginPath();ctx.arc(hx,hy,3,0,Math.PI*2);ctx.fillStyle='#4ECDC4';ctx.fill();
}
}
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='10px sans-serif';ctx.textAlign='center';
ctx.fillText('Current: '+data.current+' → Goal: '+data.goal+' | Improvement needed: '+(data.current-data.goal).toFixed(1),310,372);
}

// ===== 8. GRIP PRESSURE GUIDE Canvas 600x360 =====
function showGripPressure(){
playSfx('grip_open');
var pn=getPanel('grip');
var CLUBS=['DR','3W','5W','5I','7I','9I','PW','SW','PT'];
var PRESSURES=[4,4,5,5,5,6,6,7,3];
var NOTES=['부드러운 그립, 최대 스윗스피드','드라이버와 동일한 그립 압력','약간의 힘, 컨트롤 중점','중간 그립, 안정성 중시','고르게 잡고 릴렉스','약간 더 장악, 정확도 중시','피치샷용 컨트롤','손목 부드럽게, 터치 중시','가장 부드러운 그립'];
var html='<button class="v21-close" onclick="window._v21Close(\'grip\')">&times;</button>';
html+='<div class="v21-title">&#x270B; &#xADF8;&#xB9BD; &#xC555;&#xB825; &#xAC00;&#xC774;&#xB4DC;</div>';
html+='<canvas id="v21-grip-canvas" width="600" height="360" style="width:100%;max-width:600px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v21-card"><h3>&#xD074;&#xB7FD;&#xBCC4; &#xADF8;&#xB9BD; &#xC555;&#xB825; (1~10)</h3>';
html+='<div style="display:grid;gap:4px">';
for(var i=0;i<CLUBS.length;i++){
var pct=PRESSURES[i]*10;
html+='<div style="display:grid;grid-template-columns:50px 1fr 30px;gap:8px;align-items:center">';
html+='<span style="font-size:12px;font-weight:bold;color:#fff">'+CLUBS[i]+'</span>';
html+='<div style="position:relative;height:20px;background:rgba(255,255,255,0.06);border-radius:10px;overflow:hidden"><div style="position:absolute;left:0;top:0;height:100%;width:'+pct+'%;background:linear-gradient(90deg,#00FF88,#FFB800,#FF6B6B);border-radius:10px;transition:width 0.3s"></div></div>';
html+='<span style="font-size:12px;font-weight:bold;color:#FFB800">'+PRESSURES[i]+'</span>';
html+='</div>';
html+='<div style="font-size:9px;color:rgba(255,255,255,0.4);padding-left:58px;margin-top:-2px;margin-bottom:4px">'+NOTES[i]+'</div>';
}
html+='</div></div>';
html+='<div class="v21-card"><h3>&#xADF8;&#xB9BD; &#xD301;</h3>';
html+='<ul style="font-size:11px;color:rgba(255,255,255,0.7);line-height:1.8;padding-left:16px">';
html+='<li>1-3: 부드러운 그립 (퍼팅, 칩샷)</li>';
html+='<li>4-5: 중간 그립 (드라이버, 우드)</li>';
html+='<li>6-7: 단단한 그립 (아이언, 웨지)</li>';
html+='<li>8-10: 과도한 그립 (피해야 함)</li>';
html+='<li>손목과 손가락으로 그립, 손바닥은 리렉스</li>';
html+='</ul></div>';
pn.innerHTML=html;openPanel('grip');drawGripCanvas(CLUBS,PRESSURES);
}
function drawGripCanvas(clubs,pressures){
var c=document.getElementById('v21-grip-canvas');if(!c)return;var ctx=c.getContext('2d');
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,600,360);
ctx.fillStyle='#fff';ctx.font='bold 14px sans-serif';ctx.textAlign='center';ctx.fillText('Grip Pressure Guide by Club',300,22);
var handCx=160,handCy=190;
ctx.strokeStyle='rgba(255,255,255,0.3)';ctx.lineWidth=2;
ctx.beginPath();ctx.ellipse(handCx,handCy,55,80,0,0,Math.PI*2);ctx.stroke();
ctx.beginPath();ctx.moveTo(handCx-20,handCy-80);ctx.quadraticCurveTo(handCx-25,handCy-120,handCx-15,handCy-140);ctx.stroke();
ctx.beginPath();ctx.moveTo(handCx-5,handCy-82);ctx.quadraticCurveTo(handCx-8,handCy-130,handCx,handCy-150);ctx.stroke();
ctx.beginPath();ctx.moveTo(handCx+10,handCy-78);ctx.quadraticCurveTo(handCx+8,handCy-125,handCx+12,handCy-148);ctx.stroke();
ctx.beginPath();ctx.moveTo(handCx+22,handCy-72);ctx.quadraticCurveTo(handCx+25,handCy-110,handCx+22,handCy-135);ctx.stroke();
ctx.beginPath();ctx.moveTo(handCx+50,handCy-20);ctx.quadraticCurveTo(handCx+75,handCy-30,handCx+80,handCy-15);ctx.stroke();
var zones=[{x:handCx-5,y:handCy+20,label:'손바닥',pressure:2,color:'#00FF88'},
{x:handCx-20,y:handCy-30,label:'손가락',pressure:5,color:'#FFB800'},
{x:handCx+20,y:handCy-30,label:'손가락',pressure:5,color:'#FFB800'},
{x:handCx,y:handCy-60,label:'손목',pressure:4,color:'#4ECDC4'},
{x:handCx+55,y:handCy-10,label:'엄지',pressure:3,color:'#00B4D8'}];
for(var i=0;i<zones.length;i++){
var z=zones[i];
ctx.beginPath();ctx.arc(z.x,z.y,8,0,Math.PI*2);ctx.fillStyle=z.color;ctx.globalAlpha=0.5;ctx.fill();ctx.globalAlpha=1;
ctx.fillStyle=z.color;ctx.font='8px sans-serif';ctx.textAlign='center';ctx.fillText(z.label,z.x,z.y+20);ctx.fillText(z.pressure+'/10',z.x,z.y+30);
}
var chartL=300,chartR=570,chartT=45,chartB=330;
var barH=(chartB-chartT)/clubs.length-4;
for(var i=0;i<clubs.length;i++){
var y=chartT+i*(barH+4);
var pct=pressures[i]/10;
ctx.fillStyle='rgba(255,255,255,0.06)';ctx.fillRect(chartL,y,chartR-chartL,barH);
var grd=ctx.createLinearGradient(chartL,0,chartR,0);
grd.addColorStop(0,'#00FF88');grd.addColorStop(0.5,'#FFB800');grd.addColorStop(1,'#FF6B6B');
ctx.fillStyle=grd;ctx.globalAlpha=0.7;ctx.fillRect(chartL,y,(chartR-chartL)*pct,barH);ctx.globalAlpha=1;
ctx.fillStyle='#fff';ctx.font='bold 11px sans-serif';ctx.textAlign='left';ctx.fillText(clubs[i],chartL+6,y+barH/2+4);
ctx.textAlign='right';ctx.fillText(pressures[i]+'/10',chartR-6,y+barH/2+4);
}
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='10px sans-serif';ctx.textAlign='center';
ctx.fillText('1-3: Soft | 4-5: Medium | 6-7: Firm | 8+: Too tight',300,350);
}

// ===== QUIZ v21 (+15 = 195->210) =====
var QUIZ_V21=[
{q:'스윙 템포에서 투어 프로 평균 백스윙/다운스윙 비율은?',a:['1:1','2:1','3:1','4:1'],c:2},
{q:'클럽 의사결정 시 가장 먼저 고려할 요소는?',a:['바람','목표 거리','라이','핀; 위치'],c:1},
{q:'스코어카드 히트맵에서 빨간색은 무엇을 의미하나?',a:['Eagle','버디','Par','바운드 이상'],c:3},
{q:'퍼팅 브레이크에서 Stimpmeter 수치 12는?',a:['느린 그린','보통','빠른 그린','매우 빠른 그린'],c:2},
{q:'코스 매니지먼트에서 안전한 전략의 핵심은?',a:['항상 공격','그린 중앙 공략','최대 비거리','핀 직공'],c:1},
{q:'라운드 페이스에서 4인 기준 이상적인 18홀 시간은?',a:['3시간','4시간','5시간','2시간 30분'],c:1},
{q:'핸디칡 인덱스 계산 시 가장 좋은 8개 라운드 스코어의 비율은?',a:['50%','60%','80%','100%'],c:2},
{q:'그립 압력 스케일에서 퍼팅 시 권장 압력은?',a:['1-2','3-4','5-6','7-8'],c:1},
{q:'크로스바람 15km/h에서 7I(160yd) 이동량은 약?',a:['3-5yd','7-10yd','15yd','20yd이상'],c:1},
{q:'스코어카드에서 Eagle은 Par 대비 몇 타 적은가?',a:['1타','2타','3타','4타'],c:1},
{q:'바운핸스후 최선의 전략은?',a:['항상 그린 공략','안전한 위치로 탈출','항상 핀 직공','항상 로브 샷'],c:1},
{q:'Stimpmeter 10 그린에서 20ft 퍼팅의 브레이크는?',a:['거의 없음','3-5인치','8-12인치','20인치 이상'],c:1},
{q:'페이스 오브 플레이에서 슬로우 플레이 경고 기준 시간은?',a:['홀당 10분','홀당 14분 이상','홀당 20분','홀당 8분'],c:1},
{q:'PGA 투어 평균 스윙 템포(BPM)는?',a:['55-65','76-86','100-110','120+'],c:1},
{q:'내리막 퍼팅에서 스피드 조절 방법은?',a:['더 세게 침','덕 적게 침','같은 힘으로','퍼터 교체'],c:1}
];
function showQuizV21(){
playSfx('quiz_correct_v21');
var pn=getPanel('quizv21');
var qIdx=lsGet('quiz_v21_idx',0);var score=lsGet('quiz_v21_score',0);var total=lsGet('quiz_v21_total',0);
if(qIdx>=QUIZ_V21.length)qIdx=0;
var q=QUIZ_V21[qIdx];
var html='<button class="v21-close" onclick="window._v21Close(\'quizv21\')">&times;</button>';
html+='<div class="v21-title">&#x1F4DA; Golf Quiz v21 ('+(qIdx+1)+'/'+QUIZ_V21.length+')</div>';
html+='<div class="v21-card"><h3>'+q.q+'</h3>';
html+='<div style="display:grid;gap:6px;margin-top:8px">';
for(var a=0;a<q.a.length;a++){
html+='<button class="v21-btn" style="width:100%;text-align:left;padding:10px" onclick="window._v21AnswerQuiz('+a+','+q.c+')">'+String.fromCharCode(65+a)+'. '+q.a[a]+'</button>';
}
html+='</div></div>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v21-stat-card"><div class="v21-stat-val" style="color:#00FF88">'+score+'</div><div class="v21-stat-label">&#xC815;&#xB2F5;</div></div>';
html+='<div class="v21-stat-card"><div class="v21-stat-val" style="color:#FF6B6B">'+total+'</div><div class="v21-stat-label">&#xCD1D; &#xD480;&#xC774;</div></div>';
html+='<div class="v21-stat-card"><div class="v21-stat-val" style="color:#FFB800">'+(total>0?Math.round(score/total*100):0)+'%</div><div class="v21-stat-label">&#xC815;&#xB2F5;&#xB960;</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('quizv21');
}
window._v21AnswerQuiz=function(sel,correct){
var score=lsGet('quiz_v21_score',0);var total=lsGet('quiz_v21_total',0);var qIdx=lsGet('quiz_v21_idx',0);
total++;
if(sel===correct){score++;playSfx('quiz_correct_v21');showToast('정답!');}
else{playSfx('quiz_wrong_v21');showToast('오답! 정답: '+String.fromCharCode(65+correct));}
qIdx++;
lsSet('quiz_v21_score',score);lsSet('quiz_v21_total',total);lsSet('quiz_v21_idx',qIdx);
setTimeout(showQuizV21,800);checkAchievements();
};

// ===== ACHIEVEMENTS v21 (+12 = 156->168) =====
var ACHIEVEMENTS_V21=[
{id:'rhythm_tracker',name:'Rhythm Tracker',desc:'스윙 리듬 5회 측정',check:function(){return lsGet('rhythm_log',[]).length>=5}},
{id:'rhythm_pro',name:'Rhythm Pro',desc:'스윙 리듬 20회 측정',check:function(){return lsGet('rhythm_log',[]).length>=20}},
{id:'decision_maker',name:'Decision Maker',desc:'클럽 의사결정 5회 사용',check:function(){return lsGet('decision_uses',0)>=5}},
{id:'scorecard_master',name:'Scorecard Master',desc:'스코어카드 3라운드 입력',check:function(){return lsGet('sc_rounds',[]).length>=3}},
{id:'putt_reader',name:'Putt Reader',desc:'퍼팅 브레이크 10회 분석',check:function(){return lsGet('putt_break_log',[]).length>=10}},
{id:'scenario_solver',name:'Scenario Solver',desc:'시나리오 6개 해결',check:function(){return lsGet('scenarios_solved',[]).length>=6}},
{id:'scenario_master',name:'Scenario Master',desc:'시나리오 전체 해결',check:function(){return lsGet('scenarios_solved',[]).length>=12}},
{id:'pace_tracker',name:'Pace Tracker',desc:'라운드 페이스 완주',check:function(){return lsGet('pace_log',[]).length>=1}},
{id:'roadmap_setter',name:'Roadmap Setter',desc:'핸디칡 목표 설정',check:function(){var d=lsGet('hcap_roadmap',{history:[]});return d.history.length>=1}},
{id:'quiz_v21_master',name:'Quiz v21 Master',desc:'v21 퀴즈 전문 정답',check:function(){return lsGet('quiz_v21_score',0)>=15}},
{id:'quiz_v21_clear',name:'Quiz v21 Clear',desc:'v21 퀴즈 완주',check:function(){return lsGet('quiz_v21_total',0)>=15}},
{id:'v21_complete',name:'v21 Complete',desc:'v21 전체 기능 탐색',check:function(){return lsGet('v21_explored',0)>=8}}
];
function checkAchievements(){
var unlocked=lsGet('achievements_v21',[]);
for(var i=0;i<ACHIEVEMENTS_V21.length;i++){
var a=ACHIEVEMENTS_V21[i];
if(unlocked.indexOf(a.id)===-1&&a.check()){
unlocked.push(a.id);lsSet('achievements_v21',unlocked);
playSfx('achieve_v21');showToast('🏆 '+a.name+' unlocked!');
}
}
}
var explored=lsGet('v21_explored',0);
function markExplored(){explored++;lsSet('v21_explored',explored);}

// ===== CSS =====
var style=document.createElement('style');
style.textContent='.v21-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:10020;display:none;align-items:center;justify-content:center;padding:16px;overflow-y:auto}.v21-overlay.active{display:flex}.v21-panel{background:#14141a;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:20px;max-width:660px;width:100%;max-height:90vh;overflow-y:auto;position:relative}.v21-close{position:absolute;top:12px;right:12px;background:none;border:none;color:#fff;font-size:24px;cursor:pointer;z-index:2;opacity:0.7}.v21-close:hover{opacity:1}.v21-title{font-size:18px;font-weight:bold;color:#fff;margin-bottom:12px;text-align:center}.v21-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;margin:8px 0}.v21-card h3{font-size:13px;color:rgba(255,255,255,0.7);margin-bottom:6px}.v21-label{font-size:10px;color:rgba(255,255,255,0.5);display:block;margin-bottom:2px}.v21-input{width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:6px;color:#fff;padding:6px 8px;font-size:12px;outline:none}.v21-input:focus{border-color:#00FF88}.v21-btn{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);border-radius:8px;color:#fff;padding:8px 12px;font-size:12px;cursor:pointer;transition:all 0.2s}.v21-btn:hover{background:rgba(255,255,255,0.12)}.v21-btn-primary{background:rgba(0,255,136,0.15);border-color:rgba(0,255,136,0.3);color:#00FF88}.v21-btn-primary:hover{background:rgba(0,255,136,0.25)}.v21-btn-sm{padding:6px 8px;font-size:11px}.v21-stat-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:10px;text-align:center}.v21-stat-val{font-size:18px;font-weight:bold}.v21-stat-label{font-size:9px;color:rgba(255,255,255,0.5);margin-top:2px}.v21-toast{position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(20px);background:rgba(0,255,136,0.15);border:1px solid rgba(0,255,136,0.3);color:#00FF88;padding:10px 20px;border-radius:10px;font-size:13px;z-index:10030;opacity:0;transition:all 0.3s}.v21-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}';
document.head.appendChild(style);

// ===== NAVIGATION =====
window._v21Close=function(id){closePanel(id);};
function addNavButtons(){
var existing=document.querySelector('[id*="v20"]')||document.querySelector('[id*="v19"]')||document.querySelector('.gt-bottom-nav')||document.querySelector('[style*="position:fixed"][style*="bottom"]');
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
{label:'Rhythm',fn:showSwingRhythm,icon:'&#x1F3B5;'},
{label:'Club AI',fn:showClubDecision,icon:'&#x1F333;'},
{label:'Heatmap',fn:showScorecardHeatmap,icon:'&#x1F525;'},
{label:'Break',fn:showPuttingBreak,icon:'&#x26F3;'},
{label:'Scenario',fn:showCourseScenarios,icon:'&#x1F3AF;'},
{label:'Pace',fn:showPaceTimer,icon:'&#x23F1;'},
{label:'Roadmap',fn:showHandicapRoadmap,icon:'&#x1F3C6;'},
{label:'Grip',fn:showGripPressure,icon:'&#x270B;'},
{label:'Quiz21',fn:showQuizV21,icon:'&#x1F4DA;'}
];
for(var i=0;i<btns.length;i++){
(function(b){
var btn=document.createElement('button');
btn.innerHTML=b.icon+'<br><span style="font-size:8px">'+b.label+'</span>';
btn.style.cssText='background:rgba(168,85,247,0.12);border:1px solid rgba(168,85,247,0.25);border-radius:8px;color:#A855F7;padding:6px 4px;font-size:12px;cursor:pointer;min-width:44px;flex:0 0 auto;margin:2px';
btn.addEventListener('click',function(){b.fn();markExplored();});
nav.appendChild(btn);
})(btns[i]);
}
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown',function(e){
if(!e.shiftKey)return;
switch(e.key){
case'A':case'a':showSwingRhythm();markExplored();break;
case'B':case'b':showClubDecision();markExplored();break;
case'C':case'c':showScorecardHeatmap();markExplored();break;
case'D':case'd':showPuttingBreak();markExplored();break;
case'E':case'e':showCourseScenarios();markExplored();break;
case'F':case'f':showPaceTimer();markExplored();break;
case'G':case'g':showHandicapRoadmap();markExplored();break;
case'H':case'h':showGripPressure();markExplored();break;
case')':case'0':showQuizV21();markExplored();break;
}
});

// ===== INIT =====
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',addNavButtons);}
else{setTimeout(addNavButtons,1500);}
setTimeout(checkAchievements,3000);
})();
