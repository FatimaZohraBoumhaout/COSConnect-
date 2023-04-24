import React, { useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import "./ClassView.css"
import "@fontsource/inter";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function ClassView(){
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['net_id', 'partner_id', 'class_id']);
    const [classes, setClasses] = useState([]);
    const [sentRequest, setSentRequest] = useState([]);
    const [receivedRequest, setReceivedRequest] = useState([]);
    const [studentsId, setStudentsId] = useState([]);
    const [input, setInput] = useState('');
    //const [finaloutput, setFinalOutput] = useState([]);
    const [renderStudents, setRenderStudents] = useState([]);
    const [fixed, setFixed] = useState([]);
    
    const this_class = window.location.search.match(/class=([^&]*)/)[1].replace('%20',' ');
    let output = []
    //let fixed = []
    //let renderStudents = null;

    useEffect(() => {
        if (classes.length > 0){
            console.log("classes", classes[0][0])
            console.log("this class", this_class)
            if (!classes[0][0].includes(this_class)){
                navigate(`/home`);
            }
        }
    }, [classes]);

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

      useEffect(() => {
        if (cookies.net_id !== null) {
            fetch(`/get_students_info?id=${cookies.net_id}&class=${this_class}`)
            .then(response=> response.json())
            .then(data => {
                setStudentsId(data);
                console.log("StudentsId set to", studentsId);
            })
            .catch(error => console.log(error));
          } else {
            console.log("net_id is null");
          }
      }, [cookies.net_id]);

    let renderClasses = null;
    if(classes.length > 0){
        renderClasses = classes[0][0] && classes[0][0].map((cl) => {
            return(
                <div className="rectangle-left">
                    <Link to={`/classview?class=${cl}`} onClick={() => window.location.replace(`/classview?class=${cl}`)}><center>{cl}</center></Link>
                </div>
            );
        });
    }

    useEffect(() => {
         output = fixed.filter(element => element[1].includes(input))
         console.log("fixed from input set to be", fixed)
         output = output.map(element => element[0])
         //setFinalOutput(output)
         let studentsToRender = studentsId.map((st, index) =>{
            if (output.includes(index)){
            return (<div className="rectangle-right">
                <Link to={`/partnerview`} onClick={() => handleClick(st[0])}>
                <div style={{float:'left'}}>
                    <center>NetId: {st[0]} <p>Display Name: {st[1]}, Availability: {st[2]}</p></center>
                </div>
                </Link>
                <Link className="btn" onClick={() => sendRequest(st[0])} to={`/sendrequest`}>
                    <center>Send</center>
                </Link>
            </div>);
            }});
        setRenderStudents(studentsToRender);

        console.log("output set to be", output)
    }, [input, fixed]);
    
    function sendRequest(st) {
        setCookie('class_id', this_class)
        setCookie('partner_id', st);
    }
    function handleClick(st) {
        setCookie('class_id', this_class)
        console.log("classid cookie set to"+ cookies.class_id);
        setCookie('partner_id', st);
        console.log("partenr cookie set to"+ cookies.partner_id);
    }

    function handleChange(event){
        //setData()
        console.log(event)
        setInput(event)
    }

    useEffect(() => {
        if(studentsId && studentsId.length > 0){
            console.log("StudentsId set to", studentsId)
            setFixed(studentsId.map((element, index) => [index, element[1]]))
            console.log("fixed set to", fixed)
            output = fixed.map(element => element[0])

            let studentsToRender = studentsId.map((st, index) =>{
                if (output.includes(index)){
                return (<div className="rectangle-right">
                    <Link to={`/partnerview`} onClick={() => handleClick(st[0])}>
                    <div style={{float:'left'}}>
                        <center>NetId: {st[0]} <p>Display Name: {st[1]}, Availability: {st[2]}</p></center>
                    </div>
                    </Link>
                    <Link className="btn" onClick={() => sendRequest(st[0])} to={`/sendrequest`}>
                        <center>Send</center>
                    </Link>
                </div>);
                }});
            setRenderStudents(studentsToRender);
        }
      }, [studentsId]);

    return(
        <>
        <Header />
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
                        <input placeholder="Search..." onChange={event => handleChange(event.target.value)}/>
                        <button className="search-button" disabled={true}>
                        <svg viewBox="0 0 1024 1024"><path class="path1" d="M848.471 928l-263.059-263.059c-48.941 36.706-110.118 55.059-177.412 55.059-171.294 0-312-140.706-312-312s140.706-312 312-312c171.294 0 312 140.706 312 312 0 67.294-24.471 128.471-55.059 177.412l263.059 263.059-79.529 79.529zM189.623 408.078c0 121.364 97.091 218.455 218.455 218.455s218.455-97.091 218.455-218.455c0-121.364-103.159-218.455-218.455-218.455-121.364 0-218.455 97.091-218.455 218.455z"></path></svg>
                        </button>
                    </form>  
                    </center>
                    <h2>{this_class}</h2>
                </div>
                    <h3>Invitations</h3>
                    {sentRequest && sentRequest.map((req) => (
                        <div className="rectangle-right">
                            <center>{req}</center>
                            <div style={{float:'right'}}>Sent</div>
                        </div>
                    ))}
                    {receivedRequest && receivedRequest.map((req, index) => (
                        <div className="rectangle-left">
                            {req}
                            <div style={{float:'right'}}>Sent</div>
                        </div>
                    ))}
                    {sentRequest.length === 0 && receivedRequest.length === 0 &&
                        <center>
                            <p>Send some requests to get started.</p>
                        </center>
                    }
                </div>
                {/* <div className="received">
                    <h3 className="left-header">Invitations Received</h3>
                    {receivedRequest && receivedRequest.map((req, index) => (
                        <div className="rectangle-left">{req}</div>
                    ))}
                    {receivedRequest.length === 0 && 
                        <center>
                            <p>You have received no requests!</p>
                        </center>
                    }
                </div> */}
                <div className="students">
                    <h3>Students</h3>
                    {studentsId && renderStudents}
                    {!studentsId &&
                        <center>
                            <p>Send some requests to get started.</p>
                        </center>
                    }
                    
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}
export default ClassView;