import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "@fontsource/inter";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./Request.css";

function Request(){
    const [requests, setRequests] = useState([]);
    const [cookies] = useCookies(['net_id']);
    const navigate = useNavigate();

    useEffect(() => {
        if(cookies.net_id != null){
            console.log("net_id: " + cookies.net_id);
            fetch(`get_request?id=${cookies.net_id}`)
            .then (response => response.json())
            .then(data => {
                setRequests(data);
                console.log("requests: "+data);
            })
            .catch((error) => {
                console.log(error);
            });
        }else{
            console.log("net_id is null");
        }
    }, [cookies.net_id]);

    const handleAccept = (requestId) => {
        // Handle accept button click for a request with ID `requestId`
        console.log(`Accepted request with ID ${requestId}`);
    }

    const handleReject = (requestId) => {
        // Handle reject button click for a request with ID `requestId`
        console.log(`Rejected request with ID ${requestId}`);
    }

    return(
        <>
        <Header/>
        <div className ="container">
            <div className="class-title">
                Pascal is a bitch 
            </div>
            <aside className="container_left">
            </aside>
            <div className="container_top">
                <div className="new_requests">
                    <h3 className="top-header">New Requests</h3>
                    {requests.length > 0 ? 
                        requests.map(request => (
                            <div className="request" key={request.id}>
                                <div className="request-details">
                                    <p>{request}</p>
                                    <button onClick={() => handleAccept(request.id)}>Accept</button>
                                    <button onClick={() => handleReject(request.id)}>Reject</button>
                                </div>
                            </div>
                        ))
                    :
                        <p>No new requests</p>
                    }
                </div>
            </div>
            <div className="container_bottom">
                <div className="rejected-requests">
                    <h3 className="top-header">Accepted Requests</h3>
                    {/* Render rejected requests similarly */}
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );

}
export default Request;
