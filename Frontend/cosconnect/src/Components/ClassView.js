import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import "./ClassView.css"
import "@fontsource/inter";

function ClassView(){
    const [cookies, setCookie] = useCookies(['user_id']);
    const [classes, setClasses] = useState(['cl']);
    const [sentRequest, setSentRequest] = useState([]);
    const [receivedRequest, setReceivedRequest] = useState([]);
    const [students, setStudents] = useState([]);

    const user_id = cookies.user_id;
    const location = useLocation;
    
    useEffect(() => {
        console.log("get class: ",cookies.user_id);
        fetch(`/get_class?user_id=${cookies.user_id}`)
            .then(response => response.json())
            .then(data => {
                setClasses(data);
                const this_class = data; 
                fetch(`/getSentRequest?user_id=${cookies.user_id}`)
                    .then(response=> response.json())
                    .then(data => {
                        setSentRequest(data);
                        fetch(`/getReceivedRequest?user_id=${cookies.user_id}`)
                            .then(response=> response.json())
                            .then(data => {
                                setReceivedRequest(data);
                                fetch(`/get_students?class=${this_class}`)
                                    .then(response=> response.json())
                                    .then(data => {
                                        setStudents(data);
                                    });
                            });
                    });
            });
    }, [cookies.user_id]);
    
    
    return(
        <div className="body">
            <div className="grid-container">
                <div className="classes">
                    <h3 className="left-header">Classes</h3>
                    <div className="rectangle-right">{classes[0]}</div>
                    <div className="rectangle-right"></div>
                    <div className="rectangle-right"></div>
                </div>
                <div className="search">
                    <form id="form" className="form">
                        <input placeholder="Search..."></input>
                        <button className="search-button">
                        <svg viewBox="0 0 1024 1024"><path class="path1" d="M848.471 928l-263.059-263.059c-48.941 36.706-110.118 55.059-177.412 55.059-171.294 0-312-140.706-312-312s140.706-312 312-312c171.294 0 312 140.706 312 312 0 67.294-24.471 128.471-55.059 177.412l263.059 263.059-79.529 79.529zM189.623 408.078c0 121.364 97.091 218.455 218.455 218.455s218.455-97.091 218.455-218.455c0-121.364-103.159-218.455-218.455-218.455-121.364 0-218.455 97.091-218.455 218.455z"></path></svg>
                        </button>
                    </form>  
                    <h2>{classes[0]}</h2>
                </div>
                <div className="sent">
                    <h3>Invitations Sent</h3>
                    <div className="rectangle-right">{sentRequest[0]}</div>
                    <div className="rectangle-right">{sentRequest[1]}</div>
                    <div className="rectangle-right">{sentRequest[2]}</div>
                    
                </div>
                <div className="received">
                    <h3 className="left-header">Invitations Received</h3>
                    <div className="rectangle-left">{receivedRequest[0]}</div>
                    <div className="rectangle-left">{receivedRequest[1]}</div>
                    <div className="rectangle-left">{receivedRequest[2]}</div>
                    <div className="rectangle-left">{receivedRequest[3]}</div>
                </div>
                <div className="students">
                    <h3>Students</h3>
                    <Link to={`/partnerview?partnerid=${students[0]}`}><div className="rectangle-right">{students[0]}</div></Link>
                    <Link to={`/partnerview?partnerid=${students[1]}`}><div className="rectangle-right">{students[1]}</div></Link>
                    <Link to={`/partnerview?partnerid=${students[2]}`}><div className="rectangle-right">{students[2]}</div></Link>
                    <Link to={`/partnerview?partnerid=${students[3]}`}><div className="rectangle-right">{students[3]}</div></Link>
                </div>
            </div>
        </div>
    )
}
export default ClassView;