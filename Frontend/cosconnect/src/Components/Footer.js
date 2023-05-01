import React from 'react';

const footerStyles = {
  padding: '1rem',
  textAlign: 'left',
  backgroundColor: '#BDD2B6', 
  color: '#F6F6F2',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  fontSize: '10px',
};

function Footer() {
  return (
    <footer style={footerStyles}>
      <h2>Designed and Created by: Zohra Boumhaout, Ankhitha Manjunatha, Pascal Nabare, Cynthia Or, Devansh Sharma
</h2>
    </footer>
  );
}

export default Footer;
