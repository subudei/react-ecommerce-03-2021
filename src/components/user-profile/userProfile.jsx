import React from "react";
import "./userProfile.styles.css";

// import userIMG from "../../assets/user.png";
import { FaUserCircle } from "react-icons/fa";

function UserProfile(props) {
  const { currentUser } = props;
  const { displayName } = currentUser;

  return (
    <div className="user__profile">
      <ul>
        <li>
          <div className="user__img">
            <FaUserCircle className="user__icon" />
          </div>
        </li>
        <li>
          <span className="user__display__name">
            {displayName && displayName}
          </span>
        </li>
      </ul>
    </div>
  );
}

export default UserProfile;
