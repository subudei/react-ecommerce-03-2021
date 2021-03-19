import React from "react";
import "./formSelect.styles.css";

function FormSelect({
  options,
  defaultValue,
  handleChange,
  label,
  ...otherProps
}) {
  if (!Array.isArray(options) || options.length < 1) return null;

  return (
    <div className="form__select__row">
      {label && <label>{label}</label>}
      <select
        className="form__select__options"
        value={defaultValue}
        onChange={handleChange}
        {...otherProps}
      >
        {options.map((option, index) => {
          const { value, name } = option;
          return (
            <option key={index} value={value}>
              {name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default FormSelect;
