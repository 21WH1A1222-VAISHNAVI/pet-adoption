import React, { useContext } from 'react'
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { UserContext } from '../../App';
import { NavLink } from 'react-router-dom';

const NavBar = ({ setSelectedComponent }) => {

   const user = useContext(UserContext)

   if (!user) {
      return null
   }


   const handleut = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
   }
   const handleOptionClick = (component) => {
      setSelectedComponent(component);
   };

   return (
      <Navbar expand="lg" className="bg-body-tertiary">
         <Container fluid>
            <Navbar.Brand>
               <h3 style={{ color: 'black' }}>Adopt-a-Pet</h3>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
               <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                  <NavLink onClick={() => handleOptionClick('home')}>Home</NavLink>
                  <NavLink onClick={() => handleOptionClick('allanimals')}>Animals</NavLink>

                  {user.userData.type === 'admin' && (
                     <>
                        {/* <NavLink onClick={() => handleOptionClick('allquizes')}>Quizes</NavLink>
                        <NavLink onClick={() => handleOptionClick('allattendees')}>Attendees</NavLink> */}
                        <NavLink onClick={() => handleOptionClick('allrequest')}>Requests</NavLink>
                     </>
                  )}
                  {user.userData.type === 'user' && (
                     <>
                        {/* <NavLink onClick={() => handleOptionClick('attendedquiz')}>Attended Quiz</NavLink> */}
                     </>

                  )}
               </Nav>
               <Nav>
                  <h5 style={{ color: 'black' }} className='mx-3'>Hi {user.userData.name}</h5>
                  <Button onClick={handleut} size='sm' variant='outline-danger'>Log Out</Button >
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   )
}

export default NavBar

