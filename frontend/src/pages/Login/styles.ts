import styled from "styled-components";
import Background from "@assets/img/background.svg";

import { Container as BContainer } from "react-bootstrap";

export const Container = styled.div`
  background-image: linear-gradient(
      to top,
      rgba(245, 246, 252, 0.1),
      rgba(245, 245, 245, 0.75),
      rgba(245, 245, 245, 0.95)
    ),
    url('${Background}');
  background-attachment: fixed;
  background-position: right;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContainerFluid = styled(BContainer).attrs({
  fluid: true
})`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Box = styled.div`
  display: flex;
  box-shadow: 0px 4px 10px #22222255;
  padding: 25px 20px;
  border-radius: 4px;
  filter: none;
  background-color: rgba(245, 245, 245, 0.5);
  img {
    padding: 10px;
    max-width: 90%;
    max-height: 130px;
    min-height: 60px;
  }
  form {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
