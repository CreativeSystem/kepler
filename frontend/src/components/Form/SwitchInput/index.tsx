/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
import React, { useRef, useEffect, useState } from "react";
import Switch, { ReactSwitchProps } from "react-switch";

import { useField } from "@unform/core";
import { shade } from "polished";

import { Container } from "../styles";
import { SwitchLabel } from "./styles";

type Props = Omit<ReactSwitchProps, "checked" | "onChange"> & {
  name: string;
  defaultChecked: boolean;
  label?: string;
};

const SwitchInput: React.FC<Props> = ({
  name,
  defaultChecked,
  label,
  ...rest
}) => {
  const switchRef = useRef(null);
  const { fieldName, registerField, defaultValue = defaultChecked } = useField(
    name
  );
  const [checked, setChecked] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: switchRef.current,
      path: "props.checked"
    });
  }, [fieldName, registerField, checked]);

  return (
    <Container>
      <SwitchLabel>{label}</SwitchLabel>
      <Switch
        ref={switchRef}
        onChange={(checked, event, id) => {
          setChecked(checked);
        }}
        checked={checked}
        checkedIcon={false}
        uncheckedIcon={false}
        height={20}
        width={40}
        handleDiameter={14}
        offColor={shade(0.3, "#6CA0B7")}
        onColor="#073345"
        {...rest}
      />
    </Container>
  );
};

export default SwitchInput;
