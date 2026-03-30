"use strict";

// ─── COMMUNITY CATALOGUE ───────────────────────────────────────────────────────

const COMMUNITIES = [
  // FAITH & SPIRITUAL ──────────────────────────────────────────────────────────
  { id:"tefillin",       emoji:"📿", title:"Daily Tefillin",       cat:"religious", catLabel:"Faith & Spiritual",
    desc:"Wrap tefillin every morning and connect to something greater. Share your moment and keep the mitzvah alive daily.",
    photo:true,  members:2847, tip:"Even 5 minutes counts. Show up.",
    simMembers:[{n:"Yosef_M",s:94},{n:"DavidLev",s:61},{n:"AriehK",s:47},{n:"ShlomoBen",s:33},{n:"NachumR",s:21},{n:"EliasW",s:14}] },
  { id:"salah",          emoji:"🕌", title:"5 Daily Salah",         cat:"religious", catLabel:"Faith & Spiritual",
    desc:"Observe all five daily prayers. Log each day you complete your Salah and build consistency in your deen.",
    photo:false, members:5134, tip:"Fajr first — the hardest and the most rewarding.",
    simMembers:[{n:"OmarF",s:112},{n:"AhmedY",s:88},{n:"FatimaN",s:74},{n:"KhalidA",s:59},{n:"ZainabH",s:42},{n:"YusufR",s:30}] },
  { id:"morning_prayer", emoji:"✝️", title:"Morning Prayer",        cat:"religious", catLabel:"Faith & Spiritual",
    desc:"Start each day with devotional prayer. Whether a short scripture reading or quiet worship, begin with intention.",
    photo:true,  members:3921, tip:"Even one minute of stillness before the day starts matters.",
    simMembers:[{n:"GraceH",s:78},{n:"JoshuaP",s:63},{n:"MaryK",s:51},{n:"ElijahT",s:38},{n:"RuthAnn",s:25},{n:"PeterL",s:17}] },
  { id:"quran",          emoji:"📖", title:"Daily Quran",           cat:"religious", catLabel:"Faith & Spiritual",
    desc:"Read at least one page of the Quran every day. Track your consistency and inspire others with your commitment.",
    photo:true,  members:4208, tip:"After Fajr is the most blessed time to read.",
    simMembers:[{n:"LaylaM",s:101},{n:"IbrahimS",s:77},{n:"SaraF",s:56},{n:"HassanQ",s:40},{n:"NourA",s:28},{n:"AdamK",s:19}] },
  { id:"torah_study",    emoji:"📜", title:"Daily Torah Study",     cat:"religious", catLabel:"Faith & Spiritual",
    desc:"Daf Yomi, Parsha, or Mishna — whatever your learning, commit to it daily. Share your page and grow together.",
    photo:true,  members:1893, tip:"A little Torah every day builds mountains over time.",
    simMembers:[{n:"RabbiDK",s:365},{n:"BaruchE",s:120},{n:"MiriamL",s:84},{n:"PinchasG",s:60},{n:"TaliaS",s:37},{n:"EzraM",s:22}] },
  { id:"morning_puja",   emoji:"🪔", title:"Morning Puja",          cat:"religious", catLabel:"Faith & Spiritual",
    desc:"Light the diya, offer flowers, and begin the day with ritual worship. Share your altar and feel the collective energy.",
    photo:true,  members:3102, tip:"Keep your space clean and your intention clear.",
    simMembers:[{n:"PriyaV",s:88},{n:"RameshK",s:72},{n:"AnuD",s:55},{n:"SunilR",s:41},{n:"MeeraP",s:29},{n:"VijayN",s:16}] },
  { id:"buddhist_sit",   emoji:"☸️", title:"Buddhist Meditation",   cat:"religious", catLabel:"Faith & Spiritual",
    desc:"Daily sitting practice — mindfulness, loving-kindness, or vipassana. Sit. Breathe. Return. Every day counts.",
    photo:true,  members:2644, tip:"The mind is like water. Sit still and let it clear.",
    simMembers:[{n:"KenZ",s:200},{n:"LingW",s:143},{n:"TaraB",s:99},{n:"SonamD",s:67},{n:"AnandaJ",s:45},{n:"MayaR",s:31}] },
  { id:"shabbat",        emoji:"🕯️", title:"Shabbat Candles",       cat:"religious", catLabel:"Faith & Spiritual",
    desc:"Light Shabbat candles every Friday before sundown. A weekly ritual of peace and presence.",
    photo:true,  members:1674, tip:"Even when life is hectic, Shabbat lights the way.",
    simMembers:[{n:"RachelB",s:52},{n:"SarahG",s:45},{n:"LeahF",s:38},{n:"RivkaM",s:30},{n:"DeborahL",s:22},{n:"NaomiK",s:14}] },
  { id:"yoga_prana",     emoji:"🕉️", title:"Yoga & Pranayama",      cat:"religious", catLabel:"Faith & Spiritual",
    desc:"Daily yoga asanas and breathwork rooted in ancient tradition. Unite body, mind, and spirit every morning.",
    photo:true,  members:4455, tip:"The body is a temple. Honour it daily.",
    simMembers:[{n:"DeveshY",s:180},{n:"KalyaniP",s:130},{n:"ShivaS",s:95},{n:"GeetaR",s:72},{n:"ArjunM",s:50},{n:"IndiraK",s:35}] },
  { id:"ramadan",        emoji:"☪️", title:"Ramadan Fasting",        cat:"religious", catLabel:"Faith & Spiritual",
    desc:"Fast from Fajr to Maghrib and check in each day. Share your iftar, your struggle, and your strength.",
    photo:true,  members:6711, tip:"Feed others if you can. It multiplies your reward.",
    simMembers:[{n:"MohammedA",s:30},{n:"AishaB",s:30},{n:"HamzaC",s:28},{n:"SumayaD",s:27},{n:"TahaE",s:25},{n:"KhadijaN",s:23}] },

  // MINDFULNESS ────────────────────────────────────────────────────────────────
  { id:"meditation",     emoji:"🧘", title:"Daily Meditation",      cat:"mindfulness", catLabel:"Mindfulness",
    desc:"Even 5 minutes of stillness changes the day. Log your sit, share your experience, and build a calmer mind together.",
    photo:true,  members:8923, tip:"You don't need to empty your mind — just observe it.",
    simMembers:[{n:"ZenMasterL",s:401},{n:"CalmCoreJ",s:210},{n:"MindfulR",s:155},{n:"StillA",s:98},{n:"QuietK",s:67},{n:"BreathT",s:44}] },
  { id:"breathwork",     emoji:"🌬️", title:"Breathwork",            cat:"mindfulness", catLabel:"Mindfulness",
    desc:"Box breathing, Wim Hof, 4-7-8 — pick your method. A daily breathwork practice unlocks focus, calm and energy.",
    photo:false, members:3677, tip:"Slow exhale = calm. Fast inhale = energy. You control both.",
    simMembers:[{n:"WimFan",s:88},{n:"BoxBreath",s:66},{n:"OxygenM",s:52},{n:"PranaS",s:39},{n:"DeepAir",s:27},{n:"ClearLung",s:18}] },
  { id:"gratitude",      emoji:"🌿", title:"Gratitude Journal",     cat:"mindfulness", catLabel:"Mindfulness",
    desc:"Write down 3 things you're grateful for every day. Small practice, massive shift in perspective over time.",
    photo:true,  members:6102, tip:"Be specific — 'my coffee this morning' beats 'my health'.",
    simMembers:[{n:"ThankfulT",s:190},{n:"GraceNote",s:145},{n:"BlissM",s:103},{n:"JoyfulP",s:77},{n:"HappyS",s:54},{n:"ContentK",s:33}] },
  { id:"journaling",     emoji:"📔", title:"Daily Journaling",      cat:"mindfulness", catLabel:"Mindfulness",
    desc:"Stream of consciousness, goals, reflections — just write. Journaling builds clarity, creativity and self-knowledge.",
    photo:true,  members:5234, tip:"Don't edit yourself. Write freely and honestly.",
    simMembers:[{n:"InkSoul",s:222},{n:"PageTurn",s:167},{n:"WriterR",s:118},{n:"PenMind",s:84},{n:"DailyInk",s:56},{n:"OpenPage",s:31}] },
  { id:"no_phone_am",    emoji:"📵", title:"Phone-Free Morning",    cat:"mindfulness", catLabel:"Mindfulness",
    desc:"No phone for the first hour after waking. Your morning belongs to you. Protect it fiercely.",
    photo:false, members:4812, tip:"Leave your phone in another room when you sleep.",
    simMembers:[{n:"OfflineO",s:90},{n:"AnalogLife",s:74},{n:"MorningQ",s:58},{n:"FocusFirst",s:42},{n:"SilentStart",s:27},{n:"PresentP",s:16}] },

  // HEALTH ─────────────────────────────────────────────────────────────────────
  { id:"cold_shower",    emoji:"🚿", title:"Cold Shower Challenge", cat:"health", catLabel:"Health",
    desc:"End every shower cold. Boost alertness, immunity and mental resilience. It never gets easier — you just get stronger.",
    photo:false, members:7441, tip:"Start with 30 seconds. Add 10 seconds each week.",
    simMembers:[{n:"IceManK",s:365},{n:"FrozenFit",s:201},{n:"ColdBrave",s:148},{n:"ShockTher",s:99},{n:"ChillWill",s:63},{n:"ArcticA",s:38}] },
  { id:"exercise",       emoji:"💪", title:"Daily Exercise",        cat:"health", catLabel:"Health",
    desc:"Move your body every single day. Gym, run, walk, yoga — anything counts. Post your proof and power each other on.",
    photo:true,  members:11203, tip:"The hardest part is always starting. Then it flows.",
    simMembers:[{n:"GrindGuru",s:500},{n:"IronWill",s:310},{n:"SweatGrow",s:220},{n:"FitForever",s:162},{n:"MuscleMind",s:105},{n:"DailyGain",s:74}] },
  { id:"steps",          emoji:"🚶", title:"10,000 Steps",          cat:"health", catLabel:"Health",
    desc:"Walk 10,000 steps every day. Simple, powerful, life-changing. Log your count and compete on the leaderboard.",
    photo:false, members:9334, tip:"Take calls walking. Park further away. Stairs always.",
    simMembers:[{n:"WalkWonder",s:280},{n:"StepByStep",s:194},{n:"PathFinder",s:143},{n:"TenKTrek",s:97},{n:"PaceSetter",s:65},{n:"MileMark",s:44}] },
  { id:"hydration",      emoji:"💧", title:"Hydration Challenge",   cat:"health", catLabel:"Health",
    desc:"Drink at least 8 glasses of water every day. Your skin, brain and energy will thank you.",
    photo:false, members:6788, tip:"Drink a full glass immediately after waking up.",
    simMembers:[{n:"H2OHero",s:130},{n:"WaterFirst",s:98},{n:"HydratedH",s:75},{n:"FlowState",s:54},{n:"ClearWater",s:37},{n:"AquaA",s:22}] },
  { id:"breakfast",      emoji:"🥗", title:"Healthy Breakfast",     cat:"health", catLabel:"Health",
    desc:"Start the day with a nutritious meal. Share your plate and inspire each other to fuel up right.",
    photo:true,  members:5567, tip:"Prep overnight — remove every excuse not to eat well.",
    simMembers:[{n:"MealPrepK",s:177},{n:"GoodStart",s:133},{n:"ProteinAM",s:98},{n:"NourishNow",s:72},{n:"CleanEat",s:49},{n:"FuelFirst",s:28}] },
  { id:"sleep",          emoji:"😴", title:"10PM Bedtime",          cat:"health", catLabel:"Health",
    desc:"In bed by 10pm. Quality sleep is the foundation of everything. Protect your rest and track your consistency.",
    photo:false, members:3891, tip:"Dim lights 1 hour before bed. Your brain follows the cue.",
    simMembers:[{n:"SleepFirst",s:88},{n:"RestWell",s:67},{n:"NightOff",s:51},{n:"EarlyBird",s:38},{n:"DreamDeep",s:24},{n:"BedBy10",s:15}] },

  // LIFESTYLE ──────────────────────────────────────────────────────────────────
  { id:"reading",        emoji:"📚", title:"30 Min Daily Reading",  cat:"lifestyle", catLabel:"Lifestyle",
    desc:"Read for 30 minutes every day. Fiction, non-fiction, biographies — just read. Share what you're learning.",
    photo:true,  members:7122, tip:"Same time every day wires it into your routine permanently.",
    simMembers:[{n:"Bookworm",s:310},{n:"PageADay",s:244},{n:"Readers",s:178},{n:"KindleK",s:120},{n:"ChapterA",s:83},{n:"Library",s:51}] },
  { id:"kindness",       emoji:"❤️", title:"Daily Acts of Kindness",cat:"lifestyle", catLabel:"Lifestyle",
    desc:"Do one intentional act of kindness every day. It doesn't have to be big. Log it and watch it ripple outward.",
    photo:true,  members:4433, tip:"The smallest acts often have the biggest impact.",
    simMembers:[{n:"KindSoul",s:201},{n:"GiveBack",s:155},{n:"WarmHeart",s:112},{n:"RandomAct",s:78},{n:"GoodVibes",s:52},{n:"ServeFirst",s:34}] },
  { id:"detox",          emoji:"🌅", title:"Digital Detox Hour",    cat:"lifestyle", catLabel:"Lifestyle",
    desc:"Spend at least one hour screen-free every day. Reclaim your attention and rediscover what being present feels like.",
    photo:false, members:3244, tip:"Replace it with something physical — a walk, a stretch, a chat.",
    simMembers:[{n:"OfflineO",s:95},{n:"UnplugU",s:72},{n:"PresenceP",s:56},{n:"ScreenFree",s:41},{n:"NatureF",s:27},{n:"AnalogA",s:18}] },
  { id:"creative",       emoji:"🎨", title:"Daily Creative Practice",cat:"lifestyle", catLabel:"Lifestyle",
    desc:"Draw, paint, write poetry, play music — create something every day. Share your work and build your creative muscle.",
    photo:true,  members:5891, tip:"Don't judge it. Just make it. Consistency beats perfection.",
    simMembers:[{n:"ArtEvery",s:244},{n:"Sketch",s:188},{n:"MusicMake",s:135},{n:"CreateD",s:99},{n:"Inspired",s:66},{n:"MakerM",s:40}] },
  { id:"outdoors",       emoji:"🌊", title:"Daily Outdoor Time",    cat:"lifestyle", catLabel:"Lifestyle",
    desc:"Spend meaningful time outside every day. Sun, wind, nature — your nervous system needs it. Show us where you went.",
    photo:true,  members:6334, tip:"Even 10 minutes barefoot on grass resets your stress response.",
    simMembers:[{n:"OutdoorO",s:180},{n:"NatureN",s:143},{n:"Sunshine",s:108},{n:"WildWalk",s:79},{n:"FreshAir",s:55},{n:"Trailblazer",s:33}] },
];

