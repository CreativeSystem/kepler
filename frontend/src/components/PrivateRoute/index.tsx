import React from "react";
import { RouteProps, Route, RouteComponentProps, Redirect } from "react-router";

interface PrivateRouteProps extends RouteProps {
  hasAuthorization: boolean;
  redirect?: string;
  container?: React.ComponentType<any>;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  container: Container,
  redirect,
  hasAuthorization,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props: RouteComponentProps<any>) =>
      hasAuthorization ? (
        Container ? (
          Component && (
            <Container {...props}>
              <Component {...props} />
            </Container>
          )
        ) : (
          Component && <Component {...props} />
        )
      ) : (
        <Redirect
          to={{
            pathname: redirect || "/login",
            state: { from: props.location }
          }}
        ></Redirect>
      )
    }
  />
);

export default PrivateRoute;
