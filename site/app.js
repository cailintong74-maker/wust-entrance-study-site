const EXAM_DATE = new Date("2026-07-02T10:00:00+02:00");
const EXAM_SECONDS = 90 * 60;
const storeKey = "wust-study-state-v1";
const examKey = "wust-exam-session-v1";

const questions = window.WUST_QUESTIONS || [];
const knowledge = window.WUST_KNOWLEDGE || [];
const glossary = window.WUST_GLOSSARY || {};
mergeKnowledgeTermsIntoGlossary();

let state = loadState();
let examTimerHandle = null;

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(storeKey)) || { completed: {}, starred: {}, weak: {}, grades: [] };
  } catch {
    return { completed: {}, starred: {}, weak: {}, grades: [] };
  }
}

function saveState() {
  localStorage.setItem(storeKey, JSON.stringify(state));
}

function $(id) {
  return document.getElementById(id);
}

function normalize(text) {
  return text.toLowerCase().trim().replace(/[.,;:!?()[\]{}"'“”‘’]/g, "").replace(/\s+/g, " ");
}

function topicList() {
  return [...new Map(questions.map(q => [q.topic_en, q.topic_cn])).entries()];
}

function init() {
  updateCountdown();
  setupTabs();
  setupFilters();
  setupExam();
  setupTranslator();
  renderStudy();
  renderKnowledge();
  renderAnalysis();
}

function updateCountdown() {
  const now = new Date();
  const days = Math.max(0, Math.ceil((EXAM_DATE - now) / 86400000));
  $("countdownDays").textContent = String(days);
}

function setupTabs() {
  document.querySelectorAll(".mode-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".mode-tab").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
      $(`${btn.dataset.mode}View`).classList.add("active");
      if (btn.dataset.mode === "analysis") renderAnalysis();
    });
  });
}

function setupFilters() {
  const topicFilter = $("topicFilter");
  topicFilter.innerHTML = `<option value="all">全部主题</option>` + topicList().map(([en, cn]) => (
    `<option value="${escapeHtml(en)}">${escapeHtml(cn)} / ${escapeHtml(en)}</option>`
  )).join("");
  topicFilter.addEventListener("change", renderStudy);
  $("difficultyFilter").addEventListener("change", renderStudy);
  $("searchInput").addEventListener("input", renderStudy);

  const knowledgeTopic = $("knowledgeTopic");
  knowledgeTopic.innerHTML = `<option value="all">全部考点</option>` + knowledge.map(k => (
    `<option value="${escapeHtml(k.topic_en)}">${escapeHtml(k.topic_cn)} / ${escapeHtml(k.topic_en)}</option>`
  )).join("");
  knowledgeTopic.addEventListener("change", renderKnowledge);
  $("knowledgeMode").addEventListener("change", renderKnowledge);
}

function filteredQuestions() {
  const topic = $("topicFilter").value;
  const diff = $("difficultyFilter").value;
  const query = normalize($("searchInput").value);
  return questions.filter(q => {
    if (topic !== "all" && q.topic_en !== topic) return false;
    if (diff !== "all" && q.diff_en !== diff) return false;
    if (!query) return true;
    return normalize(`${q.title_en} ${q.title_cn} ${q.q_en} ${q.q_cn} ${q.topic_en} ${q.topic_cn}`).includes(query);
  });
}

function renderStudy() {
  const list = filteredQuestions();
  $("studyCount").textContent = `${list.length} questions`;
  const completed = questions.filter(q => state.completed[q.n]).length;
  $("progressSummary").textContent = `${completed}/60 completed`;
  $("questionList").innerHTML = list.map(q => questionCard(q)).join("");
  bindStudyCards();
}

