import { useState } from 'react';
import './Login.css';
import Axios from '../../axios/Axios';
import {Link} from 'react-router-dom'

export const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const validationErrors = {};

        if (!formData.email.trim()) {
            validationErrors.email = 'Email is required';
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
            validationErrors.email = 'Invalid email format';
        }

        if (!formData.password.trim()) {
            validationErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            validationErrors.password = 'Password must be at least 6 characters long';
        }

        return validationErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await Axios.post('User/login', formData);
                console.log('Login submitted successfully:', response.data);

                setSuccessMessage('Login successful!');
                setFormData({
                    email: '',
                    password: ''
                });
                setErrors({});
                errorMessage('')
            } catch (error) {
                console.error('Login error:', error.response ? error.response.data : error.message);
                setErrorMessage(error.response?.data?.message || 'Login failed. Please try again.');
            }
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form-container">
                <h1>Login</h1>
                {successMessage && <p className="success-message">{successMessage}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'input-error' : ''}
                        placeholder="Enter your email"
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={errors.password ? 'input-error' : ''}
                        placeholder="Enter your password"
                    />
                    {errors.password && <p className="error-message">{errors.password}</p>}
                </div>
                <div className='login-button-container'>
                    <button type="submit" className="login-submit-button">Submit</button>
                </div>
                <p className='register-nav'>Don't have account?<Link to={'/signup'}>Regiester</Link></p>
            </form>
        </div>
    );
};
