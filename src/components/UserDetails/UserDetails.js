import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./UserDetails.css";
import useStore from '../../store';
import { useNavigate } from 'react-router-dom';

const UserDetails = ({ userId, onBack }) => {
    const [userDetails, setUserDetails] = useState(null);
    const { updateUserData } = useStore();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/users/${userId}`);
                setUserDetails(response.data);
                updateUserData(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        fetchUserDetails();
    }, [userId]);

    if (!userDetails) return <p>Loading user details...</p>;

    return (
        <div className="user-details-container" style={{'marginTop': "50px"}}>
            <h2 className="user-details-title">User Details</h2>
            <table className="user-details-table">
                <tbody>
                    <tr>
                        <th>ID</th>
                        <td>{userDetails._id}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td>{userDetails.name}</td>
                    </tr>
                    <tr>
                        <th>Username</th>
                        <td>{userDetails.username}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{userDetails.email}</td>
                    </tr>
                    <tr>
                        <th>Contact Number</th>
                        <td>{userDetails.contactnumber}</td>
                    </tr>
                    <tr>
                        <th>Has Mortgage?</th>
                    {  userDetails.hasMortgage? (
                        <>
                        <td>Yes</td>
                        </>
                    ) : (
                        <td>No</td>
                    )
                    }
                    </tr>
                    <tr>
                        <th>Mortgage Count</th>
                        <td>{userDetails.mortgageCount}</td>
                    </tr>
                    <tr>
                        <th>Residential OR Buy to let</th>
                        <td>{userDetails.resOrBuyToLet}</td>
                    </tr>
                    <tr>
                        <th>Mortgage Amount</th>
                        <td>{userDetails.mortgageAmount}</td>
                    </tr>
                    <tr>
                        <th>Mortgage Type</th>
                        <td>{userDetails.mortgageType}</td>
                    </tr>
                    <tr>
                        <th>If Fixed, Renewal Date</th>
                        <td>{userDetails.renewalDate}</td>
                    </tr>
                    <tr>
                        <th>Is Looking for Mortgage?</th>
                        { userDetails.isLookingForMortgage ?(
                            <>
                                <td>Yes</td>
                            </>
                        ) : (
                            <td>No</td>
                        )
                            
                        }
                        
                    </tr>
                    <tr>
                        <th>New Mortgage Amount</th>
                        <td>{userDetails.newMortgageAmount}</td>
                    </tr>
                    <tr>
                        <th>Annual Income</th>
                        <td>{userDetails.annualIncome}</td>
                    </tr>
                    <tr>
                        <th>Acount Ownership</th>
                        <td>{userDetails.ownershipType}</td>
                    </tr>
                    
                    <tr>
                        <th>Deposite Amount</th>
                        <td>{userDetails.depositeAmt}</td>
                    </tr>
                    <tr>
                        <th>Have you found the property?</th>
                        <td>{userDetails.foundProperty}</td>
                    </tr>
                    <tr style={{'border': 'none'}}>
                        <td>
                            <button className="back-button" onClick={onBack}>
                                Back
                            </button>
                        </td>
                        <td>
                            <button className="edit-button" onClick={()=>{navigate("/edituser")}}>Edit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            
        </div>

    );
};

export default UserDetails;