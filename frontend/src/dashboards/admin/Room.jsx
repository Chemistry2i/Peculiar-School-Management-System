import React, { useMemo, useState } from 'react';
import './Room.css';

const sampleRooms = [
  { id: 1, roomNumber: '101', roomName: 'Class S1A', roomType: 'CLASSROOM', capacity: 45, building: 'Main Block', floor: '1', isAvailable: true },
  { id: 2, roomNumber: '102', roomName: 'Class S1B', roomType: 'CLASSROOM', capacity: 42, building: 'Main Block', floor: '1', isAvailable: true },
  { id: 3, roomNumber: 'LAB01', roomName: 'Physics Lab', roomType: 'LABORATORY', capacity: 30, building: 'Science Block', floor: '2', isAvailable: true },
  { id: 4, roomNumber: 'LIB01', roomName: 'Main Library', roomType: 'LIBRARY', capacity: 100, building: 'Library Block', floor: '1', isAvailable: true },
  { id: 5, roomNumber: 'HALL01', roomName: 'Assembly Hall', roomType: 'HALL', capacity: 200, building: 'Main Block', floor: 'Ground', isAvailable: true },
];

function Room() {
  const [rooms, setRooms] = useState(sampleRooms);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomToDelete, setRoomToDelete] = useState(null);

  const [formData, setFormData] = useState({
    roomNumber: '',
    roomName: '',
    roomType: 'CLASSROOM',
    capacity: 50,
    building: '',
    floor: '',
    location: '',
    equipment: '',
    isAvailable: true,
    notes: '',
  });

  // Metrics
  const metrics = useMemo(() => {
    const totalRooms = rooms.length;
    const availableRooms = rooms.filter(r => r.isAvailable).length;
    const totalCapacity = rooms.reduce((sum, r) => sum + (r.capacity || 0), 0);

    return { totalRooms, availableRooms, totalCapacity };
  }, [rooms]);

  const roomTypes = ['CLASSROOM', 'LABORATORY', 'LIBRARY', 'HALL', 'OFFICE'];

  // Filter rooms
  const filteredRooms = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return rooms.filter(room => {
      const matchesSearch = room.roomNumber.toLowerCase().includes(term) ||
        (room.roomName && room.roomName.toLowerCase().includes(term)) ||
        (room.building && room.building.toLowerCase().includes(term));
      const matchesType = filterType === 'all' || room.roomType === filterType;
      return matchesSearch && matchesType;
    });
  }, [searchTerm, filterType, rooms]);

  const handleAddRoom = (e) => {
    e.preventDefault();
    if (!formData.roomNumber || !formData.roomType) {
      alert('Please fill in required fields (Room Number, Room Type)');
      return;
    }

    const newRoom = {
      id: Math.max(...rooms.map(r => r.id), 0) + 1,
      ...formData,
      capacity: parseInt(formData.capacity) || 50,
    };

    setRooms([...rooms, newRoom]);
    setIsAddModalOpen(false);
    setFormData({
      roomNumber: '',
      roomName: '',
      roomType: 'CLASSROOM',
      capacity: 50,
      building: '',
      floor: '',
      location: '',
      equipment: '',
      isAvailable: true,
      notes: '',
    });
  };

  const handleEditRoom = (e) => {
    e.preventDefault();
    if (!formData.roomNumber || !formData.roomType) {
      alert('Please fill in required fields');
      return;
    }

    setRooms(
      rooms.map(room =>
        room.id === selectedRoom.id
          ? { ...room, ...formData, capacity: parseInt(formData.capacity) || 50 }
          : room
      )
    );

    setIsEditModalOpen(false);
    setSelectedRoom(null);
    setFormData({
      roomNumber: '',
      roomName: '',
      roomType: 'CLASSROOM',
      capacity: 50,
      building: '',
      floor: '',
      location: '',
      equipment: '',
      isAvailable: true,
      notes: '',
    });
  };

  const handleDeleteRoom = () => {
    if (roomToDelete) {
      setRooms(rooms.filter(room => room.id !== roomToDelete.id));
      setIsDeleteConfirmModalOpen(false);
      setRoomToDelete(null);
    }
  };

  const openEditModal = (room) => {
    setSelectedRoom(room);
    setFormData(room);
    setIsEditModalOpen(true);
  };

  const openDeleteConfirmModal = (room) => {
    setRoomToDelete(room);
    setIsDeleteConfirmModalOpen(true);
  };

  return (
    <div className="room-page p-4">
      <div className="room-header mb-4">
        <div>
          <h1 className="mb-2">Room Management</h1>
          <p className="text-muted mb-0">Manage classrooms, laboratories, halls, and facilities.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
          <i className="fa-solid fa-plus me-2"></i> Add New Room
        </button>
      </div>

      {/* Overview Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="room-card total-card h-100">
            <i className="fa-solid fa-door-open" style={{ border: '1px solid #2563eb', borderRadius: '50%', width: '50px', height: '50px', fontSize: '15px', display: 'grid', placeItems: 'center', color: '#2563eb', marginBottom: '5px' }} aria-hidden="true"></i>
            <h3>Total Rooms</h3>
            <h2>{metrics.totalRooms}</h2>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="room-card available-card h-100">
            <i className="fa-solid fa-check-circle" style={{ border: '1px solid #16a34a', borderRadius: '50%', width: '50px', height: '50px', fontSize: '15px', display: 'grid', placeItems: 'center', color: '#16a34a', marginBottom: '5px' }} aria-hidden="true"></i>
            <h3>Available</h3>
            <h2>{metrics.availableRooms}</h2>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="room-card capacity-card h-100">
            <i className="fa-solid fa-users" style={{ border: '1px solid #f59e0b', borderRadius: '50%', width: '50px', height: '50px', fontSize: '15px', display: 'grid', placeItems: 'center', color: '#f59e0b', marginBottom: '5px' }} aria-hidden="true"></i>
            <h3>Total Capacity</h3>
            <h2>{metrics.totalCapacity}</h2>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="room-search-wrapper">
            <input
              type="text"
              className="form-control"
              placeholder="Search room number, name, or building"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <select
            className="form-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Room Types</option>
            {roomTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
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
                  <th>Room Number</th>
                  <th>Room Name</th>
                  <th>Type</th>
                  <th>Capacity</th>
                  <th>Building</th>
                  <th>Availability</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRooms.length > 0 ? (
                  filteredRooms.map(room => (
                    <tr key={room.id}>
                      <td className="fw-bold">{room.roomNumber}</td>
                      <td>{room.roomName || '-'}</td>
                      <td>
                        <span className="badge bg-info">{room.roomType}</span>
                      </td>
                      <td>{room.capacity || '-'}</td>
                      <td>{room.building || '-'}</td>
                      <td>
                        <span className={`badge ${room.isAvailable ? 'bg-success' : 'bg-danger'}`}>
                          {room.isAvailable ? 'Available' : 'Occupied'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="action-btn view-btn"
                            onClick={() => {
                              setSelectedRoom(room);
                              setIsDetailsModalOpen(true);
                            }}
                            title="View Details"
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                          <button
                            className="action-btn edit-btn"
                            onClick={() => openEditModal(room)}
                            title="Edit"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="action-btn delete-btn"
                            onClick={() => openDeleteConfirmModal(room)}
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
                      No rooms found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Room Details Modal */}
      {isDetailsModalOpen && selectedRoom && (
        <div className="room-modal-overlay">
          <div className="room-modal">
            <div className="room-modal-header">
              <h3>{selectedRoom.roomNumber} - Room Details</h3>
              <button className="btn-close" onClick={() => setIsDetailsModalOpen(false)}></button>
            </div>
            <div className="room-modal-body">
              <div className="row mb-4">
                <div className="col-md-6">
                  <h6 className="fw-bold mb-3">Room Information</h6>
                  <p><strong>Room Number:</strong> {selectedRoom.roomNumber}</p>
                  <p><strong>Room Name:</strong> {selectedRoom.roomName || '-'}</p>
                  <p><strong>Type:</strong> <span className="badge bg-info">{selectedRoom.roomType}</span></p>
                  <p><strong>Capacity:</strong> {selectedRoom.capacity || '-'}</p>
                </div>
                <div className="col-md-6">
                  <h6 className="fw-bold mb-3">Location</h6>
                  <p><strong>Building:</strong> {selectedRoom.building || '-'}</p>
                  <p><strong>Floor:</strong> {selectedRoom.floor || '-'}</p>
                  <p><strong>Location:</strong> {selectedRoom.location || '-'}</p>
                  <p><strong>Status:</strong> <span className={`badge ${selectedRoom.isAvailable ? 'bg-success' : 'bg-danger'}`}>{selectedRoom.isAvailable ? 'Available' : 'Occupied'}</span></p>
                </div>
              </div>
              {selectedRoom.equipment && (
                <div className="mb-3">
                  <h6 className="fw-bold">Equipment</h6>
                  <p>{selectedRoom.equipment}</p>
                </div>
              )}
              {selectedRoom.notes && (
                <div>
                  <h6 className="fw-bold">Notes</h6>
                  <p>{selectedRoom.notes}</p>
                </div>
              )}
            </div>
            <div className="room-modal-footer">
              <button className="btn btn-secondary" onClick={() => setIsDetailsModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Room Modal */}
      {isAddModalOpen && (
        <div className="room-modal-overlay">
          <div className="room-modal">
            <div className="room-modal-header">
              <h3>Add New Room</h3>
              <button className="btn-close" onClick={() => setIsAddModalOpen(false)}></button>
            </div>
            <div className="room-modal-body">
              <form className="row g-3" onSubmit={handleAddRoom}>
                <div className="col-12">
                  <h6 className="fw-bold mb-3 text-muted">Required Information</h6>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Room Number *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., 101, LAB01"
                    value={formData.roomNumber}
                    onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Room Type *</label>
                  <select
                    className="form-select"
                    value={formData.roomType}
                    onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                    required
                  >
                    {roomTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="col-12">
                  <h6 className="fw-bold mb-3 text-muted mt-2">Additional Information</h6>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Room Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., Class S1A"
                    value={formData.roomName}
                    onChange={(e) => setFormData({ ...formData, roomName: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Capacity</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    min="1"
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
                  <label className="form-label">Floor</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., 1, 2, Ground"
                    value={formData.floor}
                    onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="General location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Equipment</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., Projector, Whiteboard"
                    value={formData.equipment}
                    onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
                  />
                </div>

                <div className="col-12">
                  <label className="form-check-label">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={formData.isAvailable}
                      onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                    />
                    Available
                  </label>
                </div>

                <div className="col-12">
                  <label className="form-label">Notes</label>
                  <textarea
                    className="form-control"
                    placeholder="Additional notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows="2"
                  />
                </div>
              </form>
            </div>
            <div className="room-modal-footer">
              <button className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleAddRoom}>
                <i className="fas fa-plus me-2"></i> Create Room
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Room Modal */}
      {isEditModalOpen && selectedRoom && (
        <div className="room-modal-overlay">
          <div className="room-modal">
            <div className="room-modal-header">
              <h3>Edit Room</h3>
              <button className="btn-close" onClick={() => setIsEditModalOpen(false)}></button>
            </div>
            <div className="room-modal-body">
              <form className="row g-3" onSubmit={handleEditRoom}>
                <div className="col-12">
                  <h6 className="fw-bold mb-3 text-muted">Required Information</h6>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Room Number *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.roomNumber}
                    onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Room Type *</label>
                  <select
                    className="form-select"
                    value={formData.roomType}
                    onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                    required
                  >
                    {roomTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="col-12">
                  <h6 className="fw-bold mb-3 text-muted mt-2">Additional Information</h6>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Room Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.roomName}
                    onChange={(e) => setFormData({ ...formData, roomName: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Capacity</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    min="1"
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
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Equipment</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.equipment}
                    onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
                  />
                </div>

                <div className="col-12">
                  <label className="form-check-label">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={formData.isAvailable}
                      onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                    />
                    Available
                  </label>
                </div>

                <div className="col-12">
                  <label className="form-label">Notes</label>
                  <textarea
                    className="form-control"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows="2"
                  />
                </div>
              </form>
            </div>
            <div className="room-modal-footer">
              <button className="btn btn-secondary" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleEditRoom}>
                <i className="fas fa-save me-2"></i> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmModalOpen && roomToDelete && (
        <div className="room-modal-overlay">
          <div className="room-modal" style={{ maxWidth: '400px' }}>
            <div className="room-modal-header">
              <h3>Delete Room</h3>
              <button className="btn-close" onClick={() => {
                setIsDeleteConfirmModalOpen(false);
                setRoomToDelete(null);
              }}></button>
            </div>
            <div className="room-modal-body">
              <div className="alert alert-warning" role="alert">
                <i className="fas fa-exclamation-triangle me-2"></i>
                <strong>Warning!</strong> This action cannot be undone.
              </div>
              <p>Are you sure you want to delete room <strong>{roomToDelete.roomNumber}</strong>?</p>
              <p className="text-muted mb-0">All associated data will be permanently removed.</p>
            </div>
            <div className="room-modal-footer">
              <button className="btn btn-secondary" onClick={() => {
                setIsDeleteConfirmModalOpen(false);
                setRoomToDelete(null);
              }}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleDeleteRoom}>
                <i className="fas fa-trash me-2"></i> Delete Room
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Room;
