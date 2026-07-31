(function(){
'use strict';
var LS='gt_v24_';
var audioCtx=null;
function getAC(){if(!audioCtx)try{audioCtx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}return audioCtx}
function playSfx(type){var ac=getAC();if(!ac)return;var o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);var t=ac.currentTime;g.gain.setValueAtTime(0.1,t);switch(type){case'spin_open':o.type='sine';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(659,t+0.06);o.frequency.linearRampToValueAtTime(784,t+0.12);o.frequency.linearRampToValueAtTime(932,t+0.18);g.gain.exponentialRampToValueAtTime(0.01,t+0.32);o.start(t);o.stop(t+0.32);break;case'spin_calc':o.type='triangle';o.frequency.setValueAtTime(880,t);o.frequency.linearRampToValueAtTime(1175,t+0.08);g.gain.exponentialRampToValueAtTime(0.01,t+0.14);o.start(t);o.stop(t+0.14);break;case'fit_open':o.type='sine';o.frequency.setValueAtTime(392,t);o.frequency.linearRampToValueAtTime(494,t+0.07);o.frequency.linearRampToValueAtTime(622,t+0.14);g.gain.exponentialRampToValueAtTime(0.01,t+0.28);o.start(t);o.stop(t+0.28);break;case'zone_open':o.type='sine';o.frequency.setValueAtTime(466,t);o.frequency.linearRampToValueAtTime(587,t+0.06);o.frequency.linearRampToValueAtTime(740,t+0.12);o.frequency.linearRampToValueAtTime(880,t+0.18);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'recovery_open':o.type='sine';o.frequency.setValueAtTime(349,t);o.frequency.linearRampToValueAtTime(440,t+0.07);o.frequency.linearRampToValueAtTime(523,t+0.14);g.gain.exponentialRampToValueAtTime(0.01,t+0.28);o.start(t);o.stop(t+0.28);break;case'consist_open':o.type='sine';o.frequency.setValueAtTime(415,t);o.frequency.linearRampToValueAtTime(523,t+0.06);o.frequency.linearRampToValueAtTime(659,t+0.12);g.gain.exponentialRampToValueAtTime(0.01,t+0.25);o.start(t);o.stop(t+0.25);break;case'iqtrend_open':o.type='sine';o.frequency.setValueAtTime(494,t);o.frequency.linearRampToValueAtTime(622,t+0.06);o.frequency.linearRampToValueAtTime(784,t+0.12);o.frequency.linearRampToValueAtTime(988,t+0.18);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'prox_open':o.type='sine';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(554,t+0.07);o.frequency.linearRampToValueAtTime(698,t+0.14);g.gain.exponentialRampToValueAtTime(0.01,t+0.28);o.start(t);o.stop(t+0.28);break;case'perf_open':o.type='sine';o.frequency.setValueAtTime(587,t);o.frequency.linearRampToValueAtTime(740,t+0.06);o.frequency.linearRampToValueAtTime(880,t+0.12);o.frequency.linearRampToValueAtTime(1047,t+0.18);g.gain.exponentialRampToValueAtTime(0.01,t+0.32);o.start(t);o.stop(t+0.32);break;case'quiz_correct_v24':o.type='sine';o.frequency.setValueAtTime(784,t);o.frequency.setValueAtTime(988,t+0.08);o.frequency.setValueAtTime(1175,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'quiz_wrong_v24':o.type='sawtooth';o.frequency.setValueAtTime(277,t);o.frequency.linearRampToValueAtTime(208,t+0.2);g.gain.setValueAtTime(0.06,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'achieve_v24':o.type='sine';o.frequency.setValueAtTime(988,t);o.frequency.setValueAtTime(1175,t+0.1);o.frequency.setValueAtTime(1397,t+0.2);o.frequency.setValueAtTime(1760,t+0.3);g.gain.exponentialRampToValueAtTime(0.01,t+0.5);o.start(t);o.stop(t+0.5);break;case'nav_v24':o.type='sine';o.frequency.setValueAtTime(740,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.08);o.start(t);o.stop(t+0.08);break;case'save_v24':o.type='triangle';o.frequency.setValueAtTime(554,t);o.frequency.linearRampToValueAtTime(831,t+0.1);g.gain.exponentialRampToValueAtTime(0.01,t+0.2);o.start(t);o.stop(t+0.2);break;case'hover_v24':o.type='sine';o.frequency.setValueAtTime(1047,t);g.gain.setValueAtTime(0.04,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.05);o.start(t);o.stop(t+0.05);break;case'reset_v24':o.type='square';o.frequency.setValueAtTime(330,t);o.frequency.linearRampToValueAtTime(220,t+0.15);g.gain.setValueAtTime(0.05,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.25);o.start(t);o.stop(t+0.25);break;default:o.type='sine';o.frequency.setValueAtTime(440,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.15);o.start(t);o.stop(t+0.15)}}

function lsGet(k,d){try{var v=localStorage.getItem(LS+k);return v?JSON.parse(v):d}catch(e){return d}}
function lsSet(k,v){try{localStorage.setItem(LS+k,JSON.stringify(v))}catch(e){}}
function todayStr(){return new Date().toISOString().slice(0,10)}
function showToast(msg){var t=document.createElement('div');t.className='v24-toast';t.textContent=msg;document.body.appendChild(t);setTimeout(function(){t.classList.add('show')},50);setTimeout(function(){t.classList.remove('show');setTimeout(function(){t.remove()},400)},3000)}
function createOverlay(id){var ov=document.createElement('div');ov.className='v24-overlay';ov.id='v24-'+id;ov.addEventListener('click',function(e){if(e.target===ov)closePanel(id)});var pn=document.createElement('div');pn.className='v24-panel';pn.style.position='relative';ov.appendChild(pn);return pn}
function openPanel(id){var el=document.getElementById('v24-'+id);if(el)el.classList.add('active')}
function closePanel(id){var el=document.getElementById('v24-'+id);if(el)el.classList.remove('active')}
function getPanel(id){var ov=document.getElementById('v24-'+id);if(!ov){var pn=createOverlay(id);pn.id='v24-'+id+'-panel';document.body.appendChild(pn.parentElement);return pn}return ov.querySelector('.v24-panel')||ov}

// ===== 1. SPIN RATE ESTIMATOR Canvas 620x400 =====
var CLUBS_SPIN=[
{name:'Driver',backMin:2200,backMax:3200,sideRange:800,color:'#FF6B6B'},
{name:'3W',backMin:3400,backMax:4400,sideRange:600,color:'#FF9F43'},
{name:'5I',backMin:5000,backMax:6200,sideRange:500,color:'#FECA57'},
{name:'7I',backMin:6500,backMax:8000,sideRange:400,color:'#48DBFB'},
{name:'PW',backMin:8500,backMax:10500,sideRange:350,color:'#00FF88'},
{name:'SW',backMin:9500,backMax:12000,sideRange:300,color:'#A855F7'}
];
function showSpinRate(){
playSfx('spin_open');
var pn=getPanel('spin');
var log=lsGet('spin_log',[]);
var selClub=lsGet('spin_club',0);
var html='<button class="v24-close" onclick="window._v24Close(\'spin\')">&times;</button>';
html+='<div class="v24-title">&#x1F300; &#xC2A4;&#xD540;&#xC728; &#xCD94;&#xC815;&#xAE30;</div>';
html+='<canvas id="v24-spin-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v24-card"><h3>&#xD074;&#xB7FD; &#xC120;&#xD0DD; &amp; &#xC785;&#xB825;</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:4px;margin-bottom:8px">';
for(var i=0;i<CLUBS_SPIN.length;i++){
html+='<button class="v24-btn v24-btn-sm'+(i===selClub?' v24-btn-primary':'')+'" onclick="window._v24SelectSpinClub('+i+')" style="border-color:'+CLUBS_SPIN[i].color+'40;color:'+CLUBS_SPIN[i].color+'">'+CLUBS_SPIN[i].name+'</button>';
}
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px">';
html+='<div><label class="v24-label">&#xBC31;&#xC2A4;&#xD540; (rpm)</label><input class="v24-input" type="number" id="v24-backspin" value="'+Math.round((CLUBS_SPIN[selClub].backMin+CLUBS_SPIN[selClub].backMax)/2)+'" min="1000" max="15000"></div>';
html+='<div><label class="v24-label">&#xC0AC;&#xC774;&#xB4DC;&#xC2A4;&#xD540; (rpm)</label><input class="v24-input" type="number" id="v24-sidespin" value="0" min="-2000" max="2000"></div>';
html+='<div><label class="v24-label">&#xBC1C;&#xC0AC;&#xAC01; (&deg;)</label><input class="v24-input" type="number" id="v24-launch" value="12" min="0" max="45" step="0.5"></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
html+='<button class="v24-btn v24-btn-primary" onclick="window._v24CalcSpin()">&#x1F4CA; &#xBD84;&#xC11D;</button>';
html+='<button class="v24-btn" onclick="window._v24SaveSpin()">&#x1F4BE; &#xC800;&#xC7A5;</button>';
html+='</div></div>';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
var c=CLUBS_SPIN[selClub];
html+='<div class="v24-stat-card"><div class="v24-stat-val" style="color:'+c.color+'">'+c.backMin+'~'+c.backMax+'</div><div class="v24-stat-label">&#xC774;&#xC0C1; &#xBC31;&#xC2A4;&#xD540; &#xBC94;&#xC704;</div></div>';
html+='<div class="v24-stat-card"><div class="v24-stat-val" style="color:#FFB800">&pm;'+c.sideRange+'</div><div class="v24-stat-label">&#xC0AC;&#xC774;&#xB4DC; &#xD5C8;&#xC6A9;&#xCE58;</div></div>';
var avgBack=0,avgSide=0,cnt=0;
for(var j=0;j<log.length;j++){if(log[j].club===selClub){avgBack+=log[j].back;avgSide+=Math.abs(log[j].side);cnt++;}}
if(cnt>0){avgBack=Math.round(avgBack/cnt);avgSide=Math.round(avgSide/cnt);}
html+='<div class="v24-stat-card"><div class="v24-stat-val" style="color:#4ECDC4">'+avgBack+'</div><div class="v24-stat-label">&#xD3C9;&#xADE0; &#xBC31;&#xC2A4;&#xD540;</div></div>';
html+='<div class="v24-stat-card"><div class="v24-stat-val" style="color:#A855F7">'+log.length+'</div><div class="v24-stat-label">&#xCD1D; &#xAE30;&#xB85D;</div></div>';
html+='</div>';
if(log.length>0)html+='<button class="v24-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'&#xCD08;&#xAE30;&#xD654;?\'))window._v24ResetSpin()">&#xCD08;&#xAE30;&#xD654;</button>';
pn.innerHTML=html;openPanel('spin');drawSpinCanvas(log,selClub);
}
window._v24SelectSpinClub=function(i){lsSet('spin_club',i);showSpinRate();};
window._v24CalcSpin=function(){playSfx('spin_calc');var c=lsGet('spin_club',0);var cl=CLUBS_SPIN[c];var b=parseInt(document.getElementById('v24-backspin').value)||0;var s=parseInt(document.getElementById('v24-sidespin').value)||0;var grade='D';if(b>=cl.backMin&&b<=cl.backMax&&Math.abs(s)<=cl.sideRange*0.5)grade='S';else if(b>=cl.backMin&&b<=cl.backMax&&Math.abs(s)<=cl.sideRange)grade='A';else if(Math.abs(b-(cl.backMin+cl.backMax)/2)<2000)grade='B';else grade='C';showToast(cl.name+' Spin Grade: '+grade);};
window._v24SaveSpin=function(){playSfx('save_v24');var c=lsGet('spin_club',0);var b=parseInt(document.getElementById('v24-backspin').value)||0;var s=parseInt(document.getElementById('v24-sidespin').value)||0;var l=parseFloat(document.getElementById('v24-launch').value)||12;var log=lsGet('spin_log',[]);log.push({date:todayStr(),club:c,back:b,side:s,launch:l});if(log.length>100)log.shift();lsSet('spin_log',log);showToast('&#xC2A4;&#xD540; &#xB370;&#xC774;&#xD130; &#xC800;&#xC7A5;!');checkAchievements();showSpinRate();};
window._v24ResetSpin=function(){lsSet('spin_log',[]);showSpinRate();};
function drawSpinCanvas(log,selClub){
var c=document.getElementById('v24-spin-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,W,H);
ctx.fillStyle='rgba(255,107,107,0.03)';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 16px sans-serif';ctx.textAlign='center';
ctx.fillText('Spin Rate Analysis - '+CLUBS_SPIN[selClub].name,W/2,28);
var L=50,R=W-30,T=55,B=H-50;
ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.lineWidth=1;
for(var i=0;i<=5;i++){var y=T+(B-T)*i/5;ctx.beginPath();ctx.moveTo(L,y);ctx.lineTo(R,y);ctx.stroke();}
ctx.font='10px sans-serif';ctx.textAlign='right';ctx.fillStyle='rgba(255,255,255,0.5)';
var cl=CLUBS_SPIN[selClub];var maxBack=Math.max(cl.backMax*1.3,5000);
for(var i=0;i<=5;i++){var y=T+(B-T)*i/5;var val=Math.round(maxBack*(1-i/5));ctx.fillText(val+'rpm',L-4,y+4);}
ctx.fillStyle='rgba(0,255,136,0.08)';
var yMin=B-(cl.backMin/maxBack)*(B-T);var yMax=B-(cl.backMax/maxBack)*(B-T);
ctx.fillRect(L,yMax,R-L,yMin-yMax);
ctx.strokeStyle='rgba(0,255,136,0.3)';ctx.setLineDash([4,4]);
ctx.beginPath();ctx.moveTo(L,yMin);ctx.lineTo(R,yMin);ctx.stroke();
ctx.beginPath();ctx.moveTo(L,yMax);ctx.lineTo(R,yMax);ctx.stroke();
ctx.setLineDash([]);
var clubData=[];for(var i=0;i<log.length;i++){if(log[i].club===selClub)clubData.push(log[i]);}
if(clubData.length<2){ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='13px sans-serif';ctx.textAlign='center';ctx.fillText('2+ records needed for '+CLUBS_SPIN[selClub].name,W/2,H/2);
ctx.font='11px sans-serif';ctx.fillText('Ideal backspin: '+cl.backMin+'~'+cl.backMax+' rpm',W/2,H/2+20);
var barW=(R-L-40)/CLUBS_SPIN.length;for(var i=0;i<CLUBS_SPIN.length;i++){var x=L+20+i*barW;var cc=CLUBS_SPIN[i];var midBack=(cc.backMin+cc.backMax)/2;var bh=(midBack/maxBack)*(B-T);ctx.fillStyle=cc.color+'60';ctx.fillRect(x+2,B-bh,barW-4,bh);ctx.fillStyle=cc.color;ctx.font='9px sans-serif';ctx.textAlign='center';ctx.fillText(cc.name,x+barW/2,B+14);ctx.fillText(Math.round(midBack)+'',x+barW/2,B-bh-4);}
return;}
var last20=clubData.slice(-20);
var segW=(R-L)/(last20.length-1||1);
ctx.strokeStyle=CLUBS_SPIN[selClub].color;ctx.lineWidth=2;ctx.beginPath();
for(var i=0;i<last20.length;i++){var x=L+i*segW;var y=B-(last20[i].back/maxBack)*(B-T);if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}
ctx.stroke();
for(var i=0;i<last20.length;i++){var x=L+i*segW;var y=B-(last20[i].back/maxBack)*(B-T);ctx.fillStyle=CLUBS_SPIN[selClub].color;ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.fill();
var sideAbs=Math.abs(last20[i].side);var sColor=sideAbs<=cl.sideRange*0.5?'#00FF88':sideAbs<=cl.sideRange?'#FFB800':'#FF3366';
ctx.fillStyle=sColor+'80';ctx.beginPath();ctx.arc(x,y,sideAbs/cl.sideRange*8+2,0,Math.PI*2);ctx.fill();
}
ctx.font='10px sans-serif';ctx.textAlign='center';ctx.fillStyle='rgba(255,255,255,0.4)';
for(var i=0;i<last20.length;i+=Math.max(1,Math.floor(last20.length/8))){ctx.fillText(last20[i].date.slice(5),L+i*segW,B+14);}
ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='10px sans-serif';ctx.textAlign='left';
ctx.fillText('&#x25CF; backspin trend    &#x25CB; sidespin magnitude (circle size)',L,H-8);
ctx.fillStyle='#00FF88';ctx.fillText('&#x25A0; Ideal zone',R-120,H-8);
}

// ===== 2. CLUB FITTING PROFILE Canvas 600x380 =====
var FIT_AXES=['Shaft Flex','Lie Angle','Loft','Length','Grip Size','Swing Weight','Material','Bounce'];
var FIT_DEFAULTS=[5,5,5,5,5,5,5,5];
function showClubFitting(){
playSfx('fit_open');
var pn=getPanel('fitting');
var profile=lsGet('fit_profile',FIT_DEFAULTS.slice());
var log=lsGet('fit_log',[]);
var html='<button class="v24-close" onclick="window._v24Close(\'fitting\')">&times;</button>';
html+='<div class="v24-title">&#x1F3CC; &#xD074;&#xB7FD; &#xD53C;&#xD305; &#xD504;&#xB85C;&#xD30C;&#xC77C;</div>';
html+='<canvas id="v24-fit-canvas" width="600" height="380" style="width:100%;max-width:600px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v24-card"><h3>&#xD53C;&#xD305; &#xD30C;&#xB77C;&#xBBF8;&#xD130; (1~10)</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">';
for(var i=0;i<FIT_AXES.length;i++){
html+='<div><label class="v24-label">'+FIT_AXES[i]+'</label><input class="v24-input" type="range" min="1" max="10" value="'+profile[i]+'" id="v24-fit-'+i+'" oninput="window._v24UpdateFit('+i+',this.value)"><span id="v24-fitv-'+i+'" style="font-size:11px;color:#00FF88;margin-left:4px">'+profile[i]+'</span></div>';
}
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
html+='<button class="v24-btn v24-btn-primary" onclick="window._v24SaveFit()">&#x1F4BE; &#xC800;&#xC7A5;</button>';
html+='<button class="v24-btn" onclick="window._v24AnalyzeFit()">&#x1F50D; &#xBD84;&#xC11D;</button>';
html+='</div></div>';
var grade=calcFitGrade(profile);
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v24-stat-card"><div class="v24-stat-val" style="color:'+(grade==='S'?'#00FF88':grade==='A'?'#4ECDC4':grade==='B'?'#FFB800':'#FF6B6B')+'">'+grade+'</div><div class="v24-stat-label">&#xD53C;&#xD305; &#xB4F1;&#xAE09;</div></div>';
var avg=0;for(var i=0;i<profile.length;i++)avg+=profile[i];avg=Math.round(avg*10/profile.length)/10;
html+='<div class="v24-stat-card"><div class="v24-stat-val" style="color:#4ECDC4">'+avg+'</div><div class="v24-stat-label">&#xD3C9;&#xADE0; &#xC810;&#xC218;</div></div>';
var minIdx=0;for(var i=1;i<profile.length;i++)if(profile[i]<profile[minIdx])minIdx=i;
html+='<div class="v24-stat-card"><div class="v24-stat-val" style="color:#FF6B6B;font-size:12px">'+FIT_AXES[minIdx]+'</div><div class="v24-stat-label">&#xAC1C;&#xC120; &#xD544;&#xC694;</div></div>';
html+='<div class="v24-stat-card"><div class="v24-stat-val" style="color:#A855F7">'+log.length+'</div><div class="v24-stat-label">&#xD53C;&#xD305; &#xAE30;&#xB85D;</div></div>';
html+='</div>';
if(log.length>0)html+='<button class="v24-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'&#xCD08;&#xAE30;&#xD654;?\'))window._v24ResetFit()">&#xCD08;&#xAE30;&#xD654;</button>';
pn.innerHTML=html;openPanel('fitting');drawFitCanvas(profile,log);
}
function calcFitGrade(p){var a=0;for(var i=0;i<p.length;i++)a+=p[i];a/=p.length;var mn=10;for(var i=0;i<p.length;i++)if(p[i]<mn)mn=p[i];if(a>=8&&mn>=6)return'S';if(a>=6.5&&mn>=4)return'A';if(a>=5)return'B';return'C';}
window._v24UpdateFit=function(i,v){var p=lsGet('fit_profile',FIT_DEFAULTS.slice());p[i]=parseInt(v);lsSet('fit_profile',p);var el=document.getElementById('v24-fitv-'+i);if(el)el.textContent=v;drawFitCanvas(p,lsGet('fit_log',[]));};
window._v24SaveFit=function(){playSfx('save_v24');var p=lsGet('fit_profile',FIT_DEFAULTS.slice());var log=lsGet('fit_log',[]);log.push({date:todayStr(),profile:p.slice()});if(log.length>30)log.shift();lsSet('fit_log',log);showToast('&#xD53C;&#xD305; &#xD504;&#xB85C;&#xD30C;&#xC77C; &#xC800;&#xC7A5;!');checkAchievements();showClubFitting();};
window._v24AnalyzeFit=function(){playSfx('spin_calc');var p=lsGet('fit_profile',FIT_DEFAULTS.slice());var tips=[];if(p[0]<5)tips.push('Shaft flex &#xB108;&#xBB34; &#xBF51;&#xBF51;&#xD568; - Regular&#xB85C; &#xAD50;&#xCCB4; &#xACE0;&#xB824;');if(p[1]<5)tips.push('Lie angle &#xC870;&#xC815; &#xD544;&#xC694; - &#xC0F7;&#xC774; &#xBC29;&#xD5A5; &#xD2C0;&#xC5B4;&#xC9D0;');if(p[4]<5)tips.push('Grip size &#xC870;&#xC815; - &#xC190; &#xD06C;&#xAE30;&#xC5D0; &#xB9DE;&#xB294; &#xADF8;&#xB9BD;&#xC73C;&#xB85C;');if(tips.length===0)tips.push('&#xC804;&#xCCB4;&#xC801;&#xC73C;&#xB85C; &#xC591;&#xD638;&#xD55C; &#xD53C;&#xD305;&#xC785;&#xB2C8;&#xB2E4;!');showToast(tips[0]);};
window._v24ResetFit=function(){lsSet('fit_log',[]);lsSet('fit_profile',FIT_DEFAULTS.slice());showClubFitting();};
function drawFitCanvas(profile,log){
var c=document.getElementById('v24-fit-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=600,H=380;ctx.clearRect(0,0,W,H);
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,W,H);
ctx.fillStyle='rgba(78,205,196,0.03)';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 16px sans-serif';ctx.textAlign='center';
ctx.fillText('Club Fitting Radar Profile',W/2,28);
var cx=W/2,cy=H/2+10,R=Math.min(W,H)/2-55;var n=FIT_AXES.length;
for(var ring=1;ring<=5;ring++){ctx.strokeStyle='rgba(255,255,255,'+(ring===5?0.15:0.06)+')';ctx.beginPath();for(var i=0;i<=n;i++){var a=-Math.PI/2+(i%n)*2*Math.PI/n;var r=R*ring/5;var x=cx+r*Math.cos(a);var y=cy+r*Math.sin(a);if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}ctx.closePath();ctx.stroke();}
for(var i=0;i<n;i++){var a=-Math.PI/2+i*2*Math.PI/n;ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+R*Math.cos(a),cy+R*Math.sin(a));ctx.stroke();
ctx.fillStyle='rgba(255,255,255,0.7)';ctx.font='10px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
var lx=cx+(R+20)*Math.cos(a);var ly=cy+(R+20)*Math.sin(a);
ctx.fillText(FIT_AXES[i],lx,ly);
}
if(log.length>0){var prev=log[log.length-1].profile;ctx.fillStyle='rgba(168,85,247,0.1)';ctx.strokeStyle='rgba(168,85,247,0.4)';ctx.lineWidth=1;ctx.beginPath();for(var i=0;i<=n;i++){var a=-Math.PI/2+(i%n)*2*Math.PI/n;var r=R*(prev[i%n]||5)/10;if(i===0)ctx.moveTo(cx+r*Math.cos(a),cy+r*Math.sin(a));else ctx.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a));}ctx.closePath();ctx.fill();ctx.stroke();}
ctx.fillStyle='rgba(0,255,136,0.15)';ctx.strokeStyle='#00FF88';ctx.lineWidth=2;ctx.beginPath();
for(var i=0;i<=n;i++){var a=-Math.PI/2+(i%n)*2*Math.PI/n;var r=R*profile[i%n]/10;if(i===0)ctx.moveTo(cx+r*Math.cos(a),cy+r*Math.sin(a));else ctx.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a));}
ctx.closePath();ctx.fill();ctx.stroke();
for(var i=0;i<n;i++){var a=-Math.PI/2+i*2*Math.PI/n;var r=R*profile[i]/10;ctx.fillStyle='#00FF88';ctx.beginPath();ctx.arc(cx+r*Math.cos(a),cy+r*Math.sin(a),4,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#fff';ctx.font='bold 10px sans-serif';ctx.fillText(profile[i]+'',cx+r*Math.cos(a),cy+r*Math.sin(a)-10);
}
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='10px sans-serif';ctx.textAlign='left';
ctx.fillText('&#x25CF; Current    &#x25CB; Previous',10,H-8);
var grade=calcFitGrade(profile);ctx.textAlign='right';ctx.fillStyle=grade==='S'?'#00FF88':grade==='A'?'#4ECDC4':grade==='B'?'#FFB800':'#FF6B6B';
ctx.font='bold 18px sans-serif';ctx.fillText('Grade '+grade,W-10,H-8);
}

