/* =========================================================
   HUOKAING THARA BANK AUTHENTICATION CONTROLLER v4
   Revised for robust DOM state switching and session flow
========================================================= */

(function() {

  const AUTH = {
    maxAttempts: 5,
    lockoutTimeMs: 5 * 60 * 1000,
    sessionKey: "bankSession",
    attemptKey: "bankLoginAttempts"
  };

  const USERS = [
    { username: "huokaingthara", password: "dutyfree", role: "cybersecurity", requires2FA: false },
    { username: "auditor", password: "auditor123", role: "auditor", requires2FA: true },
    { username: "svaymetrey", password: "dutyfree", role: "admin", requires2FA: false },
    { username: "chornrothanak", password: "dutyfree", role: "admin", requires2FA: true }
  ];

  /* =========================================
     State Management & Helpers
  ========================================= */

  function showDashboard(session) {
    const loginBox = document.getElementById("loginContainer");
    const dashboard = document.getElementById("summaryBox");

    if (loginBox) loginBox.hidden = true;
    if (dashboard) dashboard.hidden = false;

    const bubble = document.getElementById("aiStatusBubble");
    if (bubble) {
      bubble.textContent = `User: ${session.username} | Role: ${session.role} | AI Core Active`;
    }

    renderRoleView(session.role);
  }

  function finalizeLogin(user) {
    const session = {
      username: user.username,
      role: user.role,
      loginTime: new Date().toISOString(),
      token: btoa(Math.random().toString())
    };

    sessionStorage.setItem(AUTH.sessionKey, JSON.stringify(session));
    showDashboard(session);
  }

  /* =========================================
     Core Auth Logic
  ========================================= */

  async function handleLogin(username, password) {
    const msg = document.getElementById("loginMessage");
    if (!msg) return;

    if (!username || !password) {
      msg.textContent = "Please enter username and password.";
      return;
    }

    const user = USERS.find(u => u.username === username);

    if (!user || user.password !== password) {
      msg.textContent = "Invalid credentials.";
      return;
    }

    // 2FA Hook
    if (user.requires2FA && typeof window.start2FA === "function") {
      window.start2FA(() => finalizeLogin(user));
    } else {
      finalizeLogin(user);
    }
  }

  function logout() {
    sessionStorage.removeItem(AUTH.sessionKey);
    location.reload();
  }

  /* =========================================
     Initialization & Exports
  ========================================= */

  // Expose to window so your HTML onclick/submit events can find them
  window.handleLogin = handleLogin;
  window.logout = logout;

  // Session Restore on Page Load
  window.addEventListener("load", () => {
    const raw = sessionStorage.getItem(AUTH.sessionKey);
    if (raw) {
      try {
        const session = JSON.parse(raw);
        showDashboard(session);
      } catch (e) {
        sessionStorage.removeItem(AUTH.sessionKey);
      }
    }
  });

})();
