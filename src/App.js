import React, { useEffect } from "react";
import "./default.css";

import { Route, Switch } from "react-router-dom";

import { useDispatch } from "react-redux";
import { checkUserSession } from "./redux/user/user.actions";

import AdminToolbar from "./components/admin-toolbar/adminToolbar";

import WithAuth from "./higher-order-component/withAuth";
import WithAdminAuth from "./higher-order-component/withAdminAuth";

import Layout from "./components/layout/layout/layout";
import HomePage from "./components/pages/home-page/homePage";
import Registration from "./components/pages/registration-page/registration";
import Login from "./components/pages/login-page/login";
import Recovery from "./components/pages/recovery-page/recovery";
import Dashboard from "./components/pages/dashboard-page/dashboard";
import Admin from "./components/pages/admin-page/admin";
import AdminLayout from "./components/layout/admin-layout/adminLayout";
import DashBoardLayout from "./components/layout/dashboard-layout/dashBoardLayout";
import Search from "./components/pages/search-page/search";
import ProductPage from "./components/pages/product-page/productPage";

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
          exact
          path="/search"
          render={() => (
            <Layout>
              <Search />
            </Layout>
          )}
        />
        <Route
          path="/search/:filterType"
          render={() => (
            <Layout>
              <Search />
            </Layout>
          )}
        />
        <Route
          path="/product/:productID"
          render={() => (
            <Layout>
              <ProductPage />
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
              <DashBoardLayout>
                <Dashboard />
              </DashBoardLayout>
            </WithAuth>
          )}
        />
        <Route
          path="/admin"
          render={() => (
            <WithAdminAuth>
              <AdminLayout>
                <Admin />
              </AdminLayout>
            </WithAdminAuth>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
