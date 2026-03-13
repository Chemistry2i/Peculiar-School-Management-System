import React from "react";

function Body(){
    return(
            <div className="body-content">
                <div className="body-activities">
                    <h1>Recent Activities</h1>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"30px"}}>
                        <h2>New student enrolled</h2>
                        <p>2 hours ago</p>
                    </div>
                    <hr />

                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"30px"}}>
                        <h2>Grades submitted for Math 101</h2>
                        <p>5 hours ago</p>
                    </div>
                    <hr />

                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"30px"}}>
                        <h2>Attendance Marked for today</h2>
                        <p>1 day ago</p>
                    </div>
                    <hr />

                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"30px"}}>
                        <h2>New annoucement posted</h2>
                        <p>2 days ago</p>
                    </div>
                    <hr />
                </div>
                <div className="body-actions">
                    <h1>Quick Actions</h1>
                    <div className="teacher-buttons01">
                        <button>Mark Attendance</button>
                    </div>
                    <div className="teacher-buttons">
                        <button>Enter Grades</button>
                    </div>
                    <div className="teacher-buttons03">
                        <button>View Timetable</button>
                    </div>
                </div>
            </div>
    )
}
export default Body;