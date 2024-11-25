import React, { useState } from "react";
import { Container, Button, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "../Styles/HomePage.css";
import dumbellImage from "../assets/Images/dumbell.jpg";
import nutrition from "../assets/Images/nutrition.jpeg";
import goals from "../assets/Images/goals.jpg";
import DropWeightLogo from "../assets/Images/DropWeightLogo.png";

function HomePage() {
    const navigate = useNavigate();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (event) => {
        const { clientX, clientY } = event;
        setMousePosition({
            x: (clientX - window.innerWidth / 2) / 50,
            y: (clientY - window.innerHeight / 2) / 50,
        });
    };

    return (
        <div
            className="home-page"
            onMouseMove={handleMouseMove}
            style={{
                backgroundPosition: `${50 + mousePosition.x}% ${50 + mousePosition.y}%`,
            }}
        >
            {/* Hero Section */}
            <div className="hero-section">
                <h1 className="hero-title">Welcome to DropWeight</h1>
                <p className="hero-subtitle">
                    Your ultimate platform for achieving your fitness goals with
                    personalized workouts, nutrition plans, and goal tracking.
                </p>
                <Button 
                    color="primary" 
                    size="lg" 
                    className="get-started-btn"
                    onClick={() => navigate("/register")}
                >
                    Get Started
                </Button>
            </div>

            {/* Main Sections */}
            <Container className="main-content">
                <Row className="feature-cards">
                    <Col md="4" className="feature-card">
                        <div className="card-content">
                            <img src={dumbellImage} alt="Workouts" className="feature-image" />
                            <h3>Workouts</h3>
                            <p>
                                Explore personalized workout plans designed to help
                                you reach your fitness goals.
                            </p>
                            <Button 
                                color="secondary" 
                                className="feature-btn"
                                onClick={() => navigate("/workouts")}
                            >
                                View Workouts
                            </Button>
                        </div>
                    </Col>

                    <Col md="4" className="feature-card">
                        <div className="card-content">
                            <img src={nutrition} alt="Nutrition" className="feature-image" />
                            <h3>Nutrition</h3>
                            <p>
                                Log meals to track nutrients and 
                                monitor your dietary habits with ease.
                            </p>
                            <Button 
                                color="secondary" 
                                className="feature-btn"
                                onClick={() => navigate("/nutrition")}
                            >
                                View Nutrition
                            </Button>
                        </div>
                    </Col>

                    <Col md="4" className="feature-card">
                        <div className="card-content">
                            <img src={goals} alt="Goals" className="feature-image" />
                            <h3>Goals</h3>
                            <p>
                                Set and track your fitness goals to measure progress
                                and stay motivated.
                            </p>
                            <Button 
                                color="secondary" 
                                className="feature-btn"
                                onClick={() => navigate("/goals")}
                            >
                                Set Goals
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>

            <footer className="home-footer">
                <p>&copy; 2024 DropWeight. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default HomePage;
