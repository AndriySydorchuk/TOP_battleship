import { experiments } from "webpack";
import { Gameboard } from "../src/gameboard";
import { Ship } from "../src/ship";

describe("testing gameboard behaviour", () => {
  describe("placeShip method", () => {
    test("places ship horizontally", () => {
      const b = new Gameboard();
      const s = new Ship(3);

      b.placeShip(s, [0, 0]);

      expect(b.board[0][0]).toEqual(s);
      expect(b.board[0][1]).toEqual(s);
      expect(b.board[0][2]).toEqual(s);
    });

    test("places ship vertically", () => {
      const b = new Gameboard();
      const s = new Ship(3);

      b.placeShip(s, [0, 0], "v");

      expect(b.board[0][0]).toEqual(s);
      expect(b.board[1][0]).toEqual(s);
      expect(b.board[2][0]).toEqual(s);
    });

    test("throws range error for more than 2 values inside coordinates argument", () => {
      const b = new Gameboard();
      const s = new Ship(2);

      expect(() => b.placeShip(s, [0, 0, 0])).toThrow(RangeError);
    });

    test("throws type error for invalid orientation", () => {
      const b = new Gameboard();
      const s = new Ship(2);

      expect(() => b.placeShip(s, [0, 0], "center")).toThrow(TypeError);
    });

    test("throws an error for already occupied coordinates", () => {
      const b = new Gameboard();
      const s = new Ship(2);

      b.placeShip(s, [0, 0]);

      expect(() => b.placeShip(s, [0, 0])).toThrow(Error);
    });

    test("throws an error if ship would be adjacent to an existing ship", () => {
      const b = new Gameboard();
      const s = new Ship(2);

      b.placeShip(s, [0, 0]);

      expect(() => b.placeShip(s, [1, 0], "v")).toThrow(Error);
    });

    test("throws an error when trying to place ship off the board", () => {
      const b = new Gameboard();
      const s = new Ship(2);

      expect(() => b.placeShip(s, [-1, -1])).toThrow(RangeError);
      expect(() => b.placeShip(s, [1, -1])).toThrow(RangeError);
      expect(() => b.placeShip(s, [-1, 1])).toThrow(RangeError);
      expect(() => b.placeShip(s, [-1, -1], "v")).toThrow(RangeError);
      expect(() => b.placeShip(s, [1, -1], "v")).toThrow(RangeError);
      expect(() => b.placeShip(s, [-1, 1], "v")).toThrow(RangeError);
    });

    test("throws for non Ship ship argument", () => {
      const b = new Gameboard();

      expect(() => b.placeShip({ ship: true }, [0, 0])).toThrow(TypeError);
      expect(() => b.placeShip({ ship: true }, [0, 0], "v")).toThrow(TypeError);
      expect(() => b.placeShip("ship", [0, 0])).toThrow(TypeError);
    });
  });
});
