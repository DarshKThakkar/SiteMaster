import React from 'react';
import TaskDetails from './TaskDetails';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Tasks()
{   

    var [tasks, setTasks] = React.useState([]);

    React.useEffect(() =>
    {
        if(sessionStorage.getItem('userType') === 'owner')
        {
            fetchAllTasks();
            document.getElementById('createTask').style.display = 'inline-block';
        }
        else
        {
            fetchTask();
            document.getElementById('createTask').style.display = "none";
        }

    },[]);

    const createTask = async () => {

        try
        {   
            const prjName = document.getElementById("PrjName").value;
            const company = document.getElementById("Company").value;
            const date = document.getElementById("Date").value;
            const prog = document.getElementById("Prog").value;
            const member = document.getElementById("Member").value;
            const taskName = document.getElementById("taskName").value;

            const response = await axios.post("http://localhost:3001/createTask", {"prjName": prjName, "company": company, "dateAssign": date, "progress": prog, "assignedTo": member, "taskName": taskName}, { headers: { 'Content-Type': 'application/json' } });
            
            if(response.data === 'success')
            {
                document.getElementById("close").click();
                alert("Task Created");
                document.getElementById("Member").value="";
                document.getElementById("taskName").value="";
                fetchAllTasks();
            }
            else
            {
                document.getElementById("close").click();
                alert("Task Creation Failed");
                document.getElementById("Member").value="";
                document.getElementById("taskName").value="";
            }

        }
        catch(error)
        {
            console.log(error);
        }

    };

    const fetchTask = async () => {

        try
        {   
            const response = await axios.get(`http://localhost:3001/tasks/${sessionStorage.getItem('prjName')}/${sessionStorage.getItem('company')}/${sessionStorage.getItem('user')}`);
            setTasks(response.data);
        }
        catch(error)
        {
            console.log(error);
        }

    };

    const getDate = () => {

        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        if(day<10)
        {
            day = "0" + String(day);
        }

        if(month<10)
        {
            month = "0" + String(month);
        }


        // This arrangement can be altered based on how we want the date's format to appear.
        let currentDate = `${day}-${month}-${year}`;
        return currentDate;
    }


    const fetchAllTasks = async () => {

        try
        {   
            const response = await axios.get(`http://localhost:3001/alltasks/${sessionStorage.getItem('prjName')}/${sessionStorage.getItem('company')}`);
            setTasks(response.data);
        }
        catch(error)
        {
            console.log("Error");
        }

    };


    return ( <>
    
    <div id="main">

        <div style={{margin: "30px 0", textAlign: "end"}}>
            <button className="btn btn-secondary" style={{fontSize: "13px"}} data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="createTask">
                <i className="fa-solid fa-plus"></i>&emsp;New Task
            </button>
        </div>

        <div className='row' style={{fontSize: "13px", padding: "0 30px", color: "black", marginBottom: "25px"}}>
            <div className='col-lg-5'>
                Task Name
            </div>
            <div className='col-lg-3'>
                Assigned to
            </div>
            <div className='col-lg-2'>
                Date Created
            </div>
            <div className='col-lg-2'>
                Progress
            </div>
        </div>

        {tasks.map((record,index) => (
        <Link key={index} to={`/taskDetails/${record._id}`} style={{textDecoration: "none", color: "black"}}>
        <div className='row' style={{backgroundColor: "white", marginTop: "20px", padding: "20px", borderRadius: "10px"}}>
            <div className='col-lg-5' style={{display: "grid", alignItems: "center"}}>
                <h6 style={{margin: "0"}}>{record.taskName}</h6>
            </div>
            <div className='col-lg-3' style={{display: "grid", alignItems: "center"}}>
                <span>{record.assignedTo}</span>
            </div>
            <div className='col-lg-2' style={{display: "grid", alignItems: "center"}}>
                <span>{record.dateAssign}</span>
            </div>
            <div className='col-lg-2' style={{display: "grid", alignItems: "center"}}>
                <div className="progress" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                    <div className="progress-bar bg-success" style={{width: record.progress + "%"}}>{record.progress}%</div>
                </div>
            </div>
        </div>
        </Link>
        ))}

        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Create New Task</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="close"></button>
                    </div>
                    <div className="modal-body">

                        <div className="mb-3">
                            <label htmlFor="PrjName" className="form-label">Project Name</label>
                            <input type="text" className="form-control" id="PrjName" value={sessionStorage.getItem('prjName')} disabled/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Company" className="form-label">Company Name</label>
                            <input type="text" className="form-control" id="Company" value={sessionStorage.getItem('company')} disabled/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Date" className="form-label">Date</label>
                            <input type="text" className="form-control" id="Date" value={getDate()} disabled/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Prog" className="form-label">Progress</label>
                            <input type="text" className="form-control" id="Prog" value="0" disabled/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="taskName" className="form-label">Task Name</label>
                            <input type="text" className="form-control" id="taskName" placeholder='Name of the task'/>
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="member" className="form-label">Assigned To</label>
                            <input type="text" className="form-control" id="Member" placeholder="Member Name"/>
                        </div>

                        <div className="mb-3" style={{marginTop: "30px", textAlign: "end"}}>
                            <button className="btn btn-secondary" style={{fontSize: "14px", width: "150px"}} onClick={()=> {createTask();}}>Create</button>
                        </div>

                    </div>
                    
                </div>
            </div> 
        </div>

    </div>
    
    </> );
}

export default Tasks;