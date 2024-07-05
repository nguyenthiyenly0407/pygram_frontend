import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import Validation from "./SignupValidation";
import Axios from 'axios';
import './Login.css'; 



function Signup() {
    const [values, setValues] = useState({
        id: '',
        name: '',
        email: '',
        password: '',
        day: '',
        month:'',
        year:'',
        gender:'',
        major:'',
        grade:'',
        tenlop:'',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
       
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        if(Object.keys(errors).length===0){
        try {
            const res = await Axios.post('http://localhost:5000/api/signup', values);
            if (res.data.message === 'Data inserted successfully') {
                setIsSubmitted(true);
            }
        } catch (error) {
            console.log(error);
        }
        }
    }

    if (isSubmitted) {
        return <Redirect to="/" />;
    }

    return (
        <div className='container-fluid'>
                <form  onSubmit={handleSubmit} class="mx-auto">
                <h4 class="text-center">Create Account</h4>
                    <div className='mb-3 mt-4'>
                        <label htmlFor='id' class="form-label">ID</label>
                        <input type='id' 
                        placeholder='Enter ID' 
                        name="id"
                        onChange={handleInput} 
                        className='form-control' />
                        {errors.id && <span className='text-danger'>{errors.id}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='name' class="form-label">Full name</label>
                        <input type='text' 
                        placeholder='Enter Fullname' 
                        name="name"
                        onChange={handleInput}
                        className='form-control' />
                        {errors.name && <span className='text-danger'>{errors.name}</span>}
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='email' class="form-label">Email</label>
                        <input type='email' 
                        placeholder='Enter email' 
                        name="email"
                        onChange={handleInput} 
                        className='form-control' />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password' class="form-label">Password</label>
                        <input type='password' 
                        placeholder='Enter password' 
                        name="password"
                        onChange={handleInput} 
                        className='form-control' />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    
                    <div className='mb-3 d-flex'>
                        <div className='me-2' style={{ flex: '1' }}>
                            <label htmlFor='day' >Birthday</label>
                            <select name='day' onChange={handleInput} className='form-control rounded-0'>
                                <option value=''>Day</option>
                                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                                    <option key={day} value={day}>{day}</option>
                                ))}
                            </select>
                        </div>
                        <div className='me-2'style={{ flex: '1' }}>
                            <label htmlFor='month'></label>
                            <select name='month' onChange={handleInput} className='form-control rounded-0'>
                                <option value=''>Month</option>
                                {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                                    <option key={month} value={month}>{month}</option>
                                ))}
                            </select>
                        </div>
                        <div className='me-2'style={{ flex: '1'}}>
                            <label htmlFor='year'> </label>
                            <select name='year' onChange={handleInput} className='form-control rounded-0'>
                                <option value=''>Year</option>
                                {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>

                       
                    </div>

                    <div className='mb-2 me-2' style={{ flex: '1' }}>
                        <label htmlFor='gender'>Gender</label>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ width: '48%', border: '1px solid #ced4da', borderRadius: '5px', padding: '5px', backgroundColor: 'white', marginRight: '2%' }}>
                                <label>
                                    <input type='checkbox' name='gender' value='Male' onChange={handleInput} /> Male
                                </label>
                            </div>
                            <div style={{ width: '48%', border: '1px solid #ced4da', borderRadius: '5px', padding: '5px', backgroundColor: 'white', marginLeft: '2%' }}>
                                <label>
                                    <input type='checkbox' name='gender' value='Female' onChange={handleInput} /> Female
                                </label>
                            </div>
                        </div>
                    </div>


                    <div className='mb-3 d-flex justify-content-between'>                        
                        <div className='me-2' style={{ flex: '1' }} >
                                <label htmlFor='major'>Major</label>
                                <select name='major' onChange={handleInput} className='form-control rounded-0'>
                                    <option value=''>Major</option>
                                    <option value='Student'>Student</option>
                                    <option value='Teacher'>Teacher</option>   
                                </select> 
                            </div>
                            <div className='me-2'style={{ flex: '1' }}>
                                <label htmlFor='grade'>Grade</label>
                                <select name='grade' onChange={handleInput} className='form-control rounded-0'>
                                    <option value=''>Grade</option>
                                    <option value='10'>10</option>
                                    <option value='11'>11</option>
                                    <option value='12'>12</option>
                                </select> 
                            </div>
                            <div className="me-2"style={{ flex: '1' }}>
                            <label htmlFor='tenlop'>Class</label>
                                <select name='tenlop' onChange={handleInput} className='form-control rounded-0'>
                                    <option value=''>Class</option>
                                    <option value='A1'>A1</option>
                                    <option value='A2'>A2</option>
                                    <option value='A3'>A3</option> 
                                    <option value='A4'>A4</option>
                                    <option value='A5'>A5</option> 
                                </select>
                            </div>

                    </div>

                    
                    <div class="row">
                        <div class="col">
                            <button type="submit" class="btn btn-primary w-100"><strong>Sign up</strong></button>
                        </div>
                        <div class="col">
                            <a href="/" class="btn btn-default border w-100 text-decoration-none">Sign in</a>
                        </div>
                    </div>

                </form>
        </div>
    );
}

export default Signup;