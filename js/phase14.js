/**
 * Phase 14: Capital Adequacy Ratio (Basel IV)
 * Calculates the bank's regulatory capital buffer against risk-weighted assets.
 */

function renderPhase14Details() {
    const summaryBox = document.getElementById('summaryBox');
    
    // Prevent duplicate rendering
    if (document.getElementById('phase14Section')) return;

    const p14Container = document.createElement('section');
    p14Container.id = "phase14Section";
    p14Container.className = "phase-detail-box";
    p14Container.style.borderLeft = "4px solid #9b59b6"; // Regulatory Purple
    p14Container.style.padding = "20px";
    p14Container.style.background = "rgba(155, 89, 182, 0.05)";

    p14Container.innerHTML = `
        <h2 style="color: #9b59b6;">Phase 14: Basel IV Capital Adequacy</h2>
        <p>Calculating the safety buffer to ensure institutional solvency during market stress.</p>
        
        <div style="background: #111; padding: 15px; border: 1px solid #444; margin-bottom: 15px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div>
                <label style="font-size: 0.8rem;">Tier 1 Capital (m$):</label>
                <input type="number" id="tier1Cap" value="150" style="width: 100%; background: #000; color: #fff; border: 1px solid #9b59b6;">
            </div>
            <div>
                <label style="font-size: 0.8rem;">Total Loans (m$):</label>
                <input type="number" id="totalLoans" value="1000" style="width: 100%; background: #000; color: #fff; border: 1px solid #9b59b6;">
            </div>
            <button id="calcCarBtn" style="grid-column: span 2; margin-top: 10px; background: #9b59b6; color: #fff; border: none; padding: 10px; cursor: pointer; font-weight: bold;">CALCULATE CAR %</button>
        </div>

        <div id="carResultDisplay" style="display:none; padding: 15px; border: 1px solid #9b59b6; background: #000; text-align: center;">
            <h3 style="margin-top: 0;">Ratio Result: <span id="carValue">--</span></h3>
            <div id="carStatusLabel" style="padding: 10px; font-weight: bold; border-radius: 4px;"></div>
            <p id="carAdvice" style="font-size: 0.85rem; margin-top: 10px; color: #bbb;"></p>
        </div>
    `;

    summaryBox.appendChild(p14Container);

    document.getElementById('calcCarBtn').addEventListener('click', calculateBaselIV);
}

/**
 * Logic to calculate the Capital Adequacy Ratio
 */
function calculateBaselIV() {
    const tier1 = parseFloat(document.getElementById('tier1Cap').value);
    const loans = parseFloat(document.getElementById('totalLoans').value);
    const resultBox = document.getElementById('carResultDisplay');
    const carSpan = document.getElementById('carValue');
    const statusLabel = document.getElementById('carStatusLabel');
    const advice = document.getElementById('carAdvice');

    // Assumption: Risk-Weighted Assets (RWA) is 80% of total loans for this simulation
    const rwa = loans * 0.8;
    const car = (tier1 / rwa) * 100;

    resultBox.style.display = "block";
    carSpan.textContent = car.toFixed(2) + "%";

    if (car >= 10.5) {
        statusLabel.textContent = "COMPLIANT";
        statusLabel.style.background = "#27ae60";
        statusLabel.style.color = "#fff";
        advice.textContent = "The bank maintains a healthy capital buffer above Basel IV requirements.";
        if (typeof logActivity === "function") logActivity(`Phase 14: CAR calculated at ${car.toFixed(2)}% (PASS).`);
    } else {
        statusLabel.textContent = "NON-COMPLIANT";
        statusLabel.style.background = "#c0392b";
        statusLabel.style.color = "#fff";
        advice.textContent = "CRITICAL: Capital levels are below regulatory minimums. Increase Tier 1 capital immediately.";
        if (typeof logActivity === "function") logActivity(`WARNING: Bank failed Basel IV check with ${car.toFixed(2)}% CAR.`);
    }
}

// Global listener for phase list
document.addEventListener('click', (e) => {
    if (e.target && e.target.nodeName === "LI" && e.target.textContent.includes("Phase 14")) {
        renderPhase14Details();
        document.getElementById('phase14Section').scrollIntoView({ behavior: 'smooth' });
    }
});
