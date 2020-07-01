import React from "react";

import AppBar from "@components/AppBar";
import Footer from "@components/Footer";

import {
  Container, PageContainer,
} from "./styles";


const Template: React.FC = ({ children }) => (
  <Container>
    <AppBar />
    <PageContainer>
      {children}
    </PageContainer>
    {/* <Footer /> */}
  </Container>
);

export default Template;
