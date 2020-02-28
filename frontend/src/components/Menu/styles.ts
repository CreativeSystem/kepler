import Background from "@assets/img/background.svg";
import { ITheme } from "~/styles/theme";

import styled from "styled-components";


interface Props {
  theme: ITheme;
}

export const Container = styled.nav.attrs({
  className: "nav flex-column collapse show flex-nowrap",
})`
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  width: 250px;
  height: 100%;
  background-color: ${({ theme: { default: Default } }: Props) => Default.bg};
  box-shadow: 1px 2px 10px #22222270;
  z-index: 100;
  margin-right: 2px;

  overflow: hidden;
  background-image: linear-gradient(
      to top,
      rgba(245, 246, 252, 0.1),
      rgba(245, 245, 245, 0.85),
      rgba(245, 245, 245, 0.98)
    ),
    url(${Background});
  background-position: left;
  background-size: cover;

  @media (max-width: 576px) {
    position: fixed;
    width: 100%;
    max-width: 350px;
    background-color: ${({ theme: { default: Default } }: Props) => `${Default.bg}88`};
    z-index: 1000;
    margin-right: 0px;
  }
`;
export const Header = styled.div`
  min-height: 10%;
  height: 20%;
  padding: 10px;
`;

export const Body = styled.div`
  max-height: 80%;
  padding-bottom: 10px;
  width: 100%;
  overflow: hidden;
  :hover {
    overflow-y: auto;
  }
  a {
    text-decoration: none;
  }
  @media (max-width: 576px) {
    max-height: 70%;
    padding-bottom: 10px;
    width: 100%;
    overflow: hidden;
  }
`;

export const Logo = styled.img.attrs({
  className: "rounded mx-auto d-block logo",
})`
  max-width: 90%;
  max-height: 98%;
`;

export const Items = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
`;
