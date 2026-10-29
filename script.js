const STORAGE_KEY = "cj.entries.v1";
const THEME_STORAGE_KEY = "cj.theme.v1";
const SOUND_STORAGE_KEY = "cj.sound.v1";
const scratchTickets = {};

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

// Craft of the week: one per Sun–Sat week (new craft every Sunday). Fun, bright kid crafts. Pexels/Unsplash license.
/** Moon phases with kid-friendly "why it's special" for all themes */
const MOON_PHASES = [
  { emoji: "🌑", label: "New Moon", special: "A fresh start! The moon is taking a little rest before it starts growing again. Great night for new ideas and quiet dreams." },
  { emoji: "🌒", label: "Waxing Crescent", special: "A tiny silver smile in the sky. The moon is growing a little every night. Perfect time to try something new!" },
  { emoji: "🌓", label: "First Quarter", special: "Half the moon is lit up—like a glowing smile. It’s halfway to full! A good night to feel brave and strong." },
  { emoji: "🌔", label: "Waxing Gibbous", special: "Almost full! The moon is getting brighter. A cozy night to get ready for something exciting tomorrow." },
  { emoji: "🌕", label: "Full Moon", special: "The moon is round and bright! People have told stories about it for thousands of years. Make a wish—it’s a magical night." },
  { emoji: "🌖", label: "Waning Gibbous", special: "The full moon is gently getting smaller. It’s a calm night to think about what made you happy this week." },
  { emoji: "🌗", label: "Last Quarter", special: "Half the moon is shining. It’s a good night to share with someone you love or write in your journal." },
  { emoji: "🌘", label: "Waning Crescent", special: "A thin silver sliver. The moon is resting before it becomes new again. A peaceful night for sweet dreams." },
];

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
  todayBtn: document.getElementById("todayBtn"),
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
  craftOfWeekImage: document.getElementById("craftOfWeekImage"),
  pictureOfDayPreview: document.getElementById("pictureOfDayPreview"),
  pictureOfDayHint: document.getElementById("pictureOfDayHint"),
  pictureOfDayInput: document.getElementById("pictureOfDayInput"),
  removePictureOfDayBtn: document.getElementById("removePictureOfDayBtn"),

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
  moonPhaseWidget: document.getElementById("moonPhaseWidget"),
  moonPhaseCard: document.getElementById("moonPhaseCard"),
  moonPhaseIconEl: document.getElementById("moonPhaseIconEl"),
  moonPhaseLabelEl: document.getElementById("moonPhaseLabelEl"),
  moonPhaseSpecialEl: document.getElementById("moonPhaseSpecialEl"),
  moonPhaseCardTitle: document.getElementById("moonPhaseCardTitle"),
  moonPhaseCardSpecial: document.getElementById("moonPhaseCardSpecial"),
  moonThemeScene: document.getElementById("moonThemeScene"),
  moonThemeMoon: document.getElementById("moonThemeMoon"),
  weatherBtn: document.getElementById("weatherBtn"),
  weatherCard: document.getElementById("weatherCard"),
  weatherLocation: document.getElementById("weatherLocation"),
  weatherTemp: document.getElementById("weatherTemp"),
  weatherCondition: document.getElementById("weatherCondition"),
  weatherWear: document.getElementById("weatherWear"),
  weatherError: document.getElementById("weatherError"),
};

let viewYear;
let viewMonthIndex;
let selectedDate;
let currentCraftImageDataUrl = "";
let currentPictureOfDayDataUrl = "";
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

/** Approximate moon phase from date (0–7). Reference new moon Jan 6, 2000. */
function getMoonPhase(date) {
  const LUNAR_DAYS = 29.530588;
  const epoch = new Date(2000, 0, 6);
  const daysSince = (date.getTime() - epoch.getTime()) / 864e5;
  const cycle = ((daysSince % LUNAR_DAYS) + LUNAR_DAYS) % LUNAR_DAYS;
  const index = Math.floor((cycle / LUNAR_DAYS) * 8) % 8;
  return MOON_PHASES[index];
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
        pictureOfDayDataUrl: "",
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
  updateMoonPhaseUI();
  requestAnimationFrame(syncFlipMinHeight);
}

