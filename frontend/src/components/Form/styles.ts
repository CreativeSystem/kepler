import { FormLabel } from "react-bootstrap";

import styled from "styled-components";

export const Error = styled.span`
  display: block;
  color: ${props => props.theme.danger.bg};
`;

export const Label = styled(FormLabel)`
  font-size: 16px;
  display: block;
  color: #333333AA;
`;

export const Container = styled.div`
  display: block;
  margin: 20px 5px;
`;
