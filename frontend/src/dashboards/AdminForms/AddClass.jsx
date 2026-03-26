import React, { useState } from "react";
import "./AddClass.css";

function AddClass() {
	const [formData, setFormData] = useState({
		levelType: "",
		formLevel: "",
		stream: "",
		className: "",
		classroom: "",
		building: "",
		maxCapacity: "",
		academicYear: ""
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prev) => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log("Add class form submitted:", formData);
	};

	return (
		<div className="add-class-wrapper">
			<form className="add-class-form" onSubmit={handleSubmit}>
				<h2>Add Class</h2>

				<div className="add-class-grid">
					<div className="form-field">
						<label htmlFor="levelType">Level Type</label>
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
						<label htmlFor="stream">Stream</label>
						<select
							id="stream"
							name="stream"
							value={formData.stream}
							onChange={handleChange}
							required
						>
							<option value="">--Select--</option>
							<option value="A">A</option>
							<option value="B">B</option>
							<option value="C">C</option>
							<option value="D">D</option>
						</select>
					</div>

					<div className="form-field">
						<label htmlFor="className">Class Name</label>
						<input
							type="text"
							id="className"
							name="className"
							placeholder="e.g. Senior One A"
							value={formData.className}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="form-field">
						<label htmlFor="classroom">Classroom</label>
						<input
							type="text"
							id="classroom"
							name="classroom"
							placeholder="e.g. Room 12"
							value={formData.classroom}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="form-field">
						<label htmlFor="building">Building</label>
						<input
							type="text"
							id="building"
							name="building"
							placeholder="e.g. East Wing"
							value={formData.building}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="form-field">
						<label htmlFor="maxCapacity">Max Capacity</label>
						<input
							type="number"
							id="maxCapacity"
							name="maxCapacity"
							min="1"
							placeholder="e.g. 40"
							value={formData.maxCapacity}
							onChange={handleChange}
							required
						/>
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
				</div>

				<div className="add-class-actions">
					<button type="reset" className="secondary-btn">Reset</button>
					<button type="submit" className="primary-btn">Save Class</button>
				</div>
			</form>
		</div>
	);
}

export default AddClass;
