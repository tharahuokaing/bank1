/* =========================================================
   KHMER BANK PHASE REGISTRY CORE
   Safe Phase Architecture v2
========================================================= */

(() => {

  if (window.PhaseRegistry) return;

  const registry = [];

  function validatePhase(phase) {

    const required = ["id", "name", "status", "description"];

    for (let field of required) {
      if (!phase[field]) {
        throw new Error(
          `Invalid phase: Missing "${field}" in ${phase.id || "unknown"}`
        );
      }
    }

    return true;
  }

  function registerPhase(phase) {

    try {
      validatePhase(phase);

      registry.push({
        ...phase,
        registeredAt: new Date().toISOString()
      });

      console.log(`[PHASE REGISTERED] ${phase.id}`);

    } catch (err) {
      console.error("[PHASE ERROR]", err.message);
    }
  }

  function getPhases() {
    return registry;
  }

  function getPhaseById(id) {
    return registry.find(p => p.id === id);
  }

  window.PhaseRegistry = {
    register: registerPhase,
    getAll: getPhases,
    getById: getPhaseById
  };

})();
