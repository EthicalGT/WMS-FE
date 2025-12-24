import React, { useState } from "react";
import "../../assets/css/SupervisorDashboardContainer.css";

const assetsData = [
  {
    id: "AS001",
    hawker: "Ramesh Pawar",
    hawkerId: "HKR001",
    assetName: "Mobile Device",
    condition: "Good",
    maintenanceRequested: false,
    misuseFlagged: false,
  },
  {
    id: "AS002",
    hawker: "Suresh Kale",
    hawkerId: "HKR002",
    assetName: "Tablet",
    condition: "Needs Maintenance",
    maintenanceRequested: false,
    misuseFlagged: false,
  },
  {
    id: "AS003",
    hawker: "Mahesh Jadhav",
    hawkerId: "HKR003",
    assetName: "Delivery Bag",
    condition: "Critical",
    maintenanceRequested: false,
    misuseFlagged: false,
  },
];

export default function AssetMonitoring() {
  const [assets, setAssets] = useState(assetsData);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [actionType, setActionType] = useState(""); // maintenance | misuse

  const getConditionClass = (condition) => {
    if (condition === "Good") return "good";
    if (condition === "Needs Maintenance") return "warning";
    if (condition === "Critical") return "critical";
    return "";
  };

  const toggleActionPanel = (asset, type) => {
    if (selectedAsset?.id === asset.id && actionType === type) {
      setSelectedAsset(null);
      setActionType("");
    } else {
      setSelectedAsset(asset);
      setActionType(type);
    }
  };

  const confirmMaintenance = (assetId) => {
    setAssets(
      assets.map((a) =>
        a.id === assetId ? { ...a, maintenanceRequested: true } : a
      )
    );
    setSelectedAsset(null);
    setActionType("");
  };

  const confirmMisuse = (assetId) => {
    setAssets(
      assets.map((a) =>
        a.id === assetId ? { ...a, misuseFlagged: true } : a
      )
    );
    setSelectedAsset(null);
    setActionType("");
  };

  return (
    <div className="asset-monitoring-container">
      <h2>Asset Monitoring</h2>
      <p className="subtitle">Monitor hawker assets and conditions</p>

      {/* ===== DESKTOP TABLE ===== */}
      <div className="table-wrapper desktop-only">
        <table className="asset-table">
          <thead>
            <tr>
              <th>Hawker</th>
              <th>Asset</th>
              <th>Condition</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((a) => (
              <React.Fragment key={a.id}>
                <tr>
                  <td>
                    <strong>{a.hawker}</strong>
                    <div className="sub-text">{a.hawkerId}</div>
                  </td>
                  <td>{a.assetName}</td>
                  <td>
                    <span className={`status-badge ${getConditionClass(a.condition)}`}>
                      {a.condition}
                    </span>
                  </td>
                  <td>
                    <button
                      className="primary"
                      onClick={() => toggleActionPanel(a, "maintenance")}
                      disabled={a.maintenanceRequested}
                    >
                      {a.maintenanceRequested ? "Requested" : "Request Maintenance"}
                    </button>
                    <button
                      className="danger"
                      onClick={() => toggleActionPanel(a, "misuse")}
                      disabled={a.misuseFlagged}
                    >
                      {a.misuseFlagged ? "Flagged" : "Flag Misuse"}
                    </button>
                  </td>
                </tr>

                {/* Animated Action Panel */}
                <tr>
                  <td colSpan="4" className="animated-panel-td">
                    <div
                      className={`action-panel animated-panel ${
                        selectedAsset?.id === a.id ? "open" : ""
                      }`}
                    >
                      {selectedAsset?.id === a.id && (
                        <>
                          <div className="panel-header">
                            <h4>{actionType === "maintenance" ? "Maintenance Request" : "Misuse Flag"}</h4>
                            <button className="close-btn" onClick={() => setSelectedAsset(null)}>
                              ×
                            </button>
                          </div>
                          <div className="panel-content">
                            {actionType === "maintenance" && (
                              <>
                                <p>Send maintenance request for {a.assetName}?</p>
                                <button
                                  className="primary"
                                  onClick={() => confirmMaintenance(a.id)}
                                >
                                  Confirm Request
                                </button>
                              </>
                            )}
                            {actionType === "misuse" && (
                              <>
                                <p>Flag this asset for misuse?</p>
                                <button
                                  className="danger"
                                  onClick={() => confirmMisuse(a.id)}
                                >
                                  Confirm Flag
                                </button>
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== MOBILE CARDS ===== */}
      <div className="mobile-assets">
        {assets.map((a) => (
          <div key={a.id} className="asset-card">
            <div className="card-top">
              <div>
                <h4>{a.hawker}</h4>
                <span className="sub-text">{a.hawkerId}</span>
              </div>
              <span className={`status-badge ${getConditionClass(a.condition)}`}>
                {a.condition}
              </span>
            </div>

            <div className="card-row">
              <span>Asset</span>
              <b>{a.assetName}</b>
            </div>

            <div
              className={`action-panel animated-panel ${
                selectedAsset?.id === a.id ? "open" : ""
              }`}
            >
              {selectedAsset?.id === a.id && (
                <>
                  <div className="panel-header">
                    <h4>{actionType === "maintenance" ? "Maintenance Request" : "Misuse Flag"}</h4>
                    <button className="close-btn" onClick={() => setSelectedAsset(null)}>
                      ×
                    </button>
                  </div>
                  <div className="panel-content">
                    {actionType === "maintenance" && (
                      <>
                        <p>Send maintenance request for {a.assetName}?</p>
                        <button
                          className="primary"
                          onClick={() => confirmMaintenance(a.id)}
                        >
                          Confirm Request
                        </button>
                      </>
                    )}
                    {actionType === "misuse" && (
                      <>
                        <p>Flag this asset for misuse?</p>
                        <button
                          className="danger"
                          onClick={() => confirmMisuse(a.id)}
                        >
                          Confirm Flag
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="card-actions">
              <button
                className="primary"
                onClick={() => toggleActionPanel(a, "maintenance")}
                disabled={a.maintenanceRequested}
              >
                {a.maintenanceRequested ? "Requested" : "Request Maintenance"}
              </button>
              <button
                className="danger"
                onClick={() => toggleActionPanel(a, "misuse")}
                disabled={a.misuseFlagged}
              >
                {a.misuseFlagged ? "Flagged" : "Flag Misuse"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
