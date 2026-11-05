/**
 * C-Viz Main Application Controller — Shree Devi College Turbo C Lab Manual Edition
 */

// State
let currentProgramKey = "partA_prog1";
let currentStepIndex = 0;
let isPlaying = false;
let playInterval = null;
let playSpeed = 1500;

// DOM Elements
const programSelect = document.getElementById("programSelect");
const codeLinesContainer = document.getElementById("codeLines");
const stepPrevBtn = document.getElementById("stepPrevBtn");
const playPauseBtn = document.getElementById("playPauseBtn");
const stepNextBtn = document.getElementById("stepNextBtn");
const stepCounter = document.getElementById("stepCounter");
const stepSlider = document.getElementById("stepSlider");
const speedSelect = document.getElementById("speedSelect");
const explanationText = document.getElementById("explanationText");
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

// Tabs
const tabRolesBtn = document.getElementById("tabRolesBtn");
const tabMemoryBtn = document.getElementById("tabMemoryBtn");
const tabRolesContent = document.getElementById("tabRolesContent");
const tabMemoryContent = document.getElementById("tabMemoryContent");

/**
 * Initialize Application
 */
function init() {
  loadProgram(currentProgramKey);
  setupEventListeners();
}

/**
 * Load a Lab Program
 */
function loadProgram(key) {
  currentProgramKey = key;
  currentStepIndex = 0;
  pauseAnimation();

  const prog = LAB_PROGRAMS[key];
  if (!prog) return;

  renderCodeLines(prog.code);
  renderFunctionRoles(prog.functionRoles || []);
  renderLoopBreakdowns(prog.loopBreakdown || []);
  renderVivaModalContent(prog);

  stepSlider.max = Math.max(0, prog.steps.length - 1);
  stepSlider.value = 0;

  renderCurrentStep();
}

/**
 * Render Code Lines with Line Numbers
 */
function renderCodeLines(code) {
  codeLinesContainer.innerHTML = "";
  const lines = code.split("\n");

  lines.forEach((lineText, idx) => {
    const lineNum = idx + 1;
    const lineDiv = document.createElement("div");
    lineDiv.className = "code-line";
    lineDiv.dataset.lineNum = lineNum;

    const numSpan = document.createElement("span");
    numSpan.className = "line-num";
    numSpan.textContent = lineNum;

    const contentSpan = document.createElement("span");
    contentSpan.className = "line-content";
    contentSpan.innerHTML = formatCodeLine(lineText);

    lineDiv.appendChild(numSpan);
    lineDiv.appendChild(contentSpan);

    // Jump to step on click
    lineDiv.addEventListener("click", () => {
      const prog = LAB_PROGRAMS[currentProgramKey];
      if (!prog) return;
      const stepIdx = prog.steps.findIndex(s => s.line === lineNum);
      if (stepIdx !== -1) {
        currentStepIndex = stepIdx;
        renderCurrentStep();
      }
    });

    codeLinesContainer.appendChild(lineDiv);
  });
}

function formatCodeLine(text) {
  if (!text.trim()) return "&nbsp;";
  if (text.trim().startsWith("//")) {
    return `<span style="color: #8b949e; font-style: italic;">${escapeHtml(text)}</span>`;
  }
  return escapeHtml(text);
}

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * Render Role of Functions
 */
