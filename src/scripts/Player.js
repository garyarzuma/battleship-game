const Player = (isHuman = "true") => {
  //really need to optimize this AI since it is just attacking random spots
  const computerAttack = (enemyBoard) => {
    let y;
    let x;
    let errorMessage;
    do {
      y = Math.floor(Math.random() * 10);
      x = Math.floor(Math.random() * 10);
      errorMessage = enemyBoard.receiveAttack(y, x);
    } while (errorMessage === "Error!");
  };

  const humanAttack = (enemyBoard, y, x) => {
    enemyBoard.receiveAttack(y, x);
  };

  const attack = (enemyBoard, y, x) => {
    if (isHuman) {
      humanAttack(enemyBoard, y, x);
    } else {
      computerAttack(enemyBoard);
    }
  };
  return { attack, isHuman };
};

export { Player };
