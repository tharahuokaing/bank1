/**
 * Phase 21: Final Charter Approval & Licensing
 * This script validates the completion of the banking core 
 * and issues the final operational license.
 */

function renderPhase21Details() {
    const summaryBox = document.getElementById('summaryBox');
    
    // Prevent duplicate rendering
    if (document.getElementById('phase21Section')) return;

    const p21Container = document.createElement('section');
    p21Container.id = "phase21Section";
    p21Container.className = "phase-detail-box";
    
    // Styling for a formal, "Gold Standard" appearance
    p21Container.style.border = "4px double #d4af37"; // Metallic Gold
    p21Container.style.padding = "30px";
    p21Container.style.textAlign = "center";
    p21Container.style.marginTop = "20px";
    p21Container.style.background = "rgba(212, 175, 55, 0.05)";

    p21Container.innerHTML = `
        <h2 style="color: #d4af37; text-transform: uppercase; letter-spacing: 2px;">Institutional Licensing Ceremony</h2>
        <p style="color: #ccc;">Finalizing the Charter for HUOKAING THARA Banking System.</p>
        
        <!-- Audit Checklist Display -->
        <div id="auditChecklist" style="text-align: left; max-width: 400px; margin: 20px auto; background: #111; padding: 15px; border: 1px solid #333; font-family: monospace;">
            <div id="check-tech" style="margin-bottom: 10px;">> Digital Core Hardened... <span style="float:right;">⏳</span></div>
            <div id="check-risk" style="margin-bottom: 10px;">> Risk Framework Validated... <span style="float:right;">⏳</span></div>
            <div id="check-legal" style="margin-bottom: 10px;">> NBC Compliance Verified... <span style="float:right;">⏳</span></div>
        </div>

        <button id="requestLicenseBtn" style="padding: 15px 30px; background: #d4af37; color: #000; font-weight: bold; border: none; cursor: pointer; border-radius: 4px;">
            REQUEST FINAL BANKING LICENSE
        </button>

        <!-- The Hidden License Seal -->
        <div id="licenseSeal" style="display:none; margin-top: 30px; border: 2px solid #d4af37; padding: 20px; position: relative; background: #fff; color: #000; box-shadow: 0 0 20px rgba(212,175,55,0.5);">
            <h1 style="font-family: serif; margin: 0; color: #000;">OFFICIAL BANKING LICENSE</h1>
            <p style="font-family: serif; border-top: 1px solid #000; padding-top: 10px; font-weight: bold;">GRANTED BY THE AUTHORITY OF THE CENTRAL GATEWAY</p>
            <div style="font-size: 4rem; opacity: 0.1; position: absolute; top: 20%; left: 25%; transform: rotate(-20deg); pointer-events: none;">APPROVED</div>
            <p><strong>Institution:</strong> HUOKAING THARA Banking System</p>
            <p><strong>License ID:</strong> NBC-2026-${Math.floor(Math.random()*899999 + 100000)}</p>
            <p style="font-size: 0.8rem; margin-top: 20px;">Issued on: ${new Date().toLocaleDateString()}</p>
            <button onclick="window.print()" style="margin-top: 10px; padding: 5px 10px; cursor: pointer; font-size: 0.7rem;">Print Certificate</button>
        </div>
    `;

    summaryBox.appendChild(p21Container);

    // Event Listener for the Audit Button
    document.getElementById('requestLicenseBtn').addEventListener('click', runFinalAudit);
}

/**
 * Simulates the audit process across three categories
 */
function runFinalAudit() {
    const btn = document.getElementById('requestLicenseBtn');
    const seal = document.getElementById('licenseSeal');
    const checklist = ["tech", "risk", "legal"];
    
    btn.disabled = true;
    btn.textContent = "COMMENCING FINAL AUDIT...";

    // Recursive-style timeout to simulate step-by-step verification
    checklist.forEach((item, index) => {
        setTimeout(() => {
            const row = document.getElementById(`check-${item}`);
            row.style.color = "#0f0"; // Change text to green
            row.querySelector('span').textContent = "✓"; // Replace hourglass with checkmark
            
            // If this is the last item, reveal the license
            if (index === checklist.length - 1) {
                btn.style.display = "none";
                seal.style.display = "block";
                
                // Final system log (assuming logActivity exists in your main script)
                if (typeof logActivity === "function") {
                    logActivity("CRITICAL: Final Banking Charter issued. Operations are now LIVE.");
                }
                
                // Sentient AI response (assuming refreshAiMood exists)
                if (typeof refreshAiMood === "function") {
                    document.getElementById('aiStatusBubble').textContent = "Congratulations. Our institution is now officially recognized. I am standing by for live transactions.";
                }
            }
        }, (index + 1) * 1200); // 1.2 second delay between each check
    });
}

// Global listener to trigger this phase when selected in the list
document.addEventListener('click', (e) => {
    if (e.target && e.target.nodeName === "LI" && e.target.textContent.includes("Phase 21")) {
        renderPhase21Details();
        document.getElementById('phase21Section').scrollIntoView({ behavior: 'smooth' });
    }
});
