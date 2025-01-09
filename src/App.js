import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from "./components/pages/Login.js";
import Createproject from "./components/pages/Createproject.js";
import Sidebar from "./components/Sidebar.js";
import Addresources from "./components/pages/Addresources.js";
import Createapp from "./components/pages/Createapp.js";
import Deployresources from "./components/pages/Deployresources.js";
import Projectdetails from "./components/pages/Projectdetails.js";
import Addresourceinstance from "./components/pages/Addresourceinstance.js";
import Deployresourceinstances from "./components/pages/Deployresourceinstances.js";
import Appdetails from "./components/pages/Appdetails.js";
import Manageresourceinstance from "./components/pages/Manageresourceinstance.js";
import Dashboard from "./components/pages/Dashboard.js";
import Projectlist from "./components/pages/Projectlist.js";
import Attachresourceinstance from "./components/pages/Attachresourceinstance.js";

// import { Buffer } from 'buffer';
// import process from 'process';
// import crypto from 'crypto-browserify';
// import stream from 'stream-browserify';

// window.Buffer = Buffer;
// window.process = process;
// window.crypto = crypto;
// window.stream = stream;


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createproject" element={<Createproject />} />
            <Route path="/createapp" element={<Createapp />} />
            <Route path="/sidebar" element={<Sidebar />} />
            <Route path="/addresources" element={<Addresources />} />
            <Route path="/deployresources" element={<Deployresources />} />
            <Route path="/projectdetails" element={<Projectdetails />} />
            <Route path="/addresourceinstance" element={<Addresourceinstance />} />
            <Route path="/deployresourceinstances" element={<Deployresourceinstances />} />
            <Route path="/appdetails" element={<Appdetails />} />
            <Route path="/manageresourceinstance" element={<Manageresourceinstance />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projectlist" element={<Projectlist />} />
            <Route path="/attachresourceinstance" element={<Attachresourceinstance />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;

