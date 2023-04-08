import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import './Home.css';

function Home(){
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // fetch classes from the backend API
    fetch('/get_class', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: 'user123' // replace with the user ID you want to fetch classes for
      }),
    })
      .then(response => response.json())
      .then(data => setClasses(data));
  }, []);

  return(
    <div className="home">
      <div className="avatar">
        <Avatar className="p-avatar" name="Zohra" size="60" round={true} />
      </div>
      <div className="title">
        <> Classes </>
      </div>
      <div className="buttons">
        <button>
          Add
        </button>
        <button>
          Drop
        </button>
      </div>
      <div className="boxes">
        {classes.map((className, index) => (
          <div key={index}>
            <h2 className="num">{className}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
