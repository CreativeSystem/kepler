import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Template from "@components/Template";
import Components from "@pages/Components";
import Login from "@pages/Login";
import Services from "@pages/Services";
import Env from "~/utils/env";

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />

      <Route exact path="/">
        <Template>
          <Services />
        </Template>
      </Route>

      {Env("ENV") === "DEV" && (
        <Route exact path="/components" component={Components} />
      )}
    </Switch>
  </BrowserRouter>
);

export default Routes;
