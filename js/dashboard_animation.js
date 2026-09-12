/* =========================================================
   DASHBOARD ANIMATION: COUNT UP EFFECT
   ========================================================= */

function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    const range = end - start;
    let minTimer = 50;
    let stepTime = Math.abs(Math.floor(duration / range));
    stepTime = Math.max(stepTime, minTimer);
    
    let startTime = new Date().getTime();
    let endTime = startTime + duration;
    let timer;
    
    function run() {
        let now = new Date().getTime();
        let remaining = Math.max((endTime - now) / duration, 0);
        let value = Math.round(end - (remaining * range));
        obj.innerHTML = value.toLocaleString(); // Adds commas (e.g., 1,000)
        if (value == end) clearInterval(timer);
    }
    
    timer = setInterval(run, stepTime);
    run();
}

// Trigger this function when the dashboard shows
function startDashboardAnimations() {
    animateValue("accountCount", 0, 1254, 2000);
    animateValue("depositTotal", 0, 25400000, 2000);
    animateValue("txCount", 0, 4862, 2000);
}
