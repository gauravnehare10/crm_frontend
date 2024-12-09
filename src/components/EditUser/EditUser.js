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
    const [hasMortgage, setHasMortgage] = useState(userdata.hasMortgage); // Initially null
    const [mortgageCount, setMortgageCount] = useState(userdata.mortgageCount);
    const [resOrBuyToLet, setResOrBuyToLet] = useState(userdata.resOrBuyToLet);
    const [mortgageAmount, setMortgageAmount] = useState(userdata.mortgageAmount);
    const [mortgageType, setMortgageType] = useState(userdata.mortgageType);
    const [renewalDate, setRenewalDate] = useState(userdata.renewalDate);
    const [isLookingForMortgage, setLookForMortgage] = useState(userdata.isLookingForMortgage);
    const [newMortgageAmount, setNewMortgageAmount] = useState(userdata.newMortgageAmount);
    const [annualIncome, setAnnualIncome] = useState(userdata.annualIncome);
    const [depositeAmt, setDepositeAmt] = useState(userdata.depositeAmt);
    const [ownershipType, setOwnershipType] = useState(userdata.ownershipType)
    const [foundProperty, setFoundProperty] = useState(userdata.foundProperty);

    const handleMortgageSelection = (value) => {
        setHasMortgage(value);
        if (!value) {
            setMortgageCount('');
            setResOrBuyToLet('');
            setMortgageAmount('');
            setMortgageType('');
            setRenewalDate('');
        } else {
            setLookForMortgage(null);
            setNewMortgageAmount('');
            setAnnualIncome('');
            setDepositeAmt('');
            setOwnershipType('');
            setFoundProperty(null);
        }
    };

    const submitData = async () => {

        if (hasMortgage === null) {
          alert('Please select whether you have a mortgage.');
          return;
        }
      
        if (hasMortgage) {
          if (!mortgageCount || !resOrBuyToLet || !mortgageType || !mortgageAmount) {
            alert('Please fill out all the fields related to your mortgage.');
            return;
          }
      
          if (mortgageType === 'fixed' && !renewalDate) {
            alert('Please enter the mortgage renewal or fixed-term end date.');
            return;
          }
        } else {
          if (isLookingForMortgage === null) {
            alert('Please specify if you are looking for a new mortgage.');
            return;
          }
      
          if (isLookingForMortgage) {
            if (!newMortgageAmount || !ownershipType || !annualIncome || !foundProperty) {
              alert('Please fill out all the fields for a new mortgage.');
              return;
            }
          }
        }
        const data = hasMortgage
          ? {
              hasMortgage,
              mortgageCount,
              resOrBuyToLet,
              mortgageType,
              mortgageAmount,
              renewalDate,
              username,
            }
          : {
              hasMortgage,
              isLookingForMortgage,
              newMortgageAmount,
              ownershipType,
              annualIncome,
              depositeAmt,
              foundProperty,
              username,
            };
    
        try {
        console.log(data)
          const response = await axios.put(
            `https://mortgage-backend-jo6l.onrender.com/mortgage/${username}`,
            data
          );
          console.log('Response:', response.data);
          alert("Data Updated Successfully...")
          navigate('/myclients');
        } catch (error) {
          console.error('Error submitting data:', error);
          alert('Failed to submit data.');
        }
      };

    return (
        <div className="user-details-container">
            <h2 className="user-details-title">User Details</h2>
            <table className="user-details-table">
                <tbody>
                    <tr>
                        <th>ID</th>
                        <td>{userdata._id}</td>
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
                        <th>Has Mortgage?</th>
                        <td>
                            <label>
                                <input
                                    type="radio"
                                    name="mortgage"
                                    value="yes"
                                    onChange={() => handleMortgageSelection(true)}
                                />
                                Yes
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="mortgage"
                                    value="no"
                                    onChange={() => handleMortgageSelection(false)}
                                />
                                No
                            </label>
                        </td>
                    </tr>
                    {hasMortgage && (
                        <>
                            <tr>
                                <th>Mortgage Count</th>
                                <td>
                                    <select className="select-data" value={mortgageCount} onChange={(e) => setMortgageCount(e.target.value)}>
                                        <option value="">Select</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="more">More</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>Residential OR Buy to Get</th>
                                <td>
                                    <select className="select-data" value={resOrBuyToLet} onChange={(e) => setResOrBuyToLet(e.target.value)}>
                                        <option value="">Select</option>
                                        <option value="Residential">Residential</option>
                                        <option value="Buy to Let">Buy to Let</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>Mortgage Amount</th>
                                <td><input className="inp-data" type="number" value={mortgageAmount} placeholder='Enter Mortgage Amount' onChange={(e) => setMortgageAmount(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <th>Mortgage Type</th>
                                <td>
                                    <select className="select-data" value={mortgageType} onChange={(e) => setMortgageType(e.target.value)}>
                                        <option value="">Select</option>
                                        <option value="fixed">Fixed</option>
                                        <option value="variable">Variable</option>
                                        <option value="other">Other</option>
                                    </select>
                                </td>
                            </tr>
                            {mortgageType === 'fixed' && (
                            <tr>
                                <th>If Fixed, Renewal Date</th>
                                <td><input className="inp-data" type="date" value={renewalDate} onChange={(e) => setRenewalDate(e.target.value)} /></td>
                            </tr>
                            )}
                        </>
                    )}
                    {!hasMortgage && (
                        <>
                            <tr>
                                <th>Is Looking for Mortgage?</th>
                                <td>
                                    <label>
                                        <input type="radio" name="look-for-mortgage" value="yes" onChange={() => setLookForMortgage(true)} /> Yes
                                    </label>
                                    <label>
                                        <input type="radio" name="look-for-mortgage" value="no" onChange={() => setLookForMortgage(false)} /> No
                                    </label>
                                </td>
                            </tr>
                            {isLookingForMortgage !== null && (
                            <>
                                {isLookingForMortgage && (
                                <>
                                    <tr>
                                        <th>Approximate Mortgage Amount</th>
                                        <td><input className="inp-data" type="number" placeholder='Approximate Mortgage Amount' value={newMortgageAmount} onChange={(e) => setNewMortgageAmount(e.target.value)} /></td>
                                    </tr>
                                    <tr>
                                        <th>Annual Income</th>
                                        <td><input className="inp-data" type="number" placeholder='Annual Income' value={annualIncome} onChange={(e) => setAnnualIncome(e.target.value)} /></td>
                                    </tr>
                                    <tr>
                                        <th>Deposit Amount</th>
                                        <td><input className="inp-data" type="number" placeholder='Deposite Amount' value={depositeAmt} onChange={(e) => setDepositeAmt(e.target.value)} /></td>
                                    </tr>
                                    <tr className="st-item">
                                        <th>Is it joint or single?</th>
                                        <td>
                                        <select className="inp-data" value={ownershipType} onChange={(e) => setOwnershipType(e.target.value)} required>
                                            <option>Select</option>
                                            <option value="joint">Joint</option>
                                            <option value="single">Single</option>
                                        </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Have you found the property?</th>
                                        <td>
                                            <label>
                                                <input type="radio" name="found-property" value="yes" onChange={() => setFoundProperty('Yes')} /> Yes
                                            </label>
                                            <label>
                                                <input type="radio" name="found-property" value="no" onChange={() => setFoundProperty('No')} /> No
                                            </label>
                                        </td>
                                    </tr>
                                </>
                                )}
                            </>
                            )}      
                        </>
                    )}
                    <tr>
                        <td><button className="back-button" onClick={() => navigate("/myclients")}>Cancle</button></td>
                        <td><button className="submit-button" onClick={submitData}>Submit</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default EditUser;
