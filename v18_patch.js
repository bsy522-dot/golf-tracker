(function(){
'use strict';
var LS='gt_v18_';
var audioCtx=null;
function getAC(){if(!audioCtx)try{audioCtx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}return audioCtx}
function playSfx(type){var ac=getAC();if(!ac)return;var o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);var t=ac.currentTime;g.gain.setValueAtTime(0.1,t);switch(type){case'swing_open':o.type='sine';o.frequency.setValueAtTime(392,t);o.frequency.linearRampToValueAtTime(523,t+0.08);o.frequency.linearRampToValueAtTime(659,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'swing_record':o.type='triangle';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(784,t+0.1);g.gain.exponentialRampToValueAtTime(0.01,t+0.2);o.start(t);o.stop(t+0.2);break;case'strategy_open':o.type='sine';o.frequency.setValueAtTime(349,t);o.frequency.linearRampToValueAtTime(440,t+0.08);o.frequency.linearRampToValueAtTime(587,t+0.16);o.frequency.linearRampToValueAtTime(698,t+0.24);g.gain.exponentialRampToValueAtTime(0.01,t+0.4);o.start(t);o.stop(t+0.4);break;case'club_replace':o.type='triangle';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(554,t+0.12);g.gain.exponentialRampToValueAtTime(0.01,t+0.25);o.start(t);o.stop(t+0.25);break;case'cost_calc':o.type='sine';o.frequency.setValueAtTime(330,t);o.frequency.linearRampToValueAtTime(494,t+0.1);o.frequency.linearRampToValueAtTime(659,t+0.2);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'green_speed':o.type='sine';o.frequency.setValueAtTime(587,t);o.frequency.linearRampToValueAtTime(784,t+0.08);o.frequency.linearRampToValueAtTime(988,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'histogram_view':o.type='triangle';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(587,t+0.1);g.gain.setValueAtTime(0.08,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.2);o.start(t);o.stop(t+0.2);break;case'fitness_test':o.type='sine';o.frequency.setValueAtTime(494,t);o.frequency.linearRampToValueAtTime(659,t+0.1);o.frequency.linearRampToValueAtTime(784,t+0.2);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'review_open':o.type='sine';o.frequency.setValueAtTime(370,t);o.frequency.linearRampToValueAtTime(494,t+0.08);o.frequency.linearRampToValueAtTime(622,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'quiz_correct':o.type='sine';o.frequency.setValueAtTime(659,t);o.frequency.setValueAtTime(784,t+0.08);o.frequency.setValueAtTime(988,t+0.16);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'quiz_wrong':o.type='sawtooth';o.frequency.setValueAtTime(220,t);o.frequency.linearRampToValueAtTime(165,t+0.2);g.gain.setValueAtTime(0.06,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'v18_achieve':o.type='sine';o.frequency.setValueAtTime(784,t);o.frequency.setValueAtTime(988,t+0.1);o.frequency.setValueAtTime(1175,t+0.2);o.frequency.setValueAtTime(1568,t+0.3);g.gain.exponentialRampToValueAtTime(0.01,t+0.5);o.start(t);o.stop(t+0.5);break;default:o.type='sine';o.frequency.setValueAtTime(440,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.15);o.start(t);o.stop(t+0.15)}}

function lsGet(k,d){try{var v=localStorage.getItem(LS+k);return v?JSON.parse(v):d}catch(e){return d}}
function lsSet(k,v){try{localStorage.setItem(LS+k,JSON.stringify(v))}catch(e){}}
function todayStr(){return new Date().toISOString().slice(0,10)}
function showToast(msg){var t=document.createElement('div');t.className='v18-toast';t.textContent=msg;document.body.appendChild(t);setTimeout(function(){t.classList.add('show')},50);setTimeout(function(){t.classList.remove('show');setTimeout(function(){t.remove()},400)},3000)}
function createOverlay(id){var ov=document.createElement('div');ov.className='v18-overlay';ov.id='v18-'+id;ov.addEventListener('click',function(e){if(e.target===ov)closePanel(id)});var pn=document.createElement('div');pn.className='v18-panel';pn.style.position='relative';ov.appendChild(pn);return pn}
function openPanel(id){var el=document.getElementById('v18-'+id);if(el)el.classList.add('active')}
function closePanel(id){var el=document.getElementById('v18-'+id);if(el)el.classList.remove('active')}
function getPanel(id){var ov=document.getElementById('v18-'+id);if(!ov){var pn=createOverlay(id);pn.id='v18-'+id+'-panel';document.body.appendChild(pn.parentElement);return pn}return ov.querySelector('.v18-panel')||ov}

// ===== 1. SWING CONSISTENCY ANALYZER Canvas 600x380 =====
function showSwingConsistency(){
playSfx('swing_open');
var pn=getPanel('swingcon');
var data=lsGet('swing_con',[]);
var CLUBS=['DR','3W','5W','3H','4I','5I','6I','7I','8I','9I','PW','AW','SW','LW'];
var METRICS=['템포','백스윗길이','팔로스루','체중이동','헤드스피드'];
var html='<button class="v18-close" onclick="window._v18Close(\'swingcon\')">&times;</button>';
html+='<div class="v18-title">🏌️ 스윙 일관성 분석기</div>';
html+='<div class="v18-card"><h3>스윙 데이터 입력</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v18-label">클럽</label><select id="v18-sc-club" class="v18-input">';
for(var c=0;c<CLUBS.length;c++) html+='<option>'+CLUBS[c]+'</option>';
html+='</select></div>';
html+='<div><label class="v18-label">템포 (BPM)</label><input type="number" id="v18-sc-tempo" class="v18-input" min="40" max="150" value="85"></div>';
html+='<div><label class="v18-label">헤드스피드 (mph)</label><input type="number" id="v18-sc-speed" class="v18-input" min="30" max="130" value="90"></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:6px">';
html+='<div><label class="v18-label">백스윗길이 (m)</label><input type="number" id="v18-sc-backswing" class="v18-input" step="0.1" min="0.5" max="3" value="1.8"></div>';
html+='<div><label class="v18-label">팔로스루 (1~10)</label><input type="number" id="v18-sc-follow" class="v18-input" min="1" max="10" value="7"></div>';
html+='<div><label class="v18-label">체중이동 (1~10)</label><input type="number" id="v18-sc-weight" class="v18-input" min="1" max="10" value="7"></div>';
html+='</div>';
html+='<button class="v18-btn v18-btn-primary" style="width:100%;margin-top:8px" onclick="window._v18RecordSwing()">저장</button>';
html+='</div>';
html+='<canvas id="v18-sc-canvas" width="600" height="380" style="width:100%;max-width:600px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';
var totalSwings=data.length;
var avgTempo=0,avgSpeed=0,tempoSD=0,speedSD=0;
if(totalSwings>0){
  var tSum=0,sSum=0;for(var i=0;i<data.length;i++){tSum+=data[i].tempo;sSum+=data[i].speed;}
  avgTempo=Math.round(tSum/totalSwings*10)/10;avgSpeed=Math.round(sSum/totalSwings*10)/10;
  var tVar=0,sVar=0;for(var j=0;j<data.length;j++){tVar+=Math.pow(data[j].tempo-avgTempo,2);sVar+=Math.pow(data[j].speed-avgSpeed,2);}
  tempoSD=Math.round(Math.sqrt(tVar/totalSwings)*10)/10;speedSD=Math.round(Math.sqrt(sVar/totalSwings)*10)/10;
}
var conGrade=tempoSD<3&&speedSD<3?'S':tempoSD<5&&speedSD<5?'A':tempoSD<8&&speedSD<8?'B':tempoSD<12&&speedSD<12?'C':'D';
html+='<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin:8px 0">';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#00FF88">'+totalSwings+'</div><div class="v18-stat-label">총 기록</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#00B4D8">'+avgTempo+'</div><div class="v18-stat-label">평균 BPM</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#FFB800">'+avgSpeed+'</div><div class="v18-stat-label">평균 mph</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#A855F7">&plusmn;'+tempoSD+'</div><div class="v18-stat-label">템포 SD</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:'+(conGrade==='S'||conGrade==='A'?'#00FF88':conGrade==='B'?'#FFB800':'#FF3366')+'">'+conGrade+'</div><div class="v18-stat-label">일관성</div></div>';
html+='</div>';
html+='<div class="v18-card"><h3>💡 스윙 일관성 가이드</h3>';
html+='<div style="font-size:.82em;color:#aaa;line-height:1.7">';
html+='<div>• S등급: 템포/스피드 SD &lt; 3 (투어 프로 수준)</div>';
html+='<div>• A등급: SD &lt; 5 (상급 아마추어)</div>';
html+='<div>• B등급: SD &lt; 8 (평균 근 일관성)</div>';
html+='<div>• 템포 일관성이 비거리 일관성보다 중요</div>';
html+='</div></div>';
if(data.length>0){html+='<button class="v18-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'스윙 데이터를 초기화할까요?\'))window._v18ResetSwing()">초기화</button>';}
pn.innerHTML=html;openPanel('swingcon');drawSwingCanvas(data);
}
window._v18RecordSwing=function(){var club=document.getElementById('v18-sc-club').value;var tempo=parseFloat(document.getElementById('v18-sc-tempo').value)||85;var speed=parseFloat(document.getElementById('v18-sc-speed').value)||90;var bs=parseFloat(document.getElementById('v18-sc-backswing').value)||1.8;var fl=parseInt(document.getElementById('v18-sc-follow').value)||7;var wt=parseInt(document.getElementById('v18-sc-weight').value)||7;var data=lsGet('swing_con',[]);data.push({club:club,tempo:tempo,speed:speed,bs:bs,fl:fl,wt:wt,date:todayStr()});if(data.length>500)data=data.slice(-500);lsSet('swing_con',data);playSfx('swing_record');showToast('스윙 기록 저장 ('+club+' '+tempo+'BPM)');showSwingConsistency()};
window._v18ResetSwing=function(){lsSet('swing_con',[]);showSwingConsistency()};

function drawSwingCanvas(data){
var c=document.getElementById('v18-sc-canvas');if(!c)return;
var ctx=c.getContext('2d');var W=600,H=380;
ctx.fillStyle='#0c1018';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00FF88';ctx.font='bold 15px sans-serif';ctx.fillText('Swing Consistency Analyzer',20,28);
ctx.fillStyle='#555';ctx.font='11px sans-serif';ctx.fillText('Tempo vs Head Speed Scatter + Trend',20,46);
if(data.length===0){ctx.fillStyle='#444';ctx.font='14px sans-serif';ctx.fillText('No data yet - record your swings!',W/2-120,H/2);return}
var padL=60,padR=30,padT=65,padB=50;
var chartW=W-padL-padR,chartH=H-padT-padB;
var minT=999,maxT=0,minS=999,maxS=0;
for(var i=0;i<data.length;i++){if(data[i].tempo<minT)minT=data[i].tempo;if(data[i].tempo>maxT)maxT=data[i].tempo;if(data[i].speed<minS)minS=data[i].speed;if(data[i].speed>maxS)maxS=data[i].speed;}
minT=Math.floor(minT/5)*5-5;maxT=Math.ceil(maxT/5)*5+5;minS=Math.floor(minS/5)*5-5;maxS=Math.ceil(maxS/5)*5+5;
if(maxT-minT<10){minT-=5;maxT+=5}if(maxS-minS<10){minS-=5;maxS+=5}
ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.lineWidth=1;
for(var gy=0;gy<=4;gy++){var yy=padT+chartH-(gy/4)*chartH;ctx.beginPath();ctx.moveTo(padL,yy);ctx.lineTo(padL+chartW,yy);ctx.stroke();ctx.fillStyle='#666';ctx.font='10px sans-serif';ctx.fillText(Math.round(minS+(maxS-minS)*gy/4)+' mph',4,yy+4)}
for(var gx=0;gx<=4;gx++){var xx=padL+(gx/4)*chartW;ctx.beginPath();ctx.moveTo(xx,padT);ctx.lineTo(xx,padT+chartH);ctx.stroke();ctx.fillStyle='#666';ctx.font='10px sans-serif';ctx.fillText(Math.round(minT+(maxT-minT)*gx/4)+' BPM',xx-15,H-padB+20)}
var colors={'DR':'#FF6B6B','3W':'#FF9F43','5W':'#FECA57','3H':'#48DBFB','4I':'#00D2D3','5I':'#54A0FF','6I':'#5F27CD','7I':'#A855F7','8I':'#00FF88','9I':'#10AC84','PW':'#F368E0','AW':'#C44569','SW':'#FFB800','LW':'#778CA3'};
for(var di=0;di<data.length;di++){var d=data[di];var px=padL+((d.tempo-minT)/(maxT-minT))*chartW;var py=padT+chartH-((d.speed-minS)/(maxS-minS))*chartH;ctx.globalAlpha=0.7;ctx.fillStyle=colors[d.club]||'#00FF88';ctx.beginPath();ctx.arc(px,py,5,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1}
if(data.length>=3){var sumX=0,sumY=0,sumXY=0,sumXX=0,n=data.length;for(var ti=0;ti<n;ti++){sumX+=data[ti].tempo;sumY+=data[ti].speed;sumXY+=data[ti].tempo*data[ti].speed;sumXX+=data[ti].tempo*data[ti].tempo}var slope=(n*sumXY-sumX*sumY)/(n*sumXX-sumX*sumX);var intercept=(sumY-slope*sumX)/n;ctx.strokeStyle='rgba(0,255,136,0.4)';ctx.lineWidth=2;ctx.setLineDash([6,4]);ctx.beginPath();var y1=slope*minT+intercept,y2=slope*maxT+intercept;ctx.moveTo(padL,padT+chartH-((y1-minS)/(maxS-minS))*chartH);ctx.lineTo(padL+chartW,padT+chartH-((y2-minS)/(maxS-minS))*chartH);ctx.stroke();ctx.setLineDash([])}
ctx.fillStyle='#888';ctx.font='10px sans-serif';ctx.fillText('X: Tempo (BPM)',W/2-40,H-8);ctx.save();ctx.translate(14,H/2+30);ctx.rotate(-Math.PI/2);ctx.fillText('Y: Head Speed (mph)',0,0);ctx.restore();
var legendX=padL+10,legendY=padT+10;var clubs=Object.keys(colors);var lx=legendX;
for(var li=0;li<clubs.length;li++){ctx.fillStyle=colors[clubs[li]];ctx.fillRect(lx,legendY,8,8);ctx.fillStyle='#999';ctx.font='9px sans-serif';ctx.fillText(clubs[li],lx+10,legendY+8);lx+=38;if(lx>W-80){lx=legendX;legendY+=14}}
}

// ===== 2. HOLE-BY-HOLE STRATEGY PLANNER Canvas 620x380 =====
function showHoleStrategy(){
playSfx('strategy_open');
var pn=getPanel('holestrategy');
var data=lsGet('hole_strategy',{});
var curHole=lsGet('cur_hole',1);
var CLUBS=['DR','3W','5W','3H','4I','5I','6I','7I','8I','9I','PW','AW','SW','LW','PT'];
var html='<button class="v18-close" onclick="window._v18Close(\'holestrategy\')">&times;</button>';
html+='<div class="v18-title">🏌️ 홈별 전략 플래너</div>';
html+='<div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:10px">';
for(var h=1;h<=18;h++){var filled=data['h'+h]?'background:rgba(0,255,136,.12);border-color:rgba(0,255,136,.3)':'';var act=h===curHole?'border-color:#00FF88;background:rgba(0,255,136,.2);color:#00FF88':'';html+='<button class="v18-btn" style="min-width:36px;padding:6px 0;font-size:.85em;'+filled+';'+act+'" onclick="window._v18SetHole('+h+')">'+h+'</button>';}
html+='</div>';
html+='<div class="v18-card"><h3>Hole '+curHole+' 전략</h3>';
var hd=data['h'+curHole]||{par:4,dist:380,tee:'DR',approach:'7I',note:''};
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v18-label">Par</label><select id="v18-hs-par" class="v18-input"><option '+(hd.par===3?'selected':'')+'>3</option><option '+(hd.par===4?'selected':'')+'>4</option><option '+(hd.par===5?'selected':'')+'>5</option></select></div>';
html+='<div><label class="v18-label">거리(yd)</label><input type="number" id="v18-hs-dist" class="v18-input" value="'+(hd.dist||380)+'" min="80" max="650"></div>';
html+='<div><label class="v18-label">티샷 클럽</label><select id="v18-hs-tee" class="v18-input">';
for(var tc=0;tc<CLUBS.length;tc++){html+='<option '+(hd.tee===CLUBS[tc]?'selected':'')+'>'+CLUBS[tc]+'</option>'}
html+='</select></div>';
html+='<div><label class="v18-label">어프로치</label><select id="v18-hs-approach" class="v18-input">';
for(var ac=0;ac<CLUBS.length;ac++){html+='<option '+(hd.approach===CLUBS[ac]?'selected':'')+'>'+CLUBS[ac]+'</option>'}
html+='</select></div>';
html+='</div>';
html+='<div style="margin-top:8px"><label class="v18-label">전략 메모</label><textarea id="v18-hs-note" class="v18-input" rows="2" style="resize:vertical" placeholder="해저드, 풋 위치, 바람 등 메모">'+((hd.note||'').replace(/</g,'&lt;'))+'</textarea></div>';
html+='<button class="v18-btn v18-btn-primary" style="width:100%;margin-top:8px" onclick="window._v18SaveHole()">저장</button>';
html+='</div>';
html+='<canvas id="v18-hs-canvas" width="620" height="380" style="width:100%;max-width:620px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';
var filledCount=0;for(var fk in data)if(data.hasOwnProperty(fk))filledCount++;
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#00FF88">'+filledCount+'/18</div><div class="v18-stat-label">전략 완성</div></div>';
var totalPar=0;for(var pk=1;pk<=18;pk++){var phd=data['h'+pk];totalPar+=phd?parseInt(phd.par)||4:4}
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#FFB800">'+totalPar+'</div><div class="v18-stat-label">총 Par</div></div>';
var totalDist=0;for(var dk=1;dk<=18;dk++){var dhd=data['h'+dk];totalDist+=dhd?parseInt(dhd.dist)||0:0}
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#00B4D8">'+(totalDist||'-')+'</div><div class="v18-stat-label">총 거리(yd)</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('holestrategy');drawHoleCanvas(data);
}
window._v18SetHole=function(h){lsSet('cur_hole',h);showHoleStrategy()};
window._v18SaveHole=function(){var data=lsGet('hole_strategy',{});var h=lsGet('cur_hole',1);data['h'+h]={par:parseInt(document.getElementById('v18-hs-par').value)||4,dist:parseInt(document.getElementById('v18-hs-dist').value)||380,tee:document.getElementById('v18-hs-tee').value,approach:document.getElementById('v18-hs-approach').value,note:document.getElementById('v18-hs-note').value.slice(0,200)};lsSet('hole_strategy',data);playSfx('swing_record');showToast('Hole '+h+' 전략 저장');showHoleStrategy()};

function drawHoleCanvas(data){
var c=document.getElementById('v18-hs-canvas');if(!c)return;
var ctx=c.getContext('2d');var W=620,H=380;
ctx.fillStyle='#0c1018';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00FF88';ctx.font='bold 15px sans-serif';ctx.fillText('18-Hole Strategy Map',20,28);
ctx.fillStyle='#555';ctx.font='11px sans-serif';ctx.fillText('Par / Distance / Club Selection Overview',20,46);
var padL=50,padR=20,padT=65,padB=60;
var chartW=W-padL-padR,chartH=H-padT-padB;
var barW=chartW/18-4;
for(var h=1;h<=18;h++){
  var hd=data['h'+h];var par=hd?parseInt(hd.par)||4:0;var dist=hd?parseInt(hd.dist)||0:0;
  var x=padL+(h-1)*(chartW/18)+2;
  var parColor=par===3?'#48DBFB':par===5?'#FF9F43':'#00FF88';
  if(par>0){var barH=(par/5)*chartH*0.5;ctx.fillStyle=parColor;ctx.globalAlpha=0.3;ctx.fillRect(x,padT+chartH-barH,barW,barH);ctx.globalAlpha=1;ctx.fillStyle=parColor;ctx.fillRect(x,padT+chartH-barH,barW,3)}
  if(dist>0){var maxDist=650;var dBarH=(dist/maxDist)*chartH*0.8;ctx.fillStyle='rgba(0,180,216,0.4)';ctx.fillRect(x+barW*0.3,padT+chartH-dBarH,barW*0.4,dBarH);ctx.fillStyle='#00B4D8';ctx.font='bold 9px sans-serif';ctx.fillText(dist+'',x+barW*0.1,padT+chartH-dBarH-4)}
  ctx.fillStyle=hd?'#ccc':'#444';ctx.font='10px sans-serif';ctx.fillText(h+'',x+barW/2-4,H-padB+16);
  if(hd&&hd.tee){ctx.fillStyle='#888';ctx.font='8px sans-serif';ctx.fillText(hd.tee,x+barW/2-8,H-padB+30)}
}
ctx.fillStyle='#48DBFB';ctx.fillRect(padL+10,H-18,8,8);ctx.fillStyle='#888';ctx.font='10px sans-serif';ctx.fillText('Par 3',padL+22,H-10);
ctx.fillStyle='#00FF88';ctx.fillRect(padL+70,H-18,8,8);ctx.fillText('Par 4',padL+82,H-10);
ctx.fillStyle='#FF9F43';ctx.fillRect(padL+130,H-18,8,8);ctx.fillText('Par 5',padL+142,H-10);
ctx.fillStyle='#00B4D8';ctx.fillRect(padL+190,H-18,8,8);ctx.fillText('Distance',padL+202,H-10);
}

// ===== 3. CLUB REPLACEMENT TRACKER Canvas 580x360 =====
function showClubReplace(){
playSfx('club_replace');
var pn=getPanel('clubreplace');
var data=lsGet('club_replace',{});
var CLUBS=[{name:'DR',life:300},{name:'3W',life:250},{name:'5W',life:250},{name:'3H',life:250},{name:'4I',life:350},{name:'5I',life:350},{name:'6I',life:350},{name:'7I',life:350},{name:'8I',life:350},{name:'9I',life:350},{name:'PW',life:400},{name:'AW',life:400},{name:'SW',life:400},{name:'LW',life:400},{name:'PT',life:500}];
var html='<button class="v18-close" onclick="window._v18Close(\'clubreplace\')">&times;</button>';
html+='<div class="v18-title">🔧 클럽 교체 시기 트래커</div>';
html+='<div class="v18-card"><h3>사용량 기록</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v18-label">클럽</label><select id="v18-cr-club" class="v18-input">';
for(var ci=0;ci<CLUBS.length;ci++) html+='<option>'+CLUBS[ci].name+'</option>';
html+='</select></div>';
html+='<div><label class="v18-label">타수 추가</label><input type="number" id="v18-cr-shots" class="v18-input" value="20" min="1" max="200"></div>';
html+='<div style="display:flex;align-items:flex-end"><button class="v18-btn v18-btn-primary" style="width:100%" onclick="window._v18AddShots()">추가</button></div>';
html+='</div></div>';
html+='<canvas id="v18-cr-canvas" width="580" height="360" style="width:100%;max-width:580px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
var alertCount=0,totalShots=0;
for(var ai=0;ai<CLUBS.length;ai++){var shots=data[CLUBS[ai].name]||0;totalShots+=shots;if(shots>=CLUBS[ai].life*0.8)alertCount++}
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#00FF88">'+totalShots+'</div><div class="v18-stat-label">총 타수</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:'+(alertCount>0?'#FF3366':'#00FF88')+'">'+alertCount+'</div><div class="v18-stat-label">교체 알림</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#FFB800">'+CLUBS.length+'</div><div class="v18-stat-label">총 클럽</div></div>';
html+='</div>';
html+='<div class="v18-card"><h3>📋 클럽별 수명</h3>';
html+='<div style="font-size:.8em;color:#aaa;line-height:1.7">';
html+='<div>• 드라이버: ~300R | 우드: ~250R</div>';
html+='<div>• 아이언: ~350R | 웨지: ~400R</div>';
html+='<div>• 퍼터: ~500R | ⚠️ 80% 이상 사용시 경고</div>';
html+='</div></div>';
if(totalShots>0){html+='<button class="v18-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'클럽 사용량 초기화?\'))window._v18ResetClubReplace()">초기화</button>';}
pn.innerHTML=html;openPanel('clubreplace');drawClubReplaceCanvas(data,CLUBS);
}
window._v18AddShots=function(){var club=document.getElementById('v18-cr-club').value;var shots=parseInt(document.getElementById('v18-cr-shots').value)||20;var data=lsGet('club_replace',{});data[club]=(data[club]||0)+shots;lsSet('club_replace',data);playSfx('swing_record');showToast(club+' +'+shots+' 타');showClubReplace()};
window._v18ResetClubReplace=function(){lsSet('club_replace',{});showClubReplace()};

function drawClubReplaceCanvas(data,CLUBS){
var c=document.getElementById('v18-cr-canvas');if(!c)return;
var ctx=c.getContext('2d');var W=580,H=360;
ctx.fillStyle='#0c1018';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00FF88';ctx.font='bold 15px sans-serif';ctx.fillText('Club Life Cycle Tracker',20,28);
ctx.fillStyle='#555';ctx.font='11px sans-serif';ctx.fillText('Usage vs Recommended Lifespan',20,46);
var padL=55,padR=20,padT=65,padB=40;var chartW=W-padL-padR,chartH=H-padT-padB;
var barH=chartH/CLUBS.length-3;
for(var i=0;i<CLUBS.length;i++){
  var cl=CLUBS[i];var shots=data[cl.name]||0;var pct=Math.min(shots/cl.life,1.2);
  var y=padT+i*(chartH/CLUBS.length);
  var barColor=pct>=1?'#FF3366':pct>=0.8?'#FFB800':'#00FF88';
  ctx.fillStyle='rgba(255,255,255,0.03)';ctx.fillRect(padL,y,chartW,barH);
  ctx.fillStyle=barColor;ctx.globalAlpha=0.6;ctx.fillRect(padL,y,Math.min(pct,1)*chartW,barH);ctx.globalAlpha=1;
  if(pct>=0.8){ctx.strokeStyle='rgba(255,51,102,0.3)';ctx.lineWidth=1;ctx.setLineDash([3,3]);ctx.beginPath();ctx.moveTo(padL+0.8*chartW,y);ctx.lineTo(padL+0.8*chartW,y+barH);ctx.stroke();ctx.setLineDash([])}
  ctx.fillStyle='#ccc';ctx.font='10px sans-serif';ctx.fillText(cl.name,8,y+barH/2+4);
  ctx.fillStyle='#999';ctx.font='9px sans-serif';ctx.fillText(shots+'/'+cl.life,padL+Math.min(pct,1)*chartW+6,y+barH/2+3);
  if(pct>=1){ctx.fillStyle='#FF3366';ctx.font='bold 9px sans-serif';ctx.fillText('REPLACE!',padL+chartW-50,y+barH/2+3)}
}
}

// ===== 4. ROUND COST CALCULATOR Canvas 580x360 =====
function showRoundCost(){
playSfx('cost_calc');
var pn=getPanel('roundcost');
var data=lsGet('round_costs',[]);
var html='<button class="v18-close" onclick="window._v18Close(\'roundcost\')">&times;</button>';
html+='<div class="v18-title">💰 라운드 비용 계산기</div>';
html+='<div class="v18-card"><h3>비용 입력</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v18-label">그린피(만원)</label><input type="number" id="v18-rc-green" class="v18-input" value="10" min="0" max="100"></div>';
html+='<div><label class="v18-label">카트(만원)</label><input type="number" id="v18-rc-cart" class="v18-input" value="2" min="0" max="20"></div>';
html+='<div><label class="v18-label">캐디피(만원)</label><input type="number" id="v18-rc-caddie" class="v18-input" value="3" min="0" max="20"></div>';
html+='<div><label class="v18-label">식사(만원)</label><input type="number" id="v18-rc-food" class="v18-input" value="3" min="0" max="20"></div>';
html+='<div><label class="v18-label">교통/주유(만원)</label><input type="number" id="v18-rc-transport" class="v18-input" value="3" min="0" max="30"></div>';
html+='<div><label class="v18-label">기타(만원)</label><input type="number" id="v18-rc-etc" class="v18-input" value="1" min="0" max="30"></div>';
html+='</div>';
html+='<button class="v18-btn v18-btn-primary" style="width:100%;margin-top:8px" onclick="window._v18SaveCost()">저장</button>';
html+='</div>';
html+='<canvas id="v18-rc-canvas" width="580" height="360" style="width:100%;max-width:580px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';
var totalRounds=data.length;var totalSpent=0,avgCost=0;
if(totalRounds>0){for(var i=0;i<data.length;i++)totalSpent+=data[i].total;avgCost=Math.round(totalSpent/totalRounds*10)/10}
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#00FF88">'+totalRounds+'</div><div class="v18-stat-label">총 라운드</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#FFB800">'+totalSpent+'만</div><div class="v18-stat-label">총 지출</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#00B4D8">'+avgCost+'만</div><div class="v18-stat-label">평균/R</div></div>';
html+='</div>';
if(data.length>0){html+='<button class="v18-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'비용 데이터 초기화?\'))window._v18ResetCost()">초기화</button>';}
pn.innerHTML=html;openPanel('roundcost');drawCostCanvas(data);
}
window._v18SaveCost=function(){var green=parseFloat(document.getElementById('v18-rc-green').value)||0;var cart=parseFloat(document.getElementById('v18-rc-cart').value)||0;var caddie=parseFloat(document.getElementById('v18-rc-caddie').value)||0;var food=parseFloat(document.getElementById('v18-rc-food').value)||0;var transport=parseFloat(document.getElementById('v18-rc-transport').value)||0;var etc=parseFloat(document.getElementById('v18-rc-etc').value)||0;var total=green+cart+caddie+food+transport+etc;var data=lsGet('round_costs',[]);data.push({green:green,cart:cart,caddie:caddie,food:food,transport:transport,etc:etc,total:total,date:todayStr()});if(data.length>200)data=data.slice(-200);lsSet('round_costs',data);playSfx('cost_calc');showToast('비용 저장 ('+total+'만원)');showRoundCost()};
window._v18ResetCost=function(){lsSet('round_costs',[]);showRoundCost()};

function drawCostCanvas(data){
var c=document.getElementById('v18-rc-canvas');if(!c)return;
var ctx=c.getContext('2d');var W=580,H=360;
ctx.fillStyle='#0c1018';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00FF88';ctx.font='bold 15px sans-serif';ctx.fillText('Round Cost Analysis',20,28);
ctx.fillStyle='#555';ctx.font='11px sans-serif';ctx.fillText('Cost Breakdown & Trend',20,46);
if(data.length===0){ctx.fillStyle='#444';ctx.font='14px sans-serif';ctx.fillText('No data yet',W/2-40,H/2);return}
var cx=160,cy=200,r=90;
var latest=data[data.length-1];
var items=[{label:'Green Fee',val:latest.green,color:'#00FF88'},{label:'Cart',val:latest.cart,color:'#48DBFB'},{label:'Caddie',val:latest.caddie,color:'#FFB800'},{label:'Food',val:latest.food,color:'#FF9F43'},{label:'Transport',val:latest.transport,color:'#A855F7'},{label:'Etc',val:latest.etc,color:'#FF6B6B'}];
var total=latest.total||1;var startAngle=-Math.PI/2;
for(var i=0;i<items.length;i++){var angle=(items[i].val/total)*Math.PI*2;if(items[i].val<=0)continue;ctx.fillStyle=items[i].color;ctx.globalAlpha=0.7;ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,startAngle,startAngle+angle);ctx.closePath();ctx.fill();ctx.globalAlpha=1;var midA=startAngle+angle/2;var lx=cx+Math.cos(midA)*(r+16);var ly=cy+Math.sin(midA)*(r+16);ctx.fillStyle='#ccc';ctx.font='9px sans-serif';ctx.fillText(items[i].label+' '+Math.round(items[i].val/total*100)+'%',lx-20,ly+4);startAngle+=angle}
ctx.fillStyle='#0c1018';ctx.beginPath();ctx.arc(cx,cy,50,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#FFB800';ctx.font='bold 18px sans-serif';ctx.fillText(latest.total+'만',cx-22,cy+6);
if(data.length>=2){var trendX=330,trendW=220,trendH=200,trendY=80;ctx.fillStyle='#00FF88';ctx.font='bold 12px sans-serif';ctx.fillText('Cost Trend',trendX,trendY-10);var maxCost=0;for(var mi=0;mi<data.length;mi++){if(data[mi].total>maxCost)maxCost=data[mi].total}maxCost=Math.max(maxCost,1);var showData=data.slice(-15);ctx.strokeStyle='rgba(0,255,136,0.6)';ctx.lineWidth=2;ctx.beginPath();for(var si=0;si<showData.length;si++){var px=trendX+(si/(showData.length-1||1))*trendW;var py=trendY+trendH-(showData[si].total/maxCost)*trendH;if(si===0)ctx.moveTo(px,py);else ctx.lineTo(px,py)}ctx.stroke();for(var di=0;di<showData.length;di++){var dpx=trendX+(di/(showData.length-1||1))*trendW;var dpy=trendY+trendH-(showData[di].total/maxCost)*trendH;ctx.fillStyle='#00FF88';ctx.beginPath();ctx.arc(dpx,dpy,3,0,Math.PI*2);ctx.fill()}}
}

// ===== 5. PUTTING GREEN SPEED CALIBRATOR Canvas 560x340 =====
function showGreenSpeed(){
playSfx('green_speed');
var pn=getPanel('greenspeed');
var data=lsGet('green_speed',[]);
var html='<button class="v18-close" onclick="window._v18Close(\'greenspeed\')">&times;</button>';
html+='<div class="v18-title">⛳ 퍼팅 그린스피드 캘리브레이터</div>';
html+='<div class="v18-card"><h3>그린스피드 측정</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v18-label">Stimp 수치</label><input type="number" id="v18-gs-stimp" class="v18-input" step="0.5" value="9" min="4" max="16"></div>';
html+='<div><label class="v18-label">경사도 (%)</label><input type="number" id="v18-gs-slope" class="v18-input" step="0.5" value="0" min="-8" max="8"></div>';
html+='<div><label class="v18-label">코스명</label><input type="text" id="v18-gs-course" class="v18-input" value="" placeholder="코스명"></div>';
html+='</div>';
html+='<button class="v18-btn v18-btn-primary" style="width:100%;margin-top:8px" onclick="window._v18SaveGreen()">측정 저장</button>';
html+='</div>';
html+='<canvas id="v18-gs-canvas" width="560" height="340" style="width:100%;max-width:560px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';
var avgStimp=0,fastCount=0;
if(data.length>0){var stSum=0;for(var si=0;si<data.length;si++){stSum+=data[si].stimp;if(data[si].stimp>=11)fastCount++}avgStimp=Math.round(stSum/data.length*10)/10}
var speedGrade=avgStimp>=12?'Tour Fast':avgStimp>=10?'Fast':avgStimp>=8?'Medium':avgStimp>=6?'Slow':'Very Slow';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#00FF88">'+data.length+'</div><div class="v18-stat-label">측정횟수</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#FFB800">'+avgStimp+'</div><div class="v18-stat-label">평균 Stimp</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#00B4D8">'+speedGrade+'</div><div class="v18-stat-label">스피드 등급</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#A855F7">'+fastCount+'</div><div class="v18-stat-label">Fast (11+)</div></div>';
html+='</div>';
html+='<div class="v18-card"><h3>📝 Stimpmeter 가이드</h3>';
html+='<div style="font-size:.82em;color:#aaa;line-height:1.7">';
html+='<div>• 4~6: 평일 아마추어 코스</div>';
html+='<div>• 7~9: 일반 코스 평균</div>';
html+='<div>• 10~11: 하이엔드 코스 / 토너먼트</div>';
html+='<div>• 12~14: 투어 프로 수준 (PGA/LPGA)</div>';
html+='<div>• 15+: 오거스타/마스터즈 특별 세팅</div>';
html+='</div></div>';
if(data.length>0){html+='<button class="v18-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'그린스피드 초기화?\'))window._v18ResetGreen()">초기화</button>';}
pn.innerHTML=html;openPanel('greenspeed');drawGreenCanvas(data);
}
window._v18SaveGreen=function(){var stimp=parseFloat(document.getElementById('v18-gs-stimp').value)||9;var slope=parseFloat(document.getElementById('v18-gs-slope').value)||0;var course=document.getElementById('v18-gs-course').value.slice(0,30);var data=lsGet('green_speed',[]);data.push({stimp:stimp,slope:slope,course:course,date:todayStr()});if(data.length>100)data=data.slice(-100);lsSet('green_speed',data);playSfx('green_speed');showToast('Stimp '+stimp+' 저장');showGreenSpeed()};
window._v18ResetGreen=function(){lsSet('green_speed',[]);showGreenSpeed()};

function drawGreenCanvas(data){
var c=document.getElementById('v18-gs-canvas');if(!c)return;
var ctx=c.getContext('2d');var W=560,H=340;
ctx.fillStyle='#0c1018';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00FF88';ctx.font='bold 15px sans-serif';ctx.fillText('Green Speed History',20,28);
ctx.fillStyle='#555';ctx.font='11px sans-serif';ctx.fillText('Stimpmeter Readings Over Time',20,46);
if(data.length===0){ctx.fillStyle='#444';ctx.font='14px sans-serif';ctx.fillText('No readings yet',W/2-50,H/2);return}
var padL=50,padR=20,padT=65,padB=50;var chartW=W-padL-padR,chartH=H-padT-padB;
var zones=[{min:4,max:6,label:'Slow',color:'rgba(255,107,107,0.08)'},{min:6,max:8,label:'Medium-Slow',color:'rgba(255,184,0,0.06)'},{min:8,max:10,label:'Medium',color:'rgba(0,255,136,0.06)'},{min:10,max:12,label:'Fast',color:'rgba(0,180,216,0.08)'},{min:12,max:16,label:'Tour',color:'rgba(168,85,247,0.08)'}];
for(var zi=0;zi<zones.length;zi++){var z=zones[zi];var y1=padT+chartH-((z.max-4)/12)*chartH;var y2=padT+chartH-((z.min-4)/12)*chartH;ctx.fillStyle=z.color;ctx.fillRect(padL,y1,chartW,y2-y1);ctx.fillStyle='#555';ctx.font='9px sans-serif';ctx.fillText(z.label,padL+chartW+2,y1+(y2-y1)/2+3)}
for(var gy=4;gy<=16;gy+=2){var yy=padT+chartH-((gy-4)/12)*chartH;ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.beginPath();ctx.moveTo(padL,yy);ctx.lineTo(padL+chartW,yy);ctx.stroke();ctx.fillStyle='#666';ctx.font='10px sans-serif';ctx.fillText(gy+'',padL-20,yy+4)}
var showData=data.slice(-20);
ctx.strokeStyle='#00FF88';ctx.lineWidth=2;ctx.beginPath();
for(var si=0;si<showData.length;si++){var px=padL+(si/(showData.length-1||1))*chartW;var py=padT+chartH-((showData[si].stimp-4)/12)*chartH;if(si===0)ctx.moveTo(px,py);else ctx.lineTo(px,py)}ctx.stroke();
for(var di=0;di<showData.length;di++){var dpx=padL+(di/(showData.length-1||1))*chartW;var dpy=padT+chartH-((showData[di].stimp-4)/12)*chartH;ctx.fillStyle=showData[di].stimp>=12?'#A855F7':showData[di].stimp>=10?'#00B4D8':showData[di].stimp>=8?'#00FF88':'#FFB800';ctx.beginPath();ctx.arc(dpx,dpy,4,0,Math.PI*2);ctx.fill();if(showData[di].course){ctx.fillStyle='#888';ctx.font='8px sans-serif';ctx.save();ctx.translate(dpx,dpy-10);ctx.rotate(-0.3);ctx.fillText(showData[di].course,0,0);ctx.restore()}}
}

// ===== 6. SHOT DISTANCE HISTOGRAM Canvas 580x360 =====
function showDistHistogram(){
playSfx('histogram_view');
var pn=getPanel('disthistogram');
var data=lsGet('dist_histogram',[]);
var CLUBS=['DR','3W','5W','3H','4I','5I','6I','7I','8I','9I','PW','AW','SW','LW'];
var html='<button class="v18-close" onclick="window._v18Close(\'disthistogram\')">&times;</button>';
html+='<div class="v18-title">📊 샷 거리 히스토그램</div>';
html+='<div class="v18-card"><h3>거리 기록</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v18-label">클럽</label><select id="v18-dh-club" class="v18-input">';
for(var ci=0;ci<CLUBS.length;ci++) html+='<option>'+CLUBS[ci]+'</option>';
html+='</select></div>';
html+='<div><label class="v18-label">거리 (yd)</label><input type="number" id="v18-dh-dist" class="v18-input" value="200" min="10" max="400"></div>';
html+='<div style="display:flex;align-items:flex-end"><button class="v18-btn v18-btn-primary" style="width:100%" onclick="window._v18RecordDist()">저장</button></div>';
html+='</div></div>';
html+='<div style="margin-bottom:8px"><label class="v18-label">클럽 필터</label><select id="v18-dh-filter" class="v18-input" onchange="window._v18RedrawHist()">';
html+='<option value="ALL">전체</option>';
for(var fi=0;fi<CLUBS.length;fi++) html+='<option>'+CLUBS[fi]+'</option>';
html+='</select></div>';
html+='<canvas id="v18-dh-canvas" width="580" height="360" style="width:100%;max-width:580px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';
var totalShots=data.length;var avgDist=0,maxDist=0;
if(totalShots>0){var dSum=0;for(var di=0;di<data.length;di++){dSum+=data[di].dist;if(data[di].dist>maxDist)maxDist=data[di].dist}avgDist=Math.round(dSum/totalShots)}
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#00FF88">'+totalShots+'</div><div class="v18-stat-label">총 기록</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#FFB800">'+avgDist+'yd</div><div class="v18-stat-label">평균 거리</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#00B4D8">'+maxDist+'yd</div><div class="v18-stat-label">최대 거리</div></div>';
html+='</div>';
if(data.length>0){html+='<button class="v18-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'거리 데이터 초기화?\'))window._v18ResetDist()">초기화</button>';}
pn.innerHTML=html;openPanel('disthistogram');drawDistHistCanvas(data,'ALL');
}
window._v18RecordDist=function(){var club=document.getElementById('v18-dh-club').value;var dist=parseInt(document.getElementById('v18-dh-dist').value)||200;var data=lsGet('dist_histogram',[]);data.push({club:club,dist:dist,date:todayStr()});if(data.length>500)data=data.slice(-500);lsSet('dist_histogram',data);playSfx('swing_record');showToast(club+' '+dist+'yd 기록');showDistHistogram()};
window._v18ResetDist=function(){lsSet('dist_histogram',[]);showDistHistogram()};
window._v18RedrawHist=function(){var filter=document.getElementById('v18-dh-filter').value;var data=lsGet('dist_histogram',[]);drawDistHistCanvas(data,filter)};

function drawDistHistCanvas(data,filter){
var c=document.getElementById('v18-dh-canvas');if(!c)return;
var ctx=c.getContext('2d');var W=580,H=360;
ctx.fillStyle='#0c1018';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00FF88';ctx.font='bold 15px sans-serif';ctx.fillText('Shot Distance Histogram',20,28);
ctx.fillStyle='#555';ctx.font='11px sans-serif';ctx.fillText('Distribution by '+(filter==='ALL'?'All Clubs':filter),20,46);
var filtered=filter==='ALL'?data:data.filter(function(d){return d.club===filter});
if(filtered.length===0){ctx.fillStyle='#444';ctx.font='14px sans-serif';ctx.fillText('No data for this filter',W/2-70,H/2);return}
var bins={};var binSize=20;var minBin=999,maxBin=0;
for(var i=0;i<filtered.length;i++){var bin=Math.floor(filtered[i].dist/binSize)*binSize;bins[bin]=(bins[bin]||0)+1;if(bin<minBin)minBin=bin;if(bin>maxBin)maxBin=bin}
var padL=50,padR=20,padT=65,padB=50;var chartW=W-padL-padR,chartH=H-padT-padB;
var numBins=((maxBin-minBin)/binSize)+1;var maxCount=0;
for(var bk in bins){if(bins.hasOwnProperty(bk)&&bins[bk]>maxCount)maxCount=bins[bk]}maxCount=Math.max(maxCount,1);
var barW=Math.min(chartW/numBins-2,40);
for(var b=minBin;b<=maxBin;b+=binSize){var idx=(b-minBin)/binSize;var count=bins[b]||0;var barH=(count/maxCount)*chartH;var x=padL+idx*(chartW/numBins)+(chartW/numBins-barW)/2;var y=padT+chartH-barH;
var grad=ctx.createLinearGradient(x,y,x,y+barH);grad.addColorStop(0,'#00FF88');grad.addColorStop(1,'rgba(0,255,136,0.2)');ctx.fillStyle=grad;ctx.fillRect(x,y,barW,barH);
if(count>0){ctx.fillStyle='#ccc';ctx.font='bold 10px sans-serif';ctx.fillText(count+'',x+barW/2-4,y-5)}
ctx.fillStyle='#888';ctx.font='9px sans-serif';ctx.fillText(b+'-'+(b+binSize),x-2,H-padB+16)}
ctx.fillStyle='#888';ctx.font='10px sans-serif';ctx.fillText('Distance (yd)',W/2-30,H-8);
for(var gy=0;gy<=4;gy++){var yy=padT+chartH-(gy/4)*chartH;ctx.strokeStyle='rgba(255,255,255,0.05)';ctx.beginPath();ctx.moveTo(padL,yy);ctx.lineTo(padL+chartW,yy);ctx.stroke();ctx.fillStyle='#666';ctx.font='10px sans-serif';ctx.fillText(Math.round(maxCount*gy/4)+'',padL-25,yy+4)}
}

// ===== 7. GOLF FITNESS TEST Canvas 560x360 =====
function showFitnessTest(){
playSfx('fitness_test');
var pn=getPanel('fitnesstest');
var data=lsGet('fitness_test',{});
var TESTS=['유연성','코어 근력','밸런스','포발력','지구력','회전 가동범위'];
var html='<button class="v18-close" onclick="window._v18Close(\'fitnesstest\')">&times;</button>';
html+='<div class="v18-title">💪 골프 체력 테스트</div>';
html+='<div class="v18-card"><h3>6항목 체력 평가</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
for(var ti=0;ti<TESTS.length;ti++){html+='<div><label class="v18-label">'+TESTS[ti]+' (1~10)</label><input type="number" id="v18-ft-'+ti+'" class="v18-input" min="1" max="10" value="'+(data['t'+ti]||5)+'"></div>'}
html+='</div>';
html+='<button class="v18-btn v18-btn-primary" style="width:100%;margin-top:8px" onclick="window._v18SaveFitness()">체력 측정 저장</button>';
html+='</div>';
html+='<canvas id="v18-ft-canvas" width="560" height="360" style="width:100%;max-width:560px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';
var total=0,count=0;for(var si=0;si<TESTS.length;si++){var v=data['t'+si]||0;if(v>0){total+=v;count++}}
var avg=count>0?Math.round(total/count*10)/10:0;
var grade=avg>=9?'S':avg>=7?'A':avg>=5?'B':avg>=3?'C':'D';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#00FF88">'+avg+'</div><div class="v18-stat-label">평균 점수</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:'+(grade==='S'||grade==='A'?'#00FF88':grade==='B'?'#FFB800':'#FF3366')+'">'+grade+'</div><div class="v18-stat-label">체력 등급</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#FFB800">'+total+'/60</div><div class="v18-stat-label">총점</div></div>';
html+='</div>';
html+='<div class="v18-card"><h3>💡 골프 체력 가이드</h3>';
html+='<div style="font-size:.82em;color:#aaa;line-height:1.7">';
html+='<div>• 유연성: 어드레스~핸 위치에서 하체 털기</div>';
html+='<div>• 코어: 플랭크 60초 유지 가능 여부</div>';
html+='<div>• 밸런스: 한발 서서 스윙 안정성</div>';
html+='<div>• 포발력: 점프/스쿼트 폭발 능력</div>';
html+='<div>• 지구력: 18홈 5시간 지속 가능 여부</div>';
html+='<div>• 회전: 어깨 + 골반 회전 범위 (90도+)</div>';
html+='</div></div>';
pn.innerHTML=html;openPanel('fitnesstest');drawFitnessCanvas(data,TESTS);
}
window._v18SaveFitness=function(){var data={};for(var i=0;i<6;i++){data['t'+i]=parseInt(document.getElementById('v18-ft-'+i).value)||5}data.date=todayStr();lsSet('fitness_test',data);playSfx('fitness_test');showToast('체력 테스트 저장');showFitnessTest()};

function drawFitnessCanvas(data,TESTS){
var c=document.getElementById('v18-ft-canvas');if(!c)return;
var ctx=c.getContext('2d');var W=560,H=360;
ctx.fillStyle='#0c1018';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00FF88';ctx.font='bold 15px sans-serif';ctx.fillText('Golf Fitness Radar',20,28);
ctx.fillStyle='#555';ctx.font='11px sans-serif';ctx.fillText('6-Axis Physical Assessment',20,46);
var cx=W/2,cy=H/2+15,r=110;var n=6;var angles=[];
for(var ai=0;ai<n;ai++){angles.push(-Math.PI/2+(ai/n)*Math.PI*2)}
for(var ring=2;ring<=10;ring+=2){ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.beginPath();for(var ri=0;ri<n;ri++){var rr=r*(ring/10);var ax=cx+Math.cos(angles[ri])*rr;var ay=cy+Math.sin(angles[ri])*rr;if(ri===0)ctx.moveTo(ax,ay);else ctx.lineTo(ax,ay)}ctx.closePath();ctx.stroke()}
for(var li=0;li<n;li++){var lx=cx+Math.cos(angles[li])*r;var ly=cy+Math.sin(angles[li])*r;ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(lx,ly);ctx.stroke();var tlx=cx+Math.cos(angles[li])*(r+20);var tly=cy+Math.sin(angles[li])*(r+20);ctx.fillStyle='#aaa';ctx.font='10px sans-serif';ctx.fillText(TESTS[li],tlx-20,tly+4)}
var vals=[];for(var vi=0;vi<n;vi++){vals.push(data['t'+vi]||0)}
if(vals.some(function(v){return v>0})){
ctx.fillStyle='rgba(0,255,136,0.15)';ctx.strokeStyle='#00FF88';ctx.lineWidth=2;ctx.beginPath();
for(var pi=0;pi<n;pi++){var pr=r*(vals[pi]/10);var px=cx+Math.cos(angles[pi])*pr;var py=cy+Math.sin(angles[pi])*pr;if(pi===0)ctx.moveTo(px,py);else ctx.lineTo(px,py)}
ctx.closePath();ctx.fill();ctx.stroke();
for(var di=0;di<n;di++){var dr=r*(vals[di]/10);var dx=cx+Math.cos(angles[di])*dr;var dy=cy+Math.sin(angles[di])*dr;ctx.fillStyle='#00FF88';ctx.beginPath();ctx.arc(dx,dy,4,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff';ctx.font='bold 10px sans-serif';ctx.fillText(vals[di]+'',dx+7,dy+4)}
}
}

// ===== 8. POST-ROUND REVIEW CHECKLIST Canvas 600x380 =====
function showRoundReview(){
playSfx('review_open');
var pn=getPanel('roundreview');
var data=lsGet('round_review',{});
var ITEMS=[
  {cat:'티샷',items:['페어웨이 안착률 확인','티샷 클럽 선택 적절했나','티샷 타깃 정확했나']},
  {cat:'어프로치',items:['그린 적중률 GIR 체크','클럽 선택 적절했나','바람/경사 보정 했나']},
  {cat:'쇼트게임',items:['칩/피치 성공률 확인','벙커 탈출 성공 여부','스크램블링 회수 체크']},
  {cat:'퍼팅',items:['3퍼트 이내 성공률','그린 리딩 정확했나','퍼팅 스트로크 일관성']},
  {cat:'멘탈',items:['프리샷 루틴 실행했나','미스샷 후 평정 유지','호흘 파 에서 무리하지 않았나']}
];
var html='<button class="v18-close" onclick="window._v18Close(\'roundreview\')">&times;</button>';
html+='<div class="v18-title">📝 라운드 복기 체크리스트</div>';
var totalItems=0,checkedItems=0;
for(var ci=0;ci<ITEMS.length;ci++){
  html+='<div class="v18-card"><h3>'+ITEMS[ci].cat+'</h3>';
  for(var ii=0;ii<ITEMS[ci].items.length;ii++){
    var key='c'+ci+'_'+ii;var checked=data[key]||false;
    totalItems++;if(checked)checkedItems++;
    html+='<label style="display:flex;align-items:center;gap:8px;padding:6px 0;cursor:pointer;font-size:.85em;color:#ccc">';
    html+='<input type="checkbox" '+(checked?'checked':'')+' onchange="window._v18ToggleReview(\''+key+'\')" style="accent-color:#00FF88;width:18px;height:18px">';
    html+=ITEMS[ci].items[ii]+'</label>';
  }
  html+='</div>';
}
html+='<canvas id="v18-rr-canvas" width="600" height="380" style="width:100%;max-width:600px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';
var pct=totalItems>0?Math.round(checkedItems/totalItems*100):0;
var reviewGrade=pct>=90?'S':pct>=70?'A':pct>=50?'B':pct>=30?'C':'D';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#00FF88">'+checkedItems+'/'+totalItems+'</div><div class="v18-stat-label">체크 완료</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#FFB800">'+pct+'%</div><div class="v18-stat-label">완성률</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:'+(reviewGrade==='S'||reviewGrade==='A'?'#00FF88':reviewGrade==='B'?'#FFB800':'#FF3366')+'">'+reviewGrade+'</div><div class="v18-stat-label">복기 등급</div></div>';
html+='</div>';
html+='<button class="v18-btn" style="width:100%;margin-top:6px" onclick="window._v18ResetReview()">새 라운드 복기</button>';
pn.innerHTML=html;openPanel('roundreview');drawReviewCanvas(data,ITEMS);
}
window._v18ToggleReview=function(key){var data=lsGet('round_review',{});data[key]=!data[key];lsSet('round_review',data);showRoundReview()};
window._v18ResetReview=function(){lsSet('round_review',{});playSfx('review_open');showToast('복기 초기화');showRoundReview()};

function drawReviewCanvas(data,ITEMS){
var c=document.getElementById('v18-rr-canvas');if(!c)return;
var ctx=c.getContext('2d');var W=600,H=380;
ctx.fillStyle='#0c1018';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00FF88';ctx.font='bold 15px sans-serif';ctx.fillText('Post-Round Review Dashboard',20,28);
ctx.fillStyle='#555';ctx.font='11px sans-serif';ctx.fillText('Category Completion Radar',20,46);
var cats=[];
for(var ci=0;ci<ITEMS.length;ci++){var total=ITEMS[ci].items.length;var done=0;for(var ii=0;ii<total;ii++){if(data['c'+ci+'_'+ii])done++}cats.push({name:ITEMS[ci].cat,pct:total>0?done/total:0})}
var cx=W/2,cy=H/2+15,r=110;var n=cats.length;var angles=[];
for(var ai=0;ai<n;ai++){angles.push(-Math.PI/2+(ai/n)*Math.PI*2)}
for(var ring=0.2;ring<=1;ring+=0.2){ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.beginPath();for(var ri=0;ri<n;ri++){var rr=r*ring;var ax=cx+Math.cos(angles[ri])*rr;var ay=cy+Math.sin(angles[ri])*rr;if(ri===0)ctx.moveTo(ax,ay);else ctx.lineTo(ax,ay)}ctx.closePath();ctx.stroke()}
for(var li=0;li<n;li++){var lx=cx+Math.cos(angles[li])*r;var ly=cy+Math.sin(angles[li])*r;ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(lx,ly);ctx.stroke();var tlx=cx+Math.cos(angles[li])*(r+22);var tly=cy+Math.sin(angles[li])*(r+22);ctx.fillStyle='#aaa';ctx.font='11px sans-serif';ctx.fillText(cats[li].name,tlx-15,tly+4)}
ctx.fillStyle='rgba(0,255,136,0.15)';ctx.strokeStyle='#00FF88';ctx.lineWidth=2;ctx.beginPath();
for(var pi=0;pi<n;pi++){var pr=r*cats[pi].pct;var px=cx+Math.cos(angles[pi])*pr;var py=cy+Math.sin(angles[pi])*pr;if(pi===0)ctx.moveTo(px,py);else ctx.lineTo(px,py)}
ctx.closePath();ctx.fill();ctx.stroke();
for(var di=0;di<n;di++){var dr=r*cats[di].pct;var dx=cx+Math.cos(angles[di])*dr;var dy=cy+Math.sin(angles[di])*dr;ctx.fillStyle=cats[di].pct>=0.8?'#00FF88':cats[di].pct>=0.5?'#FFB800':'#FF3366';ctx.beginPath();ctx.arc(dx,dy,5,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff';ctx.font='bold 10px sans-serif';ctx.fillText(Math.round(cats[di].pct*100)+'%',dx+8,dy+4)}
}

// ===== QUIZ v18 (+15 questions: 150 -> 165) =====
var V18_QUIZ=[
{q:'스윙 템포에서 백스윗과 다운스윗의 이상적인 비율은?',a:['1:1','2:1','3:1','1:3'],c:2},
{q:'Stimpmeter 수치가 12 이상이면 어떤 수준의 그린스피드인가?',a:['아마추어','일반 코스','투어 프로','초보자'],c:2},
{q:'드라이버의 일반적인 교체 주기는 약 몇 라운드?',a:['100R','200R','300R','500R'],c:2},
{q:'Strokes Gained (SG) 값이 +0.5이면 무엇을 의미하는가?',a:['평균 이하','평균 수준','평균 대비 0.5타 절약','반타 절약'],c:2},
{q:'골프에서 FIR은 무엇의 약자인가?',a:['First In Round','Fairway In Regulation','Finish In Range','Forward Iron Range'],c:1},
{q:'퍼팅에서 브레이크란 무엇을 의미하나?',a:['공이 굴러가는 속도','경사에 의한 공의 휘어지는 정도','퍼터의 무게','그린 잔디의 높이'],c:1},
{q:'스윙 일관성을 높이는 가장 중요한 요소는?',a:['크럽 압력','템포 유지','헤드스피드','스탠스 폭'],c:1},
{q:'골프 라운드 중 카트 비용은 보통 얼마인가? (한국 기준)',a:['1만원','2만원','5만원','10만원'],c:1},
{q:'GIR(Green in Regulation)의 기준에서 Par 4 홈은 몇 번째 샷에 그린에 올려야 하나?',a:['1번째','2번째','3번째','4번째'],c:1},
{q:'골프에서 스크램블링(Scrambling)이란?',a:['OB 후 처리','GIR 실패 후 파 세이브','홈인원','버디 퍼트'],c:1},
{q:'골프 스윙에서 코어 근육(Core)의 역할은?',a:['팔 힘 증가','상체와 하체의 파워 전달','밸런스 유지','그립 압력'],c:1},
{q:'18홈 라운드 후 복기에서 가장 먼저 확인해야 할 것은?',a:['총 타수','퍼팅 횟수','전반적인 전략 실행 여부','식사 메뉴'],c:2},
{q:'골프에서 워밍업을 하지 않으면 가장 많이 발생하는 문제는?',a:['슬라이스','부상 위험 증가','체력 저하','타수 증가'],c:1},
{q:'골프 피팅에서 라이각(Lie Angle)이 중요한 이유는?',a:['비거리 증가','방향 정확성','백스핀','그립 편안함'],c:1},
{q:'퍼팅에서 에이밍 포인트(Aiming Point)란?',a:['볼이 멈추는 위치','볼을 골라는 방향','컨별 지점','홈 위치'],c:1}
];
function showV18Quiz(){
playSfx('quiz_correct');
var pn=getPanel('v18quiz');
var qState=lsGet('quiz_state',{idx:0,correct:0,total:0});
var qi=qState.idx%V18_QUIZ.length;var q=V18_QUIZ[qi];
var html='<button class="v18-close" onclick="window._v18Close(\'v18quiz\')">&times;</button>';
html+='<div class="v18-title">❓ 골프 퀴즈 v18 ('+qState.total+' 응답, '+qState.correct+' 정답)</div>';
html+='<div class="v18-card"><h3>Q'+(qi+1)+'/'+V18_QUIZ.length+'</h3>';
html+='<p style="font-size:1em;color:#fff;margin:12px 0;line-height:1.6">'+q.q+'</p>';
for(var ai=0;ai<q.a.length;ai++){html+='<button class="v18-btn" style="width:100%;margin:4px 0;text-align:left;padding:10px 16px" onclick="window._v18Answer('+qi+','+ai+')">'+String.fromCharCode(9312+ai)+' '+q.a[ai]+'</button>'}
html+='</div>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
var rate=qState.total>0?Math.round(qState.correct/qState.total*100):0;
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#00FF88">'+qState.correct+'</div><div class="v18-stat-label">정답</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#FFB800">'+rate+'%</div><div class="v18-stat-label">정답률</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#00B4D8">'+qState.total+'</div><div class="v18-stat-label">총 응답</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('v18quiz');
}
window._v18Answer=function(qi,ai){var q=V18_QUIZ[qi];var qState=lsGet('quiz_state',{idx:0,correct:0,total:0});qState.total++;if(ai===q.c){qState.correct++;playSfx('quiz_correct');showToast('정답! 🎉')}else{playSfx('quiz_wrong');showToast('오답! 정답: '+q.a[q.c])}qState.idx=qi+1;lsSet('quiz_state',qState);setTimeout(showV18Quiz,1200)};

// ===== ACHIEVEMENTS v18 (+12: 120 -> 132) =====
var V18_ACHS=[
{id:'v18_swing_master',name:'스윙 마스터',desc:'스윙 분석 10회 기록',check:function(){return(lsGet('swing_con',[])).length>=10}},
{id:'v18_strategist',name:'전략가',desc:'18홈 전략 완성',check:function(){var d=lsGet('hole_strategy',{});var c=0;for(var k in d)if(d.hasOwnProperty(k))c++;return c>=18}},
{id:'v18_gear_keeper',name:'장비 관리자',desc:'클럽 사용량 5개 이상 기록',check:function(){var d=lsGet('club_replace',{});var c=0;for(var k in d)if(d.hasOwnProperty(k)&&d[k]>0)c++;return c>=5}},
{id:'v18_budget_pro',name:'예산 프로',desc:'비용 5회 이상 기록',check:function(){return(lsGet('round_costs',[])).length>=5}},
{id:'v18_green_reader',name:'그린 리더',desc:'그린스피드 5회 측정',check:function(){return(lsGet('green_speed',[])).length>=5}},
{id:'v18_distance_freak',name:'거리 덕후',desc:'거리 20회 이상 기록',check:function(){return(lsGet('dist_histogram',[])).length>=20}},
{id:'v18_fit_golfer',name:'피트 골퍼',desc:'체력 테스트 A등급 이상',check:function(){var d=lsGet('fitness_test',{});var t=0,c=0;for(var i=0;i<6;i++){var v=d['t'+i]||0;if(v>0){t+=v;c++}}return c>0&&t/c>=7}},
{id:'v18_reviewer',name:'복기왕',desc:'복기 체크리스트 80% 이상',check:function(){var d=lsGet('round_review',{});var t=0,c=0;for(var k in d)if(d.hasOwnProperty(k)){t++;if(d[k])c++}return t>0&&c/t>=0.8}},
{id:'v18_quiz_ace',name:'퀴즈 에이스',desc:'v18 퀴즈 전문 정답',check:function(){var s=lsGet('quiz_state',{});return s.total>=15&&s.correct>=15}},
{id:'v18_tempo_king',name:'템포 킹',desc:'스윙 템포 SD 3 미만',check:function(){var d=lsGet('swing_con',[]);if(d.length<5)return false;var sum=0;for(var i=0;i<d.length;i++)sum+=d[i].tempo;var avg=sum/d.length;var vr=0;for(var j=0;j<d.length;j++)vr+=Math.pow(d[j].tempo-avg,2);return Math.sqrt(vr/d.length)<3}},
{id:'v18_cost_saver',name:'절약왕',desc:'평균 라운드 비용 15만원 이하',check:function(){var d=lsGet('round_costs',[]);if(d.length<3)return false;var s=0;for(var i=0;i<d.length;i++)s+=d[i].total;return s/d.length<=15}},
{id:'v18_complete',name:'v18 컴플리트',desc:'v18 모든 기능 사용',check:function(){return lsGet('swing_con',[]).length>0&&Object.keys(lsGet('hole_strategy',{})).length>0&&Object.keys(lsGet('club_replace',{})).length>0&&lsGet('round_costs',[]).length>0&&lsGet('green_speed',[]).length>0&&lsGet('dist_histogram',[]).length>0&&lsGet('fitness_test',{}).date&&lsGet('quiz_state',{}).total>0}}
];

function v18CheckAch(){
var unlocked=lsGet('achievements',[]);
for(var i=0;i<V18_ACHS.length;i++){
  var a=V18_ACHS[i];
  if(unlocked.indexOf(a.id)===-1&&a.check()){
    unlocked.push(a.id);lsSet('achievements',unlocked);
    playSfx('v18_achieve');
    var popup=document.createElement('div');popup.className='v18-ach-popup';
    popup.innerHTML='<div style="font-size:2em">🏆</div><div><div style="font-weight:800;color:#FFB800;font-size:.9em">업적 해금!</div><div style="font-size:.8em;color:#ccc">'+a.name+' - '+a.desc+'</div></div>';
    document.body.appendChild(popup);
    setTimeout(function(){popup.classList.add('show')},100);
    setTimeout(function(){popup.classList.remove('show');setTimeout(function(){popup.remove()},500)},4000);
  }
}
}

function trackOpen(section){
var opens=lsGet('opens',{});opens[section]=(opens[section]||0)+1;lsSet('opens',opens);setTimeout(v18CheckAch,500);
}

window._v18_showSwingCon=function(){trackOpen('swingcon');showSwingConsistency()};
window._v18_showHoleStrategy=function(){trackOpen('holestrategy');showHoleStrategy()};
window._v18_showClubReplace=function(){trackOpen('clubreplace');showClubReplace()};
window._v18_showRoundCost=function(){trackOpen('roundcost');showRoundCost()};
window._v18_showGreenSpeed=function(){trackOpen('greenspeed');showGreenSpeed()};
window._v18_showDistHistogram=function(){trackOpen('disthistogram');showDistHistogram()};
window._v18_showFitnessTest=function(){trackOpen('fitnesstest');showFitnessTest()};
window._v18_showRoundReview=function(){trackOpen('roundreview');showRoundReview()};
window._v18_showV18Quiz=function(){trackOpen('v18quiz');showV18Quiz()};
window._v18Close=function(id){closePanel(id)};

function setupV18Keyboard(){
document.addEventListener('keydown',function(e){
  if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'||e.target.tagName==='SELECT')return;
  if(e.ctrlKey||e.metaKey||e.altKey)return;
  if(!e.shiftKey)return;
  switch(e.key){
    case'Q':e.preventDefault();window._v18_showSwingCon();break;
    case'R':e.preventDefault();window._v18_showHoleStrategy();break;
    case'T':e.preventDefault();window._v18_showClubReplace();break;
    case'Y':e.preventDefault();window._v18_showRoundCost();break;
    case'U':e.preventDefault();window._v18_showGreenSpeed();break;
    case'I':e.preventDefault();window._v18_showDistHistogram();break;
    case'O':e.preventDefault();window._v18_showFitnessTest();break;
    case'P':e.preventDefault();window._v18_showRoundReview();break;
  }
});
}

// ===== ADD BUTTONS TO EXISTING v16 NAV =====
function injectV18QuickActions(){
var nav=document.querySelector('.v16-scroll-nav');
if(!nav){
  setTimeout(injectV18QuickActions,2000);
  return;
}
var buttons=[
  {icon:'🏌️',title:'스윙분석 (Shift+Q)',fn:'showSwingCon'},
  {icon:'🗺️',title:'홈전략 (Shift+R)',fn:'showHoleStrategy'},
  {icon:'🔧',title:'클럽교체 (Shift+T)',fn:'showClubReplace'},
  {icon:'💰',title:'비용계산 (Shift+Y)',fn:'showRoundCost'},
  {icon:'⛳',title:'그린스피드 (Shift+U)',fn:'showGreenSpeed'},
  {icon:'📊',title:'거리분포 (Shift+I)',fn:'showDistHistogram'},
  {icon:'💪',title:'체력테스트 (Shift+O)',fn:'showFitnessTest'},
  {icon:'📝',title:'복기 (Shift+P)',fn:'showRoundReview'},
  {icon:'❓',title:'퀴즈v18',fn:'showV18Quiz'}
];
for(var i=0;i<buttons.length;i++){
  var btn=document.createElement('button');btn.className='v16-nav-btn';
  btn.innerHTML='<span class="v16-nav-icon">'+buttons[i].icon+'</span><span class="v16-nav-label">'+buttons[i].title.split(' (')[0]+'</span>';
  btn.title=buttons[i].title;
  btn.setAttribute('data-fn',buttons[i].fn);
  btn.addEventListener('click',function(){var fn=this.getAttribute('data-fn');if(window['_v18_'+fn])window['_v18_'+fn]()});
  nav.appendChild(btn);
}
}

// ===== CSS =====
function injectV18CSS(){
var s=document.createElement('style');
s.textContent='.v18-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.88);z-index:10010;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;pointer-events:none}.v18-overlay.active{opacity:1;pointer-events:auto}.v18-panel{background:linear-gradient(145deg,rgba(8,14,24,.98),rgba(4,6,14,.98));border:1px solid rgba(0,255,136,.15);border-radius:18px;padding:24px;max-width:720px;width:94%;max-height:85vh;overflow-y:auto;box-shadow:0 24px 80px rgba(0,0,0,.7),0 0 40px rgba(0,255,136,.06);position:relative}.v18-panel::-webkit-scrollbar{width:5px}.v18-panel::-webkit-scrollbar-thumb{background:rgba(0,255,136,.2);border-radius:3px}.v18-title{font-size:1.4em;font-weight:800;color:#00FF88;margin-bottom:18px;letter-spacing:-0.5px}.v18-close{position:absolute;top:12px;right:16px;background:none;border:none;color:#666;font-size:1.6em;cursor:pointer;padding:4px 8px;border-radius:8px;transition:all .2s;z-index:1}.v18-close:hover{color:#ff6b6b;background:rgba(255,107,107,.1)}.v18-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:16px;margin-bottom:12px;transition:all .2s}.v18-card:hover{border-color:rgba(0,255,136,.15);background:rgba(255,255,255,.05)}.v18-card h3{color:#00FF88;font-size:.95em;margin:0 0 8px}.v18-card p{color:#aaa;font-size:.85em;margin:0;line-height:1.6}.v18-btn{padding:8px 16px;border:1px solid rgba(0,255,136,.2);background:rgba(0,255,136,.06);color:#00FF88;border-radius:8px;cursor:pointer;font-size:.85em;transition:all .2s}.v18-btn:hover{background:rgba(0,255,136,.15);border-color:#00FF88}.v18-btn-primary{background:rgba(0,255,136,.12);border-color:rgba(0,255,136,.3)}.v18-btn-primary:hover{background:rgba(0,255,136,.22)}.v18-input{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:8px 12px;color:#fff;font-size:.85em;width:100%;box-sizing:border-box}.v18-input:focus{outline:none;border-color:rgba(0,255,136,.4)}.v18-label{display:block;font-size:.72em;color:#888;margin-bottom:3px}.v18-stat-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:10px 6px;text-align:center}.v18-stat-val{font-size:1.3em;font-weight:800}.v18-stat-label{font-size:.65em;color:#888;margin-top:2px}.v18-toast{position:fixed;top:20px;left:50%;transform:translateX(-50%) translateY(-100px);background:rgba(0,255,136,.1);border:1px solid rgba(0,255,136,.2);color:#00FF88;padding:10px 20px;border-radius:10px;z-index:99999;transition:transform .4s;font-size:.9em;backdrop-filter:blur(12px);white-space:nowrap}.v18-toast.show{transform:translateX(-50%) translateY(0)}.v18-ach-popup{position:fixed;top:60px;left:50%;transform:translateX(-50%) translateY(-150px);z-index:100004;background:linear-gradient(135deg,rgba(8,14,24,.96),rgba(16,24,36,.96));border:1px solid rgba(0,255,136,.25);border-radius:16px;padding:14px 22px;display:flex;align-items:center;gap:14px;backdrop-filter:blur(20px);transition:transform .5s cubic-bezier(.34,1.56,.64,1);box-shadow:0 8px 32px rgba(0,0,0,.5),0 0 24px rgba(0,255,136,.08)}.v18-ach-popup.show{transform:translateX(-50%) translateY(0)}@media(max-width:480px){.v18-panel{padding:16px;max-height:92vh;width:96%}}';
document.head.appendChild(s);
}

// ===== INIT =====
function initV18(){
injectV18CSS();
injectV18QuickActions();
setupV18Keyboard();
setTimeout(v18CheckAch,9000);
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',initV18)}
else{setTimeout(initV18,6000)}

})();
