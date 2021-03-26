import React from "react";
import "./header.styles.css";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";

import { signOutUserStart } from "../../redux/user/user.actions";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalNumCartItems: selectCartItemsCount(state),
}); // mapira state koji se nalazi u storu, a koji povlaci kroz useSelector, i dobijam currentUser varijablu (state)

function Header(props) {
  const dispatch = useDispatch();
  const { currentUser, totalNumCartItems } = useSelector(mapState);

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  return (
    <div className="header__container">
      <div className="header__wrap">
        <div className="header__logo">
          <Link to="/">
            <h2>Pro Shop</h2>
          </Link>
        </div>
        <div className="registration__div">
          <ul>
            <li>
              <Link to="/">home</Link>
            </li>
            <li>
              <Link to="/search">search</Link>
            </li>
          </ul>
          {currentUser && (
            <ul>
              <li>
                <Link to="/dashboard">My Account</Link>
              </li>
              <li>
                <span onClick={() => signOut()}>LOGOUT</span>
              </li>
            </ul>
          )}

          {!currentUser && (
            <ul>
              <li>
                <Link to="/registration">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          )}
          <div className="header__cart">
            <Link to="/cart">CART ({totalNumCartItems})</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

Header.defaultProps = {
  currentUser: null,
};

export default Header;
