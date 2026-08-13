(function(){
'use strict';
var LS='gt_v28_';
var audioCtx=null;
function getAC(){if(!audioCtx)try{audioCtx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}return audioCtx}
function playSfx(type){var ac=getAC();if(!ac)return;var o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);var t=ac.currentTime;g.gain.setValueAtTime(0.1,t);switch(type){case'group_open':o.type='sine';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(659,t+0.05);o.frequency.linearRampToValueAtTime(784,t+0.1);o.frequency.linearRampToValueAtTime(988,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'pace_open':o.type='sine';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(554,t+0.06);o.frequency.linearRampToValueAtTime(698,t+0.12);g.gain.exponentialRampToValueAtTime(0.01,t+0.28);o.start(t);o.stop(t+0.28);break;case'roi_open':o.type='sine';o.frequency.setValueAtTime(392,t);o.frequency.linearRampToValueAtTime(523,t+0.05);o.frequency.linearRampToValueAtTime(659,t+0.1);o.frequency.linearRampToValueAtTime(831,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'elev_open':o.type='sine';o.frequency.setValueAtTime(349,t);o.frequency.linearRampToValueAtTime(466,t+0.06);o.frequency.linearRampToValueAtTime(587,t+0.12);g.gain.exponentialRampToValueAtTime(0.01,t+0.26);o.start(t);o.stop(t+0.26);break;case'sg_open':o.type='sine';o.frequency.setValueAtTime(587,t);o.frequency.linearRampToValueAtTime(740,t+0.05);o.frequency.linearRampToValueAtTime(880,t+0.1);o.frequency.linearRampToValueAtTime(1047,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'contour_open':o.type='sine';o.frequency.setValueAtTime(466,t);o.frequency.linearRampToValueAtTime(587,t+0.06);o.frequency.linearRampToValueAtTime(740,t+0.12);g.gain.exponentialRampToValueAtTime(0.01,t+0.26);o.start(t);o.stop(t+0.26);break;case'combo_open':o.type='sine';o.frequency.setValueAtTime(554,t);o.frequency.linearRampToValueAtTime(698,t+0.05);o.frequency.linearRampToValueAtTime(880,t+0.1);g.gain.exponentialRampToValueAtTime(0.01,t+0.25);o.start(t);o.stop(t+0.25);break;case'strategy_open':o.type='sine';o.frequency.setValueAtTime(659,t);o.frequency.linearRampToValueAtTime(831,t+0.05);o.frequency.linearRampToValueAtTime(988,t+0.1);o.frequency.linearRampToValueAtTime(1175,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.32);o.start(t);o.stop(t+0.32);break;case'quiz_correct_v28':o.type='sine';o.frequency.setValueAtTime(880,t);o.frequency.setValueAtTime(1109,t+0.08);o.frequency.setValueAtTime(1319,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'quiz_wrong_v28':o.type='sawtooth';o.frequency.setValueAtTime(311,t);o.frequency.linearRampToValueAtTime(233,t+0.2);g.gain.setValueAtTime(0.06,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'achieve_v28':o.type='sine';o.frequency.setValueAtTime(1109,t);o.frequency.setValueAtTime(1319,t+0.1);o.frequency.setValueAtTime(1568,t+0.2);o.frequency.setValueAtTime(1976,t+0.3);g.gain.exponentialRampToValueAtTime(0.01,t+0.5);o.start(t);o.stop(t+0.5);break;case'nav_v28':o.type='sine';o.frequency.setValueAtTime(831,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.08);o.start(t);o.stop(t+0.08);break;case'save_v28':o.type='triangle';o.frequency.setValueAtTime(622,t);o.frequency.linearRampToValueAtTime(932,t+0.1);g.gain.exponentialRampToValueAtTime(0.01,t+0.2);o.start(t);o.stop(t+0.2);break;case'hover_v28':o.type='sine';o.frequency.setValueAtTime(1175,t);g.gain.setValueAtTime(0.04,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.05);o.start(t);o.stop(t+0.05);break;case'click_v28':o.type='sine';o.frequency.setValueAtTime(698,t);o.frequency.linearRampToValueAtTime(880,t+0.06);g.gain.exponentialRampToValueAtTime(0.01,t+0.12);o.start(t);o.stop(t+0.12);break;case'reset_v28':o.type='square';o.frequency.setValueAtTime(370,t);o.frequency.linearRampToValueAtTime(247,t+0.15);g.gain.setValueAtTime(0.05,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.25);o.start(t);o.stop(t+0.25);break;default:o.type='sine';o.frequency.setValueAtTime(440,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.15);o.start(t);o.stop(t+0.15)}}

function lsGet(k,d){try{var v=localStorage.getItem(LS+k);return v?JSON.parse(v):d}catch(e){return d}}
function lsSet(k,v){try{localStorage.setItem(LS+k,JSON.stringify(v))}catch(e){}}
function todayStr(){return new Date().toISOString().slice(0,10)}
function showToast(msg){var t=document.createElement('div');t.className='v28-toast';t.textContent=msg;document.body.appendChild(t);setTimeout(function(){t.classList.add('show')},50);setTimeout(function(){t.classList.remove('show');setTimeout(function(){t.remove()},400)},3000)}
function createOverlay(id){var ov=document.createElement('div');ov.className='v28-overlay';ov.id='v28-'+id;ov.addEventListener('click',function(e){if(e.target===ov)closePanel(id)});var pn=document.createElement('div');pn.className='v28-panel';pn.style.position='relative';ov.appendChild(pn);return pn}
function openPanel(id){var el=document.getElementById('v28-'+id);if(el)el.classList.add('active')}
function closePanel(id){var el=document.getElementById('v28-'+id);if(el)el.classList.remove('active')}
function getPanel(id){var ov=document.getElementById('v28-'+id);if(!ov){var pn=createOverlay(id);pn.id='v28-'+id+'-panel';document.body.appendChild(pn.parentElement);return pn}return ov.querySelector('.v28-panel')||ov}

// ===== 1. SHOT GROUPING DENSITY ANALYZER Canvas 620x400 =====
var CLUBS_14=['Driver','3W','5W','3I','4I','5I','6I','7I','8I','9I','PW','GW','SW','LW'];
var CLUB_AVG_D=[250,230,210,200,190,180,170,160,150,140,130,115,100,80];
var CLUB_SPREAD=[22,18,16,16,14,13,12,11,10,9,8,7,6,5];
var CLUB_COLORS=['#FF6B6B','#FF9F43','#FECA57','#48DBFB','#00FF88','#A855F7','#FF85A2','#4ECDC4','#00B4D8','#E0BBE4','#957DAD','#D291BC','#FEC89A','#A8D8EA'];
function seedRandom(s){return function(){s=(s*9301+49297)%233280;return s/233280}}
function showGroupingAnalyzer(){
playSfx('group_open');
var pn=getPanel('group');
var selClub=lsGet('group_club',0);
var html='<button class="v28-close" onclick="window._v28Close(\'group\')">&times;</button>';
html+='<div class="v28-title">&#x1F3AF; &#xC0F7; &#xADF8;&#xB8E8;&#xD551; &#xBC00;&#xB3C4; &#xBD84;&#xC11D;&#xAE30;</div>';
html+='<canvas id="v28-group-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v28-card"><h3>&#xD074;&#xB7FD; &#xC120;&#xD0DD;</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;margin-bottom:6px">';
for(var i=0;i<7;i++){
html+='<button class="v28-btn v28-btn-sm'+(i===selClub?' v28-btn-primary':'')+'" onclick="window._v28SelGroup('+i+')">'+CLUBS_14[i]+'</button>';
}
html+='</div><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px">';
for(var i=7;i<14;i++){
html+='<button class="v28-btn v28-btn-sm'+(i===selClub?' v28-btn-primary':'')+'" onclick="window._v28SelGroup('+i+')">'+CLUBS_14[i]+'</button>';
}
html+='</div></div>';
var spread=CLUB_SPREAD[selClub];
var cep=Math.round(spread*0.675);
var grade=cep<6?'S':cep<9?'A':cep<13?'B':cep<17?'C':'D';
var gradeColor=grade==='S'?'#00FF88':grade==='A'?'#4ECDC4':grade==='B'?'#FECA57':grade==='C'?'#FF9F43':'#FF6B6B';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v28-stat-card"><div class="v28-stat-val" style="color:#00FF88">'+CLUB_AVG_D[selClub]+'yd</div><div class="v28-stat-label">&#xD3C9;&#xADE0; &#xBE44;&#xAC70;&#xB9AC;</div></div>';
html+='<div class="v28-stat-card"><div class="v28-stat-val" style="color:#FFB800">&plusmn;'+spread+'yd</div><div class="v28-stat-label">&#xBD84;&#xC0B0; &#xBC94;&#xC704;</div></div>';
html+='<div class="v28-stat-card"><div class="v28-stat-val" style="color:#A855F7">'+cep+'yd</div><div class="v28-stat-label">CEP &#xBC18;&#xACBD;</div></div>';
html+='<div class="v28-stat-card"><div class="v28-stat-val" style="color:'+gradeColor+'">'+grade+'</div><div class="v28-stat-label">&#xC815;&#xBC00;&#xB3C4; &#xB4F1;&#xAE09;</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('group');drawGroupCanvas(selClub);
}
window._v28SelGroup=function(i){lsSet('group_club',i);showGroupingAnalyzer();};
function drawGroupCanvas(clubIdx){
var c=document.getElementById('v28-group-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);
var grd=ctx.createLinearGradient(0,0,0,H);grd.addColorStop(0,'#0f1729');grd.addColorStop(1,'#1a1a2e');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText(CLUBS_14[clubIdx]+' Shot Grouping Density',W/2,24);
var L=60,R=W-30,B=H-50,T=55;
var spread=CLUB_SPREAD[clubIdx];
var cX=(L+R)/2,cY=(T+B)/2;
var rng=seedRandom(clubIdx*1000+42);
var points=[];
for(var i=0;i<60;i++){
var angle=rng()*Math.PI*2;
var r=rng()*spread*2.5;
var px=cX+Math.cos(angle)*r*(R-L)/(spread*10);
var py=cY+Math.sin(angle)*r*(B-T)/(spread*8);
points.push({x:px,y:py});
}
ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.lineWidth=0.5;
for(var gy=T;gy<=B;gy+=40){ctx.beginPath();ctx.moveTo(L,gy);ctx.lineTo(R,gy);ctx.stroke();}
for(var gx=L;gx<=R;gx+=40){ctx.beginPath();ctx.moveTo(gx,T);ctx.lineTo(gx,B);ctx.stroke();}
var cep=Math.round(spread*0.675);
var radii=[cep*0.5,cep,cep*1.5,cep*2.5];
var colors=['rgba(0,255,136,0.12)','rgba(78,205,196,0.1)','rgba(255,184,0,0.08)','rgba(255,107,107,0.06)'];
var scaleX=(R-L)/(spread*10);
var scaleY=(B-T)/(spread*8);
for(var ri=radii.length-1;ri>=0;ri--){
ctx.beginPath();ctx.ellipse(cX,cY,radii[ri]*scaleX,radii[ri]*scaleY,0,0,Math.PI*2);
ctx.fillStyle=colors[ri];ctx.fill();
ctx.strokeStyle=ri===1?'rgba(0,255,136,0.5)':'rgba(255,255,255,0.15)';
ctx.lineWidth=ri===1?2:0.5;ctx.stroke();
}
ctx.fillStyle='#fff';ctx.font='9px sans-serif';
ctx.fillText('CEP='+cep+'yd',cX+radii[1]*scaleX+12,cY-5);
var clr=CLUB_COLORS[clubIdx];
for(var i=0;i<points.length;i++){
var p=points[i];
ctx.beginPath();ctx.arc(p.x,p.y,4,0,Math.PI*2);
ctx.fillStyle=clr;ctx.globalAlpha=0.7;ctx.fill();
ctx.strokeStyle='rgba(255,255,255,0.3)';ctx.lineWidth=0.5;ctx.stroke();
ctx.globalAlpha=1;
}
ctx.beginPath();ctx.arc(cX,cY,3,0,Math.PI*2);
ctx.fillStyle='#fff';ctx.fill();
ctx.strokeStyle='#00FF88';ctx.lineWidth=2;ctx.stroke();
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='10px sans-serif';ctx.textAlign='left';
ctx.fillText('Lateral (yd)',R-60,B+30);ctx.textAlign='center';
ctx.save();ctx.translate(15,H/2);ctx.rotate(-Math.PI/2);ctx.fillText('Depth (yd)',0,0);ctx.restore();
var labels=['50%','CEP','90%','99%'];
for(var ri=0;ri<radii.length;ri++){
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='8px sans-serif';ctx.textAlign='center';
ctx.fillText(labels[ri],cX,cY-radii[ri]*scaleY-3);
}
}

// ===== 2. ROUND PACING STRATEGY Canvas 640x400 =====
var PAR_TIMES=[12,14,10,14,12,10,14,12,10,14,12,10,12,14,10,14,12,10];
var HOLE_PARS=[4,5,3,5,4,3,5,4,3,5,4,3,4,5,3,5,4,3];
function showPacingStrategy(){
playSfx('pace_open');
var pn=getPanel('pace');
var paceData=lsGet('pace_data',[]);
var html='<button class="v28-close" onclick="window._v28Close(\'pace\')">&times;</button>';
html+='<div class="v28-title">&#x23F1;&#xFE0F; &#xB77C;&#xC6B4;&#xB4DC; &#xD398;&#xC774;&#xC2F1; &#xC804;&#xB7B5;</div>';
html+='<canvas id="v28-pace-canvas" width="640" height="400" style="width:100%;max-width:640px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v28-card"><h3>&#xD640; &#xC2DC;&#xAC04; &#xAE30;&#xB85D; (&#xBD84;)</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:4px">';
for(var h=0;h<18;h++){
var val=paceData[h]||PAR_TIMES[h];
html+='<div><label class="v28-label">H'+(h+1)+' (P'+HOLE_PARS[h]+')</label><input class="v28-input v28-pace-input" type="number" data-hole="'+h+'" value="'+val+'" min="5" max="30"></div>';
}
html+='</div>';
html+='<button class="v28-btn v28-btn-primary" style="width:100%;margin-top:8px" onclick="window._v28SavePace()">&#xC800;&#xC7A5; &amp; &#xBD84;&#xC11D;</button>';
html+='</div>';
var totalActual=0,totalIdeal=0;
for(var h=0;h<18;h++){totalActual+=(paceData[h]||PAR_TIMES[h]);totalIdeal+=PAR_TIMES[h];}
var diff=totalActual-totalIdeal;
var paceGrade=Math.abs(diff)<=5?'S':Math.abs(diff)<=15?'A':Math.abs(diff)<=25?'B':Math.abs(diff)<=40?'C':'D';
var pgColor=paceGrade==='S'?'#00FF88':paceGrade==='A'?'#4ECDC4':paceGrade==='B'?'#FECA57':paceGrade==='C'?'#FF9F43':'#FF6B6B';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v28-stat-card"><div class="v28-stat-val" style="color:#00FF88">'+totalIdeal+'m</div><div class="v28-stat-label">&#xC774;&#xC0C1;&#xC2DC;&#xAC04;</div></div>';
html+='<div class="v28-stat-card"><div class="v28-stat-val" style="color:#FFB800">'+totalActual+'m</div><div class="v28-stat-label">&#xC2E4;&#xC81C;&#xC2DC;&#xAC04;</div></div>';
html+='<div class="v28-stat-card"><div class="v28-stat-val" style="color:'+(diff>0?'#FF6B6B':'#00FF88')+'">'+(diff>0?'+':'')+diff+'m</div><div class="v28-stat-label">&#xCC28;&#xC774;</div></div>';
html+='<div class="v28-stat-card"><div class="v28-stat-val" style="color:'+pgColor+'">'+paceGrade+'</div><div class="v28-stat-label">&#xD398;&#xC774;&#xC2F1; &#xB4F1;&#xAE09;</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('pace');drawPaceCanvas(paceData);
}
window._v28SavePace=function(){
var inputs=document.querySelectorAll('.v28-pace-input');
var data=[];
inputs.forEach(function(inp){data[parseInt(inp.dataset.hole)]=parseInt(inp.value)||12;});
lsSet('pace_data',data);playSfx('save_v28');showToast('Pace data saved!');checkAchievements();showPacingStrategy();
};
function drawPaceCanvas(paceData){
var c=document.getElementById('v28-pace-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=640,H=400;ctx.clearRect(0,0,W,H);
var grd=ctx.createLinearGradient(0,0,0,H);grd.addColorStop(0,'#0f1729');grd.addColorStop(1,'#1a1a2e');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Round Pacing Strategy (18H)',W/2,24);
var L=50,R=W-20,B=H-45,T=50;
var barW=(R-L)/18-4;
var maxTime=30;
ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.lineWidth=0.5;
for(var gy=0;gy<=maxTime;gy+=5){
var y=B-(gy/maxTime)*(B-T);
ctx.beginPath();ctx.moveTo(L,y);ctx.lineTo(R,y);ctx.stroke();
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='9px sans-serif';ctx.textAlign='right';
ctx.fillText(gy+'m',L-4,y+3);
}
var cumActual=0,cumIdeal=0;
for(var h=0;h<18;h++){
var actual=paceData[h]||PAR_TIMES[h];
var ideal=PAR_TIMES[h];
var x=L+h*((R-L)/18)+2;
var hActual=(actual/maxTime)*(B-T);
var hIdeal=(ideal/maxTime)*(B-T);
var overPace=actual>ideal+2;
ctx.fillStyle=overPace?'rgba(255,107,107,0.6)':'rgba(0,255,136,0.4)';
ctx.fillRect(x,B-hActual,barW*0.45,hActual);
ctx.fillStyle='rgba(78,205,196,0.3)';
ctx.fillRect(x+barW*0.5,B-hIdeal,barW*0.45,hIdeal);
ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='8px sans-serif';ctx.textAlign='center';
ctx.fillText('H'+(h+1),x+barW/2,B+12);
cumActual+=actual;cumIdeal+=ideal;
}
ctx.beginPath();ctx.strokeStyle='#FF9F43';ctx.lineWidth=2;
var cumA=0;
for(var h=0;h<18;h++){
cumA+=(paceData[h]||PAR_TIMES[h]);
var x=L+h*((R-L)/18)+barW/2+2;
var y=B-(cumA/(maxTime*18))*(B-T)*3;
y=Math.max(T,y);
if(h===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
}
ctx.stroke();
ctx.beginPath();ctx.strokeStyle='rgba(0,255,136,0.4)';ctx.lineWidth=1.5;ctx.setLineDash([4,3]);
var cumI=0;
for(var h=0;h<18;h++){
cumI+=PAR_TIMES[h];
var x=L+h*((R-L)/18)+barW/2+2;
var y=B-(cumI/(maxTime*18))*(B-T)*3;
y=Math.max(T,y);
if(h===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
}
ctx.stroke();ctx.setLineDash([]);
ctx.fillStyle='#FF9F43';ctx.font='9px sans-serif';ctx.textAlign='left';
ctx.fillText('&#x25CF; Actual cumulative',L+10,T-5);
ctx.fillStyle='rgba(0,255,136,0.6)';
ctx.fillText('- - Ideal cumulative',L+150,T-5);
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.textAlign='center';
ctx.fillText('Time (min)',W/2,B+32);
}

// ===== 3. PRACTICE SESSION ROI CALCULATOR Canvas 620x400 =====
var PRACTICE_TYPES=['Driving','Iron Shots','Short Game','Putting','Bunker','Course Play','Fitness','Mental'];
var PRACTICE_COLORS=['#FF6B6B','#FF9F43','#FECA57','#00FF88','#4ECDC4','#A855F7','#FF85A2','#48DBFB'];
var PRACTICE_ROI=[0.8,1.2,1.8,2.2,1.5,1.6,0.6,1.0];
function showPracticeROI(){
playSfx('roi_open');
var pn=getPanel('roi');
var practData=lsGet('pract_data',{});
var html='<button class="v28-close" onclick="window._v28Close(\'roi\')">&times;</button>';
html+='<div class="v28-title">&#x1F4B0; &#xC5F0;&#xC2B5; &#xC138;&#xC158; ROI &#xACC4;&#xC0B0;&#xAE30;</div>';
html+='<canvas id="v28-roi-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v28-card"><h3>&#xC8FC;&#xAC04; &#xC5F0;&#xC2B5;&#xC2DC;&#xAC04; &#xAE30;&#xB85D; (&#xC2DC;&#xAC04;)</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px">';
for(var i=0;i<8;i++){
var val=practData[i]||0;
html+='<div><label class="v28-label">'+PRACTICE_TYPES[i]+'</label><input class="v28-input v28-roi-input" type="number" data-type="'+i+'" value="'+val+'" min="0" max="20" step="0.5"></div>';
}
html+='</div>';
html+='<button class="v28-btn v28-btn-primary" style="width:100%;margin-top:8px" onclick="window._v28SaveROI()">&#xC800;&#xC7A5; &amp; &#xBD84;&#xC11D;</button>';
html+='</div>';
var totalH=0,totalROI=0;
for(var i=0;i<8;i++){var h=practData[i]||0;totalH+=h;totalROI+=h*PRACTICE_ROI[i];}
var efficiency=totalH>0?Math.round(totalROI/totalH*100)/100:0;
var eGrade=efficiency>=1.8?'S':efficiency>=1.4?'A':efficiency>=1.0?'B':efficiency>=0.7?'C':'D';
var eColor=eGrade==='S'?'#00FF88':eGrade==='A'?'#4ECDC4':eGrade==='B'?'#FECA57':eGrade==='C'?'#FF9F43':'#FF6B6B';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v28-stat-card"><div class="v28-stat-val" style="color:#00FF88">'+totalH.toFixed(1)+'h</div><div class="v28-stat-label">&#xCD1D; &#xC5F0;&#xC2B5;&#xC2DC;&#xAC04;</div></div>';
html+='<div class="v28-stat-card"><div class="v28-stat-val" style="color:#FFB800">'+totalROI.toFixed(1)+'</div><div class="v28-stat-label">&#xCD1D; ROI &#xC810;&#xC218;</div></div>';
html+='<div class="v28-stat-card"><div class="v28-stat-val" style="color:#A855F7">'+efficiency+'</div><div class="v28-stat-label">&#xD6A8;&#xC728; &#xC9C0;&#xC218;</div></div>';
html+='<div class="v28-stat-card"><div class="v28-stat-val" style="color:'+eColor+'">'+eGrade+'</div><div class="v28-stat-label">ROI &#xB4F1;&#xAE09;</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('roi');drawROICanvas(practData);
}
window._v28SaveROI=function(){
var inputs=document.querySelectorAll('.v28-roi-input');
var data={};
inputs.forEach(function(inp){data[parseInt(inp.dataset.type)]=parseFloat(inp.value)||0;});
lsSet('pract_data',data);playSfx('save_v28');showToast('Practice ROI saved!');checkAchievements();showPracticeROI();
};
function drawROICanvas(practData){
var c=document.getElementById('v28-roi-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);
var grd=ctx.createLinearGradient(0,0,0,H);grd.addColorStop(0,'#0f1729');grd.addColorStop(1,'#1a1a2e');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Practice Session ROI Analysis',W/2,24);
var L=55,R=W-25,B=H-55,T=50;
var maxH=10,maxROI=2.5;
ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.lineWidth=0.5;
for(var gy=0;gy<=maxH;gy+=2){
var y=B-(gy/maxH)*(B-T);
ctx.beginPath();ctx.moveTo(L,y);ctx.lineTo(R,y);ctx.stroke();
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='9px sans-serif';ctx.textAlign='right';
ctx.fillText(gy+'h',L-4,y+3);
}
for(var gx=0;gx<=maxROI;gx+=0.5){
var x=L+(gx/maxROI)*(R-L);
ctx.beginPath();ctx.moveTo(x,T);ctx.lineTo(x,B);ctx.stroke();
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='9px sans-serif';ctx.textAlign='center';
ctx.fillText(gx.toFixed(1),x,B+14);
}
for(var i=0;i<8;i++){
var hours=practData[i]||0;
var roi=PRACTICE_ROI[i];
var x=L+(roi/maxROI)*(R-L);
var y=B-(hours/maxH)*(B-T);
var size=Math.max(8,Math.min(25,hours*4+6));
ctx.beginPath();ctx.arc(x,y,size,0,Math.PI*2);
ctx.fillStyle=PRACTICE_COLORS[i];ctx.globalAlpha=0.6;ctx.fill();ctx.globalAlpha=1;
ctx.strokeStyle=PRACTICE_COLORS[i];ctx.lineWidth=1.5;ctx.stroke();
ctx.fillStyle='#fff';ctx.font='bold 9px sans-serif';ctx.textAlign='center';
ctx.fillText(PRACTICE_TYPES[i],x,y-size-4);
if(hours>0){ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='8px sans-serif';ctx.fillText(hours.toFixed(1)+'h',x,y+3);}
}
ctx.beginPath();ctx.moveTo(L,B);
for(var rx=0;rx<=maxROI;rx+=0.05){
var x=L+(rx/maxROI)*(R-L);
var optH=rx*3;
var y=B-(optH/maxH)*(B-T);
ctx.lineTo(x,Math.max(T,y));
}
ctx.strokeStyle='rgba(0,255,136,0.3)';ctx.lineWidth=1.5;ctx.setLineDash([4,3]);ctx.stroke();ctx.setLineDash([]);
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='10px sans-serif';ctx.textAlign='center';
ctx.fillText('ROI Multiplier',W/2,B+34);
ctx.save();ctx.translate(14,H/2);ctx.rotate(-Math.PI/2);ctx.fillText('Practice Hours',0,0);ctx.restore();
ctx.fillStyle='rgba(0,255,136,0.4)';ctx.font='9px sans-serif';ctx.textAlign='right';
ctx.fillText('- - Optimal efficiency frontier',R,T-5);
}

// ===== 4. ELEVATION IMPACT ANALYZER Canvas 620x400 =====
var ELEV_ZONES=['Sea Level','300m','600m','900m','1200m','1500m+'];
var ELEV_FACTOR=[1.0,1.02,1.04,1.06,1.08,1.10];
var ELEV_CLUBS=['Driver','5W','5I','7I','9I','PW'];
var ELEV_BASE=[250,210,180,160,140,130];
function showElevationImpact(){
playSfx('elev_open');
var pn=getPanel('elev');
var selElev=lsGet('elev_sel',0);
var html='<button class="v28-close" onclick="window._v28Close(\'elev\')">&times;</button>';
html+='<div class="v28-title">&#x26F0;&#xFE0F; &#xACE0;&#xB3C4;/&#xACBD;&#xC0AC; &#xC601;&#xD5A5; &#xBD84;&#xC11D;&#xAE30;</div>';
html+='<canvas id="v28-elev-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v28-card"><h3>&#xACE0;&#xB3C4; &#xC120;&#xD0DD;</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:4px">';
for(var i=0;i<6;i++){
html+='<button class="v28-btn v28-btn-sm'+(i===selElev?' v28-btn-primary':'')+'" onclick="window._v28SelElev('+i+')">'+ELEV_ZONES[i]+'</button>';
}
html+='</div></div>';
var factor=ELEV_FACTOR[selElev];
var bonusPct=Math.round((factor-1)*100);
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v28-stat-card"><div class="v28-stat-val" style="color:#00FF88">'+ELEV_ZONES[selElev]+'</div><div class="v28-stat-label">&#xD604;&#xC7AC; &#xACE0;&#xB3C4;</div></div>';
html+='<div class="v28-stat-card"><div class="v28-stat-val" style="color:#FFB800">x'+factor.toFixed(2)+'</div><div class="v28-stat-label">&#xBCF4;&#xC815; &#xD329;&#xD130;</div></div>';
html+='<div class="v28-stat-card"><div class="v28-stat-val" style="color:#A855F7">+'+bonusPct+'%</div><div class="v28-stat-label">&#xBE44;&#xAC70;&#xB9AC; &#xC99D;&#xAC00;</div></div>';
html+='</div>';
html+='<div class="v28-card"><h3>&#xC5C5;&#xD790;/&#xB2E4;&#xC6B4;&#xD790; &#xBCF4;&#xC815;</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px">';
var slopes=[{name:'Flat',f:1.0},{name:'Uphill 5%',f:0.93},{name:'Uphill 10%',f:0.87},{name:'Downhill 5%',f:1.05},{name:'Downhill 10%',f:1.10},{name:'Sidehill',f:0.96}];
for(var i=0;i<6;i++){
var adjD=Math.round(ELEV_BASE[1]*factor*slopes[i].f);
var sColor=slopes[i].f>=1?'#00FF88':'#FF9F43';
html+='<div class="v28-stat-card"><div class="v28-stat-val" style="color:'+sColor+';font-size:14px">'+adjD+'yd</div><div class="v28-stat-label">'+slopes[i].name+'</div></div>';
}
html+='</div></div>';
pn.innerHTML=html;openPanel('elev');drawElevCanvas(selElev);
}
window._v28SelElev=function(i){lsSet('elev_sel',i);showElevationImpact();};
function drawElevCanvas(selElev){
var c=document.getElementById('v28-elev-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);
var grd=ctx.createLinearGradient(0,0,0,H);grd.addColorStop(0,'#0f1729');grd.addColorStop(1,'#1a1a2e');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Elevation Impact on Club Distances',W/2,24);
var L=65,R=W-25,B=H-50,T=55;
var maxD=290;
var barH=(B-T)/6-6;
ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.lineWidth=0.5;
for(var gx=0;gx<=maxD;gx+=50){
var x=L+(gx/maxD)*(R-L);
ctx.beginPath();ctx.moveTo(x,T);ctx.lineTo(x,B);ctx.stroke();
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='9px sans-serif';ctx.textAlign='center';
ctx.fillText(gx+'yd',x,B+14);
}
var factor=ELEV_FACTOR[selElev];
for(var i=0;i<6;i++){
var y=T+i*(barH+6);
var baseD=ELEV_BASE[i];
var adjD=Math.round(baseD*factor);
var wBase=(baseD/maxD)*(R-L);
var wAdj=(adjD/maxD)*(R-L);
ctx.fillStyle='rgba(78,205,196,0.25)';
ctx.fillRect(L,y,wBase,barH*0.45);
ctx.fillStyle='rgba(0,255,136,0.4)';
ctx.fillRect(L,y+barH*0.5,wAdj,barH*0.45);
ctx.strokeStyle='rgba(255,255,255,0.15)';ctx.lineWidth=0.5;
ctx.strokeRect(L,y,wBase,barH*0.45);
ctx.strokeRect(L,y+barH*0.5,wAdj,barH*0.45);
ctx.fillStyle='#fff';ctx.font='10px sans-serif';ctx.textAlign='right';
ctx.fillText(ELEV_CLUBS[i],L-6,y+barH*0.3);
ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='9px sans-serif';ctx.textAlign='left';
ctx.fillText(baseD+'yd',L+wBase+4,y+barH*0.3);
ctx.fillStyle='#00FF88';
ctx.fillText(adjD+'yd (+'+(adjD-baseD)+')',L+wAdj+4,y+barH*0.8);
}
ctx.fillStyle='rgba(78,205,196,0.5)';ctx.fillRect(R-180,T-10,10,10);
ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='9px sans-serif';ctx.textAlign='left';
ctx.fillText('Sea Level',R-166,T-2);
ctx.fillStyle='rgba(0,255,136,0.6)';ctx.fillRect(R-90,T-10,10,10);
ctx.fillText(ELEV_ZONES[selElev],R-76,T-2);
}

// ===== 5. STROKES GAINED TREND ANALYZER Canvas 640x400 =====
var SG_CATS=['OTT','Approach','Around','Putting'];
var SG_COLORS=['#FF6B6B','#FF9F43','#4ECDC4','#00FF88'];
function showSGTrend(){
playSfx('sg_open');
var pn=getPanel('sgtrend');
var sgData=lsGet('sg_trend_data',[]);
if(sgData.length===0){
var rng=seedRandom(2828);
for(var r=0;r<20;r++){
sgData.push({ott:(-0.5+rng()*2).toFixed(1)*1,app:(-0.8+rng()*2.2).toFixed(1)*1,atg:(-0.6+rng()*1.8).toFixed(1)*1,putt:(-0.7+rng()*2.0).toFixed(1)*1});
}
lsSet('sg_trend_data',sgData);
}
var html='<button class="v28-close" onclick="window._v28Close(\'sgtrend\')">&times;</button>';
html+='<div class="v28-title">&#x1F4C8; &#xC2A4;&#xD2B8;&#xB85C;&#xD06C; &#xAC8C;&#xC778; &#xD2B8;&#xB80C;&#xB4DC; &#xBD84;&#xC11D;&#xAE30;</div>';
html+='<canvas id="v28-sg-canvas" width="640" height="400" style="width:100%;max-width:640px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
var lastRound=sgData[sgData.length-1]||{ott:0,app:0,atg:0,putt:0};
var totalSG=(lastRound.ott+lastRound.app+lastRound.atg+lastRound.putt).toFixed(1);
var tColor=totalSG>=2?'#00FF88':totalSG>=0?'#4ECDC4':totalSG>=-1?'#FECA57':'#FF6B6B';
html+='<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin:8px 0">';
html+='<div class="v28-stat-card"><div class="v28-stat-val" style="color:#FF6B6B">'+lastRound.ott.toFixed(1)+'</div><div class="v28-stat-label">OTT</div></div>';
html+='<div class="v28-stat-card"><div class="v28-stat-val" style="color:#FF9F43">'+lastRound.app.toFixed(1)+'</div><div class="v28-stat-label">Approach</div></div>';
html+='<div class="v28-stat-card"><div class="v28-stat-val" style="color:#4ECDC4">'+lastRound.atg.toFixed(1)+'</div><div class="v28-stat-label">Around</div></div>';
html+='<div class="v28-stat-card"><div class="v28-stat-val" style="color:#00FF88">'+lastRound.putt.toFixed(1)+'</div><div class="v28-stat-label">Putting</div></div>';
html+='<div class="v28-stat-card"><div class="v28-stat-val" style="color:'+tColor+'">'+totalSG+'</div><div class="v28-stat-label">Total SG</div></div>';
html+='</div>';
html+='<div class="v28-card"><h3>&#xC0C8; &#xB77C;&#xC6B4;&#xB4DC; SG &#xAE30;&#xB85D;</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr) auto;gap:4px;align-items:end">';
html+='<div><label class="v28-label">OTT</label><input class="v28-input" id="v28-sg-ott" type="number" value="0" min="-3" max="3" step="0.1"></div>';
html+='<div><label class="v28-label">App</label><input class="v28-input" id="v28-sg-app" type="number" value="0" min="-3" max="3" step="0.1"></div>';
html+='<div><label class="v28-label">ATG</label><input class="v28-input" id="v28-sg-atg" type="number" value="0" min="-3" max="3" step="0.1"></div>';
html+='<div><label class="v28-label">Putt</label><input class="v28-input" id="v28-sg-putt" type="number" value="0" min="-3" max="3" step="0.1"></div>';
html+='<button class="v28-btn v28-btn-primary" onclick="window._v28AddSG()">&#xCD94;&#xAC00;</button>';
html+='</div></div>';
pn.innerHTML=html;openPanel('sgtrend');drawSGCanvas(sgData);
}
window._v28AddSG=function(){
var sgData=lsGet('sg_trend_data',[]);
var ott=parseFloat(document.getElementById('v28-sg-ott').value)||0;
var app=parseFloat(document.getElementById('v28-sg-app').value)||0;
var atg=parseFloat(document.getElementById('v28-sg-atg').value)||0;
var putt=parseFloat(document.getElementById('v28-sg-putt').value)||0;
sgData.push({ott:ott,app:app,atg:atg,putt:putt});
if(sgData.length>30)sgData=sgData.slice(-30);
lsSet('sg_trend_data',sgData);playSfx('save_v28');showToast('SG round added!');checkAchievements();showSGTrend();
};
function drawSGCanvas(sgData){
var c=document.getElementById('v28-sg-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=640,H=400;ctx.clearRect(0,0,W,H);
var grd=ctx.createLinearGradient(0,0,0,H);grd.addColorStop(0,'#0f1729');grd.addColorStop(1,'#1a1a2e');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Strokes Gained Trend (Last '+sgData.length+' Rounds)',W/2,24);
var L=55,R=W-25,B=H-50,T=55;
var maxSG=3,minSG=-2;
var range=maxSG-minSG;
var zeroY=B-((-minSG)/range)*(B-T);
ctx.strokeStyle='rgba(255,255,255,0.2)';ctx.lineWidth=1;
ctx.beginPath();ctx.moveTo(L,zeroY);ctx.lineTo(R,zeroY);ctx.stroke();
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='9px sans-serif';ctx.textAlign='right';
ctx.fillText('0',L-4,zeroY+3);
for(var gy=minSG;gy<=maxSG;gy+=1){
if(gy===0)continue;
var y=B-((gy-minSG)/range)*(B-T);
ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.lineWidth=0.5;
ctx.beginPath();ctx.moveTo(L,y);ctx.lineTo(R,y);ctx.stroke();
ctx.fillStyle='rgba(255,255,255,0.3)';ctx.fillText(gy>0?'+'+gy:''+gy,L-4,y+3);
}
var n=sgData.length;if(n<2)return;
var keys=['putt','atg','app','ott'];
for(var ki=0;ki<4;ki++){
var key=keys[ki];
ctx.beginPath();ctx.strokeStyle=SG_COLORS[3-ki];ctx.lineWidth=2;
for(var r=0;r<n;r++){
var x=L+r/(n-1)*(R-L);
var val=sgData[r][key]||0;
var y=B-((val-minSG)/range)*(B-T);
if(r===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
}
ctx.stroke();
ctx.beginPath();
for(var r=0;r<n;r++){
var x=L+r/(n-1)*(R-L);
var val=sgData[r][key]||0;
var y=B-((val-minSG)/range)*(B-T);
if(r===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
}
ctx.lineTo(R,zeroY);ctx.lineTo(L,zeroY);ctx.closePath();
ctx.fillStyle=SG_COLORS[3-ki].replace(')',',0.08)').replace('rgb','rgba');
ctx.fill();
}
var avgWindow=5;
if(n>=avgWindow){
ctx.beginPath();ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.setLineDash([6,3]);
for(var r=avgWindow-1;r<n;r++){
var sum=0;
for(var w=0;w<avgWindow;w++){var d=sgData[r-w];sum+=d.ott+d.app+d.atg+d.putt;}
var avg=sum/avgWindow;
var x=L+r/(n-1)*(R-L);
var y=B-((avg-minSG)/range)*(B-T);
if(r===avgWindow-1)ctx.moveTo(x,y);else ctx.lineTo(x,y);
}
ctx.stroke();ctx.setLineDash([]);
}
for(var ki=0;ki<4;ki++){
ctx.fillStyle=SG_COLORS[ki];ctx.fillRect(L+ki*90,T-12,8,8);
ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='9px sans-serif';ctx.textAlign='left';
ctx.fillText(SG_CATS[ki],L+ki*90+12,T-4);
}
ctx.fillStyle='#fff';ctx.fillRect(L+370,T-12,8,8);
ctx.fillStyle='rgba(255,255,255,0.6)';ctx.fillText('5R MA',L+382,T-4);
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.textAlign='center';
ctx.fillText('Rounds',W/2,B+30);
}

// ===== 6. GREEN CONTOUR READING MAP Canvas 620x400 =====
var GREEN_TYPES=['Flat','Front-to-Back','Back-to-Front','Left-to-Right','Right-to-Left'];
var GREEN_SPEED=[9,10,11,12,13];
function showGreenContour(){
playSfx('contour_open');
var pn=getPanel('contour');
var selGreen=lsGet('contour_green',0);
var selSpeed=lsGet('contour_speed',2);
var html='<button class="v28-close" onclick="window._v28Close(\'contour\')">&times;</button>';
html+='<div class="v28-title">&#x1F3CC;&#xFE0F; &#xADF8;&#xB9B0; &#xCEE8;&#xD22C;&#xC5B4; &#xB9AC;&#xB529; &#xB9F5;</div>';
html+='<canvas id="v28-contour-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v28-card"><h3>&#xADF8;&#xB9B0; &#xC720;&#xD615;</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:3px">';
for(var i=0;i<5;i++){
html+='<button class="v28-btn v28-btn-sm'+(i===selGreen?' v28-btn-primary':'')+'" onclick="window._v28SelContour('+i+')">'+GREEN_TYPES[i]+'</button>';
}
html+='</div></div>';
html+='<div class="v28-card"><h3>&#xADF8;&#xB9B0; &#xC2A4;&#xD53C;&#xB4DC; (Stimp)</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:3px">';
for(var i=0;i<5;i++){
html+='<button class="v28-btn v28-btn-sm'+(i===selSpeed?' v28-btn-primary':'')+'" onclick="window._v28SelSpeed('+i+')">'+GREEN_SPEED[i]+'</button>';
}
html+='</div></div>';
var speedGrade=GREEN_SPEED[selSpeed]>=12?'Fast':GREEN_SPEED[selSpeed]>=10?'Medium':'Slow';
var breakAdj=selGreen===0?'Minimal':selGreen<=2?'Front/Back':'Side';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v28-stat-card"><div class="v28-stat-val" style="color:#00FF88;font-size:14px">'+GREEN_TYPES[selGreen]+'</div><div class="v28-stat-label">&#xADF8;&#xB9B0; &#xC720;&#xD615;</div></div>';
html+='<div class="v28-stat-card"><div class="v28-stat-val" style="color:#FFB800">'+GREEN_SPEED[selSpeed]+'</div><div class="v28-stat-label">Stimpmeter</div></div>';
html+='<div class="v28-stat-card"><div class="v28-stat-val" style="color:#A855F7;font-size:14px">'+breakAdj+'</div><div class="v28-stat-label">&#xBE0C;&#xB808;&#xC774;&#xD06C;</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('contour');drawContourCanvas(selGreen,selSpeed);
}
window._v28SelContour=function(i){lsSet('contour_green',i);showGreenContour();};
window._v28SelSpeed=function(i){lsSet('contour_speed',i);showGreenContour();};
function drawContourCanvas(greenType,speedIdx){
var c=document.getElementById('v28-contour-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);
var grd=ctx.createLinearGradient(0,0,0,H);grd.addColorStop(0,'#0f1729');grd.addColorStop(1,'#1a1a2e');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Green Contour: '+GREEN_TYPES[greenType]+' (Stimp '+GREEN_SPEED[speedIdx]+')',W/2,24);
var cX=W/2,cY=H/2+10,rX=200,rY=150;
var contourLevels=6;
for(var lv=contourLevels;lv>=1;lv--){
var scale=lv/contourLevels;
ctx.beginPath();
var offX=0,offY=0;
if(greenType===1){offY=-15*scale;}
else if(greenType===2){offY=15*scale;}
else if(greenType===3){offX=15*scale;}
else if(greenType===4){offX=-15*scale;}
ctx.ellipse(cX+offX,cY+offY,rX*scale,rY*scale,0,0,Math.PI*2);
var hue=120-lv*15;
ctx.fillStyle='hsla('+hue+',60%,'+(20+lv*5)+'%,0.3)';
ctx.fill();
ctx.strokeStyle='hsla('+hue+',50%,50%,0.5)';ctx.lineWidth=1;ctx.stroke();
}
ctx.beginPath();ctx.ellipse(cX,cY,rX,rY,0,0,Math.PI*2);
ctx.strokeStyle='rgba(0,255,136,0.6)';ctx.lineWidth=2;ctx.stroke();
var pinX=cX+30,pinY=cY-20;
ctx.beginPath();ctx.arc(pinX,pinY,5,0,Math.PI*2);ctx.fillStyle='#FF3366';ctx.fill();
ctx.strokeStyle='#fff';ctx.lineWidth=1.5;ctx.stroke();
ctx.fillStyle='#fff';ctx.font='bold 9px sans-serif';ctx.textAlign='left';
ctx.fillText('PIN',pinX+8,pinY+3);
var arrows=[];
if(greenType===1){arrows=[{x:cX-80,y:cY-60,a:Math.PI*0.5},{x:cX+80,y:cY-60,a:Math.PI*0.5},{x:cX,y:cY+40,a:Math.PI*0.5}];}
else if(greenType===2){arrows=[{x:cX-80,y:cY+60,a:-Math.PI*0.5},{x:cX+80,y:cY+60,a:-Math.PI*0.5},{x:cX,y:cY-40,a:-Math.PI*0.5}];}
else if(greenType===3){arrows=[{x:cX-60,y:cY-50,a:0},{x:cX-60,y:cY+50,a:0},{x:cX+60,y:cY,a:0}];}
else if(greenType===4){arrows=[{x:cX+60,y:cY-50,a:Math.PI},{x:cX+60,y:cY+50,a:Math.PI},{x:cX-60,y:cY,a:Math.PI}];}
ctx.strokeStyle='rgba(255,184,0,0.7)';ctx.lineWidth=2;
for(var i=0;i<arrows.length;i++){
var ar=arrows[i];
ctx.beginPath();
ctx.moveTo(ar.x,ar.y);
ctx.lineTo(ar.x+Math.cos(ar.a)*25,ar.y+Math.sin(ar.a)*25);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(ar.x+Math.cos(ar.a)*25,ar.y+Math.sin(ar.a)*25);
ctx.lineTo(ar.x+Math.cos(ar.a)*18+Math.cos(ar.a+0.5)*8,ar.y+Math.sin(ar.a)*18+Math.sin(ar.a+0.5)*8);
ctx.moveTo(ar.x+Math.cos(ar.a)*25,ar.y+Math.sin(ar.a)*25);
ctx.lineTo(ar.x+Math.cos(ar.a)*18+Math.cos(ar.a-0.5)*8,ar.y+Math.sin(ar.a)*18+Math.sin(ar.a-0.5)*8);
ctx.stroke();
}
var aimX=pinX,aimY=pinY;
if(greenType===1){aimY-=15;}
else if(greenType===2){aimY+=15;}
else if(greenType===3){aimX-=20;}
else if(greenType===4){aimX+=20;}
if(greenType!==0){
ctx.beginPath();ctx.arc(aimX,aimY,4,0,Math.PI*2);ctx.fillStyle='#4ECDC4';ctx.fill();
ctx.strokeStyle='rgba(78,205,196,0.5)';ctx.setLineDash([3,3]);ctx.lineWidth=1;
ctx.beginPath();ctx.moveTo(aimX,aimY);ctx.lineTo(pinX,pinY);ctx.stroke();ctx.setLineDash([]);
ctx.fillStyle='#4ECDC4';ctx.font='bold 9px sans-serif';ctx.fillText('AIM',aimX+8,aimY+3);
}
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='10px sans-serif';ctx.textAlign='center';
ctx.fillText('Slope direction &#x2192; Break compensation',W/2,H-15);
ctx.fillStyle='rgba(255,184,0,0.6)';ctx.fillText('&#x21D2; Water flow direction',W/2,H-30);
}

// ===== 7. CLUB COMBINATION SIMULATOR Canvas 620x400 =====
var ALL_CLUBS=['Driver','3W','5W','2H','3H','4H','3I','4I','5I','6I','7I','8I','9I','PW','48&#xB3C4;','50&#xB3C4;','52&#xB3C4;','54&#xB3C4;','56&#xB3C4;','58&#xB3C4;','60&#xB3C4;','Putter'];
var ALL_DIST=[270,240,220,215,205,195,200,190,180,170,160,150,140,130,125,120,115,105,95,85,75,0];
function showClubCombo(){
playSfx('combo_open');
var pn=getPanel('combo');
var selected=lsGet('combo_sel',[0,2,8,9,10,11,12,13,15,17,19,20,21]);
if(selected.length>14)selected=selected.slice(0,14);
var html='<button class="v28-close" onclick="window._v28Close(\'combo\')">&times;</button>';
html+='<div class="v28-title">&#x1F3CC;&#xFE0F; &#xD074;&#xB7FD; &#xC870;&#xD569; &#xC2DC;&#xBBAC;&#xB808;&#xC774;&#xD130;</div>';
html+='<canvas id="v28-combo-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v28-card"><h3>&#xD074;&#xB7FD; &#xC120;&#xD0DD; ('+selected.length+'/14)</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:3px">';
for(var i=0;i<ALL_CLUBS.length;i++){
var isSel=selected.indexOf(i)!==-1;
html+='<button class="v28-btn v28-btn-sm'+(isSel?' v28-btn-primary':'')+'" onclick="window._v28ToggleClub('+i+')">'+ALL_CLUBS[i]+'</button>';
}
html+='</div></div>';
var gaps=[];
var selDists=selected.filter(function(i){return ALL_DIST[i]>0}).map(function(i){return{name:ALL_CLUBS[i],dist:ALL_DIST[i]}}).sort(function(a,b){return b.dist-a.dist});
for(var i=0;i<selDists.length-1;i++){
gaps.push({from:selDists[i+1].name,to:selDists[i].name,gap:selDists[i].dist-selDists[i+1].dist});
}
var maxGap=0,avgGap=0;
for(var i=0;i<gaps.length;i++){if(gaps[i].gap>maxGap)maxGap=gaps[i].gap;avgGap+=gaps[i].gap;}
avgGap=gaps.length>0?Math.round(avgGap/gaps.length):0;
var gapGrade=maxGap<=15?'S':maxGap<=20?'A':maxGap<=25?'B':maxGap<=35?'C':'D';
var gColor=gapGrade==='S'?'#00FF88':gapGrade==='A'?'#4ECDC4':gapGrade==='B'?'#FECA57':gapGrade==='C'?'#FF9F43':'#FF6B6B';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v28-stat-card"><div class="v28-stat-val" style="color:#00FF88">'+selected.length+'</div><div class="v28-stat-label">&#xC120;&#xD0DD; &#xD074;&#xB7FD;</div></div>';
html+='<div class="v28-stat-card"><div class="v28-stat-val" style="color:#FFB800">'+avgGap+'yd</div><div class="v28-stat-label">&#xD3C9;&#xADE0; &#xAC2D;</div></div>';
html+='<div class="v28-stat-card"><div class="v28-stat-val" style="color:#FF6B6B">'+maxGap+'yd</div><div class="v28-stat-label">&#xCD5C;&#xB300; &#xAC2D;</div></div>';
html+='<div class="v28-stat-card"><div class="v28-stat-val" style="color:'+gColor+'">'+gapGrade+'</div><div class="v28-stat-label">&#xCEE4;&#xBC84;&#xB9AC;&#xC9C0; &#xB4F1;&#xAE09;</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('combo');drawComboCanvas(selDists,gaps);
}
window._v28ToggleClub=function(i){
var sel=lsGet('combo_sel',[0,2,8,9,10,11,12,13,15,17,19,20,21]);
var idx=sel.indexOf(i);
if(idx!==-1){sel.splice(idx,1);}
else if(sel.length<14){sel.push(i);}
else{showToast('Max 14 clubs!');return;}
lsSet('combo_sel',sel);playSfx('click_v28');checkAchievements();showClubCombo();
};
function drawComboCanvas(selDists,gaps){
var c=document.getElementById('v28-combo-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);
var grd=ctx.createLinearGradient(0,0,0,H);grd.addColorStop(0,'#0f1729');grd.addColorStop(1,'#1a1a2e');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Club Combination Distance Coverage',W/2,24);
var L=70,R=W-20,B=H-50,T=50;
var n=selDists.length;if(n===0)return;
var maxD=Math.max(300,selDists[0].dist+20);
var barH=Math.min(22,(B-T)/n-3);
for(var gx=0;gx<=maxD;gx+=50){
var x=L+(gx/maxD)*(R-L);
ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.lineWidth=0.5;
ctx.beginPath();ctx.moveTo(x,T);ctx.lineTo(x,B);ctx.stroke();
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='9px sans-serif';ctx.textAlign='center';
ctx.fillText(gx+'yd',x,B+14);
}
for(var i=0;i<n;i++){
var y=T+i*(barH+3);
var w=(selDists[i].dist/maxD)*(R-L);
var hue=120-i*(120/n);
ctx.fillStyle='hsla('+hue+',70%,50%,0.5)';
ctx.fillRect(L,y,w,barH);
ctx.strokeStyle='hsla('+hue+',70%,60%,0.6)';ctx.lineWidth=0.5;ctx.strokeRect(L,y,w,barH);
ctx.fillStyle='#fff';ctx.font='9px sans-serif';ctx.textAlign='right';
ctx.fillText(selDists[i].name,L-4,y+barH/2+3);
ctx.fillStyle='rgba(255,255,255,0.6)';ctx.textAlign='left';
ctx.fillText(selDists[i].dist+'yd',L+w+4,y+barH/2+3);
if(i<n-1){
var gap=selDists[i].dist-selDists[i+1].dist;
var gapColor=gap<=15?'#00FF88':gap<=25?'#FECA57':'#FF6B6B';
var gapMidY=y+barH+1;
ctx.fillStyle=gapColor;ctx.globalAlpha=0.3;
var gapX1=L+(selDists[i+1].dist/maxD)*(R-L);
var gapX2=L+(selDists[i].dist/maxD)*(R-L);
ctx.fillRect(gapX1,gapMidY,gapX2-gapX1,2);
ctx.globalAlpha=1;
ctx.fillStyle=gapColor;ctx.font='8px sans-serif';ctx.textAlign='center';
ctx.fillText(gap+'yd',gapX1+(gapX2-gapX1)/2,gapMidY+9);
}
}
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.textAlign='center';
ctx.fillText('Distance (yd)',W/2,B+32);
}

// ===== 8. COURSE STRATEGY INDEX DASHBOARD Canvas 620x400 =====
function showStrategyIndex(){
playSfx('strategy_open');
var pn=getPanel('strat');
var stratData=lsGet('strat_data',{grouping:72,pacing:68,roi:75,elevation:60,sg:70,contour:65,combo:80,overall:71});
var html='<button class="v28-close" onclick="window._v28Close(\'strat\')">&times;</button>';
html+='<div class="v28-title">&#x1F3C6; &#xC885;&#xD569; &#xCF54;&#xC2A4; &#xC804;&#xB7B5; &#xC9C0;&#xC218; &#xB300;&#xC2DC;&#xBCF4;&#xB4DC;</div>';
html+='<canvas id="v28-strat-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
var kpis=['Grouping','Pacing','Practice ROI','Elevation','SG Trend','Green Read','Club Combo','Overall'];
var kpiKeys=['grouping','pacing','roi','elevation','sg','contour','combo','overall'];
var weights=[0.15,0.1,0.12,0.08,0.2,0.15,0.1,0.1];
var weightedSum=0;
for(var i=0;i<8;i++){weightedSum+=stratData[kpiKeys[i]]*weights[i];}
var avgScore=Math.round(weightedSum);
var grade=avgScore>=85?'S':avgScore>=75?'A':avgScore>=60?'B':avgScore>=45?'C':'D';
var gColor=grade==='S'?'#00FF88':grade==='A'?'#4ECDC4':grade==='B'?'#FECA57':grade==='C'?'#FF9F43':'#FF6B6B';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
for(var i=0;i<8;i++){
var val=stratData[kpiKeys[i]];
var kGrade=val>=85?'S':val>=75?'A':val>=60?'B':val>=45?'C':'D';
var kColor=kGrade==='S'?'#00FF88':kGrade==='A'?'#4ECDC4':kGrade==='B'?'#FECA57':kGrade==='C'?'#FF9F43':'#FF6B6B';
html+='<div class="v28-stat-card"><div class="v28-stat-val" style="color:'+kColor+';font-size:16px">'+val+'</div><div class="v28-stat-label">'+kpis[i]+'</div></div>';
}
html+='</div>';
html+='<div class="v28-card" style="text-align:center"><span style="font-size:28px;font-weight:bold;color:'+gColor+'">'+grade+'</span> <span style="color:rgba(255,255,255,0.6);font-size:14px">&#xC885;&#xD569; &#xB4F1;&#xAE09; ('+avgScore+'&#xC810;)</span></div>';
pn.innerHTML=html;openPanel('strat');drawStratCanvas(stratData,kpis,kpiKeys);
}
function drawStratCanvas(data,kpis,keys){
var c=document.getElementById('v28-strat-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);
var grd=ctx.createLinearGradient(0,0,0,H);grd.addColorStop(0,'#0f1729');grd.addColorStop(1,'#1a1a2e');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Course Strategy Index Dashboard',W/2,24);
var positions=[[110,130],[310,130],[510,130],[110,280],[310,280],[510,280],[210,350],[410,350]];
var gaugeR=42;
var gaugeColors=['#FF6B6B','#FF9F43','#FECA57','#00FF88'];
for(var i=0;i<8;i++){
var cx=positions[i][0],cy=positions[i][1];
var val=data[keys[i]];
var pct=val/100;
ctx.beginPath();ctx.arc(cx,cy,gaugeR,Math.PI,2*Math.PI);
ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.lineWidth=8;ctx.stroke();
var gColor=pct>=0.85?gaugeColors[3]:pct>=0.7?gaugeColors[2]:pct>=0.5?gaugeColors[1]:gaugeColors[0];
ctx.beginPath();ctx.arc(cx,cy,gaugeR,Math.PI,Math.PI+Math.PI*pct);
ctx.strokeStyle=gColor;ctx.lineWidth=8;ctx.lineCap='round';ctx.stroke();ctx.lineCap='butt';
ctx.fillStyle=gColor;ctx.font='bold 18px sans-serif';ctx.textAlign='center';
ctx.fillText(val,cx,cy+4);
ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='9px sans-serif';
ctx.fillText(kpis[i],cx,cy+18);
var grade=val>=85?'S':val>=75?'A':val>=60?'B':val>=45?'C':'D';
ctx.fillStyle=gColor;ctx.font='bold 11px sans-serif';
ctx.fillText(grade,cx,cy-gaugeR+14);
}
}

// ===== QUIZ v28 (15 questions) =====
var QUIZ_V28=[
{q:'CEP(Circular Error Probable)&#xB780; &#xC0F7;&#xC758; &#xBA87; %&#xAC00; &#xB4E4;&#xC5B4;&#xAC00;&#xB294; &#xBC18;&#xACBD;&#xC744; &#xC758;&#xBBF8;?',a:['50%','75%','90%','100%'],c:0},
{q:'&#xB77C;&#xC6B4;&#xB4DC; &#xD398;&#xC774;&#xC2F1;&#xC5D0;&#xC11C; Par3 &#xD640;&#xC758; &#xC774;&#xC0C1;&#xC801; &#xD50C;&#xB808;&#xC774; &#xC2DC;&#xAC04;&#xC740;?',a:['8&#xBD84;','10&#xBD84;','14&#xBD84;','18&#xBD84;'],c:1},
{q:'&#xC5F0;&#xC2B5; &#xC720;&#xD615; &#xC911; ROI(&#xD22C;&#xC790;&#xB300;&#xBE44;&#xD6A8;&#xACFC;)&#xAC00; &#xAC00;&#xC7A5; &#xB192;&#xC740; &#xBD84;&#xC57C;&#xB294;?',a:['&#xB4DC;&#xB77C;&#xC774;&#xBE59;','&#xC544;&#xC774;&#xC5B8; &#xC0F7;','&#xC21C; &#xAC8C;&#xC784;','&#xD37C;&#xD305;'],c:3},
{q:'&#xACE0;&#xB3C4; 1500m &#xC774;&#xC0C1;&#xC5D0;&#xC11C; &#xBE44;&#xAC70;&#xB9AC; &#xC99D;&#xAC00;&#xC728;&#xC740; &#xC57D;?',a:['+5%','+8%','+10%','+15%'],c:2},
{q:'Strokes Gained &#xBD84;&#xC11D;&#xC5D0;&#xC11C; APP&#xB294; &#xBB34;&#xC5C7;&#xC758; &#xC57D;&#xC790;?',a:['Approach','Application','Approximate','Appeal'],c:0},
{q:'&#xADF8;&#xB9B0; &#xC2A4;&#xD53C;&#xB4DC;&#xB97C; &#xCE21;&#xC815;&#xD558;&#xB294; &#xB3C4;&#xAD6C;&#xB294;?',a:['&#xB808;&#xC774;&#xC800;','&#xC2A4;&#xD0EC;&#xD504;&#xBBF8;&#xD130;','&#xBC14;&#xB85C;&#xBBF8;&#xD130;','&#xD074;&#xB77C;&#xC774;&#xB178;&#xBBF8;&#xD130;'],c:1},
{q:'&#xACE8;&#xD504; &#xBC31;&#xC5D0; &#xB123;&#xC744; &#xC218; &#xC788;&#xB294; &#xCD5C;&#xB300; &#xD074;&#xB7FD; &#xC218;&#xB294;?',a:['12&#xAC1C;','13&#xAC1C;','14&#xAC1C;','15&#xAC1C;'],c:2},
{q:'&#xC5C5;&#xD790; &#xC0F7;&#xC758; &#xBE44;&#xAC70;&#xB9AC; &#xBCF4;&#xC815;&#xC740; &#xC77C;&#xBC18;&#xC801;&#xC73C;&#xB85C;?',a:['+5~10%','&#xBCC0;&#xD654; &#xC5C6;&#xC74C;','-5~10%','-15~20%'],c:2},
{q:'SG Total&#xC774; +2.0 &#xC774;&#xC0C1;&#xC774;&#xBA74; &#xC5B4;&#xB5A4; &#xC218;&#xC900;?',a:['&#xC544;&#xB9C8;&#xCD94;&#xC5B4;','&#xC0C1;&#xAE09;&#xC790;','&#xD22C;&#xC5B4; &#xD504;&#xB85C; &#xC218;&#xC900;','&#xD558;&#xC704;&#xAD8C;'],c:2},
{q:'Front-to-Back &#xADF8;&#xB9B0;&#xC5D0;&#xC11C; &#xD575;&#xC704;&#xCE58; &#xBCF4;&#xC815;&#xC740;?',a:['&#xD540; &#xC55E;&#xC744; &#xB178;&#xB9B0;&#xB2E4;','&#xD540; &#xB4A4;&#xB97C; &#xB178;&#xB9B0;&#xB2E4;','&#xBCC0;&#xD654; &#xC5C6;&#xB2E4;','&#xC88C;&#xCE21;&#xC744; &#xB178;&#xB9B0;&#xB2E4;'],c:0},
{q:'&#xD074;&#xB7FD;&#xAC04; &#xAC2D;(gap)&#xC774; 15yd &#xC774;&#xD558;&#xC774;&#xBA74; &#xB4F1;&#xAE09;&#xC740;?',a:['S','A','B','C'],c:0},
{q:'&#xB77C;&#xC6B4;&#xB4DC; &#xD398;&#xC774;&#xC2F1;&#xC5D0;&#xC11C; Par5 &#xD640;&#xC758; &#xC774;&#xC0C1;&#xC801; &#xD50C;&#xB808;&#xC774; &#xC2DC;&#xAC04;&#xC740;?',a:['10&#xBD84;','12&#xBD84;','14&#xBD84;','16&#xBD84;'],c:2},
{q:'&#xC0F7; &#xADF8;&#xB8E8;&#xD551; &#xBD84;&#xC11D;&#xC5D0;&#xC11C; &#xBCC0;&#xB3D9;&#xACC4;&#xC218;(CV) 5% &#xBBF8;&#xB9CC;&#xC758; &#xC758;&#xBBF8;&#xB294;?',a:['S&#xB4F1;&#xAE09; &#xC815;&#xBC00;&#xB3C4;','&#xBCF4;&#xD1B5; &#xC218;&#xC900;','&#xC5F0;&#xC2B5; &#xD544;&#xC694;','&#xC704;&#xD5D8; &#xC218;&#xC900;'],c:0},
{q:'&#xC5F0;&#xC2B5; ROI&#xC5D0;&#xC11C; &#xD53C;&#xD2B8;&#xB2C8;&#xC2A4; &#xD6C8;&#xB828;&#xC758; &#xD6A8;&#xC728; &#xC9C0;&#xC218;&#xAC00; &#xB0AE;&#xC740; &#xC774;&#xC720;&#xB294;?',a:['&#xC2A4;&#xCF54;&#xC5B4; &#xC9C1;&#xC811; &#xC601;&#xD5A5;&#xC774; &#xC801;&#xC74C;','&#xC2DC;&#xAC04;&#xC774; &#xB9CE;&#xC774; &#xAC78;&#xB9BC;','&#xBE44;&#xC6A9;&#xC774; &#xBE44;&#xC8C4;','&#xC88B;&#xC740; &#xD504;&#xB85C;&#xADF8;&#xB7A8;&#xC774; &#xC5C6;&#xC74C;'],c:0},
{q:'SG &#xBD84;&#xC11D;&#xC758; 5&#xB77C;&#xC6B4;&#xB4DC; &#xC774;&#xB3D9;&#xD3C9;&#xADE0;(MA)&#xC758; &#xBAA9;&#xC801;&#xC740;?',a:['&#xB2E8;&#xAE30; &#xBCC0;&#xB3D9;&#xC131; &#xC81C;&#xAC70;','&#xCD1D;&#xC810; &#xACC4;&#xC0B0;','&#xD55C;&#xB514;&#xCEA1; &#xCD94;&#xC815;','&#xBE44;&#xAC70;&#xB9AC; &#xBCF4;&#xC815;'],c:0}
];
var quizState28=lsGet('quiz_state28',{idx:0,score:0,total:0,done:false});
function showQuizV28(){
playSfx('quiz_correct_v28');
var pn=getPanel('quiz28');
var qs=quizState28;
if(qs.done||qs.idx>=QUIZ_V28.length){qs.idx=0;qs.score=0;qs.total=0;qs.done=false;}
var q=QUIZ_V28[qs.idx];
var html='<button class="v28-close" onclick="window._v28Close(\'quiz28\')">&times;</button>';
html+='<div class="v28-title">&#x1F4DA; Golf Tracker &#xD000;&#xC988; v28 ('+QUIZ_V28.length+'&#xBB38;)</div>';
html+='<div class="v28-card"><div style="font-size:11px;color:rgba(255,255,255,0.5);margin-bottom:6px">Q'+(qs.idx+1)+'/'+QUIZ_V28.length+' | Score: '+qs.score+'/'+qs.total+'</div>';
html+='<div style="font-size:14px;font-weight:bold;margin-bottom:12px;line-height:1.5">'+q.q+'</div>';
for(var i=0;i<q.a.length;i++){
html+='<button class="v28-btn" style="width:100%;text-align:left;margin-bottom:6px;padding:10px 14px" onclick="window._v28AnswerQuiz('+i+')">'+String.fromCharCode(65+i)+'. '+q.a[i]+'</button>';
}
html+='</div>';
var pct=qs.total>0?Math.round(qs.score/qs.total*100):0;
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v28-stat-card"><div class="v28-stat-val" style="color:#00FF88">'+qs.score+'</div><div class="v28-stat-label">&#xC815;&#xB2F5;</div></div>';
html+='<div class="v28-stat-card"><div class="v28-stat-val" style="color:#FF6B6B">'+(qs.total-qs.score)+'</div><div class="v28-stat-label">&#xC624;&#xB2F5;</div></div>';
html+='<div class="v28-stat-card"><div class="v28-stat-val" style="color:#FFB800">'+pct+'%</div><div class="v28-stat-label">&#xC815;&#xB2F5;&#xB960;</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('quiz28');
}
window._v28AnswerQuiz=function(i){
var qs=quizState28;
var q=QUIZ_V28[qs.idx];
qs.total++;
if(i===q.c){qs.score++;playSfx('quiz_correct_v28');showToast('&#xC815;&#xB2F5;! &#x2714;');}
else{playSfx('quiz_wrong_v28');showToast('&#xC624;&#xB2F5;! &#xC815;&#xB2F5;: '+q.a[q.c]);}
qs.idx++;
if(qs.idx>=QUIZ_V28.length){qs.done=true;showToast('Quiz Complete! '+qs.score+'/'+qs.total);}
lsSet('quiz_state28',qs);
setTimeout(showQuizV28,800);
};

// ===== ACHIEVEMENTS v28 =====
var ACHIEVE_V28=[
{id:'group_first',name:'Precision Analyst',desc:'Open shot grouping analyzer',check:function(){return lsGet('v28_explored',0)>=1}},
{id:'pace_record',name:'Pace Strategist',desc:'Record round pacing data',check:function(){return lsGet('pace_data',null)!==null}},
{id:'roi_calc',name:'ROI Calculator',desc:'Calculate practice ROI',check:function(){return lsGet('pract_data',null)!==null}},
{id:'elev_check',name:'Altitude Expert',desc:'Check elevation impact',check:function(){return lsGet('elev_checked',false)}},
{id:'sg_trend',name:'SG Trend Watcher',desc:'Add SG round data',check:function(){var d=lsGet('sg_trend_data',[]);return d.length>=21}},
{id:'contour_read',name:'Green Reader',desc:'Read green contour map',check:function(){return lsGet('contour_read',false)}},
{id:'combo_build',name:'Bag Builder',desc:'Build custom club combo',check:function(){var s=lsGet('combo_sel',[]);return s.length>=10}},
{id:'strat_view',name:'Strategy Analyst',desc:'View strategy index dashboard',check:function(){return lsGet('strat_viewed',false)}},
{id:'quiz28_perfect',name:'Quiz v28 Ace',desc:'Get 100% on v28 quiz',check:function(){var q=lsGet('quiz_state28',{});return q.done&&q.score===QUIZ_V28.length}},
{id:'quiz28_complete',name:'Quiz v28 Scholar',desc:'Complete v28 quiz',check:function(){var q=lsGet('quiz_state28',{});return q.done}},
{id:'explore_all_v28',name:'v28 Explorer',desc:'Try all 8 v28 features',check:function(){return lsGet('v28_explored',0)>=8}},
{id:'v28_complete',name:'v28 Graduate',desc:'Earn 8+ v28 achievements',check:function(){var cnt=0;for(var i=0;i<ACHIEVE_V28.length-1;i++){if(ACHIEVE_V28[i].check())cnt++;}return cnt>=8}}
];
function checkAchievements(){
var unlocked=lsGet('achievements28',[]);
var newOnes=false;
for(var i=0;i<ACHIEVE_V28.length;i++){
if(unlocked.indexOf(ACHIEVE_V28[i].id)===-1&&ACHIEVE_V28[i].check()){
unlocked.push(ACHIEVE_V28[i].id);newOnes=true;
playSfx('achieve_v28');showToast('&#x1F3C6; '+ACHIEVE_V28[i].name+'!');
}
}
if(newOnes)lsSet('achievements28',unlocked);
}
var explored28=lsGet('v28_explored',0);
function markExplored(){explored28++;lsSet('v28_explored',explored28);
lsSet('elev_checked',true);lsSet('contour_read',true);lsSet('strat_viewed',true);
}

// ===== CSS =====
var style=document.createElement('style');
style.textContent='.v28-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:10020;display:none;align-items:center;justify-content:center;padding:16px;overflow-y:auto}.v28-overlay.active{display:flex}.v28-panel{background:#14141a;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:20px;max-width:660px;width:100%;max-height:90vh;overflow-y:auto;position:relative}.v28-close{position:absolute;top:12px;right:12px;background:none;border:none;color:#fff;font-size:24px;cursor:pointer;z-index:2;opacity:0.7}.v28-close:hover{opacity:1}.v28-title{font-size:18px;font-weight:bold;color:#fff;margin-bottom:12px;text-align:center}.v28-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;margin:8px 0}.v28-card h3{font-size:13px;color:rgba(255,255,255,0.7);margin-bottom:6px}.v28-label{font-size:10px;color:rgba(255,255,255,0.5);display:block;margin-bottom:2px}.v28-input{width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:6px;color:#fff;padding:6px 8px;font-size:12px;outline:none;box-sizing:border-box}.v28-input:focus{border-color:#00D4B4}.v28-btn{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);border-radius:8px;color:#fff;padding:8px 12px;font-size:12px;cursor:pointer;transition:all 0.2s}.v28-btn:hover{background:rgba(255,255,255,0.12)}.v28-btn-primary{background:rgba(0,212,180,0.15);border-color:rgba(0,212,180,0.3);color:#00D4B4}.v28-btn-primary:hover{background:rgba(0,212,180,0.25)}.v28-btn-sm{padding:6px 8px;font-size:11px}.v28-stat-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:10px;text-align:center}.v28-stat-val{font-size:18px;font-weight:bold}.v28-stat-label{font-size:9px;color:rgba(255,255,255,0.5);margin-top:2px}.v28-toast{position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(20px);background:rgba(0,212,180,0.15);border:1px solid rgba(0,212,180,0.3);color:#00D4B4;padding:10px 20px;border-radius:10px;font-size:13px;z-index:10030;opacity:0;transition:all 0.3s}.v28-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}';
document.head.appendChild(style);

// ===== NAVIGATION =====
window._v28Close=function(id){closePanel(id);};
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
{label:'ShotGrp',fn:showGroupingAnalyzer,icon:'&#x1F3AF;'},
{label:'Pacing',fn:showPacingStrategy,icon:'&#x23F1;&#xFE0F;'},
{label:'PracROI',fn:showPracticeROI,icon:'&#x1F4B0;'},
{label:'Elev',fn:showElevationImpact,icon:'&#x26F0;&#xFE0F;'},
{label:'SGTrend',fn:showSGTrend,icon:'&#x1F4C8;'},
{label:'GrnRead',fn:showGreenContour,icon:'&#x1F3CC;&#xFE0F;'},
{label:'ClubMix',fn:showClubCombo,icon:'&#x1F3CC;&#xFE0F;'},
{label:'StratIdx',fn:showStrategyIndex,icon:'&#x1F3C6;'},
{label:'Quiz28',fn:showQuizV28,icon:'&#x1F4DA;'}
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
case'Q':case'q':showGroupingAnalyzer();markExplored();break;
case'W':case'w':showPacingStrategy();markExplored();break;
case'E':case'e':showPracticeROI();markExplored();break;
case'R':case'r':showElevationImpact();markExplored();break;
case'T':case't':showSGTrend();markExplored();break;
case'Y':case'y':showGreenContour();markExplored();break;
case'U':case'u':showClubCombo();markExplored();break;
case'I':case'i':showStrategyIndex();markExplored();break;
case'0':showQuizV28();markExplored();break;
}
});

// ===== INIT =====
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',addNavButtons);}
else{setTimeout(addNavButtons,2000);}
setTimeout(checkAchievements,4000);
})();
