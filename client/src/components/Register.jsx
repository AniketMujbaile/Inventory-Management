import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './Register.css';

const Register = () => {
   // const Url = "http://localhost:8000";
    const Url = "https://inventory-management-di5j.onrender.com";

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [disable, setDisable] = useState(false);

    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        setDisable(true);

        if (localStorage.getItem('todoToken')) {
            localStorage.removeItem('todoToken');
        }

        axios.post(`${Url}/register`, { username, password })
            .then((response) => {
                if (response.data.message.code === "ER_DUP_ENTRY") {
                    console.log(response);
                    return alert("User already exists");
                }
                alert("User Registered");
                setDisable(false);
                navigate('/login');
            })
            .catch(error => {
                alert("Error: " + error.message);
                console.error('Error registering user:', error);
            });
    };

    return (
        <div>
            <h1 className="container">Register</h1>
            <form method="post" className="form smaller-box">
                <input
                    type="text"
                    value={username}
                    name="username"
                    className="input"
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Username'
                />
                <input
                    type="password"
                    value={password}
                    name="password"
                    className="input"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                />
                <button
                    type="submit"
                    onClick={handleRegister}
                    className="button"
                    disabled={disable}
                >
                    {disable ? 'Registering...' : "Register"}
                </button>
                <div className="loginText">
                    Already have an account?{' '}
                    <span
                        className="loginLink"
                        onClick={() => navigate('/login')}
                    >
                        Log In
                    </span>
                </div>
            </form>
        </div>
    );
};

export default Register;

 