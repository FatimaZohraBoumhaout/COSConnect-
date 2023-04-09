import React from "react";
import './PartnerProfileView.css';
import PartnerProfileDetails from './PartnerProfileDetails';

function PartnerProfileView() {
const partner_id = 4;
  return (
    <div className="UserLayout">
        <div className="details">
          <PartnerProfileDetails partneridProp={4}/>
        </div>
      </div> 
  );
}

export default PartnerProfileView;