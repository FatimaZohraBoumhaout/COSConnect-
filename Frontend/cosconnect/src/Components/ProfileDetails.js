import React, { useState, useEffect } from "react";

function ProfileDetails(props) {
  const { userId } = props;
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch the user's data from the Flask server
    fetch(`/firstpage?id=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        console.log("user state set to:", data);
      })
      .catch(error => console.log(error));
      
  }, [userId]);

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
    flex-grow: 1; /* add this */
    justify-content: space-between; /* add this */
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

  if (!user) {
    return <>loading...</>
  }

  return (
    <div className="profile-container">
      <style>{styles}</style>
      <div className="grid-item item-1">
        <div className="profile-header">
          <img alt="avatar" className="profile-avatar" />
          <div className="profile-info">
            <h1 className="profile-name">{  user[0][4]}</h1>
          </div>
          <button className="edit-button">Edit</button>
        </div>
        <div className="profile-content">
          <div className="gray-box"></div>
          <div>
            <label htmlFor="pronouns">Pronouns:</label>
            <span id="pronouns">{  user[0][0]}</span>
          </div>
          <div>
            <label htmlFor="classes">Classes:</label>
            <span id="classes">{  user[0][1]}</span>
          </div>
          <div>
            <label htmlFor="bio">Bio:</label>
            <span id="bio">{  user[0][2]}</span>
          </div>
          <div>
            <label htmlFor="availability">Availability:</label>
            <span id="availability">{}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;