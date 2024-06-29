import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/Logo.png";
import { BsTwitter, BsLinkedin, BsYoutube, BsFacebook } from "react-icons/bs";
import '../styles/Footer.css'; // Make sure to create this CSS file

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-section-one">
        <div className="footer-logo-container">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="footer-icons">
          <BsTwitter />
          <BsLinkedin />
          <BsYoutube />
          <BsFacebook />
        </div>
      </div>
      <div className="footer-section-two">
        <div className="footer-section-columns">
          <Link to="/register" className="footer-link">Adopt a Dog</Link>
          <Link to="/register" className="footer-link">Adopt a Cat</Link>
          <Link to="/register" className="footer-link">Adopt a Rabbit</Link>
        </div>
        <div className="footer-section-columns">
          <span>244-5333-7783</span>
          <span>hello@paw.com</span>
        </div>
        <div className="footer-section-columns">
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
