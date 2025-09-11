// import './App.css'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import UserLogin from './pages/Login'
import Client from './pages/Client'
import Project from './pages/Project'
import AddClient from './pages/AddClient'
import GetProject from './pages/GetProject'

import AddProject from './pages/AddProject'



function App() {


  return (
    <>  
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/client" element={<Client />} />
        <Route path="/projects" element={<GetProject />} />
        <Route path="/client/:id/projects" element={<Project />} />
        <Route path="/client/:id/projects/create" element={<AddProject />} />
        <Route path="/add-client" element={<AddClient />} />
        <Route path="*" element={<UserLogin />} />
      </Routes>
    </>
  )
}



export default App
