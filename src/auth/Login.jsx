import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

function Login(props) {
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();
    const[formData, setFormData] = useState(null);
    const handleChange = (e) => {
        let {name, value} = e.target;
        setFormData((prev) => {
            return{
                ...prev, [name] : value
            }
        })
    }

    const handleSubmit = () => {
        login(formData);
    }

    return (
        <div className='py-2'>
            <div className='mb-3'>
                <label className='form-label'>Email</label>
                <input type="email" name='email' className='form-control' onChange={handleChange} />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Password</label>
                <input type="password" name='password' className='form-control' onChange={handleChange} />
            </div>
            <button className='btn btn-primary'onClick={handleSubmit} >Login</button>
        </div>
    );
}

export default Login;