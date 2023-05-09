import React from "react";
import './UserProfileView.css';
import ProfileDetails from '../Components/ProfileDetails';
import SettingsView from '../Components/SettingsView';
import RequestView from '../Components/RequestView';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import WrongPage from "./WrongPage";
import { useCookies } from "react-cookie";


function UserProfileView() {
  const [cookies] = useCookies(['net_id']);

  //const { userId } = useParams();
  if (cookies.net_id == null) {
    return <WrongPage/>
}

  return (
    <>
    <Header />
    <div className="UserLayout">
        <div className="details">
          <ProfileDetails />
        </div>
        <div className="settings">
          <SettingsView />
        </div>
        <div className="requests">
        < RequestView />
        </div>
      </div> 
      <Footer />
      </>
  );
}

export default UserProfileView;
