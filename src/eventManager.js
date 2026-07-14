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

    const computerOption = document.querySelector(".computer");
    const returnBtns = document.querySelectorAll(".return-btn");
    const playBtn = document.querySelector(".play-btn");

    computerOption.addEventListener("click", () => {
      domManager.resetView(setupView);
      domManager.showView(setupView);
    });

    returnBtns.forEach((returnBtn) => {
      returnBtn.addEventListener("click", () => domManager.showView(startView));
    });

    playBtn.addEventListener("click", () => {
      if (game.getCurrentPlayer().board === null) return;

      domManager.resetView(playView);
      domManager.showView(playView);
    });
  }

  function handleComputerOption() {
    const computerOption = document.querySelector(".computer");

    computerOption.addEventListener("click", () => {
      const board = document.querySelector(".setup-view .board");
      game.initPlayers();

      domManager.updateBoard(board, game.getCurrentPlayer().board);
    });
  }

  function handleShuffle() {
    const board = document.querySelector(".setup-view .board");
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

      const [playerBoard, computerBoard] =
        document.querySelectorAll(".play-view .board");

      domManager.updateBoard(playerBoard, currentPlayer.board);
      domManager.setActiveBoard(computerBoard);

      game.switchCurrentPlayer();
    });
  }

  function handleAttack() {
    const boards = document.querySelectorAll(".play-view .board");
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
      domManager.setWonBoard(computerBoard);
      domManager.setLostBoard(playerBoard);
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
        domManager.setWonBoard(playerBoard);
        domManager.setLostBoard(computerBoard);
        break;
      }
    } while (hitted);

    currentPlayer = game.switchCurrentPlayer();

    if (game.over()) {
      domManager.updateBoard(computerBoard, currentPlayer.board);
      domManager.setLostBoard(computerBoard);
    }

    await delay(1000);
    domManager.setActiveBoard(computerBoard);
  }

  return {
    init,
  };
})();

export { eventManager };
