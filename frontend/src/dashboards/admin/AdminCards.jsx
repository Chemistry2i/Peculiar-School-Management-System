import React from "react";
import './AdminCards.css'


function AdminCards (){
    return(
            <div className="admin-container">
                <h1>Dashboard</h1>
                <h2>Welcome Back!Here's your overview.</h2>
                <div style={{display:"flex",gap:"30px"}}>
                    <div className="admin-view">
                        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"30px"}}>
                            <h1>Total Students</h1>
                            <i class="fa-solid fa-users" id="admin-icon-student"></i>
                        </div>
                        <p>1,234</p>
                    </div>

                    <div className="admin-view">
                        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"30px"}}>
                            <h1>Total Teachers</h1>
                            <i class="fas fa-graduation-cap" id="admin-icons-teachers"></i>
                        </div>
                        <p>80</p>
                    </div>

                    <div className="admin-view">
                        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"30px"}}>
                            <h1>Classes Today</h1>
                            <i class="fa-solid fa-book-open" id="admin-icons-classes"></i>
                        </div>
                        <p>52</p>
                    </div>

                    <div className="admin-view">
                        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"30px"}}>
                            <h1>Attendance Rate</h1>
                            <i class="fa-solid fa-users" id="admin-icons-rate"></i>
                        </div>
                        <p>95.4%</p>
                    </div>
                </div>
            </div>
    )
}
export default AdminCards;