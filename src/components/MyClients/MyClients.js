import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserDetails from "../UserDetails/UserDetails";
import "./MyClients.css";
import { useNavigate } from 'react-router-dom';

export default function MyClients() {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const navigate = useNavigate();
    const handleBack = () => {
        setSelectedUserId(null);
        localStorage.removeItem('user');
    }
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/users/');
                const data = response.data
                console.log(data)
                setUsers(data);

            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="clients-container">
            {!selectedUserId ? (
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
                                <th>Has Mortgage?</th>
                                <th>Is Looking For Mortgage?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr
                                    key={user._id}
                                    onClick={() => setSelectedUserId(user._id)}
                                    className="user-row"
                                >
                                    <td>{index + 1}</td>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.contactnumber}</td>
                                    { user.hasMortgage? (
                                        <>
                                        <td>Yes</td>
                                        </>
                                    ):(
                                        <>
                                            <td>No</td>
                                        </>
                                    )}
                                    { user.isLookingForMortgage? (
                                        <>
                                        <td>Yes</td>
                                        </>
                                    ):(
                                        <>
                                            <td>No</td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="btn-back" onClick={()=> navigate("/admindash")}>Back</button>
                </div>
            ) : (
                <UserDetails userId={selectedUserId} onBack={handleBack} />
            )}
        </div>

    );
};