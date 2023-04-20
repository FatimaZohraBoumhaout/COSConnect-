import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css';
import UserProfileView from './Components/UserProfileView';
import Footer from './Components/Footer';
import UserSurvey from './Components/UserSurvey';
import SettingsView from "./Components/SettingsView";
import Home from "./Components/Home";
import ClassView from './Components/ClassView';
import PartnerProfileView from './Components/PartnerProfileView'
import EditView from './Components/EditView'
import SendRequestView from "./Components/SendRequestView";
<<<<<<< HEAD
import Header from './Components/Header';


function App() {
  return (
    <>
      <BrowserRouter>
        {window.location.pathname !== "/" && <Header />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/survey" element={<UserSurvey />} />
          <Route path="/profileview" element={<UserProfileView />} />
          <Route path="/edit" element={<EditView />} />
          <Route path="/classview" element={<ClassView />} />
          <Route path="/partnerview" element={<PartnerProfileView />} />
          <Route path="/sendrequest" element={<SendRequestView />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
=======
import Login from "./Components/SignIn";

function App() {
  return ( 
  <>
    <Header />
    <BrowserRouter>
    <Routes>
        <Route path="survey" element={<UserSurvey />} />
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="profileview" element={<UserProfileView />} />
        <Route path="edit" element={<EditView/>} />
        <Route path="classview" element={<ClassView/>}></Route>
        <Route path="partnerview" element={<PartnerProfileView />} />
        <Route path="sendrequest" element={<SendRequestView />} />

    </Routes>
    </BrowserRouter>
    <Footer /> 
   </>
>>>>>>> 7f070d381718608187e366645ab33594fc26b775
  );
}
export default App;
