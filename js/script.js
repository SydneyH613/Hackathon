// FitSync — dist/script.js  (single-file runtime, no external imports)
// ─────────────────────────────────────────────────────────────────────────────

// ── MEAL TAB SWITCHING (shared between live plan and historical view) ─────────
window.switchMealDay = function(idx) {
  document.querySelectorAll(".meal-tab-btn").forEach((b,i) => b.classList.toggle("active", i===idx));
  document.querySelectorAll(".meal-day-panel").forEach((p,i) => p.classList.toggle("active", i===idx));
};

// ── STORAGE ───────────────────────────────────────────────────────────────────
const getUserPrefix = () => { const u = sessionStorage.getItem("fs_current"); return u ? `fs_${u.toLowerCase()}_` : "fs_anon_"; };
const saveData = (key, data) => localStorage.setItem(getUserPrefix() + key, JSON.stringify(data));
const getData  = (key) => { try { const d = localStorage.getItem(getUserPrefix() + key); return d ? JSON.parse(d) : null; } catch { return null; } };
window.saveData = saveData;
window.getData  = getData;

// ── CONSTANTS ─────────────────────────────────────────────────────────────────
const DAY_NAMES = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const EQUIPMENT_LABELS = {
  bodyweight:"Bodyweight / mat", bike:"Bike", stairmaster:"StairMaster",
  dumbbells:"Dumbbells", barbell:"Barbell", bench:"Bench", bands:"Resistance bands",
};
const SPLIT_DESCRIPTIONS = {
  fullbody:"Full Body", upper_lower:"Upper / Lower", ppl:"Push / Pull / Legs",
  fat_loss:"Fat Loss Rotation", maintain:"Balanced Maintenance",
};

// ── COACHING KNOWLEDGE BASE ────────────────────────────────────────────────────
// Synthesised from: ACSM 2026, NSCA Guidelines, Greg Nuckols / Stronger by Science,
// Mike Israetel / Renaissance Periodization, Eric Helms / 3D Muscle Journey,
// Starting Strength (Rippetoe), Jeff Nippard, PowerliftingToWin, PMC meta-analyses.
const COACHING = {
  beginner: {
    // Novice stage (0–6 months). Primary adaptation is NEUROLOGICAL, not hypertrophic.
    // The "novice effect" allows progress every single session — exploit it fully.
    setsCompound:    "3",
    setsAccessory:   "2-3",
    repsCompound:    "5-8",      // 5s for LP strength, 8s for hypertrophy flavour
    repsAccessory:   "8-12",
    restCompound:    "2–3 min",
    restAccessory:   "60–90 sec",
    rpeTarget:       "RPE 6–8 — stop 2–4 reps before failure on every set",
    progressionNote: "LINEAR PROGRESSION: if you complete ALL reps today, add 2.5 kg to upper body lifts and 5 kg to lower body lifts next session. This is the single most powerful training tool available to you right now.",
    deloadNote:      "Schedule a deload every 8–10 weeks: keep the same weights but cut sets by 40%.",
    phaseNote:       "NOVICE STAGE — Your strength gains this month come from your NERVOUS SYSTEM learning to recruit muscle, not from muscle growth yet. Technique and showing up consistently matter more than the weight on the bar.",
    warmup:          "WARM-UP (5–8 min): Leg swings ×10 each, arm circles ×10, hip rotations ×10, then 2 ramp sets at 50% and 65% of today's working weight",
    volumeLandmarks: "Target: 6–12 working sets per muscle group per week. Start at the low end; only add volume once soreness and recovery are well-managed.",
    splitRationale:  "Full Body 3×/week — training each muscle group 3× per week produces the fastest neurological and strength adaptations for beginners (ACSM 2026). More days of training is NOT better at this stage.",
  },
  intermediate: {
    // 6 months – 2 years. Linear progression stalls; weekly cycles needed.
    // Daily Undulating Periodization (DUP) — vary rep ranges across sessions within the week.
    setsCompound:        "3-4",
    setsAccessory:       "3",
    repsCompoundHeavy:   "4-6",   // Strength/neural focus — heavy sessions (~82–85% 1RM)
    repsCompoundVolume:  "8-12",  // Hypertrophy focus — volume sessions (~70–75% 1RM)
    repsAccessory:       "10-15",
    restCompound:        "2–3 min",
    restAccessory:       "60–90 sec",
    rpeTarget:           "RPE 7–9 — 1–3 reps left in the tank on working sets",
    progressionNote:     "DOUBLE PROGRESSION: work within a rep range (e.g. 3×8–12). Use the same weight until you can complete the TOP of the range on ALL sets for 2 sessions in a row. Then add 2.5–5 kg and rebuild from the bottom of the range.",
    deloadNote:          "Deload every 6–8 weeks: cut sets by 40–50% for one full training week. Watch for: performance regression, persistent joint aches, or motivational deficit — these signal a deload is overdue.",
    phaseNote:           "INTERMEDIATE STAGE — Linear session-to-session progress is over. You now need WEEKLY accumulation-and-recovery cycles. This plan uses Daily Undulating Periodization (DUP): heavier sessions and volume sessions within the same week to simultaneously build strength and muscle.",
    warmup:              "WARM-UP (8–10 min): Band pull-aparts ×15, movement-specific activation, then 2 ramp sets at 50% and 70% of today's working weight",
    volumeLandmarks:     "Target: 12–20 working sets per muscle group per week across all sessions. The upper end is for trained muscles; start at 12–14 sets and add if recovery allows.",
    splitRationale:      "Upper/Lower 4×/week — hitting each muscle 2× per week is the evidence-based sweet spot for hypertrophy (Schoenfeld et al.). Heavy (4–6 rep) and volume (8–12 rep) sessions create DUP within the week.",
  },
  advanced: {
    // 2+ years. Progress measured in months. Block periodization required.
    // Volume per muscle can reach 15–25+ sets/week during accumulation.
    setsCompound:    "4-5",
    setsAccessory:   "3-4",
    repsCompound:    "3-8",       // Phase-dependent; lower in intensification, higher in accumulation
    repsAccessory:   "10-20",     // Higher reps spare joints; loaded stretches, pump work
    restCompound:    "3–5 min",
    restAccessory:   "90–120 sec",
    rpeTarget:       "RPE 7–8 in accumulation | RPE 8–9 in intensification | RPE 9–10 in peaking",
    progressionNote: "BLOCK PERIODIZATION: Accumulation (4–6 wks, high volume, RPE 7–8) → Intensification (3–4 wks, moderate volume, RPE 8–9) → Realization/Peaking (1–2 wks, low volume, RPE 9–10). Strength PRs happen at the END of the full cycle, not week to week.",
    deloadNote:      "Deload every 3–6 weeks (every 4 weeks is standard in high-volume programmes). Methods: Volume deload (cut sets 40–60%, keep load), Intensity deload (cut load to 50–60%, keep sets), or Full rest week after competition/testing.",
    phaseNote:       "ADVANCED STAGE — You are approaching your genetic ceiling for rapid progress. Muscle gain is now 1–2 kg/year maximum under ideal conditions. Volume, exercise selection, weak-point specialisation, and recovery management are the primary levers. This plan uses ACCUMULATION-phase prescriptions — build work capacity before intensity peaks.",
    warmup:          "WARM-UP (10–12 min): Thoracic rotations ×10, movement-specific mobility, then 3 ramp sets at 40%, 60%, and 80% of today's working weight",
    volumeLandmarks: "Target: 15–25 working sets per muscle per week in accumulation. Specialise lagging groups by pushing toward MRV (Max Recoverable Volume) while keeping other muscles at Maintenance Volume (4–6 sets/week).",
    splitRationale:  "Push/Pull/Legs 5–6×/week — advanced athletes need higher per-muscle frequency (2–3×/week) and greater total weekly volume to drive continued adaptation. Both A and B variants within each session type create necessary volume variation.",
  },
};

// Helper: get coaching prescription for current level
function getCoaching(level) { return COACHING[level] || COACHING.beginner; }

// ── SPORT-SPECIFIC NUTRITION COACHING ─────────────────────────────────────────
// Expert nutritional prescriptions for each sport — synthesised from:
// Sports Dietitians Australia, ISSN Position Stands, ACSM Nutrition Guidelines,
// Burke et al. (2011) cycling fuelling, Jeukendrup carbohydrate research,
// Tarnopolsky protein recommendations for endurance athletes.
const SPORT_NUTRITION = {
  running: {
    carbTiming:    "RUNNING FUELLING: Carbohydrates are the primary fuel above Zone 2. Pre-run: 1–4g carbs/kg body weight 1–4 hours before. During runs over 75 min: 30–60g carbs/hour (gels, dates, banana). Post-run: 1–1.2g carbs/kg within 30 min to replenish glycogen.",
    protein:       "RUNNING PROTEIN: 1.4–1.7g protein/kg/day. Higher than gym training because running creates significant muscle protein breakdown. Prioritise complete proteins (eggs, Greek yoghurt, lean meat, fish) post-run.",
    hydration:     "RUNNING HYDRATION: 400–800ml/hour. Sweat rate varies dramatically — weigh yourself pre/post run. Every 1kg lost = 1L fluid deficit. Hot weather requires electrolytes (sodium) to prevent hyponatraemia from over-hydrating with plain water.",
    keyFoods:      ["oats", "banana", "dates", "sweet potato", "rice", "salmon", "eggs", "Greek yoghurt", "spinach", "beetroot juice"],
    performanceTip:"Beetroot juice (200ml, 2–3 hours before) improves running economy by 1–3% by increasing nitric oxide production and reducing oxygen cost at given pace. Used by elite marathon runners before races.",
  },
  cycling: {
    carbTiming:    "CYCLING FUELLING: The most carb-intensive sport per hour. Zone 2 rides (under 90 min): fasted or low-carb is fine for metabolic adaptation. Hard sessions and rides over 90 min: 60–90g carbs/hour with a mix of glucose and fructose transporters (e.g. 2:1 maltodextrin:fructose ratio) — this allows 90g/hr absorption vs 60g/hr from glucose alone.",
    protein:       "CYCLING PROTEIN: 1.4–1.6g protein/kg/day. Endurance athletes require less protein than strength athletes but more than sedentary people. Post-ride protein within 30–60 min accelerates glycogen resynthesis when combined with carbohydrates (4:1 carb:protein ratio).",
    hydration:     "CYCLING HYDRATION: 500–750ml/hour for moderate temperature, up to 1L/hr in heat. Electrolytes essential for rides over 2 hours — sodium (300–600mg/hr), potassium, magnesium. Cramping is predominantly a sodium-deficit issue, not a magnesium issue.",
    keyFoods:      ["rice cakes", "banana", "oats", "pasta", "sweet potato", "chicken", "salmon", "eggs", "avocado", "dates"],
    performanceTip:"Train your gut during long rides. At 60–90g carbs/hour, your gut needs to adapt to absorb that volume. GI distress on rides is usually under-practised fuelling, not intolerance. Start at 30g/hr and build over weeks.",
  },
  swimming: {
    carbTiming:    "SWIMMING FUELLING: Pool sessions create unique appetite suppression (cold water blunts hunger). Pre-swim: light carb meal 2 hours before (avoid heavy fats/proteins that cause nausea during flip turns). Post-swim: resist the appetite suppression — you've burned significant calories and need to refuel within 30–45 min.",
    protein:       "SWIMMING PROTEIN: 1.4–1.7g/kg/day. Shoulder and upper body muscle repair is the priority. Casein protein (cottage cheese, Greek yoghurt) before sleep supports overnight shoulder recovery.",
    hydration:     "SWIMMING HYDRATION: Swimmers often under-drink because pool water masks sweat. You STILL sweat significantly during intense pool sessions. Drink 400–600ml in the 2 hours before, and 200ml after every 30 min of hard swimming.",
    keyFoods:      ["oats", "banana", "rice", "chicken breast", "salmon", "tuna", "Greek yoghurt", "cottage cheese", "eggs", "sweet potato"],
    performanceTip:"Altitude training (real or simulated) is highly effective for swimmers due to the haemoglobin adaptation. Even recreational swimmers benefit from high-altitude training camps. If not available, iron status monitoring is critical — female swimmers are frequently iron-deficient, which devastates aerobic capacity.",
  },
  calisthenics: {
    carbTiming:    "CALISTHENICS FUELLING: Skill-heavy sessions (handstand, planche) require a stable blood glucose environment — avoid high glycaemic foods immediately before skill practice. A mixed meal 2–3 hours before is ideal. Conditioning circuits require immediate carb availability: a banana or small portion of rice 60 min before is effective.",
    protein:       "CALISTHENICS PROTEIN: 1.8–2.2g protein/kg/day — closer to strength training requirements because calisthenics at the advanced level produces significant muscle damage from isometric holds and eccentric loading. Spread across 4–5 meals for maximum MPS stimulation.",
    hydration:     "CALISTHENICS HYDRATION: Adequate hydration is critical for grip strength — even 2% dehydration measurably weakens grip, which compromises all bar work, ring work, and skill holds. Drink 500ml 2 hours before, maintain throughout.",
    keyFoods:      ["eggs", "Greek yoghurt", "chicken", "salmon", "tuna", "oats", "bananas", "brown rice", "avocado", "nuts", "dark chocolate"],
    performanceTip:"Collagen supplementation (15g with vitamin C, 1 hour before training) may accelerate connective tissue adaptation in tendons and ligaments. Calisthenics places extreme demands on wrists, elbows, and shoulders — connective tissue strength is the rate-limiting factor for most advanced skills.",
  },
  gym: {
    carbTiming:    "LIFTING FUELLING: Pre-workout: 0.5–1g carbs/kg 1–2 hours before (oats, rice, banana). Intra-workout on sessions over 75 min: 30–60g fast carbs (gels or sports drink). Post-workout: 1g carbs/kg + 0.4g protein/kg within 2 hours for maximum glycogen resynthesis and muscle protein synthesis.",
    protein:       "LIFTING PROTEIN: 1.6–2.2g/kg/day — the most evidence-supported range for muscle protein synthesis (ISSN 2017). Higher in a caloric deficit (2.2–2.4g/kg) to prevent muscle loss. Lower end sufficient in a surplus. Leucine content of meals drives MPS — prioritise animal proteins or complete plant proteins.",
    hydration:     "LIFTING HYDRATION: 2% dehydration reduces strength output by 5–10% and impairs cognitive performance (exercise selection, technique decisions). Arrive hydrated — drink 500ml 2 hours before. Sip 250ml per 20 min during session. Thirst is a LAGGING indicator — don't rely on it.",
    keyFoods:      ["eggs", "Greek yoghurt", "chicken breast", "lean beef", "salmon", "tuna", "oats", "rice", "sweet potato", "broccoli"],
    performanceTip:"Caffeine (3–6mg/kg, 45–60 min before training) is the most effective legal performance supplement for strength and power output after creatine. A 70kg athlete should consume 210–420mg — equivalent to 2–4 shots of espresso. Avoid developing tolerance by cycling: 5 days on, 2 days off.",
  },
  triathlon: {
    carbTiming:    "TRIATHLON FUELLING: The most complex nutritional challenge in sport. Carb-load 24–48h before races over 90 min. During race: 60–90g carbs/hr on bike (easier to digest), 30–60g/hr on run (GI stress increases with run effort). Practise exact race nutrition in long training sessions — do NOT try anything new on race day.",
    protein:       "TRIATHLON PROTEIN: 1.5–1.8g/kg/day. Three disciplines means triple the muscle protein breakdown. Post-training windows exist after EACH session — use them with a complete protein source. Casein before sleep for overnight repair.",
    hydration:     "TRIATHLON HYDRATION: Sweat losses across swim/bike/run total can exceed 2–4L. In the swim, you cannot drink — arrive well-hydrated. On the bike, drink 500–750ml/hr with electrolytes. Transition to run requires immediate fluid intake. Hot-weather races demand pre-cooling strategies (ice vest, cold towels).",
    keyFoods:      ["oats", "banana", "pasta", "rice", "sweet potato", "chicken", "salmon", "tuna", "dates", "peanut butter"],
    performanceTip:"Gut training is the fourth discipline of triathlon. Practice eating and drinking on the bike at race intensity for months before competition. GI distress causes more DNFs in Ironman than any other single factor.",
  },
};

function getSportNutritionNote(sport, isWorkoutDay) {
  const sn = SPORT_NUTRITION[sport] || SPORT_NUTRITION.gym;
  return isWorkoutDay ? sn.carbTiming : sn.protein;
}

// ── TOAST NOTIFICATIONS ───────────────────────────────────────────────────────
function showToast(message, type = "info") {
  document.querySelectorAll(".fitsync-toast").forEach(t => t.remove());
  const colors = { success:"#10b981", error:"#f43f5e", warning:"#f59e0b", info:"#38bdf8" };
  const toast = document.createElement("div");
  toast.className = "fitsync-toast";
  toast.style.cssText = `position:fixed;top:22px;right:22px;z-index:99999;padding:13px 20px;
    border-radius:11px;font-size:14px;font-weight:600;font-family:'Inter',sans-serif;
    background:${colors[type]||colors.info};color:#fff;
    box-shadow:0 6px 24px rgba(0,0,0,0.45);pointer-events:none;
    animation:fitsyncToastIn 0.25s ease both;`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity="0"; toast.style.transition="opacity 0.3s"; setTimeout(()=>toast.remove(),300); }, 3000);
}
window.showToast = showToast;

// ── EQUIPMENT HELPERS ─────────────────────────────────────────────────────────
function hasEquipment(profile, item) {
  return (profile.equipmentAvailable || []).includes(item);
}
function formatEquipmentList(items = []) {
  const safe = items.length ? items : ["bodyweight"];
  return safe.map(i => EQUIPMENT_LABELS[i] || i).join(", ");
}
function mapEquipmentTextToItem(text) {
  const l = text.toLowerCase();
  if (/\b(dumbbell|dumbbells|db|free weight)\b/.test(l)) return "dumbbells";
  if (/\b(barbell|bar|bb|olympic bar)\b/.test(l)) return "barbell";
  if (/\b(bench|weight bench)\b/.test(l)) return "bench";
  if (/\b(bands|resistance bands|elastic bands|theraband)\b/.test(l)) return "bands";
  if (/\b(bike|stationary bike|spin bike|indoor bike)\b/.test(l)) return "bike";
  if (/\b(stair|stairmaster|stepmill)\b/.test(l)) return "stairmaster";
  return "bodyweight";
}

// ── MOVEMENT CHOOSER ─────────────────────────────────────────────────────────
function chooseMovement(profile, family) {
  switch (family) {
    case "squat":
      if (hasEquipment(profile,"barbell")) return "Barbell back squat";
      if (hasEquipment(profile,"dumbbells")) return "Goblet squat";
      if (hasEquipment(profile,"bands")) return "Banded squat";
      return "Tempo air squat";
    case "hinge":
      if (hasEquipment(profile,"barbell")) return "Romanian deadlift (barbell)";
      if (hasEquipment(profile,"dumbbells")) return "Romanian deadlift (dumbbell)";
      if (hasEquipment(profile,"bands")) return "Banded good morning";
      return "Single-leg glute bridge";
    case "horizontalPush":
      if (hasEquipment(profile,"barbell") && hasEquipment(profile,"bench")) return "Barbell bench press";
      if (hasEquipment(profile,"dumbbells") && hasEquipment(profile,"bench")) return "Dumbbell bench press";
      if (hasEquipment(profile,"dumbbells")) return "Dumbbell floor press";
      if (hasEquipment(profile,"bands")) return "Band chest press";
      return "Push-ups";
    case "verticalPush":
      if (hasEquipment(profile,"barbell")) return "Barbell overhead press";
      if (hasEquipment(profile,"dumbbells")) return "Dumbbell shoulder press";
      if (hasEquipment(profile,"bands")) return "Band shoulder press";
      return "Pike push-up";
    case "horizontalPull":
      if (hasEquipment(profile,"barbell")) return "Barbell row";
      if (hasEquipment(profile,"dumbbells")) return "Single-arm dumbbell row";
      if (hasEquipment(profile,"bands")) return "Band row";
      return "Bodyweight table row";
    case "verticalPull":
      if (hasEquipment(profile,"bands")) return "Band lat pull-down";
      if (hasEquipment(profile,"dumbbells")) return "Dumbbell pullover";
      return "Towel door row";
    case "singleLeg":
      if (hasEquipment(profile,"dumbbells")) return "Dumbbell reverse lunge";
      if (hasEquipment(profile,"bench")) return "Bench step-up";
      return "Bodyweight split squat";
    case "glute":
      if (hasEquipment(profile,"barbell") && hasEquipment(profile,"bench")) return "Barbell hip thrust";
      if (hasEquipment(profile,"dumbbells") && hasEquipment(profile,"bench")) return "Dumbbell hip thrust";
      if (hasEquipment(profile,"bands")) return "Banded glute bridge";
      return "Single-leg glute bridge";
    case "core":
      if (hasEquipment(profile,"bands")) return "Pallof press + side plank";
      return "Dead bug + side plank";
    case "arms":
      if (hasEquipment(profile,"dumbbells")) return "Dumbbell curl + overhead extension";
      if (hasEquipment(profile,"bands")) return "Band curl + pressdown";
      return "Diamond push-up + isometric hold";
    case "shoulders":
      if (hasEquipment(profile,"dumbbells")) return "Lateral raise + face pull";
      if (hasEquipment(profile,"bands")) return "Band lateral raise";
      return "Y-T-W raise";
    default: return "Brisk walk + mobility";
  }
}

function cardioMode(profile, style = "steady") {
  const hasStair = hasEquipment(profile,"stairmaster");
  const hasBike  = hasEquipment(profile,"bike");
  if (style === "interval") {
    if (hasStair) return "StairMaster climb intervals";
    if (hasBike)  return "Bike sprint intervals";
    return "Run / walk intervals";
  }
  if (style === "recovery") {
    if (hasStair) return "easy StairMaster climb";
    if (hasBike)  return "easy recovery bike ride";
    return "easy walk";
  }
  if (hasStair) return "StairMaster climb";
  if (hasBike)  return "steady bike ride";
  return "jog or brisk walk";
}

// ── EXPERIENCE ANALYSIS ───────────────────────────────────────────────────────
// Classification based on PowerliftingToWin / NSCA / Starting Strength criteria:
//   BEGINNER  = can add weight every session | 0–6 months | no programme history
//   INTERMEDIATE = weekly progression | 6 months–2 years | stalled LP
//   ADVANCED  = monthly progression | 2+ years | sophisticated programming needed
function analyzeExperience(text) {
  // ── Multi-signal scoring engine ─────────────────────────────────────────────
  // Each signal votes with a weight. Final score:
  //   < -3  → beginner   |  -3 to +3 → intermediate  |  > +3 → advanced
  // Decisive hard overrides bypass scoring entirely.
  const l = (text || "").toLowerCase();
  let score = 0;

  // ═══════════════════════════════════════════════════════════════════════════
  // HARD BEGINNER OVERRIDES — unambiguous novice language, skip scoring
  // ═══════════════════════════════════════════════════════════════════════════
  if (/\b(never (exercised|trained|worked out|lifted|run|swum|cycled)|no experience|first time|absolute beginner|complete beginner|total beginner|zero experience|brand new to|just (started|beginning|joined|signed up)|haven[''']?t (exercised|trained|worked out|done (the )?gym)|not (done|tried) (any|much) (exercise|training)|couch to|starting from scratch|starting from zero|never done (a|any)|going to start)\b/.test(l)) return "beginner";
  if (/\b(new to (the )?gym|new to (working out|training|lifting|exercise|fitness|running|cycling|swimming))\b/.test(l)) return "beginner";

  // ═══════════════════════════════════════════════════════════════════════════
  // HARD ADVANCED OVERRIDES — elite/competitive markers, skip scoring
  // ═══════════════════════════════════════════════════════════════════════════
  if (/\b(competitive (athlete|runner|cyclist|swimmer|powerlifter|bodybuilder|triathlete|rower|boxer)|elite (athlete|runner|cyclist|swimmer)|national (level|standard|team)|regional (level|standard|champion)|county (level|champion)|club (athlete|captain|racer)|iron(man|woman) (finisher|athlete)|age.?group (winner|podium|qualifier)|pro athlete|semi.?pro)\b/.test(l)) return "advanced";
  if (/\b(block periodiz|conjugate method|auto.?regulat|rpe.?based programming|peaking (block|phase|cycle)|competition prep|periodization|westside|531\b|5\/3\/1|nsuns|candito|texas method|juggernaut|sheiko|cube method|bulgarian method)\b/.test(l)) return "advanced";

  // ═══════════════════════════════════════════════════════════════════════════
  // DURATION SIGNALS — most reliable single indicator
  // Handles: "5 years", "a few years", "several years", "a couple of years",
  //          "loads of years", "many years", "half a year", "a year or so",
  //          "a few months", "a couple months", "a few weeks", "a few days",
  //          "ages", "a long time", "forever", "just started", "recently"
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Colloquial HIGH-duration phrases (treat as long tenure) ──────────────
  if (/\b(loads of years|many years|for years|years and years|for a long time|for ages|forever|as long as (i can remember|i remember)|most of my life|my whole life|since (i was|school|college|uni|childhood))\b/.test(l)) score += 7;
  if (/\b(several years|quite a few years|a number of years|a good few years)\b/.test(l)) score += 5;
  if (/\b(a few years|couple of years|a couple years|a year or (so|two)|a year and (a half|more)|over a year)\b/.test(l)) score += 3;
  if (/\b(about a year|roughly a year|around a year|almost a year|nearly a year|half a year|six months or so)\b/.test(l)) score += 1;

  // ── Colloquial LOW-duration phrases ──────────────────────────────────────
  if (/\b(just (started|beginning|begun|got into)|only (just|recently) (started|begun)|recently (started|taken up|got into)|brand new|not long|a little while|a short (time|while)|haven.?t been doing it long|not been (doing it|training|going) long)\b/.test(l)) score -= 3;
  if (/\b(a few (weeks|days)|couple of (weeks|days)|a couple (weeks|days)|few weeks|few days)\b/.test(l)) score -= 2;
  if (/\b(a few months|couple of months|a couple months)\b/.test(l)) score += 0; // neutral — very beginner-intermediate boundary
  if (/\b(a few times|here and there|on and off|occasionally|now and then|not (very |too )?(consistently|regularly)|pretty (inconsistent|sporadic))\b/.test(l)) score -= 2;

  // ── Intensity/effort qualifiers (colloquial) ──────────────────────────────
  if (/\b(a lot|loads|tons|tonnes|heaps|masses|quite a lot|pretty (hard|seriously|intensely|heavily)|very (consistently|regularly|dedicated)|really (dedicated|committed|focused|serious))\b/.test(l)) score += 2;
  if (/\b(not (that|very|too) (much|hard|seriously)|a (little|bit)|casually|dabbled|dabbling|tried|dipped (into|my toes)|tinkered|here and there|fairly (new|inexperienced|recent))\b/.test(l)) score -= 1;

  // ── Numeric years ─────────────────────────────────────────────────────────
  const yrsAll = [...l.matchAll(/(\d+\.?\d*)\s*(year|yr)s?\b/g)];
  for (const m of yrsAll) {
    const n = parseFloat(m[1]);
    if (n >= 5)       score += 8;
    else if (n >= 3)  score += 6;
    else if (n >= 2)  score += 4;
    else if (n >= 1)  score += 2;
    else              score -= 1;
  }
  // ── Numeric months ────────────────────────────────────────────────────────
  const mosAll = [...l.matchAll(/(\d+)\s*month/g)];
  for (const m of mosAll) {
    const n = parseInt(m[1]);
    if (n >= 24)      score += 6;
    else if (n >= 18) score += 5;
    else if (n >= 12) score += 3;
    else if (n >= 6)  score += 1;
    else if (n >= 3)  score -= 1;
    else              score -= 3;
  }
  // ── Numeric weeks ─────────────────────────────────────────────────────────
  const wksAll = [...l.matchAll(/(\d+)\s*week/g)];
  for (const m of wksAll) {
    const n = parseInt(m[1]);
    if (n >= 52)      score += 2;
    else if (n >= 26) score += 1;
    else              score -= 2;
  }
  // ── Days (very short tenure) ──────────────────────────────────────────────
  if (/\b\d+\s*days?\b/.test(l)) score -= 3;

  // ═══════════════════════════════════════════════════════════════════════════
  // STRENGTH STANDARDS — gym/lifting specific
  // Rough standards (male 75–80 kg BW):
  //   Beginner: sq<80, bench<60, dl<100
  //   Intermediate: sq 80–140, bench 60–100, dl 100–160
  //   Advanced: sq>140, bench>100, dl>160
  // ═══════════════════════════════════════════════════════════════════════════
  // Squat
  const sqKg  = l.match(/squat.{0,15}(\d+\.?\d*)\s*kg/);
  const sqLbs = l.match(/squat.{0,15}(\d+\.?\d*)\s*lb/);
  const sqVal = sqKg ? parseFloat(sqKg[1]) : sqLbs ? parseFloat(sqLbs[1])*0.4536 : null;
  if (sqVal !== null) {
    if (sqVal >= 160)      score += 7;
    else if (sqVal >= 100) score += 3;
    else if (sqVal >= 60)  score += 0;
    else                   score -= 2;
  }
  // Bench
  const bpKg  = l.match(/bench.{0,15}(\d+\.?\d*)\s*kg/);
  const bpLbs = l.match(/bench.{0,15}(\d+\.?\d*)\s*lb/);
  const bpVal = bpKg ? parseFloat(bpKg[1]) : bpLbs ? parseFloat(bpLbs[1])*0.4536 : null;
  if (bpVal !== null) {
    if (bpVal >= 110)     score += 7;
    else if (bpVal >= 70) score += 3;
    else if (bpVal >= 40) score += 0;
    else                  score -= 2;
  }
  // Deadlift
  const dlKg  = l.match(/deadlift.{0,15}(\d+\.?\d*)\s*kg/);
  const dlLbs = l.match(/deadlift.{0,15}(\d+\.?\d*)\s*lb/);
  const dlVal = dlKg ? parseFloat(dlKg[1]) : dlLbs ? parseFloat(dlLbs[1])*0.4536 : null;
  if (dlVal !== null) {
    if (dlVal >= 200)      score += 7;
    else if (dlVal >= 130) score += 3;
    else if (dlVal >= 80)  score += 0;
    else                   score -= 2;
  }
  // OHP
  const ohpKg  = l.match(/(?:ohp|overhead press|press).{0,15}(\d+\.?\d*)\s*kg/);
  const ohpLbs = l.match(/(?:ohp|overhead press|press).{0,15}(\d+\.?\d*)\s*lb/);
  const ohpVal = ohpKg ? parseFloat(ohpKg[1]) : ohpLbs ? parseFloat(ohpLbs[1])*0.4536 : null;
  if (ohpVal !== null) {
    if (ohpVal >= 70)     score += 7;
    else if (ohpVal >= 45) score += 3;
    else                   score -= 1;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // RUNNING STANDARDS
  // Sub-20 5k / sub-45 10k / sub-1:45 HM → advanced
  // Sub-25 5k / sub-55 10k → intermediate
  // ═══════════════════════════════════════════════════════════════════════════
  // 5k time
  const fiveK = l.match(/5k?\s*(in|time|pb|pr|personal best)?[:\s]*(\d{1,2})[:\.](\d{2})/);
  if (fiveK) {
    const mins = parseInt(fiveK[2]) + parseInt(fiveK[3])/60;
    if (mins < 20)      score += 7;
    else if (mins < 25) score += 3;
    else if (mins < 30) score += 0;
    else                score -= 1;
  }
  // 10k time
  const tenK = l.match(/10k?\s*(in|time|pb|pr)?[:\s]*(\d{1,2})[:\.](\d{2})/);
  if (tenK) {
    const mins = parseInt(tenK[2]) + parseInt(tenK[3])/60;
    if (mins < 40)      score += 7;
    else if (mins < 50) score += 3;
    else if (mins < 60) score += 0;
    else                score -= 1;
  }
  // Marathon / half-marathon
  if (/\b(marathon|half.?marathon)\b/.test(l)) score += 3;
  if (/\bironman\b/.test(l))                   score += 6;
  // Weekly mileage for runners
  const miles = l.match(/(\d+)\s*(miles?|km)\s*(a|per)\s*week/);
  if (miles) {
    let km = parseInt(miles[1]);
    if (miles[2].startsWith("mile")) km = km * 1.609;
    if (km >= 80)      score += 7;
    else if (km >= 40) score += 3;
    else if (km >= 20) score += 1;
    else               score -= 1;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // CYCLING STANDARDS
  // ═══════════════════════════════════════════════════════════════════════════
  const ftp = l.match(/(\d+)\s*w(?:atts?)?\s*(?:ftp|functional threshold)/);
  const ftpB = l.match(/ftp.{0,10}(\d+)\s*w/);
  const ftpVal = ftp ? parseInt(ftp[1]) : ftpB ? parseInt(ftpB[1]) : null;
  if (ftpVal !== null) {
    if (ftpVal >= 300)      score += 7;
    else if (ftpVal >= 220) score += 3;
    else if (ftpVal >= 150) score += 0;
    else                    score -= 1;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SWIMMING STANDARDS
  // ═══════════════════════════════════════════════════════════════════════════
  // 100m freestyle time
  const swim100 = l.match(/100\s*m.{0,10}(\d+)[:\.](\d{2})/);
  if (swim100) {
    const secs = parseInt(swim100[1])*60 + parseInt(swim100[2]);
    if (secs < 65)       score += 7;
    else if (secs < 90)  score += 3;
    else if (secs < 120) score += 0;
    else                 score -= 1;
  }
  // "open water swimmer", "swim squad", "club swimmer" etc.
  if (/\b(swim squad|swim club|masters swimming|open water swimming|triathlon swimming)\b/.test(l)) score += 3;

  // ═══════════════════════════════════════════════════════════════════════════
  // TRAINING CONCEPT / VOCABULARY SIGNALS
  // ═══════════════════════════════════════════════════════════════════════════
  // Advanced vocabulary — these require genuine experience to use correctly
  if (/\b(progressive overload|periodiz|deload|mesocycle|macrocycle|volume landmark|mev\b|mrv\b|mav\b|rir\b|rpe\b|1rm\b|e1rm|orm\b|hypertrophy|specificity|supercompensation|undulating periodization|dup\b|linear periodization|block (period|program)|strength block|peaking|tapering|training max|amrap set|backoff set|top set|working set|tempo work|lactate threshold|vo2\s*max|ftp\b|heart rate zone|zone [2-5]\b|polarised training|maf method|pose method|chirunning)\b/.test(l)) score += 4;

  // Intermediate vocabulary — consistent, structured, programme-aware
  if (/\b(programme|program|routine|split|consistency|consistently|progress(ion|ing)|plateau|sets? and reps?|compound (lifts?|exercises?)|accessory (work|exercises?)|warm.?up sets?|working sets?|training days?|rest days?)\b/.test(l)) score += 2;

  // Beginner vocabulary — vague, casual, or exploratory
  if (/\b(just (trying|want to|looking to)|not sure (how|what)|don.?t really know|getting into shape|lose (a bit of )?weight|tone up|get fit|get in shape|cardio|burning calories|a bit of exercise|walk?ing|light exercise|occasionally|here and there|on and off|not (very|that) (active|fit)|unfit|out of shape|not been active)\b/.test(l)) score -= 2;

  // ═══════════════════════════════════════════════════════════════════════════
  // SPORT-SPECIFIC EXPERIENCE MARKERS
  // ═══════════════════════════════════════════════════════════════════════════
  if (/\b(competing|competition|race (season|plan)|training (plan|block|cycle)|coach(ed)?|coached by|personal best|pb\b|pr\b|race result|podium|age group|qualifier|qualif(ied|ying)|ranked|ranking|seeded|club member|team member|race number|bib number|race entry)\b/.test(l)) score += 3;
  if (/\b(just (ran|finished|completed|did) (my first|a|the)|first race|first marathon|first 5k|first (half.?)?marathon|first triathlon|c25k|couch to 5k)\b/.test(l)) score -= 2;

  // ═══════════════════════════════════════════════════════════════════════════
  // SELF-IDENTIFICATION (lower weight — people often mis-label themselves)
  // ═══════════════════════════════════════════════════════════════════════════
  if (/\bi('m|am)\s+(a\s+)?(complete\s+)?beginner\b/.test(l))         score -= 3;
  if (/\bi('m|am)\s+(a\s+)?intermediate\b/.test(l))                   score += 1;
  if (/\bi('m|am)\s+(a\s+|quite\s+|pretty\s+)?advanced\b/.test(l))   score += 3;
  if (/\b(still\s+)?(fairly|quite|pretty)\s+(new|inexperienced)\b/.test(l)) score -= 2;

  // ═══════════════════════════════════════════════════════════════════════════
  // FINAL DECISION — score thresholds
  // ═══════════════════════════════════════════════════════════════════════════
  if (score >= 5)  return "advanced";
  if (score >= 1)  return "intermediate";
  return "beginner";
}

function recommendTrainingDays(text, level, availableCount) {
  const l = (text || "").toLowerCase();
  const explicit = l.match(/(\d+)\s*(day|time|session|x)\s*(a|per)?\s*week/);
  if (explicit) {
    const d = parseInt(explicit[1]);
    const cap = level === "beginner" ? 3 : 6;
    return Math.max(1, Math.min(d, cap, availableCount));
  }
  const max = availableCount;
  if (level === "beginner")     return Math.min(3, max);
  if (level === "intermediate") return Math.min(4, max);
  return Math.min(5, max);
}

// ── SPORT DETECTION ────────────────────────────────────────────────────────────
// Identifies the user's primary sport / training style from their experience text.
// Returns one of: 'gym' | 'running' | 'cycling' | 'swimming' | 'triathlon' | 'crossfit' | 'team_sport' | 'combat'
function detectSport(text) {
  const l = (text || "").toLowerCase();
  // Triathlon must come before running/cycling/swimming (it's a superset)
  if (/\b(triathlon|ironman|tri\b|70\.3|140\.6|multisport|brick)\b/.test(l)) return "triathlon";
  if (/\b(crossfit|cross.?fit|wod\b|box\b|amrap\b|emom\b|functional fitness|kipping)\b/.test(l)) return "crossfit";
  if (/\b(swimming|swimmer|swim\b|pool\b|open water|freestyle|breaststroke|backstroke|butterfly|lane|metres? freestyle)\b/.test(l)) return "swimming";
  if (/\b(cycling|cyclist|road bike|mountain bike|mtb|zwift|velodrome|criterium|sportive|gran fondo|watt|watts|ftp\b|turbo trainer|spin\b|cadence)\b/.test(l)) return "cycling";
  if (/\b(running|runner|run\b|5k\b|10k\b|half.?marathon|marathon|parkrun|track|tempo run|fartlek|intervals|vo2|mileage|weekly miles|pace min.km|pace min.mile|race pace|long run|easy run)\b/.test(l)) return "running";
  if (/\b(boxing|mma\b|martial arts|judo|bjj|wrestling|jiu.?jitsu|muay thai|kickboxing|sparring|fight|combat)\b/.test(l)) return "combat";
  if (/\b(football|basketball|soccer|rugby|hockey|cricket|tennis|volleyball|handball|lacrosse|team sport|squad|pitch|court)\b/.test(l)) return "team_sport";
  if (/\b(calisthenics|cali\b|street workout|bodyweight training|muscle.?up|front lever|back lever|planche|handstand|human flag|gymnastic rings|ring dips|ring pull.?ups|bar workout|pistol squat|dragon flag|l.?sit|v.?sit|hollow body|parallettes|skin the cat|iron cross)\b/.test(l)) return "calisthenics";
  return "gym"; // default: gym / strength training
}

// ── WORKOUT BUILDER ───────────────────────────────────────────────────────────
function buildWorkoutDay(profile, sessionKey) {
  const level    = profile.level || "beginner";
  const C        = getCoaching(level);   // coaching prescription for this level
  const conds    = (profile.healthConditions || []).join(" ").toLowerCase();
  const hasBack  = /\b(back|spine|disc|sciatica|scoliosis)\b/.test(conds);
  const hasKnee  = /\b(knee|meniscus|acl|patella)\b/.test(conds);
  const hasShldr = /\b(shoulder|rotator|impingement|bursitis)\b/.test(conds);
  const hasCardio= /\b(asthma|heart|cardiac|hypertension|copd)\b/.test(conds);

  // Level-specific set/rep prescriptions
  const sets      = C.setsCompound;
  const repsMain  = level === "intermediate" ? C.repsCompoundVolume : C.repsCompound;
  const repsHeavy = level === "intermediate" ? C.repsCompoundHeavy  : C.repsCompound;
  const repsAcc   = C.repsAccessory;
  const setsAcc   = C.setsAccessory;
  const restMain  = C.restCompound;
  const restAcc   = C.restAccessory;
  const rpe       = C.rpeTarget;

  // Coaching cue helper — appends rest/RPE context
  const ex = (name, s, r, extraCue = "") =>
    `${name} — ${s}×${r} reps | Rest ${restMain} | ${rpe}${extraCue ? " | " + extraCue : ""}`;
  const acc = (name, s, r, cue = "") =>
    `${name} — ${s}×${r} reps | Rest ${restAcc}${cue ? " | " + cue : ""}`;

  let workout, steps, notes, intensity;

  switch (sessionKey) {
    // ── FULL BODY A — Primary Compound Day ────────────────────────────────────
    case "fullbody_a":
    case "fullbody": {
      workout   = "Full Body A — Compound Strength";
      intensity = level === "advanced" ? "High" : "Medium";
      const squat  = hasKnee  ? "Wall sit (3×30–45s)" : chooseMovement(profile,"squat");
      const push   = hasShldr ? "Wide-grip push-up" : chooseMovement(profile,"horizontalPush");
      const pull   = chooseMovement(profile,"horizontalPull");
      const hinge  = hasBack  ? "Glute bridge" : chooseMovement(profile,"hinge");
      const core   = hasBack  ? "Bird dog — 3×8 each side" : `${chooseMovement(profile,"core")} — 3×45s`;
      steps = [
        C.warmup,
        ex(squat, sets, repsMain, "Focus: proud chest, knees tracking over toes, controlled 2s descent"),
        ex(push, sets, repsMain, `Tempo: 2s down, brief pause at bottom, drive up${hasShldr ? " — keep elbows slightly tucked, shoulder-friendly angle" : ""}`),
        ex(pull, sets, repsMain, "Lead with your elbows, squeeze shoulder blades together at the top"),
        ex(hinge, sets, repsMain, hasBack ? "Glute bridge: drive hips, squeeze glutes hard at top — NO spinal loading today" : "Neutral spine throughout — think 'proud chest as you hinge forward'"),
        core,
        "COOL-DOWN (5 min): Hold each stretch 30–45s — hip flexors, hamstrings, chest, lats",
        `PROGRESSION NOTE: ${C.progressionNote}`,
      ];
      notes = `${C.phaseNote} | ${hasBack ? "HEALTH ADAPTATION: Hinge replaced with glute bridge — neutral spine protected throughout." : hasKnee ? "HEALTH ADAPTATION: Deep knee flexion avoided — modify range of motion to pain-free zone only." : "Coaching cue for every rep: 2s controlled descent, brace core before the rep, full range of motion."}`;
      break;
    }
    // ── FULL BODY B — Vertical & Unilateral Day ───────────────────────────────
    case "fullbody_b": {
      workout   = "Full Body B — Vertical & Unilateral";
      intensity = "Medium";
      const vPush  = hasShldr ? "Dumbbell front raise (light, below ear level)" : chooseMovement(profile,"verticalPush");
      const vPull  = chooseMovement(profile,"verticalPull");
      const lunge  = hasKnee  ? "Side-lying leg raise (3×15 each)" : chooseMovement(profile,"singleLeg");
      const glute  = chooseMovement(profile,"glute");
      const arms   = chooseMovement(profile,"arms");
      steps = [
        C.warmup,
        ex(vPush, sets, repsAcc, hasShldr ? "Keep weight LIGHT — shoulder work below ear level only" : "Press directly overhead — ribs down, avoid arching lower back"),
        ex(vPull, sets, repsAcc, "Initiate the pull from your lats, not your biceps — think 'elbows to back pockets'"),
        ex(lunge, sets, `${repsAcc} each`, hasKnee ? "Controlled leg raise — keep hips level, activate glute" : "Step back far enough that front shin stays vertical — do NOT let knee cave inward"),
        ex(glute, sets, repsAcc, "Drive through hips and squeeze glutes hard at the top — hold 1–2s at full extension"),
        acc(arms, setsAcc, `${repsAcc}`, "Full range of motion — don't cheat the reps by swinging"),
        "COOL-DOWN (5 min): Pigeon pose stretch, lat stretch overhead, shoulder cross-body",
        `PROGRESSION NOTE: ${C.progressionNote}`,
      ];
      notes = `${C.phaseNote} | Unilateral work (single-leg, single-arm) corrects strength imbalances between sides — critical for long-term injury prevention. The weaker side dictates the load.`;
      break;
    }
    // ── FULL BODY C — Conditioning ────────────────────────────────────────────
    case "fullbody_c": {
      workout   = "Full Body C — Conditioning";
      intensity = hasCardio ? "Low-Med" : (level === "beginner" ? "Medium" : "High");
      const cardioBlock = hasCardio
        ? "15 min moderate walk — conversational pace, breathe comfortably throughout"
        : level === "beginner"
          ? `${cardioMode(profile,"steady")} — 15 min at moderate pace (you can speak full sentences)`
          : `${cardioMode(profile,"interval")} — 20 min: 30s hard effort / 30s easy (8–10 rounds)`;
      steps = [
        "WARM-UP (5 min): March on spot, arm swings, hip circles, bodyweight squat ×10",
        cardioBlock,
        `Circuit — ${level === "beginner" ? "2" : "3"} rounds, 40s work / 20s rest:`,
        `  ▸ ${hasShldr ? "Incline push-up (hands on wall or bench)" : level === "beginner" ? "Push-up (or knee push-up)" : "Push-up variation"}`,
        `  ▸ ${hasKnee  ? "Glute bridge pulse ×20" : level === "beginner" ? "Air squat ×12" : "Jump squat ×12"}`,
        "  ▸ Plank hold",
        `  ▸ ${hasCardio ? "March on spot — controlled breathing" : level === "advanced" ? "Burpee ×8" : "Mountain climber — controlled pace"}`,
        "COOL-DOWN (5 min): Walk it out, full-body stretch",
        `COACHING NOTE: ${C.phaseNote}`,
      ];
      notes = hasCardio
        ? "HEALTH ADAPTATION: Intensity reduced for respiratory/cardiovascular condition. Stop immediately if dizzy, short of breath, or chest discomfort. This session is Zone 1-2 only."
        : `Conditioning sessions build your aerobic base and work capacity, which improves ALL other sessions. ${level === "beginner" ? "Beginners: the circuit is just 2 rounds — prioritise form over speed." : "Intermediate/Advanced: maintain the 40s/20s ratio — don't rest early."}`;
      break;
    }
    // ── UPPER PUSH — Chest, Shoulders, Triceps ────────────────────────────────
    case "upper_push": {
      workout   = level === "intermediate" ? "Upper Push — Strength Focus (Heavy)" : level === "advanced" ? "Upper Push A — Compound Power" : "Upper Push";
      intensity = level === "beginner" ? "Medium" : "High";
      const bench  = hasShldr ? "Wide-grip push-up" : chooseMovement(profile,"horizontalPush");
      const ovhd   = hasShldr ? "Dumbbell front raise (light)" : chooseMovement(profile,"verticalPush");
      const incl   = hasShldr ? "Low-incline push-up" : hasEquipment(profile,"dumbbells") ? "Incline dumbbell press" : "Decline push-up";
      const shldIso= chooseMovement(profile,"shoulders");
      const tri    = hasEquipment(profile,"dumbbells") ? "Dumbbell overhead tricep extension" : hasEquipment(profile,"bands") ? "Band tricep pressdown" : "Diamond push-up";
      steps = [
        C.warmup,
        ex(bench, sets, level === "intermediate" ? repsHeavy : repsMain, `MAIN LIFT — 2s eccentric (lowering), brief pause, drive up. ${hasShldr ? "Shoulder-safe grip: hands slightly wider than shoulders" : "Arch your back slightly, squeeze the bar"}`),
        ex(incl, setsAcc, repsAcc, `Incline angle targets upper chest — the most underdeveloped area for most people`),
        acc(ovhd, setsAcc, repsAcc, hasShldr ? "Strict light weight — NO pain. Avoid raising above ear height" : "Press directly overhead — control the descent fully"),
        acc(shldIso, setsAcc, repsAcc, "Lateral raises: thumbs SLIGHTLY down (like pouring a jug), feel the burn at the side of your shoulder"),
        acc(tri, setsAcc, repsAcc, "Full lockout at the bottom — squeeze the tricep hard"),
        `${chooseMovement(profile,"core")} — 3×45s | REST 60s between sets`,
        "COOL-DOWN (5 min): Doorway chest stretch, overhead tricep stretch",
        `PROGRESSION: ${C.progressionNote}`,
      ];
      notes = `${C.phaseNote} | PUSH DAY PRINCIPLE: Chest and shoulder pressing strength requires CONSISTENT progressive overload on the main compound (bench/push pattern). ${level === "intermediate" ? "This is your HEAVY push day — keep the main lift in the 4–6 rep range. Your next push session will use lighter weight and more reps (8–12). This is Daily Undulating Periodization (DUP)." : level === "advanced" ? "Accumulation phase: complete all sets and reps. If an exercise feels too easy, that means next week you should add volume, not weight — yet." : "Perfect form beats heavy weight every time at this stage."}`;
      break;
    }
    // ── UPPER PULL — Back, Biceps, Rear Delts ────────────────────────────────
    case "upper_pull": {
      workout   = level === "intermediate" ? "Upper Pull — Strength Focus (Heavy)" : level === "advanced" ? "Upper Pull A — Compound Strength" : "Upper Pull";
      intensity = "High";
      const row   = chooseMovement(profile,"horizontalPull");
      const pull2 = chooseMovement(profile,"verticalPull");
      const curl  = hasEquipment(profile,"dumbbells") ? "Dumbbell bicep curl" : hasEquipment(profile,"bands") ? "Band curl" : "Chin-up or inverted row (supinated grip)";
      const rearD = hasEquipment(profile,"dumbbells") ? "Dumbbell rear delt raise" : hasEquipment(profile,"bands") ? "Band face pull" : "Face pull or band pull-apart";
      steps = [
        C.warmup,
        ex(row, sets, level === "intermediate" ? repsHeavy : repsMain, "MAIN LIFT — lead with your elbows, NOT your hands. Squeeze shoulder blades together at the top of every rep"),
        ex(pull2, sets, repsAcc, "Vertical pull: initiate from LATS (armpit area), not biceps — think elbows driving down toward your hips"),
        acc(rearD, setsAcc, repsAcc, "Rear delts are the most neglected muscle in the gym — do NOT skip this. Slight elbow bend, lift to the side, feel it between your shoulder blades"),
        acc(curl, setsAcc, repsAcc, "No swinging — keep elbows pinned to ribs. Full ROM from locked-out to full contraction"),
        "Face pull or band pull-apart — 3×15 | Rest 60s | This is shoulder health insurance — do it every session",
        "Hollow hold or dead bug — 3×30s | Core braced throughout",
        "COOL-DOWN (5 min): Lat stretch (arm overhead, lean), bicep doorway stretch",
        `PROGRESSION: ${C.progressionNote}`,
      ];
      notes = `${C.phaseNote} | PULL DAY PRINCIPLE: Most people pull with their arms instead of their back — make every rep a deliberate back contraction. ${level === "intermediate" ? "This is your HEAVY pull day (low reps, high load). Your volume pull session uses higher reps (8–12) and isolates more. The combination is DUP — proven to produce better strength and hypertrophy than fixed rep schemes." : level === "advanced" ? "Back is the largest muscle group — it requires and can tolerate the highest volume of any muscle. Don't under-work it." : "Focus on the squeeze at the end of every rep — if you can't feel your back working, reduce the weight."}`;
      break;
    }
    // ── LOWER QUAD — Quad-Dominant ────────────────────────────────────────────
    case "lower_quad": {
      workout   = level === "intermediate" ? "Lower — Quad Strength (Heavy)" : level === "advanced" ? "Lower A — Quad/Squat Focus" : "Lower Body — Quad Focus";
      intensity = "High";
      const squat2  = hasKnee ? "Leg press or wall sit" : chooseMovement(profile,"squat");
      const lunge2  = hasKnee ? "Glute bridge (bilateral)" : chooseMovement(profile,"singleLeg");
      const hamCurl = hasKnee ? "Seated leg curl or lying leg curl" : "Nordic hamstring curl (or stiff-leg deadlift)";
      steps = [
        C.warmup,
        ex(squat2, sets, level === "intermediate" ? repsHeavy : repsMain, hasKnee ? "Leg press: push through the full plate, don't lock out completely — control the weight down" : "MAIN SQUAT: depth to parallel minimum. Drive knees out, chest up, weight in midfoot. 3–4s descent on heavy days"),
        ex(lunge2, setsAcc, `${repsAcc} each`, hasKnee ? "Glute bridge: hips high, squeeze hard at the top, hold 1–2s" : "Step far enough back that your front shin is VERTICAL — this protects the knee and loads the quad correctly"),
        acc(hamCurl, setsAcc, repsAcc, "Control the eccentric (lowering phase) — hamstrings grow most under loaded stretch"),
        "Calf raise — 3×20 | Rest 45s | Slow tempo: 2s up, 2s hold at top, 3s down — calves respond to time under tension",
        `${chooseMovement(profile,"core")} — 3×45s`,
        "COOL-DOWN (5 min): Deep squat hold, hip flexor stretch, quad stretch",
        `PROGRESSION: ${C.progressionNote}`,
      ];
      notes = `${C.phaseNote} | LOWER BODY PRINCIPLE: Your legs contain the largest muscles in your body — they drive your metabolism, posture, and athletic ability. ${hasKnee ? "HEALTH ADAPTATION: All high-impact and deep knee flexion exercises replaced. Work in a pain-free range ONLY. If any movement causes sharp or worsening pain, stop and substitute a glute bridge." : level === "intermediate" ? "This is your HEAVY lower day — keep squat reps in the 4–6 range at high load. Your next lower session is hinge-focused with more volume." : level === "advanced" ? "Accumulation phase: complete all sets. Legs can handle — and need — more volume than most people give them." : "Legs day is the most important session of the week. Don't skip it, and don't go light."}`;
      break;
    }
    // ── LOWER HINGE — Posterior Chain ─────────────────────────────────────────
    case "lower_hinge": {
      workout   = level === "intermediate" ? "Lower — Posterior Chain (Volume)" : level === "advanced" ? "Lower B — Hinge/Hamstring Focus" : "Lower Body — Posterior Chain";
      intensity = "High";
      const dl     = hasBack ? "Glute bridge (heavy, 3s hold) or cable pull-through" : chooseMovement(profile,"hinge");
      const hipT   = chooseMovement(profile,"glute");
      const lunge3 = hasKnee ? "Side-lying clamshell — 3×20 each" : chooseMovement(profile,"singleLeg");
      steps = [
        C.warmup,
        ex(dl, sets, level === "intermediate" ? repsMain : repsMain, hasBack ? "Cable pull-through or glute bridge: drive hips forward hard — NO spinal loading today. Neutral spine always." : "MAIN HINGE: push the floor away (don't think 'pull up'). Neutral spine — 'proud chest' as you hinge. BRACE your core before each rep"),
        ex(hipT, setsAcc, repsAcc, "Hip thrust: shoulders on bench, feet flat, drive hips up, squeeze glutes at the TOP — the most effective glute exercise in existence"),
        acc(lunge3, setsAcc, `${repsAcc} each`, hasKnee ? "Clamshell: slow and controlled, feel the glute working — NOT the TFL at the hip" : "Single-leg exercises detect imbalances. Never load the stronger side more — match the weaker side"),
        "Calf raise — 3×20 | Rest 45s | Slow eccentric (3s down) — stretch the calf at the bottom",
        "Side plank — 3×30–45s each side | Core and glute medius (hip) stability",
        "COOL-DOWN (5 min): Hamstring stretch, pigeon pose, thoracic rotation",
        `PROGRESSION: ${C.progressionNote}`,
      ];
      notes = `${C.phaseNote} | POSTERIOR CHAIN PRINCIPLE: Hamstrings and glutes are the most undertrained and most injury-preventive muscles in the body. ${hasBack ? "HEALTH ADAPTATION: All spinal loading removed — glute bridges and cable pull-throughs train the hip hinge pattern safely. Neutral spine throughout every rep." : level === "intermediate" ? "This is your VOLUME lower day — higher reps (8–12) at moderate load. Pairing a heavy lower day (squats) with a volume lower day (hinges) is optimal for complete leg development." : level === "advanced" ? "Hinge strength directly transfers to athletic power and protects the lower back. If your deadlift is a weak point, increase frequency of this session." : "Mind-muscle connection is critical here — actively squeeze your glutes and feel your hamstrings stretching."}`;
      break;
    }
    // ── PUSH A — Heavy Compound ────────────────────────────────────────────────
    case "push_a": {
      workout   = "Push A — Heavy Strength";
      intensity = "High";
      const benchA  = hasShldr ? "Wide push-up" : chooseMovement(profile,"horizontalPush");
      const inclA   = hasShldr ? "Low-incline push-up" : hasEquipment(profile,"dumbbells") ? "Incline dumbbell press" : "Decline push-up";
      const ohpA    = hasShldr ? "Lateral raise (strict, light)" : chooseMovement(profile,"verticalPush");
      steps = [
        C.warmup,
        ex(benchA, sets, repsHeavy, `MAIN COMPOUND — HEAVY. Target: last 2 reps of last set feel like RPE 8.5. 3–4 min rest. ${hasShldr ? "Wide, shoulder-safe grip only" : "Control the bar — 2–3s descent"}`),
        ex(inclA, setsAcc, repsAcc, "Incline press: upper chest development — crucial for a complete chest. Moderate weight, feel the upper pec working"),
        acc(ohpA, setsAcc, repsAcc, hasShldr ? "STRICT: below ear level only. Light weight. Feel lateral delt burning" : "Overhead press: full lockout at the top — don't just push halfway"),
        acc(chooseMovement(profile,"shoulders"), setsAcc, repsAcc, "Lateral raises: 4–5 sets per session is the sweet spot for lateral delt growth"),
        acc("Tricep extension or pushdown", setsAcc, repsAcc, "Full ROM — stretch at the top, squeeze at lockout"),
        "COOL-DOWN (5 min): Chest doorway stretch, overhead tricep stretch, pec minor release",
        `PROGRESSION: ${C.progressionNote}`,
      ];
      notes = `${C.phaseNote} | PUSH A = HEAVY SESSION. Heavy sets (3–6 reps) at high intensity train NEUROLOGICAL strength — your nervous system's ability to produce force. ${level === "advanced" ? "Block accumulation phase: today's weight should feel challenging but completely controlled. Save the PRs for the intensification block in 3–4 weeks." : "Your next push session (Push B) will use more reps at lighter weight — this DUP combination is why intermediates and advanced lifters progress when LP stopped."}`;
      break;
    }
    // ── PUSH B — Volume Hypertrophy ────────────────────────────────────────────
    case "push_b": {
      workout   = "Push B — Volume Hypertrophy";
      intensity = level === "advanced" ? "High" : "Medium-High";
      const benchB  = hasShldr ? "Incline push-up" : chooseMovement(profile,"horizontalPush");
      const inclB   = hasShldr ? "Low-incline push-up" : hasEquipment(profile,"dumbbells") ? "Dumbbell flat press" : "Push-up plus";
      steps = [
        C.warmup,
        ex(benchB, sets, repsMain, `VOLUME SESSION — lighter than Push A, more reps. Target: 8–12 controlled reps, RPE 8 on final set. 2 min rest`),
        ex(inclB, setsAcc, repsAcc, "Incline angle: 30–45° targets upper chest. Squeeze at the top"),
        acc(chooseMovement(profile,"verticalPush"), setsAcc, repsAcc, hasShldr ? "Modified: face the wall, arms at 90° — no shoulder pain" : "Dumbbell press: neutral or slightly rotated grip, drive up and together"),
        acc(chooseMovement(profile,"shoulders"), "4-5", "15-20", "HIGH VOLUME lateral raises: 4–5 sets of 15–20 reps with light weight. Shoulders respond to high rep, high frequency work"),
        acc("Tricep extension (any variation)", setsAcc, "12-15", "Triceps make up 60% of arm size — prioritise them"),
        `${level === "advanced" ? acc("Drop set: last set of any isolation — reduce weight 20%, continue to near-failure", "1", "max", "Advanced: drop sets achieve similar hypertrophy in 40% less time (PMC meta-analysis)") : ""}`,
        "COOL-DOWN (5 min): Full chest, shoulder, and tricep stretch sequence",
        `PROGRESSION: ${C.progressionNote}`,
      ].filter(Boolean);
      notes = `${C.phaseNote} | PUSH B = VOLUME SESSION. Higher reps at moderate load maximise METABOLIC STRESS — a primary driver of muscle hypertrophy. ${level === "advanced" ? "Advanced note: lateral delts are the single greatest contributor to visible shoulder width. 4–5 sets of lateral raises PER SESSION is supported by Renaissance Periodization volume landmarks." : "Volume sessions feel less intense than heavy sessions — they're not easier, the stimulus is just different. Both are necessary."}`;
      break;
    }
    // ── PULL A — Heavy Compound ────────────────────────────────────────────────
    case "pull_a": {
      workout   = "Pull A — Heavy Strength";
      intensity = "High";
      const rowA  = chooseMovement(profile,"horizontalPull");
      const vertA = chooseMovement(profile,"verticalPull");
      steps = [
        C.warmup,
        ex(rowA, sets, repsHeavy, "MAIN COMPOUND — HEAVY. Lead elbows to the wall behind you — NOT upward. Chest stays up throughout"),
        ex(vertA, sets, repsAcc, "Vertical pull: full ROM — arms completely straight at the bottom, shoulder blades fully retracted at the top"),
        acc("Face pull or band pull-apart", setsAcc, "15", "Rear delts and external rotators — shoulder HEALTH. Do these every pull day"),
        acc(hasEquipment(profile,"dumbbells") ? "Dumbbell bicep curl" : "Band curl", setsAcc, repsAcc, "Full ROM — from full extension to full contraction. No swinging."),
        acc("Dumbbell or cable rear delt raise", setsAcc, repsAcc, "Elbows slightly bent, lift to the side — NOT upward. Feel it between shoulder blades"),
        "Hollow body hold — 3×30s | Anti-extension core strength",
        "COOL-DOWN (5 min): Lat stretch, bicep doorway stretch, chest opener",
        `PROGRESSION: ${C.progressionNote}`,
      ];
      notes = `${C.phaseNote} | PULL A = HEAVY SESSION. ${level === "advanced" ? "Back is the largest muscle group in the body and can tolerate the highest training volume. Advanced athletes should accumulate 18–22+ sets of back work per week across all pulling sessions. Don't neglect rear delts — they protect the shoulder and are a critical weak point for most lifters." : "Heavy pulling (rows especially) is THE most underutilised tool for building a strong, healthy back. If your bench is stronger than your row, you have a structural imbalance — rows should be equally prioritised."}`;
      break;
    }
    // ── PULL B — Volume Hypertrophy ────────────────────────────────────────────
    case "pull_b": {
      workout   = "Pull B — Volume Hypertrophy";
      intensity = level === "advanced" ? "High" : "Medium-High";
      const rowB  = chooseMovement(profile,"horizontalPull");
      const curlB = hasEquipment(profile,"dumbbells") ? "Alternating dumbbell curl" : "Band curl";
      steps = [
        C.warmup,
        ex(rowB, sets, repsMain, "VOLUME SESSION — moderate weight, higher reps. Focus on the squeeze and stretch"),
        ex(chooseMovement(profile,"verticalPull"), setsAcc, repsAcc, "Lat pulldown or pull-up: full extension at the bottom maximises the lat stretch — this is where growth occurs"),
        acc("Face pull — elbow high, pull to forehead", setsAcc, "15-20", "One of the most important exercises for long-term shoulder health"),
        acc(curlB, "3-4", "12-15", "Supinate (turn palm up) fully at the top — this engages the short head of the bicep"),
        acc("Dumbbell hammer curl", "2-3", "12-15", "Hammer grip targets the brachialis — the muscle that pushes the bicep up and creates arm thickness"),
        acc("Rear delt raise or reverse pec deck", "4", "15-20", "High volume rear delts: use lighter weight, feel the contraction — NOT momentum"),
        `${level === "advanced" ? acc("Superset: curl + rear delt raise back-to-back, minimal rest", "2-3", "12+", "Advanced: supersets on isolation exercises save time and increase metabolic fatigue") : ""}`,
        "COOL-DOWN (5 min): Thoracic rotation, lat stretch, forearm stretch",
        `PROGRESSION: ${C.progressionNote}`,
      ].filter(Boolean);
      notes = `${C.phaseNote} | PULL B = VOLUME SESSION. Bicep and rear delt isolation work requires HIGH volume (12–20+ sets/week) to grow, because they receive substantial indirect stimulus from every pressing movement. ${level === "advanced" ? "Advanced tip: if arms are a weak point, this is where you add specialisation volume — 4–5 direct curl sets here plus the indirect work from rows = ~10–14 direct bicep sets per week, sufficient for advanced growth." : "The mind-muscle connection matters most for isolation exercises — reduce weight if you can't feel the target muscle working."}`;
      break;
    }
    // ── LEGS A — Squat/Quad Focus ──────────────────────────────────────────────
    case "legs_a": {
      workout   = "Legs A — Squat Focus";
      intensity = "High";
      const sqA   = hasKnee ? "Leg press (90° max)" : chooseMovement(profile,"squat");
      const lunA  = hasKnee ? "Glute bridge — 3×15" : chooseMovement(profile,"singleLeg");
      steps = [
        C.warmup,
        ex(sqA, sets, level === "advanced" ? repsHeavy : repsMain, hasKnee ? "Leg press: push through the full foot, controlled descent — 3s down minimum. Stop at 90° knee angle" : "MAIN SQUAT: This is your most important lower body lift. Squat to parallel minimum. 3s descent on the way down. Drive knees out."),
        ex(lunA, setsAcc, `${repsAcc} each`, hasKnee ? "Glute bridge: heavy load, squeeze hard, 1–2s hold at top" : "Split squat or lunge: front shin vertical, control the descent"),
        acc("Leg extension or sissy squat", setsAcc, "12-15", "Quad isolation: control the lowering phase — 3s down. This is where the quad tears (good) and grows"),
        "Calf raise — 4×20 | Slow tempo: 2s up, 2s hold, 3s down | Full ROM, full stretch at bottom",
        `${chooseMovement(profile,"core")} — 3×45s`,
        "COOL-DOWN (5 min): Deep squat hold 60s, quad stretch, hip flexor stretch",
        `PROGRESSION: ${C.progressionNote}`,
      ];
      notes = `${C.phaseNote} | LEGS A = SQUAT/QUAD FOCUS. ${hasKnee ? "HEALTH ADAPTATION: High-impact movements replaced with leg press and glute bridge. Never push into pain — your pain-free range of motion is your working range. Ice if any swelling after." : level === "advanced" ? "Advanced leg training requires the highest volumes of any muscle group — quads can handle 15–20+ sets per week at peak. If your squat has stalled, the solution is almost always MORE quad isolation volume and more unilateral work, not more heavy squatting." : "Leg day is the session most people skip and most people should double down on. The quadriceps, hamstrings, and glutes collectively contain more muscle mass than the entire upper body."}`;
      break;
    }
    // ── LEGS B — Hinge/Posterior Chain Focus ──────────────────────────────────
    case "legs_b": {
      workout   = "Legs B — Posterior Chain";
      intensity = "High";
      const dlB  = hasBack ? "Trap bar deadlift or cable pull-through" : chooseMovement(profile,"hinge");
      const gluB = chooseMovement(profile,"glute");
      steps = [
        C.warmup,
        ex(dlB, sets, level === "advanced" ? repsHeavy : repsMain, hasBack ? "Cable pull-through: hinge at hips, neutral spine, drive hips forward at the top — NO lumbar rounding" : "MAIN HINGE: set your back before the rep, push the floor away, hips and shoulders rise together. Don't let hips rise faster than shoulders."),
        ex(gluB, setsAcc, repsAcc, "Hip thrust: shoulders on bench, feet flat, CHIN TO CHEST (prevents back arching), drive up and SQUEEZE hard at top"),
        acc("Nordic curl or hamstring curl", setsAcc, "8-12", "Hamstring ECCENTRIC strength: lower as slow as possible (3–5s) — this is the most important hamstring injury prevention exercise you can do"),
        "Calf raise — 4×20 | Full stretch at the bottom — calves grow most from the stretched position",
        "Side plank + clamshell — 3×30s each | Hip abductor and core stability — prevents knee valgus in squats",
        "COOL-DOWN (5 min): Hamstring stretch, pigeon pose, thoracic rotation",
        `PROGRESSION: ${C.progressionNote}`,
      ];
      notes = `${C.phaseNote} | LEGS B = HINGE/POSTERIOR CHAIN. ${hasBack ? "HEALTH ADAPTATION: Conventional deadlift replaced with trap bar deadlift or cable pull-through — these load the hip hinge pattern without compressive spinal stress. Neutral spine is non-negotiable on every rep." : level === "advanced" ? "Nordic hamstring curls are the single most evidence-supported injury prevention exercise for hamstrings. If you're doing nothing else for hamstring health, start here." : "The deadlift (or Romanian deadlift) is the second most important compound movement after the squat. A strong posterior chain protects your lower back, makes you more athletic, and burns the most calories of any movement pattern."}`;
      break;
    }
    // ── HIIT A ────────────────────────────────────────────────────────────────
    case "hiit_a": {
      workout   = "HIIT — High Intensity Cardio";
      intensity = hasCardio ? "Low-Med" : "High";
      steps = [
        "WARM-UP (5 min): Easy march, arm swings, leg swings, 3 air squats",
        hasCardio
          ? "20 min moderate-pace walk or gentle cycle — breathe comfortably, conversational pace (Zone 1–2)"
          : `${cardioMode(profile,"interval")}: 8–10 rounds of 30s HARD (9/10 effort) / 30s easy (3/10 effort)`,
        `Bodyweight circuit — ${level === "beginner" ? "2" : "3"} rounds (40s on / 20s off):`,
        `  ▸ ${hasKnee ? "Glute bridge ×15" : level === "beginner" ? "Air squat ×12" : "Jump squat ×12"}`,
        "  ▸ Push-up ×10–12",
        "  ▸ Plank hold (maintain neutral spine)",
        `  ▸ ${hasCardio ? "Slow march — controlled breathing" : level === "advanced" ? "Burpee ×8" : "Mountain climber — moderate pace"}`,
        "COOL-DOWN (5 min): Easy walk, full-body stretch",
        hasCardio ? "HEALTH NOTE: All intensity kept at Zone 1-2. Stop if short of breath, dizzy, or chest discomfort." : `COACHING NOTE: On the work intervals, push to the point where you CANNOT hold a conversation. On the rest intervals, recover. ${level === "advanced" ? "Advanced: add a weight vest or increase the work interval to 40s for greater stimulus." : ""}`,
      ];
      notes = hasCardio
        ? "HEALTH ADAPTATION: Cardiovascular/respiratory condition detected. ALL high-intensity intervals replaced with Zone 1–2 cardio. Build aerobic base safely; consult your physician before increasing intensity."
        : `HIIT COACHING: Interval training is the most time-efficient method for improving cardiovascular fitness and burning calories. ${level === "beginner" ? "Beginners: 2 circuit rounds max — HIIT is a high-fatigue tool. Allow 48h recovery before the next session." : level === "intermediate" ? "Intermediate: aim for 3 full circuit rounds. If your sprint intervals start to feel like jogging, push harder on the next round." : "Advanced: HIIT sessions should be brutal. If you're not questioning your life choices at round 3, you're not working hard enough."}`;
      break;
    }
    // ── CARDIO A — Steady State ────────────────────────────────────────────────
    case "cardio_a": {
      workout   = "Cardio — Steady State (Zone 2)";
      intensity = "Low-Med";
      steps = [
        "WARM-UP (5 min): Easy pace, gradually increase",
        hasCardio
          ? "25–30 min gentle walk at a conversational pace — Zone 1 (can speak full sentences comfortably)"
          : `${level === "advanced" ? "45–60 min" : "25–35 min"} ${cardioMode(profile,"steady")} at Zone 2 (can speak in short sentences — slightly uncomfortable but sustainable)`,
        "COOL-DOWN (5 min): Slow down gradually, full-body stretch",
        `ZONE 2 COACHING: Zone 2 cardio (65–75% max heart rate) is the most evidence-backed method for building mitochondrial density, aerobic efficiency, and long-term metabolic health. It also actively speeds up recovery between strength sessions.`,
        `TARGET HEART RATE: Roughly ${level === "beginner" ? "100–130 bpm" : level === "intermediate" ? "110–140 bpm" : "115–150 bpm"} (or: you can speak in short sentences but not sing)`,
      ];
      notes = `ZONE 2 CARDIO: The most underrated training tool. ${level === "advanced" ? "Advanced athletes need 150–200+ minutes of Zone 2 per week for optimum cardiovascular health alongside strength training. This single session contributes ~30–45 min. The aerobic base directly improves your recovery between heavy sets." : level === "intermediate" ? "Zone 2 cardio builds the aerobic ENGINE that lets you recover faster between sets, run more conditioning sessions, and generally feel better. 30–45 min, 2–3× per week is the target." : "For beginners, even 20–25 min of brisk walking qualifies as Zone 2 cardio and produces significant fitness improvements. Walking is legitimate training."}`;
      break;
    }
    // ── METABOLIC CONDITIONING ─────────────────────────────────────────────────
    case "metabolic": {
      workout   = "Metabolic Conditioning";
      intensity = "Medium-High";
      steps = [
        "WARM-UP (5 min): Dynamic mobility, light cardio ramp",
        `AMRAP (As Many Rounds As Possible) — ${level === "beginner" ? "15 min" : "20 min"}:`,
        `  ▸ ${hasKnee ? "Step-touch ×10" : chooseMovement(profile,"squat") + " ×10"}`,
        `  ▸ ${hasShldr ? "Incline push-up ×10" : "Push-up ×10"}`,
        `  ▸ ${chooseMovement(profile,"horizontalPull")} ×10`,
        "  ▸ Plank hold ×30s",
        "COOL-DOWN (5 min): Walk out the heart rate, full stretch",
        "COACHING NOTE: Pick a pace you can sustain for the FULL time without stopping. The number of rounds is your score — beat it next time this session appears.",
        `TARGET: ${level === "beginner" ? "3–5 rounds" : level === "intermediate" ? "5–8 rounds" : "8–12+ rounds"} — note your score and improve it over time`,
      ];
      notes = `METABOLIC CONDITIONING PRINCIPLE: MetCon trains your glycolytic energy system (the system that fuels 30s–3min efforts), improves work capacity, and burns significant calories in a short time. ${level === "beginner" ? "Beginners: 15 min AMRAP max. Rest as needed — maintaining form matters more than rounds completed." : level === "intermediate" ? "Intermediate: 20 min, minimal rest during the AMRAP. If you need to rest, keep it under 15s then go again." : "Advanced: 20 min, no planned rest within rounds. Track rounds + reps. Use a weight vest or heavier variation to increase stimulus."}`;
      break;
    }
    // ── HIIT B ────────────────────────────────────────────────────────────────
    case "hiit_b": {
      workout   = "HIIT B — Strength Cardio";
      intensity = hasCardio ? "Low-Med" : "High";
      steps = [
        "WARM-UP (5 min): Light jog or march, dynamic stretches",
        `${level === "advanced" ? "5" : "4"} rounds, rest ${level === "beginner" ? "2 min" : "90s"} FULLY between rounds:`,
        `  ▸ ${hasKnee ? "Glute bridge pulse ×20" : level === "advanced" ? "Jump squat ×15 (or barbell jump squat ×10)" : "Jump squat ×12"}`,
        `  ▸ ${hasShldr ? "Push-up (modified) ×10" : "Push-up ×12"}`,
        `  ▸ ${chooseMovement(profile,"horizontalPull")} ×12`,
        `  ▸ ${hasCardio ? "March on spot ×45s — controlled breathing" : level === "advanced" ? "Burpee ×10" : "Burpee ×8"}`,
        "COOL-DOWN (5 min): Walk, breathe, stretch",
        `COACHING NOTE: REST FULLY between rounds — ${level === "beginner" ? "2 min" : "90s"} is prescribed because quality of EACH round matters. A slow round 4 is not better than resting properly and doing a fast round 4.`,
      ];
      notes = `HIIT B PRINCIPLE: Strength-cardio hybrid sessions train your ability to produce POWER repeatedly — critical for sport performance and a major calorie burner. ${hasCardio ? "HEALTH ADAPTATION: High-intensity intervals replaced. Work at a comfortable, sustained pace." : level === "beginner" ? "Beginners: the goal is to COMPLETE all 4 rounds. Rest longer if needed. Reducing the burpees to 4–6 is fine at this stage." : level === "advanced" ? "Advanced: if 5 rounds feels manageable, add a 5th exercise (e.g., box jump or kettlebell swing) to increase density." : "Quality beats speed — a push-up with full ROM beats two sloppy ones."}`;
      break;
    }
    // ── CARDIO + CORE ─────────────────────────────────────────────────────────
    case "cardio_core": {
      workout   = "Cardio + Core";
      intensity = "Medium";
      steps = [
        "WARM-UP (5 min): Easy cardio ramp, cat-cow ×10, glute bridge ×10",
        hasCardio
          ? "20 min gentle walk — keep breathing comfortable throughout"
          : `20–25 min ${cardioMode(profile,"steady")} — Zone 2 (conversational pace)`,
        "CORE CIRCUIT — 3 rounds (no rest within a round, 90s between rounds):",
        `  ▸ Dead bug — ×10 each side | Lower back pressed INTO the floor throughout`,
        `  ▸ Side plank — ×30–45s each side | Hips high, don't let them sag`,
        `  ▸ ${hasBack ? "Cat-cow ×15 — spinal mobility, NOT stability exercise" : "Pallof press or hollow hold — ×30s | Anti-rotation core strength"}`,
        `  ▸ Bird dog — ×10 each side | Spine neutral, move arm and opposite leg together slowly`,
        "COOL-DOWN (5 min): Supine hip rotations, child's pose, hip flexor stretch",
        "CORE COACHING: Your core's main job is ANTI-MOVEMENT (resisting forces), not movement itself. Dead bugs, planks, and Pallof presses train this — sit-ups don't.",
      ];
      notes = `CORE TRAINING PRINCIPLE: A strong core protects your spine in EVERY other exercise and is the foundation of all human movement. ${hasBack ? "HEALTH ADAPTATION: All spinal flexion (crunches, sit-ups) removed. All core work is anti-extension and anti-rotation — the evidence-based, spine-safe approach to core training." : level === "advanced" ? "Advanced core training: add loaded variations — weighted planks, ab wheel rollouts, cable anti-rotation, and hanging leg raises. Progressively overload your core like any other muscle." : "Beginners and intermediates: master the dead bug before anything else — it teaches the most important motor pattern in the gym (bracing the core while limbs move)."}`;
      break;
    }
    // ── ACTIVE RECOVERY ────────────────────────────────────────────────────────
    case "active_recovery": {
      workout   = "Active Recovery";
      intensity = "Low";
      steps = [
        `20–30 min easy ${cardioMode(profile,"recovery")} — Zone 1 only (3–4/10 effort maximum)`,
        "MOBILITY SEQUENCE (10 min):",
        "  ▸ Hip flexor stretch — 60s each side | Lunge position, push hips forward",
        "  ▸ Hamstring stretch — 60s each side | Standing or lying, no bouncing",
        "  ▸ Chest opener / doorway stretch — 60s | Arms at 90°, lean through doorway",
        "  ▸ Thoracic rotation — ×10 each side | On all fours or seated, rotate from mid-back",
        "  ▸ Hip 90/90 — 60s each side | Most important hip mobility drill",
        "Optional: foam roll legs (quads, hamstrings, glutes, calves) — 30s per spot",
        "RECOVERY COACHING: Adaptation happens DURING RECOVERY, not during training. Training creates the stimulus; sleep and recovery create the response.",
        `${level === "advanced" ? "Advanced: consider contrast therapy (cold then warm) if accessible — evidence suggests mild benefit for strength recovery. Priority is 7–9h sleep." : "Rest day tip: a 20-min walk is active recovery. Complete rest is NOT better than easy movement for muscle recovery."}`,
      ];
      notes = `RECOVERY PRINCIPLE: Muscle is built during rest, not during training. This session improves blood flow to trained muscles, reduces soreness, maintains mobility, and keeps you on schedule without adding fatigue. ${level === "beginner" ? "Beginners: soreness (DOMS) peaks 24–48h after training. A gentle walk or active recovery session accelerates recovery better than lying on the couch." : level === "intermediate" ? "Intermediate: if you're frequently sore going into sessions, your recovery is insufficient — prioritise sleep and nutrition before adding more training volume." : "Advanced: recovery management is a primary training variable at your level. Track resting heart rate — if it's elevated >5 bpm above baseline, reduce today's intensity."}`;
      break;
    }
    // ── STRENGTH MAINTENANCE ───────────────────────────────────────────────────
    case "strength_maintain": {
      workout   = "Strength Maintenance";
      intensity = "Medium-High";
      steps = [
        C.warmup,
        ex(hasKnee ? "Leg press" : chooseMovement(profile,"squat"), "3", "5-6", "MAINTENANCE LOAD: Heavy enough to feel challenging, but leave 2–3 reps in reserve. This is NOT a max effort day."),
        ex(hasShldr ? "Push-up" : chooseMovement(profile,"horizontalPush"), "3", "5-6", "Match your last maintenance session's weight — consistency preserves strength"),
        ex(chooseMovement(profile,"horizontalPull"), "3", "5-6", "Row: controlled, full ROM. Strength maintenance requires touching all major movement patterns"),
        ex(hasBack ? "Glute bridge" : chooseMovement(profile,"hinge"), "3", "6-8", hasBack ? "Heavy glute bridge — drive hard, squeeze long" : "Hinge: neutral spine, controlled"),
        "COOL-DOWN (5 min): Full-body stretch",
        `MAINTENANCE NOTE: Maintenance Volume = 4–6 hard sets per muscle per week (Israetel / RP Strength). This session provides that minimum. You can maintain ALL your current strength with this minimal stimulus — the goal is NOT to improve today.`,
      ];
      notes = `MAINTENANCE PRINCIPLE: Scientific evidence (RP Strength; Israetel MEV/MV framework) shows you can MAINTAIN all muscle and strength with as little as 4–6 hard sets per muscle per week. This session achieves that minimum. ${level === "advanced" ? "Advanced: during maintenance phases (travel, busy life, deload), drop volume aggressively but keep INTENSITY (load) high. One hard set of 5 on the squat preserves more strength than 3 sets of 15 at a light weight." : "Maintenance phases are not failures — they're strategy. Alternating between building phases and maintenance phases over months is how long-term progress is made."}`;
      break;
    }
    // ── CARDIO MAINTENANCE ─────────────────────────────────────────────────────
    case "cardio_maintain": {
      workout   = "Cardio — Maintenance";
      intensity = "Low-Med";
      steps = [
        "WARM-UP (5 min): Easy start, build pace gradually",
        hasCardio
          ? "25–30 min gentle walk — conversational pace"
          : `30–35 min ${cardioMode(profile,"steady")} — Zone 2 target (65–75% max HR)`,
        "COOL-DOWN (5 min): Slow down, breathe, light stretch",
        `ZONE 2 REMINDER: You should be able to speak in short sentences but NOT sing. If you can sing, push harder. If you can't speak at all, slow down.`,
        `MAINTENANCE CARDIO: Even 2× 30-min Zone 2 sessions per week maintains VO2max in trained individuals. Consistency beats intensity for aerobic maintenance.`,
      ];
      notes = `CARDIO MAINTENANCE: Consistent Zone 2 cardio (2–3×/week, 30–45 min) is sufficient to maintain cardiovascular fitness and supports recovery between resistance sessions. ${level === "advanced" ? "Advanced athletes should aim for 150+ min of Zone 2 per week. These maintenance sessions contribute to that total. Low-intensity cardio on off days or between sessions does NOT impair strength/hypertrophy when total volume is managed." : "The aerobic system powers your recovery between sets. A stronger aerobic base = shorter rest periods needed = more volume in the same time."}`;
      break;
    }
    // ── YOGA & MOBILITY ────────────────────────────────────────────────────────
    case "yoga_mobility": {
      workout   = "Yoga & Mobility";
      intensity = "Low";
      steps = [
        "Sun salutation flow — 3 rounds at a slow, controlled pace (breath-linked movement)",
        "DEEP HIP OPENER SEQUENCE (10 min):",
        "  ▸ Pigeon pose — 60–90s each side",
        "  ▸ Hip 90/90 — 60s each side",
        "  ▸ Lizard pose — 60s each side",
        "THORACIC MOBILITY (5 min):",
        "  ▸ Thread-the-needle — ×10 each side",
        "  ▸ T-spine rotation on foam roller — 10 reps",
        "LOWER BODY STRETCH (5 min): Hamstring, calf, quad",
        "BREATHING / SAVASANA (5 min): Box breathing — 4s in, 4s hold, 4s out, 4s hold",
        `MOBILITY COACHING: ${level === "advanced" ? "Advanced athletes: mobility training is non-negotiable. Tight hips limit squat depth; restricted thoracic spine limits overhead pressing. Poor mobility means poor technique at heavy loads." : "Range of motion is a trainable fitness quality, just like strength. The more you improve it, the safer and more effective every other session becomes."}`,
      ];
      notes = `MOBILITY PRINCIPLE: Consistent mobility work (2–3× per week) is one of the highest-ROI training investments available. Improved range of motion means better technique, more muscle activation, and lower injury risk in every strength session. ${level === "advanced" ? "Hip flexor and thoracic spine restrictions are the two most common limiters for advanced lifters — both are addressed in this session. If you've been skipping mobility sessions, your strength ceiling is lower than it should be." : "Beginners and intermediates: if you do nothing else for recovery, do this session every week. The return on investment is disproportionately high."}`;
      break;
    }
    // ── HIIT MAINTENANCE ───────────────────────────────────────────────────────
    case "hiit_maintain": {
      workout   = "HIIT Maintenance";
      intensity = hasCardio ? "Low-Med" : "Medium-High";
      steps = [
        "WARM-UP (5 min): March, arm swings, leg swings",
        "3 rounds, 40s work / 20s rest:",
        `  ▸ ${hasKnee ? "Step touch ×20" : level === "advanced" ? "Squat jump ×15" : "Squat jump ×12"}`,
        "  ▸ Push-up ×10",
        "  ▸ Mountain climber — controlled pace",
        `  ▸ ${hasCardio ? "March on spot ×30s" : "Burpee ×8"}`,
        "COOL-DOWN (5 min): Walk, slow breathing, stretch",
        "MAINTENANCE HIIT: 3 rounds is sufficient to maintain anaerobic fitness and work capacity. The goal today is to stay in shape, not improve — save the max effort for building phases.",
      ];
      notes = `HIIT MAINTENANCE: Short, high-intensity sessions (3 rounds, 3× per week) maintain cardiovascular and anaerobic fitness with minimal fatigue cost. ${hasCardio ? "HEALTH ADAPTATION: Intensity kept at moderate level. If any exercise causes symptoms, slow down or substitute the safer alternative." : "Maintenance HIIT is not 'taking it easy' — it's strategic. You're maintaining all your fitness qualities with less total volume, leaving energy for other priorities."}`;
      break;
    }
    // ════════════════════════════════════════════════════════════════════════
    // CALISTHENICS SESSIONS
    // ════════════════════════════════════════════════════════════════════════
    case "cali_skill": {
      workout = "Calisthenics — Skill & Static Holds"; intensity = "Medium";
      steps = [
        "WARM-UP (8 min): Wrist circles ×20, shoulder dislocations ×15, scapular push-ups ×15, cat-cow ×10, dead hang 30s",
        "SKILL BLOCK (practice fresh — always before any fatigue):",
        level === "beginner"
          ? "  ▸ Wall handstand — 5 × 20–30s hold | Hollow body: ribs down, arms by ears, EYES on hands"
          : level === "intermediate"
          ? "  ▸ Freestanding handstand practice — 10 min total | Kick up, find balance, do NOT rush. Quality > volume"
          : "  ▸ Handstand push-up — 5 × max quality reps (deficit on parallettes for advanced)",
        level === "beginner"
          ? "  ▸ L-sit on floor or parallettes — 5 × max hold (build to 10–15s per set)"
          : level === "intermediate"
          ? "  ▸ Planche lean — 5 × 15s | Shoulders must travel IN FRONT of hands — that forward lean IS the exercise"
          : "  ▸ Tuck or straddle planche hold — 5 × 10–15s | Protract scapula hard, push floor away",
        level === "beginner"
          ? "  ▸ Scapular pull-up — 3×12 | Dead hang, depress + retract scapula WITHOUT bending elbows. Foundation of every pull."
          : level === "intermediate"
          ? "  ▸ Tuck front lever — 5 × 10–15s hold | Body parallel to ground. Active scapular depression required."
          : "  ▸ Front lever pull-up — 5 × 4–6 reps | Start in front lever, pull to chest. Maximum lat engagement.",
        "SHOULDER PREHAB (mandatory): 3 × 15 band external rotation + 3 × 15 face pull",
        "COOL-DOWN (8 min): Wrist extension and flexion stretch 60s each, shoulder flexion wall stretch, thoracic extension",
        "SKILL LAW: Skills require a fresh nervous system. This session is always done FIRST in the week — never after fatigue.",
      ];
      notes = `CALISTHENICS SKILL PRINCIPLE: Static strength skills (planche, front lever, handstand) are neurological skills AS MUCH as strength feats — they require deliberate practice when fully recovered. ${level === "beginner" ? "Beginners: the wall handstand is not trivial — it's the foundation of all overhead pressing in calisthenics. Perfect your hollow body position (ribs down, posterior pelvic tilt, straight line from shoulder to heel) before any freestanding attempts. Most beginners need 4–8 weeks on the wall." : level === "intermediate" ? "Intermediate: the freestanding handstand is the single most important gatekeeper skill in calisthenics. Without it, handstand push-ups and planche pressing are inaccessible. Invest 10 min of daily practice — even on rest days. The adaptation is neurological, not muscular." : "Advanced: at this level, skill progressions are non-linear. Missing one week of practice regresses skills significantly more than missing a week of strength training. Daily skill practice (even 5 min) maintains the neurological pattern."}`;
      break;
    }
    case "cali_push": {
      workout = "Calisthenics — Push Strength"; intensity = "High";
      steps = [
        "WARM-UP (8 min): Wrist mobility, scapular push-ups ×15, band pull-apart ×20, shoulder warm-up",
        level === "beginner"
          ? ex("Push-up — hollow body, elbows at 45°, full depth", sets, "8-12", "3s descent. If you cannot maintain hollow body position, drop to knees. Form > reps.")
          : level === "intermediate"
          ? ex("Ring push-up or weighted push-up (+10–15kg vest)", sets, "8-10", "Rings: TURN RINGS OUT at the top — this is the key cue. Externally rotate to fully lock the shoulder position.")
          : ex("Ring dip or weighted dip (+20–30kg)", sets, "6-8", "Full depth: shoulders BELOW elbows at the bottom. This is the loaded position that builds strength."),
        level === "beginner"
          ? acc("Archer push-up — 3×6 each side", "3", "6 each", "Extend one arm straight to the side while pressing through the other. Harder than it looks — it's the bridge to one-arm push-up.")
          : level === "intermediate"
          ? acc("Pike push-up or wall headstand push-up", setsAcc, "6-10", "Vertical pressing pattern — trains the anterior deltoid specifically for handstand push-up. Feet elevated increases difficulty.")
          : acc("Straddle or tuck planche push-up", setsAcc, "3-5", "Every planche push-up rep is a near-maximal isometric + press. RPE 10 is expected and correct."),
        level === "beginner"
          ? acc("Tricep dip on bench or floor — 3×12", setsAcc, "12", "Full ROM: lockout at top, deep dip at bottom. Triceps are 60% of pressing strength.")
          : acc("Weighted tricep dip or ring dip + isometric hold at bottom", setsAcc, "8-10", "Pause 2s at bottom position — this eliminates the bounce and maximises the range of motion stimulus."),
        "Scapular push-up — 3×12 | Protract: push the ground away at the top. This trains serratus anterior — ESSENTIAL for planche.",
        "COOL-DOWN (5 min): Wrist extension stretch 60s, chest opener, shoulder flexion stretch",
        `PROGRESSION PATH: Push-up → Archer push-up → One-arm push-up | Dip → Weighted dip → Ring dip → Planche push-up`,
      ];
      notes = `CALISTHENICS PUSH PRINCIPLE: ${level === "beginner" ? "A proper push-up — hollow body, elbows at 45°, forehead touching the floor, arms fully locked at top — is a genuine strength test. Most 'push-up' form in gyms would not qualify. Do not progress until you can do 3×15 with textbook form. The form discipline you build now carries through every future progression." : level === "intermediate" ? "Ring push-ups and ring dips are fundamentally different from bar equivalents — the rings must be actively stabilised throughout the movement, recruiting a wider range of stabilisers. Start with internally-rotated hands and progress to the turned-out finish over weeks." : "Advanced planche push-up: this is one of the hardest pressing movements in existence. Even elite gymnasts with years of training find it supremely difficult. Expect each step of the progression to take months. The protracted scapula position (serratus strength) is the hidden key — most lifters have never trained this specifically."}`;
      break;
    }
    case "cali_pull": {
      workout = "Calisthenics — Pull Strength"; intensity = "High";
      steps = [
        "WARM-UP (8 min): Dead hang 30s, scapular pull-up ×10, band pull-apart ×20, wrist rotations",
        level === "beginner"
          ? ex("Dead hang — 5 × 30–45s + Scapular pull-up — 3×12", "3", "12", "FOUNDATION: build hang tolerance before pull-up attempts. Scapular pull-up = engage lats WITHOUT bending elbows. This is harder than it sounds.")
          : level === "intermediate"
          ? ex("Weighted pull-up (+10–15kg) or L-sit pull-up", sets, "5-8", "L-sit pull-up: hold your legs parallel to the floor throughout the entire pull. Core and hip flexors work simultaneously with lats.")
          : ex("One-arm pull-up progression: archer pull-up or heavily assisted one-arm", sets, "4-6 each", "Archer: extend non-working arm fully sideways on the bar. Gradually reduce its contribution over weeks."),
        level === "beginner"
          ? acc("Negative pull-up — 3×5 (5s lowering phase)", "3", "5", "Jump to the top, LOWER AS SLOWLY AS POSSIBLE. 5 seconds minimum. This builds the eccentric strength needed for the concentric pull faster than any other method.")
          : level === "intermediate"
          ? acc("Chest-to-bar pull-up — 3×6–8", setsAcc, "6-8", "Chest-to-bar is not just 'more' than chin-over-bar — it recruits the lower lats through a longer range of motion. This is the prerequisite for muscle-ups.")
          : acc("Front lever row — 3×5", setsAcc, "5", "Hold front lever position (body horizontal), pull bar to chest. Arguably the most demanding back exercise in existence."),
        level === "beginner"
          ? acc("Ring row (inverted) — 3×12 | Angle determines difficulty", setsAcc, "12", "Feet forward makes it harder. Work toward horizontal body position (full difficulty).")
          : level === "intermediate"
          ? acc("Muscle-up progression — 3×3–5 (band-assisted or kipping)", setsAcc, "3-5", "Muscle-up = pull-up into dip transition. Prerequisites: 3×5 chest-to-bar pull-ups. Do NOT attempt without this base.")
          : acc("Strict muscle-up — 3×5 (no kip) or weighted muscle-up", setsAcc, "5", "Strict muscle-up is the gold standard. No kip = full tricep + lat + transition strength requirement."),
        "Face pull or band external rotation — 3×20 | Non-negotiable shoulder health maintenance for all calisthenics athletes",
        "COOL-DOWN (5 min): Lat stretch (hang and lean), bicep/forearm stretch, shoulder cross-body",
        `PROGRESSION PATH: Dead hang → Negative → Pull-up → Weighted → L-sit → Chest-to-bar → Muscle-up → One-arm`,
      ];
      notes = `CALISTHENICS PULL PRINCIPLE: ${level === "beginner" ? "If you cannot do one pull-up: do ONLY negatives (jump to top, lower for 5s) for 4–6 weeks. 3 sets of 5 negatives with a 5s descent is the fastest method known for developing pulling strength from zero. Better than bands, better than lat pulldowns, better than assisted machines." : level === "intermediate" ? "The muscle-up transition (the bit between the pull and the dip) is the hardest part. Practice the transition separately — jump to bar and practice the 'hip to the bar' motion. Most muscle-up failures happen here, not in the pull or the push." : "One-arm pull-up represents perhaps 2–3 years of dedicated training beyond the regular pull-up for most people. The archer pull-up (assisted arm on bar alongside working arm, gradually reducing assistance) is the only effective progression method."}`;
      break;
    }
    case "cali_legs": {
      workout = "Calisthenics — Leg Strength & Power"; intensity = "High";
      steps = [
        "WARM-UP (8 min): Hip circles ×15 each, leg swings ×15 each, ankle rotations ×20, deep squat hold 60s",
        level === "beginner"
          ? ex("Full-depth bodyweight squat", sets, "15-20", "Parallel = hips BELOW knees. If mobility limits depth, work on it daily — it's a prerequisite for everything that follows.")
          : level === "intermediate"
          ? ex("Bulgarian split squat (rear foot elevated)", sets, "10 each", "Front foot far enough forward that shin stays vertical. Full depth. Bodyweight only OR +10–20kg vest.")
          : ex("Pistol squat or weighted pistol (+10–20kg)", sets, "8 each", "PREREQUISITES: full-depth bodyweight squat ×20, ankle mobility adequate. Lower all the way down (hip crease below knee) with heel flat."),
        level === "beginner"
          ? acc("Reverse lunge — 3×12 each", setsAcc, "12 each", "Step BACK — reduces forward knee shear and improves hip flexor loading. Upright torso throughout.")
          : level === "intermediate"
          ? acc("Shrimp squat (rear foot in hand, or loose) — 3×6 each", setsAcc, "6 each", "Harder than it looks. Rear knee touches floor in full depth. Bridge between split squat and pistol squat.")
          : acc("Nordic hamstring curl — 3×6 (3–5s lowering) | Anchor feet under anything heavy", setsAcc, "6", "The gold-standard hamstring eccentric exercise. Lower as SLOWLY as possible. Catch yourself before the floor. Most evidence-supported injury prevention drill in sport science."),
        level === "intermediate" || level === "advanced"
          ? acc("Single-leg hip thrust on bench — 3×12 each", setsAcc, "12 each", "Maximum glute contraction is at FULL hip extension with neutral spine. Drive the hip up, squeeze 1–2s at top.")
          : acc("Glute bridge — 3×20 | Drive hips, squeeze hard, 2s hold at top", setsAcc, "20", "Build to single-leg as strength improves."),
        "Single-leg calf raise on step (full ROM) — 3×20 each | FULL stretch at bottom: calves grow in the stretched position",
        level === "advanced"
          ? "Plyometric complex: box jump ×5 + broad jump ×5 + lateral bound ×5 each — 3 rounds (2 min rest between)"
          : "Jump squat — 3×10 | Land toe-to-heel, absorbing into quarter-squat. Soft landing is a trainable skill.",
        "COOL-DOWN (5 min): Deep squat hold 60s, hip 90/90 60s each, hamstring stretch 60s, couch stretch 60s each",
        `PROGRESSION PATH: Squat → Lunge → Split squat → Shrimp squat → Pistol squat → Weighted pistol`,
      ];
      notes = `CALISTHENICS LEG PRINCIPLE: The pistol squat is the ultimate calisthenics leg benchmark — a full single-leg squat from standing to the floor and back, demonstrating unilateral strength, balance, and ankle/hip mobility simultaneously. ${level === "beginner" ? "Prerequisites for pistol: 3×20 full-depth bilateral squat with perfect form AND sufficient ankle dorsiflexion (you can squat with heels flat, torso upright). Work on both simultaneously. Most people need 2–6 months before a first pistol." : level === "intermediate" ? "Nordic hamstring curls are more effective for hamstring injury prevention than any other exercise — more than deadlifts, more than leg curls, more than anything. 2 sets per week halves hamstring injury rates in sport (BJSM, 2019 meta-analysis)." : "Advanced: weighted pistol squats with a 20kg vest challenge even elite calisthenics athletes. Adding explosive plyometric work on top builds the fast-twitch component that bodyweight alone cannot reach."}`;
      break;
    }
    case "cali_conditioning": {
      workout = "Calisthenics — Conditioning Circuit"; intensity = "Medium-High";
      steps = [
        "WARM-UP (5 min): Jumping jacks ×30, arm circles, leg swings, 10 air squats",
        `CIRCUIT — ${level === "beginner" ? "3" : "4"} rounds | 40s work / 20s rest within each round | 90s rest between rounds:`,
        `  ▸ PUSH: ${level === "beginner" ? "Push-up ×max (perfect form only)" : level === "intermediate" ? "Ring push-up ×max" : "Ring dip ×max or weighted dip"}`,
        `  ▸ PULL: ${level === "beginner" ? "Australian pull-up (inverted row) ×max" : level === "intermediate" ? "Pull-up ×max" : "Weighted pull-up or chest-to-bar ×max"}`,
        `  ▸ LEGS: ${level === "beginner" ? "Squat ×20" : level === "intermediate" ? "Bulgarian split squat ×10 each" : "Pistol squat ×8 each (or jump squat with weight)"}`,
        `  ▸ CORE: ${level === "beginner" ? "Plank hold 30s" : level === "intermediate" ? "Hollow body hold 30s" : "L-sit on parallettes 20–25s"}`,
        `  ▸ EXPLOSIVE: ${level === "beginner" ? "Mountain climber ×20 (controlled)" : level === "intermediate" ? "Burpee ×8" : "Clapping push-up ×6 + jump tuck ×6"}`,
        "BENCHMARK FINISHER: 5 min AMRAP — push-ups + pull-ups alternating (max reps each). Log your combined score.",
        "COOL-DOWN (5 min): Full body stretch",
        `CONDITIONING NOTE: This circuit trains strength-endurance — repeated force production under fatigue. This quality is what allows muscle-ups for reps, handstand holds under fatigue, and advanced skill work in later sets.`,
      ];
      notes = `CALISTHENICS CONDITIONING: ${level === "beginner" ? "Beginner circuit: prioritise form over speed. A push-up where your chest doesn't touch the floor is not a push-up — it's a missed rep. The 40s/20s protocol gives you time to reset form between reps if needed." : level === "intermediate" ? "The 5-min AMRAP finisher (push-up + pull-up alternating) is your progress benchmark. The combined push + pull total tells you your work capacity more accurately than any single exercise. Track it every 2 weeks." : "Advanced: explosive variations (clapping push-ups, jump tucks) recruit fast-twitch motor units — the type responsible for muscle-up power and explosive skill transitions. Never train these under fatigue from earlier sets."}`;
      break;
    }

    // ── DEFAULT ────────────────────────────────────────────────────────────────
    default: {
      workout   = "General Fitness Session";
      intensity = "Medium";
      steps = [
        C.warmup,
        ex(chooseMovement(profile,"squat"), "3", "8-10", "Squat: fundamental human movement pattern — focus on full range and control"),
        ex(chooseMovement(profile,"horizontalPush"), "3", "8-10", "Push: chest, shoulders, triceps — 2s descent, drive up"),
        ex(chooseMovement(profile,"horizontalPull"), "3", "8-10", "Pull: back, biceps — lead with elbows"),
        acc(chooseMovement(profile,"core"), "3", "40s", "Core: brace and breathe"),
        "COOL-DOWN (5 min): Full-body stretch",
        `PROGRESSION: ${C.progressionNote}`,
      ];
      notes = `${C.phaseNote} | Well-rounded session covering all major movement patterns: squat, push, pull, and core. These four patterns, trained consistently with progressive overload, produce comprehensive fitness for any goal.`;
      break;
    }

    // ════════════════════════════════════════════════════════════════════════
    // RUNNING SESSIONS
    // ════════════════════════════════════════════════════════════════════════
    case "run_easy": {
      workout = "Easy Run — Zone 2 Aerobic Base"; intensity = "Low";
      const easyDur = level === "beginner" ? "20–30" : level === "intermediate" ? "35–50" : "45–70";
      steps = [
        "WARM-UP (5 min): Brisk walk, then build pace gradually over the first 5 min",
        `EASY RUN — ${easyDur} min at CONVERSATIONAL PACE (Zone 2: you can speak full sentences comfortably)`,
        "Effort: 60–70% max HR. If you can't speak, slow down. If you feel you could go for hours, the pace is correct.",
        level === "beginner" ? "BEGINNER TIP: Run/walk intervals are perfectly valid — e.g. 3 min run / 1 min walk. Build to continuous running over weeks." : level === "advanced" ? "ADVANCED: Track your average HR. If it drifts above Zone 2 (75% max HR) late in the run, you started too fast." : "Track your average pace — easy runs should be 60–90s per km SLOWER than your 5k race pace.",
        "COOL-DOWN (5 min): Walk, followed by calf and hip flexor stretch",
        `PROGRESSION: ${level === "beginner" ? "Add 10% to weekly mileage at most per week. Never add volume and intensity in the same week." : level === "intermediate" ? "Easy runs form 70–80% of all running volume — the aerobic base supports every other session." : "Elite runners do 80–90% of their training at this pace. The easy run IS the training, not just warmup."}`,
      ];
      notes = `EASY RUN PRINCIPLE: Zone 2 cardio builds mitochondrial density — the cellular machinery for endurance. ${level === "beginner" ? "For beginners, every run should feel easy. Racing pace comes later; aerobic base comes first." : level === "intermediate" ? "Intermediate runners often go too hard on easy days and too easy on hard days — both mistakes. Keep easy days GENUINELY easy." : "Advanced: the easy run protects you from the fatigue that accumulates from interval sessions. Run it slow enough that you could run another hour."}`;
      break;
    }
    case "run_intervals": {
      workout = "Run Intervals — Speed & VO₂max"; intensity = "High";
      const intervals = level === "beginner" ? "6 × 1 min hard / 2 min jog recovery" : level === "intermediate" ? "6–8 × 400m at 5k pace (or 1 min 45s), 90s jog recovery" : "8–12 × 400m at 3k pace OR 5 × 1000m at 5k pace, 2 min recovery";
      steps = [
        "WARM-UP (10–15 min): 10 min easy jog + 4 × 20s strides (near-sprint, then decelerate naturally)",
        `MAIN SET: ${intervals}`,
        "Effort: 90–95% max HR on work intervals. You should NOT be able to speak during intervals.",
        "Recovery: jog at easy pace (don't stand still — keeps blood flowing and speeds recovery)",
        level === "advanced" ? "ADVANCED VARIANT: finish with 4 × 200m at mile race pace — sprint finish practice" : "If a later interval feels significantly harder than the first at the same pace, the pace is too fast. Consistency across all reps = good pacing.",
        "COOL-DOWN (10 min): 8 min easy jog + full lower body stretch (hamstrings, hip flexors, calves)",
        `PROGRESSION: Add 1 rep per session (max: ${level === "beginner" ? "10 intervals" : "16 × 400m"}) before increasing pace.`,
      ];
      notes = `INTERVAL COACHING: ${level === "beginner" ? "New runners: time-based intervals (1 min hard / 2 min easy) are better than pace-based until you have 8+ weeks of consistent running. Don't worry about pace — worry about effort." : level === "intermediate" ? "VO₂max sessions improve your aerobic ceiling — the maximum pace your aerobic system can sustain. These are hard sessions and need 48–72h of easy running before the next hard session." : "Advanced: VO₂max is the strongest single predictor of endurance performance. 2× per week of interval work (with easy runs filling the rest of volume) is the optimal dose for trained runners."}`;
      break;
    }
    case "run_tempo": {
      workout = "Tempo Run — Lactate Threshold"; intensity = "Medium-High";
      const tempoDur = level === "beginner" ? "2 × 8 min (with 3 min easy jog between)" : level === "intermediate" ? "3 × 10 min at threshold OR 20–25 min continuous" : "30–40 min continuous tempo OR 3 × 15 min at HM pace";
      steps = [
        "WARM-UP (10 min): 8 min easy jog + dynamic drills (high knees, butt kicks, leg swings)",
        `TEMPO BLOCK: ${tempoDur}`,
        "Effort: 80–85% max HR — 'comfortably hard'. You can say a few words but not hold a conversation.",
        "Target pace: approximately 20–30 seconds per km slower than 10k race pace",
        "Focus: smooth, controlled stride — do NOT start faster than target pace",
        "COOL-DOWN (10 min): 8 min easy jog + lower body stretch",
        `PROGRESSION: ${level === "beginner" ? "Build tempo from 2×8 min → 2×12 min → 1×20 min over 6 weeks before increasing pace." : "When you can complete the full tempo block at target pace feeling controlled (RPE 7–8), increase by 5 min or reduce pace by 5s/km."}`,
      ];
      notes = `TEMPO COACHING: Tempo runs elevate your lactate threshold — the pace at which lactic acid accumulates faster than it can be cleared. Raising this threshold is the single most effective training tool for 5k–marathon improvement. ${level === "beginner" ? "Beginners: broken tempo (intervals with rest) is perfectly valid before building to continuous tempo. The adaptation is the same." : level === "advanced" ? "Advanced: marathon race pace IS approximately lactate threshold pace for well-trained runners. Tempo work = race-specific training." : ""}`;
      break;
    }
    case "run_long": {
      workout = "Long Run — Aerobic Endurance"; intensity = "Low-Med";
      const longDur = level === "beginner" ? "35–50 min easy" : level === "intermediate" ? "60–90 min easy (last 20 min at moderate effort optional)" : "90–150 min easy with optional marathon-pace miles";
      steps = [
        "WARM-UP: Start at easy walk/jog for first 5 min — no warm-up needed beyond the first miles",
        `LONG RUN: ${longDur} at easy/conversational pace (Zone 1–2 throughout)`,
        "Hydration: carry water for runs over 45 min; consider electrolytes over 75 min",
        level === "intermediate" ? "OPTIONAL PROGRESSION FINISH: last 20 min at slightly faster than easy pace (Zone 3) — simulates race fatigue" : level === "advanced" ? "ADVANCED: last 30 min at marathon goal pace — the most effective advanced long run technique (Jack Daniels / Pete Pfitzinger)" : "Beginner: run/walk is completely valid. Goal is TIME on feet, not pace.",
        "COOL-DOWN: Last 5 min easy walk",
        `10% Rule: never increase long run distance by more than 10% per week. The most common cause of running injury is too much too soon.`,
      ];
      notes = `LONG RUN PRINCIPLE: The long run builds aerobic efficiency, fat adaptation, and mental resilience. ${level === "beginner" ? "For beginner runners, the long run is the most important session of the week. Build it patiently — 4 weeks at each distance before progressing." : level === "intermediate" ? "Intermediate: the long run should be 20–30% of your weekly mileage. Run it 60–90s per km slower than 5k pace. Recovery the following day is critical." : "Advanced: long runs at easy pace preserve running economy and build mitochondrial density without excessive fatigue cost. The classic Pete Pfitzinger approach of 18–22 week marathon build with long runs up to 35–38km remains the gold standard."}`;
      break;
    }
    case "run_strength": {
      workout = "Runner's Strength — Injury Prevention & Force"; intensity = "Medium";
      steps = [
        C.warmup,
        acc("Single-leg squat (pistol progression) or Bulgarian split squat", setsAcc, "8-10 each", "Unilateral leg strength is the #1 running injury prevention tool. Control every rep."),
        acc("Nordic hamstring curl OR hamstring curl (slow eccentric)", setsAcc, "6-8", "3–5s lowering phase — the most evidence-supported hamstring injury prevention exercise"),
        acc("Calf raise (straight leg) + calf raise (bent knee/soleus)", "3", "20 each", "Runners need 30+ strong calf contractions per minute. High-rep, full-ROM calf work is essential."),
        acc("Hip thrust or single-leg glute bridge", setsAcc, "12-15", "Weak glutes = the primary cause of IT band syndrome and knee pain in runners"),
        acc("Dead bug — 3×10 each side", "3", "10 each", "Anti-extension core: protects the spine under running impact"),
        acc("Hip 90/90 stretch — 60s each side + hip flexor stretch", "1", "60s each", "Hip mobility directly affects running stride length and efficiency"),
        "COOL-DOWN (5 min): Full lower body mobility sequence",
        `RUNNER'S STRENGTH NOTE: Plyometrics (jump squats, box jumps, hops) should be added after 4–6 weeks of strength base. Reactive strength improves running economy by 2–8% (research: Dr. Stuart McMillan).`,
      ];
      notes = `RUNNER'S STRENGTH PRINCIPLE: Strength training improves running economy (how efficiently you use oxygen at a given pace) by 2–8% — equivalent to weeks of extra mileage. ${level === "beginner" ? "Beginner runners: 2× strength sessions/week alongside your runs. Focus on single-leg exercises — these replicate running biomechanics." : level === "advanced" ? "Advanced runners: heavy strength work (80–85% 1RM) in the off-season builds the force production capacity that speed work later refines. Don't limit to bodyweight or light weights." : "Intermediate: strength training DOES NOT impair endurance when programmed correctly. Separate from hard run days; pair with easy run days."}`;
      break;
    }

    // ════════════════════════════════════════════════════════════════════════
    // CYCLING SESSIONS
    // ════════════════════════════════════════════════════════════════════════
    case "cycle_easy": {
      workout = "Easy Ride — Aerobic Base (Zone 2)"; intensity = "Low";
      const rideDur = level === "beginner" ? "30–45 min" : level === "intermediate" ? "60–90 min" : "90–120 min";
      steps = [
        "WARM-UP: First 10 min easy spinning — cadence 85–95 rpm",
        `MAIN RIDE: ${rideDur} at Zone 2 (60–70% FTP / conversational pace)`,
        hasEquipment(profile, "bike") ? "If on a trainer: maintain 85–95 rpm, low resistance, stable power output" : "Outdoors: choose a flat-to-rolling route, avoid steep climbs that force Zone 3+",
        "HEART RATE TARGET: 65–75% of max HR. You should be able to hold a conversation easily.",
        "COOL-DOWN: Last 10 min easy spin, stretch quads, hip flexors, lower back",
        `CADENCE NOTE: Higher cadence (90+ rpm) at lower resistance builds aerobic efficiency and reduces muscular fatigue — the foundation of cycling economy.`,
      ];
      notes = `ZONE 2 CYCLING: The majority (70–80%) of all training for competitive cyclists is Zone 2. It builds the aerobic base, mitochondrial density, and fat metabolism capacity that underpin performance at all intensities. ${level === "beginner" ? "Beginners: 30–45 min Zone 2 is meaningful training. Your aerobic system will adapt rapidly in the first 6–8 weeks." : level === "advanced" ? "Advanced: if you use a power meter, Zone 2 = 56–75% FTP. Session consistency matters more than session length. 2 × 90 min per week builds elite aerobic base." : "Track: if you finish an easy ride and feel 'I could've gone harder' — that's correct. Easy means EASY."}`;
      break;
    }
    case "cycle_intervals": {
      workout = "Cycling Intervals — VO₂max & Power"; intensity = "High";
      const cycleSet = level === "beginner" ? "5 × 3 min at 'hard but sustainable' effort / 3 min easy spin recovery" : level === "intermediate" ? "5–6 × 5 min at VO₂max effort (106–120% FTP) / 5 min easy recovery" : "6–8 × 5 min at VO₂max (110–120% FTP) OR 3–4 × 8 min sweet spot (88–94% FTP)";
      steps = [
        "WARM-UP (15 min): 10 min easy spin + 3 × 30s high-cadence (100+ rpm) build efforts with 60s recovery",
        `MAIN SET: ${cycleSet}`,
        "Effort: VO₂max intervals — breathless but controlled. Sweet spot — 'uncomfortably comfortable'.",
        level === "advanced" ? "POWER DATA: aim for consistent power output across all intervals (±5%). Power fade > 5% = started too hard." : "Perceived effort: 8–9/10 on work intervals. If you feel you could do 10 more intervals, the effort is too easy.",
        "Recovery: easy spin (50–60% FTP / 70 rpm) between intervals — keep legs turning",
        "COOL-DOWN (10–15 min): Easy spin, stretch quads, hamstrings, hip flexors, lower back",
        `PROGRESSION: Add 1 interval per session until you reach maximum, then increase intensity or interval duration.`,
      ];
      notes = `CYCLING INTERVALS COACHING: VO₂max intervals (5–6 min at maximum sustainable aerobic effort) are the most effective method for raising cycling power output. ${level === "beginner" ? "Beginner cyclists: time-based intervals by perceived effort are perfectly valid before purchasing a power meter. Hard = breathless but controlled." : level === "intermediate" ? "If you use a power meter, these intervals target Zone 5 (106–120% FTP). If not, breathless-but-controlled is your guide. Allow 48h of easy riding before and after VO₂max work." : "Advanced: periodise your VO₂max work in 3–4 week blocks with 1 deload week. Sustained VO₂max interval work beyond 6 weeks produces diminishing returns without recovery."}`;
      break;
    }
    case "cycle_tempo": {
      workout = "Sweet Spot / Tempo — Threshold Power"; intensity = "Medium-High";
      const sweepDur = level === "beginner" ? "3 × 10 min at threshold effort / 5 min easy" : level === "intermediate" ? "2–3 × 20 min at sweet spot (88–94% FTP) / 5 min recovery" : "2 × 30 min sweet spot OR 60 min continuous tempo (76–90% FTP)";
      steps = [
        "WARM-UP (15 min): Easy spin building to 80% FTP over the last 5 min",
        `MAIN SET: ${sweepDur}`,
        "Effort: 'Comfortably hard' — sustainable for 45–60 min at race pace",
        "Sweet spot = 88–94% FTP / ~7–8/10 RPE / you can speak a few words but not hold a conversation",
        "Maintain cadence 85–95 rpm throughout — do NOT grind a big gear",
        "COOL-DOWN (10 min): Easy spin, stretch",
        `PROGRESSION: Sweet spot is the highest-yield training zone per fatigue cost. Build from shorter intervals to continuous blocks before increasing intensity.`,
      ];
      notes = `SWEET SPOT / TEMPO COACHING: Sweet spot training (88–94% FTP) produces the highest ratio of training benefit to recovery cost of any cycling intensity. ${level === "beginner" ? "Beginners: threshold effort by feel (sustainable for ~30 min but very challenging) is sufficient. Build to 3 × 10 min before progressing." : level === "intermediate" ? "Intermediate: 2–3 sweet spot sessions per week of 20–30 min each builds FTP (Functional Threshold Power) rapidly. This is the core of most structured cycling training plans." : "Advanced: when FTP improvements slow from sweet spot work alone, add VO₂max intervals to the programme. Sweet spot remains the foundation; intervals provide the ceiling."}`;
      break;
    }
    case "cycle_long": {
      workout = "Long Ride — Aerobic Endurance"; intensity = "Low-Med";
      const longRide = level === "beginner" ? "60–90 min easy" : level === "intermediate" ? "2–3 hours at Zone 2 with optional tempo segments" : "3–5+ hours with controlled Zone 2, optional hard climbs";
      steps = [
        "FUELLING: Start eating at 45 min (don't wait until you're hungry). Target: 60–90g carbohydrate/hour on rides over 2 hours.",
        `MAIN RIDE: ${longRide} at Zone 2 / easy-to-moderate effort`,
        "PACING: Many cyclists go too hard early. If you feel great after 60 min, that's perfect — do NOT accelerate.",
        level === "advanced" ? "OPTIONAL: Include 2–3 hard climbs or 15–20 min at sweet spot in the middle of the ride — simulates race fatigue" : "Keep most of the ride at Zone 2. Terrain changes are fine — the effort should stay controlled.",
        "HYDRATION: 500–750ml/hour. More in heat. Add electrolytes on efforts over 2 hours.",
        "COOL-DOWN: Last 15 min easy spin",
        `LONG RIDE COACHING: Build long ride duration by no more than 15 min per week. The long ride is the backbone of cycling endurance — it cannot be replaced by shorter hard sessions.`,
      ];
      notes = `LONG RIDE PRINCIPLE: The long ride at Zone 2 pace builds fat oxidation, mitochondrial density, and cardiac efficiency in ways that no other training can replicate. ${level === "beginner" ? "60–90 min is a legitimate long ride for beginners. Your aerobic system can't yet use longer sessions productively without excessive fatigue." : level === "advanced" ? "Advanced cyclists: the long ride should be 30–40% of weekly volume. Fuelling correctly (60–90g carbs/hr) is as important as the ride itself — don't train yourself to bonk." : ""}`;
      break;
    }
    case "cycle_strength": {
      workout = "Cyclist's Strength — Power & Injury Prevention"; intensity = "Medium";
      steps = [
        C.warmup,
        acc("Bulgarian split squat OR single-leg press", setsAcc, "8-10 each", "Unilateral leg strength directly transfers to cycling power asymmetry — most cyclists have a stronger leg"),
        acc("Romanian deadlift (dumbbell or barbell)", setsAcc, repsAcc, "Hamstring strength prevents cycling-specific hamstring tendinopathy and adds power to the pull phase of the pedal stroke"),
        acc("Hip thrust / glute bridge", setsAcc, "12-15", "Glute activation at top of pedal stroke is a major power source — many cyclists are glute-inactive on the bike"),
        acc("Copenhagen adductor plank — 3×20s each", "3", "20s each", "Groin/adductor strength: protects against the most common cycling-specific hip injury"),
        acc("Single-leg calf raise", "3", "15-20 each", "Cycling doesn't train calf eccentrics — compensate here to prevent achilles issues"),
        acc("Plank + bird dog superset", "3", "45s + 8 each", "Core stability in aero position — prevents lower back pain on long rides"),
        "COOL-DOWN (5 min): Hip flexor stretch (cycling shortens hip flexors chronically), thoracic extension over foam roller",
        `STRENGTH NOTE: Even 1–2 strength sessions/week improves cycling power by 3–7% (Norwegian research). Start in the off-season; maintain 1 session during race season.`,
      ];
      notes = `CYCLIST'S STRENGTH: Cycling is a dominant sport for the quads and cardiovascular system but creates muscular imbalances — tight hip flexors, weak glutes, weak posterior chain, and anterior knee pain (from quad dominance). This session addresses all of them. ${level === "advanced" ? "Advanced cyclists: heavy strength work (4–6 rep range) in the off-season (Nov–Feb) builds the neuromuscular power base that race-season intervals then convert to speed. Do not skip heavy work." : "2× strength/week alongside cycling improves economy, power, and injury resistance — the evidence is clear and strong."}`;
      break;
    }

    // ════════════════════════════════════════════════════════════════════════
    // SWIMMING SESSIONS
    // ════════════════════════════════════════════════════════════════════════
    case "swim_technique": {
      workout = "Swim — Technique & Drills"; intensity = "Low";
      const drillVol = level === "beginner" ? "800–1200m total" : level === "intermediate" ? "1500–2000m total" : "2000–2500m total";
      steps = [
        `WARM-UP: 200m easy freestyle at comfortable pace`,
        `DRILL SET (${drillVol} total):`,
        "  ▸ 4 × 50m catch-up drill — pauses at full extension, builds bilateral timing",
        "  ▸ 4 × 50m fingertip drag — high elbow recovery, prevents dropped elbow",
        "  ▸ 4 × 50m single-arm drill — full extension on non-pulling side, builds feel for the water",
        level === "beginner" ? "  ▸ Breathing drills: 4 × 25m breathing every 2 strokes (alternating sides)" : "  ▸ 4 × 50m side-kick balance drill — bilateral balance, core rotation",
        "  ▸ 4 × 50m at controlled pace focusing on ONE technique cue: 'high elbow catch'",
        "COOL-DOWN: 100m easy backstroke or breaststroke",
        "TECHNIQUE CUE: The 'catch' phase (when your hand grabs the water) determines 80% of propulsive efficiency — all drills today target this.",
      ];
      notes = `SWIMMING TECHNIQUE PRINCIPLE: Unlike running and cycling, swimming performance is dominated by technique (not fitness) for most people. A poor swimmer with great fitness will be beaten by a slower-fitness swimmer with good technique. ${level === "beginner" ? "Beginners: consider 1–2 lessons with a qualified swim coach before programmed training. Video analysis of your stroke is worth more than weeks of untutored laps." : level === "advanced" ? "Advanced: schedule one technique-focused session per week permanently. Even elite swimmers lose technique cues under fatigue — routine drill work maintains the pattern." : "Intermediate: the 'high elbow catch' is the single most impactful technique improvement for recreational swimmers. All drills in this session target it."}`;
      break;
    }
    case "swim_endurance": {
      workout = "Swim — Aerobic Endurance"; intensity = "Low-Med";
      const swimVol = level === "beginner" ? "600–1000m" : level === "intermediate" ? "1500–2500m" : "2500–4000m";
      steps = [
        `WARM-UP: 200m easy, alternating strokes every 50m`,
        `MAIN SET — continuous or broken swims (${swimVol} total):`,
        level === "beginner" ? "  ▸ 6–10 × 100m at comfortable pace, 30s rest between" : level === "intermediate" ? "  ▸ 4–6 × 300m at aerobic pace, 30–45s rest | Focus: consistent split times" : "  ▸ 3–4 × 500m at moderate aerobic effort, 30s rest | Focus: negative splits (faster second half)",
        "  ▸ Aim for CONSISTENT pace across all reps — don't start fast and fade",
        "STROKE COUNT: Count your strokes per length. Fewer strokes at the same time = better technique. Track this weekly.",
        "COOL-DOWN: 200m easy + stretching (lats, shoulders, hip flexors)",
        `AEROBIC SWIM NOTE: Build total volume by no more than 10% per week. Shoulder overuse injuries are the most common swimming injury — stop if you feel impingement.`,
      ];
      notes = `SWIM ENDURANCE COACHING: ${level === "beginner" ? "Beginner swimmers: continuous swimming for 10+ min is a genuine milestone. Build to it with rest intervals — there is no shame in rest during swims. Your technique breaks down faster when fatigued, which ingrams bad habits." : level === "intermediate" ? "Intermediate: 2,000m+ per session 3× per week is the threshold where meaningful aerobic adaptation occurs for swimming. Consistency over 12–16 weeks produces dramatic improvements." : "Advanced: periodise between high-volume (5,000–8,000m/session) base-building blocks and lower-volume, higher-intensity race-specific blocks. Total weekly yardage of 25,000–40,000m is the norm for competitive swimmers."}`;
      break;
    }
    case "swim_intervals": {
      workout = "Swim — Interval Speed Set"; intensity = "High";
      const swimInts = level === "beginner" ? "8 × 50m fast / 30s rest" : level === "intermediate" ? "10 × 100m at 90–95% effort / 20s rest" : "16 × 100m on a 1:45 sendoff OR 8 × 200m on a 3:30 sendoff";
      steps = [
        "WARM-UP: 300–400m easy mixed strokes + 4 × 25m build (easy → fast)",
        `MAIN SET: ${swimInts}`,
        "Effort: 9/10 on fast intervals — by the last 25m you should be working at your limit",
        "REST: use the full rest — recovery between intervals is what enables the next interval to be fast",
        level === "advanced" ? "SENDOFF: a 1:45 per 100m sendoff means you leave the wall every 1 min 45s regardless of rest time. Adjust to keep rest at 10–20s." : "Focus on maintaining stroke count (efficiency) even when fatigued — this is where interval training differs from racing.",
        "COOL-DOWN: 300–400m easy, stretch shoulders/lats thoroughly",
        `PROGRESSION: Reduce rest by 5s once you can complete all reps without significant pace drop.`,
      ];
      notes = `SWIM INTERVAL COACHING: Speed training improves stroke mechanics under fatigue — the specific skill required in open water and competition. ${level === "beginner" ? "Beginner: 50m intervals allow maximum technique quality per interval. Don't attempt longer intervals until you can maintain form for 50m at effort." : level === "intermediate" ? "Intermediate: 100m intervals are the cornerstone of swimming fitness development. 10 × 100m with 20s rest at near-maximum effort is a globally used benchmark set." : "Advanced: the 'sendoff' format (timed send-off intervals) is the standard competitive swim training format. Your goal is to hold pace AND technique on every rep — fatigue-resistance IS the adaptation."}`;
      break;
    }
    case "swim_dryland": {
      workout = "Dryland Strength — Swimming Power"; intensity = "Medium";
      steps = [
        C.warmup,
        acc("Lat pulldown or pull-up (pronated grip)", setsAcc, repsAcc, "The lat pulldown directly mimics the underwater pull phase — the primary power stroke in freestyle"),
        acc("Seated cable row (wide grip) or dumbbell row", setsAcc, repsAcc, "Mid-back and rhomboid strength supports high-elbow catch position"),
        acc("Face pull — 3×15 + band external rotation — 3×15", "3", "15", "Shoulder external rotators are the most injury-prone muscles in swimming. High volume, every session."),
        acc("Tricep pushdown or overhead extension", setsAcc, repsAcc, "Triceps drive the push phase of every stroke"),
        acc("Rotational medicine ball throw OR woodchop", "3", "10 each", "Core rotation power directly transfers to hip-driven freestyle stroke"),
        acc("Hip flexor + lat stretch circuit", "1", "60s each", "Swimming chronically shortens hip flexors and lats — counteract with deliberate stretching"),
        "COOL-DOWN (5 min): Shoulder mobility, chest opener, lat stretch",
        `DRYLAND NOTE: Shoulder impingement is the #1 reason swimmers stop training. Prioritise external rotator exercises (face pull, band rotation) in EVERY dryland session.`,
      ];
      notes = `SWIM DRYLAND COACHING: ${level === "beginner" ? "Beginner swimmers benefit enormously from lat and back strength — most beginners lack the pulling power to maintain stroke rate over a full lap. 2× dryland sessions/week before pool sessions shows measurable improvement within 4–6 weeks." : level === "advanced" ? "Advanced: power-focused dryland (medicine ball, explosive pull variations) improves stroke rate and distance-per-stroke simultaneously. Integrate plyometric push-ups and explosive rows in the off-season." : "Intermediate: the shoulder external rotator complex (infraspinatus, teres minor) is chronically undertrained in most swimmers. This causes rotator cuff impingement. Band external rotation work — even 3 sets of 15 every session — is the most effective prevention."}`;
      break;
    }

    // ════════════════════════════════════════════════════════════════════════
    // TRIATHLON / MULTISPORT
    // ════════════════════════════════════════════════════════════════════════
    case "brick_workout": {
      workout = "Brick Session — Bike to Run"; intensity = "Medium-High";
      const brickBike = level === "beginner" ? "20–30 min moderate cycle" : level === "intermediate" ? "45–60 min Zone 2–3 cycle" : "60–90 min with 15–20 min at race pace";
      const brickRun  = level === "beginner" ? "10–15 min easy jog" : level === "intermediate" ? "20–30 min run at easy-to-moderate pace" : "30–45 min run, first 10 min easy then build to race pace";
      steps = [
        `CYCLE BLOCK: ${brickBike} — keep it aerobic (Zone 2); last 5 min slightly higher cadence (100 rpm) to prepare muscles for the run`,
        `TRANSITION: Change shoes quickly. First steps will feel heavy — this is normal (it's called 'brick legs'). DO NOT stop.`,
        `RUN BLOCK: ${brickRun}`,
        "BRICK EFFECT: Your quads feel dead for the first 5–10 min of running — this is the physiological adaptation you're training. The feeling diminishes with repetition.",
        "PACING: Start the run 20–30s per km slower than your standalone running pace. Allow the transition fatigue to clear.",
        "COOL-DOWN: 5 min easy walk + full stretch (focus on hip flexors and quads from cycling)",
        `BRICK NOTE: Do bricks ${level === "beginner" ? "every 2–3 weeks" : level === "intermediate" ? "once per week" : "1–2× per week in race build"} — they are the most race-specific training tool in triathlon.`,
      ];
      notes = `BRICK SESSION PRINCIPLE: The 'brick legs' sensation occurs because your neuromuscular system needs to switch from the cycling pattern (circular force, seated) to the running pattern (linear, upright). Training this transition is a specific physiological adaptation — it CANNOT be replicated by cycling and running separately. ${level === "beginner" ? "Even a 15 min easy run after 20 min of cycling teaches the neuromuscular switch. Start short; build the duration and intensity over weeks." : level === "advanced" ? "Advanced: race-specific bricks (race-pace cycling into race-pace running) are the highest-specificity training for triathlon. Schedule them in the 6–8 weeks before your A-race." : ""}`;
      break;
    }

    // ════════════════════════════════════════════════════════════════════════
    // CROSSFIT / FUNCTIONAL FITNESS
    // ════════════════════════════════════════════════════════════════════════
    case "cf_strength": {
      workout = "CrossFit Strength — Barbell Foundations"; intensity = "High";
      const cfSets = level === "beginner" ? "3" : "4-5";
      const cfReps = level === "beginner" ? "5" : level === "intermediate" ? "3-5" : "1-5";
      steps = [
        C.warmup,
        ex(chooseMovement(profile,"squat"), cfSets, cfReps, `Strength cycle: ${level === "beginner" ? "add weight every session (LP)" : level === "intermediate" ? "wave loading — heavier each set" : "work to a heavy 3RM or 5×3 at 80–85% 1RM"}`),
        ex(hasShldr ? "Push-up" : chooseMovement(profile,"horizontalPush"), cfSets, cfReps, "Pressing strength is the limiting factor in many gymnastics movements — prioritise it"),
        ex(chooseMovement(profile,"hinge"), cfSets, cfReps, "Deadlift/hinge: the foundational movement for all CrossFit pulling and Olympic lifting"),
        acc(chooseMovement(profile,"horizontalPull"), setsAcc, repsAcc, "Pulling strength supports kipping pull-ups, muscle-ups, and rowing"),
        acc(chooseMovement(profile,"core"), setsAcc, "45s", "Hollow body / L-sit progression: the foundation of CrossFit gymnastics"),
        "COOL-DOWN (8 min): Thoracic extension, hip flexor, lats",
        `STRENGTH NOTE: ${level === "beginner" ? "CrossFit beginners need 8–12 weeks of dedicated strength work BEFORE attempting WODs at full intensity. Build the movement patterns first." : "Strength training outside of metcons allows heavier loads and more deliberate technique — critical for Olympic lifting progression."}`,
      ];
      notes = `CF STRENGTH PRINCIPLE: CrossFit's intensity is its greatest asset and greatest liability. Without an adequate strength base, high-intensity WODs produce injury rather than adaptation. ${level === "beginner" ? "Spend your first 2–3 months building barbell competency (squat, press, deadlift, clean) before adding conditioning. This is not optional — it's injury prevention." : level === "advanced" ? "Advanced CrossFit athletes periodise: strength blocks in the off-season, skill work year-round, metcon intensity peaks before competitions. The Conjugate method (Westside-derived) is popular at this level." : "Intermediate: separate your strength work from your conditioning work. Heavy back squats do not pair well with a 20-min AMRAP — do them on different days or with 4+ hours between."}`;
      break;
    }
    case "cf_wod": {
      workout = "CrossFit WOD — Conditioning"; intensity = "High";
      const wod = level === "beginner"
        ? "AMRAP 12 min: 5 push-ups, 10 air squats, 15 sit-ups (modify all to your ability)"
        : level === "intermediate"
        ? "For Time: 21-15-9 of Thrusters (light-moderate) + Pull-ups (scaled: ring rows). Target: under 15 min"
        : "DIANE: 21-15-9 of Deadlifts (heavy, 70–80kg/50kg) + Handstand push-ups. Target: under 10 min";
      steps = [
        "WARM-UP (10 min): 400m easy jog, 10 inchworms, 10 deep squats, 10 shoulder circles, practice movements at light weight",
        `WOD: ${wod}`,
        "STRATEGY: Start at 70% of what feels possible. Most athletes go out too fast and hit the wall. Consistent pacing beats sprint-and-die.",
        level === "beginner" ? "SCALE: Every CrossFit movement has a scaled version. Scaling correctly is expert training — it is NOT failure. Ask a coach for scaling options." : "REST: Plan short strategic rests BEFORE you have to rest. Breaking sets early is faster than failing sets.",
        "LOG YOUR SCORE: WOD scores are your progress markers. Track time, rounds, reps.",
        "COOL-DOWN (8 min): Easy movement, thoracic rotation, hip stretch",
        `CF NOTE: High-intensity WODs should make up 3–4 sessions per week maximum. More intensity without adequate recovery produces overtraining, not fitness.`,
      ];
      notes = `WOD COACHING: CrossFit WODs combine strength, gymnastics, and metabolic conditioning in a way that produces broad fitness. ${level === "beginner" ? "Beginners: scaling IS the programme. A properly scaled WOD is more effective (and safer) than a Rx WOD done with poor form. There is no ego in CrossFit; there is only results." : level === "intermediate" ? "Intermediate: study movement standards before each WOD. The majority of CrossFit injuries occur when athletes rush transitions between movements under fatigue — 3s of reset between movements is almost never slower than sloppy transitions." : "Advanced: competition CrossFit demands mastery of Olympic lifting under fatigue. Video your metcon lifts occasionally — technique deteriorates significantly under metabolic stress and without video you won't see it."}`;
      break;
    }

    // ════════════════════════════════════════════════════════════════════════
    // COMBAT SPORTS
    // ════════════════════════════════════════════════════════════════════════
    case "combat_conditioning": {
      workout = "Combat Conditioning — GPP & Power"; intensity = "High";
      steps = [
        "WARM-UP (10 min): Shadow boxing 3 min, jump rope 3 min, dynamic mobility 4 min",
        `STRENGTH CIRCUIT — ${level === "beginner" ? "3" : "4"} rounds:`,
        `  ▸ ${hasEquipment(profile,"barbell") ? "Deadlift 3×5 (heavy)" : "Explosive push-up or clap push-up ×10"} — maximal power output`,
        "  ▸ Medicine ball slam or slam ball ×12 — rotational hip power",
        `  ▸ Chin-up or pull-up ×${level === "beginner" ? "5-8" : "8-12"} — clinch and grappling pulling strength`,
        "  ▸ Lateral bound ×10 each — lateral movement and explosive hip extension",
        "  ▸ Plank with rotation ×10 each — rotational core for striking power",
        "  ▸ Rest 90 seconds between rounds",
        `CONDITIONING FINISHER: ${level === "beginner" ? "3 × 2 min rounds with 1 min rest — shadow box or pad work at moderate intensity" : "5 × 3 min rounds with 1 min rest — shadow box, bag work, or pad work"}`,
        "COOL-DOWN (8 min): Full stretch, breathwork",
      ];
      notes = `COMBAT S&C PRINCIPLE: Combat sports require explosive power (striking, takedowns), muscular endurance (grappling), aerobic base (rounds), and mental resilience. ${level === "beginner" ? "Beginners: your primary training is technical (skill-based, on the mat). S&C is SUPPLEMENTARY. 2 sessions/week of GPP work alongside 3–4 technical sessions is the right ratio." : level === "advanced" ? "Advanced: periodise your combat S&C around your fight/competition calendar. Heavy strength phases 8–12 weeks out; power phases 4–6 weeks out; taper/maintenance in fight camp." : "Intermediate: prioritise movements that directly transfer — deadlifts for takedown power, pull-ups for clinch, rotational work for striking power, conditioning for round capacity."}`;
      break;
    }
  }
  return { workout, steps, notes, intensity };
}

// ── SPLIT SELECTION ───────────────────────────────────────────────────────────
// Evidence-based rules (ACSM 2026, NSCA, Schoenfeld meta-analyses, RP Strength):
//   BEGINNERS  → Full Body 3×/week always (highest neurological adaptation frequency)
//   INTERMEDIATE → Upper/Lower 4× (2× muscle frequency = hypertrophy sweet spot)
//              → PPL 5–6× when training frequency is high
//   ADVANCED   → PPL 5–6× (need higher volume per muscle per week)
//   FAT LOSS   → Resistance training preserved at every level (preserves muscle in deficit)
//   MAINTENANCE→ Strength base maintained with cardio/mobility added
function selectSplit(profile, numDays) {
  const level = profile.level || "beginner";
  const goal  = profile.goal;
  const sport = detectSport(profile.fitnessExperience);

  // ════════════════════════════════════════════════════════════════════════
  // SPORT-SPECIFIC ROUTES — override gym split for endurance/sport athletes
  // ════════════════════════════════════════════════════════════════════════

  if (sport === "running") {
    // Running programmes: zone 2 base is king; 1 strength session per week
    if (level === "beginner") {
      const keys = ["run_easy","run_strength","run_easy"].slice(0, Math.min(numDays,3));
      return { type:"running", keys, rationale:`Running Beginner ${keys.length}×/week — building your aerobic base with easy runs and one dedicated strength session. Beginners should run 3× max to allow connective tissue adaptation. The 10% mileage rule applies.` };
    }
    if (level === "intermediate") {
      const pool = ["run_easy","run_intervals","run_easy","run_tempo","run_strength","run_long"];
      return { type:"running", keys: pool.slice(0, Math.min(numDays, 5)), rationale:`Running Intermediate ${numDays}×/week — classic 80/20 polarised model: 80% easy, 20% hard. One interval session, one tempo, one long run, one strength session. This structure is used by every major running programme from Pfitzinger to Daniels.` };
    }
    // advanced running
    const pool = ["run_easy","run_intervals","run_easy","run_tempo","run_strength","run_long","run_easy"];
    return { type:"running", keys: pool.slice(0, Math.min(numDays, 6)), rationale:`Running Advanced ${numDays}×/week — polarised training model with high aerobic volume. Two quality sessions (intervals + tempo) per week; all other sessions are Zone 2 easy. Strength work prevents injury and improves running economy.` };
  }

  if (sport === "cycling") {
    if (level === "beginner") {
      const keys = ["cycle_easy","cycle_strength","cycle_easy"].slice(0, Math.min(numDays,3));
      return { type:"cycling", keys, rationale:`Cycling Beginner ${keys.length}×/week — building aerobic base and bike-specific strength. Beginners benefit most from consistent Zone 2 riding and strength work before adding intervals.` };
    }
    if (level === "intermediate") {
      const pool = ["cycle_easy","cycle_intervals","cycle_tempo","cycle_easy","cycle_strength","cycle_long"];
      return { type:"cycling", keys: pool.slice(0, Math.min(numDays, 5)), rationale:`Cycling Intermediate ${numDays}×/week — structured endurance plan: sweet spot work builds FTP; intervals raise VO₂max; long ride builds aerobic base; strength session improves power and prevents injury.` };
    }
    const pool = ["cycle_easy","cycle_intervals","cycle_tempo","cycle_long","cycle_strength","cycle_intervals","cycle_easy"];
    return { type:"cycling", keys: pool.slice(0, Math.min(numDays, 6)), rationale:`Cycling Advanced ${numDays}×/week — high-volume polarised model. Two interval/tempo sessions; one long ride; Zone 2 fill sessions; strength for power transfer and injury prevention.` };
  }

  if (sport === "swimming") {
    if (level === "beginner") {
      const keys = ["swim_technique","swim_dryland","swim_endurance"].slice(0, Math.min(numDays,3));
      return { type:"swimming", keys, rationale:`Swimming Beginner ${keys.length}×/week — technique first, always. Until your freestyle mechanics are sound, adding volume just reinforces bad habits. One dryland session builds the pulling strength that beginners lack.` };
    }
    if (level === "intermediate") {
      const pool = ["swim_technique","swim_endurance","swim_intervals","swim_dryland","swim_endurance"];
      return { type:"swimming", keys: pool.slice(0, Math.min(numDays, 5)), rationale:`Swimming Intermediate ${numDays}×/week — technique drills retained weekly; endurance volume builds; interval session raises aerobic ceiling; dryland strengthens the specific muscles for the pull phase.` };
    }
    const pool = ["swim_intervals","swim_endurance","swim_technique","swim_dryland","swim_intervals","swim_endurance"];
    return { type:"swimming", keys: pool.slice(0, Math.min(numDays, 6)), rationale:`Swimming Advanced ${numDays}×/week — high volume with two interval sessions, regular drills to maintain technique under fatigue, and dryland power work. Weekly volume of 15,000–25,000m is the target range for competitive swimmers at this level.` };
  }

  if (sport === "triathlon") {
    // Triathlon: swim/bike/run + strength + brick
    if (level === "beginner") {
      const keys = ["swim_technique","run_easy","cycle_easy"].slice(0, Math.min(numDays,3));
      return { type:"triathlon", keys, rationale:`Triathlon Beginner ${keys.length}×/week — one session per discipline. Focus: technique in swim, aerobic base in run and cycle. Add a brick session once you're comfortable with each discipline individually (6–8 weeks in).` };
    }
    if (level === "intermediate") {
      const pool = ["swim_endurance","run_easy","cycle_tempo","brick_workout","run_strength","swim_intervals"];
      return { type:"triathlon", keys: pool.slice(0, Math.min(numDays, 5)), rationale:`Triathlon Intermediate ${numDays}×/week — structured multisport plan: dedicated swim, bike, run sessions plus a weekly brick workout for race-specific transition training. Strength work improves economy across all three disciplines.` };
    }
    const pool = ["swim_intervals","run_tempo","cycle_intervals","brick_workout","run_easy","swim_endurance","run_strength"];
    return { type:"triathlon", keys: pool.slice(0, Math.min(numDays, 6)), rationale:`Triathlon Advanced ${numDays}×/week — high-performance multisport plan. VO₂max-targeted sessions in all three disciplines; weekly brick for race specificity; easy sessions protect recovery. Periodise blocks by focusing on weakness disciplines.` };
  }

  if (sport === "crossfit") {
    if (level === "beginner") {
      const keys = ["cf_strength","fullbody_c","cf_strength"].slice(0, Math.min(numDays,3));
      return { type:"crossfit", keys, rationale:`CrossFit Beginner ${keys.length}×/week — strength foundations before WODs. Beginners need 8–12 weeks of movement quality work before high-intensity conditioning. Scaled conditioning finishers only.` };
    }
    const pool = ["cf_strength","cf_wod","cf_strength","cf_wod","active_recovery","cf_wod"];
    return { type:"crossfit", keys: pool.slice(0, Math.min(numDays, 5)), rationale:`CrossFit ${numDays}×/week — strength sessions build the compound movement base; WODs apply it under conditioning stress. 3–4 WODs per week is the evidence-based maximum before recovery is outpaced by fatigue.` };
  }

  if (sport === "combat") {
    const pool = ["combat_conditioning","fullbody_a","combat_conditioning","active_recovery","fullbody_b","combat_conditioning"];
    return { type:"combat", keys: pool.slice(0, Math.min(numDays, 5)), rationale:`Combat Sports S&C ${numDays}×/week — GPP and power conditioning supplementing your technical training. Prioritise technical sessions first; these S&C sessions are supplementary to mat/ring time.` };
  }

  if (sport === "calisthenics") {
    if (level === "beginner") {
      const keys = ["cali_push","cali_pull","cali_legs"].slice(0, Math.min(numDays, 3));
      return { type:"calisthenics", keys, rationale:`Calisthenics Beginner ${keys.length}×/week — foundation push, pull, and leg progressions. At the beginner stage, developing the three foundational movement patterns (pressing, pulling, single-leg) sets you up for every advanced skill that follows. 3 days/week allows full CNS recovery between sessions.` };
    }
    if (level === "intermediate") {
      const pool = ["cali_skill","cali_push","cali_pull","cali_legs","cali_conditioning"];
      return { type:"calisthenics", keys: pool.slice(0, Math.min(numDays, 5)), rationale:`Calisthenics Intermediate ${numDays}×/week — dedicated skill session (handstand/front lever/planche) always first, then push/pull strength with progressions, leg work, and conditioning. The intermediate stage is where the headline skills (muscle-up, freestanding handstand) become reachable.` };
    }
    const pool = ["cali_skill","cali_push","cali_pull","cali_legs","cali_conditioning","cali_skill"];
    return { type:"calisthenics", keys: pool.slice(0, Math.min(numDays, 6)), rationale:`Calisthenics Advanced ${numDays}×/week — two dedicated skill sessions, push/pull/legs with elite progressions (planche, front lever, weighted variants), and conditioning. Advanced calisthenics athletes train skill elements daily and alternate push/pull emphasis to manage shoulder fatigue.` };
  }

  if (sport === "team_sport") {
    // Team sports: power, speed, and sport-specific conditioning
    const pool = ["fullbody_a","hiit_a","lower_quad","fullbody_b","active_recovery","hiit_b"];
    return { type:"team_sport", keys: pool.slice(0, Math.min(numDays, 5)), rationale:`Team Sport S&C ${numDays}×/week — compound strength for force production, HIIT for repeated sprint ability, lower body power for acceleration and jumping. These are the physical qualities that transfer most directly to team sport performance.` };
  }

  // ════════════════════════════════════════════════════════════════════════
  // GYM / LIFTING DEFAULT (original evidence-based logic)
  // ════════════════════════════════════════════════════════════════════════

  if (level === "beginner") {
    const capped = Math.min(numDays, 3);
    if (goal === "lose") {
      return { type:"fullbody", keys:["fullbody_a","metabolic","fullbody_b"].slice(0,capped), rationale:`Full Body ${capped}×/week with metabolic conditioning. Beginners ALWAYS train full body — maximum neurological adaptation. Fat loss comes from your caloric deficit, not from cardio replacing lifting.` };
    }
    return { type:"fullbody", keys:["fullbody_a","fullbody_b","fullbody_c"].slice(0,capped), rationale:`Full Body ${capped}×/week — the evidence-based standard for beginners (ACSM 2026). Training each muscle 3× per week maximises the novice neurological adaptation and enables Linear Progression.` };
  }

  if (level === "intermediate") {
    if (goal === "lose") {
      if (numDays <= 3) return { type:"fullbody", keys:["fullbody_a","metabolic","cardio_core"].slice(0,numDays), rationale:`Full Body + Conditioning ${numDays}×/week. Resistance training in a deficit preserves muscle and metabolic rate better than cardio alone.` };
      if (numDays === 4) return { type:"upper_lower", keys:["upper_push","cardio_a","lower_quad","upper_pull"], rationale:`Upper/Lower ${numDays}×/week with cardio. Strength work preserves muscle while you cut; cardio session maximises calorie expenditure.` };
      return { type:"fat_loss", keys:["upper_push","cardio_a","lower_quad","upper_pull","lower_hinge","cardio_core"].slice(0,numDays), rationale:`Strength + Cardio Hybrid ${numDays}×/week. Superior to cardio-only for body composition at the intermediate level.` };
    }
    if (goal === "maintain") {
      if (numDays <= 3) return { type:"maintain", keys:["strength_maintain","cardio_maintain","yoga_mobility"].slice(0,numDays), rationale:`Balanced Maintenance ${numDays}×/week: strength, cardio, and mobility.` };
      return { type:"maintain", keys:["strength_maintain","cardio_maintain","yoga_mobility","hiit_maintain","strength_maintain","cardio_maintain"].slice(0,numDays), rationale:`Balanced Maintenance ${numDays}×/week — full-spectrum training maintains strength, aerobic fitness, and mobility simultaneously.` };
    }
    if (numDays <= 3) return { type:"fullbody", keys:["fullbody_a","fullbody_b","fullbody_c"].slice(0,numDays), rationale:`Full Body ${numDays}×/week — at 3 days, full body remains the most volume-efficient option.` };
    if (numDays === 4) return { type:"upper_lower", keys:["upper_push","lower_quad","upper_pull","lower_hinge"], rationale:`Upper/Lower 4×/week — each muscle trained 2× per week with heavy and volume DUP sessions.` };
    return { type:"ppl", keys:["push_a","pull_a","legs_a","push_b","pull_b","legs_b"].slice(0,numDays), rationale:`Push/Pull/Legs ${numDays}×/week — higher total weekly volume with DUP variation across A and B sessions.` };
  }

  // advanced gym
  if (goal === "lose") return { type:"fat_loss", keys:["upper_push","hiit_a","lower_quad","upper_pull","lower_hinge","cardio_core"].slice(0,numDays), rationale:`Strength + Conditioning ${numDays}×/week. Advanced athletes maintain high stimulus in deficit to prevent muscle loss.` };
  if (goal === "maintain") return { type:"maintain", keys:["strength_maintain","cardio_maintain","yoga_mobility","hiit_maintain","strength_maintain","cardio_maintain"].slice(0,numDays), rationale:`Advanced Maintenance ${numDays}×/week — above Maintenance Volume but below Maximum Adaptive Volume.` };
  if (numDays <= 4) return { type:"upper_lower", keys:["upper_push","lower_quad","upper_pull","lower_hinge"].slice(0,numDays), rationale:`Upper/Lower ${numDays}×/week — sufficient per-session volume for advanced demands with full recovery between sessions.` };
  return { type:"ppl", keys:["push_a","pull_a","legs_a","push_b","pull_b","legs_b"].slice(0,numDays), rationale:`Push/Pull/Legs ${numDays}×/week — 15–25 sets/muscle/week with A/B block-level variation.` };
}

// ── TIME UTILITIES ────────────────────────────────────────────────────────────
function parseTimeToMins(hhmm, fallback = "18:30") {
  const [h, m] = (hhmm || fallback).split(":").map(Number);
  return (isNaN(h) || isNaN(m)) ? 18*60+30 : h*60+m;
}
function minsToTime(v) {
  const s = Math.max(5*60, Math.min(22*60, v));
  return `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
}
function addMins(hhmm, mins) { return minsToTime(parseTimeToMins(hhmm) + mins); }

// ── CALENDAR ──────────────────────────────────────────────────────────────────
let importedCalEvents = [];
let manualCalEvents   = [];

// Returns all calendar events (imported + manually entered) merged together
function allCalEvents() { return [...importedCalEvents, ...manualCalEvents]; }

function getEventsForDate(events, date) {
  return events.filter(e => e.dateKey === date.toDateString());
}
function findConflictFreeSlot(dayEvents, proposedStartMins, duration) {
  const BUFFER = 25;
  const propEnd = proposedStartMins + duration;
  const real = dayEvents.filter(e => !e.allDay);
  const conflicts = real.filter(e => !(propEnd + BUFFER <= e.startMins || proposedStartMins >= e.endMins + BUFFER));
  if (!conflicts.length) return { startMins: proposedStartMins, conflictWith: null };
  const lastEnd   = Math.max(...real.map(e => e.endMins));
  const firstStart= Math.min(...real.map(e => e.startMins));
  let chosen = lastEnd + BUFFER;
  if (proposedStartMins < 13*60 && firstStart - duration - BUFFER >= 6*60) chosen = firstStart - duration - BUFFER;
  chosen = Math.max(6*60, Math.min(22*60 - duration, chosen));
  return { startMins: chosen, conflictWith: conflicts[0].title };
}

function toGCalDate(date, hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date(date); d.setHours(h, m, 0, 0);
  const p = n => String(n).padStart(2,"0");
  return `${d.getFullYear()}${p(d.getMonth()+1)}${p(d.getDate())}T${p(d.getHours())}${p(d.getMinutes())}00`;
}
function buildCalendarLink(dayPlan) {
  const date = new Date(dayPlan.dateISO);
  const details = [`FitSync — ${dayPlan.splitName}`, `Duration: ${dayPlan.duration} min`, `Equipment: ${dayPlan.equipmentSummary}`, ...dayPlan.steps, dayPlan.notes].join("\n");
  return "https://calendar.google.com/calendar/render?" + new URLSearchParams({
    action:"TEMPLATE",
    text:`${dayPlan.day} — ${dayPlan.workout}`,
    dates:`${toGCalDate(date,dayPlan.start)}/${toGCalDate(date,addMins(dayPlan.start,dayPlan.duration))}`,
    details,
    location: dayPlan.equipmentSummary || "Home / Gym",
  }).toString();
}

function escapeICS(v) { return String(v||"").replace(/\\/g,"\\\\").replace(/\n/g,"\\n").replace(/,/g,"\\,").replace(/;/g,"\\;"); }
function formatICSDate(d, hhmm) {
  const date = new Date(d);
  if (hhmm) { const [h,m] = hhmm.split(":").map(Number); date.setHours(h,m,0,0); }
  const p = v => String(v).padStart(2,"0");
  return `${date.getFullYear()}${p(date.getMonth()+1)}${p(date.getDate())}T${p(date.getHours())}${p(date.getMinutes())}00`;
}
function buildICS(planItems) {
  const stamp = formatICSDate(new Date());
  const events = planItems.map((item,i) => [
    "BEGIN:VEVENT",
    `UID:fitsync-${i}-${Date.now()}@fitsync`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${formatICSDate(item.dateISO, item.start)}`,
    `DTEND:${formatICSDate(item.dateISO, addMins(item.start, item.duration))}`,
    `SUMMARY:${escapeICS(`${item.day} — ${item.workout}`)}`,
    `DESCRIPTION:${escapeICS([...item.steps, item.notes].join("\n"))}`,
    `LOCATION:${escapeICS(item.equipmentSummary||"Home / Gym")}`,
    "END:VEVENT",
  ].join("\r\n")).join("\r\n");
  return ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//FitSync//EN","CALSCALE:GREGORIAN",events,"END:VCALENDAR"].join("\r\n");
}
function downloadCalFile(filename, content) {
  const blob = new Blob([content], {type:"text/calendar;charset=utf-8"});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a"); a.href=url; a.download=filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(url), 0);
}
window.downloadAllICS = function() {
  const plan = getData("currentPlan");
  if (!plan?.days?.length) { showToast("No plan found — generate a plan first.", "warning"); return; }
  downloadCalFile("fitsync-week.ics", buildICS(plan.days));
  showToast("Downloading your full week .ics file…", "success");
};
window.downloadSingleICS = function(dateISO) {
  const plan = getData("currentPlan");
  if (!plan) return;
  const day = plan.days.find(d => d.dateISO === dateISO);
  if (!day) return;
  downloadCalFile(`fitsync-${day.day.toLowerCase()}.ics`, buildICS([day]));
};

// ── GOOGLE CALENDAR ───────────────────────────────────────────────────────────
window.connectGoogleCalendar = function() {
  const clientId = localStorage.getItem("googleClientId");
  if (!clientId) { showToast("Please set up your Google Client ID first.", "warning"); toggleClientIdSetup(); return; }
  try {
    const client = google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: "https://www.googleapis.com/auth/calendar.readonly",
      callback: res => {
        if (res.error) { showToast("Failed to connect to Google Calendar.", "error"); return; }
        fetchCalendarEvents(res.access_token);
      },
    });
    client.requestAccessToken();
  } catch { showToast("Google Calendar API not loaded. Check your internet connection.", "error"); }
};

function fetchCalendarEvents(token) {
  const now = new Date();
  const week = new Date(now.getTime() + 7*864e5);
  fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${now.toISOString()}&timeMax=${week.toISOString()}&singleEvents=true&orderBy=startTime`,
    { headers: { Authorization:`Bearer ${token}`, Accept:"application/json" } })
    .then(r => r.json())
    .then(data => {
      importedCalEvents = (data.items||[]).map(item => {
        const startDT = item.start.dateTime;
        const endDT   = item.end.dateTime;
        const sd = startDT ? new Date(startDT) : null;
        const ed = endDT   ? new Date(endDT)   : null;
        return {
          title:     item.summary || "Untitled",
          dateKey:   new Date(startDT||item.start.date).toDateString(),
          startMins: sd ? sd.getHours()*60 + sd.getMinutes() : 0,
          endMins:   ed ? ed.getHours()*60 + ed.getMinutes() : 0,
          startTime: sd ? sd.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"}) : "All day",
          endTime:   ed ? ed.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"}) : "All day",
          duration:  (sd&&ed) ? Math.round((ed-sd)/60000) : 0,
          allDay:    !startDT,
        };
      });
      updateCalendarDisplay();
      showToast(`${importedCalEvents.length} calendar events imported.`, "success");
      const btn = document.getElementById("calConnectBtn");
      if (btn) { btn.textContent = "✓ Connected"; btn.style.background="linear-gradient(135deg,#10b981,#14b8a6)"; }
    })
    .catch(() => showToast("Failed to fetch calendar events.", "error"));
}

window.toggleClientIdSetup = function() {
  const p = document.getElementById("clientIdSetup");
  if (p) p.style.display = p.style.display === "none" ? "block" : "none";
};
window.saveClientId = function() {
  const v = document.getElementById("clientIdInput")?.value.trim();
  if (!v) { showToast("Please enter a valid Client ID.", "warning"); return; }
  localStorage.setItem("googleClientId", v);
  showToast("Google Client ID saved!", "success");
  toggleClientIdSetup();
};
window.loadDemoEvents = function() {
  const t = new Date();
  importedCalEvents = [
    { title:"Team Meeting",       dateKey:new Date(t.getTime()+1*864e5).toDateString(), startMins:10*60, endMins:11*60,  startTime:"10:00", endTime:"11:00",  duration:60,  allDay:false },
    { title:"Lunch with Client",  dateKey:new Date(t.getTime()+2*864e5).toDateString(), startMins:750,   endMins:14*60,  startTime:"12:30", endTime:"14:00",  duration:90,  allDay:false },
    { title:"Doctor Appointment", dateKey:new Date(t.getTime()+4*864e5).toDateString(), startMins:15*60, endMins:16*60,  startTime:"15:00", endTime:"16:00",  duration:60,  allDay:false },
  ];
  updateCalendarDisplay();
  showToast("Demo events loaded!", "success");
};
window.toggleManualCalendar = function() {
  const el = document.getElementById("manualCalWrap");
  if (!el) return;
  const opening = el.style.display === "none" || el.style.display === "";
  el.style.display = opening ? "block" : "none";
  if (opening) initManualCalendar();
};

// ── MANUAL CALENDAR ───────────────────────────────────────────────────────────
function initManualCalendar() {
  const grid = document.getElementById("manualCalGrid");
  if (!grid) return;

  const today = new Date();
  const cols  = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dateKey = d.toDateString();
    const dayName  = d.toLocaleDateString("en-GB", { weekday: "short" }).toUpperCase();
    const dayNum   = d.getDate();
    const evts     = manualCalEvents.filter(e => e.dateKey === dateKey);

    const pills = evts.map(e => `
      <div class="mcal-event-pill">
        <span>${e.startTime}–${e.endTime}&nbsp;${e.title}</span>
        <button class="mcal-remove" onclick="removeManualEvent('${e.id}')" title="Remove">×</button>
      </div>`).join("");

    cols.push(`
      <div class="mcal-day" data-datekey="${dateKey}">
        <div class="mcal-day-header">
          <span class="mcal-day-name">${dayName}</span>
          <span class="mcal-day-num">${dayNum}</span>
        </div>
        ${pills}
        <div class="mcal-add-form" id="mcal-form-${i}" style="display:none">
          <input class="mcal-input" type="text" id="mcal-title-${i}" placeholder="Event title" maxlength="50">
          <input class="mcal-input" type="time" id="mcal-start-${i}" value="09:00">
          <input class="mcal-input" type="time" id="mcal-end-${i}"   value="10:00">
          <div style="display:flex;gap:4px;margin-top:2px">
            <button class="mcal-save-btn"   onclick="saveManualEvent('${dateKey}', ${i})">Add</button>
            <button class="mcal-cancel-btn" onclick="hideAddForm(${i})">Cancel</button>
          </div>
        </div>
        <button class="mcal-add-btn" id="mcal-add-btn-${i}" onclick="showAddForm(${i})">+ Add event</button>
      </div>`);
  }

  grid.innerHTML = cols.join("");
}

window.showAddForm = function(i) {
  const form = document.getElementById(`mcal-form-${i}`);
  const btn  = document.getElementById(`mcal-add-btn-${i}`);
  if (form) form.style.display = "flex";
  if (btn)  btn.style.display  = "none";
  document.getElementById(`mcal-title-${i}`)?.focus();
};

window.hideAddForm = function(i) {
  const form = document.getElementById(`mcal-form-${i}`);
  const btn  = document.getElementById(`mcal-add-btn-${i}`);
  if (form) {
    form.style.display = "none";
    const ti = document.getElementById(`mcal-title-${i}`);
    if (ti) ti.value = "";
  }
  if (btn) btn.style.display = "";
};

window.saveManualEvent = function(dateKey, i) {
  const title     = document.getElementById(`mcal-title-${i}`)?.value.trim();
  const startTime = document.getElementById(`mcal-start-${i}`)?.value;
  const endTime   = document.getElementById(`mcal-end-${i}`)?.value;

  if (!title) { showToast("Please enter an event title.", "warning"); return; }
  if (!startTime || !endTime || startTime >= endTime) {
    showToast("End time must be after start time.", "warning"); return;
  }

  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);

  manualCalEvents.push({
    id:        `manual-${Date.now()}`,
    title,
    dateKey,
    startMins: sh * 60 + sm,
    endMins:   eh * 60 + em,
    startTime,
    endTime,
    duration:  (eh * 60 + em) - (sh * 60 + sm),
    allDay:    false,
  });

  initManualCalendar();
  showToast(`"${title}" added.`, "success");
};

window.removeManualEvent = function(id) {
  manualCalEvents = manualCalEvents.filter(e => e.id !== id);
  initManualCalendar();
};
window.triggerICSImport = function() {
  const inp = document.createElement("input"); inp.type="file"; inp.accept=".ics"; inp.style.display="none";
  inp.onchange = e => { const f=e.target.files?.[0]; if(f){const r=new FileReader();r.onload=ev=>parseICSContent(ev.target?.result);r.readAsText(f);} };
  document.body.appendChild(inp); inp.click(); document.body.removeChild(inp);
};
function parseICSContent(ics) {
  const events=[]; let cur=null;
  for (const raw of ics.split(/\r?\n/)) {
    const line = raw.trim();
    if (line==="BEGIN:VEVENT") { cur={}; }
    else if (line==="END:VEVENT" && cur) { if(cur.title&&cur.dateKey) events.push(cur); cur=null; }
    else if (cur) {
      if (line.startsWith("SUMMARY:")) cur.title = line.slice(8);
      else if (line.startsWith("DTSTART")) {
        const raw2 = line.split(":")[1];
        const d = new Date(raw2.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/,"$1-$2-$3T$4:$5:$6"));
        cur.dateKey=d.toDateString(); cur.startMins=d.getHours()*60+d.getMinutes();
        cur.startTime=d.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"}); cur.allDay=!line.includes("T");
      } else if (line.startsWith("DTEND")) {
        const raw2 = line.split(":")[1];
        const d = new Date(raw2.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/,"$1-$2-$3T$4:$5:$6"));
        cur.endMins=d.getHours()*60+d.getMinutes();
        cur.endTime=d.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"});
        if(cur.startMins!==undefined) cur.duration=cur.endMins-cur.startMins;
      }
    }
  }
  importedCalEvents=events; updateCalendarDisplay();
  showToast(`${events.length} events imported from file.`, "success");
}
function updateCalendarDisplay() {
  const timeline = document.getElementById("calTimeline");
  const status   = document.getElementById("calStatus");
  if (!timeline||!status) return;
  if (!importedCalEvents.length) { status.innerHTML=""; timeline.innerHTML=""; return; }
  status.innerHTML=`<strong>${importedCalEvents.length} events imported</strong> — FitSync will schedule your workouts around these.`;
  const byDate={};
  importedCalEvents.forEach(e=>{ (byDate[e.dateKey]=byDate[e.dateKey]||[]).push(e); });
  timeline.innerHTML = Object.keys(byDate).sort().map(dk => {
    const d=new Date(dk);
    return `<div class="cal-day"><div class="cal-day-header">${d.toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short"})}</div>${byDate[dk].map(e=>`<div class="cal-event"><span class="cal-event-time">${e.startTime}–${e.endTime}</span> ${e.title}</div>`).join("")}</div>`;
  }).join("");
}

// ── FORM DATA ─────────────────────────────────────────────────────────────────
function getDynamicTagValues(containerId) {
  const c = document.getElementById(containerId);
  if (!c) return [];
  return Array.from(c.querySelectorAll(".dynamic-tag")).map(t => t.dataset.value || t.dataset.text || "").filter(Boolean);
}
function getDynamicEquipment() {
  const tags = getDynamicTagValues("equipmentTags");
  const mapped = tags.map(mapEquipmentTextToItem).filter(Boolean);
  return mapped.length ? mapped : ["bodyweight"];
}
function getUserProfile() {
  const expText     = (document.getElementById("fitnessLevelText")?.value || "").trim();
  const overrideLvl = document.getElementById("fitnessLevel")?.value || "";
  const level       = overrideLvl || analyzeExperience(expText);
  return {
    goal:               document.getElementById("goal")?.value || "maintain",
    level,
    sessionMinutes:     Number(document.getElementById("sessionMinutes")?.value || 45),
    daysAvailable:      DAY_NAMES.slice(),
    equipmentAvailable: getDynamicEquipment(),
    healthConditions:   getDynamicTagValues("healthConditionTags"),
    dietaryPreferences: getDynamicTagValues("dietaryTags"),
    fitnessExperience:  expText,
    height:             parseFloat(document.getElementById("heightValue")?.value) || undefined,
    weight:             parseFloat(document.getElementById("weightValue")?.value) || undefined,
    heightUnit:         document.getElementById("heightUnit")?.value || "cm",
    weightUnit:         document.getElementById("weightUnit")?.value || "kg",
    locationPreference: document.getElementById("locationPreference")?.value || "indoor",
    workoutSpace:       document.getElementById("workoutSpace")?.value || "full_room",
  };
}

// ── GENERATE PLAN ─────────────────────────────────────────────────────────────
function validateProfile(profile) {
  if (!profile.fitnessExperience.trim())
    return "Please describe your fitness background in Section C so FitSync can personalise your plan.";
  return null;
}

window.generatePlan = function() {
  const profile = getUserProfile();
  const err = validateProfile(profile);
  if (err) { showToast(err, "error"); return; }

  // Determine available days from calendar
  const today = new Date();
  const available = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(today); d.setDate(today.getDate() + i);
    const mins = getEventsForDate(allCalEvents(), d).reduce((s,e)=>s+(e.duration||60),0);
    if (mins < 120) available.push(i);
  }
  if (!available.length) available.push(0,2,4); // fallback Mon/Wed/Fri

  const level   = profile.level || analyzeExperience(profile.fitnessExperience);
  const numDays = recommendTrainingDays(profile.fitnessExperience, level, available.length);
  const split   = selectSplit(profile, numDays);

  // Spread training days evenly across the 7-day window so rest is well-distributed.
  // e.g. 3 days → indices 0, 3, 6 (Mon/Thu/Sun); 4 days → 0, 2, 4, 6; etc.
  function selectSpreadTrainingDays(avail, n) {
    if (n >= avail.length) return new Set(avail);
    if (n === 1) return new Set([avail[0]]);
    const used = new Set();
    const result = new Set();
    for (let i = 0; i < n; i++) {
      const ideal = Math.round(i * 6 / (n - 1));
      let best = null, bestDist = Infinity;
      for (let d = 0; d <= 6; d++) {
        if (avail.includes(d) && !used.has(d)) {
          const dist = Math.abs(d - ideal);
          if (dist < bestDist) { bestDist = dist; best = d; }
        }
      }
      if (best !== null) { result.add(best); used.add(best); }
    }
    return result;
  }
  const trainingIdx = selectSpreadTrainingDays(available, numDays);

  // Always build exactly 7 days (today + 6), marking each as training or rest
  let splitKeyIndex = 0;
  const days = Array.from({length: 7}, (_, i) => {
    const date    = new Date(today); date.setDate(today.getDate() + i);
    const dateISO = date.toISOString().split("T")[0];
    const jsDay   = date.getDay();
    const dayName = DAY_NAMES[jsDay === 0 ? 6 : jsDay - 1];

    if (!trainingIdx.has(i)) {
      // Rest / active recovery day
      return {
        day: dayName, dateISO, isRest: true,
        workout: "Rest & Recovery",
        notes: "Active recovery: light walking, stretching, or mobility work. Prioritise sleep and nutrition to maximise adaptation from your training days.",
        intensity: "Low",
        splitName: "Rest Day",
        duration: 0, start: null, steps: null,
        equipmentSummary: "None",
      };
    }

    const sessionKey = split.keys[splitKeyIndex++ % split.keys.length];
    const dayEvents  = getEventsForDate(allCalEvents(), date);
    const preferred  = profile.locationPreference === "outdoor" ? 9*60 : 18*60;
    const slot       = findConflictFreeSlot(dayEvents, preferred, profile.sessionMinutes);
    const startTime  = minsToTime(slot.startMins);
    const { workout, steps, notes, intensity } = buildWorkoutDay(profile, sessionKey);
    const plan = {
      day: dayName, dateISO, start: startTime, isRest: false,
      duration: profile.sessionMinutes, workout, intensity,
      splitName: SPLIT_DESCRIPTIONS[split.type] || split.type,
      equipmentSummary: formatEquipmentList(profile.equipmentAvailable),
      steps, notes, conflictWith: slot.conflictWith,
    };
    plan.calendarUrl = buildCalendarLink(plan);
    return plan;
  });

  const totalMins = days.reduce((s,d)=>s+d.duration,0);
  const C = getCoaching(level);
  const goalLabel = profile.goal === "lose" ? "fat loss" : profile.goal === "gain" ? "muscle & strength" : "maintenance";
  const splitRationale = split.rationale || `${numDays}-day ${SPLIT_DESCRIPTIONS[split.type]} programme`;
  const coachingSummary = [
    `${numDays}-day ${SPLIT_DESCRIPTIONS[split.type] || split.type} programme — ${level} level, ${goalLabel} goal.`,
    splitRationale,
    `Progression method: ${C.progressionNote}`,
    C.deloadNote,
    `Volume target: ${C.volumeLandmarks}`,
  ].join(" | ");
  const planObj = {
    days, split: split.type,
    splitName: SPLIT_DESCRIPTIONS[split.type] || split.type,
    level, goal: profile.goal,
    summary: coachingSummary,
    splitRationale,
    coachingLevel: C.phaseNote,
    progressionMethod: C.progressionNote,
    deloadGuidance: C.deloadNote,
    totalMins,
    generatedAt: new Date().toISOString(),
  };

  saveData("currentPlan", planObj);
  saveData("planProfile", profile);
  const planHistory = getData("planHistory") || [];
  planHistory.push({ profile, plan: planObj, generatedAt: new Date().toISOString() });
  saveData("planHistory", planHistory);
  clearDashboardForm();
  sessionStorage.setItem("fs_justGenerated", "1");
  showToast("Plan generated! Taking you to your schedule…", "success");
  setTimeout(() => { window.location.href = "schedule.html"; }, 900);
};

// ── SCHEDULE PAGE ─────────────────────────────────────────────────────────────
function intensityClass(intensity) {
  if (!intensity) return "med";
  const l = intensity.toLowerCase();
  if (l.includes("high")) return "high";
  if (l.includes("low"))  return "low";
  return "med";
}

// ── QUOTE DATASET ──────────────────────────────────────────────────────────────
// Real quotes from athletes, coaches, and figures in sport/resilience/mental strength.
// Sourced from verified public record — books, interviews, documentaries, speeches.
const QUOTES = [
  { text: "It never gets easier. You just get stronger.", author: "Anonymous (widely attributed in sport)" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Pain is temporary. Quitting lasts forever.", author: "Lance Armstrong" },
  { text: "Do not pray for an easy life; pray for the strength to endure a difficult one.", author: "Bruce Lee" },
  { text: "Champions aren't made in the gyms. Champions are made from something they have deep inside them — a desire, a dream, a vision.", author: "Muhammad Ali" },
  { text: "I hated every minute of training, but I said, 'Don't quit. Suffer now and live the rest of your life as a champion.'", author: "Muhammad Ali" },
  { text: "The more difficult the victory, the greater the happiness in winning.", author: "Pelé" },
  { text: "You have to expect things of yourself before you can do them.", author: "Michael Jordan" },
  { text: "I can accept failure, everyone fails at something. But I can't accept not trying.", author: "Michael Jordan" },
  { text: "Talent wins games, but teamwork and intelligence win championships.", author: "Michael Jordan" },
  { text: "If you fail to prepare, you prepare to fail.", author: "Mark Spitz" },
  { text: "It's not the will to win that matters — everyone has that. It's the will to prepare to win that matters.", author: "Paul 'Bear' Bryant" },
  { text: "Hard work beats talent when talent doesn't work hard.", author: "Tim Notke" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "The difference between the impossible and the possible lies in a person's determination.", author: "Tommy Lasorda" },
  { text: "Strength does not come from winning. Your struggles develop your strengths. When you go through hardships and decide not to surrender, that is strength.", author: "Arnold Schwarzenegger" },
  { text: "The worst thing I can be is the same as everybody else. I hate that.", author: "Arnold Schwarzenegger" },
  { text: "What hurts today makes you stronger tomorrow.", author: "Jay Cutler" },
  { text: "To be a champion, you have to believe in yourself when nobody else will.", author: "Sugar Ray Leonard" },
  { text: "If something stands between you and your success, move it. Never be denied.", author: "Dwayne 'The Rock' Johnson" },
  { text: "Success isn't always about greatness. It's about consistency. Consistent hard work leads to success. Greatness will come.", author: "Dwayne 'The Rock' Johnson" },
  { text: "Once you've wrestled, everything else in life is easy.", author: "Dan Gable" },
  { text: "Gold medals aren't really made of gold. They're made of sweat, determination, and a hard-to-find alloy called guts.", author: "Dan Jenkins" },
  { text: "Age is no barrier. It's a limitation you put on your mind.", author: "Jackie Joyner-Kersee" },
  { text: "You don't run 26 miles at five minutes a mile on good looks and a secret recipe.", author: "Frank Shorter" },
  { text: "The body achieves what the mind believes.", author: "Jim Evans" },
  { text: "Running is the greatest metaphor for life, because you get out of it what you put into it.", author: "Oprah Winfrey" },
  { text: "Somewhere in the world someone is training when you are not. When you race him, he will win.", author: "Tom Fleming" },
  { text: "Ask yourself: can you run more? Can you run further? Can you run faster? Yes, you can.", author: "Eliud Kipchoge" },
  { text: "No human is limited.", author: "Eliud Kipchoge" },
  { text: "Only the disciplined ones in life are free. If you are undisciplined, you are a slave to your moods and your passions.", author: "Eliud Kipchoge" },
  { text: "Pain is inevitable. Suffering is optional.", author: "Haruki Murakami" },
  { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
  { text: "The finish line is just the beginning of a whole new race.", author: "Anonymous" },
  { text: "There is no substitute for hard work.", author: "Thomas Edison" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "I am a slow walker, but I never walk back.", author: "Abraham Lincoln" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
  { text: "The harder the battle, the sweeter the victory.", author: "Les Brown" },
  { text: "Fall seven times and stand up eight.", author: "Japanese Proverb" },
  { text: "The human body is capable of amazing physical deeds. If we could just free ourselves from our perceived limitations and tap into our internal fire, the possibilities are endless.", author: "Dean Karnazes" },
  { text: "An athlete cannot run with money in his pockets. He must run with hope in his heart and dreams in his head.", author: "Emil Zátopek" },
  { text: "If you want to win, do the ordinary things better than anyone else does them, day in and day out.", author: "Chuck Noll" },
  { text: "I've failed over and over and over again in my life. And that is why I succeed.", author: "Michael Jordan" },
  { text: "Adversity causes some men to break; others to break records.", author: "William Arthur Ward" },
  { text: "One man practising sportsmanship is far better than 50 preaching it.", author: "Knute Rockne" },
  { text: "Continuous improvement is better than delayed perfection.", author: "Mark Twain" },
  { text: "Most people give up just when they're about to achieve success. They quit on the one-yard line.", author: "Ross Perot" },
  { text: "Set your goals high, and don't stop till you get there.", author: "Bo Jackson" },
  { text: "The key is not the will to win. Everyone has that. It is the will to prepare to win.", author: "Bobby Knight" },
  { text: "If it doesn't challenge you, it won't change you.", author: "Fred DeVito" },
  { text: "You can't put a limit on anything. The more you dream, the farther you get.", author: "Michael Phelps" },
  { text: "I think goals should never be easy; they should force you to work, even if they are uncomfortable at the time.", author: "Michael Phelps" },
  { text: "I am building a fire, and every day I train, I add more fuel. At just the right moment, I light the match.", author: "Mia Hamm" },
  { text: "A trophy carries dust. Memories last forever.", author: "Mary Lou Retton" },
  { text: "I've learned that something constructive comes from every defeat.", author: "Tom Landry" },
  { text: "When the going gets tough, the tough get going.", author: "Billy Ocean / Joe Kennedy" },
  { text: "Sport is the most beautiful thing in the world. It has the power to unite people in a way that little else does.", author: "Nelson Mandela" },
  { text: "Sport has the power to change the world. It has the power to inspire. It has the power to unite people in a way that little else does.", author: "Nelson Mandela" },
  { text: "Winning doesn't always mean being first. Winning means you're doing better than you've done before.", author: "Bonnie Blair" },
  { text: "Never give up, never give in, and when the upper hand is ours, may we have the ability to handle the win with the dignity that we absorbed the loss.", author: "Doug Williams" },
  { text: "If you're not making mistakes, then you're not doing anything. I'm positive that a doer makes mistakes.", author: "John Wooden" },
  { text: "It's what you learn after you know it all that counts.", author: "John Wooden" },
  { text: "Be more concerned with your character than your reputation, because your character is what you really are, while your reputation is merely what others think you are.", author: "John Wooden" },
  { text: "Sweat is fat crying.", author: "Anonymous" },
  { text: "Today I will do what others won't, so tomorrow I can accomplish what others can't.", author: "Jerry Rice" },
  { text: "The pain you feel today will be the strength you feel tomorrow.", author: "Anonymous" },
  { text: "Excellence is not a destination; it is a continuous journey that never ends.", author: "Brian Tracy" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "The more you sweat in practice, the less you bleed in battle.", author: "Navy SEALs Proverb" },
  { text: "It ain't over till it's over.", author: "Yogi Berra" },
  { text: "Never let the fear of striking out keep you from playing the game.", author: "Babe Ruth" },
  { text: "There may be people that have more talent than you, but there's no excuse for anyone to work harder than you do.", author: "Derek Jeter" },
  { text: "Just keep going. Everybody gets better if they keep at it.", author: "Ted Williams" },
  { text: "You are never a loser until you quit trying.", author: "Mike Ditka" },
  { text: "Once you've committed to something, see it through.", author: "Roger Bannister" },
  { text: "The man who can drive himself further once the effort gets painful is the man who will win.", author: "Roger Bannister" },
  { text: "Believe me, the reward is not so great without the struggle.", author: "Wilma Rudolph" },
  { text: "Never underestimate the power of dreams and the influence of the human spirit. We are all the same in this notion: the potential for greatness lives within each of us.", author: "Wilma Rudolph" },
  { text: "It's supposed to be hard. If it weren't hard, everyone would do it. The hard is what makes it great.", author: "Tom Hanks (A League of Their Own)" },
  { text: "Most people run a race to see who is fastest. I run a race to see who has the most guts.", author: "Steve Prefontaine" },
  { text: "To give anything less than your best is to sacrifice the gift.", author: "Steve Prefontaine" },
  { text: "Don't be afraid of failure. This is the way to succeed.", author: "LeBron James" },
  { text: "The minute you get away from fundamentals — whether it's proper technique, work ethic, or mental preparation — the bottom can fall out of your game.", author: "Michael Jordan" },
  { text: "For me, life is continuously being hungry. The meaning of life is not simply to exist, to survive, but to move ahead, to go up, to achieve, to conquer.", author: "Arnold Schwarzenegger" },
  { text: "I fear not the man who has practised 10,000 kicks once, but I fear the man who has practised one kick 10,000 times.", author: "Bruce Lee" },
  { text: "Absorb what is useful, discard what is useless, and add what is specifically your own.", author: "Bruce Lee" },
  { text: "Flow with whatever may happen and let your mind be free: stay centred by accepting whatever you are doing. This is the ultimate.", author: "Zhuangzi" },
  { text: "Courage is not having the strength to go on; it is going on when you don't have the strength.", author: "Theodore Roosevelt" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
  { text: "The secret is to work less as individuals and more as a team.", author: "Pelé" },
  { text: "It is not enough to have great qualities; we should also have the management of them.", author: "François de La Rochefoucauld" },
  { text: "You are braver than you believe, stronger than you seem, and smarter than you think.", author: "A.A. Milne (Winnie-the-Pooh)" },
  { text: "Most of the important things in the world have been accomplished by people who kept on trying when there seemed to be no hope at all.", author: "Dale Carnegie" },
  { text: "Act as if what you do makes a difference. It does.", author: "William James" },
  { text: "You've got to get up every morning with determination if you're going to go to bed with satisfaction.", author: "George Lorimer" },
  { text: "Things may come to those who wait, but only the things left by those who hustle.", author: "Abraham Lincoln" },
  { text: "Energy and persistence conquer all things.", author: "Benjamin Franklin" },
  { text: "Our greatest glory is not in never falling, but in rising every time we fall.", author: "Confucius" },
  { text: "All our dreams can come true, if we have the courage to pursue them.", author: "Walt Disney" },
  { text: "First, have a definite, clear practical ideal; a goal, an objective. Second, have the necessary means to achieve your ends; wisdom, money, materials, and methods. Third, adjust all your means to that end.", author: "Aristotle" },
  { text: "Motivation is what gets you started. Habit is what keeps you going.", author: "Jim Ryun" },
  { text: "The last three or four reps is what makes the muscle grow. This area of pain divides a champion from someone who is not a champion.", author: "Arnold Schwarzenegger" },
  { text: "There are no shortcuts to any place worth going.", author: "Beverly Sills" },
  { text: "The only place where success comes before work is in the dictionary.", author: "Vidal Sassoon" },
  { text: "In training, you listen to your body. In competition, you tell your body to shut up.", author: "Rich Froning Jr." },
  { text: "Your biggest challenge isn't someone else. It's the ache in your lungs and the burning in your legs, and the voice inside you that yells 'can't', but you don't listen. You just push harder. And then you hear the voice whisper 'can'. And you discover that the person you thought you were is no match for the one you really are.", author: "Anonymous" },
  { text: "When you feel like quitting, think about why you started.", author: "Anonymous" },
  { text: "What seems hard now will one day be your warm-up.", author: "Anonymous" },
];

// Returns a deterministic quote index based on the day of year — changes daily
function getDailyQuoteIndex() {
  const now  = new Date();
  const doy  = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  return doy % QUOTES.length;
}

// Returns a stable quote for today + optionally n additional consecutive quotes
function getDailyQuotes(count = 3) {
  const base = getDailyQuoteIndex();
  return Array.from({ length: count }, (_, i) => QUOTES[(base + i) % QUOTES.length]);
}

// ── SCIENCE INSIGHTS — rotate daily, filtered by level / goal / sport ─────────
const SCIENCE_INSIGHTS = [
  // Beginner
  { badge:"Novice Effect",        level:"beginner",     text:"Progressive overload compounds fast at the novice stage: adding just 2.5 kg per session to upper-body lifts means a 65 kg lift becomes 97.5 kg in 13 weeks. Your nervous system is being rewired with every session." },
  { badge:"Neuroscience",         level:"beginner",     text:"60–80% of early strength gains come from neurological adaptation, not muscle growth. Your brain is learning to recruit more motor units simultaneously — this is why beginners get stronger without yet looking bigger." },
  { badge:"Training Frequency",   level:"beginner",     text:"Research shows beginners training 3× per week gain muscle just as fast as those training 5–6× per week. Consistency and recovery matter far more than frequency at this stage." },
  { badge:"Protein Timing",       level:"beginner",     text:"Total daily protein intake matters far more than when you eat it. Hit your target across the day — the 'anabolic window' after training is real but much wider than gym folklore suggests (up to 2 hours either side)." },
  { badge:"Sleep & Hormones",     level:"beginner",     text:"Growth hormone peaks during the first cycle of deep sleep. 7–9 hours isn't optional — it's when your body physically builds the muscle your training stimulated. No supplement replicates this." },
  // Intermediate
  { badge:"DUP Research",         level:"intermediate", text:"Daily Undulating Periodization — alternating heavy and volume sessions within the same week — produces ~10% more hypertrophy than linear programming alone (Schoenfeld et al., 2016). This plan uses that structure." },
  { badge:"MPS & Frequency",      level:"intermediate", text:"Muscle protein synthesis stays elevated for 24–48 hours post-session. Training each muscle group twice per week maximises synthesis spikes per week — the evidence-based optimum for hypertrophy." },
  { badge:"Volume Science",       level:"intermediate", text:"A 2019 meta-analysis of 49 studies found that doubling weekly training volume (sets per muscle) produced 3.9% greater hypertrophy — but only up to your Maximum Recoverable Volume. Beyond MRV, recovery breaks down." },
  { badge:"Creatine",             level:"intermediate", text:"Creatine monohydrate increases intramuscular ATP re-synthesis by 20–40%, improving strength by ~8% on average. It's the most researched legal performance supplement in existence — 3–5g daily, no loading needed." },
  { badge:"Supercompensation",    level:"intermediate", text:"Fatigue masks fitness. After a deload week, performance reliably rebounds 5–15% above pre-deload baseline — this is supercompensation, the principle behind every periodized programme." },
  // Advanced
  { badge:"Block Periodization",  level:"advanced",     text:"Every elite powerlifting and Olympic programme uses block periodization — separating accumulation, intensification, and realisation phases. Strength PRs don't happen during accumulation; they happen at the end of the full cycle." },
  { badge:"Genetic Ceiling",      level:"advanced",     text:"A natural athlete can gain 1–2 kg of muscle per year after 3 years of consistent training (Lyle McDonald model). Volume, exercise selection, and weak-point specialisation — not more intensity — are the levers at this stage." },
  { badge:"Intra-Workout Carbs",  level:"advanced",     text:"Consuming 30–60g of carbohydrate per hour during sessions over 75 minutes prevents glycogen depletion and preserves both strength output and cognitive performance in later sets." },
  { badge:"Polarised Training",   level:"advanced",     text:"Elite endurance athletes spend ~80% of volume at Zone 2 (easy) and ~20% at Zone 4–5 (hard). This polarised model produces superior adaptations versus the 'moderate intensity' most athletes default to." },
  // Fat loss goal
  { badge:"Energy Balance",       goal:"lose",          text:"A 500 kcal daily deficit produces ~0.5 kg of fat loss per week. Larger deficits accelerate muscle loss, not fat loss — your protein target on this plan is set specifically to preserve lean mass during the cut." },
  { badge:"Protein & Fat Loss",   goal:"lose",          text:"High-protein diets (2.0–2.4g/kg BW) during a calorie deficit preserve 30–40% more lean mass than lower-protein diets. Protein also has a 25–30% thermic effect — a quarter of its calories are burned just in digestion." },
  { badge:"Metabolic Rate",       goal:"lose",          text:"Resistance training during a cut preserves your metabolic rate far better than cardio alone. Cardio burns more calories per session; lifting preserves the muscle that burns calories 24 hours a day." },
  { badge:"Fat Metabolism",       goal:"lose",          text:"84% of fat leaves the body as CO₂ when you breathe out — oxidised triglycerides are exhaled, not sweated out. More breathing at higher intensities means more fat is metabolised per unit of time." },
  // Muscle gain goal
  { badge:"Lean Bulking",         goal:"gain",          text:"Hypertrophy is maximised in a calorie surplus of 200–350 kcal above maintenance — the 'lean bulk'. A larger surplus beyond this mostly adds body fat, not muscle, for natural athletes." },
  { badge:"Hypertrophy Mechanics",goal:"gain",          text:"Mechanical tension — force on a muscle during a loaded stretch — is the primary driver of muscle growth. The eccentric (lowering) phase generates the highest tension, which is why tempo and control matter more than the weight itself." },
  { badge:"Pre-Sleep Protein",    goal:"gain",          text:"Consuming 40g of slow-digesting protein (casein or cottage cheese) before sleep increases overnight muscle protein synthesis by 22% (van Loon et al.). Your body builds muscle during sleep — fuel the process." },
  { badge:"Meal Distribution",    goal:"gain",          text:"Spreading protein across 4–5 meals increases 24-hour muscle protein synthesis by ~25% compared to eating the same total in 2 large meals (Schoenfeld & Krieger, 2017). Frequency of protein feeding matters." },
  // Running
  { badge:"80/20 Running",        sport:"running",      text:"Elite distance runners spend ~80% of weekly volume at easy/conversational pace and only ~20% at threshold or above. The aerobic base built by easy miles is what allows you to absorb and adapt to the hard sessions." },
  { badge:"Running Economy",      sport:"running",      text:"Running economy — oxygen cost at a given pace — improves with both mileage and strength training. Two sessions of heavy lifting per week improves running economy by 2–8% within 6 weeks (multiple RCTs)." },
  { badge:"VO₂max",              sport:"running",      text:"VO₂max improves most rapidly with intervals at 90–95% max HR. But it's the aerobic base built by easy running that allows you to recover between intervals and accumulate the training load needed to improve over months." },
  { badge:"Lactate Threshold",    sport:"running",      text:"Your lactate threshold pace — the speed at which lactic acid clears as fast as it accumulates — is the best single predictor of performance from 5k to marathon. Tempo runs and sweet-spot work are the primary tools to raise it. Even a 5% threshold improvement transforms race times." },
  { badge:"10% Mileage Rule",     sport:"running",      text:"The 10% rule (never increase weekly mileage more than 10% per week) exists because connective tissue (tendons, ligaments) adapts 2–3× slower than cardiovascular fitness. Your lungs will feel ready weeks before your knees are. Trust the rule." },
  { badge:"Running Cadence",      sport:"running",      text:"An optimal cadence of 170–180 steps/minute reduces ground contact time, shortens the lever arm at the knee, and decreases injury risk. If your cadence is below 160, this is almost certainly why you are injured repeatedly. Increase by 5% per week." },
  { badge:"Carb Loading",         sport:"running",      text:"Glycogen depletion (the 'wall') hits at 30–35km for most runners. Carb-loading the 48 hours before a marathon (10–12g carbs per kg body weight) saturates muscle glycogen stores and significantly delays the wall. This strategy is supported by strong evidence." },
  // Cycling
  { badge:"FTP Science",          sport:"cycling",      text:"FTP (Functional Threshold Power) — the highest power you can sustain for ~60 minutes — is the central metric of cycling fitness. Training at 95–105% FTP in 20–30 minute blocks is the most time-efficient way to raise it." },
  { badge:"Cycling Fuelling",     sport:"cycling",      text:"Elite cyclists consume 60–90g of carbohydrate per hour during races. Under-fuelling in training is one of the biggest barriers to improvement — you can't build fitness you can't recover from." },
  { badge:"Cadence & Fatigue",    sport:"cycling",      text:"A higher cadence (85–95 rpm) at a given power output shifts fatigue from muscles to the cardiovascular system, which recovers faster. This is why professional cyclists spin fast gears rather than grinding low cadences — it preserves the legs for sustained efforts." },
  { badge:"Sweet Spot Training",  sport:"cycling",      text:"Sweet spot (88–94% FTP) produces the highest ratio of training stimulus to recovery cost of any cycling intensity. A single 2×20 min sweet spot session produces more FTP improvement per hour of fatigue than any other training format — the cornerstone of structured cycling." },
  { badge:"Power Meter Value",    sport:"cycling",      text:"Training with a power meter removes guesswork: you know exactly what stimulus you applied, not just how hard it felt. RPE varies with fatigue, heat, and mood; watts do not. Even a basic single-sided power meter transforms training quality." },
  { badge:"Cycling Nutrition",    sport:"cycling",      text:"Train-low periodisation — doing some easy sessions in a glycogen-depleted state — upregulates fat oxidation enzymes and builds metabolic flexibility. But NEVER go carb-depleted into hard sessions. Fuel quality sessions; deplete only on easy Zone 2 rides." },
  // Swimming
  { badge:"Stroke Efficiency",    sport:"swimming",     text:"Stroke efficiency drives swim performance at every level. Elite swimmers cover 95% of the pool with similar physiological effort to novices — through superior technique, not greater fitness. Drills return more than yards." },
  { badge:"Bilateral Breathing",  sport:"swimming",     text:"Bilateral breathing balances the muscular development of your catch and pull, corrects stroke asymmetry, and builds open-water navigation skill. Train it even when it feels uncomfortable — it's foundational." },
  { badge:"High Elbow Catch",     sport:"swimming",     text:"The 'high elbow catch' — maintaining a bent elbow as the hand extends forward — is the single most impactful technique change for recreational swimmers. It creates an effective paddle shape that generates 30–40% more propulsion per stroke than a dropped elbow." },
  { badge:"Distance Per Stroke",  sport:"swimming",     text:"Track your stroke count per length. Reducing stroke count at the same pace = better technique. Elite freestyle swimmers take 14–18 strokes per 25m. Most recreational swimmers take 22–28. The gap is almost entirely technique, not fitness." },
  { badge:"Open Water Differences",sport:"swimming",    text:"Open water swimming requires: sighting (lifting head to navigate) every 8–12 strokes, drafting (swimming in another swimmer's wake reduces effort by 20–35%), bilateral breathing for navigation, and wetsuit buoyancy management. These are trainable skills — practise them before race day." },
  // Calisthenics
  { badge:"Relative Strength",    sport:"calisthenics", text:"Calisthenics is the purest test of relative strength — strength per kilogram of bodyweight. Every extra kg of body fat you carry is dead weight on every pull-up, dip, and planche hold. Optimising body composition is not aesthetic in calisthenics — it's a direct performance variable." },
  { badge:"Skill Freshness",      sport:"calisthenics", text:"Static strength skills (planche, front lever, handstand) require a fully recovered nervous system. Even 15 minutes of prior fatigue measurably degrades skill performance. Always practice skills FIRST in a session — this is not preference, it is physiological requirement." },
  { badge:"Scapular Control",     sport:"calisthenics", text:"Scapular depression and retraction is the single most important prerequisite skill in calisthenics. Without active scapular engagement, pull-ups, dips, and handstands load passive shoulder structures rather than muscle — the root cause of most calisthenics shoulder injuries." },
  { badge:"Progression Steps",    sport:"calisthenics", text:"Calisthenics progressions are non-negotiable sequences — you cannot skip steps. A one-arm pull-up requires weighted pull-ups with +30kg first. A planche requires sustained planche lean with proper body alignment. Every advanced skill has a minimum strength prerequisite, and attempting skills without it does not accelerate progress — it causes injury." },
  { badge:"Straight Arm Strength",sport:"calisthenics", text:"Straight-arm strength (planche, front lever, maltese) is neurologically and structurally different from bent-arm strength (pull-ups, dips). It must be trained SEPARATELY with dedicated isometric holds and progressive loading. Bent-arm strength does not automatically transfer." },
  { badge:"Daily Skill Practice", sport:"calisthenics", text:"Handstand and skill progressions adapt neurologically — not muscularly. The nervous system pattern for balance and proprioception requires daily reinforcement at low volume (5–10 min) rather than occasional high-volume sessions. 5 min of daily handstand practice outperforms 1 hour weekly practice every time." },
  // General
  { badge:"Training Stimulus",    text:"Your body doesn't respond to the average of your training — it responds to its peaks. One genuinely hard, high-quality session per week drives more adaptation than seven moderate ones." },
  { badge:"Hydration & Power",    text:"Even 2% dehydration measurably impairs strength, power output, and reaction time. Arriving to training well-hydrated is one of the cheapest and most effective performance interventions available." },
  { badge:"Maintenance Dose",     text:"The minimum effective dose to maintain fitness is surprisingly small: 2 sessions per week at 1/3 of normal volume preserves almost all training adaptations for up to 3 months. Life happens — but the base is more durable than you think." },
  { badge:"Mental Imagery",       text:"Mental rehearsal activates the same neural pathways as physical practice, priming motor patterns and reducing perceived exertion. Visualising the workout in detail before you begin consistently improves both execution and output." },
  { badge:"Cold Recovery",        text:"Cold water immersion (10–15°C for 10–15 min) reduces DOMS by ~20% and accelerates return to full intensity. Avoid it after hypertrophy sessions though — it blunts the inflammatory signal that drives muscle growth." },
  { badge:"Compound Efficiency",  text:"Compound movements — squat, hinge, press, pull — recruit multiple muscle groups simultaneously and produce a greater hormonal response than isolation work. They should form the structural core of every training session." },
  { badge:"Rest Interval Science",text:"Longer rest periods (2–5 min) between heavy compound sets produce greater strength gains and hypertrophy than shorter rests (<90 sec). The fatigue you feel from short rests isn't additional stimulus — it's performance reduction." },
];

function getInsightOfDay(level, goal, sport) {
  const now     = new Date();
  const doy     = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  const planTs  = getData("currentPlan")?.generatedAt;
  const planSeed= planTs ? (new Date(planTs).getDate() + new Date(planTs).getMonth() * 3) : 0;
  const seed    = doy + planSeed;

  // Priority: exact 3-way match → level match → goal match → sport match → general
  const exact   = SCIENCE_INSIGHTS.filter(i => i.level === level && i.goal === goal && i.sport === sport);
  const byLevel = SCIENCE_INSIGHTS.filter(i => i.level === level && !i.goal && !i.sport);
  const byGoal  = SCIENCE_INSIGHTS.filter(i => i.goal  === goal  && !i.level && !i.sport);
  const bySport = SCIENCE_INSIGHTS.filter(i => i.sport === sport && !i.level && !i.goal);
  const general = SCIENCE_INSIGHTS.filter(i => !i.level && !i.goal && !i.sport);
  const pool    = [...exact, ...byLevel, ...byGoal, ...bySport, ...general];
  return pool[seed % pool.length];
}

// ── DAILY FOCUS TIPS ──────────────────────────────────────────────────────────
const FOCUS_TIPS = [
  { emoji:"🎯", title:"Today's Focus: Intent",        tip:"Every rep should be done with maximal effort and purpose. The weight is almost secondary — your intent is the stimulus that drives adaptation." },
  { emoji:"🧘", title:"Today's Focus: Recovery",      tip:"Recovery is training. Sleep, nutrition, and stress management produce as much adaptation as the sessions themselves. Treat them with equal seriousness." },
  { emoji:"🔥", title:"Today's Focus: Consistency",   tip:"The best programme is the one you actually follow. Showing up imperfectly, every week, beats the perfect plan executed once a month." },
  { emoji:"⚡", title:"Today's Focus: Speed of Movement", tip:"Drive the concentric phase as fast as possible even with moderate weight. Intentional speed recruits the fast-twitch fibres with the highest growth potential." },
  { emoji:"🧠", title:"Today's Focus: Mind-Muscle",   tip:"Deliberately thinking about the target muscle during a rep increases its activation by 20–60%. Pick one exercise today and practise the connection consciously." },
  { emoji:"💧", title:"Today's Focus: Hydration",     tip:"Pre-load with 500ml of water 2 hours before training. Even mild dehydration impairs power output before you feel thirsty." },
  { emoji:"⏱️", title:"Today's Focus: Rest Periods",  tip:"Respect your prescribed rest times — they're not downtime, they're physiological preparation. Set a timer and use the full rest. Your next set depends on it." },
  { emoji:"📈", title:"Today's Focus: Tracking",      tip:"Log today's session. Athletes who track their training outperform those who don't — consistently, across every sport and every study." },
  { emoji:"🦵", title:"Today's Focus: Range of Motion", tip:"Full range of motion produces 10–30% more hypertrophy than partial reps. If form breaks before depth, the weight is too heavy — not your anatomy." },
  { emoji:"🫁", title:"Today's Focus: Breathing",     tip:"Brace your core before every heavy compound rep (Valsalva manoeuvre). Breathe in, brace through the effort, exhale at completion. This protects your spine and transfers force efficiently." },
  { emoji:"🕐", title:"Today's Focus: Warm-Up",       tip:"Ramp sets are not wasted time. They prime neural drive, raise tissue temperature, and reduce injury risk. Start at 50% — build deliberately to your working weight." },
  { emoji:"🏆", title:"Today's Focus: Self-Competition", tip:"The only person you're competing with is yourself from last week. Beat last week's numbers by 1% and you'll be transformed in a year." },
  { emoji:"🧱", title:"Today's Focus: Technique First", tip:"A technically sound lift at 80% 1RM produces more stimulus with less risk than a broken rep at 100%. Ego is the enemy of progress." },
  { emoji:"🌙", title:"Today's Focus: Tonight's Sleep", tip:"Plan your sleep tonight like you planned today's session. Growth hormone peaks in your first sleep cycle — 8 hours outperforms any supplement stack." },
  { emoji:"🥩", title:"Today's Focus: Protein Today", tip:"You can only synthesise roughly 40g of muscle protein per meal. Spread today's intake across 4 meals rather than loading it into 2 — the distribution matters as much as the total." },
  { emoji:"🌊", title:"Today's Focus: Zone 2",        tip:"Easy is not slow — it's strategic. Training at conversational pace builds your aerobic base, mitochondrial density, and fat oxidation efficiency without accumulating fatigue that impairs recovery." },
  { emoji:"🤸", title:"Today's Focus: Skill Quality", tip:"10 minutes of fresh, deliberate skill practice outperforms 40 minutes of fatigued repetition. Do your skill work first, when your nervous system is fully available. The quality of each rep matters infinitely more than the volume." },
  { emoji:"🦾", title:"Today's Focus: Progressions",  tip:"Every advanced movement has a prerequisite progression. Attempting skills before you have the prerequisite strength doesn't accelerate progress — it causes injury. Be patient with the steps. Trust the hierarchy." },
  { emoji:"⚡", title:"Today's Focus: Fuelling",      tip:"Your body cannot perform at its best in a depleted state. Pre-workout nutrition is not optional for quality sessions. A banana and some protein 60–90 minutes before training is the single cheapest performance upgrade available." },
  { emoji:"🚴", title:"Today's Focus: Pacing",        tip:"The most common training mistake is going too hard on easy days and not hard enough on hard days. Easy should be genuinely easy — Zone 2 throughout. Hard should be actually hard. Blurring the lines produces the worst of both worlds." },
  { emoji:"🏊", title:"Today's Focus: Technique",     tip:"Technique yields more performance improvement per hour than fitness in most sports. One technique-focused session per week — with full mental attention on one specific cue — is more valuable than five additional volume sessions." },
  { emoji:"🧬", title:"Today's Focus: Recovery Foods", tip:"What you eat in the 2 hours after training determines how much of the training stimulus you convert into actual adaptation. Protein triggers muscle repair; carbohydrates restore glycogen. Both matter. Skip post-workout nutrition and you've wasted part of the session." },
  { emoji:"💪", title:"Today's Focus: Tension",       tip:"Mechanical tension in the muscle — especially during the eccentric (lowering) phase — is the primary driver of muscle growth. Control the descent of every rep with purpose. The weight is almost secondary; the tension is the stimulus." },
];

function getDailyFocus() {
  const now = new Date();
  const doy = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  return FOCUS_TIPS[doy % FOCUS_TIPS.length];
}

// ── SCHEDULE PAGE ─────────────────────────────────────────────────────────────
function initSchedulePage() {
  let plan, profile;
  const _histIdx = sessionStorage.getItem("fs_viewPlanHistIdx");
  if (_histIdx !== null) {
    sessionStorage.removeItem("fs_viewPlanHistIdx");
    try {
      const _history = getData("planHistory") || [];
      const _entry   = _history[parseInt(_histIdx, 10)];
      plan    = _entry?.plan    || null;
      profile = _entry?.profile || null;
    } catch {}
  }
  if (!plan) {
    plan    = getData("currentPlan");
    profile = getData("planProfile");
  }

  if (!plan?.days?.length) {
    document.getElementById("schedGrid").innerHTML = `
      <div class="sched-empty">
        <span>📋</span>
        <p>No plan found. <a href="dashboard.html">Go back to the planner</a> to generate your personalised week.</p>
      </div>`;
    return;
  }

  const titleEl = document.getElementById("scheduleTitle");
  const subEl   = document.getElementById("scheduleSubtitle");
  if (titleEl) titleEl.textContent = `Your ${plan.splitName || "Training"} Week`;
  if (subEl)   subEl.textContent   = plan.splitRationale || plan.summary || "";

  const statsEl = document.getElementById("scheduleStats");
  if (statsEl) {
    const goalLabel = plan.goal === "lose" ? "Fat Loss" : plan.goal === "gain" ? "Muscle Gain" : "Maintenance";
    const levelIcon = plan.level === "beginner" ? "🌱" : plan.level === "advanced" ? "⚡" : "💪";
    const trainDays = plan.days.filter(d => !d.isRest).length;
    const totalMins = plan.days.reduce((s,d)=>s+(d.duration||0),0);
    statsEl.innerHTML = `
      <div class="sched-stat"><div class="sched-stat-num">${trainDays}</div><div class="sched-stat-label">Training Days</div></div>
      <div class="sched-stat"><div class="sched-stat-num">${7 - trainDays}</div><div class="sched-stat-label">Rest Days</div></div>
      <div class="sched-stat"><div class="sched-stat-num">${totalMins}</div><div class="sched-stat-label">Total Mins</div></div>
      <div class="sched-stat"><div class="sched-stat-num">${levelIcon} ${plan.level ? plan.level.charAt(0).toUpperCase()+plan.level.slice(1) : "—"}</div><div class="sched-stat-label">Level</div></div>
      <div class="sched-stat"><div class="sched-stat-num">${goalLabel}</div><div class="sched-stat-label">Goal</div></div>`;
  }

  // ── LEFT SIDEBAR: coaching panel + macros + quotes ──────────────────────────
  const sidebar = document.getElementById("schedSidebar");
  if (sidebar) {
    let sidebarHTML = "";

    // Coaching panel
    const conds = profile?.healthConditions?.filter(Boolean) || [];
    const diets = profile?.dietaryPreferences?.filter(Boolean) || [];
    const coachParts = [];
    if (plan.coachingLevel)      coachParts.push({ label:"Coaching stage",      val: plan.coachingLevel });
    if (plan.progressionMethod)  coachParts.push({ label:"Progression method",  val: plan.progressionMethod });
    if (plan.deloadGuidance)     coachParts.push({ label:"Recovery & deload",   val: plan.deloadGuidance });
    if (conds.length)            coachParts.push({ label:"Health adaptations",  val: conds.join(", ") });
    if (diets.length)            coachParts.push({ label:"Diet",                val: diets.join(", ") });

    if (coachParts.length) {
      sidebarHTML += `
        <div class="sb-block sb-coaching">
          <div class="sb-block-title">📋 Your Coaching Profile</div>
          ${coachParts.map(p => `
            <div class="sb-row">
              <div class="sb-row-label">${p.label}</div>
              <div class="sb-row-val">${p.val}</div>
            </div>`).join("")}
        </div>`;
    }

    // Macro panel
    if (profile?.height && profile?.weight) {
      const m       = estimateMacros(profile);
      const sport   = detectSport(profile.fitnessExperience || "");
      const insight = getInsightOfDay(plan.level, profile.goal, sport);
      sidebarHTML += `
        <div class="sb-block sb-macros">
          <div class="sb-block-title">🍽️ Daily Nutrition Target</div>
          <div class="sb-macro-grid">
            <div class="sb-macro-item"><div class="sb-macro-val">${m.calories}</div><div class="sb-macro-label">kcal</div></div>
            <div class="sb-macro-item"><div class="sb-macro-val">${m.protein}g</div><div class="sb-macro-label">Protein</div></div>
            <div class="sb-macro-item"><div class="sb-macro-val">${m.carbs}g</div><div class="sb-macro-label">Carbs</div></div>
            <div class="sb-macro-item"><div class="sb-macro-val">${m.fat}g</div><div class="sb-macro-label">Fat</div></div>
          </div>
          ${insight ? `<div class="sb-insight"><div class="sb-insight-badge">${insight.badge}</div><p class="sb-insight-text">${insight.text}</p></div>` : ""}
        </div>`;
    }

    // Daily quotes + today's focus
    const quotes = getDailyQuotes(3);
    const focus  = getDailyFocus();
    sidebarHTML += `
      <div class="sb-block sb-quotes">
        <div class="sb-block-title">💬 Today's Motivation</div>
        ${quotes.map(q => `
          <div class="sb-quote">
            <div class="sb-quote-text">${q.text}</div>
            <div class="sb-quote-author">— ${q.author}</div>
          </div>`).join("")}
        <div class="sb-focus">
          <div class="sb-focus-emoji">${focus.emoji}</div>
          <div class="sb-focus-body">
            <div class="sb-focus-title">${focus.title}</div>
            <div class="sb-focus-tip">${focus.tip}</div>
          </div>
        </div>
      </div>`;

    sidebar.innerHTML = sidebarHTML;
  } else {
    // Fallback: legacy flat layout for pages without sidebar
    const noteEl = document.getElementById("schedPlanNote");
    if (noteEl) {
      const conds2 = profile?.healthConditions?.filter(Boolean) || [];
      const diets2 = profile?.dietaryPreferences?.filter(Boolean) || [];
      const parts = [];
      if (plan.coachingLevel)    parts.push(`<strong>Coaching stage:</strong> ${plan.coachingLevel}`);
      if (plan.progressionMethod)parts.push(`<strong>Progression:</strong> ${plan.progressionMethod}`);
      if (plan.deloadGuidance)   parts.push(`<strong>Recovery:</strong> ${plan.deloadGuidance}`);
      if (conds2.length)         parts.push(`<strong>Health adaptations:</strong> ${conds2.join(", ")}`);
      if (diets2.length)         parts.push(`<strong>Diet:</strong> ${diets2.join(", ")}`);
      noteEl.innerHTML = parts.length ? `<div class="coaching-panel">${parts.map(p=>`<div class="coaching-item">${p}</div>`).join("")}</div>` : "";
      noteEl.style.display = parts.length ? "" : "none";
    }
  }

  // ── SESSION CARDS (always 7 days: training + rest) ────────────────────────
  const grid = document.getElementById("schedGrid");
  if (!grid) return;
  grid.innerHTML = plan.days.map((day, idx) => {
    const date   = new Date(day.dateISO);
    const dayNum = date.getDate();
    const mon    = date.toLocaleDateString("en-GB",{month:"short"});

    if (day.isRest) {
      const recoveryTips = [
        "Light 20-min walk to flush metabolites",
        "10 min full-body stretching or yoga",
        "Foam roll legs, back, and shoulders",
        "Sleep 7–9 hours for optimal recovery",
        "Hydrate well — aim for 2–3L water",
      ];
      return `
      <div class="sched-card sched-card--rest" style="animation-delay:${idx*0.07}s">
        <div class="sched-card-date">
          <div class="sched-card-dayname">${day.day}</div>
          <div class="sched-card-daynum">${dayNum}</div>
          <div class="sched-card-month">${mon}</div>
        </div>
        <div class="sched-card-line sched-card-line--rest"></div>
        <div class="sched-card-body">
          <div class="sched-card-header">
            <div class="sched-card-name">😴 Rest & Recovery</div>
            <span class="sched-card-badge badge-rest">REST</span>
          </div>
          <p class="sched-rest-note">${day.notes}</p>
          <div class="sched-rest-tips">
            ${recoveryTips.map(t=>`<div class="sched-rest-tip">✓ ${t}</div>`).join("")}
          </div>
        </div>
      </div>`;
    }

    const ic      = intensityClass(day.intensity);
    const endTime = addMins(day.start, day.duration);
    const steps   = (day.steps || []);
    return `
    <div class="sched-card accent-${ic}" style="animation-delay:${idx*0.07}s">
      <div class="sched-card-date">
        <div class="sched-card-dayname">${day.day}</div>
        <div class="sched-card-daynum">${dayNum}</div>
        <div class="sched-card-month">${mon}</div>
      </div>
      <div class="sched-card-line accent-${ic}"></div>
      <div class="sched-card-body">
        <div class="sched-card-header">
          <div class="sched-card-name">${day.workout || "Training Session"}</div>
          <span class="sched-card-badge badge-${ic}">${day.intensity||"Medium"}</span>
        </div>
        <div class="sched-card-time">
          <span class="sched-time-icon">🕐</span>
          ${day.start} — ${endTime} · ${day.duration} min
        </div>
        <div class="sched-card-equip">${day.splitName||""} · ${day.equipmentSummary||""}</div>
        ${day.conflictWith ? `<div class="sched-conflict">⚠️ Rescheduled around: ${day.conflictWith}</div>` : ""}
        <details class="sched-steps-wrap">
          <summary class="sched-steps-toggle">View workout steps</summary>
          <ol class="sched-steps">${steps.map(s=>`<li>${s}</li>`).join("")}</ol>
          ${day.notes ? `<p class="sched-note">${day.notes}</p>` : ""}
        </details>
        <div class="sched-card-actions">
          <a class="sched-action-gcal" href="${day.calendarUrl||"#"}" target="_blank" rel="noopener">📅 Add to Google Calendar</a>
          <button class="sched-action-ics" onclick="downloadSingleICS('${day.dateISO}')">⬇ .ics</button>
        </div>
      </div>
    </div>`;
  }).join("");

  // Set up "Add All to Google Calendar" button
  const gcalAllBtn = document.getElementById("gcalAddAllBtn");
  if (gcalAllBtn && plan.days.length) {
    const firstDay = plan.days[0];
    gcalAllBtn.href = firstDay.calendarUrl || "#";
  }
}

function estimateMacros(profile) {
  const wKg  = (profile.weightUnit === "lbs" ? (profile.weight||75) * 0.4536 : (profile.weight||75));
  const hCm  = (profile.heightUnit === "ft"  ? (profile.height||175) * 30.48  : (profile.height||175));
  const bmr  = 10*wKg + 6.25*hCm - 5*30 + 5;
  const tdee = Math.round(bmr * 1.5);
  const cals = profile.goal === "lose" ? Math.round(tdee*0.85) : profile.goal === "gain" ? Math.round(tdee*1.1) : tdee;
  const prot = Math.round(wKg * 2.0);
  const fat  = Math.round(cals * 0.28 / 9);
  const carb = Math.round((cals - prot*4 - fat*9) / 4);
  return { calories:cals, protein:prot, carbs:carb, fat };
}

// ── ANALYSIS FUNCTIONS ────────────────────────────────────────────────────────
function analyzeHealthCondition(text) {
  const l = text.toLowerCase();
  let cat="general", mods=[], restr=[], fb="";
  if (/\b(back|spine|disc|herniated|sciatica|scoliosis)\b/.test(l)) {
    cat="back/spine"; mods=["modified core work","neutral spine cues","avoid spinal loading"]; restr=["heavy deadlifts","loaded twisting","box jumps"];
  } else if (/\b(knee|patella|meniscus|acl|pcl|mcl)\b/.test(l)) {
    cat="knee"; mods=["low-impact cardio","quad strengthening","reduced range of motion"]; restr=["deep squats","jumping","heavy lunges"];
  } else if (/\b(shoulder|rotator cuff|impingement|bursitis)\b/.test(l)) {
    cat="shoulder"; mods=["scapular stability focus","avoid overhead pressing above ear level"]; restr=["overhead press","pull-ups"];
  } else if (/\b(asthma|copd|bronchitis)\b/.test(l)) {
    cat="respiratory"; mods=["shorter bursts","monitor breathing","rest as needed"]; restr=["prolonged high-intensity cardio"];
  } else if (/\b(heart|cardiac|hypertension|blood pressure|arrhythmia)\b/.test(l)) {
    cat="cardiovascular"; mods=["moderate intensity","gradual progression"]; restr=["maximal exertion"];
  } else if (/\b(diabetes|blood sugar|insulin|hypoglycemia)\b/.test(l)) {
    cat="metabolic"; mods=["consistent meal timing","moderate intensity"]; restr=["extended fasting before sessions"];
  } else if (/\b(depression|anxiety|stress|ptsd|mental health)\b/.test(l)) {
    cat="mental health"; mods=["stress-reducing movement","consistent routine","mindful exercise"];
  } else if (/\b(arthritis|fibromyalgia|chronic fatigue|lupus|rheumatoid)\b/.test(l)) {
    cat="chronic condition"; mods=["gentle progression","listen to body","adequate recovery"];
  } else if (/\b(pregnant|pregnancy|postpartum|postnatal)\b/.test(l)) {
    cat="pregnancy/postpartum"; mods=["prenatal-safe exercises","pelvic floor focus","modified intensity"];
  }
  const sev = /\b(severe|acute|debilitating)\b/.test(l) ? "high" : /\b(mild|minor|slight)\b/.test(l) ? "low" : "moderate";
  if (mods.length) {
    fb = `${cat} (${sev} severity): plan will include ${mods.join(", ")}.${restr.length?` Avoiding: ${restr.join(", ")}.`:""}`;
  } else {
    fb = `"${text}" noted — plan adapted with appropriate safety modifications.`;
  }
  return { category:cat, severity:sev, modifications:mods, restrictions:restr, feedback:fb };
}

function analyzeDietaryPreference(text) {
  const l = text.toLowerCase();
  let cat="general", restr=[], prefs=[], fb="";
  if (/\b(halal)\b/.test(l))              { cat="halal";       restr=["pork","alcohol","non-halal meat"]; }
  else if (/\b(kosher)\b/.test(l))        { cat="kosher";      restr=["pork","shellfish","mixing meat/dairy"]; }
  else if (/\b(gluten|celiac|wheat)\b/.test(l)) { cat="gluten-free"; restr=["wheat","barley","rye"]; prefs=["rice","quinoa","potatoes"]; }
  else if (/\b(dairy|lactose)\b/.test(l)) { cat="dairy-free";  restr=["milk","cheese","yogurt"]; prefs=["plant-based milks"]; }
  else if (/\b(nut|peanut|tree nut)\b/.test(l)) { cat="nut-free"; restr=["all nuts","nut butters"]; }
  else if (/\b(vegan|plant.based)\b/.test(l))  { cat="vegan";   restr=["all animal products"]; prefs=["legumes","tofu","tempeh","grains"]; }
  else if (/\b(vegetarian)\b/.test(l))    { cat="vegetarian";  restr=["meat","fish"]; prefs=["eggs","dairy","plant proteins"]; }
  else if (/\b(keto|ketogenic|low.?carb)\b/.test(l)) { cat="keto"; restr=["sugars","grains","most carbs"]; prefs=["proteins","healthy fats","low-carb veg"]; }
  else if (/\b(paleo)\b/.test(l))         { cat="paleo";        restr=["processed foods","grains","dairy"]; prefs=["lean meats","vegetables","fruits","nuts"]; }
  else if (/\b(fodmap|ibs)\b/.test(l))    { cat="low-FODMAP"; restr=["high-FODMAP foods"]; prefs=["rice","potatoes","lean protein"]; }
  if (restr.length) fb = `${cat}: avoids ${restr.join(", ")}.${prefs.length?` Prefers: ${prefs.join(", ")}.`:""}`;
  else fb = `"${text}" dietary preference noted — meals adapted accordingly.`;
  return { category:cat, restrictions:restr, preferences:prefs, feedback:fb };
}

function analyzeEquipment(text) {
  const l = text.toLowerCase();
  let cat="general", caps=[], fb="";
  if (/\b(dumbbell|dumbbells|db)\b/.test(l))       { cat="dumbbells"; caps=["unilateral exercises","progressive overload","isolation work"]; }
  else if (/\b(barbell|bar|bb)\b/.test(l))          { cat="barbell"; caps=["compound lifts","heavy loading","power movements"]; }
  else if (/\b(kettlebell|kb)\b/.test(l))           { cat="kettlebell"; caps=["dynamic movements","cardio conditioning","grip strength"]; }
  else if (/\b(treadmill|running machine)\b/.test(l)){ cat="treadmill"; caps=["running","walking","interval training"]; }
  else if (/\b(bike|spin|stationary)\b/.test(l))    { cat="bike"; caps=["low-impact cardio","interval training","endurance"]; }
  else if (/\b(cable|crossover)\b/.test(l))         { cat="cable machine"; caps=["isolation movements","constant tension","functional training"]; }
  else if (/\b(bands|resistance bands)\b/.test(l))  { cat="resistance bands"; caps=["portable resistance","assisted movements","rehabilitation"]; }
  else if (/\b(bench|weight bench)\b/.test(l))      { cat="bench"; caps=["bench press","hip thrusts","step-ups"]; }
  else if (/\b(pull.?up|chin.?up)\b/.test(l))       { cat="pull-up bar"; caps=["pull-ups","chin-ups","upper back development"]; }
  else if (/\b(rowing|rower|erg)\b/.test(l))        { cat="rowing machine"; caps=["full-body cardio","low-impact","endurance"]; }
  else if (/\b(stair|stairmaster)\b/.test(l))       { cat="stairmaster"; caps=["glute-focused cardio","endurance","low-impact"]; }
  if (caps.length) fb = `${cat}: unlocks ${caps.join(", ")}.`;
  else fb = `"${text}" noted — incorporated into your workout where appropriate.`;
  return { category:cat, capabilities:caps, feedback:fb };
}

// ── DYNAMIC TAG INPUTS ────────────────────────────────────────────────────────
const dynConfigs = [
  { inputId:"healthConditionInput", addBtnId:"addHealthCondition", tagsId:"healthConditionTags", feedbackId:"healthAnalysisFeedback", maxItems:5,  label:"health condition",  analyzer:analyzeHealthCondition },
  { inputId:"dietaryInput",         addBtnId:"addDietary",         tagsId:"dietaryTags",         feedbackId:"dietaryAnalysisFeedback", maxItems:10, label:"dietary preference", analyzer:analyzeDietaryPreference },
  { inputId:"equipmentInput",       addBtnId:"addEquipment",       tagsId:"equipmentTags",       feedbackId:"equipmentAnalysisFeedback",maxItems:20, label:"equipment item",    analyzer:analyzeEquipment },
];

function initDynamicInputs() {
  dynConfigs.forEach(cfg => {
    const input = document.getElementById(cfg.inputId);
    const btn   = document.getElementById(cfg.addBtnId);
    const tags  = document.getElementById(cfg.tagsId);
    if (!input || !btn || !tags) return;
    btn.addEventListener("click", e => { e.preventDefault(); addDynamicItem(cfg); });
    input.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); addDynamicItem(cfg); } });
    updateDynFeedback(cfg);
  });
}

function addDynamicItem(cfg) {
  const input = document.getElementById(cfg.inputId);
  const tags  = document.getElementById(cfg.tagsId);
  if (!input || !tags) return;
  const text = input.value.trim();
  if (!text) { showToast(`Please type a ${cfg.label} first.`, "warning"); input.focus(); return; }
  const existing = Array.from(tags.querySelectorAll(".dynamic-tag"));
  if (existing.length >= cfg.maxItems) { showToast(`Maximum ${cfg.maxItems} ${cfg.label}s reached.`, "warning"); return; }
  if (existing.some(t => (t.dataset.value||"").toLowerCase() === text.toLowerCase())) {
    showToast("Already in the list.", "warning"); input.select(); return;
  }
  const tag = document.createElement("span");
  tag.className = "dynamic-tag";
  tag.dataset.value = text; tag.dataset.text = text;
  tag.innerHTML = `${text}<button class="remove-tag" aria-label="Remove ${text}" onclick="removeDynamicTag(this)">×</button>`;
  tags.appendChild(tag);
  input.value = ""; input.focus();
  updateDynFeedback(cfg);
  updateAddBtnState(cfg, tags);
}

window.removeDynamicTag = function(btn) {
  const tag  = btn.closest(".dynamic-tag");
  const cont = tag?.parentElement;
  tag?.remove();
  dynConfigs.forEach(cfg => {
    if (cfg.tagsId === cont?.id) { updateDynFeedback(cfg); updateAddBtnState(cfg, cont); }
  });
};
// Backward compat for old inline onclick="removeDynamicItem(...)"
window.removeDynamicItem = function(tagsId, text) {
  const c = document.getElementById(tagsId);
  if (!c) return;
  Array.from(c.querySelectorAll(".dynamic-tag")).find(t => t.dataset.value===text||t.dataset.text===text)?.remove();
  dynConfigs.forEach(cfg => { if (cfg.tagsId===tagsId) { updateDynFeedback(cfg); updateAddBtnState(cfg,c); } });
};

function updateAddBtnState(cfg, tagsEl) {
  const btn   = document.getElementById(cfg.addBtnId);
  const count = tagsEl.querySelectorAll(".dynamic-tag").length;
  if (btn) btn.disabled = count >= cfg.maxItems;
}

function updateDynFeedback(cfg) {
  const fb   = document.getElementById(cfg.feedbackId);
  const tags = document.getElementById(cfg.tagsId);
  if (!fb || !tags) return;
  const items = Array.from(tags.querySelectorAll(".dynamic-tag")).map(t => t.dataset.value || t.dataset.text || "").filter(Boolean);
  if (!items.length) { fb.innerHTML = ""; return; }
  const text = items.map(i => cfg.analyzer(i).feedback).filter(Boolean).join(" ");
  fb.innerHTML = `<span class="feedback-label">FitSync analysis:</span> ${text}`;
}

// ── CALORIE ESTIMATE (dashboard) ──────────────────────────────────────────────
function updateCalorieEstimate() {
  const badge = document.getElementById("calorieEstimate");
  if (!badge) return;
  const hw = parseFloat(document.getElementById("heightValue")?.value);
  const ww = parseFloat(document.getElementById("weightValue")?.value);
  const goal = document.getElementById("goal")?.value;
  if (!hw || !ww) { badge.style.display="none"; return; }
  const hCm = document.getElementById("heightUnit")?.value==="ft" ? hw*30.48 : hw;
  const wKg = document.getElementById("weightUnit")?.value==="lbs" ? ww*0.4536 : ww;
  const bmr  = 10*wKg + 6.25*hCm - 5*30 + 5;
  const tdee = Math.round(bmr * 1.5);
  const tgt  = goal==="lose" ? Math.round(tdee*0.85) : goal==="gain" ? Math.round(tdee*1.1) : tdee;
  const lbl  = goal==="lose" ? "calorie target (deficit)" : goal==="gain" ? "calorie target (surplus)" : "maintenance calories";
  badge.style.display = ""; badge.textContent = `Estimated ${lbl}: ~${tgt} kcal/day`;
}

function updateDetectedLevel() {
  const ta    = document.getElementById("fitnessLevelText");
  const badge = document.getElementById("detectedLevelBadge");
  if (!ta || !badge) return;
  const text = ta.value.trim();
  if (!text) { badge.style.display="none"; return; }
  const lvl = analyzeExperience(text);
  const meta = {
    beginner:     { icon:"🌱", label:"Beginner",     colour:"#4ade80", desc:"New to structured training — sessions focus on movement quality, habit-building, and neurological adaptation." },
    intermediate: { icon:"💪", label:"Intermediate", colour:"#38bdf8", desc:"Consistent training base — plan uses progressive overload, DUP cycles, and sufficient volume for continued adaptation." },
    advanced:     { icon:"⚡", label:"Advanced",     colour:"#a78bfa", desc:"Experienced athlete — plan targets block periodization, high volume, and phase-specific intensity management." },
  };
  const m = meta[lvl];
  badge.style.display = "";
  badge.innerHTML = `
    <span class="dlb-icon" style="color:${m.colour}">${m.icon}</span>
    <span class="dlb-main">Detected: <strong style="color:${m.colour}">${m.label}</strong></span>
    <span class="dlb-desc">${m.desc}</span>`;
}

// ── PROFILE RESTORE ───────────────────────────────────────────────────────────
function restoreProfile(p) {
  const set = (id, val) => { if (val && document.getElementById(id)) document.getElementById(id).value = val; };
  set("goal", p.goal); set("fitnessLevel", p.level);
  set("fitnessLevelText", p.fitnessExperience); updateDetectedLevel();
  set("sessionMinutes", p.sessionMinutes);
  set("heightValue", p.height); set("weightValue", p.weight);
  set("heightUnit", p.heightUnit); set("weightUnit", p.weightUnit);
  set("locationPreference", p.locationPreference);
  set("workoutSpace", p.workoutSpace);

  // Restore tags
  [
    { list: p.healthConditions,  tagsId:"healthConditionTags" },
    { list: p.dietaryPreferences,tagsId:"dietaryTags" },
    { list: p.equipmentAvailable?.map?.(e => EQUIPMENT_LABELS[e]||e), tagsId:"equipmentTags" },
  ].forEach(({ list, tagsId }) => {
    if (!list?.length) return;
    const cont = document.getElementById(tagsId);
    if (!cont) return;
    cont.innerHTML = "";
    const cfg = dynConfigs.find(c=>c.tagsId===tagsId);
    list.forEach(text => {
      if (!text) return;
      const tag = document.createElement("span");
      tag.className="dynamic-tag"; tag.dataset.value=text; tag.dataset.text=text;
      tag.innerHTML=`${text}<button class="remove-tag" aria-label="Remove ${text}" onclick="removeDynamicTag(this)">×</button>`;
      cont.appendChild(tag);
    });
    if (cfg) { updateDynFeedback(cfg); updateAddBtnState(cfg,cont); }
  });
  updateCalorieEstimate();
}

// ── CLEAR DASHBOARD FORM ──────────────────────────────────────────────────────
function clearDashboardForm() {
  const el = id => document.getElementById(id);
  if (el("goal"))               el("goal").value               = "lose";
  if (el("heightValue"))        el("heightValue").value        = "";
  if (el("weightValue"))        el("weightValue").value        = "";
  if (el("heightUnit"))         el("heightUnit").value         = "cm";
  if (el("weightUnit"))         el("weightUnit").value         = "kg";
  if (el("fitnessLevelText"))   el("fitnessLevelText").value   = "";
  if (el("fitnessLevel"))       el("fitnessLevel").value       = "";
  if (el("sessionMinutes"))     el("sessionMinutes").value     = "45";
  if (el("workoutSpace"))       el("workoutSpace").value       = "full_room";
  if (el("locationPreference")) el("locationPreference").value = "indoor";
  ["healthConditionTags","dietaryTags","equipmentTags"].forEach(id => {
    const c = el(id); if (c) c.innerHTML = "";
  });
  ["healthAnalysisFeedback","dietaryAnalysisFeedback","equipmentAnalysisFeedback"].forEach(id => {
    const c = el(id); if (c) c.innerHTML = "";
  });
  dynConfigs.forEach(cfg => {
    const cont = document.getElementById(cfg.tagsId);
    if (cont) updateAddBtnState(cfg, cont);
  });
  const calorBadge = el("calorieEstimate");    if (calorBadge)  calorBadge.style.display  = "none";
  const levelBadge = el("detectedLevelBadge"); if (levelBadge)  levelBadge.style.display  = "none";
  const wBanner    = el("weatherNoteBanner");  if (wBanner)     wBanner.style.display     = "none";
}

// ── MEAL GENERATION ───────────────────────────────────────────────────────────
window.generateMeals = function() {
  const groceries  = document.getElementById("groceryInput")?.value.trim() || "";
  const mealStyle  = document.getElementById("mealStyle")?.value || "balanced";
  const cookTime   = document.getElementById("cookTime")?.value  || "normal";
  const profile    = getData("planProfile");
  const dietProf   = profile?.dietaryPreferences || [];
  const dietActive = typeof window.getActiveDietaryPrefs === "function" ? window.getActiveDietaryPrefs() : [];
  const dietary    = [...new Set([...dietProf, ...dietActive])];
  const goal       = profile?.goal || "maintain";

  const output = document.getElementById("mealOutput");
  if (!output) return;

  // Build 7 days
  const today = new Date();
  const DAY_NAMES_LONG = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const weekDays = Array.from({length:7}, (_, i) => {
    const d = new Date(today); d.setDate(today.getDate() + i);
    return {
      dayName: DAY_NAMES_LONG[d.getDay()],
      dateStr: d.toLocaleDateString("en-GB", {weekday:"short", day:"numeric", month:"short"}),
      dateISO: d.toISOString().split("T")[0],
      meals:   buildMeals(groceries, dietary, goal, mealStyle, cookTime, i),
    };
  });

  // ── Inject pre/post workout meals for exercise days ──────────────────────
  const exercisePlan = getData("currentPlan");
  if (exercisePlan?.days) {
    const isVeganGlobal  = dietary.some(d => /vegan|plant.based/i.test(d));
    const isKetoGlobal   = dietary.some(d => /keto|low.?carb/i.test(d));
    weekDays.forEach(wd => {
      const exDay = exercisePlan.days.find(ed => ed.dateISO === wd.dateISO);
      if (!exDay || !exDay.workout || /rest|recovery|active rest/i.test(exDay.workout)) return;

      const sessionTime = exDay.start || "18:00";
      // Pre-workout: light carbs + small protein 60–90 min before session
      wd.meals.push({
        icon: "⚡",
        type: "Pre-Workout",
        time: `~1hr before ${sessionTime}`,
        name: isVeganGlobal
          ? "Banana & medjool date energy snack"
          : isKetoGlobal
          ? "Hard-boiled eggs with avocado"
          : "Banana with rice cakes & nut butter",
        description: isVeganGlobal
          ? "Fast-digesting carbs to top up muscle glycogen before training. Easy on the stomach."
          : isKetoGlobal
          ? "Fat and protein to sustain energy without spiking blood sugar before your session."
          : "Simple carbs for quick energy and a little protein to protect muscle during your session.",
        calories: isKetoGlobal ? 210 : 230,
        protein:  isKetoGlobal ? 14  : 7,
        carbs:    isKetoGlobal ? 4   : 36,
        fat:      isKetoGlobal ? 16  : 6,
        ingredients: isVeganGlobal ? "banana, medjool dates" : isKetoGlobal ? "eggs, avocado" : "banana, rice cakes, nut butter",
        steps: isVeganGlobal
          ? "1. Peel and eat 1 ripe banana. 2. Add 2 medjool dates for extra fast-release carbs. 3. Eat 60–90 minutes before your workout. 4. Stay hydrated — drink at least 500ml water before your session."
          : isKetoGlobal
          ? "1. Boil 2 eggs for 7 minutes. Cool, peel, and halve. 2. Slice ½ avocado. 3. Season with salt and pepper. 4. Eat 60–90 minutes before training. 5. Drink 500ml water before you start."
          : "1. Peel and slice 1 ripe banana. 2. Place 2–3 rice cakes on a plate. 3. Spread 1 tbsp nut butter on each rice cake. 4. Top with banana slices. 5. Eat 60–90 minutes before your session. 6. Drink at least 500ml water before you train.",
      });

      // Post-workout: fast protein + moderate carbs within 30–45 min after
      wd.meals.push({
        icon: "💪",
        type: "Post-Workout",
        time: `~30min after ${sessionTime}`,
        name: isVeganGlobal
          ? "Plant protein smoothie with banana & oats"
          : isKetoGlobal
          ? "Greek yoghurt with seeds & mixed berries"
          : "Protein shake with oats, banana & milk",
        description: isVeganGlobal
          ? "Fast plant protein and carbs within 30 minutes of finishing to kickstart muscle repair."
          : isKetoGlobal
          ? "High-protein, low-carb recovery — Greek yoghurt provides casein and whey for sustained muscle repair."
          : "The optimal post-workout window is 30–45 minutes. This shake covers protein and glycogen replenishment.",
        calories: isKetoGlobal ? 290 : 340,
        protein:  isKetoGlobal ? 28  : 34,
        carbs:    isKetoGlobal ? 10  : 44,
        fat:      isKetoGlobal ? 14  : 7,
        ingredients: isVeganGlobal ? "plant protein powder, banana, oats, almond milk" : isKetoGlobal ? "Greek yoghurt, mixed seeds, berries" : "protein powder, banana, oats, whole milk",
        steps: isVeganGlobal
          ? "1. Add 1 scoop plant protein powder to a blender. 2. Add 300ml unsweetened almond milk. 3. Add ½ ripe banana and 30g rolled oats. 4. Blend for 30–40 seconds until smooth. 5. Drink within 30–45 minutes of finishing your workout."
          : isKetoGlobal
          ? "1. Spoon 200g full-fat Greek yoghurt into a bowl. 2. Add a handful of mixed berries (fresh or frozen and thawed). 3. Sprinkle 1 tbsp pumpkin seeds and 1 tsp chia seeds over the top. 4. Drizzle with a little honey if desired. 5. Eat within 30 minutes of your session."
          : "1. Add 1 scoop whey or protein powder to a blender or large shaker. 2. Add 300ml whole milk. 3. Add ½ ripe banana and 30g rolled oats. 4. Blend for 20–30 seconds or shake vigorously. 5. Drink within 30–45 minutes of finishing your session.",
      });
    });
  }

  // Save to mealHistory
  const summary = [
    goal==="lose"?"Fat Loss":goal==="gain"?"Muscle Gain":"Maintenance",
    mealStyle==="highProtein"?"High Protein":mealStyle==="light"?"Light & Lean":"Balanced",
    ...(dietary.length ? [dietary.slice(0,3).join(", ")] : []),
  ].join(" · ");
  const mealHistory = getData("mealHistory") || [];
  mealHistory.push({ generatedAt:new Date().toISOString(), inputs:{groceries,mealStyle,cookTime,dietary,goal}, days:weekDays, summary });
  saveData("mealHistory", mealHistory);

  // ── Populate the left-column coaching card ───────────────────────────────
  const sportKey4card = detectSport(profile?.fitnessExperience || "");
  const sn4card       = SPORT_NUTRITION[sportKey4card] || SPORT_NUTRITION.gym;
  const sportLabel4card = { running:"🏃 Running", cycling:"🚴 Cycling", swimming:"🏊 Swimming", calisthenics:"🤸 Calisthenics", triathlon:"🏅 Triathlon", crossfit:"⚡ CrossFit", combat:"🥊 Combat", team_sport:"⚽ Team Sport", gym:"🏋️ Strength" }[sportKey4card] || "🏋️ Strength";
  const mccSportLbl = document.getElementById("mccSportLabel");
  const mccBody     = document.getElementById("mccBody");
  if (mccSportLbl) mccSportLbl.textContent = sportLabel4card;
  if (mccBody) {
    mccBody.className = "mcc-body-active";
    mccBody.innerHTML = `
      <div class="mcc-protocol-row">
        <div class="mcc-protocol-item mcc-carb">
          <strong>⏰ Carb & Fuel Timing</strong>
          ${sn4card.carbTiming.replace(/^[A-Z ]+: /,"")}
        </div>
        <div class="mcc-protocol-item mcc-prot">
          <strong>🥩 Protein Protocol</strong>
          ${sn4card.protein.replace(/^[A-Z ]+: /,"")}
        </div>
        <div class="mcc-protocol-item mcc-hydro">
          <strong>💧 Hydration</strong>
          ${sn4card.hydration.replace(/^[A-Z ]+: /,"")}
        </div>
      </div>
      <div class="mcc-perf-tip">
        <span class="mcc-perf-tip-icon">🔬</span>
        <span>${sn4card.performanceTip}</span>
      </div>
    `;
  }

  // Render note with sport-specific nutrition coaching
  const note = document.getElementById("mealPersonalNote");
  if (note) {
    const sportKey  = detectSport(profile?.fitnessExperience || "");
    const sn        = SPORT_NUTRITION[sportKey] || SPORT_NUTRITION.gym;
    const sportName = { running:"Running", cycling:"Cycling", swimming:"Swimming", calisthenics:"Calisthenics", triathlon:"Triathlon", crossfit:"CrossFit", combat:"Combat Sports", team_sport:"Team Sport", gym:"Strength Training" }[sportKey] || "Training";
    const goalLabel = goal==="lose"?"fat loss":goal==="gain"?"muscle gain":"maintenance";
    note.style.display = "";
    note.innerHTML = `
      <div class="meal-note-header"><strong>7-day ${goalLabel} plan</strong>${dietary.length?` · <span class="meal-note-diets">${dietary.join(", ")}</span>`:""}${groceries?" · using your kitchen":""}</div>
      <div class="meal-note-sport-tag">${sportName} Nutrition Protocol</div>
      <div class="meal-note-coaching">${sn.carbTiming}</div>
      <div class="meal-note-tip"><span class="meal-note-tip-icon">💡</span>${sn.performanceTip}</div>
      <div class="meal-note-keyfoods"><strong>Key foods this week:</strong> ${sn.keyFoods.join(" · ")}</div>
    `;
  }

  // ── Meal tick-off tracker logic ─────────────────────────────────────────
  // Per-day checked state stored in sessionStorage so it persists while on page
  window.mdtToggle = function(di, mi, storageKey, totalMeals, totalCals) {
    const stateRaw = sessionStorage.getItem(storageKey);
    const state    = stateRaw ? JSON.parse(stateRaw) : {};
    state[mi] = !state[mi];
    sessionStorage.setItem(storageKey, JSON.stringify(state));
    mdtRender(di, state, totalMeals, totalCals);
  };

  function mdtRender(di, state, totalMeals, totalCals) {
    const checked = Object.values(state).filter(Boolean).length;
    // Rows
    Object.keys(state).forEach(mi => {
      const row = document.getElementById(`mdt_row_${di}_${mi}`);
      if (row) row.classList.toggle("mdt-checked", !!state[mi]);
    });
    // Pill
    const pill = document.getElementById(`mdt_pill_${di}`);
    if (pill) {
      pill.textContent = `${checked} / ${totalMeals} eaten`;
      pill.classList.toggle("mdt-done", checked === totalMeals);
    }
    // Calorie bar
    const eatenCals = weekDays[di]?.meals
      .reduce((s,m,i) => s + (state[i] ? (m.calories||0) : 0), 0) || 0;
    const pct = Math.min(100, Math.round((eatenCals / (totalCals||1)) * 100));
    const fill  = document.getElementById(`mdt_bar_fill_${di}`);
    const label = document.getElementById(`mdt_bar_label_${di}`);
    if (fill)  fill.style.width  = pct + "%";
    if (label) label.textContent = `${eatenCals} / ${totalCals} kcal`;
  }


  output.innerHTML = `
    <div class="meal-week-tabs">
      <div class="meal-tab-bar">
        ${weekDays.map((day, di) => `
          <button class="meal-tab-btn${di===0?" active":""}" onclick="switchMealDay(${di})">
            <span class="meal-tab-dayname">${day.dayName.slice(0,3)}</span>
            <span class="meal-tab-date">${day.dateStr.split(" ").slice(1).join(" ")}</span>
          </button>`).join("")}
      </div>
      <div class="meal-tab-panels">
        ${weekDays.map((day, di) => {
          const workoutMeals = day.meals.filter(m => m.type === "Pre-Workout" || m.type === "Post-Workout");
          const totalCal     = day.meals.reduce((s, m) => s + (m.calories || 0), 0);
          const workoutCal   = workoutMeals.reduce((s, m) => s + (m.calories || 0), 0);
          const totalPro     = day.meals.reduce((s, m) => s + (m.protein  || 0), 0);
          const isWorkoutDay = workoutMeals.length > 0;
          return `
          <div class="meal-day-panel${di===0?" active":""}" data-day="${di}">
            <div class="meal-day-title">
              <span class="meal-day-full">${day.dayName}${isWorkoutDay ? " 🏋️" : ""}</span>
              <span class="meal-day-datestr">${day.dateStr}</span>
            </div>
            ${isWorkoutDay ? `
            <div class="workout-day-banner">
              <div class="workout-day-banner-left">
                <span class="workout-day-badge">TRAINING DAY</span>
                <span class="workout-day-totals">~${totalCal} kcal total · ~${totalPro}g protein</span>
              </div>
              <div class="workout-day-banner-right">
                <span class="workout-day-note">Pre + post workout meals included (+${workoutCal} kcal to support recovery)</span>
              </div>
            </div>` : ""}
            <div class="meal-day-cards">
              ${day.meals.filter(m => m.type !== "Pre-Workout" && m.type !== "Post-Workout").map((m, mi) => `
                <div class="meal-card" style="animation-delay:${mi*0.06}s">
                  <div class="meal-icon">${m.icon}</div>
                  <div class="meal-info">
                    <div class="meal-type-tag">${m.type} · ${m.time}</div>
                    <h4>${m.name}</h4>
                    <p>${m.description}</p>
                    ${m.ingredients ? `<div class="meal-ingredients"><strong>Ingredients:</strong> ${m.ingredients}</div>` : ""}
                    ${m.steps ? `
                    <button class="recipe-toggle-btn" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open')">
                      <span class="recipe-toggle-label">View Recipe</span>
                      <span class="recipe-toggle-arrow">▾</span>
                    </button>
                    <div class="meal-recipe-dropdown"><ol>${m.steps.split(/\.\s+(?=\d)/).map(s=>s?s.trim():null).filter(s=>s&&s.length>1).map(s=>`<li>${s.replace(/^\d+\.\s*/,"").trim()}${s.endsWith(".")?"":'.'}</li>`).join('')}</ol></div>` : ""}
                  </div>
                  <div class="meal-macros">
                    <span class="macro-tag">~${m.calories} kcal</span>
                    <span class="macro-tag">${m.protein}g protein</span>
                    <span class="macro-tag">${m.carbs}g carbs</span>
                    <span class="macro-tag">${m.fat}g fat</span>
                  </div>
                </div>`).join("")}
            </div>
            ${isWorkoutDay ? (() => {
              const wMeals = day.meals.filter(m => m.type === "Pre-Workout" || m.type === "Post-Workout");
              return `<div class="workout-nutrition-section">
                <div class="workout-nutrition-title">🏋️ Workout Nutrition</div>
                <div class="workout-nutrition-grid">
                  ${wMeals.map(m => `
                    <div class="workout-meal-card ${m.type === "Pre-Workout" ? "wmc--pre" : "wmc--post"}">
                      <div class="wmc-header">
                        <span class="wmc-icon">${m.icon}</span>
                        <div>
                          <div class="wmc-type">${m.type}</div>
                          <div class="wmc-time">${m.time}</div>
                        </div>
                      </div>
                      <div class="wmc-name">${m.name}</div>
                      <p class="wmc-desc">${m.description}</p>
                      ${m.ingredients ? `<div class="wmc-ingredients"><strong>Needs:</strong> ${m.ingredients}</div>` : ""}
                      ${m.steps ? `
                      <button class="recipe-toggle-btn wmc-recipe-btn" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open')">
                        <span class="recipe-toggle-label">View Recipe</span><span class="recipe-toggle-arrow">▾</span>
                      </button>
                      <div class="meal-recipe-dropdown"><ol>${m.steps.split(/\.\s+(?=\d)/).map(s=>s?s.trim():null).filter(s=>s&&s.length>1).map(s=>`<li>${s.replace(/^\d+\.\s*/,"").trim()}${s.endsWith(".")?"":'.'}</li>`).join('')}</ol></div>` : ""}
                      <div class="wmc-macros">
                        <span class="macro-tag">~${m.calories} kcal</span>
                        <span class="macro-tag">${m.protein}g protein</span>
                        <span class="macro-tag">${m.carbs}g carbs</span>
                      </div>
                    </div>`).join("")}
                </div>
              </div>`;
            })() : `<div class="rest-day-nutrition-section">
              <div class="rest-day-nutrition-title">😴 Rest Day Nutrition Focus</div>
              <div class="rest-day-nutrition-grid">
                <div class="rdnc rdnc--recovery">
                  <div class="rdnc-header">
                    <span class="rdnc-icon">🥗</span>
                    <div>
                      <div class="rdnc-type">Recovery Nutrition</div>
                      <div class="rdnc-note">What to prioritise today</div>
                    </div>
                  </div>
                  <p class="rdnc-desc">Rest days are when your muscles actually repair and grow. Fuel the process with anti-inflammatory whole foods — leafy greens, berries, oily fish, and nuts reduce soreness and accelerate tissue repair.</p>
                  <div class="rdnc-checklist">
                    <div class="rdnc-check">✓ Prioritise colourful vegetables &amp; berries</div>
                    <div class="rdnc-check">✓ Omega-3 sources: salmon, walnuts, flaxseed</div>
                    <div class="rdnc-check">✓ 2–3L water throughout the day</div>
                    <div class="rdnc-check">✓ Magnesium-rich foods: dark chocolate, spinach, almonds</div>
                  </div>
                </div>
                <div class="rdnc rdnc--calorie">
                  <div class="rdnc-header">
                    <span class="rdnc-icon">⚖️</span>
                    <div>
                      <div class="rdnc-type">Calorie Adjustment</div>
                      <div class="rdnc-note">Rest day macro targets</div>
                    </div>
                  </div>
                  <p class="rdnc-desc">Reduce carbohydrates by 20–30% on rest days (glycogen demand is lower) while keeping protein identical to training days. This carb-cycling approach optimises body composition without compromising muscle repair.</p>
                  <div class="rdnc-checklist">
                    <div class="rdnc-check">✓ Protein: maintain your full daily target</div>
                    <div class="rdnc-check">✓ Carbs: reduce by ~20–30% vs training days</div>
                    <div class="rdnc-check">✓ Healthy fats can increase slightly to compensate</div>
                    <div class="rdnc-check">✓ Avoid alcohol — it blocks muscle protein synthesis</div>
                  </div>
                </div>
              </div>
            </div>`}
            ${(() => {
              // ── Daily Meal Tick-Off Tracker — bottom of every day panel ─────
              const allMeals   = day.meals;
              const totalCals  = allMeals.reduce((s,m)=>s+(m.calories||0),0);
              const trackerKey = `mdt_${day.dateISO}`;
              return `<div class="meal-day-tracker" id="mdt_wrap_${di}">
                <div class="mdt-header">
                  <span class="mdt-title">📋 Today's Meal Log</span>
                  <span class="mdt-progress-pill" id="mdt_pill_${di}">0 / ${allMeals.length} eaten</span>
                </div>
                <div class="mdt-rows">
                  ${allMeals.map((m, mi) => `
                    <div class="mdt-row" id="mdt_row_${di}_${mi}" onclick="mdtToggle(${di},${mi},'${trackerKey}',${allMeals.length},${totalCals})">
                      <div class="mdt-checkbox"><span class="mdt-checkbox-tick">✓</span></div>
                      <div class="mdt-meal-info">
                        <div class="mdt-meal-name">${m.icon} ${m.name}</div>
                        <div class="mdt-meal-time">${m.type} · ${m.time}</div>
                      </div>
                      <span class="mdt-kcal">${m.calories} kcal</span>
                    </div>`).join("")}
                </div>
                <div class="mdt-calbar" id="mdt_bar_${di}">
                  <div class="mdt-calbar-label">
                    <span>Calories consumed today</span>
                    <span id="mdt_bar_label_${di}">0 / ${totalCals} kcal</span>
                  </div>
                  <div class="mdt-calbar-track">
                    <div class="mdt-calbar-fill" id="mdt_bar_fill_${di}" style="width:0%"></div>
                  </div>
                </div>
              </div>`;
            })()}
          </div>`;
        }).join("")}
      </div>
    </div>`;

  // Generate shopping list — strips items the user already has, renders full-width at bottom
  renderShoppingStrip(weekDays, groceries, dietary, goal);
};

// ── SHOPPING LIST ─────────────────────────────────────────────────────────────
// Renders the full-width shopping strip at the bottom of the meals page.
// Excludes ingredients the user already has, shows weekly quantities, adds tips.
function renderShoppingStrip(weekDays, groceriesRaw, dietary, goal) {
  const section = document.getElementById("shoppingStripSection");
  const el      = document.getElementById("shoppingList");
  if (!el) return;

  // Parse "already have" into a normalised set for substring matching
  const alreadyHave = (groceriesRaw || "")
    .toLowerCase()
    .split(/[,\n]+/)
    .map(s => s.trim())
    .filter(Boolean);

  const userHas = item => alreadyHave.some(h => item.toLowerCase().includes(h) || h.includes(item.toLowerCase().split(" ")[0]));

  // Count ingredient occurrences across the week to derive quantity
  const countMap = {};
  weekDays.forEach(day => {
    day.meals.forEach(meal => {
      if (!meal.ingredients) return;
      meal.ingredients.split(",").map(s => s.trim()).filter(s => s.length > 1).forEach(ing => {
        const key = ing.toLowerCase();
        countMap[key] = (countMap[key] || 0) + 1;
      });
    });
  });

  // Build categorised list, excluding what user already has
  const CATS = {
    "🥬 Fresh Produce":     { test: i => /apple|banana|orange|berr|mango|spinach|lettuce|tomato|onion|garlic|carrot|broccoli|cauliflower|potato|avocado|lemon|lime|ginger|cucumber|peppers?|courgette|asparagus|pak choi|celery/.test(i), items: [] },
    "🥩 Meat & Seafood":    { test: i => /chicken|beef|pork|fish|salmon|tuna|turkey|lamb|shrimp|prawn|mackerel|halal/.test(i), items: [] },
    "🥛 Dairy & Eggs":      { test: i => /milk|cheese|yogh?urt|butter|cream|egg|ricotta|cottage cheese|halloumi/.test(i), items: [] },
    "🥫 Grains & Pulses":   { test: i => /rice|pasta|bread|flour|oat|quinoa|lentil|bean|chickpea|noodle|pitta|bulgur|buckwheat|millet|tempeh|tofu/.test(i), items: [] },
    "🥜 Nuts, Seeds & Oils":{ test: i => /nut|seed|almond|walnut|chia|flax|oil|peanut|sunflower|sesame|tahini/.test(i), items: [] },
    "🧂 Condiments":        { test: i => /sauce|soy|honey|maple|vinegar|mustard|pesto|hummus|salsa|teriyaki|coconut milk|curry/.test(i), items: [] },
    "🫙 Pantry Extras":     { test: () => true, items: [] },
  };

  // Weekly quantity helper
  const qty = (ing, count) => {
    const i = ing.toLowerCase();
    if (/chicken|beef|salmon|tuna|turkey|lamb|fish|pork/.test(i)) return `${count * 150}g`;
    if (/yogh?urt|cottage cheese/.test(i))  return `${count * 180}g`;
    if (/oat/.test(i))   return `${count * 50}g`;
    if (/rice|quinoa|pasta|bulgur/.test(i)) return `${count * 80}g`;
    if (/egg/.test(i))   return `${count * 2} eggs`;
    if (/milk/.test(i))  return `${Math.round(count * 0.25 * 10) / 10}L`;
    if (/bread|pitta/.test(i)) return `${count} serving${count > 1 ? "s" : ""}`;
    return `×${count}`;
  };

  Object.entries(countMap).forEach(([ing, count]) => {
    if (userHas(ing)) return; // skip if user already has it
    const display = ing.charAt(0).toUpperCase() + ing.slice(1);
    const label   = `${display} — ${qty(ing, count)}`;
    for (const [, cat] of Object.entries(CATS)) {
      if (cat.test(ing)) { cat.items.push(label); break; }
    }
  });

  // Remove empty categories
  const filledCats = Object.entries(CATS).filter(([, c]) => c.items.length > 0);

  if (!filledCats.length) {
    el.innerHTML = `<p style="color:var(--text-secondary);text-align:center;padding:20px 0">
      Everything in your plan is already in your kitchen! 🎉
    </p>`;
    if (section) section.style.display = "";
    return;
  }

  // Dynamic tips tailored to the dietary profile + goal
  const tips = buildShoppingTips(dietary, goal);

  // Weekly nutrition totals — for the macro overview widget
  const wkTotals = weekDays.reduce((acc, day) => {
    day.meals.forEach(m => {
      acc.cal  += (m.calories || 0);
      acc.prot += (m.protein  || 0);
      acc.carbs+= (m.carbs    || 0);
      acc.fat  += (m.fat      || 0);
    });
    return acc;
  }, { cal: 0, prot: 0, carbs: 0, fat: 0 });

  const totalItems = filledCats.reduce((s, [, c]) => s + c.items.length, 0);
  const dayAvgCal  = Math.round(wkTotals.cal  / 7);
  const dayAvgProt = Math.round(wkTotals.prot / 7);
  const protCals   = wkTotals.prot * 4;
  const carbCals   = wkTotals.carbs * 4;
  const fatCals    = wkTotals.fat * 9;
  const totalMacCals = protCals + carbCals + fatCals || 1;
  const protPct    = Math.round((protCals  / totalMacCals) * 100);
  const carbPct    = Math.round((carbCals  / totalMacCals) * 100);
  const fatPct     = Math.round((fatCals   / totalMacCals) * 100);

  // Identify bulk-cookable proteins and grains for prep planner
  const prepProteins = (filledCats.find(([n]) => n.includes("Meat"))?.[1].items || []).slice(0, 3);
  const prepGrains   = (filledCats.find(([n]) => n.includes("Grains"))?.[1].items || []).slice(0, 3);
  const goalCalNote  = goal === "lose"
    ? `Target: ~${dayAvgCal} kcal/day (deficit)`
    : goal === "gain"
    ? `Target: ~${dayAvgCal} kcal/day (surplus)`
    : `Target: ~${dayAvgCal} kcal/day (maintenance)`;

  // Dynamic filler: always show nutrition widget; show prep planner and value index based on space
  const showNutritionWidget = true;       // always visible
  const showPrepPlanner     = totalItems < 25;
  const showValueIndex      = totalItems < 35;

  const nutritionWidgetHTML = showNutritionWidget ? `
    <div class="shopping-nutrition-widget">
      <div class="snw-title">📊 Your 7-Day Nutrition Targets</div>
      <div class="snw-body">
        <div class="snw-stats">
          <div class="snw-stat">
            <div class="snw-stat-val">${wkTotals.cal.toLocaleString()}</div>
            <div class="snw-stat-label">Total kcal / week</div>
          </div>
          <div class="snw-stat">
            <div class="snw-stat-val">${dayAvgCal}</div>
            <div class="snw-stat-label">Avg kcal / day</div>
          </div>
          <div class="snw-stat">
            <div class="snw-stat-val">${wkTotals.prot}g</div>
            <div class="snw-stat-label">Total protein / wk</div>
          </div>
          <div class="snw-stat">
            <div class="snw-stat-val">${dayAvgProt}g</div>
            <div class="snw-stat-label">Avg protein / day</div>
          </div>
        </div>
        <div class="snw-bars">
          <div class="snw-goal-note">${goalCalNote}</div>
          <div class="snw-bar-row">
            <span class="snw-bar-label">Protein</span>
            <div class="snw-bar-track"><div class="snw-bar-fill snw-bar-protein" style="width:${protPct}%"></div></div>
            <span class="snw-bar-pct">${protPct}%</span>
          </div>
          <div class="snw-bar-row">
            <span class="snw-bar-label">Carbs</span>
            <div class="snw-bar-track"><div class="snw-bar-fill snw-bar-carbs" style="width:${carbPct}%"></div></div>
            <span class="snw-bar-pct">${carbPct}%</span>
          </div>
          <div class="snw-bar-row">
            <span class="snw-bar-label">Fat</span>
            <div class="snw-bar-track"><div class="snw-bar-fill snw-bar-fat" style="width:${fatPct}%"></div></div>
            <span class="snw-bar-pct">${fatPct}%</span>
          </div>
        </div>
      </div>
    </div>` : "";

  const prepPlannerHTML = showPrepPlanner ? `
    <div class="shopping-prep-planner">
      <div class="spp-title">📅 Smart Batch Prep Plan</div>
      <div class="spp-grid">
        <div class="spp-day">
          <div class="spp-day-header">
            <span class="spp-day-name">Sunday Prep</span>
            <span class="spp-day-tag spp-tag-primary">~2–3 hrs</span>
          </div>
          <ul class="spp-list">
            ${prepProteins.length
              ? prepProteins.map(p => `<li>🥩 Cook ${p.split(" —")[0].trim()} in bulk</li>`).join("")
              : "<li>🥩 Batch cook your main proteins</li>"}
            ${prepGrains.length
              ? prepGrains.map(g => `<li>🍚 Cook ${g.split(" —")[0].trim()} in large pot</li>`).join("")
              : "<li>🍚 Cook grains in a large batch</li>"}
            <li>🥗 Wash, chop &amp; store all vegetables</li>
            <li>🥫 Portion everything into labelled containers</li>
          </ul>
        </div>
        <div class="spp-day">
          <div class="spp-day-header">
            <span class="spp-day-name">Wednesday Top-Up</span>
            <span class="spp-day-tag spp-tag-secondary">~30–45 min</span>
          </div>
          <ul class="spp-list">
            <li>🔄 Replenish fresh veg and fruit</li>
            <li>🥩 Cook second half of proteins if needed</li>
            <li>🍱 Repack remaining containers for Thurs–Sat</li>
            <li>💧 Check hydration bottles are ready</li>
          </ul>
        </div>
        <div class="spp-day">
          <div class="spp-day-header">
            <span class="spp-day-name">Daily (5 min)</span>
            <span class="spp-day-tag spp-tag-tertiary">Every morning</span>
          </div>
          <ul class="spp-list">
            <li>☀️ Pull today's meals from the fridge</li>
            <li>🥤 Prep breakfast fresh (5–10 min max)</li>
            <li>💊 Take any supplements with breakfast</li>
            <li>🎯 Review today's training &amp; nutrition targets</li>
          </ul>
        </div>
      </div>
    </div>` : "";

  // Protein value index — ranks top ingredients by protein density
  const PROTEIN_DENSITY = {
    "chicken breast":32,"turkey mince":29,"tuna":26,"salmon fillet":25,"lean beef mince":26,
    "eggs":13,"Greek yoghurt":10,"cottage cheese":11,"halloumi":18,"tempeh":19,
    "tofu":8,"lentils":9,"chickpeas":8,"black beans":8,"edamame":11,
  };
  const valueItems = filledCats.flatMap(([,c])=>c.items)
    .map(item => {
      const key = Object.keys(PROTEIN_DENSITY).find(k => item.toLowerCase().includes(k));
      return key ? { name: item.split(" —")[0].trim(), prot: PROTEIN_DENSITY[key] } : null;
    })
    .filter(Boolean)
    .sort((a,b)=>b.prot-a.prot)
    .slice(0,6);

  const valueIndexHTML = showValueIndex && valueItems.length > 1 ? `
    <div class="shopping-value-index">
      <div class="svi-title">💪 Protein Power Ranking</div>
      <div class="svi-subtitle">Best protein sources in your list, ranked by g protein per 100g</div>
      <div class="svi-grid">
        ${valueItems.map((item, i) => `
          <div class="svi-item">
            <span class="svi-rank">${["🥇","🥈","🥉","4️⃣","5️⃣","6️⃣"][i]}</span>
            <span class="svi-name">${item.name}</span>
            <div class="svi-bar-track"><div class="svi-bar-fill" style="width:${Math.min(100,Math.round(item.prot/32*100))}%"></div></div>
            <span class="svi-prot">${item.prot}g</span>
          </div>`).join("")}
      </div>
    </div>` : "";

  // Shopping summary bar stats
  const proteinCats   = filledCats.find(([n]) => n.includes("Meat"))?.[1].items.length || 0;
  const totalServings = weekDays.reduce((s, d) => s + d.meals.length, 0);
  const estimatedMins = Math.round(totalItems * 2.5);   // ~2.5 min prep per unique ingredient
  const summaryBarHTML = `
    <div class="shopping-summary-bar">
      <div class="ssb-stat">
        <span class="ssb-icon">🛒</span>
        <div class="ssb-val">${totalItems}<span class="ssb-val-unit"> items</span></div>
        <div class="ssb-label">to buy</div>
      </div>
      <div class="ssb-stat">
        <span class="ssb-icon">🍽️</span>
        <div class="ssb-val">${totalServings}<span class="ssb-val-unit"> meals</span></div>
        <div class="ssb-label">this week</div>
      </div>
      <div class="ssb-stat">
        <span class="ssb-icon">🥩</span>
        <div class="ssb-val">${proteinCats}<span class="ssb-val-unit"> types</span></div>
        <div class="ssb-label">protein sources</div>
      </div>
      <div class="ssb-stat">
        <span class="ssb-icon">⏱️</span>
        <div class="ssb-val">${estimatedMins}<span class="ssb-val-unit"> min</span></div>
        <div class="ssb-label">est. prep time</div>
      </div>
    </div>`;

  el.innerHTML = `
    <div class="shopping-strip-header">
      <div>
        <div class="shopping-strip-title">🛒 Your Weekly Shopping List</div>
        <div class="shopping-strip-sub">Exact quantities for 7 days · items you already have excluded</div>
      </div>
      <div class="shopping-strip-actions">
        <button class="btn-print-list" onclick="printShoppingList()">🖨️ Print</button>
        <button class="btn-share-list" onclick="shareShoppingList()">📤 Share</button>
      </div>
    </div>
    <div class="shopping-categories-strip" id="shopCatStrip">
      ${filledCats.map(([name, cat]) => `
        <div class="shopping-category">
          <h4>${name}</h4>
          <ul class="shopping-items">
            ${cat.items.map(item => `<li class="shopping-item">${item}</li>`).join("")}
          </ul>
        </div>`).join("")}
    </div>
    ${summaryBarHTML}
    ${nutritionWidgetHTML}
    ${valueIndexHTML}
    ${prepPlannerHTML}
    <div class="shopping-tips-section">
      <div class="shopping-tips-section-title">💡 Smart Shopping Tips</div>
      <div class="shopping-tips-row">
        ${tips.map(t => `<div class="shopping-tip-card"><strong>${t.label}</strong>${t.text}</div>`).join("")}
      </div>
    </div>`;

  if (section) section.style.display = "";

  // ── Span the last category to fill any incomplete grid row ───────────────
  requestAnimationFrame(() => {
    const strip = document.getElementById("shopCatStrip");
    if (!strip) return;
    const cats = Array.from(strip.querySelectorAll(".shopping-category"));
    if (cats.length < 2) return;

    // Count how many categories sit on the first row by comparing offsetTop
    const firstTop = cats[0].getBoundingClientRect().top;
    let cols = 0;
    for (const c of cats) {
      if (Math.abs(c.getBoundingClientRect().top - firstTop) < 4) cols++;
      else break;
    }
    if (cols < 2) return;

    const remainder = cats.length % cols;
    if (remainder === 0) return; // already fills perfectly

    // Last item spans the remaining empty columns
    const span = cols - remainder + 1;
    const last = cats[cats.length - 1];
    last.style.gridColumn = `span ${span}`;

    // Lay out items inside the wider cell in multiple columns
    const ul = last.querySelector(".shopping-items");
    if (ul && span > 1) {
      ul.style.display = "grid";
      ul.style.gridTemplateColumns = `repeat(${span}, 1fr)`;
      ul.style.columnGap = "14px";
    }
  });
}

function buildShoppingTips(dietary, goal) {
  const isVegan  = dietary.some(d => /vegan/i.test(d));
  const isKeto   = dietary.some(d => /keto/i.test(d));
  const isHalal  = dietary.some(d => /halal/i.test(d));
  const isGF     = dietary.some(d => /gluten/i.test(d));

  const base = [
    { label:"💡 Buy Smart",   text: "Check unit prices, not pack prices. Bigger packs are almost always cheaper per gram for staples like oats, rice, and pasta." },
    { label:"🧊 Batch Freeze", text: "Buy chicken breasts and fish in bulk — portion and freeze immediately. This cuts weekly spending by 20–30% on protein." },
    { label:"📅 Prep Day",     text: "Shop Sunday, prep Monday. Cooking grains and proteins in advance saves 45+ minutes each weekday and keeps you on plan." },
    { label:"🌿 Seasonal Veg", text: "Seasonal produce is 30–50% cheaper and significantly more nutritious. Ask your greengrocer what's in season right now." },
  ];

  if (goal === "gain") base.push({ label:"⚡ Calorie Dense", text: "Olive oil, nut butters, avocado, and whole milk are your friends for hitting a calorie surplus without volume eating." });
  if (goal === "lose") base.push({ label:"🔥 Satiety Picks", text: "Prioritise high-volume, low-calorie items: leafy greens, cucumber, celery, and berries keep hunger low while staying in a deficit." });
  if (isVegan)  base.push({ label:"🌱 Vegan Protein", text: "Lentils (26g/100g dry), edamame (18g/100g), and firm tofu (17g/100g) are your most cost-effective plant protein sources." });
  if (isKeto)   base.push({ label:"🥑 Keto Budget",  text: "Eggs, tinned fish, frozen chicken, cabbage, and cream cheese deliver keto macros at the lowest cost per meal." });
  if (isHalal)  base.push({ label:"🌙 Halal Tips",   text: "Halal butchers are often 20–30% cheaper than supermarket halal sections. Buying a larger cut and slicing yourself saves further." });
  if (isGF)     base.push({ label:"🌾 Gluten-Free",  text: "Rice, quinoa, buckwheat, and potato are naturally GF and far cheaper than branded gluten-free substitutes. Prioritise these." });

  base.push({ label:"🛒 List Discipline", text: "Stick to the list — impulse buys account for 20–30% of the average grocery bill. Eat before you shop and never go hungry." });

  return base.slice(0, 6); // show max 6 tips
}

// ── HISTORICAL MEAL PLAN RENDERER ─────────────────────────────────────────────
// Called on meals.html load when navigating from profile "View Meal Plan" button.
// Reproduces the exact same output as generateMeals() using stored history data.
window.renderHistoricalMealPlan = function() {
  const _mealHistIdx = sessionStorage.getItem("fs_viewMealHistIdx");
  if (_mealHistIdx === null) return;
  sessionStorage.removeItem("fs_viewMealHistIdx");

  const history = getData("mealHistory") || [];
  const entry   = history[parseInt(_mealHistIdx, 10)];
  if (!entry?.days?.length) return;

  const weekDays  = entry.days;
  const dietary   = entry.inputs?.dietary   || [];
  const goal      = entry.inputs?.goal      || "maintain";
  const groceries = entry.inputs?.groceries || "";
  const profile   = getData("planProfile");

  const output = document.getElementById("mealOutput");
  if (!output) return;

  // ── Coaching card ────────────────────────────────────────────────────────
  const sportKey4card   = detectSport(profile?.fitnessExperience || "");
  const sn4card         = SPORT_NUTRITION[sportKey4card] || SPORT_NUTRITION.gym;
  const sportLabel4card = { running:"🏃 Running", cycling:"🚴 Cycling", swimming:"🏊 Swimming", calisthenics:"🤸 Calisthenics", triathlon:"🏅 Triathlon", crossfit:"⚡ CrossFit", combat:"🥊 Combat", team_sport:"⚽ Team Sport", gym:"🏋️ Strength" }[sportKey4card] || "🏋️ Strength";
  const mccSportLbl = document.getElementById("mccSportLabel");
  const mccBody     = document.getElementById("mccBody");
  if (mccSportLbl) mccSportLbl.textContent = sportLabel4card;
  if (mccBody) {
    mccBody.className = "mcc-body-active";
    mccBody.innerHTML = `
      <div class="mcc-protocol-row">
        <div class="mcc-protocol-item mcc-carb"><strong>⏰ Carb & Fuel Timing</strong>${sn4card.carbTiming.replace(/^[A-Z ]+: /,"")}</div>
        <div class="mcc-protocol-item mcc-prot"><strong>🥩 Protein Protocol</strong>${sn4card.protein.replace(/^[A-Z ]+: /,"")}</div>
        <div class="mcc-protocol-item mcc-hydro"><strong>💧 Hydration</strong>${sn4card.hydration.replace(/^[A-Z ]+: /,"")}</div>
      </div>
      <div class="mcc-perf-tip"><span class="mcc-perf-tip-icon">🔬</span><span>${sn4card.performanceTip}</span></div>`;
  }

  // ── Personal note ────────────────────────────────────────────────────────
  const note = document.getElementById("mealPersonalNote");
  if (note) {
    const sportKey  = detectSport(profile?.fitnessExperience || "");
    const sn        = SPORT_NUTRITION[sportKey] || SPORT_NUTRITION.gym;
    const sportName = { running:"Running", cycling:"Cycling", swimming:"Swimming", calisthenics:"Calisthenics", triathlon:"Triathlon", crossfit:"CrossFit", combat:"Combat Sports", team_sport:"Team Sport", gym:"Strength Training" }[sportKey] || "Training";
    const goalLabel = goal==="lose"?"fat loss":goal==="gain"?"muscle gain":"maintenance";
    note.style.display = "";
    note.innerHTML = `
      <div class="meal-note-header"><strong>7-day ${goalLabel} plan</strong>${dietary.length?` · <span class="meal-note-diets">${dietary.join(", ")}</span>`:""}${groceries?" · using your kitchen":""}</div>
      <div class="meal-note-sport-tag">${sportName} Nutrition Protocol</div>
      <div class="meal-note-coaching">${sn.carbTiming}</div>
      <div class="meal-note-tip"><span class="meal-note-tip-icon">💡</span>${sn.performanceTip}</div>
      <div class="meal-note-keyfoods"><strong>Key foods this week:</strong> ${sn.keyFoods.join(" · ")}</div>`;
  }

  // ── Meal tick-off tracker ────────────────────────────────────────────────
  window.mdtToggle = function(di, mi, storageKey, totalMeals, totalCals) {
    const stateRaw = sessionStorage.getItem(storageKey);
    const state    = stateRaw ? JSON.parse(stateRaw) : {};
    state[mi] = !state[mi];
    sessionStorage.setItem(storageKey, JSON.stringify(state));
    mdtRenderHist(di, state, totalMeals, totalCals);
  };
  function mdtRenderHist(di, state, totalMeals, totalCals) {
    const checked = Object.values(state).filter(Boolean).length;
    Object.keys(state).forEach(mi => {
      const row = document.getElementById(`mdt_row_${di}_${mi}`);
      if (row) row.classList.toggle("mdt-checked", !!state[mi]);
    });
    const pill = document.getElementById(`mdt_pill_${di}`);
    if (pill) { pill.textContent = `${checked} / ${totalMeals} eaten`; pill.classList.toggle("mdt-done", checked === totalMeals); }
    const eatenCals = weekDays[di]?.meals.reduce((s,m,i) => s + (state[i] ? (m.calories||0) : 0), 0) || 0;
    const pct = Math.min(100, Math.round((eatenCals / (totalCals||1)) * 100));
    const fill  = document.getElementById(`mdt_bar_fill_${di}`);
    const label = document.getElementById(`mdt_bar_label_${di}`);
    if (fill)  fill.style.width  = pct + "%";
    if (label) label.textContent = `${eatenCals} / ${totalCals} kcal`;
  }


  // ── Render output HTML (identical structure to generateMeals) ────────────
  output.innerHTML = `
    <div class="meal-week-tabs">
      <div class="meal-tab-bar">
        ${weekDays.map((day, di) => `
          <button class="meal-tab-btn${di===0?" active":""}" onclick="switchMealDay(${di})">
            <span class="meal-tab-dayname">${day.dayName.slice(0,3)}</span>
            <span class="meal-tab-date">${day.dateStr.split(" ").slice(1).join(" ")}</span>
          </button>`).join("")}
      </div>
      <div class="meal-tab-panels">
        ${weekDays.map((day, di) => {
          const workoutMeals = day.meals.filter(m => m.type === "Pre-Workout" || m.type === "Post-Workout");
          const totalCal     = day.meals.reduce((s, m) => s + (m.calories || 0), 0);
          const workoutCal   = workoutMeals.reduce((s, m) => s + (m.calories || 0), 0);
          const totalPro     = day.meals.reduce((s, m) => s + (m.protein  || 0), 0);
          const isWorkoutDay = workoutMeals.length > 0;
          return `
          <div class="meal-day-panel${di===0?" active":""}" data-day="${di}">
            <div class="meal-day-title">
              <span class="meal-day-full">${day.dayName}${isWorkoutDay ? " 🏋️" : ""}</span>
              <span class="meal-day-datestr">${day.dateStr}</span>
            </div>
            ${isWorkoutDay ? `
            <div class="workout-day-banner">
              <div class="workout-day-banner-left">
                <span class="workout-day-badge">TRAINING DAY</span>
                <span class="workout-day-totals">~${totalCal} kcal total · ~${totalPro}g protein</span>
              </div>
              <div class="workout-day-banner-right">
                <span class="workout-day-note">Pre + post workout meals included (+${workoutCal} kcal to support recovery)</span>
              </div>
            </div>` : ""}
            <div class="meal-day-cards">
              ${day.meals.filter(m => m.type !== "Pre-Workout" && m.type !== "Post-Workout").map((m, mi) => `
                <div class="meal-card" style="animation-delay:${mi*0.06}s">
                  <div class="meal-icon">${m.icon}</div>
                  <div class="meal-info">
                    <div class="meal-type-tag">${m.type} · ${m.time}</div>
                    <h4>${m.name}</h4>
                    <p>${m.description}</p>
                    ${m.ingredients ? `<div class="meal-ingredients"><strong>Ingredients:</strong> ${m.ingredients}</div>` : ""}
                    ${m.steps ? `
                    <button class="recipe-toggle-btn" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open')">
                      <span class="recipe-toggle-label">View Recipe</span>
                      <span class="recipe-toggle-arrow">▾</span>
                    </button>
                    <div class="meal-recipe-dropdown"><ol>${m.steps.split(/\.\s+(?=\d)/).map(s=>s?s.trim():null).filter(s=>s&&s.length>1).map(s=>`<li>${s.replace(/^\d+\.\s*/,"").trim()}${s.endsWith(".")?"":'.'}</li>`).join('')}</ol></div>` : ""}
                  </div>
                  <div class="meal-macros">
                    <span class="macro-tag">~${m.calories} kcal</span>
                    <span class="macro-tag">${m.protein}g protein</span>
                    <span class="macro-tag">${m.carbs}g carbs</span>
                    <span class="macro-tag">${m.fat}g fat</span>
                  </div>
                </div>`).join("")}
            </div>
            ${isWorkoutDay ? (() => {
              const wMeals = day.meals.filter(m => m.type === "Pre-Workout" || m.type === "Post-Workout");
              return `<div class="workout-nutrition-section">
                <div class="workout-nutrition-title">🏋️ Workout Nutrition</div>
                <div class="workout-nutrition-grid">
                  ${wMeals.map(m => `
                    <div class="workout-meal-card ${m.type === "Pre-Workout" ? "wmc--pre" : "wmc--post"}">
                      <div class="wmc-header">
                        <span class="wmc-icon">${m.icon}</span>
                        <div><div class="wmc-type">${m.type}</div><div class="wmc-time">${m.time}</div></div>
                      </div>
                      <div class="wmc-name">${m.name}</div>
                      <p class="wmc-desc">${m.description}</p>
                      ${m.ingredients ? `<div class="wmc-ingredients"><strong>Needs:</strong> ${m.ingredients}</div>` : ""}
                      ${m.steps ? `
                      <button class="recipe-toggle-btn wmc-recipe-btn" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open')">
                        <span class="recipe-toggle-label">View Recipe</span><span class="recipe-toggle-arrow">▾</span>
                      </button>
                      <div class="meal-recipe-dropdown"><ol>${m.steps.split(/\.\s+(?=\d)/).map(s=>s?s.trim():null).filter(s=>s&&s.length>1).map(s=>`<li>${s.replace(/^\d+\.\s*/,"").trim()}${s.endsWith(".")?"":'.'}</li>`).join('')}</ol></div>` : ""}
                      <div class="wmc-macros">
                        <span class="macro-tag">~${m.calories} kcal</span>
                        <span class="macro-tag">${m.protein}g protein</span>
                        <span class="macro-tag">${m.carbs}g carbs</span>
                      </div>
                    </div>`).join("")}
                </div>
              </div>`;
            })() : `<div class="rest-day-nutrition-section">
              <div class="rest-day-nutrition-title">😴 Rest Day Nutrition Focus</div>
              <div class="rest-day-nutrition-grid">
                <div class="rdnc rdnc--recovery">
                  <div class="rdnc-header">
                    <span class="rdnc-icon">🥗</span>
                    <div><div class="rdnc-type">Recovery Nutrition</div><div class="rdnc-note">What to prioritise today</div></div>
                  </div>
                  <p class="rdnc-desc">Rest days are when your muscles actually repair and grow. Fuel the process with anti-inflammatory whole foods — leafy greens, berries, oily fish, and nuts reduce soreness and accelerate tissue repair.</p>
                  <div class="rdnc-checklist">
                    <div class="rdnc-check">✓ Prioritise colourful vegetables &amp; berries</div>
                    <div class="rdnc-check">✓ Omega-3 sources: salmon, walnuts, flaxseed</div>
                    <div class="rdnc-check">✓ 2–3L water throughout the day</div>
                    <div class="rdnc-check">✓ Magnesium-rich foods: dark chocolate, spinach, almonds</div>
                  </div>
                </div>
                <div class="rdnc rdnc--calorie">
                  <div class="rdnc-header">
                    <span class="rdnc-icon">⚖️</span>
                    <div><div class="rdnc-type">Calorie Adjustment</div><div class="rdnc-note">Rest day macro targets</div></div>
                  </div>
                  <p class="rdnc-desc">Reduce carbohydrates by 20–30% on rest days (glycogen demand is lower) while keeping protein identical to training days. This carb-cycling approach optimises body composition without compromising muscle repair.</p>
                  <div class="rdnc-checklist">
                    <div class="rdnc-check">✓ Protein: maintain your full daily target</div>
                    <div class="rdnc-check">✓ Carbs: reduce by ~20–30% vs training days</div>
                    <div class="rdnc-check">✓ Healthy fats can increase slightly to compensate</div>
                    <div class="rdnc-check">✓ Avoid alcohol — it blocks muscle protein synthesis</div>
                  </div>
                </div>
              </div>
            </div>`}
            ${(() => {
              const allMeals  = day.meals;
              const totalCals = allMeals.reduce((s,m)=>s+(m.calories||0),0);
              const trackerKey = `mdt_${day.dateISO}`;
              return `<div class="meal-day-tracker" id="mdt_wrap_${di}">
                <div class="mdt-header">
                  <span class="mdt-title">📋 Today's Meal Log</span>
                  <span class="mdt-progress-pill" id="mdt_pill_${di}">0 / ${allMeals.length} eaten</span>
                </div>
                <div class="mdt-rows">
                  ${allMeals.map((m, mi) => `
                    <div class="mdt-row" id="mdt_row_${di}_${mi}" onclick="mdtToggle(${di},${mi},'${trackerKey}',${allMeals.length},${totalCals})">
                      <div class="mdt-checkbox"><span class="mdt-checkbox-tick">✓</span></div>
                      <div class="mdt-meal-info">
                        <div class="mdt-meal-name">${m.icon} ${m.name}</div>
                        <div class="mdt-meal-time">${m.type} · ${m.time}</div>
                      </div>
                      <span class="mdt-kcal">${m.calories} kcal</span>
                    </div>`).join("")}
                </div>
                <div class="mdt-calbar" id="mdt_bar_${di}">
                  <div class="mdt-calbar-label">
                    <span>Calories consumed today</span>
                    <span id="mdt_bar_label_${di}">0 / ${totalCals} kcal</span>
                  </div>
                  <div class="mdt-calbar-track">
                    <div class="mdt-calbar-fill" id="mdt_bar_fill_${di}" style="width:0%"></div>
                  </div>
                </div>
              </div>`;
            })()}
          </div>`;
        }).join("")}
      </div>
    </div>`;

  renderShoppingStrip(weekDays, groceries, dietary, goal);
  output.scrollIntoView({ behavior: "smooth", block: "start" });
};

window.printShoppingList = function() {
  const el = document.getElementById("shoppingList");
  if (!el) return;
  const w = window.open("", "_blank");
  if (!w) return;
  w.document.head.innerHTML = `<title>FitSync Shopping List</title>
    <style>body{font-family:Arial,sans-serif;margin:24px}h1{color:#0ea5e9}
    h4{margin:16px 0 8px;border-bottom:1px solid #e5e7eb;padding-bottom:4px}
    ul{list-style:none;padding:0}li{padding:4px 0;border-bottom:1px solid #f3f4f6}
    li:before{content:"☐  "}</style>`;
  w.document.body.innerHTML = `
    <h1>🛒 FitSync Shopping List</h1>
    <p>Generated ${new Date().toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</p>
    ${el.innerHTML}`;
  w.print();
};

window.shareShoppingList = function() {
  const el = document.getElementById("shoppingList");
  if (!el) return;
  const cats = el.querySelectorAll(".shopping-category");
  let text = "🛒 FitSync Shopping List\n\n";
  cats.forEach(c => {
    text += c.querySelector("h4").textContent + "\n";
    c.querySelectorAll(".shopping-item").forEach(i => { text += `  ☐ ${i.textContent}\n`; });
    text += "\n";
  });
  if (navigator.share) {
    navigator.share({ title:"FitSync Shopping List", text });
  } else {
    navigator.clipboard?.writeText(text).then(() => showToast("Copied to clipboard!", "success"));
  }
};

function buildMeals(groceries, dietary, goal, style, _cookTime, dayIndex = 0) {
  const l   = groceries.toLowerCase();
  const has = item => l.split(/[,\n]+/).some(g => g.trim().includes(item));
  const isVegan   = dietary.some(d=>/vegan|plant.based/i.test(d));
  const isVeg     = dietary.some(d=>/\bvegetarian\b/i.test(d));
  const isGF      = dietary.some(d=>/gluten|celiac/i.test(d));
  const isHalal   = dietary.some(d=>/halal/i.test(d));
  const isKeto    = dietary.some(d=>/keto|low.?carb/i.test(d));
  const isNutFree = dietary.some(d=>/\bnut|peanut\b/i.test(d));
  const highP = style === "highProtein";
  const light  = style === "light";

  // Build protein pools — lunch and dinner use DIFFERENT proteins each day to avoid repeats
  let proteins;
  if (isVegan)      proteins = ["tofu","tempeh","chickpeas","lentils","black beans","edamame","butter beans"];
  else if (isVeg)   proteins = ["eggs","cottage cheese","halloumi","Greek yoghurt","tempeh","lentils","ricotta"];
  else if (isHalal) proteins = ["halal chicken breast","halal beef mince","halal lamb","halal turkey mince","halal salmon","halal chicken thigh","halal tuna"];
  else {
    const pool = [];
    if (has("salmon")||has("fish")) pool.push("salmon","tuna steak");
    if (has("chicken"))             pool.push("chicken breast","chicken thigh");
    if (has("beef")||has("mince"))  pool.push("lean beef mince","steak strips");
    if (has("eggs"))                pool.push("eggs");
    if (pool.length < 5)            pool.push("chicken breast","tuna","turkey mince","lean beef mince","salmon fillet");
    proteins = pool;
  }
  let carbs;
  if (isKeto)    carbs = ["cauliflower rice","courgette noodles","swede mash","broccoli rice","celeriac mash","cabbage leaves","butternut squash"];
  else if (isGF) carbs = ["brown rice","quinoa","sweet potato","rice noodles","buckwheat","millet","rice cakes"];
  else {
    const pool = [];
    if (has("oats"))                         pool.push("oats");
    if (has("rice"))                         pool.push("brown rice","jasmine rice");
    if (has("sweet potato")||has("potato"))  pool.push("sweet potato","new potatoes");
    if (has("pasta"))                        pool.push("wholemeal pasta");
    if (pool.length < 5)                     pool.push("brown rice","sweet potato","quinoa","wholemeal pasta","bulgur wheat");
    carbs = pool;
  }

  const d = dayIndex % 7;
  // Lunch and dinner each get a DIFFERENT protein for that day
  const lunchProtein  = proteins[d % proteins.length];
  const dinnerProtein = proteins[(d + Math.ceil(proteins.length / 2)) % proteins.length];
  // Lunch and dinner each get a DIFFERENT carb for that day
  const lunchCarb  = carbs[d % carbs.length];
  const dinnerCarb = carbs[(d + Math.ceil(carbs.length / 2)) % carbs.length];
  // Keep old variable name for backwards compat with snack logic
  const protein = lunchProtein;
  const carb    = lunchCarb;
  const pGrams  = goal==="gain" ? 45 : goal==="lose" ? 38 : 35;
  const baseCal = highP ? 560 : light ? 370 : 480;

  // ── 7 breakfast variants ──────────────────────────────────────────────────
  const breakfasts = [
    { name: isVegan?"Overnight oats with berries & chia":isKeto?"Scrambled eggs with avocado & bacon":has("oats")?"Overnight oats with fruit & seeds":"Greek yoghurt bowl with berries",
      desc: isKeto?"Creamy scrambled eggs in butter with sliced avocado and crispy bacon.":isVegan?"Oats soaked overnight with plant milk, topped with berries and chia.":has("oats")?"Oats prepped overnight. Top with fruit, seeds, and honey.":"Greek yoghurt with mixed berries, honey, and seeds.",
      ingredients: isKeto?"4 eggs, 1 avocado, 2 bacon strips, butter, salt, pepper":isVegan?"½ cup oats, 1 cup plant milk, ½ cup berries, 1 tbsp chia seeds, 1 tbsp maple syrup":has("oats")?"½ cup oats, 1 cup milk, ½ cup berries, 1 tbsp seeds, 1 tsp honey":"200g Greek yoghurt, ½ cup berries, 1 tbsp honey, 1 tbsp seeds",
      steps: isKeto?"1. Heat butter in pan over medium heat. 2. Whisk eggs and pour into pan. 3. Scramble until cooked. 4. Slice avocado and cook bacon until crispy. 5. Serve eggs with avocado and bacon.":isVegan?"1. Mix oats, milk, chia seeds, and maple syrup in a jar. 2. Refrigerate overnight. 3. In morning, top with fresh berries. 4. Enjoy cold or warm slightly.":has("oats")?"1. Mix oats with milk in a jar. 2. Add honey and refrigerate overnight. 3. Top with berries and seeds before eating.":"1. Spoon yoghurt into bowl. 2. Top with berries and honey. 3. Sprinkle with seeds. 4. Mix gently and enjoy.",
      cal:isKeto?490:light?320:380, pro:isKeto?28:18, carb_:isKeto?6:42, fat:isKeto?38:9,
      ing:isKeto?"eggs, avocado, bacon":isVegan?"oats, plant milk, berries, chia":has("oats")?"oats, fruit, seeds":"Greek yoghurt, berries, honey" },
    { name: isVegan?"Smoothie bowl with granola & seeds":isKeto?"Bacon & egg muffin cups":"Protein pancakes with banana",
      desc: isVegan?"Blended frozen berries and banana with granola and seeds.":isKeto?"Egg muffins baked with bacon, cheese, and veg — zero carbs.":"Fluffy protein pancakes with oats, egg, and banana.",
      steps: isVegan
        ? "1. Add 150g frozen mixed berries and half a banana to a blender. 2. Add a splash of plant milk — just enough to get the blender going. 3. Blend until thick and smooth (it should be almost like soft-serve ice cream — not watery). 4. Pour into a wide bowl. 5. Top with granola, seeds, sliced banana, and any extra berries. 6. Eat immediately — it melts quickly."
        : isKeto
        ? "1. Preheat oven to 180°C. Grease a 6-hole muffin tin well with butter or cooking spray. 2. Dice 2 rashers of bacon and fry in a pan until just cooked. Let cool slightly. 3. Crack 5 eggs into a bowl, add a splash of cream, salt, pepper, and a pinch of mixed herbs. Whisk. 4. Divide bacon and a small amount of diced pepper between muffin holes. 5. Pour egg mixture over the top — fill each hole about ¾ full. 6. Sprinkle grated cheese on each. 7. Bake 15–18 minutes until puffed up and golden. 8. Cool slightly before removing — run a knife around the edges."
        : "1. In a bowl, mash 1 ripe banana with a fork until smooth. 2. Add 1 egg, 40g oats, and 1 scoop protein powder if using. Mix into a thick batter — if too stiff, add a splash of milk. 3. Heat a non-stick pan over medium heat. Add a tiny knob of butter. 4. Pour small rounds of batter (about a serving spoon each). 5. Cook 2–3 minutes until bubbles appear on top and edges look set. 6. Flip and cook 1–2 minutes more. 7. Serve with a drizzle of honey or maple syrup.",
      cal:isKeto?440:light?350:420, pro:isKeto?26:22, carb_:isKeto?4:45, fat:isKeto?32:8,
      ing:isVegan?"frozen berries, plant protein, granola":isKeto?"eggs, bacon, cheese":"oats, egg, banana, protein powder" },
    { name: isVegan?"Tofu scramble with veggies on toast":isKeto?"Full keto breakfast bowl":"Avocado toast with poached eggs",
      desc: isVegan?"Turmeric tofu scramble with peppers and spinach on toast.":isKeto?"Bacon, fried eggs, avocado, mushrooms, and spinach.":"Wholegrain toast with smashed avocado and poached eggs.",
      steps: isVegan
        ? "1. Crumble 200g firm tofu into a bowl — it should look a bit like scrambled eggs. 2. Add ½ tsp turmeric (gives the yellow colour), ½ tsp garlic powder, salt, and pepper. Mix. 3. Heat 1 tbsp oil in a pan over medium-high. Add diced peppers and cook 3 minutes. 4. Add the tofu to the pan. Stir and cook for 5–6 minutes until heated through and slightly golden. 5. Add a handful of spinach at the end — it wilts in 1 minute. 6. Toast 2 slices of bread while the tofu cooks. 7. Pile the scramble onto the toast and serve."
        : isKeto
        ? "1. Start with the bacon — lay rashers in a cold pan and bring to medium heat. Cook 3–4 minutes per side until crispy. Remove and drain on paper towels. 2. In the same pan (bacon fat adds flavour), crack in 2 eggs. Cook to your preference (3 min for runny yolk, 5 min for firm). 3. Slice and season mushrooms, cook in a separate pan with butter for 4–5 minutes. 4. Wilt spinach in the same pan for 30 seconds. 5. Halve and slice the avocado. 6. Arrange everything on a plate. Season the eggs with salt and pepper."
        : "1. Bring a medium saucepan of water to the boil. 2. Add a splash of white vinegar (helps the egg whites hold together). 3. Toast your bread. 4. Crack an egg into a small cup. Stir the water gently to create a swirl, then slide the egg into the centre. 5. Turn heat to a gentle simmer. Cook 3 minutes for a runny yolk, 4 for firmer. 6. Lift out with a slotted spoon and rest briefly on a paper towel. 7. Mash half an avocado with a squeeze of lemon, salt, and chilli flakes. 8. Spread avocado on toast, top with the poached egg.",
      cal:isKeto?530:light?340:400, pro:isKeto?30:20, carb_:isKeto?3:38, fat:isKeto?42:18,
      ing:isVegan?"tofu, turmeric, peppers, spinach, bread":isKeto?"bacon, eggs, avocado, mushrooms":"eggs, avocado, wholegrain bread" },
    { name: isVegan?"Chia pudding with mango & coconut":isKeto?"Smoked salmon & cream cheese roll-ups":"Porridge with honey & walnuts",
      desc: isVegan?"Chia seeds set overnight in coconut milk, topped with fresh mango.":isKeto?"Smoked salmon wrapped around cream cheese and cucumber.":"Warm rolled oats with honey, walnuts, and cinnamon.",
      steps: isVegan
        ? "1. The night before: add 3 tbsp chia seeds to a jar or bowl. 2. Pour in 200ml coconut milk and 1 tsp maple syrup. Stir well — make sure no chia seeds clump together. 3. Cover and refrigerate overnight (at least 6 hours). It will set into a thick pudding. 4. In the morning, dice fresh mango. 5. Stir the pudding — if too thick, loosen with a splash of plant milk. 6. Top with mango pieces, toasted coconut flakes, and an extra drizzle of maple syrup."
        : isKeto
        ? "1. Lay 4–5 slices of smoked salmon flat on a board. 2. Spread a teaspoon of cream cheese down the centre of each slice. 3. Cut a few thin sticks of cucumber. 4. Place 1–2 cucumber sticks across the salmon. 5. Roll the salmon tightly around the cream cheese and cucumber. 6. Squeeze a little lemon over the top. 7. Eat immediately or keep chilled for up to 2 hours."
        : "1. Measure 80g rolled oats into a saucepan. 2. Pour in 300ml milk (or water for fewer calories). 3. Bring to a gentle simmer over medium heat, stirring frequently. 4. Cook 4–5 minutes, stirring, until thick and creamy — it thickens as it cooks. 5. Pour into a bowl. 6. Drizzle 1 tsp honey over the top. 7. Scatter a small handful of chopped walnuts. 8. Add a pinch of cinnamon. Eat while hot.",
      cal:isKeto?390:light?310:360, pro:isKeto?24:14, carb_:isKeto?4:44, fat:isKeto?30:10,
      ing:isVegan?"chia seeds, coconut milk, mango":isKeto?"smoked salmon, cream cheese":"oats, honey, walnuts" },
    { name: isVegan?"Açaí bowl with tropical fruits":isKeto?"Cheese & veggie omelette":"Granola with yoghurt & mixed berries",
      desc: isVegan?"Blended açaí base with banana, mango, coconut, and granola.":isKeto?"Fluffy omelette stuffed with cheddar, peppers, and spinach.":"Crunchy granola layered with Greek yoghurt and fresh berries.",
      steps: isVegan
        ? "1. Place a frozen açaí packet (or 2 tbsp açaí powder) in a blender. 2. Add ½ frozen banana, a few frozen mango chunks, and 60ml plant milk. 3. Blend on high until thick and smooth — add the minimum liquid possible to keep it thick. 4. Pour into a bowl (it should be firm, not pourable). 5. Top with granola, sliced banana, mango, and coconut flakes. 6. Eat immediately."
        : isKeto
        ? "1. Crack 3 eggs into a bowl. Add a pinch of salt and pepper. Beat well with a fork. 2. Dice ¼ red pepper and a small handful of spinach. 3. Heat 1 tsp butter in a non-stick pan over medium heat until foaming. 4. Pour in the egg mixture. Let it set around the edges (about 1 minute) — don't stir. 5. Gently push the cooked edges toward the centre, tilting the pan so the liquid egg runs to the edges. 6. When still slightly wobbly in the centre, add grated cheddar and vegetables to one half. 7. Fold the plain half over the filled half. Cook 1 minute more. 8. Slide onto a plate and eat immediately."
        : "1. Spoon 200g Greek yoghurt into a wide bowl or glass. 2. Add a layer of granola on top (about 4–5 tbsp). 3. Add a layer of mixed fresh berries (strawberries, blueberries, raspberries). 4. Repeat layering if you have a tall glass — yoghurt, granola, berries. 5. Drizzle a little honey over the top. 6. Eat immediately or refrigerate for up to 2 hours (granola softens over time).",
      cal:isKeto?460:light?330:390, pro:isKeto?28:16, carb_:isKeto?4:46, fat:isKeto?36:12,
      ing:isVegan?"açaí, banana, mango, granola":isKeto?"eggs, cheese, peppers":"granola, Greek yoghurt, berries" },
    { name: isVegan?`${isNutFree?"Sunflower butter":"Peanut butter"} & banana on toast`:isKeto?"Keto egg bites & black coffee":"Boiled eggs with wholegrain soldiers",
      desc: isVegan?`${isNutFree?"Sunflower":"Peanut"} butter and banana on wholegrain toast — quick and filling.`:isKeto?"Baked egg bites with cheese and herbs, paired with black coffee.":"Soft-boiled eggs with wholegrain toast soldiers.",
      steps: isVegan
        ? `1. Toast 2 slices of wholegrain bread to your preferred level. 2. While bread toasts, peel and slice a ripe banana. 3. Spread 1–2 tbsp ${isNutFree?"sunflower seed":"peanut"} butter generously over each slice. 4. Lay banana slices on top. 5. Optional: add a pinch of cinnamon or a drizzle of honey. 6. Eat immediately.`
        : isKeto
        ? "1. Preheat oven to 175°C. Grease a 6-hole silicone muffin mould or a greased metal tin. 2. Crack 4 eggs into a bowl, add 2 tbsp cream, salt, pepper, and dried herbs. Beat well. 3. Grate 50g cheddar and stir half into the egg mixture. 4. Pour mixture into mould — fill each hole ¾ full. 5. Sprinkle remaining cheese on top. 6. Bake 15–18 minutes until firm and golden on top. 7. Remove and cool for 2 minutes — they come out easily when slightly cooled. 8. Enjoy with black coffee or tea."
        : "1. Bring a small pot of water to the boil. 2. Gently lower in 2 eggs with a spoon. 3. Boil for exactly 6 minutes for a runny-to-jammy yolk (6.5 for firmer). 4. While eggs cook, toast 2 slices of wholegrain bread. 5. Transfer eggs immediately to cold water for 1 minute. 6. Peel carefully. 7. Cut toast into strips (soldiers). 8. Place eggs in egg cups and slice the tops off. Dip soldiers in.",
      cal:isKeto?410:light?300:360, pro:isKeto?22:18, carb_:isKeto?3:36, fat:isKeto?34:14,
      ing:isVegan?"bread, nut butter, banana":isKeto?"eggs, cheese":"eggs, wholegrain bread" },
    { name: isVegan?"Baked berry oatmeal":isKeto?"Avocado & smoked mackerel bowl":"Cottage cheese bowl with fruit & seeds",
      desc: isVegan?"Warm baked oats with blueberries and maple syrup — prep ahead.":isKeto?"Creamy avocado with flaked smoked mackerel, lemon, and cucumber.":"Cottage cheese topped with pineapple, seeds, and a drizzle of honey.",
      steps: isVegan
        ? "1. Preheat oven to 180°C. 2. In an ovenproof dish, mix 160g rolled oats, 1 tsp baking powder, 1 tbsp maple syrup, 1 tsp cinnamon, and a pinch of salt. 3. Pour in 400ml plant milk and stir to combine. 4. Scatter a large handful of blueberries or mixed berries on top. Press some in gently. 5. Bake for 25–30 minutes until the top is set and golden. 6. Serve warm with a splash more plant milk poured over. 7. Leftovers keep in the fridge for 3 days — reheat with a splash of milk."
        : isKeto
        ? "1. Open the smoked mackerel fillet and flake the flesh off the skin into a bowl using a fork. Discard skin. 2. Halve and destone the avocado. Scoop out the flesh and slice into a bowl. 3. Slice ¼ of a cucumber into rounds or half-moons. 4. Arrange avocado, cucumber, and mackerel on a plate or in a wide bowl. 5. Squeeze a little lemon juice over everything. 6. Season with black pepper and a pinch of chilli flakes. 7. Eat immediately — avocado browns quickly once cut."
        : "1. Spoon 200g cottage cheese into a bowl. 2. Add 80g fresh or tinned pineapple chunks. 3. Sprinkle 1 tbsp mixed seeds (pumpkin, sunflower, or chia). 4. Drizzle with 1 tsp honey. 5. Optional: add sliced strawberries or a handful of any other fruit you have.",
      cal:isKeto?430:light?290:350, pro:isKeto?26:20, carb_:isKeto?3:40, fat:isKeto?34:8,
      ing:isVegan?"oats, berries, maple syrup":isKeto?"smoked mackerel, avocado":"cottage cheese, fruit, seeds" },
    // ── 7 additional breakfast variants (8–14) ────────────────────────────────
    { name: isVegan?"Savoury miso & mushroom oatmeal":isKeto?"Smoked salmon & cream cheese lettuce cups":"Smoked salmon bagel with cream cheese",
      desc: isVegan?"Oats cooked in vegetable broth with white miso, mushrooms, and sesame.":isKeto?"Smoked salmon rolled in cream cheese inside crisp cos lettuce — zero carbs.":"Toasted bagel with cream cheese, smoked salmon, capers, and red onion.",
      steps: isVegan
        ? "1. Cook 80g oats in 300ml vegetable stock (not water — this is the key to savoury oats) over medium heat, stirring often, until thick — about 5 minutes. 2. While oats cook, slice 100g mushrooms and fry in a pan with 1 tsp sesame oil until golden. 3. Stir 1 tsp white miso paste into the cooked oats — dissolve it in a splash of hot water first so it incorporates evenly. 4. Spoon into a bowl and top with mushrooms, a drizzle of soy sauce, a sprinkle of sesame seeds, and sliced spring onion. 5. Add a soft-poached egg on top if not strictly vegan."
        : isKeto
        ? "1. Lay 4 large cos or romaine lettuce leaves flat on a board. 2. Spread 1 tsp cream cheese down the centre of each. 3. Place 1–2 slices of smoked salmon on top of the cream cheese. 4. Squeeze a little lemon juice over the salmon. 5. Add a few capers and a twist of black pepper. 6. Roll or fold the lettuce around the filling. 7. Eat immediately — or keep wrapped in the fridge for up to 2 hours."
        : "1. Slice the bagel in half and toast until golden. 2. Spread a generous layer of cream cheese on each half. 3. Lay 2–3 slices of smoked salmon over the bottom half. 4. Scatter capers and very thinly sliced red onion on top of the salmon. 5. Add a few slices of cucumber. 6. Squeeze a little lemon over the top. 7. Close the bagel or eat open-faced.",
      cal:isKeto?310:light?360:420, pro:isKeto?28:22, carb_:isKeto?4:42, fat:isKeto?22:16,
      ing:isVegan?"oats, mushrooms, miso, sesame":isKeto?"smoked salmon, cream cheese, lettuce":"bagel, smoked salmon, cream cheese, capers" },
    { name: isVegan?"Apple & cinnamon bircher muesli":isKeto?"Turkey & veggie breakfast skillet":"Bircher muesli with apple & walnuts",
      desc: isVegan?"Swiss-style soaked oats with grated apple, cinnamon, and mixed seeds.":isKeto?"Ground turkey with peppers, spinach, and eggs — all in one pan.":"Soaked oats with grated apple, walnut, honey, and Greek yoghurt.",
      steps: isVegan
        ? "1. The night before: mix 80g rolled oats with 200ml plant milk in a jar. 2. Grate half an apple into the jar (skin on — the pectin helps thicken the oats). 3. Add ½ tsp cinnamon and 1 tbsp maple syrup. 4. Stir well. Cover and refrigerate overnight. 5. In the morning, the oats will be thick and creamy. 6. Top with the remaining grated apple, a handful of blueberries, 1 tbsp mixed seeds, and an extra drizzle of maple syrup."
        : isKeto
        ? "1. Heat 1 tbsp oil in a large oven-safe pan over medium-high. 2. Add 150g turkey mince and cook, breaking it up, for 4–5 minutes until browned. 3. Add diced red pepper and cook 2 minutes. 4. Add a handful of spinach and stir until wilted. 5. Season everything with salt, pepper, garlic powder, and smoked paprika. 6. Create 2–3 wells in the mixture and crack an egg into each. 7. Cover with a lid and cook on medium-low for 3–5 minutes until egg whites are set but yolks still runny. 8. Eat directly from the pan."
        : "1. The night before: mix 80g rolled oats with 150ml milk and 150g Greek yoghurt in a bowl or jar. 2. Grate 1 small apple into the mix. 3. Add 1 tsp honey, ½ tsp cinnamon, and a squeeze of lemon. 4. Stir well. Cover and refrigerate overnight. 5. In the morning, stir and thin with a splash of milk if too thick. 6. Top with a handful of roughly chopped walnuts and thin apple slices.",
      cal:isKeto?420:light?300:370, pro:isKeto?36:16, carb_:isKeto?5:48, fat:isKeto?26:10,
      ing:isVegan?"oats, apple, plant milk, cinnamon":isKeto?"turkey mince, eggs, peppers":"oats, Greek yoghurt, apple, walnuts" },
    { name: isVegan?"Shakshuka-spiced tomato & chickpea bowl":isKeto?"Spanish chorizo & egg scramble":"Shakshuka — baked eggs in spiced tomato",
      desc: isVegan?"Chickpeas simmered in spiced tomato and served with crusty bread.":isKeto?"Chorizo, peppers, and eggs scrambled together in one pan.":"Eggs poached in a spiced tomato and pepper sauce — a North African classic.",
      steps: isVegan
        ? "1. Heat 1 tbsp olive oil in a pan. Add 1 diced onion and fry 5 minutes. 2. Add 3 garlic cloves, ½ tsp cumin, ½ tsp smoked paprika, ¼ tsp chilli — stir 30 seconds. 3. Add a 400g tin of chopped tomatoes and bring to a simmer. 4. Drain and rinse a can of chickpeas and add them in. 5. Simmer 10 minutes until sauce thickens. Season with salt and a squeeze of lemon. 6. Scatter fresh coriander or parsley on top. 7. Serve with a slice of toasted sourdough or pitta."
        : isKeto
        ? "1. Slice 80g chorizo into half-moons. Fry in a dry pan over medium heat for 2–3 minutes — chorizo releases its own oil. 2. Add diced red pepper and cook 3 minutes until soft. 3. Beat 3 eggs with a pinch of salt and pepper. 4. Reduce heat to medium-low and pour eggs into the pan. 5. Scramble slowly, folding rather than stirring — keep large soft curds. 6. Remove from heat while still slightly glossy — residual heat finishes cooking. 7. Serve immediately with fresh parsley."
        : "1. Heat 2 tbsp olive oil in a wide, deep pan. Add 1 diced onion and 2 diced peppers — cook 8–10 minutes until very soft. 2. Add 4 garlic cloves, 1 tsp cumin, 1 tsp paprika, ½ tsp chilli — cook 1 minute. 3. Pour in a 400g tin of chopped tomatoes. Simmer 10 minutes until thickened. 4. Season generously with salt and pepper. 5. Use a spoon to make 4 wells in the sauce. Crack an egg into each well. 6. Cover with a lid and cook on low: 4 minutes for runny yolks, 6 for set. 7. Scatter parsley or coriander on top. Serve straight from the pan with bread.",
      cal:isKeto?460:light?330:400, pro:isKeto?26:18, carb_:isKeto?5:38, fat:isKeto?36:16,
      ing:isVegan?"chickpeas, tomatoes, spices, bread":isKeto?"chorizo, eggs, peppers":"eggs, tomatoes, peppers, spices" },
    { name: isVegan?"Black bean & avocado breakfast toast":isKeto?"Almond flour pancakes with berries":"Huevos rancheros — fried eggs on crispy tortilla",
      desc: isVegan?"Mashed black beans and avocado on wholegrain toast with chilli and lime.":isKeto?"Fluffy grain-free pancakes with almond flour, topped with fresh berries.":"Fried eggs on a crispy corn tortilla with salsa, refried beans, and hot sauce.",
      steps: isVegan
        ? "1. Drain and rinse a can of black beans. Heat in a pan with ½ tsp cumin, a pinch of salt, and a splash of water — mash lightly with a fork, keeping some texture. 2. Toast 2 slices of wholegrain bread until golden and crisp. 3. Halve and stone the avocado. Scoop flesh into a bowl and mash with a fork. Add a squeeze of lime, a pinch of chilli flakes, and salt. 4. Spread mashed avocado on toast, then top with warm black beans. 5. Add sliced cherry tomatoes, a squeeze of lime, and fresh coriander on top."
        : isKeto
        ? "1. Mix 100g almond flour, 2 eggs, 4 tbsp cream cheese, 1 tsp baking powder, and 1 tsp vanilla extract in a bowl — mix until smooth batter forms. 2. Heat a non-stick pan over medium heat with a small knob of butter. 3. Pour a large serving spoon of batter per pancake — it will spread. 4. Cook 2–3 minutes until edges look set and bubbles form. Flip carefully — almond flour pancakes are more delicate than regular ones. 5. Cook 1–2 minutes more. 6. Stack and top with a handful of fresh berries and a drizzle of sugar-free maple syrup."
        : "1. Heat a thin layer of oil in a frying pan. Fry a small corn tortilla for 30–60 seconds per side until lightly crisped and puffy. Drain on paper towels. 2. Warm refried beans (from a can) in a small pot with a pinch of cumin. 3. Fry 2 eggs in the same pan — sunny side up. 4. Spread a spoonful of refried beans on the crispy tortilla. 5. Place the fried eggs on top. 6. Add a spoonful of tomato salsa and a dash of hot sauce. 7. Garnish with fresh coriander and a squeeze of lime.",
      cal:isKeto?480:light?340:410, pro:isKeto?20:16, carb_:isKeto?8:42, fat:isKeto?38:18,
      ing:isVegan?"black beans, avocado, bread, lime":isKeto?"almond flour, eggs, cream cheese":"eggs, corn tortilla, beans, salsa" },
    { name: isVegan?"Green mango & spinach protein smoothie":isKeto?"Keto egg & cheese breakfast quesadilla":"Wholegrain muesli with skimmed milk & apple",
      desc: isVegan?"Blended spinach, mango, banana, and plant protein — vibrant and nutritious.":isKeto?"Egg scramble and melted cheese folded in a low-carb wrap.":"Swiss-style muesli soaked briefly in skimmed milk with fresh apple and honey.",
      steps: isVegan
        ? "1. Add a large handful of fresh spinach (about 60g) to a high-speed blender. 2. Add 100g frozen mango chunks and half a banana (the banana masks the spinach taste completely). 3. Add 1 scoop plant protein powder. 4. Pour in 300ml plant milk. 5. Blend on high for 40 seconds until completely smooth — no green chunks. 6. Taste: it should taste of mango and banana, not spinach. 7. Pour immediately into a glass and drink within 20 minutes — the colour brightens as it oxidises."
        : isKeto
        ? "1. Crack 2 eggs into a bowl, season with salt and pepper, and whisk. 2. Heat a small non-stick pan. Add a little butter. 3. Pour eggs in and scramble gently until just set — remove from heat while still slightly glossy. 4. Place a low-carb wrap flat in the pan. 5. Spoon scrambled eggs onto one half. 6. Lay a slice of cheese over the eggs. 7. Fold the empty half over the filled half and press lightly. 8. Heat 1 minute per side until the wrap crisps and cheese melts. 9. Cut in half and eat warm."
        : "1. Measure 80g muesli (or Swiss-style rolled oats with dried fruit) into a bowl. 2. Pour over 200ml cold skimmed milk. Leave to soak for 3–5 minutes — or overnight for a creamier result. 3. Meanwhile, peel and finely dice or grate 1 small apple. 4. Stir the apple through the soaked muesli. 5. Drizzle with 1 tsp honey. 6. Scatter a small handful of mixed seeds or nuts on top. 7. Eat cold.",
      cal:isKeto?390:light?280:350, pro:isKeto?24:14, carb_:isKeto?4:44, fat:isKeto?28:8,
      ing:isVegan?"spinach, mango, banana, plant protein":isKeto?"eggs, cheese, wrap":"muesli, skimmed milk, apple, honey" },
    { name: isVegan?"Warm red lentil & spinach hash":isKeto?"Full baked keto frittata":"Egg white omelette with feta & spinach",
      desc: isVegan?"Red lentils cooked with spinach, cumin, and lemon — hearty and quick.":isKeto?"Thick baked frittata with courgette, feta, and sun-dried tomato.":"Light and high-protein omelette with wilted spinach and salty feta.",
      steps: isVegan
        ? "1. Rinse 100g red lentils under cold water. 2. Heat 1 tbsp oil in a saucepan. Add 1 diced onion and cook 4 minutes. 3. Add 1 tsp cumin and ½ tsp turmeric — stir 30 seconds. 4. Add lentils and 400ml vegetable stock. 5. Bring to a boil and simmer 12–15 minutes, stirring occasionally, until lentils are soft and most of the stock is absorbed. 6. Stir in 2 large handfuls of spinach — it wilts almost instantly. 7. Season with salt, pepper, and a big squeeze of lemon. 8. Serve warm. Excellent with toasted wholegrain bread on the side."
        : isKeto
        ? "1. Preheat oven to 180°C. Grease a 20cm ovenproof dish or skillet. 2. Whisk 6 eggs with 3 tbsp cream, salt, pepper, and ½ tsp dried oregano. 3. Dice half a courgette and halve 6 cherry tomatoes. Drain 2 tbsp sun-dried tomatoes (in oil — dab dry). 4. Pour egg mixture into the dish. 5. Scatter courgette, cherry tomatoes, and sun-dried tomatoes evenly through the eggs. 6. Crumble 60g feta cheese on top. 7. Bake 25–30 minutes until puffed, set in the centre, and golden on top. 8. Rest 5 minutes — it deflates slightly. Cut into wedges."
        : "1. Separate 4 eggs, putting the whites into one bowl. Add 1 whole egg to the whites for some yolk richness. 2. Season whites with salt and pepper. Whisk until foamy but not stiff. 3. Heat a non-stick pan over medium heat. Add a small knob of butter. 4. Pour in egg mixture. Let the base set (1 minute), then gently push cooked edges to the centre, tilting to let liquid flow underneath. 5. Add a handful of wilted spinach and 40g crumbled feta to one half when the top is still slightly glossy. 6. Fold over and cook 30 seconds more. 7. Slide onto a plate immediately.",
      cal:isKeto?470:light?280:360, pro:isKeto?30:24, carb_:isKeto?5:14, fat:isKeto?36:18,
      ing:isVegan?"red lentils, spinach, cumin, lemon":isKeto?"eggs, feta, courgette, cream":"egg whites, feta, spinach" },
    { name: isVegan?"Blueberry & oat energy balls":isKeto?"Bacon-wrapped asparagus with fried eggs":"Blueberry protein muffin with Greek yoghurt",
      desc: isVegan?"No-bake bliss balls rolled in coconut — prep Sunday, eat all week.":isKeto?"Crispy bacon-wrapped asparagus spears served alongside fried eggs.":"Dense protein muffin packed with blueberries, paired with creamy yoghurt.",
      steps: isVegan
        ? "1. BATCH PREP (makes 10–12 balls): Add 180g rolled oats, 100g nut butter, 60ml maple syrup, 1 tsp vanilla, and 30g desiccated coconut to a bowl. 2. Stir well until fully combined — the mixture should hold its shape when pressed. If too dry, add 1 tbsp more maple syrup. If too wet, add more oats. 3. Add 60g blueberries (fresh or dried) and stir gently so they don't bleed. 4. Refrigerate for 30 minutes — cold mixture is much easier to roll. 5. Roll into golf-ball sized balls. 6. Roll each in extra desiccated coconut. 7. Store in the fridge for up to 5 days — or freeze for 3 months. For breakfast, eat 2–3 balls with a piece of fruit."
        : isKeto
        ? "1. Preheat oven to 200°C. Line a baking tray. 2. Trim the woody ends off 8–10 asparagus spears (snap them — they break naturally at the right point). 3. Wrap one strip of bacon tightly around each spear, spiralling from the base to the tip. 4. Lay on the baking tray and roast 18–22 minutes until the bacon is crispy and asparagus is tender. 5. While asparagus roasts, fry 2 eggs to your preferred doneness. 6. Plate the eggs and arrange asparagus bundles alongside."
        : "1. BATCH PREP (makes 6 muffins): Preheat oven to 175°C. Grease a 6-hole muffin tin. 2. In a bowl, mix 2 scoops vanilla protein powder, 80g oats, 1 tsp baking powder, and a pinch of salt. 3. In another bowl, whisk 2 eggs, 3 tbsp honey, 1 mashed banana, and 4 tbsp Greek yoghurt. 4. Pour wet into dry and mix gently — don't overmix. 5. Fold in 100g fresh or frozen blueberries. 6. Divide between muffin holes. 7. Bake 18–22 minutes until a skewer comes out clean. 8. Cool before eating. For breakfast, eat 1–2 muffins with 150g Greek yoghurt on the side.",
      cal:isKeto?410:light?330:400, pro:isKeto?28:20, carb_:isKeto?4:46, fat:isKeto?32:10,
      ing:isVegan?"oats, nut butter, blueberries, coconut":isKeto?"bacon, asparagus, eggs":"protein powder, oats, blueberries, Greek yoghurt" },
  ];

  // ── 7 lunch variants ──────────────────────────────────────────────────────
  const lunches = [
    { name: isVegan?"Buddha bowl with roasted veg":`${protein} with ${carb} & roasted vegetables`,
      desc: isVegan?`Roasted veg over quinoa with tahini and seeds.`:`Grilled ${protein} with ${carb} and steamed broccoli. Clean and high-protein.`,
      steps: isVegan
        ? "1. Preheat oven to 200°C (fan 180°C). 2. Chop peppers, courgette, and sweet potato into bite-sized chunks. 3. Toss with 1 tbsp olive oil, salt, pepper, and 1 tsp cumin. 4. Spread on a baking tray and roast for 25 minutes, turning once halfway through. 5. Meanwhile, rinse 80g quinoa and simmer in 160ml water for 12–15 minutes until all water is absorbed. 6. Fluff with a fork. 7. Arrange quinoa in a bowl, pile roasted veg on top. 8. Drizzle with 1 tbsp tahini thinned with a squeeze of lemon and a splash of water. 9. Scatter seeds over the top."
        : `1. Preheat oven to 200°C. 2. Season ${protein} with salt, pepper, garlic powder, and a drizzle of oil. 3. Bake or pan-fry for 18–22 minutes until cooked through — no pink in the centre. 4. Cook ${carb} according to packet instructions. 5. Chop broccoli into florets and steam for 4–5 minutes until just tender. 6. Slice the ${protein} once rested for 2 minutes. 7. Plate up with ${carb} as the base, then add ${protein} and broccoli. 8. Finish with a squeeze of lemon and a pinch of chilli flakes.`,
      cal:baseCal, pro:pGrams, carb_:isKeto?12:48, fat:15,
      ing:isVegan?`${carb}, roasted veg, tahini`:`${protein}, ${carb}, broccoli` },
    { name: isVegan?"Chickpea & avocado wrap":isGF?`${protein} lettuce wrap with salsa`:`${protein} & salad wrap`,
      desc: isVegan?"Spiced chickpeas, avocado, and spinach in a wholegrain wrap.":isGF?`${protein} in lettuce cups with tomato salsa.`:`${protein} with salad in a wholegrain wrap.`,
      steps: isVegan
        ? "1. Drain and rinse a can of chickpeas. 2. Mash half with a fork and leave the rest whole for texture. 3. Mix in half a mashed avocado, a squeeze of lemon, ½ tsp cumin, and a pinch of salt. 4. Heat a dry pan and wilt a handful of spinach for 30 seconds. 5. Warm your wrap in a pan or microwave for 20–30 seconds. 6. Spread the chickpea mix across the centre. 7. Add spinach, the remaining avocado slices, and a drizzle of hot sauce. 8. Fold the sides in, then roll firmly from the bottom up."
        : isGF
        ? `1. Season ${protein} with salt, pepper, smoked paprika, and a little oil. 2. Cook in a hot pan for 4–5 minutes each side until done. 3. Rest for 2 minutes, then slice into strips. 4. Separate large, firm lettuce leaves — these are your cups. 5. For salsa: finely dice 1 tomato and ½ red onion, mix with coriander and a squeeze of lime. 6. Place ${protein} strips in each lettuce cup. 7. Spoon salsa over the top. 8. Fold and eat like a taco.`
        : `1. Season ${protein} with salt, pepper, paprika, and a little oil. 2. Heat a pan to medium-high and cook ${protein} for 4–5 minutes each side until cooked through. 3. Rest 2 minutes then slice into strips. 4. Warm the wrap for 20–30 seconds. 5. Lay salad leaves, sliced tomato, and cucumber across the centre. 6. Add ${protein} strips. 7. Drizzle with sauce (mayo, hot sauce, or tzatziki). 8. Fold sides in and roll tightly.`,
      cal:light?360:baseCal-30, pro:pGrams-3, carb_:isKeto?10:40, fat:13,
      ing:isVegan?"chickpeas, avocado, spinach, wrap":isGF?`${protein}, lettuce, salsa`:`${protein}, wrap, salad` },
    { name: isVegan?"Lentil & roasted veg salad":`${protein} power salad with ${isKeto?"avocado & feta":carb}`,
      desc: isVegan?"Warm lentils with roasted sweet potato, peppers, and balsamic dressing.":`${protein} over mixed leaves with ${isKeto?"avocado, feta, and olive oil":carb+" and a lemon dressing"}.`,
      steps: isVegan
        ? "1. Cook 100g green or brown lentils in boiling water for 20–25 minutes until tender. Drain. 2. Meanwhile, dice sweet potato and peppers, toss with olive oil and salt, roast at 200°C for 20 minutes. 3. Make dressing: 1 tbsp balsamic vinegar, 1 tbsp olive oil, ½ tsp Dijon mustard, pinch of salt. 4. Toss warm lentils and roasted veg together. 5. Drizzle with balsamic dressing and toss gently. 6. Serve warm or at room temperature."
        : isKeto
        ? `1. Season ${protein} with salt, pepper, and herbs. 2. Grill or pan-fry for 4–6 minutes each side until cooked through. 3. Slice once rested. 4. Spread mixed leaves across a plate. 5. Halve and slice the avocado — lay on top. 6. Crumble feta cheese over the salad. 7. Make dressing: 2 tbsp olive oil, 1 tbsp lemon juice, salt, pepper — whisk with a fork. 8. Layer ${protein} slices over the top and drizzle with dressing.`
        : `1. Cook ${carb} according to packet instructions. 2. Season ${protein} with salt, pepper, and garlic. 3. Pan-fry or grill for 4–6 minutes each side. 4. Rest and slice. 5. Make lemon dressing: 2 tbsp olive oil, juice of ½ lemon, 1 tsp Dijon mustard, salt and pepper — whisk together. 6. Build the salad: mixed leaves as base, then ${carb}, then sliced ${protein}. 7. Drizzle dressing over everything. 8. Optional: add cherry tomatoes or cucumber.`,
      cal:light?330:baseCal-20, pro:pGrams-2, carb_:isKeto?8:38, fat:14,
      ing:isVegan?"lentils, sweet potato, peppers":isKeto?`${protein}, avocado, feta`:`${protein}, mixed leaves, ${carb}` },
    { name: isVegan?"Tofu & veg stir-fry bowl":`${protein} stir-fry with ${isGF?"rice":"noodles"}`,
      desc: isVegan?"Tofu and mixed veg wok-fried with soy, ginger, and sesame.":`${protein} stir-fried with peppers, broccoli, and soy sauce.`,
      steps: isVegan
        ? "1. Press tofu between paper towels for 5 minutes to remove excess water. Dice into cubes. 2. Mix the sauce: 2 tbsp soy sauce, 1 tsp sesame oil, 1 tsp grated ginger, 1 tsp honey or maple syrup. 3. Heat 1 tbsp oil in a pan or wok on high. 4. Fry tofu cubes for 4–5 minutes until golden on all sides — don't move them too soon. 5. Add sliced peppers, broccoli, and spring onion. Stir-fry 3–4 minutes. 6. Pour in the sauce and toss everything together for 1 minute. 7. Serve over rice or noodles. Top with sesame seeds."
        : `1. Slice ${protein} into thin strips. Season with salt and pepper. 2. Cook your ${isGF?"rice":"noodles"} according to packet instructions. Drain and set aside. 3. Mix the stir-fry sauce: 2 tbsp soy sauce, 1 tbsp oyster sauce, 1 tsp sesame oil, 1 tsp grated ginger. 4. Heat 1 tbsp oil in a wok or large pan on high heat. 5. Fry ${protein} strips for 3–4 minutes until golden. Remove and set aside. 6. In the same pan, stir-fry sliced peppers and broccoli for 3 minutes. 7. Return ${protein} to the pan. Pour in sauce and toss everything together for 1 minute. 8. Serve over ${isGF?"rice":"noodles"} and top with sesame seeds.`,
      cal:baseCal+10, pro:pGrams+2, carb_:isKeto?10:50, fat:12,
      ing:isVegan?"tofu, mixed veg, soy sauce":isGF?`${protein}, peppers, rice`:`${protein}, peppers, noodles` },
    { name: isVegan?"Red lentil & tomato soup":isKeto?`${protein} & cheese omelette wrap`:`${protein} & sweet potato soup`,
      desc: isVegan?"Hearty red lentil and tomato soup with wholegrain bread.":isKeto?`${protein} with onion and cheese in an egg wrap.`:`Blended ${protein} broth with sweet potato and herbs.`,
      steps: isVegan
        ? "1. Finely dice 1 onion and 2 garlic cloves. Heat olive oil in a saucepan over medium heat. 2. Fry onion for 5 minutes until soft. Add garlic and fry 1 minute more. 3. Add 1 tsp cumin, 1 tsp paprika, and ½ tsp chilli flakes. Stir 30 seconds. 4. Add 150g rinsed red lentils and a 400g tin of chopped tomatoes. Pour in 600ml vegetable stock. 5. Bring to boil then simmer 20 minutes until lentils are completely soft. 6. Taste and season with salt and pepper. 7. Blend half for a thicker texture, or leave chunky. 8. Serve with a slice of wholegrain bread."
        : isKeto
        ? `1. Crack 3 eggs into a bowl with a pinch of salt and pepper. Whisk thoroughly. 2. Heat a non-stick pan over medium heat. Add a small knob of butter. 3. Pour in egg mixture — let it set around the edges (30 seconds), then gently pull edges inward to cook through evenly. 4. While still slightly soft, add sliced ${protein}, diced onion, and grated cheese to one half. 5. Fold the omelette in half and press gently. 6. Cook 1 more minute until the cheese melts. 7. Slide onto a plate and eat warm.`
        : `1. Dice 1 onion and 2 garlic cloves. Peel and cube 1 medium sweet potato. 2. Heat oil in a saucepan, soften onion 5 minutes. 3. Add garlic and cook 1 minute. 4. Add sweet potato and stir. 5. Pour in 600ml stock and bring to a boil. 6. Simmer 15 minutes until sweet potato is very soft. 7. Use a hand blender to blitz until smooth. 8. Season with salt, pepper, and a pinch of nutmeg. 9. Serve with ${isGF?"rice cakes":"a slice of wholegrain bread"}.`,
      cal:light?300:baseCal-40, pro:pGrams-5, carb_:isKeto?6:42, fat:11,
      ing:isVegan?"lentils, tomatoes, herbs":isKeto?`${protein}, eggs, cheese`:`${protein}, sweet potato` },
    { name: isVegan?"Quinoa & black bean bowl":`${protein} grain bowl with roasted veg`,
      desc: isVegan?"Quinoa with black beans, corn, avocado, and lime-coriander dressing.":`${protein} over ${carb} with roasted courgette, peppers, and tahini.`,
      steps: isVegan
        ? "1. Rinse 80g quinoa, then cook in 160ml water for 12–15 minutes. Drain and fluff. 2. Drain and rinse a can of black beans. 3. In a bowl, combine quinoa, black beans, and a handful of sweetcorn. 4. Slice half an avocado. 5. Make lime-coriander dressing: juice of 1 lime, 1 tbsp olive oil, handful of chopped coriander, salt and pepper. 6. Pour dressing over the bowl. 7. Add avocado slices on top. 8. Toss gently and serve."
        : `1. Preheat oven to 200°C. 2. Chop courgette and peppers into chunks. Toss with olive oil, salt, and mixed herbs. 3. Roast for 20–25 minutes until tender with golden edges. 4. Cook ${carb} according to packet instructions. 5. Season ${protein} with salt, pepper, and garlic. Cook in a pan for 4–6 minutes each side. Rest and slice. 6. Make tahini drizzle: 1 tbsp tahini, juice of ½ lemon, 1–2 tbsp water, pinch of salt — stir until pourable. 7. Build the bowl: ${carb} at the base, then roasted veg, then ${protein}. 8. Drizzle tahini over the top.`,
      cal:baseCal+20, pro:pGrams+3, carb_:isKeto?9:52, fat:16,
      ing:isVegan?"quinoa, black beans, avocado":`${protein}, ${carb}, roasted veg` },
    { name: isVegan?"Baked falafel pitta with hummus":isGF?`${protein} rice paper rolls`:`${protein} pitta with salad & hummus`,
      desc: isVegan?"Baked falafel with hummus, cucumber, and tomato in a wholemeal pitta.":isGF?`${protein} with cucumber and avocado in rice paper rolls.`:`${protein} with crisp salad and hummus in a wholemeal pitta.`,
      steps: isVegan
        ? "1. Preheat oven to 200°C. 2. Drain and rinse a can of chickpeas — pat dry with paper towels (this is important or they won't crisp). 3. Blend chickpeas with ½ onion, 2 garlic cloves, 2 tbsp flour, 1 tsp cumin, 1 tsp coriander, salt, and a handful of parsley until a rough paste forms. 4. Shape into small patties or balls. 5. Place on a lined baking tray, brush with olive oil. 6. Bake 20–25 minutes, flipping halfway, until golden and firm. 7. Warm a wholemeal pitta. 8. Spread 2 tbsp hummus inside. 9. Add falafel, sliced cucumber, tomato, and a drizzle of lemon juice."
        : isGF
        ? `1. Soak rice paper sheets in warm water one at a time for 15–20 seconds until soft. 2. Lay flat on a damp board. 3. Season ${protein} with salt and pepper, then cook in a pan for 4–5 minutes each side. Rest and slice thinly. 4. Lay cucumber, avocado slices, and mint leaves in the centre of the rice paper. 5. Add ${protein} strips on top. 6. Fold the bottom of the rice paper up, then fold the sides in, then roll firmly upward. 7. Repeat for remaining rolls. 8. Dip in soy sauce or sweet chilli sauce.`
        : `1. Cook ${protein} with salt, pepper, and garlic — pan-fry or grill for 4–6 minutes each side. 2. Rest 2 minutes and slice. 3. Warm the pitta for 30 seconds in a toaster or dry pan. 4. Slice the pitta open to make a pocket. 5. Spread 2 tbsp hummus generously inside. 6. Add salad leaves, sliced tomato, and cucumber. 7. Tuck in ${protein} slices. 8. Squeeze a little lemon over everything before closing.`,
      cal:light?320:baseCal-10, pro:pGrams-2, carb_:isKeto?8:44, fat:13,
      ing:isVegan?"falafel, hummus, pitta":isGF?`${protein}, cucumber, avocado, rice paper`:`${protein}, pitta, hummus, salad` },
    // ── 7 additional lunch variants (8–14) ───────────────────────────────────
    { name: isVegan?"Thai peanut noodle & edamame salad":isKeto?`Thai-spiced ${protein} lettuce bowl`:`Thai peanut noodle bowl with ${protein}`,
      desc: isVegan?"Rice noodles with edamame, shredded carrot, and peanut-lime dressing.":isKeto?`Shredded ${protein} with Thai-spiced dressing over crisp salad.`:`${protein} over rice noodles with a zingy peanut-lime sauce.`,
      steps: isVegan
        ? "1. Soak 100g rice vermicelli in boiling water for 5 minutes until soft. Drain and rinse with cold water. 2. Make peanut sauce: 2 tbsp peanut butter, 1 tbsp soy sauce, 1 tbsp lime juice, 1 tsp sesame oil, 1 tsp honey or maple syrup, 1 tsp grated ginger — whisk together, thin with water if too thick. 3. Cook 100g shelled edamame from frozen: boil 3 minutes, drain. 4. Grate 1 carrot into fine strands. Slice ½ cucumber. 5. Toss noodles with the peanut sauce. 6. Add edamame, carrot, cucumber, and sliced spring onion. 7. Top with crushed peanuts and fresh coriander."
        : isKeto
        ? `1. Season ${protein} with fish sauce, lime juice, a pinch of chilli, and garlic powder. 2. Cook in a pan for 4–5 minutes each side until done. Rest and shred or slice thinly. 3. Make dressing: 2 tbsp lime juice, 1 tbsp fish sauce, 1 tsp honey, 1 tsp sesame oil, chilli to taste. 4. Toss together mixed leaves, shredded carrot, cucumber ribbons, and mint leaves. 5. Top with ${protein}. Drizzle dressing over everything. 6. Scatter crushed peanuts or cashews on top.`
        : `1. Cook 100g rice noodles per packet — usually 4 minutes in boiling water. Drain and rinse. 2. Make peanut sauce: 2 tbsp peanut butter, 1 tbsp soy, 1 tbsp lime juice, 1 tsp honey, 1 tsp sesame oil — whisk until smooth. 3. Cook ${protein}: season with salt, pepper, and a dash of soy. Pan-fry 4–5 mins each side until done. Slice. 4. Toss noodles with peanut sauce. 5. Pile in a bowl with shredded carrot, cucumber ribbons, and fresh coriander. 6. Top with sliced ${protein} and crushed peanuts.`,
      cal:light?360:baseCal+10, pro:pGrams, carb_:isKeto?9:50, fat:14,
      ing:isVegan?"rice noodles, edamame, peanut butter, lime":isKeto?`${protein}, mixed leaves, peanuts`:`${protein}, rice noodles, peanut sauce` },
    { name: isVegan?"Japanese teriyaki tofu rice bowl":isKeto?`Teriyaki ${protein} with cauliflower rice`:`Teriyaki ${protein} rice bowl`,
      desc: isVegan?"Glazed teriyaki tofu over steamed rice with pickled cucumber and sesame.":isKeto?`Teriyaki-glazed ${protein} over cauliflower rice with edamame.`:`${protein} marinated in teriyaki served over jasmine rice with greens.`,
      steps: isVegan
        ? "1. Make teriyaki: mix 3 tbsp soy sauce, 1 tbsp honey, 1 tsp rice vinegar, 1 tsp sesame oil, 1 tsp grated ginger. 2. Press 200g firm tofu dry between paper towels — very important for crispness. Cut into rectangles. 3. Pan-fry tofu in 1 tbsp oil on high heat, 3–4 minutes each side, until golden and slightly crispy. 4. Pour teriyaki sauce in. Let it bubble and coat the tofu for 1–2 minutes — shake the pan to cover evenly. 5. Cook 80g jasmine rice per packet. 6. Quick-pickle cucumber: slice thinly, toss with a pinch of salt and a splash of rice vinegar. 7. Assemble: rice, teriyaki tofu, edamame, cucumber, and sesame seeds."
        : isKeto
        ? `1. Make low-sugar teriyaki: 3 tbsp soy sauce, 1 tbsp rice vinegar, 1 tsp sesame oil, 1 tsp grated ginger, sweetener to taste. 2. Marinate ${protein} in this sauce for 10–20 minutes. 3. Meanwhile, pulse cauliflower in a food processor until it resembles rice. 4. Fry cauliflower rice in 1 tsp oil for 3–4 minutes until just tender. Season. 5. Remove ${protein} from marinade. Pan-fry or grill 4–5 minutes each side. 6. Pour remaining marinade into pan, let it thicken for 1 minute. 7. Serve teriyaki ${protein} over cauliflower rice with edamame beans.`
        : `1. Combine 3 tbsp soy sauce, 2 tbsp honey, 1 tbsp rice vinegar, 1 tsp grated ginger as marinade. 2. Coat ${protein} and leave for at least 15 minutes. 3. Cook jasmine rice per packet. 4. Pan-fry or grill ${protein} for 4–5 minutes each side. Pour in remaining marinade for the last 2 minutes to glaze. 5. Steam pak choi or broccoli for 3–4 minutes. 6. Arrange rice in bowl, add sliced ${protein}, steamed greens, and drizzle any remaining glaze. Scatter sesame seeds.`,
      cal:light?370:baseCal+20, pro:pGrams+2, carb_:isKeto?8:50, fat:13,
      ing:isVegan?"tofu, teriyaki sauce, rice, edamame":isKeto?`${protein}, cauliflower rice, edamame`:`${protein}, teriyaki sauce, rice` },
    { name: isVegan?"Mediterranean hummus power bowl":isKeto?`${protein} Greek salad with feta & olives`:"Mediterranean plate with grilled protein & tabbouleh",
      desc: isVegan?"Warm spiced chickpeas over hummus with roasted peppers and herbed quinoa.":isKeto?`Grilled ${protein} with Greek salad, olives, feta, and lemon dressing.`:`Grilled ${protein} with fresh tabbouleh, hummus, and warm pitta.`,
      steps: isVegan
        ? "1. Heat 1 tbsp olive oil. Add a drained 400g can of chickpeas with ½ tsp cumin, ½ tsp paprika, pinch of chilli — fry 4–5 minutes until crisped. 2. Cook 80g quinoa: rinse, simmer in 160ml water 12 minutes. Fluff and mix in fresh parsley and a squeeze of lemon. 3. Spread 4 tbsp hummus in the centre of a wide bowl. 4. Pile quinoa to one side, chickpeas to the other. 5. Add roasted red peppers (jar), sliced cucumber, and cherry tomatoes. 6. Drizzle with olive oil and sprinkle za'atar or sumac."
        : isKeto
        ? `1. Season ${protein} with olive oil, lemon zest, salt, pepper, and dried oregano. 2. Grill or pan-sear for 4–5 minutes each side until marked and cooked through. Rest and slice. 3. Chop 1 tomato, ½ cucumber, 5 Kalamata olives, and ¼ red onion. 4. Crumble 50g feta. 5. Toss veg and feta together with 2 tbsp olive oil, 1 tbsp red wine vinegar, dried oregano, salt, and pepper. 6. Plate salad with ${protein} on top. 7. Serve with lemon wedge.`
        : `1. Make tabbouleh: soak 80g bulgur wheat in boiling water for 20 minutes. Drain, cool. Add lots of finely chopped flat-leaf parsley, diced tomato, cucumber, spring onion, olive oil, and lemon juice. Season. 2. Season ${protein} with olive oil, garlic, lemon, and oregano. 3. Grill or pan-fry 4–5 minutes each side. Rest. 4. Serve ${protein} alongside a generous spoonful of tabbouleh, 2 tbsp hummus, and a warm pitta.`,
      cal:light?340:baseCal+10, pro:pGrams+3, carb_:isKeto?7:42, fat:16,
      ing:isVegan?"chickpeas, hummus, quinoa, roasted peppers":isKeto?`${protein}, feta, olives, cucumber`:`${protein}, bulgur, parsley, hummus` },
    { name: isVegan?"Indian spiced dal & rice wrap":isKeto?`${protein} tikka lettuce cups`:`${protein} tikka masala wrap`,
      desc: isVegan?"Spiced red lentil dal in a whole wheat wrap with raita and cucumber.":isKeto?`${protein} tikka in crisp romaine cups with yoghurt raita.`:`${protein} tikka masala in a wholegrain wrap with mint yoghurt.`,
      steps: isVegan
        ? "1. Rinse 100g red lentils. Heat 1 tbsp oil; add 1 diced onion, fry 4 minutes. 2. Add 2 garlic cloves, ½ tsp cumin, ½ tsp turmeric, ½ tsp garam masala — stir 30 seconds. 3. Add lentils and 350ml vegetable stock. Simmer 15 minutes until lentils dissolve and mixture thickens. Season with salt and lemon. 4. Make raita: mix 4 tbsp plant yoghurt, finely grated cucumber, a pinch of cumin, and salt. 5. Warm a whole wheat wrap. 6. Spread raita down the centre, top with dal and sliced cucumber. 7. Roll tightly."
        : isKeto
        ? `1. Dice ${protein} into chunks. Mix 100g Greek yoghurt with 1 tbsp tikka spice paste (or: 1 tsp each of cumin, coriander, turmeric, smoked paprika, garam masala). 2. Coat ${protein} well. Leave 15 minutes (or overnight for better flavour). 3. Grill or pan-fry in a very hot pan for 3–4 minutes each side until charred at edges and cooked through. 4. Make raita: 3 tbsp Greek yoghurt, grated cucumber, pinch of mint, cumin, salt. 5. Separate large romaine leaves. 6. Fill each leaf with tikka ${protein} and a spoon of raita. 7. Eat with your hands.`
        : `1. Cut ${protein} into chunks. Mix 80g Greek yoghurt with 1 tbsp tikka paste. Coat ${protein}. Marinate 15 minutes. 2. Grill ${protein} in a very hot pan for 4 minutes each side until lightly charred. 3. Make raita: mix 60g Greek yoghurt, grated cucumber, chopped mint, and a pinch of cumin. 4. Warm a wholegrain wrap for 20 seconds. 5. Spread raita down the centre. 6. Add ${protein} tikka and some shredded lettuce. 7. Roll tightly and slice in half.`,
      cal:light?330:baseCal-10, pro:pGrams+2, carb_:isKeto?9:42, fat:12,
      ing:isVegan?"red lentils, wrap, yoghurt, spices":isKeto?`${protein}, tikka spices, lettuce, raita`:`${protein}, tikka paste, wrap, raita` },
    { name: isVegan?"Korean-style mixed grain bibimbap":isKeto?`${protein} Korean beef bowl — no rice`:`${protein} bibimbap rice bowl`,
      desc: isVegan?"Mixed grains with gochujang-glazed tofu, crisp veg, and sesame.":isKeto?`${protein} with gochujang glaze over shredded cabbage and spinach.`:`${protein} bibimbap with mixed veg, fried egg, and gochujang.`,
      steps: isVegan
        ? "1. Cook 80g brown rice or mixed grains per packet. 2. Press and cube 150g firm tofu. Fry in 1 tsp oil for 5 minutes until golden on all sides. 3. Toss with 1 tsp gochujang (Korean chilli paste), 1 tsp soy, 1 tsp sesame oil, ½ tsp honey — cook 1 minute more until glazed. 4. Quickly blanch spinach in boiling water (30 seconds) and squeeze dry. Toss with sesame oil and soy. 5. Grate carrot. Slice cucumber. 6. Arrange rice in a bowl. Place tofu, spinach, carrot, and cucumber in separate sections around the bowl. 7. Drizzle extra gochujang over the top. Sprinkle sesame seeds."
        : isKeto
        ? `1. Slice ${protein} thinly. Marinate in: 2 tbsp soy sauce, 1 tbsp gochujang, 1 tsp sesame oil, 1 tsp honey, 2 cloves minced garlic — 10 minutes. 2. Fry ${protein} in a hot pan for 3–4 minutes each side until glazed and caramelised at the edges. 3. Shred ¼ cabbage finely. Blanch 100g spinach in boiling water 30 seconds, squeeze dry, season with sesame oil. 4. Layer cabbage and spinach in a bowl. Top with ${protein}. 5. Fry 1 egg sunny-side up and place on top. 6. Drizzle more gochujang and sesame seeds to finish.`
        : `1. Cook 80g short-grain or jasmine rice. 2. Slice ${protein} and marinate in: 2 tbsp soy, 1 tbsp gochujang, 1 tsp sesame oil, 1 tsp honey, garlic — 10 minutes. 3. Fry ${protein} on high heat until glazed. 4. Blanch spinach 30 seconds; season with sesame oil. Grate carrot. Slice cucumber. 5. Fry 1 egg sunny side up. 6. Place rice in bowl. Arrange ${protein}, spinach, carrot, and cucumber in sections. 7. Top with fried egg and gochujang drizzle. Mix before eating.`,
      cal:light?360:baseCal+30, pro:pGrams+4, carb_:isKeto?8:52, fat:15,
      ing:isVegan?"brown rice, tofu, gochujang, sesame":isKeto?`${protein}, gochujang, cabbage, egg`:`${protein}, rice, gochujang, mixed veg, egg` },
    { name: isVegan?"Mexican black bean & corn burrito bowl":isKeto?`${protein} Mexican bowl with avocado`:`${protein} burrito bowl with brown rice`,
      desc: isVegan?"Seasoned black beans and corn over rice with guac, salsa, and lime.":isKeto?`${protein} with guacamole, salsa, sour cream, and shredded cabbage.`:`${protein} burrito bowl with brown rice, black beans, guacamole, and salsa.`,
      steps: isVegan
        ? "1. Cook 80g brown rice per packet (or use pre-cooked). Fluff with a fork. 2. Drain and rinse a can of black beans. Heat in a pan with ½ tsp cumin, ½ tsp smoked paprika, and a pinch of chilli. Warm through 3–4 minutes. 3. Drain and add a handful of sweetcorn. 4. Make guacamole: mash 1 avocado with lime juice, salt, and diced tomato. 5. Build the bowl: rice base, then beans and corn, then guacamole. 6. Add fresh salsa (diced tomato + red onion + coriander + lime) on top. 7. Squeeze lime over everything."
        : isKeto
        ? `1. Season ${protein} with cumin, smoked paprika, garlic powder, salt, and pepper. 2. Cook in a hot pan with oil for 4–5 minutes each side. Rest and slice. 3. Make guacamole: mash 1 avocado with lime juice, diced tomato, red onion, coriander, and salt. 4. Shred ¼ small cabbage finely. 5. Warm 3 tbsp salsa. 6. Build the bowl: cabbage base, then ${protein} strips. 7. Add guacamole, salsa, and 1 tbsp sour cream on top. 8. Squeeze lime.`
        : `1. Cook ${protein} with cumin, garlic, and paprika — pan-fry or grill until done. Rest and slice. 2. Cook or reheat brown rice. 3. Warm black beans with cumin and a pinch of salt. 4. Mash 1 avocado with lime for guacamole. 5. Build: rice base, then beans, then sliced ${protein}. 6. Add guacamole and salsa on top. 7. Garnish with coriander, red onion, and a big squeeze of lime.`,
      cal:light?350:baseCal+20, pro:pGrams+2, carb_:isKeto?7:54, fat:16,
      ing:isVegan?"black beans, corn, brown rice, avocado":isKeto?`${protein}, avocado, salsa, cabbage`:`${protein}, brown rice, black beans, avacado` },
    { name: isVegan?"Vietnamese-style vermicelli salad bowl":isKeto?`${protein} Asian lettuce cups`:`${protein} Vietnamese-style rice noodle salad`,
      desc: isVegan?"Light vermicelli with fresh herbs, bean sprouts, and peanut-lime dressing.":isKeto?`${protein} with Vietnamese herbs, mint, and lime in lettuce cups.`:`${protein} over vermicelli with mint, coriander, and nuoc cham dressing.`,
      steps: isVegan
        ? "1. Soak 80g rice vermicelli in boiling water for 5 minutes. Drain and rinse with cold water. 2. Make peanut-lime dressing: 2 tbsp peanut butter, 2 tbsp lime juice, 1 tbsp soy sauce, 1 tsp honey, 1 tsp chilli flakes, splash of warm water — whisk. 3. Shred ½ carrot into thin strips. Slice ½ cucumber. 4. Soak a handful of bean sprouts in cold water for 5 minutes, drain. 5. Toss vermicelli with dressing. 6. Add carrot, cucumber, bean sprouts, fresh mint, and coriander leaves. 7. Top with crushed peanuts and extra lime."
        : isKeto
        ? `1. Make nuoc cham: 2 tbsp fish sauce, 2 tbsp lime juice, 1 tsp honey, 1 chilli (sliced), 1 garlic clove (minced), 2 tbsp water. 2. Season and cook ${protein}: grill or pan-fry for 4–5 minutes each side. Rest and slice thinly. 3. Separate large cos or romaine lettuce leaves. 4. Fill each leaf with ${protein} slices, mint leaves, coriander, grated carrot, and cucumber. 5. Drizzle nuoc cham over the filling. 6. Sprinkle crushed peanuts on top.`
        : `1. Soak 80g rice vermicelli in boiling water 5 minutes. Drain and rinse cold. 2. Make nuoc cham: 2 tbsp fish sauce, 2 tbsp lime juice, 1 tsp sugar, 1 chilli sliced, 1 garlic clove, 2 tbsp water. 3. Cook ${protein}: marinate in nuoc cham for 10 minutes, then grill or pan-fry. Slice thinly. 4. Assemble: noodles in bowl. Add ${protein}, shredded carrot, cucumber, bean sprouts, fresh mint, and coriander. 5. Pour remaining nuoc cham over. 6. Scatter crushed peanuts.`,
      cal:light?330:baseCal-20, pro:pGrams-1, carb_:isKeto?6:46, fat:12,
      ing:isVegan?"vermicelli, bean sprouts, peanut butter, lime":isKeto?`${protein}, lettuce, mint, coriander`:`${protein}, vermicelli, mint, coriander, fish sauce` },
  ];

  // ── 7 dinner variants — dinnerProtein & dinnerCarb differ from lunch each day ──
  const dinners = [
    { name: isVegan?`${isGF?"Rice noodle":"Noodle"} stir-fry with tofu`:isKeto?`Baked ${dinnerProtein} with roasted low-carb veg`:`${dinnerProtein} with ${dinnerCarb} & greens`,
      desc: isVegan?`Tofu stir-fried with peppers, pak choi, and ginger.`:isKeto?`Oven-baked ${dinnerProtein} with courgette, asparagus, and olive oil.`:`Oven-baked ${dinnerProtein} with ${dinnerCarb} and greens.`,
      steps: isVegan
        ? "1. Boil a kettle and cook noodles per packet — usually pour boiling water over and leave 4–5 minutes. Drain and rinse with cold water. 2. Press tofu dry between paper towels, then cube. 3. Mix sauce: 2 tbsp soy, 1 tbsp rice vinegar, 1 tsp sesame oil, 1 tsp grated ginger, 1 tsp honey. 4. Heat a wok on high. Fry tofu in 1 tbsp oil for 4–5 minutes until golden. 5. Add sliced peppers, pak choi, and spring onion. Stir-fry 3–4 minutes. 6. Add noodles to the pan. Pour over sauce. Toss vigorously for 1–2 minutes. 7. Serve with sesame seeds and chilli flakes on top."
        : isKeto
        ? `1. Preheat oven to 200°C. 2. Chop courgette and asparagus into bite-size pieces. Toss with olive oil, salt, and pepper. Spread on a baking tray. 3. Season ${dinnerProtein} generously with salt, pepper, garlic powder, and dried herbs. 4. Place ${dinnerProtein} on a separate area of the tray (or use a second tray). 5. Bake 20–25 minutes, turning veg halfway, until protein is cooked through (no pink) and veg has golden edges. 6. Squeeze a little lemon over everything before serving.`
        : `1. Preheat oven to 190°C. 2. Season ${dinnerProtein} with oil, salt, pepper, and herbs. Place in a baking dish and roast 20–25 minutes until cooked through. 3. Cook ${dinnerCarb} per packet instructions. 4. While everything cooks, bring a pan of salted water to the boil and cook greens (spinach, broccoli, or kale) for 3–4 minutes. Drain. 5. Slice the rested ${dinnerProtein}. 6. Serve with ${dinnerCarb}, greens, and a drizzle of olive oil.`,
      cal:goal==="lose"?440:580, pro:goal==="gain"?50:40, carb_:isKeto?8:52, fat:18,
      ing:isVegan?"tofu, noodles, peppers, pak choi":isKeto?`${dinnerProtein}, courgette, asparagus`:`${dinnerProtein}, ${dinnerCarb}, greens` },
    { name: isVegan?"Red lentil dhal with basmati":isKeto?`Pan-seared ${dinnerProtein} with cauliflower mash`:`${dinnerProtein} curry with coconut milk`,
      desc: isVegan?"Spiced red lentil dhal with spinach over basmati rice.":isKeto?`Seared ${dinnerProtein} with creamy cauliflower mash and herb butter.`:`Fragrant ${dinnerProtein} curry with coconut milk, tomato, and spices.`,
      steps: isVegan
        ? "1. Rinse 150g red lentils until water runs clear. 2. Heat 1 tbsp oil in a saucepan. Add 1 diced onion and fry 5 minutes until soft. 3. Add 3 minced garlic cloves, 1 tsp grated ginger, 1 tsp cumin, 1 tsp turmeric, 1 tsp garam masala. Stir 1 minute. 4. Add lentils and 500ml vegetable stock. Bring to boil, then reduce heat and simmer 20 minutes until lentils are completely soft. 5. Stir in a large handful of spinach — it will wilt in 1 minute. 6. Taste and season with salt, a squeeze of lemon. 7. Meanwhile, rinse 80g basmati rice and simmer in 160ml water for 10–12 minutes, covered. 8. Serve dhal over rice with a spoonful of yoghurt if desired."
        : isKeto
        ? `1. Break a cauliflower head into florets. Boil in salted water for 10–12 minutes until very soft. 2. Drain and return to the pan. Add 1 tbsp butter, 2 tbsp cream cheese, salt, pepper, and a pinch of nutmeg. 3. Use a hand blender or potato masher to blitz until very smooth and creamy. Keep warm on low heat. 4. Pat ${dinnerProtein} dry with paper towels — this helps it sear properly. Season generously. 5. Heat 1 tbsp oil in a pan on high heat until shimmering. 6. Sear ${dinnerProtein} for 3–4 minutes each side until golden and cooked through. 7. Rest 2 minutes. 8. Plate mash, add ${dinnerProtein} on top, finish with herb butter (softened butter mixed with parsley).`
        : `1. Heat 1 tbsp oil in a large pan. Add 1 diced onion, fry 5 minutes. 2. Add 3 garlic cloves and 1 tsp grated ginger. Fry 1 minute. 3. Add 1 tsp cumin, 1 tsp coriander, ½ tsp turmeric, ½ tsp chilli — stir 30 seconds. 4. Add ${dinnerProtein} cut into chunks. Brown for 3–4 minutes. 5. Pour in 1 can (400ml) coconut milk and 1 can (400g) chopped tomatoes. Stir well. 6. Simmer uncovered for 20 minutes, stirring occasionally, until the sauce thickens and protein is cooked. 7. Season with salt and garnish with coriander. 8. Serve over ${isGF?"rice":"basmati rice"}.`,
      cal:goal==="lose"?420:560, pro:goal==="gain"?48:38, carb_:isKeto?7:54, fat:16,
      ing:isVegan?"red lentils, basmati, spinach, spices":isKeto?`${dinnerProtein}, cauliflower`:`${dinnerProtein}, coconut milk, spices, ${isGF?"rice":"basmati rice"}` },
    { name: isVegan?"Chickpea & spinach tomato stew":isKeto?`${dinnerProtein} lettuce tacos`:`${dinnerProtein} pasta with tomato & herb sauce`,
      desc: isVegan?"Slow-simmered chickpeas and spinach in a rich tomato and garlic sauce.":isKeto?`Seasoned ${dinnerProtein} in lettuce cups with salsa and avocado.`:`${dinnerProtein} with ${isGF?"rice pasta":"wholemeal pasta"} in a fresh tomato and basil sauce.`,
      steps: isVegan
        ? "1. Heat 1 tbsp olive oil in a wide saucepan or casserole over medium heat. 2. Add 1 finely diced onion and cook for 6–7 minutes until translucent. 3. Add 4 crushed garlic cloves, stir 1 minute. 4. Add 1 tsp cumin, ½ tsp smoked paprika, ½ tsp chilli flakes. Stir 30 seconds. 5. Pour in 2 cans (800g) of chopped tomatoes and 1 can (400g) drained chickpeas. 6. Add ½ tsp sugar to balance the tomatoes. Stir well. 7. Simmer on medium-low for 20 minutes, stirring occasionally, until sauce thickens. 8. Stir in 2 large handfuls of spinach until wilted. 9. Season with salt and a squeeze of lemon. Serve with crusty bread or rice."
        : isKeto
        ? `1. Season ${dinnerProtein} with cumin, smoked paprika, salt, and pepper. 2. Cook in a hot pan with oil for 4–5 minutes each side. 3. Rest and slice or shred. 4. Make salsa: dice 1 tomato, ¼ red onion, juice of 1 lime, handful of coriander, salt — mix. 5. Slice half an avocado. 6. Separate large romaine or iceberg lettuce leaves — these are your taco shells. 7. Place ${dinnerProtein} in the lettuce. 8. Top with salsa, avocado, and a squeeze of lime. Eat immediately.`
        : `1. Boil a large pot of salted water. Cook ${isGF?"rice pasta":"wholemeal pasta"} according to packet — usually 9–12 minutes. Reserve a cup of pasta water before draining. 2. Meanwhile, heat 1 tbsp olive oil in a pan. Add 3 crushed garlic cloves, fry 1 minute (don't burn them). 3. Add a 400g tin of chopped tomatoes and ½ tsp sugar. Simmer 10 minutes. 4. While sauce simmers, season and cook ${dinnerProtein} in a separate pan, then slice. 5. Add pasta to sauce and toss — splash in reserved water if it looks dry. 6. Stir in a large handful of fresh basil. 7. Plate and top with ${dinnerProtein} and a little olive oil.`,
      cal:goal==="lose"?400:550, pro:goal==="gain"?46:36, carb_:isKeto?9:58, fat:14,
      ing:isVegan?"chickpeas, spinach, tomatoes, garlic":isKeto?`${dinnerProtein}, lettuce, avocado, salsa`:`${dinnerProtein}, pasta, tomatoes, basil` },
    { name: isVegan?"Black bean & sweet potato tacos":isKeto?`Grilled ${dinnerProtein} with avocado salsa`:`${dinnerProtein} with roasted sweet potato`,
      desc: isVegan?"Spiced black beans and roasted sweet potato in soft taco shells.":isKeto?`Grilled ${dinnerProtein} with fresh avocado, tomato, and coriander salsa.`:`Grilled ${dinnerProtein} with roasted sweet potato and steamed broccoli.`,
      steps: isVegan
        ? "1. Preheat oven to 200°C. 2. Peel and cube 1 large sweet potato. Toss with 1 tbsp olive oil, ½ tsp cumin, ½ tsp smoked paprika, salt. Spread on a baking tray. 3. Roast 25 minutes until caramelised and soft. 4. Drain and rinse a can of black beans. Warm in a small pan with ½ tsp cumin and a pinch of chilli. Season with salt. 5. Warm soft taco shells in the oven (wrap in foil) for 5 minutes or heat individually in a dry pan for 30 seconds. 6. Fill each taco with sweet potato, black beans, and any toppings: shredded cabbage, salsa, avocado, or lime juice. 7. Serve immediately."
        : isKeto
        ? `1. Heat a griddle or grill pan to high heat. 2. Brush ${dinnerProtein} with olive oil and season with salt, pepper, and garlic powder. 3. Grill for 4–5 minutes each side — it should come away easily when ready; if it sticks, give it another minute. 4. Rest for 3 minutes while you make salsa. 5. Dice 1 ripe avocado, 1 tomato, and ¼ red onion. Add juice of 1 lime, a handful of coriander, and salt. Mix gently. 6. Slice the rested ${dinnerProtein}. 7. Plate and top with fresh avocado salsa.`
        : `1. Preheat oven to 200°C. 2. Peel sweet potato and cut into wedges. Toss with oil, salt, and paprika. Roast 30–35 minutes, flipping halfway. 3. Cut broccoli into florets and steam for 4–5 minutes until just tender. 4. Heat a griddle or pan. Brush ${dinnerProtein} with oil, season with salt and pepper. 5. Grill for 4–6 minutes each side until cooked through. 6. Rest 3 minutes before slicing. 7. Serve with sweet potato wedges and broccoli on the side.`,
      cal:goal==="lose"?430:565, pro:goal==="gain"?47:37, carb_:isKeto?6:50, fat:17,
      ing:isVegan?"black beans, sweet potato, taco shells":isKeto?`${dinnerProtein}, avocado, tomato`:`${dinnerProtein}, sweet potato, broccoli` },
    { name: isVegan?"Teriyaki tempeh with brown rice":isKeto?`${dinnerProtein} & broccoli cheese bake`:`Teriyaki ${dinnerProtein} with ${dinnerCarb}`,
      desc: isVegan?"Glazed teriyaki tempeh with steamed broccoli and brown rice.":isKeto?`${dinnerProtein} and broccoli baked in a creamy cheese sauce.`:`${dinnerProtein} marinated in teriyaki sauce with ${dinnerCarb} and steamed veg.`,
      steps: isVegan
        ? "1. Make teriyaki: mix 3 tbsp soy sauce, 1 tbsp honey or maple syrup, 1 tsp sesame oil, 1 tsp grated ginger, 1 crushed garlic clove. 2. Slice tempeh into 1cm pieces. Place in the sauce for at least 10 minutes (longer is better). 3. Cook brown rice: rinse 80g rice, simmer in 180ml water for 25–30 minutes until water is absorbed. 4. Heat a non-stick pan over medium-high. Add tempeh slices (keep the marinade). 5. Fry 3–4 minutes each side until caramelised. Pour remaining sauce in and let it bubble and coat for 1 minute. 6. Steam broccoli for 4–5 minutes. 7. Serve tempeh over rice with broccoli and sprinkle sesame seeds."
        : isKeto
        ? `1. Preheat oven to 190°C. 2. Cut broccoli into florets and blanch in boiling salted water for 3 minutes. Drain well. 3. Make cheese sauce: melt 1 tbsp butter, whisk in 1 tbsp cream cheese and 50ml double cream over low heat. Add 50g grated cheddar and stir until melted. Season. 4. Place ${dinnerProtein} in an ovenproof dish. Season with salt and pepper. 5. Pile broccoli around it. Pour cheese sauce over everything. 6. Sprinkle extra cheese on top. 7. Bake 22–25 minutes until golden and bubbling. 8. Rest 5 minutes before serving.`
        : `1. Make teriyaki marinade: mix 3 tbsp soy sauce, 2 tbsp honey, 1 tbsp rice vinegar, 1 tsp sesame oil, 1 tsp grated ginger. 2. Coat ${dinnerProtein} in marinade for at least 15 minutes. 3. Cook ${dinnerCarb} per packet instructions. 4. Heat a pan to medium-high. Remove ${dinnerProtein} from marinade (keep sauce). 5. Cook for 4–5 minutes each side. Pour remaining marinade in for the last 2 minutes — it will thicken and glaze. 6. Steam any veg for 3–4 minutes. 7. Serve ${dinnerProtein} sliced over ${dinnerCarb} with veg on the side. Drizzle remaining glaze over everything.`,
      cal:goal==="lose"?410:555, pro:goal==="gain"?45:35, carb_:isKeto?8:50, fat:15,
      ing:isVegan?"tempeh, teriyaki sauce, brown rice, broccoli":isKeto?`${dinnerProtein}, broccoli, cheese`:`${dinnerProtein}, teriyaki sauce, ${dinnerCarb}` },
    { name: isVegan?"Mushroom & walnut bolognese":isKeto?`Courgette noodles with ${dinnerProtein} & pesto`:`${dinnerProtein} bolognese with ${isGF?"rice pasta":"wholemeal spaghetti"}`,
      desc: isVegan?"Finely chopped mushrooms and walnuts in a rich tomato ragu over pasta.":isKeto?`Courgette noodles topped with grilled ${dinnerProtein} and fresh basil pesto.`:`Rich ${dinnerProtein} bolognese with ${isGF?"rice":"wholemeal"} spaghetti.`,
      steps: isVegan
        ? "1. Blitz 200g mushrooms and 50g walnuts in a food processor until finely chopped — they should look like mince. 2. Heat 1 tbsp olive oil in a large pan. Add 1 diced onion and cook 5 minutes. 3. Add 3 garlic cloves and cook 1 minute. 4. Add the mushroom-walnut mix and cook on high heat for 6–8 minutes, stirring often, until dark and most moisture has evaporated. 5. Add 2 tbsp tomato puree and stir for 1 minute. 6. Add 1 can (400g) chopped tomatoes, ½ tsp dried oregano, salt, and pepper. 7. Simmer 15 minutes until ragu is thick. 8. Cook pasta per packet. Drain and toss with bolognese. Serve with nutritional yeast instead of parmesan."
        : isKeto
        ? `1. Make courgette noodles: use a spiraliser, or use a vegetable peeler to create long thin ribbons. 2. Place in a colander, sprinkle with salt, and leave 10 minutes — this draws out water. Squeeze dry with paper towels. 3. Season ${dinnerProtein} with salt and pepper. Grill or pan-fry for 4–5 minutes each side until golden. Rest and slice. 4. Heat a pan, add courgette noodles and toss for 1–2 minutes — don't overcook or they go soggy. 5. Plate noodles immediately and top with ${dinnerProtein}. 6. Spoon 2 tbsp fresh basil pesto over everything. 7. Finish with pine nuts and grated parmesan.`
        : `1. Heat 1 tbsp olive oil in a large saucepan. Add 1 diced onion and 1 diced carrot — cook 6 minutes until soft. 2. Add 3 crushed garlic cloves, cook 1 minute. 3. Add ${dinnerProtein} mince (or chopped ${dinnerProtein}) and cook on high, breaking up with a spoon, until browned all over — 6–8 minutes. 4. Add 2 tbsp tomato puree, stir and cook 1 minute. 5. Pour in 1 can (400g) chopped tomatoes and 100ml water. Add ½ tsp dried oregano and ½ tsp dried basil. 6. Simmer on low for 20 minutes, stirring occasionally. 7. Cook ${isGF?"rice pasta":"wholemeal spaghetti"} per packet, drain. 8. Toss pasta with bolognese and serve.`,
      cal:goal==="lose"?425:570, pro:goal==="gain"?46:36, carb_:isKeto?7:55, fat:16,
      ing:isVegan?"mushrooms, walnuts, pasta, tomatoes":isKeto?`${dinnerProtein}, courgette, pesto`:`${dinnerProtein}, pasta, tomatoes` },
    { name: isVegan?"Thai green curry with tofu":isKeto?`${dinnerProtein} stuffed peppers`:`${dinnerProtein} with ${dinnerCarb} & roasted seasonal vegetables`,
      desc: isVegan?"Creamy Thai green curry with tofu, courgette, and jasmine rice.":isKeto?`Bell peppers stuffed with ${dinnerProtein}, onion, cheese, and herbs, then baked.`:`Seasoned ${dinnerProtein} with ${dinnerCarb} and a tray of oven-roasted seasonal vegetables.`,
      steps: isVegan
        ? "1. Cook jasmine rice: rinse 80g rice, bring to boil in 180ml water, cover and simmer 12 minutes. Remove from heat, leave covered 5 minutes. 2. Press tofu dry and cube. Pan-fry in 1 tbsp oil for 4–5 minutes until golden. Remove. 3. In the same pan, fry 1–2 tbsp green curry paste for 1 minute over medium heat. 4. Pour in 1 can (400ml) coconut milk. Stir to combine. Bring to a gentle simmer. 5. Add sliced courgette and baby corn. Cook 5 minutes. 6. Return tofu to the pan. Simmer 5 more minutes. 7. Add a squeeze of lime juice and a handful of Thai basil or coriander. 8. Taste and season. Serve over rice."
        : isKeto
        ? `1. Preheat oven to 190°C. 2. Slice the tops off 4 bell peppers and scoop out seeds — try to keep the peppers intact. 3. Cook ${dinnerProtein} in a pan, breaking it up or dicing it as it cooks. Add diced onion and cook together 5–6 minutes. Season with garlic powder, paprika, salt, and pepper. 4. Remove from heat and stir in half the cheese. 5. Fill each pepper with the ${dinnerProtein} mixture, pressing down firmly. 6. Place peppers upright in a baking dish. Add a splash of water to the base. 7. Top with remaining cheese. 8. Bake 30–35 minutes until peppers are tender and cheese is golden. Rest 5 minutes.`
        : `1. Preheat oven to 200°C. 2. Chop seasonal veg (peppers, courgette, red onion, cherry tomatoes) into similar-sized pieces. Toss with oil, salt, pepper, and dried herbs. 3. Spread on a large baking tray (don't overcrowd or they'll steam, not roast). 4. Roast 25–30 minutes, turning halfway, until golden and caramelised at edges. 5. Cook ${dinnerCarb} per packet instructions. 6. Season ${dinnerProtein} with oil, salt, pepper, and garlic. Pan-fry or grill for 4–6 minutes each side until cooked through. 7. Rest 3 minutes and slice. 8. Plate: ${dinnerCarb} base, then roasted veg, then ${dinnerProtein}. Drizzle with olive oil.`,
      cal:goal==="lose"?440:575, pro:goal==="gain"?49:39, carb_:isKeto?9:52, fat:17,
      ing:isVegan?"tofu, green curry paste, jasmine rice":isKeto?`${dinnerProtein}, bell peppers, cheese`:`${dinnerProtein}, ${dinnerCarb}, seasonal veg` },
    // ── 7 additional dinner variants (8–14) ──────────────────────────────────
    { name: isVegan?"Japanese miso aubergine with edamame rice":isKeto?`${dinnerProtein} with miso butter & wilted pak choi`:`Miso-glazed ${dinnerProtein} with edamame rice`,
      desc: isVegan?"Oven-baked miso aubergine with sesame edamame rice — umami-rich.":isKeto?`${dinnerProtein} baked with miso butter and served with wilted pak choi.`:`${dinnerProtein} glazed in white miso and honey, with steamed edamame rice.`,
      steps: isVegan
        ? "1. Preheat oven to 200°C. 2. Halve 1 large aubergine lengthways. Score the flesh in a diamond pattern — don't cut through the skin. 3. Mix: 2 tbsp white miso, 1 tbsp mirin (or rice vinegar), 1 tbsp honey, 1 tsp sesame oil. 4. Brush miso mixture generously over the cut surfaces. 5. Roast cut-side up for 25–30 minutes until golden and very tender. 6. Cook 80g jasmine rice. With 2 minutes left, add a handful of frozen edamame to the rice water. 7. Drain and season rice with a drop of sesame oil. 8. Serve aubergine over edamame rice with sesame seeds and spring onion."
        : isKeto
        ? `1. Make miso butter: mix 1 tbsp softened butter, 1 tsp white miso paste, ½ tsp honey, ½ tsp sesame oil. 2. Pat ${dinnerProtein} dry — this is essential for a proper sear. Season with pepper. 3. Heat an oven-proof pan until smoking hot. Sear ${dinnerProtein} for 3 minutes without moving it. Flip. 4. Spread miso butter on top. 5. Transfer to 180°C oven for 10–12 minutes until just cooked through. 6. Meanwhile, wilt pak choi in a pan with 1 tsp sesame oil, a splash of soy, and 1 minute of high heat. 7. Rest ${dinnerProtein} 3 minutes. Serve over pak choi.`
        : `1. Whisk: 2 tbsp white miso, 1 tbsp honey, 1 tbsp mirin, 1 tsp sesame oil as glaze. 2. Pat ${dinnerProtein} dry. Brush glaze on. Marinate 20 minutes. 3. Cook rice and add edamame to the pot in the last 2 minutes. 4. Grill ${dinnerProtein} or bake at 200°C for 15–20 minutes, basting once with remaining glaze. 5. Steam pak choi or broccoli. 6. Plate: edamame rice, then ${dinnerProtein}, with greens on the side. Sprinkle sesame seeds.`,
      cal:goal==="lose"?420:560, pro:goal==="gain"?46:36, carb_:isKeto?7:50, fat:16,
      ing:isVegan?"aubergine, miso, edamame, rice":isKeto?`${dinnerProtein}, miso, pak choi`:`${dinnerProtein}, miso, edamame, rice` },
    { name: isVegan?"Moroccan chickpea & vegetable tagine":isKeto?`Moroccan spiced ${dinnerProtein} with cauliflower couscous`:`Moroccan spiced ${dinnerProtein} with ${dinnerCarb}`,
      desc: isVegan?"Slow-simmered chickpeas and root veg in a warming ras el hanout sauce.":isKeto?`${dinnerProtein} with Moroccan spices, served over cauliflower couscous.`:`${dinnerProtein} braised with Moroccan spices, apricots, and ${dinnerCarb}.`,
      steps: isVegan
        ? "1. Heat 1 tbsp olive oil in a large pan. Add 1 diced onion and cook 5 minutes. 2. Add 3 garlic cloves, 1 tsp ras el hanout (or 1 tsp cumin + ½ tsp cinnamon + ½ tsp ginger + ½ tsp turmeric). Stir 30 seconds. 3. Add 1 diced carrot, 1 diced sweet potato, and 1 diced courgette. Stir to coat in spices. 4. Add 1 can (400g) chopped tomatoes, 1 can drained chickpeas, and 150ml vegetable stock. 5. Bring to a boil, reduce heat and simmer 25 minutes until veg is very tender and sauce thick. 6. Stir in a handful of fresh coriander and a squeeze of lemon. 7. Serve over couscous or with warm flatbread."
        : isKeto
        ? `1. Season ${dinnerProtein} with: 1 tsp cumin, 1 tsp coriander, ½ tsp cinnamon, ½ tsp ginger, ½ tsp turmeric, salt, and pepper. 2. Heat 1 tbsp oil in a pan. Brown ${dinnerProtein} for 3–4 minutes each side. 3. Add 1 diced onion and cook 3 minutes. 4. Add 2 garlic cloves, a 400g tin of chopped tomatoes, and 150ml stock. 5. Simmer 20 minutes until sauce thickens. 6. Meanwhile, pulse cauliflower in a food processor until fine like couscous. 7. Fry cauliflower in 1 tsp butter for 3–4 minutes. Season. 8. Serve ${dinnerProtein} over cauliflower couscous. Scatter coriander.`
        : `1. Season ${dinnerProtein} with cumin, coriander, cinnamon, and ginger. 2. Brown in a hot pan with oil, 3 minutes each side. Remove. 3. In the same pan: sauté 1 diced onion, 3 garlic cloves 5 minutes. 4. Add 1 can tomatoes, 150ml stock, 6 dried apricots (chopped for sweetness), and a pinch of chilli. 5. Return ${dinnerProtein} to pan. Simmer 20 minutes. 6. Cook ${dinnerCarb} per packet. 7. Serve with coriander and toasted flaked almonds on top.`,
      cal:goal==="lose"?430:570, pro:goal==="gain"?44:34, carb_:isKeto?9:52, fat:16,
      ing:isVegan?"chickpeas, root veg, ras el hanout, couscous":isKeto?`${dinnerProtein}, Moroccan spices, cauliflower`:`${dinnerProtein}, ras el hanout, ${dinnerCarb}, apricots` },
    { name: isVegan?"Greek stuffed peppers with feta & herbed rice":isKeto?`${dinnerProtein} souvlaki skewers with tzatziki`:`Greek-style ${dinnerProtein} with lemon potatoes`,
      desc: isVegan?"Roasted peppers filled with herbed rice, feta, and pine nuts.":isKeto?`${dinnerProtein} skewers marinated Greek-style with tzatziki and Greek salad.`:`${dinnerProtein} marinated in lemon and oregano with garlicky roasted potatoes.`,
      steps: isVegan
        ? "1. Preheat oven to 190°C. 2. Halve 4 peppers and remove seeds. Place cut-side up in a baking dish. Drizzle with oil. Roast 15 minutes while you prep filling. 3. Cook 80g rice per packet. 4. Stir into cooked rice: handful of chopped parsley and mint, 2 tbsp toasted pine nuts, 60g crumbled feta, zest of ½ lemon, 1 tbsp olive oil. 5. Spoon rice filling generously into the par-roasted peppers. 6. Return to oven for 20 minutes until peppers are tender and filling is lightly golden. 7. Squeeze lemon over and serve."
        : isKeto
        ? `1. Make marinade: 3 tbsp olive oil, 2 tbsp lemon juice, 3 garlic cloves minced, 1 tsp dried oregano, salt, and pepper. 2. Cut ${dinnerProtein} into chunks and thread onto skewers. Coat in marinade. Leave 15 minutes. 3. Make tzatziki: grate ½ cucumber and squeeze out water. Mix with 150g Greek yoghurt, 1 garlic clove, 1 tbsp olive oil, fresh dill, salt, and lemon. 4. Grill skewers on a hot griddle for 4–5 minutes per side until charred and cooked through. 5. Serve with tzatziki, Greek salad (tomato, cucumber, olive, feta, red onion, olive oil, oregano), and lemon.`
        : `1. Preheat oven to 200°C. 2. Cut potatoes into wedges. Toss with olive oil, lemon juice, garlic powder, dried oregano, salt, and pepper. 3. Roast for 35–40 minutes until golden and crispy, turning once halfway. 4. Marinate ${dinnerProtein} in: olive oil, lemon juice, oregano, garlic — at least 15 minutes. 5. Grill or pan-sear for 4–6 minutes each side until cooked through and caramelised. 6. Serve ${dinnerProtein} alongside lemon potatoes and a simple Greek salad.`,
      cal:goal==="lose"?415:555, pro:goal==="gain"?45:35, carb_:isKeto?8:52, fat:18,
      ing:isVegan?"peppers, rice, feta, pine nuts":isKeto?`${dinnerProtein}, tzatziki, Greek salad`:`${dinnerProtein}, potatoes, lemon, oregano` },
    { name: isVegan?"Indian paneer & pea masala":isKeto?`${dinnerProtein} saag — creamy spinach curry`:`${dinnerProtein} butter masala with basmati`,
      desc: isVegan?"Paneer cubes in a rich tomato and pea masala sauce with basmati.":isKeto?`${dinnerProtein} simmered in creamy spinach sauce — keto-friendly Indian saag.`:`${dinnerProtein} in a buttery, creamy tomato masala with fragrant basmati rice.`,
      steps: isVegan
        ? "1. Cube 200g paneer. Fry in 1 tbsp oil until golden on both sides, 2–3 minutes. Remove. 2. In the same pan: fry 1 diced onion 5 minutes. Add 3 garlic cloves and 1 tsp grated ginger — cook 1 minute. 3. Add 1 tsp cumin, 1 tsp coriander, ½ tsp turmeric, ½ tsp garam masala — stir 30 seconds. 4. Add 1 can (400g) chopped tomatoes. Simmer 10 minutes. 5. Add 150g frozen peas. Cook 5 minutes. 6. Return paneer. Simmer gently 5 minutes. 7. Stir in 2 tbsp cream or coconut cream. Season. 8. Serve over basmati rice with coriander."
        : isKeto
        ? `1. Wash 300g fresh spinach. Blanch in boiling water 1 minute. Drain, cool, then blend to a smooth puree. 2. Heat 1 tbsp ghee or butter. Fry 1 diced onion until golden (7–8 minutes). 3. Add 3 garlic cloves, 1 tsp grated ginger. Fry 1 minute. 4. Add 1 tsp cumin, ½ tsp coriander, ½ tsp garam masala. Stir 30 seconds. 5. Add ${dinnerProtein} cut in chunks. Brown 3–4 minutes. 6. Pour in spinach puree and 100ml cream. Stir well. 7. Simmer on low for 15 minutes. 8. Season with salt and a squeeze of lemon. Serve with a dollop of cream and a pinch of garam masala.`
        : `1. Fry 1 diced onion in 1 tbsp butter or ghee for 7 minutes until golden. 2. Add 3 garlic cloves and 1 tsp grated ginger. Fry 1 minute. 3. Add 1 tsp cumin, 1 tsp coriander, ½ tsp turmeric, 1 tsp garam masala — stir 30 seconds. 4. Add 1 can (400g) chopped tomatoes and 1 tbsp tomato puree. Simmer 10 minutes. 5. Add ${dinnerProtein} cut into chunks. Simmer 15 minutes until cooked through. 6. Stir in 100ml double cream or coconut cream. 7. Simmer 5 more minutes until sauce is rich and thick. 8. Serve over basmati rice.`,
      cal:goal==="lose"?430:570, pro:goal==="gain"?46:36, carb_:isKeto?8:54, fat:20,
      ing:isVegan?"paneer, peas, tomatoes, masala spices":isKeto?`${dinnerProtein}, spinach, cream, spices`:`${dinnerProtein}, tomatoes, cream, basmati` },
    { name: isVegan?"Korean mushroom & tofu bulgogi rice":isKeto?`${dinnerProtein} gochujang stir-fry`:`${dinnerProtein} bulgogi with sesame noodles`,
      desc: isVegan?"King oyster mushrooms and tofu glazed in a sweet-savoury bulgogi marinade.":isKeto?`${dinnerProtein} in a spicy gochujang glaze with stir-fried cabbage and spinach.`:`${dinnerProtein} bulgogi over sesame-dressed noodles with spring onion and sesame.`,
      steps: isVegan
        ? "1. Make bulgogi marinade: 3 tbsp soy sauce, 1 tbsp sesame oil, 1 tbsp honey, 2 garlic cloves minced, 1 tsp grated ginger, ½ tsp black pepper. 2. Tear king oyster mushrooms into strips. Cube firm tofu. 3. Toss mushrooms and tofu in marinade — leave 10 minutes. 4. Cook 80g short-grain rice. 5. Heat a wok or wide pan on high. Fry mushrooms and tofu (keeping the marinade) for 5–6 minutes until golden and caramelised. 6. Pour remaining marinade in — it will bubble and thicken in 1 minute. 7. Serve over rice with shredded carrot, cucumber, and sesame seeds."
        : isKeto
        ? `1. Slice ${dinnerProtein} thinly. Mix gochujang marinade: 2 tbsp gochujang, 1 tbsp soy sauce, 1 tbsp sesame oil, 1 tbsp honey, 2 garlic cloves, 1 tsp ginger. Coat ${dinnerProtein}. 2. Shred ¼ cabbage. 3. Cook ${dinnerProtein} in a very hot pan 3–4 minutes each side until caramelised. 4. Remove, reduce heat. Fry cabbage and spinach in the same pan for 2–3 minutes. 5. Return ${dinnerProtein}. Toss everything together for 1 minute. 6. Serve topped with sesame seeds, spring onion, and a soft fried egg.`
        : `1. Make bulgogi marinade: 3 tbsp soy, 1 tbsp sesame oil, 1 tbsp honey, 3 garlic cloves, 1 tsp ginger, ½ pear grated (this tenderises meat — optional). 2. Slice ${dinnerProtein} very thinly. Marinate 20 minutes. 3. Cook noodles per packet. Drain and toss with sesame oil and a little soy. 4. Fry ${dinnerProtein} in a very hot pan — it should caramelise fast. Add remaining marinade for 1 minute. 5. Serve over sesame noodles. Top with spring onion, sesame seeds, and pickled cucumber.`,
      cal:goal==="lose"?420:565, pro:goal==="gain"?46:36, carb_:isKeto?8:52, fat:16,
      ing:isVegan?"mushrooms, tofu, bulgogi sauce, rice":isKeto?`${dinnerProtein}, gochujang, cabbage`:`${dinnerProtein}, bulgogi sauce, noodles, sesame` },
    { name: isVegan?"Lentil & sweet potato shepherd's pie":isKeto?`${dinnerProtein} & cauliflower shepherd's pie`:`${dinnerProtein} shepherd's pie with sweet potato mash`,
      desc: isVegan?"Hearty lentil and veg base topped with fluffy sweet potato mash.":isKeto?`${dinnerProtein} and veg base topped with creamy cauliflower mash.`:`Rich ${dinnerProtein} mince base topped with sweet potato mash and baked golden.`,
      steps: isVegan
        ? "1. Preheat oven to 190°C. 2. Heat 1 tbsp oil. Fry 1 diced onion, 2 garlic cloves, 1 diced carrot for 5 minutes. 3. Rinse 150g red or green lentils. Add to pan with 500ml vegetable stock, 1 tbsp tomato puree, 1 tsp thyme, 1 tsp rosemary, and salt. 4. Simmer 20 minutes until lentils are soft and most liquid absorbed. 5. Mash topping: peel and cube 2 sweet potatoes. Boil 15 minutes until very soft. Drain and mash with butter alternative, salt, and pepper. 6. Spoon lentil mixture into an ovenproof dish. Spread mash on top and rough up with a fork. 7. Bake 20–25 minutes until top is golden."
        : isKeto
        ? `1. Preheat oven to 190°C. 2. Fry 1 diced onion and 2 garlic cloves 4 minutes. Add ${dinnerProtein} mince and cook on high, breaking it up, until browned — 5–6 minutes. 3. Add 1 tbsp tomato puree, 150ml beef stock, ½ tsp thyme, salt, and pepper. Simmer 10 minutes. 4. Cauliflower mash: boil a small head of cauliflower florets 10 minutes until very soft. Drain well. Blend with 2 tbsp butter, 2 tbsp cream, salt, pepper, and a pinch of nutmeg until silky. 5. Transfer ${dinnerProtein} mixture to a baking dish. Top with cauliflower mash. Rake with a fork. 6. Bake 20 minutes until top is golden.`
        : `1. Preheat oven to 190°C. 2. Fry 1 diced onion, 2 garlic cloves, and 1 diced carrot 5 minutes. 3. Add ${dinnerProtein} mince and brown on high heat, breaking up — 5–6 minutes. 4. Add 1 tbsp tomato puree, 200ml stock, ½ tsp rosemary, ½ tsp thyme. Simmer 15 minutes. 5. Sweet potato mash: boil cubed sweet potato until soft, 12–15 minutes. Drain. Mash with butter, salt, and black pepper. 6. Pour mince into ovenproof dish. Spread mash on top, rough up surface. 7. Bake 25 minutes until golden on top.`,
      cal:goal==="lose"?440:580, pro:goal==="gain"?44:34, carb_:isKeto?9:56, fat:18,
      ing:isVegan?"lentils, sweet potato, root veg, stock":isKeto?`${dinnerProtein}, cauliflower, stock`:`${dinnerProtein}, sweet potato, root veg` },
    { name: isVegan?"Smoky black bean & corn chilli":isKeto?`${dinnerProtein} chilli verde — green chilli stew`:`${dinnerProtein} chilli con carne with ${dinnerCarb}`,
      desc: isVegan?"Slow-simmered black bean and sweetcorn chilli with smoked paprika and coriander.":isKeto?`${dinnerProtein} braised with green chillies, jalapeños, and tomatillos.`:`Rich ${dinnerProtein} chilli con carne with kidney beans and ${dinnerCarb}.`,
      steps: isVegan
        ? "1. Heat 1 tbsp oil. Add 1 diced onion and 3 garlic cloves — cook 5 minutes. 2. Add: 1 tsp smoked paprika, 1 tsp cumin, ½ tsp chilli powder, ½ tsp oregano — stir 30 seconds. 3. Add 2 cans (800g) black beans (drained), 1 can (400g) chopped tomatoes, 1 cup sweetcorn, and 200ml vegetable stock. 4. Stir well, bring to a boil. 5. Reduce heat and simmer 25 minutes, stirring occasionally, until thick. 6. Stir in a big squeeze of lime juice and a handful of coriander. 7. Serve over brown rice. Top with avocado, jalapeños, and plant yoghurt instead of sour cream."
        : isKeto
        ? `1. In a large pan, brown ${dinnerProtein} in chunks with oil over high heat — 5 minutes. Remove. 2. Fry 1 diced onion and 3 garlic cloves 4 minutes. 3. Add 3 diced jalapeños, ½ tsp cumin, ½ tsp oregano. 4. Return ${dinnerProtein}. Add 300ml chicken stock and a can of green tomatillos (or green chopped tomatoes). 5. Simmer uncovered 30 minutes until ${dinnerProtein} is tender and sauce thickens. 6. Taste and adjust salt. 7. Serve with sour cream, grated cheese, and coriander — no rice needed.`
        : `1. Heat 1 tbsp oil. Brown ${dinnerProtein} mince on high — 6 minutes. 2. Add 1 diced onion, 3 garlic cloves, 1 diced red pepper — cook 4 minutes. 3. Add 1 tbsp smoked paprika, 1 tsp cumin, ½ tsp chilli — stir. 4. Add 1 can (400g) chopped tomatoes, 1 can kidney beans (drained), 150ml stock, 1 tbsp tomato puree. 5. Simmer 25–30 minutes until thick. 6. Season with salt, a square of dark chocolate (secret ingredient), and lime juice. 7. Serve over ${isGF?"rice":"rice or with wholegrain bread"}.`,
      cal:goal==="lose"?430:570, pro:goal==="gain"?45:35, carb_:isKeto?8:54, fat:17,
      ing:isVegan?"black beans, sweetcorn, tomatoes, spices":isKeto?`${dinnerProtein}, green chilli, stock`:`${dinnerProtein}, kidney beans, tomatoes, ${dinnerCarb}` },
  ];

  // ── 4 snack variants (cycle) ──────────────────────────────────────────────
  const snacks = [
    { name: isVegan?(isNutFree?"Apple with sunflower seed butter":"Apple with almond butter"):isKeto?"Cheese & olives":goal==="gain"?"Protein shake with banana":"Hummus with veggie sticks",
      desc: isKeto?"Low-carb snack that keeps energy stable.":goal==="gain"?"Quick protein hit to support muscle recovery.":"Hummus with carrot, cucumber, and celery sticks.",
      steps: isVegan
        ? `1. Wash and core the apple, slice into thin wedges. 2. Spoon 1–2 tbsp ${isNutFree?"sunflower seed":"almond"} butter into a small bowl. 3. Arrange apple slices around the bowl for dipping. 4. Optional: sprinkle a pinch of cinnamon over the nut butter.`
        : isKeto
        ? "1. Slice 30–40g of hard cheese (cheddar or gouda) into cubes. 2. Measure out a small handful of olives. 3. Arrange on a plate. 4. Eat slowly — this snack is calorie-dense so enjoy it mindfully."
        : goal==="gain"
        ? "1. Add 1 scoop protein powder to a blender or shaker. 2. Add 300ml milk and 1 ripe banana broken into chunks. 3. Blend until smooth (about 20–30 seconds). 4. Drink within 30 minutes of preparing."
        : "1. Peel and cut 1 carrot into batons. 2. Cut ¼ cucumber into sticks. 3. Cut 2 celery stalks into sticks. 4. Spoon 4 tbsp hummus into a small bowl. 5. Arrange veg sticks around the bowl and dip.",
      cal:isKeto?220:goal==="gain"?280:160, pro:isKeto?10:goal==="gain"?28:6, carb_:isKeto?3:goal==="gain"?30:18, fat:isKeto?19:goal==="gain"?6:8,
      ing:isVegan?"apple, nut butter":isKeto?"cheese, olives":goal==="gain"?"protein powder, banana":"hummus, carrot, cucumber" },
    { name: isVegan?(isNutFree?"Rice cakes with hummus":"Celery & peanut butter"):isKeto?"Boiled eggs with sea salt":goal==="gain"?"Oat bar with nut butter":`Banana with ${isNutFree?"seed butter":"peanut butter"}`,
      desc: isVegan?(isNutFree?"Rice cakes with hummus and cucumber.":"Celery sticks with peanut butter."):isKeto?"Protein-packed boiled eggs with sea salt.":goal==="gain"?"Dense oat bar with nut butter for extra calories.":"A banana with nut butter — simple and satisfying.",
      steps: isVegan
        ? isNutFree
          ? "1. Lay 3–4 rice cakes on a plate. 2. Spread 1–2 tbsp hummus on each. 3. Slice some cucumber into rounds and place on top. 4. Optional: sprinkle with smoked paprika."
          : "1. Wash and cut celery stalks into 10cm sticks. 2. Spoon peanut butter into a small pot. 3. Dip and eat — that's it. Add raisins on top for an 'ants on a log' effect."
        : isKeto
        ? "1. Bring a small pot of water to the boil. 2. Lower in 2–3 eggs gently using a spoon. 3. Boil for exactly 7 minutes for a firm yolk. 4. Transfer immediately to a bowl of cold water — leave 5 minutes. 5. Peel under running cold water for easiest peeling. 6. Slice in half and sprinkle with sea salt flakes."
        : goal==="gain"
        ? "1. Place 1 pre-made or shop-bought oat bar on a plate. 2. Spread 1 tbsp nut butter (almond, peanut, or cashew) generously on top. 3. Optional: add a drizzle of honey. 4. Eat within 30 minutes of training for best effect."
        : `1. Peel a ripe banana and place on a plate. 2. Scoop 1–2 tbsp ${isNutFree?"seed":"peanut"} butter alongside it. 3. Break or slice the banana and dip into the nut butter as you eat.`,
      cal:isKeto?140:goal==="gain"?310:200, pro:isKeto?12:goal==="gain"?12:8, carb_:isKeto?1:goal==="gain"?38:28, fat:isKeto?10:goal==="gain"?14:7,
      ing:isVegan?"rice cakes, hummus":isKeto?"eggs":goal==="gain"?"oat bar, nut butter":"banana, nut butter" },
    { name: isVegan?(isNutFree?"Dried fruit & seed mix":"Trail mix & dried fruit"):isKeto?"Avocado & smoked salmon bites":goal==="gain"?"Rice cakes with tuna & avocado":"Mango & chia smoothie",
      desc: isVegan?(isNutFree?"Dried fruit with seeds and dark chocolate chips.":"Mixed nuts, seeds, and dried berries."):isKeto?"Avocado slices with smoked salmon and lemon.":goal==="gain"?"Rice cakes with tinned tuna and sliced avocado.":"Blended mango, banana, and chia with plant milk.",
      steps: isVegan
        ? isNutFree
          ? "1. Measure out 20g dried cranberries or raisins. 2. Add 1 tbsp pumpkin seeds and 1 tbsp sunflower seeds. 3. Add a few dark chocolate chips. 4. Mix together in a small bag or pot — great as a portable snack."
          : "1. Measure out a 30g portion of mixed nuts (almonds, cashews, walnuts). 2. Add 20g dried berries (cranberries, blueberries, or raisins). 3. Optional: add 2–3 dark chocolate chips. 4. Mix together and eat."
        : isKeto
        ? "1. Halve and destone an avocado. Scoop flesh out and slice. 2. Lay smoked salmon slices on a board. 3. Place avocado slices alongside. 4. Squeeze lemon juice over the avocado (stops browning and adds flavour). 5. Season with black pepper and flaky sea salt."
        : goal==="gain"
        ? "1. Drain a small tin of tuna (in spring water). 2. Halve and slice an avocado. 3. Lay 3–4 rice cakes on a plate. 4. Top each with tuna. 5. Add avocado slices on top. 6. Season with salt, pepper, and a squeeze of lemon."
        : "1. Add 100g frozen mango chunks and half a banana to a blender. 2. Pour in 250ml plant milk. 3. Add 1 tsp chia seeds. 4. Blend 30–40 seconds until smooth. 5. Pour into a glass and drink immediately.",
      cal:isKeto?230:goal==="gain"?290:190, pro:isKeto?14:goal==="gain"?22:5, carb_:isKeto?4:goal==="gain"?34:32, fat:isKeto?18:goal==="gain"?10:4,
      ing:isVegan?isNutFree?"dried fruit, seeds":"mixed nuts, dried berries":isKeto?"avocado, smoked salmon":goal==="gain"?"rice cakes, tuna, avocado":"mango, banana, chia" },
    { name: isVegan?"Edamame with sea salt":isKeto?"Pepperoni & cheese roll-ups":goal==="gain"?"Protein shake with banana":"Greek yoghurt with seeds",
      desc: isVegan?"Warm edamame beans with sea salt — protein-packed and portable.":isKeto?"Pepperoni wrapped around mozzarella — zero carbs, high protein.":goal==="gain"?"Quick protein hit to support muscle recovery.":"High-protein snack to keep you full.",
      steps: isVegan
        ? "1. Place frozen edamame in a bowl. 2. Cover with boiling water and leave for 3 minutes. 3. Drain well. 4. Sprinkle generously with sea salt flakes. 5. Eat by squeezing the beans out of the pods — discard the pods."
        : isKeto
        ? "1. Lay out 6–8 slices of pepperoni on a board. 2. Place a small cube or slice of mozzarella on each. 3. Roll the pepperoni tightly around the cheese. 4. Secure with a cocktail stick if needed. 5. Eat immediately — or refrigerate for up to 12 hours."
        : goal==="gain"
        ? "1. Add 1 scoop protein powder to a blender or shaker. 2. Add 300ml milk and 1 ripe banana broken into chunks. 3. Blend until smooth. 4. Drink within 30 minutes of preparing."
        : "1. Scoop 150g Greek yoghurt into a bowl. 2. Drizzle 1 tsp honey over the top. 3. Sprinkle 1 tbsp mixed seeds (pumpkin, sunflower, chia). 4. Stir once and enjoy.",
      cal:isKeto?200:goal==="gain"?280:190, pro:isKeto?12:goal==="gain"?28:16, carb_:isKeto?2:goal==="gain"?30:16, fat:isKeto?16:goal==="gain"?6:6,
      ing:isVegan?"edamame":isKeto?"pepperoni, mozzarella":goal==="gain"?"protein powder, banana":"Greek yoghurt, seeds" },
    { name: isVegan?(isNutFree?"Medjool dates & oat balls":"Dark chocolate & mixed nuts"):isKeto?"Cream cheese & cucumber slices":"Cottage cheese & pineapple",
      desc: isVegan?(isNutFree?"No-bake oat energy balls with dates.":"A handful of nuts with dark chocolate."):isKeto?"Cream cheese dolloped onto cucumber rounds.":"Creamy cottage cheese with pineapple — sweet and high protein.",
      steps: isVegan
        ? isNutFree
          ? "1. Blend 4 pitted dates in a food processor until paste-like. 2. Mix with 40g oats and 1 tsp cinnamon. 3. Roll into small balls. 4. Refrigerate 15 minutes until firm. 5. Store in an airtight container for up to 5 days."
          : "1. Measure out a small portion of mixed nuts (almonds, walnuts, cashews — about 20g). 2. Break 1–2 squares of 70%+ dark chocolate into pieces. 3. Combine in a small bowl or zip bag. 4. Eat as a mid-afternoon treat."
        : isKeto
        ? "1. Slice half a cucumber into thick rounds. 2. Spoon a small teaspoon of cream cheese onto each round. 3. Add a pinch of sea salt and fresh dill or chives. 4. Arrange on a plate and eat immediately."
        : "1. Spoon 150g cottage cheese into a bowl. 2. Add 80g fresh or tinned pineapple chunks. 3. Drizzle with a little honey if desired. 4. Mix gently and eat cold.",
      cal:isKeto?130:goal==="gain"?240:175, pro:isKeto?4:goal==="gain"?20:18, carb_:isKeto?3:goal==="gain"?26:20, fat:isKeto?12:goal==="gain"?8:5,
      ing:isVegan?isNutFree?"dates, oats":"dark chocolate, nuts":isKeto?"cream cheese, cucumber":"cottage cheese, pineapple" },
    { name: isVegan?"Roasted chickpeas":isKeto?"Hard boiled egg & avocado":goal==="gain"?"Tuna & crackers":"Apple & cheddar slices",
      desc: isVegan?"Crispy roasted chickpeas with smoked paprika and sea salt.":isKeto?"Half an avocado with a hard-boiled egg and sea salt.":goal==="gain"?"Protein-rich tuna on oat crackers.":"Sliced apple with cheddar — sweet, salty and satisfying.",
      steps: isVegan
        ? "1. Drain and rinse a tin of chickpeas. Dry very thoroughly on paper towels — moisture is the enemy of crunch. 2. Toss with 1 tbsp olive oil, 1 tsp smoked paprika, sea salt, and garlic powder. 3. Spread in a single layer on a baking tray. 4. Roast at 200°C for 25–30 minutes, shaking halfway, until golden and crunchy. 5. Cool before eating — they crisp up more as they cool."
        : isKeto
        ? "1. Boil 1–2 eggs for 7 minutes for firm yolk. Cool in cold water and peel. 2. Halve an avocado and remove the stone. 3. Place egg alongside avocado. 4. Season with sea salt, pepper, and a pinch of chilli flakes."
        : goal==="gain"
        ? "1. Drain a tin of tuna in spring water. 2. Season with a little lemon juice and black pepper. 3. Spoon generously onto oatcakes or wholegrain crackers. 4. Eat as a high-protein mid-afternoon snack."
        : "1. Core and slice an apple into thin wedges. 2. Cut 30g cheddar into thin slices. 3. Arrange on a plate, alternating apple and cheese. 4. Eat together — the combination of sweet and salty is very satisfying.",
      cal:isKeto?260:goal==="gain"?220:180, pro:isKeto?14:goal==="gain"?24:8, carb_:isKeto?5:goal==="gain"?14:26, fat:isKeto?21:goal==="gain"?6:8,
      ing:isVegan?"chickpeas, paprika":isKeto?"eggs, avocado":goal==="gain"?"tuna, crackers":"apple, cheddar" },
    { name: isVegan?(isNutFree?"Rice cakes with avocado":"Peanut butter & banana rice cakes"):isKeto?"Olives & feta":"Smoked salmon & cucumber rounds",
      desc: isVegan?(isNutFree?"Avocado mashed on rice cakes with lemon and chilli.":"Rice cakes with peanut butter and banana slices."):isKeto?"A small plate of olives and crumbled feta cheese.":"Cucumber rounds topped with cream cheese and smoked salmon.",
      steps: isVegan
        ? isNutFree
          ? "1. Halve and mash half an avocado with a fork. 2. Add a squeeze of lemon juice, pinch of chilli flakes, and salt. 3. Spread onto 2–3 rice cakes. 4. Eat immediately."
          : "1. Lay out 2–3 rice cakes. 2. Spread 1 tbsp peanut butter on each. 3. Slice half a banana and arrange on top. 4. Optional: drizzle with a little honey."
        : isKeto
        ? "1. Measure out a small handful of mixed olives. 2. Crumble 30g feta cheese alongside. 3. Add a drizzle of olive oil. 4. Eat as a leisurely afternoon snack."
        : "1. Cut ½ cucumber into thick rounds. 2. Spread a small amount of cream cheese on each. 3. Top with a piece of smoked salmon. 4. Squeeze a little lemon over the top. 5. Season with black pepper and eat immediately.",
      cal:isKeto?180:goal==="gain"?240:160, pro:isKeto?6:goal==="gain"?18:12, carb_:isKeto?4:goal==="gain"?30:10, fat:isKeto?16:goal==="gain"?8:9,
      ing:isVegan?isNutFree?"avocado, rice cakes":"rice cakes, peanut butter, banana":isKeto?"olives, feta":"smoked salmon, cucumber" },
  ];

  // ── Deduplication: pick snack that shares no key ingredients with breakfast, lunch, or dinner
  function keyWords(ingStr) {
    return ingStr.toLowerCase().split(/[,\s]+/).filter(w => w.length > 3);
  }
  const bf  = breakfasts[d % breakfasts.length];
  const lun = lunches[d % lunches.length];
  const din = dinners[d % dinners.length];

  const usedWords = new Set([
    ...keyWords(bf.ing),
    ...keyWords(lun.ing),
    ...keyWords(din.ing),
  ]);

  // Try each snack starting from d % snacks.length; pick first with no ingredient clash
  let snk = null;
  for (let i = 0; i < snacks.length; i++) {
    const candidate = snacks[(d + i) % snacks.length];
    const candidateWords = keyWords(candidate.ing);
    const hasConflict = candidateWords.some(w => usedWords.has(w));
    if (!hasConflict) { snk = candidate; break; }
  }
  // Fallback: if all snacks share something (unlikely), just use rotated index
  if (!snk) snk = snacks[d % snacks.length];

  return [
    { icon:"🌅", type:"Breakfast",    time:"7–8am",            name:bf.name,  description:bf.desc,  calories:bf.cal,  protein:bf.pro,  carbs:bf.carb_,  fat:bf.fat,  ingredients:bf.ing,  steps:bf.steps  },
    { icon:"☀️", type:"Lunch",        time:"12–1pm",           name:lun.name, description:lun.desc, calories:lun.cal, protein:lun.pro, carbs:lun.carb_, fat:lun.fat, ingredients:lun.ing, steps:lun.steps },
    { icon:"🌙", type:"Dinner",       time:"6–7pm",            name:din.name, description:din.desc, calories:din.cal, protein:din.pro, carbs:din.carb_, fat:din.fat, ingredients:din.ing, steps:din.steps },
    { icon:"🍎", type:"Snack",        time:"3–4pm",            name:snk.name, description:snk.desc, calories:snk.cal, protein:snk.pro, carbs:snk.carb_, fat:snk.fat, ingredients:snk.ing, steps:snk.steps },
  ];
}

// ── NEARBY STORES ─────────────────────────────────────────────────────────────
window.findNearbyStores = function() {
  const el = document.getElementById("storeResults");
  if (!el) return;

  // Two-column layout: shopping tips left, store types right
  el.innerHTML = `
    <div class="store-panel-grid">
      <div class="store-panel-tips">
        <div class="store-panel-label">💡 Smart Shopping</div>
        <ul class="store-fact-list">
          <li>🌿 <strong>Seasonal produce</strong> is 30–50% cheaper and far more nutritious — ask what's in season.</li>
          <li>🧊 <strong>Bulk & freeze protein</strong> (chicken, fish, mince) to cut weekly spend by up to 30%.</li>
          <li>🥫 <strong>Staples on sale</strong> — stock rice, oats, lentils and pasta when prices drop. Long shelf life.</li>
          <li>📋 <strong>List discipline</strong> — impulse buys account for 20–30% of most grocery bills. Eat first.</li>
          <li>🏷️ <strong>Unit price</strong> beats pack price. Generic brands for staples save 15–25% vs name brands.</li>
          <li>⏰ <strong>Evening discounts</strong> — supermarkets mark down fresh meat and fish 1–2 hours before closing.</li>
        </ul>
      </div>
      <div class="store-panel-types">
        <div class="store-panel-label">🏪 Where to Shop</div>
        <div class="store-type-list">
          <div class="store-type-row">
            <span class="store-type-icon">🏬</span>
            <div><strong>Supermarket</strong><br><span>Best for: bulk buys, dairy, grains, frozen, sauces</span></div>
          </div>
          <div class="store-type-row">
            <span class="store-type-icon">🧺</span>
            <div><strong>Farmers Market</strong><br><span>Best for: seasonal veg, local eggs, fresh herbs, honey</span></div>
          </div>
          <div class="store-type-row">
            <span class="store-type-icon">🥩</span>
            <div><strong>Butcher</strong><br><span>Best for: quality cuts, bulk meat, advice on portions</span></div>
          </div>
          <div class="store-type-row">
            <span class="store-type-icon">🌱</span>
            <div><strong>Health Food Store</strong><br><span>Best for: specialty diets, bulk nuts/seeds, protein powders</span></div>
          </div>
        </div>
        <div id="storeLocLinks"></div>
      </div>
    </div>`;

  // Inject location-based map links into the right panel
  const linksEl = document.getElementById("storeLocLinks");
  if (navigator.geolocation && linksEl) {
    linksEl.innerHTML = `<p class="store-msg" style="margin-top:12px">📍 Detecting location for nearby stores…</p>`;
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude: lat, longitude: lng } = pos.coords;
        linksEl.innerHTML = `
          <div class="store-links" style="margin-top:12px">
            <a class="btn-store-link" href="https://www.google.com/maps/search/supermarket/@${lat},${lng},14z" target="_blank" rel="noopener">🏬 Supermarkets</a>
            <a class="btn-store-link" href="https://www.google.com/maps/search/farmers+market/@${lat},${lng},14z" target="_blank" rel="noopener">🧺 Farmers Markets</a>
            <a class="btn-store-link" href="https://www.google.com/maps/search/butcher/@${lat},${lng},14z" target="_blank" rel="noopener">🥩 Butchers</a>
            <a class="btn-store-link" href="https://www.google.com/maps/search/health+food+store/@${lat},${lng},14z" target="_blank" rel="noopener">🌱 Health Stores</a>
          </div>`;
      },
      () => {
        if (linksEl) linksEl.innerHTML = `<p class="store-msg store-error" style="margin-top:8px;font-size:12px">📍 Location denied — allow access to find stores near you.</p>`;
      }
    );
  }
};

// ── INIT ──────────────────────────────────────────────────────────────────────
function initApp() {
  // Dynamic tag inputs — runs harmlessly on pages without the elements
  try { initDynamicInputs(); } catch(e) { console.warn("initDynamicInputs error:", e); }

  // ── Dashboard page ─────────────────────────────────────────────────────────
  if (document.getElementById("goal")) {
    // Wire calorie estimate updates
    ["heightValue","weightValue","heightUnit","weightUnit","goal"].forEach(id => {
      document.getElementById(id)?.addEventListener("input",  updateCalorieEstimate);
      document.getElementById(id)?.addEventListener("change", updateCalorieEstimate);
    });
    document.getElementById("fitnessLevelText")?.addEventListener("input", updateDetectedLevel);

    // Restore last-used profile into the form (skip if we just generated)
    try {
      const saved = getData("planProfile");
      const justGen = sessionStorage.getItem("fs_justGenerated");
      sessionStorage.removeItem("fs_justGenerated");
      if (saved && !justGen) restoreProfile(saved);
    } catch(e) { console.warn("restoreProfile error:", e); }

    // Initial calorie estimate if height/weight already filled
    updateCalorieEstimate();
  }

  // ── Schedule page ──────────────────────────────────────────────────────────
  if (document.getElementById("schedGrid")) {
    try { initSchedulePage(); } catch(e) {
      console.error("initSchedulePage error:", e);
      const grid = document.getElementById("schedGrid");
      if (grid) grid.innerHTML = `<div class="sched-empty"><span>⚠️</span><p>Could not load your plan. <a href="dashboard.html">Return to the planner</a>.</p></div>`;
    }
  }

  // Meals page dietary sync handled by inline script in meals.html via getActiveDietaryPrefs()
}

document.addEventListener("DOMContentLoaded", initApp);
