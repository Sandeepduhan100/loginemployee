'use client'
import React, { useEffect, useState } from 'react';

import './dashboard.css';
import Link from 'next/link';

const Dashboard = () => {
   
    const [username, setUsername] = useState('');

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        console.log("URL query string:", window.location.search);
        const usernameParam = searchParams.get('username');
        console.log("Extracted dashboard username:", usernameParam);
        if (usernameParam) {
            setUsername(usernameParam);
        }
    }, []);
    
    const handleLogout = () =>{
        alert("wana logout");
        window.location.href = '/login'
    }

    return (
        <div className="dashboard">
            <img src="./logo.png" alt="Logo" className="logo" />
            <nav className="navbar">
                <ul className="nav-list flex justify-between mx-20">
                    <li><a href="dashboard">Home</a></li>
                    <li>
                    <Link href={`employeelist?username=${username}`} >
            Employee List
          </Link>
                        </li>
                    <li><span>{username}</span></li>
                    <li><button onClick={handleLogout}>Logout</button></li>
                </ul>
            </nav>
            <h2 className="heading px-2">Dashboard</h2>
            
            <div className="container">
               <div className='flex items-center justify-center mt-20'>Welcome admin panel</div>
            </div>
        </div>
    );
};

export default Dashboard;
