import React from "react";
import { FaArrowLeft } from "react-icons/fa";

import Button from "@components/Button";

import { Props } from "./types";


const Step: React.FC<Props> = ({
  title, description, backActive = false, nextButtonText = "Continuar", onBackPressed, onNextPressed, children,
}) => (
  <>
    {backActive && (
    <div className="arrow-container">
      <button
        onClick={onBackPressed}
        className="arrow-left"
        type="button"
      >
        <FaArrowLeft />
      </button>
    </div>

    )}
    <div>
      <div className="title-container">
        <h1>{title}</h1>
        {description && (<h2>{description}</h2>)}
      </div>
      <div className="input-container">
        {children}
      </div>
      <div className="btn-container">
        <Button type="button" onClick={onNextPressed}>
          {nextButtonText}
        </Button>
      </div>
    </div>
  </>
);

export default Step;
