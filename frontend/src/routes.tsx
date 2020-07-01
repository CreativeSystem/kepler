import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";

import { ConnectedRouter } from "connected-react-router";

import { history } from "@store/index";

import Login from "@pages/Login";
import Services from "@pages/Services";
import ServicesDetail from "@pages/ServicesDetail";
import UserInfo from "@pages/UserInfo";

import Template from "@components/Template";

import HiredServices from "./pages/HiredServices";

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
    </Switch>
  </ConnectedRouter>
);


export default Routes;