// ─── STATE ─────────────────────────────────────────────────────────────────────

let _tab         = "explore";
let _filter      = "all";
let _activeCid   = null;
let _photoData   = null;

// ─── STORAGE ───────────────────────────────────────────────────────────────────

const u = () => (sessionStorage.getItem("fs_current") || "").toLowerCase();
const key = (...parts) => "fs_" + [u(), ...parts].filter(Boolean).join("_");
const commKey = (...parts) => "fs_comm_" + parts.join("_");

function getJoined() { return JSON.parse(localStorage.getItem(key("joined_comms")) || "[]"); }
function setJoined(a) { localStorage.setItem(key("joined_comms"), JSON.stringify(a)); }

function getData(cid) {
  const raw = localStorage.getItem(key("cdata", cid));
  return raw ? JSON.parse(raw) : { streak:0, best:0, total:0, lastIn:null, checkIns:[] };
}
function setData(cid, d) { localStorage.setItem(key("cdata", cid), JSON.stringify(d)); }

function getFeed(cid) { return JSON.parse(localStorage.getItem(commKey("feed", cid)) || "[]"); }
function setFeed(cid, f) { localStorage.setItem(commKey("feed", cid), JSON.stringify(f)); }

// ─── DATE UTILS ────────────────────────────────────────────────────────────────

