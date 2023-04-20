import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

function Header() {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['net_id']);

  function handleDropdownClick() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  function handleLogOut() {
    removeCookie('net_id');
  }

  const styles = `
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #65B3B8;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .header__logo {
    text-align: center;
    color: #F6F6F2;
    margin-left: 10%;
  }
  
  .header__logo h1 {
    margin: 0;
    font-size: 1.5rem;
  }
  
  .header__button {
    display: flex;
    align-items: center;
    margin-right: 3%;
  }
  
  .header__button a {
    display: inline-block;
    margin-right: 1rem;
    padding: 0.5rem 1rem;
    color: #F6F6F2;
    font-size: 1rem;
    text-decoration: none;
    position: relative; /* add this for positioning */
  }
  
  .header__button a:last-child {
    margin-right: 0;
  }
  
  .header__button a:hover {
    color: black;
    background-color: #BADFE7;
  }

  .header__button-divider {
    height: 2rem;
    width: 1px;
    background-color: #C2EDCE;
    margin: 0 1rem;
  }
  
  .header__button a:last-child::after { 
    content: '';
    position: absolute;
    top: 50%;
    right: -10px; 
    transform: translateY(-50%) rotate(90deg);
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 10px solid #F6F6F2;
  }
  
  /* Responsive styles */
  
  @media screen and (max-width: 768px) {
    .header__logo {
      margin-left: 5%;
    }
    
    .header__button {
      margin-right: 5%;
    }
    
    .header__button a {
      font-size: 0.9rem;
    }
    
    .header__button-divider {
      margin: 0 0.5rem;
    }
  }
  /* Dropdown button styles */
  .header__dropdown-button {
    display: none; /* hide the dropdown button by default */
  }

  @media screen and (max-width: 576px) {
    .header__dropdown-button {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    .hidd {
      display: none !important;
    }
  }

  .header__dropdown-icon {
    font-size: 1.5rem;
  }

  /* Links dropdown styles */
  .header__links {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #338888;
    margin-top: 0.5rem;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease-out;
  }

  .header__links.open {
    max-height: 100vh;
    transition: max-height 0.3s ease-in;
  }

  .header__links a {
    display: block;
    padding: 0.5rem;
    color: #F6F6F2;
    text-decoration: none;
    transition: background-color 0.2s ease-out;
  }

  .header__links a:hover {
    background-color: #C2EDCE;
  }

  `;

  return (
    <nav className="header">
      <style>{styles}</style>
      <div className="header__logo">
        <h1>COSConnect</h1>
      </div>
      <div className="header__button">
        { /* Render the dropdown button on small screens */ }
        <div className="header__dropdown-button" onClick={handleDropdownClick}>
          <span className="header__dropdown-icon">{isDropdownOpen ? 'x' : '☰'}</span>
        </div>

        { /* Render the links as a dropdown on small screens */ }
        <div className={`header__links ${isDropdownOpen ? 'open' : ''}`}>
          <a href="home">Home</a>
          <a href="profileview">Profile</a>
          <a href="classview">Classes</a>
        </div>

        { /* Render the links as individual items on large screens */ }
        <a className="hidd" href="/" onClick={handleLogOut}>Log Out</a>
        <div className="header__button-divider hidd"></div>
        <a className="hidd" href="home">Home</a>
        <div className="header__button-divider hidd"></div>
        <a className="hidd" href="profileview">Profile</a>
        <div className="header__button-divider hidd"></div>
        <a className="hidd" href="classview">Classes</a>

      </div>
    </nav>
  );
}

export default Header;
