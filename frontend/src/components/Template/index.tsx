import React from "react";
import {
  Container,
  ToggleMenu,
  Content,
  ContainerWrapper,
  PageContainer
} from "./styles";
import Menu from "@components/Menu";
import AppBar from "@components/AppBar";
import { IRoute } from "~/routes";
import { FaArrowRight } from "react-icons/fa";

interface OwnProps {
  routes: Array<IRoute>;
}

type Props = OwnProps;

const Template: React.FC<Props> = ({ children, routes }) => {
  return (
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
};

export default Template;
