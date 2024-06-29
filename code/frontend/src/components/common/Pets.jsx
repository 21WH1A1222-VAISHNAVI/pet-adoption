import React from "react";
import { NavLink } from "react-router-dom";
import DogImage from "../assets/Dog.png";
import CatImage from "../assets/Cat.png";
import RabbitImage from "../assets/Rabbit.png";
import "../styles/Pets.css";

const PetsSection = () => {
  return (
    <div className="pets-section-wrapper">
      <div className="pets-section-top">
        <h1 className="Pets-heading">Pets</h1>
      </div>
      <div className="pets-section-bottom">
        <NavLink to="/register" className="pets-section-info">
          <div className="info-boxes-img-container">
            <img src={DogImage} alt="Pet 1" />
          </div>
          <h2>Dogs</h2>
          <p>Browse cute Dogs and puppies from our network.</p>
        </NavLink>
        <NavLink to="/register" className="pets-section-info">
          <div className="info-boxes-img-container">
            <img src={CatImage} alt="Pet 2" />
          </div>
          <h2>Cats</h2>
          <p>Browse cute Cats and Kittens from our network.</p>
        </NavLink>
        <NavLink to="/register" className="pets-section-info">
          <div className="info-boxes-img-container">
            <img src={RabbitImage} alt="Pet 3" />
          </div>
          <h2>Rabbits</h2>
          <p>Browse cute Rabbits and Kittens from our network.</p>
        </NavLink>
      </div>
    </div>
  );
};

export default PetsSection;
