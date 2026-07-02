import { Ship } from "./ship";

export class Gameboard {
  #board;
  #missed;
  #hitted;

  constructor() {
    this.#board = Array.from({ length: 10 }, () => Array(10).fill(0));

    this.#missed = [];
    this.#hitted = [];
  }

  get board() {
    return this.#board;
  }

  get missed() {
    return this.#missed;
  }

  placeShip(ship, coordinates, orientation = "h") {
    this.#checkShipValidity(ship);
    this.#checkCoordinatesValidity(coordinates, { checkOccupied: true });
    this.#checkOrientationValidity(orientation.toLowerCase());

    this.#deployShip(ship, coordinates, orientation.toLowerCase());
  }

  #checkShipValidity(ship) {
    if (!(ship instanceof Ship))
      throw new TypeError("expected instance of Ship as ship argument");
  }

  #checkCoordinatesValidity(
    coordinates,
    options = { checkOccupied: false, checkAttacked: false },
  ) {
    const [row, col] = coordinates;

    if (coordinates.length !== 2)
      throw new RangeError(
        "coordinates must contain exactly two values: [row, col]",
      );

    if (
      row < 0 ||
      row >= this.#board.length ||
      col < 0 ||
      col >= this.#board.length
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
    if (orientation !== "h" && orientation !== "v") {
      throw new TypeError(
        "orientation must be 'h' - for horizontal or 'v' for vertical",
      );
    }
  }

  #deployShip(ship, coordinates, orientation) {
    const [row, col] = coordinates;

    const dRow = orientation === "h" ? 0 : 1;
    const dCol = orientation === "h" ? 1 : 0;

    for (let i = 0; i < ship.length; i++) {
      const r = row + dRow * i;
      const c = col + dCol * i;

      this.#board[r][c] = ship;
    }

    this.#placeBufferZone(ship, coordinates, orientation);
  }

  #placeBufferZone(ship, coordinates, orientation) {
    const [row, col] = coordinates;

    const dRow = orientation === "h" ? 0 : 1;
    const dCol = orientation === "h" ? 1 : 0;

    for (let i = 0; i < ship.length; i++) {
      const r = row + dRow * i;
      const c = col + dCol * i;

      this.#safeMarkCell(r + dCol, c + dRow, -1);
      this.#safeMarkCell(r - dCol, c - dRow, -1);
    }

    for (let i = -1; i < ship.length + 1; i++) {
      const r = row + dRow * i;
      const c = col + dCol * i;

      this.#safeMarkCell(r - dRow, c - dCol, -1);
      this.#safeMarkCell(r + dRow * ship.length, c + dCol * ship.length, -1);
    }
  }

  #safeMarkCell(row, col, value) {
    if (
      row < 0 ||
      row >= this.#board.length ||
      col < 0 ||
      col >= this.#board[0].length
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
}
