import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import "../styles/FAQ.css";
import Logo from "../assets/Logo.png";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is the adoption process?",
      answer: "To adopt a pet, simply select the pet you are interested in and click on the 'Adopt' button. Then, wait for the owner to review and approve your request."
    },
    {
      question: "What are the requirements to adopt a pet?",
      answer: "Requirements typically include being at least 18 years old, having a stable living situation, and the ability to provide proper care for the pet."
    },
    {
      question: "How much does it cost to adopt a pet?",
      answer: "There is no fee. Our main motto is saving a life: adoption saves a life by providing a loving home for a pet who has been abandoned or mistreated."
    },
    {
      question: "What do I need to know about caring for a rabbit?",
      answer: "Rabbits need a balanced diet of hay, fresh vegetables, and pellets, as well as fresh water. They also need a safe, spacious living area and regular exercise."
    },
    {
      question: "Are the pets tested for diseases before adoption?",
      answer: "Yes, all pets are given a health check-up and tested by the owner for common diseases before being placed for adoption."
    },
    {
      question: "Can rabbits be kept outside?",
      answer: "While some rabbits can be kept outside, they should have a secure, weatherproof enclosure and be brought inside during extreme weather."
    },
    {
      question: "What are the basic care requirements for a cat?",
      answer: "Cats need a balanced diet, fresh water, regular veterinary check-ups, and a clean litter box. They also need mental and physical stimulation through play and interaction."
    },
    {
      question: "What types of pets are available for adoption on your website?",
      answer: "Our website offers a variety of pets for adoption, including dogs, cats and rabbits."
    },
    {
      question: "Are there any restrictions on adopting certain breeds or types of pets?",
      answer: "We do not discriminate based on breed or type of pet. However, some pets may have specific requirements or considerations for adoption."
    }// Add more FAQ items here
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" >
         <Container fluid>
            <Navbar.Brand>
               <img
                  src={Logo}
                  alt="Pet Adoption Logo"
                  width="150"
                  height="auto"
                  className="d-inline-block align-top"
               />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
               <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                  {/* Empty Nav for demonstration purposes */}
               </Nav>
               <Nav className="navbar-links">
                  <Link to={'/'} className="nav-link">Home</Link>
                  <Link to={'/login'} className="nav-link">Login</Link>
                  <Link to={'/register'} className="nav-link">Register</Link>
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
      <div className="faq-container">
        <h1>Frequently Asked Questions</h1>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">{faq.question}</div>
            {activeIndex === index && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </>
  );
}

export default FAQ;