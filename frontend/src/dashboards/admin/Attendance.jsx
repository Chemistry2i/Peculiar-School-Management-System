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
  { id: "STU-001", student: "John Makumbi", className: "S4A", status: "present" },
  { id: "STU-002", student: "Sarah Ocan", className: "S4B", status: "absent" },
  { id: "STU-003", student: "Michael Otto", className: "S3A", status: "late" },
  { id: "STU-004", student: "Emily Watera", className: "S5A", status: "present" },
  { id: "STU-005", student: "David Kijjambu", className: "S4A", status: "unknown" },
  // { id: "STU-006", student: "Anna Nanyonjo", className: "S3B", status: "present" },
  // { id: "STU-007", student: "Robert Ssemanda", className: "S2C", status: "absent" },
  // { id: "STU-008", student: "Miriam Achan", className: "S1A", status: "late" },
];

const statusLabel = {
  present: "Present",
  absent: "Absent",
  late: "Late",
  unknown: "Unknown",
};

const Attendance = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const totals = useMemo(() => {
    const present = attendanceRecords.filter((row) => row.status === "present").length;
    const absent = attendanceRecords.filter((row) => row.status === "absent").length;
    const late = attendanceRecords.filter((row) => row.status === "late").length;
    const total = attendanceRecords.length;
    const attendanceRate = total > 0 ? (((present + late) / total) * 100).toFixed(1) : "0.0";

    return { present, absent, late, attendanceRate };
  }, []);

  const classes = useMemo(() => {
    const uniqueClasses = [...new Set(attendanceRecords.map((record) => record.className))];
    return uniqueClasses.sort();
  }, []);

  const filteredRecords = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return attendanceRecords.filter((record) => {
      const matchesSearch =
        record.student.toLowerCase().includes(query) || record.id.toLowerCase().includes(query);
      const matchesClass = classFilter === "all" || record.className === classFilter;
      const matchesStatus = statusFilter === "all" || record.status === statusFilter;

      return matchesSearch && matchesClass && matchesStatus;
    });
  }, [searchTerm, classFilter, statusFilter]);

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

  const getStatusClass = (status) => `attendance-badge ${status}`;

  return (
    <div className="attendance-page">
      <div className="attendance-header">
        <h1>Attendance Tracker</h1>
        <p>Track, review, and manage student attendance records.</p>
      </div>

      <div className="attendance-cards">
        <div className="attendance-card present-card">
          <div>
            <h3>Students Present</h3>
            <h2>{totals.present}</h2>
            <span>Predicted: 188</span>
          </div>
          <i className="fa-solid fa-user-check card-icon" aria-hidden="true"></i>
        </div>

        <div className="attendance-card absent-card">
          <div>
            <h3>Students Absent</h3>
            <h2>{totals.absent}</h2>
            <span>Predicted: 14</span>
          </div>
          <i className="fa-solid fa-user-xmark card-icon" aria-hidden="true"></i>
        </div>

        <div className="attendance-card late-card">
          <div>
            <h3>Students Late</h3>
            <h2>{totals.late}</h2>
            <span>Predicted: 10</span>
          </div>
          <i className="fa-solid fa-user-clock card-icon" aria-hidden="true"></i>
        </div>

        <div className="attendance-card rate-card">
          <div>
            <h3>Attendance Rate</h3>
            <h2>{totals.attendanceRate}%</h2>
            <span>Predicted: 94.5%</span>
          </div>
          <i className="fa-solid fa-chart-line card-icon" aria-hidden="true"></i>
        </div>
      </div>

      <div className="attendance-chart-panel">
        <h2>Weekly Attendance Overview</h2>
        <div className="attendance-chart-box">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="attendance-table-panel">
        <div className="attendance-table-header">
          <h2>Student Attendance Records</h2>

          <div className="attendance-filters">
            <div className="attendance-search-wrapper">
              <input
                type="text"
                placeholder="Search by student name or ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
            </div>

            <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)}>
              <option value="all">All Classes</option>
              {classes.map((className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </select>

            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="late">Late</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
        </div>

        <div className="attendance-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Class</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr key={record.id}>
                    <td>
                      <div className="student-name-cell">
                        <strong>{record.student}</strong>
                        <span>{record.id}</span>
                      </div>
                    </td>
                    <td>{record.className}</td>
                    <td>
                      <span className={getStatusClass(record.status)}>{statusLabel[record.status]}</span>
                    </td>
                    <td>
                      <div className="attendance-actions">
                        <button className="action present" title="Mark Present" type="button">
                          <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                        </button>
                        <button className="action absent" title="Mark Absent" type="button">
                          <i className="fa-solid fa-circle-xmark" aria-hidden="true"></i>
                        </button>
                        <button className="action unknown" title="Mark Unknown" type="button">
                          <i className="fa-solid fa-circle-question" aria-hidden="true"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-attendance-results">
                    No attendance records match your filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;