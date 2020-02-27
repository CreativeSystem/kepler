import React from "react";
import { Container } from "./styles";
import User from "./User";

const AppBar: React.FC = () => {
  return (
    <Container className="sticky-top d-flex">
      <div className="d-flex align-items-center mr-2 ml-auto">
        <User />
      </div>
    </Container>
  );
};

export default AppBar;