function questionCard(q) {
  const isDone = !!state.completed[q.n];
  const isStarred = !!state.starred[q.n];
  const isWeak = !!state.weak[q.n];
  return `
    <article class="card" data-q="${q.n}">
      <div class="card-head">
        <div>
          <h3>${q.n}. ${escapeHtml(q.title_en)} / ${escapeHtml(q.title_cn)}</h3>
          <div class="badges">
            <span class="badge blue">${escapeHtml(q.topic_cn)}</span>
            <span class="badge">${q.points} points</span>
            <span class="badge ${q.diff_en === "Stretch" ? "amber" : ""}">${escapeHtml(q.diff_cn)}</span>
            ${isDone ? `<span class="badge green">已完成</span>` : ""}
            ${isWeak ? `<span class="badge red">弱项</span>` : ""}
          </div>
        </div>
      </div>
      <div class="question-text">${formatText(q.q_en)}</div>
      <div class="cn-block hidden">${formatText(q.q_cn)}</div>
      <div class="solution-block hidden"><strong>Step-by-step Solution / 详细解析</strong><br>${formatText(q.s_en)}<br><br>${formatText(q.s_cn)}</div>
      <div class="card-actions">
        <button data-action="toggle-cn">中文题目</button>
        <button data-action="toggle-solution">解析</button>
        <button data-action="complete">${isDone ? "取消完成" : "标记完成"}</button>
        <button data-action="star">${isStarred ? "取消收藏" : "收藏"}</button>
        <button data-action="weak">${isWeak ? "移出弱项" : "加入弱项"}</button>
      </div>
    </article>
  `;
}

function bindStudyCards() {
  document.querySelectorAll("[data-q] .card-actions button").forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest("[data-q]");
      const id = card.dataset.q;
      const action = btn.dataset.action;
      if (action === "toggle-cn") card.querySelector(".cn-block").classList.toggle("hidden");
      if (action === "toggle-solution") card.querySelector(".solution-block").classList.toggle("hidden");
      if (action === "complete") state.completed[id] = !state.completed[id];
      if (action === "star") state.starred[id] = !state.starred[id];
      if (action === "weak") state.weak[id] = !state.weak[id];
      saveState();
      if (!action.startsWith("toggle")) renderStudy();
    });
  });
}

function setupExam() {
  $("startExamBtn").addEventListener("click", startExam);
  $("resumeExamBtn").addEventListener("click", resumeExam);
  $("submitExamBtn").addEventListener("click", () => submitExam(false));
}

function selectExamQuestions() {
  const byTopic = new Map();
  questions.forEach(q => {
    if (!byTopic.has(q.topic_en)) byTopic.set(q.topic_en, []);
    byTopic.get(q.topic_en).push(q);
  });
  const topics = [...byTopic.keys()];
  const selectedTopics = topics.slice(0, 10);
  return selectedTopics.map((topic, i) => {
    const pool = byTopic.get(topic);
    const preferred = i < 6 ? "Medium" : (i < 8 ? "Basic" : "Stretch");
    return pool.find(q => q.diff_en === preferred) || pool[0];
  });
}

function startExam() {
  const selected = selectExamQuestions().map(q => q.n);
  const session = {
    startedAt: Date.now(),
    submittedAt: null,
    questionIds: selected,
    answers: {},
    grades: {}
  };
  localStorage.setItem(examKey, JSON.stringify(session));
  renderExam(session);
}

function resumeExam() {
  const session = getExamSession();
  if (!session) return alert("没有未提交的考试。");
  renderExam(session);
}

function getExamSession() {
  try {
    return JSON.parse(localStorage.getItem(examKey));
  } catch {
    return null;
  }
}

function saveExamSession(session) {
  localStorage.setItem(examKey, JSON.stringify(session));
}

function renderExam(session) {
  $("examIntro").classList.add("hidden");
  $("examResults").classList.add("hidden");
  $("examActive").classList.remove("hidden");
  const examQs = session.questionIds.map(id => questions.find(q => q.n === id)).filter(Boolean);
  $("examQuestions").innerHTML = examQs.map(q => `
    <article class="card">
      <div class="card-head">
        <div>
          <h3>${q.n}. ${escapeHtml(q.title_en)}</h3>
          <div class="badges">
            <span class="badge blue">${escapeHtml(q.topic_en)}</span>
            <span class="badge">${q.points} points</span>
            <span class="badge">${escapeHtml(q.diff_en)}</span>
          </div>
        </div>
      </div>
      <div class="question-text">${formatText(q.q_en)}</div>
      <label>
        Your handwritten-style notes / typed draft
        <textarea data-answer="${q.n}" placeholder="Write your reasoning here, or solve on paper and leave this as a short note.">${escapeHtml(session.answers[q.n] || "")}</textarea>
      </label>
    </article>
  `).join("");
  document.querySelectorAll("[data-answer]").forEach(area => {
    area.addEventListener("input", () => {
      const current = getExamSession();
      current.answers[area.dataset.answer] = area.value;
      saveExamSession(current);
    });
  });
  tickExamTimer();
  clearInterval(examTimerHandle);
  examTimerHandle = setInterval(tickExamTimer, 1000);
}

