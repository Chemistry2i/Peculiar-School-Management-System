import React from "react";
import profilePic from '../../assets/team-2.jpg';
import './SideBar.css';
import { NavLink, useLocation } from "react-router-dom";

function SideBar() {
    const location = useLocation();
    
    // Helper to determine active class
    const isActive = (path) => location.pathname === path ? "sidebar-link active" : "sidebar-link";

    return (
        <div className="admin-sidebar">
            {/* Profile Section */}
            <div className="sidebar-profile">
                <div className="profile-img-container">
                    <img src={profilePic} alt="Admin" />
                </div>
                <h3>Admin User</h3>
                <span className="role-badge">Administrator</span>
                <p className="user-email">admin@school.com</p>
            </div>

            <hr className="sidebar-divider" />

            {/* Navigation Links */}
            <nav className="sidebar-nav">
                <NavLink to="/admin" className={isActive("/admin")} end>
                    <i className="fa-solid fa-house-user"></i>
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="/admin/students" className={isActive("/admin/students")}>
                    <i className="fa-solid fa-users"></i>
                    <span>Students</span>
                </NavLink>

                <NavLink to="/admin/teachers" className={isActive("/admin/teachers")}>
                    <i className="fas fa-graduation-cap"></i>
                    <span>Teachers</span>
                </NavLink>

                <NavLink to="/admin/users" className={isActive("/admin/users")}>
                    <i className="fa-solid fa-user-gear"></i>
                    <span>Users</span>
                </NavLink>

                <NavLink to="/admin/grades" className={isActive("/admin/grades")}>
                    <i className="fa-solid fa-marker"></i>
                    <span>Grades</span>
                </NavLink>

                <NavLink to="/admin/attendance" className={isActive("/admin/attendance")}>
                    <i className="fa-solid fa-clipboard-user"></i>
                    <span>Attendance</span>
                </NavLink>

                <NavLink to="/admin/timetable" className={isActive("/admin/timetable")}>
                    <i className="fa-solid fa-calendar-days"></i>
                    <span>Timetable</span>
                </NavLink>

                <NavLink to="/admin/addclass" className={isActive("/admin/addclass")}>
                    <i className="fa-solid fa-chalkboard"></i>
                    <span>Add Class</span>
                </NavLink>

                {/* <a href="#" className="sidebar-link settings-link">
                    <i className="fa-solid fa-gear"></i>
                    <span>Settings</span>
                </a> */}
            </nav>

            {/* Sidebar Footer */}
            <div className="sidebar-footer">
                <p>&copy; 2026 SMS System</p>
                <small>v1.0.0</small>
            </div>
        </div>
    )
}
export default SideBar;