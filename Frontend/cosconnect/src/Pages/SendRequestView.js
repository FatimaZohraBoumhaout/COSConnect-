import React, { useState, useEffect } from "react";
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

function SendRequestView() {
  // const { userId } = props;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cookies, setCookie] = useCookies(['net_id', 'partner_id', 'class_id']);

  // useEffect(() => {
  //   if (cookies.partner_id !== null) {
  //     // Fetch the user's data from the Flask server
  //     fetch(`/get_info?id=${cookies.partner_id}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setUser(data);
  //         console.log("partner_id set to:", data);
  //       })
  //       .catch(error => console.log(error));
  //   } else {
  //     console.log("partner_id is null");
  //   }
  // }, [cookies.partner_id]);

  const handleSubmit = (event) => {
    let class_ = ""; 
    event.preventDefault();
    const sender_id = cookies.net_id;
    const receiver_id = cookies.partner_id;
    const course = cookies.class_id;
    const data = {sender_id, receiver_id, course};
    fetch(`/add_request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
          handleSendEmail()
          navigate(`/classview?class=${cookies.class_id}`);
        } else {
          throw new Error('Request failed');
        }
      })
      .catch(error => console.error(error));
  }

  function handleSendEmail() {
    const sender_email = cookies.net_id + '@princeton.edu';
    const receiver_email = cookies.partner_id + '@princeton.edu';
    const subject = 'COS class partnership request';
    const sender_id = cookies.net_id;
    const receiver_id = cookies.partner_id;
    const cosconnect_link = 'https://cosconnect-app.onrender.com';
    const body = `Hello ${receiver_id},
    You received a partnership request on ${cosconnect_link} from ${sender_id}.
    Please click on the link to visit our website and view your request.
    Best regards,`;
    
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


  const styles = `
    .profile-container {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #BDD2B6;  
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
      background-color: #26272D; 
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

    .send-button {
      background-color: #26272D; 
      color: white;
      font-size: 15px;
    }

    .send-button:hover {
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

  // if (!user) {
  //   return <>loading...</>
  // }

  return (
    <>
    <Header />
    <form method="post" onSubmit={handleSubmit}>   
    <div className="profile-container">
      <style>{styles}</style>
      <div className="grid-item item-1">
        <div className="profile-header">
          <Avatar  className="profile-avatar" name={cookies.net_id} size="50" round={true} />
          <div className="profile-info">
            <h1 className="profile-name">{  cookies.net_id}</h1>
          </div>
          <Link to={`/classview?class=${cookies.class_id}`} className="edit-button" style={{ textDecoration: 'none' }}>Close</Link>
          
        </div>
        <div className="profile-content">
          {/* <div className="gray-box"></div> */}
          <div>
            <label>Sender: {cookies.net_id}</label>
          </div>
          <div>
            <label>Receiver: {cookies.partner_id}</label>
          </div>
          <div>
            <label>Message: </label>
            <h2 style={{color:'black', fontSize: '22px'}}>Partner request through email</h2>
          </div>
          {/* <Link to={`/classview?class=${cookies.class_id}`}> */}
          <input className="send-button" type="submit" name="submit" value="Send" />
          {/* </Link> */}
        </div>
      </div>
    </div>
    </form>
    <Footer />
    </>
  );
}

export default SendRequestView;
