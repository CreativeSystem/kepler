import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Template from "@components/Template";
import ComponentsTest from "@pages/componentsTest";
import Login from "@pages/Login";
import Services from "@pages/Services";

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Template>
        <Route exact path="/" component={Services} />
      </Template>
    </Switch>
    <Route exact path="/componentsTest" component={ComponentsTest} />
  </BrowserRouter>
);

export default Routes;
