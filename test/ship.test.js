import { Ship } from "../src/ship";

describe("testing ship behaviour", () => {
  describe("constructor", () => {
    test("throws type error for string length input", () => {
      expect(() => new Ship("hello")).toThrow(TypeError);
    });

    test("throws type error for float number length input", () => {
      expect(() => new Ship(3.5)).toThrow(TypeError);
    });

    test("throws range error for 0 length input", () => {
      expect(() => new Ship(0)).toThrow(RangeError);
    });

    test("throws range error for negative length input", () => {
      expect(() => new Ship(-3)).toThrow(RangeError);
    });

    test("throws range error for 5 length input", () => {
      expect(() => new Ship(5)).toThrow(RangeError);
    });

    test("inits hits to 0 by default", () => {
      const s = new Ship(2);
      expect(s.hits).toBe(0);
    });
  });

  describe("length getter", () => {
    test("returns 1 for length", () => {
      const ship = new Ship(1);
      expect(ship.length).toBe(1);
    });

    test("returns 2 for length", () => {
      const ship = new Ship(2);
      expect(ship.length).toBe(2);
    });

    test("returns 3 for length", () => {
      const ship = new Ship(3);
      expect(ship.length).toBe(3);
    });

    test("returns 4 for length", () => {
      const ship = new Ship(4);
      expect(ship.length).toBe(4);
    });
  });

  describe("hits getter", () => {
    test("returns 0 for new ship instance", () => {
      const s = new Ship(2);
      expect(s.hits).toBe(0);
    });

    test("returns 1 for once hitted ship", () => {
      const s = new Ship(2);
      s.hit();
      expect(s.hits).toBe(1);
    });

    test("returns 1 for twice hitted ship", () => {
      const s = new Ship(2);
      s.hit();
      s.hit();
      expect(s.hits).toBe(2);
    });
  });

  describe("hit method", () => {
    test("increases hits from 0 to 1", () => {
      const s = new Ship(2);
      expect(s.hits).toBe(0);
      s.hit();
      expect(s.hits).toBe(1);
    });

    test("increases hits from 1 to 2", () => {
      const s = new Ship(2);
      expect(s.hits).toBe(0);
      s.hit();
      s.hit();
      expect(s.hits).toBe(2);
    });

    test("increases hits by 1", () => {
      const s = new Ship(3);
      expect(s.hits).toBe(0);
      s.hit();
      expect(s.hits).toBe(1);
      s.hit();
      expect(s.hits).toBe(2);
    });
  });

  describe("isSunk method", () => {
    test("returns false for newly created ship", () => {
      const s = new Ship(2);
      expect(s.isSunk()).toBe(false);
    });

    test("returns false for 2 length ship with 1 hit", () => {
      const s = new Ship(2);
      s.hit();
      expect(s.isSunk()).toBe(false);
    });

    test("returns true for 2 length ship with 2 hits", () => {
      const s = new Ship(2);
      s.hit();
      s.hit();
      expect(s.isSunk()).toBe(true);
    });
  });
});
