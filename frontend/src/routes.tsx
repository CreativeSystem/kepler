import React from "react";
import {
  BrowserRouter, Switch, Route,
} from "react-router-dom";

import Template from "@components/Template";
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
  </BrowserRouter>
);


<<<<<<< HEAD
export default Routes;
=======
export interface IRoute {
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  container: React.ComponentType<any>;
  icon: IconType;
  title: string;
}

const Routes: React.FC<Props> = ({ isAuthenticated }) => {
  const privateRoutes: Array<IRoute> = [
    {
      path: "/dashboard",
      title: "Dashboard",
      container: Dashboard,
      icon: FaHome,
    },
    {
      path: "/product-item",
      title: "Ingredientes",
      container: ProductItem,
      icon: FaUtensils,
    },
  ];
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        {isAuthenticated && (
          <Template routes={privateRoutes}>
            {privateRoutes.map(({ path, container: component }) => (
              <PrivateRoute
                key={path}
                exact
                path={path}
                component={component}
                hasAuthorization={isAuthenticated}
              />
            ))}
          </Template>
        )}
        {!isAuthenticated && <Redirect to="/login" />}
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = ({
  session: { isAuthenticated },
}: ApplicationState) => ({ isAuthenticated });

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(SessionActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
>>>>>>> c2abd39cd5b6d2819598f33b2f1c0d9b147864ed
