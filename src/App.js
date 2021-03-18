import React, { useEffect } from "react";
import "./default.css";

import { Route, Switch } from "react-router-dom";

import { useDispatch } from "react-redux";
import { checkUserSession } from "./redux/user/user.actions";

import AdminToolbar from "./components/admin-toolbar/adminToolbar";

import WithAuth from "./higher-order-component/withAuth";
import WithAdminAuth from "./higher-order-component/withAdminAuth";

import Layout from "./components/layout/layout";
import HomePage from "./components/pages/home-page/homePage";
import Registration from "./components/pages/registration-page/registration";
import Login from "./components/pages/login-page/login";
import Recovery from "./components/pages/recovery-page/recovery";
import Dashboard from "./components/pages/dashboard-page/dashboard";
import Admin from "./components/pages/admin-page/admin";

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <div className="App">
      <AdminToolbar />
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
        <Route
          path="/admin"
          render={() => (
            <WithAdminAuth>
              <Layout>
                <Admin />
              </Layout>
            </WithAdminAuth>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
