import { domManager } from "./domManager";
import { eventManager } from "./eventManager";
import { Ship } from "./ship";

const game = (() => {
  const shipsPool = [
    new Ship(4),
    new Ship(3),
    new Ship(3),
    new Ship(2),
    new Ship(2),
    new Ship(2),
    new Ship(1),
    new Ship(1),
    new Ship(1),
    new Ship(1),
  ];

  function init() {
    domManager.renderViews();
    eventManager.handleViewSwitch();
  }

  function getShipsPool() {
    return shipsPool;
  }

  return { init, getShipsPool };
})();

export { game };
