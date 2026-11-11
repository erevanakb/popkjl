/* =========================================================
   نەورۆزی کوردستان — main.js
   داتا، کاتژمێر، مۆسیقا، پیشاندانی ناوەڕۆک
========================================================= */

const NK = window.NK = {};

/* ---------- داتای بنەڕەتی ---------- */
NK.DEFAULTS = {
  password: "1234",
  audioName: "مۆسیقای نیشتمانی — ئەی ڕەقیب",
  audioData: null, // base64 audio uploaded by admin (optional)
  poems: [
    {
      poet: "نالی",
      title: "بەندێک لە غەزەڵ",
      text: "خەیاڵم لە شەوا چوومە هەنجیر و هەرمێ\nگوڵ و غونچە وەنەلەل بوو بە دەستم وەردەمێ"
    },
    {
      poet: "مەحوی",
      title: "وەرگێڕانێک لە حافز",
      text: "ئەگەر تووشی دڵداری ئاشنایی\nئەگەر چاوەڕێی وەسڵی عیشق ئەکەیتەوە\nهەر شەوێ بە خەمی عەشقێ بێ خەوی\nڕەنگە ڕۆژێ بە دەستی خۆش نەگەیتەوە"
    },
    {
      poet: "هێمن مۆکریانی",
      title: "بەندێک لە دیوانی «دیمەن»",
      text: "دڵ ئەگەر چاو نەبینێت دڵ پەژارە دەبێت\nهەمیشە لەگەڵ هەورەکان ڕۆیشتووە"
    },
    {
      poet: "شێرکۆ بێکەس",
      title: "بەندێک لە شیعر",
      text: "بۆچی ئەم شارە ئاوا وێرانە؟\nچونکە تۆ لە ماڵی خۆت دەرچوویت"
    }
  ],
  proverbs: [
    {text: "دۆست بە دۆست ناسراوە", meaning: "دۆستی ڕاستەقینە لە کاتی پێویستیدا دەردەکەوێت"},
    {text: "سەری تەخت، ژیان ئاسان", meaning: "خاوەنی مێشک و دانایی ژیانەکەی ئاسان دەکات"},
    {text: "با شانەی دەست نابڕێت", meaning: "کارە سەختەکان بە هاوکاری ئاسان دەبن"},
    {text: "بەهار دێت بە گوڵەوە ناگات", meaning: "هەموو شتێک بە خۆشەویستی و خۆشی دەگۆڕدرێت"},
    {text: "کڵاش ڕەنگە لە چاوی کەس نییە", meaning: "ڕەنگ و جوانیکە لە ناخی مرۆڤدایە نەک لە دەرەوە"},
    {text: "چرای مەحکووم هەر ئەچرێت", meaning: "حەق و ڕاستی هەر دەردەکەوێت و نانووسێتەوە"}
  ],
  cuisine: [
    {name: "یەپراخ (دۆڵمە)", tag: "ژیاننامە", img: "assets/food-dolma.svg",
     desc: "بەرگەڵای مۆل، بادەمجان و فەفەری پڕکراو بە برنج و گۆشت. مێژووەکەی دەگەڕێتەوە بۆ سەدەکانی ناوین و ئەمڕۆش سەرسەدهی سینی نەورۆزە."},
    {name: "کەبابی کوردستانی", tag: "گرم و ئاگرین", img: "assets/food-kebab.svg",
     desc: "گۆشتی بەرازی یان مریشک بە بەهاراتی تایبەت لەسەر ئاگری دار. لە هەموو جەژن و خێرانەکاندا سەرەکی ترازوونەکەیە."},
    {name: "دووخەوا", tag: "تایبەتی کەرکووک", img: "assets/food-dukhawa.svg",
     desc: "شلەی تەریکی بەرداش و لەبڵەب لەگەڵ نانێکی تایبەت. یەکێکە لە دیارترین خواردنە دێرینەکانی باکووری کوردستان."},
    {name: "شفتە", tag: "یاری هەڵپەڕکێ", img: "assets/food-shfta.svg",
     desc: "گۆشتی ڕەشکراو بە پیازەوە دەلەرزێت و دوایی لە کەوە دەسووت. لەگەڵ سەلqەدە و برنج دەخورێت."},
    {name: "بریانی", tag: "ئەرسی و جەژن", img: "assets/food-biryani.svg",
     desc: "برنجی زەرد لەگەڵ مریشک و بەهاراتی تایبەت، بەناوبانگترین خواردنی مەجلس و ئاهەنگی کوردایەتی."},
    {name: "هەڵوای کوردی", tag: "شیرینی جەژن", img: "assets/food-halwa.svg",
     desc: "شیرینیەکە لە ئارد، ڕۆن و شەکر دروست دەکرێت و بە بەرواری و جۆ دەڕازێتەوە. هەرگیز لە سینی نەورۆز نەمێنێت!"}
  ],
  attire: [
    {name: "جلوبەرگی سۆرانی", region: "هەولێر، سلێمانی، هەڵەبجە", img: "assets/attire-sorani.svg",
     desc: "جومگەی سپی، بانەوەری بە ڕەشی سامانکە و شاڵی بەرتیل. جلێکی ڕەسەنی خاوەن دەستوورە و لە هەموو ئاهەنگەکاندا دەبینرێت."},
    {name: "جلوبەرگی کورمانجی (بادینی)", region: "بادینان، دهۆک", img: "assets/attire-kurmanji.svg",
     desc: "شاڵ و جاکێتی قەڵەو بە ڕەنگی سوور و ئاڵەوە. کڵاشە بەرزەکەی بەناوبانگە و لە شاخ و مەیدانەکاندا دەبینرێت."},
    {name: "جلوبەرگی هەورامی", region: "هەورامان و پاوە", img: "assets/attire-horami.svg",
     desc: "جلوبەرگی ڕەشی ڕەسەن هاوردە بە کڵاشی بەرز. هاودۆستی نێوان دەست و سروشتی چیای هەورامانە."},
    {name: "جلوبەرگی موکریانی", region: "مهاباد و سەقز", img: "assets/attire-mukri.svg",
     desc: "داشۆ و جلوبەرگی ڕەنگاوڕەنگ لەگەڵ کڵاشی سپی. میریشکی و ژنانی موکریانی بە دەستکردی خۆیان جل دەکەن."},
    {name: "جلوبەرگی ژنانی کورمانجی", region: "کوردستانی باکوور", img: "assets/attire-kurmanji-f.svg",
     desc: "کراسی درێژی ڕەنگاوڕەنگ بە گوڵە بچووکەکانی دەستکرد. هەر شارێک نەخشی تایبەت بە خۆی هەیە."}
  ],
  quiz: [
    {q: "نەورۆز لە کام ڕۆژی ساڵ دەست پێدەکات؟", opts: ["١ی کانوونی دووەم", "٢١ی ئازار", "١ی تەممووز", "١٤ی تشرینی یەکەم"], a: 1},
    {q: "سینی نەورۆز چەند شتی تێدەبێت؟", opts: ["٥", "٦", "٧", "١٠"], a: 2},
    {q: "سازی بەناوبانگی کورد کە بە دەستەوە دەژەنرێت:", opts: ["عود", "جهێز", "تار", "پیانۆ"], a: 1},
    {q: "قەڵای هەولێر لە کام شارەوارە؟", opts: ["سلێمانی", "دهۆک", "هەولێر", "کەرکووک"], a: 2},
    {q: "کڵاش چیە؟", opts: ["جۆرە سازێک", "جۆرە جلوبەرگێک", "جۆرە خواردنێک", "جۆرە گوڵێک"], a: 1},
    {q: "«دۆڵمە» بە کوردیتر چی پێدەوترێت؟", opts: ["شفتە", "یەپراخ", "دووخەوا", "بریانی"], a: 1},
    {q: "شاعیری «دیمەن» کێیە؟", opts: ["نالی", "مەحوی", "هێمەن مۆکریانی", "شێرکۆ بێکەس"], a: 2},
    {q: "هەڵپەڕکێی زۆر بەناوبانگی کورد بە چ ناوە؟", opts: ["چۆپی", "هەلپەرک", "دەبکە", "سەما"], a: 0},
    {q: "مۆسیقای نیشتمانی کوردستان چییە؟", opts: ["ئەی نەورۆز", "ئەی ڕەقیب", "چرای ئازادی", "هەنگی ژین"], a: 1},
    {q: "گوڵی نیشانەی نەورۆز:", opts: ["ڕێواس", "بەنەفشە", "بەهارانە", "گوڵاڵە (لالە)"], a: 3},
    {q: "ئاوی ئاگرین کە بە هاوینا دەنووسێتەوە بۆ نەورۆز چی پێدەوترێت؟", opts: ["ئاوی زەرد", "ئاوی زیندوو", "ئاوی خۆش", "ئاوی کێوی"], a: 1},
    {q: "شاری هەورامان بە چییەوە ناسراوە؟", opts: ["بەندەری بازرگانی", "تیشک و چنار و دەستکردی جل", "دەریای گەورە", "چیا بەفراوییەکان"], a: 1}
  ]
};

