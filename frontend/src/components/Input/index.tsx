import React, { useRef, useEffect } from "react";

import { useField } from "@unform/core";

type Props = JSX.IntrinsicElements["input"] & {name: string, placeholder: string};

const Input: React.FC<Props> = ({ name, placeholder, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    fieldName,
    defaultValue,
    registerField,
    error,
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <>
      <input
        name={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        placeholder={placeholder}
        {...rest}
      />
      {error && <span className="error">{error}</span>}
    </>
  );
};

export default Input;
