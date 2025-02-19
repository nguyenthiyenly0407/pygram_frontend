// src/components/Login.js
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Axios from 'axios';
import { useSocket } from './SocketContext';


function Login() {
    const [values, setValues] = useState({
        email: '',
        password: '',
        major: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userName, setuserName] = useState(null);

    const {login} = useSocket();

    const handleInput = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors({}); // Clear previous errors
        try {
            const res = await Axios.post('https://pygram-backend.onrender.com/api/login', values);
            setIsSubmitted(true);
                setUserId(res.data.user.id);
                setuserName(res.data.user.name);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userId', res.data.user.id);
                localStorage.setItem('loggedInUserjj', res.data.user.name);
                const newUser = { id: res.data.userId, name: res.data.userName };
                login({
                    name: res.data.user.name,
                    id: res.data.user.id
                })
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
