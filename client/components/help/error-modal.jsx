import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function ErrorModal(props) {
  const {
    isOpen,
    className,
    message,
    type,
    toggle
  } = props;

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{type}</ModalHeader>
        <ModalBody>
          {message}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Escape</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
