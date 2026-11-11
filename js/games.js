/* =========================================================
   نەورۆزی کوردستان — games.js
   یارییەکان: پرسیار، پۆشین، بیرگە، ڕیتم
========================================================= */

/* ---------- tab switching ---------- */
document.querySelectorAll(".game-tab").forEach(tab=>{
  tab.addEventListener("click", ()=>{
    document.querySelectorAll(".game-tab").forEach(t=>t.classList.remove("active"));
    document.querySelectorAll(".game-panel").forEach(p=>p.classList.remove("active"));
    const leaving = document.querySelector(".game-panel.active");
    tab.classList.add("active");
    document.getElementById("game-" + tab.dataset.game).classList.add("active");
    if(leaving && leaving.id === "game-rhythm" && Rhythm.playing) Rhythm.stop();
  });
});

/* ============ ١. پرسیار و وەڵام ============ */
const Quiz = {
  qs: [], i: 0, score: 0,
  begin(){
    this.qs = [...NK.data.quiz].sort(()=>Math.random()-.5).slice(0,10);
    this.i = 0; this.score = 0;
    document.getElementById("quiz-start").hidden = true;
    document.getElementById("quiz-end").hidden = true;
    document.getElementById("quiz-play").hidden = false;
    this.render();
  },
  render(){
    const q = this.qs[this.i];
    document.getElementById("quiz-progress").textContent = `پرسیاری ${this.i+1} لە ${this.qs.length}`;
    document.getElementById("quiz-score").textContent = `خاڵ: ${this.score}`;
    document.getElementById("quiz-bar-fill").style.width = (this.i/this.qs.length*100)+"%";
    document.getElementById("quiz-question").textContent = q.q;
    const box = document.getElementById("quiz-options");
    box.innerHTML = "";
    q.opts.forEach((o,idx)=>{
      const b = document.createElement("button");
      b.className = "quiz-opt";
      b.textContent = o;
      b.onclick = ()=> this.answer(idx, b);
      box.appendChild(b);
    });
  },
  answer(idx, btn){
    const q = this.qs[this.i];
    [...document.getElementById("quiz-options").children].forEach(b=> b.disabled = true);
    if(idx === q.a){ this.score++; btn.classList.add("correct"); }
    else {
      btn.classList.add("wrong");
      document.getElementById("quiz-options").children[q.a].classList.add("correct");
    }
    setTimeout(()=>{
      this.i++;
      if(this.i < this.qs.length) this.render();
      else this.finish();
    }, 900);
  },
  finish(){
    document.getElementById("quiz-play").hidden = true;
    document.getElementById("quiz-end").hidden = false;
    const s = this.score, t = this.qs.length;
    document.getElementById("quiz-result-title").textContent = `ئەنجامەکەت: ${s} لە ${t}`;
    const txt = document.getElementById("quiz-result-text");
    if(s >= 9) txt.textContent = "🌟 نایابە! تۆ دەستەیەکی ڕاستەقینەی کەلتووری کوردیت.";
    else if(s >= 7) txt.textContent = "👏 زۆر باشە! زانیاریت لەسەر کەلتووری کورد فراوانە.";
    else if(s >= 5) txt.textContent = "👍 باشە! هەوڵێکی خۆش، چەند پرسیارێکی تر بخوێنەوە.";
    else txt.textContent = "📚 دەست پێبکە لە گەڕان بە ناو بەشەکانی سایتدا، ئەنجامەکەت باشتر دەبێت!";
  }
};
document.getElementById("quiz-begin").onclick = ()=> Quiz.begin();
document.getElementById("quiz-restart").onclick = ()=> Quiz.begin();

