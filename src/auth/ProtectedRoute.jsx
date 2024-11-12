import React, { useEffect, useState } from 'react';
import { Children } from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const checkUserfromDatabase = async(email) => {
        const response = await fetch(`http://localhost:5000/users?email=${email}`, {method : "GET"});
        const user = await response.json();
        console.log(user);
        if(user.length > 0){
            setIsLoggedIn(true);
        }
        else{
            localStorage.removeItem("todoUser");
            navigate('/');  //by default login is home.
        }
    }

    useEffect(() => {
        const localUser = JSON.parse(localStorage.getItem("todoUser"));
        if(localUser){
            checkUserfromDatabase(localUser.email);
        }
        else{
            navigate('/');
        }
    }, [])

    return isLoggedIn ? children : null
}

export default ProtectedRoute;