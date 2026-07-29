/**
 * Phase 15: ESG Intelligence & Sustainable Finance Engine
 * Environment | Social | Governance | Climate Risk
 */

const phase15State = {
    storageKey: "phase15_state",
    weights: {
        environment: 0.4,
        social: 0.35,
        governance: 0.25
    }
};

/* ============================================
   RENDER
============================================ */

function renderPhase15Details() {

    const summaryBox = document.getElementById("summaryBox");
    if (!summaryBox) return;

    if (document.getElementById("phase15Section")) {
        scrollToPhase15();
        return;
    }

    const container = document.createElement("section");
    container.id = "phase15Section";
    container.className = "phase-detail-box phase15-theme";

    container.innerHTML = `
        <header class="phase-header">
            <h2>Phase 15: ESG & Sustainable Finance Dashboard</h2>
            <p>Climate resilience, social inclusion & governance excellence.</p>
        </header>

        <div class="esg-grid">
            <div>
                <label>Green Energy Usage (%)</label>
                <input type="range" id="greenEnergy" min="0" max="100" value="45">
            </div>

            <div>
                <label>Green Asset Ratio (%)</label>
                <input type="range" id="greenAssets" min="0" max="100" value="30">
            </div>

            <div>
                <label>Financial Inclusion (%)</label>
                <input type="range" id="socialInclusion" min="0" max="100" value="60">
            </div>

            <div>
                <label>Board Governance Strength (%)</label>
                <input type="range" id="governanceScore" min="0" max="100" value="55">
            </div>
        </div>

        <div class="esg-carbon-box">
            <label>Operational Carbon Intensity (tons CO₂ / $M revenue)</label>
            <input type="number" id="carbonIntensity" value="35">
        </div>

        <div id="esgOutput" class="esg-output">
            <div class="esg-rating-display">
                <div class="esg-label">Overall ESG Rating</div>
                <div id="esgRating" class="esg-rating">B</div>
            </div>

            <div id="esgScoreLine"></div>
            <div id="esgMaturity"></div>
            <div id="esgCommentary" class="esg-commentary"></div>
        </div>
    `;

    summaryBox.appendChild(container);

    const inputs = [
        "greenEnergy",
        "greenAssets",
        "socialInclusion",
        "governanceScore",
        "carbonIntensity"
    ];

    inputs.forEach(id => {
        document.getElementById(id).addEventListener("input", calculateESG);
    });

    restorePhase15State();
    calculateESG();
    scrollToPhase15();
}

/* ============================================
   ESG CALCULATION ENGINE
============================================ */

function calculateESG() {

    const energy = parseInt(document.getElementById("greenEnergy").value);
    const greenAssets = parseInt(document.getElementById("greenAssets").value);
    const social = parseInt(document.getElementById("socialInclusion").value);
    const governance = parseInt(document.getElementById("governanceScore").value);
    const carbon = parseFloat(document.getElementById("carbonIntensity").value);

    const environmentalScore = (energy + greenAssets) / 2;

    const weightedScore =
        environmentalScore * phase15State.weights.environment +
        social * phase15State.weights.social +
        governance * phase15State.weights.governance;

    const carbonPenalty = carbon > 50 ? 10 : carbon > 30 ? 5 : 0;

    const finalScore = Math.max(weightedScore - carbonPenalty, 0);

    displayESGResults(finalScore, carbon);
    savePhase15State();
}

/* ============================================
   DISPLAY RESULTS
============================================ */

function displayESGResults(score, carbon) {

    const ratingElem = document.getElementById("esgRating");
    const scoreLine = document.getElementById("esgScoreLine");
    const maturity = document.getElementById("esgMaturity");
    const commentary = document.getElementById("esgCommentary");

    let rating = "C";
    let maturityLevel = "Developing";

    if (score > 90) {
        rating = "AAA";
        maturityLevel = "Sustainability Leader";
    } else if (score > 75) {
        rating = "AA";
        maturityLevel = "Advanced ESG Integration";
    } else if (score > 60) {
        rating = "A";
        maturityLevel = "Responsible Performer";
    } else if (score > 45) {
        rating = "B";
        maturityLevel = "Progressing";
    }

    ratingElem.textContent = rating;
    scoreLine.textContent = `ESG Score: ${score.toFixed(1)}%`;
    maturity.textContent = `Maturity Level: ${maturityLevel}`;

    if (carbon > 50) {
        commentary.textContent =
            "⚠ High carbon intensity detected. Climate transition risk elevated.";
        commentary.className = "esg-commentary status-red";
    } else if (rating === "AAA") {
        commentary.textContent =
            "Eligible for Green Bond & Sustainable Finance Labeling.";
        commentary.className = "esg-commentary status-green";
        safeLog("Phase 15: ESG AAA achieved. Eligible for Green Bond issuance.");
    } else {
        commentary.textContent =
            "Maintain improvement trajectory to enhance ESG leadership.";
        commentary.className = "esg-commentary";
    }
}

/* ============================================
   STATE & UTILITIES
============================================ */

function savePhase15State() {
    localStorage.setItem(
        phase15State.storageKey,
        JSON.stringify(phase15State)
    );
}

function restorePhase15State() {
    const saved = localStorage.getItem(phase15State.storageKey);
    if (!saved) return;
    try {
        Object.assign(phase15State, JSON.parse(saved));
    } catch {}
}

function scrollToPhase15() {
    const section = document.getElementById("phase15Section");
    if (section)
        section.scrollIntoView({ behavior: "smooth" });
}

function safeLog(message) {
    if (typeof logActivity === "function")
        logActivity(message);
    else
        console.log("[Phase15]", message);
}

/* ============================================
   GLOBAL LISTENER
============================================ */

document.addEventListener("click", e => {
    if (!e.target || e.target.tagName !== "LI") return;
    if ((e.target.textContent || "").startsWith("Phase 15"))
        renderPhase15Details();
});