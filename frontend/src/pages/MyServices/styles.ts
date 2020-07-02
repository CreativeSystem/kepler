import { Card, CardProps } from "react-bootstrap";
import Row from "react-bootstrap/Row";


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

export const RowTabContainer = styled(Row)`
  .nav{
    border-bottom: 1px solid rgba(0,0,0,0.2);
  }
  .nav .nav-item a{
    color: #333333AA !important;
    font-weight: bold;
    font-size: 1.5rem;
  }
  .nav .nav-item .nav-link{
    transition: border-bottom 0.2s;
  }

  .nav .nav-item .nav-link.active,.nav .nav-item .nav-link:hover:not(.active){
    border-bottom: 3px solid #1A3A42;
  }

`;
