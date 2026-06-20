const STORAGE_KEY = "selfCareCalendar.v1";

const defaultHabits = [
  { id: "strength-training", name: "筋トレ", emoji: "icon-dumbbell.png" },
  { id: "take-break", name: "休憩をとる", emoji: "icon-cup.png" },
  { id: "sleep-22", name: "22時就寝", emoji: "🌙" },
  { id: "walk", name: "散歩", emoji: "icon-sun.png" },
  { id: "study", name: "勉強", emoji: "icon-book.png" },
];

const iconAssets = [
  "icon-sun.png",
  "icon-dumbbell.png",
  "icon-moon.png",
  "icon-book.png",
  "icon-drop.png",
  "icon-heart.png",
  "icon-flower.png",
  "icon-sakura.png",
  "icon-music.png",
  "icon-cup.png",
];

const iconFallbacks = {
  "🥛": "icon-cup.png",
  "🏃": "icon-dumbbell.png",
  "🌙": "icon-moon.png",
  "☀️": "icon-sun.png",
  "📖": "icon-book.png",
  "💧": "icon-drop.png",
  "♡": "icon-heart.png",
  "🌸": "icon-sakura.png",
  "🎵": "icon-music.png",
};

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

const dailyMessages = [
  "今日は休息日。戻る場所はちゃんとあるよ。記録を開いたことも、自分を置いていかない小さな合図。",
  "何度やめても大丈夫。戻ってきた今が、ちゃんと花丸の日。",
  "完璧じゃなくていいよ。今日のあなたが少しでも自分の味方でいられたなら、それで十分。",
  "続かなかった日があっても、ここに戻ってきたなら前に進んでいるよ。",
  "小さな一歩は、小さいままでも価値がある。",
  "今日の自分にできることをひとつ。未来の自分はそれだけでも嬉しいはず。",
  "焦らなくて大丈夫。あなたにはあなたのペースがある。",
  "頑張れない日も人生には必要。そんな日もここに置いていこう。",
  "昨日より少し整ったなら、それは立派な前進。",
  "結果より、戻ってこようと思えた気持ちを大切に。",
  "今日の記録は、未来の自分への優しい手紙。",
  "うまくできた日も、できなかった日も、どちらもあなたの一部。",
  "自分を責めるより、自分を見つけてあげよう。",
  "今日は少しだけでいい。その少しが積み重なる。",
  "立ち止まることと、諦めることは違うよ。",
  "やる気はなくても大丈夫。まず開けたことがすごい。",
  "自分を大切にする練習は、何歳からでも始められる。",
  "今日ここにいるあなたは、昨日のあなたより優しいかもしれない。",
  "頑張ったことだけじゃなく、耐えたことも数えていい。",
  "見えない成長もちゃんと育っているよ。",
  "できたことを探そう。小さくてもちゃんとある。",
  "今日は花丸じゃなくても大丈夫。戻ってきたからもう十分。",
  "未来を変えるのは、大きな決意より小さな習慣。",
  "ひと休みしながらでも、進んでいることは変わらない。",
  "あなたは思っているよりずっと頑張っている。",
  "毎日じゃなくてもいい。戻れることが大切。",
  "できない日があるから、できた日が輝く。",
  "ここは競争の場所じゃない。自分を迎えに来る場所。",
  "今日の選択ひとつが、明日の安心につながる。",
  "ゆっくりでも、自分を置いていかなければ大丈夫。",
  "おかえり。また会えてうれしいよ。",
];

const state = loadState();
let currentDate = new Date();
let selectedKey = toKey(new Date());
let toastTimer;
let reflectionPeriod = "week";
let templateDraftHabitIds = [];
let taskSetDraftHabitIds = [];
let lastRewardAchievement = null;

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
const dayTaskForm = document.querySelector("#dayTaskForm");
const dayTaskSelect = document.querySelector("#dayTaskSelect");
const aiMessage = document.querySelector("#aiMessage");
const habitModal = document.querySelector("#habitModal");
const habitEditorList = document.querySelector("#habitEditorList");
const toast = document.querySelector("#toast");
const importJson = document.querySelector("#importJson");
const navLinks = document.querySelectorAll("[data-nav-view]");
const bottomNav = document.querySelector(".bottom-nav");
const views = document.querySelectorAll(".view");
const topHabits = document.querySelector("#topHabits");
const messageHistory = document.querySelector("#messageHistory");
const periodTabs = document.querySelectorAll("[data-period]");
const periodLabel = document.querySelector("#periodLabel");
const progressRing = document.querySelector("#progressRing");
const progressPercent = document.querySelector("#progressPercent");
const progressCount = document.querySelector("#progressCount");
const weeklyNote = document.querySelector("#weeklyNote");
const weeklyNoteSub = document.querySelector("#weeklyNoteSub");
const rewardPoints = document.querySelector("#rewardPoints");
const rewardList = document.querySelector("#rewardList");
const addRewardForm = document.querySelector("#addRewardForm");
const settingsHabitEditorList = document.querySelector("#settingsHabitEditorList");
const settingsAddHabitForm = document.querySelector("#settingsAddHabitForm");
const settingsMiniGoal = document.querySelector("#settingsMiniGoal");
const saveSettingsGoal = document.querySelector("#saveSettingsGoal");
const settingsIconPreview = document.querySelector("#settingsIconPreview");
const templateList = document.querySelector("#templateList");
const templateForm = document.querySelector("#templateForm");
const templateName = document.querySelector("#templateName");
const templateHabitPicker = document.querySelector("#templateHabitPicker");
const templateSelected = document.querySelector("#templateSelected");
const applyTemplateForm = document.querySelector("#applyTemplateForm");
const templateSelect = document.querySelector("#templateSelect");
const taskSetList = document.querySelector("#taskSetList");
const taskSetForm = document.querySelector("#taskSetForm");
const taskSetHabitPicker = document.querySelector("#taskSetHabitPicker");
const taskSetSelected = document.querySelector("#taskSetSelected");
const reflectionTargetWeek = document.querySelector("#reflectionTargetWeek");
const reflectionTargetMonth = document.querySelector("#reflectionTargetMonth");
const reflectionTargetAll = document.querySelector("#reflectionTargetAll");
const saveReflectionTarget = document.querySelector("#saveReflectionTarget");
const rewardCelebrateModal = document.querySelector("#rewardCelebrateModal");
const rewardSpentDisplay = document.querySelector("#rewardSpentDisplay");
const rewardRemainingDisplay = document.querySelector("#rewardRemainingDisplay");
const undoRewardAchievement = document.querySelector("#undoRewardAchievement");

