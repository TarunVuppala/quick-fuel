import React, { useState } from 'react';
import axios from 'axios';
import CTA from "../../components/CTA";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    phoneNumber: '',
    password: ''
  });
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginInfo(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!loginInfo.phoneNumber || !loginInfo.password) {
      setMsg('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, loginInfo);
      const data = response.data;

      if (data.success) {
        localStorage.setItem('token', data.token);
        navigate('/home');
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
        <h1 className='font-black text-2xl'>LOGIN</h1>
        <input
          type="tel"
          name="phoneNumber"
          placeholder='Phone number'
          className='border bg-transparent px-[1rem] py-[1rem] rounded-[0.5rem] font-black'
          value={loginInfo.phoneNumber}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder='Password'
          className='border bg-transparent px-[1rem] py-[1rem] rounded-[0.5rem] font-black'
          value={loginInfo.password}
          onChange={handleChange}
        />
        <CTA text={"Login"} action={handleSubmit} />
      </form>
    </div>
  );
};

export default Login;
