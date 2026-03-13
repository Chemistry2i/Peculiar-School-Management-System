import React from "react";
import kyuLogo from '/src/assets/images-removebg-preview.png'
import './SideBar.css'
import { NavLink } from "react-router-dom";

function SideBar (){
    return(
        <div className="admin-sidebar">
        
                    <div className="Kyu">
                        <img src={kyuLogo} alt="" className="KyuLogo" />
                    </div>
        
                    <h3 style={{color:"black", textAlign:"center", marginBottom: "10px",fontWeight:"bold"}}>Admin.</h3>
                        <hr />
                    <div className="sidebar-content">
                        <i className="fa-solid fa-house-user" id="admin-icon-side"></i>
                        <NavLink to="/admin">Dashboard</NavLink>
                    </div>
        
                    
        
                    <div className="sidebar-content">
                        <i className="fa-solid fa-users" id="admin-icon-side"></i>
                        {/* <a href="">students</a> */}
                        <NavLink to="/admin/students">Students</NavLink>
                    </div>
        
                    <div className="sidebar-content">
                        <i className="fas fa-graduation-cap" id="admin-icon-side"></i>
                        {/* <a href="">Teachers</a> */}
                        <NavLink to="/admin/teachers">Teachers</NavLink>
                    </div>
        
                    <div className="sidebar-content">
                        <i className="fa-solid fa-marker" id="admin-icon-side"></i>
                        <NavLink to="/admin/grades">Grades</NavLink>
                    </div>
        
                    <div className="sidebar-content">
                        <i className="fa-solid fa-clipboard-user" id="admin-icon-side"></i>
                        <NavLink to="/admin/attendance">Attendance</NavLink>
                    </div>
        
                    <div className="sidebar-content">
                        <i className="fa-solid fa-calendar" id="admin-icon-side"></i>
                        <NavLink to="/admin/timetable">Time table</NavLink>
                    </div>
        
                    <div className="sidebar-content">
                        <i className="fa-solid fa-gear" id="admin-icon-side"></i>
                        <a href="">setting</a>
                    </div>
                    <hr />
                    <div className="admin-gmail">
                        <h2>admin@gmail.com</h2>
                    </div>
                </div>
    )
}
export default SideBar;