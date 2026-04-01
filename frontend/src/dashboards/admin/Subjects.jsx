import React, { useMemo, useState } from "react";
import "./Subjects.css";

// Sample data
const sampleSubjects = [
  { id: 1, code: "MTH101", name: "Mathematics", type: "Compulsory", teachers: ["Mr. Okello", "Ms. Nakiyingi"], students: 120, description: "Core mathematics for all forms" },
  { id: 2, code: "ENG101", name: "English", type: "Compulsory", teachers: ["Ms. Naomi"], students: 125, description: "Language and literature" },
  { id: 3, code: "SCI101", name: "Science", type: "Compulsory", teachers: ["Mr. Johnson", "Mr. Tumwesigye"], students: 118, description: "Combined sciences curriculum" },
  { id: 4, code: "PHY101", name: "Physics", type: "Elective", teachers: ["Mr. Johnson"], students: 45, description: "Advanced physics studies" },
  { id: 5, code: "CHM101", name: "Chemistry", type: "Elective", teachers: ["Mr. Tumwesigye"], students: 42, description: "Organic and inorganic chemistry" },
];

const sampleTeachers = [
  { id: 1, name: "Mr. Okello" },
  { id: 2, name: "Ms. Nakiyingi" },
  { id: 3, name: "Ms. Naomi" },
  { id: 4, name: "Mr. Johnson" },
  { id: 5, name: "Mr. Tumwesigye" },
];

