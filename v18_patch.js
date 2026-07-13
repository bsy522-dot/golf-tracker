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
var METRICS=['&#xD15C;&#xD3EC;','&#xBC31;&#xC2A4;&#xC717;&#xAE38;&#xC774;','&#xD314;&#xB85C;&#xC2A4;&#xB8E8;','&#xCCB4;&#xC911;&#xC774;&#xB3D9;','&#xD5E4;&#xB4DC;&#xC2A4;&#xD53C;&#xB4DC;'];
var html='<button class="v18-close" onclick="window._v18Close(\'swingcon\')">&times;</button>';
html+='<div class="v18-title">&#x1F3CC;&#xFE0F; &#xC2A4;&#xC719; &#xC77C;&#xAD00;&#xC131; &#xBD84;&#xC11D;&#xAE30;</div>';
html+='<div class="v18-card"><h3>&#xC2A4;&#xC719; &#xB370;&#xC774;&#xD130; &#xC785;&#xB825;</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v18-label">&#xD074;&#xB7FD;</label><select id="v18-sc-club" class="v18-input">';
for(var c=0;c<CLUBS.length;c++) html+='<option>'+CLUBS[c]+'</option>';
html+='</select></div>';
html+='<div><label class="v18-label">&#xD15C;&#xD3EC; (BPM)</label><input type="number" id="v18-sc-tempo" class="v18-input" min="40" max="150" value="85"></div>';
html+='<div><label class="v18-label">&#xD5E4;&#xB4DC;&#xC2A4;&#xD53C;&#xB4DC; (mph)</label><input type="number" id="v18-sc-speed" class="v18-input" min="30" max="130" value="90"></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:6px">';
html+='<div><label class="v18-label">&#xBC31;&#xC2A4;&#xC717;&#xAE38;&#xC774; (m)</label><input type="number" id="v18-sc-backswing" class="v18-input" step="0.1" min="0.5" max="3" value="1.8"></div>';
html+='<div><label class="v18-label">&#xD314;&#xB85C;&#xC2A4;&#xB8E8; (1~10)</label><input type="number" id="v18-sc-follow" class="v18-input" min="1" max="10" value="7"></div>';
html+='<div><label class="v18-label">&#xCCB4;&#xC911;&#xC774;&#xB3D9; (1~10)</label><input type="number" id="v18-sc-weight" class="v18-input" min="1" max="10" value="7"></div>';
html+='</div>';
html+='<button class="v18-btn v18-btn-primary" style="width:100%;margin-top:8px" onclick="window._v18RecordSwing()">&#xC800;&#xC7A5;</button>';
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
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#00FF88">'+totalSwings+'</div><div class="v18-stat-label">&#xCD1D; &#xAE30;&#xB85D;</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#00B4D8">'+avgTempo+'</div><div class="v18-stat-label">&#xD3C9;&#xADE0; BPM</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#FFB800">'+avgSpeed+'</div><div class="v18-stat-label">&#xD3C9;&#xADE0; mph</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#A855F7">&plusmn;'+tempoSD+'</div><div class="v18-stat-label">&#xD15C;&#xD3EC; SD</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:'+(conGrade==='S'||conGrade==='A'?'#00FF88':conGrade==='B'?'#FFB800':'#FF3366')+'">'+conGrade+'</div><div class="v18-stat-label">&#xC77C;&#xAD00;&#xC131;</div></div>';
html+='</div>';
html+='<div class="v18-card"><h3>&#x1F4A1; &#xC2A4;&#xC719; &#xC77C;&#xAD00;&#xC131; &#xAC00;&#xC774;&#xB4DC;</h3>';
html+='<div style="font-size:.82em;color:#aaa;line-height:1.7">';
html+='<div>&#x2022; S&#xB4F1;&#xAE09;: &#xD15C;&#xD3EC;/&#xC2A4;&#xD53C;&#xB4DC; SD &lt; 3 (&#xD22C;&#xC5B4; &#xD504;&#xB85C; &#xC218;&#xC900;)</div>';
html+='<div>&#x2022; A&#xB4F1;&#xAE09;: SD &lt; 5 (&#xC0C1;&#xAE09; &#xC544;&#xB9C8;&#xCD94;&#xC5B4;)</div>';
html+='<div>&#x2022; B&#xB4F1;&#xAE09;: SD &lt; 8 (&#xD3C9;&#xADE0; &#xADFC; &#xC77C;&#xAD00;&#xC131;)</div>';
html+='<div>&#x2022; &#xD15C;&#xD3EC; &#xC77C;&#xAD00;&#xC131;&#xC774; &#xBE44;&#xAC70;&#xB9AC; &#xC77C;&#xAD00;&#xC131;&#xBCF4;&#xB2E4; &#xC911;&#xC694;</div>';
html+='</div></div>';
if(data.length>0){html+='<button class="v18-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'&#xC2A4;&#xC719; &#xB370;&#xC774;&#xD130;&#xB97C; &#xCD08;&#xAE30;&#xD654;&#xD560;&#xAE4C;&#xC694;?\'))window._v18ResetSwing()">&#xCD08;&#xAE30;&#xD654;</button>';}
pn.innerHTML=html;openPanel('swingcon');drawSwingCanvas(data);
}
window._v18RecordSwing=function(){var club=document.getElementById('v18-sc-club').value;var tempo=parseFloat(document.getElementById('v18-sc-tempo').value)||85;var speed=parseFloat(document.getElementById('v18-sc-speed').value)||90;var bs=parseFloat(document.getElementById('v18-sc-backswing').value)||1.8;var fl=parseInt(document.getElementById('v18-sc-follow').value)||7;var wt=parseInt(document.getElementById('v18-sc-weight').value)||7;var data=lsGet('swing_con',[]);data.push({club:club,tempo:tempo,speed:speed,bs:bs,fl:fl,wt:wt,date:todayStr()});if(data.length>500)data=data.slice(-500);lsSet('swing_con',data);playSfx('swing_record');showToast('&#xC2A4;&#xC719; &#xAE30;&#xB85D; &#xC800;&#xC7A5; ('+club+' '+tempo+'BPM)');showSwingConsistency()};
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
html+='<div class="v18-title">&#x1F3CC;&#xFE0F; &#xD648;&#xBCC4; &#xC804;&#xB7B5; &#xD50C;&#xB798;&#xB108;</div>';
html+='<div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:10px">';
for(var h=1;h<=18;h++){var filled=data['h'+h]?'background:rgba(0,255,136,.12);border-color:rgba(0,255,136,.3)':'';var act=h===curHole?'border-color:#00FF88;background:rgba(0,255,136,.2);color:#00FF88':'';html+='<button class="v18-btn" style="min-width:36px;padding:6px 0;font-size:.85em;'+filled+';'+act+'" onclick="window._v18SetHole('+h+')">'+h+'</button>';}
html+='</div>';
html+='<div class="v18-card"><h3>Hole '+curHole+' &#xC804;&#xB7B5;</h3>';
var hd=data['h'+curHole]||{par:4,dist:380,tee:'DR',approach:'7I',note:''};
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v18-label">Par</label><select id="v18-hs-par" class="v18-input"><option '+(hd.par===3?'selected':'')+'>3</option><option '+(hd.par===4?'selected':'')+'>4</option><option '+(hd.par===5?'selected':'')+'>5</option></select></div>';
html+='<div><label class="v18-label">&#xAC70;&#xB9AC;(yd)</label><input type="number" id="v18-hs-dist" class="v18-input" value="'+(hd.dist||380)+'" min="80" max="650"></div>';
html+='<div><label class="v18-label">&#xD2F0;&#xC0F7; &#xD074;&#xB7FD;</label><select id="v18-hs-tee" class="v18-input">';
for(var tc=0;tc<CLUBS.length;tc++){html+='<option '+(hd.tee===CLUBS[tc]?'selected':'')+'>'+CLUBS[tc]+'</option>'}
html+='</select></div>';
html+='<div><label class="v18-label">&#xC5B4;&#xD504;&#xB85C;&#xCE58;</label><select id="v18-hs-approach" class="v18-input">';
for(var ac=0;ac<CLUBS.length;ac++){html+='<option '+(hd.approach===CLUBS[ac]?'selected':'')+'>'+CLUBS[ac]+'</option>'}
html+='</select></div>';
html+='</div>';
html+='<div style="margin-top:8px"><label class="v18-label">&#xC804;&#xB7B5; &#xBA54;&#xBAA8;</label><textarea id="v18-hs-note" class="v18-input" rows="2" style="resize:vertical" placeholder="&#xD574;&#xC800;&#xB4DC;, &#xD48B; &#xC704;&#xCE58;, &#xBC14;&#xB78C; &#xB4F1; &#xBA54;&#xBAA8;">'+((hd.note||'').replace(/</g,'&lt;'))+'</textarea></div>';
html+='<button class="v18-btn v18-btn-primary" style="width:100%;margin-top:8px" onclick="window._v18SaveHole()">&#xC800;&#xC7A5;</button>';
html+='</div>';
html+='<canvas id="v18-hs-canvas" width="620" height="380" style="width:100%;max-width:620px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';
var filledCount=0;for(var fk in data)if(data.hasOwnProperty(fk))filledCount++;
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#00FF88">'+filledCount+'/18</div><div class="v18-stat-label">&#xC804;&#xB7B5; &#xC644;&#xC131;</div></div>';
var totalPar=0;for(var pk=1;pk<=18;pk++){var phd=data['h'+pk];totalPar+=phd?parseInt(phd.par)||4:4}
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#FFB800">'+totalPar+'</div><div class="v18-stat-label">&#xCD1D; Par</div></div>';
var totalDist=0;for(var dk=1;dk<=18;dk++){var dhd=data['h'+dk];totalDist+=dhd?parseInt(dhd.dist)||0:0}
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#00B4D8">'+(totalDist||'-')+'</div><div class="v18-stat-label">&#xCD1D; &#xAC70;&#xB9AC;(yd)</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('holestrategy');drawHoleCanvas(data);
}
window._v18SetHole=function(h){lsSet('cur_hole',h);showHoleStrategy()};
window._v18SaveHole=function(){var data=lsGet('hole_strategy',{});var h=lsGet('cur_hole',1);data['h'+h]={par:parseInt(document.getElementById('v18-hs-par').value)||4,dist:parseInt(document.getElementById('v18-hs-dist').value)||380,tee:document.getElementById('v18-hs-tee').value,approach:document.getElementById('v18-hs-approach').value,note:document.getElementById('v18-hs-note').value.slice(0,200)};lsSet('hole_strategy',data);playSfx('swing_record');showToast('Hole '+h+' &#xC804;&#xB7B5; &#xC800;&#xC7A5;');showHoleStrategy()};

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
html+='<div class="v18-title">&#x1F527; &#xD074;&#xB7FD; &#xAD50;&#xCCB4; &#xC2DC;&#xAE30; &#xD2B8;&#xB798;&#xCEE4;</div>';
html+='<div class="v18-card"><h3>&#xC0AC;&#xC6A9;&#xB7C9; &#xAE30;&#xB85D;</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v18-label">&#xD074;&#xB7FD;</label><select id="v18-cr-club" class="v18-input">';
for(var ci=0;ci<CLUBS.length;ci++) html+='<option>'+CLUBS[ci].name+'</option>';
html+='</select></div>';
html+='<div><label class="v18-label">&#xD0C0;&#xC218; &#xCD94;&#xAC00;</label><input type="number" id="v18-cr-shots" class="v18-input" value="20" min="1" max="200"></div>';
html+='<div style="display:flex;align-items:flex-end"><button class="v18-btn v18-btn-primary" style="width:100%" onclick="window._v18AddShots()">&#xCD94;&#xAC00;</button></div>';
html+='</div></div>';
html+='<canvas id="v18-cr-canvas" width="580" height="360" style="width:100%;max-width:580px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
var alertCount=0,totalShots=0;
for(var ai=0;ai<CLUBS.length;ai++){var shots=data[CLUBS[ai].name]||0;totalShots+=shots;if(shots>=CLUBS[ai].life*0.8)alertCount++}
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#00FF88">'+totalShots+'</div><div class="v18-stat-label">&#xCD1D; &#xD0C0;&#xC218;</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:'+(alertCount>0?'#FF3366':'#00FF88')+'">'+alertCount+'</div><div class="v18-stat-label">&#xAD50;&#xCCB4; &#xC54C;&#xB9BC;</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#FFB800">'+CLUBS.length+'</div><div class="v18-stat-label">&#xCD1D; &#xD074;&#xB7FD;</div></div>';
html+='</div>';
html+='<div class="v18-card"><h3>&#x1F4CB; &#xD074;&#xB7FD;&#xBCC4; &#xC218;&#xBA85;</h3>';
html+='<div style="font-size:.8em;color:#aaa;line-height:1.7">';
html+='<div>&#x2022; &#xB4DC;&#xB77C;&#xC774;&#xBC84;: ~300R | &#xC6B0;&#xB4DC;: ~250R</div>';
html+='<div>&#x2022; &#xC544;&#xC774;&#xC5B8;: ~350R | &#xC6E8;&#xC9C0;: ~400R</div>';
html+='<div>&#x2022; &#xD37C;&#xD130;: ~500R | &#x26A0;&#xFE0F; 80% &#xC774;&#xC0C1; &#xC0AC;&#xC6A9;&#xC2DC; &#xACBD;&#xACE0;</div>';
html+='</div></div>';
if(totalShots>0){html+='<button class="v18-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'&#xD074;&#xB7FD; &#xC0AC;&#xC6A9;&#xB7C9; &#xCD08;&#xAE30;&#xD654;?\'))window._v18ResetClubReplace()">&#xCD08;&#xAE30;&#xD654;</button>';}
pn.innerHTML=html;openPanel('clubreplace');drawClubReplaceCanvas(data,CLUBS);
}
window._v18AddShots=function(){var club=document.getElementById('v18-cr-club').value;var shots=parseInt(document.getElementById('v18-cr-shots').value)||20;var data=lsGet('club_replace',{});data[club]=(data[club]||0)+shots;lsSet('club_replace',data);playSfx('swing_record');showToast(club+' +'+shots+' &#xD0C0;');showClubReplace()};
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
html+='<div class="v18-title">&#x1F4B0; &#xB77C;&#xC6B4;&#xB4DC; &#xBE44;&#xC6A9; &#xACC4;&#xC0B0;&#xAE30;</div>';
html+='<div class="v18-card"><h3>&#xBE44;&#xC6A9; &#xC785;&#xB825;</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v18-label">&#xADF8;&#xB9B0;&#xD53C;(&#xB9CC;&#xC6D0;)</label><input type="number" id="v18-rc-green" class="v18-input" value="10" min="0" max="100"></div>';
html+='<div><label class="v18-label">&#xCE74;&#xD2B8;(&#xB9CC;&#xC6D0;)</label><input type="number" id="v18-rc-cart" class="v18-input" value="2" min="0" max="20"></div>';
html+='<div><label class="v18-label">&#xCE90;&#xB514;&#xD53C;(&#xB9CC;&#xC6D0;)</label><input type="number" id="v18-rc-caddie" class="v18-input" value="3" min="0" max="20"></div>';
html+='<div><label class="v18-label">&#xC2DD;&#xC0AC;(&#xB9CC;&#xC6D0;)</label><input type="number" id="v18-rc-food" class="v18-input" value="3" min="0" max="20"></div>';
html+='<div><label class="v18-label">&#xAD50;&#xD1B5;/&#xC8FC;&#xC720;(&#xB9CC;&#xC6D0;)</label><input type="number" id="v18-rc-transport" class="v18-input" value="3" min="0" max="30"></div>';
html+='<div><label class="v18-label">&#xAE30;&#xD0C0;(&#xB9CC;&#xC6D0;)</label><input type="number" id="v18-rc-etc" class="v18-input" value="1" min="0" max="30"></div>';
html+='</div>';
html+='<button class="v18-btn v18-btn-primary" style="width:100%;margin-top:8px" onclick="window._v18SaveCost()">&#xC800;&#xC7A5;</button>';
html+='</div>';
html+='<canvas id="v18-rc-canvas" width="580" height="360" style="width:100%;max-width:580px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';
var totalRounds=data.length;var totalSpent=0,avgCost=0;
if(totalRounds>0){for(var i=0;i<data.length;i++)totalSpent+=data[i].total;avgCost=Math.round(totalSpent/totalRounds*10)/10}
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#00FF88">'+totalRounds+'</div><div class="v18-stat-label">&#xCD1D; &#xB77C;&#xC6B4;&#xB4DC;</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#FFB800">'+totalSpent+'&#xB9CC;</div><div class="v18-stat-label">&#xCD1D; &#xC9C0;&#xCD9C;</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#00B4D8">'+avgCost+'&#xB9CC;</div><div class="v18-stat-label">&#xD3C9;&#xADE0;/R</div></div>';
html+='</div>';
if(data.length>0){html+='<button class="v18-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'&#xBE44;&#xC6A9; &#xB370;&#xC774;&#xD130; &#xCD08;&#xAE30;&#xD654;?\'))window._v18ResetCost()">&#xCD08;&#xAE30;&#xD654;</button>';}
pn.innerHTML=html;openPanel('roundcost');drawCostCanvas(data);
}
window._v18SaveCost=function(){var green=parseFloat(document.getElementById('v18-rc-green').value)||0;var cart=parseFloat(document.getElementById('v18-rc-cart').value)||0;var caddie=parseFloat(document.getElementById('v18-rc-caddie').value)||0;var food=parseFloat(document.getElementById('v18-rc-food').value)||0;var transport=parseFloat(document.getElementById('v18-rc-transport').value)||0;var etc=parseFloat(document.getElementById('v18-rc-etc').value)||0;var total=green+cart+caddie+food+transport+etc;var data=lsGet('round_costs',[]);data.push({green:green,cart:cart,caddie:caddie,food:food,transport:transport,etc:etc,total:total,date:todayStr()});if(data.length>200)data=data.slice(-200);lsSet('round_costs',data);playSfx('cost_calc');showToast('&#xBE44;&#xC6A9; &#xC800;&#xC7A5; ('+total+'&#xB9CC;&#xC6D0;)');showRoundCost()};
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
ctx.fillStyle='#FFB800';ctx.font='bold 18px sans-serif';ctx.fillText(latest.total+'&#xB9CC;',cx-22,cy+6);
if(data.length>=2){var trendX=330,trendW=220,trendH=200,trendY=80;ctx.fillStyle='#00FF88';ctx.font='bold 12px sans-serif';ctx.fillText('Cost Trend',trendX,trendY-10);var maxCost=0;for(var mi=0;mi<data.length;mi++){if(data[mi].total>maxCost)maxCost=data[mi].total}maxCost=Math.max(maxCost,1);var showData=data.slice(-15);ctx.strokeStyle='rgba(0,255,136,0.6)';ctx.lineWidth=2;ctx.beginPath();for(var si=0;si<showData.length;si++){var px=trendX+(si/(showData.length-1||1))*trendW;var py=trendY+trendH-(showData[si].total/maxCost)*trendH;if(si===0)ctx.moveTo(px,py);else ctx.lineTo(px,py)}ctx.stroke();for(var di=0;di<showData.length;di++){var dpx=trendX+(di/(showData.length-1||1))*trendW;var dpy=trendY+trendH-(showData[di].total/maxCost)*trendH;ctx.fillStyle='#00FF88';ctx.beginPath();ctx.arc(dpx,dpy,3,0,Math.PI*2);ctx.fill()}}
}

