import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import TaskContext from '../context/TaskContext';
import AuthContext from '../auth/AuthContext';


function TaskForm(props) {
    const init = {
        title : "",
        description : "",
        duedate : ""
    }
    const {addTask, updateTask} = useContext(TaskContext);
    const {user} = useContext(AuthContext);
    const[formData, setFormData] = useState(init);

    const {isUpdate, data, setIsUpdate, isPopup, closeBtn} = props;

    const handleChange = (e) => {
        let {name, value} = e.target;
        setFormData((prev) => {
            return{
                ...prev, [name] : value, userid : user.id, modifiedon : Date()
            }
        })
    }

    const handleSubmit = () => {
        addTask(formData);
    }

    const handleUpdate = () => {
        updateTask(formData);
    }

    const handleCancel = () => {
        if(!isPopup){
            setIsUpdate(false);
            setFormData(init);
        }
        else{
            closeBtn.current.click()
        }
        
    }

    useEffect(() => {
        if(isUpdate && data){
            setFormData(data);
        }
    }, [isUpdate, data])
    return (
        <div className='py-3'>
            <h2 className='text-white'>{isUpdate ? "Update Task" : "Create Task"}</h2>
            <div className='card p-3'>
                <div className='mb-3'>
                    <label htmlFor="form-label">Title</label>
                    <input type="text" name='title' className='form-control' value={formData.title} onChange={handleChange}/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="form-label">Description</label>
                    <input type="text" name='description' className='form-control' value={formData.description} onChange={handleChange}/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="form-label">Due Date</label>
                    <input type="datetime-local" name='duedate' className='form-control' value={formData.duedate} onChange={handleChange}/>
                </div>
                <div className='mb-3'>
                    {
                        isUpdate ?
                        <>
                            <button onClick={handleUpdate} className='btn btn-primary'>Update Task</button>
                            <button onClick={handleCancel} className='btn btn-warning ms-2'>Cancel</button>
                        </>
                        :
                        <button className='btn btn-primary' onClick={handleSubmit}>Create Task</button>
                    }
                    
                </div>
            </div>
        </div>
    );
}

export default TaskForm;