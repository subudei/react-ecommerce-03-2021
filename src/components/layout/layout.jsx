import React from "react";
import "./layout.styles.css";
import Footer from "../footer/footer";
import Header from "../header/header";

function Layout({ children }) {
  return (
    <div className="layout__container">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
