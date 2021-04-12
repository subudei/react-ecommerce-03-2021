import React from "react";
import "./directory.styles.css";

import Gloves from "../../assets/leoneGloves.jpg";
import Headgear from "../../assets/header.jpg";
import HandWraps from "../../assets/handwraps.jpg";
import Shoes from "../../assets/ggg.jpg";

import { Link } from "react-router-dom";

function Directory() {
  return (
    <div className="directory__container">
      <div className="directory__item left">
        <Link to={"/search/gloves"} className="directory__link">
          <div className="directory__img__wrap">
            <img src={Gloves} alt="gloves" className="directory__img" />
            <div className="directory__link__btn">GLOVES</div>
          </div>
        </Link>
      </div>
      <div className="directory__item right">
        <Link to={"/search/accessories"} className="directory__link">
          <div className="directory__img__wrap">
            <img src={HandWraps} alt="gloves" className="directory__img" />
            <div className="directory__link__btn">ACCESSORIES</div>
          </div>
        </Link>
      </div>
      <div className="directory__item left">
        <Link to={"/search/shoes"} className="directory__link">
          <div className="directory__img__wrap">
            <img src={Shoes} alt="shoes" className="directory__img" />
            <div className="directory__link__btn">SHOES</div>
          </div>
        </Link>
      </div>
      <div className="directory__item right">
        <Link to={"/search/protection"} className="directory__link">
          <div className="directory__img__wrap">
            <img src={Headgear} alt="headgear" className="directory__img" />
            <div className="directory__link__btn">PROTECTION</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Directory;
