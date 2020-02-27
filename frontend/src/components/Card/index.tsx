import React from "react";
import { Container } from "./styles";

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
const Card: React.FC<Props> = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};
export default Card;
