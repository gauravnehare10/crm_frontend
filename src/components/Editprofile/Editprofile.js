import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import "./Editprofile.css";
import useAppStore from '../../store';

export default function Editprofile() {
    const navigate = useNavigate();
    const {userdata, updateUserData} = useAppStore();

    const [userName, setUsername] = useState(userdata.username);
    const [nAme, setName] = useState(userdata.name);
    const [eMail, setEmail] = useState(userdata.email);
    const [contactNumber, setContact] = useState(userdata.contactnumber);
    const [bankName, setBankname] = useState(userdata.bankname);
    const [bRanch, setBranch] = useState(userdata.branch);
    const [accType, setAccType] = useState(userdata.acctype);
    const [dOb, setDob] = useState(userdata.dob);
    const [aDdress, setAddress] = useState(userdata.address);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    
    const updatedUser = {
        username: userName,
        name: nAme,
        email: eMail,
        contactnumber: contactNumber,
        bankname: bankName,
        branch: bRanch,
        acctype: accType,
        dob: dOb,
        address: aDdress
      };
    const username = userdata.username
    const handleSave = () =>{
        axios.put(`http://127.0.0.1:8000/update/${username}`, updatedUser)
        .then((response)=>{
            console.log('User updated successful:', response.data);
            setSuccess('User updated Successfully.');
            const {user_details} = response.data;
            console.log(user_details)
            
            updateUserData(updatedUser);
            
            console.log("User updated:", userdata);
            navigate("../profile");
        })
        .catch((error) => {
            console.error('error:', error);
            setError('Something went wrong...');
          });
    }
  return (
    <div style={{ display: "flex", height: "auto" }}>
    <div className="ed-profile-container">
      <h1>Edit Your Profile</h1>
        {error && <p className="error-message">{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      <table className="table">
        <tbody>
          <tr>
            <th>Username:</th>
            <td>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th>Name:</th>
            <td>
              <input
                type="text"
                value={nAme}
                onChange={(e) => setName(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th>Email:</th>
            <td>
              <input
                type="email"
                value={eMail}
                onChange={(e) => setEmail(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th>Phone Number:</th>
            <td>
              <input
                type="text"
                value={contactNumber}
                onChange={(e) => setContact(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th>Bank Name:</th>
            <td>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankname(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th>Branch:</th>
            <td>
              <input
                type="text"
                value={bRanch}
                onChange={(e) => setBranch(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th>Account Type:</th>
            <td>
              <select
                value={accType}
                onChange={(e) => setAccType(e.target.value)}
              >
                <option value="">Select Account Type</option>
                <option value="Savings">Savings</option>
                <option value="Current">Current</option>
                <option value="Business">Business</option>
              </select>
            </td>
          </tr>
          <tr>
            <th>Date of Birth:</th>
            <td>
              <input
                type="date"
                value={dOb}
                onChange={(e) => setDob(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th>Address:</th>
            <td>
              <textarea
                value={aDdress}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="button-row">
              <button className="btn-save" onClick={handleSave}>
                Save
              </button>
              <button className="btn-cancel" onClick={()=>{navigate("/profile")}}>
                Cancel
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  );
}