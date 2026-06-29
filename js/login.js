/* =========================================================
   HUOKAING THARA BANKING SYSTEM
   AUTHENTICATION CONTROLLER v5
   Enterprise Dashboard Edition
========================================================= */

(() => {

"use strict";

/* =========================================================
   CONFIGURATION
========================================================= */

const CONFIG = {
    SESSION_KEY: "HT_SESSION",
    ATTEMPT_KEY: "HT_ATTEMPTS",

    MAX_ATTEMPTS: 5,

    LOCKOUT_MINUTES: 5,

    SESSION_TIMEOUT_MINUTES: 30
};

/* =========================================================
   USERS
========================================================= */

const USERS = [

{
    username: "huokaingthara",
    password: "dutyfree",
    role: "Cybersecurity",
    requires2FA: false
},

{
    username: "svaymetrey",
    password: "dutyfree",
    role: "Administrator",
    requires2FA: false
},

{
    username: "chornrothanak",
    password: "dutyfree",
    role: "Administrator",
    requires2FA: true
},

{
    username: "longlain",
    password: "dutyfree",
    role: "Administrator",
    requires2FA: true
},

{
    username: "huo",
    password: "dutyfree",
    role: "Chief Executive Officer",
    requires2FA: true
},

{
    username: "khenlyda",
    password: "dutyfree",
    role: "Administrator",
    requires2FA: true
},

{
    username: "phaychanrothana",
    password: "dutyfree",
    role: "Administrator",
    requires2FA: true
},

{
    username: "chumchanrothanak",
    password: "dutyfree",
    role: "Administrator",
    requires2FA: true
},

{
    username: "user",
    password: "pass",
    role: "Test User",
    requires2FA: true
},

{
    username: "auditor",
    password: "auditor123",
    role: "Auditor",
    requires2FA: true
}

];

/* =========================================================
   UTILITIES
========================================================= */

function log(message)
{
    console.log(
        `[AUTH ${new Date().toLocaleTimeString()}] ${message}`
    );
}

function generateToken()
{
    return crypto.randomUUID();
}

function saveSession(session)
{
    sessionStorage.setItem(
        CONFIG.SESSION_KEY,
        JSON.stringify(session)
    );
}

function loadSession()
{
    const raw =
        sessionStorage.getItem(CONFIG.SESSION_KEY);

    if (!raw) return null;

    try
    {
        return JSON.parse(raw);
    }
    catch
    {
        return null;
    }
}

function destroySession()
{
    sessionStorage.removeItem(CONFIG.SESSION_KEY);
}

/* =========================================================
   LOGIN ATTEMPTS
========================================================= */

function getAttempts()
{
    return JSON.parse(
        localStorage.getItem(CONFIG.ATTEMPT_KEY)
    ) || {
        count: 0,
        lockUntil: null
    };
}

function saveAttempts(data)
{
    localStorage.setItem(
        CONFIG.ATTEMPT_KEY,
        JSON.stringify(data)
    );
}

function clearAttempts()
{
    localStorage.removeItem(CONFIG.ATTEMPT_KEY);
}

function isLocked()
{
    const data = getAttempts();

    if (!data.lockUntil)
        return false;

    if (Date.now() > data.lockUntil)
    {
        clearAttempts();
        return false;
    }

    return true;
}

/* =========================================================
   LOGIN
========================================================= */

async function handleLogin(username,password)
{
    const msg =
        document.getElementById("loginMessage");

    msg.textContent = "";

    if (!username || !password)
    {
        msg.textContent =
            "Please enter username and password.";

        return;
    }

    if (isLocked())
    {
        msg.textContent =
            "Account temporarily locked.";

        return;
    }

    const user =
        USERS.find(
            u =>
            u.username === username &&
            u.password === password
        );

    if (!user)
    {
        const data = getAttempts();

        data.count++;

        if (data.count >= CONFIG.MAX_ATTEMPTS)
        {
            data.lockUntil =
                Date.now() +
                CONFIG.LOCKOUT_MINUTES * 60000;

            saveAttempts(data);

            msg.textContent =
                "Too many failed logins.";

            return;
        }

        saveAttempts(data);

        msg.textContent =
            `Invalid credentials (${data.count}/${CONFIG.MAX_ATTEMPTS})`;

        return;
    }

    clearAttempts();

    if (
        user.requires2FA &&
        typeof start2FA === "function"
    )
    {
        start2FA(
            () => finalizeLogin(user)
        );

        return;
    }

    finalizeLogin(user);
}

/* =========================================================
   SUCCESS LOGIN
========================================================= */

function finalizeLogin(user)
{
    const session = {

        username: user.username,

        role: user.role,

        loginTime: Date.now(),

        token: generateToken()
    };

    saveSession(session);

    renderDashboard(session);

    log(
        `${user.username} authenticated`
    );
}

/* =========================================================
   DASHBOARD
========================================================= */

function renderDashboard(session)
{
    const login =
        document.getElementById(
            "loginContainer"
        );

    const dashboard =
        document.getElementById(
            "summaryBox"
        );

    if (!login || !dashboard)
        return;

    login.style.display = "none";

    dashboard.style.display = "block";

    updateAIStatus(session);

    renderDashboardCards();

    renderPhaseList();
}

function updateAIStatus(session)
{
    const bubble =
        document.getElementById(
            "aiStatusBubble"
        );

    if (!bubble)
        return;

    bubble.innerHTML =
    `
        AI CORE ONLINE •
        USER: ${session.username}
        • ROLE: ${session.role}
    `;
}

function renderDashboardCards()
{
    const container =
        document.getElementById(
            "searchContainer"
        );

    if (!container)
        return;

    container.innerHTML =
    `
        <div class="dashboard-grid">

            <div class="dashboard-card">
                <h3>18</h3>
                <p>Total Phases</p>
            </div>

            <div class="dashboard-card">
                <h3>ISO 20022</h3>
                <p>Compliance</p>
            </div>

            <div class="dashboard-card">
                <h3>Bakong</h3>
                <p>Connected</p>
            </div>

            <div class="dashboard-card">
                <h3>SOC</h3>
                <p>Monitoring</p>
            </div>

        </div>
    `;
}

/* =========================================================
   PHASES
========================================================= */

function renderPhaseList()
{
    const list =
        document.getElementById(
            "phasesList"
        );

    if (!list)
        return;

    list.innerHTML = "";

    if (
        !window.PhaseRegistry ||
        !PhaseRegistry.getAll
    )
    {
        list.innerHTML =
            "<li>No phases loaded.</li>";

        return;
    }

    PhaseRegistry
        .getAll()
        .forEach(phase =>
        {
            const li =
                document.createElement("li");

            li.className =
                "phase-item";

            li.innerHTML =
            `
            ${phase.name}
            <span>
            ${phase.status}
            </span>
            `;

            li.onclick = () =>
            {
                if (
                    typeof phase.render ===
                    "function"
                )
                {
                    phase.render();
                }
            };

            list.appendChild(li);
        });
}

/* =========================================================
   LOGOUT
========================================================= */

function logout()
{
    destroySession();

    location.reload();
}

/* =========================================================
   SESSION RESTORE
========================================================= */

function restoreSession()
{
    const session =
        loadSession();

    if (!session)
        return;

    renderDashboard(session);
}

/* =========================================================
   SESSION TIMEOUT
========================================================= */

function startSessionTimer()
{
    let timeout;

    const reset = () =>
    {
        clearTimeout(timeout);

        timeout =
        setTimeout(() =>
        {
            alert(
                "Session expired."
            );

            logout();

        },
        CONFIG.SESSION_TIMEOUT_MINUTES
        * 60000);
    };

    document.addEventListener(
        "mousemove",
        reset
    );

    document.addEventListener(
        "keypress",
        reset
    );

    reset();
}

/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () =>
    {
        const form =
            document.getElementById(
                "loginForm"
            );

        if (form)
        {
            form.addEventListener(
                "submit",
                e =>
                {
                    e.preventDefault();

                    handleLogin(
                        document
                            .getElementById(
                                "usernameInput"
                            )
                            .value
                            .trim(),

                        document
                            .getElementById(
                                "passwordInput"
                            )
                            .value
                            .trim()
                    );
                }
            );
        }

        restoreSession();

        startSessionTimer();

        document
            .getElementById("logoutBtn")
            ?.addEventListener(
                "click",
                logout
            );
    }
);

/* =========================================================
   GLOBALS
========================================================= */

window.logout = logout;
window.handleLogin = handleLogin;

})();
