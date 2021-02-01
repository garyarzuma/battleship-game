const Ship = (length) => {
  let sunk = false;
  let shipHits = 0;

  const hit = () => {
    if (!sunk) {
      shipHits++;
      if (shipHits === length) sunk = true;
    }
  };
  const isSunk = () => {
    return sunk;
  };
  return { isSunk, hit, length };
};

module.exports = Ship;
