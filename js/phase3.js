/**
 * Phase 3: Infrastructure & Technology Build
 * Simulates Digital Core & Server Cluster Deployment
 */

const phase3Data = {
    id: "phase3",
    title: "Phase 3: Infrastructure & Technology Build",
    steps: [
        "Provisioning Tier-3 Data Center Clusters...",
        "Initializing Encrypted Database (AES-256)...",
        "Configuring Private Banking Network (VPN/MPLS)...",
        "Deploying Core Banking Microservices...",
        "Establishing Global SWIFT Gateway Node..."
    ],
    buildInterval: null,
    isBuilding: false
};

/* =====================================================
   RENDER
===================================================== */

function renderPhase3Details() {

    const summaryBox = document.getElementById("summaryBox");
    if (!summaryBox) return;

    if (document.getElementById("phase3Section")) {
        scrollToPhase3();
        return;
    }

    const container = document.createElement("section");
    container.id = "phase3Section";
    container.className = "phase-detail-box phase3-theme";

    container.innerHTML = `
        <header class="phase-header">
            <h2>${phase3Data.title}</h2>
        </header>

        <div id="infraConsole" class="infra-console">
            <div>> System Idle... Ready for initialization.</div>
        </div>

        <div class="infra-controls">
            <button id="startBuildBtn">Initialize Infrastructure Build</button>
            <div class="build-progress">
                <div id="buildProgressBar" class="build-bar"></div>
            </div>
        </div>
    `;

    summaryBox.appendChild(container);

    const btn = document.getElementById("startBuildBtn");
    if (btn) {
        btn.addEventListener("click", startInfraBuild);
    }

    scrollToPhase3();
    safeLog("Phase 3 rendered.");
}

/* =====================================================
   BUILD ENGINE
===================================================== */

function startInfraBuild() {

    if (phase3Data.isBuilding) return;

    const consoleBox = document.getElementById("infraConsole");
    const btn = document.getElementById("startBuildBtn");
    const progressBar = document.getElementById("buildProgressBar");

    if (!consoleBox || !btn || !progressBar) return;

    phase3Data.isBuilding = true;
    btn.disabled = true;
    btn.textContent = "Building...";

    let stepIndex = 0;

    phase3Data.buildInterval = setInterval(() => {

        if (stepIndex < phase3Data.steps.length) {

            const line = document.createElement("div");
            line.textContent = `> ${phase3Data.steps[stepIndex]}`;
            consoleBox.appendChild(line);

            autoScroll(consoleBox);

            const percent = Math.round(((stepIndex + 1) / phase3Data.steps.length) * 100);
            progressBar.style.width = percent + "%";

            stepIndex++;

        } else {

            clearInterval(phase3Data.buildInterval);
            phase3Data.isBuilding = false;

            const success = document.createElement("div");
            success.className = "infra-success";
            success.textContent = "[SUCCESS] Digital Core Infrastructure is ONLINE.";
            consoleBox.appendChild(success);

            autoScroll(consoleBox);

            btn.textContent = "Infrastructure Ready";

            safeLog("Phase 3: Digital Core Infrastructure successfully provisioned.");
        }

    }, 1500);
}

/* =====================================================
   HELPERS
===================================================== */

function autoScroll(element) {
    element.scrollTop = element.scrollHeight;
}

function scrollToPhase3() {
    const section = document.getElementById("phase3Section");
    if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

function safeLog(message) {
    if (typeof logActivity === "function") {
        logActivity(message);
    } else {
        console.log("[Phase3]", message);
    }
}

/* =====================================================
   GLOBAL LISTENER
===================================================== */

document.addEventListener("click", (e) => {

    if (!e.target || e.target.tagName !== "LI") return;

    const text = e.target.textContent || "";

    if (text.startsWith("Phase 3")) {
        renderPhase3Details();
    }
});