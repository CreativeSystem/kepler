import React from "react";
import { InputGroup, FormControl, Col } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

import { ApplicationState } from "~/store";

import Logo from "@assets/img/logo.png";

import SignIn from "./SignIn";
import { Container, InputGroupPrepend } from "./styles";
import User from "./User";

const AppBar: React.FC = () => {
  const isAuthenticated = useSelector<ApplicationState, boolean>(({ session }) => session.isAuthenticated);

  return (
    <Container className="sticky-top d-flex">
      <Col md={2} sm={2}>
        <a href="/"><img src={Logo} alt="Kepler" height="30px" /></a>
      </Col>
      <Col md={3} sm={2}>
        <InputGroup>
          <InputGroupPrepend>
            <InputGroup.Text id="basic-addon1"><FaSearch /></InputGroup.Text>
          </InputGroupPrepend>
          <FormControl
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
      </Col>
      <div className="d-flex align-items-center mr-2 ml-auto">
        { isAuthenticated ? <User /> : <SignIn />}
      </div>
    </Container>
  );
};

export default AppBar;
