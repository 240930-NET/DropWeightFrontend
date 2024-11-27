import React, { useState, useContext } from 'react';
import { UserContext } from '../Utils/UserContext';
import { loginAPI } from '../Api/Auth';
import { getUserAPI } from '../Api/User';
import { useNavigate } from 'react-router-dom';
import DropWeightLogo from '../assets/DropWeightLogo.png';
import styles from '../Styles/Login.module.css';

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
            navigate('/');
        } catch (err) {
            console.error('Login error:', err);
            setError('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <div className={styles.loginWrapper}>
            <div className={styles.loginContainer}>
                <div className={styles.loginBox}>
                    <img src={DropWeightLogo} alt="DropWeight Logo" className={styles.loginLogo} />
                    <h2 className={styles.heading}>Welcome to DropWeight</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label htmlFor="username">Username</label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                aria-label="Username"
                                required
                                className={styles.inputField}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                aria-label="Password"
                                required
                                className={styles.inputField}
                            />
                        </div>
                        {error && (
                            <div role="alert" className={styles.errorMessage}>
                                {error}
                            </div>
                        )}
                        <button type="submit" className={styles.loginButton}>Sign In</button>
                    </form>
                    <hr className={styles.divider} />
                    <div className={styles.loginLink}>
                        <p>Don't have an account?</p>
                        <a href="/register" className={styles.registerLink}>Create one here!</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
