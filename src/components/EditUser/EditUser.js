import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store';
import './EditUser.css';
import axios from 'axios';

const EditUser = () => {
    const navigate = useNavigate();
    const { userdata } = useStore();

    const [name, setName] = useState(userdata.name);
    const [username, setUsername] = useState(userdata.username);
    const [email, setEmail] = useState(userdata.email);
    const [contactNumber, setContactNumber] = useState(userdata.contactnumber);
    

    const handleCancle = () =>{
        localStorage.removeItem('user');
        navigate("/myclients")
    }

    const submitData = async () => {
        try {
            const userId = userdata.id;
            const updatedData = { name, username, email, contactnumber: contactNumber };
            console.log(updatedData)
            const response = await axios.put(`http://localhost:8000/users/${userId}`, updatedData);
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
                        <td>{userdata.id}</td>
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
