import React, { useState } from "react";
import "./mobileMenu.styles.css";

import { HiMenuAlt1 } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signOutUserStart } from "../../redux/user/user.actions";
import { clearCart } from "../../redux/cart/cart.actions";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});

function MobileMenu() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState);
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const signOut = () => {
    dispatch(signOutUserStart());
    dispatch(clearCart());
  };

  return (
    <>
      {clicked ? (
        <div className="mobile__menu__links" onClick={() => setClicked(false)}>
          <Link className="menu__link" to="/">
            home
          </Link>
          <Link className="menu__link" to="/search">
            products
          </Link>
          {currentUser ? (
            <Link className="menu__link" to="/dashboard">
              my account
            </Link>
          ) : (
            <Link className="menu__link" to="/registration">
              register
            </Link>
          )}
          {currentUser ? (
            <div className="menu__link" onClick={() => signOut()}>
              logout
            </div>
          ) : (
            <Link className="menu__link" to="/login">
              login
            </Link>
          )}
        </div>
      ) : null}
      <div className="mobile__menu__button" onClick={() => handleClick()}>
        <HiMenuAlt1 className="button__icon" />
        <h1 className="button__title">menu</h1>
      </div>
    </>
  );
}

export default MobileMenu;
