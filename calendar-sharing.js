const calendarPairKey = "cj.calendar.pair.v1";
let familyCode = localStorage.getItem(calendarPairKey) || "";
let familySnapshot = null;
let calendarBusy = false;

function localCalendarItems(entries) {
  return Object.entries(entries).flatMap(([date, entry]) =>
    (entry?.calendarItems || []).map(({id, kind, title, important = false, time = ""}) => ({id, date, kind, title, time, important})));
}

async function calendarRequest(code, body) {
  const response = await fetch("/.netlify/functions/calendar", {
    method: body ? "PUT" : "GET",
    headers: { Authorization: "Bearer " + code, "Content-Type": "application/json" },
    cache: "no-store", ...(body ? { body: JSON.stringify(body) } : {})
  });
  if (!response.ok) throw new Error(response.status === 409
    ? "The calendar changed on another device. Reload and try again."
    : "Couldn’t connect to the shared calendar. Check the code and your connection.");
  return response.json();
}

function calendarMessage(text) {
  document.getElementById("calendarMessage").textContent = text;
}

async function runCalendarAction(action) {
  if (calendarBusy) return;
  calendarBusy = true;
  try { await action(); } catch (error) { calendarMessage(error.message); }
  finally { calendarBusy = false; }
}

async function refreshFamilyCalendar() {
  if (!familyCode || calendarBusy || document.hidden) return;
  await runCalendarAction(async () => {
    const data = await calendarRequest(familyCode);
    if (data.revision !== familySnapshot?.revision) {
      familySnapshot = data;
      renderCalendar();
    }
    calendarMessage("Shared calendar connected.");
  });
}

function initCalendarSharing() {
  const input = document.getElementById("pairCode");
  const showState = () => {
    document.getElementById("startSharing").hidden = Boolean(familyCode);
    document.getElementById("joinSharing").hidden = Boolean(familyCode);
    document.getElementById("leaveSharing").hidden = !familyCode;
    input.readOnly = Boolean(familyCode);
    input.value = familyCode;
  };
  const connect = async (create) => {
    const code = create ? Array.from(crypto.getRandomValues(new Uint8Array(32)),
      byte => byte.toString(16).padStart(2,"0")).join("") : input.value.trim().toLowerCase();
    if (!/^[a-f0-9]{64}$/.test(code)) throw new Error("Paste the full calendar code from the first device.");
    if (create) await calendarRequest(code, {items: localCalendarItems(loadAllEntries())});
    const data = await calendarRequest(code);
    localStorage.setItem(calendarPairKey, code);
    familyCode = code;
    familySnapshot = data;
    showState();
    renderCalendar();
    calendarMessage("Connected. Use this private code to join from another device.");
  };
  document.getElementById("startSharing").onclick = () => runCalendarAction(() => connect(true));
  document.getElementById("joinSharing").onclick = () => runCalendarAction(() => connect(false));
  document.getElementById("leaveSharing").onclick = () => runCalendarAction(() => {
    localStorage.removeItem(calendarPairKey);
    familyCode = "";
    familySnapshot = null;
    showState();
    renderCalendar();
    calendarMessage("This device is showing its local calendar.");
  });
  showState();
  refreshFamilyCalendar();
  window.addEventListener("focus", refreshFamilyCalendar);
  setInterval(refreshFamilyCalendar, 30000);
}

async function changeCalendarItem(original, next) {
  if (familyCode) {
    if (!familySnapshot) throw new Error("Reconnect to the shared calendar before saving.");
    const items = familySnapshot.items.filter(item => item.id !== original?.id);
    if (next) items.push(next);
    const result = await calendarRequest(familyCode, {items, revision:familySnapshot.revision});
    familySnapshot = {items, revision:result.revision};
  } else {
    const entries = loadAllEntries();
    if (original) {
      const entry = getEntry(entries, original.date);
      entry.calendarItems = (entry.calendarItems || []).filter(item => item.id !== original.id);
    }
    if (next) (getEntry(entries,next.date).calendarItems ||= []).push(next);
    saveAllEntries(entries);
  }
}
document.addEventListener("DOMContentLoaded", initCalendarSharing);
