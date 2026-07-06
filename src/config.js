const CONFIG = (() => {
  const SHIP_PROPERTIES = {
    MIN_LEN: 1,
    MAX_LEN: 4,
  };

  const BOARD_SIZE = 10;

  const CELL = {
    EMPTY: 0,
    BUFFER: -1,
  };

  const COORDINATES_LENGTH = 2;

  const ORIENTATION = {
    HORIZONTAL: "h",
    VERTICAL: "v",
  };

  const PREDEFINED_SHIP_POOL = [
    { shipLen: 4, coordinates: [1, 1], orientation: "v" },
    { shipLen: 3, coordinates: [2, 4], orientation: "h" },
    { shipLen: 3, coordinates: [7, 8], orientation: "v" },
    { shipLen: 2, coordinates: [0, 4], orientation: "h" },
    { shipLen: 2, coordinates: [8, 0], orientation: "h" },
    { shipLen: 2, coordinates: [8, 6], orientation: "v" },
    { shipLen: 1, coordinates: [4, 3], orientation: "h" },
    { shipLen: 1, coordinates: [5, 6], orientation: "h" },
    { shipLen: 1, coordinates: [5, 9], orientation: "h" },
    { shipLen: 1, coordinates: [7, 3], orientation: "h" },
  ];

  const PLAYER_TYPE = {
    REAL: "real",
    COMPUTER: "computer",
  };

  return {
    SHIP_PROPERTIES,
    BOARD_SIZE,
    CELL,
    COORDINATES_LENGTH,
    ORIENTATION,
    PREDEFINED_SHIP_POOL,
    PLAYER_TYPE,
  };
})();

export { CONFIG };
