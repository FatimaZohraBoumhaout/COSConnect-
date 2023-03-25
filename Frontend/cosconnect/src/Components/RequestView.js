import React from "react";
const requestBody = {
  backgroundColor: "#F2F0EB",
  borderRadius: "30px",
  marginTop: "20px",
  height: "auto",
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
  width: "80%",
  height: "80px",
  backgroundColor: "gray",
};

const mediaQueryStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
  gap: "20px",
};

function RequestView() {
  return (
    <div className="grid-item item-3" style={requestBody}>
      <div className="request-header" style={headerStyle}>
        <h2>My Requests</h2>
      </div>
      <div className="rectangle-container" style={rectangleContainerStyle}>
        <div className="rectangle" style={rectangleStyle}></div>
        <div className="rectangle" style={rectangleStyle}></div>
        <div className="rectangle" style={rectangleStyle}></div>
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
