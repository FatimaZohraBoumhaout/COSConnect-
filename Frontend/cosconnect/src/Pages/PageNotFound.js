import React from 'react';
import Header from '../Components/SignInHeader';

function PageNotFound() {
  const styles = `
  .not-found-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  
  .not-found-header {
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 16px;
  }
  
  .not-found-message {
    font-size: 24px;
    text-align: center;
    margin-bottom: 32px;
  }
  `;
  return (
    <>
    <Header/>
    <br/>
    <br/>
    <br/>
    <div className="not-found-container">
        <style>{styles}</style>
      <h1 className="not-found-header">Oops! 404 Page Not Found</h1>
      <p className="not-found-message">We're sorry, but the page you're looking for cannot be found.</p>
      <p><a href="/home">Go Back Home</a></p>
    </div>
    </>
  );
};

export default PageNotFound;