/* ============ ٢. پۆشینی جلوبەرگ ============ */
const Dress = {
  styles: [
    {name:"سۆرانی", shirt:"#f1faee", vest:"#1d3557", pants:"#343a40", sash:"#e63946", hatBand:"#ffd60a", hatTop:"#2b2d42"},
    {name:"کورمانجی", shirt:"#fff3b0", vest:"#a4133c", pants:"#7f1d1d", sash:"#ffd60a", hatBand:"#ffd60a", hatTop:"#a4133c"},
    {name:"هەورامی", shirt:"#f1faee", vest:"#111111", pants:"#1a1a1a", sash:"#333333", hatBand:"#111111", hatTop:"#111111"},
    {name:"موکریانی", shirt:"#d8f3dc", vest:"#2a6f4e", pants:"#1b3a4b", sash:"#e63946", hatBand:"#f5f3ee", hatTop:"#2a6f4e"},
    {name:"نەورۆزی ڕەنگین", shirt:"#ffe5ec", vest:"#9d4edd", pants:"#3a0ca3", sash:"#f4c542", hatBand:"#e63946", hatTop:"#3a0ca3"}
  ],
  si: 0,
  palette: ["#f1faee","#ffd60a","#e63946","#2a9d8f","#1d3557","#9d4edd","#f4a261","#2a6f4e","#111111","#a4133c"],
  init(){
    const mkSwatches = (id, target) => {
      const box = document.getElementById(id);
      box.innerHTML = "";
      this.palette.forEach(c=>{
        const s = document.createElement("span");
        s.className = "swatch"; s.style.background = c;
        s.onclick = ()=>{
          document.getElementById(target).setAttribute("fill", c);
          box.querySelectorAll(".swatch").forEach(x=>x.classList.remove("active"));
          s.classList.add("active");
        };
        box.appendChild(s);
      });
    };
    mkSwatches("shirt-swatches","d-shirt");
    mkSwatches("vest-swatches","d-vest");
    mkSwatches("sash-swatches","d-sash");
    document.getElementById("dress-style").onclick = ()=>{ this.si=(this.si+1)%this.styles.length; this.apply(); };
    document.getElementById("dress-klash").onclick = ()=> this.toggleVis("d-klash");
    document.getElementById("dress-baban").onclick = ()=> this.toggleVis("d-baban");
    document.getElementById("dress-hat").onclick = ()=>{
      const g = document.getElementById("d-hat");
      g.setAttribute("visibility", g.getAttribute("visibility")==="visible"?"hidden":"visible");
    };
    document.getElementById("dress-random").onclick = ()=>{
      const r = a => a[Math.floor(Math.random()*a.length)];
      document.getElementById("d-shirt").setAttribute("fill", r(this.palette));
      document.getElementById("d-vest").setAttribute("fill", r(this.palette));
      document.getElementById("d-sash").setAttribute("fill", r(this.palette));
      const k = document.getElementById("d-klash");
      if(Math.random()>.5) k.setAttribute("visibility","visible"); else k.setAttribute("visibility","hidden");
      NK.toast("✨ شێوەیەکی نوێ دروستکرا!");
    };
  },
  apply(){
    const s = this.styles[this.si];
    document.getElementById("d-shirt").setAttribute("fill", s.shirt);
    document.getElementById("d-vest").setAttribute("fill", s.vest);
    document.getElementById("d-pants-l").setAttribute("fill", s.pants);
    document.getElementById("d-pants-r").setAttribute("fill", s.pants);
    document.getElementById("d-sash").setAttribute("fill", s.sash);
    document.getElementById("d-hat-top").setAttribute("fill", s.hatTop);
    document.getElementById("d-hat-band").setAttribute("fill", s.hatBand);
    document.getElementById("d-arm-l").setAttribute("fill", s.shirt);
    document.getElementById("d-arm-r").setAttribute("fill", s.shirt);
    NK.toast("👗 جلوبەرگی " + s.name);
  },
  toggleVis(id){
    const g = document.getElementById(id);
    g.setAttribute("visibility", g.getAttribute("visibility")==="visible"?"hidden":"visible");
  }
};
Dress.init();