// ===== 5. PUTTING GREEN SPEED CALIBRATOR Canvas 560x340 =====
function showGreenSpeed(){
playSfx('green_speed');
var pn=getPanel('greenspeed');
var data=lsGet('green_speed',[]);
var html='<button class="v18-close" onclick="window._v18Close(\'greenspeed\')">&times;</button>';
html+='<div class="v18-title">&#x26F3; &#xD37C;&#xD305; &#xADF8;&#xB9B0;&#xC2A4;&#xD53C;&#xB4DC; &#xCE98;&#xB9AC;&#xBE0C;&#xB808;&#xC774;&#xD130;</div>';
html+='<div class="v18-card"><h3>&#xADF8;&#xB9B0;&#xC2A4;&#xD53C;&#xB4DC; &#xCE21;&#xC815;</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v18-label">Stimp &#xC218;&#xCE58;</label><input type="number" id="v18-gs-stimp" class="v18-input" step="0.5" value="9" min="4" max="16"></div>';
html+='<div><label class="v18-label">&#xACBD;&#xC0AC;&#xB3C4; (%)</label><input type="number" id="v18-gs-slope" class="v18-input" step="0.5" value="0" min="-8" max="8"></div>';
html+='<div><label class="v18-label">&#xCF54;&#xC2A4;&#xBA85;</label><input type="text" id="v18-gs-course" class="v18-input" value="" placeholder="&#xCF54;&#xC2A4;&#xBA85;"></div>';
html+='</div>';
html+='<button class="v18-btn v18-btn-primary" style="width:100%;margin-top:8px" onclick="window._v18SaveGreen()">&#xCE21;&#xC815; &#xC800;&#xC7A5;</button>';
html+='</div>';
html+='<canvas id="v18-gs-canvas" width="560" height="340" style="width:100%;max-width:560px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';
var avgStimp=0,fastCount=0;
if(data.length>0){var stSum=0;for(var si=0;si<data.length;si++){stSum+=data[si].stimp;if(data[si].stimp>=11)fastCount++}avgStimp=Math.round(stSum/data.length*10)/10}
var speedGrade=avgStimp>=12?'Tour Fast':avgStimp>=10?'Fast':avgStimp>=8?'Medium':avgStimp>=6?'Slow':'Very Slow';
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#00FF88">'+data.length+'</div><div class="v18-stat-label">&#xCE21;&#xC815;&#xD69F;&#xC218;</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#FFB800">'+avgStimp+'</div><div class="v18-stat-label">&#xD3C9;&#xADE0; Stimp</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#00B4D8">'+speedGrade+'</div><div class="v18-stat-label">&#xC2A4;&#xD53C;&#xB4DC; &#xB4F1;&#xAE09;</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#A855F7">'+fastCount+'</div><div class="v18-stat-label">Fast (11+)</div></div>';
html+='</div>';
html+='<div class="v18-card"><h3>&#x1F4DD; Stimpmeter &#xAC00;&#xC774;&#xB4DC;</h3>';
html+='<div style="font-size:.82em;color:#aaa;line-height:1.7">';
html+='<div>&#x2022; 4~6: &#xD3C9;&#xC77C; &#xC544;&#xB9C8;&#xCD94;&#xC5B4; &#xCF54;&#xC2A4;</div>';
html+='<div>&#x2022; 7~9: &#xC77C;&#xBC18; &#xCF54;&#xC2A4; &#xD3C9;&#xADE0;</div>';
html+='<div>&#x2022; 10~11: &#xD558;&#xC774;&#xC5D4;&#xB4DC; &#xCF54;&#xC2A4; / &#xD1A0;&#xB108;&#xBA3C;&#xD2B8;</div>';
html+='<div>&#x2022; 12~14: &#xD22C;&#xC5B4; &#xD504;&#xB85C; &#xC218;&#xC900; (PGA/LPGA)</div>';
html+='<div>&#x2022; 15+: &#xC624;&#xAC70;&#xC2A4;&#xD0C0;/&#xB9C8;&#xC2A4;&#xD130;&#xC988; &#xD2B9;&#xBCC4; &#xC138;&#xD305;</div>';
html+='</div></div>';
if(data.length>0){html+='<button class="v18-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'&#xADF8;&#xB9B0;&#xC2A4;&#xD53C;&#xB4DC; &#xCD08;&#xAE30;&#xD654;?\'))window._v18ResetGreen()">&#xCD08;&#xAE30;&#xD654;</button>';}
pn.innerHTML=html;openPanel('greenspeed');drawGreenCanvas(data);
}
window._v18SaveGreen=function(){var stimp=parseFloat(document.getElementById('v18-gs-stimp').value)||9;var slope=parseFloat(document.getElementById('v18-gs-slope').value)||0;var course=document.getElementById('v18-gs-course').value.slice(0,30);var data=lsGet('green_speed',[]);data.push({stimp:stimp,slope:slope,course:course,date:todayStr()});if(data.length>100)data=data.slice(-100);lsSet('green_speed',data);playSfx('green_speed');showToast('Stimp '+stimp+' &#xC800;&#xC7A5;');showGreenSpeed()};
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
html+='<div class="v18-title">&#x1F4CA; &#xC0F7; &#xAC70;&#xB9AC; &#xD788;&#xC2A4;&#xD1A0;&#xADF8;&#xB7A8;</div>';
html+='<div class="v18-card"><h3>&#xAC70;&#xB9AC; &#xAE30;&#xB85D;</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v18-label">&#xD074;&#xB7FD;</label><select id="v18-dh-club" class="v18-input">';
for(var ci=0;ci<CLUBS.length;ci++) html+='<option>'+CLUBS[ci]+'</option>';
html+='</select></div>';
html+='<div><label class="v18-label">&#xAC70;&#xB9AC; (yd)</label><input type="number" id="v18-dh-dist" class="v18-input" value="200" min="10" max="400"></div>';
html+='<div style="display:flex;align-items:flex-end"><button class="v18-btn v18-btn-primary" style="width:100%" onclick="window._v18RecordDist()">&#xC800;&#xC7A5;</button></div>';
html+='</div></div>';
html+='<div style="margin-bottom:8px"><label class="v18-label">&#xD074;&#xB7FD; &#xD544;&#xD130;</label><select id="v18-dh-filter" class="v18-input" onchange="window._v18RedrawHist()">';
html+='<option value="ALL">&#xC804;&#xCCB4;</option>';
for(var fi=0;fi<CLUBS.length;fi++) html+='<option>'+CLUBS[fi]+'</option>';
html+='</select></div>';
html+='<canvas id="v18-dh-canvas" width="580" height="360" style="width:100%;max-width:580px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';
var totalShots=data.length;var avgDist=0,maxDist=0;
if(totalShots>0){var dSum=0;for(var di=0;di<data.length;di++){dSum+=data[di].dist;if(data[di].dist>maxDist)maxDist=data[di].dist}avgDist=Math.round(dSum/totalShots)}
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#00FF88">'+totalShots+'</div><div class="v18-stat-label">&#xCD1D; &#xAE30;&#xB85D;</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#FFB800">'+avgDist+'yd</div><div class="v18-stat-label">&#xD3C9;&#xADE0; &#xAC70;&#xB9AC;</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#00B4D8">'+maxDist+'yd</div><div class="v18-stat-label">&#xCD5C;&#xB300; &#xAC70;&#xB9AC;</div></div>';
html+='</div>';
if(data.length>0){html+='<button class="v18-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'&#xAC70;&#xB9AC; &#xB370;&#xC774;&#xD130; &#xCD08;&#xAE30;&#xD654;?\'))window._v18ResetDist()">&#xCD08;&#xAE30;&#xD654;</button>';}
pn.innerHTML=html;openPanel('disthistogram');drawDistHistCanvas(data,'ALL');
}
window._v18RecordDist=function(){var club=document.getElementById('v18-dh-club').value;var dist=parseInt(document.getElementById('v18-dh-dist').value)||200;var data=lsGet('dist_histogram',[]);data.push({club:club,dist:dist,date:todayStr()});if(data.length>500)data=data.slice(-500);lsSet('dist_histogram',data);playSfx('swing_record');showToast(club+' '+dist+'yd &#xAE30;&#xB85D;');showDistHistogram()};
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
var TESTS=['&#xC720;&#xC5F0;&#xC131;','&#xCF54;&#xC5B4; &#xADFC;&#xB825;','&#xBC38;&#xB7F0;&#xC2A4;','&#xD3EC;&#xBC1C;&#xB825;','&#xC9C0;&#xAD6C;&#xB825;','&#xD68C;&#xC804; &#xAC00;&#xB3D9;&#xBC94;&#xC704;'];
var html='<button class="v18-close" onclick="window._v18Close(\'fitnesstest\')">&times;</button>';
html+='<div class="v18-title">&#x1F4AA; &#xACE8;&#xD504; &#xCCB4;&#xB825; &#xD14C;&#xC2A4;&#xD2B8;</div>';
html+='<div class="v18-card"><h3>6&#xD56D;&#xBAA9; &#xCCB4;&#xB825; &#xD3C9;&#xAC00;</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
for(var ti=0;ti<TESTS.length;ti++){html+='<div><label class="v18-label">'+TESTS[ti]+' (1~10)</label><input type="number" id="v18-ft-'+ti+'" class="v18-input" min="1" max="10" value="'+(data['t'+ti]||5)+'"></div>'}
html+='</div>';
html+='<button class="v18-btn v18-btn-primary" style="width:100%;margin-top:8px" onclick="window._v18SaveFitness()">&#xCCB4;&#xB825; &#xCE21;&#xC815; &#xC800;&#xC7A5;</button>';
html+='</div>';
html+='<canvas id="v18-ft-canvas" width="560" height="360" style="width:100%;max-width:560px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';
var total=0,count=0;for(var si=0;si<TESTS.length;si++){var v=data['t'+si]||0;if(v>0){total+=v;count++}}
var avg=count>0?Math.round(total/count*10)/10:0;
var grade=avg>=9?'S':avg>=7?'A':avg>=5?'B':avg>=3?'C':'D';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#00FF88">'+avg+'</div><div class="v18-stat-label">&#xD3C9;&#xADE0; &#xC810;&#xC218;</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:'+(grade==='S'||grade==='A'?'#00FF88':grade==='B'?'#FFB800':'#FF3366')+'">'+grade+'</div><div class="v18-stat-label">&#xCCB4;&#xB825; &#xB4F1;&#xAE09;</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#FFB800">'+total+'/60</div><div class="v18-stat-label">&#xCD1D;&#xC810;</div></div>';
html+='</div>';
html+='<div class="v18-card"><h3>&#x1F4A1; &#xACE8;&#xD504; &#xCCB4;&#xB825; &#xAC00;&#xC774;&#xB4DC;</h3>';
html+='<div style="font-size:.82em;color:#aaa;line-height:1.7">';
html+='<div>&#x2022; &#xC720;&#xC5F0;&#xC131;: &#xC5B4;&#xB4DC;&#xB808;&#xC2A4;~&#xD578; &#xC704;&#xCE58;&#xC5D0;&#xC11C; &#xD558;&#xCCB4; &#xD138;&#xAE30;</div>';
html+='<div>&#x2022; &#xCF54;&#xC5B4;: &#xD50C;&#xB7AD;&#xD06C; 60&#xCD08; &#xC720;&#xC9C0; &#xAC00;&#xB2A5; &#xC5EC;&#xBD80;</div>';
html+='<div>&#x2022; &#xBC38;&#xB7F0;&#xC2A4;: &#xD55C;&#xBC1C; &#xC11C;&#xC11C; &#xC2A4;&#xC719; &#xC548;&#xC815;&#xC131;</div>';
html+='<div>&#x2022; &#xD3EC;&#xBC1C;&#xB825;: &#xC810;&#xD504;/&#xC2A4;&#xCFFC;&#xD2B8; &#xD3ED;&#xBC1C; &#xB2A5;&#xB825;</div>';
html+='<div>&#x2022; &#xC9C0;&#xAD6C;&#xB825;: 18&#xD648; 5&#xC2DC;&#xAC04; &#xC9C0;&#xC18D; &#xAC00;&#xB2A5; &#xC5EC;&#xBD80;</div>';
html+='<div>&#x2022; &#xD68C;&#xC804;: &#xC5B4;&#xAE68; + &#xACE8;&#xBC18; &#xD68C;&#xC804; &#xBC94;&#xC704; (90&#xB3C4;+)</div>';
html+='</div></div>';
pn.innerHTML=html;openPanel('fitnesstest');drawFitnessCanvas(data,TESTS);
}
window._v18SaveFitness=function(){var data={};for(var i=0;i<6;i++){data['t'+i]=parseInt(document.getElementById('v18-ft-'+i).value)||5}data.date=todayStr();lsSet('fitness_test',data);playSfx('fitness_test');showToast('&#xCCB4;&#xB825; &#xD14C;&#xC2A4;&#xD2B8; &#xC800;&#xC7A5;');showFitnessTest()};

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
  {cat:'&#xD2F0;&#xC0F7;',items:['&#xD398;&#xC5B4;&#xC6E8;&#xC774; &#xC548;&#xCC29;&#xB960; &#xD655;&#xC778;','&#xD2F0;&#xC0F7; &#xD074;&#xB7FD; &#xC120;&#xD0DD; &#xC801;&#xC808;&#xD588;&#xB098;','&#xD2F0;&#xC0F7; &#xD0C0;&#xAE43; &#xC815;&#xD655;&#xD588;&#xB098;']},
  {cat:'&#xC5B4;&#xD504;&#xB85C;&#xCE58;',items:['&#xADF8;&#xB9B0; &#xC801;&#xC911;&#xB960; GIR &#xCCB4;&#xD06C;','&#xD074;&#xB7FD; &#xC120;&#xD0DD; &#xC801;&#xC808;&#xD588;&#xB098;','&#xBC14;&#xB78C;/&#xACBD;&#xC0AC; &#xBCF4;&#xC815; &#xD588;&#xB098;']},
  {cat:'&#xC1FC;&#xD2B8;&#xAC8C;&#xC784;',items:['&#xCE69;/&#xD53C;&#xCE58; &#xC131;&#xACF5;&#xB960; &#xD655;&#xC778;','&#xBC99;&#xCEE4; &#xD0C8;&#xCD9C; &#xC131;&#xACF5; &#xC5EC;&#xBD80;','&#xC2A4;&#xD06C;&#xB7A8;&#xBE14;&#xB9C1; &#xD68C;&#xC218; &#xCCB4;&#xD06C;']},
  {cat:'&#xD37C;&#xD305;',items:['3&#xD37C;&#xD2B8; &#xC774;&#xB0B4; &#xC131;&#xACF5;&#xB960;','&#xADF8;&#xB9B0; &#xB9AC;&#xB529; &#xC815;&#xD655;&#xD588;&#xB098;','&#xD37C;&#xD305; &#xC2A4;&#xD2B8;&#xB85C;&#xD06C; &#xC77C;&#xAD00;&#xC131;']},
  {cat:'&#xBA58;&#xD0C8;',items:['&#xD504;&#xB9AC;&#xC0F7; &#xB8E8;&#xD2F4; &#xC2E4;&#xD589;&#xD588;&#xB098;','&#xBBF8;&#xC2A4;&#xC0F7; &#xD6C4; &#xD3C9;&#xC815; &#xC720;&#xC9C0;','&#xD638;&#xD758; &#xD30C; &#xC5D0;&#xC11C; &#xBB34;&#xB9AC;&#xD558;&#xC9C0; &#xC54A;&#xC558;&#xB098;']}
];
var html='<button class="v18-close" onclick="window._v18Close(\'roundreview\')">&times;</button>';
html+='<div class="v18-title">&#x1F4DD; &#xB77C;&#xC6B4;&#xB4DC; &#xBCF5;&#xAE30; &#xCCB4;&#xD06C;&#xB9AC;&#xC2A4;&#xD2B8;</div>';
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
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#00FF88">'+checkedItems+'/'+totalItems+'</div><div class="v18-stat-label">&#xCCB4;&#xD06C; &#xC644;&#xB8CC;</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#FFB800">'+pct+'%</div><div class="v18-stat-label">&#xC644;&#xC131;&#xB960;</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:'+(reviewGrade==='S'||reviewGrade==='A'?'#00FF88':reviewGrade==='B'?'#FFB800':'#FF3366')+'">'+reviewGrade+'</div><div class="v18-stat-label">&#xBCF5;&#xAE30; &#xB4F1;&#xAE09;</div></div>';
html+='</div>';
html+='<button class="v18-btn" style="width:100%;margin-top:6px" onclick="window._v18ResetReview()">&#xC0C8; &#xB77C;&#xC6B4;&#xB4DC; &#xBCF5;&#xAE30;</button>';
pn.innerHTML=html;openPanel('roundreview');drawReviewCanvas(data,ITEMS);
}
window._v18ToggleReview=function(key){var data=lsGet('round_review',{});data[key]=!data[key];lsSet('round_review',data);showRoundReview()};
window._v18ResetReview=function(){lsSet('round_review',{});playSfx('review_open');showToast('&#xBCF5;&#xAE30; &#xCD08;&#xAE30;&#xD654;');showRoundReview()};

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
{q:'&#xC2A4;&#xC719; &#xD15C;&#xD3EC;&#xC5D0;&#xC11C; &#xBC31;&#xC2A4;&#xC717;&#xACFC; &#xB2E4;&#xC6B4;&#xC2A4;&#xC717;&#xC758; &#xC774;&#xC0C1;&#xC801;&#xC778; &#xBE44;&#xC728;&#xC740;?',a:['1:1','2:1','3:1','1:3'],c:2},
{q:'Stimpmeter &#xC218;&#xCE58;&#xAC00; 12 &#xC774;&#xC0C1;&#xC774;&#xBA74; &#xC5B4;&#xB5A4; &#xC218;&#xC900;&#xC758; &#xADF8;&#xB9B0;&#xC2A4;&#xD53C;&#xB4DC;&#xC778;&#xAC00;?',a:['&#xC544;&#xB9C8;&#xCD94;&#xC5B4;','&#xC77C;&#xBC18; &#xCF54;&#xC2A4;','&#xD22C;&#xC5B4; &#xD504;&#xB85C;','&#xCD08;&#xBCF4;&#xC790;'],c:2},
{q:'&#xB4DC;&#xB77C;&#xC774;&#xBC84;&#xC758; &#xC77C;&#xBC18;&#xC801;&#xC778; &#xAD50;&#xCCB4; &#xC8FC;&#xAE30;&#xB294; &#xC57D; &#xBA87; &#xB77C;&#xC6B4;&#xB4DC;?',a:['100R','200R','300R','500R'],c:2},
{q:'Strokes Gained (SG) &#xAC12;&#xC774; +0.5&#xC774;&#xBA74; &#xBB34;&#xC5C7;&#xC744; &#xC758;&#xBBF8;&#xD558;&#xB294;&#xAC00;?',a:['&#xD3C9;&#xADE0; &#xC774;&#xD558;','&#xD3C9;&#xADE0; &#xC218;&#xC900;','&#xD3C9;&#xADE0; &#xB300;&#xBE44; 0.5&#xD0C0; &#xC808;&#xC57D;','&#xBC18;&#xD0C0; &#xC808;&#xC57D;'],c:2},
{q:'&#xACE8;&#xD504;&#xC5D0;&#xC11C; FIR&#xC740; &#xBB34;&#xC5C7;&#xC758; &#xC57D;&#xC790;&#xC778;&#xAC00;?',a:['First In Round','Fairway In Regulation','Finish In Range','Forward Iron Range'],c:1},
{q:'&#xD37C;&#xD305;&#xC5D0;&#xC11C; &#xBE0C;&#xB808;&#xC774;&#xD06C;&#xB780; &#xBB34;&#xC5C7;&#xC744; &#xC758;&#xBBF8;&#xD558;&#xB098;?',a:['&#xACF5;&#xC774; &#xAD74;&#xB7EC;&#xAC00;&#xB294; &#xC18D;&#xB3C4;','&#xACBD;&#xC0AC;&#xC5D0; &#xC758;&#xD55C; &#xACF5;&#xC758; &#xD718;&#xC5B4;&#xC9C0;&#xB294; &#xC815;&#xB3C4;','&#xD37C;&#xD130;&#xC758; &#xBB34;&#xAC8C;','&#xADF8;&#xB9B0; &#xC794;&#xB514;&#xC758; &#xB192;&#xC774;'],c:1},
{q:'&#xC2A4;&#xC719; &#xC77C;&#xAD00;&#xC131;&#xC744; &#xB192;&#xC774;&#xB294; &#xAC00;&#xC7A5; &#xC911;&#xC694;&#xD55C; &#xC694;&#xC18C;&#xB294;?',a:['&#xD06C;&#xB7FD; &#xC555;&#xB825;','&#xD15C;&#xD3EC; &#xC720;&#xC9C0;','&#xD5E4;&#xB4DC;&#xC2A4;&#xD53C;&#xB4DC;','&#xC2A4;&#xD0E0;&#xC2A4; &#xD3ED;'],c:1},
{q:'&#xACE8;&#xD504; &#xB77C;&#xC6B4;&#xB4DC; &#xC911; &#xCE74;&#xD2B8; &#xBE44;&#xC6A9;&#xC740; &#xBCF4;&#xD1B5; &#xC5BC;&#xB9C8;&#xC778;&#xAC00;? (&#xD55C;&#xAD6D; &#xAE30;&#xC900;)',a:['1&#xB9CC;&#xC6D0;','2&#xB9CC;&#xC6D0;','5&#xB9CC;&#xC6D0;','10&#xB9CC;&#xC6D0;'],c:1},
{q:'GIR(Green in Regulation)&#xC758; &#xAE30;&#xC900;&#xC5D0;&#xC11C; Par 4 &#xD648;&#xC740; &#xBA87; &#xBC88;&#xC9F8; &#xC0F7;&#xC5D0; &#xADF8;&#xB9B0;&#xC5D0; &#xC62C;&#xB824;&#xC57C; &#xD558;&#xB098;?',a:['1&#xBC88;&#xC9F8;','2&#xBC88;&#xC9F8;','3&#xBC88;&#xC9F8;','4&#xBC88;&#xC9F8;'],c:1},
{q:'&#xACE8;&#xD504;&#xC5D0;&#xC11C; &#xC2A4;&#xD06C;&#xB7A8;&#xBE14;&#xB9C1;(Scrambling)&#xC774;&#xB780;?',a:['OB &#xD6C4; &#xCC98;&#xB9AC;','GIR &#xC2E4;&#xD328; &#xD6C4; &#xD30C; &#xC138;&#xC774;&#xBE0C;','&#xD648;&#xC778;&#xC6D0;','&#xBC84;&#xB514; &#xD37C;&#xD2B8;'],c:1},
{q:'&#xACE8;&#xD504; &#xC2A4;&#xC719;&#xC5D0;&#xC11C; &#xCF54;&#xC5B4; &#xADFC;&#xC721;(Core)&#xC758; &#xC5ED;&#xD560;&#xC740;?',a:['&#xD314; &#xD798; &#xC99D;&#xAC00;','&#xC0C1;&#xCCB4;&#xC640; &#xD558;&#xCCB4;&#xC758; &#xD30C;&#xC6CC; &#xC804;&#xB2EC;','&#xBC38;&#xB7F0;&#xC2A4; &#xC720;&#xC9C0;','&#xADF8;&#xB9BD; &#xC555;&#xB825;'],c:1},
{q:'18&#xD648; &#xB77C;&#xC6B4;&#xB4DC; &#xD6C4; &#xBCF5;&#xAE30;&#xC5D0;&#xC11C; &#xAC00;&#xC7A5; &#xBA3C;&#xC800; &#xD655;&#xC778;&#xD574;&#xC57C; &#xD560; &#xAC83;&#xC740;?',a:['&#xCD1D; &#xD0C0;&#xC218;','&#xD37C;&#xD305; &#xD69F;&#xC218;','&#xC804;&#xBC18;&#xC801;&#xC778; &#xC804;&#xB7B5; &#xC2E4;&#xD589; &#xC5EC;&#xBD80;','&#xC2DD;&#xC0AC; &#xBA54;&#xB274;'],c:2},
{q:'&#xACE8;&#xD504;&#xC5D0;&#xC11C; &#xC6CC;&#xBC0D;&#xC5C5;&#xC744; &#xD558;&#xC9C0; &#xC54A;&#xC73C;&#xBA74; &#xAC00;&#xC7A5; &#xB9CE;&#xC774; &#xBC1C;&#xC0DD;&#xD558;&#xB294; &#xBB38;&#xC81C;&#xB294;?',a:['&#xC2AC;&#xB77C;&#xC774;&#xC2A4;','&#xBD80;&#xC0C1; &#xC704;&#xD5D8; &#xC99D;&#xAC00;','&#xCCB4;&#xB825; &#xC800;&#xD558;','&#xD0C0;&#xC218; &#xC99D;&#xAC00;'],c:1},
{q:'&#xACE8;&#xD504; &#xD53C;&#xD305;&#xC5D0;&#xC11C; &#xB77C;&#xC774;&#xAC01;(Lie Angle)&#xC774; &#xC911;&#xC694;&#xD55C; &#xC774;&#xC720;&#xB294;?',a:['&#xBE44;&#xAC70;&#xB9AC; &#xC99D;&#xAC00;','&#xBC29;&#xD5A5; &#xC815;&#xD655;&#xC131;','&#xBC31;&#xC2A4;&#xD540;','&#xADF8;&#xB9BD; &#xD3B8;&#xC548;&#xD568;'],c:1},
{q:'&#xD37C;&#xD305;&#xC5D0;&#xC11C; &#xC5D0;&#xC774;&#xBC0D; &#xD3EC;&#xC778;&#xD2B8;(Aiming Point)&#xB780;?',a:['&#xBCFC;&#xC774; &#xBA48;&#xCD94;&#xB294; &#xC704;&#xCE58;','&#xBCFC;&#xC744; &#xACE8;&#xB77C;&#xB294; &#xBC29;&#xD5A5;','&#xCEE8;&#xBCC4; &#xC9C0;&#xC810;','&#xD648; &#xC704;&#xCE58;'],c:1}
];
function showV18Quiz(){
playSfx('quiz_correct');
var pn=getPanel('v18quiz');
var qState=lsGet('quiz_state',{idx:0,correct:0,total:0});
var qi=qState.idx%V18_QUIZ.length;var q=V18_QUIZ[qi];
var html='<button class="v18-close" onclick="window._v18Close(\'v18quiz\')">&times;</button>';
html+='<div class="v18-title">&#x2753; &#xACE8;&#xD504; &#xD034;&#xC988; v18 ('+qState.total+' &#xC751;&#xB2F5;, '+qState.correct+' &#xC815;&#xB2F5;)</div>';
html+='<div class="v18-card"><h3>Q'+(qi+1)+'/'+V18_QUIZ.length+'</h3>';
html+='<p style="font-size:1em;color:#fff;margin:12px 0;line-height:1.6">'+q.q+'</p>';
for(var ai=0;ai<q.a.length;ai++){html+='<button class="v18-btn" style="width:100%;margin:4px 0;text-align:left;padding:10px 16px" onclick="window._v18Answer('+qi+','+ai+')">'+String.fromCharCode(9312+ai)+' '+q.a[ai]+'</button>'}
html+='</div>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
var rate=qState.total>0?Math.round(qState.correct/qState.total*100):0;
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#00FF88">'+qState.correct+'</div><div class="v18-stat-label">&#xC815;&#xB2F5;</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#FFB800">'+rate+'%</div><div class="v18-stat-label">&#xC815;&#xB2F5;&#xB960;</div></div>';
html+='<div class="v18-stat-card"><div class="v18-stat-val" style="color:#00B4D8">'+qState.total+'</div><div class="v18-stat-label">&#xCD1D; &#xC751;&#xB2F5;</div></div>';
html+='</div>';
pn.innerHTML=html;openPanel('v18quiz');
}
window._v18Answer=function(qi,ai){var q=V18_QUIZ[qi];var qState=lsGet('quiz_state',{idx:0,correct:0,total:0});qState.total++;if(ai===q.c){qState.correct++;playSfx('quiz_correct');showToast('&#xC815;&#xB2F5;! &#x1F389;')}else{playSfx('quiz_wrong');showToast('&#xC624;&#xB2F5;! &#xC815;&#xB2F5;: '+q.a[q.c])}qState.idx=qi+1;lsSet('quiz_state',qState);setTimeout(showV18Quiz,1200)};

