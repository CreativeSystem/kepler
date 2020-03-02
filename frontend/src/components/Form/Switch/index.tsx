/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
import React, { useRef, useEffect, useState } from "react";
import Switch, { ReactSwitchProps } from "react-switch";

import { useField } from "@unform/core";

interface Props extends ReactSwitchProps {
  name: string;
}

const SwitchInput: React.FC<Props> = ({ name, ...rest }) => {
  const switchRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: switchRef.current,
      path: "value"
    });
  }, [fieldName, registerField, checked]);

  return (
    <Switch
      ref={switchRef}
      onChange={(checked, event, id) => {
        setChecked(checked.valueOf);
      }}
      checked={checked}
      {...rest}
    />
  );
};

export default SwitchInput;
