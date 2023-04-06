import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import UserProfileView from './Components/UserProfileView';
import Header from './Components/Header';
import Footer from './Components/Footer';
import UserSurvey from './Components/UserSurvey';
import ClassView from './Components/ClassView';

function App() {
  return (
    <>
    <Header />
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<UserSurvey />} />
        <Route path="/profileview/:userId" element={<UserProfileView />} />
        <Route path="/classview/:userId" element={<ClassView/>}></Route>

    </Routes>
    </BrowserRouter>
    <Footer /> 
   </>
  );
}

export default App;
