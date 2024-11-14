import React from 'react'
import { useState } from 'react';
import home_icon from '../Image/House icons for free download _ Freepik.jpeg'
import { Link, useNavigate } from 'react-router-dom'

function Nav() {
    const nav = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModal1Open, setIsModal1Open] = useState(false);
    const [signname, setSignname] = useState("");
    const [signemail, setSignemail] = useState("");
    const [signpassword, setSignpassword] = useState("");

    const [loginemail,setLoginemail] = useState()
    const [loginpassword,setLoginpassword] = useState()


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

      function handleSignin(){
        fetch('https://schedule-v2.onrender.com/Members')
        .then((response) => response.json())
        .then((memberlist) => {
          const parameter = memberlist && memberlist.find((member)=>{
            return (member.email === signemail) || (member.password===signpassword)
          })
          if (parameter===undefined){
            fetch('https://schedule-v2.onrender.com/Members', {
              method: 'POST',
              body: JSON.stringify({
                name: signname,
                email: signemail,
                password:signpassword,
                profile_pic:'',
                schedules:[{}],
              }),
              headers: {
                'Content-type': 'application/json',
              },
            })
              .then((response) => response.json())
              .then((json) => console.log(json));
          }
          else{
            alert("Email or Password already exists")
          }
        });

      }

      function login(e){
        e.preventDefault()
    
          fetch('https://schedule-v2.onrender.com/Members')
          .then((response) => response.json())
          .then((data) => {
      
            const searching = data && data.find((member)=>{
              return (member.email === loginemail) && (member.password===loginpassword)
            })
            console.log({searching})
            if (searching===undefined){
              alert("Member Not Found")
            }
            else{
                nav(`/profile/${searching.id}`)
                setIsModal1Open(false)
                setLoginemail()
                setLoginpassword()

            }

            
          })
          .catch((error) => console.error("Error fetching data:", error));
      
        }

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{justifyContent:"space-between", padding:"5px"}}>
            <Link to={'./' }><img src={`${home_icon}`} alt='HOME' style={{width:"30px" ,height:"30px"}}></img></Link>
            <div>
            <button onClick={openModal1} style={{width:"90px", marginRight:"5px"}}>LOGIN</button>
        
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
                    <form onSubmit={login}>
                      <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={loginemail} onChange={(e)=>setLoginemail(e.target.value)} required/>
                      </div>
                      <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={loginpassword} onChange={(e)=>setLoginpassword(e.target.value)} required/>
                      </div>
                      <button type="submit" className="btn btn-primary">Continue</button>
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
                      <h5 className="modal-title">"SIGN-IN"</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={closeModal}
                      ></button>
                    </div>
                    <div className="modal-body">
                    <form onSubmit={handleSignin}>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Name</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={signname} onChange={(e)=>setSignname(e.target.value)} required/>
                      </div>
                      <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={signemail} onChange={(e)=>setSignemail(e.target.value)} required/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                      </div>
                      <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={signpassword} onChange={(e)=>setSignpassword(e.target.value)} required/>
                      </div>
                      <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" required/>
                        <label className="form-check-label" for="exampleCheck1"><a href='#'>Privacy Policy</a></label>
                      </div>
                      <button type="submit" className="btn btn-primary">Submit</button>
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
