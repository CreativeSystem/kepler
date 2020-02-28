import React, { useState, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import Input from "@components/Input";
import * as SessionActions from "@ducks/session/actions";
import { SessionState, ILogin } from "@ducks/session/types";
import { ApplicationState } from "@store/index";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
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

const emailValidation = Yup.string()
  .max(90)
  .email("Email inválido")
  .required("Informe o email");

const cpfValidation = Yup.string()
  .length(11)
  .required("Informe o cpf");

const passwordValidation = Yup.string()
  .max(20)
  .min(8)
  .required("Informe uma senha");

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
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");

  const formRef = useRef<FormHandles>(null);

  const handleOnStep = async () => {
    if (step === STEPS.EMAIL) {
      const emailInput = formRef.current?.getFieldRef("email");
      if (await emailValidation.isValid(emailInput.value)) setStep(STEPS.CPF);
    } else if (step === STEPS.CPF) {
      const cpfInput = formRef.current?.getFieldRef("cpf");
      if (await cpfValidation.isValid(cpfInput.value)) setStep(STEPS.PASSWORD);
    } else {
      const passwordInput = formRef.current?.getFieldRef("password");
      if (await passwordValidation.isValid(passwordInput.value)) setPassword(passwordInput.value);
    }
  };

  return (
    <Container>
      <Box>
        <Form onSubmit={() => handleSubmit({ username: email, password })} ref={formRef}>
          {step === STEPS.EMAIL && (
            <div>
              <div className="title-container">
                <h1>Faça Login</h1>

                <h2>Encontre os serviços que procura</h2>
              </div>
              <div className="input-container">
                <Input
                  name="email"
                  placeholder="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="btn-container">
                <button type="button" onClick={() => handleOnStep()}>
                  Continuar
                </button>
              </div>
            </div>
          )}

          {step === STEPS.CPF && (
            <>
              <div className="arrow-container">
                <button
                  onClick={() => setStep(STEPS.EMAIL)}
                  className="arrow-left"
                  type="button"
                >
                  <FaArrowLeft />
                </button>
              </div>
              <div>
                <div className="title-container">
                  <h1>Faça Login</h1>

                  <h2>Diz ai! Qual o seu CPF?</h2>
                </div>
                <div className="input-container">
                  <Input
                    name="cpf"
                    placeholder="000.000.000-00"
                    maxLength={11}
                    value={cpf}
                    onChange={e => setCpf(e.target.value)}
                  />
                </div>
                <div className="btn-container">
                  <button type="button" onClick={() => handleOnStep()}>
                    Continuar
                  </button>
                </div>
              </div>
            </>
          )}

          {step === STEPS.PASSWORD && (
            <>
              <div className="arrow-container">
                <button
                  type="button"
                  onClick={() => setStep(STEPS.CPF)}
                  className="arrow-left"
                >
                  <FaArrowLeft />
                </button>
              </div>
              <div>
                <div className="title-container">
                  <h1>Faça Login</h1>

                  <h2>Escolha uma senha</h2>
                </div>
                <div className="input-container">
                  <Input
                    name="password"
                    placeholder="Senha"
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <div className="btn-container">
                  <button type="submit" onClick={() => handleOnStep()}>
                    Continuar
                  </button>
                </div>
              </div>
            </>
          )}
        </Form>
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
