'use client'
import React, { useState, useEffect } from 'react';
import './editemp.css'; // Import CSS file

const EditEmployee = () => {
    const [employee, setEmployee] = useState({
        nameId: '',
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        courses: [],
        image: null // Add image field to employee state
    });
    const [loading, setLoading] = useState(true);
    const [nameId, setNameId] = useState('');

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const nameId = urlSearchParams.get('nameId');
    
        if (nameId) {
            setNameId(nameId);  // Store the ID in state
            fetch(`/api/addgetemployee/${nameId}`)
                .then(response => response.json())
                .then(data => {
                    console.log("Employee data:", data); // Log the response data
                    setEmployee(data.employee); // Update state with employee data
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching employee details:', error);
                    setLoading(false);
                });
        }
    }, []);
    
    const handleChange = (e) => {
        const { name, type, checked, files } = e.target;
    
        if (type === 'file' && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setEmployee(prevState => ({
                    ...prevState,
                    [name]: reader.result // Convert file to base64 string and set it in the employee state
                }));
            };
            reader.readAsDataURL(file); // Read file as data URL (base64 string)
        } else {
            setEmployee(prevState => ({
                ...prevState,
                [name]: type === 'checkbox' ?
                    (checked ? [...prevState.courses, e.target.value] : prevState.courses.filter(course => course !== e.target.value)) :
                    e.target.value
            }));
        }
    };
    
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Now, employee contains all the necessary data to be sent to the server
    
        fetch(`/api/addgetemployee/${nameId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json' // Set content type to JSON
            },
            body: JSON.stringify(employee), // Convert JSON object to string
        })
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                console.log('Employee details updated successfully.');
                window.location.href = `/employeelist`;
            } else {
                console.error('Failed to update employee details. Status:', response.status);
            }
        })
        .catch(error => {
            console.error('Error updating employee details:', error);
        });
    };
    
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!employee) {
        return <div className="error-message">Employee not found.</div>;
    }

    return (
        <div className="edit-employee">
            <h1>Edit Employee</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>UniqueId:</label>
                    <input type="text" name="nameId" value={nameId} readOnly />
                </div>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={employee.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={employee.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Mobile:</label>
                    <input type="text" name="mobile" value={employee.mobile} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Designation:</label>
                    <select name="designation" value={employee.designation} onChange={handleChange}>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Gender:</label>
                    <label><input type="radio" name="gender" value="Male" checked={employee.gender === 'Male'} onChange={handleChange} /> Male</label>
                    <label><input type="radio" name="gender" value="Female" checked={employee.gender === 'Female'} onChange={handleChange} /> Female</label>
                </div>
                <div>
                            <label htmlFor="image">Img Upload:</label>
                            <input type="file" id="image" accept='.jpg,.png' name="image" onChange={handleChange} />
                        </div>
                <div className="form-group">
                    <label>Courses:</label>
                    <label><input type="checkbox" name="courses" value="MCA" checked={employee?.courses?.includes('MCA')} onChange={handleChange} /> MCA</label>
                    <label><input type="checkbox" name="courses" value="BCA" checked={employee?.courses?.includes('BCA')} onChange={handleChange} /> BCA</label>
                    <label><input type="checkbox" name="courses" value="BSC" checked={employee?.courses?.includes('BSC')} onChange={handleChange} /> BSC</label>
                </div>
               
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditEmployee;
