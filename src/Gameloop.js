import "./Gameloop.css";
import GameboardComp from "./components/GameboardComp";
import React, { useState, useEffect } from "react";
import Initialize from "./scripts/Initialize";
import hitsSFX from "./sounds/hitSFX.mp3";
import useSound from "use-sound";
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

  const [gameInstructions, setGameInstructions] = useState(
    "Welcome to BattleShip! Start by placing your ships. " +
      "You will have 5 ships to place, starting with a 6 unit " +
      "Carrier to a 2 unit Destroyer. You can set the orientation " +
      "with the Orientation toggle button"
  );

  const [gameOver, setGameOver] = useState(false);

  //Board states
  const [playerBoardState, setPlayerBoardState] = useState(
    playerBoard.getBoardSpaces()
  );
  const [computerBoardState, setComputerBoardState] = useState(
    computerBoard.getBoardSpaces()
  );

  //Player Message States
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

  const [hitSFX] = useSound(hitsSFX, { volume: 0.05 });

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
      if (userShipsLeftToPlace[0] === 2) {
        setGameInstructions(
          "USA goes first! Choose locations on the enemy " +
            "board to attack. First player to sink all 5 enemy ships wins glory " +
            "to powerful nation and gains much valor!"
        );
      }
    } else setPlayerMessage("Glorious nation can't put ship there!");
  };

  const toggleOrientation = () => {
    if (orientation === "Vertical") {
      setOrientation("Horizontal");
    } else setOrientation("Vertical");
  };

  //main game loop is here. Updates player click and message and executes computer click
  const handleClick = (y, x) => {
    //check if user has placed all available ships
    if (userShipsLeftToPlace[0] === undefined && gameOver === false) {
      humanPlayer.attack(computerBoard, y, x);

      //sound effect played if hit
      if (computerBoard.getMessage() !== "Miss!") {
        hitSFX();
      }

      //pass by reference wont update the state to rerender if we dont deep clone
      const temp1 = _.cloneDeep(computerBoard.getBoardSpaces());
      setComputerBoardState(temp1);
      setComputerMessage(computerBoard.getMessage());

      computerPlayer.attack(playerBoard);

      //sound effect played if hit
      if (playerBoard.getMessage() !== "Miss!") {
        hitSFX();
      }
      //pass by reference wont update the state to rerender if we dont deep clone
      const temp2 = _.cloneDeep(playerBoard.getBoardSpaces());
      setPlayerBoardState(temp2);
      setPlayerMessage(playerBoard.getMessage());

      if (
        computerBoard.getMessage() === "Hit and Sunk! You've sunk all my ships!"
      ) {
        setGameOver(true);
        setGameInstructions(
          "Game over! Glory to all great nation of US and A!"
        );
      }
      if (
        playerBoard.getMessage() === "Hit and Sunk! You've sunk all my ships!"
      ) {
        setGameOver(true);
        setGameInstructions("Game over! Glory to all great nation of USSR!");
      }
    }
  };

  return (
    <div className="App">
      <h1>BATTLESHIP</h1>
      <div className="instructions">{gameInstructions}</div>
      <div className="gameboards-container">
        <div className="player-container">
          <GameboardComp
            onClick={(y, x) => {
              userPlaceShips(y, x);
            }}
            gameboard={playerBoardState}
            name="USA"
            type="human"
          />
          <div className="Message">{playerMessage}</div>
          {userShipsLeftToPlace[0] === undefined || (
            <button onClick={toggleOrientation}>{orientation}</button>
          )}
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
    </div>
  );
}

export default Gameloop;