function renderFunctionRoles(funcs) {
  functionsContainer.innerHTML = "";
  if (funcs.length === 0) {
    functionsContainer.innerHTML = `<p style="color: var(--text-muted); font-size: 13px;">Standard main() function.</p>`;
    return;
  }

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

/**
 * Render Role of Loops & Conditions
 */
function renderLoopBreakdowns(loops) {
  loopsContainer.innerHTML = "";
  if (loops.length === 0) {
    loopsContainer.innerHTML = `<p style="color: var(--text-muted); font-size: 13px;">No loops used in this program.</p>`;
    return;
  }

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

/**
 * Render Viva Questions in Modal
 */
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
 * Render Current Step
 */
function renderCurrentStep() {
  const prog = LAB_PROGRAMS[currentProgramKey];
  if (!prog || !prog.steps || prog.steps.length === 0) return;

  if (currentStepIndex >= prog.steps.length) {
    currentStepIndex = prog.steps.length - 1;
    pauseAnimation();
  }
  if (currentStepIndex < 0) currentStepIndex = 0;

  const step = prog.steps[currentStepIndex];

  // Update controls
  stepCounter.textContent = `Step ${currentStepIndex + 1} / ${prog.steps.length}`;
  stepSlider.value = currentStepIndex;

  // Highlight active line
  document.querySelectorAll(".code-line").forEach(l => l.classList.remove("active-line"));
  if (step.line) {
    const activeLineEl = document.querySelector(`.code-line[data-line-num="${step.line}"]`);
    if (activeLineEl) {
      activeLineEl.classList.add("active-line");
      activeLineEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  // Update explanation
  explanationText.textContent = step.explanation;

  // Render RAM
  renderStack(step.stack || []);

  // Render Terminal
  renderTerminal(step.terminal || []);
}

function renderStack(stackData) {
  stackContainer.innerHTML = "";
  if (stackData.length === 0) {
    stackContainer.innerHTML = `<div style="color: #64748b; font-size: 13px; text-align: center; padding: 15px;">Stack frame active</div>`;
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
 * Play / Pause
 */
function togglePlayPause() {
  if (isPlaying) {
    pauseAnimation();
  } else {
    startAnimation();
  }
}

function startAnimation() {
  const prog = LAB_PROGRAMS[currentProgramKey];
  if (currentStepIndex >= prog.steps.length - 1) {
    currentStepIndex = 0;
  }
  isPlaying = true;
  playPauseBtn.innerHTML = `<i data-lucide="pause"></i> Pause`;
  lucide.createIcons();

  playInterval = setInterval(() => {
    const p = LAB_PROGRAMS[currentProgramKey];
    if (currentStepIndex < p.steps.length - 1) {
      currentStepIndex++;
      renderCurrentStep();
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
 * Event Listeners
 */
function setupEventListeners() {
  programSelect.addEventListener("change", (e) => loadProgram(e.target.value));

  playPauseBtn.addEventListener("click", togglePlayPause);

  stepNextBtn.addEventListener("click", () => {
    pauseAnimation();
    const p = LAB_PROGRAMS[currentProgramKey];
    if (currentStepIndex < p.steps.length - 1) {
      currentStepIndex++;
      renderCurrentStep();
    }
  });

  stepPrevBtn.addEventListener("click", () => {
    pauseAnimation();
    if (currentStepIndex > 0) {
      currentStepIndex--;
      renderCurrentStep();
    }
  });

  stepSlider.addEventListener("input", (e) => {
    pauseAnimation();
    currentStepIndex = parseInt(e.target.value);
    renderCurrentStep();
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
    currentStepIndex = 0;
    renderCurrentStep();
  });

  clearConsoleBtn.addEventListener("click", () => {
    terminalOutput.innerHTML = `<span class="terminal-prompt">C:\\TURBOC3\\BIN\\TC.EXE</span>`;
  });

  // Tab switching
  tabRolesBtn.addEventListener("click", () => {
    tabRolesBtn.classList.add("active");
    tabMemoryBtn.classList.remove("active");
    tabRolesContent.classList.remove("hidden");
    tabRolesContent.classList.add("active-content");
    tabMemoryContent.classList.add("hidden");
    tabMemoryContent.classList.remove("active-content");
  });

  tabMemoryBtn.addEventListener("click", () => {
    tabMemoryBtn.classList.add("active");
    tabRolesBtn.classList.remove("active");
    tabMemoryContent.classList.remove("hidden");
    tabMemoryContent.classList.add("active-content");
    tabRolesContent.classList.add("hidden");
    tabRolesContent.classList.remove("active-content");
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

document.addEventListener("DOMContentLoaded", init);
