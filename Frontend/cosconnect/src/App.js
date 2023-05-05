import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import UserProfileView from './Pages/UserProfileView';
import Footer from './Components/Footer';
import UserSurvey from './Pages/UserSurvey';
import Home from "./Pages/Home";
import ClassView from './Pages/ClassView';
import Signin from './Pages/SignIn';
import PartnerProfileView from './Pages/PartnerProfileView'
import EditView from './Pages/EditView'
import SendRequestView from "./Pages/SendRequestView";
import Error from './Pages/Error';
import PageNotFound from './Pages/PageNotFound';
import Request from "./Pages/Request";
import About from "./Pages/About";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/survey" element={<UserSurvey />} />
          <Route path="/profileview" element={<UserProfileView />} />
          <Route path="/edit" element={<EditView />} />
          <Route path="/classview" element={<ClassView />} />
          <Route path="/partnerview" element={<PartnerProfileView />} />
          <Route path="/sendrequest" element={<SendRequestView />} />
          <Route path="/request" element={<Request />} />
          <Route path="/error" element={<Error />} />
          <Route path="/about-this" element={<About />} />
          <Route path="*" element={<PageNotFound />} /> 
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;