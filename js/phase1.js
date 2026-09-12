/**
 * Phase 1: Vision & Concept Development
 * Strategic foundation of HUOKAING THARA Bank
 */

const phase1Data = {
    id: "phase1",
    title: "Phase 1: Vision & Concept Development",
    vision: "To establish a resilient, high-tech banking infrastructure in Cambodia that bridges local operations with global ISO 20022 standards.",
    milestones: [
        "Definition of the Digital Core architecture",
        "Stakeholder alignment on World Bank standards",
        "Initial capital requirement mapping",
        "AI Guardian integration protocol setup"
    ]
};

/* =====================================================
   RENDER FUNCTION
===================================================== */

function renderPhase1Details() {

    const summaryBox = document.getElementById("summaryBox");
    if (!summaryBox) return;

    // Prevent duplicate render
    if (document.getElementById("phase1Section")) return;

    const container = document.createElement("section");
    container.id = "phase1Section";
    container.className = "phase-detail-box";

    container.innerHTML = `
        <header class="phase-header">
            <h2>${phase1Data.title}</h2>
        </header>

        <div class="phase-vision">
            <p><strong>Vision:</strong></p>
            <p class="vision-text">${phase1Data.vision}</p>
        </div>

        <div class="vision-chart">
            <p>Local Needs → Digital Core → Global Connectivity</p>
        </div>

        <div class="phase-milestones">
            <h3>Key Milestones</h3>
            <ul id="p1Milestones"></ul>
        </div>

        <div class="phase-actions">
            <button id="p1DownloadBtn">Export Phase 1 Strategy</button>
        </div>
    `;

    summaryBox.appendChild(container);

    populateMilestones();
    attachExportHandler();

    safeLog("Phase 1 rendered.");
}

/* =====================================================
   HELPERS
===================================================== */

function populateMilestones() {
    const list = document.getElementById("p1Milestones");
    if (!list) return;

    phase1Data.milestones.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
    });
}

function attachExportHandler() {
    const btn = document.getElementById("p1DownloadBtn");
    if (!btn) return;

    btn.addEventListener("click", () => {
        const content = `
PHASE: ${phase1Data.title}

VISION:
${phase1Data.vision}

MILESTONES:
- ${phase1Data.milestones.join("\n- ")}
        `;

        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "Phase1_Strategy.txt";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);

        safeLog("Phase 1 Strategy exported.");
    });
}

function safeLog(message) {
    if (typeof logActivity === "function") {
        logActivity(message);
    } else {
        console.log("[Phase1]", message);
    }
}

/* =====================================================
   EVENT LISTENER (Safer Delegation)
===================================================== */

document.addEventListener("click", (e) => {

    if (!e.target || e.target.tagName !== "LI") return;

    const text = e.target.textContent || "";

    if (text.startsWith("Phase 1")) {
        renderPhase1Details();
    }

});
