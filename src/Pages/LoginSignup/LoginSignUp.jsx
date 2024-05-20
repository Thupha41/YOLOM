import React, { useState } from 'react';
import axios from 'axios';

const LoginSignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const login = async () => {
    console.log("Login", formData);
    try {
      const response = await axios.post('https://api.yourrlove.com/v1/login', formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });
      const responseData = response.data;
      if (responseData.statusCode >= 200 && responseData.statusCode < 300) {
        console.log(responseData);
        localStorage.setItem('auth-token', responseData.metadata);
        window.location.replace("/");
      } else {
        alert(responseData.errors);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      alert("An error occurred during login. Please check the console for more details.");
    }
  };

  return (
    <div className='w-full h-[1536px] bg-gray-200 pt-24'>
      <div className='w-[580px] h-[500px] bg-white m-auto pt-10 pr-14'>
        <h1 className='mt-10 ml-10 text-3xl font-semibold'>Login</h1>

        {/* LOGIN FIELDS */}
        <div className='ml-10 flex flex-col gap-7 mt-8'>
          <input
            name='email'
            value={formData.email}
            onChange={changeHandler}
            className='h-[72px] w-full pl-5 border-2 border-solid outline-none focus:border-black focus:outline-none font-[18px] focus:text-black text-[#5c5c5c]'
            type='text'
            placeholder='Email Address'
          />
          <input
            name='password'
            value={formData.password}
            onChange={changeHandler}
            className='h-[72px] w-full pl-5 border-2 border-solid outline-none focus:border-black focus:outline-none font-[18px] focus:text-black text-[#5c5c5c]'
            type='password'
            placeholder='Password'
          />
        </div>

        <div className='flex items-center mt-[25px] gap-5 text-[18px] font-medium text-[#5c5c5c]'>
          <input id='rememberMe' className='ml-10' type='checkbox' name='rememberMe' />
          <label htmlFor='rememberMe' className='ml-2'>
            I accept the 
            <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a>
          </label>
        </div>

        <button onClick={login} className='ml-10 w-[500px] h-[72px] text-white bg-black cursor-pointer font-medium border-none mt-[30px] text-[24px]'>Login</button>
      </div>
    </div>
  );
};

export default LoginSignUp;
