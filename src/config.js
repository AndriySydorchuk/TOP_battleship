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

  const PLAYER_TYPE = {
    REAL: "real",
    COMPUTER: "computer",
  };

  const SHIP_LENGTHS = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

  const BUFFER_OFFSETS = {
    DIAGONAL: [
      [-1, -1],
      [1, 1],
      [1, -1],
      [-1, 1],
    ],
    ALL: [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
      [-1, -1],
      [1, 1],
      [1, -1],
      [-1, 1],
    ],
  };

  const HEADER = {
    DEFAULT: "Battleship",
    WIN: "WIN",
    LOSS: "LOSS",
    SETUP: "Deploy your fleet",
    PLAY: "Combat",
  };

  return {
    SHIP_PROPERTIES,
    BOARD_SIZE,
    CELL,
    COORDINATES_LENGTH,
    ORIENTATION,
    PLAYER_TYPE,
    SHIP_LENGTHS,
    BUFFER_OFFSETS,
    HEADER,
  };
})();

export { CONFIG };
