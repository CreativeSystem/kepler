import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import * as SessionActions from "@ducks/session/actions";
import { SessionState, ILogin } from "@ducks/session/types";
import { ApplicationState } from "@store/index";
import { Dispatch, bindActionCreators } from "redux";
import * as Yup from "yup";

import { Container, Box } from "./styles";

enum STEPS {
  EMAIL = "email",
  CPF = "cpf",
  PASSWORD = "password"
}

type StateProps = SessionState;

interface DispatchProps {
  loginRequest(data: ILogin): void;
}

type Props = StateProps & DispatchProps;

const formValidation = Yup.object().shape({
  username: Yup.string()
    .min(5)
    .required(),
  password: Yup.string()
    .min(8)
    .required(),
});

const Login: React.FC<Props> = ({
  loading,
  error,
  isAuthenticated,
  loginRequest,
}) => {
  const handleSubmit = ({ username, password }: any) => {
    loginRequest({ username, password });
  };
  const [step, setStep] = useState(STEPS.EMAIL);

  return (
    <Container>
      <Box>
        {step === STEPS.EMAIL && (
          <div>
            <div className="title-container">
              <h1>Faça Login</h1>

              <h2>Encontre os serviços que procura</h2>
            </div>
            <div className="input-container">
              <input placeholder="Email" maxLength={90} autoFocus required />
            </div>
            <div className="btn-container">
              <button onClick={() => setStep(STEPS.CPF)}>Continuar</button>
            </div>
          </div>
        )}

        {step === STEPS.CPF && (
          <div>
            <div className="arrow-left">
              <FaArrowLeft />
            </div>
            <div className="title-container">
              <h1>Faça Login</h1>

              <h2>Diz ai! Qual o seu CPF?</h2>
            </div>
            <div className="input-container">
              <input placeholder="Cpf" maxLength={90} autoFocus required />
            </div>
            <div className="btn-container">
              <button onClick={() => setStep(STEPS.PASSWORD)}>Continuar</button>
            </div>
          </div>
        )}

        {step === STEPS.PASSWORD && (
          <div>
            <div className="arrow-left">
              <FaArrowLeft />
            </div>
            <div className="title-container">
              <h1>Faça Login</h1>

              <h2>Escolha uma senha</h2>
            </div>
            <div className="input-container">
              <input placeholder="Senha" maxLength={90} autoFocus required />
            </div>
            <div className="btn-container">
              <button>Continuar</button>
            </div>
          </div>
        )}
      </Box>
      {isAuthenticated && <Redirect to="/dashboard" />}
    </Container>
  );
};

const mapStateToProps = ({
  session: { loading, error, isAuthenticated },
}: ApplicationState) => ({
  loading,
  error,
  isAuthenticated,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(SessionActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
