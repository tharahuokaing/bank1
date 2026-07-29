/**
 * Phase 4: Operations & Risk Setup
 * Risk Assessment Matrix & Operational Protocol Engine
 */

const phase4Data = {
    id: "phase4",
    title: "Phase 4: Operations & Risk Setup",
    storageKey: "phase4_risk_state",
    scenarios: [
        { id: 1, name: "Liquidity Shortfall", category: "Financial" },
        { id: 2, name: "Cyber Security Breach", category: "Technical" },
        { id: 3, name: "AML Compliance Failure", category: "Legal" },
        { id: 4, name: "Internal Fraud", category: "Operational" }
    ]
};

/* =====================================================
   RENDER
===================================================== */

function renderPhase4Details() {

    const summaryBox = document.getElementById("summaryBox");
    if (!summaryBox) return;

    if (document.getElementById("phase4Section")) {
        scrollToPhase4();
        return;
    }

    const container = document.createElement("section");
    container.id = "phase4Section";
    container.className = "phase-detail-box phase4-theme";

    container.innerHTML = `
        <header class="phase-header">
            <h2>${phase4Data.title}</h2>
        </header>

        <p>Analyze and mitigate potential threats to banking operations.</p>

        <div class="risk-layout">

            <div class="risk-table">
                <h3>Risk Registry</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Scenario</th>
                            <th>Impact (1–5)</th>
                        </tr>
                    </thead>
                    <tbody id="riskRegistryBody"></tbody>
                </table>
            </div>

            <div class="risk-heatmap">
                <h3>Risk Heat Map</h3>
                <div class="heat-grid">
                    <div class="heat-low">LOW</div>
                    <div class="heat-med">MED</div>
                    <div class="heat-high">HIGH</div>
                </div>
                <p id="riskSummary" class="risk-summary"></p>
            </div>

        </div>
    `;

    summaryBox.appendChild(container);

    buildRiskTable();
    restoreRiskState();
    calculateTotalRisk();
    scrollToPhase4();

    safeLog("Phase 4 rendered.");
}

/* =====================================================
   BUILD TABLE
===================================================== */

function buildRiskTable() {

    const tbody = document.getElementById("riskRegistryBody");
    if (!tbody) return;

    phase4Data.scenarios.forEach(risk => {

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${risk.name}</td>
            <td>
                <input type="number"
                       min="1"
                       max="5"
                       value="1"
                       class="risk-input"
                       data-id="${risk.id}">
            </td>
        `;

        tbody.appendChild(tr);
    });

    document.querySelectorAll(".risk-input").forEach(input => {
        input.addEventListener("input", handleRiskInput);
    });
}

/* =====================================================
   LOGIC
===================================================== */

function handleRiskInput(e) {

    const value = parseInt(e.target.value);

    if (isNaN(value) || value < 1) e.target.value = 1;
    if (value > 5) e.target.value = 5;

    calculateTotalRisk();
    saveRiskState();
}

function calculateTotalRisk() {

    const inputs = document.querySelectorAll(".risk-input");
    if (!inputs.length) return;

    let total = 0;

    inputs.forEach(i => {
        const val = parseInt(i.value);
        total += isNaN(val) ? 0 : val;
    });

    const average = total / inputs.length;

    const summary = document.getElementById("riskSummary");
    if (!summary) return;

    if (average <= 2) {
        summary.textContent = "Current Risk Level: SECURE";
        summary.style.color = "#00ff88";
    } 
    else if (average <= 3.5) {
        summary.textContent = "Current Risk Level: MONITORING REQUIRED";
        summary.style.color = "#ffcc00";
    } 
    else {
        summary.textContent = "Current Risk Level: CRITICAL ACTION REQUIRED";
        summary.style.color = "#ff4444";
        safeLog("Phase 4: Critical risk threshold reached.");
    }
}

/* =====================================================
   STORAGE
===================================================== */

function saveRiskState() {

    const inputs = document.querySelectorAll(".risk-input");
    const state = Array.from(inputs).map(i => i.value);

    localStorage.setItem(phase4Data.storageKey, JSON.stringify(state));
}

function restoreRiskState() {

    const saved = localStorage.getItem(phase4Data.storageKey);
    if (!saved) return;

    try {
        const state = JSON.parse(saved);
        const inputs = document.querySelectorAll(".risk-input");

        inputs.forEach((input, i) => {
            if (state[i]) input.value = state[i];
        });

    } catch (err) {
        console.warn("Phase4 restore error:", err);
    }
}

/* =====================================================
   HELPERS
===================================================== */

function scrollToPhase4() {
    const section = document.getElementById("phase4Section");
    if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

function safeLog(message) {
    if (typeof logActivity === "function") {
        logActivity(message);
    } else {
        console.log("[Phase4]", message);
    }
}

/* =====================================================
   GLOBAL LISTENER
===================================================== */

document.addEventListener("click", (e) => {

    if (!e.target || e.target.tagName !== "LI") return;

    const text = e.target.textContent || "";

    if (text.startsWith("Phase 4")) {
        renderPhase4Details();
    }
});