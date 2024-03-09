'use client'
import React, { useState } from 'react';
import './RegisterForm.css';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validate email format
        const isValidEmail = /\S+@\S+\.\S+/.test(username);
        if (!isValidEmail) {
            setUsernameError('Invalid email format');
            return;
        }
    
        try {
            const response = await fetch('/api/createuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            console.log("fghj",response);
    
            if (response.ok) {
                console.log('Response status:', response.status);
                const responseData = await response.json();
                console.log('Response data:', responseData);
                
                // Check if registration was successful and user already exists
                if (response.status === 200 && responseData.message === 'User already exists') {
                    // User already exists, show alert and redirect to login page
                    alert('User already exists. Please login.');
                    window.location.replace('/login');

                } else {
                    // Registration successful
                    console.log('Registration successful');
                }
            } else {
                // Registration failed, handle error
                console.error('Registration failed:', response.statusText);
            }
        } catch (error) {
            console.error('Registration error:', error);
        }
    };
    

    return (
        <div className="register-form">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    {usernameError && <span className="error">{usernameError}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterForm;
