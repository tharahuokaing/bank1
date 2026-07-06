/**
 * Phase 2: Regulatory & Legal Approval
 * Document verification & compliance tracking
 */

const phase2Data = {
    id: "phase2",
    title: "Phase 2: Regulatory & Legal Approval",
    storageKey: "phase2_progress",
    checklist: [
        "Corporate Governance & Legal Identity",
        "Biographical & Fit and Proper Documentation",
        "Business Plan & Financial Projections",
        "Risk & Compliance Frameworks",
        "Operational Agreements"
    ]
};

/* =====================================================
   RENDER
===================================================== */

function renderPhase2Details() {

    const summaryBox = document.getElementById("summaryBox");
    if (!summaryBox) return;

    if (document.getElementById("phase2Section")) {
        scrollToPhase2();
        return;
    }

    const container = document.createElement("section");
    container.id = "phase2Section";
    container.className = "phase-detail-box phase2-theme";

    container.innerHTML = `
        <header class="phase-header">
            <h2>${phase2Data.title}</h2>
        </header>

        <div class="compliance-status">
            <p>Status: <span id="complianceStatus">0% Complete</span></p>
            <div class="progress-wrapper">
                <div id="complianceBar" class="progress-bar"></div>
            </div>
        </div>

        <form id="phase2ChecklistForm" class="checklist-form"></form>
    `;

    summaryBox.appendChild(container);

    buildChecklist();
    restoreProgress();
    updateComplianceProgress();
    scrollToPhase2();

    safeLog("Phase 2 rendered.");
}

/* =====================================================
   BUILD CHECKLIST
===================================================== */

function buildChecklist() {

    const form = document.getElementById("phase2ChecklistForm");
    if (!form) return;

    phase2Data.checklist.forEach((item, index) => {

        const wrapper = document.createElement("div");
        wrapper.className = "check-item";

        wrapper.innerHTML = `
            <input type="checkbox" id="phase2-${index}" 
                   class="phase2-check" 
                   data-index="${index}">
            <label for="phase2-${index}">${item}</label>
        `;

        form.appendChild(wrapper);
    });

    form.addEventListener("change", () => {
        updateComplianceProgress();
        saveProgress();
    });
}

/* =====================================================
   PROGRESS LOGIC
===================================================== */

function updateComplianceProgress() {

    const checks = document.querySelectorAll(".phase2-check");
    if (!checks.length) return;

    const checked = Array.from(checks).filter(c => c.checked).length;
    const percentage = Math.round((checked / checks.length) * 100);

    const bar = document.getElementById("complianceBar");
    const status = document.getElementById("complianceStatus");

    if (bar) bar.style.width = percentage + "%";
    if (status) {
        status.textContent = percentage + "% Complete";
        status.style.color = percentage === 100 ? "#00ff88" : "#ff0";
    }

    if (percentage === 100) {
        safeLog("Phase 2 Compliance: All documents verified.");
    }
}

/* =====================================================
   STORAGE (PERSIST PROGRESS)
===================================================== */

function saveProgress() {

    const checks = document.querySelectorAll(".phase2-check");

    const state = Array.from(checks).map(c => c.checked);

    localStorage.setItem(phase2Data.storageKey, JSON.stringify(state));
}

function restoreProgress() {

    const saved = localStorage.getItem(phase2Data.storageKey);
    if (!saved) return;

    try {
        const state = JSON.parse(saved);
        const checks = document.querySelectorAll(".phase2-check");

        checks.forEach((checkbox, i) => {
            if (state[i]) checkbox.checked = true;
        });

    } catch (err) {
        console.warn("Phase2 restore error:", err);
    }
}

/* =====================================================
   HELPERS
===================================================== */

function scrollToPhase2() {
    const section = document.getElementById("phase2Section");
    if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

function safeLog(message) {
    if (typeof logActivity === "function") {
        logActivity(message);
    } else {
        console.log("[Phase2]", message);
    }
}

/* =====================================================
   GLOBAL LISTENER
===================================================== */

document.addEventListener("click", (e) => {

    if (!e.target || e.target.tagName !== "LI") return;

    const text = e.target.textContent || "";

    if (text.startsWith("Phase 2")) {
        renderPhase2Details();
    }
});