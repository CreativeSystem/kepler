/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
import React, { useRef, useEffect } from "react";
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps
} from "react-select";

import { useField } from "@unform/core";

import { Container, Error, Label } from "../styles";

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
  label?: string;
}

const Select: React.FC<Props> = ({ name, label, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: "state.value",
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }

          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return "";
        }

        return ref.state.value.value;
      }
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Container>
      <Label>{label}</Label>
      <ReactSelect
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        {...rest}
      />
      {error && <Error className="error">{error}</Error>}
    </Container>
  );
};

export default Select;
