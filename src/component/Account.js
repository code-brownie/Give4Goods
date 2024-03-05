import React, { useState, useContext } from 'react';
import '../style/account.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Account = () => {
    const { handleLogin, handleSignIn, showMessage_success, showMessage_danger } = useContext(AuthContext);
    const Navigate = useNavigate();
    const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);
    const [loading, setLoading] = useState(false);
    // for Registering Details
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // For Login Details
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch('https://give4goods.onrender.com/api/auth/register', {
                // const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });
            const data = await response.json();
            if (data.success) {
                showMessage_success('SignedUp Successfully');
                localStorage.setItem('authToken', data.authToken);
                localStorage.setItem('username', name);
                localStorage.setItem('email', email);
                handleSignIn();
                setEmail('');
                setName('');
                setPassword('');
                Navigate('/products')
            }
        } catch (error) {
            showMessage_danger('Error Occured');
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleLoginsubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch('https://give4goods.onrender.com/api/auth/login', {
                // const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: loginEmail,
                    password: loginPassword,
                }),
            });
            const data = await response.json();
            setLoginEmail('');
            setLoginPassword('');
            if (data.success) {
                showMessage_success('Logged In successfully');
                localStorage.setItem('authToken', data.authToken);
                localStorage.setItem('username', data.username); // Update username
                localStorage.setItem('email', data.email); // Update email
                handleLogin();
                setIsLoginFormVisible(false);
                Navigate('/products')
            } else {
                console.log(data.error);
                showMessage_danger('Invalid details');
            }
        } catch (error) {
            showMessage_danger('Error occured');
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    
    const Register = () => {
        setIsLoginFormVisible(false);
    };

    const Login = () => {
        setIsLoginFormVisible(true);
    };

    return (
        <div className="account-page">
            <div className="Container">
                <div className="Row">
                    <div className="Col-2">
                        <img src="./images/4877806.png" style={{ width: '100%' }} alt="login" />
                    </div>
                    <div className="Col-2">
                        <div className="form-container">
                            <div className="form-btn">
                                <span onClick={Login}>Login</span>
                                <span onClick={Register}>Register</span>
                                <hr id="indicator" style={isLoginFormVisible ? { transform: 'translateX(0px)' } : {}} />
                            </div>
                            {isLoginFormVisible ? (
                                <form id="login_form" onSubmit={handleLoginsubmit}>
                                    <input
                                        type="email"
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                        placeholder="Email"
                                    />
                                    <input
                                        type="password"
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                        placeholder="Password"
                                    />
                                    {loading ? (
                                        <p className='loader-login'><span className="loader"></span></p>
                                    ) : (
                                        <button type="submit" className="btn">
                                            Login
                                        </button>
                                    )}
                                </form>
                            ) : (
                                <form id="register_form" onSubmit={handleSignUp}>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Username"
                                    />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                    />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                    />
                                    {loading ? (
                                        <p className='loader-login'><span className="loader"></span></p>
                                    ) : (
                                        <button type="submit" className="btn">
                                            Register
                                        </button>
                                    )}
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
