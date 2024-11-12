import React, { useContext, useRef } from 'react';
import { changeDateFormat } from '../helper';
import TaskForm from './TaskForm';
import TaskContext from '../context/TaskContext';

function Popup(props) {
    const {deleteTask} = useContext(TaskContext);
    const {type, data} = props;
    const closeBtn = useRef(null)
    return (
        <div className="modal" tabIndex="-1" id="taskPopup">
            <div className="modal-dialog">
                <div className="modal-content bg-primary text-white">
                <div class="modal-header" data-bs-theme="dark">
                    <button ref={closeBtn} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>      
                    <div className="modal-body">
                        {
                            type === "view" ?
                            <div className='py-2'>
                                <div className='py-2'>
                                    <h2>{data.title}</h2>
                                    <p>{data.description}</p>
                                </div>
                                <div className='d-flex align-item-center'>
                                    <p>Modified On : {changeDateFormat(data.modifiedon)}</p>
                                    <p className='ms-auto'>Due On : {changeDateFormat(data.duedate)}</p>
                                </div>
                            </div>
                                : type === "edit" ?
                                    <TaskForm  isUpdate={true} data={data} isPopup = {true} closeBtn={closeBtn}/>
                                    :
                                    <div className='p-2'>
                                        <p>Are you Sure? You want to delete the task?</p>
                                        <div className='d-flex align-items-center'>
                                            <button className='btn btn-danger ms-auto' onClick={() => {deleteTask(data.id)}}>Yes</button>
                                            <button className='btn btn-warning ms-2' data-bs-dismiss="modal">No</button>
                                        </div>
                                    </div>
                            }
                    </div>       
                </div>
            </div>
        </div>
    );
}

export default Popup;