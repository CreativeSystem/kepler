import styled from "styled-components";

export const FooterKP = styled.div`
  width: 100%;
  background-color: #A9A9A9;
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  div.kepler-container {
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;

    img {
      width: 205px;
      height: 37px;
      margin-bottom: 10px;
    }

    p {
      font-size: 10px;
    }

    div.copyright-container {
      margin-top: 10px;
    }

    ul {
      margin-top: 20px;
      list-style-type: none;
    }

    ul li a {
      text-decoration: none;
      color: #000;
    }

    ul li a:hover {
      color: #3071BC;
      transition: all 0.3s;
    }

    ul.list-info {
      text-align: left;
      width: 100%;

      li {
        width: 60%;
        padding: 10px 0px;
        border-bottom: 1px solid #c4c4c4;
      }
    }
  }

  div.kepler-title {
    width: 100%;
    text-align: left;
  }

  @media screen and (min-width: 640px) {

  }
`;
