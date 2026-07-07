import { domManager } from "./domManager";
import { eventManager } from "./eventManager";
import { Ship } from "./ship";
import { CONFIG } from "./config";
import { Player } from "./player";
import { Gameboard } from "./gameboard";

const game = (() => {
  let player1;
  let player2;
  let currentPlayer;

  function init() {
    initPlayers();

    domManager.createStartViewContent();
    domManager.createSetupViewContent(player1.board);
    domManager.createPlayViewContent(player1, player2);

    eventManager.handleViewSwitch();
    eventManager.handlePlayBtn(player1, player2);
  }

  function initPlayers() {
    player1 = new Player(CONFIG.PLAYER_TYPE.REAL, new Gameboard());
    initGameboard(player1, generateShipPool());

    player2 = new Player(CONFIG.PLAYER_TYPE.COMPUTER, new Gameboard());
    initGameboard(player2, generateShipPool());

    currentPlayer = player2;
  }

  function initGameboard(player, shipPool) {
    shipPool.forEach(({ ship, coordinates, orientation }) => {
      player.board.placeShip(ship, coordinates, orientation);
    });
  }

  function generateShipPool() {
    return CONFIG.PREDEFINED_SHIP_POOL.map(
      ({ shipLen, coordinates, orientation }) => ({
        ship: new Ship(shipLen),
        coordinates,
        orientation,
      }),
    );
  }

  function attack(coordinates) {
    const gameboard = currentPlayer.board;

    gameboard.receiveAttack(coordinates);

    const hitted = gameboard.hitted.some(
      (coord) => JSON.stringify(coord) === JSON.stringify(coordinates),
    );

    return hitted;
  }

  return { init, generateShipPool, attack };
})();

export { game };
