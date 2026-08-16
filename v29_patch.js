(function(){
'use strict';
var LS='gt_v29_';
var audioCtx=null;
function getAC(){if(!audioCtx)try{audioCtx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}return audioCtx}
function playSfx(type){var ac=getAC();if(!ac)return;var o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);var t=ac.currentTime;g.gain.setValueAtTime(0.1,t);switch(type){case'ellipse_open':o.type='sine';o.frequency.setValueAtTime(554,t);o.frequency.linearRampToValueAtTime(698,t+0.05);o.frequency.linearRampToValueAtTime(880,t+0.1);o.frequency.linearRampToValueAtTime(1047,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'lie_open':o.type='sine';o.frequency.setValueAtTime(466,t);o.frequency.linearRampToValueAtTime(587,t+0.06);o.frequency.linearRampToValueAtTime(740,t+0.12);g.gain.exponentialRampToValueAtTime(0.01,t+0.28);o.start(t);o.stop(t+0.28);break;case'heat_open':o.type='sine';o.frequency.setValueAtTime(415,t);o.frequency.linearRampToValueAtTime(554,t+0.05);o.frequency.linearRampToValueAtTime(698,t+0.1);o.frequency.linearRampToValueAtTime(880,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'hybrid_open':o.type='sine';o.frequency.setValueAtTime(370,t);o.frequency.linearRampToValueAtTime(494,t+0.06);o.frequency.linearRampToValueAtTime(622,t+0.12);g.gain.exponentialRampToValueAtTime(0.01,t+0.26);o.start(t);o.stop(t+0.26);break;case'momentum_open':o.type='sine';o.frequency.setValueAtTime(622,t);o.frequency.linearRampToValueAtTime(784,t+0.05);o.frequency.linearRampToValueAtTime(932,t+0.1);o.frequency.linearRampToValueAtTime(1109,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'drill_open':o.type='sine';o.frequency.setValueAtTime(494,t);o.frequency.linearRampToValueAtTime(622,t+0.06);o.frequency.linearRampToValueAtTime(784,t+0.12);g.gain.exponentialRampToValueAtTime(0.01,t+0.26);o.start(t);o.stop(t+0.26);break;case'windadj_open':o.type='sine';o.frequency.setValueAtTime(587,t);o.frequency.linearRampToValueAtTime(740,t+0.05);o.frequency.linearRampToValueAtTime(932,t+0.1);g.gain.exponentialRampToValueAtTime(0.01,t+0.25);o.start(t);o.stop(t+0.25);break;case'analytics_open':o.type='sine';o.frequency.setValueAtTime(698,t);o.frequency.linearRampToValueAtTime(880,t+0.05);o.frequency.linearRampToValueAtTime(1047,t+0.1);o.frequency.linearRampToValueAtTime(1245,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.32);o.start(t);o.stop(t+0.32);break;case'quiz_correct_v29':o.type='sine';o.frequency.setValueAtTime(932,t);o.frequency.setValueAtTime(1175,t+0.08);o.frequency.setValueAtTime(1397,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'quiz_wrong_v29':o.type='sawtooth';o.frequency.setValueAtTime(330,t);o.frequency.linearRampToValueAtTime(247,t+0.2);g.gain.setValueAtTime(0.06,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'achieve_v29':o.type='sine';o.frequency.setValueAtTime(1175,t);o.frequency.setValueAtTime(1397,t+0.1);o.frequency.setValueAtTime(1661,t+0.2);o.frequency.setValueAtTime(2093,t+0.3);g.gain.exponentialRampToValueAtTime(0.01,t+0.5);o.start(t);o.stop(t+0.5);break;case'nav_v29':o.type='sine';o.frequency.setValueAtTime(880,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.08);o.start(t);o.stop(t+0.08);break;case'save_v29':o.type='triangle';o.frequency.setValueAtTime(659,t);o.frequency.linearRampToValueAtTime(988,t+0.1);g.gain.exponentialRampToValueAtTime(0.01,t+0.2);o.start(t);o.stop(t+0.2);break;case'hover_v29':o.type='sine';o.frequency.setValueAtTime(1245,t);g.gain.setValueAtTime(0.04,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.05);o.start(t);o.stop(t+0.05);break;case'click_v29':o.type='sine';o.frequency.setValueAtTime(740,t);o.frequency.linearRampToValueAtTime(932,t+0.06);g.gain.exponentialRampToValueAtTime(0.01,t+0.12);o.start(t);o.stop(t+0.12);break;case'reset_v29':o.type='square';o.frequency.setValueAtTime(392,t);o.frequency.linearRampToValueAtTime(262,t+0.15);g.gain.setValueAtTime(0.05,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.25);o.start(t);o.stop(t+0.25);break;default:o.type='sine';o.frequency.setValueAtTime(440,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.15);o.start(t);o.stop(t+0.15)}}

function lsGet(k,d){try{var v=localStorage.getItem(LS+k);return v?JSON.parse(v):d}catch(e){return d}}
function lsSet(k,v){try{localStorage.setItem(LS+k,JSON.stringify(v))}catch(e){}}
function todayStr(){return new Date().toISOString().slice(0,10)}
function showToast(msg){var t=document.createElement('div');t.className='v29-toast';t.textContent=msg;document.body.appendChild(t);setTimeout(function(){t.classList.add('show')},50);setTimeout(function(){t.classList.remove('show');setTimeout(function(){t.remove()},400)},3000)}
function createOverlay(id){var ov=document.createElement('div');ov.className='v29-overlay';ov.id='v29-'+id;ov.addEventListener('click',function(e){if(e.target===ov)closePanel(id)});var pn=document.createElement('div');pn.className='v29-panel';pn.style.position='relative';ov.appendChild(pn);return pn}
function openPanel(id){var el=document.getElementById('v29-'+id);if(el)el.classList.add('active')}
function closePanel(id){var el=document.getElementById('v29-'+id);if(el)el.classList.remove('active')}
function getPanel(id){var ov=document.getElementById('v29-'+id);if(!ov){var pn=createOverlay(id);pn.id='v29-'+id+'-panel';document.body.appendChild(pn.parentElement);return pn}return ov.querySelector('.v29-panel')||ov}

// ===== 1. SHOT DISPERSION ELLIPSE FITTER Canvas 620x400 =====
var CLUBS_14=['Driver','3W','5W','3I','4I','5I','6I','7I','8I','9I','PW','GW','SW','LW'];
var CLUB_AVG_D=[250,230,210,200,190,180,170,160,150,140,130,115,100,80];
var CLUB_LATERAL=[18,15,13,13,11,10,9,8,7,6,5,4,4,3];
var CLUB_DEPTH=[22,18,16,16,14,13,12,11,10,9,8,7,6,5];
var CLUB_COLORS=['#FF6B6B','#FF9F43','#FECA57','#48DBFB','#00FF88','#A855F7','#FF85A2','#4ECDC4','#00B4D8','#E0BBE4','#957DAD','#D291BC','#FEC89A','#A8D8EA'];
function seedRandom(s){return function(){s=(s*9301+49297)%233280;return s/233280}}
function showEllipseFitter(){
playSfx('ellipse_open');
var pn=getPanel('ellipse');
var selClub=lsGet('ellipse_club',0);
var html='<button class="v29-close" onclick="window._v29Close(\'ellipse\')">&times;</button>';
html+='<div class="v29-title">&#x1F4CD; &#xC0F7; &#xBD84;&#xC0B0; &#xD0C0;&#xC6D0; &#xD53C;&#xD130;</div>';
html+='<canvas id="v29-ellipse-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v29-card"><h3>&#xD074;&#xB7FD; &#xC120;&#xD0DD;</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;margin-bottom:6px">';
for(var i=0;i<7;i++){html+='<button class="v29-btn v29-btn-sm'+(i===selClub?' v29-btn-primary':'')+'" onclick="window._v29SelEllipse('+i+')">'+CLUBS_14[i]+'</button>';}
html+='</div><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px">';
for(var i=7;i<14;i++){html+='<button class="v29-btn v29-btn-sm'+(i===selClub?' v29-btn-primary':'')+'" onclick="window._v29SelEllipse('+i+')">'+CLUBS_14[i]+'</button>';}
html+='</div></div>';
var lat=CLUB_LATERAL[selClub],dep=CLUB_DEPTH[selClub];
var area=Math.round(Math.PI*lat*dep);
var ratio=(dep/lat).toFixed(1);
var grade=area<200?'S':area<400?'A':area<650?'B':area<950?'C':'D';
var gc=grade==='S'?'#00FF88':grade==='A'?'#4ECDC4':grade==='B'?'#FECA57':grade==='C'?'#FF9F43':'#FF6B6B';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v29-stat-card"><div class="v29-stat-val" style="color:#00FF88">&plusmn;'+lat+'yd</div><div class="v29-stat-label">&#xC88C;&#xC6B0; &#xBD84;&#xC0B0;</div></div>';
html+='<div class="v29-stat-card"><div class="v29-stat-val" style="color:#FFB800">&plusmn;'+dep+'yd</div><div class="v29-stat-label">&#xC804;&#xD6C4; &#xBD84;&#xC0B0;</div></div>';
html+='<div class="v29-stat-card"><div class="v29-stat-val" style="color:#A855F7">'+area+'yd&sup2;</div><div class="v29-stat-label">&#xD0C0;&#xC6D0; &#xBA74;&#xC801;</div></div>';
html+='<div class="v29-stat-card"><div class="v29-stat-val" style="color:'+gc+'">'+grade+'</div><div class="v29-stat-label">&#xC815;&#xBC00;&#xB3C4;</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('ellipse');drawEllipseCanvas(selClub);
}
window._v29SelEllipse=function(i){lsSet('ellipse_club',i);showEllipseFitter();};
function drawEllipseCanvas(clubIdx){
var c=document.getElementById('v29-ellipse-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);
var grd=ctx.createLinearGradient(0,0,0,H);grd.addColorStop(0,'#0d1520');grd.addColorStop(1,'#1a1a2e');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText(CLUBS_14[clubIdx]+' Dispersion Ellipse',W/2,24);
var L=60,R=W-30,B=H-50,T=55,cX=(L+R)/2,cY=(T+B)/2;
var lat=CLUB_LATERAL[clubIdx],dep=CLUB_DEPTH[clubIdx];
var scX=(R-L)/(lat*8),scY=(B-T)/(dep*7);
ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.lineWidth=0.5;
for(var gy=T;gy<=B;gy+=35){ctx.beginPath();ctx.moveTo(L,gy);ctx.lineTo(R,gy);ctx.stroke();}
for(var gx=L;gx<=R;gx+=35){ctx.beginPath();ctx.moveTo(gx,T);ctx.lineTo(gx,B);ctx.stroke();}
var sigmas=[{s:2,a:'rgba(255,107,107,0.05)'},{s:1.5,a:'rgba(255,184,0,0.08)'},{s:1,a:'rgba(78,205,196,0.12)'},{s:0.5,a:'rgba(0,255,136,0.18)'}];
for(var si=0;si<sigmas.length;si++){
ctx.beginPath();ctx.ellipse(cX,cY,sigmas[si].s*lat*scX,sigmas[si].s*dep*scY,0,0,Math.PI*2);
ctx.fillStyle=sigmas[si].a;ctx.fill();
ctx.strokeStyle=si===2?'rgba(0,255,136,0.5)':'rgba(255,255,255,0.12)';
ctx.lineWidth=si===2?2:0.5;ctx.stroke();
}
var labels=['2σ','1.5σ','1σ','0.5σ'];
for(var si=0;si<sigmas.length;si++){
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='9px sans-serif';
ctx.fillText(labels[si],cX+sigmas[si].s*lat*scX+8,cY-3);
}
var rng=seedRandom(clubIdx*2000+73);
var clr=CLUB_COLORS[clubIdx];
for(var i=0;i<50;i++){
var ang=rng()*Math.PI*2,r=rng();
var px=cX+Math.cos(ang)*r*lat*1.8*scX;
var py=cY+Math.sin(ang)*r*dep*1.8*scY;
ctx.beginPath();ctx.arc(px,py,3.5,0,Math.PI*2);
ctx.fillStyle=clr;ctx.globalAlpha=0.65;ctx.fill();
ctx.strokeStyle='rgba(255,255,255,0.25)';ctx.lineWidth=0.5;ctx.stroke();ctx.globalAlpha=1;
}
ctx.beginPath();ctx.moveTo(cX-8,cY);ctx.lineTo(cX+8,cY);ctx.moveTo(cX,cY-8);ctx.lineTo(cX,cY+8);
ctx.strokeStyle='#fff';ctx.lineWidth=1.5;ctx.stroke();
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='10px sans-serif';ctx.textAlign='left';
ctx.fillText('Lateral (yd)',R-65,B+28);
ctx.save();ctx.translate(15,H/2);ctx.rotate(-Math.PI/2);ctx.textAlign='center';ctx.fillText('Depth (yd)',0,0);ctx.restore();
}

// ===== 2. LIE ANGLE IMPACT SIMULATOR Canvas 620x400 =====
var LIE_TYPES=['Flat','Uphill','Downhill','Sidehill L','Sidehill R','Divot','Deep Rough','Bunker'];
var LIE_DIST_MULT=[1.0,0.92,1.05,0.95,0.95,0.85,0.80,0.70];
var LIE_ACC_PENALTY=[0,8,12,15,15,18,22,20];
var LIE_COLORS=['#00FF88','#4ECDC4','#48DBFB','#A855F7','#FF85A2','#FF9F43','#FF6B6B','#FECA57'];
function showLieImpact(){
playSfx('lie_open');
var pn=getPanel('lie');
var selLie=lsGet('lie_sel',0);
var html='<button class="v29-close" onclick="window._v29Close(\'lie\')">&times;</button>';
html+='<div class="v29-title">&#x26F3; &#xB77C;&#xC774; &#xAC01;&#xB3C4; &#xC784;&#xD329;&#xD2B8; &#xC2DC;&#xBBAC;&#xB808;&#xC774;&#xD130;</div>';
html+='<canvas id="v29-lie-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v29-card"><h3>&#xB77C;&#xC774; &#xC720;&#xD615; &#xC120;&#xD0DD;</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px">';
for(var i=0;i<8;i++){html+='<button class="v29-btn v29-btn-sm'+(i===selLie?' v29-btn-primary':'')+'" onclick="window._v29SelLie('+i+')">'+LIE_TYPES[i]+'</button>';}
html+='</div></div>';
var distPct=Math.round(LIE_DIST_MULT[selLie]*100);
var accPen=LIE_ACC_PENALTY[selLie];
var risk=accPen<5?'Low':accPen<12?'Medium':accPen<18?'High':'Very High';
var riskClr=accPen<5?'#00FF88':accPen<12?'#FECA57':accPen<18?'#FF9F43':'#FF6B6B';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v29-stat-card"><div class="v29-stat-val" style="color:#00FF88">'+distPct+'%</div><div class="v29-stat-label">&#xBE44;&#xAC70;&#xB9AC; &#xBE44;&#xC728;</div></div>';
html+='<div class="v29-stat-card"><div class="v29-stat-val" style="color:#FF9F43">'+accPen+'yd</div><div class="v29-stat-label">&#xC815;&#xD655;&#xB3C4; &#xD398;&#xB110;&#xD2F0;</div></div>';
html+='<div class="v29-stat-card"><div class="v29-stat-val" style="color:'+riskClr+'">'+risk+'</div><div class="v29-stat-label">&#xC704;&#xD5D8;&#xB3C4;</div></div>';
html+='<div class="v29-stat-card"><div class="v29-stat-val" style="color:#A855F7">'+LIE_TYPES[selLie]+'</div><div class="v29-stat-label">&#xD604;&#xC7AC; &#xB77C;&#xC774;</div></div>';
html+='</div>';
html+='<div class="v29-card"><h3>&#xD074;&#xB7FD;&#xBCC4; &#xBE44;&#xAC70;&#xB9AC; &#xC601;&#xD5A5;</h3><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;font-size:10px;text-align:center;color:rgba(255,255,255,0.7)">';
for(var ci=0;ci<14;ci++){
var adjDist=Math.round(CLUB_AVG_D[ci]*LIE_DIST_MULT[selLie]);
html+='<div style="padding:4px;background:rgba(255,255,255,0.04);border-radius:6px"><div style="font-size:8px;opacity:0.6">'+CLUBS_14[ci]+'</div><div style="color:'+LIE_COLORS[selLie]+';font-weight:bold">'+adjDist+'</div></div>';
}
html+='</div></div>';
pn.innerHTML=html;openPanel('lie');drawLieCanvas(selLie);
}
window._v29SelLie=function(i){lsSet('lie_sel',i);showLieImpact();};
function drawLieCanvas(lieIdx){
var c=document.getElementById('v29-lie-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);
var grd=ctx.createLinearGradient(0,0,0,H);grd.addColorStop(0,'#0d1520');grd.addColorStop(1,'#1a1a2e');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Lie Impact: Distance % & Accuracy Penalty',W/2,24);
var L=55,R=W-25,B=H-45,T=50;
var barW=(R-L)/8-6;
for(var i=0;i<8;i++){
var x=L+i*((R-L)/8)+3;
var distH=(LIE_DIST_MULT[i]*100/120)*(B-T);
var accH=(LIE_ACC_PENALTY[i]/30)*(B-T);
ctx.fillStyle=i===lieIdx?LIE_COLORS[i]:'rgba('+parseInt(LIE_COLORS[i].slice(1,3),16)+','+parseInt(LIE_COLORS[i].slice(3,5),16)+','+parseInt(LIE_COLORS[i].slice(5,7),16)+',0.3)';
ctx.fillRect(x,B-distH,barW*0.45,distH);
ctx.fillStyle=i===lieIdx?'rgba(255,107,107,0.8)':'rgba(255,107,107,0.25)';
ctx.fillRect(x+barW*0.5,B-accH,barW*0.45,accH);
ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='8px sans-serif';ctx.textAlign='center';
ctx.fillText(LIE_TYPES[i].split(' ')[0],x+barW/2,B+12);
if(LIE_TYPES[i].split(' ')[1])ctx.fillText(LIE_TYPES[i].split(' ')[1],x+barW/2,B+22);
}
ctx.strokeStyle='rgba(0,255,136,0.3)';ctx.lineWidth=1;ctx.setLineDash([4,3]);
var flatH=(100/120)*(B-T);ctx.beginPath();ctx.moveTo(L,B-flatH);ctx.lineTo(R,B-flatH);ctx.stroke();ctx.setLineDash([]);
ctx.fillStyle='rgba(0,255,136,0.4)';ctx.font='9px sans-serif';ctx.textAlign='left';ctx.fillText('100% baseline',L+2,B-flatH-4);
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='9px sans-serif';ctx.textAlign='right';
for(var p=0;p<=100;p+=20){var y=B-(p/120)*(B-T);ctx.fillText(p+'%',L-4,y+3);}
ctx.fillStyle='rgba(78,205,196,0.5)';ctx.font='9px sans-serif';ctx.textAlign='left';ctx.fillText('█ Distance %',L+10,T-8);
ctx.fillStyle='rgba(255,107,107,0.5)';ctx.fillText('█ Accuracy Penalty',L+120,T-8);
}

// ===== 3. COURSE MANAGEMENT HEAT INDEX Canvas 640x400 =====
var ZONE_NAMES=['Tee Box','Fairway','Rough','Bunker','Around Green','On Green','Hazard','OB Zone'];
var RISK_BASE=[2,3,6,7,5,4,9,10];
var REWARD_BASE=[8,7,4,3,6,8,1,0];
function showCourseHeatIndex(){
playSfx('heat_open');
var pn=getPanel('heat');
var heatData=lsGet('heat_data',null);
var html='<button class="v29-close" onclick="window._v29Close(\'heat\')">&times;</button>';
html+='<div class="v29-title">&#x1F525; &#xCF54;&#xC2A4; &#xB9E4;&#xB2C8;&#xC9C0;&#xBA3C;&#xD2B8; &#xD788;&#xD2B8; &#xC778;&#xB371;&#xC2A4;</div>';
html+='<canvas id="v29-heat-canvas" width="640" height="400" style="width:100%;max-width:640px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v29-card"><h3>&#xAD6C;&#xC5ED;&#xBCC4; &#xC704;&#xD5D8;&#xB3C4; &#xD3C9;&#xAC00; (1-10)</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px">';
for(var z=0;z<8;z++){
var val=heatData?heatData[z]:RISK_BASE[z];
html+='<div><label class="v29-label">'+ZONE_NAMES[z]+'</label><input class="v29-input v29-heat-input" type="number" data-zone="'+z+'" value="'+val+'" min="1" max="10"></div>';
}
html+='</div>';
html+='<button class="v29-btn v29-btn-primary" style="width:100%;margin-top:8px" onclick="window._v29SaveHeat()">&#xC800;&#xC7A5; &amp; &#xBD84;&#xC11D;</button>';
html+='</div>';
var risks=heatData||RISK_BASE;
var totalRisk=0;for(var z=0;z<8;z++)totalRisk+=risks[z];
var avgRisk=(totalRisk/8).toFixed(1);
var riskGrade=avgRisk<=3?'S':avgRisk<=4.5?'A':avgRisk<=6?'B':avgRisk<=7.5?'C':'D';
var rgClr=riskGrade==='S'?'#00FF88':riskGrade==='A'?'#4ECDC4':riskGrade==='B'?'#FECA57':riskGrade==='C'?'#FF9F43':'#FF6B6B';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v29-stat-card"><div class="v29-stat-val" style="color:#FF9F43">'+avgRisk+'</div><div class="v29-stat-label">&#xD3C9;&#xADE0; &#xC704;&#xD5D8;&#xB3C4;</div></div>';
html+='<div class="v29-stat-card"><div class="v29-stat-val" style="color:'+rgClr+'">'+riskGrade+'</div><div class="v29-stat-label">&#xCF54;&#xC2A4; &#xB4F1;&#xAE09;</div></div>';
html+='<div class="v29-stat-card"><div class="v29-stat-val" style="color:#A855F7">'+totalRisk+'</div><div class="v29-stat-label">&#xCD1D; &#xC704;&#xD5D8;&#xC810;&#xC218;</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('heat');drawHeatCanvas(risks);
}
window._v29SaveHeat=function(){
var inputs=document.querySelectorAll('.v29-heat-input');var data=[];
inputs.forEach(function(inp){data[parseInt(inp.dataset.zone)]=parseInt(inp.value)||5;});
lsSet('heat_data',data);playSfx('save_v29');showToast('Heat data saved!');checkAchievements();showCourseHeatIndex();
};
function drawHeatCanvas(risks){
var c=document.getElementById('v29-heat-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=640,H=400;ctx.clearRect(0,0,W,H);
var grd=ctx.createLinearGradient(0,0,0,H);grd.addColorStop(0,'#0d1520');grd.addColorStop(1,'#1a1a2e');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Course Management Heat Index',W/2,24);
var L=55,R=W-25,B=H-50,T=55;
var barW=(R-L)/8-6;
for(var z=0;z<8;z++){
var x=L+z*((R-L)/8)+3;
var riskH=(risks[z]/10)*(B-T);
var rewH=(REWARD_BASE[z]/10)*(B-T);
var hue=120-risks[z]*12;
ctx.fillStyle='hsla('+hue+',70%,50%,0.7)';
ctx.fillRect(x,B-riskH,barW*0.45,riskH);
ctx.fillStyle='rgba(78,205,196,0.4)';
ctx.fillRect(x+barW*0.5,B-rewH,barW*0.45,rewH);
ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='7px sans-serif';ctx.textAlign='center';
var words=ZONE_NAMES[z].split(' ');
ctx.fillText(words[0],x+barW/2,B+12);
if(words[1])ctx.fillText(words[1],x+barW/2,B+21);
ctx.font='9px sans-serif';ctx.fillStyle='#fff';
ctx.fillText(risks[z],x+barW*0.22,B-riskH-4);
ctx.fillStyle='rgba(78,205,196,0.8)';
ctx.fillText(REWARD_BASE[z],x+barW*0.72,B-rewH-4);
}
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='9px sans-serif';ctx.textAlign='right';
for(var v=0;v<=10;v+=2){var y=B-(v/10)*(B-T);ctx.fillText(v,L-4,y+3);}
ctx.fillStyle='rgba(255,159,67,0.6)';ctx.font='9px sans-serif';ctx.textAlign='left';ctx.fillText('█ Risk',L+10,T-8);
ctx.fillStyle='rgba(78,205,196,0.6)';ctx.fillText('█ Reward',L+70,T-8);
}

// ===== 4. FAIRWAY WOOD vs HYBRID COMPARATOR Canvas 620x400 =====
var FW_CLUBS=['3W','5W','7W','9W'];
var HY_CLUBS=['2H','3H','4H','5H'];
var FW_DIST=[230,210,195,180];var HY_DIST=[215,200,190,180];
var FW_ACC=[65,70,72,75];var HY_ACC=[72,78,82,85];
var FW_LAUNCH=[10,12,14,16];var HY_LAUNCH=[13,15,17,19];
var FW_VERSA=[40,50,55,60];var HY_VERSA=[65,70,78,85];
function showHybridCompare(){
playSfx('hybrid_open');
var pn=getPanel('hybrid');
var selPair=lsGet('hybrid_pair',0);
var html='<button class="v29-close" onclick="window._v29Close(\'hybrid\')">&times;</button>';
html+='<div class="v29-title">&#x1F3CC;&#xFE0F; &#xD398;&#xC5B4;&#xC6E8;&#xC774;&#xC6B0;&#xB4DC; vs &#xD558;&#xC774;&#xBE0C;&#xB9AC;&#xB4DC;</div>';
html+='<canvas id="v29-hybrid-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v29-card"><h3>&#xBE44;&#xAD50; &#xC30D; &#xC120;&#xD0DD;</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px">';
for(var i=0;i<4;i++){html+='<button class="v29-btn v29-btn-sm'+(i===selPair?' v29-btn-primary':'')+'" onclick="window._v29SelHybrid('+i+')">'+FW_CLUBS[i]+' vs '+HY_CLUBS[i]+'</button>';}
html+='</div></div>';
var winner=FW_DIST[selPair]>HY_DIST[selPair]?FW_CLUBS[selPair]:HY_CLUBS[selPair];
var distDiff=Math.abs(FW_DIST[selPair]-HY_DIST[selPair]);
var accDiff=Math.abs(FW_ACC[selPair]-HY_ACC[selPair]);
html+='<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:6px;margin:8px 0">';
html+='<div class="v29-card" style="text-align:center"><div style="font-size:11px;color:rgba(255,255,255,0.5)">'+FW_CLUBS[selPair]+'</div>';
html+='<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:4px;margin-top:6px">';
html+='<div><div class="v29-stat-val" style="color:#FF9F43;font-size:16px">'+FW_DIST[selPair]+'yd</div><div class="v29-stat-label">&#xBE44;&#xAC70;&#xB9AC;</div></div>';
html+='<div><div class="v29-stat-val" style="color:#4ECDC4;font-size:16px">'+FW_ACC[selPair]+'%</div><div class="v29-stat-label">&#xC815;&#xD655;&#xB3C4;</div></div>';
html+='</div></div>';
html+='<div class="v29-card" style="text-align:center"><div style="font-size:11px;color:rgba(255,255,255,0.5)">'+HY_CLUBS[selPair]+'</div>';
html+='<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:4px;margin-top:6px">';
html+='<div><div class="v29-stat-val" style="color:#FF9F43;font-size:16px">'+HY_DIST[selPair]+'yd</div><div class="v29-stat-label">&#xBE44;&#xAC70;&#xB9AC;</div></div>';
html+='<div><div class="v29-stat-val" style="color:#4ECDC4;font-size:16px">'+HY_ACC[selPair]+'%</div><div class="v29-stat-label">&#xC815;&#xD655;&#xB3C4;</div></div>';
html+='</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('hybrid');drawHybridCanvas(selPair);
}
window._v29SelHybrid=function(i){lsSet('hybrid_pair',i);showHybridCompare();};
function drawHybridCanvas(pairIdx){
var c=document.getElementById('v29-hybrid-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);
var grd=ctx.createLinearGradient(0,0,0,H);grd.addColorStop(0,'#0d1520');grd.addColorStop(1,'#1a1a2e');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText(FW_CLUBS[pairIdx]+' vs '+HY_CLUBS[pairIdx]+' Comparison Radar',W/2,24);
var cX=W/2,cY=H/2+10,maxR=140;
var axes=['Distance','Accuracy','Launch','Versatility'];
var fwVals=[FW_DIST[pairIdx]/250,FW_ACC[pairIdx]/100,FW_LAUNCH[pairIdx]/25,FW_VERSA[pairIdx]/100];
var hyVals=[HY_DIST[pairIdx]/250,HY_ACC[pairIdx]/100,HY_LAUNCH[pairIdx]/25,HY_VERSA[pairIdx]/100];
for(var r=0.25;r<=1;r+=0.25){
ctx.beginPath();
for(var a=0;a<4;a++){var ang=-Math.PI/2+a*(Math.PI*2/4);var px=cX+Math.cos(ang)*maxR*r;var py=cY+Math.sin(ang)*maxR*r;if(a===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);}
ctx.closePath();ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.lineWidth=0.5;ctx.stroke();
}
for(var a=0;a<4;a++){
var ang=-Math.PI/2+a*(Math.PI*2/4);
ctx.beginPath();ctx.moveTo(cX,cY);ctx.lineTo(cX+Math.cos(ang)*maxR,cY+Math.sin(ang)*maxR);
ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.lineWidth=0.5;ctx.stroke();
ctx.fillStyle='rgba(255,255,255,0.7)';ctx.font='11px sans-serif';ctx.textAlign='center';
ctx.fillText(axes[a],cX+Math.cos(ang)*(maxR+18),cY+Math.sin(ang)*(maxR+18));
}
ctx.beginPath();
for(var a=0;a<4;a++){var ang=-Math.PI/2+a*(Math.PI*2/4);var px=cX+Math.cos(ang)*maxR*fwVals[a];var py=cY+Math.sin(ang)*maxR*fwVals[a];if(a===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);}
ctx.closePath();ctx.fillStyle='rgba(255,159,67,0.15)';ctx.fill();ctx.strokeStyle='#FF9F43';ctx.lineWidth=2;ctx.stroke();
ctx.beginPath();
for(var a=0;a<4;a++){var ang=-Math.PI/2+a*(Math.PI*2/4);var px=cX+Math.cos(ang)*maxR*hyVals[a];var py=cY+Math.sin(ang)*maxR*hyVals[a];if(a===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);}
ctx.closePath();ctx.fillStyle='rgba(0,255,136,0.15)';ctx.fill();ctx.strokeStyle='#00FF88';ctx.lineWidth=2;ctx.stroke();
ctx.fillStyle='#FF9F43';ctx.font='11px sans-serif';ctx.textAlign='left';ctx.fillText('● '+FW_CLUBS[pairIdx],W-120,T=50);
ctx.fillStyle='#00FF88';ctx.fillText('● '+HY_CLUBS[pairIdx],W-120,65);
}

// ===== 5. ROUND MOMENTUM SWING ANALYZER Canvas 640x400 =====
function showMomentumAnalyzer(){
playSfx('momentum_open');
var pn=getPanel('momentum');
var momData=lsGet('mom_data',[]);
var html='<button class="v29-close" onclick="window._v29Close(\'momentum\')">&times;</button>';
html+='<div class="v29-title">&#x1F4CA; &#xB77C;&#xC6B4;&#xB4DC; &#xBAA8;&#xBA58;&#xD140; &#xC2A4;&#xC719; &#xBD84;&#xC11D;&#xAE30;</div>';
html+='<canvas id="v29-mom-canvas" width="640" height="400" style="width:100%;max-width:640px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v29-card"><h3>&#xD640;&#xBCC4; &#xBAA8;&#xBA58;&#xD140; &#xC810;&#xC218; (-5 ~ +5)</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:4px">';
for(var h=0;h<18;h++){
var val=momData[h]||0;
html+='<div><label class="v29-label">H'+(h+1)+'</label><input class="v29-input v29-mom-input" type="number" data-hole="'+h+'" value="'+val+'" min="-5" max="5"></div>';
}
html+='</div>';
html+='<button class="v29-btn v29-btn-primary" style="width:100%;margin-top:8px" onclick="window._v29SaveMom()">&#xC800;&#xC7A5; &amp; &#xBD84;&#xC11D;</button>';
html+='</div>';
var totalMom=0,posCount=0,negCount=0,streak=0,maxStreak=0,curStrk=0;
for(var h=0;h<18;h++){var v=momData[h]||0;totalMom+=v;if(v>0){posCount++;curStrk++;if(curStrk>maxStreak)maxStreak=curStrk;}else{curStrk=0;if(v<0)negCount++;}}
var avgMom=(totalMom/18).toFixed(1);
var momGrade=totalMom>=20?'S':totalMom>=10?'A':totalMom>=0?'B':totalMom>=-10?'C':'D';
var mgClr=momGrade==='S'?'#00FF88':momGrade==='A'?'#4ECDC4':momGrade==='B'?'#FECA57':momGrade==='C'?'#FF9F43':'#FF6B6B';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v29-stat-card"><div class="v29-stat-val" style="color:#00FF88">'+totalMom+'</div><div class="v29-stat-label">&#xCD1D; &#xBAA8;&#xBA58;&#xD140;</div></div>';
html+='<div class="v29-stat-card"><div class="v29-stat-val" style="color:#FFB800">'+avgMom+'</div><div class="v29-stat-label">&#xD3C9;&#xADE0;</div></div>';
html+='<div class="v29-stat-card"><div class="v29-stat-val" style="color:#A855F7">'+maxStreak+'H</div><div class="v29-stat-label">&#xCD5C;&#xC7A5; &#xC5F0;&#xC18D;</div></div>';
html+='<div class="v29-stat-card"><div class="v29-stat-val" style="color:'+mgClr+'">'+momGrade+'</div><div class="v29-stat-label">&#xBAA8;&#xBA58;&#xD140; &#xB4F1;&#xAE09;</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('momentum');drawMomCanvas(momData);
}
window._v29SaveMom=function(){
var inputs=document.querySelectorAll('.v29-mom-input');var data=[];
inputs.forEach(function(inp){data[parseInt(inp.dataset.hole)]=parseInt(inp.value)||0;});
lsSet('mom_data',data);playSfx('save_v29');showToast('Momentum data saved!');checkAchievements();showMomentumAnalyzer();
};
function drawMomCanvas(momData){
var c=document.getElementById('v29-mom-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=640,H=400;ctx.clearRect(0,0,W,H);
var grd=ctx.createLinearGradient(0,0,0,H);grd.addColorStop(0,'#0d1520');grd.addColorStop(1,'#1a1a2e');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Round Momentum Swing (18H)',W/2,24);
var L=50,R=W-20,B=H-45,T=50;
var midY=(T+B)/2;
ctx.strokeStyle='rgba(255,255,255,0.15)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(L,midY);ctx.lineTo(R,midY);ctx.stroke();
var barW=(R-L)/18-3;
var cumMom=0;
ctx.beginPath();ctx.strokeStyle='#FFB800';ctx.lineWidth=2;
for(var h=0;h<18;h++){
var v=momData[h]||0;
var x=L+h*((R-L)/18)+2;
var barH=Math.abs(v)/5*(midY-T);
if(v>=0){
ctx.fillStyle='rgba(0,255,136,0.5)';
ctx.fillRect(x,midY-barH,barW,barH);
}else{
ctx.fillStyle='rgba(255,107,107,0.5)';
ctx.fillRect(x,midY,barW,barH);
}
cumMom+=v;
var cumY=midY-(cumMom/30)*(midY-T);
cumY=Math.max(T,Math.min(B,cumY));
if(h===0)ctx.moveTo(x+barW/2,cumY);else ctx.lineTo(x+barW/2,cumY);
ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='8px sans-serif';ctx.textAlign='center';
ctx.fillText('H'+(h+1),x+barW/2,B+12);
}
ctx.stroke();
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='9px sans-serif';ctx.textAlign='right';
ctx.fillText('+5',L-4,T+3);ctx.fillText('0',L-4,midY+3);ctx.fillText('-5',L-4,B+3);
ctx.fillStyle='rgba(0,255,136,0.5)';ctx.font='9px sans-serif';ctx.textAlign='left';ctx.fillText('█ Positive',L+10,T-8);
ctx.fillStyle='rgba(255,107,107,0.5)';ctx.fillText('█ Negative',L+80,T-8);
ctx.fillStyle='rgba(255,184,0,0.7)';ctx.fillText('— Cumulative',L+160,T-8);
}

// ===== 6. PRACTICE DRILL EFFECTIVENESS TRACKER Canvas 620x400 =====
var DRILL_TYPES=['Putting Gate','Lag Putt','Chip & Run','Pitch 50yd','Bunker Exit','Iron Accuracy','Driver Align','Short Game'];
var DRILL_COLORS=['#00FF88','#4ECDC4','#48DBFB','#A855F7','#FF85A2','#FF9F43','#FF6B6B','#FECA57'];
function showDrillTracker(){
playSfx('drill_open');
var pn=getPanel('drill');
var drillData=lsGet('drill_data',null);
var html='<button class="v29-close" onclick="window._v29Close(\'drill\')">&times;</button>';
html+='<div class="v29-title">&#x1F3AF; &#xC5F0;&#xC2B5; &#xB4DC;&#xB9B4; &#xD6A8;&#xACFC; &#xCD94;&#xC801;&#xAE30;</div>';
html+='<canvas id="v29-drill-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v29-card"><h3>&#xB4DC;&#xB9B4; &#xD6A8;&#xACFC; &#xD3C9;&#xAC00; (1-10)</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px">';
for(var d=0;d<8;d++){
var val=drillData?drillData[d]:5;
html+='<div><label class="v29-label">'+DRILL_TYPES[d]+'</label><input class="v29-input v29-drill-input" type="number" data-drill="'+d+'" value="'+val+'" min="1" max="10"></div>';
}
html+='</div>';
html+='<button class="v29-btn v29-btn-primary" style="width:100%;margin-top:8px" onclick="window._v29SaveDrill()">&#xC800;&#xC7A5; &amp; &#xBD84;&#xC11D;</button>';
html+='</div>';
var vals=drillData||[5,5,5,5,5,5,5,5];
var totalEff=0;for(var d=0;d<8;d++)totalEff+=vals[d];
var avgEff=(totalEff/8).toFixed(1);
var bestDrill=0;for(var d=1;d<8;d++){if(vals[d]>vals[bestDrill])bestDrill=d;}
var effGrade=avgEff>=8?'S':avgEff>=6.5?'A':avgEff>=5?'B':avgEff>=3.5?'C':'D';
var egClr=effGrade==='S'?'#00FF88':effGrade==='A'?'#4ECDC4':effGrade==='B'?'#FECA57':effGrade==='C'?'#FF9F43':'#FF6B6B';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v29-stat-card"><div class="v29-stat-val" style="color:#00FF88">'+avgEff+'</div><div class="v29-stat-label">&#xD3C9;&#xADE0; &#xD6A8;&#xACFC;</div></div>';
html+='<div class="v29-stat-card"><div class="v29-stat-val" style="color:#FFB800">'+DRILL_TYPES[bestDrill]+'</div><div class="v29-stat-label" style="font-size:8px">&#xBCA0;&#xC2A4;&#xD2B8; &#xB4DC;&#xB9B4;</div></div>';
html+='<div class="v29-stat-card"><div class="v29-stat-val" style="color:#A855F7">'+totalEff+'</div><div class="v29-stat-label">&#xCD1D;&#xC810;</div></div>';
html+='<div class="v29-stat-card"><div class="v29-stat-val" style="color:'+egClr+'">'+effGrade+'</div><div class="v29-stat-label">&#xB4F1;&#xAE09;</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('drill');drawDrillCanvas(vals);
}
window._v29SaveDrill=function(){
var inputs=document.querySelectorAll('.v29-drill-input');var data=[];
inputs.forEach(function(inp){data[parseInt(inp.dataset.drill)]=parseInt(inp.value)||5;});
lsSet('drill_data',data);playSfx('save_v29');showToast('Drill data saved!');checkAchievements();showDrillTracker();
};
function drawDrillCanvas(vals){
var c=document.getElementById('v29-drill-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);
var grd=ctx.createLinearGradient(0,0,0,H);grd.addColorStop(0,'#0d1520');grd.addColorStop(1,'#1a1a2e');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Practice Drill Effectiveness',W/2,24);
var cX=W/2,cY=H/2+10,maxR=135;
for(var r=0.25;r<=1;r+=0.25){
ctx.beginPath();
for(var a=0;a<8;a++){var ang=-Math.PI/2+a*(Math.PI*2/8);var px=cX+Math.cos(ang)*maxR*r;var py=cY+Math.sin(ang)*maxR*r;if(a===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);}
ctx.closePath();ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.lineWidth=0.5;ctx.stroke();
}
for(var a=0;a<8;a++){
var ang=-Math.PI/2+a*(Math.PI*2/8);
ctx.beginPath();ctx.moveTo(cX,cY);ctx.lineTo(cX+Math.cos(ang)*maxR,cY+Math.sin(ang)*maxR);
ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.lineWidth=0.5;ctx.stroke();
ctx.fillStyle='rgba(255,255,255,0.7)';ctx.font='9px sans-serif';ctx.textAlign='center';
var lx=cX+Math.cos(ang)*(maxR+20),ly=cY+Math.sin(ang)*(maxR+20);
ctx.fillText(DRILL_TYPES[a].split(' ')[0],lx,ly);
if(DRILL_TYPES[a].split(' ')[1])ctx.fillText(DRILL_TYPES[a].split(' ').slice(1).join(' '),lx,ly+10);
}
ctx.beginPath();
for(var a=0;a<8;a++){var ang=-Math.PI/2+a*(Math.PI*2/8);var v=vals[a]/10;var px=cX+Math.cos(ang)*maxR*v;var py=cY+Math.sin(ang)*maxR*v;if(a===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);}
ctx.closePath();ctx.fillStyle='rgba(0,255,136,0.15)';ctx.fill();ctx.strokeStyle='#00FF88';ctx.lineWidth=2;ctx.stroke();
for(var a=0;a<8;a++){var ang=-Math.PI/2+a*(Math.PI*2/8);var v=vals[a]/10;var px=cX+Math.cos(ang)*maxR*v;var py=cY+Math.sin(ang)*maxR*v;
ctx.beginPath();ctx.arc(px,py,4,0,Math.PI*2);ctx.fillStyle=DRILL_COLORS[a];ctx.fill();ctx.strokeStyle='rgba(255,255,255,0.3)';ctx.lineWidth=1;ctx.stroke();}
}

// ===== 7. SHOT SHAPE WIND ADJUSTMENT CALCULATOR Canvas 620x400 =====
var SHOT_SHAPES=['Straight','Draw','Fade','Hook','Slice','Low Punch','High Lob','Knockdown'];
var SHAPE_WIND_MULT=[1.0,0.85,0.85,1.3,1.3,0.6,1.4,0.5];
var SHAPE_DIST_ADJ=[0,5,-3,8,-5,-15,5,-20];
function showWindAdjust(){
playSfx('windadj_open');
var pn=getPanel('windadj');
var windSpeed=lsGet('wind_speed',15);
var selShape=lsGet('wind_shape',0);
var html='<button class="v29-close" onclick="window._v29Close(\'windadj\')">&times;</button>';
html+='<div class="v29-title">&#x1F32C;&#xFE0F; &#xC0F7;&#xC170;&#xC774;&#xD504; &#xBC14;&#xB78C; &#xBCF4;&#xC815; &#xACC4;&#xC0B0;&#xAE30;</div>';
html+='<canvas id="v29-wind-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v29-card"><h3>&#xBC14;&#xB78C; &#xC18D;&#xB3C4; (mph)</h3>';
html+='<input class="v29-input" type="range" min="0" max="40" value="'+windSpeed+'" id="v29-wind-slider" style="width:100%" oninput="window._v29UpdateWind(this.value)">';
html+='<div style="text-align:center;color:#FFB800;font-weight:bold;margin:4px 0" id="v29-wind-val">'+windSpeed+' mph</div>';
html+='<h3>&#xC0F7; &#xC170;&#xC774;&#xD504;</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px">';
for(var s=0;s<8;s++){html+='<button class="v29-btn v29-btn-sm'+(s===selShape?' v29-btn-primary':'')+'" onclick="window._v29SelWind('+s+')">'+SHOT_SHAPES[s]+'</button>';}
html+='</div></div>';
var effWind=Math.round(windSpeed*SHAPE_WIND_MULT[selShape]);
var distAdj=SHAPE_DIST_ADJ[selShape];
var totalAdj=Math.round(-windSpeed*0.5*SHAPE_WIND_MULT[selShape]+distAdj);
var diff=Math.abs(totalAdj);
var adjGrade=diff<=5?'S':diff<=10?'A':diff<=18?'B':diff<=25?'C':'D';
var agClr=adjGrade==='S'?'#00FF88':adjGrade==='A'?'#4ECDC4':adjGrade==='B'?'#FECA57':adjGrade==='C'?'#FF9F43':'#FF6B6B';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v29-stat-card"><div class="v29-stat-val" style="color:#48DBFB">'+effWind+'mph</div><div class="v29-stat-label">&#xCCB4;&#xAC10; &#xBC14;&#xB78C;</div></div>';
html+='<div class="v29-stat-card"><div class="v29-stat-val" style="color:#FF9F43">'+(distAdj>0?'+':'')+distAdj+'yd</div><div class="v29-stat-label">&#xC170;&#xC774;&#xD504; &#xBCF4;&#xC815;</div></div>';
html+='<div class="v29-stat-card"><div class="v29-stat-val" style="color:'+(totalAdj>=0?'#00FF88':'#FF6B6B')+'">'+(totalAdj>=0?'+':'')+totalAdj+'yd</div><div class="v29-stat-label">&#xCD1D; &#xBE44;&#xAC70;&#xB9AC; &#xBCF4;&#xC815;</div></div>';
html+='<div class="v29-stat-card"><div class="v29-stat-val" style="color:'+agClr+'">'+adjGrade+'</div><div class="v29-stat-label">&#xBC14;&#xB78C; &#xB4F1;&#xAE09;</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('windadj');drawWindCanvas(windSpeed,selShape);
}
window._v29UpdateWind=function(v){lsSet('wind_speed',parseInt(v));document.getElementById('v29-wind-val').textContent=v+' mph';drawWindCanvas(parseInt(v),lsGet('wind_shape',0));};
window._v29SelWind=function(s){lsSet('wind_shape',s);showWindAdjust();};
function drawWindCanvas(windSpeed,shapeIdx){
var c=document.getElementById('v29-wind-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);
var grd=ctx.createLinearGradient(0,0,0,H);grd.addColorStop(0,'#0d1520');grd.addColorStop(1,'#1a1a2e');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Shot Shape Wind Impact at '+windSpeed+'mph',W/2,24);
var L=55,R=W-25,B=H-50,T=55;
var barW=(R-L)/8-6;
for(var s=0;s<8;s++){
var x=L+s*((R-L)/8)+3;
var effW=windSpeed*SHAPE_WIND_MULT[s];
var maxEff=windSpeed*1.5||1;
var h=(effW/maxEff)*(B-T)*0.8;
h=Math.min(h,B-T);
ctx.fillStyle=s===shapeIdx?'rgba(0,255,136,0.6)':'rgba(72,219,251,0.3)';
ctx.fillRect(x,B-h,barW,h);
ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='7px sans-serif';ctx.textAlign='center';
var parts=SHOT_SHAPES[s].split(' ');
ctx.fillText(parts[0],x+barW/2,B+12);
if(parts[1])ctx.fillText(parts[1],x+barW/2,B+21);
ctx.fillStyle='#fff';ctx.font='9px sans-serif';
ctx.fillText(Math.round(effW)+'mph',x+barW/2,B-h-5);
}
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='9px sans-serif';ctx.textAlign='right';
for(var v=0;v<=40;v+=10){var y=B-(v/(windSpeed*1.5||1))*(B-T)*0.8;if(y>=T)ctx.fillText(v+'mph',L-4,y+3);}
}

// ===== 8. COMPREHENSIVE ROUND ANALYTICS DASHBOARD Canvas 620x400 =====
var ANALYTICS_KPI=['Shot Precision','Course Mgmt','Mental Game','Short Game','Long Game','Putting','Fitness','Strategy'];
var ANALYTICS_WEIGHTS=[15,12,13,14,12,16,8,10];
function showAnalyticsDash(){
playSfx('analytics_open');
var pn=getPanel('analytics');
var kpiData=lsGet('analytics_kpi',null);
var html='<button class="v29-close" onclick="window._v29Close(\'analytics\')">&times;</button>';
html+='<div class="v29-title">&#x1F4CA; &#xC885;&#xD569; &#xB77C;&#xC6B4;&#xB4DC; &#xBD84;&#xC11D; &#xB300;&#xC2DC;&#xBCF4;&#xB4DC;</div>';
html+='<canvas id="v29-analytics-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v29-card"><h3>KPI &#xC810;&#xC218; &#xC785;&#xB825; (0-100)</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px">';
for(var k=0;k<8;k++){
var val=kpiData?kpiData[k]:50;
html+='<div><label class="v29-label">'+ANALYTICS_KPI[k]+'</label><input class="v29-input v29-kpi-input" type="number" data-kpi="'+k+'" value="'+val+'" min="0" max="100"></div>';
}
html+='</div>';
html+='<button class="v29-btn v29-btn-primary" style="width:100%;margin-top:8px" onclick="window._v29SaveKPI()">&#xC800;&#xC7A5; &amp; &#xBD84;&#xC11D;</button>';
html+='</div>';
var vals=kpiData||[50,50,50,50,50,50,50,50];
var weightedSum=0,totalW=0;
for(var k=0;k<8;k++){weightedSum+=vals[k]*ANALYTICS_WEIGHTS[k];totalW+=ANALYTICS_WEIGHTS[k];}
var overall=Math.round(weightedSum/totalW);
var oGrade=overall>=85?'S':overall>=70?'A':overall>=55?'B':overall>=40?'C':'D';
var ogClr=oGrade==='S'?'#00FF88':oGrade==='A'?'#4ECDC4':oGrade==='B'?'#FECA57':oGrade==='C'?'#FF9F43':'#FF6B6B';
var bestKpi=0,worstKpi=0;
for(var k=1;k<8;k++){if(vals[k]>vals[bestKpi])bestKpi=k;if(vals[k]<vals[worstKpi])worstKpi=k;}
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v29-stat-card"><div class="v29-stat-val" style="color:'+ogClr+'">'+oGrade+'</div><div class="v29-stat-label">&#xC885;&#xD569; &#xB4F1;&#xAE09;</div></div>';
html+='<div class="v29-stat-card"><div class="v29-stat-val" style="color:#00FF88">'+overall+'</div><div class="v29-stat-label">&#xC885;&#xD569; &#xC810;&#xC218;</div></div>';
html+='<div class="v29-stat-card"><div class="v29-stat-val" style="color:#4ECDC4;font-size:12px">'+ANALYTICS_KPI[bestKpi]+'</div><div class="v29-stat-label">&#xAC15;&#xC810;</div></div>';
html+='<div class="v29-stat-card"><div class="v29-stat-val" style="color:#FF6B6B;font-size:12px">'+ANALYTICS_KPI[worstKpi]+'</div><div class="v29-stat-label">&#xAC1C;&#xC120;&#xD544;&#xC694;</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('analytics');drawAnalyticsCanvas(vals);
}
window._v29SaveKPI=function(){
var inputs=document.querySelectorAll('.v29-kpi-input');var data=[];
inputs.forEach(function(inp){data[parseInt(inp.dataset.kpi)]=parseInt(inp.value)||50;});
lsSet('analytics_kpi',data);playSfx('save_v29');showToast('Analytics saved!');checkAchievements();showAnalyticsDash();
};
function drawAnalyticsCanvas(vals){
var c=document.getElementById('v29-analytics-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);
var grd=ctx.createLinearGradient(0,0,0,H);grd.addColorStop(0,'#0d1520');grd.addColorStop(1,'#1a1a2e');
ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 15px sans-serif';ctx.textAlign='center';
ctx.fillText('Round Analytics Dashboard (8 KPI)',W/2,24);
var gW=130,gH=80,cols=4,rows=2,gapX=16,gapY=20;
var totalGW=cols*gW+(cols-1)*gapX;
var startX=(W-totalGW)/2;
var startY=50;
for(var k=0;k<8;k++){
var col=k%cols,row=Math.floor(k/cols);
var cx=startX+col*(gW+gapX)+gW/2;
var cy=startY+row*(gH+gapY+40)+gH/2+20;
var r=gW/2-10;
var pct=vals[k]/100;
var angle=Math.PI+pct*Math.PI;
ctx.beginPath();ctx.arc(cx,cy,r,Math.PI,2*Math.PI);
ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.lineWidth=8;ctx.stroke();
var kGrade=vals[k]>=85?'S':vals[k]>=70?'A':vals[k]>=55?'B':vals[k]>=40?'C':'D';
var kClr=kGrade==='S'?'#00FF88':kGrade==='A'?'#4ECDC4':kGrade==='B'?'#FECA57':kGrade==='C'?'#FF9F43':'#FF6B6B';
ctx.beginPath();ctx.arc(cx,cy,r,Math.PI,angle);
ctx.strokeStyle=kClr;ctx.lineWidth=8;ctx.lineCap='round';ctx.stroke();ctx.lineCap='butt';
ctx.fillStyle='#fff';ctx.font='bold 18px sans-serif';ctx.textAlign='center';
ctx.fillText(vals[k],cx,cy-2);
ctx.fillStyle=kClr;ctx.font='bold 14px sans-serif';
ctx.fillText(kGrade,cx,cy+16);
ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='9px sans-serif';
ctx.fillText(ANALYTICS_KPI[k],cx,cy+r+16);
ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='8px sans-serif';
ctx.fillText('w:'+ANALYTICS_WEIGHTS[k]+'%',cx,cy+r+27);
}
}

// ===== QUIZ v29 (15 questions, total 330) =====
var QUIZ_V29=[
{q:'&#xC0F7; &#xBD84;&#xC0B0; &#xD0C0;&#xC6D0;&#xC5D0;&#xC11C; CEP&#xB780;?',a:['Circular Error Probable','Club Efficiency Point','Course Entry Position','Center Exit Point'],c:0},
{q:'&#xC5B8;&#xB355;&#xD30C; &#xB77C;&#xC774;&#xC5D0;&#xC11C; &#xBE44;&#xAC70;&#xB9AC;&#xB294;?',a:['&#xAC19;&#xB2E4;','&#xC904;&#xC5B4;&#xB4E0;&#xB2E4;','&#xB298;&#xC5B4;&#xB09C;&#xB2E4;','&#xC608;&#xCE21; &#xBD88;&#xAC00;'],c:1},
{q:'&#xD398;&#xC5B4;&#xC6E8;&#xC774;&#xC6B0;&#xB4DC; &#xB300;&#xBE44; &#xD558;&#xC774;&#xBE0C;&#xB9AC;&#xB4DC;&#xC758; &#xC7A5;&#xC810;&#xC740;?',a:['&#xBE44;&#xAC70;&#xB9AC;','&#xC815;&#xD655;&#xB3C4;&#xC640; &#xB2E4;&#xC591;&#xC131;','&#xC2A4;&#xD540;','&#xBB34;&#xAC8C;'],c:1},
{q:'&#xBAA8;&#xBA58;&#xD140; &#xC810;&#xC218;&#xAC00; &#xC591;&#xC218;&#xC77C; &#xB54C;&#xB294;?',a:['&#xBABB; &#xCE5C; &#xD640;','&#xC798; &#xCE5C; &#xD640;','&#xBCF4;&#xAE30; &#xD640;','&#xD30C;3 &#xD640;'],c:1},
{q:'Putting Gate &#xB4DC;&#xB9B4;&#xC758; &#xBAA9;&#xC801;&#xC740;?',a:['&#xBE44;&#xAC70;&#xB9AC;','&#xBC29;&#xD5A5;&#xC131;','&#xC2A4;&#xD53C;&#xB4DC;','&#xC885;&#xD569;'],c:1},
{q:'&#xD5E4;&#xB4DC;&#xC708;&#xB4DC; 15mph&#xC77C; &#xB54C; &#xB178;&#xD06C;&#xB2E4;&#xC6B4;&#xC0F7;&#xC758; &#xCCB4;&#xAC10; &#xBC14;&#xB78C;&#xC740;?',a:['15mph','21mph','7.5mph','10.5mph'],c:2},
{q:'&#xBC99;&#xCEE4; &#xB77C;&#xC774;&#xC5D0;&#xC11C; &#xBE44;&#xAC70;&#xB9AC; &#xBE44;&#xC728;&#xC740; &#xC57D;?',a:['100%','90%','80%','70%'],c:3},
{q:'KPI &#xAC00;&#xC911; &#xD3C9;&#xADE0;&#xC5D0;&#xC11C; &#xAC00;&#xC7A5; &#xB192;&#xC740; &#xBE44;&#xC911;&#xC740;?',a:['Short Game','Putting','Strategy','Mental'],c:1},
{q:'1σ &#xD0C0;&#xC6D0; &#xC548;&#xC5D0; &#xB4E4;&#xC5B4;&#xAC08; &#xD655;&#xB960;&#xC740; &#xC57D;?',a:['50%','68%','95%','99%'],c:1},
{q:'&#xB4DC;&#xB85C;(Draw) &#xC0F7;&#xC774; &#xBC14;&#xB78C;&#xC5D0; &#xAC15;&#xD55C; &#xC774;&#xC720;&#xB294;?',a:['&#xB0AE;&#xC740; &#xD0C4;&#xB3C4;','&#xB0AE;&#xC740; &#xC2A4;&#xD540;','&#xAC15;&#xD55C; &#xC784;&#xD329;&#xD2B8;','&#xC801;&#xC740; &#xCE21;&#xBA74; &#xC2A4;&#xD540;'],c:1},
{q:'Round Momentum&#xC5D0;&#xC11C; &#xCF54;&#xC2A4; &#xC870;&#xAC74; &#xBCC0;&#xD654;&#xAC00; &#xC911;&#xC694;&#xD55C; &#xC774;&#xC720;&#xB294;?',a:['&#xC2A4;&#xCF54;&#xC5B4;','&#xC790;&#xC2E0;&#xAC10;','&#xC804;&#xB7B5; &#xC801;&#xC751;','&#xCCB4;&#xB825;'],c:2},
{q:'Side-hill &#xB77C;&#xC774;&#xC5D0;&#xC11C; &#xACF5;&#xC740; &#xC5B4;&#xB514;&#xB85C; &#xD718;&#xB294;&#xAC00;?',a:['&#xACBD;&#xC0AC;&#xBA74; &#xC704;&#xCABD;','&#xACBD;&#xC0AC;&#xBA74; &#xC544;&#xB798;&#xCABD;','&#xC9C1;&#xC9C4;','&#xC608;&#xCE21; &#xBD88;&#xAC00;'],c:1},
{q:'&#xCF54;&#xC2A4; &#xD788;&#xD2B8; &#xC778;&#xB371;&#xC2A4;&#xC5D0;&#xC11C; OB &#xAD6C;&#xC5ED;&#xC758; &#xBCF4;&#xC0C1;&#xC740;?',a:['10','5','0','1'],c:2},
{q:'Lag Putt &#xB4DC;&#xB9B4;&#xC758; &#xBAA9;&#xD45C;&#xB294;?',a:['&#xD640;&#xC778;','3&#xD53C;&#xD2B8; &#xC774;&#xB0B4;','&#xC815;&#xD655;&#xD55C; &#xBC29;&#xD5A5;','&#xCD5C;&#xB300; &#xAC70;&#xB9AC;'],c:1},
{q:'&#xBCF4;&#xAE30;(Bogey) &#xD640; &#xD6C4; &#xBAA8;&#xBA58;&#xD140; &#xD68C;&#xBCF5;&#xC5D0; &#xAC00;&#xC7A5; &#xC911;&#xC694;&#xD55C; &#xAC83;&#xC740;?',a:['&#xACF5;&#xACA9;&#xC801; &#xD50C;&#xB808;&#xC774;','&#xBA58;&#xD0C8; &#xB9AC;&#xC14B;','&#xBCF4;&#xC218;&#xC801; &#xC804;&#xB7B5;','&#xC7A5;&#xBE44; &#xAD50;&#xCCB4;'],c:2}
];
var quizState29=lsGet('quiz_state29',{idx:0,score:0,total:0,done:false});
function showQuizV29(){
playSfx('nav_v29');
var pn=getPanel('quiz29');
var qs=quizState29;
if(qs.done){qs={idx:0,score:0,total:0,done:false};lsSet('quiz_state29',qs);}
var q=QUIZ_V29[qs.idx];
var html='<button class="v29-close" onclick="window._v29Close(\'quiz29\')">&times;</button>';
html+='<div class="v29-title">&#x1F4DA; Golf IQ v29 (Q'+(qs.idx+1)+'/'+QUIZ_V29.length+')</div>';
html+='<div class="v29-card"><h3>'+q.q+'</h3></div>';
html+='<div style="display:grid;gap:6px;margin:8px 0">';
for(var i=0;i<q.a.length;i++){
html+='<button class="v29-btn" style="width:100%;text-align:left;margin-bottom:6px;padding:10px 14px" onclick="window._v29AnswerQuiz('+i+')">'+String.fromCharCode(65+i)+'. '+q.a[i]+'</button>';
}
html+='</div>';
var pct=qs.total>0?Math.round(qs.score/qs.total*100):0;
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v29-stat-card"><div class="v29-stat-val" style="color:#00FF88">'+qs.score+'</div><div class="v29-stat-label">&#xC815;&#xB2F5;</div></div>';
html+='<div class="v29-stat-card"><div class="v29-stat-val" style="color:#FF6B6B">'+(qs.total-qs.score)+'</div><div class="v29-stat-label">&#xC624;&#xB2F5;</div></div>';
html+='<div class="v29-stat-card"><div class="v29-stat-val" style="color:#FFB800">'+pct+'%</div><div class="v29-stat-label">&#xC815;&#xB2F5;&#xB960;</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('quiz29');
}
window._v29AnswerQuiz=function(i){
var qs=quizState29;var q=QUIZ_V29[qs.idx];qs.total++;
if(i===q.c){qs.score++;playSfx('quiz_correct_v29');showToast('&#xC815;&#xB2F5;! ✔');}
else{playSfx('quiz_wrong_v29');showToast('&#xC624;&#xB2F5;! &#xC815;&#xB2F5;: '+q.a[q.c]);}
qs.idx++;if(qs.idx>=QUIZ_V29.length){qs.done=true;showToast('Quiz Complete! '+qs.score+'/'+qs.total);}
lsSet('quiz_state29',qs);setTimeout(showQuizV29,800);
};

// ===== ACHIEVEMENTS v29 =====
var ACHIEVE_V29=[
{id:'ellipse_first',name:'Dispersion Analyst',desc:'Open shot dispersion ellipse fitter',check:function(){return lsGet('v29_explored',0)>=1}},
{id:'lie_check',name:'Lie Expert',desc:'Check lie angle impact',check:function(){return lsGet('lie_sel',null)!==null}},
{id:'heat_record',name:'Course Strategist',desc:'Record course heat index data',check:function(){return lsGet('heat_data',null)!==null}},
{id:'hybrid_compare',name:'Club Technician',desc:'Compare FW vs Hybrid',check:function(){return lsGet('hybrid_pair',null)!==null}},
{id:'mom_record',name:'Momentum Tracker',desc:'Record round momentum data',check:function(){return lsGet('mom_data',null)!==null&&lsGet('mom_data',[]).length>0}},
{id:'drill_eval',name:'Drill Master',desc:'Evaluate practice drill effectiveness',check:function(){return lsGet('drill_data',null)!==null}},
{id:'wind_calc',name:'Wind Wizard',desc:'Calculate wind adjustment',check:function(){return lsGet('wind_speed',null)!==null}},
{id:'analytics_view',name:'Analytics Pro',desc:'View analytics dashboard',check:function(){return lsGet('analytics_viewed',false)}},
{id:'quiz29_perfect',name:'Quiz v29 Ace',desc:'Get 100% on v29 quiz',check:function(){var q=lsGet('quiz_state29',{});return q.done&&q.score===QUIZ_V29.length}},
{id:'quiz29_complete',name:'Quiz v29 Scholar',desc:'Complete v29 quiz',check:function(){var q=lsGet('quiz_state29',{});return q.done}},
{id:'explore_all_v29',name:'v29 Explorer',desc:'Try all 8 v29 features',check:function(){return lsGet('v29_explored',0)>=8}},
{id:'v29_complete',name:'v29 Graduate',desc:'Earn 8+ v29 achievements',check:function(){var cnt=0;for(var i=0;i<ACHIEVE_V29.length-1;i++){if(ACHIEVE_V29[i].check())cnt++;}return cnt>=8}}
];
function checkAchievements(){
var unlocked=lsGet('achievements29',[]);var newOnes=false;
for(var i=0;i<ACHIEVE_V29.length;i++){
if(unlocked.indexOf(ACHIEVE_V29[i].id)===-1&&ACHIEVE_V29[i].check()){
unlocked.push(ACHIEVE_V29[i].id);newOnes=true;
playSfx('achieve_v29');showToast('🏆 '+ACHIEVE_V29[i].name+'!');
}}
if(newOnes)lsSet('achievements29',unlocked);
}
var explored29=lsGet('v29_explored',0);
function markExplored(){explored29++;lsSet('v29_explored',explored29);
lsSet('analytics_viewed',true);}

// ===== CSS =====
var style=document.createElement('style');
style.textContent='.v29-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:10020;display:none;align-items:center;justify-content:center;padding:16px;overflow-y:auto}.v29-overlay.active{display:flex}.v29-panel{background:#14141a;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:20px;max-width:660px;width:100%;max-height:90vh;overflow-y:auto;position:relative}.v29-close{position:absolute;top:12px;right:12px;background:none;border:none;color:#fff;font-size:24px;cursor:pointer;z-index:2;opacity:0.7}.v29-close:hover{opacity:1}.v29-title{font-size:18px;font-weight:bold;color:#fff;margin-bottom:12px;text-align:center}.v29-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;margin:8px 0}.v29-card h3{font-size:13px;color:rgba(255,255,255,0.7);margin-bottom:6px}.v29-label{font-size:10px;color:rgba(255,255,255,0.5);display:block;margin-bottom:2px}.v29-input{width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:6px;color:#fff;padding:6px 8px;font-size:12px;outline:none;box-sizing:border-box}.v29-input:focus{border-color:#FF6B6B}.v29-btn{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);border-radius:8px;color:#fff;padding:8px 12px;font-size:12px;cursor:pointer;transition:all 0.2s}.v29-btn:hover{background:rgba(255,255,255,0.12)}.v29-btn-primary{background:rgba(255,107,107,0.15);border-color:rgba(255,107,107,0.3);color:#FF6B6B}.v29-btn-primary:hover{background:rgba(255,107,107,0.25)}.v29-btn-sm{padding:6px 8px;font-size:11px}.v29-stat-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:10px;text-align:center}.v29-stat-val{font-size:18px;font-weight:bold}.v29-stat-label{font-size:9px;color:rgba(255,255,255,0.5);margin-top:2px}.v29-toast{position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(20px);background:rgba(255,107,107,0.15);border:1px solid rgba(255,107,107,0.3);color:#FF6B6B;padding:10px 20px;border-radius:10px;font-size:13px;z-index:10030;opacity:0;transition:all 0.3s}.v29-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}';
document.head.appendChild(style);

// ===== NAVIGATION =====
window._v29Close=function(id){closePanel(id);};
function addNavButtons(){
var nav=document.querySelector('.v16-scroll-nav')||document.querySelector('[class*="bottom-bar"]')||document.querySelector('.gt-bottom-nav')||document.querySelector('[style*="position:fixed"][style*="bottom"]');
if(!nav){
var allFixed=document.querySelectorAll('[style*="position: fixed"], [style*="position:fixed"]');
for(var i=0;i<allFixed.length;i++){if(allFixed[i].style.bottom==='0px'||allFixed[i].style.bottom==='0'){nav=allFixed[i];break;}}
}
if(!nav){
var navBars=document.querySelectorAll('div');
for(var i=0;i<navBars.length;i++){
var s=window.getComputedStyle(navBars[i]);
if(s.position==='fixed'&&(s.bottom==='0px'||s.bottom==='0')&&parseInt(s.zIndex)>900){nav=navBars[i];break;}
}
}
if(!nav){if(addNavButtons._retries<20){addNavButtons._retries++;setTimeout(addNavButtons,500);}return;}
var btns=[
{label:'Ellipse',fn:showEllipseFitter,icon:'&#x1F4CD;'},
{label:'LieImp',fn:showLieImpact,icon:'&#x26F3;'},
{label:'HeatIdx',fn:showCourseHeatIndex,icon:'&#x1F525;'},
{label:'FWvsHY',fn:showHybridCompare,icon:'&#x1F3CC;&#xFE0F;'},
{label:'MomSwg',fn:showMomentumAnalyzer,icon:'&#x1F4CA;'},
{label:'DrillEf',fn:showDrillTracker,icon:'&#x1F3AF;'},
{label:'WindAdj',fn:showWindAdjust,icon:'&#x1F32C;&#xFE0F;'},
{label:'RndAnly',fn:showAnalyticsDash,icon:'&#x1F4CA;'},
{label:'Quiz29',fn:showQuizV29,icon:'&#x1F4DA;'}
];
for(var i=0;i<btns.length;i++){
(function(b){
var btn=document.createElement('button');
btn.innerHTML=b.icon+'<br><span style="font-size:8px">'+b.label+'</span>';
btn.style.cssText='background:rgba(255,107,107,0.12);border:1px solid rgba(255,107,107,0.25);border-radius:8px;color:#FF6B6B;padding:6px 4px;font-size:12px;cursor:pointer;min-width:44px;flex:0 0 auto;margin:2px';
btn.addEventListener('click',function(){b.fn();markExplored();});
nav.appendChild(btn);
})(btns[i]);
}
}
addNavButtons._retries=0;

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown',function(e){
if(!e.shiftKey)return;
switch(e.key){
case'Q':case'q':showEllipseFitter();markExplored();break;
case'W':case'w':showLieImpact();markExplored();break;
case'E':case'e':showCourseHeatIndex();markExplored();break;
case'R':case'r':showHybridCompare();markExplored();break;
case'T':case't':showMomentumAnalyzer();markExplored();break;
case'Y':case'y':showDrillTracker();markExplored();break;
case'U':case'u':showWindAdjust();markExplored();break;
case'I':case'i':showAnalyticsDash();markExplored();break;
case'0':showQuizV29();markExplored();break;
}
});

// ===== INIT =====
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',addNavButtons);}
else{setTimeout(addNavButtons,2000);}
setTimeout(checkAchievements,4000);
})();