function today() { return new Date().toISOString().slice(0,10); }

function weekDays() {
  const t = new Date(today());
  const dow = t.getDay(); // 0=Sun
  const mon = new Date(t);
  mon.setDate(t.getDate() - ((dow + 6) % 7));
  return Array.from({length:7}, (_,i) => {
    const d = new Date(mon); d.setDate(mon.getDate() + i);
    return d.toISOString().slice(0,10);
  });
}

function isConsecutive(last) {
  if (!last) return false;
  const diff = (new Date(today()) - new Date(last)) / 86400000;
  return Math.floor(diff) === 1;
}

function fmtDate(iso) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { weekday:"long", day:"numeric", month:"long" });
}

// ─── HERO STATS ────────────────────────────────────────────────────────────────

function refreshHero() {
  const j = getJoined();
  document.getElementById("heroJoined").textContent = j.length;
  let best = 0, total = 0;
  j.forEach(cid => { const d = getData(cid); if (d.best > best) best = d.best; total += d.total; });
  document.getElementById("heroStreak").textContent = best;
  document.getElementById("heroCheckins").textContent = total;
}

// ─── TAB SWITCHING ─────────────────────────────────────────────────────────────

window.commTab = function(tab) {
  _tab = tab;
  ["explore","mine","detail"].forEach(v => {
    document.getElementById("view" + v.charAt(0).toUpperCase() + v.slice(1)).style.display = v === tab ? "" : "none";
  });
  document.getElementById("tabExplore").classList.toggle("active", tab === "explore");
  document.getElementById("tabMine").classList.toggle("active", tab === "mine");
  if (tab === "explore") renderGrid();
  if (tab === "mine")    renderMine();
};

