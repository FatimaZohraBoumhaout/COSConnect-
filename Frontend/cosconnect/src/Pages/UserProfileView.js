import React from "react";
//import { useParams } from "react-router-dom";
import './UserProfileView.css';
import ProfileDetails from '../Components/ProfileDetails';
import SettingsView from '../Components/SettingsView';
import RequestView from '../Components/RequestView';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function UserProfileView() {
  //const { userId } = useParams();
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
