import React from 'react';
import axios from 'axios';

function Finance()
{

    var [finance, setFinance] = React.useState([]);

    React.useEffect(() =>
    {
        fetchFinance();
    },[]);

    const fetchFinance = async () => {

        try
        {   
            const response = await axios.get(`http://localhost:3001/finance/${sessionStorage.getItem('prjName')}/${sessionStorage.getItem('company')}`);
            console.log(response.data);
            setFinance(response.data);
        }
        catch(error)
        {
            console.log(error);
        }

    }
    
    return ( <>
    
    <div style={{marginTop: "40px"}}>
        <table className="table table-hover" style={{fontSize: "14px"}}>
            <thead>
                <tr style={{}}>
                <th scope="col" style={{backgroundColor: "#576f85", color: "#ecf1fa"}}>Id</th>
                <th scope="col" style={{backgroundColor: "#576f85", color: "#ecf1fa"}}>Date</th>
                <th scope="col" style={{backgroundColor: "#576f85", color: "#ecf1fa"}}>Vendor/Client</th>
                <th scope="col" style={{backgroundColor: "#576f85", color: "#ecf1fa"}}>Amount</th>
                <th scope="col" style={{backgroundColor: "#576f85", color: "#ecf1fa"}}>Payment Method</th>
                <th scope="col" style={{backgroundColor: "#576f85", color: "#ecf1fa"}}>Category</th>
                <th scope="col" style={{backgroundColor: "#576f85", color: "#ecf1fa"}}>Description</th>
                {/* <th scope="col" style={{backgroundColor: "#576f85", color: "#ecf1fa"}}>Action</th> */}
                </tr>
            </thead>
            <tbody>
                {finance.map((record,index) => (
                    <tr key={index}>
                        <td>{record._id}</td>
                        <td>{record.date}</td>
                        <td>{record.vendor}</td>
                        <td>{record.amount}</td>
                        <td>{record.paymentMode}</td>
                        <td>{record.category}</td>
                        <td>{record.Description}</td>
                        {/* <td><span style={{fontSize: "13px", color: "red", fontWeight: "500", cursor: "pointer"}}><i className="fa-regular fa-trash-can"></i>&nbsp; Delete</span></td> */}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    
    </> );
}

export default Finance;