// ─── FILTER ────────────────────────────────────────────────────────────────────

window.commFilter = function(btn, cat) {
  document.querySelectorAll(".comm-pill").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  _filter = cat;
  renderGrid();
};

// ─── EXPLORE GRID ──────────────────────────────────────────────────────────────

function renderGrid() {
  const joined = getJoined();
  const list = _filter === "all" ? COMMUNITIES : COMMUNITIES.filter(c => c.cat === _filter);
  document.getElementById("commGrid").innerHTML = list.map((c, i) => {
    const isJoined = joined.includes(c.id);
    const d = getData(c.id);
    const doneToday = isJoined && d.lastIn === today();
    return `
      <div class="comm-card" style="animation-delay:${i*0.05}s" onclick="commOpenDetail('${c.id}')">
        <div class="comm-card-top">
          <div class="comm-card-emoji">${c.emoji}</div>
          ${isJoined ? `<div class="comm-badge-joined ${doneToday ? "done" : ""}">${doneToday ? "✅ Done" : "✓ Joined"}</div>` : ""}
        </div>
        <div class="comm-card-cat">${c.catLabel}</div>
        <h3 class="comm-card-title">${c.title}</h3>
        <p class="comm-card-desc">${c.desc}</p>
        <div class="comm-card-tip">${c.tip}</div>
        <div class="comm-card-foot">
          <span class="comm-card-members">👥 ${c.members.toLocaleString()}</span>
          ${isJoined ? `<span class="comm-card-streak">🔥 ${d.streak}d</span>` : `<span class="comm-card-join-hint">Tap to join →</span>`}
        </div>
      </div>`;
  }).join("");
}

