import {React, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditNewMortgage() {
    const location = useLocation();
    const navigate = useNavigate();
    const newMortgage = location.state;
    const [newMortgageAmount, setNewMortgageAmount] = useState(newMortgage.newMortgageAmount);
    const [ownershipType, setOwnershipType] = useState(newMortgage.ownershipType);
    const [depositeAmt, setDepositeAmt] = useState(newMortgage.depositeAmt);
    const [annualIncome, setAnnualIncome] = useState(newMortgage.annualIncome);
    const [foundProperty, setFoundProperty] = useState(newMortgage.foundProperty);

    const handleSave = async () => {
        const payload = {
            id: newMortgage.id,
            isLookingForMortgage: newMortgage.isLookingForMortgage,
            newMortgageAmount,
            ownershipType,
            depositeAmt,
            annualIncome,
            foundProperty
        };

        console.log(payload);
    
        try {
            const response = await axios.put(
                `https://mortgage-backend-476d.onrender.com/${newMortgage.user_id}`, 
                payload
            );
            alert(response.data.message)
            if (newMortgage.isAdmin){
                navigate('/myclients');
            }

            else if (newMortgage.isUser){
                navigate('/response');
            }
             
        } catch (error) {
            console.error('Error updating mortgage:', error);
            alert('Failed to update mortgage. Please try again.');
        }
    };

    const handleCancel = () =>{
        if (newMortgage.isAdmin){
            navigate('/myclients');
        }

        else if (newMortgage.isUser){
            navigate('/response');
        }
    }
    return (
        <div className="user-details-container">
                <h2 className="mortgage-details-title" style={{"marginTop": "50px"}}>Mortgage Details</h2>
                <table className="user-details-table">
                    <tbody>
                    <tr>
                        <th>User ID</th>
                        <td>{newMortgage.user_id}</td>
                    </tr>
                    <tr>
                        <th>Mortgage ID</th>
                        <td>{newMortgage.id}</td>
                    </tr>
                    <tr className="st-item">
                        <th><label>Approximate mortgage amount:</label></th>
                        <td>
                            <input
                            type="number"
                            className="inp-data"
                            placeholder="Enter approximate amount"
                            value={newMortgageAmount}
                            onChange={(e) => setNewMortgageAmount(e.target.value)}
                            required
                          />
                        </td>
                    </tr>
                    <tr className="st-item">
                        <th><label>Is it joint or single?</label></th>
                        <td>
                            <select className="inp-data" value={ownershipType} onChange={(e) => setOwnershipType(e.target.value)} required>
                                <option>Select</option>
                                <option value="joint">Joint</option>
                                <option value="single">Single</option>
                            </select>
                            </td>
                    </tr>
                    <tr className="st-item">
                        <th><label>Annual income:</label></th>
                        <td><input
                        type="number"
                        className="inp-data"
                        placeholder="Enter your annual income"
                        value={annualIncome}
                        onChange={(e) => setAnnualIncome(e.target.value)}
                        />
                        </td>
                    </tr>
                    <tr className="st-item">
                        <th><label>Deposite Amount:</label></th>
                        <td><input
                        type="number"
                        className="inp-data"
                        placeholder="Enter Deposite Amount"
                        value={depositeAmt}
                        onChange={(e) => setDepositeAmt(e.target.value)}
                        />
                        </td>
                    </tr>
                    <tr className="st-item">
                        <th><label>Have you found the property?</label></th>
                        <td>
                        <label>
                        <input
                            type="radio"
                            name="found-property"
                            value="Yes"
                            required
                            onChange={(e) => setFoundProperty(e.target.value)}
                            />
                            Yes
                        </label>
                        <label>
                            <input
                            type="radio"
                            name="found-property"
                            value="No"
                            onChange={(e) => setFoundProperty(e.target.value)}
                            />
                            No
                        </label>
                        </td>
                    </tr>
                    <tr className="st-item">
                        <td><button style={{"background": "red", "border": 'none', "color": 'white'}} onClick={ handleCancel }>Cancle</button></td>
                        <td><button style={{"background": "green", "border": 'none', "color": 'white'}} onClick={ handleSave } >Save</button></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    };
