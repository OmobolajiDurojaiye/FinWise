import React, { useState, useEffect } from "react";
import { Form, InputGroup, Card, Button } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const formatCurrency = (amount) => {
  return `₦${new Intl.NumberFormat("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)}`;
};

const Simulator = () => {
  const [initialAmount, setInitialAmount] = useState("100000");
  const [monthlyContribution, setMonthlyContribution] = useState("50000");
  const [interestRate, setInterestRate] = useState("8");
  const [years, setYears] = useState("10");
  const [simulationResult, setSimulationResult] = useState(null);

  const calculateGrowth = () => {
    const initial = parseFloat(initialAmount) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const rate = parseFloat(interestRate) / 100;
    const periods = parseInt(years) * 12;
    const monthlyRate = rate / 12;

    let futureValue = initial;
    const dataPoints = [];
    const labels = [];

    for (let i = 1; i <= periods; i++) {
      futureValue = futureValue * (1 + monthlyRate) + monthly;
      if (i % 12 === 0 || i === 1) {
        labels.push(`Year ${Math.ceil(i / 12)}`);
        dataPoints.push(futureValue);
      }
    }

    if (periods % 12 !== 0) {
      labels.push(`Year ${parseInt(years)}`);
      dataPoints.push(futureValue);
    }

    setSimulationResult({
      finalAmount: futureValue,
      labels: labels,
      dataPoints: dataPoints,
    });
  };

  useEffect(() => {
    calculateGrowth();
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Projected Growth Over Time",
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value, index, ticks) {
            return "₦" + value.toLocaleString();
          },
        },
      },
    },
  };

  const chartData = {
    labels: simulationResult ? simulationResult.labels : [],
    datasets: [
      {
        label: "Investment Value",
        data: simulationResult ? simulationResult.dataPoints : [],
        borderColor: "#008751",
        backgroundColor: "rgba(0, 135, 81, 0.5)",
        fill: true,
      },
    ],
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="display-5 fw-bold">Finance Simulator</h1>
        <p className="lead text-muted">
          Project your savings and investment growth.
        </p>
      </div>
      <div className="row g-4">
        <div className="col-lg-4">
          <Card className="border-0 h-100">
            <Card.Body className="p-4">
              <h4 className="mb-3">Simulation Parameters</h4>
              <Form>
                <Form.Group className="mb-3" controlId="initialAmount">
                  <Form.Label>Initial Amount</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>₦</InputGroup.Text>
                    <Form.Control
                      type="number"
                      value={initialAmount}
                      onChange={(e) => setInitialAmount(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="monthlyContribution">
                  <Form.Label>Monthly Contribution</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>₦</InputGroup.Text>
                    <Form.Control
                      type="number"
                      value={monthlyContribution}
                      onChange={(e) => setMonthlyContribution(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="interestRate">
                  <Form.Label>Annual Interest Rate</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                    />
                    <InputGroup.Text>%</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="years">
                  <Form.Label>Number of Years</Form.Label>
                  <Form.Control
                    type="number"
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                  />
                </Form.Group>
                <div className="d-grid">
                  <Button variant="primary" onClick={calculateGrowth}>
                    Simulate Growth
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
        <div className="col-lg-8">
          <Card className="border-0 h-100">
            <Card.Body className="p-4 d-flex flex-column">
              <div className="text-center mb-4">
                <p className="text-muted mb-1">
                  Projected Value after {years} years
                </p>
                <h1 className="display-4 fw-bold">
                  {simulationResult
                    ? formatCurrency(simulationResult.finalAmount)
                    : "..."}
                </h1>
              </div>
              <div
                className="flex-grow-1"
                style={{ position: "relative", height: "300px" }}
              >
                {simulationResult && (
                  <Line options={chartOptions} data={chartData} />
                )}
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
