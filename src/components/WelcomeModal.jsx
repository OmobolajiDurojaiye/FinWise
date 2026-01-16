import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const WelcomeModal = ({ show, onSave }) => {
  const [name, setName] = useState("");

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim());
    }
  };

  return (
    <Modal show={show} centered backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title className="fw-bold">Welcome to FinWise!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>To get started, please tell us your name.</p>
        <Form.Group controlId="userName">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSave()}
            autoFocus
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSave} disabled={!name.trim()}>
          Save and Continue
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WelcomeModal;
