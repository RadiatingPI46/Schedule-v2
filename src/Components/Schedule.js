import React, { useState, useEffect } from 'react';
import {Button, Modal, Form, InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import moment from 'moment';

const Schedule = ({ userId, onAdd, onUpdate, onDelete }) => {
  const [schedules, setSchedules] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
    status: 'pending'
  });
  const [editingScheduleId, setEditingScheduleId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // For searching by title
  const [selectedStatus, setSelectedStatus] = useState(''); // For filtering by status
  const [expandedScheduleId, setExpandedScheduleId] = useState(null);
  // Fetch schedules from db.json based on userId
  useEffect(() => {
    if (!userId) return; // Don't fetch if no userId is provided
    fetch(`https://schedule-v2.onrender.com/Members/${userId}`)
      .then(response => {
        if (!response.ok) throw new Error('Error fetching schedules');
        return response.json();
      })
      .then(data => setSchedules(data.schedules || []))
      .catch(error => console.error('Error fetching schedules:', error));
  }, [userId]);

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (editingScheduleId) {
      // Edit existing schedule
      fetch(`https://schedule-v2.onrender.com/Members/${userId}`)
        .then(response => response.json())
        .then(memberData => {
          const updatedSchedules = memberData.schedules.map(schedule =>
            schedule.id === editingScheduleId ? { ...schedule, ...formData } : schedule
          );

          return fetch(`https://schedule-v2.onrender.com/Members/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...memberData, schedules: updatedSchedules })
          });
        })
        .then(response => {
          if (!response.ok) throw new Error('Error updating schedule');
          // Update local state to reflect the changes immediately
          setSchedules(prevSchedules =>
            prevSchedules.map(schedule =>
              schedule.id === editingScheduleId ? { ...schedule, ...formData } : schedule
            )
          );
          setEditingScheduleId(null);
          setShowModal(false);
          alert("Schedule updated successfully");
        })
        .catch((error) => console.error("Error updating schedule:", error));
    } else {
      // Add new schedule
      const newSchedule = { ...formData, id: Date.now() };

      fetch(`https://schedule-v2.onrender.com/Members/${userId}`)
        .then(response => response.json())
        .then(memberData => {
          const updatedSchedules = [...memberData.schedules, newSchedule];

          return fetch(`https://schedule-v2.onrender.com/Members/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...memberData, schedules: updatedSchedules })
          });
        })
        .then(response => {
          if (!response.ok) throw new Error('Error adding schedule');
          // Update local state with the new schedule immediately
          setSchedules(prevSchedules => [...prevSchedules, newSchedule]);
          setShowModal(false);
          alert("Schedule added successfully");
        })
        .catch((error) => console.error("Error adding schedule:", error));
    }
  };

  const handleEdit = (schedule) => {
    setEditingScheduleId(schedule.id);
    setFormData(schedule);
    setShowModal(true);
  };

  const handleDelete = (scheduleId) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      fetch(`https://schedule-v2.onrender.com/Members/${userId}`)
        .then(response => response.json())
        .then(memberData => {
          const updatedSchedules = memberData.schedules.filter(schedule => schedule.id !== scheduleId);

          return fetch(`https://schedule-v2.onrender.com/Members/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...memberData, schedules: updatedSchedules })
          });
        })
        .then(response => {
          if (!response.ok) throw new Error('Error deleting schedule');
          setSchedules(prevSchedules => prevSchedules.filter(schedule => schedule.id !== scheduleId));
          alert('Schedule deleted successfully');
        })
        .catch(error => console.error('Error deleting schedule:', error));
    }
  };
  
// The toggleDetails function is used to show or hide the details of a specific schedule when its title is clicked. Here's a breakdown of its purpose and functionality://
  const toggleDetails = (scheduleId) => {
    setExpandedScheduleId((prevId) => (prevId === scheduleId ? null : scheduleId));
  };
  const closeModal = () => {
    setShowModal(false);
    setEditingScheduleId(null);
    setFormData({
      title: '',
      date: '',
      time: '',
      description: '',
      status: 'pending'
    });
  };

    // Filter schedules based on search term and selected status
    const filteredSchedules = schedules.filter((schedule) => {
      const matchesTitle = schedule.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus
        ? schedule.status?.toLowerCase() === selectedStatus.toLowerCase()
        : true;
      return matchesTitle && matchesStatus;
    });
  
    // Show alert if no schedules found on Enter key press
    const handleSearchEnter = (e) => {
      if (e.key === 'Enter') {
        if (filteredSchedules.length === 0) {
          alert("No schedules found for your search.");
        }
      }
    };
  

  return (
    <div className="container" style={{borderRadius:"15px"}}>
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

      <button class="button" onClick={() => setShowModal(true)}><p>Add Schedule</p></button>


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

      </div>

      <div className="row">
  {filteredSchedules.map((schedule) => (
    <div key={schedule.id} className="col-md-4">
      <div key={schedule.id} className="schedule-item card mb-6 e-card playing">
      <div class="image"></div>

      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
        <div className="item card mb-3 hover-card box">
        <span></span>
          <div className="card-body content2c">
            <h2
              className="card-title"
              style={{ cursor: 'pointer' }}
              onClick={() => toggleDetails(schedule.id)}
            >
              {schedule.title}
            </h2>

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
