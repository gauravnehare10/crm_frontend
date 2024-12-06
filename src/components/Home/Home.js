import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import useStore from '../../store';
import useMortgageStore from '../../morgageStore';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const isLoggedIn = !!localStorage.getItem('username');
  const { userdata } = useStore();
  const { updateMortgage } = useMortgageStore();

  const navigate = useNavigate();

  // States for mortgage details
  const [hasMortgage, setHasMortgage] = useState(null);
  const [isLookingForMortgage, setLookForMortgage] = useState(null);
  const [mortgageCount, setMortgageCount] = useState(1);
  const [mortgageType, setMortgageType] = useState('');
  const [mortgageAmount, setMortgageAmount] = useState('');
  const [renewalDate, setRenewalDate] = useState('');
  const [newMortgageAmount, setNewMortgageAmount] = useState('');
  const [ownershipType, setOwnershipType] = useState('');
  const [annualIncome, setAnnualIncome] = useState('');
  const [showQuestions, setShowQuestions] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      const submittedData = localStorage.getItem('submittedData');
      if (submittedData) {
        setShowQuestions(false);
      }
    }
  }, [isLoggedIn]);

  const viewResponses = () => {
    const submittedData = localStorage.getItem('submittedData');
    if (submittedData) {
      navigate("/response");
    } else {
      alert('No responses found.');
    }
  };

  const submitData = async () => {
    const data = hasMortgage
      ? {
          hasMortgage,
          mortgageCount,
          mortgageType,
          mortgageAmount,
          renewalDate,
          username: userdata.username,
        }
      : {
          hasMortgage,
          isLookingForMortgage,
          newMortgageAmount,
          ownershipType,
          annualIncome,
          username: userdata.username,
        };

    try {
      const response = await axios.put(
        `https://mortgage-backend-iz78.onrender.com/mortgage/${userdata.username}`,
        data
      );
      console.log('Response:', response.data);
      const stringifiedData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, String(value)])
      );
      updateMortgage(stringifiedData);
      setShowQuestions(false); // Hide questions after submission
      alert('Data submitted successfully.');
      navigate('/');
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to submit data.');
    }
  };

  const handleMortgageSelection = (value) => {
    setHasMortgage(value);
    if (value === false) {
      setLookForMortgage(null); // Reset to null when switching between options
    }
  };

  const handleBack = () => {
    setShowQuestions(false);
  };

  return (
    <div className="main-div">
      <div className="user-details">
        {isLoggedIn ? (
          <>
            <p id="user_details">&#x1F464; {userdata.name}</p>
            <p id="user_details">&#x1F4DE; {userdata.contactnumber}</p>
            <p id="user_details">&#x2709; {userdata.email}</p>
          </>
        ) : (
          <div className="guest-content">
            <h2>Hey Guest !!</h2>
            <p>Please login or register to access personalized features.</p>
          </div>
        )}
      </div>
      <div className="home">
        {isLoggedIn && showQuestions && (
          <>
            <div className="step-item">
              <label>Do you have a mortgage?</label>
              <div>
                <label className="radio-btn">
                  <input
                    type="radio"
                    name="mortgage"
                    value="yes"
                    required
                    onChange={() => handleMortgageSelection(true)}
                  />
                  Yes
                </label>
                <label className="radio-btn">
                  <input
                    type="radio"
                    name="mortgage"
                    value="no"
                    onChange={() => handleMortgageSelection(false)}
                  />
                  No
                </label>
              </div>
            </div>
            {hasMortgage !== null && (
              <>
                {hasMortgage && (
                  <>
                    <div className="step-item">
                      <label>How many mortgages do you have?</label>
                      <select value={mortgageCount} onChange={(e) => setMortgageCount(e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="more">More</option>
                      </select>
                    </div>
                    <div className="step-item">
                      <label>Mortgage renewal or fixed term end date:</label>
                      <input
                        type="date"
                        placeholder="date"
                        value={renewalDate}
                        onChange={(e) => setRenewalDate(e.target.value)}
                        required
                      />
                    </div>
                    <div className="step-item">
                      <label>Mortgage amount:</label>
                      <input
                        type="number"
                        placeholder="Enter amount"
                        value={mortgageAmount}
                        required
                        onChange={(e) => setMortgageAmount(e.target.value)}
                      />
                    </div>
                    <div className="step-item">
                      <label>Type:</label>
                      <select value={mortgageType} onChange={(e) => setMortgageType(e.target.value)} required>
                        <option>Select</option>
                        <option value="fixed">Fixed</option>
                        <option value="variable">Variable</option>
                      </select>
                    </div>
                  </>
                )}
                {!hasMortgage && (
                  <>
                    <div className="step-item">
                      <label>Are you looking for a new mortgage?</label>
                      <div>
                        <label>
                          <input
                            type="radio"
                            name="look-for-mortgage"
                            value="yes"
                            required
                            onChange={() => setLookForMortgage(true)}
                          />
                          Yes
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="look-for-mortgage"
                            value="no"
                            onChange={() => setLookForMortgage(false)}
                          />
                          No
                        </label>
                      </div>
                    </div>
                    {isLookingForMortgage !== null && (
                      <>
                        {isLookingForMortgage && (
                          <>
                          <div className="step-item">
                            <label>Approximate mortgage amount:</label>
                            <input
                              type="number"
                              placeholder="Enter approximate amount"
                              value={newMortgageAmount}
                              onChange={(e) => setNewMortgageAmount(e.target.value)}
                              required
                            />
                          </div>
                            <div className="step-item">
                              <label>Is it joint or single?</label>
                              <select value={ownershipType} onChange={(e) => setOwnershipType(e.target.value)} required>
                                <option>Select</option>
                                <option value="joint">Joint</option>
                                <option value="single">Single</option>
                              </select>
                            </div>
                            <div className="step-item">
                              <label>Annual income:</label>
                              <input
                                type="number"
                                placeholder="Enter your annual income"
                                value={annualIncome}
                                onChange={(e) => setAnnualIncome(e.target.value)}
                              />
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
            {hasMortgage !== null && (
              <div className="navigation-buttons">
                <div className="left-button">
                  <button onClick={ handleBack }>Back</button>
                </div>
                <div className="right-button">
                  <button onClick={submitData}>Submit</button>
                </div>
              </div>
            )}
          </>
        )}
        {!showQuestions && (
          <div className="thank-you-message">
            <h3>Thank you for submitting your responses!</h3>
            <div className="navigation-buttons">
              <button className="edit-resp" onClick={() => setShowQuestions(true)}>Edit Responses</button>
              <button className="view-resp" onClick={viewResponses}>View Responses</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
