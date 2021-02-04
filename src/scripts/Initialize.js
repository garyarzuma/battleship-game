import { Player } from "./Player";
import { Gameboard } from "./Gameboard";

const Initialize = () => {
  const playerBoard = Gameboard();
  const computerBoard = Gameboard();
  const humanPlayer = Player(true);
  const computerPlayer = Player(false);
  computerBoard.placeShips(2, "Vertical", 2, 4);
  computerBoard.placeShips(3, "horiz", 0, 5);
  computerBoard.placeShips(4, "horiz", 8, 1);
  computerBoard.placeShips(5, "Vertical", 1, 1);
  computerBoard.placeShips(6, "Vertical", 2, 9);

  return [playerBoard, computerBoard, humanPlayer, computerPlayer];
};

export default Initialize;
