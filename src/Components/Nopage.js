import React from 'react'

function Nopage() {
  return (
    <div style={{textAlign:"center",justifyContent:"center", alignItems:"center" ,display:"flex",height:"1000px"}}>
      <div class="error-card-container">
        <div class="error-card">
        <div class="front-content">
          <p>SORRY</p>
        </div>
        <div class="error-content">
          <p class="heading"><h1>ERROR 404</h1></p>
          <p>
          <h2>Page not found</h2>    
          </p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Nopage