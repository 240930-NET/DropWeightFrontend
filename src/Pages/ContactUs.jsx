import React from 'react';
import { Container } from 'reactstrap';
import '../Styles/StaticPages.css';

function ContactUs() {
  return (
    <div className="static-page">
      <Container>
        <h1>Contact Us</h1>
        <div className="content-section">
          <h2>Get in Touch</h2>
          <p>We're here to help and answer any question you might have.</p>
          
          <div className="contact-info">
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <h3>Email</h3>
              <p>support@dropweight.com</p>
            </div>
            
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
            
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <h3>Address</h3>
              <p>123 Fitness Street<br />Health City, HC 12345</p>
            </div>
          </div>

          <div className="support-hours">
            <h3>Support Hours</h3>
            <p>Monday - Friday: 9:00 AM - 6:00 PM EST<br />
            Saturday: 10:00 AM - 4:00 PM EST<br />
            Sunday: Closed</p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ContactUs; 