/* ---------- بارکردن و پاشەکەوتی داتا ---------- */
const STORE_KEY = "nk_data_v1";
NK.loadData = function(){
  try{
    const raw = localStorage.getItem(STORE_KEY);
    if(raw) return Object.assign(JSON.parse(JSON.stringify(NK.DEFAULTS)), JSON.parse(raw));
  }catch(e){}
  return JSON.parse(JSON.stringify(NK.DEFAULTS));
};
NK.saveData = function(){
  localStorage.setItem(STORE_KEY, JSON.stringify(NK.data));
};
NK.data = NK.loadData();

/* ---------- نووسینە جێبەجێکەرەکان ---------- */
NK.toast = function(msg){
  const t = document.getElementById("toast");
  t.textContent = msg; t.hidden = false;
  clearTimeout(NK._toastTimer);
  NK._toastTimer = setTimeout(()=> t.hidden = true, 2600);
};

/* ---------- کاتژمێری نەورۆز ---------- */
NK.nowruzTarget = function(){
  const now = new Date();
  let y = now.getFullYear();
  let t = new Date(y, 2, 21, 0, 0, 0);
  if(now >= new Date(y, 2, 22, 0, 0, 0)) t = new Date(y+1, 2, 21, 0, 0, 0);
  return t;
};
NK.tick = function(){
  const now = Date.now();
  const endOfToday = new Date(); endOfToday.setHours(23,59,59,999);
  let diff = NK.nowruzTarget() - now;
  const today = new Date();
  if(today.getMonth() === 2 && today.getDate() === 21){
    document.getElementById("cd-caption").textContent = "🎉 ئەمڕۆ نەورۆزە! جەژنت پیرۆز بێت 🌷";
  } else {
    document.getElementById("cd-caption").textContent = "مابووە تا نەورۆزی پیرۆز";
  }
  const d = Math.floor(diff/86400000);
  const h = Math.floor(diff/3600000)%24;
  const m = Math.floor(diff/60000)%60;
  const s = Math.floor(diff/1000)%60;
  [["cd-days",d],["cd-hours",h],["cd-mins",m],["cd-secs",s]].forEach(([id,val])=>{
    const el = document.getElementById(id);
    const txt = String(val).padStart(2,"0");
    if(el.textContent !== txt){
      el.textContent = txt;
      el.classList.remove("pop"); void el.offsetWidth; el.classList.add("pop");
    }
  });
};
setInterval(NK.tick, 1000); NK.tick();

