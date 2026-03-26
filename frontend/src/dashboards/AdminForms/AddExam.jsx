import React, { useState } from "react";
import "./AddExam.css";

function AddExam() {
	const initialFormData = {
		courseCode: "",
		courseName: "",
		examType: "",
		term: "",
		academicYear: "",
		formLevel: "",
		subjectId: "",
		examDate: "",
		startTime: "",
		endTime: "",
		duration: "",
		totalMarks: "",
		passMark: ""
	};

	const [formData, setFormData] = useState(initialFormData);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prev) => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log("Add exam form submitted:", formData);
	};

	const handleReset = () => {
		setFormData(initialFormData);
	};

	return (
		<div className="add-exam-wrapper">
			<form className="add-exam-form" onSubmit={handleSubmit}>
				<h2>Add Exam</h2>

				<div className="add-exam-grid">
					<div className="form-field">
						<label htmlFor="courseCode">Course Code</label>
						<input
							type="text"
							id="courseCode"
							name="courseCode"
							placeholder="e.g. MAT101"
							value={formData.courseCode}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="form-field">
						<label htmlFor="courseName">Course Name</label>
						<input
							type="text"
							id="courseName"
							name="courseName"
							placeholder="e.g. Mathematics"
							value={formData.courseName}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="form-field">
						<label htmlFor="examType">Exam Type</label>
						<select
							id="examType"
							name="examType"
							value={formData.examType}
							onChange={handleChange}
							required
						>
							<option value="">--Select--</option>
							<option value="Quiz">Quiz</option>
							<option value="Midterm">Midterm</option>
							<option value="Final">Final</option>
							<option value="Practical">Practical</option>
						</select>
					</div>

					<div className="form-field">
						<label htmlFor="term">Term</label>
						<select
							id="term"
							name="term"
							value={formData.term}
							onChange={handleChange}
							required
						>
							<option value="">--Select--</option>
							<option value="Term 1">Term 1</option>
							<option value="Term 2">Term 2</option>
							<option value="Term 3">Term 3</option>
						</select>
					</div>

					<div className="form-field">
						<label htmlFor="academicYear">Academic Year</label>
						<select
							id="academicYear"
							name="academicYear"
							value={formData.academicYear}
							onChange={handleChange}
							required
						>
							<option value="">--Select--</option>
							<option value="2025/2026">2025/2026</option>
							<option value="2026/2027">2026/2027</option>
							<option value="2027/2028">2027/2028</option>
						</select>
					</div>

					<div className="form-field">
						<label htmlFor="formLevel">Form Level</label>
						<select
							id="formLevel"
							name="formLevel"
							value={formData.formLevel}
							onChange={handleChange}
							required
						>
							<option value="">--Select--</option>
							<option value="S1">S1</option>
							<option value="S2">S2</option>
							<option value="S3">S3</option>
							<option value="S4">S4</option>
							<option value="S5">S5</option>
							<option value="S6">S6</option>
						</select>
					</div>

					<div className="form-field">
						<label htmlFor="subjectId">Subject ID</label>
						<select
							id="subjectId"
							name="subjectId"
							value={formData.subjectId}
							onChange={handleChange}
							required
						>
							<option value="">--Select--</option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
						</select>
					</div>

					<div className="form-field">
						<label htmlFor="examDate">Exam Date</label>
						<input
							type="date"
							id="examDate"
							name="examDate"
							value={formData.examDate}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="form-field">
						<label htmlFor="startTime">Start Time</label>
						<input
							type="time"
							id="startTime"
							name="startTime"
							value={formData.startTime}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="form-field">
						<label htmlFor="endTime">End Time</label>
						<input
							type="time"
							id="endTime"
							name="endTime"
							value={formData.endTime}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="form-field">
						<label htmlFor="duration">Duration (minutes)</label>
						<input
							type="number"
							id="duration"
							name="duration"
							min="1"
							placeholder="e.g. 120"
							value={formData.duration}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="form-field">
						<label htmlFor="totalMarks">Total Marks</label>
						<input
							type="number"
							id="totalMarks"
							name="totalMarks"
							min="1"
							placeholder="e.g. 100"
							value={formData.totalMarks}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="form-field">
						<label htmlFor="passMark">Pass Mark</label>
						<input
							type="number"
							id="passMark"
							name="passMark"
							min="0"
							placeholder="e.g. 50"
							value={formData.passMark}
							onChange={handleChange}
							required
						/>
					</div>
				</div>

				<div className="add-exam-actions">
					<button type="button" className="secondary-btn" onClick={handleReset}>
						Reset
					</button>
					<button type="submit" className="primary-btn">Save Exam</button>
				</div>
			</form>
		</div>
	);
}

export default AddExam;
