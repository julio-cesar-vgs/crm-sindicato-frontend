import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router

const Card = ({ title, count, link }) => {
  return (
    <Link to={link} className="card-link"> {/* Use Link for internal navigation */}
      <div className="card">
        <h2>{title}</h2>
        <p>{count}</p>
      </div>
    </Link>
  );
};

export default Card;