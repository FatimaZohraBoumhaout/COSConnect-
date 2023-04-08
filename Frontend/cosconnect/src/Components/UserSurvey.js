  /*------------------------------------------------------------------
  FOR FIRST TIME USERS (Form) -----> ADD REQUIRED TO INPUT
  -------------------------------------------------------------------*/

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import './UserSurvey.css';

function UserSurvey() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['user_id']);
  // const [userId, setUserId] = useState(cookies.user_id || '');
  const [fullName, setFullName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [classes, setClasses] = useState('');
  const [availability, setAvailability] = useState('');
  const [bio, setBio] = useState('');

  // const handleUserIdChange = (event) => {
  //   setUserId(event.target.value);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { fullName, displayName, pronouns, classes, availability, bio };
    fetch('/firstpage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        const userId = data.user_id;
        setCookie('user_id', userId);
        console.log(userId);
        navigate(`/home`);
      })
      .catch(error => console.error(error));
  }
 
  return (
    <div className="bd">
      <div className="container">
      <h1 className="form-title" style={{color: "#338888"}}>Welcome to COSConnect!</h1>
 
        <form method="post" action="/Home" onSubmit={handleSubmit}>   
          <div className="user-info">

            <div className="input-box">
              <label htmlFor="fullName">Full Name</label>
              <input type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter Full Name"
                value={fullName}
                onChange={event => setFullName(event.target.value)} 
                required/>
            </div>

            <div className="input-box">
              <label htmlFor="displayName">Display Name</label>
              <input type="text"
                id="displayName"
                name="displayName"
                placeholder="Enter Display Name"
                value={displayName}
                onChange={event => setDisplayName(event.target.value)} 
                />
            </div>

            <div className="input-box">
              <label htmlFor="pronouns">Pronouns</label>
              <input type="text"
                id="pronouns"
                name="pronouns"
                placeholder="Enter Pronouns"
                value={pronouns}
                onChange={event => setPronouns(event.target.value)} 
                required/>
            </div>

            <div className="input-box">
              <label htmlFor="classes">COS Classes</label>
              <input type="text"
                id="classes"
                name="classes"
                placeholder="e.g. COS 126"
                value={classes}
                onChange={event => setClasses(event.target.value)} 
                required/>
            </div>

            <div className="input-box">
              <label htmlFor="availability">Availability</label>
              <textarea type="text"
                id="availability"
                name="availability"
                placeholder="i.e. Monday from 3:00 PM to 5:00 PM"
                value={availability}
                onChange={event => setAvailability(event.target.value)} 
                style={{ height:"97%", width: "95%", padding: "15px"}}
                required>
              </textarea>
            </div>

            <div className="input-box">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="Bio"
                placeholder="Tell us about yourself"
                value={bio}
                onChange={event => setBio(event.target.value)}
                style={{ height:"97%", width: "95%", padding: "15px"}}
                required>
              </textarea>
            </div>

          </div>

          <div className="submit-btn">
            <input type="submit" value="Submit" />
          </div>
        </form>

      </div>
    </div>
  );
}

export default UserSurvey;
