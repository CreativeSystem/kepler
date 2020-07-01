import React from "react";
import Modal from "react-bootstrap/Modal";

import { useTheme } from "~/hooks";
import { merge } from "lodash";

import Button from "../Button";
import { Container, ConfirmOptions } from "./styles";

interface Props{
  title: string
  description:string
  isShowing?: boolean
  onAccepted?():void
  onReject?():void,
  onHide():void,
  options?:ConfirmOptions
}

const Confirm: React.FC<Props> = ({
  title, description, isShowing = false, onAccepted, onReject, onHide, options = {},
}) => {
  const theme = useTheme();
  const defaultOptions = merge<ConfirmOptions, ConfirmOptions>({
    buttons: {
      yes: {
        text: "Sim",
        color: theme.success,
      },
      no: {
        text: "Não",
        color: theme.default,
      },
    },
    header: {
      color: theme.success,
    },
  }, options);

  function handleYesClick() {
    if (onAccepted) {
      onAccepted();
    }

    onHide();
  }

  function handleNoClick() {
    if (onReject) {
      onReject();
    }
    onHide();
  }

  return (
    <Container
      size="sm"
      show={isShowing}
      backdrop="static"
      keyboard={false}
      options={defaultOptions}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-no" variant="light" onClick={handleNoClick}>
          {defaultOptions.buttons?.no?.text}
        </Button>
        <Button className="btn-yes" variant="light" onClick={handleYesClick}>
          {defaultOptions.buttons?.yes?.text}
        </Button>
      </Modal.Footer>
    </Container>
  );
};

export default Confirm;
