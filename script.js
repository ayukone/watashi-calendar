const STORAGE_KEY = "selfCareCalendar.v1";

const defaultHabits = [
  { id: "morning-protein", name: "朝プロテイン", emoji: "🥛" },
  { id: "movement", name: "運動", emoji: "🏃" },
  { id: "sleep-22", name: "22時就寝", emoji: "🌙" },
];

const praiseMessages = {
  "朝プロテイン": "朝のレール成功！今日の自分を守れたね",
  "運動": "身体への投資完了。1年後のあなたに届いてるよ",
  "22時就寝": "明日の私へのプレゼントだね",
  "掃除10分": "空間を整えるのは、自分を大切にすること",
  "本音を優先した": "今日は自分を後回しにしなかったね",
  "彼に合わせすぎなかった": "自分の生活を守れた。すごく大事な一歩",
  "スマホを見すぎなかった": "時間を取り戻せたね。えらい",
  "吐かなかった": "身体を守れた日。よく踏ん張ったね",
  "自分を責めなかった": "責めないことも立派な回復",
};

const aiTemplates = {
  zero: [
    "今日は全部できなかったとしても、記録を開いた時点で戻ってきてるよ。大丈夫、明日は{goal}で勝ちにしよう。",
    "0個の日があっても、あなたの価値が下がるわけじゃない。今日は疲れていただけかもしれない。戻れる仕組みがあるから大丈夫。",
    "今日は休息日だったね。何かを積み上げる日だけじゃなく、立て直すための日もちゃんと必要だよ。",
  ],
  some: [
    "ひとつできたなら十分。今までの自分を責めるためじゃなくて、これからの自分を守るための記録だよ。",
    "今日は{count}つできたね。完璧じゃなくても、自分を大切にする行動はちゃんと積み上がってるよ。",
    "小さな達成は、未来の自分への信頼になるよ。今日できたことをちゃんと見てあげよう。",
  ],
  full: [
    "今日は全部できたね。未来の自分がきっと喜んでるよ。ここまで整えられた自分を、やさしく誇っていい日。",
    "満点の日も、休む日も、どちらもあなたの生活の一部。今日は自分を守る選択がたくさんできたね。",
    "今日の積み重ねは、明日の安心に変わっていくよ。とても大切な一日になったね。",
  ],
};

const state = loadState();
let currentDate = new Date();
let selectedKey = toKey(new Date());
let toastTimer;

const monthTitle = document.querySelector("#monthTitle");
const calendarGrid = document.querySelector("#calendarGrid");
const todayLabel = document.querySelector("#todayLabel");
const todayScore = document.querySelector("#todayScore");
const todayMood = document.querySelector("#todayMood");
const miniGoal = document.querySelector("#miniGoal");
const goalMessage = document.querySelector("#goalMessage");
const monthTotal = document.querySelector("#monthTotal");
const monthEncourage = document.querySelector("#monthEncourage");
const habitStats = document.querySelector("#habitStats");
const dayModal = document.querySelector("#dayModal");
const modalDate = document.querySelector("#modalDate");
const dayMessage = document.querySelector("#dayMessage");
const habitChecks = document.querySelector("#habitChecks");
const dayMemo = document.querySelector("#dayMemo");
const aiMessage = document.querySelector("#aiMessage");
const habitModal = document.querySelector("#habitModal");
const habitEditorList = document.querySelector("#habitEditorList");
const toast = document.querySelector("#toast");
const importJson = document.querySelector("#importJson");

document.querySelector("#prevMonth").addEventListener("click", () => changeMonth(-1));
document.querySelector("#nextMonth").addEventListener("click", () => changeMonth(1));
document.querySelector("#saveGoal").addEventListener("click", saveGoal);
document.querySelector("#generateMessage").addEventListener("click", generateAiMessage);
document.querySelector("#openHabitEditor").addEventListener("click", openHabitModal);
document.querySelector("#addHabitForm").addEventListener("submit", addHabit);
document.querySelector("#exportJson").addEventListener("click", exportJson);
importJson.addEventListener("change", importBackup);

document.querySelectorAll("[data-close-modal]").forEach((element) => {
  element.addEventListener("click", closeDayModal);
});

document.querySelectorAll("[data-close-habit-modal]").forEach((element) => {
  element.addEventListener("click", closeHabitModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDayModal();
    closeHabitModal();
  }
});

render();

