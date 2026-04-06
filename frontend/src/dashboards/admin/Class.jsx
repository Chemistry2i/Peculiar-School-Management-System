import React, { useMemo, useState } from "react";
import "./Class.css";

// Sample data
const sampleClasses = [
  { id: 1, name: "S.1A", roomNumber: "101", teacher: "Mr. Okello", students: 45, year: "2025-2026", attendance: 92, performance: 3.8 },
  { id: 2, name: "S.2A", roomNumber: "102", teacher: "Mr. Tumwesigye", students: 42, year: "2025-2026", attendance: 90, performance: 3.9 },
  { id: 3, name: "S.3A", roomNumber: "103", teacher: "Mr. Johnson", students: 40, year: "2025-2026", attendance: 94, performance: 4.1 },
];

const sampleTeachers = [
  { id: 1, name: "Mr. Okello" },
  { id: 2, name: "Mr. Tumwesigye" },
  { id: 3, name: "Mr. Johnson" },
];

const sampleStudents = [
  { id: 1, name: "John Makumbi", classId: 1, enrollment: "STU-001" },
  { id: 2, name: "Sarah Ocan", classId: 1, enrollment: "STU-002" },
  { id: 3, name: "Michael Otto", classId: 2, enrollment: "STU-003" },
  { id: 4, name: "Emily Watera", classId: 2, enrollment: "STU-004" },
  { id: 5, name: "David Kijjambu", classId: 3, enrollment: "STU-005" },
  { id: 6, name: "Anna Nanyonjo", classId: 3, enrollment: "STU-006" },
];

const sampleTimetable = [
  { day: "Monday", time: "8:00-9:00", subject: "Mathematics", teacher: "Mr. Okello" },
  { day: "Monday", time: "9:00-10:00", subject: "English", teacher: "Ms. Nakiyingi" },
  { day: "Tuesday", time: "8:00-9:00", subject: "Science", teacher: "Mr. Johnson" },
  { day: "Tuesday", time: "9:00-10:00", subject: "History", teacher: "Ms. Naomi" },
  { day: "Wednesday", time: "8:00-9:00", subject: "Mathematics", teacher: "Mr. Okello" },
  { day: "Wednesday", time: "9:00-10:00", subject: "Physics", teacher: "Mr. Tumwesigye" },
  { day: "Thursday", time: "8:00-9:00", subject: "Chemistry", teacher: "Mr. Johnson" },
  { day: "Thursday", time: "9:00-10:00", subject: "English", teacher: "Ms. Nakiyingi" },
  { day: "Friday", time: "8:00-9:00", subject: "Biology", teacher: "Ms. Naomi" },
  { day: "Friday", time: "9:00-10:00", subject: "Mathematics", teacher: "Mr. Okello" },
];

