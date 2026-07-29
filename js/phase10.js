/**
 * Phase 10: Digital Public Infrastructure & Open Finance
 * OAuth 2.0 Consent & Token Lifecycle Simulator
 */

const phase10Data = {
    id: "phase10",
    title: "Phase 10: DPI & Open Finance",
    storageKey: "phase10_state",
    apps: [
        {
            id: "wealth_app",
            name: "Khmer Wealth Manager",
            scopes: ["Read Balance", "Transaction History"],
            status: "pending",
            tokenExpiry: null
        },
        {
            id: "tax_tool",
            name: "EasyTax Cambodia",
            scopes: ["Read Income", "Export Statements"],
            status: "pending",
            tokenExpiry: null
        }
    ]
};

/* =====================================================
   RENDER
===================================================== */

function renderPhase10Details() {

    const summaryBox = document.getElementById("summaryBox");
    if (!summaryBox) return;

    if (document.getElementById("phase10Section")) {
        scrollToPhase10();
        return;
    }

    const container = document.createElement("section");
    container.id = "phase10Section";
    container.className = "phase-detail-box phase10-theme";

    container.innerHTML = `
        <header class="phase-header">
            <h2>${phase10Data.title}</h2>
            <p>Manage third-party API consent and token lifecycle.</p>
        </header>

        <div id="consentList" class="consent-list"></div>

        <div id="dpiAuditLog" class="dpi-audit-log">
            > Awaiting consent actions...
        </div>
    `;

    summaryBox.appendChild(container);

    renderConsentCards();
    restorePhase10State();
    scrollToPhase10();
}

/* =====================================================
   CONSENT CARDS
===================================================== */

function renderConsentCards() {

    const container = document.getElementById("consentList");
    if (!container) return;

    container.innerHTML = "";

    phase10Data.apps.forEach(app => {

        const card = document.createElement("div");
        card.className = "consent-card";

        card.innerHTML = `
            <div class="consent-header">
                <strong>${app.name}</strong>
                <span class="status-badge ${getStatusClass(app.status)}">
                    ${app.status.toUpperCase()}
                </span>
            </div>

            <ul class="scope-list">
                ${app.scopes.map(scope => `<li>${scope}</li>`).join("")}
            </ul>

            <div class="consent-actions">
                ${renderActionButtons(app)}
            </div>
        `;

        container.appendChild(card);
    });

    attachConsentListeners();
}

function renderActionButtons(app) {

    if (app.status === "pending") {
        return `
            <button class="authorize-btn" data-id="${app.id}">Authorize</button>
            <button class="deny-btn" data-id="${app.id}">Deny</button>
        `;
    }

    if (app.status === "active") {
        return `
            <button class="revoke-btn" data-id="${app.id}">Revoke</button>
        `;
    }

    if (app.status === "denied") {
        return `
            <button class="authorize-btn" data-id="${app.id}">Re-Authorize</button>
        `;
    }

    if (app.status === "expired") {
        return `
            <button class="authorize-btn" data-id="${app.id}">Renew Token</button>
        `;
    }

    return "";
}

function attachConsentListeners() {

    document.querySelectorAll(".authorize-btn").forEach(btn =>
        btn.addEventListener("click", () =>
            authorizeApp(btn.dataset.id))
    );

    document.querySelectorAll(".deny-btn").forEach(btn =>
        btn.addEventListener("click", () =>
            denyApp(btn.dataset.id))
    );

    document.querySelectorAll(".revoke-btn").forEach(btn =>
        btn.addEventListener("click", () =>
            revokeApp(btn.dataset.id))
    );
}

/* =====================================================
   CONSENT ACTIONS
===================================================== */

function authorizeApp(appId) {

    const app = phase10Data.apps.find(a => a.id === appId);
    if (!app) return;

    app.status = "active";
    app.tokenExpiry = Date.now() + 15000; // 15s token life

    appendAuditLog(`OAuth token issued for ${app.name}.`);

    safeLog(`Phase 10: Consent granted for ${app.name}.`);

    savePhase10State();
    renderConsentCards();
    startTokenWatcher(app);
}

function denyApp(appId) {

    const app = phase10Data.apps.find(a => a.id === appId);
    if (!app) return;

    app.status = "denied";
    app.tokenExpiry = null;

    appendAuditLog(`${app.name} access denied by user.`);
    savePhase10State();
    renderConsentCards();
}

function revokeApp(appId) {

    const app = phase10Data.apps.find(a => a.id === appId);
    if (!app) return;

    app.status = "revoked";
    app.tokenExpiry = null;

    appendAuditLog(`Token revoked for ${app.name}.`);
    safeLog(`Phase 10: Consent revoked for ${app.name}.`);

    savePhase10State();
    renderConsentCards();
}

/* =====================================================
   TOKEN EXPIRY WATCHER
===================================================== */

function startTokenWatcher(app) {

    const interval = setInterval(() => {

        if (!app.tokenExpiry) {
            clearInterval(interval);
            return;
        }

        if (Date.now() > app.tokenExpiry) {
            app.status = "expired";
            app.tokenExpiry = null;
            appendAuditLog(`Token expired for ${app.name}.`);
            savePhase10State();
            renderConsentCards();
            clearInterval(interval);
        }

    }, 1000);
}

/* =====================================================
   HELPERS
===================================================== */

function appendAuditLog(message) {
    const log = document.getElementById("dpiAuditLog");
    if (!log) return;
    log.innerHTML += `<br>> ${message}`;
    log.scrollTop = log.scrollHeight;
}

function getStatusClass(status) {
    return {
        pending: "status-yellow",
        active: "status-green",
        denied: "status-red",
        revoked: "status-red",
        expired: "status-yellow"
    }[status] || "";
}

function savePhase10State() {
    localStorage.setItem(
        phase10Data.storageKey,
        JSON.stringify(phase10Data.apps)
    );
}

function restorePhase10State() {

    const saved = localStorage.getItem(phase10Data.storageKey);
    if (!saved) return;

    try {
        phase10Data.apps = JSON.parse(saved);
    } catch (err) {
        console.warn("Phase10 restore error:", err);
    }
}

function scrollToPhase10() {
    const section = document.getElementById("phase10Section");
    if (section)
        section.scrollIntoView({ behavior: "smooth", block: "start" });
}

function safeLog(message) {
    if (typeof logActivity === "function") {
        logActivity(message);
    } else {
        console.log("[Phase10]", message);
    }
}

/* =====================================================
   GLOBAL LISTENER
===================================================== */

document.addEventListener("click", e => {
    if (!e.target || e.target.tagName !== "LI") return;
    if ((e.target.textContent || "").startsWith("Phase 10")) {
        renderPhase10Details();
    }
});