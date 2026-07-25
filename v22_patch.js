(function(){
'use strict';
var LS='gt_v22_';
var audioCtx=null;
function getAC(){if(!audioCtx)try{audioCtx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}return audioCtx}
function playSfx(type){var ac=getAC();if(!ac)return;var o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);var t=ac.currentTime;g.gain.setValueAtTime(0.1,t);switch(type){case'launch_open':o.type='sine';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(659,t+0.06);o.frequency.linearRampToValueAtTime(784,t+0.12);o.frequency.linearRampToValueAtTime(988,t+0.18);g.gain.exponentialRampToValueAtTime(0.01,t+0.32);o.start(t);o.stop(t+0.32);break;case'launch_sim':o.type='triangle';o.frequency.setValueAtTime(659,t);o.frequency.linearRampToValueAtTime(988,t+0.08);g.gain.exponentialRampToValueAtTime(0.01,t+0.15);o.start(t);o.stop(t+0.15);break;case'roi_open':o.type='sine';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(554,t+0.07);o.frequency.linearRampToValueAtTime(698,t+0.14);g.gain.exponentialRampToValueAtTime(0.01,t+0.28);o.start(t);o.stop(t+0.28);break;case'turnaround_open':o.type='sine';o.frequency.setValueAtTime(370,t);o.frequency.linearRampToValueAtTime(466,t+0.06);o.frequency.linearRampToValueAtTime(587,t+0.12);o.frequency.linearRampToValueAtTime(740,t+0.18);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'fwzone_open':o.type='sine';o.frequency.setValueAtTime(494,t);o.frequency.linearRampToValueAtTime(622,t+0.07);o.frequency.linearRampToValueAtTime(784,t+0.14);g.gain.exponentialRampToValueAtTime(0.01,t+0.28);o.start(t);o.stop(t+0.28);break;case'lagputt_open':o.type='sine';o.frequency.setValueAtTime(349,t);o.frequency.linearRampToValueAtTime(440,t+0.06);o.frequency.linearRampToValueAtTime(523,t+0.12);o.frequency.linearRampToValueAtTime(659,t+0.18);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'lagputt_hit':o.type='triangle';o.frequency.setValueAtTime(880,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.1);o.start(t);o.stop(t+0.1);break;case'season_open':o.type='sine';o.frequency.setValueAtTime(587,t);o.frequency.linearRampToValueAtTime(740,t+0.07);o.frequency.linearRampToValueAtTime(880,t+0.14);g.gain.exponentialRampToValueAtTime(0.01,t+0.28);o.start(t);o.stop(t+0.28);break;case'cluster_open':o.type='sine';o.frequency.setValueAtTime(466,t);o.frequency.linearRampToValueAtTime(587,t+0.06);o.frequency.linearRampToValueAtTime(740,t+0.12);o.frequency.linearRampToValueAtTime(880,t+0.18);g.gain.exponentialRampToValueAtTime(0.01,t+0.32);o.start(t);o.stop(t+0.32);break;case'rating_open':o.type='sine';o.frequency.setValueAtTime(392,t);o.frequency.linearRampToValueAtTime(494,t+0.08);o.frequency.linearRampToValueAtTime(622,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'quiz_correct_v22':o.type='sine';o.frequency.setValueAtTime(784,t);o.frequency.setValueAtTime(988,t+0.08);o.frequency.setValueAtTime(1175,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'quiz_wrong_v22':o.type='sawtooth';o.frequency.setValueAtTime(277,t);o.frequency.linearRampToValueAtTime(208,t+0.2);g.gain.setValueAtTime(0.06,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'achieve_v22':o.type='sine';o.frequency.setValueAtTime(988,t);o.frequency.setValueAtTime(1175,t+0.1);o.frequency.setValueAtTime(1397,t+0.2);o.frequency.setValueAtTime(1760,t+0.3);g.gain.exponentialRampToValueAtTime(0.01,t+0.5);o.start(t);o.stop(t+0.5);break;case'nav_v22':o.type='sine';o.frequency.setValueAtTime(660,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.08);o.start(t);o.stop(t+0.08);break;case'save_v22':o.type='triangle';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(784,t+0.1);g.gain.exponentialRampToValueAtTime(0.01,t+0.2);o.start(t);o.stop(t+0.2);break;default:o.type='sine';o.frequency.setValueAtTime(440,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.15);o.start(t);o.stop(t+0.15)}}

function lsGet(k,d){try{var v=localStorage.getItem(LS+k);return v?JSON.parse(v):d}catch(e){return d}}
function lsSet(k,v){try{localStorage.setItem(LS+k,JSON.stringify(v))}catch(e){}}
function todayStr(){return new Date().toISOString().slice(0,10)}
function showToast(msg){var t=document.createElement('div');t.className='v22-toast';t.textContent=msg;document.body.appendChild(t);setTimeout(function(){t.classList.add('show')},50);setTimeout(function(){t.classList.remove('show');setTimeout(function(){t.remove()},400)},3000)}
function createOverlay(id){var ov=document.createElement('div');ov.className='v22-overlay';ov.id='v22-'+id;ov.addEventListener('click',function(e){if(e.target===ov)closePanel(id)});var pn=document.createElement('div');pn.className='v22-panel';pn.style.position='relative';ov.appendChild(pn);return pn}
function openPanel(id){var el=document.getElementById('v22-'+id);if(el)el.classList.add('active')}
function closePanel(id){var el=document.getElementById('v22-'+id);if(el)el.classList.remove('active')}
function getPanel(id){var ov=document.getElementById('v22-'+id);if(!ov){var pn=createOverlay(id);pn.id='v22-'+id+'-panel';document.body.appendChild(pn.parentElement);return pn}return ov.querySelector('.v22-panel')||ov}

// ===== 1. SHOT LAUNCH MONITOR SIMULATOR Canvas 620x400 =====
function showLaunchMonitor(){
playSfx('launch_open');
var pn=getPanel('launch');
var data=lsGet('launch_log',[]);
var CLUBS=['Driver','3W','5W','4I','5I','6I','7I','8I','9I','PW','GW','SW','LW','Putter'];
var DEFAULTS={Driver:{speed:155,angle:12,spin:2700,carry:250},
'3W':{speed:140,angle:14,spin:3400,carry:230},'5W':{speed:132,angle:16,spin:4200,carry:215},
'4I':{speed:125,angle:17,spin:4500,carry:200},'5I':{speed:120,angle:19,spin:5000,carry:190},
'6I':{speed:115,angle:21,spin:5500,carry:178},'7I':{speed:110,angle:24,spin:6200,carry:165},
'8I':{speed:105,angle:27,spin:7000,carry:150},'9I':{speed:100,angle:30,spin:7800,carry:135},
PW:{speed:95,angle:34,spin:8500,carry:120},GW:{speed:88,angle:38,spin:9200,carry:105},
SW:{speed:80,angle:42,spin:10000,carry:90},LW:{speed:75,angle:48,spin:10500,carry:75},
Putter:{speed:15,angle:3,spin:200,carry:0}};
var selClub=lsGet('launch_club','7I');
var html='<button class="v22-close" onclick="window._v22Close(\'launch\')">&times;</button>';
html+='<div class="v22-title">&#x1F680; &#xC0F7; &#xB7F0;&#xCE58; &#xBAA8;&#xB2C8;&#xD130; &#xC2DC;&#xBBAC;&#xB808;&#xC774;&#xD130;</div>';
html+='<canvas id="v22-launch-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v22-card"><h3>&#xD074;&#xB7FD; &#xC120;&#xD0DD;</h3>';
html+='<div style="display:flex;flex-wrap:wrap;gap:4px;margin:6px 0">';
for(var i=0;i<CLUBS.length;i++){
html+='<button class="v22-btn v22-btn-sm'+(CLUBS[i]===selClub?' v22-btn-primary':'')+'" onclick="window._v22SelectClub(\''+CLUBS[i]+'\')">'+CLUBS[i]+'</button>';
}
html+='</div></div>';
var def=DEFAULTS[selClub]||DEFAULTS['7I'];
html+='<div class="v22-card"><h3>&#xB7F0;&#xCE58; &#xB370;&#xC774;&#xD130; ('+selClub+')</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">';
html+='<div><label class="v22-label">Ball Speed (mph)</label><input class="v22-input" type="number" id="v22-lm-speed" value="'+def.speed+'" min="10" max="200"></div>';
html+='<div><label class="v22-label">Launch Angle (&deg;)</label><input class="v22-input" type="number" id="v22-lm-angle" value="'+def.angle+'" min="0" max="60" step="0.5"></div>';
html+='<div><label class="v22-label">Spin Rate (rpm)</label><input class="v22-input" type="number" id="v22-lm-spin" value="'+def.spin+'" min="100" max="12000"></div>';
html+='<div><label class="v22-label">Carry (yd)</label><input class="v22-input" type="number" id="v22-lm-carry" value="'+def.carry+'" min="0" max="350"></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
html+='<button class="v22-btn v22-btn-primary" onclick="window._v22SimLaunch()">&#x1F3AF; &#xC2DC;&#xBBAC;&#xB808;&#xC774;&#xC158;</button>';
html+='<button class="v22-btn" onclick="window._v22SaveLaunch()">&#x1F4BE; &#xC800;&#xC7A5;</button>';
html+='</div></div>';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v22-stat-card"><div class="v22-stat-val" style="color:#00FF88">'+data.length+'</div><div class="v22-stat-label">&#xCE21;&#xC815;&#xD68C;</div></div>';
var avgCarry=0;if(data.length>0){for(var j=0;j<data.length;j++)avgCarry+=data[j].carry;avgCarry=Math.round(avgCarry/data.length);}
html+='<div class="v22-stat-card"><div class="v22-stat-val" style="color:#FFB800">'+avgCarry+'</div><div class="v22-stat-label">&#xD3C9;&#xADE0; Carry</div></div>';
var avgSpin=0;if(data.length>0){for(var j=0;j<data.length;j++)avgSpin+=data[j].spin;avgSpin=Math.round(avgSpin/data.length);}
html+='<div class="v22-stat-card"><div class="v22-stat-val" style="color:#4ECDC4">'+avgSpin+'</div><div class="v22-stat-label">&#xD3C9;&#xADE0; Spin</div></div>';
var bestCarry=0;for(var j=0;j<data.length;j++)if(data[j].carry>bestCarry)bestCarry=data[j].carry;
html+='<div class="v22-stat-card"><div class="v22-stat-val" style="color:#A855F7">'+bestCarry+'</div><div class="v22-stat-label">&#xCD5C;&#xB300; Carry</div></div>';
html+='</div>';
if(data.length>0){html+='<button class="v22-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'&#xCD08;&#xAE30;&#xD654;?\'))window._v22ResetLaunch()">&#xCD08;&#xAE30;&#xD654;</button>';}
pn.innerHTML=html;openPanel('launch');drawLaunchCanvas(data,selClub,def);
}
window._v22SelectClub=function(c){lsSet('launch_club',c);showLaunchMonitor();};
window._v22SimLaunch=function(){
playSfx('launch_sim');
var speed=parseFloat(document.getElementById('v22-lm-speed').value)||100;
var angle=parseFloat(document.getElementById('v22-lm-angle').value)||20;
var spin=parseInt(document.getElementById('v22-lm-spin').value)||5000;
var carry=parseInt(document.getElementById('v22-lm-carry').value)||150;
var smash=carry>0?(carry/speed*1.48).toFixed(2):'--';
var totalDist=Math.round(carry*1.08);
var apex=Math.round(carry*Math.sin(angle*Math.PI/180)*0.42);
showToast('Smash: '+smash+' | Total: '+totalDist+'yd | Apex: '+apex+'yd');
drawLaunchCanvas(lsGet('launch_log',[]),lsGet('launch_club','7I'),{speed:speed,angle:angle,spin:spin,carry:carry});
};
window._v22SaveLaunch=function(){
playSfx('save_v22');
var speed=parseFloat(document.getElementById('v22-lm-speed').value)||100;
var angle=parseFloat(document.getElementById('v22-lm-angle').value)||20;
var spin=parseInt(document.getElementById('v22-lm-spin').value)||5000;
var carry=parseInt(document.getElementById('v22-lm-carry').value)||150;
var club=lsGet('launch_club','7I');
var data=lsGet('launch_log',[]);
data.push({club:club,speed:speed,angle:angle,spin:spin,carry:carry,date:todayStr()});
if(data.length>100)data=data.slice(-100);
lsSet('launch_log',data);
showToast(club+' Launch Data Saved');showLaunchMonitor();checkAchievements();
};
window._v22ResetLaunch=function(){lsSet('launch_log',[]);showLaunchMonitor();};
function drawLaunchCanvas(data,club,def){
var c=document.getElementById('v22-launch-canvas');if(!c)return;var ctx=c.getContext('2d');
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,620,400);
ctx.fillStyle='#fff';ctx.font='bold 14px sans-serif';ctx.textAlign='center';ctx.fillText('Shot Launch Monitor - '+club+' Trajectory & Metrics',310,22);
var cx=310,cy=340,radius=130;
ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.lineWidth=1;
for(var r=1;r<=5;r++){ctx.beginPath();ctx.arc(cx,cy,radius*r/5,Math.PI,0);ctx.stroke();}
var metrics=['Ball Speed','Launch Angle','Spin Rate','Carry','Smash Factor','Apex'];
var vals=[def.speed/200,def.angle/60,def.spin/12000,def.carry/300,(def.carry/def.speed*1.48)/1.55,Math.sin(def.angle*Math.PI/180)*0.42];
var colors=['#00FF88','#FFB800','#FF6B6B','#4ECDC4','#A855F7','#00B4D8'];
for(var i=0;i<metrics.length;i++){
var a=Math.PI+Math.PI*i/(metrics.length-1);
var ex=cx+Math.cos(a)*radius;var ey=cy+Math.sin(a)*radius;
ctx.strokeStyle='rgba(255,255,255,0.15)';ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(ex,ey);ctx.stroke();
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='9px sans-serif';ctx.textAlign='center';
ctx.fillText(metrics[i],ex,ey-8);
var val=Math.min(vals[i],1);
var vx=cx+Math.cos(a)*radius*val;var vy=cy+Math.sin(a)*radius*val;
ctx.beginPath();ctx.arc(vx,vy,5,0,Math.PI*2);ctx.fillStyle=colors[i];ctx.fill();
}
ctx.beginPath();ctx.moveTo(cx,cy);
for(var i=0;i<metrics.length;i++){
var a=Math.PI+Math.PI*i/(metrics.length-1);
var val=Math.min(vals[i],1);
var px=cx+Math.cos(a)*radius*val;var py=cy+Math.sin(a)*radius*val;
if(i===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);
}
ctx.closePath();ctx.fillStyle='rgba(0,255,136,0.1)';ctx.fill();ctx.strokeStyle='rgba(0,255,136,0.5)';ctx.lineWidth=2;ctx.stroke();
var trajY=340;var trajMaxX=580;var trajMinX=60;
ctx.strokeStyle='rgba(0,255,136,0.6)';ctx.lineWidth=2;ctx.beginPath();
var angleRad=def.angle*Math.PI/180;
for(var px=0;px<=1;px+=0.02){
var x=trajMinX+(trajMaxX-trajMinX)*px;
var h=4*px*(1-px)*Math.sin(angleRad)*100;
var y=trajY-h;
if(px===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
}
ctx.stroke();
ctx.fillStyle='#00FF88';ctx.beginPath();ctx.arc(trajMaxX,trajY,4,0,Math.PI*2);ctx.fill();
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='9px sans-serif';
ctx.fillText(def.carry+'yd',trajMaxX,trajY+14);
var apexX=trajMinX+(trajMaxX-trajMinX)*0.5;var apexY=trajY-Math.sin(angleRad)*100;
ctx.fillStyle='#FFB800';ctx.beginPath();ctx.arc(apexX,apexY,3,0,Math.PI*2);ctx.fill();
ctx.fillStyle='rgba(255,183,0,0.6)';ctx.fillText('Apex: '+Math.round(Math.sin(angleRad)*def.carry*0.42)+'yd',apexX,apexY-10);
if(data.length>1){
ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='9px sans-serif';ctx.textAlign='center';
ctx.fillText('Launch Sessions: '+data.length+' | Club: '+club,310,395);
}
}

// ===== 2. CLUB ROI ANALYZER Canvas 600x380 =====
function showClubROI(){
playSfx('roi_open');
var pn=getPanel('roi');
var data=lsGet('club_roi',[]);
var CLUBS=['Driver','3W','5W','4I','5I','6I','7I','8I','9I','PW','GW','SW','LW','Putter'];
var DEFAULT_PRICES=[500,350,300,180,170,160,150,140,130,140,150,160,180,300];
if(data.length===0){
for(var i=0;i<CLUBS.length;i++){
data.push({club:CLUBS[i],price:DEFAULT_PRICES[i],rounds:0,shots:0,satisfaction:3});
}
lsSet('club_roi',data);
}
var html='<button class="v22-close" onclick="window._v22Close(\'roi\')">&times;</button>';
html+='<div class="v22-title">&#x1F4B0; &#xD074;&#xB7FD; &#xAC00;&#xC131;&#xBE44; &#xBD84;&#xC11D;&#xAE30;</div>';
html+='<canvas id="v22-roi-canvas" width="600" height="380" style="width:100%;max-width:600px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v22-card"><h3>&#xD074;&#xB7FD;&#xBCC4; &#xC0AC;&#xC6A9; &#xB370;&#xC774;&#xD130;</h3>';
html+='<div style="max-height:200px;overflow-y:auto">';
for(var i=0;i<data.length;i++){
var d=data[i];var costPerShot=d.shots>0?(d.price*1000/d.shots).toFixed(0):'--';
html+='<div style="display:grid;grid-template-columns:60px 1fr 1fr 1fr 50px;gap:4px;align-items:center;padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.05);font-size:11px">';
html+='<span style="color:#00FF88;font-weight:bold">'+d.club+'</span>';
html+='<input class="v22-input" type="number" value="'+d.price+'" min="0" max="9999" style="font-size:10px" onchange="window._v22UpdateROI('+i+',\'price\',this.value)" placeholder="&#xB9CC;&#xC6D0;">';
html+='<input class="v22-input" type="number" value="'+d.shots+'" min="0" max="99999" style="font-size:10px" onchange="window._v22UpdateROI('+i+',\'shots\',this.value)" placeholder="&#xD0C0;&#xC218;">';
html+='<span style="color:'+(parseInt(costPerShot)>1000?'#FF6B6B':'#00FF88')+'">&#x20A9;'+costPerShot+'/&#xD0C0;</span>';
html+='<span>'+'⭐'.repeat(d.satisfaction)+'</span>';
html+='</div>';
}
html+='</div></div>';
var totalInvest=0,totalShots=0;for(var i=0;i<data.length;i++){totalInvest+=data[i].price;totalShots+=data[i].shots;}
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v22-stat-card"><div class="v22-stat-val" style="color:#00FF88">'+totalInvest+'</div><div class="v22-stat-label">&#xCD1D;&#xD22C;&#xC790;(&#xB9CC;&#xC6D0;)</div></div>';
html+='<div class="v22-stat-card"><div class="v22-stat-val" style="color:#FFB800">'+totalShots+'</div><div class="v22-stat-label">&#xCD1D; &#xD0C0;&#xC218;</div></div>';
var avgCost=totalShots>0?Math.round(totalInvest*10000/totalShots):0;
html+='<div class="v22-stat-card"><div class="v22-stat-val" style="color:#4ECDC4">'+avgCost+'</div><div class="v22-stat-label">&#xD3C9;&#xADE0; &#xC6D0;/&#xD0C0;</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('roi');drawROICanvas(data);
}
window._v22UpdateROI=function(idx,field,val){
var data=lsGet('club_roi',[]);
if(data[idx]){data[idx][field]=parseInt(val)||0;lsSet('club_roi',data);drawROICanvas(data);}
};
function drawROICanvas(data){
var c=document.getElementById('v22-roi-canvas');if(!c)return;var ctx=c.getContext('2d');
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,600,380);
ctx.fillStyle='#fff';ctx.font='bold 14px sans-serif';ctx.textAlign='center';ctx.fillText('Club Investment ROI - Cost per Shot Analysis',300,22);
var chartL=70,chartR=560,chartT=45,chartB=340;
var maxCost=0;for(var i=0;i<data.length;i++){if(data[i].shots>0){var c2=data[i].price*10000/data[i].shots;if(c2>maxCost)maxCost=c2;}}
if(maxCost===0)maxCost=2000;maxCost=Math.ceil(maxCost/500)*500;
ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.lineWidth=1;
for(var g=0;g<=4;g++){var gy=chartT+(chartB-chartT)*g/4;ctx.beginPath();ctx.moveTo(chartL,gy);ctx.lineTo(chartR,gy);ctx.stroke();ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='9px sans-serif';ctx.textAlign='right';ctx.fillText(Math.round(maxCost*(1-g/4)),chartL-6,gy+3);}
var barW=(chartR-chartL)/data.length*0.7;var gap=(chartR-chartL)/data.length*0.3;
var colors=['#FF3366','#FF6B6B','#FFB800','#FFDD57','#00FF88','#4ECDC4','#00B4D8','#88CCFF','#A855F7','#C084FC','#FF00FF','#34D399','#F59E0B','#6366F1'];
for(var i=0;i<data.length;i++){
var x=chartL+i*(barW+gap)+gap/2;
var costPerShot=data[i].shots>0?data[i].price*10000/data[i].shots:0;
var h=(chartB-chartT)*(costPerShot/maxCost);
ctx.fillStyle=colors[i%colors.length];ctx.globalAlpha=0.7;
ctx.fillRect(x,chartB-h,barW,h);ctx.globalAlpha=1;
ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='8px sans-serif';ctx.textAlign='center';
ctx.save();ctx.translate(x+barW/2,chartB+12);ctx.rotate(-0.5);ctx.fillText(data[i].club,0,0);ctx.restore();
if(costPerShot>0){ctx.fillStyle=colors[i%colors.length];ctx.font='bold 8px sans-serif';ctx.textAlign='center';ctx.fillText(Math.round(costPerShot),x+barW/2,chartB-h-6);}
}
ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='9px sans-serif';ctx.textAlign='center';ctx.fillText('Lower = Better ROI | Price(만원) / Total Shots',300,375);
}

// ===== 3. ROUND TURNAROUND ANALYZER Canvas 620x400 =====
function showTurnaround(){
playSfx('turnaround_open');
var pn=getPanel('turnaround');
var data=lsGet('turnaround_log',[]);
var html='<button class="v22-close" onclick="window._v22Close(\'turnaround\')">&times;</button>';
html+='<div class="v22-title">&#x1F504; &#xB77C;&#xC6B4;&#xB4DC; &#xD134;&#xC5B4;&#xB77C;&#xC6B4;&#xB4DC; &#xBD84;&#xC11D;</div>';
html+='<canvas id="v22-turn-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v22-card"><h3>&#xC804;&#xBC18; vs &#xD6C4;&#xBC18; &#xC2A4;&#xCF54;&#xC5B4; &#xC785;&#xB825;</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">';
html+='<div><label class="v22-label">Front 9</label><input class="v22-input" type="number" id="v22-turn-front" value="45" min="27" max="90"></div>';
html+='<div><label class="v22-label">Back 9</label><input class="v22-input" type="number" id="v22-turn-back" value="47" min="27" max="90"></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:6px">';
html+='<button class="v22-btn v22-btn-primary" onclick="window._v22SaveTurn()">&#xC800;&#xC7A5;</button>';
html+='<button class="v22-btn" onclick="window._v22AnalyzeTurn()">&#xBD84;&#xC11D;</button>';
html+='</div></div>';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
var avgFront=0,avgBack=0,improveCount=0,declineCount=0;
if(data.length>0){for(var i=0;i<data.length;i++){avgFront+=data[i].front;avgBack+=data[i].back;if(data[i].back<data[i].front)improveCount++;else if(data[i].back>data[i].front)declineCount++;}avgFront=Math.round(avgFront/data.length*10)/10;avgBack=Math.round(avgBack/data.length*10)/10;}
html+='<div class="v22-stat-card"><div class="v22-stat-val" style="color:#00FF88">'+data.length+'</div><div class="v22-stat-label">&#xB77C;&#xC6B4;&#xB4DC;</div></div>';
html+='<div class="v22-stat-card"><div class="v22-stat-val" style="color:#4ECDC4">'+avgFront+'</div><div class="v22-stat-label">&#xD3C9;&#xADE0; Front</div></div>';
html+='<div class="v22-stat-card"><div class="v22-stat-val" style="color:#FFB800">'+avgBack+'</div><div class="v22-stat-label">&#xD3C9;&#xADE0; Back</div></div>';
html+='<div class="v22-stat-card"><div class="v22-stat-val" style="color:'+(improveCount>=declineCount?'#00FF88':'#FF6B6B')+'">'+improveCount+'/'+declineCount+'</div><div class="v22-stat-label">&#xAC1C;&#xC120;/&#xD558;&#xB77D;</div></div>';
html+='</div>';
if(data.length>0){html+='<button class="v22-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'&#xCD08;&#xAE30;&#xD654;?\'))window._v22ResetTurn()">&#xCD08;&#xAE30;&#xD654;</button>';}
pn.innerHTML=html;openPanel('turnaround');drawTurnCanvas(data);
}
window._v22SaveTurn=function(){
playSfx('save_v22');
var f=parseInt(document.getElementById('v22-turn-front').value)||45;
var b=parseInt(document.getElementById('v22-turn-back').value)||47;
var data=lsGet('turnaround_log',[]);
data.push({front:f,back:b,total:f+b,diff:b-f,date:todayStr()});
if(data.length>30)data=data.slice(-30);
lsSet('turnaround_log',data);showToast('Round '+f+'/'+b+' = '+(f+b)+' saved');showTurnaround();checkAchievements();
};
window._v22AnalyzeTurn=function(){
var data=lsGet('turnaround_log',[]);
if(data.length<2){showToast('2라운드 이상 필요');return;}
var avgDiff=0;for(var i=0;i<data.length;i++)avgDiff+=data[i].diff;avgDiff/=data.length;
var msg=avgDiff>2?'후반 약화 경향! 체력/멘탈 관리 필요':avgDiff<-2?'후반 강화 패턴! 워밍업 개선 필요':'안정적인 라운드 패턴';
showToast(msg);
};
window._v22ResetTurn=function(){lsSet('turnaround_log',[]);showTurnaround();};
function drawTurnCanvas(data){
var c=document.getElementById('v22-turn-canvas');if(!c)return;var ctx=c.getContext('2d');
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,620,400);
ctx.fillStyle='#fff';ctx.font='bold 14px sans-serif';ctx.textAlign='center';ctx.fillText('Round Turnaround - Front 9 vs Back 9 Trend',310,22);
if(data.length===0){ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='14px sans-serif';ctx.fillText('라운드 데이터를 입력하면 차트가 표시됩니다',310,200);return;}
var chartL=60,chartR=400,chartT=50,chartB=350;
var maxScore=0,minScore=999;for(var i=0;i<data.length;i++){var mx=Math.max(data[i].front,data[i].back);var mn=Math.min(data[i].front,data[i].back);if(mx>maxScore)maxScore=mx;if(mn<minScore)minScore=mn;}
var range=Math.max(maxScore-minScore,10);var yMin=Math.max(27,minScore-5);var yMax=maxScore+5;
ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.lineWidth=1;
for(var g=0;g<=4;g++){var gy=chartT+(chartB-chartT)*g/4;ctx.beginPath();ctx.moveTo(chartL,gy);ctx.lineTo(chartR,gy);ctx.stroke();ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='9px sans-serif';ctx.textAlign='right';ctx.fillText(Math.round(yMax-(yMax-yMin)*g/4),chartL-6,gy+3);}
var step=(chartR-chartL)/Math.max(data.length-1,1);
ctx.strokeStyle='#00FF88';ctx.lineWidth=2;ctx.beginPath();
for(var i=0;i<data.length;i++){var x=chartL+i*step;var y=chartT+(chartB-chartT)*(1-(data[i].front-yMin)/(yMax-yMin));if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}
ctx.stroke();
ctx.strokeStyle='#FF6B6B';ctx.lineWidth=2;ctx.beginPath();
for(var i=0;i<data.length;i++){var x=chartL+i*step;var y=chartT+(chartB-chartT)*(1-(data[i].back-yMin)/(yMax-yMin));if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}
ctx.stroke();
for(var i=0;i<data.length;i++){
var x=chartL+i*step;
var yf=chartT+(chartB-chartT)*(1-(data[i].front-yMin)/(yMax-yMin));
var yb=chartT+(chartB-chartT)*(1-(data[i].back-yMin)/(yMax-yMin));
ctx.beginPath();ctx.arc(x,yf,4,0,Math.PI*2);ctx.fillStyle='#00FF88';ctx.fill();
ctx.beginPath();ctx.arc(x,yb,4,0,Math.PI*2);ctx.fillStyle='#FF6B6B';ctx.fill();
}
ctx.fillStyle='#00FF88';ctx.font='bold 10px sans-serif';ctx.textAlign='left';ctx.fillText('● Front 9',chartR+20,chartT+20);
ctx.fillStyle='#FF6B6B';ctx.fillText('● Back 9',chartR+20,chartT+40);
var pieX=510,pieY=250,pieR=80;
var frontBetter=0,backBetter=0,tie=0;
for(var i=0;i<data.length;i++){if(data[i].front<data[i].back)frontBetter++;else if(data[i].back<data[i].front)backBetter++;else tie++;}
var total=data.length;var slices=[{v:frontBetter,c:'#00FF88',l:'Front Win'},{v:backBetter,c:'#FF6B6B',l:'Back Win'},{v:tie,c:'#FFB800',l:'Tie'}];
var startA=-Math.PI/2;
for(var s=0;s<slices.length;s++){if(slices[s].v===0)continue;var endA=startA+Math.PI*2*(slices[s].v/total);ctx.beginPath();ctx.moveTo(pieX,pieY);ctx.arc(pieX,pieY,pieR,startA,endA);ctx.fillStyle=slices[s].c;ctx.globalAlpha=0.6;ctx.fill();ctx.globalAlpha=1;
var midA=(startA+endA)/2;var tx=pieX+Math.cos(midA)*(pieR*0.65);var ty=pieY+Math.sin(midA)*(pieR*0.65);
ctx.fillStyle='#fff';ctx.font='bold 10px sans-serif';ctx.textAlign='center';ctx.fillText(slices[s].l,tx,ty);ctx.fillText(Math.round(slices[s].v/total*100)+'%',tx,ty+12);
startA=endA;
}
ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='9px sans-serif';ctx.textAlign='center';ctx.fillText(data.length+' Rounds Analyzed | Front Avg: '+Math.round(data.reduce(function(s,d){return s+d.front},0)/data.length)+' | Back Avg: '+Math.round(data.reduce(function(s,d){return s+d.back},0)/data.length),310,395);
}

// ===== 4. FAIRWAY HITTING ZONE Canvas 620x380 =====
function showFairwayZone(){
playSfx('fwzone_open');
var pn=getPanel('fwzone');
var data=lsGet('fwzone_log',[]);
var ZONES=['Left Rough','Left Semi','Fairway Left','Center','Fairway Right','Right Semi','Right Rough'];
var ZONE_COLORS=['#FF3366','#FF6B6B','#FFB800','#00FF88','#FFB800','#FF6B6B','#FF3366'];
var html='<button class="v22-close" onclick="window._v22Close(\'fwzone\')">&times;</button>';
html+='<div class="v22-title">&#x1F3CC; &#xD398;&#xC5B4;&#xC6E8;&#xC774; &#xD788;&#xD305;&#xC874; &#xC2DC;&#xAC01;&#xD654;</div>';
html+='<canvas id="v22-fwzone-canvas" width="620" height="380" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v22-card"><h3>&#xD2F0;&#xC0F7; &#xCC29;&#xC9C0;&#xC810; &#xAE30;&#xB85D;</h3>';
html+='<div style="display:flex;flex-wrap:wrap;gap:4px;margin:6px 0">';
for(var i=0;i<ZONES.length;i++){
html+='<button class="v22-btn v22-btn-sm" style="border-color:'+ZONE_COLORS[i]+';color:'+ZONE_COLORS[i]+'" onclick="window._v22AddFWZone('+i+')">'+ZONES[i]+'</button>';
}
html+='</div></div>';
var counts=new Array(7);for(var i=0;i<7;i++)counts[i]=0;
for(var i=0;i<data.length;i++)counts[data[i].zone]++;
var fir=data.length>0?Math.round((counts[2]+counts[3]+counts[4])/data.length*100):0;
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v22-stat-card"><div class="v22-stat-val" style="color:#00FF88">'+data.length+'</div><div class="v22-stat-label">&#xCD1D; &#xC0F7;</div></div>';
html+='<div class="v22-stat-card"><div class="v22-stat-val" style="color:#4ECDC4">'+fir+'%</div><div class="v22-stat-label">FIR</div></div>';
var leftMiss=counts[0]+counts[1],rightMiss=counts[5]+counts[6];
html+='<div class="v22-stat-card"><div class="v22-stat-val" style="color:#FF6B6B">'+leftMiss+'</div><div class="v22-stat-label">&#xC88C; &#xBBF8;&#xC2A4;</div></div>';
html+='<div class="v22-stat-card"><div class="v22-stat-val" style="color:#FFB800">'+rightMiss+'</div><div class="v22-stat-label">&#xC6B0; &#xBBF8;&#xC2A4;</div></div>';
html+='</div>';
if(data.length>0){html+='<button class="v22-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'&#xCD08;&#xAE30;&#xD654;?\'))window._v22ResetFWZone()">&#xCD08;&#xAE30;&#xD654;</button>';}
pn.innerHTML=html;openPanel('fwzone');drawFWZoneCanvas(counts,ZONES,ZONE_COLORS,data.length);
}
window._v22AddFWZone=function(zone){
playSfx('lagputt_hit');
var data=lsGet('fwzone_log',[]);
data.push({zone:zone,date:todayStr()});
if(data.length>200)data=data.slice(-200);
lsSet('fwzone_log',data);
showToast(zone+' zone recorded');showFairwayZone();checkAchievements();
};
window._v22ResetFWZone=function(){lsSet('fwzone_log',[]);showFairwayZone();};
function drawFWZoneCanvas(counts,zones,colors,total){
var c=document.getElementById('v22-fwzone-canvas');if(!c)return;var ctx=c.getContext('2d');
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,620,380);
ctx.fillStyle='#fff';ctx.font='bold 14px sans-serif';ctx.textAlign='center';ctx.fillText('Fairway Hitting Zone Distribution',310,22);
if(total===0){ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='14px sans-serif';ctx.fillText('티샷 착지점을 기록하면 분포도가 표시됩니다',310,190);return;}
var fwTop=50,fwBot=300,fwLeft=80,fwRight=540;
ctx.fillStyle='#1a3a1a';ctx.fillRect(fwLeft,fwTop,fwRight-fwLeft,fwBot-fwTop);
var zoneW=(fwRight-fwLeft)/7;
for(var i=0;i<7;i++){
var x=fwLeft+i*zoneW;
var pct=total>0?counts[i]/total:0;
if(i>=2&&i<=4){ctx.fillStyle='rgba(0,255,136,0.08)';}else if(i===1||i===5){ctx.fillStyle='rgba(255,183,0,0.08)';}else{ctx.fillStyle='rgba(255,51,102,0.08)';}
ctx.fillRect(x,fwTop,zoneW,fwBot-fwTop);
ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.lineWidth=1;ctx.strokeRect(x,fwTop,zoneW,fwBot-fwTop);
var barH=(fwBot-fwTop-40)*pct;
ctx.fillStyle=colors[i];ctx.globalAlpha=0.6;
ctx.fillRect(x+zoneW*0.15,fwBot-20-barH,zoneW*0.7,barH);ctx.globalAlpha=1;
ctx.fillStyle=colors[i];ctx.font='bold 16px sans-serif';ctx.textAlign='center';
ctx.fillText(counts[i],x+zoneW/2,fwBot-26-barH);
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='8px sans-serif';
ctx.save();ctx.translate(x+zoneW/2,fwBot+12);ctx.fillText(zones[i],0,0);ctx.restore();
ctx.fillText(total>0?Math.round(pct*100)+'%':'0%',x+zoneW/2,fwBot-8);
}
var tendIdx=0,maxC=0;for(var i=0;i<7;i++)if(counts[i]>maxC){maxC=counts[i];tendIdx=i;}
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='11px sans-serif';ctx.textAlign='center';
var tendency=tendIdx<=1?'Left Miss Tendency':tendIdx>=5?'Right Miss Tendency':'Center Hitting';
var tendColor=tendIdx<=1?'#FF6B6B':tendIdx>=5?'#FFB800':'#00FF88';
ctx.fillStyle=tendColor;ctx.font='bold 12px sans-serif';ctx.fillText(tendency,310,330);
ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='9px sans-serif';
ctx.fillText(total+' Tee Shots | FIR: '+Math.round((counts[2]+counts[3]+counts[4])/total*100)+'%',310,375);
}

// ===== 5. LAG PUTT DISTANCE CONTROL Canvas 600x380 =====
function showLagPutt(){
playSfx('lagputt_open');
var pn=getPanel('lagputt');
var data=lsGet('lagputt_log',[]);
var TARGETS=[10,15,20,25,30,40,50,60];
var html='<button class="v22-close" onclick="window._v22Close(\'lagputt\')">&times;</button>';
html+='<div class="v22-title">&#x26F3; &#xD37C;&#xD305; &#xAC70;&#xB9AC; &#xCEE8;&#xD2B8;&#xB864; &#xD2B8;&#xB808;&#xC774;&#xB108;</div>';
html+='<canvas id="v22-lagputt-canvas" width="600" height="380" style="width:100%;max-width:600px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v22-card"><h3>&#xB7A9; &#xD37C;&#xD305; &#xC5F0;&#xC2B5;</h3>';
html+='<p style="font-size:11px;color:rgba(255,255,255,0.5);margin-bottom:6px">&#xBAA9;&#xD45C; &#xAC70;&#xB9AC;&#xC640; &#xC2E4;&#xC81C; &#xAC70;&#xB9AC;&#xB97C; &#xC785;&#xB825;&#xD558;&#xC138;&#xC694;</p>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">';
html+='<div><label class="v22-label">Target (ft)</label><select class="v22-input" id="v22-lag-target">';
for(var i=0;i<TARGETS.length;i++)html+='<option value="'+TARGETS[i]+'">'+TARGETS[i]+' ft</option>';
html+='</select></div>';
html+='<div><label class="v22-label">Actual (ft)</label><input class="v22-input" type="number" id="v22-lag-actual" value="10" min="0" max="100" step="0.5"></div>';
html+='</div>';
html+='<button class="v22-btn v22-btn-primary" style="width:100%;margin-top:6px" onclick="window._v22SaveLag()">&#xAE30;&#xB85D;</button>';
html+='</div>';
var avgError=0,bestError=999;
if(data.length>0){for(var i=0;i<data.length;i++){var err=Math.abs(data[i].actual-data[i].target);avgError+=err;if(err<bestError)bestError=err;}avgError=Math.round(avgError/data.length*10)/10;}else{bestError=0;}
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v22-stat-card"><div class="v22-stat-val" style="color:#00FF88">'+data.length+'</div><div class="v22-stat-label">&#xC5F0;&#xC2B5;</div></div>';
html+='<div class="v22-stat-card"><div class="v22-stat-val" style="color:#FFB800">'+avgError+'ft</div><div class="v22-stat-label">&#xD3C9;&#xADE0; &#xC624;&#xCC28;</div></div>';
html+='<div class="v22-stat-card"><div class="v22-stat-val" style="color:#4ECDC4">'+bestError+'ft</div><div class="v22-stat-label">&#xCD5C;&#xC18C; &#xC624;&#xCC28;</div></div>';
var within3=0;for(var i=0;i<data.length;i++)if(Math.abs(data[i].actual-data[i].target)<=3)within3++;
html+='<div class="v22-stat-card"><div class="v22-stat-val" style="color:#A855F7">'+(data.length>0?Math.round(within3/data.length*100):0)+'%</div><div class="v22-stat-label">3ft &#xC774;&#xB0B4;</div></div>';
html+='</div>';
if(data.length>0){html+='<button class="v22-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'&#xCD08;&#xAE30;&#xD654;?\'))window._v22ResetLag()">&#xCD08;&#xAE30;&#xD654;</button>';}
pn.innerHTML=html;openPanel('lagputt');drawLagPuttCanvas(data,TARGETS);
}
window._v22SaveLag=function(){
playSfx('lagputt_hit');
var target=parseInt(document.getElementById('v22-lag-target').value)||20;
var actual=parseFloat(document.getElementById('v22-lag-actual').value)||20;
var data=lsGet('lagputt_log',[]);
data.push({target:target,actual:actual,error:Math.abs(actual-target),date:todayStr()});
if(data.length>100)data=data.slice(-100);
lsSet('lagputt_log',data);showToast('Error: '+Math.abs(actual-target).toFixed(1)+'ft');showLagPutt();checkAchievements();
};
window._v22ResetLag=function(){lsSet('lagputt_log',[]);showLagPutt();};
function drawLagPuttCanvas(data,targets){
var c=document.getElementById('v22-lagputt-canvas');if(!c)return;var ctx=c.getContext('2d');
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,600,380);
ctx.fillStyle='#fff';ctx.font='bold 14px sans-serif';ctx.textAlign='center';ctx.fillText('Lag Putt Distance Control - Error Analysis',300,22);
if(data.length===0){ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='14px sans-serif';ctx.fillText('연습 데이터를 입력하면 분석 차트가 표시됩니다',300,190);return;}
var chartL=60,chartR=380,chartT=50,chartB=330;
var grouped={};for(var i=0;i<targets.length;i++)grouped[targets[i]]=[];
for(var i=0;i<data.length;i++){var t=data[i].target;if(grouped[t])grouped[t].push(data[i].error);}
var maxErr=0;for(var k in grouped){for(var j=0;j<grouped[k].length;j++)if(grouped[k][j]>maxErr)maxErr=grouped[k][j];}
if(maxErr===0)maxErr=10;maxErr=Math.ceil(maxErr/5)*5;
ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.lineWidth=1;
for(var g=0;g<=4;g++){var gy=chartT+(chartB-chartT)*g/4;ctx.beginPath();ctx.moveTo(chartL,gy);ctx.lineTo(chartR,gy);ctx.stroke();ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='9px sans-serif';ctx.textAlign='right';ctx.fillText(Math.round(maxErr*(1-g/4))+'ft',chartL-6,gy+3);}
var barW=(chartR-chartL)/targets.length*0.7;var gap=(chartR-chartL)/targets.length*0.3;
var colors=['#00FF88','#4ECDC4','#00B4D8','#88CCFF','#FFB800','#FF6B6B','#A855F7','#FF3366'];
for(var i=0;i<targets.length;i++){
var x=chartL+i*(barW+gap)+gap/2;
var errs=grouped[targets[i]];var avgErr=0;if(errs.length>0){for(var j=0;j<errs.length;j++)avgErr+=errs[j];avgErr/=errs.length;}
var h=(chartB-chartT)*(avgErr/maxErr);
ctx.fillStyle=colors[i];ctx.globalAlpha=0.7;ctx.fillRect(x,chartB-h,barW,h);ctx.globalAlpha=1;
ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='9px sans-serif';ctx.textAlign='center';
ctx.fillText(targets[i]+'ft',x+barW/2,chartB+14);
if(avgErr>0){ctx.fillStyle=colors[i];ctx.font='bold 9px sans-serif';ctx.fillText(avgErr.toFixed(1),x+barW/2,chartB-h-6);}
}
var radarX=490,radarY=200,radarR=100;
ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.lineWidth=1;
for(var r=1;r<=4;r++){ctx.beginPath();ctx.arc(radarX,radarY,radarR*r/4,0,Math.PI*2);ctx.stroke();}
var tUsed=[];for(var i=0;i<targets.length;i++)if(grouped[targets[i]].length>0)tUsed.push(targets[i]);
if(tUsed.length>=3){
ctx.beginPath();
for(var i=0;i<tUsed.length;i++){
var a=-Math.PI/2+Math.PI*2*i/tUsed.length;
var errs=grouped[tUsed[i]];var avg=0;for(var j=0;j<errs.length;j++)avg+=errs[j];avg/=errs.length;
var val=Math.min(avg/maxErr,1);
var px=radarX+Math.cos(a)*radarR*val;var py=radarY+Math.sin(a)*radarR*val;
if(i===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='8px sans-serif';ctx.textAlign='center';
var lx=radarX+Math.cos(a)*(radarR+14);var ly=radarY+Math.sin(a)*(radarR+14);
ctx.fillText(tUsed[i]+'ft',lx,ly+3);
}
ctx.closePath();ctx.fillStyle='rgba(78,205,196,0.15)';ctx.fill();ctx.strokeStyle='rgba(78,205,196,0.6)';ctx.lineWidth=2;ctx.stroke();
}
ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='9px sans-serif';ctx.textAlign='center';ctx.fillText(data.length+' Putts | Avg Error: '+(data.reduce(function(s,d){return s+d.error},0)/data.length).toFixed(1)+'ft',300,375);
}

// ===== 6. SEASON ROADMAP PLANNER Canvas 620x400 =====
function showSeasonRoadmap(){
playSfx('season_open');
var pn=getPanel('season');
var data=lsGet('season_plan',{goals:[],milestones:[]});
var MONTHS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var CATEGORIES=[{name:'Rounds',color:'#00FF88'},{name:'Practice',color:'#FFB800'},{name:'Fitness',color:'#4ECDC4'},{name:'Handicap',color:'#A855F7'},{name:'Tournament',color:'#FF3366'},{name:'Equipment',color:'#00B4D8'}];
var html='<button class="v22-close" onclick="window._v22Close(\'season\')">&times;</button>';
html+='<div class="v22-title">&#x1F4C5; &#xACE8;&#xD504; &#xC2DC;&#xC98C; &#xB85C;&#xB4DC;&#xB9F5; &#xD50C;&#xB798;&#xB108;</div>';
html+='<canvas id="v22-season-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v22-card"><h3>&#xBAA9;&#xD45C; &#xCD94;&#xAC00;</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px">';
html+='<div><label class="v22-label">Month</label><select class="v22-input" id="v22-season-month">';
for(var i=0;i<12;i++)html+='<option value="'+i+'">'+MONTHS[i]+'</option>';
html+='</select></div>';
html+='<div><label class="v22-label">Category</label><select class="v22-input" id="v22-season-cat">';
for(var i=0;i<CATEGORIES.length;i++)html+='<option value="'+i+'">'+CATEGORIES[i].name+'</option>';
html+='</select></div>';
html+='<div><label class="v22-label">Goal</label><input class="v22-input" type="text" id="v22-season-goal" placeholder="&#xBAA9;&#xD45C;" maxlength="30"></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:6px">';
html+='<button class="v22-btn v22-btn-primary" onclick="window._v22AddGoal()">&#xCD94;&#xAC00;</button>';
html+='<button class="v22-btn" onclick="window._v22AddMilestone()">&#xB9C8;&#xC77C;&#xC2A4;&#xD1A4;</button>';
html+='</div></div>';
var completed=0;for(var i=0;i<data.goals.length;i++)if(data.goals[i].done)completed++;
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v22-stat-card"><div class="v22-stat-val" style="color:#00FF88">'+data.goals.length+'</div><div class="v22-stat-label">&#xBAA9;&#xD45C;</div></div>';
html+='<div class="v22-stat-card"><div class="v22-stat-val" style="color:#FFB800">'+completed+'</div><div class="v22-stat-label">&#xC644;&#xB8CC;</div></div>';
html+='<div class="v22-stat-card"><div class="v22-stat-val" style="color:#4ECDC4">'+(data.goals.length>0?Math.round(completed/data.goals.length*100):0)+'%</div><div class="v22-stat-label">&#xB2EC;&#xC131;&#xB960;</div></div>';
html+='</div>';
if(data.goals.length>0){
html+='<div class="v22-card"><h3>&#xBAA9;&#xD45C; &#xBAA9;&#xB85D;</h3><div style="max-height:150px;overflow-y:auto">';
for(var i=0;i<data.goals.length;i++){
var g=data.goals[i];
html+='<div style="display:flex;justify-content:space-between;align-items:center;padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.05);font-size:11px"><span style="color:'+CATEGORIES[g.cat].color+'">['+MONTHS[g.month]+'] '+g.text+'</span><button class="v22-btn v22-btn-sm" onclick="window._v22ToggleGoal('+i+')">'+(g.done?'✅':'⬜')+'</button></div>';
}
html+='</div></div>';
html+='<button class="v22-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'&#xCD08;&#xAE30;&#xD654;?\'))window._v22ResetSeason()">&#xCD08;&#xAE30;&#xD654;</button>';
}
pn.innerHTML=html;openPanel('season');drawSeasonCanvas(data,MONTHS,CATEGORIES);
}
window._v22AddGoal=function(){
playSfx('save_v22');
var month=parseInt(document.getElementById('v22-season-month').value);
var cat=parseInt(document.getElementById('v22-season-cat').value);
var text=document.getElementById('v22-season-goal').value.trim();
if(!text){showToast('목표를 입력하세요');return;}
var data=lsGet('season_plan',{goals:[],milestones:[]});
data.goals.push({month:month,cat:cat,text:text,done:false});
lsSet('season_plan',data);showToast('Goal added');showSeasonRoadmap();checkAchievements();
};
window._v22AddMilestone=function(){
playSfx('save_v22');
var month=parseInt(document.getElementById('v22-season-month').value);
var text=document.getElementById('v22-season-goal').value.trim()||'Milestone';
var data=lsGet('season_plan',{goals:[],milestones:[]});
data.milestones.push({month:month,text:text});
lsSet('season_plan',data);showToast('Milestone added');showSeasonRoadmap();
};
window._v22ToggleGoal=function(idx){
var data=lsGet('season_plan',{goals:[],milestones:[]});
if(data.goals[idx]){data.goals[idx].done=!data.goals[idx].done;lsSet('season_plan',data);showSeasonRoadmap();checkAchievements();}
};
window._v22ResetSeason=function(){lsSet('season_plan',{goals:[],milestones:[]});showSeasonRoadmap();};
function drawSeasonCanvas(data,months,categories){
var c=document.getElementById('v22-season-canvas');if(!c)return;var ctx=c.getContext('2d');
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,620,400);
ctx.fillStyle='#fff';ctx.font='bold 14px sans-serif';ctx.textAlign='center';ctx.fillText('Golf Season Roadmap - Monthly Goal Tracker',310,22);
var chartL=50,chartR=590,chartT=50,chartB=340;
var colW=(chartR-chartL)/12;
for(var m=0;m<12;m++){
var x=chartL+m*colW;
ctx.fillStyle=m%2===0?'rgba(255,255,255,0.02)':'rgba(255,255,255,0.04)';
ctx.fillRect(x,chartT,colW,chartB-chartT);
ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.strokeRect(x,chartT,colW,chartB-chartT);
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='bold 10px sans-serif';ctx.textAlign='center';
ctx.fillText(months[m],x+colW/2,chartT-6);
}
var goalsPerMonth=new Array(12);for(var i=0;i<12;i++)goalsPerMonth[i]=[];
for(var i=0;i<data.goals.length;i++){goalsPerMonth[data.goals[i].month].push(data.goals[i]);}
for(var m=0;m<12;m++){
var gls=goalsPerMonth[m];var x=chartL+m*colW;
for(var g=0;g<Math.min(gls.length,5);g++){
var y=chartT+10+g*58;
var cat=categories[gls[g].cat];
ctx.fillStyle=gls[g].done?'rgba(0,255,136,0.15)':'rgba(255,255,255,0.04)';
ctx.fillRect(x+3,y,colW-6,50);
ctx.strokeStyle=gls[g].done?'rgba(0,255,136,0.3)':cat.color+'40';ctx.lineWidth=1;ctx.strokeRect(x+3,y,colW-6,50);
ctx.fillStyle=cat.color;ctx.font='bold 8px sans-serif';ctx.textAlign='center';
ctx.fillText(cat.name,x+colW/2,y+14);
ctx.fillStyle='rgba(255,255,255,0.7)';ctx.font='8px sans-serif';
var words=gls[g].text.split('');var line='';var lineY=y+26;
for(var w=0;w<Math.min(words.length,12);w++){line+=words[w];}
ctx.fillText(line.substring(0,8),x+colW/2,lineY);
if(gls[g].done){ctx.fillStyle='#00FF88';ctx.font='14px sans-serif';ctx.fillText('✓',x+colW/2,y+44);}
}
}
for(var i=0;i<data.milestones.length;i++){
var ms=data.milestones[i];
var x=chartL+ms.month*colW+colW/2;
ctx.fillStyle='#FF3366';ctx.beginPath();ctx.moveTo(x,chartB+5);ctx.lineTo(x-5,chartB+15);ctx.lineTo(x+5,chartB+15);ctx.fill();
ctx.fillStyle='rgba(255,51,102,0.7)';ctx.font='8px sans-serif';ctx.textAlign='center';
ctx.fillText(ms.text.substring(0,6),x,chartB+26);
}
ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='9px sans-serif';ctx.textAlign='center';
ctx.fillText(data.goals.length+' Goals | '+data.milestones.length+' Milestones',310,395);
}

// ===== 7. SHOT CLUSTER ANALYZER Canvas 600x380 =====
function showShotCluster(){
playSfx('cluster_open');
var pn=getPanel('cluster');
var data=lsGet('cluster_log',[]);
var CLUBS=['Driver','3W','5I','7I','9I','PW','SW'];
var html='<button class="v22-close" onclick="window._v22Close(\'cluster\')">&times;</button>';
html+='<div class="v22-title">&#x1F4CA; &#xC0F7; &#xD074;&#xB7EC;&#xC2A4;&#xD130; &#xBD84;&#xC11D;&#xAE30;</div>';
html+='<canvas id="v22-cluster-canvas" width="600" height="380" style="width:100%;max-width:600px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v22-card"><h3>&#xC0F7; &#xB370;&#xC774;&#xD130; &#xC785;&#xB825;</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px">';
html+='<div><label class="v22-label">Club</label><select class="v22-input" id="v22-cl-club">';
for(var i=0;i<CLUBS.length;i++)html+='<option>'+CLUBS[i]+'</option>';
html+='</select></div>';
html+='<div><label class="v22-label">Distance (yd)</label><input class="v22-input" type="number" id="v22-cl-dist" value="150" min="10" max="350"></div>';
html+='<div><label class="v22-label">Offline (yd)</label><input class="v22-input" type="number" id="v22-cl-off" value="0" min="-50" max="50"></div>';
html+='</div>';
html+='<button class="v22-btn v22-btn-primary" style="width:100%;margin-top:6px" onclick="window._v22AddCluster()">&#xAE30;&#xB85D;</button>';
html+='</div>';
var totalShots=data.length;var avgDist=0,avgOff=0;
if(totalShots>0){for(var i=0;i<data.length;i++){avgDist+=data[i].dist;avgOff+=Math.abs(data[i].off);}avgDist=Math.round(avgDist/totalShots);avgOff=Math.round(avgOff/totalShots*10)/10;}
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v22-stat-card"><div class="v22-stat-val" style="color:#00FF88">'+totalShots+'</div><div class="v22-stat-label">&#xCD1D; &#xC0F7;</div></div>';
html+='<div class="v22-stat-card"><div class="v22-stat-val" style="color:#FFB800">'+avgDist+'</div><div class="v22-stat-label">&#xD3C9;&#xADE0; &#xAC70;&#xB9AC;</div></div>';
html+='<div class="v22-stat-card"><div class="v22-stat-val" style="color:#4ECDC4">'+avgOff+'</div><div class="v22-stat-label">&#xD3C9;&#xADE0; &#xD3B8;&#xCC28;</div></div>';
var stdDev=0;if(totalShots>1){var mean=avgDist;for(var i=0;i<data.length;i++)stdDev+=Math.pow(data[i].dist-mean,2);stdDev=Math.round(Math.sqrt(stdDev/(totalShots-1))*10)/10;}
html+='<div class="v22-stat-card"><div class="v22-stat-val" style="color:#A855F7">'+stdDev+'</div><div class="v22-stat-label">&#xD45C;&#xC900;&#xD3B8;&#xCC28;</div></div>';
html+='</div>';
if(data.length>0){html+='<button class="v22-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'&#xCD08;&#xAE30;&#xD654;?\'))window._v22ResetCluster()">&#xCD08;&#xAE30;&#xD654;</button>';}
pn.innerHTML=html;openPanel('cluster');drawClusterCanvas(data);
}
window._v22AddCluster=function(){
playSfx('lagputt_hit');
var club=document.getElementById('v22-cl-club').value;
var dist=parseInt(document.getElementById('v22-cl-dist').value)||150;
var off=parseInt(document.getElementById('v22-cl-off').value)||0;
var data=lsGet('cluster_log',[]);
data.push({club:club,dist:dist,off:off,date:todayStr()});
if(data.length>200)data=data.slice(-200);
lsSet('cluster_log',data);showToast(club+': '+dist+'yd, '+off+'yd off');showShotCluster();checkAchievements();
};
window._v22ResetCluster=function(){lsSet('cluster_log',[]);showShotCluster();};
function drawClusterCanvas(data){
var c=document.getElementById('v22-cluster-canvas');if(!c)return;var ctx=c.getContext('2d');
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,600,380);
ctx.fillStyle='#fff';ctx.font='bold 14px sans-serif';ctx.textAlign='center';ctx.fillText('Shot Cluster Analysis - Dispersion & Grouping',300,22);
if(data.length===0){ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='14px sans-serif';ctx.fillText('샷 데이터를 입력하면 클러스터 분석이 표시됩니다',300,190);return;}
var cx=300,cy=200,scale=2;
ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.lineWidth=1;
for(var r=20;r<=100;r+=20){ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.stroke();}
ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.beginPath();ctx.moveTo(cx-120,cy);ctx.lineTo(cx+120,cy);ctx.stroke();
ctx.beginPath();ctx.moveTo(cx,cy-120);ctx.lineTo(cx,cy+120);ctx.stroke();
ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='8px sans-serif';
ctx.fillText('Short',cx,cy+135);ctx.fillText('Long',cx,cy-125);ctx.fillText('Left',cx-130,cy+3);ctx.fillText('Right',cx+130,cy+3);
var avgDist=0,avgOff=0;for(var i=0;i<data.length;i++){avgDist+=data[i].dist;avgOff+=data[i].off;}avgDist/=data.length;avgOff/=data.length;
var clubColors={Driver:'#FF3366','3W':'#FFB800','5I':'#00FF88','7I':'#4ECDC4','9I':'#00B4D8',PW:'#A855F7',SW:'#FF00FF'};
for(var i=0;i<data.length;i++){
var dx=(data[i].off-avgOff)*scale;
var dy=-(data[i].dist-avgDist)*scale;
var col=clubColors[data[i].club]||'#88CCFF';
ctx.beginPath();ctx.arc(cx+dx,cy+dy,5,0,Math.PI*2);
ctx.fillStyle=col;ctx.globalAlpha=0.6;ctx.fill();ctx.globalAlpha=1;
}
ctx.beginPath();ctx.arc(cx,cy,4,0,Math.PI*2);ctx.fillStyle='#FFB800';ctx.fill();
ctx.strokeStyle='#FFB800';ctx.lineWidth=1;ctx.stroke();
var legend=['Driver','3W','5I','7I','9I','PW','SW'];var lColors=['#FF3366','#FFB800','#00FF88','#4ECDC4','#00B4D8','#A855F7','#FF00FF'];
for(var i=0;i<legend.length;i++){
ctx.fillStyle=lColors[i];ctx.font='9px sans-serif';ctx.textAlign='left';
ctx.beginPath();ctx.arc(460,50+i*18,4,0,Math.PI*2);ctx.fill();
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.fillText(legend[i],470,53+i*18);
}
ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='9px sans-serif';ctx.textAlign='center';
ctx.fillText(data.length+' Shots | Avg Dist: '+Math.round(avgDist)+'yd | Avg Offline: '+Math.round(avgOff*10)/10+'yd',300,375);
}

// ===== 8. COURSE RATING COMPARISON Canvas 620x400 =====
function showCourseRating(){
playSfx('rating_open');
var pn=getPanel('rating');
var data=lsGet('course_ratings',[]);
var SAMPLE_COURSES=[
{name:'남서울CC',rating:72.1,slope:131,par:72},{name:'블랙스톤GC',rating:73.5,slope:138,par:72},
{name:'안양CC',rating:71.3,slope:128,par:72},{name:'곤지암CC',rating:72.8,slope:134,par:72},
{name:'잭니클라우스GC',rating:74.2,slope:142,par:72},{name:'파인크리크CC',rating:71.8,slope:130,par:72},
{name:'힐데스하임CC',rating:73.0,slope:136,par:72},{name:'레이크사이드CC',rating:72.5,slope:132,par:72}
];
if(data.length===0){data=SAMPLE_COURSES;lsSet('course_ratings',data);}
var html='<button class="v22-close" onclick="window._v22Close(\'rating\')">&times;</button>';
html+='<div class="v22-title">&#x1F3CC; &#xCF54;&#xC2A4; &#xB808;&#xC774;&#xD305; &#xBE44;&#xAD50; &#xCC28;&#xD2B8;</div>';
html+='<canvas id="v22-rating-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v22-card"><h3>&#xCF54;&#xC2A4; &#xCD94;&#xAC00;</h3>';
html+='<div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:6px">';
html+='<div><label class="v22-label">Course Name</label><input class="v22-input" type="text" id="v22-rt-name" placeholder="&#xCF54;&#xC2A4;&#xBA85;" maxlength="20"></div>';
html+='<div><label class="v22-label">Rating</label><input class="v22-input" type="number" id="v22-rt-rating" value="72.0" min="60" max="80" step="0.1"></div>';
html+='<div><label class="v22-label">Slope</label><input class="v22-input" type="number" id="v22-rt-slope" value="130" min="55" max="155"></div>';
html+='</div>';
html+='<button class="v22-btn v22-btn-primary" style="width:100%;margin-top:6px" onclick="window._v22AddCourse()">&#xCD94;&#xAC00;</button>';
html+='</div>';
var avgRating=0,avgSlope=0,hardest='',easiest='',maxSlope=0,minSlope=999;
for(var i=0;i<data.length;i++){avgRating+=data[i].rating;avgSlope+=data[i].slope;if(data[i].slope>maxSlope){maxSlope=data[i].slope;hardest=data[i].name;}if(data[i].slope<minSlope){minSlope=data[i].slope;easiest=data[i].name;}}
if(data.length>0){avgRating=Math.round(avgRating/data.length*10)/10;avgSlope=Math.round(avgSlope/data.length);}
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v22-stat-card"><div class="v22-stat-val" style="color:#00FF88">'+data.length+'</div><div class="v22-stat-label">&#xCF54;&#xC2A4;</div></div>';
html+='<div class="v22-stat-card"><div class="v22-stat-val" style="color:#FFB800">'+avgRating+'</div><div class="v22-stat-label">&#xD3C9;&#xADE0; Rating</div></div>';
html+='<div class="v22-stat-card"><div class="v22-stat-val" style="color:#4ECDC4">'+avgSlope+'</div><div class="v22-stat-label">&#xD3C9;&#xADE0; Slope</div></div>';
html+='<div class="v22-stat-card"><div class="v22-stat-val" style="color:#FF3366;font-size:12px">'+hardest.substring(0,6)+'</div><div class="v22-stat-label">&#xCD5C;&#xB09C;&#xCF54;&#xC2A4;</div></div>';
html+='</div>';
if(data.length>0){html+='<button class="v22-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'&#xCD08;&#xAE30;&#xD654;?\'))window._v22ResetRating()">&#xCD08;&#xAE30;&#xD654;</button>';}
pn.innerHTML=html;openPanel('rating');drawRatingCanvas(data);
}
window._v22AddCourse=function(){
playSfx('save_v22');
var name=document.getElementById('v22-rt-name').value.trim();
var rating=parseFloat(document.getElementById('v22-rt-rating').value)||72;
var slope=parseInt(document.getElementById('v22-rt-slope').value)||130;
if(!name){showToast('코스명을 입력하세요');return;}
var data=lsGet('course_ratings',[]);
data.push({name:name,rating:rating,slope:slope,par:72});
if(data.length>20)data=data.slice(-20);
lsSet('course_ratings',data);showToast(name+' added');showCourseRating();checkAchievements();
};
window._v22ResetRating=function(){lsSet('course_ratings',[]);showCourseRating();};
function drawRatingCanvas(data){
var c=document.getElementById('v22-rating-canvas');if(!c)return;var ctx=c.getContext('2d');
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,620,400);
ctx.fillStyle='#fff';ctx.font='bold 14px sans-serif';ctx.textAlign='center';ctx.fillText('Course Rating vs Slope - Difficulty Comparison',310,22);
if(data.length===0){ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='14px sans-serif';ctx.fillText('코스 데이터를 추가하면 비교 차트가 표시됩니다',310,200);return;}
var chartL=70,chartR=580,chartT=50,chartB=350;
var minR=999,maxR=0,minS=999,maxS=0;
for(var i=0;i<data.length;i++){if(data[i].rating<minR)minR=data[i].rating;if(data[i].rating>maxR)maxR=data[i].rating;if(data[i].slope<minS)minS=data[i].slope;if(data[i].slope>maxS)maxS=data[i].slope;}
minR=Math.floor(minR-1);maxR=Math.ceil(maxR+1);minS=Math.floor((minS-5)/5)*5;maxS=Math.ceil((maxS+5)/5)*5;
ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.lineWidth=1;
for(var g=0;g<=4;g++){
var gy=chartT+(chartB-chartT)*g/4;ctx.beginPath();ctx.moveTo(chartL,gy);ctx.lineTo(chartR,gy);ctx.stroke();
ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='9px sans-serif';ctx.textAlign='right';
ctx.fillText(Math.round(maxS-(maxS-minS)*g/4),chartL-6,gy+3);
var gx=chartL+(chartR-chartL)*g/4;ctx.beginPath();ctx.moveTo(gx,chartT);ctx.lineTo(gx,chartB);ctx.stroke();
ctx.textAlign='center';ctx.fillText((minR+(maxR-minR)*g/4).toFixed(1),gx,chartB+14);
}
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='10px sans-serif';ctx.textAlign='center';ctx.fillText('Course Rating',310,chartB+30);
ctx.save();ctx.translate(chartL-40,200);ctx.rotate(-Math.PI/2);ctx.fillText('Slope Rating',0,0);ctx.restore();
var colors=['#00FF88','#4ECDC4','#00B4D8','#FFB800','#FF6B6B','#A855F7','#FF3366','#FF00FF','#88CCFF','#FFDD57','#C084FC','#34D399','#F59E0B','#6366F1','#EF4444','#10B981','#3B82F6','#F97316','#8B5CF6','#EC4899'];
for(var i=0;i<data.length;i++){
var x=chartL+(chartR-chartL)*((data[i].rating-minR)/(maxR-minR));
var y=chartT+(chartB-chartT)*(1-(data[i].slope-minS)/(maxS-minS));
var col=colors[i%colors.length];
ctx.beginPath();ctx.arc(x,y,10,0,Math.PI*2);ctx.fillStyle=col;ctx.globalAlpha=0.7;ctx.fill();ctx.globalAlpha=1;
ctx.strokeStyle='#fff';ctx.lineWidth=1;ctx.stroke();
ctx.fillStyle='#fff';ctx.font='bold 8px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(i+1,x,y);ctx.textBaseline='alphabetic';
ctx.fillStyle=col;ctx.font='8px sans-serif';ctx.fillText(data[i].name.substring(0,6),x,y-14);
}
ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='9px sans-serif';ctx.textAlign='center';
ctx.fillText(data.length+' Courses | Higher = More Difficult',310,395);
}

// ===== QUIZ v22 (+15 = 210->225) =====
var QUIZ_V22=[
{q:'런치 모니터에서 Smash Factor 1.50은 무엇을 의미하나?',a:['매우 낮음','정상','최적 효율','위험 수치'],c:2},
{q:'드라이버 최적 런치 앵글은?',a:['5-8도','10-14도','18-22도','25-30도'],c:1},
{q:'Slope Rating 155는 어떤 코스?',a:['쉬운 코스','보통','어려운 코스','미국 최고 난이도'],c:3},
{q:'전반 대비 후반 스코어가 나빠지는 주원인은?',a:['날씨 변화','체력/집중력 저하','코스 난이도','행운'],c:1},
{q:'FIR(Fairway In Regulation) PGA 평균은?',a:['약 45%','약 60%','약 75%','약 90%'],c:1},
{q:'래그 퍼팅에서 3ft 이내 도달 목표 비율은?',a:['30%','50%','70% 이상','100%'],c:2},
{q:'골프클럽 ROI 계산에서 가장 중요한 지표는?',a:['브랜드 가치','1타당 비용','클럽 무게','색상'],c:1},
{q:'샷 클러스터에서 표준편차가 작을수록?',a:['일관성 낮음','일관성 높음','비거리 김','비거리 짧음'],c:1},
{q:'Course Rating 72.5에서 72는?',a:['Par 값','Bogey 값','핸디캡','Slope 값'],c:0},
{q:'시즌 플래너에서 겨울철 주요 훈련 목표는?',a:['코스 라운딩','체력/유연성','신규 장비','코스 답사'],c:1},
{q:'퍼팅 거리별 프로 평균 성공률 30ft는?',a:['약 5%','약 12%','약 30%','약 50%'],c:1},
{q:'드라이버 스핀량 2700rpm은?',a:['너무 낮음','최적','너무 높음','슬라이스'],c:1},
{q:'Slope Rating은 누구 기준 난이도 차이인가?',a:['프로','보기 골퍼','스크래치 골퍼','초보자'],c:1},
{q:'샷 분산 분석에서 offline 양수는?',a:['좌측','우측','장타','단타'],c:1},
{q:'골프 시즌 중 핸디캡 갱신 주기는?',a:['라운드마다','월 1회','분기 1회','연 1회'],c:0}
];
function showQuizV22(){
playSfx('quiz_correct_v22');
var pn=getPanel('quizv22');
var qIdx=lsGet('quiz_v22_idx',0);var score=lsGet('quiz_v22_score',0);var total=lsGet('quiz_v22_total',0);
if(qIdx>=QUIZ_V22.length)qIdx=0;
var q=QUIZ_V22[qIdx];
var html='<button class="v22-close" onclick="window._v22Close(\'quizv22\')">&times;</button>';
html+='<div class="v22-title">&#x1F4DA; Golf Quiz v22 ('+(qIdx+1)+'/'+QUIZ_V22.length+')</div>';
html+='<div class="v22-card"><h3>'+q.q+'</h3>';
html+='<div style="display:grid;gap:6px;margin-top:8px">';
for(var a=0;a<q.a.length;a++){
html+='<button class="v22-btn" style="width:100%;text-align:left;padding:10px" onclick="window._v22AnswerQuiz('+a+','+q.c+')">'+String.fromCharCode(65+a)+'. '+q.a[a]+'</button>';
}
html+='</div></div>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v22-stat-card"><div class="v22-stat-val" style="color:#00FF88">'+score+'</div><div class="v22-stat-label">&#xC815;&#xB2F5;</div></div>';
html+='<div class="v22-stat-card"><div class="v22-stat-val" style="color:#FF6B6B">'+total+'</div><div class="v22-stat-label">&#xCD1D; &#xD480;&#xC774;</div></div>';
html+='<div class="v22-stat-card"><div class="v22-stat-val" style="color:#FFB800">'+(total>0?Math.round(score/total*100):0)+'%</div><div class="v22-stat-label">&#xC815;&#xB2F5;&#xB960;</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('quizv22');
}
window._v22AnswerQuiz=function(sel,correct){
var score=lsGet('quiz_v22_score',0);var total=lsGet('quiz_v22_total',0);var qIdx=lsGet('quiz_v22_idx',0);
total++;
if(sel===correct){score++;playSfx('quiz_correct_v22');showToast('정답!');}
else{playSfx('quiz_wrong_v22');showToast('오답! 정답: '+String.fromCharCode(65+correct));}
qIdx++;
lsSet('quiz_v22_score',score);lsSet('quiz_v22_total',total);lsSet('quiz_v22_idx',qIdx);
setTimeout(showQuizV22,800);checkAchievements();
};

// ===== ACHIEVEMENTS v22 (+12 = 168->180) =====
var ACHIEVEMENTS_V22=[
{id:'launch_tracker',name:'Launch Tracker',desc:'런치 모니터 5회 기록',check:function(){return lsGet('launch_log',[]).length>=5}},
{id:'launch_pro',name:'Launch Pro',desc:'런치 모니터 20회 기록',check:function(){return lsGet('launch_log',[]).length>=20}},
{id:'roi_analyst',name:'ROI Analyst',desc:'클럽 ROI 데이터 입력',check:function(){var d=lsGet('club_roi',[]);var s=0;for(var i=0;i<d.length;i++)s+=d[i].shots;return s>=50}},
{id:'turnaround_tracker',name:'Turnaround Tracker',desc:'턴어라운드 5라운드 기록',check:function(){return lsGet('turnaround_log',[]).length>=5}},
{id:'fairway_finder',name:'Fairway Finder',desc:'페어웨이 존 20회 기록',check:function(){return lsGet('fwzone_log',[]).length>=20}},
{id:'lag_master',name:'Lag Putt Master',desc:'래그 퍼팅 10회 기록',check:function(){return lsGet('lagputt_log',[]).length>=10}},
{id:'season_planner',name:'Season Planner',desc:'시즌 목표 5개 설정',check:function(){return lsGet('season_plan',{goals:[]}).goals.length>=5}},
{id:'cluster_analyst',name:'Cluster Analyst',desc:'샷 클러스터 15회 기록',check:function(){return lsGet('cluster_log',[]).length>=15}},
{id:'course_explorer',name:'Course Explorer',desc:'코스 레이팅 5개 등록',check:function(){return lsGet('course_ratings',[]).length>=5}},
{id:'quiz_v22_master',name:'Quiz v22 Master',desc:'v22 퀴즈 전문 정답',check:function(){return lsGet('quiz_v22_score',0)>=15}},
{id:'quiz_v22_clear',name:'Quiz v22 Clear',desc:'v22 퀴즈 완주',check:function(){return lsGet('quiz_v22_total',0)>=15}},
{id:'v22_complete',name:'v22 Complete',desc:'v22 전체 기능 탐색',check:function(){return lsGet('v22_explored',0)>=8}}
];
function checkAchievements(){
var unlocked=lsGet('achievements_v22',[]);
for(var i=0;i<ACHIEVEMENTS_V22.length;i++){
var a=ACHIEVEMENTS_V22[i];
if(unlocked.indexOf(a.id)===-1&&a.check()){
unlocked.push(a.id);lsSet('achievements_v22',unlocked);
playSfx('achieve_v22');showToast('🏆 '+a.name+' unlocked!');
}
}
}
var explored=lsGet('v22_explored',0);
function markExplored(){explored++;lsSet('v22_explored',explored);}

// ===== CSS =====
var style=document.createElement('style');
style.textContent='.v22-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:10020;display:none;align-items:center;justify-content:center;padding:16px;overflow-y:auto}.v22-overlay.active{display:flex}.v22-panel{background:#14141a;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:20px;max-width:660px;width:100%;max-height:90vh;overflow-y:auto;position:relative}.v22-close{position:absolute;top:12px;right:12px;background:none;border:none;color:#fff;font-size:24px;cursor:pointer;z-index:2;opacity:0.7}.v22-close:hover{opacity:1}.v22-title{font-size:18px;font-weight:bold;color:#fff;margin-bottom:12px;text-align:center}.v22-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;margin:8px 0}.v22-card h3{font-size:13px;color:rgba(255,255,255,0.7);margin-bottom:6px}.v22-label{font-size:10px;color:rgba(255,255,255,0.5);display:block;margin-bottom:2px}.v22-input{width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:6px;color:#fff;padding:6px 8px;font-size:12px;outline:none}.v22-input:focus{border-color:#00FF88}.v22-btn{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);border-radius:8px;color:#fff;padding:8px 12px;font-size:12px;cursor:pointer;transition:all 0.2s}.v22-btn:hover{background:rgba(255,255,255,0.12)}.v22-btn-primary{background:rgba(0,255,136,0.15);border-color:rgba(0,255,136,0.3);color:#00FF88}.v22-btn-primary:hover{background:rgba(0,255,136,0.25)}.v22-btn-sm{padding:6px 8px;font-size:11px}.v22-stat-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:10px;text-align:center}.v22-stat-val{font-size:18px;font-weight:bold}.v22-stat-label{font-size:9px;color:rgba(255,255,255,0.5);margin-top:2px}.v22-toast{position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(20px);background:rgba(0,255,136,0.15);border:1px solid rgba(0,255,136,0.3);color:#00FF88;padding:10px 20px;border-radius:10px;font-size:13px;z-index:10030;opacity:0;transition:all 0.3s}.v22-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}';
document.head.appendChild(style);

// ===== NAVIGATION =====
window._v22Close=function(id){closePanel(id);};
function addNavButtons(){
var existing=document.querySelector('[id*="v21"]')||document.querySelector('[id*="v20"]')||document.querySelector('.gt-bottom-nav')||document.querySelector('[style*="position:fixed"][style*="bottom"]');
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
{label:'Launch',fn:showLaunchMonitor,icon:'&#x1F680;'},
{label:'ROI',fn:showClubROI,icon:'&#x1F4B0;'},
{label:'Turn',fn:showTurnaround,icon:'&#x1F504;'},
{label:'FW Zone',fn:showFairwayZone,icon:'&#x1F3CC;'},
{label:'Lag',fn:showLagPutt,icon:'&#x26F3;'},
{label:'Season',fn:showSeasonRoadmap,icon:'&#x1F4C5;'},
{label:'Cluster',fn:showShotCluster,icon:'&#x1F4CA;'},
{label:'Course',fn:showCourseRating,icon:'&#x1F3CC;'},
{label:'Quiz22',fn:showQuizV22,icon:'&#x1F4DA;'}
];
for(var i=0;i<btns.length;i++){
(function(b){
var btn=document.createElement('button');
btn.innerHTML=b.icon+'<br><span style="font-size:8px">'+b.label+'</span>';
btn.style.cssText='background:rgba(0,180,216,0.12);border:1px solid rgba(0,180,216,0.25);border-radius:8px;color:#00B4D8;padding:6px 4px;font-size:12px;cursor:pointer;min-width:44px;flex:0 0 auto;margin:2px';
btn.addEventListener('click',function(){b.fn();markExplored();});
nav.appendChild(btn);
})(btns[i]);
}
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown',function(e){
if(!e.shiftKey)return;
switch(e.key){
case'I':case'i':showLaunchMonitor();markExplored();break;
case'J':case'j':showClubROI();markExplored();break;
case'K':case'k':showTurnaround();markExplored();break;
case'L':case'l':showFairwayZone();markExplored();break;
case'M':case'm':showLagPutt();markExplored();break;
case'N':case'n':showSeasonRoadmap();markExplored();break;
case'O':case'o':showShotCluster();markExplored();break;
case'P':case'p':showCourseRating();markExplored();break;
case'9':showQuizV22();markExplored();break;
}
});

// ===== INIT =====
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',addNavButtons);}
else{setTimeout(addNavButtons,1500);}
setTimeout(checkAchievements,3000);
})();
