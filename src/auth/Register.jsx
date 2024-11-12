import React, { useRef, useContext, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import AuthContext from './AuthContext';
import { useEffect } from 'react';

function Register(props) {
    const init = {
        username : "",
        email : "",
        password : ""
    }

    const {register} = useContext(AuthContext);


    const inputRef = useRef(null);


    // useNavigate hook is used for redirection in a function.
    const navigate = useNavigate();
   
    const[formData, setFormData] = useState(init);
    const handleChange = (e) => {
        let {name, value} = e.target;
        setFormData((prev) => {
            return{
                ...prev, [name] : value
            }
        })
    }

    

    const validate = () => {
        let errorsData = {};
        errorsData.username = [];

        if(!formData.username){
            errorsData.username.push("Please Enter Username");
        }

        errorsData.email = [];
        if(!formData.email){
            errorsData.email.push("Please provide an email");
        }

        let emailreg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailreg.test(formData.email)){
            errorsData.email.push("Please enter a valid email");
        }


        errorsData.password = [];
        if(!formData.password){
            errorsData.password.push("Please enter a password");
        }

        if(!formData.password.length >= 8){
            errorsData.password.push("Password should be atleast 8 characters.");
        }

        setErrors(errorsData);
    }


    let isValid = () => {
        let valid = true;
        for(let control in errors){
            if(errors[control].length > 0){
                valid = false;
            }
        }
        return valid;
    }

   const handleSubmit = () => {
    if(isValid()){
        register(formData);
    }
    else{
        const currValue = inputRef.current.value;
        if(!currValue){
            Object.keys(dirty).forEach((key) => dirty[key] = true);
        }
        alert("Please resolve errors in the form");
    }
   }

   const [errors, setErrors] = useState({
    username : [],
    email : [],
    password : []
   });

   const[dirty, setDirty] = useState({
        username : false,
        name : false,
        password : false
    });

    

    const handleBlur = (e) => {
        let {name} = e.target;
        setDirty((prev) => ({
            ...prev,
            [name] : true
        }))
        validate();
    }

    useEffect(validate, [formData]);
   

    return (
        <div className='py-2'>
            <div className='mb-3'>
                <label className='form-label'>User Name</label>
                <input ref={inputRef} type="text" name='username' className='form-control' onChange={handleChange} onBlur={handleBlur} />
                <span>{dirty["username"] && errors["username"][0] ? errors["username"] : ""}</span>
            </div>
            <div className='mb-3'>
                <label className='form-label'>Email</label>
                <input ref={inputRef} type="email" name='email' className='form-control' onChange={handleChange} onBlur={handleBlur} />
                <span>{dirty["email"] && errors["email"][0] ? errors["email"] : ""}</span>
            </div>
            <div className='mb-3'>
                <label className='form-label'>Password</label>
                <input ref={inputRef} type="password" name='password' className='form-control' onChange={handleChange} onBlur={handleBlur} />
                <span>{dirty["password"] && errors["password"][0] ? errors["password"] : ""}</span>
            </div>
            <button className='btn btn-primary' onClick={handleSubmit}>Register</button>
        </div>
    );
}

export default Register;