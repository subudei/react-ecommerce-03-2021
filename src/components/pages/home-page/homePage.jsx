import React from "react";
import "./homePage.styles.css";

import Directory from "../../directory/directory";
import VideoSection from "../../video-section/videoSection";

function HomePage() {
  return (
    <div className="home__container">
      <div className="home__title">
        <h1>Achieve your boxing dreams with professional equipment.</h1>
      </div>
      <VideoSection />
      <Directory />
    </div>
  );
}

export default HomePage;
