import {createContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();
// import { useEffect } from 'react';


export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    //register user

    const register = async (formData) => {
        //api request in vanilla javascript
        // in vanilla javascript we can use fetch() method to send request to an api
        let config = {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(formData)
        }
        const checkEMail = await fetch(`http://localhost:5000/users?email=${formData.email}`, {method:"GET"});
        const emailResponse = await checkEMail.json();
        if(emailResponse.length > 0){
            alert("Email Already Exists");
        }
        else{
            const response = await fetch("http://localhost:5000/users", config); //post data and return the same in readable stream
            const user = await response.json();
            if(response.status === 201){
                localStorage.setItem("todoUser", JSON.stringify(user));  
                setUser(user);
                alert("successfully registered");
                navigate('/task-list');
            }
            else{
                alert("something went wrong");
            }
        }
        
    }

    const login = async (formData) => {
        const response = await fetch(`http://localhost:5000/users?email=${formData.email}&password=${formData.password}`, {method : "GET"});
        const users = await response.json();
        
        if(users.length > 0){
            localStorage.setItem("todoUser", JSON.stringify(users[0]));
            setUser(users[0]);
            alert("User Found!");
            navigate('/task-list');
        }
        else{
            alert("Email Or Password Invalid!")
        }
        console.log(users);
    }

    const checkUserfromDatabase = async(email) => {
        const response = await fetch(`http://localhost:5000/users?email=${email}`, {method : "GET"});
        const user = await response.json();
        // console.log(user);
        if(user.length > 0){
            setUser(user[0]);
        }
        else{
            localStorage.removeItem("todoUser");
        }
    }

    const logout = () => {
        localStorage.removeItem("todoUser");
        setUser(null);
        navigate("/");
    }

    useEffect(() => {
        let localUser = JSON.parse(localStorage.getItem("todoUser"));
        if(localUser){
            checkUserfromDatabase(localUser.email);
        }
        
        // setUser(localUser);

      }, []);

    return(
        <AuthContext.Provider value={{
            register,            //when value id stored in variable then we can simple write variable it will create property and value.
            login, 
            user,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;