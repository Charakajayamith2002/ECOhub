import  { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../redux/auth/authSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://localhost:4000/api/auth/login', 
                { email, password }, 
                { withCredentials: true }
            );

            setMessage(response.data.message);
            setAlertType('success');

            // Clear form fields
            setEmail('');
            setPassword('');

            // Dispatch login action
            dispatch(loginSuccess(response.data.user));

            // Store user data and token in localStorage
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('userToken', response.data.token); // Store token

            // Redirect user based on type
            if (response.data.user.userType === 'Seller') {
                navigate('/');
            } else {
                navigate('/');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred');
            setAlertType('error');
        }
    };

    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='container shadow-lg w-[400px] h-[400px] md:w-[700px] md:h-[500px] mx-auto my-10 rounded-lg p-5'>
                <h1 className='text-2xl md:text-3xl font-bold text-center'>Login</h1>
                <div className='flex flex-col w-full gap-y-3 mt-5'>
                    <input
                        type="email"
                        placeholder='Email'
                        className='w-full p-3 rounded-xl bg-gray-100'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder='Password'
                        className='w-full p-3 rounded-xl bg-gray-100'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    className='w-full mt-6 bg-black p-3 rounded-xl text-white'
                    onClick={handleSubmit}
                >
                    Login
                </button>
                <p className='mt-4 text-center text-gray-400'>
                    Not Registered? <a href="/signup" className='text-green-500 font-bold'>Create an Account</a>
                </p>
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
