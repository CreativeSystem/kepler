import React from "react";
import { InputGroup, FormControl, Col } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

import { Container, InputGroupPrepend } from "./styles";
import User from "./User";

const AppBar: React.FC = () => (
  <Container className="sticky-top d-flex">
    <Col md={2}>
      Kepler
    </Col>
    <Col md={3}>
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
      <User />
    </div>
  </Container>
);

export default AppBar;
