import React from 'react';
import illustration from '../assests/illustration.png'
import { NavLink,Link, Outlet } from 'react-router-dom';

function Home(props) {
    return (
        <div className='container-fluid h-100'>
            <div className='row align-items-center h-100'>
                <div className='col-lg-6 d-flex flex-column align-items-center justify-content-center h-100 text-white bg-primary'>
                    <h1 className='display-4 text-white text-center text-uppercase mb-3'>
                        An App to <br/>
                        Make Your Life <br/>
                        <span className='display-1'>Organised</span>
                    </h1>

                    <img className="img-fluid" src={illustration} alt="illustration" />
                </div>
                <div className='col-lg-6 d-flex flex-column align-items-center justify-content-center h-100 text-white'>

                    <div className='card w-50'>
                        <div className='card-header d-flex border-0 p-0 '>
                            {/* <Link to="/login" className='w-50 py-2 text-center text-primary text-decoration-none fw-bold'>Login</Link>
                            <Link to="/register" className='w-50 py-2 text-center text-white bg-primary text-decoration-none fw-bold'>Register</Link> */}
                            <NavLink 
                                to="/login" 
                                className={({ isActive }) => 
                                    `w-50 py-2 text-center ${isActive ? 'text-primary bg-white' : 'text-white bg-primary'} text-decoration-none fw-bold`
                                }
                            >
                                Login
                            </NavLink>
                            <NavLink 
                                to="/register" 
                                className={({ isActive }) => 
                                    `w-50 py-2 text-center ${isActive ? 'text-primary bg-white' : 'text-white bg-primary'} text-decoration-none fw-bold`
                                }
                            >
                                Register
                            </NavLink>
                        </div>
                        <div className='card-body'>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;