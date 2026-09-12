/**
 * Phase 21: Institutional Charter & Licensing Authority
 * Regulatory Readiness | Charter Issuance | License Governance
 */

const phase21State = {
    storageKey: "phase21_state",
    licensed: false,
    licenseId: null,
    score: 0,
    rating: null
};

function renderPhase21Details() {

    const summaryBox = document.getElementById("summaryBox");
    if (!summaryBox) return;

    if (document.getElementById("phase21Section")) {
        scrollToPhase21();
        return;
    }

    const container = document.createElement("section");
    container.id = "phase21Section";
    container.className = "phase-detail-box phase21-theme";

    container.innerHTML = `
        <header class="phase-header">
            <h2>Phase 21: Central Licensing Authority</h2>
            <p>Final Institutional Charter Review & Regulatory Certification</p>
        </header>

        <div class="audit-grid">
            <div id="check-tech">Digital Infrastructure Integrity</div>
            <div id="check-risk">Enterprise Risk Governance</div>
            <div id="check-supervision">Supervisory Rating</div>
            <div id="check-markets">Public Disclosure Readiness</div>
            <div id="check-cbdc">CBDC Settlement Integration</div>
        </div>

        <div class="license-controls">
            <button id="runAuditBtn">Run Full Regulatory Audit</button>
            <button id="revokeBtn">Revoke License</button>
        </div>

        <div class="license-summary">
            <div>Institutional Readiness Score: <span id="readinessScore">—</span></div>
            <div>Regulatory Classification: <span id="regRating">—</span></div>
        </div>

        <div id="licenseSeal" class="license-seal hidden">
            <h1>BANKING LICENSE</h1>
            <p>Granted by Central Supervisory Authority</p>
            <div><strong>Institution:</strong> Khmer Bank Digital Core</div>
            <div><strong>License ID:</strong> <span id="licenseId"></span></div>
            <div class="license-status">APPROVED</div>
        </div>
    `;

    summaryBox.appendChild(container);

    document.getElementById("runAuditBtn")
        .addEventListener("click", runFullAudit);

    document.getElementById("revokeBtn")
        .addEventListener("click", revokeLicense);

    restorePhase21State();
    updateUI();
    scrollToPhase21();
}

/* =============================================
   AUDIT ENGINE
============================================= */

function runFullAudit() {

    const tech = scoreCheck("check-tech");
    const risk = scoreCheck("check-risk");
    const supervision = scoreCheck("check-supervision");
    const markets = scoreCheck("check-markets");
    const cbdc = scoreCheck("check-cbdc");

    const totalScore = (
        tech * 0.2 +
        risk * 0.2 +
        supervision * 0.25 +
        markets * 0.15 +
        cbdc * 0.2
    );

    phase21State.score = totalScore;
    phase21State.rating = determineClassification(totalScore);

    document.getElementById("readinessScore").textContent =
        totalScore.toFixed(1) + "%";

    document.getElementById("regRating").textContent =
        phase21State.rating;

    if (totalScore >= 75) {
        issueLicense();
    } else {
        denyLicense();
    }

    savePhase21State();
    safeLog("Phase 21: Full regulatory audit executed.");
}

function scoreCheck(elementId) {

    const score = Math.floor(Math.random() * 30) + 70;
    const el = document.getElementById(elementId);

    el.textContent += ` — ${score}%`;
    el.className = score >= 80 ? "status-green" : "status-yellow";

    return score;
}

function determineClassification(score) {

    if (score >= 90) return "Tier 1 Systemic Institution";
    if (score >= 80) return "Tier 2 Commercial Bank";
    if (score >= 70) return "Restricted Banking Entity";
    return "Provisional Approval Pending";
}

/* =============================================
   LICENSE ISSUANCE
============================================= */

function issueLicense() {

    if (!phase21State.licenseId) {
        phase21State.licenseId =
            "NBC-" + Date.now().toString().slice(-8);
    }

    phase21State.licensed = true;

    const seal = document.getElementById("licenseSeal");
    document.getElementById("licenseId").textContent =
        phase21State.licenseId;

    seal.classList.remove("hidden");
}

function denyLicense() {

    const seal = document.getElementById("licenseSeal");
    seal.classList.add("hidden");

    alert("License Denied. Improve regulatory readiness.");
}

/* =============================================
   REVOCATION
============================================= */

function revokeLicense() {

    if (!phase21State.licensed) return;

    phase21State.licensed = false;
    phase21State.licenseId = null;

    document.getElementById("licenseSeal")
        .classList.add("hidden");

    document.getElementById("licenseId").textContent = "";

    safeLog("Phase 21: Banking license revoked.");
}

/* =============================================
   STATE
============================================= */

function savePhase21State() {
    localStorage.setItem(
        phase21State.storageKey,
        JSON.stringify(phase21State)
    );
}

function restorePhase21State() {
    const saved = localStorage.getItem(phase21State.storageKey);
    if (!saved) return;
    try {
        Object.assign(phase21State, JSON.parse(saved));
    } catch {}
}

function updateUI() {
    if (phase21State.licensed) {
        document.getElementById("licenseSeal")
            ?.classList.remove("hidden");
        document.getElementById("licenseId").textContent =
            phase21State.licenseId;
    }
}

function scrollToPhase21() {
    const section = document.getElementById("phase21Section");
    if (section)
        section.scrollIntoView({ behavior: "smooth" });
}

function safeLog(message) {
    if (typeof logActivity === "function")
        logActivity(message);
    else
        console.log("[Phase21]", message);
}

/* =============================================
   GLOBAL LISTENER
============================================= */

document.addEventListener("click", e => {
    if (!e.target || e.target.tagName !== "LI") return;
    if ((e.target.textContent || "").startsWith("Phase 21"))
        renderPhase21Details();
});