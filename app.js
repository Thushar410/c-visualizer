/**
 * C-Viz Main Application Controller — Complete Line-by-Line Turbo C Lab Edition
 * Optimized for Desktop & Smartphones (Touch & Small Screen Responsive)
 */

// State
let currentProgramKey = "partA_prog1";
let currentLineIndex = 0; // 0-based index of lines
let isPlaying = false;
let playInterval = null;
let playSpeed = 1500;
let currentCodeLines = [];
let hasUserClickedLine = false;

// DOM Elements
const programSelect = document.getElementById("programSelect");
const codeLinesContainer = document.getElementById("codeLines");
const stepPrevBtn = document.getElementById("stepPrevBtn");
const playPauseBtn = document.getElementById("playPauseBtn");
const stepNextBtn = document.getElementById("stepNextBtn");
const stepCounter = document.getElementById("stepCounter");
const stepSlider = document.getElementById("stepSlider");
const speedSelect = document.getElementById("speedSelect");

// Inspector Elements
const inspectorBox = document.getElementById("inspectorBox");
const inspectorPlaceholder = document.getElementById("inspectorPlaceholder");
const inspectorDetails = document.getElementById("inspectorDetails");
const inspectorLineBadge = document.getElementById("inspectorLineBadge");
const inspectorLineTitle = document.getElementById("inspectorLineTitle");
const inspectorCodePreview = document.getElementById("inspectorCodePreview");
const inspectorSimpleText = document.getElementById("inspectorSimpleText");
const inspectorUnderTheHood = document.getElementById("inspectorUnderTheHood");
const inspectorVivaTip = document.getElementById("inspectorVivaTip");

