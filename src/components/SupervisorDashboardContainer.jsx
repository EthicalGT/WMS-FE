import { useState, useEffect } from "react";
import "../assets/css/DashboardContainer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { getHawkerDetails } from "../api/hawker_details";
import NotificationsContainer from "./hawker/NotificationsContainer";
import SettingsSecurityContainer from "./hawker/SettingsSecurityContainer";
import SupervisorDashboard from "./supervisor/SupervisorDashboard";
import AssignedHawkers from "./supervisor/AssignedHawkers";
import LiveSalesMonitoring from "./supervisor/LiveSalesMonitoring";
import InventoryOversight from "./supervisor/InventoryOversight";
import AlertsViolations from "./supervisor/AlertsViolations";
import AssetMonitoring from "./supervisor/AssetMonitoring";
import Messages from "./supervisor/Messages";
import Reports from "./supervisor/Reports";
import Settings from "./supervisor/Settings";

export default function SupervisorDashboardContainer() {
  const [open, setOpen] = useState(false);
  const [user, setUsername] = useState("Tejas Jadhav");
  const [activeView, setActiveView] = useState("dashboard");

  useEffect(() => {
    const fetchData = async () => {
      const res = await getHawkerDetails();
      if (res.status === "success") {
        setUsername(res.data.full_name);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="app">
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="logo">HMS</div>
        <nav className="nav">
          <span
            onClick={() => setActiveView("dashboard")}
            className={activeView === "dashboard" ? "active" : ""}
          >
            Dashboard
          </span>

          <span
            onClick={() => setActiveView("assignedHawker")}
            className={activeView === "assignedHawker" ? "active" : ""}
          >
            Assigned Hawker
          </span>

          <span
            onClick={() => setActiveView("liveSale")}
            className={activeView === "liveSale" ? "active" : ""}
          >
            Live sales Monitoring
          </span>

          <span
            onClick={() => setActiveView("inventory")}
            className={activeView === "inventory" ? "active" : ""}
          >
            Inventory Oversight
          </span>

          <span
            onClick={() => setActiveView("assetMonitoring")}
            className={activeView === "assetMonitoring" ? "active" : ""}
          >
            Asset Monitoring
          </span>

          <span
            onClick={() => setActiveView("alerts")}
            className={activeView === "alerts" ? "active" : ""}
          >
            Alerts and violations
          </span>

          <span
            onClick={() => setActiveView("message")}
            className={activeView === "message" ? "active" : ""}
          >
            Message
          </span>

          <span
            onClick={() => setActiveView("report")}
            className={activeView === "report" ? "active" : ""}
          > 
          Report
          </span>


          <span
            onClick={() => setActiveView("settings")}
            className={activeView === "settings" ? "active" : ""}
          >
            Settings
          </span>
        </nav>

        <div className="logout">
          <FontAwesomeIcon icon={faRightFromBracket} /> Logout
        </div>
      </aside>
      {open && <div className="overlay" onClick={() => setOpen(false)}></div>}
      <div className="main">
        <div className="topbar">
          <button className="hamburger" onClick={() => setOpen(!open)}>
            ☰
          </button>
          <h1> Supervisor Dashboard</h1>
          <div className="user">
            <FontAwesomeIcon icon={faBell} className="alert" />
            <FontAwesomeIcon icon={faUser} className="profile" />
            <div className="username">{user}</div>
            {/* <div className="username">Tejas Jadhav</div> */}
          </div>
        </div>
        <div className="content">
          {activeView === "dashboard" && (
            <div className="content">
              <div className="welcome">
                <div className="welcome-content">
                  <h2>Welcome back, {user}! 👋</h2>
                  <p>
                    Here’s a quick overview of your sales activity for today.
                  </p>
                </div>
                <div className="welcome-supervisor-info"></div>
              </div>
              <div>
                <SupervisorDashboard/>
            </div>
            </div>
          )}
          {activeView === "assignedHawker" && <AssignedHawkers />}

          

          {activeView === "liveSale" && (
            <LiveSalesMonitoring />
          )}

          {activeView === "inventory" && (
            <InventoryOversight />
          )}

          {activeView === "alerts" && (
            <AlertsViolations />
          )}

          {activeView === "assetMonitoring" && (
            <AssetMonitoring />
          )}

          {activeView === "message" && (
            <Messages />
          )}

          {activeView === "report" && (
            <Reports />
          )}

          {activeView === "settings" && (
            <Settings />
          )}
        </div>
      </div>
    </div>
  );
}
