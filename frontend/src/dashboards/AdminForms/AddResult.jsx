import React, { useState } from "react";
import "./AddResult.css";

function AddResult() {
	const initialFormData = {
		studentId: "",
		examId: "",
		subjectId: "",
		marksObtained: "",
		term: "",
		academicYear: "",
		formLevel: "",
		levelType: "",
		remarks: ""
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
		console.log("Add result form submitted:", formData);
	};

	const handleReset = () => {
		setFormData(initialFormData);
	};

	return (
		<div className="add-result-wrapper">
			<form className="add-result-form" onSubmit={handleSubmit}>
				<h2>Add Result</h2>

				<div className="add-result-grid">
					<div className="form-field">
						<label htmlFor="studentId">StudentId</label>
						<select
							id="studentId"
							name="studentId"
							value={formData.studentId}
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
						<label htmlFor="examId">ExamId</label>
						<select
							id="examId"
							name="examId"
							value={formData.examId}
							onChange={handleChange}
							required
						>
							<option value="">--Select--</option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
						</select>
					</div>

					<div className="form-field">
						<label htmlFor="subjectId">SubjectId</label>
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
						<label htmlFor="marksObtained">MarksObtained</label>
						<input
							type="number"
							id="marksObtained"
							name="marksObtained"
							min="0"
							placeholder="e.g. 78"
							value={formData.marksObtained}
							onChange={handleChange}
							required
						/>
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
						<label htmlFor="academicYear">AcademicYear</label>
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
						<label htmlFor="formLevel">FormLevel</label>
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
						<label htmlFor="levelType">LevelType</label>
						<select
							id="levelType"
							name="levelType"
							value={formData.levelType}
							onChange={handleChange}
							required
						>
							<option value="">--Select--</option>
							<option value="O-Level">O-Level</option>
							<option value="A-Level">A-Level</option>
						</select>
					</div>

					<div className="form-field full-width">
						<label htmlFor="remarks">Remarks</label>
						<textarea
							id="remarks"
							name="remarks"
							rows="4"
							placeholder="Optional teacher remarks"
							value={formData.remarks}
							onChange={handleChange}
						/>
					</div>
				</div>

				<div className="add-result-actions">
					<button type="button" className="secondary-btn" onClick={handleReset}>
						Reset
					</button>
					<button type="submit" className="primary-btn">Save Result</button>
				</div>
			</form>
		</div>
	);
}

export default AddResult;
