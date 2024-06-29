import React, { useEffect, useState, useContext } from "react";
import axiosInstance from "./AxiosInstance";
import { Button } from "react-bootstrap";
import { message } from "antd";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import "../styles/AllAnimals.css"; // Import your new CSS file
import { FaPaw } from "react-icons/fa"; // Import paw icon for dogs
import { GiCat, GiRabbit } from "react-icons/gi"; // Import cat and rabbit icons
import { AiOutlineCalendar } from "react-icons/ai"; // Import calendar icon

const AllAnimals = () => {
  const user = useContext(UserContext);
  const [allAnimals, setAllAnimals] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [filterAge, setFilterAge] = useState("");
  const navigate = useNavigate();

  const fetchAllAnimals = async () => {
    try {
      const res = await axiosInstance.get(
        "http://localhost:8001/api/user/getallanimals"
      );
      if (res.data.success) {
        console.log("Fetched animals:", res.data.data); // Log the data to check species names
        setAllAnimals(res.data.data);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(allAnimals, " all animals ");
  useEffect(() => {
    fetchAllAnimals();
  }, []);

  const handleProceed = async (animalId) => {
    try {
      const res = await axiosInstance.post(`http://localhost:8001/api/user/adoptinganimal/${animalId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (res.data.success) {
        message.info('Request sent');
        navigate('/dashboard');  // Redirect to dashboard after successful request
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSpeciesIcon = (species) => {
    switch (species) {
      case "Dog":
        return <FaPaw className="dog-icon" />;
      case "Cat":
        return <GiCat className="dog-icon" />;
      case "Rabbit":
        return <GiRabbit className="dog-icon" />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="dogs-container">
        <div className="dogs-content">
          <h1 className="dogs-title">Find and Adopt</h1>
          <div className="filter-container">
            <p>Filter by Species:</p>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">All Animals</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Rabbit">Rabbit</option>
            </select>
            <p>Filter by Age:</p>
            <select
              value={filterAge}
              onChange={(e) => setFilterAge(e.target.value)}
            >
              <option value="">All Ages</option>
              <option value="0-1">0-1</option>
              <option value="1-3">1-3</option>
              <option value="3+">3+</option>
            </select>
          </div>
          <div className="dog-blocks">
            {allAnimals.length > 0 ? (
              allAnimals
                .filter(
                  (animal) =>
                    (filterType === "" || animal.species === filterType) &&
                    (filterAge === "" ||
                      (filterAge === "0-1" && animal.age <= 1) ||
                      (filterAge === "1-3" &&
                        animal.age > 1 &&
                        animal.age <= 3) ||
                      (filterAge === "3+" && animal.age > 3))
                )
                .map((animal) => {
                  console.log("animal", animal);
                  return (
                    <div className="dog-block" key={animal._id}>
                      <div className="dog-image-container">
                        {animal.photos && animal.photos.length > 0 ? (
                          <img
                            src={`http://localhost:8001${animal.photos[0].path}`}
                            alt={animal.name}
                            className="dog-image"
                          />
                        ) : (
                          <img
                            src="/path/to/placeholder/image.jpg"
                            alt="No Image Available"
                            className="dog-image"
                          /> // Placeholder image path
                        )}
                      </div>
                      <div className="dog-text-container">
                        <h2 className="dog-text-title">{animal.name}</h2>
                        <div className="dog-details">
                          <div className="dog-icon-container">
                            {getSpeciesIcon(animal.species)}
                            <p className="dog-species">{animal.species}</p>
                          </div>
                          <p className="dog-text-location">
                            <AiOutlineCalendar className="dog-icon" /> Age:{" "}
                            {animal.age}
                          </p>
                          <div className="adopt-button">
                            <Button
                              variant="primary"
                              className="custom-adopt-button"
                              onClick={() => handleProceed(animal._id)}
                            >
                              Confirm Adoption
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
            ) : (
              <p>No animals available at the moment</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllAnimals;
