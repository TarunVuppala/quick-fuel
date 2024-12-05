import React, { useState } from 'react';
import axios from 'axios';
import CTA from "../../components/CTA";
import { useNavigate } from 'react-router-dom';

const MechanicSignup = () => {
  const [signupInfo, setSignupInfo] = useState({
    username: '',
    phoneNumber: '',
    email: '',
    password: '',
    speciality: '',
    city: ''
  });
  const navigate = useNavigate();

  const [msg, setMsg] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignupInfo(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { username, phoneNumber, email, password, confirmPassword, city } = signupInfo;

    if (!username || !phoneNumber || !email || !password || !confirmPassword || !city) {
      setMsg('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setMsg('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/mechanic/signup`, signupInfo);
      const data = response.data;

      if (data.success) {
        setMsg('Signup successful');
        navigate('/mechanic/login');
      } else {
        setMsg(data.msg);
      }
    } catch (error) {
      setMsg(error.response?.data?.msg || 'An error occurred');
    }
  };

  return (
    <div className='h-screen w-full flex flex-col justify-center items-center'>
      {msg && <div className='text-red-500'>{msg}</div>}
      <form
        className='flex flex-col w-fit p-[5rem] rounded-[0.5rem] gap-[1rem] justify-center items-center'
        onSubmit={handleSubmit}
      >
        <h1 className='font-black text-2xl'>SIGNUP</h1>
        <input
          type="text"
          name="username"
          placeholder='username'
          className='border bg-transparent px-[1rem] py-[1rem] rounded-[0.5rem] font-black'
          value={signupInfo.username}
          onChange={handleChange}
        />
        <input
          type="text"
          name="speciality"
          placeholder='Speciality'
          className='border bg-transparent px-[1rem] py-[1rem] rounded-[0.5rem] font-black'
          value={signupInfo.speciality}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder='phone number'
          className='border bg-transparent px-[1rem] py-[1rem] rounded-[0.5rem] font-black'
          value={signupInfo.phoneNumber}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder='email'
          className='border bg-transparent px-[1rem] py-[1rem] rounded-[0.5rem] font-black'
          value={signupInfo.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder='password'
          className='border bg-transparent px-[1rem] py-[1rem] rounded-[0.5rem] font-black'
          value={signupInfo.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder='confirm password'
          className='border bg-transparent px-[1rem] py-[1rem] rounded-[0.5rem] font-black'
          value={signupInfo.confirmPassword}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder='city'
          className='border bg-transparent px-[1rem] py-[1rem] rounded-[0.5rem] font-black'
          value={signupInfo.city}
          onChange={handleChange}
        />
        <CTA text={"Signup"} action={handleSubmit} />
      </form>
    </div>
  );
};

export default MechanicSignup;
