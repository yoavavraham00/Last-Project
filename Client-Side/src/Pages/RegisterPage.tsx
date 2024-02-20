import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RegistrationSuccessMessage from '../Components/RegistrationMessage';
import './Style/RegistrationPage.css';

interface IUser {
    email: string;
    password: string;
    isBusiness: boolean;
    phone: string;
    first: string;
    middle?: string;
    last: string;
    country: string;
    city: string;
    street: string;
    state?: string;
    zip?: number;
    houseNumber: number;
    image: string;
}

const Register: React.FC = () => {
    const initialUserState: IUser ={
        email: '',
        password: '',
        isBusiness: false,
        phone: '',
        first: '',
        middle: '',
        last: '',
        country: '',
        city: '',
        street: '',
        state: '',
        zip: 0,
        houseNumber: 0,
        image: ''
    };


    const [user, setUser] = useState<IUser>(initialUserState);
    const [errors, setErrors] = useState<string[]>([]);
    const [isRegistered, setIsRegistered] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*-_*]{8,}$/;

    const validate = () => {
        const newErrors = [];
        if (!emailRegex.test(user.email)) {
            newErrors.push("Invalid email format.");
        }
        if (!passwordRegex.test(user.password)) {
            newErrors.push("Password must contain at least one uppercase letter, one lowercase letter, four numbers, one special character, and be at least 8 characters long.");
        }
        // ...any other validations...
        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) {
            console.error('Validation errors:', errors); // Log validation errors
            return; // Stop the form submission if validation fails
        }
        try {
            const response = await axios.post('http://localhost:3000/api/v1/users', {
            name: {
                first: user.first,
                middle: user.middle,
                last: user.last
            },
            phone: user.phone,
            email: user.email,
            password: user.password,
            address: {
                state: user.state,
                country: user.country,
                city: user.city,
                street: user.street,
                houseNumber: user.houseNumber,
                zip: user.zip,
            },
            isBusiness: user.isBusiness,
            image: {
                url:user.image,
                alt: ""
                    }
                });

                console.log('User registered:', response.data);
            setIsRegistered(true); // Set the registration status to true
            
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    console.error('Server responded with:', error.response.data); // Detailed error message from server
                } else {
                    console.error('Error submitting form:', error);
                }
            }
        };

    const handleReset = () => {
        setUser(initialUserState);
        setIsRegistered(false); // Reset the registration status
    };

    return (
        <div className="register-container">
            {isRegistered && (
                <div className="overlay">
                    <RegistrationSuccessMessage />
                    <button type="reset" className="cancel-button" onClick={handleReset}>Reset</button>
                </div>
            )}
        <div className={`register-form ${isRegistered ? 'blur-form' : ''}`}>
             {!isRegistered ? (
                <>
            <div className="register-form-header">
                <h2>Registration</h2>
            </div>
            <form onSubmit={handleSubmit}>
                {/* Name Fields */}
                <div className="form-row">
                    <div className="form-column">
                        <div className="form-group">
                            <label htmlFor="first">First Name</label>
                            <input type="text" name="first" value={user.first} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-column">
                        <div className="form-group">
                            <label htmlFor="middle">Middle Name</label>
                            <input type="text" name="middle" value={user.middle} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-column">
                        <div className="form-group">
                            <label htmlFor="last">Last Name</label>
                            <input type="text" name="last" value={user.last} onChange={handleChange} required />
                        </div>
                    </div>
                </div>
            <div className="form-row">
                <div className="form-column">
                    <div className="form-group">
                        <label htmlFor="country">Country</label>
                        <input type="text" name="country" value={user.country} onChange={handleChange} required />
                    </div>
                </div>
                <div className="form-column">
                    <div className="form-group">
                        <label htmlFor="state">State</label>
                        <input type="text" name="state" value={user.state} onChange={handleChange} />
                    </div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-column">
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input type="text" name="city" value={user.city} onChange={handleChange} required />
                    </div>
                </div>
                <div className="form-column">
                    <div className="form-group">
                        <label htmlFor="street">Street</label>
                        <input type="text" name="street" value={user.street} onChange={handleChange} required />
                    </div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-column">
                    <div className="form-group">
                        <label htmlFor="houseNumber">House Number</label>
                        <input type="number" name="houseNumber" value={user.houseNumber} onChange={handleChange} required />
                    </div>
                </div>
                <div className="form-column">
                    <div className="form-group">
                        <label htmlFor="zip">ZIP Code</label>
                        <input type="number" name="zip" value={user.zip} onChange={handleChange} />
                    </div>
                </div>
            </div>
                {/* Email and Phone */}
                <div className="form-row">
                    <div className="form-column">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" value={user.email} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-column">
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input type="tel" name="phone" value={user.phone} onChange={handleChange} required />
                        </div>
                    </div>
                </div>
                {/* Password Field */}
                <div className="form-row">
                    <div className="form-column">
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" value={user.password} onChange={handleChange} required />
                        </div>
                    </div>
                </div>
                {/* Optional Fields */}
                <div className="optional-fields">
                    <div className="form-row">
                        <div className="form-group checkbox">
                            <label htmlFor="isBusiness">Is Business Account</label>
                            <input type="checkbox" name="isBusiness" checked={user.isBusiness} onChange={handleChange} />
                        </div> 

                        <div className="form-group checkbox">
                            <label htmlFor="image">Image</label>
                            <input type="text" name="image" value={user.image} onChange={handleChange} />
                            <input type="text" name="alt image" value={user.image} onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <div className="buttons-row">
                    <button type="submit" className="submit-button" >Submit</button>
                    <button type="reset" className="refresh-button" onClick={handleReset}>Reset</button>
                </div>
            </form>
            </>
            ) : (
                <RegistrationSuccessMessage />
            )}
        </div>
        </div>
    );
};

export default Register;