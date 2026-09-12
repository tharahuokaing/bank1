/**
 * Phase 19: Bakong Blockchain Integration
 * Simulates a peer-to-peer settlement gateway using DLT (Distributed Ledger Technology).
 */

function renderPhase19Details() {
    const summaryBox = document.getElementById('summaryBox');
    
    // Prevent duplicate rendering
    if (document.getElementById('phase19Section')) return;

    const p19Container = document.createElement('section');
    p19Container.id = "phase19Section";
    p19Container.className = "phase-detail-box";
    p19Container.style.borderLeft = "4px solid #e67e22"; // Bakong Orange
    p19Container.style.padding = "20px";
    p19Container.style.background = "rgba(230, 126, 34, 0.05)";

    p19Container.innerHTML = `
        <h2 style="color: #e67e22;">Phase 19: Bakong Gateway</h2>
        <p>Blockchain-based settlement layer for real-time KHR/USD transfers.</p>
        
        <div style="background: #111; padding: 15px; border: 1px solid #444; margin-bottom: 15px;">
            <label>Recipient Bakong ID:</label>
            <input type="text" id="bakongId" placeholder="user@khmerbank" style="width: 100%; background: #000; color: #fff; border: 1px solid #e67e22; padding: 8px; margin-bottom: 10px;">
            
            <label>Amount (USD):</label>
            <input type="number" id="bakongAmount" value="10.00" style="width: 100%; background: #000; color: #fff; border: 1px solid #e67e22; padding: 8px;">
            
            <button id="sendBakongBtn" style="margin-top: 15px; width: 100%; background: #e67e22; color: #fff; font-weight: bold; border: none; padding: 10px; cursor: pointer;">INITIATE DLT TRANSFER</button>
        </div>

        <div id="bakongResult" style="display:none; padding: 15px; border: 1px solid #e67e22; background: #000; font-family: monospace; font-size: 0.85rem;">
            <div id="bakongStatus" style="color: #e67e22; font-weight: bold; margin-bottom: 5px;">PROCESING...</div>
            <div id="bakongHash" style="word-break: break-all; color: #888;"></div>
        </div>
    `;

    summaryBox.appendChild(p19Container);

    document.getElementById('sendBakongBtn').addEventListener('click', processBakongTransfer);
}

/**
 * Simulates the blockchain validation and settlement process
 */
function processBakongTransfer() {
    const recipient = document.getElementById('bakongId').value;
    const amount = document.getElementById('bakongAmount').value;
    const resultBox = document.getElementById('bakongResult');
    const statusText = document.getElementById('bakongStatus');
    const hashDiv = document.getElementById('bakongHash');

    if (!recipient) {
        alert("Please enter a valid Bakong ID.");
        return;
    }

    resultBox.style.display = "block";
    statusText.textContent = "BROADCASTING TO HYPERLEDGER...";
    hashDiv.textContent = "";

    setTimeout(() => {
        statusText.textContent = "SETTLEMENT FINALIZED (SUCCESS)";
        statusText.style.color = "#2ecc71";
        
        // Generate a simulated transaction hash
        const mockHash = "0x" + Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join('');
        hashDiv.innerHTML = `<strong>TX_HASH:</strong> ${mockHash}<br><strong>ID:</strong> ${recipient}<br><strong>AMT:</strong> $${amount}`;
        
        if (typeof logActivity === "function") {
            logActivity(`Bakong: Successfully transferred $${amount} to ${recipient}.`);
        }
    }, 2000);
}

// Global listener to trigger this phase from your phase list
document.addEventListener('click', (e) => {
    if (e.target && e.target.nodeName === "LI" && e.target.textContent.includes("Phase 19")) {
        renderPhase19Details();
        document.getElementById('phase19Section').scrollIntoView({ behavior: 'smooth' });
    }
});
