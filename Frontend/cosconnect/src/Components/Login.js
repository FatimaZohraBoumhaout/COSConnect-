import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import './Login.css';

function login(){




return(
    <div className="bdy">
        <div class="contain">
        <div class="forms-container">
            <div class="signin-signup">
            <form action="/loggedIn" method="POST" class="sign-in-form">
                <h2 class="title">Sign in</h2>
                <div class="input-field">
                <i class="fas fa-user"></i>
                <input type="text" name="username" placeholder="Username" />
                </div>
                <div class="input-field">
                <i class="fas fa-lock"></i>
                <input type="password" name="password" placeholder="Password" />
                </div>
                <input type="submit" value="Login" class="btn solid" />
            </form>

            <form action="/reg" method="POST" class="sign-up-form">
                <h2 class="title">Sign up</h2>
                <div class="input-field">
                <i class="fas fa-user"></i>
                <input type="username" name="username" placeholder="Username" /> 
                </div>
                <div class="input-field">
                <i class="fas fa-envelope"></i>
                <input type="text" name="email" placeholder="Email" /> 
                </div>
                <div class="input-field">
                <i class="fas fa-lock"></i>
                <input type="password" name="password" placeholder="Password" /> 
                </div>
                
                <input type="submit" class="btn" value="Sign up" />
            </form>
            </div>
        </div>

        <div class="panels-container">
            <div class="panel left-panel">
            <div class="content">
                <h3>New here ?</h3>
                <p>
                Sign up to join the familly!
                </p>
                <button class="btn transparent" id="sign-up-btn">
                Sign up
                </button>
            </div>
            </div>
            <div class="panel right-panel">
            <div class="content">
                <h3>One of us ?</h3>
                <p>
                Sign in then!
                </p>
                <button class="btn transparent" id="sign-in-btn">
                Sign in
                </button>
            </div>
            </div>
        </div>
        </div>
    </div>
);
}

export default login;
