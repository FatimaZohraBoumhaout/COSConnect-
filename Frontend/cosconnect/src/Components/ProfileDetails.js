import React from "react";

function ProfileDetails() {
  const styles = `
  .profile-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #F2F0EB;
    border-radius: 30px;
    margin: 20px; 
  }
  
  .grid-item {
    width: 85%;
    max-width: 800px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }
  
  .profile-header {
    display: flex;
    align-items: center;
  }
  
  .profile-avatar {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    margin-right: 20px;
  }
  
  .profile-name {
    font-size: 24px;
    margin: 0;
  }
  
  .edit-button {
    margin-left: auto;
  }
  
  .profile-content {
    margin-top: 20px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  
  .gray-box {
    width: 100%; 
    height: 200px;
    background-color: #d3d3d3;
    margin-bottom: 20px;
  }
  
  @media (max-width: 768px) {
    .grid-item {
      width: 90%;
      max-width: none;
    }
    
    .profile-avatar {
      height: 80px;
      width: 80px;
      margin-right: 10px;
    }
  
    .profile-name {
      font-size: 18px;
    }
  
    .profile-content {
      margin-top: 10px;
      padding: 10px;
    }
  
    .gray-box {
      height: 100px;
      margin-bottom: 10px;
    }
  }
  
  `;

  return (
    <div className="profile-container">
      <style>{styles}</style>
      <div className="grid-item item-1">
        <div className="profile-header">
          <img alt="avatar" className="profile-avatar" />
          <div className="profile-info">
            <h1 className="profile-name">Name</h1>
          </div>
          <button className="edit-button">Edit</button>
        </div>
        <div className="profile-content">
          <div className="gray-box"></div>
          <div className="gray-box"></div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;
