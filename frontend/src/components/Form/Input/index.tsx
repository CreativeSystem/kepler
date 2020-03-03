/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
import React, { useRef, useEffect } from "react";

import { useField } from "@unform/core";

import InputMask, { Props as IMaskProps } from "./InputMask";

interface OwnProps<T = "input" | "mask"> {
  set?: T;
  name: string;
}

type InputProps = JSX.IntrinsicElements["input"] & OwnProps<"input">;
type MaskProps = IMaskProps & OwnProps<"mask">;

const Input: React.FC<InputProps | MaskProps> = ({ name, set, ...rest }) => {
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
    <>
      {set === "mask" ? (
        <InputMask
          name={fieldName}
          defaultValue={defaultValue}
          {...(rest as MaskProps)}
        />
      ) : (
        <input
          name={fieldName}
          ref={inputRef}
          defaultValue={defaultValue}
          {...(rest as InputProps)}
        />
      )}

      {error && <span className="error">{error}</span>}
    </>
  );
};

export default Input;
