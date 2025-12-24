import React from "react";
import "../../assets/css/SupervisorDashboardContainer.css";



const salesData = [
  {
    id: "HKR001",
    name: "Ramesh Pawar",
    assignedItems: 120,
    soldItems: 118,
  },
  {
    id: "HKR002",
    name: "Suresh Kale",
    assignedItems: 100,
    soldItems: 90,
  },
  {
    id: "HKR003",
    name: "Mahesh Jadhav",
    assignedItems: 80,
    soldItems: 65,
  },
];

const getStatus = (variance) => {
  if (variance <= 2) return "normal";
  if (variance <= 10) return "warning";
  return "critical";
};

export default function LiveSalesMonitoring() {
  return (
    <div className="live-sales-container">
      <h2>Live Sales Monitoring</h2>
      <p className="subtitle">Real-time hawker sales overview</p>

      <div className="sales-table-wrapper">
        <table className="sales-table">
          <thead>
            <tr>
              <th>Hawker</th>
              <th>Assigned Items</th>
              <th>Sold Items</th>
              <th>Variance</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {salesData.map((h) => {
              const variance = h.assignedItems - h.soldItems;
              const status = getStatus(variance);

              return (
                <tr key={h.id}>
                  <td>
                    <strong>{h.name}</strong>
                    <div className="sub-text">{h.id}</div>
                  </td>
                  <td>{h.assignedItems}</td>
                  <td>{h.soldItems}</td>
                  <td className={variance > 0 ? "text-danger" : ""}>
                    {variance}
                  </td>
                  <td>
                    <span className={`status-badge ${status}`}>
                      {status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="mobile-sales">
        {salesData.map((h) => {
          const variance = h.assignedItems - h.soldItems;
          const status = getStatus(variance);

          return (
            <div key={h.id} className="sales-card">
              <div className="card-top">
                <div>
                  <h4>{h.name}</h4>
                  <span className="sub-text">{h.id}</span>
                </div>
                <span className={`status-badge ${status}`}>
                  {status}
                </span>
              </div>

              <div className="card-row">
                <span>Assigned</span>
                <b>{h.assignedItems}</b>
              </div>
              <div className="card-row">
                <span>Sold</span>
                <b>{h.soldItems}</b>
              </div>
              <div className="card-row">
                <span>Variance</span>
                <b className={variance > 0 ? "text-danger" : ""}>
                  {variance}
                </b>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
