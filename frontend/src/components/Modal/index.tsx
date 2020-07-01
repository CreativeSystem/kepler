import React, { useState } from "react";
import BModal from "react-bootstrap/Modal";

import Button from "../Button";

const Modal: React.FC = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  return (
    <BModal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <BModal.Header closeButton>
        <BModal.Title>Modal title</BModal.Title>
      </BModal.Header>
      <BModal.Body>
        I will not close if you click outside me. Dont even try to press
        escape key.
      </BModal.Body>
      <BModal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary">Understood</Button>
      </BModal.Footer>
    </BModal>
  );
};

export default Modal;