document.querySelector("#prevMonth").addEventListener("click", () => changeMonth(-1));
document.querySelector("#nextMonth").addEventListener("click", () => changeMonth(1));
document.querySelector("#saveGoal").addEventListener("click", saveGoal);
const generateMessageButton = document.querySelector("#generateMessage");
if (generateMessageButton) generateMessageButton.addEventListener("click", generateAiMessage);
const openHabitEditorButton = document.querySelector("#openHabitEditor");
if (openHabitEditorButton) {
  openHabitEditorButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    openHabitModal();
  });
}
document.querySelector("#addHabitForm").addEventListener("submit", addHabit);
if (dayTaskForm) dayTaskForm.addEventListener("submit", addDayTask);
if (applyTemplateForm) applyTemplateForm.addEventListener("submit", applyTemplateToDay);
document.querySelector("#exportJson").addEventListener("click", exportJson);
importJson.addEventListener("change", importBackup);

function handleNavEvent(event) {
  const navLink = event.target.closest("[data-nav-view]");
  if (!navLink) return;
  event.preventDefault();
  event.stopPropagation();
  switchView(navLink.dataset.navView);
}

if (bottomNav) {
  bottomNav.addEventListener("pointerdown", handleNavEvent);
  bottomNav.addEventListener("click", handleNavEvent);
}

window.addEventListener("hashchange", () => {
  switchView(getViewFromHash());
});

if (addRewardForm) addRewardForm.addEventListener("submit", addReward);
if (settingsAddHabitForm) settingsAddHabitForm.addEventListener("submit", addHabitFromSettings);
if (templateForm) templateForm.addEventListener("submit", addTemplate);
if (taskSetForm) taskSetForm.addEventListener("submit", addTaskSet);
if (saveSettingsGoal) saveSettingsGoal.addEventListener("click", saveSettingsMiniGoal);
if (saveReflectionTarget) saveReflectionTarget.addEventListener("click", saveReflectionTargetCount);
if (undoRewardAchievement) undoRewardAchievement.addEventListener("click", undoLastRewardAchievement);
if (settingsIconPreview) {
  settingsIconPreview.addEventListener("click", () => {
    const emojiInput = document.querySelector("#settingsNewHabitEmoji");
    const nextIcon = getNextIcon(emojiInput.value);
    emojiInput.value = nextIcon;
    settingsIconPreview.innerHTML = getIconMarkup(nextIcon, "settings-icon-img");
  });
}

document.querySelectorAll("[data-theme-choice]").forEach((button) => {
  button.addEventListener("click", () => setTheme(button.dataset.themeChoice));
});

periodTabs.forEach((button) => {
  button.addEventListener("click", () => {
    reflectionPeriod = button.dataset.period;
    renderReflection();
  });
});

document.querySelectorAll("[data-close-modal]").forEach((element) => {
  element.addEventListener("click", closeDayModal);
});

document.querySelectorAll("[data-close-habit-modal]").forEach((element) => {
  element.addEventListener("click", closeHabitModal);
});

