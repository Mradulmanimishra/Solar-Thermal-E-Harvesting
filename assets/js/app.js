// ── CLOCK ─────────────────────────────────────
function tick(){
  const n=new Date();
  document.getElementById('clk-t').textContent=n.toLocaleTimeString('en-IN',{hour12:false});
  document.getElementById('clk-d').textContent=n.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'});
}
setInterval(tick,1000);tick();

// ── CHART SETUP ───────────────────────────────
const MAX_PTS=60;
const tLabels=[];
const td={T1:[],T2:[],T3:[],T4:[]};
const fd={F1:[],F2:[]};
const prev={T1:null,T2:null,T3:null,T4:null,F1:null,F2:null};
const logs=[];

const axCfg={
  grid:{color:'rgba(0,0,0,0.1)',drawBorder:false},
  ticks:{color:'#444',font:{family:'Segoe UI',size:9}},
  border:{display:false}
};
const plugCfg={
  legend:{display:false},
  tooltip:{
    backgroundColor:'rgba(30,30,30,.95)',
    borderColor:'rgba(242,200,17,.3)',borderWidth:1,
    titleColor:'#888',bodyColor:'#f0f0f0',
    padding:9,
    titleFont:{family:'Segoe UI',size:9},
    bodyFont:{family:'Segoe UI',size:11,weight:'600'}
  }
};

function mkChart(id,datasets,yLabel){
  return new Chart(document.getElementById(id).getContext('2d'),{
    type:'line',
    data:{labels:tLabels,datasets},
    options:{
      responsive:true,maintainAspectRatio:false,
      animation:{duration:250},
      interaction:{mode:'index',intersect:false},
      plugins:plugCfg,
      scales:{
        x:{...axCfg,ticks:{...axCfg.ticks,maxRotation:0,maxTicksLimit:8}},
        y:{...axCfg,title:{display:true,text:yLabel,color:'#555',font:{family:'Segoe UI',size:9}}}
      }
    }
  });
}

function ds(label,color,data){
  return{label,data,borderColor:color,backgroundColor:color+'18',
         borderWidth:1.8,pointRadius:0,pointHoverRadius:3,tension:0.4,fill:false};
}

const tempChart=mkChart('tc',[
  ds('T1','#00e5ff',td.T1),ds('T2','#00ff88',td.T2),
  ds('T3','#ffb340',td.T3),ds('T4','#ff6b9d',td.T4)
],'Temperature (°C)');

const flowChart=mkChart('fc',[
  ds('F1','#a78bfa',fd.F1),ds('F2','#38bdf8',fd.F2)
],'Flow (L/min)');

// ── UI HELPERS ────────────────────────────────
function setCtrl(key,state){
  const card=document.getElementById('c-'+key);
  const stat=document.getElementById('s-'+key);
  card.className='c-card '+(state?'on':'off');
  card.style.setProperty('--state-col',state?'var(--on)':'var(--off)');
  stat.textContent=state?'ON':'OFF';
}

function setSensor(id,val,isFlow){
  const el=document.getElementById('v-'+id);
  const del=document.getElementById('d-'+id);
  const pv=prev[id];
  el.textContent=isFlow?val.toFixed(2):val.toFixed(1);
  if(pv!==null){
    const diff=val-pv;
    const abs=Math.abs(diff).toFixed(2);
    if(diff>0.01){del.className='s-delta d-up';del.textContent='↑'+abs;}
    else if(diff<-0.01){del.className='s-delta d-dn';del.textContent='↓'+abs;}
    else{del.className='s-delta d-fl';del.textContent='→';}
  }
  prev[id]=val;
}

function pushPoint(sensors){
  const t=new Date().toLocaleTimeString('en-IN',{hour12:false});
  tLabels.push(t);
  td.T1.push(sensors.T1);td.T2.push(sensors.T2);
  td.T3.push(sensors.T3);td.T4.push(sensors.T4);
  fd.F1.push(sensors.F1);fd.F2.push(sensors.F2);
  if(tLabels.length>MAX_PTS){
    tLabels.shift();
    Object.values(td).forEach(a=>a.shift());
    Object.values(fd).forEach(a=>a.shift());
  }
  tempChart.update('none');
  flowChart.update('none');
}

function pushLog(sensors,ctrl){
  const ts=new Date().toLocaleString('en-IN');
  logs.unshift({ts,...sensors,...ctrl});
  if(logs.length>10000)logs.pop();
  const tbody=document.getElementById('log-body');
  document.getElementById('log-cnt').textContent=logs.length+' records';
  tbody.innerHTML=logs.map((e,i)=>`
    <tr class="${i===0?'new-row':''}">
      <td class="ts">${e.ts}</td>
      <td style="color:var(--t1)">${(e.T1||0).toFixed(1)}</td>
      <td style="color:var(--t2)">${(e.T2||0).toFixed(1)}</td>
      <td style="color:var(--t3)">${(e.T3||0).toFixed(1)}</td>
      <td style="color:var(--t4)">${(e.T4||0).toFixed(1)}</td>
      <td style="color:var(--f1)">${(e.F1||0).toFixed(2)}</td>
      <td style="color:var(--f2)">${(e.F2||0).toFixed(2)}</td>
      <td style="color:${e.power_supply?'var(--on)':'var(--off)'}">${e.power_supply?'ON':'OFF'}</td>
      <td style="color:${e.solenoid_valve?'var(--on)':'var(--off)'}">${e.solenoid_valve?'ON':'OFF'}</td>
      <td style="color:${e.pump?'var(--on)':'var(--off)'}">${e.pump?'ON':'OFF'}</td>
      <td style="color:${e.artificial_lamp?'var(--on)':'var(--off)'}">${e.artificial_lamp?'ON':'OFF'}</td>
    </tr>`).join('');
}



