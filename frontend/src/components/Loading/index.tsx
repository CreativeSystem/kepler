import React from "react";
import Lottie, { Options } from "react-lottie";
import animationData from "@assets/animation/octopus.json";

import { Container, LoadingText } from "./styles";
const Loading: React.FC = () => {
  const defaultOptions: Options = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <Container>
      <Lottie options={defaultOptions} height="70vh" />
      <LoadingText>Loading</LoadingText>
    </Container>
  );
};

export default Loading;
