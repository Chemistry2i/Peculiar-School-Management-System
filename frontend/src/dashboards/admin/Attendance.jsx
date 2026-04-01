import React, { useMemo, useState } from "react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./Attendance.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const weeklyData = [
  { day: "Mon", present: 182, absent: 15, late: 11 },
  { day: "Tue", present: 176, absent: 18, late: 14 },
  { day: "Wed", present: 190, absent: 10, late: 9 },
  { day: "Thu", present: 185, absent: 13, late: 12 },
  { day: "Fri", present: 179, absent: 16, late: 13 },
];

const attendanceRecords = [
  { id: 1, studentId: "STU-001", student: "John Makumbi", className: "S4A", status: "present" },
  { id: 2, studentId: "STU-002", student: "Sarah Ocan", className: "S4B", status: "absent" },
  { id: 3, studentId: "STU-003", student: "Michael Otto", className: "S3A", status: "late" },
  { id: 4, studentId: "STU-004", student: "Emily Watera", className: "S5A", status: "present" },
  { id: 5, studentId: "STU-005", student: "David Kijjambu", className: "S4A", status: "unknown" },
  { id: 6, studentId: "STU-006", student: "Anna Nanyonjo", className: "S3B", status: "present" },
];

const statusLabel = {
  present: "Present",
  absent: "Absent",
  late: "Late",
  unknown: "Unknown",
};

const Attendance = () => {
  const [records, setRecords] = useState(attendanceRecords);
  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const totals = useMemo(() => {
    const present = records.filter((row) => row.status === "present").length;
    const absent = records.filter((row) => row.status === "absent").length;
    const late = records.filter((row) => row.status === "late").length;
    const total = records.length;
    const attendanceRate = total > 0 ? (((present + late) / total) * 100).toFixed(1) : "0.0";

    return { present, absent, late, attendanceRate };
  }, [records]);

  const classes = useMemo(() => {
    const uniqueClasses = [...new Set(records.map((record) => record.className))];
    return uniqueClasses.sort();
  }, [records]);

  const filteredRecords = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return records.filter((record) => {
      const matchesSearch =
        record.student.toLowerCase().includes(query) || 
        record.studentId.toLowerCase().includes(query);
      const matchesClass = classFilter === "all" || record.className === classFilter;
      const matchesStatus = statusFilter === "all" || record.status === statusFilter;

      return matchesSearch && matchesClass && matchesStatus;
    });
  }, [searchTerm, classFilter, statusFilter, records]);

  const chartData = {
    labels: weeklyData.map((item) => item.day),
    datasets: [
      {
        label: "Present",
        data: weeklyData.map((item) => item.present),
        backgroundColor: "#16a34a",
        borderRadius: 6,
      },
      {
        label: "Absent",
        data: weeklyData.map((item) => item.absent),
        backgroundColor: "#dc2626",
        borderRadius: 6,
      },
      {
        label: "Late",
        data: weeklyData.map((item) => item.late),
        backgroundColor: "#f59e0b",
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  const handleMarkStatus = (recordId, newStatus) => {
    setRecords((prev) =>
      prev.map((record) =>
        record.id === recordId ? { ...record, status: newStatus } : record
      )
    );
  };

  const getStatusClass = (status) => `attendance-badge ${status}`;

  return (
    <div className="attendance-page p-4">
      <div className="attendance-header mb-4">
        <h1 className="mb-2">Attendance Tracker</h1>
        <p className="text-muted mb-0">Track, review, and manage student attendance records.</p>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="attendance-card present-card">
            <i className="fa-solid fa-user-check attendance-icon" style={{border:"1px solid #16a34a", borderRadius:"50%",width:"50px", height: "50px", fontSize:"15px", display:"grid", placeItems:"center", color:"#16a34a",marginBottom:"5px"}} aria-hidden="true"></i>
            <h3>Present</h3>
            <h2>{totals.present}</h2>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="attendance-card absent-card">
            <i className="fa-solid fa-user-xmark attendance-icon" style={{border:"1px solid #dc2626", borderRadius:"50%",width:"50px", height: "50px", fontSize:"15px", display:"grid", placeItems:"center", color:"#dc2626",marginBottom:"5px"}} aria-hidden="true"></i>
            <h3>Absent</h3>
            <h2>{totals.absent}</h2>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="attendance-card late-card">
            <i className="fa-solid fa-user-clock attendance-icon" style={{border:"1px solid #f59e0b", borderRadius:"50%",width:"50px", height: "50px", fontSize:"15px", display:"grid", placeItems:"center", color:"#f59e0b",marginBottom:"5px"}} aria-hidden="true"></i>
            <h3>Late</h3>
            <h2>{totals.late}</h2>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="attendance-card rate-card">
            <i className="fa-solid fa-chart-line attendance-icon" style={{border:"1px solid #2563eb", borderRadius:"50%",width:"50px", height: "50px", fontSize:"15px", display:"grid", placeItems:"center", color:"#2563eb",marginBottom:"5px"}} aria-hidden="true"></i>
            <h3>Attendance Rate</h3>
            <h2>{totals.attendanceRate}%</h2>
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h2 className="mb-3 fs-5">Weekly Attendance Overview</h2>
          <div className="attendance-chart-box">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h2 className="mb-4 fs-5">Student Attendance Records</h2>

          <div className="row g-3 mb-4">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="attendance-search-wrapper">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by student name or ID"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <select 
                className="form-select" 
                value={classFilter} 
                onChange={(e) => setClassFilter(e.target.value)}
              >
                <option value="all">All Classes</option>
                {classes.map((className) => (
                  <option key={className} value={className}>
                    {className}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <select 
                className="form-select" 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="late">Late</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover table-sm mb-0">
              <thead className="table-light">
                <tr>
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>Class</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record) => (
                    <tr key={record.id}>
                      <td className="fw-bold">{record.studentId}</td>
                      <td>{record.student}</td>
                      <td>{record.className}</td>
                      <td>
                        <span className={getStatusClass(record.status)}>
                          {statusLabel[record.status]}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            type="button" 
                            className="action-btn present-btn"
                            onClick={() => handleMarkStatus(record.id, "present")}
                            title="Mark Present"
                          >
                            <i className="fas fa-circle-check"></i>
                            <span className="action-label">Present</span>
                          </button>
                          <button 
                            type="button" 
                            className="action-btn absent-btn"
                            onClick={() => handleMarkStatus(record.id, "absent")}
                            title="Mark Absent"
                          >
                            <i className="fas fa-circle-xmark"></i>
                            <span className="action-label">Absent</span>
                          </button>
                          <button 
                            type="button" 
                            className="action-btn unknown-btn"
                            onClick={() => handleMarkStatus(record.id, "unknown")}
                            title="Mark Unknown"
                          >
                            <i className="fas fa-circle-question"></i>
                            <span className="action-label">Unknown</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-attendance-results text-center">
                      No attendance records match your filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
