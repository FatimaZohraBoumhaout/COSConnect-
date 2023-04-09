import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import './Home.css';

function Home(){
  const [classes, setClasses] = useState([]);
  const [cookies] = useCookies(['user_id']); 
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("get class: ",cookies.user_id);
    fetch(`/get_class?user_id=${cookies.user_id}`)
      .then(response => response.json())
      .then(data => setClasses(data));
  }, [cookies.user_id]);

  useEffect(() => {
    if (cookies.user_id !== null) {
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

  return(
    <div className="home">
      <div className="avatar">
      <Avatar className="p-avatar" name={user ? user[0][4] : ''} size="60" round={true} />
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
      <Link to={`/classview`}>
      <div className="boxes">
        {classes && classes.map((className, index) => (
          <div key={index}>
            <h2 className="num">{className}</h2>
          </div>
        ))}
      </div>
      </Link>
    </div>
  );
}

export default Home;