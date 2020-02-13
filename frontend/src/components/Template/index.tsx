import React from "react";
import { FaArrowRight } from "react-icons/fa";

import AppBar from "@components/AppBar";
import Menu from "@components/Menu";
import { IRoute } from "~/routes";

import {
  Container,
  ToggleMenu,
  Content,
  ContainerWrapper,
  PageContainer,
} from "./styles";


interface OwnProps {
  routes: Array<IRoute>;
}

type Props = OwnProps;

const Template: React.FC<Props> = ({ children, routes }) => (
  <Container>
    <ContainerWrapper>
      <Menu routes={routes} />
      <Content>
        <ToggleMenu
          data-toggle="collapse"
          href="#menu"
          role="button"
          aria-expanded="false"
          aria-controls="menu"
        >
          <FaArrowRight size={30} />
        </ToggleMenu>
        <AppBar />
        <PageContainer className="container-fluid">{children}</PageContainer>
      </Content>
    </ContainerWrapper>
  </Container>
);

export default Template;
