import React, { useEffect, useMemo, useState } from "react";
import "./Grading.css";
import AddStudentMarks from "../../auth/AddStudentMarks";

const API_BASE_URL = "http://localhost:8080/api";

// Grade calculation function
function getGrade(mark) {
  // O-Level grading scale
  if (mark >= 80) return "D1";
  if (mark >= 70) return "D2";
  if (mark >= 65) return "C3";
  if (mark >= 60) return "C4";
  if (mark >= 55) return "C5";
  if (mark >= 50) return "C6";
  if (mark >= 40) return "P7";
  if (mark >= 34) return "P8";
  return "F9";
}

function Grading() {
  const [searchText, setSearchText] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [enteredMarks, setEnteredMarks] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  
  // Data from backend
  const [students, setStudents] = useState([]);
  const [classOptions, setClassOptions] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [subject, setSubject] = useState("Mathematics"); // Default subject
  const [subjects, setSubjects] = useState(["Mathematics", "English", "Chemistry", "Physics", "Biology"]);

  // Fetch students and classes from backend on mount
  useEffect(() => {
    fetchStudentsAndClasses();
  }, []);

  const fetchStudentsAndClasses = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/students`);
      if (!response.ok) throw new Error("Failed to fetch students");
      
      const data = await response.json();
      const studentList = (data.students || []).map((student) => ({
        id: student.id,
        name: `${student.firstName || ""} ${student.lastName || ""}`.trim(),
        className: student.currentClass || student.className || "Unassigned",
        studentId: student.student_id || student.studentId || `STU${student.id}`,
      }));

      setStudents(studentList);
      setError("");

      // Extract unique classes
      const uniqueClasses = [...new Set(studentList.map((s) => s.className))].sort();
      setClassOptions(["All", ...uniqueClasses]);
      
      console.log("Students loaded:", studentList);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError("Failed to load students from backend");
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    return students.filter((student) => {
      const matchesName = query === "" || student.name.toLowerCase().includes(query);
      const matchesClass = classFilter === "All" || student.className === classFilter;

      return matchesName && matchesClass;
    });
  }, [searchText, classFilter, students]);

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

  const handleSave = async () => {
    const entries = filteredStudents
      .filter((student) => enteredMarks[student.id] !== undefined && enteredMarks[student.id] !== "")
      .map((student) => ({
        studentId: student.id,
        subjectCode: subject,  // Map 'subject' to 'subjectCode'
        subjectName: subject,  // Also send subject name for reference
        marksObtained: Number(enteredMarks[student.id]),  // Map 'marks' to 'marksObtained'
        grade: getAutoGrade(student.id),
        className: student.className,  // Add required className
        term: 1,
        academicYear: new Date().getFullYear().toString(),
        gradingScale: "O_LEVEL",  // Add required grading scale
        examId: 1,  // TODO: Get actual exam ID from context or API
        maxMarks: 100,  // Add max marks
        isPrincipal: false,
        isSubsidiary: false,
      }));

    if (entries.length === 0) {
      setMessage("Enter at least one student mark before saving.");
      setMessageType("error");
      return;
    }

    try {
      setSubmitting(true);
      
      // Save as draft to localStorage for quick access
      const payload = {
        subject: subject,
        entries,
        status: "draft",
        savedAt: new Date().toISOString()
      };

      localStorage.setItem(`teacher-${subject}-grade-draft`, JSON.stringify(payload));
      setMessage(`${entries.length} marks saved as draft for ${subject}`);
      setMessageType("success");
    } catch (err) {
      setMessage("Failed to save marks");
      setMessageType("error");
      console.error("Error saving marks:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    const entries = filteredStudents
      .filter((student) => enteredMarks[student.id] !== undefined && enteredMarks[student.id] !== "")
      .map((student) => ({
        studentId: student.id,
        subjectCode: subject,  // Map 'subject' to 'subjectCode'
        subjectName: subject,  // Also send subject name for reference
        marksObtained: Number(enteredMarks[student.id]),  // Map 'marks' to 'marksObtained'
        grade: getAutoGrade(student.id),
        className: student.className,  // Add required className
        term: 1,
        academicYear: new Date().getFullYear().toString(),
        gradingScale: "O_LEVEL",  // Add required grading scale
        examId: 1,  // TODO: Get actual exam ID from context or API
        maxMarks: 100,  // Add max marks
        isPrincipal: false,
        isSubsidiary: false,
      }));

    if (entries.length === 0) {
      setMessage("Enter at least one student mark before submitting.");
      setMessageType("error");
      return;
    }

    try {
      setSubmitting(true);
      
      // Submit to backend
      const response = await fetch(`${API_BASE_URL}/results/bulk`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entries),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit marks");
      }

      const result = await response.json();
      
      // Also save to localStorage for backup
      const payload = {
        subject: subject,
        entries,
        status: "submitted",
        submittedAt: new Date().toISOString()
      };
      localStorage.setItem(`teacher-${subject}-grade-submitted`, JSON.stringify(payload));

      setMessage(`${entries.length} marks submitted successfully for ${subject}!`);
      setMessageType("success");
      
      console.log("Marks submitted successfully:", result);
      
      // Clear entered marks after successful submission
      setTimeout(() => {
        setEnteredMarks({});
      }, 1500);
    } catch (err) {
      setMessage(`Failed to submit marks: ${err.message}`);
      setMessageType("error");
      console.error("Error submitting marks:", err);
    } finally {
      setSubmitting(false);
    }
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

        <div className="grading-field">
          <label htmlFor="subject-select">Subject</label>
          <select
            id="subject-select"
            value={subject}
            onChange={(event) => {
              setSubject(event.target.value);
              setMessage("");
              setEnteredMarks({});
            }}
          >
            {subjects.map((subj) => (
              <option key={subj} value={subj}>
                {subj}
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
                    <td>{subject}</td>
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
          <button 
            className="save-btn" 
            onClick={handleSave}
            disabled={submitting || loading}
          >
            {submitting ? "Saving..." : "Save"}
          </button>
          <button 
            className="submit-btn" 
            onClick={handleSubmit}
            disabled={submitting || loading}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>

      {loading && <p className="grading-message grading-message-info">Loading students...</p>}
      {error && <p className="grading-message grading-message-error">{error}</p>}
      {message && (
        <p className={`grading-message grading-message-${messageType}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Grading;