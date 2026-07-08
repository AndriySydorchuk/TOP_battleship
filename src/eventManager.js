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

      game.initPlayers();
      const currPlayer = game.getCurrPlayer();

      domManager.updateBoard(currPlayer.board);
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

  return { handleViewSwitch };
})();

export { eventManager };
