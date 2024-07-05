// src/components/Login.js
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Axios from 'axios';
import { io } from 'socket.io-client';
import './Login.css';

function Login({ isSignInPage = true }) {
    const [values, setValues] = useState({
        email: '',
        password: '',
        major: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [userId, setUserId] = useState(null);
    const socket = io('http://localhost:5000');

    const handleInput = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors({}); // Clear previous errors
        try {
            const res = await Axios.post('http://localhost:5000/api/login', values);
            if (res.data.token) {
                setIsSubmitted(true);
                setUserId(res.data.user.id);
                const user = { ...res.data.user, major: values.major }; // Ensure major is stored
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(user));
                socket.emit('userLoggedIn', { userId: res.data.user.id, userName: res.data.user.name });
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrors({ credentials: 'Invalid email or password' });
            } else {
                console.error('Error logging in:', error);
            }
        }
    };

    if (isSubmitted) {
        return <Redirect to={`/home/${userId}`} />;
    }

    return (
        <div className='container-fluid'>
            <form className="mx-auto" onSubmit={handleSubmit}>
                <h4 className="text-center">Login</h4>
                {errors.credentials && <div className='alert alert-danger'>{errors.credentials}</div>}
                <div className='mb-3 mt-5'>
                    <label htmlFor='email' className="form-label">Email</label>
                    <input
                        type='email'
                        placeholder='Enter Email'
                        name='email'
                        onChange={handleInput}
                        className='form-control'
                        id="exampleInputEmail1"
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='password' className="form-label">Password</label>
                    <input
                        type='password'
                        placeholder='Enter Password'
                        name='password'
                        onChange={handleInput}
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='major' className="form-label">Major</label>
                    <select
                        name='major'
                        onChange={handleInput}
                        className='form-control rounded-0'
                    >
                        <option value=''>Select Major</option>
                        <option value='Student'>Student</option>
                        <option value='Teacher'>Teacher</option>
                    </select>
                </div>
                <button type='submit' className='btn btn-primary mt-5'><strong>Log in</strong></button>
                <p></p>
                <Link to='/signup' className='btn btn-default border w-100 text-decoration-none'>Create Account</Link>
            </form>
        </div>
    );
}

export default Login;