function Class() {
  const [classes, setClasses] = useState(sampleClasses);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRoom, setFilterRoom] = useState("all");
  const [selectedClass, setSelectedClass] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [classToDelete, setClassToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [classesPerPage] = useState(5);
  const [selectedTab, setSelectedTab] = useState("overview");

  const [formData, setFormData] = useState({
    name: '',
    formLevel: 1,
    levelType: 'O_LEVEL',
    academicYear: '2025-2026',
    stream: '',
    classroom: '',
    building: '',
    maxCapacity: 50,
    notes: '',
  });

  // Calculate metrics
  const metrics = useMemo(() => {
    const totalClasses = classes.length;
    const totalStudents = classes.reduce((sum, cls) => sum + cls.students, 0);
    const avgAttendance = (classes.reduce((sum, cls) => sum + cls.attendance, 0) / classes.length).toFixed(1);
    const totalRooms = [...new Set(classes.map((cls) => cls.roomNumber))].length;

    return { totalClasses, totalStudents, avgAttendance, totalRooms };
  }, [classes]);

  // Get unique room numbers
  const uniqueRooms = useMemo(() => {
    return [...new Set(classes.map((cls) => cls.roomNumber))].sort();
  }, [classes]);

  // Filter classes
  const filteredClasses = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();

    return classes.filter((cls) => {
      const matchesSearch = cls.name.toLowerCase().includes(normalizedTerm) || cls.roomNumber.toLowerCase().includes(normalizedTerm);
      const matchesRoom = filterRoom === "all" || cls.roomNumber === filterRoom;

      return matchesSearch && matchesRoom;
    });
  }, [searchTerm, filterRoom, classes]);

  // Pagination
  const paginatedClasses = useMemo(() => {
    const startIndex = (currentPage - 1) * classesPerPage;
    return filteredClasses.slice(startIndex, startIndex + classesPerPage);
  }, [filteredClasses, currentPage, classesPerPage]);

  const totalPages = Math.ceil(filteredClasses.length / classesPerPage);

  // Get students for selected class
  const classStudents = useMemo(() => {
    if (!selectedClass) return [];
    return sampleStudents.filter((student) => student.classId === selectedClass.id);
  }, [selectedClass]);

  // Handle add class
  const handleAddClass = () => {
    if (!formData.name || !formData.formLevel || !formData.levelType || !formData.academicYear) {
      alert("Please fill in all required fields (Name, Form Level, Level Type, Academic Year)");
      return;
    }

    const newClass = {
      id: Math.max(...classes.map((c) => c.id), 0) + 1,
      name: formData.name,
      roomNumber: formData.classroom, // Display field for table
      teacher: sampleTeachers[0]?.name || 'Unassigned', // Display field
      students: 0,
      year: formData.academicYear,
      attendance: 0,
      performance: 0,
      // Backend fields
      formLevel: parseInt(formData.formLevel),
      levelType: formData.levelType,
      academicYear: formData.academicYear,
      stream: formData.stream,
      classroom: formData.classroom,
      building: formData.building,
      maxCapacity: parseInt(formData.maxCapacity) || 50,
      notes: formData.notes,
      isActive: true,
    };

    setClasses([...classes, newClass]);
    setIsAddModalOpen(false);
    setFormData({
      name: '',
      formLevel: 1,
      levelType: 'O_LEVEL',
      academicYear: '2025-2026',
      stream: '',
      classroom: '',
      building: '',
      maxCapacity: 50,
      notes: '',
    });
  };

  // Handle edit class
  const handleEditClass = () => {
    if (!formData.name || !formData.formLevel || !formData.levelType || !formData.academicYear) {
      alert("Please fill in all required fields (Name, Form Level, Level Type, Academic Year)");
      return;
    }

    setClasses(
      classes.map((cls) =>
        cls.id === selectedClass.id
          ? {
              ...cls,
              name: formData.name,
              roomNumber: formData.classroom,
              formLevel: parseInt(formData.formLevel),
              levelType: formData.levelType,
              academicYear: formData.academicYear,
              stream: formData.stream,
              classroom: formData.classroom,
              building: formData.building,
              maxCapacity: parseInt(formData.maxCapacity) || 50,
              notes: formData.notes,
            }
          : cls
      )
    );

    setIsEditModalOpen(false);
    setSelectedClass(null);
    setFormData({
      name: '',
      formLevel: 1,
      levelType: 'O_LEVEL',
      academicYear: '2025-2026',
      stream: '',
      classroom: '',
      building: '',
      maxCapacity: 50,
      notes: '',
    });
  };

  // Handle delete class
  const handleDeleteClass = () => {
    if (classToDelete) {
      setClasses(classes.filter((cls) => cls.id !== classToDelete.id));
      setIsDeleteConfirmModalOpen(false);
      setClassToDelete(null);
    }
  };

  // Open delete confirmation modal
  const openDeleteConfirmModal = (cls) => {
    setClassToDelete(cls);
    setIsDeleteConfirmModalOpen(true);
  };

  // Open edit modal
  const openEditModal = (cls) => {
    setSelectedClass(cls);
    setFormData({
      name: cls.name,
      formLevel: cls.formLevel || 1,
      levelType: cls.levelType || 'O_LEVEL',
      academicYear: cls.academicYear || cls.year,
      stream: cls.stream || '',
      classroom: cls.classroom || cls.roomNumber || '',
      building: cls.building || '',
      maxCapacity: cls.maxCapacity || 50,
      notes: cls.notes || '',
    });
    setIsEditModalOpen(true);
  };

  return (
    <div className="class-page p-4">
      <div className="class-header mb-4">
        <div>
          <h1 className="mb-2">Class Management</h1>
          <p className="text-muted mb-0">Manage classes, students, schedules, and performance data.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
          <i className="fa-solid fa-plus me-2"></i> Add New Class
        </button>
      </div>

      {/* Overview Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="class-card total-card h-100">
            <i className="fa-solid fa-layer-group class-icon" style={{border:"1px solid #2563eb", borderRadius:"50%",width:"50px", height: "50px", fontSize:"15px", display:"grid", placeItems:"center", color:"#2563eb",marginBottom:"5px"}} aria-hidden="true"></i>
            <h3>Total Classes</h3>
            <h2>{metrics.totalClasses}</h2>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="class-card students-card h-100">
            <i className="fa-solid fa-users class-icon" style={{border:"1px solid #16a34a", borderRadius:"50%",width:"50px", height: "50px", fontSize:"15px", display:"grid", placeItems:"center", color:"#16a34a",marginBottom:"5px"}} aria-hidden="true"></i>
            <h3>Total Students</h3>
            <h2>{metrics.totalStudents}</h2>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="class-card attendance-card h-100">
            <i className="fa-solid fa-chart-pie class-icon" style={{border:"1px solid #f59e0b", borderRadius:"50%",width:"50px", height: "50px", fontSize:"15px", display:"grid", placeItems:"center", color:"#f59e0b",marginBottom:"5px"}} aria-hidden="true"></i>
            <h3>Avg Attendance</h3>
            <h2>{metrics.avgAttendance}%</h2>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="class-card rooms-card h-100">
            <i className="fa-solid fa-door-open class-icon" style={{border:"1px solid #8b5cf6", borderRadius:"50%",width:"50px", height: "50px", fontSize:"15px", display:"grid", placeItems:"center", color:"#8b5cf6",marginBottom:"5px"}} aria-hidden="true"></i>
            <h3>Total Rooms</h3>
            <h2>{metrics.totalRooms}</h2>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="class-tabs mb-4">
        <button className={`tab-btn ${selectedTab === "overview" ? "active" : ""}`} onClick={() => setSelectedTab("overview")}>
          <i className="fa-solid fa-list me-2"></i> Classes List
        </button>
        <button className={`tab-btn ${selectedTab === "timetable" ? "active" : ""}`} onClick={() => setSelectedTab("timetable")}>
          <i className="fa-solid fa-calendar me-2"></i> Timetable
        </button>
      </div>

      {/* Classes List Tab */}
      {selectedTab === "overview" && (
        <div className="card">
          <div className="card-body">
            <h2 className="mb-4 fs-5">Classes Overview</h2>

            {/* Filters */}
            <div className="row g-3 mb-4">
              <div className="col-12 col-md-6 col-lg-4">
                <div className="class-search-wrapper">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search class or room number"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                  <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <select
                  className="form-select"
                  value={filterRoom}
                  onChange={(e) => {
                    setFilterRoom(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="all">All Rooms</option>
                  {uniqueRooms.map((room) => (
                    <option key={room} value={room}>
                      Room {room}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="table-responsive">
              <table className="table table-hover table-sm mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Class Name</th>
                    <th>Room Number</th>
                    <th>Teacher</th>
                    <th>Students</th>
                    <th>Attendance</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedClasses.length > 0 ? (
                    paginatedClasses.map((cls) => (
                      <tr key={cls.id}>
                        <td className="fw-bold">{cls.name}</td>
                        <td>{cls.roomNumber}</td>
                        <td>{cls.teacher}</td>
                        <td>{cls.students}</td>
                        <td>
                          <span className="badge bg-success">{cls.attendance}%</span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="action-btn view-btn"
                              onClick={() => {
                                setSelectedClass(cls);
                                setIsDetailsModalOpen(true);
                              }}
                              title="View Details"
                            >
                              <i className="fas fa-eye"></i>
                            </button>
                            <button
                              className="action-btn edit-btn"
                              onClick={() => openEditModal(cls)}
                              title="Edit"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="action-btn delete-btn"
                              onClick={() => openDeleteConfirmModal(cls)}
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
                      <td colSpan="7" className="text-center py-4 text-muted">
                        No classes found matching your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav className="mt-4" aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                      Previous
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                      <button className="page-link" onClick={() => setCurrentPage(page)}>
                        {page}
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
      )}

      {/* Timetable Tab */}
      {selectedTab === "timetable" && (
        <div className="card">
          <div className="card-body">
            <h2 className="mb-4 fs-5">Weekly Timetable</h2>

            <div className="timetable-grid">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                <div key={day} className="timetable-day">
                  <div className="day-header">{day}</div>
                  {sampleTimetable
                    .filter((slot) => slot.day === day)
                    .map((slot, idx) => (
                      <div key={idx} className="timetable-slot">
                        <div className="slot-time">{slot.time}</div>
                        <div className="slot-subject">{slot.subject}</div>
                        <div className="slot-teacher">{slot.teacher}</div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Class Details Modal */}
      {isDetailsModalOpen && selectedClass && (
        <div className="class-modal-overlay">
          <div className="class-modal">
            <div className="class-modal-header">
              <h3>{selectedClass.name} - Class Details</h3>
              <button className="btn-close" onClick={() => setIsDetailsModalOpen(false)}></button>
            </div>
            <div className="class-modal-body">
              <div className="row mb-4">
                <div className="col-md-6">
                  <h6 className="fw-bold mb-3">Class Information</h6>
                  <p><strong>Class Name:</strong> {selectedClass.name}</p>
                  <p><strong>Room Number:</strong> {selectedClass.roomNumber}</p>
                  <p><strong>Teacher:</strong> {selectedClass.teacher}</p>
                  <p><strong>Academic Year:</strong> {selectedClass.year}</p>
                </div>
                <div className="col-md-6">
                  <h6 className="fw-bold mb-3">Class Metrics</h6>
                  <p><strong>Total Students:</strong> {selectedClass.students}</p>
                  <p><strong>Attendance Rate:</strong> <span className="badge bg-success">{selectedClass.attendance}%</span></p>
                </div>
              </div>
            </div>
            <div className="class-modal-footer">
              <button className="btn btn-secondary" onClick={() => setIsDetailsModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmModalOpen && classToDelete && (
        <div className="class-modal-overlay">
          <div className="class-modal" style={{ maxWidth: "400px" }}>
            <div className="class-modal-header">
              <h3>Delete Class</h3>
              <button className="btn-close" onClick={() => {
                setIsDeleteConfirmModalOpen(false);
                setClassToDelete(null);
              }}></button>
            </div>
            <div className="class-modal-body">
              <div className="alert alert-warning" role="alert">
                <i className="fas fa-exclamation-triangle me-2"></i>
                <strong>Warning!</strong> This action cannot be undone.
              </div>
              <p>Are you sure you want to delete the class <strong>{classToDelete.name}</strong> (Room {classToDelete.roomNumber})?</p>
              <p className="text-muted mb-0">All associated data will be permanently removed.</p>
            </div>
            <div className="class-modal-footer">
              <button className="btn btn-secondary" onClick={() => {
                setIsDeleteConfirmModalOpen(false);
                setClassToDelete(null);
              }}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleDeleteClass}>
                <i className="fas fa-trash me-2"></i> Delete Class
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Class Modal */}
      {isAddModalOpen && (
        <div className="class-modal-overlay">
          <div className="class-modal">
            <div className="class-modal-header">
              <h3>Add New Class</h3>
              <button className="btn-close" onClick={() => setIsAddModalOpen(false)}></button>
            </div>
            <div className="class-modal-body">
              <form className="row g-3">
                {/* Required Fields Section */}
                <div className="col-12">
                  <h6 className="fw-bold mb-3 text-muted">Required Information</h6>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Class Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., S1A"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Form Level *</label>
                  <select
                    className="form-select"
                    value={formData.formLevel}
                    onChange={(e) => setFormData({ ...formData, formLevel: e.target.value })}
                  >
                    <option value="">Select Form Level</option>
                    <option value="1">S.1 (Form 1)</option>
                    <option value="2">S.2 (Form 2)</option>
                    <option value="3">S.3 (Form 3)</option>
                    <option value="4">S.4 (Form 4)</option>
                    <option value="5">S.5 (Form 5)</option>
                    <option value="6">S.6 (Form 6)</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Level Type *</label>
                  <select
                    className="form-select"
                    value={formData.levelType}
                    onChange={(e) => setFormData({ ...formData, levelType: e.target.value })}
                  >
                    <option value="O_LEVEL">O-Level (S1-S4)</option>
                    <option value="A_LEVEL">A-Level (S5-S6)</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Academic Year *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., 2025-2026"
                    value={formData.academicYear}
                    onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                  />
                </div>

                {/* Optional Fields Section */}
                <div className="col-12 mt-3">
                  <h6 className="fw-bold mb-3 text-muted">Additional Information</h6>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Stream</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., A, B, East, West"
                    value={formData.stream}
                    onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Classroom</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., Room 101"
                    value={formData.classroom}
                    onChange={(e) => setFormData({ ...formData, classroom: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Building</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., Main Block"
                    value={formData.building}
                    onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Max Capacity</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="50"
                    value={formData.maxCapacity}
                    onChange={(e) => setFormData({ ...formData, maxCapacity: e.target.value })}
                    min="1"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Notes</label>
                  <textarea
                    className="form-control"
                    placeholder="Additional notes about this class"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows="3"
                  />
                </div>
              </form>
            </div>
            <div className="class-modal-footer">
              <button className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleAddClass}>
                <i className="fas fa-plus me-2"></i> Create Class
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Class Modal */}
      {isEditModalOpen && selectedClass && (
        <div className="class-modal-overlay">
          <div className="class-modal">
            <div className="class-modal-header">
              <h3>Edit Class</h3>
              <button className="btn-close" onClick={() => setIsEditModalOpen(false)}></button>
            </div>
            <div className="class-modal-body">
              <form className="row g-3">
                {/* Required Fields Section */}
                <div className="col-12">
                  <h6 className="fw-bold mb-3 text-muted">Required Information</h6>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Class Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Form Level *</label>
                  <select
                    className="form-select"
                    value={formData.formLevel}
                    onChange={(e) => setFormData({ ...formData, formLevel: e.target.value })}
                  >
                    <option value="">Select Form Level</option>
                    <option value="1">S.1 (Form 1)</option>
                    <option value="2">S.2 (Form 2)</option>
                    <option value="3">S.3 (Form 3)</option>
                    <option value="4">S.4 (Form 4)</option>
                    <option value="5">S.5 (Form 5)</option>
                    <option value="6">S.6 (Form 6)</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Level Type *</label>
                  <select
                    className="form-select"
                    value={formData.levelType}
                    onChange={(e) => setFormData({ ...formData, levelType: e.target.value })}
                  >
                    <option value="O_LEVEL">O-Level (S1-S4)</option>
                    <option value="A_LEVEL">A-Level (S5-S6)</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Academic Year *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.academicYear}
                    onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                  />
                </div>

                {/* Optional Fields Section */}
                <div className="col-12 mt-3">
                  <h6 className="fw-bold mb-3 text-muted">Additional Information</h6>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Stream</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.stream}
                    onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Classroom</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.classroom}
                    onChange={(e) => setFormData({ ...formData, classroom: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Building</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.building}
                    onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Max Capacity</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.maxCapacity}
                    onChange={(e) => setFormData({ ...formData, maxCapacity: e.target.value })}
                    min="1"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Notes</label>
                  <textarea
                    className="form-control"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows="3"
                  />
                </div>
              </form>
            </div>
            <div className="class-modal-footer">
              <button className="btn btn-secondary" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleEditClass}>
                <i className="fas fa-save me-2"></i> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Class;
