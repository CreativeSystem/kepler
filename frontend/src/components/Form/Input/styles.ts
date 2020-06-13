import styled from "styled-components";

import { Container as BContainer } from "@components/Form/styles";

export const Container = styled(BContainer)`
  input:disabled {
    background: none;
    border-radius: 0px;
    border: 0px;
    border-bottom: 1px solid ${props => props.theme.default.fg + "3c"};
  }
`;
