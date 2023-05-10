import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import WrongPage from "./WrongPage";
import "./Home.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function Home() {
  const [classes, setClasses] = useState([]);
  const [cookies, removeCookie] = useCookies(["net_id"]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("get class: ", cookies.net_id);
    fetch(`/get_class?net_id=${cookies.net_id}`)
      .then((response) => response.json())
      .then((data) => setClasses(data));
  }, [cookies.net_id]);

  useEffect(() => {
    if (cookies.net_id !== null) {
      fetch(`/get_info?id=${cookies.net_id}`)
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
        })
        .catch((error) => console.log(error));
    } else {
      console.log("net_id is null");
    }
  }, [cookies.net_id]);

  if (cookies.net_id == null) {
    return <WrongPage />;
  }

  let extractedElements = null;
  if (classes.length > 0) {
    extractedElements = classes[0][0].map((element, index) => {
      return (
        <div key={index}>
          <Link
            to={`/classview?class=${element}`}
            style={{ textDecoration: "none", color: "#403F3D" }}
          >
            <h2 key={index} className="num">
              COS {element}
            </h2>
          </Link>
        </div>
      );
    });
  }

  return (
    <>
      <Header />
      <div className="home">
        <div className="avatar">
          <a href={`/profileview`}>
            <Avatar
              className="p-avatar"
              name={user ? user[0][4] : ""}
              size="60"
              round={true}
            />
          </a>
        </div>
        <div className="title">
          Classes
        </div>
        <div className="buttons">
        </div>
        <div className="boxes">{classes && extractedElements}</div>
        <br />
        <br />
      </div>
      <Footer />
    </>
  );
}

export default Home;
