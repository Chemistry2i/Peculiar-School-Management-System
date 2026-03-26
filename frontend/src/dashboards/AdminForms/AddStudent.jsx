import React, { useState } from "react";
import "./AddStudent.css";

function AddStudent() {
	const initialFormData = {
		firstName: "",
		LastName: "",
		password: "",
		dateofbirth: "",
		gender: "",
		nationality: "",
		curentclass: "",
		formlevel: "",
		leveltype: ""
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
		console.log("Add student form submitted:", formData);
	};

	const handleReset = () => {
		setFormData(initialFormData);
	};

	return (
		<div className="add-student-wrapper">
			<form className="add-student-form" onSubmit={handleSubmit}>
				<h2>Add Student</h2>

				<div className="add-student-grid">
					<div className="form-field">
						<label htmlFor="firstName">FirstName</label>
						<input
							type="text"
							id="firstName"
							name="firstName"
							placeholder="e.g. John"
							value={formData.firstName}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="form-field">
						<label htmlFor="LastName">LastName</label>
						<input
							type="text"
							id="LastName"
							name="LastName"
							placeholder="e.g. Doe"
							value={formData.LastName}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="form-field">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							name="password"
							placeholder="Enter password"
							value={formData.password}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="form-field">
						<label htmlFor="dateofbirth">Dateofbirth</label>
						<input
							type="date"
							id="dateofbirth"
							name="dateofbirth"
							value={formData.dateofbirth}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="form-field">
						<label htmlFor="gender">Gender</label>
						<select
							id="gender"
							name="gender"
							value={formData.gender}
							onChange={handleChange}
							required
						>
							<option value="">--Select--</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
						</select>
					</div>

					<div className="form-field">
						<label htmlFor="nationality">Nationality</label>
						<select
							id="nationality"
							name="nationality"
							value={formData.nationality}
							onChange={handleChange}
							required
						>
							<option value="">--Select--</option>
							<option value="Ugandan">Ugandan</option>
							<option value="Kenyan">Kenyan</option>
							<option value="Tanzanian">Tanzanian</option>
							<option value="Rwandan">Rwandan</option>
							<option value="South Sudanese">South Sudanese</option>
						</select>
					</div>

					<div className="form-field">
						<label htmlFor="curentclass">Curentclass</label>
						<select
							id="curentclass"
							name="curentclass"
							value={formData.curentclass}
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
						<label htmlFor="formlevel">Formlevel</label>
						<select
							id="formlevel"
							name="formlevel"
							value={formData.formlevel}
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
						<label htmlFor="leveltype">Leveltype</label>
						<select
							id="leveltype"
							name="leveltype"
							value={formData.leveltype}
							onChange={handleChange}
							required
						>
							<option value="">--Select--</option>
							<option value="O-Level">O-Level</option>
							<option value="A-Level">A-Level</option>
						</select>
					</div>
				</div>

				<div className="add-student-actions">
					<button type="button" className="secondary-btn" onClick={handleReset}>
						Reset
					</button>
					<button type="submit" className="primary-btn">Save Student</button>
				</div>
			</form>
		</div>
	);
}

export default AddStudent;
