import styled from "styled-components";

import { ITheme } from "../../../styles/themes";

interface Props {
  theme: ITheme;
}

export const Container = styled.header`
  padding-right: 5px;
`;

export const Dropdown = styled.div.attrs({
  className: "dropdown-menu",
})`
  background-color: ${({
    theme: {
      default: { bg },
    },
  }: Props) => bg};
  box-shadow: 0px 1px 10px #22222255;
`;
export const DropdownItem = styled.button.attrs({
  className: "dropdown-item",
})`
  display: flex !important;
  align-content: center;
  justify-items: center;
  :hover{
    background-color: ${({ theme }: Props) => theme.primary.bg} !important;
    box-shadow: 1px 1px 8px #22222277 !important;
    color: ${({ theme }: Props) => theme.default.bg} !important;
    a {
      color: ${({ theme }: Props) => theme.default.bg} !important;
    }
  }

  a {
    color: ${({ theme }: Props) => theme.default.fg} !important;
    font-weight: 500;
    font-size: 1em;
  }
  svg {
    align-self: center;
    margin-right: 2px;
  }
`;

export const IconContainer = styled.a`
  border: 3px solid
    ${({
    theme: {
      default: { bg },
    },
  }: Props) => bg};
  color: ${({
    theme: {
      default: { bg },
    },
  }: Props) => bg};
  display: flex;
  padding: 2px 2px 2px 5px;
  border-radius: 5px;
  svg {
    align-self: center;
    justify-self: center;
  }
  :hover {
    color: ${({
    theme: {
      default: { bg },
    },
  }: Props) => bg};
    
    transition: all 0.2s ease-in-out;
    transform: scale(1.1);
  }
`;
