import React, { useState } from "react";
import "./AddCourse.css";

function AddCourse() {
	const initialFormData = {
		courseCode: "",
		courseName: "",
		description: "",
		category: "",
		principal1Id: "",
		subsidiary1Id: ""
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
		console.log("Add course form submitted:", formData);
	};

	const handleReset = () => {
		setFormData(initialFormData);
	};

	return (
		<div className="add-course-wrapper">
			<form className="add-course-form" onSubmit={handleSubmit}>
				<h2>Add Course</h2>

				<div className="add-course-grid">
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

					<div className="form-field full-width">
						<label htmlFor="description">Description</label>
						<textarea
							id="description"
							name="description"
							placeholder="Brief description of the course"
							value={formData.description}
							onChange={handleChange}
							rows="4"
							required
						/>
					</div>

					<div className="form-field">
						<label htmlFor="category">Category</label>
						<select
							id="category"
							name="category"
							value={formData.category}
							onChange={handleChange}
							required
						>
							<option value="">--Select--</option>
							<option value="Science">Science</option>
							<option value="Arts">Arts</option>
							<option value="Commercial">Commercial</option>
							<option value="Vocational">Vocational</option>
						</select>
					</div>

					<div className="form-field">
						<label htmlFor="principal1Id">principleId</label>
						<select
							id="principal1Id"
							name="principal1Id"
							value={formData.principal1Id}
							onChange={handleChange}
							required
						>
							<option value="">--Select--</option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
						</select>
					</div>

					<div className="form-field">
						<label htmlFor="subsidiary1Id">subsidiaryId</label>
						<select
							id="subsidiary1Id"
							name="subsidiary1Id"
							value={formData.subsidiary1Id}
							onChange={handleChange}
							required
						>
							<option value="">--Select--</option>
							<option value="4">4</option>
						</select>
					</div>
				</div>

				<div className="add-course-actions">
					<button type="button" className="secondary-btn" onClick={handleReset}>
						Reset
					</button>
					<button type="submit" className="primary-btn">Save Course</button>
				</div>
			</form>
		</div>
	);
}

export default AddCourse;
