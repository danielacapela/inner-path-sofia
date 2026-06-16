const STORAGE_PREFIX = "innerPathV015Sofia";

function normaliseClientKey(value) {
  return String(value || "").trim().toLowerCase();
}

function findClientByKey(key) {
  const clean = normaliseClientKey(key);
  if (!clean) return null;
  return INNER_PATH_DATA.clients.find(client => {
    const keys = [client.id, client.slug, client.code].filter(Boolean).map(normaliseClientKey);
    return keys.includes(clean);
  }) || null;
}

function clientKeyFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get("cliente") || params.get("client") || params.get("c");
  } catch (_) {
    return null;
  }
}

function setClientInUrl(client) {
  if (!client || !client.slug || !window.history?.replaceState) return;
  const url = new URL(window.location.href);
  url.searchParams.set("cliente", client.slug);
  window.history.replaceState({}, "", url);
}

const requestedClient = findClientByKey(clientKeyFromUrl());
const storedClient = findClientByKey(getStoredGlobal("clientId", ""));
const fallbackClient = INNER_PATH_DATA.clients.find(client => client.id === INNER_PATH_DATA.app.defaultClientId) || INNER_PATH_DATA.clients[0];
const defaultClient = requestedClient || storedClient || fallbackClient;

const state = {
  language: getStoredGlobal("language", INNER_PATH_DATA.app.defaultLanguage),
  activeClientId: defaultClient.id,
  activeSessionId: null,
  activeTab: "home",
  breathTimer: null,
  breathRunning: false,
  breathStep: 0
};

state.activeSessionId = currentClient().activeSessionId;

const TAP_POINTS = {
  pt: ["ponto karate", "topo da cabeça", "sobrancelha", "lado do olho", "debaixo do olho", "debaixo do nariz", "queixo", "clavícula", "debaixo do braço"],
  en: ["karate chop point", "top of head", "eyebrow", "side of eye", "under eye", "under nose", "chin", "collarbone", "under arm"]
};

const BREATH_DAYS = {
  pt: ["S", "T", "Q", "Q", "S", "S", "D"],
  en: ["M", "T", "W", "T", "F", "S", "S"]
};

