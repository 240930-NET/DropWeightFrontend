import Navbar from "./Components/NavBar";
import HomePage from "./Pages/HomePage";
import Nutrition from "./Pages/Nutrition";
import GoalPage from "./Pages/GoalPage";

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
      <Navbar />
      <Container className="mainContainer">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/goals" element={<GoalPage />} />
        </Routes>
      </Container>
    </Router>
  )
}

export default App
