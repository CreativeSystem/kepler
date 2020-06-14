import styled from "styled-components";

import Background from "@assets/img/background.png";


export const Container = styled.div`
  background-image: url('${Background}');
  background-position: right;
  background-size: cover;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const Box = styled.div`
  width: 490px;
  height: 450px;
  margin-left: 50px;
  background-color: #D1D4E0;
  box-shadow: 5px 10px 4px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;

 /*Container do título e cabeçalho*/
  div.title-container {
    text-align: center;
    font-size: 30px;
    line-height: 35px;
    padding: 0px 10px;

    h2 {
      font-weight: normal;
    }
  }

  /*Container do input*/
  div.input-container {
    width: 410px;
    margin-top: 40px;

    /*Formatação do input*/
    input {
      width:100%;
      height: 48px;
      border-radius: 5px;
      border: 1px solid #9a9a9a;
      padding: 0px 20px;
      color: #333;
      text-transform: lowercase;
    }

    input::placeholder {
      color: #4d4d4d;
      text-transform: capitalize;
    }
  }

  /*Container do botão*/
  div.btn-container {
    width: 410px;
    margin-top: 30px;
    margin-bottom: 10px;

    /*Formatação do botão*/
    button {
      width: 100%;
      height: 48px;
      border: none;
      border-radius: 5px;
      background-color: #1F94B1;
      color: #E2E2E2;
    }
  }

  div.arrow-container {
    position: absolute;
    top: 40px;
    left: 50px;
  }

  button.arrow-left {
    background-color: transparent;
    border: none;
  }

  /*Estilos para quando a tela tive no máximo 640px de largura*/
  @media (max-width: 840px) {
    width: 100%;
    height: 100%;
    padding: 30px;
    margin: 0;
    border-radius: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    div.input-container {
      width: 100%;
      padding: 0 2%;
    }

    div.btn-container {
      width: 100%;
      padding: 0 2%;
    }
  }
`;
