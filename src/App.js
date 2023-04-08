import React from 'react'
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ChangeStudent from './components/ChangeStudent';
import CreateMentor from './components/CreateMentor';
import CreateStudent from './components/CreateStudent';
import Navbar from './components/Navbar';
import AssignStud from './components/AssignStud';
import DashBoard from './components/DashBoard';
import StudentDetails from './components/StudentDetails';
import MentorDetails from './components/MentorDetails';
import UnassignedStudent from './components/UnassignedStudent';
function App() {
  return (
    <>
      <BrowserRouter>
        <div className='background'>
          <Navbar />
          <Routes>
            <Route path="/create-student" element={<CreateStudent />} />
            <Route path="/create-mentor" element={<CreateMentor />} />
            <Route path="/assign-student" element={<AssignStud />} />
              <Route path="change-student" element={<ChangeStudent />} />
            
            <Route path="/dashboard" element={<DashBoard />} >
              <Route index element={<StudentDetails />} />
              <Route path="mentor-details" element={<MentorDetails />} />
              <Route path="unassigned-student" element={<UnassignedStudent />} />
            </Route>
          </Routes>
          {/* {
            <Navigate to="/dashboard" replace={true} />
          } */}
        </div>
      </BrowserRouter>
    </>
  )
}

export default App