import React, { useState, useEffect } from "react";
import './AdminCards.css'


function AdminCards (){
    const [stats, setStats] = useState({
        totalStudents: 0,
        totalTeachers: 0,
        totalClasses: 0,
        attendanceRate: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await fetch('http://localhost:8080/api/dashboard/stats', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    setStats({
                        totalStudents: data.totalStudents || 0,
                        totalTeachers: data.totalTeachers || 0,
                        totalClasses: data.totalClasses || 0,
                        attendanceRate: data.averageAttendance || 0
                    });
                }
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            }
        };

        fetchStats();
    }, []);

    return(
            <div className="admin-container">
                <h1>Dashboard</h1>
                <h2>Welcome Back! Here's your overview.</h2>
                <div style={{display:"flex",gap:"30px"}}>
                    <div className="admin-view">
                        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"30px"}}>
                            <h1>Total Students</h1>
                            <i className="fa-solid fa-users" id="admin-icon-student"></i>
                        </div>
                        <p>{stats.totalStudents}</p>
                    </div>

                    <div className="admin-view">
                        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"30px"}}>
                            <h1>Total Teachers</h1>
                            <i className="fas fa-graduation-cap" id="admin-icons-teachers"></i>
                        </div>
                        <p>{stats.totalTeachers}</p>
                    </div>

                    <div className="admin-view">
                        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"30px"}}>
                            <h1>Total Classes</h1>
                            <i className="fa-solid fa-book-open" id="admin-icons-classes"></i>
                        </div>
                        <p>{stats.totalClasses}</p>
                    </div>

                    <div className="admin-view">
                        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"30px"}}>
                            <h1>Attendance Rate</h1>
                            <i className="fa-solid fa-users" id="admin-icons-rate"></i>
                        </div>
                        <p>{stats.attendanceRate}%</p>
                    </div>
                </div>
            </div>
    )
}
export default AdminCards;