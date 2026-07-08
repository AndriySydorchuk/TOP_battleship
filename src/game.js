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
    currentPlayer.board.receiveAttack(coordinates);
  }

  function switchTurn() {
    switchPlayer();

    try {
      game.attack(generateCoordinates());
    } catch (error) {
      console.warn(error.message);
    }

    switchPlayer();
  }

  function switchPlayer() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }

  function gameOver() {
    let gameover = false;

    if (player1.board.allShipsSunk() || player2.board.allShipsSunk())
      gameover = true;

    return gameover;
  }

  function getCurrentPlayer() {
    return currentPlayer;
  }

  function generateCoordinates() {
    let coordinates;

    do {
      coordinates = [
        Math.floor(Math.random() * CONFIG.BOARD_SIZE),
        Math.floor(Math.random() * CONFIG.BOARD_SIZE),
      ];
    } while (
      currentPlayer.board.missed.some(
        (coords) => JSON.stringify(coords) === JSON.stringify(coordinates),
      ) ||
      currentPlayer.board.hitted.some(
        (coords) => JSON.stringify(coords) === JSON.stringify(coordinates),
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

  return {
    init,
    generateShipPool,
    attack,
    getCurrentPlayer,
    switchTurn,
    getPlayers,
    gameOver,
  };
})();

export { game };
