import React from "react";
import { ButtonProps } from "react-bootstrap";
import { FaSpinner } from "react-icons/fa";

import { StyledButton } from "./styles";

type Props = ButtonProps & JSX.IntrinsicElements["button"];

interface OwnProps extends Props {
  loading?: boolean;
}
const Button: React.FC<OwnProps> = ({ loading = false, children, ...props }) => (
  <StyledButton {...props}>
    {children}
    {loading && <FaSpinner size="1.2rem" className="rotate" />}
  </StyledButton>
);

export default Button;
