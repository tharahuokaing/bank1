/**
 * Phase 11: Real-Time RegTech Monitoring & Reporting Engine
 */

const phase11Data = {
    id: "phase11",
    title: "Phase 11: RegTech & Real-Time Reporting",
    storageKey: "phase11_state",
    thresholds: {
        LCR: 100,
        CAR: 12
    },
    lastTransmission: null,
    isTransmitting: false
};

/* =====================================================
   RENDER
===================================================== */

function renderPhase11Details() {

    const summaryBox = document.getElementById("summaryBox");
    if (!summaryBox) return;

    if (document.getElementById("phase11Section")) {
        scrollToPhase11();
        return;
    }

    const container = document.createElement("section");
    container.id = "phase11Section";
    container.className = "phase-detail-box phase11-theme";

    container.innerHTML = `
        <header class="phase-header">
            <h2>${phase11Data.title}</h2>
            <p>Automated regulatory telemetry and compliance scoring.</p>
        </header>

        <div class="reg-metrics">
            <div class="metric-card">
                <small>Liquidity Coverage Ratio (LCR)</small>
                <div id="lcrVal" class="metric-value"></div>
            </div>
            <div class="metric-card">
                <small>Capital Adequacy Ratio (CAR)</small>
                <div id="carVal" class="metric-value"></div>
            </div>
        </div>

        <div id="complianceScore" class="compliance-score"></div>

        <div class="reg-progress">
            <div id="regBar" class="reg-bar"></div>
        </div>

        <div id="regStatus" class="reg-status">
            > Awaiting transmission...
        </div>

        <button id="transmitReportBtn">Transmit Regulatory Report</button>

        <div id="regHistory" class="reg-history"></div>
    `;

    summaryBox.appendChild(container);

    document
        .getElementById("transmitReportBtn")
        .addEventListener("click", transmitData);

    generateMetrics();
    restorePhase11State();
    scrollToPhase11();
}

/* =====================================================
   METRIC ENGINE
===================================================== */

function generateMetrics() {

    const lcr = Math.floor(Math.random() * 60) + 100;  // 100–160
    const car = (Math.random() * 8 + 12).toFixed(2);   // 12–20%

    updateMetric("lcrVal", lcr, phase11Data.thresholds.LCR);
    updateMetric("carVal", car, phase11Data.thresholds.CAR);

    calculateComplianceScore(lcr, car);
}

function updateMetric(id, value, threshold) {

    const el = document.getElementById(id);
    if (!el) return;

    el.textContent = value + "%";

    if (value >= threshold)
        el.className = "metric-value status-green";
    else
        el.className = "metric-value status-red";
}

function calculateComplianceScore(lcr, car) {

    const score = ((lcr / 150) + (car / 20)) / 2 * 100;
    const el = document.getElementById("complianceScore");

    if (!el) return;

    el.textContent = "Compliance Health Score: " + score.toFixed(1) + "%";

    el.className =
        score > 85 ? "compliance-score status-green" :
        score > 70 ? "compliance-score status-yellow" :
                     "compliance-score status-red";
}

/* =====================================================
   TRANSMISSION ENGINE
===================================================== */

function transmitData() {

    if (phase11Data.isTransmitting) return;
    phase11Data.isTransmitting = true;

    const btn = document.getElementById("transmitReportBtn");
    const status = document.getElementById("regStatus");

    btn.disabled = true;
    btn.textContent = "Transmitting...";

    let progress = 0;

    const interval = setInterval(() => {

        progress += 25;
        updateProgress(progress);

        if (progress === 25)
            appendStatus("> Encrypting ledger...");
        if (progress === 50)
            appendStatus("> Validating AML signatures...");
        if (progress === 75)
            appendStatus("> Sending to Central Bank API...");
        if (progress >= 100) {
            clearInterval(interval);
            finalizeTransmission();
        }

    }, 800);
}

function finalizeTransmission() {

    const success = Math.random() > 0.1;
    const transmissionId =
        Math.random().toString(36).substr(2, 9).toUpperCase();

    if (success) {
        appendStatus("> [ACK RECEIVED] ID: " + transmissionId);
        safeLog("Phase 11: Regulatory report transmitted.");
        addHistory(transmissionId, "SUCCESS");
    } else {
        appendStatus("> [NACK RECEIVED] Transmission failed.");
        safeLog("Phase 11: Transmission failure detected.");
        addHistory(transmissionId, "FAILED");
    }

    phase11Data.lastTransmission = transmissionId;
    phase11Data.isTransmitting = false;

    document.getElementById("transmitReportBtn").textContent =
        "Report Synced";

    savePhase11State();
}

/* =====================================================
   HELPERS
===================================================== */

function updateProgress(percent) {
    const bar = document.getElementById("regBar");
    if (bar) bar.style.width = percent + "%";
}

function appendStatus(message) {
    const status = document.getElementById("regStatus");
    if (!status) return;
    status.innerHTML += "<br>" + message;
}

function addHistory(id, state) {
    const history = document.getElementById("regHistory");
    if (!history) return;

    history.innerHTML += `
        <div class="history-entry ${state === "SUCCESS" ? "status-green" : "status-red"}">
            ${new Date().toLocaleTimeString()} — ${id} — ${state}
        </div>
    `;
}

function savePhase11State() {
    localStorage.setItem(
        phase11Data.storageKey,
        JSON.stringify(phase11Data)
    );
}

function restorePhase11State() {
    const saved = localStorage.getItem(phase11Data.storageKey);
    if (!saved) return;
    try {
        Object.assign(phase11Data, JSON.parse(saved));
    } catch {}
}

function scrollToPhase11() {
    const section = document.getElementById("phase11Section");
    if (section)
        section.scrollIntoView({ behavior: "smooth", block: "start" });
}

function safeLog(message) {
    if (typeof logActivity === "function") {
        logActivity(message);
    } else {
        console.log("[Phase11]", message);
    }
}

/* =====================================================
   GLOBAL LISTENER
===================================================== */

document.addEventListener("click", e => {
    if (!e.target || e.target.tagName !== "LI") return;
    if ((e.target.textContent || "").startsWith("Phase 11")) {
        renderPhase11Details();
    }
});