import React from "react";
import { useLocation } from "react-router";

import LogoSrc from "@assets/img/logo.png";
import { IRoute } from "~/routes";

import MenuItem from "./MenuItem";
import {
  Container, Logo, Header, Body,
} from "./styles";

interface OwnProps {
  routes: Array<IRoute>;
}
type Props = OwnProps;

const Menu: React.FC<Props> = ({ routes }) => {
  const { pathname: currentPath } = useLocation();
  return (
    <Container id="menu">
      <Header>
        <Logo src={LogoSrc} alt="..." />
      </Header>

      <Body>
        <ul className="menu-items">
          {routes.map(route => (
            <MenuItem
              route={route}
              key={route.path}
              active={(route.path === currentPath).valueOf()}
            />
          ))}
        </ul>
      </Body>
    </Container>
  );
};

export default Menu;
