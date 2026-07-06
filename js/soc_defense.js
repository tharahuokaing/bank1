/**
 * Phase 20: Security Operations Center (SOC) Defense
 * Simulates real-time threat detection and automated network countermeasures.
 */

const attackVectors = [
    "DDoS Brute Force", 
    "SQL Injection Attempt", 
    "Cross-Site Scripting (XSS)", 
    "Unauthorized API Access"
];

function renderPhase20Details() {
    const summaryBox = document.getElementById('summaryBox');
    
    // Prevent duplicate rendering
    if (document.getElementById('phase20Section')) return;

    const p20Container = document.createElement('section');
    p20Container.id = "phase20Section";
    p20Container.className = "phase-detail-box";
    p20Container.style.borderLeft = "4px solid #00ff00"; // Terminal Green
    p20Container.style.padding = "20px";
    p20Container.style.background = "rgba(0, 255, 0, 0.05)";

    p20Container.innerHTML = `
        <h2 style="color: #00ff00;">Phase 20: SOC Threat Monitor</h2>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
            <p>Active Perimeter Surveillance Enabled.</p>
            <div id="firewallStatus" style="padding: 5px 10px; border: 1px solid #00ff00; color: #00ff00; font-size: 0.8rem; font-family: monospace;">FW_STATUS: ACTIVE</div>
        </div>
        
        <!-- Scrolling Terminal Feed -->
        <div id="threatMonitor" style="background: #000; color: #00ff00; font-family: 'Courier New', monospace; height: 160px; overflow-y: hidden; padding: 10px; border: 1px solid #333; font-size: 0.8rem; line-height: 1.4;">
            <div id="threatFeed">> SOC INITIALIZED. WAITING FOR TRAFFIC...</div>
        </div>

        <div style="margin-top: 15px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <button id="startDefenseBtn" style="background: transparent; border: 1px solid #00ff00; color: #00ff00; cursor: pointer; padding: 10px;">START LIVE MONITOR</button>
            <button id="isolateCoreBtn" style="background: transparent; border: 1px solid #ff4444; color: #ff4444; cursor: pointer; padding: 10px;">TRIGGER AIR-GAP</button>
        </div>
    `;

    summaryBox.appendChild(p20Container);

    document.getElementById('startDefenseBtn').addEventListener('click', startThreatSimulation);
    document.getElementById('isolateCoreBtn').addEventListener('click', triggerAirGap);
}

/**
 * Starts the automated loop for simulated attacks
 */
function startThreatSimulation() {
    const feed = document.getElementById('threatFeed');
    const btn = document.getElementById('startDefenseBtn');
    
    btn.disabled = true;
    btn.textContent = "SURVEILLANCE LIVE";
    btn.style.borderColor = "#666";
    btn.style.color = "#666";

    // Update the feed every 2 seconds
    setInterval(() => {
        const attack = attackVectors[Math.floor(Math.random() * attackVectors.length)];
        const ip = `10.0.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`;
        
        const logEntry = document.createElement('div');
        logEntry.style.marginBottom = "5px";
        logEntry.innerHTML = `<span style="color: #ff4444;">[ALERT]</span> ${attack} from ${ip} ... <span style="color: #00ff00;">[MITIGATED]</span>`;
        
        feed.prepend(logEntry);
        
        // Keep feed performance high by removing old lines
        if (feed.childNodes.length > 10) {
            feed.removeChild(feed.lastChild);
        }
    }, 2000);

    if (typeof logActivity === "function") {
        logActivity("Phase 20: Real-time SOC monitoring activated.");
    }
}

/**
 * Simulates a critical system isolation
 */
function triggerAirGap() {
    const status = document.getElementById('firewallStatus');
    status.textContent = "FW_STATUS: DISCONNECTED (AIR-GAP)";
    status.style.color = "#ff4444";
    status.style.borderColor = "#ff4444";
    
    alert("CRITICAL SECURITY PROTOCOL: The banking core has been physically isolated from the external network.");
    
    if (typeof logActivity === "function") {
        logActivity("EMERGENCY: Manual Air-Gap isolation triggered by Administrator.");
    }
}

// Global listener to trigger this phase from the master list
document.addEventListener('click', (e) => {
    if (e.target && e.target.nodeName === "LI" && e.target.textContent.includes("Phase 20")) {
        renderPhase20Details();
        document.getElementById('phase20Section').scrollIntoView({ behavior: 'smooth' });
    }
});
