import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assests/logo.png';
import AuthContext from '../auth/AuthContext';

function Navbar(props) {
    
   const {user, logout} = useContext(AuthContext);

    return (
        <nav className= "navbar navbar-expand-lg bg-body-tertiary fixed-top">
  <div className= "container-fluid">
    <Link className= "navbar-brand" href="#"><img src={logo} alt='to-do-app'/></Link>
    <button className= "navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className= "navbar-toggler-icon"></span>
    </button>
    <div className= "collapse navbar-collapse" id="navbarSupportedContent">
      <ul className= "navbar-nav ms-auto mb-2 mb-lg-0">
        {
          !user ?
        
        <>
        <li className= "nav-item">
          <Link className= "nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className= "nav-item">
          <Link className= "nav-link" to = "/about">About</Link>
        </li>  
        </>
        :
        <>
        <li className= "nav-item">
          <Link className= "nav-link" to = "/create-task">Create Task</Link>
        </li>
        <li className= "nav-item">
          <Link className= "nav-link" to = "/task-list">Task List</Link>
        </li> 
        <li className= "nav-item">
          <Link className= "nav-link" to = "/profile">{user?.username}</Link>
        </li>
        <li className= "nav-item dropdown">
          <Link className= "nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </Link>
          <ul className= "dropdown-menu">
            <li><Link className= "dropdown-item" href="#">Action</Link></li>
            <li><Link className= "dropdown-item" href="#">Another action</Link></li>
            <li><hr className= "dropdown-divider"/></li>
            <li><span className= "dropdown-item" onClick={logout}>Logout</span></li>
          </ul>
        </li>
        </>
        }
      </ul>
    </div>
  </div>
</nav>
    );
}

export default Navbar;