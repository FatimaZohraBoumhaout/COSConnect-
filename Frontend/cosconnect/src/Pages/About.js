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
import classes from "../Components/images/classes.png";
import class_select from "../Components/images/home.png";
import classview from "../Components/images/classview.png";
import email from "../Components/images/email_cosconnect.png";
import partner from "../Components/images/partnerview.png";
import profile from "../Components/images/profileview.png";

const body={
    backgroundColor:'#F6F6F2',
    backgroundSize:'cover',
}
const p={
    width: '100%',
    color: '#338888',
}
function About(){
    return(
        <>
        <Header />
        <div style = {body}>
        <center>
            <div style={p}>
            <br/>
            <br/>
            <br/>
            <h2> At First Login </h2>
            <div class="about-group">
            <p class="about-content"> The following will walk you through the page.</p>
            <p class="about-content"> First, login using your Princeton email. </p>
            <br></br>
            <p class="about-content"> You will be directed to a survey page, where you will be asked to fill in your information. Please fill in all the blanks, and press submit when done. In the availability section, please make sure to put in the days of the week and times of the day that you are available.</p>
            </div>
            <br></br><br></br>
            <img src={image_survey} style={{width: '100%'}}/> <img src={survey_classes}/>
            <h2>Navigating Classes</h2>
            <div class="about-group">
            <p class="about-content"> After filling in your information and the classes you are taking, you will be able to access your "classes" page. This page lists all the classes you are taking. From here, you are able to access further functionalities for each class. </p>
            </div>
            <br></br><br></br>
            <img src={classes}/>  
            <br></br>
            <img src={class_select}/>
            <h2>Navigating Class View </h2>
            <div class="about-group">
            <p class="about-content"> Once you click on the class you wish to view, you will be able to see the following information:
            Other classes, Other students taking the class willing to be viewed, and Your most recently viewed students.
            At this point, you can access any other classes by clicking on those classes. Clicking on each class redirects you to that class. You can also view the public profiles for any other students in the class by clicking on the tab of those students. You can also directly send a notification to the students you so wish by clicking the "send" button for each student. If you do not see students you would like to send an invite to, make yourself visible to be searched by other students, such that students new to COSConnect or the class you are currently viewing can send invitations to you.
            </p></div>
            <br></br><br></br>
            <img src={classview}/>
            <div class="about-group">
            <p class="about-content"> You can also manually enter the url to reach a class if you know what the class number is. </p>
            <p class="about-content"> Note that you can also search up a student if you have a person in mind and they are using COSConnect. You can search them by their netID, their name, or their availability.</p>
            </div>
            <br></br><br></br>
            <img src={image_search}/>
            <div class="about-group">
            <p class="about-content">Assuming that you clicked "send", the other person will receive an email like this:</p>
            </div>
            <br></br>
            <img src={email}/>
            <br></br>
            <div class="about-group">
            <p class="about-content"> You can also send an invite by through the other student's public profile by the 
                "send request" button, or you can go back to the previous page to view the class you were on.
            </p></div>
            <br/>
            <img src={partner}/>
            <br></br>
            <h2>Navigating Profile</h2>
            <div class="about-group">
            <p class="about-content"> Note that you can view your own profile. Furthermore, you can edit your information in your profile page, including what clases you are taking. The profile page can be accessed through the header. You can change a few settings in your profile view. 
            The "notifications" setting represents receiving emails from the COSConnect team notifying whether you have received a request or not. Change this at any time in the profile by toggling the button on and off.
            </p></div>
            <br></br>
            <img src={profile}/>
            <div class="about-group">
            <p class="about-content"> Through the header, you can also access the classes by pressing the "Classes" (as mentioned prevously), or log out from your princeton account. 
            You can view all your requests that you sent to other students, and requests that you received from other students, by pressing the "requests" tab on the header.
            </p>
            <br/><br/>
            <p class="about-content"> When viewing your sent and received quests, you should expect it to look like this: </p>
            <br></br>
            <p class="about-content"> To edit, simply click "edit". To close without saving, click "close" in the mall. To close with saving, click "save". At this stage, you will need to refill in your information if you click "save". </p>
            <br></br>
            <p>  </p>
            <br></br>
            <p class="about-content"> If you forget any of this information at any time, simply navigate to the "help" tab on the header to look at this page again.</p>
            <br/> <br/><br/>
            </div>
            </div>
        </center>
        </div>
        <Footer/>
        </>
    )
}
export default About;