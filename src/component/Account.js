import React, { useState, useContext } from 'react';
import '../style/account.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Account = () => {
    const { handleLogin, handleSignIn, showMessage_success, showMessage_danger } = useContext(AuthContext);
    const Navigate = useNavigate();
    const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);
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
            const response = await fetch('http://localhost:5000/api/auth/register', {
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
                handleSignIn();
                setEmail('');
                setName('');
                setPassword('');
                Navigate('/products')
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleLoginsubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
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
                handleLogin();
                setIsLoginFormVisible(false);
                Navigate('/products');
                localStorage.setItem('authToken', data.authToken);
            } else {
                console.log(data.error);
                showMessage_danger('Invalid details');
            }
        } catch (error) {
            console.log(error);
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
                                    <button type="submit" className="btn">
                                        Login
                                    </button>
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
                                    <button type="submit" className="btn">
                                        Register
                                    </button>
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
