import { Gameboard } from "./gameboard";

export class Player {
  #type;
  #board;

  constructor(type, board = null) {
    if (type !== "real" && type !== "computer")
      throw new TypeError("expected real or computer player type");

    this.#type = type;
    this.board = board;
  }

  get type() {
    return this.#type;
  }

  get board() {
    return this.#board;
  }

  set board(newBoard) {
    if (!(newBoard instanceof Gameboard) && newBoard !== null)
      throw new TypeError(
        "expected instance of Gameboard or null as board argument",
      );

    this.#board = newBoard;
  }
}
