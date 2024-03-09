'use client'
import React, { useEffect, useState } from 'react';
import './employeelist.css'; // Import your CSS file for styling
import Link from 'next/link';

const Employeelist = () => {
    const [username, setUsername] = useState('');
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const usernameParam = searchParams.get('username');
        if (usernameParam) {
            setUsername(usernameParam);
        }

        // Fetch all employee data when component mounts
        fetch('/api/addgetemployee')
            .then(response => response.json())
            .then(data => {
                setEmployees(data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching employees:', error);
                setLoading(false);
            });
    }, []);

    const handleLogout = () => {
        alert("wana logout");
        window.location.href = '/login';
    };

    const handleEdit = (nameId) => {
        // Redirect to edit employee page with employee ID
        window.location.href = `/editemp?nameId=${nameId}`;
    };
    
    const handleDelete = (nameId) => {
        // Confirm deletion with a dialog
        const confirmed = window.confirm('Are you sure you want to delete this employee?');
        
        if (confirmed) {
          console.log('Deleting employee with nameId:', nameId); // Log nameId before sending the DELETE request
          
          // Create a JSON object with the nameId property
          const requestBody = { nameId: nameId };
          
          // Implement delete employee functionality
          fetch(`/api/addgetemployee`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
          })
          .then(response => {
            if (response.ok) {
              // If the deletion is successful, remove the deleted employee from the state
              setEmployees(prevEmployees => prevEmployees.filter(employee => employee.nameId !== nameId));
            } else {
              // Handle error if deletion fails
              console.error('Failed to delete employee');
            }
          })
          .catch(error => {
            console.error('Error deleting employee:', error);
          });
        } else {
          console.log('Deletion cancelled by user');
        }
      };
      
    const filteredEmployees = employees.filter(employee => {
        // Filter employees based on search query
        return employee.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    if (loading) {
        return <div>Loading...</div>;
    }

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
            <h2 className="heading px-2">Employee List</h2>

            <div className="container">
                <div className='flex justify-end text-right'>
                    <span className='mx-4'>Total Count: {employees.length}</span>
                    <span className='bg-green-100 mx-4 px-4'><Link href={`/createemp?username=${username}`}>Create Employee</Link></span>
                </div>

               <div className='flex justify-end mt-2 ' >
               <input 
                    type="text" 
                    placeholder="Search by name..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='border px-2'
                    
                />
               </div>
                <div className="table-container mt-10">
                    <table>
                        <thead>
                            <tr>
                                <th>Unique Id</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile No</th>
                                <th>Designation</th>
                                <th>Gender</th>
                                <th>Courses</th>
                                <th>Create Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.map(employee => (
                                <tr key={employee.nameId}>
                                    <td>{employee.nameId}</td>
                                    <td>{/* Display image */}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.mobile}</td>
                                    <td>{employee.designation}</td>
                                    <td>{employee.gender}</td>
                                    <td>{employee.courses.join(', ')}</td>
                                    <td>{/* Display create date */}</td>
                                    <td>
                                        <button onClick={() => handleEdit(employee.nameId)} className='mx-2'>Edit</button>
                                        <button onClick={() => handleDelete(employee.nameId)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Employeelist;
