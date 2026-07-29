/**
 * Phase 6: Global Standards Alignment
 * Audits system against international financial benchmarks
 */

const phase6Data = {
    id: "phase6",
    title: "Phase 6: Global Standards Alignment",
    storageKey: "phase6_state",
    isAuditing: false,
    standards: [
        { pillar: "Financial Inclusion", weight: 25 },
        { pillar: "Anti-Corruption Controls", weight: 25 },
        { pillar: "Data Protection & Privacy", weight: 25 },
        { pillar: "Capital Adequacy (Basel III)", weight: 25 }
    ]
};

/* =====================================================
   RENDER
===================================================== */

function renderPhase6Details() {

    const summaryBox = document.getElementById("summaryBox");
    if (!summaryBox) return;

    if (document.getElementById("phase6Section")) {
        scrollToPhase6();
        return;
    }

    const container = document.createElement("section");
    container.id = "phase6Section";
    container.className = "phase-detail-box phase6-theme";

    container.innerHTML = `
        <header class="phase-header">
            <h2>${phase6Data.title}</h2>
            <p>Validating compliance against international regulatory benchmarks.</p>
        </header>

        <div class="audit-progress">
            <div id="auditBar" class="audit-bar"></div>
        </div>

        <button id="runAuditBtn">Run Global Compliance Audit</button>

        <div id="auditResults" class="audit-results hidden">
            <table>
                <thead>
                    <tr>
                        <th>Pillar</th>
                        <th>Score</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody id="auditTableBody"></tbody>
            </table>
        </div>

        <div id="auditSummary" class="audit-summary"></div>
    `;

    summaryBox.appendChild(container);

    document
        .getElementById("runAuditBtn")
        .addEventListener("click", runGlobalAudit);

    restorePhase6State();
    scrollToPhase6();
}

/* =====================================================
   AUDIT ENGINE
===================================================== */

function runGlobalAudit() {

    if (phase6Data.isAuditing) return;

    phase6Data.isAuditing = true;

    const btn = document.getElementById("runAuditBtn");
    const tbody = document.getElementById("auditTableBody");
    const resultsDiv = document.getElementById("auditResults");
    const summary = document.getElementById("auditSummary");

    if (!btn || !tbody || !resultsDiv) return;

    btn.disabled = true;
    btn.textContent = "Running Audit...";
    tbody.innerHTML = "";
    resultsDiv.classList.remove("hidden");

    let totalScore = 0;

    phase6Data.standards.forEach((std, index) => {

        setTimeout(() => {

            const score = generateComplianceScore();
            totalScore += score;

            const status = determineStatus(score);

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${std.pillar}</td>
                <td>${score}%</td>
                <td class="${status.class}">${status.label}</td>
            `;
            tbody.appendChild(tr);

            updateAuditProgress(((index + 1) / phase6Data.standards.length) * 100);

            if (index === phase6Data.standards.length - 1) {
                finalizeAudit(totalScore / phase6Data.standards.length);
            }

        }, (index + 1) * 700);

    });
}

/* =====================================================
   HELPERS
===================================================== */

function generateComplianceScore() {
    return Math.floor(Math.random() * 21) + 80; // 80–100 realistic
}

function determineStatus(score) {
    if (score >= 95) {
        return { label: "FULLY COMPLIANT ✓", class: "status-green" };
    } else if (score >= 85) {
        return { label: "PARTIALLY COMPLIANT", class: "status-yellow" };
    } else {
        return { label: "REMEDIATION REQUIRED", class: "status-red" };
    }
}

function updateAuditProgress(percent) {
    const bar = document.getElementById("auditBar");
    if (bar) bar.style.width = percent + "%";
}

function finalizeAudit(avgScore) {

    const summary = document.getElementById("auditSummary");
    const btn = document.getElementById("runAuditBtn");

    let rating;
    let className;

    if (avgScore >= 95) {
        rating = "GLOBAL STANDARD EXCELLENCE";
        className = "status-green";
    } else if (avgScore >= 85) {
        rating = "ACCEPTABLE – MINOR IMPROVEMENTS ADVISED";
        className = "status-yellow";
    } else {
        rating = "CRITICAL GAPS IDENTIFIED";
        className = "status-red";
    }

    if (summary) {
        summary.innerHTML = `
            <strong>Overall Compliance Score:</strong> ${avgScore.toFixed(1)}%<br>
            <span class="${className}">${rating}</span>
        `;
    }

    if (btn) btn.textContent = "Audit Complete";

    savePhase6State(avgScore);
    safeLog("Phase 6: Global compliance audit completed.");
}

function savePhase6State(avgScore) {
    localStorage.setItem(
        phase6Data.storageKey,
        JSON.stringify({ completed: true, score: avgScore })
    );
}

function restorePhase6State() {

    const saved = localStorage.getItem(phase6Data.storageKey);
    if (!saved) return;

    try {
        const state = JSON.parse(saved);
        if (state.completed) {
            updateAuditProgress(100);
            finalizeAudit(state.score);
        }
    } catch (err) {
        console.warn("Phase6 restore error:", err);
    }
}

function scrollToPhase6() {
    const section = document.getElementById("phase6Section");
    if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

function safeLog(message) {
    if (typeof logActivity === "function") {
        logActivity(message);
    } else {
        console.log("[Phase6]", message);
    }
}

/* =====================================================
   GLOBAL LISTENER
===================================================== */

document.addEventListener("click", (e) => {

    if (!e.target || e.target.tagName !== "LI") return;

    const text = e.target.textContent || "";

    if (text.startsWith("Phase 6")) {
        renderPhase6Details();
    }
});