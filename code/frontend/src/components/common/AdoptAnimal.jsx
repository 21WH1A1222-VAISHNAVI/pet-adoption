import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from './AxiosInstance';
import { Button } from 'react-bootstrap';
import { message } from 'antd';
import '../styles/AdoptAnimal.css'; // Import your combined CSS file

// Importing images (replace with your actual image paths)
import BigImage from '../Assets/big-image.jpg';
import SmallImage1 from '../Assets/small-image1.jpg';
import SmallImage2 from '../Assets/small-image2.jpg';
import SmallImage3 from '../Assets/small-image3.jpg';

// Icons (replace with your actual icon imports)
import { FaMapMarkerAlt, FaPaw, FaCalendarAlt, FaVenusMars, FaPhone, FaEnvelope, FaClock, FaShareAlt, FaHeart } from 'react-icons/fa';

const AdoptAnimal = () => {
   const { animalId } = useParams();
   const navigate = useNavigate();

   const handleProceed = async () => {
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

   const [isShareClicked, setShareClicked] = React.useState(false);
   const [isHeartClicked, setHeartClicked] = React.useState(false);

   const handleShareClick = () => {
      setShareClicked(!isShareClicked);
   };

   const handleHeartClick = () => {
      setHeartClicked(!isHeartClicked);
   };

   return (
      <div className="adoption-confirmation-container">
         <div className="view-details-container">
            <div className="view-details-left">
               <div className="big-image">
                  <img src={BigImage} alt="Big" className="rounded-image" />
               </div>
               <div className="small-images">
                  <img src={SmallImage1} alt="Small 1" className="rounded-image" />
                  <img src={SmallImage2} alt="Small 2" className="rounded-image" />
                  <img src={SmallImage3} alt="Small 3" className="rounded-image" />
               </div>
            </div>
            <div className="view-details-right">
               <div className="dog-info">
                  <h1>Dog Name</h1>
               </div>
               <div className="about-dog">
                  <h2>About</h2>
                  <p>
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                     Nullam tempor nisl ac quam fermentum ullamcorper.
                     Vestibulum efficitur risus vitae eros congue, in vehicula felis tristique.
                  </p>
               </div>
               <div className="info-row">
                  <div className="info-item">
                     <FaMapMarkerAlt className="icon" />
                     <p className="info-text">Location Name</p>
                  </div>
                  <div className="info-item">
                     <FaPaw className="icon" />
                     <p className="info-text">Breed Name</p>
                  </div>
               </div>
               <div className="info-row">
                  <div className="info-item">
                     <FaCalendarAlt className="icon" />
                     <p className="info-text">Age</p>
                  </div>
                  <div className="info-item">
                     <FaVenusMars className="icon" />
                     <p className="info-text">Gender</p>
                  </div>
               </div>
               <div className="user-details">
                  <h2>User Details</h2>
                  <div className="user-detail">
                     <FaPhone className="icon" />
                     <p className="info-text">User Number</p>
                  </div>
                  <div className="user-detail">
                     <FaEnvelope className="icon" />
                     <p className="info-text">User Email</p>
                  </div>
                  <div className="user-detail">
                     <FaClock className="icon" />
                     <p className="info-text">Available Time</p>
                  </div>
               </div>
               <div className="actions">
                  <div className="action-item" onClick={handleShareClick}>
                     <FaShareAlt className={`icon ${isShareClicked ? 'clicked' : ''}`} />
                     <span className="info-text">Share</span>
                  </div>
                  <div className="action-item" onClick={handleHeartClick}>
                     <FaHeart className={`icon ${isHeartClicked ? 'clicked' : ''}`} />
                     <span className="info-text">
                        {isHeartClicked ? 'Added to Favorites' : 'Add to Favorites'}
                     </span>
                  </div>
               </div>
            </div>
         </div>
         <h2>Confirm Adoption</h2>
         <Button variant="primary" onClick={handleProceed}>Proceed</Button>
      </div>
   );
};

export default AdoptAnimal;
