/* =========================================================
HUOKAING THARA BANK
Enterprise Authentication Controller v6
========================================================= */

(() => {

"use strict";

/* =========================================================
CONFIGURATION
========================================================= */

const AUTH = {

```
sessionKey: "HTB_SESSION",

loginAttemptsKey: "HTB_LOGIN_ATTEMPTS",

maxAttempts: 5,

lockDuration: 5 * 60 * 1000,

sessionTimeout: 30 * 60 * 1000
```

};

/* =========================================================
MOCK USER DATABASE
Replace with API / Database later
========================================================= */

const USERS = [

```
{
    username: "huokaingthara",
    password: "dutyfree",
    role: "cybersecurity",
    requires2FA: false
},

{
    username: "admin",
    password: "dutyfree",
    role: "administrator",
    requires2FA: true
},

{
    username: "auditor",
    password: "auditor123",
    role: "auditor",
    requires2FA: true
},

{
    username: "staff",
    password: "staff123",
    role: "staff",
    requires2FA: false
}
```

];

/* =========================================================
AUDIT LOGGING
========================================================= */

function auditLog(action) {

```
const timestamp = new Date().toISOString();

console.log(
    `[AUDIT] ${timestamp} | ${action}`
);

const auditContainer =
    document.getElementById("auditLog");

if (!auditContainer) return;

const entry =
    document.createElement("div");

entry.className = "audit-entry";

entry.textContent =
    `${timestamp} | ${action}`;

auditContainer.prepend(entry);
```

}

/* =========================================================
ATTEMPT MANAGEMENT
========================================================= */

function getAttemptData() {

```
return JSON.parse(
    localStorage.getItem(
        AUTH.loginAttemptsKey
    )
) || {

    count: 0,
    lockedUntil: null
};
```

}

function saveAttemptData(data) {

```
localStorage.setItem(
    AUTH.loginAttemptsKey,
    JSON.stringify(data)
);
```

}

function clearAttempts() {

```
localStorage.removeItem(
    AUTH.loginAttemptsKey
);
```

}

function isLocked() {

```
const data = getAttemptData();

if (!data.lockedUntil)
    return false;

if (Date.now() > data.lockedUntil) {

    clearAttempts();

    return false;
}

return true;
```

}

/* =========================================================
TOKEN GENERATOR
========================================================= */

function generateToken() {

```
return btoa(
    crypto.randomUUID() +
    Date.now()
);
```

}

/* =========================================================
LOGIN
========================================================= */

async function handleLogin(
username,
password
) {

```
const msg =
    document.getElementById(
        "loginMessage"
    );

msg.textContent = "";

if (!username || !password) {

    msg.textContent =
        "Username and password required.";

    return;
}

if (isLocked()) {

    msg.textContent =
        "Account temporarily locked.";

    return;
}

const user = USERS.find(
    u => u.username === username
);

if (
    !user ||
    user.password !== password
) {

    const data =
        getAttemptData();

    data.count++;

    if (
        data.count >=
        AUTH.maxAttempts
    ) {

        data.lockedUntil =
            Date.now() +
            AUTH.lockDuration;

        saveAttemptData(data);

        msg.textContent =
            "Account locked.";

        auditLog(
            `LOCKOUT | ${username}`
        );

        return;
    }

    saveAttemptData(data);

    msg.textContent =
        `Invalid login (${data.count}/${AUTH.maxAttempts})`;

    auditLog(
        `FAILED LOGIN | ${username}`
    );

    return;
}

clearAttempts();

auditLog(
    `LOGIN SUCCESS | ${username}`
);

if (
    user.requires2FA &&
    typeof start2FA === "function"
) {

    start2FA(() => {

        createSession(user);

    });

    return;
}

createSession(user);
```

}

/* =========================================================
SESSION
========================================================= */

function createSession(user) {

```
const session = {

    username:
        user.username,

    role:
        user.role,

    loginTime:
        Date.now(),

    token:
        generateToken()
};

sessionStorage.setItem(

    AUTH.sessionKey,

    JSON.stringify(session)
);

showDashboard(session);
```

}

/* =========================================================
SESSION RESTORE
========================================================= */

function getSession() {

```
const raw =
    sessionStorage.getItem(
        AUTH.sessionKey
    );

if (!raw)
    return null;

try {

    return JSON.parse(raw);

} catch {

    return null;
}
```

}

function restoreSession() {

```
const session =
    getSession();

if (!session)
    return;

const age =
    Date.now() -
    session.loginTime;

if (
    age >
    AUTH.sessionTimeout
) {

    logout();

    return;
}

showDashboard(session);

auditLog(
    `SESSION RESTORED | ${session.username}`
);
```

}

/* =========================================================
DASHBOARD
========================================================= */

function showDashboard(session) {

```
const loginContainer =
    document.getElementById(
        "loginContainer"
    );

const dashboard =
    document.getElementById(
        "summaryBox"
    );

loginContainer.hidden = true;

dashboard.hidden = false;

const aiBubble =
    document.getElementById(
        "aiStatusBubble"
    );

if (aiBubble) {

    aiBubble.innerHTML = `
        User: ${session.username}
        |
        Role: ${session.role}
        |
        AI Core Active
    `;
}

initializeDashboard(
    session
);

if (
    typeof PhaseRegistry !==
    "undefined"
) {

    renderPhaseList(
        session.role
    );
}
```

}

/* =========================================================
DASHBOARD DATA
========================================================= */

function initializeDashboard(
session
) {

```
const assets =
    document.getElementById(
        "assetValue"
    );

const deposits =
    document.getElementById(
        "depositValue"
    );

const tx =
    document.getElementById(
        "transactionValue"
    );

const capital =
    document.getElementById(
        "capitalRatio"
    );

if (assets)
    assets.textContent =
    "$250,000,000";

if (deposits)
    deposits.textContent =
    "$180,000,000";

if (tx)
    tx.textContent =
    "12,458";

if (capital)
    capital.textContent =
    "18.4%";

auditLog(
    `DASHBOARD LOADED | ${session.username}`
);
```

}

/* =========================================================
PHASE RENDERING
========================================================= */

function renderPhaseList(role) {

```
const list =
    document.getElementById(
        "phasesList"
    );

if (
    !list ||
    typeof PhaseRegistry ===
    "undefined"
)
    return;

list.innerHTML = "";

PhaseRegistry
    .getAll()

    .forEach(phase => {

        const li =
            document.createElement(
                "li"
            );

        li.textContent =
            `${phase.id}. ${phase.name}`;

        li.onclick = () => {

            if (
                typeof showPhaseDetail ===
                "function"
            ) {

                showPhaseDetail(
                    phase.id
                );
            }
        };

        list.appendChild(li);
    });
```

}

/* =========================================================
LOGOUT
========================================================= */

function logout() {

```
sessionStorage.removeItem(
    AUTH.sessionKey
);

auditLog("LOGOUT");

location.reload();
```

}

/* =========================================================
EVENT BINDING
========================================================= */

document.addEventListener(
"DOMContentLoaded",
() => {

```
    const form =
        document.getElementById(
            "loginForm"
        );

    if (form) {

        form.addEventListener(
            "submit",
            e => {

                e.preventDefault();

                const username =
                    document
                    .getElementById(
                        "usernameInput"
                    )
                    .value.trim();

                const password =
                    document
                    .getElementById(
                        "passwordInput"
                    )
                    .value.trim();

                handleLogin(
                    username,
                    password
                );
            }
        );
    }

    restoreSession();
}
```

);

/* =========================================================
GLOBAL EXPORTS
========================================================= */

window.handleLogin =
handleLogin;

window.logout =
logout;

window.getSession =
getSession;

window.showDashboard =
showDashboard;

})();