function updateMoonPhaseUI() {
  const d = selectedDate || new Date();
  const phase = getMoonPhase(d);
  const isMoonTheme = document.body.dataset.theme === "moon";

  if (els.moonThemeScene) els.moonThemeScene.hidden = !isMoonTheme;
  if (els.moonThemeMoon) els.moonThemeMoon.textContent = isMoonTheme ? phase.emoji : "";

  if (els.moonPhaseCard) {
    els.moonPhaseCard.hidden = !isMoonTheme;
    if (isMoonTheme) {
      if (els.moonPhaseCardTitle) els.moonPhaseCardTitle.textContent = phase.label;
      if (els.moonPhaseCardSpecial) els.moonPhaseCardSpecial.textContent = phase.special;
    }
  }

  if (els.moonPhaseWidget) {
    els.moonPhaseWidget.hidden = false;
    if (els.moonPhaseIconEl) els.moonPhaseIconEl.textContent = phase.emoji;
    if (els.moonPhaseLabelEl) els.moonPhaseLabelEl.textContent = phase.label;
    if (els.moonPhaseSpecialEl) els.moonPhaseSpecialEl.textContent = phase.special;
  }
}

const WEATHER_MA_FALLBACK = { lat: 42.36, lon: -71.06 };
let weatherLoaded = false;
let weatherLoading = false;

function getWhatToWear(tempF, weatherCode) {
  const code = Number(weatherCode);
  const isRain = code >= 51 && code <= 67 || code >= 80 && code <= 82;
  const isSnow = code >= 71 && code <= 77 || code >= 85 && code <= 86;
  const isStorm = code >= 95 && code <= 99;
  const isFog = code === 45 || code === 48;

  if (isStorm) return "Stay inside if you can! If you go out, wear a raincoat and avoid open areas.";
  if (isRain) return "Raincoat or jacket and maybe rain boots — and an umbrella!";
  if (isSnow) return "Warm coat, hat, mittens, and boots. Layer up!";
  if (isFog) return "A light jacket is good — it can feel chilly in the fog.";
  if (tempF >= 80) return "Shorts and a T-shirt! Maybe a hat and sunscreen.";
  if (tempF >= 65) return "T-shirt and comfy pants or shorts. Maybe a light layer for morning.";
  if (tempF >= 50) return "Sweater or light jacket weather. Layers are your friend!";
  if (tempF >= 32) return "Warm coat, hat, and maybe gloves. Bundle up!";
  return "Super cold! Big coat, hat, scarf, and mittens. Stay cozy!";
}

function getConditionLabel(weatherCode) {
  const code = Number(weatherCode);
  if (code === 0) return "Clear";
  if (code === 1) return "Mostly clear";
  if (code === 2) return "Partly cloudy";
  if (code === 3) return "Cloudy";
  if (code === 45 || code === 48) return "Foggy";
  if (code >= 51 && code <= 67) return "Rainy";
  if (code >= 71 && code <= 77) return "Snowy";
  if (code >= 80 && code <= 82) return "Rain showers";
  if (code >= 85 && code <= 86) return "Snow showers";
  if (code >= 95 && code <= 99) return "Thunderstorms";
  return "Mixed";
}

function showWeatherCard(show) {
  if (!els.weatherCard || !els.weatherBtn) return;
  els.weatherCard.hidden = !show;
  els.weatherBtn.setAttribute("aria-expanded", show ? "true" : "false");
}

function renderWeather(data, locationLabel) {
  if (!els.weatherTemp || !els.weatherCondition || !els.weatherWear || !els.weatherLocation) return;
  const tempC = data.current?.temperature_2m;
  const code = data.current?.weather_code;
  const tempF = tempC != null ? Math.round(tempC * 9 / 5 + 32) : null;

  els.weatherLocation.textContent = locationLabel || "Your area";
  els.weatherTemp.textContent = tempF != null ? `${tempF}°F` : "—";
  els.weatherCondition.textContent = code != null ? getConditionLabel(code) : "—";
  els.weatherWear.textContent = (tempF != null && code != null) ? getWhatToWear(tempF, code) : "—";
  if (els.weatherError) {
    els.weatherError.hidden = true;
    els.weatherError.textContent = "";
  }
}

