import Navbar from "./Components/NavBar";
import HomePage from "./Pages/HomePage";
import Nutrition from "./Pages/Nutrition";
import Login from './Pages/Login';
import Register from './Pages/Register';
import { UserContext, UserProvider } from './Utils/UserContext';

import React, { useContext } from "react";
import { Container } from "reactstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import './App.css'

function App() {
  const { user } = useContext(UserContext); 

  return (
    <Container>
      {user && (<Navbar />)}
      <Container className="mainContainer">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Protected routes */}
          <Route
                path="/"
                element={user ? <HomePage /> : <Navigate to="/login" replace />}
          />
          <Route
                path="/nutrition"
                element={user ? <Nutrition /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </Container>
    </Container>
  )
}

export default function AppWrapper() {
  return (
      <Router>
          <UserProvider>
              <App />
          </UserProvider>
      </Router>
  );
}
