import React, { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import './Department.css';

const API_BASE_URL = 'http://localhost:8080/api';

function Department() {
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    departmentCode: '',
    status: 'ACTIVE',
    building: '',
    floor: '',
    officeRoom: '',
    phoneNumber: '',
    email: '',
    academicFocus: '',
    visionStatement: '',
    missionStatement: '',
    establishedYear: new Date().getFullYear(),
    targetEnrollment: 100,
    minimumStaff: 3,
    isCoreDepartment: true,
  });

  // Fetch departments from backend on component mount
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/departments`);
      // Backend returns { success: true, data: [...], total: X }
      const departmentsData = response.data?.data || response.data;
      const departmentsArray = Array.isArray(departmentsData) ? departmentsData : [];
      setDepartments(departmentsArray);
    } catch (err) {
      console.error('Error fetching departments:', err);
      setError('Failed to load departments. Please try again.');
      setDepartments([]); // Set to empty array on error
    } finally {
      setLoading(false);
    }
  };

  // Metrics
  const metrics = useMemo(() => {
    const totalDepartments = departments.length;
    const activeDepartments = departments.filter(d => d.status === 'ACTIVE').length;

    return { totalDepartments, activeDepartments };
  }, [departments]);

  // Filter departments
  const filteredDepartments = useMemo(() => {
    if (!Array.isArray(departments)) {
      return [];
    }
    const term = searchTerm.toLowerCase();
    return departments.filter(dept => {
      if (!dept || !dept.name) return false;
      const matchesSearch = dept.name.toLowerCase().includes(term) ||
        (dept.departmentCode && dept.departmentCode.toLowerCase().includes(term)) ||
        (dept.academicFocus && dept.academicFocus.toLowerCase().includes(term));
      const matchesStatus = filterStatus === 'all' || dept.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, filterStatus, departments]);

  const handleAddDepartment = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      alert('Please fill in required fields (Department Name)');
      return;
    }

    try {
      const departmentData = {
        ...formData,
        establishedYear: parseInt(formData.establishedYear) || new Date().getFullYear(),
        targetEnrollment: parseInt(formData.targetEnrollment) || 100,
        minimumStaff: parseInt(formData.minimumStaff) || 3,
      };

      const response = await axios.post(`${API_BASE_URL}/departments`, departmentData);
      
      setDepartments([...departments, response.data]);
      setIsAddModalOpen(false);
      setFormData({
        name: '',
        description: '',
        departmentCode: '',
        status: 'ACTIVE',
        building: '',
        floor: '',
        officeRoom: '',
        phoneNumber: '',
        email: '',
        academicFocus: '',
        visionStatement: '',
        missionStatement: '',
        establishedYear: new Date().getFullYear(),
        targetEnrollment: 100,
        minimumStaff: 3,
        isCoreDepartment: true,
      });
      setError(null);
    } catch (err) {
      if (err.response?.data?.message) {
        alert(`Error: ${err.response.data.message}`);
      } else {
        alert('Failed to add department. Please try again.');
      }
      console.error('Error adding department:', err);
    }
  };

  const handleEditDepartment = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      alert('Please fill in required fields');
      return;
    }

    try {
      const departmentData = {
        ...formData,
        establishedYear: parseInt(formData.establishedYear) || new Date().getFullYear(),
        targetEnrollment: parseInt(formData.targetEnrollment) || 100,
        minimumStaff: parseInt(formData.minimumStaff) || 3,
      };

      const response = await axios.put(`${API_BASE_URL}/departments/${selectedDepartment.id}`, departmentData);
      
      setDepartments(
        departments.map(dept =>
          dept.id === selectedDepartment.id ? response.data : dept
        )
      );

      setIsEditModalOpen(false);
      setSelectedDepartment(null);
      setFormData({
        name: '',
        description: '',
        departmentCode: '',
        status: 'ACTIVE',
        building: '',
        floor: '',
        officeRoom: '',
        phoneNumber: '',
        email: '',
        academicFocus: '',
        visionStatement: '',
        missionStatement: '',
        establishedYear: new Date().getFullYear(),
        targetEnrollment: 100,
        minimumStaff: 3,
        isCoreDepartment: true,
      });
      setError(null);
    } catch (err) {
      if (err.response?.data?.message) {
        alert(`Error: ${err.response.data.message}`);
      } else {
        alert('Failed to update department. Please try again.');
      }
      console.error('Error updating department:', err);
    }
  };

  const handleDeleteDepartment = async () => {
    if (departmentToDelete) {
      try {
        await axios.delete(`${API_BASE_URL}/departments/${departmentToDelete.id}`);
        
        setDepartments(departments.filter(dept => dept.id !== departmentToDelete.id));
        setIsDeleteConfirmModalOpen(false);
        setDepartmentToDelete(null);
        setError(null);
      } catch (err) {
        if (err.response?.data?.message) {
          alert(`Error: ${err.response.data.message}`);
        } else {
          alert('Failed to delete department. Please try again.');
        }
        console.error('Error deleting department:', err);
      }
    }
  };

  const openEditModal = (dept) => {
    if (dept && dept.id) {
      setSelectedDepartment(dept);
      setFormData({ ...dept });
      setIsEditModalOpen(true);
    }
  };

  const openDeleteConfirmModal = (dept) => {
    if (dept && dept.id) {
      setDepartmentToDelete(dept);
      setIsDeleteConfirmModalOpen(true);
    }
  };

  const getStatusBadgeClass = (status) => {
    if (status === 'ACTIVE') return 'badge bg-success';
    if (status === 'INACTIVE') return 'badge bg-secondary';
    if (status === 'SUSPENDED') return 'badge bg-danger';
    return 'badge bg-warning';
  };

  return (
    <div className="department-page p-4">
      <div className="department-header mb-4">
        <div>
          <h1 className="mb-2">Department Management</h1>
          <p className="text-muted mb-0">Manage academic departments and their information.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)} disabled={loading}>
          <i className="fa-solid fa-plus me-2"></i> Add New Department
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <i className="fa-solid fa-circle-exclamation me-2"></i>
          {error}
          <button type="button" className="btn-close" onClick={() => setError(null)}></button>
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="alert alert-info" role="alert">
          <i className="fa-solid fa-spinner me-2"></i> Loading departments...
        </div>
      )}

      {/* Overview Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="department-card total-card h-100">
            <i className="fa-solid fa-building" style={{ border: '1px solid #2563eb', borderRadius: '50%', width: '50px', height: '50px', fontSize: '15px', display: 'grid', placeItems: 'center', color: '#2563eb', marginBottom: '5px' }} aria-hidden="true"></i>
            <h3>Total Departments</h3>
            <h2>{metrics.totalDepartments}</h2>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="department-card active-card h-100">
            <i className="fa-solid fa-check-circle" style={{ border: '1px solid #16a34a', borderRadius: '50%', width: '50px', height: '50px', fontSize: '15px', display: 'grid', placeItems: 'center', color: '#16a34a', marginBottom: '5px' }} aria-hidden="true"></i>
            <h3>Active</h3>
            <h2>{metrics.activeDepartments}</h2>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="department-search-wrapper">
            <input
              type="text"
              className="form-control"
              placeholder="Search department name or code"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="SUSPENDED">Suspended</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover table-sm mb-0">
              <thead className="table-light">
                <tr>
                  <th>Department Name</th>
                  <th>Code</th>
                  <th>Academic Focus</th>
                  <th>Building</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDepartments.length > 0 ? (
                  filteredDepartments.map(dept => (
                    <tr key={dept.id}>
                      <td className="fw-bold">{dept.name}</td>
                      <td>{dept.departmentCode || '-'}</td>
                      <td>{dept.academicFocus || '-'}</td>
                      <td>{dept.building || '-'}</td>
                      <td>
                        <span className={getStatusBadgeClass(dept.status)}>
                          {dept.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="action-btn view-btn"
                            onClick={() => {
                              setSelectedDepartment(dept);
                              setIsDetailsModalOpen(true);
                            }}
                            title="View Details"
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                          <button
                            className="action-btn edit-btn"
                            onClick={() => openEditModal(dept)}
                            title="Edit"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="action-btn delete-btn"
                            onClick={() => openDeleteConfirmModal(dept)}
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
                    <td colSpan="6" className="text-center py-4 text-muted">
                      No departments found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Department Details Modal */}
      {isDetailsModalOpen && selectedDepartment && (
        <div className="department-modal-overlay">
          <div className="department-modal">
            <div className="department-modal-header">
              <h3>{selectedDepartment.name} - Department Details</h3>
              <button className="btn-close" onClick={() => setIsDetailsModalOpen(false)}></button>
            </div>
            <div className="department-modal-body">
              <div className="row mb-4">
                <div className="col-md-6">
                  <h6 className="fw-bold mb-3">Basic Information</h6>
                  <p><strong>Department Name:</strong> {selectedDepartment.name}</p>
                  <p><strong>Code:</strong> {selectedDepartment.departmentCode || '-'}</p>
                  <p><strong>Status:</strong> <span className={getStatusBadgeClass(selectedDepartment.status)}>{selectedDepartment.status}</span></p>
                  <p><strong>Established Year:</strong> {selectedDepartment.establishedYear || '-'}</p>
                </div>
                <div className="col-md-6">
                  <h6 className="fw-bold mb-3">Location & Contact</h6>
                  <p><strong>Building:</strong> {selectedDepartment.building || '-'}</p>
                  <p><strong>Floor:</strong> {selectedDepartment.floor || '-'}</p>
                  <p><strong>Office Room:</strong> {selectedDepartment.officeRoom || '-'}</p>
                  <p><strong>Phone:</strong> {selectedDepartment.phoneNumber || '-'}</p>
                  <p><strong>Email:</strong> {selectedDepartment.email || '-'}</p>
                </div>
              </div>
              {selectedDepartment.academicFocus && (
                <div className="mb-3">
                  <h6 className="fw-bold">Academic Focus</h6>
                  <p>{selectedDepartment.academicFocus}</p>
                </div>
              )}
              {selectedDepartment.description && (
                <div className="mb-3">
                  <h6 className="fw-bold">Description</h6>
                  <p>{selectedDepartment.description}</p>
                </div>
              )}
            </div>
            <div className="department-modal-footer">
              <button className="btn btn-secondary" onClick={() => setIsDetailsModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Department Modal */}
      {isAddModalOpen && (
        <div className="department-modal-overlay">
          <div className="department-modal">
            <div className="department-modal-header">
              <h3>Add New Department</h3>
              <button className="btn-close" onClick={() => setIsAddModalOpen(false)}></button>
            </div>
            <div className="department-modal-body">
              <form className="row g-3" onSubmit={handleAddDepartment}>
                <div className="col-12">
                  <h6 className="fw-bold mb-3 text-muted">Required Information</h6>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Department Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., Mathematics"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Status *</label>
                  <select
                    className="form-select"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    required
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                    <option value="SUSPENDED">Suspended</option>
                  </select>
                </div>

                <div className="col-12">
                  <h6 className="fw-bold mb-3 text-muted mt-2">Additional Information</h6>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Department Code</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., MATH"
                    value={formData.departmentCode}
                    onChange={(e) => setFormData({ ...formData, departmentCode: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Established Year</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.establishedYear}
                    onChange={(e) => setFormData({ ...formData, establishedYear: e.target.value })}
                    min="1950"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Academic Focus</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., Pure and Applied Mathematics"
                    value={formData.academicFocus}
                    onChange={(e) => setFormData({ ...formData, academicFocus: e.target.value })}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    placeholder="Department description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="2"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Building</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., Science Block"
                    value={formData.building}
                    onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Floor</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., 2"
                    value={formData.floor}
                    onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Office Room</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., Room 205"
                    value={formData.officeRoom}
                    onChange={(e) => setFormData({ ...formData, officeRoom: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="+256 701 234567"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="dept@school.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Target Enrollment</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.targetEnrollment}
                    onChange={(e) => setFormData({ ...formData, targetEnrollment: e.target.value })}
                    min="1"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Minimum Staff</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.minimumStaff}
                    onChange={(e) => setFormData({ ...formData, minimumStaff: e.target.value })}
                    min="1"
                  />
                </div>
              </form>
            </div>
            <div className="department-modal-footer">
              <button className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleAddDepartment}>
                <i className="fas fa-plus me-2"></i> Create Department
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Department Modal */}
      {isEditModalOpen && selectedDepartment && (
        <div className="department-modal-overlay">
          <div className="department-modal">
            <div className="department-modal-header">
              <h3>Edit Department</h3>
              <button className="btn-close" onClick={() => setIsEditModalOpen(false)}></button>
            </div>
            <div className="department-modal-body">
              <form className="row g-3" onSubmit={handleEditDepartment}>
                <div className="col-12">
                  <h6 className="fw-bold mb-3 text-muted">Required Information</h6>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Department Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Status *</label>
                  <select
                    className="form-select"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    required
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                    <option value="SUSPENDED">Suspended</option>
                  </select>
                </div>

                <div className="col-12">
                  <h6 className="fw-bold mb-3 text-muted mt-2">Additional Information</h6>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Department Code</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.departmentCode}
                    onChange={(e) => setFormData({ ...formData, departmentCode: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Established Year</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.establishedYear}
                    onChange={(e) => setFormData({ ...formData, establishedYear: e.target.value })}
                    min="1950"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Academic Focus</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.academicFocus}
                    onChange={(e) => setFormData({ ...formData, academicFocus: e.target.value })}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="2"
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
                  <label className="form-label">Floor</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.floor}
                    onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Office Room</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.officeRoom}
                    onChange={(e) => setFormData({ ...formData, officeRoom: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Target Enrollment</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.targetEnrollment}
                    onChange={(e) => setFormData({ ...formData, targetEnrollment: e.target.value })}
                    min="1"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Minimum Staff</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.minimumStaff}
                    onChange={(e) => setFormData({ ...formData, minimumStaff: e.target.value })}
                    min="1"
                  />
                </div>
              </form>
            </div>
            <div className="department-modal-footer">
              <button className="btn btn-secondary" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleEditDepartment}>
                <i className="fas fa-save me-2"></i> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmModalOpen && departmentToDelete && (
        <div className="department-modal-overlay">
          <div className="department-modal" style={{ maxWidth: '400px' }}>
            <div className="department-modal-header">
              <h3>Delete Department</h3>
              <button className="btn-close" onClick={() => {
                setIsDeleteConfirmModalOpen(false);
                setDepartmentToDelete(null);
              }}></button>
            </div>
            <div className="department-modal-body">
              <div className="alert alert-warning" role="alert">
                <i className="fas fa-exclamation-triangle me-2"></i>
                <strong>Warning!</strong> This action cannot be undone.
              </div>
              <p>Are you sure you want to delete the department <strong>{departmentToDelete.name}</strong>?</p>
              <p className="text-muted mb-0">All associated data will be permanently removed.</p>
            </div>
            <div className="department-modal-footer">
              <button className="btn btn-secondary" onClick={() => {
                setIsDeleteConfirmModalOpen(false);
                setDepartmentToDelete(null);
              }}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleDeleteDepartment}>
                <i className="fas fa-trash me-2"></i> Delete Department
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Department;