function getStoredGlobal(key, fallback) {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}:${key}`);
    return raw ? JSON.parse(raw) : fallback;
  } catch (_) {
    return fallback;
  }
}

function setStoredGlobal(key, value) {
  localStorage.setItem(`${STORAGE_PREFIX}:${key}`, JSON.stringify(value));
}

function currentClient() {
  return INNER_PATH_DATA.clients.find(client => client.id === state.activeClientId) || defaultClient;
}

function clientSessions() {
  return currentClient().sessions || [];
}

function storageKey(...parts) {
  return [STORAGE_PREFIX, currentClient().id, ...parts].join(":");
}

function getStored(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (_) {
    return fallback;
  }
}

function setStored(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function translate(value) {
  if (value && typeof value === "object" && !Array.isArray(value)) return value[state.language] ?? value.pt ?? "";
  return value ?? "";
}

function ui(key) {
  return INNER_PATH_DATA.ui[state.language][key] || INNER_PATH_DATA.ui.pt[key] || key;
}

function currentSession() {
  return clientSessions().find(session => session.id === state.activeSessionId) || clientSessions()[0];
}

function sessionById(id) {
  return clientSessions().find(session => session.id === id);
}

function phaseData(session) {
  return INNER_PATH_DATA.phases[session.phase]?.[state.language] || INNER_PATH_DATA.phases[session.phase]?.pt || {};
}

function listForLang(value) {
  return value?.[state.language] || value?.pt || [];
}

function hasAudio(session) {
  return Boolean(session.audio && session.audio.embedUrl);
}

function previewLockedSessions() {
  return Boolean(INNER_PATH_DATA.app.previewLockedSessions);
}

function labelForSession(session) {
  if (session.navCode) return translate(session.navCode);
  return `S · ${String(session.baseNumber).padStart(2, "0")}`;
}

function shortForTimeline(session) {
  if (session.timelineCode) return session.timelineCode;
  return `S${session.baseNumber}`;
}

function renderApp() {
  stopBreath(false);
  const root = document.getElementById("app");
  const session = currentSession();
  if (!session) return;
  document.documentElement.lang = state.language;
  root.innerHTML = `
    ${renderTopBar()}
    ${renderHeader(session)}
    ${renderValues()}
    ${renderNotice()}
    ${renderMessage(session)}
    ${renderTabContent(session)}
    ${renderBottomNav(session)}
  `;
  if (state.activeTab === "extra") {
    buildBreathDays(session);
    renderCasuloRadar(session.id);
  }
  updateProgressLabel(session);
  window.scrollTo({ top: 0, behavior: "instant" });
}

function renderJourneyHint(client, sessions) {
  const openCount = sessions.filter(session => session.status !== "locked").length;
  const lockedCount = sessions.length - openCount;
  if (client.mode === "continuity") {
    return state.language === "pt" ? "cliente em continuidade · começa no ponto de reencontro" : "continuity client · starts at the reconnect point";
  }
  if (state.language === "pt") return `cliente nova · ${openCount} etapas abertas · ${lockedCount} bloqueadas`;
  return `new client · ${openCount} open steps · ${lockedCount} locked`;
}

function renderTopBar() {
  const sessions = clientSessions();
  const client = currentClient();
  return `
    <div class="top-panel">
      <nav class="session-bar" aria-label="sessões">
        ${sessions.map(session => {
          const locked = session.status === "locked";
          const canOpen = !locked || previewLockedSessions();
          return `
            <button class="session-tab ${session.id === state.activeSessionId ? "is-active" : ""} ${session.status === "current" ? "is-current" : ""} ${locked ? "is-locked" : ""}"
              ${canOpen ? `onclick="switchSession('${session.id}')"` : "disabled"}>
              ${labelForSession(session)}${session.status === "current" ? " ✦" : locked ? " ◦" : ""}
            </button>
          `;
        }).join("")}
      </nav>
      <div class="session-drag-hint">${renderJourneyHint(client, sessions)}</div>
    </div>
  `;
}

function renderHeader(session) {
  const client = currentClient();
  const phase = phaseData(session);
  const modeLabel = client.mode === "new" ? (state.language === "pt" ? "cliente nova" : "new client") : (state.language === "pt" ? "continuidade" : "continuity");
  return `
    <header class="header phase-${session.phase}">
      <div class="header-top">
        <span class="logo">${INNER_PATH_DATA.brand.name}</span>
        <div class="avatar" aria-label="iniciais da cliente">${client.initials}</div>
      </div>
      <div class="product-line">${INNER_PATH_DATA.brand.product} · ${translate(INNER_PATH_DATA.brand.subtitle)} · ${modeLabel}</div>
      <div class="greeting-small">${ui("hello")}</div>
      <h1 class="greeting-name">${translate(client.name)}<span>.</span></h1>
      <div class="language-toggle header-language" aria-label="${ui("language")}">
        <button class="${state.language === "pt" ? "is-active" : ""}" onclick="setLanguage('pt')">PT</button>
        <button class="${state.language === "en" ? "is-active" : ""}" onclick="setLanguage('en')">EN</button>
      </div>
      <div class="week-tag">
        <span class="week-pill phase-${session.phase}">${labelForSession(session)}</span>
        <span class="week-label">${translate(session.title).toLowerCase()} · ${translate(session.subtitle)}</span>
      </div>
      <div class="phase-line-text">${phase.label} · ${phase.line}</div>
    </header>
  `;
}

function renderValues() {
  const client = currentClient();
  const values = listForLang(client.values);
  const label = client.mode === "continuity" ? (state.language === "pt" ? "GPS interno · os teus 3 espelhos ·" : "inner GPS · your 3 mirrors ·") : ui("values");
  return `
    <section class="values-strip" aria-label="valores">
      <span class="values-label">${label}</span>
      <div class="values-list">${values.map(value => `<span class="value-pill">${value}</span>`).join("")}</div>
    </section>
  `;
}

function renderNotice() {
  return `
    <div class="notice demo-note">
      <div class="notice-line">${ui("demo")} · ${INNER_PATH_DATA.app.version}</div>
      <div class="client-link-line">${state.language === "pt" ? "guarda este link só para ti" : "keep this link just for you"}</div>
    </div>
  `;
}

function renderMessage(session) {
  return `
    <section class="message-banner">
      <div class="message-bar phase-${session.phase}"></div>
      <div class="message-body">
        <div class="message-label">${ui("note")}</div>
        <p class="message-text">“${translate(session.note)}”</p>
        <div class="message-signature">— daniela · ${translate(session.dateLabel)}</div>
      </div>
    </section>
  `;
}

function renderTabContent(session) {
  if (session.status === "locked" && !previewLockedSessions()) return renderLockedSession(session);
  if (state.activeTab === "home") return renderHomeTab(session);
  if (state.activeTab === "audio") return renderAudioTab(session);
  if (state.activeTab === "journal") return renderJournalTab(session);
  if (state.activeTab === "extra") return renderExtraTab(session);
  return renderHomeTab(session);
}

function renderLockedSession(session) {
  return `
    <section class="section">
      <div class="empty-card">
        <div class="empty-title">${ui("futureSession")}</div>
        <p>${ui("futureBody")}</p>
      </div>
    </section>
    ${renderJourneyTimeline()}
  `;
}

function renderHomeTab(session) {
  const tasks = listForLang(session.tasks);
  const done = getStored(storageKey(session.id, "tasks"), []);
  return `
    ${renderLockedPreviewNote(session)}
    ${hasAudio(session) ? renderAudioShortcut(session) : ""}
    <section class="section">
      <div class="section-head">
        <span class="section-label">${ui("thisWeek")}</span>
        <span class="section-value" id="progress-label">0%</span>
      </div>
      <div class="task-list">
        ${tasks.map((task, index) => `
          <button class="task-card ${done.includes(index) ? "is-done" : ""}" onclick="toggleTask('${session.id}', ${index})">
            <span class="task-num">${String(index + 1).padStart(2, "0")}</span>
            <span class="task-copy">
              <span class="task-title">${task.title}</span>
              <span class="task-detail">${task.detail}</span>
            </span>
            <span class="task-meta">
              <span class="task-check">✓</span>
              <span class="task-type">${task.type}</span>
            </span>
          </button>
        `).join("")}
      </div>
    </section>
    ${renderSessionMemory(session)}
    ${renderJourneyTimeline()}
    ${renderClearData()}
  `;
}

function renderLockedPreviewNote(session) {
  if (session.status !== "locked" || !previewLockedSessions()) return "";
  return `
    <section class="section">
      <div class="preview-note">
        <strong>preview daniela</strong>
        <span>na app da cliente esta sessão fica bloqueada até ser desbloqueada por ti</span>
      </div>
    </section>
  `;
}

function renderAudioShortcut(session) {
  return `
    <section class="section">
      <button class="audio-shortcut" onclick="switchTab('audio')">
        <span>
          <span class="audio-shortcut-kicker">${ui("meditationShortcut")}</span>
          <span class="audio-shortcut-title">${translate(session.audio.title)}</span>
          <span class="audio-shortcut-detail">${translate(session.audio.detail)}</span>
        </span>
        <span class="audio-shortcut-play">${ui("play")}</span>
      </button>
    </section>
  `;
}

function renderSessionMemory(session) {
  const items = listForLang(session.sessionMemory);
  return `
    <section class="section">
      <div class="section-head">
        <span class="section-label">${ui("sessionMemory")}</span>
        <span class="section-value">${ui("sessionMemorySub")}</span>
      </div>
      <div class="memory-card">
        <div class="memory-title">${translate(session.intent)}</div>
        ${items.map(item => `<div class="mini-item"><span></span>${item}</div>`).join("")}
      </div>
    </section>
  `;
}

function renderAudioTab(session) {
  if (!hasAudio(session)) {
    return `
      <section class="section">
        <div class="empty-card">
          <div class="empty-title">${ui("noAudioTitle")}</div>
          <p>${ui("noAudioBody")}</p>
        </div>
      </section>
      ${renderSessionMemory(session)}
    `;
  }
  const sensations = listForLang(session.sensations);
  return `
    <section class="section">
      <div class="audio-card">
        <div class="audio-kicker">daniela capela · ${ui("meditation")}</div>
        <h2>${translate(session.audio.title)}</h2>
        <p>${translate(session.audio.detail)}</p>
        <iframe class="spotify-player" src="${session.audio.embedUrl}" width="100%" height="152" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      </div>
    </section>
    <section class="section">
      <div class="info-card">
        <div class="info-intro">${ui("sensations")}</div>
        ${sensations.map(item => `
          <div class="info-row">
            <span></span>
            <div><strong>${item.title}</strong><small>${item.detail}</small></div>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function renderJournalTab(session) {
  const questions = listForLang(session.journal);
  return `
    <section class="section">
      <div class="journal-card">
        ${questions.map((question, index) => {
          const value = getStored(storageKey(session.id, "journal", index), "");
          return `
            <label class="journal-question" for="journal-${index}">${question}</label>
            <textarea id="journal-${index}" class="journal-area" rows="4" placeholder="${ui("journalPlaceholder")}" oninput="saveJournal('${session.id}', ${index}, this.value)">${value}</textarea>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function renderExtraTab(session) {
  const type = session.extra?.type || "default";
  if (type === "reconnect") return renderReconnectExtra(session);
  if (type === "casulo") return renderCasuloExtra(session);
  if (type === "breath") return renderBreathExtra(session);
  if (type === "tapping") return renderTappingExtra(session);
  if (type === "quiz") return renderQuizExtra(session);
  if (type === "innerchild") return renderInnerChildExtra(session);
  if (type === "continuity") return renderContinuityExtra(session);
  return renderDefaultExtra(session);
}

function renderDefaultExtra(session) {
  return `
    <section class="section">
      <div class="extra-card">
        <div class="extra-kicker">${ui("extra")}</div>
        <h2>${translate(session.extra.title)}</h2>
        <p>${translate(session.extra.body)}</p>
      </div>
    </section>
  `;
}

function renderReconnectExtra(session) {
  const worked = listForLang(session.extra.worked);
  const activeNow = listForLang(session.extra.activeNow);
  return `
    <section class="section">
      <div class="extra-card">
        <div class="extra-kicker">${state.language === "pt" ? "ponto de reencontro" : "reconnect point"}</div>
        <h2>${translate(session.extra.title)}</h2>
        <p>${translate(session.extra.body)}</p>
      </div>
    </section>
    ${renderCasuloExtra(session)}
    <section class="section">
      <div class="extra-card reconnect-card">
        <div class="sub-block first-sub-block">
          <h3>${state.language === "pt" ? "o que já trabalhámos" : "what we have worked on"}</h3>
          <div class="phrase-grid">
            ${worked.map(item => `<span class="phrase-static">${item}</span>`).join("")}
          </div>
        </div>
        <div class="sub-block">
          <h3>${state.language === "pt" ? "o que está activo agora" : "what is active now"}</h3>
          <div class="phrase-grid">
            ${activeNow.map(item => `<span class="phrase-static">${item}</span>`).join("")}
          </div>
        </div>
        <div class="sub-block">
          <h3>${state.language === "pt" ? "próxima porta terapêutica" : "next therapeutic door"}</h3>
          <p>${translate(session.extra.nextDoor)}</p>
        </div>
      </div>
    </section>
  `;
}

function renderCasuloExtra(session) {
  return `
    <section class="section">
      <div class="extra-card casulo-card">
        <div class="extra-kicker">${ui("scoreFrom1To10")}</div>
        <h2>${translate(session.title)}</h2>
        <p>${ui("casuloMeaning")}</p>
        <div class="radar-wrap">
          <svg id="casulo-radar" viewBox="0 0 220 220" role="img" aria-label="casulo digital"></svg>
        </div>
        <div class="slider-list">
          ${INNER_PATH_DATA.casuloAreas.map((area) => {
            const value = getStored(storageKey(session.id, "casulo", area.id), 5);
            return `
              <label class="slider-row">
                <span>${area[state.language]}</span>
                <input type="range" min="1" max="10" value="${value}" oninput="saveCasulo('${session.id}', '${area.id}', this.value); this.nextElementSibling.textContent=this.value; renderCasuloRadar('${session.id}')" />
                <strong>${value}</strong>
              </label>
            `;
          }).join("")}
        </div>
        <div class="photo-note">
          <strong>${ui("photoOptional")}</strong>
          <span>${ui("photoFuture")}</span>
        </div>
      </div>
    </section>
  `;
}

function renderBreathExtra(session) {
  return `
    <section class="section">
      <div class="breath-card">
        <div class="extra-kicker">${translate(session.extra.title)}</div>
        <h2>${state.language === "pt" ? "5 · 5" : "5 · 5"}</h2>
        <p>${translate(session.extra.body)}</p>
        <button class="breath-circle" id="breath-circle" onclick="toggleBreath()">${ui("start")}</button>
        <div class="breath-days" id="breath-days"></div>
      </div>
    </section>
  `;
}

function renderTappingExtra(session) {
  const done = getStored(storageKey(session.id, "tapping"), []);
  return `
    <section class="section">
      <div class="extra-card">
        <div class="extra-kicker">${ui("extra")}</div>
        <h2>${translate(session.extra.title)}</h2>
        <p>${translate(session.extra.body)}</p>
        <div class="tap-list">
          ${TAP_POINTS[state.language].map((point, index) => `
            <button class="tap-point ${done.includes(index) ? "is-done" : ""}" onclick="toggleTapPoint('${session.id}', ${index})"><span>${String(index + 1).padStart(2, "0")}</span>${point}</button>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderQuizExtra(session) {
  const areas = state.language === "pt"
    ? ["autocontrolo", "autoconfiança", "resiliência", "empatia", "optimismo", "sentido de vida", "autonomia", "segurança interna"]
    : ["self-control", "self-confidence", "resilience", "empathy", "optimism", "meaning", "autonomy", "inner safety"];
  return `
    <section class="section">
      <div class="extra-card">
        <div class="extra-kicker">quiz · 1 a 10</div>
        <h2>${translate(session.extra.title)}</h2>
        <p>${translate(session.extra.body)}</p>
        <div class="slider-list">
          ${areas.map((area, index) => {
            const value = getStored(storageKey(session.id, "quiz", index), 5);
            return `
              <label class="slider-row">
                <span>${area}</span>
                <input type="range" min="1" max="10" value="${value}" oninput="saveQuiz('${session.id}', ${index}, this.value); this.nextElementSibling.textContent=this.value" />
                <strong>${value}</strong>
              </label>
            `;
          }).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderInnerChildExtra(session) {
  const needs = state.language === "pt"
    ? ["segurança", "colo", "ser vista", "ser protegida", "permissão para sentir", "permissão para existir", "liberdade", "presença"]
    : ["safety", "holding", "being seen", "being protected", "permission to feel", "permission to exist", "freedom", "presence"];
  const adultPhrases = state.language === "pt"
    ? ["eu vejo-te", "eu fico contigo", "agora sou eu que cuido de nós", "tu já não tens de carregar isto sozinha", "o que sentiste fez sentido", "hoje temos mais recursos"]
    : ["I see you", "I stay with you", "now I take care of us", "you no longer have to carry this alone", "what you felt made sense", "today we have more resources"];
  const selectedNeeds = getStored(storageKey(session.id, "innerNeeds"), []);
  const selectedPhrases = getStored(storageKey(session.id, "adultPhrases"), []);
  return `
    <section class="section">
      <div class="extra-card">
        <div class="extra-kicker">${state.language === "pt" ? "integração" : "integration"}</div>
        <h2>${translate(session.extra.title)}</h2>
        <p>${translate(session.extra.body)}</p>
        <div class="inner-photo-block">
          <div class="extra-kicker">${state.language === "pt" ? "foto de infância" : "childhood photo"}</div>
          <label class="photo-upload-box">
            <input type="file" accept="image/*" onchange="previewInnerChildPhoto(event, '${session.id}')" />
            <span id="inner-photo-label-${session.id}">${state.language === "pt" ? "adicionar foto" : "add photo"}</span>
            <img id="inner-photo-preview-${session.id}" alt="" />
          </label>
          <small>${state.language === "pt" ? "demo local · na versão real, a foto deve ficar protegida" : "local demo · in the real version, the photo must be protected"}</small>
        </div>
        <div class="sub-block">
          <h3>${state.language === "pt" ? "1 · O que esta parte precisava" : "1 · What this part needed"}</h3>
          <div class="phrase-grid">
            ${needs.map((need, index) => `<button class="phrase-btn ${selectedNeeds.includes(index) ? "is-done" : ""}" onclick="toggleStoredIndex('${session.id}', 'innerNeeds', ${index})">${need}</button>`).join("")}
          </div>
        </div>
        <div class="sub-block">
          <h3>${state.language === "pt" ? "2 · A resposta da adulta interna" : "2 · The inner adult response"}</h3>
          <div class="phrase-grid">
            ${adultPhrases.map((phrase, index) => `<button class="phrase-btn ${selectedPhrases.includes(index) ? "is-done" : ""}" onclick="toggleStoredIndex('${session.id}', 'adultPhrases', ${index})">${phrase}</button>`).join("")}
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderContinuityExtra(session) {
  const misalignment = state.language === "pt"
    ? ["agrado demais", "calo o que sinto", "entro em culpa", "volto à comparação", "isolo-me", "deixo de dormir bem", "perco contacto com o corpo", "fico reactiva"]
    : ["I over-please", "I silence what I feel", "I go into guilt", "I return to comparison", "I isolate", "I stop sleeping well", "I lose contact with my body", "I become reactive"];
  const regulateOptions = state.language === "pt"
    ? ["coerência cardíaca 5-5", "tapping", "meditação", "mão no peito e ventre", "caminhada consciente"]
    : ["heart coherence 5-5", "tapping", "meditation", "hand on chest and belly", "conscious walk"];
  const writingOptions = state.language === "pt"
    ? ["check-in 0 a 10", "journaling livre", "o que estou a tolerar?", "que escolha honra os meus valores?", "carta não enviada", "exercício ROSE"]
    : ["0 to 10 check-in", "free journaling", "what am I tolerating?", "which choice honours my values?", "unsent letter", "ROSE exercise"];
  const toolOptions = state.language === "pt"
    ? ["ROSE", "coerência cardíaca", "tapping", "meditação", "journaling", "carta simbólica", "casulo / check-in"]
    : ["ROSE", "heart coherence", "tapping", "meditation", "journaling", "symbolic letter", "cocoon / check-in"];
  const selectedMisalignment = getStored(storageKey(session.id, "misalignment"), []);
  const selectedRegulate = getStored(storageKey(session.id, "anchorRegulate"), []);
  const selectedWrite = getStored(storageKey(session.id, "anchorWrite"), []);
  const selectedTools = getStored(storageKey(session.id, "continuityTools"), []);
  const choice = getStored(storageKey(session.id, "anchorChoice"), "");
  return `
    <section class="section">
      <div class="extra-card continuity-card">
        <div class="extra-kicker">30 dias</div>
        <h2>${translate(session.extra.title)}</h2>
        <p>${translate(session.extra.body)}</p>
        <div class="sub-block">
          <h3>${state.language === "pt" ? "1 · Sinais de desalinhamento" : "1 · Signs of misalignment"}</h3>
          <div class="phrase-grid">${misalignment.map((item, index) => `<button class="phrase-btn ${selectedMisalignment.includes(index) ? "is-done" : ""}" onclick="toggleStoredIndex('${session.id}', 'misalignment', ${index})">${item}</button>`).join("")}</div>
        </div>
        <div class="sub-block">
          <h3>${state.language === "pt" ? "2 · Âncora para regular" : "2 · Anchor to regulate"}</h3>
          <div class="phrase-grid">${regulateOptions.map((item, index) => `<button class="phrase-btn ${selectedRegulate.includes(index) ? "is-done" : ""}" onclick="toggleStoredIndex('${session.id}', 'anchorRegulate', ${index})">${item}</button>`).join("")}</div>
        </div>
        <div class="sub-block">
          <h3>${state.language === "pt" ? "3 · Âncora para escrever" : "3 · Anchor to write"}</h3>
          <div class="phrase-grid">${writingOptions.map((item, index) => `<button class="phrase-btn ${selectedWrite.includes(index) ? "is-done" : ""}" onclick="toggleStoredIndex('${session.id}', 'anchorWrite', ${index})">${item}</button>`).join("")}</div>
        </div>
        <div class="sub-block">
          <h3>${state.language === "pt" ? "4 · Ferramenta de continuidade" : "4 · Continuity tool"}</h3>
          <div class="phrase-grid">${toolOptions.map((item, index) => `<button class="phrase-btn ${selectedTools.includes(index) ? "is-done" : ""}" onclick="toggleStoredIndex('${session.id}', 'continuityTools', ${index})">${item}</button>`).join("")}</div>
        </div>
        <div class="sub-block">
          <h3>${state.language === "pt" ? "5 · Carta à nova fase" : "5 · Letter to the new phase"}</h3>
          <p class="sub-help">${state.language === "pt" ? "Escreve à versão de ti que começa agora: quem és, o que levas contigo e o que escolhes deixar para trás." : "Write to the version of you that begins now: who you are, what you carry forward and what you choose to leave behind."}</p>
          <textarea class="journal-area compact" rows="5" placeholder="${state.language === "pt" ? "hoje começo uma nova fase..." : "today I begin a new phase..."}" oninput="saveContinuityLetter('${session.id}', this.value)">${getStored(storageKey(session.id, "continuityLetter"), "")}</textarea>
        </div>
        <div class="sub-block">
          <h3>${state.language === "pt" ? "6 · A minha escolha alinhada" : "6 · My aligned choice"}</h3>
          <textarea class="journal-area compact" rows="3" placeholder="${state.language === "pt" ? "durante 30 dias, eu escolho..." : "for 30 days, I choose..."}" oninput="saveContinuityChoice('${session.id}', this.value)">${choice}</textarea>
        </div>
      </div>
    </section>
  `;
}

function renderJourneyTimeline() {
  return `
    <section class="section last-section">
      <div class="section-head">
        <span class="section-label">${ui("path")}</span>
        <span class="section-value">${currentClient().mode === "new" ? ui("pathSub") : (state.language === "pt" ? "percurso personalizado" : "custom journey")}</span>
      </div>
      <div class="timeline-card">
        ${clientSessions().map(session => {
          const locked = session.status === "locked";
          const canOpen = !locked || previewLockedSessions();
          return `
            <button class="timeline-item ${session.status} ${session.id === state.activeSessionId ? "is-active" : ""}" ${canOpen ? `onclick="switchSession('${session.id}')"` : "disabled"}>
              <span class="timeline-dot phase-${session.phase}">${shortForTimeline(session)}</span>
              <span class="timeline-copy">
                <strong>${translate(session.title)}</strong>
                <small>${translate(session.intent)}</small>
              </span>
              <span class="timeline-status">${session.status === "locked" ? ui("locked") : session.status === "current" ? ui("current") : ui("done")}</span>
            </button>
          `;
        }).join("")}
      </div>
      <div class="mini-note">${currentClient().mode === "new" ? ui("lockedHint") : (state.language === "pt" ? "cliente em continuidade: a Daniela acrescenta as próximas semanas conforme o processo pedir" : "continuity client: Daniela adds the next weeks according to the process")}</div>
    </section>
  `;
}

function renderClearData() {
  return `
    <section class="section clear-section">
      <button class="clear-btn" onclick="clearClientStorage()">${ui("clear")}</button>
    </section>
  `;
}

function renderBottomNav(session) {
  const extraLabel = session.extra?.type === "reconnect" ? (state.language === "pt" ? "casulo" : "cocoon") : ui("navExtra");
  const buttons = [
    { id: "home", label: ui("navHome"), icon: "⌂" },
    { id: "audio", label: ui("navMeditation"), icon: "▷" },
    { id: "journal", label: ui("navJournal"), icon: "✎" },
    { id: "extra", label: extraLabel, icon: "♡" }
  ];
  return `
    <nav class="bottom-nav" aria-label="navegação principal">
      ${buttons.map(button => `
        <button class="nav-button ${state.activeTab === button.id ? "is-active" : ""}" onclick="switchTab('${button.id}')">
          <span>${button.icon}</span>${button.label}
        </button>
      `).join("")}
    </nav>
  `;
}

function setLanguage(language) {
  state.language = language;
  setStoredGlobal("language", language);
  renderApp();
}

function switchClient(clientId) {
  const client = INNER_PATH_DATA.clients.find(c => c.id === clientId);
  if (!client) return;
  state.activeClientId = clientId;
  state.activeSessionId = client.activeSessionId;
  state.activeTab = "home";
  setStoredGlobal("clientId", clientId);
  setClientInUrl(client);
  renderApp();
}

function switchSession(sessionId) {
  const session = sessionById(sessionId);
  if (!session) return;
  if (session.status === "locked" && !previewLockedSessions()) return;
  state.activeSessionId = sessionId;
  state.activeTab = "home";
  renderApp();
}

function switchTab(tab) {
  state.activeTab = tab;
  renderApp();
}

function toggleTask(sessionId, index) {
  const key = storageKey(sessionId, "tasks");
  const done = getStored(key, []);
  const next = done.includes(index) ? done.filter(item => item !== index) : [...done, index];
  setStored(key, next);
  renderApp();
}

function updateProgressLabel(session) {
  const label = document.getElementById("progress-label");
  const tasks = listForLang(session.tasks);
  if (!label || !tasks.length) return;
  const done = getStored(storageKey(session.id, "tasks"), []);
  label.textContent = `${Math.round((done.length / tasks.length) * 100)}%`;
}

function saveJournal(sessionId, index, value) {
  setStored(storageKey(sessionId, "journal", index), value);
}

function saveQuiz(sessionId, index, value) {
  setStored(storageKey(sessionId, "quiz", index), Number(value));
}

function saveCasulo(sessionId, areaId, value) {
  setStored(storageKey(sessionId, "casulo", areaId), Number(value));
}

function renderCasuloRadar(sessionId) {
  const svg = document.getElementById("casulo-radar");
  if (!svg) return;
  const cx = 110;
  const cy = 110;
  const maxR = 78;
  const areas = INNER_PATH_DATA.casuloAreas;
  const points = areas.map((area, index) => {
    const value = getStored(storageKey(sessionId, "casulo", area.id), 5);
    const angle = (-90 + (360 / areas.length) * index) * Math.PI / 180;
    const r = (value / 10) * maxR;
    return [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r];
  });
  const axis = areas.map((area, index) => {
    const angle = (-90 + (360 / areas.length) * index) * Math.PI / 180;
    const x = cx + Math.cos(angle) * maxR;
    const y = cy + Math.sin(angle) * maxR;
    return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" />`;
  }).join("");
  const rings = [2,4,6,8,10].map(step => `<circle cx="${cx}" cy="${cy}" r="${(step/10)*maxR}" />`).join("");
  svg.innerHTML = `<g class="radar-grid">${rings}${axis}</g><polygon class="radar-shape" points="${points.map(p => p.join(",")).join(" ")}" /><circle cx="${cx}" cy="${cy}" r="2" class="radar-center" />`;
}

function buildBreathDays(session) {
  const container = document.getElementById("breath-days");
  if (!container) return;
  const done = getStored(storageKey(session.id, "breath-days"), []);
  container.innerHTML = BREATH_DAYS[state.language].map((day, index) => `
    <button class="breath-day ${done.includes(index) ? "is-done" : ""}" onclick="toggleBreathDay('${session.id}', ${index})">${day}</button>
  `).join("");
}

function toggleBreathDay(sessionId, index) {
  const key = storageKey(sessionId, "breath-days");
  const done = getStored(key, []);
  const next = done.includes(index) ? done.filter(item => item !== index) : [...done, index];
  setStored(key, next);
  buildBreathDays(currentSession());
}

function toggleBreath() {
  if (state.breathRunning) {
    stopBreath(true);
    return;
  }
  state.breathRunning = true;
  state.breathStep = 0;
  runBreath();
}

function runBreath() {
  const circle = document.getElementById("breath-circle");
  if (!circle || !state.breathRunning) return;
  const inhale = state.breathStep % 2 === 0;
  circle.textContent = inhale ? ui("inhale") : ui("exhale");
  circle.classList.toggle("inhale", inhale);
  state.breathStep += 1;
  state.breathTimer = setTimeout(runBreath, 5000);
}

function stopBreath(updateText = true) {
  if (state.breathTimer) clearTimeout(state.breathTimer);
  state.breathRunning = false;
  state.breathTimer = null;
  const circle = document.getElementById("breath-circle");
  if (circle && updateText) {
    circle.textContent = ui("start");
    circle.classList.remove("inhale");
  }
}

function toggleTapPoint(sessionId, index) {
  const key = storageKey(sessionId, "tapping");
  const done = getStored(key, []);
  const next = done.includes(index) ? done.filter(item => item !== index) : [...done, index];
  setStored(key, next);
  renderApp();
}

function toggleStoredIndex(sessionId, bucket, index) {
  const key = storageKey(sessionId, bucket);
  const done = getStored(key, []);
  const next = done.includes(index) ? done.filter(item => item !== index) : [...done, index];
  setStored(key, next);
  renderApp();
}

function saveContinuityChoice(sessionId, value) {
  setStored(storageKey(sessionId, "anchorChoice"), value);
}

function saveContinuityLetter(sessionId, value) {
  setStored(storageKey(sessionId, "continuityLetter"), value);
}

function previewInnerChildPhoto(event, sessionId) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const img = document.getElementById(`inner-photo-preview-${sessionId}`);
    const label = document.getElementById(`inner-photo-label-${sessionId}`);
    if (img) {
      img.src = reader.result;
      img.classList.add("is-visible");
    }
    if (label) label.textContent = state.language === "pt" ? "foto adicionada" : "photo added";
  };
  reader.readAsDataURL(file);
}

function clearClientStorage() {
  const prefix = [STORAGE_PREFIX, currentClient().id].join(":");
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith(prefix)) localStorage.removeItem(key);
  });
  renderApp();
}

window.addEventListener("DOMContentLoaded", renderApp);