// ===== ACHIEVEMENTS v18 (+12: 120 -> 132) =====
var V18_ACHS=[
{id:'v18_swing_master',name:'&#xC2A4;&#xC719; &#xB9C8;&#xC2A4;&#xD130;',desc:'&#xC2A4;&#xC719; &#xBD84;&#xC11D; 10&#xD68C; &#xAE30;&#xB85D;',check:function(){return(lsGet('swing_con',[])).length>=10}},
{id:'v18_strategist',name:'&#xC804;&#xB7B5;&#xAC00;',desc:'18&#xD648; &#xC804;&#xB7B5; &#xC644;&#xC131;',check:function(){var d=lsGet('hole_strategy',{});var c=0;for(var k in d)if(d.hasOwnProperty(k))c++;return c>=18}},
{id:'v18_gear_keeper',name:'&#xC7A5;&#xBE44; &#xAD00;&#xB9AC;&#xC790;',desc:'&#xD074;&#xB7FD; &#xC0AC;&#xC6A9;&#xB7C9; 5&#xAC1C; &#xC774;&#xC0C1; &#xAE30;&#xB85D;',check:function(){var d=lsGet('club_replace',{});var c=0;for(var k in d)if(d.hasOwnProperty(k)&&d[k]>0)c++;return c>=5}},
{id:'v18_budget_pro',name:'&#xC608;&#xC0B0; &#xD504;&#xB85C;',desc:'&#xBE44;&#xC6A9; 5&#xD68C; &#xC774;&#xC0C1; &#xAE30;&#xB85D;',check:function(){return(lsGet('round_costs',[])).length>=5}},
{id:'v18_green_reader',name:'&#xADF8;&#xB9B0; &#xB9AC;&#xB354;',desc:'&#xADF8;&#xB9B0;&#xC2A4;&#xD53C;&#xB4DC; 5&#xD68C; &#xCE21;&#xC815;',check:function(){return(lsGet('green_speed',[])).length>=5}},
{id:'v18_distance_freak',name:'&#xAC70;&#xB9AC; &#xB355;&#xD6C4;',desc:'&#xAC70;&#xB9AC; 20&#xD68C; &#xC774;&#xC0C1; &#xAE30;&#xB85D;',check:function(){return(lsGet('dist_histogram',[])).length>=20}},
{id:'v18_fit_golfer',name:'&#xD53C;&#xD2B8; &#xACE8;&#xD37C;',desc:'&#xCCB4;&#xB825; &#xD14C;&#xC2A4;&#xD2B8; A&#xB4F1;&#xAE09; &#xC774;&#xC0C1;',check:function(){var d=lsGet('fitness_test',{});var t=0,c=0;for(var i=0;i<6;i++){var v=d['t'+i]||0;if(v>0){t+=v;c++}}return c>0&&t/c>=7}},
{id:'v18_reviewer',name:'&#xBCF5;&#xAE30;&#xC655;',desc:'&#xBCF5;&#xAE30; &#xCCB4;&#xD06C;&#xB9AC;&#xC2A4;&#xD2B8; 80% &#xC774;&#xC0C1;',check:function(){var d=lsGet('round_review',{});var t=0,c=0;for(var k in d)if(d.hasOwnProperty(k)){t++;if(d[k])c++}return t>0&&c/t>=0.8}},
{id:'v18_quiz_ace',name:'&#xD034;&#xC988; &#xC5D0;&#xC774;&#xC2A4;',desc:'v18 &#xD034;&#xC988; &#xC804;&#xBB38; &#xC815;&#xB2F5;',check:function(){var s=lsGet('quiz_state',{});return s.total>=15&&s.correct>=15}},
{id:'v18_tempo_king',name:'&#xD15C;&#xD3EC; &#xD0B9;',desc:'&#xC2A4;&#xC719; &#xD15C;&#xD3EC; SD 3 &#xBBF8;&#xB9CC;',check:function(){var d=lsGet('swing_con',[]);if(d.length<5)return false;var sum=0;for(var i=0;i<d.length;i++)sum+=d[i].tempo;var avg=sum/d.length;var vr=0;for(var j=0;j<d.length;j++)vr+=Math.pow(d[j].tempo-avg,2);return Math.sqrt(vr/d.length)<3}},
{id:'v18_cost_saver',name:'&#xC808;&#xC57D;&#xC655;',desc:'&#xD3C9;&#xADE0; &#xB77C;&#xC6B4;&#xB4DC; &#xBE44;&#xC6A9; 15&#xB9CC;&#xC6D0; &#xC774;&#xD558;',check:function(){var d=lsGet('round_costs',[]);if(d.length<3)return false;var s=0;for(var i=0;i<d.length;i++)s+=d[i].total;return s/d.length<=15}},
{id:'v18_complete',name:'v18 &#xCEF4;&#xD50C;&#xB9AC;&#xD2B8;',desc:'v18 &#xBAA8;&#xB4E0; &#xAE30;&#xB2A5; &#xC0AC;&#xC6A9;',check:function(){return lsGet('swing_con',[]).length>0&&Object.keys(lsGet('hole_strategy',{})).length>0&&Object.keys(lsGet('club_replace',{})).length>0&&lsGet('round_costs',[]).length>0&&lsGet('green_speed',[]).length>0&&lsGet('dist_histogram',[]).length>0&&lsGet('fitness_test',{}).date&&lsGet('quiz_state',{}).total>0}}
];

