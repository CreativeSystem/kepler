import React from "react";
import { IRoute } from "~/routes";

import { Container, MenuLink } from "./styles";

interface OwnProps {
  route: IRoute;
  active: boolean;
}
type Props = OwnProps;

const MenuItem: React.FC<Props> = ({
  route: { path, icon: Icon, title },
  active
}) => {
  return (
    <Container active={active}>
      <MenuLink to={path} active={active}>
        <Icon size={20} />
        <span>{title}</span>
      </MenuLink>
    </Container>
  );
};

export default MenuItem;
