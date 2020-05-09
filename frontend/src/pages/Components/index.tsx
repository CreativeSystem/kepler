import React, { useState } from "react";

import {
  DatePicker,
  Uploader,
  Input,
  Rater,
  Select,
  Switch,
  Image,
} from "@components/Form";
import { Form } from "@unform/web";

import { Container, LogContainer, Code } from "./styles";

const Components: React.FC = () => {
  const [formData, setFormData] = useState("");

  function handleSubmit(data: any) {
    setFormData(JSON.stringify(data, null, 1));
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <div className="form-group">
          <DatePicker name="datePicker" label="Escolha uma data" />
        </div>
        <div className="form-group">
          <Uploader
            accept="image/*"
            renderFile={(file, index) => <Image file={file} name={`files[${index}]`} />}
          />
        </div>
        <div className="form-group">
          <Input name="input" placeholder="teste" />
        </div>
        <div className="form-group">
          <Input
            name="mask"
            label="Bota o telefone"
            set="mask"
            mask="(99) 9-9999-9999"
          />
        </div>
        <div className="form-group">
          <Rater
            name="rater"
            label="Estrelas"
            icon="star"
            maxRating={5}
            defaultRating={3}
          />
        </div>
        <div className="form-group">
          <Select name="select" />
        </div>
        <div className="form-group">
          <Switch name="switch" defaultChecked={false} label="Serviço" />
        </div>

        <button type="submit" className="btn btn-primary">
          SUBMIT
        </button>
      </Form>
      <LogContainer>
        <h1>Output:</h1>
        <Code>{formData}</Code>
      </LogContainer>
    </Container>
  );
};

export default Components;
