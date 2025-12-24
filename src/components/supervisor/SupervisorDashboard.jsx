import React from "react";
import "../../assets/css/SupervisorDashboardContainer.css"

import {
  Users,
  UserCheck,
  IndianRupee,
  AlertTriangle,
  PackageX,
  ShieldAlert,
} from "lucide-react";

const kpis = [
  { title: "Total Hawkers Assigned", value: 128, icon: Users },
  { title: "Active Hawkers (Today)", value: 96, icon: UserCheck },
  { title: "Total Sales Today (₹)", value: "₹2,45,600", icon: IndianRupee },
  {
    title: "Pending Sales Verifications",
    value: 14,
    icon: AlertTriangle,
    status: "warning",
  },
  {
    title: "Inventory Mismatch Alerts",
    value: 6,
    icon: PackageX,
    status: "dangerous",
  },
  {
    title: "Violations Count",
    value: 3,
    icon: ShieldAlert,
    status: "dangerous",
  },
];

export default function SupervisorDashboard() {
  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Supervisor Dashboard</h1>
        <p>Real-time overview of hawker operations and alerts</p>
      </div>

      {/* KPI Grid */}
      <div className="kpi-grid">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;

          return (
            <div key={index} className={`kpi-card ${kpi.status || ""}`}>
              <div className="kpi-info">
                <p className="kpi-title">{kpi.title}</p>
                <h2 className="kpi-value">{kpi.value}</h2>

                {kpi.status && (
                  <span className="kpi-alert">Attention Required</span>
                )}
              </div>

              <div className="kpi-icon">
                <Icon size={26} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      
    </div>
  );
}
