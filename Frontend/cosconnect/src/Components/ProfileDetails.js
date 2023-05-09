import React, { useState, useEffect } from "react";
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import "./ProfileDetails.css";

function ProfileDetails() {
  // const { userId } = props;
  const [user, setUser] = useState(null);
  const [cookies] = useCookies(['net_id']);

  useEffect(() => {
    if (cookies.user_id !== null) {
      // Fetch the user's data from the Flask server
      fetch(`/get_info?id=${cookies.net_id}`)
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
        })
        .catch(error => console.log(error));
    } else {
      console.log("user_id is null");
    }
  }, [cookies.user_id]);

  const styles = `
    .profile-container {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #BDD2B6;  
      border-radius: 30px;
      margin: 20px;
    }

    .grid-item {
      width: 80%;
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
      margin-top: 11px;
      margin-right: 20px;
      padding: 5px;
    }

    .profile-name {
      font-size: 24px;
      margin-top: 45px;
      padding: 10px; 
    }

    .edit-button {
      margin-left: auto;
      background-color: #26272D; 
      color: white;
      border: none;
      border-radius: 5px;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      margin-top : 50px;
    }

    .edit-button:hover {
      background-color: #3e8e41;
    }

    .profile-content {
      margin-top: 16%;
      padding: 20px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      justify-content: space-between;
      background-color: white;
      opacity : 0.5;
      margin-bottom : 15%;
      border-radius: 25px;
    }
    
    .profile-content > div {
      margin-bottom: 60px;

    }

    .profile-content label {
      font-weight: bold;
      font-size: 20px;
    }

    .profile-content span {
      margin-left: 10px;
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

    }

  `;

  if (!user) {
    return <div style={{ backgroundColor: '#d9d9d9', height: '100%', paddingTop: '30%', borderRadius: '40px'}}><center><h2>Loading...</h2></center></div>
  }

  return (
    <div className="profile-container">
      <style>{styles}</style>
      <div className="grid-item item-1">
        <div className="profile-header">
          <Avatar  className="profile-avatar" name={user[0][4]} size="50" round={true} />
          <div className="profile-info">
            <h1 className="profile-name">{  user[0][4]}</h1>
          </div>
          <Link to={`/edit`} className="edit-button" style={{ textDecoration: 'none' }}>Edit</Link>
          
        </div>
        <div className="profile-content">
          <div>
            <label htmlFor="pronouns">Pronouns: </label>
            <span id="pronouns">{  user[0][0]}</span>
          </div>
          <div>
            <label htmlFor="classes">Classes: </label>
            <span id="classes">{ user[0][1].map(cls => "COS " + cls).join(", ")}</span>
          </div>
          <div>
            <label htmlFor="availability">Availability: </label>
            <span id="availability">{user[0][5]}</span>
          </div>
          <div>
            <label htmlFor="bio">Bio: </label>
            <span id="bio">{ user[0][2]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;