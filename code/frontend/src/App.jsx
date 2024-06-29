/*import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import './App1.css'

import Register from "./components/common/Register";
import Login from "./components/common/Login";
import Dashboard from "./components/common/Dashboard";
import Home from "./components/common/Home";
// import Gl from "./components/common/GoogleLogin";

export const UserContext = createContext();


function App() {
  const date = new Date().getFullYear();
  const [userData, setUserData] = useState();
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const getData = async () => {
    try {
      const user = await JSON.parse(localStorage.getItem("user"));
      if (user && user !== undefined) {
        setUserData(user);
        setUserLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, userLoggedIn }}>
      <div className="App">
        <Router>
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {userLoggedIn ? (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />

                </>
              ) : (
                <Route path="/login" element={<Login />} />
              )}
            </Routes>
          </div>
          <footer className="bg-light text-center text-lg-start">
            <div className="text-center p-3">
              © {date} Copyright: Adopt-a-Pet
            </div>
          </footer>
        </Router>
      </div>
    </UserContext.Provider>
  )
}

export default App

*/

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import './App1.css';
import FAQ from "./components/common/Faq";
import Register from "./components/common/Register";
import Login from "./components/common/Login";
import Dashboard from "./components/common/Dashboard";
import Home from "./components/common/Home";
import AllAnimals from "./components/common/AllAnimals";
import AdoptAnimal from "./components/common/AdoptAnimal";


export const UserContext = createContext();

function App() {
  const date = new Date().getFullYear();
  const [userData, setUserData] = useState();
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  // Fetch user data from local storage on app load
  const getData = async () => {
    try {
      const user = await JSON.parse(localStorage.getItem("user"));
      if (user && user !== undefined) {
        setUserData(user);
        setUserLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, userLoggedIn }}>
      <div className="App">
        <Router>
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/animals" element={<AllAnimals />} />
              <Route path="/adopt/:animalId" element={<AdoptAnimal />} />
              {userLoggedIn ? (
                <Route path="/dashboard" element={<Dashboard />} />
              ) : (
                <Route path="/login" element={<Login />} />
              )}
            </Routes>
          </div>
          <footer className="bg-light text-center text-lg-start">
            <div className="text-center p-3">
              © {date} Copyright: Paw
            </div>
          </footer>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