// ─── MY CIRCLES ────────────────────────────────────────────────────────────────

function renderMine() {
  const joined = getJoined();
  const empty  = document.getElementById("commMineEmpty");
  const list   = document.getElementById("commMineList");
  const strip  = document.getElementById("commTodayStrip");

  if (joined.length === 0) {
    empty.style.display = ""; list.innerHTML = ""; strip.style.display = "none"; return;
  }
  empty.style.display = "none";

  // Today's agenda
  strip.style.display = "";
  document.getElementById("commTodayDate").textContent = fmtDate(today());
  const todayItems = joined.map(cid => {
    const comm = COMMUNITIES.find(c => c.id === cid);
    const d = getData(cid);
    const done = d.lastIn === today();
    return comm ? `
      <div class="comm-today-item ${done ? "done" : ""}" onclick="commOpenDetail('${cid}')">
        <span class="comm-today-emoji">${comm.emoji}</span>
        <span class="comm-today-name">${comm.title}</span>
        <span class="comm-today-status">${done ? "✅" : "⏳"}</span>
      </div>` : "";
  }).join("");
  document.getElementById("commTodayList").innerHTML = todayItems;

  // Circles list sorted by streak
  const items = joined
    .map(cid => ({ comm: COMMUNITIES.find(c => c.id === cid), d: getData(cid) }))
    .filter(x => x.comm)
    .sort((a, b) => b.d.streak - a.d.streak);

  list.innerHTML = items.map(({ comm: c, d }, i) => {
    const done = d.lastIn === today();
    const week = weekDays();
    const dots = week.map(day => `<span class="comm-mini-dot ${d.checkIns.some(ci => ci.date === day) ? "hit" : ""}"></span>`).join("");
    return `
      <div class="comm-mine-row" style="animation-delay:${i*0.06}s" onclick="commOpenDetail('${c.id}')">
        <div class="comm-mine-emoji">${c.emoji}</div>
        <div class="comm-mine-body">
          <div class="comm-mine-title">${c.title}</div>
          <div class="comm-mine-dots">${dots}</div>
        </div>
        <div class="comm-mine-right">
          <div class="comm-mine-streak">🔥 ${d.streak}</div>
          <div class="comm-mine-tag ${done ? "done" : "pending"}">${done ? "Done" : "Check in"}</div>
        </div>
      </div>`;
  }).join("");
}

