import { Ship } from "../src/ship";

describe("testing ship behaviour", () => {
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
});
