import React from "react";

import AppBar from "@components/AppBar";

import {
  Container,
} from "./styles";


const Template: React.FC = ({ children }) => (
  <Container>
    <AppBar />
    {children}

  </Container>
);

export default Template;
