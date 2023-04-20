  /*------------------------------------------------------------------
  FOR FIRST TIME USERS (Form) -----> ADD REQUIRED TO INPUT
  -------------------------------------------------------------------*/

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import './UserSurvey.css';

function UserSurvey() {
  const navigate = useNavigate();
  //const [cookies, setCookie, removeCookie] = useCookies(['user_id']);
  // const [userId, setUserId] = useState(cookies.user_id || '');
  const [fullName, setFullName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [classes, setClasses] = useState('');
  const [availability, setAvailability] = useState('');
  const [bio, setBio] = useState('');
  const [cookies] = useCookies(['net_id']);

  // const handleUserIdChange = (event) => {
  //   setUserId(event.target.value);
  // };

  const handleSubmit = (event) => {
    let class_ = ""; 
    event.preventDefault();
    const netId = cookies.net_id;
    console.log(netId);
    const data = { netId, fullName, displayName, pronouns, classes, availability, bio };
    fetch('/userprofile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        class_ = classes
        console.log(netId);
        // Make a new API request to add the classes 
        fetch('/add_class', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "net_id": netId,
            "class_name": class_
          })
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
          })
          .catch(error => console.error(error));
        navigate(`/home`);
      })
      .catch(error => console.error(error));
  }
  
 
  return (
    <div className="bd">
      <div className="container1">
      <h1 className="form-title" style={{color: "#338888"}}>Welcome to COSConnect!</h1>
 
        <form method="post" onSubmit={handleSubmit}>   
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
