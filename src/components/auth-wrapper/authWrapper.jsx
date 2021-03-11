import React from "react";
import "./authWrapper.styles.css";

function AuthWrapper({ headline, children }) {
  return (
    <div className="auth__wrapper__container">
      <div className="wrap__div">
        {headline && <h2>{headline}</h2>}
        <div className="children__div">{children && children}</div>
      </div>
    </div>
  );
}

export default AuthWrapper;