/* ============ ٣. بیرگە (Memory Match) ============ */
const Memory = {
  icons: [
    {e:"🏰", l:"هەولێر"}, {e:"🪕", l:"ساز"}, {e:"🥾", l:"کڵاش"},
    {e:"🍇", l:"هێلاکە"}, {e:"🌷", l:"لالە"}, {e:"☀️", l:"ئەورۆز"},
    {e:"🐎", l:"ئەسپ"}, {e:"🍯", l:"هێل"}
  ],
  first:null, lock:false, moves:0, found:0, timer:null, secs:0, started:false,
  build(){
    const grid = document.getElementById("memory-grid");
    grid.innerHTML = "";
    this.first=null; this.lock=false; this.moves=0; this.found=0; this.secs=0; this.started=false;
    clearInterval(this.timer);
    document.getElementById("mem-moves").textContent="0";
    document.getElementById("mem-matches").textContent="0";
    document.getElementById("mem-time").textContent="0";
    document.getElementById("mem-win").hidden = true;
    const deck = [...this.icons, ...this.icons].sort(()=>Math.random()-.5);
    deck.forEach(ic=>{
      const c = document.createElement("button");
      c.className = "mem-card";
      c.dataset.icon = ic.e;
      c.innerHTML = `<div class="mem-inner">
        <div class="mem-face mem-front">✦</div>
        <div class="mem-face mem-back">${ic.e}<small>${ic.l}</small></div>
      </div>`;
      c.onclick = ()=> this.flip(c);
      grid.appendChild(c);
    });
  },
  flip(c){
    if(this.lock || c.classList.contains("flipped")) return;
    if(!this.started){ this.started=true; this.timer = setInterval(()=>{ this.secs++; document.getElementById("mem-time").textContent=this.secs; },1000); }
    c.classList.add("flipped");
    if(!this.first){ this.first = c; return; }
    this.moves++;
    document.getElementById("mem-moves").textContent = this.moves;
    if(this.first.dataset.icon === c.dataset.icon){
      this.first.classList.add("matched"); c.classList.add("matched");
      this.first = null; this.found++;
      document.getElementById("mem-matches").textContent = this.found;
      if(this.found === 8){
        clearInterval(this.timer);
        setTimeout(()=>{
          document.getElementById("mem-win").hidden = false;
          document.getElementById("mem-win-text").textContent = `${this.moves} هەوڵ لە ماوەی ${this.secs} چرکەدا`;
        }, 450);
      }
    } else {
      this.lock = true;
      const f = this.first;
      this.first = null;
      setTimeout(()=>{ f.classList.remove("flipped"); c.classList.remove("flipped"); this.lock=false; }, 750);
    }
  }
};
document.getElementById("mem-restart").onclick = ()=> Memory.build();
Memory.build();

