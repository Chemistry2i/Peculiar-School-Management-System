import React, { useState, useMemo } from 'react';
import './TeacherSearch.css';

const TeacherSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTeachersCount, setNewTeachersCount] = useState(0);
  const [viewTeacher, setViewTeacher] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [teacherToEditId, setTeacherToEditId] = useState('');
  const [editError, setEditError] = useState('');
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    teacherId: '',
    email: '',
    contactDetails: '',
    password: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    qualification: '',
    specialisation: '',
    department: '',
    hireDate: '',
  });
  const [editFormData, setEditFormData] = useState({
    firstName: '',
    lastName: '',
    teacherId: '',
    email: '',
    contactDetails: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    qualification: '',
    specialisation: '',
    department: '',
    hireDate: '',
  });

  // Sample teacher data
  const [teachers, setTeachers] = useState([
    {
      id: 'TEACH001',
      name: 'Mr. Robert Tamale',
      subject: 'Mathematics',
      email: 'robert.tamale@school.edu',
      phone: '+254712345678',
      firstName: 'Robert',
      lastName: 'Tamale',
      contactDetails: '+254712345678',
      dateOfBirth: '1985-03-14',
      gender: 'Male',
      nationality: 'Ugandan',
      qualification: 'Masters',
      specialisation: 'Mathematics',
      department: 'Science',
      hireDate: '2021-01-10',
    },
    {
      id: 'TEACH002',
      name: 'Ms. Sarah Nantume',
      subject: 'English Literature',
      email: 'sarah.nantume@school.edu',
      phone: '+254787654321',
      firstName: 'Sarah',
      lastName: 'Nantume',
      contactDetails: '+254787654321',
      dateOfBirth: '1989-07-21',
      gender: 'Female',
      nationality: 'Ugandan',
      qualification: 'Bachelors',
      specialisation: 'English Literature',
      department: 'Languages',
      hireDate: '2022-04-05',
    },
    {
      id: 'TEACH003',
      name: 'Mr. James Nduga',
      subject: 'Physics',
      email: 'james.nduga@school.edu',
      phone: '+254722334455',
      firstName: 'James',
      lastName: 'Nduga',
      contactDetails: '+254722334455',
      dateOfBirth: '1982-11-09',
      gender: 'Male',
      nationality: 'Kenyan',
      qualification: 'PhD',
      specialisation: 'Physics',
      department: 'Science',
      hireDate: '2019-09-02',
    },
    {
      id: 'TEACH004',
      name: 'Ms. Emily kajoba',
      subject: 'Chemistry',
      email: 'emily.kajoba@school.edu',
      phone: '+254799887766',
      firstName: 'Emily',
      lastName: 'Kajoba',
      contactDetails: '+254799887766',
      dateOfBirth: '1990-05-18',
      gender: 'Female',
      nationality: 'Tanzanian',
      qualification: 'Masters',
      specialisation: 'Chemistry',
      department: 'Science',
      hireDate: '2020-06-15',
    },
    {
      id: 'TEACH005',
      name: 'Mr. David Bali',
      subject: 'History',
      email: 'david.bali@school.edu',
      phone: '+254711223344',
      firstName: 'David',
      lastName: 'Bali',
      contactDetails: '+254711223344',
      dateOfBirth: '1987-02-28',
      gender: 'Male',
      nationality: 'Rwandan',
      qualification: 'Bachelors',
      specialisation: 'History',
      department: 'Humanities',
      hireDate: '2023-01-08',
    },
    {
      id: 'TEACH006',
      name: 'Ms. Lisa Ojambo',
      subject: 'Biology',
      email: 'lisa.ojambo@school.edu',
      phone: '+254755667788',
      firstName: 'Lisa',
      lastName: 'Ojambo',
      contactDetails: '+254755667788',
      dateOfBirth: '1991-10-03',
      gender: 'Female',
      nationality: 'South Sudanese',
      qualification: 'Postgraduate Diploma',
      specialisation: 'Biology',
      department: 'Science',
      hireDate: '2021-08-30',
    },
  ]);

  // Filter teachers based on search term
  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const matchesSearch =
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.id.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [searchTerm, teachers]);

  const totalTeachers = teachers.length;

  const syllabusProgress = useMemo(() => {
    return Math.min(100, 55 + teachers.length * 5);
  }, [teachers.length]);

  const topDepartment = useMemo(() => {
    const departmentCounts = teachers.reduce((acc, teacher) => {
      const key = teacher.department || 'Unassigned';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const entries = Object.entries(departmentCounts);
    if (!entries.length) {
      return { name: 'N/A', count: 0 };
    }

    const [name, count] = entries.sort((a, b) => b[1] - a[1])[0];
    return { name, count };
  }, [teachers]);

  const openAddModal = () => {
    setFormError('');
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setFormError('');
    setIsAddModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      teacherId: '',
      email: '',
      contactDetails: '',
      password: '',
      dateOfBirth: '',
      gender: '',
      nationality: '',
      qualification: '',
      specialisation: '',
      department: '',
      hireDate: '',
    });
  };

  const handleAddTeacher = (e) => {
    e.preventDefault();

    const firstName = formData.firstName.trim();
    const lastName = formData.lastName.trim();
    const teacherId = formData.teacherId.trim().toUpperCase();
    const email = formData.email.trim();
    const contactDetails = formData.contactDetails.trim();
    const password = formData.password.trim();
    const dateOfBirth = formData.dateOfBirth;
    const gender = formData.gender;
    const nationality = formData.nationality;
    const qualification = formData.qualification;
    const specialisation = formData.specialisation;
    const department = formData.department;
    const hireDate = formData.hireDate;

    if (
      !firstName ||
      !lastName ||
      !teacherId ||
      !email ||
      !contactDetails ||
      !password ||
      !dateOfBirth ||
      !gender ||
      !nationality ||
      !qualification ||
      !specialisation ||
      !department ||
      !hireDate
    ) {
      setFormError('Please fill in all teacher details.');
      return;
    }

    const idExists = teachers.some((teacher) => teacher.id.toLowerCase() === teacherId.toLowerCase());
    if (idExists) {
      setFormError('Teacher ID already exists. Use a unique Teacher ID.');
      return;
    }

    const newTeacher = {
      id: teacherId,
      name: `${firstName} ${lastName}`,
      subject: specialisation,
      email,
      phone: contactDetails,
      firstName,
      lastName,
      contactDetails,
      password,
      dateOfBirth,
      gender,
      nationality,
      qualification,
      specialisation,
      department,
      hireDate,
    };

    setTeachers((prev) => [newTeacher, ...prev]);
    setNewTeachersCount((prev) => prev + 1);
    resetForm();
    closeAddModal();
  };

  // Handle action buttons
  const handleViewTeacher = (teacher) => {
    setViewTeacher(teacher);
  };

  const closeViewTeacher = () => {
    setViewTeacher(null);
  };

  const handleEditTeacher = (teacher) => {
    setEditError('');
    setTeacherToEditId(teacher.id);
    setEditFormData({
      firstName: teacher.firstName || teacher.name || '',
      lastName: teacher.lastName || '',
      teacherId: teacher.id,
      email: teacher.email || '',
      contactDetails: teacher.contactDetails || teacher.phone || '',
      dateOfBirth: teacher.dateOfBirth || '',
      gender: teacher.gender || '',
      nationality: teacher.nationality || '',
      qualification: teacher.qualification || '',
      specialisation: teacher.specialisation || teacher.subject || '',
      department: teacher.department || '',
      hireDate: teacher.hireDate || '',
    });
    setIsEditModalOpen(true);
  };

  const closeEditTeacher = () => {
    setEditError('');
    setIsEditModalOpen(false);
    setTeacherToEditId('');
  };

  const handleSaveEditedTeacher = (e) => {
    e.preventDefault();

    const firstName = editFormData.firstName.trim();
    const lastName = editFormData.lastName.trim();
    const email = editFormData.email.trim();
    const contactDetails = editFormData.contactDetails.trim();
    const specialisation = editFormData.specialisation;

    if (!firstName || !email || !contactDetails || !specialisation) {
      setEditError('Please fill in all required teacher details.');
      return;
    }

    const updatedTeacher = {
      id: teacherToEditId,
      name: `${firstName} ${lastName}`.trim(),
      subject: specialisation,
      email,
      phone: contactDetails,
      firstName,
      lastName,
      contactDetails,
      dateOfBirth: editFormData.dateOfBirth,
      gender: editFormData.gender,
      nationality: editFormData.nationality,
      qualification: editFormData.qualification,
      specialisation: editFormData.specialisation,
      department: editFormData.department,
      hireDate: editFormData.hireDate,
    };

    setTeachers((prev) =>
      prev.map((teacher) =>
        teacher.id === teacherToEditId
          ? {
              ...teacher,
              ...updatedTeacher,
            }
          : teacher
      )
    );

    closeEditTeacher();
  };

  const handleDeleteTeacher = (teacher) => {
    setTeachers((prev) => prev.filter((item) => item.id !== teacher.id));
  };

  return (
    <div className="teacher-search-container">
      <section className="teacher-summary-cards" aria-label="Teacher summary cards">
        <article className="teacher-summary-card teacher-summary-total">
          <i className="fa-solid fa-user-tie teacher-summary-icon" aria-hidden="true"></i>
          <p>Total Teachers</p>
          <h3>{totalTeachers}</h3>
        </article>

        <article className="teacher-summary-card teacher-summary-new">
          <i className="fa-solid fa-user-plus teacher-summary-icon" aria-hidden="true"></i>
          <p>New Teachers</p>
          <h3>{newTeachersCount}</h3>
        </article>

        <article className="teacher-summary-card teacher-summary-progress">
          <i className="fa-solid fa-book-open teacher-summary-icon" aria-hidden="true"></i>
          <p>Syllabus Progress</p>
          <h3>{`${syllabusProgress}%`}</h3>
        </article>

        <article className="teacher-summary-card teacher-summary-top-department">
          <i className="fa-solid fa-trophy teacher-summary-icon" aria-hidden="true"></i>
          <p>Top Performing Departments</p>
          <h3>{topDepartment.count}</h3>
        </article>
      </section>

      <div className="search-section">
        <div className="teacher-header">
          <h2>Teacher Management</h2>
          <button type="button" className="btn-add-teacher" onClick={openAddModal}>
            Add Teacher
          </button>
        </div>
        
        <div className="search-filters">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search by teacher name, subject, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon"><i className="fa-solid fa-magnifying-glass"></i></span>
          </div>
        </div>
      </div>

      {isAddModalOpen && (
        <div className="teacher-modal-overlay" onClick={closeAddModal}>
          <div className="teacher-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="teacher-modal-header">
              <h3>Add Teacher</h3>
              <button type="button" className="teacher-modal-close" onClick={closeAddModal}>x</button>
            </div>

            <form className="teacher-form" onSubmit={handleAddTeacher}>
              {formError ? <p className="teacher-form-error">{formError}</p> : null}

              <div className="teacher-form-grid">
                <div className="teacher-form-field">
                  <label htmlFor="firstName">First Name</label>
                  <input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleInputChange} />
                </div>

                <div className="teacher-form-field">
                  <label htmlFor="lastName">Last Name</label>
                  <input id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleInputChange} />
                </div>

                <div className="teacher-form-field">
                  <label htmlFor="teacherId">Teacher ID</label>
                  <input id="teacherId" name="teacherId" type="text" value={formData.teacherId} onChange={handleInputChange} placeholder="e.g TEACH007" />
                </div>

                <div className="teacher-form-field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                </div>

                <div className="teacher-form-field">
                  <label htmlFor="contactDetails">Contact Details</label>
                  <input id="contactDetails" name="contactDetails" type="text" value={formData.contactDetails} onChange={handleInputChange} placeholder="e.g +256700123456" />
                </div>

                <div className="teacher-form-field">
                  <label htmlFor="password">Password</label>
                  <input id="password" name="password" type="password" value={formData.password} onChange={handleInputChange} />
                </div>

                <div className="teacher-form-field">
                  <label htmlFor="dateOfBirth">Date of Birth</label>
                  <input id="dateOfBirth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleInputChange} />
                </div>

                <div className="teacher-form-field">
                  <label htmlFor="gender">Gender</label>
                  <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange}>
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="teacher-form-field">
                  <label htmlFor="nationality">Nationality</label>
                  <select id="nationality" name="nationality" value={formData.nationality} onChange={handleInputChange}>
                    <option value="">Select nationality</option>
                    <option value="Ugandan">Ugandan</option>
                    <option value="Kenyan">Kenyan</option>
                    <option value="Tanzanian">Tanzanian</option>
                    <option value="Rwandan">Rwandan</option>
                    <option value="South Sudanese">South Sudanese</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="teacher-form-field">
                  <label htmlFor="qualification">Qualification</label>
                  <select id="qualification" name="qualification" value={formData.qualification} onChange={handleInputChange}>
                    <option value="">Select qualification</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Bachelors">Bachelors</option>
                    <option value="Postgraduate Diploma">Postgraduate Diploma</option>
                    <option value="Masters">Masters</option>
                    <option value="PhD">PhD</option>
                  </select>
                </div>

                <div className="teacher-form-field">
                  <label htmlFor="specialisation">Specialisation</label>
                  <select id="specialisation" name="specialisation" value={formData.specialisation} onChange={handleInputChange}>
                    <option value="">Select specialisation</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="English Literature">English Literature</option>
                    <option value="History">History</option>
                    <option value="ICT">ICT</option>
                  </select>
                </div>

                <div className="teacher-form-field">
                  <label htmlFor="department">Department</label>
                  <select id="department" name="department" value={formData.department} onChange={handleInputChange}>
                    <option value="">Select department</option>
                    <option value="Science">Science</option>
                    <option value="Languages">Languages</option>
                    <option value="Humanities">Humanities</option>
                    <option value="ICT">ICT</option>
                  </select>
                </div>

                <div className="teacher-form-field">
                  <label htmlFor="hireDate">Hire Date</label>
                  <input id="hireDate" name="hireDate" type="date" value={formData.hireDate} onChange={handleInputChange} />
                </div>
              </div>

              <div className="teacher-form-actions">
                <button type="button" className="teacher-cancel-btn" onClick={closeAddModal}>Cancel</button>
                <button type="submit" className="teacher-save-btn">Save Teacher</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewTeacher && (
        <div className="teacher-modal-overlay" onClick={closeViewTeacher}>
          <div className="teacher-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="teacher-modal-header">
              <h3>Teacher Details</h3>
              <button type="button" className="teacher-modal-close" onClick={closeViewTeacher}>x</button>
            </div>

            <div className="teacher-details-grid">
              <p><strong>Teacher Name:</strong> {viewTeacher.name}</p>
              <p><strong>Teacher ID:</strong> {viewTeacher.id}</p>
              <p><strong>Email:</strong> {viewTeacher.email || '-'}</p>
              <p><strong>Contact:</strong> {viewTeacher.contactDetails || viewTeacher.phone || '-'}</p>
              <p><strong>Gender:</strong> {viewTeacher.gender || '-'}</p>
              <p><strong>Nationality:</strong> {viewTeacher.nationality || '-'}</p>
              <p><strong>Qualification:</strong> {viewTeacher.qualification || '-'}</p>
              <p><strong>Specialisation:</strong> {viewTeacher.specialisation || viewTeacher.subject || '-'}</p>
              <p><strong>Department:</strong> {viewTeacher.department || '-'}</p>
              <p><strong>Date of Birth:</strong> {viewTeacher.dateOfBirth || '-'}</p>
              <p><strong>Hire Date:</strong> {viewTeacher.hireDate || '-'}</p>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="teacher-modal-overlay" onClick={closeEditTeacher}>
          <div className="teacher-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="teacher-modal-header">
              <h3>Edit Teacher</h3>
              <button type="button" className="teacher-modal-close" onClick={closeEditTeacher}>x</button>
            </div>

            <form className="teacher-form" onSubmit={handleSaveEditedTeacher}>
              {editError ? <p className="teacher-form-error">{editError}</p> : null}

              <div className="teacher-form-grid">
                <div className="teacher-form-field">
                  <label htmlFor="editFirstName">First Name</label>
                  <input id="editFirstName" name="firstName" type="text" value={editFormData.firstName} onChange={handleEditInputChange} />
                </div>

                <div className="teacher-form-field">
                  <label htmlFor="editLastName">Last Name</label>
                  <input id="editLastName" name="lastName" type="text" value={editFormData.lastName} onChange={handleEditInputChange} />
                </div>

                <div className="teacher-form-field">
                  <label htmlFor="editTeacherId">Teacher ID</label>
                  <input id="editTeacherId" name="teacherId" type="text" value={editFormData.teacherId} readOnly className="teacher-readonly-input" />
                </div>

                <div className="teacher-form-field">
                  <label htmlFor="editEmail">Email</label>
                  <input id="editEmail" name="email" type="email" value={editFormData.email} onChange={handleEditInputChange} />
                </div>

                <div className="teacher-form-field">
                  <label htmlFor="editContactDetails">Contact Details</label>
                  <input id="editContactDetails" name="contactDetails" type="text" value={editFormData.contactDetails} onChange={handleEditInputChange} />
                </div>

                <div className="teacher-form-field">
                  <label htmlFor="editDateOfBirth">Date of Birth</label>
                  <input id="editDateOfBirth" name="dateOfBirth" type="date" value={editFormData.dateOfBirth} onChange={handleEditInputChange} />
                </div>

                <div className="teacher-form-field">
                  <label htmlFor="editGender">Gender</label>
                  <select id="editGender" name="gender" value={editFormData.gender} onChange={handleEditInputChange}>
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="teacher-form-field">
                  <label htmlFor="editNationality">Nationality</label>
                  <select id="editNationality" name="nationality" value={editFormData.nationality} onChange={handleEditInputChange}>
                    <option value="">Select nationality</option>
                    <option value="Ugandan">Ugandan</option>
                    <option value="Kenyan">Kenyan</option>
                    <option value="Tanzanian">Tanzanian</option>
                    <option value="Rwandan">Rwandan</option>
                    <option value="South Sudanese">South Sudanese</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="teacher-form-field">
                  <label htmlFor="editQualification">Qualification</label>
                  <select id="editQualification" name="qualification" value={editFormData.qualification} onChange={handleEditInputChange}>
                    <option value="">Select qualification</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Bachelors">Bachelors</option>
                    <option value="Postgraduate Diploma">Postgraduate Diploma</option>
                    <option value="Masters">Masters</option>
                    <option value="PhD">PhD</option>
                  </select>
                </div>

                <div className="teacher-form-field">
                  <label htmlFor="editSpecialisation">Specialisation</label>
                  <select id="editSpecialisation" name="specialisation" value={editFormData.specialisation} onChange={handleEditInputChange}>
                    <option value="">Select specialisation</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="English Literature">English Literature</option>
                    <option value="History">History</option>
                    <option value="ICT">ICT</option>
                  </select>
                </div>

                <div className="teacher-form-field">
                  <label htmlFor="editDepartment">Department</label>
                  <select id="editDepartment" name="department" value={editFormData.department} onChange={handleEditInputChange}>
                    <option value="">Select department</option>
                    <option value="Science">Science</option>
                    <option value="Languages">Languages</option>
                    <option value="Humanities">Humanities</option>
                    <option value="ICT">ICT</option>
                  </select>
                </div>

                <div className="teacher-form-field">
                  <label htmlFor="editHireDate">Hire Date</label>
                  <input id="editHireDate" name="hireDate" type="date" value={editFormData.hireDate} onChange={handleEditInputChange} />
                </div>
              </div>

              <div className="teacher-form-actions">
                <button type="button" className="teacher-cancel-btn" onClick={closeEditTeacher}>Cancel</button>
                <button type="submit" className="teacher-save-btn">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="table-wrapper">
        {filteredTeachers.length > 0 ? (
          <table className="teachers-table">
            <thead>
              <tr>
                <th>Teacher Name</th>
                <th>Teacher ID</th>
                <th>Subject</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td>{teacher.name}</td>
                  <td>{teacher.id}</td>
                  <td>
                    <span className="subject-badge">{teacher.subject}</span>
                  </td>
                  <td className="email">{teacher.email}</td>
                  <td className="phone">{teacher.phone}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleViewTeacher(teacher)}
                        title="View Details"
                      >
                        View
                      </button>
                      <button
                        className="btn btn-warning"
                        onClick={() => handleEditTeacher(teacher)}
                        title="Edit Teacher"
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteTeacher(teacher)}
                        title="Delete Teacher"
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
            <p>No teachers found matching your search criteria.</p>
          </div>
        )}
      </div>

      <div className="table-footer">
        <p>Showing {filteredTeachers.length} of {teachers.length} teachers</p>
      </div>
    </div>
  );
};

export default TeacherSearch;
