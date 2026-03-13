

import React from "react";
import { Link } from "react-router-dom";
import kyuLogo from '/src/assets/images-removebg-preview.png'
import './SideBar.css'

function SideBar(){
    return(
        <div style={{width: "23%", boxShadow:"0 0 5px gray", minHeight: "90vh", padding: "20px"}}>

            <div className="Kyu">
                <img src={kyuLogo} alt="" className="KyuLogo" />
            </div>

            <h3 style={{color:"black", textAlign:"center", marginBottom: "10px",fontWeight:"bold"}}>Student Dashboard</h3>
                <hr />
            <div className="links">
                <i class="fa-solid fa-house-user" id="std-sidebar-icons"></i>
                <a href="">Dashboard</a>
            </div>

            <div className="links">
                <i class="fa-solid fa-message" id="std-sidebar-icons"></i>
                <a href="">Messages</a>
            </div>

            <div className="links">
                <i class="fa-solid fa-users" id="std-sidebar-icons"></i>
                <a href="">Users</a>
            </div>

            <div className="links">
                <i class="fa-solid fa-bell" id="std-sidebar-icons"></i>
                <a href="">Notification</a>
            </div>

            <div className="links">
                <i class="fa-solid fa-circle-info" id="std-sidebar-icons"></i>
                <a href="">Information</a>
            </div>

            <div className="links">
                <i class="fa-solid fa-marker" id="std-sidebar-icons"></i>
                <a href="">Marks</a>
            </div>

            <div className="links">
                <i class="fa-solid fa-clipboard-user" id="std-sidebar-icons"></i>
                <a href="">Attendencs</a>
            </div>

            <div className="links">
                <i class="fa-solid fa-calendar" id="std-sidebar-icons"></i>
                <a href="">Schedules</a>
            </div>

            <div className="links">
                <i class="fa-solid fa-circle-question" id="std-sidebar-icons"></i>
                <a href="">Help</a>
            </div>

            <div className="links">
                <i class="fa-solid fa-gear" id="std-sidebar-icons"></i>
                <a href="">Settings</a>
            </div>
            <hr />
            <div style={{color:"black"}}>
                <h2>student@gmail.com</h2>
            </div>
        </div>
    )
}

export default SideBar;