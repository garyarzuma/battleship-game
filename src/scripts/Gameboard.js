const Ship = require("../scripts/Ship");

const Gameboard = () => {
  const shipsArray = [];
  let numOfSunkShips = 0;
  let gameMessage = "";

  const boardSpaces = new Array(10);
  for (let row = 0; row < 10; row++) {
    boardSpaces[row] = new Array(10);
    for (let col = 0; col < 10; col++) {
      boardSpaces[row][col] = 0;
    }
  }

  const placeShips = (shipLength, orientation, y, x) => {
    const myShip = Ship(shipLength);
    shipsArray.push(myShip);
    for (let i = 0; i < shipLength; i++) {
      if (orientation === "vert") {
        boardSpaces[y + i][x] = shipLength;
      } else {
        boardSpaces[y][x + i] = shipLength;
      }
    }
  };

  const receiveAttack = (y, x) => {
    if (
      boardSpaces[y][x] !== 0 &&
      boardSpaces[y][x] !== "X" &&
      boardSpaces[y][x] !== 1
    ) {
      shipsArray.forEach((ship) => {
        if (ship.length === boardSpaces[y][x]) {
          boardSpaces[y][x] = "X";
          ship.hit();
          gameMessage = "Hit!";
          if (ship.isSunk() === true) {
            numOfSunkShips++;
            gameMessage = "Hit and Sunk!";
            if (numOfSunkShips === 5) {
              gameMessage = "Hit and Sunk! You've sunk all my ships!";
            }
          }
        }
      });
    } else if (boardSpaces[y][x] === 0) {
      boardSpaces[y][x] = 1;
      gameMessage = "Miss!";
    } else {
      //boardspace === X
      return "Error!";
    }
  };

  const getMessage = () => {
    return gameMessage;
  };

  return { placeShips, boardSpaces, receiveAttack, getMessage };
};

export { Gameboard };
