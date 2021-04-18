import React from "react";
import "./layout.styles.css";

import Footer from "../../footer/footer";
import Header from "../../header/header";
import MobileMenu from "../../mobile-menu/mobileMenu";

function Layout(props) {
  return (
    <div className="layout__container">
      <Header {...props} />
      <MobileMenu />
      <div className="layout__children">{props.children}</div>

      <Footer />
    </div>
  );
}

export default Layout;
