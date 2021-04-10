import React from "react";
import "./homePage.styles.css";
import Directory from "../../directory/directory";

function HomePage() {
  return (
    <div className="home__container">
      <div className="home__title">
        <h1>Achieve your dreams with professional equipment.</h1>
      </div>

      <Directory />
    </div>
  );
}

export default HomePage;
