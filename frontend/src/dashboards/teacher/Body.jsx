import React from "react";
import './Body.css';
import TeacherStudents from "./TeacherStudents";
import AddStudentMarks from "../../auth/AddStudentMarks";
import MyClasses from "./MyClasses";

function Body(){
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    return(
        <div className="container-fluid py-4">
          {/* Welcome Banner */}
          <div className="banner-container mb-4">
            <div className="banner-content">
              <h1>Welcome back, Teacher!</h1>
              <p>Here's your teaching dashboard. Stay on top of your classes, grades, and attendance.</p>
            </div>
            <div className="banner-date">
              <span>{currentDate}</span>
            </div>
          </div>

          {/* Dashboard Status Cards */}
          <div className="stats-grid mb-4">
            <div className="stat-card">
              <div className="stat-icon classes-today">
                <i className="fa-solid fa-book-open"></i>
              </div>
              <div className="stat-info">
                <h3>Classes Today</h3>
                <p>5</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon students-count">
                <i className="fa-solid fa-users"></i>
              </div>
              <div className="stat-info">
                <h3>Total Students</h3>
                <p>128</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon attendance-rate">
                <i className="fa-solid fa-chart-pie"></i>
              </div>
              <div className="stat-info">
                <h3>Attendance Rate</h3>
                <p>92.3%</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon grades-pending">
                <i className="fa-solid fa-marker"></i>
              </div>
              <div className="stat-info">
                <h3>Grades Pending</h3>
                <p>23</p>
              </div>
            </div>
          </div>

          <div className="row g-4">
            
            {/* Recent Activities Section */}
            <div className="col-12 col-xl-6">
              <div className="card shadow-sm h-100 border-0">
                <div className="card-header bg-white border-bottom-0 pt-4 px-4">
                  <h5 className="mb-0 fw-bold text-dark-emphasis">Recent Activities</h5>
                </div>
                <div className="card-body px-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div>
                      <h6 className="mb-1 fw-semibold text-dark">New student enrolled</h6>
                      <small className="text-muted">Added to your class</small>
                    </div>
                    <span className="badge bg-light text-secondary rounded-pill">2 hours ago</span>
                  </div>
                  <hr className="text-muted opacity-25" />
                  
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div>
                      <h6 className="mb-1 fw-semibold text-dark">Grades submitted for Math 101</h6>
                      <small className="text-muted">Class S.4</small>
                    </div>
                    <span className="badge bg-light text-secondary rounded-pill">5 hours ago</span>
                  </div>
                  <hr className="text-muted opacity-25" />

                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div>
                      <h6 className="mb-1 fw-semibold text-dark">Attendance Marked for today</h6>
                      <small className="text-muted">All Classes</small>
                    </div>
                    <span className="badge bg-light text-secondary rounded-pill">1 day ago</span>
                  </div>
                  <hr className="text-muted opacity-25" />

                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="mb-1 fw-semibold text-dark">New announcement posted</h6>
                      <small className="text-muted">Check exam schedule</small>
                    </div>
                    <span className="badge bg-light text-secondary rounded-pill">2 days ago</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Section */}
            <div className="col-12 col-xl-6">
              <div className="card shadow-sm h-100 border-0">
                <div className="card-header bg-white border-bottom-0 pt-4 px-4">
                  <h5 className="mb-0 fw-bold text-dark-emphasis">Quick Actions</h5>
                </div>
                <div className="card-body px-4">
                  <div className="d-grid gap-3">
                    <button 
                      className="btn btn-primary p-3 text-start d-flex align-items-center justify-content-between rounded-3 activity-btn" 
                      data-bs-toggle="modal" 
                      data-bs-target="#markAttendanceModal"
                    >
                      <span className="fw-semibold">
                        <i className="fa-solid fa-clipboard-user me-2"></i> Mark Attendance
                      </span>
                      <i className="fa-solid fa-chevron-right small"></i>
                    </button>

                    <button 
                      className="btn btn-light border p-3 text-start d-flex align-items-center justify-content-between rounded-3 activity-btn" 
                      data-bs-toggle="modal" 
                      data-bs-target="#AddStudentMarksModal"
                    >
                      <span className="fw-semibold text-dark-emphasis">
                        <i className="fa-solid fa-marker me-2 text-primary"></i> Add Student Marks
                      </span>
                      <i className="fa-solid fa-chevron-right small text-muted"></i>
                    </button>

                    <button 
                      className="btn btn-light border p-3 text-start d-flex align-items-center justify-content-between rounded-3 activity-btn" 
                      data-bs-toggle="modal" 
                      data-bs-target="#MyclasssesModal"
                    >
                      <span className="fw-semibold text-dark-emphasis">
                        <i className="fa-solid fa-calendar-days me-2 text-warning"></i> View Your Timetable
                      </span>
                      <i className="fa-solid fa-chevron-right small text-muted"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Mark Attendance Modal */}
          <div className="modal fade" id="markAttendanceModal" tabIndex="-1">
            <div className="modal-dialog modal-xl modal-dialog-centered">
              <div className="modal-content border-0 shadow">
                <div className="modal-header border-bottom-0 pb-0">
                  <h3 className="modal-title fs-5 fw-bold ps-2">Mark Attendance</h3>
                  <button className="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                  <TeacherStudents/>
                </div>
                <div className="modal-footer border-top-0">
                  <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>

          {/* Add Student Marks Modal */}
          <div className="modal fade" id="AddStudentMarksModal" tabIndex="-1">
            <div className="modal-dialog modal-xl modal-dialog-centered">
              <div className="modal-content border-0 shadow">
                <div className="modal-header border-bottom-0 pb-0">
                  <h3 className="modal-title fs-5 fw-bold ps-2">Add Student Marks</h3>
                  <button className="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                  <AddStudentMarks/>
                </div>
                <div className="modal-footer border-top-0">
                  <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>

          {/* View Timetable Modal */}
          <div className="modal fade" id="MyclasssesModal" tabIndex="-1">
            <div className="modal-dialog modal-xl modal-dialog-centered">
              <div className="modal-content border-0 shadow">
                <div className="modal-header border-bottom-0 pb-0">
                  <h3 className="modal-title fs-5 fw-bold ps-2">Your Timetable</h3>
                  <button className="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                  <MyClasses/>
                </div>
                <div className="modal-footer border-top-0">
                  <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}
export default Body;