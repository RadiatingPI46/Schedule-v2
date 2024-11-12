import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Profile() {

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
      .catch((error) => {
        console.error("Error fetching data:", error);

      })
      .finally(() => {
        setLoading(false); // Set loading to false when the fetch finishes
      });
  }, [id]);

  console.log(user); // Check the fetched user data

  if (loading) {
    return <div>Loading...</div>; // Show loading until data is fetched
  }

  if (!user) {
    return <div>User not found.</div>; // If no user is found, display an error
  }

  return (
    <div style={{ marginTop: '20px' }}>
        <h2>{id}</h2>
      <h2>Your Profile</h2>
      <div className="user-details">
        <img
          src={user && user.profile_pic || 'https://via.placeholder.com/150'}
          alt="Profile Pic"
          className="profile-pic"
          style={{ borderRadius: '50%', width: '150px', height: '150px' }}
        />
        <p><strong>Name:</strong> {user && user.name}</p>
        <p><strong>Email:</strong> {user && user.email}</p>
      </div>

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
    </div>
  );
}

export default Profile;