// Tab Containers
const allLinesCardsContainer = document.getElementById("allLinesCardsContainer");
const functionsContainer = document.getElementById("functionsContainer");
const loopsContainer = document.getElementById("loopsContainer");
const stackContainer = document.getElementById("stackContainer");
const terminalOutput = document.getElementById("terminalOutput");
const clearConsoleBtn = document.getElementById("clearConsoleBtn");
const resetBtn = document.getElementById("resetBtn");
const vivaModalBtn = document.getElementById("vivaModalBtn");
const vivaModal = document.getElementById("vivaModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalProgramTitle = document.getElementById("modalProgramTitle");
const vivaQuestionsList = document.getElementById("vivaQuestionsList");

// Tabs & Mobile Nav
const mainLayout = document.getElementById("mainLayout");
const mobileNavBtns = document.querySelectorAll(".mobile-nav-btn");
const tabAllLinesBtn = document.getElementById("tabAllLinesBtn");
const tabRolesBtn = document.getElementById("tabRolesBtn");
const tabMemoryBtn = document.getElementById("tabMemoryBtn");
const tabAllLinesContent = document.getElementById("tabAllLinesContent");
const tabRolesContent = document.getElementById("tabRolesContent");
const tabMemoryContent = document.getElementById("tabMemoryContent");

/**
 * Initialize
 */
function init() {
  if (mainLayout) {
    mainLayout.classList.add("mobile-view-code");
  }
  loadProgram(currentProgramKey);
  setupEventListeners();
  setupMobileNav();
}

/**
 * Load Program
 */
function loadProgram(key) {
  currentProgramKey = key;
  currentLineIndex = 0;
  hasUserClickedLine = false;
  pauseAnimation();

  // Reset inspector to placeholder initially
  inspectorPlaceholder.classList.remove("hidden");
  inspectorDetails.classList.add("hidden");

  const prog = LAB_PROGRAMS[key];
  if (!prog) return;

  currentCodeLines = prog.code.split("\n");

  renderCodeLines(currentCodeLines);
  renderAllLinesCards(currentCodeLines);
  renderFunctionRoles(prog.functionRoles || []);
  renderLoopBreakdowns(prog.loopBreakdown || []);
  renderVivaModalContent(prog);

  stepSlider.max = Math.max(0, currentCodeLines.length - 1);
  stepSlider.value = 0;
  stepCounter.textContent = `Line 1 / ${currentCodeLines.length}`;

  updateMemorySimulation(0);
}

/**
 * Render Code Lines in Left Editor
 */
function renderCodeLines(lines) {
  codeLinesContainer.innerHTML = "";

  lines.forEach((lineText, idx) => {
    const lineNum = idx + 1;
    const lineDiv = document.createElement("div");
    lineDiv.className = "code-line";
    lineDiv.dataset.lineIndex = idx;

    const numSpan = document.createElement("span");
    numSpan.className = "line-num";
    numSpan.textContent = lineNum;

    const contentSpan = document.createElement("span");
    contentSpan.className = "line-content";
    contentSpan.innerHTML = formatCodeLine(lineText);

    lineDiv.appendChild(numSpan);
    lineDiv.appendChild(contentSpan);

    // CLICK / TAP HANDLER: Reveal explanation only when tapped
    lineDiv.addEventListener("click", () => {
      pauseAnimation();
      hasUserClickedLine = true;
      inspectLine(idx, true);
    });

    codeLinesContainer.appendChild(lineDiv);
  });
}

function formatCodeLine(text) {
  if (!text.trim()) return "&nbsp;";
  if (text.trim().startsWith("//") || text.trim().startsWith("/*")) {
    return `<span style="color: #8b949e; font-style: italic;">${escapeHtml(text)}</span>`;
  }
  return escapeHtml(text);
}

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * Render All Line Explanation Cards in Right Tab 1
 */
function renderAllLinesCards(lines) {
  allLinesCardsContainer.innerHTML = "";

  lines.forEach((lineText, idx) => {
    const lineNum = idx + 1;
    const info = getUniversalLineExplanation(lineText, lineNum, currentProgramKey);

    const card = document.createElement("div");
    card.className = "line-card";
    card.id = `line-card-${idx}`;
    card.dataset.lineIndex = idx;

    card.innerHTML = `
      <div class="line-card-header">
        <span class="line-card-badge">Line ${lineNum}</span>
        <span class="line-card-title">${info.title}</span>
      </div>
      <div class="line-card-code">${escapeHtml(lineText.trim() || "(blank line)")}</div>
      <p class="line-card-simple"><strong>What it does:</strong> ${info.simple}</p>
      <div class="line-card-viva"><strong>🎓 Viva Point:</strong> ${info.vivaTip}</div>
    `;

    card.addEventListener("click", () => {
      pauseAnimation();
      hasUserClickedLine = true;
      inspectLine(idx, false);
    });

    allLinesCardsContainer.appendChild(card);
  });
}

/**
 * Inspect a Specific Line (Updates Inspector Box & Highlights)
 */
function inspectLine(index, shouldScrollCode = false) {
  if (index < 0) index = 0;
  if (index >= currentCodeLines.length) index = currentCodeLines.length - 1;
  currentLineIndex = index;

  const lineNum = index + 1;
  const lineText = currentCodeLines[index];
  const info = getUniversalLineExplanation(lineText, lineNum, currentProgramKey);

  // Update controls
  stepCounter.textContent = `Line ${lineNum} / ${currentCodeLines.length}`;
  stepSlider.value = index;

  // Highlight in Left Editor
  document.querySelectorAll(".code-line").forEach(l => l.classList.remove("active-line"));
  const activeLineEl = document.querySelector(`.code-line[data-line-index="${index}"]`);
  if (activeLineEl) {
    activeLineEl.classList.add("active-line");

    if (shouldScrollCode) {
      const container = activeLineEl.closest(".code-container");
      if (container) {
        const topDiff = activeLineEl.offsetTop - container.scrollTop;
        if (topDiff < 0 || topDiff > container.clientHeight - 40) {
          container.scrollTo({ top: activeLineEl.offsetTop - 60, behavior: "smooth" });
        }
      }
    }
  }

  // Highlight matching card in Right Tab 1
  document.querySelectorAll(".line-card").forEach(c => c.classList.remove("active-card"));
  const activeCardEl = document.getElementById(`line-card-${index}`);
  if (activeCardEl) {
    activeCardEl.classList.add("active-card");
  }

  // Reveal Inspector Content when clicked
  if (hasUserClickedLine) {
    inspectorPlaceholder.classList.add("hidden");
    inspectorDetails.classList.remove("hidden");

    inspectorLineBadge.textContent = `Line ${lineNum}`;
    inspectorLineTitle.textContent = info.title;
    inspectorCodePreview.textContent = lineText.trim() || "(blank line)";
    inspectorSimpleText.textContent = info.simple;
    inspectorUnderTheHood.textContent = info.underTheHood;
    inspectorVivaTip.textContent = info.vivaTip;

    // Smooth scroll inspector to view on mobile if needed
    if (window.innerWidth <= 768 && inspectorBox) {
      inspectorBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  // Update RAM simulation
  updateMemorySimulation(index);
}

/**
 * Update RAM Memory Simulation
 */
function updateMemorySimulation(index) {
  const prog = LAB_PROGRAMS[currentProgramKey];
  if (!prog) return;

  const steps = prog.steps || [];
  if (steps.length === 0) return;

  let activeStep = steps[0];
  for (let s of steps) {
    if (s.line <= index + 1) {
      activeStep = s;
    }
  }

  renderStack(activeStep.stack || []);
  renderTerminal(activeStep.terminal || []);
}

function renderStack(stackData) {
  stackContainer.innerHTML = "";
  if (stackData.length === 0) {
    stackContainer.innerHTML = `<div style="color: #64748b; font-size: 13px; text-align: center; padding: 15px;">Stack frame initialized</div>`;
    return;
  }

  stackData.forEach(item => {
    const slot = document.createElement("div");
    slot.className = `memory-slot ${item.isUpdated ? "updated" : ""}`;
    slot.innerHTML = `
      <div class="slot-addr">${item.address || "0x1000"}</div>
      <div>
        <span class="slot-var-name">${item.name}</span>
        <span class="slot-type">${item.type}</span>
      </div>
      <div class="slot-val-box">${item.value}</div>
    `;
    stackContainer.appendChild(slot);
  });
}

function renderTerminal(lines) {
  terminalOutput.innerHTML = `<span class="terminal-prompt">C:\\TURBOC3\\BIN\\TC.EXE</span>`;
  lines.forEach(l => {
    const lineEl = document.createElement("div");
    lineEl.className = "terminal-line";
    lineEl.textContent = l;
    terminalOutput.appendChild(lineEl);
  });
}

/**
 * Render Functions & Loops
 */
function renderFunctionRoles(funcs) {
  functionsContainer.innerHTML = "";
  funcs.forEach(f => {
    const card = document.createElement("div");
    card.className = "role-card";
    card.innerHTML = `
      <div class="role-card-header">
        <span class="role-func-name">${f.name}</span>
        <span class="role-badge">${f.role}</span>
      </div>
      <p class="role-desc">${f.desc}</p>
    `;
    functionsContainer.appendChild(card);
  });
}

function renderLoopBreakdowns(loops) {
  loopsContainer.innerHTML = "";
  loops.forEach(l => {
    const card = document.createElement("div");
    card.className = "loop-card";
    let detailsHtml = "";
    if (l.details && l.details.length > 0) {
      detailsHtml = `<ul class="loop-details-list">` + 
        l.details.map(d => `<li>${d}</li>`).join("") + 
        `</ul>`;
    }
    card.innerHTML = `
      <div class="loop-header-tag">${l.header}</div>
      <div class="loop-purpose">${l.purpose}</div>
      ${detailsHtml}
    `;
    loopsContainer.appendChild(card);
  });
}

function renderVivaModalContent(prog) {
  modalProgramTitle.innerHTML = `<i data-lucide="graduation-cap"></i> ${prog.title} — Viva Q&A`;
  vivaQuestionsList.innerHTML = "";

  (prog.vivaQuestions || []).forEach((item, idx) => {
    const div = document.createElement("div");
    div.className = "viva-item";
    div.innerHTML = `
      <h4>Q${idx + 1}: ${item.q}</h4>
      <p><strong>Answer for Examiner:</strong> ${item.a}</p>
    `;
    vivaQuestionsList.appendChild(div);
  });
  lucide.createIcons();
}

/**
 * Playback Controls
 */
function togglePlayPause() {
  if (isPlaying) {
    pauseAnimation();
  } else {
    startAnimation();
  }
}

function startAnimation() {
  hasUserClickedLine = true;
  if (currentLineIndex >= currentCodeLines.length - 1) {
    currentLineIndex = 0;
  }
  isPlaying = true;
  playPauseBtn.innerHTML = `<i data-lucide="pause"></i> Pause`;
  lucide.createIcons();

  playInterval = setInterval(() => {
    if (currentLineIndex < currentCodeLines.length - 1) {
      currentLineIndex++;
      inspectLine(currentLineIndex, true);
    } else {
      pauseAnimation();
    }
  }, playSpeed);
}

function pauseAnimation() {
  isPlaying = false;
  clearInterval(playInterval);
  playInterval = null;
  playPauseBtn.innerHTML = `<i data-lucide="play"></i> Play`;
  lucide.createIcons();
}

/**
 * Mobile Navigation Switcher
 */
function setupMobileNav() {
  mobileNavBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      mobileNavBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const view = btn.dataset.view; // 'code', 'all-lines', 'roles', 'dos'
      if (mainLayout) {
        mainLayout.classList.remove("mobile-view-code", "mobile-view-all-lines", "mobile-view-roles", "mobile-view-dos");
        mainLayout.classList.add(`mobile-view-${view}`);
      }

      if (view === "all-lines") {
        activateTab(tabAllLinesBtn, tabAllLinesContent);
      } else if (view === "roles") {
        activateTab(tabRolesBtn, tabRolesContent);
      } else if (view === "dos") {
        activateTab(tabMemoryBtn, tabMemoryContent);
      }
    });
  });
}

