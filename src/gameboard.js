import { CONFIG } from "./config";
import { Ship } from "./ship";

export class Gameboard {
  #board;
  #missed;
  #hitted;

  constructor() {
    this.#board = Array.from({ length: CONFIG.BOARD_SIZE }, () =>
      Array(CONFIG.BOARD_SIZE).fill(CONFIG.CELL.EMPTY),
    );

    this.#missed = [];
    this.#hitted = [];
  }

  get board() {
    return this.#board;
  }

  get missed() {
    return this.#missed;
  }

  placeShip(ship, coordinates, orientation = CONFIG.ORIENTATION.HORIZONTAL) {
    this.#checkShipValidity(ship);

    coordinates = this.#shiftCoordinates(ship, coordinates, orientation);
    this.#checkCoordinatesValidity(coordinates, { checkOccupied: true });

    this.#checkOrientationValidity(orientation.toLowerCase());

    this.#deployShip(ship, coordinates, orientation.toLowerCase());
  }

  #checkShipValidity(ship) {
    if (!(ship instanceof Ship))
      throw new TypeError("expected instance of Ship as ship argument");
  }

  #shiftCoordinates(ship, coordinates, orientation) {
    if (
      orientation === CONFIG.ORIENTATION.HORIZONTAL &&
      coordinates[1] + ship.length > CONFIG.BOARD_SIZE
    ) {
      coordinates[1] = coordinates[1] - ship.length + 1;
    } else if (coordinates[0] + ship.length > CONFIG.BOARD_SIZE) {
      coordinates[0] = coordinates[0] - ship.length + 1;
    }

    return coordinates;
  }

  #checkCoordinatesValidity(
    coordinates,
    options = { checkOccupied: false, checkAttacked: false },
  ) {
    const [row, col] = coordinates;

    if (coordinates.length !== CONFIG.COORDINATES_LENGTH)
      throw new RangeError(
        `coordinates must contain exactly ${CONFIG.COORDINATES_LENGTH} values`,
      );

    if (
      row < 0 ||
      row >= CONFIG.BOARD_SIZE ||
      col < 0 ||
      col >= CONFIG.BOARD_SIZE
    )
      throw new RangeError("coordinates are out of bounds");

    if (options.checkOccupied && this.#board[row][col])
      throw new Error("provided coordinates are already occupied");

    if (
      options.checkAttacked &&
      (this.#hitted.some(
        (hitCoords) =>
          JSON.stringify(hitCoords) === JSON.stringify(coordinates),
      ) ||
        this.#missed.some(
          (missedCoords) =>
            JSON.stringify(missedCoords) === JSON.stringify(coordinates),
        ))
    )
      throw new Error("already hitted coordinates");
  }

  #checkOrientationValidity(orientation) {
    if (
      orientation !== CONFIG.ORIENTATION.HORIZONTAL &&
      orientation !== CONFIG.ORIENTATION.VERTICAL
    ) {
      throw new TypeError(
        `orientation must be '${CONFIG.ORIENTATION.HORIZONTAL}' - for horizontal or '${CONFIG.ORIENTATION.VERTICAL}' for vertical`,
      );
    }
  }

  #deployShip(ship, coordinates, orientation) {
    const [row, col] = coordinates;

    const dRow = orientation === CONFIG.ORIENTATION.HORIZONTAL ? 0 : 1;
    const dCol = orientation === CONFIG.ORIENTATION.HORIZONTAL ? 1 : 0;

    for (let i = 0; i < ship.length; i++) {
      const r = row + dRow * i;
      const c = col + dCol * i;

      this.#board[r][c] = ship;
    }

    this.#placeBufferZone(ship, coordinates, orientation);
  }

  #placeBufferZone(ship, coordinates, orientation) {
    const [row, col] = coordinates;

    const dRow = orientation === CONFIG.ORIENTATION.HORIZONTAL ? 0 : 1;
    const dCol = orientation === CONFIG.ORIENTATION.HORIZONTAL ? 1 : 0;

    const endRow = row + dRow * (ship.length - 1);
    const endCol = col + dCol * (ship.length - 1);

    for (let r = row - 1; r <= endRow + 1; r++) {
      for (let c = col - 1; c <= endCol + 1; c++) {
        this.#safeMarkCell(r, c, CONFIG.CELL.BUFFER);
      }
    }
  }

  #safeMarkCell(row, col, value) {
    if (
      row < 0 ||
      row >= CONFIG.BOARD_SIZE ||
      col < 0 ||
      col >= CONFIG.BOARD_SIZE
    )
      return;

    if (this.#board[row][col] instanceof Ship) return;

    this.#board[row][col] = value;
  }

  receiveAttack(coordinates) {
    this.#checkCoordinatesValidity(coordinates, { checkAttacked: true });

    const cell = this.#board[coordinates[0]][coordinates[1]];

    if (cell instanceof Ship) {
      cell.hit();
      this.#hitted.push(coordinates);
    } else {
      this.#missed.push(coordinates);
    }
  }

  allShipsSunk() {
    const ships = [];

    this.#board.forEach((line) => {
      line.forEach((cell) => {
        if (cell instanceof Ship && !ships.includes(cell)) ships.push(cell);
      });
    });

    if (ships.length === 0) return;

    return ships.every((ship) => ship.isSunk());
  }
}
