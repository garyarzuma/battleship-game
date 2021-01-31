const Ship = (length) => {
  const myLength = length;
  let sunk = false;
  const shipHullArray = new Array(length).fill(0);
  const hit = (hitIndex) => {
    if (!sunk) {
      shipHullArray[hitIndex] = 1;
      if (shipHullArray.indexOf(0) === -1) sunk = true;
    }
  };
  const isSunk = () => {
    return sunk;
  };
  return { isSunk, myLength, hit, shipHullArray };
};

export default Ship;
module.exports = Ship;
