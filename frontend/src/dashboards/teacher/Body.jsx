import React from "react";
import './Body.css';
import TeacherStudents from "./TeacherStudents";
import AddStudentMarks from "../../auth/AddStudentMarks";
import MyClasses from "./MyClasses";

function Body(){
    return(
            <div className="body-content">
                <div className="body-activities">
                    <h1>Recent Activities</h1>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"10px"}}>
                        <h2>New student enrolled</h2>
                        <p>2 hours ago</p>
                    </div>
                    <hr />

                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"10px"}}>
                        <h2>Grades submitted for Math 101</h2>
                        <p>5 hours ago</p>
                    </div>
                    <hr />

                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"10"}}>
                        <h2>Attendance Marked for today</h2>
                        <p>1 day ago</p>
                    </div>
                    <hr />

                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"10px"}}>
                        <h2>New annoucement posted</h2>
                        <p>2 days ago</p>
                    </div>
                    <hr />
                </div>
                
                <div className="body-actions">
                    <h1>Quick Actions</h1>

                    {/* <div className="teacher-buttons01">
                        <button>Mark Attendance</button>
                    </div> */}
            <div>
              <button className="btn btn-secondary btn-custom rounded-4 mb-3" data-bs-toggle="modal" data-bs-target="#markAttendanceModal">Mark Attendance</button>
            </div>

            <div className="modal fade" id="markAttendanceModal" tabIndex="-1">
              <div className="modal-dialog modal-xl">

                <div className="modal-content">

                  <div className="modal-header">  
                      <h3 className="modal-title">Mark Attendance</h3>
                      <button className="btn-close" data-bs-dismiss="modal"></button>
                  </div>

                  <div className="modal-body">
                    <TeacherStudents/>
                  </div>

                  <div className="modal-footer">
                    <button className="btn btn-secondary" data-bs-dismiss="modal">close</button>
                  </div>

                </div>
                
              </div>
            </div>

                    {/* <div className="teacher-buttons">
                        <button>Enter Grades</button>
                    </div> */}

            <div>
              <button className="btn btn-primary btn-custom rounded-4 mb-3" data-bs-toggle="modal" data-bs-target="#AddStudentMarksModal">Add Student Marks</button>
            </div>

            <div className="modal fade" id="AddStudentMarksModal" tabIndex="-1">
              <div className="modal-dialog modal-xl">

                <div className="modal-content">

                  <div className="modal-header">  
                      <h3 className="modal-title">Add student marks</h3>
                      <button className="btn-close" data-bs-dismiss="modal"></button>
                  </div>

                  <div className="modal-body">
                    <AddStudentMarks/>
                  </div>

                  <div className="modal-footer">
                    <button className="btn btn-secondary" data-bs-dismiss="modal">close</button>
                  </div>

                </div>
                
              </div>
            </div>


                    {/* <div className="teacher-buttons03">
                        <button>View Timetable</button>
                    </div> */}

                    <div>
              <button className="btn btn-secondary btn-custom rounded-4" data-bs-toggle="modal" data-bs-target="#MyclasssesModal">View Your Timetable</button>
            </div>

            <div className="modal fade" id="MyclasssesModal" tabIndex="-1">
              <div className="modal-dialog modal-xl">

                <div className="modal-content">

                  <div className="modal-header">  
                      <h3 className="modal-title">View Your Timetable</h3>
                      <button className="btn-close" data-bs-dismiss="modal"></button>
                  </div>

                  <div className="modal-body">
                    <MyClasses/>
                  </div>

                  <div className="modal-footer">
                    <button className="btn btn-secondary" data-bs-dismiss="modal">close</button>
                  </div>

                </div>
                
              </div>
            </div>


                </div>
            </div>
    )
}
export default Body;