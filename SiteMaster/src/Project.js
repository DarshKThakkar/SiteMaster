import React from 'react';
import "./Project.css";
import Tasks from './Tasks';
import Finance from './Finance';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Project()
{   
    const navigate = useNavigate();

    const { prjName, company, prjManager } = useParams();

    sessionStorage.setItem("prjName", prjName);
    sessionStorage.setItem("company", company);
    sessionStorage.setItem("prjManager", prjManager);

    const [selectedOption, setSelectedOption] = React.useState('');

    React.useEffect(() => {
        setSelectedOption(<Tasks/>);

        if(prjManager === sessionStorage.getItem('user'))
        {
            document.getElementById('options').style.display = 'inline-block';
            sessionStorage.setItem('userType','owner');
        }
        else
        {
            document.getElementById('options').style.display = 'none';
            sessionStorage.setItem('userType','member');
        }
        
      },[]);

    
    // Function to handle dropdown change
    const handleDropdownChange = (event) => {

        switch (event.target.value)
        {
            case "Tasks":
                setSelectedOption(<Tasks/>);
                break;

            case "Budget & Finance":
                setSelectedOption(<Finance/>);
                break;
            case "Project Info":
                setSelectedOption(<Tasks/>);
              break;

            default:
        }
    };
    return ( <>

    <Navbar/>

    <div style={{padding: "50px 80px"}}>

        <div className='row'>
            <div className='col-lg-9'>
                <h3>{prjName}</h3>
                <h6 style={{color: "#465A6B", margin: "0"}}>{company}</h6>
            </div>

            <div className="col-lg-2" style={{display: "grid", alignItems: "center"}}>
                <select className="form-select" aria-label="Default select example" onChange={handleDropdownChange} id='options'>
                    <option value="Tasks">Tasks</option>
                    <option value="Budget & Finance">Budget & Finance</option>
                    <option value="Project Info">Project Info</option>
                </select>
            </div>
            <div className='col-lg-1' style={{display: "grid", alignItems: "center"}}>
                <button className='btn goBack' onClick={() => {navigate("/home");}}>Go Back</button>
            </div>
        </div>


        <hr style={{marginTop: "30px"}}/>

        {selectedOption}

    </div>
    
    

    </> );
}

export default Project;