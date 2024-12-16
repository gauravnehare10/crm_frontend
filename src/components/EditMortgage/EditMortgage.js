import {React, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditMortgage() {
    const location = useLocation();
    const navigate = useNavigate();
    const exMortgage = location.state;
    const [mortgageCount, setMortgageCount] = useState(exMortgage.mortgageCount);
    const [mortgageAmount, setMortgageAmount] = useState(exMortgage.mortgageAmount);
    const [mortgageAmount2, setMortgageAmount2] = useState(exMortgage.mortgageAmount2);
    const [mortgageAmount3, setMortgageAmount3] = useState(exMortgage.mortgageAmount3);
    const [resOrBuyToLet, setResOrBuyToLet] = useState(exMortgage.resOrBuyToLet);
    const [mortgageType, setMortgageType] = useState(exMortgage.mortgageType);
    const [renewalDate, setRenewalDate] = useState(exMortgage.renewalDate);

    const handleSave = async () => {
        const payload = {
            id: exMortgage.id,
            hasMortgage: exMortgage.hasMortgage,
            mortgageCount,
            mortgageType,
            renewalDate: mortgageType === 'fixed' ? renewalDate : null,
            mortgageAmount,
            resOrBuyToLet,
        };
    
        // Dynamically include or exclude additional mortgage amounts
        if (mortgageCount === "2") {
            payload.mortgageAmount2 = mortgageAmount2;
            payload.mortgageAmount3 = null; // Ensure mortgageAmount3 is cleared
        } else if (mortgageCount === "3") {
            payload.mortgageAmount2 = mortgageAmount2;
            payload.mortgageAmount3 = mortgageAmount3;
        } else {
            payload.mortgageAmount2 = null; // Ensure mortgageAmount2 is cleared
            payload.mortgageAmount3 = null; // Ensure mortgageAmount3 is cleared
        }
    
        try {
            const response = await axios.put(
                `https://mortgage-backend-476d.onrender.com/${exMortgage.user_id}`,
                payload
            );
            alert(response.data.message);
            if (exMortgage.isAdmin) {
                navigate('/myclients');
            } else if (exMortgage.isUser) {
                navigate('/response');
            }
        } catch (error) {
            console.error('Error updating mortgage:', error);
            alert('Failed to update mortgage. Please try again.');
        }
    };
    

    const handleCancel = () =>{
        if (exMortgage.isAdmin){
            navigate('/myclients');
        }

        else if (exMortgage.isUser){
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
                            <td>{exMortgage.user_id}</td>
                        </tr>
                        <tr>
                            <th>Mortgage ID</th>
                            <td>{exMortgage.id}</td>
                        </tr>
                        <tr className="st-item">
                            <th><label>Has mortgage?</label></th>
                            <td>Yes</td>
                        </tr>         
                        <tr className="st-item"> 
                            <th><label>How many mortgages do you have?</label></th>
                            <td>
                                <select className="inp-data" value={mortgageCount} onChange={(e) => setMortgageCount(e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </td>
                        </tr>
                        <tr className="st-item">
                            <th><label>Mortgage amount:</label></th>
                            <td><input className="inp-data" type="number" placeholder="Enter amount" value={mortgageAmount} onChange={(e) => setMortgageAmount(e.target.value)} required /></td>
                        </tr>
                        { mortgageCount === "2" && (
                        <tr className="st-item">
                            <th><label>Mortgage-2 amount:</label></th>
                            <td><input className="inp-data" type="number" placeholder="Enter amount" value={mortgageAmount2} onChange={(e) => setMortgageAmount2(e.target.value)} required /></td>
                        </tr>
                        )}
                        { mortgageCount === "3" && (
                        <>
                        <tr className="st-item">
                            <th><label>Mortgage-2 amount:</label></th>
                            <td><input className="inp-data" type="number" placeholder="Enter amount" value={mortgageAmount2} onChange={(e) => setMortgageAmount2(e.target.value)} required /></td>
                        </tr>
                        <tr className="st-item">
                            <th><label>Mortgage-3 amount:</label></th>
                            <td><input className="inp-data" type="number" placeholder="Enter amount" value={mortgageAmount3} onChange={(e) => setMortgageAmount3(e.target.value)} required /></td>
                        </tr>
                        </>
                        )}
                        <tr className="st-item"> 
                            <th><label>Are they?</label></th>
                            <td>
                                <select className="inp-data" value={resOrBuyToLet} onChange={(e) => setResOrBuyToLet(e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="residential">Residential</option>
                                    <option value="buy to let">Buy to Let</option>
                                </select>
                            </td>
                        </tr>
                        <tr className="st-item">
                            <th><label>Type:</label></th>
                            <td>
                                <select className="inp-data" value={mortgageType} onChange={(e) => setMortgageType(e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="fixed">Fixed</option>
                                    <option value="variable">Variable</option>
                                    <option value="other">Other</option>
                                </select>
                            </td>
                        </tr>
                        {mortgageType === 'fixed' && (
                        <tr className="st-item">
                            <th><label>Mortgage renewal or fixed term end date:</label></th> 
                            <td>
                                <input 
                                className="inp-data" 
                                type="date" 
                                placeholder="date" 
                                value={renewalDate} 
                                onChange={(e) => setRenewalDate(e.target.value)} 
                                required 
                                />
                            </td>
                        </tr>
                        )}
                        <tr className="st-item">
                            <td><button style={{"background": "red", "border": 'none', "color": 'white'}} onClick={ handleCancel }>Cancle</button></td>
                            <td><button style={{"background": "green", "border": 'none', "color": 'white'}} onClick={ handleSave } >Save</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };
