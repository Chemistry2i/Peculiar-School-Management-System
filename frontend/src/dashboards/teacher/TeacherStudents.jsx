import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./TeacherStudents.css";

const API_BASE_URL = 'http://localhost:8080/api';

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
	// Use className (computed from schoolClass, properly synced)
	// Falls back to other fields for backward compatibility
	const className = student.className || 
	                 student.schoolClass?.name ||
	                 student.currentClass || 
	                 student.class || 
	                 student.level || 
	                 "Unassigned";

	const derivedSubject =
		student.subject ??
		(Array.isArray(student.subjects) && student.subjects.length > 0 ? student.subjects[0] : "No subject");

	return {
		id: student.id ?? index + 1,
		name: student.name ?? student.fullName ?? "Unknown Student",
		className: className,  // ← NOW PROPERLY SYNCED
		subject: derivedSubject,
		schoolClassId: student.schoolClass?.id,  // For operations via relationship
	};
}

function TeacherStudents() {
	const { user } = useAuth();
	const [students, setStudents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [selectedClass, setSelectedClass] = useState("All Classes");
	const [attendance, setAttendance] = useState({});
	const [teacherClasses, setTeacherClasses] = useState([]);

	// Fetch teacher's assigned classes
	useEffect(() => {
		let mounted = true;

		async function loadTeacherClasses() {
			if (!user?.id) {
				setLoading(false);
				return;
			}

			try {
				const token = localStorage.getItem('accessToken');
				const response = await fetch(`${API_BASE_URL}/teachers/${user.id}/classes`, {
					headers: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json',
					}
				});

				if (response.ok) {
					const data = await response.json();
					const classes = Array.isArray(data) ? data : data.classes || [];
					if (mounted) {
						setTeacherClasses(classes);
						console.log('Teacher classes loaded:', classes);
					}
				} else {
					console.warn('Failed to fetch teacher classes');
					if (mounted) {
						setTeacherClasses([]);
					}
				}
			} catch (err) {
				console.error('Error fetching teacher classes:', err);
				if (mounted) {
					setTeacherClasses([]);
				}
			}
		}

		loadTeacherClasses();

		return () => {
			mounted = false;
		};
	}, [user]);

	// Fetch students for the teacher's classes
	useEffect(() => {
		let mounted = true;

		async function loadStudents() {
			if (teacherClasses.length === 0) {
				setLoading(false);
				return;
			}

			setLoading(true);
			setError("");

			try {
				const token = localStorage.getItem('accessToken');
				const allStudents = [];

				// Fetch students for each assigned class
				for (const className of teacherClasses) {
					const response = await fetch(`${API_BASE_URL}/students/class/${className}`, {
						headers: {
							'Authorization': `Bearer ${token}`,
							'Content-Type': 'application/json',
						}
					});

					if (response.ok) {
						const data = await response.json();
						const classStudents = Array.isArray(data) 
							? data 
							: (data.students || []);
						allStudents.push(...classStudents);
					}
				}

				const normalized = allStudents
					.map((student, index) => normalizeStudent(student, index));

				if (mounted && normalized.length > 0) {
					setStudents(normalized);
					console.log('Students loaded:', normalized);
					return;
				}

				if (mounted) {
					setStudents(sampleStudents);
					setError("No students found in your assigned classes");
				}
			} catch (fetchError) {
				console.error('Error fetching students:', fetchError);
				if (mounted) {
					setStudents(sampleStudents);
					setError("Using sample students because the API is temporarily unavailable.");
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
	}, [teacherClasses]);

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

	return (
		<section className="teacher-students-page">
			<div className="teacher-students-header">
				<h2>Student Attendance</h2>
				<p>View students and track attendance.</p>
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
									<td colSpan="4" className="teacher-students-empty">
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
