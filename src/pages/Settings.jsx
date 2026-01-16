import React from "react";
import { useAppContext } from "../context/AppContext";
import { Button, Card } from "react-bootstrap";
import { Download } from "react-bootstrap-icons";

const Settings = () => {
  const { user, transactions } = useAppContext();

  const handleExportData = () => {
    const dataToExport = {
      user,
      transactions,
      exportDate: new Date().toISOString(),
    };
    const dataStr = JSON.stringify(dataToExport, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `finwise_backup_${
      new Date().toISOString().split("T")[0]
    }.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="display-5 fw-bold">Settings</h1>
        <p className="lead text-muted">
          Manage your application data and preferences.
        </p>
      </div>

      <Card className="border-0">
        <Card.Body className="p-4">
          <Card.Title as="h4">Data Management</Card.Title>
          <Card.Text className="text-muted">
            Since FinWise stores all your data on this device, you can download
            a backup copy for your records or to transfer to another device.
          </Card.Text>
          <Button variant="primary" onClick={handleExportData}>
            <Download className="me-2" />
            Export My Data
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Settings;