function loadState() {
  const fallback = {
    habits: defaultHabits,
    days: {},
    settings: {
      miniGoal: "朝プロテインだけで勝ち",
    },
  };

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || !Array.isArray(saved.habits)) return fallback;
    return {
      habits: saved.habits.length ? saved.habits : defaultHabits,
      days: saved.days || {},
      settings: { ...fallback.settings, ...(saved.settings || {}) },
    };
  } catch {
    return fallback;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function render() {
  miniGoal.value = state.settings.miniGoal || "";
  renderCalendar();
  renderTodayCard();
  renderMonthSummary();
}

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const todayKey = toKey(new Date());

  monthTitle.textContent = `${year}年 ${month + 1}月`;
  calendarGrid.innerHTML = "";

  for (let i = 0; i < firstDay.getDay(); i += 1) {
    const empty = document.createElement("div");
    empty.className = "day-cell empty";
    calendarGrid.appendChild(empty);
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    const date = new Date(year, month, day);
    const key = toKey(date);
    const record = getDayRecord(key);
    const doneCount = countDone(record);
    const total = state.habits.length;
    const level = getLevel(doneCount, total);

    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = `day-cell level-${level}${key === todayKey ? " today" : ""}`;
    cell.setAttribute("aria-label", `${month + 1}月${day}日 ${doneCount}/${total}`);
    cell.innerHTML = `
      <span class="day-number">${day}</span>
      <span class="day-score">${doneCount}/${total}</span>
      <span class="day-note">${record.memo || getShortMood(doneCount, total)}</span>
    `;
    cell.addEventListener("click", () => openDayModal(key));
    calendarGrid.appendChild(cell);
  }
}

function renderTodayCard() {
  const today = new Date();
  const key = toKey(today);
  const record = getDayRecord(key);
  const doneCount = countDone(record);
  const total = state.habits.length;

  todayLabel.textContent = `${today.getMonth() + 1}/${today.getDate()} 今日`;
  todayScore.textContent = `${doneCount}/${total}`;
  todayMood.textContent = getMood(doneCount, total);
}

function renderMonthSummary() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const prefix = `${year}-${String(month + 1).padStart(2, "0")}`;
  const stats = Object.fromEntries(state.habits.map((habit) => [habit.id, 0]));
  let totalDone = 0;

  Object.entries(state.days).forEach(([key, record]) => {
    if (!key.startsWith(prefix)) return;
    Object.entries(record.checks || {}).forEach(([habitId, checked]) => {
      if (checked && habitId in stats) {
        stats[habitId] += 1;
        totalDone += 1;
      }
    });
  });

  monthTotal.textContent = `今月は合計${totalDone}回、自分を大切にできました`;
  monthEncourage.textContent =
    totalDone === 0
      ? "まだここから。記録を開いたことも、戻る力のひとつ。"
      : "完璧な月じゃなくても、戻ってきた回数がちゃんとある。";

  habitStats.innerHTML = "";
  state.habits.forEach((habit) => {
    const row = document.createElement("div");
    row.className = "habit-stat";
    row.innerHTML = `<span>${habit.emoji} ${habit.name}</span><strong>${stats[habit.id] || 0}回</strong>`;
    habitStats.appendChild(row);
  });
}

function openDayModal(key) {
  selectedKey = key;
  const date = fromKey(key);
  modalDate.textContent = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  aiMessage.textContent = "";
  renderDayModal();
  dayModal.classList.add("open");
  dayModal.setAttribute("aria-hidden", "false");
}

function closeDayModal() {
  dayModal.classList.remove("open");
  dayModal.setAttribute("aria-hidden", "true");
}

function renderDayModal() {
  const record = getDayRecord(selectedKey);
  const doneCount = countDone(record);
  const total = state.habits.length;

  dayMessage.textContent = getMood(doneCount, total);
  dayMemo.value = record.memo || "";
  habitChecks.innerHTML = "";

  state.habits.forEach((habit) => {
    const id = `check-${habit.id}`;
    const row = document.createElement("label");
    row.className = "check-row";
    row.innerHTML = `
      <input id="${id}" type="checkbox" ${record.checks[habit.id] ? "checked" : ""} />
      <span class="check-name">${habit.name}</span>
      <span class="check-emoji">${habit.emoji}</span>
    `;
    row.querySelector("input").addEventListener("change", (event) => {
      updateCheck(habit, event.target.checked);
    });
    habitChecks.appendChild(row);
  });

  dayMemo.oninput = () => {
    const nextRecord = getDayRecord(selectedKey);
    nextRecord.memo = dayMemo.value.trim();
    state.days[selectedKey] = nextRecord;
    saveState();
    renderCalendar();
  };
}

function updateCheck(habit, checked) {
  const record = getDayRecord(selectedKey);
  record.checks[habit.id] = checked;
  state.days[selectedKey] = record;
  saveState();

  if (checked) {
    showToast(praiseMessages[habit.name] || `${habit.name}、できたね。今日の自分を大切にできてるよ`);
  } else {
    showToast("今日は整え直している途中。チェックはいつでも戻せるよ");
  }

  renderDayModal();
  render();
}

function generateAiMessage() {
  const record = getDayRecord(selectedKey);
  const doneCount = countDone(record);
  const total = state.habits.length;
  const key = doneCount === 0 ? "zero" : doneCount === total ? "full" : "some";
  const pool = aiTemplates[key];
  const selected = pool[Math.floor(Math.random() * pool.length)];
  const goal = state.settings.miniGoal || "ひとつだけやる";
  aiMessage.textContent = selected.replace("{count}", doneCount).replace("{goal}", goal);
}

