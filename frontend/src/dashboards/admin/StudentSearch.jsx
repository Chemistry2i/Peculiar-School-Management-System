import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import './StudentSearch.css';

const StudentSearch = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Fetch Students with Authorization Header
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('academix_token'); // Ensure this matches your login storage key

      const response = await axios.get('http://localhost:8080/api/students', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Based on your Repository, we expect an Array
      const data = Array.isArray(response.data) ? response.data : [];
      setStudents(data);
      setError(null);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.response?.status === 403 
        ? "Access Denied: Please log in again." 
        : "Server Connection Failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // 2. Filter logic matching your Repository fields
  const filteredStudents = useMemo(() => {
    if (!Array.isArray(students)) return [];

    return students.filter((student) => {
      const fullName = `${student.firstName || ''} ${student.lastName || ''}`.toLowerCase();
      const sId = (student.studentId || '').toLowerCase();
      const email = (student.email || '').toLowerCase();
      
      const matchesSearch = 
        fullName.includes(searchTerm.toLowerCase()) || 
        sId.includes(searchTerm.toLowerCase()) ||
        email.includes(searchTerm.toLowerCase());
      
      // Mapping isActive boolean to the status filter
      const matchesStatus = statusFilter === 'all' || 
        (statusFilter === 'active' && student.isActive) ||
        (statusFilter === 'inactive' && !student.isActive);
      
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, students]);

  return (
    <div className="student-search-container">
      <div className="search-section">
        <div className="header-actions">
          <h2 className="section-title">Student Management</h2>
          <button className="refresh-btn" onClick={fetchStudents}>Refresh List</button>
        </div>
        
        <div className="search-filters">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search by name, ID, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            <option value="all">All Status</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>
      </div>

      <div className="table-wrapper">
        {loading ? (
          <div className="loading-state">Fetching students from Academix API...</div>
        ) : error ? (
          <div className="error-state">{error}</div>
        ) : filteredStudents.length > 0 ? (
          <table className="students-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Student ID</th>
                <th>Class / Stream</th>
                <th>Residence</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                /* UNIQUE KEY FIX: Uses database ID */
                <tr key={student.id}>
                  <td>
                    <div className="name-cell">
                      <strong>{student.firstName} {student.lastName}</strong>
                      <span className="sub-text">{student.email}</span>
                    </div>
                  </td>
                  <td>{student.studentId || 'N/A'}</td>
                  <td>{student.currentClass} {student.stream ? `- ${student.stream}` : ''}</td>
                  <td>{student.residenceStatus || 'Unknown'}</td>
                  <td>
                    <span className={`badge ${student.isActive ? 'badge-success' : 'badge-danger'}`}>
                      {student.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon view" title="View Details">👁️</button>
                      <button className="btn-icon edit" title="Edit Student">✏️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-results">
            <p>No student records found in the database.</p>
          </div>
        )}
      </div>

      <div className="table-footer">
        <p>Showing {filteredStudents.length} of {students.length} total students</p>
      </div>
    </div>
  );
};

export default StudentSearch;