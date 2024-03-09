'use client'
import React from 'react';
import './login.css';

const LoginPage = () => {


    const handleLogin = async (e) => {
        e.preventDefault();

    
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
    
        try {
            const response = await fetch('/api/addgetuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
    
            if (response.ok) {
                // Redirect to dashboard or handle success
                console.log('Login successful');
                window.location.href = `/dashboard?username=${username}`;
            } else {
                // Redirect to register page if login fails
                console.error('Login failed:', response.statusText);
                window.location.href = '/register'; // Assuming register route is '/register'
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };
    

    return (
        <div className="login-page">
            <img src="./logo.png" alt="Logo" className="logo" />
            <h2 className="heading">Login Page</h2>
            <div className="container">
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <div className="input-group">
                        <button type="submit" className="btn">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
