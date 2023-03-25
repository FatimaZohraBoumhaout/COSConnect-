import React from 'react';
import './Header.css';

function Header() {
  return (
    <nav className="header">
      <div className="header__logo">
        <h1>COSConnect</h1>
      </div>
      <div className="header__button">
        <button onClick={() => window.location.href = "/cosconnect/some-link"}>
          Button
        </button>
      </div>
    </nav>
  );
}

export default Header;
