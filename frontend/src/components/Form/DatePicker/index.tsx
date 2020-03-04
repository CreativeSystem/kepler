/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
import React, { useRef, useState, useEffect } from "react";
import ReactDatePicker, {
  ReactDatePickerProps,
  registerLocale
} from "react-datepicker";

import { useField } from "@unform/core";
import { ptBR } from "date-fns/locale";

import { Error, Label, Container } from "../styles";

import "react-datepicker/dist/react-datepicker.css";

registerLocale("ptBR", ptBR);

interface Props extends Omit<ReactDatePickerProps, "onChange"> {
  name: string;
  label: string;
}

const DatePicker: React.FC<Props> = ({ name, label, ...rest }) => {
  const datepickerRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [date, setDate] = useState(defaultValue || null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      path: "props.selected",
      clearValue: (ref: any) => {
        ref.clear();
      }
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <Label>{label}</Label>
      <ReactDatePicker
        ref={datepickerRef}
        selected={date}
        onChange={setDate}
        locale="ptBR"
        dateFormat="dd/MM/yyyy"
        {...rest}
      />
      {error && <Error className="error">{error}</Error>}
    </Container>
  );
};

export default DatePicker;
