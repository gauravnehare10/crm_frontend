import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import './ResetPassword.css';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://mortgage-backend-476d.onrender.com/password-change", {
        token,
        new_password: newPassword,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.detail || "An error occurred");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto", padding: "20px" }}>
      <h2>Reset Password</h2>
      <form onSubmit={handleReset}>
        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", margin: "10px 0" }}
        />
        <button type="submit" className="change-password-btn">
          Change Password
        </button>
      </form>
      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </div>
  );
};

export default ResetPassword;