// ── DEMO MODE ─────────────────────────────────
const dT={T1:38,T2:32,T3:62,T4:47};
const dF={F1:2.4,F2:2.1};
const dC={power_supply:true,solenoid_valve:true,pump:true,artificial_lamp:false};
let tick2=0;

function demoStep(){
  dT.T1+=((Math.random()-.44)*.4);
  dT.T2+=((Math.random()-.46)*.5);
  dT.T3+=((Math.random()-.45)*.7);
  dT.T4+=((Math.random()-.45)*.45);
  dF.F1=Math.max(.5,Math.min(5,dF.F1+(Math.random()-.5)*.05));
  dF.F2=Math.max(.3,Math.min(4.8,dF.F2+(Math.random()-.5)*.04));
  for(const k in dT)dT[k]=Math.max(25,Math.min(95,dT[k]));
  if(++tick2%25===0)dC.artificial_lamp=!dC.artificial_lamp;

  const sensors={...dT,...dF};
  ['T1','T2','T3','T4'].forEach(k=>setSensor(k,sensors[k],false));
  ['F1','F2'].forEach(k=>setSensor(k,sensors[k],true));
  setCtrl('power',dC.power_supply);
  setCtrl('sol',dC.solenoid_valve);
  setCtrl('pump',dC.pump);
  setCtrl('lamp',dC.artificial_lamp);
  pushPoint(sensors);
  if(tick2%5===0)pushLog(sensors,{...dC});
}

function startDemo(){
  const p=document.getElementById('pill');
  p.className='live-pill demo';
  document.getElementById('pill-txt').textContent='DEMO MODE';
  setInterval(demoStep,2000);demoStep();
}

// ── FIREBASE ──────────────────────────────────
function connectFB(){
  const cfg={
    databaseURL: 'https://solar-thermal-e-harvesting-default-rtdb.firebaseio.com/'
  };
  try{
    firebase.initializeApp(cfg);
    const db=firebase.database();
    let lastCtrl={power_supply:false,solenoid_valve:false,pump:false,artificial_lamp:false};

    db.ref('/solar_thermal').on('value',snap=>{
      const d=snap.val()||{};
      const temp=d.temperature||{};
      const flow=d.flow||{};
      const relays=d.relays||{};
      
      const sensors={
        T1:+temp.t1||0, T2:+temp.t2||0, T3:+temp.t3||0, T4:+temp.t4||0,
        F1:+flow.flow1_Lmin||0, F2:+flow.flow2_Lmin||0
      };
      
      ['T1','T2','T3','T4'].forEach(k=>setSensor(k,sensors[k],false));
      ['F1','F2'].forEach(k=>setSensor(k,sensors[k],true));
      pushPoint(sensors);

      lastCtrl={
        power_supply:!!relays.relay1_state,
        solenoid_valve:!!relays.relay2_state,
        pump:!!relays.relay3_state,
        artificial_lamp:!!relays.relay4_state
      };
      
      setCtrl('power',lastCtrl.power_supply);
      setCtrl('sol',lastCtrl.solenoid_valve);
      setCtrl('pump',lastCtrl.pump);
      setCtrl('lamp',lastCtrl.artificial_lamp);
      
      pushLog(sensors,lastCtrl);
    });

    db.ref('.info/connected').on('value',snap=>{
      const p=document.getElementById('pill');
      if(snap.val()){
        p.className='live-pill live';
        document.getElementById('pill-txt').textContent='LIVE';
      }else{
        p.className='live-pill dead';
        document.getElementById('pill-txt').textContent='DISCONNECTED';
      }
    });
  }catch(e){alert('Firebase error: '+e.message);}
}

function downloadCSV() {
  if (logs.length === 0) {
    alert("No data available to download.");
    return;
  }
  
  const headers = ["Timestamp", "T1 °C", "T2 °C", "T3 °C", "T4 °C", "F1 L/m", "F2 L/m", "Power", "Solenoid", "Pump", "Lamp"];
  let csvContent = headers.join(",") + "\n";
  
  logs.forEach(e => {
    const row = [
      `"${e.ts}"`,
      (e.T1||0).toFixed(1),
      (e.T2||0).toFixed(1),
      (e.T3||0).toFixed(1),
      (e.T4||0).toFixed(1),
      (e.F1||0).toFixed(2),
      (e.F2||0).toFixed(2),
      e.power_supply ? "ON" : "OFF",
      e.solenoid_valve ? "ON" : "OFF",
      e.pump ? "ON" : "OFF",
      e.artificial_lamp ? "ON" : "OFF"
    ];
    csvContent += row.join(",") + "\n";
  });
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  const d = new Date();
  link.setAttribute("download", `solar_log_${d.getTime()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

connectFB();