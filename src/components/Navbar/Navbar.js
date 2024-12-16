import React, { useState } from 'react';
import "./Navbar.css";
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const isLoggedIn = !!localStorage.getItem('username') || !!localStorage.getItem('admin_details');
    const isAdmin = !!localStorage.getItem('admin_details'); // Check if admin is logged in
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const handleLogout = () => {
        if (isAdmin){
            localStorage.clear();
            navigate("/admin/login");
            alert("Logged Out Successfully...");
        }
        else{
            localStorage.clear();
            navigate("/login");
            alert("Logged Out Successfully...");
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
        setIsMenuOpen(false); 
    };

    const username = localStorage.getItem("username");

    return (
        <div className="navbar-container">
            <div className="dash-navbar" onClick={toggleMenu}>
                <h2>{isLoggedIn ? (isAdmin ? "Admin" : username) : "AAI Financials"}</h2>
            </div>
            <div className="nav-buttons">
                {isLoggedIn ? (
                    isAdmin ? (
                        // Admin-specific navbar
                        <>
                            <ul className={isMenuOpen ? 'show' : ''}>
                                <li onClick={() => handleNavigation("/admindash")}>Admin Dashboard</li>
                                <li onClick={() => handleNavigation("/myclients")}>My Client</li>
                            </ul>
                            <button className="logout-button" onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        // User-specific navbar
                        <>
                            <ul className={isMenuOpen ? 'show' : ''}>
                                <li onClick={() => handleNavigation("/home")}>Home</li>
                            </ul>
                            <button className="logout-button" onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    )
                ) : (
                    // Guest-specific navbar
                    <>
                        <ul className={isMenuOpen ? 'show' : ''}>
                            <li onClick={() => handleNavigation("/home")}>Home</li>
                            <li onClick={() => handleNavigation("/login")}>Login</li>
                            <li onClick={() => handleNavigation("/register")}>Register</li>
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
}
