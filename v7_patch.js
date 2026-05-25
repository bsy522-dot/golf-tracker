(function(){
'use strict';
var LS='gt_v7_';
var audioCtx=null;
function getAC(){if(!audioCtx)try{audioCtx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}return audioCtx}
function playSfx(type){var ac=getAC();if(!ac)return;var o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);var t=ac.currentTime;g.gain.setValueAtTime(0.1,t);switch(type){case'strokes_gained':o.type='sine';o.frequency.setValueAtTime(587,t);o.frequency.linearRampToValueAtTime(880,t+0.12);o.frequency.linearRampToValueAtTime(1047,t+0.22);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'weather':o.type='triangle';o.frequency.setValueAtTime(330,t);o.frequency.linearRampToValueAtTime(494,t+0.2);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'distance':o.type='sine';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(659,t+0.15);o.frequency.linearRampToValueAtTime(880,t+0.25);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'gapping':o.type='sawtooth';o.frequency.setValueAtTime(392,t);o.frequency.linearRampToValueAtTime(523,t+0.18);g.gain.setValueAtTime(0.06,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;case'warmup':o.type='triangle';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(659,t+0.1);o.frequency.linearRampToValueAtTime(784,t+0.2);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.start(t);o.stop(t+0.35);break;case'profile':o.type='sine';o.frequency.setValueAtTime(659,t);o.frequency.linearRampToValueAtTime(784,t+0.08);o.frequency.linearRampToValueAtTime(1047,t+0.18);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.start(t);o.stop(t+0.3);break;default:o.type='sine';o.frequency.setValueAtTime(440,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.2);o.start(t);o.stop(t+0.2)}}

function lsGet(k,d){try{var v=localStorage.getItem(LS+k);return v?JSON.parse(v):d}catch(e){return d}}
function lsSet(k,v){try{localStorage.setItem(LS+k,JSON.stringify(v))}catch(e){}}
function getShotHistory(){var keys=['gt_shotHistory','shotHistory','gt_history'];for(var i=0;i<keys.length;i++){try{var d=localStorage.getItem(keys[i]);if(d){var a=JSON.parse(d);if(Array.isArray(a)&&a.length>0)return a}}catch(e){}}if(window.shotHistory&&Array.isArray(window.shotHistory))return window.shotHistory;return[]}
function todayStr(){return new Date().toISOString().slice(0,10)}
function showToast(msg){var t=document.createElement('div');t.className='v7-toast';t.textContent=msg;document.body.appendChild(t);setTimeout(function(){t.classList.add('show')},50);setTimeout(function(){t.classList.remove('show');setTimeout(function(){t.remove()},400)},3000)}
function createOverlay(id){var ov=document.createElement('div');ov.className='v7-overlay';ov.id='v7-'+id;ov.addEventListener('click',function(e){if(e.target===ov)closePanel(id)});var pn=document.createElement('div');pn.className='v7-panel';pn.style.position='relative';var cl=document.createElement('button');cl.className='v7-close';cl.innerHTML='&times;';cl.onclick=function(){closePanel(id)};pn.appendChild(cl);ov.appendChild(pn);return pn}
function openPanel(id){var el=document.getElementById('v7-'+id);if(el)el.classList.add('active')}
function closePanel(id){var el=document.getElementById('v7-'+id);if(el)el.classList.remove('active')}
function getPanel(id){var pn=document.getElementById('v7-'+id+'-panel');if(!pn){pn=createOverlay(id);pn.id='v7-'+id+'-panel';document.body.appendChild(pn.parentElement||pn.closest('.v7-overlay')||pn)}return pn}

// ===== 1. STROKES GAINED ANALYSIS =====
var SG_BENCHMARKS={
  driving:{avg:240,good:260,pro:280},
  approach:{gir_pct:50,good_gir:60,pro_gir:72},
  short_game:{up_down_pct:40,good:55,pro:65},
  putting:{putts_per_round:32,good:30,pro:28}
};

function showStrokesGained(){
  var pn=getPanel('sg');
  var shots=getShotHistory();
  var rounds=lsGet('sg_rounds',[]);
  var html='<div class="v7-title">&#128200; Strokes Gained &#xFE0E;분석</div>';

  html+='<div class="v7-card"><h3>Strokes Gained &#xFE0E;개요</h3>';
  html+='<p style="margin-bottom:12px">PGA Tour 평균 대비 각 영역별 스트로크 이득/손실을 분석합니다.</p>';

  var sgData=calculateStrokesGained(shots,rounds);
  var categories=[
    {key:'driving',name:'드라이빙',icon:'&#128663;',color:'#00FF88'},
    {key:'approach',name:'어프로치',icon:'&#127919;',color:'#00B4D8'},
    {key:'short_game',name:'숏게임',icon:'&#9971;&#xFE0E;',color:'#FFC107'},
    {key:'putting',name:'퍼팅',icon:'&#128995;',color:'#E040FB'}
  ];

  html+='<div style="margin:16px 0">';
  var totalSG=0;
  for(var i=0;i<categories.length;i++){
    var cat=categories[i];
    var val=sgData[cat.key]||0;
    totalSG+=val;
    var barWidth=Math.min(Math.abs(val)*20,100);
    var isPos=val>=0;
    html+='<div style="margin-bottom:14px">';
    html+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">';
    html+='<span style="font-size:0.85em;color:#ccc">'+cat.icon+' '+cat.name+'</span>';
    html+='<span style="font-size:0.9em;font-weight:700;color:'+(isPos?'#00FF88':'#ff6b6b')+'">'+(isPos?'+':'')+val.toFixed(2)+'</span>';
    html+='</div>';
    html+='<div style="height:8px;background:rgba(255,255,255,0.06);border-radius:4px;overflow:hidden;position:relative">';
    if(isPos){
      html+='<div style="position:absolute;left:50%;height:100%;width:'+barWidth/2+'%;background:'+cat.color+';border-radius:0 4px 4px 0;transition:width 0.5s"></div>';
    } else {
      html+='<div style="position:absolute;right:50%;height:100%;width:'+barWidth/2+'%;background:#ff6b6b;border-radius:4px 0 0 4px;transition:width 0.5s"></div>';
    }
    html+='<div style="position:absolute;left:50%;top:0;bottom:0;width:1px;background:rgba(255,255,255,0.2)"></div>';
    html+='</div></div>';
  }
  html+='<div style="text-align:center;margin-top:16px;padding:12px;border-radius:10px;background:'+(totalSG>=0?'rgba(0,255,136,0.08)':'rgba(255,107,107,0.08)')+'">';
  html+='<div style="font-size:0.8em;color:#888">Total Strokes Gained</div>';
  html+='<div style="font-size:2em;font-weight:800;color:'+(totalSG>=0?'#00FF88':'#ff6b6b')+'">'+(totalSG>=0?'+':'')+totalSG.toFixed(2)+'</div>';
  html+='</div></div>';

  html+='<div class="v7-card"><h3>&#128161; AI &#xFE0E;개선 추천</h3>';
  var weakest=categories[0],weakVal=sgData[categories[0].key]||0;
  for(var w=1;w<categories.length;w++){var wv=sgData[categories[w].key]||0;if(wv<weakVal){weakVal=wv;weakest=categories[w]}}
  var tips={driving:'드라이버 정확성에 집중하세요. 페어웨이 안착률을 높이는 것이 첫걸음입니다.',approach:'그린적중률(GIR)을 높이려면 거리보다 방향성을 우선하세요. 클럽 선택이 핵심입니다.',short_game:'업앤다운 연습에 시간을 투자하세요. 그린 주변 50yd 이내 칩샷 드릴이 효과적입니다.',putting:'퍼팅 거리감 연습을 하세요. 3퍼트를 줄이는 것이 가장 빠른 점수 향상법입니다.'};
  html+='<p style="color:#ff6b6b;font-weight:600;margin-bottom:6px">가장 약한 영역: '+weakest.name+'</p>';
  html+='<p>'+tips[weakest.key]+'</p></div>';

  html+='<div class="v7-card"><h3>&#128202; &#xFE0E;라운드 데이터 입력</h3>';
  html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">';
  html+='<div><label class="v7-label">페어웨이 안착</label><input id="v7-sg-fw" class="v7-input" type="number" min="0" max="14" value="7" placeholder="/14"></div>';
  html+='<div><label class="v7-label">GIR</label><input id="v7-sg-gir" class="v7-input" type="number" min="0" max="18" value="9" placeholder="/18"></div>';
  html+='<div><label class="v7-label">퍼트 수</label><input id="v7-sg-putts" class="v7-input" type="number" min="18" max="54" value="32" placeholder="총 퍼트"></div>';
  html+='<div><label class="v7-label">업앤다운</label><input id="v7-sg-updown" class="v7-input" type="number" min="0" max="18" value="4" placeholder="성공 수"></div>';
  html+='</div>';
  html+='<button class="v7-btn v7-btn-primary" style="margin-top:12px;width:100%" onclick="window._v7SaveSGRound()">라운드 기록 저장</button>';
  html+='</div>';

  pn.innerHTML='<button class="v7-close" onclick="window._v7Close(\'sg\')">&times;</button>'+html;
  openPanel('sg');playSfx('strokes_gained');
}

function calculateStrokesGained(shots,rounds){
  var sg={driving:0,approach:0,short_game:0,putting:0};
  if(rounds.length===0){
    var straightCount=0,totalShots=shots.length||1;
    for(var i=0;i<shots.length;i++){if(shots[i].curveType==='Straight'||shots[i].curveType==='straight')straightCount++}
    var accuracy=straightCount/totalShots;
    sg.driving=(accuracy-0.5)*2;
    sg.approach=(accuracy-0.45)*1.5;
    sg.short_game=0;
    sg.putting=0;
  } else {
    var lastRounds=rounds.slice(-5);
    var avgFW=0,avgGIR=0,avgPutts=0,avgUD=0;
    for(var r=0;r<lastRounds.length;r++){
      avgFW+=lastRounds[r].fairways||0;
      avgGIR+=lastRounds[r].gir||0;
      avgPutts+=lastRounds[r].putts||0;
      avgUD+=lastRounds[r].updown||0;
    }
    avgFW/=lastRounds.length;avgGIR/=lastRounds.length;avgPutts/=lastRounds.length;avgUD/=lastRounds.length;
    sg.driving=(avgFW/14-0.5)*3;
    sg.approach=(avgGIR/18-0.5)*4;
    sg.putting=(32-avgPutts)*0.3;
    sg.short_game=(avgUD/9-0.4)*2.5;
  }
  return sg;
}

window._v7SaveSGRound=function(){
  var fw=parseInt(document.getElementById('v7-sg-fw').value)||0;
  var gir=parseInt(document.getElementById('v7-sg-gir').value)||0;
  var putts=parseInt(document.getElementById('v7-sg-putts').value)||32;
  var updown=parseInt(document.getElementById('v7-sg-updown').value)||0;
  var rounds=lsGet('sg_rounds',[]);
  rounds.push({date:todayStr(),fairways:fw,gir:gir,putts:putts,updown:updown});
  if(rounds.length>50)rounds=rounds.slice(-50);
  lsSet('sg_rounds',rounds);
  playSfx('strokes_gained');showToast('라운드 데이터 저장 완료!');showStrokesGained();
};

// ===== 2. WEATHER IMPACT ANALYZER =====
var WEATHER_EFFECTS={
  wind_headwind:{name:'맞바람',factor:-0.08,tip:'1~2클럽 더 잡으세요. 낮은 탄도가 유리합니다.'},
  wind_tailwind:{name:'뒷바람',factor:0.05,tip:'1클럽 짧게, 착지 후 런을 고려하세요.'},
  wind_crosswind:{name:'옆바람',factor:-0.03,tip:'바람 반대쪽을 겨냥하세요. 풍속 10mph당 5yd 보정.'},
  rain_light:{name:'가벼운 비',factor:-0.05,tip:'그립을 자주 닦고, 클럽을 1개 더 잡으세요.'},
  rain_heavy:{name:'폭우',factor:-0.12,tip:'2클럽 더 + 3/4 스윙. 하체 안정성이 핵심.'},
  cold:{name:'추위 (10도 이하)',factor:-0.06,tip:'골프공이 딱딱해져 비거리 감소. 레이어링 웜업 필수.'},
  hot:{name:'더위 (30도 이상)',factor:0.03,tip:'공기 밀도 저하로 약간의 비거리 증가. 수분 보충 필수.'},
  altitude:{name:'고지대 (500m+)',factor:0.08,tip:'공기 저항 감소. 클럽 1개 짧게, 런 고려.'},
  humidity_high:{name:'고습도',factor:-0.02,tip:'그립감 유지가 핵심. 장갑 여벌 준비.'}
};

function showWeatherAnalyzer(){
  var pn=getPanel('weather');
  var html='<div class="v7-title">&#127780;&#xFE0E; 날씨 영향 분석기</div>';

  html+='<div class="v7-card"><h3>현재 조건 설정</h3>';
  html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">';
  html+='<div><label class="v7-label">기온 (&deg;C)</label><input id="v7-temp" class="v7-input" type="number" value="22" min="-10" max="45"></div>';
  html+='<div><label class="v7-label">풍속 (km/h)</label><input id="v7-wind" class="v7-input" type="number" value="10" min="0" max="80"></div>';
  html+='<div><label class="v7-label">풍향</label><select id="v7-wind-dir" class="v7-input"><option value="head">맞바람</option><option value="tail">뒷바람</option><option value="cross">옆바람</option></select></div>';
  html+='<div><label class="v7-label">날씨</label><select id="v7-precip" class="v7-input"><option value="clear">맑음</option><option value="light_rain">가벼운 비</option><option value="heavy_rain">폭우</option></select></div>';
  html+='<div><label class="v7-label">해발 (m)</label><input id="v7-alt" class="v7-input" type="number" value="50" min="0" max="2000"></div>';
  html+='<div><label class="v7-label">습도 (%)</label><input id="v7-humidity" class="v7-input" type="number" value="60" min="0" max="100"></div>';
  html+='</div>';
  html+='<button class="v7-btn v7-btn-primary" style="margin-top:12px;width:100%" onclick="window._v7CalcWeather()">거리 보정 계산</button>';
  html+='</div>';

  html+='<div id="v7-weather-result"></div>';

  html+='<div class="v7-card"><h3>&#128218; &#xFE0E;날씨별 클럽 보정표</h3>';
  html+='<table class="v7-table"><tr><th>조건</th><th>영향</th><th>보정</th></tr>';
  var wkeys=Object.keys(WEATHER_EFFECTS);
  for(var i=0;i<wkeys.length;i++){
    var we=WEATHER_EFFECTS[wkeys[i]];
    var pct=Math.round(we.factor*100);
    html+='<tr><td>'+we.name+'</td><td style="color:'+(pct>=0?'#00FF88':'#ff6b6b')+'">'+(pct>=0?'+':'')+pct+'%</td><td style="font-size:0.8em;color:#aaa">'+we.tip+'</td></tr>';
  }
  html+='</table></div>';

  pn.innerHTML='<button class="v7-close" onclick="window._v7Close(\'weather\')">&times;</button>'+html;
  openPanel('weather');playSfx('weather');
}

window._v7CalcWeather=function(){
  var temp=parseInt(document.getElementById('v7-temp').value)||22;
  var wind=parseInt(document.getElementById('v7-wind').value)||0;
  var windDir=document.getElementById('v7-wind-dir').value;
  var precip=document.getElementById('v7-precip').value;
  var alt=parseInt(document.getElementById('v7-alt').value)||0;
  var humidity=parseInt(document.getElementById('v7-humidity').value)||60;

  var totalFactor=0;
  var effects=[];

  if(wind>5){
    var windFactor=wind/40;
    if(windDir==='head'){totalFactor-=windFactor*0.08;effects.push({name:'맞바람 '+wind+'km/h',val:-Math.round(windFactor*8)+'%'})}
    else if(windDir==='tail'){totalFactor+=windFactor*0.05;effects.push({name:'뒷바람 '+wind+'km/h',val:'+'+Math.round(windFactor*5)+'%'})}
    else{totalFactor-=windFactor*0.03;effects.push({name:'옆바람 '+wind+'km/h',val:-Math.round(windFactor*3)+'%'})}
  }
  if(precip==='light_rain'){totalFactor-=0.05;effects.push({name:'가벼운 비',val:'-5%'})}
  if(precip==='heavy_rain'){totalFactor-=0.12;effects.push({name:'폭우',val:'-12%'})}
  if(temp<10){totalFactor-=0.06;effects.push({name:'추위 ('+temp+'&deg;C)',val:'-6%'})}
  if(temp>30){totalFactor+=0.03;effects.push({name:'더위 ('+temp+'&deg;C)',val:'+3%'})}
  if(alt>500){totalFactor+=0.08*(alt/1000);effects.push({name:'고지대 ('+alt+'m)',val:'+'+Math.round(8*alt/1000)+'%'})}
  if(humidity>80){totalFactor-=0.02;effects.push({name:'고습도 ('+humidity+'%)',val:'-2%'})}

  var clubs=[
    {name:'드라이버',base:230},{name:'3번 우드',base:210},{name:'5번 우드',base:195},
    {name:'4번 아이언',base:180},{name:'5번 아이언',base:170},{name:'6번 아이언',base:160},
    {name:'7번 아이언',base:150},{name:'8번 아이언',base:140},{name:'9번 아이언',base:130},
    {name:'PW',base:120},{name:'SW',base:90}
  ];

  var html='<div class="v7-card"><h3>&#127919; &#xFE0E;보정 결과</h3>';
  if(effects.length===0){html+='<p style="color:#00FF88">이상적인 조건입니다! 보정 없이 플레이하세요.</p>'}
  else{
    html+='<div style="margin-bottom:12px">';
    for(var i=0;i<effects.length;i++){
      html+='<span class="v7-badge '+(effects[i].val.indexOf('-')!==-1?'v7-badge-d':'v7-badge-a')+'" style="margin:2px">'+effects[i].name+' '+effects[i].val+'</span> ';
    }
    html+='</div>';
    html+='<div style="text-align:center;padding:8px;margin-bottom:12px;background:rgba(0,180,216,0.08);border-radius:8px">';
    html+='<span style="color:#888;font-size:0.85em">총 보정:</span> <span style="font-size:1.3em;font-weight:700;color:'+(totalFactor>=0?'#00FF88':'#ff6b6b')+'">'+(totalFactor>=0?'+':'')+Math.round(totalFactor*100)+'%</span>';
    html+='</div>';
  }

  html+='<table class="v7-table"><tr><th>클럽</th><th>기본 거리</th><th>보정 거리</th><th>차이</th></tr>';
  for(var c=0;c<clubs.length;c++){
    var cl=clubs[c];
    var adjusted=Math.round(cl.base*(1+totalFactor));
    var diff=adjusted-cl.base;
    html+='<tr><td style="font-weight:600">'+cl.name+'</td><td>'+cl.base+'m</td><td style="color:#00B4D8">'+adjusted+'m</td><td style="color:'+(diff>=0?'#00FF88':'#ff6b6b')+'">'+(diff>=0?'+':'')+diff+'m</td></tr>';
  }
  html+='</table></div>';

  document.getElementById('v7-weather-result').innerHTML=html;
  playSfx('weather');
};

// ===== 3. DISTANCE CALCULATOR =====
function showDistanceCalc(){
  var pn=getPanel('distance');
  var html='<div class="v7-title">&#128207; &#xFE0E;거리 계산기</div>';

  html+='<div class="v7-card"><h3>스윙 속도 &rarr; 비거리 변환</h3>';
  html+='<p style="margin-bottom:12px">클럽헤드 속도를 기반으로 캐리/토탈 비거리를 계산합니다.</p>';
  html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';
  html+='<div><label class="v7-label">클럽헤드 속도 (mph)</label><input id="v7-swing-speed" class="v7-input" type="number" value="95" min="40" max="140"></div>';
  html+='<div><label class="v7-label">클럽</label><select id="v7-dist-club" class="v7-input"><option value="driver">드라이버</option><option value="3wood">3번 우드</option><option value="5iron">5번 아이언</option><option value="7iron">7번 아이언</option><option value="pw">PW</option></select></div>';
  html+='<div><label class="v7-label">발사각 (&deg;)</label><input id="v7-launch" class="v7-input" type="number" value="12" min="5" max="40"></div>';
  html+='<div><label class="v7-label">스핀 (rpm)</label><input id="v7-spin" class="v7-input" type="number" value="2700" min="1000" max="8000"></div>';
  html+='</div>';
  html+='<button class="v7-btn v7-btn-primary" style="margin-top:12px;width:100%" onclick="window._v7CalcDistance()">계산</button></div>';

  html+='<div id="v7-dist-result"></div>';

  html+='<div class="v7-card"><h3>&#128200; &#xFE0E;속도별 비거리 참고표</h3>';
  html+='<table class="v7-table"><tr><th>클럽헤드 속도</th><th>볼 속도</th><th>캐리</th><th>토탈</th><th>수준</th></tr>';
  var refs=[
    {speed:80,ball:118,carry:175,total:195,level:'입문'},
    {speed:90,ball:133,carry:200,total:220,level:'중급'},
    {speed:100,ball:148,carry:225,total:250,level:'상급'},
    {speed:110,ball:162,carry:250,total:280,level:'투어'},
    {speed:120,ball:177,carry:275,total:305,level:'장타자'},
    {speed:130,ball:192,carry:300,total:330,level:'프로 장타'}
  ];
  for(var i=0;i<refs.length;i++){
    var r=refs[i];
    html+='<tr><td>'+r.speed+' mph</td><td>'+r.ball+' mph</td><td>'+r.carry+'yd</td><td>'+r.total+'yd</td><td><span class="v7-badge v7-badge-b">'+r.level+'</span></td></tr>';
  }
  html+='</table></div>';

  pn.innerHTML='<button class="v7-close" onclick="window._v7Close(\'distance\')">&times;</button>'+html;
  openPanel('distance');playSfx('distance');
}

window._v7CalcDistance=function(){
  var speed=parseFloat(document.getElementById('v7-swing-speed').value)||95;
  var club=document.getElementById('v7-dist-club').value;
  var launch=parseFloat(document.getElementById('v7-launch').value)||12;
  var spin=parseInt(document.getElementById('v7-spin').value)||2700;

  var smashFactor={driver:1.48,'3wood':1.44,'5iron':1.38,'7iron':1.34,pw:1.28};
  var sf=smashFactor[club]||1.44;
  var ballSpeed=speed*sf;

  var optimalLaunch={driver:12,'3wood':14,'5iron':18,'7iron':22,pw:28};
  var optimalSpin={driver:2500,'3wood':3200,'5iron':4500,'7iron':6000,pw:8000};
  var launchPenalty=Math.abs(launch-optimalLaunch[club])*0.5;
  var spinPenalty=Math.abs(spin-optimalSpin[club])/1000*2;

  var carryBase=ballSpeed*1.75-launchPenalty-spinPenalty;
  var carry=Math.round(Math.max(carryBase,ballSpeed*1.2));
  var runFactor=spin<3000?0.12:spin<5000?0.08:0.04;
  var total=Math.round(carry*(1+runFactor));

  var level='';
  if(speed>=120)level='&#127942; 프로 장타자';
  else if(speed>=110)level='&#11088; 투어 수준';
  else if(speed>=100)level='&#128170; 상급';
  else if(speed>=90)level='&#128077; 중급';
  else level='&#127793; 입문/초급';

  var html='<div class="v7-card" style="text-align:center">';
  html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:16px">';
  html+='<div><div style="font-size:0.75em;color:#888">볼 스피드</div><div style="font-size:1.5em;font-weight:700;color:#00B4D8">'+Math.round(ballSpeed)+'</div><div style="font-size:0.7em;color:#666">mph</div></div>';
  html+='<div><div style="font-size:0.75em;color:#888">캐리</div><div style="font-size:1.8em;font-weight:800;color:#00FF88">'+carry+'</div><div style="font-size:0.7em;color:#666">yards</div></div>';
  html+='<div><div style="font-size:0.75em;color:#888">토탈</div><div style="font-size:1.5em;font-weight:700;color:#FFC107">'+total+'</div><div style="font-size:0.7em;color:#666">yards</div></div>';
  html+='</div>';
  html+='<div style="padding:8px;background:rgba(0,180,216,0.08);border-radius:8px">';
  html+='<span style="font-size:0.85em">스매시 팩터: <strong>'+sf.toFixed(2)+'</strong> | 수준: '+level+'</span>';
  html+='</div>';

  html+='<div style="margin-top:16px;text-align:left">';
  html+='<div style="font-size:0.8em;color:#888;margin-bottom:6px">비행 시각화</div>';
  html+='<svg width="100%" height="100" viewBox="0 0 300 100">';
  html+='<rect x="0" y="0" width="300" height="100" fill="rgba(0,80,0,0.2)" rx="6"/>';
  html+='<line x1="10" y1="90" x2="290" y2="90" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>';
  var peakH=Math.min(launch*2.5,80);
  var carryX=10+carry*0.9;var totalX=Math.min(10+total*0.9,290);
  html+='<path d="M10 90 Q '+(carryX/2)+' '+(90-peakH)+' '+carryX+' 90" stroke="#00FF88" stroke-width="2" fill="none"/>';
  if(total>carry){html+='<line x1="'+carryX+'" y1="90" x2="'+totalX+'" y2="90" stroke="#FFC107" stroke-width="2" stroke-dasharray="3 2"/>';}
  html+='<circle cx="10" cy="90" r="3" fill="#fff"/>';
  html+='<circle cx="'+carryX+'" cy="90" r="3" fill="#00FF88"/>';
  html+='<text x="'+carryX+'" y="98" fill="#00FF88" font-size="7" text-anchor="middle">CARRY</text>';
  if(total>carry){html+='<circle cx="'+totalX+'" cy="90" r="3" fill="#FFC107"/>';html+='<text x="'+totalX+'" y="98" fill="#FFC107" font-size="7" text-anchor="middle">TOTAL</text>';}
  html+='</svg></div>';
  html+='</div>';

  document.getElementById('v7-dist-result').innerHTML=html;
  playSfx('distance');
};

// ===== 4. CLUB GAPPING CHART =====
function showClubGapping(){
  var pn=getPanel('gapping');
  var shots=getShotHistory();
  var html='<div class="v7-title">&#128202; &#xFE0E;클럽 갭 분석</div>';

  html+='<div class="v7-card"><h3>클럽 간 거리 간격</h3>';
  html+='<p>이상적인 클럽 갭은 10~15yd입니다. 갭이 너무 크면 거리 조절이 어렵습니다.</p></div>';

  var clubDistances=lsGet('club_distances',{
    'Driver':230,'3W':210,'5W':195,'3H':190,'4I':180,'5I':170,
    '6I':160,'7I':150,'8I':140,'9I':130,'PW':120,'GW':110,'SW':95,'LW':75
  });

  var clubOrder=['Driver','3W','5W','3H','4I','5I','6I','7I','8I','9I','PW','GW','SW','LW'];
  var maxDist=clubDistances['Driver']||230;

  html+='<div class="v7-card">';
  html+='<div style="margin-bottom:12px;font-size:0.8em;color:#888">클릭하여 거리 수정 가능</div>';
  for(var i=0;i<clubOrder.length;i++){
    var club=clubOrder[i];
    var dist=clubDistances[club]||0;
    if(dist===0)continue;
    var pct=Math.round(dist/maxDist*100);
    var gap=i>0?(clubDistances[clubOrder[i-1]]||0)-dist:0;
    var gapColor=gap>=10&&gap<=15?'#00FF88':gap>20?'#ff6b6b':'#FFC107';
    html+='<div style="margin-bottom:8px;display:flex;align-items:center;gap:8px">';
    html+='<div style="width:50px;font-size:0.8em;font-weight:600;color:#ccc;text-align:right">'+club+'</div>';
    html+='<div style="flex:1;height:20px;background:rgba(255,255,255,0.04);border-radius:4px;overflow:hidden;position:relative">';
    html+='<div style="height:100%;width:'+pct+'%;background:linear-gradient(90deg,rgba(0,180,216,0.6),rgba(0,255,136,0.6));border-radius:4px;transition:width 0.5s"></div>';
    html+='</div>';
    html+='<div style="width:45px;font-size:0.8em;color:#00B4D8;text-align:right">'+dist+'yd</div>';
    if(i>0&&gap>0){html+='<div style="width:35px;font-size:0.7em;color:'+gapColor+';text-align:center">-'+gap+'</div>';}
    else{html+='<div style="width:35px"></div>';}
    html+='</div>';
  }
  html+='</div>';

  html+='<div class="v7-card"><h3>&#128295; &#xFE0E;내 클럽 거리 설정</h3>';
  html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:8px">';
  for(var j=0;j<clubOrder.length;j++){
    var c=clubOrder[j];
    html+='<div><label class="v7-label">'+c+'</label><input class="v7-input v7-club-dist" data-club="'+c+'" type="number" value="'+(clubDistances[c]||'')+'" min="0" max="350" placeholder="yd"></div>';
  }
  html+='</div>';
  html+='<button class="v7-btn v7-btn-primary" style="margin-top:12px;width:100%" onclick="window._v7SaveClubDist()">저장</button></div>';

  var gaps=[];var hasIssue=false;
  for(var k=1;k<clubOrder.length;k++){
    var d1=clubDistances[clubOrder[k-1]]||0;var d2=clubDistances[clubOrder[k]]||0;
    if(d1>0&&d2>0){var g=d1-d2;gaps.push({from:clubOrder[k-1],to:clubOrder[k],gap:g});if(g>20||g<5)hasIssue=true}
  }
  if(gaps.length>0){
    html+='<div class="v7-card"><h3>&#128161; &#xFE0E;갭 분석 결과</h3>';
    if(!hasIssue){html+='<p style="color:#00FF88">모든 클럽 간격이 이상적입니다 (10~15yd)!</p>'}
    else{
      for(var g2=0;g2<gaps.length;g2++){
        var gp=gaps[g2];
        if(gp.gap>20){html+='<p style="color:#ff6b6b;margin-bottom:4px">&#9888;&#xFE0E; '+gp.from+'&rarr;'+gp.to+': '+gp.gap+'yd 갭 &mdash; 하이브리드/유틸 추가 고려</p>'}
        else if(gp.gap<5){html+='<p style="color:#FFC107;margin-bottom:4px">&#9888;&#xFE0E; '+gp.from+'&rarr;'+gp.to+': '+gp.gap+'yd 갭 &mdash; 중복 클럽, 하나를 교체하세요</p>'}
      }
    }
    html+='</div>';
  }

  pn.innerHTML='<button class="v7-close" onclick="window._v7Close(\'gapping\')">&times;</button>'+html;
  openPanel('gapping');playSfx('gapping');
}

window._v7SaveClubDist=function(){
  var inputs=document.querySelectorAll('.v7-club-dist');
  var data={};
  for(var i=0;i<inputs.length;i++){var v=parseInt(inputs[i].value);if(v>0)data[inputs[i].getAttribute('data-club')]=v}
  lsSet('club_distances',data);
  playSfx('gapping');showToast('클럽 거리 저장 완료!');showClubGapping();
};

// ===== 5. WARM-UP ROUTINE GENERATOR =====
var WARMUP_ROUTINES=[
  {phase:'동적 스트레칭',duration:5,exercises:['팔 돌리기 (전/후 각 10회)','고관절 회전 (좌/우 각 10회)','몸통 회전 (좌/우 각 8회)','햄스트링 레그스윙 (각 10회)','어깨 크로스바디 스트레치']},
  {phase:'정렬 드릴',duration:3,exercises:['얼라인먼트 스틱으로 발, 어깨, 타겟 라인 확인','3/4 스윙 5회 (PW) - 방향성 집중','볼 위치 확인 (각 클럽별)']},
  {phase:'숏게임 웜업',duration:5,exercises:['퍼팅 3피트 10회 연속','퍼팅 10피트 거리감 5회','칩샷 (그린 엣지 5yd) 5회','피치샷 (30yd) 5회']},
  {phase:'풀스윙 빌드업',duration:7,exercises:['SW 하프스윙 5회','PW 3/4 스윙 5회','8번 아이언 풀스윙 5회','6번 아이언 풀스윙 5회','5번 우드 5회','드라이버 5회 (70% 파워부터 시작)']},
  {phase:'타겟 연습',duration:5,exercises:['150yd 표적 5회','200yd 표적 5회','드라이버 페어웨이 목표 3회','가상 1번홀 티샷 2회']}
];

function showWarmupRoutine(){
  var pn=getPanel('warmup');
  var html='<div class="v7-title">&#127939;&#xFE0E; 워밍업 루틴</div>';

  var totalMin=0;
  for(var i=0;i<WARMUP_ROUTINES.length;i++)totalMin+=WARMUP_ROUTINES[i].duration;
  html+='<div class="v7-card" style="text-align:center"><h3>프리라운드 워밍업 ('+totalMin+'분)</h3>';
  html+='<p>체계적인 워밍업으로 첫 홀부터 최고의 퍼포먼스를 발휘하세요</p></div>';

  var progress=lsGet('warmup_progress',{});
  var today=todayStr();
  var todayProgress=progress[today]||[];

  for(var p=0;p<WARMUP_ROUTINES.length;p++){
    var phase=WARMUP_ROUTINES[p];
    var isDone=todayProgress.indexOf(p)!==-1;
    html+='<div class="v7-card" style="border-left:3px solid '+(isDone?'#00FF88':'rgba(0,180,216,0.5)');
    html+=';opacity:'+(isDone?'0.7':'1')+'">';
    html+='<div style="display:flex;justify-content:space-between;align-items:center">';
    html+='<h3>'+(isDone?'&#10003; ':'')+'Phase '+(p+1)+': '+phase.phase+'</h3>';
    html+='<span class="v7-badge v7-badge-b">'+phase.duration+'분</span>';
    html+='</div>';
    html+='<ul style="margin:8px 0 0 16px;color:#aaa;font-size:0.85em;line-height:1.8">';
    for(var e=0;e<phase.exercises.length;e++){
      html+='<li>'+phase.exercises[e]+'</li>';
    }
    html+='</ul>';
    if(!isDone){
      html+='<button class="v7-btn" style="margin-top:8px" onclick="window._v7CompletePhase('+p+')">완료 체크</button>';
    }
    html+='</div>';
  }

  var completedToday=todayProgress.length;
  if(completedToday===WARMUP_ROUTINES.length){
    html+='<div class="v7-card" style="text-align:center;background:rgba(0,255,136,0.08)">';
    html+='<div style="font-size:2em">&#127942;</div>';
    html+='<h3 style="color:#00FF88">워밍업 완료!</h3>';
    html+='<p>준비 완벽. 좋은 라운드 되세요!</p></div>';
  } else {
    html+='<div style="margin-top:8px;text-align:center;color:#888;font-size:0.85em">진행: '+completedToday+'/'+WARMUP_ROUTINES.length+' 단계</div>';
  }

  pn.innerHTML='<button class="v7-close" onclick="window._v7Close(\'warmup\')">&times;</button>'+html;
  openPanel('warmup');playSfx('warmup');
}

window._v7CompletePhase=function(idx){
  var progress=lsGet('warmup_progress',{});
  var today=todayStr();
  if(!progress[today])progress[today]=[];
  if(progress[today].indexOf(idx)===-1)progress[today].push(idx);
  lsSet('warmup_progress',progress);
  playSfx('warmup');
  showToast('Phase '+(idx+1)+' 완료!');
  showWarmupRoutine();
};

// ===== 6. GOLFER PROFILE & SHARE CARD =====
function showProfile(){
  var pn=getPanel('profile');
  var shots=getShotHistory();
  var practiced=lsGet('practiced',{});
  var journal=lsGet('journal',[]);
  var rounds=lsGet('sg_rounds',[]);

  var totalDays=Object.keys(practiced).length;
  var totalMinutes=0;
  for(var pd in practiced){if(practiced[pd]&&practiced[pd].minutes)totalMinutes+=practiced[pd].minutes}

  var straightCount=0;
  for(var i=0;i<shots.length;i++){if(shots[i].curveType==='Straight'||shots[i].curveType==='straight')straightCount++}
  var accuracy=shots.length>0?Math.round(straightCount/shots.length*100):0;

  var level='';var xp=shots.length*10+totalDays*20+totalMinutes;
  if(xp>=10000)level='&#127942; 마스터 골퍼';
  else if(xp>=5000)level='&#11088; 상급 골퍼';
  else if(xp>=2000)level='&#128170; 중급 골퍼';
  else if(xp>=500)level='&#127793; 초급 골퍼';
  else level='&#9971;&#xFE0E; 입문 골퍼';

  var streak=0;
  var d=new Date();
  while(true){var ds=d.toISOString().slice(0,10);if(practiced[ds]){streak++;d.setDate(d.getDate()-1)}else break}

  var html='<div class="v7-title">&#128100; &#xFE0E;골퍼 프로필</div>';

  html+='<div class="v7-card" style="text-align:center;background:linear-gradient(135deg,rgba(0,180,216,0.08),rgba(0,255,136,0.08))">';
  html+='<div style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,#00B4D8,#00FF88);margin:0 auto 12px;display:flex;align-items:center;justify-content:center;font-size:2em">&#9971;&#xFE0E;</div>';
  html+='<div style="font-size:1.5em;font-weight:800;color:#fff">Golf Tracker Pro</div>';
  html+='<div style="font-size:1em;margin-top:4px">'+level+'</div>';
  html+='<div style="font-size:0.8em;color:#888;margin-top:4px">XP: '+xp.toLocaleString()+'</div>';
  html+='</div>';

  html+='<div class="v7-grid" style="margin:12px 0">';
  html+='<div class="v7-card v7-stat"><div class="v7-stat-num">'+shots.length+'</div><div class="v7-stat-label">총 샷 수</div></div>';
  html+='<div class="v7-card v7-stat"><div class="v7-stat-num">'+accuracy+'%</div><div class="v7-stat-label">정확도</div></div>';
  html+='<div class="v7-card v7-stat"><div class="v7-stat-num">'+totalDays+'</div><div class="v7-stat-label">연습 일수</div></div>';
  html+='<div class="v7-card v7-stat"><div class="v7-stat-num">'+streak+'</div><div class="v7-stat-label">연속 일수</div></div>';
  html+='</div>';

  html+='<div class="v7-card"><h3>&#128200; &#xFE0E;활동 요약</h3>';
  html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">';
  html+='<div style="text-align:center"><div style="font-size:1.3em;font-weight:700;color:#00B4D8">'+Math.round(totalMinutes/60*10)/10+'h</div><div style="font-size:0.75em;color:#888">총 연습 시간</div></div>';
  html+='<div style="text-align:center"><div style="font-size:1.3em;font-weight:700;color:#FFC107">'+journal.length+'</div><div style="font-size:0.75em;color:#888">일지 기록</div></div>';
  html+='<div style="text-align:center"><div style="font-size:1.3em;font-weight:700;color:#E040FB">'+rounds.length+'</div><div style="font-size:0.75em;color:#888">라운드 기록</div></div>';
  html+='<div style="text-align:center"><div style="font-size:1.3em;font-weight:700;color:#00FF88">'+(shots.length>0?Math.round(shots[shots.length-1].maxSpeed||shots[shots.length-1].speed||0):0)+'</div><div style="font-size:0.75em;color:#888">최근 속도</div></div>';
  html+='</div></div>';

  html+='<button class="v7-btn v7-btn-primary" style="width:100%;margin-top:8px" onclick="window._v7ShareProfile()">&#128247; 프로필 카드 생성 &amp; 다운로드</button>';

  pn.innerHTML='<button class="v7-close" onclick="window._v7Close(\'profile\')">&times;</button>'+html;
  openPanel('profile');playSfx('profile');
}

window._v7ShareProfile=function(){
  var shots=getShotHistory();
  var practiced=lsGet('practiced',{});
  var totalDays=Object.keys(practiced).length;
  var totalMinutes=0;
  for(var pd in practiced){if(practiced[pd]&&practiced[pd].minutes)totalMinutes+=practiced[pd].minutes}
  var straightCount=0;
  for(var i=0;i<shots.length;i++){if(shots[i].curveType==='Straight'||shots[i].curveType==='straight')straightCount++}
  var accuracy=shots.length>0?Math.round(straightCount/shots.length*100):0;
  var xp=shots.length*10+totalDays*20+totalMinutes;

  var canvas=document.createElement('canvas');
  canvas.width=600;canvas.height=380;
  var ctx=canvas.getContext('2d');

  var grd=ctx.createLinearGradient(0,0,600,380);
  grd.addColorStop(0,'#0d1b2a');grd.addColorStop(0.5,'#1b2838');grd.addColorStop(1,'#0a2e1a');
  ctx.fillStyle=grd;ctx.fillRect(0,0,600,380);

  ctx.strokeStyle='rgba(0,180,216,0.3)';ctx.lineWidth=1;
  for(var g=0;g<600;g+=30){ctx.beginPath();ctx.moveTo(g,0);ctx.lineTo(g,380);ctx.stroke()}
  for(var h=0;h<380;h+=30){ctx.beginPath();ctx.moveTo(0,h);ctx.lineTo(600,h);ctx.stroke()}

  ctx.fillStyle='#00FF88';ctx.font='bold 22px sans-serif';ctx.fillText('Golf Tracker Pro',30,45);
  ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='12px sans-serif';ctx.fillText(todayStr(),30,65);

  ctx.fillStyle='rgba(0,255,136,0.1)';ctx.beginPath();ctx.arc(500,60,40,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#00FF88';ctx.font='28px sans-serif';ctx.textAlign='center';ctx.fillText('⛳',500,68);ctx.textAlign='left';

  var stats=[
    {label:'Total Shots',value:shots.length.toString(),color:'#00FF88'},
    {label:'Accuracy',value:accuracy+'%',color:'#00B4D8'},
    {label:'Practice Days',value:totalDays.toString(),color:'#FFC107'},
    {label:'Hours',value:(totalMinutes/60).toFixed(1),color:'#E040FB'},
    {label:'XP',value:xp.toLocaleString(),color:'#00FF88'},
    {label:'Level',value:xp>=10000?'Master':xp>=5000?'Advanced':xp>=2000?'Intermediate':'Beginner',color:'#00B4D8'}
  ];

  for(var s=0;s<stats.length;s++){
    var col=s%3;var row=Math.floor(s/3);
    var sx=30+col*190;var sy=100+row*120;
    ctx.fillStyle='rgba(255,255,255,0.03)';
    ctx.beginPath();ctx.roundRect(sx,sy,170,100,10);ctx.fill();
    ctx.strokeStyle='rgba(0,180,216,0.2)';ctx.stroke();
    ctx.fillStyle=stats[s].color;ctx.font='bold 28px sans-serif';ctx.fillText(stats[s].value,sx+15,sy+50);
    ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='11px sans-serif';ctx.fillText(stats[s].label,sx+15,sy+75);
  }

  ctx.fillStyle='rgba(255,255,255,0.2)';ctx.font='10px sans-serif';
  ctx.fillText('Generated by Golf Ball Tracker Pro v7',30,365);

  try{
    canvas.toBlob(function(blob){
      var url=URL.createObjectURL(blob);
      var a=document.createElement('a');
      a.href=url;a.download='golf-profile-'+todayStr()+'.png';a.click();
      URL.revokeObjectURL(url);
      showToast('프로필 카드 다운로드 완료!');
    },'image/png');
  }catch(e){showToast('다운로드에 실패했습니다')}
};

// ===== 7. ROUND TRENDS =====
function showTrends(){
  var pn=getPanel('trends');
  var rounds=lsGet('sg_rounds',[]);
  var html='<div class="v7-title">&#128200; &#xFE0E;라운드 트렌드</div>';

  if(rounds.length<2){
    html+='<div class="v7-card"><p>최소 2개 이상의 라운드 데이터가 필요합니다. Strokes Gained 메뉴에서 라운드를 기록하세요.</p>';
    html+='<button class="v7-btn" style="margin-top:8px" onclick="window._v7Close(\'trends\');window._v7_showStrokesGained()">라운드 기록하기</button></div>';
  } else {
    html+='<div class="v7-card"><h3>&#128197; &#xFE0E;라운드 히스토리 ('+rounds.length+'라운드)</h3>';
    html+='<svg width="100%" height="180" viewBox="0 0 500 180" style="margin-top:12px">';
    html+='<rect x="0" y="0" width="500" height="180" fill="rgba(0,0,0,0.2)" rx="8"/>';

    var maxPutts=0,maxGIR=0;
    for(var i=0;i<rounds.length;i++){
      if(rounds[i].putts>maxPutts)maxPutts=rounds[i].putts;
      if(rounds[i].gir>maxGIR)maxGIR=rounds[i].gir;
    }
    if(maxPutts===0)maxPutts=36;if(maxGIR===0)maxGIR=18;

    var recent=rounds.slice(-10);
    var xStep=450/(Math.max(recent.length-1,1));

    html+='<text x="10" y="15" fill="#888" font-size="9">퍼트</text>';
    for(var p=0;p<recent.length;p++){
      var px=25+p*xStep;
      var py=25+(1-recent[p].putts/maxPutts)*70;
      if(p>0){var ppx=25+(p-1)*xStep;var ppy=25+(1-recent[p-1].putts/maxPutts)*70;
        html+='<line x1="'+ppx+'" y1="'+ppy+'" x2="'+px+'" y2="'+py+'" stroke="#E040FB" stroke-width="2"/>';}
      html+='<circle cx="'+px+'" cy="'+py+'" r="3" fill="#E040FB"/>';
    }

    html+='<text x="10" y="115" fill="#888" font-size="9">GIR</text>';
    for(var g=0;g<recent.length;g++){
      var gx=25+g*xStep;
      var gy=115+(1-recent[g].gir/maxGIR)*55;
      if(g>0){var gpx=25+(g-1)*xStep;var gpy=115+(1-recent[g-1].gir/maxGIR)*55;
        html+='<line x1="'+gpx+'" y1="'+gpy+'" x2="'+gx+'" y2="'+gy+'" stroke="#00FF88" stroke-width="2"/>';}
      html+='<circle cx="'+gx+'" cy="'+gy+'" r="3" fill="#00FF88"/>';
    }
    html+='</svg></div>';

    var avgFW=0,avgGIR=0,avgPutts=0;
    for(var a=0;a<rounds.length;a++){avgFW+=rounds[a].fairways||0;avgGIR+=rounds[a].gir||0;avgPutts+=rounds[a].putts||0}
    avgFW/=rounds.length;avgGIR/=rounds.length;avgPutts/=rounds.length;

    html+='<div class="v7-grid">';
    html+='<div class="v7-card v7-stat"><div class="v7-stat-num" style="color:#00FF88">'+avgFW.toFixed(1)+'</div><div class="v7-stat-label">평균 FW 안착 (/14)</div></div>';
    html+='<div class="v7-card v7-stat"><div class="v7-stat-num" style="color:#00B4D8">'+avgGIR.toFixed(1)+'</div><div class="v7-stat-label">평균 GIR (/18)</div></div>';
    html+='<div class="v7-card v7-stat"><div class="v7-stat-num" style="color:#E040FB">'+avgPutts.toFixed(1)+'</div><div class="v7-stat-label">평균 퍼트</div></div>';
    html+='<div class="v7-card v7-stat"><div class="v7-stat-num" style="color:#FFC107">'+rounds.length+'</div><div class="v7-stat-label">총 라운드</div></div>';
    html+='</div>';

    if(rounds.length>=3){
      var last3=rounds.slice(-3);var prev3=rounds.slice(-6,-3);
      if(prev3.length>=3){
        var lastAvgPutts=(last3[0].putts+last3[1].putts+last3[2].putts)/3;
        var prevAvgPutts=(prev3[0].putts+prev3[1].putts+prev3[2].putts)/3;
        var puttTrend=lastAvgPutts-prevAvgPutts;
        html+='<div class="v7-card"><h3>&#128161; &#xFE0E;트렌드 인사이트</h3>';
        if(puttTrend<-1){html+='<p style="color:#00FF88">퍼팅이 최근 3라운드에서 크게 개선되고 있습니다! ('+(puttTrend>0?'+':'')+puttTrend.toFixed(1)+')</p>'}
        else if(puttTrend>1){html+='<p style="color:#ff6b6b">퍼팅 수가 증가 추세입니다. 거리감 연습에 집중하세요. (+'+(puttTrend).toFixed(1)+')</p>'}
        else{html+='<p style="color:#00B4D8">안정적인 퍼포먼스를 유지하고 있습니다.</p>'}
        html+='</div>';
      }
    }
  }

  pn.innerHTML='<button class="v7-close" onclick="window._v7Close(\'trends\')">&times;</button>'+html;
  openPanel('trends');playSfx('strokes_gained');
}

// ===== 8. SMART GOALS =====
var GOAL_TEMPLATES=[
  {id:'shots_week',name:'주간 샷 연습',target:50,unit:'샷',period:'week',icon:'&#127919;'},
  {id:'practice_days',name:'주간 연습일',target:4,unit:'일',period:'week',icon:'&#128197;'},
  {id:'accuracy_70',name:'정확도 70% 달성',target:70,unit:'%',period:'ongoing',icon:'&#127919;'},
  {id:'streak_7',name:'7일 연속 연습',target:7,unit:'일',period:'ongoing',icon:'&#128293;'},
  {id:'rounds_month',name:'월간 라운드',target:4,unit:'라운드',period:'month',icon:'&#9971;&#xFE0E;'},
  {id:'putts_30',name:'퍼팅 30 이하',target:30,unit:'퍼트',period:'round',icon:'&#128995;'}
];

function showSmartGoals(){
  var pn=getPanel('goals');
  var goals=lsGet('smart_goals',[]);
  var html='<div class="v7-title">&#127919; &#xFE0E;스마트 목표</div>';

  if(goals.length>0){
    html+='<div style="margin-bottom:16px">';
    for(var i=0;i<goals.length;i++){
      var g=goals[i];
      var progress=calcGoalProgress(g);
      var pct=Math.min(100,Math.round(progress/g.target*100));
      var isDone=pct>=100;
      html+='<div class="v7-card" style="'+(isDone?'border-color:rgba(0,255,136,0.3)':'')+'">';
      html+='<div style="display:flex;justify-content:space-between;align-items:center">';
      html+='<h3>'+(isDone?'&#10003; ':'')+g.icon+' '+g.name+'</h3>';
      html+='<button class="v7-btn" style="font-size:0.7em;padding:3px 8px" onclick="window._v7RemoveGoal('+i+')">&#10005;</button>';
      html+='</div>';
      html+='<div style="margin-top:8px;display:flex;align-items:center;gap:8px">';
      html+='<div style="flex:1;height:8px;background:rgba(255,255,255,0.06);border-radius:4px;overflow:hidden">';
      html+='<div style="height:100%;width:'+pct+'%;background:'+(isDone?'#00FF88':'#00B4D8')+';border-radius:4px;transition:width 0.5s"></div>';
      html+='</div>';
      html+='<span style="font-size:0.8em;color:'+(isDone?'#00FF88':'#ccc')+'">'+progress+'/'+g.target+' '+g.unit+'</span>';
      html+='</div></div>';
    }
    html+='</div>';
  }

  html+='<div class="v7-card"><h3>&#10133; &#xFE0E;목표 추가</h3>';
  html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">';
  for(var t=0;t<GOAL_TEMPLATES.length;t++){
    var tpl=GOAL_TEMPLATES[t];
    var alreadySet=goals.some(function(g){return g.id===tpl.id});
    html+='<button class="v7-btn" style="text-align:left;padding:10px;'+(alreadySet?'opacity:0.4':'')+ '" '+(alreadySet?'disabled':'')+' onclick="window._v7AddGoal(\''+tpl.id+'\')">';
    html+=tpl.icon+' '+tpl.name+'<br><span style="font-size:0.75em;color:#888">목표: '+tpl.target+' '+tpl.unit+'</span>';
    html+='</button>';
  }
  html+='</div></div>';

  pn.innerHTML='<button class="v7-close" onclick="window._v7Close(\'goals\')">&times;</button>'+html;
  openPanel('goals');playSfx('warmup');
}

function calcGoalProgress(g){
  var shots=getShotHistory();
  var practiced=lsGet('practiced',{});
  var rounds=lsGet('sg_rounds',[]);
  switch(g.id){
    case'shots_week':return shots.length;
    case'practice_days':var now=new Date(),day=now.getDay()||7,c=0;for(var i=0;i<day;i++){var d=new Date(now);d.setDate(now.getDate()-i);if(practiced[d.toISOString().slice(0,10)])c++}return c;
    case'accuracy_70':var st=0;for(var j=0;j<shots.length;j++){if(shots[j].curveType==='Straight'||shots[j].curveType==='straight')st++}return shots.length>0?Math.round(st/shots.length*100):0;
    case'streak_7':var s=0,dd=new Date();while(practiced[dd.toISOString().slice(0,10)]){s++;dd.setDate(dd.getDate()-1)}return s;
    case'rounds_month':var m=new Date().getMonth();return rounds.filter(function(r){return new Date(r.date).getMonth()===m}).length;
    case'putts_30':if(rounds.length===0)return 0;return rounds[rounds.length-1].putts||0;
    default:return 0;
  }
}

window._v7AddGoal=function(id){
  var goals=lsGet('smart_goals',[]);
  var tpl=GOAL_TEMPLATES.find(function(t){return t.id===id});
  if(!tpl)return;
  if(goals.some(function(g){return g.id===id}))return;
  goals.push({id:tpl.id,name:tpl.name,target:tpl.target,unit:tpl.unit,period:tpl.period,icon:tpl.icon,created:todayStr()});
  lsSet('smart_goals',goals);
  playSfx('warmup');showToast('목표 추가: '+tpl.name);showSmartGoals();
};
window._v7RemoveGoal=function(idx){
  var goals=lsGet('smart_goals',[]);goals.splice(idx,1);lsSet('smart_goals',goals);showSmartGoals();
};

// ===== QUICK ACTIONS & KEYBOARD =====
function injectQuickActions(){
  var existing=document.querySelector('.v7-quick-actions');
  if(existing)return;
  var container=document.createElement('div');
  container.className='v7-quick-actions';
  var buttons=[
    {icon:'&#128200;',title:'Strokes Gained (1)',fn:'showStrokesGained'},
    {icon:'&#127780;&#xFE0E;',title:'날씨 보정 (2)',fn:'showWeatherAnalyzer'},
    {icon:'&#128207;',title:'거리 계산 (3)',fn:'showDistanceCalc'},
    {icon:'&#128202;',title:'클럽 갭 (4)',fn:'showClubGapping'},
    {icon:'&#127939;&#xFE0E;',title:'워밍업 (5)',fn:'showWarmupRoutine'},
    {icon:'&#128100;',title:'프로필 (6)',fn:'showProfile'},
    {icon:'&#128200;',title:'트렌드 (7)',fn:'showTrends'},
    {icon:'&#127919;',title:'스마트 목표 (8)',fn:'showSmartGoals'}
  ];
  for(var i=0;i<buttons.length;i++){
    var btn=document.createElement('button');
    btn.className='v7-quick-btn';
    btn.innerHTML=buttons[i].icon;
    btn.title=buttons[i].title;
    btn.setAttribute('data-fn',buttons[i].fn);
    btn.addEventListener('click',function(){
      var fn=this.getAttribute('data-fn');
      if(window['_v7_'+fn])window['_v7_'+fn]();
    });
    container.appendChild(btn);
  }
  document.body.appendChild(container);
}

window._v7_showStrokesGained=showStrokesGained;
window._v7_showWeatherAnalyzer=showWeatherAnalyzer;
window._v7_showDistanceCalc=showDistanceCalc;
window._v7_showClubGapping=showClubGapping;
window._v7_showWarmupRoutine=showWarmupRoutine;
window._v7_showProfile=showProfile;
window._v7_showTrends=showTrends;
window._v7_showSmartGoals=showSmartGoals;
window._v7Close=function(id){closePanel(id)};

function setupKeyboard(){
  document.addEventListener('keydown',function(e){
    if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'||e.target.tagName==='SELECT')return;
    if(e.ctrlKey||e.metaKey||e.altKey)return;
    switch(e.key){
      case'1':e.preventDefault();showStrokesGained();break;
      case'2':e.preventDefault();showWeatherAnalyzer();break;
      case'3':e.preventDefault();showDistanceCalc();break;
      case'4':e.preventDefault();showClubGapping();break;
      case'5':e.preventDefault();showWarmupRoutine();break;
      case'6':e.preventDefault();showProfile();break;
      case'7':e.preventDefault();showTrends();break;
      case'8':e.preventDefault();showSmartGoals();break;
      case'Escape':var overlays=document.querySelectorAll('.v7-overlay.active');for(var i=0;i<overlays.length;i++)overlays[i].classList.remove('active');break;
    }
  });
}

// ===== CSS =====
function injectCSS(){
  var s=document.createElement('style');
  s.textContent='.v7-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.88);z-index:10000;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;pointer-events:none}.v7-overlay.active{opacity:1;pointer-events:auto}.v7-panel{background:linear-gradient(145deg,rgba(15,20,30,.98),rgba(8,12,20,.98));border:1px solid rgba(0,180,216,.25);border-radius:18px;padding:24px;max-width:640px;width:94%;max-height:85vh;overflow-y:auto;box-shadow:0 24px 80px rgba(0,0,0,.7),0 0 40px rgba(0,180,216,.08);position:relative}.v7-panel::-webkit-scrollbar{width:5px}.v7-panel::-webkit-scrollbar-thumb{background:rgba(0,180,216,.25);border-radius:3px}.v7-title{font-size:1.4em;font-weight:800;color:#00B4D8;margin-bottom:18px;letter-spacing:-0.5px}.v7-close{position:absolute;top:12px;right:16px;background:none;border:none;color:#666;font-size:1.6em;cursor:pointer;padding:4px 8px;border-radius:8px;transition:all .2s;z-index:1}.v7-close:hover{color:#ff6b6b;background:rgba(255,107,107,.1)}.v7-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:16px;margin-bottom:12px;transition:all .2s}.v7-card:hover{border-color:rgba(0,180,216,.25);background:rgba(255,255,255,.05)}.v7-card h3{color:#00FF88;font-size:.95em;margin:0 0 8px}.v7-card p{color:#aaa;font-size:.85em;margin:0;line-height:1.6}.v7-badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:.75em;font-weight:600}.v7-badge-a{background:rgba(0,255,136,.12);color:#00FF88}.v7-badge-b{background:rgba(0,180,216,.12);color:#00B4D8}.v7-badge-c{background:rgba(255,193,7,.12);color:#FFC107}.v7-badge-d{background:rgba(255,107,107,.12);color:#ff6b6b}.v7-btn{padding:8px 16px;border:1px solid rgba(0,180,216,.25);background:rgba(0,180,216,.08);color:#00B4D8;border-radius:8px;cursor:pointer;font-size:.85em;transition:all .2s}.v7-btn:hover{background:rgba(0,180,216,.18);border-color:#00B4D8}.v7-btn:disabled{opacity:0.4;cursor:not-allowed}.v7-btn-primary{background:rgba(0,255,136,.12);border-color:rgba(0,255,136,.3);color:#00FF88}.v7-btn-primary:hover{background:rgba(0,255,136,.22)}.v7-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.v7-stat{text-align:center;padding:12px}.v7-stat-num{font-size:1.8em;font-weight:800;color:#00FF88}.v7-stat-label{font-size:.72em;color:#888;margin-top:4px}.v7-input{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:8px 12px;color:#fff;font-size:.85em;width:100%;box-sizing:border-box}.v7-input:focus{outline:none;border-color:rgba(0,180,216,.5)}.v7-label{display:block;font-size:.72em;color:#888;margin-bottom:3px}.v7-table{width:100%;border-collapse:collapse;font-size:.82em}.v7-table th{text-align:left;padding:8px;color:#00B4D8;border-bottom:1px solid rgba(255,255,255,.08);font-weight:600}.v7-table td{padding:8px;color:#ccc;border-bottom:1px solid rgba(255,255,255,.03)}.v7-quick-actions{position:fixed;bottom:80px;left:16px;display:flex;flex-direction:column;gap:7px;z-index:998}.v7-quick-btn{width:42px;height:42px;border-radius:11px;border:1px solid rgba(0,255,136,.2);background:rgba(8,12,20,.92);color:#00FF88;font-size:1.1em;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;backdrop-filter:blur(12px)}.v7-quick-btn:hover{background:rgba(0,255,136,.12);transform:scale(1.08);box-shadow:0 4px 16px rgba(0,255,136,.15)}.v7-toast{position:fixed;top:20px;left:50%;transform:translateX(-50%) translateY(-100px);background:rgba(0,255,136,.12);border:1px solid rgba(0,255,136,.25);color:#00FF88;padding:10px 20px;border-radius:10px;z-index:99999;transition:transform .4s;font-size:.9em;backdrop-filter:blur(12px)}.v7-toast.show{transform:translateX(-50%) translateY(0)}@media(max-width:480px){.v7-panel{padding:16px;max-height:92vh;width:96%}.v7-grid{grid-template-columns:1fr}.v7-quick-actions{bottom:70px;left:8px}.v7-quick-btn{width:36px;height:36px;font-size:0.95em}}';
  document.head.appendChild(s);
}

// ===== INIT =====
function init(){
  injectCSS();
  injectQuickActions();
  setupKeyboard();
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init)}
else{setTimeout(init,600)}

})();
