import React, { useState } from "react";
import "./AddSubject.css";

function AddSubject() {
	const initialFormData = {
		courseName: "",
		courseCode: "",
		description: "",
		category: "",
		levelType: "",
		principal: null,
		subsidiary: null,
		core: null,
		creditUnits: ""
	};

	const [formData, setFormData] = useState(initialFormData);

	const handleChange = (event) => {
		const { name, value, type, checked } = event.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value
		}));
	};

	const handleBooleanChoice = (fieldName, boolValue) => {
		setFormData((prev) => ({
			...prev,
			[fieldName]: boolValue
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log("Add subject form submitted:", formData);
	};

	const handleReset = () => {
		setFormData(initialFormData);
	};

	return (
		<div className="add-subject-wrapper">
			<form className="add-subject-form" onSubmit={handleSubmit}>
				<h2>Add Subject</h2>

				<div className="add-subject-grid">
					<div className="form-field">
						<label htmlFor="courseName">Course Name</label>
						<input
							type="text"
							id="courseName"
							name="courseName"
							placeholder="e.g. Physics"
							value={formData.courseName}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="form-field">
						<label htmlFor="courseCode">Course Code</label>
						<input
							type="text"
							id="courseCode"
							name="courseCode"
							placeholder="e.g. PHY201"
							value={formData.courseCode}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="form-field full-width">
						<label htmlFor="description">Description</label>
						<textarea
							id="description"
							name="description"
							rows="4"
							placeholder="Brief subject description"
							value={formData.description}
							onChange={handleChange}
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

					<div className="boolean-fields-row full-width">
						<div className="form-field boolean-field">
							<label>Principal</label>
							<div className="boolean-options">
								<label className="checkbox-field" htmlFor="principalTrue">
									<input
										type="checkbox"
										id="principalTrue"
										checked={formData.principal === true}
										onChange={() => handleBooleanChoice("principal", true)}
									/>
									<span>True</span>
								</label>
								<label className="checkbox-field" htmlFor="principalFalse">
									<input
										type="checkbox"
										id="principalFalse"
										checked={formData.principal === false}
										onChange={() => handleBooleanChoice("principal", false)}
									/>
									<span>False</span>
								</label>
							</div>
						</div>

						<div className="form-field boolean-field">
							<label>Subsidiary</label>
							<div className="boolean-options">
								<label className="checkbox-field" htmlFor="subsidiaryTrue">
									<input
										type="checkbox"
										id="subsidiaryTrue"
										checked={formData.subsidiary === true}
										onChange={() => handleBooleanChoice("subsidiary", true)}
									/>
									<span>True</span>
								</label>
								<label className="checkbox-field" htmlFor="subsidiaryFalse">
									<input
										type="checkbox"
										id="subsidiaryFalse"
										checked={formData.subsidiary === false}
										onChange={() => handleBooleanChoice("subsidiary", false)}
									/>
									<span>False</span>
								</label>
							</div>
						</div>

						<div className="form-field boolean-field">
							<label>Core</label>
							<div className="boolean-options">
								<label className="checkbox-field" htmlFor="coreTrue">
									<input
										type="checkbox"
										id="coreTrue"
										checked={formData.core === true}
										onChange={() => handleBooleanChoice("core", true)}
									/>
									<span>True</span>
								</label>
								<label className="checkbox-field" htmlFor="coreFalse">
									<input
										type="checkbox"
										id="coreFalse"
										checked={formData.core === false}
										onChange={() => handleBooleanChoice("core", false)}
									/>
									<span>False</span>
								</label>
							</div>
						</div>
					</div>

					<div className="form-field">
						<label htmlFor="creditUnits">CreditUnits</label>
						<input
							type="number"
							id="creditUnits"
							name="creditUnits"
							list="creditUnitsOptions"
							min="1"
							step="1"
							placeholder="Enter or pick credit units"
							value={formData.creditUnits}
							onChange={handleChange}
							required
						/>
						<datalist id="creditUnitsOptions">
							<option value="1" />
							<option value="2" />
							<option value="3" />
							<option value="4" />
							<option value="5" />
							<option value="6" />
						</datalist>
					</div>
				</div>

				<div className="add-subject-actions">
					<button type="button" className="secondary-btn" onClick={handleReset}>
						Reset
					</button>
					<button type="submit" className="primary-btn">Save Subject</button>
				</div>
			</form>
		</div>
	);
}

export default AddSubject;