/* ---------- مۆسیقا (Web Audio synth) ---------- */
NK.Audio = {
  ctx:null, playing:false, timer:null, gain:null,
  init(){
    if(this.ctx) return;
    this.ctx = new (window.AudioContext||window.webkitAudioContext)();
    this.gain = this.ctx.createGain();
    this.gain.gain.value = 0.5;
    this.gain.connect(this.ctx.destination);
  },
  note(freq, t, dur, type="triangle", vol=0.25){
    const o = this.ctx.createOscillator(), g = this.ctx.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t+0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t+dur);
    o.connect(g); g.connect(this.gain);
    o.start(t); o.stop(t+dur+0.05);
  },
  drum(t, kind){
    if(kind==="kick"){
      const o=this.ctx.createOscillator(), g=this.ctx.createGain();
      o.type="sine";
      o.frequency.setValueAtTime(150,t); o.frequency.exponentialRampToValueAtTime(45,t+0.12);
      g.gain.setValueAtTime(0.5,t); g.gain.exponentialRampToValueAtTime(0.001,t+0.16);
      o.connect(g); g.connect(this.gain); o.start(t); o.stop(t+0.2);
    }else{
      const len=this.ctx.sampleRate*0.09;
      const buf=this.ctx.createBuffer(1,len,this.ctx.sampleRate);
      const d=buf.getChannelData(0);
      for(let i=0;i<len;i++) d[i]=(Math.random()*2-1)*(1-i/len);
      const s=this.ctx.createBufferSource(), g=this.ctx.createGain(), f=this.ctx.createBiquadFilter();
      f.type="bandpass"; f.frequency.value=2200;
      g.gain.value=0.22; s.buffer=buf; s.connect(f); f.connect(g); g.connect(this.gain);
      s.start(t);
    }
  },
  // مەلۆدی فۆلکلۆری کوردی (سیمفۆنیای سادەی ئەی ڕەقیب)
  melody(){
    const N={D:293.66,Eb:311.13,"F#":369.99,G:392,A:440,Bb:466.16,C:523.25,Dh:587.33};
    const tune = [
      ["D",.5],["F#",.5],["A",.5],["Bb",.5],["A",.5],["G",.5],["F#",.5],["G",.5],
      ["A",.5],["A",.5],["Bb",.5],["C",.5],["Dh",.5],["C",.5],["Bb",.5],["A",.5],
      ["Bb",.5],["A",.5],["G",.5],["F#",.5],["G",.5],["F#",.5],["E",.5],["D",.5]
    ];
    // sequence in Hijaz on D
    const seq = [
      ["D",.45],["F#",.45],["G",.45],["Bb",.9],["A",.45],["G",.45],["F#",.45],["E",.45],
      ["D",.9],["F#",.45],["A",.45],["G",.45],["F#",.45],["G",.45],["A",.45],["Bb",.9],
      ["C",.45],["Bb",.45],["A",.45],["G",.45],["F#",.45],["G",.45],["A",.45],["D",1.35]
    ];
    const beat = 0.42;
    let total = seq.reduce((a,[,d])=>a+d,0)*beat;
    this.timer = setInterval(()=>{
      const t0 = this.ctx.currentTime + 0.08;
      let t = t0;
      seq.forEach(([n,d])=>{
        const f = {D:293.66,F:349.23,G:392,A:440,Bb:466.16,C:523.25,DH:587.33,E:329.63}[n]||293.66;
        this.note(f, t, d*beat*0.85, "triangle", 0.3);
        this.note(f/2, t, d*beat*0.9, "sine", 0.14);
        t += d*beat;
      });
      // دهۆڵ
      let td = t0;
      for(let x=0; x<total; x+=beat){
        this.drum(td, (Math.round(x/beat)%2===0)?"kick":"snare");
        td += beat;
      }
    }, (total+0.4)*1000);
    // play once immediately
    const t0 = this.ctx.currentTime + 0.08;
    let t = t0;
    seq.forEach(([n,d])=>{
      const f = {D:293.66,F:349.23,G:392,A:440,Bb:466.16,C:523.25,DH:587.33,E:329.63}[n]||293.66;
      this.note(f, t, d*beat*0.85, "triangle", 0.3);
      this.note(f/2, t, d*beat*0.9, "sine", 0.14);
      t += d*beat;
    });
  },
  start(){
    if(NK.data.audioData){ // فایلی ئەدمین
      let a = document.getElementById("nk-audio-el");
      if(!a){ a = document.createElement("audio"); a.id="nk-audio-el"; a.loop=true; document.body.appendChild(a); }
      a.src = NK.data.audioData;
      a.volume = document.getElementById("audio-volume").value/100;
      a.play().catch(()=>{});
      this.playing = true;
    } else {
      this.init();
      if(this.ctx.state==="suspended") this.ctx.resume();
      this.melody();
      this.playing = true;
    }
    document.getElementById("audio-toggle").textContent = "🎶";
  },
  stop(){
    clearInterval(this.timer); this.timer = null;
    const a = document.getElementById("nk-audio-el");
    if(a) a.pause();
    this.playing = false;
    document.getElementById("audio-toggle").textContent = "🎵";
  },
  toggle(){ this.playing ? this.stop() : this.start(); }
};

