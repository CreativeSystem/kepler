import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

import Logo from "@assets/img/logo.png";

import { FooterKP } from "./styles";

const Footer: React.FC = () => (
  <FooterKP>
    <div className="kepler-container">
      <img src={Logo} alt="Kepler" />
      <div className="copyright-container">
        <p>
          @Copyright 2020 - Todos os direitos resevados CNPJ 66.666.666/6666-66
          / Times Squarte, nº 1000 New York NY - USA - CEP 66.666-666
        </p>
      </div>
      <br />
      <ul className="privacy">
        <li>
          <a href="/">Termos e condições de uso</a>
        </li>
        <li>
          <a href="/">Privacidade</a>
        </li>
      </ul>
    </div>
    <div className="kepler-container">
      <div className="kepler-title">
        <h2>Kepler</h2>
      </div>
      <ul className="list-info">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/">Sobre nós</a>
        </li>
        <li>
          <a href="/">Fale Conosco</a>
        </li>
      </ul>
    </div>
    <div className="kepler-container">
      <div className="kepler-title">
        <h2>Como Usar</h2>
      </div>
      <ul className="list-info">
        <li>
          <a href="/">Escolhendo um serviço</a>
        </li>
        <li>
          <a href="/">Avaliando usuários</a>
        </li>
        <li>
          <a href="/">Postando um serviço</a>
        </li>
      </ul>
    </div>
    <div className="kepler-container">
      <div className="kepler-title">
        <h2>Social</h2>
        <ul className="list-info">
          <li>
            <a href="/">
              <FaFacebookF className="mr-3" />
              Facebook
            </a>
          </li>
          <li>
            <a href="/">
              <FaInstagram className="mr-3" />
              Instagram
            </a>
          </li>
          <li>
            <a href="/">
              <FaTwitter className="mr-3" />
              Twitter
            </a>
          </li>
        </ul>
      </div>
    </div>
  </FooterKP>
);

export default Footer;