// ─── DETAIL VIEW ───────────────────────────────────────────────────────────────

window.commOpenDetail = function(cid) {
  _activeCid = cid;
  _photoData = null;
  const c = COMMUNITIES.find(x => x.id === cid);
  if (!c) return;

  ["viewExplore","viewMine"].forEach(id => document.getElementById(id).style.display = "none");
  document.getElementById("viewDetail").style.display = "";

  // Header
  document.getElementById("dEmoji").textContent  = c.emoji;
  document.getElementById("dCat").textContent     = c.catLabel;
  document.getElementById("dTitle").textContent   = c.title;
  document.getElementById("dDesc").textContent    = c.desc;
  document.getElementById("dMembers").textContent = c.members.toLocaleString();
  document.getElementById("dCheckinDate").textContent = fmtDate(today());

  // Simulated active today count
  const activeCount = 3 + (cid.length % 5);
  document.getElementById("dActiveToday").textContent = `${activeCount} posted today`;

  const joined = getJoined();
  const isJoined = joined.includes(cid);

  const btn = document.getElementById("dJoinBtn");
  btn.textContent = isJoined ? "✓ Joined" : "+ Join";
  btn.className   = "comm-join-btn" + (isJoined ? " joined" : "");

  const content = document.getElementById("commJoinedContent");
  content.style.display = isJoined ? "" : "none";

  if (isJoined) {
    if (!getFeed(cid).length) seedFeed(c);
    refreshDetailContent(c);
  }
};

