import React from "react";
import "./layout.styles.css";
import Footer from "../footer/footer";
import Header from "../header/header";

function Layout(props) {
  return (
    <div className="layout__container">
      <Header {...props} />
      {props.children}
      <Footer />
    </div>
  );
}

export default Layout;
