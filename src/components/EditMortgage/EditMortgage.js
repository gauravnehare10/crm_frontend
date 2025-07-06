import {React, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditMortgage() {
    const location = useLocation();
    const navigate = useNavigate();
    const exMortgage = location.state;
    const [paymentMethod, setPaymentMethod] = useState(exMortgage.paymentMethod);
    const [estPropertyValue, setEstPropertyValue] = useState(exMortgage.estPropertyValue);
    const [mortgageAmount, setMortgageAmount] = useState(exMortgage.mortgageAmount);
    const [loanToValue1, setLoanToValue1] = useState(exMortgage.loanToValue1);
    const [furtherAdvance, setfurtherAdvance] = useState(exMortgage.furtherAdvance);
    const [mortgageType, setMortgageType] = useState(exMortgage.mortgageType);
    const [productRateType, setProductRateType] = useState(exMortgage.productRateType);
    const [renewalDate, setRenewalDate] = useState(exMortgage.renewalDate);
    const [reference1, setReference1] = useState(exMortgage.reference1);

    useEffect(() => {
        if (mortgageAmount > 0){
          const calculatedLTV = ( mortgageAmount / estPropertyValue) * 100;
          setLoanToValue1(calculatedLTV.toFixed(2));
        } else{
          setLoanToValue1(0);
        }
      }, [mortgageAmount, estPropertyValue]);

    const handleSave = async () => {
        const payload = {
            id: exMortgage.id,
            hasMortgage: exMortgage.hasMortgage,
            paymentMethod,
            estPropertyValue,
            mortgageAmount,
            loanToValue1,
            furtherAdvance,
            mortgageType,
            productRateType,
            renewalDate: productRateType === 'fixed' ? renewalDate : null,
            reference1,
        };
    
        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/update-mortgage/${exMortgage.user_id}`,
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
                            <th><label>Payment Method</label></th>
                            <td>
                                <select className="inp-data" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="repayment">Repayment</option>
                                    <option value="interest only">Interest Only</option>
                                    <option value="part and part">Part and Part / Split</option>
                                </select>
                            </td>
                        </tr>
                        <tr className="st-item">
                            <th><label>Estimated Property Value</label></th>
                            <td>
                                <input className="inp-data" type="number" placeholder="Enter Property Value" value={estPropertyValue} onChange={(e) => setEstPropertyValue(e.target.value)} required />
                            </td>
                        </tr>
                        <tr className="st-item">
                            <th><label>Mortgage amount:</label></th>
                            <td><input className="inp-data" type="number" placeholder="Enter Amount" value={mortgageAmount} onChange={(e) => setMortgageAmount(e.target.value)} required /></td>
                        </tr>
                        <tr className="st-item">
                            <th><label>Lone to Value</label></th>
                            <td>{loanToValue1}</td>
                        </tr>
                        <tr className="st-item">
                            <th><label>Further Advance</label></th>
                            <td><input className="inp-data" type="number" placeholder="If Any" value={furtherAdvance} onChange={(e) => setfurtherAdvance(e.target.value)} required /></td>
                        </tr>
                        <tr className="st-item"> 
                            <th><label>Mortgage Type</label></th>
                            <td>
                                <select className="inp-data" value={mortgageType} onChange={(e) => setMortgageType(e.target.value)} required>          
                                    <option value="residential">Residential</option>
                                    <option value="consumer buy to let">Consumer Buy to Let</option>
                                    <option value="company buy to let">Company Buy to Let</option>
                                </select>
                            </td>
                        </tr>
                        <tr className="st-item">
                        <th><label>Product Rate Type</label></th>
                        <td>
                            <select className="inp-data" value={productRateType} onChange={(e) => setProductRateType(e.target.value)}>
                                <option value="">Select</option>
                                <option value="fixed">Fixed</option>
                                <option value="variable">Variable</option>
                                <option value="tracker">Tracker</option>
                            </select>
                        </td>
                        </tr>
                        {productRateType === 'fixed' && (
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
                            <th><label>Reference</label></th>
                            <td><input type="text" className='inp-data' placeholder='If Any' value={reference1} onChange={(e) => setReference1(e.target.value)} /></td>
                        </tr>
                        <tr className="st-item">
                            <td><button style={{"background": "red", "border": 'none', "color": 'white', "padding": '5px'}} onClick={ handleCancel }>Cancle</button></td>
                            <td><button style={{"background": "green", "border": 'none', "color": 'white', "padding": '5px'}} onClick={ handleSave } >Save</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };
