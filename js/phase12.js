/**
 * Phase 12: AI Guardian - Fraud Detection Engine
 * This module simulates a neural network monitoring transaction integrity.
 */

function renderPhase12Details() {
    const summaryBox = document.getElementById('summaryBox');
    
    // Prevent duplicate rendering
    if (document.getElementById('phase12Section')) return;

    const p12Container = document.createElement('section');
    p12Container.id = "phase12Section";
    p12Container.className = "phase-detail-box";
    p12Container.style.borderLeft = "4px solid #f1c40f"; // Warning Yellow
    p12Container.style.padding = "20px";
    p12Container.style.background = "rgba(241, 196, 15, 0.05)";

    p12Container.innerHTML = `
        <h2 style="color: #f1c40f;">Phase 12: AI Guardian (Anti-Fraud)</h2>
        <p>Real-time neural monitoring of transaction patterns and behavioral biometrics.</p>
        
        <div style="background: #111; padding: 15px; border: 1px solid #444; margin-bottom: 15px;">
            <label>Simulate Transaction Amount ($):</label>
            <input type="number" id="txAmount" value="500" style="width: 100%; background: #000; color: #fff; border: 1px solid #f1c40f; padding: 5px;">
            <button id="analyzeTxBtn" style="margin-top: 10px; width: 100%; background: #f1c40f; color: #000; font-weight: bold; cursor: pointer;">Run AI Analysis</button>
        </div>

        <div id="aiAnalysisResult" style="display:none; padding: 15px; border: 1px solid #f1c40f; background: #000;">
            <h3 style="margin-top: 0; color: #f1c40f;">Neural Assessment:</h3>
            <p>Risk Score: <span id="riskScore">0%</span></p>
            <p>Status: <span id="aiStatusText">CLEARED</span></p>
            <div id="aiAction" style="padding: 10px; font-weight: bold; text-align: center;"></div>
        </div>
    `;

    summaryBox.appendChild(p12Container);

    document.getElementById('analyzeTxBtn').addEventListener('click', runAIAnalysis);
}

/**
 * Logic to calculate simulated fraud probability
 */
function runAIAnalysis() {
    const amount = parseFloat(document.getElementById('txAmount').value);
    const resultBox = document.getElementById('aiAnalysisResult');
    const scoreSpan = document.getElementById('riskScore');
    const statusSpan = document.getElementById('aiStatusText');
    const actionDiv = document.getElementById('aiAction');

    resultBox.style.display = "block";
    actionDiv.textContent = "Analyzing patterns...";
    actionDiv.style.background = "transparent";

    setTimeout(() => {
        // Simple logic: higher amounts and random factors increase risk
        let baseRisk = amount > 5000 ? 70 : 5;
        let randomFactor = Math.floor(Math.random() * 30);
        let totalRisk = baseRisk + randomFactor;

        scoreSpan.textContent = totalRisk + "%";

        if (totalRisk < 50) {
            statusSpan.textContent = "CLEARED";
            statusSpan.style.color = "#2ecc71";
            actionDiv.textContent = "TRANSACTION AUTHORIZED";
            actionDiv.style.color = "#2ecc71";
            logActivity(`AI Guardian: Transaction of $${amount} approved (Risk: ${totalRisk}%).`);
        } else if (totalRisk < 85) {
            statusSpan.textContent = "SUSPICIOUS";
            statusSpan.style.color = "#f39c12";
            actionDiv.textContent = "FLAGGED FOR HUMAN REVIEW";
            actionDiv.style.color = "#f39c12";
            logActivity(`AI Guardian: Transaction of $${amount} flagged for review.`);
        } else {
            statusSpan.textContent = "THREAT DETECTED";
            statusSpan.style.color = "#e74c3c";
            actionDiv.textContent = "TRANSACTION BLOCKED - ACCOUNT FROZEN";
            actionDiv.style.background = "#e74c3c";
            actionDiv.style.color = "#fff";
            logActivity(`CRITICAL: AI Guardian blocked $${amount} fraudulent attempt.`);
        }
    }, 1000);
}

// Event listener for phase selection
document.addEventListener('click', (e) => {
    if (e.target && e.target.nodeName === "LI" && e.target.textContent.includes("Phase 12")) {
        renderPhase12Details();
        document.getElementById('phase12Section').scrollIntoView({ behavior: 'smooth' });
    }
});
