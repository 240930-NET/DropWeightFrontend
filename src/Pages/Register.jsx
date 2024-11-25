import React, { useState } from 'react';
import { registerAPI, loginAPI } from '../Api/Auth';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../Utils/UserContext";

function Register() {
    const { login } = React.useContext(UserContext);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await registerAPI(
                formData.username,
                formData.firstName,
                formData.lastName,
                formData.password
            );
            if (user) {
                const token = await loginAPI(formData.username, formData.password);
                if (token) {
                    login(token);
                    navigate('/dashboard');
                }
            } else {
                setError('Registration failed. Please try again.');
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Register for DropWeight</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Enter your first name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Enter your last name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="register-button">Register</button>
                </form>
                <div className="register-link">
                    Already have an account? <a href="/login">Login here</a>
                </div>
            </div>
        </div>
    );
}

export default Register;
