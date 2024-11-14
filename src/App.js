import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Components/Home";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import Profile from "./Components/Profile";

function App() {
  return (
    <Router>
        <Nav/>
            <div>
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/profile/:id" element={<Profile/>}/>
              </Routes>
            </div>
        <Footer/>
    </Router>
  );
}

export default App;