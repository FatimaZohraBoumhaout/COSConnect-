import React, { useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import "./About.css"
import "@fontsource/inter";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import image_search from "../Components/images/search.png" ;
import image_survey from "../Components/images/survey.png";
import survey_classes from "../Components/images/survey_class.png";
const body={
    backgroundColor:'#F6F6F2',
    backgroundSize:'cover',
}
const p={
    width: '65%'
}
function About(){
    return(
        <>
        <Header />
        <div style = {body}>
        <center>
            <div style={p}>
            <h2> At First Login </h2>
            <p> The following will walk you through the page.</p>
            <p> First, login using your Princeton email. </p>
            <br></br>
            <p> You will be directed to a survey page, where you will be asked to fill in your information. Please fill in all the blanks, and press submit when done. </p>
            <br></br><br></br>
            <img src={image_survey}/> <img src={survey_classes}/>
            <h2>Navigating Home</h2>
            <p> After filling in your information and the classes you are taking, you will be able to access your "home" page. This page lists all the classes you are taking. From here, you are able to access further functionalities for each class. </p>
            
            <br></br>
            <img src="../public/home.png"/>
            <p> Once you click on the class you wish to view, you will be able to see the following information:
                <ul>
                    <li>Other classes. </li>
                    <li>Other students taking the class willing to be viewed. </li>
                    <li>Your most recently viewed students. </li>
                </ul>
                At this point, you can access any other classes by clicking on those classes. Clicking on each class redirects you to that class. You can also view the public profiles for any other students in the class by clicking on the tab of those students. You can also directly send a notification to the students you so wish by clicking the "send" button for each student. If you do not see students you would like to send an invite to, make yourself visible to be searched by other students, such that students new to COSConnect or the class you are currently viewing can send invitations to you.
            </p>
            <img src="../public/classview.png"/>
            <br></br>
            <p> You can also manually enter the url to reach a class if you know what the class number is. </p>
            <p> Note that you can also search up a student if you have a person in mind and they are using COSConnect. You can search them by their netID, their name, or their availability.</p>
            <br></br>
            <img src={image_search}/>
            <p>Assuming that you clicked "send", the other person will receive an email like this:</p>
            <br></br>
            <img src="../Components/images/email_cosconnect.png"/>
            <br></br>
            <p> You can also send an invite by through the other student's public profile by the 
                "send" button, or you can go back to the previous page to view the class you were on.
            </p>
            <br></br>
            <p> Note that you can view your own profile. Furthermore, you can edit your information in your profile page, including what clases you are taking. The profile page can be accessed throught he header. </p>
            <br></br>
            <p> Through the header, you can also access the classes by pressing the "home" (as mentioned prevously), or log out from your princeton account. 
            You can view all your requests that you sent to other students, and requests that you received from other students, by pressing the "request" tab on the header.
            </p>
            <br></br>
            <p> When viewing your profile, you should expect it to look like this: </p>
            <br></br>
            <p> To edit, simply click "edit". To close without saving, click "close". To close with saving, click "save". At this stage, you will need to refill in your information if you click "save". </p>
            <br></br>
            <p> You can change a few settings in your profile view. The "talking to..." setting demonstrates whether or not you are talking to anyone. The "notifications" setting represents receiving emails from the COSConnect team notifying whether you have received a request or not. Change these at any time in the profile by toggling their respective buttons on and off.</p>
            <p>  </p>
            <br></br>
            <p> If you forget any of this information at any time, simply navigate to the "help" tab on the header to look at this page again.</p>
            </div>
        </center>
        </div>
        <Footer/>
        </>
    )
}
export default About;