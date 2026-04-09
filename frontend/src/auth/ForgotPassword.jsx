import React from "react";
import { Link } from "react-router-dom";
import './ForgotPassword.css'
import kyuLogo from '../../src/assets/PS.png';


function ForgotPassword (){
    return(
        <div className="forgot-container">
            <form action="post" className="forgot-content">
                <div className="Kyu">
                    <img src={kyuLogo} alt="" className="KyuLogo" />
                </div>
                <h1>Forgot Password</h1>
                <div className="forgot-inputs">

                    <div className="forgot-data">
                        <label htmlFor="email">Email</label>
                        <div className="input-wrapper">
                            <i class="fa-solid fa-envelope left"></i>
                            <span className="divider"></span>
                            <input type="email" id="email" placeholder="Email" required/>
                        </div>
                    </div>
                    <div className="forgot-btn">
                        <button>SendLink</button>
                    </div>
                    <p>Remembered my Password? <Link to='/login' id="proceed">Login</Link></p>
                </div>
            </form>
        </div>
    )
}
export default ForgotPassword;