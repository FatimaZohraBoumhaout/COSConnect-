import React, { useState, useEffect} from "react";
import Avatar from 'react-avatar';
import { Cookies } from "react-cookie";
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function PartnerProfileDetails(props) {
  const [partner, setPartner] = useState(null);
  const [cookies, setCookie] = useCookies(['net_id', 'partner_id', 'class_id']);

  useEffect(() => {
  if (cookies.partner_id !== null) {
    // Fetch the partner's data from the Flask server
    console.log("I got here")
    fetch(`/get_info?id=${cookies.partner_id}`)
      .then((response) => response.json())
      .then((data) => {
        setPartner(data);
        console.log("partner state set to:", data);
      })
      .catch(error => console.log(error));
  } else {
    console.log("partner_id is null");
  }
    }, [cookies.partner_id]);

  const styles = `
    .profile-container {
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      background-color: #BADFE7;  
      border-radius: 30px;
      margin: 20px;
      margin-left: 50%;
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
      margin-bottom: 100px;
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

    if (partner === null){
        return (<p>error: nothing returned from database (ignore this message if it pops up for one second)</p>)
    } 

    function handleSendEmail() {
        const sender_email = cookies.net_id + '@princeton.edu';
        const receiver_email = cookies.partner_id + '@princeton.edu';
        const subject = 'COS class partnership request';
        const body = 'Hello,\n\nThis is a pre-drafted email.\n\nBest regards,';
        
        fetch('/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            sender_email: sender_email,
            receiver_email: receiver_email,
            subject: subject,
            body: body
          })
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
      }

  return (
    <div className="profile-container">
      <style>{styles}</style>
      <div className="grid-item item-1">
        <div className="profile-header">
          <Avatar  className="profile-avatar" name={partner[0][4]} size="50" round={true} />
          <div className="profile-info">
            <h1 className="profile-name">{ partner[0][4]}</h1>
          </div>
          <Link to={`/classview?class=${cookies.class_id}`} className="edit-button">Close</Link>
          <Link to={`/sendrequest?receiver=${props.partneridProp}`} className="edit-button" onClick={handleSendEmail}>Send Request</Link>
        </div>
        <div className="profile-content">
          {/* <div className="gray-box"></div> */}
          <div>
            <label htmlFor="pronouns">Pronouns: </label>
            <span id="pronouns">{  partner[0][0]}</span>
          </div>
          <div>
            <label htmlFor="classes">Classes: </label>
            <span id="classes">{  partner[0][1]}</span>
          </div>
          <div>
            <label htmlFor="bio">Bio: </label>
            <span id="bio">{ partner[0][2]}</span>
          </div>
          <div>
            <label htmlFor="availability">Availability: </label>
            <span id="availability">{partner[0][5]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
/**********************************************************************************/



/**********************************************************************************/

export default PartnerProfileDetails;