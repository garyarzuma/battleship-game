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

function Gameloop() {
  const [playerBoardState, setPlayerBoardState] = useState(
    playerBoard.getBoardSpaces()
  );
  const [computerBoardState, setComputerBoardState] = useState(
    computerBoard.getBoardSpaces()
  );

  const handleClick = (y, x) => {
    humanPlayer.attack(computerBoard, y, x);
    console.log(computerBoard);
    const temp = _.cloneDeep(computerBoard.getBoardSpaces());
    setComputerBoardState(temp);
  };

  return (
    <div className="App">
      {/* <div className="Message">{playerBoardState.getMessage()}</div> */}
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
      {/*  <div className="Message">{computerBoardState.getMessage()}</div> */}
    </div>
  );
}

export default Gameloop;
