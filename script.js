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
  weeklyGoal: document.getElementById("weeklyGoal"),
  madeTodayBetter: document.getElementById("madeTodayBetter"),

  saveMorningBtn: document.getElementById("saveMorningBtn"),
  saveNightBtn: document.getElementById("saveNightBtn"),
  flipToNightBtn: document.getElementById("flipToNightBtn"),
  flipToMorningBtn: document.getElementById("flipToMorningBtn"),
  soundToggleBtn: document.getElementById("soundToggleBtn"),
  celebrationOverlay: document.getElementById("celebrationOverlay"),
  moonPhaseWidget: document.getElementById("moonPhaseWidget"),
  moonPhaseIconEl: document.getElementById("moonPhaseIconEl"),
  moonPhaseLabelEl: document.getElementById("moonPhaseLabelEl"),
  moonPhaseSpecialEl: document.getElementById("moonPhaseSpecialEl"),
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

/** Calendar phase: principal phases on their local date, intervening phases otherwise.
 * Meeus event times are terrestrial time; subtract approximate delta-T to get UTC.
 * This is a daily calendar display, not a minute-precision observing ephemeris.
 */
function getMoonPhase(date) {
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
  const year = date.getFullYear() + (date.getMonth() + 0.5) / 12;
  const t = year - 2000;
  const deltaT = 62.92 + 0.32217 * t + 0.005589 * t * t;
  const events = [];
  const calculators = [lunarPhases.newMoon, lunarPhases.first, lunarPhases.full, lunarPhases.last];
  // Adjacent lunations cover month/year boundaries, including DST changes.
  for (let offset = -2; offset <= 2; offset++) {
    calculators.forEach((calculate, quarter) => {
      const time = (calculate(year + offset / 12.3685) - 2440587.5) * 864e5 - deltaT * 1000;
      events.push({ time, index: quarter * 2 });
    });
  }
  events.sort((a, b) => a.time - b.time);
  const today = events.find(event => event.time >= start.getTime() && event.time < end.getTime());
  if (today) return MOON_PHASES[today.index];
  const previous = events.filter(event => event.time < start.getTime()).pop();
  return MOON_PHASES[(previous.index + 1) % 8];
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
        weeklyGoal: "",
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

const notebookMessages = Array.from(document.querySelectorAll(".notebookNotes span"), note => note.textContent);
const marginMessages = {
  notebook: notebookMessages,
  rainbow: [
    "🌈 You’ve got this!", "What will you dream up?",
    "Keep up the good work!", "One little step counts.",
    "💛 Keep being you!", "Your feelings belong here.",
    "What a colorful day.", "Rest those busy feet!"
  ],
  pinks: [
    "💜 Your ideas matter.", "Be your own kind of wonderful.",
    "Draw it your way!", "A little kindness goes far.",
    "You can tell your story.", "All feelings are welcome.",
    "You tried something today.", "Sweet dreams, daydreamer!"
  ],
  cozy: [
    "☁️ Take your time.", "Start with one small thing.",
    "A doodle is a good start.", "You can ask for help.",
    "Take a cozy breath.", "You deserve a soft landing.",
    "Give yourself a hug.", "Tomorrow is a fresh page."
  ],
  moon: [
    "🌙 Stay curious!", "Big questions are welcome.",
    "Try a little experiment.", "Keep exploring!",
    "Let your thoughts land here.", "Even little stars shine.",
    "You can rest now.", "Dream up a new adventure."
  ],
  sparkle: [
    "✨ Let your ideas sparkle!", "Make something only you could make.",
    "Trying takes courage.", "Look at you go!",
    "What made you smile?", "Your kind heart shines.",
    "Be proud of one small thing.", "Sleep tight, bright spark!"
  ]
};

function applyTheme(theme) {
  const next = theme || "rainbow";
  document.body.dataset.theme = next;
  const notes = marginMessages[next] || notebookMessages;
  document.querySelectorAll(".notebookNotes span").forEach((note, index) => {
    note.textContent = notes[index];
  });
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
  Object.values(scratchTickets).forEach((ticket) => ticket.themeChanged());
  requestAnimationFrame(syncFlipMinHeight);
}

function updateMoonPhaseUI() {
  const d = selectedDate || new Date();
  const phase = getMoonPhase(d);
  const isMoonTheme = document.body.dataset.theme === "moon";

  if (els.moonThemeScene) els.moonThemeScene.hidden = !isMoonTheme;
  if (els.moonThemeMoon) els.moonThemeMoon.textContent = isMoonTheme ? phase.emoji : "";

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
  if (tempF >= 50) return "Sweater or light jacket weather.\nLayers are your friend!";
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

const judyOutfits = {"layers":{"src":"data:image/webp;base64,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","alt":"Judy in her star sweater and pink bow"},"rain":{"src":"data:image/webp;base64,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","alt":"Judy in her yellow raincoat and hat"},"chilly":{"src":"data:image/webp;base64,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","alt":"Judy in her argyle sweater and striped knit hat"},"winter":{"src":"data:image/webp;base64,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","alt":"Judy in her red coat and snowflake hat"},"bedtime":{"src":"data:image/webp;base64,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","alt":"Judy in her blue bedtime robe"}};

function isRain(code) {
  return (code >= 51 && code <= 67) || (code >= 80 && code <= 82) || (code >= 95 && code <= 99);
}

function chooseJudyOutfit(current, tempF, laterRain) {
  const code = current.weather_code;
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return "winter";
  if (isRain(code) || laterRain) return "rain";
  if (tempF == null) return null;
  if (tempF < 32) return "winter";
  if (tempF < 50) return "chilly";
  if (tempF < 65) return "layers";
  return null;
}

let morningOutfit = "layers";

function refreshJudyOutfit() {
  const key = els.nightTab.getAttribute("aria-selected") === "true" ? "bedtime" : morningOutfit;
  const original = els.weatherCard.querySelector("svg.weatherJudy");
  if (!original) return;
  let image = els.weatherCard.querySelector("img.weatherJudy");
  original.style.display = key ? "none" : "";
  if (!key) {
    if (image) image.remove();
    return;
  }
  if (!image) {
    image = document.createElement("img");
    image.className = "weatherJudy";
    image.style.objectFit = "contain";
    original.after(image);
  }
  const outfit = judyOutfits[key];
  image.src = outfit.src;
  image.alt = outfit.alt;
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
  const now = data.current?.time || "";
  const laterRain = data.hourly?.time?.some((time, i) =>
    time > now && time.slice(0, 10) === now.slice(0, 10) && isRain(data.hourly.weather_code?.[i])
  );
  morningOutfit = chooseJudyOutfit(data.current || {}, tempF, laterRain);
  refreshJudyOutfit();
  if (laterRain && !isRain(code)) els.weatherWear.textContent += " Bring a raincoat for later.";
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
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day&hourly=weather_code&forecast_days=1&timezone=auto`;
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

  if (type === "regular") {
    trailType = null;
  } else if (type === "heart") {
    cursorPath = getSvgCursor('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="hotpink" stroke="crimson" d="M12 21 3 12C-3 4 7-1 12 6c5-7 15-2 9 6z"/></svg>');
    trailType = "heart";
  } else if (type === "star") {
    cursorPath = getSvgCursor('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="gold" stroke="orange" d="m12 1 3 7 8 1-6 6 2 8-7-4-7 4 2-8-6-6 8-1z"/></svg>');
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

  document.documentElement.style.setProperty("--journal-cursor", cursorPath);
  document.documentElement.classList.toggle("customCursor", type !== "regular");
  for (const button of document.querySelectorAll(".cursorButtons button")) {
    button.setAttribute("aria-pressed", String(button.getAttribute("onclick") === "setCursor('" + type + "')"));
  }

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

function showCursorTrail(e) {
  if (!trailType) return;
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
}
document.addEventListener("pointermove", showCursorTrail);
document.addEventListener("pointerdown", showCursorTrail);

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
  refreshJudyOutfit();

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

function calendarItemText(item) {
  if (item.kind === "Holiday") return item.title;
  const time = item.time ? new Date("2000-01-01T" + item.time).toLocaleTimeString(undefined, {hour:"numeric", minute:"2-digit"}) + " " : "";
  return item.kind + ": " + time + item.title;
}

function renderPlanner(items, iso) {
  const form = document.getElementById("planner");
  const submit = form.querySelector("[type=submit]");
  const cancel = document.getElementById("cancelItemEdit");
  const reset = () => {
    form.reset();
    form.dataset.editId = "";
    form.elements.itemDate.value = iso;
    submit.textContent = "Add item";
    cancel.hidden = true;
  };
  if (form.dataset.date !== iso || form.dataset.code !== familyCode) reset();
  form.dataset.date = iso;
  form.dataset.code = familyCode;
  cancel.onclick = reset;
  document.getElementById("plannerDate").textContent = formatLongDate(selectedDate);
  const list = document.getElementById("plannerList");
  list.replaceChildren();
  for (const item of items) {
    const row = document.createElement("li");
    row.append(calendarItemText(item) + " ");
    const edit = document.createElement("button");
    edit.type = "button";
    edit.textContent = "Edit";
    edit.onclick = () => {
      form.dataset.editId = item.id;
      form.elements.kind.value = item.kind;
      form.elements.itemTitle.value = item.title;
      form.elements.itemDate.value = iso;
      form.elements.itemTime.value = item.time || "";
      submit.textContent = "Save changes";
      cancel.hidden = false;
      form.elements.itemTitle.focus();
    };
    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "Remove";
    remove.onclick = () => runCalendarAction(async () => {
      await changeCalendarItem({...item,date:iso}, null);
      if (form.dataset.editId === item.id) reset();
      renderCalendar();
      calendarMessage("Item removed.");
    });
    row.append(edit, remove);
    list.append(row);
  }
  form.onsubmit = event => {
    event.preventDefault();
    runCalendarAction(async () => {
      const title = form.elements.itemTitle.value.trim();
      const date = form.elements.itemDate.value;
      if (!title || !date) throw new Error("Enter a title and date.");
      const id = form.dataset.editId;
      const original = items.find(item => item.id === id);
      if (id && !original) throw new Error("This item has moved or was removed. Cancel this edit and select it again.");
      await changeCalendarItem(original && {...original,date:iso}, {
        id:id || crypto.randomUUID(), title, date, time:form.elements.itemTime.value,
        kind:form.elements.kind.value
      });
      reset();
      if (date !== iso) selectDate(new Date(date + "T12:00:00"));
      else renderCalendar();
      calendarMessage("Item saved.");
    });
  };
}

function federalHolidays(year) {
  const dates = new Map();
  function fixed(month, day, title, holidayYear = year) {
    const actual = new Date(holidayYear, month - 1, day);
    dates.set(toISODate(actual), title);
    const weekday = actual.getDay();
    if (weekday === 0 || weekday === 6) {
      actual.setDate(actual.getDate() + (weekday === 0 ? 1 : -1));
      dates.set(toISODate(actual), title + " (observed)");
    }
  }
  function weekday(month, dayOfWeek, occurrence, title) {
    const first = new Date(year, month - 1, 1);
    first.setDate(1 + (dayOfWeek - first.getDay() + 7) % 7 + 7 * (occurrence - 1));
    dates.set(toISODate(first), title);
  }
  fixed(1, 1, "New Year’s Day");
  fixed(1, 1, "New Year’s Day", year + 1);
  if (year >= 1986) weekday(1, 1, 3, "Martin Luther King Jr. Day");
  weekday(2, 1, 3, "Washington’s Birthday");
  const memorial = new Date(year, 4, 31);
  memorial.setDate(31 - (memorial.getDay() + 6) % 7);
  dates.set(toISODate(memorial), "Memorial Day");
  if (year >= 2021) fixed(6, 19, "Juneteenth");
  fixed(7, 4, "Independence Day");
  weekday(9, 1, 1, "Labor Day");
  weekday(10, 1, 2, "Columbus Day");
  fixed(11, 11, "Veterans Day");
  weekday(11, 4, 4, "Thanksgiving");
  fixed(12, 25, "Christmas Day");
  return dates;
}

function renderCalendar() {
  const holidays = federalHolidays(viewYear);
  const entries = loadAllEntries();
  const selected = toISODate(selectedDate);
  const itemsForDate = date => familyCode
    ? (familySnapshot?.items || []).filter(item => item.date === date)
    : entries[date]?.calendarItems || [];
  const dayItems = itemsForDate(selected);
  renderPlanner(dayItems, selected);
  const agenda = document.getElementById("phoneAgenda");
  const schedule = [...dayItems];
  const holiday = federalHolidays(selectedDate.getFullYear()).get(selected);
  if (holiday) schedule.unshift({kind:"Holiday", title:holiday});
  agenda.replaceChildren(...schedule.map(item => {
    const row = document.createElement("li");
    row.className = "calendarItem--" + item.kind.toLowerCase();
    row.textContent = calendarItemText(item);
    return row;
  }));
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
      const items = [...itemsForDate(iso)];
      if (holidays.has(iso)) items.unshift({kind: "Holiday", title: holidays.get(iso)});
      for (const item of items) {
        const label = document.createElement("span");
        label.className = "calendarItem calendarItem--" + item.kind.toLowerCase();
        label.textContent = calendarItemText(item);
        btn.append(label);
      }
      if (items.length) {
        const dots = document.createElement("span");
        dots.className = "dayDots";
        dots.setAttribute("aria-hidden", "true");
        for (const kind of new Set(items.map(item => item.kind))) {
          const dot = document.createElement("i");
          dot.className = "calendarItem--" + kind.toLowerCase();
          dots.append(dot);
        }
        btn.append(dots);
      }
      btn.setAttribute("aria-label", [formatLongDate(d), ...items.map(calendarItemText)].join(", "));
      if (iso === toISODate(selectedDate)) btn.classList.add("isSelected");
      btn.addEventListener("click", () => selectDate(d));
    }

    els.calendarGrid.appendChild(btn);
  }
}

function renderReadingPrompt(entries, morning) {
  const grid = els.needToDoToday.closest(".fieldGrid");
  grid.querySelector("#readingAnswer")?.closest("label").remove();
  const day = selectedDate.getDay();
  if (day !== 0 && day !== 3) return;
  const sunday = new Date(selectedDate);
  sunday.setDate(sunday.getDate() - day);
  const title = entries[toISODate(sunday)]?.morning?.readingTitle?.trim();
  const field = document.createElement("label");
  field.className = "field";
  const prompt = document.createElement("span");
  prompt.className = "labelText";
  prompt.textContent = day === 0 ? "What book do I want to read this week?"
    : title ? "How far have I gotten in “" + title + "”?" : "How far have I gotten in my book?";
  const answer = document.createElement("textarea");
  answer.id = "readingAnswer";
  answer.rows = 3;
  answer.value = (day === 0 ? morning.readingTitle : morning.readingProgress) || "";
  field.append(prompt, answer);
  grid.append(field);
}

function loadEntryIntoForm() {
  const entries = loadAllEntries();
  const entry = getEntry(entries, toISODate(selectedDate));

  renderReadingPrompt(entries, entry.morning);
  els.goalsToday.value = entry.morning.goalsToday || "";
  els.lookingForwardTo.value = entry.morning.lookingForwardTo || "";
  els.needToDoToday.value = entry.morning.needToDoToday || "";
  els.craftDescription.value = entry.morning.craftDescription || "";
  currentCraftImageDataUrl = entry.morning.craftImageDataUrl || "";
  const showNovemberPhoto = toISODate(selectedDate) === "2026-11-19" && !entry.morning.pictureOfDayRemoved;
  currentPictureOfDayDataUrl = entry.morning.pictureOfDayDataUrl || (showNovemberPhoto ? els.pictureOfDayPreview.dataset.novemberPhoto : "") || "";
  renderPictureOfDay(currentPictureOfDayDataUrl);
  const week = toISODate(getWeekSunday(selectedDate));
  let featuredCraft;
  for (const section of document.querySelectorAll("[data-craft-week]")) {
    section.hidden = section.dataset.craftWeek !== week;
    if (!section.hidden) featuredCraft = section;
  }
  const isNote = featuredCraft?.hasAttribute("data-note");
  document.getElementById("craftWritingLabel").textContent = isNote ? "Inside my Thanksgiving card" : "What was your favorite part of this craft?";
  els.craftDescription.placeholder = isNote
    ? "I’m thankful for you because…"
    : "My favorite part was…";
  if (featuredCraft) {
    els.craftOfWeekImage.src = featuredCraft.dataset.example;
    els.craftOfWeekImage.alt = featuredCraft.dataset.alt;
  } else {
    const craft = CRAFT_OF_THE_WEEK_IMAGES[getCraftOfWeekIndex(selectedDate)];
    els.craftOfWeekImage.src = craft.url;
    els.craftOfWeekImage.alt = craft.alt;
  }
  renderCraftImage(currentCraftImageDataUrl);

  els.gratefulFor.value = entry.night.gratefulFor || "";
  els.madeMeHappy.value = entry.night.madeMeHappy || "";
  els.betterTomorrow.value = entry.night.betterTomorrow || "";
  document.getElementById("weeklyGoalField").hidden = selectedDate.getDay() !== 0;
  els.weeklyGoal.value = entry.night.weeklyGoal || "";
  els.madeTodayBetter.value = entry.night.madeTodayBetter || "";

  scratchTickets.morning.reset(entry.affirmation);
  scratchTickets.night.reset(entry.nightAffirmation);
  requestAnimationFrame(syncFlipMinHeight);
}

function renderCraftImage(dataUrl) {
  const hasImage = Boolean(dataUrl);
  els.craftImagePreview.src = hasImage ? dataUrl : "";
  els.craftImagePreview.style.display = hasImage ? "block" : "none";
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

  const reading = document.getElementById("readingAnswer");
  if (reading) entry.morning[selectedDate.getDay() === 0 ? "readingTitle" : "readingProgress"] = reading.value;
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
  if (selectedDate.getDay() === 0) entry.night.weeklyGoal = els.weeklyGoal.value;
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
  let typingTimer = null;
  const hint = canvas.parentElement.parentElement.querySelector(".scratchHint");
  const heading = canvas.parentElement.parentElement.previousElementSibling;
  const originalHeading = heading.textContent;
  const isNotebook = () => document.body.dataset.theme === "notebook";

  function stopTyping() {
    clearTimeout(typingTimer);
    typingTimer = null;
    text.classList.remove("isTyping");
  }

  function updateLabels() {
    hint.textContent = isNotebook()
      ? "Tap the pink card and watch your affirmation type itself onto the page."
      : "Rub the silver ticket with your finger or mouse to uncover a little encouragement.";
    heading.textContent = isNotebook() ? "✨ A Little Encouragement" : originalHeading;
    button.textContent = isNotebook()
      ? (revealed ? "Type another affirmation" : "Type my affirmation")
      : (revealed ? "Scratch another affirmation" : "Reveal without scratching");
  }

  function showMessage() {
    stopTyping();
    const fullText = `“${message}”`;
    const animate = isNotebook() && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!animate) {
      text.textContent = fullText;
      text.removeAttribute("aria-hidden");
      return;
    }
    text.textContent = "";
    text.setAttribute("aria-hidden", "true");
    text.classList.add("isTyping");
    let length = 0;
    function typeNext() {
      length++;
      text.textContent = fullText.slice(0, length);
      if (length < fullText.length) typingTimer = setTimeout(typeNext, 42);
      else {
        stopTyping();
        text.removeAttribute("aria-hidden");
        setSaveStatus(fullText);
        requestAnimationFrame(syncFlipMinHeight);
      }
    }
    typeNext();
  }

  function pick() {
    const available = choices.filter(choice => choice !== message);
    const pool = available.length ? available : choices;
    return pool[Math.floor(Math.random() * pool.length)];
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
    silver.addColorStop(0, isNotebook() ? "#ffc6e7" : "#b8bfce");
    silver.addColorStop(0.45, isNotebook() ? "#ffe6f3" : "#eef0f6");
    silver.addColorStop(1, isNotebook() ? "#ff92d1" : "#a5adbf");
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
    ctx.font = `bold ${width < 280 ? 15 : 18}px system-ui, sans-serif`;
    ctx.fillText(isNotebook() ? "✨ Tap to type ✨" : "✦ Scratch to reveal ✦", width / 2, height / 2 - 10);
    ctx.font = "13px system-ui, sans-serif";
    ctx.fillText("A little kindness, just for you", width / 2, height / 2 + 18);
    if (!isNotebook()) strokes.forEach(eraseStroke);
  }

  function reveal() {
    if (revealed && !isNotebook() && ctx) {
      stopTyping();
      message = pick();
      revealed = false;
      activePointer = null;
      strokes = [];
      text.textContent = `“${message}”`;
      text.setAttribute("aria-hidden", "true");
      canvas.hidden = false;
      updateLabels();
      paint();
      setSaveStatus("A fresh affirmation is ready to scratch!");
      requestAnimationFrame(syncFlipMinHeight);
      return;
    }
    if (revealed) message = pick();
    revealed = true;
    activePointer = null;
    canvas.hidden = true;
    showMessage();
    updateLabels();
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
    if (isNotebook()) return;
    event.preventDefault();
    activePointer = event.pointerId;
    canvas.setPointerCapture(event.pointerId);
    const stroke = [point(event)];
    strokes.push(stroke);
    eraseStroke(stroke);
  });
  canvas.addEventListener("click", () => {
    if (isNotebook() && !revealed) reveal();
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
    themeChanged() {
      if (typingTimer !== null) {
        stopTyping();
        text.textContent = `“${message}”`;
        text.removeAttribute("aria-hidden");
      }
      updateLabels();
      requestAnimationFrame(paint);
    },
    reset(saved) {
      stopTyping();
      activePointer = null;
      strokes = [];
      message = saved || pick();
      revealed = Boolean(saved);
      canvas.hidden = revealed || !ctx;
      text.textContent = `“${message}”`;
      if (revealed) text.removeAttribute("aria-hidden");
      else text.setAttribute("aria-hidden", "true");
      updateLabels();
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
  entry.morning.pictureOfDayRemoved = !dataUrl;
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
}

function init() {
  const today = new Date();
  viewYear = today.getFullYear();
  viewMonthIndex = today.getMonth();
  selectedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  scratchTickets.morning = createScratchTicket(document.getElementById("morningScratch"), els.affirmationText, els.revealAffirmationBtn, "affirmation", MORNING_AFFIRMATIONS);
  scratchTickets.night = createScratchTicket(document.getElementById("nightScratch"), els.nightAffirmationText, els.revealNightAffirmationBtn, "nightAffirmation", NIGHT_AFFIRMATIONS);
  wireEvents();
  showWeatherCard(true);
  getWeatherAndShow();
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

