(function(){
'use strict';
var LS='gt_v20_';
var audioCtx=null;
function getAC(){if(!audioCtx)try{audioCtx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}return audioCtx}
function playSfx(type){var ac=getAC();if(!ac)return;var o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);var t=ac.currentTime;g.gain.setValueAtTime(0.1,t);switch(type){case'shape_open':o.type='sine';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(659,t+0.06);o.frequency.linearRampToValueAtTime(784,t+0.12);g.gain.exponentialRampToValueAtTime(0.01,t+0.25);o.start(t);o.stop(t+0.25);break;case'shape_log':o.type='triangle';o.frequency.setValueAtTime(659,t);o.frequency.linearRampToValueAtTime(784,t+0.05);o.frequency.linearRampToValueAtTime(988,t+0.1);g.gain.exponentialRampToValueAtTime(0.01,t+0.2);o.start(t);o.stop(t+0.2);break;case'gap_open':o.type='sine';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(554,t+0.07);o.frequency.linearRampToValueAtTime(659,t+0.14);g.gain.exponentialRampToValueAtTime(0.01,t+0.28);o.start(t);o.stop(t+0.28);break;case'gap_warn':o.type='sawtooth';o.frequency.setValueAtTime(330,t);o.frequency.linearRampToValueAtTime(262,t+0.15);g.gain.setValueAtTime(0.06,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.25);o.start(t);o.stop(t+0.25);break;case'compare_open':o.type='sine';o.frequency.setValueAtTime(392,t);o.frequency.linearRampToValueAtTime(523,t+0.08);o.frequency.linearRampToValueAtTime(659,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'practice_gen':o.type='triangle';o.frequency.setValueAtTime(494,t);o.frequency.linearRampToValueAtTime(659,t+0.06);o.frequency.linearRampToValueAtTime(784,t+0.12);o.frequency.linearRampToValueAtTime(988,t+0.18);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'gir_open':o.type='sine';o.frequency.setValueAtTime(587,t);o.frequency.linearRampToValueAtTime(698,t+0.07);o.frequency.linearRampToValueAtTime(880,t+0.14);g.gain.exponentialRampToValueAtTime(0.01,t+0.28);o.start(t);o.stop(t+0.28);break;case'wind_calc':o.type='triangle';o.frequency.setValueAtTime(349,t);o.frequency.linearRampToValueAtTime(466,t+0.08);o.frequency.linearRampToValueAtTime(587,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'par_open':o.type='sine';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(587,t+0.06);o.frequency.linearRampToValueAtTime(698,t+0.12);o.frequency.linearRampToValueAtTime(880,t+0.18);g.gain.exponentialRampToValueAtTime(0.01,t+0.32);o.start(t);o.stop(t+0.32);break;case'mental_open':o.type='sine';o.frequency.setValueAtTime(370,t);o.frequency.linearRampToValueAtTime(494,t+0.08);o.frequency.linearRampToValueAtTime(622,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'mental_log':o.type='triangle';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(659,t+0.05);o.frequency.linearRampToValueAtTime(784,t+0.1);g.gain.exponentialRampToValueAtTime(0.01,t+0.2);o.start(t);o.stop(t+0.2);break;case'quiz_correct_v20':o.type='sine';o.frequency.setValueAtTime(698,t);o.frequency.setValueAtTime(880,t+0.08);o.frequency.setValueAtTime(1047,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'quiz_wrong_v20':o.type='sawtooth';o.frequency.setValueAtTime(247,t);o.frequency.linearRampToValueAtTime(185,t+0.2);g.gain.setValueAtTime(0.06,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'achieve_v20':o.type='sine';o.frequency.setValueAtTime(880,t);o.frequency.setValueAtTime(1047,t+0.1);o.frequency.setValueAtTime(1319,t+0.2);o.frequency.setValueAtTime(1568,t+0.3);g.gain.exponentialRampToValueAtTime(0.01,t+0.5);o.start(t);o.stop(t+0.5);break;default:o.type='sine';o.frequency.setValueAtTime(440,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.15);o.start(t);o.stop(t+0.15)}}

function lsGet(k,d){try{var v=localStorage.getItem(LS+k);return v?JSON.parse(v):d}catch(e){return d}}
function lsSet(k,v){try{localStorage.setItem(LS+k,JSON.stringify(v))}catch(e){}}
function todayStr(){return new Date().toISOString().slice(0,10)}
function showToast(msg){var t=document.createElement('div');t.className='v20-toast';t.textContent=msg;document.body.appendChild(t);setTimeout(function(){t.classList.add('show')},50);setTimeout(function(){t.classList.remove('show');setTimeout(function(){t.remove()},400)},3000)}
function createOverlay(id){var ov=document.createElement('div');ov.className='v20-overlay';ov.id='v20-'+id;ov.addEventListener('click',function(e){if(e.target===ov)closePanel(id)});var pn=document.createElement('div');pn.className='v20-panel';pn.style.position='relative';ov.appendChild(pn);return pn}
function openPanel(id){var el=document.getElementById('v20-'+id);if(el)el.classList.add('active')}
function closePanel(id){var el=document.getElementById('v20-'+id);if(el)el.classList.remove('active')}
function getPanel(id){var ov=document.getElementById('v20-'+id);if(!ov){var pn=createOverlay(id);pn.id='v20-'+id+'-panel';document.body.appendChild(pn.parentElement);return pn}return ov.querySelector('.v20-panel')||ov}

// ===== 1. SHOT SHAPE TENDENCY ANALYZER Canvas 600x360 =====
function showShotShape(){
playSfx('shape_open');
var pn=getPanel('shotshape');
var data=lsGet('shape_log',[]);
var SHAPES=['Straight','Fade','Draw','Slice','Hook','Push','Pull'];
var counts=[0,0,0,0,0,0,0];
for(var i=0;i<data.length;i++){var idx=SHAPES.indexOf(data[i].shape);if(idx>=0)counts[idx]++;}
var html='<button class="v20-close" onclick="window._v20Close(\'shotshape\')">&times;</button>';
html+='<div class="v20-title">&#x1F3AF; &#xC0F7; &#xC250;&#xC774;&#xD504; &#xACBD;&#xD5A5; &#xBD84;&#xC11D;&#xAE30;</div>';
html+='<canvas id="v20-shape-canvas" width="600" height="360" style="width:100%;max-width:600px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px;margin:8px 0">';
for(var s=0;s<SHAPES.length;s++){
html+='<button class="v20-btn v20-btn-sm" onclick="window._v20LogShape(\''+SHAPES[s]+'\')">'+SHAPES[s]+'</button>';
}
html+='</div>';
var total=data.length;
var dominant=SHAPES[counts.indexOf(Math.max.apply(null,counts))];
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v20-stat-card"><div class="v20-stat-val" style="color:#00FF88">'+total+'</div><div class="v20-stat-label">&#xCD1D; &#xC0F7;</div></div>';
html+='<div class="v20-stat-card"><div class="v20-stat-val" style="color:#FFB800">'+dominant+'</div><div class="v20-stat-label">&#xC8FC; &#xACBD;&#xD5A5;</div></div>';
html+='<div class="v20-stat-card"><div class="v20-stat-val" style="color:#00B4D8">'+(total>0?Math.round(counts[0]/total*100):0)+'%</div><div class="v20-stat-label">Straight&#xB960;</div></div>';
html+='</div>';
if(data.length>0){html+='<button class="v20-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'&#xCD08;&#xAE30;&#xD654;?\'))window._v20ResetShape()">&#xCD08;&#xAE30;&#xD654;</button>';}
pn.innerHTML=html;openPanel('shotshape');drawShapeCanvas(counts,SHAPES);
}
function drawShapeCanvas(counts,labels){
var c=document.getElementById('v20-shape-canvas');if(!c)return;var ctx=c.getContext('2d');
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,600,360);
var colors=['#00FF88','#4ECDC4','#00B4D8','#FF6B6B','#FF3366','#FFB800','#A855F7'];
var total=0;for(var i=0;i<counts.length;i++)total+=counts[i];
if(total===0){ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='16px sans-serif';ctx.textAlign='center';ctx.fillText('&#xC0F7;&#xC744; &#xAE30;&#xB85D;&#xD558;&#xBA74; &#xD30C;&#xC774;&#xCC28;&#xD2B8;&#xAC00; &#xD45C;&#xC2DC;&#xB429;&#xB2C8;&#xB2E4;',300,180);return;}
var cx=180,cy=180,r=120;
var startAngle=-Math.PI/2;
for(var i=0;i<counts.length;i++){
if(counts[i]===0)continue;
var sliceAngle=2*Math.PI*(counts[i]/total);
ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,startAngle,startAngle+sliceAngle);ctx.closePath();
ctx.fillStyle=colors[i];ctx.fill();ctx.strokeStyle='#0d1117';ctx.lineWidth=2;ctx.stroke();
var midAngle=startAngle+sliceAngle/2;
var lx=cx+Math.cos(midAngle)*(r*0.65);var ly=cy+Math.sin(midAngle)*(r*0.65);
if(counts[i]/total>0.08){ctx.fillStyle='#fff';ctx.font='bold 11px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(Math.round(counts[i]/total*100)+'%',lx,ly);}
startAngle+=sliceAngle;
}
ctx.fillStyle='#fff';ctx.font='bold 13px sans-serif';ctx.textAlign='left';
var ly2=40;
for(var i=0;i<labels.length;i++){
ctx.fillStyle=colors[i];ctx.fillRect(380,ly2-6,14,14);
ctx.fillStyle='#fff';ctx.fillText(labels[i]+' ('+counts[i]+')',400,ly2+2);
ly2+=28;
}
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='11px sans-serif';ctx.textAlign='center';ctx.fillText('Shot Shape Tendency - Total: '+total,300,350);
}
window._v20LogShape=function(shape){
playSfx('shape_log');
var data=lsGet('shape_log',[]);
data.push({shape:shape,date:todayStr()});
lsSet('shape_log',data);showToast(shape+' recorded');showShotShape();checkAchievements();
};
window._v20ResetShape=function(){lsSet('shape_log',[]);showShotShape();};

// ===== 2. CLUB GAPPING VISUALIZER Canvas 620x380 =====
function showClubGapping(){
playSfx('gap_open');
var pn=getPanel('clubgap');
var CLUBS=['DR','3W','5W','4I','5I','6I','7I','8I','9I','PW','AW','SW','LW','PT'];
var data=lsGet('gap_data',{DR:250,three_w:230,five_w:215,four_i:200,five_i:185,six_i:170,seven_i:160,eight_i:148,nine_i:136,PW:125,AW:110,SW:95,LW:80,PT:0});
var dists=[data.DR,data.three_w,data.five_w,data.four_i,data.five_i,data.six_i,data.seven_i,data.eight_i,data.nine_i,data.PW,data.AW,data.SW,data.LW,data.PT];
var html='<button class="v20-close" onclick="window._v20Close(\'clubgap\')">&times;</button>';
html+='<div class="v20-title">&#x1F4CA; &#xD074;&#xB7FD; &#xAC38;&#xD551; &#xC2DC;&#xAC01;&#xD654;</div>';
html+='<canvas id="v20-gap-canvas" width="620" height="380" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v20-card"><h3>&#xBE44;&#xAC70;&#xB9AC; &#xC124;&#xC815; (yd)</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px;margin-top:6px">';
var keys=['DR','three_w','five_w','four_i','five_i','six_i','seven_i','eight_i','nine_i','PW','AW','SW','LW','PT'];
for(var i=0;i<CLUBS.length;i++){
html+='<div><label class="v20-label">'+CLUBS[i]+'</label><input type="number" class="v20-input" id="v20-gap-'+keys[i]+'" value="'+dists[i]+'" min="0" max="350"></div>';
}
html+='</div>';
html+='<button class="v20-btn v20-btn-primary" style="width:100%;margin-top:8px" onclick="window._v20SaveGap()">&#xC800;&#xC7A5; &amp; &#xBD84;&#xC11D;</button>';
html+='</div>';
html+='<div id="v20-gap-warnings" style="margin-top:6px"></div>';
pn.innerHTML=html;openPanel('clubgap');drawGapCanvas(dists,CLUBS);analyzeGaps(dists,CLUBS);
}
function drawGapCanvas(dists,clubs){
var c=document.getElementById('v20-gap-canvas');if(!c)return;var ctx=c.getContext('2d');
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,620,380);
var maxD=Math.max.apply(null,dists.filter(function(d){return d>0}))||280;
var barW=32,startX=50,baseY=340;
ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.lineWidth=1;
for(var g=0;g<=5;g++){var gy=baseY-(g/5)*280;ctx.beginPath();ctx.moveTo(40,gy);ctx.lineTo(600,gy);ctx.stroke();ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='10px sans-serif';ctx.textAlign='right';ctx.fillText(Math.round(maxD*g/5)+'yd',38,gy+3);}
for(var i=0;i<clubs.length;i++){
if(dists[i]===0)continue;
var x=startX+i*(barW+6);var h=(dists[i]/maxD)*280;
var grad=ctx.createLinearGradient(x,baseY-h,x,baseY);
grad.addColorStop(0,'#00FF88');grad.addColorStop(1,'#00B4D8');
ctx.fillStyle=grad;ctx.beginPath();ctx.roundRect(x,baseY-h,barW,h,4);ctx.fill();
ctx.fillStyle='#fff';ctx.font='bold 10px sans-serif';ctx.textAlign='center';ctx.fillText(dists[i],x+barW/2,baseY-h-8);
ctx.fillStyle='rgba(255,255,255,0.7)';ctx.font='9px sans-serif';ctx.fillText(clubs[i],x+barW/2,baseY+14);
if(i>0&&dists[i-1]>0&&dists[i]>0){
var gap=dists[i-1]-dists[i];
var color=gap>20?'#FF6B6B':gap<8?'#FFB800':'#00FF88';
ctx.fillStyle=color;ctx.font='bold 9px sans-serif';ctx.fillText(gap+'yd',x+barW/2-19,baseY-h/2);
}
}
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='11px sans-serif';ctx.textAlign='center';ctx.fillText('Club Gapping Analysis - Ideal Gap: 10-15yd',310,370);
}
function analyzeGaps(dists,clubs){
var el=document.getElementById('v20-gap-warnings');if(!el)return;
var warnings=[];
for(var i=1;i<dists.length;i++){
if(dists[i]===0||dists[i-1]===0)continue;
var gap=dists[i-1]-dists[i];
if(gap>20)warnings.push('<span style="color:#FF6B6B">&#x26A0; '+clubs[i-1]+' &#x2192; '+clubs[i]+': '+gap+'yd &#xAC78; (&#xB108;&#xBB34; &#xB118;&#xC74C;)</span>');
if(gap<5)warnings.push('<span style="color:#FFB800">&#x26A0; '+clubs[i-1]+' &#x2192; '+clubs[i]+': '+gap+'yd &#xAC78; (&#xC911;&#xBCF5; &#xC758;&#xC2EC;)</span>');
}
if(warnings.length===0)el.innerHTML='<div class="v20-stat-card" style="text-align:center;color:#00FF88">&#x2705; &#xD074;&#xB7FD; &#xAC38;&#xD551; &#xC815;&#xC0C1; (10-15yd &#xADE0;&#xC77C;)</div>';
else el.innerHTML='<div class="v20-card">'+warnings.join('<br>')+'</div>';
}
window._v20SaveGap=function(){
var keys=['DR','three_w','five_w','four_i','five_i','six_i','seven_i','eight_i','nine_i','PW','AW','SW','LW','PT'];
var data={};
for(var i=0;i<keys.length;i++){var el=document.getElementById('v20-gap-'+keys[i]);data[keys[i]]=el?parseInt(el.value)||0:0;}
lsSet('gap_data',data);playSfx('gap_warn');showToast('Club gapping saved');showClubGapping();checkAchievements();
};

// ===== 3. ROUND COMPARISON OVERLAY Canvas 620x380 =====
function showRoundCompare(){
playSfx('compare_open');
var pn=getPanel('roundcompare');
var rounds=lsGet('compare_rounds',[]);
var html='<button class="v20-close" onclick="window._v20Close(\'roundcompare\')">&times;</button>';
html+='<div class="v20-title">&#x1F4C8; &#xB77C;&#xC6B4;&#xB4DC; &#xBE44;&#xAD50; &#xC624;&#xBC84;&#xB808;&#xC774;</div>';
html+='<canvas id="v20-compare-canvas" width="620" height="380" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v20-card"><h3>&#xB77C;&#xC6B4;&#xB4DC; &#xC785;&#xB825; (18&#xD640; &#xC2A4;&#xCF54;&#xC5B4;)</h3>';
html+='<div style="margin:6px 0"><label class="v20-label">Round A &#xB0A0;&#xC9DC;</label><input type="date" id="v20-cmp-dateA" class="v20-input" value="'+todayStr()+'"></div>';
html+='<div style="display:grid;grid-template-columns:repeat(9,1fr);gap:2px">';
for(var h=1;h<=18;h++){html+='<input type="number" class="v20-input" id="v20-cmpA-'+h+'" value="4" min="1" max="12" style="font-size:11px;padding:4px 2px;text-align:center">';}
html+='</div>';
html+='<div style="margin:6px 0"><label class="v20-label">Round B &#xB0A0;&#xC9DC;</label><input type="date" id="v20-cmp-dateB" class="v20-input"></div>';
html+='<div style="display:grid;grid-template-columns:repeat(9,1fr);gap:2px">';
for(var h=1;h<=18;h++){html+='<input type="number" class="v20-input" id="v20-cmpB-'+h+'" value="4" min="1" max="12" style="font-size:11px;padding:4px 2px;text-align:center">';}
html+='</div>';
html+='<button class="v20-btn v20-btn-primary" style="width:100%;margin-top:8px" onclick="window._v20CompareRounds()">&#xBE44;&#xAD50; &#xBD84;&#xC11D;</button>';
html+='</div>';
pn.innerHTML=html;openPanel('roundcompare');drawCompareCanvas([],[]);
}
function drawCompareCanvas(a,b){
var c=document.getElementById('v20-compare-canvas');if(!c)return;var ctx=c.getContext('2d');
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,620,380);
if(a.length===0){ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='14px sans-serif';ctx.textAlign='center';ctx.fillText('18&#xD640; &#xC2A4;&#xCF54;&#xC5B4;&#xB97C; &#xC785;&#xB825;&#xD558;&#xBA74; &#xBE44;&#xAD50; &#xCC28;&#xD2B8;&#xAC00; &#xD45C;&#xC2DC;&#xB429;&#xB2C8;&#xB2E4;',310,190);return;}
var maxS=Math.max(Math.max.apply(null,a),Math.max.apply(null,b))+1;
var minS=Math.min(Math.min.apply(null,a),Math.min.apply(null,b))-1;
var range=maxS-minS;var chartH=260,startX=50,startY=40;
ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.lineWidth=1;
for(var g=0;g<=4;g++){var gy=startY+g*(chartH/4);ctx.beginPath();ctx.moveTo(45,gy);ctx.lineTo(600,gy);ctx.stroke();ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='10px sans-serif';ctx.textAlign='right';ctx.fillText(Math.round(maxS-g*(range/4)),42,gy+3);}
var stepX=(600-startX)/17;
ctx.strokeStyle='#00FF88';ctx.lineWidth=2.5;ctx.beginPath();
for(var i=0;i<18;i++){var x=startX+i*stepX;var y=startY+((maxS-a[i])/range)*chartH;if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}
ctx.stroke();
ctx.strokeStyle='#FF6B6B';ctx.lineWidth=2.5;ctx.beginPath();
for(var i=0;i<18;i++){var x=startX+i*stepX;var y=startY+((maxS-b[i])/range)*chartH;if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}
ctx.stroke();
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='9px sans-serif';ctx.textAlign='center';
for(var i=0;i<18;i++){ctx.fillText('H'+(i+1),startX+i*stepX,startY+chartH+18);}
var sumA=0,sumB=0;for(var i=0;i<18;i++){sumA+=a[i];sumB+=b[i];}
ctx.font='bold 12px sans-serif';ctx.textAlign='left';
ctx.fillStyle='#00FF88';ctx.fillText('Round A: '+sumA+' (Avg '+(sumA/18).toFixed(1)+')',50,startY+chartH+40);
ctx.fillStyle='#FF6B6B';ctx.fillText('Round B: '+sumB+' (Avg '+(sumB/18).toFixed(1)+')',320,startY+chartH+40);
var diff=sumA-sumB;ctx.fillStyle=diff<0?'#00FF88':'#FF6B6B';ctx.textAlign='center';ctx.fillText('Diff: '+(diff>0?'+':'')+diff,310,startY+chartH+58);
}
window._v20CompareRounds=function(){
var a=[],b=[];
for(var h=1;h<=18;h++){
var ea=document.getElementById('v20-cmpA-'+h);var eb=document.getElementById('v20-cmpB-'+h);
a.push(ea?parseInt(ea.value)||4:4);b.push(eb?parseInt(eb.value)||4:4);
}
drawCompareCanvas(a,b);playSfx('compare_open');
var data=lsGet('compare_rounds',[]);data.push({a:a,b:b,date:todayStr()});if(data.length>20)data=data.slice(-20);
lsSet('compare_rounds',data);showToast('Round comparison saved');checkAchievements();
};

// ===== 4. SMART PRACTICE PLAN GENERATOR Canvas 600x380 =====
function showPracticePlan(){
playSfx('practice_gen');
var pn=getPanel('practiceplan');
var AREAS=['&#xB4DC;&#xB77C;&#xC774;&#xBC84;','&#xC544;&#xC774;&#xC5B8;','&#xC5B4;&#xD504;&#xB85C;&#xCE58;','&#xCE58;&#xD551;','&#xD37C;&#xD305;','&#xBC99;&#xCEE4;'];
var LEVELS=['&#xCD08;&#xAE09;','&#xC911;&#xAE09;','&#xC0C1;&#xAE09;'];
var plan=lsGet('practice_plan',null);
var html='<button class="v20-close" onclick="window._v20Close(\'practiceplan\')">&times;</button>';
html+='<div class="v20-title">&#x1F4DD; &#xC2A4;&#xB9C8;&#xD2B8; &#xC5F0;&#xC2B5; &#xD50C;&#xB79C; &#xC0DD;&#xC131;&#xAE30;</div>';
html+='<canvas id="v20-plan-canvas" width="600" height="380" style="width:100%;max-width:600px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v20-card"><h3>&#xC57D;&#xC810; &#xC120;&#xD0DD; (1-10)</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin:6px 0">';
for(var a=0;a<AREAS.length;a++){
html+='<div><label class="v20-label">'+AREAS[a]+'</label><input type="range" id="v20-plan-'+a+'" min="1" max="10" value="5" class="v20-range"><span id="v20-plan-val-'+a+'">5</span></div>';
}
html+='</div>';
html+='<div style="margin:6px 0"><label class="v20-label">&#xB808;&#xBCA8;</label><select id="v20-plan-level" class="v20-input">';
for(var l=0;l<LEVELS.length;l++)html+='<option>'+LEVELS[l]+'</option>';
html+='</select></div>';
html+='<button class="v20-btn v20-btn-primary" style="width:100%;margin-top:6px" onclick="window._v20GenPlan()">4&#xC8FC; &#xD50C;&#xB79C; &#xC0DD;&#xC131;</button>';
html+='</div>';
html+='<div id="v20-plan-result"></div>';
pn.innerHTML=html;openPanel('practiceplan');
for(var a=0;a<AREAS.length;a++){(function(idx){var el=document.getElementById('v20-plan-'+idx);if(el)el.addEventListener('input',function(){var s=document.getElementById('v20-plan-val-'+idx);if(s)s.textContent=el.value;});})(a);}
drawPlanCanvas(null);
}
function drawPlanCanvas(plan){
var c=document.getElementById('v20-plan-canvas');if(!c)return;var ctx=c.getContext('2d');
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,600,380);
if(!plan){ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='14px sans-serif';ctx.textAlign='center';ctx.fillText('&#xC57D;&#xC810;&#xC744; &#xC120;&#xD0DD;&#xD558;&#xACE0; &#xD50C;&#xB79C;&#xC744; &#xC0DD;&#xC131;&#xD558;&#xC138;&#xC694;',300,190);return;}
var weeks=['Week 1','Week 2','Week 3','Week 4'];
var colors=['#00FF88','#4ECDC4','#00B4D8','#FFB800','#FF6B6B','#A855F7'];
var barH=18,startY=40,startX=80;
ctx.fillStyle='#fff';ctx.font='bold 13px sans-serif';ctx.textAlign='center';ctx.fillText('4-Week Smart Practice Plan',300,25);
for(var w=0;w<4;w++){
var wy=startY+w*85;
ctx.fillStyle='rgba(255,255,255,0.7)';ctx.font='bold 11px sans-serif';ctx.textAlign='left';ctx.fillText(weeks[w],10,wy+10);
var total=0;for(var a=0;a<6;a++)total+=plan[w][a];
var x=startX;
for(var a=0;a<6;a++){
var bw=(plan[w][a]/total)*500;
ctx.fillStyle=colors[a];ctx.beginPath();ctx.roundRect(x,wy,bw,barH,3);ctx.fill();
if(bw>25){ctx.fillStyle='#000';ctx.font='9px sans-serif';ctx.textAlign='center';ctx.fillText(plan[w][a]+'min',x+bw/2,wy+13);}
x+=bw;
}
}
var areas=['DR','Iron','Appr','Chip','Putt','Bunk'];
ctx.font='10px sans-serif';ctx.textAlign='left';var lx=80;
for(var a=0;a<6;a++){ctx.fillStyle=colors[a];ctx.fillRect(lx,355,12,12);ctx.fillStyle='#fff';ctx.fillText(areas[a],lx+15,365);lx+=80;}
}
window._v20GenPlan=function(){
var scores=[];for(var a=0;a<6;a++){var el=document.getElementById('v20-plan-'+a);scores.push(el?parseInt(el.value):5);}
var plan=[];
for(var w=0;w<4;w++){
var week=[];var totalMin=90+w*10;
for(var a=0;a<6;a++){
var weakness=11-scores[a];
var base=Math.round(totalMin*(weakness/60)*10+5);
week.push(Math.max(5,Math.min(40,base)));
}
plan.push(week);
}
lsSet('practice_plan',plan);drawPlanCanvas(plan);playSfx('practice_gen');
showToast('4-week plan generated');checkAchievements();
};

// ===== 5. GIR PROXIMITY ANALYZER Canvas 600x360 =====
function showGIRProximity(){
playSfx('gir_open');
var pn=getPanel('girprox');
var data=lsGet('gir_prox',[]);
var html='<button class="v20-close" onclick="window._v20Close(\'girprox\')">&times;</button>';
html+='<div class="v20-title">&#x1F3CC; GIR &#xADFC;&#xC811;&#xB3C4; &#xBD84;&#xC11D;&#xAE30;</div>';
html+='<canvas id="v20-gir-canvas" width="600" height="360" style="width:100%;max-width:600px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v20-card"><h3>GIR &#xD540;&#xAE4C;&#xC9C0; &#xAC70;&#xB9AC; &#xAE30;&#xB85D;</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px">';
html+='<div><label class="v20-label">&#xD640; &#xBC88;&#xD638;</label><input type="number" id="v20-gir-hole" class="v20-input" value="1" min="1" max="18"></div>';
html+='<div><label class="v20-label">&#xD540;&#xAE4C;&#xC9C0; (ft)</label><input type="number" id="v20-gir-dist" class="v20-input" value="20" min="1" max="100"></div>';
html+='<div style="display:flex;align-items:flex-end"><button class="v20-btn v20-btn-primary" style="width:100%" onclick="window._v20LogGIR()">&#xAE30;&#xB85D;</button></div>';
html+='</div></div>';
var avgDist=0;if(data.length>0){var sum=0;for(var i=0;i<data.length;i++)sum+=data[i].dist;avgDist=(sum/data.length).toFixed(1);}
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v20-stat-card"><div class="v20-stat-val" style="color:#00FF88">'+data.length+'</div><div class="v20-stat-label">&#xCD1D; GIR</div></div>';
html+='<div class="v20-stat-card"><div class="v20-stat-val" style="color:#FFB800">'+avgDist+'ft</div><div class="v20-stat-label">&#xD3C9;&#xADE0; &#xAC70;&#xB9AC;</div></div>';
html+='<div class="v20-stat-card"><div class="v20-stat-val" style="color:#00B4D8">'+(data.length>0?Math.min.apply(null,data.map(function(d){return d.dist})):0)+'ft</div><div class="v20-stat-label">&#xCD5C;&#xC18C; &#xAC70;&#xB9AC;</div></div>';
html+='</div>';
if(data.length>0){html+='<button class="v20-btn" style="width:100%;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'&#xCD08;&#xAE30;&#xD654;?\'))window._v20ResetGIR()">&#xCD08;&#xAE30;&#xD654;</button>';}
pn.innerHTML=html;openPanel('girprox');drawGIRCanvas(data);
}
function drawGIRCanvas(data){
var c=document.getElementById('v20-gir-canvas');if(!c)return;var ctx=c.getContext('2d');
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,600,360);
if(data.length===0){ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='14px sans-serif';ctx.textAlign='center';ctx.fillText('GIR &#xB370;&#xC774;&#xD130;&#xB97C; &#xAE30;&#xB85D;&#xD558;&#xBA74; &#xC0B0;&#xC810;&#xB3C4;&#xAC00; &#xD45C;&#xC2DC;&#xB429;&#xB2C8;&#xB2E4;',300,180);return;}
var maxDist=Math.max.apply(null,data.map(function(d){return d.dist}))+10;
var chartH=280,chartW=520,startX=60,startY=30;
ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.lineWidth=1;
for(var g=0;g<=4;g++){var gy=startY+g*(chartH/4);ctx.beginPath();ctx.moveTo(55,gy);ctx.lineTo(580,gy);ctx.stroke();ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='10px sans-serif';ctx.textAlign='right';ctx.fillText(Math.round(maxDist-g*(maxDist/4))+'ft',52,gy+3);}
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='9px sans-serif';ctx.textAlign='center';
for(var h=1;h<=18;h++){ctx.fillText('H'+h,startX+(h-1)*(chartW/17),startY+chartH+15);}
for(var i=0;i<data.length;i++){
var x=startX+(data[i].hole-1)*(chartW/17)+Math.random()*10-5;
var y=startY+((maxDist-data[i].dist)/maxDist)*chartH;
var color=data[i].dist<=15?'#00FF88':data[i].dist<=30?'#FFB800':'#FF6B6B';
ctx.fillStyle=color;ctx.globalAlpha=0.7;ctx.beginPath();ctx.arc(x,y,5,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;
}
var avg=0;for(var i=0;i<data.length;i++)avg+=data[i].dist;avg/=data.length;
var avgY=startY+((maxDist-avg)/maxDist)*chartH;
ctx.strokeStyle='#FF6B6B';ctx.lineWidth=1.5;ctx.setLineDash([5,5]);ctx.beginPath();ctx.moveTo(55,avgY);ctx.lineTo(580,avgY);ctx.stroke();ctx.setLineDash([]);
ctx.fillStyle='#FF6B6B';ctx.font='10px sans-serif';ctx.textAlign='left';ctx.fillText('Avg: '+avg.toFixed(1)+'ft',10,avgY-5);
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='11px sans-serif';ctx.textAlign='center';ctx.fillText('GIR Proximity Scatter - Green: <15ft, Yellow: 15-30ft, Red: >30ft',300,350);
}
window._v20LogGIR=function(){
var hole=parseInt(document.getElementById('v20-gir-hole').value)||1;
var dist=parseInt(document.getElementById('v20-gir-dist').value)||20;
var data=lsGet('gir_prox',[]);data.push({hole:hole,dist:dist,date:todayStr()});
if(data.length>200)data=data.slice(-200);
lsSet('gir_prox',data);playSfx('gir_open');showToast('GIR H'+hole+': '+dist+'ft recorded');showGIRProximity();checkAchievements();
};
window._v20ResetGIR=function(){lsSet('gir_prox',[]);showGIRProximity();};

// ===== 6. WIND PHYSICS CALCULATOR Canvas 580x360 =====
function showWindCalc(){
playSfx('wind_calc');
var pn=getPanel('windcalc');
var CLUBS=['DR','3W','5W','5I','6I','7I','8I','9I','PW','SW'];
var BASE=[250,230,215,185,170,160,148,136,125,95];
var html='<button class="v20-close" onclick="window._v20Close(\'windcalc\')">&times;</button>';
html+='<div class="v20-title">&#x1F32C;&#xFE0F; &#xBC14;&#xB78C; &#xBB3C;&#xB9AC; &#xACC4;&#xC0B0;&#xAE30;</div>';
html+='<canvas id="v20-wind-canvas" width="580" height="360" style="width:100%;max-width:580px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v20-card"><h3>&#xBC14;&#xB78C; &#xC870;&#xAC74;</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px">';
html+='<div><label class="v20-label">&#xD48D;&#xC18D; (km/h)</label><input type="number" id="v20-wind-speed" class="v20-input" value="15" min="0" max="60"></div>';
html+='<div><label class="v20-label">&#xD48D;&#xD5A5; (&deg;)</label><input type="number" id="v20-wind-dir" class="v20-input" value="0" min="0" max="359"><div class="v20-label" style="font-size:9px">0=&#xC815;&#xBA74;&#xC5ED;&#xD48D; 180=&#xC21C;&#xD48D;</div></div>';
html+='<div><label class="v20-label">&#xD074;&#xB7FD;</label><select id="v20-wind-club" class="v20-input">';
for(var i=0;i<CLUBS.length;i++)html+='<option value="'+i+'">'+CLUBS[i]+' ('+BASE[i]+'yd)</option>';
html+='</select></div>';
html+='</div>';
html+='<button class="v20-btn v20-btn-primary" style="width:100%;margin-top:8px" onclick="window._v20CalcWind()">&#xBCF4;&#xC815; &#xACC4;&#xC0B0;</button>';
html+='</div>';
html+='<div id="v20-wind-result" style="margin-top:6px"></div>';
pn.innerHTML=html;openPanel('windcalc');drawWindCanvas(0,0,0,0);
}
function drawWindCanvas(speed,dir,baseDist,adjDist){
var c=document.getElementById('v20-wind-canvas');if(!c)return;var ctx=c.getContext('2d');
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,580,360);
var cx=290,cy=180,r=130;
ctx.strokeStyle='rgba(255,255,255,0.2)';ctx.lineWidth=1;
ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.stroke();
ctx.beginPath();ctx.arc(cx,cy,r*0.66,0,Math.PI*2);ctx.stroke();
ctx.beginPath();ctx.arc(cx,cy,r*0.33,0,Math.PI*2);ctx.stroke();
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='9px sans-serif';ctx.textAlign='center';
ctx.fillText('N(&#xC5ED;&#xD48D;)',cx,cy-r-8);ctx.fillText('S(&#xC21C;&#xD48D;)',cx,cy+r+14);ctx.fillText('E',cx+r+10,cy+3);ctx.fillText('W',cx-r-10,cy+3);
if(speed>0){
var rad=(dir-90)*Math.PI/180;
var arrowLen=Math.min(speed*2,r*0.8);
var ax=cx+Math.cos(rad)*arrowLen;var ay=cy+Math.sin(rad)*arrowLen;
ctx.strokeStyle='#00B4D8';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(ax,ay);ctx.stroke();
ctx.fillStyle='#00B4D8';ctx.beginPath();
var angle=Math.atan2(ay-cy,ax-cx);
ctx.moveTo(ax,ay);ctx.lineTo(ax-12*Math.cos(angle-0.4),ay-12*Math.sin(angle-0.4));ctx.lineTo(ax-12*Math.cos(angle+0.4),ay-12*Math.sin(angle+0.4));ctx.closePath();ctx.fill();
var headFactor=Math.cos(dir*Math.PI/180);
var crossFactor=Math.sin(dir*Math.PI/180);
ctx.fillStyle='#fff';ctx.font='bold 12px sans-serif';ctx.textAlign='center';
ctx.fillText(speed+'km/h @ '+dir+'°',cx,30);
if(baseDist>0){
ctx.fillStyle='#FFB800';ctx.font='bold 14px sans-serif';
ctx.fillText('Base: '+baseDist+'yd → Adjusted: '+adjDist+'yd',cx,340);
var diff=adjDist-baseDist;ctx.fillStyle=diff>=0?'#00FF88':'#FF6B6B';
ctx.fillText((diff>=0?'+':'')+diff+'yd',cx,320);
}
}else{ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='14px sans-serif';ctx.textAlign='center';ctx.fillText('&#xD48D;&#xC18D;/&#xD48D;&#xD5A5;&#xC744; &#xC785;&#xB825;&#xD558;&#xC138;&#xC694;',cx,cy);}
}
window._v20CalcWind=function(){
var speed=parseInt(document.getElementById('v20-wind-speed').value)||0;
var dir=parseInt(document.getElementById('v20-wind-dir').value)||0;
var clubIdx=parseInt(document.getElementById('v20-wind-club').value)||0;
var BASE=[250,230,215,185,170,160,148,136,125,95];
var baseDist=BASE[clubIdx];
var headFactor=-Math.cos(dir*Math.PI/180);
var crossFactor=Math.abs(Math.sin(dir*Math.PI/180));
var windEffect=speed*0.5*headFactor;
var crossEffect=-crossFactor*speed*0.15;
var adjDist=Math.round(baseDist+windEffect+crossEffect);
drawWindCanvas(speed,dir,baseDist,adjDist);playSfx('wind_calc');
var el=document.getElementById('v20-wind-result');
if(el){
var diff=adjDist-baseDist;
el.innerHTML='<div class="v20-card"><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px"><div class="v20-stat-card"><div class="v20-stat-val" style="color:#FFB800">'+baseDist+'yd</div><div class="v20-stat-label">&#xAE30;&#xBCF8; &#xBE44;&#xAC70;&#xB9AC;</div></div><div class="v20-stat-card"><div class="v20-stat-val" style="color:'+(diff>=0?'#00FF88':'#FF6B6B')+'">'+adjDist+'yd</div><div class="v20-stat-label">&#xBCF4;&#xC815; &#xBE44;&#xAC70;&#xB9AC;</div></div><div class="v20-stat-card"><div class="v20-stat-val" style="color:#00B4D8">'+(diff>=0?'+':'')+diff+'yd</div><div class="v20-stat-label">&#xBC14;&#xB78C; &#xC601;&#xD5A5;</div></div></div></div>';
}
checkAchievements();
};

// ===== 7. PAR PERFORMANCE BREAKDOWN Canvas 600x380 =====
function showParPerformance(){
playSfx('par_open');
var pn=getPanel('parperf');
var data=lsGet('par_perf',{par3:[],par4:[],par5:[]});
var html='<button class="v20-close" onclick="window._v20Close(\'parperf\')">&times;</button>';
html+='<div class="v20-title">&#x26F3; Par&#xBCC4; &#xD37C;&#xD3EC;&#xBA3C;&#xC2A4; &#xBD84;&#xC11D;</div>';
html+='<canvas id="v20-par-canvas" width="600" height="380" style="width:100%;max-width:600px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v20-card"><h3>&#xC2A4;&#xCF54;&#xC5B4; &#xAE30;&#xB85D;</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px">';
html+='<div><label class="v20-label">Par</label><select id="v20-par-type" class="v20-input"><option value="par3">Par 3</option><option value="par4">Par 4</option><option value="par5">Par 5</option></select></div>';
html+='<div><label class="v20-label">&#xC2A4;&#xCF54;&#xC5B4;</label><input type="number" id="v20-par-score" class="v20-input" value="4" min="1" max="12"></div>';
html+='<div style="display:flex;align-items:flex-end"><button class="v20-btn v20-btn-primary" style="width:100%" onclick="window._v20LogPar()">&#xAE30;&#xB85D;</button></div>';
html+='</div></div>';
var stats=calcParStats(data);
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v20-stat-card"><div class="v20-stat-val" style="color:#00FF88">'+stats.par3Avg+'</div><div class="v20-stat-label">Par3 &#xD3C9;&#xADE0;</div></div>';
html+='<div class="v20-stat-card"><div class="v20-stat-val" style="color:#FFB800">'+stats.par4Avg+'</div><div class="v20-stat-label">Par4 &#xD3C9;&#xADE0;</div></div>';
html+='<div class="v20-stat-card"><div class="v20-stat-val" style="color:#00B4D8">'+stats.par5Avg+'</div><div class="v20-stat-label">Par5 &#xD3C9;&#xADE0;</div></div>';
html+='</div>';
if(data.par3.length+data.par4.length+data.par5.length>0){html+='<button class="v20-btn" style="width:100%;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'&#xCD08;&#xAE30;&#xD654;?\'))window._v20ResetPar()">&#xCD08;&#xAE30;&#xD654;</button>';}
pn.innerHTML=html;openPanel('parperf');drawParCanvas(data);
}
function calcParStats(data){
function avg(arr){if(arr.length===0)return'-';var s=0;for(var i=0;i<arr.length;i++)s+=arr[i];return(s/arr.length).toFixed(1);}
return{par3Avg:avg(data.par3),par4Avg:avg(data.par4),par5Avg:avg(data.par5)};
}
function drawParCanvas(data){
var c=document.getElementById('v20-par-canvas');if(!c)return;var ctx=c.getContext('2d');
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,600,380);
var categories=['Par 3','Par 4','Par 5'];var parData=[data.par3,data.par4,data.par5];
var parVal=[3,4,5];var colors=['#00FF88','#FFB800','#00B4D8'];
var barGroupW=150,startX=75,baseY=300;
for(var p=0;p<3;p++){
var arr=parData[p];var gx=startX+p*190;
if(arr.length===0){ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='11px sans-serif';ctx.textAlign='center';ctx.fillText('No data',gx+barGroupW/2,baseY-60);continue;}
var avg=0,best=arr[0],worst=arr[0];
for(var i=0;i<arr.length;i++){avg+=arr[i];if(arr[i]<best)best=arr[i];if(arr[i]>worst)worst=arr[i];}
avg/=arr.length;
var metrics=[{label:'Best',val:best},{label:'Avg',val:avg},{label:'Worst',val:worst}];
var maxVal=worst+1;
for(var m=0;m<3;m++){
var bx=gx+m*50;var h=(metrics[m].val/maxVal)*220;
var grad=ctx.createLinearGradient(bx,baseY-h,bx,baseY);
grad.addColorStop(0,colors[p]);grad.addColorStop(1,'rgba(0,0,0,0.3)');
ctx.fillStyle=grad;ctx.beginPath();ctx.roundRect(bx,baseY-h,40,h,4);ctx.fill();
ctx.fillStyle='#fff';ctx.font='bold 11px sans-serif';ctx.textAlign='center';
ctx.fillText(typeof metrics[m].val==='number'&&metrics[m].val%1!==0?metrics[m].val.toFixed(1):metrics[m].val,bx+20,baseY-h-8);
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='9px sans-serif';ctx.fillText(metrics[m].label,bx+20,baseY+14);
}
ctx.fillStyle=colors[p];ctx.font='bold 12px sans-serif';ctx.textAlign='center';ctx.fillText(categories[p]+' ('+arr.length+'R)',gx+barGroupW/2,baseY+35);
var parLine=baseY-(parVal[p]/maxVal)*220;
ctx.strokeStyle=colors[p];ctx.lineWidth=1;ctx.setLineDash([3,3]);ctx.beginPath();ctx.moveTo(gx,parLine);ctx.lineTo(gx+barGroupW,parLine);ctx.stroke();ctx.setLineDash([]);
ctx.fillStyle=colors[p];ctx.font='9px sans-serif';ctx.textAlign='right';ctx.fillText('Par '+parVal[p],gx-3,parLine+3);
}
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='11px sans-serif';ctx.textAlign='center';ctx.fillText('Par Performance: Best / Average / Worst per Par Type',300,370);
}
window._v20LogPar=function(){
var type=document.getElementById('v20-par-type').value;
var score=parseInt(document.getElementById('v20-par-score').value)||4;
var data=lsGet('par_perf',{par3:[],par4:[],par5:[]});
data[type].push(score);if(data[type].length>100)data[type]=data[type].slice(-100);
lsSet('par_perf',data);playSfx('par_open');showToast(type+': '+score+' recorded');showParPerformance();checkAchievements();
};
window._v20ResetPar=function(){lsSet('par_perf',{par3:[],par4:[],par5:[]});showParPerformance();};

// ===== 8. GOLF MENTAL GAME LOG Canvas 580x380 =====
function showMentalGame(){
playSfx('mental_open');
var pn=getPanel('mentalgame');
var data=lsGet('mental_log',[]);
var AXES=['&#xC790;&#xC2E0;&#xAC10;','&#xC9D1;&#xC911;&#xB825;','&#xD3C9;&#xC815;&#xC2EC;','&#xC778;&#xB0B4;&#xB825;','&#xD68C;&#xBCF5;&#xB825;'];
var html='<button class="v20-close" onclick="window._v20Close(\'mentalgame\')">&times;</button>';
html+='<div class="v20-title">&#x1F9E0; &#xBA58;&#xD138; &#xAC8C;&#xC784; &#xB85C;&#xADF8;</div>';
html+='<canvas id="v20-mental-canvas" width="580" height="380" style="width:100%;max-width:580px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v20-card"><h3>&#xBA58;&#xD138; &#xC0C1;&#xD0DC; &#xAE30;&#xB85D; (1-10)</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:4px">';
for(var a=0;a<AXES.length;a++){
var lastVal=data.length>0?data[data.length-1].scores[a]:5;
html+='<div><label class="v20-label" style="font-size:9px">'+AXES[a]+'</label><input type="number" id="v20-mental-'+a+'" class="v20-input" value="'+lastVal+'" min="1" max="10" style="text-align:center"></div>';
}
html+='</div>';
html+='<button class="v20-btn v20-btn-primary" style="width:100%;margin-top:8px" onclick="window._v20LogMental()">&#xBA58;&#xD138; &#xAE30;&#xB85D;</button>';
html+='</div>';
var lastEntry=data.length>0?data[data.length-1]:null;
var grade='-';if(lastEntry){var sum=0;for(var a=0;a<5;a++)sum+=lastEntry.scores[a];var avg=sum/5;grade=avg>=9?'S':avg>=7?'A':avg>=5?'B':avg>=3?'C':'D';}
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v20-stat-card"><div class="v20-stat-val" style="color:#00FF88">'+data.length+'</div><div class="v20-stat-label">&#xCD1D; &#xAE30;&#xB85D;</div></div>';
html+='<div class="v20-stat-card"><div class="v20-stat-val" style="color:#FFB800">'+grade+'</div><div class="v20-stat-label">&#xC885;&#xD569; &#xB4F1;&#xAE09;</div></div>';
html+='<div class="v20-stat-card"><div class="v20-stat-val" style="color:#00B4D8">'+(lastEntry?lastEntry.date:'-')+'</div><div class="v20-stat-label">&#xCD5C;&#xADFC; &#xAE30;&#xB85D;</div></div>';
html+='</div>';
if(data.length>0){html+='<button class="v20-btn" style="width:100%;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'&#xCD08;&#xAE30;&#xD654;?\'))window._v20ResetMental()">&#xCD08;&#xAE30;&#xD654;</button>';}
pn.innerHTML=html;openPanel('mentalgame');drawMentalCanvas(data);
}
function drawMentalCanvas(data){
var c=document.getElementById('v20-mental-canvas');if(!c)return;var ctx=c.getContext('2d');
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,580,380);
var AXES=['Confidence','Focus','Calm','Patience','Recovery'];
var colors=['#00FF88','#4ECDC4','#00B4D8','#FFB800','#A855F7'];
if(data.length===0){ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='14px sans-serif';ctx.textAlign='center';ctx.fillText('&#xBA58;&#xD138; &#xC0C1;&#xD0DC;&#xB97C; &#xAE30;&#xB85D;&#xD558;&#xBA74; Radar&#xAC00; &#xD45C;&#xC2DC;&#xB429;&#xB2C8;&#xB2E4;',290,190);return;}
var last=data[data.length-1].scores;
var cx=170,cy=190,r=120;
for(var ring=1;ring<=5;ring++){
ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.lineWidth=1;ctx.beginPath();
for(var a=0;a<=5;a++){var angle=-Math.PI/2+(a%5)*2*Math.PI/5;var rx=cx+Math.cos(angle)*(r*ring/5);var ry=cy+Math.sin(angle)*(r*ring/5);if(a===0)ctx.moveTo(rx,ry);else ctx.lineTo(rx,ry);}
ctx.closePath();ctx.stroke();
}
ctx.fillStyle='rgba(0,255,136,0.15)';ctx.strokeStyle='#00FF88';ctx.lineWidth=2;ctx.beginPath();
for(var a=0;a<5;a++){
var angle=-Math.PI/2+a*2*Math.PI/5;
var val=last[a]/10;
var px=cx+Math.cos(angle)*(r*val);var py=cy+Math.sin(angle)*(r*val);
if(a===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);
}
ctx.closePath();ctx.fill();ctx.stroke();
for(var a=0;a<5;a++){
var angle=-Math.PI/2+a*2*Math.PI/5;
ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='10px sans-serif';ctx.textAlign='center';
var lx=cx+Math.cos(angle)*(r+18);var ly=cy+Math.sin(angle)*(r+18);
ctx.fillText(AXES[a]+' ('+last[a]+')',lx,ly);
}
if(data.length>1){
var chartX=360,chartY=50,chartW=200,chartH=280;
var maxEntries=Math.min(data.length,10);
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='10px sans-serif';ctx.textAlign='center';ctx.fillText('Recent Trend (Last '+maxEntries+')',chartX+chartW/2,chartY-8);
for(var ax=0;ax<5;ax++){
ctx.strokeStyle=colors[ax];ctx.lineWidth=1.5;ctx.beginPath();
for(var i=0;i<maxEntries;i++){
var idx=data.length-maxEntries+i;
var x=chartX+i*(chartW/(maxEntries-1||1));
var y=chartY+chartH-(data[idx].scores[ax]/10)*chartH;
if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
}
ctx.stroke();
}
var ly=chartY+chartH+18;
for(var ax=0;ax<5;ax++){ctx.fillStyle=colors[ax];ctx.fillRect(chartX+ax*42,ly,8,8);ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='8px sans-serif';ctx.textAlign='left';ctx.fillText(AXES[ax].slice(0,4),chartX+ax*42+10,ly+7);}
}
}
window._v20LogMental=function(){
var scores=[];for(var a=0;a<5;a++){var el=document.getElementById('v20-mental-'+a);scores.push(el?parseInt(el.value)||5:5);}
var data=lsGet('mental_log',[]);data.push({scores:scores,date:todayStr()});
if(data.length>100)data=data.slice(-100);
lsSet('mental_log',data);playSfx('mental_log');showToast('Mental log saved');showMentalGame();checkAchievements();
};
window._v20ResetMental=function(){lsSet('mental_log',[]);showMentalGame();};

// ===== QUIZ v20 (+15 = 180->195) =====
var QUIZ_V20=[
{q:'&#xC0F7; &#xC250;&#xC774;&#xD551;&#xC5D0;&#xC11C; &#xD398;&#xC774;&#xB4DC;&#xB294; &#xC5B4;&#xB290; &#xBC29;&#xD5A5;&#xC73C;&#xB85C; &#xD718;&#xB294;&#xAC00;?',a:['&#xC67C;&#xCABD;&#xC73C;&#xB85C;','&#xC624;&#xB978;&#xCABD;&#xC73C;&#xB85C;','&#xC9C1;&#xC120;','&#xC704;&#xCABD;&#xC73C;&#xB85C;'],c:1},
{q:'&#xD074;&#xB7FD; &#xAC38;&#xD551;&#xC5D0;&#xC11C; &#xC774;&#xC0C1;&#xC801;&#xC778; &#xD074;&#xB7FD;&#xAC04; &#xBE44;&#xAC70;&#xB9AC; &#xCC28;&#xC774;&#xB294;?',a:['5-8yd','10-15yd','20-25yd','30yd &#xC774;&#xC0C1;'],c:1},
{q:'GIR(Green in Regulation)&#xC758; &#xC758;&#xBBF8;&#xB294;?',a:['&#xADDC;&#xC815; &#xD0C0;&#xC218; &#xC774;&#xB0B4;&#xB85C; &#xADF8;&#xB9B0; &#xC801;&#xC911;','2&#xD37C;&#xD2B8; &#xC131;&#xACF5;','&#xBC84;&#xB514; &#xD68D;&#xB4DD;','&#xD398;&#xC5B4;&#xC6E8;&#xC774; &#xC548;&#xCC29;'],c:0},
{q:'&#xBC14;&#xB78C;&#xC774; &#xC815;&#xBA74;(&#xC5ED;&#xD48D;)&#xC77C; &#xB54C; &#xBE44;&#xAC70;&#xB9AC;&#xC5D0; &#xBBF8;&#xCE58;&#xB294; &#xC601;&#xD5A5;&#xC740;?',a:['&#xAC10;&#xC18C;','&#xC99D;&#xAC00;','&#xBCC0;&#xD654; &#xC5C6;&#xC74C;','&#xC67C;&#xCABD;&#xC73C;&#xB85C; &#xD718;&#xC5B4;&#xC9D0;'],c:0},
{q:'Par 3 &#xD640;&#xC758; &#xD3C9;&#xADE0; &#xAC70;&#xB9AC;&#xB294; &#xC57D; &#xBA87; &#xC57C;&#xB4DC;?',a:['80-120','130-200','220-280','300+'],c:1},
{q:'&#xBA58;&#xD138; &#xAC8C;&#xC784;&#xC5D0;&#xC11C; &#xD3C9;&#xC815;&#xC2EC;&#xC774; &#xAC00;&#xC7A5; &#xC911;&#xC694;&#xD55C; &#xC0C1;&#xD669;&#xC740;?',a:['&#xD2F0;&#xC0F7;','&#xD37C;&#xD305;','&#xBC99;&#xCEE4; &#xD0C8;&#xCD9C;','&#xBAA8;&#xB450; &#xC911;&#xC694;'],c:3},
{q:'&#xC0F7; &#xBD84;&#xC0B0; &#xD328;&#xD134;&#xC5D0;&#xC11C; &#xC2AC;&#xB77C;&#xC774;&#xC2A4;&#xC758; &#xC6D0;&#xC778;&#xC740;?',a:['&#xC624;&#xD508; &#xD398;&#xC774;&#xC2A4;','&#xD074;&#xB85C;&#xC988;&#xB4DC; &#xD398;&#xC774;&#xC2A4;','&#xC544;&#xC6C3;&#xC0AC;&#xC774;&#xB4DC;&#xC778; &#xC2A4;&#xC717;&#xD328;&#xC2A4;','&#xC778;&#xC0AC;&#xC774;&#xB4DC;&#xC544;&#xC6C3; &#xC2A4;&#xC717;&#xD328;&#xC2A4;'],c:0},
{q:'&#xB77C;&#xC6B4;&#xB4DC; &#xBE44;&#xAD50; &#xC2DC; &#xAC00;&#xC7A5; &#xC911;&#xC694;&#xD55C; &#xC9C0;&#xD45C;&#xB294;?',a:['&#xCD1D;&#xD0C0;&#xC218;','&#xD3C9;&#xADE0; &#xD37C;&#xD305;&#xC218;','&#xC2A4;&#xD2B8;&#xB85C;&#xD06C; &#xAC8C;&#xC778;','GIR%'],c:2},
{q:'&#xBC14;&#xB78C; 20km/h &#xC5ED;&#xD48D;&#xC2DC; DR(250yd) &#xBE44;&#xAC70;&#xB9AC; &#xAC10;&#xC18C;&#xB7C9;&#xC740; &#xC57D;?',a:['5yd','10yd','15-20yd','30yd'],c:1},
{q:'&#xC2A4;&#xB9C8;&#xD2B8; &#xC5F0;&#xC2B5; &#xD50C;&#xB79C;&#xC5D0;&#xC11C; &#xC57D;&#xC810; &#xBD80;&#xBD84;&#xC5D0; &#xD22C;&#xC790;&#xD558;&#xB294; &#xC2DC;&#xAC04; &#xBE44;&#xC728;&#xC740;?',a:['20%','40-50%','70%','90%'],c:1},
{q:'PGA &#xD22C;&#xC5B4; &#xD3C9;&#xADE0; GIR &#xADFC;&#xC811;&#xB3C4;(&#xD540;&#xAE4C;&#xC9C0; &#xAC70;&#xB9AC;)&#xB294;?',a:['10ft','20-25ft','35ft','50ft'],c:1},
{q:'Par 5&#xD640;&#xC5D0;&#xC11C; &#xC774;&#xAE00;&#xC744; &#xC704;&#xD574; &#xD544;&#xC694;&#xD55C; &#xD0C0;&#xC218;&#xB294;?',a:['2&#xD0C0;','3&#xD0C0;','4&#xD0C0;','1&#xD0C0;'],c:1},
{q:'&#xD074;&#xB7FD; &#xAC38;&#xD551;&#xC5D0;&#xC11C; &#xD558;&#xC774;&#xBE0C;&#xB9AC;&#xB4DC; &#xD074;&#xB7FD;&#xC758; &#xC7A5;&#xC810;&#xC740;?',a:['&#xBB34;&#xAC8C;&#xAC00; &#xAC00;&#xBCBC;&#xC6C0;','&#xAC00;&#xACA9;&#xC774; &#xC800;&#xB834;','&#xAD00;&#xC6A9;&#xC131;&#xACFC; &#xBE44;&#xAC70;&#xB9AC; &#xADE0;&#xD615;','&#xC2A4;&#xD540;&#xB7C9;&#xC774; &#xB9CE;&#xC74C;'],c:2},
{q:'&#xBA58;&#xD138; &#xAC8C;&#xC784;&#xC5D0;&#xC11C; &#xD504;&#xB9AC;&#xC0F7; &#xB8E8;&#xD2F4;&#xC758; &#xBAA9;&#xC801;&#xC740;?',a:['&#xC2DC;&#xAC04; &#xC808;&#xC57D;','&#xC77C;&#xAD00;&#xC131; &#xD655;&#xBCF4;','&#xB3D9;&#xBC18;&#xC790; &#xBC30;&#xB824;','&#xCCB4;&#xB825; &#xC808;&#xC57D;'],c:1},
{q:'&#xC21C;&#xD48D;(Tailwind) &#xC2DC; &#xC0F7;&#xC758; &#xD2B9;&#xC131; &#xBCC0;&#xD654;&#xB294;?',a:['&#xC2A4;&#xD540; &#xAC10;&#xC18C;+&#xBE44;&#xAC70;&#xB9AC; &#xC99D;&#xAC00;','&#xBE44;&#xAC70;&#xB9AC; &#xAC10;&#xC18C;','&#xC0AC;&#xC774;&#xB4DC;&#xC2A4;&#xD540; &#xC99D;&#xAC00;','&#xD0C4;&#xB3C4; &#xB0AE;&#xC544;&#xC9D0;+&#xBE44;&#xAC70;&#xB9AC; &#xC99D;&#xAC00;'],c:3}
];
function showQuizV20(){
playSfx('quiz_correct_v20');
var pn=getPanel('quizv20');
var qIdx=lsGet('quiz_v20_idx',0);var score=lsGet('quiz_v20_score',0);var total=lsGet('quiz_v20_total',0);
if(qIdx>=QUIZ_V20.length)qIdx=0;
var q=QUIZ_V20[qIdx];
var html='<button class="v20-close" onclick="window._v20Close(\'quizv20\')">&times;</button>';
html+='<div class="v20-title">&#x1F4DA; Golf Quiz v20 ('+(qIdx+1)+'/'+QUIZ_V20.length+')</div>';
html+='<div class="v20-card"><h3>'+q.q+'</h3>';
html+='<div style="display:grid;gap:6px;margin-top:8px">';
for(var a=0;a<q.a.length;a++){
html+='<button class="v20-btn" style="width:100%;text-align:left;padding:10px" onclick="window._v20AnswerQuiz('+a+','+q.c+')">'+String.fromCharCode(65+a)+'. '+q.a[a]+'</button>';
}
html+='</div></div>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v20-stat-card"><div class="v20-stat-val" style="color:#00FF88">'+score+'</div><div class="v20-stat-label">&#xC815;&#xB2F5;</div></div>';
html+='<div class="v20-stat-card"><div class="v20-stat-val" style="color:#FF6B6B">'+total+'</div><div class="v20-stat-label">&#xCD1D; &#xD480;&#xC774;</div></div>';
html+='<div class="v20-stat-card"><div class="v20-stat-val" style="color:#FFB800">'+(total>0?Math.round(score/total*100):0)+'%</div><div class="v20-stat-label">&#xC815;&#xB2F5;&#xB960;</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('quizv20');
}
window._v20AnswerQuiz=function(sel,correct){
var score=lsGet('quiz_v20_score',0);var total=lsGet('quiz_v20_total',0);var qIdx=lsGet('quiz_v20_idx',0);
total++;
if(sel===correct){score++;playSfx('quiz_correct_v20');showToast('&#xC815;&#xB2F5;!');}
else{playSfx('quiz_wrong_v20');showToast('&#xC624;&#xB2F5;! &#xC815;&#xB2F5;: '+String.fromCharCode(65+correct));}
qIdx++;
lsSet('quiz_v20_score',score);lsSet('quiz_v20_total',total);lsSet('quiz_v20_idx',qIdx);
setTimeout(showQuizV20,800);checkAchievements();
};

// ===== ACHIEVEMENTS v20 (+12 = 144->156) =====
var ACHIEVEMENTS_V20=[
{id:'shape_tracker',name:'Shot Shape Tracker',desc:'&#xC0F7; &#xC250;&#xC774;&#xD504; 10&#xD68C; &#xAE30;&#xB85D;',check:function(){return lsGet('shape_log',[]).length>=10}},
{id:'gap_analyst',name:'Gap Analyst',desc:'&#xD074;&#xB7FD; &#xAC38;&#xD551; &#xBD84;&#xC11D; &#xC644;&#xB8CC;',check:function(){return lsGet('gap_data',null)!==null}},
{id:'round_comparer',name:'Round Comparer',desc:'&#xB77C;&#xC6B4;&#xB4DC; &#xBE44;&#xAD50; 3&#xD68C;',check:function(){return lsGet('compare_rounds',[]).length>=3}},
{id:'practice_planner',name:'Practice Planner',desc:'&#xC5F0;&#xC2B5; &#xD50C;&#xB79C; &#xC0DD;&#xC131;',check:function(){return lsGet('practice_plan',null)!==null}},
{id:'gir_collector',name:'GIR Collector',desc:'GIR &#xADFC;&#xC811;&#xB3C4; 20&#xD68C; &#xAE30;&#xB85D;',check:function(){return lsGet('gir_prox',[]).length>=20}},
{id:'wind_master',name:'Wind Master',desc:'&#xBC14;&#xB78C; &#xACC4;&#xC0B0; 5&#xD68C; &#xC0AC;&#xC6A9;',check:function(){return lsGet('wind_uses',0)>=5}},
{id:'par_recorder',name:'Par Recorder',desc:'Par&#xBCC4; &#xC2A4;&#xCF54;&#xC5B4; 30&#xD68C; &#xAE30;&#xB85D;',check:function(){var d=lsGet('par_perf',{par3:[],par4:[],par5:[]});return d.par3.length+d.par4.length+d.par5.length>=30}},
{id:'mental_coach',name:'Mental Coach',desc:'&#xBA58;&#xD138; &#xB85C;&#xADF8; 10&#xD68C;',check:function(){return lsGet('mental_log',[]).length>=10}},
{id:'quiz_v20_master',name:'Quiz v20 Master',desc:'v20 &#xD034;&#xC988; &#xC804;&#xBB38; &#xC815;&#xB2F5;',check:function(){return lsGet('quiz_v20_score',0)>=15}},
{id:'quiz_v20_clear',name:'Quiz v20 Clear',desc:'v20 &#xD034;&#xC988; &#xC644;&#xC8FC;',check:function(){return lsGet('quiz_v20_total',0)>=15}},
{id:'shape_50',name:'Shape Expert',desc:'&#xC0F7; &#xC250;&#xC774;&#xD504; 50&#xD68C;',check:function(){return lsGet('shape_log',[]).length>=50}},
{id:'v20_complete',name:'v20 Complete',desc:'v20 &#xC804;&#xCCB4; &#xAE30;&#xB2A5; &#xD0D0;&#xC0C9;',check:function(){return lsGet('v20_explored',0)>=8}}
];
function checkAchievements(){
var unlocked=lsGet('achievements_v20',[]);
for(var i=0;i<ACHIEVEMENTS_V20.length;i++){
var a=ACHIEVEMENTS_V20[i];
if(unlocked.indexOf(a.id)===-1&&a.check()){
unlocked.push(a.id);lsSet('achievements_v20',unlocked);
playSfx('achieve_v20');showToast('&#x1F3C6; '+a.name+' unlocked!');
}
}
}
var explored=lsGet('v20_explored',0);
function markExplored(){explored++;lsSet('v20_explored',explored);}

// ===== CSS =====
var style=document.createElement('style');
style.textContent='.v20-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:10020;display:none;align-items:center;justify-content:center;padding:16px;overflow-y:auto}.v20-overlay.active{display:flex}.v20-panel{background:#14141a;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:20px;max-width:660px;width:100%;max-height:90vh;overflow-y:auto;position:relative}.v20-close{position:absolute;top:12px;right:12px;background:none;border:none;color:#fff;font-size:24px;cursor:pointer;z-index:2;opacity:0.7}.v20-close:hover{opacity:1}.v20-title{font-size:18px;font-weight:bold;color:#fff;margin-bottom:12px;text-align:center}.v20-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;margin:8px 0}.v20-card h3{font-size:13px;color:rgba(255,255,255,0.7);margin-bottom:6px}.v20-label{font-size:10px;color:rgba(255,255,255,0.5);display:block;margin-bottom:2px}.v20-input{width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:6px;color:#fff;padding:6px 8px;font-size:12px;outline:none}.v20-input:focus{border-color:#00FF88}.v20-range{width:100%}.v20-btn{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);border-radius:8px;color:#fff;padding:8px 12px;font-size:12px;cursor:pointer;transition:all 0.2s}.v20-btn:hover{background:rgba(255,255,255,0.12)}.v20-btn-primary{background:rgba(0,255,136,0.15);border-color:rgba(0,255,136,0.3);color:#00FF88}.v20-btn-primary:hover{background:rgba(0,255,136,0.25)}.v20-btn-sm{padding:6px 8px;font-size:11px}.v20-stat-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:10px;text-align:center}.v20-stat-val{font-size:18px;font-weight:bold}.v20-stat-label{font-size:9px;color:rgba(255,255,255,0.5);margin-top:2px}.v20-toast{position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(20px);background:rgba(0,255,136,0.15);border:1px solid rgba(0,255,136,0.3);color:#00FF88;padding:10px 20px;border-radius:10px;font-size:13px;z-index:10030;opacity:0;transition:all 0.3s}.v20-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}';
document.head.appendChild(style);

// ===== NAVIGATION =====
window._v20Close=function(id){closePanel(id);};
function addNavButtons(){
var existing=document.querySelector('.v16-scroll-nav')||document.querySelector('.gt-bottom-nav')||document.querySelector('[style*="position:fixed"][style*="bottom"]');
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
{label:'Shape',fn:showShotShape,icon:'&#x1F3AF;'},
{label:'Gap',fn:showClubGapping,icon:'&#x1F4CA;'},
{label:'Compare',fn:showRoundCompare,icon:'&#x1F4C8;'},
{label:'Plan',fn:showPracticePlan,icon:'&#x1F4DD;'},
{label:'GIR',fn:showGIRProximity,icon:'&#x1F3CC;'},
{label:'Wind',fn:showWindCalc,icon:'&#x1F32C;&#xFE0F;'},
{label:'Par',fn:showParPerformance,icon:'&#x26F3;'},
{label:'Mental',fn:showMentalGame,icon:'&#x1F9E0;'},
{label:'Quiz20',fn:showQuizV20,icon:'&#x1F4DA;'}
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
case'!':case'1':showShotShape();markExplored();break;
case'@':case'2':showClubGapping();markExplored();break;
case'#':case'3':showRoundCompare();markExplored();break;
case'$':case'4':showPracticePlan();markExplored();break;
case'%':case'5':showGIRProximity();markExplored();break;
case'^':case'6':showWindCalc();markExplored();break;
case'&':case'7':showParPerformance();markExplored();break;
case'*':case'8':showMentalGame();markExplored();break;
case'(':case'9':showQuizV20();markExplored();break;
}
});

// ===== INIT =====
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',addNavButtons);}
else{setTimeout(addNavButtons,1500);}
setTimeout(checkAchievements,3000);
})();
