import React from "react";
import "./verticalNav.styles.css";

import { useSelector } from "react-redux";

import UserProfile from "../user-profile/userProfile";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

function VerticalNav({ children }) {
  const { currentUser } = useSelector(mapState);

  const configUserProfile = {
    currentUser,
  };
  return (
    <div className="vertical__nav__container">
      <UserProfile {...configUserProfile} />
      <div className="vertical__nav__menu">{children}</div>
    </div>
  );
}

export default VerticalNav;
