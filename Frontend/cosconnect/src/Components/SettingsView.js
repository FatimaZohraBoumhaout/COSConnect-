import React, { useState, useEffect } from "react";
import "./SettingsView.css"; // import CSS file for custom styling
import { useCookies } from 'react-cookie';

const settingsStyle = {
  gridRow: "1",
  gridColumn: "3 / span 1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#edede4",
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
  const [notifications, setNotifications] = useState([]);
  const [cookies] = useCookies(["net_id"]);

  useEffect(() => {
    fetch(`/get_notifications?id=${cookies.net_id}`)
    .then(response => response.json())
    .then((data) => {
      setNotifications(data);
      console.log("notifications set to:", data);
    })
    .catch(error => console.error(error));
  }, []);

  const handleNotificationsToggle = () => {
    const netId = cookies.net_id;
    setNotifications((prevNotifications) => (prevNotifications === true ? false : true));
    console.log(netId, notifications)
    const data = {netId, notifications};
    fetch(`/post_notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
          console.log("notifications changed")
        } else {
          console.log("notifications change failed")
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="grid-item item-2" style={settingsStyle}>
      <div className="settings-header">
        <div style={headerContainerStyle}>
          <h2 style={{ margin:0}}>Settings</h2>
          <div style={toggleContainerStyle}>
            <label htmlFor="status-toggle">Notifications: </label>
            <div style={{ marginLeft: "10px" }}>
              <label className="switch">
                <input
                  type="checkbox"
                  id="status-toggle"
                  onChange={handleNotificationsToggle}
                  checked={notifications === "Available"}
                />
                <span className="slider round"></span>
              </label>
            </div>
            <span style={{ marginLeft: "10px" }}>{notifications}</span>
          </div>
            {/* {notifications && <span className="notification-badge">1</span>} */}
          </div>
        </div>
      </div>
  );
}

export default SettingsView;
