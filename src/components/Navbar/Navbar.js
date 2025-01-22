import React, { useState } from 'react';
import "./Navbar.css";
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const isLoggedIn = !!localStorage.getItem('username') || !!localStorage.getItem('admin_details');
    const isAdmin = !!localStorage.getItem('admin_details');
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

    return (
        <div className="navbar-container">
            <div className="dash-navbar" onClick={toggleMenu}>
                <img src="AAI_Logo_cp.png" alt="logo" />
            </div>
            <div className="nav-buttons">
                {isLoggedIn ? (
                    isAdmin ? (
                        <>
                            <ul className={isMenuOpen ? 'show' : ''}>
                                <li onClick={() => handleNavigation("/admindash")}>Admin Dashboard</li>
                                <li onClick={() => handleNavigation("/myclients")}>My Client</li>
                            </ul>
                            <button className="logout-button" onClick={handleLogout}>
                                Log Out
                            </button>
                        </>
                    ) : (
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
