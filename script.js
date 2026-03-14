const STORAGE_KEY = "cj.entries.v1";
const THEME_STORAGE_KEY = "cj.theme.v1";
const SOUND_STORAGE_KEY = "cj.sound.v1";

const MORNING_AFFIRMATIONS = [
  "I am brave and I can try new things.",
  "Today is going to be a good day.",
  "I am a good friend.",
  "My ideas matter.",
  "I can ask for help when I need it.",
  "I am kind and that makes a difference.",
  "Every day I get a little better at things.",
  "I'm going to do my best today.",
  "I am proud of who I am.",
  "Today I'll be a good listener and a good helper.",
];

const NIGHT_AFFIRMATIONS = [
  "I did my best today, and that's enough.",
  "I'm proud of what I did today.",
  "Tomorrow is a new chance to try.",
  "I am learning and growing every day.",
  "I was kind today.",
  "It's okay to rest. I deserve it.",
  "I'm getting braver every day.",
  "I am loved and I matter.",
  "Today I tried, and that's what counts.",
  "I'm going to sleep well and wake up ready.",
];

// Fun, bright kid-craft photos (one per day, cycles by day-of-month). Pexels/Unsplash license.
const CRAFT_OF_DAY_IMAGES = [
  { url: "https://images.pexels.com/photos/8014345/pexels-photo-8014345.jpeg?auto=compress&cs=tinysrgb&w=400", alt: "Rainbow clay craft" },
  { url: "https://images.pexels.com/photos/7054789/pexels-photo-7054789.jpeg?auto=compress&cs=tinysrgb&w=400", alt: "Colorful pencils" },
  { url: "https://images.pexels.com/photos/2078147/pexels-photo-2078147.jpeg?auto=compress&cs=tinysrgb&w=400", alt: "Bright crayons" },
  { url: "https://images.pexels.com/photos/3755511/pexels-photo-3755511.jpeg?auto=compress&cs=tinysrgb&w=400", alt: "Drawing and creating" },
  { url: "https://images.pexels.com/photos/159825/pexels-photo-159825.jpeg?auto=compress&cs=tinysrgb&w=400", alt: "Colorful art supplies" },
  { url: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&q=80", alt: "Fun art supplies" },
  { url: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&q=80", alt: "Paper craft fun" },
  { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", alt: "Painting and brushes" },
  { url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80", alt: "Crayons and drawing" },
  { url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&q=80", alt: "Colored pencils craft" },
  { url: "https://images.unsplash.com/photo-1493106540698-239f134ba3d2?w=400&q=80", alt: "Watercolor fun" },
  { url: "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?w=400&q=80", alt: "Paper and scissors craft" },
  { url: "https://images.pexels.com/photos/8014345/pexels-photo-8014345.jpeg?auto=compress&cs=tinysrgb&w=400", alt: "Rainbow craft idea" },
  { url: "https://images.pexels.com/photos/7054789/pexels-photo-7054789.jpeg?auto=compress&cs=tinysrgb&w=400", alt: "Creative coloring" },
  { url: "https://images.pexels.com/photos/2078147/pexels-photo-2078147.jpeg?auto=compress&cs=tinysrgb&w=400", alt: "Craft time" },
  { url: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&q=80", alt: "Exciting craft supplies" },
  { url: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&q=80", alt: "Paper craft project" },
  { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", alt: "Paint and create" },
  { url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80", alt: "Drawing fun" },
  { url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&q=80", alt: "Colorful craft" },
  { url: "https://images.unsplash.com/photo-1493106540698-239f134ba3d2?w=400&q=80", alt: "Art project" },
  { url: "https://images.pexels.com/photos/8014345/pexels-photo-8014345.jpeg?auto=compress&cs=tinysrgb&w=400", alt: "Rainbow clay fun" },
  { url: "https://images.pexels.com/photos/3755511/pexels-photo-3755511.jpeg?auto=compress&cs=tinysrgb&w=400", alt: "Making something cool" },
  { url: "https://images.pexels.com/photos/7054789/pexels-photo-7054789.jpeg?auto=compress&cs=tinysrgb&w=400", alt: "Bright craft idea" },
  { url: "https://images.pexels.com/photos/2078147/pexels-photo-2078147.jpeg?auto=compress&cs=tinysrgb&w=400", alt: "Fun with crayons" },
  { url: "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?w=400&q=80", alt: "Cut and paste craft" },
  { url: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=400&q=80", alt: "Creative drawing" },
  { url: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&q=80", alt: "Paint project" },
  { url: "https://images.unsplash.com/photo-1601564267677-a36d0ec94f10?w=400&q=80", alt: "Kids art project" },
  { url: "https://images.pexels.com/photos/159825/pexels-photo-159825.jpeg?auto=compress&cs=tinysrgb&w=400", alt: "Colorful art" },
  { url: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&q=80", alt: "Today’s craft idea" },
];

// Craft of the week: one per Sun–Sat week (new craft every Sunday). Fun, bright kid crafts. Pexels/Unsplash license.
const CRAFT_OF_THE_WEEK_IMAGES = [
  { url: "https://images.pexels.com/photos/8014345/pexels-photo-8014345.jpeg?auto=compress&cs=tinysrgb&w=400", alt: "This week’s craft: rainbow clay" },
  { url: "https://images.pexels.com/photos/7054789/pexels-photo-7054789.jpeg?auto=compress&cs=tinysrgb&w=400", alt: "This week’s craft: colorful pencils" },
  { url: "https://images.pexels.com/photos/2078147/pexels-photo-2078147.jpeg?auto=compress&cs=tinysrgb&w=400", alt: "This week’s craft: bright crayons" },
  { url: "https://images.pexels.com/photos/3755511/pexels-photo-3755511.jpeg?auto=compress&cs=tinysrgb&w=400", alt: "This week’s craft: drawing and creating" },
  { url: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&q=80", alt: "This week’s craft idea" },
  { url: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&q=80", alt: "This week’s craft: paper fun" },
  { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", alt: "This week’s craft: painting" },
  { url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80", alt: "This week’s craft: crayons and drawing" },
  { url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&q=80", alt: "This week’s craft: colored pencils" },
  { url: "https://images.unsplash.com/photo-1493106540698-239f134ba3d2?w=400&q=80", alt: "This week’s craft: watercolor" },
];

const els = {
  calendarGrid: document.getElementById("calendarGrid"),
  monthLabel: document.getElementById("monthLabel"),
  prevMonthBtn: document.getElementById("prevMonthBtn"),
  nextMonthBtn: document.getElementById("nextMonthBtn"),
  selectedDateText: document.getElementById("selectedDateText"),
  starsThisWeek: document.getElementById("starsThisWeek"),
  todayStatus: document.getElementById("todayStatus"),
  saveStatus: document.getElementById("saveStatus"),

  morningTab: document.getElementById("morningTab"),
  nightTab: document.getElementById("nightTab"),
  morningCompleteBadge: document.getElementById("morningCompleteBadge"),
  nightCompleteBadge: document.getElementById("nightCompleteBadge"),
  morningPage: document.getElementById("morningPage"),
  nightPage: document.getElementById("nightPage"),
  pageFlip: document.getElementById("pageFlip"),

  goalsToday: document.getElementById("goalsToday"),
  lookingForwardTo: document.getElementById("lookingForwardTo"),
  needToDoToday: document.getElementById("needToDoToday"),
  craftDescription: document.getElementById("craftDescription"),
  craftImagePreview: document.getElementById("craftImagePreview"),
  craftHint: document.getElementById("craftHint"),
  craftImageInput: document.getElementById("craftImageInput"),
  removeCraftImageBtn: document.getElementById("removeCraftImageBtn"),
  craftOfDayImage: document.getElementById("craftOfDayImage"),
  craftOfWeekImage: document.getElementById("craftOfWeekImage"),

  revealAffirmationBtn: document.getElementById("revealAffirmationBtn"),
  affirmationText: document.getElementById("affirmationText"),
  revealNightAffirmationBtn: document.getElementById("revealNightAffirmationBtn"),
  nightAffirmationText: document.getElementById("nightAffirmationText"),

  gratefulFor: document.getElementById("gratefulFor"),
  madeMeHappy: document.getElementById("madeMeHappy"),
  betterTomorrow: document.getElementById("betterTomorrow"),
  madeTodayBetter: document.getElementById("madeTodayBetter"),

  saveMorningBtn: document.getElementById("saveMorningBtn"),
  saveNightBtn: document.getElementById("saveNightBtn"),
  flipToNightBtn: document.getElementById("flipToNightBtn"),
  flipToMorningBtn: document.getElementById("flipToMorningBtn"),
  soundToggleBtn: document.getElementById("soundToggleBtn"),
  celebrationOverlay: document.getElementById("celebrationOverlay"),
};

let viewYear;
let viewMonthIndex;
let selectedDate;
let currentCraftImageDataUrl = "";
let soundOn = true;
let audioCtx = null;
let trailType = "star";
let draggingSticker = null;
let lastTrailTime = 0;

function pad2(n) {
  return String(n).padStart(2, "0");
}

function toISODate(d) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

/** Week runs Sunday–Saturday. Returns the Sunday of the week containing d. */
function getWeekSunday(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() - d.getDay());
}

/** Index for craft-of-the-week (same week = same craft; new week every Sunday). */
function getCraftOfWeekIndex(d) {
  const sunday = getWeekSunday(d);
  const weekEpoch = Math.floor(sunday.getTime() / (7 * 24 * 60 * 60 * 1000));
  return weekEpoch % CRAFT_OF_THE_WEEK_IMAGES.length;
}

function fromISODate(iso) {
  const [y, m, d] = iso.split("-").map((x) => Number(x));
  return new Date(y, m - 1, d);
}

function formatLongDate(d) {
  const weekday = d.toLocaleDateString(undefined, { weekday: "long" });
  const month = d.toLocaleDateString(undefined, { month: "long" });
  return `${weekday}, ${month} ${d.getDate()}, ${d.getFullYear()}`;
}

function loadAllEntries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function saveAllEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function getEntry(entries, iso) {
  if (!entries[iso]) {
    entries[iso] = {
      morning: {
        goalsToday: "",
        lookingForwardTo: "",
        needToDoToday: "",
        craftDescription: "",
        craftImageDataUrl: "",
      },
      night: {
        gratefulFor: "",
        madeMeHappy: "",
        betterTomorrow: "",
        madeTodayBetter: "",
      },
      affirmation: "",
      nightAffirmation: "",
      starAwarded: false,
      updatedAt: Date.now(),
    };
  }
  return entries[iso];
}

function isFilled(s) {
  return typeof s === "string" && s.trim().length > 0;
}

function isMorningComplete(entry) {
  const m = entry.morning || {};
  return isFilled(m.goalsToday) && isFilled(m.lookingForwardTo) && isFilled(m.needToDoToday);
}

function isNightComplete(entry) {
  const n = entry.night || {};
  return (
    isFilled(n.gratefulFor) &&
    isFilled(n.madeMeHappy) &&
    isFilled(n.betterTomorrow) &&
    isFilled(n.madeTodayBetter)
  );
}

function startOfWeekMonday(d) {
  const date = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const jsDay = date.getDay(); // 0 Sun ... 6 Sat
  const offset = (jsDay + 6) % 7; // 0 for Mon ... 6 for Sun
  date.setDate(date.getDate() - offset);
  return date;
}

function countStarsForWeek(entries, anyDateInWeek) {
  const start = startOfWeekMonday(anyDateInWeek);
  let count = 0;
  for (let i = 0; i < 7; i += 1) {
    const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    const iso = toISODate(d);
    if (entries[iso]?.starAwarded) count += 1;
  }
  return count;
}

function setSaveStatus(text) {
  els.saveStatus.textContent = text || "";
}

function getAudioContext() {
  if (audioCtx) return audioCtx;
  const Ctor = window.AudioContext || window.webkitAudioContext;
  if (!Ctor) return null;
  audioCtx = new Ctor();
  return audioCtx;
}

function playTone(frequency, durationMs, type = "sine", gainLevel = 0.12) {
  if (!soundOn) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = frequency;
  gain.gain.value = gainLevel;
  osc.connect(gain);
  gain.connect(ctx.destination);
  const now = ctx.currentTime;
  osc.start(now);
  osc.stop(now + durationMs / 1000);
}

function playFlipSound() {
  // Soft page-turn style: low whoosh + quick higher swish
  playTone(260, 90, "sine", 0.06);
  setTimeout(() => playTone(420, 120, "triangle", 0.05), 60);
}

function playStarSound() {
  playTone(660, 120, "square", 0.13);
  setTimeout(() => playTone(880, 160, "square", 0.11), 110);
}

function showStarCelebration() {
  if (!els.celebrationOverlay) return;
  els.celebrationOverlay.classList.add("isVisible");
  setTimeout(() => {
    els.celebrationOverlay.classList.remove("isVisible");
  }, 900);
}

function setSectionDisabled(sectionEl, disabled) {
  const controls = sectionEl.querySelectorAll("textarea, input, button");
  controls.forEach((el) => {
    el.disabled = disabled;
  });
}

function applyTheme(theme) {
  const next = theme || "rainbow";
  document.body.dataset.theme = next;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // ignore
  }
  const buttons = document.querySelectorAll(".themeBtn");
  buttons.forEach((btn) => {
    btn.classList.toggle("isActive", btn.dataset.theme === next);
  });
}

function initTheme() {
  let theme = "rainbow";
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored) theme = stored;
  } catch {
    // ignore
  }
  applyTheme(theme);
}

function setSoundEnabled(on) {
  soundOn = !!on;
  if (els.soundToggleBtn) {
    els.soundToggleBtn.classList.toggle("isOff", !soundOn);
    els.soundToggleBtn.textContent = soundOn ? "🔊 Sound On" : "🔈 Sound Off";
  }
  try {
    localStorage.setItem(SOUND_STORAGE_KEY, soundOn ? "on" : "off");
  } catch {
    // ignore
  }
}

function initSound() {
  let enabled = true;
  try {
    const stored = localStorage.getItem(SOUND_STORAGE_KEY);
    if (stored === "off") enabled = false;
  } catch {
    // ignore
  }
  setSoundEnabled(enabled);
}

function setCursor(type) {
  let cursorPath = "";

  if (type === "heart") {
    cursorPath = "url('cursors/heart.png'), auto";
    trailType = "heart";
  } else if (type === "star") {
    cursorPath = "url('cursors/star.png'), auto";
    trailType = "star";
  } else if (type === "mystery") {
    const options = ["heart", "star"];
    const random = options[Math.floor(Math.random() * options.length)];
    cursorPath = `url('cursors/${random}.png'), auto`;
    trailType = random;
  } else {
    cursorPath = "auto";
  }

  document.body.style.cursor = cursorPath;

  try {
    localStorage.setItem("cursorChoice", type);
  } catch {
    // ignore
  }
}

function initCursor() {
  let saved = null;
  try {
    saved = localStorage.getItem("cursorChoice");
  } catch {
    // ignore
  }
  if (saved) {
    setCursor(saved);
  }
}

function getStickerHost() {
  // Prefer the currently visible page face (morning or night)
  const visibleFace = document.querySelector(".pageFace[aria-hidden='false']");
  return visibleFace || document.querySelector(".pageCard") || document.body;
}

function addSticker(symbol) {
  const host = getStickerHost();
  const rect = host.getBoundingClientRect();
  const x = rect.left + 80 + Math.random() * Math.max(40, rect.width - 160);
  const y = rect.top + 120 + Math.random() * Math.max(80, rect.height - 240);

  const el = document.createElement("div");
  el.className = "sticker";
  el.textContent = symbol;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;

  host.appendChild(el);
}

document.addEventListener("mousedown", (e) => {
  if (!(e.target instanceof HTMLElement)) return;
  if (!e.target.classList.contains("sticker")) return;
  draggingSticker = e.target;
  draggingSticker.style.cursor = "grabbing";
  e.preventDefault();

  // #region agent log
  fetch("http://127.0.0.1:7895/ingest/a6a0cf55-e5d0-4356-a5d4-7bf1882a3825", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "6e231f",
    },
    body: JSON.stringify({
      sessionId: "6e231f",
      runId: "run1",
      hypothesisId: "H-drag-start",
      location: "script.js:mousedown",
      message: "Sticker drag start",
      data: {
        x: e.clientX,
        y: e.clientY,
      },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion agent log
});

document.addEventListener("mousemove", (e) => {
  const now = performance.now();
  if (now - lastTrailTime > 90) {
    lastTrailTime = now;
    const trail = document.createElement("div");
    trail.className = "trail";
    trail.textContent = trailType === "heart" ? "❤️" : "⭐";
    trail.style.left = `${e.pageX}px`;
    trail.style.top = `${e.pageY}px`;
    document.body.appendChild(trail);
    setTimeout(() => {
      trail.remove();
    }, 250);
  }

  if (draggingSticker) {
    const host = getStickerHost();
    const rect = host.getBoundingClientRect();
    const margin = 20;
    let x = Math.max(rect.left + margin, Math.min(rect.right - margin, e.clientX));
    let y = Math.max(rect.top + margin, Math.min(rect.bottom - margin, e.clientY));
    draggingSticker.style.left = `${x}px`;
    draggingSticker.style.top = `${y}px`;

    // #region agent log
    fetch("http://127.0.0.1:7895/ingest/a6a0cf55-e5d0-4356-a5d4-7bf1882a3825", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "6e231f",
      },
      body: JSON.stringify({
        sessionId: "6e231f",
        runId: "run1",
        hypothesisId: "H-drag-move",
        location: "script.js:mousemove",
        message: "Sticker drag move",
        data: {
          x: e.clientX,
          y: e.clientY,
          left: draggingSticker.style.left,
          top: draggingSticker.style.top,
          hostRect: {
            left: rect.left,
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
          },
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion agent log
  }
});

document.addEventListener("mouseup", () => {
  if (draggingSticker) {
    draggingSticker.style.cursor = "grab";
  }
  draggingSticker = null;
});

function syncFlipMinHeight() {
  const frontH = els.morningPage.scrollHeight;
  const backH = els.nightPage.scrollHeight;
  const minH = Math.max(frontH, backH);
  els.pageFlip.style.minHeight = `${minH}px`;
}

function setActiveTab(tab) {
  const isMorning = tab === "morning";
  els.morningTab.classList.toggle("isActive", isMorning);
  els.nightTab.classList.toggle("isActive", !isMorning);
  els.morningTab.setAttribute("aria-selected", String(isMorning));
  els.nightTab.setAttribute("aria-selected", String(!isMorning));

  els.pageFlip.classList.toggle("isMorning", isMorning);
  els.pageFlip.classList.toggle("isNight", !isMorning);

  els.morningPage.setAttribute("aria-hidden", String(!isMorning));
  els.nightPage.setAttribute("aria-hidden", String(isMorning));
  setSectionDisabled(els.morningPage, !isMorning);
  setSectionDisabled(els.nightPage, isMorning);
  requestAnimationFrame(syncFlipMinHeight);
}

function selectDate(d) {
  selectedDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  viewYear = selectedDate.getFullYear();
  viewMonthIndex = selectedDate.getMonth();
  renderCalendar();
  renderSelectedDateHeader();
  loadEntryIntoForm();
  setSaveStatus("");
}

function renderSelectedDateHeader() {
  els.selectedDateText.textContent = formatLongDate(selectedDate);
  const entries = loadAllEntries();
  const iso = toISODate(selectedDate);
  const entry = getEntry(entries, iso);
  els.starsThisWeek.textContent = String(countStarsForWeek(entries, selectedDate));
  renderCompletionUI(entry);
}

function renderCompletionUI(entry) {
  const morningComplete = isMorningComplete(entry);
  const nightComplete = isNightComplete(entry);

  els.morningCompleteBadge.textContent = morningComplete ? "✓" : "";
  els.nightCompleteBadge.textContent = nightComplete ? "✓" : "";

  if (entry.starAwarded) {
    els.todayStatus.textContent = "⭐ earned";
  } else if (morningComplete && nightComplete) {
    els.todayStatus.textContent = "Ready for ⭐";
  } else if (morningComplete || nightComplete) {
    els.todayStatus.textContent = "Halfway there";
  } else {
    els.todayStatus.textContent = "Start here";
  }
}

function renderCalendar() {
  const firstOfMonth = new Date(viewYear, viewMonthIndex, 1);
  const monthLabel = firstOfMonth.toLocaleDateString(undefined, { month: "long", year: "numeric" });
  els.monthLabel.textContent = monthLabel;

  const daysInMonth = new Date(viewYear, viewMonthIndex + 1, 0).getDate();
  const firstJsDow = firstOfMonth.getDay(); // 0 Sun ... 6 Sat
  const firstGridIndex = firstJsDow; // 0 Sun ... 6 Sat

  els.calendarGrid.innerHTML = "";

  const totalCells = 42;
  for (let cell = 0; cell < totalCells; cell += 1) {
    const dayNum = cell - firstGridIndex + 1;
    const inMonth = dayNum >= 1 && dayNum <= daysInMonth;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "dayBtn";
    btn.setAttribute("role", "gridcell");

    if (!inMonth) {
      btn.classList.add("isMuted");
      btn.disabled = true;
      btn.textContent = "";
      btn.setAttribute("aria-label", "Empty day");
    } else {
      const d = new Date(viewYear, viewMonthIndex, dayNum);
      const iso = toISODate(d);
      btn.textContent = String(dayNum);
      btn.setAttribute("aria-label", formatLongDate(d));
      if (iso === toISODate(selectedDate)) btn.classList.add("isSelected");
      btn.addEventListener("click", () => selectDate(d));
    }

    els.calendarGrid.appendChild(btn);
  }
}

function loadEntryIntoForm() {
  const entries = loadAllEntries();
  const entry = getEntry(entries, toISODate(selectedDate));

  els.goalsToday.value = entry.morning.goalsToday || "";
  els.lookingForwardTo.value = entry.morning.lookingForwardTo || "";
  els.needToDoToday.value = entry.morning.needToDoToday || "";
  els.craftDescription.value = entry.morning.craftDescription || "";
  currentCraftImageDataUrl = entry.morning.craftImageDataUrl || "";
  const weekIndex = getCraftOfWeekIndex(selectedDate);
  const craftOfWeek = CRAFT_OF_THE_WEEK_IMAGES[weekIndex];
  els.craftOfWeekImage.src = craftOfWeek.url;
  els.craftOfWeekImage.alt = craftOfWeek.alt;
  renderCraftImage(currentCraftImageDataUrl);

  const dayIndex = Math.min(selectedDate.getDate() - 1, CRAFT_OF_DAY_IMAGES.length - 1);
  const craftOfDay = CRAFT_OF_DAY_IMAGES[dayIndex];
  els.craftOfDayImage.src = craftOfDay.url;
  els.craftOfDayImage.alt = craftOfDay.alt;

  els.gratefulFor.value = entry.night.gratefulFor || "";
  els.madeMeHappy.value = entry.night.madeMeHappy || "";
  els.betterTomorrow.value = entry.night.betterTomorrow || "";
  els.madeTodayBetter.value = entry.night.madeTodayBetter || "";

  els.affirmationText.textContent = entry.affirmation ? `“${entry.affirmation}”` : "";
  els.nightAffirmationText.textContent = entry.nightAffirmation ? `"${entry.nightAffirmation}"` : "";
  requestAnimationFrame(syncFlipMinHeight);
}

function renderCraftImage(dataUrl) {
  const hasImage = Boolean(dataUrl);
  els.craftImagePreview.src = hasImage ? dataUrl : "";
  els.craftImagePreview.style.display = hasImage ? "block" : "none";
  els.craftOfWeekImage.style.display = hasImage ? "none" : "block";
  els.craftHint.style.display = hasImage ? "none" : "block";
  els.craftImagePreview.closest(".craftFrame")?.classList.toggle("hasImage", hasImage);
  els.removeCraftImageBtn.disabled = !hasImage;
}

function awardStarIfEligible(entries, iso) {
  const entry = getEntry(entries, iso);
  if (entry.starAwarded) return false;
  if (isMorningComplete(entry) && isNightComplete(entry)) {
    entry.starAwarded = true;
    entry.updatedAt = Date.now();
    return true;
  }
  return false;
}

function saveMorning() {
  const entries = loadAllEntries();
  const iso = toISODate(selectedDate);
  const entry = getEntry(entries, iso);

  entry.morning.goalsToday = els.goalsToday.value;
  entry.morning.lookingForwardTo = els.lookingForwardTo.value;
  entry.morning.needToDoToday = els.needToDoToday.value;
  entry.morning.craftDescription = els.craftDescription.value;
  entry.morning.craftImageDataUrl = currentCraftImageDataUrl || "";
  entry.updatedAt = Date.now();

  const gotStar = awardStarIfEligible(entries, iso);
  saveAllEntries(entries);
  renderSelectedDateHeader();
  if (gotStar) {
    showStarCelebration();
    playStarSound();
  }
  setSaveStatus(gotStar ? "Saved. You earned ⭐ for completing both pages!" : "Saved.");
}

function saveNight() {
  const entries = loadAllEntries();
  const iso = toISODate(selectedDate);
  const entry = getEntry(entries, iso);

  entry.night.gratefulFor = els.gratefulFor.value;
  entry.night.madeMeHappy = els.madeMeHappy.value;
  entry.night.betterTomorrow = els.betterTomorrow.value;
  entry.night.madeTodayBetter = els.madeTodayBetter.value;
  entry.updatedAt = Date.now();

  const gotStar = awardStarIfEligible(entries, iso);
  saveAllEntries(entries);
  renderSelectedDateHeader();
  if (gotStar) {
    showStarCelebration();
    playStarSound();
  }
  setSaveStatus(gotStar ? "Saved. You earned ⭐ for completing both pages!" : "Saved.");
}

function revealAffirmation() {
  const entries = loadAllEntries();
  const iso = toISODate(selectedDate);
  const entry = getEntry(entries, iso);

  if (!entry.affirmation) {
    const pick = MORNING_AFFIRMATIONS[Math.floor(Math.random() * MORNING_AFFIRMATIONS.length)];
    entry.affirmation = pick;
    entry.updatedAt = Date.now();
    saveAllEntries(entries);
  }

  els.affirmationText.textContent = `“${entry.affirmation}”`;
  setSaveStatus("Nice! Your affirmation is ready.");
}

function revealNightAffirmation() {
  const entries = loadAllEntries();
  const iso = toISODate(selectedDate);
  const entry = getEntry(entries, iso);

  if (!entry.nightAffirmation) {
    const pick = NIGHT_AFFIRMATIONS[Math.floor(Math.random() * NIGHT_AFFIRMATIONS.length)];
    entry.nightAffirmation = pick;
    entry.updatedAt = Date.now();
    saveAllEntries(entries);
  }

  els.nightAffirmationText.textContent = `"${entry.nightAffirmation}"`;
  setSaveStatus("Nice! Tonight's affirmation is ready.");
}

function saveCraftImage(dataUrl) {
  const entries = loadAllEntries();
  const iso = toISODate(selectedDate);
  const entry = getEntry(entries, iso);
  entry.morning.craftImageDataUrl = dataUrl || "";
  entry.updatedAt = Date.now();
  saveAllEntries(entries);
  renderSelectedDateHeader();
}

function onCraftImageSelected(file) {
  if (!file) return;
  const maxBytes = 1_500_000;
  if (file.size > maxBytes) {
    setSaveStatus("That picture is a bit too big. Try a smaller image (under ~1.5MB).");
    els.craftImageInput.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const dataUrl = typeof reader.result === "string" ? reader.result : "";
    currentCraftImageDataUrl = dataUrl;
    renderCraftImage(currentCraftImageDataUrl);
    saveCraftImage(currentCraftImageDataUrl);
    setSaveStatus("Saved craft picture.");
  };
  reader.onerror = () => {
    setSaveStatus("Couldn’t read that picture. Please try again.");
  };
  reader.readAsDataURL(file);
}

function removeCraftImage() {
  currentCraftImageDataUrl = "";
  renderCraftImage("");
  saveCraftImage("");
  setSaveStatus("Removed craft picture.");
}

function shiftMonth(delta) {
  const d = new Date(viewYear, viewMonthIndex + delta, 1);
  viewYear = d.getFullYear();
  viewMonthIndex = d.getMonth();
  renderCalendar();
}

function wireEvents() {
  els.prevMonthBtn.addEventListener("click", () => shiftMonth(-1));
  els.nextMonthBtn.addEventListener("click", () => shiftMonth(1));

  els.morningTab.addEventListener("click", () => {
    setActiveTab("morning");
    playFlipSound();
  });
  els.nightTab.addEventListener("click", () => {
    setActiveTab("night");
    playFlipSound();
  });
  els.flipToNightBtn.addEventListener("click", () => {
    setActiveTab("night");
    playFlipSound();
  });
  els.flipToMorningBtn.addEventListener("click", () => {
    setActiveTab("morning");
    playFlipSound();
  });

  els.saveMorningBtn.addEventListener("click", saveMorning);
  els.saveNightBtn.addEventListener("click", saveNight);

  els.revealAffirmationBtn.addEventListener("click", revealAffirmation);
  els.revealNightAffirmationBtn.addEventListener("click", revealNightAffirmation);

  els.craftImageInput.addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];
    onCraftImageSelected(file);
  });
  els.removeCraftImageBtn.addEventListener("click", removeCraftImage);

  window.addEventListener("resize", () => {
    requestAnimationFrame(syncFlipMinHeight);
  });

  const themeButtons = document.querySelectorAll(".themeBtn");
  themeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const theme = btn.dataset.theme || "rainbow";
      applyTheme(theme);
    });
  });

  if (els.soundToggleBtn) {
    els.soundToggleBtn.addEventListener("click", () => {
      setSoundEnabled(!soundOn);
    });
  }

  const stickerButtons = document.querySelectorAll(".stickerBtn");
  stickerButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const symbol = btn.dataset.sticker || "⭐";
      addSticker(symbol);
    });
  });
}

function init() {
  const today = new Date();
  viewYear = today.getFullYear();
  viewMonthIndex = today.getMonth();
  selectedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  wireEvents();
  initTheme();
  initSound();
  initCursor();
  setActiveTab("morning");
  renderCalendar();
  renderSelectedDateHeader();
  loadEntryIntoForm();
  syncFlipMinHeight();
}

init();

