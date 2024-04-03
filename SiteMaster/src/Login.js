import './Login.css';
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {

    localStorage.setItem('loggedIn', "no");
  
    const formRef = React.useRef(null);

    const navigate = useNavigate();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const signIn = () => {

        document.getElementById("login").style.display = "none";
        document.getElementById("signIn").style.display = "block";

    }

    const login = () => {

        document.getElementById("login").style.display = "block";
        document.getElementById("signIn").style.display = "none";

    };

    const clear = () => {
        document.getElementById("email").value="";
        document.getElementById("password").value="";
    }

    const handleRegister = async(event) => {

        event.preventDefault();

        try
        {
            const email = document.getElementById("emailID").value;
            const contactNo = document.getElementById("phone").value;
            const gender = document.getElementById("gender").value;
            const password = document.getElementById("pass").value;
            const fullName = document.getElementById("fName").value;

            if(password === document.getElementById("cnfrmPass").value)
            {
                var response = await axios.post("http://localhost:3001/register", {"email": email, "contactNo": contactNo, "gender": gender, "password": password, "fullName": fullName}, { headers: { 'Content-Type': 'application/json' } });

                if(response.data === 'success')
                {
                    alert("Registered Successfully");
                    navigate("/");
                }
                else
                {
                    alert("Registration Failed");
                }
            }
            else
            {
                alert("Passwords do not match");
            } 

        }
        catch(e)
        {
            console.log(e);
        }
    };

    const handleLogin = async (event) => {

        event.preventDefault();

        try
        {
        if(username !== "" && password !== "")
        {
            var response = await axios.post("http://localhost:3001/users", {"email": username}, { headers: { 'Content-Type': 'application/json' } });
            
            if(response.data.length === 0)
            {
                alert("User not found or Invalid credentials");
                clear();
            }

            if(response.data[0].password === password)
            {
                sessionStorage.setItem("user", response.data[0].fullName);
                localStorage.setItem("loggedIn", "yes");
                navigate("/home");
                clear();
            }
            else
            {
                alert("User not found or Invalid credentials");
                clear();
            }

        }
        }
        catch (error) {
        }
    };

    return (

        <div style={{backgroundImage: `url('background.jpg')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100vh'}}>

        <div className="login" id="login">

            <div style={{textAlign: "center", marginBottom: "40px"}}>
            <h3>Welcome Back!</h3>
            <p style={{color: "gray"}}>Login to continue</p>
            </div>

            <div style={{display: "flex", justifyContent: "center"}}>
            <form onSubmit={handleLogin}>

                <div className="mb-3" style={{display: "flex"}}>
                <input type="email" className="form-control" id="email" placeholder="Enter Email" style={{height: "100%"}} required onChange={(e) => setUsername(e.target.value)}/>
                <div className="login-icons">
                    <i className="fa-solid fa-user fa-xs"></i>
                </div>
                </div>
                
                <div className="mb-3" style={{display: "flex"}}>
                <input type="password" className="form-control" id="password" placeholder="Enter Password" style={{height: "100%"}} required onChange={(e) => setPassword(e.target.value)}/>
                <div className="login-icons">
                    <i className="fa-solid fa-key fa-xs"></i>
                </div>
                </div>

                <p style={{fontSize: "13px", marginTop: "0px", textAlign: "center"}}><a href="/" style={{textDecoration: "none",color: "gray"}}>Recover Password?</a></p>

                <div style={{display: "flex", marginTop: "40px"}}>
                <div style={{width: "50%", textAlign: "center"}}>
                    <button className="btn" type="submit" style={{width: "70%", backgroundColor: "#484887", color: "white"}}>LOGIN</button>
                </div>
                <div style={{width: "50%", textAlign: "center"}}>
                    <span onClick={signIn} className="btn" style={{width: "70%", backgroundColor: "transparent", border: "1px solid #484887", color: "#484887"}}>SIGN UP</span>
                </div>
                </div>

                <div>


                <p style={{fontSize: "14px", color: "gray", margin: "40px 0", textAlign: "center"}}>------------&emsp;Or continue with&emsp;------------</p>

                <div style={{textAlign: "center"}}>
                    <a href="https://www.google.co.in"><img className="icons" src="/Icons/google.png" alt="" width="4%"/></a>
                    <a href="https://www.apple.com"><img className="icons" src="/Icons/apple.png" alt="" width="4%"/></a>
                    <a href="https://www.facebook.com"><img className="icons" src="/Icons/facebook.png" alt="" width="4%"/></a>
                </div>

                </div>

            </form>
            </div>
        </div>

        <div className="login" id="signIn" style={{display: "none"}}>
            <div style={{textAlign: "center", marginBottom: "40px"}}>
                <h3>Let's Get Started!</h3>
                <p style={{color: "gray"}}>Sign Up to Explore</p>
            </div>

            <form style={{width: "100%"}} ref={formRef}>

                <div className="mb-3" style={{display: "flex", width: "100%"}}>
                <div className="input-group" style={{width: "50%"}}>
                    <div className="input-group-text"><i className="fa-solid fa-user fa-xs"></i></div>
                    <input type="text" className="form-control signInput" id="fName" placeholder="Full Name" required/>
                </div>
                
                <div className="input-group" style={{width: "50%"}}>
                    <div className="input-group-text"><i className="fa-solid fa-at fa-xs"></i></div>
                    <input type="text" className="form-control signInput" id="emailID" placeholder="Email Address" required/>
                </div>
                </div>

                <div className="mb-3" style={{display: "flex", width: "100%"}}>
                <div className="input-group" style={{width: "50%"}}>
                    <div className="input-group-text"><i className="fa-solid fa-phone fa-xs"></i></div>
                    <input type="number" className="form-control signInput" id="phone" placeholder="Contact Number" required/>
                </div>
                <div className="input-group" style={{width: "48%"}}>
                    <div className="input-group-text"><i className="fa-solid fa-venus-mars fa-xs"></i></div>
                    <select className="form-select" aria-label="Default select example" id="gender">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                </div>
                </div>

                <div className="mb-3" style={{display: "flex", width: "100%"}}>
                    <div className="input-group" style={{width: "50%"}}>
                        <div className="input-group-text"><i className="fa-solid fa-key fa-xs"></i></div>
                        <input type="password" className="form-control signInput" id="pass" placeholder="Enter Password" required/>
                    </div>
                    
                    <div className="input-group" style={{width: "50%"}}>
                        <div className="input-group-text"><i className="fa-solid fa-key fa-xs"></i></div>
                        <input type="password" className="form-control signInput" id="cnfrmPass" placeholder="Repeat Password" required/>
                    </div>
                </div>

                <div className="form-check" style={{padding: "10px 0 10px 25px"}}>
                <input className="form-check-input" type="checkbox" value="" id="termsCond" required/>
                <label className="form-check-label" htmlFor="terms&cond" style={{fontSize: "13px"}}>
                    By ticking, you are confirming that you have read, understood and agree to Site Master <span data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{cursor: "pointer", textDecoration: "underline"}}><b>terms and conditions</b></span>.
                </label>
                </div>

                <div style={{display: "flex", marginTop: "40px"}}>
                <div style={{width: "50%", textAlign: "center"}}>
                    <button className="btn" type="submit" style={{width: "70%", backgroundColor: "#484887", color: "white"}} onClick={handleRegister}>SIGN UP</button>
                </div>
                <div style={{width: "50%", textAlign: "center"}}>
                    <span onClick={login} className="btn" style={{width: "70%", backgroundColor: "transparent", border: "1px solid #484887", color: "#484887"}}>LOGIN</span>
                </div>
                </div>

            </form>
        </div>

        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Terms and Conditions</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body" style={{ height: "660px", overflowY: "scroll", textAlign: "justify", padding: "20px"}}>

                    <p>These terms and conditions ("Terms", "Agreement") are an agreement between Site Master ("Site Master", "us", "we" or "our") and you ("User", "you" or "your"). This Agreement sets forth the general terms and conditions of your use of the Site Master website and any of its products or services (collectively, "Website" or "Services").</p>

                    <p><b>1. Accounts and Membership</b></p>
                    <p>1.1. You must be at least 18 years of age to use this Website. By using this Website and by agreeing to this Agreement, you warrant and represent that you are at least 18 years of age.</p>
                    <p>1.2. If you create an account on the Website, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it.</p>
                    <p>1.3. We may, but have no obligation to, monitor and review new accounts before you may sign in and use our Services. Providing false contact information of any kind may result in the termination of your account.</p>

                    <p><b>2. Intellectual Property</b></p>
                    <p>2.1. The Website and its original content, features, and functionality are owned by Site Master and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
                    <p>2.2. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Website and its content without express written permission by us.</p>


                    <p><b>3. User Content</b></p>

                    <p>3.1. "User Content" means any and all information and content that a user submits to the Site Master Website. You are solely responsible for your User Content.</p>

                    <p>3.2. You agree that you are solely responsible for your User Content and the consequences of posting or publishing it.</p>

                    <p>3.3. By posting or publishing your User Content on the Website, you affirm, represent, and warrant that you own or have the necessary licenses, rights, consents, and permissions to publish that User Content.</p>


                    <p><b>4. Prohibited Uses</b></p>

                    <p>4.1. You may use the Website only for lawful purposes and in accordance with these Terms. You agree not to use the Website:</p>
                    <div style={{paddingLeft: "30px"}}>
                    <p>a. In any way that violates any applicable national or international law or regulation.</p>
                    <p>b. To exploit, harm, or attempt to exploit or harm minors in any way by exposing them to inappropriate content or otherwise.</p>
                    <p>c. To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Website.</p>
                    </div>


                    <p><b>5. Termination</b></p>

                    <p>5.1. We may terminate or suspend your account and bar access to the Website immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.</p>

                    <p>5.2. If you wish to terminate your account, you may simply discontinue using the Website.</p>


                    <p><b>6. Governing Law</b></p>

                    <p>6.1. These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>


                    <p><b>7. Changes to This Agreement</b></p>

                    <p>7.1. We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>


                    <p><b>8. Contact Us</b></p>

                    <p>8.1. If you have any questions about this Agreement, please contact us.</p>

                    </div> 
                </div>
            </div> 
        </div>

        </div>
        
    );
}

export default Login;
