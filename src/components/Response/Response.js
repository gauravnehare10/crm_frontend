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
        const response = await axios.get(`https://mortgage-backend-yn59.onrender.com/user/${userdata.username}`);
        console.log(response.data);
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, [userdata.username]);

  const handleEdit = () => {
    const userdata = {
        "isUser": true,
        "id": userDetails._id,
        "username": userDetails.username,
        "name": userDetails.name,
        "email": userDetails.email,
        "contactnumber": userDetails.contactnumber,
    }
    navigate('/edituser', {state: userdata})
  }

  const exMortgageEdit = () =>{
    const exMortgagedata = {
      "isUser": true,
      "user_id": userDetails._id,
      'id': selectedMortgage._id,
      'hasMortgage': selectedMortgage.hasMortgage,
      'paymentMethod': selectedMortgage.paymentMethod,
      'estPropertyValue':selectedMortgage.estPropertyValue,
      'mortgageAmount': selectedMortgage.mortgageAmount,
      "loanToValue1": selectedMortgage.loanToValue1,
      "furtherAdvance": selectedMortgage.furtherAdvance,
      'mortDepositAmount': selectedMortgage.mortDepositAmount,
      'mortgageType': selectedMortgage.mortgageType,
      'productRateType': selectedMortgage.productRateType,
      'renewalDate': selectedMortgage.renewalDate,
      'reference1': selectedMortgage.reference1,
    }
    navigate('/editmortgage', {state: exMortgagedata});
  }

  const newMortgageEdit = () => {
    const newMortgageData = {
      "isUser": true,
      "user_id": userDetails._id,
      "id": selectedNewMortgage._id,
      "isLookingForMortgage": selectedNewMortgage.isLookingForMortgage,
      "newMortgageType": selectedNewMortgage.newMortgageType,
      "foundProperty": selectedNewMortgage.foundProperty,
      "depositAmount": selectedNewMortgage.depositAmount,
      "purchasePrice": selectedNewMortgage.purchasePrice,
      "loanToValue2": selectedNewMortgage.loanToValue2,
      "loanAmount": selectedNewMortgage.loanAmount,
      "sourceOfDeposit": selectedNewMortgage.sourceOfDeposit,
      "loanTerm": selectedNewMortgage.loanTerm,
      "newPaymentMethod": selectedNewMortgage.newPaymentMethod,
      "reference2": selectedNewMortgage.reference2,
    }

    navigate('/editnewmortgage', {state: newMortgageData});
  }

  const handleDelete = async (id, type) => {
    try {
      await axios.delete(`https://mortgage-backend-yn59.onrender.com/delete-response/${id}?type=${type}`);
      // Remove the deleted item from the state
      setUserDetails((prevDetails) => {
        if (type === 'existing') {
          return {
            ...prevDetails,
            mortgage_details: prevDetails.mortgage_details.filter((item) => item._id !== id),
          };
        } else {
          return {
            ...prevDetails,
            new_mortgage_requests: prevDetails.new_mortgage_requests.filter((item) => item._id !== id),
          };
        }
      });
    } catch (error) {
      console.error('Error deleting response:', error);
    }
  };

  if (!userDetails) return <p>Loading user details...</p>;

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
              {userDetails?.mortgage_details?.length > 0 ? (
                <div className="mortgage-details">
                  {userDetails.mortgage_details.map((mortgage, index) => (
                    <div key={mortgage._id} className="mortgage-item">
                      <button
                        className="mortgage-button"
                        onClick={() => setSelectedMortgage(mortgage)}
                      >
                        View Mortgage-{(index+1)}
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(mortgage._id, 'existing')}
                      >
                        Delete
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
              {userDetails?.new_mortgage_requests?.length > 0 ? (
                <div className="new-mortgage-details">
                  {userDetails.new_mortgage_requests.map((newMortgage, index) => (
                    <div key={newMortgage._id} className="new-mortgage-item">
                      <button
                        className="mortgage-button"
                        onClick={() => setSelectedNewMortgage(newMortgage)}
                      >
                        View Mortgage-{(index+1)}
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(newMortgage._id, 'new')}
                      >
                        Delete
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
                <h2>Mortgage Details</h2>
                <table>
                    <tr><th>Has Mortgage</th><td>{selectedMortgage.hasMortgage ? 'Yes' : 'No'}</td></tr>
                    <tr><th>Payment Method</th><td>{selectedMortgage.paymentMethod}</td></tr>
                    <tr><th>Estimated Property Value</th><td>{selectedMortgage.estPropertyValue}</td></tr>
                    <tr><th>Mortgage Amount</th><td>{selectedMortgage.mortgageAmount}</td></tr>
                    <tr><th>Loan to value</th><td>{selectedMortgage.loanToValue1} %</td></tr>
                    <tr><th>Further Advance</th><td>{selectedMortgage.furtherAdvance}</td></tr>
                    <tr><th>Mortgage Type</th><td>{selectedMortgage.mortgageType}</td></tr>
                    <tr><th>Product Rate Type</th><td>{selectedMortgage.productRateType}</td></tr>
                    <tr><th>Renewal Date</th><td>{selectedMortgage.renewalDate}</td></tr>
                    <tr><th>Reference</th><td>{selectedMortgage.reference1}</td></tr>
                    <tr>
                        <td><button className="mortgage-close-button" onClick={() => setSelectedMortgage(null)}>Close</button></td>
                        <td><button className="mortgage-edit-button" onClick={ exMortgageEdit }>Edit</button></td>
                    </tr>
                </table>
              </div>
            )}

            {selectedNewMortgage && (
              <div className="mortgage-detail-popup">
                <h2>Requested Mortgage Details</h2>
                <table>
                    <tr><th>Is Looking For Mortgage</th><td>{selectedNewMortgage.isLookingForMortgage ? 'Yes' : 'No'}</td></tr>
                    <tr><th>New Mortgage Type</th><td>{selectedNewMortgage.newMortgageType}</td></tr>
                    <tr><th>Have you found the property?</th><td>{selectedNewMortgage.foundProperty}</td></tr>
                    <tr><th>Deposit Amount</th><td>{selectedNewMortgage.depositAmount}</td></tr>
                    <tr><th>Purchase Price</th><td>{selectedNewMortgage.purchasePrice}</td></tr>
                    <tr><th>Loan to value</th><td>{selectedNewMortgage.loanToValue2} %</td></tr>
                    <tr><th>Loan Amount</th><td>{selectedNewMortgage.loanAmount}</td></tr>
                    <tr><th>Source of Deposit</th><td>{selectedNewMortgage.sourceOfDeposit}</td></tr>
                    <tr><th>Loan Term</th><td>{selectedNewMortgage.loanTerm} Years</td></tr>
                    <tr><th>Payment Method</th><td>{selectedNewMortgage.newPaymentMethod}</td></tr>
                    <tr><th>Reference</th><td>{selectedNewMortgage.reference2}</td></tr>
                    <tr>
                        <td><button className="mortgage-close-button" onClick={() => setSelectedNewMortgage(null)}>Close</button></td>
                        <td><button className="mortgage-edit-button" onClick={ newMortgageEdit }>Edit</button></td>
                    </tr>
                </table>
              </div>
            )}
            <div className="profile-buttons">
              <button className="profile-button back-button" onClick={() => navigate("/home")}>
                Back
              </button>
              <button className="profile-button edit-button" onClick={ handleEdit }>
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
