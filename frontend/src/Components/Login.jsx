import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { loginSuccess } from '../redux/auth/authSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize navigate hook

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/api/auth/login', { email, password }, { withCredentials: true });
            setMessage(response.data.message);
            setAlertType('success');
            // Refresh the form
            setEmail('');
            setPassword('');

            // Dispatch the login action
            dispatch(loginSuccess(response.data.user));

            // Optionally save user data to local storage
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // Redirect to /profile after successful login
            if (response.data.user.userType === 'Seller') {
                navigate('/sellerProfile');
            } else { // Redirect to /profile if the user is not a seller
                navigate('/allProducts');
            }

            console.log(response);
        } catch (error) {
            setMessage(error.response.data.message || 'An error occurred');
            setAlertType('error');
        }
    };

    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='container shadow-[0_-4px_6px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)] w-[400px] h-[400px] md:w-[700px] md:h-[500px] mx-auto my-10 relative rounded-lg'>
                <div className='flex flex-row gap-y-5 p-5'>
                    <div className='flex justify-center h-full w-full'>
                        <h1 className='text-2xl md:text-3xl font-sans font-bold mt-4'>Login</h1>
                    </div>
                </div>
                <div className='flex flex-col w-full gap-y-3'>
                    <input
                        type="email"
                        placeholder='Email'
                        className='w-[300px] md:w-[600px] mx-auto p-3 rounded-xl mt-10 bg-gray-100'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder='Password'
                        className='w-[300px] md:w-[600px] mx-auto p-3 rounded-xl mt-3 bg-gray-100'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='w-full flex justify-center'>
                    <button
                        className='w-[300px] md:w-[600px] mt-8 bg-black p-3 rounded-xl mx-auto items-center text-white'
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
                <div className='w-full flex justify-center'>
                    <h4 className='mt-4 md:mt-8 text-gray-400 text-sm md:text-lg'>Not Registered? <span className='text-green-500 font-bold'><a href="/signup">Create an Account</a></span></h4>
                </div>
                {message && (
                    <div className={`mt-4 text-center ${alertType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
