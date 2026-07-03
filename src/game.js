import { domManager } from "./domManager";
import { eventManager } from "./eventManager";

const game = (() => {
  function init() {
    domManager.renderViews();
    eventManager.handleViewSwitch();
  }

  return { init };
})();

export { game };
