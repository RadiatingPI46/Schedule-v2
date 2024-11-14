import React from 'react'
import { useParams } from 'react-router-dom';
import profile_placeholder from '../Image/Fotos De Perfil __ Fotos De Perfil Chidas __ Fotos De Perfil Para Whatsapp __ Fotos De Perfil Para Parejas.jpeg'
import edit_background from '../Image/439fa745-161c-4e60-8fd6-5e60541f3d84.jpeg'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Editprofile() {
  const nav = useNavigate()
  const {id} = useParams()
  const [prodata, setProdata] = useState()
  const [profilename, setProfilename] = useState( '')
  const [profileemail, setProfileemail] = useState('')
  const [profilepassword, setProfilepassword] = useState('')
  const [profilepic, setProfilepic] = useState('')



  useEffect(() => {
    fetch(`https://schedule-v2.onrender.com/Members/${id}`)
    .then((response) => response.json())
    .then((data) => {
      setProdata(data)
    })
    .catch((error) => {
    console.error('Error fetching data:', error);
    })
  },[])

  function submitUpdate(){
    fetch(`https://schedule-v2.onrender.com/Members/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: profilename,
        email: profileemail,
        password:profilepassword,
        profile_pic:profilepic,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
      nav(`/profile/${prodata.id}`)
  }

 

  console.log(prodata);
  
  return (
    <div style={{backgroundImage: `url(${edit_background})`, minHeight: '1000px', backgroundSize: 'cover' }}>
      {prodata && <div className="user-details" style={{ padding: '20px', borderRadius: '10px' }}>
      <br/>
      <img src={`${prodata.profile_pic}` || `${profile_placeholder}` } style={{ borderRadius: '50%',width: '250px', height: '250px', marginBottom: '20px'}} alt=''/>
      <p style={{color:'aliceblue'}}><strong>Name:</strong> {prodata.name}</p>
      <p style={{color:'aliceblue'}}><strong>Email:</strong> {prodata.email}</p>
      <p style={{color:'aliceblue'}}><strong>Password:</strong> {prodata.password}</p>
      </div>}

      <div style={{display:"flex", textAlign:"center", justifyContent:"center"}}>
          {prodata && <form className="esform" onSubmit={submitUpdate}>
              <p className="title">Update Profrile </p>
                  <div className="flex">
                  <label> 
                    <input className="input" type="text" placeholder="Name" required value={profilename} onChange={(e) => setProfilename(e.target.value)} />
                  </label>

              </div>  
              <label>
                  <input className="input" type="email" placeholder="Email" required value={profileemail} onChange={(e) => setProfileemail(e.target.value)}/>
              </label> 
              <label>
                  <input className="input" type="password" placeholder="Password" required value={profilepassword} onChange={(e) => setProfilepassword(e.target.value)}/>
              </label>
              <label>
                  <input className="input" type="url" placeholder="Profile Picture" required value={profilepic} onChange={(e) => setProfilepic(e.target.value)}/>
              </label>
              <button className="submit">Submit</button>
          </form>}
      </div>

      <div style={{display:"flex", textAlign:"center", justifyContent:"center"}}>
          <div className="escard" >
            <div className="escircle"></div>
            <div className="escircle"></div>
            
            <div className="escard-inner" style={{justifyContent:"center", alignItems:"center", textAlign:"center"}}>
                {prodata && prodata.schedules.map((schedule)=>(
                  <p key={schedule.id}><h2>{schedule.title}</h2></p>
                ))}
            </div>          
          </div>
      
      </div>

    </div>
  )
}

export default Editprofile