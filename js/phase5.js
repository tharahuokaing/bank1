/**
 * Phase 5: Launch & Scaling
 * Controlled user growth & real-time transaction simulation
 */

const phase5Data = {
    id: "phase5",
    title: "Phase 5: Launch & Scaling",
    storageKey: "phase5_state",
    isScaling: false,
    intervalRef: null,
    maxCustomers: 500000
};

/* =====================================================
   RENDER
===================================================== */

function renderPhase5Details() {

    const summaryBox = document.getElementById("summaryBox");
    if (!summaryBox) return;

    if (document.getElementById("phase5Section")) {
        scrollToPhase5();
        return;
    }

    const container = document.createElement("section");
    container.id = "phase5Section";
    container.className = "phase-detail-box phase5-theme";

    container.innerHTML = `
        <header class="phase-header">
            <h2>${phase5Data.title}</h2>
        </header>

        <div class="launch-stats">
            <div class="stat-card">
                <span>Active Customers</span>
                <strong id="customerCount">0</strong>
            </div>
            <div class="stat-card">
                <span>Transactions / Sec</span>
                <strong id="tpsCount">0</strong>
            </div>
        </div>

        <div class="launch-progress">
            <div id="launchBar" class="launch-bar"></div>
        </div>

        <button id="launchBtn">Initiate Public Launch</button>
        <div id="launchStatus" class="launch-status">Status: Standby</div>
    `;

    summaryBox.appendChild(container);

    const btn = document.getElementById("launchBtn");
    if (btn) btn.addEventListener("click", startScaling);

    restorePhase5State();
    scrollToPhase5();
    safeLog("Phase 5 rendered.");
}

/* =====================================================
   SCALING ENGINE
===================================================== */

function startScaling() {

    if (phase5Data.isScaling) return;

    const btn = document.getElementById("launchBtn");
    const status = document.getElementById("launchStatus");

    if (!btn || !status) return;

    phase5Data.isScaling = true;
    btn.disabled = true;
    btn.textContent = "Scaling in Progress...";
    status.textContent = "Status: Launch Sequence Initiated";

    safeLog("Phase 5: Public launch initiated.");

    let customers = 1000;
    let progress = 0;

    phase5Data.intervalRef = setInterval(() => {

        if (progress >= 100) {
            completeLaunch(customers);
            return;
        }

        // Controlled exponential growth curve
        const growthRate = 1.08;
        customers = Math.min(
            Math.floor(customers * growthRate),
            phase5Data.maxCustomers
        );

        const tps = calculateTPS(customers);
        progress += 2;

        updateLaunchUI(customers, tps, progress);
        savePhase5State(customers, tps, progress);

    }, 120);
}

/* =====================================================
   HELPERS
===================================================== */

function calculateTPS(customers) {
    return (customers * 0.002).toFixed(2);
}

function updateLaunchUI(customers, tps, progress) {

    const customerDisplay = document.getElementById("customerCount");
    const tpsDisplay = document.getElementById("tpsCount");
    const bar = document.getElementById("launchBar");

    if (customerDisplay)
        customerDisplay.textContent = customers.toLocaleString();

    if (tpsDisplay)
        tpsDisplay.textContent = tps;

    if (bar)
        bar.style.width = progress + "%";
}

function completeLaunch(customers) {

    clearInterval(phase5Data.intervalRef);
    phase5Data.isScaling = false;

    const btn = document.getElementById("launchBtn");
    const status = document.getElementById("launchStatus");

    if (btn) btn.textContent = "Platform Stable";
    if (status) {
        status.textContent = "Status: LIVE – System Stable Under Load";
        status.style.color = "#00ff88";
    }

    safeLog(`Phase 5: Scaling completed at ${customers.toLocaleString()} users.`);
}

function savePhase5State(customers, tps, progress) {

    const state = { customers, tps, progress };
    localStorage.setItem(phase5Data.storageKey, JSON.stringify(state));
}

function restorePhase5State() {

    const saved = localStorage.getItem(phase5Data.storageKey);
    if (!saved) return;

    try {
        const state = JSON.parse(saved);
        updateLaunchUI(state.customers, state.tps, state.progress);

        if (state.progress >= 100) {
            completeLaunch(state.customers);
        }

    } catch (err) {
        console.warn("Phase5 restore error:", err);
    }
}

function scrollToPhase5() {
    const section = document.getElementById("phase5Section");
    if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

function safeLog(message) {
    if (typeof logActivity === "function") {
        logActivity(message);
    } else {
        console.log("[Phase5]", message);
    }
}

/* =====================================================
   GLOBAL LISTENER
===================================================== */

document.addEventListener("click", (e) => {

    if (!e.target || e.target.tagName !== "LI") return;

    const text = e.target.textContent || "";

    if (text.startsWith("Phase 5")) {
        renderPhase5Details();
    }
});