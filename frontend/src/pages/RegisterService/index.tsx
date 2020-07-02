import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import { useParams } from "react-router-dom";

import { Form } from "@unform/web";
import Button from "~/components/Button";
import { Input, TextArea } from "~/components/Form";
import { Service } from "~/types";

import api from "@services/api";

import { CardContainer } from "./styles";

interface Params{
  id?: string
}

const RegisterService: React.FC = () => {
  const { id } = useParams<Params>();
  const [service, setService] = useState<Service>();

  useEffect(() => {
    async function loadService() {
      if (id) {
        const { data: service } = await api.get<Service>(`/api/person/services/${id}/`);
        setService(service);
      }
    }

    loadService();
  }, [id]);

  return (
    <div className="d-flex flex-column w-100">
      <h3 className="text-center text-bold">Detalhe do Serviço</h3>
      <CardContainer>
        <Form onSubmit={() => {}}>
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
            <Input name="title" label="Titulo" placeholder="coloque o titilo aqui" />
            <TextArea name="description" label="Descrição" placeholder="insira a descricao" />
            <div className="row">
              <div className="col-md-6">
                <Input name="price" label="Preço" placeholder="insira a descricao" />
              </div>
              <div className="col-md-6 d-flex align-items-end pb-2">
                <Input name="to_macth" label="A combinar" type="checkbox" />
              </div>
            </div>
            <Input name="facebook" label="Facebook" />
            <Input name="instragram" label="Instagram" />
            <Input name="instragram" label="Instagram" />

          </Card.Body>
        </Form>

      </CardContainer>
    </div>
  );
};

export default RegisterService;
