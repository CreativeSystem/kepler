import React from "react";

import AppBar from "@components/AppBar";

import {
  Container, PageContainer,
} from "./styles";


const Template: React.FC = ({ children }) => (
  <Container>
    <AppBar />
    <PageContainer>
      {children}
    </PageContainer>
  </Container>
);

export default Template;
