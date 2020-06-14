import React, {
  useState, useRef, useCallback, useEffect,
} from "react";

import * as SessionActions from "@ducks/session/actions";
import { ILogin } from "@ducks/session/types";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useValidationState } from "~/hooks";
import * as Yup from "yup";

import AuthService from "@services/AuthService";

import { useAction } from "@store/hooks";

import Step from "@pages/Login/Step";

import Input from "@components/Form/Input";


import { Container, Box } from "./styles";

enum STEPS {
  EMAIL = "email",
  CPF = "cpf",
  NOME = "nome",
  PASSWORD = "password"
}

const emailValidation = Yup.string()
  .max(90).email("Email inválido").required("Informe o email");

const cpfValidation = Yup.string()
  .length(11, "O cpf deve ter 11 caracteres").required("Informe o cpf");

const nomeValidation = Yup.string()
  .min(3, "O nome deve ter no mínimo 3 caracteres").max(40, "O nome deve ter no máximo 40 caracteres")
  .required("Informe o nome");

const passwordValidation = Yup.string()
  .max(20, "A senha deve conter no máximo 20 caracteres").min(8, "A senha deve conter no mínimo 8 caracteres")
  .required("Informe uma senha");

const Login: React.FC = () => {
  const loginRequest = useAction(SessionActions.loginRequest);
  const formRef = useRef<FormHandles>(null);

  const [step, setStep] = useState(STEPS.EMAIL);
  const [emailVerified, setEmailVerified] = useState(false);
  const [email, setEmail, validateEmail] = useValidationState("", STEPS.EMAIL, formRef, emailValidation);
  const [cpf, setCpf, validateCpf] = useValidationState("", STEPS.CPF, formRef, cpfValidation);
  const [nome, setNome, validateNome] = useValidationState("", STEPS.NOME, formRef, nomeValidation);
  const [password, setPassword, validatePassword] = useValidationState("", STEPS.PASSWORD, formRef, passwordValidation);

  useEffect(() => {
    setEmailVerified(false);
  }, [email]);

  const handleSubmit = useCallback(({ email, password }: ILogin) => {
    loginRequest({ email, password });
  }, [loginRequest]);

  const handleBackPressed = () => {
    let previousStep:STEPS | undefined;

    if (step === STEPS.PASSWORD) {
      previousStep = emailVerified ? STEPS.EMAIL : STEPS.PASSWORD;
    } else if (step === STEPS.NOME) {
      previousStep = STEPS.CPF;
    } else if (step === STEPS.CPF) {
      previousStep = STEPS.EMAIL;
    }
    if (previousStep) {
      setStep(previousStep);
    }
  };

  const handleNextPressed = useCallback(
    () => {
      async function handleOnStep() {
        let nextStep;
        if (step === STEPS.EMAIL) {
          const validated = await validateEmail();
          if (validated) {
            const verifiedEmail = await AuthService.verifyEmail(email);
            setEmailVerified(verifiedEmail);
            if (verifiedEmail) {
              nextStep = STEPS.PASSWORD;
            } else {
              nextStep = STEPS.CPF;
            }
          }
        } else if (step === STEPS.CPF) {
          const validated = await validateCpf();
          if (validated) {
            nextStep = STEPS.NOME;
          }
        } else if (step === STEPS.NOME) {
          const validated = await validateNome();
          if (validated) {
            nextStep = STEPS.PASSWORD;
          }
        } else {
          await validatePassword();
        }

        if (nextStep) {
          setStep(nextStep);
        } else {
          handleSubmit({ email, password });
        }
      }

      handleOnStep();
    }, [email, handleSubmit, password, step, validateCpf, validateEmail, validateNome, validatePassword],
  );

  const steps = {
    [STEPS.EMAIL]: {
      title: "Faça Login",
      description: "Encontre os serviços que procura",
      renderInput: () => (
        <Input
          name="email"
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      ),
    },
    [STEPS.CPF]: {
      title: "Faça Login",
      description: "Diz ai! Qual o seu CPF?",
      renderInput: () => (
        <Input
          mask="999.999.999-00"
          name="cpf"
          placeholder="000.000.000-00"
          maxLength={11}
          value={cpf}
          onChange={e => setCpf(e.target.value)}
        />
      ),
    },
    [STEPS.NOME]: {
      title: "Faça Login",
      description: "Como podemos chama-lo?",
      renderInput: () => (
        <Input
          name="nome"
          placeholder="Digite seu nome"
          maxLength={50}
          value={nome}
          onChange={e => setNome(e.target.value)}
        />
      ),
    },
    [STEPS.PASSWORD]: {
      title: "Faça Login",
      description: emailVerified ? "Digite sua Senha para efetuar o login" : "Escolha uma senha",
      renderInput: () => (
        <Input
          name="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
        />
      ),
    },
  };

  return (
    <Container>
      <Box>
        <Form
          onSubmit={() => handleSubmit({ email, password })}
          ref={formRef}
        >
          <Step
            backActive={step !== STEPS.EMAIL}
            title={steps[step].title}
            description={steps[step].description}
            onNextPressed={() => handleNextPressed()}
            onBackPressed={() => handleBackPressed()}
          >
            {steps[step].renderInput()}
          </Step>
        </Form>
      </Box>
    </Container>
  );
};

export default Login;
