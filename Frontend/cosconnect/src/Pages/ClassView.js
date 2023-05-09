import React, { useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import "./ClassView.css"
import "@fontsource/inter";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const toggleContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };


function ClassView(){
    const navigate = useNavigate();
    const [status, setStatus] = useState([]);
    const [cookies, setCookie] = useCookies(['net_id', 'partner_id', 'class_id']);
    const [classes, setClasses] = useState([]);
    const [sentRequest, setSentRequest] = useState([]);
    const [receivedRequest, setReceivedRequest] = useState([]);
    const [studentsId, setStudentsId] = useState([]);
    const [input, setInput] = useState('');
    const [availInput, setAvailInput] = useState('');
    const [renderStudents, setRenderStudents] = useState([]);
    const [fixed, setFixed] = useState([]);
    const [dispStatus, setDispStatus] = useState([]);
    
    const urlParams = new URLSearchParams(window.location.search);
    const this_class = urlParams.get('class')
    let output = []

    useEffect(() => {
        if (classes.length > 0){
            console.log("classes", classes[0][0])
            console.log("this class", this_class)
            if (!classes[0][0].includes(this_class)){
                navigate(`/notfound`);
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
                    <Link to={`/classview?class=${cl}`} onClick={() => window.location.replace(`/classview?class=${cl}`)} style={{ textDecoration: 'none', color: '#26272D'}}><center>{"COS " + cl}</center></Link>
                </div>
            );
        });
    }

    useEffect(() => {
        fetch(`/get_class_status?id=${cookies.net_id}&class=${this_class}`)
        .then(response => response.json())
        .then((data) => {
          setStatus(data);
          console.log("notifications set to:", data);
        })
        .catch(error => console.error(error));
      }, []);

    const handleStatusToggle = () => {
        const netId = cookies.net_id;
        setStatus((prevStatus) => (prevStatus === "Available" ? "Not Available" : "Available"));
        console.log(netId, this_class, status)
        const data = {netId, this_class, status};
        fetch(`/post_class_status`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
              console.log("Status changed")
            } else {
              console.log("Status change failed")
              alert("Cannot turn status on after accepting a partner")
              setStatus("Not Available")
            }
          })
          .catch(error => console.error(error));
      };

      useEffect(() => {
        if (status === "Available"){
          setDispStatus("Visible");
        }
        else{
          setDispStatus("Not Visible");
        }
      }, [status]);

    useEffect(() => {
         console.log("fixed from input set to be", fixed)
         if(fixed.length===0){
            return() => {<p>There are no other students in this class.</p>};
         }
         output = fixed.filter(element => ((element[1].toLowerCase()).includes(input.toLowerCase()) || (element[3].toLowerCase()).includes(input.toLocaleLowerCase()) ||
                                            (element[2].toLowerCase()).includes(input.toLowerCase())))
         output = output.map(element => element[0])
         //setFinalOutput(output)
         let studentsToRender = studentsId.map((st, index) =>{
            if (output.includes(index)){
            if(st[1].length > 30) {
                st[1] = st[1].slice(0, 20) + "..."
            }
            if(st[1].length + st[2].length > 50) {
                st[2] = st[2].slice(0, 50) + "..."
            }
            return (<div className="rectangle-right" id ="availableStudents">
                <Link to={`/partnerview`} onClick={() => handleClick(st[0])}>
                <div style={{float:'left'}}>
                    <center style={{ paddingLeft: '8px', fontSize: '18px', color: '#26272D'}}>{st[1]} <p style={{fontSize: '16px', backgroundColor: '#186100', padding: '5px', borderRadius: '20px', color: 'white', marginLeft:'5px'}}>NetID: {st[0]}</p><p style={{fontSize: '16px', backgroundColor: '#186100', padding: '5px', borderRadius: '20px', color: 'white', marginLeft:'5px'}}> Availability: {st[2]}</p></center>
                </div>
                </Link>
                <Link className="btn" onClick={() => sendRequest(st[0])} to={`/sendrequest`} style={{ textDecoration: 'none' }}>
                    <center >Send</center>
                </Link >
            </div>);
            }});
        setRenderStudents(studentsToRender);

        console.log("output set to be", output)
    }, [input, availInput, fixed]);
    
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

    function handleAvailChange(event){
        setAvailInput(event);
    }

    useEffect(() => {
        if(studentsId && studentsId.length > 0){
            console.log("StudentsId set to", studentsId)
            setFixed(studentsId.map((element, index) => [index, element[1], element[2], element[0]]))
            if(fixed.length===0){
                return() => {<p>There are no other students in this class.</p>};
            }
            console.log("fixed set to", fixed)
            output = fixed.map(element => element[0])

            let studentsToRender = studentsId.map((st, index) =>{
                if (output.includes(index)){
                return (<div className="rectangle-right" id="availableStudents">
                    <Link to={`/partnerview`} onClick={() => handleClick(st[0])}>
                    <div style={{float:'left'}}>
                        <center style={{ paddingLeft: '8px', fontSize: '18px', color: '#26272D'}}> {st[1]} <p style={{fontSize: '16px', color: '#F6F6F2'}}>NetID: {st[0]}, Availability: {st[2]}</p> </center>
                    </div>
                    </Link>
                    <Link className="btn" onClick={() => sendRequest(st[0])} to={`/sendrequest`} style={{ textDecoration: 'none' }}>
                        <center style={{ textDecoration: 'none' }}>Send</center>
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
                        {/* Starting Code for Below: https://codepen.io/pagedart/pen/VwvzEbx */}
                        <input placeholder="Search by Name, NetID, or Availability" onChange={event => handleChange(event.target.value)}/>
                        <button className="search-button" disabled={true}>
                        <svg viewBox="0 0 1024 1024"><path class="path1" d="M848.471 928l-263.059-263.059c-48.941 36.706-110.118 55.059-177.412 55.059-171.294 0-312-140.706-312-312s140.706-312 312-312c171.294 0 312 140.706 312 312 0 67.294-24.471 128.471-55.059 177.412l263.059 263.059-79.529 79.529zM189.623 408.078c0 121.364 97.091 218.455 218.455 218.455s218.455-97.091 218.455-218.455c0-121.364-103.159-218.455-218.455-218.455-121.364 0-218.455 97.091-218.455 218.455z"></path></svg>
                        </button>
                    </form>  
                    </center>
                    <h2 style={{fontSize: '30px'}}>{"COS " + this_class}</h2>
                </div>
                <div className="statusToggle">
                    <div style={toggleContainerStyle}>
                        <label>Want other students to send you partner requests? Allow yourself to be visible: </label>
                        <div style={{ marginLeft: "10px" }}>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    id="status-toggle"
                                    onChange={handleStatusToggle}
                                    checked={status === "Available"}
                                />
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <span style={{ marginLeft: "10px" }}>{dispStatus}</span>
                    </div>
                </div>
                    <br/>
                    <h3 style={{fontSize: '25px', color: '#26272D'}}>Requests</h3>
                    <h3 style={{fontSize: '16px', color: 'black'}}>Looking to Accept or Reject requests? Head over to the <a id="requestLink" href={`/request`}>Requests Page</a></h3>
                    {sentRequest && sentRequest.map((req) => (
                        <div className="rectangle-right" id="requestStudents">
                            <div style={{float:'left', backgroundColor:'#338888', height:'100%', width: '100px', color: 'white', borderRadius: '5px'}}>
                                <center>Sent</center>
                            </div>
                            <div style={{float:'left', marginLeft:'40%'}}><center>{req}</center></div>
                        </div>
                    ))}
                    {receivedRequest && receivedRequest.map((req, index) => (
                        <div className="rectangle-right" id="requestStudents">
                            <div style={{float:'left', backgroundColor: '#CCD5AE', height:'100%', width: '100px', borderRadius: '5px'}}>
                                <center>Received</center>
                            </div>
                            <div style={{float:'left', marginLeft:'40%'}}><center>{req}</center></div>
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
                    <h3 style={{fontSize: '25px', color: '#26272D'}}>Available Students</h3>
                    {studentsId && renderStudents}
                    {!studentsId &&
                        <center style={{marginBottom: '20px'}}>
                            <p>There are currently no students looking for a partner for this class. Try looking again later!</p>
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