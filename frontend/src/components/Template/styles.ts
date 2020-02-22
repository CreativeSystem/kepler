import { ITheme } from "~/styles/theme";

import styled from "styled-components";

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

export const Content = styled.div`
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const PageContainer = styled.div`
  max-width: 100%;
  height: 92vh;
  padding: 10px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
