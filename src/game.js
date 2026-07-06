import { domManager } from "./domManager";
import { eventManager } from "./eventManager";
import { Ship } from "./ship";
import { CONFIG } from "./config";
import { Player } from "./player";
import { Gameboard } from "./gameboard";

const game = (() => {
  let player1;
  let player2;
  const placements = [
    { ship: new Ship(4), coordinates: [1, 1], orientation: "v" },
    { ship: new Ship(3), coordinates: [2, 4], orientation: "h" },
    { ship: new Ship(3), coordinates: [7, 8], orientation: "v" },
    { ship: new Ship(2), coordinates: [0, 4], orientation: "h" },
    { ship: new Ship(2), coordinates: [8, 0], orientation: "h" },
    { ship: new Ship(2), coordinates: [8, 6], orientation: "v" },
    { ship: new Ship(1), coordinates: [4, 3], orientation: "h" },
    { ship: new Ship(1), coordinates: [5, 6], orientation: "h" },
    { ship: new Ship(1), coordinates: [5, 9], orientation: "h" },
    { ship: new Ship(1), coordinates: [7, 3], orientation: "h" },
  ];

  function init() {
    initPlayers();

    domManager.createStartViewContent();
    domManager.createSetupViewContent(player1.board);

    eventManager.handleViewSwitch();
  }

  function initPlayers() {
    player1 = new Player(CONFIG.PLAYER_TYPE.REAL, new Gameboard());
    initGameboard(player1, placements);

    player2 = new Player(CONFIG.PLAYER_TYPE.COMPUTER, new Gameboard());
    initGameboard(player2, placements);
  }

  function initGameboard(player, placements) {
    placements.forEach(({ ship, coordinates, orientation }) => {
      player.board.placeShip(ship, coordinates, orientation);
    });
  }

  return { init };
})();

export { game };
