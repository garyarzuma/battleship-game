import "./Gameloop.css";
import GameboardComp from "./components/GameboardComp";
import { Gameboard } from "./scripts/Gameboard";
import { Player } from "./scripts/Player";
import React, { useState, useEffect } from "react";
import Ship from "./scripts/Ship";
import Initialize from "./scripts/Initialize";
var _ = require("lodash");

const [playerBoard, computerBoard, humanPlayer, computerPlayer] = Initialize();

function Gameloop() {
  useEffect(() => {
    const [
      playerBoard,
      computerBoard,
      humanPlayer,
      computerPlayer,
    ] = Initialize();
  }, []);

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

  const [userShipsLeftToPlace, setUserShipsLeftToPlace] = useState([
    6,
    5,
    4,
    3,
    2,
  ]);

  const [orientation, setOrientation] = useState("Vertical");

  const userPlaceShips = (y, x) => {
    if (
      playerBoard.placeShips(userShipsLeftToPlace[0], orientation, y, x) ===
      undefined
    ) {
      /* removes first of array so essentially after user place the 6 length Ship
   it will automatically leave the 5 length ship to place on next click */

      setUserShipsLeftToPlace(userShipsLeftToPlace.filter((x, i) => i !== 0));
      setPlayerBoardState(_.cloneDeep(playerBoard.getBoardSpaces()));

      //clear the current error message if there was one
      setPlayerMessage("");
    } else setPlayerMessage("Error! Can't place ship there");
  };

  const toggleOrientation = () => {
    if (orientation === "Vertical") {
      setOrientation("Horizontal");
    } else setOrientation("Vertical");
  };

  //main game loop is here. Updates player click and message and executes computer click
  const handleClick = (y, x) => {
    //check if user has placed all available ships
    if (userShipsLeftToPlace[0] === undefined) {
      humanPlayer.attack(computerBoard, y, x);
      //pass by reference wont update the state to rerender if we dont deep clone
      const temp1 = _.cloneDeep(computerBoard.getBoardSpaces());
      setComputerBoardState(temp1);
      setComputerMessage(computerBoard.getMessage());
      //pass by reference wont update the state to rerender if we dont deep clone

      computerPlayer.attack(playerBoard);
      const temp2 = _.cloneDeep(playerBoard.getBoardSpaces());
      setPlayerBoardState(temp2);
      setPlayerMessage(playerBoard.getMessage());
    }
  };

  return (
    <div className="App">
      <div className="player-container">
        <GameboardComp
          onClick={(y, x) => {
            userPlaceShips(y, x);
          }}
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
      <button onClick={toggleOrientation}>{orientation}</button>
    </div>
  );
}

export default Gameloop;
