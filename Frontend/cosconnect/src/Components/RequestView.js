import React, {useState, useEffect} from "react";
import { useCookies } from 'react-cookie';
const requestBody = {
  backgroundColor: "#edede4",
  borderRadius: "30px",
  marginTop: "20px",
  height: "85%",
  paddingBottom: "20px",
};

const headerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};


const rectangleContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
};

const rectangleStyle = {
  marginTop: "10px",
  width: "80%",
  height: "100%",
  backgroundColor: "#26272D",
  borderRadius: "15px",
};

const mediaQueryStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
  gap: "20px",
};

const pStyle = {
  color: "#BDD2B6",
  margin: "10px",
};

function RequestView() {
  const [cookies] = useCookies(['net_id']);
  const [receivedRequest, setReceivedRequest] = useState([]);
  const [sentRequest, setSentRequest] = useState([]);

  useEffect(() => {
    if (cookies.net_id !== null) {
        fetch(`/getRecentSent?id=${cookies.net_id}`)
        .then(response=> response.json())
        .then(data => {
            setSentRequest(data);
            console.log("sent requests set to ", data);
        })
        .catch(error => console.log(error));
      } else {
        console.log("net_id is null");
      }
  }, [cookies.net_id]);

  useEffect(() => {
    if (cookies.net_id !== null) {
        fetch(`/getRecentReceived?id=${cookies.net_id}`)
        .then(response=> response.json())
        .then(data => {
            setReceivedRequest(data);
            console.log("received requests set to ", data);
          })
        .catch(error => console.log(error));
      } else {
        console.log("net_id is null");
      }
  }, [cookies.net_id]);

  return (
    <div className="grid-item item-3" style={requestBody}>
      <div className="request-header" style={headerStyle}>
        <h2>My Requests</h2>
      </div>
      <div className="rectangle-container" style={rectangleContainerStyle}>
        <div className="rectangle" style={rectangleStyle}>
          <p style={pStyle}>Recently Received</p>
          <p style={{color:'white'}}>
          {receivedRequest}
          </p>
          {receivedRequest.length === 0 &&
                  <p style={{color:'white'}}>No Received Requests.</p>
          }
        </div>
        <div className="rectangle" style={rectangleStyle}>
        <p style={pStyle}>Recently Sent</p>
        <p style={{color:'white'}}>
        {sentRequest}
        </p>
          {sentRequest.length === 0 &&
                  <p style={{color:'white'}}>No Sent Requests.</p>
          }
          
        </div>
      </div>
      <style>
        {`@media (min-width: 768px) {
          .rectangle-container {
            ${mediaQueryStyle}
          }
        }`}
      </style>
    </div>
  );
}

export default RequestView;
