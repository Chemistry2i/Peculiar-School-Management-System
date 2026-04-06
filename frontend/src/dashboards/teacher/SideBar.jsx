import React from "react";
import profilePic from '../../assets/team-1.jpg';
import './SideBar.css';
import { NavLink, useLocation } from "react-router-dom";

function SideBar() {
    const location = useLocation();
    
    // Helper to determine active class
    const isActive = (path) => location.pathname === path ? "sidebar-link active" : "sidebar-link";

    return (
        <div className="teacher-sidebar">
            {/* Profile Section */}
            <div className="sidebar-profile">
                <div className="profile-img-container">
                    <img src={profilePic} alt="Teacher" />
                </div>
                <h3>Teacher User</h3>
                <span className="role-badge">Educator</span>
                <p className="user-email">teacher@school.com</p>
            </div>

            <hr className="sidebar-divider" />

            {/* Navigation Links */}
            <nav className="sidebar-nav">
                <NavLink to="/teacher" className={isActive("/teacher")} end>
                    <i className="fa-solid fa-house-user"></i>
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="/teacher/students" className={isActive("/teacher/students")}>
                    <i className="fa-solid fa-users"></i>
                    <span>Students</span>
                </NavLink>

                <NavLink to="/teacher/grading" className={isActive("/teacher/grading")}>
                    <i className="fa-solid fa-marker"></i>
                    <span>Grading</span>
                </NavLink>

                <NavLink to="/teacher/myclasses" className={isActive("/teacher/myclasses")}>
                    <i className="fa-solid fa-chalkboard"></i>
                    <span>My Classes</span>
                </NavLink>
            </nav>

            {/* Sidebar Footer */}
            <div className="sidebar-footer">
                <p>&copy; 2026 SMS System</p>
                <small>v1.0.0</small>
            </div>
        </div>
    );
}
export default SideBar;