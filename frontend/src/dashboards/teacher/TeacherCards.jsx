import React from "react";
import './TeacherCards.css';


function TeacherCards (){
    return(
        <div className="teacher-container">
            <h1>Dashboard</h1>
            <h2>Welcome back! Here's your overview.</h2>

            <div style={{display:"flex",gap:"30px"}}>
                <div className="teacher-overview"> 
                    <div style={{ display:"flex",alignItems:"center,",justifyContent:"center",gap:"40px"}}>
                        <h1>My Classes</h1>
                        <i class="fa-solid fa-calendar" id="teacher-icon-card01"></i>
                    </div>
                    <p>8</p>
                </div>

                <div className="teacher-overview"> 
                    <div style={{ display:"flex",alignItems:"center,",justifyContent:"center",gap:"40px"}}>
                        <h1>Students</h1>
                        <i class="fa-solid fa-users" id="teacher-icon-card02"></i>
                    </div>
                    <p>250</p>
                </div>

                <div className="teacher-overview"> 
                    <div style={{ display:"flex",alignItems:"center,",justifyContent:"center",gap:"40px"}}>
                        <h1>Pending Grades</h1>
                        <i class="fa-solid fa-marker" id="teacher-icon-card03"></i>
                    </div>
                    <p>12</p>
                </div>

                <div className="teacher-overview"> 
                    <div style={{ display:"flex",alignItems:"center,",justifyContent:"center",gap:"40px"}}>
                        <h1>Today's Classes</h1>
                        <i class="fa-solid fa-book-open" id="teacher-icon-card04"></i>
                    </div>
                    <p>8</p>
                </div>

            </div>
        </div>
    )
}
export default TeacherCards;