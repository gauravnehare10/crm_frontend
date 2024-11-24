import React from 'react';
import { useNavigate } from "react-router-dom";


export default function Dash() {
    const navigate = useNavigate()
  return (
    <div>
      <h2>Welcome</h2>
      <div><button type="button" 
      onClick={()=>{localStorage.removeItem("username")
        navigate("/login")
      }}
      >Logout</button></div>
    </div>
  );
}
