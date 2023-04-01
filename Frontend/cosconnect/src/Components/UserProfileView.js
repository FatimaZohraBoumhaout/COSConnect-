import React from "react";
import { useParams } from "react-router-dom";
import './UserProfileView.css';
import ProfileDetails from './ProfileDetails';
import SettingsView from './SettingsView';
import RequestView from './RequestView';

function UserProfileView() {
  const { userId } = useParams();
  return (
    <div className="UserLayout">
        <div className="details">
          <ProfileDetails userId={userId} />
        </div>
        <div className="settings">
          <SettingsView />
        </div>
        <div className="requests">
        < RequestView />
        </div>
      </div> 
  );
}

export default UserProfileView;
