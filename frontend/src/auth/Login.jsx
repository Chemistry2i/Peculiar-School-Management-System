import { Link } from "react-router-dom";
import React, { useState } from 'react'
import kyuLogo from '../../src/assets/PS.png';
import './Login.css'


function LoginForm(){
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login submitted');
    };

    return (
        <div className='loginForm'>
            <form onSubmit={handleSubmit} className='form-content'>
                <div className="Kyu">
                    <img src={kyuLogo} alt="" className="KyuLogo" />
                </div>
                <h1>Login Form</h1>
                <div className="login-inputs">

                    <div className="uesr-name">
                        <label htmlFor="username">Username</label>
                        <div className="login-user-wrapper">
                            <i className="fa-solid fa-user"></i>
                            <input type="email" id='username' required placeholder='Username'/>
                        </div>
                    </div>

                    <div className="uesr-name">
                        <label htmlFor="password">Password</label>
                        <div className="login-user-wrapper password-wrapper">
                            <i className="fa-solid fa-lock"></i>
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                id='password'
                                required 
                                placeholder='Password'
                            />
                            <button
                                type="button"
                                className="password-toggle-btn"
                                onClick={() => setShowPassword(!showPassword)}
                                title={showPassword ? 'Hide password' : 'Show password'}
                            >
                                <i className={`fa-solid fa-${showPassword ? 'eye-slash' : 'eye'}`}></i>
                            </button>
                        </div>
                    </div>
                    
                    <button type="submit" className="login-btn">Login</button>
                    <p>Forgot password? <Link to='/forgotPassword' id ="reset" >Click here</Link></p>
                    <p>Don't have account? Contact your Admin.</p>
                </div>
            </form>
        </div>
    );
}

export default LoginForm