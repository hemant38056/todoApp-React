import { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "../auth/AuthContext";

const TaskContext = createContext();





export const TaskProvider = ({children}) => {


    const {user} = useContext(AuthContext);
    const[allTasks, setAllTasks] = useState(null);
    const[recentTasks, setRecentTasks] = useState(null);
    const[latestTask, setLatestTask] = useState(null);

    // add task
    const addTask = async (formData) => {
        const config = {
            method : "POST",
            headers : {
                "Content-Type":"application/json"
            },
            body : JSON.stringify(formData)
        }
    
        try{
            const response = await fetch(`http://localhost:5000/tasks`, config);
            if(response.status == 201){
                getTasks(user.id);
                alert("task created");
            }
            else{
                alert("something went wrong")
            }
        }
        catch(error){
            console.log(error);
        }
    }
    
    // get all taska
    
    const getTasks = async (id) => {
        try{
            const response = await fetch(`http://localhost:5000/tasks?userid=${id}`, {method:'GET'})
            if(response.ok){
                const tasks = await response.json();
                setAllTasks(tasks);
                let recent = tasks.slice(-3);
                setRecentTasks(recent.reverse());
                let latestTask = tasks[tasks.length - 1];
                setLatestTask(latestTask);
            }
    
        }
        catch(error){
            console.log(error);
        }
        
    }
    
    //updateTask
    const updateTask = async (formData) => {
        const config = {
            method : "PATCH",
            headers : {
                "Content-Type":"application/json"
            },
            body : JSON.stringify(formData)
        }
    
        try{
            const response = await fetch(`http://localhost:5000/tasks/${formData.id}`, config);
            if(response.status == 200){
                getTasks(user.id);
                alert("task updated");
            }
            else{
                alert("something went wrong")
            }
        }
        catch(error){
            console.log(error);
        }
    }

    // delete Task

    const deleteTask = async (id) => {
    
        try{
            const response = await fetch(`http://localhost:5000/tasks/${id}`, {method: "DELETE"});
            if(response.status == 200){
                getTasks(user.id);
                alert("task deleted");

            }
            else{
                alert("something went wrong")
            }
        }
        catch(error){
            console.log(error);
        }
    }

    
    useEffect(() => {
        if(user){
            getTasks(user.id)
        }
        
    }, [user])

    return(
        <TaskContext.Provider value = {{
            addTask,
            allTasks,
            latestTask,
            recentTasks,
            updateTask,
            deleteTask
            }}>
            {children}
        </TaskContext.Provider>
    )
}


export default TaskContext;