import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "@fontsource/inter";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./Request.css";

function Request(){
    const [sentPending, setSentPending] = useState([]);
    const [receivedPending, setReceivedPending] = useState([]);
    const [cookies] = useCookies(['net_id']);
    const [rejected, setRejected] = useState([]);
    const [accepted, setAccepted] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if(cookies.net_id != null){
            console.log("net_id: " + cookies.net_id);
            fetch(`get_pending?id=${cookies.net_id}`)
            .then (response => response.json())
            .then(data => {
                setSentPending(data[0]);
                setReceivedPending(data[1]);
                console.log("receivedrequests: "+ data[1]);
                console.log("sentrequests: "+ data[0]);
            })
            .catch((error) => {
                console.log(error);
            });
        }else{
            console.log("net_id is null");
        }
    }, [cookies.net_id]);

    useEffect(() => {
        if(cookies.net_id != null){
            console.log("net_id: " + cookies.net_id);
            fetch(`get_accepted?id=${cookies.net_id}`)
            .then (response => response.json())
            .then(data => {
                setAccepted(data);
                console.log("accepted requests: "+ data);
            })
            .catch((error) => {
                console.log(error);
            });
        }else{
            console.log("net_id is null");
        }
    }, [cookies.net_id]);

    useEffect(() => {
        if(cookies.net_id != null){
            console.log("net_id: " + cookies.net_id);
            fetch(`get_rejected?id=${cookies.net_id}`)
            .then (response => response.json())
            .then(data => {
                setRejected(data);
                console.log("rejected requests: "+ data);
            })
            .catch((error) => {
                console.log(error);
            });
        }else{
            console.log("net_id is null");
        }
    }, [cookies.net_id]);

    const handleAccept = (sender, course) => {
        const receiver = cookies.net_id;
        console.log(`Accepted request with ID ${sender} ${course}` + receiver);
        const data = {
            sender,
            receiver,
            course,
        };
        fetch(`accept_request`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            
          })
            .catch(error => console.error(error));
            window.location.reload();
        }


    const handleReject = (sender, course) => {
        const receiver = cookies.net_id;
        console.log(`Accepted request with ID ${sender} ${course}` + receiver);
        const data = {
            sender,
            receiver,
            course,
        };
        fetch(`reject_request`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          })
            .catch(error => console.error(error));
            window.location.reload();
        }

    return(
        <>
        <Header/>
        <div className ="container">
            <div className="class-title">
            </div>
            <aside className="container_left">
             <div className="requests">  
             <h3 className="top-header"> Requests</h3>
            
            {receivedPending.length > 0 || sentPending.length > 0 ? (
                        <>
                            {receivedPending.length > 0 && receivedPending.map(request => (
                                <div className="request" key={request.id}>
                                    <div className="request-details">
                                        <p>{request[0]} {request[1]} </p>
                                        <button onClick={() => handleAccept(request[0], request[1])}>Accept</button>
                                        <button onClick={() => handleReject(request[0], request[1])}>Reject</button>
                                    </div>
                                </div>
                            ))}
                            <h3>Sent Requests</h3>
                            {sentPending.length > 0 && sentPending.map(request => (
                                <div className="request" key={request.id}>
                                    <div className="request-details">
                                        <p>{request[0]} {request[1]}</p>
                                        <p className="request-status">  Request Pending</p>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <p>No new requests</p>
                    )}
                </div> 
            </aside>
            <div className="container_top">
                <div className="accepted_requests">
                    <h3 className="top-header">Accepted Requests</h3>
                        {accepted.length > 0 ? 
                        accepted.map(accepted => (
                            <div className="accepted" key={accepted.id}>
                                <div className="request-details">
                                    <p>{accepted[0]} {accepted[2]}</p>
                                </div>
                            </div>
                        ))
                    :
                        <p>No accepted requests</p>
                    }
                </div>
            </div>
            <div className="container_bottom">
                <div className="rejected-requests">
                    <h3 className="top-header">Rejected Requests</h3>
                    {/* Render rejected requests similarly */}
                    {rejected.length > 0 ? 
                        rejected.map(rejected => (
                            <div className="accepted">
                                <div className="request-details">
                                    <p>{rejected[0]} {rejected[1]} {rejected[2]}</p>
                                </div>
                            </div>
                        ))
                    :
                        <p>No rejected requests</p>
                    }
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );

}
export default Request;
