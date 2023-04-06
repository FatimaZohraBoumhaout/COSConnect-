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
                <div className="content">
                    <h3 className="class-text">Class 1</h3>
                </div>
            </div>

            <div className="square">
                <div className="content">
                    <h3 className="class-text">Class 2</h3>
                </div>
            </div>

            <div className="square">
                <div className="content">
                    <h3 className="class-text">Class 3</h3>
                </div>
            </div>

            <div className="square">
                <div className="content">
                    <h3 className="class-text">Class 4</h3>
                </div>
            </div>
        </div>
    </div>
  );
}

export default ProfileDetails;