function openHabitModal() {
  renderHabitEditor();
  habitModal.classList.add("open");
  habitModal.setAttribute("aria-hidden", "false");
}

function closeHabitModal() {
  habitModal.classList.remove("open");
  habitModal.setAttribute("aria-hidden", "true");
}

function renderHabitEditor() {
  habitEditorList.innerHTML = "";
  state.habits.forEach((habit) => {
    const row = document.createElement("div");
    row.className = "editor-row";
    row.innerHTML = `
      <input type="text" value="${escapeAttribute(habit.emoji)}" maxlength="2" aria-label="${habit.name}の絵文字" />
      <input type="text" value="${escapeAttribute(habit.name)}" maxlength="24" aria-label="項目名" />
      <button type="button" aria-label="${habit.name}を削除">×</button>
    `;

    const [emojiInput, nameInput] = row.querySelectorAll("input");
    emojiInput.addEventListener("input", () => updateHabit(habit.id, { emoji: emojiInput.value || "🌿" }));
    nameInput.addEventListener("input", () => updateHabit(habit.id, { name: nameInput.value.trim() || habit.name }));
    row.querySelector("button").addEventListener("click", () => removeHabit(habit.id));
    habitEditorList.appendChild(row);
  });
}

function addHabit(event) {
  event.preventDefault();
  const emojiInput = document.querySelector("#newHabitEmoji");
  const nameInput = document.querySelector("#newHabitName");
  const name = nameInput.value.trim();

  if (!name) {
    showToast("項目名を入れると追加できます");
    return;
  }

  state.habits.push({
    id: createId(),
    name,
    emoji: emojiInput.value.trim() || "🌿",
  });

  emojiInput.value = "";
  nameInput.value = "";
  saveState();
  renderHabitEditor();
  render();
  showToast(`${name}を追加しました。今の自分に合わせていこう`);
}

function updateHabit(id, changes) {
  const habit = state.habits.find((item) => item.id === id);
  if (!habit) return;
  Object.assign(habit, changes);
  saveState();
  render();
}

function removeHabit(id) {
  if (state.habits.length <= 1) {
    showToast("項目はひとつ残しておくと、戻る場所が見つけやすいよ");
    return;
  }

  state.habits = state.habits.filter((habit) => habit.id !== id);
  Object.values(state.days).forEach((record) => {
    if (record.checks) delete record.checks[id];
  });
  saveState();
  renderHabitEditor();
  render();
  showToast("項目を整えました。今の生活に合う形で大丈夫");
}

function saveGoal() {
  state.settings.miniGoal = miniGoal.value.trim() || "ひとつだけやる";
  saveState();
  goalMessage.textContent = `${state.settings.miniGoal}。今日はそれだけでも十分。`;
  showToast("最小目標を保存しました");
}

function exportJson() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `self-care-calendar-${toKey(new Date())}.json`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("バックアップを書き出しました");
}

function importBackup(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      if (!Array.isArray(imported.habits) || !imported.days) {
        throw new Error("Invalid backup");
      }

      state.habits = imported.habits;
      state.days = imported.days;
      state.settings = { miniGoal: "朝プロテインだけで勝ち", ...(imported.settings || {}) };
      saveState();
      render();
      showToast("バックアップを読み込みました。戻る場所を復元したよ");
    } catch {
      showToast("読み込めませんでした。JSONファイルを確認してね");
    } finally {
      importJson.value = "";
    }
  };
  reader.readAsText(file);
}

function changeMonth(amount) {
  currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + amount, 1);
  render();
}

function getDayRecord(key) {
  const existing = state.days[key] || {};
  return {
    checks: { ...(existing.checks || {}) },
    memo: existing.memo || "",
  };
}

function countDone(record) {
  return state.habits.reduce((sum, habit) => sum + (record.checks[habit.id] ? 1 : 0), 0);
}

function getLevel(doneCount, total) {
  if (doneCount === 0) return 0;
  if (doneCount === total) return 4;
  const ratio = doneCount / total;
  if (ratio < 0.4) return 1;
  if (ratio < 0.8) return 2;
  return 3;
}

function getMood(doneCount, total) {
  if (doneCount === 0) return "今日は休息日。戻る場所はちゃんとあるよ";
  if (doneCount === total) return "最高！未来の自分が喜んでるよ";
  if (doneCount / total < 0.5) return "ひとつできた。ちゃんと前に進んでる";
  return "十分えらい。今日の自分を大切にできたね";
}

function getShortMood(doneCount, total) {
  if (doneCount === 0) return "休息日";
  if (doneCount === total) return "未来の自分へ";
  return "ひとつできた";
}

function toKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function fromKey(key) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function createId() {
  return `habit-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}
