import Navbar from "./Components/NavBar";
import HomePage from "./Pages/HomePage";
import Nutrition from "./Pages/Nutrition";
import GoalPage from "./Pages/GoalPage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ContactUs from './Pages/ContactUs';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import TermsOfService from './Pages/TermsOfService';

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
      <Container className="mainContainer">
        <Routes>
          {!user ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          ) : (
            <Route path="/*" element={<Navigate to="/" replace />} />
          )}
          {user ? (
            <>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/nutrition" element={<Nutrition />} />
              <Route path="/goals" element = {<GoalPage />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
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
