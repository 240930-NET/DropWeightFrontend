import { useState } from "react";
import "./RegisterPage.css";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    const payload = {
      Username: userName,
      Password: password,
      FirstName: firstName,
      LastName: lastName,
    };

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage("Account created successfully! Please log in.");
        setTimeout(() => {
          navigate("/login");
        }, 2000); 
      } else {
        const errorData = await response.json();
        setMessage(errorData || "Registration failed.");
      }
    } catch (error) {
      setMessage("Error: Unable to connect to the server.");
    }
  };

  return (
    <div className="register-page">
      <h2>Create an Account</h2>
      <form className="register-form" onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {message && <p className="error-message">{message}</p>}
    </div>
  );
};

export default RegisterPage;
