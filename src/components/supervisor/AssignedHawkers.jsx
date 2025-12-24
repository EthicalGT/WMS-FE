import React, { useState } from "react";
import "../../assets/css/SupervisorDashboardContainer.css";

const hawkers = [
  {
    id: "HKR001",
    name: "Ramesh Pawar",
    location: "Pune Camp",
    inventoryValue: "₹45,000",
    salesToday: "₹8,200",
    kycStatus: "Verified",
    status: "Active",
  },
  {
    id: "HKR002",
    name: "Suresh Kale",
    location: "Hadapsar",
    inventoryValue: "₹32,000",
    salesToday: "₹0",
    kycStatus: "Pending",
    status: "Offline",
  },
];

export default function AssignedHawkers() {
  const [selectedHawker, setSelectedHawker] = useState(null);
  const [actionType, setActionType] = useState("");

  const openPanel = (hawker, type) => {
    setSelectedHawker(hawker);
    setActionType(type);
  };

  const closePanel = () => {
    setSelectedHawker(null);
    setActionType("");
  };

  return (
    <div className="assigned-container">
      <h2>Assigned Hawkers</h2>
      <p className="subtitle">Monitor assigned hawkers and their activity</p>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="table-wrapper desktop-only">
        <table className="hawker-table">
          <thead>
            <tr>
              <th>Hawker</th>
              <th>Location</th>
              <th>Inventory</th>
              <th>Sales Today</th>
              <th>KYC</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {hawkers.map((h) => (
              <React.Fragment key={h.id}>
                <tr>
                  <td>
                    <strong>{h.name}</strong>
                    <div className="sub-text">{h.id}</div>
                  </td>
                  <td>{h.location}</td>
                  <td>{h.inventoryValue}</td>
                  <td>{h.salesToday}</td>
                  <td>
                    <span
                      className={`badge ${
                        h.kycStatus === "Verified"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {h.kycStatus}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`status ${
                        h.status === "Active"
                          ? "status-active"
                          : "status-offline"
                      }`}
                    >
                      {h.status}
                    </span>
                  </td>
                  <td className="actions">
                    <button onClick={() => openPanel(h, "view")}>View</button>
                    <button onClick={() => openPanel(h, "message")}>
                      Message
                    </button>
                    <button
                      className="danger"
                      onClick={() => openPanel(h, "flag")}
                    >
                      Flag
                    </button>
                  </td>
                </tr>

                {/* ===== EXPAND BELOW ROW ===== */}
                {selectedHawker?.id === h.id && (
                  <tr className="expand-row">
                    <td colSpan="7">
                      <div className="expand-panel">
                        {actionType === "view" && (
                          <div className="panel-content">
                            <p><b>Name:</b> {h.name}</p>
                            <p><b>ID:</b> {h.id}</p>
                            <p><b>Location:</b> {h.location}</p>
                            <p><b>Inventory:</b> {h.inventoryValue}</p>
                            <p><b>Sales Today:</b> {h.salesToday}</p>
                            <p><b>KYC:</b> {h.kycStatus}</p>
                            <p><b>Status:</b> {h.status}</p>
                          </div>
                        )}

                        {actionType === "message" && (
                          <div className="panel-content">
                            <textarea placeholder="Type your message..." />
                            <button className="primary">Send Message</button>
                          </div>
                        )}

                        {actionType === "flag" && (
                          <div className="panel-content">
                            <p>Are you sure you want to flag this hawker?</p>
                            <button className="danger">Confirm Flag</button>
                          </div>
                        )}

                        <button className="close-inline" onClick={closePanel}>
                          Close
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE VIEW ================= */}
      <div className="mobile-only">
        {hawkers.map((h) => (
          <div key={h.id} className="hawker-card">
            <div className="card-header">
              <div>
                <h4>{h.name}</h4>
                <span className="sub-text">{h.id}</span>
              </div>
              <span
                className={`status ${
                  h.status === "Active"
                    ? "status-active"
                    : "status-offline"
                }`}
              >
                {h.status}
              </span>
            </div>

            <div className="card-row">
              <span>Location</span>
              <b>{h.location}</b>
            </div>
            <div className="card-row">
              <span>Inventory</span>
              <b>{h.inventoryValue}</b>
            </div>
            <div className="card-row">
              <span>Sales Today</span>
              <b>{h.salesToday}</b>
            </div>

            <div className="card-actions">
              <button onClick={() => openPanel(h, "view")}>View</button>
              <button onClick={() => openPanel(h, "message")}>Message</button>
              <button
                className="danger"
                onClick={() => openPanel(h, "flag")}
              >
                Flag
              </button>
            </div>

            {selectedHawker?.id === h.id && (
              <div className="mobile-expand">
                {actionType === "view" && (
                  <p><b>KYC:</b> {h.kycStatus}</p>
                )}

                {actionType === "message" && (
                  <>
                    <textarea placeholder="Type your message..." />
                    <button className="primary">Send</button>
                  </>
                )}

                {actionType === "flag" && (
                  <button className="danger">Confirm Flag</button>
                )}

                <button className="close-inline" onClick={closePanel}>
                  Close
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
