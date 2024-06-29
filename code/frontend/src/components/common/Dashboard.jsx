import React, { useContext, useState } from 'react';
import NavBar from './NavBar';
import UserHome from "./UserHome"
import { Container } from 'react-bootstrap';
import AllAnimals from '../common/AllAnimals'
import UserPage from '../user/UserPage';

const Dashboard = () => {
   const [selectedComponent, setSelectedComponent] = useState('home');

   const renderSelectedComponent = () => {
      switch (selectedComponent) {
         case 'home':
            return <UserHome />
         case 'allanimals':
            return <AllAnimals />
         case 'allrequest':
            return <UserPage />
         // case 'allattendees':
         //    return <AllAttendees />
         default:
            return <UserHome />

      }
   };
   return (
      <>
         <NavBar setSelectedComponent={setSelectedComponent} />
         <Container className='my-3'>
            {renderSelectedComponent()}
         </Container>
      </>
   );
};

export default Dashboard;