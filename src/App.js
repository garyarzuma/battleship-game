import "./App.css";
import GameboardComp from "./components/GameboardComp";
import { Gameboard } from "./scripts/Gameboard";

function App() {
  const playerBoard = Gameboard();
  const computerBoard = Gameboard();
  return (
    <div className="App">
      <GameboardComp gameboard={playerBoard} name="Player 1" />
      <GameboardComp gameboard={computerBoard} name="USSR" />
    </div>
  );
}

export default App;
