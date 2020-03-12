import React from "react";
import { Button } from "react-bootstrap";

import { Form } from "@unform/core";

import { Input, DatePicker, Switch } from "@components/Form";

import { Container, Card, InterestsContainer } from "./styles";

const UserInfo: React.FC = () => (
  <Container>
    <Card>
      <Form className="card" onSubmit={() => {}}>
        <Card.Body>
          <Card.Title>Cadastrar Dados</Card.Title>
          <Card.Subtitle>Dados Pessoais</Card.Subtitle>

          <Input name="email" value="teste@teste.com" disabled />
          <Input
            name="cpf"
            mask="999.999.999-99"
            value="495.265.338-28"
            disabled
          />
          <Input name="name" label="Nome Completo:" />
          <Input
            name="whatsapp"
            set="mask"
            mask="(99)9 9999-9999"
            label="Whatsapp:"
          />
          <Input
            name="celular"
            set="mask"
            mask="(99) 9999-9999"
            label="Celular:"
          />
          <DatePicker
            name="data-nascimento"
            label="Data de Nascimento:"
            showYearDropdown
          />
          <Card.Subtitle>Interesses:</Card.Subtitle>
          <InterestsContainer>
            <Switch name="001" label="Psicologia" />
            <Switch name="002" label="Psicologia" />
            <Switch name="003" label="Psicologia" />
            <Switch name="004" label="Psicologia" />
            <Switch name="001" label="Psicologia" />
            <Switch name="002" label="Psicologia" />
            <Switch name="003" label="Psicologia" />
            <Switch name="004" label="Psicologia" />
            <Switch name="001" label="Psicologia" />
            <Switch name="002" label="Psicologia" />
            <Switch name="003" label="Psicologia" />
            <Switch name="004" label="Psicologia" />
            <Switch name="001" label="Psicologia" />
            <Switch name="002" label="Psicologia" />
            <Switch name="003" label="Psicologia" />
          </InterestsContainer>
          <div className="d-flex justify-content-end">
            <Button variant="danger" className="mr-2">Cancelar</Button>
            <Button variant="success">Enviar</Button>
          </div>
        </Card.Body>
      </Form>
    </Card>
  </Container>
);

export default UserInfo;
