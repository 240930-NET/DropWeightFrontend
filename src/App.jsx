import Navbar from "./Components/NavBar";
import HomePage from "./Pages/HomePage";
import Nutrition from "./Pages/Nutrition";
import GoalPage from "./Pages/GoalPage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
<<<<<<< HEAD
import Workout from "./Pages/Workout"
=======
import ContactUs from './Pages/ContactUs';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import TermsOfService from './Pages/TermsOfService';
>>>>>>> abf5a156648580b4e33ca09a5502b3d8f206f7be

import React, { useContext } from "react";
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
      <Container className="mainContainer" fluid>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />

          {/* Protected Routes */}
          {user ? (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/nutrition" element={<Nutrition />} />
<<<<<<< HEAD
              <Route path="/workout" element={<Workout />} />
              <Route path="/goal" element = {<GoalPage />} />
=======
              <Route path="/goals" element={<GoalPage />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
>>>>>>> abf5a156648580b4e33ca09a5502b3d8f206f7be
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </Container>
    </>
  );
}

export default App;
