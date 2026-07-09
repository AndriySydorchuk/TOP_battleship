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

  function switchCurrPlayer() {
    currPlayer = currPlayer === player1 ? player2 : player1;
  }

  function attack(coordinates) {
    currPlayer.board.receiveAttack(coordinates);
  }

  function switchTurn() {
    switchCurrPlayer();

    attack(generateCoordinates());

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

    try {
      attack(coordinates);
    } catch (error) {
      console.warn(error.message);
      return;
    }

    if (over()) return;

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
