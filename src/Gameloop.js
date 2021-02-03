import "./Gameloop.css";
import GameboardComp from "./components/GameboardComp";
import { Gameboard } from "./scripts/Gameboard";
import { Player } from "./scripts/Player";
import React, { useEffect, useState } from "react";
var _ = require("lodash");

const playerBoard = Gameboard();
const computerBoard = Gameboard();
const humanPlayer = Player(true);
const computerPlayer = Player(false);
computerBoard.placeShips(2, "vert", 2, 4);
computerBoard.placeShips(3, "vert", 2, 5);
computerBoard.placeShips(4, "vert", 2, 6);
computerBoard.placeShips(5, "vert", 2, 7);
computerBoard.placeShips(6, "vert", 2, 8);

playerBoard.placeShips(2, "vert", 2, 4);
playerBoard.placeShips(3, "vert", 2, 5);
playerBoard.placeShips(4, "vert", 2, 6);
playerBoard.placeShips(5, "vert", 2, 7);
playerBoard.placeShips(6, "vert", 2, 8);

function Gameloop() {
  const [playerBoardState, setPlayerBoardState] = useState(
    playerBoard.getBoardSpaces()
  );
  const [computerBoardState, setComputerBoardState] = useState(
    computerBoard.getBoardSpaces()
  );

  const [playerMessage, setPlayerMessage] = useState(playerBoard.getMessage());
  const [computerMessage, setComputerMessage] = useState(
    computerBoard.getMessage()
  );

  const handleClick = (y, x) => {
    humanPlayer.attack(computerBoard, y, x);
    //pass by reference wont update the state to rerender if we dont deep clone
    const temp = _.cloneDeep(computerBoard.getBoardSpaces());
    setComputerBoardState(temp);
    setComputerMessage(computerBoard.getMessage());
    computerPlayer.attack(playerBoard);
    setPlayerBoardState(_.cloneDeep(playerBoard.getBoardSpaces()));
    setPlayerMessage(playerBoard.getMessage());
  };

  return (
    <div className="App">
      <div className="Message">{playerMessage}</div>
      <GameboardComp
        onClick={() => {}}
        gameboard={playerBoardState}
        name="Player 1"
      />
      <GameboardComp
        onClick={(y, x) => handleClick(y, x)}
        gameboard={computerBoardState}
        name="USSR"
      />
      <div className="Message">{computerMessage}</div>
    </div>
  );
}

export default Gameloop;
