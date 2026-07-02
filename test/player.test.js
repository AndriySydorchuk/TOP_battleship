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

    test("throws for non Gameboard or not null board", () => {
      expect(() => new Player("real", [[], []])).toThrow(TypeError);
      expect(() => new Player("computer", { board: true })).toThrow(TypeError);
    });
  });

  describe("board setter", () => {
    test("throws for non Gameboard or not null board", () => {
      const p = new Player("real");

      expect(() => (p.board = [[], []])).toThrow(TypeError);
      expect(() => (p.board = { board: true })).toThrow(TypeError);
    });

    test("sets board", () => {
      const p = new Player("real");
      const pB = new Gameboard();

      p.board = pB;

      expect(p.board).not.toBeNull();
      expect(p.board).toEqual(pB);
    });

    test("sets new board", () => {
      const pB = new Gameboard();
      const p = new Player("real", pB);

      const newPB = new Gameboard();
      p.board = newPB;

      expect(p.board).not.toBe(pB);
      expect(p.board).not.toBeNull();
      expect(p.board).toBe(newPB);
    });

    test("resets board to null", () => {
      const p = new Player("real", new Gameboard());

      p.board = null;

      expect(p.board).not.toEqual(new Gameboard());
      expect(p.board).toBeNull();
    });
  });
});
