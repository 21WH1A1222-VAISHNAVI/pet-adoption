import React, { useRef, useState, useEffect } from 'react';
import { Container, Nav, Button, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Blog from './Blog.jsx';
import Pets from './Pets.jsx';
import How from './How.jsx';
import "../styles/Blog.css";
import "../styles/How.css";
import Footer from './Footer.jsx';
import Logo from "../assets/Logo.png";

const Home = () => {
   const firstContainerRef = useRef(null);
   const howItWorksRef = useRef(null);
   const petsRef = useRef(null);
   const blogRef = useRef(null);
   const [activeSection, setActiveSection] = useState('');

   const scrollToSection = (ref, section) => {
      if (ref.current) {
         const topPosition = ref.current.getBoundingClientRect().top + window.scrollY;
         window.scrollTo({
            top: topPosition,
            behavior: 'smooth'
         });
         setActiveSection(section);
      }
   };

   // Listen to scroll events to determine active section
   useEffect(() => {
      const handleScroll = () => {
         const scrollPosition = window.scrollY;

         if (
            scrollPosition >= firstContainerRef.current.offsetTop &&
            scrollPosition < howItWorksRef.current.offsetTop
         ) {
            setActiveSection('Home');
         } else if (
            scrollPosition >= howItWorksRef.current.offsetTop &&
            scrollPosition < petsRef.current.offsetTop
         ) {
            setActiveSection('How it works');
         } else if (
            scrollPosition >= petsRef.current.offsetTop &&
            scrollPosition < blogRef.current.offsetTop
         ) {
            setActiveSection('Pets');
         } else if (scrollPosition >= blogRef.current.offsetTop) {
            setActiveSection('Blog');
         }
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   return (
      <>
         <Navbar expand="lg" fixed="top" style={{ backgroundColor: '#f6f6f6' }}>
            <Container fluid>
               <Navbar.Brand>
                  <img
                     src={Logo}
                     alt="Pet Adoption Logo"
                     width="150"
                     height="auto"
                     className="d-inline-block align-top"
                     style={{ marginLeft: '30px' }}
                  />
               </Navbar.Brand>
               <Navbar.Toggle aria-controls="navbarScroll" />
               <Navbar.Collapse id="navbarScroll">
                  <Nav className="navbar-nav" navbarScroll>
                     <Nav.Link onClick={() => scrollToSection(firstContainerRef, 'Home')} className={activeSection === 'Home' ? 'active' : ''}>Home</Nav.Link>
                     <Nav.Link onClick={() => scrollToSection(howItWorksRef, 'How it works')} className={activeSection === 'How it works' ? 'active' : ''}>How it works</Nav.Link>
                     <Nav.Link onClick={() => scrollToSection(petsRef, 'Pets')} className={activeSection === 'Pets' ? 'active' : ''}>Pets</Nav.Link>
                     <Nav.Link onClick={() => scrollToSection(blogRef, 'Blog')} className={activeSection === 'Blog' ? 'active' : ''}>Blog</Nav.Link>
                     <Link className="nav-link" to="/login">Login</Link>
                     <Link className="nav-link" to="/register">Register</Link>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>

         <div className='first-container' ref={firstContainerRef}>
            <div className="content-home">
               <h1 className="primary-heading">
                  You can make a difference in their lives
               </h1>
               <Link to={'/register'}>
                  <Button variant='dark' className='m-2' size='md'>
                     Explore Now
                  </Button>
               </Link>
            </div>
            <div className="paw-container">
               {/* Your paw prints and animation code */}
            </div>
         </div>

         <div className="second-container" ref={howItWorksRef}>
            <How />
         </div>

         <div className="third-container" ref={petsRef}>
            <Pets />
         </div>

         <div className="fourth-container" ref={blogRef}>
            <Blog />
         </div>

         <Footer />
      </>
   );
}

export default Home;
