import React, {useEffect} from 'react';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {auth} from '../utils/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { SUPPORTED_LANGUAGES, logo } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);
  const showLangSelector = useSelector(store => store.gpt.showGptSearch);

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

   const handleLanguageChange = (e) => {
    // console.log(e.target.value);
    dispatch(changeLanguage(e.target.value));
   }

   const handleGptSearchClick = () => {
    console.log("GPT Search Clicked");
    // toggle gPT SEARCH
    dispatch(toggleGptSearchView());
   }

  return (
    <div className='absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-screen shadow-lg flex flex-col md:flex-row justify-between'>
      <img className='w-44 mx-auto md:mx-0' src={logo} alt='logo'/>

      {user && <div className='flex p-2 justify-between'>
        {showLangSelector && <select className='py-2 px-4 mx-4 my-4 bg-gray-900 text-white m-2 rounded-lg' onChange={handleLanguageChange}>
          {
            SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)
          }
        </select>}
        <button className='py-2 px-4 m-2 bg-purple-800 text-white rounded-lg mx-4 my-4'
        onClick={handleGptSearchClick}
        >{showLangSelector ? "Home" : "GPT Search"}</button>
        <img className='w-10 h-10 mt-4 rounded-lg invisible md:visible' src={user.photoURL} alt='user-icon' />
        <button onClick={handleSignOut} className='font-bold text-white'>[Sign Out]</button>
      </div>}
    </div>
  )
}

export default Header;