import React from 'react'
import { useState } from 'react';
import home_icon from '../Image/House icons for free download _ Freepik.jpeg'
import { Link } from 'react-router-dom'

function Nav() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModal1Open, setIsModal1Open] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
      };
      const openModal1 = () => {
        setIsModal1Open(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };
      const closeModal1= () => {
        setIsModal1Open(false);
      };

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{justifyContent:"space-between", padding:"5px"}}>
            <Link to={'./' }><img src={`${home_icon}`} alt='HOME' style={{width:"30px" ,height:"30px"}}></img></Link>
            <div>
            <button onClick={openModal1} style={{width:"90px"}}>LOGIN</button>
        
            {isModal1Open && (
              <div className="modal show d-block" tabIndex="-1">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">"LOGIN"</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={closeModal1}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <input placeholder='Name'/>
                        <label>Price</label>
                        <input  />
                        <button type="submit">CONTINUE</button>
                      </form>
                
                    </div>
                  </div>
                </div>
              </div>
            )}
            <button onClick={openModal} style={{width:"90px"}}>Sign-in</button>
        
            {isModalOpen && (
              <div className="modal show d-block" tabIndex="-1">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">"modal"</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={closeModal}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <input placeholder='Name'/>
                        <label>Price</label>
                        <input  />
                        <button type="submit">Update</button>
                      </form>
                
                    </div>
                  </div>
                </div>
              </div>
            )}
            </div>
        </nav>
    </div>
  )
}

export default Nav