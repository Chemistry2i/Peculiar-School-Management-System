import React, { useState } from 'react';
import axios from 'axios';

const StudentRegistration = () => {
    // 1. Initial State covering every field from your HTML
    const initialFormState = {
        firstName: '', lastName: '', otherNames: '', email: '',
        phoneNumber: '', gender: '', dateOfBirth: '', nationality: 'Ugandan',
        nin: '', disabilityStatus: '', linn: '', currentClass: '',
        stream: '', combination: '', residenceStatus: '', house: '',
        district: '', county: '', subCounty: '', parish: '', village: '',
        profilePictureUrl: '', birthCertificateUrl: ''
    };

    const [formData, setFormData] = useState(initialFormState);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    // 2. Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 3. Submit to Java Backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        // Remove empty strings to keep the payload clean
        const payload = Object.fromEntries(
            Object.entries(formData).filter(([_, value]) => value !== '')
        );

        try {
            // Update this URL to match your Spring Boot mapping
            const response = await axios.post('http://localhost:8080/api/students/register', payload);
            setResult(response.data);
            setFormData(initialFormState); // Reset form on success
        } catch (err) {
            setError(err.response?.data?.message || "Server connection failed. Is Spring Boot running?");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={containerStyle}>
            <header style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h1 style={{ color: '#2c3e50' }}>🎓 Student Registration - Academix</h1>
                <p>Register new students into the system. Fields marked with (*) are required.</p>
            </header>

            <form onSubmit={handleSubmit}>
                {/* --- SECTION 1: PERSONAL --- */}
                <fieldset style={fieldsetStyle}>
                    <legend style={legendStyle}>👤 Personal Information</legend>
                    <div style={gridStyle}>
                        <InputField label="First Name *" name="firstName" value={formData.firstName} onChange={handleChange} required />
                        <InputField label="Last Name *" name="lastName" value={formData.lastName} onChange={handleChange} required />
                        <InputField label="Other Names" name="otherNames" value={formData.otherNames} onChange={handleChange} />
                        <InputField label="Email Address *" name="email" type="email" value={formData.email} onChange={handleChange} required />
                        
                        <div style={infoBoxStyle}>
                            <p><strong>🔐 Password:</strong> A secure password will be generated automatically and sent to the email provided.</p>
                        </div>

                        <InputField label="Phone Number" name="phoneNumber" type="tel" placeholder="+256700000000" value={formData.phoneNumber} onChange={handleChange} />
                        <SelectField label="Gender *" name="gender" value={formData.gender} onChange={handleChange} required 
                            options={[{v:'MALE', t:'Male'}, {v:'FEMALE', t:'Female'}, {v:'OTHER', t:'Other'}]} />
                        <InputField label="Date of Birth *" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} required />
                        <InputField label="Nationality *" name="nationality" value={formData.nationality} onChange={handleChange} required />
                        <InputField label="NIN (National ID)" name="nin" placeholder="CF123456789ABC" value={formData.nin} onChange={handleChange} maxLength="14" />
                        <InputField label="Disability Status" name="disabilityStatus" value={formData.disabilityStatus} onChange={handleChange} />
                    </div>
                </fieldset>

                {/* --- SECTION 2: ACADEMIC --- */}
                <fieldset style={fieldsetStyle}>
                    <legend style={legendStyle}>🎓 Academic Information</legend>
                    <div style={gridStyle}>
                        <InputField label="LINN (Learner ID)" name="linn" placeholder="L123456789" value={formData.linn} onChange={handleChange} />
                        <SelectField label="Current Class/Grade *" name="currentClass" value={formData.currentClass} onChange={handleChange} required
                            options={['Senior 1', 'Senior 2', 'Senior 3', 'Senior 4', 'Senior 5', 'Senior 6'].map(s => ({v:s, t:s}))} />
                        <SelectField label="Stream/Section" name="stream" value={formData.stream} onChange={handleChange}
                            options={['Blue', 'Red', 'Green', 'Yellow', 'Science', 'Arts', 'Commerce', 'Technical'].map(s => ({v:s, t:s}))} />
                        
                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={labelStyle}>Subject Combination (Required for S5/S6)</label>
                            <input 
                                name="combination" 
                                value={formData.combination} 
                                onChange={handleChange} 
                                placeholder="e.g., BCM/Sub-Math"
                                style={{
                                    ...inputStyle, 
                                    backgroundColor: (formData.currentClass.includes('5') || formData.currentClass.includes('6')) ? '#e8f4fd' : 'white',
                                    border: (formData.currentClass.includes('5') || formData.currentClass.includes('6')) ? '1px solid #2196F3' : '1px solid #ccc'
                                }} 
                            />
                        </div>

                        <SelectField label="Residence Status" name="residenceStatus" value={formData.residenceStatus} onChange={handleChange}
                            options={[{v:'DAY', t:'Day Scholar'}, {v:'BOARDING', t:'Boarding'}]} />
                        
                        <InputField 
                            label="House (for Boarders)" 
                            name="house" 
                            value={formData.house} 
                            onChange={handleChange} 
                            style={{ backgroundColor: formData.residenceStatus === 'BOARDING' ? '#e8f4fd' : 'white' }} 
                        />
                    </div>
                </fieldset>

                {/* --- SECTION 3: ADDRESS --- */}
                <fieldset style={fieldsetStyle}>
                    <legend style={legendStyle}>🏠 Address Information</legend>
                    <div style={gridStyle}>
                        <InputField label="District *" name="district" value={formData.district} onChange={handleChange} required />
                        <InputField label="County *" name="county" value={formData.county} onChange={handleChange} required />
                        <InputField label="Sub-County *" name="subCounty" value={formData.subCounty} onChange={handleChange} required />
                        <InputField label="Parish *" name="parish" value={formData.parish} onChange={handleChange} required />
                        <InputField label="Village *" name="village" value={formData.village} onChange={handleChange} required />
                    </div>
                </fieldset>

                {/* --- SECTION 4: DOCUMENTS --- */}
                <fieldset style={fieldsetStyle}>
                    <legend style={legendStyle}>📎 Documents (Optional URLs)</legend>
                    <div style={gridStyle}>
                        <InputField label="Profile Picture URL" name="profilePictureUrl" type="url" value={formData.profilePictureUrl} onChange={handleChange} />
                        <InputField label="Birth Certificate URL" name="birthCertificateUrl" type="url" value={formData.birthCertificateUrl} onChange={handleChange} />
                    </div>
                </fieldset>

                {/* --- ACTIONS --- */}
                <div style={{ display: 'flex', gap: '15px', marginTop: '30px', justifyContent: 'center' }}>
                    <button type="submit" disabled={loading} style={submitBtnStyle}>
                        {loading ? '⏳ Processing...' : '📝 Register Student'}
                    </button>
                    <button type="button" onClick={() => setFormData(initialFormState)} style={resetBtnStyle}>
                        🔄 Reset Form
                    </button>
                </div>
            </form>

            {/* --- FEEDBACK MESSAGES --- */}
            {result && (
                <div style={successBoxStyle}>
                    <h3 style={{ margin: '0 0 10px 0' }}>✅ Registration Successful!</h3>
                    <p><strong>Student ID:</strong> <span style={{ color: '#2196F3', fontSize: '1.2rem' }}>{result.studentId || result.student?.studentId}</span></p>
                    <p><strong>Name:</strong> {result.fullName || result.student?.fullName}</p>
                    <p>Login instructions sent to: <strong>{result.email || result.student?.email}</strong></p>
                </div>
            )}

            {error && (
                <div style={errorBoxStyle}>
                    <h3 style={{ margin: '0 0 10px 0' }}>❌ Registration Failed</h3>
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

// --- Reusable Input Components ---
const InputField = ({ label, style, ...props }) => (
    <div style={{ marginBottom: '15px' }}>
        <label style={labelStyle}>{label}</label>
        <input {...props} style={{ ...inputStyle, ...style }} />
    </div>
);

const SelectField = ({ label, options, ...props }) => (
    <div style={{ marginBottom: '15px' }}>
        <label style={labelStyle}>{label}</label>
        <select {...props} style={inputStyle}>
            <option value="">Select...</option>
            {options.map(opt => <option key={opt.v} value={opt.v}>{opt.t}</option>)}
        </select>
    </div>
);

// --- CSS-in-JS Styles ---
const containerStyle = { maxWidth: '1000px', margin: '40px auto', padding: '30px', backgroundColor: '#fdfdfd', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' };
const fieldsetStyle = { marginBottom: '30px', padding: '25px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fff' };
const legendStyle = { padding: '0 10px', fontWeight: 'bold', color: '#34495e', fontSize: '1.1rem' };
const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' };
const labelStyle = { display: 'block', marginBottom: '8px', fontWeight: '600', color: '#555', fontSize: '0.9rem' };
const inputStyle = { width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box', transition: 'border 0.3s' };
const infoBoxStyle = { gridColumn: '1 / -1', backgroundColor: '#e8f4fd', padding: '15px', borderLeft: '5px solid #2196F3', borderRadius: '4px', margin: '10px 0' };
const submitBtnStyle = { padding: '15px 40px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', transition: 'background 0.3s' };
const resetBtnStyle = { padding: '15px 40px', backgroundColor: '#95a5a6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' };
const successBoxStyle = { marginTop: '30px', padding: '25px', backgroundColor: '#e8f5e9', border: '1px solid #2ecc71', borderRadius: '8px', textAlign: 'center' };
const errorBoxStyle = { marginTop: '30px', padding: '25px', backgroundColor: '#ffebee', border: '1px solid #e74c3c', borderRadius: '8px', textAlign: 'center' };

export default StudentRegistration;