function tickExamTimer() {
  const session = getExamSession();
  if (!session || session.submittedAt) return;
  const left = Math.max(0, EXAM_SECONDS - Math.floor((Date.now() - session.startedAt) / 1000));
  const m = Math.floor(left / 60).toString().padStart(2, "0");
  const s = (left % 60).toString().padStart(2, "0");
  $("examTimer").textContent = `${m}:${s}`;
  if (left === 0) submitExam(true);
}

function submitExam(auto) {
  const session = getExamSession();
  if (!session) return;
  document.querySelectorAll("[data-answer]").forEach(area => {
    session.answers[area.dataset.answer] = area.value;
  });
  session.submittedAt = Date.now();
  session.autoSubmitted = auto;
  saveExamSession(session);
  clearInterval(examTimerHandle);
  renderExamResults(session);
}

function renderExamResults(session) {
  $("examActive").classList.add("hidden");
  $("examResults").classList.remove("hidden");
  const examQs = session.questionIds.map(id => questions.find(q => q.n === id)).filter(Boolean);
  $("examResults").innerHTML = `
    <div class="panel">
      <h2>考试已提交</h2>
      <p>${session.autoSubmitted ? "时间结束，已自动提交。" : "已提交。"}请按解析自评每题表现，系统会自动生成弱项分析。</p>
      <div class="card-actions">
        <button class="primary" id="finishGradingBtn">更新弱项分析</button>
        <button id="newExamBtn">重新开始一套</button>
      </div>
    </div>
    <div class="question-list">
      ${examQs.map(q => resultCard(q, session)).join("")}
    </div>
  `;
  document.querySelectorAll("[data-grade]").forEach(btn => {
    btn.addEventListener("click", () => {
      const current = getExamSession();
      current.grades[btn.dataset.q] = btn.dataset.grade;
      saveExamSession(current);
      renderExamResults(current);
    });
  });
  $("finishGradingBtn").addEventListener("click", () => {
    const current = getExamSession();
    state.grades.push({
      date: new Date().toISOString(),
      questionIds: current.questionIds,
      grades: current.grades,
      answers: current.answers
    });
    current.questionIds.forEach(id => {
      const grade = current.grades[id];
      if (grade === "wrong" || grade === "partial" || !String(current.answers[id] || "").trim()) state.weak[id] = true;
    });
    saveState();
    renderAnalysis();
    document.querySelector('[data-mode="analysis"]').click();
  });
  $("newExamBtn").addEventListener("click", startExam);
}

function resultCard(q, session) {
  const answer = session.answers[q.n] || "";
  const grade = session.grades[q.n] || "";
  return `
    <article class="card">
      <h3>${q.n}. ${escapeHtml(q.title_en)} / ${escapeHtml(q.title_cn)}</h3>
      <div class="badges">
        <span class="badge blue">${escapeHtml(q.topic_cn)}</span>
        <span class="badge">${q.points} points</span>
        ${!answer.trim() ? `<span class="badge red">空题</span>` : ""}
        ${grade ? `<span class="badge green">自评：${gradeLabel(grade)}</span>` : ""}
      </div>
      <div class="question-text">${formatText(q.q_en)}</div>
      <div class="cn-block">${formatText(q.q_cn)}</div>
      <div class="solution-block"><strong>Step-by-step Solution / 详细解析</strong><br>${formatText(q.s_en)}<br><br>${formatText(q.s_cn)}</div>
      <div class="grade-row">
        <button data-grade="correct" data-q="${q.n}" class="${grade === "correct" ? "active" : ""}">做对</button>
        <button data-grade="partial" data-q="${q.n}" class="${grade === "partial" ? "active" : ""}">半对</button>
        <button data-grade="wrong" data-q="${q.n}" class="${grade === "wrong" ? "active" : ""}">做错</button>
      </div>
    </article>
  `;
}

