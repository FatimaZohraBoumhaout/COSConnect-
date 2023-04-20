import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import './SignIn.css';
import image from './FronPage.png';

function SignIn() {
  const handleLogin = async (response) => {
    try {
      const token = response.credential;
      const data = { token };
      const res = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        const token = await res.text();
        const decoded = jwt_decode(token);
        console.log(decoded);
      } else {
        console.error('Login failed.');
      }
    } catch (error) {
      console.error(error);
    }
  };z

  return (
    <div className='main-container'>
      <h1 className='welcome'>Welcome to COSConnect, where your COS partnership journey begins!</h1>
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

