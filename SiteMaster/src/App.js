import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Project from './Project';
import TaskDetails from './TaskDetails';

function App() {
  
  return( <>

  <Router>

    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/home" element={<Home/>} />
      <Route path="/project/:prjName/:company/:prjManager" element={<Project/>} />
      <Route path="/tasks/:prjName/:company" element={<Project/>} />
      <Route path="/taskDetails/:id" element={<TaskDetails/>} />
    </Routes>


  </Router>
  </>
  );
}

export default App;
