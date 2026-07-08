import { domManager } from "./domManager";
import { game } from "./game";

const eventManager = (() => {
  function handleViewSwitch() {
    const startView = document.querySelector(".start-view");
    const setupView = document.querySelector(".setup-view");
    const playView = document.querySelector(".play-view");

    const computer = document.querySelector(".computer");
    computer.addEventListener("click", () => {
      domManager.resetSetupView();
      domManager.showView(setupView);
    });

    const returnBtns = document.querySelectorAll(".return-btn");
    returnBtns.forEach((returnBtn) => {
      returnBtn.addEventListener("click", () => domManager.showView(startView));
    });

    const playBtn = document.querySelector(".play-btn");
    playBtn.addEventListener("click", () => {
      domManager.resetPlayView();
      domManager.showView(playView);
    });
  }

  function handleSetup() {
    const computer = document.querySelector(".computer");

    computer.addEventListener("click", () => {
      game.initPlayers();

      const currPlayer = game.getCurrPlayer();

      const setupView = document.querySelector(".setup-view");
      const board = setupView.querySelector(".board");

      domManager.updateBoard(board, currPlayer.board);
    });
  }

  function handlePlay() {
    const playBtn = document.querySelector(".play-btn");

    playBtn.addEventListener("click", () => {
      const currPlayer = game.getCurrPlayer();

      const playView = document.querySelector(".play-view");
      const board = playView.querySelector(".board");

      domManager.updateBoard(board, currPlayer.board);
    });
  }

  return { handleViewSwitch, handleSetup, handlePlay };
})();

export { eventManager };
