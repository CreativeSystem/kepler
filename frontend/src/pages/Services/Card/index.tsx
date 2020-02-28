import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Col from "react-bootstrap/Col";

import { Card } from "semantic-ui-react";

import { Container } from "./styles";

export interface CardData{
  id: number,
  title: string,
  description:string,
  to_match: boolean,
  service_image: [string],
  price: string
}

export interface Props{
  data: CardData
}

const ServiceCard : React.FC<Props> = ({ data }) => (
  <Col xl="3" lg="4" md="4" sm="6" xs="12" className="mb-3 d-flex justify-content-center">
    <Container>
      <Carousel interval={null}>
        {data.service_image.map((image : any) => (
          <Carousel.Item key={image}>
            <img
              className="d-block w-100"
              src={image}
              alt=""
            />
          </Carousel.Item>
        )) }
      </Carousel>
      <Card.Content>
        <Card.Header>{data.title}</Card.Header>
        <Card.Description>
          {data.description}
        </Card.Description>
      </Card.Content>
      <Card.Content>
        <Card.Description>
          Valor:
          {" "}
          {data.price}
        </Card.Description>
      </Card.Content>
    </Container>
  </Col>
);

export default ServiceCard;
