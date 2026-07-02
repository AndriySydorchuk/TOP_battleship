import { experiments } from "webpack";
import { Gameboard } from "../src/gameboard";
import { Ship } from "../src/ship";

describe("testing gameboard behaviour", () => {
  describe.skip("placeShip method", () => {
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

  describe.skip("receiveAttack method", () => {
    test("hits the ship", () => {
      const b = new Gameboard();
      const s = new Ship(1);

      b.placeShip(s, [0, 0]);

      b.receiveAttack([0, 0]);

      expect(s.hits).toBe(1);
      expect(s.isSunk()).toBe(true);
    });

    test("records missed attack", () => {
      const b = new Gameboard();
      const s = new Ship(1);

      b.placeShip(s, [0, 0]);

      b.receiveAttack([0, 1]);
      b.receiveAttack([3, 3]);
      b.receiveAttack([1, 1]);

      expect(b.missed).toContainEqual([0, 1]);
      expect(b.missed).toContainEqual([3, 3]);
      expect(b.missed).toContainEqual([1, 1]);
      expect(b.missed).not.toContainEqual([0, 0]);
    });

    test("throws for already hitted coordinates", () => {
      const b = new Gameboard();
      const s = new Ship(2);

      b.placeShip(s, [0, 0]);
      b.receiveAttack([0, 1]);

      expect(() => b.receiveAttack([0, 1])).toThrow(Error);
      expect(s.hits).toBe(1);
    });

    test("throws for already missed coordinates", () => {
      const b = new Gameboard();
      const s = new Ship(2);

      b.placeShip(s, [0, 0]);
      b.receiveAttack([1, 1]);

      expect(() => b.receiveAttack([1, 1])).toThrow(Error);
    });

    test("throws for invalid coordinates", () => {
      const b = new Gameboard();
      const s = new Ship(1);

      b.placeShip(s, [0, 0]);

      expect(() => b.receiveAttack([-1, -1])).toThrow(RangeError);
      expect(() => b.receiveAttack([1, -1])).toThrow(RangeError);
      expect(() => b.receiveAttack([-1, 1])).toThrow(RangeError);
    });
  });

  describe("allShipsSunk method", () => {
    test("returns undefined for an empty board", () => {
      const b = new Gameboard();

      expect(b.allShipsSunk()).toBeUndefined();
    });

    test("returns false for board with unhitted ships", () => {
      const b = new Gameboard();

      const s = new Ship(2);
      const s2 = new Ship(3);

      b.placeShip(s, [0, 0]);
      b.placeShip(s2, [3, 3]);

      expect(b.allShipsSunk()).toBe(false);
    });

    test("returns false for board with hitted but not sunk ships", () => {
      const b = new Gameboard();

      const s = new Ship(2);
      const s2 = new Ship(3);

      b.placeShip(s, [0, 0]);
      b.placeShip(s2, [3, 3]);

      b.receiveAttack([0, 1]);
      b.receiveAttack([3, 5]);

      expect(b.allShipsSunk()).toBe(false);
    });

    test("returns false for board with not hitted, hitted and sunk ships", () => {
      const b = new Gameboard();

      const s = new Ship(2);
      const s2 = new Ship(3);
      const s3 = new Ship(1);

      b.placeShip(s, [0, 0]);
      b.placeShip(s2, [3, 3]);
      b.placeShip(s3, [6, 6]);

      b.receiveAttack([3, 4]);
      b.receiveAttack([3, 5]);
      b.receiveAttack([6, 6]);

      expect(b.allShipsSunk()).toBe(false);
    });

    test("returns true for board with one sunk ship", () => {
      const b = new Gameboard();

      const s = new Ship(1);

      b.placeShip(s, [3, 3]);

      b.receiveAttack([3, 3]);

      expect(b.allShipsSunk()).toBe(true);
    });

    test("returns true for board with multiple sunk ships", () => {
      const b = new Gameboard();

      const s = new Ship(1);
      const s2 = new Ship(2);

      b.placeShip(s, [3, 3]);
      b.placeShip(s, [0, 0]);

      b.receiveAttack([3, 3]);
      b.receiveAttack([0, 0]);
      b.receiveAttack([0, 1]);

      expect(b.allShipsSunk()).toBe(true);
    });
  });
});
