import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './StudentRegistration.css'

function StudentRegistration(){
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        otherNames: "",
        gender: "",
        dateOfBirth: "",
        nin: "",
        religion: "",
        disabilityStatus: "",
        homeAddress: "",
        district: "",
        county: "",
        subCounty: "",
        parish: "",
        village: "",
        phoneNumber: "",
        email: "",
        // Parent info - purely client side for now as backend model doesn't support it directly
        parentName: "",
        parentRelationship: "",
        parentPhone: "",
        parentEmail: "",
        parentOccupation: "",
        parentAddress: "",
        // Academic
        admissionDate: "",
        currentClass: "",
        stream: "",
        residenceStatus: "",
        previousSchool: "",
        house: ""
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        // Map inputs with different IDs to state keys if needed, or use name attribute
        // Since original code used IDs, I'll map IDs to state keys here or update input names
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    // Helper to generic handle change with name attribute
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");
        setSuccess("");

        try {
            // Construct payload matching Student entity
            const payload = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                otherNames: formData.otherNames,
                gender: formData.gender.toUpperCase(),
                dateOfBirth: formData.dateOfBirth,
                nin: formData.nin,
                disabilityStatus: formData.disabilityStatus,
                
                // Address fields
                district: formData.district,
                county: formData.county,
                subCounty: formData.subCounty,
                parish: formData.parish,
                village: formData.village || formData.homeAddress, // Use village or home address
                
                phoneNumber: formData.phoneNumber,
                email: formData.email,
                
                // Academic
                currentClass: formData.currentClass,
                stream: formData.stream,
                house: formData.house,
                residenceStatus: formData.residenceStatus ? formData.residenceStatus.toUpperCase() : null, // DAY or BOARDING
                
                // Fields not in Student model but might be needed?
                // religion, parent details...
            };

            const response = await fetch("/api/students", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Add Authorization header if admin/teacher is registering the student
                    // "Authorization": `Bearer ${localStorage.getItem("authToken")}` 
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to register student");
            }

            setSuccess("Student registered successfully!");
            // Optional: navigate to list or clear form
            // setTimeout(() => navigate("/admin/students"), 2000);
            
        } catch (err) {
            setError(err.message || "An error occurred");
        } finally {
            setSubmitting(false);
        }
    };

    return(
        <div className="Student-reg">
            <form onSubmit={handleSubmit} className="student-reg-content">
                {error && <div className="error-message" style={{color: 'red', padding: '10px'}}>{error}</div>}
                {success && <div className="success-message" style={{color: 'green', padding: '10px'}}>{success}</div>}
                
                <fieldset>
                    <legend>Bio-Data</legend>

                    <div className="bio-infor-container">
                        <div className="bio-content">
                            <div className="input-container">
                                <label htmlFor="firstName">First Name</label>
                                <input 
                                    type="text" 
                                    id="firstName" 
                                    name="firstName" 
                                    required 
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                />
                                <p></p>
                            </div>

                            <div className="input-container">
                                <label htmlFor="lastName">Last Name</label>
                                <input 
                                    type="text" 
                                    id="lastName" 
                                    name="lastName" 
                                    required 
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                />
                                <p></p>
                            </div>
                        </div>

                        <div className="bio-content">

                            <div className="input-container">
                                <label htmlFor="otherNames">Other name</label>
                                <input 
                                    type="text" 
                                    id="otherNames" 
                                    name="otherNames" 
                                    placeholder="Other Name"
                                    value={formData.otherNames}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="input-container">
                                <label htmlFor="gender">Gender</label>
                                <select 
                                    name="gender" 
                                    id="gender" 
                                    required
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                >
                                    <option value="">--Select--</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                <p></p>
                            </div>

                        </div>

                        <div className="bio-content">
                            <div className="input-container">
                                <label htmlFor="dateOfBirth">Date of Birth</label>
                                <input 
                                    type="date" 
                                    id="dateOfBirth" 
                                    name="dateOfBirth" 
                                    required 
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                />
                                <p></p>
                            </div>

                            <div className="input-container">
                                <label htmlFor="nin">National Id No. (NIN)</label>
                                <input 
                                    type="text" 
                                    id="nin" 
                                    name="nin" 
                                    placeholder="National ID No." 
                                    minLength={14} 
                                    maxLength={14}
                                    value={formData.nin}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="bio-content">
                            <div className="input-container">
                                <label htmlFor="religion">Religion</label>
                                <input 
                                    type="text" 
                                    id="religion" 
                                    name="religion" 
                                    required 
                                    placeholder="Religion"
                                    value={formData.religion}
                                    onChange={handleInputChange}
                                />
                                <p></p>
                            </div>

                            <div className="input-container">
                                <label htmlFor="disabilityStatus">Disability (If any)</label>
                                <input 
                                    type="text" 
                                    id="disabilityStatus" 
                                    name="disabilityStatus"
                                    placeholder="Disability" 
                                    value={formData.disabilityStatus}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                    </div>
                </fieldset>

                <fieldset>
                    <legend>Contact-Information</legend>

                    <div className="bio-infor-container">
                        <div className="bio-content">
                            <div className="input-container">
                                <label htmlFor="homeAddress">Home Address</label>
                                <input 
                                    type="text" 
                                    id="homeAddress" 
                                    name="homeAddress"
                                    required 
                                    placeholder="Home Address"
                                    value={formData.homeAddress}
                                    onChange={handleInputChange}
                                />
                                <p></p>
                            </div>

                            <div className="input-container">
                                <label htmlFor="district">District</label>
                                <input 
                                    type="text" 
                                    id="district" 
                                    name="district"
                                    required 
                                    placeholder="District"
                                    value={formData.district}
                                    onChange={handleInputChange}
                                />
                                <p></p>
                            </div>
                        </div>

                        <div className="bio-content">

                            <div className="input-container">
                                <label htmlFor="county">County</label>
                                <input 
                                    type="text" 
                                    id="county" 
                                    name="county"
                                    required 
                                    placeholder="County"
                                    value={formData.county}
                                    onChange={handleInputChange}
                                />
                                <p></p>
                            </div>

                            <div className="input-container">
                                <label htmlFor="subCounty">Sub-County</label>
                                <input 
                                    type="text" 
                                    id="subCounty" 
                                    name="subCounty"
                                    required 
                                    placeholder="Sub-County"
                                    value={formData.subCounty}
                                    onChange={handleInputChange}
                                />
                                <p></p>
                            </div>

                        </div>

                        <div className="bio-content">
                            <div className="input-container">
                                <label htmlFor="parish">Parish</label>
                                <input 
                                    type="text" 
                                    id="parish" 
                                    name="parish"
                                    required 
                                    placeholder="Parish"
                                    value={formData.parish}
                                    onChange={handleInputChange}
                                />
                                <p></p>
                            </div>

                            <div className="input-container">
                                <label htmlFor="village">Village</label>
                                <input 
                                    type="text" 
                                    id="village" 
                                    name="village"
                                    required 
                                    placeholder="Village"
                                    value={formData.village}
                                    onChange={handleInputChange}
                                />
                                <p></p>
                            </div>
                        </div>

                        <div className="bio-content">
                            <div className="input-container">
                                <label htmlFor="phoneNumber">Phone No.</label>
                                <input 
                                    type="text" 
                                    id="phoneNumber" 
                                    name="phoneNumber"
                                    required 
                                    placeholder="Phone No."
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                />
                                <p></p>
                            </div>

                            <div className="input-container">
                                <label htmlFor="email">Email (If any)</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email"
                                    placeholder="Email" 
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                                <p></p>
                            </div>
                        </div>

                    </div>
                </fieldset>


                <fieldset>
                    <legend>Parent/Guardian Information</legend>

                    <div className="bio-infor-container">
                        <div className="bio-content">
                            <div className="input-container">
                                <label htmlFor="parentName">Parent's Name</label>
                                <input 
                                    type="text" 
                                    id="parentName" 
                                    name="parentName"
                                    placeholder="Parent's Name"
                                    value={formData.parentName}
                                    onChange={handleInputChange}
                                />
                                <p></p>
                            </div>

                            <div className="input-container">
                                <label htmlFor="parentRelationship">Relationship</label>
                                <select 
                                    name="parentRelationship" 
                                    id="parentRelationship" 
                                    value={formData.parentRelationship}
                                    onChange={handleInputChange}
                                >
                                    <option value="">--Select--</option>
                                    <option value="father">Father</option>
                                    <option value="mother">Mother</option>
                                    <option value="guardian">Guardian</option>
                                </select>
                                <p></p>
                            </div>
                        </div>

                        <div className="bio-content">

                            <div className="input-container">
                                <label htmlFor="parentPhone">Parent Phone No.</label>
                                <input 
                                    type="text" 
                                    id="parentPhone" 
                                    name="parentPhone"
                                    placeholder="Parent Phone No."
                                    value={formData.parentPhone}
                                    onChange={handleInputChange}
                                />
                                <p></p>
                            </div>

                            <div className="input-container">
                                <label htmlFor="parentEmail">Parent Email</label>
                                <input 
                                    type="email" 
                                    id="parentEmail" 
                                    name="parentEmail"
                                    placeholder="Parent Email"
                                    value={formData.parentEmail}
                                    onChange={handleInputChange}
                                />
                            </div>

                        </div>

                        <div className="bio-content">
                            <div className="input-container">
                                <label htmlFor="parentOccupation">Occupation</label>
                                <input 
                                    type="text" 
                                    id="parentOccupation" 
                                    name="parentOccupation"
                                    placeholder="Occupation"
                                    value={formData.parentOccupation}
                                    onChange={handleInputChange}
                                />
                                <p></p>
                            </div>

                            <div className="input-container">
                                <label htmlFor="parentAddress">Parent Address</label>
                                <input 
                                    type="text" 
                                    id="parentAddress" 
                                    name="parentAddress"
                                    placeholder="Address" 
                                    value={formData.parentAddress}
                                    onChange={handleInputChange}
                                />
                                <p></p>
                            </div>
                        </div>

                    </div>
                </fieldset>

                <fieldset>
                    <legend>Academic Information</legend>

                    <div className="bio-infor-container">
                        <div className="bio-content">
                            <div className="input-container">
                                <label htmlFor="admissionDate">Admission Date</label>
                                <input 
                                    type="date" 
                                    id="admissionDate" 
                                    name="admissionDate"
                                    value={formData.admissionDate}
                                    onChange={handleInputChange}
                                />
                                <p></p>
                            </div>

                            <div className="input-container">
                                <label htmlFor="currentClass">Class</label>
                                <select 
                                    name="currentClass" 
                                    id="currentClass" 
                                    required
                                    value={formData.currentClass}
                                    onChange={handleInputChange}
                                >
                                    <option value="">--Select--</option>
                                    <option value="s.1">Senior one</option>
                                    <option value="s.2">Senior two</option>
                                    <option value="s.3">Senior three</option>
                                    <option value="s.4">Senior four</option>
                                </select>
                                <p></p>
                            </div>
                        </div>

                        <div className="bio-content">

                            <div className="input-container">
                                <label htmlFor="stream">Stream</label>
                                <input 
                                    type="text" 
                                    id="stream" 
                                    name="stream"
                                    required 
                                    placeholder="Stream"
                                    value={formData.stream}
                                    onChange={handleInputChange}
                                />
                                <p></p>
                            </div>

                            <div className="input-container">
                                <label htmlFor="residenceStatus">Student Category</label>
                                <select 
                                    name="residenceStatus" 
                                    id="residenceStatus" 
                                    required
                                    value={formData.residenceStatus}
                                    onChange={handleInputChange}
                                >
                                    <option value="">--Select--</option>
                                    <option value="day">Day</option>
                                    <option value="boarding">Boarding</option>
                                </select>
                                <p></p>
                            </div>

                        </div>

                        <div className="bio-content">
                            <div className="input-container">
                                <label htmlFor="previousSchool">Previous School</label>
                                <input 
                                    type="text" 
                                    id="previousSchool" 
                                    name="previousSchool"
                                    placeholder="Previous School"
                                    value={formData.previousSchool}
                                    onChange={handleInputChange}
                                />
                                <p></p>
                            </div>

                            <div className="input-container">
                                <label htmlFor="house">House</label>
                                <input 
                                    type="text" 
                                    id="house" 
                                    name="house"
                                    placeholder="House" 
                                    value={formData.house}
                                    onChange={handleInputChange}
                                />
                                <p></p>
                            </div>
                        </div>

                    </div>
                </fieldset>

                <div className="register-student" >
                    <div></div>
                    <div className="register-student-btn">
                        <div className="register-student-btn01">
                            <button type="button" onClick={() => setFormData({/* revert to initial */})}>Clear Form</button>
                        </div>
                        <div className="register-student-btn02">
                            <button type="submit" disabled={submitting}>
                                {submitting ? "Registering..." : "Register Student"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default  StudentRegistration