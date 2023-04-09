import React from "react";
import { BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import './App.css';
import UserProfileView from './Components/UserProfileView';
import Header from './Components/Header';
import Footer from './Components/Footer';
import UserSurvey from './Components/UserSurvey';
import SettingsView from "./Components/SettingsView";
import Home from "./Components/Home";
import ClassView from './Components/ClassView';
import Login from './Components/Login';
import PartnerProfileView from './Components/PartnerProfileView'
import EditView from './Components/EditView'


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
        <Route path="login" element={<Login />} />
        <Route path="partnerview" element={<PartnerProfileView />} />
    </Routes>
    </BrowserRouter>
    <Footer /> 
   </>
  );
}
export default App;



