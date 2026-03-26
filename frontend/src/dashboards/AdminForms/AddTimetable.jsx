import React, { useState } from "react";
import "./AddTimetable.css";

function AddTimetable() {
	const initialFormData = {
		classname: "",
		subjectId: "",
		teacherId: "",
		dayofTheWeek: "",
		starttime: "",
		endtime: "",
		room: "",
		term: "",
		academicYear: ""
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
		console.log("Add timetable form submitted:", formData);
	};

	const handleReset = () => {
		setFormData(initialFormData);
	};

	return (
		<div className="add-timetable-wrapper">
			<form className="add-timetable-form" onSubmit={handleSubmit}>
				<h2>Add Timetable</h2>

				<div className="add-timetable-grid">
					<div className="form-field">
						<label htmlFor="classname">Classname</label>
						<select
							id="classname"
							name="classname"
							value={formData.classname}
							onChange={handleChange}
							required
						>
							<option value="">--Select--</option>
							<option value="Senior One A">Senior One A</option>
							<option value="Senior One B">Senior One B</option>
							<option value="Senior Two A">Senior Two A</option>
							<option value="Senior Two B">Senior Two B</option>
							<option value="Senior Three A">Senior Three A</option>
							<option value="Senior Four A">Senior Four A</option>
							<option value="Senior Five A">Senior Five A</option>
							<option value="Senior Six A">Senior Six A</option>
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
						<label htmlFor="teacherId">TeacherId</label>
						<select
							id="teacherId"
							name="teacherId"
							value={formData.teacherId}
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
						<label htmlFor="dayofTheWeek">Day of the Week</label>
						<select
							id="dayofTheWeek"
							name="dayofTheWeek"
							value={formData.dayofTheWeek}
							onChange={handleChange}
							required
						>
							<option value="">--Select--</option>
							<option value="Monday">Monday</option>
							<option value="Tuesday">Tuesday</option>
							<option value="Wednesday">Wednesday</option>
							<option value="Thursday">Thursday</option>
							<option value="Friday">Friday</option>
							<option value="Saturday">Saturday</option>
						</select>
					</div>

					<div className="form-field">
						<label htmlFor="starttime">Starttime</label>
						<input
							type="time"
							id="starttime"
							name="starttime"
							value={formData.starttime}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="form-field">
						<label htmlFor="endtime">Endtime</label>
						<input
							type="time"
							id="endtime"
							name="endtime"
							value={formData.endtime}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="form-field">
						<label htmlFor="room">Room</label>
						<input
							type="text"
							id="room"
							name="room"
							placeholder="e.g. Lab 2"
							value={formData.room}
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
				</div>

				<div className="add-timetable-actions">
					<button type="button" className="secondary-btn" onClick={handleReset}>
						Reset
					</button>
					<button type="submit" className="primary-btn">Save Timetable</button>
				</div>
			</form>
		</div>
	);
}

export default AddTimetable;
