import React from "react";
import { Col } from "react-bootstrap";

import Paginator from "~/components/Paginator";
import ServiceCard from "~/components/ServiceCard";
import { Service } from "~/types";

import { Container } from "./styles";


const Services : React.FC = () => (
  <Container>
    <Paginator<Service>
      url="/api/services/"
      pageSize={30}
      renderItem={item => (
        <Col xl="3" lg="4" md="4" sm="6" xs="12" className="mb-3 d-flex justify-content-center" key={item.id}>
          <ServiceCard data={item} />
        </Col>
      )}
    />
  </Container>
);

export default Services;
