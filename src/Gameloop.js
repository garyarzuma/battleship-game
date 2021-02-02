import "./Gameloop.css";
import GameboardComp from "./components/GameboardComp";
import { Gameboard } from "./scripts/Gameboard";
import { Player } from "./scripts/Player";

function Gameloop() {
  const playerBoard = Gameboard();
  const computerBoard = Gameboard();

  const humanPlayer = Player(true);
  const computerPlayer = Player(false);

  playerBoard.placeShips(2, "vert", 2, 4);
  playerBoard.placeShips(3, "vert", 2, 5);
  playerBoard.placeShips(4, "vert", 2, 6);
  playerBoard.placeShips(5, "vert", 2, 7);
  playerBoard.placeShips(6, "vert", 2, 8);

  computerBoard.placeShips(2, "vert", 2, 4);
  computerBoard.placeShips(3, "vert", 2, 5);
  computerBoard.placeShips(4, "vert", 2, 6);
  computerBoard.placeShips(5, "vert", 2, 7);
  computerBoard.placeShips(6, "vert", 2, 8);

  humanPlayer.attack(computerBoard, 2, 5);
  humanPlayer.attack(computerBoard, 3, 5);
  humanPlayer.attack(computerBoard, 4, 5);

  computerPlayer.attack(playerBoard);

  const handleClick = (y, x, board) => {
    humanPlayer.attack(board, y, x);
    console.log(board.getMessage());
  };

  return (
    <div className="App">
      <div className="Message">{playerBoard.getMessage()}</div>
      <GameboardComp
        onClick={(y, x) => handleClick(y, x, computerBoard)}
        gameboard={playerBoard}
        name="Player 1"
      />
      <GameboardComp
        onClick={(y, x) => handleClick(y, x, playerBoard)}
        gameboard={computerBoard}
        name="USSR"
      />
      <div className="Message">{computerBoard.getMessage()}</div>
    </div>
  );
}

export default Gameloop;
