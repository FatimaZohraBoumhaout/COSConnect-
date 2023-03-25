import React from "react";
import './UserProfileView.css';
import ProfileDetails from './ProfileDetails';
import SettingsView from './SettingsView';
import RequestView from './RequestView';

function UserProfileView() {
  return (
    <div className="UserLayout">
        <div className="details">
          <ProfileDetails/>
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
