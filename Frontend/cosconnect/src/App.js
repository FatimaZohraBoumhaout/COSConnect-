import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import UserProfileView from './Components/UserProfileView';
import Header from './Components/Header';
import Footer from './Components/Footer';
import UserSurvey from './Components/UserSurvey';

function App() {
  return (
    <>
    <Header />
    <BrowserRouter>
    <Routes>
        <Route path="/first-time-user" element={<UserSurvey />} />
        <Route index element={<UserProfileView />} />
    </Routes>
    </BrowserRouter>
    <Footer /> 
   </>
  );
}

export default App;
