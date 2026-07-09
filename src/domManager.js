import computerImg from "../assets/computer.png";
import arrowImg from "../assets/arrowleft.svg";
import cross from "../assets/cross.svg";
import point from "../assets/point.svg";
import { CONFIG } from "./config";

const domManager = (() => {
  function createStartView() {
    const startView = document.createElement("div");
    startView.classList.add("start-view");

    const computer = document.createElement("div");
    computer.classList.add("computer");

    const computerIcon = document.createElement("img");
    computerIcon.src = computerImg;

    const computerText = document.createElement("p");
    computerText.textContent = "vs Computer";

    computer.append(computerIcon, computerText);

    startView.append(computer);

    return startView;
  }

  function createSetupView() {
    const setupView = document.createElement("div");
    setupView.classList.add("setup-view");

    const returnSection = createReturnSection();

    const setupContainer = document.createElement("div");
    setupContainer.classList.add("setup-container");

    const board = createBoard();
    const shipPool = createShipPool();
    const actions = createActions();

    setupContainer.append(board, shipPool, actions);

    setupView.append(returnSection, setupContainer);

    return setupView;
  }

  function createReturnSection() {
    const returnContainer = document.createElement("div");
    returnContainer.classList.add("return-container");

    const returnBtn = document.createElement("button");
    returnBtn.classList.add("return-btn");

    const returnBtnIcon = document.createElement("img");
    returnBtnIcon.src = arrowImg;

    returnBtn.append(returnBtnIcon);
    returnContainer.append(returnBtn);

    return returnContainer;
  }

  function createBoard() {
    const board = document.createElement("div");
    board.classList.add("board");

    for (let i = 0; i < CONFIG.BOARD_SIZE; i++) {
      const line = document.createElement("div");
      line.classList.add("board-line");

      for (let j = 0; j < CONFIG.BOARD_SIZE; j++) {
        const cell = document.createElement("div");
        cell.classList.add("board-cell");
        cell.dataset.row = i;
        cell.dataset.col = j;

        line.append(cell);
      }

      board.append(line);
    }

    return board;
  }

  function createShipPool() {
    const shipPool = document.createElement("div");
    shipPool.classList.add("ship-pool");

    CONFIG.SHIP_POOL.forEach((entry) => {
      const ship = document.createElement("div");
      ship.classList.add("ship", `ship-${entry.shipLen}`);

      shipPool.append(ship);
    });

    return shipPool;
  }

  function createActions() {
    const actions = document.createElement("div");
    actions.classList.add("actions");

    const shuffleBtn = document.createElement("button");
    shuffleBtn.classList.add("shuffle-btn");
    shuffleBtn.textContent = "Shuffle";

    const playBtn = document.createElement("button");
    playBtn.classList.add("play-btn");
    playBtn.textContent = "Play";

    actions.append(shuffleBtn, playBtn);

    return actions;
  }

  function createPlayView() {
    const playView = document.createElement("div");
    playView.classList.add("play-view");

    const returnSection = createReturnSection();
    const boards = [createBoard(), createBoard()];

    playView.append(returnSection, ...boards);

    return playView;
  }

  function showView(view) {
    resetHeaderTitle();

    const views = document.querySelectorAll("[class*='view']");

    views.forEach((v) => {
      if (v === view) {
        v.classList.remove("hidden");
      } else {
        v.classList.add("hidden");
      }
    });
  }

  function resetSetupView() {
    const setupView = document.querySelector(".setup-view");

    const boardCells = setupView.querySelectorAll(".board-cell");
    boardCells.forEach((cell) => {
      cell.className = "board-cell";
      cell.innerHTML = "";
    });

    const shipPool = setupView.querySelector(".ship-pool");
    const ships = shipPool.querySelectorAll("div");
    ships.forEach((ship) => ship.classList.remove("missing"));
  }

  function resetPlayView() {
    const playView = document.querySelector(".play-view");

    const boards = playView.querySelectorAll(".board");

    boards.forEach((board) => {
      board.className = "board";

      const cells = playView.querySelectorAll(".board-cell");
      cells.forEach((cell) => {
        cell.className = "board-cell";
        cell.innerHTML = "";
      });
    });
  }

  function updateBoard(
    boardEl,
    gameboard,
    options = {
      hideShips: false,
    },
  ) {
    const cells = boardEl.querySelectorAll(".board-cell");

    const missedCells = [...cells].filter((cell) => {
      const cellCoordinates = [
        Number(cell.dataset.row),
        Number(cell.dataset.col),
      ];

      if (
        gameboard.missed.some(
          (m) => JSON.stringify(cellCoordinates) === JSON.stringify(m),
        )
      )
        return cell;
    });
    missedCells.forEach((mCell) => mCell.classList.add("miss"));

    const hittedCells = [...cells].filter((cell) => {
      const cellCoordinates = [
        Number(cell.dataset.row),
        Number(cell.dataset.col),
      ];

      if (
        gameboard.hitted.some(
          (h) => JSON.stringify(h) === JSON.stringify(cellCoordinates),
        )
      )
        return cell;
    });
    hittedCells.forEach((hCell) => hCell.classList.add("hit"));

    const shipCells = [...cells].filter((cell) => {
      const cRow = Number(cell.dataset.row);
      const cCol = Number(cell.dataset.col);

      const gameboardCell = gameboard.board[cRow][cCol];

      if (
        !options.hideShips &&
        gameboardCell !== CONFIG.CELL.EMPTY &&
        gameboardCell !== CONFIG.CELL.BUFFER
      )
        return cell;
    });
    shipCells.forEach((sCell) => sCell.classList.add("ship"));
  }

  function displayWinner(winner) {
    const headerTitle = document.querySelector(".header-title");

    if (winner.type === CONFIG.PLAYER_TYPE.COMPUTER) {
      headerTitle.textContent = "LOSS";
    } else {
      headerTitle.textContent = "WIN";
    }
  }

  function resetHeaderTitle() {
    const headerTitle = document.querySelector(".header-title");
    headerTitle.textContent = "Battleship";
  }

  function init() {
    const main = document.querySelector("main");

    const startView = createStartView();
    const setupView = createSetupView();
    const playView = createPlayView();

    main.append(startView, setupView, playView);

    showView(startView);
  }

  return {
    createStartView,
    createSetupView,
    createPlayView,
    showView,
    resetSetupView,
    resetPlayView,
    updateBoard,
    displayWinner,
    init,
  };
})();

export { domManager };
