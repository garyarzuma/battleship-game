const Ship = require("../scripts/Ship");

const myShip = Ship(5);

test("Creates Ship Object with 5 length", () => {
  expect(myShip.myLength).toBe(5);
});

test("Creates Ship that isn't sunk", () => {
  expect(myShip.isSunk()).toBe(false);
});

myShip.hit(3);

test("Ship gets hit", () => {
  expect(myShip.shipHullArray).toEqual([0, 0, 0, 1, 0]);
});

describe("Ship sinks", () => {
  // Applies only to tests in this describe block
  beforeAll(() => {
    myShip.hit(4);
    myShip.hit(2);
    myShip.hit(1);
    myShip.hit(0);
  });

  test("Ship sinks", () => {
    expect(myShip.isSunk()).toBe(true);
  });
});
