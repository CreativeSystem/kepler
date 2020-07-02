import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import { useHistory } from "react-router-dom";

import Button from "~/components/Button";
import Confirm from "~/components/Confirm";
import Paginator from "~/components/Paginator";
import useTheme from "~/hooks/useTheme";
import { Service } from "~/types";

import { CardContainer, RowTabContainer } from "./styles";

const MyServices: React.FC = () => {
  const [activeKey, setActiveKey] = useState("ativo");
  const [deleteItem, setDeleteItem] = useState<Service | null>(null);
  const [showConfirm, setShowConfim] = useState(false);
  const history = useHistory();
  const theme = useTheme();

  const handleOnSelect = (activeKey:string) => {
    setActiveKey(activeKey);
  };

  const handleOnDelete = (service:Service) => {
    setDeleteItem(service);
    setShowConfim(true);
  };


  return (
    <div className="d-flex flex-column w-100">
      <h3 className="text-center text-bold">Meus Serviços</h3>
      <div className="d-flex flex-wrap">
        <Tab.Container id="left-tabs-example" defaultActiveKey="ativo" onSelect={handleOnSelect}>
          <RowTabContainer className="w-100 bb-1">
            <Col sm={12} md={12} lg={12}>
              <Nav>
                <Nav.Item>
                  <Nav.Link eventKey="ativo">Ativos</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="inativo">Inativos</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </RowTabContainer>
        </Tab.Container>
        <div className="d-flex flex-wrap mt-2 w-100">
          <Paginator<Service>
            url="/api/person/services/"
            pageSize={30}
            active={activeKey === "ativo"}
            renderItem={item => (
              <Col xl="3" lg="4" md="4" sm="6" xs="12" className="mb-3 d-flex justify-content-center" key={item.id}>
                <CardContainer className="cursor">
                  <Carousel interval={null}>
                    {item.service_image?.map((image : any) => (
                      <Carousel.Item key={image}>
                        <img
                          className="d-block w-100"
                          src={image}
                          alt="teste"
                        />
                      </Carousel.Item>
                    )) }
                  </Carousel>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="font-weight-bolder text-center">{item.title}</Card.Title>
                    <Card.Text>
                      {item.description}
                    </Card.Text>
                    <div className="d-flex h-100 align-items-end">
                      <div className="d-flex justify-content-between w-100">
                        <Button onClick={() => { history.push(`/my-services/${item.id}`); }}> Detalhes</Button>
                        <Button variant="warning" onClick={() => handleOnDelete(item)}> Excluir</Button>
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <Card.Text>
                      Valor:
                      {" "}
                      {item.to_match ? <span className="text-success">À Combinar</span> : item.price}
                    </Card.Text>
                  </Card.Footer>
                </CardContainer>

              </Col>
            )}
          />
          <Confirm
            title="Deletar Serviço"
            description={`Você realmente deseja deletar o serviço ${deleteItem?.title} ?`}
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
      </div>
    </div>
  );
};

export default MyServices;
