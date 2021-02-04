import { Gameboard } from "../scripts/Gameboard";
import { Player } from "../scripts/Player";

test("Human Player attacks a empty square and records a 1", () => {
  const computerGameboard = Gameboard();
  const humanPlayer = Player(true);
  humanPlayer.attack(computerGameboard, 4, 6);
  expect(computerGameboard.getBoardSpaces()).toEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test("Human Player attacks an enemy ship and records an X", () => {
  const computerGameboard = Gameboard();
  computerGameboard.placeShips(3, "Vertical", 4, 6);
  const humanPlayer = Player(true);
  humanPlayer.attack(computerGameboard, 4, 6);
  humanPlayer.attack(computerGameboard, 5, 6);
  expect(computerGameboard.getBoardSpaces()).toEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, "X", 0, 0, 0],
    [0, 0, 0, 0, 0, 0, "X", 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test("AI Player attacks a squares and doesnt repeat", () => {
  const humanGameboard = Gameboard();
  const computerPlayer = Player(false);
  humanGameboard.placeShips(3, "Vertical", 3, 4);
  for (let i = 0; i < 100; i++) {
    computerPlayer.attack(humanGameboard);
  }
  expect(humanGameboard.getBoardSpaces()).toEqual([
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, "X", 1, 1, 1, 1, 1],
    [1, 1, 1, 1, "X", 1, 1, 1, 1, 1],
    [1, 1, 1, 1, "X", 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ]);
});
