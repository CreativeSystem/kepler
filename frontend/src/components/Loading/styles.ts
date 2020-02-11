import styled from "styled-components";
import { ITheme } from "~/styles/theme";

interface Props {
  theme: ITheme;
}

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 92vh;
`;
export const LoadingText = styled.p`
  font-weight: bold;
  font-size: 3rem;
  color: ${({ theme: { primary } }: Props) => primary.bg};
  animation: wiggle 2.5s infinite;
`;
