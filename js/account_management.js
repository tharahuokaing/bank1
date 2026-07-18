// =====================================================
// ACCOUNT MANAGEMENT SYSTEM - INTEGRATED
// =====================================================

let transactionCount = 4862; // Global counter

/**
 * REVISED MODULE HANDLER
 */
function showModule(module) {
    const content = document.getElementById("moduleContent");

    switch(module) {
        case "transfers":
            content.innerHTML = `
                <h3>Transfer Center</h3>
                <div class="transfer-form">
                    <input id="fromAcc" type="text" placeholder="From Account">
                    <input id="toAcc" type="text" placeholder="To Account">
                    <input id="amount" type="number" placeholder="Amount">
                    <button onclick="handleTransfer()">Transfer</button>
                    <button onclick="generateBakongQR()" class="secondary-btn">Generate Bakong QR</button>
                </div>
                
                <div id="qrContainer" style="margin-top: 20px; display: none; text-align: center;">
                    <p>Scan to Pay via Bakong:</p>
                    <div class="qr-placeholder" id="qrCode"></div>
                    <p id="txStatus" style="color: var(--accent-cyan); font-family: monospace;"></p>
                </div>
            `;
            break;
        // Add other cases as needed
    }
}

/**
 * Handles QR Generation Logic
 */
function generateBakongQR() {
    const qrContainer = document.getElementById("qrContainer");
    const qrCode = document.getElementById("qrCode");
    const txStatus = document.getElementById("txStatus");

    qrContainer.style.display = "block";
    qrCode.innerHTML = "<em>Connecting to Gateway...</em>";
    txStatus.textContent = "Negotiating secure session...";

    setTimeout(() => {
        qrCode.innerHTML = `
            <div class="qr-pattern">
                <div class="pixel"></div><div class="pixel"></div>
                <div class="pixel"></div><div class="pixel"></div>
            </div>
        `;
        txStatus.textContent = "TX-HASH: " + Math.random().toString(36).substr(2, 9).toUpperCase();
    }, 1200);
}

/**
 * Executes a secure transfer, records history, and updates UI
 */
function handleTransfer() {
    const fromUser = document.getElementById("fromAcc").value.trim().toLowerCase();
    const toUser = document.getElementById("toAcc").value.trim().toLowerCase();
    const amount = parseFloat(document.getElementById("amount").value);

    // 1. Validation
    if (!bankingAccounts[fromUser] || !bankingAccounts[toUser]) {
        alert("Error: One or both accounts not found.");
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert("Error: Please enter a valid transfer amount.");
        return;
    }
    if (bankingAccounts[fromUser].balance < amount) {
        alert("Error: Insufficient funds.");
        return;
    }

    // Trigger UI Updates
    refreshTotalDeposits();
    incrementTransactionCount();

    // NEW: Use the Toast instead of Alert
    showToast(`Success: You received a transfer of $${amount.toLocaleString()}!`);
}

    // After updating balances:
    bankingAccounts[fromUser].balance -= amount;
    bankingAccounts[toUser].balance += amount;

    // Trigger UI Updates
    refreshTotalDeposits();
    incrementTransactionCount();

    // NEW: Trigger Notification for the recipient
    notifyRecipient(toUser, amount);

    alert(`Transfer of $${amount} successful!`);
}

    // 2. Perform Transaction
    bankingAccounts[fromUser].balance -= amount;
    bankingAccounts[toUser].balance += amount;

    // 3. Record History
    const timestamp = new Date().toISOString();
    bankingAccounts[fromUser].transactions.push({
        type: "DEBIT",
        amount: -amount,
        timestamp: timestamp,
        description: `Transfer to ${toUser}`
    });
    bankingAccounts[toUser].transactions.push({
        type: "CREDIT",
        amount: amount,
        timestamp: timestamp,
        description: `Transfer from ${fromUser}`
    });

    // 4. Trigger UI Updates
    refreshTotalDeposits();
    incrementTransactionCount();

    console.log(`Transfer successful: $${amount} from ${fromUser} to ${toUser}`);
    alert(`Transfer of $${amount} successful!`);
}

/**
 * UI Sync Functions
 */
function refreshTotalDeposits() {
    let total = 0;
    for (const username in bankingAccounts) {
        total += bankingAccounts[username].balance;
    }
    const depositElement = document.getElementById("depositTotal");
    if (depositElement) depositElement.textContent = "$" + total.toLocaleString();
}

function incrementTransactionCount() {
    transactionCount++;
    const txElement = document.getElementById("txCount");
    if (txElement) txElement.textContent = transactionCount.toLocaleString();
}

/**
 * Triggers a visual alert for the recipient of a transfer.
 * @param {string} username - The recipient's username.
 * @param {number} amount - The amount received.
 */
function notifyRecipient(username, amount) {
    // In a real system, you would check if this user is currently active/logged in
    console.log(`[NOTIFICATION]: Sending alert to ${username}...`);
    
    // Simple visual alert for the current session
    alert(`System Alert for ${username.toUpperCase()}:\nYou have just received $${amount.toLocaleString()}!`);
}

/**
 * Creates a modern non-intrusive toast notification.
 */
function showToast(message) {
    const container = document.getElementById("toastContainer") || createToastContainer();
    const toast = document.createElement("div");
    
    toast.className = "toast";
    toast.textContent = message;
    
    container.appendChild(toast);
    
    // Remove toast after 5 seconds
    setTimeout(() => {
        toast.remove();
    }, 5000);
}

function createToastContainer() {
    const div = document.createElement("div");
    div.id = "toastContainer";
    document.body.appendChild(div);
    return div;
}
