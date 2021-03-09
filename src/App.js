import React, { Component } from "react";
import "./default.css";

import { auth } from "./firebase/utils";

import { Route, Switch } from "react-router-dom";

import Layout from "./components/layout/layout";

import HomePage from "./components/pages/home-page/homePage";
import Registration from "./components/pages/registration-page/registration";
import Login from "./components/pages/login-page/login";

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
    this.authListener = auth.onAuthStateChanged((userAuth) => {
      if (!userAuth) return;

      this.setState({
        currentUser: userAuth,
      });
    });
  }

  componentWillUnmount() {
    this.authListener();
  }

  render() {
    return (
      <div className="App">
        <Layout>
          <div className="main">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/registration" component={Registration} />
              <Route path="/login" component={Login} />
            </Switch>
          </div>
        </Layout>
      </div>
    );
  }
}

export default App;
