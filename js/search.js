/**
 * Phase X: Enterprise Command Console Engine
 * Fuzzy Search | Command Parsing | Keyboard Navigation
 */

const commandEngine = {
    storageKey: "bank_command_history",
    history: [],
    maxHistory: 20
};

const searchableData = [
    { key: "Phase 1", target: "Phase 1", desc: "Vision & Concept" },
    { key: "Phase 2", target: "Phase 2", desc: "Regulatory & Legal" },
    { key: "Phase 3", target: "Phase 3", desc: "Infrastructure & Tech" },
    { key: "Phase 4", target: "Phase 4", desc: "Risk Matrix" },
    { key: "Phase 7", target: "Phase 7", desc: "Core Server Engine" },
    { key: "Phase 9", target: "Phase 9", desc: "ISO 20022 / SWIFT" },
    { key: "Phase 11", target: "Phase 11", desc: "Liquidity Coverage Ratio" },
    { key: "Phase 12", target: "Phase 12", desc: "AI Fraud Guardian" },
    { key: "Phase 14", target: "Phase 14", desc: "Basel IV Capital" },
    { key: "SWIFT", target: "Phase 9", desc: "International Messaging Network" },
    { key: "LCR", target: "Phase 11", desc: "Liquidity Monitoring" },
    { key: "Fraud", target: "Phase 12", desc: "AI Fraud Detection" }
];

let selectedIndex = -1;

/* =========================================
   INIT
========================================= */

function initGlobalSearch() {

    if (document.getElementById("commandSearchWrapper")) return;

    const summaryBox = document.getElementById("summaryBox");
    if (!summaryBox) return;

    const wrapper = document.createElement("div");
    wrapper.id = "commandSearchWrapper";
    wrapper.className = "command-search";

    wrapper.innerHTML = `
        <label class="command-label">SYSTEM COMMAND CONSOLE</label>
        <input type="text" id="globalSearchInput"
               placeholder="Type command or keyword (e.g. 'go phase 7')..." />
        <div id="searchResults" class="command-results"></div>
    `;

    summaryBox.prepend(wrapper);

    const input = document.getElementById("globalSearchInput");
    input.addEventListener("input", handleSearchInput);
    input.addEventListener("keydown", handleKeyboardNav);

    restoreHistory();
}

/* =========================================
   SEARCH LOGIC
========================================= */

function handleSearchInput(e) {

    const query = e.target.value.trim().toLowerCase();
    const resultsDiv = document.getElementById("searchResults");
    resultsDiv.innerHTML = "";
    selectedIndex = -1;

    if (query.length < 2) return;

    // Command parsing
    if (parseCommand(query)) return;

    const matches = fuzzySearch(query);

    matches.forEach((match, index) => {

        const div = document.createElement("div");
        div.className = "command-result-item";
        div.dataset.index = index;

        div.innerHTML = `
            <span class="command-key">${match.key}</span>
            <small>${match.desc}</small>
        `;

        div.onclick = () => executeNavigation(match.target);

        resultsDiv.appendChild(div);
    });
}

/* =========================================
   FUZZY SEARCH
========================================= */

function fuzzySearch(query) {

    return searchableData
        .map(item => {
            const score =
                relevanceScore(query, item.key) +
                relevanceScore(query, item.desc);

            return { ...item, score };
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8);
}

function relevanceScore(query, text) {

    text = text.toLowerCase();

    if (text.includes(query)) return 10;

    // partial match scoring
    let score = 0;
    query.split(" ").forEach(word => {
        if (text.includes(word)) score += 3;
    });

    return score;
}

/* =========================================
   COMMAND PARSER
========================================= */

function parseCommand(query) {

    if (query.startsWith("go ")) {
        const phase = query.replace("go ", "");
        navigateToPhase(phase);
        return true;
    }

    if (query === "check lcr") {
        navigateToPhase("Phase 11");
        return true;
    }

    if (query === "open swift") {
        navigateToPhase("Phase 9");
        return true;
    }

    return false;
}

/* =========================================
   NAVIGATION
========================================= */

function executeNavigation(target) {
    navigateToPhase(target);
    storeCommand(target);
    clearSearch();
}

function navigateToPhase(target) {

    const listItems = document.querySelectorAll("#phasesList li");

    listItems.forEach(li => {
        if (li.textContent.includes(target)) {
            li.click();
            li.scrollIntoView({ behavior: "smooth" });
        }
    });
}

function clearSearch() {
    document.getElementById("globalSearchInput").value = "";
    document.getElementById("searchResults").innerHTML = "";
}

/* =========================================
   KEYBOARD NAVIGATION
========================================= */

function handleKeyboardNav(e) {

    const items = document.querySelectorAll(".command-result-item");

    if (e.key === "ArrowDown") {
        selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
        updateSelection(items);
    }

    if (e.key === "ArrowUp") {
        selectedIndex = Math.max(selectedIndex - 1, 0);
        updateSelection(items);
    }

    if (e.key === "Enter" && selectedIndex >= 0) {
        items[selectedIndex].click();
    }

    if (e.key === "Escape") {
        clearSearch();
    }
}

function updateSelection(items) {

    items.forEach(item => item.classList.remove("selected"));

    if (items[selectedIndex])
        items[selectedIndex].classList.add("selected");
}

/* =========================================
   HISTORY
========================================= */

function storeCommand(cmd) {

    commandEngine.history.unshift(cmd);

    if (commandEngine.history.length > commandEngine.maxHistory)
        commandEngine.history.pop();

    localStorage.setItem(
        commandEngine.storageKey,
        JSON.stringify(commandEngine.history)
    );
}

function restoreHistory() {
    const saved = localStorage.getItem(commandEngine.storageKey);
    if (saved)
        commandEngine.history = JSON.parse(saved);
}
