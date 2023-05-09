import React from "react";
import './PartnerProfileView.css';
import PartnerProfileDetails from '../Components/PartnerProfileDetails';
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function PartnerProfileView() {
  // const [cookies] = useCookies(['net_id']);
  // const navigate = useNavigate();

  return (
    <>
    <Header />
    <div className="UserLayout">
        <div className="details">
          <PartnerProfileDetails/>
        </div>
      </div> 
      <Footer />
    </>
  );
}

export default PartnerProfileView;