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
      //passes these coordinates all the way up to gameloop to use in handleClick fn
      onClick={() => props.onClick(props.y, props.x)}
      onMouseOver={(event) => (event.target.style.backgroundColor = "green")}
      onMouseOut={(event) => (event.target.style.backgroundColor = "")}
    >
      <span className={`${props.computerOrHuman}${value}`}></span>
    </div>
  );
};

export default Grid;
