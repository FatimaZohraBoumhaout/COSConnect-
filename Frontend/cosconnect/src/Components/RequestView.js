import React from "react";
const requestBody = {
  backgroundColor: "#BADFE7",
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
  backgroundColor: "#D9D9D9",
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
  color: "#000000",
  margin: "10px",
};

function RequestView() {
  return (
    <div className="grid-item item-3" style={requestBody}>
      <div className="request-header" style={headerStyle}>
        <h2>My Requests</h2>
      </div>
      <div className="rectangle-container" style={rectangleContainerStyle}>
        <div className="rectangle" style={rectangleStyle}>
          <p style={pStyle}>Received Requests</p>
        </div>
        <div className="rectangle" style={rectangleStyle}>
        <p style={pStyle}>Sent Requests</p>
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
