/**
 * Phase 17: Macroprudential Stress Testing
 * Simulates economic shocks to verify institutional resilience.
 */

function renderStressTestDetails() {
    const summaryBox = document.getElementById('summaryBox');
    
    // Prevent duplicate rendering
    if (document.getElementById('stressTestSection')) return;

    const stContainer = document.createElement('section');
    stContainer.id = "stressTestSection";
    stContainer.className = "phase-detail-box";
    stContainer.style.borderLeft = "4px solid #e74c3c"; // Crisis Red
    stContainer.style.padding = "20px";
    stContainer.style.background = "rgba(231, 76, 60, 0.05)";

    stContainer.innerHTML = `
        <h2 style="color: #e74c3c;">Phase 17: Macro-Stress Simulator</h2>
        <p>Test the bank's resilience against hypothetical economic disasters.</p>
        
        <div style="background: #111; padding: 15px; border: 1px solid #444; margin-bottom: 20px;">
            <label>Select Crisis Scenario:</label>
            <select id="scenarioSelect" style="width: 100%; padding: 10px; background: #000; color: #fff; border: 1px solid #e74c3c; margin-top: 5px;">
                <option value="baseline">Baseline (Normal Operations)</option>
                <option value="market_crash">Market Crash (-30% Asset Value)</option>
                <option value="bank_run">Liquidity Run (Mass Withdrawals)</option>
                <option value="hyper_inflation">Hyper-Inflation Shock</option>
            </select>
            <button id="runTestBtn" style="margin-top: 15px; width: 100%; background: #e74c3c; color: #fff; border: none; padding: 10px; cursor: pointer; font-weight: bold;">EXECUTE STRESS TEST</button>
        </div>

        <div id="testResultDisplay" style="display:none; padding: 15px; border: 1px solid #e74c3c; background: #000;">
            <h3 id="scenarioTitle" style="margin-top: 0; color: #e74c3c;"></h3>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <span>Projected CAR:</span>
                <span id="projectedCAR">--</span>
            </div>
            <div id="stabilityIndicator" style="text-align: center; padding: 10px; font-weight: bold; text-transform: uppercase;"></div>
        </div>
    `;

    summaryBox.appendChild(stContainer);

    document.getElementById('runTestBtn').addEventListener('click', executeStressScenario);
}

/**
 * Logic to calculate the impact of economic shocks
 */
function executeStressScenario() {
    const scenario = document.getElementById('scenarioSelect').value;
    const resultBox = document.getElementById('testResultDisplay');
    const title = document.getElementById('scenarioTitle');
    const carSpan = document.getElementById('projectedCAR');
    const indicator = document.getElementById('stabilityIndicator');

    resultBox.style.display = "block";
    indicator.textContent = "SIMULATING IMPACT...";
    indicator.style.background = "#333";

    setTimeout(() => {
        let carImpact = 15.5; // Start with a healthy 15.5% CAR
        let status = "STABLE";
        let color = "#2ecc71";

        switch (scenario) {
            case "market_crash":
                carImpact = 8.2; // Falls below 10.5% requirement
                status = "CAPITAL BREACH";
                color = "#e67e22";
                title.textContent = "Scenario: Market Crash";
                break;
            case "bank_run":
                carImpact = 4.1; // Critical failure
                status = "INSOLVENT / SYSTEMIC FAILURE";
                color = "#e74c3c";
                title.textContent = "Scenario: Liquidity Run";
                break;
            case "hyper_inflation":
                carImpact = 11.0; // Weakened but compliant
                status = "VULNERABLE";
                color = "#f1c40f";
                title.textContent = "Scenario: Hyper-Inflation";
                break;
            default:
                carImpact = 15.5;
                status = "OPTIMAL";
                color = "#2ecc71";
                title.textContent = "Scenario: Baseline";
        }

        carSpan.textContent = carImpact + "%";
        indicator.textContent = status;
        indicator.style.background = color;
        indicator.style.color = (color === "#f1c40f") ? "#000" : "#fff";

        if (typeof logActivity === "function") {
            logActivity(`Stress Test: Executed ${scenario}. Resulting CAR: ${carImpact}% (${status}).`);
        }
    }, 1500);
}

// Global listener to trigger this phase
document.addEventListener('click', (e) => {
    if (e.target && e.target.nodeName === "LI" && e.target.textContent.includes("Phase 17")) {
        renderStressTestDetails();
        document.getElementById('stressTestSection').scrollIntoView({ behavior: 'smooth' });
    }
});
