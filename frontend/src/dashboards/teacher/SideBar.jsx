import React from "react";
import { NavLink } from "react-router-dom";
import kyuLogo from '/src/assets/images-removebg-preview.png';
import './SideBar.css';


function SideBar (){
    return(
        <div className="teacher-sidebar">
            <div className="Kyu">
                <img src={kyuLogo} alt="" className="KyuLogo" />
            </div>
            <h3 style={{color:"black",textAlign:"center",fontWeight:"bold"}}>Teacher</h3>
            <hr />

            <div className="Teachersidebar-content">
                <i className="fa-solid fa-house-user" id="teacher-icon-sidebar"></i>
                <NavLink to="/teacher" end>Dashboard</NavLink>
            </div>

            <div className="Teachersidebar-content">
                <i className="fa-solid fa-users" id="teacher-icon-sidebar"></i>
                <NavLink to="/teacher/students">Students</NavLink>
            </div>

            <div className="Teachersidebar-content">
                <i className="fa-solid fa-marker" id="teacher-icon-sidebar"></i>
                <NavLink to="/teacher/grading">Grading</NavLink>
            </div>

            <div className="Teachersidebar-content">
                <i className="fa-solid fa-calendar" id="teacher-icon-sidebar"></i>
                <button type="button" className="teacher-sidebar-static-btn">My classes</button>
            </div>

            <div className="Teachersidebar-content">
                <i className="fa-solid fa-clipboard-user" id="teacher-icon-sidebar"></i>
                <button type="button" className="teacher-sidebar-static-btn">Timetable</button>
            </div>
            <hr />

            <div className="teacher-gmail">
                <h2>teacher@gmail.com</h2>
            </div>
        </div>
    )
}
export default SideBar;