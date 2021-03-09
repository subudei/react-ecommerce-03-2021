import React from "react";
import "./button.styles.css";

function Button({ children, ...otherProps }) {
  return (
    <button className="button" {...otherProps}>
      {children}
    </button>
  );
}

export default Button;
