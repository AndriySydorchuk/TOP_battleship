export class Ship {
  #length;

  constructor(length) {
    if (!Number.isInteger(length))
      throw new TypeError("expected an integer for length");

    if (length < 1 || length > 4)
      throw new RangeError("length must be between 1 and 4");

    this.#length = length;
  }

  get length() {
    return this.#length;
  }
}
