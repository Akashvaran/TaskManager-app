import { useState } from 'react';
import './Signup.css';
import Axios from '../../axios/Axios';

export const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
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

        if (!formData.name.trim()) {
            validationErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            validationErrors.email = 'Email is required';
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
            validationErrors.email = 'Invalid email format';
        }

        if (!formData.mobile.trim()) {
            validationErrors.mobile = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(formData.mobile)) {
            validationErrors.mobile = 'Mobile number must be exactly 10 digits';
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
                const response = await Axios.post('User/signup', formData);
                console.log('Signup submitted successfully:', response.data);

                setSuccessMessage('Signup successful!');
                setFormData({
                    name: '',
                    email: '',
                    mobile: '',
                    password: ''
                });
                setErrors({});
                errorMessage('')
                
                
            } catch (error) {
                console.error('Signup error:', error.response ? error.response.data : error.message);
                setErrorMessage(error.response?.data?.message || 'Signup failed. Please try again.');
            }
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit} className="sign-form-container">
                <h1>Signup</h1>
                {successMessage && <p className="success-message">{successMessage}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? 'input-error' : ''}
                        placeholder="Enter your name"
                    />
                    {errors.name && <p className="error-message">{errors.name}</p>}
                </div>

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
                    <label htmlFor="mobile">Mobile Number</label>
                    <input
                        id="mobile"
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className={errors.mobile ? 'input-error' : ''}
                        placeholder="Enter your mobile number"
                    />
                    {errors.mobile && <p className="error-message">{errors.mobile}</p>}
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
                <div className='sign-button-container'>
                    <button type="submit" className="sign-submit-button">Submit</button>
                </div>
            </form>
        </div>
    );
};

