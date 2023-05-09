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
  const [status, setStatus] = useState([]);
  const [cookies] = useCookies(["net_id"]);
  const [dispStatus, setDispStatus] = useState([]);

  useEffect(() => {
    fetch(`/get_notifications?id=${cookies.net_id}`)
    .then(response => response.json())
    .then((data) => {
      setStatus(data);
    })
    .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (status === "Available"){
      setDispStatus("On");
    }
    else{
      setDispStatus("Off");
    }
  }, [status]);
  

  const handleStatusToggle = () => {
    const netId = cookies.net_id;
    setStatus((prevStatus) => (prevStatus === "Available" ? "Not Available" : "Available"));
    console.log(netId, status)
    const data = {netId, status};
    fetch(`/post_notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
          console.log("Status changed")
        } else {
          console.log("Status change failed")
        }
      })
      .catch(error => console.error(error));
  };


  return (
    <div className="grid-item item-2" style={settingsStyle}>
      <div className="settings-header">
        <div style={headerContainerStyle}>
          <h2 style={{ margin:0}}>Settings</h2>
          <h4 class = "instructions">If opting into notifications, COSConnect will send you emails to the email listed below when you send or receive requests. Please whitelist <a style={{ color: '#186100' }}> cosconnectprinceton@gmail.com </a> to avoid our emails going to spam.</h4>
          <label>Email: <a style={{ color: '#186100' }}>{cookies.net_id}@princeton.edu</a></label>
          <div style={toggleContainerStyle}>
            <label htmlFor="status-toggle">Notifications: </label>
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
            <span style={{ marginLeft: "10px" }}>{dispStatus}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsView;