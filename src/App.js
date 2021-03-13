import React, { useEffect } from "react";
import "./default.css";

import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { auth, handleUserProfile } from "./firebase/utils";
import { setCurrentUser } from "./redux/user/user.actions";

import WithAuth from "./higher-order-component/withAuth";

import Layout from "./components/layout/layout";
import HomePage from "./components/pages/home-page/homePage";
import Registration from "./components/pages/registration-page/registration";
import Login from "./components/pages/login-page/login";
import Recovery from "./components/pages/recovery-page/recovery";
import Dashboard from "./components/pages/dashboard-page/dashboard";

const App = (props) => {
  const { setCurrentUser, currentUser } = props;

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      }

      setCurrentUser(userAuth);
    });

    return () => {
      authListener();
    };
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Layout>
              <HomePage />
            </Layout>
          )}
        />
        <Route
          path="/registration"
          render={() => (
            <Layout>
              <Registration />
            </Layout>
          )}
        />
        <Route
          path="/login"
          render={() => (
            <Layout>
              <Login />
            </Layout>
          )}
        />
        <Route
          path="/recovery"
          render={() => (
            <Layout>
              <Recovery />
            </Layout>
          )}
        />
        <Route
          path="/dashboard"
          render={() => (
            <WithAuth>
              <Layout>
                <Dashboard />
              </Layout>
            </WithAuth>
          )}
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
