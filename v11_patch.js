(function(){
'use strict';
var LS='gt_v11_';
var audioCtx=null;
function getAC(){if(!audioCtx)try{audioCtx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}return audioCtx}
function playSfx(type){var ac=getAC();if(!ac)return;var o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);var t=ac.currentTime;g.gain.setValueAtTime(0.1,t);switch(type){case'wind_calc':o.type='sine';o.frequency.setValueAtTime(330,t);o.frequency.linearRampToValueAtTime(440,t+0.06);o.frequency.linearRampToValueAtTime(554,t+0.12);g.gain.exponentialRampToValueAtTime(0.01,t+0.25);o.start(t);o.stop(t+0.25);break;case'club_record':o.type='triangle';o.frequency.setValueAtTime(262,t);o.frequency.linearRampToValueAtTime(392,t+0.08);g.gain.setValueAtTime(0.08,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.18);o.start(t);o.stop(t+0.18);break;case'par_view':o.type='sine';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(587,t+0.1);o.frequency.linearRampToValueAtTime(698,t+0.2);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'mental_save':o.type='sine';o.frequency.setValueAtTime(494,t);o.frequency.linearRampToValueAtTime(622,t+0.08);g.gain.exponentialRampToValueAtTime(0.01,t+0.2);o.start(t);o.stop(t+0.2);break;case'journal_save':o.type='triangle';o.frequency.setValueAtTime(392,t);o.frequency.linearRampToValueAtTime(523,t+0.1);g.gain.setValueAtTime(0.07,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.22);o.start(t);o.stop(t+0.22);break;case'compare_view':o.type='sine';o.frequency.setValueAtTime(349,t);o.frequency.linearRampToValueAtTime(523,t+0.08);o.frequency.linearRampToValueAtTime(698,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'goal_done':o.type='sine';o.frequency.setValueAtTime(523,t);o.frequency.setValueAtTime(659,t+0.1);o.frequency.setValueAtTime(784,t+0.2);o.frequency.setValueAtTime(1047,t+0.3);g.gain.exponentialRampToValueAtTime(0.01,t+0.5);o.start(t);o.stop(t+0.5);break;case'tempo_tick':o.type='triangle';o.frequency.setValueAtTime(880,t);g.gain.setValueAtTime(0.12,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.06);o.start(t);o.stop(t+0.06);break;case'tempo_accent':o.type='sine';o.frequency.setValueAtTime(1175,t);g.gain.setValueAtTime(0.15,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.08);o.start(t);o.stop(t+0.08);break;case'share_capture':o.type='sine';o.frequency.setValueAtTime(659,t);o.frequency.setValueAtTime(784,t+0.08);o.frequency.setValueAtTime(988,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'v11_achieve':o.type='sine';o.frequency.setValueAtTime(784,t);o.frequency.setValueAtTime(988,t+0.1);o.frequency.setValueAtTime(1175,t+0.2);o.frequency.setValueAtTime(1568,t+0.3);g.gain.exponentialRampToValueAtTime(0.01,t+0.5);o.start(t);o.stop(t+0.5);break;case'v11_quiz':o.type='sine';o.frequency.setValueAtTime(523,t);o.frequency.setValueAtTime(659,t+0.1);o.frequency.setValueAtTime(784,t+0.2);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;default:o.type='sine';o.frequency.setValueAtTime(440,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.15);o.start(t);o.stop(t+0.15)}}

function lsGet(k,d){try{var v=localStorage.getItem(LS+k);return v?JSON.parse(v):d}catch(e){return d}}
function lsSet(k,v){try{localStorage.setItem(LS+k,JSON.stringify(v))}catch(e){}}
function todayStr(){return new Date().toISOString().slice(0,10)}
function weekNum(){var d=new Date();var start=new Date(d.getFullYear(),0,1);return Math.ceil(((d-start)/86400000+start.getDay()+1)/7)}
function showToast(msg){var t=document.createElement('div');t.className='v11-toast';t.textContent=msg;document.body.appendChild(t);setTimeout(function(){t.classList.add('show')},50);setTimeout(function(){t.classList.remove('show');setTimeout(function(){t.remove()},400)},3000)}
function createOverlay(id){var ov=document.createElement('div');ov.className='v11-overlay';ov.id='v11-'+id;ov.addEventListener('click',function(e){if(e.target===ov)closePanel(id)});var pn=document.createElement('div');pn.className='v11-panel';pn.style.position='relative';ov.appendChild(pn);return pn}
function openPanel(id){var el=document.getElementById('v11-'+id);if(el)el.classList.add('active')}
function closePanel(id){var el=document.getElementById('v11-'+id);if(el)el.classList.remove('active')}
function getPanel(id){var ov=document.getElementById('v11-'+id);if(!ov){var pn=createOverlay(id);pn.id='v11-'+id+'-panel';document.body.appendChild(pn.parentElement);return pn}return ov.querySelector('.v11-panel')||ov}

var CLUBS=['Driver','3W','5W','4H','5I','6I','7I','8I','9I','PW','GW','SW','LW','Putter'];

// ===== 1. WIND CALCULATOR =====
var WIND_DIR=['N','NE','E','SE','S','SW','W','NW'];
var WIND_LABELS=['북','북동','동','남동','남','남서','서','북서'];

function showWindCalc(){
var pn=getPanel('wind');
var html='<div class="v11-title">&#x1F4A8; 바람 보정 계산기</div>';

html+='<div class="v11-card"><h3>바람 정보 입력</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:8px">';
html+='<div><label class="v11-label">풍속 (m/s)</label><input id="v11-wd-speed" class="v11-input" type="number" min="0" max="30" step="0.5" value="5"></div>';
html+='<div><label class="v11-label">풍향</label><select id="v11-wd-dir" class="v11-input">';
for(var i=0;i<WIND_DIR.length;i++)html+='<option value="'+i+'">'+WIND_LABELS[i]+' ('+WIND_DIR[i]+')</option>';
html+='</select></div>';
html+='<div><label class="v11-label">샷 방향</label><select id="v11-wd-shot" class="v11-input"><option value="0">북 (N)</option><option value="45">북동 (NE)</option><option value="90">동 (E)</option><option value="135">남동 (SE)</option><option value="180">남 (S)</option><option value="225">남서 (SW)</option><option value="270">서 (W)</option><option value="315">북서 (NW)</option></select></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">';
html+='<div><label class="v11-label">클럽</label><select id="v11-wd-club" class="v11-input">';
for(var ci=0;ci<CLUBS.length-1;ci++)html+='<option>'+CLUBS[ci]+'</option>';
html+='</select></div>';
html+='<div><label class="v11-label">기본 비거리 (yd)</label><input id="v11-wd-dist" class="v11-input" type="number" min="30" max="350" value="200"></div>';
html+='</div>';
html+='<button class="v11-btn v11-btn-primary" style="width:100%;margin-top:12px" onclick="window._v11CalcWind()">보정 계산</button></div>';

html+='<div id="v11-wind-result"></div>';
html+='<canvas id="v11-wind-canvas" width="320" height="320" style="width:100%;max-width:320px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

html+='<div class="v11-card"><h3>&#x1F4D6; 바람 보정 참고표</h3>';
html+='<table class="v11-table"><tr><th>풍속</th><th>맞바람</th><th>뒷바람</th><th>측바람</th></tr>';
html+='<tr><td>5 m/s</td><td style="color:#ff6b6b">+8~12 yd</td><td style="color:#00FF88">-5~8 yd</td><td style="color:#FFC107">좌우 5~8 yd</td></tr>';
html+='<tr><td>10 m/s</td><td style="color:#ff6b6b">+18~25 yd</td><td style="color:#00FF88">-10~15 yd</td><td style="color:#FFC107">좌우 12~18 yd</td></tr>';
html+='<tr><td>15 m/s</td><td style="color:#ff6b6b">+30~40 yd</td><td style="color:#00FF88">-18~25 yd</td><td style="color:#FFC107">좌우 20~30 yd</td></tr>';
html+='</table>';
html+='<p style="margin-top:8px;font-size:.75em;color:#888">※ 높이 뜨는; 샷일수록 바람 영향 커짐. 드라이버 &gt; 아이언 &gt; 웨지 순.※</p></div>';

pn.innerHTML='<button class="v11-close" onclick="window._v11Close(\'wind\')">&times;</button>'+html;
openPanel('wind');playSfx('wind_calc');
setTimeout(function(){renderWindRose(null)},120);
v11CheckAch();lsSet('ach_wind_used',true);
}

window._v11CalcWind=function(){
var speed=parseFloat(document.getElementById('v11-wd-speed').value)||5;
var dirIdx=parseInt(document.getElementById('v11-wd-dir').value);
var shotDeg=parseInt(document.getElementById('v11-wd-shot').value);
var club=document.getElementById('v11-wd-club').value;
var baseDist=parseInt(document.getElementById('v11-wd-dist').value)||200;

var windDeg=dirIdx*45;
var relAngle=((windDeg-shotDeg)+360)%360;
var relRad=relAngle*Math.PI/180;
var headComp=Math.cos(relRad);
var sideComp=Math.sin(relRad);

var distAdj=Math.round(headComp*speed*2.2);
var sideAdj=Math.round(Math.abs(sideComp)*speed*1.8);
var sideDir=sideComp>0.1?'우측':sideComp<-0.1?'좌측':'직진';
var adjDist=baseDist+distAdj;
var windType=headComp>0.3?'맞바람':headComp<-0.3?'뒷바람':'측바람';

var rhtml='<div class="v11-card" style="text-align:center;background:linear-gradient(135deg,rgba(0,180,216,.08),rgba(0,255,136,.08))">';
rhtml+='<div style="font-size:.85em;color:#888;margin-bottom:4px">보정 비거리</div>';
rhtml+='<div style="font-size:3.5em;font-weight:800;color:#00FF88">'+adjDist+'<span style="font-size:.4em"> yd</span></div>';
rhtml+='<div style="margin-top:12px;display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:8px">';
rhtml+='<div><div style="font-size:1.1em;font-weight:700;color:#00B4D8">'+baseDist+'yd</div><div style="font-size:.65em;color:#888">기본</div></div>';
rhtml+='<div><div style="font-size:1.1em;font-weight:700;color:'+(distAdj>0?'#ff6b6b':'#00FF88')+'">'+(distAdj>0?'+':'')+distAdj+'yd</div><div style="font-size:.65em;color:#888">'+windType+'</div></div>';
rhtml+='<div><div style="font-size:1.1em;font-weight:700;color:#FFC107">'+(sideAdj>0?sideAdj+'yd':'-')+'</div><div style="font-size:.65em;color:#888">'+sideDir+'</div></div>';
rhtml+='<div><div style="font-size:1.1em;font-weight:700;color:#E040FB">'+speed+'m/s</div><div style="font-size:.65em;color:#888">풍속</div></div>';
rhtml+='</div></div>';

rhtml+='<div class="v11-card"><h3>&#x1F3CC;&#xFE0F; 클럽 추천</h3>';
if(distAdj>10)rhtml+='<p style="color:#FFC107">&#x26A0; 맞바람이 강합니다. 1~2클럽 올려 선택하세요.</p>';
else if(distAdj<-10)rhtml+='<p style="color:#00FF88">&#x2705; 뒷바람입니다. 1클럽 내려서 3/4 스윙을 추천합니다.</p>';
else rhtml+='<p style="color:#00B4D8">&#x2139; 바람 영향이; 크지 않습니다. 기본 클럽 선택으로 충분합니다.</p>';
if(sideAdj>8)rhtml+='<p style="color:#FFC107;margin-top:4px">&#x27A1; '+sideDir+'으로 '+sideAdj+'yd 휘어짐. 반대방향으로 에임;하세요.</p>';
rhtml+='</div>';

var resEl=document.getElementById('v11-wind-result');if(resEl)resEl.innerHTML=rhtml;
playSfx('wind_calc');showToast('보정 비거리: '+adjDist+'yd');
renderWindRose({windDeg:windDeg,shotDeg:shotDeg,speed:speed,distAdj:distAdj,sideAdj:sideAdj,sideComp:sideComp});
};

function renderWindRose(data){
var canvas=document.getElementById('v11-wind-canvas');if(!canvas)return;
var ctx=canvas.getContext('2d');var W=320,H=320,cx=W/2,cy=H/2,R=120;
ctx.clearRect(0,0,W,H);
ctx.fillStyle='rgba(0,20,40,.5)';ctx.fillRect(0,0,W,H);

for(var r=30;r<=R;r+=30){ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.strokeStyle='rgba(255,255,255,.06)';ctx.stroke()}
for(var a=0;a<8;a++){var rad=a*Math.PI/4;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+R*Math.sin(rad),cy-R*Math.cos(rad));ctx.strokeStyle='rgba(255,255,255,.06)';ctx.stroke()}

ctx.fillStyle='rgba(255,255,255,.5)';ctx.font='bold 11px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
var dirs=['N','NE','E','SE','S','SW','W','NW'];
for(var di=0;di<dirs.length;di++){
  var drad=di*Math.PI/4;
  ctx.fillText(dirs[di],cx+(R+16)*Math.sin(drad),cy-(R+16)*Math.cos(drad));
}

if(data){
  var wRad=data.windDeg*Math.PI/180;
  ctx.beginPath();ctx.moveTo(cx,cy);
  var wLen=Math.min(data.speed*8,R-10);
  var wx=cx+wLen*Math.sin(wRad);var wy=cy-wLen*Math.cos(wRad);
  ctx.lineTo(wx,wy);ctx.strokeStyle='#00B4D8';ctx.lineWidth=3;ctx.stroke();
  ctx.fillStyle='#00B4D8';ctx.beginPath();ctx.arc(wx,wy,6,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='rgba(0,180,216,.6)';ctx.font='bold 9px sans-serif';ctx.fillText('바람',wx+(wRad>Math.PI?-16:16),wy);

  var sRad=data.shotDeg*Math.PI/180;
  ctx.beginPath();ctx.moveTo(cx,cy);
  var sx=cx+80*Math.sin(sRad);var sy=cy-80*Math.cos(sRad);
  ctx.lineTo(sx,sy);ctx.strokeStyle='#00FF88';ctx.lineWidth=2.5;ctx.setLineDash([5,3]);ctx.stroke();ctx.setLineDash([]);
  ctx.fillStyle='#00FF88';ctx.beginPath();ctx.arc(sx,sy,5,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='rgba(0,255,136,.6)';ctx.font='bold 9px sans-serif';ctx.fillText('샷',sx+(sRad>Math.PI?-14:14),sy);
}

ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(cx,cy,4,0,Math.PI*2);ctx.fill();
ctx.lineWidth=1;
}

// ===== 2. CLUB DISTANCE TRACKER =====
function showClubDist(){
var pn=getPanel('clubdist');
var data=lsGet('club_distances',{});
var html='<div class="v11-title">&#x1F4CF; 클럽별 비거리 트래커</div>';

html+='<div class="v11-card"><h3>&#x2795; 비거리 기록</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:8px">';
html+='<div><label class="v11-label">클럽</label><select id="v11-cd-club" class="v11-input">';
for(var ci2=0;ci2<CLUBS.length-1;ci2++)html+='<option>'+CLUBS[ci2]+'</option>';
html+='</select></div>';
html+='<div><label class="v11-label">비거리 (yd)</label><input id="v11-cd-dist" class="v11-input" type="number" min="10" max="400" value="200"></div>';
html+='<div><label class="v11-label">캐리</label><input id="v11-cd-carry" class="v11-input" type="number" min="10" max="380" value="190" placeholder="캐리"></div>';
html+='</div>';
html+='<button class="v11-btn v11-btn-primary" style="width:100%;margin-top:12px" onclick="window._v11RecordClubDist()">기록</button></div>';

html+='<canvas id="v11-clubdist-canvas" width="560" height="300" style="width:100%;height:auto;border-radius:12px;margin-bottom:12px"></canvas>';

var hasData=false;
html+='<div class="v11-card"><h3>&#x1F4CA; 클럽별 통계</h3>';
html+='<table class="v11-table"><tr><th>클럽</th><th>AVG</th><th>MAX</th><th>MIN</th><th>캐리</th><th>회;/수;</th></tr>';
for(var ci3=0;ci3<CLUBS.length-1;ci3++){
  var c=CLUBS[ci3];var cd=data[c]||[];
  if(cd.length===0)continue;
  hasData=true;
  var dists=cd.map(function(d){return d.dist});
  var carries=cd.filter(function(d){return d.carry>0}).map(function(d){return d.carry});
  var avg=Math.round(dists.reduce(function(a,b){return a+b},0)/dists.length);
  var mx=Math.max.apply(null,dists);var mn=Math.min.apply(null,dists);
  var avgCarry=carries.length>0?Math.round(carries.reduce(function(a,b){return a+b},0)/carries.length):'-';
  html+='<tr><td style="color:#00B4D8;font-weight:600">'+c+'</td>';
  html+='<td style="color:#00FF88;font-weight:700">'+avg+'</td>';
  html+='<td style="color:#FFC107">'+mx+'</td>';
  html+='<td style="color:#888">'+mn+'</td>';
  html+='<td style="color:#E040FB">'+(avgCarry==='-'?'-':avgCarry)+'</td>';
  html+='<td>'+cd.length+'</td></tr>';
}
if(!hasData)html+='<tr><td colspan="6" style="color:#666;text-align:center">데이터가; 없습니다</td></tr>';
html+='</table></div>';

html+='<div class="v11-card"><h3>&#x1F4A1; 클럽 거리 가이드</h3>';
html+='<table class="v11-table"><tr><th>클럽</th><th>아마추어;</th><th>싱글;</th><th>PGA</th></tr>';
html+='<tr><td>Driver</td><td style="color:#888">180~220</td><td style="color:#FFC107">230~260</td><td style="color:#00FF88">290+</td></tr>';
html+='<tr><td>7I</td><td style="color:#888">120~140</td><td style="color:#FFC107">150~165</td><td style="color:#00FF88">175+</td></tr>';
html+='<tr><td>PW</td><td style="color:#888">90~110</td><td style="color:#FFC107">120~135</td><td style="color:#00FF88">140+</td></tr>';
html+='</table></div>';

pn.innerHTML='<button class="v11-close" onclick="window._v11Close(\'clubdist\')">&times;</button>'+html;
openPanel('clubdist');playSfx('club_record');
setTimeout(function(){renderClubDistCanvas(data)},120);
v11CheckAch();
}

window._v11RecordClubDist=function(){
var club=document.getElementById('v11-cd-club').value;
var dist=parseInt(document.getElementById('v11-cd-dist').value)||0;
var carry=parseInt(document.getElementById('v11-cd-carry').value)||0;
if(dist<10)return showToast('비거리를 입력하세요');
var data=lsGet('club_distances',{});
if(!data[club])data[club]=[];
data[club].push({date:todayStr(),dist:dist,carry:carry});
if(data[club].length>100)data[club]=data[club].slice(-100);
lsSet('club_distances',data);
showToast(club+': '+dist+'yd 기록');playSfx('club_record');showClubDist();v11CheckAch();
};

function renderClubDistCanvas(data){
var canvas=document.getElementById('v11-clubdist-canvas');if(!canvas)return;
var ctx=canvas.getContext('2d');var W=560,H=300;
ctx.clearRect(0,0,W,H);
ctx.fillStyle='rgba(0,20,40,.4)';ctx.fillRect(0,0,W,H);

var clubs=[];var avgs=[];var maxes=[];
for(var ci4=0;ci4<CLUBS.length-1;ci4++){
  var c=CLUBS[ci4];var cd=data[c]||[];
  if(cd.length===0)continue;
  clubs.push(c);
  var dists=cd.map(function(d){return d.dist});
  avgs.push(Math.round(dists.reduce(function(a,b){return a+b},0)/dists.length));
  maxes.push(Math.max.apply(null,dists));
}
if(clubs.length===0){ctx.fillStyle='rgba(255,255,255,.3)';ctx.font='14px sans-serif';ctx.textAlign='center';ctx.fillText('클럽별 비거리를 기록하면 차트가 표시됩니다',W/2,H/2);return}

var maxVal=Math.max.apply(null,maxes)+20;
var barW=Math.min(36,(W-80)/clubs.length-6);
var startX=60;

ctx.strokeStyle='rgba(255,255,255,.05)';
for(var gy=0;gy<5;gy++){
  var yv=Math.round(maxVal/5*(5-gy));
  var yy=30+(H-60)*gy/4;
  ctx.beginPath();ctx.moveTo(50,yy);ctx.lineTo(W-10,yy);ctx.stroke();
  ctx.fillStyle='rgba(255,255,255,.3)';ctx.font='9px sans-serif';ctx.textAlign='right';
  ctx.fillText(yv+'',48,yy+3);
}

for(var bi=0;bi<clubs.length;bi++){
  var x=startX+bi*(barW+8);
  var avgH=(H-60)*avgs[bi]/maxVal;
  var maxH=(H-60)*maxes[bi]/maxVal;

  var grad=ctx.createLinearGradient(0,H-30-maxH,0,H-30);
  grad.addColorStop(0,'rgba(255,193,7,.15)');grad.addColorStop(1,'rgba(255,193,7,0)');
  ctx.fillStyle=grad;ctx.fillRect(x,H-30-maxH,barW,maxH);

  var avgGrad=ctx.createLinearGradient(0,H-30-avgH,0,H-30);
  avgGrad.addColorStop(0,'rgba(0,255,136,.6)');avgGrad.addColorStop(1,'rgba(0,180,216,.4)');
  ctx.fillStyle=avgGrad;ctx.fillRect(x+2,H-30-avgH,barW-4,avgH);

  ctx.fillStyle='rgba(255,255,255,.7)';ctx.font='bold 9px sans-serif';ctx.textAlign='center';
  ctx.fillText(avgs[bi]+'',x+barW/2,H-30-avgH-6);
  ctx.fillStyle='rgba(255,255,255,.4)';ctx.font='8px sans-serif';
  ctx.fillText(clubs[bi],x+barW/2,H-8);
}

ctx.fillStyle='rgba(0,255,136,.5)';ctx.font='9px sans-serif';ctx.textAlign='left';
ctx.fillText('AVG',10,14);
ctx.fillStyle='rgba(255,193,7,.4)';ctx.fillText('MAX',50,14);
}

// ===== 3. PAR PERFORMANCE ANALYZER =====
function showParPerf(){
var pn=getPanel('parperf');
var rounds=[];
try{var r9=localStorage.getItem('gt_v9_scorecard_rounds');if(r9)rounds=JSON.parse(r9)}catch(e){}
var html='<div class="v11-title">&#x26F3; Par별 성적 분석기</div>';

var par3={total:0,birdies:0,pars:0,bogeys:0,dbls:0,avg:0,scores:[]};
var par4={total:0,birdies:0,pars:0,bogeys:0,dbls:0,avg:0,scores:[]};
var par5={total:0,birdies:0,pars:0,bogeys:0,dbls:0,avg:0,scores:[]};

var defaultPars=[4,4,3,4,5,4,3,4,5,4,4,3,4,5,4,3,4,5];
for(var ri=0;ri<rounds.length;ri++){
  var rd=rounds[ri];
  for(var h=0;h<18;h++){
    var sc=rd.scores[h];if(!sc||sc.score<=0)continue;
    var par=rd.pars?rd.pars[h]:defaultPars[h];
    var diff=sc.score-par;
    var bucket=par===3?par3:par===5?par5:par4;
    bucket.total++;bucket.scores.push(sc.score);
    if(diff<=-1)bucket.birdies++;
    else if(diff===0)bucket.pars++;
    else if(diff===1)bucket.bogeys++;
    else bucket.dbls++;
  }
}

var buckets=[{name:'Par 3',data:par3,color:'#00FF88',icon:'&#x1F3AF;'},{name:'Par 4',data:par4,color:'#00B4D8',icon:'&#x1F3CC;&#xFE0F;'},{name:'Par 5',data:par5,color:'#FFC107',icon:'&#x1F680;'}];

if(par3.total+par4.total+par5.total===0){
  html+='<div class="v11-card"><p>스코어카드에; 라운드를 기록하면 Par별 분석이; 표시됩니다.</p></div>';
} else {
  html+='<canvas id="v11-par-canvas" width="360" height="360" style="width:100%;max-width:360px;height:auto;display:block;margin:0 auto 16px;border-radius:12px"></canvas>';

  for(var bi2=0;bi2<buckets.length;bi2++){
    var b=buckets[bi2];var bd=b.data;
    if(bd.total===0)continue;
    var avg=Math.round(bd.scores.reduce(function(a,c){return a+c},0)/bd.scores.length*10)/10;
    html+='<div class="v11-card" style="border-left:3px solid '+b.color+'">';
    html+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">';
    html+='<h3 style="color:'+b.color+';margin:0">'+b.icon+' '+b.name+'</h3>';
    html+='<div style="font-size:1.6em;font-weight:800;color:'+b.color+'">'+avg+'</div></div>';
    html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px">';
    html+='<div class="v11-mini-stat"><div class="v11-mini-val" style="color:#00FF88">'+bd.birdies+'</div><div class="v11-mini-label">버디+</div></div>';
    html+='<div class="v11-mini-stat"><div class="v11-mini-val" style="color:#00B4D8">'+bd.pars+'</div><div class="v11-mini-label">파;</div></div>';
    html+='<div class="v11-mini-stat"><div class="v11-mini-val" style="color:#FFC107">'+bd.bogeys+'</div><div class="v11-mini-label">보기</div></div>';
    html+='<div class="v11-mini-stat"><div class="v11-mini-val" style="color:#ff6b6b">'+bd.dbls+'</div><div class="v11-mini-label">더블+</div></div>';
    html+='</div>';
    var parPct=Math.round((bd.birdies+bd.pars)/bd.total*100);
    html+='<div style="margin-top:8px"><div style="display:flex;justify-content:space-between;font-size:.8em"><span style="color:#888">파; 이하 비율</span><span style="color:'+(parPct>=50?'#00FF88':'#ff6b6b')+'">'+parPct+'%</span></div>';
    html+='<div style="height:6px;background:rgba(255,255,255,.05);border-radius:3px;overflow:hidden;margin-top:4px">';
    html+='<div style="width:'+parPct+'%;height:100%;background:'+b.color+';border-radius:3px"></div></div></div>';
    html+='</div>';
  }
}

pn.innerHTML='<button class="v11-close" onclick="window._v11Close(\'parperf\')">&times;</button>'+html;
openPanel('parperf');playSfx('par_view');
if(par3.total+par4.total+par5.total>0)setTimeout(function(){renderParRadar(par3,par4,par5)},120);
lsSet('ach_par_viewed',true);v11CheckAch();
}

function renderParRadar(p3,p4,p5){
var canvas=document.getElementById('v11-par-canvas');if(!canvas)return;
var ctx=canvas.getContext('2d');var W=360,H=360,cx=W/2,cy=H/2,R=130;
ctx.clearRect(0,0,W,H);
ctx.fillStyle='rgba(0,20,40,.4)';ctx.fillRect(0,0,W,H);

var labels=['버디+비율','파; 비율','보기이하','평균타수','안정성'];
var angles=[];for(var i=0;i<5;i++)angles.push(-Math.PI/2+i*2*Math.PI/5);

for(var r=0.2;r<=1.0;r+=0.2){
  ctx.beginPath();
  for(var a=0;a<5;a++){ctx[a===0?'moveTo':'lineTo'](cx+R*r*Math.cos(angles[a]),cy+R*r*Math.sin(angles[a]))}
  ctx.closePath();ctx.strokeStyle='rgba(255,255,255,.06)';ctx.stroke();
}
for(var a2=0;a2<5;a2++){ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+R*Math.cos(angles[a2]),cy+R*Math.sin(angles[a2]));ctx.strokeStyle='rgba(255,255,255,.06)';ctx.stroke()}

ctx.fillStyle='rgba(255,255,255,.4)';ctx.font='10px sans-serif';ctx.textAlign='center';
for(var li=0;li<labels.length;li++){
  var lx=cx+(R+20)*Math.cos(angles[li]);var ly=cy+(R+20)*Math.sin(angles[li]);
  ctx.fillText(labels[li],lx,ly+3);
}

function calcVals(pd){
  if(pd.total===0)return[0,0,0,0,0];
  var bpct=(pd.birdies/pd.total)*100;
  var ppct=(pd.pars/pd.total)*100;
  var bogeyPct=100-((pd.dbls/pd.total)*100);
  var avgNorm=Math.max(0,100-(Math.abs(pd.scores.reduce(function(a,b){return a+b},0)/pd.scores.length-3.8)*25));
  var stability=Math.max(0,100-((pd.dbls/pd.total)*200));
  return[Math.min(bpct*2,100)/100,Math.min(ppct*1.5,100)/100,bogeyPct/100,avgNorm/100,stability/100];
}

var datasets=[{data:calcVals(p3),color:'#00FF88',label:'Par 3'},{data:calcVals(p4),color:'#00B4D8',label:'Par 4'},{data:calcVals(p5),color:'#FFC107',label:'Par 5'}];

for(var di=0;di<datasets.length;di++){
  var ds=datasets[di];
  ctx.beginPath();
  for(var vi=0;vi<5;vi++){
    var vr=ds.data[vi]*R;
    var vx=cx+vr*Math.cos(angles[vi]);var vy=cy+vr*Math.sin(angles[vi]);
    if(vi===0)ctx.moveTo(vx,vy);else ctx.lineTo(vx,vy);
  }
  ctx.closePath();
  ctx.fillStyle=ds.color.replace(')',',0.08)').replace('#','rgba(').replace(/([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})/i,function(m,r,g,b){return parseInt(r,16)+','+parseInt(g,16)+','+parseInt(b,16)});
  var hex=ds.color;var rr=parseInt(hex.substr(1,2),16);var gg=parseInt(hex.substr(3,2),16);var bb=parseInt(hex.substr(5,2),16);
  ctx.fillStyle='rgba('+rr+','+gg+','+bb+',0.08)';ctx.fill();
  ctx.strokeStyle=ds.color;ctx.lineWidth=2;ctx.stroke();

  for(var vi2=0;vi2<5;vi2++){
    var vr2=ds.data[vi2]*R;
    ctx.fillStyle=ds.color;ctx.beginPath();ctx.arc(cx+vr2*Math.cos(angles[vi2]),cy+vr2*Math.sin(angles[vi2]),3,0,Math.PI*2);ctx.fill();
  }
}

ctx.fillStyle='rgba(255,255,255,.5)';ctx.font='9px sans-serif';ctx.textAlign='left';
for(var di2=0;di2<datasets.length;di2++){
  ctx.fillStyle=datasets[di2].color;ctx.fillRect(10,12+di2*16,10,10);
  ctx.fillStyle='rgba(255,255,255,.5)';ctx.fillText(datasets[di2].label,24,21+di2*16);
}
}

// ===== 4. MENTAL GAME TRACKER =====
function showMental(){
var pn=getPanel('mental');
var data=lsGet('mental_log',[]);
var html='<div class="v11-title">&#x1F9E0; 멘탈 게임 트래커</div>';

html+='<div class="v11-card"><h3>&#x2795; 멘탈 기록</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">';
html+='<div><label class="v11-label">자신감 (1~10)</label><input id="v11-mt-conf" class="v11-input" type="range" min="1" max="10" value="7"><div style="text-align:center;font-size:.8em;color:#00B4D8" id="v11-mt-conf-val">7</div></div>';
html+='<div><label class="v11-label">집중력 (1~10)</label><input id="v11-mt-focus" class="v11-input" type="range" min="1" max="10" value="7"><div style="text-align:center;font-size:.8em;color:#00B4D8" id="v11-mt-focus-val">7</div></div>';
html+='<div><label class="v11-label">프리샷 루틴 실행;</label><select id="v11-mt-preshot" class="v11-input"><option value="100">완벽 (100%)</option><option value="80" selected>대부분 (80%)</option><option value="60">보통 (60%)</option><option value="40">부족 (40%)</option><option value="20">거의 안 함 (20%)</option></select></div>';
html+='<div><label class="v11-label">압박감 (1=없음)</label><input id="v11-mt-pressure" class="v11-input" type="range" min="1" max="10" value="3"><div style="text-align:center;font-size:.8em;color:#FFC107" id="v11-mt-pressure-val">3</div></div>';
html+='</div>';
html+='<div style="margin-top:8px"><label class="v11-label">메모</label><input id="v11-mt-memo" class="v11-input" type="text" placeholder="오늘의; 멘탈 상태..." maxlength="60"></div>';
html+='<button class="v11-btn v11-btn-primary" style="width:100%;margin-top:12px" onclick="window._v11RecordMental()">기록</button></div>';

if(data.length>0){
  var recent=data.slice(-10);
  var avgConf=Math.round(recent.reduce(function(a,d){return a+d.confidence},0)/recent.length*10)/10;
  var avgFocus=Math.round(recent.reduce(function(a,d){return a+d.focus},0)/recent.length*10)/10;
  var avgPreshot=Math.round(recent.reduce(function(a,d){return a+d.preshot},0)/recent.length);
  var avgPressure=Math.round(recent.reduce(function(a,d){return a+d.pressure},0)/recent.length*10)/10;

  html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:12px">';
  html+='<div class="v11-stat-card"><div class="v11-stat-val" style="color:#00FF88">'+avgConf+'</div><div class="v11-stat-label">자신감</div></div>';
  html+='<div class="v11-stat-card"><div class="v11-stat-val" style="color:#00B4D8">'+avgFocus+'</div><div class="v11-stat-label">집중력</div></div>';
  html+='<div class="v11-stat-card"><div class="v11-stat-val" style="color:#FFC107">'+avgPreshot+'%</div><div class="v11-stat-label">프리샷</div></div>';
  html+='<div class="v11-stat-card"><div class="v11-stat-val" style="color:#E040FB">'+avgPressure+'</div><div class="v11-stat-label">압박감</div></div>';
  html+='</div>';

  html+='<div class="v11-card"><h3>&#x1F4C5; 최근 기록</h3>';
  for(var mi=data.length-1;mi>=Math.max(0,data.length-8);mi--){
    var m=data[mi];
    html+='<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.04)">';
    html+='<div><span style="color:#00B4D8;font-weight:600">'+m.date+'</span>';
    if(m.memo)html+=' <span style="color:#888;font-size:.8em">'+m.memo+'</span>';
    html+='</div>';
    html+='<div style="display:flex;gap:8px;font-size:.8em">';
    html+='<span style="color:#00FF88">자:'+m.confidence+'</span>';
    html+='<span style="color:#00B4D8">집:'+m.focus+'</span>';
    html+='<span style="color:#FFC107">PS:'+m.preshot+'%</span>';
    html+='</div></div>';
  }
  html+='</div>';
}

html+='<div class="v11-card"><h3>&#x1F4A1; 멘탈 게임 팁;</h3>';
html+='<div style="font-size:.85em;color:#aaa;line-height:1.7">';
html+='<p>&#x2022; 프리샷 루틴을 반드시 지키세요 - 일관성이 핵심</p>';
html+='<p>&#x2022; 실수 후; 4-7-8 호흡법으로 리셋</p>';
html+='<p>&#x2022; 과거 샷은 잊고 다음 샷에 집중 (One Shot at a Time)</p>';
html+='<p>&#x2022; 처음 3홀은 워밍업으로 생각하세요</p>';
html+='</div></div>';

pn.innerHTML='<button class="v11-close" onclick="window._v11Close(\'mental\')">&times;</button>'+html;
openPanel('mental');playSfx('mental_save');

var confSlider=document.getElementById('v11-mt-conf');
var focusSlider=document.getElementById('v11-mt-focus');
var pressSlider=document.getElementById('v11-mt-pressure');
if(confSlider)confSlider.oninput=function(){document.getElementById('v11-mt-conf-val').textContent=this.value};
if(focusSlider)focusSlider.oninput=function(){document.getElementById('v11-mt-focus-val').textContent=this.value};
if(pressSlider)pressSlider.oninput=function(){document.getElementById('v11-mt-pressure-val').textContent=this.value};
v11CheckAch();
}

window._v11RecordMental=function(){
var conf=parseInt(document.getElementById('v11-mt-conf').value);
var focus=parseInt(document.getElementById('v11-mt-focus').value);
var preshot=parseInt(document.getElementById('v11-mt-preshot').value);
var pressure=parseInt(document.getElementById('v11-mt-pressure').value);
var memo=document.getElementById('v11-mt-memo').value.trim().replace(/</g,'&lt;').replace(/>/g,'&gt;');
var data=lsGet('mental_log',[]);
data.push({date:todayStr(),confidence:conf,focus:focus,preshot:preshot,pressure:pressure,memo:memo});
if(data.length>100)data=data.slice(-100);
lsSet('mental_log',data);
showToast('멘탈 기록 완료!');playSfx('mental_save');showMental();v11CheckAch();
};

// ===== 5. COURSE JOURNAL =====
function showCourseJournal(){
var pn=getPanel('journal');
var entries=lsGet('course_journal',[]);
var html='<div class="v11-title">&#x1F4D3; 코스 전략 저널</div>';

html+='<div class="v11-card"><h3>&#x2795; 새 저널 작성</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">';
html+='<div><label class="v11-label">코스명</label><input id="v11-jn-course" class="v11-input" type="text" placeholder="코스 이름" maxlength="30"></div>';
html+='<div><label class="v11-label">컨디션</label><select id="v11-jn-cond" class="v11-input"><option value="excellent">⭐ 최상</option><option value="good" selected>✅ 좋음</option><option value="normal">➖ 보통</option><option value="tough">❌ 어려움</option></select></div>';
html+='</div>';
html+='<div style="margin-top:8px"><label class="v11-label">핵심 전략 / 메모</label><textarea id="v11-jn-memo" class="v11-input" rows="3" placeholder="코스 특징, 그린 특성, 전략 포인트..." style="resize:vertical" maxlength="200"></textarea></div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:8px">';
html+='<div><label class="v11-label">그린 스피드</label><select id="v11-jn-green" class="v11-input"><option value="fast">빠름</option><option value="medium" selected>보통</option><option value="slow">느림</option></select></div>';
html+='<div><label class="v11-label">페어웨이</label><select id="v11-jn-fw" class="v11-input"><option value="wide">넓음</option><option value="medium" selected>보통</option><option value="narrow">좁음</option></select></div>';
html+='<div><label class="v11-label">난이도</label><select id="v11-jn-diff" class="v11-input"><option value="easy">쉬움</option><option value="moderate" selected>보통</option><option value="hard">어려움</option><option value="expert">전문가;</option></select></div>';
html+='</div>';
html+='<button class="v11-btn v11-btn-primary" style="width:100%;margin-top:12px" onclick="window._v11SaveJournal()">저장</button></div>';

if(entries.length>0){
  html+='<div class="v11-card"><h3>&#x1F4DA; 저널 목록 ('+entries.length+'개)</h3>';
  var condIcons={excellent:'⭐',good:'✅',normal:'➖',tough:'❌'};
  var condColors={excellent:'#FFC107',good:'#00FF88',normal:'#888',tough:'#ff6b6b'};
  for(var ei=entries.length-1;ei>=Math.max(0,entries.length-10);ei--){
    var e=entries[ei];
    html+='<div style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,.04)">';
    html+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">';
    html+='<div><span style="font-weight:700;color:#00B4D8">'+e.course+'</span> <span style="font-size:.8em;color:#888">'+e.date+'</span></div>';
    html+='<span style="color:'+condColors[e.condition]+'">'+condIcons[e.condition]+'</span></div>';
    if(e.memo)html+='<p style="font-size:.82em;color:#aaa;margin:4px 0;line-height:1.5">'+e.memo+'</p>';
    html+='<div style="display:flex;gap:8px;font-size:.72em;color:#666">';
    html+='<span>그린:'+e.greenSpeed+'</span><span>FW:'+e.fairway+'</span><span>난이도:'+e.difficulty+'</span>';
    html+='</div></div>';
  }
  html+='</div>';
}

pn.innerHTML='<button class="v11-close" onclick="window._v11Close(\'journal\')">&times;</button>'+html;
openPanel('journal');playSfx('journal_save');v11CheckAch();
}

window._v11SaveJournal=function(){
var course=document.getElementById('v11-jn-course').value.trim().replace(/</g,'&lt;').replace(/>/g,'&gt;');
if(!course)return showToast('코스명을 입력하세요');
var cond=document.getElementById('v11-jn-cond').value;
var memo=document.getElementById('v11-jn-memo').value.trim().replace(/</g,'&lt;').replace(/>/g,'&gt;');
var green=document.getElementById('v11-jn-green').value;
var fw=document.getElementById('v11-jn-fw').value;
var diff=document.getElementById('v11-jn-diff').value;
var entries=lsGet('course_journal',[]);
entries.push({date:todayStr(),course:course,condition:cond,memo:memo,greenSpeed:green,fairway:fw,difficulty:diff});
if(entries.length>50)entries=entries.slice(-50);
lsSet('course_journal',entries);
showToast('코스 저널 저장!');playSfx('journal_save');showCourseJournal();v11CheckAch();
};

// ===== 6. ROUND COMPARISON =====
function showRoundCompare(){
var pn=getPanel('compare');
var rounds=[];
try{var r9=localStorage.getItem('gt_v9_scorecard_rounds');if(r9)rounds=JSON.parse(r9)}catch(e){}
var html='<div class="v11-title">&#x1F504; 라운드 비교 분석</div>';

if(rounds.length<2){
  html+='<div class="v11-card"><p>2회 이상 라운드를 기록하면 비교 분석이 가능합니다.</p></div>';
} else {
  html+='<div class="v11-card"><h3>비교할 라운드 선택</h3>';
  html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';
  html+='<div><label class="v11-label">라운드 A</label><select id="v11-cmp-a" class="v11-input">';
  for(var ri2=rounds.length-1;ri2>=0;ri2--){
    var rd=rounds[ri2];var tot=0;for(var h=0;h<18;h++){if(rd.scores[h]&&rd.scores[h].score>0)tot+=rd.scores[h].score}
    html+='<option value="'+ri2+'">'+(rd.course||'Round '+(ri2+1))+' ('+tot+'T, '+rd.date+')</option>';
  }
  html+='</select></div>';
  html+='<div><label class="v11-label">라운드 B</label><select id="v11-cmp-b" class="v11-input">';
  for(var ri3=rounds.length-1;ri3>=0;ri3--){
    var rd2=rounds[ri3];var tot2=0;for(var h2=0;h2<18;h2++){if(rd2.scores[h2]&&rd2.scores[h2].score>0)tot2+=rd2.scores[h2].score}
    html+='<option value="'+ri3+'"'+(ri3===Math.max(0,rounds.length-2)?' selected':'')+'>'+(rd2.course||'Round '+(ri3+1))+' ('+tot2+'T, '+rd2.date+')</option>';
  }
  html+='</select></div></div>';
  html+='<button class="v11-btn v11-btn-primary" style="width:100%;margin-top:12px" onclick="window._v11CompareRounds()">비교 분석</button></div>';
  html+='<div id="v11-compare-result"></div>';
}

pn.innerHTML='<button class="v11-close" onclick="window._v11Close(\'compare\')">&times;</button>'+html;
openPanel('compare');playSfx('compare_view');v11CheckAch();
}

window._v11CompareRounds=function(){
var rounds=[];
try{var r9=localStorage.getItem('gt_v9_scorecard_rounds');if(r9)rounds=JSON.parse(r9)}catch(e){}
var idxA=parseInt(document.getElementById('v11-cmp-a').value);
var idxB=parseInt(document.getElementById('v11-cmp-b').value);
if(idxA===idxB)return showToast('다른 라운드를 선택하세요');

var rdA=rounds[idxA];var rdB=rounds[idxB];
function calcStats(rd){
  var tot=0,putts=0,gir=0,fir=0,holes=0;
  for(var h=0;h<18;h++){
    var sc=rd.scores[h];if(!sc||sc.score<=0)continue;
    tot+=sc.score;putts+=sc.putts||0;if(sc.gir)gir++;if(sc.fir)fir++;holes++;
  }
  return{total:tot,putts:putts,gir:holes>0?Math.round(gir/holes*100):0,fir:holes>0?Math.round(fir/holes*100):0,holes:holes};
}
var sA=calcStats(rdA);var sB=calcStats(rdB);

var rhtml='<div class="v11-card"><h3>&#x1F4CA; 비교 결과</h3>';
rhtml+='<table class="v11-table"><tr><th>항목</th><th style="color:#00FF88">'+(rdA.course||'A')+'</th><th style="color:#FFC107">'+(rdB.course||'B')+'</th><th>차이</th></tr>';

function diffCell(va,vb,lower){var d=va-vb;var better=lower?(d<0):(d>0);return'<td style="color:'+(d===0?'#888':better?'#00FF88':'#ff6b6b')+';font-weight:700">'+(d>0?'+':'')+d+'</td>'}

rhtml+='<tr><td>총타수</td><td style="font-weight:700">'+sA.total+'</td><td style="font-weight:700">'+sB.total+'</td>'+diffCell(sA.total,sB.total,true)+'</tr>';
rhtml+='<tr><td>퍼팅</td><td>'+sA.putts+'</td><td>'+sB.putts+'</td>'+diffCell(sA.putts,sB.putts,true)+'</tr>';
rhtml+='<tr><td>GIR</td><td>'+sA.gir+'%</td><td>'+sB.gir+'%</td>'+diffCell(sA.gir,sB.gir,false)+'</tr>';
rhtml+='<tr><td>FIR</td><td>'+sA.fir+'%</td><td>'+sB.fir+'%</td>'+diffCell(sA.fir,sB.fir,false)+'</tr>';
rhtml+='</table></div>';

rhtml+='<div class="v11-card"><h3>&#x1F3CC;&#xFE0F; 홀별 비교</h3>';
rhtml+='<canvas id="v11-compare-canvas" width="560" height="220" style="width:100%;height:auto;border-radius:12px"></canvas></div>';

var resEl=document.getElementById('v11-compare-result');if(resEl)resEl.innerHTML=rhtml;
playSfx('compare_view');lsSet('ach_compare_used',true);v11CheckAch();

setTimeout(function(){
  var canvas=document.getElementById('v11-compare-canvas');if(!canvas)return;
  var ctx=canvas.getContext('2d');var W=560,H2=220;
  ctx.clearRect(0,0,W,H2);ctx.fillStyle='rgba(0,20,40,.4)';ctx.fillRect(0,0,W,H2);
  var barW=12;var startX=30;var step=(W-50)/18;
  for(var h3=0;h3<18;h3++){
    var scA=rdA.scores[h3]?rdA.scores[h3].score:0;
    var scB=rdB.scores[h3]?rdB.scores[h3].score:0;
    if(scA===0&&scB===0)continue;
    var x=startX+h3*step;
    var maxSc=Math.max(scA,scB,8);
    if(scA>0){var hA=(H2-50)*scA/maxSc;ctx.fillStyle='rgba(0,255,136,.6)';ctx.fillRect(x,H2-30-hA,barW,hA);ctx.fillStyle='rgba(255,255,255,.6)';ctx.font='bold 8px sans-serif';ctx.textAlign='center';ctx.fillText(scA+'',x+barW/2,H2-30-hA-4)}
    if(scB>0){var hB=(H2-50)*scB/maxSc;ctx.fillStyle='rgba(255,193,7,.5)';ctx.fillRect(x+barW+2,H2-30-hB,barW,hB);ctx.fillStyle='rgba(255,255,255,.5)';ctx.font='bold 8px sans-serif';ctx.fillText(scB+'',x+barW+2+barW/2,H2-30-hB-4)}
    ctx.fillStyle='rgba(255,255,255,.3)';ctx.font='8px sans-serif';ctx.textAlign='center';
    ctx.fillText((h3+1)+'',x+barW+1,H2-8);
  }
  ctx.fillStyle='rgba(0,255,136,.5)';ctx.fillRect(10,6,10,8);ctx.fillStyle='rgba(255,255,255,.5)';ctx.font='9px sans-serif';ctx.textAlign='left';ctx.fillText(rdA.course||'A',24,14);
  ctx.fillStyle='rgba(255,193,7,.5)';ctx.fillRect(100,6,10,8);ctx.fillStyle='rgba(255,255,255,.5)';ctx.fillText(rdB.course||'B',114,14);
},150);
};

// ===== 7. PRACTICE GOAL PLANNER =====
var GOAL_PRESETS=[
  {id:'range30',name:'레인지 30분',target:30,unit:'분',icon:'&#x1F3AF;'},
  {id:'putting20',name:'퍼팅 20분',target:20,unit:'분',icon:'&#x26F3;'},
  {id:'chip15',name:'칩/피치 15분',target:15,unit:'분',icon:'&#x1F3CC;&#xFE0F;'},
  {id:'mental',name:'멘탈 트레이닝',target:1,unit:'회',icon:'&#x1F9E0;'},
  {id:'video',name:'스윙 영상 분석',target:1,unit:'회',icon:'&#x1F4F9;'},
  {id:'stretch',name:'스트레칭 10분',target:10,unit:'분',icon:'&#x1F9D8;'}
];

function showGoalPlanner(){
var pn=getPanel('goals');
var wk=weekNum();
var goals=lsGet('weekly_goals_'+wk,null);
if(!goals){
  goals={week:wk,items:{}};
  for(var i=0;i<GOAL_PRESETS.length;i++){
    goals.items[GOAL_PRESETS[i].id]={done:false,progress:0};
  }
  lsSet('weekly_goals_'+wk,goals);
}

var completed=0;var total=GOAL_PRESETS.length;
for(var k in goals.items)if(goals.items[k].done)completed++;

var html='<div class="v11-title">&#x1F3AF; 주간 연습 목표</div>';
html+='<div style="text-align:center;margin-bottom:16px">';
html+='<div style="font-size:2em;font-weight:800;color:'+(completed===total?'#00FF88':'#00B4D8')+'">'+completed+' / '+total+'</div>';
html+='<div style="color:#888;font-size:.85em">주차 '+wk+' 목표 달성률</div>';
html+='<div style="height:8px;background:rgba(255,255,255,.05);border-radius:4px;overflow:hidden;margin-top:8px;max-width:300px;display:inline-block;width:100%">';
html+='<div style="width:'+Math.round(completed/total*100)+'%;height:100%;background:linear-gradient(90deg,#00B4D8,#00FF88);border-radius:4px;transition:width .3s"></div></div></div>';

for(var gi=0;gi<GOAL_PRESETS.length;gi++){
  var gp=GOAL_PRESETS[gi];var gs=goals.items[gp.id];
  html+='<div class="v11-card" style="'+(gs.done?'border-left:3px solid #00FF88;opacity:.7':'')+'">';
  html+='<div style="display:flex;justify-content:space-between;align-items:center">';
  html+='<div style="display:flex;align-items:center;gap:10px"><span style="font-size:1.3em">'+gp.icon+'</span>';
  html+='<div><div style="font-weight:700;color:'+(gs.done?'#00FF88':'#ccc')+'">'+gp.name+'</div>';
  html+='<div style="font-size:.72em;color:#888">목표: '+gp.target+gp.unit+'</div></div></div>';
  if(gs.done)html+='<span class="v11-badge v11-badge-a">&#x2705; 완료</span>';
  else html+='<button class="v11-btn v11-btn-primary" onclick="window._v11CompleteGoal(\''+gp.id+'\')">완료</button>';
  html+='</div></div>';
}

if(completed===total){
  html+='<div class="v11-card" style="text-align:center;background:linear-gradient(135deg,rgba(0,255,136,.06),rgba(0,180,216,.06))">';
  html+='<div style="font-size:2.5em;margin-bottom:8px">&#x1F3C6;</div>';
  html+='<h3 style="color:#00FF88">주간 목표 전체 달성!</h3>';
  html+='<p>이번 주 연습을 모두 완료했습니다. 훌륭합니다!</p></div>';
}

pn.innerHTML='<button class="v11-close" onclick="window._v11Close(\'goals\')">&times;</button>'+html;
openPanel('goals');v11CheckAch();
}

window._v11CompleteGoal=function(goalId){
var wk=weekNum();var goals=lsGet('weekly_goals_'+wk,null);if(!goals)return;
goals.items[goalId].done=true;goals.items[goalId].progress=100;
lsSet('weekly_goals_'+wk,goals);
playSfx('goal_done');showToast('목표 달성!');showGoalPlanner();v11CheckAch();
};

// ===== 8. SWING TEMPO TRAINER =====
var tempoRunning=false;var tempoInterval=null;var tempoBeatCount=0;

function showTempoTrainer(){
var pn=getPanel('tempo');
var settings=lsGet('tempo_settings',{bpm:72,ratio:'3:1',beats:0});
var html='<div class="v11-title">&#x1F3B5; 스윙 템포 트레이너</div>';

html+='<div class="v11-card"><h3>템포 설정</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:8px">';
html+='<div><label class="v11-label">BPM (백스윙 속도)</label>';
html+='<input id="v11-tp-bpm" class="v11-input" type="range" min="40" max="120" value="'+settings.bpm+'">';
html+='<div style="text-align:center;font-size:1.8em;font-weight:800;color:#00B4D8" id="v11-tp-bpm-val">'+settings.bpm+'</div></div>';
html+='<div><label class="v11-label">백스윙:다운스윙 비율</label>';
html+='<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px">';
var ratios=['3:1','2:1','2.5:1','4:1'];
for(var ri4=0;ri4<ratios.length;ri4++){
  html+='<button class="v11-btn'+(settings.ratio===ratios[ri4]?' active':'')+'" onclick="window._v11SetRatio(\''+ratios[ri4]+'\')">'+ratios[ri4]+'</button>';
}
html+='</div></div></div>';

html+='<div style="text-align:center;margin:16px 0">';
html+='<canvas id="v11-tempo-canvas" width="280" height="280" style="width:280px;height:280px;border-radius:50%"></canvas></div>';

html+='<div style="display:flex;gap:12px;justify-content:center;margin-bottom:16px">';
html+='<button class="v11-btn v11-btn-primary" id="v11-tp-start" onclick="window._v11ToggleTempo()" style="padding:12px 32px;font-size:1.1em">'+(tempoRunning?'&#x23F9; 정지':'&#x25B6; 시작')+'</button>';
html+='</div>';

html+='<div style="text-align:center;color:#888;font-size:.85em;margin-bottom:16px">총 비트: <span style="color:#00FF88;font-weight:700" id="v11-tp-beats">'+settings.beats+'</span></div>';
html+='</div>';

html+='<div class="v11-card"><h3>&#x1F4A1; 스윙 템포 가이드</h3>';
html+='<table class="v11-table"><tr><th>비율</th><th>특징</th><th>추천</th></tr>';
html+='<tr><td style="color:#00FF88;font-weight:700">3:1</td><td>프로 표준 비율</td><td style="color:#888">모든 레벨</td></tr>';
html+='<tr><td style="color:#00B4D8;font-weight:700">2:1</td><td>빠른 템포</td><td style="color:#888">상급자</td></tr>';
html+='<tr><td style="color:#FFC107;font-weight:700">2.5:1</td><td>중간 템포</td><td style="color:#888">중급자</td></tr>';
html+='<tr><td style="color:#E040FB;font-weight:700">4:1</td><td>느린 템포</td><td style="color:#888">초보자</td></tr>';
html+='</table>';
html+='<p style="margin-top:8px;font-size:.78em;color:#888">PGA Tour 평균 백스윙: 0.75초, 다운스윙: 0.25초 (3:1 비율, ~72 BPM)</p></div>';

pn.innerHTML='<button class="v11-close" onclick="window._v11Close(\'tempo\')">&times;</button>'+html;
openPanel('tempo');

var bpmSlider=document.getElementById('v11-tp-bpm');
if(bpmSlider)bpmSlider.oninput=function(){
  document.getElementById('v11-tp-bpm-val').textContent=this.value;
  var s2=lsGet('tempo_settings',{bpm:72,ratio:'3:1',beats:0});s2.bpm=parseInt(this.value);lsSet('tempo_settings',s2);
};
renderTempoCanvas(0);v11CheckAch();
}

function renderTempoCanvas(phase){
var canvas=document.getElementById('v11-tempo-canvas');if(!canvas)return;
var ctx=canvas.getContext('2d');var W=280,H=280,cx=W/2,cy=H/2,R=110;
ctx.clearRect(0,0,W,H);
ctx.fillStyle='rgba(0,20,40,.6)';ctx.fillRect(0,0,W,H);

ctx.beginPath();ctx.arc(cx,cy,R+15,0,Math.PI*2);
ctx.strokeStyle='rgba(0,180,216,.1)';ctx.lineWidth=3;ctx.stroke();

ctx.beginPath();ctx.arc(cx,cy,R,0,Math.PI*2);
ctx.strokeStyle='rgba(255,255,255,.08)';ctx.lineWidth=2;ctx.stroke();

var settings=lsGet('tempo_settings',{bpm:72,ratio:'3:1',beats:0});
var parts=settings.ratio.split(':');var backR=parseFloat(parts[0]);var downR=parseFloat(parts[1]);
var totalR=backR+downR;
var backAngle=(backR/totalR)*Math.PI*2;

ctx.beginPath();ctx.arc(cx,cy,R,-Math.PI/2,-Math.PI/2+backAngle);
ctx.strokeStyle='rgba(0,180,216,.3)';ctx.lineWidth=8;ctx.stroke();

ctx.beginPath();ctx.arc(cx,cy,R,-Math.PI/2+backAngle,-Math.PI/2+Math.PI*2);
ctx.strokeStyle='rgba(0,255,136,.3)';ctx.lineWidth=8;ctx.stroke();

if(tempoRunning&&phase>=0){
  var angle=-Math.PI/2+phase*Math.PI*2;
  var bx=cx+R*Math.cos(angle);var by=cy+R*Math.sin(angle);
  ctx.fillStyle=phase<backR/totalR?'#00B4D8':'#00FF88';
  ctx.beginPath();ctx.arc(bx,by,10,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='rgba(255,255,255,.8)';ctx.beginPath();ctx.arc(bx,by,4,0,Math.PI*2);ctx.fill();
}

ctx.fillStyle='rgba(255,255,255,.7)';ctx.font='bold 28px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
ctx.fillText(settings.bpm+' BPM',cx,cy-10);
ctx.fillStyle='rgba(255,255,255,.4)';ctx.font='14px sans-serif';
ctx.fillText(settings.ratio,cx,cy+18);

ctx.fillStyle='rgba(0,180,216,.4)';ctx.font='10px sans-serif';
ctx.fillText('BACK',cx-R+30,cy-R-5);
ctx.fillStyle='rgba(0,255,136,.4)';
ctx.fillText('DOWN',cx+R-30,cy-R-5);
}

window._v11SetRatio=function(ratio){
var s=lsGet('tempo_settings',{bpm:72,ratio:'3:1',beats:0});s.ratio=ratio;lsSet('tempo_settings',s);
showTempoTrainer();
};

window._v11ToggleTempo=function(){
if(tempoRunning){
  tempoRunning=false;
  if(tempoInterval)clearInterval(tempoInterval);tempoInterval=null;
  var s=lsGet('tempo_settings',{bpm:72,ratio:'3:1',beats:0});s.beats+=tempoBeatCount;lsSet('tempo_settings',s);
  tempoBeatCount=0;
  renderTempoCanvas(0);
  var btn=document.getElementById('v11-tp-start');if(btn)btn.innerHTML='&#x25B6; 시작';
} else {
  tempoRunning=true;tempoBeatCount=0;
  var btn2=document.getElementById('v11-tp-start');if(btn2)btn2.innerHTML='&#x23F9; 정지';
  var s2=lsGet('tempo_settings',{bpm:72,ratio:'3:1',beats:0});
  var bpm=s2.bpm;var parts=s2.ratio.split(':');
  var backR=parseFloat(parts[0]);var downR=parseFloat(parts[1]);
  var totalR=backR+downR;
  var beatMs=60000/bpm;
  var cycleDuration=beatMs*totalR;
  var startTime=Date.now();

  tempoInterval=setInterval(function(){
    if(!tempoRunning){clearInterval(tempoInterval);return}
    var elapsed=(Date.now()-startTime)%cycleDuration;
    var phase=elapsed/cycleDuration;
    renderTempoCanvas(phase);

    var backEnd=backR/totalR;
    var prevElapsed=((Date.now()-16-startTime)%cycleDuration);
    var prevPhase=prevElapsed/cycleDuration;
    if(prevPhase>0.95&&phase<0.05){playSfx('tempo_accent');tempoBeatCount++}
    else if(prevPhase<backEnd&&phase>=backEnd){playSfx('tempo_tick')}

    var beatsEl=document.getElementById('v11-tp-beats');
    if(beatsEl){var s3=lsGet('tempo_settings',{bpm:72,ratio:'3:1',beats:0});beatsEl.textContent=s3.beats+tempoBeatCount}
  },16);
}
lsSet('ach_tempo_used',true);v11CheckAch();
};

// ===== 9. SHARE CARD =====
function showShareCard(){
var pn=getPanel('share');
var html='<div class="v11-title">&#x1F4F1; 골프 성적 공유 카드</div>';
html+='<div class="v11-card" style="text-align:center">';
html+='<canvas id="v11-share-canvas" width="600" height="380" style="width:100%;height:auto;border-radius:12px;margin-bottom:12px"></canvas>';
html+='<div style="display:flex;gap:8px;justify-content:center">';
html+='<button class="v11-btn v11-btn-primary" onclick="window._v11DownloadShare()">&#x1F4E5; PNG 다운로드</button>';
html+='<button class="v11-btn" onclick="window._v11CopyShare()">&#x1F4CB; 클립보드 복사</button>';
html+='</div></div>';
pn.innerHTML='<button class="v11-close" onclick="window._v11Close(\'share\')">&times;</button>'+html;
openPanel('share');playSfx('share_capture');
setTimeout(renderShareCanvas,150);
lsSet('ach_share_used',true);v11CheckAch();
}

function renderShareCanvas(){
var canvas=document.getElementById('v11-share-canvas');if(!canvas)return;
var ctx=canvas.getContext('2d');var W=600,H=380;
ctx.clearRect(0,0,W,H);

var grad=ctx.createLinearGradient(0,0,W,H);
grad.addColorStop(0,'#0a1628');grad.addColorStop(0.5,'#0d2137');grad.addColorStop(1,'#061020');
ctx.fillStyle=grad;ctx.fillRect(0,0,W,H);

ctx.strokeStyle='rgba(0,180,216,.15)';ctx.lineWidth=1;
ctx.strokeRect(8,8,W-16,H-16);ctx.strokeRect(12,12,W-24,H-24);

ctx.fillStyle='#00FF88';ctx.font='bold 22px sans-serif';ctx.textAlign='left';
ctx.fillText('Golf Ball Tracker Pro',30,45);
ctx.fillStyle='rgba(255,255,255,.4)';ctx.font='11px sans-serif';
ctx.fillText('v11.0 | '+todayStr(),30,65);

var rounds=[];try{var r9=localStorage.getItem('gt_v9_scorecard_rounds');if(r9)rounds=JSON.parse(r9)}catch(e){}
var rangeSessions=[];try{var rs=localStorage.getItem('gt_v10_range_sessions');if(rs)rangeSessions=JSON.parse(rs)}catch(e){}
var clubData={};try{var cd=localStorage.getItem('gt_v11_club_distances');if(cd)clubData=JSON.parse(cd)}catch(e){}
var mentalData=[];try{var md=localStorage.getItem('gt_v11_mental_log');if(md)mentalData=JSON.parse(md)}catch(e){}

var stats=[
  {label:'라운드',value:rounds.length+'회',color:'#00FF88'},
  {label:'연습 세션',value:rangeSessions.length+'회',color:'#00B4D8'},
  {label:'클럽 기록',value:Object.keys(clubData).length+'종',color:'#FFC107'},
  {label:'멘탈 로그',value:mentalData.length+'회',color:'#E040FB'},
  {label:'퀴즈 문제',value:'60문',color:'#FF9800'},
  {label:'업적',value:'48개',color:'#00FF88'}
];

var cardW=160;var cardH=80;var cols=3;var startX=30;var startY=90;
for(var si=0;si<stats.length;si++){
  var row=Math.floor(si/cols);var col=si%cols;
  var x=startX+col*(cardW+20);var y=startY+row*(cardH+15);
  ctx.fillStyle='rgba(255,255,255,.03)';
  ctx.beginPath();var cr=10;
  ctx.moveTo(x+cr,y);ctx.lineTo(x+cardW-cr,y);ctx.arcTo(x+cardW,y,x+cardW,y+cr,cr);
  ctx.lineTo(x+cardW,y+cardH-cr);ctx.arcTo(x+cardW,y+cardH,x+cardW-cr,y+cardH,cr);
  ctx.lineTo(x+cr,y+cardH);ctx.arcTo(x,y+cardH,x,y+cardH-cr,cr);
  ctx.lineTo(x,y+cr);ctx.arcTo(x,y,x+cr,y,cr);ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,.06)';ctx.stroke();

  ctx.fillStyle=stats[si].color;ctx.font='bold 24px sans-serif';ctx.textAlign='center';
  ctx.fillText(stats[si].value,x+cardW/2,y+38);
  ctx.fillStyle='rgba(255,255,255,.4)';ctx.font='11px sans-serif';
  ctx.fillText(stats[si].label,x+cardW/2,y+60);
}

ctx.fillStyle='rgba(255,255,255,.2)';ctx.font='10px sans-serif';ctx.textAlign='center';
ctx.fillText('AI 프레임 디퍼런싱 골프공 궤적 추적 | bsy522-dot/golf-tracker',W/2,H-20);

ctx.fillStyle='#00B4D8';ctx.font='bold 12px sans-serif';ctx.textAlign='right';
ctx.fillText('⛳ Golf Tracker Pro v11',W-30,H-20);
}

window._v11DownloadShare=function(){
var canvas=document.getElementById('v11-share-canvas');if(!canvas)return;
var link=document.createElement('a');link.download='golf-tracker-stats-'+todayStr()+'.png';link.href=canvas.toDataURL('image/png');link.click();
showToast('PNG 다운로드 완료!');
};

window._v11CopyShare=function(){
var canvas=document.getElementById('v11-share-canvas');if(!canvas)return;
canvas.toBlob(function(blob){
  if(navigator.clipboard&&window.ClipboardItem){
    navigator.clipboard.write([new ClipboardItem({'image/png':blob})]).then(function(){showToast('클립보드에 복사!')}).catch(function(){showToast('복사 실패 - 다운로드를 사용하세요')});
  } else{showToast('클립보드 미지원 - 다운로드를 사용하세요')}
},'image/png');
};

// ===== 10. QUIZ v4 (+15 = 60 total) =====
var V11_QUIZ=[
{q:'골프에서 &quot;레이 업&quot;(Lay Up)이란?',o:['볼을 높이 띄우는 샷','위험을 피해 짧게 치는 전략','퍼팅 테크닉','벙커 샷 기법'],a:1,explain:'레이 업은 워터/벙커 등 위험을 피해 의도적으로 짧게 치는 안전 전략입니다.'},
{q:'스윙 템포의 이상적인 백스윙:다운스윙 비율은?',o:['1:1','2:1','3:1','5:1'],a:2,explain:'PGA Tour 프로들의 평균 스윙 템포 비율은 3:1 (백스윙 0.75초, 다운스윙 0.25초)입니다.'},
{q:'골프에서 &quot;스팅어&quot;(Stinger)란?',o:['높이 뜨는 샷','낮게 깊이 나가는 샷','벙커 탈출 샷','퍼팅 기술'],a:1,explain:'스팅어는 바람이 강할 때 낮은 탄도로 깊이 나가는 샷입니다. 타이거 우즈의 시그니처 샷.'},
{q:'골프 바람에서 &quot;클럽업&quot;은 언제 하나?',o:['항상','맞바람일 때만','뒷바람일 때만','측바람일 때만'],a:1,explain:'맞바람일 때 비거리가 줄어드므로 1~2클럽 올려 선택하는 것이 클럽업입니다.'},
{q:'WHS에서 핸디칡 인덱스 산출에 사용하는 라운드 수는?',o:['최근 5라운드','최근 10라운드','최근 20라운드 중 베스트 8','전체 평균'],a:2,explain:'WHS는 최근 20라운드 중 베스트 8개의 평균으로 핸디칡 인덱스를 산출합니다.'},
{q:'골프에서 &quot;캐리 디스턴스&quot;와 &quot;토탈 디스턴스&quot;의 차이는?',o:['같은 의미','캐리는 공중, 토탈은 캐리+런','토탈이 항상 짧음','바람에 따른 보정값'],a:1,explain:'캐리 디스턴스는 공중 비거리, 토탈은 캐리+런(구름) 포함 총 비거리입니다.'},
{q:'Par 5 홀에서 이글 기회를 높이려면?',o:['무조건 드라이버 최대 비거리','세컨드 샷을 그린 앞에 배치','전부 우드로 공략','퍼팅만 연습'],a:1,explain:'세캈 샷을 그린 앞 레이업 지점에 정확히 보내는 것이; 이글 기회를 높입니다.'},
{q:'골프공 딜플(dimple)의 주요 역할은?',o:['미관','공기저항 감소 + 양력 증가','볼 무게 감소','퍼팅 시 방향성'],a:1,explain:'딜플은 토할 효과로 공기저항을 줄이고 양력을 증가시켜 비거리를 2배 이상 늘립니다.'},
{q:'멘탈 게임에서 &quot;프리샷 루틴&quot;의 목적은?',o:['시간 벌기','일관성 있는 스윙 리듬 유지','상대 압박','바람 체크'],a:1,explain:'프리샷 루틴은 매 샷 전 동일한 루틴을 반복해 스윙의 일관성을 유지하는 데 목적이 있습니다.'},
{q:'골프에서 &quot;버미다; 법칙&quot;이란?',o:['그린 위;의; 잔디 방향','경사에서 볼 속도 법칙','볼을 보는 위;치; 법칙','바람 변화 법칙'],a:0,explain:'버미다; 법칙은 퍼팅 시 그린 위의 잔디 결이 경사와 함께 볼 궤적에 미치는 영향을 설명합니다.'},
{q:'골프 체력 훈련에서 가장 중요한 부위는?',o:['팔','코어(복부/허리)','다리','목'],a:1,explain:'골프 스윙에서 회전력과 안정성의 핵심은 코어 근육(복부/허리)입니다.'},
{q:'클럽 피팅에서 &quot;플렉스&quot;란?',o:['클럽 무게','샤프트 유연성','클럽 길이','그립 두께'],a:1,explain:'플렉스는 샤프트의 유연성으로, 스윙 스피드에 맞는 플렉스를 선택하는 것이 중요합니다.'},
{q:'골프에서 &quot;스트로크스 게인드&quot;(SG) 분석의 장점은?',o:['비거리만 측정','평균; 대비 영역별 실력 비교','퍼팅만 분석','바람 영향 측정'],a:1,explain:'SG 분석은 평균 플레이어 대비 각 영역(OTT/APP/ATG/PUTT)별로 얼마나 잘/못했는지를 비교합니다.'},
{q:'비 오는 날 골프에서 주의할 점은?',o:['그립 압력 강화','볼 스핀; 감소 + 비거리 손실','드라이버만 사용','퍼팅 불가'],a:1,explain:'비올 때 볼 스핀이 줄어 비거리가 10~15% 감소하고 러프에서 플라이어가 나오기 어렵습니다.'},
{q:'리커버리 샷(Recovery Shot)의 핸심 원칙은?',o:['항상 그린 공략','안전하게 페어웨이로 복귀','최대 비거리','벙커로 진행'],a:1,explain:'트러블 시 핵심은 안전하게 페어웨이로 복귀하는 것이며, 욕심부리면 더 큰 미스로 이어집니다.'}
];

function showV11Quiz(){
var pn=getPanel('v11quiz');
var qs=lsGet('v11quiz_state',{current:0,correct:0,answered:[]});
var html='<div class="v11-title">&#x1F4DD; 골프 심화 퀴즈 v4</div>';

if(qs.answered.length>=V11_QUIZ.length){
  var grade=qs.correct>=14?'S':qs.correct>=12?'A':qs.correct>=10?'B':qs.correct>=7?'C':'D';
  var gcolor=grade==='S'?'#00FF88':grade==='A'?'#00B4D8':grade==='B'?'#FFC107':'#ff6b6b';
  html+='<div class="v11-card" style="text-align:center"><div style="font-size:3em;margin-bottom:8px">&#x1F3C6;</div>';
  html+='<h3>퀴즈 완료!</h3>';
  html+='<div style="font-size:2.5em;font-weight:800;color:'+gcolor+';margin:12px 0">'+grade+'</div>';
  html+='<div style="color:#aaa">'+qs.correct+' / '+V11_QUIZ.length+' 정답</div>';
  html+='<button class="v11-btn v11-btn-primary" style="margin-top:16px" onclick="window._v11ResetQuiz()">다시 도전</button></div>';
} else {
  var qi=qs.current;var q=V11_QUIZ[qi];
  html+='<div style="text-align:center;margin-bottom:12px;color:#888;font-size:.85em">문제 '+(qi+1)+' / '+V11_QUIZ.length+' &middot; 정답 '+qs.correct+'개</div>';
  html+='<div style="display:flex;gap:3px;margin-bottom:16px">';
  for(var pi=0;pi<V11_QUIZ.length;pi++){
    var pc=pi<qs.answered.length?(qs.answered[pi]?'#00FF88':'#ff6b6b'):(pi===qi?'#00B4D8':'rgba(255,255,255,.1)');
    html+='<div style="flex:1;height:4px;background:'+pc+';border-radius:2px"></div>';
  }html+='</div>';
  html+='<div class="v11-card"><h3 style="line-height:1.5">'+q.q+'</h3></div>';
  for(var oi=0;oi<q.o.length;oi++){
    html+='<button class="v11-btn" style="width:100%;text-align:left;padding:14px 16px;margin-bottom:8px" onclick="window._v11AnswerQuiz('+oi+')">';
    html+='<span style="color:#00B4D8;font-weight:700;margin-right:8px">'+String.fromCharCode(65+oi)+'.</span> '+q.o[oi]+'</button>';
  }
}
pn.innerHTML='<button class="v11-close" onclick="window._v11Close(\'v11quiz\')">&times;</button>'+html;
openPanel('v11quiz');
}

window._v11AnswerQuiz=function(idx){
var qs=lsGet('v11quiz_state',{current:0,correct:0,answered:[]});
var q=V11_QUIZ[qs.current];var ok=idx===q.a;
qs.answered.push(ok);if(ok){qs.correct++;playSfx('v11_quiz');showToast('✅ 정답!')}
else{showToast('❌ '+q.explain)}
qs.current++;lsSet('v11quiz_state',qs);
setTimeout(function(){showV11Quiz()},800);v11CheckAch();
};
window._v11ResetQuiz=function(){lsSet('v11quiz_state',{current:0,correct:0,answered:[]});showV11Quiz()};

// ===== ACHIEVEMENTS (+12 = 48 total) =====
var V11_ACH=[
{id:'v11_wind_calc',name:'바람 마스터',desc:'바람 보정 계산기 사용',icon:'&#x1F4A8;',check:function(){return lsGet('ach_wind_used',false)}},
{id:'v11_club_10',name:'클럽 분석가',desc:'클럽 비거리 10회 기록',icon:'&#x1F4CF;',check:function(){var d=lsGet('club_distances',{});var t=0;for(var k in d)t+=d[k].length;return t>=10}},
{id:'v11_club_all',name:'풀 세트 분석',desc:'5종 이상 클럽 비거리 기록',icon:'&#x1F3CC;&#xFE0F;',check:function(){var d=lsGet('club_distances',{});return Object.keys(d).length>=5}},
{id:'v11_par_viewer',name:'Par 분석가',desc:'Par별 성적 분석 조회',icon:'&#x26F3;',check:function(){return lsGet('ach_par_viewed',false)}},
{id:'v11_mental_5',name:'멘탈 트레이너',desc:'멘탈 게임 5회 기록',icon:'&#x1F9E0;',check:function(){return lsGet('mental_log',[]).length>=5}},
{id:'v11_journal_3',name:'코스 탐험가',desc:'코스 저널 3개 작성',icon:'&#x1F4D3;',check:function(){return lsGet('course_journal',[]).length>=3}},
{id:'v11_compare',name:'비교 분석가',desc:'라운드 비교 수행',icon:'&#x1F504;',check:function(){return lsGet('ach_compare_used',false)}},
{id:'v11_goal_all',name:'주간 목표 달성',desc:'주간 목표 전체 완료',icon:'&#x1F3AF;',check:function(){var wk=weekNum();var g=lsGet('weekly_goals_'+wk,null);if(!g)return false;for(var k in g.items)if(!g.items[k].done)return false;return true}},
{id:'v11_tempo',name:'템포 트레이너',desc:'스윙 템포 트레이너 사용',icon:'&#x1F3B5;',check:function(){return lsGet('ach_tempo_used',false)}},
{id:'v11_share',name:'공유의 달인',desc:'성적 공유 카드 생성',icon:'&#x1F4F1;',check:function(){return lsGet('ach_share_used',false)}},
{id:'v11_quiz_perfect',name:'퀴즈 v4 만점',desc:'v4 퀴즈 15문제 전부 정답',icon:'&#x1F4DD;',check:function(){var qs=lsGet('v11quiz_state',{});return qs.correct>=15&&(qs.answered||[]).length>=15}},
{id:'v11_all_features',name:'v11 탐험가',desc:'v11 전체 기능 탐색',icon:'&#x1F30D;',check:function(){return lsGet('ach_wind_used',false)&&Object.keys(lsGet('club_distances',{})).length>=1&&lsGet('ach_par_viewed',false)&&lsGet('mental_log',[]).length>=1&&lsGet('course_journal',[]).length>=1&&lsGet('ach_tempo_used',false)&&lsGet('ach_share_used',false)}}
];

function v11CheckAch(){
var unlocked=lsGet('v11_achievements',[]);
for(var i=0;i<V11_ACH.length;i++){
  var ach=V11_ACH[i];
  if(unlocked.indexOf(ach.id)===-1&&ach.check()){
    unlocked.push(ach.id);lsSet('v11_achievements',unlocked);
    showV11AchPopup(ach);playSfx('v11_achieve');
  }
}
}

function showV11AchPopup(ach){
var popup=document.createElement('div');popup.className='v11-ach-popup';
popup.innerHTML='<div style="font-size:2em">'+ach.icon+'</div><div><div style="font-size:.65em;color:#00FF88;font-weight:700;letter-spacing:2px">ACHIEVEMENT</div><div style="font-weight:700">'+ach.name+'</div><div style="font-size:.8em;color:#888;margin-top:2px">'+ach.desc+'</div></div>';
document.body.appendChild(popup);
setTimeout(function(){popup.classList.add('show')},50);
setTimeout(function(){popup.classList.remove('show');setTimeout(function(){popup.remove()},500)},3500);
}

// ===== QUICK ACTIONS & KEYBOARD =====
function injectV11QuickActions(){
var existing=document.querySelector('.v11-quick-actions');if(existing)return;
var container=document.createElement('div');container.className='v11-quick-actions';
var buttons=[
  {icon:'&#x1F4A8;',title:'바람계산기 (Shift+A)',fn:'showWindCalc'},
  {icon:'&#x1F4CF;',title:'클럽비거리 (Shift+D)',fn:'showClubDist'},
  {icon:'&#x26F3;',title:'Par분석 (Shift+E)',fn:'showParPerf'},
  {icon:'&#x1F9E0;',title:'멘탈 (Shift+M)',fn:'showMental'},
  {icon:'&#x1F4D3;',title:'코스저널 (Shift+J)',fn:'showCourseJournal'},
  {icon:'&#x1F504;',title:'라운드비교 (Shift+O)',fn:'showRoundCompare'},
  {icon:'&#x1F3AF;',title:'연습목표 (Shift+G)',fn:'showGoalPlanner'},
  {icon:'&#x1F3B5;',title:'템포 (Shift+B)',fn:'showTempoTrainer'}
];
for(var i=0;i<buttons.length;i++){
  var btn=document.createElement('button');btn.className='v11-quick-btn';btn.innerHTML=buttons[i].icon;btn.title=buttons[i].title;
  btn.setAttribute('data-fn',buttons[i].fn);
  btn.addEventListener('click',function(){var fn=this.getAttribute('data-fn');if(window['_v11_'+fn])window['_v11_'+fn]()});
  container.appendChild(btn);
}
document.body.appendChild(container);
}

window._v11_showWindCalc=showWindCalc;
window._v11_showClubDist=showClubDist;
window._v11_showParPerf=showParPerf;
window._v11_showMental=showMental;
window._v11_showCourseJournal=showCourseJournal;
window._v11_showRoundCompare=showRoundCompare;
window._v11_showGoalPlanner=showGoalPlanner;
window._v11_showTempoTrainer=showTempoTrainer;
window._v11_showShareCard=showShareCard;
window._v11_showV11Quiz=showV11Quiz;
window._v11Close=function(id){closePanel(id);if(id==='tempo'&&tempoRunning){tempoRunning=false;if(tempoInterval)clearInterval(tempoInterval)}};

function setupV11Keyboard(){
document.addEventListener('keydown',function(e){
  if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'||e.target.tagName==='SELECT')return;
  if(e.ctrlKey||e.metaKey||e.altKey)return;
  if(!e.shiftKey)return;
  switch(e.key){
    case'A':e.preventDefault();showWindCalc();break;
    case'D':e.preventDefault();showClubDist();break;
    case'E':e.preventDefault();showParPerf();break;
    case'M':e.preventDefault();showMental();break;
    case'J':e.preventDefault();showCourseJournal();break;
    case'O':e.preventDefault();showRoundCompare();break;
    case'G':e.preventDefault();showGoalPlanner();break;
    case'B':e.preventDefault();showTempoTrainer();break;
  }
});
}

// ===== CSS =====
function injectV11CSS(){
var s=document.createElement('style');
s.textContent='.v11-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.88);z-index:10004;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;pointer-events:none}.v11-overlay.active{opacity:1;pointer-events:auto}.v11-panel{background:linear-gradient(145deg,rgba(10,16,26,.98),rgba(5,8,16,.98));border:1px solid rgba(0,180,216,.2);border-radius:18px;padding:24px;max-width:640px;width:94%;max-height:85vh;overflow-y:auto;box-shadow:0 24px 80px rgba(0,0,0,.7),0 0 40px rgba(0,180,216,.06);position:relative}.v11-panel::-webkit-scrollbar{width:5px}.v11-panel::-webkit-scrollbar-thumb{background:rgba(0,180,216,.2);border-radius:3px}.v11-title{font-size:1.4em;font-weight:800;color:#00B4D8;margin-bottom:18px;letter-spacing:-0.5px}.v11-close{position:absolute;top:12px;right:16px;background:none;border:none;color:#666;font-size:1.6em;cursor:pointer;padding:4px 8px;border-radius:8px;transition:all .2s;z-index:1}.v11-close:hover{color:#ff6b6b;background:rgba(255,107,107,.1)}.v11-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:16px;margin-bottom:12px;transition:all .2s}.v11-card:hover{border-color:rgba(0,180,216,.2);background:rgba(255,255,255,.05)}.v11-card h3{color:#00B4D8;font-size:.95em;margin:0 0 8px}.v11-card p{color:#aaa;font-size:.85em;margin:0;line-height:1.6}.v11-badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:.75em;font-weight:600}.v11-badge-a{background:rgba(0,255,136,.12);color:#00FF88}.v11-badge-b{background:rgba(0,180,216,.12);color:#00B4D8}.v11-btn{padding:8px 16px;border:1px solid rgba(0,180,216,.25);background:rgba(0,180,216,.08);color:#00B4D8;border-radius:8px;cursor:pointer;font-size:.85em;transition:all .2s}.v11-btn:hover{background:rgba(0,180,216,.18);border-color:#00B4D8}.v11-btn.active{background:rgba(0,255,136,.12);border-color:rgba(0,255,136,.3);color:#00FF88}.v11-btn-primary{background:rgba(0,255,136,.12);border-color:rgba(0,255,136,.3);color:#00FF88}.v11-btn-primary:hover{background:rgba(0,255,136,.22)}.v11-input{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:8px 12px;color:#fff;font-size:.85em;width:100%;box-sizing:border-box}.v11-input:focus{outline:none;border-color:rgba(0,180,216,.5)}.v11-label{display:block;font-size:.72em;color:#888;margin-bottom:3px}.v11-table{width:100%;border-collapse:collapse;font-size:.82em}.v11-table th{text-align:left;padding:8px;color:#00B4D8;border-bottom:1px solid rgba(255,255,255,.08);font-weight:600}.v11-table td{padding:8px;color:#ccc;border-bottom:1px solid rgba(255,255,255,.03)}.v11-stat-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:10px 6px;text-align:center}.v11-stat-val{font-size:1.3em;font-weight:800}.v11-stat-label{font-size:.65em;color:#888;margin-top:2px}.v11-mini-stat{background:rgba(0,180,216,.06);border-radius:8px;padding:8px;text-align:center}.v11-mini-val{font-size:1.1em;font-weight:700;color:#00B4D8}.v11-mini-label{font-size:.65em;color:#888}.v11-quick-actions{position:fixed;bottom:80px;left:16px;display:flex;flex-direction:column;gap:7px;z-index:999}.v11-quick-btn{width:42px;height:42px;border-radius:11px;border:1px solid rgba(0,180,216,.15);background:rgba(5,8,16,.92);color:#00B4D8;font-size:1.1em;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;backdrop-filter:blur(12px)}.v11-quick-btn:hover{background:rgba(0,180,216,.1);transform:scale(1.08);box-shadow:0 4px 16px rgba(0,180,216,.12)}.v11-toast{position:fixed;top:20px;left:50%;transform:translateX(-50%) translateY(-100px);background:rgba(0,255,136,.1);border:1px solid rgba(0,255,136,.2);color:#00FF88;padding:10px 20px;border-radius:10px;z-index:99999;transition:transform .4s;font-size:.9em;backdrop-filter:blur(12px);white-space:nowrap}.v11-toast.show{transform:translateX(-50%) translateY(0)}.v11-ach-popup{position:fixed;top:60px;left:50%;transform:translateX(-50%) translateY(-150px);z-index:100000;background:linear-gradient(135deg,rgba(10,16,26,.96),rgba(20,28,38,.96));border:1px solid rgba(0,180,216,.3);border-radius:16px;padding:14px 22px;display:flex;align-items:center;gap:14px;backdrop-filter:blur(20px);transition:transform .5s cubic-bezier(.34,1.56,.64,1);box-shadow:0 8px 32px rgba(0,0,0,.5),0 0 24px rgba(0,180,216,.1)}.v11-ach-popup.show{transform:translateX(-50%) translateY(0)}@media(max-width:480px){.v11-panel{padding:16px;max-height:92vh;width:96%}.v11-quick-actions{bottom:70px;left:8px}.v11-quick-btn{width:36px;height:36px;font-size:.95em}}';
document.head.appendChild(s);
}

// ===== INIT =====
function initV11(){
injectV11CSS();
injectV11QuickActions();
setupV11Keyboard();
setTimeout(v11CheckAch,3000);
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',initV11)}
else{setTimeout(initV11,1800)}

})();
