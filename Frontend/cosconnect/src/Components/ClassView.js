import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//classview_flask structures this template

import "./ClassView.css"
import "@fontsource/inter";

//get all sent and received students by id from DB

//-------------------
//notice that i have NOT used cookies in the frontend to see which 
//class i am current in on (ex. hardcode COS126)


function ClassView(){
    return(

        <div className="body">
            <div className="grid-container">
                <div className="classes">
                    <h3 className="left-header">Classes</h3>
                    <div className="rectangle-left"></div>
                    <div className="rectangle-left"></div>
                    <div className="rectangle-left"></div>
                    <div className="rectangle-left"></div>
                </div>
                <div className="search">
                    <form className="form">
                        <input placeholder="Search..."></input>
                        <button className="search-button">
                        <svg viewBox="0 0 1024 1024"><path class="path1" d="M848.471 928l-263.059-263.059c-48.941 36.706-110.118 55.059-177.412 55.059-171.294 0-312-140.706-312-312s140.706-312 312-312c171.294 0 312 140.706 312 312 0 67.294-24.471 128.471-55.059 177.412l263.059 263.059-79.529 79.529zM189.623 408.078c0 121.364 97.091 218.455 218.455 218.455s218.455-97.091 218.455-218.455c0-121.364-103.159-218.455-218.455-218.455-121.364 0-218.455 97.091-218.455 218.455z"></path></svg>
                        </button>
                    </form>  
                    <h2>COS126</h2>
                </div>
                <div className="sent">
                    <h3>Invitations Sent</h3>
                    <div className="rectangle-right"></div>
                    <div className="rectangle-right"></div>
                    <div className="rectangle-right"></div>
                    
                </div>
                <div className="received">
                    <h3 className="left-header">Invitations Received</h3>
                    <div className="rectangle-left"></div>
                    <div className="rectangle-left"></div>
                    <div className="rectangle-left"></div>
                    <div className="rectangle-left"></div>
                </div>
                <div className="students">
                    <h3>Students</h3>
                    <div className="rectangle-right"></div>
                    <div className="rectangle-right"></div>
                    <div className="rectangle-right"></div>
                    <div className="rectangle-right"></div>
                </div>
            </div>
        </div>
    )
}
export default ClassView;