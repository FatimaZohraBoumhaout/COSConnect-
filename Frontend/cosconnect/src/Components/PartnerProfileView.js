import React from "react";
import './PartnerProfileView.css';
import PartnerProfileDetails from './PartnerProfileDetails';

function PartnerProfileView() {
  const match = window.location.search.match(/(\?|&)partnerid=(\d+)/);
  const partnerid = match && match[2];
  return (
    <div className="UserLayout">
        <div className="details">
          <PartnerProfileDetails partneridProp={partnerid}/>
        </div>
      </div> 
  );
}

export default PartnerProfileView;