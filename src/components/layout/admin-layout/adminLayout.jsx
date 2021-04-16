import React from "react";
import "./adminLayout.styles.css";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { signOutUserStart } from "../../../redux/user/user.actions";

import Header from "../../header/header";
import Footer from "../../footer/footer";
import VerticalNav from "../../vertical-nav/verticalNav";

function AdminLayout(props) {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(signOutUserStart());
  };
  return (
    <div className="admin__layout">
      <Header {...props} />
      <div className="admin__control__panel">
        <div className="admin__sidebar">
          <VerticalNav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <span className="admin__sign__out" onClick={() => signOut()}>
                  Sign Out
                </span>
              </li>
            </ul>
          </VerticalNav>
        </div>
        <div className="admin__content">{props.children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminLayout;
