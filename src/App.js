import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Components/Home";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import Profile from "./Components/Profile";
import About from "./Components/About";
import Nopage from "./Components/Nopage";

function App() {
  return (
    <Router>
        <Nav/>
            <div style={{backgroundColor:"darkgray"}}>
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/profile/:id" element={<Profile/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="*" element={<Nopage/>}/>
              </Routes>
            </div>
        <Footer/>
    </Router>
  );
}

export default App;