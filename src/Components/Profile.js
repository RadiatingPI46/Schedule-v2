import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Schedule from './Schedule'; // Import the Schedule component
import profile_image from '../Image/932de221-6cad-49d0-8446-383423b90459.jpeg';

function Profile() {
const { id } = useParams();
const [loading, setLoading] = useState(true);
const [user, setUser] = useState(null); // Initialize with null to check if the user exists

useEffect(() => {
fetch(`http://localhost:3000/Members/${id}`)
.then((response) => response.json())
.then((data) => setUser(data))
.catch((error) => {
console.error('Error fetching data:', error);
})
.finally(() => setLoading(false));
}, [id]);

if (loading) {
return <div>Loading...</div>;
}

if (!user) {
return <div>User not found.</div>; // Handle the case if no user is found
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
<div style={{ marginTop: '20px', backgroundImage: `url(${profile_image})`, minHeight: '1000px', backgroundSize: 'cover' }}>
<h2>Your Profile</h2>
<div className="user-details" style={{ padding: '20px', backgroundColor: 'rgba(0, 0, 0, 0.6)', borderRadius: '10px' }}>
<img
src={user.profile_pic || 'https://via.placeholder.com/150'}
alt="Profile Pic"
className="profile-pic"
style={{ borderRadius: '50%', width: '150px', height: '150px', border: '5px solid white', marginBottom: '20px' }}
/>
<p><strong>Name:</strong> {user.name}</p>
<p><strong>Email:</strong> {user.email}</p>
</div>

{/* Pass user ID to Schedule component */}
<Schedule
userId={user.id}
onAdd={handleAddSchedule}
onUpdate={handleUpdateSchedule}
onDelete={handleDeleteSchedule}
/>
</div>
);
}

export default Profile;

