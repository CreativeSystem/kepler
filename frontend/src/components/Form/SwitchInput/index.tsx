/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
import React, { useRef, useEffect, useState } from "react";
import Switch, { ReactSwitchProps } from "react-switch";

import { useField } from "@unform/core";

// interface Props extends ReactSwitchProps {
//   name: string;
// }

type Props = Omit<ReactSwitchProps, "checked" | "onChange"> & {
  name: string;
  checked?: boolean;
};

const SwitchInput: React.FC<Props> = ({ name, ...rest }) => {
  const switchRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [checked, setChecked] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: switchRef.current,
      path: "props.checked"
    });
  }, [fieldName, registerField, checked]);

  return (
    <Switch
      ref={switchRef}
      defaultValue={defaultValue}
      onChange={(checked, event, id) => {
        setChecked(checked);
      }}
      checked={checked}
      {...rest}
    />
  );
};

export default SwitchInput;
