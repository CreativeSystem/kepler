import React from "react";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import { useHistory } from "react-router-dom";

import { Service } from "~/types";


import { Container } from "./styles";

export interface Props{
  data: Service
}

const ServiceCard : React.FC<Props> = ({ data }) => {
  const history = useHistory();

  return (
    <Container className="cursor" onClick={() => { history.push(`/services/${data.id}`); }}>
      <Carousel interval={null}>
        {data.service_image.map((image : any) => (
          <Carousel.Item key={image}>
            <img
              className="d-block w-100"
              src={image}
              alt="teste"
            />
          </Carousel.Item>
        )) }
      </Carousel>
      <Card.Body>
        <Card.Title>{data.title}</Card.Title>
        <Card.Text>
          {data.description}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Card.Text>
          Valor:
          {" "}
          {data.to_match ? <span className="text-success">À Combinar</span> : data.price}
        </Card.Text>
      </Card.Footer>
    </Container>
  );
};

export default ServiceCard;
