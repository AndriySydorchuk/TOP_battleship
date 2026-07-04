import { CONFIG } from "./config";
import { Gameboard } from "./gameboard";

export class Player {
  #type;
  #board;

  constructor(type, board = null) {
    if (
      type !== CONFIG.PLAYER_TYPE.REAL &&
      type !== CONFIG.PLAYER_TYPE.COMPUTER
    )
      throw new TypeError(
        `expected ${CONFIG.PLAYER_TYPE.REAL} or ${CONFIG.PLAYER_TYPE.COMPUTER} as player type`,
      );

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
