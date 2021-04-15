import React from "react";
import "./homePage.styles.css";

import Directory from "../../directory/directory";
import Videosection from "../../video-section/videosection";

function HomePage() {
  return (
    <div className="home__container">
      <div className="home__title">
        <h1>Achieve your boxing dreams with professional equipment.</h1>
        {/* <p>
          PRO SHOP is only interested in one goal... helping you be your very
          best, from bell to bell.
        </p> */}
      </div>
      <Videosection />

      <Directory />
    </div>
  );
}

export default HomePage;
