import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import { useParams } from "react-router-dom";

import Button from "~/components/Button";
import Confirm from "~/components/Confirm";
import { useTheme } from "~/hooks";
import { Service } from "~/types";

import api from "@services/api";

import { CardContainer } from "./styles";

interface Params{
  id: string
}

const ServicesDetail: React.FC = () => {
  const { id } = useParams<Params>();
  const [service, setService] = useState<Service>();
  const [showConfirm, setShowConfim] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    async function loadService() {
      const { data: service } = await api.get<Service>(`/api/services/${id}/`);
      setService(service);
    }

    loadService();
  }, [id]);
  return (
    <div className="d-flex flex-column w-100">
      <h3 className="text-center text-bold">Detalhe do Serviço</h3>
      <CardContainer>
        <Carousel interval={null}>
          {service?.service_image.map((image : any) => (
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
          <Card.Title>
            {service?.title}
          </Card.Title>
          <Card.Text>
            {service?.description}
          </Card.Text>
          <Card.Text>
            Valor:
            {" "}
            {service?.price}
          </Card.Text>
          <div className="d-flex justify-content-center">
            <Button variant="warning" size="lg" className="w-75" onClick={() => setShowConfim(true)}> Contratar </Button>
          </div>
        </Card.Body>
      </CardContainer>
      <Confirm
        title="Contrar Serviço"
        description={`Você realmente deseja contratar o serviço ${service?.title} ?`}
        isShowing={showConfirm}
        onHide={() => setShowConfim(false)}
        options={
          {
            header: {
              color: theme.warning,
            },
            buttons: {
              yes: {
                color: theme.warning,
              },
            },
          }
        }
      />
    </div>
  );
};

export default ServicesDetail;
