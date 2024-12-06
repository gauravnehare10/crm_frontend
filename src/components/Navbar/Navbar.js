import React from 'react';
import "./Navbar.css";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
    const isLoggedIn = !!localStorage.getItem('username');
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
        alert("Logged Out Successfully...");
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const username = localStorage.getItem("username");

    return (
        <div className="navbar-container">
            <div className="dash-navbar" onClick={toggleMenu}>
                <h2>{isLoggedIn ? username : "Hey Guest !!"}</h2>
            </div>
            <div className="nav-buttons">
                {isLoggedIn ? (
                    <>
                        <ul className={isMenuOpen ? 'show' : ''}>
                            <li onClick={() => navigate("/")}>Home</li>
                            <li onClick={() => navigate("/profile")}>Account</li>
                        </ul>
                        <button className="logout-button" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <ul className={isMenuOpen ? 'show' : ''}>
                            <li onClick={() => navigate("/")}>Home</li>
                            <li onClick={() => navigate("/login")}>Login</li>
                            <li onClick={() => navigate("/register")}>Register</li>
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
}
