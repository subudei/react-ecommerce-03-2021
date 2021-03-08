import React from "react";
import "./directory.sstyles.css";
import MenImg from "../../assets/boxiing_bw.jpg";
import WomImg from "../../assets/jlo.jpg";

function Directory() {
  return (
    <div className="directory__container">
      {/* <div className="directory__wrap"> */}
      <div
        className="directory__item"
        style={{ backgroundImage: `url(${MenImg})` }}
      >
        <a>GLOVES</a>
      </div>
      <div
        className="directory__item"
        style={{ backgroundImage: `url(${WomImg})` }}
      >
        <a>ACCESORIES</a>
      </div>
      {/* </div> */}
    </div>
  );
}

export default Directory;
