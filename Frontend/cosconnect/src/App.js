import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import UserProfileView from './Components/UserProfileView';
import Footer from './Components/Footer';
import UserSurvey from './Components/UserSurvey';
import SettingsView from "./Components/SettingsView";
import Home from "./Components/Home";
import ClassView from './Components/ClassView';
import Signin from './Components/SignIn';
import PartnerProfileView from './Components/PartnerProfileView'
import EditView from './Components/EditView'
import SendRequestView from "./Components/SendRequestView";
import Header from './Components/Header';
import SignInHeader from './Components/SignInHeader';


function App() {
  const showHeader = window.location.pathname !== "/" && window.location.pathname !== "/survey";
  const showSignInHeader = window.location.pathname == "/"

  return (
    <>
      <BrowserRouter>
        {showHeader && <Header />}
        {showSignInHeader && <SignInHeader />}
        <Routes>
          <Route path="/" element={<Signin />} />
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
  );
}
export default App;