document.getElementById("audio-toggle").addEventListener("click", ()=> NK.Audio.toggle());
document.getElementById("audio-volume").addEventListener("input", e=>{
  const a = document.getElementById("nk-audio-el");
  if(a) a.volume = e.target.value/100;
  if(NK.Audio.gain) NK.Audio.gain.gain.value = e.target.value/100;
});
document.getElementById("audio-label").textContent = NK.data.audioName;

/* ---------- تەنۆلکەی لالە (background) ---------- */
(function tulips(){
  const field = document.getElementById("tulip-field");
  for(let i=0;i<8;i++){
    const img = document.createElement("img");
    img.src = "assets/tulip.svg";
    img.style.insetInlineStart = (Math.random()*92) + "%";
    img.style.animationDuration = (14 + Math.random()*16) + "s";
    img.style.animationDelay = (-Math.random()*20) + "s";
    img.style.width = (30 + Math.random()*34) + "px";
    field.appendChild(img);
  }
})();

/* ---------- پیشاندانی شیعر ---------- */
NK.currentPoet = 0;
NK.renderPoets = function(){
  const tabs = document.getElementById("poet-tabs");
  tabs.innerHTML = "";
  NK.data.poems.forEach((p,i)=>{
    const b = document.createElement("button");
    b.className = "poet-tab" + (i===NK.currentPoet?" active":"");
    b.textContent = p.poet;
    b.onclick = ()=>{ NK.currentPoet = i; NK.renderPoets(); };
    tabs.appendChild(b);
  });
  const poem = NK.data.poems[NK.currentPoet] || NK.data.poems[0];
  document.getElementById("poem-title").textContent = poem.poet + " — " + poem.title;
  document.getElementById("poem-text").textContent = poem.text;
};
NK.renderPoets();

