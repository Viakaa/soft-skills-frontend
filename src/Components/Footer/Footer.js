import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="contact-card">
        <h3>Контактна інформація:</h3>
        <p>+380971259456</p>
        <p>email42453w@gmail.com</p>
        <p>Вул. Шевченка м.Нове Місто</p>
      </div>
      <div className="footer-links">
        <div className="footer-link">
          <div className="blue-square" />
          <a href="#">Про Нас</a>
        </div>
        <div className="footer-link">
          <div className="blue-square" />
          <a href="#">Умови користування</a>
        </div>
        <div className="footer-link">
          <div className="blue-square" />
          <a href="#">Політика</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
