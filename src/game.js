import { Player } from "./player";
import { Gameboard } from "./gameboard";
import { CONFIG } from "./config";
import { Ship } from "./ship";

const game = (() => {
  let player1;
  let player2;
  let currPlayer;

  function initPlayers() {
    player1 = new Player(CONFIG.PLAYER_TYPE.REAL);
    player1.board = generateGameboard();

    player2 = new Player(CONFIG.PLAYER_TYPE.COMPUTER);
    player2.board = generateGameboard();

    currPlayer = player1;

    console.log("player1", player1);
    console.log("player2", player2);
    console.log("currPlayer", currPlayer);
  }

  function generateGameboard() {
    const gameboard = new Gameboard();

    CONFIG.SHIP_POOL.forEach((entry) => {
      gameboard.placeShip(
        new Ship(entry.shipLen),
        entry.coordinates,
        entry.orientation,
      );
    });

    return gameboard;
  }

  function getCurrPlayer() {
    return currPlayer;
  }

  return { initPlayers, getCurrPlayer };
})();

export { game };
