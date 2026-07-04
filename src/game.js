import { domManager } from "./domManager";
import { eventManager } from "./eventManager";
import { Ship } from "./ship";

const game = (() => {
  function init() {
    domManager.createStartViewContent();
    eventManager.handleViewSwitch();
  }

  return { init };
})();

export { game };
