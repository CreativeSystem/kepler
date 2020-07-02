/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
import React, { useRef, useEffect } from "react";

import { useField } from "@unform/core";

import { Error, Label } from "@components/Form/styles";

import { Container } from "./styles";

interface Props{
  name: string;
  label?: string;
}

type OwnProps = JSX.IntrinsicElements["textarea"] & Props;

const Input: React.FC<OwnProps> = ({
  name,
  label,
  ...rest
}) => {
  const inputRef = useRef(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    if (inputRef.current) {
      registerField({
        name: fieldName,
        ref: inputRef.current,
        path: "value"
      });
    }
  }, [fieldName, registerField]);

  return (
    <Container>
      <Label>{label}</Label>

      <textarea
        className="form-control"
        name={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        onKeyPress={e => e.key === "Enter" && e.preventDefault()}
        {...(rest as Omit<OwnProps, "name">)}
      />


      {error && <Error>{error}</Error>}
    </Container>
  );
};

export default Input;
