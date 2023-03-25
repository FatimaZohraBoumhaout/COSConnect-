import React, { useState } from "react";

const settingsStyle = {
  gridRow: "1",
  gridColumn: "3 / span 1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#F2F0EB",
  borderRadius: "30px",
  marginTop: "20px"
};

const headerContainerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: "30px",
};

const toggleContainerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function SettingsView() {
  const [status, setStatus] = useState("Not Available");
  const [notifications, setNotifications] = useState(false);

  const handleStatusToggle = () => {
    setStatus((prevStatus) => (prevStatus === "Available" ? "Not Available" : "Available"));
  };
  

  const handleNotificationsToggle = () => {
    setNotifications((prevNotifications) => !prevNotifications);
  };

  return (
    <div className="grid-item item-2" style={settingsStyle}>
      <div className="settings-header">
        <div style={headerContainerStyle}>
          <h2 style={{ margin:0}}>Settings</h2>
          <div style={toggleContainerStyle}>
            <label htmlFor="status-toggle">Status:</label>
            <div style={{ marginLeft: "10px" }}>
              <label className="switch">
                <input
                  type="checkbox"
                  id="status-toggle"
                  onChange={handleStatusToggle}
                  checked={status === "Available"}
                />
                <span className="slider round"></span>
              </label>
            </div>
            <span style={{ marginLeft: "10px" }}>{status}</span>
          </div>
          <div style={toggleContainerStyle}>
            <label htmlFor="notifications-toggle">Notifications:</label>
            <div style={{ marginLeft: "10px" }}>
              <label className="switch">
                <input
                  type="checkbox"
                  id="notifications-toggle"
                  onChange={handleNotificationsToggle}
                  checked={notifications}
                />
                <span className="slider round"></span>
              </label>
            </div>
            {notifications && <span className="notification-badge">1</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsView;
