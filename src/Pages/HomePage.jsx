import React, { useState } from "react";
import { Container, Button, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "../Styles/HomePage.css";
import fitnessBackground from "../assets/Images/Gym.png";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
// Import testimonials images
import testimonial2 from "../assets/Images/womantestimonial1.png";
import testimonial4 from "../assets/Images/womantestimonial2.png";
import testimonial3 from "../assets/Images/mantestimonial1.png";
import testimonial1 from "../assets/Images/mantestimonial2.png";


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

  // Carousel state and handlers
  const testimonials = [
    {
        src: testimonial1,
        altText: "Joey's Progress",
        caption: "Gained muscle and improved strength with DropWeight's structured programs!",
        author: "Joey Hampton",
        duration: "6 months transformation"
    },
    
    {
      src: testimonial2,
      altText: "Patricia's Transformation",
      caption: "Lost 20 pounds in 3 months following DropWeight's personalized workout plans!",
      author: "Patricia Robinson",
      duration: "3 months transformation"
    },
    
    {
      src: testimonial3,
      altText: "Mike's Journey",
      caption: "Completely transformed my lifestyle with DropWeight's nutrition tracking!",
      author: "Mike Johnson",
      duration: "4 months transformation"
    },
    {
      src: testimonial4,
      altText: "Sarah's Achievement",
      caption: "From beginner to fitness enthusiast with DropWeight's guidance!",
      author: "Sarah Williams",
      duration: "5 months transformation"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === testimonials.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const prevIndex =
      activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1;
    setActiveIndex(prevIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
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
        <h1 className="hero-title">Welcome to DropWeight</h1>
        <p className="hero-subtitle">
          Your ultimate platform for achieving your fitness goals with
          personalized workouts, nutrition plans, and goal tracking.
        </p>
      </div>

      {/* Main Content - Combined Features */}
      <Container className="main-content">
        <Row className="feature-cards">
          <Col md="4" className="feature-card">
            <div className="card-content">
              <i className="fas fa-dumbbell fa-3x feature-icon"></i>
              <h3>Workouts</h3>
              <p>
                Explore personalized workout plans designed to help you reach
                your fitness goals.
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
              <i className="fas fa-utensils fa-3x feature-icon"></i>
              <h3>Nutrition</h3>
              <p>
                Log meals to track nutrients and monitor your dietary habits
                with ease.
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
              <i className="fas fa-chart-line fa-3x feature-icon"></i>
              <h3>Goals</h3>
              <p>
                Set and track your fitness goals to measure progress and stay
                motivated.
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

      {/* Testimonials Section */}
      <Container className="testimonials-section">
        <h2 className="section-title">What Our Users Say</h2>
        <Carousel activeIndex={activeIndex} next={next} previous={previous}>
          <CarouselIndicators
            items={testimonials}
            activeIndex={activeIndex}
            onClickHandler={goToIndex}
          />
          {testimonials.map((item, index) => (
            <CarouselItem
              onExiting={() => setAnimating(true)}
              onExited={() => setAnimating(false)}
              key={index}
            >
              <div className="testimonial-content">
                <div className="testimonial-image-container">
                  <img
                    src={item.src}
                    alt={item.altText}
                    className="testimonial-image"
                  />
                  <span className="transformation-duration">{item.duration}</span>
                </div>
                <div className="testimonial-text">
                  <h3>{item.author}</h3>
                  <p>{item.caption}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={previous}
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={next}
          />
        </Carousel>
      </Container>

      {/* Footer */}
      <footer className="home-footer">
        <Container>
          <Row>
            <Col md="4">
              <h5>DropWeight</h5>
              <p>Your ultimate platform for achieving your fitness goals.</p>
            </Col>
            <Col md="2">
              <h6>Quick Links</h6>
              <ul className="footer-links">
                <li>
                  <a href="/workouts">Workouts</a>
                </li>
                <li>
                  <a href="/nutrition">Nutrition</a>
                </li>
                <li>
                  <a href="/goals">Goals</a>
                </li>
              </ul>
            </Col>
            <Col md="2">
              <h6>Resources</h6>
              <ul className="footer-links">
                <li>
                  <a href="/contact">Contact Us</a>
                </li>
                <li>
                  <a href="/privacy">Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms">Terms of Service</a>
                </li>
              </ul>
            </Col>
            <Col md="4" className="social-media">
              <h6>Follow Us</h6>
              <a href="https://www.facebook.com/people/DropWeight/61569038835691/">
                <i className="fab fa-facebook fa-2x"></i>
              </a>
              <a href="https://x.com/DropWeight2024">
                <i className="fab fa-twitter fa-2x"></i>
              </a>
              <a href="https://www.instagram.com/dropweight2024/">
                <i className="fab fa-instagram fa-2x"></i>
              </a>
            </Col>
          </Row>
          <hr />
          <p className="text-center">
            &copy; 2024 DropWeight. All rights reserved.
          </p>
        </Container>
      </footer>
    </div>
  );
}

export default HomePage;
