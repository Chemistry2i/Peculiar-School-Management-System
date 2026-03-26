import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import kyuLogo from "/src/assets/images-removebg-preview.png";
import "./Login.css";

function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            let data = null;
            const contentType = response.headers.get("content-type") || "";

            if (contentType.includes("application/json")) {
                data = await response.json();
            } else {
                const text = await response.text();
                data = text ? { message: text } : {};
            }

            if (!response.ok) {
                throw new Error(data?.message || `Login failed (${response.status})`);
            }

            const token =
                data?.token ||
                data?.accessToken ||
                data?.jwt ||
                data?.data?.token;

            if (!token) {
                throw new Error("No token returned from server");
            }

            localStorage.setItem("authToken", token);

            if (data?.user) {
                localStorage.setItem("authUser", JSON.stringify(data.user));
            }

            navigate("/");
        } catch (err) {
            setError(err?.message || "Unable to login");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="loginForm">
            <form onSubmit={handleLogin} className="form-content">
                <div className="Kyu">
                    <img src={kyuLogo} alt="School logo" className="KyuLogo" />
                </div>
                <h1>Login Form</h1>
                <div className="login-inputs">
                    <div className="uesr-name">
                        <label htmlFor="username">Username</label>
                        <div className="login-user-wrapper">
                            <i className="fa-solid fa-user"></i>
                            <input
                                type="email"
                                id="username"
                                required
                                placeholder="Username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="uesr-name">
                        <label htmlFor="password">Password</label>
                        <div className="login-user-wrapper">
                            <i className="fa-solid fa-lock"></i>
                            <input
                                type="password"
                                id="password"
                                required
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error ? <p style={{ color: "red" }}>{error}</p> : null}

                    <button className="login-btn" type="submit" disabled={submitting}>
                        {submitting ? "Logging in..." : "Login"}
                    </button>

                    <p>
                        Forgot password? <Link to="/forgotPassword" id="reset">Click here</Link>
                    </p>
                    <p>
                        Don&apos;t have account?<Link to="/student/Reg" id="reset">Register</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;