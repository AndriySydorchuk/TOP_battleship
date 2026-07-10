import { CONFIG } from "./config";
import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

export function generateGameboard() {
  const gameboard = new Gameboard();

  CONFIG.SHIP_LENGTHS.forEach((SHIP_LEN) => {
    let placed = false;

    do {
      const ship = new Ship(SHIP_LEN);
      const orientation = getRandomOrientation();
      const coordinates = generatePlacementCoords(
        SHIP_LEN,
        orientation,
        gameboard.board,
      );

      try {
        gameboard.placeShip(ship, coordinates, orientation);
        placed = true;
      } catch (error) {
        placed = false;
      }
    } while (!placed);
  });

  return gameboard;
}

function getRandomOrientation() {
  return Math.random() < 0.5
    ? CONFIG.ORIENTATION.HORIZONTAL
    : CONFIG.ORIENTATION.VERTICAL;
}

function generatePlacementCoords(shipLen, orientation, board) {
  let coords;
  let valid;

  do {
    valid = true;

    coords = shiftCoordinates(shipLen, generateRandomCoords(), orientation);

    const dRow = isHorizontal(orientation) ? 0 : 1;
    const dCol = isHorizontal(orientation) ? 1 : 0;

    for (let i = 0; i < shipLen; i++) {
      const r = coords[0] + i * dRow;
      const c = coords[1] + i * dCol;

      if (board[r][c] !== CONFIG.CELL.EMPTY) {
        valid = false;
        break;
      }
    }
  } while (!valid);

  return coords;
}

function shiftCoordinates(shipLen, coordinates, orientation) {
  let [row, col] = coordinates;

  const dRow = isHorizontal(orientation) ? 0 : 1;
  const dCol = isHorizontal(orientation) ? 1 : 0;

  if (row + dRow * shipLen > CONFIG.BOARD_SIZE) {
    row = CONFIG.BOARD_SIZE - dRow * shipLen;
  }

  if (col + dCol * shipLen > CONFIG.BOARD_SIZE) {
    col = CONFIG.BOARD_SIZE - dCol * shipLen;
  }

  return [row, col];
}

function generateRandomCoords() {
  return [
    Math.floor(Math.random() * CONFIG.BOARD_SIZE),
    Math.floor(Math.random() * CONFIG.BOARD_SIZE),
  ];
}

function isHorizontal(orientation) {
  return orientation === CONFIG.ORIENTATION.HORIZONTAL ? true : false;
}

export function containsCoords(arr, coords) {
  return arr.some((e) => JSON.stringify(e) === JSON.stringify(coords));
}

export function generateAttackCoords(gameboard) {
  let coords;

  do {
    coords = generateRandomCoords();
  } while (
    containsCoords(gameboard.missed, coords) ||
    containsCoords(gameboard.hitted, coords)
  );

  return coords;
}

export function resetCell(cellEl) {
  cell.className = "board-cell";
}

export function extractCoords(cellEl) {
  return [Number(cellEl.dataset.row), Number(cellEl.dataset.col)];
}

export function isEqual(arr1, arr2) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

export function calcBufferCoords(coords, options = { diagonalOnly: false }) {
  const [row, col] = coords;

  const offsets = options.diagonalOnly
    ? CONFIG.BUFFER_OFFSETS.DIAGONAL
    : CONFIG.BUFFER_OFFSETS.ALL;

  return offsets.map(([dRow, dCol]) => [row + dRow, col + dCol]);
}

export function isShip(value) {
  return value instanceof Ship;
}
