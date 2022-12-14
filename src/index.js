/*!

=========================================================
* Paper Dashboard React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { Provider } from "react-redux";
import store from "../src/reducers/store";

import AdminLayout from "layouts/Admin.js";
import { Login, Finish, Unfinish, Gagal } from "./views";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Route path="/login" component={Login} exact />
        <Route path="/payment/finish" component={Finish} exact />
        <Route path="/payment/unfinish" component={Unfinish} exact />
        <Route path="/payment/error" component={Gagal} exact />
        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  </Provider>
);
