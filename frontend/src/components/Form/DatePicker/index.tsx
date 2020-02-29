/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
import React, { useRef, useState, useEffect } from "react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";

import { useField } from "@unform/core";

import "react-datepicker/dist/react-datepicker.css";

interface Props extends Omit<ReactDatePickerProps, "onChange"> {
  name: string;
}

const DatePicker: React.FC<Props> = ({ name, ...rest }) => {
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
    <>
      <ReactDatePicker
        ref={datepickerRef}
        selected={date}
        onChange={setDate}
        {...rest}
      />
      {error && <span className="error">{error}</span>}
    </>
  );
};

export default DatePicker;
