import React from "react";

function Grades() {
    const grades = [
        { course: "Mathematics", midterm: 85, exam: 82, assignment: 90, final: 85.7 },
        { course: "Science", midterm: 88, exam: 85, assignment: 92, final: 88.3 },
        { course: "English", midterm: 92, exam: 88, assignment: 95, final: 91.7 },
        { course: "History", midterm: 80, exam: 78, assignment: 85, final: 81.0 },
        { course: "Physics", midterm: 84, exam: 86, assignment: 88, final: 86.0 },
        { course: "Chemistry", midterm: 89, exam: 91, assignment: 90, final: 90.0 },
    ];

    const getGradeColor = (score) => {
        if (score >= 90) return '#10b981';
        if (score >= 80) return '#3b82f6';
        if (score >= 70) return '#f59e0b';
        return '#ef4444';
    };

    return (
        <div className="container-fluid">
            <div className="page-header">
                <div>
                    <h1><i className="fa-solid fa-marker"></i> My Grades</h1>
                    <p>View your academic performance</p>
                </div>
                <div>
                    <h3 style={{ color: '#2c4ebb', margin: 0 }}>GPA: 3.8</h3>
                </div>
            </div>

            <div className="card">
                <div className="table-responsive">
                    <table className="performance-table">
                        <thead>
                            <tr>
                                <th>Course</th>
                                <th>Midterm</th>
                                <th>Exam</th>
                                <th>Assignment</th>
                                <th>Final Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {grades.map((grade, idx) => (
                                <tr key={idx}>
                                    <td><strong>{grade.course}</strong></td>
                                    <td>
                                        <span className="score" style={{ backgroundColor: getGradeColor(grade.midterm) + '20', color: getGradeColor(grade.midterm) }}>
                                            {grade.midterm}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="score" style={{ backgroundColor: getGradeColor(grade.exam) + '20', color: getGradeColor(grade.exam) }}>
                                            {grade.exam}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="score" style={{ backgroundColor: getGradeColor(grade.assignment) + '20', color: getGradeColor(grade.assignment) }}>
                                            {grade.assignment}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="score-highlight" style={{ backgroundColor: getGradeColor(grade.final) + '20', color: getGradeColor(grade.final) }}>
                                            {grade.final}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Grades;
