import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import jwtDecode from 'jwt-decode';
import "./Login.css";

const LoginForm = ({ isLoggedIn, setIsLoggedIn, setIsBusiness }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    
    const getUserDetails = async (token) => {
        try {
            // Set the authorization header with the token
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await axios.get('http://localhost:3000/api/v1/users/me', config);
            setIsBusiness(response.data.isBusiness);
        } catch (err) {
            console.error('Error fetching user details:', err);
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        setEmail(''); // Clear the email field
        setPassword(''); // Clear the password field
        setError(''); // Reset any existing errors
        setShowSuccessMessage(false); // Hide success message if visible
        try {
            const response = await axios.post('http://localhost:3000/api/v1/users/login', { email, password });
            localStorage.setItem('token', response.data.token);
            setIsLoggedIn(true);
            await getUserDetails(response.data.token);
            setShowSuccessMessage(true);
        } catch (err) {
            setError('Failed to log in');
            console.error(err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from storage
        setIsLoggedIn(false); // Update the login state
        setIsBusiness(false); // Reset business state or any other related state
        setEmail(''); // Clear the email field
        setPassword(''); // Clear the password field
        setError(''); // Clear any errors
    };
    
    return (
        <div className={`login-container ${showSuccessMessage ? 'blur-active' : ''}`}>
            <div className={`login-form ${showSuccessMessage ? 'blur-active' : ''}`}>
                {!isLoggedIn ? (
                    !showSuccessMessage && (
                        <Form onSubmit={handleLogin}>
                            <Form.Floating >
                                <Form.Control
                                    id="floatingInputCustom"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <label htmlFor="floatingInputCustom">Email address</label>
                            </Form.Floating>
                            <Form.Floating>
                                <Form.Control
                                    id="floatingPasswordCustom"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <label htmlFor="floatingPasswordCustom">Password</label>
                            </Form.Floating>
                            {error && <div className="error-message">{error}</div>}
                            <Button variant="primary" type="submit">Login</Button>
                        </Form>
                    )
                ) : (
                    <Button variant="primary" onClick={handleLogout}>Logout</Button> // Show logout button when user is logged in
                )}
            </div>
            {showSuccessMessage && (
                <div className="message-overlay">
                    <div className="message-box">
                        <h3>Login Successful!</h3>
                        <p>You are now logged into the system.</p>
                        <button onClick={() => setShowSuccessMessage(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginForm;


