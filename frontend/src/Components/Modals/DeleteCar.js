import React from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteCar = (props) => {
  const { show, handleClose, handleConformDelete } = props;
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Car</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this Car?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleConformDelete}>
            Conform
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteCar;
