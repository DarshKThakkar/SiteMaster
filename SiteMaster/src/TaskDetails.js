import React from 'react';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TaskDetails()
{
    const { id } = useParams();
    const navigate = useNavigate();

    var [taskDeatils, setTaskDetails] = React.useState([]);

    React.useEffect(() => {
        fetchDetails();
    },[]);

    const fetchDetails = async () =>
    {
        try
        {
            const response = await axios.get("http://localhost:3001/taskDetails/" + id);
            setTaskDetails(response.data[0]);
            document.getElementById("taskName").value = response.data[0].taskName;
            document.getElementById("taskAssigned").value=response.data[0].assignedTo;
            document.getElementById("taskDate").value=response.data[0].dateAssign;
            document.getElementById("taskProg").value = `${response.data[0].progress}%`;
        }
        catch(err)
        {
            console.log(err);
        }
    };

    const disable = (e) => {

        document.getElementById("taskName").disabled = true;
        document.getElementById("taskAssigned").disabled = true;
        document.getElementById("taskDate").disabled = true;
        document.getElementById("taskProg").disabled = true;
        e.target.style.display = "none";
        document.getElementById("editBtn").style.display = "inline-block";

    };

    const enable = (e) => {

        document.getElementById("taskName").disabled = false;
        document.getElementById("taskAssigned").disabled = false;
        document.getElementById("taskDate").disabled = false;
        document.getElementById("taskProg").disabled = false;
        e.target.style.display = "none";
        document.getElementById("saveBtn").style.display = "inline-block";

    }


    return ( <>
    
    <div>
        <Navbar />
        <div style={{padding: "50px 80px"}}>
            <div className='row'>
                <div className='col-lg-11'>
                    <h3>{taskDeatils.prjName}</h3>
                    <h6 style={{color: "#465A6B", margin: "0"}}>{taskDeatils.company}</h6>
                </div>

                <div className='col-lg-1' style={{display: "grid", alignItems: "center"}}>
                    <button className='btn goBack' onClick={() => {navigate(-1);}}>Go Back</button>
                </div>
            </div>

            <hr style={{marginTop: "30px"}}/>

            <div className="row" style={{marginTop: "30px"}}>
                <div className="mb-3 col-lg-6">
                    <label htmlFor="taskID" className="form-label">Task ID</label>
                    <input type="text" className="form-control" id="taskID" value={taskDeatils._id} disabled/>
                </div>
                <div className="mb-3 col-lg-6">
                    <label htmlFor="taskName" className="form-label">Task Name</label>
                    <input type="text" className="form-control" id="taskName"  disabled/>
                </div>
                <div className="mb-3 col-lg-4">
                    <label htmlFor="taskAssigned" className="form-label">Assigned To</label>
                    <input type="text" className="form-control" id="taskAssigned"  disabled/>
                </div>
                <div className="mb-3 col-lg-4">
                    <label htmlFor="taskDate" className="form-label">Date Assigned</label>
                    <input type="text" className="form-control" id="taskDate" disabled/>
                </div>
                <div className="mb-3 col-lg-4">
                    <label htmlFor="taskProg" className="form-label">Progress</label>
                    <input type="text" className="form-control" id="taskProg" disabled/>
                </div>
            </div>

            <div style={{marginTop: "20px", textAlign: "end"}}>
                <button id="editBtn" className="btn btn-outline-secondary" style={{width: "100px", fontSize: "13px", padding: "5px"}} onClick={enable}>Edit</button>
                <button id="saveBtn" className="btn btn-outline-secondary" style={{width: "100px", fontSize: "13px", padding: "5px", display: "none"}} onClick={disable}>Save</button>
            </div>
            
        </div>

    </div>
    
    </> );
}   

export default TaskDetails;