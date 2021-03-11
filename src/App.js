import React, { Component } from "react";
import "./default.css";

import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { auth, handleUserProfile } from "./firebase/utils";
import { setCurrentUser } from "./redux/user/user.actions";

import Layout from "./components/layout/layout";

import HomePage from "./components/pages/home-page/homePage";
import Registration from "./components/pages/registration-page/registration";
import Login from "./components/pages/login-page/login";
import Recovery from "./components/pages/recovery/recovery";

class App extends Component {
  authListener = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.authListener = auth.onAuthStateChanged(async (userAuth) => {
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
  }

  componentWillUnmount() {
    this.authListener();
  }

  render() {
    const { currentUser } = this.props;

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
            render={() =>
              currentUser ? (
                <Redirect to="/" />
              ) : (
                <Layout>
                  <Registration />
                </Layout>
              )
            }
          />
          <Route
            path="/login"
            render={() =>
              currentUser ? (
                <Redirect to="/" />
              ) : (
                <Layout>
                  <Login />
                </Layout>
              )
            }
          />
          <Route
            path="/recovery"
            render={() => (
              <Layout>
                <Recovery />
              </Layout>
            )}
          />
          {/* <Route
            path="/login"
            component={currentUser ? <Redirect to="/" /> : Login}
          /> */}
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
