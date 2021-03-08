import React from "react";
import "./header.styles.css";

function Header(props) {
  return (
    <div className="header__container">
      <div className="header__wrap">
        <div className="header__logo">
          <h2>Pro Shop</h2>
        </div>
      </div>
    </div>
  );
}

export default Header;
