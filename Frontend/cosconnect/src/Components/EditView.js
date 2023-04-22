import React, { useState, useEffect } from "react";
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

function EditView() {
  // const { userId } = props;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cookies] = useCookies(['net_id']);
  const [pronouns, setPronouns] = useState('');
  const [classes, setClasses] = useState('');
  const [availability, setAvailability] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    if (cookies.user_id !== null) {
      // Fetch the user's data from the Flask server
      fetch(`/get_info?id=${cookies.net_id}`)
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
          setPronouns(data[0][0]);
          setClasses(data[0][1]);
          setAvailability(data[0][2]);
          setBio(data[0][5]);
          console.log("user state set to:", data);
        })
        .catch(error => console.log(error));
    } else {
      console.log("user_id is null");
    }
  }, [cookies.user_id]);

  const handleSubmit = (event) => {
    let class_ = ""; 
    event.preventDefault();
    const userId = cookies.user_id;
    console.log(pronouns, classes, availability, bio)
    const data = {userId, pronouns, classes, availability, bio};
    fetch(`/edit_profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
          navigate(`/profileview`);
        } else {
          throw new Error('Request failed');
        }
      })
      .catch(error => console.error(error));
  }

  const styles = `
    .profile-container {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #edede4;  
      border-radius: 30px;
      margin: 20px;
      width: 50%;
      margin-left: 25%;
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
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
    }

    .edit-button:hover {
      background-color: #3e8e41;
    }

    .profile-content {
      margin-top: 20px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      justify-content: space-between;
    }

    .profile-content > div {
      margin-bottom: 8.5%;
    }

    .profile-content label {
      font-weight: bold;
      font-size: 20px;
    }

    .profile-content span {
      margin-left: 10px;
    }


    .gray-box {
      width: 100%;
      height: 200px;
      background-color: #d3d3d3;
      margin-bottom: 20px;
    }

    .button-save{
      background-color: #26272D;
      color: #fff;      
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
    <form method="post" onSubmit={handleSubmit}>   
    <div className="profile-container">
      <style>{styles}</style>
      <div className="grid-item item-1">
        <div className="profile-header">
          <Avatar  className="profile-avatar" name={user[0][4]} size="50" round={true} />
          <div className="profile-info">
            <h1 className="profile-name">{  user[0][4]}</h1>
          </div>
          <Link to={`/profileview`} className="edit-button">Close</Link>
          
        </div>
        <div className="profile-content">
          {/* <div className="gray-box"></div> */}
          <div>
            <label htmlFor="pronouns">Pronouns: </label>
            <input id="pronouns" name="pronouns" type="text" placeholder={user[0][0]} onChange={event => setPronouns(event.target.value)}  required/>
          </div>
          <div>
            <label htmlFor="classes">Classes: </label>
            <input id="classes" name="classes" type="text" placeholder={user[0][1]} onChange={event => setClasses(event.target.value)} required/>
          </div>
          <div>
            <label htmlFor="bio">Bio: </label>
            <input id="bio" name="bio" type="text" placeholder={user[0][2]} onChange={event => setAvailability(event.target.value)} required/>
          </div>
          <div>
            <label htmlFor="availability">Availability: </label>
            <input id="availability" name="availability" type="text" placeholder={user[0][5]} onChange={event => setBio(event.target.value)} required/>
          </div>

          <input className = "button-save" type="submit" name="submit" value="Save" />
        </div>
      </div>
    </div>
    </form>
  );
}

export default EditView;
