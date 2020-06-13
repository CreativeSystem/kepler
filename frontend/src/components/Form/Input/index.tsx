/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
import React, { useRef, useEffect } from "react";

import { useField } from "@unform/core";

import { Error, Label } from "@components/Form/styles";

import InputMask, { Props as IMaskProps } from "./InputMask";
import { Container } from "./styles";

interface OwnProps<T = "input" | "mask"> {
  set?: T;
  name: string;
  label?: string;
}

type InputProps = JSX.IntrinsicElements["input"] & OwnProps<"input">;
type MaskProps = IMaskProps & OwnProps<"mask">;

const Input: React.FC<InputProps | MaskProps> = ({
  name,
  set,
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
      {set === "mask" ? (
        <InputMask
          name={fieldName}
          defaultValue={defaultValue}
          onKeyPress={e => e.key === "Enter" && e.preventDefault()}
          {...(rest as Omit<MaskProps, "name">)}
        />
      ) : (
        <input
          className="form-control"
          name={fieldName}
          ref={inputRef}
          defaultValue={defaultValue}
          onKeyPress={e => e.key === "Enter" && e.preventDefault()}
          {...(rest as Omit<InputProps, "name">)}
        />
      )}

      {error && <Error>{error}</Error>}
    </Container>
  );
};

export default Input;
