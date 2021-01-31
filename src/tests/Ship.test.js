const Ship = require("../scripts/Ship");

const myShip = Ship(5);

test("Creates Ship that isn't sunk", () => {
  expect(myShip.isSunk()).toBe(false);
});

myShip.hit(3);

test("Ship gets hit", () => {
  expect(myShip.shipHullArray).toEqual([0, 0, 0, 1, 0]);
});

describe("Ship sinks with length 3 when hit 3 times", () => {
  // Applies only to tests in this describe block
  const myShip2 = Ship(3);

  beforeAll(() => {
    myShip2.hit(2);
    myShip2.hit(1);
    myShip2.hit(0);
  });

  test("Ship sinks", () => {
    expect(myShip2.isSunk()).toBe(true);
  });

  test("Ship hit location array is accurate", () => {
    expect(myShip2.shipHullArray).toEqual([1, 1, 1]);
  });
});
