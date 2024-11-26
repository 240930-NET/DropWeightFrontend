import React from 'react';
import { Container } from 'reactstrap';
import '../Styles/StaticPages.css';

function TermsOfService() {
  return (
    <div className="static-page">
      <Container>
        <h1>Terms of Service</h1>
        <div className="content-section">
          <p className="last-updated">Last Updated: March 15, 2024</p>

          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using DropWeight, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
          </section>

          <section>
            <h2>2. User Accounts</h2>
            <p>You are responsible for:</p>
            <ul>
              <li>Maintaining the confidentiality of your account</li>
              <li>All activities that occur under your account</li>
              <li>Providing accurate and current information</li>
            </ul>
          </section>

          <section>
            <h2>3. Service Rules</h2>
            <p>When using our service, you agree not to:</p>
            <ul>
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Share inappropriate or harmful content</li>
              <li>Attempt to gain unauthorized access</li>
            </ul>
          </section>

          <section>
            <h2>4. Termination</h2>
            <p>We reserve the right to terminate or suspend access to our service immediately, without prior notice, for any breach of these Terms.</p>
          </section>

          <section>
            <h2>5. Disclaimer</h2>
            <p>The service is provided "as is" without warranties of any kind, either express or implied.</p>
          </section>
        </div>
      </Container>
    </div>
  );
}

export default TermsOfService; 