function v18CheckAch(){
var unlocked=lsGet('achievements',[]);
for(var i=0;i<V18_ACHS.length;i++){
  var a=V18_ACHS[i];
  if(unlocked.indexOf(a.id)===-1&&a.check()){
    unlocked.push(a.id);lsSet('achievements',unlocked);
    playSfx('v18_achieve');
    var popup=document.createElement('div');popup.className='v18-ach-popup';
    popup.innerHTML='<div style="font-size:2em">&#x1F3C6;</div><div><div style="font-weight:800;color:#FFB800;font-size:.9em">&#xC5C5;&#xC801; &#xD574;&#xAE08;!</div><div style="font-size:.8em;color:#ccc">'+a.name+' - '+a.desc+'</div></div>';
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
  {icon:'&#x1F3CC;&#xFE0F;',title:'&#xC2A4;&#xC719;&#xBD84;&#xC11D; (Shift+Q)',fn:'showSwingCon'},
  {icon:'&#x1F5FA;&#xFE0F;',title:'&#xD648;&#xC804;&#xB7B5; (Shift+R)',fn:'showHoleStrategy'},
  {icon:'&#x1F527;',title:'&#xD074;&#xB7FD;&#xAD50;&#xCCB4; (Shift+T)',fn:'showClubReplace'},
  {icon:'&#x1F4B0;',title:'&#xBE44;&#xC6A9;&#xACC4;&#xC0B0; (Shift+Y)',fn:'showRoundCost'},
  {icon:'&#x26F3;',title:'&#xADF8;&#xB9B0;&#xC2A4;&#xD53C;&#xB4DC; (Shift+U)',fn:'showGreenSpeed'},
  {icon:'&#x1F4CA;',title:'&#xAC70;&#xB9AC;&#xBD84;&#xD3EC; (Shift+I)',fn:'showDistHistogram'},
  {icon:'&#x1F4AA;',title:'&#xCCB4;&#xB825;&#xD14C;&#xC2A4;&#xD2B8; (Shift+O)',fn:'showFitnessTest'},
  {icon:'&#x1F4DD;',title:'&#xBCF5;&#xAE30; (Shift+P)',fn:'showRoundReview'},
  {icon:'&#x2753;',title:'&#xD034;&#xC988;v18',fn:'showV18Quiz'}
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
