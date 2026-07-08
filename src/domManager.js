import computerImg from "../assets/computer.png";
import arrowleft from "../assets/arrowleft.svg";
import cross from "../assets/cross.svg";
import point from "../assets/point.svg";
import { CONFIG } from "./config";

const domManager = (() => {
  const startView = document.querySelector(".start-view");
  const setupView = document.querySelector(".setup-view");
  const playView = document.querySelector(".play-view");
  let setupContainer;

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

  function createSetupViewContent(gameboard) {
    createReturnSection();

    setupContainer = document.createElement("div");
    setupContainer.classList.add("setup-container");

    setupView.append(setupContainer);

    createBoardSection(gameboard);
    createShipPoolSection();
    createActionsSection();
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

  function createBoardSection(gameboard) {
    const board = document.createElement("div");
    board.classList.add("board");

    gameboard.board.forEach((line, i) => {
      const lineEl = document.createElement("div");
      lineEl.classList.add("board-line");

      line.forEach((cell, j) => {
        const cellEl = document.createElement("div");
        cellEl.classList.add("board-cell");
        cellEl.dataset.row = i;
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

  function createShipPoolSection(gameboard) {
    const shipPool = document.createElement("div");
    shipPool.classList.add("ship-pool");

    CONFIG.PREDEFINED_SHIP_POOL.forEach((entry) => {
      const ship = document.createElement("div");
      ship.classList.add("ship", `ship-${entry.shipLen}`);

      const [row, col] = entry.coordinates;
      const correspondingCell = document
        .querySelectorAll(".board-line")
        [row].querySelectorAll(".board-cell")[col];

      if (correspondingCell.classList.contains("occupied")) {
        ship.classList.add("missing");
      }

      shipPool.append(ship);
    });

    setupContainer.append(shipPool);
  }

  function createActionsSection() {
    const actionsContainer = document.createElement("div");
    actionsContainer.classList.add("actions-container");

    const shuffleBtn = document.createElement("button");
    shuffleBtn.classList.add("shuffle-btn");
    shuffleBtn.textContent = "Shuffle";

    const playBtn = document.createElement("button");
    playBtn.classList.add("play-btn");
    playBtn.textContent = "Play";

    actionsContainer.append(shuffleBtn, playBtn);

    setupContainer.append(actionsContainer);
  }

  function createPlayViewContent(player1, player2) {
    const playContainer = document.createElement("div");
    playContainer.classList.add("play-container");

    const player1Board = createBoard(player1);
    const player2Board = createBoard(player2, { hideShips: true });

    playContainer.append(player1Board, player2Board);

    playView.append(playContainer);
  }

  function createBoard(player, options = { hideShips: false }) {
    const board = document.createElement("div");
    board.classList.add("board");
    board.id = `${player.type}Board`;

    player.board.board.forEach((line, i) => {
      const lineEl = document.createElement("div");
      lineEl.classList.add("board-line");

      line.forEach((cell, j) => {
        const cellEl = document.createElement("div");
        cellEl.classList.add("board-cell");
        cellEl.dataset.row = i;
        cellEl.dataset.col = j;

        if (
          cell !== CONFIG.CELL.EMPTY &&
          cell !== CONFIG.CELL.BUFFER &&
          !options.hideShips
        ) {
          cellEl.classList.add("occupied");
        }

        lineEl.append(cellEl);
      });

      board.append(lineEl);
    });

    return board;
  }

  function showSetupView() {
    setupView.classList.remove("hidden");
    setupContainer.classList.remove("hidden");

    startView.classList.add("hidden");
    playView.classList.add("hidden");
  }

  function showStartView() {
    startView.classList.remove("hidden");

    setupView.classList.add("hidden");
    setupContainer.classList.add("hidden");
    playView.classList.add("hidden");
  }

  function showPlayView() {
    playView.classList.remove("hidden");

    startView.classList.add("hidden");
    setupContainer.classList.add("hidden");
  }

  function disableBoard(player) {
    const playerBoard = document.getElementById(`${player.type}Board`);

    playerBoard.classList.remove("active");
    playerBoard.classList.add("disabled");
  }

  function activateBoard(player) {
    const playerBoard = document.getElementById(`${player.type}Board`);

    playerBoard.classList.remove("disable");
    playerBoard.classList.add("active");
  }

  function updateBoard(gameboard) {
    renderShots(gameboard.missed, { class: "miss", mark: point });
    renderShots(gameboard.hitted, { class: "hit", mark: cross });
  }

  function toggleBoards() {
    const activeBoard = document.querySelector(".board.active");
    const disabledBoard = document.querySelector(".board.disabled");

    activeBoard.classList.remove("active");
    disabledBoard.classList.remove("disabled");

    activeBoard.classList.add("disabled");
    disabledBoard.classList.add("active");
  }

  function renderShots(
    shots,
    state = {
      class: "",
      mark: "",
    },
  ) {
    const board = document.querySelector(".board.active");
    const cells = board.querySelectorAll(".board-cell");

    shots.forEach((shot) => {
      const [sRow, sCol] = shot;

      const cell = [...cells].find(
        (cell) =>
          Number(cell.dataset.row) === sRow &&
          Number(cell.dataset.col) === sCol,
      );

      if (cell) {
        cell.classList.add(state.class);
        markCell(cell, state.mark);
      }
    });
  }

  function markCell(cell, imgSrc) {
    let cellImg = cell.firstElementChild;
    if (cellImg) return;

    cellImg = document.createElement("img");
    cellImg.src = imgSrc;

    cell.append(cellImg);
  }

  return {
    createStartViewContent,
    createSetupViewContent,
    createPlayViewContent,
    showStartView,
    showSetupView,
    showPlayView,
    disableBoard,
    activateBoard,
    updateBoard,
    toggleBoards,
  };
})();

export { domManager };
