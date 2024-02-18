import React, {useEffect} from 'react';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {auth} from '../utils/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { logo } from '../utils/constants';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const handleSignOut = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
      navigate("/error");
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
   if (user) {
     //Sign In
     const {uid, email, displayName, photoURL} = user;
     dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
     navigate("/browse");
   } else {
     // User is signed out
     dispatch(removeUser());
     navigate("/");
 
   }
   });

   // Unsubscribe when component unmount
   return () => unsubscribe();
   }, []);

  return (
    <div className='absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-screen shadow-lg flex justify-between'>
      <img className='w-44' src={logo} alt='logo'/>

      {user && <div className='flex p-2'>
        <img className='w-10 h-10' src={user.photoURL} alt='user-icon' />
        <button onClick={handleSignOut} className='font-bold text-white'>Sign Out</button>
      </div>}
    </div>
  )
}

export default Header;