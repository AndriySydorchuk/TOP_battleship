import { domManager } from "./domManager";
import { eventManager } from "./eventManager";
import { Ship } from "./ship";
import { CONFIG } from "./config";
import { Player } from "./player";
import { Gameboard } from "./gameboard";

const game = (() => {
  let player1;
  let player2;

  function init() {
    initPlayers();

    domManager.createStartViewContent();
    domManager.createSetupViewContent(player1.board);

    eventManager.handleViewSwitch();
  }

  function initPlayers() {
    player1 = new Player(CONFIG.PLAYER_TYPE.REAL, new Gameboard());
    player2 = new Player(CONFIG.PLAYER_TYPE.COMPUTER, new Gameboard());
  }

  return { init };
})();

export { game };
