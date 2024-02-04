import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./Login.css";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        setIsLoggingIn(true);
        try {
            const response = await axios.post('http://localhost:3000/api/v1/users/login', { email, password });
            localStorage.setItem('token', response.data.token);
            // Redirect user or handle logged in state
            setIsLoggingIn(false);
        } catch (err) {
            setIsLoggingIn(false);
            setError('Failed to log in');
            // Handle error more specifically if needed
        }
    };
    return (
        <div className="login-container">
            <div className="login-form">
            <Form onSubmit={handleLogin}>
                <Form.Floating className="mb-3">
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
                <Button variant="primary" type="submit" disabled={isLoggingIn}>
                    {isLoggingIn ? 'Logging in...' : 'Login'}
                </Button>
            </Form>
            </div>
        </div>
    );
};

export default LoginForm;