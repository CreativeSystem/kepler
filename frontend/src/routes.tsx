import React from "react";
import { Switch, Route } from "react-router-dom";

import { ConnectedRouter } from "connected-react-router";

import { history } from "@store/index";

import Login from "@pages/Login";
import MyServices from "@pages/MyServices";
import Services from "@pages/Services";
import ServicesDetail from "@pages/ServicesDetail";
import UserInfo from "@pages/UserInfo";

import Template from "@components/Template";

import HiredServices from "./pages/HiredServices";
import RegisterService from "./pages/RegisterService";

const Routes: React.FC = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/login" component={Login} />

      <Route exact path="/user-info">
        <Template>
          <UserInfo />
        </Template>
      </Route>

      <Route exact path="/">
        <Template>
          <Services />
        </Template>
      </Route>

      <Route exact path="/services/:id">
        <Template>
          <ServicesDetail />
        </Template>
      </Route>
      <Route exact path="/hired-services">
        <Template>
          <HiredServices />
        </Template>
      </Route>
      <Route exact path="/my-services">
        <Template>
          <MyServices />
        </Template>
      </Route>
      <Route exact path="/my-services/:id">
        <Template>
          <RegisterService />
        </Template>
      </Route>
      <Route exact path="/register-service">
        <Template>
          <RegisterService />
        </Template>
      </Route>
    </Switch>
  </ConnectedRouter>
);


export default Routes;
