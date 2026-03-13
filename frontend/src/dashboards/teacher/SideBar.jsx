import React from "react";
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
                <i class="fa-solid fa-house-user" id="teacher-icon-sidebar"></i>
                <a href="">Dashboard</a>
            </div>

            <div className="Teachersidebar-content">
                <i class="fa-solid fa-users" id="teacher-icon-sidebar"></i>
                <a href="">Students</a>
            </div>

            <div className="Teachersidebar-content">
                <i class="fa-solid fa-calendar" id="teacher-icon-sidebar"></i>
                <a href="">Time table</a>
            </div>

            <div className="Teachersidebar-content">
                <i class="fa-solid fa-clipboard-user" id="teacher-icon-sidebar"></i>
                <a href="">Attendance</a>
            </div>

            <div className="Teachersidebar-content">
                <i class="fa-solid fa-marker" id="teacher-icon-sidebar"></i>
                <a href="">Grades</a>
            </div>
            <hr />

            <div className="teacher-gmail">
                <h2>teacher@gmail.com</h2>
            </div>
        </div>
    )
}
export default SideBar;