function gradeLabel(grade) {
  return { correct: "做对", partial: "半对", wrong: "做错" }[grade] || "未评";
}

function renderKnowledge() {
  const filter = $("knowledgeTopic").value;
  const mode = $("knowledgeMode").value;
  const items = knowledge.filter(k => filter === "all" || k.topic_en === filter);
  $("knowledgeList").innerHTML = items.map(k => {
    const relatedQs = questions.filter(q => q.topic_en === k.topic_en);
    if (mode === "terms") return renderKnowledgeTerms(k, relatedQs);
    if (mode === "mistakes") return renderKnowledgeMistakes(k, relatedQs);
    return renderKnowledgeFull(k, relatedQs);
  }).join("");
  bindKnowledgeActions();
}

function renderKnowledgeFull(k, relatedQs) {
  return `
    <article class="card knowledge-card">
      ${knowledgeHeader(k, relatedQs)}
      <section class="knowledge-overview">
        <h3>本章目标</h3>
        <p>${mathHtml(k.overview_cn || k.exam_focus.join(" "))}</p>
      </section>
      ${renderTextbookChapter(k)}
      <div class="knowledge-two-col">
        <section>
          <h3>关键术语 English-Chinese</h3>
          <div class="term-grid">${termPairsFor(k).map(termChip).join("")}</div>
        </section>
        <section>
          <h3>常考题型</h3>
          <div class="pattern-row">${(k.exam_patterns || []).map(pattern => `<span class="badge blue">${escapeHtml(pattern)}</span>`).join("")}</div>
        </section>
      </div>
      <section>
        <h3>考前必须掌握</h3>
        <ul class="compact-list">${(k.must_know || []).map(li).join("")}</ul>
      </section>
      <section class="lesson-stack">
        <h3>教材式小节</h3>
        ${(k.lessons || []).map(renderLesson).join("")}
      </section>
      <div class="knowledge-section">
        <div><h3>考查内容</h3><ul>${k.exam_focus.map(li).join("")}</ul></div>
        <div><h3>解题套路</h3><ul>${k.methods.map(li).join("")}</ul></div>
        <div><h3>常见错误</h3><ul>${k.mistakes.map(li).join("")}</ul></div>
      </div>
    </article>
  `;
}

function renderTextbookChapter(k) {
  const tb = k.textbook_cn;
  if (!tb) return "";
  return `
    <section class="textbook-chapter">
      <div class="textbook-title">
        <span>课本讲解</span>
        <strong>${mathHtml(tb.chapter_goal || "按国内教材顺序系统复习本章。")}</strong>
      </div>
      <div class="textbook-grid">
        <div class="textbook-block wide">
          <h3>一、核心概念</h3>
          ${(tb.core_concepts || []).map(p => `<p>${mathHtml(p)}</p>`).join("")}
        </div>
        <div class="textbook-block">
          <h3>二、符号与英文题面</h3>
          <ul>${(tb.symbol_notes || []).map(li).join("")}</ul>
        </div>
        ${renderSymbolDifferences(tb)}
        <div class="textbook-block">
          <h3>三、公式、定理与适用条件</h3>
          <ul>${(tb.formula_notes || []).map(li).join("")}</ul>
        </div>
        <div class="textbook-block">
          <h3>四、标准解题流程</h3>
          <ol>${(tb.standard_methods || []).map(li).join("")}</ol>
        </div>
        <div class="textbook-block">
          <h3>五、典型例题</h3>
          ${(tb.worked_examples || []).map(example => `
            <div class="worked-example">
              <strong>${mathHtml(example.question)}</strong>
              <p>${mathHtml(example.solution)}</p>
            </div>
          `).join("")}
        </div>
        <div class="textbook-block">
          <h3>六、误区辨析</h3>
          <ul>${(tb.misconception_analysis || []).map(li).join("")}</ul>
        </div>
        <div class="textbook-block wide">
          <h3>七、复习路径</h3>
          <p>${mathHtml(tb.practice_route || "先背概念和公式，再做本章 5 道对应练习题。")}</p>
        </div>
      </div>
    </section>
  `;
}

