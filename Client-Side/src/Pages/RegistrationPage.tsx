import React, { useState } from 'react';
import './RegistrationPage.css';

interface IUser {
    first: string;
    middle?: string;
    last: string;
    country: string;
    state?: string;
    city: string;
    street: string;
    houseNumber: number;
    zip?: number;
    email: string;
    phone: string;
    password: string;
    isBusiness: boolean;
    isAdmin: boolean;
    image: string;
}

const Registrationpage: React.FC = () => {
    const [user, setUser] = useState<IUser>({
        first: '',
        middle: '',
        last: '',
        country: '',
        state: '',
        city: '',
        street: '',
        houseNumber: 0,
        zip: 0,
        email: '',
        phone: '',
        password: '',
        isBusiness: false,
        isAdmin: false,
        image: 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'
    });

    const [errors, setErrors] = useState<string[]>([]);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            console.log(user);
            // API call to send data to server goes here
        }
    };

    const handleReset = () => {
        // Reset form
    };

    const handleCancel = () => {
        // Handle cancel action
    };
    return (
        <div className="register-form">
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
                            <label htmlFor="isAdmin">Is Admin</label>
                            <input type="checkbox" name="isAdmin" checked={user.isAdmin} onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <div className="buttons-row">
                    <button type="submit" className="submit-button">Submit</button>
                    <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                    <button type="reset" className="refresh-button" onClick={handleReset}>Reset</button>
                </div>
            </form>
        </div>
    );
};

export default Registrationpage;