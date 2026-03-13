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
import "./Grades.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const subjectOverview = [
  { subject: "Math", score: 62 },
  { subject: "English", score: 55 },
  { subject: "Science", score: 60 },
  { subject: "Art", score: 49 },
];

const gradeRows = [
  {
    id: "GR-101",
    student: "John Makumbi",
    className: "S4A",
    average: "64%",
    grade: "B",
    subject: "Math",
    performance: "Good",
    term: "term1",
  },
  {
    id: "GR-102",
    student: "Sarah Ocan",
    className: "S4B",
    average: "71%",
    grade: "A",
    subject: "English",
    performance: "Excellent",
    term: "term1",
  },
  {
    id: "GR-103",
    student: "Michael Otto",
    className: "S3A",
    average: "39%",
    grade: "D",
    subject: "Science",
    performance: "Needs Support",
    term: "term1",
  },
  {
    id: "GR-104",
    student: "Emily Watera",
    className: "S5A",
    average: "67%",
    grade: "B",
    subject: "Art",
    performance: "Good",
    term: "term2",
  },
  {
    id: "GR-105",
    student: "David Kijjambu",
    className: "S4A",
    average: "74%",
    grade: "A",
    subject: "Math",
    performance: "Top Performer",
    term: "term3",
  },
];

const Grades = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [termFilter, setTermFilter] = useState("term1");
  const [subjectFilter, setSubjectFilter] = useState("all");

  const filteredRows = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return gradeRows.filter((row) => {
      const matchesSearch =
        row.student.toLowerCase().includes(query) || row.className.toLowerCase().includes(query);
      const matchesTerm = termFilter === "all" || row.term === termFilter;
      const matchesSubject =
        subjectFilter === "all" || row.subject.toLowerCase() === subjectFilter.toLowerCase();

      return matchesSearch && matchesTerm && matchesSubject;
    });
  }, [searchTerm, termFilter, subjectFilter]);

  const chartData = {
    labels: subjectOverview.map((item) => item.subject),
    datasets: [
      {
        label: "Average Score (%)",
        data: subjectOverview.map((item) => item.score),
        backgroundColor: ["#2563eb", "#0ea5e9", "#22c55e", "#f59e0b"],
        borderRadius: 8,
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
        max: 100,
      },
    },
  };

  return (
    <div className="grades-page">
      <div className="grades-header">
        <h1>Manage Student Grades and Academic Performance</h1>
        <p>Review subject outcomes, track class trends, and support struggling learners.</p>
      </div>

      <div className="grades-cards">
        <div className="grades-card class-average">
          <div>
            <h3>Class Average</h3>
            <h2>58%</h2>
          </div>
          <i className="fa-solid fa-chart-line grades-icon" aria-hidden="true"></i>
        </div>

        <div className="grades-card top-performance">
          <div>
            <h3>Top Performance</h3>
            <h2>Sarah Ocan</h2>
          </div>
          <i className="fa-solid fa-trophy grades-icon" aria-hidden="true"></i>
        </div>

        <div className="grades-card subjects-assessed">
          <div>
            <h3>Subjects Assessed</h3>
            <h2>4 Subjects</h2>
          </div>
          <i className="fa-solid fa-book-open grades-icon" aria-hidden="true"></i>
        </div>

        <div className="grades-card need-support">
          <div>
            <h3>Need Support</h3>
            <h2>7 Students</h2>
          </div>
          <i className="fa-solid fa-triangle-exclamation grades-icon" aria-hidden="true"></i>
        </div>
      </div>

      <div className="grades-chart-panel">
        <h2>Subject Performance Overview</h2>
        <div className="grades-chart-box">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="grades-table-panel">
        <div className="grades-table-header">
          <h2>Student Results</h2>

          <div className="grades-filters">
            <div className="grades-search-wrapper">
              <input
                type="text"
                placeholder="Search student"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
            </div>

            <select value={termFilter} onChange={(e) => setTermFilter(e.target.value)}>
              <option value="all">All Terms</option>
              <option value="term1">Term 1</option>
              <option value="term2">Term 2</option>
              <option value="term3">Term 3</option>
            </select>

            <select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)}>
              <option value="all">All Subjects</option>
              <option value="math">Math</option>
              <option value="english">English</option>
              <option value="science">Science</option>
              <option value="art">Art</option>
            </select>
          </div>
        </div>

        <div className="grades-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Class</th>
                <th>Avarage</th>
                <th>Grades</th>
                <th>Subject</th>
                <th>Performance</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.length > 0 ? (
                filteredRows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.student}</td>
                    <td>{row.className}</td>
                    <td>{row.average}</td>
                    <td>{row.grade}</td>
                    <td>{row.subject}</td>
                    <td>{row.performance}</td>
                    <td>
                      <div className="grade-actions">
                        <button type="button" className="view-btn">
                          View Details
                        </button>
                        <button type="button" className="edit-btn">
                          Edit Grades
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-grade-results">
                    No grade records match your filters.
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

export default Grades;
