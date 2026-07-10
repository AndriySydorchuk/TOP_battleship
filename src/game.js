import { Player } from "./player";
import { Gameboard } from "./gameboard";
import { CONFIG } from "./config";
import { Ship } from "./ship";
import { generateGameboard } from "./utils";

const game = (() => {
  let player1;
  let player2;
  let currPlayer;

  function initPlayers() {
    player1 = new Player(CONFIG.PLAYER_TYPE.REAL);

    player2 = new Player(CONFIG.PLAYER_TYPE.COMPUTER, generateGameboard());

    currPlayer = player1;
  }

  function getCurrPlayer() {
    return currPlayer;
  }

  function switchCurrPlayer() {
    currPlayer = currPlayer === player1 ? player2 : player1;
  }

  function attack(coordinates) {
    currPlayer.board.receiveAttack(coordinates);

    return currPlayer.board.hitted.some(
      (h) => JSON.stringify(h) === JSON.stringify(coordinates),
    );
  }

  function switchTurn() {
    switchCurrPlayer();

    let hitted;
    do {
      hitted = attack(generateCoordinates());
    } while (hitted && !over());

    switchCurrPlayer();
  }

  function generateCoordinates() {
    let coordinates;

    do {
      coordinates = [
        Math.floor(Math.random() * CONFIG.BOARD_SIZE),
        Math.floor(Math.random() * CONFIG.BOARD_SIZE),
      ];
    } while (
      currPlayer.board.missed.some(
        (m) => JSON.stringify(m) === JSON.stringify(coordinates),
      ) ||
      currPlayer.board.hitted.some(
        (h) => JSON.stringify(h) === JSON.stringify(coordinates),
      )
    );

    return coordinates;
  }

  function getPlayers() {
    return {
      first: player1,
      second: player2,
    };
  }

  function over() {
    if (player1.board.allShipsSunk() || player2.board.allShipsSunk())
      return true;

    return false;
  }

  function getWinner() {
    if (over()) {
      return player1.board.allShipsSunk() ? player2 : player1;
    }
  }

  function play(coordinates) {
    if (over()) return;

    let hitted;
    try {
      hitted = attack(coordinates);
    } catch (error) {
      return;
    }

    if (over()) return;

    if (hitted) return;

    switchTurn();
  }

  return {
    initPlayers,
    getCurrPlayer,
    switchCurrPlayer,
    attack,
    switchTurn,
    getPlayers,
    over,
    getWinner,
    play,
  };
})();

export { game };
