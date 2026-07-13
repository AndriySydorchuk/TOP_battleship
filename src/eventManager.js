import { domManager } from "./domManager";
import { game } from "./game";
import {
  extractCoords,
  generateAttackCoords,
  generateGameboard,
  delay,
} from "./utils";
import { CONFIG } from "./config";

const eventManager = (() => {
  function init() {
    handleViewSwitch();
    handleComputerOption();
    handleShuffle();
    handleGameStart();
    handleAttack();
  }

  function handleViewSwitch() {
    const startView = document.querySelector(".start-view");
    const setupView = document.querySelector(".setup-view");
    const playView = document.querySelector(".play-view");

    const computer = document.querySelector(".computer");
    computer.addEventListener("click", () => {
      domManager.resetView(setupView);
      domManager.showView(setupView);
    });

    const returnBtns = document.querySelectorAll(".return-btn");
    returnBtns.forEach((returnBtn) => {
      returnBtn.addEventListener("click", () => domManager.showView(startView));
    });

    const playBtn = document.querySelector(".play-btn");
    playBtn.addEventListener("click", () => {
      if (game.getCurrentPlayer().board === null) return;

      domManager.resetView(playView);
      domManager.showView(playView);
    });
  }

  function handleComputerOption() {
    const computer = document.querySelector(".computer");

    computer.addEventListener("click", () => {
      game.initPlayers();

      const currentPlayer = game.getCurrentPlayer();

      const setupView = document.querySelector(".setup-view");
      const board = setupView.querySelector(".board");

      domManager.updateBoard(board, currentPlayer.board);
    });
  }

  function handleShuffle() {
    const setupView = document.querySelector(".setup-view");
    const board = setupView.querySelector(".board");
    const shuffleBtn = document.querySelector(".shuffle-btn");

    shuffleBtn.addEventListener("click", () => {
      const currentPlayer = game.getCurrentPlayer();
      currentPlayer.board = generateGameboard();

      domManager.updateBoard(board, currentPlayer.board);
    });
  }

  function handleGameStart() {
    const playBtn = document.querySelector(".play-btn");

    playBtn.addEventListener("click", () => {
      const currentPlayer = game.getCurrentPlayer();
      if (currentPlayer.board === null) return;

      const playView = document.querySelector(".play-view");
      const [playerBoard, computerBoard] = playView.querySelectorAll(".board");

      domManager.updateBoard(playerBoard, currentPlayer.board);
      domManager.setActiveBoard(computerBoard);

      game.switchCurrentPlayer();
    });
  }

  function handleAttack() {
    const playView = document.querySelector(".play-view");
    const boards = playView.querySelectorAll(".board");
    const actionCells = boards[1].querySelectorAll(".board-cell");

    actionCells.forEach((cell) => {
      cell.addEventListener("click", () => {
        if (game.over()) return;

        let hitted = playerTurn(cell, boards);
        if (hitted) return;

        computerTurn(boards);
      });
    });
  }

  function playerTurn(clickedCell, boards) {
    const [playerBoard, computerBoard] = boards;
    const currentPlayer = game.getCurrentPlayer();

    let hitted;
    try {
      hitted = game.attack(extractCoords(clickedCell));

      domManager.updateBoard(computerBoard, currentPlayer.board, {
        hideShips: true,
      });
      domManager.setActiveBoard(computerBoard);
    } catch (error) {
      return;
    }

    if (game.over()) {
      domManager.displayWinner(game.getWinner());
    }

    return hitted;
  }

  async function computerTurn(boards) {
    const [playerBoard, computerBoard] = boards;

    let currentPlayer = game.switchCurrentPlayer();
    domManager.setActiveBoard(playerBoard);

    let hitted;
    do {
      await delay(1000);

      hitted = game.attack(generateAttackCoords(currentPlayer.board));

      domManager.updateBoard(playerBoard, currentPlayer.board);
      domManager.setActiveBoard(playerBoard);

      if (game.over()) {
        domManager.displayWinner(game.getWinner());
        break;
      }
    } while (hitted);

    game.switchCurrentPlayer();
    await delay(1000);
    domManager.setActiveBoard(computerBoard);
  }

  return {
    init,
  };
})();

export { eventManager };
