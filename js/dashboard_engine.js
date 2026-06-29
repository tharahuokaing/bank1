/* =========================================================
   DASHBOARD ENGINE - BANKING MODULE
   Populates Account Balance & Transaction Feed
========================================================= */

const DashboardModule = {
    // Simulated Banking Data
    accountData: {
        balance: 15420.50,
        currency: "USD",
        transactions: [
            { desc: "Transfer to Savings", date: "2026-06-30", amount: -200.00, type: "debit" },
            { desc: "Salary Deposit", date: "2026-06-28", amount: 2500.00, type: "credit" },
            { desc: "Electricity Bill", date: "2026-06-25", amount: -45.20, type: "debit" }
        ]
    },

    init: function() {
        this.updateUI();
    },

    updateUI: function() {
        // 1. Set Balance
        const balanceEl = document.getElementById("accountBalance");
        if (balanceEl) {
            balanceEl.textContent = `${this.accountData.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })} ${this.accountData.currency}`;
        }

        // 2. Build Transaction Feed
        const txList = document.getElementById("transactionList");
        if (txList) {
            txList.innerHTML = this.accountData.transactions.map(tx => `
                <div class="tx-item" style="display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #eee;">
                    <div>
                        <div style="font-weight:bold;">${tx.desc}</div>
                        <div style="font-size:0.8rem; color:#666;">${tx.date}</div>
                    </div>
                    <div style="font-weight:bold; color:${tx.type === 'credit' ? '#10b981' : '#ef4444'}">
                        ${tx.type === 'credit' ? '+' : ''}${tx.amount.toFixed(2)}
                    </div>
                </div>
            `).join('');
        }
    }
};

// Initialize when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    DashboardModule.init();
});
