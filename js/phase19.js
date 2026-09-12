/**
 * Phase 19: Bakong CBDC & DLT Settlement Engine
 * Wallet Ledger | FX Conversion | KHQR | Settlement Finality
 */

const phase19State = {
    storageKey: "phase19_state",
    walletUSD: 0,
    walletKHR: 0,
    totalMinted: 0,
    nodeStatus: "SYNCED"
};

const FX_RATE = 4100; // USD → KHR simulated rate

function renderPhase19Details() {

    const summaryBox = document.getElementById("summaryBox");
    if (!summaryBox) return;

    if (document.getElementById("phase19Section")) {
        scrollToPhase19();
        return;
    }

    const container = document.createElement("section");
    container.id = "phase19Section";
    container.className = "phase-detail-box phase19-theme";

    container.innerHTML = `
        <header class="phase-header">
            <h2>Phase 19: Bakong CBDC & KHQR Integration</h2>
            <p>DLT Settlement | Digital Wallet | Interoperable QR</p>
        </header>

        <div class="wallet-panel">
            <div><strong>Wallet USD:</strong> <span id="walletUSD">0</span></div>
            <div><strong>Wallet KHR:</strong> <span id="walletKHR">0</span></div>
            <div><strong>Node Status:</strong> <span id="nodeStatus"></span></div>
        </div>

        <div class="grid-2">
            <div class="card">
                <label>Mint USD into Bakong:</label>
                <input type="number" id="tokenAmount" value="100">
                <button id="mintBtn">Mint CBDC</button>
                <button id="burnBtn">Burn CBDC</button>
                <button id="convertBtn">Convert USD → KHR</button>
            </div>

            <div class="card">
                <label>Generate KHQR:</label>
                <div id="qrContainer" class="qr-box">NO QR GENERATED</div>
                <button id="genQRBtn">Generate KHQR</button>
            </div>
        </div>

        <div id="blockchainLog" class="blockchain-log">
            > Bakong Node Initializing...
        </div>
    `;

    summaryBox.appendChild(container);

    document.getElementById("mintBtn").addEventListener("click", mintCBDC);
    document.getElementById("burnBtn").addEventListener("click", burnCBDC);
    document.getElementById("convertBtn").addEventListener("click", convertFX);
    document.getElementById("genQRBtn").addEventListener("click", generateKHQR);

    restorePhase19State();
    updateUI();
    simulateNodeHealth();
    scrollToPhase19();
}

/* =========================================
   CORE FUNCTIONS
========================================= */

function mintCBDC() {

    const amt = parseFloat(document.getElementById("tokenAmount").value);
    if (!amt || amt <= 0) return;

    phase19State.walletUSD += amt;
    phase19State.totalMinted += amt;

    const txHash = generateHash();
    logBlock(`Minted $${amt} CBDC | TX ${txHash}`);

    savePhase19State();
    updateUI();
}

function burnCBDC() {

    const amt = parseFloat(document.getElementById("tokenAmount").value);
    if (!amt || amt <= 0 || amt > phase19State.walletUSD) {
        logBlock("Burn rejected: Insufficient balance.");
        return;
    }

    phase19State.walletUSD -= amt;

    const txHash = generateHash();
    logBlock(`Burned $${amt} CBDC | TX ${txHash}`);

    savePhase19State();
    updateUI();
}

function convertFX() {

    if (phase19State.walletUSD <= 0) {
        logBlock("Conversion failed: No USD balance.");
        return;
    }

    const converted = phase19State.walletUSD * FX_RATE;

    phase19State.walletKHR += converted;
    phase19State.walletUSD = 0;

    logBlock(`Converted to ${converted.toLocaleString()} KHR`);

    savePhase19State();
    updateUI();
}

function generateKHQR() {

    const payload = `BAKONG|KHMERBANK|${Date.now()}|${phase19State.walletKHR}`;

    const qrContainer = document.getElementById("qrContainer");

    qrContainer.textContent = "KHQR ID: " + payload.slice(0, 18) + "...";

    logBlock("KHQR generated for settlement.");

    safeLog("Phase 19: KHQR issued.");
}

/* =========================================
   NODE HEALTH SIMULATION
========================================= */

function simulateNodeHealth() {

    const statuses = ["SYNCED", "VALIDATING", "BLOCK PROPAGATION"];
    phase19State.nodeStatus =
        statuses[Math.floor(Math.random() * statuses.length)];

    updateUI();
}

/* =========================================
   UTILITIES
========================================= */

function updateUI() {

    document.getElementById("walletUSD").textContent =
        "$" + phase19State.walletUSD.toFixed(2);

    document.getElementById("walletKHR").textContent =
        phase19State.walletKHR.toLocaleString();

    document.getElementById("nodeStatus").textContent =
        phase19State.nodeStatus;
}

function logBlock(message) {

    const log = document.getElementById("blockchainLog");

    const line = document.createElement("div");
    line.textContent =
        `> [${new Date().toLocaleTimeString()}] ${message}`;

    log.appendChild(line);
    log.scrollTop = log.scrollHeight;
}

function generateHash() {
    return "0x" + Math.random().toString(16).slice(2, 12);
}

function savePhase19State() {
    localStorage.setItem(
        phase19State.storageKey,
        JSON.stringify(phase19State)
    );
}

function restorePhase19State() {
    const saved = localStorage.getItem(phase19State.storageKey);
    if (!saved) return;
    try {
        Object.assign(phase19State, JSON.parse(saved));
    } catch {}
}

function scrollToPhase19() {
    const section = document.getElementById("phase19Section");
    if (section)
        section.scrollIntoView({ behavior: "smooth" });
}

function safeLog(message) {
    if (typeof logActivity === "function")
        logActivity(message);
    else
        console.log("[Phase19]", message);
}

/* =========================================
   GLOBAL LISTENER
========================================= */

document.addEventListener("click", e => {
    if (!e.target || e.target.tagName !== "LI") return;
    if ((e.target.textContent || "").startsWith("Phase 19"))
        renderPhase19Details();
});