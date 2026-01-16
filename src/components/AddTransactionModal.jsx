import React, { useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";

const AddTransactionModal = ({ show, onHide, onSave }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSave = () => {
    if (description.trim() && amount > 0) {
      onSave({ description, amount, type, date });
      onHide();
      setDescription("");
      setAmount("");
      setType("expense");
      setDate(new Date().toISOString().split("T")[0]);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">Add New Transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="transactionType">
            <Form.Label>Transaction Type</Form.Label>
            <div className="d-flex">
              <Form.Check
                type="radio"
                id="expense"
                label="Expense"
                name="transactionType"
                value="expense"
                checked={type === "expense"}
                onChange={(e) => setType(e.target.value)}
                className="me-3"
              />
              <Form.Check
                type="radio"
                id="income"
                label="Income"
                name="transactionType"
                value="income"
                checked={type === "income"}
                onChange={(e) => setType(e.target.value)}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="transactionDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., Monthly Salary"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="transactionAmount">
            <Form.Label>Amount</Form.Label>
            <InputGroup>
              <InputGroup.Text>₦</InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="transactionDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={!description.trim() || !amount || amount <= 0}
        >
          Save Transaction
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTransactionModal;
