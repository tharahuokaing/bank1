/**
 * Phase Security Layer: Enterprise 2FA Engine
 * OTP Expiry | Lockout | Secure Modal | SOC Logging
 */

const twoFAState = {
    otpHash: null,
    expiresAt: null,
    attempts: 0,
    maxAttempts: 3,
    lockUntil: null,
    ttl: 60000, // 60 seconds
    protectedPhases: ["Phase 14", "Phase 16"]
};

/* =========================================
   MAIN TRIGGER
========================================= */

async function trigger2FA(onSuccess) {

    if (isLocked()) {
        alert("2FA Locked. Please wait before retrying.");
        return;
    }

    const otp = generateOTP();
    twoFAState.otpHash = await hashValue(otp);
    twoFAState.expiresAt = Date.now() + twoFAState.ttl;
    twoFAState.attempts = 0;

    safeLog("2FA Challenge Generated.");

    // Simulated delivery channel (replace with SMS/email API in real system)
    console.log("[2FA OTP - DEV MODE]:", otp);

    show2FAModal(onSuccess);
}

/* =========================================
   OTP GENERATION
========================================= */

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

/* =========================================
   VALIDATION
========================================= */

async function validateOTP(input, onSuccess) {

    if (Date.now() > twoFAState.expiresAt) {
        fail2FA("OTP expired.");
        return;
    }

    const hashedInput = await hashValue(input);

    if (hashedInput === twoFAState.otpHash) {

        safeLog("2FA SUCCESS");
        close2FAModal();
        onSuccess();

    } else {

        twoFAState.attempts++;

        if (twoFAState.attempts >= twoFAState.maxAttempts) {
            twoFAState.lockUntil = Date.now() + 60000;
            fail2FA("Too many failed attempts. Locked for 60 seconds.");
        } else {
            fail2FA("Invalid code. Try again.");
        }
    }
}

function fail2FA(message) {
    safeLog("2FA FAILURE");
    document.getElementById("twofaError").textContent = message;
}

function isLocked() {
    return twoFAState.lockUntil && Date.now() < twoFAState.lockUntil;
}

/* =========================================
   HASHING
========================================= */

async function hashValue(value) {
    const encoder = new TextEncoder();
    const data = encoder.encode(value);
    const buffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

/* =========================================
   UI MODAL
========================================= */

function show2FAModal(onSuccess) {

    if (document.getElementById("twofaModal")) return;

    const modal = document.createElement("div");
    modal.id = "twofaModal";
    modal.className = "twofa-overlay";

    modal.innerHTML = `
        <div class="twofa-box">
            <h3>Multi-Factor Authentication Required</h3>
            <p>Enter the 6-digit verification code sent to your secure device.</p>
            <input id="twofaInput" type="text" maxlength="6" placeholder="000000" />
            <div id="twofaError" class="twofa-error"></div>
            <button id="twofaVerifyBtn">Verify</button>
            <button id="twofaCancelBtn">Cancel</button>
            <div id="twofaTimer" class="twofa-timer"></div>
        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("twofaVerifyBtn")
        .addEventListener("click", () => {
            const input = document.getElementById("twofaInput").value.trim();
            validateOTP(input, onSuccess);
        });

    document.getElementById("twofaCancelBtn")
        .addEventListener("click", close2FAModal);

    startCountdown();
}

function close2FAModal() {
    const modal = document.getElementById("twofaModal");
    if (modal) modal.remove();
}

/* =========================================
   COUNTDOWN TIMER
========================================= */

function startCountdown() {

    const timerEl = document.getElementById("twofaTimer");

    const interval = setInterval(() => {

        const remaining = twoFAState.expiresAt - Date.now();

        if (remaining <= 0) {
            clearInterval(interval);
            timerEl.textContent = "Code expired.";
            return;
        }

        timerEl.textContent =
            "Code expires in " + Math.ceil(remaining / 1000) + "s";

    }, 1000);
}

/* =========================================
   PHASE PROTECTION
========================================= */

document.addEventListener("click", e => {

    if (!e.target || e.target.tagName !== "LI") return;

    const text = e.target.textContent;

    const protectedPhase = twoFAState.protectedPhases.find(p =>
        text.includes(p)
    );

    if (protectedPhase) {

        e.stopImmediatePropagation();

        trigger2FA(() => {
            if (protectedPhase.includes("14"))
                renderPhase14Details();
            if (protectedPhase.includes("16"))
                renderPhase16Details();
        });
    }
});

/* =========================================
   LOGGING
========================================= */

function safeLog(msg) {
    if (typeof logActivity === "function")
        logActivity("2FA: " + msg);
    else
        console.log("[2FA]", msg);
}
