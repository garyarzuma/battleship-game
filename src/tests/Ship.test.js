const Ship = require("../scripts/Ship");

test("Creates Ship that isn't sunk", () => {
  const myShip = Ship(5);
  expect(myShip.isSunk()).toBe(false);
});

test("Ship gets sunk with length 2", () => {
  const myShip = Ship(2);
  myShip.hit();
  myShip.hit();
  expect(myShip.isSunk()).toBe(true);
});

test("Ship does NOT get sunk with length 5", () => {
  const myShip = Ship(5);
  myShip.hit();
  myShip.hit();
  myShip.hit();
  expect(myShip.isSunk()).toBe(false);
});
