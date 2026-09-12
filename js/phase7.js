/**
 * Phase 7: Web Server & Digital Core Deployment
 * High-availability architecture provisioning engine
 */

const phase7Data = {
    id: "phase7",
    title: "Phase 7: Web Server & Digital Core",
    storageKey: "phase7_state",
    isDeploying: false,
    modules: [
        { name: "SSL/TLS 1.3 Encryption", progress: 0 },
        { name: "Load Balancer Cluster", progress: 0 },
        { name: "Web Application Firewall", progress: 0 },
        { name: "REST API Gateway", progress: 0 },
        { name: "Intrusion Detection System", progress: 0 }
    ]
};

/* =====================================================
   RENDER
===================================================== */

function renderPhase7Details() {

    const summaryBox = document.getElementById("summaryBox");
    if (!summaryBox) return;

    if (document.getElementById("phase7Section")) {
        scrollToPhase7();
        return;
    }

    const container = document.createElement("section");
    container.id = "phase7Section";
    container.className = "phase-detail-box phase7-theme";

    container.innerHTML = `
        <header class="phase-header">
            <h2>${phase7Data.title}</h2>
            <p>Deploying secure, high-availability web infrastructure.</p>
        </header>

        <div class="server-progress">
            <div id="serverBar" class="server-bar"></div>
        </div>

        <div id="serverModuleList" class="server-modules"></div>

        <button id="deployServerBtn">Deploy Architecture</button>

        <div id="serverStatus" class="server-status">
            Status: Standby
        </div>
    `;

    summaryBox.appendChild(container);

    document
        .getElementById("deployServerBtn")
        .addEventListener("click", deployWebServer);

    restorePhase7State();
    scrollToPhase7();
}

/* =====================================================
   DEPLOYMENT ENGINE
===================================================== */

function deployWebServer() {

    if (phase7Data.isDeploying) return;

    phase7Data.isDeploying = true;

    const btn = document.getElementById("deployServerBtn");
    const status = document.getElementById("serverStatus");

    if (!btn || !status) return;

    btn.disabled = true;
    btn.textContent = "Deploying...";
    status.textContent = "Status: Provisioning Modules...";

    let completed = 0;

    phase7Data.modules.forEach((mod, index) => {

        setTimeout(() => {

            simulateModuleLifecycle(mod, index, () => {

                completed++;

                const percent = (completed / phase7Data.modules.length) * 100;
                updateServerProgress(percent);

                if (completed === phase7Data.modules.length) {
                    finalizeDeployment();
                }

            });

        }, index * 800);

    });
}

/* =====================================================
   MODULE LIFECYCLE
===================================================== */

function simulateModuleLifecycle(module, index, callback) {

    const container = document.getElementById("serverModuleList");
    if (!container) return;

    const modDiv = document.createElement("div");
    modDiv.className = "server-module";
    modDiv.innerHTML = `
        <span>${module.name}</span>
        <span class="module-status status-yellow">Initializing...</span>
    `;
    container.appendChild(modDiv);

    const statusEl = modDiv.querySelector(".module-status");

    setTimeout(() => {
        statusEl.textContent = "Configuring...";
    }, 300);

    setTimeout(() => {
        statusEl.textContent = "Verifying...";
    }, 700);

    setTimeout(() => {
        statusEl.textContent = "ONLINE ✓";
        statusEl.className = "module-status status-green";
        callback();
    }, 1100);
}

/* =====================================================
   FINALIZE
===================================================== */

function finalizeDeployment() {

    const status = document.getElementById("serverStatus");
    const btn = document.getElementById("deployServerBtn");

    if (status) {
        status.textContent = "Status: CORE INFRASTRUCTURE OPERATIONAL";
        status.className = "server-status status-green";
    }

    if (btn) btn.textContent = "Architecture Live";

    localStorage.setItem(
        phase7Data.storageKey,
        JSON.stringify({ completed: true })
    );

    safeLog("Phase 7: Digital Core infrastructure fully deployed.");
}

/* =====================================================
   HELPERS
===================================================== */

function updateServerProgress(percent) {
    const bar = document.getElementById("serverBar");
    if (bar) bar.style.width = percent + "%";
}

function restorePhase7State() {

    const saved = localStorage.getItem(phase7Data.storageKey);
    if (!saved) return;

    try {
        const state = JSON.parse(saved);

        if (state.completed) {
            updateServerProgress(100);
            finalizeDeployment();
        }

    } catch (err) {
        console.warn("Phase7 restore error:", err);
    }
}

function scrollToPhase7() {
    const section = document.getElementById("phase7Section");
    if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

function safeLog(message) {
    if (typeof logActivity === "function") {
        logActivity(message);
    } else {
        console.log("[Phase7]", message);
    }
}

/* =====================================================
   GLOBAL LISTENER
===================================================== */

document.addEventListener("click", (e) => {

    if (!e.target || e.target.tagName !== "LI") return;

    const text = e.target.textContent || "";

    if (text.startsWith("Phase 7")) {
        renderPhase7Details();
    }
});