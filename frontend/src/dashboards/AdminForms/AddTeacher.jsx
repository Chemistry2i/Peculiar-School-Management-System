import React, { useState } from "react";
import "./AddTeacher.css";

function AddTeacher() {
	const initialFormData = {
		firstname: "",
		lastname: "",
		email: "",
		password: "",
		dateofbirth: "",
		gender: "",
		nationality: "",
		qualification: "",
		spacialisation: "",
		department: "",
		hiredate: ""
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
		console.log("Add teacher form submitted:", formData);
	};

	const handleReset = () => {
		setFormData(initialFormData);
	};

	return (
		<div className="add-teacher-wrapper">
			<form className="add-teacher-form" onSubmit={handleSubmit}>
				<h2>Add Teacher</h2>

				<div className="add-teacher-grid">
					<div className="form-field">
						<label htmlFor="firstname">Firstname</label>
						<input
							type="text"
							id="firstname"
							name="firstname"
							placeholder="e.g. Grace"
							value={formData.firstname}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="form-field">
						<label htmlFor="lastname">Lastname</label>
						<input
							type="text"
							id="lastname"
							name="lastname"
							placeholder="e.g. Nakato"
							value={formData.lastname}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="form-field">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							placeholder="e.g. grace@school.com"
							value={formData.email}
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
						<label htmlFor="qualification">Qualification</label>
						<select
							id="qualification"
							name="qualification"
							value={formData.qualification}
							onChange={handleChange}
							required
						>
							<option value="">--Select--</option>
							<option value="Diploma">Diploma</option>
							<option value="Bachelors">Bachelors</option>
							<option value="Masters">Masters</option>
							<option value="PhD">PhD</option>
						</select>
					</div>

					<div className="form-field">
						<label htmlFor="spacialisation">Spacialisation</label>
						<select
							id="spacialisation"
							name="spacialisation"
							value={formData.spacialisation}
							onChange={handleChange}
							required
						>
							<option value="">--Select--</option>
							<option value="Mathematics">Mathematics</option>
							<option value="Physics">Physics</option>
							<option value="Chemistry">Chemistry</option>
							<option value="Biology">Biology</option>
							<option value="English">English</option>
							<option value="History">History</option>
							<option value="Geography">Geography</option>
						</select>
					</div>

					<div className="form-field">
						<label htmlFor="department">Department</label>
						<select
							id="department"
							name="department"
							value={formData.department}
							onChange={handleChange}
							required
						>
							<option value="">--Select--</option>
							<option value="Sciences">Sciences</option>
							<option value="Arts">Arts</option>
							<option value="Languages">Languages</option>
							<option value="Humanities">Humanities</option>
							<option value="ICT">ICT</option>
						</select>
					</div>

					<div className="form-field">
						<label htmlFor="hiredate">Hiredate</label>
						<input
							type="date"
							id="hiredate"
							name="hiredate"
							value={formData.hiredate}
							onChange={handleChange}
							required
						/>
					</div>
				</div>

				<div className="add-teacher-actions">
					<button type="button" className="secondary-btn" onClick={handleReset}>
						Reset
					</button>
					<button type="submit" className="primary-btn">Save Teacher</button>
				</div>
			</form>
		</div>
	);
}

export default AddTeacher;
