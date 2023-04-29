import React, { useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import "@fontsource/inter";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./Request.css";

function Request(){
    const [classes, setClasses] = useState([]);
    const [cookies, setCookie] = useCookies(['net_id','partner_id', 'class_id']);

  
    useEffect(() => {
        if(cookies.net_id != null){
            console.log("net_id: " + cookies.net_id);
            fetch(`get_class?net_id=${cookies.net_id}`)
            .then (response => response.json())
            .then(data => {
                setClasses(data)
                console.log("classes: "+data);
            })
            .catch((error) => {
                console.log(error);
            });
        }else{
            console.log("net_id is null");
        }
    }, [cookies.net_id]);

    useEffect(() => {
        fetch('get')
    
    })


    return(
        <>
        <Header/>
        <div className ="container">

            <div className="class-title">
                Pascal is a bitch 

            </div>

            <aside className="container_left">
            <div className="classes">
                    <h3 className="left-header">Classes</h3>
                    {classes && renderClasses}
                    
                </div>
            </aside>
            <div className="container_top">
            <div className="new_requests">
                <h3 className="top-header">New Requests</h3>
                </div>
            </div>
              

            <div className="container_bottom">
            <div className="rejected-requests">
                <h3 className="top-header">Rejected Requests</h3>
                </div>
            </div>
        
        
        </div>
        <Footer/>
        </>
    );

}
export default Request;