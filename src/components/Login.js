import React, { useState } from 'react';
import Header from './Header';

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  }
  return (
    <div>
      <Header />
      <div className='absolute'>
        <img src='https://assets.nflxext.com/ffe/siteui/vlv3/c0b69670-89a3-48ca-877f-45ba7a60c16f/2642e08e-4202-490e-8e93-aff04881ee8a/IN-en-20240212-popsignuptwoweeks-perspective_alpha_website_small.jpg' alt='bgimage' />
      </div>
      <form className='absolute p-12 m-8 bg-black w-3/12 mt-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
        <h1 className='font-bold text-3xl py-4'>{isSignIn?"Sign In":"Sign Up"}</h1>
        {!isSignIn && <input type='text' placeholder='Full Name' className='p-4 my-2 w-full bg-gray-700' />}
        <input type='text' placeholder='Email Address' className='p-4 my-2 w-full bg-gray-700' />
        <input type='password' placeholder='Password' className='p-4 my-2 w-full bg-gray-700' />
        <button className='p-6 my-4 bg-red-700 w-full rounded-lg cursor-pointer'>{isSignIn?"Sign In":"Sign Up"}</button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignIn?"New to NetFlix? Sign up here.":"Have an account? Sign in here."}</p>
      </form>
    </div>
  );
};

export default Login;