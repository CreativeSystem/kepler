import React from "react";
import { StyledButton } from "./styles";
import { ButtonProps } from "react-bootstrap";
import { FaSpinner } from "react-icons/fa";

interface OwnProps extends ButtonProps {
  loading?: boolean;
}
const Button: React.FC<OwnProps> = ({ loading = false, ...props }) => {
  return (
    <StyledButton {...props}>
      {props.children}
      {loading && <FaSpinner size="1.2rem" className="rotate" />}
    </StyledButton>
  );
};

export default Button;
