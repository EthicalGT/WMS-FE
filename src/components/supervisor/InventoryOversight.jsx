import React, { useState } from "react";
import "../../assets/css/SupervisorDashboardContainer.css";

const inventoryData = [
  {
    id: "HKR001",
    name: "Ramesh Pawar",
    assignedStock: 120,
    remainingStock: 10,
  },
  {
    id: "HKR002",
    name: "Suresh Kale",
    assignedStock: 100,
    remainingStock: 50,
  },
  {
    id: "HKR003",
    name: "Mahesh Jadhav",
    assignedStock: 80,
    remainingStock: 0,
  },
];

export default function InventoryOversight() {
  const [requests, setRequests] = useState({});

  const handleRequestRestock = (hawkerId) => {
    setRequests({ ...requests, [hawkerId]: true });
    alert(`Restock requested for ${hawkerId}`);
  };

  const getAlertType = (assigned, remaining) => {
    if (remaining === 0) return "critical"; // understock
    if (remaining < assigned * 0.2) return "warning"; // low stock
    return "normal"; // normal stock
  };

  return (
    <div className="inventory-container">
      <h2>Inventory Oversight</h2>
      <p className="subtitle">Monitor hawker inventory and request restock</p>

      {/* ===== DESKTOP TABLE ===== */}
      <div className="table-wrapper desktop-only">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Hawker</th>
              <th>Assigned Stock</th>
              <th>Remaining Stock</th>
              <th>Alert</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {inventoryData.map((h) => {
              const alertType = getAlertType(h.assignedStock, h.remainingStock);

              return (
                <tr key={h.id}>
                  <td>
                    <strong>{h.name}</strong>
                    <div className="sub-text">{h.id}</div>
                  </td>
                  <td>{h.assignedStock}</td>
                  <td>{h.remainingStock}</td>
                  <td>
                    <span className={`status-badge ${alertType}`}>
                      {alertType.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <button
                      className="primary"
                      onClick={() => handleRequestRestock(h.id)}
                      disabled={requests[h.id]}
                    >
                      {requests[h.id] ? "Requested" : "Request Restock"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ===== MOBILE CARDS ===== */}
      <div className="mobile-inventory">
        {inventoryData.map((h) => {
          const alertType = getAlertType(h.assignedStock, h.remainingStock);

          return (
            <div key={h.id} className="inventory-card">
              <div className="card-top">
                <div>
                  <h4>{h.name}</h4>
                  <span className="sub-text">{h.id}</span>
                </div>
                <span className={`status-badge ${alertType}`}>
                  {alertType.toUpperCase()}
                </span>
              </div>

              <div className="card-row">
                <span>Assigned Stock</span>
                <b>{h.assignedStock}</b>
              </div>
              <div className="card-row">
                <span>Remaining Stock</span>
                <b>{h.remainingStock}</b>
              </div>

              <button
                className="primary"
                onClick={() => handleRequestRestock(h.id)}
                disabled={requests[h.id]}
              >
                {requests[h.id] ? "Requested" : "Request Restock"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
