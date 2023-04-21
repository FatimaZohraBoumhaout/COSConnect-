import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import './SignIn.css';
import image from './FronPage.png';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function SignIn() {

  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["net_id"]);

  /*@Zohra @Pascal */
const handleLogin = (response) => {
  const token = response.credential;
  const decoded_token = jwt_decode(token);
  console.log(decoded_token);
  const data = { decoded_token };
  
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((res) => {
    console.log(res);
    if (res.status === 200) {
      res.json().then((jsonRes) => {
      console.log("jsonres" + jsonRes.net_id);
      const netId = jsonRes.net_id;
      console.log("should go to home");
      setCookie("net_id", netId);
      navigate(`/home`);
      });
    } else if (res.status === 404) {
      res.json().then((jsonRes) => {
        console.log("jsonres" + jsonRes.net_id);
        const netId = jsonRes.net_id;
        console.log("should go to survey");
        setCookie("net_id", netId);
        navigate('/survey');
      });
    } else {
      console.error('Login failed.');
    }
  })
  .catch((error) => {
    console.error(error);
  });
};


  return (
    <div className='main-container'>
      <h1 className='welcome'>Welcome to COSConnect where the journey begins!</h1>
      <div className='butt-container'>
        <GoogleOAuthProvider clientId='478842507060-e6h97rhvrg7set6n13teb5quprmgjvc7.apps.googleusercontent.com' className='butt'>
        <GoogleLogin
          onSuccess={handleLogin}
          theme='filled_blue'
          onError={() => {
            console.log('Login failed.');
          }}
        />
      </GoogleOAuthProvider>
      </div>
      <div>
        <img src={image}/>
     </div>
    </div>
  );
};

export default SignIn;

