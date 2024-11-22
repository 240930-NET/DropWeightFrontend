import Navbar from "./Components/NavBar";
import HomePage from "./Pages/HomePage";
import Nutrition from "./Pages/Nutrition";
import CalendarPage from "./Pages/CalendarPage";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { UserProvider } from "./Utils/UserContext";
import { Container } from "reactstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import './App.css'

function App() {

  return (  

      <Router>
        <UserProvider>
        <Navbar />
          <Container className="mainContainer">
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/nutrition" element={<Nutrition />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/register" element={<Register />} /> 
              <Route path="/login" element={<Login />} />       
            </Routes>
          </Container>
        </UserProvider>
      </Router>

  )
}

export default App
