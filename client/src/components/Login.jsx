import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './login.css';

const Login = () => {
  const Url = 'http://localhost:8000';
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${Url}/login`, { username, password })
      .then((response) => {
        setToken(response.data.token);
        localStorage.setItem('todoToken', response.data.token);

        alert('Logged in successfully');
        setLoading(false);
        navigate('/get');
      })
      .catch((error) => {
        setLoading(false);
        alert('Invalid credentials');
        console.error('Error logging in:', error);
      });
  };

  useEffect(() => {
    if (localStorage.getItem('todoToken')) {
      navigate('/get');
    }
  }, []);

  return (
    <div>
    <div className='login-container'>Login</div>
    <form method='post' className='smaller-box'>
      <input
        type='text'
        value={username}
        name='username'
        className='input-field'
        onChange={(e) => setUsername(e.target.value)}
        placeholder='Username'
      />
      <input
        type='password'
        value={password}
        name='password'
        className='input-field'
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
      />

      {loading ? (
        <div className='loading-container'>
          <div role='status'>
            <svg
              aria-hidden='true'
              className='w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
             </svg>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      ) : (
        <button type='submit' onClick={handleLogin} className='login-button'>
          Login
        </button>
      )}
    </form>
    <div className='register-text'>
      Don't have an account?
      <span className='register-link' onClick={() => navigate('/register')}>
        Register
      </span>
    </div>
  </div>
  );
};

export default Login;


 

 

 
