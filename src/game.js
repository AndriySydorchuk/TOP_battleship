import { Player } from "./player";
import { CONFIG } from "./config";
import {
  generateGameboard,
  containsCoords,
  generateAttackCoords,
} from "./utils";
import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

const game = (() => {
  let player1;
  let player2;
  let currPlayer;

  function initPlayers() {
    player1 = new Player(CONFIG.PLAYER_TYPE.REAL);

    player2 = new Player(CONFIG.PLAYER_TYPE.COMPUTER, generateGameboard());

    currPlayer = player1;
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

  function over() {
    if (player1.board.allShipsSunk() || player2.board.allShipsSunk())
      return true;

    return false;
  }

  function attack(coordinates) {
    const board = currPlayer.board;
    board.receiveAttack(coordinates);

    return containsCoords(board.hitted, coordinates);
  }

  function switchTurn() {
    switchCurrPlayer();

    let hitted;
    do {
      hitted = attack(generateAttackCoords(currPlayer.board));
    } while (hitted && !over());

    switchCurrPlayer();
  }

  function switchCurrPlayer() {
    currPlayer = currPlayer === player1 ? player2 : player1;
  }

  function getCurrPlayer() {
    return currPlayer;
  }

  function getPlayers() {
    return {
      first: player1,
      second: player2,
    };
  }

  function getWinner() {
    if (over()) {
      return player1.board.allShipsSunk() ? player2 : player1;
    }
  }

  return {
    initPlayers,
    play,
    over,
    attack,
    switchTurn,
    switchCurrPlayer,
    getCurrPlayer,
    getPlayers,
    getWinner,
  };
})();

export { game };
