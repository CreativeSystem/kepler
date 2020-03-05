import React, { useRef, useEffect, useState, useContext } from "react";
import Switch, { ReactSwitchProps } from "react-switch";

import { Container } from "@components/Form/styles";
import { useField } from "@unform/core";
import { ITheme } from "~/styles/themes";
import { shade } from "polished";

import { ThemeContext } from "styled-components";

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
  onColor,
  offColor,
  ...rest
}) => {
  const switchRef = useRef(null);
  const { fieldName, registerField, defaultValue = defaultChecked } = useField(
    name
  );
  const [checked, setChecked] = useState(defaultValue);
  const theme = useContext<ITheme>(ThemeContext);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: switchRef.current,
      path: "props.checked"
    });
  }, [fieldName, registerField, checked, theme]);

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
        offColor={offColor || theme.default.fg}
        onColor={onColor || shade(0.1, theme.primary.bg)}
        {...rest}
      />
    </Container>
  );
};

export default SwitchInput;
