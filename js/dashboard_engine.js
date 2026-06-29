/* =========================================================
   DASHBOARD ENGINE - REAL-TIME UPDATES
   Uses a proxy to watch for data changes and auto-render
========================================================= */

const DashboardModule = {
    // Internal data state
    _data: {
        balance: 15420.50,
        currency: "USD",
        transactions: [
            { desc: "Transfer to Savings", date: "2026-06-30", amount: -200.00, type: "debit" },
            { desc: "Salary Deposit", date: "2026-06-28", amount: 2500.00, type: "credit" }
        ]
    },

    init: function() {
        // Create a Proxy to detect changes to _data automatically
        this.data = new Proxy(this._data, {
            set: (target, property, value) => {
                target[property] = value;
                this.updateUI(); // Auto-render UI when data changes
                return true;
            }
        });

        this.updateUI();
        // Optional: Start a polling interval to check for external updates every 5 seconds
        setInterval(() => this.pollForUpdates(), 5000);
    },

    updateUI: function() {
        const balanceEl = document.getElementById("accountBalance");
        const txList = document.getElementById("transactionList");

        if (balanceEl) {
            balanceEl.textContent = `${this.data.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })} ${this.data.currency}`;
        }

        if (txList) {
            txList.innerHTML = this.data.transactions.map(tx => `
                <div class="tx-item">
                    <div><strong>${tx.desc}</strong><br><small>${tx.date}</small></div>
                    <div class="tx-amount ${tx.type}">${tx.type === 'credit' ? '+' : ''}${tx.amount.toFixed(2)}</div>
                </div>
            `).join('');
        }
    },

    // Mock function to simulate a transaction from a server
    pollForUpdates: function() {
        // In a real app, this would be a fetch() call to your backend
        console.log("Checking for real-time transactions...");
    },

    // Method to call from other scripts to update balance
    processTransaction: function(amount, description) {
        this.data.balance += amount;
        this.data.transactions.unshift({
            desc: description,
            date: new Date().toISOString().split('T')[0],
            amount: amount,
            type: amount > 0 ? 'credit' : 'debit'
        });
        // The Proxy triggers updateUI() automatically
    }
};

document.addEventListener("DOMContentLoaded", () => DashboardModule.init());
