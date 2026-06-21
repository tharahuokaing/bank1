/* =========================================================
   HUOKAING THARA BANK AUTHENTICATION CONTROLLER v4
   Secure Login + Session + Lockout + 2FA Ready
========================================================= */

(() => {

  const AUTH = {
    maxAttempts: 5,
    lockoutTimeMs: 5 * 60 * 1000, // 5 minutes
    sessionKey: "bankSession",
    attemptKey: "bankLoginAttempts"
  };

  /* =========================================
     Mock User Database (Replace in Production)
  ========================================= */

  const USERS = [
    {
      username: "huokaingthara",
      password: "dutyfree",
      role: "cybersecurity",
      requires2FA: false
    },

    {
      username: "auditor",
      password: "auditor123",
      role: "auditor",
      requires2FA: true
    },

    {
      username: "svaymetrey",
      password: "dutyfree",
      role: "admin",
      requires2FA: false
    },

    {
      username: "chornrothanak",
      password: "dutyfree",
      role: "admin",
      requires2FA: true
    },

    {
      username: "longlain",
      password: "dutyfree",
      role: "admin",
      requires2FA: false
    },

    {
      username: "chumchanrothanak", 
      password: "dutyfree",
      role: "admin",
      requires2FA: true
    },

    {
      username: "phaychanrothana",
      password: "dutyfree",
      role: "admin",
      requires2FA: false
    },
  ];

  /* =========================================
     Utility Functions
  ========================================= */

  function logAudit(message) {
    console.log(`[AUTH AUDIT] ${message}`);
  }

  function getAttempts() {
    return JSON.parse(localStorage.getItem(AUTH.attemptKey)) || {
      count: 0,
      lockUntil: null
    };
  }

  function setAttempts(data) {
    localStorage.setItem(AUTH.attemptKey, JSON.stringify(data));
  }

  function clearAttempts() {
    localStorage.removeItem(AUTH.attemptKey);
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

  function lockAccount() {
    const lockUntil = Date.now() + AUTH.lockoutTimeMs;
    setAttempts({
      count: AUTH.maxAttempts,
      lockUntil
    });
  }

  /* =========================================
     Login Handler
  ========================================= */

  async function handleLogin(username, password) {

    const msg = document.getElementById("loginMessage");
    msg.textContent = "";

    if (!username || !password) {
      msg.textContent = "Please enter username and password.";
      return;
    }

    if (isLocked()) {
      msg.textContent = "Account temporarily locked. Try again later.";
      return;
    }

    const user = USERS.find(u => u.username === username);

    if (!user || user.password !== password) {

      const data = getAttempts();
      data.count += 1;

      if (data.count >= AUTH.maxAttempts) {
        lockAccount();
        msg.textContent = "Too many attempts. Account locked.";
        logAudit("Account locked due to failed attempts.");
      } else {
        setAttempts(data);
        msg.textContent = `Invalid credentials (${data.count}/${AUTH.maxAttempts})`;
      }

      return;
    }

    clearAttempts();
    logAudit(`User ${username} authenticated.`);

    // 2FA Hook
    if (user.requires2FA && typeof start2FA === "function") {
      start2FA(() => finalizeLogin(user));
      return;
    }

    finalizeLogin(user);
  }

  /* =========================================
     Finalize Login
  ========================================= */

  function finalizeLogin(user) {

    const session = {
      username: user.username,
      role: user.role,
      loginTime: new Date().toISOString(),
      token: generateToken()
    };

    sessionStorage.setItem(AUTH.sessionKey, JSON.stringify(session));

    showDashboard(session);
  }

  function generateToken() {
    return btoa(
      Math.random().toString(36).substring(2) +
      Date.now().toString()
    );
  }

  /* =========================================
     Dashboard
  ========================================= */

  function showDashboard(session) {

    const loginBox = document.getElementById("loginContainer");
    const dashboard = document.getElementById("summaryBox");

    if (!loginBox || !dashboard) return;

    loginBox.hidden = true;
    dashboard.hidden = false;

    const bubble = document.getElementById("aiStatusBubble");

    if (bubble) {
      bubble.textContent =
        `User: ${session.username} | Role: ${session.role} | AI Core Active`;
    }

    renderRoleView(session.role);
  }

  function renderRoleView(role) {

    const phasesList = document.getElementById("phasesList");
    if (!phasesList) return;

    phasesList.innerHTML = "";

    const phases = PhaseRegistry.getAll();

    phases.forEach(phase => {

      const li = document.createElement("li");

      li.textContent =
        `${phase.name} [${phase.status.toUpperCase()}]`;

      li.onclick = () => showPhaseDetail(phase.id);

      if (role === "auditor" && phase.status !== "complete") {
        li.style.opacity = "0.5";
      }

      phasesList.appendChild(li);
    });
  }

  function showPhaseDetail(id) {

    const container =
      document.getElementById("phaseChecklistContainer");

    const phase = PhaseRegistry.getById(id);

    if (!phase || !container) return;

    container.innerHTML = `
      <div class="phase-detail-box">
        <h3>${phase.name}</h3>
        <p><strong>Status:</strong> ${phase.status}</p>
        <p>${phase.description}</p>
        <p><strong>Owner:</strong> ${phase.owner || "N/A"}</p>
        <p><strong>Risk:</strong> ${phase.riskLevel || "N/A"}</p>
      </div>
    `;
  }
  /* =========================================
     Logout
  ========================================= */

  function logout() {
    sessionStorage.removeItem(AUTH.sessionKey);
    location.reload();
  }

  /* =========================================
     Session Restore
  ========================================= */

  function getSession() {
    const raw = sessionStorage.getItem(AUTH.sessionKey);
    if (!raw) return null;

    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  function restoreSession() {
    const session = getSession();
    if (session) {
      showDashboard(session);
      logAudit(`Session restored for ${session.username}`);
    }
  }

  /* =========================================
     Bind Form
  ========================================= */

  document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("loginForm");
    if (!form) return;

    form.addEventListener("submit", e => {
      e.preventDefault();

      const username =
        document.getElementById("usernameInput").value.trim();

      const password =
        document.getElementById("passwordInput").value.trim();

      handleLogin(username, password);
    });

    restoreSession();
  });

  /* =========================================
     Expose Global Functions
  ========================================= */

  window.handleLogin = handleLogin;
  window.logout = logout;
  window.getSession = getSession;

})();