import React from "react";
import { Link } from "react-router-dom";
import './ResetPassword.css'
import kyuLogo from '/src/assets/images-removebg-preview.png'

function ResetPassword (){
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Reset password submitted');
    };

    return(
        <div className="reset-container">
            <form onSubmit={handleSubmit} className="reset-content">
                
                <div className="Kyu">
                    <img src={kyuLogo} alt="" className="KyuLogo" />
                </div>
                <div>
                    <div className="reset-inputs">
                        <label htmlFor="newPassword">New password</label>
                        <div className="reset-wrapper password-wrapper">
                            <i className="fa-solid fa-lock"></i>
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                id="newPassword" 
                                placeholder="New password" 
                                required 
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
                    <div className="reset-inputs">
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <div className="reset-wrapper password-wrapper">
                            <i className="fa-solid fa-lock"></i>
                            <input 
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword" 
                                placeholder="Confirm password" 
                                required 
                            />
                            <button
                                type="button"
                                className="password-toggle-btn"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                title={showConfirmPassword ? 'Hide password' : 'Show password'}
                            >
                                <i className={`fa-solid fa-${showConfirmPassword ? 'eye-slash' : 'eye'}`}></i>
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="reset-btn">Reset Password</button>
                    <p>Remembered your password? <Link to='/login' id="press">Login</Link></p>
                </div>
            </form>
        </div>
    )
}
export default ResetPassword;