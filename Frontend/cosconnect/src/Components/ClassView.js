import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ClassView.css"
import "@fontsource/inter";

function ClassView(){
    return(
        <div className="body">
            <div className="grid-container">
                <div className="classes">
                    <h3 className="left-header">Classes</h3>

                </div>
                <div className="search">
                    <h2>COS126</h2>
                </div>
                <div className="sent">
                    <h3>Invitations Sent</h3>
                </div>
                <div className="received">
                    <h3 className="left-header">Invitations Received</h3>
                    </div>
                <div className="students">
                    <h3>Students</h3>
                </div>
            </div>
        </div>
    )
}
export default ClassView;