// ===== 3. SCORING ZONE ANALYZER Canvas 620x400 =====
var ZONES=['0-50yd','50-100yd','100-150yd','150-200yd','200-250yd','250+yd'];
var ZONE_COLORS=['#00FF88','#4ECDC4','#48DBFB','#FECA57','#FF9F43','#FF6B6B'];
function showScoringZone(){
playSfx('zone_open');
var pn=getPanel('zone');
var data=lsGet('zone_data',{});
var html='<button class="v24-close" onclick="window._v24Close(\'zone\')">&times;</button>';
html+='<div class="v24-title">&#x1F3AF; &#xC2A4;&#xCF54;&#xC5B4;&#xB9C1; &#xC874; &#xBD84;&#xC11D;&#xAE30;</div>';
html+='<canvas id="v24-zone-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v24-card"><h3>&#xAC70;&#xB9AC; &#xC874;&#xBCC4; &#xC0F7; &#xAE30;&#xB85D;</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px">';
for(var i=0;i<ZONES.length;i++){
var zd=data[i]||{shots:0,good:0};
html+='<div class="v24-card" style="border-color:'+ZONE_COLORS[i]+'30">';
html+='<div style="font-size:11px;color:'+ZONE_COLORS[i]+';font-weight:bold;margin-bottom:4px">'+ZONES[i]+'</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px">';
html+='<div><label class="v24-label">&#xCD1D;&#xC0F7;</label><input class="v24-input" type="number" id="v24-zs-'+i+'" value="'+zd.shots+'" min="0"></div>';
html+='<div><label class="v24-label">Good</label><input class="v24-input" type="number" id="v24-zg-'+i+'" value="'+zd.good+'" min="0"></div>';
html+='</div></div>';
}
html+='</div>';
html+='<button class="v24-btn v24-btn-primary" style="width:100%;margin-top:8px" onclick="window._v24SaveZone()">&#x1F4BE; &#xC800;&#xC7A5;</button>';
html+='</div>';
var totalShots=0,totalGood=0;for(var i=0;i<ZONES.length;i++){var zd=data[i]||{shots:0,good:0};totalShots+=zd.shots;totalGood+=zd.good;}
var pct=totalShots>0?Math.round(totalGood*100/totalShots):0;
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v24-stat-card"><div class="v24-stat-val" style="color:#00FF88">'+totalShots+'</div><div class="v24-stat-label">&#xCD1D; &#xC0F7;</div></div>';
html+='<div class="v24-stat-card"><div class="v24-stat-val" style="color:#4ECDC4">'+totalGood+'</div><div class="v24-stat-label">Good &#xC0F7;</div></div>';
html+='<div class="v24-stat-card"><div class="v24-stat-val" style="color:#FFB800">'+pct+'%</div><div class="v24-stat-label">&#xC131;&#xACF5;&#xB960;</div></div>';
var bestZone='-';var bestPct=0;for(var i=0;i<ZONES.length;i++){var zd=data[i]||{shots:0,good:0};if(zd.shots>=5){var p=zd.good*100/zd.shots;if(p>bestPct){bestPct=p;bestZone=ZONES[i];}}}
html+='<div class="v24-stat-card"><div class="v24-stat-val" style="color:#A855F7;font-size:12px">'+bestZone+'</div><div class="v24-stat-label">Best Zone</div></div>';
html+='</div>';
if(totalShots>0)html+='<button class="v24-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'&#xCD08;&#xAE30;&#xD654;?\'))window._v24ResetZone()">&#xCD08;&#xAE30;&#xD654;</button>';
pn.innerHTML=html;openPanel('zone');drawZoneCanvas(data);
}
window._v24SaveZone=function(){playSfx('save_v24');var data={};for(var i=0;i<ZONES.length;i++){data[i]={shots:parseInt(document.getElementById('v24-zs-'+i).value)||0,good:parseInt(document.getElementById('v24-zg-'+i).value)||0};}lsSet('zone_data',data);showToast('&#xC874;&#xBCC4; &#xB370;&#xC774;&#xD130; &#xC800;&#xC7A5;!');checkAchievements();showScoringZone();};
window._v24ResetZone=function(){lsSet('zone_data',{});showScoringZone();};
function drawZoneCanvas(data){
var c=document.getElementById('v24-zone-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,W,H);
ctx.fillStyle='rgba(78,205,196,0.03)';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 16px sans-serif';ctx.textAlign='center';
ctx.fillText('Scoring Zone Performance',W/2,28);
var L=80,R=W-30,T=55,B=H-50;var barW=(R-L)/ZONES.length;
ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.lineWidth=1;
for(var i=0;i<=4;i++){var y=T+(B-T)*i/4;ctx.beginPath();ctx.moveTo(L,y);ctx.lineTo(R,y);ctx.stroke();ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='10px sans-serif';ctx.textAlign='right';ctx.fillText((100-i*25)+'%',L-6,y+4);}
ctx.strokeStyle='rgba(255,184,0,0.4)';ctx.setLineDash([6,4]);ctx.beginPath();var y50=T+(B-T)*0.5;ctx.moveTo(L,y50);ctx.lineTo(R,y50);ctx.stroke();ctx.setLineDash([]);
ctx.fillStyle='rgba(255,184,0,0.5)';ctx.font='9px sans-serif';ctx.textAlign='left';ctx.fillText('50% target',L+4,y50-4);
for(var i=0;i<ZONES.length;i++){
var zd=data[i]||{shots:0,good:0};
var pct=zd.shots>0?zd.good/zd.shots:0;
var bh=pct*(B-T);
var x=L+i*barW;
var grad=ctx.createLinearGradient(0,B-bh,0,B);
grad.addColorStop(0,ZONE_COLORS[i]);grad.addColorStop(1,ZONE_COLORS[i]+'40');
ctx.fillStyle=grad;
ctx.beginPath();ctx.moveTo(x+8,B);ctx.lineTo(x+8,B-bh+4);ctx.quadraticCurveTo(x+8,B-bh,x+12,B-bh);ctx.lineTo(x+barW-12,B-bh);ctx.quadraticCurveTo(x+barW-8,B-bh,x+barW-8,B-bh+4);ctx.lineTo(x+barW-8,B);ctx.closePath();ctx.fill();
ctx.fillStyle=ZONE_COLORS[i];ctx.font='bold 12px sans-serif';ctx.textAlign='center';
ctx.fillText(Math.round(pct*100)+'%',x+barW/2,B-bh-8);
ctx.fillStyle='rgba(255,255,255,0.7)';ctx.font='9px sans-serif';
ctx.fillText(ZONES[i],x+barW/2,B+14);
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='9px sans-serif';
ctx.fillText(zd.shots+'shots',x+barW/2,B+26);
}
}

// ===== 4. ROUND RECOVERY ANALYZER Canvas 600x380 =====
function showRecovery(){
playSfx('recovery_open');
var pn=getPanel('recovery');
var log=lsGet('recovery_log',[]);
var html='<button class="v24-close" onclick="window._v24Close(\'recovery\')">&times;</button>';
html+='<div class="v24-title">&#x1F504; &#xB77C;&#xC6B4;&#xB4DC; &#xBCF5;&#xAD6C;&#xB825; &#xBD84;&#xC11D;&#xAE30;</div>';
html+='<canvas id="v24-recovery-canvas" width="600" height="380" style="width:100%;max-width:600px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v24-card"><h3>18&#xD640; &#xC2A4;&#xCF54;&#xC5B4; &#xC785;&#xB825;</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(9,1fr);gap:3px">';
for(var i=1;i<=18;i++){
var val=lsGet('rcv_h'+i,0);
html+='<div><label class="v24-label" style="text-align:center">H'+i+'</label><input class="v24-input" type="number" id="v24-rcvh-'+i+'" value="'+val+'" min="-4" max="8" style="text-align:center;padding:4px 2px;font-size:11px"></div>';
}
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
html+='<button class="v24-btn v24-btn-primary" onclick="window._v24SaveRecovery()">&#x1F4BE; &#xC800;&#xC7A5;</button>';
html+='<button class="v24-btn" onclick="window._v24AnalyzeRecovery()">&#x1F4CA; &#xBD84;&#xC11D;</button>';
html+='</div></div>';
var bouncebacks=0,bounceTries=0;
for(var j=0;j<log.length;j++){var r=log[j].holes;for(var h=1;h<18;h++){if(r[h-1]>0){bounceTries++;if(r[h]<=0)bouncebacks++;}}}
var recRate=bounceTries>0?Math.round(bouncebacks*100/bounceTries):0;
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v24-stat-card"><div class="v24-stat-val" style="color:#00FF88">'+recRate+'%</div><div class="v24-stat-label">&#xBCF5;&#xAD6C;&#xC728;</div></div>';
html+='<div class="v24-stat-card"><div class="v24-stat-val" style="color:#4ECDC4">'+bouncebacks+'</div><div class="v24-stat-label">&#xBC14;&#xC6B4;&#xC2A4;&#xBC31;</div></div>';
html+='<div class="v24-stat-card"><div class="v24-stat-val" style="color:#FFB800">'+bounceTries+'</div><div class="v24-stat-label">&#xAE30;&#xD68C;</div></div>';
html+='<div class="v24-stat-card"><div class="v24-stat-val" style="color:#A855F7">'+log.length+'</div><div class="v24-stat-label">&#xB77C;&#xC6B4;&#xB4DC;</div></div>';
html+='</div>';
if(log.length>0)html+='<button class="v24-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'&#xCD08;&#xAE30;&#xD654;?\'))window._v24ResetRecovery()">&#xCD08;&#xAE30;&#xD654;</button>';
pn.innerHTML=html;openPanel('recovery');drawRecoveryCanvas(log);
}
window._v24SaveRecovery=function(){playSfx('save_v24');var holes=[];for(var i=1;i<=18;i++){holes.push(parseInt(document.getElementById('v24-rcvh-'+i).value)||0);lsSet('rcv_h'+i,holes[i-1]);}var log=lsGet('recovery_log',[]);log.push({date:todayStr(),holes:holes});if(log.length>30)log.shift();lsSet('recovery_log',log);showToast('&#xBCF5;&#xAD6C;&#xB825; &#xB370;&#xC774;&#xD130; &#xC800;&#xC7A5;!');checkAchievements();showRecovery();};
window._v24AnalyzeRecovery=function(){playSfx('spin_calc');var log=lsGet('recovery_log',[]);if(log.length===0){showToast('&#xB370;&#xC774;&#xD130;&#xAC00; &#xD544;&#xC694;&#xD569;&#xB2C8;&#xB2E4;');return;}var last=log[log.length-1].holes;var worst=0,worstH=1;for(var i=0;i<18;i++)if(last[i]>worst){worst=last[i];worstH=i+1;}showToast('H'+worstH+' worst (+'+worst+') - &#xC9D1;&#xC911; &#xC5F0;&#xC2B5; &#xD544;&#xC694;');};
window._v24ResetRecovery=function(){lsSet('recovery_log',[]);for(var i=1;i<=18;i++)lsSet('rcv_h'+i,0);showRecovery();};
function drawRecoveryCanvas(log){
var c=document.getElementById('v24-recovery-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=600,H=380;ctx.clearRect(0,0,W,H);
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,W,H);
ctx.fillStyle='rgba(0,255,136,0.03)';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 16px sans-serif';ctx.textAlign='center';
ctx.fillText('Round Recovery Rate (Bounce-Back)',W/2,28);
if(log.length<1){ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='13px sans-serif';ctx.fillText('Enter 18-hole scores (vs par) to analyze recovery',W/2,H/2);return;}
var L=50,R=W-30,T=55,B=H-50;
var last=log[log.length-1].holes;
var barW=(R-L)/18;
ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.lineWidth=1;
var maxVal=4;for(var i=0;i<18;i++)if(Math.abs(last[i])>maxVal)maxVal=Math.abs(last[i]);
maxVal=Math.ceil(maxVal);
var zeroY=T+(B-T)/2;
for(var i=-maxVal;i<=maxVal;i++){var y=zeroY-i*(B-T)/(2*maxVal);ctx.strokeStyle=i===0?'rgba(255,255,255,0.3)':'rgba(255,255,255,0.06)';ctx.lineWidth=i===0?1.5:1;ctx.beginPath();ctx.moveTo(L,y);ctx.lineTo(R,y);ctx.stroke();if(i!==0){ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='9px sans-serif';ctx.textAlign='right';ctx.fillText((i>0?'+':'')+i,L-4,y+3);}}
for(var i=0;i<18;i++){
var x=L+i*barW;var val=last[i];
var bh=Math.abs(val)*(B-T)/(2*maxVal);
var isOver=val>0;
var color;
if(val<=-2)color='#00FF88';else if(val===-1)color='#4ECDC4';else if(val===0)color='#FFB800';else if(val===1)color='#FF9F43';else color='#FF6B6B';
var y0=zeroY;var y1=isOver?zeroY-bh:zeroY+bh;
var grad=ctx.createLinearGradient(0,Math.min(y0,y1),0,Math.max(y0,y1));
if(isOver){grad.addColorStop(0,color);grad.addColorStop(1,color+'40');}
else{grad.addColorStop(0,color+'40');grad.addColorStop(1,color);}
ctx.fillStyle=grad;
ctx.fillRect(x+3,Math.min(y0,y1),barW-6,bh);
var isBounce=i>0&&last[i-1]>0&&last[i]<=0;
if(isBounce){ctx.fillStyle='rgba(0,255,136,0.2)';ctx.fillRect(x,T,barW,B-T);}
ctx.fillStyle=color;ctx.font='bold 10px sans-serif';ctx.textAlign='center';
if(val!==0)ctx.fillText((val>0?'+':'')+val,x+barW/2,isOver?y1-6:y1+12);
ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='9px sans-serif';
ctx.fillText('H'+(i+1),x+barW/2,B+14);
}
ctx.fillStyle='rgba(0,255,136,0.5)';ctx.font='10px sans-serif';ctx.textAlign='left';
ctx.fillText('&#x25A0; Bounce-back holes highlighted',L,H-8);
}

// ===== 5. SHOT CONSISTENCY MATRIX Canvas 620x400 =====
var CONS_CLUBS=['DR','3W','3I','4I','5I','6I','7I','8I','9I','PW','GW','SW','PT'];
var CONS_METRICS=['&#xC815;&#xD655;&#xB3C4;','&#xAC70;&#xB9AC;','&#xBC29;&#xD5A5;','&#xD0C4;&#xB3C4;','&#xC77C;&#xAD00;&#xC131;'];
function showConsistency(){
playSfx('consist_open');
var pn=getPanel('consist');
var data=lsGet('consist_data',{});
var html='<button class="v24-close" onclick="window._v24Close(\'consist\')">&times;</button>';
html+='<div class="v24-title">&#x1F4CA; &#xC0F7; &#xC77C;&#xAD00;&#xC131; &#xB9E4;&#xD2B8;&#xB9AD;&#xC2A4;</div>';
html+='<canvas id="v24-consist-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v24-card"><h3>&#xD074;&#xB7FD;&#xBCC4; &#xC77C;&#xAD00;&#xC131; &#xD3C9;&#xAC00; (1~10)</h3>';
html+='<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:10px">';
html+='<tr><th style="padding:3px;color:rgba(255,255,255,0.5)">Club</th>';
for(var m=0;m<CONS_METRICS.length;m++)html+='<th style="padding:3px;color:rgba(255,255,255,0.5)">'+CONS_METRICS[m]+'</th>';
html+='</tr>';
for(var i=0;i<CONS_CLUBS.length;i++){
html+='<tr><td style="padding:3px;color:#00FF88;font-weight:bold">'+CONS_CLUBS[i]+'</td>';
for(var m=0;m<CONS_METRICS.length;m++){
var key=i+'_'+m;var val=data[key]||5;
html+='<td style="padding:2px"><input class="v24-input" type="number" min="1" max="10" value="'+val+'" id="v24-cm-'+key+'" style="width:40px;text-align:center;padding:2px;font-size:10px"></td>';
}
html+='</tr>';
}
html+='</table></div>';
html+='<button class="v24-btn v24-btn-primary" style="width:100%;margin-top:8px" onclick="window._v24SaveConsist()">&#x1F4BE; &#xC800;&#xC7A5;</button>';
html+='</div>';
var totalScore=0,cnt=0;for(var k in data){totalScore+=data[k];cnt++;}
var avg=cnt>0?Math.round(totalScore*10/cnt)/10:0;
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v24-stat-card"><div class="v24-stat-val" style="color:#00FF88">'+avg+'</div><div class="v24-stat-label">&#xD3C9;&#xADE0; &#xC77C;&#xAD00;&#xC131;</div></div>';
var bestClub='-',bestVal=0;for(var i=0;i<CONS_CLUBS.length;i++){var sum=0;for(var m=0;m<CONS_METRICS.length;m++){sum+=(data[i+'_'+m]||5);}var a=sum/CONS_METRICS.length;if(a>bestVal){bestVal=a;bestClub=CONS_CLUBS[i];}}
html+='<div class="v24-stat-card"><div class="v24-stat-val" style="color:#4ECDC4">'+bestClub+'</div><div class="v24-stat-label">Best Club</div></div>';
var worstClub='-',worstVal=11;for(var i=0;i<CONS_CLUBS.length;i++){var sum=0;for(var m=0;m<CONS_METRICS.length;m++){sum+=(data[i+'_'+m]||5);}var a=sum/CONS_METRICS.length;if(a<worstVal){worstVal=a;worstClub=CONS_CLUBS[i];}}
html+='<div class="v24-stat-card"><div class="v24-stat-val" style="color:#FF6B6B">'+worstClub+'</div><div class="v24-stat-label">Weakest</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('consist');drawConsistCanvas(data);
}
window._v24SaveConsist=function(){playSfx('save_v24');var data={};for(var i=0;i<CONS_CLUBS.length;i++){for(var m=0;m<CONS_METRICS.length;m++){var key=i+'_'+m;data[key]=parseInt(document.getElementById('v24-cm-'+key).value)||5;}}lsSet('consist_data',data);showToast('&#xC77C;&#xAD00;&#xC131; &#xB370;&#xC774;&#xD130; &#xC800;&#xC7A5;!');checkAchievements();showConsistency();};
function drawConsistCanvas(data){
var c=document.getElementById('v24-consist-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,W,H);
ctx.fillStyle='rgba(72,219,251,0.03)';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 16px sans-serif';ctx.textAlign='center';
ctx.fillText('Shot Consistency Matrix (13 Clubs x 5 Metrics)',W/2,28);
var L=60,R=W-20,T=60,B=H-40;
var cellW=(R-L)/CONS_METRICS.length;var cellH=(B-T)/CONS_CLUBS.length;
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='9px sans-serif';ctx.textAlign='center';
for(var m=0;m<CONS_METRICS.length;m++){ctx.fillText(CONS_METRICS[m],L+m*cellW+cellW/2,T-6);}
ctx.textAlign='right';
for(var i=0;i<CONS_CLUBS.length;i++){ctx.fillStyle='rgba(255,255,255,0.7)';ctx.fillText(CONS_CLUBS[i],L-6,T+i*cellH+cellH/2+4);}
for(var i=0;i<CONS_CLUBS.length;i++){
for(var m=0;m<CONS_METRICS.length;m++){
var val=data[i+'_'+m]||5;
var x=L+m*cellW;var y=T+i*cellH;
var hue;
if(val>=8)hue='rgba(0,255,136,'+(0.3+val*0.07)+')';
else if(val>=6)hue='rgba(78,205,196,'+(0.3+val*0.05)+')';
else if(val>=4)hue='rgba(255,184,0,'+(0.3+val*0.04)+')';
else hue='rgba(255,107,107,'+(0.3+val*0.05)+')';
ctx.fillStyle=hue;
ctx.fillRect(x+2,y+2,cellW-4,cellH-4);
ctx.fillStyle='#fff';ctx.font='bold 11px sans-serif';ctx.textAlign='center';
ctx.fillText(val+'',x+cellW/2,y+cellH/2+4);
}
}
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='10px sans-serif';ctx.textAlign='left';
ctx.fillText('&#x1F7E2; 8+ Excellent  &#x1F535; 6-7 Good  &#x1F7E1; 4-5 Fair  &#x1F534; 1-3 Weak',L,H-8);
}

// ===== 6. GOLF IQ SEASON TREND Canvas 620x380 =====
function showIQTrend(){
playSfx('iqtrend_open');
var pn=getPanel('iqtrend');
var log=lsGet('iq_trend_log',[]);
var html='<button class="v24-close" onclick="window._v24Close(\'iqtrend\')">&times;</button>';
html+='<div class="v24-title">&#x1F9E0; Golf IQ &#xC2DC;&#xC98C; &#xD2B8;&#xB80C;&#xB4DC;</div>';
html+='<canvas id="v24-iqtrend-canvas" width="620" height="380" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v24-card"><h3>IQ &#xC810;&#xC218; &#xAE30;&#xB85D;</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px">';
html+='<div><label class="v24-label">&#xCF54;&#xC2A4;&#xB9E4;&#xB2C8;&#xC9C0;&#xBA3C;&#xD2B8;</label><input class="v24-input" type="number" id="v24-iq1" value="70" min="0" max="100"></div>';
html+='<div><label class="v24-label">&#xC0F7;&#xC140;&#xB809;&#xC158;</label><input class="v24-input" type="number" id="v24-iq2" value="65" min="0" max="100"></div>';
html+='<div><label class="v24-label">&#xB9AC;&#xC2A4;&#xD06C;&#xAD00;&#xB9AC;</label><input class="v24-input" type="number" id="v24-iq3" value="60" min="0" max="100"></div>';
html+='<div><label class="v24-label">&#xBA58;&#xD0C8;&#xAC8C;&#xC784;</label><input class="v24-input" type="number" id="v24-iq4" value="55" min="0" max="100"></div>';
html+='<div><label class="v24-label">&#xC804;&#xB7B5;&#xC0AC;&#xACE0;</label><input class="v24-input" type="number" id="v24-iq5" value="60" min="0" max="100"></div>';
html+='<div><label class="v24-label">&#xC0C1;&#xD669;&#xD310;&#xB2E8;</label><input class="v24-input" type="number" id="v24-iq6" value="65" min="0" max="100"></div>';
html+='</div>';
html+='<button class="v24-btn v24-btn-primary" style="width:100%;margin-top:8px" onclick="window._v24SaveIQTrend()">&#x1F4BE; &#xC800;&#xC7A5;</button>';
html+='</div>';
var latest=log.length>0?log[log.length-1]:null;
var avgIQ=0;if(latest){for(var i=0;i<6;i++)avgIQ+=latest.scores[i];avgIQ=Math.round(avgIQ/6);}
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v24-stat-card"><div class="v24-stat-val" style="color:#00FF88">'+avgIQ+'</div><div class="v24-stat-label">&#xCD5C;&#xADFC; IQ</div></div>';
var trend=0;if(log.length>=2){var p=log[log.length-2];var c2=log[log.length-1];var ps=0,cs=0;for(var i=0;i<6;i++){ps+=p.scores[i];cs+=c2.scores[i];}trend=Math.round((cs-ps)/6);}
html+='<div class="v24-stat-card"><div class="v24-stat-val" style="color:'+(trend>=0?'#4ECDC4':'#FF6B6B')+'">'+(trend>=0?'+':'')+trend+'</div><div class="v24-stat-label">&#xC804;&#xD68C;&#xB300;&#xBE44;</div></div>';
var peak=0;for(var j=0;j<log.length;j++){var s=0;for(var i=0;i<6;i++)s+=log[j].scores[i];s=Math.round(s/6);if(s>peak)peak=s;}
html+='<div class="v24-stat-card"><div class="v24-stat-val" style="color:#FFB800">'+peak+'</div><div class="v24-stat-label">Peak IQ</div></div>';
html+='<div class="v24-stat-card"><div class="v24-stat-val" style="color:#A855F7">'+log.length+'</div><div class="v24-stat-label">&#xCE21;&#xC815;&#xD69F;&#xC218;</div></div>';
html+='</div>';
if(log.length>0)html+='<button class="v24-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'&#xCD08;&#xAE30;&#xD654;?\'))window._v24ResetIQTrend()">&#xCD08;&#xAE30;&#xD654;</button>';
pn.innerHTML=html;openPanel('iqtrend');drawIQTrendCanvas(log);
}
window._v24SaveIQTrend=function(){playSfx('save_v24');var scores=[];for(var i=1;i<=6;i++){scores.push(parseInt(document.getElementById('v24-iq'+i).value)||50);}var log=lsGet('iq_trend_log',[]);log.push({date:todayStr(),scores:scores});if(log.length>24)log.shift();lsSet('iq_trend_log',log);showToast('Golf IQ &#xAE30;&#xB85D; &#xC800;&#xC7A5;!');checkAchievements();showIQTrend();};
window._v24ResetIQTrend=function(){lsSet('iq_trend_log',[]);showIQTrend();};
function drawIQTrendCanvas(log){
var c=document.getElementById('v24-iqtrend-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=380;ctx.clearRect(0,0,W,H);
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,W,H);
ctx.fillStyle='rgba(168,85,247,0.03)';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 16px sans-serif';ctx.textAlign='center';
ctx.fillText('Golf IQ Season Trend',W/2,28);
if(log.length<2){ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='13px sans-serif';ctx.fillText('2+ IQ records needed for trend',W/2,H/2);return;}
var L=50,R=W-30,T=55,B=H-50;
var CATS=['Course','Shot','Risk','Mental','Strategy','Judgment'];
var COLORS=['#FF6B6B','#FF9F43','#FECA57','#48DBFB','#00FF88','#A855F7'];
ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.lineWidth=1;
for(var i=0;i<=4;i++){var y=T+(B-T)*i/4;ctx.beginPath();ctx.moveTo(L,y);ctx.lineTo(R,y);ctx.stroke();ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='10px sans-serif';ctx.textAlign='right';ctx.fillText((100-i*25)+'',L-4,y+4);}
var segW=(R-L)/(log.length-1);
for(var cat=0;cat<6;cat++){
ctx.strokeStyle=COLORS[cat];ctx.lineWidth=1.5;ctx.beginPath();
for(var j=0;j<log.length;j++){var x=L+j*segW;var y=B-(log[j].scores[cat]/100)*(B-T);if(j===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}
ctx.stroke();
var lastY=B-(log[log.length-1].scores[cat]/100)*(B-T);
ctx.fillStyle=COLORS[cat];ctx.beginPath();ctx.arc(R,lastY,3,0,Math.PI*2);ctx.fill();
ctx.font='9px sans-serif';ctx.textAlign='left';ctx.fillText(CATS[cat],R+6,lastY+3);
}
ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.beginPath();
for(var j=0;j<log.length;j++){var x=L+j*segW;var avg=0;for(var i=0;i<6;i++)avg+=log[j].scores[i];avg/=6;var y=B-(avg/100)*(B-T);if(j===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}
ctx.stroke();
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='9px sans-serif';ctx.textAlign='center';
for(var j=0;j<log.length;j+=Math.max(1,Math.floor(log.length/8))){ctx.fillText(log[j].date.slice(5),L+j*segW,B+14);}
ctx.fillStyle='#fff';ctx.font='bold 10px sans-serif';ctx.textAlign='left';
ctx.fillText('&#x2501; Overall IQ',L,H-8);
}

// ===== 7. GIR PROXIMITY MAP Canvas 620x400 =====
var PROX_RANGES=['0-3m','3-6m','6-10m','10-15m','15-20m','20m+'];
var PROX_COLORS=['#00FF88','#4ECDC4','#48DBFB','#FECA57','#FF9F43','#FF6B6B'];
function showProximity(){
playSfx('prox_open');
var pn=getPanel('proximity');
var data=lsGet('prox_data',{});
var html='<button class="v24-close" onclick="window._v24Close(\'proximity\')">&times;</button>';
html+='<div class="v24-title">&#x26F3; GIR &#xADFC;&#xC811;&#xB3C4; &#xB9F5;</div>';
html+='<canvas id="v24-prox-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v24-card"><h3>&#xD540; &#xADFC;&#xC811;&#xB3C4;&#xBCC4; &#xAE30;&#xB85D;</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px">';
for(var i=0;i<PROX_RANGES.length;i++){
var cnt=data[i]||0;
html+='<div class="v24-card" style="border-color:'+PROX_COLORS[i]+'30">';
html+='<div style="font-size:11px;color:'+PROX_COLORS[i]+';font-weight:bold;margin-bottom:4px">'+PROX_RANGES[i]+'</div>';
html+='<input class="v24-input" type="number" id="v24-prox-'+i+'" value="'+cnt+'" min="0" style="text-align:center">';
html+='</div>';
}
html+='</div>';
html+='<button class="v24-btn v24-btn-primary" style="width:100%;margin-top:8px" onclick="window._v24SaveProx()">&#x1F4BE; &#xC800;&#xC7A5;</button>';
html+='</div>';
var total=0;for(var i=0;i<PROX_RANGES.length;i++)total+=(data[i]||0);
var closeShots=(data[0]||0)+(data[1]||0);
var closePct=total>0?Math.round(closeShots*100/total):0;
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v24-stat-card"><div class="v24-stat-val" style="color:#00FF88">'+total+'</div><div class="v24-stat-label">&#xCD1D; GIR</div></div>';
html+='<div class="v24-stat-card"><div class="v24-stat-val" style="color:#4ECDC4">'+closePct+'%</div><div class="v24-stat-label">6m &#xC774;&#xB0B4;</div></div>';
html+='<div class="v24-stat-card"><div class="v24-stat-val" style="color:#FFB800">'+closeShots+'</div><div class="v24-stat-label">&#xBC84;&#xB514; &#xAE30;&#xD68C;</div></div>';
var dominantRange='-';var maxC=0;for(var i=0;i<PROX_RANGES.length;i++){if((data[i]||0)>maxC){maxC=data[i]||0;dominantRange=PROX_RANGES[i];}}
html+='<div class="v24-stat-card"><div class="v24-stat-val" style="color:#A855F7;font-size:12px">'+dominantRange+'</div><div class="v24-stat-label">&#xC8FC;&#xC694; &#xBC94;&#xC704;</div></div>';
html+='</div>';
if(total>0)html+='<button class="v24-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'&#xCD08;&#xAE30;&#xD654;?\'))window._v24ResetProx()">&#xCD08;&#xAE30;&#xD654;</button>';
pn.innerHTML=html;openPanel('proximity');drawProxCanvas(data);
}
window._v24SaveProx=function(){playSfx('save_v24');var data={};for(var i=0;i<PROX_RANGES.length;i++){data[i]=parseInt(document.getElementById('v24-prox-'+i).value)||0;}lsSet('prox_data',data);showToast('GIR &#xADFC;&#xC811;&#xB3C4; &#xC800;&#xC7A5;!');checkAchievements();showProximity();};
window._v24ResetProx=function(){lsSet('prox_data',{});showProximity();};
function drawProxCanvas(data){
var c=document.getElementById('v24-prox-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,W,H);
ctx.fillStyle='rgba(78,205,196,0.03)';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 16px sans-serif';ctx.textAlign='center';
ctx.fillText('GIR Proximity Distribution',W/2,28);
var cx=W/2,cy=H/2+15;
var total=0;for(var i=0;i<PROX_RANGES.length;i++)total+=(data[i]||0);
if(total===0){ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='13px sans-serif';ctx.fillText('Enter GIR proximity data',cx,cy);return;}
var maxR=Math.min(W,H)/2-50;
var rings=[maxR*0.2,maxR*0.35,maxR*0.5,maxR*0.65,maxR*0.82,maxR];
for(var i=PROX_RANGES.length-1;i>=0;i--){
var cnt=data[i]||0;var pct=cnt/total;
ctx.fillStyle=PROX_COLORS[i]+(Math.round(30+pct*180)).toString(16).padStart(2,'0');
ctx.strokeStyle=PROX_COLORS[i]+'60';ctx.lineWidth=1;
ctx.beginPath();ctx.arc(cx,cy,rings[i],0,Math.PI*2);ctx.fill();ctx.stroke();
}
for(var i=0;i<PROX_RANGES.length;i++){
var cnt=data[i]||0;var pct=Math.round(cnt*100/total);
var r=(i<PROX_RANGES.length-1)?(rings[i]+rings[i+1])/2:rings[i]-15;
if(i===0)r=rings[0]/2;else if(i===1)r=(rings[0]+rings[1])/2;
ctx.fillStyle='#fff';ctx.font='bold 10px sans-serif';
ctx.fillText(pct+'%',cx,cy-r+4);
ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='8px sans-serif';
ctx.fillText(PROX_RANGES[i],cx,cy-r+16);
}
ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='10px sans-serif';ctx.textAlign='left';
for(var i=0;i<PROX_RANGES.length;i++){
ctx.fillStyle=PROX_COLORS[i];ctx.fillRect(15,H-30-i*16,10,10);
ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='9px sans-serif';
ctx.fillText(PROX_RANGES[i]+' ('+(data[i]||0)+')',30,H-22-i*16);
}
}

// ===== 8. OVERALL PERFORMANCE RADAR Canvas 620x400 =====
var PERF_AXES=['Driving','Iron Play','Approach','Short Game','Putting','Course Mgmt','Mental','Fitness'];
function showOverallPerf(){
playSfx('perf_open');
var pn=getPanel('overallperf');
var profile=lsGet('perf_profile',[6,6,6,6,6,6,6,6]);
var log=lsGet('perf_log',[]);
var html='<button class="v24-close" onclick="window._v24Close(\'overallperf\')">&times;</button>';
html+='<div class="v24-title">&#x1F3C6; &#xC885;&#xD569; &#xD37C;&#xD3EC;&#xBA3C;&#xC2A4; &#xB808;&#xC774;&#xB354;</div>';
html+='<canvas id="v24-perf-canvas" width="620" height="400" style="width:100%;max-width:620px;height:auto;display:block;margin:8px auto;border-radius:12px"></canvas>';
html+='<div class="v24-card"><h3>8&#xCD95; &#xD37C;&#xD3EC;&#xBA3C;&#xC2A4; &#xD3C9;&#xAC00; (1~10)</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">';
for(var i=0;i<PERF_AXES.length;i++){
html+='<div><label class="v24-label">'+PERF_AXES[i]+'</label><input class="v24-input" type="range" min="1" max="10" value="'+profile[i]+'" id="v24-perf-'+i+'" oninput="window._v24UpdatePerf('+i+',this.value)"><span id="v24-perfv-'+i+'" style="font-size:11px;color:#00FF88;margin-left:4px">'+profile[i]+'</span></div>';
}
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
html+='<button class="v24-btn v24-btn-primary" onclick="window._v24SavePerf()">&#x1F4BE; &#xC800;&#xC7A5;</button>';
html+='<button class="v24-btn" onclick="window._v24ComparePerf()">&#x1F50D; PGA &#xBE44;&#xAD50;</button>';
html+='</div></div>';
var avg=0;for(var i=0;i<profile.length;i++)avg+=profile[i];avg=Math.round(avg*10/profile.length)/10;
var grade;if(avg>=8.5)grade='S';else if(avg>=7)grade='A';else if(avg>=5.5)grade='B';else if(avg>=4)grade='C';else grade='D';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v24-stat-card"><div class="v24-stat-val" style="color:'+(grade==='S'?'#00FF88':grade==='A'?'#4ECDC4':grade==='B'?'#FFB800':'#FF6B6B')+'">'+grade+'</div><div class="v24-stat-label">&#xC885;&#xD569; &#xB4F1;&#xAE09;</div></div>';
html+='<div class="v24-stat-card"><div class="v24-stat-val" style="color:#4ECDC4">'+avg+'</div><div class="v24-stat-label">&#xD3C9;&#xADE0; &#xC810;&#xC218;</div></div>';
var maxIdx=0;for(var i=1;i<profile.length;i++)if(profile[i]>profile[maxIdx])maxIdx=i;
html+='<div class="v24-stat-card"><div class="v24-stat-val" style="color:#00FF88;font-size:11px">'+PERF_AXES[maxIdx]+'</div><div class="v24-stat-label">&#xAC15;&#xC810;</div></div>';
var minIdx=0;for(var i=1;i<profile.length;i++)if(profile[i]<profile[minIdx])minIdx=i;
html+='<div class="v24-stat-card"><div class="v24-stat-val" style="color:#FF6B6B;font-size:11px">'+PERF_AXES[minIdx]+'</div><div class="v24-stat-label">&#xAC1C;&#xC120;&#xC810;</div></div>';
html+='</div>';
if(log.length>0)html+='<button class="v24-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'&#xCD08;&#xAE30;&#xD654;?\'))window._v24ResetPerf()">&#xCD08;&#xAE30;&#xD654;</button>';
pn.innerHTML=html;openPanel('overallperf');drawPerfCanvas(profile,log);
}
window._v24UpdatePerf=function(i,v){var p=lsGet('perf_profile',[6,6,6,6,6,6,6,6]);p[i]=parseInt(v);lsSet('perf_profile',p);var el=document.getElementById('v24-perfv-'+i);if(el)el.textContent=v;drawPerfCanvas(p,lsGet('perf_log',[]));};
window._v24SavePerf=function(){playSfx('save_v24');var p=lsGet('perf_profile',[6,6,6,6,6,6,6,6]);var log=lsGet('perf_log',[]);log.push({date:todayStr(),profile:p.slice()});if(log.length>24)log.shift();lsSet('perf_log',log);showToast('&#xD37C;&#xD3EC;&#xBA3C;&#xC2A4; &#xC800;&#xC7A5;!');checkAchievements();showOverallPerf();};
window._v24ComparePerf=function(){playSfx('spin_calc');var p=lsGet('perf_profile',[6,6,6,6,6,6,6,6]);var pga=[8.5,8,8.2,8.5,8.8,9,8,7.5];var gaps=[];for(var i=0;i<8;i++){var gap=pga[i]-p[i];if(gap>1)gaps.push(PERF_AXES[i]+' (-'+gap.toFixed(1)+')');}if(gaps.length===0)showToast('PGA Tour &#xD3C9;&#xADE0; &#xC218;&#xC900;!');else showToast('Gap: '+gaps.slice(0,2).join(', '));};
window._v24ResetPerf=function(){lsSet('perf_log',[]);lsSet('perf_profile',[6,6,6,6,6,6,6,6]);showOverallPerf();};
function drawPerfCanvas(profile,log){
var c=document.getElementById('v24-perf-canvas');if(!c)return;var ctx=c.getContext('2d');
var W=620,H=400;ctx.clearRect(0,0,W,H);
ctx.fillStyle='#0d1117';ctx.fillRect(0,0,W,H);
ctx.fillStyle='rgba(255,184,0,0.03)';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#fff';ctx.font='bold 16px sans-serif';ctx.textAlign='center';
ctx.fillText('Overall Performance Radar',W/2,28);
var cx=W/2,cy=H/2+10,R=Math.min(W,H)/2-55;var n=PERF_AXES.length;
for(var ring=1;ring<=5;ring++){ctx.strokeStyle='rgba(255,255,255,'+(ring===5?0.15:0.06)+')';ctx.beginPath();for(var i=0;i<=n;i++){var a=-Math.PI/2+(i%n)*2*Math.PI/n;var r=R*ring/5;if(i===0)ctx.moveTo(cx+r*Math.cos(a),cy+r*Math.sin(a));else ctx.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a));}ctx.closePath();ctx.stroke();}
for(var i=0;i<n;i++){var a=-Math.PI/2+i*2*Math.PI/n;ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+R*Math.cos(a),cy+R*Math.sin(a));ctx.stroke();
ctx.fillStyle='rgba(255,255,255,0.7)';ctx.font='10px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
var lx=cx+(R+22)*Math.cos(a);var ly=cy+(R+22)*Math.sin(a);ctx.fillText(PERF_AXES[i],lx,ly);}
var pga=[8.5,8,8.2,8.5,8.8,9,8,7.5];
ctx.fillStyle='rgba(255,184,0,0.08)';ctx.strokeStyle='rgba(255,184,0,0.4)';ctx.lineWidth=1;ctx.setLineDash([4,4]);ctx.beginPath();
for(var i=0;i<=n;i++){var a=-Math.PI/2+(i%n)*2*Math.PI/n;var r=R*pga[i%n]/10;if(i===0)ctx.moveTo(cx+r*Math.cos(a),cy+r*Math.sin(a));else ctx.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a));}ctx.closePath();ctx.fill();ctx.stroke();ctx.setLineDash([]);
if(log.length>0){var prev=log[log.length-1].profile;ctx.fillStyle='rgba(168,85,247,0.08)';ctx.strokeStyle='rgba(168,85,247,0.35)';ctx.lineWidth=1;ctx.beginPath();for(var i=0;i<=n;i++){var a=-Math.PI/2+(i%n)*2*Math.PI/n;var r=R*(prev[i%n]||6)/10;if(i===0)ctx.moveTo(cx+r*Math.cos(a),cy+r*Math.sin(a));else ctx.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a));}ctx.closePath();ctx.fill();ctx.stroke();}
ctx.fillStyle='rgba(0,255,136,0.15)';ctx.strokeStyle='#00FF88';ctx.lineWidth=2;ctx.beginPath();
for(var i=0;i<=n;i++){var a=-Math.PI/2+(i%n)*2*Math.PI/n;var r=R*profile[i%n]/10;if(i===0)ctx.moveTo(cx+r*Math.cos(a),cy+r*Math.sin(a));else ctx.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a));}
ctx.closePath();ctx.fill();ctx.stroke();
for(var i=0;i<n;i++){var a=-Math.PI/2+i*2*Math.PI/n;var r=R*profile[i]/10;ctx.fillStyle='#00FF88';ctx.beginPath();ctx.arc(cx+r*Math.cos(a),cy+r*Math.sin(a),4,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff';ctx.font='bold 10px sans-serif';ctx.fillText(profile[i]+'',cx+r*Math.cos(a),cy+r*Math.sin(a)-10);}
ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='10px sans-serif';ctx.textAlign='left';
ctx.fillText('&#x25CF; Current    &#x25CB; Previous    &#x25A1; PGA Avg',10,H-8);
var avg=0;for(var i=0;i<profile.length;i++)avg+=profile[i];avg=Math.round(avg*10/profile.length)/10;var grade;if(avg>=8.5)grade='S';else if(avg>=7)grade='A';else if(avg>=5.5)grade='B';else if(avg>=4)grade='C';else grade='D';
ctx.textAlign='right';ctx.fillStyle=grade==='S'?'#00FF88':grade==='A'?'#4ECDC4':grade==='B'?'#FFB800':'#FF6B6B';ctx.font='bold 18px sans-serif';ctx.fillText('Grade '+grade,W-10,H-8);
}

// ===== QUIZ v24: 15 QUESTIONS =====
var QUIZ_V24=[
{q:'&#xC2A4;&#xD540;&#xB808;&#xC774;&#xD2B8;&#xAC00; &#xB108;&#xBB34; &#xB192;&#xC73C;&#xBA74; &#xACF5;&#xC740; &#xC5B4;&#xB5BB;&#xAC8C; &#xB420;&#xAE4C;?',a:['&#xB192;&#xC774; &#xB728;&#xACE0; &#xBE44;&#xAC70;&#xB9AC; &#xAC10;&#xC18C;','&#xB0AE;&#xAC8C; &#xB0A0;&#xC544;&#xAC00;&#xBA70; &#xAD6C;&#xB974;&#xAE30;','&#xBE44;&#xAC70;&#xB9AC; &#xC99D;&#xAC00;','&#xBC29;&#xD5A5; &#xBCC0;&#xD654; &#xC5C6;&#xC74C;'],c:0},
{q:'Club fitting&#xC5D0;&#xC11C; Lie Angle&#xC774; &#xD3C9;&#xD3C9;&#xBCF4;&#xB2E4; upright&#xD558;&#xBA74;?',a:['&#xBCFC;&#xC774; &#xC67C;&#xCABD;&#xC73C;&#xB85C; &#xAC08; &#xAC00;&#xB2A5;&#xC131;','&#xBCFC;&#xC774; &#xC624;&#xB978;&#xCABD;&#xC73C;&#xB85C; &#xAC08; &#xAC00;&#xB2A5;&#xC131;','&#xBE44;&#xAC70;&#xB9AC; &#xC99D;&#xAC00;','&#xB192;&#xC774; &#xB728;&#xAE30;'],c:0},
{q:'Scoring Zone 0-50yd&#xC5D0;&#xC11C; &#xAC00;&#xC7A5; &#xC911;&#xC694;&#xD55C; &#xAE30;&#xC220;&#xC740;?',a:['&#xCE69;&#xC0F7;&#xACFC; &#xD53C;&#xCE58;&#xC0F7;','&#xD480;&#xC2A4;&#xC719;','&#xB4DC;&#xB77C;&#xC774;&#xBC84; &#xC0F7;','&#xD398;&#xC774;&#xB4DC; &#xC0F7;'],c:0},
{q:'Bounce-back&#xC774;&#xB780;?',a:['&#xBCF4;&#xAE30; &#xD6C4; &#xD30C; &#xC774;&#xD558; &#xAE30;&#xB85D;','&#xB354;&#xBE14;&#xBCF4;&#xAE30; &#xD6C4; &#xBC84;&#xB514;','OB &#xD6C4; &#xD648;&#xC778;&#xC6D0;','&#xD2B8;&#xB9AC;&#xD50C;&#xBCF4;&#xAE30; &#xD6C4; &#xD30C;'],c:0},
{q:'&#xC0F7; &#xC77C;&#xAD00;&#xC131;&#xC5D0;&#xC11C; &#xAC00;&#xC7A5; &#xC911;&#xC694;&#xD55C; &#xC694;&#xC18C;&#xB294;?',a:['&#xBC29;&#xD5A5; &#xC77C;&#xAD00;&#xC131;','&#xBE44;&#xAC70;&#xB9AC;','&#xD0C4;&#xB3C4;','&#xC815;&#xD655;&#xB3C4;'],c:0},
{q:'Golf IQ&#xC5D0;&#xC11C; &#xCF54;&#xC2A4;&#xB9E4;&#xB2C8;&#xC9C0;&#xBA3C;&#xD2B8; &#xC810;&#xC218;&#xAC00; &#xB192;&#xC73C;&#xBA74;?',a:['&#xC804;&#xB7B5;&#xC801; &#xD655;&#xB960; &#xD310;&#xB2E8; &#xB2A5;&#xB825; &#xC6B0;&#xC218;','&#xBE44;&#xAC70;&#xB9AC;&#xAC00; &#xAE40;','&#xD37C;&#xD305;&#xC774; &#xC815;&#xD655;','&#xCCB4;&#xB825;&#xC774; &#xC88B;&#xC74C;'],c:0},
{q:'GIR &#xADFC;&#xC811;&#xB3C4; 0-3m&#xB294; &#xBB34;&#xC5C7;&#xC744; &#xC758;&#xBBF8;?',a:['&#xD540;&#xC5D0;&#xC11C; 3m &#xC774;&#xB0B4;&#xC5D0; &#xACF5;&#xC774; &#xC815;&#xC9C0;','3m &#xD37C;&#xD305; &#xC131;&#xACF5;','&#xC5B4;&#xD504;&#xB85C;&#xCE58; 3m','&#xADF8;&#xB9B0; &#xC5D0;&#xC9C0;&#xC5D0;&#xC11C; 3m'],c:0},
{q:'&#xC885;&#xD569; &#xD37C;&#xD3EC;&#xBA3C;&#xC2A4;&#xC5D0;&#xC11C; PGA Tour &#xD3C9;&#xADE0; Putting &#xC810;&#xC218;&#xB294;?',a:['8.8','7.5','6.0','9.5'],c:0},
{q:'Driver&#xC758; &#xC774;&#xC0C1;&#xC801;&#xC778; &#xBC31;&#xC2A4;&#xD540;&#xC728;&#xC740;?',a:['2200~3200rpm','4000~5000rpm','1000~1500rpm','6000~8000rpm'],c:0},
{q:'Club fitting&#xC5D0;&#xC11C; Swing Weight&#xB780;?',a:['&#xD074;&#xB7FD;&#xD5E4;&#xB4DC;&#xC640; &#xADF8;&#xB9BD; &#xBB34;&#xAC8C; &#xBC38;&#xB7F0;&#xC2A4;','&#xC2A4;&#xC719; &#xC18D;&#xB3C4;','&#xC0E4;&#xD504;&#xD2B8; &#xACBD;&#xB3C4;','&#xD074;&#xB7FD; &#xCD1D; &#xBB34;&#xAC8C;'],c:0},
{q:'&#xBCF5;&#xAD6C;&#xB825;&#xC774; &#xB192;&#xC740; &#xACE8;&#xD37C;&#xC758; &#xD2B9;&#xC9D5;&#xC740;?',a:['&#xBA58;&#xD0C8; &#xAC15;&#xC778;&#xD568;&#xACFC; &#xC9D1;&#xC911;&#xB825;','&#xBE44;&#xAC70;&#xB9AC;&#xAC00; &#xAE40;','&#xD37C;&#xD305;&#xC774; &#xC815;&#xD655;','&#xC7A5;&#xBE44;&#xAC00; &#xC88B;&#xC74C;'],c:0},
{q:'&#xC2A4;&#xCF54;&#xC5B4;&#xB9C1; &#xC874; 100-150yd&#xC5D0;&#xC11C; &#xC8FC;&#xB85C; &#xC0AC;&#xC6A9;&#xD558;&#xB294; &#xD074;&#xB7FD;&#xC740;?',a:['8I~PW','Driver','3W','Putter'],c:0},
{q:'Sidespin&#xC774; &#xC591;&#xC218;&#xC774;&#xBA74; &#xBCFC;&#xC740; &#xC5B4;&#xB290; &#xBC29;&#xD5A5;&#xC73C;&#xB85C; &#xD718;&#xB294;&#xAC00;?',a:['&#xC624;&#xB978;&#xCABD; (slice/fade)','&#xC67C;&#xCABD; (draw/hook)','&#xC9C1;&#xC9C4;','&#xC704;&#xCABD;'],c:0},
{q:'&#xD37C;&#xD3EC;&#xBA3C;&#xC2A4; &#xB808;&#xC774;&#xB354;&#xC5D0;&#xC11C; &#xADE0;&#xD615;&#xC7A1;&#xD78C; &#xD504;&#xB85C;&#xD30C;&#xC77C;&#xC758; &#xC7A5;&#xC810;&#xC740;?',a:['&#xBAA8;&#xB4E0; &#xC601;&#xC5ED;&#xC774; &#xACE8;&#xACE0;&#xB8E8; &#xC548;&#xC815;&#xC801;','&#xD55C; &#xBD84;&#xC57C;&#xAC00; &#xC555;&#xB3C4;&#xC801;','&#xBE44;&#xAC70;&#xB9AC;&#xB9CC; &#xAE40;','&#xD37C;&#xD305;&#xB9CC; &#xC815;&#xD655;'],c:0},
{q:'Golf IQ &#xC2DC;&#xC98C; &#xD2B8;&#xB80C;&#xB4DC;&#xC5D0;&#xC11C; &#xC0C1;&#xC2B9;&#xC138;&#xB97C; &#xC720;&#xC9C0;&#xD558;&#xB824;&#xBA74;?',a:['&#xAFB8;&#xC900;&#xD55C; &#xC790;&#xAE30;&#xD3C9;&#xAC00;&#xC640; &#xB9E9;&#xC810; &#xAC1C;&#xC120;','&#xB354; &#xB9CE;&#xC740; &#xB77C;&#xC6B4;&#xB4DC;&#xB9CC;','&#xC7A5;&#xBE44; &#xAD50;&#xCCB4;','&#xCF54;&#xCE58; &#xACE0;&#xC6A9;'],c:0}
];
var quizState={idx:0,score:0,total:0,answered:false};
function showQuizV24(){
playSfx('nav_v24');
var pn=getPanel('quizv24');
var idx=quizState.idx;
var q=QUIZ_V24[idx%QUIZ_V24.length];
var html='<button class="v24-close" onclick="window._v24Close(\'quizv24\')">&times;</button>';
html+='<div class="v24-title">&#x1F4DA; Golf Quiz v24 (Q'+(idx+1)+'/'+QUIZ_V24.length+')</div>';
html+='<div class="v24-card"><h3>'+q.q+'</h3>';
for(var i=0;i<q.a.length;i++){
html+='<button class="v24-btn" style="width:100%;margin:3px 0;text-align:left" onclick="window._v24AnswerQuiz('+i+','+q.c+')">'+String.fromCharCode(65+i)+'. '+q.a[i]+'</button>';
}
html+='</div>';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v24-stat-card"><div class="v24-stat-val" style="color:#00FF88">'+quizState.score+'</div><div class="v24-stat-label">&#xC815;&#xB2F5;</div></div>';
html+='<div class="v24-stat-card"><div class="v24-stat-val" style="color:#FF6B6B">'+(quizState.total-quizState.score)+'</div><div class="v24-stat-label">&#xC624;&#xB2F5;</div></div>';
var pct=quizState.total>0?Math.round(quizState.score*100/quizState.total):0;
html+='<div class="v24-stat-card"><div class="v24-stat-val" style="color:#FFB800">'+pct+'%</div><div class="v24-stat-label">&#xC815;&#xB2F5;&#xB960;</div></div>';
html+='<div class="v24-stat-card"><div class="v24-stat-val" style="color:#A855F7">'+(idx+1)+'/'+QUIZ_V24.length+'</div><div class="v24-stat-label">&#xC9C4;&#xD589;</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('quizv24');
}
window._v24AnswerQuiz=function(sel,correct){
if(quizState.answered)return;quizState.answered=true;quizState.total++;
if(sel===correct){quizState.score++;playSfx('quiz_correct_v24');showToast('&#xC815;&#xB2F5;!');}
else{playSfx('quiz_wrong_v24');showToast('&#xC624;&#xB2F5;! &#xC815;&#xB2F5;: '+String.fromCharCode(65+correct));}
lsSet('quiz_v24_score',quizState.score);lsSet('quiz_v24_total',quizState.total);
setTimeout(function(){quizState.answered=false;quizState.idx++;if(quizState.idx>=QUIZ_V24.length)quizState.idx=0;checkAchievements();showQuizV24();},1200);
};

// ===== ACHIEVEMENTS =====
var ACHIEVEMENTS_V24=[
{id:'spin_analyst',name:'Spin Analyst',desc:'&#xC2A4;&#xD540; 10&#xD68C; &#xAE30;&#xB85D;',check:function(){return lsGet('spin_log',[]).length>=10}},
{id:'fit_expert',name:'Fitting Expert',desc:'&#xD53C;&#xD305; 5&#xD68C; &#xC800;&#xC7A5;',check:function(){return lsGet('fit_log',[]).length>=5}},
{id:'zone_master',name:'Zone Master',desc:'&#xC874;&#xBCC4; 50&#xC0F7; &#xAE30;&#xB85D;',check:function(){var d=lsGet('zone_data',{});var t=0;for(var i=0;i<6;i++)t+=(d[i]?d[i].shots:0);return t>=50}},
{id:'recovery_king',name:'Recovery King',desc:'&#xBCF5;&#xAD6C; 5&#xB77C;&#xC6B4;&#xB4DC;',check:function(){return lsGet('recovery_log',[]).length>=5}},
{id:'consist_tracker',name:'Consistency Tracker',desc:'&#xC77C;&#xAD00;&#xC131; &#xB9E4;&#xD2B8;&#xB9AD;&#xC2A4; &#xC800;&#xC7A5;',check:function(){var d=lsGet('consist_data',{});return Object.keys(d).length>=13}},
{id:'iq_tracker',name:'IQ Tracker',desc:'Golf IQ 5&#xD68C; &#xCE21;&#xC815;',check:function(){return lsGet('iq_trend_log',[]).length>=5}},
{id:'prox_analyst',name:'Proximity Analyst',desc:'GIR &#xADFC;&#xC811;&#xB3C4; 30&#xC0F7;',check:function(){var d=lsGet('prox_data',{});var t=0;for(var i=0;i<6;i++)t+=(d[i]||0);return t>=30}},
{id:'perf_evaluator',name:'Performance Evaluator',desc:'&#xC885;&#xD569; &#xD3C9;&#xAC00; 5&#xD68C;',check:function(){return lsGet('perf_log',[]).length>=5}},
{id:'quiz_v24_master',name:'Quiz v24 Master',desc:'v24 &#xD038;&#xC988; &#xC804;&#xBB38; &#xC815;&#xB2F5;',check:function(){return lsGet('quiz_v24_score',0)>=15}},
{id:'quiz_v24_clear',name:'Quiz v24 Clear',desc:'v24 &#xD038;&#xC988; &#xC644;&#xC8FC;',check:function(){return lsGet('quiz_v24_total',0)>=15}},
{id:'spin_s_grade',name:'Spin S Grade',desc:'&#xC2A4;&#xD540; S&#xB4F1;&#xAE09; &#xD68D;&#xB4DD;',check:function(){var log=lsGet('spin_log',[]);for(var i=0;i<log.length;i++){var cl=CLUBS_SPIN[log[i].club];if(log[i].back>=cl.backMin&&log[i].back<=cl.backMax&&Math.abs(log[i].side)<=cl.sideRange*0.5)return true;}return false}},
{id:'v24_complete',name:'v24 Complete',desc:'v24 &#xC804;&#xCCB4; &#xAE30;&#xB2A5; &#xD0D0;&#xC0C9;',check:function(){return lsGet('v24_explored',0)>=8}}
];
function checkAchievements(){
var unlocked=lsGet('achievements_v24',[]);
for(var i=0;i<ACHIEVEMENTS_V24.length;i++){
var a=ACHIEVEMENTS_V24[i];
if(unlocked.indexOf(a.id)===-1&&a.check()){
unlocked.push(a.id);lsSet('achievements_v24',unlocked);
playSfx('achieve_v24');showToast('🏆 '+a.name+' unlocked!');
}
}
}
var explored=lsGet('v24_explored',0);
function markExplored(){explored++;lsSet('v24_explored',explored);}

// ===== CSS =====
var style=document.createElement('style');
style.textContent='.v24-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:10020;display:none;align-items:center;justify-content:center;padding:16px;overflow-y:auto}.v24-overlay.active{display:flex}.v24-panel{background:#14141a;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:20px;max-width:660px;width:100%;max-height:90vh;overflow-y:auto;position:relative}.v24-close{position:absolute;top:12px;right:12px;background:none;border:none;color:#fff;font-size:24px;cursor:pointer;z-index:2;opacity:0.7}.v24-close:hover{opacity:1}.v24-title{font-size:18px;font-weight:bold;color:#fff;margin-bottom:12px;text-align:center}.v24-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;margin:8px 0}.v24-card h3{font-size:13px;color:rgba(255,255,255,0.7);margin-bottom:6px}.v24-label{font-size:10px;color:rgba(255,255,255,0.5);display:block;margin-bottom:2px}.v24-input{width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:6px;color:#fff;padding:6px 8px;font-size:12px;outline:none;box-sizing:border-box}.v24-input:focus{border-color:#00FF88}.v24-btn{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);border-radius:8px;color:#fff;padding:8px 12px;font-size:12px;cursor:pointer;transition:all 0.2s}.v24-btn:hover{background:rgba(255,255,255,0.12)}.v24-btn-primary{background:rgba(0,255,136,0.15);border-color:rgba(0,255,136,0.3);color:#00FF88}.v24-btn-primary:hover{background:rgba(0,255,136,0.25)}.v24-btn-sm{padding:6px 8px;font-size:11px}.v24-stat-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:10px;text-align:center}.v24-stat-val{font-size:18px;font-weight:bold}.v24-stat-label{font-size:9px;color:rgba(255,255,255,0.5);margin-top:2px}.v24-toast{position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(20px);background:rgba(0,255,136,0.15);border:1px solid rgba(0,255,136,0.3);color:#00FF88;padding:10px 20px;border-radius:10px;font-size:13px;z-index:10030;opacity:0;transition:all 0.3s}.v24-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}';
document.head.appendChild(style);

// ===== NAVIGATION =====
window._v24Close=function(id){closePanel(id);};
function addNavButtons(){
var existing=document.querySelector('[id*="v23"]')||document.querySelector('[id*="v22"]')||document.querySelector('[id*="v21"]')||document.querySelector('[id*="v20"]')||document.querySelector('.gt-bottom-nav')||document.querySelector('[style*="position:fixed"][style*="bottom"]');
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
{label:'Spin',fn:showSpinRate,icon:'&#x1F300;'},
{label:'Fitting',fn:showClubFitting,icon:'&#x1F3CC;'},
{label:'Zone',fn:showScoringZone,icon:'&#x1F3AF;'},
{label:'Recovery',fn:showRecovery,icon:'&#x1F504;'},
{label:'Consist',fn:showConsistency,icon:'&#x1F4CA;'},
{label:'IQ Trend',fn:showIQTrend,icon:'&#x1F9E0;'},
{label:'Proximity',fn:showProximity,icon:'&#x26F3;'},
{label:'PerfRadar',fn:showOverallPerf,icon:'&#x1F3C6;'},
{label:'Quiz24',fn:showQuizV24,icon:'&#x1F4DA;'}
];
for(var i=0;i<btns.length;i++){
(function(b){
var btn=document.createElement('button');
btn.innerHTML=b.icon+'<br><span style="font-size:8px">'+b.label+'</span>';
btn.style.cssText='background:rgba(0,210,150,0.12);border:1px solid rgba(0,210,150,0.25);border-radius:8px;color:#00D296;padding:6px 4px;font-size:12px;cursor:pointer;min-width:44px;flex:0 0 auto;margin:2px';
btn.addEventListener('click',function(){b.fn();markExplored();});
nav.appendChild(btn);
})(btns[i]);
}
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown',function(e){
if(!e.shiftKey)return;
switch(e.key){
case'A':case'a':showSpinRate();markExplored();break;
case'S':case's':showClubFitting();markExplored();break;
case'D':case'd':showScoringZone();markExplored();break;
case'F':case'f':showRecovery();markExplored();break;
case'G':case'g':showConsistency();markExplored();break;
case'H':case'h':showIQTrend();markExplored();break;
case'J':case'j':showProximity();markExplored();break;
case'K':case'k':showOverallPerf();markExplored();break;
case'9':showQuizV24();markExplored();break;
}
});

// ===== INIT =====
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',addNavButtons);}
else{setTimeout(addNavButtons,1800);}
setTimeout(checkAchievements,3500);
})();
