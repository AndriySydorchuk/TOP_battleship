import computerImg from "../assets/computer.png";
import arrowImg from "../assets/arrowleft.svg";
import cross from "../assets/cross.svg";
import point from "../assets/point.svg";

import { CONFIG } from "./config";

import {
  calcBufferCoords,
  containsCoords,
  extractCoords,
  isEqual,
  isShip,
} from "./utils";

const domManager = (() => {
  function init() {
    const main = document.querySelector("main");

    const startView = createStartView();
    const setupView = createSetupView();
    const playView = createPlayView();

    main.append(startView, setupView, playView);

    showView(startView);
  }

  function createStartView() {
    const startView = createElement("div", "start-view");

    const computer = createElement("div", "computer");
    const computerIcon = createElement("img");
    computerIcon.src = computerImg;
    const computerText = createElement("p");
    computerText.textContent = "vs Computer";

    computer.append(computerIcon, computerText);

    startView.append(computer);

    return startView;
  }

  function createElement(tag, selector = "") {
    if (!tag) return;

    const newElement = document.createElement(tag);
    newElement.className = selector;

    return newElement;
  }

  function createSetupView() {
    const setupView = createElement("div", "setup-view");

    const returnSection = createReturnSection();

    const setupContainer = createElement("div", "setup-container");

    const board = createBoard();
    const actions = createActions();

    setupContainer.append(board, actions);

    setupView.append(returnSection, setupContainer);

    return setupView;
  }

  function createReturnSection() {
    const returnContainer = createElement("div", "return-container");

    const returnBtn = createElement("button", "return-btn");
    const returnBtnIcon = createElement("img");
    returnBtnIcon.src = arrowImg;

    returnBtn.append(returnBtnIcon);
    returnContainer.append(returnBtn);

    return returnContainer;
  }

  function createBoard() {
    const board = createElement("div", "board");

    for (let i = 0; i < CONFIG.BOARD_SIZE; i++) {
      const line = createElement("div", "board-line");

      for (let j = 0; j < CONFIG.BOARD_SIZE; j++) {
        const cell = createElement("div", "board-cell");

        cell.dataset.row = i;
        cell.dataset.col = j;

        line.append(cell);
      }

      board.append(line);
    }

    return board;
  }

  function createActions() {
    const actions = createElement("div", "actions");

    const shuffleBtn = createElement("button", "shuffle-btn");
    shuffleBtn.textContent = "Shuffle";

    const playBtn = createElement("button", "play-btn");
    playBtn.textContent = "Play";

    actions.append(shuffleBtn, playBtn);

    return actions;
  }

  function createPlayView() {
    const playView = createElement("div", "play-view");

    const playerBoard = createBoard();
    const computerBoard = createBoard();
    computerBoard.id = "computer";

    playView.append(createReturnSection(), playerBoard, computerBoard);

    return playView;
  }

  function showView(view) {
    resetHeaderTitle();

    switch (view.classList[0]) {
      case "start-view":
        updateHeaderTitle(CONFIG.HEADER.DEFAULT);
        break;
      case "setup-view":
        updateHeaderTitle(CONFIG.HEADER.SETUP);
        break;
      case "play-view":
        updateHeaderTitle(CONFIG.HEADER.PLAY);
        break;
      default:
        break;
    }

    const views = document.querySelectorAll("[class*='view']");

    views.forEach((v) => {
      if (v === view) {
        v.classList.remove("hidden");
      } else {
        v.classList.add("hidden");
      }
    });
  }

  function resetHeaderTitle() {
    const headerTitle = document.querySelector(".header-title");

    headerTitle.textContent = CONFIG.HEADER.DEFAULT;
    headerTitle.className = "header-title";
  }

  function updateBoard(
    boardEl,
    gameboard,
    options = {
      hideShips: false,
    },
  ) {
    if (gameboard === null) return;

    resetBoard(boardEl);

    renderShots(boardEl, gameboard.missed, "miss");
    renderHitted(boardEl, gameboard);

    if (!options.hideShips) {
      renderShips(boardEl, gameboard);
    }

    renderSunkShips(boardEl, gameboard);
  }

  function resetBoard(boardEl) {
    boardEl.className = "board";

    const cells = boardEl.querySelectorAll(".board-cell");
    cells.forEach((cell) => (cell.className = "board-cell"));
  }

  function renderShots(boardEl, shots, selector) {
    const cells = boardEl.querySelectorAll(".board-cell");
    const shotCells = [...cells].filter((cell) =>
      containsCoords(shots, extractCoords(cell)),
    );

    shotCells.forEach((shotCell) => shotCell.classList.add(selector));
  }

  function renderHitted(boardEl, gameboard) {
    renderShots(boardEl, gameboard.hitted, "hit");
    renderBuffer(
      boardEl,
      gameboard,
      (cell) => containsCoords(gameboard.hitted, extractCoords(cell)),
      {
        diagonalOnly: true,
      },
    );
  }

  function renderBuffer(
    boardEl,
    gameboard,
    filterCells,
    options = { diagonalOnly: false },
  ) {
    const cells = boardEl.querySelectorAll(".board-cell");

    const sourceCells = [...cells].filter(filterCells);

    sourceCells.forEach((sCell) => {
      const bufferCoords = calcBufferCoords(extractCoords(sCell), {
        diagonalOnly: options.diagonalOnly,
      });

      bufferCoords.forEach((bCoords) => {
        const bufferCell = [...cells].find((cell) =>
          isEqual(bCoords, extractCoords(cell)),
        );

        if (bufferCell && !bufferCell.classList.contains("hit")) {
          bufferCell.classList.add("miss");
          try {
            gameboard.populateMissed(bCoords);
          } catch (error) {}
        }
      });
    });
  }

  function renderShips(boardEl, gameboard, options = { sunk: false }) {
    const cells = boardEl.querySelectorAll(".board-cell");
    const shipCells = [...cells].filter((cell) => {
      const gCell = gameboard.cell(extractCoords(cell));

      if (isShip(gCell) && (!options.sunk || gCell.isSunk())) return cell;
    });

    shipCells.forEach((sCell) => {
      if (options.sunk) {
        sCell.classList.add("sunk");
      } else {
        sCell.classList.add("ship");
      }
    });
  }

  function renderSunkShips(boardEl, gameboard) {
    renderShips(boardEl, gameboard, { sunk: true });

    renderBuffer(boardEl, gameboard, (cell) => {
      const gCell = gameboard.cell(extractCoords(cell));
      return isShip(gCell) && gCell.isSunk();
    });
  }

  function resetView(view) {
    const boards = view.querySelectorAll(".board");

    boards.forEach((board) => resetBoard(board));
  }

  function displayWinner(winner) {
    const headerTitle = document.querySelector(".header-title");

    if (winner.type === CONFIG.PLAYER_TYPE.COMPUTER) {
      headerTitle.textContent = CONFIG.HEADER.LOSS;
      headerTitle.classList.add("lost");
    } else {
      headerTitle.textContent = CONFIG.HEADER.WIN;
      headerTitle.classList.add("won");
    }
  }

  function activateBoard(boardEl) {
    boardEl.classList.remove("disabled");
    boardEl.classList.add("active");
  }

  function disableBoard(boardEl) {
    boardEl.classList.remove("active");
    boardEl.classList.add("disabled");
  }

  function setActiveBoard(boardToActivate) {
    const playView = document.querySelector(".play-view");
    const boards = playView.querySelectorAll(".board");

    boards.forEach((board) => {
      if (board === boardToActivate) {
        activateBoard(board);
      } else {
        disableBoard(board);
      }
    });
  }

  function setWonBoard(boardEl) {
    boardEl.className = "board over won";
  }

  function setLostBoard(boardEl) {
    boardEl.className = "board over lost";
  }

  function updateHeaderTitle(text) {
    const headerTitle = document.querySelector(".header-title");
    headerTitle.textContent = text;
  }

  return {
    init,
    showView,
    resetView,
    updateBoard,
    displayWinner,
    activateBoard,
    disableBoard,
    setActiveBoard,
    setWonBoard,
    setLostBoard,
  };
})();

export { domManager };
