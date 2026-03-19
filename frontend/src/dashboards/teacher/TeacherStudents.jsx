import React, { useEffect, useMemo, useState } from "react";
import "./TeacherStudents.css";

const sampleStudents = [
	{
		id: 1,
		name: "Amina Yusuf",
		className: "S.1",
		subject: "Mathematics"
	},
	{
		id: 2,
		name: "Daniel Okafor",
		className: "S.2",
		subject: "English"
	},
	{
		id: 3,
		name: "Grace Nwosu",
		className: "S.1",
		subject: "Basic Science"
	},
	{
		id: 4,
		name: "Ibrahim Bello",
		className: "S.2",
		subject: "Physics"
	},
	{
		id: 5,
		name: "Sarah Adeyemi",
		className: "S.3",
		subject: "Biology"
	}
];

function normalizeStudent(student, index) {
	const derivedSubject =
		student.subject ??
		(Array.isArray(student.subjects) && student.subjects.length > 0 ? student.subjects[0] : "No subject");

	return {
		id: student.id ?? index + 1,
		name: student.name ?? student.fullName ?? "Unknown Student",
		className: student.className ?? student.class ?? student.level ?? "Unassigned",
		subject: derivedSubject
	};
}

function TeacherStudents() {
	const [students, setStudents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [selectedClass, setSelectedClass] = useState("All Classes");
	const [attendance, setAttendance] = useState({});
	const [marks, setMarks] = useState({});

	useEffect(() => {
		let mounted = true;

		async function loadStudents() {
			setLoading(true);
			setError("");

			try {
				const response = await fetch("/api/students");
				if (!response.ok) {
					throw new Error("Failed to fetch student records.");
				}

				const data = await response.json();
				const normalized = Array.isArray(data)
					? data.map((student, index) => normalizeStudent(student, index)).slice(0, 5)
					: [];

				if (mounted && normalized.length > 0) {
					setStudents(normalized);
					return;
				}

				if (mounted) {
					setStudents(sampleStudents);
				}
			} catch (fetchError) {
				if (mounted) {
					setStudents(sampleStudents);
					setError("Using sample students because the API is unavailable.");
				}
			} finally {
				if (mounted) {
					setLoading(false);
				}
			}
		}

		loadStudents();

		return () => {
			mounted = false;
		};
	}, []);

	const availableClasses = useMemo(() => {
		const classes = Array.from(new Set(students.map((student) => student.className)));
		return ["All Classes", ...classes];
	}, [students]);

	const filteredStudents = useMemo(() => {
		if (selectedClass === "All Classes") {
			return students;
		}

		return students.filter((student) => student.className === selectedClass);
	}, [selectedClass, students]);

	const handleAttendanceChange = (studentId, status) => {
		setAttendance((prev) => ({
			...prev,
			[studentId]: status
		}));
	};

	const handleMarkChange = (studentId, value) => {
		const numeric = Number(value);
		if (value === "") {
			setMarks((prev) => ({
				...prev,
				[studentId]: ""
			}));
			return;
		}

		if (!Number.isNaN(numeric)) {
			const bounded = Math.max(0, Math.min(100, numeric));
			setMarks((prev) => ({
				...prev,
				[studentId]: bounded
			}));
		}
	};

	return (
		<section className="teacher-students-page">
			<div className="teacher-students-header">
				<h2>Student Attendance</h2>
				<p>Search and assign marks for student.</p>
			</div>

			<div className="teacher-students-filter-row">
				<label htmlFor="classFilter">Class</label>
				<select
					id="classFilter"
					value={selectedClass}
					onChange={(event) => setSelectedClass(event.target.value)}
				>
					{availableClasses.map((className) => (
						<option key={className} value={className}>
							{className}
						</option>
					))}
				</select>
			</div>

			{error ? <p className="teacher-students-info">{error}</p> : null}

			{loading ? (
				<p className="teacher-students-info">Loading students...</p>
			) : (
				<div className="teacher-students-table-wrap">
					<table className="teacher-students-table">
						<thead>
							<tr>
								<th>Student</th>
								<th>Class</th>
								<th>Subject</th>
								<th>Marks</th>
								<th>Attendance</th>
							</tr>
						</thead>
						<tbody>
							{filteredStudents.length > 0 ? (
								filteredStudents.map((student) => (
									<tr key={student.id}>
										<td>{student.name}</td>
										<td>{student.className}</td>
										<td>{student.subject || "No subject"}</td>
										<td>
											<input
												type="number"
												min="0"
												max="100"
												className="teacher-marks-input"
												placeholder="0-100"
												value={marks[student.id] ?? ""}
												onChange={(event) => handleMarkChange(student.id, event.target.value)}
											/>
										</td>
										<td>
											<div className="attendance-buttons">
												<button
													type="button"
													className={attendance[student.id] === "Present" ? "active-present" : ""}
													onClick={() => handleAttendanceChange(student.id, "Present")}
												>
													Present
												</button>
												<button
													type="button"
													className={attendance[student.id] === "Absent" ? "active-absent" : ""}
													onClick={() => handleAttendanceChange(student.id, "Absent")}
												>
													Absent
												</button>
											</div>
										</td>
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
			)}
		</section>
	);
}

export default TeacherStudents;
