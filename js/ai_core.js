/**
 * Phase X: Cognitive Banking AI Core
 * Adaptive Intelligence | Risk Awareness | Strategic Advisory
 */

const aiCore = {
    storageKey: "bank_ai_core_state",
    mood: "STABLE",
    alertMemory: [],
    lastAssessment: null
};

/* =========================================
   AI GREETING ENGINE
========================================= */

function getSentientGreeting() {

    const hour = new Date().getHours();
    const timeGreeting =
        hour < 12 ? "Good morning" :
        hour < 18 ? "Good afternoon" :
        "Good evening";

    const systemStatus = assessSystemStatus();
    aiCore.mood = systemStatus.mood;

    const personality = generatePersonalityLine(timeGreeting, systemStatus);

    saveAiState();

    return personality;
}

/* =========================================
   SYSTEM AWARENESS
========================================= */

function assessSystemStatus() {

    const lcr = parseInt(document.getElementById("lcrVal")?.textContent || "100");
    const riskLevel = document.getElementById("riskSummary")?.textContent || "";
    const securityScore = parseFloat(
        document.getElementById("securityScore")?.textContent || "100"
    );

    let mood = "STABLE";
    let advisory = "All systems operating within optimal thresholds.";

    if (lcr < 100) {
        mood = "LIQUIDITY_ALERT";
        advisory = "Liquidity buffers are thinning. Consider tightening capital controls.";
    }

    if (riskLevel.includes("CRITICAL")) {
        mood = "RISK_CRITICAL";
        advisory = "Risk exposure elevated. Immediate mitigation required.";
    }

    if (securityScore < 70) {
        mood = "SECURITY_STRESSED";
        advisory = "Cyber resilience degraded. SOC response intensity recommended.";
    }

    return { mood, advisory };
}

/* =========================================
   PERSONALITY GENERATOR
========================================= */

function generatePersonalityLine(timeGreeting, systemStatus) {

    const basePersona = "I am the Khmer Bank Guardian AI.";

    switch (systemStatus.mood) {

        case "LIQUIDITY_ALERT":
            rememberAlert("Liquidity stress detected.");
            return `${timeGreeting}. ${basePersona} Liquidity pressure detected. ${systemStatus.advisory}`;

        case "RISK_CRITICAL":
            rememberAlert("Risk exposure critical.");
            return `${timeGreeting}. ${basePersona} Risk matrix indicates critical exposure. ${systemStatus.advisory}`;

        case "SECURITY_STRESSED":
            rememberAlert("Security posture weakened.");
            return `${timeGreeting}. ${basePersona} Defensive perimeter weakened. ${systemStatus.advisory}`;

        default:
            return `${timeGreeting}. ${basePersona} Systems are balanced and secure.`;
    }
}

/* =========================================
   MEMORY SYSTEM
========================================= */

function rememberAlert(message) {

    if (!aiCore.alertMemory.includes(message)) {
        aiCore.alertMemory.push({
            message,
            timestamp: Date.now()
        });

        if (aiCore.alertMemory.length > 10)
            aiCore.alertMemory.shift();
    }
}

function saveAiState() {
    localStorage.setItem(
        aiCore.storageKey,
        JSON.stringify(aiCore)
    );
}

function restoreAiState() {
    const saved = localStorage.getItem(aiCore.storageKey);
    if (!saved) return;
    try {
        Object.assign(aiCore, JSON.parse(saved));
    } catch {}
}

/* =========================================
   AUTO-REFRESH LOOP
========================================= */

function refreshAiMood() {

    const bubble = document.getElementById("aiStatusBubble");
    if (!bubble) return;

    bubble.textContent = getSentientGreeting();
}

function startAiMonitoring() {
    restoreAiState();
    refreshAiMood();
    setInterval(refreshAiMood, 8000);
}

/* =========================================
   ADVANCED STRATEGIC MODE
========================================= */

function getStrategicInsight() {

    const alerts = aiCore.alertMemory;

    if (alerts.length === 0)
        return "No strategic threats recorded. Capital posture is stable.";

    const latest = alerts[alerts.length - 1];

    return `Strategic Insight: ${latest.message} Monitoring continues.`;
}
