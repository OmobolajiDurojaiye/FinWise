import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import AddTransactionModal from "../components/AddTransactionModal";
import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet2,
  Bank,
  CashCoin,
  PlusCircleFill,
} from "react-bootstrap-icons";
import { Button } from "react-bootstrap";

const formatCurrency = (amount) => {
  return `₦${new Intl.NumberFormat("en-NG").format(amount)}`;
};

const Dashboard = () => {
  const { user, transactions, addTransaction } = useAppContext();
  const [showModal, setShowModal] = useState(false);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netSavings = totalIncome - totalExpenses;

  const handleSaveTransaction = (transaction) => {
    addTransaction(transaction);
  };

  return (
    <>
      <AddTransactionModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleSaveTransaction}
      />
      <div>
        <div className="mb-4">
          <p className="text-muted mb-1">Hello, {user.name}</p>
          <h1 className="display-5 fw-bold">Your Financial Overview</h1>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card h-100 border-0">
              <div className="card-body">
                <div className="d-flex align-items-center mb-2">
                  <div className="p-2 bg-success-subtle text-success rounded-circle me-3">
                    <ArrowUpRight size={20} />
                  </div>
                  <h5 className="card-title text-muted fw-normal mb-0">
                    Total Income
                  </h5>
                </div>
                <h2 className="fw-bold">{formatCurrency(totalIncome)}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 border-0">
              <div className="card-body">
                <div className="d-flex align-items-center mb-2">
                  <div className="p-2 bg-danger-subtle text-danger rounded-circle me-3">
                    <ArrowDownRight size={20} />
                  </div>
                  <h5 className="card-title text-muted fw-normal mb-0">
                    Total Expenses
                  </h5>
                </div>
                <h2 className="fw-bold">{formatCurrency(totalExpenses)}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 border-0">
              <div className="card-body">
                <div className="d-flex align-items-center mb-2">
                  <div className="p-2 bg-primary-subtle text-primary rounded-circle me-3">
                    <Wallet2 size={20} />
                  </div>
                  <h5 className="card-title text-muted fw-normal mb-0">
                    Net Savings
                  </h5>
                </div>
                <h2 className="fw-bold">{formatCurrency(netSavings)}</h2>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">Recent Transactions</h4>
            <Button variant="primary" onClick={() => setShowModal(true)}>
              <PlusCircleFill className="me-2" />
              Add Transaction
            </Button>
          </div>
          {transactions.length > 0 ? (
            <div className="list-group">
              {transactions.slice(0, 5).map((transaction) => (
                <div
                  key={transaction.id}
                  className="list-group-item d-flex justify-content-between align-items-center border-0 mb-2 rounded"
                >
                  <div className="d-flex align-items-center">
                    <div
                      className={`p-2 rounded-circle me-3 ${
                        transaction.type === "income"
                          ? "bg-primary-subtle text-primary"
                          : "bg-warning-subtle text-warning"
                      }`}
                    >
                      {transaction.type === "income" ? (
                        <Bank size={22} />
                      ) : (
                        <CashCoin size={22} />
                      )}
                    </div>
                    <div>
                      <h6 className="mb-0 fw-bold">
                        {transaction.description}
                      </h6>
                      <small className="text-muted">
                        {new Date(transaction.date).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "long", day: "numeric" }
                        )}
                      </small>
                    </div>
                  </div>
                  <span
                    className={`fw-bold fs-5 ${
                      transaction.type === "income"
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}{" "}
                    {formatCurrency(transaction.amount)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-5 bg-body-tertiary rounded">
              <h5 className="text-muted">No transactions yet.</h5>
              <p>Click the button above to add your first transaction.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Dashboard;
