import React from "react";
import { StyledButton } from "./styles";
import { ButtonProps } from "react-bootstrap";
import { FaSpinner } from "react-icons/fa";

type Props = ButtonProps & JSX.IntrinsicElements["button"];

interface OwnProps extends Props {
  loading?: boolean;
}
const Button: React.FC<OwnProps> = ({ loading = false, children, ...props }) => {
  return (
    <StyledButton {...props}>
      {children}
      {loading && <FaSpinner size="1.2rem" className="rotate" />}
    </StyledButton>
  );
};

export default Button;
