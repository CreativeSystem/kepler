import { Card, CardProps } from "react-bootstrap";

import { ITheme } from "~/styles/themes";
import styled from "styled-components";

interface Props extends CardProps {
  theme: ITheme;
}

export const CardContainer = styled(Card)<Props>`
  min-height: 400px;
  width: 100% !important;

  transition: transform 0.2s;
  p > span {
    color: rgba(0,0,0,0.4);
  }
  p > svg,p > a > svg {
    color: rgba(0,0,0,0.87);
    margin-top: 5px;
    font-size: 1.75rem;
  }
  p > svg + svg,p > a + a,p > a + svg,p > svg + a {
    margin-left: 1em;
  }
`;
