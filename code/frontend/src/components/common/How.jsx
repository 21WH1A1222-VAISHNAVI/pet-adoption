import React from "react";
import { Link } from "react-router-dom";
import HowBackground from "../assets/about-background.png";
import HowImage from "../assets/about-background-image.png";
import YourImage from "../assets/your-image.png";
import { BsFillPlayCircleFill } from "react-icons/bs";
import "../styles/How.css";

const How = () => {
  return (
    <div id="how" className="how-section-container">
      <div className="how-background-container">
        <img src={HowBackground} alt="How Background" />
      </div>
      <div className="how-section-image-container">
        <img src={HowImage} alt="How" />
      </div>
      <div className="how-section-text-container">
        <p className="primary-subheading"></p>
        <h1 className="primary-heading">
          How Adoption Works
        </h1>
        <img src={YourImage} alt="Your Image" className="your-image-class" />
        <Link to="/faq" className="how-buttons-container">
          <button className="primary-button">
            FAQ's
          </button>
        </Link>
      </div>
    </div>
  );
};

export default How;
