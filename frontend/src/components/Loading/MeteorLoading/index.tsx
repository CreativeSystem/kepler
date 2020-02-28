/* eslint-disable comma-dangle */
import React from "react";
import Lottie, { Options } from "react-lottie";

import animationData from "@assets/animation/keplermeteor.json";

import { Container, LoadingText } from "./styles";

const MeteorLoading: React.FC = () => {
  const defaultOptions: Options = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMinYMin meet"
    }
  };
  return (
    <Container>
      <Lottie options={defaultOptions} height="70vh" />
      <LoadingText>Loading</LoadingText>
    </Container>
  );
};

export default MeteorLoading;
