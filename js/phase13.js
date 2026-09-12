/**
 * Phase 13: Customer Support AI Chatbot
 * Implements a simulated support interface for user inquiries.
 */

function renderPhase13Details() {
    const summaryBox = document.getElementById('summaryBox');
    
    // Prevent duplicate rendering
    if (document.getElementById('phase13Section')) return;

    const p13Container = document.createElement('section');
    p13Container.id = "phase13Section";
    p13Container.className = "phase-detail-box";
    p13Container.style.borderLeft = "4px solid #3498db"; // Support Blue
    p13Container.style.padding = "20px";
    p13Container.style.background = "rgba(52, 152, 219, 0.05)";

    p13Container.innerHTML = `
        <h2 style="color: #3498db;">Phase 13: AI Support Chatbot</h2>
        <p>A simulated help-desk interface to assist with banking operations.</p>
        
        <div id="chatWindow" style="background: #000; border: 1px solid #333; height: 200px; overflow-y: auto; padding: 15px; margin-bottom: 10px; font-family: sans-serif; font-size: 0.9rem;">
            <div style="color: #3498db; margin-bottom: 10px;"><strong>Support Bot:</strong> Hello! How can I help you with your account today?</div>
        </div>

        <div style="display: flex; gap: 5px;">
            <input type="text" id="chatInput" placeholder="Ask a question..." style="flex: 1; background: #111; color: #fff; border: 1px solid #3498db; padding: 10px;">
            <button id="sendChatBtn" style="background: #3498db; color: #fff; border: none; padding: 10px 20px; cursor: pointer; font-weight: bold;">SEND</button>
        </div>
    `;

    summaryBox.appendChild(p13Container);

    // Event listeners for sending messages
    document.getElementById('sendChatBtn').addEventListener('click', handleChatSubmit);
    document.getElementById('chatInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChatSubmit();
    });
}

/**
 * Logic to process user input and generate bot responses
 */
function handleChatSubmit() {
    const input = document.getElementById('chatInput');
    const window = document.getElementById('chatWindow');
    const userText = input.value.trim();

    if (!userText) return;

    // Display user message
    window.innerHTML += `<div style="text-align: right; margin-bottom: 10px; color: #fff;"><strong>You:</strong> ${userText}</div>`;
    input.value = '';
    window.scrollTop = window.scrollHeight;

    // Simulate Bot "Thinking"
    setTimeout(() => {
        let botResponse = "I'm sorry, I don't understand that request. Could you try asking about your 'balance' or 'security'?";
        const query = userText.toLowerCase();

        if (query.includes("balance")) {
            botResponse = "Your current Tier 1 Capital balance is verified and stable.";
        } else if (query.includes("transfer")) {
            botResponse = "To initiate a transfer, please navigate to Phase 19 (Bakong Gateway).";
        } else if (query.includes("security") || query.includes("password")) {
            botResponse = "Security protocols are active. Please refer to Phase 20 for SOC monitoring details.";
        }

        window.innerHTML += `<div style="color: #3498db; margin-bottom: 10px;"><strong>Support Bot:</strong> ${botResponse}</div>`;
        window.scrollTop = window.scrollHeight;
        
        if (typeof logActivity === "function") {
            logActivity("Phase 13: Customer support interaction logged.");
        }
    }, 800);
}

// Global listener to trigger this phase from the sidebar/list
document.addEventListener('click', (e) => {
    if (e.target && e.target.nodeName === "LI" && e.target.textContent.includes("Phase 13")) {
        renderPhase13Details();
        document.getElementById('phase13Section').scrollIntoView({ behavior: 'smooth' });
    }
});
