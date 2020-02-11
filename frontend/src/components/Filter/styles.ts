import styled from "styled-components";
import { ITheme } from "~/styles/theme";
import { Dropdown } from "semantic-ui-react";
interface Props {
  theme: ITheme;
}
export const Container = styled(Dropdown)`
  background-color: ${({
    theme: {
      primary: { bg }
    }
  }: Props) => bg} !important;
  color: ${({
    theme: {
      primary: { fg }
    }
  }: Props) => fg} !important;
  margin: 0px 8px;
  cursor: pointer;
  border-radius: 3px;
`;

export const NameContainer = styled.span`
  padding: 4px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  svg {
    margin-left: 6px;
  }
`;
