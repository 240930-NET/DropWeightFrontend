import React, { useState } from "react";
import { Container, Button, Row, Col } from "reactstrap";
import "../Styles/HomePage.css"; // Link to the external CSS file
import dumbellImage from "../assets/dumbell.jpg";
import nutrition from "../assets/nutrition.jpg";
import goals from "../assets/goals.jpg";

function HomePage() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (event) => {
        const { clientX, clientY } = event;
        setMousePosition({
            x: (clientX - window.innerWidth / 2) / 50, // Adjust sensitivity
            y: (clientY - window.innerHeight / 2) / 50,
        });
    };

    return (
        <div
            className="home-page"
            onMouseMove={handleMouseMove}
            style={{
                backgroundPosition: `${50 + mousePosition.x}% ${
                    50 + mousePosition.y
                }%`,
            }}
        >
            {/* Hero Section */}
            <div className="hero-section">
                <h1>Welcome to DropWeight</h1>
                <p>
                    Your ultimate platform for achieving your fitness goals with
                    personalized workouts, nutrition plans, and goal tracking.
                </p>
                <Button color="primary" size="lg">
                    Get Started
                </Button>
            </div>

            {/* Main Sections */}
            <Container className="main-content">
                <Row>
                    <Col md="4" className="text-center">
                        <img src={dumbellImage} alt="Workouts" />
                        <h3>Workouts</h3>
                        <p>
                            Explore personalized workout plans designed to help
                            you reach your fitness goals.
                        </p>
                        <Button color="secondary" size="sm">
                            View Workouts
                        </Button>
                    </Col>

                    <Col md="4" className="text-center">
                        <img
                            src={nutrition}
                            alt="Nutrition"
                        />
                        <h3>Nutrition</h3>
                        <p>
                            Access tailored nutrition plans and track your
                            dietary habits to stay on track.
                        </p>
                        <Button color="secondary" size="sm">
                            View Nutrition
                        </Button>
                    </Col>

                    <Col md="4" className="text-center">
                        <img
                            src={goals}
                            alt="Goals"
                        />
                        <h3>Goals</h3>
                        <p>
                            Set and track your fitness goals to measure progress
                            and stay motivated.
                        </p>
                        <Button color="secondary" size="sm">
                            Set Goals
                        </Button>
                    </Col>
                </Row>
            </Container>

            {/* Footer */}
            <footer>
                <p>&copy; 2024 DropWeight. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default HomePage;
