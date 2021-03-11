import React from "react";
import "./formInput.styles.css";

function FormInput({ handleChange, label, ...otherProps }) {
  return (
    <div className="form__row">
      {label ? <label>{label}</label> : null}
      <input className="form__input" onChange={handleChange} {...otherProps} />
    </div>
  );
}

export default FormInput;
