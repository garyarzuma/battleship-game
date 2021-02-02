import React from "react";
import "../styles/Grid.css";

const Grid = (props) => {
  return (
    <div className="grid" onClick={() => props.onClick(props.y, props.x)}>
      {props.value}
    </div>
  );
};

export default Grid;