document.querySelectorAll("[data-close-reward-modal]").forEach((element) => {
  element.addEventListener("click", () => {
    closeRewardModal();
    if (element.dataset.navView) switchView(element.dataset.navView);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDayModal();
    closeHabitModal();
  }
});

render();
switchView(getViewFromHash());

function loadState() {
  const fallback = {
    habits: defaultHabits,
    days: {},
    rewards: [
      { id: "reward-cafe", name: "カフェでゆっくりする", cost: 100, achieved: false },
      { id: "reward-cosme", name: "お気に入りのコスメを買う", cost: 300, achieved: false },
      { id: "reward-trip", name: "ちょっとしたお出かけ", cost: 500, achieved: false },
    ],
    rewardSpent: 0,
    messageHistory: [],
    templates: [],
    taskSets: [],
    settings: {
      miniGoal: "朝プロテインだけで勝ち",
      theme: "rose",
      reflectionTargets: {
        week: 6,
        month: 30,
        all: 100,
      },
    },
  };

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || !Array.isArray(saved.habits)) return fallback;
    return {
      habits: saved.habits.length ? saved.habits : defaultHabits,
      days: saved.days || {},
      rewards: Array.isArray(saved.rewards) ? saved.rewards : fallback.rewards,
      rewardSpent: Number(saved.rewardSpent || 0),
      messageHistory: Array.isArray(saved.messageHistory) ? saved.messageHistory : [],
      templates: Array.isArray(saved.templates) ? saved.templates : [],
      taskSets: Array.isArray(saved.taskSets) ? saved.taskSets : [],
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
  if (settingsMiniGoal) settingsMiniGoal.value = state.settings.miniGoal || "";
  renderReflectionTargetInputs();
  if (!["rose", "beige", "lavender", "night"].includes(state.settings.theme)) {
    state.settings.theme = state.settings.theme === "lilac" ? "lavender" : "rose";
    saveState();
  }
  document.documentElement.dataset.theme = state.settings.theme || "rose";
  renderThemeChoices();
  renderCalendar();
  renderTodayCard();
  renderMonthSummary();
  renderReflection();
  renderRewards();
  renderSettingsHabitEditor();
  renderHabitPickers();
  renderTemplates();
  renderTaskSets();
  renderDayTaskSelect();
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
    const doneCount = countDone(record, key);
    const total = getDayHabits(record, key).length;
    const level = getLevel(doneCount, total);

    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = `day-cell level-${level}${key === todayKey ? " today" : ""}`;
    cell.setAttribute("aria-label", `${month + 1}月${day}日 ${doneCount}/${total}`);
    cell.innerHTML = `
      <span class="day-number">${day}</span>
      <span class="day-score" aria-hidden="true">${getDayMarks(doneCount, total)}</span>
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
  const doneCount = countDone(record, key);
  const total = getDayHabits(record, key).length;
  const messageIndex = today.getDate() - 1;

  if (todayLabel) todayLabel.textContent = `${today.getMonth() + 1}/${today.getDate()} 今日`;
  if (todayScore) todayScore.textContent = `${doneCount}/${total}`;
  todayMood.textContent = dailyMessages[messageIndex] || dailyMessages[0];
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
      if (checked) {
        totalDone += 1;
        if (habitId in stats) {
          stats[habitId] += 1;
        }
      }
    });
  });

  if (monthTotal) monthTotal.textContent = `今月は合計${totalDone}回、自分を大切にできました`;
  if (monthEncourage) {
    monthEncourage.textContent =
      totalDone === 0
        ? "まだここから。記録を開いたことも、戻る力のひとつ。"
        : "完璧な月じゃなくても、戻ってきた回数がちゃんとある。";
  }

  if (habitStats) {
    habitStats.innerHTML = "";
    state.habits.forEach((habit) => {
      const row = document.createElement("div");
      row.className = "habit-stat";
      row.innerHTML = `<span>${habit.emoji} ${habit.name}</span><strong>${stats[habit.id] || 0}回</strong>`;
      habitStats.appendChild(row);
    });
  }
}

function getMonthStats() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const prefix = `${year}-${String(month + 1).padStart(2, "0")}`;
  const stats = Object.fromEntries(state.habits.map((habit) => [habit.id, 0]));
  let totalDone = 0;

  Object.entries(state.days).forEach(([key, record]) => {
    if (!key.startsWith(prefix)) return;
    Object.entries(record.checks || {}).forEach(([habitId, checked]) => {
      if (checked) {
        totalDone += 1;
        if (habitId in stats) {
          stats[habitId] += 1;
        }
      }
    });
  });

  return { stats, totalDone };
}

function getReflectionRange() {
  const today = new Date();
  const start = new Date(today);
  const end = new Date(today);

  if (reflectionPeriod === "week") {
    start.setDate(today.getDate() - 6);
  } else if (reflectionPeriod === "month") {
    start.setDate(1);
  } else {
    return { start: null, end: null, label: "全期間" };
  }

  return { start, end, label: `${start.getMonth() + 1}/${start.getDate()} ～ ${end.getMonth() + 1}/${end.getDate()}` };
}

function getStatsForRange() {
  const { start, end, label } = getReflectionRange();
  const stats = Object.fromEntries(state.habits.map((habit) => [habit.id, 0]));
  let totalDone = 0;
  let totalPossible = 0;

  Object.entries(state.days).forEach(([key, record]) => {
    const date = fromKey(key);
    if (start && date < stripTime(start)) return;
    if (end && date > stripTime(end)) return;

    totalPossible += getDayHabits(record, key).length;
    Object.entries(record.checks || {}).forEach(([habitId, checked]) => {
      if (checked) {
        totalDone += 1;
        if (habitId in stats) {
          stats[habitId] += 1;
        }
      }
    });
  });

  if (reflectionPeriod !== "all" && totalPossible === 0) {
    const days = reflectionPeriod === "week" ? 7 : new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    totalPossible = days * state.habits.length;
  }

  return { stats, totalDone, totalPossible, label };
}

function getReflectionTargets() {
  const oldTarget = Number(state.settings.reflectionTarget);
  const defaults = {
    week: Number.isFinite(oldTarget) && oldTarget > 0 ? oldTarget : 6,
    month: 30,
    all: 100,
  };
  const savedTargets = state.settings.reflectionTargets || {};
  return Object.fromEntries(
    Object.entries(defaults).map(([period, defaultValue]) => {
      const savedValue = Number(savedTargets[period]);
      const value = Number.isFinite(savedValue) && savedValue > 0 ? savedValue : defaultValue;
      return [period, Math.round(value)];
    }),
  );
}

function getReflectionTarget(period = reflectionPeriod) {
  return getReflectionTargets()[period] || 6;
}

function renderReflectionTargetInputs() {
  const targets = getReflectionTargets();
  if (reflectionTargetWeek) reflectionTargetWeek.value = targets.week;
  if (reflectionTargetMonth) reflectionTargetMonth.value = targets.month;
  if (reflectionTargetAll) reflectionTargetAll.value = targets.all;
}

function renderReflection() {
  if (!topHabits) return;
  const { stats, totalDone, label } = getStatsForRange();
  const targetTotal = getReflectionTarget();
  const percent = Math.min(100, Math.round((totalDone / targetTotal) * 100));

  periodLabel.textContent = label;
  progressPercent.textContent = `${percent}%`;
  progressCount.textContent = `${totalDone} / ${targetTotal}`;
  progressRing.style.setProperty("--progress", percent);

  periodTabs.forEach((button) => {
    button.classList.toggle("active", button.dataset.period === reflectionPeriod);
  });

  const ranked = state.habits
    .map((habit) => ({ ...habit, count: stats[habit.id] || 0 }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  topHabits.innerHTML = ranked.length
    ? ranked
        .map(
          (habit, index) => `
            <div class="rank-row">
              <span>${index + 1}</span>
              <i>${getIconMarkup(habit.emoji, "tiny-habit-icon")}</i>
              <strong>${habit.name}</strong>
              <em>${habit.count}回</em>
            </div>
          `,
        )
        .join("")
    : `<p class="empty-text">今月の自分を、ここから見つけていこう。</p>`;

  const note = getReflectionNote(percent, totalDone);
  weeklyNote.textContent = note.title;
  weeklyNoteSub.textContent = note.body;
}

function getAllTimeDoneCount() {
  return Object.entries(state.days).reduce((sum, [key, record]) => sum + countDone(record, key), 0);
}

function getAvailableRewardPoints() {
  return Math.max(0, getAllTimeDoneCount() * 10 - Number(state.rewardSpent || 0));
}

function renderRewards() {
  if (!rewardPoints || !rewardList) return;
  const points = getAvailableRewardPoints();
  rewardPoints.innerHTML = `${points}<span class="point-unit">pt</span>`;

  rewardList.innerHTML = state.rewards.length
    ? state.rewards
        .map(
          (reward) => `
            <article class="reward-item ${reward.achieved ? "achieved" : ""}">
              <div>
                <strong>${reward.name}</strong>
                <span>${reward.cost} pt</span>
              </div>
              <button class="reward-achieve-button" type="button" data-achieve-reward="${reward.id}" ${reward.achieved ? "disabled" : ""}>
                ${reward.achieved ? "達成済み" : "達成"}
              </button>
              <button class="reward-delete-button" type="button" data-delete-reward="${reward.id}" aria-label="${reward.name}を削除">×</button>
            </article>
          `,
        )
        .join("")
    : `<p class="empty-text">自分が喜ぶ予定を追加してね。</p>`;

  rewardList.querySelectorAll("[data-achieve-reward]").forEach((button) => {
    button.addEventListener("click", () => achieveReward(button.dataset.achieveReward));
  });
  rewardList.querySelectorAll("[data-delete-reward]").forEach((button) => {
    button.addEventListener("click", () => removeReward(button.dataset.deleteReward));
  });
}

function openDayModal(key) {
  selectedKey = key;
  const date = fromKey(key);
  modalDate.textContent = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  if (aiMessage) aiMessage.textContent = "";
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
  const doneCount = countDone(record, selectedKey);
  const total = getDayHabits(record, selectedKey).length;

  dayMessage.textContent = getMood(doneCount, total);
  dayMemo.value = record.memo || "";
  habitChecks.innerHTML = "";
  renderDayTaskSelect();

  getScheduledHabitsForDate(selectedKey, record).forEach((habit) => {
    const id = `check-${habit.id}`;
    const row = document.createElement("div");
    row.className = "check-row scheduled-row";
    row.innerHTML = `
      <input id="${id}" type="checkbox" ${record.checks[habit.id] ? "checked" : ""} />
      <span class="check-name">${habit.name}</span>
      <em class="set-badge">${habit.setName}</em>
      <span class="check-emoji">${getIconMarkup(habit.emoji)}</span>
      <button class="delete-habit-button" type="button" aria-label="${habit.name}を今日だけ外す">×</button>
    `;
    row.querySelector("input").addEventListener("change", (event) => {
      updateCheck(habit, event.target.checked);
    });
    row.querySelector(".delete-habit-button").addEventListener("click", () => hideScheduledTask(habit.id));
    habitChecks.appendChild(row);
  });

  record.customHabits.forEach((habit) => {
    const id = `check-${habit.id}`;
    const row = document.createElement("div");
    row.className = "check-row day-custom-row";
    row.innerHTML = `
      <input id="${id}" type="checkbox" ${record.checks[habit.id] ? "checked" : ""} />
      <input class="day-task-name-input" type="text" value="${escapeAttribute(habit.name)}" maxlength="24" aria-label="今日だけの項目名" />
      <button class="delete-habit-button" type="button" aria-label="${habit.name}を削除">×</button>
    `;
    row.querySelector("input[type='checkbox']").addEventListener("change", (event) => {
      updateCheck(habit, event.target.checked);
    });
    row.querySelector(".day-task-name-input").addEventListener("input", (event) => {
      updateDayTaskName(habit.id, event.target.value);
    });
    row.querySelector(".delete-habit-button").addEventListener("click", () => removeDayTask(habit.id));
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

function addDayTask(event) {
  event.preventDefault();
  const habit = state.habits.find((item) => item.id === dayTaskSelect.value);
  if (!habit) {
    showToast("追加する項目を選んでね");
    return;
  }

  const record = getDayRecord(selectedKey);
  record.customHabits.push({ id: createId(), sourceHabitId: habit.id, name: habit.name, emoji: getHabitIcon(habit.emoji) });
  state.days[selectedKey] = record;
  dayTaskSelect.value = "";
  saveState();
  renderDayModal();
  render();
  showToast("今日の項目に追加しました");
}

function applyTemplateToDay(event) {
  event.preventDefault();
  const template = state.templates.find((item) => item.id === templateSelect.value);
  if (!template) {
    showToast("呼び出すテンプレートを選んでね");
    return;
  }

  const record = getDayRecord(selectedKey);
  const existingSourceIds = new Set(record.customHabits.map((habit) => habit.sourceHabitId).filter(Boolean));
  template.tasks.forEach((task) => {
    if (task.sourceHabitId && existingSourceIds.has(task.sourceHabitId)) return;
    record.customHabits.push({
      id: createId(),
      sourceHabitId: task.sourceHabitId || "",
      name: task.name,
      emoji: task.icon || "icon-heart.png",
    });
  });
  state.days[selectedKey] = record;
  templateSelect.value = "";
  saveState();
  renderDayModal();
  render();
  showToast("テンプレートを呼び出しました");
}

function updateDayTaskName(id, name) {
  const record = getDayRecord(selectedKey);
  const habit = record.customHabits.find((item) => item.id === id);
  if (!habit) return;
  habit.name = name.trim() || "今日だけの項目";
  state.days[selectedKey] = record;
  saveState();
  renderCalendar();
}

function hideScheduledTask(id) {
  const record = getDayRecord(selectedKey);
  record.hiddenScheduled = [...new Set([...(record.hiddenScheduled || []), id])];
  delete record.checks[id];
  state.days[selectedKey] = record;
  saveState();
  renderDayModal();
  render();
  showToast("この日だけ外しました");
}

function removeDayTask(id) {
  const record = getDayRecord(selectedKey);
  record.customHabits = record.customHabits.filter((item) => item.id !== id);
  delete record.checks[id];
  state.days[selectedKey] = record;
  saveState();
  renderDayModal();
  render();
  showToast("今日だけの項目を外しました");
}

function generateAiMessage() {
  const record = getDayRecord(selectedKey);
  const doneCount = countDone(record, selectedKey);
  const total = getDayHabits(record, selectedKey).length;
  const key = doneCount === 0 ? "zero" : doneCount === total ? "full" : "some";
  const pool = aiTemplates[key];
  const selected = pool[Math.floor(Math.random() * pool.length)];
  const goal = state.settings.miniGoal || "ひとつだけやる";
  const message = selected.replace("{count}", doneCount).replace("{goal}", goal);
  if (aiMessage) aiMessage.textContent = message;
  state.messageHistory = [
    { date: selectedKey, message },
    ...(state.messageHistory || []).filter((item) => item.message !== message || item.date !== selectedKey),
  ].slice(0, 20);
  saveState();
  renderReflection();
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

function closeRewardModal() {
  if (!rewardCelebrateModal) return;
  rewardCelebrateModal.classList.remove("open");
  rewardCelebrateModal.setAttribute("aria-hidden", "true");
}

function renderHabitEditor() {
  habitEditorList.innerHTML = "";
  state.habits.forEach((habit) => {
    const row = document.createElement("div");
    row.className = "editor-row";
    row.innerHTML = `
      <input type="text" value="${escapeAttribute(habit.emoji)}" maxlength="2" aria-label="${habit.name}の絵文字" />
      <input type="text" value="${escapeAttribute(habit.name)}" maxlength="24" aria-label="項目名" />
      <button class="delete-habit-button" type="button" aria-label="${habit.name}を削除">×</button>
    `;

    const [emojiInput, nameInput] = row.querySelectorAll("input");
    emojiInput.addEventListener("input", () => updateHabit(habit.id, { emoji: emojiInput.value || "🌿" }));
    nameInput.addEventListener("input", () => updateHabit(habit.id, { name: nameInput.value.trim() || habit.name }));
    row.querySelector(".delete-habit-button").addEventListener("click", () => removeHabit(habit.id));
    habitEditorList.appendChild(row);
  });
}

function renderSettingsHabitEditor() {
  if (!settingsHabitEditorList) return;
  settingsHabitEditorList.innerHTML = "";
  state.habits.forEach((habit) => {
    const row = document.createElement("div");
    row.className = "editor-row";
    row.innerHTML = `
      <button class="icon-select" type="button" data-icon-habit="${habit.id}" aria-label="${habit.name}のアイコンを変更">
        ${getIconMarkup(habit.emoji, "settings-icon-img")}
      </button>
      <input type="hidden" value="${escapeAttribute(getHabitIcon(habit.emoji))}" aria-label="${habit.name}のアイコン" />
      <input type="text" value="${escapeAttribute(habit.name)}" maxlength="24" aria-label="項目名" />
      <button class="delete-habit-button" type="button" aria-label="${habit.name}を削除">×</button>
    `;

    const [emojiInput, nameInput] = row.querySelectorAll("input");
    row.querySelector("[data-icon-habit]").addEventListener("click", () => {
      const nextIcon = getNextIcon(emojiInput.value);
      emojiInput.value = nextIcon;
      updateHabit(habit.id, { emoji: nextIcon });
    });
    nameInput.addEventListener("input", () => updateHabit(habit.id, { name: nameInput.value.trim() || habit.name }));
    row.querySelector(".delete-habit-button").addEventListener("click", () => removeHabit(habit.id));
    settingsHabitEditorList.appendChild(row);
  });
}

function renderTemplates() {
  if (!templateList) return;
  templateList.innerHTML = state.templates.length
    ? state.templates
        .map(
          (template) => `
            <article class="task-set-item">
              <div>
                <strong>${template.name}</strong>
                <p>${(template.tasks || []).map((task) => `${formatTaskIcon(task.icon)}${task.name}`).join("、")}</p>
              </div>
              <button type="button" data-delete-template="${template.id}" aria-label="${template.name}を削除">×</button>
            </article>
          `,
        )
        .join("")
    : `<p class="empty-text">好きな日に呼び出すセットを作れます。</p>`;

  templateList.querySelectorAll("[data-delete-template]").forEach((button) => {
    button.addEventListener("click", () => removeTemplate(button.dataset.deleteTemplate));
  });
  renderTemplateSelect();
}

function renderHabitPickers() {
  renderHabitPicker(templateHabitPicker, templateSelected, templateDraftHabitIds, "template");
  renderHabitPicker(taskSetHabitPicker, taskSetSelected, taskSetDraftHabitIds, "task-set");
}

function renderHabitPicker(container, selectedContainer, selectedIds, type) {
  if (!container || !selectedContainer) return;
  container.innerHTML = state.habits
    .map(
      (habit) => `
        <button type="button" class="${selectedIds.includes(habit.id) ? "selected" : ""}" data-pick-type="${type}" data-habit-id="${habit.id}">
          ${getIconMarkup(habit.emoji, "tiny-habit-icon")}
          <span>${habit.name}</span>
        </button>
      `,
    )
    .join("");
  selectedContainer.innerHTML = selectedIds.length
    ? selectedIds
        .map((id) => state.habits.find((habit) => habit.id === id))
        .filter(Boolean)
        .map((habit) => `<span>${getIconMarkup(habit.emoji, "tiny-habit-icon")}${habit.name}</span>`)
        .join("")
    : `<span>項目を選んでね</span>`;

  container.querySelectorAll("[data-habit-id]").forEach((button) => {
    button.addEventListener("click", () => toggleDraftHabit(type, button.dataset.habitId));
  });
}

function toggleDraftHabit(type, habitId) {
  const target = type === "template" ? templateDraftHabitIds : taskSetDraftHabitIds;
  const next = target.includes(habitId) ? target.filter((id) => id !== habitId) : [...target, habitId];
  if (type === "template") {
    templateDraftHabitIds = next;
  } else {
    taskSetDraftHabitIds = next;
  }
  renderHabitPickers();
}

function renderTemplateSelect() {
  if (!templateSelect) return;
  templateSelect.innerHTML = state.templates.length
    ? `<option value="">テンプレートを選ぶ（設定から追加できます）</option>${state.templates
        .map((template) => `<option value="${template.id}">${template.name}</option>`)
        .join("")}`
    : `<option value="">テンプレートなし（設定から追加できます）</option>`;
  templateSelect.disabled = !state.templates.length;
  if (applyTemplateForm) applyTemplateForm.hidden = false;
}

function renderDayTaskSelect() {
  if (!dayTaskSelect) return;
  const options = state.habits
    .map((habit) => `<option value="${habit.id}">${habit.name}</option>`)
    .join("");
  dayTaskSelect.innerHTML = options ? `<option value="">項目を選ぶ（設定から追加できます）</option>${options}` : `<option value="">追加できる項目なし（設定から追加できます）</option>`;
  dayTaskSelect.disabled = !options;
}

function addTemplate(event) {
  event.preventDefault();
  const name = templateName.value.trim();
  const tasks = habitsToTemplateTasks(templateDraftHabitIds);
  if (!name || !tasks.length) {
    showToast("テンプレート名と項目を入れてね");
    return;
  }

  state.templates.push({ id: createId(), name, tasks });
  templateName.value = "";
  templateDraftHabitIds = [];
  saveState();
  render();
  showToast("テンプレートを追加しました");
}

function removeTemplate(id) {
  state.templates = state.templates.filter((template) => template.id !== id);
  saveState();
  render();
  showToast("テンプレートを外しました");
}

function renderTaskSets() {
  if (!taskSetList) return;
  const weekdayLabels = ["日", "月", "火", "水", "木", "金", "土"];
  taskSetList.innerHTML = state.taskSets.length
    ? state.taskSets
        .map(
          (set) => `
            <article class="task-set-item">
              <div>
                <strong>${(set.weekdays || []).map((day) => weekdayLabels[day]).join("・") || "曜日なし"}</strong>
                <span>曜日テンプレート</span>
                <p>${(set.tasks || []).map((task) => `${formatTaskIcon(task.icon)}${task.name}`).join("、")}</p>
              </div>
              <button type="button" data-delete-task-set="${set.id}" aria-label="曜日テンプレートを削除">×</button>
            </article>
          `,
        )
        .join("")
    : `<p class="empty-text">休みの日セット、頑張る日セットなどを作れます。</p>`;

  taskSetList.querySelectorAll("[data-delete-task-set]").forEach((button) => {
    button.addEventListener("click", () => removeTaskSet(button.dataset.deleteTaskSet));
  });
}

function addTaskSet(event) {
  event.preventDefault();
  const tasks = habitsToTemplateTasks(taskSetDraftHabitIds);
  const weekdays = [...taskSetForm.querySelectorAll(".weekday-picks input:checked")].map((input) => Number(input.value));
  const weekdayLabels = ["日", "月", "火", "水", "木", "金", "土"];
  const name = weekdays.map((day) => weekdayLabels[day]).join("・");

  if (!tasks.length || !weekdays.length) {
    showToast("項目と曜日を選んでね");
    return;
  }

  state.taskSets.push({
    id: createId(),
    name,
    weekdays,
    tasks,
  });
  taskSetDraftHabitIds = [];
  taskSetForm.querySelectorAll(".weekday-picks input").forEach((input) => {
    input.checked = false;
  });
  saveState();
  render();
  showToast("タスクセットを追加しました");
}

function removeTaskSet(id) {
  state.taskSets = state.taskSets.filter((set) => set.id !== id);
  saveState();
  render();
  showToast("タスクセットを外しました");
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
    emoji: emojiInput.value.trim() || "icon-heart.png",
  });

  emojiInput.value = "";
  nameInput.value = "";
  saveState();
  renderHabitEditor();
  render();
  showToast(`${name}を追加しました。今の自分に合わせていこう`);
}

function addHabitFromSettings(event) {
  event.preventDefault();
  const emojiInput = document.querySelector("#settingsNewHabitEmoji");
  const nameInput = document.querySelector("#settingsNewHabitName");
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
  if (settingsIconPreview) {
    emojiInput.value = "icon-heart.png";
    settingsIconPreview.innerHTML = getIconMarkup("icon-heart.png", "settings-icon-img");
  }
  nameInput.value = "";
  saveState();
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
  if (settingsMiniGoal) settingsMiniGoal.value = state.settings.miniGoal;
  showToast("最小目標を保存しました");
}

function saveSettingsMiniGoal() {
  state.settings.miniGoal = settingsMiniGoal.value.trim() || "ひとつだけやる";
  saveState();
  miniGoal.value = state.settings.miniGoal;
  goalMessage.textContent = `${state.settings.miniGoal}。今日はそれだけでも十分。`;
  showToast("最小目標を保存しました");
}

function saveReflectionTargetCount() {
  const currentTargets = getReflectionTargets();
  state.settings.reflectionTargets = {
    week: normalizeTargetValue(reflectionTargetWeek, currentTargets.week),
    month: normalizeTargetValue(reflectionTargetMonth, currentTargets.month),
    all: normalizeTargetValue(reflectionTargetAll, currentTargets.all),
  };
  delete state.settings.reflectionTarget;
  renderReflectionTargetInputs();
  saveState();
  renderReflection();
  showToast("目標達成数を保存しました");
}

function normalizeTargetValue(input, fallback) {
  return Math.max(1, Math.min(999, Math.round(Number(input?.value) || fallback || 1)));
}

function habitsToTemplateTasks(habitIds) {
  return habitIds
    .map((id) => state.habits.find((habit) => habit.id === id))
    .filter(Boolean)
    .map((habit) => ({
      id: createId(),
      sourceHabitId: habit.id,
      name: habit.name,
      icon: getHabitIcon(habit.emoji),
    }));
}

function formatTaskIcon(icon) {
  const normalized = getHabitIcon(icon);
  return normalized.endsWith(".png") ? getIconMarkup(normalized, "tiny-habit-icon") : `${normalized} `;
}

function addReward(event) {
  event.preventDefault();
  const nameInput = document.querySelector("#newRewardName");
  const costInput = document.querySelector("#newRewardCost");
  const name = nameInput.value.trim();
  const cost = Math.max(10, Number(costInput.value || 100));

  if (!name) {
    showToast("ごほうび名を入れると追加できます");
    return;
  }

  state.rewards.push({ id: createId(), name, cost, achieved: false });
  nameInput.value = "";
  costInput.value = "100";
  saveState();
  renderRewards();
  showToast("ごほうびを追加しました。楽しみも予定に入れておこう");
}

function achieveReward(id) {
  const reward = state.rewards.find((item) => item.id === id);
  if (!reward || reward.achieved) return;

  if (getAvailableRewardPoints() < reward.cost) {
    showToast("ポイントは育っている途中。焦らず楽しみに残しておこう");
    return;
  }

  reward.achieved = true;
  state.rewardSpent = Number(state.rewardSpent || 0) + reward.cost;
  lastRewardAchievement = { id: reward.id, cost: reward.cost };
  saveState();
  renderRewards();
  showRewardCelebration(reward.cost, getAvailableRewardPoints());
  showToast(`${reward.name}、叶えていい日だね`);
}

function showRewardCelebration(spent, remaining) {
  if (!rewardCelebrateModal) return;
  rewardSpentDisplay.innerHTML = `${spent}<span>pt</span>`;
  rewardRemainingDisplay.innerHTML = `${remaining}<span>pt</span>`;
  rewardCelebrateModal.classList.add("open");
  rewardCelebrateModal.setAttribute("aria-hidden", "false");
}

function undoLastRewardAchievement() {
  if (!lastRewardAchievement) {
    closeRewardModal();
    return;
  }

  const reward = state.rewards.find((item) => item.id === lastRewardAchievement.id);
  if (reward) reward.achieved = false;
  state.rewardSpent = Math.max(0, Number(state.rewardSpent || 0) - Number(lastRewardAchievement.cost || 0));
  lastRewardAchievement = null;
  saveState();
  renderRewards();
  closeRewardModal();
  showToast("ごほうび達成を取り消しました");
}

function removeReward(id) {
  const reward = state.rewards.find((item) => item.id === id);
  if (!reward) return;

  state.rewards = state.rewards.filter((item) => item.id !== id);
  saveState();
  renderRewards();
  showToast("ごほうびリストから外しました");
}

function setTheme(theme) {
  state.settings.theme = theme;
  saveState();
  document.documentElement.dataset.theme = theme;
  renderThemeChoices();
  showToast("テーマを変更しました");
}

function renderThemeChoices() {
  document.querySelectorAll("[data-theme-choice]").forEach((button) => {
    const active = button.dataset.themeChoice === (state.settings.theme || "rose");
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
}

function switchView(viewName) {
  const targetView = document.querySelector(`[data-view="${viewName}"]`) ? viewName : "calendar";
  views.forEach((view) => {
    view.classList.toggle("active", view.dataset.view === targetView);
  });

  navLinks.forEach((link) => {
    const active = link.dataset.navView === targetView;
    link.classList.toggle("active", active);
    if (active) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  render();
  history.replaceState(null, "", `#${targetView}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function getViewFromHash() {
  return (location.hash || "#calendar").replace("#", "") || "calendar";
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
      state.rewards = Array.isArray(imported.rewards) ? imported.rewards : state.rewards;
      state.rewardSpent = Number(imported.rewardSpent || 0);
      state.messageHistory = Array.isArray(imported.messageHistory) ? imported.messageHistory : [];
      state.templates = Array.isArray(imported.templates) ? imported.templates : [];
      state.taskSets = Array.isArray(imported.taskSets) ? imported.taskSets : [];
      state.settings = {
        miniGoal: "朝プロテインだけで勝ち",
        theme: "rose",
        reflectionTargets: { week: 6, month: 30, all: 100 },
        ...(imported.settings || {}),
      };
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
    customHabits: Array.isArray(existing.customHabits) ? existing.customHabits : [],
    hiddenScheduled: Array.isArray(existing.hiddenScheduled) ? existing.hiddenScheduled : [],
    memo: existing.memo || "",
  };
}

