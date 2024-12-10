import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store';
import './Response.css';
import axios from 'axios';

export default function Response() {
  const [userDetails, setUserDetails] = useState(null);
  const [selectedMortgage, setSelectedMortgage] = useState(null);
  const [selectedNewMortgage, setSelectedNewMortgage] = useState(null);
  const navigate = useNavigate();
  const { userdata } = useStore();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/user/${userdata.username}`);
        console.log(response.data);
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, [userdata.id]);

  if (!userDetails) return <p>Loading user details...</p>;

  const handleButtonClick = (mortgage) => {
    setSelectedMortgage(mortgage);
  };

  const handleNewMortgageClick = (newMortgage) => {
    setSelectedNewMortgage(newMortgage);
  };

  const handleClose = () => {
    setSelectedMortgage(null);
    setSelectedNewMortgage(null);
  };

  return (
    <div>
      <div style={{ display: "flex", height: "auto" }}>
        <div className="profile-container">
          <h1>Your Response</h1>
          <div className="profile-card">
            <div className="profile-row">
              <span className="profile-label">Username:</span>
              <span className="profile-value">{userDetails.username}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Name:</span>
              <span className="profile-value">{userDetails.name}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Email:</span>
              <span className="profile-value">{userDetails.email}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Phone Number:</span>
              <span className="profile-value">{userDetails.contactnumber}</span>
            </div>

            <div className="profile-row">
              <span className="profile-label">Existing Mortgage Details</span>
              {userDetails.mortgage_details.length > 0 ? (
                <div className="mortgage-details">
                  {userDetails.mortgage_details.map((mortgage, index) => (
                    <div key={mortgage._id || index} className="mortgage-item">
                      <button
                        className="mortgage-button"
                        onClick={() => handleButtonClick(mortgage)}
                      >
                        View Mortgage Response {index + 1}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No mortgage details available</p>
              )}
            </div>

            <div className="profile-row">
              <span className="profile-label">New Mortgage Requests</span>
              {userDetails.new_mortgage_requests.length > 0 ? (
                <div className="new-mortgage-details">
                  {userDetails.new_mortgage_requests.map((newMortgage, index) => (
                    <div key={newMortgage._id || index} className="new-mortgage-item">
                      <button
                        className="mortgage-button"
                        onClick={() => handleNewMortgageClick(newMortgage)}
                      >
                        View New Mortgage Response {index + 1}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No new mortgage requests available</p>
              )}
            </div>

            {selectedMortgage && (
              <div className="mortgage-detail-popup">
                <h2>Existing Mortgage Details</h2>
                <p><strong>Has Mortgage:</strong>{ selectedMortgage.hasMortgage ?(<> Yes </>) : (<>No</>)}</p>
                <p><strong>Mortgage Type:</strong> {selectedMortgage.mortgageType}</p>
                <p><strong>Mortgage Count:</strong> {selectedMortgage.mortgageCount}</p>
                <p><strong>Residential/Buy to Let:</strong> {selectedMortgage.resOrBuyToLet}</p>
                <p><strong>Amount:</strong> {selectedMortgage.mortgageAmount}</p>
                <p><strong>Renewal Date:</strong> {selectedMortgage.renewalDate}</p>
                <button className="mortgage-close-button" onClick={handleClose}>Close</button>
              </div>
            )}

            {selectedNewMortgage && (
              <div className="mortgage-detail-popup">
                <h2>New Mortgage Details</h2>
                <p><strong>Is looking For Mortgage:</strong>{ selectedNewMortgage.isLookingForMortgage?(<> Yes </>) : (<>No</>)}</p>
                <p><strong>New Mortgage Amount:</strong> {selectedNewMortgage.newMortgageAmount}</p>
                <p><strong>Ownership Type:</strong> {selectedNewMortgage.ownershipType}</p>
                <p><strong>Annual Income:</strong> {selectedNewMortgage.annualIncome}</p>
                <p><strong>Deposite Amount:</strong> {selectedNewMortgage.depositeAmt}</p>
                <p><strong>Property Found?</strong> {selectedNewMortgage.foundProperty}</p>
                
                
                
                <button className="mortgage-close-button" onClick={handleClose}>Close</button>
              </div>
            )}

            <div className="profile-buttons">
              <button className="profile-button back-button" onClick={() => navigate("/home")}>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
