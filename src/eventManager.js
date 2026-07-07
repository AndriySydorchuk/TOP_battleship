import { domManager } from "./domManager";
import { game } from "./game";

const eventManager = (() => {
  function handleViewSwitch() {
    handleStartViewSwitch();
    handleSetupViewSwitch();
    handlePlayViewSwitch();
  }

  function handleSetupViewSwitch() {
    const computerOption = document.querySelector(".computer-option");

    computerOption.addEventListener("click", () => domManager.showSetupView());
  }

  function handleStartViewSwitch() {
    const returnBtn = document.querySelector(".return-btn");

    returnBtn.addEventListener("click", () => domManager.showStartView());
  }

  function handlePlayViewSwitch() {
    const playBtn = document.querySelector(".play-btn");

    playBtn.addEventListener("click", () => domManager.showPlayView());
  }

  function handlePlayBtn(player1, player2) {
    const playBtn = document.querySelector(".play-btn");

    playBtn.addEventListener("click", () => {
      domManager.disableBoard(player1);
      domManager.activateBoard(player2);

      handleCellsClick();
    });
  }

  function handleCellsClick() {
    const board = document.querySelector(".board.active");
    const cells = board.querySelectorAll(".board-cell");

    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        const coordinates = [cell.dataset.row, cell.dataset.col];

        const hitted = game.attack(coordinates);
        domManager.updateCell(cell, hitted);
      });
    });
  }

  return { handleViewSwitch, handlePlayBtn };
})();

export { eventManager };
