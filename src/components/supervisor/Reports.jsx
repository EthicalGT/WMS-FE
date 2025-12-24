import React from "react";
import "../../assets/css/SupervisorDashboardContainer.css";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function Reports() {
  /* ===== DATA ===== */

  const dailySales = {
    totalSales: "₹2,45,600",
    totalHawkers: 12,
    avgSales: "₹20,467",
  };

  const barData = {
    labels: ["Ramesh", "Suresh", "Mahesh", "Ravi", "Amit"],
    datasets: [
      {
        label: "Sales (₹)",
        data: [52000, 38000, 46000, 29000, 41000],
        backgroundColor: "#2563eb",
        borderRadius: 6,
      },
    ],
  };

  const trendData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Daily Sales Trend (₹)",
        data: [180000, 195000, 210000, 205000, 230000, 245000],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.15)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const violations = [
    { hawker: "Ramesh Pawar", type: "Underpricing", count: 2 },
    { hawker: "Suresh Kale", type: "Missing Sales", count: 1 },
    { hawker: "Mahesh Jadhav", type: "Inventory Mismatch", count: 3 },
  ];

  return (
    <div className="reports-container">
      <h2>Reports</h2>
      <p className="subtitle">Sales, performance & compliance reports</p>

      {/* ===== SUMMARY CARDS ===== */}
      <div className="summary-grid">
        <div className="summary-card">
          <h4>Total Sales Today</h4>
          <p className="value">{dailySales.totalSales}</p>
        </div>

        <div className="summary-card">
          <h4>Total Hawkers</h4>
          <p className="value">{dailySales.totalHawkers}</p>
        </div>

        <div className="summary-card">
          <h4>Avg Sales / Hawker</h4>
          <p className="value">{dailySales.avgSales}</p>
        </div>
      </div>

      {/* ===== CHARTS ===== */}
      <div className="charts-grid">
        <div className="chart-card">
          <h4>Hawker Performance Comparison</h4>
          <Bar data={barData} />
        </div>

        <div className="chart-card">
          <h4>Sales Trend</h4>
          <Line data={trendData} />
        </div>
      </div>

      {/* ===== VIOLATION REPORT ===== */}
      <div className="violations-section">
        <h3>Violation Report</h3>

        <table className="report-table">
          <thead>
            <tr>
              <th>Hawker</th>
              <th>Violation Type</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {violations.map((v, i) => (
              <tr key={i}>
                <td>{v.hawker}</td>
                <td>{v.type}</td>
                <td className="danger-text">{v.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== EXPORT BUTTONS ===== */}
      <div className="export-buttons">
        <button className="primary">Download PDF</button>
        <button className="secondary">Export Excel</button>
      </div>
    </div>
  );
}
