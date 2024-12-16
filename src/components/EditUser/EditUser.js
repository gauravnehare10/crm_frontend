import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './EditUser.css';
import axios from 'axios';

const EditUser = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userData = location.state;

    const [name, setName] = useState(userData.name);
    const [username, setUsername] = useState(userData.username);
    const [email, setEmail] = useState(userData.email);
    const [contactNumber, setContactNumber] = useState(userData.contactnumber);
    

    const handleCancle = () =>{
        if (userData.isAdmin){
            navigate("/myclients");
        }
        else if(userData.isUser){
            navigate("/response");
        }
    }

    const submitData = async () => {
        try {
            const userId = userData.id;
            const updatedData = { name, username, email, contactnumber: contactNumber };
            console.log(updatedData)
            const response = await axios.put(`https://mortgage-backend-476d.onrender.com/users/${userId}`, updatedData);
            console.log(response.data);
            alert("User updated successfully!");
            navigate("/myclients");
        } catch (error) {
            console.error(error);
            alert("Failed to update user details");
        }
    };

    return (
        <div className="user-details-container">
            <h2 className="user-details-title">User Details</h2>
            <table className="user-details-table">
                <tbody>
                    <tr>
                        <th>ID</th>
                        <td>{userData.id}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td><input className="inp-data" type="text" value={name} onChange={(e) => setName(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <th>Username</th>
                        <td><input className="inp-data" type="text" value={username} onChange={(e) => setUsername(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td><input className="inp-data" type="text" value={email} onChange={(e) => setEmail(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <th>Contact Number</th>
                        <td><input className="inp-data" type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td><button className="back-button" onClick={handleCancle}>Cancle</button></td>
                        <td><button className="submit-button" onClick={ submitData }>Submit</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default EditUser;
