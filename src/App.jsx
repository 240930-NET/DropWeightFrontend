import Navbar from "./Components/NavBar";
import HomePage from "./Pages/HomePage";
import Nutrition from "./Pages/Nutrition";
import GoalPage from "./Pages/GoalPage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

import React, { useContext } from "react";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { UserContext, UserProvider } from "./Utils/UserContext";
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
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
              <Route path="/goals" element = {<GoalPage />} />
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
