import React from "react";

import { Form } from "@unform/core";

import { Input, DatePicker, Switch } from "@components/Form";

import { Container, Card, InterestsContainer } from "./styles";

const UserInfo: React.FC = () => (
  <Container>
    <Card>
      <Card.Body>
        <Card.Title>Cadastrar Dados</Card.Title>
        <Card.Subtitle>Dados Pessoais</Card.Subtitle>
        <Form className="card" onSubmit={() => {}}>
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
            <Switch name="001" label="psicologia" />
            <Switch name="002" label="psicologia" />
            <Switch name="003" label="psicologia" />
            <Switch name="004" label="psicologia" />
          </InterestsContainer>
        </Form>
      </Card.Body>
    </Card>
  </Container>
);

export default UserInfo;
