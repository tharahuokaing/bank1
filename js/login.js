/* ========================================================= 
   HUOKAING THARA BANKING SYSTEM 1
   AUTHENTICATION CONTROLLER v5.1 (Production Consolidation)
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
       USERS DB (Hardcoded Mock)
    ========================================================= */
    const USERS = [
        { username: "huokaingthara", password: "huokaingthara", role: "Cybersecurity", requires2FA: false },
        { username: "test", password: "test", role: "Test Customer", requires2FA: false },
        { username: "thorn", password: "thorn", role: "Customer", requires2FA: false },
        { username: "sansopheata", password: "sansopheata", role: "Chief Executive Officer", requires2FA: false },
        { username: "chansamnang", password: "chansamnang", role: "Customer", requires2FA: false },
        { username: "raem", password: "raem", role: "Customer", requires2FA: false },
        { username: "sengviseynea", password: "sengviseynea", role: "Chief Executive Officer", requires2FA: false },
        { username: "somsodavin", password: "somsodavin", role: "Chief Executive Officer", requires2FA: false },
        { username: "svaymetrey", password: "svaymetrey", role: "Chief Executive Officer", requires2FA: false },
        { username: "chornrothanak", password: "chornrothanak", role: "Chief Executive Officer", requires2FA: true },
        { username: "longlain", password: "longlain", role: "Chief Executive Officer", requires2FA: true },
        { username: "chumchanrothanak", password: "chumchanrothanak", role: "Chief Executive Officer", requires2FA: true },
        { username: "phaychanrothana", password: "phaychanrothana", role: "Chief Executive Officer", requires2FA: true },
        { username: "vanneat", password: "vanneat", role: "Customer", requires2FA: true },
        { username: "mengly", password: "mengly", role: "Customer", requires2FA: true },
        { username: "leyu", password: "leyu", role: "Customer", requires2FA: true },
        { username: "huy", password: "huy", role: "Customer", requires2FA: true },
        { username: "sengchhat", password: "sengchhat", role: "VIP Customer", requires2FA: true }
    ];
   
    /* =========================================================
       UTILITIES & SESSION HANDLING
    ========================================================= */
    function log(message) {
        console.log(`[AUTH ${new Date().toLocaleTimeString()}] ${message}`);
    }

    function saveSession(session) {
        sessionStorage.setItem(CONFIG.SESSION_KEY, JSON.stringify(session));
    }

    function loadSession() {
        const raw = sessionStorage.getItem(CONFIG.SESSION_KEY);
        if (!raw) return null;
        try { return JSON.parse(raw); } catch { return null; }
    }

    function destroySession() {
        sessionStorage.removeItem(CONFIG.SESSION_KEY);
    }

    /* =========================================================
       RATE LIMITER / LOCKOUT CONTROLLER
    ========================================================= */
    function getAttempts() {
        return JSON.parse(localStorage.getItem(CONFIG.ATTEMPT_KEY)) || { count: 0, lockUntil: null };
    }

    function saveAttempts(data) {
        localStorage.setItem(CONFIG.ATTEMPT_KEY, JSON.stringify(data));
    }

    function clearAttempts() {
        localStorage.removeItem(CONFIG.ATTEMPT_KEY);
    }

    function isLocked() {
        const data = getAttempts();
        if (!data.lockUntil) return false;
        if (Date.now() > data.lockUntil) {
            clearAttempts();
            return false;
        }
        return true;
    }

    /* =========================================================
       AUTHENTICATION CORE LOGIC
    ========================================================= */
    async function handleLogin(username, password) {
        const msg = document.getElementById("loginMessage");
        if (msg) msg.textContent = "";

        if (!username || !password) {
            if (msg) msg.textContent = "Please enter username and password.";
            return;
        }

        if (isLocked()) {
            if (msg) msg.textContent = "Account temporarily locked.";
            return;
        }

        const user = USERS.find(u => u.username === username && u.password === password);

        if (!user) {
            const data = getAttempts();
            data.count++;
            if (data.count >= CONFIG.MAX_ATTEMPTS) {
                data.lockUntil = Date.now() + (CONFIG.LOCKOUT_MINUTES * 60000);
                saveAttempts(data);
                if (msg) msg.textContent = "Too many failed logins.";
                return;
            }
            saveAttempts(data);
            if (msg) msg.textContent = `Invalid credentials (${data.count}/${CONFIG.MAX_ATTEMPTS})`;
            return;
        }

        clearAttempts();

        // 2FA Security check
        if (user.requires2FA && typeof start2FA === "function") {
            start2FA(() => finalizeLogin(user));
            return;
        }

        finalizeLogin(user);
    }

    function finalizeLogin(user) {
        const session = {
            username: user.username,
            role: user.role,
            token: crypto.randomUUID()
        };
        saveSession(session);
        renderDashboard(session);
    }
   
    /* =========================================================
       DASHBOARD & VIEW CONTROLLER
    ========================================================= */
    function renderDashboard(session) {
        const login = document.getElementById("loginContainer");
        const dashboard = document.getElementById("summaryBox");

        if (login) login.style.display = "none";
        if (dashboard) dashboard.style.display = "block";

        updateAIStatus(session);
        initializeDashboardData();
        renderDashboardCards();
        renderPhaseList();
    }

    function initializeDashboardData() {
        log("Dashboard active. Injecting financial records...");
        if (document.getElementById("accountCount")) {
            document.getElementById("accountCount").textContent = "$0";
            document.getElementById("depositTotal").textContent = "$0";
            document.getElementById("txCount").textContent = "$0";
        }
    }

    function updateAIStatus(session) {
        const bubble = document.getElementById("aiStatusBubble");
        if (!bubble) return;
        bubble.innerHTML = `AI CORE ONLINE • USER: ${session.username} • ROLE: ${session.role}`;
    }

    function renderDashboardCards() {
        const container = document.getElementById("searchContainer");
        if (!container) return;
        
        container.innerHTML = `
            <div class="dashboard-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 15px;">
                
                <!-- Card 1: Total Accounts -->
                <div class="dashboard-card">
                    <img src="total_account.jpg" alt="Accounts Icon" class="card-icon" style="width:24px; height:24px;">
                    <h3 id="accountCount">$0</h3>
                    <p>Total Accounts</p>
                    <a href="https://tharahuokaing.github.io/total_account1/" class="card-link">View Details</a>
                </div>

                <!-- Card 2: Total Deposits -->
                <div class="dashboard-card">
                    <img src="total_deposit.jpg" alt="Deposits Icon" class="card-icon" style="width:24px; height:24px;">
                    <h3 id="depositTotal">$0</h3>
                    <p>Total Deposits</p>
                    <a href="https://tharahuokaing.github.io/deposit1/" class="card-link">View Details</a>
                </div>

                <!-- Card 3: Transaction Volumes -->
                <div class="dashboard-card">
                    <img src="transaction_volumn.jpg" alt="Transactions Icon" class="card-icon" style="width:24px; height:24px;">
                    <h3 id="txCount">$0</h3>
                    <p>Transactions Processed</p>
                    <a href="https://tharahuokaing.github.io/transaction1/" class="card-link">View Log</a>
                </div>

                <!-- Card 4: System Phases -->
                <div class="dashboard-card">
                    <img src="system_phase.jpg" alt="Phases Icon" class="card-icon" style="width:24px; height:24px;">
                    <h3>21</h3>
                    <p>Total Phases</p>
                    <a href="https://tharahuokaing.github.io/total_phase1/" class="card-link">View Phase Map</a>
                </div>

                <!-- Card 5: Financial Compliance -->
                <div class="dashboard-card">
                    <img src="financial_complaint.jpg" alt="Compliance Icon" class="card-icon" style="width:24px; height:24px;">
                    <h3>ISO 20022</h3>
                    <p>Compliance Status</p>
                    <a href="https://tharahuokaing.github.io/financial_compliance1/" class="card-link">View Documents</a>
                </div>

                <!-- Card 6: Interbank Network -->
                <div class="dashboard-card">
                    <img src="interbank_network.jpg" alt="Bakong Icon" class="card-icon" style="width:24px; height:24px;">
                    <h3>Bakong</h3>
                    <p>Connected Gateways</p>
                    <a href="https://tharahuokaing.github.io/interbank_network1/" class="card-link">Gateway Status</a>
                </div>

                <!-- Card 7: Security Architecture -->
                <div class="dashboard-card">
                    <img src="security_architecture.jpg" alt="SOC Icon" class="card-icon" style="width:24px; height:24px;">
                    <h3>SOC</h3>
                    <p>Monitoring Nodes</p>
                    <a href="https://tharahuokaing.github.io/security_architecture1/" class="card-link">Live Alerts</a>
                </div>

                <!-- Card 8: Pending Clearings -->
                <div class="dashboard-card">
                    <img src="pending_clearing.jpg" alt="Clearing Icon" class="card-icon" style="width:24px; height:24px;">
                    <h3>0</h3>
                    <p>Pending Clearings</p>
                    <a href="https://tharahuokaing.github.io/pending_clearing1/" class="card-link">Clear Queue</a>
                </div>

                <!-- Card 9: Active Audits -->
                <div class="dashboard-card">
                    <img src="active_audit.jpg" alt="Audits Icon" class="card-icon" style="width:24px; height:24px;">
                    <h3>Passed</h3>
                    <p>System Audits</p>
                    <a href="https://tharahuokaing.github.io/active_audit1/" class="card-link">Report Vault</a>
                </div>

                <!-- Card 10: AI Core Status -->
                <div class="dashboard-card">
                    <img src="ai_core.jpg" alt="AI Status Icon" class="card-icon" style="width:24px; height:24px;">
                    <h3>Operational</h3>
                    <p>AI Core Systems</p>
                    <a href="https://tharahuokaing.github.io/ai_core1/" class="card-link">Core Logs</a>
                </div>

            </div>
        `;
    }

    function renderPhaseList() {
        const list = document.getElementById("phasesList");
        if (!list || !window.PhaseRegistry || !PhaseRegistry.getAll) {
            if (list) list.innerHTML = "<li>No phases loaded.</li>";
            return;
        }

        list.innerHTML = "";
        PhaseRegistry.getAll().forEach(phase => {
            const li = document.createElement("li");
            li.className = "phase-item";
            li.innerHTML = `${phase.name} <span>${phase.status}</span>`;
            li.onclick = () => {
                if (typeof phase.render === "function") phase.render();
            };
            list.appendChild(li);
        });
    }
   
    /* =========================================================
       SESSION MANAGEMENT & LIFE CYCLE
    ========================================================= */
    function logout() {
        destroySession();
        location.reload();
    }

    function restoreSession() {
        const session = loadSession();
        if (session) renderDashboard(session);
    }

    function startSessionTimer() {
        let timeout;
        const reset = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                alert("Session expired.");
                logout();
            }, CONFIG.SESSION_TIMEOUT_MINUTES * 60000);
        };
        document.addEventListener("mousemove", reset);
        document.addEventListener("keypress", reset);
        reset();
    }

    /* =========================================================
       INITIALIZATION
    ========================================================= */
    document.addEventListener("DOMContentLoaded", () => {
        const form = document.getElementById("loginForm");
        if (form) {
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                const userVal = document.getElementById("usernameInput")?.value.trim();
                const passVal = document.getElementById("passwordInput")?.value.trim();
                handleLogin(userVal, passVal);
            });
        }

        restoreSession();
        startSessionTimer();

        document.getElementById("logoutBtn")?.addEventListener("click", logout);
    });

    /* =========================================================
       GLOBALS
    ========================================================= */
    window.logout = logout;
    window.handleLogin = handleLogin;

})();
