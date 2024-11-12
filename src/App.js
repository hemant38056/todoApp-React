// import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Link, Navigate, NavLink, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import TaskList from './pages/TaskList';
import Profile from './pages/Profile';
import CreateTask from './pages/CreateTask';
import PageNotFound from './pages/PageNotFound';
import Navbar from './components/Navbar';
import Login from './auth/Login';
import Register from './auth/Register';
import { useState } from 'react';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import { TaskProvider } from './context/TaskContext';

function App() {
  // const [color, changeColor] = useState('white');
  return (
    //Routes setup using react router dom
    
   <BrowserRouter>
   <AuthProvider>
    <TaskProvider>
      <Navbar />    
      <Routes>
        <Route path='/' element={<Navigate to = "/login" />}></Route>
        <Route path='/' element = {<Home />}>
          <Route path='/login' element = {<Login />}></Route>
          <Route path='/register' element = {<Register />}></Route>
        </Route>
        <Route path='/about' element = {<About />}></Route>
        <Route path='/task-list' element = {<ProtectedRoute><TaskList /></ProtectedRoute>}></Route>
        <Route path='/create-task' element = {<CreateTask />}></Route>
        <Route path='/profile' element = {<Profile />}></Route>
        <Route path='*' element = {<PageNotFound />}></Route>
      </Routes>
      </TaskProvider>
      </AuthProvider>
   </BrowserRouter>
   
  );
}

export default App;
