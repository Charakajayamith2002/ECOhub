import React, { useState } from 'react';
import axios from 'axios';

const Alert = ({ message, type }) => {
  const alertStyle = type === 'success' 
    ? 'bg-green-100 border-green-500 text-green-700'
    : 'bg-red-100 border-red-500 text-red-700';

  return (
    <div className={`border-l-4 p-4 ${alertStyle} mb-4`} role="alert">
      <p>{message}</p>
    </div>
  );
};

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: '',
  });
  const [alert, setAlert] = useState({ message: '', type: '' });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/auth/signup', formData);
      setAlert({ message: 'User registered successfully', type: 'success' });
      setFormData({
        name: '',
        email: '',
        password: '',
        userType: '',
      }); // Reset form fields
      console.log(response);
    } catch (err) {
      setAlert({ message: err.response ? err.response.data.message : 'An error occurred during signup.', type: 'error' });
    }

    
  };

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='container shadow-[0_-4px_6px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)] w-[400px] h-[500px] md:w-[700px] md:h-[670px] mx-auto my-10 relative rounded-lg'>
        <div className='flex flex-row gap-y-5 p-5'>
          <div className='flex justify-center h-full w-full'>
            <h1 className='text-2xl md:text-3xl font-sans font-bold mt-4 mb-3'>Sign up</h1>
          </div>
        </div>
        {alert.message && <Alert message={alert.message} type={alert.type} />}
        <form className='flex flex-col w-full gap-y-3' onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder='name'
            value={formData.name}
            onChange={handleChange}
            className='w-[300px] md:w-[600px] mx-auto p-3 rounded-xl mt-10 bg-gray-100 text-green-500'
          />
          <input
            type="email"
            name="email"
            placeholder='email'
            value={formData.email}
            onChange={handleChange}
            className='w-[300px] md:w-[600px] mx-auto p-3 rounded-xl mt-3 bg-gray-100'
          />
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            className='w-[300px] md:w-[600px] mx-auto p-3 rounded-xl mt-3 bg-gray-100'
          >
            <option value="" disabled className='text-gray-400'>User Type</option>
            <option value="Seller">Seller</option>
            <option value="Buyer">Buyer</option>
          </select>
          <input
            type="password"
            name="password"
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            className='w-[300px] md:w-[600px] mx-auto p-3 rounded-xl mt-3 bg-gray-100'
          />
          <div className='w-full flex justify-center'>
            <button
              type="submit"
              className='w-[300px] md:w-[600px] mt-8 bg-black p-3 rounded-xl mx-auto items-center text-white'
            >
              Submit
            </button>
          </div>
        </form>
        <div className='w-full flex justify-center'>
          <h4 className='mt-4 md:mt-8 text-gray-400 text-sm md:text-lg'>Already have an Account? <span className='text-green-500 font-bold'><a href="/login">Log In</a></span></h4>
        </div>
      </div>
    </div>
  );
};

export default Signup;
