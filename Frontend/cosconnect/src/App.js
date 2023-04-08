import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import UserProfileView from './Components/UserProfileView';
import Header from './Components/Header';
import Footer from './Components/Footer';
import UserSurvey from './Components/UserSurvey';
import HomePageView from './Components/HomePageView';

function App() {
  return (
    <>
    <Header />
    {/* <BrowserRouter>
    <Routes>
        <Route path="/" element={<UserSurvey />} />
        <Route path="/profileview/:userId" element={<UserProfileView />} />
    </Routes>
    </BrowserRouter> */}
    <HomePageView />
    <Footer /> 
   </>
  );
}

export default App;
