/* =========================================================
   HUOKAING THARA BANK - REGISTRATION MODULE
   Handles new user enrollment and persistent data storage
========================================================= */

const RegistrationModule = {
    // The key used to sync with your login module
    STORAGE_KEY: "bank_user_db",

    init: function() {
        const regForm = document.getElementById("registrationForm");
        if (regForm) {
            regForm.addEventListener("submit", (e) => this.handleRegistration(e));
        }
    },

    handleRegistration: function(e) {
        e.preventDefault();

        const username = document.getElementById("regUsername").value.trim();
        const password = document.getElementById("regPassword").value.trim();
        const msg = document.getElementById("regMessage");

        // 1. Retrieve existing users (or default to empty array)
        let users = JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];

        // 2. Validate Uniqueness
        if (users.find(u => u.username === username)) {
            msg.textContent = "Error: Username already exists.";
            msg.style.color = "red";
            return;
        }

        // 3. Create New Account
        const newUser = {
            username: username,
            password: password,
            role: "user", // Default role
            requires2FA: false
        };

        // 4. Save to Database
        users.push(newUser);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));

        msg.textContent = "Registration Successful! You can now login.";
        msg.style.color = "#10b981";
        
        // Reset Form
        e.target.reset();
    }
};

document.addEventListener("DOMContentLoaded", () => RegistrationModule.init());
 