import React, { useState, useMemo } from 'react';
import './StudentSearch.css';

const StudentSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Sample student data
  const [students] = useState([
    {
      id: 'STU001',
      name: 'John Makumbi',
      class: '10A',
      parentName: 'Jane Makumbi',
      parentContact: '+254712345678',
      status: 'active',
    },
    {

      id: 'STU002',
      name: 'Sarah Ocan',
      class: '10B',
      parentName: 'Mr. Ofwono',
      parentContact: '+254787654321',
      status: 'active',
    },
    {
      id: 'STU003',
      name: 'Michael Otto',
      class: '9A',
      parentName: 'Mrs. JOhnson',
      parentContact: '+254722334455',
      status: 'inactive',
    },
    {
      id: 'STU004',
      name: 'Emily Watera',
      class: '11A',
      parentName: 'Mr Lukoma Williams',
      parentContact: '+254799887766',
      status: 'active',
    },
    {
      id: 'STU005',
      name: 'David kijjambu',
      class: '10A',
      parentName: 'Mrs. Kijjambu',
      parentContact: '+254711223344',
      status: 'suspended',
    },
  ]);

  // Filter students based on search term and status
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, students]);

  // Handle action buttons
  const handleView = (student) => {
    console.log('View student:', student);
    alert(`Viewing student: ${student.name}`);
  };

  const handleEdit = (student) => {
    console.log('Edit student:', student);
    alert(`Editing student: ${student.name}`);
  };

  const handleDelete = (student) => {
    console.log('Delete student:', student);
    alert(`Deleting student: ${student.name}`);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: 'badge-success',
      inactive: 'badge-danger',
      suspended: 'badge-warning',
    };
    return statusClasses[status] || 'badge-secondary';
  };

  return (
    <div className="student-search-container">
      <div className="search-section">
        <h2>Student Management</h2>
        
        <div className="search-filters">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search by student name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon"><i className="fa-solid fa-magnifying-glass"></i></span>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      <div className="table-wrapper">
        {filteredStudents.length > 0 ? (
          <table className="students-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Student ID</th>
                <th>Class</th>
                <th>Parent Name</th>
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
                  <td>{student.class}</td>
                  <td>{student.parentName}</td>
                  <td>{student.parentContact}</td>
                  <td>
                    <span className={`badge ${getStatusBadge(student.status)}`}>
                      {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleView(student)}
                        title="View Details"
                      >
                        View
                      </button>
                      <button
                        className="btn btn-warning"
                        onClick={() => handleEdit(student)}
                        title="Edit Student"
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(student)}
                        title="Delete Student"
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
