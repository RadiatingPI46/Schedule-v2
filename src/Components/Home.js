import React from 'react'
import home_image from '../Image/Schedule.jpeg'

function Home() {
  return (
    <div style={{justifyContent:"space-arround",textAlign:"center"}}>
        <div style={{backgroundImage:`url(${home_image})`, height:"500px",width:"750px"}}>
            home
        </div>
    </div>
  )
}

export default Home