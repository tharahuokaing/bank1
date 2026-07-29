/**
 * Phase 16: Governance & Control Architecture Engine
 * Board Oversight | Committee Structure | Independence Validation
 */

const phase16State = {
    storageKey: "phase16_state",
    locked: false
};

const governanceStructure = {
    name: "Board of Directors",
    role: "Governing Body",
    independent: true,
    children: [
        {
            name: "Audit Committee",
            role: "Financial Oversight",
            independent: true
        },
        {
            name: "Risk Committee",
            role: "Enterprise Risk Supervision",
            independent: true
        },
        {
            name: "ESG Committee",
            role: "Sustainability Governance",
            independent: true
        },
        {
            name: "CEO",
            role: "Executive Management",
            independent: false,
            children: [
                { name: "CFO", role: "Finance", independent: false },
                { name: "COO", role: "Operations", independent: false },
                { name: "CTO", role: "Technology", independent: false },
                { name: "Chief Risk Officer", role: "Independent Risk Control", independent: true }
            ]
        }
    ]
};

/* ============================================
   RENDER
============================================ */

function renderPhase16Details() {

    const summaryBox = document.getElementById("summaryBox");
    if (!summaryBox) return;

    if (document.getElementById("phase16Section")) {
        scrollToPhase16();
        return;
    }

    const container = document.createElement("section");
    container.id = "phase16Section";
    container.className = "phase-detail-box phase16-theme";

    container.innerHTML = `
        <header class="phase-header">
            <h2>Phase 16: Governance & Oversight Architecture</h2>
            <p>Board independence, committee supervision & structural integrity.</p>
        </header>

        <div id="orgChartCanvas" class="org-chart">
            ${generateOrgNode(governanceStructure)}
        </div>

        <div class="governance-metrics">
            <div>Board Independence Ratio: <span id="independenceRatio"></span></div>
            <div>Four-Eyes Principle: <span id="fourEyesStatus"></span></div>
            <div>Governance Strength Score: <span id="governanceScore"></span></div>
        </div>

        <div class="governance-controls">
            <button id="validateGovernanceBtn">Validate Governance Structure</button>
            <button id="lockStructureBtn">Lock Final Structure</button>
        </div>

        <div id="governanceVerdict" class="governance-verdict"></div>
    `;

    summaryBox.appendChild(container);

    document
        .getElementById("validateGovernanceBtn")
        .addEventListener("click", validateGovernance);

    document
        .getElementById("lockStructureBtn")
        .addEventListener("click", lockStructure);

    restorePhase16State();
    scrollToPhase16();
}

/* ============================================
   ORG GENERATION
============================================ */

function generateOrgNode(node) {

    let childrenHTML = "";

    if (node.children) {
        childrenHTML = `
            <div class="org-children">
                ${node.children.map(child => generateOrgNode(child)).join("")}
            </div>
        `;
    }

    return `
        <div class="org-node ${node.independent ? "independent" : "executive"}">
            <div class="org-title">${node.name}</div>
            <div class="org-role">${node.role}</div>
            ${childrenHTML}
        </div>
    `;
}

/* ============================================
   GOVERNANCE VALIDATION
============================================ */

function validateGovernance() {

    const counts = countGovernance(governanceStructure);

    const independenceRatio = (
        counts.independent / counts.total * 100
    ).toFixed(1);

    const fourEyes = counts.hasRiskControl ? "VALID" : "BREACH";

    const governanceScore =
        (independenceRatio / 100 * 50) +
        (counts.committees >= 3 ? 30 : 10) +
        (counts.hasRiskControl ? 20 : 0);

    document.getElementById("independenceRatio").textContent =
        independenceRatio + "%";

    document.getElementById("fourEyesStatus").textContent =
        fourEyes;

    document.getElementById("governanceScore").textContent =
        governanceScore.toFixed(1) + "%";

    const verdict = document.getElementById("governanceVerdict");

    if (governanceScore > 80) {
        verdict.textContent = "Governance Structure: STRONG & REGULATOR READY";
        verdict.className = "governance-verdict status-green";
    } else if (governanceScore > 60) {
        verdict.textContent = "Governance Structure: ADEQUATE — Improvements Recommended";
        verdict.className = "governance-verdict status-yellow";
    } else {
        verdict.textContent = "Governance Structure: HIGH RISK — Immediate Reform Required";
        verdict.className = "governance-verdict status-red";
    }

    safeLog("Phase 16: Governance structure validated.");
}

/* ============================================
   COUNT HELPERS
============================================ */

function countGovernance(node) {

    let total = 1;
    let independent = node.independent ? 1 : 0;
    let committees = node.name.includes("Committee") ? 1 : 0;
    let hasRiskControl = node.name === "Chief Risk Officer";

    if (node.children) {
        node.children.forEach(child => {
            const result = countGovernance(child);
            total += result.total;
            independent += result.independent;
            committees += result.committees;
            if (result.hasRiskControl) hasRiskControl = true;
        });
    }

    return { total, independent, committees, hasRiskControl };
}

/* ============================================
   LOCK STRUCTURE
============================================ */

function lockStructure() {

    if (phase16State.locked) return;

    phase16State.locked = true;
    savePhase16State();

    document.getElementById("governanceVerdict").textContent =
        "Institutional Governance Structure Locked & Certified.";

    safeLog("Phase 16: Governance structure locked.");
}

/* ============================================
   STATE MANAGEMENT
============================================ */

function savePhase16State() {
    localStorage.setItem(
        phase16State.storageKey,
        JSON.stringify(phase16State)
    );
}

function restorePhase16State() {
    const saved = localStorage.getItem(phase16State.storageKey);
    if (!saved) return;
    try {
        Object.assign(phase16State, JSON.parse(saved));
    } catch {}
}

function scrollToPhase16() {
    const section = document.getElementById("phase16Section");
    if (section)
        section.scrollIntoView({ behavior: "smooth" });
}

function safeLog(message) {
    if (typeof logActivity === "function")
        logActivity(message);
    else
        console.log("[Phase16]", message);
}

/* ============================================
   GLOBAL LISTENER
============================================ */

document.addEventListener("click", e => {
    if (!e.target || e.target.tagName !== "LI") return;
    if ((e.target.textContent || "").startsWith("Phase 16"))
        renderPhase16Details();
});