/**
 * Setup Event Listeners
 */
function setupEventListeners() {
  programSelect.addEventListener("change", (e) => loadProgram(e.target.value));

  playPauseBtn.addEventListener("click", togglePlayPause);

  stepNextBtn.addEventListener("click", () => {
    pauseAnimation();
    hasUserClickedLine = true;
    if (currentLineIndex < currentCodeLines.length - 1) {
      currentLineIndex++;
      inspectLine(currentLineIndex, true);
    }
  });

  stepPrevBtn.addEventListener("click", () => {
    pauseAnimation();
    hasUserClickedLine = true;
    if (currentLineIndex > 0) {
      currentLineIndex--;
      inspectLine(currentLineIndex, true);
    }
  });

  stepSlider.addEventListener("input", (e) => {
    pauseAnimation();
    hasUserClickedLine = true;
    inspectLine(parseInt(e.target.value), true);
  });

  speedSelect.addEventListener("change", (e) => {
    playSpeed = parseInt(e.target.value);
    if (isPlaying) {
      pauseAnimation();
      startAnimation();
    }
  });

  resetBtn.addEventListener("click", () => {
    pauseAnimation();
    hasUserClickedLine = false;
    inspectorPlaceholder.classList.remove("hidden");
    inspectorDetails.classList.add("hidden");
    inspectLine(0, true);
  });

  clearConsoleBtn.addEventListener("click", () => {
    terminalOutput.innerHTML = `<span class="terminal-prompt">C:\\TURBOC3\\BIN\\TC.EXE</span>`;
  });

  // 3-Tab Navigation (Desktop)
  tabAllLinesBtn.addEventListener("click", () => {
    activateTab(tabAllLinesBtn, tabAllLinesContent);
  });

  tabRolesBtn.addEventListener("click", () => {
    activateTab(tabRolesBtn, tabRolesContent);
  });

  tabMemoryBtn.addEventListener("click", () => {
    activateTab(tabMemoryBtn, tabMemoryContent);
  });

  // Modal
  vivaModalBtn.addEventListener("click", () => vivaModal.classList.remove("hidden"));
  closeModalBtn.addEventListener("click", () => vivaModal.classList.add("hidden"));
  vivaModal.addEventListener("click", (e) => {
    if (e.target === vivaModal) vivaModal.classList.add("hidden");
  });

  // Keyboard navigation
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      stepNextBtn.click();
    } else if (e.key === "ArrowLeft") {
      stepPrevBtn.click();
    } else if (e.key === " ") {
      e.preventDefault();
      togglePlayPause();
    }
  });
}

function activateTab(btn, content) {
  document.querySelectorAll(".panel-tab").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".tab-content").forEach(c => {
    c.classList.add("hidden");
    c.classList.remove("active-content");
  });

  btn.classList.add("active");
  content.classList.remove("hidden");
  content.classList.add("active-content");
}

document.addEventListener("DOMContentLoaded", init);
