/* =========================================================
   KHMER BANK ENTERPRISE MASTER LOADER v3
   Secure Boot Orchestrator + Integrity Monitor
========================================================= */

(() => {

  const SYSTEM = {
    version: "3.0.0",
    booted: false,
    failed: false,
    loadedModules: [],
    failedModules: [],
    startTime: Date.now()
  };

  window.BankSystem = SYSTEM;

  const PHASE_FILES = [
    // Core
    "login.js",
    "security_2fa.js",
    "ai_core.js",
    "search.js",
    "soc_defense.js",
    "charter_logic.js",
    "bakong_integration.js",
    "stress_test.js",
    "phase_core.js",

    // Phases
    "phase1.js","phase2.js","phase3.js","phase4.js",
    "phase5.js","phase6.js","phase7.js","phase8.js",
    "phase9.js","phase10.js","phase11.js","phase12.js",
    "phase13.js","phase14.js","phase15.js","phase16.js",
    "phase17.js","phase18.js","phase19.js",
  ];

  const BOOT_TIMEOUT_MS = 5000;

  function updateBootStatus(message, isError = false) {
    const el = document.getElementById("bootStatus");
    if (!el) return;

    el.textContent = message;
    if (isError) el.style.color = "#ff4d4d";
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {

      const script = document.createElement("script");
      script.src = "js/" + src;
      script.async = false;

      const timeout = setTimeout(() => {
        reject(`Timeout loading ${src}`);
      }, BOOT_TIMEOUT_MS);

      script.onload = () => {
        clearTimeout(timeout);
        resolve();
      };

      script.onerror = () => {
        clearTimeout(timeout);
        reject(`Failed to load ${src}`);
      };

      document.body.appendChild(script);
    });
  }

  async function boot() {

    updateBootStatus("Starting secure boot...");

    for (let i = 0; i < PHASE_FILES.length; i++) {

      const file = PHASE_FILES[i];
      updateBootStatus(`Loading ${file}...`);

      try {
        await loadScript(file);

        SYSTEM.loadedModules.push(file);

      } catch (err) {

        SYSTEM.failed = true;
        SYSTEM.failedModules.push(file);

        console.error("[BOOT FAILURE]", err);

        updateBootStatus(
          `SYSTEM FAILURE: ${file} failed`,
          true
        );

        return;
      }
    }

    finalizeBoot();
  }

  function finalizeBoot() {

    const duration = ((Date.now() - SYSTEM.startTime) / 1000).toFixed(2);

    SYSTEM.booted = true;

    updateBootStatus(
      `System Online ✓ (${duration}s)`
    );

    console.log("=== KHMER BANK SYSTEM READY ===");
    console.log("Loaded modules:", SYSTEM.loadedModules);

    setTimeout(() => {
      document.dispatchEvent(
        new Event("bankSystemReady")
      );
    }, 700);
  }

  /* ========================================
     Global Error Listener (Runtime Safety)
  ======================================== */

  window.addEventListener("error", (event) => {

    console.error("Runtime Error:", event.message);

    updateBootStatus(
      "Runtime Error Detected — Check Console",
      true
    );

  });

  /* ========================================
     Phase Auto Registry Validation
  ======================================== */

  document.addEventListener("bankSystemReady", () => {

    if (!window.bankPhases) {
      console.warn("No phases registered.");
      return;
    }

    if (!Array.isArray(window.bankPhases)) {
      console.error("bankPhases must be an array.");
      return;
    }

    console.log("Registered Phases:", window.bankPhases.length);
  });

  /* ========================================
     Start Boot
  ======================================== */

  document.addEventListener("DOMContentLoaded", boot);

})();

function loadDashboard() {

    document.getElementById("dashboardContainer").style.display = "block";

    document.getElementById("accountCount").textContent = "1,254";

    document.getElementById("depositTotal").textContent =
        "$25,400,000";

    document.getElementById("txCount").textContent =
        "4,862";

    showModule("accounts");
}

function showModule(module) {

    const content =
        document.getElementById("moduleContent");

    switch(module){

        case "accounts":

            content.innerHTML = `
                <h3>Customer Accounts</h3>

                <table>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Balance</th>
                    </tr>

                    <tr>
                        <td>1001</td>
                        <td>Huokaing Thara</td>
                        <td>$500,000</td>
                    </tr>

                    <tr>
                        <td>1002</td>
                        <td>Corporate Demo</td>
                        <td>$2,000,000</td>
                    </tr>

                </table>
            `;
            break;

        case "transfers":

            content.innerHTML = `
                <h3>Transfer Center</h3>

                <input placeholder="From Account">

                <input placeholder="To Account">

                <input placeholder="Amount">

                <button>
                    Transfer
                </button>
            `;
            break;

        case "customers":

            content.innerHTML = `
                <h3>Customer Registry</h3>

                <ul>
                    <li>Retail Customers</li>
                    <li>Corporate Customers</li>
                    <li>VIP Customers</li>
                </ul>
            `;
            break;

        case "risk":

            content.innerHTML = `
                <h3>Risk Monitoring</h3>

                <p style="color:lime;">
                    Risk Level: LOW
                </p>
            `;
            break;

        case "phases":

            content.innerHTML = `
                <h3>Bank Development Phases</h3>

                <ol id="phasesList"></ol>
            `;

            showPhasesList();
            break;
    }
}
