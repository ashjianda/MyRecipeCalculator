import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const UserAction = ({ setAuthorized }) => {
    const location = useLocation();
    const [option, setOption] = useState("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");

    useEffect(() => {
        if (location.state.option) {
            setOption(location.state.option);
        }
    }, [location.state]);

    const handleSignup = async () => {
        if (password !== passwordVerify) {
            alert("Passwords do not match");
            return;
        }
        try {
            const response = await fetch('/api/addUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                alert('Signup successful!');
                setAuthorized(true);
                window.location.href = '/';
            } else {
                alert(data.message || 'Signup failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                alert('Login successful!');
                setAuthorized(true);
                window.location.href = '/';
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleReset = () => {

    };

    return (
        <div>
            <style>{`
            .big-header, .header {
                display: none;
            }`}
            </style>

            {option === "login" && (
                <div className='login-page'>
                    <img src={`${process.env.PUBLIC_URL}/pizza.jpg`} alt="pizza" className="login-image"></img>
                    <div className="login-header">
                        <Link className="login-home" to="/"><p>MyRecipeCalculator</p></Link>
                        <div className="login-form">
                            <p className="login-statement">Log in to your account</p>
                            <div className="login-input">
                                <p className="login-labels-email">Email</p>
                                <input className="login-type" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                <div className="password-label">
                                    <p className="login-labels">Password</p>
                                    <Link className="forgot-password" to="/userAction" state={{ option: "reset" }} onClick={() => setOption('reset')}>Reset Password</Link>
                                </div>
                                <input className="login-type" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                <button className="login-submit btn btn-primary" type="submit" onClick={handleLogin}>Login</button>
                                <p className="no-account">Don't have an account? <Link to="/userAction" state={{ option: "signup" }} onClick={() => setOption('signup')}>Sign Up</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {
                option === "signup" && (
                    <div className='login-page'>
                        <div className="login-header">
                            <Link className="login-home" to="/"><p>MyRecipeCalculator</p></Link>
                            <div className="login-form">
                                <p className="login-statement">Create an account</p>
                                <div className="login-input">
                                    <p className="signup-labels">Email</p>
                                    <input className="login-type" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    <p className="signup-labels">Password</p>
                                    <input className="login-type" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    <p className="signup-labels">Confirm Password</p>
                                    <input className="login-type" type="password" value={passwordVerify} onChange={(e) => setPasswordVerify(e.target.value)} required />
                                    <button className="login-submit btn btn-primary" type="submit" onClick={handleSignup}>Sign up</button>
                                    <p className="no-account">Have an account? <Link to="/userAction" state={{ option: "login" }} onClick={() => setOption('login')}>Log In</Link></p>
                                </div>
                            </div>
                            <div className="features-box">
                                <p className="features-statement">Why create an account?</p>
                                <div className="features">
                                    <p>Save Recipes</p>
                                    <span className="divider">|</span>
                                    <p>Add Shopping Lists</p>
                                    <span className="divider">|</span>
                                    <p>Create your Pantry</p>
                                </div>
                            </div>
                        </div>
                        <img src={`${process.env.PUBLIC_URL}/pasta.jpg`} alt="pasta" className="login-image"></img>
                    </div>
                )
            }

            {
                option === "reset" && (
                    <div className='password-page'>
                        <div className="login-header">
                            <Link className="login-home" to="/"><p>MyRecipeCalculator</p></Link>
                            <div className="login-form">
                                <p className="login-statement">Reset your password</p>
                                <div className="login-input">
                                    <p className="signup-labels">Email</p>
                                    <input className="login-type" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    <p className="signup-labels">New Password</p>
                                    <input className="login-type" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    <p className="signup-labels">Confirm New Password</p>
                                    <input className="login-type" type="password" value={passwordVerify} onChange={(e) => setPasswordVerify(e.target.value)} required />
                                    <button className="login-submit btn btn-primary" type="submit" onClick={handleReset}>Submit</button>
                                    <p className="no-account"><Link to="/userAction" state={{ option: "signup" }} onClick={() => setOption('signup')}>Return to log in</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default UserAction;