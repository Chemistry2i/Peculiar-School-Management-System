import React, { useEffect, useMemo, useState } from "react";
import "./Grading.css";
import AddStudentMarks from "../../auth/AddStudentMarks";

const classOptions = ["All", "S1", "S2", "S3", "S4"];

const students = [
  { id: 1, name: "Amina N.", className: "S1" },
  { id: 2, name: "Brian K.", className: "S1" },
  { id: 3, name: "Carla M.", className: "S2" },
  { id: 4, name: "Denis O.", className: "S2" },
  { id: 5, name: "Esther P.", className: "S3" }
];

function getGrade(mark) {
  if (mark >= 80) return "A";
  if (mark >= 70) return "B";
  if (mark >= 60) return "C";
  if (mark >= 50) return "D";
  return "F";
}

function Grading() {
  const [searchText, setSearchText] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [enteredMarks, setEnteredMarks] = useState({});
  const [message, setMessage] = useState("");

  const filteredStudents = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    return students.filter((student) => {
      const matchesName = query === "" || student.name.toLowerCase().includes(query);
      const matchesClass = classFilter === "All" || student.className === classFilter;

      return matchesName && matchesClass;
    });
  }, [searchText, classFilter]);

  useEffect(() => {
    setMessage("");
  }, [searchText, classFilter]);

  const getAutoGrade = (studentId) => {
    const rawMark = enteredMarks[studentId];
    if (rawMark === undefined || rawMark === "") {
      return "-";
    }

    return getGrade(Number(rawMark));
  };

  const handleMarkChange = (studentId, value) => {
    if (value === "") {
      setEnteredMarks((prev) => ({
        ...prev,
        [studentId]: ""
      }));
      setMessage("");
      return;
    }

    const numeric = Number(value);
    if (Number.isNaN(numeric)) {
      return;
    }

    const bounded = Math.max(0, Math.min(100, numeric));
    setEnteredMarks((prev) => ({
      ...prev,
      [studentId]: bounded
    }));
    setMessage("");
  };

  const handleSave = () => {
    const entries = filteredStudents
      .filter((student) => enteredMarks[student.id] !== undefined && enteredMarks[student.id] !== "")
      .map((student) => ({
        studentId: student.id,
        studentName: student.name,
        className: student.className,
        subject: "Chemistry",
        mark: Number(enteredMarks[student.id]),
        grade: getAutoGrade(student.id)
      }));

    if (entries.length === 0) {
      setMessage("Enter at least one student mark before saving.");
      return;
    }

    const payload = {
      subject: "Chemistry",
      entries,
      status: "draft",
      savedAt: new Date().toISOString()
    };

    localStorage.setItem("teacher-chemistry-grade-draft", JSON.stringify(payload));
    setMessage("Chemistry draft saved successfully.");
  };

  const handleSubmit = () => {
    const entries = filteredStudents
      .filter((student) => enteredMarks[student.id] !== undefined && enteredMarks[student.id] !== "")
      .map((student) => ({
        studentId: student.id,
        studentName: student.name,
        className: student.className,
        subject: "Chemistry",
        mark: Number(enteredMarks[student.id]),
        grade: getAutoGrade(student.id)
      }));

    if (entries.length === 0) {
      setMessage("Enter at least one student mark before submitting.");
      return;
    }

    const payload = {
      subject: "Chemistry",
      entries,
      status: "submitted",
      submittedAt: new Date().toISOString()
    };

    localStorage.setItem("teacher-chemistry-grade-submitted", JSON.stringify(payload));
    setMessage("Chemistry grades submitted successfully.");
  };

  return (
    <div className="grading-card">
      <div className="grading-header-row">
        <div>
          <h2>Grading Student</h2>
          <p>Enter student marks and review the grades.</p>
        </div>
      </div>
{/* 
      <div className="grading-add-student-row">
        <button type="button" className="add-student-btn">Add Student</button>
      </div> */}

            <div>
              <button className="btn btn-primary btn-l rounded-4" data-bs-toggle="modal" data-bs-target="#addstudentModal">Add New Student</button>
            </div>

            <div className="modal fade" id="addstudentModal" tabIndex="-1">
              <div className="modal-dialog modal-xl">

                <div className="modal-content">

                  <div className="modal-header">  
                      <h3 className="modal-title">Students Details</h3>
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

      <div className="grading-filters-grid">
        <div className="grading-field">
          <label htmlFor="student-search">Search Student</label>
          <input
            id="student-search"
            type="text"
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
              setMessage("");
            }}
            placeholder="Search by name"
          />
        </div>

        <div className="grading-field">
          <label htmlFor="class-filter">Class Filter</label>
          <select
            id="class-filter"
            value={classFilter}
            onChange={(event) => {
              setClassFilter(event.target.value);
              setMessage("");
            }}
          >
            {classOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

      </div>

      <div className="student-table-section">
        <label className="table-label">Students Table</label>
        <div className="teacher-students-table-wrap">
          <table className="teacher-students-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Class</th>
                <th>Subject</th>
                <th>Marks</th>
                <th>Auto Grade</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.className}</td>
                    <td>Chemistry</td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        className="grading-marks-input"
                        placeholder="0-100"
                        value={enteredMarks[student.id] ?? ""}
                        onChange={(event) => handleMarkChange(student.id, event.target.value)}
                      />
                    </td>
                    <td>{getAutoGrade(student.id)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="teacher-students-empty">
                    No students found for this class.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="grading-actions">
          <button className="save-btn" onClick={handleSave}>Save</button>
          <button className="submit-btn" onClick={handleSubmit}>Submit</button>
        </div>
      </div>

      {message && <p className="grading-message">{message}</p>}
    </div>
  );
}

export default Grading;