import React from "react";
import './AdminCards.css'


function AdminCards (){
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    return (
        <div className="admin-container">
            <div className="banner-container">
                <div className="banner-content">
                    <h1>Dashboard Overview</h1>
                    <p>Welcome back, Admin! Here's what's happening today.</p>
                </div>
                <div className="banner-date">
                    <span>{currentDate}</span>
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon student">
                        <i className="fa-solid fa-users"></i>
                    </div>
                    <div className="stat-info">
                        <h3>Total Students</h3>
                        <p>1,234</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon teacher">
                        <i className="fas fa-graduation-cap"></i>
                    </div>
                    <div className="stat-info">
                        <h3>Total Teachers</h3>
                        <p>80</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon classes">
                        <i className="fa-solid fa-book-open"></i>
                    </div>
                    <div className="stat-info">
                        <h3>Classes Today</h3>
                        <p>52</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon attendance">
                        <i className="fa-solid fa-chart-pie"></i>
                    </div>
                    <div className="stat-info">
                        <h3>Attendance Rate</h3>
                        <p>95.4%</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon rooms">
                        <i className="fa-solid fa-door-open"></i>
                    </div>
                    <div className="stat-info">
                        <h3>Total Rooms</h3>
                        <p>28</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon departments">
                        <i className="fa-solid fa-building"></i>
                    </div>
                    <div className="stat-info">
                        <h3>Departments</h3>
                        <p>5</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AdminCards;