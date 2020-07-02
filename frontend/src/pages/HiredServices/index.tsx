import React from "react";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Col from "react-bootstrap/Col";
import {
  FaWhatsapp, FaPhone, FaFacebook, FaTwitter, FaInstagram,
} from "react-icons/fa";

import Paginator from "~/components/Paginator";
import { HiredService } from "~/types";
import { Rating } from "semantic-ui-react";

import { CardContainer } from "./styles";

const HiredServices: React.FC = () => (
  <div className="d-flex flex-column w-100">
    <h3 className="text-center text-bold">Histórico de Serviços</h3>
    <div className="d-flex flex-wrap">
      <Paginator<HiredService>
        url="/api/person/hired-services/"
        pageSize={30}
        renderItem={({ service, id }) => (
          <Col xl="3" lg="4" md="4" sm="6" xs="12" className="mb-3 d-flex justify-content-center" key={id}>
            <CardContainer className="cursor">
              <Carousel interval={null}>
                {service.service_image?.map((image : any) => (
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
                <Card.Title className="font-weight-bolder text-center">{service.title}</Card.Title>
                <Card.Text>
                  <span>
                    Pestrador:
                  </span>
                  <p className="font-weight-bolder">
                    {service.person.name}
                  </p>
                </Card.Text>
                <Card.Text>
                  <span>
                    Método de contato:
                  </span>
                  <p className="font-weight-bolder">
                    { service.person.whatsapp && (
                      <a href={`http://api.whatsapp.com/send?1=pt_BR&phone=${service.person.whatsapp.replace(/[^0-9]+/g, "")}`}>
                        <FaWhatsapp />
                      </a>
                    )}
                    { service.person.telephone && <FaPhone />}
                    { service.facebook && (
                      <a href={service.facebook}>
                        <FaFacebook />
                      </a>
                    )}
                    { service.instagram && (
                    <a href={service.instagram}>
                      <FaInstagram />
                    </a>
                    )}
                    { service.twitter && (
                    <a href={service.twitter}>
                      <FaTwitter />
                    </a>
                    )}
                  </p>
                </Card.Text>
                <Card.Text className="d-flex align-items-center">
                  <span className="mr-2">
                    Avaliação
                  </span>
                  <Rating icon="star" defaultRating={0} maxRating={5} size="huge" />
                </Card.Text>
              </Card.Body>
            </CardContainer>
          </Col>
        )}
      />
    </div>
  </div>
);

export default HiredServices;
