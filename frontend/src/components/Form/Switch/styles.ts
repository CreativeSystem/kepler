import styled from "styled-components";

import { Label, Container as BContainer } from "../styles";

export const SwitchLabel = styled(Label)`
  display: inline;
  vertical-align: top;
  margin: 5px 5px;
`;

export const Container = styled(BContainer)`
  display: inline;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
