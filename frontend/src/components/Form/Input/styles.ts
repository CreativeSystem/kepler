import styled, { css } from "styled-components";

import { Container as BContainer } from "@components/Form/styles";

const alignItemEnd = css`
  display: flex;
  align-items: end;
  margin-bottom: 0;
`;

type Props = {alignEnd?: boolean} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Container = styled(BContainer)<Props>`
  ${({ alignEnd }) => alignEnd && alignItemEnd}
  input:disabled {
    background: none;
    border-radius: 0px;
    border: 0px;
    border-bottom: 1px solid ${props => props.theme.default.fg + "3c"};
  }

`;
