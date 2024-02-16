import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { checkValidData, checkSignUpData } from '../utils/validate';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  }

  const handleButtonClick = () => {
    // Validate the form data
    // either you can use state var or useRef hook
    
    if(isSignIn){
      const signInMsg = checkValidData(email.current.value, password.current.value);
      setErrorMsg(signInMsg);
    } else {
      const signUpMsg = checkSignUpData(email.current.value, password.current.value, name.current.value);
      setErrorMsg(signUpMsg);
    }

    if(errorMsg) return;

    if(!isSignIn){
      //Sign up logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
          .then((userCredential) => {
    // Signed up 
      const user = userCredential.user;
      updateProfile(user, {
        displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/15422942?v=4"
      }).then(() => {
        const {uid, email, displayName, photoURL} = auth.currentUser;
        dispatch(
          addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL})
        );
        navigate("/browse");
      }).catch((error) => {
       setErrorMsg(error.message);
      });

      }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMsg(errorCode+ " - " +errorMessage)
     });

    } else {
      //sign in logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
    // Signed in 
      const user = userCredential.user;
      console.log(user);
      navigate("/browse");
      
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMsg(errorCode+ " - "+errorMessage);
  });

    }
   
  }
  return (
    <div>
      <Header />
      <div className='absolute'>
        <img src='https://assets.nflxext.com/ffe/siteui/vlv3/c0b69670-89a3-48ca-877f-45ba7a60c16f/2642e08e-4202-490e-8e93-aff04881ee8a/IN-en-20240212-popsignuptwoweeks-perspective_alpha_website_small.jpg' alt='bgimage' />
      </div>
      <form onSubmit={(e) => e.preventDefault()} 
      className='absolute p-12 m-8 bg-black w-3/12 mt-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'
      >
        <h1 
        className='font-bold text-3xl py-4'>
          {isSignIn?"Sign In":"Sign Up"}
          </h1>
        {
          !isSignIn && 
          <input ref={name} type='text' placeholder='Full Name' className='p-4 my-2 w-full bg-gray-700' />
        }
        <input ref={email} type='text' placeholder='Email Address' className='p-4 my-2 w-full bg-gray-700' />
        <input ref={password} type='password' placeholder='Password' className='p-4 my-2 w-full bg-gray-700' />
        <p className='text-red-500 font-bold text-lg py-2'>{errorMsg}</p>
        <button className='p-6 my-4 bg-red-700 w-full rounded-lg cursor-pointer' onClick={handleButtonClick}>{isSignIn?"Sign In":"Sign Up"}</button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignIn?"New to NetFlix? Sign up here.":"Have an account? Sign in here."}</p>
      </form>
    </div>
  );
};

export default Login;