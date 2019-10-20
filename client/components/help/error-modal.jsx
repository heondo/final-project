import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function ErrorModal(props) {
  const {
    isOpen,
    className,
    message,
    errType,
    toggle
  } = props;

  const realToggle = event => {
    toggle(message, errType);
  };

  return (
    <div>
      <Modal isOpen={isOpen} toggle={realToggle} className={className}>
        <ModalHeader toggle={realToggle}>{errType}</ModalHeader>
        <ModalBody>
          {(typeof message === 'object') ? JSON.stringify(message) : message}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={realToggle}>Escape</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
