import React, { useState, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import * as SessionActions from "@ducks/session/actions";
import { SessionState, ILogin } from "@ducks/session/types";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { Dispatch, bindActionCreators } from "redux";
import * as Yup from "yup";

import { ApplicationState } from "@store/index";

import Button from "@components/Button";
import Input from "@components/Form/Input";

import { Container, Box } from "./styles";

enum STEPS {
  EMAIL = "email",
  CPF = "cpf",
  NOME = "nome",
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
  .length(11, "O cpf deve ter 11 caracteres")
  .required("Informe o cpf");

const nomeValidation = Yup.string()
  .min(3, "O nome deve ter no mínimo 3 caracteres")
  .max(40, "O nome deve ter no máximo 40 caracteres")
  .required("Informe o nome");

const passwordValidation = Yup.string()
  .max(20, "A senha deve conter no máximo 20 caracteres")
  .min(8, "A senha deve conter no mínimo 8 caracteres")
  .required("Informe uma senha");

const Login: React.FC<Props> = ({
  loading,
  error,
  isAuthenticated,
  loginRequest,
}) => {
  const handleSubmit = ({ username, password }: any) => {
    loginRequest({ email, password });
  };

  const [step, setStep] = useState(STEPS.EMAIL);
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [password, setPassword] = useState("");

  const formRef = useRef<FormHandles>(null);

  async function validateStep(fieldName: string, validation: Yup.StringSchema<string>, step: STEPS): Promise<string|undefined> {
    try {
      const fieldInput = formRef.current?.getFieldRef(fieldName);
      const validate = await validation.validate(fieldInput.value);
      if (validate) {
        setStep(step);
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const error: any = {};
        error[fieldName] = err.message;
        formRef.current?.setErrors(error);
      }
    }
    return undefined;
  }

  const handleOnStep = async () => {
    if (step === STEPS.EMAIL) {
      validateStep("email", emailValidation, STEPS.CPF);
    } else if (step === STEPS.CPF) {
      validateStep("cpf", cpfValidation, STEPS.NOME);
    } else if (step === STEPS.NOME) {
      validateStep("nome", nomeValidation, STEPS.PASSWORD);
    } else {
      const passwordInput = formRef.current?.getFieldRef("password");
      if (await passwordValidation.isValid(passwordInput.value)) {
        setPassword(passwordInput.value);
      }
    }
  };

  return (
    <Container>
      <Box>
        <Form
          onSubmit={() => handleSubmit({ username: email, password })}
          ref={formRef}
        >
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
                  onChange={(e: any) => setEmail(e.target.value)}
                />
              </div>
              <div className="btn-container">
                <Button type="button" onClick={() => handleOnStep()}>
                  Continuar
                </Button>
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
                    onChange={(e: any) => setCpf(e.target.value)}
                  />
                </div>
                <div className="btn-container">
                  <Button type="button" onClick={() => handleOnStep()}>
                    Continuar
                  </Button>
                </div>
              </div>
            </>
          )}

          {step === STEPS.NOME && (
            <>
              <div className="arrow-container">
                <button
                  onClick={() => setStep(STEPS.CPF)}
                  className="arrow-left"
                  type="button"
                >
                  <FaArrowLeft />
                </button>
              </div>
              <div>
                <div className="title-container">
                  <h1>Faça Login</h1>

                  <h2>Como podemos chama-lo?</h2>
                </div>
                <div className="input-container">
                  <Input
                    name="nome"
                    placeholder="Digite seu nome"
                    maxLength={50}
                    value={nome}
                    onChange={(e: any) => setNome(e.target.value)}
                  />
                </div>
                <div className="btn-container">
                  <Button type="button" onClick={() => handleOnStep()}>
                    Continuar
                  </Button>
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
                    onChange={(e: any) => setPassword(e.target.value)}
                  />
                </div>
                <div className="btn-container">
                  <Button type="submit" onClick={() => handleOnStep()} loading={loading}>
                    Continuar
                  </Button>
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
