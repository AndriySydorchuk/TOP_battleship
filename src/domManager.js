import computerImg from "../assets/computer.png";
import arrowleft from "../assets/arrowleft.svg";
import { CONFIG } from "./config";
import { game } from "./game";

const domManager = (() => {
  const startView = document.querySelector(".start-view");
  const setupView = document.querySelector(".setup-view");

  function createStartViewContent() {
    const computerOption = document.createElement("div");
    computerOption.classList.add("computer-option");

    const computerOptionImg = document.createElement("img");
    computerOptionImg.src = computerImg;

    const computerOptionText = document.createElement("p");
    computerOptionText.textContent = "vs Computer";

    computerOption.append(computerOptionImg, computerOptionText);

    startView.append(computerOption);
  }

  function createSetupViewContent() {
    createReturnSection();

    const setupContainer = document.createElement("div");
    setupContainer.classList.add("setup-container");

    setupView.append(setupContainer);

    createBoard();
    // renderShips();
    // renderActions();
  }

  function createReturnSection() {
    const returnContainer = document.createElement("div");
    returnContainer.classList.add("return-container");

    const returnBtn = document.createElement("button");
    returnBtn.classList.add("return-btn");

    const returnBtnImg = document.createElement("img");
    returnBtnImg.src = arrowleft;

    returnBtn.append(returnBtnImg);

    returnContainer.append(returnBtn);

    setupView.append(returnContainer);
  }

  function createBoard(gameboard) {
    const setupContainer = document.querySelector(".setup-container");

    const board = document.createElement("div");
    board.classList.add("board");

    gameboard.forEach((line, i) => {
      const lineEl = document.createElement("div");
      lineEl.classList.add("board-line");
      lineEl.dataset.row = i;

      line.forEach((cell, j) => {
        const cellEl = document.createElement("div");
        cellEl.classList.add("board-cell");
        cellEl.dataset.col = j;

        if (cell !== CONFIG.CELL.EMPTY && cell !== CONFIG.CELL.BUFFER) {
          cellEl.classList.add("occupied");
        }

        lineEl.append(cellEl);
      });

      board.append(lineEl);
    });

    setupContainer.append(board);
  }

  function renderShips() {
    const boardContentEl = document.querySelector(".board-content");

    const shipBoxEl = document.createElement("div");
    shipBoxEl.classList.add("ship-box");

    const boardCellEl = document.querySelector(".board-cell");

    game.getShipsPool().forEach((ship) => {
      const shipEl = document.createElement("div");
      shipEl.classList.add("ship", `ship-${ship.length}`);

      shipBoxEl.append(shipEl);
    });

    boardContentEl.append(shipBoxEl);
  }

  function renderActions() {
    const boardContentEl = document.querySelector(".board-content");

    const actionsBoxEl = document.createElement("div");
    actionsBoxEl.classList.add("actions-box");

    const shuffleBtn = document.createElement("button");
    shuffleBtn.classList.add("shuffle-btn");
    shuffleBtn.textContent = "Shuffle";

    const playBtn = document.createElement("button");
    playBtn.classList.add("play-btn");
    playBtn.textContent = "Play";

    actionsBoxEl.append(shuffleBtn, playBtn);

    boardContentEl.append(actionsBoxEl);
  }

  function showSetupView() {
    startView.classList.add("hidden");
    setupView.classList.remove("hidden");
  }

  function showStartView() {
    startView.classList.remove("hidden");
    setupView.classList.add("hidden");
  }

  return {
    createStartViewContent,
    createSetupViewContent,
    showStartView,
    showSetupView,
  };
})();

export { domManager };
