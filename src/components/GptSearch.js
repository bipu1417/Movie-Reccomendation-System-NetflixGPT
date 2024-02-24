import React from 'react';
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestion from './GptMovieSuggestion';
import {BG_IMG} from '../utils/constants';

const GptSearch = () => {
  return (
    <>
      <div className='fixed -z-10'>
        <img className=' h-screen object-cover' src={BG_IMG} alt='bgimage' />
      </div>
      <div className=''>
      <GptSearchBar />
      <GptMovieSuggestion />
    </div>
    </>
    
  );
};

export default GptSearch;