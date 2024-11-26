import React, { useState, useContext } from 'react';
import { UserContext } from '../Utils/UserContext';
import { loginAPI } from '../Api/Auth';
import { getUserAPI } from '../Api/User'
import { useNavigate } from 'react-router-dom';

function Login() {
    const { login } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await loginAPI(username, password);
            const user = await getUserAPI(username, token);
            if (!token) {
                setError('Invalid credentials. Please try again.');
                return;
            }

            login(token, user);

            console.log("Supposed to redirect you")
            navigate('/');
        } catch (err) {
            console.error('Login error:', err);
            setError('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <div className="form-container">
            <div className="form-box">
                <h2>Welcome to DropWeight</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="login-button">Login</button>
                </form>
                <div className="alternate-link">
                    Don't have an account? <a href="/register">Register here</a>
                </div>
            </div>
        </div>
    );
}

export default Login;
