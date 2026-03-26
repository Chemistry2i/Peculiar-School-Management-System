import React, { useMemo, useState, useEffect } from 'react';
import './StudentSearch.css';

const StudentSearch = () => {
    // Single source of truth for all student records.
    const [students, setStudents] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [addFormError, setAddFormError] = useState('');
    const [recentAdmissions, setRecentAdmissions] = useState(0);
    const [addFormData, setAddFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        nationality: '',
        currentClass: '',
        contact: '',
        status: 'active',
    });

    const [viewStudent, setViewStudent] = useState(null);
    const [editStudent, setEditStudent] = useState(null);
    const [editFormError, setEditFormError] = useState('');
    const [editFormData, setEditFormData] = useState({
        name: '',
        studentClass: '',
        contact: '',
        status: 'active',
    });

    // Fetch students from backend on mount
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch("/api/students");
                if (response.ok) {
                    const data = await response.json();
                    // Map backend data to frontend structure if needed
                    // Assuming backend returns object with { students: [...] } or array [...]
                    const studentList = Array.isArray(data) ? data : (data.students || []);

                    const mappedStudents = studentList.map(s => ({
                        id: s.studentId || s.id, // Prefer studentId (e.g. STU001) if available
                        name: s.fullName || `${s.firstName} ${s.lastName}`,
                        studentClass: s.currentClass || 'N/A',
                        contact: s.phoneNumber || s.email || 'N/A',
                        status: s.isActive ? 'active' : 'inactive',
                        // Store full object for view modal
                        ...s
                    }));

                    setStudents(mappedStudents);
                }
            } catch (error) {
                console.error("Failed to fetch students:", error);
            }
        };

        fetchStudents();
    }, []);

    // Demo fee value for dashboard summary card.
  const totalFeesCollectedUsd = 0.00;

  const todaysAttendance = useMemo(() => {
    const totalActive = students.filter((student) => student.status === 'active').length;
    if (totalActive === 0) {
      return 0;
    }
    // Demo attendance estimator tied to active students for dashboard display.
    return Math.max(1, Math.round(totalActive * 0.92));
  }, [students]);

  const totalActiveStudents = useMemo(
    () => students.filter((student) => student.status === 'active').length,
    [students]
  );

  const filteredStudents = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(term) ||
        student.id.toLowerCase().includes(term) ||
        student.studentClass.toLowerCase().includes(term) ||
        student.contact.toLowerCase().includes(term) ||
        student.status.toLowerCase().includes(term)
    );
  }, [searchTerm, students]);

  const openAddModal = () => {
    setAddFormError('');
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddFormError('');
    setIsAddModalOpen(false);
  };

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setAddFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetAddForm = () => {
    setAddFormData({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      nationality: '',
      currentClass: '',
      contact: '',
      status: 'active',
    });
  };

  const generateStudentId = () => {
    const maxNumericId = students.reduce((max, student) => {
      const numeric = Number(student.id.replace('STU', ''));
      return Number.isNaN(numeric) ? max : Math.max(max, numeric);
    }, 0);
    return `STU${String(maxNumericId + 1).padStart(3, '0')}`;
  };

  const handleAddStudent = (e) => {
    e.preventDefault();

    const firstName = addFormData.firstName.trim();
    const lastName = addFormData.lastName.trim();
    const dateOfBirth = addFormData.dateOfBirth;
    const gender = addFormData.gender;
    const nationality = addFormData.nationality;
    const currentClass = addFormData.currentClass;
    const contact = addFormData.contact.trim();
    const status = addFormData.status;

    // Basic validation: all add-student fields are required.
    if (
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !gender ||
      !nationality ||
      !currentClass ||
      !contact ||
      !status
    ) {
      setAddFormError('Please fill in all fields.');
      return;
    }

    const fullName = `${firstName} ${lastName}`;
    const studentClass = currentClass;

    const newStudent = {
      id: generateStudentId(),
      name: fullName,
      studentClass,
      contact,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      nationality,
      currentClass,
      status,
    };

    setStudents((prev) => [newStudent, ...prev]);
    // Recent admissions increases whenever a student is added in this session.
    setRecentAdmissions((prev) => prev + 1);
    resetAddForm();
    closeAddModal();
  };

  const openViewModal = (student) => {
    setViewStudent(student);
  };

  const closeViewModal = () => {
    setViewStudent(null);
  };

  const openEditModal = (student) => {
    setEditStudent(student);
    setEditFormError('');
    setEditFormData({
      name: student.name,
      studentClass: student.studentClass,
      contact: student.contact,
      status: student.status,
    });
  };

  const closeEditModal = () => {
    setEditStudent(null);
    setEditFormError('');
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();

    const name = editFormData.name.trim();
    const studentClass = editFormData.studentClass.trim();
    const contact = editFormData.contact.trim();
    const status = editFormData.status;

    if (!name || !studentClass || !contact || !status) {
      setEditFormError('Please fill in all fields.');
      return;
    }

    setStudents((prev) =>
      prev.map((student) =>
        student.id === editStudent.id
          ? {
              ...student,
              name,
              studentClass,
              contact,
              status,
            }
          : student
      )
    );
    closeEditModal();
  };

  const handleDeleteStudent = (studentId) => {
    setStudents((prev) => prev.filter((student) => student.id !== studentId));
  };

  const getStatusBadgeClass = (status) => {
    if (status === 'active') return 'status-badge status-active';
    if (status === 'inactive') return 'status-badge status-inactive';
    return 'status-badge status-pending';
  };

  return (
    <div className="student-search-container">
      <div className="search-header">
        <h2>Student Management</h2>
        <button className="btn btn-add-student" onClick={openAddModal}>
          Add Student
        </button>
      </div>

      <section className="summary-cards" aria-label="Student summaries">
        <article className="summary-card summary-card-active">
          <i className="fa-solid fa-user-graduate summary-card-icon" aria-hidden="true"></i>
          <p className="summary-label">Total Active Students</p>
          <h3>{totalActiveStudents}</h3>
        </article>

        <article className="summary-card summary-card-recent">
          <i className="fa-solid fa-user-plus summary-card-icon" aria-hidden="true"></i>
          <p className="summary-label">Recent Admissions</p>
          <h3>{recentAdmissions}</h3>
        </article>

        <article className="summary-card summary-card-fees">
          <i className="fa-solid fa-dollar-sign summary-card-icon" aria-hidden="true"></i>
          <p className="summary-label">Total Fees Collected</p>
          <h3>{`$${totalFeesCollectedUsd.toLocaleString()}`}</h3>
        </article>

        <article className="summary-card summary-card-attendance">
          <i className="fa-solid fa-calendar-check summary-card-icon" aria-hidden="true"></i>
          <p className="summary-label">Today's Attendance</p>
          <h3>{todaysAttendance}</h3>
        </article>
      </section>

      <div className="search-section">
        <div className="search-filters">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search by name, ID, class, contact, or status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
          </div>
        </div>
      </div>

      {isAddModalOpen && (
        <div className="modal-overlay" onClick={closeAddModal}>
          <div className="modal-content add-student-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Student</h3>
              <button className="modal-close" onClick={closeAddModal} aria-label="Close modal">
                x
              </button>
            </div>

            <form className="student-form" onSubmit={handleAddStudent}>
              {addFormError ? <p className="form-error">{addFormError}</p> : null}

              <div className="add-student-grid">
                <div className="form-field">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={addFormData.firstName}
                    onChange={handleAddInputChange}
                    placeholder="Enter first name"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={addFormData.lastName}
                    onChange={handleAddInputChange}
                    placeholder="Enter last name"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="dateOfBirth">Date of Birth</label>
                  <input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={addFormData.dateOfBirth}
                    onChange={handleAddInputChange}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={addFormData.gender}
                    onChange={handleAddInputChange}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="nationality">Nationality</label>
                  <select
                    id="nationality"
                    name="nationality"
                    value={addFormData.nationality}
                    onChange={handleAddInputChange}
                  >
                    <option value="">Select nationality</option>
                    <option value="Ugandan">Ugandan</option>
                    <option value="Kenyan">Kenyan</option>
                    <option value="Tanzanian">Tanzanian</option>
                    <option value="Rwandan">Rwandan</option>
                    <option value="South Sudanese">South Sudanese</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="currentClass">Current Class</label>
                  <select
                    id="currentClass"
                    name="currentClass"
                    value={addFormData.currentClass}
                    onChange={handleAddInputChange}
                  >
                    <option value="">Select class</option>
                    <option value="S.1">S.1</option>
                    <option value="S.2">S.2</option>
                    <option value="S.3">S.3</option>
                    <option value="S.4">S.4</option>
                    <option value="S.5">S.5</option>
                    <option value="S.6">S.6</option>
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="contact">Contact</label>
                  <input
                    id="contact"
                    name="contact"
                    type="text"
                    value={addFormData.contact}
                    onChange={handleAddInputChange}
                    placeholder="Enter contact"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={addFormData.status}
                    onChange={handleAddInputChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={closeAddModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewStudent && (
        <div className="modal-overlay" onClick={closeViewModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Student Details</h3>
              <button className="modal-close" onClick={closeViewModal} aria-label="Close modal">
                x
              </button>
            </div>

            <div className="student-details-grid">
              <p><strong>Student Name:</strong> {viewStudent.name}</p>
              <p><strong>Student ID:</strong> {viewStudent.id}</p>
              <p><strong>Class:</strong> {viewStudent.studentClass}</p>
              <p><strong>Contact:</strong> {viewStudent.contact}</p>
              <p><strong>Status:</strong> {viewStudent.status}</p>
            </div>
          </div>
        </div>
      )}

      {editStudent && (
        <div className="modal-overlay" onClick={closeEditModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Student</h3>
              <button className="modal-close" onClick={closeEditModal} aria-label="Close modal">
                x
              </button>
            </div>

            <form className="student-form" onSubmit={handleSaveEdit}>
              {editFormError ? <p className="form-error">{editFormError}</p> : null}

              <label htmlFor="editName">Student Name</label>
              <input
                id="editName"
                name="name"
                type="text"
                value={editFormData.name}
                onChange={handleEditInputChange}
              />

              <label htmlFor="editClass">Class</label>
              <input
                id="editClass"
                name="studentClass"
                type="text"
                value={editFormData.studentClass}
                onChange={handleEditInputChange}
              />

              <label htmlFor="editContact">Contact</label>
              <input
                id="editContact"
                name="contact"
                type="text"
                value={editFormData.contact}
                onChange={handleEditInputChange}
              />

              <label htmlFor="editStatus">Status</label>
              <select
                id="editStatus"
                name="status"
                value={editFormData.status}
                onChange={handleEditInputChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={closeEditModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      <div className="table-wrapper">
        {filteredStudents.length > 0 ? (
          <table className="students-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Student ID</th>
                <th>Class</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.id}</td>
                  <td>{student.studentClass}</td>
                  <td>{student.contact}</td>
                  <td>
                    <span className={getStatusBadgeClass(student.status)}>
                      {student.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        type="button"
                        className="btn btn-info btn-sm"
                        onClick={() => openViewModal(student)}
                      >
                        View
                      </button>
                      <button
                        type="button"
                        className="btn btn-warning btn-sm"
                        onClick={() => openEditModal(student)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteStudent(student.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-results">
            <p>No students found matching your search criteria.</p>
          </div>
        )}
      </div>

      <div className="table-footer">
        <p>Showing {filteredStudents.length} of {students.length} students</p>
      </div>
    </div>
  );
};

export default StudentSearch;
