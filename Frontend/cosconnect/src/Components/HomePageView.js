import React, { useState, useEffect } from "react";

function HomePageView(props) {
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

  .bd {


  }



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
    <div className="bd">
        <div className="home-header">
            <img alt="avatar" className="profile-avatar" />
            <h1 className="home-title">Classes</h1>
        </div>

        <div className="classes">
            <div className="square">
                <div className="class1">
                </div>
            </div>

            <div className="square">
                <div className="class2">
                </div>
            </div>

            <div className="square">
                <div className="class3">
                </div>
            </div>

            <div className="square">
                <div className="class4">
                </div>
            </div>
        </div>
    </div>
  );
}

export default ProfileDetails;