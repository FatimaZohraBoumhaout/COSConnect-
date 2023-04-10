import React, { useState, useEffect } from "react";
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

function SendRequestView() {
    // Might need to find a better function for this
    const match = window.location.search.match(/(\?|&)receiver=(\d+)/);
    const receiver = match && match[2];
  // const { userId } = props;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cookies] = useCookies(['user_id']);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (cookies.user_id !== null) {
      // Fetch the user's data from the Flask server
      fetch(`/get_info?id=${cookies.user_id}`)
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
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
    const data = {userId, receiver, message};
    fetch(`/send_message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
          navigate(`/classview`);
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
      background-color: #BADFE7;  
      border-radius: 30px;
      margin: 20px;
      width: 50%;
      margin-left: 0%;
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
          <Link to={`/classview`} className="edit-button">Close</Link>
          
        </div>
        <div className="profile-content">
          {/* <div className="gray-box"></div> */}
          <div>
            <label>Sender: {cookies.user_id}</label>
          </div>
          <div>
            <label>Receiver: {receiver}</label>
          </div>
          <div>
            <label>Message: </label>
            <input id="message" name="message" type="text" placeholder="Write Message you want to send here" onChange={event => setMessage(event.target.value)} required/>
          </div>
          <input type="submit" name="submit" value="Send" />
        </div>
      </div>
    </div>
    </form>
  );
}

export default SendRequestView;
