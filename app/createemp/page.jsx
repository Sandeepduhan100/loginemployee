'use client'
import React, { useState, useEffect } from 'react';
import './createemp.css';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library for generating unique IDs

const Createemp = () => {
    const [username, setUsername] = useState('');
    const [formData, setFormData] = useState({
        nameId: uuidv4(), // Initialize nameId with a unique ID for the name field
        name: '',
        email: '',
        mobile: '',
        designation: 'HR',
        gender: '',
        courses: [],
        image: null
    });

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const usernameParam = searchParams.get('username');
        if (usernameParam) {
            setUsername(usernameParam);
        }
    }, []);

    const handleLogout = () => {
        alert("wana logout");
        window.location.href = '/login'
    };

    const handleChange = (e) => {
        const { name, type, checked, files } = e.target;

        if (type === 'file' && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prevState => ({
                    ...prevState,
                    [name]: reader.result
                }));
            };
            reader.readAsDataURL(file);
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: type === 'checkbox' ?
                    (checked ? [...prevState.courses, e.target.value] : prevState.courses.filter(course => course !== e.target.value)) :
                    e.target.value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formDataJSON = JSON.stringify(formData);
    
        try {
            const response = await fetch('/api/addgetemployee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: formDataJSON
            });
    
            if (response.ok) {
                alert("Employee added successfully!")
                
                setFormData({
                    nameId: uuidv4(), // Generate a new unique ID for the name field
                    name: '',
                    email: '',
                    mobile: '',
                    designation: 'HR',
                    gender: '',
                    courses: [],
                    image: null
                });
            } else {
                throw new Error('Failed to add employee');
            }
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    return (
        <div className="dashboard">
            <img src="./logo.png" alt="Logo" className="logo" />
            <nav className="navbar">
                <ul className="nav-list flex justify-between mx-20">
                    <li><a href="dashboard">Home</a></li>
                    <li><a href="/employeelist">Employee List</a></li>
                    <li><span>{username}</span></li>
                    <li><button onClick={handleLogout}>Logout</button></li>
                </ul>
            </nav>
            <h2 className="heading px-2">Create Employee</h2>

            <div className="form-container flex items-center justify-center">
                <div className="container w-1/2">
                    <form onSubmit={handleSubmit}>
                    <div>
                            <label htmlFor="nameId">Unique ID:</label>
                            <input type="text" id="nameId" name="nameId" value={formData.nameId} onChange={handleChange} readOnly />
                        </div>
                        <div>
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                       
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div>
                            <label htmlFor="mobile">Mobile No:</label>
                            <input type="text" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} required />
                        </div>
                        <div>
                            <label htmlFor="designation">Designation:</label>
                            <select id="designation" name="designation" value={formData.designation} onChange={handleChange}>
                                <option value="HR">HR</option>
                                <option value="Manager">Manager</option>
                                <option value="Sales">Sales</option>
                            </select>
                        </div>
                        <div>
                            <label>Gender:</label>
                            <label htmlFor="male">Male</label>
                            <input type="radio" id="male" name="gender" value="male" onChange={handleChange} />
                            <label htmlFor="female">Female</label>
                            <input type="radio" id="female" name="gender" value="female" onChange={handleChange} />
                        </div>
                        <div>
                            <label>Courses:</label>
                            <label htmlFor="mca">MCA</label>
                            <input type="checkbox" id="mca" name="courses" value="MCA" onChange={handleChange} />
                            <label htmlFor="bca">BCA</label>
                            <input type="checkbox" id="bca" name="courses" value="BCA" onChange={handleChange} />
                            <label htmlFor="bsc">BSC</label>
                            <input type="checkbox" id="bsc" name="courses" value="BSC" onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="image">Img Upload:</label>
                            <input type="file" id="image" accept='.jpg,.png' name="image" onChange={handleChange} />
                        </div>
                        <div className='flex justify-center'><button type="submit">Submit</button></div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Createemp;
