import React from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store';

export default function Profile() {
    const navigate = useNavigate();
    const {userdata} = useStore();

  return (
    <div style={{ display: "flex", height: "auto" }}>
      <div className="profile-container">
        <h1>Your Profile</h1>
        <div className="profile-card">
          <div className="profile-row">
            <span className="profile-label">Username:</span>
            <span className="profile-value">{userdata.username}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Name:</span>
            <span className="profile-value">{userdata.name}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Email:</span>
            <span className="profile-value">{userdata.email}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Phone Number:</span>
            <span className="profile-value">{userdata.contactnumber}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Bank Name:</span>
            <span className="profile-value">{userdata.bankname}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Branch:</span>
            <span className="profile-value">{userdata.branch}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Account Type:</span>
            <span className="profile-value">{userdata.acctype}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Date of Birth:</span>
            <span className="profile-value">{userdata.dob}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Address:</span>
            <span className="profile-value">{userdata.address}</span>
          </div>
          <div className="profile-buttons">
            <button className="profile-button edit-button" onClick={()=>{navigate("/editprofile")}}>
              Edit
            </button>
            <button className="profile-button back-button" onClick={()=>{navigate("/dash")}}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
