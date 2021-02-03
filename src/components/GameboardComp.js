import React, { useEffect, useState } from "react";
import "../styles/GameboardComp.css";
import Grid from "./Grid";

const GameboardComp = (props) => {
  const [display, setDisplay] = useState(props.gameboard);

  useEffect(() => {
    setDisplay(props.gameboard);
  }, [props.gameboard]);

  const displayFormatted = display.map((row, rowIndex) => {
    return (
      <div key={rowIndex} className="row">
        {row.map((col, colIndex) => {
          return (
            <div key={colIndex} className="col">
              {
                <Grid
                  onClick={(y, x) => props.onClick(y, x)}
                  y={rowIndex}
                  x={colIndex}
                  value={col}
                />
              }
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <div className="gameboard-container">
      {props.name}
      <div className="gameboard">{displayFormatted}</div>
    </div>
  );
};

export default GameboardComp;

/* (row) => {
    console.log(row);
    return (
      <div className="row">
        {row.forEach((col) => {
          console.log(col);
          return <div className="col">col</div>;
        })}
      </div>
    );
  } */
