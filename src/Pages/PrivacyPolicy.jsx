import React from 'react';
import { Container } from 'reactstrap';
import '../Styles/StaticPages.css';

function PrivacyPolicy() {
  return (
    <div className="static-page">
      <Container>
        <h1>Privacy Policy</h1>
        <div className="content-section">
          <p className="last-updated">Last Updated: March 15, 2024</p>

          <section>
            <h2>1. Information We Collect</h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul>
              <li>Name and contact information</li>
              <li>Account credentials</li>
              <li>Profile information</li>
              <li>Fitness and health-related data</li>
              <li>Payment information</li>
            </ul>
          </section>

          <section>
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide and maintain our services</li>
              <li>Personalize your experience</li>
              <li>Process your transactions</li>
              <li>Send you updates and marketing communications</li>
              <li>Improve our services</li>
            </ul>
          </section>

          <section>
            <h2>3. Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
          </section>

          <section>
            <h2>4. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to data processing</li>
              <li>Data portability</li>
            </ul>
          </section>
        </div>
      </Container>
    </div>
  );
}

export default PrivacyPolicy; 