import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import moment from 'moment';

const Schedule = ({ userId, onAdd, onUpdate, onDelete }) => {
  // State for managing schedules, modal visibility, form data, etc.
  const [schedules, setSchedules] = useState([]); // Stores the list of schedules
  const [showModal, setShowModal] = useState(false); // Controls modal visibility
  const [formData, setFormData] = useState({ 
    title: '', 
    date: '', 
    time: '', 
    description: '', 
    status: 'pending' 
  }); // Form data for adding/editing schedules
  const [editingScheduleId, setEditingScheduleId] = useState(null); // Holds the ID of the schedule being edited
  const [searchTerm, setSearchTerm] = useState(''); // Search term for filtering schedules by title
  const [selectedStatus, setSelectedStatus] = useState(''); // Filter for schedule status
  const [expandedScheduleId, setExpandedScheduleId] = useState(null); // Used to expand a schedule item for more details

  // Fetch the user's schedules when the component mounts or userId changes
  useEffect(() => {
    if (!userId) return; // Don't run if there's no userId
    fetch(`http://localhost:3000/Members/${userId}`)
      .then((response) => {
        if (!response.ok) throw new Error('Error fetching schedules');
        return response.json();
      })
      .then((data) => setSchedules(data.schedules || [])) // Set fetched schedules
      .catch((error) => console.error('Error fetching schedules:', error));
  }, [userId]);

  // Interval to check for upcoming schedules every minute
  useEffect(() => {
    const intervalId = setInterval(checkForAlarms, 60000); // 60000 ms = 1 minute
    return () => clearInterval(intervalId); // Cleanup the interval on unmount
  }, [schedules]); // Re-run whenever schedules change

  // Function to check if any schedules are due within the next 5 minutes
  const checkForAlarms = () => {
    const now = moment(); // Current time
    schedules.forEach((schedule) => {
      const scheduleTime = moment(`${schedule.date} ${schedule.time}`, 'YYYY-MM-DD HH:mm'); // Parse the schedule date and time
      const diffInMinutes = scheduleTime.diff(now, 'minutes'); // Difference in minutes

      if (diffInMinutes > 0 && diffInMinutes <= 5) {
        alert(`Upcoming schedule: ${schedule.title} in ${diffInMinutes} minutes!`);
      }
    });
  };

  // Handle changes in the form fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Submit the form data to add or update a schedule
  const handleSubmit = () => {
    if (editingScheduleId) {
      // Edit existing schedule
      fetch(`http://localhost:3000/Members/${userId}`)
        .then((response) => response.json())
        .then((memberData) => {
          const updatedSchedules = memberData.schedules.map((schedule) =>
            schedule.id === editingScheduleId ? { ...schedule, ...formData } : schedule
          );

          return fetch(`http://localhost:3000/Members/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...memberData, schedules: updatedSchedules }),
          });
        })
        .then((response) => {
          if (!response.ok) throw new Error('Error updating schedule');
          setSchedules((prevSchedules) =>
            prevSchedules.map((schedule) =>
              schedule.id === editingScheduleId ? { ...schedule, ...formData } : schedule
            )
          );
          setEditingScheduleId(null); // Clear editing state
          setShowModal(false); // Close modal
          alert('Schedule updated successfully');
        })
        .catch((error) => console.error('Error updating schedule:', error));
    } else {
      // Add new schedule
      const newSchedule = { ...formData, id: Date.now() };

      fetch(`http://localhost:3000/Members/${userId}`)
        .then((response) => response.json())
        .then((memberData) => {
          const updatedSchedules = [...memberData.schedules, newSchedule];

          return fetch(`http://localhost:3000/Members/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...memberData, schedules: updatedSchedules }),
          });
        })
        .then((response) => {
          if (!response.ok) throw new Error('Error adding schedule');
          setSchedules((prevSchedules) => [...prevSchedules, newSchedule]); // Add to state
          setShowModal(false); // Close modal
          alert('Schedule added successfully');
        })
        .catch((error) => console.error('Error adding schedule:', error));
    }
  };

  // Handle editing a schedule
  const handleEdit = (schedule) => {
    setEditingScheduleId(schedule.id);
    setFormData(schedule); // Populate form with existing data
    setShowModal(true); // Show modal for editing
  };

  // Handle deleting a schedule
  const handleDelete = (scheduleId) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      fetch(`http://localhost:3000/Members/${userId}`)
        .then((response) => response.json())
        .then((memberData) => {
          const updatedSchedules = memberData.schedules.filter((schedule) => schedule.id !== scheduleId);

          return fetch(`http://localhost:3000/Members/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...memberData, schedules: updatedSchedules }),
          });
        })
        .then((response) => {
          if (!response.ok) throw new Error('Error deleting schedule');
          setSchedules((prevSchedules) => prevSchedules.filter((schedule) => schedule.id !== scheduleId));
          alert('Schedule deleted successfully');
        })
        .catch((error) => console.error('Error deleting schedule:', error));
    }
  };

  // Toggle the display of schedule details (expand/collapse)
  const toggleDetails = (scheduleId) => {
    setExpandedScheduleId((prevId) => (prevId === scheduleId ? null : scheduleId));
  };

  // Close modal and reset form state
  const closeModal = () => {
    setShowModal(false);
    setEditingScheduleId(null); // Reset editing state
    setFormData({
      title: '',
      date: '',
      time: '',
      description: '',
      status: 'pending',
    });
  };

  // Filter schedules based on search term and status
  const filteredSchedules = schedules.filter((schedule) => {
    const matchesTitle = schedule.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus
      ? schedule.status?.toLowerCase() === selectedStatus.toLowerCase()
      : true;
    return matchesTitle && matchesStatus;
  });

  // Handle "Enter" key in search
  const handleSearchEnter = (e) => {
    if (e.key === 'Enter' && filteredSchedules.length === 0) {
      alert('No schedules found for your search.');
    }
  };

  return (
    <div className="container">
      <h2>Schedules</h2>
      <Button variant="primary" onClick={() => setShowModal(true)}>Add Schedule</Button>

      {/* Search and Status filter */}
      <div className="my-3">
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchEnter} // Listen for Enter key
          />
        </InputGroup>

        <DropdownButton
          id="dropdown-status"
          title={selectedStatus ? selectedStatus : "Filter by Status"}
          onSelect={(status) => setSelectedStatus(status)}
          className="mb-3"
        >
          <Dropdown.Item eventKey="">All</Dropdown.Item>
          <Dropdown.Item eventKey="pending">Pending</Dropdown.Item>
          <Dropdown.Item eventKey="complete">Complete</Dropdown.Item>
        </DropdownButton>
      </div>

      <div className="row">
        {filteredSchedules.map((schedule) => (
          <div key={schedule.id} className="col-md-4">
            <div className="schedule-item card mb-6">
              <div className="item card mb-3 hover-card">
                <div className="card-body">
                  <h5
                    className="card-title text-primary"
                    style={{ cursor: 'pointer' }}
                    onClick={() => toggleDetails(schedule.id)}
                  >
                    {schedule.title}
                  </h5>

                  {expandedScheduleId === schedule.id && (
                    <>
                      <p className="card-text"><strong>Date:</strong> {schedule.date}</p>
                      <p className="card-text"><strong>Time:</strong> {schedule.time}</p>
                      <p className="card-text"><strong>Description:</strong> {schedule.description}</p>
                      <p className="card-text"><strong>Status:</strong> {schedule.status}</p>
                      <Button variant="warning" onClick={() => handleEdit(schedule)} className="mr-2">Edit</Button>
                      <Button variant="danger" onClick={() => handleDelete(schedule.id)}>Delete</Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Add/Edit */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingScheduleId ? 'Edit Schedule' : 'Add Schedule'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Time</Form.Label>
              <Form.Control type="time" name="time" value={formData.time} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" name="description" value={formData.description} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" name="status" value={formData.status} onChange={handleChange}>
                <option value="pending">Pending</option>
                <option value="complete">Complete</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Close</Button>
          <Button variant="primary" onClick={handleSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Schedule;
