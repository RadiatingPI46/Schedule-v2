import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Components/Home";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import Profile from "./Components/Profile";
import About from "./Components/About";

function App() {
  return (
    <Router>
        <Nav/>
            <div>
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/profile/:id" element={<Profile/>}/>
                <Route path="/about" element={<About/>}/>
              </Routes>
            </div>
        <Footer/>
    </Router>
  );
}

export default App;
