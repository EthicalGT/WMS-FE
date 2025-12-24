import React, { useState } from "react";
import "../../assets/css/SupervisorDashboardContainer.css";

const alertsData = [
  {
    id: "AL001",
    hawker: "Ramesh Pawar",
    type: "Underpricing",
    details: "Sold item below minimum price",
    severity: "High",
    escalated: false,
  },
  {
    id: "AL002",
    hawker: "Suresh Kale",
    type: "Missing Sales Amount",
    details: "Sales entry missing for today",
    severity: "Medium",
    escalated: false,
  },
  {
    id: "AL003",
    hawker: "Mahesh Jadhav",
    type: "Inventory Discrepancy",
    details: "Assigned vs scanned stock mismatch",
    severity: "High",
    escalated: false,
  },
  {
    id: "AL004",
    hawker: "Ravi Shinde",
    type: "Repeated Violations",
    details: "Multiple infractions in last week",
    severity: "Low",
    escalated: false,
  },
];

 function AlertsViolations() {
  const [alerts, setAlerts] = useState(alertsData);
  const [selectedAlert, setSelectedAlert] = useState(null);

  const getSeverityClass = (severity) => {
    if (severity === "Low") return "low";
    if (severity === "Medium") return "medium";
    if (severity === "High") return "high";
    return "";
  };

  const togglePanel = (alert) => {
    if (selectedAlert?.id === alert.id) {
      setSelectedAlert(null);
    } else {
      setSelectedAlert(alert);
    }
  };

  const escalateAlert = (alertId) => {
    setAlerts(
      alerts.map((a) =>
        a.id === alertId ? { ...a, escalated: true } : a
      )
    );
    setSelectedAlert(null);
  };

  return (
    <div className="alerts-container">
      <h2>Alerts & Violations</h2>
      <p className="subtitle">
        Central panel for monitoring alerts and violations
      </p>

      {/* Desktop Table */}
      <div className="table-wrapper desktop-only">
        <table className="alerts-table">
          <thead>
            <tr>
              <th>Hawker</th>
              <th>Type</th>
              <th>Severity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((a) => (
              <React.Fragment key={a.id}>
                <tr>
                  <td>
                    <strong>{a.hawker}</strong>
                  </td>
                  <td>{a.type}</td>
                  <td>
                    <span className={`severity-badge ${getSeverityClass(a.severity)}`}>
                      {a.severity}
                    </span>
                  </td>
                  <td>
                    <button
                      className="primary"
                      onClick={() => togglePanel(a)}
                      disabled={a.escalated}
                    >
                      {a.escalated ? "Escalated" : "Escalate"}
                    </button>
                  </td>
                </tr>

                {/* Expandable panel */}
                {selectedAlert?.id === a.id && (
                  <tr className="panel-row">
                    <td colSpan="4">
                      <div className="alert-panel">
                        <div className="panel-header">
                          <h4>Alert Details</h4>
                          <button
                            className="close-btn"
                            onClick={() => setSelectedAlert(null)}
                          >
                            ×
                          </button>
                        </div>
                        <div className="panel-content">
                          <p><b>Hawker:</b> {a.hawker}</p>
                          <p><b>Type:</b> {a.type}</p>
                          <p><b>Severity:</b> {a.severity}</p>
                          <p><b>Details:</b> {a.details}</p>
                          {!a.escalated && (
                            <button
                              className="primary"
                              onClick={() => escalateAlert(a.id)}
                            >
                              Escalate to Admin/SPO
                            </button>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="mobile-alerts">
        {alerts.map((a) => (
          <div key={a.id} className="alert-card">
            <div className="card-top">
              <h4>{a.hawker}</h4>
              <span className={`severity-badge ${getSeverityClass(a.severity)}`}>
                {a.severity}
              </span>
            </div>
            <div className="card-row">
              <span>Type</span>
              <b>{a.type}</b>
            </div>

            {selectedAlert?.id === a.id && (
              <div className="alert-panel">
                <div className="panel-header">
                  <h4>Alert Details</h4>
                  <button
                    className="close-btn"
                    onClick={() => setSelectedAlert(null)}
                  >
                    ×
                  </button>
                </div>
                <div className="panel-content">
                  <p><b>Hawker:</b> {a.hawker}</p>
                  <p><b>Type:</b> {a.type}</p>
                  <p><b>Severity:</b> {a.severity}</p>
                  <p><b>Details:</b> {a.details}</p>
                  {!a.escalated && (
                    <button
                      className="primary"
                      onClick={() => escalateAlert(a.id)}
                    >
                      Escalate to Admin/SPO
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="card-actions">
              <button
                className="primary"
                onClick={() => togglePanel(a)}
                disabled={a.escalated}
              >
                {a.escalated ? "Escalated" : "Escalate"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlertsViolations;