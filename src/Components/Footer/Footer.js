import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="contact-card">
        <h3>Контактна інформація:</h3>
        <p>Антоніна Палецька-Юкало 
Керівниця Школи Soft Skills 
paletska-yukalo_a@itstep.org
</p>
        <p>
Юлія Балебрух <br></br> Психолог ІТ СТЕП Університету 
ubalebruh@gmail.com</p>
        <p>Уляна Войтович  <br></br>  
Менеджер проекту
tyg84085@gmail.com</p>
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
