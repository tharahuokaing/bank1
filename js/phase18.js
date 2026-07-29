/**
 * Phase 18: Public Markets & Investor Relations Engine
 * Financial Reporting | Valuation | Market Confidence Index
 */

const phase18State = {
    storageKey: "phase18_state",
    compiled: false
};

function renderPhase18Details() {

    const summaryBox = document.getElementById("summaryBox");
    if (!summaryBox) return;

    if (document.getElementById("phase18Section")) {
        scrollToPhase18();
        return;
    }

    const container = document.createElement("section");
    container.id = "phase18Section";
    container.className = "phase-detail-box phase18-theme";

    container.innerHTML = `
        <header class="phase-header">
            <h2>Phase 18: Public Markets & Investor Relations</h2>
            <p>Annual Financial Disclosure, Performance Ratios & Valuation Model</p>
        </header>

        <div class="ir-controls">
            <button id="compileReportBtn">Compile FY2026 Market Report</button>
            <button id="lockDisclosureBtn">Lock Public Disclosure</button>
        </div>

        <div id="reportPanel" class="report-panel hidden">

            <div class="report-grid">
                <div><strong>Revenue</strong><span id="repRevenue"></span></div>
                <div><strong>Net Profit</strong><span id="repProfit"></span></div>
                <div><strong>ROE</strong><span id="repROE"></span></div>
                <div><strong>ROA</strong><span id="repROA"></span></div>
                <div><strong>Cost-to-Income</strong><span id="repCTI"></span></div>
                <div><strong>Capital Adequacy</strong><span id="repCAR"></span></div>
                <div><strong>ESG Rating</strong><span id="repESG"></span></div>
                <div><strong>Market Valuation</strong><span id="repValuation"></span></div>
            </div>

            <div class="ir-summary">
                <div>Market Confidence Index: <span id="confidenceIndex"></span></div>
                <div>Institutional Rating: <span id="marketRating"></span></div>
            </div>

            <div id="irVerdict" class="ir-verdict"></div>
        </div>
    `;

    summaryBox.appendChild(container);

    document
        .getElementById("compileReportBtn")
        .addEventListener("click", compileInvestorReport);

    document
        .getElementById("lockDisclosureBtn")
        .addEventListener("click", lockDisclosure);

    restorePhase18State();
    scrollToPhase18();
}

/* ======================================================
   REPORT ENGINE
====================================================== */

function compileInvestorReport() {

    const revenue = random(850, 1400);       // $M
    const profitMargin = random(18, 32) / 100;
    const profit = (revenue * profitMargin).toFixed(1);

    const equity = random(600, 900);
    const assets = random(4000, 6000);

    const roe = ((profit / equity) * 100).toFixed(1);
    const roa = ((profit / assets) * 100).toFixed(2);

    const cti = random(38, 55);
    const car = random(16, 22);

    const esg = pick(["AA", "A", "A+", "AAA"]);
    const peRatio = random(10, 18);
    const valuation = (profit * peRatio).toFixed(0);

    updateField("repRevenue", `$${revenue}M`);
    updateField("repProfit", `$${profit}M`);
    updateField("repROE", `${roe}%`);
    updateField("repROA", `${roa}%`);
    updateField("repCTI", `${cti}%`);
    updateField("repCAR", `${car}%`);
    updateField("repESG", esg);
    updateField("repValuation", `$${valuation}M`);

    const confidence = calculateConfidence(roe, car, cti);
    const rating = determineMarketRating(confidence);

    document.getElementById("confidenceIndex").textContent =
        confidence.toFixed(1) + "%";

    document.getElementById("marketRating").textContent = rating;

    document.getElementById("reportPanel").classList.remove("hidden");

    const verdict = document.getElementById("irVerdict");
    verdict.textContent =
        "Investor Disclosure Compiled. Financial transparency index updated.";
    verdict.className = "ir-verdict status-blue";

    phase18State.compiled = true;
    savePhase18State();

    safeLog("Phase 18: Public markets disclosure compiled.");
}

/* ======================================================
   MARKET LOGIC
====================================================== */

function calculateConfidence(roe, car, cti) {

    return (
        (parseFloat(roe) * 0.4) +
        (car * 2) -
        (cti * 0.3)
    );
}

function determineMarketRating(score) {

    if (score > 90) return "Premier Institutional Asset";
    if (score > 75) return "Strong Market Performer";
    if (score > 60) return "Stable Financial Entity";
    if (score > 45) return "Moderate Growth Institution";
    return "Speculative / Under Review";
}

/* ======================================================
   LOCK DISCLOSURE
====================================================== */

function lockDisclosure() {

    if (!phase18State.compiled) {
        alert("Compile the report first.");
        return;
    }

    document.getElementById("irVerdict").textContent =
        "Public Financial Disclosure Locked & Filed with Exchange Authority.";

    document.getElementById("irVerdict").className =
        "ir-verdict status-green";

    safeLog("Phase 18: Disclosure locked.");
}

/* ======================================================
   HELPERS
====================================================== */

function updateField(id, value) {
    document.getElementById(id).textContent = value;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function savePhase18State() {
    localStorage.setItem(
        phase18State.storageKey,
        JSON.stringify(phase18State)
    );
}

function restorePhase18State() {
    const saved = localStorage.getItem(phase18State.storageKey);
    if (!saved) return;
    try {
        Object.assign(phase18State, JSON.parse(saved));
    } catch {}
}

function scrollToPhase18() {
    const section = document.getElementById("phase18Section");
    if (section)
        section.scrollIntoView({ behavior: "smooth" });
}

function safeLog(message) {
    if (typeof logActivity === "function")
        logActivity(message);
    else
        console.log("[Phase18]", message);
}

/* ======================================================
   GLOBAL LISTENER
====================================================== */

document.addEventListener("click", e => {
    if (!e.target || e.target.tagName !== "LI") return;
    if ((e.target.textContent || "").startsWith("Phase 18"))
        renderPhase18Details();
});