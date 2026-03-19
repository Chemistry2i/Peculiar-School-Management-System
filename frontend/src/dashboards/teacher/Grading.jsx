import React, { useEffect, useMemo, useState } from "react";
import "./Grading.css";

const classOptions = ["All", "S1", "S2", "S3", "S4"];
const subjectOptions = ["All", "Math", "Chemistry", "Computer", "History"];

const students = [
  { id: 1, name: "Amina N.", className: "S1", scores: { Math: 76, Chemistry: 71, Computer: 84, History: 67 } },
  { id: 2, name: "Brian K.", className: "S1", scores: { Math: 89, Chemistry: 62, Computer: 78, History: 73 } },
  { id: 3, name: "Carla M.", className: "S2", scores: { Math: 58, Chemistry: 65, Computer: 69, History: 80 } },
  { id: 4, name: "Denis O.", className: "S2", scores: { Math: 92, Chemistry: 87, Computer: 90, History: 88 } },
  { id: 5, name: "Esther P.", className: "S3", scores: { Math: 47, Chemistry: 52, Computer: 64, History: 59 } },
  { id: 6, name: "Farouk T.", className: "S3", scores: { Math: 70, Chemistry: 74, Computer: 72, History: 69 } },
  { id: 7, name: "Gloria S.", className: "S4", scores: { Math: 81, Chemistry: 79, Computer: 92, History: 85 } },
  { id: 8, name: "Hassan R.", className: "S4", scores: { Math: 66, Chemistry: 61, Computer: 75, History: 63 } },
  { id: 9, name: "Isaac B.", className: "S2", scores: { Math: 54, Chemistry: 58, Computer: 57, History: 62 } },
  { id: 10, name: "Janet L.", className: "S1", scores: { Math: 95, Chemistry: 91, Computer: 88, History: 90 } },
];

function getGrade(mark) {
  if (mark >= 80) return "A";
  if (mark >= 70) return "B";
  if (mark >= 60) return "C";
  if (mark >= 50) return "D";
  return "F";
}

function getAverageScore(scores) {
  const values = Object.values(scores);
  if (!values.length) {
    return 0;
  }

  const total = values.reduce((sum, value) => sum + value, 0);
  return Math.round(total / values.length);
}

function Grading() {
  const [searchText, setSearchText] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [mark, setMark] = useState("");
  const [enteredMarks, setEnteredMarks] = useState({});
  const [message, setMessage] = useState("");

  const getStudentMark = (student, subject) => {
    const key = `${student.id}-${subject}`;
    if (Object.prototype.hasOwnProperty.call(enteredMarks, key)) {
      return Number(enteredMarks[key]);
    }

    if (subject === "All") {
      return getAverageScore(student.scores);
    }

    return student.scores[subject];
  };

  const filteredStudents = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    return students.filter((student) => {
      const matchesName = query === "" || student.name.toLowerCase().includes(query);
      const matchesClass = classFilter === "All" || student.className === classFilter;

      return matchesName && matchesClass;
    });
  }, [searchText, classFilter]);

  useEffect(() => {
    if (!selectedStudent) {
      return;
    }

    setMark(String(getStudentMark(selectedStudent, subjectFilter)));
  }, [subjectFilter]);

  const autoGrade = mark === "" ? "-" : getGrade(Number(mark));

  const handleSave = () => {
    if (!selectedStudent || mark === "") {
      setMessage("Select a student and enter marks before saving.");
      return;
    }

    const payload = {
      student: selectedStudent,
      className: selectedStudent.className,
      subject: subjectFilter,
      mark: Number(mark),
      grade: autoGrade,
      status: "draft",
      savedAt: new Date().toISOString(),
    };

    localStorage.setItem("teacher-grade-draft", JSON.stringify(payload));
    setMessage("Draft saved successfully.");
  };

  const handleSubmit = () => {
    if (!selectedStudent || mark === "") {
      setMessage("Select a student and enter marks before submitting.");
      return;
    }

    const payload = {
      student: selectedStudent,
      className: selectedStudent.className,
      subject: subjectFilter,
      mark: Number(mark),
      grade: autoGrade,
      status: "submitted",
      submittedAt: new Date().toISOString(),
    };

    localStorage.setItem("teacher-grade-submitted", JSON.stringify(payload));
    setMessage("Grades submitted successfully.");
  };

  return (
    <div className="grading-card">
      <div className="grading-header-row">
        <div>
          <h2>Student Grading</h2>
          <p>Search and Grade Your student.</p>
        </div>
        <button type="button" className="add-student-btn">Add Grade</button>
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

        <div className="grading-field">
          <label htmlFor="subject-filter">Subject Filter</label>
          <select
            id="subject-filter"
            value={subjectFilter}
            onChange={(event) => {
              setSubjectFilter(event.target.value);
              setMessage("");
            }}
          >
            {subjectOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

      </div>

      <div className="student-table-section">
        <label className="table-label">Students Table</label>
        <div className="student-table-wrap">
          <table className="student-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Class</th>
                <th>{subjectFilter} Mark</th>
                <th>Grade</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => {
                const subjectMark = getStudentMark(student, subjectFilter);

                return (
                  <tr key={student.id} className={selectedStudent?.id === student.id ? "table-row-selected" : ""}>
                    <td>{student.name}</td>
                    <td>{student.className}</td>
                    <td>{subjectMark}</td>
                    <td>{getGrade(subjectMark)}</td>
                    <td>
                      <div className="student-action-buttons">
                        <button
                          type="button"
                          className="choose-student-btn"
                          onClick={() => {
                            setSelectedStudent(student);
                            setMark(String(subjectMark));
                            setMessage("");
                          }}
                        >
                          Select
                        </button>
                        {selectedStudent?.id === student.id && (
                          <button
                            type="button"
                            className="unselect-student-btn"
                            onClick={() => {
                              setSelectedStudent(null);
                              setMark("");
                              setMessage("");
                            }}
                          >
                            Unselect
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grading-grid">
        <div className="grading-field">
          <label>Selected Student</label>
          <div className="selected-student-box">
            {selectedStudent ? `${selectedStudent.name} (${selectedStudent.className})` : "Select one student from table"}
          </div>
        </div>

        <div className="grading-field">
          <label htmlFor="marks-input">Marks</label>
          <input
            id="marks-input"
            type="number"
            min="0"
            max="100"
            value={mark}
            onChange={(event) => {
              const rawValue = event.target.value;
              if (rawValue === "") {
                setMark("");
                setMessage("");
                return;
              }

              const numeric = Math.max(0, Math.min(100, Number(rawValue)));
              setMark(String(numeric));
              if (selectedStudent) {
                const key = `${selectedStudent.id}-${subjectFilter}`;
                setEnteredMarks((prev) => ({ ...prev, [key]: numeric }));
              }
              setMessage("");
            }}
            placeholder="0 - 100"
          />
        </div>

        <div className="grading-field">
          <label>Auto Grade</label>
          <div className="grade-pill">{autoGrade}</div>
        </div>
      </div>

      <div className="grading-actions">
        <button className="save-btn" onClick={handleSave}>Save</button>
        <button className="submit-btn" onClick={handleSubmit}>Submit</button>
      </div>

      {message && <p className="grading-message">{message}</p>}
    </div>
  );
}

export default Grading;