import { Gameboard } from "../scripts/Gameboard";

test("Gameborad is created", () => {
  const myGameboard = Gameboard();
  expect(myGameboard.boardSpaces).toEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test("Ship is placed in correct position vertically", () => {
  const myGameboard = Gameboard();
  myGameboard.placeShips(5, "vert", 2, 1);
  expect(myGameboard.boardSpaces).toEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 5, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 5, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 5, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 5, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 5, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test("Ship is placed in correct position horizontally", () => {
  const myGameboard = Gameboard();
  myGameboard.placeShips(3, "horiz", 8, 4);
  expect(myGameboard.boardSpaces).toEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 3, 3, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test("Ship is hit shows X in correct space on gameboard", () => {
  const myGameboard = Gameboard();
  myGameboard.placeShips(3, "horiz", 8, 4);
  myGameboard.receiveAttack(8, 5);
  expect(myGameboard.boardSpaces).toEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, "X", 3, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test("Attack misses and records a missed hit on gameboard and Miss! message", () => {
  const myGameboard = Gameboard();
  myGameboard.placeShips(3, "horiz", 8, 4);
  myGameboard.receiveAttack(4, 5);
  expect(myGameboard.boardSpaces).toEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 3, 3, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  expect(myGameboard.getMessage()).toEqual("Miss!");
});

test("Sinking ship records a Hit and Sunk! message", () => {
  const myGameboard = Gameboard();
  myGameboard.placeShips(3, "horiz", 8, 4);
  myGameboard.receiveAttack(8, 4);
  myGameboard.receiveAttack(8, 5);
  myGameboard.receiveAttack(8, 6);
  expect(myGameboard.getMessage()).toEqual("Hit and Sunk!");
});

test("Hitting 3 space ship 2 times records a Hit! message", () => {
  const myGameboard = Gameboard();
  myGameboard.placeShips(3, "horiz", 8, 4);
  myGameboard.receiveAttack(8, 4);
  myGameboard.receiveAttack(8, 6);
  expect(myGameboard.getMessage()).toEqual("Hit!");
});

test("Hitting a spot that has already been hit with an X returns Error! message", () => {
  const myGameboard = Gameboard();
  myGameboard.placeShips(3, "horiz", 8, 4);
  myGameboard.receiveAttack(8, 4);

  expect(myGameboard.receiveAttack(8, 4)).toBe("Error!");
});

test("Hitting a spot that has already been hit with a 1 (miss) returns Error! message", () => {
  const myGameboard = Gameboard();
  myGameboard.placeShips(3, "horiz", 8, 4);
  myGameboard.receiveAttack(3, 4);
  expect(myGameboard.receiveAttack(3, 4)).toBe("Error!");
});

test("Sinking all ships records a Hit and Sunk! You've sunk all my ships! message", () => {
  const myGameboard = Gameboard();
  myGameboard.placeShips(3, "horiz", 8, 3);
  myGameboard.placeShips(2, "horiz", 7, 3);
  myGameboard.placeShips(4, "horiz", 5, 3);
  myGameboard.placeShips(5, "horiz", 6, 3);
  myGameboard.placeShips(6, "horiz", 9, 2);
  myGameboard.receiveAttack(8, 3);
  myGameboard.receiveAttack(8, 4);
  myGameboard.receiveAttack(8, 5);
  myGameboard.receiveAttack(7, 3);
  myGameboard.receiveAttack(7, 4);
  myGameboard.receiveAttack(5, 3);
  myGameboard.receiveAttack(5, 4);
  myGameboard.receiveAttack(5, 5);
  myGameboard.receiveAttack(5, 6);
  myGameboard.receiveAttack(6, 3);
  myGameboard.receiveAttack(6, 4);
  myGameboard.receiveAttack(6, 5);
  myGameboard.receiveAttack(6, 6);
  myGameboard.receiveAttack(6, 7);
  myGameboard.receiveAttack(9, 2);
  myGameboard.receiveAttack(9, 3);
  myGameboard.receiveAttack(9, 4);
  myGameboard.receiveAttack(9, 5);
  myGameboard.receiveAttack(9, 6);
  myGameboard.receiveAttack(9, 7);
  expect(myGameboard.getMessage()).toEqual(
    "Hit and Sunk! You've sunk all my ships!"
  );
  expect(myGameboard.boardSpaces).toEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, "X", "X", "X", "X", 0, 0, 0],
    [0, 0, 0, "X", "X", "X", "X", "X", 0, 0],
    [0, 0, 0, "X", "X", 0, 0, 0, 0, 0],
    [0, 0, 0, "X", "X", "X", 0, 0, 0, 0],
    [0, 0, "X", "X", "X", "X", "X", "X", 0, 0],
  ]);
});
