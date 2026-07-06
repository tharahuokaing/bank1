/**
 * Phase 9: ISO 20022 & Global Messaging Integration
 * Realistic financial messaging lifecycle simulator
 */

const phase9Data = {
    id: "phase9",
    title: "Phase 9: ISO 20022 & Global Messaging",
    storageKey: "phase9_state",
    isProcessing: false,
    lastMessageId: null
};

/* =====================================================
   RENDER
===================================================== */

function renderPhase9Details() {

    const summaryBox = document.getElementById("summaryBox");
    if (!summaryBox) return;

    if (document.getElementById("phase9Section")) {
        scrollToPhase9();
        return;
    }

    const container = document.createElement("section");
    container.id = "phase9Section";
    container.className = "phase-detail-box phase9-theme";

    container.innerHTML = `
        <header class="phase-header">
            <h2>${phase9Data.title}</h2>
            <p>Simulating ISO 20022 pacs.008 message transmission.</p>
        </header>

        <div class="iso-input-box">
            <label>Payment Amount (USD)</label>
            <input type="number" id="isoAmount" value="1000" min="1">
            <button id="generateIsoBtn">Generate & Transmit</button>
        </div>

        <div class="iso-progress">
            <div id="isoBar" class="iso-bar"></div>
        </div>

        <div id="isoStatus" class="iso-status">
            Status: Awaiting instruction
        </div>

        <div id="isoOutput" class="iso-output hidden">
            <h3>Generated XML (pacs.008)</h3>
            <pre id="xmlDisplay"></pre>
        </div>
    `;

    summaryBox.appendChild(container);

    document
        .getElementById("generateIsoBtn")
        .addEventListener("click", generateIsoMessage);

    restorePhase9State();
    scrollToPhase9();
}

/* =====================================================
   MESSAGE ENGINE
===================================================== */

function generateIsoMessage() {

    if (phase9Data.isProcessing) return;

    const amountInput = document.getElementById("isoAmount");
    const amount = parseFloat(amountInput.value);

    if (!amount || amount <= 0) {
        updateStatus("Invalid amount entered.", "status-red");
        return;
    }

    phase9Data.isProcessing = true;

    const messageId = `KHMER-BANK-${Date.now()}`;
    phase9Data.lastMessageId = messageId;

    const xmlContent = buildIsoXML(messageId, amount);

    document.getElementById("xmlDisplay").textContent = xmlContent;
    document.getElementById("isoOutput").classList.remove("hidden");

    simulateTransmission(messageId, amount);
}

/* =====================================================
   BUILD XML
===================================================== */

function buildIsoXML(msgId, amount) {

    return `
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pacs.008.001.07">
  <FIToFICstmrCdtTrf>
    <GrpHdr>
      <MsgId>${msgId}</MsgId>
      <CreDtTm>${new Date().toISOString()}</CreDtTm>
    </GrpHdr>
    <CdtTrfTxInf>
      <IntrBkSttlmAmt Ccy="USD">${amount}</IntrBkSttlmAmt>
      <InstgAgt>
        <FinInstnId>
          <BICFI>KBCBKHPP</BICFI>
        </FinInstnId>
      </InstgAgt>
    </CdtTrfTxInf>
  </FIToFICstmrCdtTrf>
</Document>`.trim();
}

/* =====================================================
   TRANSMISSION SIMULATION
===================================================== */

function simulateTransmission(messageId, amount) {

    let progress = 0;

    updateStatus("Validating schema...", "status-yellow");

    const interval = setInterval(() => {

        progress += 20;
        updateProgress(progress);

        if (progress === 40)
            updateStatus("Transmitting to SWIFT MX Network...", "status-yellow");

        if (progress === 80)
            updateStatus("Awaiting ACK from correspondent bank...", "status-yellow");

        if (progress >= 100) {
            clearInterval(interval);
            finalizeTransmission(messageId, amount);
        }

    }, 800);
}

function finalizeTransmission(messageId, amount) {

    const success = Math.random() > 0.1; // 90% success rate

    if (success) {
        updateStatus("✓ Message Acknowledged (ACK Received)", "status-green");
        safeLog(`Phase 9: ISO message ${messageId} transmitted successfully.`);
    } else {
        updateStatus("✗ NACK Received – Transmission Failed", "status-red");
        safeLog(`Phase 9: ISO message ${messageId} failed transmission.`);
    }

    phase9Data.isProcessing = false;
    savePhase9State();
}

/* =====================================================
   HELPERS
===================================================== */

function updateProgress(percent) {
    const bar = document.getElementById("isoBar");
    if (bar) bar.style.width = percent + "%";
}

function updateStatus(text, className) {
    const status = document.getElementById("isoStatus");
    if (!status) return;
    status.textContent = "Status: " + text;
    status.className = "iso-status " + className;
}

function savePhase9State() {
    localStorage.setItem(
        phase9Data.storageKey,
        JSON.stringify(phase9Data)
    );
}

function restorePhase9State() {
    const saved = localStorage.getItem(phase9Data.storageKey);
    if (!saved) return;
    try {
        Object.assign(phase9Data, JSON.parse(saved));
    } catch (err) {
        console.warn("Phase9 restore error:", err);
    }
}

function scrollToPhase9() {
    const section = document.getElementById("phase9Section");
    if (section)
        section.scrollIntoView({ behavior: "smooth", block: "start" });
}

function safeLog(message) {
    if (typeof logActivity === "function") {
        logActivity(message);
    } else {
        console.log("[Phase9]", message);
    }
}

/* =====================================================
   GLOBAL LISTENER
===================================================== */

document.addEventListener("click", (e) => {
    if (!e.target || e.target.tagName !== "LI") return;
    if ((e.target.textContent || "").startsWith("Phase 9")) {
        renderPhase9Details();
    }
});