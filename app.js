/**
 * C-Viz Main Application Controller
 */

// State Management
let currentPresetKey = "pointers_basic";
let currentStepIndex = 0;
let isPlaying = false;
let playInterval = null;
let playSpeed = 1500;

// DOM Elements
const presetSelect = document.getElementById("presetSelect");
const codeLinesContainer = document.getElementById("codeLines");
const customCodeEditor = document.getElementById("customCodeEditor");
const stepPrevBtn = document.getElementById("stepPrevBtn");
const playPauseBtn = document.getElementById("playPauseBtn");
const stepNextBtn = document.getElementById("stepNextBtn");
const stepCounter = document.getElementById("stepCounter");
const stepSlider = document.getElementById("stepSlider");
const speedSelect = document.getElementById("speedSelect");
const explanationText = document.getElementById("explanationText");
const vivaTipText = document.getElementById("vivaTipText");
const stackContainer = document.getElementById("stackContainer");
const heapCard = document.getElementById("heapCard");
const heapContainer = document.getElementById("heapContainer");
const pointerSvg = document.getElementById("pointerSvg");
const terminalOutput = document.getElementById("terminalOutput");
const clearConsoleBtn = document.getElementById("clearConsoleBtn");
const resetBtn = document.getElementById("resetBtn");
const examTipsBtn = document.getElementById("examTipsBtn");
const vivaModal = document.getElementById("vivaModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const tokenTooltip = document.getElementById("tokenTooltip");

/**
 * Initialize Application
 */
function init() {
  loadPreset(currentPresetKey);
  setupEventListeners();
  window.addEventListener("resize", () => renderPointerArrows());
}

/**
 * Load a Code Preset
 */
function loadPreset(key) {
  currentPresetKey = key;
  currentStepIndex = 0;
  pauseAnimation();

  if (key === "custom") {
    codeLinesContainer.classList.add("hidden");
    customCodeEditor.classList.remove("hidden");
    customCodeEditor.value = `// Type simple C code here:
int x = 10;
int *ptr = &x;
*ptr = 99;
printf("x is %d\\n", x);`;
    parseAndLoadCustomCode();
    return;
  }

  codeLinesContainer.classList.remove("hidden");
  customCodeEditor.classList.add("hidden");

  const preset = EXAM_PRESETS[key];
  if (!preset) return;

  renderCodeLines(preset.code);
  stepSlider.max = preset.steps.length - 1;
  stepSlider.value = 0;

  renderCurrentStep();
}

/**
 * Render Interactive Code Lines with Syntax Highlighting & Token Tooltips
 */
function renderCodeLines(code) {
  codeLinesContainer.innerHTML = "";
  const lines = code.split("\n");

  lines.forEach((lineText, idx) => {
    const lineNum = idx + 1;
    const lineDiv = document.createElement("div");
    lineDiv.className = "code-line";
    lineDiv.dataset.lineNum = lineNum;

    // Line Number
    const numSpan = document.createElement("span");
    numSpan.className = "line-num";
    numSpan.textContent = lineNum;

    // Line Content with Syntax Highlighting
    const contentSpan = document.createElement("span");
    contentSpan.className = "line-content";
    contentSpan.innerHTML = highlightSyntax(lineText);

    lineDiv.appendChild(numSpan);
    lineDiv.appendChild(contentSpan);

    // Click to Jump to Step
    lineDiv.addEventListener("click", () => {
      const steps = getCurrentSteps();
      const targetStep = steps.findIndex(s => s.line === lineNum);
      if (targetStep !== -1) {
        currentStepIndex = targetStep;
        renderCurrentStep();
      }
    });

    codeLinesContainer.appendChild(lineDiv);
  });

  attachTokenInteractions();
}

/**
 * Lightweight C Syntax Highlighter
 */
function highlightSyntax(code) {
  if (!code.trim()) return "&nbsp;";

  // Handle comments
  if (code.trim().startsWith("//")) {
    return `<span class="syn-comment">${escapeHtml(code)}</span>`;
  }

  let escaped = escapeHtml(code);

  // Strings
  escaped = escaped.replace(/(".*?")/g, '<span class="syn-str">$1</span>');

  // Keywords & Types
  const keywords = ["return", "if", "else", "for", "while", "void", "sizeof"];
  keywords.forEach(kw => {
    const regex = new RegExp(`\\b(${kw})\\b`, "g");
    escaped = escaped.replace(regex, `<span class="syn-keyword syn-interactive" data-token="${kw}">$1</span>`);
  });

  const types = ["int", "char", "float", "double"];
  types.forEach(tp => {
    const regex = new RegExp(`\\b(${tp})\\b`, "g");
    escaped = escaped.replace(regex, `<span class="syn-type syn-interactive" data-token="${tp}">$1</span>`);
  });

  // Built-in functions
  const funcs = ["printf", "malloc", "free"];
  funcs.forEach(fn => {
    const regex = new RegExp(`\\b(${fn})\\b`, "g");
    escaped = escaped.replace(regex, `<span class="syn-func syn-interactive" data-token="${fn}">$1</span>`);
  });

  // Operators of special interest in C
  escaped = escaped.replace(/(\*)/g, '<span class="syn-ptr syn-interactive" data-token="*">$1</span>');
  escaped = escaped.replace(/(&amp;|&)/g, '<span class="syn-addr syn-interactive" data-token="&">&amp;</span>');

  return escaped;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Attach Hover & Click Info Tooltips to Code Tokens
 */
function attachTokenInteractions() {
  const interactiveTokens = document.querySelectorAll(".syn-interactive");
  interactiveTokens.forEach(el => {
    el.addEventListener("mouseenter", (e) => {
      const token = el.dataset.token;
      const def = TOKEN_DEFINITIONS[token];
      if (def) {
        tokenTooltip.innerHTML = `<strong>${token}</strong>: ${def}`;
        tokenTooltip.classList.remove("hidden");
        const rect = el.getBoundingClientRect();
        tokenTooltip.style.top = `${rect.bottom + 8}px`;
        tokenTooltip.style.left = `${Math.min(rect.left, window.innerWidth - 280)}px`;
      }
    });

    el.addEventListener("mouseleave", () => {
      tokenTooltip.classList.add("hidden");
    });
  });
}

/**
 * Get Active Steps
 */
function getCurrentSteps() {
  if (currentPresetKey === "custom") {
    return window.customSteps || [];
  }
  return EXAM_PRESETS[currentPresetKey]?.steps || [];
}

/**
 * Render Current Simulation Step
 */
function renderCurrentStep() {
  const steps = getCurrentSteps();
  if (steps.length === 0) return;

  if (currentStepIndex >= steps.length) {
    currentStepIndex = steps.length - 1;
    pauseAnimation();
  }
  if (currentStepIndex < 0) currentStepIndex = 0;

  const step = steps[currentStepIndex];

  // Update Controls
  stepCounter.textContent = `Step ${currentStepIndex + 1} / ${steps.length}`;
  stepSlider.value = currentStepIndex;

  // Highlight Active Line in Code
  document.querySelectorAll(".code-line").forEach(l => l.classList.remove("active-line"));
  if (step.line) {
    const activeLineEl = document.querySelector(`.code-line[data-line-num="${step.line}"]`);
    if (activeLineEl) {
      activeLineEl.classList.add("active-line");
      activeLineEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  // Update Explanation & Viva Note
  explanationText.textContent = step.explanation;
  vivaTipText.innerHTML = step.vivaTip || "Understanding memory layouts is the key to mastering C!";

  // Render Stack Memory
  renderStack(step.stack || []);

  // Render Heap Memory
  renderHeap(step.heap || []);

  // Render Terminal Output
  renderTerminal(step.terminal || []);

  // Render Animated Pointer SVG Arrows
  setTimeout(() => {
    renderPointerArrows(step.pointers || []);
  }, 50);
}

/**
 * Render Stack Slots
 */
function renderStack(stackData) {
  stackContainer.innerHTML = "";

  if (stackData.length === 0) {
    stackContainer.innerHTML = `<div style="color: #64748b; font-size: 13px; text-align: center; padding: 20px;">
      Stack empty (Functions popped / unallocated)
    </div>`;
    return;
  }

  stackData.forEach(item => {
    const slotDiv = document.createElement("div");
    slotDiv.className = `memory-slot ${item.isUpdated ? "updated" : ""} ${item.pointsTo ? "pointer-slot" : ""}`;
    slotDiv.id = `slot-${cleanVarName(item.name)}`;
    slotDiv.dataset.address = item.address;

    slotDiv.innerHTML = `
      <div class="slot-addr">${item.address}</div>
      <div class="slot-name-type">
        <span class="slot-var-name">${item.name}</span>
        <span class="slot-type">${item.type}</span>
      </div>
      <div class="slot-val-box">
        <span>${item.value}</span>
        ${item.pointsTo ? `<span class="pointer-target-indicator">➔ ${item.pointsTo}</span>` : ""}
      </div>
      <div class="slot-bytes-badge">${item.bytes} bytes</div>
    `;

    // Interactive hover: hovering memory slot highlights active line
    slotDiv.addEventListener("mouseenter", () => {
      slotDiv.classList.add("highlighted");
    });
    slotDiv.addEventListener("mouseleave", () => {
      slotDiv.classList.remove("highlighted");
    });

    stackContainer.appendChild(slotDiv);
  });
}

/**
 * Render Heap Slots
 */
function renderHeap(heapData) {
  heapContainer.innerHTML = "";

  if (!heapData || heapData.length === 0) {
    heapCard.classList.add("hidden");
    return;
  }

  heapCard.classList.remove("hidden");

  heapData.forEach(item => {
    const slotDiv = document.createElement("div");
    slotDiv.className = `memory-slot ${item.isUpdated ? "updated" : ""} ${item.isFreed ? "freed-slot" : ""}`;
    slotDiv.id = `slot-${cleanVarName(item.name)}`;
    slotDiv.dataset.address = item.address;

    slotDiv.innerHTML = `
      <div class="slot-addr" style="color: var(--accent-amber);">${item.address}</div>
      <div class="slot-name-type">
        <span class="slot-var-name" style="color: var(--accent-amber);">${item.name}</span>
        <span class="slot-type">Heap Chunk</span>
      </div>
      <div class="slot-val-box">
        <span style="${item.isFreed ? 'color: #f87171;' : ''}">${item.value}</span>
      </div>
      <div class="slot-bytes-badge">${item.bytes} bytes</div>
    `;

    heapContainer.appendChild(slotDiv);
  });
}

/**
 * Render Terminal Console
 */
function renderTerminal(terminalLines) {
  terminalOutput.innerHTML = `<span class="terminal-prompt">$ ./program</span>`;
  terminalLines.forEach(line => {
    const lineEl = document.createElement("div");
    lineEl.className = "terminal-line";
    lineEl.textContent = line;
    terminalOutput.appendChild(lineEl);
  });
}

/**
 * Render SVG Pointer Connecting Arrows
 */
function renderPointerArrows(pointers) {
  pointerSvg.innerHTML = "";
  if (!pointers || pointers.length === 0) return;

  const svgRect = pointerSvg.getBoundingClientRect();

  pointers.forEach(ptr => {
    const fromEl = document.getElementById(`slot-${cleanVarName(ptr.from)}`);
    const toEl = document.querySelector(`.memory-slot[data-address="${ptr.toAddr}"]`);

    if (fromEl && toEl) {
      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();

      const startX = fromRect.right - svgRect.left - 15;
      const startY = fromRect.top + fromRect.height / 2 - svgRect.top;

      const endX = toRect.left - svgRect.left + 5;
      const endY = toRect.top + toRect.height / 2 - svgRect.top;

      // Draw curved bezier path
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      const curvature = 40;
      const d = `M ${startX} ${startY} C ${startX + curvature} ${startY}, ${endX - curvature} ${endY}, ${endX} ${endY}`;

      path.setAttribute("d", d);
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "#ec4899");
      path.setAttribute("stroke-width", "2.5");
      path.setAttribute("stroke-dasharray", "4");
      path.setAttribute("marker-end", "url(#arrowhead)");

      // Arrowhead marker definition
      let defs = pointerSvg.querySelector("defs");
      if (!defs) {
        defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
        marker.setAttribute("id", "arrowhead");
        marker.setAttribute("markerWidth", "8");
        marker.setAttribute("markerHeight", "8");
        marker.setAttribute("refX", "6");
        marker.setAttribute("refY", "3");
        marker.setAttribute("orient", "auto");
        marker.innerHTML = `<path d="M0,0 L0,6 L6,3 z" fill="#ec4899" />`;
        defs.appendChild(marker);
        pointerSvg.appendChild(defs);
      }

      pointerSvg.appendChild(path);
    }
  });
}

function cleanVarName(name) {
  return name.replace(/[^a-zA-Z0-9_]/g, "_");
}

/**
 * Play / Pause Animation Loop
 */
function togglePlayPause() {
  if (isPlaying) {
    pauseAnimation();
  } else {
    startAnimation();
  }
}

function startAnimation() {
  const steps = getCurrentSteps();
  if (currentStepIndex >= steps.length - 1) {
    currentStepIndex = 0;
  }
  isPlaying = true;
  playPauseBtn.innerHTML = `<i data-lucide="pause"></i> Pause`;
  lucide.createIcons();

  playInterval = setInterval(() => {
    const steps = getCurrentSteps();
    if (currentStepIndex < steps.length - 1) {
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
 * Custom Code Parser (Evaluates simple C snippets for instant experimentation)
 */
function parseAndLoadCustomCode() {
  const code = customCodeEditor.value;
  const lines = code.split("\n");
  const steps = [];

  const memory = {};
  const terminal = [];
  let nextAddr = 0x1000;

  lines.forEach((lineText, idx) => {
    const trimmed = lineText.trim();
    if (!trimmed || trimmed.startsWith("//")) return;

    // Pattern: int x = 10;
    const intDecl = trimmed.match(/^int\s+([a-zA-Z_]\w*)\s*=\s*(-?\d+);/);
    if (intDecl) {
      const varName = intDecl[1];
      const val = intDecl[2];
      const addr = "0x" + nextAddr.toString(16).toUpperCase();
      nextAddr += 4;
      memory[varName] = { name: varName, type: "int", address: addr, value: val, bytes: 4 };

      steps.push({
        line: idx + 1,
        explanation: `Allocates 4 bytes for integer '${varName}' at address ${addr} with initial value ${val}.`,
        vivaTip: `<strong>Variable Declaration:</strong> Allocates 4 bytes on stack frame.`,
        stack: Object.values(memory).map(m => ({ ...m, isUpdated: m.name === varName })),
        terminal: [...terminal]
      });
      return;
    }

    // Pattern: int *ptr = &x;
    const ptrDecl = trimmed.match(/^int\s*\*\s*([a-zA-Z_]\w*)\s*=\s*&([a-zA-Z_]\w*);/);
    if (ptrDecl) {
      const ptrName = ptrDecl[1];
      const targetName = ptrDecl[2];
      const target = memory[targetName];
      const addr = "0x" + nextAddr.toString(16).toUpperCase();
      nextAddr += 8;

      if (target) {
        memory[ptrName] = { name: ptrName, type: "int*", address: addr, value: target.address, bytes: 8, pointsTo: target.address };
        steps.push({
          line: idx + 1,
          explanation: `Pointer '${ptrName}' initialized with address of '${targetName}' (${target.address}).`,
          vivaTip: `<strong>Pointer Link:</strong> '${ptrName}' holds the memory address of '${targetName}'.`,
          stack: Object.values(memory).map(m => ({ ...m, isUpdated: m.name === ptrName })),
          pointers: [{ from: ptrName, toAddr: target.address }],
          terminal: [...terminal]
        });
      }
      return;
    }

    // Pattern: *ptr = 99;
    const ptrDeref = trimmed.match(/^\*([a-zA-Z_]\w*)\s*=\s*(-?\d+);/);
    if (ptrDeref) {
      const ptrName = ptrDeref[1];
      const newVal = ptrDeref[2];
      const ptr = memory[ptrName];

      if (ptr && ptr.pointsTo) {
        // Find target variable
        const target = Object.values(memory).find(m => m.address === ptr.pointsTo);
        if (target) {
          target.value = newVal;
          steps.push({
            line: idx + 1,
            explanation: `Dereference: *${ptrName} follows address ${ptr.pointsTo} and updates '${target.name}' to ${newVal}.`,
            vivaTip: `<strong>Dereference:</strong> Modifying *${ptrName} changes the value in '${target.name}'.`,
            stack: Object.values(memory).map(m => ({ ...m, isUpdated: m.name === target.name })),
            pointers: [{ from: ptrName, toAddr: target.address }],
            terminal: [...terminal]
          });
        }
      }
      return;
    }

    // Pattern: printf(...)
    if (trimmed.includes("printf")) {
      terminal.push("Custom execution output.");
      steps.push({
        line: idx + 1,
        explanation: `printf() executed. Outputs string to stdout.`,
        vivaTip: `<strong>Terminal I/O:</strong> Writes text to stdout stream.`,
        stack: Object.values(memory),
        terminal: [...terminal]
      });
    }
  });

  window.customSteps = steps;
  stepSlider.max = Math.max(0, steps.length - 1);
  stepSlider.value = 0;
  currentStepIndex = 0;
  renderCurrentStep();
}

/**
 * Event Listeners Setup
 */
function setupEventListeners() {
  presetSelect.addEventListener("change", (e) => loadPreset(e.target.value));

  playPauseBtn.addEventListener("click", togglePlayPause);

  stepNextBtn.addEventListener("click", () => {
    pauseAnimation();
    const steps = getCurrentSteps();
    if (currentStepIndex < steps.length - 1) {
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
    terminalOutput.innerHTML = `<span class="terminal-prompt">$ ./program</span>`;
  });

  // Modal Controls
  examTipsBtn.addEventListener("click", () => vivaModal.classList.remove("hidden"));
  closeModalBtn.addEventListener("click", () => vivaModal.classList.add("hidden"));
  vivaModal.addEventListener("click", (e) => {
    if (e.target === vivaModal) vivaModal.classList.add("hidden");
  });

  // Custom editor input change
  customCodeEditor.addEventListener("input", () => {
    parseAndLoadCustomCode();
  });

  // Keyboard navigation
  window.addEventListener("keydown", (e) => {
    if (document.activeElement === customCodeEditor) return;
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

// Start app
document.addEventListener("DOMContentLoaded", init);
