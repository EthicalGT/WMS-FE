import React, { useState } from "react";
import "../../assets/css/SupervisorDashboardContainer.css";

export default function Settings() {
  const [profile, setProfile] = useState({
    name: "Tejas Jadhav",
    email: "tejas@example.com",
    phone: "9876543210",
  });

  const [notifications, setNotifications] = useState({
    salesAlerts: true,
    inventoryAlerts: true,
    violationAlerts: true,
    messages: true,
  });

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const toggleNotification = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const saveProfile = () => {
    alert("Profile updated successfully!");
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <p className="subtitle">Manage profile & notification preferences</p>

      {/* ===== PROFILE SETTINGS ===== */}
      <div className="settings-card">
        <h3>Profile Settings</h3>

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleProfileChange}
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleProfileChange}
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleProfileChange}
          />
        </div>

        <button className="primary" onClick={saveProfile}>
          Save Profile
        </button>
      </div>

      {/* ===== NOTIFICATION SETTINGS ===== */}
      <div className="settings-card">
        <h3>Notification Preferences</h3>

        <div className="toggle-row">
          <span>Sales Alerts</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={notifications.salesAlerts}
              onChange={() => toggleNotification("salesAlerts")}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="toggle-row">
          <span>Inventory Alerts</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={notifications.inventoryAlerts}
              onChange={() => toggleNotification("inventoryAlerts")}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="toggle-row">
          <span>Violation Alerts</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={notifications.violationAlerts}
              onChange={() => toggleNotification("violationAlerts")}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="toggle-row">
          <span>Messages</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={notifications.messages}
              onChange={() => toggleNotification("messages")}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
}
