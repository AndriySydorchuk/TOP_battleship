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
  let player;
  let computer;
  let current;

  function initPlayers() {
    player = new Player(CONFIG.PLAYER_TYPE.REAL);

    computer = new Player(CONFIG.PLAYER_TYPE.COMPUTER, generateGameboard());

    current = player;
  }

  function over() {
    if (player.board.allShipsSunk() || computer.board.allShipsSunk())
      return true;

    return false;
  }

  function attack(coordinates) {
    current.board.receiveAttack(coordinates);

    return containsCoords(current.board.hitted, coordinates);
  }

  function switchCurrentPlayer() {
    current = current === player ? computer : player;
    return current;
  }

  function getCurrentPlayer() {
    return current;
  }

  function getWinner() {
    if (over()) {
      return player.board.allShipsSunk() ? computer : player;
    }
  }

  return {
    initPlayers,
    over,
    attack,
    switchCurrentPlayer,
    getCurrentPlayer,
    getWinner,
  };
})();

export { game };