function refreshDetailContent(c) {
  const d = getData(c.id);
  const doneToday = d.lastIn === today();

  // Streak
  document.getElementById("dStreak").textContent = d.streak;
  document.getElementById("dTotal").textContent  = d.total;
  document.getElementById("dBest").textContent   = d.best;

  // Week dots
  const week = weekDays();
  const weekCount = week.filter(day => d.checkIns.some(ci => ci.date === day)).length;
  document.getElementById("dWeekCount").textContent = weekCount + "/7 days";
  document.getElementById("dWeekDots").innerHTML = week.map(day => {
    const hit = d.checkIns.some(ci => ci.date === day);
    const isToday = day === today();
    return `<span class="comm-dot ${hit?"hit":""} ${isToday?"current":""}"></span>`;
  }).join("");

  // Check-in card
  document.getElementById("dCheckinDone").style.display  = doneToday ? "" : "none";
  document.getElementById("dCheckinForm").style.display  = doneToday ? "none" : "";
  document.getElementById("dPhotoWrap").style.display    = c.photo ? "" : "none";
  resetPhotoUI();
  document.getElementById("dNote").value = "";

  // Leaderboard
  renderLeaderboard(c, d.streak);
  renderFeed(c);
}

function resetPhotoUI() {
  _photoData = null;
  document.getElementById("dPhotoInner").innerHTML = `<div class="comm-photo-icon">📷</div><div class="comm-photo-hint">Tap to snap a photo</div>`;
  const inp = document.getElementById("dPhotoInput");
  if (inp) inp.value = "";
}

window.commBack = function() {
  document.getElementById("viewDetail").style.display = "none";
  _activeCid = null;
  refreshHero();
  if (_tab === "mine") { document.getElementById("viewMine").style.display = ""; renderMine(); }
  else                 { document.getElementById("viewExplore").style.display = ""; renderGrid(); }
};

// ─── JOIN / LEAVE ──────────────────────────────────────────────────────────────

window.commToggleJoin = function() {
  const cid = _activeCid;
  const c = COMMUNITIES.find(x => x.id === cid);
  let j = getJoined();
  const isJoined = j.includes(cid);
  if (isJoined) {
    j = j.filter(id => id !== cid);
  } else {
    j.push(cid);
    if (!getFeed(cid).length) seedFeed(c);
  }
  setJoined(j);
  refreshHero();
  commOpenDetail(cid);
};

// ─── SEED SIMULATED FEED ───────────────────────────────────────────────────────

function seedFeed(c) {
  const notes = [
    "Day " + c.simMembers[0].s + " — still going 💪",
    "Consistency > perfection. Show up.",
    "Hard day but I showed up. That's the streak.",
    "Feeling this one today. So glad I'm in this community.",
    "Never miss again. Let's go! 🔥",
  ];
  const feed = c.simMembers.slice(0, 4).map((m, i) => ({
    username: m.n, date: today(), note: notes[i % notes.length],
    photo: null, timestamp: Date.now() - i * 1800000, sim: true,
  }));
  setFeed(c.id, feed);
}

// ─── LEADERBOARD ───────────────────────────────────────────────────────────────

function renderLeaderboard(c, myStreak) {
  const me = sessionStorage.getItem("fs_current") || "You";
  const entries = [
    { name: me, streak: myStreak, isMe: true },
    ...c.simMembers.map(m => ({ name: m.n, streak: m.s, isMe: false }))
  ].sort((a, b) => b.streak - a.streak);

  const medals = ["🥇","🥈","🥉"];
  document.getElementById("dLbRows").innerHTML = entries.slice(0, 8).map((e, i) => `
    <div class="comm-lb-row ${e.isMe ? "me" : ""}">
      <span class="comm-lb-rank">${medals[i] || (i+1)}</span>
      <span class="comm-lb-name">${e.isMe ? "⭐ " + e.name : e.name}</span>
      <span class="comm-lb-streak">🔥 ${e.streak}d</span>
    </div>`).join("");
}

