import React, { useContext, useEffect, useReducer, useState } from 'react';
import TaskContext from '../context/TaskContext';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons';
import Popup from '../components/Popup';

function TaskList(props) {

    const reducer = (state, action) => {
        switch(action.type) {
            case "VIEW" : return {type : "view", data : action.payload};
            case "EDIT" : return {type : "edit", data : action.payload};
            case "DELETE" : return {type : "delete", data : action.payload};
            default : return state;
        }
    }

    const {allTasks} = useContext(TaskContext);
    const [state, dispatch] = useReducer(reducer, {type : null, data : null});
    const [taskArray, setTaskArray] = useState();

    const handleSearch = (e) => {
        let {value} = e.target;
        const filteredArray = allTasks.filter((task) => (
            task.title.toLowerCase().includes(value.toLowerCase())
        ))
        setTaskArray(filteredArray);
    }

    useEffect(() => {
        setTaskArray(allTasks);
    }, [allTasks])

    return (
        <div className='container'>
            <div className='bg-primary text-white mt-5 p-4'>
                <div className='d-flex mb-3 align-items-center'>
                    <h2 className='text-white'>Tasks List</h2>
                    <Link className='btn btn-info ms-auto' to="/create-task">Create Task</Link>
                </div>
                <div className='py-2'>
                    <input type="text" className='form-control' placeholder='Search Task' onChange={handleSearch} />
                </div>
                <div className='mt-3 p-2 mb-2 bg-dark rounded-1'>
                    <div className='row'>
                        <div className='col-lg-1'>Sr. No.</div>
                        <div className='col-lg-3'>Title</div>
                        <div className='col-lg-4'>Description</div>
                        <div className='col-lg-2'>Due Date</div>
                        <div className='col-lg-2'>Actions</div>
                    </div>
                    {
                        taskArray?
                            taskArray.map((task)=>{
                            return (
                                <div key={task.id} className='row p-2 mb-2 bg-dark rounded-1'>
                                    <div className='col-lg-1'>{task.id}</div>
                                    <div className='col-lg-3'>{task.title}</div>
                                    <div className='col-lg-4'>{task.description}</div>
                                    <div className='col-lg-2'>{task.duedate}</div>
                                    <div className='col-lg-2'>
                                        <span className='px-2' onClick={() => {dispatch({type : "VIEW", payload : task})}} data-bs-toggle="modal" data-bs-target="#taskPopup">
                                            <FontAwesomeIcon icon = {faEye} />
                                        </span>
                                        <span className='px-2' data-bs-toggle="modal" data-bs-target="#taskPopup" onClick={() => {dispatch({type : "EDIT", payload : task})}}>
                                            <FontAwesomeIcon icon = {faPenToSquare} />
                                        </span>
                                        <span className='px-2' data-bs-toggle="modal" data-bs-target="#taskPopup" onClick={() => {dispatch({type : "DELETE", payload : task})}}>
                                            <FontAwesomeIcon icon = {faTrash} />
                                        </span>
                                    </div>
                            </div> 
                            ) 
                        }) : <p>No Task to show</p>
                    }
                </div>
            </div>
            <Popup type = {state.type} data = {state.data}/>
        </div>
    );
}

export default TaskList;