import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";

import { ApplicationState } from "@store/index";
import { FaHome, FaUtensils } from "react-icons/fa";
import Login from "@pages/Login";

import * as SessionActions from "@ducks/session/actions";
import PrivateRoute from "@components/PrivateRoute";
import Dashboard from "@pages/Dashboard";
import ProductItem from "@pages/ProductItem";
import { IconType } from "react-icons/lib/cjs";

import Template from "@components/Template";

interface StateProps {
  isAuthenticated: boolean;
}

type Props = StateProps;

export interface IRoute {
  path: string;
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
      icon: FaHome
    },
    {
      path: "/product-item",
      title: "Ingredientes",
      container: ProductItem,
      icon: FaUtensils
    }
  ];
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login}></Route>

        {isAuthenticated && (
          <Template routes={privateRoutes}>
            {privateRoutes.map(({ path, container: component }) => (
              <PrivateRoute
                key={path}
                exact
                path={path}
                component={component}
                hasAuthorization={isAuthenticated}
              ></PrivateRoute>
            ))}
          </Template>
        )}
        {!isAuthenticated && <Redirect to="/login"></Redirect>}
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = ({
  session: { isAuthenticated }
}: ApplicationState) => ({ isAuthenticated });

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(SessionActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
