import React from "react";

function Attendance() {
    const attendanceData = [
        { month: "January", present: 18, absent: 2, percentage: 90 },
        { month: "February", present: 19, absent: 1, percentage: 95 },
        { month: "March", present: 20, absent: 0, percentage: 100 },
        { month: "April", present: 17, absent: 3, percentage: 85 },
    ];

    const classWiseAttendance = [
        { class: "Class 10-A", attendance: 92 },
        { class: "Class 10-B", attendance: 88 },
        { class: "Class 10-C", attendance: 95 },
        { class: "Class 10-D", attendance: 90 },
    ];

    return (
        <div className="container-fluid">
            <div className="page-header">
                <div>
                    <h1><i className="fa-solid fa-clipboard-user"></i> Attendance</h1>
                    <p>Your attendance records and statistics</p>
                </div>
                <div>
                    <h3 style={{ color: '#2c4ebb', margin: 0 }}>Overall: 92%</h3>
                </div>
            </div>

            <div className="grid-2" style={{ marginBottom: '24px' }}>
                <div className="card">
                    <div className="card-header">
                        <h5>Monthly Attendance</h5>
                    </div>
                    <div className="card-body">
                        {attendanceData.map((month, idx) => (
                            <div key={idx} style={{ marginBottom: '16px' }}>
                                <div className="d-flex justify-content-between mb-2">
                                    <small className="fw-bold">{month.month}</small>
                                    <small className="text-muted">{month.percentage}%</small>
                                </div>
                                <div className="progress" style={{ height: '8px' }}>
                                    <div 
                                        className="progress-bar" 
                                        style={{ width: `${month.percentage}%`, backgroundColor: month.percentage >= 90 ? '#10b981' : '#f59e0b' }}
                                    ></div>
                                </div>
                                <small className="text-muted">Present: {month.present} | Absent: {month.absent}</small>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <h5>Class-wise Attendance</h5>
                    </div>
                    <div className="card-body">
                        {classWiseAttendance.map((cls, idx) => (
                            <div key={idx} className="attendance-row">
                                <div className="class-info">
                                    <h5>{cls.class}</h5>
                                </div>
                                <div className="attendance-rate" style={{ flex: 1 }}>
                                    <div className="progress-bar" style={{ flex: 1, backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: `${cls.attendance}%`, backgroundColor: '#10b981' }}></div>
                                    </div>
                                    <span className="rate-text" style={{ marginLeft: '12px' }}>{cls.attendance}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Attendance;
