/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
import React, { useRef, useEffect } from "react";
import ReactInputMask, { Props as InputProps } from "react-input-mask";

import { useField } from "@unform/core";

export type Props = InputProps & { name: string };

const InputMask: React.FC<Props> = ({ name, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
      setValue(ref: any, value: string) {
        ref.setInputValue("");
      },
      clearValue(ref: any) {
        ref.setInputValue("");
      }
    });
  }, [fieldName, registerField]);

  return (
    <ReactInputMask
      className="form-control"
      ref={inputRef}
      defaultValue={defaultValue}
      {...rest}
    />
  );
};

export default InputMask;
