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
html+='<div class="v16-title">🎯 퍼팅 거리 매트릭스</div>';
html+='<div class="v16-card"><h3>퍼팅 기록 추가</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v16-label">거리(ft)</label><select id="v16-pm-dist" class="v16-input">';
var dists=[3,5,8,10,12,15,18,20,25,30];
for(var d=0;d<dists.length;d++) html+='<option value="'+dists[d]+'">'+dists[d]+'ft</option>';
html+='</select></div>';
html+='<div><label class="v16-label">경사</label><select id="v16-pm-slope" class="v16-input"><option>평지</option><option>오르막</option><option>내리막</option><option>좌측</option><option>우측</option></select></div>';
html+='<div><label class="v16-label">결과</label><select id="v16-pm-result" class="v16-input"><option value="in">성공</option><option value="short">순트</option><option value="long">롱</option><option value="left">좌측 미스</option><option value="right">우측 미스</option><option value="lip">립아웃</option></select></div>';
html+='</div>';
html+='<button class="v16-btn v16-btn-primary" style="width:100%;margin-top:10px" onclick="window._v16RecordPutt()">퍼팅 기록 저장</button></div>';

html+='<canvas id="v16-putt-canvas" width="640" height="380" style="width:100%;max-width:640px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

var totalPutts=data.length;
var madeCount=0;for(var i=0;i<data.length;i++){if(data[i].result==='in')madeCount++;}
var makeRate=totalPutts>0?Math.round(madeCount/totalPutts*1000)/10:0;
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#00FF88">'+totalPutts+'</div><div class="v16-stat-label">총 퍼팅</div></div>';
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#00B4D8">'+madeCount+'</div><div class="v16-stat-label">성공</div></div>';
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#FFB800">'+makeRate+'%</div><div class="v16-stat-label">성공률</div></div>';
var avgDist=0;if(totalPutts>0){var sum=0;for(var j=0;j<data.length;j++)sum+=data[j].dist;avgDist=Math.round(sum/totalPutts*10)/10;}
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#E8A87C">'+avgDist+'ft</div><div class="v16-stat-label">평균 거리</div></div>';
html+='</div>';

html+='<div class="v16-card"><h3>📊 거리별 성공률 분석</h3>';
html+='<div style="font-size:.82em;color:#aaa;line-height:1.8">';
for(var di=0;di<dists.length;di++){
  var cnt=0,made=0;
  for(var pi=0;pi<data.length;pi++){if(data[pi].dist===dists[di]){cnt++;if(data[pi].result==='in')made++;}}
  var rate=cnt>0?Math.round(made/cnt*100):0;
  var bar='<span style="display:inline-block;width:'+Math.max(rate,2)+'px;height:10px;background:linear-gradient(90deg,#00FF88,#00B4D8);border-radius:4px;vertical-align:middle;margin:0 6px"></span>';
  html+='<div>'+dists[di]+'ft: '+bar+rate+'% ('+made+'/'+cnt+')</div>';
}
html+='</div></div>';

html+='<div class="v16-card"><h3>📝 PGA Tour 퍼팅 비교</h3>';
html+='<div style="font-size:.82em;color:#aaa;line-height:1.7">';
html+='<div>• 3ft: PGA 99.5% / 아마추어 92%</div>';
html+='<div>• 5ft: PGA 77% / 아마추어 58%</div>';
html+='<div>• 10ft: PGA 40% / 아마추어 22%</div>';
html+='<div>• 15ft: PGA 23% / 아마추어 12%</div>';
html+='<div>• 20ft: PGA 14% / 아마추어 7%</div>';
html+='<div>• 30ft: PGA 6% / 아마추어 3%</div>';
html+='</div></div>';

if(data.length>0){
html+='<button class="v16-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'퍼팅 데이터를 초기화할까요?\'))window._v16ResetPutt()">데이터 초기화</button>';
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
showToast('퍼팅 기록 저장 ('+dist+'ft '+result+')');
showPuttingMatrix();
};
window._v16ResetPutt=function(){lsSet('putt_data',[]);showPuttingMatrix();};

