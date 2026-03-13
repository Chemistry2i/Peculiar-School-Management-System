import { Link } from "react-router-dom";
import React from 'react'
import kyuLogo from '/src/assets/images-removebg-preview.png'
import './Login.css'


function LoginForm(){
    return (
        <div className='loginForm'>
            <form action="post" className='form-content'>
                <div className="Kyu">
                    <img src={kyuLogo} alt="" className="KyuLogo" />
                </div>
                <h1>Login Form</h1>
                <div className="login-inputs">

                    <div className="uesr-name">
                        <label htmlFor="username">Username</label>
                        <div className="login-user-wrapper">
                            <i class="fa-solid fa-user"></i>
                            <input type="email" id='username' required placeholder='Username'/>
                        </div>
                    </div>

                    <div className="uesr-name">
                        <label htmlFor="password">Password</label>
                        <div className="login-user-wrapper">
                            <i class="fa-solid fa-lock"></i>
                            <input type="password" id='password'required placeholder='Password'/>
                        </div>
                    </div>
                    
                    <button className="login-btn">Login</button>
                    <p>Forgot password? <Link to='/forgotPassword' id ="reset" >Click here</Link></p>
                    <p>Don't have account?<Link to='/student/Reg' id="reset">Register</Link></p>
                </div>
            </form>
        </div>
    );
}

export default LoginForm