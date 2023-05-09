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
    <div className="not-found-container">
        <style>{styles}</style>
      <h1 className="not-found-header">Oops! 403 forbidden</h1>
      <p className="not-found-message">Access denied. You must be logged in to view this page</p>
      <p>Please <a href="/">Log in</a> to continue.</p> 
    </div>
    </>
  );
};

export default PageNotFound;
