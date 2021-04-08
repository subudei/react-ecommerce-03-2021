import React from "react";
import "./header.styles.css";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

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
        <Link className="header__logo" to="/">
          pro shop
        </Link>

        <div className="registration__div">
          <Link className="registration__links" to="/">
            home
          </Link>

          <Link className="registration__links" to="/search">
            search
          </Link>

          {currentUser && (
            <div className="current__user__links">
              <Link className="registration__links" to="/dashboard">
                My Account
              </Link>

              <span className="registration__logout" onClick={() => signOut()}>
                LOGOUT
              </span>
            </div>
          )}

          {!currentUser && (
            <div className="current__user__links">
              <Link className="registration__links" to="/registration">
                Register
              </Link>
              <Link className="registration__links" to="/login">
                Login
              </Link>
            </div>
          )}
          <div className="registration__cart">
            <Link className="cart__icon" to="/cart">
              <span className="cart__count">{totalNumCartItems}</span>
              <FaShoppingCart />
            </Link>
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
