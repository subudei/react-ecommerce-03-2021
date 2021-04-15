import React from "react";
import "./videoSection.css";

import Video from "../../assets/sparring_video.mp4";

function Videosection() {
  return (
    <div className="video__container">
      {/* <video className="video__play" autoPlay loop muted>
        <source src={Video} type="video/mp4" />
      </video> */}
      <video src={Video} autoPlay loop muted type="video/mp4" />
      <div className="video__overlay">
        <p>
          PRO SHOP is only interested in one goal...
          <br /> Helping you be your very best, from bell to bell.
        </p>
      </div>
    </div>
  );
}

export default Videosection;
