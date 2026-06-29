/* =========================================================
   HUOKAING THARA BANK - DASHBOARD ENGINE
   Handles Account Summaries, Transactions, and UI States
========================================================= */

const AccountController = {
  // Mock Data: In production, this would come from your API
  userData: {
    name: "HUOKAING THARA",
    accountNumber: "888-009-110-499",
    balance: 15420.50,
    currency: "USD",
    transactions: [
      { id: 1, desc: "Transfer to Savings", date: "2026-06-30", amount: -200.00, type: "debit" },
      { id: 2, desc: "Salary Deposit", date: "2026-06-28", amount: 2500.00, type: "credit" },
      { id: 3, desc: "Electricity Bill", date: "2026-06-25", amount: -45.20, type: "debit" }
    ]
  },

  init: function() {
    this.renderDashboard();
  },

  renderDashboard: function() {
    // 1. Update Balance Header
    const balanceEl = document.getElementById("accountBalance");
    if (balanceEl) {
      balanceEl.textContent = `${this.userData.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })} ${this.userData.currency}`;
    }

    // 2. Render Transaction List
    const txList = document.getElementById("transactionList");
    if (txList) {
      txList.innerHTML = this.userData.transactions.map(tx => `
        <div class="tx-item">
          <div class="tx-info">
            <strong>${tx.desc}</strong>
            <small>${tx.date}</small>
          </div>
          <div class="tx-amount ${tx.type}">
            ${tx.type === 'credit' ? '+' : ''}${tx.amount.toFixed(2)}
          </div>
        </div>
      `).join('');
    }
  },

  // Simulate a transfer function
  transferFunds: function(amount) {
    if (amount > this.userData.balance) {
      alert("Insufficient funds.");
      return;
    }
    this.userData.balance -= amount;
    this.renderDashboard();
  }
};

// Bind to lifecycle
document.addEventListener("DOMContentLoaded", () => {
  AccountController.init();
});
