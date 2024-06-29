import React, { useState } from "react";
import ProfilePic1 from "../Assets/mark.png";
import ProfilePic2 from "../Assets/lucky.png";
import ProfilePic3 from "../Assets/pinky.png";
import ProfilePic4 from "../Assets/maggie.png";

import { AiFillStar } from "react-icons/ai";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../styles/Blog.css"; // Import the Blog specific CSS file

const Blog = () => {
  const blogs = [
    {
      img: ProfilePic1,
      text: (
        <div>
          <p>Prepare your Home</p>
          <p>Before adopting make sure your home is pet friendly</p>
          <p>With all necessary supplies.</p>
        </div>
      ),
      author: "Mark"
    },
    {
      img: ProfilePic2,
      text: (
        <div>
          <p>Meet and Greet</p>
          <p>Spend time with potential pets to understand their </p>
          <p>temperament and needs</p>
        </div>
      ),
      author: "Lucky"
    },
    {
      img: ProfilePic3,
      text: (
        <div>
          <p>Vet check</p>
          <p>Schedule a vet apointment soon after adoption</p>
          <p>to ensure your new pet is healthy</p>
        </div>
      ),
      author: "Pinky"
    },
    {
      img: ProfilePic4,
      text: (
        <div>
          <p>Training basics</p>
          <p>Start basic training early to establish</p>
          <p>good behaviour and bonding</p>
        </div>
      ),
      author: "Maggie"
    }
  ];

  const [scrollIndex, setScrollIndex] = useState(0);

  const handleNext = () => {
    if (scrollIndex < blogs.length - 2) {
      setScrollIndex(scrollIndex + 1);
    }
  };

  const handlePrev = () => {
    if (scrollIndex > 0) {
      setScrollIndex(scrollIndex - 1);
    }
  };

  return (
    <div id="blog" className="work-section-wrapper blog-section-wrapper">
      <div className="work-section-top">
        <h1 className="primary-heading">Latest Tips and News</h1>
      </div>
      
      <div className="blogs-container" style={{ transform: `translateX(-${scrollIndex * 51}%)` }}>
        {blogs.map((blog, index) => (
          <div className="blog-section" key={index}>
            <img src={blog.img} alt={blog.author} />
            <div className="blog-text">
              <p>{blog.text}</p> {/* Changed to display text as paragraph */}
            </div>
            <div className="blogs-stars-container">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
            </div>
            <h2>{blog.author}</h2>
          </div>
        ))}
      </div>

      <button className={`nav-button nav-button-left ${scrollIndex === 0 ? 'inactive' : ''}`} onClick={handlePrev}>
        <FaChevronLeft />
      </button>
      <button className={`nav-button nav-button-right ${scrollIndex === blogs.length - 2 ? 'inactive' : ''}`} onClick={handleNext}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Blog;
