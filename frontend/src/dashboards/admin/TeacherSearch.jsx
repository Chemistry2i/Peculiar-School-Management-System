import React, { useState, useMemo } from 'react';
import './TeacherSearch.css';

const TeacherSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample teacher data
  const [teachers] = useState([
    {
      id: 'TEACH001',
      name: 'Mr. Robert Tamale',
      subject: 'Mathematics',
      email: 'robert.tamale@school.edu',
      phone: '+254712345678',
    },
    {
      id: 'TEACH002',
      name: 'Ms. Sarah Nantume',
      subject: 'English Literature',
      email: 'sarah.nantume@school.edu',
      phone: '+254787654321',
    },
    {
      id: 'TEACH003',
      name: 'Mr. James Nduga',
      subject: 'Physics',
      email: 'james.nduga@school.edu',
      phone: '+254722334455',
    },
    {
      id: 'TEACH004',
      name: 'Ms. Emily kajoba',
      subject: 'Chemistry',
      email: 'emily.kajoba@school.edu',
      phone: '+254799887766',
    },
    {
      id: 'TEACH005',
      name: 'Mr. David Bali',
      subject: 'History',
      email: 'david.bali@school.edu',
      phone: '+254711223344',
    },
    {
      id: 'TEACH006',
      name: 'Ms. Lisa Ojambo',
      subject: 'Biology',
      email: 'lisa.ojambo@school.edu',
      phone: '+254755667788',
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

  // Handle action buttons
  const handleAddTeacher = () => {
    console.log('Add teacher');
    alert('Opening Add Teacher form...');
  };

  const handleViewTeacher = (teacher) => {
    console.log('View teacher:', teacher);
    alert(`Viewing teacher: ${teacher.name}`);
  };

  const handleEditTeacher = (teacher) => {
    console.log('Edit teacher:', teacher);
    alert(`Editing teacher: ${teacher.name}`);
  };

  const handleDeleteTeacher = (teacher) => {
    console.log('Delete teacher:', teacher);
    alert(`Deleting teacher: ${teacher.name}`);
  };

  return (
    <div className="teacher-search-container">
      <div className="search-section">
        <h2>Teacher Management</h2>
        
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

          <button className="btn-add-teacher" onClick={handleAddTeacher}>
            + Add Teacher
          </button>
        </div>
      </div>

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
