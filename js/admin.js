/* =========================================================
   نەورۆزی کوردستان — admin.js
   پانێڵی بەڕێوەبردن (CRUD بۆ هەموو بەشەکان)
========================================================= */

/////const Admin = {
  authed: false,
  open(){
    document.getElementById("admin-modal").hidden = false;
    if(this.authed){ this.showPanel(); }
    else {
      document.getElementById("admin-login").hidden = false;
      document.getElementById("admin-panel").hidden = true;
      document.getElementById("admin-error").hidden = true;
      document.getElementById("admin-pass").value = "";
    }
  },
  close(){ document.getElementById("admin-modal").hidden = true; },
  login(){
    const v = document.getElementById("admin-pass").value;
    if(v === NK.data.password){
      this.authed = true;
      NK.adminOpen = true;
      this.showPanel();
      NK.renderWishTree();
      NK.toast("✅ بەخێربێیتەوە، ئەدمین!");
    } else {
      document.getElementById("admin-error").hidden = false;
    }
  },
  logout(){
    this.authed = false; NK.adminOpen = false;
    NK.renderWishTree();
    this.close();
  },
  showPanel(){
    document.getElementById("admin-login").hidden = true;
    document.getElementById("admin-panel").hidden = false;
    this.renderTab("poems");
  },
  /* ---------- ڕەندەرکردنی تابەکان ---------- */
  renderTab(name){
    document.querySelectorAll(".admin-tab").forEach(t=>t.classList.toggle("active", t.dataset.atab===name));
    const body = document.getElementById("admin-body");
    body.innerHTML = "";
    const tabs = {poems:this.tabPoems, proverbs:this.tabProverbs, cuisine:this.tabCuisine,
                  attire:this.tabAttire, quiz:this.tabQuiz, wishes:this.tabWishes, settings:this.tabSettings};
    tabs[name].call(this, body);
  },
  itemRow(body, title, sub, onEdit, onDel){
    const row = document.createElement("div");
    row.className = "admin-item";
    row.innerHTML = `<div class="ai-info"><b>${title}</b><small>${sub||""}</small></div>
      <div class="ai-actions">
        <button class="btn btn-small">✏️ دەستکاری</button>
        <button class="btn btn-small btn-danger">🗑️</button>
      </div>`;
    row.children[1].children[0].onclick = onEdit;
    row.children[1].children[1].onclick = onDel;
    body.appendChild(row);
  },
  form(body, fields, values, onSave, saveLabel){
    const f = document.createElement("div");
    f.className = "admin-form";
    const inputs = {};
    fields.forEach(fd=>{
      if(fd.type==="textarea"){
        const t = document.createElement("textarea");
        t.rows = 4; t.placeholder = fd.label;
        t.value = values[fd.key]||"";
        f.appendChild(t); inputs[fd.key]=t;
      } else if(fd.type==="select"){
        const s = document.createElement("select");
        fd.options.forEach(o=>{
          const op = document.createElement("option");
          op.value = o.v; op.textContent = o.t;
          if(values[fd.key]===o.v) op.selected = true;
          s.appendChild(op);
        });
        f.appendChild(s); inputs[fd.key]=s;
      } else if(fd.type==="image"){
        const drop = document.createElement("div");
        drop.className = "file-drop";
        drop.innerHTML = "🖼️ وێنە هەڵبژێرە (SVG/PNG/JPG) — ئەگەر هیچ نەهەڵبژێریت، وێنەی ئێستا دەمێنێتەوە";
        const inp = document.createElement("input");
        inp.type = "file"; inp.accept = "image/*";
        drop.appendChild(inp); f.appendChild(drop);
        const hidden = document.createElement("input");
        hidden.type = "hidden"; hidden.value = values[fd.key]||"";
        f.appendChild(hidden); inputs[fd.key]=hidden; inputs[__img_fd]=inp;
      } else {
        const i = document.createElement("input");
        i.type = fd.type||"text"; i.placeholder = fd.label;
        i.value = values[fd.key]||"";
        f.appendChild(i); inputs[fd.key]=i;
      }
    });
    const save = document.createElement("button");
    save.className = "btn btn-gold"; save.textContent = saveLabel || "💾 پاشەکەوتکردن";
    save.onclick = ()=>{
      if(onSave) onSave(inputs);
    };
    f.appendChild(save);
    body.appendChild(f);
    return inputs;
  },

  /* ---------- شیعر ---------- */
  tabPoems(body){
    const head = document.createElement("div");
    head.className = "admin-toolbar";
    head.innerHTML = `<button class="btn btn-small" id="ap-add">➕ شیعری نوێ</button>`;
    body.appendChild(head);
    NK.data.poems.forEach((p,i)=>{
      this.itemRow(body, p.poet+" — "+p.title, p.text.slice(0,60)+"…",
        ()=>{ body.innerHTML=""; this.editPoem(body,i); },
        ()=>{ if(confirm("دڵنیایت لە سڕینەوەی ئەم شیعرە؟")){ NK.data.poems.splice(i,1); NK.saveData(); NK.renderPoets(); this.renderTab("poems"); }});
    });
    head.querySelector("#ap-add").onclick = ()=>{ body.innerHTML=""; this.editPoem(body,-1); };
  },
  editPoem(body,i){
    const vals = i>=0 ? NK.data.poems[i] : {poet:"",title:"",text:""};
    this.form(body,
      [{key:"poet",label:"ناوی شاعیر"},{key:"title",label:"ناونیشانی شیعر"},{key:"text",label:"دەقی شیعر (هەر دێرێک لە هێڵێکدا)",type:"textarea"}],
      vals,
      (inp)=>{
        const obj = {poet:inp.poet.value.trim(), title:inp.title.value.trim(), text:inp.text.value.trim()};
        if(!obj.poet || !obj.text){ NK.toast("⚠️ تکایە ناوی شاعیر و دەق پڕبکەرەوە"); return; }
        if(i>=0) NK.data.poems[i]=obj; else NK.data.poems.push(obj);
        NK.saveData(); NK.renderPoets(); this.renderTab("poems");
        NK.toast("✅ شیعر پاشەکەوتکرا");
      });
  },

  /* ---------- پەند ---------- */
  tabProverbs(body){
    const head = document.createElement("div");
    head.className = "admin-toolbar";
    head.innerHTML = `<button class="btn btn-small" id="ap-add">➕ پەندی نوێ</button>`;
    body.appendChild(head);
    NK.data.proverbs.forEach((p,i)=>{
      this.itemRow(body, p.text, p.meaning,
        ()=>{ body.innerHTML=""; this.editProverb(body,i); },
        ()=>{ if(confirm("سڕینەوەی پەندەکە؟")){ NK.data.proverbs.splice(i,1); NK.saveData(); NK.renderProverbs(); this.renderTab("proverbs"); }});
    });
    head.querySelector("#ap-add").onclick = ()=>{ body.innerHTML=""; this.editProverb(body,-1); };
  },
  editProverb(body,i){
    const vals = i>=0 ? NK.data.proverbs[i] : {text:"",meaning:""};
    this.form(body,
      [{key:"text",label:"پەندەکە"},{key:"meaning",label:"واتاکەی",type:"textarea"}],
      vals,
      (inp)=>{
        const obj = {text:inp.text.value.trim(), meaning:inp.meaning.value.trim()};
        if(!obj.text){ NK.toast("⚠️ پەندەکە بنووسە"); return; }
        if(i>=0) NK.data.proverbs[i]=obj; else NK.data.proverbs.push(obj);
        NK.saveData(); NK.renderProverbs(); this.renderTab("proverbs");
        NK.toast("✅ پەند پاشەکەوتکرا");
      });
  },

  /* ---------- خواردن & جلوبەرگ ---------- */
  tabCuisine(body){ this.tabItems(body, "cuisine", "خواردن", NK.data.cuisine, [{key:"name",label:"ناوی خواردن"},{key:"tag",label:"تاگ (بۆ نموونە: ژیاننامە)"},{key:"desc",label:"باسکردن / مێژوو",type:"textarea"},{key:"img",label:"وێنە",type:"image"}]); },
  tabAttire(body){ this.tabItems(body, "attire", "جلوبەرگ", NK.data.attire, [{key:"name",label:"ناوی جلوبەرگ"},{key:"region",label:"ناوچەکەی"},{key:"desc",label:"باسکردن / مێژوو",type:"textarea"},{key:"img",label:"وێنە",type:"image"}]); },
  tabItems(body, key, label, arr, fields){
    const head = document.createElement("div");
    head.className = "admin-toolbar";
    head.innerHTML = `<button class="btn btn-small" id="ap-add">➕ ${label}ی نوێ</button>`;
    body.appendChild(head);
    arr.forEach((it,i)=>{
      this.itemRow(body, it.name, (it.tag||it.region||"")+" — "+it.desc.slice(0,50)+"…",
        ()=>{ body.innerHTML=""; this.editItem(body,key,arr,fields,i); },
        ()=>{ if(confirm("سڕینەوەی ئەم بابەتە؟")){ arr.splice(i,1); NK.saveData(); NK.renderAllCards(); this.renderTab(key); }});
    });
    head.querySelector("#ap-add").onclick = ()=>{ body.innerHTML=""; this.editItem(body,key,arr,fields,-1); };
  },
  editItem(body,key,arr,fields,i){
    const vals = i>=0 ? arr[i] : {};
    const inputs = this.form(body, fields, vals,
      (inp)=>{
        const obj = {};
        for(const k in inp){
          if(k===__img_fd) continue;
          obj[k] = inp[k].value.trim();
        }
        if(!obj.name){ NK.toast("⚠️ ناو پڕبکەرەوە"); return; }
        if(!obj.img) obj.img = (i>=0 && arr[i].img) ? arr[i].img : "assets/logo.svg";
        if(i>=0) arr[i]=obj; else arr.push(obj);
        NK.saveData(); NK.renderAllCards(); this.renderTab(key);
        NK.toast("✅ پاشەکەوتکرا");
      });
    // upload handler
    const fileInp = inputs[__img_fd];
    fileInp.onchange = ()=>{
      const file = fileInp.files[0];
      if(!file) return;
      if(file.size > 2.5*1024*1024){ NK.toast("⚠️ وێنەکە گەورەیە (زۆرترین 2.5MB)"); return; }
      const rd = new FileReader();
      rd.onload = ()=>{
        for(const k in inputs){ if(k!==__img_fd && inputs[k].type==="hidden"){ inputs[k].value = rd.result; } }
        NK.toast("🖼️ وێنەکە ئامادەیە — کلیک لە پاشەکەوتکردن بکە");
      };
      rd.readAsDataURL(file);
    };
  },

  /* ---------- پرسیارەکان ---------- */
  tabQuiz(body){
    const head = document.createElement("div");
    head.className = "admin-toolbar";
    head.innerHTML = `<button class="btn btn-small" id="ap-add">➕ پرسیاری نوێ</button>`;
    body.appendChild(head);
    NK.data.quiz.forEach((q,i)=>{
      this.itemRow(body, q.q, `وەڵامی دروست: ${q.opts[q.a]}`,
        ()=>{ body.innerHTML=""; this.editQuiz(body,i); },
        ()=>{ if(confirm("سڕینەوەی پرسیارەکە؟")){ NK.data.quiz.splice(i,1); NK.saveData(); this.renderTab("quiz"); }});
    });
    head.querySelector("#ap-add").onclick = ()=>{ body.innerHTML=""; this.editQuiz(body,-1); };
  },
  editQuiz(body,i){
    const vals = i>=0 ? NK.data.quiz[i] : {q:"",opts:["","","",""],a:0};
    const inputs = this.form(body,
      [{key:"q",label:"پرسیار"},
       {key:"o0",label:"وەڵامی ١"},{key:"o1",label:"وەڵامی ٢"},
       {key:"o2",label:"وەڵامی ٣"},{key:"o3",label:"وەڵامی ٤"},
       {key:"a",label:"ژمارەی وەڵامی دروست (٠-٣)",type:"number"}],
      {q:vals.q, o0:vals.opts[0], o1:vals.opts[1], o2:vals.opts[2], o3:vals.opts[3], a:vals.a},
      (inp)=>{
        const a = parseInt(inp.a.value);
        if(!inp.q.value.trim() || inp.optsSomeEmpty){ NK.toast("⚠️ هەموو خانەکان پڕبکەرەوە"); return; }
        if(isNaN(a) || a<0 || a>3){ NK.toast("⚠️ ژمارەی وەڵامی دروست دەبێت ٠-٣ بێت"); return; }
        const obj = {q: inp.q.value.trim(), opts:[inp.o0.value.trim(),inp.o1.value.trim(),inp.o2.value.trim(),inp.o3.value.trim()], a};
        if(obj.opts.some(o=>!o)){ NK.toast("⚠️ هەموو وەڵامەکان پڕبکەرەوە"); return; }
        if(i>=0) NK.data.quiz[i]=obj; else NK.data.quiz.push(obj);
        NK.saveData(); this.renderTab("quiz");
        NK.toast("✅ پرسیار پاشەکەوتکرا");
      });
  },

  /* ---------- ئاواتەکان ---------- */
  tabWishes(body){
    const wishes = NK.getWishes();
    if(!wishes.length){ body.innerHTML = "<p style='text-align:center;color:#7a8a7d'>هێشتا هیچ ئاواتێک نییە.</p>"; return; }
    wishes.slice().reverse().forEach((w)=>{
      const real = wishes.indexOf(w);
      this.itemRow(body, (w.name||"میوان")+": "+w.msg, new Date(w.t).toLocaleString("ckb"),
        null,
        ()=>{ if(confirm("سڕینەوەی ئەم ئاواتە؟")){ wishes.splice(real,1); NK.saveWishes(wishes); NK.renderWishTree(); this.renderTab("wishes"); }});
    });
  },

  /* ---------- ڕێکخستن ---------- */
  tabSettings(body){
    const wrap = document.createElement("div");
    wrap.innerHTML = `
      <div class="admin-form">
        <h4 style="color:var(--green)">🔑 گۆڕینی وشەی نهێنی</h4>
        <input type="password" id="as-newpass" placeholder="وشەی نهێنی نوێ">
        <button class="btn btn-gold" id="as-pass-btn">💾 گۆڕینی وشەی نهێنی</button>
      </div>
      <div class="admin-form">
        <h4 style="color:var(--green)">🎵 مۆسیقا</h4>
        <p style="font-size:.9rem;color:#5b7263">دەتوانیت فایلی دەنگی خۆت (ئەی ڕەقیب یان مۆسیقای تر) بار بکەیت. ئەگەر فایل دانێیت، ئەوە لێدەدات؛ ئەگیر نا، مۆسیقای ئامادەی سایت لێدەدات.</p>
        <input type="text" id="as-audio-name" placeholder="ناوی مۆسیقا" value="${NK.data.audioName}">
        <div class="file-drop">🎵 فایلی دەنگ (MP3/OGG — زۆرترین 3MB)<input type="file" id="as-audio-file" accept="audio/*"></div>
        <button class="btn btn-gold" id="as-audio-btn">💾 پاشەکەوتکردنی مۆسیقا</button>
        <button class="btn btn-small btn-danger" id="as-audio-clear">🗑️ لابردنی فایلی بارکراو (گەڕانەوە بۆ مۆسیقای ئامادە)</button>
      </div>
      <div class="admin-form">
        <h4 style="color:var(--green)">📦 هاوردە / هاوردا کردنی داتا</h4>
        <div class="form-row">
          <button class="btn btn-small" id="as-export">📥 داگرتنی داتا (JSON)</button>
          <button class="btn btn-small btn-danger" id="as-reset">♻️ گەڕانەوە بۆ بنەڕەت</button>
        </div>
      </div>
      <div class="admin-form">
        <button class="btn btn-small btn-danger" id="as-logout">🚪 چوونەدەرەوە لە پانێڵ</button>
      </div>`;
    body.appendChild(wrap);
    wrap.querySelector("#as-pass-btn").onclick = ()=>{
      const v = wrap.querySelector("#as-newpass").value.trim();
      if(v.length < 4){ NK.toast("⚠️ وشەی نهێنی دەبێت لانیکەم ٤ پیت بێت"); return; }
      NK.data.password = v; NK.saveData();
      wrap.querySelector("#as-newpass").value = "";
      NK.toast("🔑 وشەی نهێنی گۆڕدرا");
    };
    let audioB64 = NK.data.audioData;
    wrap.querySelector("#as-audio-file").onchange = e=>{
      const f = e.target.files[0];
      if(!f) return;
      if(f.size > 3*1024*1024){ NK.toast("⚠️ فایلەکە گەورەیە (زۆرترین 3MB)"); return; }
      const rd = new FileReader();
      rd.onload = ()=>{ audioB64 = rd.result; NK.toast("🎵 فایلەکە ئامادەیە — کلیک لە پاشەکەوتکردن بکە"); };
      rd.readAsDataURL(f);
    };
    wrap.querySelector("#as-audio-btn").onclick = ()=>{
      NK.data.audioName = wrap.querySelector("#as-audio-name").value.trim() || NK.data.audioName;
      NK.data.audioData = audioB64;
      NK.saveData();
      document.getElementById("audio-label").textContent = NK.data.audioName;
      if(NK.Audio.playing){ NK.Audio.stop(); NK.Audio.start(); }
      NK.toast("🎵 مۆسیقا پاشەکەوتکرا");
    };
    wrap.querySelector("#as-audio-clear").onclick = ()=>{
      NK.data.audioData = null; NK.saveData();
      NK.toast("🎵 فایلەکە لابرا — مۆسیقای ئامادە بەکارهێنرا");
    };
    wrap.querySelector("#as-export").onclick = ()=>{
      const blob = new Blob([JSON.stringify(NK.data,null,2)],{type:"application/json"});
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "nowruz-data.json";
      a.click();
    };
    wrap.querySelector("#as-reset").onclick = ()=>{
      if(confirm("دڵنیایت؟ هەموو دەستکارییەکان دەگەڕێنەوە بۆ بنەڕەت!")){
        localStorage.removeItem("nk_data_v1");
        NK.data = NK.loadData();
        NK.renderPoets(); NK.renderProverbs(); NK.renderAllCards();
        document.getElementById("audio-label").textContent = NK.data.audioName;
        this.renderTab("settings");
        NK.toast("♻️ گەڕاینەوە بۆ بنەڕەت");
      }
    };
    wrap.querySelector("#as-logout").onclick = ()=> this.logout();
  }
};

/* ---------- ڕێکخستنی ئێڤێنت ---------- */
const __img_fd = "__file";
document.getElementById("nav-admin-btn").onclick = ()=> Admin.open();
document.getElementById("admin-close").onclick = ()=> Admin.close();
document.getElementById("admin-modal").addEventListener("click", e=>{
  if(e.target.id === "admin-modal") Admin.close();
});
document.getElementById("admin-login-btn").onclick = ()=> Admin.login();
document.getElementById("admin-pass").addEventListener("keydown", e=>{
  if(e.key === "Enter") Admin.login();
});
document.querySelectorAll(".admin-tab").forEach(t=>{
  t.onclick = ()=> Admin.renderTab(t.dataset.atab);
});
