import { Player } from "../src/player";
import { Gameboard } from "../src/gameboard";

describe("testing Player behaviour", () => {
  describe("constructor", () => {
    test("throws for invalid player type", () => {
      expect(() => new Player("bot")).toThrow(TypeError);
    });

    test("creates player with type 'real'", () => {
      const p = new Player("real");

      expect(p.type).toBe("real");
    });

    test("creates player with type 'computer'", () => {
      const p = new Player("computer");

      expect(p.type).toBe("computer");
    });

    test("creates player with it's own gameboard", () => {
      const rB = new Gameboard();
      const cB = new Gameboard();

      const r = new Player("real", rB);
      const c = new Player("computer", cB);

      expect(r.board).toEqual(rB);
      expect(c.board).toEqual(cB);
    });
  });
});