/* ============ ٤. ڕیتمی چۆپی ============ */
const Rhythm = {
  playing:false, raf:null, notes:[], startT:0, score:0, combo:0, maxCombo:0, hits:0, total:0,
  lanes: [], patterns: null,
  makePattern(){
    // ٤٨ نۆت لە ٤ هێڵ بە ڕیتمی هەڵپەڕکێ
    const p = [];
    let t = 2.0;
    for(let i=0;i<48;i++){
      const lane = Math.floor(Math.random()*4);
      const gap = [0.42,0.42,0.42,0.42,0.84][Math.floor(Math.random()*5)];
      p.push({lane, t});
      t += gap;
    }
    return {notes:p, end:t};
  },
  start(){
    if(this.playing) return;
    this.playing = true;
    this.score = 0; this.combo = 0; this.maxCombo = 0; this.hits = 0;
    const pat = this.makePattern();
    this.notes = pat.notes.map(n=>({...n, hit:false, missed:false, el:null}));
    this.total = this.notes.length;
    this.endTime = pat.end;
    this.startT = performance.now()/1000 + 1.2;
    document.getElementById("rh-result").hidden = true;
    document.getElementById("rh-start").textContent = "■ وەستان";
    this.loop();
  },
  stop(){
    this.playing = false;
    cancelAnimationFrame(this.raf);
    document.querySelectorAll(".rh-note").forEach(n=>n.remove());
    document.getElementById("rh-start").textContent = "▶ دەستپێکردن";
    this.showResult(true);
  },
  loop(){
    if(!this.playing) return;
    const now = performance.now()/1000 - this.startT;
    const lanesBox = document.querySelectorAll(".rh-lane");
    // دروستکردنی نۆتەکان
    this.notes.forEach(n=>{
      if(!n.el && now > n.t - 2.2){
        const el = document.createElement("div");
        el.className = "rh-note";
        el.textContent = "🥁";
        el.style.background = "radial-gradient(circle,#f4c542,#e09f3e)";
        el.style.boxShadow = "0 0 12px rgba(244,197,66,.8)";
        lanesBox[n.lane].appendChild(el);
        n.el = el;
      }
      if(n.el){
        const y = 311 - ((n.t - now) / 2.2) * 276;
        n.el.style.top = y + "px";
        n.el.style.insetInlineStart = "50%";
        n.el.style.marginInlineStart = "-20px";
        if(now > n.t + 0.28 && !n.hit && !n.missed){
          n.missed = true;
          this.combo = 0;
          n.el.style.opacity = .25;
          this.updateHud();
        }
      }
    });
    if(now > this.endTime + 1){ this.stop(); return; }
    this.raf = requestAnimationFrame(()=>this.loop());
  },
  hitLane(lane){
    if(!this.playing) return;
    const now = performance.now()/1000 - this.startT;
    let best=null, bestD=0.28;
    this.notes.forEach(n=>{
      if(n.lane!==lane || n.hit || n.missed) return;
      const d = Math.abs(n.t - now);
      if(d < bestD){ bestD = d; best = n; }
    });
    const key = document.querySelectorAll(".rh-key")[lane];
    key.classList.add("hit"); setTimeout(()=>key.classList.remove("hit"), 120);
    if(best){
      best.hit = true; this.hits++;
      this.combo++;
      this.maxCombo = Math.max(this.maxCombo, this.combo);
      const perfect = bestD < 0.12;
      this.score += perfect ? 100 : 60;
      if(best.el){ best.el.textContent = perfect ? "🌟" : "✅"; setTimeout(()=>best.el && best.el.remove(), 180); }
    } else {
      this.combo = 0;
    }
    this.updateHud();
  },
  updateHud(){
    document.getElementById("rh-score").textContent = this.score;
    document.getElementById("rh-combo").textContent = this.combo;
  },
  showResult(stoppedEarly){
    const acc = this.total ? Math.round(this.hits/this.total*100) : 0;
    const r = document.getElementById("rh-result");
    r.hidden = false;
    let grade = "💃 ڕیتمت باش بوو!";
    if(acc >= 90 && this.maxCombo >= 15) grade = "🏆 نایابە! ڕیتمی چۆپی ڕاستەقینە!";
    else if(acc >= 70) grade = "🥁 زۆر خۆش! دەهۆڵ و زوڕنات ئامادەن!";
    else if(acc >= 45) grade = "💪 باشە، مەشقی زیاتر بکە!";
    r.innerHTML = `<b>${grade}</b><br>خاڵ: ${this.score} &nbsp;|&nbsp; وردی: ${acc}% &nbsp;|&nbsp; گەورەترین کۆمبو: ${this.maxCombo}`;
  }
};
document.getElementById("rh-start").onclick = ()=> Rhythm.playing ? Rhythm.stop() : Rhythm.start();
document.querySelectorAll(".rh-lane").forEach((lane,i)=>{
  lane.addEventListener("pointerdown", ()=> Rhythm.hitLane(i));
});
document.addEventListener("keydown", e=>{
  if(!Rhythm.playing) return;
  const map = {"KeyD":0,"KeyF":1,"KeyJ":2,"KeyK":3};
  // د ف ج ک لە کیبۆردی ئینگلیزی
  if(e.code in map) Rhythm.hitLane(map[e.code]);
});