// ─── FEED ──────────────────────────────────────────────────────────────────────

function renderFeed(c) {
  const feed = getFeed(c.id).sort((a, b) => b.timestamp - a.timestamp).slice(0, 12);
  const el = document.getElementById("dFeedItems");
  if (!feed.length) { el.innerHTML = `<div class="comm-feed-empty">No posts yet — be the first!</div>`; return; }

  el.innerHTML = feed.map(post => {
    const t = new Date(post.timestamp).toLocaleTimeString("en-GB", { hour:"2-digit", minute:"2-digit" });
    const safeNote = post.note ? post.note.replace(/</g,"&lt;").replace(/>/g,"&gt;") : "";
    const safeUser = post.username.replace(/</g,"&lt;");
    const safeTime = t.replace(/</g,"&lt;");
    return `
      <div class="comm-post">
        <div class="comm-post-hdr">
          <div class="comm-post-avatar">${post.username[0].toUpperCase()}</div>
          <div>
            <div class="comm-post-name">${safeUser}</div>
            <div class="comm-post-time">${safeTime}</div>
          </div>
        </div>
        ${post.photo ? `<img class="comm-post-photo" src="${post.photo}" alt="check-in" data-src="${post.photo}" data-user="${safeUser}" data-time="${safeTime}" onclick="commLightbox(this)">` : ""}
        ${safeNote ? `<p class="comm-post-note">${safeNote}</p>` : ""}
      </div>`;
  }).join("");
}

// ─── PHOTO UPLOAD ──────────────────────────────────────────────────────────────

window.commPhotoChanged = function(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    _photoData = e.target.result;
    document.getElementById("dPhotoInner").innerHTML = `<img src="${_photoData}" alt="preview" style="width:100%;height:100%;object-fit:cover;border-radius:12px;">`;
  };
  reader.readAsDataURL(file);
};

// ─── CHECK-IN ──────────────────────────────────────────────────────────────────

window.commCheckIn = function() {
  const cid = _activeCid;
  const c   = COMMUNITIES.find(x => x.id === cid);
  const note = document.getElementById("dNote").value.trim();
  const t = today();
  const d = getData(cid);
  if (d.lastIn === t) return;

  const newStreak = isConsecutive(d.lastIn) ? d.streak + 1 : 1;
  const newBest   = Math.max(newStreak, d.best);
  const updated   = { streak: newStreak, best: newBest, total: d.total + 1, lastIn: t,
                      checkIns: [...d.checkIns, { date: t, note, photo: _photoData }] };
  setData(cid, updated);

  const me = sessionStorage.getItem("fs_current") || "You";
  const feed = getFeed(cid);
  feed.unshift({ username: me, date: t, note, photo: _photoData, timestamp: Date.now(), sim: false });
  setFeed(cid, feed);

  refreshDetailContent(c);
  refreshHero();
  if (newStreak > 1) showToast(`🔥 ${newStreak}-day streak — keep it alive!`);
  else               showToast("✅ Checked in! Day 1 of your new streak.");
};

// ─── LIGHTBOX ──────────────────────────────────────────────────────────────────

window.commLightbox = function(img) {
  document.getElementById("lbImg").src     = img.dataset.src;
  document.getElementById("lbMeta").textContent = img.dataset.user + " · " + img.dataset.time;
  document.getElementById("photoLightbox").style.display = "flex";
};

window.commCloseLightbox = function() {
  document.getElementById("photoLightbox").style.display = "none";
};

// ─── TOAST ─────────────────────────────────────────────────────────────────────

function showToast(msg) {
  const t = document.getElementById("streakToast");
  t.textContent = msg;
  t.style.display = "block";
  t.classList.add("show");
  setTimeout(() => { t.classList.remove("show"); setTimeout(() => { t.style.display = "none"; }, 400); }, 3000);
}

// ─── INIT ──────────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  refreshHero();
  renderGrid();
});
