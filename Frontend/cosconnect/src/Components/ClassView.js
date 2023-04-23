import React, { useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import "./ClassView.css"
import "@fontsource/inter";

function ClassView(props){
    const [cookies, setCookie] = useCookies(['net_id', 'partner_id']);
    const [classes, setClasses] = useState([]);
    const [sentRequest, setSentRequest] = useState([]);
    const [receivedRequest, setReceivedRequest] = useState([]);
    const [studentsId, setStudentsId] = useState([]);
    const [input, setInput] = useState('');
    const [disabled, setDisabled] = useState({receiver_id: 'false'})
    const net_id = cookies.net_id;
    const location = useLocation;
    const buttonRef= useRef(null);
    const [studentInfo, setStudentInfo] = useState([]);
    
    const this_class = window.location.search.match(/class=([^&]*)/)[1].replace('%20',' ');

    useEffect(() => {
        console.log("get class: ",cookies.net_id);
        console.log("this class: ",this_class);
        if(cookies.net_id !== null){
        fetch(`/get_class?net_id=${cookies.net_id}`)
            .then(response => response.json())
            .then(data => {
                setClasses(data);
                console.log("classes set to ", data);
            })
            .catch((error) => {
                console.log(error);
            });
        }else{
            console.log("net_id is null");
        }
    }, [cookies.net_id]);

    useEffect(() => {
        if (cookies.net_id !== null) {
            fetch(`/getSentRequest?user_id=${cookies.net_id}&course=${this_class}`)
            .then(response=> response.json())
            .then(data => {
                setSentRequest(data);
                console.log("sent requests set to ", data);
            })
            .catch(error => console.log(error));
          } else {
            console.log("net_id is null");
          }
      }, [cookies.net_id]);

      useEffect(() => {
        if (cookies.net_id !== null) {
            fetch(`/getReceivedRequest?user_id=${cookies.net_id}&course=${this_class}`)
            .then(response=> response.json())
            .then(data => {
                setReceivedRequest(data);})
            .catch(error => console.log(error));
          } else {
            console.log("net_id is null");
          }
      }, [cookies.net_id]);
    
      /* useEffect(() => {
        if (cookies.net_id !== null) {
            fetch(`/get_students?id=${cookies.net_id}&class=${this_class}`)
            .then(response=> response.json())
            .then(data => {
                setStudentsId(data);
            })
            .catch(error => console.log(error));
          } else {
            console.log("net_id is null");
          }
      }, [cookies.net_id]); */

      useEffect(() => {
        if (cookies.net_id !== null) {
            fetch(`/get_students_info?id=${cookies.net_id}&class=${this_class}`)
            .then(response=> response.json())
            .then(data => {
                setStudentsId(data);
            })
            .catch(error => console.log(error));
          } else {
            console.log("net_id is null");
          }
      }, [cookies.net_id]);
    //   ).then((body) =>{
    //     body.forEach(response =>{
    //         if(response){
    //             response.json().then(data=>{
    //                 studentInfo.push(data)
    //             })
    //         }else{
    //             console.log(`Response error: ${response.status}`);
    //         }
    //     })
    // var studentInfo = []
    // Promise.all(
    //     studentsId.map(id => {
    //         fetch(`/get_info?id=${id}`)
    //         .then(response => response.json())
    //         .then(json=>{
    //             studentInfo.push(json)
    //         })
    //     })
    // )
    function handleChange(event){
        //setData()
        
    }
    function handleSubmit(event){
        //event.preventDefault();
        //console.log(data);
    }
    let renderClasses = null;
    if(classes.length > 0){
        renderClasses = classes[0][0] && classes[0][0].map((cl) => {
            return(
                <div className="rectangle-left">
                    <center>{cl}</center>
                </div>
            );
        });
    }
    // const sendRequest = (st) => {
    //     console.log(cookies.net_id)
    //     fetch(`add_request?sender_id=${cookies.net_id}&receiver_id=${st}&course=${this_class}`, {
    //         method: 'POST',
    //     })
    //     if(buttonRef.current) buttonRef.current.disabled = true;
    // }
    return(
        <div className="body">
            <div className="grid-container">
                <div className="classes">
                    <h3 className="left-header">Classes</h3>
                    {classes && renderClasses}
                    
                </div>
                
                <div className="sent">
                <div className="search">
                    <center>
                    <form id="form" className="form">
                        <input placeholder="Search..." value={input}></input>
                        <button className="search-button">
                        <svg viewBox="0 0 1024 1024"><path class="path1" d="M848.471 928l-263.059-263.059c-48.941 36.706-110.118 55.059-177.412 55.059-171.294 0-312-140.706-312-312s140.706-312 312-312c171.294 0 312 140.706 312 312 0 67.294-24.471 128.471-55.059 177.412l263.059 263.059-79.529 79.529zM189.623 408.078c0 121.364 97.091 218.455 218.455 218.455s218.455-97.091 218.455-218.455c0-121.364-103.159-218.455-218.455-218.455-121.364 0-218.455 97.091-218.455 218.455z"></path></svg>
                        </button>
                    </form>  
                    </center>
                    <h2>{this_class}</h2>
                </div>
                    <h3>Invitations Sent</h3>
                    {sentRequest && sentRequest.map((req) => (
                        <div className="rectangle-right">
                            <center>{req}</center>
                        </div>
                    ))}
                    {sentRequest.length === 0 && 
                        <p>Send some requests to get started.</p>
                    }
                </div>
                <div className="received">
                    <h3 className="left-header">Invitations Received</h3>
                    {receivedRequest && receivedRequest.map((req, index) => (
                        <div className="rectangle-left">{req}</div>
                    ))}
                    {receivedRequest.length === 0 && 
                        <p>You have received no requests!</p>
                    }
                </div>
                <div className="students">
                    <h3>Students</h3>
                    {studentsId && studentsId.map((st, index) =>(
                        <div className="rectangle-right">
                            <Link to={`/partnerview`}>
                           <center>NetId: {st[0]}, <p>Display Name: {st[1]}, Availability: {st[2]}</p></center>
                           </Link>
                    {/* <Link to={`/partnerview`} onClick={setCookie('partner_id', st)}>{st}</Link> */}
                    {/* <button ref={buttonRef} onClick={sendRequest(st)}> */}
                        {/* <center>Send</center>
                    </button> */}
                    </div>
                    ))}
                    
                </div>
            </div>
        </div>
    )
}
export default ClassView;