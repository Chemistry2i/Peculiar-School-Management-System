import React, { useState } from "react";
import { Link } from "react-router-dom";
import './ForgotPassword.css'
import kyuLogo from '/src/assets/images-removebg-preview.png'


function ForgotPassword (){
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");
        setMessage("");

        try {
            const response = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to process request");
            }

            setMessage("Password reset link has been sent to your email.");
        } catch (err) {
            setError(err.message || "An error occurred");
        } finally {
            setSubmitting(false);
        }
    };

    return(
        <div className="forgot-container">
            <form onSubmit={handleSubmit} className="forgot-content">
                <div className="Kyu">
                    <img src={kyuLogo} alt="" className="KyuLogo" />
                </div>
                <h1>Forgot Password</h1>
                
                {message && <div style={{color: 'green', padding: '10px'}}>{message}</div>}
                {error && <div style={{color: 'red', padding: '10px'}}>{error}</div>}

                <div className="forgot-inputs">

                    <div className="forgot-data">
                        <label htmlFor="email">Email</label>
                        <div className="input-wrapper">
                            <i className="fa-solid fa-envelope left"></i>
                            <span className="divider"></span>
                            <input 
                                type="email" 
                                id="email" 
                                placeholder="Email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="forgot-btn">
                        <button type="submit" disabled={submitting}>
                            {submitting ? "Sending..." : "Send Link"}
                        </button>
                    </div>
                    <p>Then proceed to reset,<Link to='/resetpassword' id="proceed">Reset</Link></p>
                </div>
            </form>
        </div>
    )
}
export default ForgotPassword;