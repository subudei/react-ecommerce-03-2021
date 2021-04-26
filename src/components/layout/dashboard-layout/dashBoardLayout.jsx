import React from "react";
import "./dashBoardLayout.styles.css";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { signOutUserStart } from "../../../redux/user/user.actions";

import Header from "../../header/header";
import VerticalNav from "../../vertical-nav/verticalNav";
import Footer from "../../footer/footer";
import MobileMenu from "../../mobile-menu/mobileMenu";

function DashBoardLayout(props) {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  return (
    <div className="dashboard__layout">
      <Header {...props} />
      <div className="dashboard__control__panel">
        <div className="dashboard__sidebar">
          <MobileMenu />
          <VerticalNav>
            <ul>
              <li>
                <Link to="/dashboard">My Orders</Link>
              </li>
              <li>
                <span
                  className="dashboard__sign__out"
                  onClick={() => signOut()}
                >
                  Sign Out
                </span>
              </li>
            </ul>
          </VerticalNav>
        </div>
        <div className="dashboard__content">{props.children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default DashBoardLayout;
