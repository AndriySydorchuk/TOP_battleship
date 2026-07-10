import { domManager } from "./domManager";
import { game } from "./game";
import { generateGameboard } from "./utils";

const eventManager = (() => {
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
      if (game.getCurrPlayer().board === null) return;

      domManager.resetView(playView);
      domManager.showView(playView);
    });
  }

  function handleComputerOption() {
    const computer = document.querySelector(".computer");

    computer.addEventListener("click", () => {
      game.initPlayers();

      const currPlayer = game.getCurrPlayer();

      const setupView = document.querySelector(".setup-view");
      const board = setupView.querySelector(".board");

      domManager.updateBoard(board, currPlayer.board);
    });
  }

  function handleGameStart() {
    const playBtn = document.querySelector(".play-btn");

    playBtn.addEventListener("click", () => {
      const currPlayer = game.getCurrPlayer();
      if (currPlayer.board === null) return;

      const playView = document.querySelector(".play-view");
      const board = playView.querySelector(".board");

      domManager.updateBoard(board, currPlayer.board);

      game.switchCurrPlayer();
    });
  }

  function handleAttack() {
    const playView = document.querySelector(".play-view");
    const [firstBoard, secondBoard] = playView.querySelectorAll(".board");

    const actionCells = secondBoard.querySelectorAll(".board-cell");

    actionCells.forEach((cell) => {
      cell.addEventListener("click", () => {
        if (game.over()) return;

        const coordinates = [
          Number(cell.dataset.row),
          Number(cell.dataset.col),
        ];

        game.play(coordinates);

        if (game.over()) {
          domManager.displayWinner(game.getWinner());
        }

        const players = game.getPlayers();

        domManager.updateBoard(secondBoard, players.second.board, {
          hideShips: true,
        });
        domManager.updateBoard(firstBoard, players.first.board);
      });
    });
  }

  function init() {
    handleViewSwitch();
    handleComputerOption();
    handleShuffle();
    handleGameStart();
    handleAttack();
  }

  function handleShuffle() {
    const setupView = document.querySelector(".setup-view");
    const board = setupView.querySelector(".board");
    const shuffleBtn = document.querySelector(".shuffle-btn");

    shuffleBtn.addEventListener("click", () => {
      const currPlayer = game.getCurrPlayer();
      currPlayer.board = generateGameboard();

      domManager.updateBoard(board, currPlayer.board);
    });
  }

  return {
    handleViewSwitch,
    handleComputerOption,
    handleGameStart,
    handleAttack,
    init,
  };
})();

export { eventManager };
