import React from "react";
import './PartnerProfileView.css';
import PartnerProfileDetails from './PartnerProfileDetails';

function PartnerProfileView() {
  return (
    <div className="UserLayout">
        <div className="details">
          <PartnerProfileDetails/>
        </div>
      </div> 
  );
}

export default PartnerProfileView;