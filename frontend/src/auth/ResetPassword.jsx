import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import './ResetPassword.css'
import kyuLogo from '/src/assets/images-removebg-preview.png'



function ResetPassword (){
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!token) {
            setError("Invalid or missing reset token.");
            return;
        }

        setSubmitting(true);

        try {
            const response = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token, newPassword: password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to reset password");
            }

            setMessage("Password reset successfully. Redirecting to login...");
            setTimeout(() => navigate("/login"), 3000);

        } catch (err) {
            setError(err.message || "An error occurred");
        } finally {
            setSubmitting(false);
        }
    };

    return(
        <div className="reset-container">
            <form onSubmit={handleSubmit} className="reset-content">
                
                <div className="Kyu">
                    <img src={kyuLogo} alt="" className="KyuLogo" />
                </div>
                <div>
                    <h1>Reset Password</h1>
                    {message && <div style={{color: 'green', padding: '10px'}}>{message}</div>}
                    {error && <div style={{color: 'red', padding: '10px'}}>{error}</div>}

                    <div className="reset-inputs">
                        <label htmlFor="new-password">New password</label>
                        <div className="reset-wrapper">
                            <i className="fa-solid fa-lock"></i>
                            <input 
                                type="password" 
                                id="new-password" 
                                placeholder="New password" 
                                required 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="reset-inputs">
                        <label htmlFor="confirm-password">Confirm password</label>
                        <div className="reset-wrapper">
                            <i className="fa-solid fa-lock"></i>
                            <input 
                                type="password"  
                                id="confirm-password" 
                                placeholder="Confirm password" 
                                required 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <button type="submit" className="custom-reset-btn" disabled={submitting} style={{marginTop: '20px', width: '100%', padding: '10px'}}>
                        {submitting ? "Resetting..." : "Reset Password"}
                    </button>

                    <p>Proceed to,<Link to='/login' id="press">Login</Link></p>
                </div>
            </form>
        </div>
    )
}
export default ResetPassword;