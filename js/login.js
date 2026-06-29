/* =========================================================
   HUOKAING THARA BANKING SYSTEM - AUTHENTICATION CONTROLLER v5
   Fixed: Merged logic blocks and View Switcher implemented
========================================================= */

(() => {
    "use strict";

    const CONFIG = {
        SESSION_KEY: "HT_SESSION",
        ATTEMPT_KEY: "HT_ATTEMPTS",
        MAX_ATTEMPTS: 5,
        LOCKOUT_MINUTES: 5
    };

    const USERS = [
        { username: "huokaingthara", password: "dutyfree", role: "Cybersecurity", requires2FA: false },
        { username: "user", password: "pass", role: "Test User", requires2FA: true }
        // ... include other hardcoded users here
    ];

    async function handleLogin(username, password) {
        const msg = document.getElementById("loginMessage");
        
        // 1. Fetch registered users from localStorage
        const registeredUsers = JSON.parse(localStorage.getItem("bank_user_db")) || [];
        const allUsers = [...USERS, ...registeredUsers];
        const user = allUsers.find(u => u.username === username && u.password === password);

        // 2. Validate Credentials
        if (!user) {
            msg.textContent = "Invalid username or password.";
            return;
        }

        // 3. Clear attempts and finalize
        msg.textContent = "";
        
        // 4. Trigger View Switch
        finalizeLogin(user);
    }

    function finalizeLogin(user) {
        const session = {
            username: user.username,
            role: user.role,
            loginTime: Date.now(),
            token: crypto.randomUUID()
        };

        // Save session
        sessionStorage.setItem(CONFIG.SESSION_KEY, JSON.stringify(session));

        // SHOW DASHBOARD, HIDE AUTH VIEW
        const loginContainer = document.getElementById("loginContainer");
        const authView = document.getElementById("authView"); // Added authView wrapper
        const dashboard = document.getElementById("summaryBox");

        if (authView) authView.style.display = "none";
        if (loginContainer) loginContainer.style.display = "none";
        if (dashboard) dashboard.style.display = "block";

        // Trigger your UI renders
        if (typeof renderDashboard === "function") renderDashboard(session);
        
        console.log(`${user.username} authenticated`);
    }

    // Bindings
    document.addEventListener("DOMContentLoaded", () => {
        document.getElementById("loginForm").addEventListener("submit", (e) => {
            e.preventDefault();
            handleLogin(
                document.getElementById("usernameInput").value.trim(),
                document.getElementById("passwordInput").value.trim()
            );
        });
    });

    window.handleLogin = handleLogin;
})();