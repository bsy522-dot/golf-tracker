(function(){
'use strict';
var LS='gt_v16_';
var audioCtx=null;
function getAC(){if(!audioCtx)try{audioCtx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}return audioCtx}
function playSfx(type){var ac=getAC();if(!ac)return;var o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);var t=ac.currentTime;g.gain.setValueAtTime(0.1,t);switch(type){case'putt_matrix':o.type='sine';o.frequency.setValueAtTime(392,t);o.frequency.linearRampToValueAtTime(523,t+0.1);o.frequency.linearRampToValueAtTime(659,t+0.2);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'putt_record':o.type='triangle';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(784,t+0.1);g.gain.exponentialRampToValueAtTime(0.01,t+0.2);o.start(t);o.stop(t+0.2);break;case'weather_open':o.type='sine';o.frequency.setValueAtTime(349,t);o.frequency.linearRampToValueAtTime(440,t+0.08);o.frequency.linearRampToValueAtTime(523,t+0.16);o.frequency.linearRampToValueAtTime(659,t+0.24);g.gain.exponentialRampToValueAtTime(0.01,t+0.4);o.start(t);o.stop(t+0.4);break;case'weather_analyze':o.type='triangle';o.frequency.setValueAtTime(587,t);o.frequency.linearRampToValueAtTime(784,t+0.12);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'miss_open':o.type='sine';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(554,t+0.1);o.frequency.linearRampToValueAtTime(698,t+0.2);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'miss_record':o.type='sine';o.frequency.setValueAtTime(659,t);o.frequency.linearRampToValueAtTime(880,t+0.08);g.gain.exponentialRampToValueAtTime(0.01,t+0.2);o.start(t);o.stop(t+0.2);break;case'iq_levelup':o.type='sine';o.frequency.setValueAtTime(523,t);o.frequency.setValueAtTime(659,t+0.08);o.frequency.setValueAtTime(784,t+0.16);o.frequency.setValueAtTime(1047,t+0.24);g.gain.exponentialRampToValueAtTime(0.01,t+0.5);o.start(t);o.stop(t+0.5);break;case'momentum_open':o.type='sine';o.frequency.setValueAtTime(330,t);o.frequency.linearRampToValueAtTime(494,t+0.12);o.frequency.linearRampToValueAtTime(659,t+0.24);g.gain.exponentialRampToValueAtTime(0.01,t+0.4);o.start(t);o.stop(t+0.4);break;case'range_open':o.type='triangle';o.frequency.setValueAtTime(494,t);o.frequency.linearRampToValueAtTime(659,t+0.1);g.gain.setValueAtTime(0.08,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.25);o.start(t);o.stop(t+0.25);break;case'range_save':o.type='sine';o.frequency.setValueAtTime(659,t);o.frequency.linearRampToValueAtTime(880,t+0.1);o.frequency.linearRampToValueAtTime(1047,t+0.2);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'bucket_open':o.type='sine';o.frequency.setValueAtTime(392,t);o.frequency.linearRampToValueAtTime(523,t+0.1);o.frequency.linearRampToValueAtTime(784,t+0.2);g.gain.exponentialRampToValueAtTime(0.01,t+0.4);o.start(t);o.stop(t+0.4);break;case'routine_tick':o.type='sine';o.frequency.setValueAtTime(880,t);g.gain.setValueAtTime(0.06,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.1);o.start(t);o.stop(t+0.1);break;case'routine_done':o.type='sine';o.frequency.setValueAtTime(784,t);o.frequency.setValueAtTime(988,t+0.1);o.frequency.setValueAtTime(1175,t+0.2);o.frequency.setValueAtTime(1568,t+0.3);g.gain.exponentialRampToValueAtTime(0.01,t+0.5);o.start(t);o.stop(t+0.5);break;case'v16_achieve':o.type='sine';o.frequency.setValueAtTime(784,t);o.frequency.setValueAtTime(988,t+0.1);o.frequency.setValueAtTime(1175,t+0.2);o.frequency.setValueAtTime(1568,t+0.3);g.gain.exponentialRampToValueAtTime(0.01,t+0.5);o.start(t);o.stop(t+0.5);break;default:o.type='sine';o.frequency.setValueAtTime(440,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.15);o.start(t);o.stop(t+0.15)}}

function lsGet(k,d){try{var v=localStorage.getItem(LS+k);return v?JSON.parse(v):d}catch(e){return d}}
function lsSet(k,v){try{localStorage.setItem(LS+k,JSON.stringify(v))}catch(e){}}
function todayStr(){return new Date().toISOString().slice(0,10)}
function showToast(msg){var t=document.createElement('div');t.className='v16-toast';t.textContent=msg;document.body.appendChild(t);setTimeout(function(){t.classList.add('show')},50);setTimeout(function(){t.classList.remove('show');setTimeout(function(){t.remove()},400)},3000)}
function createOverlay(id){var ov=document.createElement('div');ov.className='v16-overlay';ov.id='v16-'+id;ov.addEventListener('click',function(e){if(e.target===ov)closePanel(id)});var pn=document.createElement('div');pn.className='v16-panel';pn.style.position='relative';ov.appendChild(pn);return pn}
function openPanel(id){var el=document.getElementById('v16-'+id);if(el)el.classList.add('active')}
function closePanel(id){var el=document.getElementById('v16-'+id);if(el)el.classList.remove('active')}
function getPanel(id){var ov=document.getElementById('v16-'+id);if(!ov){var pn=createOverlay(id);pn.id='v16-'+id+'-panel';document.body.appendChild(pn.parentElement);return pn}return ov.querySelector('.v16-panel')||ov}

// ===== 1. PUTTING DISTANCE MATRIX Canvas 640x380 =====
function showPuttingMatrix(){
playSfx('putt_matrix');
var pn=getPanel('puttmatrix');
var data=lsGet('putt_data',[]);
var html='<button class="v16-close" onclick="window._v16Close(\'puttmatrix\')">&times;</button>';
html+='<div class="v16-title">&#x1F3AF; &#xD37C;&#xD305; &#xAC70;&#xB9AC; &#xB9E4;&#xD2B8;&#xB9AD;&#xC2A4;</div>';
html+='<div class="v16-card"><h3>&#xD37C;&#xD305; &#xAE30;&#xB85D; &#xCD94;&#xAC00;</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v16-label">&#xAC70;&#xB9AC;(ft)</label><select id="v16-pm-dist" class="v16-input">';
var dists=[3,5,8,10,12,15,18,20,25,30];
for(var d=0;d<dists.length;d++) html+='<option value="'+dists[d]+'">'+dists[d]+'ft</option>';
html+='</select></div>';
html+='<div><label class="v16-label">&#xACBD;&#xC0AC;</label><select id="v16-pm-slope" class="v16-input"><option>&#xD3C9;&#xC9C0;</option><option>&#xC624;&#xB974;&#xB9C9;</option><option>&#xB0B4;&#xB9AC;&#xB9C9;</option><option>&#xC88C;&#xCE21;</option><option>&#xC6B0;&#xCE21;</option></select></div>';
html+='<div><label class="v16-label">&#xACB0;&#xACFC;</label><select id="v16-pm-result" class="v16-input"><option value="in">&#xC131;&#xACF5;</option><option value="short">&#xC21C;&#xD2B8;</option><option value="long">&#xB871;</option><option value="left">&#xC88C;&#xCE21; &#xBBF8;&#xC2A4;</option><option value="right">&#xC6B0;&#xCE21; &#xBBF8;&#xC2A4;</option><option value="lip">&#xB9BD;&#xC544;&#xC6C3;</option></select></div>';
html+='</div>';
html+='<button class="v16-btn v16-btn-primary" style="width:100%;margin-top:10px" onclick="window._v16RecordPutt()">&#xD37C;&#xD305; &#xAE30;&#xB85D; &#xC800;&#xC7A5;</button></div>';

html+='<canvas id="v16-putt-canvas" width="640" height="380" style="width:100%;max-width:640px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

var totalPutts=data.length;
var madeCount=0;for(var i=0;i<data.length;i++){if(data[i].result==='in')madeCount++;}
var makeRate=totalPutts>0?Math.round(madeCount/totalPutts*1000)/10:0;
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#00FF88">'+totalPutts+'</div><div class="v16-stat-label">&#xCD1D; &#xD37C;&#xD305;</div></div>';
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#00B4D8">'+madeCount+'</div><div class="v16-stat-label">&#xC131;&#xACF5;</div></div>';
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#FFB800">'+makeRate+'%</div><div class="v16-stat-label">&#xC131;&#xACF5;&#xB960;</div></div>';
var avgDist=0;if(totalPutts>0){var sum=0;for(var j=0;j<data.length;j++)sum+=data[j].dist;avgDist=Math.round(sum/totalPutts*10)/10;}
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#E8A87C">'+avgDist+'ft</div><div class="v16-stat-label">&#xD3C9;&#xADE0; &#xAC70;&#xB9AC;</div></div>';
html+='</div>';

html+='<div class="v16-card"><h3>&#x1F4CA; &#xAC70;&#xB9AC;&#xBCC4; &#xC131;&#xACF5;&#xB960; &#xBD84;&#xC11D;</h3>';
html+='<div style="font-size:.82em;color:#aaa;line-height:1.8">';
for(var di=0;di<dists.length;di++){
  var cnt=0,made=0;
  for(var pi=0;pi<data.length;pi++){if(data[pi].dist===dists[di]){cnt++;if(data[pi].result==='in')made++;}}
  var rate=cnt>0?Math.round(made/cnt*100):0;
  var bar='<span style="display:inline-block;width:'+Math.max(rate,2)+'px;height:10px;background:linear-gradient(90deg,#00FF88,#00B4D8);border-radius:4px;vertical-align:middle;margin:0 6px"></span>';
  html+='<div>'+dists[di]+'ft: '+bar+rate+'% ('+made+'/'+cnt+')</div>';
}
html+='</div></div>';

html+='<div class="v16-card"><h3>&#x1F4DD; PGA Tour &#xD37C;&#xD305; &#xBE44;&#xAD50;</h3>';
html+='<div style="font-size:.82em;color:#aaa;line-height:1.7">';
html+='<div>&#x2022; 3ft: PGA 99.5% / &#xC544;&#xB9C8;&#xCD94;&#xC5B4; 92%</div>';
html+='<div>&#x2022; 5ft: PGA 77% / &#xC544;&#xB9C8;&#xCD94;&#xC5B4; 58%</div>';
html+='<div>&#x2022; 10ft: PGA 40% / &#xC544;&#xB9C8;&#xCD94;&#xC5B4; 22%</div>';
html+='<div>&#x2022; 15ft: PGA 23% / &#xC544;&#xB9C8;&#xCD94;&#xC5B4; 12%</div>';
html+='<div>&#x2022; 20ft: PGA 14% / &#xC544;&#xB9C8;&#xCD94;&#xC5B4; 7%</div>';
html+='<div>&#x2022; 30ft: PGA 6% / &#xC544;&#xB9C8;&#xCD94;&#xC5B4; 3%</div>';
html+='</div></div>';

if(data.length>0){
html+='<button class="v16-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'&#xD37C;&#xD305; &#xB370;&#xC774;&#xD130;&#xB97C; &#xCD08;&#xAE30;&#xD654;&#xD560;&#xAE4C;&#xC694;?\'))window._v16ResetPutt()">&#xB370;&#xC774;&#xD130; &#xCD08;&#xAE30;&#xD654;</button>';
}
pn.innerHTML=html;
openPanel('puttmatrix');
drawPuttCanvas(data);
}

window._v16RecordPutt=function(){
var dist=parseInt(document.getElementById('v16-pm-dist').value);
var slope=document.getElementById('v16-pm-slope').value;
var result=document.getElementById('v16-pm-result').value;
var data=lsGet('putt_data',[]);
data.push({dist:dist,slope:slope,result:result,date:todayStr()});
if(data.length>500) data=data.slice(-500);
lsSet('putt_data',data);
playSfx('putt_record');
showToast('&#xD37C;&#xD305; &#xAE30;&#xB85D; &#xC800;&#xC7A5; ('+dist+'ft '+result+')');
showPuttingMatrix();
};
window._v16ResetPutt=function(){lsSet('putt_data',[]);showPuttingMatrix();};

function drawPuttCanvas(data){
var c=document.getElementById('v16-putt-canvas');if(!c)return;
var ctx=c.getContext('2d');var W=640,H=380;
ctx.fillStyle='#0c1018';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00FF88';ctx.font='bold 15px sans-serif';ctx.fillText('Putting Distance Heatmap',20,28);
ctx.fillStyle='#555';ctx.font='11px sans-serif';ctx.fillText('&#xAC70;&#xB9AC;(ft) x &#xACBD;&#xC0AC; &#xC131;&#xACF5;&#xB960; &#xD788;&#xD2B8;&#xB9F5;',20,46);

var dists=[3,5,8,10,12,15,18,20,25,30];
var slopes=['&#xD3C9;&#xC9C0;','&#xC624;&#xB974;&#xB9C9;','&#xB0B4;&#xB9AC;&#xB9C9;','&#xC88C;&#xCE21;','&#xC6B0;&#xCE21;'];
var cellW=52,cellH=44,startX=90,startY=72;

ctx.fillStyle='#00FF88';ctx.font='bold 11px sans-serif';
for(var si=0;si<slopes.length;si++){
  ctx.save();ctx.translate(startX+si*cellW+cellW/2,startY-8);
  ctx.fillText(slopes[si],-(ctx.measureText(slopes[si]).width/2),0);ctx.restore();
}
ctx.fillStyle='#aaa';ctx.font='11px sans-serif';
for(var di=0;di<dists.length;di++){
  ctx.fillText(dists[di]+'ft',20,startY+di*cellH+cellH/2+4);
}

for(var row=0;row<dists.length;row++){
  for(var col=0;col<slopes.length;col++){
    var cnt=0,made=0;
    for(var p=0;p<data.length;p++){
      if(data[p].dist===dists[row]&&data[p].slope===slopes[col]){cnt++;if(data[p].result==='in')made++;}
    }
    var rate=cnt>0?made/cnt:0;
    var x=startX+col*cellW,y=startY+row*cellH;
    if(cnt>0){
      var r=Math.round(255*(1-rate)),gn=Math.round(255*rate),b=Math.round(136*rate);
      ctx.fillStyle='rgba('+r+','+gn+','+b+',0.7)';
    } else {
      ctx.fillStyle='rgba(255,255,255,0.03)';
    }
    ctx.beginPath();ctx.roundRect(x+2,y+2,cellW-4,cellH-4,6);ctx.fill();
    ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.stroke();
    if(cnt>0){
      ctx.fillStyle='#fff';ctx.font='bold 13px sans-serif';
      var pct=Math.round(rate*100)+'%';
      ctx.fillText(pct,x+cellW/2-ctx.measureText(pct).width/2,y+cellH/2+2);
      ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='9px sans-serif';
      ctx.fillText(made+'/'+cnt,x+cellW/2-ctx.measureText(made+'/'+cnt).width/2,y+cellH/2+16);
    }
  }
}

var legendY=startY+dists.length*cellH+20;
ctx.fillStyle='#555';ctx.font='10px sans-serif';ctx.fillText('Legend:',20,legendY);
var grad=ctx.createLinearGradient(70,legendY-8,270,legendY-8);
grad.addColorStop(0,'#FF0000');grad.addColorStop(0.5,'#FFFF00');grad.addColorStop(1,'#00FF88');
ctx.fillStyle=grad;ctx.fillRect(70,legendY-10,200,12);
ctx.fillStyle='#888';ctx.fillText('0%',72,legendY+14);ctx.fillText('50%',155,legendY+14);ctx.fillText('100%',250,legendY+14);

var totalMade=0;for(var k=0;k<data.length;k++){if(data[k].result==='in')totalMade++;}
var overallRate=data.length>0?Math.round(totalMade/data.length*100):0;
ctx.fillStyle='#00FF88';ctx.font='bold 24px sans-serif';
ctx.fillText(overallRate+'%',380,100);
ctx.fillStyle='#666';ctx.font='11px sans-serif';ctx.fillText('Overall Make Rate',380,120);
ctx.fillStyle='#00B4D8';ctx.font='bold 18px sans-serif';
ctx.fillText(data.length,380,160);
ctx.fillStyle='#666';ctx.font='11px sans-serif';ctx.fillText('Total Putts Tracked',380,178);

var missTypes={short:0,long:0,left:0,right:0,lip:0};
for(var m=0;m<data.length;m++){if(data[m].result!=='in')missTypes[data[m].result]=(missTypes[data[m].result]||0)+1;}
var missLabels={'short':'&#xC21C;&#xD2B8;','long':'&#xB871;','left':'&#xC88C;&#xCE21;','right':'&#xC6B0;&#xCE21;','lip':'&#xB9BD;&#xC544;&#xC6C3;'};
ctx.fillStyle='#FFB800';ctx.font='bold 12px sans-serif';ctx.fillText('Miss Pattern',380,210);
var my=228;
for(var mk in missTypes){
  ctx.fillStyle='#888';ctx.font='11px sans-serif';
  ctx.fillText((missLabels[mk]||mk)+': '+missTypes[mk],380,my);my+=18;
}
}

// ===== 2. WEATHER IMPACT ANALYZER Canvas 600x360 =====
function showWeatherImpact(){
playSfx('weather_open');
var pn=getPanel('weather');
var records=lsGet('weather_records',[]);
var html='<button class="v16-close" onclick="window._v16Close(\'weather\')">&times;</button>';
html+='<div class="v16-title">&#x1F326;&#xFE0F; &#xB77C;&#xC6B4;&#xB4DC; &#xB0A0;&#xC528; &#xC784;&#xD329;&#xD2B8; &#xBD84;&#xC11D;&#xAE30;</div>';

html+='<div class="v16-card"><h3>&#xB0A0;&#xC528;+&#xC2A4;&#xCF54;&#xC5B4; &#xAE30;&#xB85D;</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:8px">';
html+='<div><label class="v16-label">&#xB0A0;&#xC528;</label><select id="v16-wx-cond" class="v16-input"><option>&#xB9D1;&#xC74C;</option><option>&#xD750;&#xB9BC;</option><option>&#xB9BC;</option><option>&#xAC15;&#xD48D;</option><option>&#xCDA5;&#xC6C0;</option><option>&#xBB34;&#xB354;&#xC6C0;</option></select></div>';
html+='<div><label class="v16-label">&#xAE30;&#xC628;(&#xB3C4;C)</label><input id="v16-wx-temp" class="v16-input" type="number" min="-10" max="45" value="22"></div>';
html+='<div><label class="v16-label">&#xBC14;&#xB78C;(m/s)</label><input id="v16-wx-wind" class="v16-input" type="number" min="0" max="20" step="0.5" value="3"></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:6px">';
html+='<div><label class="v16-label">&#xC2B5;&#xB3C4;(%)</label><input id="v16-wx-humid" class="v16-input" type="number" min="10" max="100" value="55"></div>';
html+='<div><label class="v16-label">18&#xD640; &#xC2A4;&#xCF54;&#xC5B4;</label><input id="v16-wx-score" class="v16-input" type="number" min="60" max="140" value="90"></div>';
html+='<div><label class="v16-label">&#xCF54;&#xC2A4;Par</label><select id="v16-wx-par" class="v16-input"><option>70</option><option selected>72</option><option>71</option><option>73</option></select></div>';
html+='</div>';
html+='<button class="v16-btn v16-btn-primary" style="width:100%;margin-top:10px" onclick="window._v16RecordWeather()">&#xB0A0;&#xC528;+&#xC2A4;&#xCF54;&#xC5B4; &#xC800;&#xC7A5;</button></div>';

html+='<canvas id="v16-weather-canvas" width="600" height="360" style="width:100%;max-width:600px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

if(records.length>=3){
  var condMap={};
  for(var i=0;i<records.length;i++){
    var r=records[i];
    if(!condMap[r.cond])condMap[r.cond]={total:0,count:0};
    condMap[r.cond].total+=r.score-r.par;condMap[r.cond].count++;
  }
  html+='<div class="v16-card"><h3>&#x1F4CA; &#xB0A0;&#xC528;&#xBCC4; &#xD3C9;&#xADE0; &#xC2A4;&#xCF54;&#xC5B4; &#xCC28;&#xC774;</h3>';
  html+='<div style="font-size:.82em;color:#aaa;line-height:1.8">';
  for(var cond in condMap){
    var avg=Math.round(condMap[cond].total/condMap[cond].count*10)/10;
    var sign=avg>0?'+':'';
    var color=avg<=0?'#00FF88':avg<=3?'#FFB800':'#FF3366';
    html+='<div>'+cond+': <span style="color:'+color+';font-weight:700">'+sign+avg+'</span> ('+condMap[cond].count+'&#xB77C;&#xC6B4;&#xB4DC;)</div>';
  }
  html+='</div></div>';

  var tempRanges=[{l:0,h:15,n:'&#xCD94;&#xC6C0;(0-15)'},{l:15,h:25,n:'&#xC801;&#xC628;(15-25)'},{l:25,h:45,n:'&#xB354;&#xC6C0;(25+)'}];
  html+='<div class="v16-card"><h3>&#x1F321;&#xFE0F; &#xAE30;&#xC628; &#xAD6C;&#xAC04;&#xBCC4; &#xC131;&#xC801;</h3>';
  html+='<div style="font-size:.82em;color:#aaa;line-height:1.8">';
  for(var ti=0;ti<tempRanges.length;ti++){
    var tr=tempRanges[ti],cnt2=0,total2=0;
    for(var j=0;j<records.length;j++){if(records[j].temp>=tr.l&&records[j].temp<tr.h){cnt2++;total2+=records[j].score-records[j].par;}}
    if(cnt2>0){var avg2=Math.round(total2/cnt2*10)/10;var s2=avg2>0?'+':'';
    html+='<div>'+tr.n+': <span style="color:'+(avg2<=0?'#00FF88':'#FFB800')+';font-weight:700">'+s2+avg2+'</span> ('+cnt2+'R)</div>';}
  }
  html+='</div></div>';
}

html+='<div class="v16-card"><h3>&#x1F4A1; &#xB0A0;&#xC528; &#xC804;&#xB7B5; &#xD301;</h3>';
html+='<div style="font-size:.82em;color:#aaa;line-height:1.7">';
html+='<div>&#x2022; &#xBC14;&#xB78C; 5m/s &#xC774;&#xC0C1;: &#xD074;&#xB7FD;&#xC744; 1-2&#xBC88; &#xB354; &#xC7A1;&#xC544; &#xB0AE;&#xAC8C; &#xCE58;&#xC138;&#xC694;</div>';
html+='<div>&#x2022; &#xBE44; &#xC624;&#xB294; &#xB0A0;: &#xADF8;&#xB9BD;&#xC744; &#xAC15;&#xD558;&#xAC8C;, &#xBC31;&#xC2A4;&#xD540; &#xC904;&#xC5EC; &#xBC29;&#xD5A5;&#xC131; &#xD655;&#xBCF4;</div>';
html+='<div>&#x2022; &#xCD94;&#xC6B4; &#xB0A0;(10&#xB3C4; &#xC774;&#xD558;): &#xBE44;&#xAC70;&#xB9AC; 5-10% &#xAC10;&#xC18C; &#xACC4;&#xC0B0;</div>';
html+='<div>&#x2022; &#xB354;&#xC6B4; &#xB0A0;(30&#xB3C4;+): &#xC218;&#xBD84; &#xBCF4;&#xCDA9; &#xD544;&#xC218;, 3&#xD640;&#xB9C8;&#xB2E4; &#xBB3C; &#xB9C8;&#xC2DC;&#xAE30;</div>';
html+='</div></div>';

if(records.length>0){
html+='<button class="v16-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'&#xB0A0;&#xC528; &#xB370;&#xC774;&#xD130;&#xB97C; &#xCD08;&#xAE30;&#xD654;&#xD560;&#xAE4C;&#xC694;?\'))window._v16ResetWeather()">&#xB370;&#xC774;&#xD130; &#xCD08;&#xAE30;&#xD654;</button>';
}
pn.innerHTML=html;
openPanel('weather');
drawWeatherCanvas(records);
}

window._v16RecordWeather=function(){
var cond=document.getElementById('v16-wx-cond').value;
var temp=parseFloat(document.getElementById('v16-wx-temp').value);
var wind=parseFloat(document.getElementById('v16-wx-wind').value);
var humid=parseInt(document.getElementById('v16-wx-humid').value);
var score=parseInt(document.getElementById('v16-wx-score').value);
var par=parseInt(document.getElementById('v16-wx-par').value);
var records=lsGet('weather_records',[]);
records.push({cond:cond,temp:temp,wind:wind,humid:humid,score:score,par:par,date:todayStr()});
if(records.length>200)records=records.slice(-200);
lsSet('weather_records',records);
playSfx('weather_analyze');
showToast('&#xB0A0;&#xC528;+&#xC2A4;&#xCF54;&#xC5B4; &#xC800;&#xC7A5; ('+cond+' '+score+'&#xD0C0;)');
showWeatherImpact();
};
window._v16ResetWeather=function(){lsSet('weather_records',[]);showWeatherImpact();};

function drawWeatherCanvas(records){
var c=document.getElementById('v16-weather-canvas');if(!c)return;
var ctx=c.getContext('2d');var W=600,H=360;
ctx.fillStyle='#0c1018';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00FF88';ctx.font='bold 14px sans-serif';ctx.fillText('Weather Impact Analysis',20,28);
ctx.fillStyle='#555';ctx.font='11px sans-serif';ctx.fillText('&#xAE30;&#xC628; vs &#xC2A4;&#xCF54;&#xC5B4; &#xC0C1;&#xAD00;&#xAD00;&#xACC4; &#xC2A4;&#xCE90;&#xD130; &#xD50C;&#xB86F;',20,46);

var plotX=60,plotY=60,plotW=250,plotH=260;
ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.lineWidth=1;
ctx.strokeRect(plotX,plotY,plotW,plotH);
for(var g=0;g<=4;g++){
  var gy=plotY+g*(plotH/4);
  ctx.beginPath();ctx.moveTo(plotX,gy);ctx.lineTo(plotX+plotW,gy);ctx.stroke();
}
ctx.fillStyle='#888';ctx.font='10px sans-serif';
ctx.fillText('&#xAE30;&#xC628;(&#xB3C4;C)',plotX+plotW/2-20,plotY+plotH+30);
ctx.save();ctx.translate(plotX-28,plotY+plotH/2);ctx.rotate(-Math.PI/2);ctx.fillText('&#xC2A4;&#xCF54;&#xC5B4;(vs Par)',0,0);ctx.restore();

var condColors={'&#xB9D1;&#xC74C;':'#FFD700','&#xD750;&#xB9BC;':'#A0A0A0','&#xBE44;':'#4FC3F7','&#xAC15;&#xD48D;':'#AB47BC','&#xCDA5;&#xC6C0;':'#42A5F5','&#xBB34;&#xB354;&#xC6C0;':'#FF7043'};
for(var i=0;i<records.length;i++){
  var r=records[i];
  var px=plotX+((r.temp+10)/55)*plotW;
  var scoreDiff=r.score-r.par;
  var py=plotY+plotH/2-scoreDiff*(plotH/40);
  py=Math.max(plotY,Math.min(plotY+plotH,py));
  ctx.fillStyle=condColors[r.cond]||'#00FF88';
  ctx.beginPath();ctx.arc(px,py,5,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='rgba(255,255,255,0.15)';ctx.beginPath();ctx.arc(px,py,8,0,Math.PI*2);ctx.fill();
}

ctx.strokeStyle='rgba(0,255,136,0.3)';ctx.setLineDash([4,4]);
ctx.beginPath();ctx.moveTo(plotX,plotY+plotH/2);ctx.lineTo(plotX+plotW,plotY+plotH/2);ctx.stroke();
ctx.setLineDash([]);
ctx.fillStyle='rgba(0,255,136,0.4)';ctx.font='9px sans-serif';ctx.fillText('Par',plotX+plotW+4,plotY+plotH/2+4);
ctx.fillStyle='#888';ctx.font='9px sans-serif';
ctx.fillText('-10',plotX,plotY+plotH+16);ctx.fillText('45',plotX+plotW-12,plotY+plotH+16);
ctx.fillText('+20',plotX-24,plotY+8);ctx.fillText('-20',plotX-24,plotY+plotH-4);

var legendX=360,legendY=70;
ctx.fillStyle='#00FF88';ctx.font='bold 12px sans-serif';ctx.fillText('Legend',legendX,legendY);
var lyi=0;
for(var cn in condColors){
  ctx.fillStyle=condColors[cn];ctx.beginPath();ctx.arc(legendX+6,legendY+20+lyi*22,5,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#aaa';ctx.font='11px sans-serif';ctx.fillText(cn,legendX+18,legendY+24+lyi*22);lyi++;
}

if(records.length>=2){
  var sumX=0,sumY=0,sumXY=0,sumX2=0,n=records.length;
  for(var k=0;k<n;k++){sumX+=records[k].temp;sumY+=(records[k].score-records[k].par);sumXY+=records[k].temp*(records[k].score-records[k].par);sumX2+=records[k].temp*records[k].temp;}
  var denom=n*sumX2-sumX*sumX;
  if(Math.abs(denom)>0.001){
    var slope=(n*sumXY-sumX*sumY)/denom;
    var intercept=(sumY-slope*sumX)/n;
    var corrNum=n*sumXY-sumX*sumY;
    var corrDenA=Math.sqrt(n*sumX2-sumX*sumX);
    var sumY2=0;for(var l=0;l<n;l++)sumY2+=(records[l].score-records[l].par)*(records[l].score-records[l].par);
    var corrDenB=Math.sqrt(n*sumY2-sumY*sumY);
    var corr=corrDenA*corrDenB>0?corrNum/(corrDenA*corrDenB):0;
    ctx.fillStyle='#00B4D8';ctx.font='bold 13px sans-serif';
    ctx.fillText('&#xC0C1;&#xAD00;&#xACC4;&#xC218;: '+corr.toFixed(3),legendX,legendY+170);
    ctx.fillStyle='#888';ctx.font='11px sans-serif';
    ctx.fillText('&#xAE30;&#xC6B8;&#xAE30;: '+(slope>0?'+':'')+slope.toFixed(3)+'/&#xB3C4;',legendX,legendY+190);
    var interp=Math.abs(corr)<0.2?'&#xBB34;&#xAD00;':corr<-0.4?'&#xCD94;&#xC6B8;&#xC218;&#xB85D; &#xC88B;&#xC544;&#xC9D0;':corr>0.4?'&#xB354;&#xC6B8;&#xC218;&#xB85D; &#xC88B;&#xC544;&#xC9D0;':'&#xC57D;&#xD55C; &#xC0C1;&#xAD00;';
    ctx.fillText('&#xD574;&#xC11D;: '+interp,legendX,legendY+210);
  }
}
ctx.fillStyle='#555';ctx.font='10px sans-serif';
ctx.fillText('Total: '+records.length+' rounds',legendX,H-20);
}

// ===== 3. CLUB MISS PATTERN ANALYZER Canvas 580x380 =====
function showMissPattern(){
playSfx('miss_open');
var pn=getPanel('misspattern');
var data=lsGet('miss_data',[]);
var clubs=['DR','3W','5W','3I','4I','5I','6I','7I','8I','9I','PW','AW','SW','LW'];
var html='<button class="v16-close" onclick="window._v16Close(\'misspattern\')">&times;</button>';
html+='<div class="v16-title">&#x1F4CD; &#xD074;&#xB7FD;&#xBCC4; &#xBBF8;&#xC2A4; &#xD328;&#xD134; &#xBD84;&#xC11D;&#xAE30;</div>';

html+='<div class="v16-card"><h3>&#xC0F7; &#xACB0;&#xACFC; &#xAE30;&#xB85D;</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v16-label">&#xD074;&#xB7FD;</label><select id="v16-mp-club" class="v16-input">';
for(var ci=0;ci<clubs.length;ci++) html+='<option>'+clubs[ci]+'</option>';
html+='</select></div>';
html+='<div><label class="v16-label">&#xACB0;&#xACFC;</label><select id="v16-mp-result" class="v16-input"><option value="straight">&#xC2A4;&#xD2B8;&#xB808;&#xC774;&#xD2B8;</option><option value="push">&#xD478;&#xC2DC;</option><option value="pull">&#xD480;</option><option value="slice">&#xC2AC;&#xB77C;&#xC774;&#xC2A4;</option><option value="hook">&#xD6C5;</option><option value="top">&#xD0D1;</option><option value="fat">&#xB545;&#xD551;</option><option value="shank">&#xC0C1;&#xD06C;</option></select></div>';
html+='<div><label class="v16-label">&#xC2EC;&#xAC01;&#xB3C4;</label><select id="v16-mp-sev" class="v16-input"><option value="1">&#xC57D;&#xAC04;</option><option value="2" selected>&#xBCF4;&#xD1B5;</option><option value="3">&#xC2EC;&#xD568;</option></select></div>';
html+='</div>';
html+='<button class="v16-btn v16-btn-primary" style="width:100%;margin-top:10px" onclick="window._v16RecordMiss()">&#xBBF8;&#xC2A4; &#xAE30;&#xB85D; &#xC800;&#xC7A5;</button></div>';

html+='<canvas id="v16-miss-canvas" width="580" height="380" style="width:100%;max-width:580px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

html+='<div class="v16-card"><h3>&#x1F4CA; &#xD074;&#xB7FD;&#xBCC4; &#xBBF8;&#xC2A4; &#xBE44;&#xC728;</h3>';
html+='<div style="max-height:240px;overflow-y:auto;font-size:.82em;color:#aaa;line-height:1.8">';
for(var cci=0;cci<clubs.length;cci++){
  var clubData=data.filter(function(x){return x.club===clubs[cci]});
  if(clubData.length===0) continue;
  var straight=clubData.filter(function(x){return x.result==='straight'}).length;
  var accuracy=Math.round(straight/clubData.length*100);
  var dominant='';var maxCnt=0;
  var types=['push','pull','slice','hook','top','fat','shank'];
  for(var ti=0;ti<types.length;ti++){
    var tc=clubData.filter(function(x){return x.result===types[ti]}).length;
    if(tc>maxCnt){maxCnt=tc;dominant=types[ti];}
  }
  html+='<div>'+clubs[cci]+': &#xC815;&#xD0C0;&#xC728; <span style="color:'+(accuracy>=70?'#00FF88':accuracy>=40?'#FFB800':'#FF3366')+';font-weight:700">'+accuracy+'%</span> ('+clubData.length+'&#xC0F7;)';
  if(dominant&&maxCnt>0) html+=' &#x2192; &#xC8FC;&#xC694; &#xBBF8;&#xC2A4;: <span style="color:#FF3366">'+dominant+'</span>('+maxCnt+'&#xD68C;)';
  html+='</div>';
}
html+='</div></div>';

html+='<div class="v16-card"><h3>&#x1F4A1; &#xBBF8;&#xC2A4; &#xAD50;&#xC815; &#xAC00;&#xC774;&#xB4DC;</h3>';
html+='<div style="font-size:.82em;color:#aaa;line-height:1.7">';
html+='<div>&#x2022; &#xC2AC;&#xB77C;&#xC774;&#xC2A4;: &#xADF8;&#xB9BD;&#xC744; &#xAC15;&#xD558;&#xAC8C;, &#xCE74;&#xD2B8; &#xBC29;&#xC9C0;&#xB97C; &#xC704;&#xD574; &#xD074;&#xB7FD;&#xD398;&#xC774;&#xC2A4; &#xB2EB;&#xAE30;</div>';
html+='<div>&#x2022; &#xD6C5;: &#xADF8;&#xB9BD; &#xC555;&#xB825;&#xC744; &#xC904;&#xC774;&#xACE0; &#xB9B4;&#xB9AC;&#xC2A4;&#xC5D0; &#xC9D1;&#xC911;</div>';
html+='<div>&#x2022; &#xD478;&#xC2DC;/&#xD480;: &#xC5BC;&#xB77C;&#xC778;&#xBA3C;&#xD2B8;&#xB97C; &#xD655;&#xC778;, &#xC5B4;&#xB4DC;&#xB808;&#xC2A4; &#xC2DC; &#xBAA9;&#xD45C;&#xC120; &#xC7AC;&#xD655;&#xC778;</div>';
html+='<div>&#x2022; &#xD0D1;: &#xD5E4;&#xB4DC;&#xC5C5; &#xBC29;&#xC9C0;, &#xC2A4;&#xD14C;&#xB514; &#xD5E4;&#xB4DC;&#xB85C; &#xC784;&#xD329;&#xD2B8;</div>';
html+='<div>&#x2022; &#xB545;&#xD551;: &#xACF5; &#xC704;&#xCE58;&#xB97C; &#xC55E;&#xC73C;&#xB85C;, &#xCCB4;&#xC911;&#xC774;&#xB3D9; &#xB9AC;&#xB4DC;</div>';
html+='</div></div>';

if(data.length>0){
html+='<button class="v16-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'&#xBBF8;&#xC2A4; &#xB370;&#xC774;&#xD130; &#xCD08;&#xAE30;&#xD654;?\'))window._v16ResetMiss()">&#xB370;&#xC774;&#xD130; &#xCD08;&#xAE30;&#xD654;</button>';
}
pn.innerHTML=html;
openPanel('misspattern');
drawMissCanvas(data);
}

window._v16RecordMiss=function(){
var club=document.getElementById('v16-mp-club').value;
var result=document.getElementById('v16-mp-result').value;
var sev=parseInt(document.getElementById('v16-mp-sev').value);
var data=lsGet('miss_data',[]);
data.push({club:club,result:result,severity:sev,date:todayStr()});
if(data.length>600)data=data.slice(-600);
lsSet('miss_data',data);
playSfx('miss_record');
showToast(club+' '+result+' &#xAE30;&#xB85D; &#xC644;&#xB8CC;');
showMissPattern();
};
window._v16ResetMiss=function(){lsSet('miss_data',[]);showMissPattern();};

function drawMissCanvas(data){
var c=document.getElementById('v16-miss-canvas');if(!c)return;
var ctx=c.getContext('2d');var W=580,H=380;
ctx.fillStyle='#0c1018';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00FF88';ctx.font='bold 14px sans-serif';ctx.fillText('Club Miss Pattern Polar Chart',20,28);
ctx.fillStyle='#555';ctx.font='11px sans-serif';ctx.fillText('&#xD074;&#xB7FD;&#xBCC4; &#xBBF8;&#xC2A4; &#xBC29;&#xD5A5; &#xADF9;&#xC88C;&#xD45C; &#xC2DC;&#xAC01;&#xD654;',20,46);

var cx=200,cy=210,radius=130;
ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.lineWidth=1;
for(var r=1;r<=4;r++){
  ctx.beginPath();ctx.arc(cx,cy,radius*r/4,0,Math.PI*2);ctx.stroke();
}
var directions=[
  {name:'&#xC2A4;&#xD2B8;&#xB808;&#xC774;&#xD2B8;',key:'straight',angle:-Math.PI/2},
  {name:'&#xD478;&#xC2DC;',key:'push',angle:-Math.PI/4},
  {name:'&#xC2AC;&#xB77C;&#xC774;&#xC2A4;',key:'slice',angle:0},
  {name:'&#xD0D1;',key:'top',angle:Math.PI/4},
  {name:'&#xB545;&#xD551;',key:'fat',angle:Math.PI/2},
  {name:'&#xC0C1;&#xD06C;',key:'shank',angle:3*Math.PI/4},
  {name:'&#xD6C5;',key:'hook',angle:Math.PI},
  {name:'&#xD480;',key:'pull',angle:-3*Math.PI/4}
];
ctx.strokeStyle='rgba(255,255,255,0.05)';
for(var di=0;di<directions.length;di++){
  var a=directions[di].angle;
  ctx.beginPath();ctx.moveTo(cx,cy);
  ctx.lineTo(cx+Math.cos(a)*radius,cy+Math.sin(a)*radius);ctx.stroke();
  ctx.fillStyle='#888';ctx.font='10px sans-serif';
  var lx=cx+Math.cos(a)*(radius+16)-15,ly=cy+Math.sin(a)*(radius+16)+4;
  ctx.fillText(directions[di].name,lx,ly);
}

var dirCounts={};var total=data.length||1;
for(var k=0;k<data.length;k++){
  dirCounts[data[k].result]=(dirCounts[data[k].result]||0)+1;
}
var pts=[];
for(var dj=0;dj<directions.length;dj++){
  var cnt=dirCounts[directions[dj].key]||0;
  var pct=cnt/total;
  var dist=pct*radius*3;dist=Math.min(dist,radius);
  pts.push({x:cx+Math.cos(directions[dj].angle)*dist,y:cy+Math.sin(directions[dj].angle)*dist});
}
if(data.length>0){
  ctx.beginPath();ctx.moveTo(pts[0].x,pts[0].y);
  for(var pi=1;pi<pts.length;pi++) ctx.lineTo(pts[pi].x,pts[pi].y);
  ctx.closePath();
  ctx.fillStyle='rgba(0,255,136,0.12)';ctx.fill();
  ctx.strokeStyle='rgba(0,255,136,0.6)';ctx.lineWidth=2;ctx.stroke();
  for(var pp=0;pp<pts.length;pp++){
    ctx.fillStyle='#00FF88';ctx.beginPath();ctx.arc(pts[pp].x,pts[pp].y,4,0,Math.PI*2);ctx.fill();
  }
}

var statsX=400,statsY=70;
ctx.fillStyle='#00FF88';ctx.font='bold 12px sans-serif';ctx.fillText('Shot Distribution',statsX,statsY);
var resultColors={straight:'#00FF88',push:'#FFB800',pull:'#42A5F5',slice:'#FF3366',hook:'#AB47BC',top:'#FF7043',fat:'#795548',shank:'#F44336'};
var resultNames={straight:'&#xC2A4;&#xD2B8;&#xB808;&#xC774;&#xD2B8;',push:'&#xD478;&#xC2DC;',pull:'&#xD480;',slice:'&#xC2AC;&#xB77C;&#xC774;&#xC2A4;',hook:'&#xD6C5;',top:'&#xD0D1;',fat:'&#xB545;&#xD551;',shank:'&#xC0C1;&#xD06C;'};
var sy=statsY+18;
for(var rk in resultNames){
  var rc=dirCounts[rk]||0;
  if(rc===0&&rk!=='straight')continue;
  ctx.fillStyle=resultColors[rk];ctx.beginPath();ctx.arc(statsX+6,sy-3,4,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#aaa';ctx.font='11px sans-serif';
  ctx.fillText(resultNames[rk]+': '+rc+' ('+Math.round(rc/total*100)+'%)',statsX+16,sy);
  sy+=20;
}
ctx.fillStyle='#555';ctx.font='10px sans-serif';ctx.fillText('Total: '+data.length+' shots',statsX,H-20);
}

// ===== 4. GOLF IQ LEVEL SYSTEM Canvas 560x360 =====
function showGolfIQ(){
playSfx('iq_levelup');
var pn=getPanel('golfiq');
var xp=lsGet('iq_xp',0);
var activities=lsGet('iq_activities',[]);
var levels=[
  {lv:1,name:'&#xBE44;&#xAE30;&#xB108;',min:0,max:100},
  {lv:2,name:'&#xB8E8;&#xD0A4;',min:100,max:300},
  {lv:3,name:'&#xC5B4;&#xD504;&#xB80C;&#xD2F0;&#xC2A4;',min:300,max:600},
  {lv:4,name:'&#xC544;&#xB9C8;&#xCD94;&#xC5B4;',min:600,max:1000},
  {lv:5,name:'&#xC2F1;&#xAE00;&#xD50C;&#xB808;&#xC774;&#xC5B4;',min:1000,max:1500},
  {lv:6,name:'&#xD074;&#xB7FD;&#xCC54;&#xD53C;&#xC5B8;',min:1500,max:2200},
  {lv:7,name:'&#xD504;&#xB85C;',min:2200,max:3000},
  {lv:8,name:'&#xD22C;&#xC5B4;&#xD504;&#xB85C;',min:3000,max:4000},
  {lv:9,name:'&#xB9C8;&#xC2A4;&#xD130;',min:4000,max:5500},
  {lv:10,name:'&#xB808;&#xC804;&#xB4DC;',min:5500,max:99999}
];
var curLevel=levels[0];
for(var i=0;i<levels.length;i++){if(xp>=levels[i].min)curLevel=levels[i];}
var nextXP=curLevel.max;var progress=nextXP<99999?Math.round((xp-curLevel.min)/(nextXP-curLevel.min)*100):100;

var html='<button class="v16-close" onclick="window._v16Close(\'golfiq\')">&times;</button>';
html+='<div class="v16-title">&#x1F9E0; Golf IQ &#xB808;&#xBCA8; &#xC2DC;&#xC2A4;&#xD15C;</div>';

html+='<canvas id="v16-iq-canvas" width="560" height="360" style="width:100%;max-width:560px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#00FF88">Lv.'+curLevel.lv+'</div><div class="v16-stat-label">'+curLevel.name+'</div></div>';
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#FFB800">'+xp+'</div><div class="v16-stat-label">Total XP</div></div>';
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#00B4D8">'+progress+'%</div><div class="v16-stat-label">&#xB2E4;&#xC74C; &#xB808;&#xBCA8;</div></div>';
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#E8A87C">'+activities.length+'</div><div class="v16-stat-label">&#xD65C;&#xB3D9; &#xC218;</div></div>';
html+='</div>';

html+='<div class="v16-card"><h3>&#x2B50; XP &#xD68D;&#xB4DD; &#xD65C;&#xB3D9;</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:6px;margin-top:8px">';
var xpActivities=[
  {name:'&#xB77C;&#xC6B4;&#xB4DC; &#xC644;&#xB8CC;',xp:50,icon:'&#x26F3;'},
  {name:'&#xC5F0;&#xC2B5;&#xC7A5; &#xBC29;&#xBB38;',xp:20,icon:'&#x1F3CC;&#xFE0F;'},
  {name:'&#xD37C;&#xD305; &#xC5F0;&#xC2B5; 30&#xBD84;',xp:15,icon:'&#x1F3AF;'},
  {name:'&#xCF54;&#xC2A4; &#xACF5;&#xB7B5;',xp:10,icon:'&#x1F4D6;'},
  {name:'&#xD034;&#xC988; &#xC815;&#xB2F5;',xp:5,icon:'&#x2753;'},
  {name:'&#xC2A4;&#xC708; &#xBD84;&#xC11D;',xp:25,icon:'&#x1F504;'},
  {name:'&#xBA58;&#xD0C8; &#xD2B8;&#xB808;&#xC774;&#xB2DD;',xp:15,icon:'&#x1F9D8;'},
  {name:'&#xB8F0; &#xD559;&#xC2B5;',xp:10,icon:'&#x1F4DC;'}
];
for(var ai=0;ai<xpActivities.length;ai++){
  var act=xpActivities[ai];
  html+='<button class="v16-btn" style="text-align:left;padding:10px" onclick="window._v16GainXP(\''+act.name+'\','+act.xp+')">'+act.icon+' '+act.name+' <span style="color:#FFB800;float:right">+'+act.xp+'XP</span></button>';
}
html+='</div></div>';

html+='<div class="v16-card"><h3>&#x1F3C6; &#xB808;&#xBCA8; &#xB85C;&#xB4DC;&#xB9F5;</h3>';
html+='<div style="font-size:.82em;color:#aaa;line-height:1.8">';
for(var li=0;li<levels.length;li++){
  var l=levels[li];
  var unlocked=xp>=l.min;
  html+='<div style="opacity:'+(unlocked?1:0.4)+'">'+(unlocked?'&#x2705;':'&#x1F512;')+' Lv.'+l.lv+' '+l.name+' ('+l.min+'XP)</div>';
}
html+='</div></div>';

if(activities.length>0){
html+='<div class="v16-card"><h3>&#x1F4C5; &#xCD5C;&#xADFC; &#xD65C;&#xB3D9;</h3>';
html+='<div style="max-height:160px;overflow-y:auto;font-size:.82em;color:#aaa;line-height:1.7">';
var recent=activities.slice(-10).reverse();
for(var ri=0;ri<recent.length;ri++){
  html+='<div>'+recent[ri].date+' - '+recent[ri].name+' <span style="color:#FFB800">+'+recent[ri].xp+'XP</span></div>';
}
html+='</div></div>';
}
pn.innerHTML=html;
openPanel('golfiq');
drawIQCanvas(xp,curLevel,levels);
}

window._v16GainXP=function(name,xp){
var totalXP=lsGet('iq_xp',0);
var oldLevel=1;
var levels=[{lv:1,min:0},{lv:2,min:100},{lv:3,min:300},{lv:4,min:600},{lv:5,min:1000},{lv:6,min:1500},{lv:7,min:2200},{lv:8,min:3000},{lv:9,min:4000},{lv:10,min:5500}];
for(var i=0;i<levels.length;i++){if(totalXP>=levels[i].min)oldLevel=levels[i].lv;}
totalXP+=xp;
lsSet('iq_xp',totalXP);
var activities=lsGet('iq_activities',[]);
activities.push({name:name,xp:xp,date:todayStr()});
if(activities.length>200)activities=activities.slice(-200);
lsSet('iq_activities',activities);
var newLevel=1;
for(var j=0;j<levels.length;j++){if(totalXP>=levels[j].min)newLevel=levels[j].lv;}
if(newLevel>oldLevel){playSfx('iq_levelup');showToast('&#x1F389; &#xB808;&#xBCA8;&#xC5C5;! Lv.'+newLevel+'!');}
else{playSfx('putt_record');showToast(name+' +'+xp+'XP (&#xCD1D; '+totalXP+'XP)');}
showGolfIQ();
};

function drawIQCanvas(xp,curLevel,levels){
var c=document.getElementById('v16-iq-canvas');if(!c)return;
var ctx=c.getContext('2d');var W=560,H=360;
ctx.fillStyle='#0c1018';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00FF88';ctx.font='bold 14px sans-serif';ctx.fillText('Golf IQ Skill Tree',20,28);

var treeX=40,treeY=60;
var nodeW=90,nodeH=50,gapX=12,gapY=12;
var cols=5,rows=2;
for(var i=0;i<levels.length;i++){
  var col=i%cols,row=Math.floor(i/cols);
  var x=treeX+col*(nodeW+gapX),y=treeY+row*(nodeH+gapY+30);
  var unlocked=xp>=levels[i].min;
  var isCurrent=curLevel.lv===levels[i].lv;

  if(i>0&&col>0){
    var prevX=treeX+(col-1)*(nodeW+gapX)+nodeW;
    ctx.strokeStyle=unlocked?'rgba(0,255,136,0.4)':'rgba(255,255,255,0.06)';
    ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(prevX,y+nodeH/2);ctx.lineTo(x,y+nodeH/2);ctx.stroke();
  }
  if(i===5){
    var aboveX=treeX+4*(nodeW+gapX)+nodeW/2;
    ctx.strokeStyle=unlocked?'rgba(0,255,136,0.4)':'rgba(255,255,255,0.06)';
    ctx.beginPath();ctx.moveTo(aboveX,treeY+nodeH);ctx.lineTo(treeX+nodeW/2,y);ctx.stroke();
  }

  ctx.fillStyle=isCurrent?'rgba(0,255,136,0.2)':unlocked?'rgba(0,255,136,0.08)':'rgba(255,255,255,0.03)';
  ctx.strokeStyle=isCurrent?'#00FF88':unlocked?'rgba(0,255,136,0.3)':'rgba(255,255,255,0.08)';
  ctx.lineWidth=isCurrent?2:1;
  ctx.beginPath();ctx.roundRect(x,y,nodeW,nodeH,8);ctx.fill();ctx.stroke();

  if(isCurrent){
    ctx.shadowColor='#00FF88';ctx.shadowBlur=12;
    ctx.strokeStyle='#00FF88';ctx.beginPath();ctx.roundRect(x,y,nodeW,nodeH,8);ctx.stroke();
    ctx.shadowBlur=0;
  }

  ctx.fillStyle=unlocked?'#fff':'#555';ctx.font='bold 11px sans-serif';
  ctx.fillText('Lv.'+levels[i].lv,x+8,y+18);
  ctx.fillStyle=unlocked?'#00FF88':'#444';ctx.font='10px sans-serif';
  ctx.fillText(levels[i].name,x+8,y+34);
  ctx.fillStyle='#555';ctx.font='9px sans-serif';
  ctx.fillText(levels[i].min+'XP',x+8,y+46);
}

var barY=240,barX=40,barW=480,barH=24;
var progress=curLevel.max<99999?(xp-curLevel.min)/(curLevel.max-curLevel.min):1;
progress=Math.max(0,Math.min(1,progress));
ctx.fillStyle='rgba(255,255,255,0.05)';ctx.beginPath();ctx.roundRect(barX,barY,barW,barH,12);ctx.fill();
var grad=ctx.createLinearGradient(barX,0,barX+barW*progress,0);
grad.addColorStop(0,'#00FF88');grad.addColorStop(1,'#00B4D8');
ctx.fillStyle=grad;ctx.beginPath();ctx.roundRect(barX,barY,barW*progress,barH,12);ctx.fill();
ctx.fillStyle='#fff';ctx.font='bold 11px sans-serif';
ctx.fillText(xp+' / '+(curLevel.max<99999?curLevel.max:'MAX')+' XP',barX+barW/2-30,barY+16);

ctx.fillStyle='#FFB800';ctx.font='bold 20px sans-serif';
ctx.fillText('Lv.'+curLevel.lv+' '+curLevel.name,40,300);
ctx.fillStyle='#888';ctx.font='12px sans-serif';
ctx.fillText(curLevel.max<99999?'&#xB2E4;&#xC74C; &#xB808;&#xBCA8;&#xAE4C;&#xC9C0; '+(curLevel.max-xp)+'XP &#xB0A8;&#xC74C;':'&#xCD5C;&#xACE0; &#xB808;&#xBCA8; &#xB2EC;&#xC131;!',40,322);

ctx.fillStyle='#555';ctx.font='10px sans-serif';ctx.fillText('Golf IQ v16.0',W-100,H-12);
}

// ===== 5. ROUND MOMENTUM TRACKER Canvas 620x360 =====
function showMomentum(){
playSfx('momentum_open');
var pn=getPanel('momentum');
var data=lsGet('momentum_rounds',[]);
var html='<button class="v16-close" onclick="window._v16Close(\'momentum\')">&times;</button>';
html+='<div class="v16-title">&#x1F30A; &#xB77C;&#xC6B4;&#xB4DC; &#xBAA8;&#xBA58;&#xD140; &#xD2B8;&#xB798;&#xCEE4;</div>';

html+='<div class="v16-card"><h3>18&#xD640; &#xC2A4;&#xCF54;&#xC5B4; &#xC785;&#xB825;</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:4px;margin-top:8px">';
for(var h=1;h<=18;h++){
  html+='<div><label class="v16-label" style="text-align:center">'+h+'H</label>';
  html+='<input id="v16-mom-h'+h+'" class="v16-input" type="number" min="1" max="12" value="" placeholder="Par" style="text-align:center;padding:6px 2px"></div>';
}
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v16-label">&#xCF54;&#xC2A4;&#xBA85;</label><input id="v16-mom-course" class="v16-input" placeholder="&#xCF54;&#xC2A4;&#xBA85;"></div>';
html+='<div><label class="v16-label">Par</label><select id="v16-mom-par" class="v16-input"><option>70</option><option selected>72</option><option>71</option><option>73</option></select></div>';
html+='</div>';
html+='<button class="v16-btn v16-btn-primary" style="width:100%;margin-top:10px" onclick="window._v16RecordMomentum()">&#xBAA8;&#xBA58;&#xD140; &#xBD84;&#xC11D; &#xC2DC;&#xC791;</button></div>';

html+='<canvas id="v16-momentum-canvas" width="620" height="360" style="width:100%;max-width:620px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

if(data.length>0){
  var last=data[data.length-1];
  html+='<div class="v16-card"><h3>&#x1F4CA; &#xCD5C;&#xADFC; &#xBD84;&#xC11D;: '+last.course+'</h3>';
  var birdies=0,pars=0,bogeys=0,doubles=0;
  var parDist=[4,4,4,4,3,4,4,3,5,4,4,3,4,4,5,4,3,5];
  for(var si=0;si<last.scores.length;si++){
    var diff=last.scores[si]-(parDist[si]||4);
    if(diff<=-1)birdies++;else if(diff===0)pars++;else if(diff===1)bogeys++;else doubles++;
  }
  html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:8px">';
  html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#00FF88">'+birdies+'</div><div class="v16-stat-label">&#xBC84;&#xB514;+</div></div>';
  html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#00B4D8">'+pars+'</div><div class="v16-stat-label">Par</div></div>';
  html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#FFB800">'+bogeys+'</div><div class="v16-stat-label">&#xBCF4;&#xAE30;</div></div>';
  html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#FF3366">'+doubles+'</div><div class="v16-stat-label">&#xB354;&#xBE14;+</div></div>';
  html+='</div>';

  var streaks=[],curStreak={type:'',len:0,start:0};
  for(var sj=0;sj<last.scores.length;sj++){
    var d2=last.scores[sj]-(parDist[sj]||4);
    var tp=d2<0?'under':d2===0?'par':'over';
    if(tp===curStreak.type){curStreak.len++;}
    else{if(curStreak.len>=2)streaks.push({type:curStreak.type,len:curStreak.len,start:curStreak.start+1});curStreak={type:tp,len:1,start:sj};}
  }
  if(curStreak.len>=2)streaks.push({type:curStreak.type,len:curStreak.len,start:curStreak.start+1});
  if(streaks.length>0){
    html+='<div style="margin-top:8px;font-size:.82em;color:#aaa;line-height:1.7">';
    html+='<div style="font-weight:700;color:#00FF88;margin-bottom:4px">&#xC5F0;&#xC18D; &#xC2A4;&#xD2B8;&#xB9AD;:</div>';
    for(var sk=0;sk<streaks.length;sk++){
      var s=streaks[sk];
      var typeText=s.type==='under'?'&#xBC84;&#xB514;+':s.type==='par'?'Par':'&#xBCF4;&#xAE30;+';
      var typeColor=s.type==='under'?'#00FF88':s.type==='par'?'#00B4D8':'#FF3366';
      html+='<div>'+s.start+'~'+(s.start+s.len-1)+'H: <span style="color:'+typeColor+'">'+typeText+' '+s.len+'&#xC5F0;&#xC18D;</span></div>';
    }
    html+='</div>';
  }
  html+='</div>';
}

html+='<div class="v16-card"><h3>&#x1F4A1; &#xBAA8;&#xBA58;&#xD140; &#xAD00;&#xB9AC; &#xD301;</h3>';
html+='<div style="font-size:.82em;color:#aaa;line-height:1.7">';
html+='<div>&#x2022; &#xBCF4;&#xAE30; &#xD6C4;: &#xB2E4;&#xC74C; &#xD640;&#xC5D0;&#xC11C; &#xACF5;&#xACA9;&#xC801;&#xC774;&#xC9C0; &#xB9D0;&#xACE0; &#xC548;&#xC804;&#xD558;&#xAC8C;</div>';
html+='<div>&#x2022; &#xBC84;&#xB514; &#xD6C4;: &#xBAA8;&#xBA58;&#xD140;&#xC744; &#xD65C;&#xC6A9;&#xD558;&#xB418; &#xACFC;&#xC695; &#xAE08;&#xBB3C;</div>';
html+='<div>&#x2022; &#xC804;&#xBC18;&#xACFC; &#xD6C4;&#xBC18;&#xC758; &#xC2A4;&#xCF54;&#xC5B4; &#xBCC0;&#xD654;&#xB97C; &#xCD94;&#xC801;&#xD558;&#xC138;&#xC694;</div>';
html+='<div>&#x2022; 3&#xC5F0;&#xC18D; &#xBCF4;&#xAE30; &#xC774;&#xC0C1;&#xC2DC; &#xBA58;&#xD0C8; &#xB9AC;&#xC14B; &#xD544;&#xC694;</div>';
html+='</div></div>';

pn.innerHTML=html;
openPanel('momentum');
drawMomentumCanvas(data);
}

window._v16RecordMomentum=function(){
var scores=[];
for(var h=1;h<=18;h++){
  var val=document.getElementById('v16-mom-h'+h).value;
  if(!val){showToast('&#xBAA8;&#xB4E0; 18&#xD640; &#xC2A4;&#xCF54;&#xC5B4;&#xB97C; &#xC785;&#xB825;&#xD574;&#xC8FC;&#xC138;&#xC694;');return;}
  scores.push(parseInt(val));
}
var course=document.getElementById('v16-mom-course').value||'&#xBBF8;&#xC9C0;&#xC815;';
var par=parseInt(document.getElementById('v16-mom-par').value);
var data=lsGet('momentum_rounds',[]);
data.push({scores:scores,course:course,par:par,date:todayStr()});
if(data.length>50)data=data.slice(-50);
lsSet('momentum_rounds',data);
playSfx('weather_analyze');
showToast('&#xBAA8;&#xBA58;&#xD140; &#xBD84;&#xC11D; &#xC644;&#xB8CC;!');
showMomentum();
};

function drawMomentumCanvas(data){
var c=document.getElementById('v16-momentum-canvas');if(!c)return;
var ctx=c.getContext('2d');var W=620,H=360;
ctx.fillStyle='#0c1018';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00FF88';ctx.font='bold 14px sans-serif';ctx.fillText('Round Momentum Wave',20,28);
ctx.fillStyle='#555';ctx.font='11px sans-serif';ctx.fillText('18&#xD640; &#xBAA8;&#xBA58;&#xD140; &#xD30C;&#xB3C4; &#xCC28;&#xD2B8;',20,46);

if(data.length===0){
  ctx.fillStyle='#444';ctx.font='14px sans-serif';ctx.fillText('&#xC2A4;&#xCF54;&#xC5B4;&#xB97C; &#xC785;&#xB825;&#xD558;&#xBA74; &#xBAA8;&#xBA58;&#xD140; &#xCC28;&#xD2B8;&#xAC00; &#xD45C;&#xC2DC;&#xB429;&#xB2C8;&#xB2E4;',W/2-130,H/2);
  return;
}
var last=data[data.length-1];
var scores=last.scores;
var parDist=[4,4,4,4,3,4,4,3,5,4,4,3,4,4,5,4,3,5];
var plotX=50,plotY=70,plotW=540,plotH=200;
var midY=plotY+plotH/2;

ctx.strokeStyle='rgba(0,255,136,0.15)';ctx.setLineDash([4,4]);ctx.lineWidth=1;
ctx.beginPath();ctx.moveTo(plotX,midY);ctx.lineTo(plotX+plotW,midY);ctx.stroke();
ctx.setLineDash([]);
ctx.fillStyle='rgba(0,255,136,0.3)';ctx.font='9px sans-serif';ctx.fillText('Par',plotX-28,midY+4);

ctx.strokeStyle='rgba(255,255,255,0.05)';
for(var g=-4;g<=4;g++){
  var gy=midY-g*(plotH/8);
  ctx.beginPath();ctx.moveTo(plotX,gy);ctx.lineTo(plotX+plotW,gy);ctx.stroke();
}

var cumulative=0;
var points=[];
for(var i=0;i<scores.length;i++){
  var diff=scores[i]-(parDist[i]||4);
  cumulative+=diff;
  var x=plotX+i*(plotW/17);
  var y=midY-cumulative*(plotH/16);
  y=Math.max(plotY,Math.min(plotY+plotH,y));
  points.push({x:x,y:y,diff:diff,cum:cumulative,hole:i+1});
}

var gradient=ctx.createLinearGradient(0,plotY,0,plotY+plotH);
gradient.addColorStop(0,'rgba(0,255,136,0.15)');gradient.addColorStop(0.5,'rgba(0,0,0,0)');gradient.addColorStop(1,'rgba(255,51,102,0.15)');
ctx.beginPath();ctx.moveTo(points[0].x,midY);
for(var j=0;j<points.length;j++) ctx.lineTo(points[j].x,points[j].y);
ctx.lineTo(points[points.length-1].x,midY);ctx.closePath();ctx.fillStyle=gradient;ctx.fill();

ctx.beginPath();ctx.moveTo(points[0].x,points[0].y);
for(var k=1;k<points.length;k++){
  var cp1x=(points[k-1].x+points[k].x)/2;
  ctx.bezierCurveTo(cp1x,points[k-1].y,cp1x,points[k].y,points[k].x,points[k].y);
}
ctx.strokeStyle='#00FF88';ctx.lineWidth=2.5;ctx.stroke();

for(var p=0;p<points.length;p++){
  var color=points[p].diff<0?'#00FF88':points[p].diff===0?'#00B4D8':'#FF3366';
  ctx.fillStyle=color;ctx.beginPath();ctx.arc(points[p].x,points[p].y,5,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#fff';ctx.font='bold 9px sans-serif';
  ctx.fillText(points[p].hole+'',points[p].x-3,plotY+plotH+18);
  if(points[p].diff!==0){
    var sign=points[p].diff>0?'+':'';
    ctx.fillStyle=color;ctx.font='bold 8px sans-serif';
    ctx.fillText(sign+points[p].diff,points[p].x-5,points[p].y-10);
  }
}

var total=0;for(var t=0;t<scores.length;t++)total+=scores[t];
var front=0,back=0;
for(var f=0;f<9;f++)front+=scores[f];
for(var b=9;b<18;b++)back+=scores[b];

ctx.fillStyle='#FFB800';ctx.font='bold 16px sans-serif';
ctx.fillText('Total: '+total+' ('+(cumulative>0?'+':'')+cumulative+')',20,H-30);
ctx.fillStyle='#888';ctx.font='11px sans-serif';
ctx.fillText('Front: '+front+' | Back: '+back+' | Diff: '+(Math.abs(front-back)),20,H-12);

ctx.fillStyle=front<=back?'#00FF88':'#FF3366';ctx.font='bold 11px sans-serif';
ctx.fillText(front<=back?'&#xC804;&#xBC18; &#xC6B0;&#xC138;':'&#xD6C4;&#xBC18; &#xC6B0;&#xC138;',W-100,H-30);
}

// ===== 6. DRIVING RANGE SESSION LOGGER =====
function showRangeLogger(){
playSfx('range_open');
var pn=getPanel('rangelog');
var sessions=lsGet('range_sessions',[]);
var html='<button class="v16-close" onclick="window._v16Close(\'rangelog\')">&times;</button>';
html+='<div class="v16-title">&#x1F3CC;&#xFE0F; &#xC5F0;&#xC2B5;&#xC7A5; &#xC138;&#xC158; &#xB85C;&#xAC70;</div>';

html+='<div class="v16-card"><h3>&#xC138;&#xC158; &#xAE30;&#xB85D;</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v16-label">&#xB0A0;&#xC9DC;</label><input id="v16-rg-date" class="v16-input" type="date" value="'+todayStr()+'"></div>';
html+='<div><label class="v16-label">&#xC5F0;&#xC2B5; &#xC2DC;&#xAC04;(&#xBD84;)</label><input id="v16-rg-dur" class="v16-input" type="number" min="10" max="300" value="60"></div>';
html+='<div><label class="v16-label">&#xACF5; &#xC218;</label><input id="v16-rg-balls" class="v16-input" type="number" min="10" max="500" value="100"></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:6px">';
html+='<div><label class="v16-label">&#xC8FC;&#xC694; &#xC5F0;&#xC2B5; &#xD074;&#xB7FD;</label><select id="v16-rg-club" class="v16-input"><option>DR</option><option>3W</option><option>5W</option><option>7I</option><option>8I</option><option>9I</option><option>PW</option><option>SW</option><option>PT</option><option>&#xC885;&#xD569;</option></select></div>';
html+='<div><label class="v16-label">&#xC5F0;&#xC2B5; &#xBAA9;&#xD45C;</label><select id="v16-rg-goal" class="v16-input"><option>&#xC2A4;&#xC708; &#xAD50;&#xC815;</option><option>&#xBE44;&#xAC70;&#xB9AC; &#xD5A5;&#xC0C1;</option><option>&#xC815;&#xD655;&#xB3C4; &#xAC1C;&#xC120;</option><option>&#xD37C;&#xD305; &#xC5F0;&#xC2B5;</option><option>&#xC595;&#xAC8C;&#xC784; &#xC5F0;&#xC2B5;</option><option>&#xBC88;&#xCEE4; &#xC0F7; &#xC5F0;&#xC2B5;</option><option>&#xC790;&#xC720; &#xC5F0;&#xC2B5;</option></select></div>';
html+='</div>';
html+='<div style="margin-top:6px"><label class="v16-label">&#xBA54;&#xBAA8;</label><textarea id="v16-rg-memo" class="v16-input" rows="2" placeholder="&#xC624;&#xB298; &#xC5F0;&#xC2B5; &#xD3EC;&#xC778;&#xD2B8;, &#xB290;&#xB080; &#xC810;..."></textarea></div>';
html+='<div style="margin-top:6px"><label class="v16-label">&#xB9CC;&#xC871;&#xB3C4;</label>';
html+='<div style="display:flex;gap:6px" id="v16-rg-rating">';
for(var star=1;star<=5;star++){
  html+='<button class="v16-btn" style="font-size:1.2em;padding:4px 8px" onclick="document.querySelectorAll(\'#v16-rg-rating button\').forEach(function(b,i){b.style.color=i<'+star+'?\'#FFB800\':\'#444\'});document.getElementById(\'v16-rg-rval\').value='+star+'">&#x2B50;</button>';
}
html+='<input type="hidden" id="v16-rg-rval" value="3">';
html+='</div></div>';
html+='<button class="v16-btn v16-btn-primary" style="width:100%;margin-top:10px" onclick="window._v16RecordRange()">&#xC138;&#xC158; &#xC800;&#xC7A5;</button></div>';

var totalSessions=sessions.length;
var totalBalls=0,totalTime=0;
for(var i=0;i<sessions.length;i++){totalBalls+=sessions[i].balls;totalTime+=sessions[i].duration;}
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#00FF88">'+totalSessions+'</div><div class="v16-stat-label">&#xCD1D; &#xC138;&#xC158;</div></div>';
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#00B4D8">'+totalBalls+'</div><div class="v16-stat-label">&#xCD1D; &#xACF5; &#xC218;</div></div>';
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#FFB800">'+totalTime+'&#xBD84;</div><div class="v16-stat-label">&#xCD1D; &#xC5F0;&#xC2B5;&#xC2DC;&#xAC04;</div></div>';
var avgRating=0;if(sessions.length>0){var rSum=0;for(var ri=0;ri<sessions.length;ri++)rSum+=sessions[ri].rating;avgRating=Math.round(rSum/sessions.length*10)/10;}
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#E8A87C">'+avgRating+'</div><div class="v16-stat-label">&#xD3C9;&#xADE0; &#xB9CC;&#xC871;&#xB3C4;</div></div>';
html+='</div>';

if(sessions.length>0){
  html+='<div class="v16-card"><h3>&#x1F4C5; &#xCD5C;&#xADFC; &#xC138;&#xC158;</h3>';
  html+='<div style="max-height:240px;overflow-y:auto;font-size:.82em;color:#aaa;line-height:1.7">';
  var recent=sessions.slice(-8).reverse();
  for(var si=0;si<recent.length;si++){
    var s=recent[si];
    var stars='';for(var st=0;st<5;st++)stars+=st<s.rating?'&#x2B50;':'&#x2606;';
    html+='<div class="v16-card" style="margin-bottom:8px">';
    html+='<div style="display:flex;justify-content:space-between"><span style="color:#00FF88;font-weight:700">'+s.date+'</span><span>'+stars+'</span></div>';
    html+='<div>'+s.club+' | '+s.balls+'&#xACF5; | '+s.duration+'&#xBD84; | '+s.goal+'</div>';
    if(s.memo) html+='<div style="color:#888;font-style:italic;margin-top:4px">'+s.memo+'</div>';
    html+='</div>';
  }
  html+='</div></div>';

  var goalCounts={};
  for(var gi=0;gi<sessions.length;gi++){goalCounts[sessions[gi].goal]=(goalCounts[sessions[gi].goal]||0)+1;}
  html+='<div class="v16-card"><h3>&#x1F4CA; &#xC5F0;&#xC2B5; &#xBAA9;&#xD45C; &#xBD84;&#xD3EC;</h3>';
  html+='<div style="font-size:.82em;color:#aaa;line-height:1.8">';
  for(var gk in goalCounts){
    var pct=Math.round(goalCounts[gk]/sessions.length*100);
    html+='<div>'+gk+': <span style="display:inline-block;width:'+Math.max(pct,2)+'px;height:10px;background:linear-gradient(90deg,#00FF88,#00B4D8);border-radius:4px;vertical-align:middle;margin:0 6px"></span>'+pct+'% ('+goalCounts[gk]+'&#xD68C;)</div>';
  }
  html+='</div></div>';
}

pn.innerHTML=html;
openPanel('rangelog');
}

window._v16RecordRange=function(){
var date=document.getElementById('v16-rg-date').value||todayStr();
var duration=parseInt(document.getElementById('v16-rg-dur').value)||60;
var balls=parseInt(document.getElementById('v16-rg-balls').value)||100;
var club=document.getElementById('v16-rg-club').value;
var goal=document.getElementById('v16-rg-goal').value;
var memo=document.getElementById('v16-rg-memo').value;
var rating=parseInt(document.getElementById('v16-rg-rval').value)||3;
var sessions=lsGet('range_sessions',[]);
sessions.push({date:date,duration:duration,balls:balls,club:club,goal:goal,memo:memo,rating:rating});
if(sessions.length>200)sessions=sessions.slice(-200);
lsSet('range_sessions',sessions);
playSfx('range_save');
showToast('&#xC138;&#xC158; &#xC800;&#xC7A5; &#xC644;&#xB8CC;! ('+balls+'&#xACF5;/'+duration+'&#xBD84;)');
showRangeLogger();
};

// ===== 7. GOLF BUCKET LIST TRACKER Canvas 560x360 =====
function showBucketList(){
playSfx('bucket_open');
var pn=getPanel('bucket');
var buckets=lsGet('bucket_list',[
  {id:1,name:'80&#xD0C0; &#xAE68;&#xAE30;',desc:'18&#xD640; 80&#xD0C0; &#xC774;&#xD558; &#xAE30;&#xB85D;',done:false},
  {id:2,name:'&#xD640;&#xC778;&#xC6D0; &#xB2EC;&#xC131;',desc:'Par3&#xC5D0;&#xC11C; &#xD640;&#xC778;&#xC6D0; &#xC131;&#xACF5;',done:false},
  {id:3,name:'&#xC774;&#xAE00; &#xB2EC;&#xC131;',desc:'Par4 &#xB610;&#xB294; Par5&#xC5D0;&#xC11C; &#xC774;&#xAE00;',done:false},
  {id:4,name:'&#xD578;&#xB514;&#xCEA1; &#xC2F1;&#xAE00;',desc:'WHS &#xD578;&#xB514;&#xCEA1; 10 &#xC774;&#xD558;',done:false},
  {id:5,name:'100&#xB77C;&#xC6B4;&#xB4DC; &#xC644;&#xC8FC;',desc:'&#xCD1D; 100&#xB77C;&#xC6B4;&#xB4DC; &#xB2EC;&#xC131;',done:false},
  {id:6,name:'10&#xAC1C; &#xCF54;&#xC2A4; &#xC815;&#xBCF5;',desc:'&#xC11C;&#xB85C; &#xB2E4;&#xB978; 10&#xAC1C; &#xCF54;&#xC2A4; &#xD50C;&#xB808;&#xC774;',done:false},
  {id:7,name:'3&#xC5F0;&#xC18D; &#xBC84;&#xB514;',desc:'&#xD55C; &#xB77C;&#xC6B4;&#xB4DC;&#xC5D0;&#xC11C; 3&#xC5F0;&#xC18D; &#xBC84;&#xB514;',done:false},
  {id:8,name:'&#xB4DC;&#xB77C;&#xC774;&#xBC84; 250m',desc:'&#xB4DC;&#xB77C;&#xC774;&#xBC84; &#xCE90;&#xB9AC; 250m &#xC774;&#xC0C1;',done:false},
  {id:9,name:'&#xBC88;&#xCEE4; &#xC138;&#xC774;&#xBE0C;',desc:'&#xBC88;&#xCEE4;&#xC5D0;&#xC11C; &#xC6D0;&#xD37C;&#xD305; &#xC548;&#xC5D0; &#xC138;&#xC774;&#xBE0C;',done:false},
  {id:10,name:'Par72 &#xC774;&#xBE10;&#xD30C;',desc:'Par72 &#xCF54;&#xC2A4;&#xC5D0;&#xC11C; &#xC774;&#xBE10;&#xD30C; &#xB610;&#xB294; &#xC5B8;&#xB354;&#xD30C;',done:false}
]);
var doneCount=0;for(var i=0;i<buckets.length;i++){if(buckets[i].done)doneCount++;}
var progress=Math.round(doneCount/buckets.length*100);

var html='<button class="v16-close" onclick="window._v16Close(\'bucket\')">&times;</button>';
html+='<div class="v16-title">&#x1F3C6; &#xACE8;&#xD504; &#xBC84;&#xD0B7;&#xB9AC;&#xC2A4;&#xD2B8;</div>';

html+='<canvas id="v16-bucket-canvas" width="560" height="360" style="width:100%;max-width:560px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#00FF88">'+doneCount+'/'+buckets.length+'</div><div class="v16-stat-label">&#xB2EC;&#xC131;</div></div>';
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#FFB800">'+progress+'%</div><div class="v16-stat-label">&#xC9C4;&#xD589;&#xB960;</div></div>';
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#00B4D8">'+(buckets.length-doneCount)+'</div><div class="v16-stat-label">&#xB0A8;&#xC740; &#xBAA9;&#xD45C;</div></div>';
html+='</div>';

html+='<div class="v16-card"><h3>&#x2705; &#xBAA9;&#xD45C; &#xCCB4;&#xD06C;&#xB9AC;&#xC2A4;&#xD2B8;</h3>';
for(var bi=0;bi<buckets.length;bi++){
  var b=buckets[bi];
  html+='<div style="display:flex;align-items:center;gap:10px;padding:10px;border-bottom:1px solid rgba(255,255,255,0.04)">';
  html+='<button class="v16-btn" style="width:32px;height:32px;padding:0;font-size:1.1em;flex-shrink:0;'+(b.done?'background:rgba(0,255,136,0.2);border-color:#00FF88':'')+'" onclick="window._v16ToggleBucket('+b.id+')">'+(b.done?'&#x2705;':'&#x2B1C;')+'</button>';
  html+='<div style="flex:1"><div style="font-weight:700;color:'+(b.done?'#00FF88':'#fff')+';text-decoration:'+(b.done?'line-through':'none')+'">'+b.name+'</div>';
  html+='<div style="font-size:.8em;color:#888">'+b.desc+'</div></div></div>';
}
html+='</div>';

html+='<div class="v16-card"><h3>&#x2795; &#xC0AC;&#xC6A9;&#xC790; &#xBAA9;&#xD45C; &#xCD94;&#xAC00;</h3>';
html+='<div style="display:grid;grid-template-columns:2fr 3fr;gap:6px">';
html+='<input id="v16-bk-name" class="v16-input" placeholder="&#xBAA9;&#xD45C;&#xBA85;">';
html+='<input id="v16-bk-desc" class="v16-input" placeholder="&#xC124;&#xBA85;">';
html+='</div>';
html+='<button class="v16-btn" style="width:100%;margin-top:8px" onclick="window._v16AddBucket()">&#xBAA9;&#xD45C; &#xCD94;&#xAC00;</button></div>';

pn.innerHTML=html;
openPanel('bucket');
drawBucketCanvas(buckets,doneCount);
}

window._v16ToggleBucket=function(id){
var buckets=lsGet('bucket_list',null);
if(!buckets)return;
for(var i=0;i<buckets.length;i++){if(buckets[i].id===id){buckets[i].done=!buckets[i].done;break;}}
lsSet('bucket_list',buckets);
playSfx('putt_record');
showBucketList();
};
window._v16AddBucket=function(){
var name=document.getElementById('v16-bk-name').value;
var desc=document.getElementById('v16-bk-desc').value;
if(!name){showToast('&#xBAA9;&#xD45C;&#xBA85;&#xC744; &#xC785;&#xB825;&#xD574;&#xC8FC;&#xC138;&#xC694;');return;}
var buckets=lsGet('bucket_list',[]);
var maxId=10;for(var i=0;i<buckets.length;i++){if(buckets[i].id>maxId)maxId=buckets[i].id;}
buckets.push({id:maxId+1,name:name,desc:desc||'',done:false});
lsSet('bucket_list',buckets);
playSfx('range_save');
showToast('&#xBAA9;&#xD45C; &#xCD94;&#xAC00;: '+name);
showBucketList();
};

function drawBucketCanvas(buckets,doneCount){
var c=document.getElementById('v16-bucket-canvas');if(!c)return;
var ctx=c.getContext('2d');var W=560,H=360;
ctx.fillStyle='#0c1018';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00FF88';ctx.font='bold 14px sans-serif';ctx.fillText('Golf Bucket List Progress',20,28);

var cx=170,cy=180,outerR=120,innerR=70;
var total=buckets.length||1;
var donePct=doneCount/total;
var startAngle=-Math.PI/2;

ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.lineWidth=outerR-innerR;
ctx.beginPath();ctx.arc(cx,cy,innerR+(outerR-innerR)/2,0,Math.PI*2);ctx.stroke();

if(doneCount>0){
  var grad=ctx.createLinearGradient(cx-outerR,cy,cx+outerR,cy);
  grad.addColorStop(0,'#00FF88');grad.addColorStop(1,'#00B4D8');
  ctx.strokeStyle=grad;ctx.lineWidth=outerR-innerR;
  ctx.beginPath();ctx.arc(cx,cy,innerR+(outerR-innerR)/2,startAngle,startAngle+Math.PI*2*donePct);ctx.stroke();
}

ctx.fillStyle='#fff';ctx.font='bold 28px sans-serif';
var pctText=Math.round(donePct*100)+'%';
ctx.fillText(pctText,cx-ctx.measureText(pctText).width/2,cy+5);
ctx.fillStyle='#888';ctx.font='12px sans-serif';
ctx.fillText(doneCount+'/'+total+' &#xB2EC;&#xC131;',cx-25,cy+25);

var listX=320,listY=50;
ctx.fillStyle='#00FF88';ctx.font='bold 11px sans-serif';ctx.fillText('Goals',listX,listY);
for(var i=0;i<Math.min(buckets.length,10);i++){
  var b=buckets[i];
  var y=listY+18+i*28;
  ctx.fillStyle=b.done?'rgba(0,255,136,0.15)':'rgba(255,255,255,0.03)';
  ctx.beginPath();ctx.roundRect(listX,y,210,24,6);ctx.fill();
  ctx.fillStyle=b.done?'#00FF88':'#888';ctx.font=(b.done?'bold ':'')+'10px sans-serif';
  ctx.fillText((b.done?'&#x2713; ':'')+b.name,listX+8,y+16);
}

ctx.fillStyle='#555';ctx.font='10px sans-serif';ctx.fillText('Golf Bucket List v16.0',W-140,H-12);
}

// ===== 8. PRE-SHOT ROUTINE COACH Canvas Timer =====
function showRoutineCoach(){
playSfx('routine_done');
var pn=getPanel('routine');
var routines=lsGet('routines',[]);
var html='<button class="v16-close" onclick="window._v16Close(\'routine\')">&times;</button>';
html+='<div class="v16-title">&#x23F1;&#xFE0F; &#xD504;&#xB9AC;&#xC0F7; &#xB8E8;&#xD2F4; &#xCF54;&#xCE58;</div>';

html+='<canvas id="v16-routine-canvas" width="520" height="340" style="width:100%;max-width:520px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

html+='<div class="v16-card"><h3>&#x1F3AF; &#xB8E8;&#xD2F4; &#xC2DC;&#xC791;</h3>';
var routineSteps=[
  {name:'&#xD0C0;&#xAC9F; &#xD655;&#xC778;',time:3,desc:'&#xBAA9;&#xD45C; &#xC9C0;&#xC810;&#xC744; &#xBA85;&#xD655;&#xD788; &#xC124;&#xC815;'},
  {name:'&#xC5BC;&#xB77C;&#xC778;&#xBA3C;&#xD2B8;',time:4,desc:'&#xBAA9;&#xD45C;&#xC120;&#xC5D0; &#xBAB8;&#xC744; &#xC815;&#xB82C;'},
  {name:'&#xC6E8;&#xAE00;',time:3,desc:'&#xC2A4;&#xC708; &#xD3C9;&#xBA74;&#xACFC; &#xD15C;&#xD3EC; &#xD655;&#xC778;'},
  {name:'&#xD638;&#xD761; &#xC870;&#xC808;',time:3,desc:'&#xAE4A;&#xC740; &#xD638;&#xD761;&#xC73C;&#xB85C; &#xC2EC;&#xC2E0; &#xC548;&#xC815;'},
  {name:'&#xBC31;&#xC2A4;&#xC708;',time:4,desc:'&#xD0C0;&#xAC9F;&#xACFC; &#xCCAC;&#xD55C; &#xC2A4;&#xC708; &#xC2DC;&#xC791;'},
  {name:'&#xB2E4;&#xC6B4;&#xC2A4;&#xC708;',time:3,desc:'&#xBD80;&#xB4DC;&#xB7EC;&#xC6B4; &#xC784;&#xD329;&#xD2B8;&#xC640; &#xD314;&#xB85C;&#xC2A4;&#xB8E8;'}
];
var totalTime=0;for(var ti=0;ti<routineSteps.length;ti++)totalTime+=routineSteps[ti].time;
html+='<div style="margin-bottom:8px;font-size:.82em;color:#888">&#xCD1D; &#xB8E8;&#xD2F4; &#xC2DC;&#xAC04;: '+totalTime+'&#xCD08;</div>';

for(var ri=0;ri<routineSteps.length;ri++){
  var rs=routineSteps[ri];
  html+='<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04)">';
  html+='<div style="width:28px;height:28px;border-radius:50%;background:rgba(0,255,136,0.1);border:1px solid rgba(0,255,136,0.2);display:flex;align-items:center;justify-content:center;font-size:.85em;color:#00FF88;font-weight:700;flex-shrink:0">'+(ri+1)+'</div>';
  html+='<div style="flex:1"><div style="font-weight:700;color:#fff">'+rs.name+' <span style="color:#FFB800;font-size:.8em">'+rs.time+'s</span></div>';
  html+='<div style="font-size:.78em;color:#888">'+rs.desc+'</div></div></div>';
}
html+='<button class="v16-btn v16-btn-primary" style="width:100%;margin-top:12px;font-size:1em;padding:12px" onclick="window._v16StartRoutine()">&#x25B6;&#xFE0F; &#xB8E8;&#xD2F4; &#xC2DC;&#xC791; ('+totalTime+'&#xCD08;)</button></div>';

html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#00FF88">'+routines.length+'</div><div class="v16-stat-label">&#xC5F0;&#xC2B5; &#xD68C;&#xC218;</div></div>';
var avgTime=0;if(routines.length>0){var tSum=0;for(var ai=0;ai<routines.length;ai++)tSum+=routines[ai].time;avgTime=Math.round(tSum/routines.length*10)/10;}
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#FFB800">'+avgTime+'s</div><div class="v16-stat-label">&#xD3C9;&#xADE0; &#xC2DC;&#xAC04;</div></div>';
var streak=lsGet('routine_streak',0);
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#00B4D8">'+streak+'</div><div class="v16-stat-label">&#xC5F0;&#xC18D; &#xC2A4;&#xD2B8;&#xB9AD;</div></div>';
html+='</div>';

html+='<div class="v16-card"><h3>&#x1F4A1; &#xD504;&#xB9AC;&#xC0F7; &#xB8E8;&#xD2F4; &#xD301;</h3>';
html+='<div style="font-size:.82em;color:#aaa;line-height:1.7">';
html+='<div>&#x2022; &#xB9E4; &#xC0F7;&#xB9C8;&#xB2E4; &#xB3D9;&#xC77C;&#xD55C; &#xB8E8;&#xD2F4;&#xC744; &#xC720;&#xC9C0;&#xD558;&#xC138;&#xC694;</div>';
html+='<div>&#x2022; &#xB9E4; &#xC0F7; 15-20&#xCD08; &#xC774;&#xB0B4;&#xB85C; &#xC644;&#xB8CC;&#xD558;&#xB294; &#xAC83;&#xC774; &#xC774;&#xC0C1;&#xC801;</div>';
html+='<div>&#x2022; &#xC555;&#xBC15;&#xAC10; &#xC788;&#xB294; &#xC0C1;&#xD669;&#xC5D0;&#xC11C;&#xB3C4; &#xB8E8;&#xD2F4;&#xC744; &#xC9C0;&#xD0A4;&#xC138;&#xC694;</div>';
html+='<div>&#x2022; PGA &#xD22C;&#xC5B4; &#xC120;&#xC218;&#xB4E4;&#xC758; &#xD3C9;&#xADE0; &#xB8E8;&#xD2F4;: 18-22&#xCD08;</div>';
html+='</div></div>';

pn.innerHTML=html;
openPanel('routine');
drawRoutineCanvas(null,-1,0);
}

var routineTimer=null;
window._v16StartRoutine=function(){
var steps=[
  {name:'&#xD0C0;&#xAC9F; &#xD655;&#xC778;',time:3},
  {name:'&#xC5BC;&#xB77C;&#xC778;&#xBA3C;&#xD2B8;',time:4},
  {name:'&#xC6E8;&#xAE00;',time:3},
  {name:'&#xD638;&#xD761; &#xC870;&#xC808;',time:3},
  {name:'&#xBC31;&#xC2A4;&#xC708;',time:4},
  {name:'&#xB2E4;&#xC6B4;&#xC2A4;&#xC708;',time:3}
];
var stepIdx=0,elapsed=0,totalTime=0;
for(var i=0;i<steps.length;i++)totalTime+=steps[i].time;
if(routineTimer)clearInterval(routineTimer);

function tick(){
  elapsed++;
  var cumTime=0,curStep=0;
  for(var s=0;s<steps.length;s++){
    cumTime+=steps[s].time;
    if(elapsed<=cumTime){curStep=s;break;}
  }
  var stepElapsed=elapsed-(cumTime-steps[curStep].time);
  drawRoutineCanvas(steps,curStep,stepElapsed);
  playSfx('routine_tick');
  if(elapsed>=totalTime){
    clearInterval(routineTimer);routineTimer=null;
    playSfx('routine_done');
    showToast('&#xB8E8;&#xD2F4; &#xC644;&#xB8CC;! '+totalTime+'&#xCD08;');
    var routines=lsGet('routines',[]);
    routines.push({time:totalTime,date:todayStr()});
    if(routines.length>200)routines=routines.slice(-200);
    lsSet('routines',routines);
    var lastDate=lsGet('routine_last','');
    var today=todayStr();
    if(lastDate===today){}
    else{
      var yesterday=new Date();yesterday.setDate(yesterday.getDate()-1);
      var yStr=yesterday.toISOString().slice(0,10);
      if(lastDate===yStr){lsSet('routine_streak',lsGet('routine_streak',0)+1);}
      else{lsSet('routine_streak',1);}
      lsSet('routine_last',today);
    }
  }
}
routineTimer=setInterval(tick,1000);
tick();
};

function drawRoutineCanvas(steps,curStep,stepElapsed){
var c=document.getElementById('v16-routine-canvas');if(!c)return;
var ctx=c.getContext('2d');var W=520,H=340;
ctx.fillStyle='#0c1018';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00FF88';ctx.font='bold 14px sans-serif';ctx.fillText('Pre-Shot Routine Timer',20,28);

if(!steps){
  ctx.fillStyle='#444';ctx.font='14px sans-serif';
  ctx.fillText('&#xB8E8;&#xD2F4;&#xC744; &#xC2DC;&#xC791;&#xD558;&#xBA74; &#xD0C0;&#xC774;&#xBA38;&#xAC00; &#xD45C;&#xC2DC;&#xB429;&#xB2C8;&#xB2E4;',W/2-120,H/2);

  var demoSteps=['Target','Align','Waggle','Breathe','Back','Down'];
  var totalAngle=Math.PI*2;
  var cx=W/2,cy=H/2+20,r=80;
  for(var d=0;d<demoSteps.length;d++){
    var a1=-Math.PI/2+d*totalAngle/demoSteps.length;
    var a2=-Math.PI/2+(d+1)*totalAngle/demoSteps.length;
    ctx.strokeStyle='rgba(0,255,136,0.1)';ctx.lineWidth=16;
    ctx.beginPath();ctx.arc(cx,cy,r,a1+0.02,a2-0.02);ctx.stroke();
    var midA=(a1+a2)/2;
    ctx.fillStyle='#555';ctx.font='9px sans-serif';
    ctx.fillText(demoSteps[d],cx+Math.cos(midA)*(r+20)-15,cy+Math.sin(midA)*(r+20)+4);
  }
  return;
}

var cx2=W/2,cy2=170,r2=100;
var totalAngle2=Math.PI*2;
var totalTime=0;for(var i=0;i<steps.length;i++)totalTime+=steps[i].time;
var cumTime=0;
for(var si=0;si<steps.length;si++){
  var a1=-Math.PI/2+cumTime/totalTime*totalAngle2;
  var a2=-Math.PI/2+(cumTime+steps[si].time)/totalTime*totalAngle2;
  var isCurrent=si===curStep;
  var isPast=si<curStep;
  ctx.strokeStyle=isPast?'rgba(0,255,136,0.5)':isCurrent?'#00FF88':'rgba(255,255,255,0.06)';
  ctx.lineWidth=isCurrent?20:14;
  ctx.beginPath();ctx.arc(cx2,cy2,r2,a1+0.03,a2-0.03);ctx.stroke();

  if(isCurrent){
    var progress=stepElapsed/steps[si].time;
    var progressAngle=a1+(a2-a1)*progress;
    ctx.strokeStyle='#FFB800';ctx.lineWidth=22;
    ctx.beginPath();ctx.arc(cx2,cy2,r2,a1+0.03,progressAngle);ctx.stroke();
  }

  var midA2=(a1+a2)/2;
  ctx.fillStyle=isCurrent?'#fff':isPast?'#00FF88':'#555';ctx.font=(isCurrent?'bold ':'')+'9px sans-serif';
  var labelX=cx2+Math.cos(midA2)*(r2+26);
  var labelY=cy2+Math.sin(midA2)*(r2+26);
  ctx.fillText(steps[si].name,labelX-20,labelY+4);
  cumTime+=steps[si].time;
}

ctx.fillStyle='#fff';ctx.font='bold 28px sans-serif';
var remaining=steps[curStep].time-stepElapsed;
ctx.fillText(remaining+'s',cx2-18,cy2+5);
ctx.fillStyle='#00FF88';ctx.font='bold 12px sans-serif';
ctx.fillText(steps[curStep].name,cx2-ctx.measureText(steps[curStep].name).width/2,cy2+25);
ctx.fillStyle='#888';ctx.font='11px sans-serif';
ctx.fillText('Step '+(curStep+1)+'/'+steps.length,cx2-25,cy2+42);

ctx.fillStyle='#555';ctx.font='10px sans-serif';ctx.fillText('Pre-Shot Routine v16.0',W-140,H-12);
}

// ===== QUIZ v16: 15 NEW QUESTIONS (120->135) =====
function showV16Quiz(){
var pn=getPanel('quiz16');
var qIdx=lsGet('quiz16_idx',0);
var correct=lsGet('quiz16_correct',0);
var total=lsGet('quiz16_total',0);
var questions=[
{q:'&#xD37C;&#xD305;&#xC5D0;&#xC11C; &#xC544;&#xB9C8;&#xCD94;&#xC5B4; &#xACE8;&#xD37C;&#xC758; 3ft &#xD37C;&#xD305; &#xD3C9;&#xADE0; &#xC131;&#xACF5;&#xB960;&#xC740;?',a:['99%','92%','85%','78%'],c:1},
{q:'PGA Tour &#xD3C9;&#xADE0; &#xD504;&#xB9AC;&#xC0F7; &#xB8E8;&#xD2F4; &#xC2DC;&#xAC04;&#xC740;?',a:['10-12&#xCD08;','15-17&#xCD08;','18-22&#xCD08;','25-30&#xCD08;'],c:2},
{q:'&#xBC14;&#xB78C;&#xC774; 10m/s&#xC77C; &#xB54C; &#xBE44;&#xAC70;&#xB9AC;&#xC5D0; &#xBBF8;&#xCE58;&#xB294; &#xC601;&#xD5A5;&#xC740;?',a:['5% &#xAC10;&#xC18C;','10-15% &#xBCC0;&#xD654;','20% &#xC99D;&#xAC00;','&#xBCC0;&#xD654; &#xC5C6;&#xC74C;'],c:1},
{q:'&#xC2AC;&#xB77C;&#xC774;&#xC2A4;&#xC758; &#xC8FC;&#xC694; &#xC6D0;&#xC778;&#xC740;?',a:['&#xC624;&#xD508; &#xD398;&#xC774;&#xC2A4;','&#xD074;&#xB85C;&#xC988; &#xD398;&#xC774;&#xC2A4;','&#xADF8;&#xB9BD; &#xC555;&#xB825;','&#xC2A4;&#xD0E0;&#xC2A4;'],c:0},
{q:'&#xAE30;&#xC628;&#xC774; 10&#xB3C4; &#xB0B4;&#xB824;&#xAC08; &#xB54C; &#xBE44;&#xAC70;&#xB9AC; &#xBCC0;&#xD654;&#xB294;?',a:['2-3% &#xAC10;&#xC18C;','5-7% &#xAC10;&#xC18C;','10% &#xAC10;&#xC18C;','&#xBCC0;&#xD654; &#xC5C6;&#xC74C;'],c:0},
{q:'&#xD37C;&#xD305; &#xADF8;&#xB9B0;&#xC758; &#xC2A4;&#xD300;&#xD504;&#xBBF8;&#xD130;(Stimpmeter) &#xD45C;&#xC900;&#xAC12;&#xC740;?',a:['6-7ft','8-9ft','10-11ft','12-13ft'],c:2},
{q:'&#xBAA8;&#xBA58;&#xD140; &#xBD95;&#xAD34; &#xD6C4; &#xD68C;&#xBCF5;&#xC5D0; &#xAC00;&#xC7A5; &#xC911;&#xC694;&#xD55C; &#xAC83;&#xC740;?',a:['&#xACF5;&#xACA9;&#xC801; &#xD50C;&#xB808;&#xC774;','&#xD504;&#xB9AC;&#xC0F7; &#xB8E8;&#xD2F4; &#xC720;&#xC9C0;','&#xD074;&#xB7FD; &#xBCC0;&#xACBD;','&#xBE60;&#xB978; &#xD50C;&#xB808;&#xC774;'],c:1},
{q:'&#xD3C9;&#xADE0; &#xACE8;&#xD37C;&#xC758; &#xC8FC;&#xB2F9; &#xAD8C;&#xC7A5; &#xC5F0;&#xC2B5; &#xD68C;&#xC218;&#xB294;?',a:['1&#xD68C;','2-3&#xD68C;','4-5&#xD68C;','&#xB9E4;&#xC77C;'],c:1},
{q:'&#xBC88;&#xCEE4;&#xC5D0;&#xC11C; &#xAC00;&#xC7A5; &#xC548;&#xC804;&#xD55C; &#xD0C8;&#xCD9C; &#xBC29;&#xBC95;&#xC740;?',a:['&#xB4DC;&#xB77C;&#xC774;&#xBC84;&#xB85C; &#xAC15;&#xD558;&#xAC8C;','&#xC6E8;&#xC9C0;&#xB85C; &#xC625;&#xC73C;&#xB85C;','&#xC544;&#xC774;&#xC5B8;&#xC73C;&#xB85C; &#xD398;&#xC5B4;&#xC6E8;&#xC774;&#xB85C;','9&#xBC88; &#xC544;&#xC774;&#xC5B8;&#xC73C;&#xB85C; &#xB0AE;&#xAC8C;'],c:2},
{q:'WHS &#xD578;&#xB514;&#xCEA1; &#xACC4;&#xC0B0;&#xC5D0; &#xD544;&#xC694;&#xD55C; &#xCD5C;&#xC18C; &#xB77C;&#xC6B4;&#xB4DC; &#xC218;&#xB294;?',a:['3&#xB77C;&#xC6B4;&#xB4DC;','5&#xB77C;&#xC6B4;&#xB4DC;','10&#xB77C;&#xC6B4;&#xB4DC;','20&#xB77C;&#xC6B4;&#xB4DC;'],c:0},
{q:'&#xC5F0;&#xC2B5;&#xC7A5;&#xC5D0;&#xC11C; &#xAC00;&#xC7A5; &#xD6A8;&#xACFC;&#xC801;&#xC778; &#xC5F0;&#xC2B5; &#xBC29;&#xBC95;&#xC740;?',a:['&#xD55C; &#xD074;&#xB7FD;&#xB9CC; &#xBC18;&#xBCF5;','&#xB79C;&#xB364; &#xD074;&#xB7FD; &#xAD50;&#xCCB4;','&#xB4DC;&#xB77C;&#xC774;&#xBC84;&#xB9CC; 100&#xAC1C;','&#xC544;&#xC774;&#xC5B8;&#xB9CC; &#xC5F0;&#xC2B5;'],c:1},
{q:'&#xACE8;&#xD504; &#xC911; &#xC218;&#xBD84; &#xBCF4;&#xCDA9;&#xC758; &#xAD8C;&#xC7A5; &#xC8FC;&#xAE30;&#xB294;?',a:['9&#xD640;&#xB9C8;&#xB2E4;','6&#xD640;&#xB9C8;&#xB2E4;','3&#xD640;&#xB9C8;&#xB2E4;','&#xBAA9;&#xB9C8;&#xB97C; &#xB54C;&#xB9CC;'],c:2},
{q:'&#xACE8;&#xD504;&#xBCFC;&#xC758; &#xB514;&#xBB18;&#xD50C; &#xC218;&#xAC00; &#xBE44;&#xAC70;&#xB9AC;&#xC5D0; &#xBBF8;&#xCE58;&#xB294; &#xC601;&#xD5A5;&#xC740;?',a:['&#xB354; &#xBA40;&#xB9AC; &#xAC04;&#xB2E4;','&#xAD00;&#xACC4;&#xC5C6;&#xB2E4;','&#xB354; &#xC9E7;&#xC544;&#xC9C4;&#xB2E4;','&#xBC29;&#xD5A5;&#xB9CC; &#xC601;&#xD5A5;'],c:0},
{q:'&#xC2A4;&#xCF54;&#xC5B4; &#xC608;&#xCE21;&#xC5D0;&#xC11C; &#xAC00;&#xC7A5; &#xC911;&#xC694;&#xD55C; &#xC694;&#xC18C;&#xB294;?',a:['&#xB4DC;&#xB77C;&#xC774;&#xBC84; &#xBE44;&#xAC70;&#xB9AC;','&#xD37C;&#xD305; &#xC131;&#xACF5;&#xB960;','&#xCD5C;&#xADFC; &#xB77C;&#xC6B4;&#xB4DC; &#xCD94;&#xC138;','&#xACBD;&#xAE30; &#xACBD;&#xD5D8;'],c:2},
{q:'&#xC131;&#xACF5;&#xC801;&#xC778; &#xBCF4;&#xAE30; &#xC138;&#xC774;&#xBE0C;(up &amp; down) &#xBE44;&#xC728;&#xC758; PGA &#xD3C9;&#xADE0;&#xC740;?',a:['40%','50%','60%','70%'],c:2}
];

var html='<button class="v16-close" onclick="window._v16Close(\'quiz16\')">&times;</button>';
html+='<div class="v16-title">&#x2753; Golf IQ &#xD034;&#xC988; v16</div>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:12px">';
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#00FF88">'+correct+'</div><div class="v16-stat-label">&#xC815;&#xB2F5;</div></div>';
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#FFB800">'+total+'</div><div class="v16-stat-label">&#xCD1D; &#xBB38;&#xC81C;</div></div>';
var rate=total>0?Math.round(correct/total*100):0;
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#00B4D8">'+rate+'%</div><div class="v16-stat-label">&#xC815;&#xB2F5;&#xB960;</div></div>';
html+='</div>';

var q=questions[qIdx%questions.length];
html+='<div class="v16-card"><h3>Q'+(qIdx%questions.length+1)+'/'+questions.length+'</h3>';
html+='<p style="color:#fff;font-size:.95em;font-weight:600;margin:12px 0;line-height:1.5">'+q.q+'</p>';
for(var ai=0;ai<q.a.length;ai++){
  html+='<button class="v16-btn" style="width:100%;margin-bottom:6px;text-align:left;padding:10px 14px" onclick="window._v16AnswerQuiz('+ai+','+q.c+')">'+String.fromCharCode(9312+ai)+' '+q.a[ai]+'</button>';
}
html+='</div>';
pn.innerHTML=html;
openPanel('quiz16');
}

window._v16AnswerQuiz=function(sel,correct){
var isCorrect=sel===correct;
var c=lsGet('quiz16_correct',0);
var t=lsGet('quiz16_total',0);
t++;if(isCorrect)c++;
lsSet('quiz16_correct',c);lsSet('quiz16_total',t);
lsSet('quiz16_idx',lsGet('quiz16_idx',0)+1);
showToast(isCorrect?'&#xC815;&#xB2F5;! &#x1F389;':'&#xC624;&#xB2F5;! &#x274C;');
playSfx(isCorrect?'v16_achieve':'miss_record');
showV16Quiz();
};

// ===== ACHIEVEMENTS v16: 12 NEW (96->108) =====
var V16_ACH=[
{id:'v16_putt10',name:'&#xD37C;&#xD305; &#xB9C8;&#xC2A4;&#xD130;',desc:'&#xD37C;&#xD305; 10&#xD68C; &#xAE30;&#xB85D;',icon:'&#x1F3AF;',check:function(){return lsGet('putt_data',[]).length>=10}},
{id:'v16_putt50',name:'&#xD37C;&#xD305; &#xC804;&#xBB38;&#xAC00;',desc:'&#xD37C;&#xD305; 50&#xD68C; &#xAE30;&#xB85D;',icon:'&#x1F947;',check:function(){return lsGet('putt_data',[]).length>=50}},
{id:'v16_weather5',name:'&#xB0A0;&#xC528; &#xAD00;&#xCE21;&#xAC00;',desc:'&#xB0A0;&#xC528; 5&#xB77C;&#xC6B4;&#xB4DC; &#xAE30;&#xB85D;',icon:'&#x1F326;&#xFE0F;',check:function(){return lsGet('weather_records',[]).length>=5}},
{id:'v16_miss20',name:'&#xBBF8;&#xC2A4; &#xBD84;&#xC11D;&#xAC00;',desc:'&#xBBF8;&#xC2A4; &#xD328;&#xD134; 20&#xD68C; &#xAE30;&#xB85D;',icon:'&#x1F4CD;',check:function(){return lsGet('miss_data',[]).length>=20}},
{id:'v16_iq_lv3',name:'Golf IQ Lv.3',desc:'Golf IQ &#xB808;&#xBCA8; 3 &#xB2EC;&#xC131;',icon:'&#x1F9E0;',check:function(){return lsGet('iq_xp',0)>=300}},
{id:'v16_iq_lv5',name:'Golf IQ Lv.5',desc:'Golf IQ &#xB808;&#xBCA8; 5 &#xB2EC;&#xC131;',icon:'&#x1F31F;',check:function(){return lsGet('iq_xp',0)>=1000}},
{id:'v16_momentum3',name:'&#xBAA8;&#xBA58;&#xD140; &#xC560;&#xB110;&#xB9AC;&#xC2A4;&#xD2B8;',desc:'&#xBAA8;&#xBA58;&#xD140; 3&#xB77C;&#xC6B4;&#xB4DC; &#xBD84;&#xC11D;',icon:'&#x1F30A;',check:function(){return lsGet('momentum_rounds',[]).length>=3}},
{id:'v16_range10',name:'&#xC5F0;&#xC2B5;&#xBC8C;&#xB808;',desc:'&#xC5F0;&#xC2B5;&#xC7A5; 10&#xC138;&#xC158; &#xAE30;&#xB85D;',icon:'&#x1F3CC;&#xFE0F;',check:function(){return lsGet('range_sessions',[]).length>=10}},
{id:'v16_bucket3',name:'&#xBAA9;&#xD45C; &#xB2EC;&#xC131;&#xC790;',desc:'&#xBC84;&#xD0B7;&#xB9AC;&#xC2A4;&#xD2B8; 3&#xAC1C; &#xB2EC;&#xC131;',icon:'&#x1F3C6;',check:function(){var b=lsGet('bucket_list',[]);var d=0;for(var i=0;i<b.length;i++){if(b[i].done)d++;}return d>=3}},
{id:'v16_routine5',name:'&#xB8E8;&#xD2F4; &#xC218;&#xB828;&#xC0DD;',desc:'&#xD504;&#xB9AC;&#xC0F7; &#xB8E8;&#xD2F4; 5&#xD68C; &#xC644;&#xB8CC;',icon:'&#x23F1;&#xFE0F;',check:function(){return lsGet('routines',[]).length>=5}},
{id:'v16_quiz10',name:'&#xD034;&#xC988; &#xB3C4;&#xC804;&#xC790;',desc:'v16 &#xD034;&#xC988; 10&#xBB38;&#xC81C; &#xD480;&#xAE30;',icon:'&#x2753;',check:function(){return lsGet('quiz16_total',0)>=10}},
{id:'v16_allround',name:'v16 &#xC62C;&#xB77C;&#xC6B4;&#xB354;',desc:'v16 &#xBAA8;&#xB4E0; &#xAE30;&#xB2A5; &#xC0AC;&#xC6A9;',icon:'&#x1F48E;',check:function(){return lsGet('putt_data',[]).length>0&&lsGet('weather_records',[]).length>0&&lsGet('miss_data',[]).length>0&&lsGet('iq_xp',0)>0&&lsGet('momentum_rounds',[]).length>0&&lsGet('range_sessions',[]).length>0&&lsGet('routines',[]).length>0}}
];

function v16CheckAch(){
var unlocked=lsGet('v16_achievements',[]);
for(var i=0;i<V16_ACH.length;i++){
  var ach=V16_ACH[i];
  if(unlocked.indexOf(ach.id)===-1&&ach.check()){
    unlocked.push(ach.id);lsSet('v16_achievements',unlocked);
    showV16AchPopup(ach);playSfx('v16_achieve');
  }
}
}

function showV16AchPopup(ach){
var popup=document.createElement('div');popup.className='v16-ach-popup';
popup.innerHTML='<div style="font-size:2em">'+ach.icon+'</div><div><div style="font-size:.65em;color:#00FF88;font-weight:700;letter-spacing:2px">ACHIEVEMENT</div><div style="font-weight:700">'+ach.name+'</div><div style="font-size:.8em;color:#888;margin-top:2px">'+ach.desc+'</div></div>';
document.body.appendChild(popup);
setTimeout(function(){popup.classList.add('show')},50);
setTimeout(function(){popup.classList.remove('show');setTimeout(function(){popup.remove()},500)},3500);
}

// ===== QUICK ACTIONS & KEYBOARD =====
function injectV16QuickActions(){
var existing=document.querySelector('.v16-scroll-nav');if(existing)return;
var nav=document.createElement('div');nav.className='v16-scroll-nav';
var buttons=[
  {icon:'&#x1F3AF;',title:'&#xD37C;&#xD305; (Shift+P)',fn:'showPuttingMatrix'},
  {icon:'&#x1F326;&#xFE0F;',title:'&#xB0A0;&#xC528; (Shift+E)',fn:'showWeatherImpact'},
  {icon:'&#x1F4CD;',title:'&#xBBF8;&#xC2A4; (Shift+M)',fn:'showMissPattern'},
  {icon:'&#x1F9E0;',title:'GolfIQ (Shift+G)',fn:'showGolfIQ'},
  {icon:'&#x1F30A;',title:'&#xBAA8;&#xBA58;&#xD140; (Shift+T)',fn:'showMomentum'},
  {icon:'&#x1F3CC;&#xFE0F;',title:'&#xC5F0;&#xC2B5;&#xC7A5; (Shift+R)',fn:'showRangeLogger'},
  {icon:'&#x1F3C6;',title:'&#xBC84;&#xD0B7; (Shift+B)',fn:'showBucketList'},
  {icon:'&#x23F1;&#xFE0F;',title:'&#xB8E8;&#xD2F4; (Shift+O)',fn:'showRoutineCoach'},
  {icon:'&#x2753;',title:'&#xD034;&#xC988; (Shift+Q)',fn:'showV16Quiz'}
];
for(var i=0;i<buttons.length;i++){
  var btn=document.createElement('button');btn.className='v16-nav-btn';
  btn.innerHTML='<span class="v16-nav-icon">'+buttons[i].icon+'</span><span class="v16-nav-label">'+buttons[i].title.split(' (')[0]+'</span>';
  btn.title=buttons[i].title;
  btn.setAttribute('data-fn',buttons[i].fn);
  btn.addEventListener('click',function(){var fn=this.getAttribute('data-fn');if(window['_v16_'+fn])window['_v16_'+fn]()});
  nav.appendChild(btn);
}

var oldNav=document.querySelector('.v15-scroll-nav');
if(oldNav)oldNav.style.display='none';

document.body.appendChild(nav);
}

window._v16_showPuttingMatrix=showPuttingMatrix;
window._v16_showWeatherImpact=showWeatherImpact;
window._v16_showMissPattern=showMissPattern;
window._v16_showGolfIQ=showGolfIQ;
window._v16_showMomentum=showMomentum;
window._v16_showRangeLogger=showRangeLogger;
window._v16_showBucketList=showBucketList;
window._v16_showRoutineCoach=showRoutineCoach;
window._v16_showV16Quiz=showV16Quiz;
window._v16Close=function(id){closePanel(id)};

function setupV16Keyboard(){
document.addEventListener('keydown',function(e){
  if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'||e.target.tagName==='SELECT')return;
  if(e.ctrlKey||e.metaKey||e.altKey)return;
  if(!e.shiftKey)return;
  switch(e.key){
    case'P':e.preventDefault();showPuttingMatrix();break;
    case'E':e.preventDefault();showWeatherImpact();break;
    case'M':e.preventDefault();showMissPattern();break;
    case'G':e.preventDefault();showGolfIQ();break;
    case'T':e.preventDefault();showMomentum();break;
    case'R':e.preventDefault();showRangeLogger();break;
    case'B':e.preventDefault();showBucketList();break;
    case'O':e.preventDefault();showRoutineCoach();break;
  }
});
}

// ===== CSS =====
function injectV16CSS(){
var s=document.createElement('style');
s.textContent='.v16-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.88);z-index:10009;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;pointer-events:none}.v16-overlay.active{opacity:1;pointer-events:auto}.v16-panel{background:linear-gradient(145deg,rgba(8,14,24,.98),rgba(4,6,14,.98));border:1px solid rgba(0,255,136,.15);border-radius:18px;padding:24px;max-width:720px;width:94%;max-height:85vh;overflow-y:auto;box-shadow:0 24px 80px rgba(0,0,0,.7),0 0 40px rgba(0,255,136,.06);position:relative}.v16-panel::-webkit-scrollbar{width:5px}.v16-panel::-webkit-scrollbar-thumb{background:rgba(0,255,136,.2);border-radius:3px}.v16-title{font-size:1.4em;font-weight:800;color:#00FF88;margin-bottom:18px;letter-spacing:-0.5px}.v16-close{position:absolute;top:12px;right:16px;background:none;border:none;color:#666;font-size:1.6em;cursor:pointer;padding:4px 8px;border-radius:8px;transition:all .2s;z-index:1}.v16-close:hover{color:#ff6b6b;background:rgba(255,107,107,.1)}.v16-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:16px;margin-bottom:12px;transition:all .2s}.v16-card:hover{border-color:rgba(0,255,136,.15);background:rgba(255,255,255,.05)}.v16-card h3{color:#00FF88;font-size:.95em;margin:0 0 8px}.v16-card p{color:#aaa;font-size:.85em;margin:0;line-height:1.6}.v16-badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:.75em;font-weight:600}.v16-btn{padding:8px 16px;border:1px solid rgba(0,255,136,.2);background:rgba(0,255,136,.06);color:#00FF88;border-radius:8px;cursor:pointer;font-size:.85em;transition:all .2s}.v16-btn:hover{background:rgba(0,255,136,.15);border-color:#00FF88}.v16-btn-primary{background:rgba(0,255,136,.12);border-color:rgba(0,255,136,.3)}.v16-btn-primary:hover{background:rgba(0,255,136,.22)}.v16-input{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:8px 12px;color:#fff;font-size:.85em;width:100%;box-sizing:border-box}.v16-input:focus{outline:none;border-color:rgba(0,255,136,.4)}.v16-label{display:block;font-size:.72em;color:#888;margin-bottom:3px}.v16-table{width:100%;border-collapse:collapse;font-size:.82em}.v16-table th{text-align:left;padding:8px;color:#00FF88;border-bottom:1px solid rgba(255,255,255,.08);font-weight:600}.v16-table td{padding:8px;color:#ccc;border-bottom:1px solid rgba(255,255,255,.03)}.v16-stat-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:10px 6px;text-align:center}.v16-stat-val{font-size:1.3em;font-weight:800}.v16-stat-label{font-size:.65em;color:#888;margin-top:2px}.v16-scroll-nav{position:fixed;bottom:0;left:0;right:0;z-index:1002;display:flex;overflow-x:auto;gap:2px;padding:6px 8px;background:linear-gradient(to top,rgba(4,6,14,.97),rgba(4,6,14,.82));border-top:1px solid rgba(0,255,136,.12);-webkit-overflow-scrolling:touch;scrollbar-width:none}.v16-scroll-nav::-webkit-scrollbar{display:none}.v16-nav-btn{display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px 10px;border:1px solid rgba(0,255,136,.1);background:rgba(0,255,136,.04);color:#00FF88;border-radius:10px;cursor:pointer;flex-shrink:0;transition:all .2s;font-size:1em;min-width:60px}.v16-nav-btn:hover{background:rgba(0,255,136,.12);transform:scale(1.05)}.v16-nav-icon{font-size:1.2em}.v16-nav-label{font-size:.55em;color:#888;white-space:nowrap}.v16-toast{position:fixed;top:20px;left:50%;transform:translateX(-50%) translateY(-100px);background:rgba(0,255,136,.1);border:1px solid rgba(0,255,136,.2);color:#00FF88;padding:10px 20px;border-radius:10px;z-index:99999;transition:transform .4s;font-size:.9em;backdrop-filter:blur(12px);white-space:nowrap}.v16-toast.show{transform:translateX(-50%) translateY(0)}.v16-ach-popup{position:fixed;top:60px;left:50%;transform:translateX(-50%) translateY(-150px);z-index:100003;background:linear-gradient(135deg,rgba(8,14,24,.96),rgba(16,24,36,.96));border:1px solid rgba(0,255,136,.25);border-radius:16px;padding:14px 22px;display:flex;align-items:center;gap:14px;backdrop-filter:blur(20px);transition:transform .5s cubic-bezier(.34,1.56,.64,1);box-shadow:0 8px 32px rgba(0,0,0,.5),0 0 24px rgba(0,255,136,.08)}.v16-ach-popup.show{transform:translateX(-50%) translateY(0)}@media(max-width:480px){.v16-panel{padding:16px;max-height:92vh;width:96%}.v16-scroll-nav{padding:4px 4px;gap:1px}.v16-nav-btn{min-width:52px;padding:5px 7px}.v16-nav-icon{font-size:1em}.v16-nav-label{font-size:.5em}}';
document.head.appendChild(s);
}

// ===== INIT =====
function initV16(){
injectV16CSS();
injectV16QuickActions();
setupV16Keyboard();
setTimeout(v16CheckAch,7000);
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',initV16)}
else{setTimeout(initV16,4000)}

})();
