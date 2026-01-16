import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { Form, InputGroup, Card, Button, ListGroup } from "react-bootstrap";
import { calculateNigerianTax } from "../utils/taxCalculator";

const formatCurrency = (amount) => {
  return `₦${new Intl.NumberFormat("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)}`;
};

const TaxCalculator = () => {
  const { transactions } = useAppContext();
  const [grossIncome, setGrossIncome] = useState("");
  const [rentPaid, setRentPaid] = useState("");
  const [otherDeductions, setOtherDeductions] = useState("");
  const [taxResult, setTaxResult] = useState(null);

  const totalAnnualIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  useEffect(() => {
    const incomeDetails = {
      grossAnnualIncome: parseFloat(grossIncome) || 0,
      rentPaid: parseFloat(rentPaid) || 0,
      otherDeductions: parseFloat(otherDeductions) || 0,
    };
    const result = calculateNigerianTax(incomeDetails);
    setTaxResult(result);
  }, [grossIncome, rentPaid, otherDeductions]);

  const handleUseMyIncome = () => {
    setGrossIncome(totalAnnualIncome.toString());
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="display-5 fw-bold">Nigerian Tax Calculator</h1>
        <p className="lead text-muted">
          Estimate your 2026 personal income tax.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-lg-5">
          <Card className="border-0 h-100">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Enter Your Financials</h4>
                <Button
                  variant="outline-success"
                  size="sm"
                  onClick={handleUseMyIncome}
                >
                  Use My Logged Income
                </Button>
              </div>
              <Form>
                <Form.Group className="mb-3" controlId="grossIncome">
                  <Form.Label>Gross Annual Income</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>₦</InputGroup.Text>
                    <Form.Control
                      type="number"
                      placeholder="e.g., 5000000"
                      value={grossIncome}
                      onChange={(e) => setGrossIncome(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="rentPaid">
                  <Form.Label>Annual Rent Paid (Optional)</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>₦</InputGroup.Text>
                    <Form.Control
                      type="number"
                      placeholder="e.g., 800000"
                      value={rentPaid}
                      onChange={(e) => setRentPaid(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="otherDeductions">
                  <Form.Label>Other Deductions (Optional)</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>₦</InputGroup.Text>
                    <Form.Control
                      type="number"
                      placeholder="e.g., 150000"
                      value={otherDeductions}
                      onChange={(e) => setOtherDeductions(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </div>

        <div className="col-lg-7">
          <Card className="border-0 h-100 bg-primary-subtle">
            <Card.Body className="p-4 d-flex flex-column">
              <h4 className="mb-3">Your Estimated Tax Result</h4>
              {taxResult && (
                <>
                  <div className="text-center mb-4">
                    <p className="text-muted mb-1">Total Tax Payable</p>
                    <h1 className="display-4 fw-bold">
                      {formatCurrency(taxResult.totalTax)}
                    </h1>
                    <p className="text-muted">
                      on a taxable income of{" "}
                      {formatCurrency(taxResult.taxableIncome)}
                    </p>
                  </div>
                  <div>
                    <h5 className="mb-3">Calculation Breakdown</h5>
                    <ListGroup className="mb-4">
                      {taxResult.breakdown.length > 0 ? (
                        taxResult.breakdown.map((item, index) => (
                          <ListGroup.Item
                            key={index}
                            className="d-flex justify-content-between align-items-center"
                          >
                            <div>
                              <p className="mb-0">{item.band}</p>
                              <small className="text-muted">
                                Taxed at {item.rate}
                              </small>
                            </div>
                            <span className="fw-bold">
                              {formatCurrency(item.taxPayable)}
                            </span>
                          </ListGroup.Item>
                        ))
                      ) : (
                        <ListGroup.Item>
                          Your taxable income is within the tax-free threshold.
                        </ListGroup.Item>
                      )}
                      <ListGroup.Item className="d-flex justify-content-between align-items-center fw-bold bg-body-tertiary">
                        Total Deductions & Reliefs
                        <span>{formatCurrency(taxResult.totalDeductions)}</span>
                      </ListGroup.Item>
                    </ListGroup>

                    <Card className="border-0">
                      <Card.Body>
                        <Card.Title as="h6">Simple Explanation</Card.Title>
                        <Card.Text className="small text-muted">
                          Your tax is calculated by first subtracting your
                          reliefs and deductions from your gross income to get
                          your taxable income. This taxable amount is then taxed
                          progressively across different bands. For 2026, any
                          taxable income up to ₦800,000 is taxed at 0%.
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TaxCalculator;
