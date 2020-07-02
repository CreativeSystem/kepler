import { ITheme } from "~/styles/themes";
import styled from "styled-components";

interface Props {
  theme: ITheme;
}

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  border: 0;
  display: grid;
  grid-template-areas: 'header' 
    'content'
    'footer';
  
  grid-template-columns: auto;
  grid-template-rows: 60px auto auto;
    
`;

export const PageContainer = styled.div`
  grid-area: content;
  padding: 10px 20px;
  height: 100%;
  background-color: ${({ theme: { default: Default } }: Props) => Default.bg};
`;