function setWeatherError(msg) {
  if (!els.weatherError) return;
  els.weatherError.hidden = false;
  els.weatherError.textContent = msg;
  if (els.weatherLocation) els.weatherLocation.textContent = "";
  if (els.weatherTemp) els.weatherTemp.textContent = "—";
  if (els.weatherCondition) els.weatherCondition.textContent = "—";
  if (els.weatherWear) els.weatherWear.textContent = "—";
}

function fetchWeather(lat, lon, locationLabel) {
  if (weatherLoading) return;
  weatherLoading = true;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=America/New_York`;
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("Weather unavailable");
      return res.json();
    })
    .then((data) => {
      weatherLoaded = true;
      renderWeather(data, locationLabel);
    })
    .catch(() => {
      setWeatherError("Couldn’t load weather. Try again in a moment!");
    })
    .finally(() => {
      weatherLoading = false;
    });
}

function getWeatherAndShow() {
  if (weatherLoaded || weatherLoading) return;
  if (!navigator.geolocation) {
    fetchWeather(WEATHER_MA_FALLBACK.lat, WEATHER_MA_FALLBACK.lon, "Massachusetts");
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      fetchWeather(latitude, longitude, "Near you");
    },
    () => {
      fetchWeather(WEATHER_MA_FALLBACK.lat, WEATHER_MA_FALLBACK.lon, "Massachusetts");
    },
    { timeout: 8000, maximumAge: 300000 }
  );
}

function toggleWeatherCard() {
  const isOpen = !els.weatherCard.hidden;
  if (isOpen) {
    showWeatherCard(false);
    return;
  }
  showWeatherCard(true);
  if (!weatherLoaded && !weatherLoading) getWeatherAndShow();
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

// Tiny SVG cursors for girly options (24x24, encoded for data URI)
function getSvgCursor(svgContent) {
  const encoded = encodeURIComponent(svgContent);
  return `url("data:image/svg+xml,${encoded}") 0 0, auto`;
}

const CURSOR_SVG = {
  butterfly:
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ff69b4" d="M12 10c-1 0-2 .5-2.5 1.5L8 14h2l1.5-2 1.5 2h2l-1.5-2.5c-.5-1-1.5-1.5-2.5-1.5z"/><path fill="#ffb6c1" d="M8 14c-2 0-3 1.5-3 3v2h3v-2c0-.5.5-1 1-1h1v-2H8z"/><path fill="#ffb6c1" d="M16 14v2h1c.5 0 1 .5 1 1v2h3v-2c0-1.5-1-3-3-3h-2z"/><path fill="#da70d6" d="M12 8c.5 0 1 .2 1.3.6l.7 1.4.7-1.4c.3-.4.8-.6 1.3-.6s1 .2 1.3.6l.7 1.4.7-1.4c.3-.4.8-.6 1.3-.6v2c-.3 0-.5.1-.7.3l-1 2-1-2c-.2-.2-.4-.3-.7-.3s-.5.1-.7.3l-1 2-1-2c-.2-.2-.4-.3-.6-.3V8z"/></svg>',
  sparkle:
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ffd700" d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z"/><path fill="#fff59d" d="M4 16l2 6 2-6 6-2-6-2-2-6-2 6-6 2z"/><path fill="#ffeb3b" d="M20 12l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z"/></svg>',
  flower:
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" fill="#ffb6c1"/><ellipse cx="12" cy="8" rx="3" ry="4" fill="#ff69b4" transform="rotate(0 12 12)"/><ellipse cx="16" cy="12" rx="3" ry="4" fill="#ff69b4" transform="rotate(72 12 12)"/><ellipse cx="14" cy="17" rx="3" ry="4" fill="#ff69b4" transform="rotate(144 12 12)"/><ellipse cx="10" cy="17" rx="3" ry="4" fill="#ff69b4" transform="rotate(216 12 12)"/><ellipse cx="8" cy="12" rx="3" ry="4" fill="#ff69b4" transform="rotate(288 12 12)"/></svg>',
  crown:
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ffd700" d="M12 4l2 4 2-1-1 4h2l-3 6-3-6h2l-1-4 2 1 2-4z"/><path fill="#ffec8b" d="M4 14h16v4H4v-4z"/><path fill="#daa520" d="M2 10l3 4h2l2-6 2 6h2l3-4h2v10H2V10z"/></svg>',
  rainbow:
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ff6b6b" d="M12 18a6 6 0 0 1-6-6c0-1 .2-2 .6-2.8L12 4l5.4 5.2c.4.8.6 1.8.6 2.8a6 6 0 0 1-6 6z" opacity=".9"/><path fill="#ffd93d" d="M12 16a4 4 0 0 1-4-4c0-.6.1-1.2.4-1.7L12 8l3.6 2.3c.3.5.4 1.1.4 1.7a4 4 0 0 1-4 4z" opacity=".9"/><path fill="#6bcb77" d="M12 14a2 2 0 0 1-2-2c0-.2 0-.4.1-.6L12 11l1.9.4c.1.2.1.4.1.6a2 2 0 0 1-2 2z" opacity=".9"/></svg>',
};

function setCursor(type) {
  let cursorPath = "";

  if (type === "heart") {
    cursorPath = "url('cursors/heart.png'), auto";
    trailType = "heart";
  } else if (type === "star") {
    cursorPath = "url('cursors/star.png'), auto";
    trailType = "star";
  } else if (type === "butterfly") {
    cursorPath = getSvgCursor(CURSOR_SVG.butterfly);
    trailType = "butterfly";
  } else if (type === "sparkle") {
    cursorPath = getSvgCursor(CURSOR_SVG.sparkle);
    trailType = "sparkle";
  } else if (type === "flower") {
    cursorPath = getSvgCursor(CURSOR_SVG.flower);
    trailType = "flower";
  } else if (type === "crown") {
    cursorPath = getSvgCursor(CURSOR_SVG.crown);
    trailType = "crown";
  } else if (type === "rainbow") {
    cursorPath = getSvgCursor(CURSOR_SVG.rainbow);
    trailType = "rainbow";
  } else if (type === "mystery") {
    const options = ["heart", "star", "butterfly", "sparkle", "flower", "crown", "rainbow"];
    const random = options[Math.floor(Math.random() * options.length)];
    setCursor(random);
    return;
  } else {
    cursorPath = "auto";
    trailType = "star";
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
    const trailEmoji =
      trailType === "heart"
        ? "❤️"
        : trailType === "star"
          ? "⭐"
          : trailType === "butterfly"
            ? "🦋"
            : trailType === "sparkle"
              ? "✨"
              : trailType === "flower"
                ? "🌸"
                : trailType === "crown"
                  ? "👑"
                  : trailType === "rainbow"
                    ? "🌈"
                    : "⭐";
    trail.textContent = trailEmoji;
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
  updateMoonPhaseUI();
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
  currentPictureOfDayDataUrl = entry.morning.pictureOfDayDataUrl || "";
  renderPictureOfDay(currentPictureOfDayDataUrl);
  const weekIndex = getCraftOfWeekIndex(selectedDate);
  const craftOfWeek = CRAFT_OF_THE_WEEK_IMAGES[weekIndex];
  els.craftOfWeekImage.src = craftOfWeek.url;
  els.craftOfWeekImage.alt = craftOfWeek.alt;
  renderCraftImage(currentCraftImageDataUrl);

  els.gratefulFor.value = entry.night.gratefulFor || "";
  els.madeMeHappy.value = entry.night.madeMeHappy || "";
  els.betterTomorrow.value = entry.night.betterTomorrow || "";
  els.madeTodayBetter.value = entry.night.madeTodayBetter || "";

  scratchTickets.morning.reset(entry.affirmation);
  scratchTickets.night.reset(entry.nightAffirmation);
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

function renderPictureOfDay(dataUrl) {
  const hasImage = Boolean(dataUrl);
  els.pictureOfDayPreview.src = hasImage ? dataUrl : "";
  els.pictureOfDayPreview.style.display = hasImage ? "block" : "none";
  els.pictureOfDayHint.style.display = hasImage ? "none" : "block";
  els.pictureOfDayPreview.closest(".pictureOfDayFrame")?.classList.toggle("hasImage", hasImage);
  els.removePictureOfDayBtn.disabled = !hasImage;
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
  entry.morning.pictureOfDayDataUrl = currentPictureOfDayDataUrl || "";
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

// Pointer Events support fingers, Apple Pencil, and mice with the same interaction.
function createScratchTicket(canvas, text, button, field, choices) {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  let message = "";
  let revealed = false;
  let activePointer = null;
  let strokes = [];
  let width = 1;
  let height = 1;
  let ratio = 1;

  function pick() {
    return choices[Math.floor(Math.random() * choices.length)];
  }

  function eraseStroke(points) {
    if (!ctx || !points.length) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 38;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(points[0].x * width, points[0].y * height);
    for (const point of points.slice(1)) ctx.lineTo(point.x * width, point.y * height);
    ctx.stroke();
    const last = points[points.length - 1];
    ctx.beginPath();
    ctx.arc(last.x * width, last.y * height, 19, 0, Math.PI * 2);
    ctx.fill();
  }

  function paint() {
    if (!ctx || revealed) return;
    // Layout size, rather than transformed bounds, also works on the flipped page.
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    if (!width || !height) return;
    ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    const silver = ctx.createLinearGradient(0, 0, width, height);
    silver.addColorStop(0, "#b8bfce");
    silver.addColorStop(0.45, "#eef0f6");
    silver.addColorStop(1, "#a5adbf");
    ctx.fillStyle = silver;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "rgba(255,255,255,0.45)";
    for (let y = 8; y < height; y += 12) {
      for (let x = 8; x < width; x += 12) ctx.fillRect(x, y, 2, 2);
    }
    ctx.fillStyle = "#33415d";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 18px system-ui, sans-serif";
    ctx.fillText("✦ Scratch to reveal ✦", width / 2, height / 2 - 10);
    ctx.font = "13px system-ui, sans-serif";
    ctx.fillText("A little kindness, just for you", width / 2, height / 2 + 18);
    strokes.forEach(eraseStroke);
  }

  function reveal() {
    if (revealed) message = pick();
    revealed = true;
    activePointer = null;
    canvas.hidden = true;
    text.textContent = `“${message}”`;
    text.removeAttribute("aria-hidden");
    button.textContent = "Reveal another affirmation";
    const entries = loadAllEntries();
    const entry = getEntry(entries, toISODate(selectedDate));
    entry[field] = message;
    entry.updatedAt = Date.now();
    try {
      saveAllEntries(entries);
      setSaveStatus("Your affirmation is revealed. Keep being you!");
    } catch {
      setSaveStatus("Your affirmation is revealed, but this browser couldn't save it.");
    }
    requestAnimationFrame(syncFlipMinHeight);
  }

  function point(event) {
    const rect = canvas.getBoundingClientRect();
    return { x: (event.clientX - rect.left) / rect.width, y: (event.clientY - rect.top) / rect.height };
  }

  canvas.addEventListener("pointerdown", (event) => {
    if (revealed || !ctx || activePointer !== null || (event.pointerType === "mouse" && event.button !== 0)) return;
    event.preventDefault();
    activePointer = event.pointerId;
    canvas.setPointerCapture(event.pointerId);
    const stroke = [point(event)];
    strokes.push(stroke);
    eraseStroke(stroke);
  });
  canvas.addEventListener("pointermove", (event) => {
    if (event.pointerId !== activePointer) return;
    event.preventDefault();
    const stroke = strokes[strokes.length - 1];
    const events = event.getCoalescedEvents ? event.getCoalescedEvents() : [event];
    for (const sample of events.length ? events : [event]) {
      const previous = stroke[stroke.length - 1];
      const next = point(sample);
      stroke.push(next);
      eraseStroke([previous, next]);
    }
  });
  function finishStroke(event) {
    if (event.pointerId !== activePointer) return;
    activePointer = null;
    if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    if (!ctx || revealed) return;
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let clear = 0;
    let samples = 0;
    for (let i = 3; i < pixels.length; i += 64) {
      samples++;
      if (pixels[i] < 128) clear++;
    }
    if (clear / samples >= 0.55) reveal();
  }
  canvas.addEventListener("pointerup", finishStroke);
  canvas.addEventListener("pointercancel", finishStroke);
  canvas.addEventListener("lostpointercapture", finishStroke);
  new ResizeObserver(paint).observe(canvas.parentElement);

  return {
    reveal,
    reset(saved) {
      activePointer = null;
      strokes = [];
      message = saved || pick();
      revealed = Boolean(saved);
      canvas.hidden = revealed || !ctx;
      text.textContent = `“${message}”`;
      if (revealed) text.removeAttribute("aria-hidden");
      else text.setAttribute("aria-hidden", "true");
      button.textContent = revealed ? "Reveal another affirmation" : "Reveal without scratching";
      requestAnimationFrame(paint);
    },
  };
}

function revealAffirmation() {
  scratchTickets.morning.reveal();
}

function revealNightAffirmation() {
  scratchTickets.night.reveal();
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

function savePictureOfDay(dataUrl) {
  const entries = loadAllEntries();
  const iso = toISODate(selectedDate);
  const entry = getEntry(entries, iso);
  entry.morning.pictureOfDayDataUrl = dataUrl || "";
  entry.updatedAt = Date.now();
  saveAllEntries(entries);
  renderSelectedDateHeader();
}

function onPictureOfDaySelected(file) {
  if (!file) return;
  const maxBytes = 1_500_000;
  if (file.size > maxBytes) {
    setSaveStatus("That picture is a bit too big. Try a smaller image (under ~1.5MB).");
    els.pictureOfDayInput.value = "";
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    const dataUrl = typeof reader.result === "string" ? reader.result : "";
    currentPictureOfDayDataUrl = dataUrl;
    renderPictureOfDay(currentPictureOfDayDataUrl);
    savePictureOfDay(currentPictureOfDayDataUrl);
    setSaveStatus("Picture of the day saved.");
  };
  reader.onerror = () => {
    setSaveStatus("Couldn’t read that picture. Please try again.");
  };
  reader.readAsDataURL(file);
}

function removePictureOfDay() {
  currentPictureOfDayDataUrl = "";
  renderPictureOfDay("");
  savePictureOfDay("");
  setSaveStatus("Removed picture of the day.");
}

function shiftMonth(delta) {
  const d = new Date(viewYear, viewMonthIndex + delta, 1);
  viewYear = d.getFullYear();
  viewMonthIndex = d.getMonth();
  renderCalendar();
  renderSelectedDateHeader();
}

function wireEvents() {
  if (els.prevMonthBtn) els.prevMonthBtn.addEventListener("click", (e) => { e.preventDefault(); shiftMonth(-1); });
  if (els.nextMonthBtn) els.nextMonthBtn.addEventListener("click", (e) => { e.preventDefault(); shiftMonth(1); });
  if (els.todayBtn) els.todayBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const today = new Date();
    selectedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    viewYear = today.getFullYear();
    viewMonthIndex = today.getMonth();
    renderCalendar();
    renderSelectedDateHeader();
    loadEntryIntoForm();
    setSaveStatus("Jumped to today.");
  });

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
  els.pictureOfDayInput.addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];
    onPictureOfDaySelected(file);
  });
  els.removePictureOfDayBtn.addEventListener("click", removePictureOfDay);

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

  if (els.weatherBtn) {
    els.weatherBtn.addEventListener("click", () => {
      toggleWeatherCard();
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
  scratchTickets.morning = createScratchTicket(document.getElementById("morningScratch"), els.affirmationText, els.revealAffirmationBtn, "affirmation", MORNING_AFFIRMATIONS);
  scratchTickets.night = createScratchTicket(document.getElementById("nightScratch"), els.nightAffirmationText, els.revealNightAffirmationBtn, "nightAffirmation", NIGHT_AFFIRMATIONS);
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