document.getElementById("poem-read").addEventListener("click", ()=>{
  const poem = NK.data.poems[NK.currentPoet];
  if(!("speechSynthesis" in window)){ NK.toast("وێبگەڕەکەت پشتگیری خوێندنەوەی دەنگی ناکات"); return; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(poem.text);
  u.lang = "ku";
  const voice = speechSynthesis.getVoices().find(v=>v.lang && v.lang.startsWith("ku"));
  if(voice) u.voice = voice;
  speechSynthesis.speak(u);
});

/* ---------- پیشاندانی پەند ---------- */
NK.renderProverbs = function(){
  const grid = document.getElementById("proverbs-grid");
  grid.innerHTML = "";
  NK.data.proverbs.forEach((p)=>{
    const b = document.createElement("button");
    b.className = "proverb";
    b.innerHTML = `<div class="proverb-inner">
      <div class="proverb-face proverb-front"><span class="p-mark">❝</span><h4>${p.text}</h4></div>
      <div class="proverb-face proverb-back"><b>🧭 واتاکەی</b><span>${p.meaning}</span></div>
    </div>`;
    b.onclick = ()=> b.classList.toggle("flipped");
    grid.appendChild(b);
  });
};
NK.renderProverbs();

/* ---------- پیشاندانی خواردن و جلوبەرگ ---------- */
NK.renderCards = function(gridId, items){
  const grid = document.getElementById(gridId);
  grid.innerHTML = "";
  items.forEach(it=>{
    const card = document.createElement("article");
    card.className = "info-card";
    card.innerHTML = `<div class="card-img"><img src="${it.img}" alt="${it.name}" loading="lazy"></div>
      <div class="card-body"><h3>${it.name}</h3><span class="card-tag">${it.tag||it.region||""}</span><p>${it.desc}</p></div>`;
    grid.appendChild(card);
  });
};
NK.renderAllCards = function(){
  NK.renderCards("cuisine-grid", NK.data.cuisine);
  NK.renderCards("attire-grid", NK.data.attire);
};
NK.renderAllCards();

/* ---------- درەختی ئاوات ---------- */
NK.WISH_KEY = "nk_wishes_v1";
NK.getWishes = ()=>{ try{ return JSON.parse(localStorage.getItem(NK.WISH_KEY))||[]; }catch(e){ return []; } };
NK.saveWishes = w => localStorage.setItem(NK.WISH_KEY, JSON.stringify(w));
NK.wishColor = "#e63946";
NK.renderWishTree = function(){
  const wishes = NK.getWishes();
  const g = document.getElementById("wish-leaves");
  g.innerHTML = "";
  wishes.forEach((w,i)=>{
    const leaf = document.createElementNS("http://www.w3.org/2000/svg","circle");
    const angle = Math.random()*Math.PI*2, r = Math.random()*95;
    leaf.setAttribute("cx", 200 + Math.cos(angle)*r);
    leaf.setAttribute("cy", 120 + Math.sin(angle)*r*0.8);
    leaf.setAttribute("r", 6 + Math.random()*5);
    leaf.setAttribute("fill", w.color || "#e63946");
    leaf.style.opacity = .92;
    leaf.title = (w.name? w.name+": ":"") + w.msg;
    g.appendChild(leaf);
  });
  document.getElementById("wish-count").textContent = wishes.length ? wishes.length + " پەڕە لەسەر درەختە" : "درەختەکە چاوەڕێی یەکەم پەڕەیە!";
  const list = document.getElementById("wish-list");
  list.innerHTML = "";
  wishes.slice().reverse().forEach((w,idx)=>{
    const realIdx = wishes.length - 1 - idx;
    const div = document.createElement("div");
    div.className = "wish-item";
    div.style.borderInlineStartColor = w.color || "#e63946";
    div.innerHTML = `<span class="w-name">${w.name? "🌷 "+w.name : "🌷 میوانێک"}</span>
      <p class="w-msg">${w.msg}</p>
      <button class="w-del" data-idx="${realIdx}" title="سڕینەوە">✕</button>`;
    list.appendChild(div);
  });
  list.querySelectorAll(".w-del").forEach(b=>{
    b.classList.toggle("show", NK.adminOpen === true);
    b.onclick = ()=>{
      const arr = NK.getWishes(); arr.splice(+b.dataset.idx,1);
      NK.saveWishes(arr); NK.renderWishTree(); NK.toast("پەڕەکە سڕایەوە");
    };
  });
};
const wc = document.getElementById("wish-colors");
["#e63946","#f4a261","#e9c46a","#2a9d8f","#9d4edd","#ff70a6"].forEach((c,i)=>{
  const s = document.createElement("span");
  s.className = "swatch" + (i===0?" active":"");
  s.style.background = c;
  s.onclick = ()=>{ wc.querySelectorAll(".swatch").forEach(x=>x.classList.remove("active")); s.classList.add("active"); NK.wishColor = c; };
  wc.appendChild(s);
});
document.getElementById("wish-form").addEventListener("submit", e=>{
  e.preventDefault();
  const msg = document.getElementById("wish-msg").value.trim();
  if(!msg) return;
  const arr = NK.getWishes();
  arr.push({name: document.getElementById("wish-name").value.trim(), msg, color: NK.wishColor, t: Date.now()});
  NK.saveWishes(arr);
  document.getElementById("wish-msg").value = "";
  NK.renderWishTree();
  NK.toast("🍃 ئاواتەکەت لەسەر درەخت هەڵبەزایەوە!");
});
NK.renderWishTree();

/* ---------- لیستی نەڤار ---------- */
document.getElementById("nav-burger").addEventListener("click", ()=>{
  document.getElementById("nav-links").classList.toggle("open");
});
document.querySelectorAll("#nav-links a").forEach(a=>{
  a.addEventListener("click", ()=> document.getElementById("nav-links").classList.remove("open"));
});
