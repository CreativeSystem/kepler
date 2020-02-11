import styled from "styled-components";
import { ITheme } from "~/styles/theme";

interface Props {
  theme: ITheme;
}

export const Container = styled.div`
  padding: 0;
  margin: 0;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  border: 0;

  #menu.collapsing {
    -webkit-transition: none;
    transition: none;
  }
  #menu.collapse {
    visibility: hidden;
    width: 0px;
  }
  #menu.collapse.show {
    visibility: visible;
    width: 250px;
  }
`;

export const ToggleMenu = styled.a`
  align-self: flex-start;
  justify-self: center;
  position: absolute;
  height: 50px;
  width: 50px;
  color: ${({ theme }: Props) => theme.primary.fg};
  background-color: ${({ theme }: Props) => theme.primary.bg};
  border-radius: 25px;
  top: calc(50% - 25px);
  transform: translateX(-29px);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.1s ease-in-out;
  z-index: 2000;
  :hover {
    border-radius: 27px;
    text-decoration: none;
    height: 54px;
    width: 54px;
    transform: translateX(-20px);
    top: calc(50% - 27px);
    color: ${({ theme }: Props) => theme.primary.fg};
    background-color: ${({ theme }: Props) => theme.primary.bg};
  }
  :not(.collapsed) {
    transform: translateX(-29px) rotate(180deg);
  }

  @media (max-width: 576px) {
    .toggle-menu:not(.collapsed) {
      transform: translateX(4px) rotate(180deg);
      align-self: flex-end;
    }
  }
`;

export const Content = styled.div`
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const ContainerWrapper = styled.div`
  margin: 0;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  border: 0;
  display: flex;
`;
export const PageContainer = styled.div`
  max-width: 100%;
  height: 92vh;
  padding: 10px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