function Subjects() {
  const [subjects, setSubjects] = useState(sampleSubjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [subjectsPerPage] = useState(5);

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    type: "Compulsory",
    description: "",
    teachers: [],
  });

  // Calculate metrics
  const metrics = useMemo(() => {
    const totalSubjects = subjects.length;
    const activeSubjects = subjects.length;
    const compulsoryCount = subjects.filter((s) => s.type === "Compulsory").length;
    const electiveCount = subjects.filter((s) => s.type === "Elective").length;

    return { totalSubjects, activeSubjects, compulsoryCount, electiveCount };
  }, [subjects]);

  // Filter subjects
  const filteredSubjects = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();

    return subjects.filter((subject) => {
      const matchesSearch = subject.code.toLowerCase().includes(normalizedTerm) || 
                           subject.name.toLowerCase().includes(normalizedTerm);
      const matchesType = filterType === "all" || subject.type === filterType;

      return matchesSearch && matchesType;
    });
  }, [searchTerm, filterType, subjects]);

  // Pagination
  const paginatedSubjects = useMemo(() => {
    const startIndex = (currentPage - 1) * subjectsPerPage;
    return filteredSubjects.slice(startIndex, startIndex + subjectsPerPage);
  }, [filteredSubjects, currentPage, subjectsPerPage]);

  const totalPages = Math.ceil(filteredSubjects.length / subjectsPerPage);

  // Handle add subject
  const handleAddSubject = () => {
    if (!formData.code || !formData.name || !formData.type) {
      alert("Please fill in all required fields");
      return;
    }

    const newSubject = {
      id: Math.max(...subjects.map((s) => s.id), 0) + 1,
      code: formData.code,
      name: formData.name,
      type: formData.type,
      description: formData.description,
      teachers: formData.teachers,
      students: 0,
    };

    setSubjects([...subjects, newSubject]);
    setIsAddModalOpen(false);
    setFormData({ code: "", name: "", type: "Compulsory", description: "", teachers: [] });
  };

  // Handle edit subject
  const handleEditSubject = () => {
    if (!formData.code || !formData.name || !formData.type) {
      alert("Please fill in all required fields");
      return;
    }

    setSubjects(
      subjects.map((subject) =>
        subject.id === selectedSubject.id
          ? { ...subject, code: formData.code, name: formData.name, type: formData.type, description: formData.description, teachers: formData.teachers }
          : subject
      )
    );

    setIsEditModalOpen(false);
    setSelectedSubject(null);
    setFormData({ code: "", name: "", type: "Compulsory", description: "", teachers: [] });
  };

  // Handle delete subject
  const handleDeleteSubject = () => {
    if (subjectToDelete) {
      setSubjects(subjects.filter((subject) => subject.id !== subjectToDelete.id));
      setIsDeleteConfirmModalOpen(false);
      setSubjectToDelete(null);
    }
  };

  // Open edit modal
  const openEditModal = (subject) => {
    setSelectedSubject(subject);
    setFormData({
      code: subject.code,
      name: subject.name,
      type: subject.type,
      description: subject.description,
      teachers: subject.teachers,
    });
    setIsEditModalOpen(true);
  };

  // Open delete confirmation modal
  const openDeleteConfirmModal = (subject) => {
    setSubjectToDelete(subject);
    setIsDeleteConfirmModalOpen(true);
  };

  // Toggle teacher selection
  const toggleTeacher = (teacherName) => {
    if (formData.teachers.includes(teacherName)) {
      setFormData({
        ...formData,
        teachers: formData.teachers.filter((t) => t !== teacherName),
      });
    } else {
      setFormData({
        ...formData,
        teachers: [...formData.teachers, teacherName],
      });
    }
  };

  return (
    <div className="subjects-page p-4">
      <div className="subjects-header mb-4">
        <div>
          <h1 className="mb-2">Subjects Management</h1>
          <p className="text-muted mb-0">Manage subjects, assign teachers, and view course information.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
          <i className="fa-solid fa-plus me-2"></i> Add New Subject
        </button>
      </div>

      {/* Overview Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="subjects-card total-card h-100">
            <i className="fa-solid fa-book subjects-icon" style={{border:"1px solid #2563eb", borderRadius:"50%",width:"50px", height: "50px", fontSize:"15px", display:"grid", placeItems:"center", color:"#2563eb",marginBottom:"5px"}} aria-hidden="true"></i>
            <h3>Total Subjects</h3>
            <h2>{metrics.totalSubjects}</h2>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="subjects-card active-card h-100">
            <i className="fa-solid fa-check-circle subjects-icon" style={{border:"1px solid #16a34a", borderRadius:"50%",width:"50px", height: "50px", fontSize:"15px", display:"grid", placeItems:"center", color:"#16a34a",marginBottom:"5px"}} aria-hidden="true"></i>
            <h3>Active Subjects</h3>
            <h2>{metrics.activeSubjects}</h2>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="subjects-card compulsory-card h-100">
            <i className="fa-solid fa-book-open subjects-icon" style={{border:"1px solid #f59e0b", borderRadius:"50%",width:"50px", height: "50px", fontSize:"15px", display:"grid", placeItems:"center", color:"#f59e0b",marginBottom:"5px"}} aria-hidden="true"></i>
            <h3>Compulsory</h3>
            <h2>{metrics.compulsoryCount}</h2>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="subjects-card elective-card h-100">
            <i className="fa-solid fa-graduation-cap subjects-icon" style={{border:"1px solid #8b5cf6", borderRadius:"50%",width:"50px", height: "50px", fontSize:"15px", display:"grid", placeItems:"center", color:"#8b5cf6",marginBottom:"5px"}} aria-hidden="true"></i>
            <h3>Elective</h3>
            <h2>{metrics.electiveCount}</h2>
          </div>
        </div>
      </div>

      {/* Subjects List Tab */}
      <div className="card">
        <div className="card-body">
          <h2 className="mb-4 fs-5">Subjects Overview</h2>

          {/* Filters */}
          <div className="row g-3 mb-4">
            <div className="col-12 col-md-6 col-lg-6">
              <div className="subjects-search-wrapper">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search subject name or code"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
                <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-6">
              <select
                className="form-select"
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="all">All Types</option>
                <option value="Compulsory">Compulsory</option>
                <option value="Elective">Elective</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="table table-hover table-sm mb-0">
              <thead className="table-light">
                <tr>
                  <th>Code</th>
                  <th>Subject Name</th>
                  <th>Type</th>
                  <th>Teachers</th>
                  <th>Students</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedSubjects.length > 0 ? (
                  paginatedSubjects.map((subject) => (
                    <tr key={subject.id}>
                      <td className="fw-bold">{subject.code}</td>
                      <td>{subject.name}</td>
                      <td>
                        <span className={`badge ${subject.type === "Compulsory" ? "bg-warning" : "bg-info"}`}>
                          {subject.type}
                        </span>
                      </td>
                      <td>
                        <small>{subject.teachers.join(", ") || "Not assigned"}</small>
                      </td>
                      <td>{subject.students}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="action-btn view-btn"
                            onClick={() => {
                              setSelectedSubject(subject);
                              setIsDetailsModalOpen(true);
                            }}
                            title="View Details"
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                          <button
                            className="action-btn edit-btn"
                            onClick={() => openEditModal(subject)}
                            title="Edit"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="action-btn delete-btn"
                            onClick={() => openDeleteConfirmModal(subject)}
                            title="Delete"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
                      <i className="fas fa-inbox me-2"></i>No subjects found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="d-flex justify-content-center mt-4">
              <ul className="pagination mb-0">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index + 1} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                    <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>

      {/* Subject Details Modal */}
      {isDetailsModalOpen && selectedSubject && (
        <div className="subjects-modal-overlay">
          <div className="subjects-modal">
            <div className="subjects-modal-header">
              <h3>{selectedSubject.name} - Subject Details</h3>
              <button className="btn-close" onClick={() => setIsDetailsModalOpen(false)}></button>
            </div>
            <div className="subjects-modal-body">
              <div className="row mb-4">
                <div className="col-md-6">
                  <h6 className="fw-bold mb-3">Subject Information</h6>
                  <p><strong>Code:</strong> {selectedSubject.code}</p>
                  <p><strong>Name:</strong> {selectedSubject.name}</p>
                  <p><strong>Type:</strong> <span className={`badge ${selectedSubject.type === "Compulsory" ? "bg-warning" : "bg-info"}`}>{selectedSubject.type}</span></p>
                  <p><strong>Description:</strong> {selectedSubject.description || "No description"}</p>
                </div>
                <div className="col-md-6">
                  <h6 className="fw-bold mb-3">Subject Stats</h6>
                  <p><strong>Total Students:</strong> {selectedSubject.students}</p>
                  <p><strong>Assigned Teachers:</strong> {selectedSubject.teachers.length}</p>
                  <p><strong>Status:</strong> <span className="badge bg-success">Active</span></p>
                </div>
              </div>

              <hr />

              <h6 className="fw-bold mb-3">Assigned Teachers</h6>
              {selectedSubject.teachers.length > 0 ? (
                <ul className="list-group">
                  {selectedSubject.teachers.map((teacher, index) => (
                    <li key={index} className="list-group-item">
                      <i className="fas fa-user-tie me-2"></i>{teacher}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="alert alert-info">No teachers assigned to this subject yet.</div>
              )}
            </div>
            <div className="subjects-modal-footer">
              <button className="btn btn-secondary" onClick={() => setIsDetailsModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmModalOpen && subjectToDelete && (
        <div className="subjects-modal-overlay">
          <div className="subjects-modal" style={{ maxWidth: "400px" }}>
            <div className="subjects-modal-header">
              <h3>Delete Subject</h3>
              <button className="btn-close" onClick={() => {
                setIsDeleteConfirmModalOpen(false);
                setSubjectToDelete(null);
              }}></button>
            </div>
            <div className="subjects-modal-body">
              <div className="alert alert-warning" role="alert">
                <i className="fas fa-exclamation-triangle me-2"></i>
                <strong>Warning!</strong> This action cannot be undone.
              </div>
              <p>Are you sure you want to delete the subject <strong>{subjectToDelete.name}</strong> ({subjectToDelete.code})?</p>
              <p className="text-muted mb-0">All associated data will be permanently removed.</p>
            </div>
            <div className="subjects-modal-footer">
              <button className="btn btn-secondary" onClick={() => {
                setIsDeleteConfirmModalOpen(false);
                setSubjectToDelete(null);
              }}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleDeleteSubject}>
                <i className="fas fa-trash me-2"></i> Delete Subject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Subject Modal */}
      {isAddModalOpen && (
        <div className="subjects-modal-overlay">
          <div className="subjects-modal">
            <div className="subjects-modal-header">
              <h3>Add New Subject</h3>
              <button className="btn-close" onClick={() => setIsAddModalOpen(false)}></button>
            </div>
            <div className="subjects-modal-body">
              <form className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold">Subject Code *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., MTH101"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Subject Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., Mathematics"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Type *</label>
                  <select
                    className="form-select"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="Compulsory">Compulsory</option>
                    <option value="Elective">Elective</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Brief description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label fw-bold">Assign Teachers</label>
                  <div className="border rounded p-3">
                    {sampleTeachers.map((teacher) => (
                      <div key={teacher.id} className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`teacher-${teacher.id}`}
                          checked={formData.teachers.includes(teacher.name)}
                          onChange={() => toggleTeacher(teacher.name)}
                        />
                        <label className="form-check-label" htmlFor={`teacher-${teacher.id}`}>
                          {teacher.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            </div>
            <div className="subjects-modal-footer">
              <button className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleAddSubject}>
                <i className="fas fa-plus me-2"></i> Create Subject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Subject Modal */}
      {isEditModalOpen && selectedSubject && (
        <div className="subjects-modal-overlay">
          <div className="subjects-modal">
            <div className="subjects-modal-header">
              <h3>Edit Subject</h3>
              <button className="btn-close" onClick={() => setIsEditModalOpen(false)}></button>
            </div>
            <div className="subjects-modal-body">
              <form className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold">Subject Code *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Subject Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Type *</label>
                  <select
                    className="form-select"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="Compulsory">Compulsory</option>
                    <option value="Elective">Elective</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label fw-bold">Assign Teachers</label>
                  <div className="border rounded p-3">
                    {sampleTeachers.map((teacher) => (
                      <div key={teacher.id} className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`teacher-edit-${teacher.id}`}
                          checked={formData.teachers.includes(teacher.name)}
                          onChange={() => toggleTeacher(teacher.name)}
                        />
                        <label className="form-check-label" htmlFor={`teacher-edit-${teacher.id}`}>
                          {teacher.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            </div>
            <div className="subjects-modal-footer">
              <button className="btn btn-secondary" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleEditSubject}>
                <i className="fas fa-save me-2"></i> Update Subject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Subjects;
