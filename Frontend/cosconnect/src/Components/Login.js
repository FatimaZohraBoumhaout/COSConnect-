import React, { useState } from "react";
import { useCookies } from "react-cookie";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState('');
  const [cookies, setCookie] = useCookies(["user_id"]);
  const [isSignUpMode, setIsSignUpMode] = useState(false);



  function toggleMode() {
    setIsSignUpMode((prevMode) => !prevMode);
  }

  const handleLogIn = (event) => {
    event.preventDefault();
    // Send a POST request to server to log in user
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Set the user id cookie
        setCookie("user_id", data.user_id);
      })
      .catch((error) => console.log(error));
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    // Send a POST request to server to sign up user
    fetch("/reg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Set the user id cookie
        setCookie("user_id", data.user_id);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          {/* LOG IN */}
          {!isSignUpMode && (
            <form onSubmit={handleLogIn} className="sign-in-form">
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <input type="submit" value="Login" className="btn solid" />
            </form>
          )}

          {/* HIDDEN SIGN UP - JS Content */}
          {isSignUpMode && (
            <form onSubmit={handleSignUp} className="sign-up-form">
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="input-field">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
                <input type="submit" value="Sign up" className="btn" />
              </form>
            )}
      
            {/* TOGGLE SIGN UP/LOG IN */}
            <p className="toggle-link" onClick={toggleMode}>
              {isSignUpMode ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
            </p>
          </div>
        </div>
      
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here?</h3>
              <button className="btn transparent" onClick={toggleMode}>
                Sign up
              </button>
            </div>
            <img src="img/log.svg" className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us?</h3>
              <button className="btn transparent" onClick={toggleMode}>
                Sign in
              </button>
            </div>
            <img src="img/register.svg" className="image" alt="" />
          </div>
        </div>
      </div>
      );
    }
    
    export default Login;
