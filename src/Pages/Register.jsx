import React, { useState } from 'react';
import { registerAPI, loginAPI } from '../Api/Auth';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../Utils/UserContext";
import styles from '../Styles/Register.module.css';
import DropWeightLogo from '../assets/DropWeightLogo.png';

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
            console.log(user)
            if (user) {
                const token = await loginAPI(formData.username, formData.password);
                if (token) {
                    login(token, user);
                    navigate('/');
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
        <div className={styles.registerWrapper}>
            <div className={styles.registerContainer}>
                <img src={DropWeightLogo} alt="DropWeight Logo" className={styles.logo} />
                <h2 className={styles.heading}>Register for DropWeight</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            required
                            className={styles.inputField}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Enter your first name"
                            required
                            className={styles.inputField}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Enter your last name"
                            required
                            className={styles.inputField}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                            className={styles.inputField}
                        />
                    </div>
                    {error && (
                        <div role="alert" className={styles.errorMessage}>
                            {error}
                        </div>
                    )}
                    <button type="submit" className={styles.registerButton}>Register</button>
                </form>
                <hr className={styles.divider} />
                <div className={styles.registerLink}>
                    Already have an account? <a href="/login" className={styles.loginLink}>Login here</a>
                </div>
            </div>
        </div>
    );
}

export default Register;
