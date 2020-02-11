import styled from "styled-components";

import { ITheme } from "~/styles/theme";

interface Props {
  theme: ITheme;
}

export const Container = styled.header`
  height: 8vh;
  background-color: ${({
    theme: {
      default: { bg }
    }
  }: Props) => bg};
  box-shadow: 1px 1px 3px #22222270;
  max-width: 100%;
  position: sticky;
  z-index: 500;
  padding: 3px;
`;
