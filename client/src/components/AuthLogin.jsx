import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',
}

const AuthLogin = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(true);

    const formChangeHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, password, phoneNumber, avatarURL } = form;

        const URL = 'https://astronomy-chat.herokuapp.com/auth';

        const { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
            username, 
            password, 
            fullName: form.fullName, 
            phoneNumber, 
            avatarURL,
        });

        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);

        if(isSignup) {
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('avatarURL', avatarURL);
            cookies.set('hashedPassword', hashedPassword);
        }

        window.location.reload();
    }

    const SwitchView = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

    return (
        <div className="auth-login-container">
            <div className="auth-login-container-inputs">
                <div className="auth-login-container-inputs-content">
                    <p>Astronomy Chat App</p>
                    <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
                    <form onSubmit={handleSubmit} style={{ maxWidth: '620px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {isSignup && (
                            <div className="auth-login-container-inputs-content_input">
                                <label htmlFor="fullName">Full Name</label>
                                <input 
                                    style={{ width: '100%' }}
                                    name="fullName" 
                                    type="text"
                                    placeholder="Full Name"
                                    onChange={formChangeHandler}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth-login-container-inputs-content_input">
                            <label htmlFor="username">Username</label>
                                <input 
                                    id='username-input'
                                    style={{ width: '100%' }}
                                    name="username" 
                                    type="text"
                                    placeholder="Username"
                                    onChange={formChangeHandler}
                                    required
                                />
                            </div>
                        {isSignup && (
                            <div className="auth-login-container-inputs-content_input">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input 
                                  style={{ width: '100%' }}
                                    name="phoneNumber" 
                                    type="text"
                                    placeholder="Phone Number"
                                    onChange={formChangeHandler}
                                    required
                                />
                            </div>
                        )}
                        {isSignup && (
                            <div className="auth-login-container-inputs-content_input">
                                <label htmlFor="avatarURL">Avatar URL</label>
                                <input 
                                    style={{ width: '100%' }}
                                    name="avatarURL" 
                                    type="text"
                                    placeholder="Avatar URL"
                                    onChange={formChangeHandler}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth-login-container-inputs-content_input">
                                <label htmlFor="password">Password</label>
                                <input 
                                    id='pass-input'
                                    style={{ width: '100%' }}
                                    name="password" 
                                    type="password"
                                    placeholder="Password"
                                    onChange={formChangeHandler}
                                    required
                                />
                            </div>
                        {isSignup && (
                            <div className="auth-login-container-inputs-content_input">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input 
                                    style={{ width: '100%' }}
                                    name="confirmPassword" 
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={formChangeHandler}
                                    required
                                />
                            </div>
                            )}
                        <div className="auth-login-container-inputs-content_button">
                            <button style={{ backgroundColor: '#6c6bac', border: 'none' }}>{isSignup ? "Sign up" : "Sign in"}</button>
                        </div>
                    </form>
                    <div className="auth-login-container-inputs-content_button">
                            <button style={{ backgroundColor: '#966887', border: 'none' }} onClick={() => {
                                //used only for demo purposes
                                SwitchView();
                                setForm({
                                    fullName: '',
                                    username: 'JanezTest',
                                    password: 'test',
                                    confirmPassword: '',
                                    phoneNumber: '',
                                    avatarURL: '',
                                });
                                document.getElementById('username-input').value = 'JanezTest';
                                document.getElementById('pass-input').value = 'test';
                            }}>
                                Demo User
                            </button>
                        </div>
                    <div className="auth-login-container-inputs-account">
                        <p>
                            {isSignup
                             ? "Have you already created an account?" 
                             : "I don't have an account!"
                             }
                             <span onClick={SwitchView}>
                             {isSignup ? ' Sign in' : ' Sign up'}
                             </span>
                        </p>
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default AuthLogin;
