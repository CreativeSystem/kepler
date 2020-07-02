import { InputGroup as BInputGroup } from "react-bootstrap";

import { ITheme } from "~/styles/themes";
import styled from "styled-components";

interface Props {
  theme: ITheme;
}

export const Container = styled.header`
  height: 8vh;
  grid-area: header;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({
    theme: {
      primary: { bg },
    },
  }: Props) => bg};
  max-width: 100%;
  width: 100%;
  position: sticky;
  z-index: 500;
  padding: 3px;
`;

export const InputGroupPrepend = styled(BInputGroup.Prepend)`
  background-color: none;
`;
