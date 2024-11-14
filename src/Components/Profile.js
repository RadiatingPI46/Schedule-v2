import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Schedule from './Schedule'; // Import the Schedule component
import profile_image from '../Image/932de221-6cad-49d0-8446-383423b90459.jpeg';
import profile_placeholder from '../Image/Fotos De Perfil __ Fotos De Perfil Chidas __ Fotos De Perfil Para Whatsapp __ Fotos De Perfil Para Parejas.jpeg'
import { useNavigate } from 'react-router-dom';

function Profile() {
    const nav = useNavigate() 
const { id } = useParams();
const [loading, setLoading] = useState(true);
const [user, setUser] = useState(null); // Initialize with null to check if the user exists

useEffect(() => {
fetch(`https://schedule-v2.onrender.com/Members/${id}`)
.then((response) => response.json())
.then((data) => setUser(data))
.catch((error) => {
console.error('Error fetching data:', error);
})
.finally(() => setLoading(false));
}, [id]);

if (loading) {
return (
<div style={{display:'flex', justifyContent:"center",alignItems:"center",minHeight:"900px"}}>
<div class="loader">
  <div class="box box0">
    <div></div>
  </div>
  <div class="box box1">
    <div></div>
  </div>
  <div class="box box2">
    <div></div>
  </div>
  <div class="box box3">
    <div></div>
  </div>
  <div class="box box4">
    <div></div>
  </div>
  <div class="box box5">
    <div></div>
  </div>
  <div class="box box6">
    <div></div>
  </div>
  <div class="box box7">
    <div></div>
  </div>
  <div class="ground">
    <div></div>
  </div>
</div>
</div>
);
}

if (!user) {
return (
<div style={{display:'flex', justifyContent:"center",alignItems:"center",minHeight:"900px"}}>
<div id="triangle">
  <svg id="Layer_1" data-name="Layer 1" version="1.1" viewBox="0 0 2000 2000">
    <polygon
      class="cls-1"
      points="928 781 1021 951 784.5 1371.97 1618 1371.97 1530.32 1544 509 1539 928 781"
    ></polygon>
    <polygon
      class="cls-3"
      points="1618 1371.97 784.5 1371.97 874.93 1211 1346 1211 923.1 456 1110.06 456 1618 1371.97"
    ></polygon>
    <g id="Layer_2" data-name="Layer 2">
      <polygon
        class="cls-2"
        points="418 1372.74 509 1539 928 781 1162.32 1211 1346 1211 923.1 456 418 1372.74"
      ></polygon>
    </g>
  </svg>
</div>
<br/>
<h2>USER NOT FOUND</h2>
</div>
) // Handle the case if no user is found
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

function updateProfile(){
    nav(`/editprofile/${user.id}`)
}

return (
<div style={{backgroundImage: `url(${profile_image})`, minHeight: '1000px', backgroundSize: 'cover' }}>
<div className="user-details" style={{ padding: '20px', borderRadius: '10px' }}>
<img
src={'https://i.pinimg.com/236x/57/5e/9e/575e9efbd7f207bdd9433cc0e886ae4e.jpg'}
alt="Profile Pic"
className="profile-pic"
style={{ borderRadius: '50%', width: '250px', height: '250px', border: '5px solid white', marginBottom: '20px' }}
/>
<br/>
<img src={`${user.profile_pic}` || `${profile_placeholder}` } alt='' style={{ borderRadius: '50%', width:"100px", height:"100px", marginBottom: '20px'}} onClick={updateProfile}/>
<p style={{color:'aliceblue'}}><strong>Name:</strong> {user.name}</p>
<p style={{color:'aliceblue'}}><strong>Email:</strong> {user.email}</p>
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

