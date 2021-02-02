import React, { useState } from "react";
import "../styles/GameboardComp.css";
import Grid from "./Grid";

const GameboardComp = (props) => {
  const displayBoard = props.gameboard.boardSpaces.map((row, rowIndex) => {
    return (
      <div className="row">
        {row.map((col, colIndex) => {
          return (
            <div className="col">
              {<Grid y={rowIndex} x={colIndex} value={col} />}
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <div className="gameboard-container">
      {props.name}
      <div className="gameboard">{displayBoard}</div>
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
