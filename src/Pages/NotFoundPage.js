import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';
const NotFoundPage = () => {
  return (
    <div className='page404' style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 id='notfound_text'>404 - Page Not Found</h1>
      <Link to="/">Go to Main</Link>
    </div>
  );
};

export default NotFoundPage;