function drawPuttCanvas(data){
var c=document.getElementById('v16-putt-canvas');if(!c)return;
var ctx=c.getContext('2d');var W=640,H=380;
ctx.fillStyle='#0c1018';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00FF88';ctx.font='bold 15px sans-serif';ctx.fillText('Putting Distance Heatmap',20,28);
ctx.fillStyle='#555';ctx.font='11px sans-serif';ctx.fillText('거리(ft) x 경사 성공률 히트맵',20,46);

var dists=[3,5,8,10,12,15,18,20,25,30];
var slopes=['평지','오르막','내리막','좌측','우측'];
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
var missLabels={'short':'순트','long':'롱','left':'좌측','right':'우측','lip':'립아웃'};
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
html+='<div class="v16-title">🌦️ 라운드 날씨 임팩트 분석기</div>';

html+='<div class="v16-card"><h3>날씨+스코어 기록</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:8px">';
html+='<div><label class="v16-label">날씨</label><select id="v16-wx-cond" class="v16-input"><option>맑음</option><option>흐림</option><option>림</option><option>강풍</option><option>춥움</option><option>무더움</option></select></div>';
html+='<div><label class="v16-label">기온(도C)</label><input id="v16-wx-temp" class="v16-input" type="number" min="-10" max="45" value="22"></div>';
html+='<div><label class="v16-label">바람(m/s)</label><input id="v16-wx-wind" class="v16-input" type="number" min="0" max="20" step="0.5" value="3"></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:6px">';
html+='<div><label class="v16-label">습도(%)</label><input id="v16-wx-humid" class="v16-input" type="number" min="10" max="100" value="55"></div>';
html+='<div><label class="v16-label">18홀 스코어</label><input id="v16-wx-score" class="v16-input" type="number" min="60" max="140" value="90"></div>';
html+='<div><label class="v16-label">코스Par</label><select id="v16-wx-par" class="v16-input"><option>70</option><option selected>72</option><option>71</option><option>73</option></select></div>';
html+='</div>';
html+='<button class="v16-btn v16-btn-primary" style="width:100%;margin-top:10px" onclick="window._v16RecordWeather()">날씨+스코어 저장</button></div>';

html+='<canvas id="v16-weather-canvas" width="600" height="360" style="width:100%;max-width:600px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

if(records.length>=3){
  var condMap={};
  for(var i=0;i<records.length;i++){
    var r=records[i];
    if(!condMap[r.cond])condMap[r.cond]={total:0,count:0};
    condMap[r.cond].total+=r.score-r.par;condMap[r.cond].count++;
  }
  html+='<div class="v16-card"><h3>📊 날씨별 평균 스코어 차이</h3>';
  html+='<div style="font-size:.82em;color:#aaa;line-height:1.8">';
  for(var cond in condMap){
    var avg=Math.round(condMap[cond].total/condMap[cond].count*10)/10;
    var sign=avg>0?'+':'';
    var color=avg<=0?'#00FF88':avg<=3?'#FFB800':'#FF3366';
    html+='<div>'+cond+': <span style="color:'+color+';font-weight:700">'+sign+avg+'</span> ('+condMap[cond].count+'라운드)</div>';
  }
  html+='</div></div>';

  var tempRanges=[{l:0,h:15,n:'추움(0-15)'},{l:15,h:25,n:'적온(15-25)'},{l:25,h:45,n:'더움(25+)'}];
  html+='<div class="v16-card"><h3>🌡️ 기온 구간별 성적</h3>';
  html+='<div style="font-size:.82em;color:#aaa;line-height:1.8">';
  for(var ti=0;ti<tempRanges.length;ti++){
    var tr=tempRanges[ti],cnt2=0,total2=0;
    for(var j=0;j<records.length;j++){if(records[j].temp>=tr.l&&records[j].temp<tr.h){cnt2++;total2+=records[j].score-records[j].par;}}
    if(cnt2>0){var avg2=Math.round(total2/cnt2*10)/10;var s2=avg2>0?'+':'';
    html+='<div>'+tr.n+': <span style="color:'+(avg2<=0?'#00FF88':'#FFB800')+';font-weight:700">'+s2+avg2+'</span> ('+cnt2+'R)</div>';}
  }
  html+='</div></div>';
}

html+='<div class="v16-card"><h3>💡 날씨 전략 팁</h3>';
html+='<div style="font-size:.82em;color:#aaa;line-height:1.7">';
html+='<div>• 바람 5m/s 이상: 클럽을 1-2번 더 잡아 낮게 치세요</div>';
html+='<div>• 비 오는 날: 그립을 강하게, 백스핀 줄여 방향성 확보</div>';
html+='<div>• 추운 날(10도 이하): 비거리 5-10% 감소 계산</div>';
html+='<div>• 더운 날(30도+): 수분 보충 필수, 3홀마다 물 마시기</div>';
html+='</div></div>';

if(records.length>0){
html+='<button class="v16-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'날씨 데이터를 초기화할까요?\'))window._v16ResetWeather()">데이터 초기화</button>';
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
showToast('날씨+스코어 저장 ('+cond+' '+score+'타)');
showWeatherImpact();
};
window._v16ResetWeather=function(){lsSet('weather_records',[]);showWeatherImpact();};

function drawWeatherCanvas(records){
var c=document.getElementById('v16-weather-canvas');if(!c)return;
var ctx=c.getContext('2d');var W=600,H=360;
ctx.fillStyle='#0c1018';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00FF88';ctx.font='bold 14px sans-serif';ctx.fillText('Weather Impact Analysis',20,28);
ctx.fillStyle='#555';ctx.font='11px sans-serif';ctx.fillText('기온 vs 스코어 상관관계 스캐터 플롯',20,46);

var plotX=60,plotY=60,plotW=250,plotH=260;
ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.lineWidth=1;
ctx.strokeRect(plotX,plotY,plotW,plotH);
for(var g=0;g<=4;g++){
  var gy=plotY+g*(plotH/4);
  ctx.beginPath();ctx.moveTo(plotX,gy);ctx.lineTo(plotX+plotW,gy);ctx.stroke();
}
ctx.fillStyle='#888';ctx.font='10px sans-serif';
ctx.fillText('기온(도C)',plotX+plotW/2-20,plotY+plotH+30);
ctx.save();ctx.translate(plotX-28,plotY+plotH/2);ctx.rotate(-Math.PI/2);ctx.fillText('스코어(vs Par)',0,0);ctx.restore();

var condColors={'맑음':'#FFD700','흐림':'#A0A0A0','비':'#4FC3F7','강풍':'#AB47BC','춥움':'#42A5F5','무더움':'#FF7043'};
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
    ctx.fillText('상관계수: '+corr.toFixed(3),legendX,legendY+170);
    ctx.fillStyle='#888';ctx.font='11px sans-serif';
    ctx.fillText('기울기: '+(slope>0?'+':'')+slope.toFixed(3)+'/도',legendX,legendY+190);
    var interp=Math.abs(corr)<0.2?'무관':corr<-0.4?'추울수록 좋아짐':corr>0.4?'더울수록 좋아짐':'약한 상관';
    ctx.fillText('해석: '+interp,legendX,legendY+210);
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
html+='<div class="v16-title">📍 클럽별 미스 패턴 분석기</div>';

html+='<div class="v16-card"><h3>샷 결과 기록</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v16-label">클럽</label><select id="v16-mp-club" class="v16-input">';
for(var ci=0;ci<clubs.length;ci++) html+='<option>'+clubs[ci]+'</option>';
html+='</select></div>';
html+='<div><label class="v16-label">결과</label><select id="v16-mp-result" class="v16-input"><option value="straight">스트레이트</option><option value="push">푸시</option><option value="pull">풀</option><option value="slice">슬라이스</option><option value="hook">훅</option><option value="top">탑</option><option value="fat">땅핑</option><option value="shank">상크</option></select></div>';
html+='<div><label class="v16-label">심각도</label><select id="v16-mp-sev" class="v16-input"><option value="1">약간</option><option value="2" selected>보통</option><option value="3">심함</option></select></div>';
html+='</div>';
html+='<button class="v16-btn v16-btn-primary" style="width:100%;margin-top:10px" onclick="window._v16RecordMiss()">미스 기록 저장</button></div>';

html+='<canvas id="v16-miss-canvas" width="580" height="380" style="width:100%;max-width:580px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

html+='<div class="v16-card"><h3>📊 클럽별 미스 비율</h3>';
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
  html+='<div>'+clubs[cci]+': 정타율 <span style="color:'+(accuracy>=70?'#00FF88':accuracy>=40?'#FFB800':'#FF3366')+';font-weight:700">'+accuracy+'%</span> ('+clubData.length+'샷)';
  if(dominant&&maxCnt>0) html+=' → 주요 미스: <span style="color:#FF3366">'+dominant+'</span>('+maxCnt+'회)';
  html+='</div>';
}
html+='</div></div>';

html+='<div class="v16-card"><h3>💡 미스 교정 가이드</h3>';
html+='<div style="font-size:.82em;color:#aaa;line-height:1.7">';
html+='<div>• 슬라이스: 그립을 강하게, 카트 방지를 위해 클럽페이스 닫기</div>';
html+='<div>• 훅: 그립 압력을 줄이고 릴리스에 집중</div>';
html+='<div>• 푸시/풀: 얼라인먼트를 확인, 어드레스 시 목표선 재확인</div>';
html+='<div>• 탑: 헤드업 방지, 스테디 헤드로 임팩트</div>';
html+='<div>• 땅핑: 공 위치를 앞으로, 체중이동 리드</div>';
html+='</div></div>';

if(data.length>0){
html+='<button class="v16-btn" style="width:100%;margin-top:6px;border-color:rgba(255,107,107,.3);color:#ff6b6b" onclick="if(confirm(\'미스 데이터 초기화?\'))window._v16ResetMiss()">데이터 초기화</button>';
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
showToast(club+' '+result+' 기록 완료');
showMissPattern();
};
window._v16ResetMiss=function(){lsSet('miss_data',[]);showMissPattern();};

function drawMissCanvas(data){
var c=document.getElementById('v16-miss-canvas');if(!c)return;
var ctx=c.getContext('2d');var W=580,H=380;
ctx.fillStyle='#0c1018';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00FF88';ctx.font='bold 14px sans-serif';ctx.fillText('Club Miss Pattern Polar Chart',20,28);
ctx.fillStyle='#555';ctx.font='11px sans-serif';ctx.fillText('클럽별 미스 방향 극좌표 시각화',20,46);

var cx=200,cy=210,radius=130;
ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.lineWidth=1;
for(var r=1;r<=4;r++){
  ctx.beginPath();ctx.arc(cx,cy,radius*r/4,0,Math.PI*2);ctx.stroke();
}
var directions=[
  {name:'스트레이트',key:'straight',angle:-Math.PI/2},
  {name:'푸시',key:'push',angle:-Math.PI/4},
  {name:'슬라이스',key:'slice',angle:0},
  {name:'탑',key:'top',angle:Math.PI/4},
  {name:'땅핑',key:'fat',angle:Math.PI/2},
  {name:'상크',key:'shank',angle:3*Math.PI/4},
  {name:'훅',key:'hook',angle:Math.PI},
  {name:'풀',key:'pull',angle:-3*Math.PI/4}
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
var resultNames={straight:'스트레이트',push:'푸시',pull:'풀',slice:'슬라이스',hook:'훅',top:'탑',fat:'땅핑',shank:'상크'};
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
  {lv:1,name:'비기너',min:0,max:100},
  {lv:2,name:'루키',min:100,max:300},
  {lv:3,name:'어프렌티스',min:300,max:600},
  {lv:4,name:'아마추어',min:600,max:1000},
  {lv:5,name:'싱글플레이어',min:1000,max:1500},
  {lv:6,name:'클럽챔피언',min:1500,max:2200},
  {lv:7,name:'프로',min:2200,max:3000},
  {lv:8,name:'투어프로',min:3000,max:4000},
  {lv:9,name:'마스터',min:4000,max:5500},
  {lv:10,name:'레전드',min:5500,max:99999}
];
var curLevel=levels[0];
for(var i=0;i<levels.length;i++){if(xp>=levels[i].min)curLevel=levels[i];}
var nextXP=curLevel.max;var progress=nextXP<99999?Math.round((xp-curLevel.min)/(nextXP-curLevel.min)*100):100;

var html='<button class="v16-close" onclick="window._v16Close(\'golfiq\')">&times;</button>';
html+='<div class="v16-title">🧠 Golf IQ 레벨 시스템</div>';

html+='<canvas id="v16-iq-canvas" width="560" height="360" style="width:100%;max-width:560px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#00FF88">Lv.'+curLevel.lv+'</div><div class="v16-stat-label">'+curLevel.name+'</div></div>';
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#FFB800">'+xp+'</div><div class="v16-stat-label">Total XP</div></div>';
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#00B4D8">'+progress+'%</div><div class="v16-stat-label">다음 레벨</div></div>';
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#E8A87C">'+activities.length+'</div><div class="v16-stat-label">활동 수</div></div>';
html+='</div>';

html+='<div class="v16-card"><h3>⭐ XP 획득 활동</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:6px;margin-top:8px">';
var xpActivities=[
  {name:'라운드 완료',xp:50,icon:'⛳'},
  {name:'연습장 방문',xp:20,icon:'🏌️'},
  {name:'퍼팅 연습 30분',xp:15,icon:'🎯'},
  {name:'코스 공략',xp:10,icon:'📖'},
  {name:'퀴즈 정답',xp:5,icon:'❓'},
  {name:'스윈 분석',xp:25,icon:'🔄'},
  {name:'멘탈 트레이닝',xp:15,icon:'🧘'},
  {name:'룰 학습',xp:10,icon:'📜'}
];
for(var ai=0;ai<xpActivities.length;ai++){
  var act=xpActivities[ai];
  html+='<button class="v16-btn" style="text-align:left;padding:10px" onclick="window._v16GainXP(\''+act.name+'\','+act.xp+')">'+act.icon+' '+act.name+' <span style="color:#FFB800;float:right">+'+act.xp+'XP</span></button>';
}
html+='</div></div>';

html+='<div class="v16-card"><h3>🏆 레벨 로드맵</h3>';
html+='<div style="font-size:.82em;color:#aaa;line-height:1.8">';
for(var li=0;li<levels.length;li++){
  var l=levels[li];
  var unlocked=xp>=l.min;
  html+='<div style="opacity:'+(unlocked?1:0.4)+'">'+(unlocked?'✅':'🔒')+' Lv.'+l.lv+' '+l.name+' ('+l.min+'XP)</div>';
}
html+='</div></div>';

if(activities.length>0){
html+='<div class="v16-card"><h3>📅 최근 활동</h3>';
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
if(newLevel>oldLevel){playSfx('iq_levelup');showToast('🎉 레벨업! Lv.'+newLevel+'!');}
else{playSfx('putt_record');showToast(name+' +'+xp+'XP (총 '+totalXP+'XP)');}
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
ctx.fillText(curLevel.max<99999?'다음 레벨까지 '+(curLevel.max-xp)+'XP 남음':'최고 레벨 달성!',40,322);

ctx.fillStyle='#555';ctx.font='10px sans-serif';ctx.fillText('Golf IQ v16.0',W-100,H-12);
}

// ===== 5. ROUND MOMENTUM TRACKER Canvas 620x360 =====
function showMomentum(){
playSfx('momentum_open');
var pn=getPanel('momentum');
var data=lsGet('momentum_rounds',[]);
var html='<button class="v16-close" onclick="window._v16Close(\'momentum\')">&times;</button>';
html+='<div class="v16-title">🌊 라운드 모멘텀 트래커</div>';

html+='<div class="v16-card"><h3>18홀 스코어 입력</h3>';
html+='<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:4px;margin-top:8px">';
for(var h=1;h<=18;h++){
  html+='<div><label class="v16-label" style="text-align:center">'+h+'H</label>';
  html+='<input id="v16-mom-h'+h+'" class="v16-input" type="number" min="1" max="12" value="" placeholder="Par" style="text-align:center;padding:6px 2px"></div>';
}
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v16-label">코스명</label><input id="v16-mom-course" class="v16-input" placeholder="코스명"></div>';
html+='<div><label class="v16-label">Par</label><select id="v16-mom-par" class="v16-input"><option>70</option><option selected>72</option><option>71</option><option>73</option></select></div>';
html+='</div>';
html+='<button class="v16-btn v16-btn-primary" style="width:100%;margin-top:10px" onclick="window._v16RecordMomentum()">모멘텀 분석 시작</button></div>';

html+='<canvas id="v16-momentum-canvas" width="620" height="360" style="width:100%;max-width:620px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

if(data.length>0){
  var last=data[data.length-1];
  html+='<div class="v16-card"><h3>📊 최근 분석: '+last.course+'</h3>';
  var birdies=0,pars=0,bogeys=0,doubles=0;
  var parDist=[4,4,4,4,3,4,4,3,5,4,4,3,4,4,5,4,3,5];
  for(var si=0;si<last.scores.length;si++){
    var diff=last.scores[si]-(parDist[si]||4);
    if(diff<=-1)birdies++;else if(diff===0)pars++;else if(diff===1)bogeys++;else doubles++;
  }
  html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:8px">';
  html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#00FF88">'+birdies+'</div><div class="v16-stat-label">버디+</div></div>';
  html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#00B4D8">'+pars+'</div><div class="v16-stat-label">Par</div></div>';
  html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#FFB800">'+bogeys+'</div><div class="v16-stat-label">보기</div></div>';
  html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#FF3366">'+doubles+'</div><div class="v16-stat-label">더블+</div></div>';
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
    html+='<div style="font-weight:700;color:#00FF88;margin-bottom:4px">연속 스트릭:</div>';
    for(var sk=0;sk<streaks.length;sk++){
      var s=streaks[sk];
      var typeText=s.type==='under'?'버디+':s.type==='par'?'Par':'보기+';
      var typeColor=s.type==='under'?'#00FF88':s.type==='par'?'#00B4D8':'#FF3366';
      html+='<div>'+s.start+'~'+(s.start+s.len-1)+'H: <span style="color:'+typeColor+'">'+typeText+' '+s.len+'연속</span></div>';
    }
    html+='</div>';
  }
  html+='</div>';
}

html+='<div class="v16-card"><h3>💡 모멘텀 관리 팁</h3>';
html+='<div style="font-size:.82em;color:#aaa;line-height:1.7">';
html+='<div>• 보기 후: 다음 홀에서 공격적이지 말고 안전하게</div>';
html+='<div>• 버디 후: 모멘텀을 활용하되 과욕 금물</div>';
html+='<div>• 전반과 후반의 스코어 변화를 추적하세요</div>';
html+='<div>• 3연속 보기 이상시 멘탈 리셋 필요</div>';
html+='</div></div>';

pn.innerHTML=html;
openPanel('momentum');
drawMomentumCanvas(data);
}

window._v16RecordMomentum=function(){
var scores=[];
for(var h=1;h<=18;h++){
  var val=document.getElementById('v16-mom-h'+h).value;
  if(!val){showToast('모든 18홀 스코어를 입력해주세요');return;}
  scores.push(parseInt(val));
}
var course=document.getElementById('v16-mom-course').value||'미지정';
var par=parseInt(document.getElementById('v16-mom-par').value);
var data=lsGet('momentum_rounds',[]);
data.push({scores:scores,course:course,par:par,date:todayStr()});
if(data.length>50)data=data.slice(-50);
lsSet('momentum_rounds',data);
playSfx('weather_analyze');
showToast('모멘텀 분석 완료!');
showMomentum();
};

function drawMomentumCanvas(data){
var c=document.getElementById('v16-momentum-canvas');if(!c)return;
var ctx=c.getContext('2d');var W=620,H=360;
ctx.fillStyle='#0c1018';ctx.fillRect(0,0,W,H);
ctx.fillStyle='#00FF88';ctx.font='bold 14px sans-serif';ctx.fillText('Round Momentum Wave',20,28);
ctx.fillStyle='#555';ctx.font='11px sans-serif';ctx.fillText('18홀 모멘텀 파도 차트',20,46);

if(data.length===0){
  ctx.fillStyle='#444';ctx.font='14px sans-serif';ctx.fillText('스코어를 입력하면 모멘텀 차트가 표시됩니다',W/2-130,H/2);
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
ctx.fillText(front<=back?'전반 우세':'후반 우세',W-100,H-30);
}

// ===== 6. DRIVING RANGE SESSION LOGGER =====
function showRangeLogger(){
playSfx('range_open');
var pn=getPanel('rangelog');
var sessions=lsGet('range_sessions',[]);
var html='<button class="v16-close" onclick="window._v16Close(\'rangelog\')">&times;</button>';
html+='<div class="v16-title">🏌️ 연습장 세션 로거</div>';

html+='<div class="v16-card"><h3>세션 기록</h3>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:8px">';
html+='<div><label class="v16-label">날짜</label><input id="v16-rg-date" class="v16-input" type="date" value="'+todayStr()+'"></div>';
html+='<div><label class="v16-label">연습 시간(분)</label><input id="v16-rg-dur" class="v16-input" type="number" min="10" max="300" value="60"></div>';
html+='<div><label class="v16-label">공 수</label><input id="v16-rg-balls" class="v16-input" type="number" min="10" max="500" value="100"></div>';
html+='</div>';
html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:6px">';
html+='<div><label class="v16-label">주요 연습 클럽</label><select id="v16-rg-club" class="v16-input"><option>DR</option><option>3W</option><option>5W</option><option>7I</option><option>8I</option><option>9I</option><option>PW</option><option>SW</option><option>PT</option><option>종합</option></select></div>';
html+='<div><label class="v16-label">연습 목표</label><select id="v16-rg-goal" class="v16-input"><option>스윈 교정</option><option>비거리 향상</option><option>정확도 개선</option><option>퍼팅 연습</option><option>얕게임 연습</option><option>번커 샷 연습</option><option>자유 연습</option></select></div>';
html+='</div>';
html+='<div style="margin-top:6px"><label class="v16-label">메모</label><textarea id="v16-rg-memo" class="v16-input" rows="2" placeholder="오늘 연습 포인트, 느낀 점..."></textarea></div>';
html+='<div style="margin-top:6px"><label class="v16-label">만족도</label>';
html+='<div style="display:flex;gap:6px" id="v16-rg-rating">';
for(var star=1;star<=5;star++){
  html+='<button class="v16-btn" style="font-size:1.2em;padding:4px 8px" onclick="document.querySelectorAll(\'#v16-rg-rating button\').forEach(function(b,i){b.style.color=i<'+star+'?\'#FFB800\':\'#444\'});document.getElementById(\'v16-rg-rval\').value='+star+'">⭐</button>';
}
html+='<input type="hidden" id="v16-rg-rval" value="3">';
html+='</div></div>';
html+='<button class="v16-btn v16-btn-primary" style="width:100%;margin-top:10px" onclick="window._v16RecordRange()">세션 저장</button></div>';

var totalSessions=sessions.length;
var totalBalls=0,totalTime=0;
for(var i=0;i<sessions.length;i++){totalBalls+=sessions[i].balls;totalTime+=sessions[i].duration;}
html+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0">';
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#00FF88">'+totalSessions+'</div><div class="v16-stat-label">총 세션</div></div>';
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#00B4D8">'+totalBalls+'</div><div class="v16-stat-label">총 공 수</div></div>';
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#FFB800">'+totalTime+'분</div><div class="v16-stat-label">총 연습시간</div></div>';
var avgRating=0;if(sessions.length>0){var rSum=0;for(var ri=0;ri<sessions.length;ri++)rSum+=sessions[ri].rating;avgRating=Math.round(rSum/sessions.length*10)/10;}
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#E8A87C">'+avgRating+'</div><div class="v16-stat-label">평균 만족도</div></div>';
html+='</div>';

if(sessions.length>0){
  html+='<div class="v16-card"><h3>📅 최근 세션</h3>';
  html+='<div style="max-height:240px;overflow-y:auto;font-size:.82em;color:#aaa;line-height:1.7">';
  var recent=sessions.slice(-8).reverse();
  for(var si=0;si<recent.length;si++){
    var s=recent[si];
    var stars='';for(var st=0;st<5;st++)stars+=st<s.rating?'⭐':'☆';
    html+='<div class="v16-card" style="margin-bottom:8px">';
    html+='<div style="display:flex;justify-content:space-between"><span style="color:#00FF88;font-weight:700">'+s.date+'</span><span>'+stars+'</span></div>';
    html+='<div>'+s.club+' | '+s.balls+'공 | '+s.duration+'분 | '+s.goal+'</div>';
    if(s.memo) html+='<div style="color:#888;font-style:italic;margin-top:4px">'+s.memo+'</div>';
    html+='</div>';
  }
  html+='</div></div>';

  var goalCounts={};
  for(var gi=0;gi<sessions.length;gi++){goalCounts[sessions[gi].goal]=(goalCounts[sessions[gi].goal]||0)+1;}
  html+='<div class="v16-card"><h3>📊 연습 목표 분포</h3>';
  html+='<div style="font-size:.82em;color:#aaa;line-height:1.8">';
  for(var gk in goalCounts){
    var pct=Math.round(goalCounts[gk]/sessions.length*100);
    html+='<div>'+gk+': <span style="display:inline-block;width:'+Math.max(pct,2)+'px;height:10px;background:linear-gradient(90deg,#00FF88,#00B4D8);border-radius:4px;vertical-align:middle;margin:0 6px"></span>'+pct+'% ('+goalCounts[gk]+'회)</div>';
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
showToast('세션 저장 완료! ('+balls+'공/'+duration+'분)');
showRangeLogger();
};

// ===== 7. GOLF BUCKET LIST TRACKER Canvas 560x360 =====
function showBucketList(){
playSfx('bucket_open');
var pn=getPanel('bucket');
var buckets=lsGet('bucket_list',[
  {id:1,name:'80타 깨기',desc:'18홀 80타 이하 기록',done:false},
  {id:2,name:'홀인원 달성',desc:'Par3에서 홀인원 성공',done:false},
  {id:3,name:'이글 달성',desc:'Par4 또는 Par5에서 이글',done:false},
  {id:4,name:'핸디캡 싱글',desc:'WHS 핸디캡 10 이하',done:false},
  {id:5,name:'100라운드 완주',desc:'총 100라운드 달성',done:false},
  {id:6,name:'10개 코스 정복',desc:'서로 다른 10개 코스 플레이',done:false},
  {id:7,name:'3연속 버디',desc:'한 라운드에서 3연속 버디',done:false},
  {id:8,name:'드라이버 250m',desc:'드라이버 캐리 250m 이상',done:false},
  {id:9,name:'번커 세이브',desc:'번커에서 원퍼팅 안에 세이브',done:false},
  {id:10,name:'Par72 이븐파',desc:'Par72 코스에서 이븐파 또는 언더파',done:false}
]);
var doneCount=0;for(var i=0;i<buckets.length;i++){if(buckets[i].done)doneCount++;}
var progress=Math.round(doneCount/buckets.length*100);

var html='<button class="v16-close" onclick="window._v16Close(\'bucket\')">&times;</button>';
html+='<div class="v16-title">🏆 골프 버킷리스트</div>';

html+='<canvas id="v16-bucket-canvas" width="560" height="360" style="width:100%;max-width:560px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#00FF88">'+doneCount+'/'+buckets.length+'</div><div class="v16-stat-label">달성</div></div>';
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#FFB800">'+progress+'%</div><div class="v16-stat-label">진행률</div></div>';
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#00B4D8">'+(buckets.length-doneCount)+'</div><div class="v16-stat-label">남은 목표</div></div>';
html+='</div>';

html+='<div class="v16-card"><h3>✅ 목표 체크리스트</h3>';
for(var bi=0;bi<buckets.length;bi++){
  var b=buckets[bi];
  html+='<div style="display:flex;align-items:center;gap:10px;padding:10px;border-bottom:1px solid rgba(255,255,255,0.04)">';
  html+='<button class="v16-btn" style="width:32px;height:32px;padding:0;font-size:1.1em;flex-shrink:0;'+(b.done?'background:rgba(0,255,136,0.2);border-color:#00FF88':'')+'" onclick="window._v16ToggleBucket('+b.id+')">'+(b.done?'✅':'⬜')+'</button>';
  html+='<div style="flex:1"><div style="font-weight:700;color:'+(b.done?'#00FF88':'#fff')+';text-decoration:'+(b.done?'line-through':'none')+'">'+b.name+'</div>';
  html+='<div style="font-size:.8em;color:#888">'+b.desc+'</div></div></div>';
}
html+='</div>';

html+='<div class="v16-card"><h3>➕ 사용자 목표 추가</h3>';
html+='<div style="display:grid;grid-template-columns:2fr 3fr;gap:6px">';
html+='<input id="v16-bk-name" class="v16-input" placeholder="목표명">';
html+='<input id="v16-bk-desc" class="v16-input" placeholder="설명">';
html+='</div>';
html+='<button class="v16-btn" style="width:100%;margin-top:8px" onclick="window._v16AddBucket()">목표 추가</button></div>';

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
if(!name){showToast('목표명을 입력해주세요');return;}
var buckets=lsGet('bucket_list',[]);
var maxId=10;for(var i=0;i<buckets.length;i++){if(buckets[i].id>maxId)maxId=buckets[i].id;}
buckets.push({id:maxId+1,name:name,desc:desc||'',done:false});
lsSet('bucket_list',buckets);
playSfx('range_save');
showToast('목표 추가: '+name);
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
ctx.fillText(doneCount+'/'+total+' 달성',cx-25,cy+25);

var listX=320,listY=50;
ctx.fillStyle='#00FF88';ctx.font='bold 11px sans-serif';ctx.fillText('Goals',listX,listY);
for(var i=0;i<Math.min(buckets.length,10);i++){
  var b=buckets[i];
  var y=listY+18+i*28;
  ctx.fillStyle=b.done?'rgba(0,255,136,0.15)':'rgba(255,255,255,0.03)';
  ctx.beginPath();ctx.roundRect(listX,y,210,24,6);ctx.fill();
  ctx.fillStyle=b.done?'#00FF88':'#888';ctx.font=(b.done?'bold ':'')+'10px sans-serif';
  ctx.fillText((b.done?'✓ ':'')+b.name,listX+8,y+16);
}

ctx.fillStyle='#555';ctx.font='10px sans-serif';ctx.fillText('Golf Bucket List v16.0',W-140,H-12);
}

// ===== 8. PRE-SHOT ROUTINE COACH Canvas Timer =====
function showRoutineCoach(){
playSfx('routine_done');
var pn=getPanel('routine');
var routines=lsGet('routines',[]);
var html='<button class="v16-close" onclick="window._v16Close(\'routine\')">&times;</button>';
html+='<div class="v16-title">⏱️ 프리샷 루틴 코치</div>';

html+='<canvas id="v16-routine-canvas" width="520" height="340" style="width:100%;max-width:520px;height:auto;display:block;margin:12px auto;border-radius:12px"></canvas>';

html+='<div class="v16-card"><h3>🎯 루틴 시작</h3>';
var routineSteps=[
  {name:'타겟 확인',time:3,desc:'목표 지점을 명확히 설정'},
  {name:'얼라인먼트',time:4,desc:'목표선에 몸을 정렬'},
  {name:'웨글',time:3,desc:'스윈 평면과 템포 확인'},
  {name:'호흡 조절',time:3,desc:'깊은 호흡으로 심신 안정'},
  {name:'백스윈',time:4,desc:'타겟과 첬한 스윈 시작'},
  {name:'다운스윈',time:3,desc:'부드러운 임팩트와 팔로스루'}
];
var totalTime=0;for(var ti=0;ti<routineSteps.length;ti++)totalTime+=routineSteps[ti].time;
html+='<div style="margin-bottom:8px;font-size:.82em;color:#888">총 루틴 시간: '+totalTime+'초</div>';

for(var ri=0;ri<routineSteps.length;ri++){
  var rs=routineSteps[ri];
  html+='<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04)">';
  html+='<div style="width:28px;height:28px;border-radius:50%;background:rgba(0,255,136,0.1);border:1px solid rgba(0,255,136,0.2);display:flex;align-items:center;justify-content:center;font-size:.85em;color:#00FF88;font-weight:700;flex-shrink:0">'+(ri+1)+'</div>';
  html+='<div style="flex:1"><div style="font-weight:700;color:#fff">'+rs.name+' <span style="color:#FFB800;font-size:.8em">'+rs.time+'s</span></div>';
  html+='<div style="font-size:.78em;color:#888">'+rs.desc+'</div></div></div>';
}
html+='<button class="v16-btn v16-btn-primary" style="width:100%;margin-top:12px;font-size:1em;padding:12px" onclick="window._v16StartRoutine()">▶️ 루틴 시작 ('+totalTime+'초)</button></div>';

html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0">';
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#00FF88">'+routines.length+'</div><div class="v16-stat-label">연습 회수</div></div>';
var avgTime=0;if(routines.length>0){var tSum=0;for(var ai=0;ai<routines.length;ai++)tSum+=routines[ai].time;avgTime=Math.round(tSum/routines.length*10)/10;}
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#FFB800">'+avgTime+'s</div><div class="v16-stat-label">평균 시간</div></div>';
var streak=lsGet('routine_streak',0);
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#00B4D8">'+streak+'</div><div class="v16-stat-label">연속 스트릭</div></div>';
html+='</div>';

html+='<div class="v16-card"><h3>💡 프리샷 루틴 팁</h3>';
html+='<div style="font-size:.82em;color:#aaa;line-height:1.7">';
html+='<div>• 매 샷마다 동일한 루틴을 유지하세요</div>';
html+='<div>• 매 샷 15-20초 이내로 완료하는 것이 이상적</div>';
html+='<div>• 압박감 있는 상황에서도 루틴을 지키세요</div>';
html+='<div>• PGA 투어 선수들의 평균 루틴: 18-22초</div>';
html+='</div></div>';

pn.innerHTML=html;
openPanel('routine');
drawRoutineCanvas(null,-1,0);
}

var routineTimer=null;
window._v16StartRoutine=function(){
var steps=[
  {name:'타겟 확인',time:3},
  {name:'얼라인먼트',time:4},
  {name:'웨글',time:3},
  {name:'호흡 조절',time:3},
  {name:'백스윈',time:4},
  {name:'다운스윈',time:3}
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
    showToast('루틴 완료! '+totalTime+'초');
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
  ctx.fillText('루틴을 시작하면 타이머가 표시됩니다',W/2-120,H/2);

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
{q:'퍼팅에서 아마추어 골퍼의 3ft 퍼팅 평균 성공률은?',a:['99%','92%','85%','78%'],c:1},
{q:'PGA Tour 평균 프리샷 루틴 시간은?',a:['10-12초','15-17초','18-22초','25-30초'],c:2},
{q:'바람이 10m/s일 때 비거리에 미치는 영향은?',a:['5% 감소','10-15% 변화','20% 증가','변화 없음'],c:1},
{q:'슬라이스의 주요 원인은?',a:['오픈 페이스','클로즈 페이스','그립 압력','스탠스'],c:0},
{q:'기온이 10도 내려갈 때 비거리 변화는?',a:['2-3% 감소','5-7% 감소','10% 감소','변화 없음'],c:0},
{q:'퍼팅 그린의 스팀프미터(Stimpmeter) 표준값은?',a:['6-7ft','8-9ft','10-11ft','12-13ft'],c:2},
{q:'모멘텀 붕괴 후 회복에 가장 중요한 것은?',a:['공격적 플레이','프리샷 루틴 유지','클럽 변경','빠른 플레이'],c:1},
{q:'평균 골퍼의 주당 권장 연습 회수는?',a:['1회','2-3회','4-5회','매일'],c:1},
{q:'번커에서 가장 안전한 탈출 방법은?',a:['드라이버로 강하게','웨지로 옥으로','아이언으로 페어웨이로','9번 아이언으로 낮게'],c:2},
{q:'WHS 핸디캡 계산에 필요한 최소 라운드 수는?',a:['3라운드','5라운드','10라운드','20라운드'],c:0},
{q:'연습장에서 가장 효과적인 연습 방법은?',a:['한 클럽만 반복','랜덤 클럽 교체','드라이버만 100개','아이언만 연습'],c:1},
{q:'골프 중 수분 보충의 권장 주기는?',a:['9홀마다','6홀마다','3홀마다','목마를 때만'],c:2},
{q:'골프볼의 디묘플 수가 비거리에 미치는 영향은?',a:['더 멀리 간다','관계없다','더 짧아진다','방향만 영향'],c:0},
{q:'스코어 예측에서 가장 중요한 요소는?',a:['드라이버 비거리','퍼팅 성공률','최근 라운드 추세','경기 경험'],c:2},
{q:'성공적인 보기 세이브(up &amp; down) 비율의 PGA 평균은?',a:['40%','50%','60%','70%'],c:2}
];

var html='<button class="v16-close" onclick="window._v16Close(\'quiz16\')">&times;</button>';
html+='<div class="v16-title">❓ Golf IQ 퀴즈 v16</div>';
html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:12px">';
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#00FF88">'+correct+'</div><div class="v16-stat-label">정답</div></div>';
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#FFB800">'+total+'</div><div class="v16-stat-label">총 문제</div></div>';
var rate=total>0?Math.round(correct/total*100):0;
html+='<div class="v16-stat-card"><div class="v16-stat-val" style="color:#00B4D8">'+rate+'%</div><div class="v16-stat-label">정답률</div></div>';
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
showToast(isCorrect?'정답! 🎉':'오답! ❌');
playSfx(isCorrect?'v16_achieve':'miss_record');
showV16Quiz();
};

// ===== ACHIEVEMENTS v16: 12 NEW (96->108) =====
var V16_ACH=[
{id:'v16_putt10',name:'퍼팅 마스터',desc:'퍼팅 10회 기록',icon:'🎯',check:function(){return lsGet('putt_data',[]).length>=10}},
{id:'v16_putt50',name:'퍼팅 전문가',desc:'퍼팅 50회 기록',icon:'🥇',check:function(){return lsGet('putt_data',[]).length>=50}},
{id:'v16_weather5',name:'날씨 관측가',desc:'날씨 5라운드 기록',icon:'🌦️',check:function(){return lsGet('weather_records',[]).length>=5}},
{id:'v16_miss20',name:'미스 분석가',desc:'미스 패턴 20회 기록',icon:'📍',check:function(){return lsGet('miss_data',[]).length>=20}},
{id:'v16_iq_lv3',name:'Golf IQ Lv.3',desc:'Golf IQ 레벨 3 달성',icon:'🧠',check:function(){return lsGet('iq_xp',0)>=300}},
{id:'v16_iq_lv5',name:'Golf IQ Lv.5',desc:'Golf IQ 레벨 5 달성',icon:'🌟',check:function(){return lsGet('iq_xp',0)>=1000}},
{id:'v16_momentum3',name:'모멘텀 애널리스트',desc:'모멘텀 3라운드 분석',icon:'🌊',check:function(){return lsGet('momentum_rounds',[]).length>=3}},
{id:'v16_range10',name:'연습벌레',desc:'연습장 10세션 기록',icon:'🏌️',check:function(){return lsGet('range_sessions',[]).length>=10}},
{id:'v16_bucket3',name:'목표 달성자',desc:'버킷리스트 3개 달성',icon:'🏆',check:function(){var b=lsGet('bucket_list',[]);var d=0;for(var i=0;i<b.length;i++){if(b[i].done)d++;}return d>=3}},
{id:'v16_routine5',name:'루틴 수련생',desc:'프리샷 루틴 5회 완료',icon:'⏱️',check:function(){return lsGet('routines',[]).length>=5}},
{id:'v16_quiz10',name:'퀴즈 도전자',desc:'v16 퀴즈 10문제 풀기',icon:'❓',check:function(){return lsGet('quiz16_total',0)>=10}},
{id:'v16_allround',name:'v16 올라운더',desc:'v16 모든 기능 사용',icon:'💎',check:function(){return lsGet('putt_data',[]).length>0&&lsGet('weather_records',[]).length>0&&lsGet('miss_data',[]).length>0&&lsGet('iq_xp',0)>0&&lsGet('momentum_rounds',[]).length>0&&lsGet('range_sessions',[]).length>0&&lsGet('routines',[]).length>0}}
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
  {icon:'🎯',title:'퍼팅 (Shift+P)',fn:'showPuttingMatrix'},
  {icon:'🌦️',title:'날씨 (Shift+E)',fn:'showWeatherImpact'},
  {icon:'📍',title:'미스 (Shift+M)',fn:'showMissPattern'},
  {icon:'🧠',title:'GolfIQ (Shift+G)',fn:'showGolfIQ'},
  {icon:'🌊',title:'모멘텀 (Shift+T)',fn:'showMomentum'},
  {icon:'🏌️',title:'연습장 (Shift+R)',fn:'showRangeLogger'},
  {icon:'🏆',title:'버킷 (Shift+B)',fn:'showBucketList'},
  {icon:'⏱️',title:'루틴 (Shift+O)',fn:'showRoutineCoach'},
  {icon:'❓',title:'퀴즈 (Shift+Q)',fn:'showV16Quiz'}
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
