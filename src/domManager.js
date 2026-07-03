import computerImage from "../assets/computer.png";
import arrowleft from "../assets/arrowleft.svg";

import { game } from "./game";

const domManager = (() => {
  function renderViews() {
    renderStartView();
    renderBoardView();
  }

  function renderStartView() {
    const startViewEl = document.querySelector(".start-view");

    const computerBox = document.createElement("div");
    computerBox.classList.add("computer-box");

    const computerBoxImage = document.createElement("img");
    computerBoxImage.classList.add("computer-box-image");
    computerBoxImage.src = computerImage;

    const computerBoxText = document.createElement("p");
    computerBoxText.textContent = "vs Computer";

    computerBox.append(computerBoxImage, computerBoxText);

    startViewEl.append(computerBox);
  }

  function renderBoardView() {
    renderGoBackSection();

    const boardViewEl = document.querySelector(".board-view");

    const boardContentEl = document.createElement("div");
    boardContentEl.classList.add("board-content");

    boardViewEl.append(boardContentEl);

    renderBoard();
    renderShips();
    renderActions();
  }

  function renderGoBackSection() {
    const boardViewEl = document.querySelector(".board-view");

    const topEl = document.createElement("div");
    topEl.classList.add("top");

    const backBtn = document.createElement("button");
    backBtn.classList.add("back-btn");

    const backBtnImg = document.createElement("img");
    backBtnImg.src = arrowleft;
    backBtnImg.classList.add("back-btn-img");

    backBtn.append(backBtnImg);

    topEl.append(backBtn);

    boardViewEl.append(topEl);
  }

  function renderBoard() {
    const boardContentEl = document.querySelector(".board-content");

    const boardEl = document.createElement("div");
    boardEl.classList.add("board");

    for (let i = 0; i < 10; i++) {
      const lineEl = document.createElement("div");
      lineEl.classList.add("board-line");

      for (let j = 0; j < 10; j++) {
        const cellEl = document.createElement("div");
        cellEl.classList.add("board-cell");

        lineEl.append(cellEl);
      }

      boardEl.append(lineEl);
    }

    boardContentEl.append(boardEl);
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

  function showBoardView() {
    const startViewEl = document.querySelector(".start-view");
    const boardViewEl = document.querySelector(".board-view");

    startViewEl.classList.add("hidden");
    boardViewEl.classList.remove("hidden");
  }

  function showStartView() {
    const startViewEl = document.querySelector(".start-view");
    const boardViewEl = document.querySelector(".board-view");

    startViewEl.classList.remove("hidden");
    boardViewEl.classList.add("hidden");
  }

  return { renderViews, showStartView, showBoardView };
})();

export { domManager };
