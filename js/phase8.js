/**
 * Phase 8: Blue-Green Deployment Strategy
 * Progressive traffic migration & rollback engine
 */

const phase8Data = {
    id: "phase8",
    title: "Phase 8: Blue-Green Deployment",
    storageKey: "phase8_state",
    isDeploying: false,
    trafficPercentage: 0,
    activeEnv: "blue"
};

/* =====================================================
   RENDER
===================================================== */

function renderPhase8Details() {

    const summaryBox = document.getElementById("summaryBox");
    if (!summaryBox) return;

    if (document.getElementById("phase8Section")) {
        scrollToPhase8();
        return;
    }

    const container = document.createElement("section");
    container.id = "phase8Section";
    container.className = "phase-detail-box phase8-theme";

    container.innerHTML = `
        <header class="phase-header">
            <h2>${phase8Data.title}</h2>
            <p>Managing zero-downtime production releases.</p>
        </header>

        <div class="env-wrapper">
            <div id="envBlue" class="env-card active">
                <strong>BLUE</strong>
                <small>v1.0 (Live)</small>
            </div>

            <div class="env-switch">⇄</div>

            <div id="envGreen" class="env-card">
                <strong>GREEN</strong>
                <small>v1.1 (Candidate)</small>
            </div>
        </div>

        <div class="traffic-progress">
            <div id="trafficBar" class="traffic-bar"></div>
        </div>

        <div id="trafficLabel" class="traffic-label">
            Traffic to Green: 0%
        </div>

        <div id="deploymentLog" class="deployment-log">
            > System ready for controlled rollout...
        </div>

        <button id="switchTrafficBtn">Start Controlled Rollout</button>
        <button id="rollbackBtn" class="danger hidden">Rollback</button>

        <div id="deployStatus" class="deploy-status">
            Status: Standby
        </div>
    `;

    summaryBox.appendChild(container);

    document
        .getElementById("switchTrafficBtn")
        .addEventListener("click", startDeployment);

    document
        .getElementById("rollbackBtn")
        .addEventListener("click", rollbackDeployment);

    restorePhase8State();
    scrollToPhase8();
}

/* =====================================================
   DEPLOYMENT ENGINE
===================================================== */

function startDeployment() {

    if (phase8Data.isDeploying) return;

    phase8Data.isDeploying = true;

    const btn = document.getElementById("switchTrafficBtn");
    const rollbackBtn = document.getElementById("rollbackBtn");
    const status = document.getElementById("deployStatus");

    btn.disabled = true;
    btn.textContent = "Rolling Out...";
    rollbackBtn.classList.remove("hidden");
    status.textContent = "Status: Validating Green Environment...";

    appendLog("Running health checks...");
    appendLog("Validating database sync...");
    appendLog("Monitoring error rates...");

    progressiveTrafficShift();
}

/* =====================================================
   TRAFFIC SHIFT
===================================================== */

function progressiveTrafficShift() {

    const interval = setInterval(() => {

        if (phase8Data.trafficPercentage >= 100) {
            clearInterval(interval);
            finalizeDeployment();
            return;
        }

        phase8Data.trafficPercentage += 25;
        updateTrafficUI();
        appendLog(`Traffic shifted: ${phase8Data.trafficPercentage}% → GREEN`);

        savePhase8State();

    }, 1200);
}

/* =====================================================
   FINALIZE
===================================================== */

function finalizeDeployment() {

    phase8Data.activeEnv = "green";
    phase8Data.isDeploying = false;

    document.getElementById("envBlue").classList.remove("active");
    document.getElementById("envGreen").classList.add("active");

    document.getElementById("deployStatus").textContent =
        "Status: GREEN Environment Live";

    document.getElementById("switchTrafficBtn").textContent =
        "Deployment Complete";

    appendLog("✓ Production traffic fully migrated.");

    safeLog("Phase 8: Blue-Green deployment successfully completed.");
}

/* =====================================================
   ROLLBACK
===================================================== */

function rollbackDeployment() {

    phase8Data.trafficPercentage = 0;
    phase8Data.activeEnv = "blue";
    phase8Data.isDeploying = false;

    document.getElementById("envBlue").classList.add("active");
    document.getElementById("envGreen").classList.remove("active");

    document.getElementById("trafficBar").style.width = "0%";
    document.getElementById("trafficLabel").textContent =
        "Traffic to Green: 0%";

    document.getElementById("deployStatus").textContent =
        "Status: Rolled Back to BLUE";

    document.getElementById("switchTrafficBtn").disabled = false;
    document.getElementById("switchTrafficBtn").textContent =
        "Restart Rollout";

    appendLog("⚠ Emergency rollback executed.");

    savePhase8State();
    safeLog("Phase 8: Emergency rollback triggered.");
}

/* =====================================================
   HELPERS
===================================================== */

function updateTrafficUI() {

    document.getElementById("trafficBar").style.width =
        phase8Data.trafficPercentage + "%";

    document.getElementById("trafficLabel").textContent =
        `Traffic to Green: ${phase8Data.trafficPercentage}%`;
}

function appendLog(message) {
    const log = document.getElementById("deploymentLog");
    if (!log) return;
    log.innerHTML += `<br>> ${message}`;
    log.scrollTop = log.scrollHeight;
}

function savePhase8State() {
    localStorage.setItem(
        phase8Data.storageKey,
        JSON.stringify(phase8Data)
    );
}

function restorePhase8State() {

    const saved = localStorage.getItem(phase8Data.storageKey);
    if (!saved) return;

    try {
        const state = JSON.parse(saved);
        Object.assign(phase8Data, state);
        updateTrafficUI();

        if (phase8Data.activeEnv === "green") {
            finalizeDeployment();
        }

    } catch (err) {
        console.warn("Phase8 restore error:", err);
    }
}

function scrollToPhase8() {
    const section = document.getElementById("phase8Section");
    if (section)
        section.scrollIntoView({ behavior: "smooth", block: "start" });
}

function safeLog(message) {
    if (typeof logActivity === "function") {
        logActivity(message);
    } else {
        console.log("[Phase8]", message);
    }
}

/* =====================================================
   GLOBAL LISTENER
===================================================== */

document.addEventListener("click", (e) => {

    if (!e.target || e.target.tagName !== "LI") return;

    if ((e.target.textContent || "").startsWith("Phase 8")) {
        renderPhase8Details();
    }
});