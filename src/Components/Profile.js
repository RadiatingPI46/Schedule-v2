import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Schedule from './Schedule'; // Import the Schedule component
import profile_image from '../Image/932de221-6cad-49d0-8446-383423b90459.jpeg';


function Profile() {
<<<<<<< HEAD
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);  // Initialize with null to check if the user exists

  useEffect(() => {
    fetch(`http://localhost:3000/Members/${id}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
=======

    const {id} = useParams()

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    // Fetch user data from db.json

    fetch(`http://localhost:3000/Members/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Select the user with id 1 (You can modify this logic for dynamic user selection)
        // const loggedInUser = data.find((member) => member.id == id); // Example: Get user with id 1
        setUser(data); // Set the correct user object
       
      })
>>>>>>> 4512399e4708f7e8e638b52ad10edc1c6f04bbec
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
<<<<<<< HEAD
      .finally(() => setLoading(false));
  }, [id]);
=======
      .finally(() => {
        setLoading(false); // Set loading to false when the fetch finishes
      });
  }, [id]);


  console.log(user); // Check the fetched user data
>>>>>>> 4512399e4708f7e8e638b52ad10edc1c6f04bbec

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found.</div>;  // Handle the case if no user is found
  }

  const handleAddSchedule = (newSchedule) => {
    setUser((prevUser) => ({
      ...prevUser,
      schedules: [...prevUser.schedules, newSchedule],
    }));
  };

  const handleUpdateSchedule = (id, updatedData) => {
    setUser((prevUser) => ({
      ...prevUser,
      schedules: prevUser.schedules.map((schedule) =>
        schedule.id === id ? { ...schedule, ...updatedData } : schedule
      ),
    }));
  };

  const handleDeleteSchedule = (id) => {
    setUser((prevUser) => ({
      ...prevUser,
      schedules: prevUser.schedules.filter((schedule) => schedule.id !== id),
    }));
  };

  return (
<<<<<<< HEAD
    <div style={{ marginTop: '20px', backgroundImage: `url(${profile_image})`, minHeight: '1000px', backgroundSize: 'cover' }}>
=======
    <div style={{ marginTop: '20px' }}>
        <h2>{id}</h2>
>>>>>>> 4512399e4708f7e8e638b52ad10edc1c6f04bbec
      <h2>Your Profile</h2>
      <div className="user-details" style={{ padding: '20px', backgroundColor: 'rgba(0, 0, 0, 0.6)', borderRadius: '10px' }}>
        <img
          src={user && user.profile_pic || 'https://via.placeholder.com/150'}

          alt="Profile Pic"
          className="profile-pic"
          style={{ borderRadius: '50%', width: '150px', height: '150px', border: '5px solid white', marginBottom: '20px' }}
        />
        <p><strong>Name:</strong> {user && user.name}</p>
        <p><strong>Email:</strong> {user && user.email}</p>
      </div>

<<<<<<< HEAD
      {/* Pass user ID to Schedule component */}
      <Schedule
        userId={user.id}
        onAdd={handleAddSchedule}
        onUpdate={handleUpdateSchedule}
        onDelete={handleDeleteSchedule}
      />
=======
      <h3>Your Schedules</h3>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {user && user.schedules.map((schedule) => (

          <li
            key={schedule.id}
            style={{
              border: '1px solid #ddd',
              margin: '10px',
              padding: '10px',
              borderRadius: '5px',
            }}
          >
            <h4>{schedule.title}</h4>
            <p><strong>Date:</strong> {schedule.date}</p>
            <p><strong>Time:</strong> {new Date(schedule.time).toLocaleTimeString()}</p>
            <p><strong>Description:</strong> {schedule.description}</p>
            <p><strong>Status:</strong> {schedule.status}</p>
          </li>
        ))}
      </ul>
>>>>>>> 4512399e4708f7e8e638b52ad10edc1c6f04bbec
    </div>
  );
}

export default Profile;

