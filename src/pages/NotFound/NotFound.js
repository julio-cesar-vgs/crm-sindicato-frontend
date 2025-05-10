import React from 'react';

const NotFound = () => {
  const notFoundStyles = {
    textAlign: 'center',
    marginTop: '50px',
  };

  const headingStyles = {
    fontSize: '2em',
    color: '#333',
  };

  const textStyles = {
    fontSize: '1.2em',
    color: '#666',
  };

  return (
    <div style={notFoundStyles}>
      <h1 style={headingStyles}>Ops!</h1>
      <p style={textStyles}>A página que você está procurando não foi encontrada.</p>
      <p style={textStyles}>Por favor, verifique a URL.</p>
    </div>
  );
};

export default NotFound;