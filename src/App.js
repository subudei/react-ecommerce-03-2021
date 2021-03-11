import React, { Component } from "react";
import "./default.css";

import { auth, handleUserProfile } from "./firebase/utils";

import { Route, Switch, Redirect } from "react-router-dom";

import Layout from "./components/layout/layout";

import HomePage from "./components/pages/home-page/homePage";
import Registration from "./components/pages/registration-page/registration";
import Login from "./components/pages/login-page/login";
import Recovery from "./components/pages/recovery/recovery";

const initailState = {
  currentUser: null,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initailState,
    };
  }

  authListener = null;

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data(),
            },
          });
        });
      }

      this.setState({
        ...initailState,
      });
    });
  }

  componentWillUnmount() {
    this.authListener();
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Layout currentUser={currentUser}>
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
                <Layout currentUser={currentUser}>
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
                <Layout currentUser={currentUser}>
                  <Login />
                </Layout>
              )
            }
          />
          <Route
            path="/recovery"
            render={() => (
              <Layout currentUser={currentUser}>
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

export default App;
