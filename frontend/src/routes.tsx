import React from "react";
import { FaHome, FaUtensils } from "react-icons/fa";
import { IconType } from "react-icons/lib/cjs";
import { connect } from "react-redux";
import {
  BrowserRouter, Switch, Route, Redirect,
} from "react-router-dom";

import PrivateRoute from "@components/PrivateRoute";
import Template from "@components/Template";
import * as SessionActions from "@ducks/session/actions";
import Dashboard from "@pages/Dashboard";
import FileList from "@pages/FileList";
import Login from "@pages/Login";
import ProductItem from "@pages/ProductItem";
import { ApplicationState } from "@store/index";
import { Dispatch, bindActionCreators } from "redux";

interface StateProps {
  isAuthenticated: boolean;
}

type Props = StateProps;

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
        <Route exat path="/file" component={FileList} />
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
