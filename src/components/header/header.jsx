import React from "react";
import "./header.styles.css";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/utils";

function Header(props) {
  const { currentUser } = props;
  return (
    <div className="header__container">
      <div className="header__wrap">
        <div className="header__logo">
          <Link to="/">
            <h2>Pro Shop</h2>
          </Link>
        </div>
        <div className="registration__div">
          {currentUser && (
            <ul>
              <li>
                <Link to="/dashboard">My Account</Link>
              </li>
              <li>
                <span onClick={() => auth.signOut()}>LogOut</span>
              </li>
            </ul>
          )}
          {!currentUser && (
            <ul>
              {/* <li>
                <Link to="/dashboard">Dashboard</Link>
              </li> */}
              <li>
                <Link to="/registration">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

Header.defaultProps = {
  currentUser: null,
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

export default connect(mapStateToProps, null)(Header);
