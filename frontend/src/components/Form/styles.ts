import { FormLabel } from "react-bootstrap";

import styled from "styled-components";

export const Error = styled.span`
  display: block;
  color: ${props => props.theme.danger.bg};
`;

export const Label = styled(FormLabel)`
  font-size: 18px;
  display: block;
  font-style: italic;
`;

export const Container = styled.div`
  display: block;
  margin: 20px 5px;
`;
