import React from "react";
import './UserSurvey.css';

function UserSurvey() {
  return (
    <div>
      <div className="container">
      <h1 className="form-title">Welcome to COSConnect!</h1>

      <form action="action">
        <div className="user-info">

          <div className="input-box">
            <label for="Pronouns">Full Name</label>
            <input type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Enter Full Name"/>
          </div>
          <div className="input-box">
            <label for="username">Username</label>
            <input type="text"
                    id="username"
                    name="username"
                    placeholder="Enter Username"/>
          </div>
          <div className="input-box">
            <label for="Pronouns">Pronouns</label>
            <input type="text"
                    id="Pronouns"
                    name="Pronouns"
                    placeholder="Enter Pronouns"/>
          </div>
          <div className="input-box">
            <label for="classNamees">COS Classes</label>
            <input type="text"
                    id="classNamees"
                    name="classNamees"
                    placeholder="e.g. COS 126"/>
          </div>
          <div className="input-box">
            <label for="availability">Availability</label>
            <input type="text"
                    id="availability"
                    name="availability"
                    placeholder="i.e. Monday from 3:00 PM to 5:00 PM & ..."/>
          </div>
          <div className="input-box">
            <label for="Bio">Bio</label>
            <input type="text"
                    id="Bio" 
                    name="Bio" 
                    placeholder="Tell us about yourself" 
                    style={{ height:"100px"}}/>
          </div>
        </div>
        <div className="submit-btn">
          <input type="submit" value="Submit"/>
        </div>
      </form>
    </div>
    </div>
  );
}

export default UserSurvey;