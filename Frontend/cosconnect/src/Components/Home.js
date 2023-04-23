import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import './Home.css';

function Home(){
  const [classes, setClasses] = useState([]);
  const [cookies] = useCookies(['net_id']); 
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("get class: ",cookies.net_id);
    fetch(`/get_class?net_id=${cookies.net_id}`)
      .then(response => response.json())
      .then(data => setClasses(data));
  }, [cookies.net_id]);

  useEffect(() => {
    if (cookies.net_id !== null) {
      fetch(`/get_info?id=${cookies.net_id}`)
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
          console.log("user state set to:", data);
        })
        .catch(error => console.log(error));
    } else {
      console.log("net_id is null");
    }
  }, [cookies.net_id]);

  const handleAddClass = () => {
    console.log("Add button clicked");
  }

  const handleDropClass = () => {
    console.log("Drop button clicked");
  }


  let extractedElements = null;
  if(classes.length > 0){
  extractedElements = classes[0][0].map((element, index) => {
    console.log(element);
    return (
      <div key = {index}>
        <Link to={`/classview?class=${element}`} style={{ textDecoration: 'none' }}>
          
          <h2 key={index} className="num">{element}</h2>
        
        </Link>
      </div>
    );
  });
}

  return(
    <div className="home">
      <div className="avatar">
      <Avatar className="p-avatar" name={user ? user[0][4] : ''} size="60" round={true} />
      </div>
      <div className="title">
        <> Classes </>
      </div>
      <div className="buttons">
        <button onClick={handleAddClass}>
          Add
        </button>
        <button onClick={handleDropClass}>
          Drop
        </button>
      </div>
      <div className="boxes">
        {classes && extractedElements}
      </div>
    </div>
  );
}

export default Home;