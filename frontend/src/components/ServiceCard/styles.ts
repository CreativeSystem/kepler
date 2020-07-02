import { Card } from "react-bootstrap";

import styled from "styled-components";

export const Container = styled(Card)`
  min-height: 400px;
  width: 100% !important;

  transition: transform 0.2s;
  :hover{
    transform: scale(1.03);
  }
`;
