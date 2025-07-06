import React, { useState } from "react";
import axios from "axios";
import './ForgotPasswordRequest.css';

const ForgotPasswordRequest = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRequest = async (e) => {
    e.preventDefault();
    try {
      console.log(email)
      const response = await axios.post("http://127.0.0.1:8000/password-reset-request", { email });
      setError('');
      setSuccess(response.data.message || "Reset link sent successfully.");
    } catch (error) {
      const errorDetail = error.response?.data?.detail;
      setSuccess('');
      setError(typeof errorDetail === "string" ? errorDetail : "An error occurred.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto", padding: "20px" }}>
      <h2>Forgot Password</h2>
      <form onSubmit={handleRequest}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", margin: "10px 0" }}
        />
        <button type="submit" className="reset-button">
          Send Reset Link
        </button>
      </form>
      {success && <p style={{ marginTop: "10px", color: "green" }}>{success}</p>}
      {error && <p style={{ marginTop: "10px", color: "red" }}>{error}</p>}
    </div>
  );
};

export default ForgotPasswordRequest;
