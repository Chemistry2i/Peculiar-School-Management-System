import React from "react";
import './Body.css';
import StudentRegistration from "../../auth/StudentRegistration";
import TeacherRegistration from "../../auth/TeacherRegistration";


function Body (){
      return(
        <div className="Body-container">

          <div className="Admin-activities">
            <h1>Recent Activities</h1>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"20px",}}>
              <h2>New student enrolled</h2>
              <p>2 hours ago</p>
            </div>
            <hr />
            
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"20px"}}>
              <h2>Attendance Marked for Today</h2>
              <p>6 hours ago</p>
            </div>
            <hr />
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"20px"}}>
              <h2>Teacher Assigned</h2>
              <p>3 hours ago</p>
            </div>
            <hr />
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"20px"}}>
              <h2>New Annoucement posted</h2>
              <p>5 days ago</p>
            </div>
            <hr />
          </div>

          <div className="Admin-actions">
            <h1>Quick Actions</h1>
            {/* <div className="Admin-btn001">
              <button >Add New Student</button>
            </div> */}

            <div>
              <button className="btn btn-primary btn-custom mb-3 rounded-4" data-bs-toggle="modal" data-bs-target="#studentModal" >Add New Student</button>
            </div>

            <div className="modal fade" id="studentModal" tabIndex="-1">
              <div className="modal-dialog modal-xl">

                <div className="modal-content">

                  <div className="modal-header">
                    <h3 className="modal-title">Student Registration</h3>
                    <button className="btn-close" data-bs-dismiss="modal"></button>
                  </div>

                  <div className="modal-body">
                    <StudentRegistration/>
                  </div>

                  <div className="modal-footer">
                    <button className="btn btn-secondary" data-bs-dismiss="modal">close</button>
                  </div>

                </div>
              </div>
            </div>

            {/* <div className="Admin-buttons">
              <button>Add New Teacher</button>
            </div> */}

            <div>
              <button className="btn btn-secondary btn-custom rounded-4" data-bs-toggle="modal" data-bs-target="#teacherModal">Add New Teacher</button>
            </div>

            <div className="modal fade" id="teacherModal" tabIndex="-1">
              <div className="modal-dialog modal-xl">

                <div className="modal-content">

                  <div className="modal-header">  
                      <h3 className="modal-title">Teachers Registration</h3>
                      <button className="btn-close" data-bs-dismiss="modal"></button>
                  </div>

                  <div className="modal-body">
                    <TeacherRegistration/>
                  </div>

                  <div className="modal-footer">
                    <button className="btn btn-secondary" data-bs-dismiss="modal">close</button>
                  </div>

                </div>
                
              </div>
            </div>


            {/* <div className="Admin-btn002">
              <button >View Timetable</button>
            </div>
             */}

            
              
          </div>
        </div>
      )
}
export default Body;