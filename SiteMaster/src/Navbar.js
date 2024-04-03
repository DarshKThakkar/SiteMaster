import React from 'react';

function Navbar()
{

    const logout = () => {
        sessionStorage.clear();
        window.location.href = "/";
    };
    return ( <>

    <nav className="navbar navbar-expand-lg" style={{backgroundColor: "#ffffff", boxShadow: "0px 0px 25px #454545"}}>
        <div className="container-fluid" style={{padding: "0px 30px"}}>
            <a className="navbar-brand" href="/">Navbar</a>



            <div style={{width: "4%", textAlign: "end"}}>
                <img src="/Icons/user.png" alt="" width="50%" onClick={logout} style={{cursor: "pointer"}}/>
            </div>
        </div>
    </nav>
    
    </> );
}

export default Navbar;