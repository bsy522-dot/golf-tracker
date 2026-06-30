(function(){
'use strict';
var LS='gt_v14_';
var audioCtx=null;
function getAC(){if(!audioCtx)try{audioCtx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}return audioCtx}
function playSfx(type){var ac=getAC();if(!ac)return;var o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);var t=ac.currentTime;g.gain.setValueAtTime(0.1,t);switch(type){case'shotshape_open':o.type='sine';o.frequency.setValueAtTime(392,t);o.frequency.linearRampToValueAtTime(523,t+0.08);o.frequency.linearRampToValueAtTime(659,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'shotshape_record':o.type='triangle';o.frequency.setValueAtTime(494,t);o.frequency.linearRampToValueAtTime(659,t+0.08);g.gain.setValueAtTime(0.08,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.18);o.start(t);o.stop(t+0.18);break;case'caddie_open':o.type='sine';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(659,t+0.1);o.frequency.linearRampToValueAtTime(784,t+0.2);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'caddie_recommend':o.type='sine';o.frequency.setValueAtTime(659,t);o.frequency.linearRampToValueAtTime(880,t+0.08);o.frequency.linearRampToValueAtTime(1047,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'tournament_start':o.type='sine';o.frequency.setValueAtTime(392,t);o.frequency.setValueAtTime(494,t+0.08);o.frequency.setValueAtTime(587,t+0.16);o.frequency.setValueAtTime(784,t+0.24);g.gain.exponentialRampToValueAtTime(0.01,t+0.4);o.start(t);o.stop(t+0.4);break;case'tournament_record':o.type='triangle';o.frequency.setValueAtTime(587,t);o.frequency.linearRampToValueAtTime(784,t+0.1);g.gain.setValueAtTime(0.08,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.2);o.start(t);o.stop(t+0.2);break;case'report_gen':o.type='sine';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(554,t+0.08);o.frequency.linearRampToValueAtTime(659,t+0.16);o.frequency.linearRampToValueAtTime(880,t+0.24);g.gain.exponentialRampToValueAtTime(0.01,t+0.4);o.start(t);o.stop(t+0.4);break;case'trend_open':o.type='sine';o.frequency.setValueAtTime(349,t);o.frequency.linearRampToValueAtTime(440,t+0.1);o.frequency.linearRampToValueAtTime(523,t+0.2);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'practice_log':o.type='triangle';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(587,t+0.08);g.gain.setValueAtTime(0.08,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.2);o.start(t);o.stop(t+0.2);break;case'flyover_open':o.type='sine';o.frequency.setValueAtTime(494,t);o.frequency.linearRampToValueAtTime(659,t+0.12);o.frequency.linearRampToValueAtTime(880,t+0.24);g.gain.exponentialRampToValueAtTime(0.01,t+0.4);o.start(t);o.stop(t+0.4);break;case'fitness_open':o.type='sine';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(698,t+0.1);o.frequency.linearRampToValueAtTime(880,t+0.2);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'v14_achieve':o.type='sine';o.frequency.setValueAtTime(784,t);o.frequency.setValueAtTime(988,t+0.1);o.frequency.setValueAtTime(1175,t+0.2);o.frequency.setValueAtTime(1568,t+0.3);g.gain.exponentialRampToValueAtTime(0.01,t+0.5);o.start(t);o.stop(t+0.5);break;default:o.type='sine';o.frequency.setValueAtTime(440,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.15);o.start(t);o.stop(t+0.15)}}

function lsGet(k,d){try{var v=localStorage.getItem(LS+k);return v?JSON.parse(v):d}catch(e){return d}}
function lsSet(k,v){try{localStorage.setItem(LS+k,JSON.stringify(v))}catch(e){}}
function todayStr(){return new Date().toISOString().slice(0,10)}
function showToast(msg){var t=document.createElement('div');t.className='v14-toast';t.textContent=msg;document.body.appendChild(t);setTimeout(function(){t.classList.add('show')},50);setTimeout(function(){t.classList.remove('show');setTimeout(function(){t.remove()},400)},3000)}
function createOverlay(id){var ov=document.createElement('div');ov.className='v14-overlay';ov.id='v14-'+id;ov.addEventListener('click',function(e){if(e.target===ov)closePanel(id)});var pn=document.createElement('div');pn.className='v14-panel';pn.style.position='relative';ov.appendChild(pn);return pn}
function openPanel(id){var el=document.getElementById('v14-'+id);if(el)el.classList.add('active')}
function closePanel(id){var el=document.getElementById('v14-'+id);if(el)el.classList.remove('active')}
function getPanel(id){var ov=document.getElementById('v14-'+id);if(!ov){var pn=createOverlay(id);pn.id='v14-'+id+'-panel';document.body.appendChild(pn.parentElement);return pn}return ov.querySelector('.v14-panel')||ov}

// ===== 1. SHOT SHAPE ANALYZER Canvas =====
var SHOT_SHAPES=[
{name:'스트레이트',desc:'일직선 비행',color:'#00FF88',curve:0},
{name:'페이드',desc:'좌→우 약간 휘는 샷 (우타 기준)',color:'#00B4D8',curve:0.3},
{name:'드로우',desc:'우→좌 약간 휘는 샷',color:'#FFB800',curve:-0.3},
{name:'슬라이스',desc:'좌→우 크게 휘는 미스샷',color:'#ff6b6b',curve:0.7},
{name:'훅',desc:'우→좌 크게 휘는 미스샷',color:'#cc3333',curve:-0.7},
{name:'푸쉬',desc:'오른쪽으로 직선 출발',color:'#E8A87C',curve:0.15},
{name:'풀',desc:'왼쪽으로 직선 출발',color:'#C38D9E',curve:-0.15},
{name:'푸쉬페이드',desc:'우측 출발 후 우로 더 휘는 샷',color:'#FF6F61',curve:0.5},
{name:'풀훅',desc:'좌측 출발 후 좌로 더 휘는 샷',color:'#9B59B6',curve:-0.5},
{name:'로우펀치',desc:'낮은 탄도 컨트롤 샷',color:'#1ABC9C',curve:0.05}
];

function showShotShapeAnalyzer(){
var pn=getPanel('shotshape');
var records=lsGet('shotshape_records',[]);
var html='<div class="v14-title">&#x1F3CC;&#xFE0F; 샷 셰이프 분석기</div>';

html+='<div class="v14-card"><h3>샷 기록</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v14-label">클럽</label><select id="v14-ss-club" class="v14-input"><option>드라이버</option><option>3W</option><option>5W</option><option>4I</option><option>5I</option><option>6I</option><option>7I</option><option>8I</option><option>9I</option><option>PW</option><option>AW</option><option>SW</option><option>LW</option></select></div>';
html+='<div><label class="v14-label">샷 셰이프</label><select id="v14-ss-shape" class="v14-input">';
for(var s=0;s<SHOT_SHAPES.length;s++) html+='<option value="'+s+'">'+SHOT_SHAPES[s].name+'</option>';
html+='</select></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:6px">';
html+='<div><label class="v14-label">비거리(yd)</label><input id="v14-ss-dist" class="v14-input" type="number" min="50" max="350" value="200"></div>';
html+='<div><label class="v14-label">탄도 높이</label><select id="v14-ss-traj" class="v14-input"><option>낮음</option><option>중간</option><option>높음</option></select></div>';
html+='<div><label class="v14-label">결과</label><select id="v14-ss-result" class="v14-input"><option>페어웨이</option><option>그린</option><option>러프</option><option>벙커</option><option>OB</option></select></div>';
html+='</div>';
html+='<button class="v14-btn v14-btn-primary" style="width:100%;margin-top:10px" onclick="window._v14RecordShape()">샷 기록 저장</button></div>';

html+='<canvas id="v14-shotshape-canvas" width="600" height="380" style="width:100%;max-width:600px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

var counts={};
for(var i=0;i<records.length;i++){
  var sn=SHOT_SHAPES[records[i].shape]?SHOT_SHAPES[records[i].shape].name:'기타';
  counts[sn]=(counts[sn]||0)+1;
}
html+='<div class="v14-card"><h3>샷 셰이프 분포 (총 '+records.length+'샷)</h3>';
if(records.length>0){
  html+='<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-top:8px">';
  for(var j=0;j<SHOT_SHAPES.length;j++){
    var cnt=counts[SHOT_SHAPES[j].name]||0;
    var pct=records.length>0?Math.round(cnt/records.length*100):0;
    html+='<div class="v14-stat-card"><div class="v14-stat-val" style="color:'+SHOT_SHAPES[j].color+';font-size:1em">'+pct+'%</div><div class="v14-stat-label">'+SHOT_SHAPES[j].name+'</div></div>';
  }
  html+='</div>';
} else { html+='<p style="color:#888;font-size:.85em">아직 기록이 없습니다.</p>'; }
html+='</div>';

html+='<div class="v14-card"><h3>&#x1F4D6; 샷 셰이프 가이드</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">';
for(var k=0;k<SHOT_SHAPES.length;k++){
  html+='<div style="padding:6px;border-left:3px solid '+SHOT_SHAPES[k].color+';background:rgba(255,255,255,.02);border-radius:0 6px 6px 0"><div style="font-weight:700;font-size:.85em;color:'+SHOT_SHAPES[k].color+'">'+SHOT_SHAPES[k].name+'</div><div style="font-size:.72em;color:#888">'+SHOT_SHAPES[k].desc+'</div></div>';
}
html+='</div></div>';

pn.innerHTML='<button class="v14-close" onclick="window._v14Close(\'shotshape\')">&times;</button>'+html;
openPanel('shotshape');playSfx('shotshape_open');
setTimeout(function(){renderShotShapeCanvas(records)},120);
v14CheckAch();lsSet('ach_shotshape_viewed',true);
}

window._v14RecordShape=function(){
var club=document.getElementById('v14-ss-club').value;
var shape=parseInt(document.getElementById('v14-ss-shape').value);
var dist=parseInt(document.getElementById('v14-ss-dist').value)||200;
var traj=document.getElementById('v14-ss-traj').value;
var result=document.getElementById('v14-ss-result').value;
var records=lsGet('shotshape_records',[]);
records.push({club:club,shape:shape,dist:dist,traj:traj,result:result,date:todayStr()});
if(records.length>200)records=records.slice(-200);
lsSet('shotshape_records',records);
playSfx('shotshape_record');showToast(club+' '+SHOT_SHAPES[shape].name+' '+dist+'yd 기록!');
closePanel('shotshape');setTimeout(showShotShapeAnalyzer,200);
};

function renderShotShapeCanvas(records){
var canvas=document.getElementById('v14-shotshape-canvas');if(!canvas)return;
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a1020';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00B4D8';ctx.font='bold 13px sans-serif';ctx.textAlign='left';
ctx.fillText('Shot Shape Trajectory Map',12,22);

var startX=W/2,startY=H-40;
ctx.strokeStyle='rgba(255,255,255,.1)';ctx.lineWidth=1;
for(var g=1;g<=5;g++){
  ctx.beginPath();ctx.arc(startX,startY,g*55,Math.PI,Math.PI*2);ctx.stroke();
  ctx.fillStyle='#444';ctx.font='9px sans-serif';ctx.textAlign='center';
  ctx.fillText((g*50)+'yd',startX,startY-g*55-4);
}

ctx.strokeStyle='rgba(255,255,255,.15)';ctx.setLineDash([4,4]);
ctx.beginPath();ctx.moveTo(startX,startY);ctx.lineTo(startX,30);ctx.stroke();
ctx.setLineDash([]);

ctx.fillStyle='#333';ctx.font='10px sans-serif';ctx.textAlign='center';
ctx.fillText('Target Line',startX,28);

if(records.length===0){
  ctx.fillStyle='#555';ctx.font='14px sans-serif';ctx.textAlign='center';
  ctx.fillText('샷을 기록하면 궤적이 표시됩니다',W/2,H/2);
  return;
}

var recent=records.slice(-30);
for(var i=0;i<recent.length;i++){
  var r=recent[i];
  var sh=SHOT_SHAPES[r.shape]||SHOT_SHAPES[0];
  var maxDist=300;
  var normDist=Math.min(r.dist/maxDist,1);
  var endY=startY-normDist*(H-80);
  var curveX=sh.curve*normDist*120;
  var midY=(startY+endY)/2;
  var cpX=startX+curveX*0.6;
  var endX=startX+curveX;

  ctx.strokeStyle=sh.color+'99';ctx.lineWidth=1.5;
  ctx.beginPath();ctx.moveTo(startX,startY);
  ctx.quadraticCurveTo(cpX,midY,endX,endY);ctx.stroke();

  ctx.beginPath();ctx.arc(endX,endY,3,0,Math.PI*2);
  ctx.fillStyle=sh.color;ctx.fill();
}

ctx.fillStyle='#fff';ctx.font='bold 10px sans-serif';ctx.textAlign='left';
ctx.fillText('최근 '+recent.length+'샷 궤적',12,H-10);

var legend=[{n:'페이드',c:'#00B4D8'},{n:'드로우',c:'#FFB800'},{n:'스트레이트',c:'#00FF88'},{n:'슬라이스',c:'#ff6b6b'}];
for(var l=0;l<legend.length;l++){
  ctx.fillStyle=legend[l].c;ctx.fillText('● '+legend[l].n,W-180+l*45,H-10);
}
}

// ===== 2. SMART CADDIE GPS SIMULATOR Canvas =====
var HOLE_TEMPLATES=[
{par:4,dist:380,name:'1번홀',hazards:[{type:'벙커',x:0.45,y:0.35,r:12},{type:'벙커',x:0.6,y:0.2,r:10}],green:{x:0.5,y:0.08,r:18},fairway:{x:0.5,w:0.2}},
{par:3,dist:165,name:'2번홀',hazards:[{type:'벙커',x:0.35,y:0.15,r:14},{type:'워터',x:0.65,y:0.25,r:16}],green:{x:0.5,y:0.1,r:20},fairway:{x:0.5,w:0.15}},
{par:5,dist:520,name:'3번홀',hazards:[{type:'벙커',x:0.3,y:0.55,r:10},{type:'워터',x:0.7,y:0.35,r:20},{type:'벙커',x:0.55,y:0.12,r:12}],green:{x:0.5,y:0.06,r:16},fairway:{x:0.5,w:0.18}},
{par:4,dist:410,name:'4번홀',hazards:[{type:'벙커',x:0.35,y:0.4,r:11},{type:'벙커',x:0.62,y:0.15,r:13}],green:{x:0.48,y:0.08,r:17},fairway:{x:0.48,w:0.2}},
{par:4,dist:350,name:'5번홀',hazards:[{type:'워터',x:0.55,y:0.45,r:18},{type:'벙커',x:0.4,y:0.12,r:10}],green:{x:0.52,y:0.07,r:19},fairway:{x:0.52,w:0.22}},
{par:3,dist:185,name:'6번홀',hazards:[{type:'벙커',x:0.3,y:0.12,r:13},{type:'벙커',x:0.68,y:0.18,r:11}],green:{x:0.5,y:0.1,r:22},fairway:{x:0.5,w:0.16}},
{par:5,dist:545,name:'7번홀',hazards:[{type:'워터',x:0.4,y:0.5,r:22},{type:'벙커',x:0.6,y:0.3,r:12},{type:'벙커',x:0.42,y:0.08,r:10}],green:{x:0.5,y:0.06,r:15},fairway:{x:0.5,w:0.19}},
{par:4,dist:395,name:'8번홀',hazards:[{type:'벙커',x:0.55,y:0.35,r:12},{type:'워터',x:0.3,y:0.2,r:15}],green:{x:0.5,y:0.08,r:18},fairway:{x:0.5,w:0.2}},
{par:4,dist:425,name:'9번홀',hazards:[{type:'벙커',x:0.38,y:0.45,r:14},{type:'벙커',x:0.62,y:0.25,r:11},{type:'벙커',x:0.45,y:0.1,r:12}],green:{x:0.5,y:0.07,r:17},fairway:{x:0.5,w:0.18}}
];

function showSmartCaddie(){
var pn=getPanel('caddie2');
var holeIdx=lsGet('caddie_hole',0);
var hole=HOLE_TEMPLATES[holeIdx%HOLE_TEMPLATES.length];
var html='<div class="v14-title">&#x26F3; 스마트 캐디 GPS</div>';

html+='<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px">';
for(var h=0;h<HOLE_TEMPLATES.length;h++){
  var cls=h===holeIdx?'v14-btn active':'v14-btn';
  html+='<button class="'+cls+'" onclick="window._v14CaddieHole('+h+')" style="min-width:42px">'+HOLE_TEMPLATES[h].name.replace('번홀','')+'H</button>';
}
html+='</div>';

html+='<canvas id="v14-caddie-canvas" width="560" height="400" style="width:100%;max-width:560px;height:auto;display:block;margin:0 auto 12px;border-radius:12px"></canvas>';

html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">';
html+='<div class="v14-stat-card"><div class="v14-stat-val" style="color:#00FF88;font-size:1.3em">'+hole.dist+'</div><div class="v14-stat-label">거리(yd)</div></div>';
html+='<div class="v14-stat-card"><div class="v14-stat-val" style="color:#00B4D8;font-size:1.3em">Par '+hole.par+'</div><div class="v14-stat-label">파</div></div>';
var frontDist=Math.round(hole.dist*0.92);var backDist=Math.round(hole.dist*1.05);
html+='<div class="v14-stat-card"><div class="v14-stat-val" style="color:#FFB800;font-size:1em">F'+frontDist+'</div><div class="v14-stat-label">그린 앞</div></div>';
html+='<div class="v14-stat-card"><div class="v14-stat-val" style="color:#ff6b6b;font-size:1em">B'+backDist+'</div><div class="v14-stat-label">그린 뒤</div></div>';
html+='</div>';

html+='<div class="v14-card"><h3>&#x1F4A1; AI 캐디 추천</h3>';
var clubRec=getClubRecommendation(hole);
html+='<div style="display:grid;gap:6px">';
for(var c=0;c<clubRec.length;c++){
  html+='<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:rgba(0,255,136,.04);border-radius:8px;border-left:3px solid '+clubRec[c].color+'">';
  html+='<div><span style="font-weight:700;color:'+clubRec[c].color+'">'+clubRec[c].shot+'</span><span style="color:#888;font-size:.8em;margin-left:8px">'+clubRec[c].club+'</span></div>';
  html+='<div style="color:#ccc;font-size:.85em">'+clubRec[c].dist+'yd</div></div>';
}
html+='</div>';
html+='<p style="color:#666;font-size:.72em;margin-top:8px">* 해저드 회피 + 평균 비거리 기반 추천</p></div>';

html+='<div class="v14-card"><h3>&#x26A0;&#xFE0F; 해저드 정보</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">';
for(var hz=0;hz<hole.hazards.length;hz++){
  var haz=hole.hazards[hz];
  var hazDist=Math.round(hole.dist*(1-haz.y));
  var side=haz.x<0.45?'좌측':haz.x>0.55?'우측':'중앙';
  var hazColor=haz.type==='워터'?'#00B4D8':'#FFB800';
  html+='<div style="padding:8px;border:1px solid '+hazColor+'33;border-radius:8px;background:'+hazColor+'08"><span style="color:'+hazColor+';font-weight:700">'+(haz.type==='워터'?'&#x1F4A7;':'&#x1F3D6;&#xFE0F;')+' '+haz.type+'</span><span style="color:#888;font-size:.8em;margin-left:6px">'+side+' '+hazDist+'yd</span></div>';
}
html+='</div></div>';

pn.innerHTML='<button class="v14-close" onclick="window._v14Close(\'caddie2\')">&times;</button>'+html;
openPanel('caddie2');playSfx('caddie_open');
setTimeout(function(){renderCaddieCanvas(hole)},120);
v14CheckAch();lsSet('ach_caddie2_viewed',true);
}

function getClubRecommendation(hole){
var recs=[];
if(hole.par===3){
  recs.push({shot:'티샷 (그린 공략)',club:hole.dist<170?'7I':hole.dist<190?'5I':'3W',dist:hole.dist,color:'#00FF88'});
  recs.push({shot:'안전 공략',club:hole.dist<170?'8I':'6I',dist:Math.round(hole.dist*0.9),color:'#FFB800'});
} else if(hole.par===4){
  recs.push({shot:'1st 드라이버',club:'DR',dist:Math.min(280,Math.round(hole.dist*0.65)),color:'#00FF88'});
  var remain=hole.dist-Math.min(280,Math.round(hole.dist*0.65));
  recs.push({shot:'2nd 어프로치',club:remain<130?'PW':remain<150?'9I':remain<170?'7I':'5I',dist:remain,color:'#00B4D8'});
  if(hole.hazards.length>1)recs.push({shot:'안전루트',club:'3W',dist:230,color:'#FFB800'});
} else {
  recs.push({shot:'1st 드라이버',club:'DR',dist:280,color:'#00FF88'});
  recs.push({shot:'2nd 레이업',club:'3W',dist:220,color:'#00B4D8'});
  var remain3=hole.dist-500;if(remain3<0)remain3=hole.dist-480;
  recs.push({shot:'3rd 어프로치',club:Math.abs(remain3)<100?'PW':'8I',dist:Math.max(80,Math.abs(remain3)),color:'#FFB800'});
}
return recs;
}

window._v14CaddieHole=function(idx){lsSet('caddie_hole',idx);closePanel('caddie2');setTimeout(showSmartCaddie,150)};

function renderCaddieCanvas(hole){
var canvas=document.getElementById('v14-caddie-canvas');if(!canvas)return;
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;

ctx.fillStyle='#0c2810';ctx.fillRect(0,0,W,H);

var fwLeft=W*(hole.fairway.x-hole.fairway.w);
var fwRight=W*(hole.fairway.x+hole.fairway.w);
var grad=ctx.createLinearGradient(fwLeft,0,fwRight,0);
grad.addColorStop(0,'#1a4a1a');grad.addColorStop(0.5,'#2a6a2a');grad.addColorStop(1,'#1a4a1a');
ctx.fillStyle=grad;
ctx.beginPath();ctx.moveTo(fwLeft+20,H-30);ctx.lineTo(fwLeft-10,40);ctx.lineTo(fwRight+10,40);ctx.lineTo(fwRight-20,H-30);ctx.closePath();ctx.fill();

ctx.strokeStyle='rgba(255,255,255,.08)';ctx.lineWidth=1;ctx.setLineDash([8,8]);
for(var y=1;y<=5;y++){
  var yy=H-30-(y*(H-80)/5);
  ctx.beginPath();ctx.moveTo(40,yy);ctx.lineTo(W-40,yy);ctx.stroke();
  ctx.fillStyle='#555';ctx.font='9px sans-serif';ctx.textAlign='right';
  ctx.fillText(Math.round(hole.dist*y/5)+'yd',38,yy+3);
}
ctx.setLineDash([]);

for(var hz=0;hz<hole.hazards.length;hz++){
  var haz=hole.hazards[hz];
  var hx=W*haz.x;var hy=H-30-(1-haz.y)*(H-80);
  if(haz.type==='워터'){
    ctx.fillStyle='rgba(0,180,216,.25)';ctx.strokeStyle='rgba(0,180,216,.5)';
  } else {
    ctx.fillStyle='rgba(255,184,0,.2)';ctx.strokeStyle='rgba(255,184,0,.4)';
  }
  ctx.lineWidth=1.5;
  ctx.beginPath();ctx.arc(hx,hy,haz.r,0,Math.PI*2);ctx.fill();ctx.stroke();
  ctx.fillStyle=haz.type==='워터'?'#00B4D8':'#FFB800';ctx.font='bold 8px sans-serif';ctx.textAlign='center';
  ctx.fillText(haz.type,hx,hy+3);
}

var gx=W*hole.green.x;var gy=H-30-(1-hole.green.y)*(H-80);
ctx.fillStyle='rgba(0,255,136,.15)';ctx.strokeStyle='rgba(0,255,136,.4)';ctx.lineWidth=2;
ctx.beginPath();ctx.ellipse(gx,gy,hole.green.r+8,hole.green.r,0,0,Math.PI*2);ctx.fill();ctx.stroke();
ctx.fillStyle='#00FF88';ctx.font='bold 10px sans-serif';ctx.textAlign='center';
ctx.fillText('GREEN',gx,gy+4);
ctx.fillStyle='#ff4444';ctx.beginPath();ctx.arc(gx,gy-4,3,0,Math.PI*2);ctx.fill();

ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(W/2,H-25,5,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#aaa';ctx.font='9px sans-serif';ctx.textAlign='center';
ctx.fillText('TEE',W/2,H-12);

ctx.strokeStyle='rgba(0,255,136,.3)';ctx.lineWidth=1;ctx.setLineDash([4,4]);
ctx.beginPath();ctx.moveTo(W/2,H-25);ctx.lineTo(gx,gy);ctx.stroke();
ctx.setLineDash([]);

ctx.fillStyle='#00B4D8';ctx.font='bold 13px sans-serif';ctx.textAlign='left';
ctx.fillText(hole.name+' | Par '+hole.par+' | '+hole.dist+'yd',12,22);
ctx.fillStyle='#888';ctx.font='10px sans-serif';
ctx.fillText('Smart Caddie GPS View',12,38);
}

// ===== 3. TOURNAMENT MODE =====
function showTournamentMode(){
var pn=getPanel('tournament');
var tourneys=lsGet('tournaments',[]);
var active=lsGet('active_tourney',null);
var html='<div class="v14-title">&#x1F3C6; 토너먼트 모드</div>';

if(!active){
  html+='<div class="v14-card"><h3>새 토너먼트 생성</h3>';
  html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
  html+='<div><label class="v14-label">대회명</label><input id="v14-tn-name" class="v14-input" value="" placeholder="예: 주말 친선전"></div>';
  html+='<div><label class="v14-label">날짜</label><input id="v14-tn-date" class="v14-input" type="date" value="'+todayStr()+'"></div>';
  html+='</div>';
  html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:6px">';
  html+='<div><label class="v14-label">스코어링</label><select id="v14-tn-scoring" class="v14-input"><option value="stroke">스트로크</option><option value="stableford">스테이블포드</option><option value="match">매치 플레이</option></select></div>';
  html+='<div><label class="v14-label">참가자 수</label><input id="v14-tn-players" class="v14-input" type="number" min="2" max="8" value="4"></div>';
  html+='<div><label class="v14-label">핸디캡 적용</label><select id="v14-tn-hc" class="v14-input"><option value="gross">그로스</option><option value="net">네트</option></select></div>';
  html+='</div>';
  html+='<button class="v14-btn v14-btn-primary" style="width:100%;margin-top:10px" onclick="window._v14CreateTourney()">토너먼트 시작</button></div>';
} else {
  html+='<div class="v14-card" style="border-color:rgba(0,255,136,.3)"><h3 style="display:flex;justify-content:space-between;align-items:center">'+active.name+' <span class="v14-badge" style="background:rgba(0,255,136,.1);color:#00FF88;font-size:.7em">진행중</span></h3>';
  html+='<p style="color:#888;font-size:.8em">'+active.date+' | '+active.scoring+' | '+(active.hcType==='net'?'네트':'그로스')+'</p>';

  html+='<table class="v14-table" style="margin-top:10px"><tr><th>#</th><th>선수</th>';
  for(var h=1;h<=9;h++) html+='<th>'+h+'</th>';
  html+='<th>OUT</th><th>점수</th></tr>';

  for(var p=0;p<active.players.length;p++){
    var player=active.players[p];
    var outTotal=0;
    html+='<tr><td>'+(p+1)+'</td><td style="color:#00FF88;font-weight:700">'+player.name+'</td>';
    for(var hole=0;hole<9;hole++){
      var sc=player.scores[hole]||0;outTotal+=sc;
      var pars=[4,4,3,5,4,3,4,5,4];var diff=sc-pars[hole];
      var scColor=diff<0?'#00FF88':diff===0?'#ccc':diff===1?'#FFB800':'#ff6b6b';
      html+='<td><input class="v14-input" type="number" min="1" max="12" value="'+(sc||'')+'" style="width:32px;padding:3px;text-align:center;font-size:.8em;color:'+scColor+'" onchange="window._v14UpdateScore('+p+','+hole+',this.value)"></td>';
    }
    html+='<td style="font-weight:700;color:#00B4D8">'+outTotal+'</td>';
    var totalScore=0;for(var ts=0;ts<player.scores.length;ts++)totalScore+=player.scores[ts];
    html+='<td style="font-weight:700;color:#00FF88">'+totalScore+'</td></tr>';
  }
  html+='</table>';

  html+='<div style="display:flex;gap:8px;margin-top:12px">';
  html+='<button class="v14-btn v14-btn-primary" style="flex:1" onclick="window._v14FinishTourney()">토너먼트 종료</button>';
  html+='<button class="v14-btn" style="flex:1" onclick="window._v14CancelTourney()">취소</button>';
  html+='</div></div>';
}

if(tourneys.length>0){
  html+='<div class="v14-card"><h3>&#x1F4CB; 토너먼트 이력 ('+tourneys.length+'회)</h3>';
  html+='<table class="v14-table"><tr><th>날짜</th><th>대회명</th><th>우승자</th><th>스코어</th></tr>';
  var recent=tourneys.slice(-5).reverse();
  for(var t=0;t<recent.length;t++){
    var tn=recent[t];
    html+='<tr><td>'+tn.date+'</td><td>'+tn.name+'</td><td style="color:#FFD700;font-weight:700">'+tn.winner+'</td><td style="color:#00FF88">'+tn.winScore+'</td></tr>';
  }
  html+='</table></div>';
}

pn.innerHTML='<button class="v14-close" onclick="window._v14Close(\'tournament\')">&times;</button>'+html;
openPanel('tournament');playSfx('tournament_start');
v14CheckAch();lsSet('ach_tourney_viewed',true);
}

window._v14CreateTourney=function(){
var name=document.getElementById('v14-tn-name').value||'Tournament';
var date=document.getElementById('v14-tn-date').value||todayStr();
var scoring=document.getElementById('v14-tn-scoring').value;
var numPlayers=parseInt(document.getElementById('v14-tn-players').value)||4;
var hcType=document.getElementById('v14-tn-hc').value;
var players=[];
var names=['나','Player B','Player C','Player D','Player E','Player F','Player G','Player H'];
for(var i=0;i<numPlayers;i++){
  players.push({name:names[i]||'P'+(i+1),scores:new Array(18).fill(0),handicap:0});
}
lsSet('active_tourney',{name:name,date:date,scoring:scoring,hcType:hcType,players:players});
playSfx('tournament_start');showToast('토너먼트 시작!');
closePanel('tournament');setTimeout(showTournamentMode,200);
};

window._v14UpdateScore=function(playerIdx,holeIdx,val){
var active=lsGet('active_tourney',null);if(!active)return;
active.players[playerIdx].scores[holeIdx]=parseInt(val)||0;
lsSet('active_tourney',active);
};

window._v14FinishTourney=function(){
var active=lsGet('active_tourney',null);if(!active)return;
var best=null,bestScore=9999;
for(var i=0;i<active.players.length;i++){
  var total=0;for(var j=0;j<active.players[i].scores.length;j++)total+=active.players[i].scores[j];
  if(total>0&&total<bestScore){bestScore=total;best=active.players[i].name}
}
var tourneys=lsGet('tournaments',[]);
tourneys.push({name:active.name,date:active.date,scoring:active.scoring,winner:best||'N/A',winScore:bestScore<9999?bestScore:'--'});
if(tourneys.length>20)tourneys=tourneys.slice(-20);
lsSet('tournaments',tourneys);lsSet('active_tourney',null);
playSfx('tournament_record');showToast('토너먼트 종료! 우승: '+(best||'N/A'));
closePanel('tournament');setTimeout(showTournamentMode,200);
};

window._v14CancelTourney=function(){
if(confirm('토너먼트를 취소하시겠습니까?')){lsSet('active_tourney',null);closePanel('tournament');setTimeout(showTournamentMode,200)}
};

// ===== 4. POST-ROUND REPORT GENERATOR Canvas PNG =====
function showReportGenerator(){
var pn=getPanel('report');
var html='<div class="v14-title">&#x1F4CA; 포스트라운드 리포트</div>';

html+='<canvas id="v14-report-canvas" width="600" height="440" style="width:100%;max-width:600px;height:auto;display:block;margin:12px auto;border-radius:12px;cursor:pointer"></canvas>';

html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">';
html+='<button class="v14-btn v14-btn-primary" onclick="window._v14DownloadReport()">&#x1F4E5; PNG 다운로드</button>';
html+='<button class="v14-btn" onclick="window._v14CopyReport()">&#x1F4CB; 클립보드 복사</button>';
html+='</div>';

html+='<div class="v14-card" style="margin-top:12px"><h3>&#x1F4D6; 리포트 요약</h3>';
html+='<p style="color:#888;font-size:.85em">모든 기록 데이터를 종합한 라운드 성적표입니다. PNG로 저장하여 공유하세요.</p></div>';

pn.innerHTML='<button class="v14-close" onclick="window._v14Close(\'report\')">&times;</button>'+html;
openPanel('report');playSfx('report_gen');
setTimeout(renderReportCanvas,120);
v14CheckAch();lsSet('ach_report_gen',true);
}

function renderReportCanvas(){
var canvas=document.getElementById('v14-report-canvas');if(!canvas)return;
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;

var grad=ctx.createLinearGradient(0,0,W,H);
grad.addColorStop(0,'#0a1628');grad.addColorStop(0.5,'#0c2218');grad.addColorStop(1,'#0a1020');
ctx.fillStyle=grad;ctx.fillRect(0,0,W,H);

ctx.strokeStyle='rgba(0,255,136,.15)';ctx.lineWidth=2;
ctx.strokeRect(8,8,W-16,H-16);
ctx.strokeStyle='rgba(0,255,136,.08)';ctx.lineWidth=1;
ctx.strokeRect(12,12,W-24,H-24);

ctx.fillStyle='#00FF88';ctx.font='bold 22px sans-serif';ctx.textAlign='center';
ctx.fillText('GOLF TRACKER PRO',W/2,42);
ctx.fillStyle='#888';ctx.font='12px sans-serif';
ctx.fillText('Post-Round Performance Report',W/2,62);
ctx.fillText(todayStr(),W/2,78);

ctx.beginPath();ctx.moveTo(40,90);ctx.lineTo(W-40,90);ctx.strokeStyle='rgba(0,255,136,.2)';ctx.stroke();

var hmRounds=[];try{hmRounds=JSON.parse(localStorage.getItem('gt_v13_heatmap_rounds'))||[]}catch(e){}
var hcLog=[];try{hcLog=JSON.parse(localStorage.getItem('gt_v13_hc_log'))||[]}catch(e){}
var ssRecords=lsGet('shotshape_records',[]);
var tourneys=lsGet('tournaments',[]);

var totalRounds=hmRounds.length;
var lastScore='--';var avgScore='--';
if(hmRounds.length>0){
  var last=hmRounds[hmRounds.length-1];
  var lt=0;for(var i=0;i<last.scores.length;i++)lt+=last.scores[i];
  lastScore=lt;
  var sum=0;
  for(var r=0;r<hmRounds.length;r++){var rt=0;for(var s=0;s<hmRounds[r].scores.length;s++)rt+=hmRounds[r].scores[s];sum+=rt}
  avgScore=(sum/hmRounds.length).toFixed(1);
}
var handicap='--';
if(hcLog.length>=3){
  var sorted=hcLog.slice().sort(function(a,b){return a.diff-b.diff});
  var useCount=Math.max(1,Math.floor(hcLog.length*0.4));if(useCount>8)useCount=8;
  var hcSum=0;for(var h=0;h<useCount;h++)hcSum+=sorted[h].diff;
  handicap=(hcSum/useCount*0.96).toFixed(1);
}

var metrics=[
  {label:'총 라운드',value:''+totalRounds,color:'#00B4D8'},
  {label:'최근 스코어',value:''+lastScore,color:lastScore!=='--'&&lastScore<=85?'#00FF88':'#FFB800'},
  {label:'평균 스코어',value:''+avgScore,color:'#00B4D8'},
  {label:'핸디캡',value:''+handicap,color:'#00FF88'},
  {label:'샷 기록',value:''+ssRecords.length,color:'#FFB800'},
  {label:'토너먼트',value:''+tourneys.length,color:'#ff6b6b'}
];

var colW=W/3;
for(var m=0;m<metrics.length;m++){
  var col=m%3;var row=Math.floor(m/3);
  var mx=col*colW+colW/2;var my=110+row*80;
  ctx.fillStyle=metrics[m].color+'15';
  ctx.beginPath();ctx.roundRect(mx-70,my-8,140,60,10);ctx.fill();
  ctx.strokeStyle=metrics[m].color+'30';ctx.lineWidth=1;
  ctx.beginPath();ctx.roundRect(mx-70,my-8,140,60,10);ctx.stroke();
  ctx.fillStyle=metrics[m].color;ctx.font='bold 24px sans-serif';ctx.textAlign='center';
  ctx.fillText(metrics[m].value,mx,my+22);
  ctx.fillStyle='#888';ctx.font='10px sans-serif';
  ctx.fillText(metrics[m].label,mx,my+40);
}

var grade='D';var gradeColor='#ff6b6b';
if(totalRounds>=10&&avgScore!=='--'){
  var avg=parseFloat(avgScore);
  if(avg<=75){grade='S';gradeColor='#FFD700'}
  else if(avg<=82){grade='A';gradeColor='#00FF88'}
  else if(avg<=90){grade='B';gradeColor='#00B4D8'}
  else if(avg<=100){grade='C';gradeColor='#FFB800'}
}

ctx.fillStyle=gradeColor+'15';
ctx.beginPath();ctx.roundRect(W/2-60,290,120,80,14);ctx.fill();
ctx.strokeStyle=gradeColor+'40';ctx.lineWidth=2;
ctx.beginPath();ctx.roundRect(W/2-60,290,120,80,14);ctx.stroke();
ctx.fillStyle=gradeColor;ctx.font='bold 48px sans-serif';ctx.textAlign='center';
ctx.fillText(grade,W/2,345);
ctx.fillStyle='#888';ctx.font='11px sans-serif';
ctx.fillText('Overall Grade',W/2,365);

ctx.fillStyle='#333';ctx.font='9px sans-serif';ctx.textAlign='center';
ctx.fillText('Generated by Golf Tracker Pro v14 | '+todayStr(),W/2,H-16);
ctx.fillText('bsy522-dot/golf-tracker',W/2,H-4);
}

window._v14DownloadReport=function(){
var canvas=document.getElementById('v14-report-canvas');if(!canvas)return;
var link=document.createElement('a');link.download='golf-report-'+todayStr()+'.png';
link.href=canvas.toDataURL('image/png');link.click();
playSfx('report_gen');showToast('리포트 PNG 다운로드!');
};
window._v14CopyReport=function(){
var canvas=document.getElementById('v14-report-canvas');if(!canvas)return;
canvas.toBlob(function(blob){
  if(navigator.clipboard&&navigator.clipboard.write){
    navigator.clipboard.write([new ClipboardItem({'image/png':blob})]).then(function(){showToast('클립보드에 복사!')}).catch(function(){showToast('복사 실패 - 다운로드를 이용하세요')});
  } else {showToast('이 브라우저는 클립보드 복사를 지원하지 않습니다')}
},'image/png');
};

// ===== 5. SHOT PATTERN TREND ANALYSIS Canvas =====
function showTrendAnalysis(){
var pn=getPanel('trend');
var html='<div class="v14-title">&#x1F4C8; 스코어 트렌드 분석</div>';

html+='<canvas id="v14-trend-canvas" width="600" height="360" style="width:100%;max-width:600px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

var hmRounds=[];try{hmRounds=JSON.parse(localStorage.getItem('gt_v13_heatmap_rounds'))||[]}catch(e){}

if(hmRounds.length>=2){
  var scores=[];var birdies=[];var doubles=[];
  var pars=[4,4,3,5,4,3,4,5,4,4,4,3,5,4,3,4,5,4];
  for(var i=0;i<hmRounds.length;i++){
    var t=0,b=0,d=0;
    for(var j=0;j<hmRounds[i].scores.length;j++){
      t+=hmRounds[i].scores[j];
      var diff=hmRounds[i].scores[j]-pars[j];
      if(diff<=-1)b++;if(diff>=2)d++;
    }
    scores.push(t);birdies.push(b);doubles.push(d);
  }

  html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">';
  var improvement=scores.length>=2?scores[scores.length-1]-scores[0]:0;
  var impColor=improvement<=0?'#00FF88':'#ff6b6b';var impPrefix=improvement>=0?'+':'';
  html+='<div class="v14-stat-card"><div class="v14-stat-val" style="color:'+impColor+'">'+impPrefix+improvement+'</div><div class="v14-stat-label">스코어 변화</div></div>';
  var best=Math.min.apply(null,scores);
  html+='<div class="v14-stat-card"><div class="v14-stat-val" style="color:#00FF88">'+best+'</div><div class="v14-stat-label">베스트</div></div>';
  var worst=Math.max.apply(null,scores);
  html+='<div class="v14-stat-card"><div class="v14-stat-val" style="color:#ff6b6b">'+worst+'</div><div class="v14-stat-label">워스트</div></div>';
  var avg=0;for(var a=0;a<scores.length;a++)avg+=scores[a];avg=(avg/scores.length).toFixed(1);
  html+='<div class="v14-stat-card"><div class="v14-stat-val" style="color:#00B4D8">'+avg+'</div><div class="v14-stat-label">평균</div></div>';
  html+='</div>';

  html+='<div class="v14-card"><h3>&#x1F4D6; 트렌드 해석</h3>';
  if(improvement<=-3) html+='<p style="color:#00FF88;font-size:.88em">스코어가 '+Math.abs(improvement)+'타 감소! 꾸준한 실력 향상 중입니다.</p>';
  else if(improvement>=3) html+='<p style="color:#ff6b6b;font-size:.88em">스코어가 '+improvement+'타 증가. 약점 분석과 연습이 필요합니다.</p>';
  else html+='<p style="color:#888;font-size:.88em">스코어가 안정적으로 유지되고 있습니다.</p>';
  html+='</div>';
} else {
  html+='<div class="v14-card"><p style="color:#888;font-size:.85em">2라운드 이상 기록이 필요합니다. 히트맵에서 스코어를 입력해주세요.</p></div>';
}

pn.innerHTML='<button class="v14-close" onclick="window._v14Close(\'trend\')">&times;</button>'+html;
openPanel('trend');playSfx('trend_open');
setTimeout(function(){renderTrendCanvas(hmRounds)},120);
v14CheckAch();lsSet('ach_trend_viewed',true);
}

function renderTrendCanvas(hmRounds){
var canvas=document.getElementById('v14-trend-canvas');if(!canvas)return;
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a1020';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00B4D8';ctx.font='bold 13px sans-serif';ctx.textAlign='left';
ctx.fillText('Score Trend Analysis',12,22);

if(hmRounds.length<2){
  ctx.fillStyle='#555';ctx.font='14px sans-serif';ctx.textAlign='center';
  ctx.fillText('2라운드 이상 기록 필요',W/2,H/2);return;
}

var scores=[];var pars=[4,4,3,5,4,3,4,5,4,4,4,3,5,4,3,4,5,4];
for(var i=0;i<hmRounds.length;i++){var t=0;for(var j=0;j<hmRounds[i].scores.length;j++)t+=hmRounds[i].scores[j];scores.push(t)}

var recent=scores.slice(-15);
var maxS=Math.max.apply(null,recent)+5;
var minS=Math.min.apply(null,recent)-5;
var range=maxS-minS;if(range<10)range=10;

var chartL=60,chartR=W-30,chartT=50,chartB=H-40;
var chartW=chartR-chartL,chartH=chartB-chartT;

ctx.strokeStyle='rgba(255,255,255,.06)';ctx.lineWidth=1;
for(var g=0;g<=4;g++){
  var gy=chartT+g*chartH/4;
  ctx.beginPath();ctx.moveTo(chartL,gy);ctx.lineTo(chartR,gy);ctx.stroke();
  var sv=Math.round(maxS-g*range/4);
  ctx.fillStyle='#666';ctx.font='10px sans-serif';ctx.textAlign='right';
  ctx.fillText(sv,chartL-8,gy+3);
}

ctx.strokeStyle='rgba(0,255,136,.2)';ctx.lineWidth=1;ctx.setLineDash([4,4]);
var parLine=72;
var parY=chartT+(maxS-parLine)/range*chartH;
if(parY>=chartT&&parY<=chartB){
  ctx.beginPath();ctx.moveTo(chartL,parY);ctx.lineTo(chartR,parY);ctx.stroke();
  ctx.fillStyle='#00FF88';ctx.font='9px sans-serif';ctx.textAlign='left';
  ctx.fillText('Par 72',chartR+4,parY+3);
}
ctx.setLineDash([]);

var stepX=chartW/(recent.length-1);
var points=[];
for(var p=0;p<recent.length;p++){
  var px=chartL+p*stepX;
  var py=chartT+(maxS-recent[p])/range*chartH;
  points.push({x:px,y:py});
}

var areaGrad=ctx.createLinearGradient(0,chartT,0,chartB);
areaGrad.addColorStop(0,'rgba(0,255,136,.15)');areaGrad.addColorStop(1,'rgba(0,255,136,.01)');
ctx.fillStyle=areaGrad;ctx.beginPath();ctx.moveTo(points[0].x,chartB);
for(var a=0;a<points.length;a++)ctx.lineTo(points[a].x,points[a].y);
ctx.lineTo(points[points.length-1].x,chartB);ctx.closePath();ctx.fill();

ctx.strokeStyle='#00FF88';ctx.lineWidth=2;ctx.beginPath();
for(var l=0;l<points.length;l++){
  if(l===0)ctx.moveTo(points[l].x,points[l].y);else ctx.lineTo(points[l].x,points[l].y);
}
ctx.stroke();

for(var d=0;d<points.length;d++){
  ctx.beginPath();ctx.arc(points[d].x,points[d].y,4,0,Math.PI*2);
  ctx.fillStyle=recent[d]<=72?'#00FF88':recent[d]<=85?'#00B4D8':recent[d]<=95?'#FFB800':'#ff6b6b';
  ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=1;ctx.stroke();
  ctx.fillStyle='#ccc';ctx.font='9px sans-serif';ctx.textAlign='center';
  ctx.fillText(recent[d],points[d].x,points[d].y-10);
}

ctx.fillStyle='#888';ctx.font='9px sans-serif';ctx.textAlign='center';
for(var x=0;x<recent.length;x++){
  ctx.fillText('R'+(scores.length-recent.length+x+1),chartL+x*stepX,chartB+14);
}

ctx.fillStyle='#888';ctx.font='10px sans-serif';ctx.textAlign='left';
ctx.fillText('최근 '+recent.length+'라운드',12,H-6);
}

// ===== 6. PRACTICE IMPACT TRACKER =====
function showPracticeTracker(){
var pn=getPanel('practice2');
var sessions=lsGet('practice_sessions',[]);
var html='<div class="v14-title">&#x1F3AF; 연습 임팩트 트래커</div>';

html+='<div class="v14-card"><h3>연습 세션 기록</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v14-label">연습 종류</label><select id="v14-pr-type" class="v14-input"><option>드라이빙 레인지</option><option>퍼팅 연습</option><option>칩/피치</option><option>벙커 연습</option><option>라운드 연습</option><option>실내 스윙</option></select></div>';
html+='<div><label class="v14-label">연습 시간(분)</label><input id="v14-pr-time" class="v14-input" type="number" min="10" max="300" value="60"></div>';
html+='<div><label class="v14-label">날짜</label><input id="v14-pr-date" class="v14-input" type="date" value="'+todayStr()+'"></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:6px">';
html+='<div><label class="v14-label">연습 볼 수</label><input id="v14-pr-balls" class="v14-input" type="number" min="0" max="500" value="100"></div>';
html+='<div><label class="v14-label">집중도 (1~10)</label><input id="v14-pr-focus" class="v14-input" type="number" min="1" max="10" value="7"></div>';
html+='</div>';
html+='<div style="margin-top:6px"><label class="v14-label">메모</label><input id="v14-pr-memo" class="v14-input" placeholder="오늘의 연습 포인트..."></div>';
html+='<button class="v14-btn v14-btn-primary" style="width:100%;margin-top:10px" onclick="window._v14RecordPractice()">세션 저장</button></div>';

var totalTime=0,totalBalls=0,totalSessions=sessions.length;
for(var i=0;i<sessions.length;i++){totalTime+=sessions[i].time;totalBalls+=sessions[i].balls}

html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">';
html+='<div class="v14-stat-card"><div class="v14-stat-val" style="color:#00FF88">'+totalSessions+'</div><div class="v14-stat-label">총 세션</div></div>';
html+='<div class="v14-stat-card"><div class="v14-stat-val" style="color:#00B4D8">'+(totalTime>=60?Math.round(totalTime/60)+'h':totalTime+'m')+'</div><div class="v14-stat-label">총 연습시간</div></div>';
html+='<div class="v14-stat-card"><div class="v14-stat-val" style="color:#FFB800">'+totalBalls+'</div><div class="v14-stat-label">총 볼 수</div></div>';
var avgFocus=0;if(sessions.length>0){for(var f=0;f<sessions.length;f++)avgFocus+=sessions[f].focus;avgFocus=(avgFocus/sessions.length).toFixed(1)}
html+='<div class="v14-stat-card"><div class="v14-stat-val" style="color:'+(avgFocus>=7?'#00FF88':'#FFB800')+'">'+avgFocus+'</div><div class="v14-stat-label">평균 집중도</div></div>';
html+='</div>';

html+='<canvas id="v14-practice-canvas" width="560" height="260" style="width:100%;max-width:560px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

if(sessions.length>0){
  html+='<div class="v14-card"><h3>&#x1F4CB; 최근 세션</h3>';
  html+='<table class="v14-table"><tr><th>날짜</th><th>종류</th><th>시간</th><th>볼</th><th>집중</th></tr>';
  var recent=sessions.slice(-5).reverse();
  for(var r=0;r<recent.length;r++){
    var s=recent[r];
    html+='<tr><td>'+s.date+'</td><td>'+s.type+'</td><td>'+s.time+'분</td><td>'+s.balls+'</td><td style="color:'+(s.focus>=7?'#00FF88':'#FFB800')+'">'+s.focus+'/10</td></tr>';
  }
  html+='</table></div>';
}

pn.innerHTML='<button class="v14-close" onclick="window._v14Close(\'practice2\')">&times;</button>'+html;
openPanel('practice2');playSfx('practice_log');
setTimeout(function(){renderPracticeCanvas(sessions)},120);
v14CheckAch();lsSet('ach_practice_viewed',true);
}

window._v14RecordPractice=function(){
var type=document.getElementById('v14-pr-type').value;
var time=parseInt(document.getElementById('v14-pr-time').value)||60;
var date=document.getElementById('v14-pr-date').value||todayStr();
var balls=parseInt(document.getElementById('v14-pr-balls').value)||0;
var focus=parseInt(document.getElementById('v14-pr-focus').value)||5;
var memo=document.getElementById('v14-pr-memo').value||'';
var sessions=lsGet('practice_sessions',[]);
sessions.push({type:type,time:time,date:date,balls:balls,focus:focus,memo:memo});
if(sessions.length>100)sessions=sessions.slice(-100);
lsSet('practice_sessions',sessions);
playSfx('practice_log');showToast(type+' '+time+'분 기록!');
closePanel('practice2');setTimeout(showPracticeTracker,200);
};

function renderPracticeCanvas(sessions){
var canvas=document.getElementById('v14-practice-canvas');if(!canvas)return;
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a1020';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00B4D8';ctx.font='bold 13px sans-serif';ctx.textAlign='left';
ctx.fillText('Weekly Practice Summary',12,22);

var weekData={};var now=new Date();
for(var d=6;d>=0;d--){
  var dt=new Date(now);dt.setDate(dt.getDate()-d);
  var ds=dt.toISOString().slice(0,10);
  weekData[ds]={time:0,balls:0};
}
for(var i=0;i<sessions.length;i++){
  if(weekData[sessions[i].date]!==undefined){
    weekData[sessions[i].date].time+=sessions[i].time;
    weekData[sessions[i].date].balls+=sessions[i].balls;
  }
}

var days=Object.keys(weekData);
var maxTime=0;for(var k=0;k<days.length;k++){if(weekData[days[k]].time>maxTime)maxTime=weekData[days[k]].time}
if(maxTime===0)maxTime=120;

var barW=(W-100)/7;
var chartB=H-40;var chartT=50;
for(var b=0;b<days.length;b++){
  var x=50+b*barW;
  var timeH=(weekData[days[b]].time/maxTime)*(chartB-chartT);
  var barGrad=ctx.createLinearGradient(0,chartB-timeH,0,chartB);
  barGrad.addColorStop(0,'#00FF88');barGrad.addColorStop(1,'rgba(0,255,136,.3)');
  ctx.fillStyle=barGrad;
  ctx.beginPath();ctx.roundRect(x+4,chartB-timeH,barW-8,timeH,4);ctx.fill();

  ctx.fillStyle='#ccc';ctx.font='10px sans-serif';ctx.textAlign='center';
  if(weekData[days[b]].time>0)ctx.fillText(weekData[days[b]].time+'m',x+barW/2,chartB-timeH-8);

  var dayNames=['일','월','화','수','목','금','토'];
  var dayIdx=new Date(days[b]).getDay();
  ctx.fillStyle=dayIdx===0||dayIdx===6?'#ff6b6b':'#888';ctx.font='10px sans-serif';
  ctx.fillText(dayNames[dayIdx],x+barW/2,chartB+14);
  ctx.fillStyle='#555';ctx.font='8px sans-serif';
  ctx.fillText(days[b].slice(5),x+barW/2,chartB+26);
}

ctx.strokeStyle='rgba(255,255,255,.06)';ctx.lineWidth=1;
for(var g=0;g<=3;g++){
  var gy=chartT+g*(chartB-chartT)/3;
  ctx.beginPath();ctx.moveTo(45,gy);ctx.lineTo(W-10,gy);ctx.stroke();
  ctx.fillStyle='#555';ctx.font='9px sans-serif';ctx.textAlign='right';
  ctx.fillText(Math.round(maxTime-g*maxTime/3)+'m',42,gy+3);
}
}

// ===== 7. COURSE FLYOVER SIMULATOR Canvas =====
function showCourseFlyover(){
var pn=getPanel('flyover');
var holeIdx=lsGet('flyover_hole',0);
var hole=HOLE_TEMPLATES[holeIdx%HOLE_TEMPLATES.length];
var html='<div class="v14-title">&#x1F6A9; 코스 플라이오버</div>';

html+='<div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:12px">';
for(var h=0;h<HOLE_TEMPLATES.length;h++){
  var cls=h===holeIdx?'v14-btn active':'v14-btn';
  html+='<button class="'+cls+'" onclick="window._v14FlyoverHole('+h+')" style="min-width:38px;padding:6px 8px;font-size:.82em">'+HOLE_TEMPLATES[h].name.replace('번홀','')+'H</button>';
}
html+='</div>';

html+='<canvas id="v14-flyover-canvas" width="560" height="380" style="width:100%;max-width:560px;height:auto;display:block;margin:0 auto 12px;border-radius:12px"></canvas>';

html+='<div class="v14-card"><h3>&#x1F4D6; 홀 공략 가이드</h3>';
html+='<table class="v14-table"><tr><th>항목</th><th>정보</th></tr>';
html+='<tr><td>홀</td><td style="color:#00FF88;font-weight:700">'+hole.name+'</td></tr>';
html+='<tr><td>파</td><td>Par '+hole.par+'</td></tr>';
html+='<tr><td>거리</td><td>'+hole.dist+'yd</td></tr>';
html+='<tr><td>해저드</td><td>'+hole.hazards.length+'개</td></tr>';
var strategy='';
if(hole.par===3) strategy='정확한 아이언샷으로 그린 직접 공략. 핀 위치와 바람을 고려하여 클럽을 선택하세요.';
else if(hole.par===4) strategy='드라이버로 페어웨이 안착 후 세컨샷 그린 공략. 해저드 위치를 확인하고 안전한 루트를 선택하세요.';
else strategy='드라이버 + 레이업 + 어프로치 3단계 전략. 2온 도전 시 해저드 리스크를 반드시 고려하세요.';
html+='<tr><td>전략</td><td style="color:#888;font-size:.82em">'+strategy+'</td></tr>';
html+='</table></div>';

pn.innerHTML='<button class="v14-close" onclick="window._v14Close(\'flyover\')">&times;</button>'+html;
openPanel('flyover');playSfx('flyover_open');
setTimeout(function(){renderFlyoverCanvas(hole)},120);
v14CheckAch();lsSet('ach_flyover_viewed',true);
}

window._v14FlyoverHole=function(idx){lsSet('flyover_hole',idx);closePanel('flyover');setTimeout(showCourseFlyover,150)};

function renderFlyoverCanvas(hole){
var canvas=document.getElementById('v14-flyover-canvas');if(!canvas)return;
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;

var skyGrad=ctx.createLinearGradient(0,0,0,H*0.3);
skyGrad.addColorStop(0,'#1a3a5c');skyGrad.addColorStop(1,'#2a5a3a');
ctx.fillStyle=skyGrad;ctx.fillRect(0,0,W,H*0.3);

var grassGrad=ctx.createLinearGradient(0,H*0.3,0,H);
grassGrad.addColorStop(0,'#1a5a1a');grassGrad.addColorStop(0.3,'#2a7a2a');grassGrad.addColorStop(0.7,'#1a6a1a');grassGrad.addColorStop(1,'#0c3c0c');
ctx.fillStyle=grassGrad;ctx.fillRect(0,H*0.3,W,H*0.7);

var perspective=0.6;
var fwCX=W*hole.fairway.x;var fwW=W*hole.fairway.w;
ctx.fillStyle='#3a9a3a';
ctx.beginPath();
ctx.moveTo(fwCX-fwW*0.8,H-20);ctx.lineTo(fwCX-fwW*2,H*0.35);
ctx.lineTo(fwCX+fwW*2,H*0.35);ctx.lineTo(fwCX+fwW*0.8,H-20);
ctx.closePath();ctx.fill();

ctx.fillStyle='#4aaa4a';
ctx.beginPath();
ctx.moveTo(fwCX-fwW*0.5,H-20);ctx.lineTo(fwCX-fwW*1.2,H*0.35);
ctx.lineTo(fwCX+fwW*1.2,H*0.35);ctx.lineTo(fwCX+fwW*0.5,H-20);
ctx.closePath();ctx.fill();

ctx.strokeStyle='rgba(255,255,255,.08)';ctx.lineWidth=1;ctx.setLineDash([6,6]);
for(var y=1;y<=4;y++){
  var yy=H-20-(y*(H-60)/5);
  ctx.beginPath();ctx.moveTo(60,yy);ctx.lineTo(W-60,yy);ctx.stroke();
  ctx.fillStyle='#666';ctx.font='9px sans-serif';ctx.textAlign='right';
  ctx.fillText(Math.round(hole.dist*y/5)+'yd',55,yy+3);
}
ctx.setLineDash([]);

for(var hz=0;hz<hole.hazards.length;hz++){
  var haz=hole.hazards[hz];
  var hx=W*haz.x;
  var depthFactor=(1-haz.y);
  var hy=H-20-depthFactor*(H-60);
  var scaledR=haz.r*(0.5+depthFactor*0.5);

  if(haz.type==='워터'){
    ctx.fillStyle='rgba(30,100,180,.5)';ctx.strokeStyle='rgba(60,140,220,.6)';
  } else {
    ctx.fillStyle='rgba(210,180,120,.5)';ctx.strokeStyle='rgba(230,200,140,.6)';
  }
  ctx.lineWidth=1.5;
  ctx.beginPath();ctx.ellipse(hx,hy,scaledR*1.5,scaledR*0.7,0,0,Math.PI*2);ctx.fill();ctx.stroke();
  ctx.fillStyle='#fff';ctx.font='bold 9px sans-serif';ctx.textAlign='center';
  ctx.fillText(haz.type,hx,hy+3);
}

var gx=W*hole.green.x;var gDepth=(1-hole.green.y);
var gy=H-20-gDepth*(H-60);
var gRx=(hole.green.r+12)*(0.5+gDepth*0.5);var gRy=gRx*0.5;
ctx.fillStyle='#228B22';ctx.strokeStyle='#33CC33';ctx.lineWidth=2;
ctx.beginPath();ctx.ellipse(gx,gy,gRx,gRy,0,0,Math.PI*2);ctx.fill();ctx.stroke();
ctx.fillStyle='#fff';ctx.font='bold 10px sans-serif';ctx.textAlign='center';
ctx.fillText('GREEN',gx,gy+4);

ctx.fillStyle='#ff4444';ctx.beginPath();
ctx.moveTo(gx,gy-gRy+2);ctx.lineTo(gx+1,gy-gRy-10);ctx.lineTo(gx-1,gy-gRy-10);ctx.closePath();ctx.fill();
ctx.fillStyle='#ff4444';ctx.beginPath();ctx.arc(gx+4,gy-gRy-6,3,0,Math.PI*2);ctx.fill();

ctx.fillStyle='rgba(255,255,255,.3)';
ctx.beginPath();ctx.ellipse(W/2,H-12,30,8,0,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#fff';ctx.font='bold 10px sans-serif';ctx.textAlign='center';
ctx.fillText('TEE',W/2,H-8);

ctx.strokeStyle='rgba(0,255,136,.2)';ctx.lineWidth=1.5;ctx.setLineDash([6,4]);
ctx.beginPath();ctx.moveTo(W/2,H-15);ctx.lineTo(gx,gy);ctx.stroke();
ctx.setLineDash([]);

ctx.fillStyle='#00B4D8';ctx.font='bold 14px sans-serif';ctx.textAlign='left';
ctx.fillText(hole.name+' | Par '+hole.par+' | '+hole.dist+'yd',12,22);
ctx.fillStyle='#888';ctx.font='10px sans-serif';
ctx.fillText('Course Flyover View',12,38);
}

// ===== 8. GOLF FITNESS ASSESSMENT Canvas Radar =====
var FITNESS_AXES=['유연성','코어 근력','밸런스','회전력','지구력','그립 강도'];
var FITNESS_TIPS=[
'스트레칭: 어깨/고관절/흉추 회전 스트레칭을 매일 15분씩 수행하세요.',
'코어 운동: 플랭크/사이드 플랭크/러시안 트위스트로 코어를 강화하세요.',
'밸런스 훈련: 한 발 서기, 보수볼 스윙으로 안정감을 높이세요.',
'회전력 강화: 메디신볼 트위스트, 케이블 로테이션으로 클럽헤드 스피드를 높이세요.',
'심폐 지구력: 주 3회 30분 이상 유산소 운동으로 후반 체력 저하를 방지하세요.',
'그립 강화: 그립 트레이너, 손가락 스트레칭으로 안정적인 그립 압력을 유지하세요.'
];

function showFitnessAssessment(){
var pn=getPanel('fitness');
var scores=lsGet('fitness_scores',{flexibility:5,core:5,balance:5,rotation:5,endurance:5,grip:5});
var html='<div class="v14-title">&#x1F3CB;&#xFE0F; 골프 피트니스 평가</div>';

html+='<div class="v14-card"><h3>체력 평가 (1~10)</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">';
var keys=['flexibility','core','balance','rotation','endurance','grip'];
for(var i=0;i<FITNESS_AXES.length;i++){
  html+='<div><label class="v14-label">'+FITNESS_AXES[i]+'</label>';
  html+='<input id="v14-fit-'+keys[i]+'" class="v14-input" type="range" min="1" max="10" value="'+scores[keys[i]]+'" oninput="document.getElementById(\'v14-fit-val-'+keys[i]+'\').textContent=this.value" style="width:100%">';
  html+='<span id="v14-fit-val-'+keys[i]+'" style="color:#00FF88;font-weight:700;font-size:.85em">'+scores[keys[i]]+'</span></div>';
}
html+='</div>';
html+='<button class="v14-btn v14-btn-primary" style="width:100%;margin-top:10px" onclick="window._v14SaveFitness()">평가 저장 &amp; 분석</button></div>';

html+='<canvas id="v14-fitness-canvas" width="500" height="400" style="width:100%;max-width:500px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

var total=0;for(var k=0;k<keys.length;k++)total+=scores[keys[k]];
var avg=(total/6).toFixed(1);
var grade='D';var gradeColor='#ff6b6b';
if(avg>=9){grade='S';gradeColor='#FFD700'}
else if(avg>=7.5){grade='A';gradeColor='#00FF88'}
else if(avg>=6){grade='B';gradeColor='#00B4D8'}
else if(avg>=4){grade='C';gradeColor='#FFB800'}

html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">';
html+='<div class="v14-stat-card"><div class="v14-stat-val" style="color:'+gradeColor+';font-size:1.6em">'+grade+'</div><div class="v14-stat-label">종합 등급</div></div>';
html+='<div class="v14-stat-card"><div class="v14-stat-val" style="color:#00B4D8">'+avg+'</div><div class="v14-stat-label">평균 점수</div></div>';
html+='<div class="v14-stat-card"><div class="v14-stat-val" style="color:#00FF88">'+total+'/60</div><div class="v14-stat-label">총점</div></div>';
html+='</div>';

var weakIdx=0;var weakVal=11;
for(var w=0;w<keys.length;w++){if(scores[keys[w]]<weakVal){weakVal=scores[keys[w]];weakIdx=w}}
html+='<div class="v14-card" style="border-color:rgba(255,184,0,.3)"><h3 style="color:#FFB800">&#x26A0;&#xFE0F; 약점 분석: '+FITNESS_AXES[weakIdx]+'</h3>';
html+='<p style="color:#ccc;font-size:.85em;line-height:1.6">'+FITNESS_TIPS[weakIdx]+'</p></div>';

html+='<div class="v14-card"><h3>&#x1F4D6; 전체 개선 팁</h3>';
html+='<div style="display:grid;gap:4px">';
for(var tp=0;tp<FITNESS_TIPS.length;tp++){
  var tipColor=scores[keys[tp]]<5?'#ff6b6b':scores[keys[tp]]<7?'#FFB800':'#00FF88';
  html+='<div style="padding:6px 10px;font-size:.78em;color:#aaa;border-left:3px solid '+tipColor+';background:rgba(255,255,255,.02);border-radius:0 6px 6px 0"><strong style="color:'+tipColor+'">'+FITNESS_AXES[tp]+' ('+scores[keys[tp]]+')</strong> '+FITNESS_TIPS[tp]+'</div>';
}
html+='</div></div>';

pn.innerHTML='<button class="v14-close" onclick="window._v14Close(\'fitness\')">&times;</button>'+html;
openPanel('fitness');playSfx('fitness_open');
setTimeout(function(){renderFitnessCanvas(scores)},120);
v14CheckAch();lsSet('ach_fitness_viewed',true);
}

window._v14SaveFitness=function(){
var keys=['flexibility','core','balance','rotation','endurance','grip'];
var scores={};
for(var i=0;i<keys.length;i++){
  scores[keys[i]]=parseInt(document.getElementById('v14-fit-'+keys[i]).value)||5;
}
lsSet('fitness_scores',scores);
playSfx('fitness_open');showToast('피트니스 평가 저장!');
closePanel('fitness');setTimeout(showFitnessAssessment,200);
};

function renderFitnessCanvas(scores){
var canvas=document.getElementById('v14-fitness-canvas');if(!canvas)return;
var ctx=canvas.getContext('2d');var W=canvas.width,H=canvas.height;
ctx.fillStyle='#0a1020';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00B4D8';ctx.font='bold 13px sans-serif';ctx.textAlign='left';
ctx.fillText('Golf Fitness Assessment Radar',12,22);

var cx=W/2,cy=H/2+10,R=130;
var n=6;var angleStep=Math.PI*2/n;
var keys=['flexibility','core','balance','rotation','endurance','grip'];

for(var ring=1;ring<=5;ring++){
  var rr=R*ring/5;
  ctx.strokeStyle='rgba(255,255,255,'+(.04+ring*.01)+')';ctx.lineWidth=1;
  ctx.beginPath();
  for(var a=0;a<n;a++){
    var ang=-Math.PI/2+a*angleStep;
    var px=cx+Math.cos(ang)*rr;var py=cy+Math.sin(ang)*rr;
    if(a===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);
  }
  ctx.closePath();ctx.stroke();
  if(ring%2===0){
    ctx.fillStyle='#444';ctx.font='8px sans-serif';ctx.textAlign='center';
    ctx.fillText(ring*2,cx+8,cy-rr+3);
  }
}

for(var b=0;b<n;b++){
  var ang2=-Math.PI/2+b*angleStep;
  ctx.strokeStyle='rgba(255,255,255,.06)';ctx.lineWidth=1;
  ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(ang2)*R,cy+Math.sin(ang2)*R);ctx.stroke();
  ctx.fillStyle='#ccc';ctx.font='bold 11px sans-serif';ctx.textAlign='center';
  var lx=cx+Math.cos(ang2)*(R+24);var ly=cy+Math.sin(ang2)*(R+24)+4;
  ctx.fillText(FITNESS_AXES[b],lx,ly);
}

ctx.fillStyle='rgba(0,255,136,.1)';ctx.strokeStyle='#00FF88';ctx.lineWidth=2.5;
ctx.beginPath();
for(var c=0;c<n;c++){
  var ang3=-Math.PI/2+c*angleStep;
  var val=scores[keys[c]]/10;
  var px3=cx+Math.cos(ang3)*R*val;var py3=cy+Math.sin(ang3)*R*val;
  if(c===0)ctx.moveTo(px3,py3);else ctx.lineTo(px3,py3);
}
ctx.closePath();ctx.fill();ctx.stroke();

for(var d=0;d<n;d++){
  var ang4=-Math.PI/2+d*angleStep;
  var val2=scores[keys[d]]/10;
  ctx.beginPath();ctx.arc(cx+Math.cos(ang4)*R*val2,cy+Math.sin(ang4)*R*val2,5,0,Math.PI*2);
  ctx.fillStyle=scores[keys[d]]>=7?'#00FF88':scores[keys[d]]>=4?'#FFB800':'#ff6b6b';ctx.fill();
  ctx.strokeStyle='#fff';ctx.lineWidth=1;ctx.stroke();
  ctx.fillStyle='#fff';ctx.font='bold 10px sans-serif';ctx.textAlign='center';
  ctx.fillText(scores[keys[d]],cx+Math.cos(ang4)*R*val2,cy+Math.sin(ang4)*R*val2-10);
}
}

// ===== QUIZ v7 (+15 = 105 total) =====
var V14_QUIZ=[
{q:'드로우 샷은 우타 기준 어느 방향으로 휘는 샷인가?',a:['좌→우','우→좌','직선','위→아래'],c:1},
{q:'스테이블포드 스코어링에서 파(Par) 스코어는 몇 점?',a:['0점','1점','2점','3점'],c:2},
{q:'매치 플레이에서 한 홀을 이기면 무엇이라 부르나?',a:['파','버디','1 UP','스트로크'],c:2},
{q:'코스 플라이오버에서 그린 주변 모래 장애물은?',a:['워터 해저드','벙커','OB','러프'],c:1},
{q:'골프 피트니스에서 스윙 파워에 가장 중요한 체력 요소는?',a:['그립 강도','코어 근력','유연성','지구력'],c:1},
{q:'연습장에서 100볼 연습 시 권장 연습 시간은?',a:['15분','30분','45~60분','120분'],c:2},
{q:'스코어 트렌드 분석에서 개선을 나타내는 지표는?',a:['스코어 증가','스코어 감소','일정 유지','변동 큼'],c:1},
{q:'토너먼트 네트 스코어란?',a:['그로스 + 핸디캡','그로스 - 핸디캡','파 - 스코어','버디 수'],c:1},
{q:'포스트라운드 리포트의 S등급 기준 평균 스코어는?',a:['80이하','78이하','75이하','72이하'],c:2},
{q:'샷 셰이프 중 &ldquo;푸쉬 페이드&rdquo;는?',a:['좌측 출발 후 좌로 휘는 샷','우측 출발 후 우로 더 휘는 샷','직선 비행 후 좌로 꺾이는 샷','높은 탄도의 직선 샷'],c:1},
{q:'골프 피트니스에서 후반 체력 저하 방지를 위해 필요한 것은?',a:['그립 강화','회전력','심폐 지구력','밸런스'],c:2},
{q:'스마트 캐디에서 Par 5홀 2번째 샷 추천 전략은?',a:['드라이버','레이업','퍼팅','칩샷'],c:1},
{q:'연습 임팩트 트래커에서 집중도 10점 만점의 의미는?',a:['연습 시간','연습 볼 수','정신적 몰입도','날씨 상태'],c:2},
{q:'코스 플라이오버에서 파란색 해저드는?',a:['벙커','워터 해저드','OB','카트 도로'],c:1},
{q:'슬라이스를 교정하기 위한 스윙 포인트는?',a:['아웃-인 스윙 강화','인-아웃 스윙으로 교정','오픈 페이스 유지','약한 그립'],c:1}
];

function showV14Quiz(){
var pn=getPanel('v14quiz');
var qs=lsGet('v14quiz_state',{answered:[],correct:0,currentIdx:0});
var idx=qs.currentIdx;
if(idx>=V14_QUIZ.length)idx=0;

var html='<div class="v14-title">&#x1F4DD; 골프 퀴즈 v7 ('+V14_QUIZ.length+'문)</div>';
html+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">';
html+='<span style="color:#888;font-size:.85em">진행: '+(qs.answered||[]).length+'/'+V14_QUIZ.length+'</span>';
html+='<span style="color:#00FF88;font-size:.85em">정답: '+qs.correct+'/'+((qs.answered||[]).length||0)+'</span>';
html+='</div>';

var q=V14_QUIZ[idx];
html+='<div class="v14-card"><h3>Q'+(idx+1)+'. '+q.q+'</h3>';
html+='<div style="display:grid;gap:8px;margin-top:12px">';
for(var i=0;i<q.a.length;i++){
  var answered=(qs.answered||[]).indexOf(idx)>-1;
  var btnClass='v14-btn';
  if(answered&&i===q.c)btnClass+=' active';
  html+='<button class="'+btnClass+'" style="text-align:left;padding:12px 16px" onclick="window._v14QuizAnswer('+idx+','+i+')"'+(answered?' disabled':'')+'>'+String.fromCharCode(65+i)+'. '+q.a[i]+'</button>';
}
html+='</div></div>';

html+='<div style="display:flex;justify-content:space-between;margin-top:8px">';
html+='<button class="v14-btn" onclick="window._v14QuizNav(-1)">&larr; 이전</button>';
html+='<button class="v14-btn" onclick="window._v14QuizReset()">리셋</button>';
html+='<button class="v14-btn" onclick="window._v14QuizNav(1)">다음 &rarr;</button>';
html+='</div>';

pn.innerHTML='<button class="v14-close" onclick="window._v14Close(\'v14quiz\')">&times;</button>'+html;
openPanel('v14quiz');playSfx('caddie_recommend');
}

window._v14QuizAnswer=function(idx,ans){
var qs=lsGet('v14quiz_state',{answered:[],correct:0,currentIdx:0});
if(!qs.answered)qs.answered=[];
if(qs.answered.indexOf(idx)>-1)return;
qs.answered.push(idx);
if(ans===V14_QUIZ[idx].c){qs.correct++;playSfx('caddie_recommend');showToast('정답!')}
else{showToast('오답! 정답: '+String.fromCharCode(65+V14_QUIZ[idx].c)+'. '+V14_QUIZ[idx].a[V14_QUIZ[idx].c])}
lsSet('v14quiz_state',qs);
closePanel('v14quiz');setTimeout(showV14Quiz,200);
v14CheckAch();
};
window._v14QuizNav=function(dir){
var qs=lsGet('v14quiz_state',{answered:[],correct:0,currentIdx:0});
qs.currentIdx=(qs.currentIdx+dir+V14_QUIZ.length)%V14_QUIZ.length;
lsSet('v14quiz_state',qs);closePanel('v14quiz');setTimeout(showV14Quiz,150);
};
window._v14QuizReset=function(){lsSet('v14quiz_state',{answered:[],correct:0,currentIdx:0});closePanel('v14quiz');setTimeout(showV14Quiz,200)};

// ===== ACHIEVEMENTS (+12 = 84 total) =====
var V14_ACH=[
{id:'v14_shotshape',name:'샷 분석가',desc:'샷 셰이프 분석기 사용',icon:'&#x1F3CC;&#xFE0F;',check:function(){return lsGet('ach_shotshape_viewed',false)}},
{id:'v14_shotshape_10',name:'샷 마스터',desc:'샷 셰이프 10회 기록',icon:'&#x1F3AF;',check:function(){return lsGet('shotshape_records',[]).length>=10}},
{id:'v14_caddie2',name:'AI 캐디 유저',desc:'스마트 캐디 GPS 사용',icon:'&#x26F3;',check:function(){return lsGet('ach_caddie2_viewed',false)}},
{id:'v14_tourney',name:'토너먼트 참가자',desc:'토너먼트 모드 사용',icon:'&#x1F3C6;',check:function(){return lsGet('ach_tourney_viewed',false)}},
{id:'v14_tourney_3',name:'토너먼트 마스터',desc:'토너먼트 3회 완료',icon:'&#x1F947;',check:function(){return lsGet('tournaments',[]).length>=3}},
{id:'v14_report',name:'리포트 분석가',desc:'포스트라운드 리포트 생성',icon:'&#x1F4CA;',check:function(){return lsGet('ach_report_gen',false)}},
{id:'v14_trend',name:'트렌드 관찰자',desc:'스코어 트렌드 분석 사용',icon:'&#x1F4C8;',check:function(){return lsGet('ach_trend_viewed',false)}},
{id:'v14_practice',name:'연습왕',desc:'연습 임팩트 트래커 사용',icon:'&#x1F3AF;',check:function(){return lsGet('ach_practice_viewed',false)}},
{id:'v14_practice_5',name:'연습 중독',desc:'연습 세션 5회 기록',icon:'&#x1F4AA;',check:function(){return lsGet('practice_sessions',[]).length>=5}},
{id:'v14_flyover',name:'코스 탐험가',desc:'코스 플라이오버 사용',icon:'&#x1F6A9;',check:function(){return lsGet('ach_flyover_viewed',false)}},
{id:'v14_fitness',name:'피트니스 평가자',desc:'골프 피트니스 평가 사용',icon:'&#x1F3CB;&#xFE0F;',check:function(){return lsGet('ach_fitness_viewed',false)}},
{id:'v14_all',name:'v14 탐험가',desc:'v14 전체 기능 탐색',icon:'&#x1F30D;',check:function(){return lsGet('ach_shotshape_viewed',false)&&lsGet('ach_caddie2_viewed',false)&&lsGet('ach_tourney_viewed',false)&&lsGet('ach_report_gen',false)&&lsGet('ach_trend_viewed',false)&&lsGet('ach_practice_viewed',false)&&lsGet('ach_flyover_viewed',false)&&lsGet('ach_fitness_viewed',false)}}
];

function v14CheckAch(){
var unlocked=lsGet('v14_achievements',[]);
for(var i=0;i<V14_ACH.length;i++){
  var ach=V14_ACH[i];
  if(unlocked.indexOf(ach.id)===-1&&ach.check()){
    unlocked.push(ach.id);lsSet('v14_achievements',unlocked);
    showV14AchPopup(ach);playSfx('v14_achieve');
  }
}
}

function showV14AchPopup(ach){
var popup=document.createElement('div');popup.className='v14-ach-popup';
popup.innerHTML='<div style="font-size:2em">'+ach.icon+'</div><div><div style="font-size:.65em;color:#00FF88;font-weight:700;letter-spacing:2px">ACHIEVEMENT</div><div style="font-weight:700">'+ach.name+'</div><div style="font-size:.8em;color:#888;margin-top:2px">'+ach.desc+'</div></div>';
document.body.appendChild(popup);
setTimeout(function(){popup.classList.add('show')},50);
setTimeout(function(){popup.classList.remove('show');setTimeout(function(){popup.remove()},500)},3500);
}

// ===== QUICK ACTIONS & KEYBOARD =====
function injectV14QuickActions(){
var existing=document.querySelector('.v14-scroll-nav');if(existing)return;
var nav=document.createElement('div');nav.className='v14-scroll-nav';
var buttons=[
  {icon:'&#x1F3CC;&#xFE0F;',title:'샷분석 (Shift+S)',fn:'showShotShapeAnalyzer'},
  {icon:'&#x26F3;',title:'캐디 (Shift+G)',fn:'showSmartCaddie'},
  {icon:'&#x1F3C6;',title:'토너먼트 (Shift+T)',fn:'showTournamentMode'},
  {icon:'&#x1F4CA;',title:'리포트 (Shift+R)',fn:'showReportGenerator'},
  {icon:'&#x1F4C8;',title:'트렌드 (Shift+N)',fn:'showTrendAnalysis'},
  {icon:'&#x1F3AF;',title:'연습 (Shift+P)',fn:'showPracticeTracker'},
  {icon:'&#x1F6A9;',title:'플라이오버 (Shift+V)',fn:'showCourseFlyover'},
  {icon:'&#x1F3CB;&#xFE0F;',title:'피트니스 (Shift+B)',fn:'showFitnessAssessment'}
];
for(var i=0;i<buttons.length;i++){
  var btn=document.createElement('button');btn.className='v14-nav-btn';
  btn.innerHTML='<span class="v14-nav-icon">'+buttons[i].icon+'</span><span class="v14-nav-label">'+buttons[i].title.split(' (')[0]+'</span>';
  btn.title=buttons[i].title;
  btn.setAttribute('data-fn',buttons[i].fn);
  btn.addEventListener('click',function(){var fn=this.getAttribute('data-fn');if(window['_v14_'+fn])window['_v14_'+fn]()});
  nav.appendChild(btn);
}

var oldNav=document.querySelector('.v13-scroll-nav');
if(oldNav)oldNav.style.display='none';

document.body.appendChild(nav);
}

window._v14_showShotShapeAnalyzer=showShotShapeAnalyzer;
window._v14_showSmartCaddie=showSmartCaddie;
window._v14_showTournamentMode=showTournamentMode;
window._v14_showReportGenerator=showReportGenerator;
window._v14_showTrendAnalysis=showTrendAnalysis;
window._v14_showPracticeTracker=showPracticeTracker;
window._v14_showCourseFlyover=showCourseFlyover;
window._v14_showFitnessAssessment=showFitnessAssessment;
window._v14_showV14Quiz=showV14Quiz;
window._v14Close=function(id){closePanel(id)};

function setupV14Keyboard(){
document.addEventListener('keydown',function(e){
  if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'||e.target.tagName==='SELECT')return;
  if(e.ctrlKey||e.metaKey||e.altKey)return;
  if(!e.shiftKey)return;
  switch(e.key){
    case'S':e.preventDefault();showShotShapeAnalyzer();break;
    case'G':e.preventDefault();showSmartCaddie();break;
    case'T':e.preventDefault();showTournamentMode();break;
    case'R':e.preventDefault();showReportGenerator();break;
    case'N':e.preventDefault();showTrendAnalysis();break;
    case'P':e.preventDefault();showPracticeTracker();break;
    case'V':e.preventDefault();showCourseFlyover();break;
    case'B':e.preventDefault();showFitnessAssessment();break;
  }
});
}

// ===== CSS =====
function injectV14CSS(){
var s=document.createElement('style');
s.textContent='.v14-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.88);z-index:10007;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;pointer-events:none}.v14-overlay.active{opacity:1;pointer-events:auto}.v14-panel{background:linear-gradient(145deg,rgba(10,16,26,.98),rgba(5,8,16,.98));border:1px solid rgba(0,255,136,.15);border-radius:18px;padding:24px;max-width:700px;width:94%;max-height:85vh;overflow-y:auto;box-shadow:0 24px 80px rgba(0,0,0,.7),0 0 40px rgba(0,255,136,.06);position:relative}.v14-panel::-webkit-scrollbar{width:5px}.v14-panel::-webkit-scrollbar-thumb{background:rgba(0,255,136,.2);border-radius:3px}.v14-title{font-size:1.4em;font-weight:800;color:#00FF88;margin-bottom:18px;letter-spacing:-0.5px}.v14-close{position:absolute;top:12px;right:16px;background:none;border:none;color:#666;font-size:1.6em;cursor:pointer;padding:4px 8px;border-radius:8px;transition:all .2s;z-index:1}.v14-close:hover{color:#ff6b6b;background:rgba(255,107,107,.1)}.v14-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:16px;margin-bottom:12px;transition:all .2s}.v14-card:hover{border-color:rgba(0,255,136,.15);background:rgba(255,255,255,.05)}.v14-card h3{color:#00FF88;font-size:.95em;margin:0 0 8px}.v14-card p{color:#aaa;font-size:.85em;margin:0;line-height:1.6}.v14-badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:.75em;font-weight:600}.v14-btn{padding:8px 16px;border:1px solid rgba(0,255,136,.2);background:rgba(0,255,136,.06);color:#00FF88;border-radius:8px;cursor:pointer;font-size:.85em;transition:all .2s}.v14-btn:hover{background:rgba(0,255,136,.15);border-color:#00FF88}.v14-btn.active{background:rgba(0,255,136,.15);border-color:rgba(0,255,136,.4);color:#00FF88}.v14-btn-primary{background:rgba(0,255,136,.12);border-color:rgba(0,255,136,.3);color:#00FF88}.v14-btn-primary:hover{background:rgba(0,255,136,.22)}.v14-btn:disabled{opacity:.5;cursor:default}.v14-input{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:8px 12px;color:#fff;font-size:.85em;width:100%;box-sizing:border-box}.v14-input:focus{outline:none;border-color:rgba(0,255,136,.4)}.v14-label{display:block;font-size:.72em;color:#888;margin-bottom:3px}.v14-table{width:100%;border-collapse:collapse;font-size:.82em}.v14-table th{text-align:left;padding:8px;color:#00FF88;border-bottom:1px solid rgba(255,255,255,.08);font-weight:600}.v14-table td{padding:8px;color:#ccc;border-bottom:1px solid rgba(255,255,255,.03)}.v14-stat-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:10px 6px;text-align:center}.v14-stat-val{font-size:1.3em;font-weight:800}.v14-stat-label{font-size:.65em;color:#888;margin-top:2px}.v14-scroll-nav{position:fixed;bottom:0;left:0;right:0;z-index:1000;display:flex;overflow-x:auto;gap:2px;padding:6px 8px;background:linear-gradient(to top,rgba(5,8,16,.97),rgba(5,8,16,.82));border-top:1px solid rgba(0,255,136,.1);-webkit-overflow-scrolling:touch;scrollbar-width:none}.v14-scroll-nav::-webkit-scrollbar{display:none}.v14-nav-btn{display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px 10px;border:1px solid rgba(0,255,136,.1);background:rgba(0,255,136,.04);color:#00FF88;border-radius:10px;cursor:pointer;flex-shrink:0;transition:all .2s;font-size:1em;min-width:60px}.v14-nav-btn:hover{background:rgba(0,255,136,.12);transform:scale(1.05)}.v14-nav-icon{font-size:1.2em}.v14-nav-label{font-size:.55em;color:#888;white-space:nowrap}.v14-toast{position:fixed;top:20px;left:50%;transform:translateX(-50%) translateY(-100px);background:rgba(0,255,136,.1);border:1px solid rgba(0,255,136,.2);color:#00FF88;padding:10px 20px;border-radius:10px;z-index:99999;transition:transform .4s;font-size:.9em;backdrop-filter:blur(12px);white-space:nowrap}.v14-toast.show{transform:translateX(-50%) translateY(0)}.v14-ach-popup{position:fixed;top:60px;left:50%;transform:translateX(-50%) translateY(-150px);z-index:100001;background:linear-gradient(135deg,rgba(10,16,26,.96),rgba(20,28,38,.96));border:1px solid rgba(0,255,136,.25);border-radius:16px;padding:14px 22px;display:flex;align-items:center;gap:14px;backdrop-filter:blur(20px);transition:transform .5s cubic-bezier(.34,1.56,.64,1);box-shadow:0 8px 32px rgba(0,0,0,.5),0 0 24px rgba(0,255,136,.08)}.v14-ach-popup.show{transform:translateX(-50%) translateY(0)}@media(max-width:480px){.v14-panel{padding:16px;max-height:92vh;width:96%}.v14-scroll-nav{padding:4px 4px;gap:1px}.v14-nav-btn{min-width:52px;padding:5px 7px}.v14-nav-icon{font-size:1em}.v14-nav-label{font-size:.5em}}';
document.head.appendChild(s);
}

// ===== INIT =====
function initV14(){
injectV14CSS();
injectV14QuickActions();
setupV14Keyboard();
setTimeout(v14CheckAch,5000);
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',initV14)}
else{setTimeout(initV14,3000)}

})();
