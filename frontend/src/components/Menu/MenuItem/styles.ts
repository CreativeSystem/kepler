import styled from "styled-components";
import { Link } from "react-router-dom";
import { ITheme } from "~/styles/theme";
interface Props {
  active: boolean;
  theme: ITheme;
}
export const Container = styled.li.attrs({
  className: "nav-item"
})`
  width: 100%;
  padding: 5px 0px;
  list-style: none;
  :hover {
    box-shadow: 1px 1px 10px #22222277;
    background-color: ${({ theme }: Props) => theme.primary.bg};
    font-size: 1.15em;
  }
  ${({ active, theme: { primary } }: Props) =>
    // eslint-disable-next-line
    active
      ? "box-shadow: 1px 1px 10px #22222277;" +
        "background-color: " +
        primary.bg +
        ";font-size: 1.15em;"
      : ""}
`;

export const MenuLink = styled(Link).attrs({
  className: "nav-link"
})`
  color: ${({ theme }: Props) => theme.primary.bg};
  font-weight: 500;
  font-size: 1.1em;
  margin-right: 0.1em;
  display: flex !important;
  align-content: center;
  justify-items: center;

  svg {
    align-self: center;
    margin-right: 2px;
  }
  :hover {
    color: ${({ theme }: Props) => theme.primary.fg};
  }
  ${({ active, theme: { primary } }: Props) =>
    active ? "color: " + primary.fg + ";" : ""}
`;
