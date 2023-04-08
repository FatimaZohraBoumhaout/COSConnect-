import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import './Home.css';


function Home(){
    return(
        <div className="home">
            <div className="avatar">
                <Avatar  className="p-avatar" name="Zohra" size="60" round={true} />
            </div>
            <div className="title">
                <h3> Classes </h3>
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
                <div>
                    <h2 className="num">Class 1</h2>
                </div>
                <div>
                    <h2 className="num">Class 2</h2>
                </div>
                <div>
                    <h2 className="num">Class 3</h2>
                </div>
                <div>
                    <h2 className="num">Class 4</h2>
                </div>
            </div>

        </div>
    
    );

}


export default Home