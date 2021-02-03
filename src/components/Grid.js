import React, { useState, useEffect } from "react";
import "../styles/Grid.css";

const Grid = (props) => {
  const [value, setValue] = useState(props.value);
  useEffect(() => {
    setValue(props.value);
  }, [props]);
  return (
    <div
      className={`grid${value}`}
      onClick={() => props.onClick(props.y, props.x)}
    >
      <span className={`${props.computerOrHuman}${value}`}></span>
    </div>
  );
};

export default Grid;
