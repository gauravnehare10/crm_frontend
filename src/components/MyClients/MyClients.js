import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserDetails from "../UserDetails/UserDetails";
import "./MyClients.css";

export default function MyClients() {
    const [users, setUsers] = useState([]);
    const [selectedUserName, setSelectedUserName] = useState(null);
    const navigate = useNavigate();

    const handleBack = () => {
        setSelectedUserName(null);
        localStorage.removeItem('user');
    };

    // Fetch users from the API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/users/');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    // Delete user function
    const handleDelete = async (userId) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/users/delete/${userId}`);
            if (response.status === 200) {
                // Remove the deleted user from the state
                setUsers(users.filter(user => user.id !== userId));
                console.log('User deleted successfully');
            } else {
                console.error('Failed to delete user:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="clients-container">
            {!selectedUserName ? (
                <div className="users-list">
                    <h2 className="users-title">All Users</h2>
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>Sr. No.</th>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Contact Number</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id} className="user-row">
                                    <td>{index + 1}.</td>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.contactnumber}</td>
                                    <td>
                                        <button
                                            className="view-user-btn"
                                            onClick={() => setSelectedUserName(user.username)}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="remove-user-btn"
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="btn-back" onClick={() => navigate("/admindash")}>Back</button>
                </div>
            ) : (
                <UserDetails userName={selectedUserName} onBack={handleBack} />
            )}
        </div>
    );
}