function renderSymbolDifferences(tb) {
  const rows = tb.symbol_differences || [];
  if (!rows.length) return "";
  return `
    <div class="textbook-block wide symbol-diff-block">
      <h3>中波符号差异</h3>
      <div class="symbol-diff-table" role="table" aria-label="Chinese and Polish symbol differences">
        <div class="symbol-diff-head" role="row">
          <span>波兰/欧洲常见写法</span>
          <span>中国高中常见写法</span>
          <span>考试提醒</span>
        </div>
        ${rows.map(row => `
          <div class="symbol-diff-row" role="row">
            <span>${mathHtml(row.eu)}</span>
            <span>${mathHtml(row.cn)}</span>
            <span>${mathHtml(row.note)}</span>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function renderKnowledgeTerms(k, relatedQs) {
  return `
    <article class="card knowledge-card">
      ${knowledgeHeader(k, relatedQs)}
      <section>
        <h3>关键术语 English-Chinese</h3>
        <div class="term-grid large">${termPairsFor(k).map(termChip).join("")}</div>
      </section>
    </article>
  `;
}

function renderKnowledgeMistakes(k, relatedQs) {
  return `
    <article class="card knowledge-card">
      ${knowledgeHeader(k, relatedQs)}
      <div class="knowledge-two-col">
        <section>
          <h3>常见错误</h3>
          <ul class="compact-list">${k.mistakes.map(li).join("")}</ul>
        </section>
        <section>
          <h3>考前检查清单</h3>
          <ul class="compact-list">${(k.must_know || []).map(li).join("")}</ul>
        </section>
      </div>
    </article>
  `;
}

function knowledgeHeader(k, relatedQs) {
  return `
    <div class="card-head">
      <div>
        <h2>${escapeHtml(k.topic_cn)} / ${escapeHtml(k.topic_en)}</h2>
        <div class="badges">
          <span class="badge blue">官方考点</span>
          <span class="badge">相关练习 ${relatedQs.length} 题</span>
        </div>
      </div>
      <button data-topic-jump="${escapeHtml(k.topic_en)}">练习本章题目</button>
    </div>
    <div class="related-questions" aria-label="related practice questions">
      ${relatedQs.slice(0, 5).map(q => `<button data-question-jump="${q.n}" data-topic-jump="${escapeHtml(k.topic_en)}">Q${q.n}</button>`).join("")}
    </div>
  `;
}

function renderLesson(lesson, index) {
  return `
    <details class="lesson" ${index === 0 ? "open" : ""}>
      <summary>${mathHtml(lesson.title_cn)}</summary>
      <div class="lesson-body">
        <p>${mathHtml(lesson.explanation_cn)}</p>
        <div class="lesson-columns">
          <div>
            <h4>本节术语</h4>
            <div class="term-grid small">${(lesson.terms || []).map(termChip).join("")}</div>
          </div>
          <div>
            <h4>公式与定理</h4>
            <ul class="formula-list">${(lesson.formulas || []).map(li).join("")}</ul>
          </div>
        </div>
        <h4>解题步骤</h4>
        <ol>${(lesson.steps || []).map(li).join("")}</ol>
        <div class="example-box">
          <strong>例题精讲</strong>
          <p>${mathHtml(lesson.example_cn)}</p>
          <p>${mathHtml(lesson.solution_cn)}</p>
        </div>
      </div>
    </details>
  `;
}

function termPairsFor(k) {
  const pairs = [...(k.key_terms || [])];
  (k.lessons || []).forEach(lesson => pairs.push(...(lesson.terms || [])));
  const seen = new Set();
  return pairs.filter(([en]) => {
    const key = normalize(en);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function termChip([en, cn]) {
  return `<button class="term-chip" data-term="${escapeHtml(en)}" data-meaning="${escapeHtml(cn)}"><strong>${escapeHtml(cn)}</strong><span>${escapeHtml(en)}</span></button>`;
}

function bindKnowledgeActions() {
  document.querySelectorAll("[data-topic-jump]").forEach(btn => {
    btn.addEventListener("click", () => {
      $("topicFilter").value = btn.dataset.topicJump;
      document.querySelector('[data-mode="study"]').click();
      renderStudy();
      const target = btn.dataset.questionJump ? document.querySelector(`[data-q="${btn.dataset.questionJump}"]`) : $("questionList");
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
  document.querySelectorAll(".term-chip").forEach(btn => {
    btn.addEventListener("click", () => showTermCard(btn, btn.dataset.term, btn.dataset.meaning));
  });
}

function showTermCard(anchor, term, meaning) {
  const tip = $("translator");
  const topic = anchor.closest(".knowledge-card")?.querySelector("h2")?.textContent || "知识库";
  tip.innerHTML = `<strong>${escapeHtml(term)}</strong><span>${escapeHtml(meaning)}<br>${escapeHtml(topic)}</span>`;
  tip.classList.remove("hidden");
  const rect = anchor.getBoundingClientRect();
  tip.style.left = `${Math.min(window.innerWidth - 340, Math.max(14, rect.left))}px`;
  tip.style.top = `${Math.max(14, rect.bottom + 8)}px`;
}

function mergeKnowledgeTermsIntoGlossary() {
  knowledge.forEach(k => {
    termPairsFor(k).forEach(([en, cn]) => {
      const key = normalize(en);
      if (key && !glossary[key]) glossary[key] = `${cn}（${k.topic_cn}）`;
    });
  });
}

function renderAnalysis() {
  const latest = state.grades[state.grades.length - 1];
  const weakIds = new Set(Object.keys(state.weak).map(Number));
  const weakQuestions = questions.filter(q => weakIds.has(q.n));
  if (!latest && weakQuestions.length === 0) {
    $("analysisPanel").innerHTML = `<div class="panel"><p>还没有考试记录。完成一次考试模式并自评后，会自动生成弱项和复习方案。</p></div>`;
    return;
  }
  const topicStats = new Map();
  questions.forEach(q => topicStats.set(q.topic_en, { topic_cn: q.topic_cn, weak: 0, total: 0, wrong: 0, partial: 0, blank: 0 }));
  weakQuestions.forEach(q => topicStats.get(q.topic_en).weak++);
  if (latest) {
    latest.questionIds.forEach(id => {
      const q = questions.find(item => item.n === id);
      const stat = topicStats.get(q.topic_en);
      stat.total++;
      const grade = latest.grades[id];
      if (grade === "wrong") stat.wrong++;
      if (grade === "partial") stat.partial++;
      if (!String(latest.answers[id] || "").trim()) stat.blank++;
    });
  }
  const ranked = [...topicStats.entries()].filter(([, s]) => s.weak || s.wrong || s.partial || s.blank).sort((a, b) => {
    const score = s => s[1].wrong * 3 + s[1].partial * 2 + s[1].blank * 2 + s[1].weak;
    return score(b) - score(a);
  });
  const totalExam = latest ? latest.questionIds.length : 0;
  const correct = latest ? latest.questionIds.filter(id => latest.grades[id] === "correct").length : 0;
  const partial = latest ? latest.questionIds.filter(id => latest.grades[id] === "partial").length : 0;
  const wrong = latest ? latest.questionIds.filter(id => latest.grades[id] === "wrong").length : 0;
  $("analysisPanel").innerHTML = `
    <div class="analysis-grid">
      <div class="metric"><span>最近考试题数</span><strong>${totalExam || "--"}</strong></div>
      <div class="metric"><span>做对 / 半对 / 做错</span><strong>${correct}/${partial}/${wrong}</strong></div>
      <div class="metric"><span>累计弱项题</span><strong>${weakQuestions.length}</strong></div>
    </div>
    <div class="question-list" style="margin-top:12px">
      ${ranked.length ? ranked.map(([topic, s]) => improvementCard(topic, s)).join("") : `<div class="panel"><p>目前没有明显弱项。继续用考试模式保持手感。</p></div>`}
    </div>
  `;
}

function improvementCard(topic, s) {
  const k = knowledge.find(item => item.topic_en === topic);
  const related = questions.filter(q => q.topic_en === topic).slice(0, 5).map(q => q.n).join(", ");
  return `
    <article class="card">
      <h3>${escapeHtml(s.topic_cn)} / ${escapeHtml(topic)}</h3>
      <div class="badges">
        <span class="badge red">弱项 ${s.weak}</span>
        <span class="badge amber">错 ${s.wrong} / 半对 ${s.partial} / 空 ${s.blank}</span>
      </div>
      <p><strong>提高方案：</strong>${escapeHtml(makeAdvice(topic, s))}</p>
      <p><strong>先复习：</strong>${k ? escapeHtml(k.methods.slice(0, 2).join(" ")) : "回到知识库复习该主题。"} </p>
      <p><strong>对应练习题：</strong>${related}</p>
    </article>
  `;
}

function makeAdvice(topic, s) {
  if (s.blank > 0) return "先练习读题和列式。考试中即使不会完整求解，也要写出定义域、公式或第一步推导，避免空题。";
  if (s.wrong > s.partial) return "集中复盘公式使用和关键步骤，重做同主题基础题，再做中等题。";
  if (s.partial > 0) return "你的方向可能接近，但步骤不完整。重点训练书写理由、检查定义域、单位和最终答案。";
  return "把该主题加入每日热身，保持稳定正确率。";
}

function setupTranslator() {
  document.addEventListener("mouseup", () => setTimeout(showTranslation, 10));
  document.addEventListener("keyup", showTranslation);
  document.addEventListener("mousedown", e => {
    if (!e.target.closest("#translator")) $("translator").classList.add("hidden");
  });
}

function showTranslation() {
  const sel = window.getSelection();
  const raw = sel ? sel.toString().trim() : "";
  if (!raw || raw.length > 60) return;
  const key = normalize(raw);
  const direct = glossary[key];
  const single = key.split(" ").map(w => glossary[w]).filter(Boolean);
  const meaning = direct || (single.length ? single.join("；") : "");
  if (!meaning) return;
  const range = sel.rangeCount ? sel.getRangeAt(0) : null;
  const rect = range ? range.getBoundingClientRect() : null;
  const tip = $("translator");
  tip.innerHTML = `<strong>${escapeHtml(raw)}</strong><span>${escapeHtml(meaning)}</span>`;
  tip.classList.remove("hidden");
  const x = rect ? Math.min(window.innerWidth - 340, Math.max(14, rect.left)) : 20;
  const y = rect ? Math.max(14, rect.bottom + 8) : 20;
  tip.style.left = `${x}px`;
  tip.style.top = `${y}px`;
}

function li(text) {
  return `<li>${mathHtml(text)}</li>`;
}

function formatText(text) {
  return mathHtml(text || "");
}

function mathHtml(text) {
  return escapeHtml(prettyMath(text || ""))
    .replace(/C\(([^,()]+),([^)]+)\)/g, (_, top, bottom) => (
      `<span class="binom" aria-label="combination ${top} choose ${bottom}"><span>${top}</span><span>${bottom}</span></span>`
    ));
}

function prettyMath(text) {
  return String(text)
    .replace(/<=/g, "≤")
    .replace(/>=/g, "≥")
    .replace(/!=/g, "≠")
    .replace(/->/g, "→")
    .replace(/=>/g, "⇒")
    .replace(/\*/g, "·")
    .replace(/\blog_([A-Za-z0-9])\b/g, (_, sub) => `log${toSubscript(sub)}`)
    .replace(/\b(sin|cos|tan)([0-9]+°)/g, "$1 $2")
    .replace(/\b([A-Za-z])_([0-9n])\b/g, (_, base, sub) => `${base}${toSubscript(sub)}`)
    .replace(/\b([A-Za-z])\^(\([^)]+\)|[-+A-Za-z0-9]+)/g, (_, base, exp) => {
      const clean = exp.startsWith("(") && exp.endsWith(")") ? exp.slice(1, -1) : exp;
      return `${base}${toSuperscript(clean)}`;
    });
}

function toSubscript(text) {
  const map = { "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄", "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉", n: "ₙ" };
  return String(text).replace(/[0-9n]/g, char => map[char] || char);
}

function toSuperscript(text) {
  const map = {
    "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
    "+": "⁺", "-": "⁻", "(": "⁽", ")": "⁾", n: "ⁿ", m: "ᵐ", k: "ᵏ", x: "ˣ"
  };
  return String(text).replace(/[0-9+\-()nmkx]/g, char => map[char] || char);
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

init();
