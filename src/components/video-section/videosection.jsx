import React from "react";
import "./videoSection.css";

import { Link } from "react-router-dom";

import Video from "../../assets/sparring_video.mp4";

function VideoSection() {
  return (
    <div className="video__container">
      <video src={Video} autoPlay loop muted type="video/mp4" />
      <div className="video__overlay">
        <p>
          <span>
            <Link className="video__shop__name" to="/search">
              {" "}
              PRO SHOP
            </Link>
          </span>{" "}
          is only interested in one goal,
          <br /> helping YOU be your very best, from bell to bell.
        </p>
      </div>
    </div>
  );
}

export default VideoSection;
