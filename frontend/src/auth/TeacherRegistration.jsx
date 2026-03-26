import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './TeacherRegistration.css';


function TeacherRegistration(){
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
        // Professional
        teacherId: "",
        departmentName: "",
        primarySubject: "",
        qualifications: "",
        yearsOfExperience: "", // kept in state but might not be sent if backend ignores it
        dateJoined: ""
    });

    const handleInputChange = (e) => {
        const { id, value, name } = e.target;
        const key = name || id; // Prioritize name, fall back to id
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");
        setSuccess("");

        try {
            const payload = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                otherNames: formData.otherNames,
                gender: formData.gender.toUpperCase(),
                dateOfBirth: formData.dateOfBirth,
                nin: formData.nin,
                disabilityStatus: formData.disabilityStatus,
                
                // Address
                district: formData.district,
                county: formData.county,
                subCounty: formData.subCounty,
                parish: formData.parish,
                village: formData.village || formData.homeAddress,
                
                phoneNumber: formData.phoneNumber,
                email: formData.email,
                
                // Professional
                teacherId: formData.teacherId, // e.g. TCH-001
                departmentName: formData.departmentName,
                primarySubject: formData.primarySubject,
                qualifications: formData.qualifications,
                dateJoined: formData.dateJoined,
                
                // Explicitly set active/employment status if needed defaults aren't enough
                employmentStatus: "ACTIVE"
            };

            const response = await fetch("/api/teachers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // "Authorization": `Bearer ${localStorage.getItem("authToken")}`
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to register teacher");
            }

            setSuccess("Teacher registered successfully!");
            // setTimeout(() => navigate("/admin/teachers"), 2000);

        } catch (err) {
            setError(err.message || "An error occurred");
        } finally {
            setSubmitting(false);
        }
    };

    return(
        <div className="teacher-Reg">
            <form onSubmit={handleSubmit} className="teacher-Reg-board">
                {error && <div className="error-message" style={{color: 'red', padding: '10px'}}>{error}</div>}
                {success && <div className="success-message" style={{color: 'green', padding: '10px'}}>{success}</div>}

                <fieldset>
                    <legend>Bio-data</legend>

                    <div className="Teachers-infor-container">
                        <div className="Teachers-infor">

                            <div className="Teachers-input-container">
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
                            </div>
                            <div className="Teachers-input-container">
                                <label htmlFor="lastName">Last Name</label>
                                <input 
                                    type="text" 
                                    id="lastName" 
                                    name="lastName"
                                    required 
                                    placeholder="last Name"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                />
                            </div>

                        </div> 
                        <div className="Teachers-infor">

                            <div className="Teachers-input-container">
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

                            <div className="Teachers-input-container">
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
                            </div>
                        </div>

                        <div className="Teachers-infor">
                            <div className="Teachers-input-container">
                                <label htmlFor="dateOfBirth">Date of Birth</label>
                                <input 
                                    type="date" 
                                    id="dateOfBirth" 
                                    name="dateOfBirth"
                                    required 
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="Teachers-input-container">
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

                        <div className="Teachers-infor">
                            <div className="Teachers-input-container">
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

                            <div className="Teachers-input-container">
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
                    <legend>Contact-information</legend>
                    <div className="Teachers-infor-container">
                        
                        <div className="Teachers-infor">

                            <div className="Teachers-input-container">
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
                            </div>
                            <div className="Teachers-input-container">
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
                            </div>

                        </div> 
                        <div className="Teachers-infor">

                            <div className="Teachers-input-container">
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
                            </div>
                            <div className="Teachers-input-container">
                                <label htmlFor="subCounty">Sub-county</label>
                                <input 
                                    type="text" 
                                    id="subCounty" 
                                    name="subCounty"
                                    required 
                                    placeholder="Sub-county"
                                    value={formData.subCounty}
                                    onChange={handleInputChange}
                                />
                            </div>

                        </div>
                        <div className="Teachers-infor">

                            <div className="Teachers-input-container">
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
                            </div>
                            <div className="Teachers-input-container">
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
                            </div>

                        </div> 
                        <div className="Teachers-infor">

                            <div className="Teachers-input-container">
                                <label htmlFor="phoneNumber">Phone-number</label>
                                <input 
                                    type="text" 
                                    id="phoneNumber" 
                                    name="phoneNumber"
                                    required 
                                    placeholder="Phone-number"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="Teachers-input-container">
                                <label htmlFor="email">Email(if any)</label>
                                <input 
                                    type="text" 
                                    id="email" 
                                    name="email"
                                    required 
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>

                        </div>  
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Professional information </legend>
                    <div className="Teachers-infor-container">
                        <div className="Teachers-infor">

                            <div className="Teachers-input-container">
                                <label htmlFor="teacherId">Employee ID</label>
                                <input 
                                    type="text" 
                                    id="teacherId" 
                                    name="teacherId"
                                    required 
                                    placeholder="TCH-001"
                                    value={formData.teacherId}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="Teachers-input-container">
                                <label htmlFor="departmentName">Department</label>
                                <select 
                                    name="departmentName" 
                                    id="departmentName" 
                                    required
                                    value={formData.departmentName}
                                    onChange={handleInputChange}
                                >
                                    <option value="">select</option>
                                    <option value="Computer Science">Computer science dept</option>
                                    <option value="Engineering">Engineering dept</option>
                                    <option value="Education">Education dept</option>
                                    <option value="Accounting">Accounting dept</option>
                                    <option value="Science">Science</option>
                                    <option value="Arts">Arts</option>
                                </select>
                            </div>

                        </div>
                        <div className="Teachers-infor">

                            <div className="Teachers-input-container">
                                <label htmlFor="primarySubject">Subject</label>
                                <select 
                                    name="primarySubject" 
                                    id="primarySubject" 
                                    required
                                    value={formData.primarySubject}
                                    onChange={handleInputChange}
                                >
                                    <option value="">select</option>
                                    <option value="Programming">Programming</option>
                                    <option value="Business computing">Business computing</option>
                                    <option value="Economics">Economics</option>
                                    <option value="Discrete Math">Discrete Math</option>
                                    <option value="Mathematics">Mathematics</option>
                                    <option value="English">English</option>
                                </select>
                            </div>
                            <div className="Teachers-input-container">
                                <label htmlFor="qualifications">Highest Qualification</label>
                                <select 
                                    name="qualifications" 
                                    id="qualifications" 
                                    required
                                    value={formData.qualifications}
                                    onChange={handleInputChange}
                                >
                                    <option value="">select</option>
                                    <option value="Degree/Bachelors">Degree/Bachelors</option>
                                    <option value="Higher Diploma">Higher Diploma</option>
                                    <option value="Diploma">Diploma</option>
                                    <option value="Certificate">Certificate</option>
                                    <option value="Masters">Masters</option>
                                    <option value="PhD">PhD</option>
                                </select>
                            </div>

                        </div>
                        <div className="Teachers-infor">

                            <div className="Teachers-input-container">
                                <label htmlFor="yearsOfExperience">Years of Experience</label>
                                <input 
                                    type="text" 
                                    id="yearsOfExperience" 
                                    name="yearsOfExperience"
                                    required 
                                    placeholder=""
                                    value={formData.yearsOfExperience}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="Teachers-input-container">
                                <label htmlFor="dateJoined">Join Date</label>
                                <input 
                                    type="date" 
                                    id="dateJoined" 
                                    name="dateJoined"
                                    required 
                                    placeholder=""
                                    value={formData.dateJoined}
                                    onChange={handleInputChange}
                                />
                            </div>

                        </div> 
                    </div>
                </fieldset>
                <div className="register-btnn">
                    <div></div>
                    <div className="teacher-register-btn">
                        <div className="teacher-register-btn01">
                            <button type="button" onClick={() => setFormData({})}>Clear Form</button>
                        </div>
                        <div className="teacher-register-btn02">
                            <button type="submit" disabled={submitting}>
                                {submitting ? "Registering..." : "Register Teacher"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default TeacherRegistration;