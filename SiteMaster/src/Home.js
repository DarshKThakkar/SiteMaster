import React from 'react';
import "./Home.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function Home()
{

    var [projects, setProjects] = React.useState([]);

    React.useEffect(() => {
        fetchProjects();
    },[]);

    const fetchProjects = async () => {

        try
        {
            const response = await axios.get(`http://localhost:3001/projects/${sessionStorage.getItem("user")}`);
            setProjects(response.data);

            if((response.data).length === 0)
            {
                document.getElementById("notFound").style.display = "inline-block";
            }

            else
            {
                document.getElementById("notFound").style.display = "none";
            }
        }
        catch(e)
        {
            console.log(e);
        }
    };

    const clearFilters = () => {

        const elements = document.querySelectorAll('.homeBtn');

        elements.forEach(element => {
            element.style.backgroundColor = 'white';
            element.style.color = "#465A6B"; // Replace propertyName and value with the style you want to apply
        });

        fetchProjects();

    };

    const applyFilter = async (e) => {

        try
        {
            console.log(e.target.innerHTML);
            const response = await axios.get(`http://localhost:3001/filters/${e.target.innerHTML}`);
            setProjects(response.data);

            const elements = document.querySelectorAll('.homeBtn');

            elements.forEach(element => {
                element.style.backgroundColor = 'white';
                element.style.color = "#465A6B"; // Replace propertyName and value with the style you want to apply
              });

            e.target.style.backgroundColor = '#465A6B';
            e.target.style.color = "white";

            if((response.data).length === 0)
            {
                document.getElementById("notFound").style.display = "inline-block";
            }

            else
            {
                document.getElementById("notFound").style.display = "none";
            }

        }
        catch(e)
        {
            console.log(e);
        }
    };

    const createProject = async () => {

        try
        {   
            const prjName = document.getElementById("PrjName").value;
            const company = document.getElementById("Company").value;
            const prjManager = document.getElementById("prjManager").value;
            const status = document.getElementById("status").value;
            const startDate = document.getElementById("startDate").value;
            const dueDate = document.getElementById("dueDate").value;

            const response = await axios.post("http://localhost:3001/createProject", {"prjName": prjName, "company": company, "status": status, "startDate": startDate, "dueDate": dueDate, "prjManager": prjManager, "members": [sessionStorage.getItem("user")]}, { headers: { 'Content-Type': 'application/json' } });
            
            if(response.data === 'success')
            {
                document.getElementById("close").click();
                alert("Project Created");
                
                document.getElementById("PrjName").value = "";
                document.getElementById("Company").value = "";
                document.getElementById("startDate").value = "";
                document.getElementById("dueDate").value = "";
                
                fetchProjects();
            }
            else
            {
                document.getElementById("close").click();
                alert("Project Creation Failed");
                
                document.getElementById("PrjName").value = "";
                document.getElementById("Company").value = "";
                document.getElementById("startDate").value = "";
                document.getElementById("dueDate").value = "";
            }

        }
        catch(error)
        {
            console.log(error);
        }
    };

    return ( <>
    
    <Navbar/>

    <div id="notFound" style={{textAlign: "center", position: "absolute", top: "50%", width: "100%"}}>
        <img src="/Icons/notFound.png" alt="icon" width="7%" style={{ opacity: "80%"}}/>
        <h5 style={{color: "#465A6B"}}>There are no projects yet.</h5>
    </div>


    <div style={{padding: "50px 80px"}}>

        <div>
            <span style={{marginRight: "20px", color: "#454545"}}>Filter by</span>

            <button className='btn homeBtn' id="inProg" style={{border: "1px solid #465A6B", color: "#465A6B", backgroundColor: "white"}} onClick={applyFilter}>
                In Progress 
            </button>
            <button className='btn homeBtn' id="complete" style={{border: "1px solid #465A6B", color: "#465A6B", backgroundColor: "white"}} onClick={applyFilter}>
                Completed 
            </button>
            <button className='btn homeBtn' id="cancel" style={{border: "1px solid #465A6B", color: "#465A6B", backgroundColor: "white"}} onClick={applyFilter}>
                Cancelled 
            </button>
            <button className='btn' id="clearFilters" onClick={clearFilters}>
                <i className="fa-solid fa-x fa-2xs"></i>
            </button>

            <button className='btn' id="newPrj" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <i className="fa-solid fa-plus fa-sm"></i>&nbsp; CREATE NEW PROJECT
            </button>
        </div>

        <hr style={{marginTop: "40px"}}/>

        <div className='row' style={{fontSize: "13px", padding: "0 30px", color: "black"}}>
            <div className='col-lg-4'>
                Project Name
            </div>
            <div className='col-lg-2'>
                Project Manager
            </div>
            <div className='col-lg-2'>
                Status
            </div>
            <div className='col-lg-2'>
                Start Date
            </div>
            <div className='col-lg-2'>
                Due Date
            </div>
        </div>


        {projects.map((record,index) => (

            <Link key={index} to={`/project/${record.prjName}/${record.company}/${record.prjManager}`} style={{textDecoration: "none"}}>
                <div className='row' style={{backgroundColor: "white", margin: "25px 0", padding: "20px", borderRadius: "10px"}}>
                
                    <div className='col-lg-4' style={{display: "grid", alignItems: "center"}}>
                        <h5 style={{color: "#333333"}}>{record.prjName}</h5>
                        <span className="prjTxt" style={{fontSize: "12px"}}>{record.company}</span>
                    </div>
                    <div className='col-lg-2' style={{display: "grid", alignItems: "center"}}>
                        <span className="prjTxt">{record.prjManager}</span>
                    </div>
                    <div className='col-lg-2' style={{display: "grid", alignItems: "center"}}>
                        <span className="prjTxt">{record.status}</span>
                    </div>
                    <div className='col-lg-2' style={{display: "grid", alignItems: "center"}}>
                        <span className="prjTxt">{record.startDate}</span>
                    </div>
                    <div className='col-lg-2' style={{display: "grid", alignItems: "center"}}>
                        <span className="prjTxt">{record.dueDate}</span>
                    </div>
                </div>
            </Link>

        ))}

<       div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Create New Project</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="close"></button>
                    </div>
                    <div className="modal-body">

                        <div className="mb-3">
                            <label htmlFor="PrjName" className="form-label">Project Name</label>
                            <input type="text" className="form-control" id="PrjName"/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Company" className="form-label">Company Name</label>
                            <input type="text" className="form-control" id="Company"/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="prjManager" className="form-label">Project Manager</label>
                            <input type="text" className="form-control" id="prjManager" value={sessionStorage.getItem('user')} disabled/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">Status</label>
                            <select class="form-select" aria-label="Default select example" id="status">
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="startDate" className="form-label">Start Date</label>
                            <input type="text" className="form-control" id="startDate" placeholder='dd-mm-yyyy'/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="dueDate" className="form-label">Due Date</label>
                            <input type="text" className="form-control" id="dueDate" placeholder='dd-mm-yyyy'/>
                        </div>

                        <div className="mb-3" style={{marginTop: "30px", textAlign: "end"}}>
                            <button className="btn btn-secondary" style={{fontSize: "14px", width: "150px"}} onClick={()=> {createProject();}}>Create</button>
                        </div>

                    </div>
                    
                </div>
            </div> 
        </div>

    </div>
    
    

    </> );
}

export default Home;