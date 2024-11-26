import React from "react";
import Navbar from "./Components/NavBar";
import HomePage from "./Pages/HomePage";
import Nutrition from "./Pages/Nutrition";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Workout from "./Pages/Workout"

import { Container } from "reactstrap";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { UserContext, UserProvider } from "./Utils/UserContext";
import './App.css';

function App() {
  return (
    <Router>
      <UserProvider>
        <MainApp />
      </UserProvider>
    </Router>
  );
}

function MainApp() {
  const { currentUser: user } = React.useContext(UserContext);


  return (
    <>
      {user && <Navbar />}
      <Container className="mainContainer">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {user ? (
            <>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/nutrition" element={<Nutrition />} />
              <Route path="/workout" element={<Workout />} />
            </>
          ) : (
            <Route path="/*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </Container>
    </>
  );
}

export default App;
