/**
 * Phase 17: Central Bank Supervisory AI
 * Full Institutional Review & Regulatory Classification
 */

const phase17State = {
    storageKey: "phase17_state",
    inspectionComplete: false
};

function renderPhase17Details() {

    const summaryBox = document.getElementById("summaryBox");
    if (!summaryBox) return;

    if (document.getElementById("phase17Section")) {
        scrollToPhase17();
        return;
    }

    const container = document.createElement("section");
    container.id = "phase17Section";
    container.className = "phase-detail-box phase17-theme";

    container.innerHTML = `
        <header class="phase-header">
            <h2>Phase 17: Central Bank Supervisory AI</h2>
            <p>Regulatory Inspection | Prudential Oversight | Institutional Rating</p>
        </header>

        <div class="supervision-panel">

            <div class="supervision-metrics">
                <div>Capital Adequacy Signal: <span id="capitalSignal">—</span></div>
                <div>Risk Governance Signal: <span id="riskSignal">—</span></div>
                <div>Technology Resilience Signal: <span id="techSignal">—</span></div>
                <div>Compliance Integrity Signal: <span id="complianceSignal">—</span></div>
            </div>

            <div class="inspection-controls">
                <button id="runInspectionBtn">Run Supervisory Inspection</button>
                <button id="certifyInstitutionBtn">Issue Regulatory Classification</button>
            </div>

            <div class="inspection-summary">
                <div>Supervisory Rating: <span id="supervisoryRating">—</span></div>
                <div>Enforcement Risk Level: <span id="enforcementRisk">—</span></div>
            </div>

            <div id="inspectionVerdict" class="inspection-verdict"></div>
        </div>
    `;

    summaryBox.appendChild(container);

    document
        .getElementById("runInspectionBtn")
        .addEventListener("click", runSupervisoryInspection);

    document
        .getElementById("certifyInstitutionBtn")
        .addEventListener("click", certifyInstitution);

    restorePhase17State();
    scrollToPhase17();
}

/* ======================================================
   SUPERVISORY ENGINE
====================================================== */

function runSupervisoryInspection() {

    // Simulated cross-phase institutional signals
    const capitalScore = randomScore(70, 98);
    const riskScore = randomScore(60, 95);
    const techScore = randomScore(65, 97);
    const complianceScore = randomScore(55, 96);

    updateSignal("capitalSignal", capitalScore);
    updateSignal("riskSignal", riskScore);
    updateSignal("techSignal", techScore);
    updateSignal("complianceSignal", complianceScore);

    const overall =
        (capitalScore * 0.3) +
        (riskScore * 0.25) +
        (techScore * 0.2) +
        (complianceScore * 0.25);

    const rating = determineRating(overall);
    const enforcement = determineEnforcementRisk(overall);

    document.getElementById("supervisoryRating").textContent = rating;
    document.getElementById("enforcementRisk").textContent = enforcement;

    const verdict = document.getElementById("inspectionVerdict");

    verdict.textContent =
        `Supervisory AI Assessment Completed. Composite Prudential Score: ${overall.toFixed(1)}%`;

    verdict.className = "inspection-verdict status-blue";

    phase17State.lastScore = overall;
    phase17State.lastRating = rating;
    phase17State.lastEnforcement = enforcement;

    safeLog("Phase 17: Supervisory inspection executed.");
}

/* ======================================================
   RATING LOGIC
====================================================== */

function determineRating(score) {

    if (score >= 90) return "AAA — Tier 1 Global Institution";
    if (score >= 80) return "AA — Strong Prudential Position";
    if (score >= 70) return "A — Stable with Minor Observations";
    if (score >= 60) return "BBB — Moderate Supervisory Concern";
    return "B — Heightened Supervisory Monitoring";
}

function determineEnforcementRisk(score) {

    if (score >= 85) return "LOW";
    if (score >= 70) return "MODERATE";
    if (score >= 60) return "ELEVATED";
    return "HIGH";
}

function updateSignal(elementId, value) {

    const el = document.getElementById(elementId);
    el.textContent = value + "%";

    if (value >= 85) el.className = "signal-green";
    else if (value >= 70) el.className = "signal-yellow";
    else el.className = "signal-red";
}

function randomScore(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* ======================================================
   CERTIFICATION
====================================================== */

function certifyInstitution() {

    if (!phase17State.lastScore) {
        alert("Run Supervisory Inspection First.");
        return;
    }

    phase17State.inspectionComplete = true;
    savePhase17State();

    const verdict = document.getElementById("inspectionVerdict");

    verdict.textContent =
        `Regulatory Classification Issued: ${phase17State.lastRating}.
         Enforcement Risk: ${phase17State.lastEnforcement}.
         Institution Registered in Supervisory Ledger.`;

    verdict.className = "inspection-verdict status-green";

    safeLog("Phase 17: Regulatory classification issued.");
}

/* ======================================================
   STATE MANAGEMENT
====================================================== */

function savePhase17State() {
    localStorage.setItem(
        phase17State.storageKey,
        JSON.stringify(phase17State)
    );
}

function restorePhase17State() {
    const saved = localStorage.getItem(phase17State.storageKey);
    if (!saved) return;
    try {
        Object.assign(phase17State, JSON.parse(saved));
    } catch {}
}

function scrollToPhase17() {
    const section = document.getElementById("phase17Section");
    if (section)
        section.scrollIntoView({ behavior: "smooth" });
}

function safeLog(message) {
    if (typeof logActivity === "function")
        logActivity(message);
    else
        console.log("[Phase17]", message);
}

/* ======================================================
   GLOBAL LISTENER
====================================================== */

document.addEventListener("click", e => {
    if (!e.target || e.target.tagName !== "LI") return;
    if ((e.target.textContent || "").startsWith("Phase 17"))
        renderPhase17Details();
});