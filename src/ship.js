export class Ship {
  #length;
  #hits;
  #sunk;

  constructor(length) {
    if (!Number.isInteger(length))
      throw new TypeError("expected an integer for length");

    if (length < 1 || length > 4)
      throw new RangeError("length must be between 1 and 4");

    this.#length = length;
    this.#hits = 0;
    this.#sunk = false;
  }

  get length() {
    return this.#length;
  }

  get hits() {
    return this.#hits;
  }

  hit() {
    if (this.#hits + 1 <= this.#length) {
      this.#hits++;
    }

    if (this.#hits === this.#length) {
      this.#sunk = true;
    }
  }

  isSunk() {
    return this.#sunk;
  }
}