function getScheduledHabitsForDate(key, record = getDayRecord(key)) {
  const date = fromKey(key);
  const weekday = date.getDay();
  const hidden = new Set(record.hiddenScheduled || []);
  return (state.taskSets || [])
    .filter((set) => (set.weekdays || []).includes(weekday))
    .flatMap((set) =>
      (set.tasks || []).map((task) => ({
        id: `${set.id}-${task.id}`,
        name: task.name,
        emoji: task.icon || task.emoji || "icon-heart.png",
        setName: set.name,
      })),
    )
    .filter((task) => !hidden.has(task.id));
}

function getDayHabits(record, key = selectedKey) {
  return [...getScheduledHabitsForDate(key, record), ...(record.customHabits || [])];
}

function countDone(record, key = selectedKey) {
  return getDayHabits(record, key).reduce((sum, habit) => sum + (record.checks[habit.id] ? 1 : 0), 0);
}

function getLevel(doneCount, total) {
  if (doneCount === 0) return 0;
  if (doneCount === total) return 4;
  const ratio = doneCount / total;
  if (ratio < 0.4) return 1;
  if (ratio < 0.8) return 2;
  return 3;
}

function stripTime(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getReflectionNote(percent, totalDone) {
  if (totalDone === 0) {
    return {
      title: "戻ってきた回数も大切な積み重ね",
      body: "まだ数字が少なくても大丈夫。見にきたことが、もう自分を置いていかない選択だよ。",
    };
  }

  if (percent >= 75) {
    return {
      title: "今週もよくがんばったね",
      body: "たくさん整えられた日々があるね。今日の自分を静かに誇っていいよ。",
    };
  }

  if (percent >= 40) {
    return {
      title: "少しずつちゃんと変われてるよ",
      body: "完璧じゃなくても、戻ってきた回数はちゃんと残ってる。やさしく続けていこう。",
    };
  }

  return {
    title: "休む日があっても、戻れる力は育ってる",
    body: "できたことをひとつ見つけるだけで十分。ここは責める場所じゃなく、認める場所だよ。",
  };
}

function getDayMarks(doneCount, total) {
  if (doneCount === 0) return "♡";
  if (doneCount === total) return "★";
  if (doneCount / total >= 0.6) return "♥";
  return "✦";
}

function getMood(doneCount, total) {
  if (doneCount === 0) return "今日は休息日。戻る場所はちゃんとあるよ。記録を開いたことも、自分を置いていかない小さな合図。";
  if (doneCount === 1) return "一歩進めたね。ちゃんと自分を大切にできてる。今日の小さな選択は、明日の安心につながってるよ。";
  if (doneCount === 2) return "今日も未来の自分のために積み重ねられたね。完璧じゃなくても、あなたを守る行動はちゃんと残ってる。";
  if (doneCount >= total) return "素敵。今日のあなたは、自分の味方でいてくれた。眠る前に、できたことを静かに受け取ってあげよう。";
  return "今日の小さな積み重ねは、ちゃんと未来の自分に届いてる。戻れる場所を作れていることも大切な力だよ。";
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

function getHabitIcon(value) {
  if (iconAssets.includes(value)) return value;
  return iconFallbacks[value] || "icon-heart.png";
}

function getIconMarkup(value, className = "habit-icon-img") {
  const icon = getHabitIcon(value);
  return `<img class="${className}" src="images/icons-cropped/${icon}" alt="" aria-hidden="true" />`;
}

function getNextIcon(value) {
  const current = iconAssets.indexOf(getHabitIcon(value));
  return iconAssets[(current + 1) % iconAssets.length];
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
