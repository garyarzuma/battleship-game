import "./Gameloop.css";
import GameboardComp from "./components/GameboardComp";
import { Gameboard } from "./scripts/Gameboard";
import { Player } from "./scripts/Player";
import React, { useState } from "react";
var _ = require("lodash");

const playerBoard = Gameboard();
const computerBoard = Gameboard();
const humanPlayer = Player(true);
const computerPlayer = Player(false);
computerBoard.placeShips(2, "vert", 2, 4);
computerBoard.placeShips(3, "horiz", 0, 5);
computerBoard.placeShips(4, "horiz", 8, 1);
computerBoard.placeShips(5, "vert", 1, 1);
computerBoard.placeShips(6, "vert", 2, 9);

playerBoard.placeShips(2, "horiz", 1, 1);
playerBoard.placeShips(3, "vert", 6, 4);
playerBoard.placeShips(4, "vert", 2, 6);
playerBoard.placeShips(5, "horiz", 4, 0);
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
      <div className="player-container">
        <GameboardComp
          onClick={() => {}}
          gameboard={playerBoardState}
          name="Player 1"
          type="human"
        />
        <div className="Message">{playerMessage}</div>
      </div>
      <div className="computer-container">
        <GameboardComp
          onClick={(y, x) => handleClick(y, x)}
          gameboard={computerBoardState}
          name="USSR"
          type="computer"
        />
        <div className="Message">{computerMessage}</div>
      </div>
    </div>
  );
}

export default Gameloop;
