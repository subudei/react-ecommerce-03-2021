import React from "react";
import "./adminToolbar.styles.css";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkUserIsAdmin } from "../../utils/index";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

function AdminToolbar(props) {
  const { currentUser } = useSelector(mapState);
  const isAdmin = checkUserIsAdmin(currentUser);

  if (!isAdmin) return null;
  return (
    <div className="admin__toolbar">
      <ul>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminToolbar;

//  24:00
