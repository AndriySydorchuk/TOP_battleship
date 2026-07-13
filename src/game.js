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

  function switchCurrPlayer() {
    currPlayer = currPlayer === player1 ? player2 : player1;
    return currPlayer;
  }

  function getCurrPlayer() {
    return currPlayer;
  }

  function getWinner() {
    if (over()) {
      return player1.board.allShipsSunk() ? player2 : player1;
    }
  }

  return {
    initPlayers,
    over,
    attack,
    switchCurrPlayer,
    getCurrPlayer,
    getWinner,
  };
})();

export { game };
