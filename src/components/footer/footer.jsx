import React from "react";
import "./footer.styles.css";

function Footer() {
  return (
    <div className="footer__container">
      <h1>Pro Shop © {new Date().getFullYear()}</h1>
    </div>
  );
}

export default Footer;
