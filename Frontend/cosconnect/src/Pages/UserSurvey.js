/*------------------------------------------------------------------
  FOR FIRST TIME USERS (Form)
  -------------------------------------------------------------------*/

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./UserSurvey.css";
import Multiselect from "multiselect-react-dropdown";
import DOMPurify from 'dompurify';


function UserSurvey() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [availability, setAvailability] = useState("");
  const [bio, setBio] = useState("");
  const [cookies] = useCookies(["net_id"]);
  const [course, setCourse] = useState([]);
  const [classes, setClasses] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const netId = cookies.net_id;
    console.log("cookie us" + netId);
    const data = {
      netId,
      fullName: DOMPurify.sanitize(fullName),
      displayName: DOMPurify.sanitize(displayName),
      pronouns: DOMPurify.sanitize(pronouns),
      classes,
      availability: DOMPurify.sanitize(availability),
      bio: DOMPurify.sanitize(bio),
    };
    console.log(data);
    fetch("/userprofile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(netId);
        // Make a new API request to add the classes
        fetch("/add_class", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            net_id: netId,
            classes: classes,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => console.error(error));
        navigate(`/home`);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetch(`/get_courses`)
      .then((response) => response.json())
      .then(({ term }) => {
        console.log("terms:", term);
        const subjects = term[0].subjects;
        console.log("subjects:", subjects);
        const courses = subjects[0].courses;
        console.log("courses", courses);
        const coursenums = courses.map((course) => course.catalog_number);
        console.log("coursenums", coursenums);
        const coursenumsstring = coursenums.map((num) => String(num));
        setCourse(coursenumsstring);
      })
      .catch((error) => console.log(error));
  }, []);

   function handleTagSelect(selectedList) {
    setClasses(selectedList);
    }

  return (
    <div className="bd">
    <div className="container1">
      <h1 className="form-title" style={{ color: "#338888" }}>
        Welcome to COSConnect!
      </h1>
  
      <form method="post" onSubmit={handleSubmit}>
        <div className="user-info">
          <div className="input-box">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter Full Name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
              maxlength="50"
            />
          </div>
  
          <div className="input-box">
            <label htmlFor="displayName">Display Name</label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              placeholder="Enter Display Name"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              maxlength="50"
            />
          </div>
  
          <div className="input-box">
            <label htmlFor="pronouns">Pronouns</label>
            <input
              type="text"
              id="pronouns"
              name="pronouns"
              placeholder="Enter Pronouns"
              value={pronouns}
              onChange={(event) => setPronouns(event.target.value)}
              required
              maxlength="50"
            />
          </div>
  
          <div className="input-box">
            <label htmlFor="classes">Classes</label>
            <div className="multi-select">
              <Multiselect 
                isObject={false}
                options={course}
                selectedValues={classes}
                onSelect={handleTagSelect}
                onRemove={handleTagSelect}
                maxlength="40"
              />
            </div>
          </div>
  
          <div className="input-box">
            <label htmlFor="availability">Availability</label>
            <textarea
              type="text"
              id="availability"
              name="availability"
              placeholder="i.e. Monday from 3:00 PM to 5:00 PM. Please write no more than 100 chars!"
              value={availability}
              onChange={(event) => setAvailability(event.target.value)}
              style={{ height: "97%", width: "95%", padding: "15px" }}
              required
              maxlength="100"
            ></textarea>
          </div>
  
          <div className="input-box">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="Bio"
              placeholder="Please write no more than 100 chars!"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              style={{ height: "97%", width: "95%", padding: "15px" }}
              required
              maxlength="100"
            ></textarea>
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
