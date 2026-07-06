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
    domManager.createPlayViewContent(player1.board, player2.board);

    eventManager.handleViewSwitch();
  }

  function initPlayers() {
    player1 = new Player(CONFIG.PLAYER_TYPE.REAL, new Gameboard());
    initGameboard(player1, generateShipPool());

    player2 = new Player(CONFIG.PLAYER_TYPE.COMPUTER, new Gameboard());
    initGameboard(player2, generateShipPool());
  }

  function initGameboard(player, shipPool) {
    shipPool.forEach(({ ship, coordinates, orientation }) => {
      player.board.placeShip(ship, coordinates, orientation);
    });
  }

  return { init };
})();

export { game };
