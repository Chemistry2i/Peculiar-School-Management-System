import React, { useEffect, useMemo, useState } from "react";
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

const Grades = () => {
  const [gradeRows, setGradeRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [termFilter, setTermFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('authToken');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        const response = await fetch('http://localhost:8080/api/results', { headers });

        if (response.ok) {
           const data = await response.json();
           // data needs to be mapped to the UI shape
           // UI expected shape: { id, student, className, average, subject, term }
           const mappedData = data.map(res => ({
               id: String(res.id),
               student: res.studentNumber || `Student-${res.studentId}`, // fallback
               className: res.className || "N/A",
               average: res.percentage || 0,
               subject: res.subjectName || res.subjectCode,
               term: `Term ${res.term}`, // backend sends integer term
               grade: res.grade,
               remarks: res.remarks
           }));
           setGradeRows(mappedData);
        } else {
            console.error("Failed to fetch results");
        }
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  const getGradeLabel = (average) => {
    if (average >= 70) return "A";
    if (average >= 60) return "B";
    if (average >= 50) return "C";
    return "D";
  };

  const getPerformanceLabel = (average) => {
    if (average >= 75) return "Top Performer";
    if (average >= 65) return "Excellent";
    if (average >= 55) return "Good";
    if (average >= 50) return "Fair";
    return "Needs Support";
  };

  const handleAverageChange = (rowId, value) => {
    const numericValue = Number(value);
    if (Number.isNaN(numericValue)) {
      return;
    }

    const boundedValue = Math.max(0, Math.min(100, numericValue));
    setGradeRows((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, average: boundedValue } : row))
    );
  };

  const classAverage = useMemo(() => {
    if (gradeRows.length === 0) return 0;
    const sum = gradeRows.reduce((total, row) => total + row.average, 0);
    return Math.round(sum / gradeRows.length);
  }, [gradeRows]);

  const topPerformance = useMemo(() => {
    if (gradeRows.length === 0) return 0;
    return Math.max(...gradeRows.map((row) => row.average));
  }, [gradeRows]);

  const subjectsAssessed = useMemo(() => {
    return new Set(gradeRows.map((row) => row.subject)).size;
  }, [gradeRows]);

  const needSupportCount = useMemo(() => {
    return gradeRows.filter((row) => row.average < 50).length;
  }, [gradeRows]);

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
            <h2>{`${classAverage}%`}</h2>
          </div>
          <i className="fa-solid fa-chart-line grades-icon" aria-hidden="true"></i>
        </div>

        <div className="grades-card top-performance">
          <div>
            <h3>Top Performance</h3>
            <h2>{topPerformance}</h2>
          </div>
          <i className="fa-solid fa-trophy grades-icon" aria-hidden="true"></i>
        </div>

        <div className="grades-card subjects-assessed">
          <div>
            <h3>Subjects Assessed</h3>
            <h2>{subjectsAssessed}</h2>
          </div>
          <i className="fa-solid fa-book-open grades-icon" aria-hidden="true"></i>
        </div>

        <div className="grades-card need-support">
          <div>
            <h3>Need Support</h3>
            <h2>{needSupportCount}</h2>
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
                    <td>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={row.average}
                        onChange={(event) => handleAverageChange(row.id, event.target.value)}
                        className="grade-input"
                      />
                    </td>
                    <td>{getGradeLabel(row.average)}</td>
                    <td>{row.subject}</td>
                    <td>{getPerformanceLabel(row.average)}</td>
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
