const Ship = require("../scripts/Ship");
var _ = require("lodash");

const Gameboard = () => {
  const shipsArray = [];
  let numOfSunkShips = 0;
  let gameMessage = "";

  let boardSpaces = new Array(10);
  for (let row = 0; row < 10; row++) {
    boardSpaces[row] = new Array(10);
    for (let col = 0; col < 10; col++) {
      boardSpaces[row][col] = 0;
    }
  }

  const placeShips = (shipLength, orientation, y, x) => {
    const myShip = Ship(shipLength);
    shipsArray.push(myShip);
    let tempBoardSpaces = _.cloneDeep(boardSpaces); //clone
    for (let i = 0; i < shipLength; i++) {
      if (orientation === "Vertical") {
        if (tempBoardSpaces[y + i][x] === 0 && y + shipLength < 11) {
          tempBoardSpaces[y + i][x] = shipLength;
        } else return "Error! Can't place ship there!";
      } else {
        if (tempBoardSpaces[y][x + i] === 0 && x + shipLength < 11) {
          tempBoardSpaces[y][x + i] = shipLength;
        } else return "Error! Can't place ship there!";
      }
    }
    boardSpaces = _.cloneDeep(tempBoardSpaces);
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

  const getBoardSpaces = () => {
    return boardSpaces;
  };

  return { placeShips, getBoardSpaces, receiveAttack, getMessage };
};

export { Gameboard };
