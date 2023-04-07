import React from "react";
import { BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import './App.css';
import UserProfileView from './Components/UserProfileView';
import Header from './Components/Header';
import Footer from './Components/Footer';
import UserSurvey from './Components/UserSurvey';

function Layout({ page }) {
  const location = useLocation();
  const showHeaderFooter = location.pathname.startsWith('/profileview');

  return (
    <>
      {showHeaderFooter && <Header />}
      {page}
      {showHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserSurvey />} />
        <Route path="/profileview/:userId" element={<UserProfileView />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;



